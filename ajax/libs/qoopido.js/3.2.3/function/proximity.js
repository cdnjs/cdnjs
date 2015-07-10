/*!
* Qoopido.js library v3.2.3, 2014-0-13
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("function/proximity",t,["../base"])}(function(t,a,o,e,r,y,s){"use strict";return function(t,a){var o=!1;return t="object"==typeof t&&null!==t?t:{x:s,y:s},a="object"==typeof a&&null!==a?a:{x:s,y:s},t.x!==s&&t.y!==s&&a.x!==s&&a.y!==s&&(t.x=parseFloat(t.x),t.y=parseFloat(t.y),a.x=parseFloat(a.x),a.y=parseFloat(a.y),o={x:parseFloat(Math.abs(a.x-t.x)),y:parseFloat(Math.abs(a.y-t.y)),total:parseFloat(Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2)))}),o}});