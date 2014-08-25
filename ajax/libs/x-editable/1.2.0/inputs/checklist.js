/**
List of checkboxes. 
Internally value stored as javascript array of values.

@class checklist
@extends list
@final
@example
<a href="#" id="options" data-type="checklist" data-pk="1" data-url="/post" data-original-title="Select options"></a>
<script>
$(function(){
    $('#options').editable({
        value: [2, 3],    
        source: [
              {value: 1, text: 'option1'},
              {value: 2, text: 'option2'},
              {value: 3, text: 'option3'}
           ]
        }
    });
});
</script>
**/
(function ($) {

    var Checklist = function (options) {
        this.init('checklist', options, Checklist.defaults);
    };

    $.fn.editableutils.inherit(Checklist, $.fn.editabletypes.list);

    $.extend(Checklist.prototype, {
        renderList: function() {
            var $label, $div;
            if(!$.isArray(this.sourceData)) {
                return;
            }

            for(var i=0; i<this.sourceData.length; i++) {
                $label = $('<label>').append($('<input>', {
                                           type: 'checkbox',
                                           value: this.sourceData[i].value, 
                                           name: this.options.name
                                     }))
                                     .append($('<span>').text(' '+this.sourceData[i].text));
                
                $('<div>').append($label).appendTo(this.$input);
            }
        },
       
       value2str: function(value) {
           return $.isArray(value) ? value.sort().join($.trim(this.options.separator)) : '';
       },  
       
       //parse separated string
        str2value: function(str) {
           var reg, value = null;
           if(typeof str === 'string' && str.length) {
               reg = new RegExp('\\s*'+$.trim(this.options.separator)+'\\s*');
               value = str.split(reg);
           } else if($.isArray(str)) {
               value = str; 
           }
           return value;
        },       
       
       //set checked on required checkboxes
       value2input: function(value) {
            var $checks = this.$input.find('input[type="checkbox"]');
            $checks.removeAttr('checked');
            if($.isArray(value) && value.length) {
               $checks.each(function(i, el) {
                   var $el = $(el);
                   // cannot use $.inArray as it performs strict comparison
                   $.each(value, function(j, val){
                       /*jslint eqeq: true*/
                       if($el.val() == val) {
                       /*jslint eqeq: false*/                           
                           $el.attr('checked', 'checked');
                       }
                   });
               }); 
            }  
        },  
        
       input2value: function() { 
           var checked = [];
           this.$input.find('input:checked').each(function(i, el) {
               checked.push($(el).val());
           });
           return checked;
       },            
          
       //collect text of checked boxes
        value2htmlFinal: function(value, element) {
           var html = [],
               /*jslint eqeq: true*/
               checked = $.grep(this.sourceData, function(o){
                   return $.grep(value, function(v){ return v == o.value; }).length;
               });
               /*jslint eqeq: false*/
           if(checked.length) {
               $.each(checked, function(i, v) { html.push($.fn.editableutils.escape(v.text)); });
               $(element).html(html.join('<br>'));
           } else {
               $(element).empty(); 
           }
        },
        
       activate: function() {
           this.$input.find('input[type="checkbox"]').first().focus();
       },
       
       autosubmit: function() {
           this.$input.find('input[type="checkbox"]').on('keydown', function(e){
               if (e.which === 13) {
                   $(this).closest('form').submit();
               }
           });
       }
    });      

    Checklist.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
        /**
        @property tpl 
        @default <div></div>
        **/         
        tpl:'<div></div>',
        
        /**
        @property inputclass 
        @type string
        @default editable-checklist
        **/         
        inputclass: 'editable-checklist',        
        
        /**
        Separator of values when reading from 'data-value' string

        @property separator 
        @type string
        @default ', '
        **/         
        separator: ','
    });

    $.fn.editabletypes.checklist = Checklist;      

}(window.jQuery));
