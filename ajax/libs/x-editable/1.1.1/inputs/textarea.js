/**
Textarea input

@class textarea
@extends abstract
@final
@example
<a href="#" id="comments" data-type="textarea" data-pk="1">awesome comment!</a>
<script>
$(function(){
    $('#comments').editable({
        url: '/post',
        title: 'Enter comments'
    });
});
</script>
**/
(function ($) {

    var Textarea = function (options) {
        this.init('textarea', options, Textarea.defaults);
    };

    $.fn.editableform.utils.inherit(Textarea, $.fn.editableform.types.abstract);

    $.extend(Textarea.prototype, {
        render: function () {
            Textarea.superclass.render.call(this);

            //ctrl + enter
            this.$input.keydown(function (e) {
                if (e.ctrlKey && e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        },

        value2html: function(value, element) {
            var html = '', lines;
            if(value) {
                lines = value.split("\n");
                for (var i = 0; i < lines.length; i++) {
                    lines[i] = $('<div>').text(lines[i]).html();
                }
                html = lines.join('<br>');
            }
            $(element).html(html);
        },

        html2value: function(html) {
            if(!html) {
                return '';
            }
            var lines = html.split(/<br\s*\/?>/i);
            for (var i = 0; i < lines.length; i++) {
                lines[i] = $('<div>').html(lines[i]).text();
            }
            return lines.join("\n"); 
        },        

        activate: function() {
            if(this.$input.is(':visible')) {
                $.fn.editableform.utils.setCursorPosition(this.$input.get(0), this.$input.val().length);
                this.$input.focus();
            }
        }         
    });

    Textarea.defaults = $.extend({}, $.fn.editableform.types.abstract.defaults, {
        /**
        @property tpl 
        @default <textarea></textarea>
        **/          
        tpl:'<textarea></textarea>',
        /**
        @property inputclass 
        @default span3
        **/          
        inputclass:'span3',
        /**
        Placeholder attribute of input. Shown when input is empty.

        @property placeholder 
        @type string
        @default null
        **/             
        placeholder: null        
    });

    $.fn.editableform.types.textarea = Textarea;    

}(window.jQuery));