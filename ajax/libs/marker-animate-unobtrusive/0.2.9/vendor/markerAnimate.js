// Animated Marker Movement. Robert Gerlach 2012-2013 https://github.com/combatwombat/marker-animate
// MIT license
//
// params:
// newPosition        - the new Position as google.maps.LatLng()
// options            - optional options object (optional)
// options.duration   - animation duration in ms (default 1000)
// options.easing     - easing function from jQuery and/or the jQuery easing plugin (default 'linear')
// options.complete   - callback function. Gets called, after the animation has finished
google.maps.Marker.prototype.animateTo = function(newPosition, options) {
  defaultOptions = {
    duration: 1000,
    easing: 'linear',
    complete: null
  }
  options = options || {};

  // complete missing options
  for (key in defaultOptions) {
    options[key] = options[key] || defaultOptions[key];
  }

  // throw exception if easing function doesn't exist
  if (options.easing != 'linear') {            
    if (typeof jQuery == 'undefined' || !jQuery.easing[options.easing]) {
      throw '"' + options.easing + '" easing function doesn\'t exist. Include jQuery and/or the jQuery easing plugin and use the right function name.';
      return;
    }
  }
  
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  // save current position. prefixed to avoid name collisions. separate for lat/lng to avoid calling lat()/lng() in every frame
  this.AT_startPosition_lat = this.getPosition().lat();
  this.AT_startPosition_lng = this.getPosition().lng();
  var newPosition_lat = newPosition.lat();
  var newPosition_lng = newPosition.lng();
  
  // crossing the 180° meridian and going the long way around the earth?
  if (Math.abs(newPosition_lng - this.AT_startPosition_lng) > 180) {
    if (newPosition_lng > this.AT_startPosition_lng) {      
      newPosition_lng -= 360;      
    } else {
      newPosition_lng += 360;
    }
  }

  var animateStep = function(marker, startTime) {            
    var ellapsedTime = (new Date()).getTime() - startTime;
    var durationRatio = ellapsedTime / options.duration; // 0 - 1
    var easingDurationRatio = durationRatio;

    // use jQuery easing if it's not linear
    if (options.easing !== 'linear') {
      easingDurationRatio = jQuery.easing[options.easing](durationRatio, ellapsedTime, 0, 1, options.duration);
    }
    
    if (durationRatio < 1) {
      var deltaPosition = new google.maps.LatLng( marker.AT_startPosition_lat + (newPosition_lat - marker.AT_startPosition_lat)*easingDurationRatio,
                                                  marker.AT_startPosition_lng + (newPosition_lng - marker.AT_startPosition_lng)*easingDurationRatio);
      marker.setPosition(deltaPosition);

      // use requestAnimationFrame if it exists on this browser. If not, use setTimeout with ~60 fps
      if (window.requestAnimationFrame) {
        marker.AT_animationHandler = window.requestAnimationFrame(function() {animateStep(marker, startTime)});                
      } else {
        marker.AT_animationHandler = setTimeout(function() {animateStep(marker, startTime)}, 17); 
      }

    } else {
      
      marker.setPosition(newPosition);

      if (typeof options.complete === 'function') {
        options.complete();
      }

    }            
  }

  // stop possibly running animation
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(this.AT_animationHandler);
  } else {
    clearTimeout(this.AT_animationHandler); 
  }
  
  animateStep(this, (new Date()).getTime());
}
