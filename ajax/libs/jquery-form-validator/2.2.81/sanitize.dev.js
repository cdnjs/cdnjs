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
 *  - escape (replace <, >, &, ' and " with HTML entities)
 *
 * @website http://formvalidator.net/
 * @license MIT
 * @version 2.2.81
 */
(function($, window) {

  "use strict";

  var inputsThatCantBeSanitized = '[type="button"], [type="submit"], [type="radio"], [type="checkbox"], [type="reset"], [type="search"]',
      splitStringInHalf = function(str) {
        var firstHalf = Math.floor(str.length / 2);
        return [str.substr(0, firstHalf), str.substr(firstHalf, str.length - firstHalf)];
      },
      sanitizeCommands = {
        upper : function(val) {
          return val.toLocaleUpperCase();
        },
        lower : function(val) {
          return val.toLocaleLowerCase();
        },
        trim : function(val) {
          return $.trim(val);
        },
        trimLeft : function(val) {
          if( val.length > 1 ) {
            var parts = splitStringInHalf(val);
            val = $.trim(parts[0]) + parts[1];
          }
          return val;
        },
        trimRight : function(val) {
          if( val.length > 1 ) {
            var parts = splitStringInHalf(val);
            val = parts[0] + $.trim(parts[1]);
          }
          return val;
        },
        capitalize : function(val) {
          var words = val.split(' ');
          $.each(words, function(i, word) {
            words[i] = word.substr(0,1).toUpperCase() + word.substr(1, word.length);
          });
          return words.join(' ');
        },
        insert : function(val, $input, pos) {
          var extra = ($input.attr('data-sanitize-insert-'+pos) || '').replace(/\[SPACE\]/g, ' ');
          if( (pos == 'left' && val.indexOf(extra) == 0) ||
              (pos == 'right' && val.substring(val.length - extra.length) == extra)) {
            return val;
          }
          return (pos == 'left' ? extra:'') + val + (pos == 'right' ? extra : '');
        },
        insertRight : function(val, $input) {
          return this.insert(val, $input, 'right');
        },
        insertLeft : function(val, $input) {
          return this.insert(val, $input, 'left');
        },
        numberFormat : function(val, $input, config) {
          if( 'numeral' in window ) {
            val = numeral(val).format( $input.attr('data-sanitize-number-format') );
          } else {
            throw new Error('Using sanitation function "numberFormat" requires that you include numeraljs (http://http://numeraljs.com/)');
          }
          return val;
        },
        escape : function(val) {
          var symbols = {
            '<' : '__%AMP%__lt;',
            '>' : '__%AMP%__gt;',
            '&' : '__%AMP%__amp;',
            '\'': '__%AMP%__#8217;',
            '"' : '__%AMP%__quot;'
          };
          $.each(symbols, function(symbol, replacement) {
            val = val.replace(new RegExp(symbol, 'g'), replacement);
          });
          return val.replace(new RegExp('__\%AMP\%__', 'g'), '&');
        }
      },
      setupSanitation = function(evt, $forms, config) {

        if( !$forms ) {
          $forms = $('form');
        }
        if( !$forms.each )
          $forms = $($forms);

        var execSanitationCommands = function() {
          var $input = $(this),
            value = $input.val();
          $.split($input.attr('data-sanitize'), function(command) {
            if( command in sanitizeCommands )
              value = sanitizeCommands[command](value, $input, config);
            else
              throw new Error('Use of unknown sanitize command "'+command+'"');
          });
          $input
            .val(value)
            .trigger('keyup.validation'); // we need to re-validate in case it gets validated on blur
        };

        $forms.each(function() {
          var $form = $(this);
          if( config.sanitizeAll ) {
            $form.find('input,textarea').not(inputsThatCantBeSanitized).each(function() {
              $(this).attr('data-sanitize', config.sanitizeAll+ ' '+ ($(this).attr('data-sanitize') || ''));
            });
          }

          $form.find('[data-sanitize]')
            .unbind('blur', execSanitationCommands)
            .bind('blur', execSanitationCommands);

        });
      };

  $(window).on('validatorsLoaded formValidationSetup', setupSanitation);

  // Only for unit testing
  $.formUtils.setupSanitation = setupSanitation;

})(jQuery, window);
