/*!
 * Ladda for jQuery
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2015 Hakim El Hattab, http://hakim.se
 */
(function(t,e){if(void 0===e)return console.error("jQuery required for Ladda.jQuery");var i=[];e=e.extend(e,{ladda:function(e){"stopAll"===e&&t.stopAll()}}),e.fn=e.extend(e.fn,{ladda:function(n){var r=i.slice.call(arguments,1);return"bind"===n?(r.unshift(e(this).selector),t.bind.apply(t,r)):e(this).each(function(){var i,o=e(this);void 0===n?o.data("ladda",t.create(this)):(i=o.data("ladda"),i[n].apply(i,r))}),this}})})(this.Ladda,this.jQuery);