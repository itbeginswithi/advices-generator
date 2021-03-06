const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html', 'offline.js', 'offline.css', 'feather-pen.png'];

const self = this;

//Instal sw
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    )
})

//Listening to req
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(async () => {
                return await fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})

//activate sw
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))  
    )
})
