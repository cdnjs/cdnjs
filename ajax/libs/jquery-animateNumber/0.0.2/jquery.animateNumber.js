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

  $.fn['animateNumber'] = function() {
    var options = arguments[0],
        settings = $.extend(defaults, options),
        
        target = $(this),
        args = [settings],
        animate_result;

    for(var i = 1, l = arguments.length; i < l; i++) {
      args.push(arguments[i]);
    }
    
    // needs of custom step function usage
    if (options.number_step) {      
      // assigns custom step functions
      this.each(function(){
        this['_animateNumberSetter'] = options.number_step;
      });

      animate_result = target.animate.apply(target, args);

      // cleanup of custom step functions
      this.each(function(){
        delete this['_animateNumberSetter'];
      });
    }
    else {
      animate_result = target.animate.apply(target, args);
    }

    return animate_result;
  };

}(jQuery));