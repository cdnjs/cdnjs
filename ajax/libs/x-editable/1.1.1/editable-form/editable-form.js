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
        this.$element = $(element); //div, containing form. Not form tag! Not editable-element.
        this.initInput();
    };

    EditableForm.prototype = {
        constructor: EditableForm,
        initInput: function() {  //called once
            var TypeConstructor, typeOptions;

            //create input of specified type
            if(typeof $.fn.editableform.types[this.options.type] === 'function') {
                TypeConstructor = $.fn.editableform.types[this.options.type];
                typeOptions = $.fn.editableform.utils.sliceObj(this.options, $.fn.editableform.utils.objectKeys(TypeConstructor.defaults));
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
        initButtons: function() {
            this.$form.find('.editable-buttons').append($.fn.editableform.buttons);
        },
        /**
        Renders editableform

        @method render
        **/        
        render: function() {
            this.$loading = $($.fn.editableform.loading);        
            this.$element.empty().append(this.$loading);
            this.showLoading();
            
            //init form template and buttons
            this.initTemplate(); 
            if(this.options.showbuttons) {
                this.initButtons();
            } else {
                this.$form.find('.editable-buttons').remove();
            }

            /**        
            Fired when rendering starts
            @event rendering 
            @param {Object} event event object
            **/            
            this.$element.triggerHandler('rendering');

            //render input
            $.when(this.input.render())
            .then($.proxy(function () {
                //input
                this.$form.find('div.editable-input').append(this.input.$input);

                //automatically submit inputs when no buttons shown
                if(!this.options.showbuttons) {
                    this.input.autosubmit(); 
                }
                
                //"clear" link
                if(this.input.$clear) {
                    this.$form.find('div.editable-input').append($('<div class="editable-clear">').append(this.input.$clear));  
                }                

                //append form to container
                this.$element.append(this.$form);

                //attach 'cancel' handler
                this.$form.find('.editable-cancel').click($.proxy(this.cancel, this));
                //                this.$form.find('.editable-buttons button').eq(1).click($.proxy(this.cancel, this));

                if(this.input.error) {
                    this.error(this.input.error);
                    this.$form.find('.editable-submit').attr('disabled', true);
                    this.input.$input.attr('disabled', true);
                } else {
                    this.error(false);
                    this.input.$input.removeAttr('disabled');
                    this.$form.find('.editable-submit').removeAttr('disabled');
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
            var w;
            if(this.$form) {
                //set loading size equal to form 
                this.$loading.width(this.$form.outerWidth());
                this.$loading.height(this.$form.outerHeight());
                this.$form.hide();
            } else {
                //stretch loading to fill container width
                w = this.$loading.parent().width();
                if(w) {
                    this.$loading.width(w);
                }
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
                newValue = this.input.input2value(), //get new value from input
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
                //run success callback
                var res = typeof this.options.success === 'function' ? this.options.success.call(this, response, newValue) : null;
                
                //if success callback returns string --> show error
                if(res && typeof res === 'string') {
                    this.error(res);
                    this.showForm();
                    return;
                }     
                
                //if success callback returns object like {newValue: <something>} --> use that value instead of submitted
                if(res && typeof res === 'object' && res.hasOwnProperty('newValue')) {
                    newValue = res.newValue;
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
            params, ajaxOptions;

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
                    ajaxOptions = $.extend({
                        url     : this.options.url,
                        data    : params,
                        type    : 'post',
                        dataType: 'json'
                    }, this.options.ajaxOptions);

                    return $.ajax(ajaxOptions);
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
            if(key === 'value') {
                this.setValue(value);
            }
        },

        setValue: function(value, convertStr) {
            if(convertStr) {
                this.value = this.input.str2value(value);
            } else {
                this.value = value;
            }
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
        Type of input. Can be <code>text|textarea|select|date|checklist</code>

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
        params: function(params) {
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
        Success callback. Called when value successfully sent on server and **response status = 200**.  
        Usefull to work with json response. For example, if your backend response can be <code>{success: true}</code>
        or <code>{success: false, msg: "server error"}</code> you can check it inside this callback.  
        If it returns **string** - means error occured and string is shown as error message.  
        If it returns **object like** <code>{newValue: &lt;something&gt;}</code> - it overwrites value, submitted by user.  
        Otherwise newValue simply rendered into element.
        
        @property success 
        @type function
        @default null
        @example
        success: function(response, newValue) {
            if(!response.success) return response.msg;
        }
        **/          
        success: function(response, newValue) {},
        /**
        Additional options for ajax request.
        List of values: http://api.jquery.com/jQuery.ajax

        @property ajaxOptions 
        @type object
        @default null
        **/        
        ajaxOptions: null,
        /**
        Wether to show buttons or not.  
        Form without buttons can be auto-submitted by input or by onblur = 'submit'.

        @property showbuttons 
        @type boolean
        @default true
        **/         
        showbuttons: true
        
        /*todo: 
        Submit strategy. Can be <code>normal|never</code>
        <code>submitmode='never'</code> usefull for turning into classic form several inputs and submitting them together manually.
        Works pretty with <code>showbuttons=false</code>

        @property submitmode 
        @type string
        @default normal
        */         
//        submitmode: 'normal' 
    };   

    /*
    Note: following params could redefined in engine: bootstrap or jqueryui:
    Classes 'control-group' and 'editable-error-block' must always present!
    */      
    $.fn.editableform.template = '<form class="form-inline editableform">'+
    '<div class="control-group">' + 
    '<div><div class="editable-input"></div><div class="editable-buttons"></div></div>'+
    '<div class="editable-error-block"></div>' + 
    '</div>' + 
    '</form>';

    //loading div
    $.fn.editableform.loading = '<div class="editableform-loading"></div>';

    //buttons
    $.fn.editableform.buttons = '<button type="submit" class="editable-submit">ok</button>'+
    '<button type="button" class="editable-cancel">cancel</button>';      

    //error class attahced to control-group
    $.fn.editableform.errorGroupClass = null;  

    //error class attahced to editable-error-block
    $.fn.editableform.errorBlockClass = 'editable-error';

    //input types
    $.fn.editableform.types = {};
    //utils
    $.fn.editableform.utils = {};

}(window.jQuery));