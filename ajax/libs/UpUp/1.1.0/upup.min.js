//! UpUp
//! version : 1.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp
(function(o){"use strict";var e=navigator.serviceWorker;if(!e)return this.UpUp=null,o;var i={"service-worker-url":"upup.sw.min.js","registration-options":{}},s=!1,n="font-weight: bold; color: #00f;";this.UpUp={start:function(t){this.addSettings(t),e.register(i["service-worker-url"],i["registration-options"]).then(function(t){s&&console.log("Service worker registration successful with scope: %c"+t.scope,n),(t.installing||e.controller||t.active).postMessage({action:"set-settings",settings:i})}).catch(function(t){s&&console.log("Service worker registration failed: %c"+t,n)})},addSettings:function(e){"string"==typeof(e=e||{})&&(e={content:e}),["content","content-url","assets","service-worker-url","cache-version"].forEach(function(t){e[t]!==o&&(i[t]=e[t])}),e.scope!==o&&(i["registration-options"].scope=e.scope)},debug:function(t){s=!(0<arguments.length)||!!t}}}).call(this);
//# sourceMappingURL=upup.min.js.map