// Cache all the app assets
self.addEventListener('install', event => {

  event.waitUntil(
    caches.open('static_v1').then(cache => {
      return cache.addAll([
        '/',
        'index.html',
        'restaurant.html',
        'data/restaurants.json',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'img/1.jpg',
        'img/10.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg'
      ]);
    })
  );
});

// Return the cached assets if there is a cache available
self.addEventListener('fetch', event => {
    // Handle restaurant page requests
    const request = event.request.url.includes('restaurant.html')
    ? new Request('restaurant.html') : event.request;

    event.respondWith(
        caches.match(request).then(response => response || fetch(request))
    );
});