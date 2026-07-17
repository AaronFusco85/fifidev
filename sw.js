// Pull in WINES_CSV_URL / FLASHCARDS_CSV_URL / GOOGLE_MAPS_API_KEY so this
// worker knows which cross-origin Sheets URLs are safe (and worth) caching.
// config.js sets these on `self`, which works both in page context and here.
try {
  importScripts('js/config.js');
} catch (err) {
  console.warn('[sw] Could not load config.js', err);
}

const CACHE_NAME = 'chez-fifi-cache-v3';

function sheetsUrlsConfigured() {
  return self.WINES_CSV_URL && !self.WINES_CSV_URL.startsWith('PASTE_')
    && self.FLASHCARDS_CSV_URL && !self.FLASHCARDS_CSV_URL.startsWith('PASTE_');
}

// Pages and data that don't change URL when the site is updated (no cache-
// busting query string) — safe to precache eagerly on install. Everything
// else (versioned CSS/JS) gets cached automatically the first time it's
// fetched, via the fetch handler below. The local data/*.json files stay
// listed here as the offline fallback content source, even once Sheets is
// live — see data-source.js.
const PRECACHE_URLS = [
  'index.html',
  'menu.html',
  'flashcards.html',
  'maps.html',
  'data/menu.json',
  'data/flashcards.json',
  'data/regions.json',
  'resources/pdfs/BTG_Complete_Packet.pdf',
  'favicon.svg',
  'favicon-32.png',
  'favicon-192.png',
  'apple-touch-icon.png',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      const urls = PRECACHE_URLS.slice();
      // Also warm the cache with the live Sheets data on first install, so
      // offline works from the very first visit rather than only after a
      // page has been opened once online.
      if (sheetsUrlsConfigured()) {
        urls.push(self.WINES_CSV_URL, self.FLASHCARDS_CSV_URL);
      }

      // Cache each file independently — cache.addAll() is all-or-nothing,
      // so a single missing/failed file would otherwise silently prevent
      // EVERYTHING from being cached. This way one bad file just gets
      // skipped (and logged) instead of breaking offline support entirely.
      return Promise.all(
        urls.map((url) =>
          fetch(url, { cache: 'reload' })
            .then((response) => {
              if (response && response.ok) {
                return cache.put(url, response);
              }
              console.warn('[sw] Skipped precaching (bad response):', url, response && response.status);
            })
            .catch((err) => console.warn('[sw] Skipped precaching (fetch failed):', url, err))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSheetsRequest = sheetsUrlsConfigured()
    && (event.request.url === self.WINES_CSV_URL || event.request.url === self.FLASHCARDS_CSV_URL);

  // Same-origin GETs, plus the two specific Sheets CSV endpoints (so the
  // wine list and flashcards keep working offline even after moving to
  // Sheets). Everything else cross-origin — Google Maps tiles/scripts,
  // Google Fonts, etc. — passes through untouched; those can't
  // meaningfully work offline anyway.
  if (event.request.method !== 'GET' || (url.origin !== self.location.origin && !isSheetsRequest)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
