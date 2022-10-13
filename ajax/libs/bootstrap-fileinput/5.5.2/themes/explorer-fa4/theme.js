/*!
 * bootstrap-fileinput v5.5.0
 * http://plugins.krajee.com/file-input
 *
 * Krajee Explorer Font Awesome theme configuration for bootstrap-fileinput. 
 * Load this theme file after loading `fileinput.js`. Ensure that
 * font awesome assets and CSS are loaded on the page as well.
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
    'use strict';
    $.fn.fileinputThemes['explorer-fa4'] = {
        layoutTemplates: {
            footer: '<div class="file-details-cell">' +
                '<div class="explorer-caption" title="{caption}">{caption}</div> ' + '{size}{progress}' +
                '</div>' +
                '<div class="file-actions-cell">{indicator} {actions}</div>',
            actions: '{drag}\n' +
                '<div class="file-actions">\n' +
                '    <div class="file-footer-buttons">\n' +
                '        {rotate} {upload} {download} {delete} {zoom} {other} ' +
                '    </div>\n' +
                '</div>',
            fileIcon: '<i class="fa fa-file kv-caption-icon"></i> '
        },
        previewSettings: {
            html: {width: '100px', height: '60px'},
            text: {width: '100px', height: '60px'},
            video: {width: 'auto', height: '60px'},
            audio: {width: 'auto', height: '60px'},
            flash: {width: '100%', height: '60px'},
            object: {width: '100%', height: '60px'},
            pdf: {width: '100px', height: '60px'},
            other: {width: '100%', height: '60px'}
        },
        frameClass: 'explorer-frame',
        fileActionSettings: {
            removeIcon: '<i class="fa fa-trash"></i>',
            uploadIcon: '<i class="fa fa-upload"></i>',
            uploadRetryIcon: '<i class="fa fa-cloud-upload"></i>',
            downloadIcon: '<i class="fa fa-download"></i>',
            rotateIcon: '<i class="fa fa-rotate-right"></i>',
            zoomIcon: '<i class="fa fa-search-plus"></i>',
            dragIcon: '<i class="fa fa-arrows"></i>',
            indicatorNew: '<i class="fa fa-plus-circle text-warning"></i>',
            indicatorSuccess: '<i class="fa fa-check-circle text-success"></i>',
            indicatorError: '<i class="fa fa-exclamation-circle text-danger"></i>',
            indicatorLoading: '<i class="fa fa-hourglass text-muted"></i>',
            indicatorPaused: '<i class="fa fa-pause text-info"></i>'
        },
        previewZoomButtonIcons: {
            prev: '<i class="fa fa-chevron-left"></i>',
            next: '<i class="fa fa-chevron-right"></i>',
            rotate: '<i class="fa fa-rotate-right"></i>',
            toggleheader: '<i class="fa fa-fw fa-arrows-v"></i>',
            fullscreen: '<i class="fa fa-fw fa-arrows-alt"></i>',
            borderless: '<i class="fa fa-fw fa-external-link"></i>',
            close: '<i class="fa fa-fw fa-remove"></i>'
        },
        previewFileIcon: '<i class="fa fa-file"></i>',
        browseIcon: '<i class="fa fa-folder-open"></i>',
        removeIcon: '<i class="fa fa-trash"></i>',
        cancelIcon: '<i class="fa fa-ban"></i>',
        pauseIcon: '<i class="fa fa-pause"></i>',
        uploadIcon: '<i class="fa fa-upload"></i>',
        msgValidationErrorIcon: '<i class="fa fa-exclamation-circle"></i> '
    };
}));