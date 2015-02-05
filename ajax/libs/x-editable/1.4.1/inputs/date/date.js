/**
Bootstrap-datepicker.  
Description and examples: https://github.com/eternicode/bootstrap-datepicker.  
For **i18n** you should include js file from here: https://github.com/eternicode/bootstrap-datepicker/tree/master/js/locales
and set `language` option.  
Since 1.4.0 date has different appearance in **popup** and **inline** modes. 

@class date
@extends abstractinput
@final
@example
<a href="#" id="dob" data-type="date" data-pk="1" data-url="/post" data-original-title="Select date">15/05/1984</a>
<script>
$(function(){
    $('#dob').editable({
        format: 'yyyy-mm-dd',    
        viewformat: 'dd/mm/yyyy',    
        datepicker: {
                weekStart: 1
           }
        }
    });
});
</script>
**/
(function ($) {

    var Date = function (options) {
        this.init('date', options, Date.defaults);
        this.initPicker(options, Date.defaults);
    };

    $.fn.editableutils.inherit(Date, $.fn.editabletypes.abstractinput);    
    
    $.extend(Date.prototype, {
        initPicker: function(options, defaults) {
            //'format' is set directly from settings or data-* attributes

            //by default viewformat equals to format
            if(!this.options.viewformat) {
                this.options.viewformat = this.options.format;
            }
            
            //overriding datepicker config (as by default jQuery extend() is not recursive)
            //since 1.4 datepicker internally uses viewformat instead of format. Format is for submit only
            this.options.datepicker = $.extend({}, defaults.datepicker, options.datepicker, {
                format: this.options.viewformat
            });
            
            //language
            this.options.datepicker.language = this.options.datepicker.language || 'en'; 

            //store DPglobal
            this.dpg = $.fn.datepicker.DPGlobal; 

            //store parsed formats
            this.parsedFormat = this.dpg.parseFormat(this.options.format);
            this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat);            
        },
        
        render: function () {
            this.$input.datepicker(this.options.datepicker);
            
            //"clear" link
            if(this.options.clear) {
                this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    this.clear();
                }, this));
                
                this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));  
            }                
        },
        
        value2html: function(value, element) {
            var text = value ? this.dpg.formatDate(value, this.parsedViewFormat, this.options.datepicker.language) : '';
            Date.superclass.value2html(text, element); 
        },

        html2value: function(html) {
            return html ? this.dpg.parseDate(html, this.parsedViewFormat, this.options.datepicker.language) : null;
        },   
        
        value2str: function(value) {
            return value ? this.dpg.formatDate(value, this.parsedFormat, this.options.datepicker.language) : '';
       }, 
       
       str2value: function(str) {
           return str ? this.dpg.parseDate(str, this.parsedFormat, this.options.datepicker.language) : null;
       }, 
       
       value2submit: function(value) {
           return this.value2str(value);
       },                    

       value2input: function(value) {
           this.$input.datepicker('update', value);
       },
        
       input2value: function() { 
           return this.$input.data('datepicker').date;
       },       
       
       activate: function() {
       },
       
       clear:  function() {
          this.$input.data('datepicker').date = null;
          this.$input.find('.active').removeClass('active');
       },
       
       autosubmit: function() {
           this.$input.on('changeDate', function(e){
               var $form = $(this).closest('form');
               setTimeout(function() {
                   $form.submit();
               }, 200);
           });
       }

    });
    
    Date.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
        @property tpl 
        @default <div></div>
        **/         
        tpl:'<div class="editable-date well"></div>',
        /**
        @property inputclass 
        @default null
        **/         
        inputclass: null,
        /**
        Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
        Possible tokens are: <code>d, dd, m, mm, yy, yyyy</code>  
        
        @property format 
        @type string
        @default yyyy-mm-dd
        **/         
        format:'yyyy-mm-dd',
        /**
        Format used for displaying date. Also applied when converting date from element's text on init.   
        If not specified equals to <code>format</code>
        
        @property viewformat 
        @type string
        @default null
        **/          
        viewformat: null,  
        /**
        Configuration of datepicker.
        Full list of options: http://vitalets.github.com/bootstrap-datepicker
        
        @property datepicker 
        @type object
        @default {
            weekStart: 0,
            startView: 0,
            autoclose: false
        }
        **/
        datepicker:{
            weekStart: 0,
            startView: 0,
            autoclose: false
        },
        /**
        Text shown as clear date button. 
        If <code>false</code> clear button will not be rendered.
        
        @property clear 
        @type boolean|string
        @default 'x clear'         
        **/
        clear: '&times; clear'
    });   

    $.fn.editabletypes.date = Date;

}(window.jQuery));
