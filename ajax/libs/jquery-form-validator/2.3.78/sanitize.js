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
 * jQuery Form Validator Module: sanitize
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * This module makes it possible to add sanitation functions to
 * inputs. The functions is triggered on blur. Example:
 *
 * <input data-sanitize="uppercase trim" />
 *
 * Available functions are:
 *  - uppercase
 *  - lowercase
 *  - capitalize
 *  - trim
 *  - trimLeft
 *  - trimRight
 *  - numberFormat
 *  - insertLeft
 *  - insertRight
 *  - strip
 *  - escape (replace <, >, &, ' and " with HTML entities)
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function($, window) {

  'use strict';

  $.formUtils.addSanitizer({
    name : 'upper',
    sanitizerFunction : function(val) {
      return val.toLocaleUpperCase();
    }
  });

  $.formUtils.addSanitizer({
    name : 'lower',
    sanitizerFunction : function(val) {
      return val.toLocaleLowerCase();
    }
  });

  $.formUtils.addSanitizer({
    name : 'trim',
    sanitizerFunction : function(val) {
      return $.trim(val);
    }
  });

  $.formUtils.addSanitizer({
    name : 'trimLeft',
    sanitizerFunction : function(val) {
      return val.replace(/^\s+/,'');
    }
  });

  $.formUtils.addSanitizer({
    name : 'trimRight',
    sanitizerFunction : function(val) {
      return val.replace(/\s+$/,'');
    }
  });

  $.formUtils.addSanitizer({
    name : 'capitalize',
    sanitizerFunction : function(val) {
      var words = val.split(' ');
          $.each(words, function(i, word) {
            words[i] = word.substr(0,1).toUpperCase() + word.substr(1, word.length);
          });
          return words.join(' ');
    }
  });

  $.formUtils.addSanitizer({
    name : 'insert',
    sanitizerFunction : function(val, $input, pos) {
          var extra = ($input.attr('data-sanitize-insert-'+pos) || '').replace(/\[SPACE\]/g, ' ');
          if ( (pos === 'left' && val.indexOf(extra) === 0) || (pos === 'right' && val.substring(val.length - extra.length) === extra)) {
            return val;
          }
          return (pos === 'left' ? extra:'') + val + (pos === 'right' ? extra : '');
    }
  });

  $.formUtils.addSanitizer({
    name : 'insertRight',
    sanitizerFunction : function(val, $input) { 
        return $.formUtils.sanitizers.insert.sanitizerFunction(val, $input, 'right');
    }
  });

  $.formUtils.addSanitizer({
    name : 'insertLeft',
    sanitizerFunction : function(val, $input) {
        return $.formUtils.sanitizers.insert.sanitizerFunction(val, $input, 'left');
    }
  });

  $.formUtils.addSanitizer({
    name : 'numberFormat',
    sanitizerFunction : function(val, $input) {
      if (val.length === 0) {
        return val;
      }
      if ( 'numeral' in window ) {
        //If this has been previously formatted, it needs to be unformatted first before being reformatted.
        //Else numeral will fail
        val = numeral().unformat(val);
        val = numeral(val).format( $input.attr('data-sanitize-number-format') );
      }
      else {
        throw new ReferenceError('Using sanitation function "numberFormat" requires that you include numeral.js ' +
          '(http://numeraljs.com/)');
      }
      return val;
    }
  });

  $.formUtils.addSanitizer({
    name : 'strip',
    sanitizerFunction : function(val, $input) {
      var toRemove = $input.attr('data-sanitize-strip') || '';
      $.split(toRemove, function(char) {
        var regex = new RegExp($.isNumeric(char) ? char : '\\'+char, 'g');
        val = val.replace(regex, '');
      });
      return val;
    }
  });

  $.formUtils.addSanitizer({
    name : 'escape',
    sanitizerFunction : function(val, $input) {
          var isEscaped = $input.valAttr('is-escaped'),
            entities = {
              '<' : '__%AMP%__lt;',
              '>' : '__%AMP%__gt;',
              '&' : '__%AMP%__amp;',
              '\'': '__%AMP%__#8217;',
              '"' : '__%AMP%__quot;'
            };

          if (isEscaped === 'yes') {
             return val;
          }

          $input.valAttr('is-escaped', 'yes');
          $input.one('keyup', function(evt) {
            if(evt.keyCode !== 9) {
              $input.valAttr('is-escaped', 'no');
            }
          });

          $.each(entities, function(symbol, replacement) {
            val = val.replace(new RegExp(symbol, 'g'), replacement);
          });

          return val.replace(new RegExp('__\%AMP\%__', 'g'), '&');
    }
  });

  $.formUtils.registerLoadedModule('sanitize');

  var inputsThatCantBeSanitized = '[type="button"], [type="submit"], [type="radio"], [type="checkbox"], [type="reset"], [type="search"]',
      setupSanitation = function(evt, $forms, config) {

        if ( !$forms ) {
          $forms = $('form');
        }
        if ( !$forms.each ) { 
          $forms = $($forms);
        }

        var execSanitationCommands = function() {

          var $input = $(this),
            value = $input.val();
            $.split($input.attr('data-sanitize'), function(command) {

            var sanitizer = $.formUtils.sanitizers[command];

            if (sanitizer) {
                value = sanitizer.sanitizerFunction(value, $input, config);
            } else {
              throw new Error('Use of unknown sanitize command "'+command+'"');
            }

          });
          $input
            .val(value)
            .trigger('keyup.validation'); // we need to re-validate in case it gets validated on blur
        };

        $forms.each(function() {
          var $form = $(this);
          if( config.sanitizeAll ) {
            $form.find('input,textarea').not(inputsThatCantBeSanitized).each(function() {
              var $input = $(this),
                  sanitation = $input.attr('data-sanitize') || '';
              $input.attr('data-sanitize', config.sanitizeAll +' '+ sanitation);
            });
          }

          $form.find('[data-sanitize]')
            .unbind('blur.sanitation', execSanitationCommands)
            .bind('blur.sanitation', execSanitationCommands);

          $(function() {
              $form.trigger('blur.sanitation');
          });

        });
      };

  $(window).on('validatorsLoaded formValidationSetup', setupSanitation);

  // Only for unit testing
  $.formUtils.setupSanitation = setupSanitation;

})(jQuery, window);


}));
