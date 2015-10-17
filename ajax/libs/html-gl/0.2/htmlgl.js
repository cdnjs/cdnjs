/*! promise-polyfill 2.0.0 */
!function(){function a(a,b){return function(){a.apply(b,arguments)}}function b(b){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof b)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],h(b,a(d,this),a(e,this))}function c(a){var b=this;return null===this._state?void this._deferreds.push(a):void j(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function d(b){try{if(b===this)throw new TypeError("A promise cannot be resolved with itself.");if(b&&("object"==typeof b||"function"==typeof b)){var c=b.then;if("function"==typeof c)return void h(a(c,b),a(d,this),a(e,this))}this._state=!0,this._value=b,f.call(this)}catch(g){e.call(this,g)}}function e(a){this._state=!1,this._value=a,f.call(this)}function f(){for(var a=0,b=this._deferreds.length;b>a;a++)c.call(this,this._deferreds[a]);this._deferreds=null}function g(a,b,c,d){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.resolve=c,this.reject=d}function h(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var i;i="object"==typeof window&&window?window:global;var j=b.immediateFn||i.setImmediate||function(a){setTimeout(a,1)},k=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};b.prototype["catch"]=function(a){return this.then(null,a)},b.prototype.then=function(a,d){var e=this;return new b(function(b,f){c.call(e,new g(a,d,b,f))})},b.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&k(arguments[0])?arguments[0]:arguments);return new b(function(b,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},b.resolve=function(a){return a&&"object"==typeof a&&a.constructor===b?a:new b(function(b){b(a)})},b.reject=function(a){return new b(function(b,c){c(a)})},b.race=function(a){return new b(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},"undefined"!=typeof module&&module.exports?module.exports=b:i.Promise||(i.Promise=b)}();
/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
// @version 0.5.5
"undefined"==typeof WeakMap&&!function(){var e=Object.defineProperty,t=Date.now()%1e9,o=function(){this.name="__st"+(1e9*Math.random()>>>0)+(t++ +"__")};o.prototype={set:function(t,o){var n=t[this.name];return n&&n[0]===t?n[1]=o:e(t,this.name,{value:[t,o],writable:!0}),this},get:function(e){var t;return(t=e[this.name])&&t[0]===e?t[1]:void 0},"delete":function(e){var t=e[this.name];return t&&t[0]===e?(t[0]=t[1]=void 0,!0):!1},has:function(e){var t=e[this.name];return t?t[0]===e:!1}},window.WeakMap=o}(),window.CustomElements=window.CustomElements||{flags:{}},function(e){var t=e.flags,o=[],n=function(e){o.push(e)},r=function(){o.forEach(function(t){t(e)})};e.addModule=n,e.initializeModules=r,e.hasNative=Boolean(document.registerElement),e.useNative=!t.register&&e.hasNative&&!window.ShadowDOMPolyfill&&(!window.HTMLImports||HTMLImports.useNative)}(CustomElements),CustomElements.addModule(function(e){function t(e,t){o(e,function(e){return t(e)?!0:void n(e,t)}),n(e,t)}function o(e,t,n){var r=e.firstElementChild;if(!r)for(r=e.firstChild;r&&r.nodeType!==Node.ELEMENT_NODE;)r=r.nextSibling;for(;r;)t(r,n)!==!0&&o(r,t,n),r=r.nextElementSibling;return null}function n(e,o){for(var n=e.shadowRoot;n;)t(n,o),n=n.olderShadowRoot}function r(e,t){i=[],a(e,t),i=null}function a(e,t){if(e=wrap(e),!(i.indexOf(e)>=0)){i.push(e);for(var o,n=e.querySelectorAll("link[rel="+u+"]"),r=0,d=n.length;d>r&&(o=n[r]);r++)o["import"]&&a(o["import"],t);t(e)}}var i,u=window.HTMLImports?HTMLImports.IMPORT_LINK_TYPE:"none";e.forDocumentTree=r,e.forSubtree=t}),CustomElements.addModule(function(e){function t(e){return o(e)||n(e)}function o(t){return e.upgrade(t)?!0:void u(t)}function n(e){y(e,function(e){return o(e)?!0:void 0})}function r(e){u(e),f(e)&&y(e,function(e){u(e)})}function a(e){M.push(e),C||(C=!0,setTimeout(i))}function i(){C=!1;for(var e,t=M,o=0,n=t.length;n>o&&(e=t[o]);o++)e();M=[]}function u(e){E?a(function(){d(e)}):d(e)}function d(e){e.__upgraded__&&(e.attachedCallback||e.detachedCallback)&&!e.__attached&&f(e)&&(e.__attached=!0,e.attachedCallback&&e.attachedCallback())}function c(e){s(e),y(e,function(e){s(e)})}function s(e){E?a(function(){l(e)}):l(e)}function l(e){e.__upgraded__&&(e.attachedCallback||e.detachedCallback)&&e.__attached&&!f(e)&&(e.__attached=!1,e.detachedCallback&&e.detachedCallback())}function f(e){for(var t=e,o=wrap(document);t;){if(t==o)return!0;t=t.parentNode||t.host}}function p(e){if(e.shadowRoot&&!e.shadowRoot.__watched){_.dom&&console.log("watching shadow-root for: ",e.localName);for(var t=e.shadowRoot;t;)h(t),t=t.olderShadowRoot}}function m(e){if(_.dom){var o=e[0];if(o&&"childList"===o.type&&o.addedNodes&&o.addedNodes){for(var n=o.addedNodes[0];n&&n!==document&&!n.host;)n=n.parentNode;var r=n&&(n.URL||n._URL||n.host&&n.host.localName)||"";r=r.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",e.length,r||"")}e.forEach(function(e){"childList"===e.type&&(N(e.addedNodes,function(e){e.localName&&t(e)}),N(e.removedNodes,function(e){e.localName&&c(e)}))}),_.dom&&console.groupEnd()}function w(e){for(e=wrap(e),e||(e=wrap(document));e.parentNode;)e=e.parentNode;var t=e.__observer;t&&(m(t.takeRecords()),i())}function h(e){if(!e.__observer){var t=new MutationObserver(m);t.observe(e,{childList:!0,subtree:!0}),e.__observer=t}}function g(e){e=wrap(e),_.dom&&console.group("upgradeDocument: ",e.baseURI.split("/").pop()),t(e),h(e),_.dom&&console.groupEnd()}function v(e){b(e,g)}var _=e.flags,y=e.forSubtree,b=e.forDocumentTree,E=!window.MutationObserver||window.MutationObserver===window.JsMutationObserver;e.hasPolyfillMutations=E;var C=!1,M=[],N=Array.prototype.forEach.call.bind(Array.prototype.forEach),T=Element.prototype.createShadowRoot;T&&(Element.prototype.createShadowRoot=function(){var e=T.call(this);return CustomElements.watchShadow(this),e}),e.watchShadow=p,e.upgradeDocumentTree=v,e.upgradeSubtree=n,e.upgradeAll=t,e.attachedNode=r,e.takeRecords=w}),CustomElements.addModule(function(e){function t(t){if(!t.__upgraded__&&t.nodeType===Node.ELEMENT_NODE){var n=t.getAttribute("is"),r=e.getRegisteredDefinition(n||t.localName);if(r){if(n&&r.tag==t.localName)return o(t,r);if(!n&&!r["extends"])return o(t,r)}}}function o(t,o){return i.upgrade&&console.group("upgrade:",t.localName),o.is&&t.setAttribute("is",o.is),n(t,o),t.__upgraded__=!0,a(t),e.attachedNode(t),e.upgradeSubtree(t),i.upgrade&&console.groupEnd(),t}function n(e,t){Object.__proto__?e.__proto__=t.prototype:(r(e,t.prototype,t["native"]),e.__proto__=t.prototype)}function r(e,t,o){for(var n={},r=t;r!==o&&r!==HTMLElement.prototype;){for(var a,i=Object.getOwnPropertyNames(r),u=0;a=i[u];u++)n[a]||(Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a)),n[a]=1);r=Object.getPrototypeOf(r)}}function a(e){e.createdCallback&&e.createdCallback()}var i=e.flags;e.upgrade=t,e.upgradeWithDefinition=o,e.implementPrototype=n}),CustomElements.addModule(function(e){function t(t,n){var d=n||{};if(!t)throw new Error("document.registerElement: first argument `name` must not be empty");if(t.indexOf("-")<0)throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '"+String(t)+"'.");if(r(t))throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '"+String(t)+"'. The type name is invalid.");if(c(t))throw new Error("DuplicateDefinitionError: a type with name '"+String(t)+"' is already registered");return d.prototype||(d.prototype=Object.create(HTMLElement.prototype)),d.__name=t.toLowerCase(),d.lifecycle=d.lifecycle||{},d.ancestry=a(d["extends"]),i(d),u(d),o(d.prototype),s(d.__name,d),d.ctor=l(d),d.ctor.prototype=d.prototype,d.prototype.constructor=d.ctor,e.ready&&h(document),d.ctor}function o(e){if(!e.setAttribute._polyfilled){var t=e.setAttribute;e.setAttribute=function(e,o){n.call(this,e,o,t)};var o=e.removeAttribute;e.removeAttribute=function(e){n.call(this,e,null,o)},e.setAttribute._polyfilled=!0}}function n(e,t,o){e=e.toLowerCase();var n=this.getAttribute(e);o.apply(this,arguments);var r=this.getAttribute(e);this.attributeChangedCallback&&r!==n&&this.attributeChangedCallback(e,n,r)}function r(e){for(var t=0;t<b.length;t++)if(e===b[t])return!0}function a(e){var t=c(e);return t?a(t["extends"]).concat([t]):[]}function i(e){for(var t,o=e["extends"],n=0;t=e.ancestry[n];n++)o=t.is&&t.tag;e.tag=o||e.__name,o&&(e.is=e.__name)}function u(e){if(!Object.__proto__){var t=HTMLElement.prototype;if(e.is){var o=document.createElement(e.tag),n=Object.getPrototypeOf(o);n===e.prototype&&(t=n)}for(var r,a=e.prototype;a&&a!==t;)r=Object.getPrototypeOf(a),a.__proto__=r,a=r;e["native"]=t}}function d(e){return v(M(e.tag),e)}function c(e){return e?E[e.toLowerCase()]:void 0}function s(e,t){E[e]=t}function l(e){return function(){return d(e)}}function f(e,t,o){return e===C?p(t,o):N(e,t)}function p(e,t){var o=c(t||e);if(o){if(e==o.tag&&t==o.is)return new o.ctor;if(!t&&!o.is)return new o.ctor}var n;return t?(n=p(e),n.setAttribute("is",t),n):(n=M(e),e.indexOf("-")>=0&&_(n,HTMLElement),n)}function m(e){var t=T.call(this,e);return g(t),t}var w,h=e.upgradeDocumentTree,g=e.upgrade,v=e.upgradeWithDefinition,_=e.implementPrototype,y=e.useNative,b=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],E={},C="http://www.w3.org/1999/xhtml",M=document.createElement.bind(document),N=document.createElementNS.bind(document),T=Node.prototype.cloneNode;w=Object.__proto__||y?function(e,t){return e instanceof t}:function(e,t){for(var o=e;o;){if(o===t.prototype)return!0;o=o.__proto__}return!1},document.registerElement=t,document.createElement=p,document.createElementNS=f,Node.prototype.cloneNode=m,e.registry=E,e["instanceof"]=w,e.reservedTagList=b,e.getRegisteredDefinition=c,document.register=document.registerElement}),function(e){function t(){i(wrap(document)),window.HTMLImports&&(HTMLImports.__importsParsingHook=function(e){i(wrap(e["import"]))}),CustomElements.ready=!0,setTimeout(function(){CustomElements.readyTime=Date.now(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))})}var o=e.useNative,n=e.initializeModules,r=/Trident/.test(navigator.userAgent);if(o){var a=function(){};e.watchShadow=a,e.upgrade=a,e.upgradeAll=a,e.upgradeDocumentTree=a,e.upgradeSubtree=a,e.takeRecords=a,e["instanceof"]=function(e,t){return e instanceof t}}else n();var i=e.upgradeDocumentTree;if(window.wrap||(window.ShadowDOMPolyfill?(window.wrap=ShadowDOMPolyfill.wrapIfNeeded,window.unwrap=ShadowDOMPolyfill.unwrapIfNeeded):window.wrap=window.unwrap=function(e){return e}),r&&"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(e,t){t=t||{};var o=document.createEvent("CustomEvent");return o.initCustomEvent(e,Boolean(t.bubbles),Boolean(t.cancelable),t.detail),o},window.CustomEvent.prototype=window.Event.prototype),"complete"===document.readyState||e.flags.eager)t();else if("interactive"!==document.readyState||window.attachEvent||window.HTMLImports&&!window.HTMLImports.ready){var u=window.HTMLImports&&!HTMLImports.ready?"HTMLImportsLoaded":"DOMContentLoaded";window.addEventListener(u,t)}else t()}(window.CustomElements);
/**
 * @license
 * pixi.js - v2.2.8
 * Copyright (c) 2012-2014, Mat Groves
 * http://goodboydigital.com/
 *
 * Compiled: 2015-03-15
 *
 * pixi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(){var a=this,b=b||{};b.WEBGL_RENDERER=0,b.CANVAS_RENDERER=1,b.VERSION="v2.2.8",b.blendModes={NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},b.scaleModes={DEFAULT:0,LINEAR:0,NEAREST:1},b._UID=0,"undefined"!=typeof Float32Array?(b.Float32Array=Float32Array,b.Uint16Array=Uint16Array,b.Uint32Array=Uint32Array,b.ArrayBuffer=ArrayBuffer):(b.Float32Array=Array,b.Uint16Array=Array),b.INTERACTION_FREQUENCY=30,b.AUTO_PREVENT_DEFAULT=!0,b.PI_2=2*Math.PI,b.RAD_TO_DEG=180/Math.PI,b.DEG_TO_RAD=Math.PI/180,b.RETINA_PREFIX="@2x",b.dontSayHello=!1,b.defaultRenderOptions={view:null,transparent:!1,antialias:!1,preserveDrawingBuffer:!1,resolution:1,clearBeforeRender:!0,autoResize:!1},b.sayHello=function(a){if(!b.dontSayHello){if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1){var c=["%c %c %c Pixi.js "+b.VERSION+" - "+a+"  %c  %c  http://www.pixijs.com/  %c %c ♥%c♥%c♥ ","background: #ff66a5","background: #ff66a5","color: #ff66a5; background: #030307;","background: #ff66a5","background: #ffc3dc","background: #ff66a5","color: #ff2424; background: #fff","color: #ff2424; background: #fff","color: #ff2424; background: #fff"];console.log.apply(console,c)}else window.console&&console.log("Pixi.js "+b.VERSION+" - http://www.pixijs.com/");b.dontSayHello=!0}},b.Point=function(a,b){this.x=a||0,this.y=b||0},b.Point.prototype.clone=function(){return new b.Point(this.x,this.y)},b.Point.prototype.set=function(a,b){this.x=a||0,this.y=b||(0!==b?this.x:0)},b.Point.prototype.constructor=b.Point,b.Rectangle=function(a,b,c,d){this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0},b.Rectangle.prototype.clone=function(){return new b.Rectangle(this.x,this.y,this.width,this.height)},b.Rectangle.prototype.contains=function(a,b){if(this.width<=0||this.height<=0)return!1;var c=this.x;if(a>=c&&a<=c+this.width){var d=this.y;if(b>=d&&b<=d+this.height)return!0}return!1},b.Rectangle.prototype.constructor=b.Rectangle,b.EmptyRectangle=new b.Rectangle(0,0,0,0),b.Polygon=function(a){if(a instanceof Array||(a=Array.prototype.slice.call(arguments)),a[0]instanceof b.Point){for(var c=[],d=0,e=a.length;e>d;d++)c.push(a[d].x,a[d].y);a=c}this.closed=!0,this.points=a},b.Polygon.prototype.clone=function(){var a=this.points.slice();return new b.Polygon(a)},b.Polygon.prototype.contains=function(a,b){for(var c=!1,d=this.points.length/2,e=0,f=d-1;d>e;f=e++){var g=this.points[2*e],h=this.points[2*e+1],i=this.points[2*f],j=this.points[2*f+1],k=h>b!=j>b&&(i-g)*(b-h)/(j-h)+g>a;k&&(c=!c)}return c},b.Polygon.prototype.constructor=b.Polygon,b.Circle=function(a,b,c){this.x=a||0,this.y=b||0,this.radius=c||0},b.Circle.prototype.clone=function(){return new b.Circle(this.x,this.y,this.radius)},b.Circle.prototype.contains=function(a,b){if(this.radius<=0)return!1;var c=this.x-a,d=this.y-b,e=this.radius*this.radius;return c*=c,d*=d,e>=c+d},b.Circle.prototype.getBounds=function(){return new b.Rectangle(this.x-this.radius,this.y-this.radius,2*this.radius,2*this.radius)},b.Circle.prototype.constructor=b.Circle,b.Ellipse=function(a,b,c,d){this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0},b.Ellipse.prototype.clone=function(){return new b.Ellipse(this.x,this.y,this.width,this.height)},b.Ellipse.prototype.contains=function(a,b){if(this.width<=0||this.height<=0)return!1;var c=(a-this.x)/this.width,d=(b-this.y)/this.height;return c*=c,d*=d,1>=c+d},b.Ellipse.prototype.getBounds=function(){return new b.Rectangle(this.x-this.width,this.y-this.height,this.width,this.height)},b.Ellipse.prototype.constructor=b.Ellipse,b.RoundedRectangle=function(a,b,c,d,e){this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0,this.radius=e||20},b.RoundedRectangle.prototype.clone=function(){return new b.RoundedRectangle(this.x,this.y,this.width,this.height,this.radius)},b.RoundedRectangle.prototype.contains=function(a,b){if(this.width<=0||this.height<=0)return!1;var c=this.x;if(a>=c&&a<=c+this.width){var d=this.y;if(b>=d&&b<=d+this.height)return!0}return!1},b.RoundedRectangle.prototype.constructor=b.RoundedRectangle,b.Matrix=function(){this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0},b.Matrix.prototype.fromArray=function(a){this.a=a[0],this.b=a[1],this.c=a[3],this.d=a[4],this.tx=a[2],this.ty=a[5]},b.Matrix.prototype.toArray=function(a){this.array||(this.array=new b.Float32Array(9));var c=this.array;return a?(c[0]=this.a,c[1]=this.b,c[2]=0,c[3]=this.c,c[4]=this.d,c[5]=0,c[6]=this.tx,c[7]=this.ty,c[8]=1):(c[0]=this.a,c[1]=this.c,c[2]=this.tx,c[3]=this.b,c[4]=this.d,c[5]=this.ty,c[6]=0,c[7]=0,c[8]=1),c},b.Matrix.prototype.apply=function(a,c){return c=c||new b.Point,c.x=this.a*a.x+this.c*a.y+this.tx,c.y=this.b*a.x+this.d*a.y+this.ty,c},b.Matrix.prototype.applyInverse=function(a,c){c=c||new b.Point;var d=1/(this.a*this.d+this.c*-this.b);return c.x=this.d*d*a.x+-this.c*d*a.y+(this.ty*this.c-this.tx*this.d)*d,c.y=this.a*d*a.y+-this.b*d*a.x+(-this.ty*this.a+this.tx*this.b)*d,c},b.Matrix.prototype.translate=function(a,b){return this.tx+=a,this.ty+=b,this},b.Matrix.prototype.scale=function(a,b){return this.a*=a,this.d*=b,this.c*=a,this.b*=b,this.tx*=a,this.ty*=b,this},b.Matrix.prototype.rotate=function(a){var b=Math.cos(a),c=Math.sin(a),d=this.a,e=this.c,f=this.tx;return this.a=d*b-this.b*c,this.b=d*c+this.b*b,this.c=e*b-this.d*c,this.d=e*c+this.d*b,this.tx=f*b-this.ty*c,this.ty=f*c+this.ty*b,this},b.Matrix.prototype.append=function(a){var b=this.a,c=this.b,d=this.c,e=this.d;return this.a=a.a*b+a.b*d,this.b=a.a*c+a.b*e,this.c=a.c*b+a.d*d,this.d=a.c*c+a.d*e,this.tx=a.tx*b+a.ty*d+this.tx,this.ty=a.tx*c+a.ty*e+this.ty,this},b.Matrix.prototype.identity=function(){return this.a=1,this.b=0,this.c=0,this.d=1,this.tx=0,this.ty=0,this},b.identityMatrix=new b.Matrix,b.DisplayObject=function(){this.position=new b.Point,this.scale=new b.Point(1,1),this.pivot=new b.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.hitArea=null,this.buttonMode=!1,this.renderable=!1,this.parent=null,this.stage=null,this.worldAlpha=1,this._interactive=!1,this.defaultCursor="pointer",this.worldTransform=new b.Matrix,this._sr=0,this._cr=1,this.filterArea=null,this._bounds=new b.Rectangle(0,0,1,1),this._currentBounds=null,this._mask=null,this._cacheAsBitmap=!1,this._cacheIsDirty=!1},b.DisplayObject.prototype.constructor=b.DisplayObject,Object.defineProperty(b.DisplayObject.prototype,"interactive",{get:function(){return this._interactive},set:function(a){this._interactive=a,this.stage&&(this.stage.dirty=!0)}}),Object.defineProperty(b.DisplayObject.prototype,"worldVisible",{get:function(){var a=this;do{if(!a.visible)return!1;a=a.parent}while(a);return!0}}),Object.defineProperty(b.DisplayObject.prototype,"mask",{get:function(){return this._mask},set:function(a){this._mask&&(this._mask.isMask=!1),this._mask=a,this._mask&&(this._mask.isMask=!0)}}),Object.defineProperty(b.DisplayObject.prototype,"filters",{get:function(){return this._filters},set:function(a){if(a){for(var b=[],c=0;c<a.length;c++)for(var d=a[c].passes,e=0;e<d.length;e++)b.push(d[e]);this._filterBlock={target:this,filterPasses:b}}this._filters=a}}),Object.defineProperty(b.DisplayObject.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap},set:function(a){this._cacheAsBitmap!==a&&(a?this._generateCachedSprite():this._destroyCachedSprite(),this._cacheAsBitmap=a)}}),b.DisplayObject.prototype.updateTransform=function(){var a,c,d,e,f,g,h=this.parent.worldTransform,i=this.worldTransform;this.rotation%b.PI_2?(this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation)),a=this._cr*this.scale.x,c=this._sr*this.scale.x,d=-this._sr*this.scale.y,e=this._cr*this.scale.y,f=this.position.x,g=this.position.y,(this.pivot.x||this.pivot.y)&&(f-=this.pivot.x*a+this.pivot.y*d,g-=this.pivot.x*c+this.pivot.y*e),i.a=a*h.a+c*h.c,i.b=a*h.b+c*h.d,i.c=d*h.a+e*h.c,i.d=d*h.b+e*h.d,i.tx=f*h.a+g*h.c+h.tx,i.ty=f*h.b+g*h.d+h.ty):(a=this.scale.x,e=this.scale.y,f=this.position.x-this.pivot.x*a,g=this.position.y-this.pivot.y*e,i.a=a*h.a,i.b=a*h.b,i.c=e*h.c,i.d=e*h.d,i.tx=f*h.a+g*h.c+h.tx,i.ty=f*h.b+g*h.d+h.ty),this.worldAlpha=this.alpha*this.parent.worldAlpha},b.DisplayObject.prototype.displayObjectUpdateTransform=b.DisplayObject.prototype.updateTransform,b.DisplayObject.prototype.getBounds=function(a){return a=a,b.EmptyRectangle},b.DisplayObject.prototype.getLocalBounds=function(){return this.getBounds(b.identityMatrix)},b.DisplayObject.prototype.setStageReference=function(a){this.stage=a,this._interactive&&(this.stage.dirty=!0)},b.DisplayObject.prototype.generateTexture=function(a,c,d){var e=this.getLocalBounds(),f=new b.RenderTexture(0|e.width,0|e.height,d,c,a);return b.DisplayObject._tempMatrix.tx=-e.x,b.DisplayObject._tempMatrix.ty=-e.y,f.render(this,b.DisplayObject._tempMatrix),f},b.DisplayObject.prototype.updateCache=function(){this._generateCachedSprite()},b.DisplayObject.prototype.toGlobal=function(a){return this.displayObjectUpdateTransform(),this.worldTransform.apply(a)},b.DisplayObject.prototype.toLocal=function(a,b){return b&&(a=b.toGlobal(a)),this.displayObjectUpdateTransform(),this.worldTransform.applyInverse(a)},b.DisplayObject.prototype._renderCachedSprite=function(a){this._cachedSprite.worldAlpha=this.worldAlpha,a.gl?b.Sprite.prototype._renderWebGL.call(this._cachedSprite,a):b.Sprite.prototype._renderCanvas.call(this._cachedSprite,a)},b.DisplayObject.prototype._generateCachedSprite=function(){this._cacheAsBitmap=!1;var a=this.getLocalBounds();if(this._cachedSprite)this._cachedSprite.texture.resize(0|a.width,0|a.height);else{var c=new b.RenderTexture(0|a.width,0|a.height);this._cachedSprite=new b.Sprite(c),this._cachedSprite.worldTransform=this.worldTransform}var d=this._filters;this._filters=null,this._cachedSprite.filters=d,b.DisplayObject._tempMatrix.tx=-a.x,b.DisplayObject._tempMatrix.ty=-a.y,this._cachedSprite.texture.render(this,b.DisplayObject._tempMatrix,!0),this._cachedSprite.anchor.x=-(a.x/a.width),this._cachedSprite.anchor.y=-(a.y/a.height),this._filters=d,this._cacheAsBitmap=!0},b.DisplayObject.prototype._destroyCachedSprite=function(){this._cachedSprite&&(this._cachedSprite.texture.destroy(!0),this._cachedSprite=null)},b.DisplayObject.prototype._renderWebGL=function(a){a=a},b.DisplayObject.prototype._renderCanvas=function(a){a=a},b.DisplayObject._tempMatrix=new b.Matrix,Object.defineProperty(b.DisplayObject.prototype,"x",{get:function(){return this.position.x},set:function(a){this.position.x=a}}),Object.defineProperty(b.DisplayObject.prototype,"y",{get:function(){return this.position.y},set:function(a){this.position.y=a}}),b.DisplayObjectContainer=function(){b.DisplayObject.call(this),this.children=[]},b.DisplayObjectContainer.prototype=Object.create(b.DisplayObject.prototype),b.DisplayObjectContainer.prototype.constructor=b.DisplayObjectContainer,Object.defineProperty(b.DisplayObjectContainer.prototype,"width",{get:function(){return this.scale.x*this.getLocalBounds().width},set:function(a){var b=this.getLocalBounds().width;this.scale.x=0!==b?a/b:1,this._width=a}}),Object.defineProperty(b.DisplayObjectContainer.prototype,"height",{get:function(){return this.scale.y*this.getLocalBounds().height},set:function(a){var b=this.getLocalBounds().height;this.scale.y=0!==b?a/b:1,this._height=a}}),b.DisplayObjectContainer.prototype.addChild=function(a){return this.addChildAt(a,this.children.length)},b.DisplayObjectContainer.prototype.addChildAt=function(a,b){if(b>=0&&b<=this.children.length)return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),this.stage&&a.setStageReference(this.stage),a;throw new Error(a+"addChildAt: The index "+b+" supplied is out of bounds "+this.children.length)},b.DisplayObjectContainer.prototype.swapChildren=function(a,b){if(a!==b){var c=this.getChildIndex(a),d=this.getChildIndex(b);if(0>c||0>d)throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");this.children[c]=b,this.children[d]=a}},b.DisplayObjectContainer.prototype.getChildIndex=function(a){var b=this.children.indexOf(a);if(-1===b)throw new Error("The supplied DisplayObject must be a child of the caller");return b},b.DisplayObjectContainer.prototype.setChildIndex=function(a,b){if(0>b||b>=this.children.length)throw new Error("The supplied index is out of bounds");var c=this.getChildIndex(a);this.children.splice(c,1),this.children.splice(b,0,a)},b.DisplayObjectContainer.prototype.getChildAt=function(a){if(0>a||a>=this.children.length)throw new Error("getChildAt: Supplied index "+a+" does not exist in the child list, or the supplied DisplayObject must be a child of the caller");return this.children[a]},b.DisplayObjectContainer.prototype.removeChild=function(a){var b=this.children.indexOf(a);if(-1!==b)return this.removeChildAt(b)},b.DisplayObjectContainer.prototype.removeChildAt=function(a){var b=this.getChildAt(a);return this.stage&&b.removeStageReference(),b.parent=void 0,this.children.splice(a,1),b},b.DisplayObjectContainer.prototype.removeChildren=function(a,b){var c=a||0,d="number"==typeof b?b:this.children.length,e=d-c;if(e>0&&d>=e){for(var f=this.children.splice(c,e),g=0;g<f.length;g++){var h=f[g];this.stage&&h.removeStageReference(),h.parent=void 0}return f}if(0===e&&0===this.children.length)return[];throw new Error("removeChildren: Range Error, numeric values are outside the acceptable range")},b.DisplayObjectContainer.prototype.updateTransform=function(){if(this.visible&&(this.displayObjectUpdateTransform(),!this._cacheAsBitmap))for(var a=0,b=this.children.length;b>a;a++)this.children[a].updateTransform()},b.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform=b.DisplayObjectContainer.prototype.updateTransform,b.DisplayObjectContainer.prototype.getBounds=function(){if(0===this.children.length)return b.EmptyRectangle;for(var a,c,d,e=1/0,f=1/0,g=-(1/0),h=-(1/0),i=!1,j=0,k=this.children.length;k>j;j++){var l=this.children[j];l.visible&&(i=!0,a=this.children[j].getBounds(),e=e<a.x?e:a.x,f=f<a.y?f:a.y,c=a.width+a.x,d=a.height+a.y,g=g>c?g:c,h=h>d?h:d)}if(!i)return b.EmptyRectangle;var m=this._bounds;return m.x=e,m.y=f,m.width=g-e,m.height=h-f,m},b.DisplayObjectContainer.prototype.getLocalBounds=function(){var a=this.worldTransform;this.worldTransform=b.identityMatrix;for(var c=0,d=this.children.length;d>c;c++)this.children[c].updateTransform();var e=this.getBounds();return this.worldTransform=a,e},b.DisplayObjectContainer.prototype.setStageReference=function(a){this.stage=a,this._interactive&&(this.stage.dirty=!0);for(var b=0,c=this.children.length;c>b;b++){var d=this.children[b];d.setStageReference(a)}},b.DisplayObjectContainer.prototype.removeStageReference=function(){for(var a=0,b=this.children.length;b>a;a++){var c=this.children[a];c.removeStageReference()}this._interactive&&(this.stage.dirty=!0),this.stage=null},b.DisplayObjectContainer.prototype._renderWebGL=function(a){if(this.visible&&!(this.alpha<=0)){if(this._cacheAsBitmap)return void this._renderCachedSprite(a);var b,c;if(this._mask||this._filters){for(this._filters&&(a.spriteBatch.flush(),a.filterManager.pushFilter(this._filterBlock)),this._mask&&(a.spriteBatch.stop(),a.maskManager.pushMask(this.mask,a),a.spriteBatch.start()),b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a);a.spriteBatch.stop(),this._mask&&a.maskManager.popMask(this._mask,a),this._filters&&a.filterManager.popFilter(),a.spriteBatch.start()}else for(b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a)}},b.DisplayObjectContainer.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha){if(this._cacheAsBitmap)return void this._renderCachedSprite(a);this._mask&&a.maskManager.pushMask(this._mask,a);for(var b=0,c=this.children.length;c>b;b++){var d=this.children[b];d._renderCanvas(a)}this._mask&&a.maskManager.popMask(a)}},b.Sprite=function(a){b.DisplayObjectContainer.call(this),this.anchor=new b.Point,this.texture=a||b.Texture.emptyTexture,this._width=0,this._height=0,this.tint=16777215,this.blendMode=b.blendModes.NORMAL,this.shader=null,this.texture.baseTexture.hasLoaded?this.onTextureUpdate():this.texture.on("update",this.onTextureUpdate.bind(this)),this.renderable=!0},b.Sprite.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Sprite.prototype.constructor=b.Sprite,Object.defineProperty(b.Sprite.prototype,"width",{get:function(){return this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(b.Sprite.prototype,"height",{get:function(){return this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),b.Sprite.prototype.setTexture=function(a){this.texture=a,this.cachedTint=16777215},b.Sprite.prototype.onTextureUpdate=function(){this._width&&(this.scale.x=this._width/this.texture.frame.width),this._height&&(this.scale.y=this._height/this.texture.frame.height)},b.Sprite.prototype.getBounds=function(a){var b=this.texture.frame.width,c=this.texture.frame.height,d=b*(1-this.anchor.x),e=b*-this.anchor.x,f=c*(1-this.anchor.y),g=c*-this.anchor.y,h=a||this.worldTransform,i=h.a,j=h.b,k=h.c,l=h.d,m=h.tx,n=h.ty,o=-(1/0),p=-(1/0),q=1/0,r=1/0;if(0===j&&0===k)0>i&&(i*=-1),0>l&&(l*=-1),q=i*e+m,o=i*d+m,r=l*g+n,p=l*f+n;else{var s=i*e+k*g+m,t=l*g+j*e+n,u=i*d+k*g+m,v=l*g+j*d+n,w=i*d+k*f+m,x=l*f+j*d+n,y=i*e+k*f+m,z=l*f+j*e+n;q=q>s?s:q,q=q>u?u:q,q=q>w?w:q,q=q>y?y:q,r=r>t?t:r,r=r>v?v:r,r=r>x?x:r,r=r>z?z:r,o=s>o?s:o,o=u>o?u:o,o=w>o?w:o,o=y>o?y:o,p=t>p?t:p,p=v>p?v:p,p=x>p?x:p,p=z>p?z:p}var A=this._bounds;return A.x=q,A.width=o-q,A.y=r,A.height=p-r,this._currentBounds=A,A},b.Sprite.prototype._renderWebGL=function(a){if(this.visible&&!(this.alpha<=0)){var b,c;if(this._mask||this._filters){var d=a.spriteBatch;for(this._filters&&(d.flush(),a.filterManager.pushFilter(this._filterBlock)),this._mask&&(d.stop(),a.maskManager.pushMask(this.mask,a),d.start()),d.render(this),b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a);d.stop(),this._mask&&a.maskManager.popMask(this._mask,a),this._filters&&a.filterManager.popFilter(),d.start()}else for(a.spriteBatch.render(this),b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a)}},b.Sprite.prototype._renderCanvas=function(a){if(!(this.visible===!1||0===this.alpha||this.texture.crop.width<=0||this.texture.crop.height<=0)){if(this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,a.context.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]),this._mask&&a.maskManager.pushMask(this._mask,a),this.texture.valid){var c=this.texture.baseTexture.resolution/a.resolution;a.context.globalAlpha=this.worldAlpha,a.smoothProperty&&a.scaleMode!==this.texture.baseTexture.scaleMode&&(a.scaleMode=this.texture.baseTexture.scaleMode,a.context[a.smoothProperty]=a.scaleMode===b.scaleModes.LINEAR);var d=this.texture.trim?this.texture.trim.x-this.anchor.x*this.texture.trim.width:this.anchor.x*-this.texture.frame.width,e=this.texture.trim?this.texture.trim.y-this.anchor.y*this.texture.trim.height:this.anchor.y*-this.texture.frame.height;a.roundPixels?(a.context.setTransform(this.worldTransform.a,this.worldTransform.b,this.worldTransform.c,this.worldTransform.d,this.worldTransform.tx*a.resolution|0,this.worldTransform.ty*a.resolution|0),d=0|d,e=0|e):a.context.setTransform(this.worldTransform.a,this.worldTransform.b,this.worldTransform.c,this.worldTransform.d,this.worldTransform.tx*a.resolution,this.worldTransform.ty*a.resolution),16777215!==this.tint?(this.cachedTint!==this.tint&&(this.cachedTint=this.tint,this.tintedTexture=b.CanvasTinter.getTintedTexture(this,this.tint)),a.context.drawImage(this.tintedTexture,0,0,this.texture.crop.width,this.texture.crop.height,d/c,e/c,this.texture.crop.width/c,this.texture.crop.height/c)):a.context.drawImage(this.texture.baseTexture.source,this.texture.crop.x,this.texture.crop.y,this.texture.crop.width,this.texture.crop.height,d/c,e/c,this.texture.crop.width/c,this.texture.crop.height/c)}for(var f=0,g=this.children.length;g>f;f++)this.children[f]._renderCanvas(a);this._mask&&a.maskManager.popMask(a)}},b.Sprite.fromFrame=function(a){var c=b.TextureCache[a];if(!c)throw new Error('The frameId "'+a+'" does not exist in the texture cache'+this);return new b.Sprite(c)},b.Sprite.fromImage=function(a,c,d){var e=b.Texture.fromImage(a,c,d);return new b.Sprite(e)},b.SpriteBatch=function(a){b.DisplayObjectContainer.call(this),this.textureThing=a,this.ready=!1},b.SpriteBatch.prototype=Object.create(b.DisplayObjectContainer.prototype),b.SpriteBatch.prototype.constructor=b.SpriteBatch,b.SpriteBatch.prototype.initWebGL=function(a){this.fastSpriteBatch=new b.WebGLFastSpriteBatch(a),this.ready=!0},b.SpriteBatch.prototype.updateTransform=function(){this.displayObjectUpdateTransform()},b.SpriteBatch.prototype._renderWebGL=function(a){!this.visible||this.alpha<=0||!this.children.length||(this.ready||this.initWebGL(a.gl),this.fastSpriteBatch.gl!==a.gl&&this.fastSpriteBatch.setContext(a.gl),a.spriteBatch.stop(),a.shaderManager.setShader(a.shaderManager.fastShader),this.fastSpriteBatch.begin(this,a),this.fastSpriteBatch.render(this),a.spriteBatch.start())},b.SpriteBatch.prototype._renderCanvas=function(a){if(this.visible&&!(this.alpha<=0)&&this.children.length){var b=a.context;b.globalAlpha=this.worldAlpha,this.displayObjectUpdateTransform();for(var c=this.worldTransform,d=!0,e=0;e<this.children.length;e++){var f=this.children[e];if(f.visible){var g=f.texture,h=g.frame;if(b.globalAlpha=this.worldAlpha*f.alpha,f.rotation%(2*Math.PI)===0)d&&(b.setTransform(c.a,c.b,c.c,c.d,c.tx,c.ty),d=!1),b.drawImage(g.baseTexture.source,h.x,h.y,h.width,h.height,f.anchor.x*-h.width*f.scale.x+f.position.x+.5|0,f.anchor.y*-h.height*f.scale.y+f.position.y+.5|0,h.width*f.scale.x,h.height*f.scale.y);else{d||(d=!0),f.displayObjectUpdateTransform();var i=f.worldTransform;a.roundPixels?b.setTransform(i.a,i.b,i.c,i.d,0|i.tx,0|i.ty):b.setTransform(i.a,i.b,i.c,i.d,i.tx,i.ty),b.drawImage(g.baseTexture.source,h.x,h.y,h.width,h.height,f.anchor.x*-h.width+.5|0,f.anchor.y*-h.height+.5|0,h.width,h.height)}}}}},b.MovieClip=function(a){b.Sprite.call(this,a[0]),this.textures=a,this.animationSpeed=1,this.loop=!0,this.onComplete=null,this.currentFrame=0,this.playing=!1},b.MovieClip.prototype=Object.create(b.Sprite.prototype),b.MovieClip.prototype.constructor=b.MovieClip,Object.defineProperty(b.MovieClip.prototype,"totalFrames",{get:function(){return this.textures.length}}),b.MovieClip.prototype.stop=function(){this.playing=!1},b.MovieClip.prototype.play=function(){this.playing=!0},b.MovieClip.prototype.gotoAndStop=function(a){this.playing=!1,this.currentFrame=a;var b=this.currentFrame+.5|0;this.setTexture(this.textures[b%this.textures.length])},b.MovieClip.prototype.gotoAndPlay=function(a){this.currentFrame=a,this.playing=!0},b.MovieClip.prototype.updateTransform=function(){if(this.displayObjectContainerUpdateTransform(),this.playing){this.currentFrame+=this.animationSpeed;var a=this.currentFrame+.5|0;this.currentFrame=this.currentFrame%this.textures.length,this.loop||a<this.textures.length?this.setTexture(this.textures[a%this.textures.length]):a>=this.textures.length&&(this.gotoAndStop(this.textures.length-1),this.onComplete&&this.onComplete())}},b.MovieClip.fromFrames=function(a){for(var c=[],d=0;d<a.length;d++)c.push(new b.Texture.fromFrame(a[d]));return new b.MovieClip(c)},b.MovieClip.fromImages=function(a){for(var c=[],d=0;d<a.length;d++)c.push(new b.Texture.fromImage(a[d]));return new b.MovieClip(c)},b.FilterBlock=function(){this.visible=!0,this.renderable=!0},b.FilterBlock.prototype.constructor=b.FilterBlock,b.Text=function(a,c){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.resolution=1,b.Sprite.call(this,b.Texture.fromCanvas(this.canvas)),this.setText(a),this.setStyle(c)},b.Text.prototype=Object.create(b.Sprite.prototype),b.Text.prototype.constructor=b.Text,Object.defineProperty(b.Text.prototype,"width",{get:function(){return this.dirty&&(this.updateText(),this.dirty=!1),this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(b.Text.prototype,"height",{get:function(){return this.dirty&&(this.updateText(),this.dirty=!1),this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),b.Text.prototype.setStyle=function(a){a=a||{},a.font=a.font||"bold 20pt Arial",a.fill=a.fill||"black",a.align=a.align||"left",a.stroke=a.stroke||"black",a.strokeThickness=a.strokeThickness||0,a.wordWrap=a.wordWrap||!1,a.wordWrapWidth=a.wordWrapWidth||100,a.dropShadow=a.dropShadow||!1,a.dropShadowAngle=a.dropShadowAngle||Math.PI/6,a.dropShadowDistance=a.dropShadowDistance||4,a.dropShadowColor=a.dropShadowColor||"black",a.lineJoin=a.lineJoin||"miter",this.style=a,this.dirty=!0},b.Text.prototype.setText=function(a){this.text=a.toString()||" ",this.dirty=!0},b.Text.prototype.updateText=function(){this.texture.baseTexture.resolution=this.resolution,this.context.font=this.style.font;var a=this.text;this.style.wordWrap&&(a=this.wordWrap(this.text));for(var b=a.split(/(?:\r\n|\r|\n)/),c=[],d=0,e=this.determineFontProperties(this.style.font),f=0;f<b.length;f++){var g=this.context.measureText(b[f]).width;c[f]=g,d=Math.max(d,g)}var h=d+this.style.strokeThickness;this.style.dropShadow&&(h+=this.style.dropShadowDistance),this.canvas.width=(h+this.context.lineWidth)*this.resolution;var i=e.fontSize+this.style.strokeThickness,j=i*b.length;this.style.dropShadow&&(j+=this.style.dropShadowDistance),this.canvas.height=j*this.resolution,this.context.scale(this.resolution,this.resolution),navigator.isCocoonJS&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.font=this.style.font,this.context.strokeStyle=this.style.stroke,this.context.lineWidth=this.style.strokeThickness,this.context.textBaseline="alphabetic",this.context.lineJoin=this.style.lineJoin;var k,l;if(this.style.dropShadow){this.context.fillStyle=this.style.dropShadowColor;var m=Math.sin(this.style.dropShadowAngle)*this.style.dropShadowDistance,n=Math.cos(this.style.dropShadowAngle)*this.style.dropShadowDistance;for(f=0;f<b.length;f++)k=this.style.strokeThickness/2,l=this.style.strokeThickness/2+f*i+e.ascent,"right"===this.style.align?k+=d-c[f]:"center"===this.style.align&&(k+=(d-c[f])/2),this.style.fill&&this.context.fillText(b[f],k+m,l+n)}for(this.context.fillStyle=this.style.fill,f=0;f<b.length;f++)k=this.style.strokeThickness/2,l=this.style.strokeThickness/2+f*i+e.ascent,"right"===this.style.align?k+=d-c[f]:"center"===this.style.align&&(k+=(d-c[f])/2),this.style.stroke&&this.style.strokeThickness&&this.context.strokeText(b[f],k,l),this.style.fill&&this.context.fillText(b[f],k,l);this.updateTexture()},b.Text.prototype.updateTexture=function(){this.texture.baseTexture.width=this.canvas.width,this.texture.baseTexture.height=this.canvas.height,this.texture.crop.width=this.texture.frame.width=this.canvas.width,this.texture.crop.height=this.texture.frame.height=this.canvas.height,this._width=this.canvas.width,this._height=this.canvas.height,this.texture.baseTexture.dirty()},b.Text.prototype._renderWebGL=function(a){this.dirty&&(this.resolution=a.resolution,this.updateText(),this.dirty=!1),b.Sprite.prototype._renderWebGL.call(this,a)},b.Text.prototype._renderCanvas=function(a){this.dirty&&(this.resolution=a.resolution,this.updateText(),this.dirty=!1),b.Sprite.prototype._renderCanvas.call(this,a)},b.Text.prototype.determineFontProperties=function(a){var c=b.Text.fontPropertiesCache[a];if(!c){c={};var d=b.Text.fontPropertiesCanvas,e=b.Text.fontPropertiesContext;e.font=a;var f=Math.ceil(e.measureText("|Mq").width),g=Math.ceil(e.measureText("M").width),h=2*g;g=1.4*g|0,d.width=f,d.height=h,e.fillStyle="#f00",e.fillRect(0,0,f,h),e.font=a,e.textBaseline="alphabetic",e.fillStyle="#000",e.fillText("|MÉq",0,g);var i,j,k=e.getImageData(0,0,f,h).data,l=k.length,m=4*f,n=0,o=!1;for(i=0;g>i;i++){for(j=0;m>j;j+=4)if(255!==k[n+j]){o=!0;break}if(o)break;n+=m}for(c.ascent=g-i,n=l-m,o=!1,i=h;i>g;i--){for(j=0;m>j;j+=4)if(255!==k[n+j]){o=!0;break}if(o)break;n-=m}c.descent=i-g,c.descent+=6,c.fontSize=c.ascent+c.descent,b.Text.fontPropertiesCache[a]=c}return c},b.Text.prototype.wordWrap=function(a){for(var b="",c=a.split("\n"),d=0;d<c.length;d++){for(var e=this.style.wordWrapWidth,f=c[d].split(" "),g=0;g<f.length;g++){var h=this.context.measureText(f[g]).width,i=h+this.context.measureText(" ").width;0===g||i>e?(g>0&&(b+="\n"),b+=f[g],e=this.style.wordWrapWidth-h):(e-=i,b+=" "+f[g])}d<c.length-1&&(b+="\n")}return b},b.Text.prototype.getBounds=function(a){return this.dirty&&(this.updateText(),this.dirty=!1),b.Sprite.prototype.getBounds.call(this,a)},b.Text.prototype.destroy=function(a){this.context=null,this.canvas=null,this.texture.destroy(void 0===a?!0:a)},b.Text.fontPropertiesCache={},b.Text.fontPropertiesCanvas=document.createElement("canvas"),b.Text.fontPropertiesContext=b.Text.fontPropertiesCanvas.getContext("2d"),b.BitmapText=function(a,c){b.DisplayObjectContainer.call(this),this.textWidth=0,this.textHeight=0,this._pool=[],this.setText(a),this.setStyle(c),this.updateText(),this.dirty=!1},b.BitmapText.prototype=Object.create(b.DisplayObjectContainer.prototype),b.BitmapText.prototype.constructor=b.BitmapText,b.BitmapText.prototype.setText=function(a){this.text=a||" ",this.dirty=!0},b.BitmapText.prototype.setStyle=function(a){a=a||{},a.align=a.align||"left",this.style=a;var c=a.font.split(" ");this.fontName=c[c.length-1],this.fontSize=c.length>=2?parseInt(c[c.length-2],10):b.BitmapText.fonts[this.fontName].size,this.dirty=!0,this.tint=a.tint},b.BitmapText.prototype.updateText=function(){for(var a=b.BitmapText.fonts[this.fontName],c=new b.Point,d=null,e=[],f=0,g=[],h=0,i=this.fontSize/a.size,j=0;j<this.text.length;j++){var k=this.text.charCodeAt(j);if(/(?:\r\n|\r|\n)/.test(this.text.charAt(j)))g.push(c.x),f=Math.max(f,c.x),h++,c.x=0,c.y+=a.lineHeight,d=null;else{var l=a.chars[k];l&&(d&&l.kerning[d]&&(c.x+=l.kerning[d]),e.push({texture:l.texture,line:h,charCode:k,position:new b.Point(c.x+l.xOffset,c.y+l.yOffset)}),c.x+=l.xAdvance,d=k)}}g.push(c.x),f=Math.max(f,c.x);var m=[];for(j=0;h>=j;j++){var n=0;"right"===this.style.align?n=f-g[j]:"center"===this.style.align&&(n=(f-g[j])/2),m.push(n)}var o=this.children.length,p=e.length,q=this.tint||16777215;for(j=0;p>j;j++){var r=o>j?this.children[j]:this._pool.pop();r?r.setTexture(e[j].texture):r=new b.Sprite(e[j].texture),r.position.x=(e[j].position.x+m[e[j].line])*i,r.position.y=e[j].position.y*i,r.scale.x=r.scale.y=i,r.tint=q,r.parent||this.addChild(r)}for(;this.children.length>p;){var s=this.getChildAt(this.children.length-1);this._pool.push(s),this.removeChild(s)}this.textWidth=f*i,this.textHeight=(c.y+a.lineHeight)*i},b.BitmapText.prototype.updateTransform=function(){this.dirty&&(this.updateText(),this.dirty=!1),b.DisplayObjectContainer.prototype.updateTransform.call(this)},b.BitmapText.fonts={},b.InteractionData=function(){this.global=new b.Point,this.target=null,this.originalEvent=null},b.InteractionData.prototype.getLocalPosition=function(a,c,d){var e=a.worldTransform,f=d?d:this.global,g=e.a,h=e.c,i=e.tx,j=e.b,k=e.d,l=e.ty,m=1/(g*k+h*-j);return c=c||new b.Point,c.x=k*m*f.x+-h*m*f.y+(l*h-i*k)*m,c.y=g*m*f.y+-j*m*f.x+(-l*g+i*j)*m,c},b.InteractionData.prototype.constructor=b.InteractionData,b.InteractionManager=function(a){this.stage=a,this.mouse=new b.InteractionData,this.touches={},this.tempPoint=new b.Point,this.mouseoverEnabled=!0,this.pool=[],this.interactiveItems=[],this.interactionDOMElement=null,this.onMouseMove=this.onMouseMove.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseOut=this.onMouseOut.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this),this.onTouchCancel=this.onTouchCancel.bind(this),
this.onTouchMove=this.onTouchMove.bind(this),this.last=0,this.currentCursorStyle="inherit",this.mouseOut=!1,this.resolution=1,this._tempPoint=new b.Point},b.InteractionManager.prototype.constructor=b.InteractionManager,b.InteractionManager.prototype.collectInteractiveSprite=function(a,b){for(var c=a.children,d=c.length,e=d-1;e>=0;e--){var f=c[e];f._interactive?(b.interactiveChildren=!0,this.interactiveItems.push(f),f.children.length>0&&this.collectInteractiveSprite(f,f)):(f.__iParent=null,f.children.length>0&&this.collectInteractiveSprite(f,b))}},b.InteractionManager.prototype.setTarget=function(a){this.target=a,this.resolution=a.resolution,null===this.interactionDOMElement&&this.setTargetDomElement(a.view)},b.InteractionManager.prototype.setTargetDomElement=function(a){this.removeEvents(),window.navigator.msPointerEnabled&&(a.style["-ms-content-zooming"]="none",a.style["-ms-touch-action"]="none"),this.interactionDOMElement=a,a.addEventListener("mousemove",this.onMouseMove,!0),a.addEventListener("mousedown",this.onMouseDown,!0),a.addEventListener("mouseout",this.onMouseOut,!0),a.addEventListener("touchstart",this.onTouchStart,!0),a.addEventListener("touchend",this.onTouchEnd,!0),a.addEventListener("touchleave",this.onTouchCancel,!0),a.addEventListener("touchcancel",this.onTouchCancel,!0),a.addEventListener("touchmove",this.onTouchMove,!0),window.addEventListener("mouseup",this.onMouseUp,!0)},b.InteractionManager.prototype.removeEvents=function(){this.interactionDOMElement&&(this.interactionDOMElement.style["-ms-content-zooming"]="",this.interactionDOMElement.style["-ms-touch-action"]="",this.interactionDOMElement.removeEventListener("mousemove",this.onMouseMove,!0),this.interactionDOMElement.removeEventListener("mousedown",this.onMouseDown,!0),this.interactionDOMElement.removeEventListener("mouseout",this.onMouseOut,!0),this.interactionDOMElement.removeEventListener("touchstart",this.onTouchStart,!0),this.interactionDOMElement.removeEventListener("touchend",this.onTouchEnd,!0),this.interactionDOMElement.removeEventListener("touchleave",this.onTouchCancel,!0),this.interactionDOMElement.removeEventListener("touchcancel",this.onTouchCancel,!0),this.interactionDOMElement.removeEventListener("touchmove",this.onTouchMove,!0),this.interactionDOMElement=null,window.removeEventListener("mouseup",this.onMouseUp,!0))},b.InteractionManager.prototype.update=function(){if(this.target){var a=Date.now(),c=a-this.last;if(c=c*b.INTERACTION_FREQUENCY/1e3,!(1>c)){this.last=a;var d=0;this.dirty&&this.rebuildInteractiveGraph();var e=this.interactiveItems.length,f="inherit",g=!1;for(d=0;e>d;d++){var h=this.interactiveItems[d];h.__hit=this.hitTest(h,this.mouse),this.mouse.target=h,h.__hit&&!g?(h.buttonMode&&(f=h.defaultCursor),h.interactiveChildren||(g=!0),h.__isOver||(h.mouseover&&h.mouseover(this.mouse),h.__isOver=!0)):h.__isOver&&(h.mouseout&&h.mouseout(this.mouse),h.__isOver=!1)}this.currentCursorStyle!==f&&(this.currentCursorStyle=f,this.interactionDOMElement.style.cursor=f)}}},b.InteractionManager.prototype.rebuildInteractiveGraph=function(){this.dirty=!1;for(var a=this.interactiveItems.length,b=0;a>b;b++)this.interactiveItems[b].interactiveChildren=!1;this.interactiveItems=[],this.stage.interactive&&this.interactiveItems.push(this.stage),this.collectInteractiveSprite(this.stage,this.stage)},b.InteractionManager.prototype.onMouseMove=function(a){this.dirty&&this.rebuildInteractiveGraph(),this.mouse.originalEvent=a;var b=this.interactionDOMElement.getBoundingClientRect();this.mouse.global.x=(a.clientX-b.left)*(this.target.width/b.width)/this.resolution,this.mouse.global.y=(a.clientY-b.top)*(this.target.height/b.height)/this.resolution;for(var c=this.interactiveItems.length,d=0;c>d;d++){var e=this.interactiveItems[d];e.mousemove&&e.mousemove(this.mouse)}},b.InteractionManager.prototype.onMouseDown=function(a){this.dirty&&this.rebuildInteractiveGraph(),this.mouse.originalEvent=a,b.AUTO_PREVENT_DEFAULT&&this.mouse.originalEvent.preventDefault();for(var c=this.interactiveItems.length,d=this.mouse.originalEvent,e=2===d.button||3===d.which,f=e?"rightdown":"mousedown",g=e?"rightclick":"click",h=e?"__rightIsDown":"__mouseIsDown",i=e?"__isRightDown":"__isDown",j=0;c>j;j++){var k=this.interactiveItems[j];if((k[f]||k[g])&&(k[h]=!0,k.__hit=this.hitTest(k,this.mouse),k.__hit&&(k[f]&&k[f](this.mouse),k[i]=!0,!k.interactiveChildren)))break}},b.InteractionManager.prototype.onMouseOut=function(a){this.dirty&&this.rebuildInteractiveGraph(),this.mouse.originalEvent=a;var b=this.interactiveItems.length;this.interactionDOMElement.style.cursor="inherit";for(var c=0;b>c;c++){var d=this.interactiveItems[c];d.__isOver&&(this.mouse.target=d,d.mouseout&&d.mouseout(this.mouse),d.__isOver=!1)}this.mouseOut=!0,this.mouse.global.x=-1e4,this.mouse.global.y=-1e4},b.InteractionManager.prototype.onMouseUp=function(a){this.dirty&&this.rebuildInteractiveGraph(),this.mouse.originalEvent=a;for(var b=this.interactiveItems.length,c=!1,d=this.mouse.originalEvent,e=2===d.button||3===d.which,f=e?"rightup":"mouseup",g=e?"rightclick":"click",h=e?"rightupoutside":"mouseupoutside",i=e?"__isRightDown":"__isDown",j=0;b>j;j++){var k=this.interactiveItems[j];(k[g]||k[f]||k[h])&&(k.__hit=this.hitTest(k,this.mouse),k.__hit&&!c?(k[f]&&k[f](this.mouse),k[i]&&k[g]&&k[g](this.mouse),k.interactiveChildren||(c=!0)):k[i]&&k[h]&&k[h](this.mouse),k[i]=!1)}},b.InteractionManager.prototype.hitTest=function(a,c){var d=c.global;if(!a.worldVisible)return!1;a.worldTransform.applyInverse(d,this._tempPoint);var e,f=this._tempPoint.x,g=this._tempPoint.y;if(c.target=a,a.hitArea&&a.hitArea.contains)return a.hitArea.contains(f,g);if(a instanceof b.Sprite){var h,i=a.texture.frame.width,j=a.texture.frame.height,k=-i*a.anchor.x;if(f>k&&k+i>f&&(h=-j*a.anchor.y,g>h&&h+j>g))return!0}else if(a instanceof b.Graphics){var l=a.graphicsData;for(e=0;e<l.length;e++){var m=l[e];if(m.fill&&m.shape&&m.shape.contains(f,g))return!0}}var n=a.children.length;for(e=0;n>e;e++){var o=a.children[e],p=this.hitTest(o,c);if(p)return c.target=a,!0}return!1},b.InteractionManager.prototype.onTouchMove=function(a){this.dirty&&this.rebuildInteractiveGraph();for(var b,c,d=this.interactionDOMElement.getBoundingClientRect(),e=a.changedTouches,f=e.length,g=this.target.width/d.width,h=this.target.height/d.height,i=navigator.isCocoonJS&&!d.left&&!d.top&&!a.target.style.width&&!a.target.style.height,j=0;f>j;j++)c=e[j],i?(c.globalX=c.clientX,c.globalY=c.clientY):(c.globalX=(c.clientX-d.left)*g/this.resolution,c.globalY=(c.clientY-d.top)*h/this.resolution);for(var k=0;f>k;k++){c=e[k],b=this.touches[c.identifier],b.originalEvent=a,i?(b.global.x=c.clientX,b.global.y=c.clientY):(c.globalX=b.global.x=(c.clientX-d.left)*g/this.resolution,c.globalY=b.global.y=(c.clientY-d.top)*h/this.resolution);for(var l=0;l<this.interactiveItems.length;l++){var m=this.interactiveItems[l];m.touchmove&&m.__touchData&&m.__touchData[c.identifier]&&m.touchmove(b)}}},b.InteractionManager.prototype.onTouchStart=function(a){this.dirty&&this.rebuildInteractiveGraph();var c=this.interactionDOMElement.getBoundingClientRect();b.AUTO_PREVENT_DEFAULT&&a.preventDefault();for(var d,e=a.changedTouches,f=e.length,g=this.target.width/c.width,h=this.target.height/c.height,i=navigator.isCocoonJS&&!c.left&&!c.top&&!a.target.style.width&&!a.target.style.height,j=0;f>j;j++)d=e[j],i?(d.globalX=d.clientX,d.globalY=d.clientY):(d.globalX=(d.clientX-c.left)*g/this.resolution,d.globalY=(d.clientY-c.top)*h/this.resolution);for(var k=0;f>k;k++){d=e[k];var l=this.pool.pop();l||(l=new b.InteractionData),l.originalEvent=a,this.touches[d.identifier]=l,i?(l.global.x=d.clientX,l.global.y=d.clientY):(l.global.x=(d.clientX-c.left)*g/this.resolution,l.global.y=(d.clientY-c.top)*h/this.resolution);for(var m=this.interactiveItems.length,n=0;m>n;n++){var o=this.interactiveItems[n];if((o.touchstart||o.tap)&&(o.__hit=this.hitTest(o,l),o.__hit&&(o.touchstart&&o.touchstart(l),o.__isDown=!0,o.__touchData=o.__touchData||{},o.__touchData[d.identifier]=l,!o.interactiveChildren)))break}}},b.InteractionManager.prototype.onTouchEnd=function(a){this.dirty&&this.rebuildInteractiveGraph();for(var b,c=this.interactionDOMElement.getBoundingClientRect(),d=a.changedTouches,e=d.length,f=this.target.width/c.width,g=this.target.height/c.height,h=navigator.isCocoonJS&&!c.left&&!c.top&&!a.target.style.width&&!a.target.style.height,i=0;e>i;i++)b=d[i],h?(b.globalX=b.clientX,b.globalY=b.clientY):(b.globalX=(b.clientX-c.left)*f/this.resolution,b.globalY=(b.clientY-c.top)*g/this.resolution);for(var j=0;e>j;j++){b=d[j];var k=this.touches[b.identifier],l=!1;h?(k.global.x=b.clientX,k.global.y=b.clientY):(k.global.x=(b.clientX-c.left)*f/this.resolution,k.global.y=(b.clientY-c.top)*g/this.resolution);for(var m=this.interactiveItems.length,n=0;m>n;n++){var o=this.interactiveItems[n];o.__touchData&&o.__touchData[b.identifier]&&(o.__hit=this.hitTest(o,o.__touchData[b.identifier]),k.originalEvent=a,(o.touchend||o.tap)&&(o.__hit&&!l?(o.touchend&&o.touchend(k),o.__isDown&&o.tap&&o.tap(k),o.interactiveChildren||(l=!0)):o.__isDown&&o.touchendoutside&&o.touchendoutside(k),o.__isDown=!1),o.__touchData[b.identifier]=null)}this.pool.push(k),this.touches[b.identifier]=null}},b.InteractionManager.prototype.onTouchCancel=function(a){this.dirty&&this.rebuildInteractiveGraph();for(var b,c=this.interactionDOMElement.getBoundingClientRect(),d=a.changedTouches,e=d.length,f=this.target.width/c.width,g=this.target.height/c.height,h=navigator.isCocoonJS&&!c.left&&!c.top&&!a.target.style.width&&!a.target.style.height,i=0;e>i;i++)b=d[i],h?(b.globalX=b.clientX,b.globalY=b.clientY):(b.globalX=(b.clientX-c.left)*f/this.resolution,b.globalY=(b.clientY-c.top)*g/this.resolution);for(var j=0;e>j;j++){b=d[j];var k=this.touches[b.identifier],l=!1;h?(k.global.x=b.clientX,k.global.y=b.clientY):(k.global.x=(b.clientX-c.left)*f/this.resolution,k.global.y=(b.clientY-c.top)*g/this.resolution);for(var m=this.interactiveItems.length,n=0;m>n;n++){var o=this.interactiveItems[n];o.__touchData&&o.__touchData[b.identifier]&&(o.__hit=this.hitTest(o,o.__touchData[b.identifier]),k.originalEvent=a,o.touchcancel&&!l&&(o.touchcancel(k),o.interactiveChildren||(l=!0)),o.__isDown=!1,o.__touchData[b.identifier]=null)}this.pool.push(k),this.touches[b.identifier]=null}},b.Stage=function(a){b.DisplayObjectContainer.call(this),this.worldTransform=new b.Matrix,this.interactive=!0,this.interactionManager=new b.InteractionManager(this),this.dirty=!0,this.stage=this,this.stage.hitArea=new b.Rectangle(0,0,1e5,1e5),this.setBackgroundColor(a)},b.Stage.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Stage.prototype.constructor=b.Stage,b.Stage.prototype.setInteractionDelegate=function(a){this.interactionManager.setTargetDomElement(a)},b.Stage.prototype.updateTransform=function(){this.worldAlpha=1;for(var a=0,b=this.children.length;b>a;a++)this.children[a].updateTransform();this.dirty&&(this.dirty=!1,this.interactionManager.dirty=!0),this.interactive&&this.interactionManager.update()},b.Stage.prototype.setBackgroundColor=function(a){this.backgroundColor=a||0,this.backgroundColorSplit=b.hex2rgb(this.backgroundColor);var c=this.backgroundColor.toString(16);c="000000".substr(0,6-c.length)+c,this.backgroundColorString="#"+c},b.Stage.prototype.getMousePosition=function(){return this.interactionManager.mouse.global},function(a){for(var b=0,c=["ms","moz","webkit","o"],d=0;d<c.length&&!a.requestAnimationFrame;++d)a.requestAnimationFrame=a[c[d]+"RequestAnimationFrame"],a.cancelAnimationFrame=a[c[d]+"CancelAnimationFrame"]||a[c[d]+"CancelRequestAnimationFrame"];a.requestAnimationFrame||(a.requestAnimationFrame=function(c){var d=(new Date).getTime(),e=Math.max(0,16-(d-b)),f=a.setTimeout(function(){c(d+e)},e);return b=d+e,f}),a.cancelAnimationFrame||(a.cancelAnimationFrame=function(a){clearTimeout(a)}),a.requestAnimFrame=a.requestAnimationFrame}(this),b.hex2rgb=function(a){return[(a>>16&255)/255,(a>>8&255)/255,(255&a)/255]},b.rgb2hex=function(a){return(255*a[0]<<16)+(255*a[1]<<8)+255*a[2]},"function"!=typeof Function.prototype.bind&&(Function.prototype.bind=function(){return function(a){function b(){for(var d=arguments.length,f=new Array(d);d--;)f[d]=arguments[d];return f=e.concat(f),c.apply(this instanceof b?this:a,f)}var c=this,d=arguments.length-1,e=[];if(d>0)for(e.length=d;d--;)e[d]=arguments[d+1];if("function"!=typeof c)throw new TypeError;return b.prototype=function f(a){return a&&(f.prototype=a),this instanceof f?void 0:new f}(c.prototype),b}}()),b.AjaxRequest=function(){var a=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Microsoft.XMLHTTP"];if(!window.ActiveXObject)return window.XMLHttpRequest?new window.XMLHttpRequest:!1;for(var b=0;b<a.length;b++)try{return new window.ActiveXObject(a[b])}catch(c){}},b.canUseNewCanvasBlendModes=function(){if("undefined"==typeof document)return!1;var a=document.createElement("canvas");a.width=1,a.height=1;var b=a.getContext("2d");return b.fillStyle="#000",b.fillRect(0,0,1,1),b.globalCompositeOperation="multiply",b.fillStyle="#fff",b.fillRect(0,0,1,1),0===b.getImageData(0,0,1,1).data[0]},b.getNextPowerOfTwo=function(a){if(a>0&&0===(a&a-1))return a;for(var b=1;a>b;)b<<=1;return b},b.isPowerOfTwo=function(a,b){return a>0&&0===(a&a-1)&&b>0&&0===(b&b-1)},b.EventTarget={call:function(a){a&&(a=a.prototype||a,b.EventTarget.mixin(a))},mixin:function(a){a.listeners=function(a){return this._listeners=this._listeners||{},this._listeners[a]?this._listeners[a].slice():[]},a.emit=a.dispatchEvent=function(a,c){if(this._listeners=this._listeners||{},"object"==typeof a&&(c=a,a=a.type),c&&c.__isEventObject===!0||(c=new b.Event(this,a,c)),this._listeners&&this._listeners[a]){var d,e=this._listeners[a].slice(0),f=e.length,g=e[0];for(d=0;f>d;g=e[++d])if(g.call(this,c),c.stoppedImmediate)return this;if(c.stopped)return this}return this.parent&&this.parent.emit&&this.parent.emit.call(this.parent,a,c),this},a.on=a.addEventListener=function(a,b){return this._listeners=this._listeners||{},(this._listeners[a]=this._listeners[a]||[]).push(b),this},a.once=function(a,b){function c(){b.apply(d.off(a,c),arguments)}this._listeners=this._listeners||{};var d=this;return c._originalHandler=b,this.on(a,c)},a.off=a.removeEventListener=function(a,b){if(this._listeners=this._listeners||{},!this._listeners[a])return this;for(var c=this._listeners[a],d=b?c.length:0;d-->0;)(c[d]===b||c[d]._originalHandler===b)&&c.splice(d,1);return 0===c.length&&delete this._listeners[a],this},a.removeAllListeners=function(a){return this._listeners=this._listeners||{},this._listeners[a]?(delete this._listeners[a],this):this}}},b.Event=function(a,b,c){this.__isEventObject=!0,this.stopped=!1,this.stoppedImmediate=!1,this.target=a,this.type=b,this.data=c,this.content=c,this.timeStamp=Date.now()},b.Event.prototype.stopPropagation=function(){this.stopped=!0},b.Event.prototype.stopImmediatePropagation=function(){this.stoppedImmediate=!0},b.autoDetectRenderer=function(a,c,d){a||(a=800),c||(c=600);var e=function(){try{var a=document.createElement("canvas");return!!window.WebGLRenderingContext&&(a.getContext("webgl")||a.getContext("experimental-webgl"))}catch(b){return!1}}();return e?new b.WebGLRenderer(a,c,d):new b.CanvasRenderer(a,c,d)},b.autoDetectRecommendedRenderer=function(a,c,d){a||(a=800),c||(c=600);var e=function(){try{var a=document.createElement("canvas");return!!window.WebGLRenderingContext&&(a.getContext("webgl")||a.getContext("experimental-webgl"))}catch(b){return!1}}(),f=/Android/i.test(navigator.userAgent);return e&&!f?new b.WebGLRenderer(a,c,d):new b.CanvasRenderer(a,c,d)},b.PolyK={},b.PolyK.Triangulate=function(a){var c=!0,d=a.length>>1;if(3>d)return[];for(var e=[],f=[],g=0;d>g;g++)f.push(g);g=0;for(var h=d;h>3;){var i=f[(g+0)%h],j=f[(g+1)%h],k=f[(g+2)%h],l=a[2*i],m=a[2*i+1],n=a[2*j],o=a[2*j+1],p=a[2*k],q=a[2*k+1],r=!1;if(b.PolyK._convex(l,m,n,o,p,q,c)){r=!0;for(var s=0;h>s;s++){var t=f[s];if(t!==i&&t!==j&&t!==k&&b.PolyK._PointInTriangle(a[2*t],a[2*t+1],l,m,n,o,p,q)){r=!1;break}}}if(r)e.push(i,j,k),f.splice((g+1)%h,1),h--,g=0;else if(g++>3*h){if(!c)return null;for(e=[],f=[],g=0;d>g;g++)f.push(g);g=0,h=d,c=!1}}return e.push(f[0],f[1],f[2]),e},b.PolyK._PointInTriangle=function(a,b,c,d,e,f,g,h){var i=g-c,j=h-d,k=e-c,l=f-d,m=a-c,n=b-d,o=i*i+j*j,p=i*k+j*l,q=i*m+j*n,r=k*k+l*l,s=k*m+l*n,t=1/(o*r-p*p),u=(r*q-p*s)*t,v=(o*s-p*q)*t;return u>=0&&v>=0&&1>u+v},b.PolyK._convex=function(a,b,c,d,e,f,g){return(b-d)*(e-c)+(c-a)*(f-d)>=0===g},b.initDefaultShaders=function(){},b.CompileVertexShader=function(a,c){return b._CompileShader(a,c,a.VERTEX_SHADER)},b.CompileFragmentShader=function(a,c){return b._CompileShader(a,c,a.FRAGMENT_SHADER)},b._CompileShader=function(a,b,c){var d=b.join("\n"),e=a.createShader(c);return a.shaderSource(e,d),a.compileShader(e),a.getShaderParameter(e,a.COMPILE_STATUS)?e:(window.console.log(a.getShaderInfoLog(e)),null)},b.compileProgram=function(a,c,d){var e=b.CompileFragmentShader(a,d),f=b.CompileVertexShader(a,c),g=a.createProgram();return a.attachShader(g,f),a.attachShader(g,e),a.linkProgram(g),a.getProgramParameter(g,a.LINK_STATUS)||window.console.log("Could not initialise shaders"),g},b.PixiShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"],this.textureCount=0,this.firstRun=!0,this.dirty=!0,this.attributes=[],this.init()},b.PixiShader.prototype.constructor=b.PixiShader,b.PixiShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc||b.PixiShader.defaultVertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.dimensions=a.getUniformLocation(c,"dimensions"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.colorAttribute=a.getAttribLocation(c,"aColor"),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aTextureCoord,this.colorAttribute];for(var d in this.uniforms)this.uniforms[d].uniformLocation=a.getUniformLocation(c,d);this.initUniforms(),this.program=c},b.PixiShader.prototype.initUniforms=function(){this.textureCount=1;var a,b=this.gl;for(var c in this.uniforms){a=this.uniforms[c];var d=a.type;"sampler2D"===d?(a._init=!1,null!==a.value&&this.initSampler2D(a)):"mat2"===d||"mat3"===d||"mat4"===d?(a.glMatrix=!0,a.glValueLength=1,"mat2"===d?a.glFunc=b.uniformMatrix2fv:"mat3"===d?a.glFunc=b.uniformMatrix3fv:"mat4"===d&&(a.glFunc=b.uniformMatrix4fv)):(a.glFunc=b["uniform"+d],a.glValueLength="2f"===d||"2i"===d?2:"3f"===d||"3i"===d?3:"4f"===d||"4i"===d?4:1)}},b.PixiShader.prototype.initSampler2D=function(a){if(a.value&&a.value.baseTexture&&a.value.baseTexture.hasLoaded){var b=this.gl;if(b.activeTexture(b["TEXTURE"+this.textureCount]),b.bindTexture(b.TEXTURE_2D,a.value.baseTexture._glTextures[b.id]),a.textureData){var c=a.textureData,d=c.magFilter?c.magFilter:b.LINEAR,e=c.minFilter?c.minFilter:b.LINEAR,f=c.wrapS?c.wrapS:b.CLAMP_TO_EDGE,g=c.wrapT?c.wrapT:b.CLAMP_TO_EDGE,h=c.luminance?b.LUMINANCE:b.RGBA;if(c.repeat&&(f=b.REPEAT,g=b.REPEAT),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!!c.flipY),c.width){var i=c.width?c.width:512,j=c.height?c.height:2,k=c.border?c.border:0;b.texImage2D(b.TEXTURE_2D,0,h,i,j,k,h,b.UNSIGNED_BYTE,null)}else b.texImage2D(b.TEXTURE_2D,0,h,b.RGBA,b.UNSIGNED_BYTE,a.value.baseTexture.source);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,d),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,e),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,f),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,g)}b.uniform1i(a.uniformLocation,this.textureCount),a._init=!0,this.textureCount++}},b.PixiShader.prototype.syncUniforms=function(){this.textureCount=1;var a,c=this.gl;for(var d in this.uniforms)a=this.uniforms[d],1===a.glValueLength?a.glMatrix===!0?a.glFunc.call(c,a.uniformLocation,a.transpose,a.value):a.glFunc.call(c,a.uniformLocation,a.value):2===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y):3===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y,a.value.z):4===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y,a.value.z,a.value.w):"sampler2D"===a.type&&(a._init?(c.activeTexture(c["TEXTURE"+this.textureCount]),a.value.baseTexture._dirty[c.id]?b.instances[c.id].updateTexture(a.value.baseTexture):c.bindTexture(c.TEXTURE_2D,a.value.baseTexture._glTextures[c.id]),c.uniform1i(a.uniformLocation,this.textureCount),this.textureCount++):this.initSampler2D(a))},b.PixiShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.PixiShader.defaultVertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying vec4 vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = vec4(aColor.rgb * aColor.a, aColor.a);","}"],b.PixiFastShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 uMatrix;","varying vec2 vTextureCoord;","varying float vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   vec2 v;","   vec2 sv = aVertexPosition * aScale;","   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);","   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);","   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;","   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"],this.textureCount=0,this.init()},b.PixiFastShader.prototype.constructor=b.PixiFastShader,b.PixiFastShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.dimensions=a.getUniformLocation(c,"dimensions"),this.uMatrix=a.getUniformLocation(c,"uMatrix"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aPositionCoord=a.getAttribLocation(c,"aPositionCoord"),this.aScale=a.getAttribLocation(c,"aScale"),this.aRotation=a.getAttribLocation(c,"aRotation"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.colorAttribute=a.getAttribLocation(c,"aColor"),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aPositionCoord,this.aScale,this.aRotation,this.aTextureCoord,this.colorAttribute],this.program=c},b.PixiFastShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.StripShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * alpha;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"],this.init()},b.StripShader.prototype.constructor=b.StripShader,b.StripShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.attributes=[this.aVertexPosition,this.aTextureCoord],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.StripShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},b.PrimitiveShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","uniform float flipY;","uniform vec3 tint;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"],this.init()},b.PrimitiveShader.prototype.constructor=b.PrimitiveShader,b.PrimitiveShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.tintColor=a.getUniformLocation(c,"tint"),this.flipY=a.getUniformLocation(c,"flipY"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.PrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.ComplexPrimitiveShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","uniform float flipY;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"],this.init()},b.ComplexPrimitiveShader.prototype.constructor=b.ComplexPrimitiveShader,b.ComplexPrimitiveShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.tintColor=a.getUniformLocation(c,"tint"),this.color=a.getUniformLocation(c,"color"),this.flipY=a.getUniformLocation(c,"flipY"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.ComplexPrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},b.WebGLGraphics=function(){},b.WebGLGraphics.renderGraphics=function(a,c){var d,e=c.gl,f=c.projection,g=c.offset,h=c.shaderManager.primitiveShader;a.dirty&&b.WebGLGraphics.updateGraphics(a,e);for(var i=a._webGL[e.id],j=0;j<i.data.length;j++)1===i.data[j].mode?(d=i.data[j],c.stencilManager.pushStencil(a,d,c),e.drawElements(e.TRIANGLE_FAN,4,e.UNSIGNED_SHORT,2*(d.indices.length-4)),c.stencilManager.popStencil(a,d,c)):(d=i.data[j],c.shaderManager.setShader(h),h=c.shaderManager.primitiveShader,e.uniformMatrix3fv(h.translationMatrix,!1,a.worldTransform.toArray(!0)),e.uniform1f(h.flipY,1),e.uniform2f(h.projectionVector,f.x,-f.y),e.uniform2f(h.offsetVector,-g.x,-g.y),e.uniform3fv(h.tintColor,b.hex2rgb(a.tint)),e.uniform1f(h.alpha,a.worldAlpha),e.bindBuffer(e.ARRAY_BUFFER,d.buffer),e.vertexAttribPointer(h.aVertexPosition,2,e.FLOAT,!1,24,0),e.vertexAttribPointer(h.colorAttribute,4,e.FLOAT,!1,24,8),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,d.indexBuffer),e.drawElements(e.TRIANGLE_STRIP,d.indices.length,e.UNSIGNED_SHORT,0))},b.WebGLGraphics.updateGraphics=function(a,c){var d=a._webGL[c.id];d||(d=a._webGL[c.id]={lastIndex:0,data:[],gl:c}),a.dirty=!1;var e;if(a.clearDirty){for(a.clearDirty=!1,e=0;e<d.data.length;e++){var f=d.data[e];f.reset(),b.WebGLGraphics.graphicsDataPool.push(f)}d.data=[],d.lastIndex=0}var g;for(e=d.lastIndex;e<a.graphicsData.length;e++){var h=a.graphicsData[e];if(h.type===b.Graphics.POLY){if(h.points=h.shape.points.slice(),h.shape.closed&&(h.points[0]!==h.points[h.points.length-2]||h.points[1]!==h.points[h.points.length-1])&&h.points.push(h.points[0],h.points[1]),h.fill&&h.points.length>=6)if(h.points.length<12){g=b.WebGLGraphics.switchMode(d,0);var i=b.WebGLGraphics.buildPoly(h,g);i||(g=b.WebGLGraphics.switchMode(d,1),b.WebGLGraphics.buildComplexPoly(h,g))}else g=b.WebGLGraphics.switchMode(d,1),b.WebGLGraphics.buildComplexPoly(h,g);h.lineWidth>0&&(g=b.WebGLGraphics.switchMode(d,0),b.WebGLGraphics.buildLine(h,g))}else g=b.WebGLGraphics.switchMode(d,0),h.type===b.Graphics.RECT?b.WebGLGraphics.buildRectangle(h,g):h.type===b.Graphics.CIRC||h.type===b.Graphics.ELIP?b.WebGLGraphics.buildCircle(h,g):h.type===b.Graphics.RREC&&b.WebGLGraphics.buildRoundedRectangle(h,g);d.lastIndex++}for(e=0;e<d.data.length;e++)g=d.data[e],g.dirty&&g.upload()},b.WebGLGraphics.switchMode=function(a,c){var d;return a.data.length?(d=a.data[a.data.length-1],(d.mode!==c||1===c)&&(d=b.WebGLGraphics.graphicsDataPool.pop()||new b.WebGLGraphicsData(a.gl),d.mode=c,a.data.push(d))):(d=b.WebGLGraphics.graphicsDataPool.pop()||new b.WebGLGraphicsData(a.gl),d.mode=c,a.data.push(d)),d.dirty=!0,d},b.WebGLGraphics.buildRectangle=function(a,c){var d=a.shape,e=d.x,f=d.y,g=d.width,h=d.height;if(a.fill){var i=b.hex2rgb(a.fillColor),j=a.fillAlpha,k=i[0]*j,l=i[1]*j,m=i[2]*j,n=c.points,o=c.indices,p=n.length/6;n.push(e,f),n.push(k,l,m,j),n.push(e+g,f),n.push(k,l,m,j),n.push(e,f+h),n.push(k,l,m,j),n.push(e+g,f+h),n.push(k,l,m,j),o.push(p,p,p+1,p+2,p+3,p+3)}if(a.lineWidth){var q=a.points;a.points=[e,f,e+g,f,e+g,f+h,e,f+h,e,f],b.WebGLGraphics.buildLine(a,c),a.points=q}},b.WebGLGraphics.buildRoundedRectangle=function(a,c){var d=a.shape,e=d.x,f=d.y,g=d.width,h=d.height,i=d.radius,j=[];if(j.push(e,f+i),j=j.concat(b.WebGLGraphics.quadraticBezierCurve(e,f+h-i,e,f+h,e+i,f+h)),j=j.concat(b.WebGLGraphics.quadraticBezierCurve(e+g-i,f+h,e+g,f+h,e+g,f+h-i)),j=j.concat(b.WebGLGraphics.quadraticBezierCurve(e+g,f+i,e+g,f,e+g-i,f)),j=j.concat(b.WebGLGraphics.quadraticBezierCurve(e+i,f,e,f,e,f+i)),a.fill){var k=b.hex2rgb(a.fillColor),l=a.fillAlpha,m=k[0]*l,n=k[1]*l,o=k[2]*l,p=c.points,q=c.indices,r=p.length/6,s=b.PolyK.Triangulate(j),t=0;

for(t=0;t<s.length;t+=3)q.push(s[t]+r),q.push(s[t]+r),q.push(s[t+1]+r),q.push(s[t+2]+r),q.push(s[t+2]+r);for(t=0;t<j.length;t++)p.push(j[t],j[++t],m,n,o,l)}if(a.lineWidth){var u=a.points;a.points=j,b.WebGLGraphics.buildLine(a,c),a.points=u}},b.WebGLGraphics.quadraticBezierCurve=function(a,b,c,d,e,f){function g(a,b,c){var d=b-a;return a+d*c}for(var h,i,j,k,l,m,n=20,o=[],p=0,q=0;n>=q;q++)p=q/n,h=g(a,c,p),i=g(b,d,p),j=g(c,e,p),k=g(d,f,p),l=g(h,j,p),m=g(i,k,p),o.push(l,m);return o},b.WebGLGraphics.buildCircle=function(a,c){var d,e,f=a.shape,g=f.x,h=f.y;a.type===b.Graphics.CIRC?(d=f.radius,e=f.radius):(d=f.width,e=f.height);var i=40,j=2*Math.PI/i,k=0;if(a.fill){var l=b.hex2rgb(a.fillColor),m=a.fillAlpha,n=l[0]*m,o=l[1]*m,p=l[2]*m,q=c.points,r=c.indices,s=q.length/6;for(r.push(s),k=0;i+1>k;k++)q.push(g,h,n,o,p,m),q.push(g+Math.sin(j*k)*d,h+Math.cos(j*k)*e,n,o,p,m),r.push(s++,s++);r.push(s-1)}if(a.lineWidth){var t=a.points;for(a.points=[],k=0;i+1>k;k++)a.points.push(g+Math.sin(j*k)*d,h+Math.cos(j*k)*e);b.WebGLGraphics.buildLine(a,c),a.points=t}},b.WebGLGraphics.buildLine=function(a,c){var d=0,e=a.points;if(0!==e.length){if(a.lineWidth%2)for(d=0;d<e.length;d++)e[d]+=.5;var f=new b.Point(e[0],e[1]),g=new b.Point(e[e.length-2],e[e.length-1]);if(f.x===g.x&&f.y===g.y){e=e.slice(),e.pop(),e.pop(),g=new b.Point(e[e.length-2],e[e.length-1]);var h=g.x+.5*(f.x-g.x),i=g.y+.5*(f.y-g.y);e.unshift(h,i),e.push(h,i)}var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G=c.points,H=c.indices,I=e.length/2,J=e.length,K=G.length/6,L=a.lineWidth/2,M=b.hex2rgb(a.lineColor),N=a.lineAlpha,O=M[0]*N,P=M[1]*N,Q=M[2]*N;for(l=e[0],m=e[1],n=e[2],o=e[3],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,G.push(l-r,m-s,O,P,Q,N),G.push(l+r,m+s,O,P,Q,N),d=1;I-1>d;d++)l=e[2*(d-1)],m=e[2*(d-1)+1],n=e[2*d],o=e[2*d+1],p=e[2*(d+1)],q=e[2*(d+1)+1],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,t=-(o-q),u=n-p,F=Math.sqrt(t*t+u*u),t/=F,u/=F,t*=L,u*=L,x=-s+m-(-s+o),y=-r+n-(-r+l),z=(-r+l)*(-s+o)-(-r+n)*(-s+m),A=-u+q-(-u+o),B=-t+n-(-t+p),C=(-t+p)*(-u+o)-(-t+n)*(-u+q),D=x*B-A*y,Math.abs(D)<.1?(D+=10.1,G.push(n-r,o-s,O,P,Q,N),G.push(n+r,o+s,O,P,Q,N)):(j=(y*C-B*z)/D,k=(A*z-x*C)/D,E=(j-n)*(j-n)+(k-o)+(k-o),E>19600?(v=r-t,w=s-u,F=Math.sqrt(v*v+w*w),v/=F,w/=F,v*=L,w*=L,G.push(n-v,o-w),G.push(O,P,Q,N),G.push(n+v,o+w),G.push(O,P,Q,N),G.push(n-v,o-w),G.push(O,P,Q,N),J++):(G.push(j,k),G.push(O,P,Q,N),G.push(n-(j-n),o-(k-o)),G.push(O,P,Q,N)));for(l=e[2*(I-2)],m=e[2*(I-2)+1],n=e[2*(I-1)],o=e[2*(I-1)+1],r=-(m-o),s=l-n,F=Math.sqrt(r*r+s*s),r/=F,s/=F,r*=L,s*=L,G.push(n-r,o-s),G.push(O,P,Q,N),G.push(n+r,o+s),G.push(O,P,Q,N),H.push(K),d=0;J>d;d++)H.push(K++);H.push(K-1)}},b.WebGLGraphics.buildComplexPoly=function(a,c){var d=a.points.slice();if(!(d.length<6)){var e=c.indices;c.points=d,c.alpha=a.fillAlpha,c.color=b.hex2rgb(a.fillColor);for(var f,g,h=1/0,i=-(1/0),j=1/0,k=-(1/0),l=0;l<d.length;l+=2)f=d[l],g=d[l+1],h=h>f?f:h,i=f>i?f:i,j=j>g?g:j,k=g>k?g:k;d.push(h,j,i,j,i,k,h,k);var m=d.length/2;for(l=0;m>l;l++)e.push(l)}},b.WebGLGraphics.buildPoly=function(a,c){var d=a.points;if(!(d.length<6)){var e=c.points,f=c.indices,g=d.length/2,h=b.hex2rgb(a.fillColor),i=a.fillAlpha,j=h[0]*i,k=h[1]*i,l=h[2]*i,m=b.PolyK.Triangulate(d);if(!m)return!1;var n=e.length/6,o=0;for(o=0;o<m.length;o+=3)f.push(m[o]+n),f.push(m[o]+n),f.push(m[o+1]+n),f.push(m[o+2]+n),f.push(m[o+2]+n);for(o=0;g>o;o++)e.push(d[2*o],d[2*o+1],j,k,l,i);return!0}},b.WebGLGraphics.graphicsDataPool=[],b.WebGLGraphicsData=function(a){this.gl=a,this.color=[0,0,0],this.points=[],this.indices=[],this.buffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.mode=1,this.alpha=1,this.dirty=!0},b.WebGLGraphicsData.prototype.reset=function(){this.points=[],this.indices=[]},b.WebGLGraphicsData.prototype.upload=function(){var a=this.gl;this.glPoints=new b.Float32Array(this.points),a.bindBuffer(a.ARRAY_BUFFER,this.buffer),a.bufferData(a.ARRAY_BUFFER,this.glPoints,a.STATIC_DRAW),this.glIndicies=new b.Uint16Array(this.indices),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.glIndicies,a.STATIC_DRAW),this.dirty=!1},b.glContexts=[],b.instances=[],b.WebGLRenderer=function(a,c,d){if(d)for(var e in b.defaultRenderOptions)"undefined"==typeof d[e]&&(d[e]=b.defaultRenderOptions[e]);else d=b.defaultRenderOptions;b.defaultRenderer||(b.sayHello("webGL"),b.defaultRenderer=this),this.type=b.WEBGL_RENDERER,this.resolution=d.resolution,this.transparent=d.transparent,this.autoResize=d.autoResize||!1,this.preserveDrawingBuffer=d.preserveDrawingBuffer,this.clearBeforeRender=d.clearBeforeRender,this.width=a||800,this.height=c||600,this.view=d.view||document.createElement("canvas"),this.contextLostBound=this.handleContextLost.bind(this),this.contextRestoredBound=this.handleContextRestored.bind(this),this.view.addEventListener("webglcontextlost",this.contextLostBound,!1),this.view.addEventListener("webglcontextrestored",this.contextRestoredBound,!1),this._contextOptions={alpha:this.transparent,antialias:d.antialias,premultipliedAlpha:this.transparent&&"notMultiplied"!==this.transparent,stencil:!0,preserveDrawingBuffer:d.preserveDrawingBuffer},this.projection=new b.Point,this.offset=new b.Point(0,0),this.shaderManager=new b.WebGLShaderManager,this.spriteBatch=new b.WebGLSpriteBatch,this.maskManager=new b.WebGLMaskManager,this.filterManager=new b.WebGLFilterManager,this.stencilManager=new b.WebGLStencilManager,this.blendModeManager=new b.WebGLBlendModeManager,this.renderSession={},this.renderSession.gl=this.gl,this.renderSession.drawCount=0,this.renderSession.shaderManager=this.shaderManager,this.renderSession.maskManager=this.maskManager,this.renderSession.filterManager=this.filterManager,this.renderSession.blendModeManager=this.blendModeManager,this.renderSession.spriteBatch=this.spriteBatch,this.renderSession.stencilManager=this.stencilManager,this.renderSession.renderer=this,this.renderSession.resolution=this.resolution,this.initContext(),this.mapBlendModes()},b.WebGLRenderer.prototype.constructor=b.WebGLRenderer,b.WebGLRenderer.prototype.initContext=function(){var a=this.view.getContext("webgl",this._contextOptions)||this.view.getContext("experimental-webgl",this._contextOptions);if(this.gl=a,!a)throw new Error("This browser does not support webGL. Try using the canvas renderer");this.glContextId=a.id=b.WebGLRenderer.glContextId++,b.glContexts[this.glContextId]=a,b.instances[this.glContextId]=this,a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.enable(a.BLEND),this.shaderManager.setContext(a),this.spriteBatch.setContext(a),this.maskManager.setContext(a),this.filterManager.setContext(a),this.blendModeManager.setContext(a),this.stencilManager.setContext(a),this.renderSession.gl=this.gl,this.resize(this.width,this.height)},b.WebGLRenderer.prototype.render=function(a){if(!this.contextLost){this.__stage!==a&&(a.interactive&&a.interactionManager.removeEvents(),this.__stage=a),a.updateTransform();var b=this.gl;a._interactive?a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this)):a._interactiveEventsAdded&&(a._interactiveEventsAdded=!1,a.interactionManager.setTarget(this)),b.viewport(0,0,this.width,this.height),b.bindFramebuffer(b.FRAMEBUFFER,null),this.clearBeforeRender&&(this.transparent?b.clearColor(0,0,0,0):b.clearColor(a.backgroundColorSplit[0],a.backgroundColorSplit[1],a.backgroundColorSplit[2],1),b.clear(b.COLOR_BUFFER_BIT)),this.renderDisplayObject(a,this.projection)}},b.WebGLRenderer.prototype.renderDisplayObject=function(a,c,d){this.renderSession.blendModeManager.setBlendMode(b.blendModes.NORMAL),this.renderSession.drawCount=0,this.renderSession.flipY=d?-1:1,this.renderSession.projection=c,this.renderSession.offset=this.offset,this.spriteBatch.begin(this.renderSession),this.filterManager.begin(this.renderSession,d),a._renderWebGL(this.renderSession),this.spriteBatch.end()},b.WebGLRenderer.prototype.resize=function(a,b){this.width=a*this.resolution,this.height=b*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px"),this.gl.viewport(0,0,this.width,this.height),this.projection.x=this.width/2/this.resolution,this.projection.y=-this.height/2/this.resolution},b.WebGLRenderer.prototype.updateTexture=function(a){if(a.hasLoaded){var c=this.gl;return a._glTextures[c.id]||(a._glTextures[c.id]=c.createTexture()),c.bindTexture(c.TEXTURE_2D,a._glTextures[c.id]),c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultipliedAlpha),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,a.source),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),a.mipmap&&b.isPowerOfTwo(a.width,a.height)?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR_MIPMAP_LINEAR:c.NEAREST_MIPMAP_NEAREST),c.generateMipmap(c.TEXTURE_2D)):c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),a._powerOf2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.REPEAT),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.REPEAT)):(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE)),a._dirty[c.id]=!1,a._glTextures[c.id]}},b.WebGLRenderer.prototype.handleContextLost=function(a){a.preventDefault(),this.contextLost=!0},b.WebGLRenderer.prototype.handleContextRestored=function(){this.initContext();for(var a in b.TextureCache){var c=b.TextureCache[a].baseTexture;c._glTextures=[]}this.contextLost=!1},b.WebGLRenderer.prototype.destroy=function(){this.view.removeEventListener("webglcontextlost",this.contextLostBound),this.view.removeEventListener("webglcontextrestored",this.contextRestoredBound),b.glContexts[this.glContextId]=null,this.projection=null,this.offset=null,this.shaderManager.destroy(),this.spriteBatch.destroy(),this.maskManager.destroy(),this.filterManager.destroy(),this.shaderManager=null,this.spriteBatch=null,this.maskManager=null,this.filterManager=null,this.gl=null,this.renderSession=null},b.WebGLRenderer.prototype.mapBlendModes=function(){var a=this.gl;b.blendModesWebGL||(b.blendModesWebGL=[],b.blendModesWebGL[b.blendModes.NORMAL]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.ADD]=[a.SRC_ALPHA,a.DST_ALPHA],b.blendModesWebGL[b.blendModes.MULTIPLY]=[a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.SCREEN]=[a.SRC_ALPHA,a.ONE],b.blendModesWebGL[b.blendModes.OVERLAY]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.DARKEN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.LIGHTEN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.COLOR_DODGE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.COLOR_BURN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.HARD_LIGHT]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.SOFT_LIGHT]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.DIFFERENCE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.EXCLUSION]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.HUE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.SATURATION]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.COLOR]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL[b.blendModes.LUMINOSITY]=[a.ONE,a.ONE_MINUS_SRC_ALPHA])},b.WebGLRenderer.glContextId=0,b.WebGLBlendModeManager=function(){this.currentBlendMode=99999},b.WebGLBlendModeManager.prototype.constructor=b.WebGLBlendModeManager,b.WebGLBlendModeManager.prototype.setContext=function(a){this.gl=a},b.WebGLBlendModeManager.prototype.setBlendMode=function(a){if(this.currentBlendMode===a)return!1;this.currentBlendMode=a;var c=b.blendModesWebGL[this.currentBlendMode];return this.gl.blendFunc(c[0],c[1]),!0},b.WebGLBlendModeManager.prototype.destroy=function(){this.gl=null},b.WebGLMaskManager=function(){},b.WebGLMaskManager.prototype.constructor=b.WebGLMaskManager,b.WebGLMaskManager.prototype.setContext=function(a){this.gl=a},b.WebGLMaskManager.prototype.pushMask=function(a,c){var d=c.gl;a.dirty&&b.WebGLGraphics.updateGraphics(a,d),a._webGL[d.id].data.length&&c.stencilManager.pushStencil(a,a._webGL[d.id].data[0],c)},b.WebGLMaskManager.prototype.popMask=function(a,b){var c=this.gl;b.stencilManager.popStencil(a,a._webGL[c.id].data[0],b)},b.WebGLMaskManager.prototype.destroy=function(){this.gl=null},b.WebGLStencilManager=function(){this.stencilStack=[],this.reverse=!0,this.count=0},b.WebGLStencilManager.prototype.setContext=function(a){this.gl=a},b.WebGLStencilManager.prototype.pushStencil=function(a,b,c){var d=this.gl;this.bindGraphics(a,b,c),0===this.stencilStack.length&&(d.enable(d.STENCIL_TEST),d.clear(d.STENCIL_BUFFER_BIT),this.reverse=!0,this.count=0),this.stencilStack.push(b);var e=this.count;d.colorMask(!1,!1,!1,!1),d.stencilFunc(d.ALWAYS,0,255),d.stencilOp(d.KEEP,d.KEEP,d.INVERT),1===b.mode?(d.drawElements(d.TRIANGLE_FAN,b.indices.length-4,d.UNSIGNED_SHORT,0),this.reverse?(d.stencilFunc(d.EQUAL,255-e,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)):(d.stencilFunc(d.EQUAL,e,255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(b.indices.length-4)),this.reverse?d.stencilFunc(d.EQUAL,255-(e+1),255):d.stencilFunc(d.EQUAL,e+1,255),this.reverse=!this.reverse):(this.reverse?(d.stencilFunc(d.EQUAL,e,255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)):(d.stencilFunc(d.EQUAL,255-e,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)),d.drawElements(d.TRIANGLE_STRIP,b.indices.length,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e+1,255):d.stencilFunc(d.EQUAL,255-(e+1),255)),d.colorMask(!0,!0,!0,!0),d.stencilOp(d.KEEP,d.KEEP,d.KEEP),this.count++},b.WebGLStencilManager.prototype.bindGraphics=function(a,c,d){this._currentGraphics=a;var e,f=this.gl,g=d.projection,h=d.offset;1===c.mode?(e=d.shaderManager.complexPrimitiveShader,d.shaderManager.setShader(e),f.uniform1f(e.flipY,d.flipY),f.uniformMatrix3fv(e.translationMatrix,!1,a.worldTransform.toArray(!0)),f.uniform2f(e.projectionVector,g.x,-g.y),f.uniform2f(e.offsetVector,-h.x,-h.y),f.uniform3fv(e.tintColor,b.hex2rgb(a.tint)),f.uniform3fv(e.color,c.color),f.uniform1f(e.alpha,a.worldAlpha*c.alpha),f.bindBuffer(f.ARRAY_BUFFER,c.buffer),f.vertexAttribPointer(e.aVertexPosition,2,f.FLOAT,!1,8,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,c.indexBuffer)):(e=d.shaderManager.primitiveShader,d.shaderManager.setShader(e),f.uniformMatrix3fv(e.translationMatrix,!1,a.worldTransform.toArray(!0)),f.uniform1f(e.flipY,d.flipY),f.uniform2f(e.projectionVector,g.x,-g.y),f.uniform2f(e.offsetVector,-h.x,-h.y),f.uniform3fv(e.tintColor,b.hex2rgb(a.tint)),f.uniform1f(e.alpha,a.worldAlpha),f.bindBuffer(f.ARRAY_BUFFER,c.buffer),f.vertexAttribPointer(e.aVertexPosition,2,f.FLOAT,!1,24,0),f.vertexAttribPointer(e.colorAttribute,4,f.FLOAT,!1,24,8),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,c.indexBuffer))},b.WebGLStencilManager.prototype.popStencil=function(a,b,c){var d=this.gl;if(this.stencilStack.pop(),this.count--,0===this.stencilStack.length)d.disable(d.STENCIL_TEST);else{var e=this.count;this.bindGraphics(a,b,c),d.colorMask(!1,!1,!1,!1),1===b.mode?(this.reverse=!this.reverse,this.reverse?(d.stencilFunc(d.EQUAL,255-(e+1),255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)):(d.stencilFunc(d.EQUAL,e+1,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(b.indices.length-4)),d.stencilFunc(d.ALWAYS,0,255),d.stencilOp(d.KEEP,d.KEEP,d.INVERT),d.drawElements(d.TRIANGLE_FAN,b.indices.length-4,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e,255):d.stencilFunc(d.EQUAL,255-e,255)):(this.reverse?(d.stencilFunc(d.EQUAL,e+1,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)):(d.stencilFunc(d.EQUAL,255-(e+1),255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)),d.drawElements(d.TRIANGLE_STRIP,b.indices.length,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e,255):d.stencilFunc(d.EQUAL,255-e,255)),d.colorMask(!0,!0,!0,!0),d.stencilOp(d.KEEP,d.KEEP,d.KEEP)}},b.WebGLStencilManager.prototype.destroy=function(){this.stencilStack=null,this.gl=null},b.WebGLShaderManager=function(){this.maxAttibs=10,this.attribState=[],this.tempAttribState=[];for(var a=0;a<this.maxAttibs;a++)this.attribState[a]=!1;this.stack=[]},b.WebGLShaderManager.prototype.constructor=b.WebGLShaderManager,b.WebGLShaderManager.prototype.setContext=function(a){this.gl=a,this.primitiveShader=new b.PrimitiveShader(a),this.complexPrimitiveShader=new b.ComplexPrimitiveShader(a),this.defaultShader=new b.PixiShader(a),this.fastShader=new b.PixiFastShader(a),this.stripShader=new b.StripShader(a),this.setShader(this.defaultShader)},b.WebGLShaderManager.prototype.setAttribs=function(a){var b;for(b=0;b<this.tempAttribState.length;b++)this.tempAttribState[b]=!1;for(b=0;b<a.length;b++){var c=a[b];this.tempAttribState[c]=!0}var d=this.gl;for(b=0;b<this.attribState.length;b++)this.attribState[b]!==this.tempAttribState[b]&&(this.attribState[b]=this.tempAttribState[b],this.tempAttribState[b]?d.enableVertexAttribArray(b):d.disableVertexAttribArray(b))},b.WebGLShaderManager.prototype.setShader=function(a){return this._currentId===a._UID?!1:(this._currentId=a._UID,this.currentShader=a,this.gl.useProgram(a.program),this.setAttribs(a.attributes),!0)},b.WebGLShaderManager.prototype.destroy=function(){this.attribState=null,this.tempAttribState=null,this.primitiveShader.destroy(),this.complexPrimitiveShader.destroy(),this.defaultShader.destroy(),this.fastShader.destroy(),this.stripShader.destroy(),this.gl=null},b.WebGLSpriteBatch=function(){this.vertSize=5,this.size=2e3;var a=4*this.size*4*this.vertSize,c=6*this.size;this.vertices=new b.ArrayBuffer(a),this.positions=new b.Float32Array(this.vertices),this.colors=new b.Uint32Array(this.vertices),this.indices=new b.Uint16Array(c),this.lastIndexCount=0;for(var d=0,e=0;c>d;d+=6,e+=4)this.indices[d+0]=e+0,this.indices[d+1]=e+1,this.indices[d+2]=e+2,this.indices[d+3]=e+0,this.indices[d+4]=e+2,this.indices[d+5]=e+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.dirty=!0,this.textures=[],this.blendModes=[],this.shaders=[],this.sprites=[],this.defaultShader=new b.AbstractFilter(["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"])},b.WebGLSpriteBatch.prototype.setContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertices,a.DYNAMIC_DRAW),this.currentBlendMode=99999;var c=new b.PixiShader(a);c.fragmentSrc=this.defaultShader.fragmentSrc,c.uniforms={},c.init(),this.defaultShader.shaders[a.id]=c},b.WebGLSpriteBatch.prototype.begin=function(a){this.renderSession=a,this.shader=this.renderSession.shaderManager.defaultShader,this.start()},b.WebGLSpriteBatch.prototype.end=function(){this.flush()},b.WebGLSpriteBatch.prototype.render=function(a){var b=a.texture;this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=b.baseTexture);var c=b._uvs;if(c){var d,e,f,g,h=a.anchor.x,i=a.anchor.y;if(b.trim){var j=b.trim;e=j.x-h*j.width,d=e+b.crop.width,g=j.y-i*j.height,f=g+b.crop.height}else d=b.frame.width*(1-h),e=b.frame.width*-h,f=b.frame.height*(1-i),g=b.frame.height*-i;var k=4*this.currentBatchSize*this.vertSize,l=b.baseTexture.resolution,m=a.worldTransform,n=m.a/l,o=m.b/l,p=m.c/l,q=m.d/l,r=m.tx,s=m.ty,t=this.colors,u=this.positions;this.renderSession.roundPixels?(u[k]=n*e+p*g+r|0,u[k+1]=q*g+o*e+s|0,u[k+5]=n*d+p*g+r|0,u[k+6]=q*g+o*d+s|0,u[k+10]=n*d+p*f+r|0,u[k+11]=q*f+o*d+s|0,u[k+15]=n*e+p*f+r|0,u[k+16]=q*f+o*e+s|0):(u[k]=n*e+p*g+r,u[k+1]=q*g+o*e+s,u[k+5]=n*d+p*g+r,u[k+6]=q*g+o*d+s,u[k+10]=n*d+p*f+r,u[k+11]=q*f+o*d+s,u[k+15]=n*e+p*f+r,u[k+16]=q*f+o*e+s),u[k+2]=c.x0,u[k+3]=c.y0,u[k+7]=c.x1,u[k+8]=c.y1,u[k+12]=c.x2,u[k+13]=c.y2,u[k+17]=c.x3,u[k+18]=c.y3;var v=a.tint;t[k+4]=t[k+9]=t[k+14]=t[k+19]=(v>>16)+(65280&v)+((255&v)<<16)+(255*a.worldAlpha<<24),this.sprites[this.currentBatchSize++]=a}},b.WebGLSpriteBatch.prototype.renderTilingSprite=function(a){var c=a.tilingTexture;this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=c.baseTexture),a._uvs||(a._uvs=new b.TextureUvs);var d=a._uvs;a.tilePosition.x%=c.baseTexture.width*a.tileScaleOffset.x,a.tilePosition.y%=c.baseTexture.height*a.tileScaleOffset.y;var e=a.tilePosition.x/(c.baseTexture.width*a.tileScaleOffset.x),f=a.tilePosition.y/(c.baseTexture.height*a.tileScaleOffset.y),g=a.width/c.baseTexture.width/(a.tileScale.x*a.tileScaleOffset.x),h=a.height/c.baseTexture.height/(a.tileScale.y*a.tileScaleOffset.y);d.x0=0-e,d.y0=0-f,d.x1=1*g-e,d.y1=0-f,d.x2=1*g-e,d.y2=1*h-f,d.x3=0-e,d.y3=1*h-f;var i=a.tint,j=(i>>16)+(65280&i)+((255&i)<<16)+(255*a.alpha<<24),k=this.positions,l=this.colors,m=a.width,n=a.height,o=a.anchor.x,p=a.anchor.y,q=m*(1-o),r=m*-o,s=n*(1-p),t=n*-p,u=4*this.currentBatchSize*this.vertSize,v=c.baseTexture.resolution,w=a.worldTransform,x=w.a/v,y=w.b/v,z=w.c/v,A=w.d/v,B=w.tx,C=w.ty;k[u++]=x*r+z*t+B,k[u++]=A*t+y*r+C,k[u++]=d.x0,k[u++]=d.y0,l[u++]=j,k[u++]=x*q+z*t+B,k[u++]=A*t+y*q+C,k[u++]=d.x1,k[u++]=d.y1,l[u++]=j,k[u++]=x*q+z*s+B,k[u++]=A*s+y*q+C,k[u++]=d.x2,k[u++]=d.y2,l[u++]=j,k[u++]=x*r+z*s+B,k[u++]=A*s+y*r+C,k[u++]=d.x3,k[u++]=d.y3,l[u++]=j,this.sprites[this.currentBatchSize++]=a},b.WebGLSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var a,c=this.gl;if(this.dirty){this.dirty=!1,c.activeTexture(c.TEXTURE0),c.bindBuffer(c.ARRAY_BUFFER,this.vertexBuffer),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a=this.defaultShader.shaders[c.id];var d=4*this.vertSize;c.vertexAttribPointer(a.aVertexPosition,2,c.FLOAT,!1,d,0),c.vertexAttribPointer(a.aTextureCoord,2,c.FLOAT,!1,d,8),c.vertexAttribPointer(a.colorAttribute,4,c.UNSIGNED_BYTE,!0,d,16)}if(this.currentBatchSize>.5*this.size)c.bufferSubData(c.ARRAY_BUFFER,0,this.vertices);else{var e=this.positions.subarray(0,4*this.currentBatchSize*this.vertSize);c.bufferSubData(c.ARRAY_BUFFER,0,e)}for(var f,g,h,i,j=0,k=0,l=null,m=this.renderSession.blendModeManager.currentBlendMode,n=null,o=!1,p=!1,q=0,r=this.currentBatchSize;r>q;q++){if(i=this.sprites[q],f=i.texture.baseTexture,g=i.blendMode,h=i.shader||this.defaultShader,o=m!==g,p=n!==h,(l!==f||o||p)&&(this.renderBatch(l,j,k),k=q,j=0,l=f,o&&(m=g,this.renderSession.blendModeManager.setBlendMode(m)),p)){n=h,a=n.shaders[c.id],a||(a=new b.PixiShader(c),a.fragmentSrc=n.fragmentSrc,a.uniforms=n.uniforms,a.init(),n.shaders[c.id]=a),this.renderSession.shaderManager.setShader(a),a.dirty&&a.syncUniforms();var s=this.renderSession.projection;c.uniform2f(a.projectionVector,s.x,s.y);var t=this.renderSession.offset;c.uniform2f(a.offsetVector,t.x,t.y)}j++}this.renderBatch(l,j,k),this.currentBatchSize=0}},b.WebGLSpriteBatch.prototype.renderBatch=function(a,b,c){if(0!==b){var d=this.gl;a._dirty[d.id]?this.renderSession.renderer.updateTexture(a):d.bindTexture(d.TEXTURE_2D,a._glTextures[d.id]),d.drawElements(d.TRIANGLES,6*b,d.UNSIGNED_SHORT,6*c*2),this.renderSession.drawCount++}},b.WebGLSpriteBatch.prototype.stop=function(){this.flush(),this.dirty=!0},b.WebGLSpriteBatch.prototype.start=function(){this.dirty=!0},b.WebGLSpriteBatch.prototype.destroy=function(){this.vertices=null,this.indices=null,this.gl.deleteBuffer(this.vertexBuffer),this.gl.deleteBuffer(this.indexBuffer),this.currentBaseTexture=null,this.gl=null},b.WebGLFastSpriteBatch=function(a){this.vertSize=10,this.maxSize=6e3,this.size=this.maxSize;var c=4*this.size*this.vertSize,d=6*this.maxSize;this.vertices=new b.Float32Array(c),this.indices=new b.Uint16Array(d),this.vertexBuffer=null,this.indexBuffer=null,this.lastIndexCount=0;for(var e=0,f=0;d>e;e+=6,f+=4)this.indices[e+0]=f+0,this.indices[e+1]=f+1,this.indices[e+2]=f+2,this.indices[e+3]=f+0,this.indices[e+4]=f+2,this.indices[e+5]=f+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.currentBlendMode=0,this.renderSession=null,this.shader=null,this.matrix=null,this.setContext(a)},b.WebGLFastSpriteBatch.prototype.constructor=b.WebGLFastSpriteBatch,b.WebGLFastSpriteBatch.prototype.setContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertices,a.DYNAMIC_DRAW)},b.WebGLFastSpriteBatch.prototype.begin=function(a,b){this.renderSession=b,this.shader=this.renderSession.shaderManager.fastShader,this.matrix=a.worldTransform.toArray(!0),this.start()},b.WebGLFastSpriteBatch.prototype.end=function(){this.flush()},b.WebGLFastSpriteBatch.prototype.render=function(a){var b=a.children,c=b[0];if(c.texture._uvs){this.currentBaseTexture=c.texture.baseTexture,c.blendMode!==this.renderSession.blendModeManager.currentBlendMode&&(this.flush(),this.renderSession.blendModeManager.setBlendMode(c.blendMode));for(var d=0,e=b.length;e>d;d++)this.renderSprite(b[d]);this.flush()}},b.WebGLFastSpriteBatch.prototype.renderSprite=function(a){if(a.visible&&(a.texture.baseTexture===this.currentBaseTexture||(this.flush(),this.currentBaseTexture=a.texture.baseTexture,a.texture._uvs))){var b,c,d,e,f,g,h,i,j=this.vertices;if(b=a.texture._uvs,c=a.texture.frame.width,d=a.texture.frame.height,a.texture.trim){var k=a.texture.trim;f=k.x-a.anchor.x*k.width,e=f+a.texture.crop.width,h=k.y-a.anchor.y*k.height,g=h+a.texture.crop.height}else e=a.texture.frame.width*(1-a.anchor.x),f=a.texture.frame.width*-a.anchor.x,g=a.texture.frame.height*(1-a.anchor.y),h=a.texture.frame.height*-a.anchor.y;i=4*this.currentBatchSize*this.vertSize,j[i++]=f,j[i++]=h,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x0,j[i++]=b.y1,j[i++]=a.alpha,j[i++]=e,j[i++]=h,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x1,j[i++]=b.y1,j[i++]=a.alpha,j[i++]=e,j[i++]=g,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x2,j[i++]=b.y2,j[i++]=a.alpha,j[i++]=f,j[i++]=g,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x3,j[i++]=b.y3,j[i++]=a.alpha,this.currentBatchSize++,this.currentBatchSize>=this.size&&this.flush()}},b.WebGLFastSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var a=this.gl;if(this.currentBaseTexture._glTextures[a.id]||this.renderSession.renderer.updateTexture(this.currentBaseTexture,a),a.bindTexture(a.TEXTURE_2D,this.currentBaseTexture._glTextures[a.id]),this.currentBatchSize>.5*this.size)a.bufferSubData(a.ARRAY_BUFFER,0,this.vertices);else{var b=this.vertices.subarray(0,4*this.currentBatchSize*this.vertSize);a.bufferSubData(a.ARRAY_BUFFER,0,b)}a.drawElements(a.TRIANGLES,6*this.currentBatchSize,a.UNSIGNED_SHORT,0),this.currentBatchSize=0,this.renderSession.drawCount++}},b.WebGLFastSpriteBatch.prototype.stop=function(){this.flush()},b.WebGLFastSpriteBatch.prototype.start=function(){var a=this.gl;a.activeTexture(a.TEXTURE0),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var b=this.renderSession.projection;a.uniform2f(this.shader.projectionVector,b.x,b.y),a.uniformMatrix3fv(this.shader.uMatrix,!1,this.matrix);var c=4*this.vertSize;a.vertexAttribPointer(this.shader.aVertexPosition,2,a.FLOAT,!1,c,0),a.vertexAttribPointer(this.shader.aPositionCoord,2,a.FLOAT,!1,c,8),a.vertexAttribPointer(this.shader.aScale,2,a.FLOAT,!1,c,16),a.vertexAttribPointer(this.shader.aRotation,1,a.FLOAT,!1,c,24),a.vertexAttribPointer(this.shader.aTextureCoord,2,a.FLOAT,!1,c,28),a.vertexAttribPointer(this.shader.colorAttribute,1,a.FLOAT,!1,c,36)},b.WebGLFilterManager=function(){this.filterStack=[],this.offsetX=0,this.offsetY=0},b.WebGLFilterManager.prototype.constructor=b.WebGLFilterManager,b.WebGLFilterManager.prototype.setContext=function(a){this.gl=a,this.texturePool=[],this.initShaderBuffers()},b.WebGLFilterManager.prototype.begin=function(a,b){this.renderSession=a,this.defaultShader=a.shaderManager.defaultShader;var c=this.renderSession.projection;this.width=2*c.x,this.height=2*-c.y,this.buffer=b},b.WebGLFilterManager.prototype.pushFilter=function(a){var c=this.gl,d=this.renderSession.projection,e=this.renderSession.offset;a._filterArea=a.target.filterArea||a.target.getBounds(),this.filterStack.push(a);var f=a.filterPasses[0];this.offsetX+=a._filterArea.x,this.offsetY+=a._filterArea.y;var g=this.texturePool.pop();g?g.resize(this.width,this.height):g=new b.FilterTexture(this.gl,this.width,this.height),c.bindTexture(c.TEXTURE_2D,g.texture);var h=a._filterArea,i=f.padding;h.x-=i,h.y-=i,h.width+=2*i,h.height+=2*i,h.x<0&&(h.x=0),h.width>this.width&&(h.width=this.width),h.y<0&&(h.y=0),h.height>this.height&&(h.height=this.height),c.bindFramebuffer(c.FRAMEBUFFER,g.frameBuffer),c.viewport(0,0,h.width,h.height),d.x=h.width/2,d.y=-h.height/2,e.x=-h.x,e.y=-h.y,c.colorMask(!0,!0,!0,!0),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),a._glFilterTexture=g},b.WebGLFilterManager.prototype.popFilter=function(){var a=this.gl,c=this.filterStack.pop(),d=c._filterArea,e=c._glFilterTexture,f=this.renderSession.projection,g=this.renderSession.offset;if(c.filterPasses.length>1){a.viewport(0,0,d.width,d.height),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=0,this.vertexArray[1]=d.height,this.vertexArray[2]=d.width,this.vertexArray[3]=d.height,this.vertexArray[4]=0,this.vertexArray[5]=0,this.vertexArray[6]=d.width,this.vertexArray[7]=0,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray);var h=e,i=this.texturePool.pop();i||(i=new b.FilterTexture(this.gl,this.width,this.height)),i.resize(this.width,this.height),a.bindFramebuffer(a.FRAMEBUFFER,i.frameBuffer),a.clear(a.COLOR_BUFFER_BIT),a.disable(a.BLEND);for(var j=0;j<c.filterPasses.length-1;j++){var k=c.filterPasses[j];a.bindFramebuffer(a.FRAMEBUFFER,i.frameBuffer),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,h.texture),this.applyFilterPass(k,d,d.width,d.height);var l=h;h=i,i=l}a.enable(a.BLEND),e=h,this.texturePool.push(i)}var m=c.filterPasses[c.filterPasses.length-1];this.offsetX-=d.x,this.offsetY-=d.y;var n=this.width,o=this.height,p=0,q=0,r=this.buffer;if(0===this.filterStack.length)a.colorMask(!0,!0,!0,!0);else{var s=this.filterStack[this.filterStack.length-1];d=s._filterArea,n=d.width,o=d.height,p=d.x,q=d.y,r=s._glFilterTexture.frameBuffer}f.x=n/2,f.y=-o/2,g.x=p,g.y=q,d=c._filterArea;var t=d.x-p,u=d.y-q;a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=t,this.vertexArray[1]=u+d.height,this.vertexArray[2]=t+d.width,this.vertexArray[3]=u+d.height,this.vertexArray[4]=t,this.vertexArray[5]=u,this.vertexArray[6]=t+d.width,this.vertexArray[7]=u,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray),a.viewport(0,0,n*this.renderSession.resolution,o*this.renderSession.resolution),a.bindFramebuffer(a.FRAMEBUFFER,r),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,e.texture),this.applyFilterPass(m,d,n,o),this.texturePool.push(e),c._glFilterTexture=null},b.WebGLFilterManager.prototype.applyFilterPass=function(a,c,d,e){var f=this.gl,g=a.shaders[f.id];g||(g=new b.PixiShader(f),g.fragmentSrc=a.fragmentSrc,g.uniforms=a.uniforms,g.init(),a.shaders[f.id]=g),this.renderSession.shaderManager.setShader(g),
f.uniform2f(g.projectionVector,d/2,-e/2),f.uniform2f(g.offsetVector,0,0),a.uniforms.dimensions&&(a.uniforms.dimensions.value[0]=this.width,a.uniforms.dimensions.value[1]=this.height,a.uniforms.dimensions.value[2]=this.vertexArray[0],a.uniforms.dimensions.value[3]=this.vertexArray[5]),g.syncUniforms(),f.bindBuffer(f.ARRAY_BUFFER,this.vertexBuffer),f.vertexAttribPointer(g.aVertexPosition,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.uvBuffer),f.vertexAttribPointer(g.aTextureCoord,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.colorBuffer),f.vertexAttribPointer(g.colorAttribute,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,this.indexBuffer),f.drawElements(f.TRIANGLES,6,f.UNSIGNED_SHORT,0),this.renderSession.drawCount++},b.WebGLFilterManager.prototype.initShaderBuffers=function(){var a=this.gl;this.vertexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.colorBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.vertexArray=new b.Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertexArray,a.STATIC_DRAW),this.uvArray=new b.Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),a.bufferData(a.ARRAY_BUFFER,this.uvArray,a.STATIC_DRAW),this.colorArray=new b.Float32Array([1,16777215,1,16777215,1,16777215,1,16777215]),a.bindBuffer(a.ARRAY_BUFFER,this.colorBuffer),a.bufferData(a.ARRAY_BUFFER,this.colorArray,a.STATIC_DRAW),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),a.STATIC_DRAW)},b.WebGLFilterManager.prototype.destroy=function(){var a=this.gl;this.filterStack=null,this.offsetX=0,this.offsetY=0;for(var b=0;b<this.texturePool.length;b++)this.texturePool[b].destroy();this.texturePool=null,a.deleteBuffer(this.vertexBuffer),a.deleteBuffer(this.uvBuffer),a.deleteBuffer(this.colorBuffer),a.deleteBuffer(this.indexBuffer)},b.FilterTexture=function(a,c,d,e){this.gl=a,this.frameBuffer=a.createFramebuffer(),this.texture=a.createTexture(),e=e||b.scaleModes.DEFAULT,a.bindTexture(a.TEXTURE_2D,this.texture),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,e===b.scaleModes.LINEAR?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,e===b.scaleModes.LINEAR?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.bindFramebuffer(a.FRAMEBUFFER,this.frameBuffer),a.bindFramebuffer(a.FRAMEBUFFER,this.frameBuffer),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.texture,0),this.renderBuffer=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,this.renderBuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,this.renderBuffer),this.resize(c,d)},b.FilterTexture.prototype.constructor=b.FilterTexture,b.FilterTexture.prototype.clear=function(){var a=this.gl;a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT)},b.FilterTexture.prototype.resize=function(a,b){if(this.width!==a||this.height!==b){this.width=a,this.height=b;var c=this.gl;c.bindTexture(c.TEXTURE_2D,this.texture),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,a,b,0,c.RGBA,c.UNSIGNED_BYTE,null),c.bindRenderbuffer(c.RENDERBUFFER,this.renderBuffer),c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_STENCIL,a,b)}},b.FilterTexture.prototype.destroy=function(){var a=this.gl;a.deleteFramebuffer(this.frameBuffer),a.deleteTexture(this.texture),this.frameBuffer=null,this.texture=null},b.CanvasBuffer=function(a,b){this.width=a,this.height=b,this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.canvas.width=a,this.canvas.height=b},b.CanvasBuffer.prototype.constructor=b.CanvasBuffer,b.CanvasBuffer.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.width,this.height)},b.CanvasBuffer.prototype.resize=function(a,b){this.width=this.canvas.width=a,this.height=this.canvas.height=b},b.CanvasMaskManager=function(){},b.CanvasMaskManager.prototype.constructor=b.CanvasMaskManager,b.CanvasMaskManager.prototype.pushMask=function(a,c){var d=c.context;d.save();var e=a.alpha,f=a.worldTransform,g=c.resolution;d.setTransform(f.a*g,f.b*g,f.c*g,f.d*g,f.tx*g,f.ty*g),b.CanvasGraphics.renderGraphicsMask(a,d),d.clip(),a.worldAlpha=e},b.CanvasMaskManager.prototype.popMask=function(a){a.context.restore()},b.CanvasTinter=function(){},b.CanvasTinter.getTintedTexture=function(a,c){var d=a.texture;c=b.CanvasTinter.roundColor(c);var e="#"+("00000"+(0|c).toString(16)).substr(-6);if(d.tintCache=d.tintCache||{},d.tintCache[e])return d.tintCache[e];var f=b.CanvasTinter.canvas||document.createElement("canvas");if(b.CanvasTinter.tintMethod(d,c,f),b.CanvasTinter.convertTintToImage){var g=new Image;g.src=f.toDataURL(),d.tintCache[e]=g}else d.tintCache[e]=f,b.CanvasTinter.canvas=null;return f},b.CanvasTinter.tintWithMultiply=function(a,b,c){var d=c.getContext("2d"),e=a.crop;c.width=e.width,c.height=e.height,d.fillStyle="#"+("00000"+(0|b).toString(16)).substr(-6),d.fillRect(0,0,e.width,e.height),d.globalCompositeOperation="multiply",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height),d.globalCompositeOperation="destination-atop",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height)},b.CanvasTinter.tintWithOverlay=function(a,b,c){var d=c.getContext("2d"),e=a.crop;c.width=e.width,c.height=e.height,d.globalCompositeOperation="copy",d.fillStyle="#"+("00000"+(0|b).toString(16)).substr(-6),d.fillRect(0,0,e.width,e.height),d.globalCompositeOperation="destination-atop",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height)},b.CanvasTinter.tintWithPerPixel=function(a,c,d){var e=d.getContext("2d"),f=a.crop;d.width=f.width,d.height=f.height,e.globalCompositeOperation="copy",e.drawImage(a.baseTexture.source,f.x,f.y,f.width,f.height,0,0,f.width,f.height);for(var g=b.hex2rgb(c),h=g[0],i=g[1],j=g[2],k=e.getImageData(0,0,f.width,f.height),l=k.data,m=0;m<l.length;m+=4)l[m+0]*=h,l[m+1]*=i,l[m+2]*=j;e.putImageData(k,0,0)},b.CanvasTinter.roundColor=function(a){var c=b.CanvasTinter.cacheStepsPerColorChannel,d=b.hex2rgb(a);return d[0]=Math.min(255,d[0]/c*c),d[1]=Math.min(255,d[1]/c*c),d[2]=Math.min(255,d[2]/c*c),b.rgb2hex(d)},b.CanvasTinter.cacheStepsPerColorChannel=8,b.CanvasTinter.convertTintToImage=!1,b.CanvasTinter.canUseMultiply=b.canUseNewCanvasBlendModes(),b.CanvasTinter.tintMethod=b.CanvasTinter.canUseMultiply?b.CanvasTinter.tintWithMultiply:b.CanvasTinter.tintWithPerPixel,b.CanvasRenderer=function(a,c,d){if(d)for(var e in b.defaultRenderOptions)"undefined"==typeof d[e]&&(d[e]=b.defaultRenderOptions[e]);else d=b.defaultRenderOptions;b.defaultRenderer||(b.sayHello("Canvas"),b.defaultRenderer=this),this.type=b.CANVAS_RENDERER,this.resolution=d.resolution,this.clearBeforeRender=d.clearBeforeRender,this.transparent=d.transparent,this.autoResize=d.autoResize||!1,this.width=a||800,this.height=c||600,this.width*=this.resolution,this.height*=this.resolution,this.view=d.view||document.createElement("canvas"),this.context=this.view.getContext("2d",{alpha:this.transparent}),this.refresh=!0,this.view.width=this.width*this.resolution,this.view.height=this.height*this.resolution,this.count=0,this.maskManager=new b.CanvasMaskManager,this.renderSession={context:this.context,maskManager:this.maskManager,scaleMode:null,smoothProperty:null,roundPixels:!1},this.mapBlendModes(),this.resize(a,c),"imageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="imageSmoothingEnabled":"webkitImageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="webkitImageSmoothingEnabled":"mozImageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="mozImageSmoothingEnabled":"oImageSmoothingEnabled"in this.context?this.renderSession.smoothProperty="oImageSmoothingEnabled":"msImageSmoothingEnabled"in this.context&&(this.renderSession.smoothProperty="msImageSmoothingEnabled")},b.CanvasRenderer.prototype.constructor=b.CanvasRenderer,b.CanvasRenderer.prototype.render=function(a){a.updateTransform(),this.context.setTransform(1,0,0,1,0,0),this.context.globalAlpha=1,this.renderSession.currentBlendMode=b.blendModes.NORMAL,this.context.globalCompositeOperation=b.blendModesCanvas[b.blendModes.NORMAL],navigator.isCocoonJS&&this.view.screencanvas&&(this.context.fillStyle="black",this.context.clear()),this.clearBeforeRender&&(this.transparent?this.context.clearRect(0,0,this.width,this.height):(this.context.fillStyle=a.backgroundColorString,this.context.fillRect(0,0,this.width,this.height))),this.renderDisplayObject(a),a.interactive&&(a._interactiveEventsAdded||(a._interactiveEventsAdded=!0,a.interactionManager.setTarget(this)))},b.CanvasRenderer.prototype.destroy=function(a){"undefined"==typeof a&&(a=!0),a&&this.view.parent&&this.view.parent.removeChild(this.view),this.view=null,this.context=null,this.maskManager=null,this.renderSession=null},b.CanvasRenderer.prototype.resize=function(a,b){this.width=a*this.resolution,this.height=b*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px")},b.CanvasRenderer.prototype.renderDisplayObject=function(a,b){this.renderSession.context=b||this.context,this.renderSession.resolution=this.resolution,a._renderCanvas(this.renderSession)},b.CanvasRenderer.prototype.mapBlendModes=function(){b.blendModesCanvas||(b.blendModesCanvas=[],b.canUseNewCanvasBlendModes()?(b.blendModesCanvas[b.blendModes.NORMAL]="source-over",b.blendModesCanvas[b.blendModes.ADD]="lighter",b.blendModesCanvas[b.blendModes.MULTIPLY]="multiply",b.blendModesCanvas[b.blendModes.SCREEN]="screen",b.blendModesCanvas[b.blendModes.OVERLAY]="overlay",b.blendModesCanvas[b.blendModes.DARKEN]="darken",b.blendModesCanvas[b.blendModes.LIGHTEN]="lighten",b.blendModesCanvas[b.blendModes.COLOR_DODGE]="color-dodge",b.blendModesCanvas[b.blendModes.COLOR_BURN]="color-burn",b.blendModesCanvas[b.blendModes.HARD_LIGHT]="hard-light",b.blendModesCanvas[b.blendModes.SOFT_LIGHT]="soft-light",b.blendModesCanvas[b.blendModes.DIFFERENCE]="difference",b.blendModesCanvas[b.blendModes.EXCLUSION]="exclusion",b.blendModesCanvas[b.blendModes.HUE]="hue",b.blendModesCanvas[b.blendModes.SATURATION]="saturation",b.blendModesCanvas[b.blendModes.COLOR]="color",b.blendModesCanvas[b.blendModes.LUMINOSITY]="luminosity"):(b.blendModesCanvas[b.blendModes.NORMAL]="source-over",b.blendModesCanvas[b.blendModes.ADD]="lighter",b.blendModesCanvas[b.blendModes.MULTIPLY]="source-over",b.blendModesCanvas[b.blendModes.SCREEN]="source-over",b.blendModesCanvas[b.blendModes.OVERLAY]="source-over",b.blendModesCanvas[b.blendModes.DARKEN]="source-over",b.blendModesCanvas[b.blendModes.LIGHTEN]="source-over",b.blendModesCanvas[b.blendModes.COLOR_DODGE]="source-over",b.blendModesCanvas[b.blendModes.COLOR_BURN]="source-over",b.blendModesCanvas[b.blendModes.HARD_LIGHT]="source-over",b.blendModesCanvas[b.blendModes.SOFT_LIGHT]="source-over",b.blendModesCanvas[b.blendModes.DIFFERENCE]="source-over",b.blendModesCanvas[b.blendModes.EXCLUSION]="source-over",b.blendModesCanvas[b.blendModes.HUE]="source-over",b.blendModesCanvas[b.blendModes.SATURATION]="source-over",b.blendModesCanvas[b.blendModes.COLOR]="source-over",b.blendModesCanvas[b.blendModes.LUMINOSITY]="source-over"))},b.CanvasGraphics=function(){},b.CanvasGraphics.renderGraphics=function(a,c){var d=a.worldAlpha;a.dirty&&(this.updateGraphicsTint(a),a.dirty=!1);for(var e=0;e<a.graphicsData.length;e++){var f=a.graphicsData[e],g=f.shape,h=f._fillTint,i=f._lineTint;if(c.lineWidth=f.lineWidth,f.type===b.Graphics.POLY){c.beginPath();var j=g.points;c.moveTo(j[0],j[1]);for(var k=1;k<j.length/2;k++)c.lineTo(j[2*k],j[2*k+1]);g.closed&&c.lineTo(j[0],j[1]),j[0]===j[j.length-2]&&j[1]===j[j.length-1]&&c.closePath(),f.fill&&(c.globalAlpha=f.fillAlpha*d,c.fillStyle="#"+("00000"+(0|h).toString(16)).substr(-6),c.fill()),f.lineWidth&&(c.globalAlpha=f.lineAlpha*d,c.strokeStyle="#"+("00000"+(0|i).toString(16)).substr(-6),c.stroke())}else if(f.type===b.Graphics.RECT)(f.fillColor||0===f.fillColor)&&(c.globalAlpha=f.fillAlpha*d,c.fillStyle="#"+("00000"+(0|h).toString(16)).substr(-6),c.fillRect(g.x,g.y,g.width,g.height)),f.lineWidth&&(c.globalAlpha=f.lineAlpha*d,c.strokeStyle="#"+("00000"+(0|i).toString(16)).substr(-6),c.strokeRect(g.x,g.y,g.width,g.height));else if(f.type===b.Graphics.CIRC)c.beginPath(),c.arc(g.x,g.y,g.radius,0,2*Math.PI),c.closePath(),f.fill&&(c.globalAlpha=f.fillAlpha*d,c.fillStyle="#"+("00000"+(0|h).toString(16)).substr(-6),c.fill()),f.lineWidth&&(c.globalAlpha=f.lineAlpha*d,c.strokeStyle="#"+("00000"+(0|i).toString(16)).substr(-6),c.stroke());else if(f.type===b.Graphics.ELIP){var l=2*g.width,m=2*g.height,n=g.x-l/2,o=g.y-m/2;c.beginPath();var p=.5522848,q=l/2*p,r=m/2*p,s=n+l,t=o+m,u=n+l/2,v=o+m/2;c.moveTo(n,v),c.bezierCurveTo(n,v-r,u-q,o,u,o),c.bezierCurveTo(u+q,o,s,v-r,s,v),c.bezierCurveTo(s,v+r,u+q,t,u,t),c.bezierCurveTo(u-q,t,n,v+r,n,v),c.closePath(),f.fill&&(c.globalAlpha=f.fillAlpha*d,c.fillStyle="#"+("00000"+(0|h).toString(16)).substr(-6),c.fill()),f.lineWidth&&(c.globalAlpha=f.lineAlpha*d,c.strokeStyle="#"+("00000"+(0|i).toString(16)).substr(-6),c.stroke())}else if(f.type===b.Graphics.RREC){var w=g.x,x=g.y,y=g.width,z=g.height,A=g.radius,B=Math.min(y,z)/2|0;A=A>B?B:A,c.beginPath(),c.moveTo(w,x+A),c.lineTo(w,x+z-A),c.quadraticCurveTo(w,x+z,w+A,x+z),c.lineTo(w+y-A,x+z),c.quadraticCurveTo(w+y,x+z,w+y,x+z-A),c.lineTo(w+y,x+A),c.quadraticCurveTo(w+y,x,w+y-A,x),c.lineTo(w+A,x),c.quadraticCurveTo(w,x,w,x+A),c.closePath(),(f.fillColor||0===f.fillColor)&&(c.globalAlpha=f.fillAlpha*d,c.fillStyle="#"+("00000"+(0|h).toString(16)).substr(-6),c.fill()),f.lineWidth&&(c.globalAlpha=f.lineAlpha*d,c.strokeStyle="#"+("00000"+(0|i).toString(16)).substr(-6),c.stroke())}}},b.CanvasGraphics.renderGraphicsMask=function(a,c){var d=a.graphicsData.length;if(0!==d){d>1&&(d=1,window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));for(var e=0;1>e;e++){var f=a.graphicsData[e],g=f.shape;if(f.type===b.Graphics.POLY){c.beginPath();var h=g.points;c.moveTo(h[0],h[1]);for(var i=1;i<h.length/2;i++)c.lineTo(h[2*i],h[2*i+1]);h[0]===h[h.length-2]&&h[1]===h[h.length-1]&&c.closePath()}else if(f.type===b.Graphics.RECT)c.beginPath(),c.rect(g.x,g.y,g.width,g.height),c.closePath();else if(f.type===b.Graphics.CIRC)c.beginPath(),c.arc(g.x,g.y,g.radius,0,2*Math.PI),c.closePath();else if(f.type===b.Graphics.ELIP){var j=2*g.width,k=2*g.height,l=g.x-j/2,m=g.y-k/2;c.beginPath();var n=.5522848,o=j/2*n,p=k/2*n,q=l+j,r=m+k,s=l+j/2,t=m+k/2;c.moveTo(l,t),c.bezierCurveTo(l,t-p,s-o,m,s,m),c.bezierCurveTo(s+o,m,q,t-p,q,t),c.bezierCurveTo(q,t+p,s+o,r,s,r),c.bezierCurveTo(s-o,r,l,t+p,l,t),c.closePath()}else if(f.type===b.Graphics.RREC){var u=g.points,v=u[0],w=u[1],x=u[2],y=u[3],z=u[4],A=Math.min(x,y)/2|0;z=z>A?A:z,c.beginPath(),c.moveTo(v,w+z),c.lineTo(v,w+y-z),c.quadraticCurveTo(v,w+y,v+z,w+y),c.lineTo(v+x-z,w+y),c.quadraticCurveTo(v+x,w+y,v+x,w+y-z),c.lineTo(v+x,w+z),c.quadraticCurveTo(v+x,w,v+x-z,w),c.lineTo(v+z,w),c.quadraticCurveTo(v,w,v,w+z),c.closePath()}}}},b.CanvasGraphics.updateGraphicsTint=function(a){if(16777215!==a.tint)for(var b=(a.tint>>16&255)/255,c=(a.tint>>8&255)/255,d=(255&a.tint)/255,e=0;e<a.graphicsData.length;e++){var f=a.graphicsData[e],g=0|f.fillColor,h=0|f.lineColor;f._fillTint=((g>>16&255)/255*b*255<<16)+((g>>8&255)/255*c*255<<8)+(255&g)/255*d*255,f._lineTint=((h>>16&255)/255*b*255<<16)+((h>>8&255)/255*c*255<<8)+(255&h)/255*d*255}},b.Graphics=function(){b.DisplayObjectContainer.call(this),this.renderable=!0,this.fillAlpha=1,this.lineWidth=0,this.lineColor=0,this.graphicsData=[],this.tint=16777215,this.blendMode=b.blendModes.NORMAL,this.currentPath=null,this._webGL=[],this.isMask=!1,this.boundsPadding=0,this._localBounds=new b.Rectangle(0,0,1,1),this.dirty=!0,this.webGLDirty=!1,this.cachedSpriteDirty=!1},b.Graphics.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Graphics.prototype.constructor=b.Graphics,Object.defineProperty(b.Graphics.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap},set:function(a){this._cacheAsBitmap=a,this._cacheAsBitmap?this._generateCachedSprite():(this.destroyCachedSprite(),this.dirty=!0)}}),b.Graphics.prototype.lineStyle=function(a,c,d){if(this.lineWidth=a||0,this.lineColor=c||0,this.lineAlpha=arguments.length<3?1:d,this.currentPath){if(this.currentPath.shape.points.length)return this.drawShape(new b.Polygon(this.currentPath.shape.points.slice(-2))),this;this.currentPath.lineWidth=this.lineWidth,this.currentPath.lineColor=this.lineColor,this.currentPath.lineAlpha=this.lineAlpha}return this},b.Graphics.prototype.moveTo=function(a,c){return this.drawShape(new b.Polygon([a,c])),this},b.Graphics.prototype.lineTo=function(a,b){return this.currentPath.shape.points.push(a,b),this.dirty=!0,this},b.Graphics.prototype.quadraticCurveTo=function(a,b,c,d){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var e,f,g=20,h=this.currentPath.shape.points;0===h.length&&this.moveTo(0,0);for(var i=h[h.length-2],j=h[h.length-1],k=0,l=1;g>=l;l++)k=l/g,e=i+(a-i)*k,f=j+(b-j)*k,h.push(e+(a+(c-a)*k-e)*k,f+(b+(d-b)*k-f)*k);return this.dirty=!0,this},b.Graphics.prototype.bezierCurveTo=function(a,b,c,d,e,f){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);for(var g,h,i,j,k,l=20,m=this.currentPath.shape.points,n=m[m.length-2],o=m[m.length-1],p=0,q=1;l>=q;q++)p=q/l,g=1-p,h=g*g,i=h*g,j=p*p,k=j*p,m.push(i*n+3*h*p*a+3*g*j*c+k*e,i*o+3*h*p*b+3*g*j*d+k*f);return this.dirty=!0,this},b.Graphics.prototype.arcTo=function(a,b,c,d,e){this.currentPath?0===this.currentPath.shape.points.length&&this.currentPath.shape.points.push(a,b):this.moveTo(a,b);var f=this.currentPath.shape.points,g=f[f.length-2],h=f[f.length-1],i=h-b,j=g-a,k=d-b,l=c-a,m=Math.abs(i*l-j*k);if(1e-8>m||0===e)(f[f.length-2]!==a||f[f.length-1]!==b)&&f.push(a,b);else{var n=i*i+j*j,o=k*k+l*l,p=i*k+j*l,q=e*Math.sqrt(n)/m,r=e*Math.sqrt(o)/m,s=q*p/n,t=r*p/o,u=q*l+r*j,v=q*k+r*i,w=j*(r+s),x=i*(r+s),y=l*(q+t),z=k*(q+t),A=Math.atan2(x-v,w-u),B=Math.atan2(z-v,y-u);this.arc(u+a,v+b,e,A,B,j*k>l*i)}return this.dirty=!0,this},b.Graphics.prototype.arc=function(a,b,c,d,e,f){var g,h=a+Math.cos(d)*c,i=b+Math.sin(d)*c;if(this.currentPath?(g=this.currentPath.shape.points,0===g.length?g.push(h,i):(g[g.length-2]!==h||g[g.length-1]!==i)&&g.push(h,i)):(this.moveTo(h,i),g=this.currentPath.shape.points),d===e)return this;!f&&d>=e?e+=2*Math.PI:f&&e>=d&&(d+=2*Math.PI);var j=f?-1*(d-e):e-d,k=Math.abs(j)/(2*Math.PI)*40;if(0===j)return this;for(var l=j/(2*k),m=2*l,n=Math.cos(l),o=Math.sin(l),p=k-1,q=p%1/p,r=0;p>=r;r++){var s=r+q*r,t=l+d+m*s,u=Math.cos(t),v=-Math.sin(t);g.push((n*u+o*v)*c+a,(n*-v+o*u)*c+b)}return this.dirty=!0,this},b.Graphics.prototype.beginFill=function(a,b){return this.filling=!0,this.fillColor=a||0,this.fillAlpha=void 0===b?1:b,this.currentPath&&this.currentPath.shape.points.length<=2&&(this.currentPath.fill=this.filling,this.currentPath.fillColor=this.fillColor,this.currentPath.fillAlpha=this.fillAlpha),this},b.Graphics.prototype.endFill=function(){return this.filling=!1,this.fillColor=null,this.fillAlpha=1,this},b.Graphics.prototype.drawRect=function(a,c,d,e){return this.drawShape(new b.Rectangle(a,c,d,e)),this},b.Graphics.prototype.drawRoundedRect=function(a,c,d,e,f){return this.drawShape(new b.RoundedRectangle(a,c,d,e,f)),this},b.Graphics.prototype.drawCircle=function(a,c,d){return this.drawShape(new b.Circle(a,c,d)),this},b.Graphics.prototype.drawEllipse=function(a,c,d,e){return this.drawShape(new b.Ellipse(a,c,d,e)),this},b.Graphics.prototype.drawPolygon=function(a){return a instanceof Array||(a=Array.prototype.slice.call(arguments)),this.drawShape(new b.Polygon(a)),this},b.Graphics.prototype.clear=function(){return this.lineWidth=0,this.filling=!1,this.dirty=!0,this.clearDirty=!0,this.graphicsData=[],this},b.Graphics.prototype.generateTexture=function(a,c){a=a||1;var d=this.getBounds(),e=new b.CanvasBuffer(d.width*a,d.height*a),f=b.Texture.fromCanvas(e.canvas,c);return f.baseTexture.resolution=a,e.context.scale(a,a),e.context.translate(-d.x,-d.y),b.CanvasGraphics.renderGraphics(this,e.context),f},b.Graphics.prototype._renderWebGL=function(a){if(this.visible!==!1&&0!==this.alpha&&this.isMask!==!0){if(this._cacheAsBitmap)return(this.dirty||this.cachedSpriteDirty)&&(this._generateCachedSprite(),this.updateCachedSpriteTexture(),this.cachedSpriteDirty=!1,this.dirty=!1),this._cachedSprite.worldAlpha=this.worldAlpha,void b.Sprite.prototype._renderWebGL.call(this._cachedSprite,a);if(a.spriteBatch.stop(),a.blendModeManager.setBlendMode(this.blendMode),this._mask&&a.maskManager.pushMask(this._mask,a),this._filters&&a.filterManager.pushFilter(this._filterBlock),this.blendMode!==a.spriteBatch.currentBlendMode){a.spriteBatch.currentBlendMode=this.blendMode;var c=b.blendModesWebGL[a.spriteBatch.currentBlendMode];a.spriteBatch.gl.blendFunc(c[0],c[1])}if(this.webGLDirty&&(this.dirty=!0,this.webGLDirty=!1),b.WebGLGraphics.renderGraphics(this,a),this.children.length){a.spriteBatch.start();for(var d=0,e=this.children.length;e>d;d++)this.children[d]._renderWebGL(a);a.spriteBatch.stop()}this._filters&&a.filterManager.popFilter(),this._mask&&a.maskManager.popMask(this.mask,a),a.drawCount++,a.spriteBatch.start()}},b.Graphics.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha&&this.isMask!==!0){if(this._cacheAsBitmap)return(this.dirty||this.cachedSpriteDirty)&&(this._generateCachedSprite(),this.updateCachedSpriteTexture(),this.cachedSpriteDirty=!1,this.dirty=!1),this._cachedSprite.alpha=this.alpha,void b.Sprite.prototype._renderCanvas.call(this._cachedSprite,a);var c=a.context,d=this.worldTransform;this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,c.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]),this._mask&&a.maskManager.pushMask(this._mask,a);var e=a.resolution;c.setTransform(d.a*e,d.b*e,d.c*e,d.d*e,d.tx*e,d.ty*e),b.CanvasGraphics.renderGraphics(this,c);for(var f=0,g=this.children.length;g>f;f++)this.children[f]._renderCanvas(a);this._mask&&a.maskManager.popMask(a)}},b.Graphics.prototype.getBounds=function(a){if(this.isMask)return b.EmptyRectangle;this.dirty&&(this.updateLocalBounds(),this.webGLDirty=!0,this.cachedSpriteDirty=!0,this.dirty=!1);var c=this._localBounds,d=c.x,e=c.width+c.x,f=c.y,g=c.height+c.y,h=a||this.worldTransform,i=h.a,j=h.b,k=h.c,l=h.d,m=h.tx,n=h.ty,o=i*e+k*g+m,p=l*g+j*e+n,q=i*d+k*g+m,r=l*g+j*d+n,s=i*d+k*f+m,t=l*f+j*d+n,u=i*e+k*f+m,v=l*f+j*e+n,w=o,x=p,y=o,z=p;return y=y>q?q:y,y=y>s?s:y,y=y>u?u:y,z=z>r?r:z,z=z>t?t:z,z=z>v?v:z,w=q>w?q:w,w=s>w?s:w,w=u>w?u:w,x=r>x?r:x,x=t>x?t:x,x=v>x?v:x,this._bounds.x=y,this._bounds.width=w-y,this._bounds.y=z,this._bounds.height=x-z,this._bounds},b.Graphics.prototype.updateLocalBounds=function(){var a=1/0,c=-(1/0),d=1/0,e=-(1/0);if(this.graphicsData.length)for(var f,g,h,i,j,k,l=0;l<this.graphicsData.length;l++){var m=this.graphicsData[l],n=m.type,o=m.lineWidth;if(f=m.shape,n===b.Graphics.RECT||n===b.Graphics.RREC)h=f.x-o/2,i=f.y-o/2,j=f.width+o,k=f.height+o,a=a>h?h:a,c=h+j>c?h+j:c,d=d>i?i:d,e=i+k>e?i+k:e;else if(n===b.Graphics.CIRC)h=f.x,i=f.y,j=f.radius+o/2,k=f.radius+o/2,a=a>h-j?h-j:a,c=h+j>c?h+j:c,d=d>i-k?i-k:d,e=i+k>e?i+k:e;else if(n===b.Graphics.ELIP)h=f.x,i=f.y,j=f.width+o/2,k=f.height+o/2,a=a>h-j?h-j:a,c=h+j>c?h+j:c,d=d>i-k?i-k:d,e=i+k>e?i+k:e;else{g=f.points;for(var p=0;p<g.length;p+=2)h=g[p],i=g[p+1],a=a>h-o?h-o:a,c=h+o>c?h+o:c,d=d>i-o?i-o:d,e=i+o>e?i+o:e}}else a=0,c=0,d=0,e=0;var q=this.boundsPadding;this._localBounds.x=a-q,this._localBounds.width=c-a+2*q,this._localBounds.y=d-q,this._localBounds.height=e-d+2*q},b.Graphics.prototype._generateCachedSprite=function(){var a=this.getLocalBounds();if(this._cachedSprite)this._cachedSprite.buffer.resize(a.width,a.height);else{var c=new b.CanvasBuffer(a.width,a.height),d=b.Texture.fromCanvas(c.canvas);this._cachedSprite=new b.Sprite(d),this._cachedSprite.buffer=c,this._cachedSprite.worldTransform=this.worldTransform}this._cachedSprite.anchor.x=-(a.x/a.width),this._cachedSprite.anchor.y=-(a.y/a.height),this._cachedSprite.buffer.context.translate(-a.x,-a.y),this.worldAlpha=1,b.CanvasGraphics.renderGraphics(this,this._cachedSprite.buffer.context),this._cachedSprite.alpha=this.alpha},b.Graphics.prototype.updateCachedSpriteTexture=function(){var a=this._cachedSprite,b=a.texture,c=a.buffer.canvas;b.baseTexture.width=c.width,b.baseTexture.height=c.height,b.crop.width=b.frame.width=c.width,b.crop.height=b.frame.height=c.height,a._width=c.width,a._height=c.height,b.baseTexture.dirty()},b.Graphics.prototype.destroyCachedSprite=function(){this._cachedSprite.texture.destroy(!0),this._cachedSprite=null},b.Graphics.prototype.drawShape=function(a){this.currentPath&&this.currentPath.shape.points.length<=2&&this.graphicsData.pop(),this.currentPath=null;var c=new b.GraphicsData(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,a);return this.graphicsData.push(c),c.type===b.Graphics.POLY&&(c.shape.closed=this.filling,this.currentPath=c),this.dirty=!0,c},b.GraphicsData=function(a,b,c,d,e,f,g){this.lineWidth=a,this.lineColor=b,this.lineAlpha=c,this._lineTint=b,this.fillColor=d,this.fillAlpha=e,this._fillTint=d,this.fill=f,this.shape=g,this.type=g.type},b.Graphics.POLY=0,b.Graphics.RECT=1,b.Graphics.CIRC=2,b.Graphics.ELIP=3,b.Graphics.RREC=4,b.Polygon.prototype.type=b.Graphics.POLY,b.Rectangle.prototype.type=b.Graphics.RECT,b.Circle.prototype.type=b.Graphics.CIRC,b.Ellipse.prototype.type=b.Graphics.ELIP,b.RoundedRectangle.prototype.type=b.Graphics.RREC,b.Strip=function(a){b.DisplayObjectContainer.call(this),this.texture=a,this.uvs=new b.Float32Array([0,1,1,1,1,0,0,1]),this.vertices=new b.Float32Array([0,0,100,0,100,100,0,100]),this.colors=new b.Float32Array([1,1,1,1]),this.indices=new b.Uint16Array([0,1,2,3]),this.dirty=!0,this.blendMode=b.blendModes.NORMAL,this.canvasPadding=0,this.drawMode=b.Strip.DrawModes.TRIANGLE_STRIP},b.Strip.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Strip.prototype.constructor=b.Strip,b.Strip.prototype._renderWebGL=function(a){!this.visible||this.alpha<=0||(a.spriteBatch.stop(),this._vertexBuffer||this._initWebGL(a),a.shaderManager.setShader(a.shaderManager.stripShader),this._renderStrip(a),a.spriteBatch.start())},b.Strip.prototype._initWebGL=function(a){var b=a.gl;this._vertexBuffer=b.createBuffer(),this._indexBuffer=b.createBuffer(),this._uvBuffer=b.createBuffer(),this._colorBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,this._vertexBuffer),b.bufferData(b.ARRAY_BUFFER,this.vertices,b.DYNAMIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,this._uvBuffer),b.bufferData(b.ARRAY_BUFFER,this.uvs,b.STATIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,this._colorBuffer),b.bufferData(b.ARRAY_BUFFER,this.colors,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indexBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,this.indices,b.STATIC_DRAW)},b.Strip.prototype._renderStrip=function(a){var c=a.gl,d=a.projection,e=a.offset,f=a.shaderManager.stripShader,g=this.drawMode===b.Strip.DrawModes.TRIANGLE_STRIP?c.TRIANGLE_STRIP:c.TRIANGLES;a.blendModeManager.setBlendMode(this.blendMode),c.uniformMatrix3fv(f.translationMatrix,!1,this.worldTransform.toArray(!0)),c.uniform2f(f.projectionVector,d.x,-d.y),c.uniform2f(f.offsetVector,-e.x,-e.y),c.uniform1f(f.alpha,this.worldAlpha),this.dirty?(this.dirty=!1,c.bindBuffer(c.ARRAY_BUFFER,this._vertexBuffer),c.bufferData(c.ARRAY_BUFFER,this.vertices,c.STATIC_DRAW),c.vertexAttribPointer(f.aVertexPosition,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this._uvBuffer),c.bufferData(c.ARRAY_BUFFER,this.uvs,c.STATIC_DRAW),c.vertexAttribPointer(f.aTextureCoord,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),this.texture.baseTexture._dirty[c.id]?a.renderer.updateTexture(this.texture.baseTexture):c.bindTexture(c.TEXTURE_2D,this.texture.baseTexture._glTextures[c.id]),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this._indexBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,this.indices,c.STATIC_DRAW)):(c.bindBuffer(c.ARRAY_BUFFER,this._vertexBuffer),c.bufferSubData(c.ARRAY_BUFFER,0,this.vertices),c.vertexAttribPointer(f.aVertexPosition,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this._uvBuffer),c.vertexAttribPointer(f.aTextureCoord,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),this.texture.baseTexture._dirty[c.id]?a.renderer.updateTexture(this.texture.baseTexture):c.bindTexture(c.TEXTURE_2D,this.texture.baseTexture._glTextures[c.id]),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this._indexBuffer)),c.drawElements(g,this.indices.length,c.UNSIGNED_SHORT,0)},b.Strip.prototype._renderCanvas=function(a){var c=a.context,d=this.worldTransform;a.roundPixels?c.setTransform(d.a,d.b,d.c,d.d,0|d.tx,0|d.ty):c.setTransform(d.a,d.b,d.c,d.d,d.tx,d.ty),this.drawMode===b.Strip.DrawModes.TRIANGLE_STRIP?this._renderCanvasTriangleStrip(c):this._renderCanvasTriangles(c)},b.Strip.prototype._renderCanvasTriangleStrip=function(a){var b=this.vertices,c=this.uvs,d=b.length/2;this.count++;for(var e=0;d-2>e;e++){var f=2*e;this._renderCanvasDrawTriangle(a,b,c,f,f+2,f+4)}},b.Strip.prototype._renderCanvasTriangles=function(a){var b=this.vertices,c=this.uvs,d=this.indices,e=d.length;this.count++;for(var f=0;e>f;f+=3){var g=2*d[f],h=2*d[f+1],i=2*d[f+2];this._renderCanvasDrawTriangle(a,b,c,g,h,i)}},b.Strip.prototype._renderCanvasDrawTriangle=function(a,b,c,d,e,f){var g=this.texture.baseTexture.source,h=this.texture.width,i=this.texture.height,j=b[d],k=b[e],l=b[f],m=b[d+1],n=b[e+1],o=b[f+1],p=c[d]*h,q=c[e]*h,r=c[f]*h,s=c[d+1]*i,t=c[e+1]*i,u=c[f+1]*i;if(this.canvasPadding>0){var v=this.canvasPadding/this.worldTransform.a,w=this.canvasPadding/this.worldTransform.d,x=(j+k+l)/3,y=(m+n+o)/3,z=j-x,A=m-y,B=Math.sqrt(z*z+A*A);j=x+z/B*(B+v),m=y+A/B*(B+w),z=k-x,A=n-y,B=Math.sqrt(z*z+A*A),k=x+z/B*(B+v),n=y+A/B*(B+w),z=l-x,A=o-y,B=Math.sqrt(z*z+A*A),l=x+z/B*(B+v),o=y+A/B*(B+w)}a.save(),a.beginPath(),a.moveTo(j,m),a.lineTo(k,n),a.lineTo(l,o),a.closePath(),a.clip();var C=p*t+s*r+q*u-t*r-s*q-p*u,D=j*t+s*l+k*u-t*l-s*k-j*u,E=p*k+j*r+q*l-k*r-j*q-p*l,F=p*t*l+s*k*r+j*q*u-j*t*r-s*q*l-p*k*u,G=m*t+s*o+n*u-t*o-s*n-m*u,H=p*n+m*r+q*o-n*r-m*q-p*o,I=p*t*o+s*n*r+m*q*u-m*t*r-s*q*o-p*n*u;a.transform(D/C,G/C,E/C,H/C,F/C,I/C),a.drawImage(g,0,0),a.restore()},b.Strip.prototype.renderStripFlat=function(a){var b=this.context,c=a.vertices,d=c.length/2;this.count++,b.beginPath();for(var e=1;d-2>e;e++){var f=2*e,g=c[f],h=c[f+2],i=c[f+4],j=c[f+1],k=c[f+3],l=c[f+5];b.moveTo(g,j),b.lineTo(h,k),b.lineTo(i,l)}b.fillStyle="#FF0000",b.fill(),b.closePath()},b.Strip.prototype.onTextureUpdate=function(){this.updateFrame=!0},b.Strip.prototype.getBounds=function(a){for(var c=a||this.worldTransform,d=c.a,e=c.b,f=c.c,g=c.d,h=c.tx,i=c.ty,j=-(1/0),k=-(1/0),l=1/0,m=1/0,n=this.vertices,o=0,p=n.length;p>o;o+=2){var q=n[o],r=n[o+1],s=d*q+f*r+h,t=g*r+e*q+i;l=l>s?s:l,m=m>t?t:m,j=s>j?s:j,k=t>k?t:k}if(l===-(1/0)||k===1/0)return b.EmptyRectangle;var u=this._bounds;return u.x=l,u.width=j-l,u.y=m,u.height=k-m,this._currentBounds=u,u},b.Strip.DrawModes={TRIANGLE_STRIP:0,TRIANGLES:1},b.Rope=function(a,c){b.Strip.call(this,a),this.points=c,this.vertices=new b.Float32Array(4*c.length),this.uvs=new b.Float32Array(4*c.length),this.colors=new b.Float32Array(2*c.length),this.indices=new b.Uint16Array(2*c.length),this.refresh()},b.Rope.prototype=Object.create(b.Strip.prototype),b.Rope.prototype.constructor=b.Rope,b.Rope.prototype.refresh=function(){var a=this.points;if(!(a.length<1)){var b=this.uvs,c=a[0],d=this.indices,e=this.colors;this.count-=.2,b[0]=0,b[1]=0,b[2]=0,b[3]=1,e[0]=1,e[1]=1,d[0]=0,d[1]=1;for(var f,g,h,i=a.length,j=1;i>j;j++)f=a[j],g=4*j,h=j/(i-1),j%2?(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1):(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1),g=2*j,e[g]=1,e[g+1]=1,g=2*j,d[g]=g,d[g+1]=g+1,c=f}},b.Rope.prototype.updateTransform=function(){
var a=this.points;if(!(a.length<1)){var c,d=a[0],e={x:0,y:0};this.count-=.2;for(var f,g,h,i,j,k=this.vertices,l=a.length,m=0;l>m;m++)f=a[m],g=4*m,c=m<a.length-1?a[m+1]:f,e.y=-(c.x-d.x),e.x=c.y-d.y,h=10*(1-m/(l-1)),h>1&&(h=1),i=Math.sqrt(e.x*e.x+e.y*e.y),j=this.texture.height/2,e.x/=i,e.y/=i,e.x*=j,e.y*=j,k[g]=f.x+e.x,k[g+1]=f.y+e.y,k[g+2]=f.x-e.x,k[g+3]=f.y-e.y,d=f;b.DisplayObjectContainer.prototype.updateTransform.call(this)}},b.Rope.prototype.setTexture=function(a){this.texture=a},b.TilingSprite=function(a,c,d){b.Sprite.call(this,a),this._width=c||100,this._height=d||100,this.tileScale=new b.Point(1,1),this.tileScaleOffset=new b.Point(1,1),this.tilePosition=new b.Point(0,0),this.renderable=!0,this.tint=16777215,this.blendMode=b.blendModes.NORMAL},b.TilingSprite.prototype=Object.create(b.Sprite.prototype),b.TilingSprite.prototype.constructor=b.TilingSprite,Object.defineProperty(b.TilingSprite.prototype,"width",{get:function(){return this._width},set:function(a){this._width=a}}),Object.defineProperty(b.TilingSprite.prototype,"height",{get:function(){return this._height},set:function(a){this._height=a}}),b.TilingSprite.prototype.setTexture=function(a){this.texture!==a&&(this.texture=a,this.refreshTexture=!0,this.cachedTint=16777215)},b.TilingSprite.prototype._renderWebGL=function(a){if(this.visible!==!1&&0!==this.alpha){var b,c;for(this._mask&&(a.spriteBatch.stop(),a.maskManager.pushMask(this.mask,a),a.spriteBatch.start()),this._filters&&(a.spriteBatch.flush(),a.filterManager.pushFilter(this._filterBlock)),!this.tilingTexture||this.refreshTexture?(this.generateTilingTexture(!0),this.tilingTexture&&this.tilingTexture.needsUpdate&&(a.renderer.updateTexture(this.tilingTexture.baseTexture),this.tilingTexture.needsUpdate=!1)):a.spriteBatch.renderTilingSprite(this),b=0,c=this.children.length;c>b;b++)this.children[b]._renderWebGL(a);a.spriteBatch.stop(),this._filters&&a.filterManager.popFilter(),this._mask&&a.maskManager.popMask(this._mask,a),a.spriteBatch.start()}},b.TilingSprite.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha){var c=a.context;this._mask&&a.maskManager.pushMask(this._mask,a),c.globalAlpha=this.worldAlpha;var d,e,f=this.worldTransform,g=a.resolution;if(c.setTransform(f.a*g,f.b*g,f.c*g,f.d*g,f.tx*g,f.ty*g),!this.__tilePattern||this.refreshTexture){if(this.generateTilingTexture(!1),!this.tilingTexture)return;this.__tilePattern=c.createPattern(this.tilingTexture.baseTexture.source,"repeat")}this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,c.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]);var h=this.tilePosition,i=this.tileScale;for(h.x%=this.tilingTexture.baseTexture.width,h.y%=this.tilingTexture.baseTexture.height,c.scale(i.x,i.y),c.translate(h.x+this.anchor.x*-this._width,h.y+this.anchor.y*-this._height),c.fillStyle=this.__tilePattern,c.fillRect(-h.x,-h.y,this._width/i.x,this._height/i.y),c.scale(1/i.x,1/i.y),c.translate(-h.x+this.anchor.x*this._width,-h.y+this.anchor.y*this._height),this._mask&&a.maskManager.popMask(a),d=0,e=this.children.length;e>d;d++)this.children[d]._renderCanvas(a)}},b.TilingSprite.prototype.getBounds=function(){var a=this._width,b=this._height,c=a*(1-this.anchor.x),d=a*-this.anchor.x,e=b*(1-this.anchor.y),f=b*-this.anchor.y,g=this.worldTransform,h=g.a,i=g.b,j=g.c,k=g.d,l=g.tx,m=g.ty,n=h*d+j*f+l,o=k*f+i*d+m,p=h*c+j*f+l,q=k*f+i*c+m,r=h*c+j*e+l,s=k*e+i*c+m,t=h*d+j*e+l,u=k*e+i*d+m,v=-(1/0),w=-(1/0),x=1/0,y=1/0;x=x>n?n:x,x=x>p?p:x,x=x>r?r:x,x=x>t?t:x,y=y>o?o:y,y=y>q?q:y,y=y>s?s:y,y=y>u?u:y,v=n>v?n:v,v=p>v?p:v,v=r>v?r:v,v=t>v?t:v,w=o>w?o:w,w=q>w?q:w,w=s>w?s:w,w=u>w?u:w;var z=this._bounds;return z.x=x,z.width=v-x,z.y=y,z.height=w-y,this._currentBounds=z,z},b.TilingSprite.prototype.onTextureUpdate=function(){},b.TilingSprite.prototype.generateTilingTexture=function(a){if(this.texture.baseTexture.hasLoaded){var c,d,e=this.originalTexture||this.texture,f=e.frame,g=f.width!==e.baseTexture.width||f.height!==e.baseTexture.height,h=!1;if(a?(c=b.getNextPowerOfTwo(f.width),d=b.getNextPowerOfTwo(f.height),(f.width!==c||f.height!==d||e.baseTexture.width!==c||e.baseTexture.height||d)&&(h=!0)):g&&(e.trim?(c=e.trim.width,d=e.trim.height):(c=f.width,d=f.height),h=!0),h){var i;this.tilingTexture&&this.tilingTexture.isTiling?(i=this.tilingTexture.canvasBuffer,i.resize(c,d),this.tilingTexture.baseTexture.width=c,this.tilingTexture.baseTexture.height=d,this.tilingTexture.needsUpdate=!0):(i=new b.CanvasBuffer(c,d),this.tilingTexture=b.Texture.fromCanvas(i.canvas),this.tilingTexture.canvasBuffer=i,this.tilingTexture.isTiling=!0),i.context.drawImage(e.baseTexture.source,e.crop.x,e.crop.y,e.crop.width,e.crop.height,0,0,c,d),this.tileScaleOffset.x=f.width/c,this.tileScaleOffset.y=f.height/d}else this.tilingTexture&&this.tilingTexture.isTiling&&this.tilingTexture.destroy(!0),this.tileScaleOffset.x=1,this.tileScaleOffset.y=1,this.tilingTexture=e;this.refreshTexture=!1,this.originalTexture=this.texture,this.texture=this.tilingTexture,this.tilingTexture.baseTexture._powerOf2=!0}},b.TilingSprite.prototype.destroy=function(){b.Sprite.prototype.destroy.call(this),this.tileScale=null,this.tileScaleOffset=null,this.tilePosition=null,this.tilingTexture&&(this.tilingTexture.destroy(!0),this.tilingTexture=null)};var c={radDeg:180/Math.PI,degRad:Math.PI/180,temp:[],Float32Array:"undefined"==typeof Float32Array?Array:Float32Array,Uint16Array:"undefined"==typeof Uint16Array?Array:Uint16Array};c.BoneData=function(a,b){this.name=a,this.parent=b},c.BoneData.prototype={length:0,x:0,y:0,rotation:0,scaleX:1,scaleY:1,inheritScale:!0,inheritRotation:!0,flipX:!1,flipY:!1},c.SlotData=function(a,b){this.name=a,this.boneData=b},c.SlotData.prototype={r:1,g:1,b:1,a:1,attachmentName:null,additiveBlending:!1},c.IkConstraintData=function(a){this.name=a,this.bones=[]},c.IkConstraintData.prototype={target:null,bendDirection:1,mix:1},c.Bone=function(a,b,c){this.data=a,this.skeleton=b,this.parent=c,this.setToSetupPose()},c.Bone.yDown=!1,c.Bone.prototype={x:0,y:0,rotation:0,rotationIK:0,scaleX:1,scaleY:1,flipX:!1,flipY:!1,m00:0,m01:0,worldX:0,m10:0,m11:0,worldY:0,worldRotation:0,worldScaleX:1,worldScaleY:1,worldFlipX:!1,worldFlipY:!1,updateWorldTransform:function(){var a=this.parent;if(a)this.worldX=this.x*a.m00+this.y*a.m01+a.worldX,this.worldY=this.x*a.m10+this.y*a.m11+a.worldY,this.data.inheritScale?(this.worldScaleX=a.worldScaleX*this.scaleX,this.worldScaleY=a.worldScaleY*this.scaleY):(this.worldScaleX=this.scaleX,this.worldScaleY=this.scaleY),this.worldRotation=this.data.inheritRotation?a.worldRotation+this.rotationIK:this.rotationIK,this.worldFlipX=a.worldFlipX!=this.flipX,this.worldFlipY=a.worldFlipY!=this.flipY;else{var b=this.skeleton.flipX,d=this.skeleton.flipY;this.worldX=b?-this.x:this.x,this.worldY=d!=c.Bone.yDown?-this.y:this.y,this.worldScaleX=this.scaleX,this.worldScaleY=this.scaleY,this.worldRotation=this.rotationIK,this.worldFlipX=b!=this.flipX,this.worldFlipY=d!=this.flipY}var e=this.worldRotation*c.degRad,f=Math.cos(e),g=Math.sin(e);this.worldFlipX?(this.m00=-f*this.worldScaleX,this.m01=g*this.worldScaleY):(this.m00=f*this.worldScaleX,this.m01=-g*this.worldScaleY),this.worldFlipY!=c.Bone.yDown?(this.m10=-g*this.worldScaleX,this.m11=-f*this.worldScaleY):(this.m10=g*this.worldScaleX,this.m11=f*this.worldScaleY)},setToSetupPose:function(){var a=this.data;this.x=a.x,this.y=a.y,this.rotation=a.rotation,this.rotationIK=this.rotation,this.scaleX=a.scaleX,this.scaleY=a.scaleY,this.flipX=a.flipX,this.flipY=a.flipY},worldToLocal:function(a){var b=a[0]-this.worldX,d=a[1]-this.worldY,e=this.m00,f=this.m10,g=this.m01,h=this.m11;this.worldFlipX!=(this.worldFlipY!=c.Bone.yDown)&&(e=-e,h=-h);var i=1/(e*h-g*f);a[0]=b*e*i-d*g*i,a[1]=d*h*i-b*f*i},localToWorld:function(a){var b=a[0],c=a[1];a[0]=b*this.m00+c*this.m01+this.worldX,a[1]=b*this.m10+c*this.m11+this.worldY}},c.Slot=function(a,b){this.data=a,this.bone=b,this.setToSetupPose()},c.Slot.prototype={r:1,g:1,b:1,a:1,_attachmentTime:0,attachment:null,attachmentVertices:[],setAttachment:function(a){this.attachment=a,this._attachmentTime=this.bone.skeleton.time,this.attachmentVertices.length=0},setAttachmentTime:function(a){this._attachmentTime=this.bone.skeleton.time-a},getAttachmentTime:function(){return this.bone.skeleton.time-this._attachmentTime},setToSetupPose:function(){var a=this.data;this.r=a.r,this.g=a.g,this.b=a.b,this.a=a.a;for(var b=this.bone.skeleton.data.slots,c=0,d=b.length;d>c;c++)if(b[c]==a){this.setAttachment(a.attachmentName?this.bone.skeleton.getAttachmentBySlotIndex(c,a.attachmentName):null);break}}},c.IkConstraint=function(a,b){this.data=a,this.mix=a.mix,this.bendDirection=a.bendDirection,this.bones=[];for(var c=0,d=a.bones.length;d>c;c++)this.bones.push(b.findBone(a.bones[c].name));this.target=b.findBone(a.target.name)},c.IkConstraint.prototype={apply:function(){var a=this.target,b=this.bones;switch(b.length){case 1:c.IkConstraint.apply1(b[0],a.worldX,a.worldY,this.mix);break;case 2:c.IkConstraint.apply2(b[0],b[1],a.worldX,a.worldY,this.bendDirection,this.mix)}}},c.IkConstraint.apply1=function(a,b,d,e){var f=a.data.inheritRotation&&a.parent?a.parent.worldRotation:0,g=a.rotation,h=Math.atan2(d-a.worldY,b-a.worldX)*c.radDeg-f;a.rotationIK=g+(h-g)*e},c.IkConstraint.apply2=function(a,b,d,e,f,g){var h=b.rotation,i=a.rotation;if(!g)return b.rotationIK=h,void(a.rotationIK=i);var j,k,l=c.temp,m=a.parent;m?(l[0]=d,l[1]=e,m.worldToLocal(l),d=(l[0]-a.x)*m.worldScaleX,e=(l[1]-a.y)*m.worldScaleY):(d-=a.x,e-=a.y),b.parent==a?(j=b.x,k=b.y):(l[0]=b.x,l[1]=b.y,b.parent.localToWorld(l),a.worldToLocal(l),j=l[0],k=l[1]);var n=j*a.worldScaleX,o=k*a.worldScaleY,p=Math.atan2(o,n),q=Math.sqrt(n*n+o*o),r=b.data.length*b.worldScaleX,s=2*q*r;if(1e-4>s)return void(b.rotationIK=h+(Math.atan2(e,d)*c.radDeg-i-h)*g);var t=(d*d+e*e-q*q-r*r)/s;-1>t?t=-1:t>1&&(t=1);var u=Math.acos(t)*f,v=q+r*t,w=r*Math.sin(u),x=Math.atan2(e*v-d*w,d*v+e*w),y=(x-p)*c.radDeg-i;y>180?y-=360:-180>y&&(y+=360),a.rotationIK=i+y*g,y=(u+p)*c.radDeg-h,y>180?y-=360:-180>y&&(y+=360),b.rotationIK=h+(y+a.worldRotation-b.parent.worldRotation)*g},c.Skin=function(a){this.name=a,this.attachments={}},c.Skin.prototype={addAttachment:function(a,b,c){this.attachments[a+":"+b]=c},getAttachment:function(a,b){return this.attachments[a+":"+b]},_attachAll:function(a,b){for(var c in b.attachments){var d=c.indexOf(":"),e=parseInt(c.substring(0,d)),f=c.substring(d+1),g=a.slots[e];if(g.attachment&&g.attachment.name==f){var h=this.getAttachment(e,f);h&&g.setAttachment(h)}}}},c.Animation=function(a,b,c){this.name=a,this.timelines=b,this.duration=c},c.Animation.prototype={apply:function(a,b,c,d,e){d&&0!=this.duration&&(c%=this.duration,b%=this.duration);for(var f=this.timelines,g=0,h=f.length;h>g;g++)f[g].apply(a,b,c,e,1)},mix:function(a,b,c,d,e,f){d&&0!=this.duration&&(c%=this.duration,b%=this.duration);for(var g=this.timelines,h=0,i=g.length;i>h;h++)g[h].apply(a,b,c,e,f)}},c.Animation.binarySearch=function(a,b,c){var d=0,e=Math.floor(a.length/c)-2;if(!e)return c;for(var f=e>>>1;;){if(a[(f+1)*c]<=b?d=f+1:e=f,d==e)return(d+1)*c;f=d+e>>>1}},c.Animation.binarySearch1=function(a,b){var c=0,d=a.length-2;if(!d)return 1;for(var e=d>>>1;;){if(a[e+1]<=b?c=e+1:d=e,c==d)return c+1;e=c+d>>>1}},c.Animation.linearSearch=function(a,b,c){for(var d=0,e=a.length-c;e>=d;d+=c)if(a[d]>b)return d;return-1},c.Curves=function(){this.curves=[]},c.Curves.prototype={setLinear:function(a){this.curves[19*a]=0},setStepped:function(a){this.curves[19*a]=1},setCurve:function(a,b,c,d,e){var f=.1,g=f*f,h=g*f,i=3*f,j=3*g,k=6*g,l=6*h,m=2*-b+d,n=2*-c+e,o=3*(b-d)+1,p=3*(c-e)+1,q=b*i+m*j+o*h,r=c*i+n*j+p*h,s=m*k+o*l,t=n*k+p*l,u=o*l,v=p*l,w=19*a,x=this.curves;x[w++]=2;for(var y=q,z=r,A=w+19-1;A>w;w+=2)x[w]=y,x[w+1]=z,q+=s,r+=t,s+=u,t+=v,y+=q,z+=r},getCurvePercent:function(a,b){b=0>b?0:b>1?1:b;var c=this.curves,d=19*a,e=c[d];if(0===e)return b;if(1==e)return 0;d++;for(var f=0,g=d,h=d+19-1;h>d;d+=2)if(f=c[d],f>=b){var i,j;return d==g?(i=0,j=0):(i=c[d-2],j=c[d-1]),j+(c[d+1]-j)*(b-i)/(f-i)}var k=c[d-1];return k+(1-k)*(b-f)/(1-f)}},c.RotateTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=2*a},c.RotateTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/2},setFrame:function(a,b,c){a*=2,this.frames[a]=b,this.frames[a+1]=c},apply:function(a,b,d,e,f){var g=this.frames;if(!(d<g[0])){var h=a.bones[this.boneIndex];if(d>=g[g.length-2]){for(var i=h.data.rotation+g[g.length-1]-h.rotation;i>180;)i-=360;for(;-180>i;)i+=360;return void(h.rotation+=i*f)}var j=c.Animation.binarySearch(g,d,2),k=g[j-1],l=g[j],m=1-(d-l)/(g[j-2]-l);m=this.curves.getCurvePercent(j/2-1,m);for(var i=g[j+1]-k;i>180;)i-=360;for(;-180>i;)i+=360;for(i=h.data.rotation+(k+i*m)-h.rotation;i>180;)i-=360;for(;-180>i;)i+=360;h.rotation+=i*f}}},c.TranslateTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=3*a},c.TranslateTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/3},setFrame:function(a,b,c,d){a*=3,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d},apply:function(a,b,d,e,f){var g=this.frames;if(!(d<g[0])){var h=a.bones[this.boneIndex];if(d>=g[g.length-3])return h.x+=(h.data.x+g[g.length-2]-h.x)*f,void(h.y+=(h.data.y+g[g.length-1]-h.y)*f);var i=c.Animation.binarySearch(g,d,3),j=g[i-2],k=g[i-1],l=g[i],m=1-(d-l)/(g[i+-3]-l);m=this.curves.getCurvePercent(i/3-1,m),h.x+=(h.data.x+j+(g[i+1]-j)*m-h.x)*f,h.y+=(h.data.y+k+(g[i+2]-k)*m-h.y)*f}}},c.ScaleTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=3*a},c.ScaleTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/3},setFrame:function(a,b,c,d){a*=3,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d},apply:function(a,b,d,e,f){var g=this.frames;if(!(d<g[0])){var h=a.bones[this.boneIndex];if(d>=g[g.length-3])return h.scaleX+=(h.data.scaleX*g[g.length-2]-h.scaleX)*f,void(h.scaleY+=(h.data.scaleY*g[g.length-1]-h.scaleY)*f);var i=c.Animation.binarySearch(g,d,3),j=g[i-2],k=g[i-1],l=g[i],m=1-(d-l)/(g[i+-3]-l);m=this.curves.getCurvePercent(i/3-1,m),h.scaleX+=(h.data.scaleX*(j+(g[i+1]-j)*m)-h.scaleX)*f,h.scaleY+=(h.data.scaleY*(k+(g[i+2]-k)*m)-h.scaleY)*f}}},c.ColorTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=5*a},c.ColorTimeline.prototype={slotIndex:0,getFrameCount:function(){return this.frames.length/5},setFrame:function(a,b,c,d,e,f){a*=5,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d,this.frames[a+3]=e,this.frames[a+4]=f},apply:function(a,b,d,e,f){var g=this.frames;if(!(d<g[0])){var h,i,j,k;if(d>=g[g.length-5]){var l=g.length-1;h=g[l-3],i=g[l-2],j=g[l-1],k=g[l]}else{var m=c.Animation.binarySearch(g,d,5),n=g[m-4],o=g[m-3],p=g[m-2],q=g[m-1],r=g[m],s=1-(d-r)/(g[m-5]-r);s=this.curves.getCurvePercent(m/5-1,s),h=n+(g[m+1]-n)*s,i=o+(g[m+2]-o)*s,j=p+(g[m+3]-p)*s,k=q+(g[m+4]-q)*s}var t=a.slots[this.slotIndex];1>f?(t.r+=(h-t.r)*f,t.g+=(i-t.g)*f,t.b+=(j-t.b)*f,t.a+=(k-t.a)*f):(t.r=h,t.g=i,t.b=j,t.a=k)}}},c.AttachmentTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=a,this.attachmentNames=[],this.attachmentNames.length=a},c.AttachmentTimeline.prototype={slotIndex:0,getFrameCount:function(){return this.frames.length},setFrame:function(a,b,c){this.frames[a]=b,this.attachmentNames[a]=c},apply:function(a,b,d){var e=this.frames;if(d<e[0])return void(b>d&&this.apply(a,b,Number.MAX_VALUE,null,0));b>d&&(b=-1);var f=d>=e[e.length-1]?e.length-1:c.Animation.binarySearch1(e,d)-1;if(!(e[f]<b)){var g=this.attachmentNames[f];a.slots[this.slotIndex].setAttachment(g?a.getAttachmentBySlotIndex(this.slotIndex,g):null)}}},c.EventTimeline=function(a){this.frames=[],this.frames.length=a,this.events=[],this.events.length=a},c.EventTimeline.prototype={getFrameCount:function(){return this.frames.length},setFrame:function(a,b,c){this.frames[a]=b,this.events[a]=c},apply:function(a,b,d,e,f){if(e){var g=this.frames,h=g.length;if(b>d)this.apply(a,b,Number.MAX_VALUE,e,f),b=-1;else if(b>=g[h-1])return;if(!(d<g[0])){var i;if(b<g[0])i=0;else{i=c.Animation.binarySearch1(g,b);for(var j=g[i];i>0&&g[i-1]==j;)i--}for(var k=this.events;h>i&&d>=g[i];i++)e.push(k[i])}}}},c.DrawOrderTimeline=function(a){this.frames=[],this.frames.length=a,this.drawOrders=[],this.drawOrders.length=a},c.DrawOrderTimeline.prototype={getFrameCount:function(){return this.frames.length},setFrame:function(a,b,c){this.frames[a]=b,this.drawOrders[a]=c},apply:function(a,b,d){var e=this.frames;if(!(d<e[0])){var f;f=d>=e[e.length-1]?e.length-1:c.Animation.binarySearch1(e,d)-1;var g=a.drawOrder,h=(a.slots,this.drawOrders[f]);if(h)for(var i=0,j=h.length;j>i;i++)g[i]=h[i]}}},c.FfdTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=a,this.frameVertices=[],this.frameVertices.length=a},c.FfdTimeline.prototype={slotIndex:0,attachment:0,getFrameCount:function(){return this.frames.length},setFrame:function(a,b,c){this.frames[a]=b,this.frameVertices[a]=c},apply:function(a,b,d,e,f){var g=a.slots[this.slotIndex];if(g.attachment==this.attachment){var h=this.frames;if(!(d<h[0])){var i=this.frameVertices,j=i[0].length,k=g.attachmentVertices;if(k.length!=j&&(f=1),k.length=j,d>=h[h.length-1]){var l=i[h.length-1];if(1>f)for(var m=0;j>m;m++)k[m]+=(l[m]-k[m])*f;else for(var m=0;j>m;m++)k[m]=l[m]}else{var n=c.Animation.binarySearch1(h,d),o=h[n],p=1-(d-o)/(h[n-1]-o);p=this.curves.getCurvePercent(n-1,0>p?0:p>1?1:p);var q=i[n-1],r=i[n];if(1>f)for(var m=0;j>m;m++){var s=q[m];k[m]+=(s+(r[m]-s)*p-k[m])*f}else for(var m=0;j>m;m++){var s=q[m];k[m]=s+(r[m]-s)*p}}}}}},c.IkConstraintTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=3*a},c.IkConstraintTimeline.prototype={ikConstraintIndex:0,getFrameCount:function(){return this.frames.length/3},setFrame:function(a,b,c,d){a*=3,this.frames[a]=b,this.frames[a+1]=c,this.frames[a+2]=d},apply:function(a,b,d,e,f){var g=this.frames;if(!(d<g[0])){var h=a.ikConstraints[this.ikConstraintIndex];if(d>=g[g.length-3])return h.mix+=(g[g.length-2]-h.mix)*f,void(h.bendDirection=g[g.length-1]);var i=c.Animation.binarySearch(g,d,3),j=g[i+-2],k=g[i],l=1-(d-k)/(g[i+-3]-k);l=this.curves.getCurvePercent(i/3-1,l);var m=j+(g[i+1]-j)*l;h.mix+=(m-h.mix)*f,h.bendDirection=g[i+-1]}}},c.FlipXTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=2*a},c.FlipXTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/2},setFrame:function(a,b,c){a*=2,this.frames[a]=b,this.frames[a+1]=c?1:0},apply:function(a,b,d){var e=this.frames;if(d<e[0])return void(b>d&&this.apply(a,b,Number.MAX_VALUE,null,0));b>d&&(b=-1);var f=(d>=e[e.length-2]?e.length:c.Animation.binarySearch(e,d,2))-2;e[f]<b||(a.bones[boneIndex].flipX=0!=e[f+1])}},c.FlipYTimeline=function(a){this.curves=new c.Curves(a),this.frames=[],this.frames.length=2*a},c.FlipYTimeline.prototype={boneIndex:0,getFrameCount:function(){return this.frames.length/2},setFrame:function(a,b,c){a*=2,this.frames[a]=b,this.frames[a+1]=c?1:0},apply:function(a,b,d){var e=this.frames;if(d<e[0])return void(b>d&&this.apply(a,b,Number.MAX_VALUE,null,0));b>d&&(b=-1);var f=(d>=e[e.length-2]?e.length:c.Animation.binarySearch(e,d,2))-2;e[f]<b||(a.bones[boneIndex].flipY=0!=e[f+1])}},c.SkeletonData=function(){this.bones=[],this.slots=[],this.skins=[],this.events=[],this.animations=[],this.ikConstraints=[]},c.SkeletonData.prototype={name:null,defaultSkin:null,width:0,height:0,version:null,hash:null,findBone:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},findBoneIndex:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].name==a)return c;return-1},findSlot:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].name==a)return slot[c];return null},findSlotIndex:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].name==a)return c;return-1},findSkin:function(a){for(var b=this.skins,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},findEvent:function(a){for(var b=this.events,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},findAnimation:function(a){for(var b=this.animations,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},findIkConstraint:function(a){for(var b=this.ikConstraints,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null}},c.Skeleton=function(a){this.data=a,this.bones=[];for(var b=0,d=a.bones.length;d>b;b++){var e=a.bones[b],f=e.parent?this.bones[a.bones.indexOf(e.parent)]:null;this.bones.push(new c.Bone(e,this,f))}this.slots=[],this.drawOrder=[];for(var b=0,d=a.slots.length;d>b;b++){var g=a.slots[b],h=this.bones[a.bones.indexOf(g.boneData)],i=new c.Slot(g,h);this.slots.push(i),this.drawOrder.push(b)}this.ikConstraints=[];for(var b=0,d=a.ikConstraints.length;d>b;b++)this.ikConstraints.push(new c.IkConstraint(a.ikConstraints[b],this));this.boneCache=[],this.updateCache()},c.Skeleton.prototype={x:0,y:0,skin:null,r:1,g:1,b:1,a:1,time:0,flipX:!1,flipY:!1,updateCache:function(){var a=this.ikConstraints,b=a.length,c=b+1,d=this.boneCache;d.length>c&&(d.length=c);for(var e=0,f=d.length;f>e;e++)d[e].length=0;for(;d.length<c;)d[d.length]=[];var g=d[0],h=this.bones;a:for(var e=0,f=h.length;f>e;e++){var i=h[e],j=i;do{for(var k=0;b>k;k++)for(var l=a[k],m=l.bones[0],n=l.bones[l.bones.length-1];;){if(j==n){d[k].push(i),d[k+1].push(i);continue a}if(n==m)break;n=n.parent}j=j.parent}while(j);g[g.length]=i}},updateWorldTransform:function(){for(var a=this.bones,b=0,c=a.length;c>b;b++){var d=a[b];d.rotationIK=d.rotation}for(var b=0,e=this.boneCache.length-1;;){for(var f=this.boneCache[b],g=0,h=f.length;h>g;g++)f[g].updateWorldTransform();if(b==e)break;this.ikConstraints[b].apply(),b++}},setToSetupPose:function(){this.setBonesToSetupPose(),this.setSlotsToSetupPose()},setBonesToSetupPose:function(){for(var a=this.bones,b=0,c=a.length;c>b;b++)a[b].setToSetupPose();for(var d=this.ikConstraints,b=0,c=d.length;c>b;b++){var e=d[b];e.bendDirection=e.data.bendDirection,e.mix=e.data.mix}},setSlotsToSetupPose:function(){for(var a=this.slots,b=0,c=a.length;c>b;b++)a[b].setToSetupPose(b);this.resetDrawOrder()},getRootBone:function(){return this.bones.length?this.bones[0]:null},findBone:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return b[c];return null},findBoneIndex:function(a){for(var b=this.bones,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return c;return-1},findSlot:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return b[c];return null},findSlotIndex:function(a){for(var b=this.slots,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return c;return-1},setSkinByName:function(a){var b=this.data.findSkin(a);if(!b)throw"Skin not found: "+a;this.setSkin(b)},setSkin:function(a){if(a)if(this.skin)a._attachAll(this,this.skin);else for(var b=this.slots,c=0,d=b.length;d>c;c++){var e=b[c],f=e.data.attachmentName;if(f){var g=a.getAttachment(c,f);g&&e.setAttachment(g)}}this.skin=a},getAttachmentBySlotName:function(a,b){return this.getAttachmentBySlotIndex(this.data.findSlotIndex(a),b)},getAttachmentBySlotIndex:function(a,b){if(this.skin){var c=this.skin.getAttachment(a,b);if(c)return c}return this.data.defaultSkin?this.data.defaultSkin.getAttachment(a,b):null},setAttachment:function(a,b){for(var c=this.slots,d=0,e=c.length;e>d;d++){var f=c[d];if(f.data.name==a){var g=null;if(b&&(g=this.getAttachmentBySlotIndex(d,b),!g))throw"Attachment not found: "+b+", for slot: "+a;return void f.setAttachment(g)}}throw"Slot not found: "+a},findIkConstraint:function(a){for(var b=this.ikConstraints,c=0,d=b.length;d>c;c++)if(b[c].data.name==a)return b[c];return null},update:function(a){this.time+=a},resetDrawOrder:function(){for(var a=0,b=this.drawOrder.length;b>a;a++)this.drawOrder[a]=a}},c.EventData=function(a){this.name=a},c.EventData.prototype={intValue:0,floatValue:0,stringValue:null},c.Event=function(a){this.data=a},c.Event.prototype={intValue:0,floatValue:0,stringValue:null},c.AttachmentType={region:0,boundingbox:1,mesh:2,skinnedmesh:3},c.RegionAttachment=function(a){this.name=a,this.offset=[],this.offset.length=8,this.uvs=[],this.uvs.length=8},c.RegionAttachment.prototype={type:c.AttachmentType.region,x:0,y:0,rotation:0,scaleX:1,scaleY:1,width:0,height:0,r:1,g:1,b:1,a:1,path:null,rendererObject:null,regionOffsetX:0,regionOffsetY:0,regionWidth:0,regionHeight:0,regionOriginalWidth:0,regionOriginalHeight:0,setUVs:function(a,b,c,d,e){var f=this.uvs;e?(f[2]=a,f[3]=d,f[4]=a,f[5]=b,f[6]=c,f[7]=b,f[0]=c,f[1]=d):(f[0]=a,f[1]=d,f[2]=a,f[3]=b,f[4]=c,f[5]=b,f[6]=c,f[7]=d)},updateOffset:function(){var a=this.width/this.regionOriginalWidth*this.scaleX,b=this.height/this.regionOriginalHeight*this.scaleY,d=-this.width/2*this.scaleX+this.regionOffsetX*a,e=-this.height/2*this.scaleY+this.regionOffsetY*b,f=d+this.regionWidth*a,g=e+this.regionHeight*b,h=this.rotation*c.degRad,i=Math.cos(h),j=Math.sin(h),k=d*i+this.x,l=d*j,m=e*i+this.y,n=e*j,o=f*i+this.x,p=f*j,q=g*i+this.y,r=g*j,s=this.offset;s[0]=k-n,s[1]=m+l,s[2]=k-r,s[3]=q+l,s[4]=o-r,s[5]=q+p,s[6]=o-n,s[7]=m+p},computeVertices:function(a,b,c,d){a+=c.worldX,b+=c.worldY;var e=c.m00,f=c.m01,g=c.m10,h=c.m11,i=this.offset;d[0]=i[0]*e+i[1]*f+a,d[1]=i[0]*g+i[1]*h+b,d[2]=i[2]*e+i[3]*f+a,d[3]=i[2]*g+i[3]*h+b,d[4]=i[4]*e+i[5]*f+a,d[5]=i[4]*g+i[5]*h+b,d[6]=i[6]*e+i[7]*f+a,d[7]=i[6]*g+i[7]*h+b}},c.MeshAttachment=function(a){this.name=a},c.MeshAttachment.prototype={type:c.AttachmentType.mesh,vertices:null,uvs:null,regionUVs:null,triangles:null,hullLength:0,r:1,g:1,b:1,a:1,path:null,rendererObject:null,regionU:0,regionV:0,regionU2:0,regionV2:0,regionRotate:!1,regionOffsetX:0,regionOffsetY:0,regionWidth:0,regionHeight:0,regionOriginalWidth:0,regionOriginalHeight:0,edges:null,width:0,height:0,updateUVs:function(){var a=this.regionU2-this.regionU,b=this.regionV2-this.regionV,d=this.regionUVs.length;if(this.uvs&&this.uvs.length==d||(this.uvs=new c.Float32Array(d)),this.regionRotate)for(var e=0;d>e;e+=2)this.uvs[e]=this.regionU+this.regionUVs[e+1]*a,this.uvs[e+1]=this.regionV+b-this.regionUVs[e]*b;else for(var e=0;d>e;e+=2)this.uvs[e]=this.regionU+this.regionUVs[e]*a,this.uvs[e+1]=this.regionV+this.regionUVs[e+1]*b},computeWorldVertices:function(a,b,c,d){var e=c.bone;a+=e.worldX,b+=e.worldY;var f=e.m00,g=e.m01,h=e.m10,i=e.m11,j=this.vertices,k=j.length;c.attachmentVertices.length==k&&(j=c.attachmentVertices);for(var l=0;k>l;l+=2){var m=j[l],n=j[l+1];d[l]=m*f+n*g+a,d[l+1]=m*h+n*i+b}}},c.SkinnedMeshAttachment=function(a){this.name=a},c.SkinnedMeshAttachment.prototype={type:c.AttachmentType.skinnedmesh,bones:null,weights:null,uvs:null,regionUVs:null,triangles:null,hullLength:0,r:1,g:1,b:1,a:1,path:null,rendererObject:null,regionU:0,regionV:0,regionU2:0,regionV2:0,regionRotate:!1,regionOffsetX:0,regionOffsetY:0,regionWidth:0,regionHeight:0,regionOriginalWidth:0,regionOriginalHeight:0,edges:null,width:0,height:0,updateUVs:function(){var a=this.regionU2-this.regionU,b=this.regionV2-this.regionV,d=this.regionUVs.length;if(this.uvs&&this.uvs.length==d||(this.uvs=new c.Float32Array(d)),this.regionRotate)for(var e=0;d>e;e+=2)this.uvs[e]=this.regionU+this.regionUVs[e+1]*a,this.uvs[e+1]=this.regionV+b-this.regionUVs[e]*b;else for(var e=0;d>e;e+=2)this.uvs[e]=this.regionU+this.regionUVs[e]*a,this.uvs[e+1]=this.regionV+this.regionUVs[e+1]*b},computeWorldVertices:function(a,b,c,d){var e,f,g,h,i,j,k,l=c.bone.skeleton.bones,m=this.weights,n=this.bones,o=0,p=0,q=0,r=0,s=n.length;if(c.attachmentVertices.length)for(var t=c.attachmentVertices;s>p;o+=2){for(f=0,g=0,e=n[p++]+p;e>p;p++,q+=3,r+=2)h=l[n[p]],i=m[q]+t[r],j=m[q+1]+t[r+1],k=m[q+2],f+=(i*h.m00+j*h.m01+h.worldX)*k,g+=(i*h.m10+j*h.m11+h.worldY)*k;d[o]=f+a,d[o+1]=g+b}else for(;s>p;o+=2){for(f=0,g=0,e=n[p++]+p;e>p;p++,q+=3)h=l[n[p]],i=m[q],j=m[q+1],k=m[q+2],f+=(i*h.m00+j*h.m01+h.worldX)*k,g+=(i*h.m10+j*h.m11+h.worldY)*k;d[o]=f+a,d[o+1]=g+b}}},c.BoundingBoxAttachment=function(a){this.name=a,this.vertices=[]},c.BoundingBoxAttachment.prototype={type:c.AttachmentType.boundingbox,computeWorldVertices:function(a,b,c,d){a+=c.worldX,b+=c.worldY;for(var e=c.m00,f=c.m01,g=c.m10,h=c.m11,i=this.vertices,j=0,k=i.length;k>j;j+=2){var l=i[j],m=i[j+1];d[j]=l*e+m*f+a,d[j+1]=l*g+m*h+b}}},c.AnimationStateData=function(a){this.skeletonData=a,this.animationToMixTime={}},c.AnimationStateData.prototype={defaultMix:0,setMixByName:function(a,b,c){var d=this.skeletonData.findAnimation(a);if(!d)throw"Animation not found: "+a;var e=this.skeletonData.findAnimation(b);if(!e)throw"Animation not found: "+b;this.setMix(d,e,c)},setMix:function(a,b,c){this.animationToMixTime[a.name+":"+b.name]=c},getMix:function(a,b){var c=a.name+":"+b.name;return this.animationToMixTime.hasOwnProperty(c)?this.animationToMixTime[c]:this.defaultMix}},c.TrackEntry=function(){},c.TrackEntry.prototype={next:null,previous:null,animation:null,loop:!1,delay:0,time:0,lastTime:-1,endTime:0,timeScale:1,mixTime:0,mixDuration:0,mix:1,onStart:null,onEnd:null,onComplete:null,onEvent:null},c.AnimationState=function(a){this.data=a,this.tracks=[],this.events=[]},c.AnimationState.prototype={onStart:null,onEnd:null,onComplete:null,onEvent:null,timeScale:1,update:function(a){a*=this.timeScale;for(var b=0;b<this.tracks.length;b++){var c=this.tracks[b];if(c){if(c.time+=a*c.timeScale,c.previous){var d=a*c.previous.timeScale;c.previous.time+=d,c.mixTime+=d}var e=c.next;e?(e.time=c.lastTime-e.delay,e.time>=0&&this.setCurrent(b,e)):!c.loop&&c.lastTime>=c.endTime&&this.clearTrack(b)}}},apply:function(a){a.resetDrawOrder();for(var b=0;b<this.tracks.length;b++){var c=this.tracks[b];if(c){this.events.length=0;var d=c.time,e=c.lastTime,f=c.endTime,g=c.loop;!g&&d>f&&(d=f);var h=c.previous;if(h){var i=h.time;!h.loop&&i>h.endTime&&(i=h.endTime),h.animation.apply(a,i,i,h.loop,null);var j=c.mixTime/c.mixDuration*c.mix;j>=1&&(j=1,c.previous=null),c.animation.mix(a,c.lastTime,d,g,this.events,j)}else 1==c.mix?c.animation.apply(a,c.lastTime,d,g,this.events):c.animation.mix(a,c.lastTime,d,g,this.events,c.mix);for(var k=0,l=this.events.length;l>k;k++){var m=this.events[k];c.onEvent&&c.onEvent(b,m),this.onEvent&&this.onEvent(b,m)}if(g?e%f>d%f:f>e&&d>=f){var n=Math.floor(d/f);c.onComplete&&c.onComplete(b,n),this.onComplete&&this.onComplete(b,n)}c.lastTime=c.time}}},clearTracks:function(){for(var a=0,b=this.tracks.length;b>a;a++)this.clearTrack(a);this.tracks.length=0},clearTrack:function(a){if(!(a>=this.tracks.length)){var b=this.tracks[a];b&&(b.onEnd&&b.onEnd(a),this.onEnd&&this.onEnd(a),this.tracks[a]=null)}},_expandToIndex:function(a){if(a<this.tracks.length)return this.tracks[a];for(;a>=this.tracks.length;)this.tracks.push(null);return null},setCurrent:function(a,b){var c=this._expandToIndex(a);if(c){var d=c.previous;c.previous=null,c.onEnd&&c.onEnd(a),this.onEnd&&this.onEnd(a),b.mixDuration=this.data.getMix(c.animation,b.animation),b.mixDuration>0&&(b.mixTime=0,b.previous=d&&c.mixTime/c.mixDuration<.5?d:c)}this.tracks[a]=b,b.onStart&&b.onStart(a),this.onStart&&this.onStart(a)},setAnimationByName:function(a,b,c){var d=this.data.skeletonData.findAnimation(b);if(!d)throw"Animation not found: "+b;return this.setAnimation(a,d,c)},setAnimation:function(a,b,d){var e=new c.TrackEntry;return e.animation=b,e.loop=d,e.endTime=b.duration,this.setCurrent(a,e),e},addAnimationByName:function(a,b,c,d){var e=this.data.skeletonData.findAnimation(b);if(!e)throw"Animation not found: "+b;return this.addAnimation(a,e,c,d)},addAnimation:function(a,b,d,e){var f=new c.TrackEntry;f.animation=b,f.loop=d,f.endTime=b.duration;var g=this._expandToIndex(a);if(g){for(;g.next;)g=g.next;g.next=f}else this.tracks[a]=f;return 0>=e&&(g?e+=g.endTime-this.data.getMix(g.animation,b):e=0),f.delay=e,f},getCurrent:function(a){return a>=this.tracks.length?null:this.tracks[a]}},c.SkeletonJson=function(a){this.attachmentLoader=a},c.SkeletonJson.prototype={scale:1,readSkeletonData:function(a,b){var d=new c.SkeletonData;d.name=b;var e=a.skeleton;e&&(d.hash=e.hash,d.version=e.spine,d.width=e.width||0,d.height=e.height||0);for(var f=a.bones,g=0,h=f.length;h>g;g++){
var i=f[g],j=null;if(i.parent&&(j=d.findBone(i.parent),!j))throw"Parent bone not found: "+i.parent;var k=new c.BoneData(i.name,j);k.length=(i.length||0)*this.scale,k.x=(i.x||0)*this.scale,k.y=(i.y||0)*this.scale,k.rotation=i.rotation||0,k.scaleX=i.hasOwnProperty("scaleX")?i.scaleX:1,k.scaleY=i.hasOwnProperty("scaleY")?i.scaleY:1,k.inheritScale=i.hasOwnProperty("inheritScale")?i.inheritScale:!0,k.inheritRotation=i.hasOwnProperty("inheritRotation")?i.inheritRotation:!0,d.bones.push(k)}var l=a.ik;if(l)for(var g=0,h=l.length;h>g;g++){for(var m=l[g],n=new c.IkConstraintData(m.name),f=m.bones,o=0,p=f.length;p>o;o++){var q=d.findBone(f[o]);if(!q)throw"IK bone not found: "+f[o];n.bones.push(q)}if(n.target=d.findBone(m.target),!n.target)throw"Target bone not found: "+m.target;n.bendDirection=!m.hasOwnProperty("bendPositive")||m.bendPositive?1:-1,n.mix=m.hasOwnProperty("mix")?m.mix:1,d.ikConstraints.push(n)}for(var r=a.slots,g=0,h=r.length;h>g;g++){var s=r[g],k=d.findBone(s.bone);if(!k)throw"Slot bone not found: "+s.bone;var t=new c.SlotData(s.name,k),u=s.color;u&&(t.r=this.toColor(u,0),t.g=this.toColor(u,1),t.b=this.toColor(u,2),t.a=this.toColor(u,3)),t.attachmentName=s.attachment,t.additiveBlending=s.additive&&"true"==s.additive,d.slots.push(t)}var v=a.skins;for(var w in v)if(v.hasOwnProperty(w)){var x=v[w],y=new c.Skin(w);for(var z in x)if(x.hasOwnProperty(z)){var A=d.findSlotIndex(z),B=x[z];for(var C in B)if(B.hasOwnProperty(C)){var D=this.readAttachment(y,C,B[C]);D&&y.addAttachment(A,C,D)}}d.skins.push(y),"default"==y.name&&(d.defaultSkin=y)}var E=a.events;for(var F in E)if(E.hasOwnProperty(F)){var G=E[F],H=new c.EventData(F);H.intValue=G["int"]||0,H.floatValue=G["float"]||0,H.stringValue=G.string||null,d.events.push(H)}var I=a.animations;for(var J in I)I.hasOwnProperty(J)&&this.readAnimation(J,I[J],d);return d},readAttachment:function(a,b,d){b=d.name||b;var e=c.AttachmentType[d.type||"region"],f=d.path||b,g=this.scale;if(e==c.AttachmentType.region){var h=this.attachmentLoader.newRegionAttachment(a,b,f);if(!h)return null;h.path=f,h.x=(d.x||0)*g,h.y=(d.y||0)*g,h.scaleX=d.hasOwnProperty("scaleX")?d.scaleX:1,h.scaleY=d.hasOwnProperty("scaleY")?d.scaleY:1,h.rotation=d.rotation||0,h.width=(d.width||0)*g,h.height=(d.height||0)*g;var i=d.color;return i&&(h.r=this.toColor(i,0),h.g=this.toColor(i,1),h.b=this.toColor(i,2),h.a=this.toColor(i,3)),h.updateOffset(),h}if(e==c.AttachmentType.mesh){var j=this.attachmentLoader.newMeshAttachment(a,b,f);return j?(j.path=f,j.vertices=this.getFloatArray(d,"vertices",g),j.triangles=this.getIntArray(d,"triangles"),j.regionUVs=this.getFloatArray(d,"uvs",1),j.updateUVs(),i=d.color,i&&(j.r=this.toColor(i,0),j.g=this.toColor(i,1),j.b=this.toColor(i,2),j.a=this.toColor(i,3)),j.hullLength=2*(d.hull||0),d.edges&&(j.edges=this.getIntArray(d,"edges")),j.width=(d.width||0)*g,j.height=(d.height||0)*g,j):null}if(e==c.AttachmentType.skinnedmesh){var j=this.attachmentLoader.newSkinnedMeshAttachment(a,b,f);if(!j)return null;j.path=f;for(var k=this.getFloatArray(d,"uvs",1),l=this.getFloatArray(d,"vertices",1),m=[],n=[],o=0,p=l.length;p>o;){var q=0|l[o++];n[n.length]=q;for(var r=o+4*q;r>o;)n[n.length]=l[o],m[m.length]=l[o+1]*g,m[m.length]=l[o+2]*g,m[m.length]=l[o+3],o+=4}return j.bones=n,j.weights=m,j.triangles=this.getIntArray(d,"triangles"),j.regionUVs=k,j.updateUVs(),i=d.color,i&&(j.r=this.toColor(i,0),j.g=this.toColor(i,1),j.b=this.toColor(i,2),j.a=this.toColor(i,3)),j.hullLength=2*(d.hull||0),d.edges&&(j.edges=this.getIntArray(d,"edges")),j.width=(d.width||0)*g,j.height=(d.height||0)*g,j}if(e==c.AttachmentType.boundingbox){for(var s=this.attachmentLoader.newBoundingBoxAttachment(a,b),l=d.vertices,o=0,p=l.length;p>o;o++)s.vertices.push(l[o]*g);return s}throw"Unknown attachment type: "+e},readAnimation:function(a,b,d){var e=[],f=0,g=b.slots;for(var h in g)if(g.hasOwnProperty(h)){var i=g[h],j=d.findSlotIndex(h);for(var k in i)if(i.hasOwnProperty(k)){var l=i[k];if("color"==k){var m=new c.ColorTimeline(l.length);m.slotIndex=j;for(var n=0,o=0,p=l.length;p>o;o++){var q=l[o],r=q.color,s=this.toColor(r,0),t=this.toColor(r,1),u=this.toColor(r,2),v=this.toColor(r,3);m.setFrame(n,q.time,s,t,u,v),this.readCurve(m,n,q),n++}e.push(m),f=Math.max(f,m.frames[5*m.getFrameCount()-5])}else{if("attachment"!=k)throw"Invalid timeline type for a slot: "+k+" ("+h+")";var m=new c.AttachmentTimeline(l.length);m.slotIndex=j;for(var n=0,o=0,p=l.length;p>o;o++){var q=l[o];m.setFrame(n++,q.time,q.name)}e.push(m),f=Math.max(f,m.frames[m.getFrameCount()-1])}}}var w=b.bones;for(var x in w)if(w.hasOwnProperty(x)){var y=d.findBoneIndex(x);if(-1==y)throw"Bone not found: "+x;var z=w[x];for(var k in z)if(z.hasOwnProperty(k)){var l=z[k];if("rotate"==k){var m=new c.RotateTimeline(l.length);m.boneIndex=y;for(var n=0,o=0,p=l.length;p>o;o++){var q=l[o];m.setFrame(n,q.time,q.angle),this.readCurve(m,n,q),n++}e.push(m),f=Math.max(f,m.frames[2*m.getFrameCount()-2])}else if("translate"==k||"scale"==k){var m,A=1;"scale"==k?m=new c.ScaleTimeline(l.length):(m=new c.TranslateTimeline(l.length),A=this.scale),m.boneIndex=y;for(var n=0,o=0,p=l.length;p>o;o++){var q=l[o],B=(q.x||0)*A,C=(q.y||0)*A;m.setFrame(n,q.time,B,C),this.readCurve(m,n,q),n++}e.push(m),f=Math.max(f,m.frames[3*m.getFrameCount()-3])}else{if("flipX"!=k&&"flipY"!=k)throw"Invalid timeline type for a bone: "+k+" ("+x+")";var B="flipX"==k,m=B?new c.FlipXTimeline(l.length):new c.FlipYTimeline(l.length);m.boneIndex=y;for(var D=B?"x":"y",n=0,o=0,p=l.length;p>o;o++){var q=l[o];m.setFrame(n,q.time,q[D]||!1),n++}e.push(m),f=Math.max(f,m.frames[2*m.getFrameCount()-2])}}}var E=b.ik;for(var F in E)if(E.hasOwnProperty(F)){var G=d.findIkConstraint(F),l=E[F],m=new c.IkConstraintTimeline(l.length);m.ikConstraintIndex=d.ikConstraints.indexOf(G);for(var n=0,o=0,p=l.length;p>o;o++){var q=l[o],H=q.hasOwnProperty("mix")?q.mix:1,I=!q.hasOwnProperty("bendPositive")||q.bendPositive?1:-1;m.setFrame(n,q.time,H,I),this.readCurve(m,n,q),n++}e.push(m),f=Math.max(f,m.frames[3*m.frameCount-3])}var J=b.ffd;for(var K in J){var L=d.findSkin(K),i=J[K];for(h in i){var j=d.findSlotIndex(h),M=i[h];for(var N in M){var l=M[N],m=new c.FfdTimeline(l.length),O=L.getAttachment(j,N);if(!O)throw"FFD attachment not found: "+N;m.slotIndex=j,m.attachment=O;var P,Q=O.type==c.AttachmentType.mesh;P=Q?O.vertices.length:O.weights.length/3*2;for(var n=0,o=0,p=l.length;p>o;o++){var R,q=l[o];if(q.vertices){var S=q.vertices,R=[];R.length=P;var T=q.offset||0,U=S.length;if(1==this.scale)for(var V=0;U>V;V++)R[V+T]=S[V];else for(var V=0;U>V;V++)R[V+T]=S[V]*this.scale;if(Q)for(var W=O.vertices,V=0,U=R.length;U>V;V++)R[V]+=W[V]}else Q?R=O.vertices:(R=[],R.length=P);m.setFrame(n,q.time,R),this.readCurve(m,n,q),n++}e[e.length]=m,f=Math.max(f,m.frames[m.frameCount-1])}}}var X=b.drawOrder;if(X||(X=b.draworder),X){for(var m=new c.DrawOrderTimeline(X.length),Y=d.slots.length,n=0,o=0,p=X.length;p>o;o++){var Z=X[o],$=null;if(Z.offsets){$=[],$.length=Y;for(var V=Y-1;V>=0;V--)$[V]=-1;var _=Z.offsets,aa=[];aa.length=Y-_.length;for(var ba=0,ca=0,V=0,U=_.length;U>V;V++){var da=_[V],j=d.findSlotIndex(da.slot);if(-1==j)throw"Slot not found: "+da.slot;for(;ba!=j;)aa[ca++]=ba++;$[ba+da.offset]=ba++}for(;Y>ba;)aa[ca++]=ba++;for(var V=Y-1;V>=0;V--)-1==$[V]&&($[V]=aa[--ca])}m.setFrame(n++,Z.time,$)}e.push(m),f=Math.max(f,m.frames[m.getFrameCount()-1])}var ea=b.events;if(ea){for(var m=new c.EventTimeline(ea.length),n=0,o=0,p=ea.length;p>o;o++){var fa=ea[o],ga=d.findEvent(fa.name);if(!ga)throw"Event not found: "+fa.name;var ha=new c.Event(ga);ha.intValue=fa.hasOwnProperty("int")?fa["int"]:ga.intValue,ha.floatValue=fa.hasOwnProperty("float")?fa["float"]:ga.floatValue,ha.stringValue=fa.hasOwnProperty("string")?fa.string:ga.stringValue,m.setFrame(n++,fa.time,ha)}e.push(m),f=Math.max(f,m.frames[m.getFrameCount()-1])}d.animations.push(new c.Animation(a,e,f))},readCurve:function(a,b,c){var d=c.curve;d?"stepped"==d?a.curves.setStepped(b):d instanceof Array&&a.curves.setCurve(b,d[0],d[1],d[2],d[3]):a.curves.setLinear(b)},toColor:function(a,b){if(8!=a.length)throw"Color hexidecimal length must be 8, recieved: "+a;return parseInt(a.substring(2*b,2*b+2),16)/255},getFloatArray:function(a,b,d){var e=a[b],f=new c.Float32Array(e.length),g=0,h=e.length;if(1==d)for(;h>g;g++)f[g]=e[g];else for(;h>g;g++)f[g]=e[g]*d;return f},getIntArray:function(a,b){for(var d=a[b],e=new c.Uint16Array(d.length),f=0,g=d.length;g>f;f++)e[f]=0|d[f];return e}},c.Atlas=function(a,b){this.textureLoader=b,this.pages=[],this.regions=[];var d=new c.AtlasReader(a),e=[];e.length=4;for(var f=null;;){var g=d.readLine();if(null===g)break;if(g=d.trim(g),g.length)if(f){var h=new c.AtlasRegion;h.name=g,h.page=f,h.rotate="true"==d.readValue(),d.readTuple(e);var i=parseInt(e[0]),j=parseInt(e[1]);d.readTuple(e);var k=parseInt(e[0]),l=parseInt(e[1]);h.u=i/f.width,h.v=j/f.height,h.rotate?(h.u2=(i+l)/f.width,h.v2=(j+k)/f.height):(h.u2=(i+k)/f.width,h.v2=(j+l)/f.height),h.x=i,h.y=j,h.width=Math.abs(k),h.height=Math.abs(l),4==d.readTuple(e)&&(h.splits=[parseInt(e[0]),parseInt(e[1]),parseInt(e[2]),parseInt(e[3])],4==d.readTuple(e)&&(h.pads=[parseInt(e[0]),parseInt(e[1]),parseInt(e[2]),parseInt(e[3])],d.readTuple(e))),h.originalWidth=parseInt(e[0]),h.originalHeight=parseInt(e[1]),d.readTuple(e),h.offsetX=parseInt(e[0]),h.offsetY=parseInt(e[1]),h.index=parseInt(d.readValue()),this.regions.push(h)}else{f=new c.AtlasPage,f.name=g,2==d.readTuple(e)&&(f.width=parseInt(e[0]),f.height=parseInt(e[1]),d.readTuple(e)),f.format=c.Atlas.Format[e[0]],d.readTuple(e),f.minFilter=c.Atlas.TextureFilter[e[0]],f.magFilter=c.Atlas.TextureFilter[e[1]];var m=d.readValue();f.uWrap=c.Atlas.TextureWrap.clampToEdge,f.vWrap=c.Atlas.TextureWrap.clampToEdge,"x"==m?f.uWrap=c.Atlas.TextureWrap.repeat:"y"==m?f.vWrap=c.Atlas.TextureWrap.repeat:"xy"==m&&(f.uWrap=f.vWrap=c.Atlas.TextureWrap.repeat),b.load(f,g,this),this.pages.push(f)}else f=null}},c.Atlas.prototype={findRegion:function(a){for(var b=this.regions,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},dispose:function(){for(var a=this.pages,b=0,c=a.length;c>b;b++)this.textureLoader.unload(a[b].rendererObject)},updateUVs:function(a){for(var b=this.regions,c=0,d=b.length;d>c;c++){var e=b[c];e.page==a&&(e.u=e.x/a.width,e.v=e.y/a.height,e.rotate?(e.u2=(e.x+e.height)/a.width,e.v2=(e.y+e.width)/a.height):(e.u2=(e.x+e.width)/a.width,e.v2=(e.y+e.height)/a.height))}}},c.Atlas.Format={alpha:0,intensity:1,luminanceAlpha:2,rgb565:3,rgba4444:4,rgb888:5,rgba8888:6},c.Atlas.TextureFilter={nearest:0,linear:1,mipMap:2,mipMapNearestNearest:3,mipMapLinearNearest:4,mipMapNearestLinear:5,mipMapLinearLinear:6},c.Atlas.TextureWrap={mirroredRepeat:0,clampToEdge:1,repeat:2},c.AtlasPage=function(){},c.AtlasPage.prototype={name:null,format:null,minFilter:null,magFilter:null,uWrap:null,vWrap:null,rendererObject:null,width:0,height:0},c.AtlasRegion=function(){},c.AtlasRegion.prototype={page:null,name:null,x:0,y:0,width:0,height:0,u:0,v:0,u2:0,v2:0,offsetX:0,offsetY:0,originalWidth:0,originalHeight:0,index:0,rotate:!1,splits:null,pads:null},c.AtlasReader=function(a){this.lines=a.split(/\r\n|\r|\n/)},c.AtlasReader.prototype={index:0,trim:function(a){return a.replace(/^\s+|\s+$/g,"")},readLine:function(){return this.index>=this.lines.length?null:this.lines[this.index++]},readValue:function(){var a=this.readLine(),b=a.indexOf(":");if(-1==b)throw"Invalid line: "+a;return this.trim(a.substring(b+1))},readTuple:function(a){var b=this.readLine(),c=b.indexOf(":");if(-1==c)throw"Invalid line: "+b;for(var d=0,e=c+1;3>d;d++){var f=b.indexOf(",",e);if(-1==f)break;a[d]=this.trim(b.substr(e,f-e)),e=f+1}return a[d]=this.trim(b.substring(e)),d+1}},c.AtlasAttachmentLoader=function(a){this.atlas=a},c.AtlasAttachmentLoader.prototype={newRegionAttachment:function(a,b,d){var e=this.atlas.findRegion(d);if(!e)throw"Region not found in atlas: "+d+" (region attachment: "+b+")";var f=new c.RegionAttachment(b);return f.rendererObject=e,f.setUVs(e.u,e.v,e.u2,e.v2,e.rotate),f.regionOffsetX=e.offsetX,f.regionOffsetY=e.offsetY,f.regionWidth=e.width,f.regionHeight=e.height,f.regionOriginalWidth=e.originalWidth,f.regionOriginalHeight=e.originalHeight,f},newMeshAttachment:function(a,b,d){var e=this.atlas.findRegion(d);if(!e)throw"Region not found in atlas: "+d+" (mesh attachment: "+b+")";var f=new c.MeshAttachment(b);return f.rendererObject=e,f.regionU=e.u,f.regionV=e.v,f.regionU2=e.u2,f.regionV2=e.v2,f.regionRotate=e.rotate,f.regionOffsetX=e.offsetX,f.regionOffsetY=e.offsetY,f.regionWidth=e.width,f.regionHeight=e.height,f.regionOriginalWidth=e.originalWidth,f.regionOriginalHeight=e.originalHeight,f},newSkinnedMeshAttachment:function(a,b,d){var e=this.atlas.findRegion(d);if(!e)throw"Region not found in atlas: "+d+" (skinned mesh attachment: "+b+")";var f=new c.SkinnedMeshAttachment(b);return f.rendererObject=e,f.regionU=e.u,f.regionV=e.v,f.regionU2=e.u2,f.regionV2=e.v2,f.regionRotate=e.rotate,f.regionOffsetX=e.offsetX,f.regionOffsetY=e.offsetY,f.regionWidth=e.width,f.regionHeight=e.height,f.regionOriginalWidth=e.originalWidth,f.regionOriginalHeight=e.originalHeight,f},newBoundingBoxAttachment:function(a,b){return new c.BoundingBoxAttachment(b)}},c.SkeletonBounds=function(){this.polygonPool=[],this.polygons=[],this.boundingBoxes=[]},c.SkeletonBounds.prototype={minX:0,minY:0,maxX:0,maxY:0,update:function(a,b){var d=a.slots,e=d.length,f=a.x,g=a.y,h=this.boundingBoxes,i=this.polygonPool,j=this.polygons;h.length=0;for(var k=0,l=j.length;l>k;k++)i.push(j[k]);j.length=0;for(var k=0;e>k;k++){var m=d[k],n=m.attachment;if(n.type==c.AttachmentType.boundingbox){h.push(n);var o,p=i.length;p>0?(o=i[p-1],i.splice(p-1,1)):o=[],j.push(o),o.length=n.vertices.length,n.computeWorldVertices(f,g,m.bone,o)}}b&&this.aabbCompute()},aabbCompute:function(){for(var a=this.polygons,b=Number.MAX_VALUE,c=Number.MAX_VALUE,d=Number.MIN_VALUE,e=Number.MIN_VALUE,f=0,g=a.length;g>f;f++)for(var h=a[f],i=0,j=h.length;j>i;i+=2){var k=h[i],l=h[i+1];b=Math.min(b,k),c=Math.min(c,l),d=Math.max(d,k),e=Math.max(e,l)}this.minX=b,this.minY=c,this.maxX=d,this.maxY=e},aabbContainsPoint:function(a,b){return a>=this.minX&&a<=this.maxX&&b>=this.minY&&b<=this.maxY},aabbIntersectsSegment:function(a,b,c,d){var e=this.minX,f=this.minY,g=this.maxX,h=this.maxY;if(e>=a&&e>=c||f>=b&&f>=d||a>=g&&c>=g||b>=h&&d>=h)return!1;var i=(d-b)/(c-a),j=i*(e-a)+b;if(j>f&&h>j)return!0;if(j=i*(g-a)+b,j>f&&h>j)return!0;var k=(f-b)/i+a;return k>e&&g>k?!0:(k=(h-b)/i+a,k>e&&g>k?!0:!1)},aabbIntersectsSkeleton:function(a){return this.minX<a.maxX&&this.maxX>a.minX&&this.minY<a.maxY&&this.maxY>a.minY},containsPoint:function(a,b){for(var c=this.polygons,d=0,e=c.length;e>d;d++)if(this.polygonContainsPoint(c[d],a,b))return this.boundingBoxes[d];return null},intersectsSegment:function(a,b,c,d){for(var e=this.polygons,f=0,g=e.length;g>f;f++)if(e[f].intersectsSegment(a,b,c,d))return this.boundingBoxes[f];return null},polygonContainsPoint:function(a,b,c){for(var d=a.length,e=d-2,f=!1,g=0;d>g;g+=2){var h=a[g+1],i=a[e+1];if(c>h&&i>=c||c>i&&h>=c){var j=a[g];j+(c-h)/(i-h)*(a[e]-j)<b&&(f=!f)}e=g}return f},polygonIntersectsSegment:function(a,b,c,d,e){for(var f=a.length,g=b-d,h=c-e,i=b*e-c*d,j=a[f-2],k=a[f-1],l=0;f>l;l+=2){var m=a[l],n=a[l+1],o=j*n-k*m,p=j-m,q=k-n,r=g*q-h*p,s=(i*p-g*o)/r;if((s>=j&&m>=s||s>=m&&j>=s)&&(s>=b&&d>=s||s>=d&&b>=s)){var t=(i*q-h*o)/r;if((t>=k&&n>=t||t>=n&&k>=t)&&(t>=c&&e>=t||t>=e&&c>=t))return!0}j=m,k=n}return!1},getPolygon:function(a){var b=this.boundingBoxes.indexOf(a);return-1==b?null:this.polygons[b]},getWidth:function(){return this.maxX-this.minX},getHeight:function(){return this.maxY-this.minY}},c.Bone.yDown=!0,b.AnimCache={},b.SpineTextureLoader=function(a,c){b.EventTarget.call(this),this.basePath=a,this.crossorigin=c,this.loadingCount=0},b.SpineTextureLoader.prototype=b.SpineTextureLoader,b.SpineTextureLoader.prototype.load=function(a,c){if(a.rendererObject=b.BaseTexture.fromImage(this.basePath+"/"+c,this.crossorigin),!a.rendererObject.hasLoaded){var d=this;++d.loadingCount,a.rendererObject.addEventListener("loaded",function(){--d.loadingCount,d.dispatchEvent({type:"loadedBaseTexture",content:d})})}},b.SpineTextureLoader.prototype.unload=function(a){a.destroy(!0)},b.Spine=function(a){if(b.DisplayObjectContainer.call(this),this.spineData=b.AnimCache[a],!this.spineData)throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: "+a);this.skeleton=new c.Skeleton(this.spineData),this.skeleton.updateWorldTransform(),this.stateData=new c.AnimationStateData(this.spineData),this.state=new c.AnimationState(this.stateData),this.slotContainers=[];for(var d=0,e=this.skeleton.slots.length;e>d;d++){var f=this.skeleton.slots[d],g=f.attachment,h=new b.DisplayObjectContainer;if(this.slotContainers.push(h),this.addChild(h),g instanceof c.RegionAttachment){var i=g.rendererObject.name,j=this.createSprite(f,g);f.currentSprite=j,f.currentSpriteName=i,h.addChild(j)}else{if(!(g instanceof c.MeshAttachment))continue;var k=this.createMesh(f,g);f.currentMesh=k,f.currentMeshName=g.name,h.addChild(k)}}this.autoUpdate=!0},b.Spine.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Spine.prototype.constructor=b.Spine,Object.defineProperty(b.Spine.prototype,"autoUpdate",{get:function(){return this.updateTransform===b.Spine.prototype.autoUpdateTransform},set:function(a){this.updateTransform=a?b.Spine.prototype.autoUpdateTransform:b.DisplayObjectContainer.prototype.updateTransform}}),b.Spine.prototype.update=function(a){this.state.update(a),this.state.apply(this.skeleton),this.skeleton.updateWorldTransform();for(var d=this.skeleton.drawOrder,e=this.skeleton.slots,f=0,g=d.length;g>f;f++)this.children[f]=this.slotContainers[d[f]];for(f=0,g=e.length;g>f;f++){var h=e[f],i=h.attachment,j=this.slotContainers[f];if(i){var k=i.type;if(k===c.AttachmentType.region){if(i.rendererObject&&(!h.currentSpriteName||h.currentSpriteName!==i.name)){var l=i.rendererObject.name;if(void 0!==h.currentSprite&&(h.currentSprite.visible=!1),h.sprites=h.sprites||{},void 0!==h.sprites[l])h.sprites[l].visible=!0;else{var m=this.createSprite(h,i);j.addChild(m)}h.currentSprite=h.sprites[l],h.currentSpriteName=l}var n=h.bone;j.position.x=n.worldX+i.x*n.m00+i.y*n.m01,j.position.y=n.worldY+i.x*n.m10+i.y*n.m11,j.scale.x=n.worldScaleX,j.scale.y=n.worldScaleY,j.rotation=-(h.bone.worldRotation*c.degRad),h.currentSprite.tint=b.rgb2hex([h.r,h.g,h.b])}else{if(k!==c.AttachmentType.skinnedmesh){j.visible=!1;continue}if(!h.currentMeshName||h.currentMeshName!==i.name){var o=i.name;if(void 0!==h.currentMesh&&(h.currentMesh.visible=!1),h.meshes=h.meshes||{},void 0!==h.meshes[o])h.meshes[o].visible=!0;else{var p=this.createMesh(h,i);j.addChild(p)}h.currentMesh=h.meshes[o],h.currentMeshName=o}i.computeWorldVertices(h.bone.skeleton.x,h.bone.skeleton.y,h,h.currentMesh.vertices)}j.visible=!0,j.alpha=h.a}else j.visible=!1}},b.Spine.prototype.autoUpdateTransform=function(){this.lastTime=this.lastTime||Date.now();var a=.001*(Date.now()-this.lastTime);this.lastTime=Date.now(),this.update(a),b.DisplayObjectContainer.prototype.updateTransform.call(this)},b.Spine.prototype.createSprite=function(a,d){var e=d.rendererObject,f=e.page.rendererObject,g=new b.Rectangle(e.x,e.y,e.rotate?e.height:e.width,e.rotate?e.width:e.height),h=new b.Texture(f,g),i=new b.Sprite(h),j=e.rotate?.5*Math.PI:0;return i.scale.set(e.width/e.originalWidth,e.height/e.originalHeight),i.rotation=j-d.rotation*c.degRad,i.anchor.x=i.anchor.y=.5,a.sprites=a.sprites||{},a.sprites[e.name]=i,i},b.Spine.prototype.createMesh=function(a,c){var d=c.rendererObject,e=d.page.rendererObject,f=new b.Texture(e),g=new b.Strip(f);return g.drawMode=b.Strip.DrawModes.TRIANGLES,g.canvasPadding=1.5,g.vertices=new b.Float32Array(c.uvs.length),g.uvs=c.uvs,g.indices=c.triangles,a.meshes=a.meshes||{},a.meshes[c.name]=g,g},b.BaseTextureCache={},b.BaseTextureCacheIdGenerator=0,b.BaseTexture=function(a,c){if(this.resolution=1,this.width=100,this.height=100,this.scaleMode=c||b.scaleModes.DEFAULT,this.hasLoaded=!1,this.source=a,this._UID=b._UID++,this.premultipliedAlpha=!0,this._glTextures=[],this.mipmap=!1,this._dirty=[!0,!0,!0,!0],a){if((this.source.complete||this.source.getContext)&&this.source.width&&this.source.height)this.hasLoaded=!0,this.width=this.source.naturalWidth||this.source.width,this.height=this.source.naturalHeight||this.source.height,this.dirty();else{var d=this;this.source.onload=function(){d.hasLoaded=!0,d.width=d.source.naturalWidth||d.source.width,d.height=d.source.naturalHeight||d.source.height,d.dirty(),d.dispatchEvent({type:"loaded",content:d})},this.source.onerror=function(){d.dispatchEvent({type:"error",content:d})}}this.imageUrl=null,this._powerOf2=!1}},b.BaseTexture.prototype.constructor=b.BaseTexture,b.EventTarget.mixin(b.BaseTexture.prototype),b.BaseTexture.prototype.destroy=function(){this.imageUrl?(delete b.BaseTextureCache[this.imageUrl],delete b.TextureCache[this.imageUrl],this.imageUrl=null,navigator.isCocoonJS||(this.source.src="")):this.source&&this.source._pixiId&&delete b.BaseTextureCache[this.source._pixiId],this.source=null,this.unloadFromGPU()},b.BaseTexture.prototype.updateSourceImage=function(a){this.hasLoaded=!1,this.source.src=null,this.source.src=a},b.BaseTexture.prototype.dirty=function(){for(var a=0;a<this._glTextures.length;a++)this._dirty[a]=!0},b.BaseTexture.prototype.unloadFromGPU=function(){this.dirty();for(var a=this._glTextures.length-1;a>=0;a--){var c=this._glTextures[a],d=b.glContexts[a];d&&c&&d.deleteTexture(c)}this._glTextures.length=0,this.dirty()},b.BaseTexture.fromImage=function(a,c,d){var e=b.BaseTextureCache[a];if(void 0===c&&-1===a.indexOf("data:")&&(c=!0),!e){var f=new Image;c&&(f.crossOrigin=""),f.src=a,e=new b.BaseTexture(f,d),e.imageUrl=a,b.BaseTextureCache[a]=e,-1!==a.indexOf(b.RETINA_PREFIX+".")&&(e.resolution=2)}return e},b.BaseTexture.fromCanvas=function(a,c){a._pixiId||(a._pixiId="canvas_"+b.TextureCacheIdGenerator++);var d=b.BaseTextureCache[a._pixiId];return d||(d=new b.BaseTexture(a,c),b.BaseTextureCache[a._pixiId]=d),d},b.TextureCache={},b.FrameCache={},b.TextureCacheIdGenerator=0,b.Texture=function(a,c,d,e){this.noFrame=!1,c||(this.noFrame=!0,c=new b.Rectangle(0,0,1,1)),a instanceof b.Texture&&(a=a.baseTexture),this.baseTexture=a,this.frame=c,this.trim=e,this.valid=!1,this.requiresUpdate=!1,this._uvs=null,this.width=0,this.height=0,this.crop=d||new b.Rectangle(0,0,1,1),a.hasLoaded?(this.noFrame&&(c=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(c)):a.addEventListener("loaded",this.onBaseTextureLoaded.bind(this))},b.Texture.prototype.constructor=b.Texture,b.EventTarget.mixin(b.Texture.prototype),b.Texture.prototype.onBaseTextureLoaded=function(){var a=this.baseTexture;a.removeEventListener("loaded",this.onLoaded),this.noFrame&&(this.frame=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(this.frame),this.dispatchEvent({type:"update",content:this})},b.Texture.prototype.destroy=function(a){a&&this.baseTexture.destroy(),this.valid=!1},b.Texture.prototype.setFrame=function(a){if(this.noFrame=!1,this.frame=a,this.width=a.width,this.height=a.height,this.crop.x=a.x,this.crop.y=a.y,this.crop.width=a.width,this.crop.height=a.height,!this.trim&&(a.x+a.width>this.baseTexture.width||a.y+a.height>this.baseTexture.height))throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);this.valid=a&&a.width&&a.height&&this.baseTexture.source&&this.baseTexture.hasLoaded,this.trim&&(this.width=this.trim.width,this.height=this.trim.height,this.frame.width=this.trim.width,this.frame.height=this.trim.height),this.valid&&this._updateUvs()},b.Texture.prototype._updateUvs=function(){this._uvs||(this._uvs=new b.TextureUvs);var a=this.crop,c=this.baseTexture.width,d=this.baseTexture.height;this._uvs.x0=a.x/c,this._uvs.y0=a.y/d,this._uvs.x1=(a.x+a.width)/c,this._uvs.y1=a.y/d,this._uvs.x2=(a.x+a.width)/c,this._uvs.y2=(a.y+a.height)/d,this._uvs.x3=a.x/c,this._uvs.y3=(a.y+a.height)/d},b.Texture.fromImage=function(a,c,d){var e=b.TextureCache[a];return e||(e=new b.Texture(b.BaseTexture.fromImage(a,c,d)),b.TextureCache[a]=e),e},b.Texture.fromFrame=function(a){var c=b.TextureCache[a];if(!c)throw new Error('The frameId "'+a+'" does not exist in the texture cache ');return c},b.Texture.fromCanvas=function(a,c){var d=b.BaseTexture.fromCanvas(a,c);return new b.Texture(d)},b.Texture.addTextureToCache=function(a,c){b.TextureCache[c]=a},b.Texture.removeTextureFromCache=function(a){var c=b.TextureCache[a];return delete b.TextureCache[a],delete b.BaseTextureCache[a],c},b.TextureUvs=function(){this.x0=0,this.y0=0,this.x1=0,this.y1=0,this.x2=0,this.y2=0,this.x3=0,this.y3=0},b.Texture.emptyTexture=new b.Texture(new b.BaseTexture),b.RenderTexture=function(a,c,d,e,f){if(this.width=a||100,this.height=c||100,this.resolution=f||1,this.frame=new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution),this.crop=new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution),this.baseTexture=new b.BaseTexture,this.baseTexture.width=this.width*this.resolution,this.baseTexture.height=this.height*this.resolution,this.baseTexture._glTextures=[],this.baseTexture.resolution=this.resolution,this.baseTexture.scaleMode=e||b.scaleModes.DEFAULT,this.baseTexture.hasLoaded=!0,b.Texture.call(this,this.baseTexture,new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution)),this.renderer=d||b.defaultRenderer,this.renderer.type===b.WEBGL_RENDERER){var g=this.renderer.gl;this.baseTexture._dirty[g.id]=!1,this.textureBuffer=new b.FilterTexture(g,this.width,this.height,this.baseTexture.scaleMode),this.baseTexture._glTextures[g.id]=this.textureBuffer.texture,this.render=this.renderWebGL,this.projection=new b.Point(.5*this.width,.5*-this.height)}else this.render=this.renderCanvas,this.textureBuffer=new b.CanvasBuffer(this.width*this.resolution,this.height*this.resolution),this.baseTexture.source=this.textureBuffer.canvas;this.valid=!0,this._updateUvs()},b.RenderTexture.prototype=Object.create(b.Texture.prototype),b.RenderTexture.prototype.constructor=b.RenderTexture,b.RenderTexture.prototype.resize=function(a,c,d){(a!==this.width||c!==this.height)&&(this.valid=a>0&&c>0,this.width=a,this.height=c,this.frame.width=this.crop.width=a*this.resolution,this.frame.height=this.crop.height=c*this.resolution,d&&(this.baseTexture.width=this.width*this.resolution,this.baseTexture.height=this.height*this.resolution),this.renderer.type===b.WEBGL_RENDERER&&(this.projection.x=this.width/2,this.projection.y=-this.height/2),this.valid&&this.textureBuffer.resize(this.width,this.height))},b.RenderTexture.prototype.clear=function(){this.valid&&(this.renderer.type===b.WEBGL_RENDERER&&this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER,this.textureBuffer.frameBuffer),this.textureBuffer.clear())},b.RenderTexture.prototype.renderWebGL=function(a,b,c){if(this.valid){var d=a.worldTransform;d.identity(),d.translate(0,2*this.projection.y),b&&d.append(b),d.scale(1,-1),a.worldAlpha=1;for(var e=a.children,f=0,g=e.length;g>f;f++)e[f].updateTransform();var h=this.renderer.gl;h.viewport(0,0,this.width*this.resolution,this.height*this.resolution),h.bindFramebuffer(h.FRAMEBUFFER,this.textureBuffer.frameBuffer),c&&this.textureBuffer.clear(),this.renderer.spriteBatch.dirty=!0,this.renderer.renderDisplayObject(a,this.projection,this.textureBuffer.frameBuffer),this.renderer.spriteBatch.dirty=!0}},b.RenderTexture.prototype.renderCanvas=function(a,b,c){if(this.valid){var d=a.worldTransform;d.identity(),b&&d.append(b),a.worldAlpha=1;for(var e=a.children,f=0,g=e.length;g>f;f++)e[f].updateTransform();c&&this.textureBuffer.clear();var h=this.textureBuffer.context,i=this.renderer.resolution;this.renderer.resolution=this.resolution,this.renderer.renderDisplayObject(a,h),this.renderer.resolution=i}},b.RenderTexture.prototype.getImage=function(){var a=new Image;return a.src=this.getBase64(),a},b.RenderTexture.prototype.getBase64=function(){return this.getCanvas().toDataURL()},b.RenderTexture.prototype.getCanvas=function(){if(this.renderer.type===b.WEBGL_RENDERER){var a=this.renderer.gl,c=this.textureBuffer.width,d=this.textureBuffer.height,e=new Uint8Array(4*c*d);a.bindFramebuffer(a.FRAMEBUFFER,this.textureBuffer.frameBuffer),a.readPixels(0,0,c,d,a.RGBA,a.UNSIGNED_BYTE,e),a.bindFramebuffer(a.FRAMEBUFFER,null);var f=new b.CanvasBuffer(c,d),g=f.context.getImageData(0,0,c,d);return g.data.set(e),f.context.putImageData(g,0,0),f.canvas}return this.textureBuffer.canvas},b.RenderTexture.tempMatrix=new b.Matrix,b.VideoTexture=function(a,c){if(!a)throw new Error("No video source element specified.");(a.readyState===a.HAVE_ENOUGH_DATA||a.readyState===a.HAVE_FUTURE_DATA)&&a.width&&a.height&&(a.complete=!0),b.BaseTexture.call(this,a,c),this.autoUpdate=!1,this.updateBound=this._onUpdate.bind(this),a.complete||(this._onCanPlay=this.onCanPlay.bind(this),a.addEventListener("canplay",this._onCanPlay),a.addEventListener("canplaythrough",this._onCanPlay),a.addEventListener("play",this.onPlayStart.bind(this)),a.addEventListener("pause",this.onPlayStop.bind(this)))},b.VideoTexture.prototype=Object.create(b.BaseTexture.prototype),b.VideoTexture.constructor=b.VideoTexture,b.VideoTexture.prototype._onUpdate=function(){this.autoUpdate&&(window.requestAnimationFrame(this.updateBound),this.dirty())},b.VideoTexture.prototype.onPlayStart=function(){this.autoUpdate||(window.requestAnimationFrame(this.updateBound),this.autoUpdate=!0)},b.VideoTexture.prototype.onPlayStop=function(){this.autoUpdate=!1},b.VideoTexture.prototype.onCanPlay=function(){"canplaythrough"===event.type&&(this.hasLoaded=!0,this.source&&(this.source.removeEventListener("canplay",this._onCanPlay),this.source.removeEventListener("canplaythrough",this._onCanPlay),this.width=this.source.videoWidth,this.height=this.source.videoHeight,this.__loaded||(this.__loaded=!0,this.dispatchEvent({type:"loaded",content:this}))))},b.VideoTexture.prototype.destroy=function(){this.source&&this.source._pixiId&&(b.BaseTextureCache[this.source._pixiId]=null,delete b.BaseTextureCache[this.source._pixiId],this.source._pixiId=null,delete this.source._pixiId),b.BaseTexture.prototype.destroy.call(this)},b.VideoTexture.baseTextureFromVideo=function(a,c){a._pixiId||(a._pixiId="video_"+b.TextureCacheIdGenerator++);var d=b.BaseTextureCache[a._pixiId];return d||(d=new b.VideoTexture(a,c),b.BaseTextureCache[a._pixiId]=d),d},b.VideoTexture.textureFromVideo=function(a,c){var d=b.VideoTexture.baseTextureFromVideo(a,c);return new b.Texture(d)},b.VideoTexture.fromUrl=function(a,c){var d=document.createElement("video");return d.src=a,d.autoPlay=!0,d.play(),b.VideoTexture.textureFromVideo(d,c)},b.AssetLoader=function(a,c){this.assetURLs=a,this.crossorigin=c,this.loadersByType={jpg:b.ImageLoader,jpeg:b.ImageLoader,png:b.ImageLoader,gif:b.ImageLoader,webp:b.ImageLoader,json:b.JsonLoader,atlas:b.AtlasLoader,anim:b.SpineLoader,xml:b.BitmapFontLoader,fnt:b.BitmapFontLoader}},b.EventTarget.mixin(b.AssetLoader.prototype),b.AssetLoader.prototype.constructor=b.AssetLoader,b.AssetLoader.prototype._getDataType=function(a){var b="data:",c=a.slice(0,b.length).toLowerCase();if(c===b){var d=a.slice(b.length),e=d.indexOf(",");if(-1===e)return null;var f=d.slice(0,e).split(";")[0];return f&&"text/plain"!==f.toLowerCase()?f.split("/").pop().toLowerCase():"txt"}return null},b.AssetLoader.prototype.load=function(){function a(a){b.onAssetLoaded(a.data.content)}var b=this;this.loadCount=this.assetURLs.length;for(var c=0;c<this.assetURLs.length;c++){var d=this.assetURLs[c],e=this._getDataType(d);e||(e=d.split("?").shift().split(".").pop().toLowerCase());var f=this.loadersByType[e];if(!f)throw new Error(e+" is an unsupported file type");var g=new f(d,this.crossorigin);g.on("loaded",a),g.load()}},b.AssetLoader.prototype.onAssetLoaded=function(a){this.loadCount--,this.emit("onProgress",{content:this,loader:a,loaded:this.assetURLs.length-this.loadCount,total:this.assetURLs.length}),this.onProgress&&this.onProgress(a),this.loadCount||(this.emit("onComplete",{content:this}),this.onComplete&&this.onComplete());

},b.JsonLoader=function(a,b){this.url=a,this.crossorigin=b,this.baseUrl=a.replace(/[^\/]*$/,""),this.loaded=!1},b.JsonLoader.prototype.constructor=b.JsonLoader,b.EventTarget.mixin(b.JsonLoader.prototype),b.JsonLoader.prototype.load=function(){window.XDomainRequest&&this.crossorigin?(this.ajaxRequest=new window.XDomainRequest,this.ajaxRequest.timeout=3e3,this.ajaxRequest.onerror=this.onError.bind(this),this.ajaxRequest.ontimeout=this.onError.bind(this),this.ajaxRequest.onprogress=function(){},this.ajaxRequest.onload=this.onJSONLoaded.bind(this)):(this.ajaxRequest=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP"),this.ajaxRequest.onreadystatechange=this.onReadyStateChanged.bind(this)),this.ajaxRequest.open("GET",this.url,!0),this.ajaxRequest.send()},b.JsonLoader.prototype.onReadyStateChanged=function(){4!==this.ajaxRequest.readyState||200!==this.ajaxRequest.status&&-1!==window.location.href.indexOf("http")||this.onJSONLoaded()},b.JsonLoader.prototype.onJSONLoaded=function(){if(!this.ajaxRequest.responseText)return void this.onError();if(this.json=JSON.parse(this.ajaxRequest.responseText),this.json.frames&&this.json.meta&&this.json.meta.image){var a=this.json.meta.image;-1===a.indexOf("data:")&&(a=this.baseUrl+a);var d=new b.ImageLoader(a,this.crossorigin),e=this.json.frames;this.texture=d.texture.baseTexture,d.addEventListener("loaded",this.onLoaded.bind(this));for(var f in e){var g=e[f].frame;if(g){var h=new b.Rectangle(g.x,g.y,g.w,g.h),i=h.clone(),j=null;if(e[f].trimmed){var k=e[f].sourceSize,l=e[f].spriteSourceSize;j=new b.Rectangle(l.x,l.y,k.w,k.h)}b.TextureCache[f]=new b.Texture(this.texture,h,i,j)}}d.load()}else if(this.json.bones)if(b.AnimCache[this.url])this.onLoaded();else{var m=this.url.substr(0,this.url.lastIndexOf("."))+".atlas",n=new b.JsonLoader(m,this.crossorigin),o=this;n.onJSONLoaded=function(){if(!this.ajaxRequest.responseText)return void this.onError();var a=new b.SpineTextureLoader(this.url.substring(0,this.url.lastIndexOf("/"))),d=new c.Atlas(this.ajaxRequest.responseText,a),e=new c.AtlasAttachmentLoader(d),f=new c.SkeletonJson(e),g=f.readSkeletonData(o.json);b.AnimCache[o.url]=g,o.spine=g,o.spineAtlas=d,o.spineAtlasLoader=n,a.loadingCount>0?a.addEventListener("loadedBaseTexture",function(a){a.content.content.loadingCount<=0&&o.onLoaded()}):o.onLoaded()},n.load()}else this.onLoaded()},b.JsonLoader.prototype.onLoaded=function(){this.loaded=!0,this.dispatchEvent({type:"loaded",content:this})},b.JsonLoader.prototype.onError=function(){this.dispatchEvent({type:"error",content:this})},b.AtlasLoader=function(a,b){this.url=a,this.baseUrl=a.replace(/[^\/]*$/,""),this.crossorigin=b,this.loaded=!1},b.AtlasLoader.constructor=b.AtlasLoader,b.EventTarget.mixin(b.AtlasLoader.prototype),b.AtlasLoader.prototype.load=function(){this.ajaxRequest=new b.AjaxRequest,this.ajaxRequest.onreadystatechange=this.onAtlasLoaded.bind(this),this.ajaxRequest.open("GET",this.url,!0),this.ajaxRequest.overrideMimeType&&this.ajaxRequest.overrideMimeType("application/json"),this.ajaxRequest.send(null)},b.AtlasLoader.prototype.onAtlasLoaded=function(){if(4===this.ajaxRequest.readyState)if(200===this.ajaxRequest.status||-1===window.location.href.indexOf("http")){this.atlas={meta:{image:[]},frames:[]};var a=this.ajaxRequest.responseText.split(/\r?\n/),c=-3,d=0,e=null,f=!1,g=0,h=0,i=this.onLoaded.bind(this);for(g=0;g<a.length;g++)if(a[g]=a[g].replace(/^\s+|\s+$/g,""),""===a[g]&&(f=g+1),a[g].length>0){if(f===g)this.atlas.meta.image.push(a[g]),d=this.atlas.meta.image.length-1,this.atlas.frames.push({}),c=-3;else if(c>0)if(c%7===1)null!=e&&(this.atlas.frames[d][e.name]=e),e={name:a[g],frame:{}};else{var j=a[g].split(" ");if(c%7===3)e.frame.x=Number(j[1].replace(",","")),e.frame.y=Number(j[2]);else if(c%7===4)e.frame.w=Number(j[1].replace(",","")),e.frame.h=Number(j[2]);else if(c%7===5){var k={x:0,y:0,w:Number(j[1].replace(",","")),h:Number(j[2])};k.w>e.frame.w||k.h>e.frame.h?(e.trimmed=!0,e.realSize=k):e.trimmed=!1}}c++}if(null!=e&&(this.atlas.frames[d][e.name]=e),this.atlas.meta.image.length>0){for(this.images=[],h=0;h<this.atlas.meta.image.length;h++){var l=this.baseUrl+this.atlas.meta.image[h],m=this.atlas.frames[h];this.images.push(new b.ImageLoader(l,this.crossorigin));for(g in m){var n=m[g].frame;n&&(b.TextureCache[g]=new b.Texture(this.images[h].texture.baseTexture,{x:n.x,y:n.y,width:n.w,height:n.h}),m[g].trimmed&&(b.TextureCache[g].realSize=m[g].realSize,b.TextureCache[g].trim.x=0,b.TextureCache[g].trim.y=0))}}for(this.currentImageId=0,h=0;h<this.images.length;h++)this.images[h].on("loaded",i);this.images[this.currentImageId].load()}else this.onLoaded()}else this.onError()},b.AtlasLoader.prototype.onLoaded=function(){this.images.length-1>this.currentImageId?(this.currentImageId++,this.images[this.currentImageId].load()):(this.loaded=!0,this.emit("loaded",{content:this}))},b.AtlasLoader.prototype.onError=function(){this.emit("error",{content:this})},b.SpriteSheetLoader=function(a,b){this.url=a,this.crossorigin=b,this.baseUrl=a.replace(/[^\/]*$/,""),this.texture=null,this.frames={}},b.SpriteSheetLoader.prototype.constructor=b.SpriteSheetLoader,b.EventTarget.mixin(b.SpriteSheetLoader.prototype),b.SpriteSheetLoader.prototype.load=function(){var a=this,c=new b.JsonLoader(this.url,this.crossorigin);c.on("loaded",function(b){a.json=b.data.content.json,a.onLoaded()}),c.load()},b.SpriteSheetLoader.prototype.onLoaded=function(){this.emit("loaded",{content:this})},b.ImageLoader=function(a,c){this.texture=b.Texture.fromImage(a,c),this.frames=[]},b.ImageLoader.prototype.constructor=b.ImageLoader,b.EventTarget.mixin(b.ImageLoader.prototype),b.ImageLoader.prototype.load=function(){this.texture.baseTexture.hasLoaded?this.onLoaded():this.texture.baseTexture.on("loaded",this.onLoaded.bind(this))},b.ImageLoader.prototype.onLoaded=function(){this.emit("loaded",{content:this})},b.ImageLoader.prototype.loadFramedSpriteSheet=function(a,c,d){this.frames=[];for(var e=Math.floor(this.texture.width/a),f=Math.floor(this.texture.height/c),g=0,h=0;f>h;h++)for(var i=0;e>i;i++,g++){var j=new b.Texture(this.texture.baseTexture,{x:i*a,y:h*c,width:a,height:c});this.frames.push(j),d&&(b.TextureCache[d+"-"+g]=j)}this.load()},b.BitmapFontLoader=function(a,b){this.url=a,this.crossorigin=b,this.baseUrl=a.replace(/[^\/]*$/,""),this.texture=null},b.BitmapFontLoader.prototype.constructor=b.BitmapFontLoader,b.EventTarget.mixin(b.BitmapFontLoader.prototype),b.BitmapFontLoader.prototype.load=function(){this.ajaxRequest=new b.AjaxRequest,this.ajaxRequest.onreadystatechange=this.onXMLLoaded.bind(this),this.ajaxRequest.open("GET",this.url,!0),this.ajaxRequest.overrideMimeType&&this.ajaxRequest.overrideMimeType("application/xml"),this.ajaxRequest.send(null)},b.BitmapFontLoader.prototype.onXMLLoaded=function(){if(4===this.ajaxRequest.readyState&&(200===this.ajaxRequest.status||-1===window.location.protocol.indexOf("http"))){var a=this.ajaxRequest.responseXML;if(!a||/MSIE 9/i.test(navigator.userAgent)||navigator.isCocoonJS)if("function"==typeof window.DOMParser){var c=new DOMParser;a=c.parseFromString(this.ajaxRequest.responseText,"text/xml")}else{var d=document.createElement("div");d.innerHTML=this.ajaxRequest.responseText,a=d}var e=this.baseUrl+a.getElementsByTagName("page")[0].getAttribute("file"),f=new b.ImageLoader(e,this.crossorigin);this.texture=f.texture.baseTexture;var g={},h=a.getElementsByTagName("info")[0],i=a.getElementsByTagName("common")[0];g.font=h.getAttribute("face"),g.size=parseInt(h.getAttribute("size"),10),g.lineHeight=parseInt(i.getAttribute("lineHeight"),10),g.chars={};for(var j=a.getElementsByTagName("char"),k=0;k<j.length;k++){var l=parseInt(j[k].getAttribute("id"),10),m=new b.Rectangle(parseInt(j[k].getAttribute("x"),10),parseInt(j[k].getAttribute("y"),10),parseInt(j[k].getAttribute("width"),10),parseInt(j[k].getAttribute("height"),10));g.chars[l]={xOffset:parseInt(j[k].getAttribute("xoffset"),10),yOffset:parseInt(j[k].getAttribute("yoffset"),10),xAdvance:parseInt(j[k].getAttribute("xadvance"),10),kerning:{},texture:b.TextureCache[l]=new b.Texture(this.texture,m)}}var n=a.getElementsByTagName("kerning");for(k=0;k<n.length;k++){var o=parseInt(n[k].getAttribute("first"),10),p=parseInt(n[k].getAttribute("second"),10),q=parseInt(n[k].getAttribute("amount"),10);g.chars[p].kerning[o]=q}b.BitmapText.fonts[g.font]=g,f.addEventListener("loaded",this.onLoaded.bind(this)),f.load()}},b.BitmapFontLoader.prototype.onLoaded=function(){this.emit("loaded",{content:this})},b.SpineLoader=function(a,b){this.url=a,this.crossorigin=b,this.loaded=!1},b.SpineLoader.prototype.constructor=b.SpineLoader,b.EventTarget.mixin(b.SpineLoader.prototype),b.SpineLoader.prototype.load=function(){var a=this,c=new b.JsonLoader(this.url,this.crossorigin);c.on("loaded",function(b){a.json=b.data.content.json,a.onLoaded()}),c.load()},b.SpineLoader.prototype.onLoaded=function(){this.loaded=!0,this.emit("loaded",{content:this})},b.AbstractFilter=function(a,b){this.passes=[this],this.shaders=[],this.dirty=!0,this.padding=0,this.uniforms=b||{},this.fragmentSrc=a||[]},b.AbstractFilter.prototype.constructor=b.AbstractFilter,b.AbstractFilter.prototype.syncUniforms=function(){for(var a=0,b=this.shaders.length;b>a;a++)this.shaders[a].dirty=!0},b.AlphaMaskFilter=function(a){b.AbstractFilter.call(this),this.passes=[this],a.baseTexture._powerOf2=!0,this.uniforms={mask:{type:"sampler2D",value:a},mapDimensions:{type:"2f",value:{x:1,y:5112}},dimensions:{type:"4fv",value:[0,0,0,0]}},a.baseTexture.hasLoaded?(this.uniforms.mask.value.x=a.width,this.uniforms.mask.value.y=a.height):(this.boundLoadedFunction=this.onTextureLoaded.bind(this),a.baseTexture.on("loaded",this.boundLoadedFunction)),this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D mask;","uniform sampler2D uSampler;","uniform vec2 offset;","uniform vec4 dimensions;","uniform vec2 mapDimensions;","void main(void) {","   vec2 mapCords = vTextureCoord.xy;","   mapCords += (dimensions.zw + offset)/ dimensions.xy ;","   mapCords.y *= -1.0;","   mapCords.y += 1.0;","   mapCords *= dimensions.xy / mapDimensions;","   vec4 original =  texture2D(uSampler, vTextureCoord);","   float maskAlpha =  texture2D(mask, mapCords).r;","   original *= maskAlpha;","   gl_FragColor =  original;","}"]},b.AlphaMaskFilter.prototype=Object.create(b.AbstractFilter.prototype),b.AlphaMaskFilter.prototype.constructor=b.AlphaMaskFilter,b.AlphaMaskFilter.prototype.onTextureLoaded=function(){this.uniforms.mapDimensions.value.x=this.uniforms.mask.value.width,this.uniforms.mapDimensions.value.y=this.uniforms.mask.value.height,this.uniforms.mask.value.baseTexture.off("loaded",this.boundLoadedFunction)},Object.defineProperty(b.AlphaMaskFilter.prototype,"map",{get:function(){return this.uniforms.mask.value},set:function(a){this.uniforms.mask.value=a}}),b.ColorMatrixFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={matrix:{type:"mat4",value:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float invert;","uniform mat4 matrix;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;","}"]},b.ColorMatrixFilter.prototype=Object.create(b.AbstractFilter.prototype),b.ColorMatrixFilter.prototype.constructor=b.ColorMatrixFilter,Object.defineProperty(b.ColorMatrixFilter.prototype,"matrix",{get:function(){return this.uniforms.matrix.value},set:function(a){this.uniforms.matrix.value=a}}),b.GrayFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={gray:{type:"1f",value:1}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","uniform float gray;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord);","   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);","}"]},b.GrayFilter.prototype=Object.create(b.AbstractFilter.prototype),b.GrayFilter.prototype.constructor=b.GrayFilter,Object.defineProperty(b.GrayFilter.prototype,"gray",{get:function(){return this.uniforms.gray.value},set:function(a){this.uniforms.gray.value=a}}),b.DisplacementFilter=function(a){b.AbstractFilter.call(this),this.passes=[this],a.baseTexture._powerOf2=!0,this.uniforms={displacementMap:{type:"sampler2D",value:a},scale:{type:"2f",value:{x:30,y:30}},offset:{type:"2f",value:{x:0,y:0}},mapDimensions:{type:"2f",value:{x:1,y:5112}},dimensions:{type:"4fv",value:[0,0,0,0]}},a.baseTexture.hasLoaded?(this.uniforms.mapDimensions.value.x=a.width,this.uniforms.mapDimensions.value.y=a.height):(this.boundLoadedFunction=this.onTextureLoaded.bind(this),a.baseTexture.on("loaded",this.boundLoadedFunction)),this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D displacementMap;","uniform sampler2D uSampler;","uniform vec2 scale;","uniform vec2 offset;","uniform vec4 dimensions;","uniform vec2 mapDimensions;","void main(void) {","   vec2 mapCords = vTextureCoord.xy;","   mapCords += (dimensions.zw + offset)/ dimensions.xy ;","   mapCords.y *= -1.0;","   mapCords.y += 1.0;","   vec2 matSample = texture2D(displacementMap, mapCords).xy;","   matSample -= 0.5;","   matSample *= scale;","   matSample /= mapDimensions;","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));","   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);","   vec2 cord = vTextureCoord;","}"]},b.DisplacementFilter.prototype=Object.create(b.AbstractFilter.prototype),b.DisplacementFilter.prototype.constructor=b.DisplacementFilter,b.DisplacementFilter.prototype.onTextureLoaded=function(){this.uniforms.mapDimensions.value.x=this.uniforms.displacementMap.value.width,this.uniforms.mapDimensions.value.y=this.uniforms.displacementMap.value.height,this.uniforms.displacementMap.value.baseTexture.off("loaded",this.boundLoadedFunction)},Object.defineProperty(b.DisplacementFilter.prototype,"map",{get:function(){return this.uniforms.displacementMap.value},set:function(a){this.uniforms.displacementMap.value=a}}),Object.defineProperty(b.DisplacementFilter.prototype,"scale",{get:function(){return this.uniforms.scale.value},set:function(a){this.uniforms.scale.value=a}}),Object.defineProperty(b.DisplacementFilter.prototype,"offset",{get:function(){return this.uniforms.offset.value},set:function(a){this.uniforms.offset.value=a}}),b.PixelateFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={invert:{type:"1f",value:0},dimensions:{type:"4fv",value:new b.Float32Array([1e4,100,10,10])},pixelSize:{type:"2f",value:{x:10,y:10}}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform vec2 testDim;","uniform vec4 dimensions;","uniform vec2 pixelSize;","uniform sampler2D uSampler;","void main(void) {","   vec2 coord = vTextureCoord;","   vec2 size = dimensions.xy/pixelSize;","   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;","   gl_FragColor = texture2D(uSampler, color);","}"]},b.PixelateFilter.prototype=Object.create(b.AbstractFilter.prototype),b.PixelateFilter.prototype.constructor=b.PixelateFilter,Object.defineProperty(b.PixelateFilter.prototype,"size",{get:function(){return this.uniforms.pixelSize.value},set:function(a){this.dirty=!0,this.uniforms.pixelSize.value=a}}),b.BlurXFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={blur:{type:"1f",value:1/512}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float blur;","uniform sampler2D uSampler;","void main(void) {","   vec4 sum = vec4(0.0);","   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;","   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;","   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;","   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;","   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;","   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;","   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;","   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;","   gl_FragColor = sum;","}"]},b.BlurXFilter.prototype=Object.create(b.AbstractFilter.prototype),b.BlurXFilter.prototype.constructor=b.BlurXFilter,Object.defineProperty(b.BlurXFilter.prototype,"blur",{get:function(){return this.uniforms.blur.value/(1/7e3)},set:function(a){this.dirty=!0,this.uniforms.blur.value=1/7e3*a}}),b.BlurYFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={blur:{type:"1f",value:1/512}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float blur;","uniform sampler2D uSampler;","void main(void) {","   vec4 sum = vec4(0.0);","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;","   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;","   gl_FragColor = sum;","}"]},b.BlurYFilter.prototype=Object.create(b.AbstractFilter.prototype),b.BlurYFilter.prototype.constructor=b.BlurYFilter,Object.defineProperty(b.BlurYFilter.prototype,"blur",{get:function(){return this.uniforms.blur.value/(1/7e3)},set:function(a){this.uniforms.blur.value=1/7e3*a}}),b.BlurFilter=function(){this.blurXFilter=new b.BlurXFilter,this.blurYFilter=new b.BlurYFilter,this.passes=[this.blurXFilter,this.blurYFilter]},b.BlurFilter.prototype=Object.create(b.AbstractFilter.prototype),b.BlurFilter.prototype.constructor=b.BlurFilter,Object.defineProperty(b.BlurFilter.prototype,"blur",{get:function(){return this.blurXFilter.blur},set:function(a){this.blurXFilter.blur=this.blurYFilter.blur=a}}),Object.defineProperty(b.BlurFilter.prototype,"blurX",{get:function(){return this.blurXFilter.blur},set:function(a){this.blurXFilter.blur=a}}),Object.defineProperty(b.BlurFilter.prototype,"blurY",{get:function(){return this.blurYFilter.blur},set:function(a){this.blurYFilter.blur=a}}),b.InvertFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={invert:{type:"1f",value:1}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float invert;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord);","   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);","}"]},b.InvertFilter.prototype=Object.create(b.AbstractFilter.prototype),b.InvertFilter.prototype.constructor=b.InvertFilter,Object.defineProperty(b.InvertFilter.prototype,"invert",{get:function(){return this.uniforms.invert.value},set:function(a){this.uniforms.invert.value=a}}),b.SepiaFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={sepia:{type:"1f",value:1}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float sepia;","uniform sampler2D uSampler;","const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord);","   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);","}"]},b.SepiaFilter.prototype=Object.create(b.AbstractFilter.prototype),b.SepiaFilter.prototype.constructor=b.SepiaFilter,Object.defineProperty(b.SepiaFilter.prototype,"sepia",{get:function(){return this.uniforms.sepia.value},set:function(a){this.uniforms.sepia.value=a}}),b.TwistFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={radius:{type:"1f",value:.5},angle:{type:"1f",value:5},offset:{type:"2f",value:{x:.5,y:.5}}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform vec4 dimensions;","uniform sampler2D uSampler;","uniform float radius;","uniform float angle;","uniform vec2 offset;","void main(void) {","   vec2 coord = vTextureCoord - offset;","   float distance = length(coord);","   if (distance < radius) {","       float ratio = (radius - distance) / radius;","       float angleMod = ratio * ratio * angle;","       float s = sin(angleMod);","       float c = cos(angleMod);","       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);","   }","   gl_FragColor = texture2D(uSampler, coord+offset);","}"]},b.TwistFilter.prototype=Object.create(b.AbstractFilter.prototype),b.TwistFilter.prototype.constructor=b.TwistFilter,Object.defineProperty(b.TwistFilter.prototype,"offset",{get:function(){return this.uniforms.offset.value},set:function(a){this.dirty=!0,this.uniforms.offset.value=a}}),Object.defineProperty(b.TwistFilter.prototype,"radius",{get:function(){return this.uniforms.radius.value},set:function(a){this.dirty=!0,this.uniforms.radius.value=a}}),Object.defineProperty(b.TwistFilter.prototype,"angle",{get:function(){return this.uniforms.angle.value},set:function(a){this.dirty=!0,this.uniforms.angle.value=a}}),b.ColorStepFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={step:{type:"1f",value:5}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","uniform float step;","void main(void) {","   vec4 color = texture2D(uSampler, vTextureCoord);","   color = floor(color * step) / step;","   gl_FragColor = color;","}"]},b.ColorStepFilter.prototype=Object.create(b.AbstractFilter.prototype),b.ColorStepFilter.prototype.constructor=b.ColorStepFilter,Object.defineProperty(b.ColorStepFilter.prototype,"step",{get:function(){return this.uniforms.step.value},set:function(a){this.uniforms.step.value=a}}),b.DotScreenFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={scale:{type:"1f",value:1},angle:{type:"1f",value:5},dimensions:{type:"4fv",value:[0,0,0,0]}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform vec4 dimensions;","uniform sampler2D uSampler;","uniform float angle;","uniform float scale;","float pattern() {","   float s = sin(angle), c = cos(angle);","   vec2 tex = vTextureCoord * dimensions.xy;","   vec2 point = vec2(","       c * tex.x - s * tex.y,","       s * tex.x + c * tex.y","   ) * scale;","   return (sin(point.x) * sin(point.y)) * 4.0;","}","void main() {","   vec4 color = texture2D(uSampler, vTextureCoord);","   float average = (color.r + color.g + color.b) / 3.0;","   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);","}"]},b.DotScreenFilter.prototype=Object.create(b.AbstractFilter.prototype),b.DotScreenFilter.prototype.constructor=b.DotScreenFilter,Object.defineProperty(b.DotScreenFilter.prototype,"scale",{get:function(){return this.uniforms.scale.value},set:function(a){this.dirty=!0,this.uniforms.scale.value=a}}),Object.defineProperty(b.DotScreenFilter.prototype,"angle",{get:function(){return this.uniforms.angle.value},set:function(a){this.dirty=!0,this.uniforms.angle.value=a}}),b.CrossHatchFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={blur:{type:"1f",value:1/512}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform float blur;","uniform sampler2D uSampler;","void main(void) {","    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);","    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);","    if (lum < 1.00) {","        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {","            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);","        }","    }","    if (lum < 0.75) {","        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {","            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);","        }","    }","    if (lum < 0.50) {","        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {","            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);","        }","    }","    if (lum < 0.3) {","        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {","            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);","        }","    }","}"]},b.CrossHatchFilter.prototype=Object.create(b.AbstractFilter.prototype),b.CrossHatchFilter.prototype.constructor=b.CrossHatchFilter,Object.defineProperty(b.CrossHatchFilter.prototype,"blur",{get:function(){return this.uniforms.blur.value/(1/7e3)},set:function(a){this.uniforms.blur.value=1/7e3*a}}),b.RGBSplitFilter=function(){b.AbstractFilter.call(this),this.passes=[this],this.uniforms={red:{type:"2f",value:{x:20,y:20}},green:{type:"2f",value:{x:-20,y:20}},blue:{type:"2f",value:{x:20,y:-20}},dimensions:{type:"4fv",value:[0,0,0,0]}},this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform vec2 red;","uniform vec2 green;","uniform vec2 blue;","uniform vec4 dimensions;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;","   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;","   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;","   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;","}"]},b.RGBSplitFilter.prototype=Object.create(b.AbstractFilter.prototype),b.RGBSplitFilter.prototype.constructor=b.RGBSplitFilter,Object.defineProperty(b.RGBSplitFilter.prototype,"red",{get:function(){return this.uniforms.red.value},set:function(a){this.uniforms.red.value=a}}),Object.defineProperty(b.RGBSplitFilter.prototype,"green",{get:function(){return this.uniforms.green.value},set:function(a){this.uniforms.green.value=a}}),Object.defineProperty(b.RGBSplitFilter.prototype,"blue",{get:function(){return this.uniforms.blue.value},set:function(a){this.uniforms.blue.value=a}}),"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=b),exports.PIXI=b):"undefined"!=typeof define&&define.amd?define(b):a.PIXI=b}).call(this);
/*
 html2canvas 0.5.0-alpha2 <http://html2canvas.hertzen.com>
 Copyright (c) 2015 Niklas von Hertzen

 Released under MIT License
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.html2canvas=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    (function (process,global){
        /*!
         * @overview es6-promise - a tiny implementation of Promises/A+.
         * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
         * @license   Licensed under MIT license
         *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
         * @version   2.0.1
         */

        (function() {
            "use strict";

            function $$utils$$objectOrFunction(x) {
                return typeof x === 'function' || (typeof x === 'object' && x !== null);
            }

            function $$utils$$isFunction(x) {
                return typeof x === 'function';
            }

            function $$utils$$isMaybeThenable(x) {
                return typeof x === 'object' && x !== null;
            }

            var $$utils$$_isArray;

            if (!Array.isArray) {
                $$utils$$_isArray = function (x) {
                    return Object.prototype.toString.call(x) === '[object Array]';
                };
            } else {
                $$utils$$_isArray = Array.isArray;
            }

            var $$utils$$isArray = $$utils$$_isArray;
            var $$utils$$now = Date.now || function() { return new Date().getTime(); };
            function $$utils$$F() { }

            var $$utils$$o_create = (Object.create || function (o) {
                if (arguments.length > 1) {
                    throw new Error('Second argument not supported');
                }
                if (typeof o !== 'object') {
                    throw new TypeError('Argument must be an object');
                }
                $$utils$$F.prototype = o;
                return new $$utils$$F();
            });

            var $$asap$$len = 0;

            var $$asap$$default = function asap(callback, arg) {
                $$asap$$queue[$$asap$$len] = callback;
                $$asap$$queue[$$asap$$len + 1] = arg;
                $$asap$$len += 2;
                if ($$asap$$len === 2) {
                    // If len is 1, that means that we need to schedule an async flush.
                    // If additional callbacks are queued before the queue is flushed, they
                    // will be processed by this flush that we are scheduling.
                    $$asap$$scheduleFlush();
                }
            };

            var $$asap$$browserGlobal = (typeof window !== 'undefined') ? window : {};
            var $$asap$$BrowserMutationObserver = $$asap$$browserGlobal.MutationObserver || $$asap$$browserGlobal.WebKitMutationObserver;

            // test for web worker but not in IE10
            var $$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
                typeof importScripts !== 'undefined' &&
                typeof MessageChannel !== 'undefined';

            // node
            function $$asap$$useNextTick() {
                return function() {
                    process.nextTick($$asap$$flush);
                };
            }

            function $$asap$$useMutationObserver() {
                var iterations = 0;
                var observer = new $$asap$$BrowserMutationObserver($$asap$$flush);
                var node = document.createTextNode('');
                observer.observe(node, { characterData: true });

                return function() {
                    node.data = (iterations = ++iterations % 2);
                };
            }

            // web worker
            function $$asap$$useMessageChannel() {
                var channel = new MessageChannel();
                channel.port1.onmessage = $$asap$$flush;
                return function () {
                    channel.port2.postMessage(0);
                };
            }

            function $$asap$$useSetTimeout() {
                return function() {
                    setTimeout($$asap$$flush, 1);
                };
            }

            var $$asap$$queue = new Array(1000);

            function $$asap$$flush() {
                for (var i = 0; i < $$asap$$len; i+=2) {
                    var callback = $$asap$$queue[i];
                    var arg = $$asap$$queue[i+1];

                    callback(arg);

                    $$asap$$queue[i] = undefined;
                    $$asap$$queue[i+1] = undefined;
                }

                $$asap$$len = 0;
            }

            var $$asap$$scheduleFlush;

            // Decide what async method to use to triggering processing of queued callbacks:
            if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
                $$asap$$scheduleFlush = $$asap$$useNextTick();
            } else if ($$asap$$BrowserMutationObserver) {
                $$asap$$scheduleFlush = $$asap$$useMutationObserver();
            } else if ($$asap$$isWorker) {
                $$asap$$scheduleFlush = $$asap$$useMessageChannel();
            } else {
                $$asap$$scheduleFlush = $$asap$$useSetTimeout();
            }

            function $$$internal$$noop() {}
            var $$$internal$$PENDING   = void 0;
            var $$$internal$$FULFILLED = 1;
            var $$$internal$$REJECTED  = 2;
            var $$$internal$$GET_THEN_ERROR = new $$$internal$$ErrorObject();

            function $$$internal$$selfFullfillment() {
                return new TypeError("You cannot resolve a promise with itself");
            }

            function $$$internal$$cannotReturnOwn() {
                return new TypeError('A promises callback cannot return that same promise.')
            }

            function $$$internal$$getThen(promise) {
                try {
                    return promise.then;
                } catch(error) {
                    $$$internal$$GET_THEN_ERROR.error = error;
                    return $$$internal$$GET_THEN_ERROR;
                }
            }

            function $$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
                try {
                    then.call(value, fulfillmentHandler, rejectionHandler);
                } catch(e) {
                    return e;
                }
            }

            function $$$internal$$handleForeignThenable(promise, thenable, then) {
                $$asap$$default(function(promise) {
                    var sealed = false;
                    var error = $$$internal$$tryThen(then, thenable, function(value) {
                        if (sealed) { return; }
                        sealed = true;
                        if (thenable !== value) {
                            $$$internal$$resolve(promise, value);
                        } else {
                            $$$internal$$fulfill(promise, value);
                        }
                    }, function(reason) {
                        if (sealed) { return; }
                        sealed = true;

                        $$$internal$$reject(promise, reason);
                    }, 'Settle: ' + (promise._label || ' unknown promise'));

                    if (!sealed && error) {
                        sealed = true;
                        $$$internal$$reject(promise, error);
                    }
                }, promise);
            }

            function $$$internal$$handleOwnThenable(promise, thenable) {
                if (thenable._state === $$$internal$$FULFILLED) {
                    $$$internal$$fulfill(promise, thenable._result);
                } else if (promise._state === $$$internal$$REJECTED) {
                    $$$internal$$reject(promise, thenable._result);
                } else {
                    $$$internal$$subscribe(thenable, undefined, function(value) {
                        $$$internal$$resolve(promise, value);
                    }, function(reason) {
                        $$$internal$$reject(promise, reason);
                    });
                }
            }

            function $$$internal$$handleMaybeThenable(promise, maybeThenable) {
                if (maybeThenable.constructor === promise.constructor) {
                    $$$internal$$handleOwnThenable(promise, maybeThenable);
                } else {
                    var then = $$$internal$$getThen(maybeThenable);

                    if (then === $$$internal$$GET_THEN_ERROR) {
                        $$$internal$$reject(promise, $$$internal$$GET_THEN_ERROR.error);
                    } else if (then === undefined) {
                        $$$internal$$fulfill(promise, maybeThenable);
                    } else if ($$utils$$isFunction(then)) {
                        $$$internal$$handleForeignThenable(promise, maybeThenable, then);
                    } else {
                        $$$internal$$fulfill(promise, maybeThenable);
                    }
                }
            }

            function $$$internal$$resolve(promise, value) {
                if (promise === value) {
                    $$$internal$$reject(promise, $$$internal$$selfFullfillment());
                } else if ($$utils$$objectOrFunction(value)) {
                    $$$internal$$handleMaybeThenable(promise, value);
                } else {
                    $$$internal$$fulfill(promise, value);
                }
            }

            function $$$internal$$publishRejection(promise) {
                if (promise._onerror) {
                    promise._onerror(promise._result);
                }

                $$$internal$$publish(promise);
            }

            function $$$internal$$fulfill(promise, value) {
                if (promise._state !== $$$internal$$PENDING) { return; }

                promise._result = value;
                promise._state = $$$internal$$FULFILLED;

                if (promise._subscribers.length === 0) {
                } else {
                    $$asap$$default($$$internal$$publish, promise);
                }
            }

            function $$$internal$$reject(promise, reason) {
                if (promise._state !== $$$internal$$PENDING) { return; }
                promise._state = $$$internal$$REJECTED;
                promise._result = reason;

                $$asap$$default($$$internal$$publishRejection, promise);
            }

            function $$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
                var subscribers = parent._subscribers;
                var length = subscribers.length;

                parent._onerror = null;

                subscribers[length] = child;
                subscribers[length + $$$internal$$FULFILLED] = onFulfillment;
                subscribers[length + $$$internal$$REJECTED]  = onRejection;

                if (length === 0 && parent._state) {
                    $$asap$$default($$$internal$$publish, parent);
                }
            }

            function $$$internal$$publish(promise) {
                var subscribers = promise._subscribers;
                var settled = promise._state;

                if (subscribers.length === 0) { return; }

                var child, callback, detail = promise._result;

                for (var i = 0; i < subscribers.length; i += 3) {
                    child = subscribers[i];
                    callback = subscribers[i + settled];

                    if (child) {
                        $$$internal$$invokeCallback(settled, child, callback, detail);
                    } else {
                        callback(detail);
                    }
                }

                promise._subscribers.length = 0;
            }

            function $$$internal$$ErrorObject() {
                this.error = null;
            }

            var $$$internal$$TRY_CATCH_ERROR = new $$$internal$$ErrorObject();

            function $$$internal$$tryCatch(callback, detail) {
                try {
                    return callback(detail);
                } catch(e) {
                    $$$internal$$TRY_CATCH_ERROR.error = e;
                    return $$$internal$$TRY_CATCH_ERROR;
                }
            }

            function $$$internal$$invokeCallback(settled, promise, callback, detail) {
                var hasCallback = $$utils$$isFunction(callback),
                    value, error, succeeded, failed;

                if (hasCallback) {
                    value = $$$internal$$tryCatch(callback, detail);

                    if (value === $$$internal$$TRY_CATCH_ERROR) {
                        failed = true;
                        error = value.error;
                        value = null;
                    } else {
                        succeeded = true;
                    }

                    if (promise === value) {
                        $$$internal$$reject(promise, $$$internal$$cannotReturnOwn());
                        return;
                    }

                } else {
                    value = detail;
                    succeeded = true;
                }

                if (promise._state !== $$$internal$$PENDING) {
                    // noop
                } else if (hasCallback && succeeded) {
                    $$$internal$$resolve(promise, value);
                } else if (failed) {
                    $$$internal$$reject(promise, error);
                } else if (settled === $$$internal$$FULFILLED) {
                    $$$internal$$fulfill(promise, value);
                } else if (settled === $$$internal$$REJECTED) {
                    $$$internal$$reject(promise, value);
                }
            }

            function $$$internal$$initializePromise(promise, resolver) {
                try {
                    resolver(function resolvePromise(value){
                        $$$internal$$resolve(promise, value);
                    }, function rejectPromise(reason) {
                        $$$internal$$reject(promise, reason);
                    });
                } catch(e) {
                    $$$internal$$reject(promise, e);
                }
            }

            function $$$enumerator$$makeSettledResult(state, position, value) {
                if (state === $$$internal$$FULFILLED) {
                    return {
                        state: 'fulfilled',
                        value: value
                    };
                } else {
                    return {
                        state: 'rejected',
                        reason: value
                    };
                }
            }

            function $$$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
                this._instanceConstructor = Constructor;
                this.promise = new Constructor($$$internal$$noop, label);
                this._abortOnReject = abortOnReject;

                if (this._validateInput(input)) {
                    this._input     = input;
                    this.length     = input.length;
                    this._remaining = input.length;

                    this._init();

                    if (this.length === 0) {
                        $$$internal$$fulfill(this.promise, this._result);
                    } else {
                        this.length = this.length || 0;
                        this._enumerate();
                        if (this._remaining === 0) {
                            $$$internal$$fulfill(this.promise, this._result);
                        }
                    }
                } else {
                    $$$internal$$reject(this.promise, this._validationError());
                }
            }

            $$$enumerator$$Enumerator.prototype._validateInput = function(input) {
                return $$utils$$isArray(input);
            };

            $$$enumerator$$Enumerator.prototype._validationError = function() {
                return new Error('Array Methods must be provided an Array');
            };

            $$$enumerator$$Enumerator.prototype._init = function() {
                this._result = new Array(this.length);
            };

            var $$$enumerator$$default = $$$enumerator$$Enumerator;

            $$$enumerator$$Enumerator.prototype._enumerate = function() {
                var length  = this.length;
                var promise = this.promise;
                var input   = this._input;

                for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
                    this._eachEntry(input[i], i);
                }
            };

            $$$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
                var c = this._instanceConstructor;
                if ($$utils$$isMaybeThenable(entry)) {
                    if (entry.constructor === c && entry._state !== $$$internal$$PENDING) {
                        entry._onerror = null;
                        this._settledAt(entry._state, i, entry._result);
                    } else {
                        this._willSettleAt(c.resolve(entry), i);
                    }
                } else {
                    this._remaining--;
                    this._result[i] = this._makeResult($$$internal$$FULFILLED, i, entry);
                }
            };

            $$$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
                var promise = this.promise;

                if (promise._state === $$$internal$$PENDING) {
                    this._remaining--;

                    if (this._abortOnReject && state === $$$internal$$REJECTED) {
                        $$$internal$$reject(promise, value);
                    } else {
                        this._result[i] = this._makeResult(state, i, value);
                    }
                }

                if (this._remaining === 0) {
                    $$$internal$$fulfill(promise, this._result);
                }
            };

            $$$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
                return value;
            };

            $$$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
                var enumerator = this;

                $$$internal$$subscribe(promise, undefined, function(value) {
                    enumerator._settledAt($$$internal$$FULFILLED, i, value);
                }, function(reason) {
                    enumerator._settledAt($$$internal$$REJECTED, i, reason);
                });
            };

            var $$promise$all$$default = function all(entries, label) {
                return new $$$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
            };

            var $$promise$race$$default = function race(entries, label) {
                /*jshint validthis:true */
                var Constructor = this;

                var promise = new Constructor($$$internal$$noop, label);

                if (!$$utils$$isArray(entries)) {
                    $$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
                    return promise;
                }

                var length = entries.length;

                function onFulfillment(value) {
                    $$$internal$$resolve(promise, value);
                }

                function onRejection(reason) {
                    $$$internal$$reject(promise, reason);
                }

                for (var i = 0; promise._state === $$$internal$$PENDING && i < length; i++) {
                    $$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
                }

                return promise;
            };

            var $$promise$resolve$$default = function resolve(object, label) {
                /*jshint validthis:true */
                var Constructor = this;

                if (object && typeof object === 'object' && object.constructor === Constructor) {
                    return object;
                }

                var promise = new Constructor($$$internal$$noop, label);
                $$$internal$$resolve(promise, object);
                return promise;
            };

            var $$promise$reject$$default = function reject(reason, label) {
                /*jshint validthis:true */
                var Constructor = this;
                var promise = new Constructor($$$internal$$noop, label);
                $$$internal$$reject(promise, reason);
                return promise;
            };

            var $$es6$promise$promise$$counter = 0;

            function $$es6$promise$promise$$needsResolver() {
                throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
            }

            function $$es6$promise$promise$$needsNew() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
            }

            var $$es6$promise$promise$$default = $$es6$promise$promise$$Promise;

            /**
             Promise objects represent the eventual result of an asynchronous operation. The
             primary way of interacting with a promise is through its `then` method, which
             registers callbacks to receive either a promise’s eventual value or the reason
             why the promise cannot be fulfilled.

             Terminology
             -----------

             - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
             - `thenable` is an object or function that defines a `then` method.
             - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
             - `exception` is a value that is thrown using the throw statement.
             - `reason` is a value that indicates why a promise was rejected.
             - `settled` the final resting state of a promise, fulfilled or rejected.

             A promise can be in one of three states: pending, fulfilled, or rejected.

             Promises that are fulfilled have a fulfillment value and are in the fulfilled
             state.  Promises that are rejected have a rejection reason and are in the
             rejected state.  A fulfillment value is never a thenable.

             Promises can also be said to *resolve* a value.  If this value is also a
             promise, then the original promise's settled state will match the value's
             settled state.  So a promise that *resolves* a promise that rejects will
             itself reject, and a promise that *resolves* a promise that fulfills will
             itself fulfill.


             Basic Usage:
             ------------

             ```js
             var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

             promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
             ```

             Advanced Usage:
             ---------------

             Promises shine when abstracting away asynchronous interactions such as
             `XMLHttpRequest`s.

             ```js
             function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

             getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
             ```

             Unlike callbacks, promises are great composable primitives.

             ```js
             Promise.all([
             getJSON('/posts'),
             getJSON('/comments')
             ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
             ```

             @class Promise
             @param {function} resolver
             Useful for tooling.
             @constructor
             */
            function $$es6$promise$promise$$Promise(resolver) {
                this._id = $$es6$promise$promise$$counter++;
                this._state = undefined;
                this._result = undefined;
                this._subscribers = [];

                if ($$$internal$$noop !== resolver) {
                    if (!$$utils$$isFunction(resolver)) {
                        $$es6$promise$promise$$needsResolver();
                    }

                    if (!(this instanceof $$es6$promise$promise$$Promise)) {
                        $$es6$promise$promise$$needsNew();
                    }

                    $$$internal$$initializePromise(this, resolver);
                }
            }

            $$es6$promise$promise$$Promise.all = $$promise$all$$default;
            $$es6$promise$promise$$Promise.race = $$promise$race$$default;
            $$es6$promise$promise$$Promise.resolve = $$promise$resolve$$default;
            $$es6$promise$promise$$Promise.reject = $$promise$reject$$default;

            $$es6$promise$promise$$Promise.prototype = {
                constructor: $$es6$promise$promise$$Promise,

                /**
                 The primary way of interacting with a promise is through its `then` method,
                 which registers callbacks to receive either a promise's eventual value or the
                 reason why the promise cannot be fulfilled.

                 ```js
                 findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
                 ```

                 Chaining
                 --------

                 The return value of `then` is itself a promise.  This second, 'downstream'
                 promise is resolved with the return value of the first promise's fulfillment
                 or rejection handler, or rejected if the handler throws an exception.

                 ```js
                 findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

                 findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
                 ```
                 If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

                 ```js
                 findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
                 ```

                 Assimilation
                 ------------

                 Sometimes the value you want to propagate to a downstream promise can only be
                 retrieved asynchronously. This can be achieved by returning a promise in the
                 fulfillment or rejection handler. The downstream promise will then be pending
                 until the returned promise is settled. This is called *assimilation*.

                 ```js
                 findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
                 ```

                 If the assimliated promise rejects, then the downstream promise will also reject.

                 ```js
                 findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
                 ```

                 Simple Example
                 --------------

                 Synchronous Example

                 ```javascript
                 var result;

                 try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
                 ```

                 Errback Example

                 ```js
                 findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
                 ```

                 Promise Example;

                 ```javascript
                 findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
                 ```

                 Advanced Example
                 --------------

                 Synchronous Example

                 ```javascript
                 var author, books;

                 try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
                 ```

                 Errback Example

                 ```js

                 function foundBooks(books) {

      }

                 function failure(reason) {

      }

                 findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
                 ```

                 Promise Example;

                 ```javascript
                 findAuthor().
                 then(findBooksByAuthor).
                 then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
                 ```

                 @method then
                 @param {Function} onFulfilled
                 @param {Function} onRejected
                 Useful for tooling.
                 @return {Promise}
                 */
                then: function(onFulfillment, onRejection) {
                    var parent = this;
                    var state = parent._state;

                    if (state === $$$internal$$FULFILLED && !onFulfillment || state === $$$internal$$REJECTED && !onRejection) {
                        return this;
                    }

                    var child = new this.constructor($$$internal$$noop);
                    var result = parent._result;

                    if (state) {
                        var callback = arguments[state - 1];
                        $$asap$$default(function(){
                            $$$internal$$invokeCallback(state, child, callback, result);
                        });
                    } else {
                        $$$internal$$subscribe(parent, child, onFulfillment, onRejection);
                    }

                    return child;
                },

                /**
                 `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
                 as the catch block of a try/catch statement.

                 ```js
                 function findAuthor(){
        throw new Error('couldn't find that author');
      }

                 // synchronous
                 try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

                 // async with promises
                 findAuthor().catch(function(reason){
        // something went wrong
      });
                 ```

                 @method catch
                 @param {Function} onRejection
                 Useful for tooling.
                 @return {Promise}
                 */
                'catch': function(onRejection) {
                    return this.then(null, onRejection);
                }
            };

            var $$es6$promise$polyfill$$default = function polyfill() {
                var local;

                if (typeof global !== 'undefined') {
                    local = global;
                } else if (typeof window !== 'undefined' && window.document) {
                    local = window;
                } else {
                    local = self;
                }

                var es6PromiseSupport =
                    "Promise" in local &&
                        // Some of these methods are missing from
                        // Firefox/Chrome experimental implementations
                    "resolve" in local.Promise &&
                    "reject" in local.Promise &&
                    "all" in local.Promise &&
                    "race" in local.Promise &&
                        // Older version of the spec had a resolver object
                        // as the arg rather than a function
                    (function() {
                        var resolve;
                        new local.Promise(function(r) { resolve = r; });
                        return $$utils$$isFunction(resolve);
                    }());

                if (!es6PromiseSupport) {
                    local.Promise = $$es6$promise$promise$$default;
                }
            };

            var es6$promise$umd$$ES6Promise = {
                'Promise': $$es6$promise$promise$$default,
                'polyfill': $$es6$promise$polyfill$$default
            };

            /* global define:true module:true window: true */
            if (typeof define === 'function' && define['amd']) {
                define(function() { return es6$promise$umd$$ES6Promise; });
            } else if (typeof module !== 'undefined' && module['exports']) {
                module['exports'] = es6$promise$umd$$ES6Promise;
            } else if (typeof this !== 'undefined') {
                this['ES6Promise'] = es6$promise$umd$$ES6Promise;
            }
        }).call(this);
    }).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":2}],2:[function(require,module,exports){
// shim for using process in browser

    var process = module.exports = {};
    var queue = [];
    var draining = false;

    function drainQueue() {
        if (draining) {
            return;
        }
        draining = true;
        var currentQueue;
        var len = queue.length;
        while(len) {
            currentQueue = queue;
            queue = [];
            var i = -1;
            while (++i < len) {
                currentQueue[i]();
            }
            len = queue.length;
        }
        draining = false;
    }
    process.nextTick = function (fun) {
        queue.push(fun);
        if (!draining) {
            setTimeout(drainQueue, 0);
        }
    };

    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

// TODO(shtylman)
    process.cwd = function () { return '/' };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
    (function (global){
        /*! http://mths.be/punycode v1.2.4 by @mathias */
        ;(function(root) {

            /** Detect free variables */
            var freeExports = typeof exports == 'object' && exports;
            var freeModule = typeof module == 'object' && module &&
                module.exports == freeExports && module;
            var freeGlobal = typeof global == 'object' && global;
            if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
                root = freeGlobal;
            }

            /**
             * The `punycode` object.
             * @name punycode
             * @type Object
             */
            var punycode,

                /** Highest positive signed 32-bit float value */
                maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

                /** Bootstring parameters */
                base = 36,
                tMin = 1,
                tMax = 26,
                skew = 38,
                damp = 700,
                initialBias = 72,
                initialN = 128, // 0x80
                delimiter = '-', // '\x2D'

                /** Regular expressions */
                regexPunycode = /^xn--/,
                regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
                regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

                /** Error messages */
                errors = {
                    'overflow': 'Overflow: input needs wider integers to process',
                    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                    'invalid-input': 'Invalid input'
                },

                /** Convenience shortcuts */
                baseMinusTMin = base - tMin,
                floor = Math.floor,
                stringFromCharCode = String.fromCharCode,

                /** Temporary variable */
                key;

            /*--------------------------------------------------------------------------*/

            /**
             * A generic error utility function.
             * @private
             * @param {String} type The error type.
             * @returns {Error} Throws a `RangeError` with the applicable error message.
             */
            function error(type) {
                throw RangeError(errors[type]);
            }

            /**
             * A generic `Array#map` utility function.
             * @private
             * @param {Array} array The array to iterate over.
             * @param {Function} callback The function that gets called for every array
             * item.
             * @returns {Array} A new array of values returned by the callback function.
             */
            function map(array, fn) {
                var length = array.length;
                while (length--) {
                    array[length] = fn(array[length]);
                }
                return array;
            }

            /**
             * A simple `Array#map`-like wrapper to work with domain name strings.
             * @private
             * @param {String} domain The domain name.
             * @param {Function} callback The function that gets called for every
             * character.
             * @returns {Array} A new string of characters returned by the callback
             * function.
             */
            function mapDomain(string, fn) {
                return map(string.split(regexSeparators), fn).join('.');
            }

            /**
             * Creates an array containing the numeric code points of each Unicode
             * character in the string. While JavaScript uses UCS-2 internally,
             * this function will convert a pair of surrogate halves (each of which
             * UCS-2 exposes as separate characters) into a single code point,
             * matching UTF-16.
             * @see `punycode.ucs2.encode`
             * @see <http://mathiasbynens.be/notes/javascript-encoding>
             * @memberOf punycode.ucs2
             * @name decode
             * @param {String} string The Unicode input string (UCS-2).
             * @returns {Array} The new array of code points.
             */
            function ucs2decode(string) {
                var output = [],
                    counter = 0,
                    length = string.length,
                    value,
                    extra;
                while (counter < length) {
                    value = string.charCodeAt(counter++);
                    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                        // high surrogate, and there is a next character
                        extra = string.charCodeAt(counter++);
                        if ((extra & 0xFC00) == 0xDC00) { // low surrogate
                            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                        } else {
                            // unmatched surrogate; only append this code unit, in case the next
                            // code unit is the high surrogate of a surrogate pair
                            output.push(value);
                            counter--;
                        }
                    } else {
                        output.push(value);
                    }
                }
                return output;
            }

            /**
             * Creates a string based on an array of numeric code points.
             * @see `punycode.ucs2.decode`
             * @memberOf punycode.ucs2
             * @name encode
             * @param {Array} codePoints The array of numeric code points.
             * @returns {String} The new Unicode string (UCS-2).
             */
            function ucs2encode(array) {
                return map(array, function(value) {
                    var output = '';
                    if (value > 0xFFFF) {
                        value -= 0x10000;
                        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                        value = 0xDC00 | value & 0x3FF;
                    }
                    output += stringFromCharCode(value);
                    return output;
                }).join('');
            }

            /**
             * Converts a basic code point into a digit/integer.
             * @see `digitToBasic()`
             * @private
             * @param {Number} codePoint The basic numeric code point value.
             * @returns {Number} The numeric value of a basic code point (for use in
             * representing integers) in the range `0` to `base - 1`, or `base` if
             * the code point does not represent a value.
             */
            function basicToDigit(codePoint) {
                if (codePoint - 48 < 10) {
                    return codePoint - 22;
                }
                if (codePoint - 65 < 26) {
                    return codePoint - 65;
                }
                if (codePoint - 97 < 26) {
                    return codePoint - 97;
                }
                return base;
            }

            /**
             * Converts a digit/integer into a basic code point.
             * @see `basicToDigit()`
             * @private
             * @param {Number} digit The numeric value of a basic code point.
             * @returns {Number} The basic code point whose value (when used for
             * representing integers) is `digit`, which needs to be in the range
             * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
             * used; else, the lowercase form is used. The behavior is undefined
             * if `flag` is non-zero and `digit` has no uppercase form.
             */
            function digitToBasic(digit, flag) {
                //  0..25 map to ASCII a..z or A..Z
                // 26..35 map to ASCII 0..9
                return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
            }

            /**
             * Bias adaptation function as per section 3.4 of RFC 3492.
             * http://tools.ietf.org/html/rfc3492#section-3.4
             * @private
             */
            function adapt(delta, numPoints, firstTime) {
                var k = 0;
                delta = firstTime ? floor(delta / damp) : delta >> 1;
                delta += floor(delta / numPoints);
                for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
                    delta = floor(delta / baseMinusTMin);
                }
                return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
            }

            /**
             * Converts a Punycode string of ASCII-only symbols to a string of Unicode
             * symbols.
             * @memberOf punycode
             * @param {String} input The Punycode string of ASCII-only symbols.
             * @returns {String} The resulting string of Unicode symbols.
             */
            function decode(input) {
                // Don't use UCS-2
                var output = [],
                    inputLength = input.length,
                    out,
                    i = 0,
                    n = initialN,
                    bias = initialBias,
                    basic,
                    j,
                    index,
                    oldi,
                    w,
                    k,
                    digit,
                    t,
                    /** Cached calculation results */
                    baseMinusT;

                // Handle the basic code points: let `basic` be the number of input code
                // points before the last delimiter, or `0` if there is none, then copy
                // the first basic code points to the output.

                basic = input.lastIndexOf(delimiter);
                if (basic < 0) {
                    basic = 0;
                }

                for (j = 0; j < basic; ++j) {
                    // if it's not a basic code point
                    if (input.charCodeAt(j) >= 0x80) {
                        error('not-basic');
                    }
                    output.push(input.charCodeAt(j));
                }

                // Main decoding loop: start just after the last delimiter if any basic code
                // points were copied; start at the beginning otherwise.

                for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

                    // `index` is the index of the next character to be consumed.
                    // Decode a generalized variable-length integer into `delta`,
                    // which gets added to `i`. The overflow checking is easier
                    // if we increase `i` as we go, then subtract off its starting
                    // value at the end to obtain `delta`.
                    for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

                        if (index >= inputLength) {
                            error('invalid-input');
                        }

                        digit = basicToDigit(input.charCodeAt(index++));

                        if (digit >= base || digit > floor((maxInt - i) / w)) {
                            error('overflow');
                        }

                        i += digit * w;
                        t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

                        if (digit < t) {
                            break;
                        }

                        baseMinusT = base - t;
                        if (w > floor(maxInt / baseMinusT)) {
                            error('overflow');
                        }

                        w *= baseMinusT;

                    }

                    out = output.length + 1;
                    bias = adapt(i - oldi, out, oldi == 0);

                    // `i` was supposed to wrap around from `out` to `0`,
                    // incrementing `n` each time, so we'll fix that now:
                    if (floor(i / out) > maxInt - n) {
                        error('overflow');
                    }

                    n += floor(i / out);
                    i %= out;

                    // Insert `n` at position `i` of the output
                    output.splice(i++, 0, n);

                }

                return ucs2encode(output);
            }

            /**
             * Converts a string of Unicode symbols to a Punycode string of ASCII-only
             * symbols.
             * @memberOf punycode
             * @param {String} input The string of Unicode symbols.
             * @returns {String} The resulting Punycode string of ASCII-only symbols.
             */
            function encode(input) {
                var n,
                    delta,
                    handledCPCount,
                    basicLength,
                    bias,
                    j,
                    m,
                    q,
                    k,
                    t,
                    currentValue,
                    output = [],
                    /** `inputLength` will hold the number of code points in `input`. */
                    inputLength,
                    /** Cached calculation results */
                    handledCPCountPlusOne,
                    baseMinusT,
                    qMinusT;

                // Convert the input in UCS-2 to Unicode
                input = ucs2decode(input);

                // Cache the length
                inputLength = input.length;

                // Initialize the state
                n = initialN;
                delta = 0;
                bias = initialBias;

                // Handle the basic code points
                for (j = 0; j < inputLength; ++j) {
                    currentValue = input[j];
                    if (currentValue < 0x80) {
                        output.push(stringFromCharCode(currentValue));
                    }
                }

                handledCPCount = basicLength = output.length;

                // `handledCPCount` is the number of code points that have been handled;
                // `basicLength` is the number of basic code points.

                // Finish the basic string - if it is not empty - with a delimiter
                if (basicLength) {
                    output.push(delimiter);
                }

                // Main encoding loop:
                while (handledCPCount < inputLength) {

                    // All non-basic code points < n have been handled already. Find the next
                    // larger one:
                    for (m = maxInt, j = 0; j < inputLength; ++j) {
                        currentValue = input[j];
                        if (currentValue >= n && currentValue < m) {
                            m = currentValue;
                        }
                    }

                    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
                    // but guard against overflow
                    handledCPCountPlusOne = handledCPCount + 1;
                    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                        error('overflow');
                    }

                    delta += (m - n) * handledCPCountPlusOne;
                    n = m;

                    for (j = 0; j < inputLength; ++j) {
                        currentValue = input[j];

                        if (currentValue < n && ++delta > maxInt) {
                            error('overflow');
                        }

                        if (currentValue == n) {
                            // Represent delta as a generalized variable-length integer
                            for (q = delta, k = base; /* no condition */; k += base) {
                                t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                                if (q < t) {
                                    break;
                                }
                                qMinusT = q - t;
                                baseMinusT = base - t;
                                output.push(
                                    stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                                );
                                q = floor(qMinusT / baseMinusT);
                            }

                            output.push(stringFromCharCode(digitToBasic(q, 0)));
                            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                            delta = 0;
                            ++handledCPCount;
                        }
                    }

                    ++delta;
                    ++n;

                }
                return output.join('');
            }

            /**
             * Converts a Punycode string representing a domain name to Unicode. Only the
             * Punycoded parts of the domain name will be converted, i.e. it doesn't
             * matter if you call it on a string that has already been converted to
             * Unicode.
             * @memberOf punycode
             * @param {String} domain The Punycode domain name to convert to Unicode.
             * @returns {String} The Unicode representation of the given Punycode
             * string.
             */
            function toUnicode(domain) {
                return mapDomain(domain, function(string) {
                    return regexPunycode.test(string)
                        ? decode(string.slice(4).toLowerCase())
                        : string;
                });
            }

            /**
             * Converts a Unicode string representing a domain name to Punycode. Only the
             * non-ASCII parts of the domain name will be converted, i.e. it doesn't
             * matter if you call it with a domain that's already in ASCII.
             * @memberOf punycode
             * @param {String} domain The domain name to convert, as a Unicode string.
             * @returns {String} The Punycode representation of the given domain name.
             */
            function toASCII(domain) {
                return mapDomain(domain, function(string) {
                    return regexNonASCII.test(string)
                        ? 'xn--' + encode(string)
                        : string;
                });
            }

            /*--------------------------------------------------------------------------*/

            /** Define the public API */
            punycode = {
                /**
                 * A string representing the current Punycode.js version number.
                 * @memberOf punycode
                 * @type String
                 */
                'version': '1.2.4',
                /**
                 * An object of methods to convert from JavaScript's internal character
                 * representation (UCS-2) to Unicode code points, and back.
                 * @see <http://mathiasbynens.be/notes/javascript-encoding>
                 * @memberOf punycode
                 * @type Object
                 */
                'ucs2': {
                    'decode': ucs2decode,
                    'encode': ucs2encode
                },
                'decode': decode,
                'encode': encode,
                'toASCII': toASCII,
                'toUnicode': toUnicode
            };

            /** Expose `punycode` */
            // Some AMD build optimizers, like r.js, check for specific condition patterns
            // like the following:
            if (
                typeof define == 'function' &&
                typeof define.amd == 'object' &&
                define.amd
            ) {
                define('punycode', function() {
                    return punycode;
                });
            } else if (freeExports && !freeExports.nodeType) {
                if (freeModule) { // in Node.js or RingoJS v0.8.0+
                    freeModule.exports = punycode;
                } else { // in Narwhal or RingoJS v0.7.0-
                    for (key in punycode) {
                        punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                    }
                }
            } else { // in Rhino or a web browser
                root.punycode = punycode;
            }

        }(this));

    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
    var log = require('./log');
    var Promise = require('./promise');

    var html2canvasCanvasCloneAttribute = "data-html2canvas-canvas-clone";
    var html2canvasCanvasCloneIndex = 0;

    function cloneNodeValues(document, clone, nodeName) {
        var originalNodes = document.getElementsByTagName(nodeName);
        var clonedNodes = clone.getElementsByTagName(nodeName);
        var count = originalNodes.length;
        for (var i = 0; i < count; i++) {
            clonedNodes[i].value = originalNodes[i].value;
        }
    }

    function restoreOwnerScroll(ownerDocument, x, y) {
        if (ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
            ownerDocument.defaultView.scrollTo(x, y);
        }
    }

    function labelCanvasElements(ownerDocument) {
        [].slice.call(ownerDocument.querySelectorAll("canvas"), 0).forEach(function(canvas) {
            canvas.setAttribute(html2canvasCanvasCloneAttribute, "canvas-" + html2canvasCanvasCloneIndex++);
        });
    }

    function cloneCanvasContents(ownerDocument, documentClone) {
        [].slice.call(ownerDocument.querySelectorAll("[" + html2canvasCanvasCloneAttribute + "]"), 0).forEach(function(canvas) {
            try {
                var clonedCanvas = documentClone.querySelector('[' + html2canvasCanvasCloneAttribute + '="' + canvas.getAttribute(html2canvasCanvasCloneAttribute) + '"]');
                if (clonedCanvas) {
                    clonedCanvas.width = canvas.width;
                    clonedCanvas.height = canvas.height;
                    clonedCanvas.getContext("2d").putImageData(canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                }
            } catch(e) {
                log("Unable to copy canvas content from", canvas, e);
            }
            canvas.removeAttribute(html2canvasCanvasCloneAttribute);
        });
    }

    function removeScriptNodes(parent) {
        [].slice.call(parent.childNodes, 0).filter(isElementNode).forEach(function(node) {
            if (node.tagName === "SCRIPT") {
                parent.removeChild(node);
            } else {
                removeScriptNodes(node);
            }
        });
        return parent;
    }

    function isIE9() {
        return document.documentMode && document.documentMode <= 9;
    }

// https://github.com/niklasvh/html2canvas/issues/503
    function cloneNodeIE9(node, javascriptEnabled) {
        var clone = node.nodeType === 3 ? document.createTextNode(node.nodeValue) : node.cloneNode(false);

        var child = node.firstChild;
        while(child) {
            if (javascriptEnabled === true || child.nodeType !== 1 || child.nodeName !== 'SCRIPT') {
                clone.appendChild(cloneNodeIE9(child, javascriptEnabled));
            }
            child = child.nextSibling;
        }

        return clone;
    }



    function isElementNode(node) {
        return node.nodeType === Node.ELEMENT_NODE;
    }

    module.exports = function(ownerDocument, containerDocument, width, height, options, x ,y) {
        labelCanvasElements(ownerDocument);
        var documentElement = isIE9() ? cloneNodeIE9(ownerDocument.documentElement, options.javascriptEnabled) : ownerDocument.documentElement.cloneNode(true);
        var container = containerDocument.createElement("iframe");

        container.className = "html2canvas-container";
        container.style.visibility = "hidden";
        container.style.position = "fixed";
        container.style.left = "-10000px";
        container.style.top = "0px";
        container.style.border = "0";
        container.width = width;
        container.height = height;
        container.scrolling = "no"; // ios won't scroll without it
        containerDocument.body.appendChild(container);

        return new Promise(function(resolve) {
            var documentClone = container.contentWindow.document;

            cloneNodeValues(ownerDocument.documentElement, documentElement, "textarea");
            cloneNodeValues(ownerDocument.documentElement, documentElement, "select");

            /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
             if window url is about:blank, we can assign the url to current by writing onto the document
             */
            container.contentWindow.onload = container.onload = function() {
                var interval = setInterval(function() {
                    if (documentClone.body.childNodes.length > 0) {
                        cloneCanvasContents(ownerDocument, documentClone);
                        clearInterval(interval);
                        if (options.type === "view") {
                            container.contentWindow.scrollTo(x, y);
                        }
                        resolve(container);
                    }
                }, 50);
            };

            documentClone.open();
            documentClone.write("<!DOCTYPE html><html></html>");
            // Chrome scrolls the parent document for some reason after the write to the cloned window???
            restoreOwnerScroll(ownerDocument, x, y);
            documentClone.replaceChild(options.javascriptEnabled === true ? documentClone.adoptNode(documentElement) : removeScriptNodes(documentClone.adoptNode(documentElement)), documentClone.documentElement);
            documentClone.close();
        });
    };

},{"./log":15,"./promise":18}],5:[function(require,module,exports){
// http://dev.w3.org/csswg/css-color/

    function Color(value) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.a = null;
        var result = this.fromArray(value) ||
            this.namedColor(value) ||
            this.rgb(value) ||
            this.rgba(value) ||
            this.hex6(value) ||
            this.hex3(value);
    }

    Color.prototype.darken = function(amount) {
        var a = 1 - amount;
        return  new Color([
            Math.round(this.r * a),
            Math.round(this.g * a),
            Math.round(this.b * a),
            this.a
        ]);
    };

    Color.prototype.isTransparent = function() {
        return this.a === 0;
    };

    Color.prototype.isBlack = function() {
        return this.r === 0 && this.g === 0 && this.b === 0;
    };

    Color.prototype.fromArray = function(array) {
        if (Array.isArray(array)) {
            this.r = Math.min(array[0], 255);
            this.g = Math.min(array[1], 255);
            this.b = Math.min(array[2], 255);
            if (array.length > 3) {
                this.a = array[3];
            }
        }

        return (Array.isArray(array));
    };

    var _hex3 = /^#([a-f0-9]{3})$/i;

    Color.prototype.hex3 = function(value) {
        var match = null;
        if ((match = value.match(_hex3)) !== null) {
            this.r = parseInt(match[1][0] + match[1][0], 16);
            this.g = parseInt(match[1][1] + match[1][1], 16);
            this.b = parseInt(match[1][2] + match[1][2], 16);
        }
        return match !== null;
    };

    var _hex6 = /^#([a-f0-9]{6})$/i;

    Color.prototype.hex6 = function(value) {
        var match = null;
        if ((match = value.match(_hex6)) !== null) {
            this.r = parseInt(match[1].substring(0, 2), 16);
            this.g = parseInt(match[1].substring(2, 4), 16);
            this.b = parseInt(match[1].substring(4, 6), 16);
        }
        return match !== null;
    };


    var _rgb = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;

    Color.prototype.rgb = function(value) {
        var match = null;
        if ((match = value.match(_rgb)) !== null) {
            this.r = Number(match[1]);
            this.g = Number(match[2]);
            this.b = Number(match[3]);
        }
        return match !== null;
    };

    var _rgba = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;

    Color.prototype.rgba = function(value) {
        var match = null;
        if ((match = value.match(_rgba)) !== null) {
            this.r = Number(match[1]);
            this.g = Number(match[2]);
            this.b = Number(match[3]);
            this.a = Number(match[4]);
        }
        return match !== null;
    };

    Color.prototype.toString = function() {
        return this.a !== null && this.a !== 1 ?
        "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" :
        "rgb(" + [this.r, this.g, this.b].join(",") + ")";
    };

    Color.prototype.namedColor = function(value) {
        var color = colors[value.toLowerCase()];
        if (color) {
            this.r = color[0];
            this.g = color[1];
            this.b = color[2];
        } else if (value.toLowerCase() === "transparent") {
            this.r = this.g = this.b = this.a = 0;
            return true;
        }

        return !!color;
    };

    Color.prototype.isColor = true;

// JSON.stringify([].slice.call($$('.named-color-table tr'), 1).map(function(row) { return [row.childNodes[3].textContent, row.childNodes[5].textContent.trim().split(",").map(Number)] }).reduce(function(data, row) {data[row[0]] = row[1]; return data}, {}))
    var colors = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
    };

    module.exports = Color;

},{}],6:[function(require,module,exports){
    var Promise = require('./promise');
    var Support = require('./support');
    var CanvasRenderer = require('./renderers/canvas');
    var ImageLoader = require('./imageloader');
    var NodeParser = require('./nodeparser');
    var NodeContainer = require('./nodecontainer');
    var log = require('./log');
    var utils = require('./utils');
    var createWindowClone = require('./clone');
    var loadUrlDocument = require('./proxy').loadUrlDocument;
    var getBounds = utils.getBounds;

    var html2canvasNodeAttribute = "data-html2canvas-node";
    var html2canvasCloneIndex = 0;

    function html2canvas(nodeList, options) {
        var index = html2canvasCloneIndex++;
        options = options || {};
        if (options.logging) {
            window.html2canvas.logging = true;
            window.html2canvas.start = Date.now();
        }

        options.async = typeof(options.async) === "undefined" ? true : options.async;
        options.allowTaint = typeof(options.allowTaint) === "undefined" ? false : options.allowTaint;
        options.removeContainer = typeof(options.removeContainer) === "undefined" ? true : options.removeContainer;
        options.javascriptEnabled = typeof(options.javascriptEnabled) === "undefined" ? false : options.javascriptEnabled;
        options.imageTimeout = typeof(options.imageTimeout) === "undefined" ? 10000 : options.imageTimeout;
        options.renderer = typeof(options.renderer) === "function" ? options.renderer : CanvasRenderer;
        options.strict = !!options.strict;

        if (typeof(nodeList) === "string") {
            if (typeof(options.proxy) !== "string") {
                return Promise.reject("Proxy must be used when rendering url");
            }
            var width = options.width != null ? options.width : window.innerWidth;
            var height = options.height != null ? options.height : window.innerHeight;
            return loadUrlDocument(absoluteUrl(nodeList), options.proxy, document, width, height, options).then(function(container) {
                return renderWindow(container.contentWindow.document.documentElement, container, options, width, height);
            });
        }

        var node = ((nodeList === undefined) ? [document.documentElement] : ((nodeList.length) ? nodeList : [nodeList]))[0];
        node.setAttribute(html2canvasNodeAttribute + index, index);
        return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
            if (typeof(options.onrendered) === "function") {
                log("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas");
                options.onrendered(canvas);
            }
            return canvas;
        });
    }

    html2canvas.Promise = Promise;
    html2canvas.CanvasRenderer = CanvasRenderer;
    html2canvas.NodeContainer = NodeContainer;
    html2canvas.log = log;
    html2canvas.utils = utils;

    module.exports = (typeof(document) === "undefined" || typeof(Object.create) !== "function" || typeof(document.createElement("canvas").getContext) !== "function") ? function() {
        return Promise.reject("No canvas support");
    } : html2canvas;

    function renderDocument(document, options, windowWidth, windowHeight, html2canvasIndex) {
        return createWindowClone(document, document, windowWidth, windowHeight, options, document.defaultView.pageXOffset, document.defaultView.pageYOffset).then(function(container) {
            log("Document cloned");
            var attributeName = html2canvasNodeAttribute + html2canvasIndex;
            var selector = "[" + attributeName + "='" + html2canvasIndex + "']";
            document.querySelector(selector).removeAttribute(attributeName);
            var clonedWindow = container.contentWindow;
            var node = clonedWindow.document.querySelector(selector);
            node.style.opacity === "0" && node.getAttribute('renderer') === "webgl" ? node.style.opacity = 1 : null;
            var oncloneHandler = (typeof(options.onclone) === "function") ? Promise.resolve(options.onclone(clonedWindow.document)) : Promise.resolve(true);
            return oncloneHandler.then(function() {
                return renderWindow(node, container, options, windowWidth, windowHeight);
            });
        });
    }

    function renderWindow(node, container, options, windowWidth, windowHeight) {
        var clonedWindow = container.contentWindow;
        var support = new Support(clonedWindow.document);
        var imageLoader = new ImageLoader(options, support);
        var bounds = getBounds(node);
        var width = options.type === "view" ? windowWidth : documentWidth(clonedWindow.document);
        var height = options.type === "view" ? windowHeight : documentHeight(clonedWindow.document);
        var renderer = new options.renderer(width, height, imageLoader, options, document);
        var parser = new NodeParser(node, renderer, support, imageLoader, options);
        return parser.ready.then(function() {
            log("Finished rendering");
            var canvas;

            if (options.type === "view") {
                canvas = crop(renderer.canvas, {width: renderer.canvas.width, height: renderer.canvas.height, top: 0, left: 0, x: 0, y: 0});
            } else if (node === clonedWindow.document.body || node === clonedWindow.document.documentElement || options.canvas != null) {
                canvas = renderer.canvas;
            } else {
                canvas = crop(renderer.canvas, {width:  options.width != null ? options.width : bounds.width, height: options.height != null ? options.height : bounds.height, top: bounds.top, left: bounds.left, x: clonedWindow.pageXOffset, y: clonedWindow.pageYOffset});
            }

            cleanupContainer(container, options);
            return canvas;
        });
    }

    function cleanupContainer(container, options) {
        if (options.removeContainer) {
            container.parentNode.removeChild(container);
            log("Cleaned up container");
        }
    }

    function crop(canvas, bounds) {
        var croppedCanvas = document.createElement("canvas");
        var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
        var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
        var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
        var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
        croppedCanvas.width = bounds.width;
        croppedCanvas.height =  bounds.height;
        log("Cropping canvas at:", "left:", bounds.left, "top:", bounds.top, "width:", (x2-x1), "height:", (y2-y1));
        log("Resulting crop with width", bounds.width, "and height", bounds.height, " with x", x1, "and y", y1);
        croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, x2-x1, y2-y1, bounds.x, bounds.y, x2-x1, y2-y1);
        return croppedCanvas;
    }

    function documentWidth (doc) {
        return Math.max(
            Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
            Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
            Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
        );
    }

    function documentHeight (doc) {
        return Math.max(
            Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
            Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
            Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
        );
    }

    function absoluteUrl(url) {
        var link = document.createElement("a");
        link.href = url;
        link.href = link.href;
        return link;
    }

},{"./clone":4,"./imageloader":13,"./log":15,"./nodecontainer":16,"./nodeparser":17,"./promise":18,"./proxy":19,"./renderers/canvas":23,"./support":25,"./utils":29}],7:[function(require,module,exports){
    var Promise = require('./promise');
    var log = require('./log');
    var smallImage = require('./utils').smallImage;

    function DummyImageContainer(src) {
        this.src = src;
        log("DummyImageContainer for", src);
        if (!this.promise || !this.image) {
            log("Initiating DummyImageContainer");
            DummyImageContainer.prototype.image = new Image();
            var image = this.image;
            DummyImageContainer.prototype.promise = new Promise(function(resolve, reject) {
                image.onload = resolve;
                image.onerror = reject;
                image.src = smallImage();
                if (image.complete === true) {
                    resolve(image);
                }
            });
        }
    }

    module.exports = DummyImageContainer;

},{"./log":15,"./promise":18,"./utils":29}],8:[function(require,module,exports){
    var smallImage = require('./utils').smallImage;

    function Font(family, size) {
        var container = document.createElement('div'),
            img = document.createElement('img'),
            span = document.createElement('span'),
            sampleText = 'Hidden Text',
            baseline,
            middle;

        container.style.visibility = "hidden";
        container.style.fontFamily = family;
        container.style.fontSize = size;
        container.style.margin = 0;
        container.style.padding = 0;

        document.body.appendChild(container);

        img.src = smallImage();
        img.width = 1;
        img.height = 1;

        img.style.margin = 0;
        img.style.padding = 0;
        img.style.verticalAlign = "baseline";

        span.style.fontFamily = family;
        span.style.fontSize = size;
        span.style.margin = 0;
        span.style.padding = 0;

        span.appendChild(document.createTextNode(sampleText));
        container.appendChild(span);
        container.appendChild(img);
        baseline = (img.offsetTop - span.offsetTop) + 1;

        container.removeChild(span);
        container.appendChild(document.createTextNode(sampleText));

        container.style.lineHeight = "normal";
        img.style.verticalAlign = "super";

        middle = (img.offsetTop-container.offsetTop) + 1;

        document.body.removeChild(container);

        this.baseline = baseline;
        this.lineWidth = 1;
        this.middle = middle;
    }

    module.exports = Font;

},{"./utils":29}],9:[function(require,module,exports){
    var Font = require('./font');

    function FontMetrics() {
        this.data = {};
    }

    FontMetrics.prototype.getMetrics = function(family, size) {
        if (this.data[family + "-" + size] === undefined) {
            this.data[family + "-" + size] = new Font(family, size);
        }
        return this.data[family + "-" + size];
    };

    module.exports = FontMetrics;

},{"./font":8}],10:[function(require,module,exports){
    var utils = require('./utils');
    var Promise = require('./promise');
    var getBounds = utils.getBounds;
    var loadUrlDocument = require('./proxy').loadUrlDocument;

    function FrameContainer(container, sameOrigin, options) {
        this.image = null;
        this.src = container;
        var self = this;
        var bounds = getBounds(container);
        this.promise = (!sameOrigin ? this.proxyLoad(options.proxy, bounds, options) : new Promise(function(resolve) {
            if (container.contentWindow.document.URL === "about:blank" || container.contentWindow.document.documentElement == null) {
                container.contentWindow.onload = container.onload = function() {
                    resolve(container);
                };
            } else {
                resolve(container);
            }
        })).then(function(container) {
                var html2canvas = require('./core');
                return html2canvas(container.contentWindow.document.documentElement, {type: 'view', width: container.width, height: container.height, proxy: options.proxy, javascriptEnabled: options.javascriptEnabled, removeContainer: options.removeContainer, allowTaint: options.allowTaint, imageTimeout: options.imageTimeout / 2});
            }).then(function(canvas) {
                return self.image = canvas;
            });
    }

    FrameContainer.prototype.proxyLoad = function(proxy, bounds, options) {
        var container = this.src;
        return loadUrlDocument(container.src, proxy, container.ownerDocument, bounds.width, bounds.height, options);
    };

    module.exports = FrameContainer;

},{"./core":6,"./promise":18,"./proxy":19,"./utils":29}],11:[function(require,module,exports){
    var Promise = require('./promise');

    function GradientContainer(imageData) {
        this.src = imageData.value;
        this.colorStops = [];
        this.type = null;
        this.x0 = 0.5;
        this.y0 = 0.5;
        this.x1 = 0.5;
        this.y1 = 0.5;
        this.promise = Promise.resolve(true);
    }

    GradientContainer.prototype.TYPES = {
        LINEAR: 1,
        RADIAL: 2
    };

    module.exports = GradientContainer;

},{"./promise":18}],12:[function(require,module,exports){
    var Promise = require('./promise');

    function ImageContainer(src, cors) {
        this.src = src;
        this.image = new Image();
        var self = this;
        this.tainted = null;
        this.promise = new Promise(function(resolve, reject) {
            self.image.onload = resolve;
            self.image.onerror = reject;
            if (cors) {
                self.image.crossOrigin = "anonymous";
            }
            self.image.src = src;
            if (self.image.complete === true) {
                resolve(self.image);
            }
        });
    }

    module.exports = ImageContainer;

},{"./promise":18}],13:[function(require,module,exports){
    var Promise = require('./promise');
    var log = require('./log');
    var ImageContainer = require('./imagecontainer');
    var DummyImageContainer = require('./dummyimagecontainer');
    var ProxyImageContainer = require('./proxyimagecontainer');
    var FrameContainer = require('./framecontainer');
    var SVGContainer = require('./svgcontainer');
    var SVGNodeContainer = require('./svgnodecontainer');
    var LinearGradientContainer = require('./lineargradientcontainer');
    var WebkitGradientContainer = require('./webkitgradientcontainer');
    var bind = require('./utils').bind;

    function ImageLoader(options, support) {
        this.link = null;
        this.options = options;
        this.support = support;
        this.origin = this.getOrigin(window.location.href);
    }

    ImageLoader.prototype.findImages = function(nodes) {
        var images = [];
        nodes.reduce(function(imageNodes, container) {
            switch(container.node.nodeName) {
                case "IMG":
                    return imageNodes.concat([{
                        args: [container.node.src],
                        method: "url"
                    }]);
                case "svg":
                case "IFRAME":
                    return imageNodes.concat([{
                        args: [container.node],
                        method: container.node.nodeName
                    }]);
            }
            return imageNodes;
        }, []).forEach(this.addImage(images, this.loadImage), this);
        return images;
    };

    ImageLoader.prototype.findBackgroundImage = function(images, container) {
        container.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(images, this.loadImage), this);
        return images;
    };

    ImageLoader.prototype.addImage = function(images, callback) {
        return function(newImage) {
            newImage.args.forEach(function(image) {
                if (!this.imageExists(images, image)) {
                    images.splice(0, 0, callback.call(this, newImage));
                    log('Added image #' + (images.length), typeof(image) === "string" ? image.substring(0, 100) : image);
                }
            }, this);
        };
    };

    ImageLoader.prototype.hasImageBackground = function(imageData) {
        return imageData.method !== "none";
    };

    ImageLoader.prototype.loadImage = function(imageData) {
        if (imageData.method === "url") {
            var src = imageData.args[0];
            if (this.isSVG(src) && !this.support.svg && !this.options.allowTaint) {
                return new SVGContainer(src);
            } else if (src.match(/data:image\/.*;base64,/i)) {
                return new ImageContainer(src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ''), false);
            } else if (this.isSameOrigin(src) || this.options.allowTaint === true || this.isSVG(src)) {
                return new ImageContainer(src, false);
            } else if (this.support.cors && !this.options.allowTaint && this.options.useCORS) {
                return new ImageContainer(src, true);
            } else if (this.options.proxy) {
                return new ProxyImageContainer(src, this.options.proxy);
            } else {
                return new DummyImageContainer(src);
            }
        } else if (imageData.method === "linear-gradient") {
            return new LinearGradientContainer(imageData);
        } else if (imageData.method === "gradient") {
            return new WebkitGradientContainer(imageData);
        } else if (imageData.method === "svg") {
            return new SVGNodeContainer(imageData.args[0], this.support.svg);
        } else if (imageData.method === "IFRAME") {
            return new FrameContainer(imageData.args[0], this.isSameOrigin(imageData.args[0].src), this.options);
        } else {
            return new DummyImageContainer(imageData);
        }
    };

    ImageLoader.prototype.isSVG = function(src) {
        return src.substring(src.length - 3).toLowerCase() === "svg" || SVGContainer.prototype.isInline(src);
    };

    ImageLoader.prototype.imageExists = function(images, src) {
        return images.some(function(image) {
            return image.src === src;
        });
    };

    ImageLoader.prototype.isSameOrigin = function(url) {
        return (this.getOrigin(url) === this.origin);
    };

    ImageLoader.prototype.getOrigin = function(url) {
        var link = this.link || (this.link = document.createElement("a"));
        link.href = url;
        link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
        return link.protocol + link.hostname + link.port;
    };

    ImageLoader.prototype.getPromise = function(container) {
        return this.timeout(container, this.options.imageTimeout)['catch'](function() {
            var dummy = new DummyImageContainer(container.src);
            return dummy.promise.then(function(image) {
                container.image = image;
            });
        });
    };

    ImageLoader.prototype.get = function(src) {
        var found = null;
        return this.images.some(function(img) {
            return (found = img).src === src;
        }) ? found : null;
    };

    ImageLoader.prototype.fetch = function(nodes) {
        this.images = nodes.reduce(bind(this.findBackgroundImage, this), this.findImages(nodes));
        this.images.forEach(function(image, index) {
            image.promise.then(function() {
                log("Succesfully loaded image #"+ (index+1), image);
            }, function(e) {
                log("Failed loading image #"+ (index+1), image, e);
            });
        });
        this.ready = Promise.all(this.images.map(this.getPromise, this));
        log("Finished searching images");
        return this;
    };

    ImageLoader.prototype.timeout = function(container, timeout) {
        var timer;
        var promise = Promise.race([container.promise, new Promise(function(res, reject) {
            timer = setTimeout(function() {
                log("Timed out loading image", container);
                reject(container);
            }, timeout);
        })]).then(function(container) {
            clearTimeout(timer);
            return container;
        });
        promise['catch'](function() {
            clearTimeout(timer);
        });
        return promise;
    };

    module.exports = ImageLoader;

},{"./dummyimagecontainer":7,"./framecontainer":10,"./imagecontainer":12,"./lineargradientcontainer":14,"./log":15,"./promise":18,"./proxyimagecontainer":20,"./svgcontainer":26,"./svgnodecontainer":27,"./utils":29,"./webkitgradientcontainer":30}],14:[function(require,module,exports){
    var GradientContainer = require('./gradientcontainer');
    var Color = require('./color');

    function LinearGradientContainer(imageData) {
        GradientContainer.apply(this, arguments);
        this.type = this.TYPES.LINEAR;

        var hasDirection = imageData.args[0].match(this.stepRegExp) === null;

        if (hasDirection) {
            imageData.args[0].split(" ").reverse().forEach(function(position) {
                switch(position) {
                    case "left":
                        this.x0 = 0;
                        this.x1 = 1;
                        break;
                    case "top":
                        this.y0 = 0;
                        this.y1 = 1;
                        break;
                    case "right":
                        this.x0 = 1;
                        this.x1 = 0;
                        break;
                    case "bottom":
                        this.y0 = 1;
                        this.y1 = 0;
                        break;
                    case "to":
                        var y0 = this.y0;
                        var x0 = this.x0;
                        this.y0 = this.y1;
                        this.x0 = this.x1;
                        this.x1 = x0;
                        this.y1 = y0;
                        break;
                }
            }, this);
        } else {
            this.y0 = 0;
            this.y1 = 1;
        }

        this.colorStops = imageData.args.slice(hasDirection ? 1 : 0).map(function(colorStop) {
            var colorStopMatch = colorStop.match(this.stepRegExp);
            return {
                color: new Color(colorStopMatch[1]),
                stop: colorStopMatch[3] === "%" ? colorStopMatch[2] / 100 : null
            };
        }, this);

        if (this.colorStops[0].stop === null) {
            this.colorStops[0].stop = 0;
        }

        if (this.colorStops[this.colorStops.length - 1].stop === null) {
            this.colorStops[this.colorStops.length - 1].stop = 1;
        }

        this.colorStops.forEach(function(colorStop, index) {
            if (colorStop.stop === null) {
                this.colorStops.slice(index).some(function(find, count) {
                    if (find.stop !== null) {
                        colorStop.stop = ((find.stop - this.colorStops[index - 1].stop) / (count + 1)) + this.colorStops[index - 1].stop;
                        return true;
                    } else {
                        return false;
                    }
                }, this);
            }
        }, this);
    }

    LinearGradientContainer.prototype = Object.create(GradientContainer.prototype);

    LinearGradientContainer.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/;

    module.exports = LinearGradientContainer;

},{"./color":5,"./gradientcontainer":11}],15:[function(require,module,exports){
    module.exports = function() {
        if (window.html2canvas.logging && window.console && window.console.log) {
            Function.prototype.bind.call(window.console.log, (window.console)).apply(window.console, [(Date.now() - window.html2canvas.start) + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)));
        }
    };

},{}],16:[function(require,module,exports){
    var Color = require('./color');
    var utils = require('./utils');
    var getBounds = utils.getBounds;
    var parseBackgrounds = utils.parseBackgrounds;
    var offsetBounds = utils.offsetBounds;

    function NodeContainer(node, parent) {
        this.node = node;
        this.parent = parent;
        this.stack = null;
        this.bounds = null;
        this.borders = null;
        this.clip = [];
        this.backgroundClip = [];
        this.offsetBounds = null;
        this.visible = null;
        this.computedStyles = null;
        this.colors = {};
        this.styles = {};
        this.backgroundImages = null;
        this.transformData = null;
        this.transformMatrix = null;
        this.isPseudoElement = false;
        this.opacity = null;
    }

    NodeContainer.prototype.cloneTo = function(stack) {
        stack.visible = this.visible;
        stack.borders = this.borders;
        stack.bounds = this.bounds;
        stack.clip = this.clip;
        stack.backgroundClip = this.backgroundClip;
        stack.computedStyles = this.computedStyles;
        stack.styles = this.styles;
        stack.backgroundImages = this.backgroundImages;
        stack.opacity = this.opacity;
    };

    NodeContainer.prototype.getOpacity = function() {
        return this.opacity === null ? (this.opacity = this.cssFloat('opacity')) : this.opacity;
    };

    NodeContainer.prototype.assignStack = function(stack) {
        this.stack = stack;
        stack.children.push(this);
    };

    NodeContainer.prototype.isElementVisible = function() {
        return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : (
        this.css('display') !== "none" &&
        !this.node.hasAttribute("data-html2canvas-ignore") &&
        (this.node.nodeName !== "INPUT" || this.node.getAttribute("type") !== "hidden")
        );
    };

    NodeContainer.prototype.css = function(attribute) {
        if (!this.computedStyles) {
            this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null);
        }

        return this.styles[attribute] || (this.styles[attribute] = this.computedStyles[attribute]);
    };

    NodeContainer.prototype.prefixedCss = function(attribute) {
        var prefixes = ["webkit", "moz", "ms", "o"];
        var value = this.css(attribute);
        if (value === undefined) {
            prefixes.some(function(prefix) {
                value = this.css(prefix + attribute.substr(0, 1).toUpperCase() + attribute.substr(1));
                return value !== undefined;
            }, this);
        }
        return value === undefined ? null : value;
    };

    NodeContainer.prototype.computedStyle = function(type) {
        return this.node.ownerDocument.defaultView.getComputedStyle(this.node, type);
    };

    NodeContainer.prototype.cssInt = function(attribute) {
        var value = parseInt(this.css(attribute), 10);
        return (isNaN(value)) ? 0 : value; // borders in old IE are throwing 'medium' for demo.html
    };

    NodeContainer.prototype.color = function(attribute) {
        return this.colors[attribute] || (this.colors[attribute] = new Color(this.css(attribute)));
    };

    NodeContainer.prototype.cssFloat = function(attribute) {
        var value = parseFloat(this.css(attribute));
        return (isNaN(value)) ? 0 : value;
    };

    NodeContainer.prototype.fontWeight = function() {
        var weight = this.css("fontWeight");
        switch(parseInt(weight, 10)){
            case 401:
                weight = "bold";
                break;
            case 400:
                weight = "normal";
                break;
        }
        return weight;
    };

    NodeContainer.prototype.parseClip = function() {
        var matches = this.css('clip').match(this.CLIP);
        if (matches) {
            return {
                top: parseInt(matches[1], 10),
                right: parseInt(matches[2], 10),
                bottom: parseInt(matches[3], 10),
                left: parseInt(matches[4], 10)
            };
        }
        return null;
    };

    NodeContainer.prototype.parseBackgroundImages = function() {
        return this.backgroundImages || (this.backgroundImages = parseBackgrounds(this.css("backgroundImage")));
    };

    NodeContainer.prototype.cssList = function(property, index) {
        var value = (this.css(property) || '').split(',');
        value = value[index || 0] || value[0] || 'auto';
        value = value.trim().split(' ');
        if (value.length === 1) {
            value = [value[0], isPercentage(value[0]) ? 'auto' : value[0]];
        }
        return value;
    };

    NodeContainer.prototype.parseBackgroundSize = function(bounds, image, index) {
        var size = this.cssList("backgroundSize", index);
        var width, height;

        if (isPercentage(size[0])) {
            width = bounds.width * parseFloat(size[0]) / 100;
        } else if (/contain|cover/.test(size[0])) {
            var targetRatio = bounds.width / bounds.height, currentRatio = image.width / image.height;
            return (targetRatio < currentRatio ^ size[0] === 'contain') ?  {width: bounds.height * currentRatio, height: bounds.height} : {width: bounds.width, height: bounds.width / currentRatio};
        } else {
            width = parseInt(size[0], 10);
        }

        if (size[0] === 'auto' && size[1] === 'auto') {
            height = image.height;
        } else if (size[1] === 'auto') {
            height = width / image.width * image.height;
        } else if (isPercentage(size[1])) {
            height =  bounds.height * parseFloat(size[1]) / 100;
        } else {
            height = parseInt(size[1], 10);
        }

        if (size[0] === 'auto') {
            width = height / image.height * image.width;
        }

        return {width: width, height: height};
    };

    NodeContainer.prototype.parseBackgroundPosition = function(bounds, image, index, backgroundSize) {
        var position = this.cssList('backgroundPosition', index);
        var left, top;

        if (isPercentage(position[0])){
            left = (bounds.width - (backgroundSize || image).width) * (parseFloat(position[0]) / 100);
        } else {
            left = parseInt(position[0], 10);
        }

        if (position[1] === 'auto') {
            top = left / image.width * image.height;
        } else if (isPercentage(position[1])){
            top =  (bounds.height - (backgroundSize || image).height) * parseFloat(position[1]) / 100;
        } else {
            top = parseInt(position[1], 10);
        }

        if (position[0] === 'auto') {
            left = top / image.height * image.width;
        }

        return {left: left, top: top};
    };

    NodeContainer.prototype.parseBackgroundRepeat = function(index) {
        return this.cssList("backgroundRepeat", index)[0];
    };

    NodeContainer.prototype.parseTextShadows = function() {
        var textShadow = this.css("textShadow");
        var results = [];

        if (textShadow && textShadow !== 'none') {
            var shadows = textShadow.match(this.TEXT_SHADOW_PROPERTY);
            for (var i = 0; shadows && (i < shadows.length); i++) {
                var s = shadows[i].match(this.TEXT_SHADOW_VALUES);
                results.push({
                    color: new Color(s[0]),
                    offsetX: s[1] ? parseFloat(s[1].replace('px', '')) : 0,
                    offsetY: s[2] ? parseFloat(s[2].replace('px', '')) : 0,
                    blur: s[3] ? s[3].replace('px', '') : 0
                });
            }
        }
        return results;
    };

    NodeContainer.prototype.parseTransform = function() {
        if (!this.transformData) {
            if (this.hasTransform()) {
                var offset = this.parseBounds();
                var origin = this.prefixedCss("transformOrigin").split(" ").map(removePx).map(asFloat);
                origin[0] += offset.left;
                origin[1] += offset.top;
                this.transformData = {
                    origin: origin,
                    matrix: this.parseTransformMatrix()
                };
            } else {
                this.transformData = {
                    origin: [0, 0],
                    matrix: [1, 0, 0, 1, 0, 0]
                };
            }
        }
        return this.transformData;
    };

    NodeContainer.prototype.parseTransformMatrix = function() {
        if (!this.transformMatrix) {
            var transform = this.prefixedCss("transform");
            var matrix = transform ? parseMatrix(transform.match(this.MATRIX_PROPERTY)) : null;
            this.transformMatrix = matrix ? matrix : [1, 0, 0, 1, 0, 0];
        }
        return this.transformMatrix;
    };

    NodeContainer.prototype.parseBounds = function() {
        return this.bounds || (this.bounds = this.hasTransform() ? offsetBounds(this.node) : getBounds(this.node));
    };

    NodeContainer.prototype.hasTransform = function() {
        return this.parseTransformMatrix().join(",") !== "1,0,0,1,0,0" || (this.parent && this.parent.hasTransform());
    };

    NodeContainer.prototype.getValue = function() {
        var value = this.node.value || "";
        if (this.node.tagName === "SELECT") {
            value = selectionValue(this.node);
        } else if (this.node.type === "password") {
            value = Array(value.length + 1).join('\u2022'); // jshint ignore:line
        }
        return value.length === 0 ? (this.node.placeholder || "") : value;
    };

    NodeContainer.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/;
    NodeContainer.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
    NodeContainer.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
    NodeContainer.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/;

    function selectionValue(node) {
        var option = node.options[node.selectedIndex || 0];
        return option ? (option.text || "") : "";
    }

    function parseMatrix(match) {
        if (match && match[1] === "matrix") {
            return match[2].split(",").map(function(s) {
                return parseFloat(s.trim());
            });
        }
    }

    function isPercentage(value) {
        return value.toString().indexOf("%") !== -1;
    }

    function removePx(str) {
        return str.replace("px", "");
    }

    function asFloat(str) {
        return parseFloat(str);
    }

    module.exports = NodeContainer;

},{"./color":5,"./utils":29}],17:[function(require,module,exports){
    var log = require('./log');
    var punycode = require('punycode');
    var NodeContainer = require('./nodecontainer');
    var TextContainer = require('./textcontainer');
    var PseudoElementContainer = require('./pseudoelementcontainer');
    var FontMetrics = require('./fontmetrics');
    var Color = require('./color');
    var Promise = require('./promise');
    var StackingContext = require('./stackingcontext');
    var utils = require('./utils');
    var bind = utils.bind;
    var getBounds = utils.getBounds;
    var parseBackgrounds = utils.parseBackgrounds;
    var offsetBounds = utils.offsetBounds;

    function NodeParser(element, renderer, support, imageLoader, options) {
        log("Starting NodeParser");
        this.renderer = renderer;
        this.options = options;
        this.range = null;
        this.support = support;
        this.renderQueue = [];
        this.stack = new StackingContext(true, 1, element.ownerDocument, null);
        var parent = new NodeContainer(element, null);
        if (options.background) {
            renderer.rectangle(0, 0, renderer.width, renderer.height, new Color(options.background));
        }
        if (element === element.ownerDocument.documentElement) {
            // http://www.w3.org/TR/css3-background/#special-backgrounds
            var canvasBackground = new NodeContainer(parent.color('backgroundColor').isTransparent() ? element.ownerDocument.body : element.ownerDocument.documentElement, null);
            renderer.rectangle(0, 0, renderer.width, renderer.height, canvasBackground.color('backgroundColor'));
        }
        parent.visibile = parent.isElementVisible();
        this.createPseudoHideStyles(element.ownerDocument);
        this.disableAnimations(element.ownerDocument);
        this.nodes = flatten([parent].concat(this.getChildren(parent)).filter(function(container) {
            return container.visible = container.isElementVisible();
        }).map(this.getPseudoElements, this));
        this.fontMetrics = new FontMetrics();
        log("Fetched nodes, total:", this.nodes.length);
        log("Calculate overflow clips");
        this.calculateOverflowClips();
        log("Start fetching images");
        this.images = imageLoader.fetch(this.nodes.filter(isElement));
        this.ready = this.images.ready.then(bind(function() {
            log("Images loaded, starting parsing");
            log("Creating stacking contexts");
            this.createStackingContexts();
            log("Sorting stacking contexts");
            this.sortStackingContexts(this.stack);
            this.parse(this.stack);
            log("Render queue created with " + this.renderQueue.length + " items");
            return new Promise(bind(function(resolve) {
                if (!options.async) {
                    this.renderQueue.forEach(this.paint, this);
                    resolve();
                } else if (typeof(options.async) === "function") {
                    options.async.call(this, this.renderQueue, resolve);
                } else if (this.renderQueue.length > 0){
                    this.renderIndex = 0;
                    this.asyncRenderer(this.renderQueue, resolve);
                } else {
                    resolve();
                }
            }, this));
        }, this));
    }

    NodeParser.prototype.calculateOverflowClips = function() {
        this.nodes.forEach(function(container) {
            if (isElement(container)) {
                if (isPseudoElement(container)) {
                    container.appendToDOM();
                }
                container.borders = this.parseBorders(container);
                var clip = (container.css('overflow') === "hidden") ? [container.borders.clip] : [];
                var cssClip = container.parseClip();
                if (cssClip && ["absolute", "fixed"].indexOf(container.css('position')) !== -1) {
                    clip.push([["rect",
                        container.bounds.left + cssClip.left,
                        container.bounds.top + cssClip.top,
                        cssClip.right - cssClip.left,
                        cssClip.bottom - cssClip.top
                    ]]);
                }
                container.clip = hasParentClip(container) ? container.parent.clip.concat(clip) : clip;
                container.backgroundClip = (container.css('overflow') !== "hidden") ? container.clip.concat([container.borders.clip]) : container.clip;
                if (isPseudoElement(container)) {
                    container.cleanDOM();
                }
            } else if (isTextNode(container)) {
                container.clip = hasParentClip(container) ? container.parent.clip : [];
            }
            if (!isPseudoElement(container)) {
                container.bounds = null;
            }
        }, this);
    };

    function hasParentClip(container) {
        return container.parent && container.parent.clip.length;
    }

    NodeParser.prototype.asyncRenderer = function(queue, resolve, asyncTimer) {
        asyncTimer = asyncTimer || Date.now();
        this.paint(queue[this.renderIndex++]);
        if (queue.length === this.renderIndex) {
            resolve();
        } else if (asyncTimer + 20 > Date.now()) {
            this.asyncRenderer(queue, resolve, asyncTimer);
        } else {
            setTimeout(bind(function() {
                this.asyncRenderer(queue, resolve);
            }, this), 0);
        }
    };

    NodeParser.prototype.createPseudoHideStyles = function(document) {
        this.createStyles(document, '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }' +
        '.' + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }');
    };

    NodeParser.prototype.disableAnimations = function(document) {
        this.createStyles(document, '* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; ' +
        '-webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}');
    };

    NodeParser.prototype.createStyles = function(document, styles) {
        var hidePseudoElements = document.createElement('style');
        hidePseudoElements.innerHTML = styles;
        document.body.appendChild(hidePseudoElements);
    };

    NodeParser.prototype.getPseudoElements = function(container) {
        var nodes = [[container]];
        if (container.node.nodeType === Node.ELEMENT_NODE) {
            var before = this.getPseudoElement(container, ":before");
            var after = this.getPseudoElement(container, ":after");

            if (before) {
                nodes.push(before);
            }

            if (after) {
                nodes.push(after);
            }
        }
        return flatten(nodes);
    };

    function toCamelCase(str) {
        return str.replace(/(\-[a-z])/g, function(match){
            return match.toUpperCase().replace('-','');
        });
    }

    NodeParser.prototype.getPseudoElement = function(container, type) {
        var style = container.computedStyle(type);
        if(!style || !style.content || style.content === "none" || style.content === "-moz-alt-content" || style.display === "none") {
            return null;
        }

        var content = stripQuotes(style.content);
        var isImage = content.substr(0, 3) === 'url';
        var pseudoNode = document.createElement(isImage ? 'img' : 'html2canvaspseudoelement');
        var pseudoContainer = new PseudoElementContainer(pseudoNode, container, type);

        for (var i = style.length-1; i >= 0; i--) {
            var property = toCamelCase(style.item(i));
            pseudoNode.style[property] = style[property];
        }

        pseudoNode.className = PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER;

        if (isImage) {
            pseudoNode.src = parseBackgrounds(content)[0].args[0];
            return [pseudoContainer];
        } else {
            var text = document.createTextNode(content);
            pseudoNode.appendChild(text);
            return [pseudoContainer, new TextContainer(text, pseudoContainer)];
        }
    };


    NodeParser.prototype.getChildren = function(parentContainer) {
        return flatten([].filter.call(parentContainer.node.childNodes, renderableNode).map(function(node) {
            var container = [node.nodeType === Node.TEXT_NODE ? new TextContainer(node, parentContainer) : new NodeContainer(node, parentContainer)].filter(nonIgnoredElement);
            return node.nodeType === Node.ELEMENT_NODE && container.length && node.tagName !== "TEXTAREA" ? (container[0].isElementVisible() ? container.concat(this.getChildren(container[0])) : []) : container;
        }, this));
    };

    NodeParser.prototype.newStackingContext = function(container, hasOwnStacking) {
        var stack = new StackingContext(hasOwnStacking, container.getOpacity(), container.node, container.parent);
        container.cloneTo(stack);
        var parentStack = hasOwnStacking ? stack.getParentStack(this) : stack.parent.stack;
        parentStack.contexts.push(stack);
        container.stack = stack;
    };

    NodeParser.prototype.createStackingContexts = function() {
        this.nodes.forEach(function(container) {
            if (isElement(container) && (this.isRootElement(container) || hasOpacity(container) || isPositionedForStacking(container) || this.isBodyWithTransparentRoot(container) || container.hasTransform())) {
                this.newStackingContext(container, true);
            } else if (isElement(container) && ((isPositioned(container) && zIndex0(container)) || isInlineBlock(container) || isFloating(container))) {
                this.newStackingContext(container, false);
            } else {
                container.assignStack(container.parent.stack);
            }
        }, this);
    };

    NodeParser.prototype.isBodyWithTransparentRoot = function(container) {
        return container.node.nodeName === "BODY" && container.parent.color('backgroundColor').isTransparent();
    };

    NodeParser.prototype.isRootElement = function(container) {
        return container.parent === null;
    };

    NodeParser.prototype.sortStackingContexts = function(stack) {
        stack.contexts.sort(zIndexSort(stack.contexts.slice(0)));
        stack.contexts.forEach(this.sortStackingContexts, this);
    };

    NodeParser.prototype.parseTextBounds = function(container) {
        return function(text, index, textList) {
            if (container.parent.css("textDecoration").substr(0, 4) !== "none" || text.trim().length !== 0) {
                if (this.support.rangeBounds && !container.parent.hasTransform()) {
                    var offset = textList.slice(0, index).join("").length;
                    return this.getRangeBounds(container.node, offset, text.length);
                } else if (container.node && typeof(container.node.data) === "string") {
                    var replacementNode = container.node.splitText(text.length);
                    var bounds = this.getWrapperBounds(container.node, container.parent.hasTransform());
                    container.node = replacementNode;
                    return bounds;
                }
            } else if(!this.support.rangeBounds || container.parent.hasTransform()){
                container.node = container.node.splitText(text.length);
            }
            return {};
        };
    };

    NodeParser.prototype.getWrapperBounds = function(node, transform) {
        var wrapper = node.ownerDocument.createElement('html2canvaswrapper');
        var parent = node.parentNode,
            backupText = node.cloneNode(true);

        wrapper.appendChild(node.cloneNode(true));
        parent.replaceChild(wrapper, node);
        var bounds = transform ? offsetBounds(wrapper) : getBounds(wrapper);
        parent.replaceChild(backupText, wrapper);
        return bounds;
    };

    NodeParser.prototype.getRangeBounds = function(node, offset, length) {
        var range = this.range || (this.range = node.ownerDocument.createRange());
        range.setStart(node, offset);
        range.setEnd(node, offset + length);
        return range.getBoundingClientRect();
    };

    function ClearTransform() {}

    NodeParser.prototype.parse = function(stack) {
        // http://www.w3.org/TR/CSS21/visuren.html#z-index
        var negativeZindex = stack.contexts.filter(negativeZIndex); // 2. the child stacking contexts with negative stack levels (most negative first).
        var descendantElements = stack.children.filter(isElement);
        var descendantNonFloats = descendantElements.filter(not(isFloating));
        var nonInlineNonPositionedDescendants = descendantNonFloats.filter(not(isPositioned)).filter(not(inlineLevel)); // 3 the in-flow, non-inline-level, non-positioned descendants.
        var nonPositionedFloats = descendantElements.filter(not(isPositioned)).filter(isFloating); // 4. the non-positioned floats.
        var inFlow = descendantNonFloats.filter(not(isPositioned)).filter(inlineLevel); // 5. the in-flow, inline-level, non-positioned descendants, including inline tables and inline blocks.
        var stackLevel0 = stack.contexts.concat(descendantNonFloats.filter(isPositioned)).filter(zIndex0); // 6. the child stacking contexts with stack level 0 and the positioned descendants with stack level 0.
        var text = stack.children.filter(isTextNode).filter(hasText);
        var positiveZindex = stack.contexts.filter(positiveZIndex); // 7. the child stacking contexts with positive stack levels (least positive first).
        negativeZindex.concat(nonInlineNonPositionedDescendants).concat(nonPositionedFloats)
            .concat(inFlow).concat(stackLevel0).concat(text).concat(positiveZindex).forEach(function(container) {
                this.renderQueue.push(container);
                if (isStackingContext(container)) {
                    this.parse(container);
                    this.renderQueue.push(new ClearTransform());
                }
            }, this);
    };

    NodeParser.prototype.paint = function(container) {
        try {
            if (container instanceof ClearTransform) {
                this.renderer.ctx.restore();
            } else if (isTextNode(container)) {
                if (isPseudoElement(container.parent)) {
                    container.parent.appendToDOM();
                }
                this.paintText(container);
                if (isPseudoElement(container.parent)) {
                    container.parent.cleanDOM();
                }
            } else {
                this.paintNode(container);
            }
        } catch(e) {
            log(e);
            if (this.options.strict) {
                throw e;
            }
        }
    };

    NodeParser.prototype.paintNode = function(container) {
        if (isStackingContext(container)) {
            this.renderer.setOpacity(container.opacity);
            this.renderer.ctx.save();
            if (container.hasTransform()) {
                this.renderer.setTransform(container.parseTransform());
            }
        }

        if (container.node.nodeName === "INPUT" && container.node.type === "checkbox") {
            this.paintCheckbox(container);
        } else if (container.node.nodeName === "INPUT" && container.node.type === "radio") {
            this.paintRadio(container);
        } else {
            this.paintElement(container);
        }
    };

    NodeParser.prototype.paintElement = function(container) {
        var bounds = container.parseBounds();
        this.renderer.clip(container.backgroundClip, function() {
            this.renderer.renderBackground(container, bounds, container.borders.borders.map(getWidth));
        }, this);

        this.renderer.clip(container.clip, function() {
            this.renderer.renderBorders(container.borders.borders);
        }, this);

        this.renderer.clip(container.backgroundClip, function() {
            switch (container.node.nodeName) {
                case "svg":
                case "IFRAME":
                    var imgContainer = this.images.get(container.node);
                    if (imgContainer) {
                        this.renderer.renderImage(container, bounds, container.borders, imgContainer);
                    } else {
                        log("Error loading <" + container.node.nodeName + ">", container.node);
                    }
                    break;
                case "IMG":
                    var imageContainer = this.images.get(container.node.src);
                    if (imageContainer) {
                        this.renderer.renderImage(container, bounds, container.borders, imageContainer);
                    } else {
                        log("Error loading <img>", container.node.src);
                    }
                    break;
                case "CANVAS":
                    this.renderer.renderImage(container, bounds, container.borders, {image: container.node});
                    break;
                case "SELECT":
                case "INPUT":
                case "TEXTAREA":
                    this.paintFormValue(container);
                    break;
            }
        }, this);
    };

    NodeParser.prototype.paintCheckbox = function(container) {
        var b = container.parseBounds();

        var size = Math.min(b.width, b.height);
        var bounds = {width: size - 1, height: size - 1, top: b.top, left: b.left};
        var r = [3, 3];
        var radius = [r, r, r, r];
        var borders = [1,1,1,1].map(function(w) {
            return {color: new Color('#A5A5A5'), width: w};
        });

        var borderPoints = calculateCurvePoints(bounds, radius, borders);

        this.renderer.clip(container.backgroundClip, function() {
            this.renderer.rectangle(bounds.left + 1, bounds.top + 1, bounds.width - 2, bounds.height - 2, new Color("#DEDEDE"));
            this.renderer.renderBorders(calculateBorders(borders, bounds, borderPoints, radius));
            if (container.node.checked) {
                this.renderer.font(new Color('#424242'), 'normal', 'normal', 'bold', (size - 3) + "px", 'arial');
                this.renderer.text("\u2714", bounds.left + size / 6, bounds.top + size - 1);
            }
        }, this);
    };

    NodeParser.prototype.paintRadio = function(container) {
        var bounds = container.parseBounds();

        var size = Math.min(bounds.width, bounds.height) - 2;

        this.renderer.clip(container.backgroundClip, function() {
            this.renderer.circleStroke(bounds.left + 1, bounds.top + 1, size, new Color('#DEDEDE'), 1, new Color('#A5A5A5'));
            if (container.node.checked) {
                this.renderer.circle(Math.ceil(bounds.left + size / 4) + 1, Math.ceil(bounds.top + size / 4) + 1, Math.floor(size / 2), new Color('#424242'));
            }
        }, this);
    };

    NodeParser.prototype.paintFormValue = function(container) {
        var value = container.getValue();
        if (value.length > 0) {
            var document = container.node.ownerDocument;
            var wrapper = document.createElement('html2canvaswrapper');
            var properties = ['lineHeight', 'textAlign', 'fontFamily', 'fontWeight', 'fontSize', 'color',
                'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom',
                'width', 'height', 'borderLeftStyle', 'borderTopStyle', 'borderLeftWidth', 'borderTopWidth',
                'boxSizing', 'whiteSpace', 'wordWrap'];

            properties.forEach(function(property) {
                try {
                    wrapper.style[property] = container.css(property);
                } catch(e) {
                    // Older IE has issues with "border"
                    log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
                }
            });
            var bounds = container.parseBounds();
            wrapper.style.position = "fixed";
            wrapper.style.left = bounds.left + "px";
            wrapper.style.top = bounds.top + "px";
            wrapper.textContent = value;
            document.body.appendChild(wrapper);
            this.paintText(new TextContainer(wrapper.firstChild, container));
            document.body.removeChild(wrapper);
        }
    };

    NodeParser.prototype.paintText = function(container) {
        container.applyTextTransform();
        var characters = punycode.ucs2.decode(container.node.data);
        var textList = (!this.options.letterRendering || noLetterSpacing(container)) && !hasUnicode(container.node.data) ? getWords(characters) : characters.map(function(character) {
            return punycode.ucs2.encode([character]);
        });

        var weight = container.parent.fontWeight();
        var size = container.parent.css('fontSize');
        var family = container.parent.css('fontFamily');
        var shadows = container.parent.parseTextShadows();

        this.renderer.font(container.parent.color('color'), container.parent.css('fontStyle'), container.parent.css('fontVariant'), weight, size, family);
        if (shadows.length) {
            // TODO: support multiple text shadows
            this.renderer.fontShadow(shadows[0].color, shadows[0].offsetX, shadows[0].offsetY, shadows[0].blur);
        } else {
            this.renderer.clearShadow();
        }

        this.renderer.clip(container.parent.clip, function() {
            textList.map(this.parseTextBounds(container), this).forEach(function(bounds, index) {
                if (bounds) {
                    this.renderer.text(textList[index], bounds.left, bounds.bottom);
                    this.renderTextDecoration(container.parent, bounds, this.fontMetrics.getMetrics(family, size));
                }
            }, this);
        }, this);
    };

    NodeParser.prototype.renderTextDecoration = function(container, bounds, metrics) {
        switch(container.css("textDecoration").split(" ")[0]) {
            case "underline":
                // Draws a line at the baseline of the font
                // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
                this.renderer.rectangle(bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, container.color("color"));
                break;
            case "overline":
                this.renderer.rectangle(bounds.left, Math.round(bounds.top), bounds.width, 1, container.color("color"));
                break;
            case "line-through":
                // TODO try and find exact position for line-through
                this.renderer.rectangle(bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, container.color("color"));
                break;
        }
    };

    var borderColorTransforms = {
        inset: [
            ["darken", 0.60],
            ["darken", 0.10],
            ["darken", 0.10],
            ["darken", 0.60]
        ]
    };

    NodeParser.prototype.parseBorders = function(container) {
        var nodeBounds = container.parseBounds();
        var radius = getBorderRadiusData(container);
        var borders = ["Top", "Right", "Bottom", "Left"].map(function(side, index) {
            var style = container.css('border' + side + 'Style');
            var color = container.color('border' + side + 'Color');
            if (style === "inset" && color.isBlack()) {
                color = new Color([255, 255, 255, color.a]); // this is wrong, but
            }
            var colorTransform = borderColorTransforms[style] ? borderColorTransforms[style][index] : null;
            return {
                width: container.cssInt('border' + side + 'Width'),
                color: colorTransform ? color[colorTransform[0]](colorTransform[1]) : color,
                args: null
            };
        });
        var borderPoints = calculateCurvePoints(nodeBounds, radius, borders);

        return {
            clip: this.parseBackgroundClip(container, borderPoints, borders, radius, nodeBounds),
            borders: calculateBorders(borders, nodeBounds, borderPoints, radius)
        };
    };

    function calculateBorders(borders, nodeBounds, borderPoints, radius) {
        return borders.map(function(border, borderSide) {
            if (border.width > 0) {
                var bx = nodeBounds.left;
                var by = nodeBounds.top;
                var bw = nodeBounds.width;
                var bh = nodeBounds.height - (borders[2].width);

                switch(borderSide) {
                    case 0:
                        // top border
                        bh = borders[0].width;
                        border.args = drawSide({
                                c1: [bx, by],
                                c2: [bx + bw, by],
                                c3: [bx + bw - borders[1].width, by + bh],
                                c4: [bx + borders[3].width, by + bh]
                            }, radius[0], radius[1],
                            borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
                        break;
                    case 1:
                        // right border
                        bx = nodeBounds.left + nodeBounds.width - (borders[1].width);
                        bw = borders[1].width;

                        border.args = drawSide({
                                c1: [bx + bw, by],
                                c2: [bx + bw, by + bh + borders[2].width],
                                c3: [bx, by + bh],
                                c4: [bx, by + borders[0].width]
                            }, radius[1], radius[2],
                            borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
                        break;
                    case 2:
                        // bottom border
                        by = (by + nodeBounds.height) - (borders[2].width);
                        bh = borders[2].width;
                        border.args = drawSide({
                                c1: [bx + bw, by + bh],
                                c2: [bx, by + bh],
                                c3: [bx + borders[3].width, by],
                                c4: [bx + bw - borders[3].width, by]
                            }, radius[2], radius[3],
                            borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
                        break;
                    case 3:
                        // left border
                        bw = borders[3].width;
                        border.args = drawSide({
                                c1: [bx, by + bh + borders[2].width],
                                c2: [bx, by],
                                c3: [bx + bw, by + borders[0].width],
                                c4: [bx + bw, by + bh]
                            }, radius[3], radius[0],
                            borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
                        break;
                }
            }
            return border;
        });
    }

    NodeParser.prototype.parseBackgroundClip = function(container, borderPoints, borders, radius, bounds) {
        var backgroundClip = container.css('backgroundClip'),
            borderArgs = [];

        switch(backgroundClip) {
            case "content-box":
            case "padding-box":
                parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
                parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
                parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
                parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
                break;

            default:
                parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
                parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
                parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
                parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
                break;
        }

        return borderArgs;
    };

    function getCurvePoints(x, y, r1, r2) {
        var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
        var ox = (r1) * kappa, // control point offset horizontal
            oy = (r2) * kappa, // control point offset vertical
            xm = x + r1, // x-middle
            ym = y + r2; // y-middle
        return {
            topLeft: bezierCurve({x: x, y: ym}, {x: x, y: ym - oy}, {x: xm - ox, y: y}, {x: xm, y: y}),
            topRight: bezierCurve({x: x, y: y}, {x: x + ox,y: y}, {x: xm, y: ym - oy}, {x: xm, y: ym}),
            bottomRight: bezierCurve({x: xm, y: y}, {x: xm, y: y + oy}, {x: x + ox, y: ym}, {x: x, y: ym}),
            bottomLeft: bezierCurve({x: xm, y: ym}, {x: xm - ox, y: ym}, {x: x, y: y + oy}, {x: x, y:y})
        };
    }

    function calculateCurvePoints(bounds, borderRadius, borders) {
        var x = bounds.left,
            y = bounds.top,
            width = bounds.width,
            height = bounds.height,

            tlh = borderRadius[0][0],
            tlv = borderRadius[0][1],
            trh = borderRadius[1][0],
            trv = borderRadius[1][1],
            brh = borderRadius[2][0],
            brv = borderRadius[2][1],
            blh = borderRadius[3][0],
            blv = borderRadius[3][1];

        var halfHeight = Math.floor(height / 2);

        tlh = tlh > halfHeight ? halfHeight : tlh;
        tlv = tlv > halfHeight ? halfHeight : tlv;
        trh = trh > halfHeight ? halfHeight : trh;
        trv = trv > halfHeight ? halfHeight : trv;
        brh = brh > halfHeight ? halfHeight : brh;
        brv = brv > halfHeight ? halfHeight : brv;
        blh = blh > halfHeight ? halfHeight : blh;
        blv = blv > halfHeight ? halfHeight : blv;

        var topWidth = width - trh,
            rightHeight = height - brv,
            bottomWidth = width - brh,
            leftHeight = height - blv;

        return {
            topLeftOuter: getCurvePoints(x, y, tlh, tlv).topLeft.subdivide(0.5),
            topLeftInner: getCurvePoints(x + borders[3].width, y + borders[0].width, Math.max(0, tlh - borders[3].width), Math.max(0, tlv - borders[0].width)).topLeft.subdivide(0.5),
            topRightOuter: getCurvePoints(x + topWidth, y, trh, trv).topRight.subdivide(0.5),
            topRightInner: getCurvePoints(x + Math.min(topWidth, width + borders[3].width), y + borders[0].width, (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width, trv - borders[0].width).topRight.subdivide(0.5),
            bottomRightOuter: getCurvePoints(x + bottomWidth, y + rightHeight, brh, brv).bottomRight.subdivide(0.5),
            bottomRightInner: getCurvePoints(x + Math.min(bottomWidth, width - borders[3].width), y + Math.min(rightHeight, height + borders[0].width), Math.max(0, brh - borders[1].width),  brv - borders[2].width).bottomRight.subdivide(0.5),
            bottomLeftOuter: getCurvePoints(x, y + leftHeight, blh, blv).bottomLeft.subdivide(0.5),
            bottomLeftInner: getCurvePoints(x + borders[3].width, y + leftHeight, Math.max(0, blh - borders[3].width), blv - borders[2].width).bottomLeft.subdivide(0.5)
        };
    }

    function bezierCurve(start, startControl, endControl, end) {
        var lerp = function (a, b, t) {
            return {
                x: a.x + (b.x - a.x) * t,
                y: a.y + (b.y - a.y) * t
            };
        };

        return {
            start: start,
            startControl: startControl,
            endControl: endControl,
            end: end,
            subdivide: function(t) {
                var ab = lerp(start, startControl, t),
                    bc = lerp(startControl, endControl, t),
                    cd = lerp(endControl, end, t),
                    abbc = lerp(ab, bc, t),
                    bccd = lerp(bc, cd, t),
                    dest = lerp(abbc, bccd, t);
                return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
            },
            curveTo: function(borderArgs) {
                borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
            },
            curveToReversed: function(borderArgs) {
                borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
            }
        };
    }

    function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
        var borderArgs = [];

        if (radius1[0] > 0 || radius1[1] > 0) {
            borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
            outer1[1].curveTo(borderArgs);
        } else {
            borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
        }

        if (radius2[0] > 0 || radius2[1] > 0) {
            borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
            outer2[0].curveTo(borderArgs);
            borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
            inner2[0].curveToReversed(borderArgs);
        } else {
            borderArgs.push(["line", borderData.c2[0], borderData.c2[1]]);
            borderArgs.push(["line", borderData.c3[0], borderData.c3[1]]);
        }

        if (radius1[0] > 0 || radius1[1] > 0) {
            borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
            inner1[1].curveToReversed(borderArgs);
        } else {
            borderArgs.push(["line", borderData.c4[0], borderData.c4[1]]);
        }

        return borderArgs;
    }

    function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
        if (radius1[0] > 0 || radius1[1] > 0) {
            borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
            corner1[0].curveTo(borderArgs);
            corner1[1].curveTo(borderArgs);
        } else {
            borderArgs.push(["line", x, y]);
        }

        if (radius2[0] > 0 || radius2[1] > 0) {
            borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
        }
    }

    function negativeZIndex(container) {
        return container.cssInt("zIndex") < 0;
    }

    function positiveZIndex(container) {
        return container.cssInt("zIndex") > 0;
    }

    function zIndex0(container) {
        return container.cssInt("zIndex") === 0;
    }

    function inlineLevel(container) {
        return ["inline", "inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
    }

    function isStackingContext(container) {
        return (container instanceof StackingContext);
    }

    function hasText(container) {
        return container.node.data.trim().length > 0;
    }

    function noLetterSpacing(container) {
        return (/^(normal|none|0px)$/.test(container.parent.css("letterSpacing")));
    }

    function getBorderRadiusData(container) {
        return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
            var value = container.css('border' + side + 'Radius');
            var arr = value.split(" ");
            if (arr.length <= 1) {
                arr[1] = arr[0];
            }
            return arr.map(asInt);
        });
    }

    function renderableNode(node) {
        return (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE);
    }

    function isPositionedForStacking(container) {
        var position = container.css("position");
        var zIndex = (["absolute", "relative", "fixed"].indexOf(position) !== -1) ? container.css("zIndex") : "auto";
        return zIndex !== "auto";
    }

    function isPositioned(container) {
        return container.css("position") !== "static";
    }

    function isFloating(container) {
        return container.css("float") !== "none";
    }

    function isInlineBlock(container) {
        return ["inline-block", "inline-table"].indexOf(container.css("display")) !== -1;
    }

    function not(callback) {
        var context = this;
        return function() {
            return !callback.apply(context, arguments);
        };
    }

    function isElement(container) {
        return container.node.nodeType === Node.ELEMENT_NODE;
    }

    function isPseudoElement(container) {
        return container.isPseudoElement === true;
    }

    function isTextNode(container) {
        return container.node.nodeType === Node.TEXT_NODE;
    }

    function zIndexSort(contexts) {
        return function(a, b) {
            return (a.cssInt("zIndex") + (contexts.indexOf(a) / contexts.length)) - (b.cssInt("zIndex") + (contexts.indexOf(b) / contexts.length));
        };
    }

    function hasOpacity(container) {
        return container.getOpacity() < 1;
    }

    function asInt(value) {
        return parseInt(value, 10);
    }

    function getWidth(border) {
        return border.width;
    }

    function nonIgnoredElement(nodeContainer) {
        return (nodeContainer.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(nodeContainer.node.nodeName) === -1);
    }

    function flatten(arrays) {
        return [].concat.apply([], arrays);
    }

    function stripQuotes(content) {
        var first = content.substr(0, 1);
        return (first === content.substr(content.length - 1) && first.match(/'|"/)) ? content.substr(1, content.length - 2) : content;
    }

    function getWords(characters) {
        var words = [], i = 0, onWordBoundary = false, word;
        while(characters.length) {
            if (isWordBoundary(characters[i]) === onWordBoundary) {
                word = characters.splice(0, i);
                if (word.length) {
                    words.push(punycode.ucs2.encode(word));
                }
                onWordBoundary =! onWordBoundary;
                i = 0;
            } else {
                i++;
            }

            if (i >= characters.length) {
                word = characters.splice(0, i);
                if (word.length) {
                    words.push(punycode.ucs2.encode(word));
                }
            }
        }
        return words;
    }

    function isWordBoundary(characterCode) {
        return [
            32, // <space>
            13, // \r
            10, // \n
            9, // \t
            45 // -
        ].indexOf(characterCode) !== -1;
    }

    function hasUnicode(string) {
        return (/[^\u0000-\u00ff]/).test(string);
    }

    module.exports = NodeParser;

},{"./color":5,"./fontmetrics":9,"./log":15,"./nodecontainer":16,"./promise":18,"./pseudoelementcontainer":21,"./stackingcontext":24,"./textcontainer":28,"./utils":29,"punycode":3}],18:[function(require,module,exports){
    module.exports = require('es6-promise').Promise;

},{"es6-promise":1}],19:[function(require,module,exports){
    var Promise = require('./promise');
    var XHR = require('./xhr');
    var utils = require('./utils');
    var log = require('./log');
    var createWindowClone = require('./clone');
    var decode64 = utils.decode64;

    function Proxy(src, proxyUrl, document) {
        var supportsCORS = ('withCredentials' in new XMLHttpRequest());
        if (!proxyUrl) {
            return Promise.reject("No proxy configured");
        }
        var callback = createCallback(supportsCORS);
        var url = createProxyUrl(proxyUrl, src, callback);

        return supportsCORS ? XHR(url) : (jsonp(document, url, callback).then(function(response) {
            return decode64(response.content);
        }));
    }
    var proxyCount = 0;

    function ProxyURL(src, proxyUrl, document) {
        var supportsCORSImage = ('crossOrigin' in new Image());
        var callback = createCallback(supportsCORSImage);
        var url = createProxyUrl(proxyUrl, src, callback);
        return (supportsCORSImage ? Promise.resolve(url) : jsonp(document, url, callback).then(function(response) {
            return "data:" + response.type + ";base64," + response.content;
        }));
    }

    function jsonp(document, url, callback) {
        return new Promise(function(resolve, reject) {
            var s = document.createElement("script");
            var cleanup = function() {
                delete window.html2canvas.proxy[callback];
                document.body.removeChild(s);
            };
            window.html2canvas.proxy[callback] = function(response) {
                cleanup();
                resolve(response);
            };
            s.src = url;
            s.onerror = function(e) {
                cleanup();
                reject(e);
            };
            document.body.appendChild(s);
        });
    }

    function createCallback(useCORS) {
        return !useCORS ? "html2canvas_" + Date.now() + "_" + (++proxyCount) + "_" + Math.round(Math.random() * 100000) : "";
    }

    function createProxyUrl(proxyUrl, src, callback) {
        return proxyUrl + "?url=" + encodeURIComponent(src) + (callback.length ? "&callback=html2canvas.proxy." + callback : "");
    }

    function documentFromHTML(src) {
        return function(html) {
            var parser = new DOMParser(), doc;
            try {
                doc = parser.parseFromString(html, "text/html");
            } catch(e) {
                log("DOMParser not supported, falling back to createHTMLDocument");
                doc = document.implementation.createHTMLDocument("");
                try {
                    doc.open();
                    doc.write(html);
                    doc.close();
                } catch(ee) {
                    log("createHTMLDocument write not supported, falling back to document.body.innerHTML");
                    doc.body.innerHTML = html; // ie9 doesnt support writing to documentElement
                }
            }

            var b = doc.querySelector("base");
            if (!b || !b.href.host) {
                var base = doc.createElement("base");
                base.href = src;
                doc.head.insertBefore(base, doc.head.firstChild);
            }

            return doc;
        };
    }

    function loadUrlDocument(src, proxy, document, width, height, options) {
        return new Proxy(src, proxy, window.document).then(documentFromHTML(src)).then(function(doc) {
            return createWindowClone(doc, document, width, height, options, 0, 0);
        });
    }

    exports.Proxy = Proxy;
    exports.ProxyURL = ProxyURL;
    exports.loadUrlDocument = loadUrlDocument;

},{"./clone":4,"./log":15,"./promise":18,"./utils":29,"./xhr":31}],20:[function(require,module,exports){
    var ProxyURL = require('./proxy').ProxyURL;
    var Promise = require('./promise');

    function ProxyImageContainer(src, proxy) {
        var link = document.createElement("a");
        link.href = src;
        src = link.href;
        this.src = src;
        this.image = new Image();
        var self = this;
        this.promise = new Promise(function(resolve, reject) {
            self.image.crossOrigin = "Anonymous";
            self.image.onload = resolve;
            self.image.onerror = reject;

            new ProxyURL(src, proxy, document).then(function(url) {
                self.image.src = url;
            })['catch'](reject);
        });
    }

    module.exports = ProxyImageContainer;

},{"./promise":18,"./proxy":19}],21:[function(require,module,exports){
    var NodeContainer = require('./nodecontainer');

    function PseudoElementContainer(node, parent, type) {
        NodeContainer.call(this, node, parent);
        this.isPseudoElement = true;
        this.before = type === ":before";
    }

    PseudoElementContainer.prototype.cloneTo = function(stack) {
        PseudoElementContainer.prototype.cloneTo.call(this, stack);
        stack.isPseudoElement = true;
        stack.before = this.before;
    };

    PseudoElementContainer.prototype = Object.create(NodeContainer.prototype);

    PseudoElementContainer.prototype.appendToDOM = function() {
        if (this.before) {
            this.parent.node.insertBefore(this.node, this.parent.node.firstChild);
        } else {
            this.parent.node.appendChild(this.node);
        }
        this.parent.node.className += " " + this.getHideClass();
    };

    PseudoElementContainer.prototype.cleanDOM = function() {
        this.node.parentNode.removeChild(this.node);
        this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "");
    };

    PseudoElementContainer.prototype.getHideClass = function() {
        return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")];
    };

    PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
    PseudoElementContainer.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";

    module.exports = PseudoElementContainer;

},{"./nodecontainer":16}],22:[function(require,module,exports){
    var log = require('./log');

    function Renderer(width, height, images, options, document) {
        this.width = width;
        this.height = height;
        this.images = images;
        this.options = options;
        this.document = document;
    }

    Renderer.prototype.renderImage = function(container, bounds, borderData, imageContainer) {
        var paddingLeft = container.cssInt('paddingLeft'),
            paddingTop = container.cssInt('paddingTop'),
            paddingRight = container.cssInt('paddingRight'),
            paddingBottom = container.cssInt('paddingBottom'),
            borders = borderData.borders;

        var width = bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight);
        var height = bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom);
        this.drawImage(
            imageContainer,
            0,
            0,
            Math.round(imageContainer.image.width || width),
            Math.round(imageContainer.image.height || height),
            Math.round(bounds.left + paddingLeft + borders[3].width),
            Math.round(bounds.top + paddingTop + borders[0].width),
            width,
            height
        );
    };

    Renderer.prototype.renderBackground = function(container, bounds, borderData) {
        if (bounds.height > 0 && bounds.width > 0) {
            this.renderBackgroundColor(container, bounds);
            this.renderBackgroundImage(container, bounds, borderData);
        }
    };

    Renderer.prototype.renderBackgroundColor = function(container, bounds) {
        var color = container.color("backgroundColor");
        if (!color.isTransparent()) {
            this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, color);
        }
    };

    Renderer.prototype.renderBorders = function(borders) {
        borders.forEach(this.renderBorder, this);
    };

    Renderer.prototype.renderBorder = function(data) {
        if (!data.color.isTransparent() && data.args !== null) {
            this.drawShape(data.args, data.color);
        }
    };

    Renderer.prototype.renderBackgroundImage = function(container, bounds, borderData) {
        var backgroundImages = container.parseBackgroundImages();
        backgroundImages.reverse().forEach(function(backgroundImage, index, arr) {
            switch(backgroundImage.method) {
                case "url":
                    var image = this.images.get(backgroundImage.args[0]);
                    if (image) {
                        this.renderBackgroundRepeating(container, bounds, image, arr.length - (index+1), borderData);
                    } else {
                        log("Error loading background-image", backgroundImage.args[0]);
                    }
                    break;
                case "linear-gradient":
                case "gradient":
                    var gradientImage = this.images.get(backgroundImage.value);
                    if (gradientImage) {
                        this.renderBackgroundGradient(gradientImage, bounds, borderData);
                    } else {
                        log("Error loading background-image", backgroundImage.args[0]);
                    }
                    break;
                case "none":
                    break;
                default:
                    log("Unknown background-image type", backgroundImage.args[0]);
            }
        }, this);
    };

    Renderer.prototype.renderBackgroundRepeating = function(container, bounds, imageContainer, index, borderData) {
        var size = container.parseBackgroundSize(bounds, imageContainer.image, index);
        var position = container.parseBackgroundPosition(bounds, imageContainer.image, index, size);
        var repeat = container.parseBackgroundRepeat(index);
        switch (repeat) {
            case "repeat-x":
            case "repeat no-repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + borderData[3], bounds.top + position.top + borderData[0], 99999, size.height, borderData);
                break;
            case "repeat-y":
            case "no-repeat repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + borderData[0], size.width, 99999, borderData);
                break;
            case "no-repeat":
                this.backgroundRepeatShape(imageContainer, position, size, bounds, bounds.left + position.left + borderData[3], bounds.top + position.top + borderData[0], size.width, size.height, borderData);
                break;
            default:
                this.renderBackgroundRepeat(imageContainer, position, size, {top: bounds.top, left: bounds.left}, borderData[3], borderData[0]);
                break;
        }
    };

    module.exports = Renderer;

},{"./log":15}],23:[function(require,module,exports){
    var Renderer = require('../renderer');
    var LinearGradientContainer = require('../lineargradientcontainer');
    var log = require('../log');

    function CanvasRenderer(width, height) {
        Renderer.apply(this, arguments);
        this.canvas = this.options.canvas || this.document.createElement("canvas");
        if (!this.options.canvas) {
            this.canvas.width = width;
            this.canvas.height = height;
        }
        this.ctx = this.canvas.getContext("2d");
        this.taintCtx = this.document.createElement("canvas").getContext("2d");
        this.ctx.textBaseline = "bottom";
        this.variables = {};
        log("Initialized CanvasRenderer with size", width, "x", height);
    }

    CanvasRenderer.prototype = Object.create(Renderer.prototype);

    CanvasRenderer.prototype.setFillStyle = function(fillStyle) {
        this.ctx.fillStyle = typeof(fillStyle) === "object" && !!fillStyle.isColor ? fillStyle.toString() : fillStyle;
        return this.ctx;
    };

    CanvasRenderer.prototype.rectangle = function(left, top, width, height, color) {
        this.setFillStyle(color).fillRect(left, top, width, height);
    };

    CanvasRenderer.prototype.circle = function(left, top, size, color) {
        this.setFillStyle(color);
        this.ctx.beginPath();
        this.ctx.arc(left + size / 2, top + size / 2, size / 2, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.fill();
    };

    CanvasRenderer.prototype.circleStroke = function(left, top, size, color, stroke, strokeColor) {
        this.circle(left, top, size, color);
        this.ctx.strokeStyle = strokeColor.toString();
        this.ctx.stroke();
    };

    CanvasRenderer.prototype.drawShape = function(shape, color) {
        this.shape(shape);
        this.setFillStyle(color).fill();
    };

    CanvasRenderer.prototype.taints = function(imageContainer) {
        if (imageContainer.tainted === null) {
            this.taintCtx.drawImage(imageContainer.image, 0, 0);
            try {
                this.taintCtx.getImageData(0, 0, 1, 1);
                imageContainer.tainted = false;
            } catch(e) {
                this.taintCtx = document.createElement("canvas").getContext("2d");
                imageContainer.tainted = true;
            }
        }

        return imageContainer.tainted;
    };

    CanvasRenderer.prototype.drawImage = function(imageContainer, sx, sy, sw, sh, dx, dy, dw, dh) {
        if (!this.taints(imageContainer) || this.options.allowTaint) {
            this.ctx.drawImage(imageContainer.image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    };

    CanvasRenderer.prototype.clip = function(shapes, callback, context) {
        this.ctx.save();
        shapes.filter(hasEntries).forEach(function(shape) {
            this.shape(shape).clip();
        }, this);
        callback.call(context);
        this.ctx.restore();
    };

    CanvasRenderer.prototype.shape = function(shape) {
        this.ctx.beginPath();
        shape.forEach(function(point, index) {
            if (point[0] === "rect") {
                this.ctx.rect.apply(this.ctx, point.slice(1));
            } else {
                this.ctx[(index === 0) ? "moveTo" : point[0] + "To" ].apply(this.ctx, point.slice(1));
            }
        }, this);
        this.ctx.closePath();
        return this.ctx;
    };

    CanvasRenderer.prototype.font = function(color, style, variant, weight, size, family) {
        this.setFillStyle(color).font = [style, variant, weight, size, family].join(" ").split(",")[0];
    };

    CanvasRenderer.prototype.fontShadow = function(color, offsetX, offsetY, blur) {
        this.setVariable("shadowColor", color.toString())
            .setVariable("shadowOffsetY", offsetX)
            .setVariable("shadowOffsetX", offsetY)
            .setVariable("shadowBlur", blur);
    };

    CanvasRenderer.prototype.clearShadow = function() {
        this.setVariable("shadowColor", "rgba(0,0,0,0)");
    };

    CanvasRenderer.prototype.setOpacity = function(opacity) {
        this.ctx.globalAlpha = opacity;
    };

    CanvasRenderer.prototype.setTransform = function(transform) {
        this.ctx.translate(transform.origin[0], transform.origin[1]);
        this.ctx.transform.apply(this.ctx, transform.matrix);
        this.ctx.translate(-transform.origin[0], -transform.origin[1]);
    };

    CanvasRenderer.prototype.setVariable = function(property, value) {
        if (this.variables[property] !== value) {
            this.variables[property] = this.ctx[property] = value;
        }

        return this;
    };

    CanvasRenderer.prototype.text = function(text, left, bottom) {
        this.ctx.fillText(text, left, bottom);
    };

    CanvasRenderer.prototype.backgroundRepeatShape = function(imageContainer, backgroundPosition, size, bounds, left, top, width, height, borderData) {
        var shape = [
            ["line", Math.round(left), Math.round(top)],
            ["line", Math.round(left + width), Math.round(top)],
            ["line", Math.round(left + width), Math.round(height + top)],
            ["line", Math.round(left), Math.round(height + top)]
        ];
        this.clip([shape], function() {
            this.renderBackgroundRepeat(imageContainer, backgroundPosition, size, bounds, borderData[3], borderData[0]);
        }, this);
    };

    CanvasRenderer.prototype.renderBackgroundRepeat = function(imageContainer, backgroundPosition, size, bounds, borderLeft, borderTop) {
        var offsetX = Math.round(bounds.left + backgroundPosition.left + borderLeft), offsetY = Math.round(bounds.top + backgroundPosition.top + borderTop);
        this.setFillStyle(this.ctx.createPattern(this.resizeImage(imageContainer, size), "repeat"));
        this.ctx.translate(offsetX, offsetY);
        this.ctx.fill();
        this.ctx.translate(-offsetX, -offsetY);
    };

    CanvasRenderer.prototype.renderBackgroundGradient = function(gradientImage, bounds) {
        if (gradientImage instanceof LinearGradientContainer) {
            var gradient = this.ctx.createLinearGradient(
                bounds.left + bounds.width * gradientImage.x0,
                bounds.top + bounds.height * gradientImage.y0,
                bounds.left +  bounds.width * gradientImage.x1,
                bounds.top +  bounds.height * gradientImage.y1);
            gradientImage.colorStops.forEach(function(colorStop) {
                gradient.addColorStop(colorStop.stop, colorStop.color.toString());
            });
            this.rectangle(bounds.left, bounds.top, bounds.width, bounds.height, gradient);
        }
    };

    CanvasRenderer.prototype.resizeImage = function(imageContainer, size) {
        var image = imageContainer.image;
        if(image.width === size.width && image.height === size.height) {
            return image;
        }

        var ctx, canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, size.width, size.height );
        return canvas;
    };

    function hasEntries(array) {
        return array.length > 0;
    }

    module.exports = CanvasRenderer;

},{"../lineargradientcontainer":14,"../log":15,"../renderer":22}],24:[function(require,module,exports){
    var NodeContainer = require('./nodecontainer');

    function StackingContext(hasOwnStacking, opacity, element, parent) {
        NodeContainer.call(this, element, parent);
        this.ownStacking = hasOwnStacking;
        this.contexts = [];
        this.children = [];
        this.opacity = (this.parent ? this.parent.stack.opacity : 1) * opacity;
    }

    StackingContext.prototype = Object.create(NodeContainer.prototype);

    StackingContext.prototype.getParentStack = function(context) {
        var parentStack = (this.parent) ? this.parent.stack : null;
        return parentStack ? (parentStack.ownStacking ? parentStack : parentStack.getParentStack(context)) : context.stack;
    };

    module.exports = StackingContext;

},{"./nodecontainer":16}],25:[function(require,module,exports){
    function Support(document) {
        this.rangeBounds = this.testRangeBounds(document);
        this.cors = this.testCORS();
        this.svg = this.testSVG();
    }

    Support.prototype.testRangeBounds = function(document) {
        var range, testElement, rangeBounds, rangeHeight, support = false;

        if (document.createRange) {
            range = document.createRange();
            if (range.getBoundingClientRect) {
                testElement = document.createElement('boundtest');
                testElement.style.height = "123px";
                testElement.style.display = "block";
                document.body.appendChild(testElement);

                range.selectNode(testElement);
                rangeBounds = range.getBoundingClientRect();
                rangeHeight = rangeBounds.height;

                if (rangeHeight === 123) {
                    support = true;
                }
                document.body.removeChild(testElement);
            }
        }

        return support;
    };

    Support.prototype.testCORS = function() {
        return typeof((new Image()).crossOrigin) !== "undefined";
    };

    Support.prototype.testSVG = function() {
        var img = new Image();
        var canvas = document.createElement("canvas");
        var ctx =  canvas.getContext("2d");
        img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";

        try {
            ctx.drawImage(img, 0, 0);
            canvas.toDataURL();
        } catch(e) {
            return false;
        }
        return true;
    };

    module.exports = Support;

},{}],26:[function(require,module,exports){
    var Promise = require('./promise');
    var XHR = require('./xhr');
    var decode64 = require('./utils').decode64;

    function SVGContainer(src) {
        this.src = src;
        this.image = null;
        var self = this;

        this.promise = this.hasFabric().then(function() {
            return (self.isInline(src) ? Promise.resolve(self.inlineFormatting(src)) : XHR(src));
        }).then(function(svg) {
            return new Promise(function(resolve) {
                window.html2canvas.svg.fabric.loadSVGFromString(svg, self.createCanvas.call(self, resolve));
            });
        });
    }

    SVGContainer.prototype.hasFabric = function() {
        return !window.html2canvas.svg || !window.html2canvas.svg.fabric ? Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg")) : Promise.resolve();
    };

    SVGContainer.prototype.inlineFormatting = function(src) {
        return (/^data:image\/svg\+xml;base64,/.test(src)) ? this.decode64(this.removeContentType(src)) : this.removeContentType(src);
    };

    SVGContainer.prototype.removeContentType = function(src) {
        return src.replace(/^data:image\/svg\+xml(;base64)?,/,'');
    };

    SVGContainer.prototype.isInline = function(src) {
        return (/^data:image\/svg\+xml/i.test(src));
    };

    SVGContainer.prototype.createCanvas = function(resolve) {
        var self = this;
        return function (objects, options) {
            var canvas = new window.html2canvas.svg.fabric.StaticCanvas('c');
            self.image = canvas.lowerCanvasEl;
            canvas
                .setWidth(options.width)
                .setHeight(options.height)
                .add(window.html2canvas.svg.fabric.util.groupSVGElements(objects, options))
                .renderAll();
            resolve(canvas.lowerCanvasEl);
        };
    };

    SVGContainer.prototype.decode64 = function(str) {
        return (typeof(window.atob) === "function") ? window.atob(str) : decode64(str);
    };

    module.exports = SVGContainer;

},{"./promise":18,"./utils":29,"./xhr":31}],27:[function(require,module,exports){
    var SVGContainer = require('./svgcontainer');
    var Promise = require('./promise');

    function SVGNodeContainer(node, _native) {
        this.src = node;
        this.image = null;
        var self = this;

        this.promise = _native ? new Promise(function(resolve, reject) {
            self.image = new Image();
            self.image.onload = resolve;
            self.image.onerror = reject;
            self.image.src = "data:image/svg+xml," + (new XMLSerializer()).serializeToString(node);
            if (self.image.complete === true) {
                resolve(self.image);
            }
        }) : this.hasFabric().then(function() {
            return new Promise(function(resolve) {
                window.html2canvas.svg.fabric.parseSVGDocument(node, self.createCanvas.call(self, resolve));
            });
        });
    }

    SVGNodeContainer.prototype = Object.create(SVGContainer.prototype);

    module.exports = SVGNodeContainer;

},{"./promise":18,"./svgcontainer":26}],28:[function(require,module,exports){
    var NodeContainer = require('./nodecontainer');

    function TextContainer(node, parent) {
        NodeContainer.call(this, node, parent);
    }

    TextContainer.prototype = Object.create(NodeContainer.prototype);

    TextContainer.prototype.applyTextTransform = function() {
        this.node.data = this.transform(this.parent.css("textTransform"));
    };

    TextContainer.prototype.transform = function(transform) {
        var text = this.node.data;
        switch(transform){
            case "lowercase":
                return text.toLowerCase();
            case "capitalize":
                return text.replace(/(^|\s|:|-|\(|\))([a-z])/g, capitalize);
            case "uppercase":
                return text.toUpperCase();
            default:
                return text;
        }
    };

    function capitalize(m, p1, p2) {
        if (m.length > 0) {
            return p1 + p2.toUpperCase();
        }
    }

    module.exports = TextContainer;

},{"./nodecontainer":16}],29:[function(require,module,exports){
    exports.smallImage = function smallImage() {
        return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    };

    exports.bind = function(callback, context) {
        return function() {
            return callback.apply(context, arguments);
        };
    };

    /*
     * base64-arraybuffer
     * https://github.com/niklasvh/base64-arraybuffer
     *
     * Copyright (c) 2012 Niklas von Hertzen
     * Licensed under the MIT license.
     */

    exports.decode64 = function(base64) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var len = base64.length, i, encoded1, encoded2, encoded3, encoded4, byte1, byte2, byte3;

        var output = "";

        for (i = 0; i < len; i+=4) {
            encoded1 = chars.indexOf(base64[i]);
            encoded2 = chars.indexOf(base64[i+1]);
            encoded3 = chars.indexOf(base64[i+2]);
            encoded4 = chars.indexOf(base64[i+3]);

            byte1 = (encoded1 << 2) | (encoded2 >> 4);
            byte2 = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            byte3 = ((encoded3 & 3) << 6) | encoded4;
            if (encoded3 === 64) {
                output += String.fromCharCode(byte1);
            } else if (encoded4 === 64 || encoded4 === -1) {
                output += String.fromCharCode(byte1, byte2);
            } else{
                output += String.fromCharCode(byte1, byte2, byte3);
            }
        }

        return output;
    };

    exports.getBounds = function(node) {
        if (node.getBoundingClientRect) {
            var clientRect = node.getBoundingClientRect();
            var width = node.offsetWidth == null ? clientRect.width : node.offsetWidth;
            return {
                top: clientRect.top,
                bottom: clientRect.bottom || (clientRect.top + clientRect.height),
                right: clientRect.left + width,
                left: clientRect.left,
                width:  width,
                height: node.offsetHeight == null ? clientRect.height : node.offsetHeight
            };
        }
        return {};
    };

    exports.offsetBounds = function(node) {
        var parent = node.offsetParent ? exports.offsetBounds(node.offsetParent) : {top: 0, left: 0};

        return {
            top: node.offsetTop + parent.top,
            bottom: node.offsetTop + node.offsetHeight + parent.top,
            right: node.offsetLeft + parent.left + node.offsetWidth,
            left: node.offsetLeft + parent.left,
            width: node.offsetWidth,
            height: node.offsetHeight
        };
    };

    exports.parseBackgrounds = function(backgroundImage) {
        var whitespace = ' \r\n\t',
            method, definition, prefix, prefix_i, block, results = [],
            mode = 0, numParen = 0, quote, args;
        var appendResult = function() {
            if(method) {
                if (definition.substr(0, 1) === '"') {
                    definition = definition.substr(1, definition.length - 2);
                }
                if (definition) {
                    args.push(definition);
                }
                if (method.substr(0, 1) === '-' && (prefix_i = method.indexOf('-', 1 ) + 1) > 0) {
                    prefix = method.substr(0, prefix_i);
                    method = method.substr(prefix_i);
                }
                results.push({
                    prefix: prefix,
                    method: method.toLowerCase(),
                    value: block,
                    args: args,
                    image: null
                });
            }
            args = [];
            method = prefix = definition = block = '';
        };
        args = [];
        method = prefix = definition = block = '';
        backgroundImage.split("").forEach(function(c) {
            if (mode === 0 && whitespace.indexOf(c) > -1) {
                return;
            }
            switch(c) {
                case '"':
                    if(!quote) {
                        quote = c;
                    } else if(quote === c) {
                        quote = null;
                    }
                    break;
                case '(':
                    if(quote) {
                        break;
                    } else if(mode === 0) {
                        mode = 1;
                        block += c;
                        return;
                    } else {
                        numParen++;
                    }
                    break;
                case ')':
                    if (quote) {
                        break;
                    } else if(mode === 1) {
                        if(numParen === 0) {
                            mode = 0;
                            block += c;
                            appendResult();
                            return;
                        } else {
                            numParen--;
                        }
                    }
                    break;

                case ',':
                    if (quote) {
                        break;
                    } else if(mode === 0) {
                        appendResult();
                        return;
                    } else if (mode === 1) {
                        if (numParen === 0 && !method.match(/^url$/i)) {
                            args.push(definition);
                            definition = '';
                            block += c;
                            return;
                        }
                    }
                    break;
            }

            block += c;
            if (mode === 0) {
                method += c;
            } else {
                definition += c;
            }
        });

        appendResult();
        return results;
    };

},{}],30:[function(require,module,exports){
    var GradientContainer = require('./gradientcontainer');

    function WebkitGradientContainer(imageData) {
        GradientContainer.apply(this, arguments);
        this.type = (imageData.args[0] === "linear") ? this.TYPES.LINEAR : this.TYPES.RADIAL;
    }

    WebkitGradientContainer.prototype = Object.create(GradientContainer.prototype);

    module.exports = WebkitGradientContainer;

},{"./gradientcontainer":11}],31:[function(require,module,exports){
    var Promise = require('./promise');

    function XHR(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(new Error(xhr.statusText));
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };

            xhr.send();
        });
    }

    module.exports = XHR;

},{"./promise":18}]},{},[6])(6)
});
/*! VelocityJS.org (1.2.2). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */

/*************************
   Velocity jQuery Shim
*************************/

/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */

/* This file contains the jQuery functions that Velocity relies on, thereby removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */
/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity defaults to jQuery proper. */
/* Browser support: Using this shim instead of jQuery proper removes support for IE8. */

;(function (window) {
    /***************
         Setup
    ***************/

    /* If jQuery is already loaded, there's no point in loading this shim. */
    if (window.jQuery) {
        return;
    }

    /* jQuery base. */
    var $ = function (selector, context) {
        return new $.fn.init(selector, context);
    };

    /********************
       Private Methods
    ********************/

    /* jQuery */
    $.isWindow = function (obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
    };

    /* jQuery */
    $.type = function (obj) {
        if (obj == null) {
            return obj + "";
        }

        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    };

    /* jQuery */
    $.isArray = Array.isArray || function (obj) {
        return $.type(obj) === "array";
    };

    /* jQuery */
    function isArraylike (obj) {
        var length = obj.length,
            type = $.type(obj);

        if (type === "function" || $.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
    }

    /***************
       $ Methods
    ***************/

    /* jQuery: Support removed for IE<9. */
    $.isPlainObject = function (obj) {
        var key;

        if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
            return false;
        }

        try {
            if (obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }

        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key);
    };

    /* jQuery */
    $.each = function(obj, callback, args) {
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike(obj);

        if (args) {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            }

        } else {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            }
        }

        return obj;
    };

    /* Custom */
    $.data = function (node, key, value) {
        /* $.getData() */
        if (value === undefined) {
            var id = node[$.expando],
                store = id && cache[id];

            if (key === undefined) {
                return store;
            } else if (store) {
                if (key in store) {
                    return store[key];
                }
            }
        /* $.setData() */
        } else if (key !== undefined) {
            var id = node[$.expando] || (node[$.expando] = ++$.uuid);

            cache[id] = cache[id] || {};
            cache[id][key] = value;

            return value;
        }
    };

    /* Custom */
    $.removeData = function (node, keys) {
        var id = node[$.expando],
            store = id && cache[id];

        if (store) {
            $.each(keys, function(_, key) {
                delete store[key];
            });
        }
    };

    /* jQuery */
    $.extend = function () {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;

            target = arguments[i] || {};
            i++;
        }

        if (typeof target !== "object" && $.type(target) !== "function") {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && $.isArray(src) ? src : [];

                        } else {
                            clone = src && $.isPlainObject(src) ? src : {};
                        }

                        target[name] = $.extend(deep, clone, copy);

                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };

    /* jQuery 1.4.3 */
    $.queue = function (elem, type, data) {
        function $makeArray (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    /* $.merge */
                    (function(first, second) {
                        var len = +second.length,
                            j = 0,
                            i = first.length;

                        while (j < len) {
                            first[i++] = second[j++];
                        }

                        if (len !== len) {
                            while (second[j] !== undefined) {
                                first[i++] = second[j++];
                            }
                        }

                        first.length = i;

                        return first;
                    })(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                    [].push.call(ret, arr);
                }
            }

            return ret;
        }

        if (!elem) {
            return;
        }

        type = (type || "fx") + "queue";

        var q = $.data(elem, type);

        if (!data) {
            return q || [];
        }

        if (!q || $.isArray(data)) {
            q = $.data(elem, type, $makeArray(data));
        } else {
            q.push(data);
        }

        return q;
    };

    /* jQuery 1.4.3 */
    $.dequeue = function (elems, type) {
        /* Custom: Embed element iteration. */
        $.each(elems.nodeType ? [ elems ] : elems, function(i, elem) {
            type = type || "fx";

            var queue = $.queue(elem, type),
                fn = queue.shift();

            if (fn === "inprogress") {
                fn = queue.shift();
            }

            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                fn.call(elem, function() {
                    $.dequeue(elem, type);
                });
            }
        });
    };

    /******************
       $.fn Methods
    ******************/

    /* jQuery */
    $.fn = $.prototype = {
        init: function (selector) {
            /* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
            if (selector.nodeType) {
                this[0] = selector;

                return this;
            } else {
                throw new Error("Not a DOM node.");
            }
        },

        offset: function () {
            /* jQuery altered code: Dropped disconnected DOM node checking. */
            var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };

            return {
                top: box.top + (window.pageYOffset || document.scrollTop  || 0)  - (document.clientTop  || 0),
                left: box.left + (window.pageXOffset || document.scrollLeft  || 0) - (document.clientLeft || 0)
            };
        },

        position: function () {
            /* jQuery */
            function offsetParent() {
                var offsetParent = this.offsetParent || document;

                while (offsetParent && (!offsetParent.nodeType.toLowerCase === "html" && offsetParent.style.position === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || document;
            }

            /* Zepto */
            var elem = this[0],
                offsetParent = offsetParent.apply(elem),
                offset = this.offset(),
                parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? { top: 0, left: 0 } : $(offsetParent).offset()

            offset.top -= parseFloat(elem.style.marginTop) || 0;
            offset.left -= parseFloat(elem.style.marginLeft) || 0;

            if (offsetParent.style) {
                parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0
                parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0
            }

            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        }
    };

    /**********************
       Private Variables
    **********************/

    /* For $.data() */
    var cache = {};
    $.expando = "velocity" + (new Date().getTime());
    $.uuid = 0;

    /* For $.queue() */
    var class2type = {},
        hasOwn = class2type.hasOwnProperty,
        toString = class2type.toString;

    var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
    for (var i = 0; i < types.length; i++) {
        class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
    }

    /* Makes $(node) possible, without having to call init. */
    $.fn.init.prototype = $.fn;

    /* Globalize Velocity onto the window, and assign its Utilities property. */
    window.Velocity = { Utilities: $ };
})(window);

/******************
    Velocity.js
******************/

;(function (factory) {
    /* CommonJS module. */
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    /* AMD module. */
    } else if (typeof define === "function" && define.amd) {
        define(factory);
    /* Browser globals. */
    } else {
        factory();
    }
}(function() {
return function (global, window, document, undefined) {

    /***************
        Summary
    ***************/

    /*
    - CSS: CSS stack that works independently from the rest of Velocity.
    - animate(): Core animation method that iterates over the targeted elements and queues the incoming call onto each element individually.
      - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
      - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
                  Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
      - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
    - tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
    - completeCall(): Handles the cleanup process for each Velocity call.
    */

    /*********************
       Helper Functions
    *********************/

    /* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
    var IE = (function() {
        if (document.documentMode) {
            return document.documentMode;
        } else {
            for (var i = 7; i > 4; i--) {
                var div = document.createElement("div");

                div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

                if (div.getElementsByTagName("span").length) {
                    div = null;

                    return i;
                }
            }
        }

        return undefined;
    })();

    /* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
    var rAFShim = (function() {
        var timeLast = 0;

        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            var timeCurrent = (new Date()).getTime(),
                timeDelta;

            /* Dynamically set delay on a per-tick basis to match 60fps. */
            /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
            timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
            timeLast = timeCurrent + timeDelta;

            return setTimeout(function() { callback(timeCurrent + timeDelta); }, timeDelta);
        };
    })();

    /* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
    function compactSparseArray (array) {
        var index = -1,
            length = array ? array.length : 0,
            result = [];

        while (++index < length) {
            var value = array[index];

            if (value) {
                result.push(value);
            }
        }

        return result;
    }

    function sanitizeElements (elements) {
        /* Unwrap jQuery/Zepto objects. */
        if (Type.isWrapped(elements)) {
            elements = [].slice.call(elements);
        /* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
        } else if (Type.isNode(elements)) {
            elements = [ elements ];
        }

        return elements;
    }

    var Type = {
        isString: function (variable) {
            return (typeof variable === "string");
        },
        isArray: Array.isArray || function (variable) {
            return Object.prototype.toString.call(variable) === "[object Array]";
        },
        isFunction: function (variable) {
            return Object.prototype.toString.call(variable) === "[object Function]";
        },
        isNode: function (variable) {
            return variable && variable.nodeType;
        },
        /* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
        isNodeList: function (variable) {
            return typeof variable === "object" &&
                /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) &&
                variable.length !== undefined &&
                (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
        },
        /* Determine if variable is a wrapped jQuery or Zepto element. */
        isWrapped: function (variable) {
            return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
        },
        isSVG: function (variable) {
            return window.SVGElement && (variable instanceof window.SVGElement);
        },
        isEmptyObject: function (variable) {
            for (var name in variable) {
                return false;
            }

            return true;
        }
    };

    /*****************
       Dependencies
    *****************/

    var $,
        isJQuery = false;

    if (global.fn && global.fn.jquery) {
        $ = global;
        isJQuery = true;
    } else {
        $ = window.Velocity.Utilities;
    }

    if (IE <= 8 && !isJQuery) {
        throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
    } else if (IE <= 7) {
        /* Revert to jQuery's $.animate(), and lose Velocity's extra features. */
        jQuery.fn.velocity = jQuery.fn.animate;

        /* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
        return;
    }

    /*****************
        Constants
    *****************/

    var DURATION_DEFAULT = 400,
        EASING_DEFAULT = "swing";

    /*************
        State
    *************/

    var Velocity = {
        /* Container for page-wide Velocity state data. */
        State: {
            /* Detect mobile devices to determine if mobileHA should be turned on. */
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            /* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
            isAndroid: /Android/i.test(navigator.userAgent),
            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
            isChrome: window.chrome,
            isFirefox: /Firefox/i.test(navigator.userAgent),
            /* Create a cached element for re-use when checking for CSS property prefixes. */
            prefixElement: document.createElement("div"),
            /* Cache every prefix match to avoid repeating lookups. */
            prefixMatches: {},
            /* Cache the anchor used for animating window scrolling. */
            scrollAnchor: null,
            /* Cache the browser-specific property names associated with the scroll anchor. */
            scrollPropertyLeft: null,
            scrollPropertyTop: null,
            /* Keep track of whether our RAF tick is running. */
            isTicking: false,
            /* Container for every in-progress call to Velocity. */
            calls: []
        },
        /* Velocity's custom CSS stack. Made global for unit testing. */
        CSS: { /* Defined below. */ },
        /* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */
        Utilities: $,
        /* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */
        Redirects: { /* Manually registered by the user. */ },
        Easings: { /* Defined below. */ },
        /* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
        Promise: window.Promise,
        /* Velocity option defaults, which can be overriden by the user. */
        defaults: {
            queue: "",
            duration: DURATION_DEFAULT,
            easing: EASING_DEFAULT,
            begin: undefined,
            complete: undefined,
            progress: undefined,
            display: undefined,
            visibility: undefined,
            loop: false,
            delay: false,
            mobileHA: true,
            /* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
            _cacheValues: true
        },
        /* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */
        init: function (element) {
            $.data(element, "velocity", {
                /* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
                isSVG: Type.isSVG(element),
                /* Keep track of whether the element is currently being animated by Velocity.
                   This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
                isAnimating: false,
                /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
                computedStyle: null,
                /* Tween data is cached for each animation on the element so that data can be passed across calls --
                   in particular, end values are used as subsequent start values in consecutive Velocity calls. */
                tweensContainer: null,
                /* The full root property values of each CSS hook being animated on this element are cached so that:
                   1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
                   2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
                rootPropertyValueCache: {},
                /* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
                transformCache: {}
            });
        },
        /* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
        hook: null, /* Defined below. */
        /* Velocity-wide animation time remapping for testing purposes. */
        mock: false,
        version: { major: 1, minor: 2, patch: 2 },
        /* Set to 1 or 2 (most verbose) to output debug info to console. */
        debug: false
    };

    /* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
    if (window.pageYOffset !== undefined) {
        Velocity.State.scrollAnchor = window;
        Velocity.State.scrollPropertyLeft = "pageXOffset";
        Velocity.State.scrollPropertyTop = "pageYOffset";
    } else {
        Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
        Velocity.State.scrollPropertyLeft = "scrollLeft";
        Velocity.State.scrollPropertyTop = "scrollTop";
    }

    /* Shorthand alias for jQuery's $.data() utility. */
    function Data (element) {
        /* Hardcode a reference to the plugin name. */
        var response = $.data(element, "velocity");

        /* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
        return response === null ? undefined : response;
    };

    /**************
        Easing
    **************/

    /* Step easing generator. */
    function generateStep (steps) {
        return function (p) {
            return Math.round(p * steps) * (1 / steps);
        };
    }

    /* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    function generateBezier (mX1, mY1, mX2, mY2) {
        var NEWTON_ITERATIONS = 4,
            NEWTON_MIN_SLOPE = 0.001,
            SUBDIVISION_PRECISION = 0.0000001,
            SUBDIVISION_MAX_ITERATIONS = 10,
            kSplineTableSize = 11,
            kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
            float32ArraySupported = "Float32Array" in window;

        /* Must contain four arguments. */
        if (arguments.length !== 4) {
            return false;
        }

        /* Arguments must be numbers. */
        for (var i = 0; i < 4; ++i) {
            if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
                return false;
            }
        }

        /* X values must be in the [0, 1] range. */
        mX1 = Math.min(mX1, 1);
        mX2 = Math.min(mX2, 1);
        mX1 = Math.max(mX1, 0);
        mX2 = Math.max(mX2, 0);

        var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

        function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
        function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
        function C (aA1)      { return 3.0 * aA1; }

        function calcBezier (aT, aA1, aA2) {
            return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
        }

        function getSlope (aT, aA1, aA2) {
            return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
        }

        function newtonRaphsonIterate (aX, aGuessT) {
            for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);

                if (currentSlope === 0.0) return aGuessT;

                var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }

            return aGuessT;
        }

        function calcSampleValues () {
            for (var i = 0; i < kSplineTableSize; ++i) {
                mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
            }
        }

        function binarySubdivide (aX, aA, aB) {
            var currentX, currentT, i = 0;

            do {
                currentT = aA + (aB - aA) / 2.0;
                currentX = calcBezier(currentT, mX1, mX2) - aX;
                if (currentX > 0.0) {
                  aB = currentT;
                } else {
                  aA = currentT;
                }
            } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

            return currentT;
        }

        function getTForX (aX) {
            var intervalStart = 0.0,
                currentSample = 1,
                lastSample = kSplineTableSize - 1;

            for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
                intervalStart += kSampleStepSize;
            }

            --currentSample;

            var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample+1] - mSampleValues[currentSample]),
                guessForT = intervalStart + dist * kSampleStepSize,
                initialSlope = getSlope(guessForT, mX1, mX2);

            if (initialSlope >= NEWTON_MIN_SLOPE) {
                return newtonRaphsonIterate(aX, guessForT);
            } else if (initialSlope == 0.0) {
                return guessForT;
            } else {
                return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
            }
        }

        var _precomputed = false;

        function precompute() {
            _precomputed = true;
            if (mX1 != mY1 || mX2 != mY2) calcSampleValues();
        }

        var f = function (aX) {
            if (!_precomputed) precompute();
            if (mX1 === mY1 && mX2 === mY2) return aX;
            if (aX === 0) return 0;
            if (aX === 1) return 1;

            return calcBezier(getTForX(aX), mY1, mY2);
        };

        f.getControlPoints = function() { return [{ x: mX1, y: mY1 }, { x: mX2, y: mY2 }]; };

        var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
        f.toString = function () { return str; };

        return f;
    }

    /* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    /* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
       then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
    var generateSpringRK4 = (function () {
        function springAccelerationForState (state) {
            return (-state.tension * state.x) - (state.friction * state.v);
        }

        function springEvaluateStateWithDerivative (initialState, dt, derivative) {
            var state = {
                x: initialState.x + derivative.dx * dt,
                v: initialState.v + derivative.dv * dt,
                tension: initialState.tension,
                friction: initialState.friction
            };

            return { dx: state.v, dv: springAccelerationForState(state) };
        }

        function springIntegrateState (state, dt) {
            var a = {
                    dx: state.v,
                    dv: springAccelerationForState(state)
                },
                b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
                c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
                d = springEvaluateStateWithDerivative(state, dt, c),
                dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
                dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

            state.x = state.x + dxdt * dt;
            state.v = state.v + dvdt * dt;

            return state;
        }

        return function springRK4Factory (tension, friction, duration) {

            var initState = {
                    x: -1,
                    v: 0,
                    tension: null,
                    friction: null
                },
                path = [0],
                time_lapsed = 0,
                tolerance = 1 / 10000,
                DT = 16 / 1000,
                have_duration, dt, last_state;

            tension = parseFloat(tension) || 500;
            friction = parseFloat(friction) || 20;
            duration = duration || null;

            initState.tension = tension;
            initState.friction = friction;

            have_duration = duration !== null;

            /* Calculate the actual time it takes for this animation to complete with the provided conditions. */
            if (have_duration) {
                /* Run the simulation without a duration. */
                time_lapsed = springRK4Factory(tension, friction);
                /* Compute the adjusted time delta. */
                dt = time_lapsed / duration * DT;
            } else {
                dt = DT;
            }

            while (true) {
                /* Next/step function .*/
                last_state = springIntegrateState(last_state || initState, dt);
                /* Store the position. */
                path.push(1 + last_state.x);
                time_lapsed += 16;
                /* If the change threshold is reached, break. */
                if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
                    break;
                }
            }

            /* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
               computed path and returns a snapshot of the position according to a given percentComplete. */
            return !have_duration ? time_lapsed : function(percentComplete) { return path[ (percentComplete * (path.length - 1)) | 0 ]; };
        };
    }());

    /* jQuery easings. */
    Velocity.Easings = {
        linear: function(p) { return p; },
        swing: function(p) { return 0.5 - Math.cos( p * Math.PI ) / 2 },
        /* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
        spring: function(p) { return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6)); }
    };

    /* CSS3 and Robert Penner easings. */
    $.each(
        [
            [ "ease", [ 0.25, 0.1, 0.25, 1.0 ] ],
            [ "ease-in", [ 0.42, 0.0, 1.00, 1.0 ] ],
            [ "ease-out", [ 0.00, 0.0, 0.58, 1.0 ] ],
            [ "ease-in-out", [ 0.42, 0.0, 0.58, 1.0 ] ],
            [ "easeInSine", [ 0.47, 0, 0.745, 0.715 ] ],
            [ "easeOutSine", [ 0.39, 0.575, 0.565, 1 ] ],
            [ "easeInOutSine", [ 0.445, 0.05, 0.55, 0.95 ] ],
            [ "easeInQuad", [ 0.55, 0.085, 0.68, 0.53 ] ],
            [ "easeOutQuad", [ 0.25, 0.46, 0.45, 0.94 ] ],
            [ "easeInOutQuad", [ 0.455, 0.03, 0.515, 0.955 ] ],
            [ "easeInCubic", [ 0.55, 0.055, 0.675, 0.19 ] ],
            [ "easeOutCubic", [ 0.215, 0.61, 0.355, 1 ] ],
            [ "easeInOutCubic", [ 0.645, 0.045, 0.355, 1 ] ],
            [ "easeInQuart", [ 0.895, 0.03, 0.685, 0.22 ] ],
            [ "easeOutQuart", [ 0.165, 0.84, 0.44, 1 ] ],
            [ "easeInOutQuart", [ 0.77, 0, 0.175, 1 ] ],
            [ "easeInQuint", [ 0.755, 0.05, 0.855, 0.06 ] ],
            [ "easeOutQuint", [ 0.23, 1, 0.32, 1 ] ],
            [ "easeInOutQuint", [ 0.86, 0, 0.07, 1 ] ],
            [ "easeInExpo", [ 0.95, 0.05, 0.795, 0.035 ] ],
            [ "easeOutExpo", [ 0.19, 1, 0.22, 1 ] ],
            [ "easeInOutExpo", [ 1, 0, 0, 1 ] ],
            [ "easeInCirc", [ 0.6, 0.04, 0.98, 0.335 ] ],
            [ "easeOutCirc", [ 0.075, 0.82, 0.165, 1 ] ],
            [ "easeInOutCirc", [ 0.785, 0.135, 0.15, 0.86 ] ]
        ], function(i, easingArray) {
            Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
        });

    /* Determine the appropriate easing type given an easing input. */
    function getEasing(value, duration) {
        var easing = value;

        /* The easing option can either be a string that references a pre-registered easing,
           or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
        if (Type.isString(value)) {
            /* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
            if (!Velocity.Easings[value]) {
                easing = false;
            }
        } else if (Type.isArray(value) && value.length === 1) {
            easing = generateStep.apply(null, value);
        } else if (Type.isArray(value) && value.length === 2) {
            /* springRK4 must be passed the animation's duration. */
            /* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
               function generated with default tension and friction values. */
            easing = generateSpringRK4.apply(null, value.concat([ duration ]));
        } else if (Type.isArray(value) && value.length === 4) {
            /* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
            easing = generateBezier.apply(null, value);
        } else {
            easing = false;
        }

        /* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
           if the Velocity-wide default has been incorrectly modified. */
        if (easing === false) {
            if (Velocity.Easings[Velocity.defaults.easing]) {
                easing = Velocity.defaults.easing;
            } else {
                easing = EASING_DEFAULT;
            }
        }

        return easing;
    }

    /*****************
        CSS Stack
    *****************/

    /* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
       It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
    /* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
    var CSS = Velocity.CSS = {

        /*************
            RegEx
        *************/

        RegEx: {
            isHex: /^#([A-f\d]{3}){1,2}$/i,
            /* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
            valueUnwrap: /^[A-z]+\((.*)\)$/i,
            wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
            /* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
            valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
        },

        /************
            Lists
        ************/

        Lists: {
            colors: [ "fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor" ],
            transformsBase: [ "translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ" ],
            transforms3D: [ "transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY" ]
        },

        /************
            Hooks
        ************/

        /* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
           (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
        /* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
           tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
        Hooks: {
            /********************
                Registration
            ********************/

            /* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
            /* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
            templates: {
                "textShadow": [ "Color X Y Blur", "black 0px 0px 0px" ],
                "boxShadow": [ "Color X Y Blur Spread", "black 0px 0px 0px 0px" ],
                "clip": [ "Top Right Bottom Left", "0px 0px 0px 0px" ],
                "backgroundPosition": [ "X Y", "0% 0%" ],
                "transformOrigin": [ "X Y Z", "50% 50% 0px" ],
                "perspectiveOrigin": [ "X Y", "50% 50%" ]
            },

            /* A "registered" hook is one that has been converted from its template form into a live,
               tweenable property. It contains data to associate it with its root property. */
            registered: {
                /* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
                   which consists of the subproperty's name, the associated root property's name,
                   and the subproperty's position in the root's value. */
            },
            /* Convert the templates into individual hooks then append them to the registered object above. */
            register: function () {
                /* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
                   currently set to "transparent" default to their respective template below when color-animated,
                   and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
                   which is almost always set closer to black than white. */
                for (var i = 0; i < CSS.Lists.colors.length; i++) {
                    var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
                    CSS.Hooks.templates[CSS.Lists.colors[i]] = [ "Red Green Blue Alpha", rgbComponents ];
                }

                var rootProperty,
                    hookTemplate,
                    hookNames;

                /* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
                   Thus, we re-arrange the templates accordingly. */
                if (IE) {
                    for (rootProperty in CSS.Hooks.templates) {
                        hookTemplate = CSS.Hooks.templates[rootProperty];
                        hookNames = hookTemplate[0].split(" ");

                        var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

                        if (hookNames[0] === "Color") {
                            /* Reposition both the hook's name and its default value to the end of their respective strings. */
                            hookNames.push(hookNames.shift());
                            defaultValues.push(defaultValues.shift());

                            /* Replace the existing template for the hook's root property. */
                            CSS.Hooks.templates[rootProperty] = [ hookNames.join(" "), defaultValues.join(" ") ];
                        }
                    }
                }

                /* Hook registration. */
                for (rootProperty in CSS.Hooks.templates) {
                    hookTemplate = CSS.Hooks.templates[rootProperty];
                    hookNames = hookTemplate[0].split(" ");

                    for (var i in hookNames) {
                        var fullHookName = rootProperty + hookNames[i],
                            hookPosition = i;

                        /* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
                           and the hook's position in its template's default value string. */
                        CSS.Hooks.registered[fullHookName] = [ rootProperty, hookPosition ];
                    }
                }
            },

            /*****************************
               Injection and Extraction
            *****************************/

            /* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
            /* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
            getRoot: function (property) {
                var hookData = CSS.Hooks.registered[property];

                if (hookData) {
                    return hookData[0];
                } else {
                    /* If there was no hook match, return the property name untouched. */
                    return property;
                }
            },
            /* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
               the targeted hook can be injected or extracted at its standard position. */
            cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
                /* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
                if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
                    rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
                }

                /* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
                   default to the root's default value as defined in CSS.Hooks.templates. */
                /* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
                   zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
                if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                }

                return rootPropertyValue;
            },
            /* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
            extractValue: function (fullHookName, rootPropertyValue) {
                var hookData = CSS.Hooks.registered[fullHookName];

                if (hookData) {
                    var hookRoot = hookData[0],
                        hookPosition = hookData[1];

                    rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

                    /* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
                    return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
                } else {
                    /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
                    return rootPropertyValue;
                }
            },
            /* Inject the hook's value into its root property's value. This is used to piece back together the root property
               once Velocity has updated one of its individually hooked values through tweening. */
            injectValue: function (fullHookName, hookValue, rootPropertyValue) {
                var hookData = CSS.Hooks.registered[fullHookName];

                if (hookData) {
                    var hookRoot = hookData[0],
                        hookPosition = hookData[1],
                        rootPropertyValueParts,
                        rootPropertyValueUpdated;

                    rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

                    /* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
                       then reconstruct the rootPropertyValue string. */
                    rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
                    rootPropertyValueParts[hookPosition] = hookValue;
                    rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

                    return rootPropertyValueUpdated;
                } else {
                    /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
                    return rootPropertyValue;
                }
            }
        },

        /*******************
           Normalizations
        *******************/

        /* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
           and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
        Normalizations: {
            /* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
               the targeted element (which may need to be queried), and the targeted property value. */
            registered: {
                clip: function (type, element, propertyValue) {
                    switch (type) {
                        case "name":
                            return "clip";
                        /* Clip needs to be unwrapped and stripped of its commas during extraction. */
                        case "extract":
                            var extracted;

                            /* If Velocity also extracted this value, skip extraction. */
                            if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                extracted = propertyValue;
                            } else {
                                /* Remove the "rect()" wrapper. */
                                extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

                                /* Strip off commas. */
                                extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                            }

                            return extracted;
                        /* Clip needs to be re-wrapped during injection. */
                        case "inject":
                            return "rect(" + propertyValue + ")";
                    }
                },

                blur: function(type, element, propertyValue) {
                    switch (type) {
                        case "name":
                            return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
                        case "extract":
                            var extracted = parseFloat(propertyValue);

                            /* If extracted is NaN, meaning the value isn't already extracted. */
                            if (!(extracted || extracted === 0)) {
                                var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);

                                /* If the filter string had a blur component, return just the blur value and unit type. */
                                if (blurComponent) {
                                    extracted = blurComponent[1];
                                /* If the component doesn't exist, default blur to 0. */
                                } else {
                                    extracted = 0;
                                }
                            }

                            return extracted;
                        /* Blur needs to be re-wrapped during injection. */
                        case "inject":
                            /* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */
                            if (!parseFloat(propertyValue)) {
                                return "none";
                            } else {
                                return "blur(" + propertyValue + ")";
                            }
                    }
                },

                /* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
                opacity: function (type, element, propertyValue) {
                    if (IE <= 8) {
                        switch (type) {
                            case "name":
                                return "filter";
                            case "extract":
                                /* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
                                   Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
                                var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

                                if (extracted) {
                                    /* Convert to decimal value. */
                                    propertyValue = extracted[1] / 100;
                                } else {
                                    /* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
                                    propertyValue = 1;
                                }

                                return propertyValue;
                            case "inject":
                                /* Opacified elements are required to have their zoom property set to a non-zero value. */
                                element.style.zoom = 1;

                                /* Setting the filter property on elements with certain font property combinations can result in a
                                   highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
                                   value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
                                if (parseFloat(propertyValue) >= 1) {
                                    return "";
                                } else {
                                  /* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
                                  return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                                }
                        }
                    /* With all other browsers, normalization is not required; return the same values that were passed in. */
                    } else {
                        switch (type) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return propertyValue;
                            case "inject":
                                return propertyValue;
                        }
                    }
                }
            },

            /*****************************
                Batched Registrations
            *****************************/

            /* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
            register: function () {

                /*****************
                    Transforms
                *****************/

                /* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
                   so that they can be referenced in a properties map by their individual names. */
                /* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
                   setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
                   Transform setting is batched in this way to improve performance: the transform style only needs to be updated
                   once when multiple transform subproperties are being animated simultaneously. */
                /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
                   transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
                   from being normalized for these browsers so that tweening skips these properties altogether
                   (since it will ignore them as being unsupported by the browser.) */
                if (!(IE <= 9) && !Velocity.State.isGingerbread) {
                    /* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
                    share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
                    CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
                }

                for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
                    /* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
                    paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
                    (function() {
                        var transformName = CSS.Lists.transformsBase[i];

                        CSS.Normalizations.registered[transformName] = function (type, element, propertyValue) {
                            switch (type) {
                                /* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
                                case "name":
                                    return "transform";
                                /* Transform values are cached onto a per-element transformCache object. */
                                case "extract":
                                    /* If this transform has yet to be assigned a value, return its null value. */
                                    if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
                                        /* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
                                        return /^scale/i.test(transformName) ? 1 : 0;
                                    /* When transform values are set, they are wrapped in parentheses as per the CSS spec.
                                       Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
                                    } else {
                                        return Data(element).transformCache[transformName].replace(/[()]/g, "");
                                    }
                                case "inject":
                                    var invalid = false;

                                    /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                                       Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
                                    /* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
                                    switch (transformName.substr(0, transformName.length - 1)) {
                                        /* Whitelist unit types for each transform. */
                                        case "translate":
                                            invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                                            break;
                                        /* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
                                        case "scal":
                                        case "scale":
                                            /* Chrome on Android has a bug in which scaled elements blur if their initial scale
                                               value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                                               and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
                                            if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                                                propertyValue = 1;
                                            }

                                            invalid = !/(\d)$/i.test(propertyValue);
                                            break;
                                        case "skew":
                                            invalid = !/(deg|\d)$/i.test(propertyValue);
                                            break;
                                        case "rotate":
                                            invalid = !/(deg|\d)$/i.test(propertyValue);
                                            break;
                                    }

                                    if (!invalid) {
                                        /* As per the CSS spec, wrap the value in parentheses. */
                                        Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                                    }

                                    /* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
                                    return Data(element).transformCache[transformName];
                            }
                        };
                    })();
                }

                /*************
                    Colors
                *************/

                /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
                   Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
                for (var i = 0; i < CSS.Lists.colors.length; i++) {
                    /* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
                       (Otherwise, all functions would take the final for loop's colorName.) */
                    (function () {
                        var colorName = CSS.Lists.colors[i];

                        /* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
                        CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
                            switch (type) {
                                case "name":
                                    return colorName;
                                /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
                                case "extract":
                                    var extracted;

                                    /* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
                                    if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                        extracted = propertyValue;
                                    } else {
                                        var converted,
                                            colorNames = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };

                                        /* Convert color names to rgb. */
                                        if (/^[A-z]+$/i.test(propertyValue)) {
                                            if (colorNames[propertyValue] !== undefined) {
                                                converted = colorNames[propertyValue]
                                            } else {
                                                /* If an unmatched color name is provided, default to black. */
                                                converted = colorNames.black;
                                            }
                                        /* Convert hex values to rgb. */
                                        } else if (CSS.RegEx.isHex.test(propertyValue)) {
                                            converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                                        /* If the provided color doesn't match any of the accepted color formats, default to black. */
                                        } else if (!(/^rgba?\(/i.test(propertyValue))) {
                                            converted = colorNames.black;
                                        }

                                        /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                                           repeated spaces (in case the value included spaces to begin with). */
                                        extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                                    }

                                    /* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                                    if (!(IE <= 8) && extracted.split(" ").length === 3) {
                                        extracted += " 1";
                                    }

                                    return extracted;
                                case "inject":
                                    /* If this is IE<=8 and an alpha component exists, strip it off. */
                                    if (IE <= 8) {
                                        if (propertyValue.split(" ").length === 4) {
                                            propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                                        }
                                    /* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                                    } else if (propertyValue.split(" ").length === 3) {
                                        propertyValue += " 1";
                                    }

                                    /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                                       on all values but the fourth (R, G, and B only accept whole numbers). */
                                    return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                            }
                        };
                    })();
                }
            }
        },

        /************************
           CSS Property Names
        ************************/

        Names: {
            /* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
               Camelcasing is used to normalize property names between and across calls. */
            camelCase: function (property) {
                return property.replace(/-(\w)/g, function (match, subMatch) {
                    return subMatch.toUpperCase();
                });
            },

            /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
            SVGAttribute: function (property) {
                var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

                /* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
                if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
                    SVGAttributes += "|transform";
                }

                return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
            },

            /* Determine whether a property should be set with a vendor prefix. */
            /* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
               If the property is not at all supported by the browser, return a false flag. */
            prefixCheck: function (property) {
                /* If this property has already been checked, return the cached value. */
                if (Velocity.State.prefixMatches[property]) {
                    return [ Velocity.State.prefixMatches[property], true ];
                } else {
                    var vendors = [ "", "Webkit", "Moz", "ms", "O" ];

                    for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
                        var propertyPrefixed;

                        if (i === 0) {
                            propertyPrefixed = property;
                        } else {
                            /* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
                            propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) { return match.toUpperCase(); });
                        }

                        /* Check if the browser supports this property as prefixed. */
                        if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
                            /* Cache the match. */
                            Velocity.State.prefixMatches[property] = propertyPrefixed;

                            return [ propertyPrefixed, true ];
                        }
                    }

                    /* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
                    return [ property, false ];
                }
            }
        },

        /************************
           CSS Property Values
        ************************/

        Values: {
            /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
            hexToRgb: function (hex) {
                var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                    longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                    rgbParts;

                hex = hex.replace(shortformRegex, function (m, r, g, b) {
                    return r + r + g + g + b + b;
                });

                rgbParts = longformRegex.exec(hex);

                return rgbParts ? [ parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16) ] : [ 0, 0, 0 ];
            },

            isCSSNullValue: function (value) {
                /* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
                   Thus, we check for both falsiness and these special strings. */
                /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
                   templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
                /* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
                return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
            },

            /* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
            getUnitType: function (property) {
                if (/^(rotate|skew)/i.test(property)) {
                    return "deg";
                } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
                    /* The above properties are unitless. */
                    return "";
                } else {
                    /* Default to px for all other properties. */
                    return "px";
                }
            },

            /* HTML elements default to an associated display type when they're not set to display:none. */
            /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
            getDisplayType: function (element) {
                var tagName = element && element.tagName.toString().toLowerCase();

                if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
                    return "inline";
                } else if (/^(li)$/i.test(tagName)) {
                    return "list-item";
                } else if (/^(tr)$/i.test(tagName)) {
                    return "table-row";
                } else if (/^(table)$/i.test(tagName)) {
                    return "table";
                } else if (/^(tbody)$/i.test(tagName)) {
                    return "table-row-group";
                /* Default to "block" when no match is found. */
                } else {
                    return "block";
                }
            },

            /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
            addClass: function (element, className) {
                if (element.classList) {
                    element.classList.add(className);
                } else {
                    element.className += (element.className.length ? " " : "") + className;
                }
            },

            removeClass: function (element, className) {
                if (element.classList) {
                    element.classList.remove(className);
                } else {
                    element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                }
            }
        },

        /****************************
           Style Getting & Setting
        ****************************/

        /* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
        getPropertyValue: function (element, property, rootPropertyValue, forceStyleLookup) {
            /* Get an element's computed property value. */
            /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
               style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
               *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
            function computePropertyValue (element, property) {
                /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
                   element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
                   offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
                   We subtract border and padding to get the sum of interior + scrollbar. */
                var computedValue = 0;

                /* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
                   of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
                   codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
                   Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
                if (IE <= 8) {
                    computedValue = $.css(element, property); /* GET */
                /* All other browsers support getComputedStyle. The returned live object reference is cached onto its
                   associated element so that it does not need to be refetched upon every GET. */
                } else {
                    /* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
                       toggle display to the element type's default value. */
                    var toggleDisplay = false;

                    if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
                        toggleDisplay = true;
                        CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
                    }

                    function revertDisplay () {
                        if (toggleDisplay) {
                            CSS.setPropertyValue(element, "display", "none");
                        }
                    }

                    if (!forceStyleLookup) {
                        if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                            var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                            revertDisplay();

                            return contentBoxHeight;
                        } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                            var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                            revertDisplay();

                            return contentBoxWidth;
                        }
                    }

                    var computedStyle;

                    /* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
                       of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
                    if (Data(element) === undefined) {
                        computedStyle = window.getComputedStyle(element, null); /* GET */
                    /* If the computedStyle object has yet to be cached, do so now. */
                    } else if (!Data(element).computedStyle) {
                        computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
                    /* If computedStyle is cached, use it. */
                    } else {
                        computedStyle = Data(element).computedStyle;
                    }

                    /* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
                       Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
                       So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */
                    if (property === "borderColor") {
                        property = "borderTopColor";
                    }

                    /* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
                       instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
                    if (IE === 9 && property === "filter") {
                        computedValue = computedStyle.getPropertyValue(property); /* GET */
                    } else {
                        computedValue = computedStyle[property];
                    }

                    /* Fall back to the property's style value (if defined) when computedValue returns nothing,
                       which can happen when the element hasn't been painted. */
                    if (computedValue === "" || computedValue === null) {
                        computedValue = element.style[property];
                    }

                    revertDisplay();
                }

                /* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
                   defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
                   effect as being set to 0, so no conversion is necessary.) */
                /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
                   property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
                   to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
                if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
                    var position = computePropertyValue(element, "position"); /* GET */

                    /* For absolute positioning, jQuery's $.position() only returns values for top and left;
                       right and bottom will have their "auto" value reverted to 0. */
                    /* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
                       Not a big deal since we're currently in a GET batch anyway. */
                    if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
                        /* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
                        computedValue = $(element).position()[property] + "px"; /* GET */
                    }
                }

                return computedValue;
            }

            var propertyValue;

            /* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
               extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
            if (CSS.Hooks.registered[property]) {
                var hook = property,
                    hookRoot = CSS.Hooks.getRoot(hook);

                /* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
                   query the DOM for the root property's value. */
                if (rootPropertyValue === undefined) {
                    /* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
                    rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
                }

                /* If this root has a normalization registered, peform the associated normalization extraction. */
                if (CSS.Normalizations.registered[hookRoot]) {
                    rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
                }

                /* Extract the hook's value. */
                propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

            /* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
               normalize the property's name and value, and handle the special case of transforms. */
            /* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
               numerical and therefore do not require normalization extraction. */
            } else if (CSS.Normalizations.registered[property]) {
                var normalizedPropertyName,
                    normalizedPropertyValue;

                normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

                /* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
                   At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
                   This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
                   thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
                if (normalizedPropertyName !== "transform") {
                    normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

                    /* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
                    if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
                        normalizedPropertyValue = CSS.Hooks.templates[property][1];
                    }
                }

                propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
            }

            /* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
            if (!/^[\d-]/.test(propertyValue)) {
                /* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
                   their HTML attribute values instead of their CSS style values. */
                if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                    /* Since the height/width attribute values must be set manually, they don't reflect computed values.
                       Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
                    if (/^(height|width)$/i.test(property)) {
                        /* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */
                        try {
                            propertyValue = element.getBBox()[property];
                        } catch (error) {
                            propertyValue = 0;
                        }
                    /* Otherwise, access the attribute value directly. */
                    } else {
                        propertyValue = element.getAttribute(property);
                    }
                } else {
                    propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
                }
            }

            /* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
               convert CSS null-values to an integer of value 0. */
            if (CSS.Values.isCSSNullValue(propertyValue)) {
                propertyValue = 0;
            }

            if (Velocity.debug >= 2) console.log("Get " + property + ": " + propertyValue);

            return propertyValue;
        },

        /* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
        setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
            var propertyName = property;

            /* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
            if (property === "scroll") {
                /* If a container option is present, scroll the container instead of the browser window. */
                if (scrollData.container) {
                    scrollData.container["scroll" + scrollData.direction] = propertyValue;
                /* Otherwise, Velocity defaults to scrolling the browser window. */
                } else {
                    if (scrollData.direction === "Left") {
                        window.scrollTo(propertyValue, scrollData.alternateValue);
                    } else {
                        window.scrollTo(scrollData.alternateValue, propertyValue);
                    }
                }
            } else {
                /* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
                   Thus, for now, we merely cache transforms being SET. */
                if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
                    /* Perform a normalization injection. */
                    /* Note: The normalization logic handles the transformCache updating. */
                    CSS.Normalizations.registered[property]("inject", element, propertyValue);

                    propertyName = "transform";
                    propertyValue = Data(element).transformCache[property];
                } else {
                    /* Inject hooks. */
                    if (CSS.Hooks.registered[property]) {
                        var hookName = property,
                            hookRoot = CSS.Hooks.getRoot(property);

                        /* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
                        rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

                        propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
                        property = hookRoot;
                    }

                    /* Normalize names and values. */
                    if (CSS.Normalizations.registered[property]) {
                        propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
                        property = CSS.Normalizations.registered[property]("name", element);
                    }

                    /* Assign the appropriate vendor prefix before performing an official style update. */
                    propertyName = CSS.Names.prefixCheck(property)[0];

                    /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
                       Try/catch is avoided for other browsers since it incurs a performance overhead. */
                    if (IE <= 8) {
                        try {
                            element.style[propertyName] = propertyValue;
                        } catch (error) { if (Velocity.debug) console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]"); }
                    /* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
                    /* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
                    } else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                        /* Note: For SVG attributes, vendor-prefixed property names are never used. */
                        /* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
                        element.setAttribute(property, propertyValue);
                    } else {
                        var style = element.renderer === "webgl" ? element.styleGL : element.style;
                        style[propertyName] = propertyValue;
                    }

                    if (Velocity.debug >= 2) console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
                }
            }

            /* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
            return [ propertyName, propertyValue ];
        },

        /* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
        /* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
        flushTransformCache: function(element) {
            var transformString = "";

            /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
               (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
            if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {
                /* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
                   Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
                function getTransformFloat (transformProperty) {
                    return parseFloat(CSS.getPropertyValue(element, transformProperty));
                }

                /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
                   we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
                var SVGTransforms = {
                    translate: [ getTransformFloat("translateX"), getTransformFloat("translateY") ],
                    skewX: [ getTransformFloat("skewX") ], skewY: [ getTransformFloat("skewY") ],
                    /* If the scale property is set (non-1), use that value for the scaleX and scaleY values
                       (this behavior mimics the result of animating all these properties at once on HTML elements). */
                    scale: getTransformFloat("scale") !== 1 ? [ getTransformFloat("scale"), getTransformFloat("scale") ] : [ getTransformFloat("scaleX"), getTransformFloat("scaleY") ],
                    /* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
                       defining the rotation's origin point. We ignore the origin values (default them to 0). */
                    rotate: [ getTransformFloat("rotateZ"), 0, 0 ]
                };

                /* Iterate through the transform properties in the user-defined property map order.
                   (This mimics the behavior of non-SVG transform animation.) */
                $.each(Data(element).transformCache, function(transformName) {
                    /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
                       properties so that they match up with SVG's accepted transform properties. */
                    if (/^translate/i.test(transformName)) {
                        transformName = "translate";
                    } else if (/^scale/i.test(transformName)) {
                        transformName = "scale";
                    } else if (/^rotate/i.test(transformName)) {
                        transformName = "rotate";
                    }

                    /* Check that we haven't yet deleted the property from the SVGTransforms container. */
                    if (SVGTransforms[transformName]) {
                        /* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
                        transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

                        /* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
                           re-insert the same master property if we encounter another one of its axis-specific properties. */
                        delete SVGTransforms[transformName];
                    }
                });
            } else {
                var transformValue,
                    perspective;

                /* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
                $.each(Data(element).transformCache, function(transformName) {
                    transformValue = Data(element).transformCache[transformName];

                    /* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
                    if (transformName === "transformPerspective") {
                        perspective = transformValue;
                        return true;
                    }

                    /* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
                    if (IE === 9 && transformName === "rotateZ") {
                        transformName = "rotate";
                    }

                    transformString += transformName + transformValue + " ";
                });

                /* If present, set the perspective subproperty first. */
                if (perspective) {
                    transformString = "perspective" + perspective + " " + transformString;
                }
            }

            CSS.setPropertyValue(element, "transform", transformString);
        }
    };

    /* Register hooks and normalizations. */
    CSS.Hooks.register();
    CSS.Normalizations.register();

    /* Allow hook setting in the same fashion as jQuery's $.css(). */
    Velocity.hook = function (elements, arg2, arg3) {
        var value = undefined;

        elements = sanitizeElements(elements);

        $.each(elements, function(i, element) {
            /* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */
            if (Data(element) === undefined) {
                Velocity.init(element);
            }

            /* Get property value. If an element set was passed in, only return the value for the first element. */
            if (arg3 === undefined) {
                if (value === undefined) {
                    value = Velocity.CSS.getPropertyValue(element, arg2);
                }
            /* Set property value. */
            } else {
                /* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
                var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);

                /* Transform properties don't automatically set. They have to be flushed to the DOM. */
                if (adjustedSet[0] === "transform") {
                    Velocity.CSS.flushTransformCache(element);
                }

                value = adjustedSet;
            }
        });

        return value;
    };

    /*****************
        Animation
    *****************/

    var animate = function() {

        /******************
            Call Chain
        ******************/

        /* Logic for determining what to return to the call stack when exiting out of Velocity. */
        function getChain () {
            /* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
               default to null instead of returning the targeted elements so that utility function's return value is standardized. */
            if (isUtility) {
                return promiseData.promise || null;
            /* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
            } else {
                return elementsWrapped;
            }
        }

        /*************************
           Arguments Assignment
        *************************/

        /* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
           objects are defined on a container object that's passed in as Velocity's sole argument. */
        /* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
        var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
            /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
            isUtility,
            /* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
               passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
            elementsWrapped,
            argumentIndex;

        var elements,
            propertiesMap,
            options;

        /* Detect jQuery/Zepto elements being animated via the $.fn method. */
        if (Type.isWrapped(this)) {
            isUtility = false;

            argumentIndex = 0;
            elements = this;
            elementsWrapped = this;
        /* Otherwise, raw elements are being animated via the utility function. */
        } else {
            isUtility = true;

            argumentIndex = 1;
            elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
        }

        elements = sanitizeElements(elements);

        if (!elements) {
            return;
        }

        if (syntacticSugar) {
            propertiesMap = arguments[0].properties || arguments[0].p;
            options = arguments[0].options || arguments[0].o;
        } else {
            propertiesMap = arguments[argumentIndex];
            options = arguments[argumentIndex + 1];
        }

        /* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
           single raw DOM element is passed in (which doesn't contain a length property). */
        var elementsLength = elements.length,
            elementsIndex = 0;

        /***************************
            Argument Overloading
        ***************************/

        /* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
           Overloading is detected by checking for the absence of an object being passed into options. */
        /* Note: The stop and finish actions do not accept animation options, and are therefore excluded from this check. */
        if (!/^(stop|finish)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
            /* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
            var startingArgumentPosition = argumentIndex + 1;

            options = {};

            /* Iterate through all options arguments */
            for (var i = startingArgumentPosition; i < arguments.length; i++) {
                /* Treat a number as a duration. Parse it out. */
                /* Note: The following RegEx will return true if passed an array with a number as its first item.
                   Thus, arrays are skipped from this check. */
                if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
                    options.duration = arguments[i];
                /* Treat strings and arrays as easings. */
                } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
                    options.easing = arguments[i];
                /* Treat a function as a complete callback. */
                } else if (Type.isFunction(arguments[i])) {
                    options.complete = arguments[i];
                }
            }
        }

        /***************
            Promises
        ***************/

        var promiseData = {
                promise: null,
                resolver: null,
                rejecter: null
            };

        /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
           promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
           method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
           call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
        /* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
           triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
           grouped together for the purposes of resolving and rejecting a promise. */
        if (isUtility && Velocity.Promise) {
            promiseData.promise = new Velocity.Promise(function (resolve, reject) {
                promiseData.resolver = resolve;
                promiseData.rejecter = reject;
            });
        }

        /*********************
           Action Detection
        *********************/

        /* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
           or they can be started, stopped, or reversed. If a literal or referenced properties map is passed in as Velocity's
           first argument, the associated action is "start". Alternatively, "scroll", "reverse", or "stop" can be passed in instead of a properties map. */
        var action;

        switch (propertiesMap) {
            case "scroll":
                action = "scroll";
                break;

            case "reverse":
                action = "reverse";
                break;

            case "finish":
            case "stop":
                /*******************
                    Action: Stop
                *******************/

                /* Clear the currently-active delay on each targeted element. */
                $.each(elements, function(i, element) {
                    if (Data(element) && Data(element).delayTimer) {
                        /* Stop the timer from triggering its cached next() function. */
                        clearTimeout(Data(element).delayTimer.setTimeout);

                        /* Manually call the next() function so that the subsequent queue items can progress. */
                        if (Data(element).delayTimer.next) {
                            Data(element).delayTimer.next();
                        }

                        delete Data(element).delayTimer;
                    }
                });

                var callsToStop = [];

                /* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
                   been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
                   is stopped, the next item in its animation queue is immediately triggered. */
                /* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
                   or a custom queue string can be passed in. */
                /* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
                   regardless of the element's current queue state. */

                /* Iterate through every active call. */
                $.each(Velocity.State.calls, function(i, activeCall) {
                    /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
                    if (activeCall) {
                        /* Iterate through the active call's targeted elements. */
                        $.each(activeCall[1], function(k, activeElement) {
                            /* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
                               clear calls associated with the relevant queue. */
                            /* Call stopping logic works as follows:
                               - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
                               - options === undefined --> stop current queue:"" call and all queue:false calls.
                               - options === false --> stop only queue:false calls.
                               - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */
                            var queueName = (options === undefined) ? "" : options;

                            if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                                return true;
                            }

                            /* Iterate through the calls targeted by the stop command. */
                            $.each(elements, function(l, element) {                                
                                /* Check that this call was applied to the target element. */
                                if (element === activeElement) {
                                    /* Optionally clear the remaining queued calls. */
                                    if (options === true || Type.isString(options)) {
                                        /* Iterate through the items in the element's queue. */
                                        $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                                            /* The queue array can contain an "inprogress" string, which we skip. */
                                            if (Type.isFunction(item)) {
                                                /* Pass the item's callback a flag indicating that we want to abort from the queue call.
                                                   (Specifically, the queue will resolve the call's associated promise then abort.)  */
                                                item(null, true);
                                            }
                                        });

                                        /* Clearing the $.queue() array is achieved by resetting it to []. */
                                        $.queue(element, Type.isString(options) ? options : "", []);
                                    }

                                    if (propertiesMap === "stop") {
                                        /* Since "reverse" uses cached start values (the previous call's endValues), these values must be
                                           changed to reflect the final value that the elements were actually tweened to. */
                                        /* Note: If only queue:false animations are currently running on an element, it won't have a tweensContainer
                                           object. Also, queue:false animations can't be reversed. */
                                        if (Data(element) && Data(element).tweensContainer && queueName !== false) {
                                            $.each(Data(element).tweensContainer, function(m, activeTween) {
                                                activeTween.endValue = activeTween.currentValue;
                                            });
                                        }

                                        callsToStop.push(i);
                                    } else if (propertiesMap === "finish") {
                                        /* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
                                        they finish upon the next rAf tick then proceed with normal call completion logic. */
                                        activeCall[2].duration = 1;
                                    }
                                }
                            });
                        });
                    }
                });

                /* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
                   that the complete callback and display:none setting should be skipped since we're completing prematurely. */
                if (propertiesMap === "stop") {
                    $.each(callsToStop, function(i, j) {
                        completeCall(j, true);
                    });

                    if (promiseData.promise) {
                        /* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
                        promiseData.resolver(elements);
                    }
                }

                /* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
                return getChain();

            default:
                /* Treat a non-empty plain object as a literal properties map. */
                if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
                    action = "start";

                /****************
                    Redirects
                ****************/

                /* Check if a string matches a registered redirect (see Redirects above). */
                } else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
                    var opts = $.extend({}, options),
                        durationOriginal = opts.duration,
                        delayOriginal = opts.delay || 0;

                    /* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
                    if (opts.backwards === true) {
                        elements = $.extend(true, [], elements).reverse();
                    }

                    /* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */
                    $.each(elements, function(elementIndex, element) {
                        /* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
                        if (parseFloat(opts.stagger)) {
                            opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
                        } else if (Type.isFunction(opts.stagger)) {
                            opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
                        }

                        /* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
                           the duration of each element's animation, using floors to prevent producing very short durations. */
                        if (opts.drag) {
                            /* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
                            opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);

                            /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                               B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                               The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */
                            opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex/elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
                        }

                        /* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
                           reduce the opts checking logic required inside the redirect. */
                        Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
                    });

                    /* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
                       (The performance overhead up to this point is virtually non-existant.) */
                    /* Note: The jQuery call chain is kept intact by returning the complete element set. */
                    return getChain();
                } else {
                    var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

                    if (promiseData.promise) {
                        promiseData.rejecter(new Error(abortError));
                    } else {
                        console.log(abortError);
                    }

                    return getChain();
                }
        }

        /**************************
            Call-Wide Variables
        **************************/

        /* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
           being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
           avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
           conversion metrics across Velocity animations that are not immediately consecutively chained. */
        var callUnitConversionData = {
                lastParent: null,
                lastPosition: null,
                lastFontSize: null,
                lastPercentToPxWidth: null,
                lastPercentToPxHeight: null,
                lastEmToPx: null,
                remToPx: null,
                vwToPx: null,
                vhToPx: null
            };

        /* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
           Velocity.State.calls array that is processed during animation ticking. */
        var call = [];

        /************************
           Element Processing
        ************************/

        /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
           1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
           2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
           3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
        */

        function processElement () {

            /*************************
               Part I: Pre-Queueing
            *************************/

            /***************************
               Element-Wide Variables
            ***************************/

            var element = this,
                /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
                opts = $.extend({}, Velocity.defaults, options),
                /* A container for the processed data associated with each property in the propertyMap.
                   (Each property in the map produces its own "tween".) */
                tweensContainer = {},
                elementUnitConversionData;

            /******************
               Element Init
            ******************/

            if (Data(element) === undefined) {
                Velocity.init(element);
            }

            /******************
               Option: Delay
            ******************/

            /* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
            /* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
               (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
            if (parseFloat(opts.delay) && opts.queue !== false) {
                $.queue(element, opts.queue, function(next) {
                    /* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
                    Velocity.velocityQueueEntryFlag = true;

                    /* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
                       The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command. */
                    Data(element).delayTimer = {
                        setTimeout: setTimeout(next, parseFloat(opts.delay)),
                        next: next
                    };
                });
            }

            /*********************
               Option: Duration
            *********************/

            /* Support for jQuery's named durations. */
            switch (opts.duration.toString().toLowerCase()) {
                case "fast":
                    opts.duration = 200;
                    break;

                case "normal":
                    opts.duration = DURATION_DEFAULT;
                    break;

                case "slow":
                    opts.duration = 600;
                    break;

                default:
                    /* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
                    opts.duration = parseFloat(opts.duration) || 1;
            }

            /************************
               Global Option: Mock
            ************************/

            if (Velocity.mock !== false) {
                /* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
                   Alternatively, a multiplier can be passed in to time remap all delays and durations. */
                if (Velocity.mock === true) {
                    opts.duration = opts.delay = 1;
                } else {
                    opts.duration *= parseFloat(Velocity.mock) || 1;
                    opts.delay *= parseFloat(Velocity.mock) || 1;
                }
            }

            /*******************
               Option: Easing
            *******************/

            opts.easing = getEasing(opts.easing, opts.duration);

            /**********************
               Option: Callbacks
            **********************/

            /* Callbacks must functions. Otherwise, default to null. */
            if (opts.begin && !Type.isFunction(opts.begin)) {
                opts.begin = null;
            }

            if (opts.progress && !Type.isFunction(opts.progress)) {
                opts.progress = null;
            }

            if (opts.complete && !Type.isFunction(opts.complete)) {
                opts.complete = null;
            }

            /*********************************
               Option: Display & Visibility
            *********************************/

            /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
            /* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */
            if (opts.display !== undefined && opts.display !== null) {
                opts.display = opts.display.toString().toLowerCase();

                /* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
                if (opts.display === "auto") {
                    opts.display = Velocity.CSS.Values.getDisplayType(element);
                }
            }

            if (opts.visibility !== undefined && opts.visibility !== null) {
                opts.visibility = opts.visibility.toString().toLowerCase();
            }

            /**********************
               Option: mobileHA
            **********************/

            /* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
               on animating elements. HA is removed from the element at the completion of its animation. */
            /* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
            /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
            opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

            /***********************
               Part II: Queueing
            ***********************/

            /* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
               In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
            /* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
               the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
            function buildQueue (next) {

                /*******************
                   Option: Begin
                *******************/

                /* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
                if (opts.begin && elementsIndex === 0) {
                    /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
                    try {
                        opts.begin.call(elements, elements);
                    } catch (error) {
                        setTimeout(function() { throw error; }, 1);
                    }
                }

                /*****************************************
                   Tween Data Construction (for Scroll)
                *****************************************/

                /* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
                if (action === "scroll") {
                    /* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
                    var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
                        scrollOffset = parseFloat(opts.offset) || 0,
                        scrollPositionCurrent,
                        scrollPositionCurrentAlternate,
                        scrollPositionEnd;

                    /* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
                       as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
                    if (opts.container) {
                        /* Ensure that either a jQuery object or a raw DOM element was passed in. */
                        if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
                            /* Extract the raw DOM element from the jQuery wrapper. */
                            opts.container = opts.container[0] || opts.container;
                            /* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
                               (due to the user's natural interaction with the page). */
                            scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

                            /* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                               -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                               the scroll container's current scroll position. */
                            scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset; /* GET */
                        /* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
                        } else {
                            opts.container = null;
                        }
                    } else {
                        /* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
                           the appropriate cached property names (which differ based on browser type). */
                        scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
                        /* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
                        scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

                        /* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
                           and therefore end values do not need to be compounded onto current values. */
                        scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
                    }

                    /* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
                    tweensContainer = {
                        scroll: {
                            rootPropertyValue: false,
                            startValue: scrollPositionCurrent,
                            currentValue: scrollPositionCurrent,
                            endValue: scrollPositionEnd,
                            unitType: "",
                            easing: opts.easing,
                            scrollData: {
                                container: opts.container,
                                direction: scrollDirection,
                                alternateValue: scrollPositionCurrentAlternate
                            }
                        },
                        element: element
                    };

                    if (Velocity.debug) console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);

                /******************************************
                   Tween Data Construction (for Reverse)
                ******************************************/

                /* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
                   that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
                   the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
                /* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
                /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
                   there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
                   as reverting to the element's values as they were prior to the previous *Velocity* call. */
                } else if (action === "reverse") {
                    /* Abort if there is no prior animation data to reverse to. */
                    if (!Data(element).tweensContainer) {
                        /* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
                        $.dequeue(element, opts.queue);

                        return;
                    } else {
                        /*********************
                           Options Parsing
                        *********************/

                        /* If the element was hidden via the display option in the previous call,
                           revert display to "auto" prior to reversal so that the element is visible again. */
                        if (Data(element).opts.display === "none") {
                            Data(element).opts.display = "auto";
                        }

                        if (Data(element).opts.visibility === "hidden") {
                            Data(element).opts.visibility = "visible";
                        }

                        /* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
                           Further, remove the previous call's callback options; typically, users do not want these to be refired. */
                        Data(element).opts.loop = false;
                        Data(element).opts.begin = null;
                        Data(element).opts.complete = null;

                        /* Since we're extending an opts object that has already been extended with the defaults options object,
                           we remove non-explicitly-defined properties that are auto-assigned values. */
                        if (!options.easing) {
                            delete opts.easing;
                        }

                        if (!options.duration) {
                            delete opts.duration;
                        }

                        /* The opts object used for reversal is an extension of the options object optionally passed into this
                           reverse call plus the options used in the previous Velocity call. */
                        opts = $.extend({}, Data(element).opts, opts);

                        /*************************************
                           Tweens Container Reconstruction
                        *************************************/

                        /* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
                        var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);

                        /* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
                        for (var lastTween in lastTweensContainer) {
                            /* In addition to tween data, tweensContainers contain an element property that we ignore here. */
                            if (lastTween !== "element") {
                                var lastStartValue = lastTweensContainer[lastTween].startValue;

                                lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                                lastTweensContainer[lastTween].endValue = lastStartValue;

                                /* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
                                   Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
                                   The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
                                if (!Type.isEmptyObject(options)) {
                                    lastTweensContainer[lastTween].easing = opts.easing;
                                }

                                if (Velocity.debug) console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                            }
                        }

                        tweensContainer = lastTweensContainer;
                    }

                /*****************************************
                   Tween Data Construction (for Start)
                *****************************************/

                } else if (action === "start") {

                    /*************************
                        Value Transferring
                    *************************/

                    /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
                       while the element was in the process of being animated by Velocity, then this current call is safe to use
                       the end values from the prior call as its start values. Velocity attempts to perform this value transfer
                       process whenever possible in order to avoid requerying the DOM. */
                    /* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
                       then the DOM is queried for the element's current values as a last resort. */
                    /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */
                    var lastTweensContainer;

                    /* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
                       to transfer over end values to use as start values. If it's set to true and there is a previous
                       Velocity call to pull values from, do so. */
                    if (Data(element).tweensContainer && Data(element).isAnimating === true) {
                        lastTweensContainer = Data(element).tweensContainer;
                    }

                    /***************************
                       Tween Data Calculation
                    ***************************/

                    /* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
                    /* Property map values can either take the form of 1) a single value representing the end value,
                       or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
                       The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
                       the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
                    function parsePropertyValue (valueData, skipResolvingEasing) {
                        var endValue = undefined,
                            easing = undefined,
                            startValue = undefined;

                        /* Handle the array format, which can be structured as one of three potential overloads:
                           A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
                        if (Type.isArray(valueData)) {
                            /* endValue is always the first item in the array. Don't bother validating endValue's value now
                               since the ensuing property cycling logic does that. */
                            endValue = valueData[0];

                            /* Two-item array format: If the second item is a number, function, or hex string, treat it as a
                               start value since easings can only be non-hex strings or arrays. */
                            if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                                startValue = valueData[1];
                            /* Two or three-item array: If the second item is a non-hex string or an array, treat it as an easing. */
                            } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
                                easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

                                /* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
                                if (valueData[2] !== undefined) {
                                    startValue = valueData[2];
                                }
                            }
                        /* Handle the single-value format. */
                        } else {
                            endValue = valueData;
                        }

                        /* Default to the call's easing if a per-property easing type was not defined. */
                        if (!skipResolvingEasing) {
                            easing = easing || opts.easing;
                        }

                        /* If functions were passed in as values, pass the function the current element as its context,
                           plus the element's index and the element set's size as arguments. Then, assign the returned value. */
                        if (Type.isFunction(endValue)) {
                            endValue = endValue.call(element, elementsIndex, elementsLength);
                        }

                        if (Type.isFunction(startValue)) {
                            startValue = startValue.call(element, elementsIndex, elementsLength);
                        }

                        /* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
                        return [ endValue || 0, easing, startValue ];
                    }

                    /* Cycle through each property in the map, looking for shorthand color properties (e.g. "color" as opposed to "colorRed"). Inject the corresponding
                       colorRed, colorGreen, and colorBlue RGB component tweens into the propertiesMap (which Velocity understands) and remove the shorthand property. */
                    $.each(propertiesMap, function(property, value) {
                        /* Find shorthand color properties that have been passed a hex string. */
                        if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(property)) {
                            /* Parse the value data for each shorthand. */
                            var valueData = parsePropertyValue(value, true),
                                endValue = valueData[0],
                                easing = valueData[1],
                                startValue = valueData[2];

                            if (CSS.RegEx.isHex.test(endValue)) {
                                /* Convert the hex strings into their RGB component arrays. */
                                var colorComponents = [ "Red", "Green", "Blue" ],
                                    endValueRGB = CSS.Values.hexToRgb(endValue),
                                    startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

                                /* Inject the RGB component tweens into propertiesMap. */
                                for (var i = 0; i < colorComponents.length; i++) {
                                    var dataArray = [ endValueRGB[i] ];

                                    if (easing) {
                                        dataArray.push(easing);
                                    }

                                    if (startValueRGB !== undefined) {
                                        dataArray.push(startValueRGB[i]);
                                    }

                                    propertiesMap[property + colorComponents[i]] = dataArray;
                                }

                                /* Remove the intermediary shorthand property entry now that we've processed it. */
                                delete propertiesMap[property];
                            }
                        }
                    });

                    /* Create a tween out of each property, and append its associated data to tweensContainer. */
                    for (var property in propertiesMap) {

                        /**************************
                           Start Value Sourcing
                        **************************/

                        /* Parse out endValue, easing, and startValue from the property's data. */
                        var valueData = parsePropertyValue(propertiesMap[property]),
                            endValue = valueData[0],
                            easing = valueData[1],
                            startValue = valueData[2];

                        /* Now that the original property name's format has been used for the parsePropertyValue() lookup above,
                           we force the property to its camelCase styling to normalize it for manipulation. */
                        property = CSS.Names.camelCase(property);

                        /* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
                        var rootProperty = CSS.Hooks.getRoot(property),
                            rootPropertyValue = false;

                        /* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
                           inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
                           Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
                        /* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
                           there is no way to check for their explicit browser support, and so we skip skip this check for them. */
                        if (!Data(element).isSVG && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                            if (Velocity.debug) console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");

                            continue;
                        }

                        /* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
                           animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
                           a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
                        if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
                            startValue = 0;
                        }

                        /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
                           for all of the current call's properties that were *also* animated in the previous call. */
                        /* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
                        if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                            if (startValue === undefined) {
                                startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                            }

                            /* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
                               instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
                               attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
                            rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];
                        /* If values were not transferred from a previous Velocity call, query the DOM as needed. */
                        } else {
                            /* Handle hooked properties. */
                            if (CSS.Hooks.registered[property]) {
                               if (startValue === undefined) {
                                    rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
                                    /* Note: The following getPropertyValue() call does not actually trigger a DOM query;
                                       getPropertyValue() will extract the hook from rootPropertyValue. */
                                    startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                                /* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
                                   just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
                                   root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
                                   to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
                                } else {
                                    /* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
                                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                                }
                            /* Handle non-hooked properties that haven't already been defined via forcefeeding. */
                            } else if (startValue === undefined) {
                                startValue = CSS.getPropertyValue(element, property); /* GET */
                            }
                        }

                        /**************************
                           Value Data Extraction
                        **************************/

                        var separatedValue,
                            endValueUnitType,
                            startValueUnitType,
                            operator = false;

                        /* Separates a property value into its numeric value and its unit type. */
                        function separateValue (property, value) {
                            var unitType,
                                numericValue;

                            numericValue = (value || "0")
                                .toString()
                                .toLowerCase()
                                /* Match the unit type at the end of the value. */
                                .replace(/[%A-z]+$/, function(match) {
                                    /* Grab the unit type. */
                                    unitType = match;

                                    /* Strip the unit type off of value. */
                                    return "";
                                });

                            /* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
                            if (!unitType) {
                                unitType = CSS.Values.getUnitType(property);
                            }

                            return [ numericValue, unitType ];
                        }

                        /* Separate startValue. */
                        separatedValue = separateValue(property, startValue);
                        startValue = separatedValue[0];
                        startValueUnitType = separatedValue[1];

                        /* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
                        separatedValue = separateValue(property, endValue);
                        endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
                            operator = subMatch;

                            /* Strip the operator off of the value. */
                            return "";
                        });
                        endValueUnitType = separatedValue[1];

                        /* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
                        startValue = parseFloat(startValue) || 0;
                        endValue = parseFloat(endValue) || 0;

                        /***************************************
                           Property-Specific Value Conversion
                        ***************************************/

                        /* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
                        if (endValueUnitType === "%") {
                            /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                               which is identical to the em unit's behavior, so we piggyback off of that. */
                            if (/^(fontSize|lineHeight)$/.test(property)) {
                                /* Convert % into an em decimal value. */
                                endValue = endValue / 100;
                                endValueUnitType = "em";
                            /* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
                            } else if (/^scale/.test(property)) {
                                endValue = endValue / 100;
                                endValueUnitType = "";
                            /* For RGB components, take the defined percentage of 255 and strip off the unit type. */
                            } else if (/(Red|Green|Blue)$/i.test(property)) {
                                endValue = (endValue / 100) * 255;
                                endValueUnitType = "";
                            }
                        }

                        /***************************
                           Unit Ratio Calculation
                        ***************************/

                        /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
                           %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
                           for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
                           from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
                           1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
                           2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
                        /* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
                           setting values with the target unit type then comparing the returned pixel value. */
                        /* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
                           of batching the SETs and GETs together upfront outweights the potential overhead
                           of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
                        /* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
                        function calculateUnitRatios () {

                            /************************
                                Same Ratio Checks
                            ************************/

                            /* The properties below are used to determine whether the element differs sufficiently from this call's
                               previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
                               of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
                               this is done to minimize DOM querying. */
                            var sameRatioIndicators = {
                                    myParent: element.parentNode || document.body, /* GET */
                                    position: CSS.getPropertyValue(element, "position"), /* GET */
                                    fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
                                },
                                /* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */
                                samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),
                                /* Determine if the same em ratio can be used. em is relative to the element's fontSize. */
                                sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);

                            /* Store these ratio indicators call-wide for the next element to compare against. */
                            callUnitConversionData.lastParent = sameRatioIndicators.myParent;
                            callUnitConversionData.lastPosition = sameRatioIndicators.position;
                            callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;

                            /***************************
                               Element-Specific Units
                            ***************************/

                            /* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
                               of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */
                            var measurement = 100,
                                unitRatios = {};

                            if (!sameEmRatio || !samePercentRatio) {
                                var dummy = Data(element).isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");

                                Velocity.init(dummy);
                                sameRatioIndicators.myParent.appendChild(dummy);

                                /* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
                                   Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */
                                /* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */
                                $.each([ "overflow", "overflowX", "overflowY" ], function(i, property) {
                                    Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                                });
                                Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
                                Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
                                Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");

                                /* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */
                                $.each([ "minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height" ], function(i, property) {
                                    Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                                });
                                /* paddingLeft arbitrarily acts as our proxy property for the em ratio. */
                                Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");

                                /* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */
                                unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement; /* GET */
                                unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement; /* GET */
                                unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement; /* GET */

                                sameRatioIndicators.myParent.removeChild(dummy);
                            } else {
                                unitRatios.emToPx = callUnitConversionData.lastEmToPx;
                                unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
                                unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
                            }

                            /***************************
                               Element-Agnostic Units
                            ***************************/

                            /* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
                               once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
                               that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
                               so we calculate it now. */
                            if (callUnitConversionData.remToPx === null) {
                                /* Default to browsers' default fontSize of 16px in the case of 0. */
                                callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
                            }

                            /* Similarly, viewport units are %-relative to the window's inner dimensions. */
                            if (callUnitConversionData.vwToPx === null) {
                                callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
                                callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
                            }

                            unitRatios.remToPx = callUnitConversionData.remToPx;
                            unitRatios.vwToPx = callUnitConversionData.vwToPx;
                            unitRatios.vhToPx = callUnitConversionData.vhToPx;

                            if (Velocity.debug >= 1) console.log("Unit ratios: " + JSON.stringify(unitRatios), element);

                            return unitRatios;
                        }

                        /********************
                           Unit Conversion
                        ********************/

                        /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
                        if (/[\/*]/.test(operator)) {
                            endValueUnitType = startValueUnitType;
                        /* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
                           is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
                           on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
                           would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
                        /* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
                        } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
                            /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
                            /* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
                               match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
                               which remains past the point of the animation's completion. */
                            if (endValue === 0) {
                                endValueUnitType = startValueUnitType;
                            } else {
                                /* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
                                   If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
                                elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();

                                /* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
                                /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
                                var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";

                                /* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
                                   1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
                                switch (startValueUnitType) {
                                    case "%":
                                        /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                                           Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                                           to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
                                        startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                                        break;

                                    case "px":
                                        /* px acts as our midpoint in the unit conversion process; do nothing. */
                                        break;

                                    default:
                                        startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                                }

                                /* Invert the px ratios to convert into to the target unit. */
                                switch (endValueUnitType) {
                                    case "%":
                                        startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                                        break;

                                    case "px":
                                        /* startValue is already in px, do nothing; we're done. */
                                        break;

                                    default:
                                        startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                                }
                            }
                        }

                        /*********************
                           Relative Values
                        *********************/

                        /* Operator logic must be performed last since it requires unit-normalized start and end values. */
                        /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
                           to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
                           50 points is added on top of the current % value. */
                        switch (operator) {
                            case "+":
                                endValue = startValue + endValue;
                                break;

                            case "-":
                                endValue = startValue - endValue;
                                break;

                            case "*":
                                endValue = startValue * endValue;
                                break;

                            case "/":
                                endValue = startValue / endValue;
                                break;
                        }

                        /**************************
                           tweensContainer Push
                        **************************/

                        /* Construct the per-property tween object, and push it to the element's tweensContainer. */
                        tweensContainer[property] = {
                            rootPropertyValue: rootPropertyValue,
                            startValue: startValue,
                            currentValue: startValue,
                            endValue: endValue,
                            unitType: endValueUnitType,
                            easing: easing
                        };

                        if (Velocity.debug) console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
                    }

                    /* Along with its property data, store a reference to the element itself onto tweensContainer. */
                    tweensContainer.element = element;
                }

                /*****************
                    Call Push
                *****************/

                /* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
                   being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
                if (tweensContainer.element) {
                    /* Apply the "velocity-animating" indicator class. */
                    CSS.Values.addClass(element, "velocity-animating");

                    /* The call array houses the tweensContainers for each element being animated in the current call. */
                    call.push(tweensContainer);

                    /* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */
                    if (opts.queue === "") {
                        Data(element).tweensContainer = tweensContainer;
                        Data(element).opts = opts;
                    }

                    /* Switch on the element's animating flag. */
                    Data(element).isAnimating = true;

                    /* Once the final element in this call's element set has been processed, push the call array onto
                       Velocity.State.calls for the animation tick to immediately begin processing. */
                    if (elementsIndex === elementsLength - 1) {
                        /* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
                           Anything on this call container is subjected to tick() processing. */
                        Velocity.State.calls.push([ call, elements, opts, null, promiseData.resolver ]);

                        /* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
                        if (Velocity.State.isTicking === false) {
                            Velocity.State.isTicking = true;

                            /* Start the tick loop. */
                            tick();
                        }
                    } else {
                        elementsIndex++;
                    }
                }
            }

            /* When the queue option is set to false, the call skips the element's queue and fires immediately. */
            if (opts.queue === false) {
                /* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
                   we manually inject the delay property here with an explicit setTimeout. */
                if (opts.delay) {
                    setTimeout(buildQueue, opts.delay);
                } else {
                    buildQueue();
                }
            /* Otherwise, the call undergoes element queueing as normal. */
            /* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
            } else {
                $.queue(element, opts.queue, function(next, clearQueue) {
                    /* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
                       so it's fine if this is repeatedly triggered for each element in the associated call.) */
                    if (clearQueue === true) {
                        if (promiseData.promise) {
                            promiseData.resolver(elements);
                        }

                        /* Do not continue with animation queueing. */
                        return true;
                    }

                    /* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
                       See completeCall() for further details. */
                    Velocity.velocityQueueEntryFlag = true;

                    buildQueue(next);
                });
            }

            /*********************
                Auto-Dequeuing
            *********************/

            /* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
               must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
               for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
               queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
               first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
            /* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
               each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
            /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
               Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
            if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
                $.dequeue(element);
            }
        }

        /**************************
           Element Set Iteration
        **************************/

        /* If the "nodeType" property exists on the elements variable, we're animating a single element.
           Place it in an array so that $.each() can iterate over it. */
        $.each(elements, function(i, element) {
            /* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
            if (Type.isNode(element)) {
                processElement.call(element);
            }
        });

        /******************
           Option: Loop
        ******************/

        /* The loop option accepts an integer indicating how many times the element should loop between the values in the
           current call's properties map and the element's property values prior to this call. */
        /* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
           to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
           which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
        var opts = $.extend({}, Velocity.defaults, options),
            reverseCallsCount;

        opts.loop = parseInt(opts.loop);
        reverseCallsCount = (opts.loop * 2) - 1;

        if (opts.loop) {
            /* Double the loop count to convert it into its appropriate number of "reverse" calls.
               Subtract 1 from the resulting value since the current call is included in the total alternation count. */
            for (var x = 0; x < reverseCallsCount; x++) {
                /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
                   isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
                   call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
                var reverseOptions = {
                    delay: opts.delay,
                    progress: opts.progress
                };

                /* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
                   so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */
                if (x === reverseCallsCount - 1) {
                    reverseOptions.display = opts.display;
                    reverseOptions.visibility = opts.visibility;
                    reverseOptions.complete = opts.complete;
                }

                animate(elements, "reverse", reverseOptions);
            }
        }

        /***************
            Chaining
        ***************/

        /* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
        return getChain();
    };

    /* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */
    Velocity = $.extend(animate, Velocity);
    /* For legacy support, also expose the literal animate method. */
    Velocity.animate = animate;

    /**************
        Timing
    **************/

    /* Ticker function. */
    var ticker = window.requestAnimationFrame || rAFShim;

    /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
       To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
       devices to avoid wasting battery power on inactive tabs. */
    /* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
    if (!Velocity.State.isMobile && document.hidden !== undefined) {
        document.addEventListener("visibilitychange", function() {
            /* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
            if (document.hidden) {
                ticker = function(callback) {
                    /* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
                    return setTimeout(function() { callback(true) }, 16);
                };

                /* The rAF loop has been paused by the browser, so we manually restart the tick. */
                tick();
            } else {
                ticker = window.requestAnimationFrame || rAFShim;
            }
        });
    }

    /************
        Tick
    ************/

    /* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
    function tick (timestamp) {
        /* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
           We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
           the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
           calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
           the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
           by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
        if (timestamp) {
            /* We ignore RAF's high resolution timestamp since it can be significantly offset when the browser is
               under high stress; we opt for choppiness over allowing the browser to drop huge chunks of frames. */
            var timeCurrent = (new Date).getTime();

            /********************
               Call Iteration
            ********************/

            var callsLength = Velocity.State.calls.length;

            /* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
               when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
               has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
            if (callsLength > 10000) {
                Velocity.State.calls = compactSparseArray(Velocity.State.calls);
            }

            /* Iterate through each active call. */
            for (var i = 0; i < callsLength; i++) {
                /* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
                if (!Velocity.State.calls[i]) {
                    continue;
                }

                /************************
                   Call-Wide Variables
                ************************/

                var callContainer = Velocity.State.calls[i],
                    call = callContainer[0],
                    opts = callContainer[2],
                    timeStart = callContainer[3],
                    firstTick = !!timeStart,
                    tweenDummyValue = null;

                /* If timeStart is undefined, then this is the first time that this call has been processed by tick().
                   We assign timeStart now so that its value is as close to the real animation start time as possible.
                   (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
                   between that time and now would cause the first few frames of the tween to be skipped since
                   percentComplete is calculated relative to timeStart.) */
                /* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
                   first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
                   same style value as the element's current value. */
                if (!timeStart) {
                    timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
                }

                /* The tween's completion percentage is relative to the tween's start time, not the tween's start value
                   (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
                   Accordingly, we ensure that percentComplete does not exceed 1. */
                var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);

                /**********************
                   Element Iteration
                **********************/

                /* For every call, iterate through each of the elements in its set. */
                for (var j = 0, callLength = call.length; j < callLength; j++) {
                    var tweensContainer = call[j],
                        element = tweensContainer.element;

                    /* Check to see if this element has been deleted midway through the animation by checking for the
                       continued existence of its data cache. If it's gone, skip animating this element. */
                    if (!Data(element)) {
                        continue;
                    }

                    var transformPropertyExists = false;

                    /**********************************
                       Display & Visibility Toggling
                    **********************************/

                    /* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
                       (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
                    if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
                        if (opts.display === "flex") {
                            var flexValues = [ "-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex" ];

                            $.each(flexValues, function(i, flexValue) {
                                CSS.setPropertyValue(element, "display", flexValue);
                            });
                        }

                        CSS.setPropertyValue(element, "display", opts.display);
                    }

                    /* Same goes with the visibility option, but its "none" equivalent is "hidden". */
                    if (opts.visibility !== undefined && opts.visibility !== "hidden") {
                        CSS.setPropertyValue(element, "visibility", opts.visibility);
                    }

                    /************************
                       Property Iteration
                    ************************/

                    /* For every element, iterate through each property. */
                    for (var property in tweensContainer) {
                        /* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
                        if (property !== "element") {
                            var tween = tweensContainer[property],
                                currentValue,
                                /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                                   on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
                                easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

                            /******************************
                               Current Value Calculation
                            ******************************/

                            /* If this is the last tick pass (if we've reached 100% completion for this tween),
                               ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
                            if (percentComplete === 1) {
                                currentValue = tween.endValue;
                            /* Otherwise, calculate currentValue based on the current delta from startValue. */
                            } else {
                                var tweenDelta = tween.endValue - tween.startValue;
                                currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));

                                /* If no value change is occurring, don't proceed with DOM updating. */
                                if (!firstTick && (currentValue === tween.currentValue)) {
                                    continue;
                                }
                            }

                            tween.currentValue = currentValue;

                            /* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
                               it can be passed into the progress callback. */ 
                            if (property === "tween") {
                                tweenDummyValue = currentValue;
                            } else {
                                /******************
                                   Hooks: Part I
                                ******************/

                                /* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
                                   for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
                                   rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
                                   updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
                                   subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
                                if (CSS.Hooks.registered[property]) {
                                    var hookRoot = CSS.Hooks.getRoot(property),
                                        rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

                                    if (rootPropertyValueCache) {
                                        tween.rootPropertyValue = rootPropertyValueCache;
                                    }
                                }

                                /*****************
                                    DOM Update
                                *****************/

                                /* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
                                /* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
                                var adjustedSetData = CSS.setPropertyValue(element, /* SET */
                                                                           property,
                                                                           tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType),
                                                                           tween.rootPropertyValue,
                                                                           tween.scrollData);

                                /*******************
                                   Hooks: Part II
                                *******************/

                                /* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
                                if (CSS.Hooks.registered[property]) {
                                    /* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
                                    if (CSS.Normalizations.registered[hookRoot]) {
                                        Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                                    } else {
                                        Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                                    }
                                }

                                /***************
                                   Transforms
                                ***************/

                                /* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
                                if (adjustedSetData[0] === "transform") {
                                    transformPropertyExists = true;
                                }

                            }
                        }
                    }

                    /****************
                        mobileHA
                    ****************/

                    /* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
                       It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
                    if (opts.mobileHA) {
                        /* Don't set the null transform hack if we've already done so. */
                        if (Data(element).transformCache.translate3d === undefined) {
                            /* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
                            Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

                            transformPropertyExists = true;
                        }
                    }

                    if (transformPropertyExists) {
                        CSS.flushTransformCache(element);
                    }
                }

                /* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
                   Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
                if (opts.display !== undefined && opts.display !== "none") {
                    Velocity.State.calls[i][2].display = false;
                }
                if (opts.visibility !== undefined && opts.visibility !== "hidden") {
                    Velocity.State.calls[i][2].visibility = false;
                }

                /* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */
                if (opts.progress) {
                    opts.progress.call(callContainer[1],
                                       callContainer[1],
                                       percentComplete,
                                       Math.max(0, (timeStart + opts.duration) - timeCurrent),
                                       timeStart,
                                       tweenDummyValue);
                }

                /* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
                if (percentComplete === 1) {
                    completeCall(i);
                }
            }
        }

        /* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
        if (Velocity.State.isTicking) {
            ticker(tick);
        }
    }

    /**********************
        Call Completion
    **********************/

    /* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
    function completeCall (callIndex, isStopped) {
        /* Ensure the call exists. */
        if (!Velocity.State.calls[callIndex]) {
            return false;
        }

        /* Pull the metadata from the call. */
        var call = Velocity.State.calls[callIndex][0],
            elements = Velocity.State.calls[callIndex][1],
            opts = Velocity.State.calls[callIndex][2],
            resolver = Velocity.State.calls[callIndex][4];

        var remainingCallsExist = false;

        /*************************
           Element Finalization
        *************************/

        for (var i = 0, callLength = call.length; i < callLength; i++) {
            var element = call[i].element;

            /* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
            /* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). */
            /* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */
            if (!isStopped && !opts.loop) {
                if (opts.display === "none") {
                    CSS.setPropertyValue(element, "display", opts.display);
                }

                if (opts.visibility === "hidden") {
                    CSS.setPropertyValue(element, "visibility", opts.visibility);
                }
            }

            /* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
               a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
               an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
               we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
               is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
            if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
                /* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
                if (Data(element)) {
                    Data(element).isAnimating = false;
                    /* Clear the element's rootPropertyValueCache, which will become stale. */
                    Data(element).rootPropertyValueCache = {};

                    var transformHAPropertyExists = false;
                    /* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */
                    $.each(CSS.Lists.transforms3D, function(i, transformName) {
                        var defaultValue = /^scale/.test(transformName) ? 1 : 0,
                            currentValue = Data(element).transformCache[transformName];

                        if (Data(element).transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
                            transformHAPropertyExists = true;

                            delete Data(element).transformCache[transformName];
                        }
                    });

                    /* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
                    if (opts.mobileHA) {
                        transformHAPropertyExists = true;
                        delete Data(element).transformCache.translate3d;
                    }

                    /* Flush the subproperty removals to the DOM. */
                    if (transformHAPropertyExists) {
                        CSS.flushTransformCache(element);
                    }

                    /* Remove the "velocity-animating" indicator class. */
                    CSS.Values.removeClass(element, "velocity-animating");
                }
            }

            /*********************
               Option: Complete
            *********************/

            /* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
            /* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */
            if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
                /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
                try {
                    opts.complete.call(elements, elements);
                } catch (error) {
                    setTimeout(function() { throw error; }, 1);
                }
            }

            /**********************
               Promise Resolving
            **********************/

            /* Note: Infinite loops don't return promises. */
            if (resolver && opts.loop !== true) {
                resolver(elements);
            }

            /****************************
               Option: Loop (Infinite)
            ****************************/

            if (Data(element) && opts.loop === true && !isStopped) {
                /* If a rotateX/Y/Z property is being animated to 360 deg with loop:true, swap tween start/end values to enable
                   continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
                $.each(Data(element).tweensContainer, function(propertyName, tweenContainer) {
                    if (/^rotate/.test(propertyName) && parseFloat(tweenContainer.endValue) === 360) {
                        tweenContainer.endValue = 0;
                        tweenContainer.startValue = 360;
                    }

                    if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
                        tweenContainer.endValue = 0;
                        tweenContainer.startValue = 100;
                    }
                });

                Velocity(element, "reverse", { loop: true, delay: opts.delay });
            }

            /***************
               Dequeueing
            ***************/

            /* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
               which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
               $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
            if (opts.queue !== false) {
                $.dequeue(element, opts.queue);
            }
        }

        /************************
           Calls Array Cleanup
        ************************/

        /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
          (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
        Velocity.State.calls[callIndex] = false;

        /* Iterate through the calls array to determine if this was the final in-progress animation.
           If so, set a flag to end ticking and clear the calls array. */
        for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
            if (Velocity.State.calls[j] !== false) {
                remainingCallsExist = true;

                break;
            }
        }

        if (remainingCallsExist === false) {
            /* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
            Velocity.State.isTicking = false;

            /* Clear the calls array so that its length is reset. */
            delete Velocity.State.calls;
            Velocity.State.calls = [];
        }
    }

    /******************
        Frameworks
    ******************/

    /* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
       If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
       also registers itself onto a global container (window.jQuery || window.Zepto || window) so that certain features are
       accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
       (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */
    global.Velocity = Velocity;

    if (global !== window) {
        /* Assign the element function to Velocity's core animate() method. */
        global.fn.velocity = animate;
        /* Assign the object function's defaults to Velocity's global defaults object. */
        global.fn.velocity.defaults = Velocity.defaults;
    }

    /***********************
       Packaged Redirects
    ***********************/

    /* slideUp, slideDown */
    $.each([ "Down", "Up" ], function(i, direction) {
        Velocity.Redirects["slide" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
            var opts = $.extend({}, options),
                begin = opts.begin,
                complete = opts.complete,
                computedValues = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
                inlineValues = {};

            if (opts.display === undefined) {
                /* Show the element before slideDown begins and hide the element after slideUp completes. */
                /* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */
                opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
            }

            opts.begin = function() {
                var style = element.renderer === "webgl" ? element.styleGL : element.style;
                /* If the user passed in a begin callback, fire it now. */
                begin && begin.call(elements, elements);

                /* Cache the elements' original vertical dimensional property values so that we can animate back to them. */
                for (var property in computedValues) {
                    inlineValues[property] = style[property];

                    /* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
                       use forcefeeding to start from computed values and animate down to 0. */
                    var propertyValue = Velocity.CSS.getPropertyValue(element, property);
                    computedValues[property] = (direction === "Down") ? [ propertyValue, 0 ] : [ 0, propertyValue ];
                }

                /* Force vertical overflow content to clip so that sliding works as expected. */
                inlineValues.overflow = style.overflow;
                style.overflow = "hidden";
            }

            opts.complete = function() {
                /* Reset element to its pre-slide inline values once its slide animation is complete. */
                for (var property in inlineValues) {
                    style[property] = inlineValues[property];
                }

                /* If the user passed in a complete callback, fire it now. */
                complete && complete.call(elements, elements);
                promiseData && promiseData.resolver(elements);
            };

            Velocity(element, computedValues, opts);
        };
    });

    /* fadeIn, fadeOut */
    $.each([ "In", "Out" ], function(i, direction) {
        Velocity.Redirects["fade" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
            var opts = $.extend({}, options),
                propertiesMap = { opacity: (direction === "In") ? 1 : 0 },
                originalComplete = opts.complete;

            /* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
               callbacks by firing them only when the final element has been reached. */
            if (elementsIndex !== elementsSize - 1) {
                opts.complete = opts.begin = null;
            } else {
                opts.complete = function() {
                    if (originalComplete) {
                        originalComplete.call(elements, elements);
                    }

                    promiseData && promiseData.resolver(elements);
                }
            }

            /* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
            /* Note: We allow users to pass in "null" to skip display setting altogether. */
            if (opts.display === undefined) {
                opts.display = (direction === "In" ? "auto" : "none");
            }

            Velocity(this, propertiesMap, opts);
        };
    });

    return Velocity;
}((window.jQuery || window.Zepto || window), window, document);
}));

/******************
   Known Issues
******************/

/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */
/*
 * Util is a part of HTML GL library
 * Copyright (c) 2015 pixelscommander.com
 * Distributed under MIT license
 * http://htmlgl.com
 * */

(function(w){
    w.HTMLGL = w.HTMLGL || {};
    w.HTMLGL.util = {
        getterSetter: function  (variableParent, variableName, getterFunction, setterFunction) {
            if (Object.defineProperty) {
                Object.defineProperty(variableParent, variableName, {
                    get: getterFunction,
                    set: setterFunction
                });
            }
            else if (document.__defineGetter__) {
                variableParent.__defineGetter__(variableName, getterFunction);
                variableParent.__defineSetter__(variableName, setterFunction);
            }

            variableParent["get" + variableName] = getterFunction;
            variableParent["set" + variableName] = setterFunction;
        },
        emitEvent: function (element, event) {
            var newEvent = new MouseEvent(event.type, event);
            newEvent.dispatcher = 'html-gl';
            event.stopPropagation();
            element.dispatchEvent(newEvent);
        }
    }
})(window);
/*
 * GLElementResolver is a part of HTML GL library for resolving elements by coordinates given
 * Copyright (c) 2015 pixelscommander.com
 * Distributed under MIT license
 * http://htmlgl.com
 * */

(function (w) {
    var GLElementResolver = function (context) {
    }

    var p = GLElementResolver.prototype;

    p.getElementByCoordinates = function (x, y) {
        var element,
            self = this,
            result;

        w.HTMLGL.elements.forEach(function (glelement) {
            element = document.elementFromPoint(x - parseInt(glelement.transformObject.translateX || 0), y - parseInt(glelement.transformObject.translateY || 0))
            if (self.isChildOf(element, glelement)) {
                result = element;
            }
        });

        return result;
    }

    p.isChildOf = function (child, parent) {
        var current = child;
        while (current) {
            if (current === parent) return true;
            current = current.parentNode;
        }
        return false;
    }

    w.HTMLGL.GLElementResolver = GLElementResolver;
})(window);
/*
 * GLContext is a part of HTML GL library describing rendering context
 * Copyright (c) 2015 pixelscommander.com
 * Distributed under MIT license
 * http://htmlgl.com
 * */

(function (w) {
    //Defining global namespace with respect if exists
    HTMLGL = w.HTMLGL = w.HTMLGL || {};

    //Defining it`s properties
    HTMLGL.JQ_PLUGIN_NAME = 'htmlgl';
    HTMLGL.CUSTOM_ELEMENT_TAG_NAME = 'html-gl';
    HTMLGL.context = undefined;
    HTMLGL.stage = undefined;
    HTMLGL.renderer = undefined;
    HTMLGL.elements = [];

    //Cache for window`s scroll position, filled in by updateScrollPosition
    HTMLGL.scrollX = 0;
    HTMLGL.scrollY = 0;

    var GLContext = function () {
        w.HTMLGL.context = this;

        this.createStage();             //Creating stage before showing it
        this.updateScrollPosition();    //Initialize scroll position for first time
        this.initListeners();
        this.elementResolver = new w.HTMLGL.GLElementResolver(this);

        //Wait for DOMContentLoaded and initialize viewer then
        if (!document.body) {
            document.addEventListener("DOMContentLoaded", this.initViewer.bind(this));
        } else {
            this.initViewer();
        }
    }

    var p = GLContext.prototype;

    p.initViewer = function () {
        this.createViewer();
        this.resizeViewer();
        this.appendViewer();
    }

    p.initListeners = function () {
        //window listeners
        w.addEventListener('scroll', this.updateScrollPosition.bind(this));
        w.addEventListener('resize', this.resizeViewer.bind(this));

        //document listeners - mouse and touch events
        document.addEventListener('click', this.onMouseEvent.bind(this), true);
        document.addEventListener('mousemove', this.onMouseEvent.bind(this), true);
        document.addEventListener('mouseup', this.onMouseEvent.bind(this), true);
        document.addEventListener('mousedown', this.onMouseEvent.bind(this), true);
        document.addEventListener('touchstart', this.onMouseEvent.bind(this));
        document.addEventListener('touchend', this.onMouseEvent.bind(this));
    }

    p.updateScrollPosition = function () {
        var scrollOffset = {};

        if (window.pageYOffset != undefined) {
            scrollOffset = {
                left: pageXOffset,
                top: pageYOffset
            };
        } else {
            var sx, sy, d = document, r = d.documentElement, b = d.body;
            sx = r.scrollLeft || b.scrollLeft || 0;
            sy = r.scrollTop || b.scrollTop || 0;
            scrollOffset = {
                left: sx,
                top: sy
            };
        }
        
        this.document.x = -scrollOffset.left;
        this.document.y = -scrollOffset.top;
        w.HTMLGL.scrollX = scrollOffset.left;
        w.HTMLGL.scrollY = scrollOffset.top;

        this.markStageAsChanged();
    }

    p.createViewer = function () {
        w.HTMLGL.renderer = this.renderer = PIXI.autoDetectRenderer(0, 0, {transparent: true});
        this.renderer.view.style.position = 'fixed';
        this.renderer.view.style.top = '0px';
        this.renderer.view.style.left = '0px';
        this.renderer.view.style['pointer-events'] = 'none';
        this.renderer.view.style['pointerEvents'] = 'none';
    }

    p.appendViewer = function () {
        document.body.appendChild(this.renderer.view);
        requestAnimFrame(this.redrawStage.bind(this));
    }

    p.resizeViewer = function () {
        var width = w.innerWidth,
            height = w.innerHeight;

        this.renderer.resize(width, height);
        this.updateTextures();

        this.markStageAsChanged();
    }

    p.createStage = function () {
        w.HTMLGL.stage = this.stage = new PIXI.Stage(0xFFFFFF);
        w.HTMLGL.document = this.document = new PIXI.DisplayObjectContainer();
        this.stage.addChild(w.HTMLGL.document);
    }

    //Avoiding function.bind() for performance and memory consuming reasons
    p.redrawStage = function () {
        if (w.HTMLGL.stage.changed) {
            w.HTMLGL.renderer.render(w.HTMLGL.stage);
            w.HTMLGL.stage.changed = false;
        }
    }

    p.updateTextures = function () {
        w.HTMLGL.elements.forEach(function(element){
            element.updateTexture();
        });
    }

    p.onMouseEvent = function (event) {
        var x = event.x || event.pageX,
            y = event.y || event.pageY,
            //Finding element under mouse position
            element = event.dispatcher !== 'html-gl' ? this.elementResolver.getElementByCoordinates(x, y) : null;

        //Emit event if there is an element under mouse position
        element ? w.HTMLGL.util.emitEvent(element, event) : null;
    }

    //We would like to rerender if something changed, otherwise stand by
    p.markStageAsChanged = function () {
        if (w.HTMLGL.stage && !w.HTMLGL.stage.changed) {
            requestAnimFrame(this.redrawStage);
            w.HTMLGL.stage.changed = true;
        }
    }

    w.HTMLGL.GLContext = GLContext;
    new GLContext();
})(window);
/*
 * ImagesLoaded is a part of HTML GL library which is a robust solution for determining "are images loaded or not?"
 * Copyright (c) 2015 pixelscommander.com
 * Distributed under MIT license
 * http://htmlgl.com
 * */

(function (w) {
    var ImagesLoaded = function (element, callback) {
        this.element = element;
        this.images = this.element.querySelectorAll('img');
        this.callback = callback;
        this.imagesLoaded = this.getImagesLoaded();

        if (this.images.length === this.imagesLoaded) {
            this.onImageLoaded();
        } else {
            this.addListeners();
        }
    }

    var p = ImagesLoaded.prototype;

    p.getImagesLoaded = function () {
        var result = 0;
        for (var i = 0; i < this.images.length; i++) {
            if (this.images[i].complete === true) {
                result++;
            }
        }
        return result;
    }

    p.addListeners = function () {
        var result = 0;
        for (var i = 0; i < this.images.length; i++) {
            if (this.images[i].complete !== true) {
                this.images[i].addEventListener('load', this.onImageLoaded.bind(this));
                this.images[i].addEventListener('error', this.onImageLoaded.bind(this));
            }
        }
        return result;
    }

    p.onImageLoaded = function () {
        this.imagesLoaded++;
        if (this.images.length - this.imagesLoaded <= 0) {
            setTimeout(this.callback, 0);
        }
    }

    w.HTMLGL.ImagesLoaded = ImagesLoaded;
})(window);
/*
* GLElement is a part of HTML GL library describing single HTML-GL element
* Copyright (c) 2015 pixelscommander.com
* Distributed under MIT license
* http://htmlgl.com
*
* Please, take into account:
* - updateTexture is expensive
* - updateSpriteTransform is cheap
* */

(function (w) {
    var p = Object.create(HTMLElement.prototype),
        style = document.createElement('style');

    //Default styling for html-gl elements
    style.innerHTML = HTMLGL.CUSTOM_ELEMENT_TAG_NAME + ' { display: inline-block; transform: translateZ(0);}';
    document.head.appendChild(style);

    p.createdCallback = function () {
        //Checking is node created inside of html2canvas virtual window or not. We do not need WebGL there
        var isInsideHtml2Canvas = this.baseURI !== undefined && this.baseURI.length === 0;

        if (!isInsideHtml2Canvas) {
            HTMLGL.elements.push(this);
            //Needed to determine is element WebGL rendered or not relying on tag name
            this.setAttribute('renderer', 'webgl');
            this.renderer = 'webgl';
            this.transformObject = {};
            this.boundingRect = {};
            this.image = {};
            this.sprite = new PIXI.Sprite();
            this.texture = {};
            this.halfWidth = 0;
            this.halfHeight = 0;
            this.observer = undefined;
            this.bindCallbacks();
            this.transformProperty = this.style.transform !== undefined ? 'transform' : 'WebkitTransform';
            this.init();
        }
    }

    p.init = function () {
        this.updateTexture();
        this.initObservers();
        this.patchStyleGLTransform();
    }

    //Updating bounds, waiting for all images to load and calling rasterization then
    p.updateTexture = function () {
        var self = this;
        self.updateBoundingRect();

        new HTMLGL.ImagesLoaded(self, function () {
            //Bounds could change during images loading
            self.updateBoundingRect();
            self.image = html2canvas(self, {
                onrendered: self.applyNewTexture,
                width: self.boundingRect.width,
                height: self.boundingRect.height
            });
        });
    }

    //Recreating texture from canvas given after calling updateTexture
    p.applyNewTexture = function (textureCanvas) {
        this.image = textureCanvas;
        this.texture = PIXI.Texture.fromCanvas(this.image);

        if (!this.haveSprite()) {
            this.initSprite(this.texture);
        } else {
            this.sprite.texture.destroy();
            this.sprite.setTexture(this.texture);
        }

        this.updatePivot();
        this.updateSpriteTransform();

        HTMLGL.context.markStageAsChanged();
    }

    //Just updates WebGL representation coordinates and transformation
    p.updateSpriteTransform = function () {

        //TODO add 3d rotation support
        var translateX = parseFloat(this.transformObject.translateX) || 0,
            translateY = parseFloat(this.transformObject.translateY) || 0,
            scaleX = parseFloat(this.transformObject.scaleX) || 1,
            scaleY = parseFloat(this.transformObject.scaleY) || 1,
            rotate = (parseFloat(this.transformObject.rotateZ) / 180) * Math.PI || 0;

        if (this.sprite && this.sprite.position) {
            this.sprite.position.x = this.boundingRect.left + translateX + this.halfWidth;
            this.sprite.position.y = this.boundingRect.top + translateY + this.halfHeight;
            this.sprite.scale.x = scaleX;
            this.sprite.scale.y = scaleY;
            this.sprite.rotation = rotate;
        }

        HTMLGL.context.markStageAsChanged();
    }

    //Getting bounding rect with respect to current scroll position
    p.updateBoundingRect = function () {
        this.boundingRect = {
            left: this.getBoundingClientRect().left,
            right: this.getBoundingClientRect().right,
            top: this.getBoundingClientRect().top,
            bottom: this.getBoundingClientRect().bottom,
            width: this.getBoundingClientRect().width,
            height: this.getBoundingClientRect().height,
        };

        this.boundingRect.left = HTMLGL.scrollX + parseFloat(this.boundingRect.left);
        this.boundingRect.top = HTMLGL.scrollY + parseFloat(this.boundingRect.top);
    }

    //Correct pivot needed to rotate element around it`s center
    p.updatePivot = function () {
        this.halfWidth = this.sprite.width / 2;
        this.halfHeight = this.sprite.height / 2;
        this.sprite.pivot.x = this.halfWidth;
        this.sprite.pivot.y = this.halfHeight;
    }

    p.initSprite = function (texture) {
        var self = this;
        //this.sprite = new PIXI.Sprite(texture);
        this.sprite.setTexture(texture);
        HTMLGL.document.addChild(this.sprite);
        setTimeout(function () {
            self.hideDOM();
        }, 0);
    }

    p.initObservers = function () {
        //TODO Better heuristics for rerendering condition #2
        var self = this,
            config = {
                childList: true,
                characterData: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
            };

        this.observer = this.observer || new MutationObserver(function (mutations) {
            if (mutations[0].attributeName === 'style') {
                self.transformObject = self.getTransformObjectFromString(self.style[self.transformProperty]);
                self.updateSpriteTransform();
            } else {
                self.updateTexture();
            }
        });

        this.observer.observe(this, config);
    }

    p.patchStyleGLTransform = function () {
        var self = this;
        self.styleGL = {};

        HTMLGL.util.getterSetter(this.styleGL, this.transformProperty, function () {
                var result = '';

                for (var transformPropertyName in self.transformObject) {
                    var transformPropertyValue = '(' + self.transformObject[transformPropertyName] + ') ';
                    result += transformPropertyName + transformPropertyValue;
                }

                return result;
            },
            function (value) {
                self.transformObject = self.getTransformObjectFromString(value);
                self.updateSpriteTransform();
            }
        )
    }

    p.getTransformObjectFromString = function (transformString) {
        return (transformString.match(/([\w]+)\(([^\)]+)\)/g) || [])
            .map(function (it) {
                return it.replace(/\)$/, "").split(/\(/)
            })
            .reduce(function (m, it) {
                return m[it[0]] = it[1], m
            }, {});
    }

    p.hideDOM = function () {
        this.style.opacity = 0;
    }

    p.bindCallbacks = function () {
        this.applyNewTexture = this.applyNewTexture.bind(this);
    }

    p.haveSprite = function () {
        return this.sprite.stage;
    }

    HTMLGL.GLElement = document.registerElement(HTMLGL.CUSTOM_ELEMENT_TAG_NAME, {
        prototype: p
    })

    HTMLGL.GLElement.createFromNode = function (node) {
        //Extending node with GLElement methods
        for (var i in p) {
            if (p.hasOwnProperty(i)) {
                node[i] = p[i];
            }
        }

        p.createdCallback.apply(node);
        return node;
    }

    //Wrap to jQuery plugin
    if (w.jQuery !== undefined) {
        jQuery[HTMLGL.JQ_PLUGIN_NAME] = {};
        jQuery[HTMLGL.JQ_PLUGIN_NAME].elements = [];

        jQuery.fn[HTMLGL.JQ_PLUGIN_NAME] = function () {
            return this.each(function () {
                if (!jQuery.data(this, 'plugin_' + HTMLGL.JQ_PLUGIN_NAME)) {
                    var propellerObj = HTMLGL.GLElement.createFromNode(this);
                    jQuery.data(this, 'plugin_' + HTMLGL.JQ_PLUGIN_NAME, propellerObj);
                    jQuery[HTMLGL.JQ_PLUGIN_NAME].elements.push(propellerObj);
                }
            });
        };
    }
})(window);