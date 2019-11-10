/*!
 * TableExport.js v3.3.5 (https://www.travismclarke.com)
 * Copyright 2016 Travis Clarke
 * Licensed under the MIT license
 */

;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'jquery', 'blobjs', 'file-saverjs', 'xlsx-js'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('jquery'), require('blobjs'), require('file-saverjs'), require('xlsx-js'));
    } else {
        // Browser globals
        factory(root, root.jQuery, root.Blob, root.saveAs, root.XLSX);
    }
}(this, function (exports, $, Blob, saveAs, XLSX) {
        'use strict';
        /**
         * TableExport main plugin constructor
         * @param selectors {jQuery} jQuery selector(s)
         * @param options {Object} TableExport configuration options
         * @param isUpdate {Boolean}
         * @constructor
         */
        var TableExport = function (selectors, options, isUpdate) {

            var self = this;
            /**
             * TableExport configuration options (user-defined w/ default fallback)
             */
            self.settings = isUpdate ? options : $.extend({}, TableExport.prototype.defaults, options);
            /**
             * jQuery selectors (tables) to apply the plugin to
             */
            self.selectors = selectors;

            var rowD = TableExport.prototype.rowDel,
                ignoreRows = self.settings.ignoreRows instanceof Array ? self.settings.ignoreRows : [self.settings.ignoreRows],
                ignoreCols = self.settings.ignoreCols instanceof Array ? self.settings.ignoreCols : [self.settings.ignoreCols],
                ignoreCSS = self.settings.ignoreCSS instanceof Array ? self.settings.ignoreCSS.join(", ") : self.settings.ignoreCSS,
                emptyCSS = self.settings.emptyCSS instanceof Array ? self.settings.emptyCSS.join(", ") : self.settings.emptyCSS,
                bootstrapClass, bootstrapTheme, bootstrapSpacing;

            if (self.settings.bootstrap) {
                bootstrapClass = TableExport.prototype.bootstrap[0] + " ";
                bootstrapTheme = TableExport.prototype.bootstrap[1] + " ";
                bootstrapSpacing = TableExport.prototype.bootstrap[2] + " ";
            } else {
                bootstrapClass = TableExport.prototype.defaultButton + " ";
                bootstrapTheme = bootstrapSpacing = "";
            }

            self.selectors.each(function () {
                var $el = $(this);
                if (isUpdate) {
                    $el.find('caption:not(.head)').remove();
                }
                var $rows = $el.find('tbody').find('tr'),
                    $rows = self.settings.headings ? $rows.add($el.find('thead>tr')) : $rows,
                    $rows = self.settings.footers ? $rows.add($el.find('tfoot>tr')) : $rows,
                    thAdj = self.settings.headings ? $el.find('thead>tr').length : 0,
                    fileName = self.settings.fileName === "id" ? ($el.attr('id') ? $el.attr('id') : TableExport.prototype.defaultFileName) : self.settings.fileName,
                    exporters = {
                        xlsx: function (rDel, name) {
                            var rcMap = {},
                                dataURL = $rows.map(function (ir, val) {
                                    if (!!~ignoreRows.indexOf(ir - thAdj) || $(val).is(ignoreCSS)) {
                                        return;
                                    }
                                    var $cols = $(val).find('th, td');
                                    return [$cols.map(function (ic, val) {
                                        if (!!~ignoreCols.indexOf(ic) || $(val).is(ignoreCSS)) {
                                            return;
                                        }
                                        if ($(val).is(emptyCSS)) {
                                            return " "
                                        }
                                        if (val.hasAttribute('colspan')) {
                                            rcMap[ir] = rcMap[ir] || {};
                                            rcMap[ir][ic + 1] = val.getAttribute('colspan') - 1
                                        }
                                        if (val.hasAttribute('rowspan')) {
                                            for (var i = 1; i < val.getAttribute('rowspan'); i++) {
                                                rcMap[ir + i] = rcMap[ir + i] || {};
                                                rcMap[ir + i][ic] = 1
                                            }
                                        }
                                        if (rcMap[ir] && rcMap[ir][ic]) {
                                            return new Array(rcMap[ir][ic]).concat($(val).text());
                                        }
                                        return $(val).text();
                                    }).get()];
                                }).get(),
                                dataObject = TableExport.prototype.escapeHtml(
                                    JSON.stringify({
                                        data: dataURL,
                                        fileName: name,
                                        mimeType: TableExport.prototype.xlsx.mimeType,
                                        fileExtension: TableExport.prototype.xlsx.fileExtension
                                    })),
                                myContent = TableExport.prototype.xlsx.buttonContent,
                                myClass = TableExport.prototype.xlsx.defaultClass;
                            createObjButton(dataObject, myContent, myClass);
                        },
                        xlsm: function (rDel, name) {
                            var rcMap = {},
                                dataURL = $rows.map(function (ir, val) {
                                    if (!!~ignoreRows.indexOf(ir - thAdj) || $(val).is(ignoreCSS)) {
                                        return;
                                    }
                                    var $cols = $(val).find('th, td');
                                    return [$cols.map(function (ic, val) {
                                        if (!!~ignoreCols.indexOf(ic) || $(val).is(ignoreCSS)) {
                                            return;
                                        }
                                        if ($(val).is(emptyCSS)) {
                                            return " "
                                        }
                                        if (val.hasAttribute('colspan')) {
                                            rcMap[ir] = rcMap[ir] || {};
                                            rcMap[ir][ic + 1] = val.getAttribute('colspan') - 1
                                        }
                                        if (val.hasAttribute('rowspan')) {
                                            for (var i = 1; i < val.getAttribute('rowspan'); i++) {
                                                rcMap[ir + i] = rcMap[ir + i] || {};
                                                rcMap[ir + i][ic] = 1
                                            }
                                        }
                                        if (rcMap[ir] && rcMap[ir][ic]) {
                                            return new Array(rcMap[ir][ic]).concat($(val).text());
                                        }
                                        return $(val).text();
                                    }).get()];
                                }).get(),
                                dataObject = TableExport.prototype.escapeHtml(
                                    JSON.stringify({
                                        data: dataURL,
                                        fileName: name,
                                        mimeType: TableExport.prototype.xls.mimeType,
                                        fileExtension: TableExport.prototype.xls.fileExtension
                                    })),
                                myContent = TableExport.prototype.xls.buttonContent,
                                myClass = TableExport.prototype.xls.defaultClass;
                            createObjButton(dataObject, myContent, myClass);
                        },
                        xls: function (rdel, name) {
                            var colD = TableExport.prototype.xls.separator,
                                dataURL = $rows.map(function (i, val) {
                                    if (!!~ignoreRows.indexOf(i - thAdj) || $(val).is(ignoreCSS)) {
                                        return;
                                    }
                                    var $cols = $(val).find('th, td');
                                    return $cols.map(function (i, val) {
                                        if (!!~ignoreCols.indexOf(i) || $(val).is(ignoreCSS)) {
                                            return;
                                        }
                                        if ($(val).is(emptyCSS)) {
                                            return " "
                                        }
                                        return $(val).text();
                                    }).get().join(colD);
                                }).get().join(rdel),
                                dataObject = TableExport.prototype.escapeHtml(
                                    JSON.stringify({
                                        data: dataURL,
                                        fileName: name,
                                        mimeType: TableExport.prototype.xls.mimeType,
                                        fileExtension: TableExport.prototype.xls.fileExtension
                                    })),
                                myContent = TableExport.prototype.xls.buttonContent,
                                myClass = TableExport.prototype.xls.defaultClass;
                            createObjButton(dataObject, myContent, myClass);
                        },
                        csv: function (rdel, name) {
                            var colD = TableExport.prototype.csv.separator,
                                dataURL = $rows.map(function (i, val) {
                                    if (!!~ignoreRows.indexOf(i - thAdj) || $(val).is(ignoreCSS)) {
                                        return;
                                    }
                                    var $cols = $(val).find('th, td');
                                    return $cols.map(function (i, val) {
                                        if (!!~ignoreCols.indexOf(i) || $(val).is(ignoreCSS)) {
                                            return;
                                        }
                                        if ($(val).is(emptyCSS)) {
                                            return " "
                                        }
                                        return '"' + $(val).text().replace(/"/g, '""') + '"';
                                    }).get().join(colD);
                                }).get().join(rdel),
                                dataObject = TableExport.prototype.escapeHtml(
                                    JSON.stringify({
                                        data: dataURL,
                                        fileName: name,
                                        mimeType: TableExport.prototype.csv.mimeType,
                                        fileExtension: TableExport.prototype.csv.fileExtension
                                    })),
                                myContent = TableExport.prototype.csv.buttonContent,
                                myClass = TableExport.prototype.csv.defaultClass;
                            createObjButton(dataObject, myContent, myClass);
                        },
                        txt: function (rdel, name) {
                            var colD = TableExport.prototype.txt.separator,
                                dataURL = $rows.map(function (i, val) {
                                    if (!!~ignoreRows.indexOf(i - thAdj) || $(val).is(ignoreCSS)) {
                                        return;
                                    }
                                    var $cols = $(val).find('th, td');
                                    return $cols.map(function (i, val) {
                                        if (!!~ignoreCols.indexOf(i) || $(val).is(ignoreCSS)) {
                                            return;
                                        }
                                        if ($(val).is(emptyCSS)) {
                                            return " "
                                        }
                                        return $(val).text();
                                    }).get().join(colD);
                                }).get().join(rdel),
                                dataObject = TableExport.prototype.escapeHtml(
                                    JSON.stringify({
                                        data: dataURL,
                                        fileName: name,
                                        mimeType: TableExport.prototype.txt.mimeType,
                                        fileExtension: TableExport.prototype.txt.fileExtension
                                    })),
                                myContent = TableExport.prototype.txt.buttonContent,
                                myClass = TableExport.prototype.txt.defaultClass;
                            createObjButton(dataObject, myContent, myClass);
                        }
                    };

                self.settings.formats.forEach(
                    function (key) {
                        XLSX && key === 'xls' ? key = 'xlsm' : false;
                        !XLSX && key === 'xlsx' ? key = null : false;
                        key && exporters[key](rowD, fileName);
                    }
                );

                function checkCaption(exportButton) {
                    var $caption = $el.find('caption:not(.head)');
                    $caption.length ? $caption.append(exportButton) : $el.prepend('<caption class="' + bootstrapSpacing + self.settings.position + '">' + exportButton + '</caption>');
                }

                function createObjButton(dataObject, myContent, myClass) {
                    var exportButton = "<button data-fileblob='" + dataObject + "' class='" + bootstrapClass + bootstrapTheme + myClass + "'>" + myContent + "</button>";
                    checkCaption(exportButton);
                }
            });

            $("button[data-fileblob]")
                .off("click")
                .on("click", function () {
                    var object = $(this).data("fileblob"),
                        data = object.data,
                        fileName = object.fileName,
                        mimeType = object.mimeType,
                        fileExtension = object.fileExtension;
                    TableExport.prototype.export2file(data, mimeType, fileName, fileExtension);
                });

            return self;
        };


        TableExport.prototype = {
            /**
             * Version.
             * @memberof TableExport.prototype
             */
            version: "3.3.5",
            /**
             * Default plugin options.
             * @memberof TableExport.prototype
             */
            defaults: {
                headings: true,                             // (Boolean), display table headings (th or td elements) in the <thead>, (default: true)
                footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
                formats: ["xls", "csv", "txt"],             // (String[]), filetype(s) for the export, (default: ["xls", "csv", "txt"])
                fileName: "id",                             // (id, String), filename for the downloaded file, (default: "id")
                bootstrap: true,                            // (Boolean), style buttons using bootstrap, (default: true)
                position: "bottom",                         // (top, bottom), position of the caption element relative to table, (default: "bottom")
                ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file (default: null)
                ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file (default: null)
                ignoreCSS: ".tableexport-ignore",           // (selector, selector[]), selector(s) to exclude cells from the exported file (default: ".tableexport-ignore")
                emptyCSS: ".tableexport-empty"              // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file (default: ".tableexport-empty")
            },
            /**
             * Character set (character encoding) of the HTML.
             * @memberof TableExport.prototype
             */
            charset: "charset=utf-8",
            /**
             * Filename fallback for exported files.
             * @memberof TableExport.prototype
             */
            defaultFileName: "myDownload",
            /**
             * Class applied to each export button element.
             * @memberof TableExport.prototype
             */
            defaultButton: "button-default",
            /**
             * Bootstrap configuration classes ["base", "theme", "container"].
             * @memberof TableExport.prototype
             */
            bootstrap: ["btn", "btn-default", "btn-toolbar"],
            /**
             * Row delimeter
             * @memberof TableExport.prototype
             */
            rowDel: "\r\n",
            /**
             * HTML entity mapping for special characters.
             * @memberof TableExport.prototype
             */
            entityMap: {"&": "&#38;", "<": "&#60;", ">": "&#62;", "'": '&#39;', "/": '&#47;'},
            /**
             * XLSX (Open XML spreadsheet) file extension configuration
             * @memberof TableExport.prototype
             */
            xlsx: {
                defaultClass: "xlsx",
                buttonContent: "Export to xlsx",
                mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileExtension: ".xlsx"
            },
            /**
             * XLS (Binary spreadsheet) file extension configuration
             * @memberof TableExport.prototype
             */
            xls: {
                defaultClass: "xls",
                buttonContent: "Export to xls",
                separator: "\t",
                mimeType: "application/vnd.ms-excel",
                fileExtension: ".xls"
            },
            /**
             * CSV (Comma Separated Values) file extension configuration
             * @memberof TableExport.prototype
             */
            csv: {
                defaultClass: "csv",
                buttonContent: "Export to csv",
                separator: ",",
                mimeType: "text/csv",
                fileExtension: ".csv"
            },
            /**
             * TXT (Plain Text) file extension configuration
             * @memberof TableExport.prototype
             */
            txt: {
                defaultClass: "txt",
                buttonContent: "Export to txt",
                separator: "  ",
                mimeType: "text/plain",
                fileExtension: ".txt"
            },
            /**
             * Escapes special characters with HTML entities
             * @memberof TableExport.prototype
             * @param string {String}
             * @returns {String} escaped string
             */
            escapeHtml: function (string) {
                return String(string).replace(/[&<>'\/]/g, function (s) {
                    return TableExport.prototype.entityMap[s];
                });
            },
            /**
             * Formats datetimes for compatibility with Excel
             * @memberof TableExport.prototype
             * @param v {Number}
             * @param date1904 {Date}
             * @returns {Number} epoch time
             */
            dateNum: function (v, date1904) {
                if (date1904) v += 1462;
                var epoch = Date.parse(v);
                return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
            },
            /**
             * Creates an Excel spreadsheet from a data string
             * @memberof TableExport.prototype
             * @param data {String}
             * @returns {Number} epoch time
             */
            createSheet: function (data) {
                var ws = {};
                var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
                for (var R = 0; R != data.length; ++R) {
                    for (var C = 0; C != data[R].length; ++C) {
                        if (range.s.r > R) range.s.r = R;
                        if (range.s.c > C) range.s.c = C;
                        if (range.e.r < R) range.e.r = R;
                        if (range.e.c < C) range.e.c = C;
                        var cell = {v: data[R][C]};
                        if (cell.v == null) continue;
                        var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

                        if (typeof cell.v === 'number') cell.t = 'n';
                        else if (typeof cell.v === 'boolean') cell.t = 'b';
                        else if (cell.v instanceof Date) {
                            cell.t = 'n';
                            cell.z = XLSX.SSF._table[14];
                            cell.v = this.dateNum(cell.v);
                        }
                        else cell.t = 's';

                        ws[cell_ref] = cell;
                    }
                }
                if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                return ws;
            },
            /**
             * Excel Workbook constructor
             * @memberof TableExport.prototype
             * @constructor
             */
            Workbook: function () {
                this.SheetNames = [];
                this.Sheets = {};
            },
            /**
             * Converts a string to an arraybuffer
             * @param s {String}
             * @memberof TableExport.prototype
             * @returns {ArrayBuffer}
             */
            string2ArrayBuffer: function (s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            },
            /**
             * Exports and downloads the file
             * @memberof TableExport.prototype
             * @param data {String}
             * @param mime {String} mime type
             * @param name {String} filename
             * @param extension {String} file extension
             */
            export2file: function (data, mime, name, extension) {
                if (XLSX && extension.substr(0, 4) == (".xls")) {
                    var wb = new this.Workbook(),
                        ws = this.createSheet(data);

                    wb.SheetNames.push(name);
                    wb.Sheets[name] = ws;
                    var wopts = {
                            bookType: extension.substr(1, 3) + (extension.substr(4) || 'm'),
                            bookSST: false,
                            type: 'binary'
                        },
                        wbout = XLSX.write(wb, wopts);

                    data = this.string2ArrayBuffer(wbout);
                }
                saveAs(new Blob([data],
                    {type: mime + ";" + this.charset}),
                    name + extension, true);
            },
            /**
             * Updates the plugin instance with new/updated options
             * @param options {Object} TableExport configuration options
             * @returns {TableExport} updated TableExport instance
             */
            update: function (options) {
                return new TableExport(this.selectors, $.extend({}, this.settings, options), true);
            },
            /**
             * Reset the plugin instance to its original state
             * @returns {TableExport} original TableExport instance
             */
            reset: function () {
                return new TableExport(this.selectors, settings, true);
            },
            /**
             * Remove the instance (i.e. caption containing the export buttons)
             */
            remove: function () {
                this.selectors.each(function () {
                    $(this).find('caption:not(.head)').remove();
                });
            }
        };

        /**
         * jQuery TableExport wrapper
         * @param options {Object} TableExport configuration options
         * @param isUpdate {Boolean}
         * @returns {TableExport} TableExport instance
         */
        $.fn.tableExport = function (options, isUpdate) {
            return new TableExport(this, options, isUpdate);
        };

        // alias the TableExport prototype
        for (var prop in TableExport.prototype) {
            $.fn.tableExport[prop] = TableExport.prototype[prop];
        }

        return exports.default = exports.TableExport = TableExport;

    }
));