/*!
 * # Semantic UI 2.6.4 - Range
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */

;(function ( $, window, document, undefined ) {
  
  "use strict";
  
  $.fn.range = function(parameters) {
    
    var
      $allModules    = $(this),
      
      offset         = 10,
      
      query          = arguments[0],
      methodInvoked  = (typeof query == 'string'),
      queryArguments = [].slice.call(arguments, 1)
    ;
    
    $allModules
      .each(function() {
        
        var
          settings          = ( $.isPlainObject(parameters) )
            ? $.extend(true, {}, $.fn.range.settings, parameters)
            : $.extend({}, $.fn.range.settings),
          
          namespace       = settings.namespace,
          min             = settings.min,
          max             = settings.max,
          step            = settings.step,
          start           = settings.start,
          input           = settings.input,
          
          eventNamespace  = '.' + namespace,
          moduleNamespace = 'module-' + namespace,
          
          $module         = $(this),
          
          element         = this,
          instance        = $module.data(moduleNamespace),
          
          inner,
          thumb,
          trackLeft,
          precision,
          
          module
        ;
        
        module = {
          
          initialize: function() {
            module.instantiate();
            module.sanitize();
          },
          
          instantiate: function() {
            instance = module;
            $module
              .data(moduleNamespace, module)
            ;
            $(element).html("<div class='inner'><div class='track'></div><div class='track-fill'></div><div class='thumb'></div></div>");
            inner = $(element).children('.inner')[0];
            thumb = $(element).find('.thumb')[0];
            trackLeft = $(element).find('.track-fill')[0];
            // find precision of step, used in calculating the value
            module.determinePrecision();
            // set start location
            module.setValuePosition(settings.start);
            // event listeners
            $(element).find('.track, .thumb, .inner').on('mousedown', function(event) {
              event.stopImmediatePropagation();
              event.preventDefault();
              $(this).closest(".range").trigger('mousedown', event);
            });
            $(element).find('.track, .thumb, .inner').on('touchstart', function(event) {
              event.stopImmediatePropagation();
              event.preventDefault();
              $(this).closest(".range").trigger('touchstart', event);
            });
            $(element).on('mousedown', function(event, originalEvent) {
              module.rangeMousedown(event, false, originalEvent);
            });
            $(element).on('touchstart', function(event, originalEvent) {
              module.rangeMousedown(event, true, originalEvent);
            });
            module.addVisibilityListener(element);
          },
          
          sanitize: function() {
            if (typeof settings.min != 'number') {
              settings.min = parseInt(settings.min) || 0;
            }
            if (typeof settings.max != 'number') {
              settings.max = parseInt(settings.max) || false;
            }
            if (typeof settings.start != 'number') {
              settings.start = parseInt(settings.start) || 0;
            }
          },
          
          determinePrecision: function() {
            var split = String(settings.step).split('.');
            var decimalPlaces;
            if(split.length == 2) {
              decimalPlaces = split[1].length;
            } else {
              decimalPlaces = 0;
            }
            precision = Math.pow(10, decimalPlaces);
          },
          
          determineValue: function(startPos, endPos, currentPos) {
            var ratio = (currentPos - startPos) / (endPos - startPos);
            var range = settings.max - settings.min;
            var difference = Math.round(ratio * range / step) * step;
            // Use precision to avoid ugly Javascript floating point rounding issues
            // (like 35 * .01 = 0.35000000000000003)
            difference = Math.round(difference * precision) / precision;
            return difference + settings.min;
          },
          
          determinePosition: function(value) {
            var ratio = (value - settings.min) / (settings.max - settings.min);
            return Math.round(ratio * $(inner).width()) + $(trackLeft).position().left - offset;
          },
          
          setValue: function(newValue, triggeredByUser) {
            if(typeof triggeredByUser === 'undefined') {
              triggeredByUser = true;
            }
            if(settings.input) {
              $(settings.input).val(newValue);
            }
            if(settings.onChange) {
              settings.onChange(newValue, {triggeredByUser: triggeredByUser});
            }
          },
          
          setPosition: function(value) {
            $(thumb).css({left: String(value) + 'px'});
            $(trackLeft).css({width: String(value + offset) + 'px'});
          },
          
          rangeMousedown: function(mdEvent, isTouch, originalEvent) {
            if( !$(element).hasClass('disabled') ) {
              mdEvent.preventDefault();
              var left = $(inner).offset().left;
              var right = left + $(inner).width();
              var pageX;
              if(isTouch) {
                pageX = originalEvent.originalEvent.touches[0].pageX;
              } else {
                pageX = (typeof mdEvent.pageX != 'undefined') ? mdEvent.pageX : originalEvent.pageX;
              }
              var value = module.determineValue(left, right, pageX);
              if(pageX >= left && pageX <= right) {
                module.setPosition(pageX - left - offset);
                module.setValue(value);
              }
              var rangeMousemove = function(mmEvent) {
                mmEvent.preventDefault();
                if(isTouch) {
                  pageX = mmEvent.originalEvent.touches[0].pageX;
                } else {
                  pageX = mmEvent.pageX;
                }
                value = module.determineValue(left, right, pageX);
                if(pageX >= left && pageX <= right) {
                  if(value >= settings.min && value <= settings.max) {
                    module.setPosition(pageX - left - offset);
                    module.setValue(value);
                  }
                }
              }
              var rangeMouseup = function(muEvent) {
                if(isTouch) {
                  $(document).off('touchmove', rangeMousemove);
                  $(document).off('touchend', rangeMouseup);
                } else {
                  $(document).off('mousemove', rangeMousemove);
                  $(document).off('mouseup', rangeMouseup);
                }
              }
              if(isTouch) {
                $(document).on('touchmove', rangeMousemove);
                $(document).on('touchend', rangeMouseup);
              }
              else {
                $(document).on('mousemove', rangeMousemove);
                $(document).on('mouseup', rangeMouseup);
              }
            }
          },
          
          setValuePosition: function(val, triggeredByUser) {
            if(typeof triggeredByUser === 'undefined') {
              triggeredByUser = true;
            }
            var position = module.determinePosition(val);
            module.setPosition(position);
            module.setValue(val, triggeredByUser);
          },
          
          invoke: function(query) {
            switch(query) {
              case 'set value':
                if(queryArguments.length > 0) {
                  instance.setValuePosition(queryArguments[0], false);
                }
                break;
            }
          },
          
          addVisibilityListener: function(elem) {
            
            // Add a mutation observer (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
            // to detect when root invisible element is behing shown in order to initialize the thumb correctly
            // when position and offets are available (https://stackoverflow.com/a/5974377)
            
            var observer = new MutationObserver(function(mutationList) {
              if ($(elem).is(':visible')) {
                observer.disconnect(); // Avoid infinite recursion because « module.setValuePosition » will trigger this observer
                module.setValuePosition(settings.start);
              }
            });
            
            var closestHiddenParent = $(elem).parentsUntil(':visible');
            
            if (closestHiddenParent.length != 0) {
              observer.observe(closestHiddenParent[closestHiddenParent.length - 1], {attributes: true});
            }
          },
          
        };
        
        if(methodInvoked) {
          if(instance === undefined) {
            module.initialize();
          }
          module.invoke(query);
        }
        else {
          module.initialize();
        }
        
      })
    ;
    
    return this;
    
  };
  
  $.fn.range.settings = {
    
    name         : 'Range',
    namespace    : 'range',
    
    min          : 0,
    max          : false,
    step         : 1,
    start        : 0,
    input        : false,
    
    onChange     : function(value){},
    
  };
  
  
})( jQuery, window, document );
