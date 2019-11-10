/* global window alert jQuery gj */
/*
 * Gijgo JavaScript Library v0.6.2
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/** */
if (typeof(gj) === 'undefined') {
    gj = {};
}
if (typeof(gj.grid) === 'undefined') {
    gj.grid = {
        plugins: {}
    };
}

gj.grid.config = {
    base: {
        /** The data source of the widget which is used table rows. */
        dataSource: undefined,

        /** An array that holds the configurations of each column from the grid. */
        columns: [],

        /** Auto generate column for each field in the datasource when set to true. */
        autoGenerateColumns: false,

        /** An object that holds the default configuration settings of each column from the grid. */
        defaultColumnSettings: {

            /** If set to true the column will not be displayed in the grid. By default all columns are displayed. */
            hidden: false,

            /** The width of the column. Numeric values are treated as pixels.
             * If the width is undefined the width of the column is not set and depends on the with of the table(grid). */
            width: undefined,

            /** Indicates if the column is sortable.
             * If set to true the user can click the column header and sort the grid by the column source field. */
            sortable: false,

            /** Indicates the type of the column. */
            type: undefined,

            /** The caption that is going to be displayed in the header of the grid. */
            title: undefined,

            /** The field name to which the column is bound.
             * If the column.title is not defined this value is used as column.title. */
            field: undefined,

            /** This setting control the alignment of the text in the cell. */
            align: 'left',

            /** The name(s) of css class(es) that are going to be applied to all cells inside that column, except the header cell. */
            cssClass: undefined,

            /** The name(s) of css class(es) that are going to be applied to the header cell of that column. */
            headerCssClass: undefined,

            /** The text for the cell tooltip. */
            tooltip: undefined,

            /** Css class for icon that is going to be in use for the cell.
             * This setting can be in use only with combination of type icon. */
            icon: undefined,

            /** Configuration object with event names as keys and functions as values that are going to be bind to each cell from the column.
             * Each function is going to receive event information as a parameter with info in the "data" field for id, field name and record data. */
            events: undefined,

            /** Format the date when the type of the column is date.
             * This configuration setting is going to work only if you have implementation of format method for the Date object.
             * You can use external libraries like http://blog.stevenlevithan.com/archives/date-time-format for that. */
            format: undefined,

            /** Number of decimal digits after the decimal point. */
            decimalDigits: undefined,

            /** Template for the content in the column.
             * Use curly brackets "{}" to wrap the names of data source columns from server response. */
            tmpl: undefined,

            /** If set to true stop event propagation when event occur. */
            stopPropagation: false
        },

        mapping: {
            /** The name of the object in the server response, that contains array with records, that needs to be display in the grid. */
            dataField: 'records',

            /** The name of the object in the server response, that contains the number of all records on the server. */
            totalRecordsField: 'total'
        },

        params: {},

        defaultParams: {

            /** The name of the parameter that is going to send the name of the column for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use. */
            sortBy: 'sortBy',

            /** The name of the parameter that is going to send the direction for sorting.
             * The "sortable" setting for at least one column should be enabled in order this parameter to be in use. */
            direction: 'direction',

            /** The name of the parameter that is going to send the number of the page.
             * The pager should be enabled in order this parameter to be in use. */
            page: 'page',

            /** The name of the parameter that is going to send the maximum number of records per page.
             * The pager should be enabled in order this parameter to be in use. */
            limit: 'limit'
        },

        /** The name of the UI library that is going to be in use. Currently we support only jQuery UI and bootstrap. */
        uiLibrary: 'base',

        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid-table gj-grid-base-table',
            loadingCover: 'gj-grid-loading-cover',
            loadingText: 'gj-grid-loading-text',
            header: {
                cell: undefined,
                sortable: 'gj-cursor-pointer',
                sortAscIcon: '',
                sortDescIcon: ''
            },
            content: {
                rowHover: undefined,
                rowSelected: 'gj-grid-base-active'
            }
        },

        /** The type of the row selection.<br/>
         * If the type is set to multiple the user will be able to select more then one row from the grid. */
        selectionType: 'single',

        /** The type of the row selection mechanism. */
        selectionMethod: 'basic',

        /** When this setting is enabled the content of the grid will be loaded automatically after the creation of the grid. */
        autoLoad: true,

        /** The text that is going to be displayed if the grid is empty. */
        notFoundText: 'No records found.',

        /** Width of the grid. */
        width: undefined,

        /** Minimum width of the grid. */
        minWidth: undefined,

        /** The size of the font in the grid. */
        fontSize: undefined,

        /** Name of column that contains the record id.  */
        primaryKey: undefined
    },

    jqueryui: {
        style: {
            table: 'gj-grid-table ui-widget-content gj-grid-ui-table',
            header: {
                cell: 'ui-widget-header ui-state-default gj-grid-ui-thead-th',
                sortable: 'gj-cursor-pointer',
                sortAscIcon: 'gj-grid-ui-thead-th-sort-icon ui-icon ui-icon-arrowthick-1-s',
                sortDescIcon: 'gj-grid-ui-thead-th-sort-icon ui-icon ui-icon-arrowthick-1-n'
            },
            content: {
                rowHover: 'ui-state-hover',
                rowSelected: 'ui-state-active'
            }
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-grid-wrapper',
            table: 'gj-grid-table table table-bordered table-hover',
            header: {
                cell: 'gj-grid-bootstrap-thead-cell',
                sortable: 'gj-cursor-pointer',
                sortAscIcon: 'glyphicon glyphicon-sort-by-alphabet',
                sortDescIcon: 'glyphicon glyphicon-sort-by-alphabet-alt'
            },
            content: {
                rowHover: '',
                rowSelected: 'active'
            }
        }
    }
};

