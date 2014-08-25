/**
Select (dropdown)

@class select
@extends list
@final
@example
<a href="#" id="status" data-type="select" data-pk="1" data-url="/post" data-original-title="Select status"></a>
<script>
$(function(){
    $('#status').editable({
        value: 2,    
        source: [
              {value: 1, text: 'Active'},
              {value: 2, text: 'Blocked'},
              {value: 3, text: 'Deleted'}
           ]
        }
    });
});
</script>
**/
(function ($) {

    var Select = function (options) {
        this.init('select', options, Select.defaults);
    };

    $.fn.editableutils.inherit(Select, $.fn.editabletypes.list);

    $.extend(Select.prototype, {
        renderList: function() {
            if(!$.isArray(this.sourceData)) {
                return;
            }

            for(var i=0; i<this.sourceData.length; i++) {
                this.$input.append($('<option>', {value: this.sourceData[i].value}).text(this.sourceData[i].text)); 
            }
            
            //enter submit
            this.$input.on('keydown.editable', function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });            
        },
       
        value2htmlFinal: function(value, element) {
            var text = '', item = this.itemByVal(value);
            if(item) {
                text = item.text;
            }
            Select.superclass.constructor.superclass.value2html(text, element);   
        },
        
        autosubmit: function() {
            this.$input.off('keydown.editable').on('change.editable', function(){
                $(this).closest('form').submit();
            });
        }
    });      

    Select.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
        /**
        @property tpl 
        @default <select></select>
        **/         
        tpl:'<select></select>'
    });

    $.fn.editabletypes.select = Select;      

}(window.jQuery));