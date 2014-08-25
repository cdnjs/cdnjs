/**
* Editable Popover 
* ---------------------
* requires bootstrap-popover.js
*/
(function ($) {

    //extend methods
    $.extend($.fn.editableContainer.Constructor.prototype, {
        containerName: 'popover',
        innerCss: '.popover-content p',

        initContainer: function(){
            $.extend(this.containerOptions, {
                trigger: 'manual',
                selector: false,
                content: 'dfgh'
            });
            this.call(this.containerOptions);
        },        
        
        setContainerOption: function(key, value) {
            this.container().options[key] = value; 
        },               

        /**
        * move popover to new position. This function mainly copied from bootstrap-popover.
        */
        /*jshint laxcomma: true*/
        setPosition: function () { 
         
            (function() {    
                var $tip = this.tip()
                , inside
                , pos
                , actualWidth
                , actualHeight
                , placement
                , tp;

                placement = typeof this.options.placement === 'function' ?
                this.options.placement.call(this, $tip[0], this.$element[0]) :
                this.options.placement;

                inside = /in/.test(placement);
               
                $tip
              //  .detach()
              //vitalets: remove any placement class because otherwise they dont influence on re-positioning of visible popover
                .removeClass('top right bottom left')
                .css({ top: 0, left: 0, display: 'block' });
              //  .insertAfter(this.$element);
               
                pos = this.getPosition(inside);

                actualWidth = $tip[0].offsetWidth;
                actualHeight = $tip[0].offsetHeight;

                switch (inside ? placement.split(' ')[1] : placement) {
                    case 'bottom':
                        tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'top':
                        tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'left':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
                        break;
                    case 'right':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width};
                        break;
                }

                $tip
                .offset(tp)
                .addClass(placement)
                .addClass('in');
                
            }).call(this.container());
          /*jshint laxcomma: false*/  
        }            
    });

    //defaults
    /*
    $.fn.editableContainer.defaults = $.extend({}, $.fn.popover.defaults, $.fn.editableContainer.defaults, {
        
    });
    */    

}(window.jQuery));