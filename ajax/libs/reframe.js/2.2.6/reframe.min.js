/*
  * reframe.js - Reframe.js: responsive iframes for embedded content
  * @version v2.2.6
  * @link https://github.com/dollarshaveclub/reframe.js#readme
  * @author Jeff Wainwright <jjwainwright2@gmail.com> (http://jeffry.in)
  * @license MIT
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).reframe=t()}(this,function(){"use strict";return function(e,t){var i="string"==typeof e?document.querySelectorAll(e):e,n=t||"js-reframe";"length"in i||(i=[i]);for(var o=0;o<i.length;o+=1){var r=i[o];if(!(-1!==r.className.split(" ").indexOf(n))){var f=r.getAttribute("height"),d=r.getAttribute("width");if(!(-1<d.indexOf("%")||-1<r.style.width.indexOf("%"))){var s=(f||r.offsetHeight)/(d||r.offsetWidth)*100,a=document.createElement("div");a.className=n;var l=a.style;l.position="relative",l.width="100%",l.paddingTop=s+"%";var p=r.style;p.position="absolute",p.width="100%",p.height="100%",p.left="0",p.top="0",r.parentNode.insertBefore(a,r),r.parentNode.removeChild(r),a.appendChild(r)}}}}});