/**
 * jquery.detectSwipe v1.0
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch, iPad and Android
 * http://github.com/marcandre/detect_swipe
 * Based on touchwipe by Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */
(function($) {
  $.fn.detectSwipe = function(settings) {
    var config = {
      threshold: 20,
    };

    if (settings) $.extend(config, settings);

    this.each(function() {
      var startX;
      var startY;
      var isMoving = false;

      function onTouchMove(e) {
        e.preventDefault();
        if(isMoving) {
          var x = e.touches[0].pageX;
          var y = e.touches[0].pageY;
          var dx = startX - x;
          var dy = startY - y;
          var dir;
          if(Math.abs(dx) >= config.threshold) {
            dir = dx > 0 ? 'left' : 'right'
          }
          else if(Math.abs(dy) >= config.threshold) {
            dir = dy > 0 ? 'down' : 'up'
          }
          if(dir) {
            this.removeEventListener('touchmove', onTouchMove);
            isMoving = false;
            $(this).trigger('swipe' + dir);
          }
        }
      }

      function onTouchStart(e) {
        if (e.touches.length == 1) {
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
          isMoving = true;
          this.addEventListener('touchmove', onTouchMove, false);
        }
      }
      if ($.fn.detectSwipe.enabled) {
        this.addEventListener('touchstart', onTouchStart, false);
      }
    });

    return this;
  };
  $.fn.detectSwipe.enabled = 'ontouchstart' in document.documentElement;
})(jQuery);
