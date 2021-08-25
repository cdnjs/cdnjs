/*! Bootstrap 5 integration for DataTables' SearchPanes
 * ©2016 SpryMedia Ltd - datatables.net/license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net-bs5', 'datatables.net-searchpanes'], function ($) {
            return factory($, window, document);
        });
    }
    else if (typeof exports === 'object') {
        // CommonJS
        module.exports = function (root, $) {
            if (!root) {
                root = window;
            }
            if (!$ || !$.fn.dataTable) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                $ = require('datatables.net-bs5')(root, $).$;
            }
            if (!$.fn.dataTable.SearchPanes) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                require('datatables.net-searchpanes')(root, $);
            }
            return factory($, root, root.document);
        };
    }
    else {
        // Browser
        factory(jQuery, window, document);
    }
}(function ($, window, document) {
    'use strict';
    var dataTable = $.fn.dataTable;
    $.extend(true, dataTable.SearchPane.classes, {
        buttonGroup: 'btn-group',
        disabledButton: 'disabled',
        narrow: 'col',
        pane: {
            container: 'table'
        },
        paneButton: 'btn btn-light',
        pill: 'badge rounded-pill bg-secondary',
        search: 'form-control search',
        table: 'table table-sm table-borderless',
        topRow: 'dtsp-topRow'
    });
    $.extend(true, dataTable.SearchPanes.classes, {
        clearAll: 'dtsp-clearAll btn btn-light',
        collapseAll: 'dtsp-collapseAll btn btn-light',
        container: 'dtsp-searchPanes',
        disabledButton: 'disabled',
        panes: 'dtsp-panes dtsp-panesContainer',
        showAll: 'dtsp-showAll btn btn-light',
        title: 'dtsp-title',
        titleRow: 'dtsp-titleRow'
    });
    return dataTable.searchPanes;
}));
