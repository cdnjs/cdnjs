//! UpUp
//! version : 0.2.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp
(function(a){"use strict";var b=this,c=navigator.serviceWorker;if(!c)return b.UpUp=null,a;var d={"service-worker-url":"upup.sw.min.js"},e=!1,f="font-weight: bold; color: #00f;";b.UpUp={start:function(a){this.addSettings(a),c.register(d["service-worker-url"],{scope:"./"}).then(function(a){e&&console.log("ServiceWorker registration successful with scope: %c"+a.scope,f);var b=a.installing||c.controller;b.postMessage({action:"set-settings",settings:d})})["catch"](function(a){e&&console.log("ServiceWorker registration failed: %c"+a,f)})},addSettings:function(b){b=b||{},"string"==typeof b&&(b={content:b}),["content","content-url","assets","service-worker-url"].forEach(function(c){b[c]!==a&&(d[c]=b[c])})},debug:function(a){e=arguments.length>0?!!a:!0}}}).call(this);
//# sourceMappingURL=upup.min.js.map