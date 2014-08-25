/**
Bootstrap-datepicker.  
Description and examples: http://vitalets.github.com/bootstrap-datepicker.  
For localization you can include js file from here: https://github.com/eternicode/bootstrap-datepicker/tree/master/js/locales

@class date
@extends abstract
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
        
        //set popular options directly from settings or data-* attributes
        var directOptions =  $.fn.editableform.utils.sliceObj(this.options, ['format']);

        //overriding datepicker config (as by default jQuery extend() is not recursive)
        this.options.datepicker = $.extend({}, Date.defaults.datepicker, directOptions, options.datepicker);

        //by default viewformat equals to format
        if(!this.options.viewformat) {
            this.options.viewformat = this.options.datepicker.format;
        }  
        
        //language
        this.options.datepicker.language = this.options.datepicker.language || 'en'; 
        
        //store DPglobal
        this.dpg = $.fn.datepicker.DPGlobal; 
        
        //store parsed formats
        this.parsedFormat = this.dpg.parseFormat(this.options.datepicker.format);
        this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat);
    };

    $.fn.editableform.utils.inherit(Date, $.fn.editableform.types.abstract);    
    
    $.extend(Date.prototype, {
        render: function () {
            Date.superclass.render.call(this);
            this.$input.datepicker(this.options.datepicker);
                        
            if(this.options.clear) {
                this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    this.clear();
                }, this));
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
    
    Date.defaults = $.extend({}, $.fn.editableform.types.abstract.defaults, {
        /**
        @property tpl 
        @default <div></div>
        **/         
        tpl:'<div></div>',
        /**
        @property inputclass 
        @default editable-date well
        **/         
        inputclass: 'editable-date well',
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

    $.fn.editableform.types.date = Date;

}(window.jQuery));
