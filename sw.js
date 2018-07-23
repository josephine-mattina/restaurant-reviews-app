const staticCacheName = 'restaurant-cache-v29';
let cacheFiles = [
    '/',
    './index.html',
    './restaurant.html',
    './data/restaurants.json',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './css/styles.css',
    './img/1.jpg',
    './img/10.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
]

// Cache all the app assets
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installed');

    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
        .catch(err => {
            console.log('[ServiceWorker] Error caching files');
        })
    );
});

// Clearing old cache
self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activated');

    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            // Loop over all the cache names
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                    // Delete caches that do not match staticCacheName
                    return caches.delete(cacheName);
                })
            );
        })

    );
});

// Return the cached assets if there is a cache available
self.addEventListener('fetch', e => {
    console.log('[ServiceWorker] Fetching', e.request.url);
    // Handle home page requests




    // Handle restaurant page requests
    // const request = e.request.url.includes('restaurant.html')
    // ? new Request('restaurant.html') : e.request;

    e.respondWith(
        caches.match(e.request).then(response => {
            console.log('[ServiceWorker] Found in cache', e.request.url);
            return response || fetch(e.request);
        })
    );   
});

// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.open(staticCacheName)
//         .then(cache => {
//             return cache.match(event.request).then(response => {
//                 return response || fetch(event.request)
//                 .then(response => {
//                     const responseClone = response.clone();
//                     cache.put(event.request, responseClone);
//                 })
//             })
//         })
//     );
// });

    // e.respondWith(
    //     // check in cache whether requested url already exists
    //     caches.match(e.request)
    //     .then(function(response) {
    //         // if response is in the cache
    //         if (response) {
    //             console.log('[ServiceWorker] Found in cache', e.request.url);
    //             // return the cached version
    //             return response;
    //         }
    //         // if not found in the cache, when fetched first time cache as well
    //         var requestClone = e.request.clone();

    //         fetch(requestClone)
    //         .then(function(response) {
    //             // If no response
    //             if(!response) {
    //                 console.log('[ServiceWorker] No response from fetch');
    //                 return response;
    //             }
    //             // If response, clone response
    //             var responseClone = response.clone();
    //             // Open the cache again
    //             caches.open(staticCacheName)
    //             .then(function(cache) {
    //                 // Put request and reponse clone into cache
    //                 cache.put(e.request, responseClone);
    //                 // Return this response
    //                 return reponse;
    //             })
    //             .catch(function(err) {
    //                 console.log('[ServiceWorker] Error Fetching and Caching new files');
    //             })
    //         })
    //     })
    // )

    // const request = event.request.url.includes('restaurant.html')
    // ? new Request('restaurant.html') : event.request;

    // const requestUrl = new URL(event.request.url);
    // // debugger;
    // // if (requestUrl.origin === location.origin) {
    // //     if (requestUrl.pathname === 'index.html') {
    // //         event.respondWith(caches.match('/'));
    // //         return;
    // //     }
    // // }

    // requestUrl.pathname.includes('/') ? new Request('index.html') : event.request;
    // // Handle restaurant page requests
    // requestUrl.pathname.includes('restaurant.html') ? new Request('restaurant.html') : event.request;

    // event.respondWith(
    //     caches.match(event.request).then(response => response || fetch(event.request))

    // );


// self.addEventListener('install', function(event) {
//   //perform install steps
//   event.waitUntil(
//     //wait until the following is cached - then install is complete
//     caches.open('static-v1').then(function(cache) {
//       //open the cache add all elements below
//       return cache.addAll([
//         './',
//         './index.html',
//         './restaurant.html',
//         './css/styles.css',
//         './js/main.js',
//         './js/restaurant_info.js',
//         './js/dbhelper.js',
//         './img/1.jpg',
//         './img/2.jpg',
//         './img/3.jpg',
//         './img/4.jpg',
//         './img/5.jpg',
//         './img/6.jpg',
//         './img/7.jpg',
//         './img/8.jpg',
//         './img/9.jpg',
//         './img/10.jpg',
//       ]);
//     })
//   );
// });

// //fetch the cache when required
// self.addEventListener('fetch',function(event) {
//   event.respondWith(
//     //reposind to the request with the following
//     caches.match(event.request)
//     .then(function(response) {
//     return response || fetch(event.request).then(function (response) {
//       return caches.open('static-v1').then(function (cache) {
//         cache.put(event.request, response.clone());
//         return response;
//       });
//     });
//   })
// );
// });