/*! /hooks/css 1.0.2 | http://nucleus.qoopido.com | (c) 2015 Dirk Lueth */
!function(t){"use strict";function e(e){function n(t,e){t&&e&&o[t]&&(o[t]=e)}function r(t){return t&&o[t]?o[t]:void 0}function u(t,n,u,o){var i;return u=e(u,n),u?((i=r(u[1]))&&i[t]||r("general")[t])(n,u,o):void 0}var o={general:{get:function(e,n){return t(e,null).getPropertyValue(n[0])},set:function(t,e,n){t.style[e[1]]=n}}};return{add:n,get:r,process:u}}provide(["../support/css/property"],e)}(getComputedStyle);
//# sourceMappingURL=css.js.map
