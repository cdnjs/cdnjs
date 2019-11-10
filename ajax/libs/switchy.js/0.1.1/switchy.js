!function ($) {

  "use strict"; // jshint ;_;


 /* SWITCHY CLASS DEFINITION
  * ====================== */

  var Switchy = function (element, options) {
    this.options = options;
    this.$element = $(element);
    this.$container = $("<div class='switchy-container'></div>");
    this.$bar = $("<div class='switchy-bar'></div>");
    this.$slider = $("<div class='switchy-slider' draggable='true'></div>");
    this.$options = $(element).children('option');
    this.numberOfOptions = this.$options.length;
    this.initialOptionIndex = this.$options.filter('[value="'+$(element).val()+'"]').index(); 
    this.init();
  }

  Switchy.prototype = {
    constructor: Switchy,

    lastSliderPosition: null,

    init: function(){
      var that = this;
      // hide original select
      this.$element.css({ position: 'absolute', left: '-9999px' })
      // Prepare the slider for the DOM
      this.$container.append(this.$bar.append(this.$slider));
      // Append the slider to the DOM
      this.$element.after(this.$container);

      this.lastSliderPosition = this.initialOptionIndex;
      var barGrid = this.$bar.innerWidth() / (this.numberOfOptions - 1);

      // Position slider to initial value
      this.$slider.css({
        left: that.sliderPosition(barGrid, this.initialOptionIndex)
      });

      // When original select is updated
      this.$element.on('change', function(e){
        var nextOptionIndex = that.$options.filter('[value="'+that.$element.val()+'"]').index();

        if (that.lastSliderPosition != nextOptionIndex){
          that.moveSliderTo(barGrid, nextOptionIndex, false);
        }
      });

      if (this.$slider.drag != undefined && this.options.draggable == true){
        this.$slider.
          drag('end', function(ev, dd){
            var currentSliderPosition = that.$slider.position().left + (that.$slider.outerWidth(true) / 2),
                currentOptionIndex = Math.round(currentSliderPosition / barGrid);
            
            that.moveSliderTo(barGrid, currentOptionIndex, true);
          }).
          drag(function(ev, dd){
            var limit = {
              left: 0,
              right: that.$bar.innerWidth() - that.$slider.outerWidth(true)
            }
            $(this).css({
              left: Math.min(limit.right, Math.max(limit.left, dd.offsetX))
            });
          }, { relative: true });
      }

      this.$bar.on('click', function(e){
        var currentSliderPosition = that.$slider.position().left,
            currentOptionIndex = Math.ceil(currentSliderPosition / barGrid),
            clickPosition = e.pageX - that.$bar.offset().left,
            nextOptionIndex = Math.round(clickPosition / barGrid);

        if (currentOptionIndex != nextOptionIndex){
          // move slider position
          that.moveSliderTo(barGrid, nextOptionIndex, true);
        }
      });
    },

    sliderPosition: function(barGrid, optionIndex){
      var add = null;

      if (optionIndex == 0){
        add = 0;
      } else if (optionIndex == this.numberOfOptions - 1){
        add = -(this.$slider.outerWidth(true));
      } else {
        add = -(this.$slider.outerWidth(true) / 2);
      }
      return (barGrid * optionIndex) + add;
    },

    moveSliderTo: function(barGrid, nextOptionIndex, triggerChange){
      var leftPosition = this.sliderPosition(barGrid, nextOptionIndex)
      // move slider position
      if (leftPosition != null){
        this.$slider.animate({
          left: leftPosition
        }, "fast");
      }
      // update original select value
      this.$options.removeAttr('selected');
      this.$options.eq(nextOptionIndex).prop('selected', 'selected');
      if (triggerChange == true)
        this.$element.trigger('change');
      this.lastSliderPosition = nextOptionIndex;
    }
  }

  /* SWITCHY PLUGIN DEFINITION
   * ======================= */

  $.fn.switchy = function (option) {
    return this.each(function () {
      var $this = $(this),
        options = $.extend({}, $.fn.switchy.defaults, typeof option == 'object' && option);
      new Switchy(this, options);
    })
  }

  $.fn.switchy.defaults = {
    draggable: true
  }

  $.fn.switchy.Constructor = Switchy
}(window.jQuery);