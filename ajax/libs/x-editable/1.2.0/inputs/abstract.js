/**
Abstract editable input class.
To create your own input you should inherit from this class.

@class abstract
**/
(function ($) {

    //types
    $.fn.editabletypes = {};
    
    var Abstract = function () { };

    Abstract.prototype = {
       /**
        Initializes input
        
        @method init() 
        **/
       init: function(type, options, defaults) {
           this.type = type;
           this.options = $.extend({}, defaults, options); 
           this.$input = null;
           this.$clear = null;
           this.error = null;
       },
       
       /**
        Renders input. Can return jQuery deferred object.
        
        @method render() 
       **/       
       render: function() {
            this.$input = $(this.options.tpl);
            if(this.options.inputclass) {
                this.$input.addClass(this.options.inputclass); 
            }
            
            if (this.options.placeholder) {
                this.$input.attr('placeholder', this.options.placeholder);
            }   
       }, 

       /**
        Sets element's html by value. 
        
        @method value2html(value, element) 
        @param {mixed} value
        @param {DOMElement} element
       **/       
       value2html: function(value, element) {
           $(element).text(value);
       },
        
       /**
        Converts element's html to value
        
        @method html2value(html) 
        @param {string} html
        @returns {mixed}
       **/             
       html2value: function(html) {
           return $('<div>').html(html).text();
       },
        
       /**
        Converts value to string (for comparering)
        
        @method value2str(value) 
        @param {mixed} value
        @returns {string}
       **/       
       value2str: function(value) {
           return value;
       }, 
       
       /**
        Converts string received from server into value.
        
        @method str2value(str) 
        @param {string} str
        @returns {mixed}
       **/        
       str2value: function(str) {
           return str;
       }, 
       
       /**
        Converts value for submitting to server
        
        @method value2submit(value) 
        @param {mixed} value
        @returns {mixed}
       **/       
       value2submit: function(value) {
           return value;
       },         
       
       /**
        Sets value of input.
        
        @method value2input(value) 
        @param {mixed} value
       **/       
       value2input: function(value) {
           this.$input.val(value);
       },
        
       /**
        Returns value of input. Value can be object (e.g. datepicker)
        
        @method input2value() 
       **/         
       input2value: function() { 
           return this.$input.val();
       }, 

       /**
        Activates input. For text it sets focus.
        
        @method activate() 
       **/        
       activate: function() {
           if(this.$input.is(':visible')) {
               this.$input.focus();
           }
       },
       
       /**
        Creates input.
        
        @method clear() 
       **/        
       clear: function() {
           this.$input.val(null);
       },
       
       /**
        method to escape html.
       **/
       escape: function(str) {
           return $('<div>').text(str).html();
       },
       
       /**
        attach handler to automatically submit form when value changed (useful when buttons not shown)
       **/       
       autosubmit: function() {
        
       }
    };
        
    Abstract.defaults = {  
        /**
        HTML template of input. Normally you should not change it.

        @property tpl 
        @type string
        @default ''
        **/   
        tpl: '',
        /**
        CSS class automatically applied to input
        
        @property inputclass 
        @type string
        @default input-medium
        **/         
        inputclass: 'input-medium',
        /**
        Name attribute of input

        @property name 
        @type string
        @default null
        **/         
        name: null
    };
    
    $.extend($.fn.editabletypes, {abstract: Abstract});
        
}(window.jQuery));