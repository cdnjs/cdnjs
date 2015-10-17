/**
 *  JQUERY-FORM-VALIDATOR
 *
 *  @website by 
 *  @license MIT
 *  @version 2.2.81
 */
!function(a){"use strict";a.setupValidation=function(b){var c=a(b.form||"form");a.each(b.validate||b.validation||{},function(b,d){var e;e="#"==b[0]?a(b):c.find("."==b[0]?b:'*[name="'+b+'"]'),e.attr("data-validation",d.validation),a.each(d,function(a,b){"validation"!=a&&b!==!1&&(b===!0&&(b="true"),e.valAttr(a,b))})}),a.validate(b)}}(jQuery);