/** */
gj.grid.events = {
    /**
     * Event fires before addition of an empty row to the grid. */
    beforeEmptyRowInsert: function ($grid, $row) {
        $grid.trigger('beforeEmptyRowInsert', [$row]);
    },

    /**
     * Event fired before data binding takes place.
     * */
    dataBinding: function ($grid, records) {
        $grid.trigger('dataBinding', [records]);
    },

    /**
     * Event fires after the loading of the data in the grid.
     * */
    dataBound: function ($grid, records, totalRecords) {
        $grid.trigger('dataBound', [records, totalRecords]);
    },

    /**
     * Event fires after insert of a row in the grid during the loading of the data. */
    rowDataBound: function ($grid, $row, id, record) {
        $grid.trigger('rowDataBound', [$row, id, record]);
    },

    /**
     * Event fires after insert of a cell in the grid during the loading of the data
     * */
    cellDataBound: function ($grid, $wrapper, id, column, record) {
        $grid.trigger('cellDataBound', [$wrapper, id, column, record]);
    },

    /**
     * Event fires on selection of row
     * */
    rowSelect: function ($grid, $row, id, record) {
        $grid.trigger('rowSelect', [$row, id, record]);
    },

    /**
     * Event fires on un selection of row
     * */
    rowUnselect: function ($grid, $row, id, record) {
        $grid.trigger('rowUnselect', [$row, id, record]);

    },

    /**
     * Event fires before deletion of row in the grid. */
    rowRemoving: function ($grid, $row, id, record) {
        $grid.trigger('rowRemoving', [$row, id, record]);
    },

    /**
     * Event fires when the grid.destroy method is called.
     * */
    destroying: function ($grid) {
        $grid.trigger('destroying');
    },

    /**
     * Event fires when column is hidding
     * */
    columnHide: function ($grid, column) {
        $grid.trigger('columnHide', [column]);
    },

    /**
     * Event fires when column is showing
     * */
    columnShow: function ($grid, column) {
        $grid.trigger('columnShow', [column]);
    },

    /**
     * Event fires when grid is initialized.
     * */
    initialized: function ($grid) {
        $grid.trigger('initialized');
    }
};

