// CkEditor helper, checks to see if CkEditor editors in the given form are dirty

// Support for UMD: https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
// This allows for tools such as Browserify to compose the components together into a single HTTP request.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var ckeditor = {
        ignoreAnchorSelector: '.cke_dialog_ui_button, .cke_tpl_list a',
        isDirty: function (form) {
            editors = ckeditors(form);
            $.DirtyForms.dirtylog('Checking ' + editors.length + ' ckeditors for dirtyness.');
            var isDirty = false;
            editors.each(function (editorIndex) {
                if (this.checkDirty()) {
                    isDirty = true;

                    $.DirtyForms.dirtylog('CKEditor with index ' + editorIndex + ' was dirty, exiting...');
                    // Return false to break out of the .each() function
                    return false;
                }
            });
            return isDirty;
        },
        setClean: function (form) {
            ckeditors(form).each(function () { this.resetDirty(); });
        }
    };
    var ckeditors = function (form) {
        var $form = form.jquery ? form : $(form);
        editors = [];
        try {
            for (var key in CKEDITOR.instances) {
                if (CKEDITOR.instances.hasOwnProperty(key)) {
                    editor = CKEDITOR.instances[key];
                    if ($(editor.element.$).parents().index($form) != -1) {
                        $.DirtyForms.dirtylog('Adding CKEditor with key ' + key);
                        editors.push(editor);
                    }
                }
            }
        }
        catch (e) {
            // Ignore, means there was no CKEDITOR variable
        }
        return $(editors);
    };
    $.DirtyForms.helpers.push(ckeditor);
}));
