/** 
 * jsPDF AutoTable plugin v2.0.24
 * Copyright (c) 2014 Simon Bengtsson, https://github.com/simonbengtsson/jsPDF-AutoTable 
 * 
 * Licensed under the MIT License. 
 * http://opensource.org/licenses/mit-license 
 * 
 * @preserve 
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jspdf')) :
    typeof define === 'function' && define.amd ? define(['jspdf'], factory) :
    (factory(global.jsPDF));
}(this, function (jsPDF) { 'use strict';

    jsPDF = 'default' in jsPDF ? jsPDF['default'] : jsPDF;

    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    babelHelpers;

    var Table = function Table() {
        babelHelpers.classCallCheck(this, Table);

        this.height = 0;
        this.width = 0;
        this.contentWidth = 0;
        this.rows = [];
        this.columns = [];
        this.headerRow = null;
        this.settings = {};
        this.pageCount = 1;
    };

    var Row = function Row(raw) {
        babelHelpers.classCallCheck(this, Row);

        this.raw = raw || {};
        this.index = 0;
        this.styles = {};
        this.cells = {};
        this.height = 0;
        this.y = 0;
    };

    var Cell = function Cell(raw) {
        babelHelpers.classCallCheck(this, Cell);

        this.raw = raw;
        this.styles = {};
        this.text = '';
        this.contentWidth = 0;
        this.textPos = {};
        this.height = 0;
        this.width = 0;
        this.x = 0;
        this.y = 0;
    };

    var Column = function Column(dataKey) {
        babelHelpers.classCallCheck(this, Column);

        this.dataKey = dataKey;
        this.options = {};
        this.styles = {};
        this.contentWidth = 0;
        this.width = 0;
        this.x = 0;
    };

    /**
     * Ratio between font size and font height. The number comes from jspdf's source code
     */
    var FONT_ROW_RATIO = 1.15;

    /**
     * Styles for the themes (overriding the default styles)
     */
    var themes = {
        'striped': {
            table: { fillColor: 255, textColor: 80, fontStyle: 'normal', fillStyle: 'F' },
            header: { textColor: 255, fillColor: [41, 128, 185], rowHeight: 23, fontStyle: 'bold' },
            body: {},
            alternateRow: { fillColor: 245 }
        },
        'grid': {
            table: { fillColor: 255, textColor: 80, fontStyle: 'normal', lineWidth: 0.1, fillStyle: 'DF' },
            header: { textColor: 255, fillColor: [26, 188, 156], rowHeight: 23, fillStyle: 'F', fontStyle: 'bold' },
            body: {},
            alternateRow: {}
        },
        'plain': {
            header: { fontStyle: 'bold' }
        }
    };

    function getDefaults() {
        return {
            // Styling
            theme: 'striped', // 'striped', 'grid' or 'plain'
            styles: {},
            headerStyles: {},
            bodyStyles: {},
            alternateRowStyles: {},
            columnStyles: {},

            // Properties
            startY: false, // false indicates the margin.top value
            margin: 40,
            pageBreak: 'auto', // 'auto', 'avoid', 'always'
            tableWidth: 'auto', // number, 'auto', 'wrap'

            // Hooks
            createdHeaderCell: function createdHeaderCell(cell, data) {},
            createdCell: function createdCell(cell, data) {},
            drawHeaderRow: function drawHeaderRow(row, data) {},
            drawRow: function drawRow(row, data) {},
            drawHeaderCell: function drawHeaderCell(cell, data) {},
            drawCell: function drawCell(cell, data) {},
            beforePageContent: function beforePageContent(data) {},
            afterPageContent: function afterPageContent(data) {}
        };
    }

    // Base style for all themes
    function defaultStyles() {
        return {
            cellPadding: 5,
            fontSize: 10,
            font: "helvetica", // helvetica, times, courier
            lineColor: 200,
            lineWidth: 0.1,
            fontStyle: 'normal', // normal, bold, italic, bolditalic
            overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
            fillColor: 255,
            textColor: 20,
            halign: 'left', // left, center, right
            valign: 'top', // top, middle, bottom
            fillStyle: 'F', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
            rowHeight: 20,
            columnWidth: 'auto'
        };
    }

    var Config = function () {
        function Config() {
            babelHelpers.classCallCheck(this, Config);
        }

        babelHelpers.createClass(Config, null, [{
            key: 'initSettings',
            value: function initSettings(userOptions) {
                var settings = Object.assign({}, getDefaults(), userOptions);

                // Options
                if (typeof settings.extendWidth !== 'undefined') {
                    settings.tableWidth = settings.extendWidth ? 'auto' : 'wrap';
                    console.error("Use of deprecated option: extendWidth, use tableWidth instead.");
                }
                if (typeof settings.margins !== 'undefined') {
                    if (typeof settings.margin === 'undefined') settings.margin = settings.margins;
                    console.error("Use of deprecated option: margins, use margin instead.");
                }

                [['padding', 'cellPadding'], ['lineHeight', 'rowHeight'], 'fontSize', 'overflow'].forEach(function (o) {
                    var deprecatedOption = typeof o === 'string' ? o : o[0];
                    var style = typeof o === 'string' ? o : o[1];
                    if (typeof settings[deprecatedOption] !== 'undefined') {
                        if (typeof settings.styles[style] === 'undefined') {
                            settings.styles[style] = settings[deprecatedOption];
                        }
                        console.error("Use of deprecated option: " + deprecatedOption + ", use the style " + style + " instead.");
                    }
                });

                // Unifying
                var marginSetting = settings.margin;
                settings.margin = {};
                if (typeof marginSetting.horizontal === 'number') {
                    marginSetting.right = marginSetting.horizontal;
                    marginSetting.left = marginSetting.horizontal;
                }
                if (typeof marginSetting.vertical === 'number') {
                    marginSetting.top = marginSetting.vertical;
                    marginSetting.bottom = marginSetting.vertical;
                }
                ['top', 'right', 'bottom', 'left'].forEach(function (side, i) {
                    if (typeof marginSetting === 'number') {
                        settings.margin[side] = marginSetting;
                    } else {
                        var key = Array.isArray(marginSetting) ? i : side;
                        settings.margin[side] = typeof marginSetting[key] === 'number' ? marginSetting[key] : 40;
                    }
                });

                return settings;
            }
        }, {
            key: 'styles',
            value: function styles(_styles) {
                _styles.unshift(defaultStyles());
                _styles.unshift({});
                return Object.assign.apply(this, _styles);
            }
        }]);
        return Config;
    }();

    var doc;
    var cursor;
    var styleModifiers;
    var pageSize;
    var settings;
    var table;
    // The current Table instance

    /**
     * Create a table from a set of rows and columns.
     *
     * @param {Object[]|String[]} headers Either as an array of objects or array of strings
     * @param {Object[][]|String[][]} data Either as an array of objects or array of strings
     * @param {Object} [options={}] Options that will override the default ones
     */
    jsPDF.API.autoTable = function (headers, data, options) {
        validateInput(headers, data, options);
        doc = this;

        pageSize = doc.internal.pageSize;
        styleModifiers = {
            fillColor: doc.setFillColor,
            textColor: doc.setTextColor,
            fontStyle: doc.setFontStyle,
            lineColor: doc.setDrawColor,
            lineWidth: doc.setLineWidth,
            font: doc.setFont,
            fontSize: doc.setFontSize
        };

        settings = Config.initSettings(options || {});

        // Need a cursor y as it needs to be reset after each page (row.y can't do that)
        // Also prefer cursor to column.x as the cursor is easier to modify in the hooks
        cursor = {
            x: settings.margin.left,
            y: settings.startY === false ? settings.margin.top : settings.startY
        };

        var userStyles = {
            textColor: 30, // Setting text color to dark gray as it can't be obtained from jsPDF
            fontSize: doc.internal.getFontSize(),
            fontStyle: doc.internal.getFont().fontStyle
        };

        // Create the table model with its columns, rows and cells
        createModels(headers, data);
        calculateWidths(this, pageSize.width);

        // Page break if there is room for only the first data row
        var firstRowHeight = table.rows[0] && settings.pageBreak === 'auto' ? table.rows[0].height : 0;
        var minTableBottomPos = settings.startY + settings.margin.bottom + table.headerRow.height + firstRowHeight;
        if (settings.pageBreak === 'avoid') {
            minTableBottomPos += table.height;
        }
        if (settings.pageBreak === 'always' && settings.startY !== false || settings.startY !== false && minTableBottomPos > pageSize.height) {
            this.addPage(this.addPage);
            cursor.y = settings.margin.top;
        }

        applyStyles(userStyles);
        settings.beforePageContent(hooksData());
        if (settings.drawHeaderRow(table.headerRow, hooksData({ row: table.headerRow })) !== false) {
            printRow(table.headerRow, settings.drawHeaderCell);
        }
        applyStyles(userStyles);
        printRows(this.addPage);
        settings.afterPageContent(hooksData());

        applyStyles(userStyles);

        return this;
    };

    /**
     * Returns the Y position of the last drawn cell
     * @returns int
     */
    jsPDF.API.autoTableEndPosY = function () {
        if (typeof cursor === 'undefined' || typeof cursor.y === 'undefined') {
            return 0;
        }
        return cursor.y;
    };

    /**
     * Parses an html table
     *
     * @param tableElem Html table element
     * @param includeHiddenRows Defaults to false
     * @returns Object Object with two properties, columns and rows
     */
    jsPDF.API.autoTableHtmlToJson = function (tableElem, includeHiddenRows) {
        includeHiddenRows = includeHiddenRows || false;

        var header = tableElem.rows[0];
        var result = { columns: [], rows: [] };

        for (var k = 0; k < header.cells.length; k++) {
            var cell = header.cells[k];
            var val = cell ? cell.textContent.trim() : '';
            result.columns.push(val);
        }

        for (var i = 1; i < tableElem.rows.length; i++) {
            var tableRow = tableElem.rows[i];
            var style = window.getComputedStyle(tableRow);
            if (includeHiddenRows || style.display !== 'none') {
                var rowData = [];
                for (var j = 0; j < header.cells.length; j++) {
                    var cell = tableRow.cells[j];
                    var val = cell ? cell.textContent.trim() : '';
                    rowData.push(val);
                }
                result.rows.push(rowData);
            }
        }

        result.data = result.rows; // Deprecated
        return result;
    };

    /**
     * Improved text function with halign and valign support
     * Inspiration from: http://stackoverflow.com/questions/28327510/align-text-right-using-jspdf/28433113#28433113
     */
    jsPDF.API.autoTableText = function (text, x, y, styles) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            console.error('The x and y parameters are required. Missing for the text: ', text);
        }
        var fontSize = this.internal.getFontSize() / this.internal.scaleFactor;

        // As defined in jsPDF source code
        var lineHeightProportion = FONT_ROW_RATIO;

        var splitRegex = /\r\n|\r|\n/g;
        var splittedText = null;
        var lineCount = 1;
        if (styles.valign === 'middle' || styles.valign === 'bottom' || styles.halign === 'center' || styles.halign === 'right') {
            splittedText = typeof text === 'string' ? text.split(splitRegex) : text;

            lineCount = splittedText.length || 1;
        }

        // Align the top
        y += fontSize * (2 - lineHeightProportion);

        if (styles.valign === 'middle') y -= lineCount / 2 * fontSize;else if (styles.valign === 'bottom') y -= lineCount * fontSize;

        if (styles.halign === 'center' || styles.halign === 'right') {
            var alignSize = fontSize;
            if (styles.halign === 'center') alignSize *= 0.5;

            if (lineCount >= 1) {
                for (var iLine = 0; iLine < splittedText.length; iLine++) {
                    this.text(splittedText[iLine], x - this.getStringUnitWidth(splittedText[iLine]) * alignSize, y);
                    y += fontSize;
                }
                return doc;
            }
            x -= this.getStringUnitWidth(text) * alignSize;
        }

        this.text(text, x, y);

        return this;
    };

    function validateInput(headers, data, options) {
        if (!headers || (typeof headers === 'undefined' ? 'undefined' : babelHelpers.typeof(headers)) !== 'object') {
            console.error("The headers should be an object or array, is: " + (typeof headers === 'undefined' ? 'undefined' : babelHelpers.typeof(headers)));
        }

        if (!data || (typeof data === 'undefined' ? 'undefined' : babelHelpers.typeof(data)) !== 'object') {
            console.error("The data should be an object or array, is: " + (typeof data === 'undefined' ? 'undefined' : babelHelpers.typeof(data)));
        }

        if (!!options && (typeof options === 'undefined' ? 'undefined' : babelHelpers.typeof(options)) !== 'object') {
            console.error("The data should be an object or array, is: " + (typeof data === 'undefined' ? 'undefined' : babelHelpers.typeof(data)));
        }

        if (!Array.prototype.forEach) {
            console.error("The current browser does not support Array.prototype.forEach which is required for " + "jsPDF-AutoTable. You can try polyfilling it by including this script " + "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill");
        }
    }

    /**
     * Create models from the user input
     *
     * @param inputHeaders
     * @param inputData
     */
    function createModels(inputHeaders, inputData) {
        table = new Table();

        var splitRegex = /\r\n|\r|\n/g;

        // Header row and columns
        var headerRow = new Row(inputHeaders);
        headerRow.index = -1;

        var themeStyles = Config.styles([themes[settings.theme].table, themes[settings.theme].header]);
        headerRow.styles = Object.assign({}, themeStyles, settings.styles, settings.headerStyles);

        // Columns and header row
        inputHeaders.forEach(function (rawColumn, dataKey) {
            if ((typeof rawColumn === 'undefined' ? 'undefined' : babelHelpers.typeof(rawColumn)) === 'object') {
                dataKey = typeof rawColumn.dataKey !== 'undefined' ? rawColumn.dataKey : rawColumn.key;
            }

            if (typeof rawColumn.width !== 'undefined') {
                console.error("Use of deprecated option: column.width, use column.styles.columnWidth instead.");
            }

            var col = new Column(dataKey);
            col.styles = settings.columnStyles[col.dataKey] || {};
            table.columns.push(col);

            var cell = new Cell();
            cell.raw = (typeof rawColumn === 'undefined' ? 'undefined' : babelHelpers.typeof(rawColumn)) === 'object' ? rawColumn.title : rawColumn;
            cell.styles = Object.assign({}, headerRow.styles);
            cell.text = '' + cell.raw;
            cell.contentWidth = cell.styles.cellPadding * 2 + getStringWidth(cell.text, cell.styles);
            cell.text = cell.text.split(splitRegex);

            headerRow.cells[dataKey] = cell;
            settings.createdHeaderCell(cell, { column: col, row: headerRow, settings: settings });
        });
        table.headerRow = headerRow;

        // Rows och cells
        inputData.forEach(function (rawRow, i) {
            var row = new Row(rawRow);
            var isAlternate = i % 2 === 0;
            var themeStyles = Config.styles([themes[settings.theme].table, isAlternate ? themes[settings.theme].alternateRow : {}]);
            var userStyles = Object.assign({}, settings.styles, settings.bodyStyles, isAlternate ? settings.alternateRowStyles : {});
            row.styles = Object.assign({}, themeStyles, userStyles);
            row.index = i;
            table.columns.forEach(function (column) {
                var cell = new Cell();
                cell.raw = rawRow[column.dataKey];
                cell.styles = Object.assign({}, row.styles, column.styles);
                cell.text = typeof cell.raw !== 'undefined' ? '' + cell.raw : ''; // Stringify 0 and false, but not undefined
                row.cells[column.dataKey] = cell;
                settings.createdCell(cell, hooksData({ column: column, row: row }));
                cell.contentWidth = cell.styles.cellPadding * 2 + getStringWidth(cell.text, cell.styles);
                cell.text = cell.text.split(splitRegex);
            });
            table.rows.push(row);
        });
    }

    /**
     * Calculate the column widths
     */
    function calculateWidths(doc, pageWidth) {
        // Column and table content width
        var tableContentWidth = 0;
        table.columns.forEach(function (column) {
            column.contentWidth = table.headerRow.cells[column.dataKey].contentWidth;
            table.rows.forEach(function (row) {
                var cellWidth = row.cells[column.dataKey].contentWidth;
                if (cellWidth > column.contentWidth) {
                    column.contentWidth = cellWidth;
                }
            });
            column.width = column.contentWidth;
            tableContentWidth += column.contentWidth;
        });
        table.contentWidth = tableContentWidth;

        var maxTableWidth = pageWidth - settings.margin.left - settings.margin.right;
        var preferredTableWidth = maxTableWidth; // settings.tableWidth === 'auto'
        if (typeof settings.tableWidth === 'number') {
            preferredTableWidth = settings.tableWidth;
        } else if (settings.tableWidth === 'wrap') {
            preferredTableWidth = table.contentWidth;
        }
        table.width = preferredTableWidth < maxTableWidth ? preferredTableWidth : maxTableWidth;

        // To avoid subjecting columns with little content with the chosen overflow method,
        // never shrink a column more than the table divided by column count (its "fair part")
        var dynamicColumns = [];
        var dynamicColumnsContentWidth = 0;
        var fairWidth = table.width / table.columns.length;
        var staticWidth = 0;
        table.columns.forEach(function (column) {
            var colStyles = Config.styles([themes[settings.theme].table, settings.styles, column.styles]);
            if (colStyles.columnWidth === 'wrap') {
                column.width = column.contentWidth;
            } else if (typeof colStyles.columnWidth === 'number') {
                column.width = colStyles.columnWidth;
            } else if (colStyles.columnWidth === 'auto' || true) {
                if (column.contentWidth <= fairWidth && table.contentWidth > table.width) {
                    column.width = column.contentWidth;
                } else {
                    dynamicColumns.push(column);
                    dynamicColumnsContentWidth += column.contentWidth;
                    column.width = 0;
                }
            }
            staticWidth += column.width;
        });

        // Distributes extra width or trims columns down to fit
        distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth);

        // Row height, table height and text overflow
        table.height = 0;
        var all = table.rows.concat(table.headerRow);
        all.forEach(function (row, i) {
            var lineBreakCount = 0;
            table.columns.forEach(function (col) {
                var cell = row.cells[col.dataKey];
                applyStyles(cell.styles);
                var textSpace = col.width - cell.styles.cellPadding * 2;
                if (cell.styles.overflow === 'linebreak') {
                    // Add one pt to textSpace to fix rounding error
                    try {
                        cell.text = doc.splitTextToSize(cell.text, textSpace + 1, { fontSize: cell.styles.fontSize });
                    } catch (e) {
                        if (e instanceof TypeError && Array.isArray(cell.text)) {
                            cell.text = doc.splitTextToSize(cell.text.join(' '), textSpace + 1, { fontSize: cell.styles.fontSize });
                        } else {
                            throw e;
                        }
                    }
                } else if (cell.styles.overflow === 'ellipsize') {
                    cell.text = ellipsize(cell.text, textSpace, cell.styles);
                } else if (cell.styles.overflow === 'visible') {
                    // Do nothing
                } else if (cell.styles.overflow === 'hidden') {
                        cell.text = ellipsize(cell.text, textSpace, cell.styles, '');
                    } else if (typeof cell.styles.overflow === 'function') {
                        cell.text = cell.styles.overflow(cell.text, textSpace);
                    } else {
                        console.error("Unrecognized overflow type: " + cell.styles.overflow);
                    }
                var count = Array.isArray(cell.text) ? cell.text.length - 1 : 0;
                if (count > lineBreakCount) {
                    lineBreakCount = count;
                }
            });

            row.heightStyle = row.styles.rowHeight;
            // TODO Pick the highest row based on font size as well
            row.height = row.heightStyle + lineBreakCount * row.styles.fontSize * FONT_ROW_RATIO;
            table.height += row.height;
        });
    }

    function distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth) {
        var extraWidth = table.width - staticWidth - dynamicColumnsContentWidth;
        for (var i = 0; i < dynamicColumns.length; i++) {
            var col = dynamicColumns[i];
            var ratio = col.contentWidth / dynamicColumnsContentWidth;
            // A column turned out to be none dynamic, start over recursively
            var isNoneDynamic = col.contentWidth + extraWidth * ratio < fairWidth;
            if (extraWidth < 0 && isNoneDynamic) {
                dynamicColumns.splice(i, 1);
                dynamicColumnsContentWidth -= col.contentWidth;
                col.width = fairWidth;
                staticWidth += col.width;
                distributeWidth(dynamicColumns, staticWidth, dynamicColumnsContentWidth, fairWidth);
                break;
            } else {
                col.width = col.contentWidth + extraWidth * ratio;
            }
        }
    }

    function addPage(jspdfAddPage) {
        settings.afterPageContent(hooksData());
        jspdfAddPage();
        table.pageCount++;
        cursor = { x: settings.margin.left, y: settings.margin.top };
        settings.beforePageContent(hooksData());
        if (settings.drawHeaderRow(table.headerRow, hooksData({ row: table.headerRow })) !== false) {
            printRow(table.headerRow, settings.drawHeaderCell);
        }
    }

    /**
     * Add a new page if cursor is at the end of page
     */
    function isNewPage(rowHeight) {
        var afterRowPos = cursor.y + rowHeight + settings.margin.bottom;
        return afterRowPos >= pageSize.height;
    }

    function printRows(jspdfAddPage) {
        table.rows.forEach(function (row, i) {
            if (isNewPage(row.height)) {
                var samePageThreshold = 3;
                // TODO Fix cell height > page height
                /*if (row.height > row.heightStyle * samePageThreshold) {
                    var remainingPageSpace = pageSize.height - cursor.y - settings.margin.bottom;
                    var lineCount = Math.floor(remainingPageSpace / (row.styles.fontSize * FONT_ROW_RATIO));
                    table.columns.forEach(function(col) {
                        var arr = row.cells[col.dataKey].text;
                        if (arr.length > lineCount) {
                            arr.splice(lineCount - 1, arr.length, "...");
                        }
                    });
                     row.height = remainingPageSpace;
                    if (settings.drawRow(row, hooksData({row: row})) !== false) {
                        printRow(row, settings.drawCell);
                    }
                    row = new Row(rawRow);
                }*/
                addPage(jspdfAddPage);
            }
            row.y = cursor.y;
            if (settings.drawRow(row, hooksData({ row: row })) !== false) {
                printRow(row, settings.drawCell);
            }
        });
    }

    function printRow(row, hookHandler) {
        cursor.x = settings.margin.left;
        for (var i = 0; i < table.columns.length; i++) {
            var column = table.columns[i];
            var cell = row.cells[column.dataKey];
            if (!cell) {
                continue;
            }
            applyStyles(cell.styles);

            cell.x = cursor.x;
            cell.y = cursor.y;
            cell.height = row.height;
            cell.width = column.width;

            if (cell.styles.valign === 'top') {
                cell.textPos.y = cursor.y + cell.styles.cellPadding;
            } else if (cell.styles.valign === 'bottom') {
                cell.textPos.y = cursor.y + row.height - cell.styles.cellPadding;
            } else {
                cell.textPos.y = cursor.y + row.height / 2;
            }

            if (cell.styles.halign === 'right') {
                cell.textPos.x = cell.x + cell.width - cell.styles.cellPadding;
            } else if (cell.styles.halign === 'center') {
                cell.textPos.x = cell.x + cell.width / 2;
            } else {
                cell.textPos.x = cell.x + cell.styles.cellPadding;
            }

            var data = hooksData({ column: column, row: row });
            if (hookHandler(cell, data) !== false) {
                doc.rect(cell.x, cell.y, cell.width, cell.height, cell.styles.fillStyle);
                doc.autoTableText(cell.text, cell.textPos.x, cell.textPos.y, {
                    halign: cell.styles.halign,
                    valign: cell.styles.valign
                });
            }
            cursor.x += cell.width;
        }

        cursor.y += row.height;
    }

    function applyStyles(styles) {
        Object.keys(styleModifiers).forEach(function (name) {
            var style = styles[name];
            var modifier = styleModifiers[name];
            if (typeof style !== 'undefined') {
                if (style.constructor === Array) {
                    modifier.apply(this, style);
                } else {
                    modifier(style);
                }
            }
        });
    }

    function hooksData(additionalData) {
        return Object.assign({
            pageCount: table.pageCount,
            settings: settings,
            table: table,
            cursor: cursor
        }, additionalData || {});
    }

    function getStringWidth(text, styles) {
        applyStyles(styles);
        var w = doc.getStringUnitWidth(text);
        return w * styles.fontSize;
    }

    /**
     * Ellipsize the text to fit in the width
     */
    function ellipsize(text, width, styles, ellipsizeStr) {
        ellipsizeStr = typeof ellipsizeStr !== 'undefined' ? ellipsizeStr : '...';

        if (Array.isArray(text)) {
            text.forEach(function (str, i) {
                text[i] = ellipsize(str, width, styles, ellipsizeStr);
            });
            return text;
        }

        if (width >= getStringWidth(text, styles)) {
            return text;
        }
        while (width < getStringWidth(text + ellipsizeStr, styles)) {
            if (text.length < 2) {
                break;
            }
            text = text.substring(0, text.length - 1);
        }
        return text.trim() + ellipsizeStr;
    }

    // Polyfills
    if (typeof Object.assign != 'function') {
        (function () {
            Object.assign = function (target) {
                'use strict';

                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }

    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

}));