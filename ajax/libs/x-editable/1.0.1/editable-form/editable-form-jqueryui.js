/*
Editableform based on jQuery UI
*/
(function ($) {
    
    $.extend($.fn.editableform.Constructor.prototype, {
         initTemplate: function() {
              this.$form = $($.fn.editableform.template);
              
             //init buttons
             this.$form.find('button[type=submit]').button({
                 icons: { primary: "ui-icon-check" },
                 text: false
             });
             this.$form.find('button[type=button]').button({
                 icons: { primary: "ui-icon-cancel" },
                 text: false
             });
         }
    });
    
    //form template
    $.fn.editableform.template = '<form class="editableform"><div class="control-group">' + 
    '&nbsp;<button type="submit" style="height: 24px">submit</button>&nbsp;<button type="button" style="height: 24px">cancel</button></div>' + 
    '<div class="editable-error-block"></div>' + 
    '</form>'; 
    
    //error classes
    $.fn.editableform.errorGroupClass = null;
    $.fn.editableform.errorBlockClass = 'ui-state-error';
    
}(window.jQuery));