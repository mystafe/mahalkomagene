/**
 * Dükkân soru formu — ortak yardımcılar (alt çizgili dosya route olmaz).
 * Erişim: linkteki anahtar (#k=...) her istekte gelir, FORM_ANAHTAR ile karşılaştırılır.
 * Anahtar yalnız Vercel ortam değişkeninde ve Doppler'da durur; depoda yok.
 */
import { timingSafeEqual } from 'node:crypto';

export const ID_DESENI = /^[a-z0-9-]{8,40}$/;

export function anahtarDogru(gelen: unknown): boolean {
  const beklenen = process.env.FORM_ANAHTAR;
  if (!beklenen || typeof gelen !== 'string' || !gelen) return false;
  const a = Buffer.from(gelen);
  const b = Buffer.from(beklenen);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function json(veri: unknown, status = 200): Response {
  return new Response(JSON.stringify(veri), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/** Yanlış anahtarda kısa bekleme: deneme-yanılmayı yavaşlatır */
export const bekle = (ms: number) => new Promise((r) => setTimeout(r, ms));
