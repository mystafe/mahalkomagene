/**
 * Dükkân sahibine sorulan sorular (/sorular). Yalnız dükkândan öğrenilecekler;
 * cevaplar Blob'a kaydedilir. Soru eklerken id'yi değiştirmeyin (eski cevaplar id ile eşleşir).
 */
export type Soru = {
  id: string;
  s: string;
  n?: string;
  tip: 'tek' | 'cok' | 'metin';
  o?: string[];
  ph?: string;
  /** seçeneğin altında not alanı */
  not?: boolean;
  notPh?: string;
};
export type Grup = { ad: string; sorular: Soru[] };

/**
 * 2. tur (10 Kas 2026): ilk turda (8 Kas) boş kalanlar. İlk tur cevapları
 * ../../ali-cevaplari.md dosyasında ve Blob'da duruyor.
 */
export const gruplar: Grup[] = [
  {
    ad: 'Linkler',
    sorular: [
      { id: 'gbplink', s: 'Dükkânın Google Haritalar linki', n: 'Google Haritalar\'da dükkâna dokunun, "Paylaş" deyip linki buraya yapıştırın.', tip: 'metin', ph: 'https://maps.app.goo.gl/...' },
      { id: 'gbpkim', s: 'Google Haritalar kaydını kimin yönettiğini öğrenebildiniz mi?', n: 'Fotoğraf, saat ve yorum cevabı oradan yönetiliyor; kimde olduğunu bilirsek güncel tutarız.', tip: 'tek', o: ['Merkez yönetiyor', 'Biz yönetiyoruz', 'Eski bir çalışanda / ajansta', 'Öğrenemedim'], not: true, notPh: 'Kimde? (isim ya da e-posta)' },
      { id: 'platformlink', s: 'Sipariş uygulamalarındaki dükkân linkleri', n: 'Yemeksepeti, Getir, Trendyol, Migros ve Komagene uygulamasında dükkân sayfasını açıp "Paylaş" deyin. Sitede "Sipariş ver" düğmeleri bunlarla çalışacak.', tip: 'metin', ph: 'Her satıra bir link' },
      { id: 'instagram', s: 'Instagram kullanıcı adı', tip: 'metin', ph: '@...' },
    ],
  },
  {
    ad: 'Menü ve kampanyalar',
    sorular: [
      { id: 'menuliste', s: 'Menü ve fiyatlar', n: 'Buraya yazabilir ya da en alttan menü panosunun / fiyat listesinin fotoğrafını yükleyebilirsiniz.', tip: 'metin', ph: 'ör. Çiğ köfte dürüm — ... TL' },
      { id: 'tatlilar', s: 'Hangi tatlılar var?', tip: 'metin' },
      { id: 'kampanyalar', s: 'Güncel kampanyalar neler?', n: 'Hangi gün, hangi ürün, ne kadar indirim. Sitede böyle duyuracağız.', tip: 'metin', ph: 'ör. Her ayın 15\'i çiğ köfte %50' },
      { id: 'fiyatkisi', s: 'Fiyat ya da kampanya değişince kim haber verecek?', tip: 'metin', ph: 'İsim ve telefon' },
    ],
  },
  {
    ad: 'Servis ve saatler',
    sorular: [
      { id: 'paketbolge', s: 'Paket servis hangi bölgelere? Minimum tutar var mı?', tip: 'metin', ph: 'ör. İldem, Gesi Fatih... · min. ... TL' },
      { id: 'ozelsaat', s: 'Ramazan, bayram ve yılbaşında saatler nasıl değişiyor?', tip: 'metin' },
      { id: 'ad', s: 'Şubenin resmî adı ne?', n: 'Google, site ve tabelada aynı ad geçmeli.', tip: 'tek', o: ['Mahal Komagene', 'Komagene İldem', 'Komagene Alparslan Türkeş Bulvarı', 'Başka bir ad (aşağıya yazın)'], not: true },
      { id: 'son', s: 'Eklemek istediğiniz başka bir şey', tip: 'metin' },
    ],
  },
];

export const cekimListesi: { b: string; a: string }[] = [
  { b: 'Dış cephe, akşam', a: 'Gün batımından 15-20 dakika sonra, tabela ışıkları yanarken' },
  { b: 'Dış cephe, gündüz', a: 'Bulvardan, tabela net okunsun' },
  { b: 'Çiğ köfte porsiyonu', a: 'Tabakta yeşillik ve limonla, yakından' },
  { b: 'Dürüm', a: 'Elde ya da ortadan kesilmiş, içi görünsün' },
  { b: 'Self servis tezgah', a: 'Dolu ve düzenli hâli, üstten ve yandan' },
  { b: 'Meze', a: '2-3 çeşit bir arada' },
  { b: 'Tatlı', a: 'Satılıyorsa vitrin ve tek porsiyon' },
  { b: 'Dondurma', a: 'Neon köşe ve külah/kap yakından' },
  { b: 'İç salon', a: 'Geniş açı, oturma alanı toplu hâlde' },
  { b: 'Paket', a: 'Paket servis poşeti ya da kutusu' },
  { b: 'Hazırlık', a: 'Eller iş başında, yüz gerekmez' },
];
