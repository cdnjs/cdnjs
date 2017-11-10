/*!
 * @copyright Copyright (c) 2015 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.1.6
 */
(function(){if(window&&window.addEventListener){var k=Object.create(null),l,q,f=function(){clearTimeout(q);q=setTimeout(l,100)},p=function(){},t=function(){var d;window.MutationObserver?(d=new MutationObserver(f),d.observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0}),p=function(){try{d.disconnect()}catch(k){}}):(document.documentElement.addEventListener("DOMSubtreeModified",f,!1),p=function(){document.documentElement.removeEventListener("DOMSubtreeModified",f,!1)})};l=function(){function d(){--g;
0===g&&t()}function l(a){return function(){var c=document.body,b=document.createElement("x");a.onload=null;b.innerHTML=a.responseText;if(b=b.getElementsByTagName("svg")[0])b.style.position="absolute",b.style.width=0,b.style.height=0,c.insertBefore(b,c.firstChild);d()}}function f(a){return function(){a.onerror=null;a.ontimeout=null;d()}}var b,c,m,e,n,g=0,a,h;window.XMLHttpRequest&&(n=new XMLHttpRequest,n=void 0!==n.withCredentials?XMLHttpRequest:XDomainRequest||void 0);if(void 0!==n){p();h=document.getElementsByTagName("use");
for(e=0;e<h.length;e+=1){try{c=h[e].getBoundingClientRect()}catch(u){c=!1}m=h[e].getAttributeNS("http://www.w3.org/1999/xlink","href").split("#");b=m[0];m=m[1];a=c&&0===c.left&&0===c.right;c&&0===c.width&&0===c.height&&!a?b.length&&(a=k[b],!0!==a&&h[e].setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","#"+m),void 0===a&&(a=new n,k[b]=a,a.onload=l(a),a.onerror=f(a),a.ontimeout=f(a),a.open("GET",b),a.send(),g+=1)):a||void 0!==k[b]||(k[b]=!0)}h="";g+=1;d()}};window.addEventListener("load",function r(){window.removeEventListener("load",
r,!1);l()},!1)}})();
