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

    $.fn.editableform.utils.inherit(Checklist, $.fn.editableform.types.list);

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
           return $.isArray(value) ? value.join($.trim(this.options.separator)) : '';
           //it is also possible to sent as array
           //return value;
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
           var selected = [], item, i, html = '';
           if($.isArray(value) && value.length <= this.options.limit) {    
               for(i=0; i<value.length; i++){
                   item = this.itemByVal(value[i]);
                   if(item) {
                       selected.push($('<div>').text(item.text).html());
                   }
               }
               html = selected.join(this.options.viewseparator);
           } else {  
               html = this.options.limitText.replace('{checked}', $.isArray(value) ? value.length : 0).replace('{count}', this.sourceData.length); 
           }
           $(element).html(html);
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

    Checklist.defaults = $.extend({}, $.fn.editableform.types.list.defaults, {
        /**
        @property tpl 
        @default <div></div>
        **/         
        tpl:'<div></div>',
        
        /**
        @property inputclass 
        @type string
        @default span2 editable-checklist
        **/         
        inputclass: 'span2 editable-checklist',        
        
        /**
        Separator of values in string when sending to server

        @property separator 
        @type string
        @default ', '
        **/         
        separator: ',',
        /**
        Separator of text when display as element content.

        @property viewseparator 
        @type string
        @default '<br>'
        **/         
        viewseparator: '<br>',
        /**
        Maximum number of items shown as element content. 
        If checked more items - <code>limitText</code> will be shown.

        @property limit 
        @type integer
        @default 4
        **/         
        limit: 4,
        /**
        Text shown when count of checked items is greater than <code>limit</code> parameter.
        You can use <code>{checked}</code> and <code>{count}</code> placeholders.

        @property limitText 
        @type string
        @default 'Selected {checked} of {count}'
        **/         
        limitText: 'Selected {checked} of {count}'        
    });

    $.fn.editableform.types.checklist = Checklist;      

}(window.jQuery));
