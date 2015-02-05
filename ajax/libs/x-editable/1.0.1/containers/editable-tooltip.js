/**
* Editable jQuery UI Tooltip 
* ---------------------
* requires jquery ui 1.9.x 
*/
(function ($) {
    
    //extend methods
    $.extend($.fn.editableContainer.Constructor.prototype, {
        containerName: 'tooltip',
        innerCss: '.ui-tooltip-content', 
        
        //split options on containerOptions and formOptions
        splitOptions: function() {
            this.containerOptions = {};
            this.formOptions = {};
            //defaults for tooltip
            var cDef = $.ui[this.containerName].prototype.options;
            for(var k in this.options) {
              if(k in cDef) {
                 this.containerOptions[k] = this.options[k];
              } else {
                 this.formOptions[k] = this.options[k];
              } 
            }
        },        
        
        initContainer: function(){
            this.handlePlacement();
            $.extend(this.containerOptions, {
                items: '*',
                content: ' ',
                track:  false,
                open: $.proxy(function() {
                        //disable events hiding tooltip by default
                        this.container()._on(this.container().element, {
                            mouseleave: function(e){ e.stopImmediatePropagation(); },
                            focusout: function(e){ e.stopImmediatePropagation(); }
                        });  
                    }, this)
            });
            
            this.call(this.containerOptions);
            
            //disable standart triggering tooltip event 
            this.container()._off(this.container().element, 'mouseover focusin');
        },         
        
        tip: function() {
            return this.container()._find(this.container().element);
        },
        
        show: function() {
            this.call('open');
            this.tip().addClass('editable-container');
            
            this.initForm(); 
            this.tip().find(this.innerCss)
                .empty()
                .append($('<label>').text(this.options.title || this.$element.data( "ui-tooltip-title") || this.$element.data( "originalTitle")))
                .append(this.$form);      
            this.$form.editableform('render');             
        },  
        
        hide: function() {
            if(!this.tip() || !this.tip().is(':visible')) {
                return;
            }            
            this.call('close'); 
            this.$element.triggerHandler('hidden');     
        },
        
        setPosition: function() {
            this.tip().position( $.extend({
                of: this.$element
            }, this.containerOptions.position ) );     
        },
        
        handlePlacement: function() {
           var pos; 
           switch(this.options.placement) {
               case 'top':
                      pos = {
                          my: "center bottom-5", 
                          at: "center top" 
                      };
               break;
               case 'right':
                      pos = {
                          my: "left+5 center", 
                          at: "right center" 
                      };
               break;
               case 'bottom':
                      pos = {
                          my: "center top+5", 
                          at: "center bottom" 
                      };
               break;
               case 'left':
                      pos = {
                          my: "right-5 center", 
                          at: "left center" 
                      };
               break;                                             
           }
           
           this.containerOptions.position = pos;
        },
        
        destroy: function() {
           //jqueryui tooltip destroys itself
        }                 
    });
    
    //defaults
    /*
    $.fn.editableContainer.defaults = $.extend({}, $.fn.tooltip.defaults, $.fn.editableContainer.defaults, {
        items: '*',
        content: ' ',
    });
    */
    
}(window.jQuery));