/*!
 * Ladda for jQuery
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2015 Hakim El Hattab, http://hakim.se
 */
!function(a,i){"use strict";if(void 0===i)return console.error("jQuery required for Ladda.jQuery");var t=[];(i=i.extend(i,{ladda:function(i){"stopAll"===i&&a.stopAll()}})).fn=i.extend(i.fn,{ladda:function(d){var e=t.slice.call(arguments,1);if("bind"===d)e.unshift(i(this).selector),a.bind.apply(a,e);else{if("isLoading"===d)return i(this).data("ladda").isLoading();i(this).each(function(){var t,n=i(this);void 0===d?n.data("ladda",a.create(this)):(t=n.data("ladda"))[d].apply(t,e)})}return this}})}(this.Ladda,this.jQuery);