/*global gj $*/
gj.grid.methods = {

    init: function (jsConfig) {
        var clientConfig, plugin, option, data;

        clientConfig = $.extend(true, {}, gj.grid.methods.getHTMLConfiguration(this) || {});
        $.extend(true, clientConfig, jsConfig || {});

        gj.grid.methods.configure(this, clientConfig);
        //Initialize all plugins
        for (plugin in gj.grid.plugins) {
            if (gj.grid.plugins.hasOwnProperty(plugin)) {
                gj.grid.plugins[plugin].configure(this, clientConfig);
            }
        }
        data = this.data();
        //Initialize events configured as options
        for (option in data) {
            if (gj.grid.events.hasOwnProperty(option)) {
                this.on(option, data[option]);
                delete data[option];
            }
        }
        gj.grid.methods.initialize(this);
        this.attr('data-initialized', true);

        if (data.autoLoad) {
            this.reload();
        }
        return this;
    },

    configure: function ($grid, clientConfig) {
        var options = $.extend(true, {}, gj.grid.config.base),
            uiLibrary = clientConfig.uiLibrary || options.uiLibrary;
        if (gj.grid.config[uiLibrary]) {
            $.extend(true, options, gj.grid.config[uiLibrary]);
        }
        for (plugin in gj.grid.plugins) {
            if (gj.grid.plugins.hasOwnProperty(plugin)) {
                if (gj.grid.plugins[plugin].config.base) {
                    $.extend(true, options, gj.grid.plugins[plugin].config.base);
                }
                if (gj.grid.plugins[plugin].config[uiLibrary]) {
                    $.extend(true, options, gj.grid.plugins[plugin].config[uiLibrary]);
                }
            }
        }
        $.extend(true, options, clientConfig);
        gj.grid.methods.setDefaultColumnConfig(options.columns, options.defaultColumnSettings);
        $grid.data(options);
    },

    setDefaultColumnConfig: function (columns, defaultColumnSettings) {
        var column, i;
        if (columns && columns.length) {
            for (i = 0; i < columns.length; i++) {
                column = $.extend(true, {}, defaultColumnSettings);
                $.extend(true, column, columns[i]);
                columns[i] = column;
            }
        }
    },

    getHTMLConfiguration: function ($grid) {
        var result = gj.grid.methods.getAttributes($grid);
        if (result && result.source) {
            result.dataSource = result.source;
            delete result.source;
        }
        result.columns = [];
        $grid.find('thead > tr > th').each(function () {
            var $el = $(this),
                title = $el.text(),
                config = gj.grid.methods.getAttributes($el);
            config.title = title;
            if (!config.field) {
                config.field = title;
            }
            if (config.events) {
                config.events = gj.grid.methods.eventsParser(config.events);
            }
            result.columns.push(config);
        });
        return result;
    },

    getAttributes: function ($el) {
        var result = $el.data(),
            width = $el.attr('width');
        if (width) {
            result.width = width;
        }
        return result;
    },

    eventsParser: function (events) {
        var result = {}, list, i, key, func, position;
        list = events.split(',');
        for (i = 0; i < list.length; i++) {
            position = list[i].indexOf(':');
            if (position > 0) {
                key = $.trim(list[i].substr(0, position));
                func = $.trim(list[i].substr(position + 1, list[i].length));
                result[key] = eval('window.' + func); //window[func]; //TODO: eveluate functions from string
            }
        }
        return result;
    },

    defaultSuccessHandler: function ($grid) {
        return function (response) {
            $grid.render(response);
        };
    },

    initialize: function ($grid) {
        var data = $grid.data(),
            $wrapper = $grid.parent('div[data-role="wrapper"]');

        if ($wrapper.length === 0) {
            $wrapper = $('<div data-role="wrapper" />').addClass(data.style.wrapper); //The css class needs to be added before the wrapping, otherwise doesn't work.
            $grid.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }

        if (data.width) {
            $grid.parent().css('width', data.width);
        }
        if (data.minWidth) {
            $grid.css('min-width', data.minWidth);
        }
        if (data.fontSize) {
            $grid.css('font-size', data.fontSize);
        }
        $grid.addClass(data.style.table);
        if ('checkbox' === data.selectionMethod) {
            data.columns = [{ title: '', field: data.primaryKey, width: (data.uiLibrary === 'jqueryui' ? 24 : 30), align: 'center', type: 'checkbox' }].concat(data.columns);
        }
        $grid.append($('<tbody/>'));

        gj.grid.methods.renderHeader($grid);
        gj.grid.methods.appendEmptyRow($grid, '&nbsp;');
        gj.grid.events.initialized($grid);
    },

    renderHeader: function ($grid) {
        var data, columns, style, $thead, $row, $cell, i, $checkAllBoxes;

        data = $grid.data();
        columns = data.columns;
        style = data.style.header;
        sortBy = data.params[data.defaultParams.sortBy];
        direction = data.params[data.defaultParams.direction];

        $thead = $grid.children('thead');
        if ($thead.length === 0) {
            $thead = $('<thead />');
            $grid.prepend($thead);
        }

        $row = $('<tr/>');
        for (i = 0; i < columns.length; i += 1) {
            $cell = $('<th/>');
            if (columns[i].width) {
                $cell.attr('width', columns[i].width);
            }
            $cell.addClass(style.cell);
            if (columns[i].headerCssClass) {
                $cell.addClass(columns[i].headerCssClass);
            }
            $cell.css('text-align', columns[i].align || 'left');
            if (columns[i].sortable) {
                $cell.addClass(style.sortable);
                $cell.on('click', gj.grid.methods.createSortHandler($grid, $cell));
            }
            if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType && 'checkbox' === columns[i].type) {
                $checkAllBoxes = $cell.find('input[id="checkAllBoxes"]'); //TODO: use data-role instead of id. this is going to cause some other bugs.
                if ($checkAllBoxes.length === 0) {
                    $checkAllBoxes = $('<input type="checkbox" id="checkAllBoxes" />');
                    $cell.append($checkAllBoxes);
                }
                $checkAllBoxes.hide().off('click').on('click', function () {
                    if (this.checked) {
                        $grid.selectAll();
                    } else {
                        $grid.unSelectAll();
                    }
                });
            } else {
                $cell.append($('<div style="float: left"/>').text(typeof (columns[i].title) === 'undefined' ? columns[i].field : columns[i].title));
            }
            if (columns[i].hidden) {
                $cell.hide();
            }

            $cell.data('cell', columns[i]);
            $row.append($cell);
        }

        $thead.empty().append($row);
    },

    createSortHandler: function ($grid, $cell) {
        return function () {
            var $sortIcon, data, cellData, style, params = {};
            if ($grid.count() > 0) {
                data = $grid.data();
                cellData = $cell.data('cell');
                cellData.direction = (cellData.direction === 'asc' ? 'desc' : 'asc');
                if ($.isArray(data.dataSource)) {
                    if (cellData.direction === 'asc') {
                        data.dataSource.sort(function compare(a, b) {
                            return ((a[cellData.field] < b[cellData.field]) ? -1 : ((a[cellData.field] > b[cellData.field]) ? 1 : 0));
                        });
                    } else {
                        data.dataSource.sort(function compare(a, b) {
                            return ((a[cellData.field] > b[cellData.field]) ? -1 : ((a[cellData.field] < b[cellData.field]) ? 1 : 0));
                        });
                    }
                } else {
                    params[data.defaultParams.sortBy] = cellData.field;
                    params[data.defaultParams.direction] = cellData.direction;
                }

                style = data.style.header;
                $cell.siblings().find('span[data-role="sorticon"]').remove();
                $sortIcon = $cell.children('span[data-role="sorticon"]');
                if ($sortIcon.length === 0) {
                    $sortIcon = $('<span data-role="sorticon" style="float: left; margin-left:5px;"/>');
                    $cell.append($sortIcon);
                }

                if ('asc' === cellData.direction) {
                    $sortIcon.empty().removeClass(style.sortDescIcon);
                    if (style.sortAscIcon) {
                        $sortIcon.addClass(style.sortAscIcon);
                    } else {
                        $sortIcon.text('▲');
                    }
                } else {
                    $sortIcon.empty().removeClass(style.sortAscIcon);
                    if (style.sortDescIcon) {
                        $sortIcon.addClass(style.sortDescIcon);
                    } else {
                        $sortIcon.text('▼');
                    }
                }

                $grid.reload(params);
            }
        };
    },

    startLoading: function ($grid) {
        var $tbody, $cover, $loading, width, height, top, data;
        gj.grid.methods.stopLoading($grid);
        data = $grid.data();
        if (0 === $grid.outerHeight()) {
            return;
        }
        $tbody = $grid.children('tbody');
        width = $tbody.outerWidth(false);
        height = $tbody.outerHeight(false);
        top = $tbody.prevAll().outerHeight(true) + $grid.prevAll().outerHeight(true) + parseInt($grid.parent().css('padding-top').replace('px', ''), 10);
        $cover = $('<div data-role="loading-cover" />').addClass(data.style.loadingCover).css({
            width: width,
            height: height,
            top: top
        });
        $loading = $('<div data-role="loading-text">Loading...</div>').addClass(data.style.loadingText);
        $loading.insertAfter($grid);
        $cover.insertAfter($grid);
        $loading.css({
            top: top + (height / 2) - ($loading.outerHeight(false) / 2),
            left: (width / 2) - ($loading.outerWidth(false) / 2)
        });
    },

    stopLoading: function ($grid) {
        $grid.parent().find('div[data-role="loading-cover"]').remove();
        $grid.parent().find('div[data-role="loading-text"]').remove();
    },

    createAddRowHoverHandler: function ($row, cssClass) {
        return function () {
            $row.addClass(cssClass);
        };
    },

    createRemoveRowHoverHandler: function ($row, cssClass) {
        return function () {
            $row.removeClass(cssClass);
        };
    },

    appendEmptyRow: function ($grid, caption) {
        var data, $row, $cell, $wrapper;
        data = $grid.data();
        $row = $('<tr data-role="empty"/>');
        $cell = $('<td/>').css({ width: '100%', 'text-align': 'center' });
        $cell.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
        $wrapper = $('<div />').html(caption || data.notFoundText);
        $cell.append($wrapper);
        $row.append($cell);

        gj.grid.events.beforeEmptyRowInsert($grid, $row);

        $grid.append($row);
    },

    autoGenerateColumns: function ($grid, records) {
        var names, value, type, i, data = $grid.data();
        data.columns = [];
        if (records.length > 0) {
            names = Object.getOwnPropertyNames(records[0]);
            for (i = 0; i < names.length; i++) {
                value = records[0][names[i]];
                type = 'text';
                if (value) {
                    if (typeof value === 'number') {
                        type = 'number';
                    } else if (value.indexOf('/Date(') > -1) {
                        type = 'date';
                    }
                }
                data.columns.push({ field: names[i], type: type });
            }
            gj.grid.methods.setDefaultColumnConfig(data.columns, data.defaultColumnSettings);
        }
        gj.grid.methods.renderHeader($grid);
    },

    loadData: function ($grid) {
        var data, records, i, recLen, rowCount, $tbody, $rows, $row, $checkAllBoxes;

        data = $grid.data();
        records = gj.grid.methods.getRecordsForRendering($grid);
        gj.grid.events.dataBinding($grid, records);
        recLen = records.length;
        gj.grid.methods.stopLoading($grid);

        if (data.autoGenerateColumns) {
            gj.grid.methods.autoGenerateColumns($grid, records);
        }

        $tbody = $grid.find('tbody');
        if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType) {
            $checkAllBoxes = $grid.find('input#checkAllBoxes');
            $checkAllBoxes.prop('checked', false);
            if (0 === recLen) {
                $checkAllBoxes.hide();
            } else {
                $checkAllBoxes.show();
            }
        }
        $tbody.find('tr[data-role="empty"]').remove();
        if (0 === recLen) {
            $tbody.empty();
            gj.grid.methods.appendEmptyRow($grid);
        }

        $rows = $tbody.children('tr');
        rowCount = $rows.length;

        for (i = 0; i < rowCount; i++) {
            if (i < recLen) {
                $row = $rows.eq(i);
                gj.grid.methods.renderRow($grid, $row, records[i], i);
            } else {
                $tbody.find('tr:gt(' + (i - 1) + ')').remove();
                break;
            }
        }

        for (i = rowCount; i < recLen; i++) {
            gj.grid.methods.renderRow($grid, null, records[i], i);
        }
        gj.grid.events.dataBound($grid, records, data.totalRecords);
    },

    getId: function (record, primaryKey, position) {
        return (primaryKey && record[primaryKey]) ? record[primaryKey] : position;
    },

    renderRow: function ($grid, $row, record, position) {
        var id, $cell, i, data, mode;
        data = $grid.data();
        if (!$row || $row.length === 0) {
            mode = 'create';
            $row = $($grid.find('tbody')[0].insertRow(position));
            $row.attr('data-role', 'row');
            $row.on('mouseenter', gj.grid.methods.createAddRowHoverHandler($row, data.style.content.rowHover));
            $row.on('mouseleave', gj.grid.methods.createRemoveRowHoverHandler($row, data.style.content.rowHover));
        } else {
            mode = 'update';
            $row.removeClass(data.style.content.rowSelected).off('click');
        }
        id = gj.grid.methods.getId(record, data.primaryKey, (position + 1));
        $row.attr('data-position', position + 1); //$row.data('row', { id: id, record: record });
        $row.on('click', gj.grid.methods.createRowClickHandler($grid, id));
        for (i = 0; i < data.columns.length; i++) {
            if (mode === 'update') {
                $cell = $row.find('td:eq(' + i + ')');
                gj.grid.methods.renderCell($grid, $cell, data.columns[i], record, id);
            } else {
                $cell = gj.grid.methods.renderCell($grid, null, data.columns[i], record, id);
                $row.append($cell);
            }
        }
        gj.grid.events.rowDataBound($grid, $row, id, record);
    },

    renderCell: function ($grid, $cell, column, record, id, mode) {
        var text, $wrapper, key;

        if (!$cell || $cell.length === 0) {
            $cell = $('<td/>').css('text-align', column.align || 'left');
            $wrapper = $('<div data-role="display" />');
            if (column.cssClass) {
                $cell.addClass(column.cssClass);
            }
            $cell.append($wrapper);
            mode = 'create';
        } else {
            $wrapper = $cell.find('div[data-role="display"]');
            mode = 'update';
        }

        if ('checkbox' === column.type) {
            if ('create' === mode) {
                $wrapper.append($('<input />').attr('type', 'checkbox').val(id));
            } else {
                $wrapper.find('input[type="checkbox"]').val(id).prop('checked', false);
            }
        } else if ('icon' === column.type) {
            if ('create' === mode) {
                $wrapper.append($('<span/>')
                    .addClass($grid.data().uiLibrary === 'bootstrap' ? 'glyphicon' : 'ui-icon')
                    .addClass(column.icon).css({ cursor: 'pointer' }));
                column.stopPropagation = true;
            }
        } else if (column.tmpl) {
            text = column.tmpl;
            column.tmpl.replace(/\{(.+?)\}/g, function ($0, $1) {
                text = text.replace($0, gj.grid.methods.formatText(record[$1], column));
            });
            $wrapper.html(text);
        } else {
            gj.grid.methods.setCellText($wrapper, column, record[column.field]);
        }
        if (column.tooltip && 'create' === mode) {
            $wrapper.attr('title', column.tooltip);
        }
        //remove all event handlers
        if ('update' === mode) {
            $cell.off();
            $wrapper.off();
        }
        if (column.events) {
            for (key in column.events) {
                if (column.events.hasOwnProperty(key)) {
                    $cell.on(key, { id: id, field: column.field, record: record }, function (e) {
                        if (column.stopPropagation) {
                            e.stopPropagation();
                        }
                        column.events[key].call(this, e);
                    });
                }
            }
        }
        if (column.hidden) {
            $cell.hide();
        }

        gj.grid.events.cellDataBound($grid, $wrapper, id, column, record);

        return $cell;
    },

    setCellText: function ($wrapper, column, value) {
        var text = gj.grid.methods.formatText(value, column);
        if (!column.tooltip) {
            $wrapper.attr('title', text);
        }
        $wrapper.text(text);
    },

    formatText: function (text, column) {
        var dt, day, month, parts;
        if (text && column.type) {
            switch (column.type) {
            case 'date':
                if (text.indexOf('/Date(') > -1) {
                    dt = new Date(parseInt(text.substr(6), 10));
                } else {
                    parts = text.match(/(\d+)/g);
                    // new Date(year, month, date, hours, minutes, seconds);
                    dt = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]); // months are 0-based
                }

                if (dt.format && column.format) {
                    text = dt.format(column.format); //using 3rd party plugin "Date Format 1.2.3 by (c) 2007-2009 Steven Levithan <stevenlevithan.com>"
                } else {
                    day = dt.getDate().toString().length === 2 ? dt.getDate() : '0' + dt.getDate();
                    month = (dt.getMonth() + 1).toString();
                    month = month.length === 2 ? month : '0' + month;
                    text = month + '/' + day + '/' + dt.getFullYear();
                }
                break;
            }
        } else {
            text = (typeof (text) === 'undefined' || text === null) ? '' : text.toString();
        }
        if (column.decimalDigits && text) {
            text = parseFloat(text).toFixed(column.decimalDigits);
        }
        return text;
    },

    getRecordsForRendering: function ($grid) {
        return $grid.data('records');
    },

    setRecordsData: function ($grid, response) {
        var records = [],
            totalRecords = 0,
            data = $grid.data();
        if ($.isArray(response)) {
            records = response;
            totalRecords = response.length;
        } else if (data && data.mapping && $.isArray(response[data.mapping.dataField])) {
            records = response[data.mapping.dataField];
            totalRecords = response[data.mapping.totalRecordsField];
            if (!totalRecords || isNaN(totalRecords)) {
                totalRecords = 0;
            }
        }
        $grid.data('records', records);
        $grid.data('totalRecords', totalRecords);
        return records;
    },

    createRowClickHandler: function ($grid, id) {
        return function () {
            gj.grid.methods.setSelected($grid, id, $(this));
        };
    },

    selectRow: function ($grid, data, $row, id) {
        $row.addClass(data.style.content.rowSelected);

        gj.grid.events.rowSelect($grid, $row, id, $grid.getById(id));

        if ('checkbox' === data.selectionMethod) {
            $row.find('td:nth-child(1) input[type="checkbox"]').prop('checked', true);
        }
    },

    unselectRow: function ($grid, data, $row, id) {
        if ($row.hasClass(data.style.content.rowSelected)) {
            $row.removeClass(data.style.content.rowSelected);

            gj.grid.events.rowUnselect($grid, $row, id, $grid.getById(id));

            if ('checkbox' === data.selectionMethod) {
                $row.find('td:nth-child(1) input[type="checkbox"]').prop('checked', false);
            }
        }
    },

    setSelected: function ($grid, id, $row) {
        var data = $grid.data();
        if (!$row || !$row.length) {
            $row = gj.grid.methods.getRowById($grid, id);
        }
        if ($row) {
            if ($row.hasClass(data.style.content.rowSelected)) {
                gj.grid.methods.unselectRow($grid, data, $row, id);
            } else {
                if ('single' === data.selectionType) {
                    $row.siblings().each(function () {
                        var $row = $(this),
                            id = gj.grid.methods.getId($row, data.primaryKey, $row.data('position'));
                        gj.grid.methods.unselectRow($grid, data, $row, id);
                    });
                }
                gj.grid.methods.selectRow($grid, data, $row, id);
            }
        }
        return $grid;
    },

    selectAll: function ($grid) {
        var data = $grid.data();
        $grid.find('thead input#checkAllBoxes').prop('checked', true);
        $grid.find('tbody tr').each(function () {
            var $row = $(this);
            gj.grid.methods.selectRow($grid, data, $row, $grid.get($row.data('position')));
        });
        return $grid;
    },

    unSelectAll: function ($grid) {
        var data = $grid.data();
        $grid.find('thead input#checkAllBoxes').prop('checked', false);
        $grid.find('tbody tr').each(function () {
            var $row = $(this);
            gj.grid.methods.unselectRow($grid, data, $row, $grid.get($row.data('position')));
        });
        return $grid;
    },

    getSelected: function ($grid) {
        var result = null, selections, record, position;
        selections = $grid.find('tbody > tr.' + $grid.data().style.content.rowSelected);
        if (selections.length > 0) {
            position = $(selections[0]).data('position');
            record = $grid.get(position);
            result = gj.grid.methods.getId(record, $grid.data().primaryKey, position);
        }
        return result;
    },

    getSelectedRows: function ($grid) {
        var data = $grid.data();
        return $grid.find('tbody > tr.' + data.style.content.rowSelected);
    },

    getSelections: function ($grid) {
        var result = [], position, record, $selections = gj.grid.methods.getSelectedRows($grid);
        if (0 < $selections.length) {
            $selections.each(function () {
                position = $(this).data('position');
                record = $grid.get(position);
                result.push(gj.grid.methods.getId(record, $grid.data().primaryKey, position));
            });
        }
        return result;
    },

    getById: function ($grid, id) {
        var result = null, i, primaryKey = $grid.data('primaryKey'), records = $grid.data('records');
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] === id) {
                    result = records[i];
                    break;
                }
            }
        } else {
            result = $grid.get(id);
        }
        return result;
    },

    getRowById: function ($grid, id) {
        var records = $grid.data('records'), primaryKey = $grid.data('primaryKey'), position, i;
        if (primaryKey) {
            for (i = 0; i < records.length; i++) {
                if (records[i][primaryKey] === id) {
                    position = i + 1;
                    break;
                }
            }
        } else {
            position = id;
        }
        return $grid.find('tbody > tr[data-position="' + position + '"]');
    },

    getByPosition: function ($grid, position) {
        return $grid.data('records')[position - 1];
    },

    getColumnPosition: function (columns, field) {
        var position = -1, i;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].field === field) {
                position = i;
                break;
            }
        }
        return position;
    },

    getColumnInfo: function ($grid, field) {
        var i, result = {}, data = $grid.data();
        for (i = 0; i < data.columns.length; i += 1) {
            if (data.columns[i].field === field) {
                result = data.columns[i];
                break;
            }
        }
        return result;
    },

    getCell: function ($grid, id, index) {
        var position, $row;
        position = gj.grid.methods.getColumnPosition($grid, index);
        $row = gj.grid.methods.getRowById($grid, id);
        return $row.find('td:eq(' + position + ') div');
    },

    setCellContent: function ($grid, id, index, value) {
        var column, $cellWrapper = gj.grid.methods.getCell($grid, id, index);
        $cellWrapper.empty();
        if (typeof (value) === 'object') {
            $cellWrapper.append(value);
        } else {
            column = gj.grid.methods.getColumnInfo($grid, index);
            gj.grid.methods.setCellText($cellWrapper, column, value);
        }
    },

    clone: function (source) {
        var target = [];
        $.each(source, function () {
            target.push(this.clone());
        });
        return target;
    },

    getAll: function ($grid) {
        return $grid.data('records');
    },

    countVisibleColumns: function ($grid) {
        var columns, count, i;
        columns = $grid.data().columns;
        count = 0;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].hidden !== true) {
                count++;
            }
        }
        return count;
    },

    reload: function ($grid, params) {
        var data, ajaxOptions;
        data = $grid.data();
        $.extend(data.params, params);
        gj.grid.methods.startLoading($grid);
        if ($.isArray(data.dataSource)) {
            gj.grid.methods.setRecordsData($grid, data.dataSource);
            gj.grid.methods.loadData($grid);
        } else if (typeof(data.dataSource) === 'string') {
            ajaxOptions = { url: data.dataSource, data: data.params, success: gj.grid.methods.defaultSuccessHandler($grid) };
            if ($grid.xhr) {
                $grid.xhr.abort();
            }
            $grid.xhr = $.ajax(ajaxOptions);
        } else if (typeof (data.dataSource) === 'object') {
            if (!data.dataSource.data) {
                data.dataSource.data = {};
            }
            $.extend(data.dataSource.data, data.params);
            ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
            if (ajaxOptions.dataType === 'json' && typeof(ajaxOptions.data) === 'object') {
                ajaxOptions.data = JSON.stringify(ajaxOptions.data);
            }
            if (!ajaxOptions.success) {
                ajaxOptions.success = gj.grid.methods.defaultSuccessHandler($grid);
            }
            if ($grid.xhr) {
                $grid.xhr.abort();
            }
            $grid.xhr = $.ajax(ajaxOptions);
        }
        return $grid;
    },

    clear: function ($grid, showNotFoundText) {
        var data = $grid.data();
        $grid.xhr && $grid.xhr.abort();
        if ('checkbox' === data.selectionMethod) {
            $grid.find('input#checkAllBoxes').hide();
        }
        $grid.children('tbody').empty();
        gj.grid.methods.stopLoading($grid);
        gj.grid.methods.appendEmptyRow($grid, showNotFoundText ? data.notFoundText : '&nbsp;');
        gj.grid.events.dataBound($grid, [], 0);
        return $grid;
    },

    render: function ($grid, response) {
        if (response) {
            if (typeof(response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            records = gj.grid.methods.setRecordsData($grid, response);
            gj.grid.methods.loadData($grid);
        }
    },

    destroy: function ($grid, keepTableTag, keepWrapperTag) {
        var data = $grid.data();
        if (data) {
            gj.grid.events.destroying($grid);
            gj.grid.methods.stopLoading($grid);
            $grid.xhr && $grid.xhr.abort();
            $grid.off();
            if (keepWrapperTag === false && $grid.parent('div[data-role="wrapper"]').length > 0) {
                $grid.unwrap();
            }
            $grid.removeData();
            if (keepTableTag === false) {
                $grid.remove();
            } else {
                $grid.attr('data-initialized', false);
                $grid.removeClass().empty();
            }
        }
        return $grid;
    },

    showColumn: function ($grid, field) {
        var data = $grid.data(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            $grid.find('thead>tr>th:eq(' + position + ')').show();
            $.each($grid.find('tbody>tr'), function () {
                $(this).find('td:eq(' + position + ')').show();
            });
            data.columns[position].hidden = false;

            $cells = $grid.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }

            gj.grid.events.columnShow($grid, data.columns[position]);
        }

        return $grid;
    },

    hideColumn: function ($grid, field) {
        var data = $grid.data(),
            position = gj.grid.methods.getColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            $grid.find('thead>tr>th:eq(' + position + ')').hide();
            $.each($grid.find('tbody>tr'), function () {
                $(this).find('td:eq(' + position + ')').hide();
            });
            data.columns[position].hidden = true;

            $cells = $grid.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.methods.countVisibleColumns($grid));
            }

            gj.grid.events.columnHide($grid, data.columns[position]);
        }

        return $grid;
    },

    addRow: function ($grid, record) {
        $grid.data('records').push(record);
        $grid.data('totalRecords', $grid.data('totalRecords') + 1);
        $grid.reload();        
        return $grid;
    },

    updateRow: function ($grid, id, record) {
        var $row = gj.grid.methods.getRowById($grid, id);
        $grid.data('records')[$row.data('position') - 1] = record;
        gj.grid.methods.renderRow($grid, $row, record, $row.index());
        return $grid;
    },

    removeRow: function ($grid, id) {
        var position, records, $row = gj.grid.methods.getRowById($grid, id);
        if ($row) {
            position = $row.data('position');
            gj.grid.events.rowRemoving($grid, $row, id, $grid.get(position));
            records = $grid.data('records');
            records.splice(position - 1, 1);
            $grid.data('totalRecords', $grid.data('totalRecords') - 1);
            $grid.reload();
        }
        return $grid;
    }
};

