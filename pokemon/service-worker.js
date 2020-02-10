// https://developers.google.com/web/fundamentals/primers/service-workers
// https://www.xlaoyu.info/2018/04/21/progressive-enhance-your-github-pages/
// Workbox https://codelabs.developers.google.com/codelabs/workbox-lab-cn/index.html?index=..%2F..gddchina#0
// https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
// https://github.com/alienzhou/blog/issues/10
// https://zhuanlan.zhihu.com/p/20040372

const CACHE_NAME = 'yinguohang.github.io/pokemon';

const URLs = [
  "types.json",
  "pokemon_types.json",
  "index.html",
  "https://code.jquery.com/jquery-3.4.1.min.js",
  "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js",
  "https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css",
];

// Cache resources
self.addEventListener('install', function(e) {
  console.log("Install event", e)
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Installing cache: " + CACHE_NAME, cache)
      return cache.addAll(URLs)
    }).then(
      _ => {
        console.log("Finish installing cache: " + CACHE_NAME)
        return self.skipWaiting();
      }
    )
  );
});

self.addEventListener('fetch', function(e) {
  console.log("Fetch event", e.request.url)
  e.respondWith(
    caches.match(e.request).then(function(response) {
      console.log("Cache gets ", response)
      if (response) {
        console.log("Cached", e.request.url)
        return response
      } else {
        console.log("Not cached", e.request.url)
        return fetch(e.request)
      }
    })
  )
})

/*
self.addEventListener('activate', function(e) {
  console.log("Activate event", e)
  var cacheWhitelist = []

  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      console.log(cacheNames)
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    }).then(function() {
      clients.claim()
    }) 
  )  
})
*/