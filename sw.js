/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "e58972310190ba5c55679d90872643d9"
  }, {
    "url": "pwa-512x512.png",
    "revision": "3c4805e544b9dfadf8787b774bcd208d"
  }, {
    "url": "pwa-192x192.png",
    "revision": "5614fbb35bb4ae74e0c0c8de45420090"
  }, {
    "url": "index.html",
    "revision": "1d2a502eb26085763cf6ecd5e9149e92"
  }, {
    "url": "icon.svg",
    "revision": "701a4b1bb1d16c0c172043724270f5de"
  }, {
    "url": "favicon.ico",
    "revision": "ec38a6ef9971fc168176901babf1cb94"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "12c9231f285752ff9c092286b07b7281"
  }, {
    "url": "404.html",
    "revision": "5fb3bc6569ee722706b1f7abf438fec5"
  }, {
    "url": "src/assets/images/cortune_studio_banner_1795108968395.jpg",
    "revision": "5368f2f8c4d8a327a731239cdf58eb5c"
  }, {
    "url": "src/assets/images/cortune_logo_app_1795108968017.jpg",
    "revision": "0dcdd7aa14de30e424df1b6cc9a22822"
  }, {
    "url": "assets/workbox-window.prod.es5-Dxeuga9-.js",
    "revision": null
  }, {
    "url": "assets/vendor-ui-BxvujNET.js",
    "revision": null
  }, {
    "url": "assets/vendor-media-DuGb1eeH.js",
    "revision": null
  }, {
    "url": "assets/vendor-heic-DVMWW6ed.js",
    "revision": null
  }, {
    "url": "assets/rolldown-runtime-Drvvfanw.js",
    "revision": null
  }, {
    "url": "assets/index-BzLm2ZAQ.css",
    "revision": null
  }, {
    "url": "assets/index-51OHbO3Y.js",
    "revision": null
  }, {
    "url": "assets/cortune_studio_banner_1795108968395-DwxMJBJ9.jpg",
    "revision": null
  }, {
    "url": "404.html",
    "revision": "5fb3bc6569ee722706b1f7abf438fec5"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "12c9231f285752ff9c092286b07b7281"
  }, {
    "url": "favicon.ico",
    "revision": "ec38a6ef9971fc168176901babf1cb94"
  }, {
    "url": "icon.svg",
    "revision": "701a4b1bb1d16c0c172043724270f5de"
  }, {
    "url": "pwa-192x192.png",
    "revision": "5614fbb35bb4ae74e0c0c8de45420090"
  }, {
    "url": "pwa-512x512.png",
    "revision": "3c4805e544b9dfadf8787b774bcd208d"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "e58972310190ba5c55679d90872643d9"
  }, {
    "url": "manifest.webmanifest",
    "revision": "9224bf267d79854b0f4ae15a03f2bc84"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
