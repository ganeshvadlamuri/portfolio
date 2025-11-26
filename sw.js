// Service Worker for caching static assets
const CACHE_NAME = 'portfolio-v1.2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/post.html',
  '/assets/css/style.css',
  '/assets/css/mobile.css',
  '/assets/css/projects.css',
  '/assets/css/animations.css',
  '/assets/css/hero.css',
  '/assets/css/theme.css',
  '/assets/css/critical.css',
  '/assets/js/index.js',
  '/assets/js/projects.js',
  '/assets/js/animations.js',
  '/assets/js/enhanced-features.js',
  '/assets/js/performance.js',
  '/assets/profile.jpg',
  '/assets/favicon.svg'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then(fetchResponse => {
            // Cache successful responses
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return fetchResponse;
          });
      })
      .catch(() => {
        // Fallback for offline scenarios
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});