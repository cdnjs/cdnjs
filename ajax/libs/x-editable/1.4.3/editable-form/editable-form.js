/**
Form with single input element, two buttons and two states: normal/loading.
Applied as jQuery method to DIV tag (not to form tag!). This is because form can be in loading state when spinner shown.
Editableform is linked with one of input types, e.g. 'text', 'select' etc.

@class editableform
@uses text
@uses textarea
**/
(function ($) {

    var EditableForm = function (div, options) {
        this.options = $.extend({}, $.fn.editableform.defaults, options);
        this.$div = $(div); //div, containing form. Not form tag. Not editable-element.
        if(!this.options.scope) {
            this.options.scope = this;
        }
        //nothing shown after init
    };

    EditableForm.prototype = {
        constructor: EditableForm,
        initInput: function() {  //called once
            //take input from options (as it is created in editable-element)
            this.input = this.options.input;
            
            //set initial value
            //todo: may be add check: typeof str === 'string' ? 
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
            //init loader
            this.$loading = $($.fn.editableform.loading);        
            this.$div.empty().append(this.$loading);
            
            //init form template and buttons
            this.initTemplate();
            if(this.options.showbuttons) {
                this.initButtons();
            } else {
                this.$form.find('.editable-buttons').remove();
            }

            //show loading state
            this.showLoading();            
            
            /**        
            Fired when rendering starts
            @event rendering 
            @param {Object} event event object
            **/            
            this.$div.triggerHandler('rendering');
            
            //init input
            this.initInput();
            
            //append input to form
            this.input.prerender();
            this.$form.find('div.editable-input').append(this.input.$tpl);            

            //append form to container
            this.$div.append(this.$form);
            
            //render input
            $.when(this.input.render())
            .then($.proxy(function () {
                //setup input to submit automatically when no buttons shown
                if(!this.options.showbuttons) {
                    this.input.autosubmit(); 
                }
                 
                //attach 'cancel' handler
                this.$form.find('.editable-cancel').click($.proxy(this.cancel, this));
                
                if(this.input.error) {
                    this.error(this.input.error);
                    this.$form.find('.editable-submit').attr('disabled', true);
                    this.input.$input.attr('disabled', true);
                    //prevent form from submitting
                    this.$form.submit(function(e){ e.preventDefault(); });
                } else {
                    this.error(false);
                    this.input.$input.removeAttr('disabled');
                    this.$form.find('.editable-submit').removeAttr('disabled');
                    this.input.value2input(this.value);
                    //attach submit handler
                    this.$form.submit($.proxy(this.submit, this));
                }

                /**        
                Fired when form is rendered
                @event rendered
                @param {Object} event event object
                **/            
                this.$div.triggerHandler('rendered');                

                this.showForm();
                
                //call postrender method to perform actions required visibility of form
                if(this.input.postrender) {
                    this.input.postrender();
                }                
            }, this));
        },
        cancel: function() {   
            /**        
            Fired when form was cancelled by user
            @event cancel 
            @param {Object} event event object
            **/              
            this.$div.triggerHandler('cancel');
        },
        showLoading: function() {
            var w, h;
            if(this.$form) {
                //set loading size equal to form
                w = this.$form.outerWidth();
                h = this.$form.outerHeight(); 
                if(w) {
                    this.$loading.width(w);
                }
                if(h) {
                    this.$loading.height(h);
                }
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

        showForm: function(activate) {
            this.$loading.hide();
            this.$form.show();
            if(activate !== false) {
                this.input.activate(); 
            }
            /**        
            Fired when form is shown
            @event show 
            @param {Object} event event object
            **/                    
            this.$div.triggerHandler('show');
        },

        error: function(msg) {
            var $group = this.$form.find('.control-group'),
                $block = this.$form.find('.editable-error-block'),
                lines;

            if(msg === false) {
                $group.removeClass($.fn.editableform.errorGroupClass);
                $block.removeClass($.fn.editableform.errorBlockClass).empty().hide(); 
            } else {
                //convert newline to <br> for more pretty error display
                if(msg) {
                    lines = msg.split("\n");
                    for (var i = 0; i < lines.length; i++) {
                        lines[i] = $('<div>').text(lines[i]).html();
                    }
                    msg = lines.join('<br>');
                }
                $group.addClass($.fn.editableform.errorGroupClass);
                $block.addClass($.fn.editableform.errorBlockClass).html(msg).show();
            }
        },

        submit: function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            var error,
                newValue = this.input.input2value(); //get new value from input

            //validation
            if (error = this.validate(newValue)) {
                this.error(error);
                this.showForm();
                return;
            } 
            
            //if value not changed --> trigger 'nochange' event and return
            /*jslint eqeq: true*/
            if (!this.options.savenochange && this.input.value2str(newValue) == this.input.value2str(this.value)) {
            /*jslint eqeq: false*/                
                /**        
                Fired when value not changed but form is submitted. Requires savenochange = false.
                @event nochange 
                @param {Object} event event object
                **/                    
                this.$div.triggerHandler('nochange');            
                return;
            } 

            //sending data to server
            $.when(this.save(newValue))
            .done($.proxy(function(response) {
                //run success callback
                var res = typeof this.options.success === 'function' ? this.options.success.call(this.options.scope, response, newValue) : null;
                
                //if success callback returns false --> keep form open and do not activate input
                if(res === false) {
                    this.error(false);
                    this.showForm(false);
                    return;
                }     
                
                //if success callback returns string -->  keep form open, show error and activate input               
                if(typeof res === 'string') {
                    this.error(res);
                    this.showForm();
                    return;
                }     
                
                //if success callback returns object like {newValue: <something>} --> use that value instead of submitted
                //it is usefull if you want to chnage value in url-function
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
                this.$div.triggerHandler('save', {newValue: newValue, response: response});
            }, this))
            .fail($.proxy(function(xhr) {
                this.error(typeof xhr === 'string' ? xhr : xhr.responseText || xhr.statusText || 'Unknown error!'); 
                this.showForm();  
            }, this));
        },

        save: function(newValue) {
            //convert value for submitting to server
            var submitValue = this.input.value2submit(newValue);
            
            //try parse composite pk defined as json string in data-pk 
            this.options.pk = $.fn.editableutils.tryParseJson(this.options.pk, true); 
            
            var pk = (typeof this.options.pk === 'function') ? this.options.pk.call(this.options.scope) : this.options.pk,
            send = !!(typeof this.options.url === 'function' || (this.options.url && ((this.options.send === 'always') || (this.options.send === 'auto' && pk)))),
            params;

            if (send) { //send to server
                this.showLoading();

                //standard params
                params = {
                    name: this.options.name || '',
                    value: submitValue,
                    pk: pk 
                };

                //additional params
                if(typeof this.options.params === 'function') {
                    params = this.options.params.call(this.options.scope, params);  
                } else {
                    //try parse json in single quotes (from data-params attribute)
                    this.options.params = $.fn.editableutils.tryParseJson(this.options.params, true);   
                    $.extend(params, this.options.params);
                }

                if(typeof this.options.url === 'function') { //user's function
                    return this.options.url.call(this.options.scope, params);
                } else {  
                    //send ajax to server and return deferred object
                    return $.ajax($.extend({
                        url     : this.options.url,
                        data    : params,
                        type    : 'POST'
                    }, this.options.ajaxOptions));
                }
            }
        }, 

        validate: function (value) {
            if (value === undefined) {
                value = this.value;
            }
            if (typeof this.options.validate === 'function') {
                return this.options.validate.call(this.options.scope, value);
            }
        },

        option: function(key, value) {
            if(key in this.options) {
                this.options[key] = value;
            }
            
            if(key === 'value') {
                this.setValue(value);
            }
            
            //do not pass option to input as it is passed in editable-element
        },

        setValue: function(value, convertStr) {
            if(convertStr) {
                this.value = this.input.str2value(value);
            } else {
                this.value = value;
            }
            
            //if form is visible, update input
            if(this.$form && this.$form.is(':visible')) {
                this.input.value2input(this.value);
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
        If function - it will be called instead of ajax. Function should return deferred object to run fail/done callbacks.

        @property url 
        @type string|function
        @default null
        @example
        url: function(params) {
            var d = new $.Deferred;
            if(params.value === 'abc') {
                return d.reject('error message'); //returning error via deferred object
            } else {
                //async saving data in js model
                someModel.asyncSaveMethod({
                   ..., 
                   success: function(){
                      d.resolve();
                   }
                }); 
                return d.promise();
            }
        } 
        **/        
        url:null,
        /**
        Additional params for submit. If defined as <code>object</code> - it is **appended** to original ajax data (pk, name and value).  
        If defined as <code>function</code> - returned object **overwrites** original ajax data.
        @example
        params: function(params) {
            //originally params contain pk, name and value
            params.a = 1;
            return params;
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
        Can be calculated dynamically via function.

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
        Useful to work with json response. For example, if your backend response can be <code>{success: true}</code>
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
        success: null,
        /**
        Additional options for submit ajax request.
        List of values: http://api.jquery.com/jQuery.ajax
        
        @property ajaxOptions 
        @type object
        @default null
        @since 1.1.1        
        @example 
        ajaxOptions: {
            type: 'put',
            dataType: 'json'
        }        
        **/        
        ajaxOptions: null,
        /**
        Whether to show buttons or not.  
        Form without buttons is auto-submitted.

        @property showbuttons 
        @type boolean
        @default true
        @since 1.1.1
        **/         
        showbuttons: true,
        /**
        Scope for callback methods (success, validate).  
        If <code>null</code> means editableform instance itself. 

        @property scope 
        @type DOMElement|object
        @default null
        @since 1.2.0
        @private
        **/            
        scope: null,
        /**
        Whether to save or cancel value when it was not changed but form was submitted

        @property savenochange 
        @type boolean
        @default false
        @since 1.2.0
        **/
        savenochange: false         
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

    //error class attached to control-group
    $.fn.editableform.errorGroupClass = null;  

    //error class attached to editable-error-block
    $.fn.editableform.errorBlockClass = 'editable-error';
}(window.jQuery));