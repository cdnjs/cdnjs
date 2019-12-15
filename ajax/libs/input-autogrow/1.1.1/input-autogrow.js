(function($){
  var events = (('oninput' in document.createElement('input')) ? 'input' : 'keydown') + '.autogrow change.autogrow autogrow';

  var isObject = function(x){
    return x === Object(x);
  };

  $.fn.inputAutogrow = function(options){
    if(options === 'destroy'){
      this.each(function() {
        if($(this).data('autogrow-span')){
          var input = $(this);

          input.off(events);

          var span = input.data("autogrow-span");
          span.remove();
          input.data('autogrow-span','');

          input.data('original-width','');
        }
      });

      return this;
    }

    this.each(function(){
      var input = $(this);

      if(input.data('original-width')){
        var minWidth = input.data('original-width');
      }else{
        var minWidth = input.width();
        input.data('original-width', minWidth);
      }

      var opts = { maxWidth: input.parent().width(), minWidth: minWidth, trailingSpace: 0 };

      if(options && isObject(options)){
        opts = $.extend(opts, options);
      }

      var val = null;

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

        if(val == null){
          val = input.attr('placeholder') || '';
        }

        span.html(val.replace(/&/g, '&amp;').replace(/\s/g, '&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));

        var newWidth = span.width() + parseInt(input.css('fontSize')) + opts.trailingSpace;
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
      input.off(events).on(events, check);

      check(); //init on page load
    });

    return this;
  };
}(window.jQuery || window.Zepto || window.$));
