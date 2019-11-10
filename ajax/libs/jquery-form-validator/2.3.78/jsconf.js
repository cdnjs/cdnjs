(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

/**
 * jQuery Form Validator Module: JSconf
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * This module makes it possible to configure form validation using javascript
 *
 * @website http://formvalidator.net/#location-validators
 * @license MIT
 */
(function($) {

  'use strict';

  $.formUtils.registerLoadedModule('jsconf');

  $.setupValidation = function(conf) {
    var $forms = $(conf.form || 'form');
    $.each(conf.validate || conf.validation || {}, function(elemRef, attr) {
        var $elem;
        if ( elemRef[0] === '#' ) {
          $elem = $(elemRef);
        }
        else if ( elemRef[0] === '.' ) {
          $elem = $forms.find(elemRef);
        }
        else {
          $elem = $forms.find('*[name="' +elemRef+ '"]');
        }

        $elem.attr('data-validation', attr.validation);

        $.each(attr, function(name, val) {
          if( name !== 'validation' && val !== false) {
            if( val === true ) {
              val = 'true';
            }
            if( name[0] === '_' ) {
                name = name.substring(1);
                if( val === false ) {
                    $elem.removeAttr(name);
                } else {
                    $elem.attr(name, val);
                }
            } else {
                $elem.valAttr(name, val);
            }
          }
        });
    });

    $.validate(conf);

  };

})(jQuery);


}));
