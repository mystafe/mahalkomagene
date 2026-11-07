/**
 * POST /api/form/yukle — fotoğrafın tarayıcıdan doğrudan Blob'a yüklenmesi için
 * kısa ömürlü imzalı izin üretir (dosya bu fonksiyondan geçmez).
 * Yetki: OIDC + BLOB_STORE_ID (bağlantı ortam değişkenleri), uzun ömürlü anahtar yok.
 */
import { issueSignedToken } from '@vercel/blob';
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { anahtarDogru, bekle, ID_DESENI, json } from '../_form.js';

const AZAMI_DOSYA = 40 * 1024 * 1024; // orijinal telefon fotoğrafı / kısa video payı
const DOSYA_ADI = /^(?!\.)[\w.-]{1,80}$/;
const IZINLI_TURLER = ['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp'];

export async function POST(request: Request): Promise<Response> {
  let govde: HandleUploadPresignedBody;
  try {
    govde = (await request.json()) as HandleUploadPresignedBody;
  } catch {
    return json({ hata: 'Geçersiz istek' }, 400);
  }

  try {
    const sonuc = await handleUploadPresigned({
      body: govde,
      request,
      getSignedToken: async (pathname, clientPayload) => {
        let yuk: { k?: string; id?: string } = {};
        try {
          yuk = JSON.parse(clientPayload ?? '{}');
        } catch {
          /* aşağıda reddedilir */
        }
        if (!anahtarDogru(yuk.k)) {
          await bekle(600);
          throw new Error('Link geçersiz');
        }
        const id = String(yuk.id ?? '');
        const onek = `fotograflar/${id}/`;
        if (!ID_DESENI.test(id) || !pathname.startsWith(onek) || !DOSYA_ADI.test(pathname.slice(onek.length))) {
          throw new Error('Geçersiz yol');
        }
        const sinirlar = {
          allowedContentTypes: IZINLI_TURLER,
          maximumSizeInBytes: AZAMI_DOSYA,
          validUntil: Date.now() + 15 * 60 * 1000,
        };
        const token = await issueSignedToken({ pathname, operations: ['put'], ...sinirlar });
        return { token, urlOptions: { ...sinirlar, addRandomSuffix: true } };
      },
    });
    return json(sonuc);
  } catch (e) {
    const bizim = e instanceof Error && (e.message === 'Link geçersiz' || e.message === 'Geçersiz yol');
    if (!bizim) console.error('yukle hatası:', e instanceof Error ? e.name : 'bilinmiyor');
    // SDK iç hata metinleri dışarı verilmez
    return json({ error: bizim ? (e as Error).message : 'Yükleme izni alınamadı' }, bizim ? 400 : 500);
  }
}
