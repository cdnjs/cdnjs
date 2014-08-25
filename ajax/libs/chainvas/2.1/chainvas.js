/**
 * Chainvas: Chaining for everyone!
 * @author Lea Verou
 * MIT license http://www.opensource.org/licenses/mit-license.php
 */
(function(){var e=window.Chainvas={chainable:function(a){return function(){var b=a.apply(this,arguments);return b===void 0?this:b}},chainablizeOne:function(a,b){try{e.utils.hasOwnProperty(a,b)&&e.utils.isFunction(a[b])&&(a[b]=e.chainable(a[b]))}catch(c){}return this},chainablize:function(a,b){var c=a.prototype;if(b)for(var d=b.length;d--;)e.chainablizeOne(c,b[d]);else for(d in c)e.chainablizeOne(c,d);return this},helpers:function(a,b){var c=a.prototype,d;for(d in e.methods)c&&!(d in c)&&(c[d]=e.methods[d]);
e.extend(c,b);return this},extend:function(a,b){return Chainvas.methods.prop.call(a,b)},global:function(a,b,c){typeof a==="string"&&(a=[a]);for(var d=a.length;d--;){var f=window[a[d]];f&&e.chainablize(f,c).helpers(f,b)}},methods:{prop:function(){if(arguments.length===1){var a=arguments[0],b;for(b in a)this[b]=a[b]}else arguments.length===2&&(this[arguments[0]]=arguments[1]);return this}},utils:{isFunction:function(a){var b=Object.prototype.toString.call(a);return b==="[object Function]"||b==="[object Object]"&&
"call"in a&&"apply"in a&&/^\s*\bfunction\s+\w+\([\w,]*\) \{/.test(a+"")},hasOwnProperty:function(a,b){try{return a.hasOwnProperty(b)}catch(c){return b in a&&(!a.prototype||!(b in a.prototype)||a.prototype[b]!==a[b])}}}}})();



(function(){var a=["CSSStyleDeclaration","DOMTokenList","Node","Element"];if(window.HTMLElement&&"addEventListener"in window.HTMLElement.prototype&&window.Components&&window.Components.interfaces)for(var p in Components.interfaces)if(p.match(/^nsIDOMHTML\w*Element$/)){var b=p.replace(/^nsIDOM/,"");window[b]&&a.push(b)}Chainvas.global(a)})();



Chainvas.global("CanvasRenderingContext2D",{circle:function(a,b,d){return this.beginPath().arc(a,b,d,0,2*Math.PI,!1).closePath()},roundRect:function(a,b,d,e,c){return this.beginPath().moveTo(a+c,b).lineTo(a+d-c,b).quadraticCurveTo(a+d,b,a+d,b+c).lineTo(a+d,b+e-c).quadraticCurveTo(a+d,b+e,a+d-c,b+e).lineTo(a+c,b+e).quadraticCurveTo(a,b+e,a,b+e-c).lineTo(a,b+c).quadraticCurveTo(a,b,a+c,b).closePath()}});