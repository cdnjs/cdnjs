/*
 * Ajaxupload for Jeditable
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Depends on Ajax fileupload jQuery plugin by PHPLetter guys:
 *   http://www.phpletter.com/Our-Projects/AjaxFileUpload/
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 *
 * Revision: $Id$
 *
 */
 
$.editable.addInputType('ajaxupload', {
    /* create input element */
    element : function(settings) {
        settings.onblur = 'ignore';
        var input = $('<input type="file" id="upload" name="upload" />');
        $(this).append(input);
        return(input);
    },
    content : function(string, settings, original) {
        /* do nothing */
    },
    plugin : function(settings, original) {
        var form = this;
        form.attr("enctype", "multipart/form-data");
        $("button:submit", form).bind('click', function() {
            //$(".message").show();
            $.ajaxFileUpload({
                url: settings.target,
                secureuri:false,
                fileElementId: 'upload',
                dataType: 'html',
                success: function (data, status) {
                    $(original).html(data);
                    original.editing = false;
                },
                error: function (data, status, e) {
                    alert(e);
                }
            });
            return(false);
        });
    }
});
