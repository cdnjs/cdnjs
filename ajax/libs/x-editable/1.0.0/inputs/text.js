/**
Text input

@class text
@extends abstract
@example
<a href="#" id="username" data-type="text" data-pk="1">awesome</a>
<script>
$(function(){
    $('#username').editable({
        url: 'post.php',
        title: 'Enter username'
    });
});
</script>
**/
(function ($) {
    var Text = function (options) {
        this.init('text', options, Text.defaults);
    };

    $.fn.editableform.utils.inherit(Text, $.fn.editableform.types.abstract);

    $.extend(Text.prototype, {
        activate: function() {
            if(this.$input.is(':visible')) {
                $.fn.editableform.utils.setCursorPosition(this.$input.get(0), this.$input.val().length);
                this.$input.focus();
            }
        }  
    });

    Text.defaults = $.extend({}, $.fn.editableform.types.abstract.defaults, {
        /**
        @property tpl 
        @default <input type="text">
        **/         
        tpl: '<input type="text">',
        /**
        Placeholder attribute of input. Shown when input is empty.

        @property placeholder 
        @type string
        @default null
        **/             
        placeholder: null
    });

    $.fn.editableform.types.text = Text;

}(window.jQuery));
