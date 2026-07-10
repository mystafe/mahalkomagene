# Mahal Komagene — mahalkomagene.com

İldem / Gesi Fatih Mahallesi, Melikgazi / Kayseri'de hizmet veren Mahal
Komagene'nin resmi web sitesi. Astro ile üretilmiş, tamamen statik,
JavaScript'siz, mobil öncelikli bir yerel işletme sitesidir.

## Komutlar

```sh
npm install        # bağımlılıkları kur
npm run dev        # geliştirme sunucusu (localhost:4321)
npm run build      # üretim çıktısı → dist/
npm run preview    # dist/ çıktısını yerelde önizle
```

## İşletme bilgilerini güncelleme

**Tüm** işletme bilgileri tek dosyada: [`src/config/business.ts`](src/config/business.ts)

| Alan | Açıklama |
| --- | --- |
| `name`, `phone`, `address` | NAP bilgileri — Google Business Profile ile birebir aynı tutun |
| `geo` | Koordinatlar (38.782810, 35.612537) |
| `openingHours` | Çalışma saatleri (görsel + schema formatı) |
| `instagramUrl` | Hesap açılınca URL yazın; site genelinde otomatik görünür |
| `maps.googleBusinessProfileUrl` | GBP doğrulanınca doldurun |
| `analytics.ga4MeasurementId` | GA4 kimliği girilince izleme + olay takibi otomatik aktifleşir |
| `analytics.searchConsoleVerification` | Search Console HTML etiketi doğrulama kodu |

Telefon, adres veya saat değişirse sadece bu dosyayı düzenleyip yeniden
`npm run build` çalıştırmanız yeterli.

## Sayfa yapısı

```
/                → Ana sayfa (hero, ürünler, tanıtım, galeri, konum, CTA)
/urunler         → Ürün kategorileri (çiğ köfte, meze, tatlı, dondurma)
/galeri          → Gerçek fotoğraf galerisi
/hakkimizda      → İşletme tanıtımı
/konum-iletisim  → Harita, adres, ulaşım
404              → Özel hata sayfası (noindex)
```

## Görseller

- Kaynak fotoğraflar: `src/assets/images/` (anlamlı Türkçe dosya adlarıyla)
- Build sırasında otomatik olarak AVIF + WebP + JPEG'e dönüştürülür,
  4 farklı genişlikte responsive üretilir (`<picture>` + `srcset`).
- Hero (LCP) görseli `loading="eager" fetchpriority="high"`, geri kalanı lazy.
- Yeni fotoğraf eklerken: dosyayı `src/assets/images/` içine koyun,
  ilgili sayfada `import` edip `<Picture>` ile kullanın ve **doğal Türkçe
  alt metni** yazın (görüntüyü tarif eden, anahtar kelime yığmayan).
- Tatlı kategorisinin fotoğrafı henüz yok — `urunler.astro` ve
  `index.astro` içindeki `urun-gorsel-bos` / `kategori-gorsel-bos`
  placeholder'ını gerçek fotoğrafla değiştirin.
- Sosyal paylaşım görseli: `public/og/mahal-komagene-sosyal.jpg` (1200×630).

## Yayına alma (deployment)

Site tamamen statiktir; `dist/` klasörünü sunan her barındırma çalışır.
Önerilen: **Netlify** veya **Vercel** (ikisi de ücretsiz planla yeter).

### Netlify

1. Projeyi GitHub'a itin (veya Netlify CLI ile `netlify deploy` yapın).
2. Netlify'da "Add new site → Import an existing project".
3. Ayarlar: Build command `npm run build`, Publish directory `dist`.
4. Site açıldıktan sonra **Domain settings → Add custom domain**:
   `mahalkomagene.com` ve `www.mahalkomagene.com` ekleyin.
5. Alan adı kayıt firmanızda DNS'i Netlify'ın verdiği değerlere yönlendirin
   (A kaydı / CNAME veya Netlify DNS).
