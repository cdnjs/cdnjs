/*
Editableform based on jQuery UI
*/
(function ($) {
    
    $.extend($.fn.editableform.Constructor.prototype, {
        initButtons: function() {
            this.$form.find('.editable-buttons').append($.fn.editableform.buttons);                
            this.$form.find('.editable-submit').button({
                icons: { primary: "ui-icon-check" },
                text: false
            }).removeAttr('title');
            this.$form.find('.editable-cancel').button({
                icons: { primary: "ui-icon-closethick" },
                text: false
            }).removeAttr('title');
        }
    });
    
    //error classes
    $.fn.editableform.errorGroupClass = null;
    $.fn.editableform.errorBlockClass = 'ui-state-error';
    
}(window.jQuery));