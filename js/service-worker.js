const _version = 'v6';
const chacheName = 'v2';
 
const cacheList =[
    '/text/1.txt',
    '/text/2.txt',
    '/text/3.txt',
];
 
const log = msg => {
    console.log(`[ServiceWorker ${_version}] ${msg}`);
}
 
self.addEventListener('install', event =>{
    self.skipWaiting();
    log('INSTALL');
    caches.open(chacheName).then(cache =>{
        log('caching app shell');
        return cache.addAll(cacheList);
    })
});
 
self.addEventListener('activate', event => {
    log('Activate');
  });
  
 
self.addEventListener('fetch', event =>{
    log('Fetch ' + event.request.url);
    event.respondWith(
        caches.match(event.request).then(response =>{
            return response || fetch(event.request);
        })
    );
});