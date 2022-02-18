/*! FixedColumns 4.0.0
 * 2019-2021 SpryMedia Ltd - datatables.net/license
 */
import FixedColumns, { setJQuery as fixedColumnsJQuery } from './FixedColumns';
// DataTables extensions common UMD. Note that this allows for AMD, CommonJS
// (with window and jQuery being allowed as parameters to the returned
// function) or just default browser loading.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net'], function ($) {
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
                $ = require('datatables.net')(root, $).$;
            }
            return factory($, root, root.document);
        };
    }
    else {
        // Browser - assume jQuery has already been loaded
        factory(window.jQuery, window, document);
    }
}(function ($, window, document) {
    fixedColumnsJQuery($);
    var dataTable = $.fn.dataTable;
    $.fn.dataTable.FixedColumns = FixedColumns;
    $.fn.DataTable.FixedColumns = FixedColumns;
    var apiRegister = $.fn.dataTable.Api.register;
    apiRegister('fixedColumns()', function () {
        return this;
    });
    apiRegister('fixedColumns().left()', function (newVal) {
        var ctx = this.context[0];
        if (newVal !== undefined) {
            ctx._fixedColumns.left(newVal);
            return this;
        }
        else {
            return ctx._fixedColumns.left();
        }
    });
    apiRegister('fixedColumns().right()', function (newVal) {
        var ctx = this.context[0];
        if (newVal !== undefined) {
            ctx._fixedColumns.right(newVal);
            return this;
        }
        else {
            return ctx._fixedColumns.right();
        }
    });
    $.fn.dataTable.ext.buttons.fixedColumns = {
        action: function (e, dt, node, config) {
            if ($(node).attr('active')) {
                $(node).removeAttr('active').removeClass('active');
                dt.fixedColumns().left(0);
                dt.fixedColumns().right(0);
            }
            else {
                $(node).attr('active', true).addClass('active');
                dt.fixedColumns().left(config.config.left);
                dt.fixedColumns().right(config.config.right);
            }
        },
        config: {
            left: 1,
            right: 0
        },
        init: function (dt, node, config) {
            if (dt.settings()[0]._fixedColumns === undefined) {
                _init(dt.settings(), config);
            }
            $(node).attr('active', true).addClass('active');
            dt.button(node).text(config.text || dt.i18n('buttons.fixedColumns', dt.settings()[0]._fixedColumns.c.i18n.button));
        },
        text: null
    };
    function _init(settings, options) {
        if (options === void 0) { options = null; }
        var api = new dataTable.Api(settings);
        var opts = options
            ? options
            : api.init().fixedColumns || dataTable.defaults.fixedColumns;
        var fixedColumns = new FixedColumns(api, opts);
        return fixedColumns;
    }
    // Attach a listener to the document which listens for DataTables initialisation
    // events so we can automatically initialise
    $(document).on('init.dt.dtfc', function (e, settings) {
        if (e.namespace !== 'dt') {
            return;
        }
        if (settings.oInit.fixedColumns ||
            dataTable.defaults.fixedColumns) {
            if (!settings._fixedColumns) {
                _init(settings, null);
            }
        }
    });
}));
