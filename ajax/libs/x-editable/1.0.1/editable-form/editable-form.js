/**
Form with single input element, two buttons and two states: normal/loading.
Applied as jQuery method to DIV tag (not to form tag!)
Editableform is linked with one of input types, e.g. 'text' or 'select'.

@class editableform
@uses text
@uses textarea
**/
(function ($) {
    
    var EditableForm = function (element, options) {
        this.options = $.extend({}, $.fn.editableform.defaults, options);
        this.$element = $(element); //div (usually), containing form. not form tag!
        this.initInput();
    };

    EditableForm.prototype = {
        constructor: EditableForm,
        initInput: function() {
            var TypeConstructor, typeOptions;
            
            //create input of specified type
            if(typeof $.fn.editableform.types[this.options.type] === 'function') {
                TypeConstructor = $.fn.editableform.types[this.options.type];
                typeOptions = $.fn.editableform.utils.sliceObj(this.options, Object.keys(TypeConstructor.defaults));
                this.input = new TypeConstructor(typeOptions);
            } else {
                $.error('Unknown type: '+ this.options.type);
                return; 
            }          

            this.value = this.input.str2value(this.options.value); 
        },
        initTemplate: function() {
            this.$form = $($.fn.editableform.template); 
        },
        /**
        Renders editableform

        @method render
        **/        
        render: function() {
            this.$loading = $($.fn.editableform.loading);        
            this.$element.empty().append(this.$loading);
            this.showLoading();
           
            this.initTemplate(); 
            
            /**        
            Fired when rendering starts
            @event rendering 
            @param {Object} event event object
            **/            
            this.$element.triggerHandler('rendering');
            
            //render input
            $.when(this.input.render())
            .then($.proxy(function () {
                //place input
                this.$form.find('div.control-group').prepend(this.input.$input);
                //attach 'cancel' handler
                this.$form.find('button[type=button]').click($.proxy(this.cancel, this));
                //append form to container
                this.$element.append(this.$form);
                if(this.input.error) {
                    this.error(this.input.error);
                    this.$form.find('button[type=submit]').attr('disabled', true);
                    this.input.$input.attr('disabled', true);
                } else {
                    this.error(false);
                    this.input.$input.removeAttr('disabled');
                    this.$form.find('button[type=submit]').removeAttr('disabled');
                    this.input.value2input(this.value);
                    this.$form.submit($.proxy(this.submit, this));
                }
                
                /**        
                Fired when form is rendered
                @event rendered
                @param {Object} event event object
                **/            
                this.$element.triggerHandler('rendered');                
                
                this.showForm();
            }, this));
        },
        cancel: function() {
            /**        
            Fired when form was cancelled by user
            @event cancel 
            @param {Object} event event object
            **/              
            this.$element.triggerHandler('cancel');
        },
        showLoading: function() {
            var fw, fh, iw, ih;
            //set loading size equal to form
            if(this.$form) {
                fh = this.$form.outerHeight() || 0;
                fw = this.$form.outerWidth() || 0;
                ih = (this.input && this.input.$input.outerHeight()) || 0;
                iw = (this.input && this.input.$input.outerWidth()) || 0;
                if(fh || ih) {
                    this.$loading.height(fh > ih ? fh : ih);
                }
                if(fw || iw) {
                    this.$loading.width(fw > iw ? fw : iw);
                }
                this.$form.hide();
            }
            this.$loading.show(); 
        },

        showForm: function() {
            this.$loading.hide();
            this.$form.show();
            this.input.activate(); 
            /**        
            Fired when form is shown
            @event show 
            @param {Object} event event object
            **/                    
            this.$element.triggerHandler('show');
        },
        
        error: function(msg) {
            var $group = this.$form.find('.control-group'),
                $block = this.$form.find('.editable-error-block');
                
            if(msg === false) {
                $group.removeClass($.fn.editableform.errorGroupClass);
                $block.removeClass($.fn.editableform.errorBlockClass).empty().hide(); 
            } else {
                $group.addClass($.fn.editableform.errorGroupClass);
                $block.addClass($.fn.editableform.errorBlockClass).text(msg).show();
            }
        },
               
        submit: function(e) {
            e.stopPropagation();
            e.preventDefault();

            var error,
                //get value from input
                newValue = this.input.input2value(),
                newValueStr;

            //validation
            if (error = this.validate(newValue)) {
                this.error(error);
                this.showForm();
                return;
            } 
            
            //value as string
            newValueStr = this.input.value2str(newValue);
            
            //if value not changed --> cancel
            /*jslint eqeq: true*/
            if (newValueStr == this.input.value2str(this.value)) {
            /*jslint eqeq: false*/                
                this.cancel();
                return;
            } 

            //sending data to server
            $.when(this.save(newValueStr))
            .done($.proxy(function(response) {
                var error;
                //call success callback. if it returns string --> show error
                if(error = this.options.success.call(this, response, newValue)) {
                    this.error(error);
                    this.showForm();
                    return;
                }                
                
               //clear error message
               this.error(false);   
               this.value = newValue;
               /**        
               Fired when form is submitted
               @event save 
               @param {Object} event event object
               @param {Object} params additional params
                    @param {mixed} params.newValue submitted value
                    @param {Object} params.response ajax response
                    
               @example
                   $('#form-div').on('save'), function(e, params){
                       if(params.newValue === 'username') {...}
                   });                    
               **/                
               this.$element.triggerHandler('save', {newValue: newValue, response: response});
            }, this))
            .fail($.proxy(function(xhr) {
               this.error(typeof xhr === 'string' ? xhr : xhr.responseText || xhr.statusText || 'Unknown error!'); 
               this.showForm();  
            }, this));
        },

        save: function(value) {
            var pk = (typeof this.options.pk === 'function') ? this.options.pk.call(this) : this.options.pk,
                send = !!(typeof this.options.url === 'function' || (this.options.url && ((this.options.send === 'always') || (this.options.send === 'auto' && pk)))),
                params;
                
            if (send) { //send to server
                this.showLoading();

                //standard params
                params = {
                    name: this.options.name || '',
                    value: value,
                    pk: pk 
                };
                
                //additional params
                if(typeof this.options.params === 'function') {
                    $.extend(params, this.options.params.call(this, params));  
                } else {
                    //try parse json in single quotes (from data-params attribute)
                    this.options.params = $.fn.editableform.utils.tryParseJson(this.options.params, true);   
                    $.extend(params, this.options.params);
                }

                if(typeof this.options.url === 'function') { //user's function
                    return this.options.url.call(this, params);
                } else {  //send ajax to server and return deferred object
                    return $.ajax({
                        url     : this.options.url,
                        data    : params,
                        type    : 'post',
                        dataType: 'json'
                    });
                }
            }
        }, 
        
        validate: function (value) {
            if (value === undefined) {
                value = this.value;
            }
            if (typeof this.options.validate === 'function') {
                return this.options.validate.call(this, value);
            }
        },
        
       option: function(key, value) {
          this.options[key] = value;
       }        
    };

    /*
    Initialize editableform. Applied to jQuery object.
    
    @method $().editableform(options)
    @params {Object} options
    @example
        var $form = $('&lt;div&gt;').editableform({
            type: 'text',
            name: 'username',
            url: '/post',
            value: 'vitaliy'
        });
        
        //to display form you should call 'render' method
        $form.editableform('render');     
    */
    $.fn.editableform = function (option) {
        var args = arguments;
        return this.each(function () {
            var $this = $(this), 
            data = $this.data('editableform'), 
            options = typeof option === 'object' && option; 
            if (!data) {
                $this.data('editableform', (data = new EditableForm(this, options)));
            }
            
            if (typeof option === 'string') { //call method 
                data[option].apply(data, Array.prototype.slice.call(args, 1));
            } 
        });
    };
    
    //keep link to constructor to allow inheritance
    $.fn.editableform.Constructor = EditableForm;    

    //defaults
    $.fn.editableform.defaults = {
        /* see also defaults for input */
        
        /**
        Type of input. Can be <code>text|textarea|select|date</code>

        @property type 
        @type string
        @default 'text'
        **/
        type: 'text',
        /**
        Url for submit, e.g. <code>'/post'</code>  
        If function - it will be called instead of ajax. Function can return deferred object to run fail/done callbacks.

        @property url 
        @type string|function
        @default null
        @example
        url: function(params) {
           if(params.value === 'abc') {
               var d = new $.Deferred;
               return d.reject('field cannot be "abc"'); //returning error via deferred object
           } else {
               someModel.set(params.name, params.value); //save data in some js model
           }
        }        
        **/        
        url:null,
        /**
        Additional params for submit. Function can be used to calculate params dynamically
        @example
        params: function() {
           return { a: 1 };
        }

        @property params 
        @type object|function
        @default null
        **/          
        params:null,
        /**
        Name of field. Will be submitted on server. Can be taken from <code>id</code> attribute

        @property name 
        @type string
        @default null
        **/         
        name: null,
        /**
        Primary key of editable object (e.g. record id in database). For composite keys use object, e.g. <code>{id: 1, lang: 'en'}</code>.
        Can be calculated dinamically via function.

        @property pk 
        @type string|object|function
        @default null
        **/         
        pk: null,
        /**
        Initial value. If not defined - will be taken from element's content.
        For __select__ type should be defined (as it is ID of shown text).

        @property value 
        @type string|object
        @default null
        **/        
        value: null,
        /**
        Strategy for sending data on server. Can be <code>auto|always|never</code>.
        When 'auto' data will be sent on server only if pk defined, otherwise new value will be stored in element.

        @property send 
        @type string
        @default 'auto'
        **/          
        send: 'auto', 
        /**
        Function for client-side validation. If returns string - means validation not passed and string showed as error.

        @property validate 
        @type function
        @default null
        @example
        validate: function(value) {
            if($.trim(value) == '') {
                return 'This field is required';
            }
        }
        **/         
        validate: null,
        /**
        Success callback. Called when value successfully sent on server and response status = 200.
        Can be used to process json response. If this function returns string - means error occured and string is shown as error message.
        
        @property success 
        @type function
        @default null
        @example
        success: function(response, newValue) {
            if(!response.success) return response.msg;
        }
        **/          
        success: function(response, newValue) {}         
    };   

    /*
      Note: following params could redefined in engine: bootstrap or jqueryui:
      Classes 'control-group' and 'editable-error-block' must always present!
    */      
      $.fn.editableform.template = '<form class="form-inline editableform"><div class="control-group">' + 
    '&nbsp;<button type="submit">Ok</button>&nbsp;<button type="button">Cancel</button></div>' + 
    '<div class="editable-error-block"></div>' + 
    '</form>';
      
      //loading div
      $.fn.editableform.loading = '<div class="editableform-loading"></div>';
      
      //error class attahced to control-group
      $.fn.editableform.errorGroupClass = null;  
      
      //error class attahced to editable-error-block
      $.fn.editableform.errorBlockClass = 'editable-error';

      //input types
      $.fn.editableform.types = {};
      //utils
      $.fn.editableform.utils = {};

}(window.jQuery));