// CkEditor helper, checks to see if CkEditor editors in the given form are dirty

(function($){
  var ckeditor = {
    ignoreAnchorSelector: '.cke_dialog_ui_button, .cke_tpl_list a',
    isDirty: function(form){
      editors = ckeditors(form);
      $.DirtyForms.dirtylog('Checking ' + editors.length + ' ckeditors for dirtyness.');
      var dirty = 0;
      editors.each(function() { if (this.checkDirty()) dirty += 1 });
      $.DirtyForms.dirtylog('There were ' + dirty + ' dirty ckeditors.');
      return dirty > 0;
    },
    setClean: function(form){
      ckeditors(form).each(function() { this.resetDirty() });
    }
  }
  var ckeditors = function(form) {
    editors = new Array();
    try {
      for (var key in CKEDITOR.instances) {
        if (CKEDITOR.instances.hasOwnProperty(key)) {
          editor = CKEDITOR.instances[key];
          if ($(editor.element.$).parents().index($(form)) != -1)
            editors.push(editor)
        }
      }
    }
    catch(e) {
      // Ignore, means there was no CKEDITOR variable
    }
    return $(editors);
  }
  $.DirtyForms.helpers.push(ckeditor);
})(jQuery);

