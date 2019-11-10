/*!
 * TableExport.js v5.2.0 (https://www.travismclarke.com)
 *
 * Copyright (c) 2018 - Travis Clarke - https://www.travismclarke.com
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

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(function(require) {
      var $;
      try {
        $ = require("jquery");
      } catch (e) {}
      return factory($, require("blobjs"), require("file-saverjs"), require("xlsx"));
    });
  } else if (typeof exports === "object" && typeof exports.nodeName !== "string") {
    // CommonJS
    var $;
    try {
      $ = require("jquery");
    } catch (e) {}
    module.exports = factory($, require("blobjs"), require("file-saverjs"), require("xlsx"));
  } else {
    // Browser globals
    root.TableExport = factory(root.jQuery, root.Blob, root.saveAs, root.XLSX);
  }
})(this, function($, Blob, saveAs, XLSX) {
  "use strict";
  /**
   * TableExport main library constructor
   * @param selectors {jQuery} jQuery selector(s)
   * @param options {Object} TableExport configuration options
   * @constructor
   */
  var TableExport = function(selectors, options) {
    var self = this;

    if (!selectors) return _handleError('"selectors" is required. \nUsage: TableExport(selectors, options)');
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
    settings.ignoreCSS = self.ignoreCSS instanceof Array ? self.ignoreCSS : [self.ignoreCSS];
    settings.emptyCSS = self.emptyCSS instanceof Array ? self.emptyCSS : [self.emptyCSS];
    settings.formatValue = self.formatValue.bind(this, settings.trimWhitespace);
    settings.bootstrapSettings = _getBootstrapSettings(settings.bootstrap, self.bootstrapConfig, self.defaultButton);

    var _exportData = {};
    self.getExportData = function() {
      return _exportData;
    };

    self.selectors.forEach(function(el) {
      var context = {};

      context.rows = _nodesArray(el.querySelectorAll("tbody > tr"));
      context.rows = settings.headers ? _nodesArray(el.querySelectorAll("thead > tr")).concat(context.rows) : context.rows;
      context.rows = settings.footers ? context.rows.concat(_nodesArray(el.querySelectorAll("tfoot > tr"))) : context.rows;
      context.thAdj = settings.headers ? el.querySelectorAll("thead > tr").length : 0;
      context.filename = settings.filename === "id" ? el.getAttribute("id") || self.defaultFilename : settings.filename || self.defaultFilename;
      context.sheetname = settings.sheetname === "id" ? el.getAttribute("id") || self.defaultSheetname : settings.sheetname || self.defaultSheetname;
      context.uuid = _uuid(el);

      /**
       * Initializes table caption with export buttons
       * @param exportButton {HTMLButtonElement}
       */
      context.checkCaption = function(exportButton) {
        var caption = el.querySelectorAll("caption." + self.defaultCaptionClass);
        if (caption.length) {
          caption[0].appendChild(exportButton);
        } else {
          caption = document.createElement("caption");
          caption.className = settings.bootstrapSettings.bootstrapSpacing + self.defaultCaptionClass;
          caption.style.cssText = "caption-side: " + settings.position;
          caption.appendChild(exportButton);
          el.insertBefore(caption, el.firstChild);
        }
      };

      context.setExportData = (function() {
        return function(exporter) {
          var data = Storage.getInstance().getItem(exporter);
          var type = exporter.substring(exporter.indexOf("-") + 1);
          _exportData[context.uuid] = _exportData[context.uuid] || {};
          _exportData[context.uuid][type] = JSON.parse(data);
        };
      })();

      context.rcMap = new RowColMap().build(context, settings);

      var formatMap = _FORMAT_LIST.reduce(function(acc, cur) {
        acc[cur] = 0;
        return acc;
      }, {});

      settings.formats.forEach(function(key) {
        if (!_isValidFormat(key)) {
          return _handleError('"' + key + '" is not a valid format. \nFormats: ' + _FORMAT_LIST.join(", "));
        } else if (!_hasDependencies(key)) {
          // TODO: provide a fallback option to XLS?
          return _handleError('"' + key + '" requires "js-xlsx".');
        } else if (!formatMap[key]) {
          context.setExportData(self.exporters.build.call(self, context, key));
          formatMap[key]++;
        }
      });
    });

    var exportButton = document.querySelectorAll("button[" + self.storageKey + "]");
    _on(exportButton, "click", self.downloadHandler, self);

    return self;
  };

  TableExport.prototype = {
    /**
     * Version.
     * @memberof TableExport.prototype
     */
    version: "5.2.0",
    /**
     * Default library options.
     * @memberof TableExport.prototype
     */
    defaults: {
      headers: true, // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true, // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ["xlsx", "csv", "txt"], // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: "id", // (id, String), filename for the downloaded file, (default: 'id')
      bootstrap: false, // (Boolean), style buttons using bootstrap, (default: true)
      exportButtons: true, // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: "bottom", // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: null, // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true, // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
      RTL: false, // (Boolean), set direction of the worksheet to right-to-left (default: false)
      sheetname: "id" // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    },
    /**
     * Constants
     * @memberof TableExport.prototype
     */
    CONSTANTS: {
      FORMAT: {
        XLSX: "xlsx",
        XLSM: "xlsm",
        XLSB: "xlsb",
        BIFF2: "biff2",
        XLS: "xls",
        CSV: "csv",
        TXT: "txt"
      },
      TYPE: {
        STRING: "s",
        NUMBER: "n",
        BOOLEAN: "b",
        DATE: "d"
      }
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
    defaultFilename: "myDownload",
    /**
     * Sheetname fallback for exported files.
     * @memberof TableExport.prototype
     */
    defaultSheetname: "myWorksheet",
    /**
     * Class applied to each export button element.
     * @memberof TableExport.prototype
     */
    defaultButton: "button-default",
    /**
     * Class applied to each table caption.
     * @memberof TableExport.prototype
     */
    defaultCaptionClass: "tableexport-caption",
    /**
     * Namespace (i.e. prefix) applied to each table UUID and Storage key.
     * @memberof TableExport.prototype
     */
    defaultNamespace: "tableexport-",
    /**
     * Attribute applied to each table element used to generate each Storage key.
     * @memberof TableExport.prototype
     */
    tableKey: "tableexport-key",
    /**
     * Attribute applied to each export button element used to reference a Storage key.
     * @memberof TableExport.prototype
     */
    storageKey: "tableexport-id",
    /**
     * CSS selector or selector[] to exclude/remove cells from the exported file(s).
     * @type {selector|selector[]}
     * @memberof TableExport.prototype
     */
    ignoreCSS: ".tableexport-ignore",
    /**
     * CSS selector or selector[] to replace cells with an empty string in the exported file(s).
     * @type {selector|selector[]}
     * @memberof TableExport.prototype
     */
    emptyCSS: ".tableexport-empty",
    /**
     * Bootstrap configuration classes ['base', 'theme', 'container'].
     * @memberof TableExport.prototype
     */
    bootstrapConfig: ["btn", "btn-default", "btn-toolbar"],
    /**
     * Row delimeter
     * @memberof TableExport.prototype
     */
    rowDel: "\r\n",
    /**
     * HTML entity mapping for special characters.
     * @memberof TableExport.prototype
     */
    entityMap: {
      "&": "&#38;",
      "<": "&#60;",
      ">": "&#62;",
      "'": "&#39;",
      "/": "&#47;"
    },
    /**
     * Format configuration
     * @memberof TableExport.prototype
     */
    formatConfig: {
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
      xlsm: {
        defaultClass: "xlsm",
        buttonContent: "Export to xlsm",
        mimeType: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
        fileExtension: ".xlsm"
      },
      xlsb: {
        defaultClass: "xlsb",
        buttonContent: "Export to xlsb",
        mimeType: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
        fileExtension: ".xlsb"
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
        fileExtension: ".xls",
        enforceStrictRFC4180: false
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
        fileExtension: ".csv",
        enforceStrictRFC4180: true
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
        fileExtension: ".txt",
        enforceStrictRFC4180: true
      }
    },
    /**
     * Cell-types override and assertion configuration
     * @memberof TableExport.prototype
     */
    typeConfig: {
      string: {
        defaultClass: "tableexport-string"
      },
      number: {
        defaultClass: "tableexport-number",
        assert: function(v) {
          return !isNaN(v);
        }
      },
      boolean: {
        defaultClass: "tableexport-boolean",
        assert: function(v) {
          return v.toLowerCase() === "true" || v.toLowerCase() === "false";
        }
      },
      date: {
        defaultClass: "tableexport-date",
        assert: function(v) {
          return !/.*%/.test(v) && !isNaN(Date.parse(v));
        }
      }
    },
    exporters: {
      build: function(context, key) {
        var self = this;
        var settings = self.settings;
        var format = self.formatConfig[key];
        var colDel = format.separator;
        var rcMap = context.rcMap;

        var getReturn = function(val) {
          if (_isEnhanced(key)) {
            return {
              v: settings.formatValue(val.textContent),
              t: self.getType(val.className)
            };
          }
          switch (key) {
            case _FORMAT.CSV:
              return '"' + settings.formatValue(val.textContent.replace(/"/g, '""')) + '"';
            default:
              return settings.formatValue(val.textContent);
          }
        };

        var dataURI = _nodesArray(context.rows)
          .map(function(val, ir) {
            if (rcMap.isIgnore(ir)) {
              return rcMap.handleRowColMapProp(rcMap.TYPE.IGNORE);
            } else if (rcMap.isEmpty(ir)) {
              return rcMap.handleRowColMapProp(rcMap.TYPE.EMPTY);
            }
            var cols = val.querySelectorAll("th, td");
            return _nodesArray(cols)
              .map(function(val, ic) {
                var _return = getReturn(val);
                if (rcMap.isIgnore(ir, ic)) {
                  return rcMap.handleRowColMapProp(rcMap.TYPE.IGNORE);
                } else if (rcMap.isEmpty(ir, ic)) {
                  return rcMap.handleRowColMapProp(rcMap.TYPE.EMPTY);
                } else {
                  return rcMap.handleRowColMapProp(rcMap.TYPE.DEFAULT, ir, ic, key, _return, colDel);
                }
              })
              .processCols(key, colDel);
          })
          .processRows(key, self.rowDel);

        var dataObject = JSON.stringify({
          data: dataURI,
          filename: context.filename,
          mimeType: format.mimeType,
          fileExtension: format.fileExtension,
          merges: rcMap.merges,
          RTL: settings.RTL,
          sheetname: settings.sheetname
        });

        var hashKey = _hashCode({ uuid: context.uuid, type: key });

        settings.exportButtons &&
          context.checkCaption(self.createObjButton(hashKey, dataObject, format.buttonContent, format.defaultClass, settings.bootstrapSettings));
        return Storage.getInstance().setItem(hashKey, dataObject, true);
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
    createObjButton: function(hashKey, dataObject, myContent, myClass, bootstrapSettings) {
      var exportButton = document.createElement("button");
      exportButton.setAttribute("type", "button");
      exportButton.setAttribute(this.storageKey, hashKey);
      exportButton.className = bootstrapSettings.bootstrapClass + bootstrapSettings.bootstrapTheme + myClass;
      exportButton.textContent = myContent;
      return exportButton;
    },
    /**
     * Escapes special characters with HTML entities
     * @memberof TableExport.prototype
     * @param string {String}
     * @returns {String} escaped string
     */
    escapeHtml: function(string) {
      var self = this;
      return String(string).replace(/[&<>'\/]/g, function(s) {
        return self.entityMap[s];
      });
    },
    /**
     * Unescapes HTML entities to special characters
     * @memberof TableExport.prototype
     * @param string {String}
     * @returns {String} unescaped string
     */
    unescapeHtml: function(string) {
      var str = String(string);
      for (var key in this.entityMap) {
        str = str.replace(RegExp(this.entityMap[key], "g"), key);
      }
      return str;
    },
    /**
     * Removes leading/trailing whitespace from cell string
     * @param isTrimWhitespace {Boolean}
     * @param string {String}
     * @returns {String} trimmed string
     */
    formatValue: function(isTrimWhitespace, string) {
      return isTrimWhitespace ? string.trim() : string;
    },
    /**
     * Get cell data-type
     * @param string {String}
     * @returns {String} data-type
     */
    getType: function(string) {
      if (!string) return "";
      var types = this.typeConfig;
      if (~string.indexOf(types.string.defaultClass)) {
        return _TYPE.STRING;
      } else if (~string.indexOf(types.number.defaultClass)) {
        return _TYPE.NUMBER;
      } else if (~string.indexOf(types.boolean.defaultClass)) {
        return _TYPE.BOOLEAN;
      } else if (~string.indexOf(types.date.defaultClass)) {
        return _TYPE.DATE;
      } else {
        return "";
      }
    },
    /**
     * Formats datetimes for compatibility with Excel
     * @memberof TableExport.prototype
     * @param v {Number}
     * @param date1904 {Date}
     * @returns {Number} epoch time
     */
    dateNum: function(v, date1904) {
      if (date1904) v += 1462;
      var epoch = Date.parse(v);
      var result = (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
      return Math.floor(result);
    },
    /**
     * Creates an Excel spreadsheet from a data string
     * @memberof TableExport.prototype
     * @param data {String}
     * @param merges {Object[]}
     */
    createSheet: function(data, merges) {
      var ws = {};
      var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
      var types = this.typeConfig;
      for (var R = 0; R !== data.length; ++R) {
        for (var C = 0; C !== data[R].length; ++C) {
          if (range.s.r > R) range.s.r = R;
          if (range.s.c > C) range.s.c = C;
          if (range.e.r < R) range.e.r = R;
          if (range.e.c < C) range.e.c = C;
          var cell = data[R][C];
          if (!cell || !cell.v) continue;
          var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

          if (!cell.t) {
            if (types.number.assert(cell.v)) cell.t = _TYPE.NUMBER;
            else if (types.boolean.assert(cell.v)) cell.t = _TYPE.BOOLEAN;
            else if (types.date.assert(cell.v)) cell.t = _TYPE.DATE;
            else cell.t = _TYPE.STRING;
          }
          if (cell.t === _TYPE.DATE) {
            cell.t = _TYPE.NUMBER;
            cell.z = XLSX.SSF._table[14];
            cell.v = this.dateNum(cell.v);
          }
          ws[cell_ref] = cell;
        }
      }
      ws["!merges"] = merges;
      if (range.s.c < 10000000) ws["!ref"] = XLSX.utils.encode_range(range);
      return ws;
    },
    /**
     * Click handler for export button "download"
     * @memberof TableExport.prototype
     */
    downloadHandler: function(event) {
      var target = event.target;
      var object = JSON.parse(Storage.getInstance().getItem(target.getAttribute(this.storageKey))),
        data = object.data,
        filename = object.filename,
        mimeType = object.mimeType,
        fileExtension = object.fileExtension,
        merges = object.merges,
        RTL = object.RTL,
        sheetname = object.sheetname;
      this.export2file(data, mimeType, filename, fileExtension, merges, RTL, sheetname);
    },
    /**
     * Excel Workbook constructor
     * @memberof TableExport.prototype
     * @constructor
     */
    Workbook: function() {
      this.Workbook = { Views: [] };
      this.SheetNames = [];
      this.Sheets = {};
    },
    /**
     * Converts a string to an arraybuffer
     * @param s {String}
     * @memberof TableExport.prototype
     * @returns {ArrayBuffer}
     */
    string2ArrayBuffer: function(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    },
    /**
     * Exports and downloads the file
     * @memberof TableExport.prototype
     * @param data {String}
     * @param mime {String} mime type
     * @param name {String} filename
     * @param extension {String} file extension
     * @param merges {Object[]}
     * @param RTL {Boolean}
     */
    export2file: function(data, mime, name, extension, merges, RTL, sheetname) {
      var format = extension.slice(1);
      data = this.getRawData(data, extension, name, merges, RTL, sheetname);

      if (_isMobile && (format === _FORMAT.CSV || format === _FORMAT.TXT)) {
        var dataURI = "data:" + mime + ";" + this.charset + "," + data;
        this.downloadDataURI(dataURI, name, extension);
      } else {
        // TODO: error and fallback when `saveAs` not available
        saveAs(new Blob([data], { type: mime + ";" + this.charset }), name + extension, true);
      }
    },
    downloadDataURI: function(dataURI, name, extension) {
      var encodedUri = encodeURI(dataURI);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", name + extension);
      document.body.appendChild(link);
      link.click();
    },
    getBookType: function(key) {
      switch (key) {
        case _FORMAT.XLS:
          return _FORMAT.BIFF2;
        default:
          return key;
      }
    },
    getRawData: function(data, extension, name, merges, RTL, sheetname) {
      var key = extension.substring(1);

      if (_isEnhanced(key)) {
        var wb = new this.Workbook(),
          ws = this.createSheet(data, merges),
          bookType = this.getBookType(key);

        sheetname = sheetname || "";
        wb.SheetNames.push(sheetname);
        wb.Sheets[sheetname] = ws;
        wb.Workbook.Views[0] = { RTL: RTL };
        var wopts = {
            bookType: bookType,
            bookSST: false,
            type: "binary"
          },
          wbout = XLSX.write(wb, wopts);

        data = this.string2ArrayBuffer(wbout);
      }
      return data;
    },
    getFileSize: function(data, extension) {
      var binary = this.getRawData(data, extension);
      return binary instanceof ArrayBuffer ? binary.byteLength : this.string2ArrayBuffer(binary).byteLength;
    },
    /**
     * Updates the library instance with new/updated options
     * @param options {Object} TableExport configuration options
     * @returns {TableExport} updated TableExport instance
     */
    update: function(options) {
      this.remove();
      return new TableExport(this.selectors, _extend({}, this.defaults, options));
    },
    /**
     * Reset the library instance to its original state
     * @returns {TableExport} original TableExport instance
     */
    reset: function() {
      this.remove();
      return new TableExport(this.selectors, this.settings);
    },
    /**
     * Remove the instance (i.e. caption containing the export buttons)
     */
    remove: function() {
      var self = this;
      this.selectors.forEach(function(el) {
        var caption = el.querySelector("caption." + self.defaultCaptionClass);
        caption && el.removeChild(caption);
      });
    }
  };

  /**
   * Storage main interface constructor
   * @memberof TableExport.prototype
   * @constructor
   */
  var Storage = function() {
    this._instance = null;

    this.store = sessionStorage;
    this.namespace = TableExport.prototype.defaultNamespace;
    this.getKey = function(key) {
      return this.namespace + key;
    };
    this.setItem = function(_key, value, overwrite) {
      var key = this.getKey(_key);
      if (this.exists(_key) && !overwrite) {
        return;
      }
      if (typeof value !== "string") return _handleError('"value" must be a string.');
      this.store.setItem(key, value);
      return _key;
    };
    this.getItem = function(_key) {
      var key = this.getKey(_key);
      return this.store.getItem(key);
    };
    this.exists = function(_key) {
      var key = this.getKey(_key);
      return this.store.getItem(key) !== null;
    };
    this.removeItem = function(_key) {
      var key = this.getKey(_key);
      return this.store.removeItem(key);
    };
  };
  Storage.getInstance = function() {
    if (!this._instance) {
      this._instance = new Storage();
    }
    return this._instance;
  };

  /**
   * RowColMap main interface constructor
   * @memberof TableExport.prototype
   * @constructor
   */
  var RowColMap = function() {
    this.rcMap = [];
    this.merges = [];

    this.isIgnore = function(ir, ic) {
      var _ignore = RowColMap.prototype.TYPE.IGNORE;
      return this.getRowColMapProp(ir, ic, _ignore);
    };
    this.isEmpty = function(ir, ic) {
      var _empty = RowColMap.prototype.TYPE.EMPTY;
      return this.getRowColMapProp(ir, ic, _empty);
    };
    this.isRowSpan = function(ir) {
      var _rowspan = RowColMap.prototype.TYPE.ROWSPAN;
      return this.getRowColMapProp(ir, undefined, _rowspan);
    };
    this.isColSpan = function(ir) {
      var _colspan = RowColMap.prototype.TYPE.COLSPAN;
      return this.getRowColMapProp(ir, undefined, _colspan);
    };
    this.isSpan = function(ir) {
      return this.isRowSpan(ir) || this.isColSpan(ir);
    };
    this.isMerge = function(ir) {
      return this.merges.length > 0;
    };
    this.addMerge = function(ir, mergeObj) {
      var _merge = RowColMap.prototype.TYPE.MERGE;
      this.merges.push(mergeObj);
      this.setRowColMapProp(ir, undefined, _merge, this.merges);
    };
    this.getRowColMapProp = function(ir, ic, key) {
      if (this.rcMap[ir]) {
        if (typeof key === "undefined") {
          return this.rcMap[ir][ic];
        } else if (typeof ic === "undefined") {
          return this.rcMap[ir][key];
        } else if (this.rcMap[ir][ic]) {
          return this.rcMap[ir][ic][key];
        }
      }
      return undefined;
    };
    this.setRowColMapProp = function(ir, ic, key, value) {
      this.rcMap[ir] = this.rcMap[ir] || [];
      if (typeof key === "undefined") {
        return (this.rcMap[ir][ic] = value);
      } else if (typeof ic === "undefined") {
        return (this.rcMap[ir][key] = value);
      } else {
        this.rcMap[ir][ic] = this.rcMap[ir][ic] || [];
        return (this.rcMap[ir][ic][key] = value);
      }
    };
    this.generateTotal = function(ir, ic) {
      var VALUE = RowColMap.prototype.TYPE.VALUE;
      var _total = 0;

      if (this.isRowSpan(ir) && this.isColSpan(ir)) {
        _total = this.getRowColMapProp(ir, ic, VALUE) || 0;
      } else if (this.getRowColMapProp(ir, ic, VALUE)) {
        _total = this.getRowColMapProp(ir, ic, VALUE);
      }
      return _total;
    };
    this.convertSpanToArray = function(ir, ic, key, _return, colDel) {
      if (this.rcMap[ir] && this.isSpan(ir)) {
        var total = this.generateTotal(ir, ic);

        if (_isEnhanced(key)) {
          return new Array(total).concat(_return);
        } else {
          return new Array(total).concat(_return).join(colDel);
        }
      }
      return _return;
    };
    this.handleRowColMapProp = function(type, ir, ic, key, _return, colDel) {
      switch (type) {
        case RowColMap.prototype.TYPE.IGNORE:
          return;
        case RowColMap.prototype.TYPE.EMPTY:
          return " ";
        case RowColMap.prototype.TYPE.DEFAULT:
        default:
          return this.convertSpanToArray(ir, ic, key, _return, colDel);
      }
    };
  };
  RowColMap.prototype = {
    OFFSET: 1,
    TYPE: {
      IGNORE: "ignore",
      EMPTY: "empty",
      MERGE: "merge",
      ROWSPAN: "rowspan",
      ROWSPANTOTAL: "rowspantotal",
      COLSPAN: "colspan",
      COLSPANTOTAL: "colspantotal",
      DEFAULT: "default",
      VALUE: "value"
    },
    build: function(context, settings) {
      var self = this;

      var OFFSET = self.OFFSET;
      var rowLength = (self.rowLength = context.rows.length);
      // var colLength = self.colLength = Math.max.apply(null,
      //     _nodesArray(context.rows).map(function (val) {
      //         return val.querySelectorAll('th, td').length
      //     }));

      var handleIgnore = function(ir, ic) {
        self.setRowColMapProp(ir, ic, self.TYPE.IGNORE, true);
      };
      var handleEmpty = function(ir, ic) {
        self.setRowColMapProp(ir, ic, self.TYPE.EMPTY, true);
      };
      var handleRowSpan = function(val, ir, ic) {
        var rowSpan = +val.getAttribute("rowspan");
        var colSpan = +val.getAttribute("colspan");
        var handledByColSpan, countRowSpan, countColSpan, totalRowSpan, totalColSpan, irStart, irEnd, icStart, icEnd;

        for (var _row = 0; _row < rowSpan; _row++) {
          if (_row + ir >= rowLength) {
            return;
          }
          colSpan && (handledByColSpan = handleColSpan(val, _row + ir, ic, _row > 0, rowSpan));

          if (rowSpan <= 1) {
            return false;
          }
          var cur = self.rcMap["c" + (ic - 1)] ? self.rcMap["c" + (ic - 1)][_row + ir] : 0;
          if (cur) {
            self.rcMap["c" + ic] = self.rcMap["c" + ic] || [];
            self.rcMap["c" + ic][_row + ir] = (self.rcMap["c" + ic][_row + ir] || 0) + cur;
          }

          if (rowSpan && _row === 0 && colSpan > 1) {
            for (var i = 0; i < rowSpan; i++) {
              self.rcMap["c" + (ic + 1)] = self.rcMap["c" + (ic + 1)] || [];
              self.rcMap["c" + (ic + 1)][_row + ir + i] = (self.rcMap["c" + (ic + 1)][_row + ir + i] || 0) + Math.max(1, colSpan);
            }
          }

          if (_row >= 1) {
            countRowSpan = self.getRowColMapProp(_row + ir, undefined, self.TYPE.ROWSPAN) || 0;
            self.setRowColMapProp(_row + ir, undefined, self.TYPE.ROWSPAN, countRowSpan + 1);

            if (!handledByColSpan) {
              totalRowSpan = self.getRowColMapProp(_row + ir, ic - countRowSpan, self.TYPE.VALUE) || 0;
              self.setRowColMapProp(_row + ir, ic - countRowSpan, self.TYPE.VALUE, totalRowSpan + 1);
              if (rowSpan > 1 && _row === 1) {
                var _re = self.rcMap["c" + ic] && self.rcMap["c" + ic][_row + ir];
                totalColSpan = self.getRowColMapProp(ir, undefined, self.TYPE.COLSPANTOTAL) || 0;
                countColSpan = self.getRowColMapProp(ir, undefined, self.TYPE.COLSPAN) || 0;
                irStart = ir;
                irEnd = ir + rowSpan - 1;
                icStart = ic + totalColSpan - countColSpan + (_re || 0);
                icEnd = icStart + Math.max(1, colSpan) - 1;
                handleMerge(irStart, icStart, irEnd, icEnd);
              }
            }
          }
        }
      };

      var handleColSpan = function(val, ir, ic, isRowSpan, rowSpan) {
        var irStart, irEnd, icStart, icEnd;
        var colSpan = +val.getAttribute("colspan");
        var countColSpan = self.getRowColMapProp(ir, undefined, self.TYPE.COLSPAN) || 0;
        var totalColSpan = self.getRowColMapProp(ir, undefined, self.TYPE.COLSPANTOTAL) || 0;

        if (colSpan <= 1) {
          return false;
        }

        self.setRowColMapProp(ir, undefined, self.TYPE.COLSPAN, countColSpan + 1);
        self.setRowColMapProp(ir, undefined, self.TYPE.COLSPANTOTAL, totalColSpan + colSpan);

        if (isRowSpan) {
          self.setRowColMapProp(ir, ic - countColSpan, self.TYPE.VALUE, colSpan);
          return true;
        } else {
          irStart = ir;
          irEnd = ir + (rowSpan || 1) - OFFSET;
          icStart = ic + totalColSpan - countColSpan;
          icEnd = ic + totalColSpan - countColSpan + (colSpan - OFFSET);
          self.setRowColMapProp(ir, ic + OFFSET, self.TYPE.VALUE, colSpan - OFFSET);
          handleMerge(irStart, icStart, irEnd, icEnd);
        }
      };

      var handleMerge = function(irs, ics, ire, ice) {
        var merge = {
          s: { r: irs, c: ics },
          e: { r: ire, c: ice }
        };
        return self.addMerge(irs, merge);
      };

      _nodesArray(context.rows).map(function(val, ir) {
        if (!!~settings.ignoreRows.indexOf(ir - context.thAdj) || _matches(val, settings.ignoreCSS)) {
          handleIgnore(ir);
        }
        if (_matches(val, settings.emptyCSS)) {
          handleEmpty(ir);
        }
        var cols = val.querySelectorAll("th, td");
        return _nodesArray(cols).map(function(val, ic) {
          if (!!~settings.ignoreCols.indexOf(ic) || _matches(val, settings.ignoreCSS)) {
            handleIgnore(ir, ic);
          }
          if (_matches(val, settings.emptyCSS)) {
            handleEmpty(ir, ic);
          }
          if (val.hasAttribute("rowspan")) {
            handleRowSpan(val, ir, ic);
          } else if (val.hasAttribute("colspan")) {
            handleColSpan(val, ir, ic);
          }
        });
      });

      return self;
    }
  };

  var _isMobile = (function isMobile(ua) {
    return (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        ua
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        ua.substring(0, 4)
      )
    );
  })(navigator.userAgent || navigator.vendor || window.opera);

  var _isEnhanced = (function() {
    return function(key) {
      return XLSX && !TableExport.prototype.formatConfig[key].enforceStrictRFC4180;
    };
  })();

  var _FORMAT = (function() {
    return TableExport.prototype.CONSTANTS.FORMAT;
  })();

  var _FORMAT_LIST = (function() {
    return Object.keys(_FORMAT).map(function(key) {
      return _FORMAT[key];
    });
  })();

  var _TYPE = (function() {
    return TableExport.prototype.CONSTANTS.TYPE;
  })();

  Object.defineProperty(Array.prototype, "processRows", {
    enumerable: false,
    value: function(key, rowDel) {
      if (_isEnhanced(key)) {
        return this.map(_toArray).filter(_defined);
      } else {
        return this.filter(_defined).join(rowDel);
      }
    }
  });

  Object.defineProperty(Array.prototype, "processCols", {
    enumerable: false,
    value: function(key, colDel) {
      if (_isEnhanced(key)) {
        return this.filter(_defined);
      } else {
        return this.filter(_defined).join(colDel);
      }
    }
  });

  var _uuid = (function() {
    var uuid = 0;

    return function(el) {
      var tableKey = el.getAttribute(TableExport.prototype.tableKey);

      if (!tableKey) {
        tableKey = el.id ? el.id : TableExport.prototype.defaultNamespace + ++uuid;
        el.setAttribute(TableExport.prototype.tableKey, tableKey);
      }
      return tableKey;
    };
  })();

  var _hashCode = (function() {
    return function(hashKey) {
      var hash = 0,
        i,
        char;

      var type = hashKey.type;
      hashKey = JSON.stringify(hashKey);
      if (hashKey.length === 0) return hash;
      for (i = 0; i < hashKey.length; i++) {
        char = hashKey.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return hash.toString(16).substring(1) + "-" + type;
    };
  })();

  var _on = (function() {
    var prevFn = null;

    return function(el, event, fn, context) {
      // , args
      var curFn = fn.bind(context);
      // var curFn = fn.bind.apply(fn, [context].concat(args)); // OR [].slice.call(arguments[4]))
      for (var i = 0; i < el.length; ++i) {
        prevFn && el[i].removeEventListener(event, prevFn, false);
        el[i].addEventListener(event, curFn, false);
      }
      prevFn = curFn;
    };
  })();

  function _extend() {
    var args = arguments;
    for (var i = 1; i < args.length; i++) for (var key in args[i]) if (args[i].hasOwnProperty(key)) args[0][key] = args[i][key];
    return args[0];
  }

  function _nodesArray(els) {
    return typeof els.length === "undefined" ? [].concat(els) : [].slice.call(els);
  }

  function _hasClass(el, cls) {
    return el.classList ? el.classList.contains(cls) : new RegExp("(^| )" + cls + "( |$)", "gi").test(el.cls);
  }

  function _matches(el, selectors) {
    return (
      selectors.filter(function(selector) {
        return [].indexOf.call(document.querySelectorAll(selector), el) !== -1;
      }).length > 0
    );
  }

  function _numeric(val) {
    return !isNaN(val);
  }

  function _defined(val) {
    return typeof val !== "undefined";
  }

  function _toArray(val) {
    return val instanceof Array ? [].concat.apply([], val) : val;
  }

  function _isValidFormat(key) {
    return ~_FORMAT_LIST.indexOf(key);
  }

  function _hasDependencies(key) {
    var hasDependencies;

    switch (key) {
      case _FORMAT.TXT:
      case _FORMAT.CSV:
      case _FORMAT.XLS:
        hasDependencies = true;
        break;
      default:
        hasDependencies = _isEnhanced(key);
    }
    return hasDependencies;
  }

  function _handleError(msg) {
    console.error(msg);
    return new Error(msg);
  }

  function _getBootstrapSettings(bootstrap, bootstrapConfig, defaultButton) {
    var config = {};
    if (bootstrap) {
      config.bootstrapClass = bootstrapConfig[0] + " ";
      config.bootstrapTheme = bootstrapConfig[1] + " ";
      config.bootstrapSpacing = bootstrapConfig[2] + " ";
    } else {
      config.bootstrapClass = defaultButton + " ";
      config.bootstrapTheme = "";
      config.bootstrapSpacing = "";
    }
    return config;
  }

  if ($) {
    /**
     * jQuery TableExport wrapper
     * @param options {Object} TableExport configuration options
     * @returns {TableExport} TableExport instance
     */
    $.fn.tableExport = function(options) {
      return TableExport.call(_extend({}, TableExport.prototype, $.fn.tableExport), this, options);
    };

    // alias the TableExport prototype
    for (var prop in TableExport.prototype) {
      $.fn.tableExport[prop] = TableExport.prototype[prop];
    }
  }

  TableExport.TableExport = TableExport;

  return TableExport;
});
