/**
* Editable Poshytip 
* ---------------------
* requires jquery.poshytip.js
*/
(function ($) {
    
    //extend methods
    $.extend($.fn.editableContainer.Constructor.prototype, {
        containerName: 'poshytip',
        innerCss: 'div.tip-inner',
        
        initContainer: function(){
            this.handlePlacement();
            
            $.extend(this.containerOptions, {
                showOn: 'none',
                content: '',
                alignTo: 'target'
            });            
            
            this.call(this.containerOptions);
            
            var $content = $('<div>')
              .append($('<label>').text(this.options.title || this.$element.data( "title") || this.$element.data( "originalTitle")))
              .append(this.initForm());            
              
            this.call('update', $content);                         
        },        
        
        innerShow: function () {
            this.$form.editableform('render');
            this.call('show');
            this.tip().addClass('editable-container');
            this.$form.data('editableform').input.activate();
        },        
         
        setPosition: function() {
            this.container().refresh(false);
        },
        
        handlePlacement: function() {
           var x, y, ox = 0, oy = 0; 
           switch(this.options.placement) {
               case 'top':
                      x = 'center';
                      y = 'top';
                      oy = 5;
               break;
               case 'right':
                      x = 'right';
                      y = 'center';
                      ox = 10;
               break;
               case 'bottom':
                      x = 'center';
                      y = 'bottom';
                      oy = 5;
               break;
               case 'left':
                      x = 'left';
                      y = 'center';
                      ox = 10;
               break;                                             
           }
           
           $.extend(this.containerOptions, {
               alignX: x,
               offsetX: ox,
               alignY: y,
               offsetY:oy
           });
        }
    });
    
    //defaults
    $.fn.editableContainer.defaults = $.extend({}, $.fn.editableContainer.defaults, {
        className: 'tip-yellowsimple'
    });
    
    
    /**
    * Poshytip fix: disable incorrect table display
    * see https://github.com/vadikom/poshytip/issues/7
    */ 
    /*jshint eqeqeq:false, curly: false*/
    var tips = [],
    reBgImage = /^url\(["']?([^"'\)]*)["']?\);?$/i,
    rePNG = /\.png$/i,
    ie6 = $.browser.msie && $.browser.version == 6;
    
    $.Poshytip.prototype.refresh = function(async) {
        if (this.disabled)
            return;
            
        var currPos;
        if (async) {
            if (!this.$tip.data('active'))
                return;
            // save current position as we will need to animate
            currPos = {left: this.$tip.css('left'), top: this.$tip.css('top')};
        }

        // reset position to avoid text wrapping, etc.
        this.$tip.css({left: 0, top: 0}).appendTo(document.body);

        // save default opacity
        if (this.opacity === undefined)
            this.opacity = this.$tip.css('opacity');

        // check for images - this code is here (i.e. executed each time we show the tip and not on init) due to some browser inconsistencies
        var bgImage = this.$tip.css('background-image').match(reBgImage),
        arrow = this.$arrow.css('background-image').match(reBgImage);

        if (bgImage) {
            var bgImagePNG = rePNG.test(bgImage[1]);
            // fallback to background-color/padding/border in IE6 if a PNG is used
            if (ie6 && bgImagePNG) {
                this.$tip.css('background-image', 'none');
                this.$inner.css({margin: 0, border: 0, padding: 0});
                bgImage = bgImagePNG = false;
            } else {
                this.$tip.prepend('<table class="fallback" border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>')
                .css({border: 0, padding: 0, 'background-image': 'none', 'background-color': 'transparent'})
                .find('.tip-bg-image').css('background-image', 'url("' + bgImage[1] +'")').end()
                .find('td').eq(3).append(this.$inner);
            }
            // disable fade effect in IE due to Alpha filter + translucent PNG issue
            if (bgImagePNG && !$.support.opacity)
                this.opts.fade = false;
        }
        // IE arrow fixes
        if (arrow && !$.support.opacity) {
            // disable arrow in IE6 if using a PNG
            if (ie6 && rePNG.test(arrow[1])) {
                arrow = false;
                this.$arrow.css('background-image', 'none');
            }
            // disable fade effect in IE due to Alpha filter + translucent PNG issue
            this.opts.fade = false;
        }

        var $table = this.$tip.find('table.fallback');
        if (ie6) {
            // fix min/max-width in IE6
            this.$tip[0].style.width = '';
            $table.width('auto').find('td').eq(3).width('auto');
            var tipW = this.$tip.width(),
            minW = parseInt(this.$tip.css('min-width'), 10),
            maxW = parseInt(this.$tip.css('max-width'), 10);
            if (!isNaN(minW) && tipW < minW)
                tipW = minW;
            else if (!isNaN(maxW) && tipW > maxW)
                tipW = maxW;
            this.$tip.add($table).width(tipW).eq(0).find('td').eq(3).width('100%');
        } else if ($table[0]) {
            // fix the table width if we are using a background image
            // IE9, FF4 use float numbers for width/height so use getComputedStyle for them to avoid text wrapping
            // for details look at: http://vadikom.com/dailies/offsetwidth-offsetheight-useless-in-ie9-firefox4/
            $table.width('auto').find('td').eq(3).width('auto').end().end().width(document.defaultView && document.defaultView.getComputedStyle && parseFloat(document.defaultView.getComputedStyle(this.$tip[0], null).width) || this.$tip.width()).find('td').eq(3).width('100%');
        }
        this.tipOuterW = this.$tip.outerWidth();
        this.tipOuterH = this.$tip.outerHeight();

        this.calcPos();

        // position and show the arrow image
        if (arrow && this.pos.arrow) {
            this.$arrow[0].className = 'tip-arrow tip-arrow-' + this.pos.arrow;
            this.$arrow.css('visibility', 'inherit');
        }

        if (async) {
            this.asyncAnimating = true;
            var self = this;
            this.$tip.css(currPos).animate({left: this.pos.l, top: this.pos.t}, 200, function() { self.asyncAnimating = false; });
        } else {
            this.$tip.css({left: this.pos.l, top: this.pos.t});
        }
    };
    /*jshinteqeqeq: true, curly: true*/
}(window.jQuery));