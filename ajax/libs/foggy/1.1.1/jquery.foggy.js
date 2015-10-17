// Foggy, v1.1.1
//
// Description: jQuery plugin for blurring page elements
// Homepage:    http://nbartlomiej.github.com/foggy
// Author:      nbartlomiej@gmail.com

(function( $ ){

  $.fn.foggy = function( options ) {
    var defaultOptions = {
      opacity:      0.8,
      blurRadius:   2,
      quality:      16,
      cssFilterSupport: true
    };

    var noBlurOptions = {
      opacity: 1,
      blurRadius: 0
    };

    var settings;
    if (options == false) {
       settings = $.extend( defaultOptions, noBlurOptions );
    } else {
       settings = $.extend( defaultOptions, options);
    }


    var BlurPass = function(content, position, offset, opacity){
      this.content = content;
      this.position = position;
      this.offset = offset;
      this.opacity = opacity;
    };

    BlurPass.prototype.render = function(target){
      $('<div/>', {
        html: this.content, 'class': 'foggy-pass-'+this.position
      }).css({
        position: this.position,
        opacity: this.opacity,
        top: this.offset[0],
        left: this.offset[1]
      }).appendTo(target);
    };

    var Circle = function(radius){
      this.radius = radius;
    };

    Circle.prototype.includes = function(x,y){
      if (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(this.radius, 2)){
        return true;
      } else {
        return false;
      }
    };

    Circle.prototype.points = function(){
      var results = [];
      for (var x = -this.radius; x<=this.radius; x++){
        for (var y = -this.radius; y<=this.radius; y++){
          if (this.includes(x,y)){
            results.push([x,y]);
          }
        }
      }
      return results;
    };

    var ManualFog = function(element, settings){
      this.element = element;
      this.settings = settings;
    };

    ManualFog.prototype.calculateOffsets = function(radius, quality){
      var all_offsets = $.grep(
        new Circle(radius).points(),
        function(element){ return (element[0] != 0) || (element[1] != 0) }
      );
      var offsets;
      if (all_offsets.length <= quality){
        offsets = all_offsets;
      } else {
        var overhead = all_offsets.length - quality;
        var targets = [];
        for (var i = 0; i < overhead; i++){
          targets.push(Math.round(i * (all_offsets.length / overhead)));
        }
        offsets = $.grep( all_offsets, function(element, index){
          if ($.inArray(index, targets) >= 0){
            return false;
          } else {
            return true;
          }
        });
      }
      return offsets;
    };

    ManualFog.prototype.getContent = function(){
      var candidate = $(this.element).find('.foggy-pass-relative')[0];
      if (candidate){
        return $(candidate).html();
      } else {
        return $(this.element).html();
      }
    };

    ManualFog.prototype.render = function(){
      var content = this.getContent();
      $(this.element).empty();
      var wrapper = $('<div/>').css({ position: 'relative' });
      var offsets = this.calculateOffsets(
        this.settings.blurRadius*2, this.settings.quality
      );
      var opacity = (this.settings.opacity * 1.2) / (offsets.length + 1);
      new BlurPass(content, 'relative', [0,0], opacity).render(wrapper);
      $(offsets).each(function(index, offset){
        new BlurPass(content, 'absolute', offset, opacity).render(wrapper);
      });
      wrapper.appendTo(this.element);
    };

    var FilterFog = function(element, settings){
      this.element = element;
      this.settings = settings;
    }

    FilterFog.prototype.render = function(){
      var opacityPercent = (''+settings.opacity).slice(2,4);
      var filterBlurRadius = this.settings.blurRadius;
      $(this.element).css({
        '-webkit-filter': 'blur('+filterBlurRadius+'px)',
        opacity: settings.opacity
      });
    }

    return this.each(function(index, element) {
      if (settings.cssFilterSupport && '-webkit-filter' in document.body.style){
        new FilterFog(element, settings).render();
      } else {
        new ManualFog(element, settings).render();
      }
    });
  };

})( jQuery );
