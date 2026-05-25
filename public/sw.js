// Minimal service worker. Its main job is to make the site installable as a
// PWA — Chrome only offers "Install app" when a service worker with a fetch
// handler is registered. It intentionally does NOT cache app content
// aggressively: the site serves live data (auth, progress, quizzes) that must
// stay fresh. It only caches the home shell as an offline fallback.

const CACHE = "ngc-shell-v1";
const OFFLINE_URL = "/";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.add(OFFLINE_URL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Network-first for page navigations; fall back to the cached shell only when
  // offline. Everything else (data/API/assets) goes straight to the network.
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match(OFFLINE_URL)));
  }
});
