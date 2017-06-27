/**
Select2 input. Based on amazing work of Igor Vaynberg https://github.com/ivaynberg/select2.  
Please see [original docs](http://ivaynberg.github.com/select2) for detailed description and options.  
You should manually include select2 distributive:  

    <link href="select2/select2.css" rel="stylesheet" type="text/css"></link>  
    <script src="select2/select2.js"></script>  
    
@class select2
@extends abstractinput
@since 1.4.1
@final
@example
<a href="#" id="country" data-type="select2" data-pk="1" data-value="ru" data-url="/post" data-original-title="Select country"></a>
<script>
$(function(){
    $('#country').editable({
        source: [
              {id: 'gb', text: 'Great Britain'},
              {id: 'us', text: 'United States'},
              {id: 'ru', text: 'Russia'}
           ],
        select2: {
           multiple: true
        }
    });
});
</script>
**/
(function ($) {

    var Constructor = function (options) {
        this.init('select2', options, Constructor.defaults);
       
        options.select2 = options.select2 || {};
        
        var that = this, 
            mixin = {
               placeholder:  options.placeholder
            };
       
       //detect whether it is multi-valued
       this.isMultiple = options.select2.tags || options.select2.multiple;
       
       //if not `tags` mode, we need define init set data from source
       if(!options.select2.tags) {
            if(options.source) {
                mixin.data = options.source;
            } 

            //this function can be defaulted in seletc2. See https://github.com/ivaynberg/select2/issues/710
            mixin.initSelection = function (element, callback) {
                var val = that.str2value(element.val()),
                    data = $.fn.editableutils.itemsByValue(val, mixin.data, 'id');
                
                //for single-valued mode should not use array. Take first element instead.
                if($.isArray(data) && data.length && !that.isMultiple) {
                   data = data[0]; 
                }
                                    
                callback(data);
            }; 
        }
           
        //overriding objects in config (as by default jQuery extend() is not recursive)
        this.options.select2 = $.extend({}, Constructor.defaults.select2, mixin, options.select2);
    };

    $.fn.editableutils.inherit(Constructor, $.fn.editabletypes.abstractinput);

    $.extend(Constructor.prototype, {
        render: function() {
            this.setClass();
            //apply select2
            this.$input.select2(this.options.select2);

            //trigger resize of editableform to re-position container in multi-valued mode           
            if(this.isMultiple) {
               this.$input.on('change', function() {
                   $(this).closest('form').parent().triggerHandler('resize');
               }); 
            }            
            
        },
       
       value2html: function(value, element) {
           var text = '', data;
           if(this.$input) { //when submitting form 
               data = this.$input.select2('data');
           } else { //on init (autotext)
               //here select2 instance not created yet and data may be even not loaded.
               //we can check data/tags property of select config and if exist lookup text
               if(this.options.select2.tags) {
                   data = value;
               } else if(this.options.select2.data) {
                   data = $.fn.editableutils.itemsByValue(value, this.options.select2.data, 'id');   
               }
           }
           
           if($.isArray(data)) {
               //collect selected data and show with separator
               text = [];
               $.each(data, function(k, v){
                   text.push(v && typeof v === 'object' ? v.text : v); 
               });                   
           } else if(data) {
               text = data.text;  
           }

           text = $.isArray(text) ? text.join(this.options.viewseparator) : text;

           $(element).text(text);
       },       
        
       html2value: function(html) {
           return this.options.select2.tags ? this.str2value(html, this.options.viewseparator) : null;
       }, 
       
       value2input: function(value) {
           this.$input.val(value).trigger('change');
       },
       
       input2value: function() { 
           return this.$input.select2('val');
       },

       str2value: function(str, separator) {
            if(typeof str !== 'string' || !this.isMultiple) {
                return str;
            }
            
            separator = separator || this.options.select2.separator || $.fn.select2.defaults.separator;
            
            var val, i, l;
                
            if (str === null || str.length < 1) {
                return null;
            }
            val = str.split(separator);
            for (i = 0, l = val.length; i < l; i = i + 1) {
                val[i] = $.trim(val[i]);
            }
            
            return val;
       }        
        
    });      

    Constructor.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
        @property tpl 
        @default <input type="hidden">
        **/         
        tpl:'<input type="hidden">',
        /**
        Configuration of select2. [Full list of options](http://ivaynberg.github.com/select2).
        
        @property select2 
        @type object
        @default null
        **/
        select2: null,
        /**
        Placeholder attribute of select

        @property placeholder 
        @type string
        @default null
        **/             
        placeholder: null,
        /**
        Source data for select. It will be assigned to select2 `data` property and kept here just for convenience.
        Please note, that format is different from simple `select` input: use 'id' instead of 'value'.
        E.g. `[{id: 1, text: "text1"}, {id: 2, text: "text2"}, ...]`.  
        
        @property source 
        @type array
        @default null        
        **/
        source: null,
        /**
        Separator used to display tags. 
        
        @property viewseparator 
        @type string
        @default ', '        
        **/
        viewseparator: ', '        
    });

    $.fn.editabletypes.select2 = Constructor;      
    
}(window.jQuery));