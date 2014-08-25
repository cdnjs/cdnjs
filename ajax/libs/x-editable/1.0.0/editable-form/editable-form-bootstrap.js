/*
Editableform based on Twitter Bootstrap
*/
(function ($) {
    
    //form template
    $.fn.editableform.template = '<form class="form-inline editableform"><div class="control-group">' + 
    '&nbsp;<button type="submit" class="btn btn-primary"><i class="icon-ok icon-white"></i></button>&nbsp;<button type="button" class="btn clearfix"><i class="icon-ban-circle"></i></button>' + 
    '<div style="clear:both"><span class="help-block editable-error-block"></span></div>' + 
    '</div></form>'; 
    
    //error classes
    $.fn.editableform.errorGroupClass = 'error';
    $.fn.editableform.errorBlockClass = null;    
    
}(window.jQuery));