/* ===========================================================
 * trumbowyg.pasteimage.js v1.0
 * Basic base64 paste plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 */

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        plugins: {
            pasteImage: {
                init: function (trumbowyg) {
                    trumbowyg.pasteHandlers.push(function (pasteEvent) {
                        try {
                            var items = (pasteEvent.originalEvent || pasteEvent).clipboardData.items,
                                reader;

                            for (var i = items.length - 1; i >= 0; i -= 1) {
                                if (items[i].type.match(/^image\//)) {
                                    reader = new FileReader();
                                    /* jshint -W083 */
                                    reader.onloadend = function (event) {
                                        trumbowyg.execCmd('insertImage', event.target.result, undefined, true);
                                    };
                                    /* jshint +W083 */
                                    reader.readAsDataURL(items[i].getAsFile());
                                }
                            }
                        } catch (c) {
                        }
                    });
                }
            }
        }
    });
})(jQuery);
