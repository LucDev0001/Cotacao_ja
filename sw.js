const CACHE_NAME = "cotacaoja-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./perfil.html",
  "./faq.html",
  "./termos.html",
  "./politica.html",
  "./manifest.json",
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  "https://unpkg.com/lucide@latest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache aberto");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Ignora requisições que não são GET (ex: POST para o Firebase)
  if (event.request.method !== "GET") {
    return;
  }

  // Ignora requisições de extensões do Chrome
  if (!event.request.url.startsWith("http")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se encontrar no cache, retorna
      if (response) {
        return response;
      }

      // Senão, busca na rede
      return fetch(event.request).then((networkResponse) => {
        // Clona a resposta para poder usar no cache e retornar ao navegador
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
