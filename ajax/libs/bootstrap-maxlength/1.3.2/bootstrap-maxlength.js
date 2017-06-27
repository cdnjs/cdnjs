/* ==========================================================
 * bootstrap-maxlength.js v1.3.2
 * ==========================================================
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

(function ($) {
    "use strict"; // jshint ;_;
    $.fn.extend({
        maxlength: function (options, callback) {

      var documentBody = $('body'),
          defaults = {
                    alwaysShow: false, // if true the indicator it's always shown.
                    threshold: 10, // Represents how many chars left are needed to show up the counter
                    warningClass: "badge badge-success",
                    limitReachedClass: "badge badge-important",
                    separator: ' / ',
                    preText: '',
                    postText: '',
                    placement: 'bottom',
                    validate: false // if the browser doesn't support the maxlength attribute, attempt to type more than 
                        // the indicated chars, will be prevented.
            };

      if($.isFunction(options) && !callback) {
        callback = options;
        options = {};
      }

      options = $.extend(defaults, options);

      /**
       * Return true if the indicator should be showing up.
       *
       * @param input
       * @param thereshold
       * @param maxlength
       * @return {number}
       */
      function charsLeftThreshold(input, thereshold, maxlength) {

        if ( options.alwaysShow ) {
          return true
        } else {
          if ( (maxlength - inputLength(input) ) <= thereshold) {
            return true
          } else {
            return false
          }
        }
      };

      /**
       * Return the length of the specified input.
       *
       * @param input
       * @return {number}
       */
      function inputLength(input) {
        return input.val().length
      };

      /**
       * Returns how many chars are left to complete the fill up of the form.
       *
       * @param input
       * @param maxlength
       * @return {number}
       */
      function remainingChars(input, maxlength) {
        var length = maxlength - inputLength(input);
        return length;
      };

      /**
       * When called displays the indicator.
       *
       * @param indicator
       */
      function showRemaining(indicator) {
        indicator.css({
          display: 'block'
        });
      };

      /**
       * When called shows the indicator.
       *
       * @param indicator
       */
      function hideRemaining(indicator) {
        indicator.css({
          display: 'none'
        });
      };

      /**
       * This function updates the value of the counter in the indicator.
       * Wants as parameters: the number of remaining chars, the element currently managed,
       * the maxLength for the current input and the indicator generated for it.
       *
       * @param remaining
       * @param currentInput
       * @param maxLengthCurrentInput
       * @param maxLengthIndicator
       */
      function manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator) {
        maxLengthIndicator.html(updateMaxLengthHTML(maxLengthCurrentInput,remaining));

        if ( remaining ) {
          if(charsLeftThreshold(currentInput, options.threshold, maxLengthCurrentInput)) {
            showRemaining(maxLengthIndicator.removeClass(options.limitReachedClass).addClass(options.warningClass))
          } else {
            hideRemaining(maxLengthIndicator)
          }
        } else {
          showRemaining(maxLengthIndicator.removeClass(options.warningClass).addClass(options.limitReachedClass))
        }
      };

      /**
       * This function updates the value in the indicator
       *  
       * @param maxlengthIndicator
       * @return String
       */
      function updateMaxLengthHTML(maxLengthThisInput, typedChars) {
        var output = '';
        if(options.preText) {
          output += options.preText;
        } 
        output = output + typedChars + options.separator + maxLengthThisInput;
        if(options.postText) {
          output += options.postText;
        } 
        return output
      }

      /**
       * This function returns an object containing all the 
       * informations about the position of the current input 
       *  
       *  @param currentInput
       *  @return object {bottom height left right top  width}
       *
       */
       function getPosition(currentInput) {
      var el = currentInput[0]
        return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
        , height: el.offsetHeight
        }, currentInput.offset())
      }

      /**
       *  This function places the maxLengthIndicator at the
       *  top / bottom / left / right of the currentInput
       *
       *  @param currentInput
       *  @param maxLengthIndicator
       *  @return null
       *
       */
      function place(currentInput, maxLengthIndicator) {
        var pos = getPosition(currentInput),
          offset = currentInput.offset(),
          inputOuter = currentInput.outerWidth(),
          outerWidth = maxLengthIndicator.outerWidth(),
          actualWidth = maxLengthIndicator.width(),
          actualHeight = maxLengthIndicator.height();

        switch (options.placement) {
          case 'bottom':
            maxLengthIndicator.css( {top: offset.top + pos.height, left: offset.left + pos.width / 2 - actualWidth / 2})
            break;
          case 'top':
            maxLengthIndicator.css({top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2})
            break;
          case 'left':
            maxLengthIndicator.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth})
            break;
          case 'right':
            maxLengthIndicator.css({top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width})
            break;
          case 'bottom-right':
            maxLengthIndicator.css({top: pos.top + pos.height, left: pos.left + pos.width})
            break;
          case 'top-right':
            maxLengthIndicator.css({top: offset.top - actualHeight, left: offset.left + inputOuter})
            break;
          case 'top-left':
            maxLengthIndicator.css({top: offset.top - actualHeight, left: offset.left - outerWidth})
            break;
          case 'bottom-left':
            maxLengthIndicator.css({top: offset.top + currentInput.outerHeight(), left: offset.left - outerWidth})
            break;
          case 'centered-right':
            maxLengthIndicator.css({top: offset.top + (actualHeight / 2), left: offset.left + inputOuter - outerWidth - 3})
            break; 
        }   
      }

      return this.each(function(){

        var currentInput = $(this),
          maxLengthCurrentInput = currentInput.attr('maxlength') || currentInput.attr('size'),
          maxLengthIndicator = $('<span></span>').css({
                        display:'none',
                        position:'absolute',
                        whiteSpace:'nowrap',
                        zIndex: 999
                      }).html(updateMaxLengthHTML(maxLengthCurrentInput,'0'))

        documentBody.append(maxLengthIndicator)
        
        currentInput.focus(function() {

          var remaining = remainingChars(currentInput, maxLengthCurrentInput);
          
          maxLengthIndicator.css({
            zIndex: 99999
          });

          manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator);
          place(currentInput,maxLengthIndicator);

        });

        currentInput.blur(function(){
          maxLengthIndicator.css('display','none');
        });

         currentInput.keyup(function(){
          var remaining = remainingChars(currentInput, maxLengthCurrentInput);
          if ( options.validate && remaining < 0 ) {
            return false;
          } else {
            manageRemainingVisibility(remaining, currentInput, maxLengthCurrentInput, maxLengthIndicator);
          }
         });
      });
    }
  });
})(jQuery);