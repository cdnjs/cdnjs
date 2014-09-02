/**
jQuery UI Datepicker.  
Description and examples: http://jqueryui.com/datepicker.   
This input is also accessible as **date** type. Do not use it together with __bootstrap-datepicker__ as both apply <code>$().datepicker()</code> method.

@class dateui
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
                firstDay: 1
           }
        }
    });
});
</script>
**/
(function ($) {

    var DateUI = function (options) {
        this.init('dateui', options, DateUI.defaults);
        
        //set popular options directly from settings or data-* attributes
        var directOptions =  $.fn.editableutils.sliceObj(this.options, ['format']);

        //overriding datepicker config (as by default jQuery extend() is not recursive)
        this.options.datepicker = $.extend({}, DateUI.defaults.datepicker, directOptions, options.datepicker);
        
        //by default viewformat equals to format
        if(!this.options.viewformat) {
            this.options.viewformat = this.options.datepicker.format;
        }
        
        //correct formats: replace yyyy with yy
        this.options.viewformat = this.options.viewformat.replace('yyyy', 'yy'); 
        this.options.datepicker.format = this.options.datepicker.format.replace('yyyy', 'yy'); 
        
        //copy format to dateFormat (dateFormat option required for ui datepicker).
        //This allows common option 'format' for all datepickers
        this.options.datepicker.dateFormat = this.options.datepicker.format;        
    };

    $.fn.editableutils.inherit(DateUI, $.fn.editabletypes.abstractinput);    
    
    $.extend(DateUI.prototype, {
        render: function () {
            DateUI.superclass.render.call(this);
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
            var text = $.datepicker.formatDate(this.options.viewformat, value);
            DateUI.superclass.value2html(text, element); 
        },

        html2value: function(html) {
           if(typeof html !== 'string') {
               return html;
           }            
            
           //if string does not match format, UI datepicker throws exception
           var d;
           try {
              d = $.datepicker.parseDate(this.options.viewformat, html);
           } catch(e) {}
           
           return d;            
        },   
        
        value2str: function(value) {
           return $.datepicker.formatDate(this.options.datepicker.dateFormat, value);
       }, 
       
       str2value: function(str) {
           if(typeof str !== 'string') {
               return str;
           }
           
           //if string does not match format, UI datepicker throws exception
           var d;
           try {
              d = $.datepicker.parseDate(this.options.datepicker.dateFormat, str);
           } catch(e) {}
           
           return d;
       }, 
       
       value2submit: function(value) {
           return this.value2str(value);
       },                     

       value2input: function(value) {
           this.$input.datepicker('setDate', value);
       },
        
       input2value: function() { 
           return this.$input.datepicker('getDate');
       },       
       
       activate: function() {
       },
       
       clear:  function() {
           this.$input.datepicker('setDate', null);
       },
       
       autosubmit: function() {
           this.$input.on('mouseup', 'table.ui-datepicker-calendar a.ui-state-default', function(e){
               var $form = $(this).closest('form');
               setTimeout(function() {
                   $form.submit();
               }, 200);
           });
       }

    });
    
    DateUI.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
        @property tpl 
        @default <div></div>
        **/         
        tpl:'<div></div>',
        /**
        @property inputclass 
        @default 'editable-date'
        **/         
        inputclass: 'editable-date',
        /**
        Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
        Full list of tokens: http://docs.jquery.com/UI/Datepicker/formatDate
        
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
        Full list of options: http://api.jqueryui.com/datepicker
        
        @property datepicker 
        @type object
        @default {
           firstDay: 0, 
           changeYear: true, 
           changeMonth: true
        }
        **/
        datepicker: {
            firstDay: 0,
            changeYear: true,
            changeMonth: true
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

    $.fn.editabletypes.dateui = DateUI;
    $.fn.editabletypes.date = DateUI;

}(window.jQuery));
