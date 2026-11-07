/**
 * POST /api/form/kaydet
 * { k, id, kontrol? } → yalnız anahtar kontrolü
 * { k, id, ad, cevaplar, fotograflar, tamam } → cevaplar/<id>.json (özel Blob, üzerine yazar)
 */
import { put } from '@vercel/blob';
import { anahtarDogru, bekle, ID_DESENI, json } from '../_form.js';

const AZAMI_BOYUT = 100_000; // ~100 KB metin yeter

export async function POST(request: Request): Promise<Response> {
  if (Number(request.headers.get('content-length') ?? 0) > AZAMI_BOYUT) return json({ hata: 'Çok büyük' }, 413);
  const ham = await request.text();
  if (new TextEncoder().encode(ham).length > AZAMI_BOYUT) return json({ hata: 'Çok büyük' }, 413);

  let govde: Record<string, unknown>;
  try {
    const p = JSON.parse(ham);
    if (!p || typeof p !== 'object' || Array.isArray(p)) throw new Error();
    govde = p;
  } catch {
    return json({ hata: 'Geçersiz istek' }, 400);
  }

  if (!anahtarDogru(govde.k)) {
    await bekle(600);
    return json({ hata: 'Link geçersiz' }, 401);
  }
  if (govde.kontrol) return json({ tamam: true });

  const id = String(govde.id ?? '');
  if (!ID_DESENI.test(id)) return json({ hata: 'Geçersiz kimlik' }, 400);

  const kayit = {
    id,
    ad: String(govde.ad ?? '').slice(0, 120),
    cevaplar: typeof govde.cevaplar === 'object' && govde.cevaplar ? govde.cevaplar : {},
    fotograflar: Array.isArray(govde.fotograflar) ? govde.fotograflar.slice(0, 200) : [],
    tamam: Boolean(govde.tamam),
    guncelleme: new Date().toISOString(),
  };

  try {
    await put(`cevaplar/${id}.json`, JSON.stringify(kayit, null, 2), {
      access: 'private',
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: 'application/json; charset=utf-8',
    });
  } catch (e) {
    console.error('kaydet hatası:', e instanceof Error ? e.name : 'bilinmiyor');
    return json({ hata: 'Kaydedilemedi' }, 500);
  }

  return json({ tamam: true, guncelleme: kayit.guncelleme });
}
