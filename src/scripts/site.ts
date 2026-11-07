/**
 * MAHAL KOMAGENE — istemci davranışları (aşamalı iyileştirme).
 * Site JavaScript olmadan da eksiksiz çalışır; bu dosya yalnız katman ekler:
 * tema anahtarı, başlık çubuğu durumu, tam ekran menü, "şu an açık mı" göstergesi,
 * kaydırmada beliren öğeler ve ürün listesinin etkin satırı.
 */

const TEMA_ANAHTARI = 'mk-tema';

function temaAnahtari() {
  const d = document.documentElement;
  const sistemKoyu = () => !window.matchMedia('(prefers-color-scheme: light)').matches;
  const etkin = () => {
    const t = d.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return sistemKoyu() ? 'dark' : 'light';
  };
  const yansit = () => {
    const koyu = etkin() === 'dark';
    document.querySelectorAll<HTMLButtonElement>('[data-tema-dugme]').forEach((b) => {
      b.setAttribute('aria-pressed', String(!koyu));
    });
    // tarayıcı çubuğu rengi elle seçilen temayı izlesin
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
      m.setAttribute('content', koyu ? '#0b0c10' : '#f3eee6');
      m.removeAttribute('media');
    });
  };
  document.querySelectorAll<HTMLButtonElement>('[data-tema-dugme]').forEach((b) => {
    b.hidden = false;
    b.addEventListener('click', () => {
      const yeni = etkin() === 'dark' ? 'light' : 'dark';
      d.setAttribute('data-theme', yeni);
      try {
        localStorage.setItem(TEMA_ANAHTARI, yeni);
      } catch {
        /* gizli sekme: yalnız bu oturum */
      }
      yansit();
    });
  });
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', yansit);
  yansit();
}

function baslikCubugu() {
  const ust = document.querySelector<HTMLElement>('[data-ust-bar]');
  if (!ust) return;
  let son: boolean | null = null;
  const guncelle = () => {
    const kaydi = window.scrollY > 24;
    if (kaydi !== son) ust.toggleAttribute('data-kaydi', kaydi);
    son = kaydi;
  };
  guncelle();
  window.addEventListener('scroll', guncelle, { passive: true });
}

function menu() {
  const dugme = document.querySelector<HTMLButtonElement>('[data-menu-dugme]');
  const panel = document.querySelector<HTMLElement>('[data-menu-panel]');
  if (!dugme || !panel) return;

  // menü açıkken arkadaki içerik odak almasın
  const arka = () => document.querySelectorAll<HTMLElement>('main, footer, .mobil-bar, .atlama-linki');
  const kapat = (odakGeri = true) => {
    dugme.setAttribute('aria-expanded', 'false');
    document.documentElement.removeAttribute('data-menu-acik');
    panel.setAttribute('inert', '');
    arka().forEach((e) => (e.inert = false));
    if (odakGeri) dugme.focus();
  };
  const ac = () => {
    dugme.setAttribute('aria-expanded', 'true');
    document.documentElement.setAttribute('data-menu-acik', '');
    panel.removeAttribute('inert');
    arka().forEach((e) => (e.inert = true));
    panel.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
  };

  panel.setAttribute('inert', '');
  dugme.addEventListener('click', () => {
    if (dugme.getAttribute('aria-expanded') === 'true') kapat();
    else ac();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dugme.getAttribute('aria-expanded') === 'true') kapat();
  });
  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => kapat(false)));
  window.matchMedia('(min-width: 960px)').addEventListener('change', () => kapat(false));
}

/** İstanbul saatine göre dakika (0–1439) */
function istanbulDakika(): number {
  const parcalar = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Istanbul',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const saat = Number(parcalar.find((p) => p.type === 'hour')?.value ?? 0);
  const dk = Number(parcalar.find((p) => p.type === 'minute')?.value ?? 0);
  return saat * 60 + dk;
}

const dakikaya = (s: string) => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};
const goster = (s: string) => s.replace(':', '.');

function acikDurumu() {
  const ogeler = document.querySelectorAll<HTMLElement>('[data-durum]');
  if (!ogeler.length) return;
  const guncelle = () => {
    const simdi = istanbulDakika();
    ogeler.forEach((el) => {
      const acilis = el.dataset.acilis ?? '11:00';
      const kapanis = el.dataset.kapanis ?? '02:00';
      const a = dakikaya(acilis);
      const k = dakikaya(kapanis);
      const acik = k < a ? simdi >= a || simdi < k : simdi >= a && simdi < k;
      el.dataset.acik = String(acik);
      const metin = el.querySelector<HTMLElement>('[data-durum-metin]');
      if (!metin) return;
      const kisa = el.dataset.durum === 'kisa';
      metin.textContent = acik
        ? kisa
          ? `Açık · ${goster(kapanis)}'ye kadar`
          : `Şu an açık · ${goster(kapanis)}'ye kadar`
        : kisa
          ? `Kapalı · ${goster(acilis)}'de açılır`
          : `Şu an kapalı · ${goster(acilis)}'de açıyoruz`;
      el.hidden = false;
    });
  };
  guncelle();
  window.setInterval(guncelle, 60_000);
}