6. HTTPS otomatik (Let's Encrypt). **www → apex yönlendirmesini** açın ki
   tek kanonik alan adı kalsın: `https://mahalkomagene.com`.

### Vercel

1. `vercel` CLI veya GitHub import.
2. Framework preset: Astro (otomatik algılanır). Output: `dist`.
3. Domains bölümünden `mahalkomagene.com` ekleyin, `www` → apex redirect'i
   otomatik önerilir, kabul edin.

> Hangi platform olursa olsun: canonical alan adı **https://mahalkomagene.com**
> (www'suz, HTTPS). `http://` ve `www` istekleri 301 ile buna yönlenmelidir.

## Google Search Console kurulum listesi

1. [search.google.com/search-console](https://search.google.com/search-console)
   → "Alan adı" (Domain) mülkü olarak `mahalkomagene.com` ekleyin
   (DNS TXT kaydı ile doğrulama — en kapsamlı yöntem).
   - Alternatif: "URL öneki" mülkü + HTML etiketi. Bu durumda verilen
     `content` değerini `business.ts → analytics.searchConsoleVerification`
     alanına yazıp yeniden deploy edin.
2. Doğrulama sonrası **Sitemaps** bölümüne şunu gönderin:
   `https://mahalkomagene.com/sitemap-index.xml`
3. **URL Denetimi** ile ana sayfayı test edin → "Dizine eklenme talep et".
4. 3–7 gün sonra kontrol edin: Kapsam raporunda 5 sayfa görünmeli
   (ana sayfa, urunler, galeri, hakkimizda, konum-iletisim).
5. Zenginleştirilmiş sonuç testi: [Rich Results Test](https://search.google.com/test/rich-results)
   ile ana sayfayı test edin — "Restaurant" yapılandırılmış verisi
   hatasız görünmeli.

## Google Business Profile entegrasyon listesi

1. [business.google.com](https://business.google.com) üzerinden profili
   oluşturun/talep edin. Kategori: **Çiğ köfte restoranı** (birincil);
   ek kategori: Dondurmacı.
2. Bilgileri sitedekiyle **birebir aynı** girin (NAP tutarlılığı):
   - Ad: `Mahal Komagene`
   - Adres: `Alparslan Türkeş Blv. 31/3D, Gesi Fatih Mahallesi, 38180 Melikgazi/Kayseri`
   - Telefon: `+90 531 520 50 04`
   - Saatler: Her gün 11:00–02:00 (GBP'de "gece yarısından sonra kapanış"
     olarak 02:00 girilebilir)
   - Web sitesi: `https://mahalkomagene.com`
     (GA4 kurulduktan sonra isterseniz `business.ts → analytics.gbpTrackedUrl`
     içindeki izlemeli URL'yi kullanın)
3. Harita pin'ini koordinatlara sabitleyin: `38.782810, 35.612537`.
4. Sitedeki gerçek fotoğrafları GBP'ye de yükleyin (dış cephe, tezgah,
   dondurma köşesi) — Maps aramalarında büyük fark yaratır.
5. Profil doğrulanınca profil bağlantısını
   `business.ts → maps.googleBusinessProfileUrl` alanına ekleyin.
6. Instagram açılınca hem GBP'ye hem `business.ts → instagramUrl` alanına
   ekleyin.

## Analitik (GA4) ve olay takibi

- `business.ts → analytics.ga4MeasurementId` alanına `G-XXXXXXXXXX`
  yazıldığı anda GA4 yüklenir; boşken siteye hiçbir izleme kodu girmez.
- Dönüşüm olayları HTML'de hazır (`data-olay` öznitelikleri) ve GA4
  aktifleşince otomatik gönderilir:
  - `click_call` — telefon araması tıklaması
  - `click_directions` — yol tarifi tıklaması
  - `click_menu` — menü/ürünler tıklaması
  - `click_instagram` — Instagram tıklaması (hesap eklenince)
- GA4 panelinde bu dört olayı "önemli etkinlik" (key event) olarak
  işaretlemeniz yeterli.

## Teknik özet

- **Astro 5** — tamamen statik çıktı (SSG), sayfalarda 0 KB JavaScript
- **@astrojs/sitemap** — otomatik `sitemap-index.xml`
- **sharp** — AVIF/WebP responsive görseller, CLS'siz (`width/height` sabit)
- **Manrope Variable** — self-host edilen tek font dosyası
- Mobil yapışkan eylem çubuğu (Ara / Yol Tarifi / Menü) — CSS-only
- Mobil menü — CSS-only (checkbox), JavaScript gerekmez
- JSON-LD `Restaurant` şeması her sayfada, `business.ts`'ten üretilir
- `robots.txt`, canonical etiketleri, Open Graph + sosyal paylaşım görseli
