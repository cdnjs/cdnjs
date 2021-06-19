/*!
 * bootstrap-fileinput v5.2.2
 * http://plugins.krajee.com/file-input
 *
 * Krajee Explorer theme configuration for bootstrap-fileinput. Load this theme file after loading `fileinput.js`.
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2021, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
(function ($) {
    "use strict";
    $.fn.fileinputThemes.explorer = {
        layoutTemplates: {
            footer: '<div class="file-details-cell">' +
                '<div class="explorer-caption" title="{caption}">{caption}</div> ' + '{size}{progress}' +
                '</div>' +
                '<div class="file-actions-cell">{indicator} {actions}</div>',
            actions: '{drag}\n' +
                '<div class="file-actions">\n' +
                '    <div class="file-footer-buttons">\n' +
                '        {upload} {download} {delete} {zoom} {other} ' +
                '    </div>\n' +
                '</div>',
        },
        previewSettings: {
            html: {width: "100px", height: "60px"},
            text: {width: "100px", height: "60px"},
            video: {width: "auto", height: "60px"},
            audio: {width: "auto", height: "60px"},
            flash: {width: "100%", height: "60px"},
            object: {width: "100%", height: "60px"},
            pdf: {width: "100px", height: "60px"},
            other: {width: "100%", height: "60px"}
        },
        frameClass: 'explorer-frame'
    };
})(window.jQuery);
