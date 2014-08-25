/**
Attaches stand-alone container with editable-form to HTML element. Element is used only for positioning, value is not stored anywhere.<br>
This method applied internally in <code>$().editable()</code>. You should subscribe on it's events (save / cancel) to get profit of it.<br>
Final realization can be different: bootstrap-popover, jqueryui-tooltip, poshytip, inline-div. It depends on which js file you include.<br>
Applied as jQuery method.

@class editableContainer
@uses editableform
**/
(function ($) {

    var EditableContainer = function (element, options) {
        this.init(element, options);
    };

    //methods
    EditableContainer.prototype = {
        containerName: null, //tbd in child class
        innerCss: null, //tbd in child class
        init: function(element, options) {
            this.$element = $(element);
            //todo: what is in priority: data or js?
            this.options = $.extend({}, $.fn.editableContainer.defaults, $.fn.editableutils.getConfigData(this.$element), options);         
            this.splitOptions();
            this.initContainer();

            //bind 'destroyed' listener to destroy container when element is removed from dom
            this.$element.on('destroyed', $.proxy(function(){
                this.destroy();
            }, this)); 
            
            //attach document handlers (once)
            if(!$(document).data('editable-handlers-attached')) {
                //close all on escape
                $(document).on('keyup.editable', function (e) {
                    if (e.which === 27) {
                        $('.editable-open').editableContainer('hide');
                        //todo: return focus on element 
                    }
                });

                //close containers when click outside
                $(document).on('click.editable', function(e) {
                    var $target = $(e.target);
                    
                    //if click inside some editableContainer --> no nothing  
                    if($target.is('.editable-container') || $target.parents('.editable-container').length || $target.parents('.ui-datepicker-header').length) {                
                        return;
                    } else {
                        //close all open containers (except one)
                        EditableContainer.prototype.closeOthers(e.target);
                    }
                });
                
                $(document).data('editable-handlers-attached', true);
            }                        
        },

        //split options on containerOptions and formOptions
        splitOptions: function() {
            this.containerOptions = {};
            this.formOptions = {};
            var cDef = $.fn[this.containerName].defaults;
            for(var k in this.options) {
              if(k in cDef) {
                 this.containerOptions[k] = this.options[k];
              } else {
                 this.formOptions[k] = this.options[k];
              } 
            }
        },
        
        initContainer: function(){
            this.call(this.containerOptions);
        },

        initForm: function() {
            this.formOptions.scope = this.$element[0]; //set scope of form callbacks to element
            this.$form = $('<div>')
            .editableform(this.formOptions)
            .on({
                save: $.proxy(this.save, this),
                cancel: $.proxy(function(){ this.hide('cancel'); }, this),
                nochange: $.proxy(function(){ this.hide('nochange'); }, this),
                show: $.proxy(this.setPosition, this), //re-position container every time form is shown (occurs each time after loading state)
                rendering: $.proxy(this.setPosition, this), //this allows to place container correctly when loading shown
                rendered: $.proxy(function(){
                    /**        
                    Fired when container is shown and form is rendered (for select will wait for loading dropdown options)
                    
                    @event shown 
                    @param {Object} event event object
                    @example
                    $('#username').on('shown', function() {
                         var $tip = $(this).data('editableContainer').tip();
                         $tip.find('input').val('overwriting value of input..');
                    });                     
                    **/                      
                    this.$element.triggerHandler('shown');
                }, this) 
            });
            return this.$form;
        },        

        /*
        Returns jquery object of container
        @method tip()
        */         
        tip: function() {
            return this.container().$tip;
        },

        container: function() {
            return this.$element.data(this.containerName); 
        },

        call: function() {
            this.$element[this.containerName].apply(this.$element, arguments); 
        },

        /**
        Shows container with form
        @method show()
        @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
        **/          
        show: function (closeAll) {
            this.$element.addClass('editable-open');
            if(closeAll !== false) {
                //close all open containers (except this)
                this.closeOthers(this.$element[0]);  
            }
            
            this.innerShow();
        },
        
        /* internal show method. To be overwritten in child classes */
        innerShow: function () {
            this.call('show');                
            this.tip().addClass('editable-container');
            this.initForm();
            this.tip().find(this.innerCss).empty().append(this.$form);     
            this.$form.editableform('render');            
        },

        /**
        Hides container with form
        @method hide()
        @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|undefined (=manual)</code>
        **/         
        hide: function(reason) {  
            if(!this.tip() || !this.tip().is(':visible') || !this.$element.hasClass('editable-open')) {
                return;
            }
            this.$element.removeClass('editable-open');   
            this.innerHide();
            /**        
            Fired when container was hidden. It occurs on both save or cancel.

            @event hidden 
            @param {object} event event object
            @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|undefined (=manual)</code>
            @example
            $('#username').on('hidden', function(e, reason) {
                if(reason === 'save' || reason === 'cancel') {
                    //auto-open next editable
                    $(this).closest('tr').next().find('.editable').editable('show');
                } 
            });            
            **/             
            this.$element.triggerHandler('hidden', reason);   
        },
        
        /* internal hide method. To be overwritten in child classes */
        innerHide: function () {
            this.call('hide');       
        },        
        
        /**
        Toggles container visibility (show / hide)
        @method toggle()
        @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
        **/          
        toggle: function(closeAll) {
            if(this.tip && this.tip().is(':visible')) {
                this.hide();
            } else {
                this.show(closeAll);
            } 
        },

        /*
        Updates the position of container when content changed.
        @method setPosition()
        */       
        setPosition: function() {
            //tbd in child class
        },

        save: function(e, params) {
            this.hide('save');
            /**        
            Fired when new value was submitted. You can use <code>$(this).data('editableContainer')</code> inside handler to access to editableContainer instance
            
            @event save 
            @param {Object} event event object
            @param {Object} params additional params
            @param {mixed} params.newValue submitted value
            @param {Object} params.response ajax response
            @example
            $('#username').on('save', function(e, params) {
                //assuming server response: '{success: true}'
                var pk = $(this).data('editableContainer').options.pk;
                if(params.response && params.response.success) {
                    alert('value: ' + params.newValue + ' with pk: ' + pk + ' saved!');
                } else {
                    alert('error!'); 
                } 
            });
            **/             
            this.$element.triggerHandler('save', params);
        },

        /**
        Sets new option
        
        @method option(key, value)
        @param {string} key 
        @param {mixed} value 
        **/         
        option: function(key, value) {
            this.options[key] = value;
            if(key in this.containerOptions) {
                this.containerOptions[key] = value;
                this.setContainerOption(key, value); 
            } else {
                this.formOptions[key] = value;
                if(this.$form) {
                    this.$form.editableform('option', key, value);  
                }
            }
        },
        
        setContainerOption: function(key, value) {
            this.call('option', key, value);
        },

        /**
        Destroys the container instance
        @method destroy()
        **/        
        destroy: function() {
            this.call('destroy');
        },
        
        /*
        Closes other containers except one related to passed element. 
        Other containers can be cancelled or submitted (depends on onblur option)
        */
        closeOthers: function(element) {
            $('.editable-open').each(function(i, el){
                //do nothing with passed element and it's children
                if(el === element || $(el).find(element).length) {
                    return;
                }

                //otherwise cancel or submit all open containers 
                var $el = $(el),
                ec = $el.data('editableContainer');

                if(!ec) {
                    return;  
                }
                
                if(ec.options.onblur === 'cancel') {
                    $el.data('editableContainer').hide('onblur');
                } else if(ec.options.onblur === 'submit') {
                    $el.data('editableContainer').tip().find('form').submit();
                }
            });

        },
        
        /**
        Activates input of visible container (e.g. set focus)
        @method activate()
        **/         
        activate: function() {
            if(this.tip && this.tip().is(':visible') && this.$form) {
               this.$form.data('editableform').input.activate(); 
            }
        } 

    };

    /**
    jQuery method to initialize editableContainer.
    
    @method $().editableContainer(options)
    @params {Object} options
    @example
    $('#edit').editableContainer({
        type: 'text',
        url: '/post',
        pk: 1,
        value: 'hello'
    });
    **/  
    $.fn.editableContainer = function (option) {
        var args = arguments;
        return this.each(function () {
            var $this = $(this),
            dataKey = 'editableContainer', 
            data = $this.data(dataKey), 
            options = typeof option === 'object' && option;

            if (!data) {
                $this.data(dataKey, (data = new EditableContainer(this, options)));
            }

            if (typeof option === 'string') { //call method 
                data[option].apply(data, Array.prototype.slice.call(args, 1));
            }            
        });
    };     

    //store constructor
    $.fn.editableContainer.Constructor = EditableContainer;

    //defaults
    $.fn.editableContainer.defaults = {
        /**
        Initial value of form input

        @property value 
        @type mixed
        @default null
        @private
        **/        
        value: null,
        /**
        Placement of container relative to element. Can be <code>top|right|bottom|left</code>. Not used for inline container.

        @property placement 
        @type string
        @default 'top'
        **/        
        placement: 'top',
        /**
        Whether to hide container on save/cancel.

        @property autohide 
        @type boolean
        @default true
        @private 
        **/        
        autohide: true,
        /**
        Action when user clicks outside the container. Can be <code>cancel|submit|ignore</code>.  
        Setting <code>ignore</code> allows to have several containers open. 

        @property onblur 
        @type string
        @default 'cancel'
        @since 1.1.1
        **/        
        onblur: 'cancel'
    };

    /* 
    * workaround to have 'destroyed' event to destroy popover when element is destroyed
    * see http://stackoverflow.com/questions/2200494/jquery-trigger-event-when-an-element-is-removed-from-the-dom
    */
    jQuery.event.special.destroyed = {
        remove: function(o) {
            if (o.handler) {
                o.handler();
            }
        }
    };    

}(window.jQuery));
