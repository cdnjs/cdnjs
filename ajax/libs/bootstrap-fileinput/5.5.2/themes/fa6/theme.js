/*!
 * bootstrap-fileinput v5.5.0
 * http://plugins.krajee.com/file-input
 *
 * Font Awesome 6.x icon theme configuration for bootstrap-fileinput. Requires font awesome 6 assets to be loaded.
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2022, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'],factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    "use strict";

    $.fn.fileinputThemes.fa6 = {
        fileActionSettings: {
            removeIcon: '<i class="fa-regular fa-trash-can"></i>',
            uploadIcon: '<i class="fa-solid fa-upload"></i>',
            uploadRetryIcon: '<i class="fa-solid fa-cloud-arrow-up"></i>',
            downloadIcon: '<i class="fa-solid fa-download"></i>',
            rotateIcon: '<i class="fa-solid fa-rotate-right"></i>',
            zoomIcon: '<i class="fa-solid fa-magnifying-glass-plus"></i>',
            dragIcon: '<i class="fa-solid fa-arrows-up-down-left-right"></i>',
            indicatorNew: '<i class="fa-solid fa-circle-plus text-warning"></i>',
            indicatorSuccess: '<i class="fa-solid fa-circle-check text-success"></i>',
            indicatorError: '<i class="fa-solid fa-circle-exclamation text-danger"></i>',
            indicatorLoading: '<i class="fa-solid fa-hourglass text-muted"></i>',
            indicatorPaused: '<i class="fa fa-pause text-info"></i>'
        },
        layoutTemplates: {
            fileIcon: '<i class="fa-solid fa-file kv-caption-icon"></i> '
        },
        previewZoomButtonIcons: {
            prev: '<i class="fa-solid fa-chevron-left fa-fw"></i>',
            next: '<i class="fa-solid fa-chevron-right fa-fw"></i>',
            rotate: '<i class="fa-solid fa-rotate-right fa-fw"></i>',
            toggleheader: '<i class="fa-solid fa-arrows-up-down fa-fw"></i>',
            fullscreen: '<i class="fa-solid fa-maximize fa-fw"></i>',
            borderless: '<i class="fa-solid fa-arrow-up-right-from-square fa-fw"></i>',
            close: '<i class="fa-solid fa-fw fa-xmark fa-fw"></i>'
        },
        previewFileIcon: '<i class="fa-solid fa-file"></i>',
        browseIcon: '<i class="fa-solid fa-folder-open"></i>',
        removeIcon: '<i class="fa-regular fa-trash-can"></i>',
        cancelIcon: '<i class="fa-solid fa-ban"></i>',
        pauseIcon: '<i class="fa-solid fa-pause"></i>',
        uploadIcon: '<i class="fa-solid fa-upload"></i>',
        msgValidationErrorIcon: '<i class="fa-solid fa-circle-exclamation"></i> '
    };
}));
