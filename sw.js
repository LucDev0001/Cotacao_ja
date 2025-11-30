const CACHE_NAME = 'cotacao-app-v3-force-update'; // Mudei a versão para forçar atualização
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './faq.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// 1. Instalação
self.addEventListener('install', (event) => {
  // Força o SW a ativar imediatamente, sem esperar
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Ativação (Limpa caches velhos e assume controle)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    }).then(() => {
      // Diz para o SW controlar todas as abas abertas imediatamente
      return self.clients.claim();
    })
  );
});

// 3. Fetch
self.addEventListener('fetch', (event) => {
  // Ignora requisições do Firebase/Google (deixa a lib lidar)
  if (event.request.url.includes('firestore') || 
      event.request.url.includes('googleapis') ||
      event.request.url.includes('identitytoolkit')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Estratégia: Network First, falling back to cache (mais seguro para dados frescos)
      return fetch(event.request)
        .then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        })
        .catch(() => cachedResponse); // Se offline, usa cache
    })
  );
});


