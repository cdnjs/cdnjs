/**
 * Depends on Charcounter jQuery plugin by Tom Deater
 *   http://www.tomdeater.com/jquery/character_counter/
 *
 * @file charcounter textarea plugin for jquery-jeditable
 * @author Mika Tuupola, Nicolas CARPi
 * @home https://github.com/NicolasCARPi/jquery_jeditable
 * @licence MIT (see LICENCE file)
 * @copyright © 2006 Mika Tuupola, Nicolas CARPi
 * @name PluginCharcounter
 * @example <caption>Charcounter example:</caption>
 * $(".charcounter").editable("save.php", {
 *     type      : "charcounter",
 *     submit    : 'OK',
 *     charcounter : {
 *         characters : 60
 *     }
 * });
 */
'use strict';
$.editable.addInputType("charcounter", {
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

        // stop bubbling and propagation to parent element
        textarea.click(function(event) {
            if (event.cancelBubble) {
                event.cancelBubble();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
        });

        $(this).append(textarea);
        return(textarea);
    },
    plugin : function(settings, original) {
        $("textarea", this).charCounter(settings.charcounter.characters, settings.charcounter);
    }
});
