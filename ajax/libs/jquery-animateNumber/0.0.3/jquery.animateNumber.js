/** @preserve jQuery animateNumber plugin v0.0.2
 * (c) 2013, Alexandr Borisov.
 * https://github.com/aishek/jquery-animateNumber
 */

// ['...'] notation using to avoid names minification by Google Closure Compiler
(function($) {
  if (!$['Tween'] || !$['Tween']['propHooks']) {
    throw new Error('jquery.animateNumber requires jQuery 1.8.0 or higher');
  }

  var defaults = {
    number_step: function(now, tween) {
      var floored_number = Math.floor(now),
          target = $(tween.elem);

      target.text(floored_number);
    }
  };

  $['Tween']['propHooks']['number'] = {
    set: function( tween ) {
      if ( tween['elem']['nodeType'] && tween['elem']['parentNode'] ) {
        var handler = tween['elem']['_animateNumberSetter'];
        if (!handler) {
          handler = defaults.number_step;
        }

        handler(tween.now, tween);
      }
    }
  };

  $['animateNumber'] = {
    number_step_factories: {
      append: function(suffix) {
        return function(now, tween) {
          var floored_number = Math.floor(now),
              target = $(tween.elem);

          target.prop('number', now).text(floored_number + suffix);
        }
      },

      separator: function(separator, group_length) {
        separator = separator || ' ';
        group_length = group_length || 3;

        return function(now, tween) {
          var floored_number = Math.floor(now),
              separated_number = floored_number.toString(),
              target = $(tween.elem);

          if (separated_number.length > group_length) {
            var numbers = separated_number.split('').reverse(),
                number_parts = [],
                current_number_part,
                current_index,
                q;

            for(var i = 0, l = Math.ceil(separated_number.length / group_length); i < l; i++) {
              current_number_part = '';
              for(q = 0; q < group_length; q++) {
                current_index = i * group_length + q;
                if (current_index == separated_number.length) break;

                current_number_part = current_number_part + numbers[current_index];
              }
              number_parts.push(current_number_part);
            };

            separated_number = number_parts.join(separator);
            separated_number = separated_number.split('').reverse().join('');
          }

          target.prop('number', now).text(separated_number);
        }
      }
    }
  };

  $.fn['animateNumber'] = function() {
    var options = arguments[0],
        settings = $.extend({}, defaults, options),

        target = $(this),
        args = [settings],
        animate_result;

    for(var i = 1, l = arguments.length; i < l; i++) {
      args.push(arguments[i]);
    }

    // needs of custom step function usage
    if (options.number_step) {
      // assigns custom step functions
      var items = this.each(function(){
        this['_animateNumberSetter'] = options.number_step;
      });

      // cleanup of custom step functions after animation
      var generic_complete = settings.complete;
      settings.complete = function() {
        items.each(function(){
          delete this['_animateNumberSetter'];
        });

        if ( generic_complete ) {
          generic_complete.apply(this, arguments);
        }
      }
    }

    return target.animate.apply(target, args);
  };

}(jQuery));