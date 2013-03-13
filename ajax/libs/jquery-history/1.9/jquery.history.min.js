/*
 * jQuery history plugin
 * 
 * The MIT License
 * 
 * Copyright (c) 2006-2009 Taku Sano (Mikage Sawatari)
 * Copyright (c) 2010 Takayuki Miwa
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
(function(t){function n(n){function c(t){return t===!0?function(t){return t}:"string"==typeof t&&(t=a(t.split("")))||"function"==typeof t?function(n){return t(encodeURIComponent(n))}:encodeURIComponent}function a(n){var e=RegExp(t.map(n,encodeURIComponent).join("|"),"ig");return function(t){return t.replace(e,decodeURIComponent)}}n=t.extend({unescape:!1},n||{}),e.encoder=c(n.unescape)}var e={put:function(t,n){(n||window).location.hash=this.encoder(t)},get:function(n){var e=(n||window).location.hash.replace(/^#/,"");try{return t.browser.mozilla?e:decodeURIComponent(e)}catch(c){return e}},encoder:encodeURIComponent},c={id:"__jQuery_history",init:function(){var n='<iframe id="'+this.id+'" style="display:none" src="javascript:false;" />';return t("body").prepend(n),this},_document:function(){return t("#"+this.id)[0].contentWindow.document},put:function(t){var n=this._document();n.open(),n.close(),e.put(t,n)},get:function(){return e.get(this._document())}},a={};a.base={callback:void 0,type:void 0,check:function(){},load:function(){},init:function(t,e){n(e),o.callback=t,o._options=e,o._init()},_init:function(){},_options:{}},a.timer={_appState:void 0,_init:function(){var t=e.get();o._appState=t,o.callback(t),setInterval(o.check,100)},check:function(){var t=e.get();t!=o._appState&&(o._appState=t,o.callback(t))},load:function(t){t!=o._appState&&(e.put(t),o._appState=t,o.callback(t))}},a.iframeTimer={_appState:void 0,_init:function(){var t=e.get();o._appState=t,c.init().put(t),o.callback(t),setInterval(o.check,100)},check:function(){var t=c.get(),n=e.get();n!=t&&(n==o._appState?(o._appState=t,e.put(t),o.callback(t)):(o._appState=n,c.put(n),o.callback(n)))},load:function(t){t!=o._appState&&(e.put(t),c.put(t),o._appState=t,o.callback(t))}},a.hashchangeEvent={_init:function(){o.callback(e.get()),t(window).bind("hashchange",o.check)},check:function(){o.callback(e.get())},load:function(t){e.put(t)}};var o=t.extend({},a.base);o.type=t.browser.msie&&(8>t.browser.version||8>document.documentMode)?"iframeTimer":"onhashchange"in window?"hashchangeEvent":"timer",t.extend(o,a[o.type]),t.history=o})(jQuery);