/** */
function Grid($grid, arguments) {
    var self = this,
        methods = gj.grid.methods;

    self.xhr = null;

    /**
     * Reload the data in the grid from a data source. */
    self.reload = function (params) {
        return methods.reload(this, params);
    };

    /**
     * Clear the content in the grid. */
    self.clear = function (showNotFoundText) {
        return methods.clear(this, showNotFoundText);
    };

    /**
     * Return the number of records presented on the screen. */
    self.count = function () {
        //TODO: needs to be moved to methods
        return $(this).find('tbody tr[data-role="row"]').length;
    };

    /**
     * Render data in the grid */
    self.render = function (response) {
        return methods.render($grid, response);
    };

    /**
     * Destroy the grid. This method remove all data from the grid and all events attached to the grid. */
    self.destroy = function (keepTableTag, keepWrapperTag) {
        return methods.destroy(this, keepTableTag, keepWrapperTag);
    };

    /**
     * Select a row from the grid based on id parameter. */
    self.setSelected = function (id) {
        return methods.setSelected(this, id);
    };

    /**
     * Return the id of the selected record.
     * If the multiple selection method is one this method is going to return only the id of the first selected record. */
    self.getSelected = function () {
        return methods.getSelected(this);
    };

    /**
     * Return an array with the ids of the selected record. */
    self.getSelections = function () {
        return methods.getSelections(this);
    };

    /**
     * Select all records from the grid. */
    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all records from the grid. */
    self.unSelectAll = function () {
        return methods.unSelectAll(this);
    };

    /**
     * Return record by id of the record. */
    self.getById = function (id) {
        return methods.getById(this, id);
    };

    /**
     * Return record from the grid based on position. */
    self.get = function (position) {
        return methods.getByPosition(this, position);
    };

    /**
     * Return an array with all records presented in the grid. */
    self.getAll = function () {
        return methods.getAll(this);
    };

    /**
     * Show hidden column. */
    self.showColumn = function (field) {
        return methods.showColumn(this, field);
    };

    /**
     * Hide column from the grid. */
    self.hideColumn = function (field) {
        return methods.hideColumn(this, field);
    };

    /**
     * Add new row to the grid. */
    self.addRow = function (record) {
        return methods.addRow(this, record);
    };

    /**
     * Update row data. */
    self.updateRow = function (id, record) {
        return methods.updateRow(this, id, record);
    };

    //TODO: needs to be removed
    self.setCellContent = function (id, index, value) {
        methods.setCellContent(this, id, index, value);
    };

    /**
     * Remove row from the grid */
    self.removeRow = function (id) {
        return methods.removeRow(this, id);
    };

    $.extend($grid, self);
    if (true !== $grid.data('initialized')) {
        methods.init.apply($grid, arguments);
    }

    return $grid;
}

(function ($) {
    $.fn.grid = function (method) {
        var $grid;
        if (typeof method === 'object' || !method) {
            $grid = new Grid(this, arguments);
            return $grid;
        } else {
            $grid = new Grid(this, null);
            if ($grid[method]) {
                return $grid[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else {
                throw 'Method ' + method + ' does not exist.';
            }
        }
    };
})(jQuery);

