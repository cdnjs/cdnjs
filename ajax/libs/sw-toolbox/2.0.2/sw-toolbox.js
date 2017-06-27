/*
  Copyright 2014 Google Inc. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.toolbox=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function cache(e,t){return helpers.openCache(t).then(function(t){return t.add(e)})}function uncache(e,t){return helpers.openCache(t).then(function(t){return t["delete"](e)})}function precache(e){Array.isArray(e)||(e=[e]),options.preCacheItems=options.preCacheItems.concat(e)}require("serviceworker-cache-polyfill");var options=require("./options"),router=require("./router"),helpers=require("./helpers"),strategies=require("./strategies");helpers.debug("Service Worker Toolbox is loading"),self.addEventListener("install",function(e){var t=options.cacheName+"$$$inactive$$$";helpers.debug("install event fired"),helpers.debug("creating cache ["+t+"]"),helpers.debug("preCache list: "+(options.preCacheItems.join(", ")||"(none)")),e.waitUntil(helpers.openCache({cacheName:t}).then(function(e){return Promise.all(options.preCacheItems).then(e.addAll.bind(e))}))}),self.addEventListener("activate",function(e){helpers.debug("activate event fired");var t=options.cacheName+"$$$inactive$$$";e.waitUntil(helpers.renameCache(t,options.cacheName))}),self.addEventListener("fetch",function(e){var t=router.match(e.request);t?e.respondWith(t(e.request)):router["default"]&&e.respondWith(router["default"](e.request))}),module.exports={networkOnly:strategies.networkOnly,networkFirst:strategies.networkFirst,cacheOnly:strategies.cacheOnly,cacheFirst:strategies.cacheFirst,fastest:strategies.fastest,router:router,options:options,cache:cache,uncache:uncache,precache:precache};
},{"./helpers":2,"./options":3,"./router":5,"./strategies":9,"serviceworker-cache-polyfill":14}],2:[function(require,module,exports){
"use strict";function debug(e,n){n=n||{};var c=n.debug||globalOptions.debug;c&&console.log("[sw-toolbox] "+e)}function openCache(e){e=e||{};var n=e.cacheName||globalOptions.cacheName;return debug('Opening cache "'+n+'"',e),caches.open(n)}function fetchAndCache(e,n){n=n||{};var c=n.successResponses||globalOptions.successResponses;return fetch(e.clone()).then(function(t){return c.test(t.status)&&openCache(n).then(function(n){n.put(e,t)}),t.clone()})}function renameCache(e,n,c){return debug("Renaming cache: ["+e+"] to ["+n+"]",c),caches["delete"](n).then(function(){return Promise.all([caches.open(e),caches.open(n)]).then(function(n){var c=n[0],t=n[1];return c.keys().then(function(e){return Promise.all(e.map(function(e){return c.match(e).then(function(n){return t.put(e,n)})}))}).then(function(){return caches["delete"](e)})})})}var globalOptions=require("./options");module.exports={debug:debug,fetchAndCache:fetchAndCache,openCache:openCache,renameCache:renameCache};
},{"./options":3}],3:[function(require,module,exports){
"use strict";var scope;scope=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,module.exports={cacheName:"$$$toolbox-cache$$$"+scope+"$$$",debug:!1,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/};
},{}],4:[function(require,module,exports){
"use strict";var url=new URL("./",self.location),basePath=url.pathname,pathRegexp=require("path-to-regexp"),Route=function(e,t,i,s){0!==t.indexOf("/")&&(t=basePath+t),this.method=e,this.keys=[],this.regexp=pathRegexp(t,this.keys),this.options=s,this.handler=i};Route.prototype.makeHandler=function(e){var t=this.regexp.exec(e),i={};return this.keys.forEach(function(e,s){i[e.name]=t[s+1]}),function(e){return this.handler(e,i,this.options)}.bind(this)},module.exports=Route;
},{"path-to-regexp":12}],5:[function(require,module,exports){
/*
  Copyright 2014 Google Inc. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
'use strict';

var Route = require('./route');

function regexEscape(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var keyMatch = function(map, string) {
  for (var item of map) {
    var pattern = item[0], value = item[1];
    if (pattern.test(string)) {
      return value;
    }
  }
  return null;
};

var Router = function() {
  this.routes = new Map();
  this.default = null;
};

['get', 'post', 'put', 'delete', 'head', 'any'].forEach(function(method) {
  Router.prototype[method] = function(path, handler, options) {
    return this.add(method, path, handler, options);
  };
});

Router.prototype.add = function(method, path, handler, options) {
  options = options || {};
  var origin = options.origin || self.location.origin;
  if (!(origin instanceof RegExp)) {
    origin = new RegExp(regexEscape(origin));
  }
  method = method.toLowerCase();

  var route = new Route(method, path, handler, options);

  if (!this.routes.has(origin)) {
    this.routes.set(origin, new Map());
  }

  var methodMap = this.routes.get(origin);
  if (!methodMap.has(method)) {
    methodMap.set(method, new Map());
  }

  var routeMap = methodMap.get(method);
  routeMap.set(route.regexp, route);
};

Router.prototype.matchMethod = function(method, url) {
  url = new URL(url);
  var origin = url.origin;
  var path = url.pathname;
  method = method.toLowerCase();

  var methods = keyMatch(this.routes, origin);
  if (!methods) {
    return null;
  }

  var routes = methods.get(method);
  if (!routes) {
    return null;
  }

  var route = keyMatch(routes, path);

  if (route) {
    return route.makeHandler(path);
  }

  return null;
};

Router.prototype.match = function(request) {
  return this.matchMethod(request.method, request.url) || this.matchMethod('any', request.url);
};

module.exports = new Router();

},{"./route":4}],6:[function(require,module,exports){
"use strict";function cacheFirst(e,r,t){return helpers.debug("Strategy: cache first ["+e.url+"]",t),helpers.openCache(t).then(function(r){return r.match(e).then(function(r){return r?r:helpers.fetchAndCache(e,t)})})}var helpers=require("../helpers");module.exports=cacheFirst;
},{"../helpers":2}],7:[function(require,module,exports){
"use strict";function cacheOnly(e,r,c){return helpers.debug("Strategy: cache only ["+e.url+"]",c),helpers.openCache(c).then(function(r){return r.match(e)})}var helpers=require("../helpers");module.exports=cacheOnly;
},{"../helpers":2}],8:[function(require,module,exports){
"use strict";function fastest(e,r,t){helpers.debug("Strategy: fastest ["+e.url+"]",t);var n=!1,c=[],s=function(e){return c.push(e.toString()),n?Promise.reject(new Error('Both cache and network failed: "'+c.join('", "')+'"')):void(n=!0)};return new Promise(function(r,n){helpers.fetchAndCache(e.clone(),t).then(r,s),cacheOnly(e,t).then(r,s)})}var helpers=require("../helpers"),cacheOnly=require("./cacheOnly");module.exports=fastest;
},{"../helpers":2,"./cacheOnly":7}],9:[function(require,module,exports){
module.exports={networkOnly:require("./networkOnly"),networkFirst:require("./networkFirst"),cacheOnly:require("./cacheOnly"),cacheFirst:require("./cacheFirst"),fastest:require("./fastest")};
},{"./cacheFirst":6,"./cacheOnly":7,"./fastest":8,"./networkFirst":10,"./networkOnly":11}],10:[function(require,module,exports){
"use strict";function networkFirst(e,r,s){s=s||{};var t=s.successResponses||globalOptions.successResponses;return helpers.debug("Strategy: network first ["+e.url+"]",s),helpers.openCache(s).then(function(r){return helpers.fetchAndCache(e,s).then(function(n){return t.test(n.status)?n:r.match(e).then(function(e){return helpers.debug("Response was an HTTP error",s),e?(helpers.debug("Resolving with cached response instead",s),e):(helpers.debug("No cached result, resolving with HTTP error response from network",s),n)})})["catch"](function(t){return helpers.debug("Network error, fallback to cache ["+e.url+"]",s),r.match(e)})})}var globalOptions=require("../options"),helpers=require("../helpers");module.exports=networkFirst;
},{"../helpers":2,"../options":3}],11:[function(require,module,exports){
"use strict";function networkOnly(e,r,t){return helpers.debug("Strategy: network only ["+e.url+"]",t),fetch(e)}var helpers=require("../helpers");module.exports=networkOnly;
},{"../helpers":2}],12:[function(require,module,exports){
function escapeGroup(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function attachKeys(e,r){return e.keys=r,e}function flags(e){return e.sensitive?"":"i"}function regexpToRegexp(e,r){var a=e.source.match(/\((?!\?)/g);if(a)for(var t=0;t<a.length;t++)r.push({name:t,delimiter:null,optional:!1,repeat:!1});return attachKeys(e,r)}function arrayToRegexp(e,r,a){for(var t=[],n=0;n<e.length;n++)t.push(pathToRegexp(e[n],r,a).source);var i=new RegExp("(?:"+t.join("|")+")",flags(a));return attachKeys(i,r)}function replacePath(e,r){function a(e,a,n,i,p,o,u,c){if(a)return a;if(c)return"\\"+c;var s="+"===u||"*"===u,g="?"===u||"*"===u;return r.push({name:i||t++,delimiter:n||"/",optional:g,repeat:s}),n=n?"\\"+n:"",p=escapeGroup(p||o||"[^"+(n||"\\/")+"]+?"),s&&(p=p+"(?:"+n+p+")*"),g?"(?:"+n+"("+p+"))?":n+"("+p+")"}var t=0;return e.replace(PATH_REGEXP,a)}function pathToRegexp(e,r,a){if(r=r||[],isArray(r)?a||(a={}):(a=r,r=[]),e instanceof RegExp)return regexpToRegexp(e,r,a);if(isArray(e))return arrayToRegexp(e,r,a);var t=a.strict,n=a.end!==!1,i=replacePath(e,r),p="/"===e.charAt(e.length-1);return t||(i=(p?i.slice(0,-2):i)+"(?:\\/(?=$))?"),i+=n?"$":t&&p?"":"(?=\\/|$)",attachKeys(new RegExp("^"+i,flags(a)),r)}var isArray=require("isarray");module.exports=pathToRegexp;var PATH_REGEXP=new RegExp(["(\\\\.)","([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?","([.+*?=^!:${}()[\\]|\\/])"].join("|"),"g");
},{"isarray":13}],13:[function(require,module,exports){
module.exports=Array.isArray||function(r){return"[object Array]"==Object.prototype.toString.call(r)};
},{}],14:[function(require,module,exports){
Cache.prototype.add||(Cache.prototype.add=function(t){return this.addAll([t])}),Cache.prototype.addAll||(Cache.prototype.addAll=function(t){function e(t){this.name="NetworkError",this.code=19,this.message=t}var r=this;return e.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return t=t.map(function(t){return t instanceof Request?t:String(t)}),Promise.all(t.map(function(t){"string"==typeof t&&(t=new Request(t));var r=new URL(t.url).protocol;if("http:"!==r&&"https:"!==r)throw new e("Invalid scheme");return fetch(t.clone())}))}).then(function(e){return Promise.all(e.map(function(e,n){return r.put(t[n],e)}))}).then(function(){return void 0})});
},{}]},{},[1])(1)
});


//# sourceMappingURL=sw-toolbox.map.json