// Generated at build time by vite.config.ts — caches the whole app so it works offline.
const CACHE = "habit-tracker-66f281c675a2"
const PRECACHE = ["./","./apple-touch-icon.png","./assets/index-49KezFCw.js","./assets/index-DaP2JQV4.css","./assets/sql-wasm-browser-C1D_RJuy.wasm","./favicon.svg","./icon-192.png","./icon-512.png","./icons.svg","./index.html","./manifest.webmanifest"]

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('habit-tracker-') && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return
  if (request.mode === 'navigate') {
    // Network first so a new version shows up when online; the cached app when offline
    // or when the connection is too slow to answer within a few seconds.
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 4000))
    event.respondWith(
      Promise.race([fetch(request), timeout]).catch(() =>
        caches.match('./', { cacheName: CACHE }).then((cached) => cached || Response.error()),
      ),
    )
    return
  }
  event.respondWith(caches.match(request, { ignoreSearch: true }).then((cached) => cached || fetch(request)))
})
