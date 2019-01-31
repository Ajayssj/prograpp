self.addEventListener('install', (event) => {
    console.log('👷', 'install', event);
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('👷', 'activate', event);
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
    // console.log('👷', 'fetch', event);
    event.respondWith(fetch(event.request));
  });

  const filesToCache = [
    '/',
    'script.js',
    'index.html'
  ];
  
  const staticCacheName = 'pages-cache-v1';

  
  self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
    );
  });