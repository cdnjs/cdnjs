/**
 * @file autogrow plugin for jquery-jeditable
 * @author Mika Tuupola, Nicolas CARPi
 * @copyright © 2008 Mika Tuupola, Nicolas CARPi
 * @home https://github.com/NicolasCARPi/jquery_jeditable
 * @licence MIT (see LICENCE file)
 * @name PluginAutogrow
 * @example <caption>Autogrow example:</caption>
 * $(".autogrow").editable("save.php", {
 *     type      : "autogrow",
 *     submit    : 'OK',
 *     cancel    : 'cancel'
 * });
 */
'use strict';
$.editable.addInputType("autogrow", {
    element : function(settings, original) {
        var textarea = $("<textarea />");
        if (settings.rows) {
            textarea.attr("rows", settings.rows);
        } else {
            textarea.height(settings.height);
        }
        if (settings.cols) {
            textarea.attr("cols", settings.cols);
        } else {
            textarea.width(settings.width);
        }
        $(this).append(textarea);
        return(textarea);
    },
    plugin : function(settings, original) {
        $("textarea", this).autoGrow();
    }
});
