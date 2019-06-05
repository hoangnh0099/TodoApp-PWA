const staticCacheName = "site-static";

const assets = [
  "./",
  "./index.html",
  "./js/app.js",
  "./js/material-ui.js",
  "./js/firebase-config.js",
  "./css/materialize.min.css",
  "./css/style.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "./images/notepad-256x256.png",
  "./images/notepad-512x512.png"
];

// Install service worker
self.addEventListener("install", event => {
  // console.log("Service worker has been installed");
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log("cacheing shell assets");
      cache.addAll(assets);
    }))
});

//  Active service worker
self.addEventListener("activate", event => {
  // console.log("Service worker has been activated");
});

//  Fetch service worker
self.addEventListener("fetch", event => {
  // console.log("Service worker has been activated");
});