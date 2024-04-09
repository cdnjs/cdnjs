/*!
 * bootstrap-fileinput v5.5.0
 * http://plugins.krajee.com/file-input
 *
 * Bootstrap 5.x icon theme configuration for bootstrap-fileinput. Requires bootstrap 5.x icons CSS to be loaded.
 * This is used as the default theme within the bootstrap-fileinput plugin.
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2024, Kartik Visweswaran, Krajee.com
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
    'use strict';
    $.fn.fileinputBsVersion = '5.x.x';
    $.fn.fileinputThemes.bs5 = {
        fileActionSettings: {
            removeIcon: '<i class="bi-trash"></i>',
            uploadIcon: '<i class="bi-upload"></i>',
            uploadRetryIcon: '<i class="bi-cloud-arrow-up-fill"></i>',
            downloadIcon: '<i class="bi-download"></i>',
            rotateIcon: '<i class="bi-arrow-clockwise"></i>',
            zoomIcon: '<i class="bi-zoom-in"></i>',
            dragIcon: '<i class="bi-arrows-move"></i>',
            indicatorNew: '<i class="bi-plus-lg text-warning"></i>',
            indicatorSuccess: '<i class="bi-check-lg-fill text-success"></i>',
            indicatorError: '<i class="bi-exclamation-lg text-danger"></i>',
            indicatorLoading: '<i class="bi-hourglass-bottom text-muted"></i>',
            indicatorPaused: '<i class="bi-pause-fill text-primary"></i>',
        },
        layoutTemplates: {
            fileIcon: '<i class="bi-file-earmark-arrow-up"></i>'
        },
        previewZoomButtonIcons: {
            prev: '<i class="bi-chevron-left"></i>',
            next: '<i class="bi-chevron-right"></i>',
            rotate: '<i class="bi-arrow-clockwise"></i>',
            toggleheader: '<i class="bi-arrows-expand"></i>',
            fullscreen: '<i class="bi-arrows-fullscreen"></i>',
            borderless: '<i class="bi-arrows-angle-expand"></i>',
            close: '<i class="bi-x-lg"></i>'
        },
        previewFileIcon: '<i class="bi-file-earmark-fill"></i>',
        browseIcon: '<i class="bi-folder2-open"></i> ',
        removeIcon: '<i class="bi-trash"></i>',
        cancelIcon: '<i class="bi-slash-circle"></i>',
        pauseIcon: '<i class="bi-pause-fill"></i>',
        uploadIcon: '<i class="bi-upload"></i>',
        msgValidationErrorIcon: '<i class="bi-exclamation-circle-fill"></i> '
    };
}));
