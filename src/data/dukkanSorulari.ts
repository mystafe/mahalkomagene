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

export const gruplar: Grup[] = [
  {
    ad: 'Dükkân ve marka',
    sorular: [
      { id: 'ad', s: 'Şubenin resmî adı ne?', n: 'Google, site ve tabelada aynı ad geçmeli.', tip: 'tek', o: ['Mahal Komagene', 'Komagene İldem', 'Başka bir ad (aşağıya yazın)', 'Emin değilim'], not: true },
      { id: 'izin', s: 'Komagene merkezi, şubenin ayrı bir sitesi olmasına ve logonun kullanılmasına izin veriyor mu?', tip: 'tek', o: ['Yazılı izin var', 'Sözlü izin var', 'Konuşulmadı', 'Emin değilim'] },
      { id: 'merkez', s: 'Merkezin şubeler için kendi sitesi, şube sayfası ya da bir kuralı var mı?', tip: 'tek', o: ['Var', 'Yok', 'Emin değilim'], not: true },
      { id: 'adres', s: 'Adres böyle mi yazılmalı? "Alparslan Türkeş Blv. No: 31/3D, Gesi Fatih Mah., 38180 Melikgazi / Kayseri"', tip: 'tek', o: ['Doğru', 'Düzeltme var (aşağıya yazın)'], not: true },
      { id: 'tel', s: 'Sitede 0531 520 50 04 numarası duruyor. Doğru numara bu mu?', tip: 'tek', o: ['Doğru', 'Başka numara olsun (aşağıya yazın)'], not: true },
    ],
  },
  {
    ad: 'Google Haritalar',
    sorular: [
      { id: 'gbp', s: 'Dükkânın Google Haritalar kaydı var mı, kimde?', n: '"Çiğ köfte yakınımda" diye arayan müşterilerin çoğu dükkânı haritada bulur.', tip: 'tek', o: ['Var, biz yönetiyoruz', 'Var, merkez yönetiyor', 'Var ama kimde bilmiyorum', 'Yok', 'Emin değilim'] },
      { id: 'gbplink', s: 'Varsa Google Haritalar linki (haritada dükkâna dokunup "Paylaş" deyin)', tip: 'metin', ph: 'https://maps.app.goo.gl/...' },
      { id: 'harita3', s: 'Dükkândayken telefondan "çiğ köfte" aratınca haritada ilk 3 sırada kimler çıkıyor?', n: 'İsterseniz aşağıdaki fotoğraf bölümünden ekran görüntüsü de yükleyebilirsiniz.', tip: 'metin', ph: '1) ...  2) ...  3) ...' },
      { id: 'yorum', s: "Müşterilerden Google'da yorum istemeye sıcak bakar mısınız?", n: 'Kasada küçük bir rica ya da masada QR kart. Yorum karşılığı indirim verilmiyor, bu Google kuralı.', tip: 'tek', o: ['Evet, QR kart da koyarız', 'Yalnız sözlü rica', 'Hayır', 'Düşüneyim'] },
    ],
  },
  {
    ad: 'Sipariş',
    sorular: [
      { id: 'platform', s: 'Şube hangi sipariş uygulamalarında var?', n: 'Birden fazla seçebilirsiniz. Sitede "Sipariş ver" düğmesi koymak için.', tip: 'cok', o: ['Yemeksepeti', 'Getir Yemek', 'Trendyol Yemek', 'Migros Yemek', 'Komagene uygulaması', 'Hiçbiri'] },
      { id: 'platformlink', s: 'Varsa bu uygulamalardaki dükkân linkleri', tip: 'metin', ph: 'Uygulamada dükkân sayfasını açıp "Paylaş" deyin' },
      { id: 'paket', s: 'Telefonla paket sipariş alıyor musunuz, kendi kuryeniz var mı?', tip: 'tek', o: ['Evet, belli bir bölgeye', 'Evet, her yere', 'Hayır, yalnız gel-al', 'Uygulamalar üzerinden'], not: true, notPh: 'Hangi bölgelere? Minimum tutar var mı?' },
      { id: 'whatsapp', s: "Dükkânın numarası WhatsApp'ta mı, oradan sipariş alır mısınız?", tip: 'tek', o: ['Evet, WhatsApp Business', 'Evet, normal WhatsApp', 'WhatsApp var ama sipariş almayız', 'Hayır'] },
    ],
  },
  {
    ad: 'Menü',
    sorular: [
      { id: 'menu', s: 'Sitede menü ve fiyatlar görünsün mü?', n: 'Fiyatları fotoğraftaki panodan yazmıyoruz; güncel listeyi sizden alırız.', tip: 'tek', o: ['Evet, fiyatlarıyla', 'Ürünler olsun, fiyat olmasın', 'Menü olmasın'] },
      { id: 'menuliste', s: 'Menüyü buraya yazabilir ya da menü/fiyat listesinin fotoğrafını aşağıdan yükleyebilirsiniz', tip: 'metin', ph: 'ör. Çiğ köfte dürüm — ... TL' },
      { id: 'fiyatguncel', s: 'Fiyatlar değişince kim haber verecek?', tip: 'tek', o: ['Ben haber veririm', 'Dükkândan biri', 'Fiyat koymayalım'], not: true, notPh: 'Kim? (isim/telefon)' },
      { id: 'tatli', s: 'Dükkânda tatlı satılıyor mu?', n: 'Satılmıyorsa siteden kaldıracağız.', tip: 'tek', o: ['Evet', 'Hayır', 'Mevsimlik / bazen'], not: true, notPh: 'Hangi tatlılar?' },
      { id: 'etsiz', s: 'Sitede "etsiz çiğ köfte" ifadesi geçsin mi?', tip: 'tek', o: ['Evet', 'Hayır'] },
      { id: 'kampanya', s: 'Panodaki kampanyalar (ör. "her ayın 15\'i %50") hâlâ geçerli mi? Sitede duyurulsun mu?', tip: 'tek', o: ['Geçerli, duyuralım', 'Geçerli ama sitede olmasın', 'Artık yok'], not: true, notPh: 'Güncel kampanyalar neler?' },
    ],
  },
  {
    ad: 'Saatler',
    sorular: [
      { id: 'saat', s: 'Her gün 11.00 – 02.00 arası açık mısınız?', tip: 'tek', o: ['Evet', 'Bazı günler farklı (aşağıya yazın)'], not: true },
      { id: 'ozelsaat', s: 'Ramazan, bayram ya da yılbaşında saatler değişiyor mu?', tip: 'tek', o: ['Evet, değişiyor', 'Hayır'], not: true, notPh: 'Nasıl değişiyor?' },
    ],
  },
  {
    ad: 'Dükkânı anlatalım',
    sorular: [
      { id: 'acilis', s: 'Dükkân ne zaman açıldı?', tip: 'metin', ph: 'Yıl yeterli' },
      { id: 'fark', s: 'Müşteriler dükkânı en çok neden seviyor? Öne çıkan 2-3 şey', n: 'Örneğin oturma alanı, otopark, porsiyon, servis hızı... Yalnız doğru olanlar.', tip: 'metin' },
      { id: 'olanak', s: 'Dükkânda neler var?', tip: 'cok', o: ['Oturma alanı', 'Dış mekân / bahçe', 'Otopark', 'Kartla ödeme', 'Engelli girişi', 'Wi-Fi', 'Paket servis', 'Gel-al'] },
      { id: 'instagram', s: 'Dükkânın Instagram hesabı var mı?', tip: 'tek', o: ['Var', 'Yok, açabiliriz', 'Yok, açmayacağız'], not: true, notPh: 'Varsa kullanıcı adı' },
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