function belirme() {
  const ogeler = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!ogeler.length) return;
  // gizleme yalnız bu kod gerçekten çalışınca devreye girer (betik düşerse içerik görünür kalır)
  document.documentElement.classList.add('belirme-hazir');
  if (!('IntersectionObserver' in window)) {
    ogeler.forEach((o) => o.classList.add('gorundu'));
    return;
  }
  const io = new IntersectionObserver(
    (girdiler) => {
      girdiler.forEach((g) => {
        if (g.isIntersecting) {
          g.target.classList.add('gorundu');
          io.unobserve(g.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  ogeler.forEach((o) => io.observe(o));
}

/** Ürünler bölümü: soldaki liste, sağda görünen kategoriyi izler */
function urunListesi() {
  const kok = document.querySelector<HTMLElement>('[data-tezgah]');
  if (!kok || !('IntersectionObserver' in window)) return;
  const linkler = kok.querySelectorAll<HTMLAnchorElement>('[data-tezgah-link]');
  const paneller = kok.querySelectorAll<HTMLElement>('[data-tezgah-panel]');
  const sayac = kok.querySelector<HTMLElement>('[data-tezgah-sayac]');
  const io = new IntersectionObserver(
    (girdiler) => {
      girdiler.forEach((g) => {
        if (!g.isIntersecting) return;
        const id = g.target.id;
        linkler.forEach((l, i) => {
          const etkin = l.getAttribute('href') === `#${id}`;
          l.toggleAttribute('data-etkin', etkin);
          if (etkin && sayac) sayac.textContent = String(i + 1).padStart(2, '0');
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  paneller.forEach((p) => io.observe(p));
}

/** Galeri ışık kutusu: JS yoksa bağlantı büyük görseli doğrudan açar */
function isikKutusu() {
  const dlg = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  const linkler = [...document.querySelectorAll<HTMLAnchorElement>('[data-lightbox]')];
  if (!dlg || !linkler.length || typeof dlg.showModal !== 'function') return;
  // <img> statik HTML'de src'siz durmasın diye burada üretilir
  const img = document.createElement('img');
  img.alt = '';
  dlg.querySelector('.isik-ust')!.after(img);
  const etiket = dlg.querySelector<HTMLElement>('[data-lightbox-etiket]')!;
  let sira = 0;
  let geriOdak: HTMLElement | null = null;

  const goster = (i: number) => {
    sira = (i + linkler.length) % linkler.length;
    const l = linkler[sira];
    img.src = l.href;
    img.alt = l.dataset.alt ?? '';
    etiket.textContent = l.dataset.etiket ?? '';
  };
  linkler.forEach((l, i) =>
    l.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      geriOdak = l;
      goster(i);
      dlg.showModal();
    }),
  );
  dlg.querySelector('[data-lightbox-onceki]')?.addEventListener('click', () => goster(sira - 1));
  dlg.querySelector('[data-lightbox-sonraki]')?.addEventListener('click', () => goster(sira + 1));
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goster(sira - 1);
    if (e.key === 'ArrowRight') goster(sira + 1);
  });
  // boş alana tıklayınca kapan
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target === img) dlg.close();
  });
  dlg.addEventListener('close', () => {
    img.removeAttribute('src');
    geriOdak?.focus();
  });
}

/** Kayan şerit: durdur / sürdür düğmesi (WCAG 2.2.2) */
function kayanSerit() {
  document.querySelectorAll<HTMLElement>('[data-kayan]').forEach((k) => {
    const d = k.querySelector<HTMLButtonElement>('[data-kayan-dugme]');
    if (!d) return;
    d.hidden = false;
    d.addEventListener('click', () => {
      const durdu = k.toggleAttribute('data-durdu');
      d.setAttribute('aria-pressed', String(durdu));
    });
  });
}

export function baslat() {
  // biri hata verse de ötekiler çalışsın; belirme ilk sırada
  [belirme, isikKutusu, temaAnahtari, baslikCubugu, menu, acikDurumu, urunListesi, kayanSerit].forEach((f) => {
    try {
      f();
    } catch (e) {
      console.error(e);
    }
  });
}
