self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("dbEdi")
      .then((cache) => {
        return cache.addAll([
          "./",
          "./code.js",
          "./styles.css",
          "./manifest.json",
          "./bootstrap/bootstrap.css",
          "./edi-icon-md.svg",
          "./edi-icon.svg",
          "./jquery.js",
          "./bootstrap/js/bootstrap.bundle.js"
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

self.addEventListener("fetch", (e) => {

  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res ? res : e.request;
      })
      .catch((err) => {
        console.log(err);
      })
  );
});
