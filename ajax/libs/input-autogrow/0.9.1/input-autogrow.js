/*
 * input-autogrow - jQuery autogrow plugin for inputs
 * @version v0.9.1
 * @link http://github.com/westonganger/input-autogrow
 * @license GNU GPL
 */

(function($){
  var event = ('oninput' in document.createElement('input')) ? 'input' : 'keydown';

  $.fn.inputAutogrow = function(options){
    if(options && (options === 'destroy' || $(this).data('autogrow-span'))){
      this.each(function() {
        var input = $(this);
        input.off(event + '.autogrow autogrow change');
        var span = input.data("autogrow-span");
        span.remove();
        input.data('autogrow-span','');
      });

      if(options === 'destroy'){
        input.data('original-width','');
        return this;
      }
    }

    if($(this).data('original-width')){
      var minWidth = $(this).data('original-width');
    }else{
      var minWidth = $(this).width();
      $(this).data('original-width', minWidth);
    }

    var opts = $.extend({ maxWidth: $(this).parent().width(), minWidth: minWidth, trailingSpace: 0 }, options);

    this.each(function(){
      var input = $(this);
      var val = ' ';
      var trailingSpace = (options && 'trailingSpace' in options) ? opts.trailingSpace : parseInt(input.css('fontSize'));

      var span = $('<span/>').css({
        position: 'absolute',
        top: -9999,
        left: -9999,
        width: 'auto',
        fontSize: input.css('fontSize'),
        fontFamily: input.css('fontFamily'),
        fontWeight: input.css('fontWeight'),
        letterSpacing: input.css('letterSpacing'),
        textTransform: input.css('textTransform'),
        whiteSpace: 'nowrap',
        ariaHidden: true
      }).appendTo('body');

      var check = function(e){
        if(val === (val = input.val()) && e.type !== 'autogrow'){
          return;
        }

        if(!val){
          val = input.attr('placeholder') || '';
        }

        span.html(val.replace(/&/g, '&amp;').replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));

        var newWidth = span.width() + trailingSpace;
        var mw = typeof(opts.maxWidth) == "function" ? opts.maxWidth() : opts.maxWidth;

        if(newWidth > mw){
          newWidth = mw;
        }else if(newWidth < opts.minWidth){
          newWidth = opts.minWidth;
        }

        if(newWidth != input.width()){
          input.width(newWidth);
        }
      };

      input.data("autogrow-span", span);
      input.off(event + '.autogrow autogrow change').on(event+'.autogrow autogrow change', check);

      check(); //init on page load
    });
    return this;
  }
}(jQuery));
