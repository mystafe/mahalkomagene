/**
 * MAHAL KOMAGENE — İşletme Bilgileri (Tek Kaynak)
 *
 * Sitenin tamamında görünen isim, adres, telefon, çalışma saatleri
 * ve harita bilgileri SADECE bu dosyadan yönetilir.
 * Google Business Profile ile birebir aynı tutulmalıdır (NAP tutarlılığı).
 */

export const business = {
  name: 'Mahal Komagene',
  legalType: 'Restaurant' as const,
  url: 'https://mahalkomagene.com',

  phone: {
    display: '+90 541 104 90 25',
    e164: '+905411049025',
    href: 'tel:+905411049025',
  },

  // Aynı numara WhatsApp'ta; sipariş de alınıyor (dükkân cevabı, 8 Kas 2026)
  whatsapp: {
    href: 'https://wa.me/905411049025',
  },

  // Şubenin bulunduğu sipariş uygulamaları (linkler gelince eklenecek)
  siparisUygulamalari: ['Yemeksepeti', 'Getir Yemek', 'Trendyol Yemek', 'Migros Yemek', 'Komagene uygulaması'],

  // Dükkân olanakları (dükkân cevabı, 8 Kas 2026)
  olanaklar: [
    'Oturma alanı',
    'Dış mekân / bahçe',
    'Otopark',
    'Kartla ödeme',
    'Engelli girişi',
    'Paket servis',
    'Gel-al',
  ],

  address: {
    street: 'Alparslan Türkeş Blv. 31/3D',
    neighborhood: 'Gesi Fatih Mahallesi',
    district: 'Melikgazi',
    city: 'Kayseri',
    postalCode: '38180',
    countryCode: 'TR',
    // Tek satırlık gösterim
    full: 'Alparslan Türkeş Blv. 31/3D, Gesi Fatih Mahallesi, 38180 Melikgazi / Kayseri',
  },

  // Semt adı — bölgede yaygın kullanılan isim
  locality: 'İldem',

  // Yapılandırılmış veride hizmet verilen bölgeler (yerel SEO)
  areaServed: ['İldem', 'Gesi Fatih Mahallesi', 'Melikgazi', 'Kayseri'],

  geo: {
    latitude: 38.78281,
    longitude: 35.612537,
  },

  openingHours: {
    // Görsel format (site genelinde bu kullanılır)
    display: 'Her Gün: 11.00 – 02.00',
    displayShort: '11.00 – 02.00',
    // Schema.org / Google için
    opens: '11:00',
    closes: '02:00', // ertesi gün 02:00
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  // Ürün kategorileri (fiyat ve ürün listesi girilmedikçe eklenmez)
  // Dondurma 11 Kas 2026'da ara verildiği için çıkarıldı; dönünce geri eklenir
  categories: ['Çiğ Köfte', 'Meze', 'Tatlı'],
  servesCuisine: ['Çiğ Köfte', 'Türk Mutfağı', 'Meze', 'Tatlı'],

  /**
   * Sosyal medya — hesap açılınca URL'yi buraya yazmanız yeterli,
   * site genelinde otomatik görünür. Boş (null) ise hiç gösterilmez.
   */
  instagramUrl: null as string | null,

  maps: {
    // Yol tarifi (tüm "Yol Tarifi Al" butonları bunu kullanır)
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=38.782810,35.612537',
    // Haritada görüntüle
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=38.782810,35.612537',
    // Sayfa içi harita (iframe)
    embedUrl:
      'https://www.google.com/maps?q=38.782810,35.612537&hl=tr&z=16&output=embed',
    // Google Business Profile bağlantısı — profil doğrulanınca doldurun
    googleBusinessProfileUrl: null as string | null,
  },

  analytics: {
    /**
     * GA4 ölçüm kimliği — analitik kurulunca doldurun (örn. 'G-XXXXXXXXXX').
     * Boş kaldığı sürece hiçbir izleme kodu yüklenmez.
     */
    ga4MeasurementId: null as string | null,
    /**
     * Google Search Console doğrulama kodu — mülk eklerken
     * "HTML etiketi" yöntemindeki content değerini buraya yazın.
     */
    searchConsoleVerification: null as string | null,
    /**
     * Google Business Profile "Web sitesi" alanına yazılacak izlemeli URL.
     * GA4 aktif edildikten SONRA kullanın; öncesinde sade https://mahalkomagene.com yazın.
     */
    gbpTrackedUrl:
      'https://mahalkomagene.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp',
  },
} as const;

export type Business = typeof business;
