/*!
 * bootstrap-fileinput v5.0.3
 * http://plugins.krajee.com/file-input
 *
 * Krajee Explorer Font Awesome theme configuration for bootstrap-fileinput. 
 * Load this theme file after loading `fileinput.js`. Ensure that
 * font awesome assets and CSS are loaded on the page as well.
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2019, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD-3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
(function ($) {
    'use strict';
    var teTagBef = '<tr class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
        ' data-fileid="{fileid}" data-template="{template}"', teContent = '<td class="kv-file-content">\n';
    $.fn.fileinputThemes['explorer-fas'] = {
        layoutTemplates: {
            preview: '<div class="file-preview {class}">\n' +
            '    {close}' +
            '    <div class="{dropClass}">\n' +
            '    <table class="table table-bordered table-hover"><tbody class="file-preview-thumbnails">\n' +
            '    </tbody></table>\n' +
            '    <div class="clearfix"></div>' +
            '    <div class="file-preview-status text-center text-success"></div>\n' +
            '    <div class="kv-fileinput-error"></div>\n' +
            '    </div>\n' +
            '</div>',
            footer: '<td class="file-details-cell"><div class="explorer-caption" title="{caption}">{caption}</div> ' +
            '{size}{progress}</td><td class="file-actions-cell">{indicator} {actions}</td>',
            actions: '{drag}\n' +
            '<div class="file-actions">\n' +
            '    <div class="file-footer-buttons">\n' +
            '        {upload} {download} {delete} {zoom} {other} ' +
            '    </div>\n' +
            '</div>',
            zoomCache: '<tr style="display:none" class="kv-zoom-cache-theme"><td>' +
            '<table class="kv-zoom-cache">{zoomContent}</table></td></tr>',
            fileIcon: '<i class="fas fa-file kv-caption-icon"></i> '
        },
        previewMarkupTags: {
            tagBefore1: teTagBef + '>' + teContent,
            tagBefore2: teTagBef + ' title="{caption}">' + teContent,
            tagAfter: '</td>\n{footer}</tr>\n'
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
            removeIcon: '<i class="fas fa-trash-alt"></i>',
            uploadIcon: '<i class="fas fa-upload"></i>',
            uploadRetryIcon: '<i class="fas fa-redo-alt"></i>',
            downloadIcon: '<i class="fas fa-download"></i>',
            zoomIcon: '<i class="fas fa-search-plus"></i>',
            dragIcon: '<i class="fas fa-arrows-alt"></i>',
            indicatorNew: '<i class="fas fa-plus-circle text-warning"></i>',
            indicatorSuccess: '<i class="fas fa-check-circle text-success"></i>',
            indicatorError: '<i class="fas fa-exclamation-circle text-danger"></i>',
            indicatorLoading: '<i class="fas fa-hourglass text-muted"></i>',
            indicatorPaused: '<i class="fa fa-pause text-info"></i>'
        },
        previewZoomButtonIcons: {
            prev: '<i class="fas fa-caret-left fa-lg"></i>',
            next: '<i class="fas fa-caret-right fa-lg"></i>',
            toggleheader: '<i class="fas fa-fw fa-arrows-alt-v"></i>',
            fullscreen: '<i class="fas fa-fw fa-arrows-alt"></i>',
            borderless: '<i class="fas fa-fw fa-external-link-alt"></i>',
            close: '<i class="fas fa-fw fa-times"></i>'
        },
        previewFileIcon: '<i class="fas fa-file"></i>',
        browseIcon: '<i class="fas fa-folder-open"></i>',
        removeIcon: '<i class="fas fa-trash-alt"></i>',
        cancelIcon: '<i class="fas fa-ban"></i>',
        pauseIcon: '<i class="fas fa-pause"></i>',
        uploadIcon: '<i class="fas fa-upload"></i>',
        msgValidationErrorIcon: '<i class="fas fa-exclamation-circle"></i> '
    };
})(window.jQuery);