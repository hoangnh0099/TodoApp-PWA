// Install service worker
self.addEventListener("install", event => {
  console.log("Service worker has been installed");
});

//  Active service worker
self.addEventListener("activate", event => {
  console.log("Service worker has been activated");
});

//  Fetch service worker
self.addEventListener("fetch", event => {
  console.log("Service worker has been activated");
});