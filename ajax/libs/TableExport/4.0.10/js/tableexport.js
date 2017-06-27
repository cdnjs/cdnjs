/*!
 * TableExport.js v4.0.10 (https://www.travismclarke.com)
 *
 * Copyright (c) 2017 - Travis Clarke - https://www.travismclarke.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */


;(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(function (require) {
            var $; try { $ = require('jquery') } catch (e) {}
            return factory($, require('blobjs'), require('file-saverjs'), require('xlsx'));
        });
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        var $; try { $ = require('jquery') } catch (e) {}
        module.exports = factory($, require('blobjs'), require('file-saverjs'), require('xlsx'));
    } else {
        // Browser globals
        root.TableExport = factory(root.jQuery, root.Blob, root.saveAs, root.XLSX);
    }
}(this, function ($, Blob, saveAs, XLSX) {
        'use strict';
        /**
         * TableExport main library constructor
         * @param selectors {jQuery} jQuery selector(s)
         * @param options {Object} TableExport configuration options
         * @constructor
         */
        var TableExport = function (selectors, options) {
            var self = this;

            if (!selectors) return new Error('"selectors" is required');
            if (!self) return new TableExport(selectors, options);

            /**
             * TableExport configuration options (user-defined w/ default fallback)
             */
            self.settings = _extend({}, self.defaults, options);
            /**
             * Selectors (tables) to apply the library to
             */
            self.selectors = _nodesArray(selectors);

            var settings = self.settings;
            settings.ignoreRows = settings.ignoreRows instanceof Array ? settings.ignoreRows : [settings.ignoreRows];
            settings.ignoreCols = settings.ignoreCols instanceof Array ? settings.ignoreCols : [settings.ignoreCols];
            settings.ignoreCSS = self.ignoreCSS instanceof Array ? self.ignoreCSS.join(', ') : self.ignoreCSS;
            settings.emptyCSS = self.emptyCSS instanceof Array ? self.emptyCSS.join(', ') : self.emptyCSS;
            settings.formatValue = self.formatValue.bind(this, settings.trimWhitespace);
            settings.bootstrapSettings = _getBootstrapSettings(settings.bootstrap, self.bootstrapConfig, self.defaultButton);

            var _exportData = {};
            self.getExportData = function () {
                return _exportData;
            };

            self.selectors.forEach(function (el) {
                var context = {};

                context.rows = _nodesArray(el.querySelectorAll('tbody > tr'));
                context.rows = settings.headers ? _nodesArray(el.querySelectorAll('thead > tr')).concat(context.rows) : context.rows;
                context.rows = settings.footers ? context.rows.concat(_nodesArray(el.querySelectorAll('tfoot > tr'))) : context.rows;
                context.thAdj = settings.headers ? el.querySelectorAll('thead > tr').length : 0;
                context.filename = settings.filename === 'id'
                    ? (el.getAttribute('id') ? el.getAttribute('id') : self.defaultFilename)
                    : (settings.filename ? settings.filename : self.defaultFilename);
                context.uuid = _uuid(el);

                /**
                 * Initializes table caption with export buttons
                 * @param exportButton {HTMLButtonElement}
                 */
                context.checkCaption = function (exportButton) {
                    var caption = el.querySelectorAll('caption.tableexport-caption');
                    if (caption.length) {
                        caption[0].appendChild(exportButton);
                    } else {
                        caption = document.createElement('caption');
                        caption.className = settings.bootstrapSettings.bootstrapSpacing + settings.position + ' ' + 'tableexport-caption';
                        caption.appendChild(exportButton);
                        el.insertBefore(caption, el.firstChild);
                    }
                };

                context.setExportData = (function () {
                    return function (exporter) {
                        var data = _store.getInstance().getItem(exporter);
                        var type = exporter.substring(exporter.indexOf('-') + 1);
                        _exportData[context.uuid] = _exportData[context.uuid] || {};
                        _exportData[context.uuid][type] = JSON.parse(data);
                    };
                })();

                var formatMap = {};
                for (var type in _type) {
                    formatMap[type] = 0;
                }

                settings.formats.forEach(
                    function (key) {
                        var before = key;
                        (XLSX && !isMobile) && key === _type.xls
                            ? key = _type.biff2
                            : false;

                        (!XLSX || isMobile) && key === _type.xlsx
                            ? key = _type.xls
                            : false;

                        if (!formatMap[key]) {
                            context.setExportData(self.exporters[key].call(self, context));
                            formatMap[key]++;
                        }
                    }
                );
            });

            var exportButton = document.querySelectorAll('button[tableexport-id]');
            _on(exportButton, 'click', self.downloadHandler, self);

            return self;
        };

        TableExport.prototype = {
            /**
             * Version.
             * @memberof TableExport.prototype
             */
            version: '4.0.10',
            /**
             * Default library options.
             * @memberof TableExport.prototype
             */
            defaults: {
                headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
                footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
                formats: ['xls', 'csv', 'txt'],             // (String[]), filetype(s) for the export, (default: ['xls', 'csv', 'txt'])
                filename: 'id',                             // (id, String), filename for the downloaded file, (default: 'id')
                bootstrap: false,                           // (Boolean), style buttons using bootstrap, (default: true)
                exportButtons: true,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
                position: 'bottom',                         // (top, bottom), position of the caption element relative to table, (default: 'bottom')
                ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
                ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
                trimWhitespace: true                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
            },
            /**
             * Character set (character encoding) of the HTML.
             * @memberof TableExport.prototype
             */
            charset: 'charset=utf-8',
            /**
             * Filename fallback for exported files.
             * @memberof TableExport.prototype
             */
            defaultFilename: 'myDownload',
            /**
             * Class applied to each export button element.
             * @memberof TableExport.prototype
             */
            defaultButton: 'button-default',
            /**
             * Class selector to exclude/remove cells from the exported file(s).
             * @memberof TableExport.prototype
             */
            // TODO: make `@type {selector|selector[]}` instead of only `class`
            ignoreCSS: 'tableexport-ignore',
            /**
             * Class selector to replace cells with an empty string in the exported file(s).
             * @memberof TableExport.prototype
             */
            // TODO: make `@type {selector|selector[]}` instead of only `class`
            emptyCSS: 'tableexport-empty',
            /**
             * Bootstrap configuration classes ['base', 'theme', 'container'].
             * @memberof TableExport.prototype
             */
            bootstrapConfig: ['btn', 'btn-default', 'btn-toolbar'],
            /**
             * Row delimeter
             * @memberof TableExport.prototype
             */
            rowDel: '\r\n',
            /**
             * HTML entity mapping for special characters.
             * @memberof TableExport.prototype
             */
            entityMap: {'&': '&#38;', '<': '&#60;', '>': '&#62;', "'": '&#39;', '/': '&#47;'},
            /**
             * XLSX (Open XML spreadsheet) file extension configuration
             * @memberof TableExport.prototype
             */
            xlsx: {
                defaultClass: 'xlsx',
                buttonContent: 'Export to xlsx',
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                fileExtension: '.xlsx'
            },
            /**
             * XLS (Binary spreadsheet) file extension configuration
             * @memberof TableExport.prototype
             */
            xls: {
                defaultClass: 'xls',
                buttonContent: 'Export to xls',
                separator: '\t',
                mimeType: 'application/vnd.ms-excel',
                fileExtension: '.xls'
            },
            /**
             * CSV (Comma Separated Values) file extension configuration
             * @memberof TableExport.prototype
             */
            csv: {
                defaultClass: 'csv',
                buttonContent: 'Export to csv',
                separator: ',',
                mimeType: 'text/csv',
                fileExtension: '.csv'
            },
            /**
             * TXT (Plain Text) file extension configuration
             * @memberof TableExport.prototype
             */
            txt: {
                defaultClass: 'txt',
                buttonContent: 'Export to txt',
                separator: '  ',
                mimeType: 'text/plain',
                fileExtension: '.txt'
            },
            /**
             * Cell-types override and assertion configuration
             * @memberof TableExport.prototype
             */
            types: {
                string: {
                    defaultClass: 'tableexport-string'
                },
                number: {
                    defaultClass: 'tableexport-number',
                    assert: function (v) {
                        return !isNaN(v);
                    }
                },
                boolean: {
                    defaultClass: 'tableexport-boolean',
                    assert: function (v) {
                        return v.toLowerCase() === 'true' || v.toLowerCase() === 'false';
                    }
                },
                date: {
                    defaultClass: 'tableexport-date',
                    assert: function (v) {
                        return !(/.*%/.test(v)) && !isNaN(Date.parse(v))
                    }
                }
            },
            exporters: {
                xlsx: function (context) {
                    var self = this;
                    var settings = self.settings;
                    var rcMap = {},
                        dataURL = _nodesArray(context.rows).map(function (val, ir) {
                            if (!!~settings.ignoreRows.indexOf(ir - context.thAdj) || _hasClass(val, settings.ignoreCSS)) {
                                return;
                            }
                            var cols = val.querySelectorAll('th, td');
                            return _nodesArray(cols).map(function (val, ic) {
                                if (!!~settings.ignoreCols.indexOf(ic) || _hasClass(val, settings.ignoreCSS)) {
                                    return;
                                }
                                if (_hasClass(val, settings.emptyCSS)) {
                                    return ' '
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
                                if (rcMap[ir]) {
                                    var threshold = ic + 1,
                                        total = 0,
                                        count = 0;

                                    for (var i = 0; i <= Math.max.apply(Math, Object.keys(rcMap[ir])); i++) {
                                        (!rcMap[ir][i]) ? count++ : total = count >= ic ? total + rcMap[ir][i] : total;
                                        if (count === threshold) {
                                            break;
                                        }
                                    }
                                    return new Array(total).concat({
                                        v: settings.formatValue(val.textContent),
                                        t: self.getType(val.className)
                                    });
                                }
                                return {
                                    v: settings.formatValue(val.textContent),
                                    t: self.getType(val.className)
                                };
                            }).filter(function (val) {
                                return typeof val !== 'undefined';
                            });
                        }).map(function (val) {
                            return val && [].concat.apply([], val);
                        }).filter(function (val) {
                            return typeof val !== 'undefined';
                        }),
                        dataObject = JSON.stringify({
                            data: dataURL,
                            filename: context.filename,
                            mimeType: TableExport.prototype.xlsx.mimeType,
                            fileExtension: TableExport.prototype.xlsx.fileExtension
                        }),
                        myContent = TableExport.prototype.xlsx.buttonContent,
                        myClass = TableExport.prototype.xlsx.defaultClass,
                        hashKey = _hashCode({uuid: context.uuid, type: _type.xlsx}),
                        exportButton = settings.exportButtons && TableExport.prototype.createObjButton(
                                hashKey,
                                dataObject,
                                myContent,
                                myClass,
                                settings.bootstrapSettings
                            );
                    exportButton && context.checkCaption(exportButton);
                    _store.getInstance().setItem(hashKey, dataObject, true);
                    return hashKey;
                },
                biff2: function (context) {
                    var self = this;
                    var settings = self.settings;
                    var rcMap = {},
                        dataURL = _nodesArray(context.rows).map(function (val, ir) {
                            if (!!~settings.ignoreRows.indexOf(ir - context.thAdj) || _hasClass(val, settings.ignoreCSS)) {
                                return;
                            }
                            var cols = val.querySelectorAll('th, td');
                            return _nodesArray(cols).map(function (val, ic) {
                                if (!!~settings.ignoreCols.indexOf(ic) || _hasClass(val, settings.ignoreCSS)) {
                                    return;
                                }
                                if (_hasClass(val, settings.emptyCSS)) {
                                    return ' '
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
                                if (rcMap[ir]) {
                                    var threshold = ic + 1,
                                        total = 0,
                                        count = 0;

                                    for (var i = 0; i <= Math.max.apply(Math, Object.keys(rcMap[ir])); i++) {
                                        (!rcMap[ir][i]) ? count++ : total = count >= ic ? total + rcMap[ir][i] : total;
                                        if (count === threshold) {
                                            break;
                                        }
                                    }
                                    return new Array(total).concat({
                                        v: settings.formatValue(val.textContent),
                                        t: self.getType(val.className)
                                    });
                                }
                                return {
                                    v: settings.formatValue(val.textContent),
                                    t: self.getType(val.className)
                                };
                            }).filter(function (val) {
                                return typeof val !== 'undefined';
                            });
                        }).map(function (val) {
                            return val && [].concat.apply([], val);
                        }).filter(function (val) {
                            return typeof val !== 'undefined';
                        }),
                        dataObject = JSON.stringify({
                            data: dataURL,
                            filename: context.filename,
                            mimeType: TableExport.prototype.xls.mimeType,
                            fileExtension: TableExport.prototype.xls.fileExtension
                        }),
                        myContent = TableExport.prototype.xls.buttonContent,
                        myClass = TableExport.prototype.xls.defaultClass,
                        hashKey = _hashCode({uuid: context.uuid, type: _type.xls}),
                        exportButton = settings.exportButtons && TableExport.prototype.createObjButton(
                                hashKey,
                                dataObject,
                                myContent,
                                myClass,
                                settings.bootstrapSettings
                            );
                    exportButton && context.checkCaption(exportButton);
                    _store.getInstance().setItem(hashKey, dataObject, true);
                    return hashKey;
                },
                xls: function (context) {
                    var self = this;
                    var settings = self.settings;
                    var colD = TableExport.prototype.xls.separator,
                        dataURL = _nodesArray(context.rows).map(function (val, i) {
                            if (!!~settings.ignoreRows.indexOf(i - context.thAdj) || _hasClass(val, settings.ignoreCSS)) {
                                return;
                            }
                            var cols = val.querySelectorAll('th, td');
                            return _nodesArray(cols).map(function (val, i) {
                                if (!!~settings.ignoreCols.indexOf(i) || _hasClass(val, settings.ignoreCSS)) {
                                    return;
                                }
                                if (_hasClass(val, settings.emptyCSS)) {
                                    return ' '
                                }
                                return val.textContent;
                            }).filter(function (val) {
                                return typeof val !== 'undefined';
                            }).join(colD);
                        }).filter(function (val) {
                            return typeof val !== 'undefined';
                        }).join(self.rowDel),
                        dataObject = JSON.stringify({
                            data: dataURL,
                            filename: context.filename,
                            mimeType: TableExport.prototype.xls.mimeType,
                            fileExtension: TableExport.prototype.xls.fileExtension
                        }),
                        myContent = TableExport.prototype.xls.buttonContent,
                        myClass = TableExport.prototype.xls.defaultClass,
                        hashKey = _hashCode({uuid: context.uuid, type: _type.xls}),
                        exportButton = settings.exportButtons && TableExport.prototype.createObjButton(
                                hashKey,
                                dataObject,
                                myContent,
                                myClass,
                                settings.bootstrapSettings
                            );
                    exportButton && context.checkCaption(exportButton);
                    _store.getInstance().setItem(hashKey, dataObject, true);
                    return hashKey;
                },
                csv: function (context) {
                    var self = this;
                    var settings = self.settings;
                    var colD = TableExport.prototype.csv.separator,
                        dataURL = _nodesArray(context.rows).map(function (val, i) {
                            if (!!~settings.ignoreRows.indexOf(i - context.thAdj) || _hasClass(val, settings.ignoreCSS)) {
                                return;
                            }
                            var cols = val.querySelectorAll('th, td');
                            return _nodesArray(cols).map(function (val, i) {
                                if (!!~settings.ignoreCols.indexOf(i) || _hasClass(val, settings.ignoreCSS)) {
                                    return;
                                }
                                if (_hasClass(val, settings.emptyCSS)) {
                                    return ' '
                                }
                                return '"' + settings.formatValue(val.textContent.replace(/"/g, '""')) + '"';
                            }).filter(function (val) {
                                return typeof val !== 'undefined';
                            }).join(colD);
                        }).filter(function (val) {
                            return typeof val !== 'undefined';
                        }).join(self.rowDel),
                        dataObject = JSON.stringify({
                            data: dataURL,
                            filename: context.filename,
                            mimeType: TableExport.prototype.csv.mimeType,
                            fileExtension: TableExport.prototype.csv.fileExtension
                        }),
                        myContent = TableExport.prototype.csv.buttonContent,
                        myClass = TableExport.prototype.csv.defaultClass,
                        hashKey = _hashCode({uuid: context.uuid, type: _type.csv}),
                        exportButton = settings.exportButtons && TableExport.prototype.createObjButton(
                                hashKey,
                                dataObject,
                                myContent,
                                myClass,
                                settings.bootstrapSettings
                            );
                    exportButton && context.checkCaption(exportButton);
                    _store.getInstance().setItem(hashKey, dataObject, true);
                    return hashKey;
                },
                txt: function (context) {
                    var self = this;
                    var settings = self.settings;
                    var colD = TableExport.prototype.txt.separator,
                        dataURL = _nodesArray(context.rows).map(function (val, i) {
                            if (!!~settings.ignoreRows.indexOf(i - context.thAdj) || _hasClass(val, settings.ignoreCSS)) {
                                return;
                            }
                            var cols = val.querySelectorAll('th, td');
                            return _nodesArray(cols).map(function (val, i) {
                                if (!!~settings.ignoreCols.indexOf(i) || _hasClass(val, settings.ignoreCSS)) {
                                    return;
                                }
                                if (_hasClass(val, settings.emptyCSS)) {
                                    return ' '
                                }
                                return settings.formatValue(val.textContent);
                            }).filter(function (val) {
                                return typeof val !== 'undefined';
                            }).join(colD);
                        }).filter(function (val) {
                            return typeof val !== 'undefined';
                        }).join(self.rowDel),
                        dataObject = JSON.stringify({
                            data: dataURL,
                            filename: context.filename,
                            mimeType: TableExport.prototype.txt.mimeType,
                            fileExtension: TableExport.prototype.txt.fileExtension
                        }),
                        myContent = TableExport.prototype.txt.buttonContent,
                        myClass = TableExport.prototype.txt.defaultClass,
                        hashKey = _hashCode({uuid: context.uuid, type: _type.txt}),
                        exportButton = settings.exportButtons && TableExport.prototype.createObjButton(
                                hashKey,
                                dataObject,
                                myContent,
                                myClass,
                                settings.bootstrapSettings
                            );
                    exportButton && context.checkCaption(exportButton);
                    _store.getInstance().setItem(hashKey, dataObject, true);
                    return hashKey;
                }
            },
            /**
             * Creates file export buttons
             * @param hashKey {String}
             * @param dataObject {String}
             * @param myContent {String}
             * @param myClass {String}
             * @param bootstrapSettings {Object}
             * @returns Element
             */
            createObjButton: function (hashKey, dataObject, myContent, myClass, bootstrapSettings) {
                var exportButton = document.createElement('button');
                exportButton.setAttribute('tableexport-id', hashKey);
                exportButton.className = bootstrapSettings.bootstrapClass + bootstrapSettings.bootstrapTheme + myClass;
                exportButton.textContent = myContent;
                return exportButton
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
             * Unescapes HTML entities to special characters
             * @memberof TableExport.prototype
             * @param string {String}
             * @returns {String} unescaped string
             */
            unescapeHtml: function (string) {
                var str = String(string);
                for (var key in this.entityMap) {
                    str = str.replace(RegExp(this.entityMap[key], 'g'), key);
                }
                return str;
            },
            /**
             * Removes leading/trailing whitespace from cell string
             * @param isTrimWhitespace {Boolean}
             * @param string {String}
             * @returns {String} trimmed string
             */
            formatValue: function (isTrimWhitespace, string) {
                return isTrimWhitespace ? string.trim() : string;
            },
            /**
             * Get cell data-type
             * @param string {String}
             * @returns {String} data-type
             */
            getType: function (string) {
                if (!string) return '';
                var types = TableExport.prototype.types;
                if (~string.indexOf(types.string.defaultClass)) {
                    return 's';
                } else if (~string.indexOf(types.number.defaultClass)) {
                    return 'n';
                } else if (~string.indexOf(types.boolean.defaultClass)) {
                    return 'b';
                } else if (~string.indexOf(types.date.defaultClass)) {
                    return 'd';
                } else {
                    return '';
                }
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
                var result = (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
                return Math.floor(result);
            },
            /**
             * Creates an Excel spreadsheet from a data string
             * @memberof TableExport.prototype
             * @param data {String}
             */
            createSheet: function (data) {
                var ws = {};
                var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
                var types = TableExport.prototype.types;
                for (var R = 0; R !== data.length; ++R) {
                    for (var C = 0; C !== data[R].length; ++C) {
                        if (range.s.r > R) range.s.r = R;
                        if (range.s.c > C) range.s.c = C;
                        if (range.e.r < R) range.e.r = R;
                        if (range.e.c < C) range.e.c = C;
                        var cell = data[R][C];
                        if (!cell || !cell.v) continue;
                        var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

                        if (!cell.t) {
                            if (types.number.assert(cell.v)) cell.t = 'n';
                            else if (types.boolean.assert(cell.v)) cell.t = 'b';
                            else if (types.date.assert(cell.v)) cell.t = 'd';
                            else cell.t = 's';
                        }

                        if (cell.t === 'd') {
                            cell.t = 'n';
                            cell.z = XLSX.SSF._table[14];
                            cell.v = this.dateNum(cell.v);
                        }

                        ws[cell_ref] = cell;
                    }
                }
                if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                return ws;
            },
            /**
             * Click handler for export button "download"
             * @memberof TableExport.prototype
             */
            downloadHandler: function (event) {
                var target = event.target;
                var object = JSON.parse(_store.getInstance().getItem(target.getAttribute('tableexport-id'))),
                    data = object.data,
                    filename = object.filename,
                    mimeType = object.mimeType,
                    fileExtension = object.fileExtension;
                this.export2file(data, mimeType, filename, fileExtension);
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
                for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
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
                data = this.getBinaryData(data, extension, name);

                if (isMobile) {
                    var dataURI = 'data:' + mime + ';' + this.charset + ',' + data;
                    this.downloadDataURI(dataURI, name, extension);
                } else {
                    saveAs(new Blob([data],
                        {type: mime + ';' + this.charset}),
                        name + extension, true);
                }
            },
            downloadDataURI: function (dataURI, name, extension) {
                var encodedUri = encodeURI(dataURI);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", name + extension);
                document.body.appendChild(link);
                link.click();
            },
            getBinaryData: function (data, extension, name) {
                if (XLSX && !isMobile && extension.substr(0, 4) === '.xls') {
                    var wb = new this.Workbook(),
                        ws = this.createSheet(data),
                        bookType = extension.substr(1) === _type.xls ? _type.biff2 : _type.xlsx;

                    name = name || '';
                    wb.SheetNames.push(name);
                    wb.Sheets[name] = ws;
                    var wopts = {
                            bookType: bookType,
                            bookSST: false,
                            type: 'binary'
                        },
                        wbout = XLSX.write(wb, wopts);

                    data = this.string2ArrayBuffer(wbout);
                }
                return data;
            },
            /**
             * Updates the library instance with new/updated options
             * @param options {Object} TableExport configuration options
             * @returns {TableExport} updated TableExport instance
             */
            update: function (options) {
                TableExport.prototype.remove.call(this);
                return new TableExport(this.selectors, _extend({}, this.defaults, options));
            },
            /**
             * Reset the library instance to its original state
             * @returns {TableExport} original TableExport instance
             */
            reset: function () {
                TableExport.prototype.remove.call(this);
                return new TableExport(this.selectors, this.settings);
            },
            /**
             * Remove the instance (i.e. caption containing the export buttons)
             */
            remove: function () {
                this.selectors.forEach(function (el) {
                    var caption = el.querySelector('caption.tableexport-caption');
                    caption && el.removeChild(caption);
                });
            },
            /**
             * LocalStorage main interface constructor
             * @memberof TableExport.prototype
             * @constructor
             */
            LocalStorage: function () {
                this.store = localStorage;
                this.namespace = 'te-';
                this.getKey = function (key) {
                    return this.namespace + key;
                };
                this.setItem = function (_key, value, overwrite) {
                    var key = this.getKey(_key);
                    if (this.exists(key) && !overwrite) {
                        return;
                    }
                    if (typeof value !== 'string') return this.error('"value" must be a string');
                    return this.store.setItem(key, value);
                };
                this.getItem = function (_key) {
                    var key = this.getKey(_key);
                    return this.store.getItem(key);
                };
                this.exists = function (_key) {
                    var key = this.getKey(_key);
                    return this.store.getItem(key) !== null;
                };
                this.removeItem = function (_key) {
                    var key = this.getKey(_key);
                    return this.store.removeItem(key);
                };
                this.error = function (message) {
                    return new Error('error:', message);
                };
            }
        };

        var _store = TableExport.prototype.LocalStorage;
        _store.getInstance = (function () {
            _store._instance = null;

            return function () {
                if (!_store._instance) {
                    _store._instance = new _store();
                }
                return _store._instance;

            };
        })();

        var _uuid = (function () {
            var uuid = 0;

            return function (el) {
                if (!el.id) {
                    el.id = 'tableexport-' + (++uuid);
                }
                return el.id;
            };
        })();

        var _type = (function () {
            return {
                xlsx: 'xlsx',
                biff2: 'biff2',
                xls: 'xls',
                csv: 'csv',
                txt: 'txt'
            };
        })();


        var _hashCode = (function () {
            var hash = 0, i, char;

            return function (hashKey) {
                var type = hashKey.type;
                hashKey = JSON.stringify(hashKey);
                if (hashKey.length === 0) return hash;
                for (i = 0; i < hashKey.length; i++) {
                    char = hashKey.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash |= 0;
                }
                return hash.toString(16).substring(1) + '-' + type;
            }
        })();

        var _on = (function () {
            var prevFn = null;

            return function (el, event, fn, context) { // , args
                var curFn = fn.bind(context);
                // var curFn = fn.bind.apply(fn, [context].concat(args)); // OR [].slice.call(arguments[4]))
                for (var i = 0; i < el.length; ++i) {
                    prevFn && el[i].removeEventListener(event, prevFn, false);
                    el[i].addEventListener(event, curFn, false);
                }
                prevFn = curFn;
            }
        })();

        function _extend() {
            var args = arguments;
            for (var i = 1; i < args.length; i++)
                for (var key in args[i])
                    if (args[i].hasOwnProperty(key))
                        args[0][key] = args[i][key];
            return args[0];
        }

        function _nodesArray(els) {
            return (typeof els.length === 'undefined') ? [].concat(els) : [].slice.call(els);
        }

        function _hasClass(el, cls) {
            return el.classList ? el.classList.contains(cls) : new RegExp('(^| )' + cls + '( |$)', 'gi').test(el.cls);
        }

        function _getBootstrapSettings(bootstrap, bootstrapConfig, defaultButton) {
            var config = {};
            if (bootstrap) {
                config.bootstrapClass = bootstrapConfig[0] + ' ';
                config.bootstrapTheme = bootstrapConfig[1] + ' ';
                config.bootstrapSpacing = bootstrapConfig[2] + ' ';
            } else {
                config.bootstrapClass = defaultButton + ' ';
                config.bootstrapTheme = '';
                config.bootstrapSpacing = '';
            }
            return config;
        }

        var isMobile = (function isMobile(ua) {
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(ua)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4))
        })(navigator.userAgent || navigator.vendor || window.opera);

        if ($) {
            /**
             * jQuery TableExport wrapper
             * @param options {Object} TableExport configuration options
             * @returns {TableExport} TableExport instance
             */
            $.fn.tableExport = function (options) {
                return new TableExport(this, options);
            };

            // alias the TableExport prototype
            for (var prop in TableExport.prototype) {
                $.fn.tableExport[prop] = TableExport.prototype[prop];
            }
        }

        TableExport.TableExport = TableExport;

        return TableExport;
    }
));
