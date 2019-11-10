!function(n){"use strict";provide(function(){return function(t,c,e){var i;function u(){var r=this,a=arguments,o=e&&!i;u.cancel(),i=n(function(){u.cancel(),!e&&t.apply(r,a)},parseInt(c,10)||200),o&&t.apply(r,a)}return u.cancel=function(){i=clearTimeout(i)},u}})}(setTimeout);
//# sourceMappingURL=debounce.js.map
