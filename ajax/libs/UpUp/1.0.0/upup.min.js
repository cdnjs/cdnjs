//! UpUp
//! version : 1.0.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp
(function(e){"use strict";var t=navigator.serviceWorker;if(!t)return this.UpUp=null,e;var n={"service-worker-url":"upup.sw.min.js"},r=!1,s="font-weight: bold; color: #00f;";this.UpUp={start:function(e){this.addSettings(e),t.register(n["service-worker-url"],{scope:"./"}).then(function(e){r&&console.log("Service worker registration successful with scope: %c"+e.scope,s);(e.installing||t.controller||e.active).postMessage({action:"set-settings",settings:n})}).catch(function(e){r&&console.log("Service worker registration failed: %c"+e,s)})},addSettings:function(t){"string"==typeof(t=t||{})&&(t={content:t}),["content","content-url","assets","service-worker-url","cache-version"].forEach(function(r){t[r]!==e&&(n[r]=t[r])})},debug:function(e){r=!(arguments.length>0)||!!e}}}).call(this);
//# sourceMappingURL=upup.min.js.map