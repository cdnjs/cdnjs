/*! /function/debounce 1.0.9 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(t){"use strict";function n(){return function(n,r){var u;return r=parseInt(r,10)||200,function(){var e=this,i=arguments;clearTimeout(u),u=t(function(){n.apply(e,i)},r)}}}provide(n)}(setTimeout);
//# sourceMappingURL=debounce.js.map
