'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v3.3.0 (c) Oliver Folkerd */

/*
 * This file is part of the Tabulator package.
 *
 * (c) Oliver Folkerd <oliver.folkerd@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Full Documentation & Demos can be found at: http://olifolkerd.github.io/tabulator/
 *
 */

(function (factory) {
  "use strict";

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($, undefined) {

  (function () {

    'use strict';

    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex


    if (!Array.prototype.findIndex) {

      Object.defineProperty(Array.prototype, 'findIndex', {

        value: function value(predicate) {

          // 1. Let O be ? ToObject(this value).


          if (this == null) {

            throw new TypeError('"this" is null or not defined');
          }

          var o = Object(this);

          // 2. Let len be ? ToLength(? Get(O, "length")).


          var len = o.length >>> 0;

          // 3. If IsCallable(predicate) is false, throw a TypeError exception.


          if (typeof predicate !== 'function') {

            throw new TypeError('predicate must be a function');
          }

          // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


          var thisArg = arguments[1];

          // 5. Let k be 0.


          var k = 0;

          // 6. Repeat, while k < len


          while (k < len) {

            // a. Let Pk be ! ToString(k).


            // b. Let kValue be ? Get(O, Pk).


            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).


            // d. If testResult is true, return k.


            var kValue = o[k];

            if (predicate.call(thisArg, kValue, k, o)) {

              return k;
            }

            // e. Increase k by 1.


            k++;
          }

          // 7. Return -1.


          return -1;
        }

      });
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.find


    if (!Array.prototype.find) {

      Object.defineProperty(Array.prototype, 'find', {

        value: function value(predicate) {

          // 1. Let O be ? ToObject(this value).


          if (this == null) {

            throw new TypeError('"this" is null or not defined');
          }

          var o = Object(this);

          // 2. Let len be ? ToLength(? Get(O, "length")).


          var len = o.length >>> 0;

          // 3. If IsCallable(predicate) is false, throw a TypeError exception.


          if (typeof predicate !== 'function') {

            throw new TypeError('predicate must be a function');
          }

          // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


          var thisArg = arguments[1];

          // 5. Let k be 0.


          var k = 0;

          // 6. Repeat, while k < len


          while (k < len) {

            // a. Let Pk be ! ToString(k).


            // b. Let kValue be ? Get(O, Pk).


            // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).


            // d. If testResult is true, return kValue.


            var kValue = o[k];

            if (predicate.call(thisArg, kValue, k, o)) {

              return kValue;
            }

            // e. Increase k by 1.


            k++;
          }

          // 7. Return undefined.


          return undefined;
        }

      });
    }

    var ColumnManager = function ColumnManager(table) {

      this.table = table; //hold parent table


      this.headersElement = $("<div class='tabulator-headers'></div>");

      this.element = $("<div class='tabulator-header'></div>"); //containing element


      this.rowManager = null; //hold row manager object


      this.columns = []; // column definition object


      this.columnsByIndex = []; //columns by index


      this.columnsByField = []; //columns by field


      this.scrollLeft = 0;

      this.element.prepend(this.headersElement);
    };

    ////////////// Setup Functions /////////////////


    //link to row manager


    ColumnManager.prototype.setRowManager = function (manager) {

      this.rowManager = manager;
    };

    //return containing element


    ColumnManager.prototype.getElement = function () {

      return this.element;
    };

    //return header containing element


    ColumnManager.prototype.getHeadersElement = function () {

      return this.headersElement;
    };

    //scroll horizontally to match table body


    ColumnManager.prototype.scrollHorizontal = function (left) {

      var hozAdjust = 0,
          scrollWidth = this.element[0].scrollWidth - this.table.element.innerWidth();

      this.element.scrollLeft(left);

      //adjust for vertical scrollbar moving table when present


      if (left > scrollWidth) {

        hozAdjust = left - scrollWidth;

        this.element.css("margin-left", -hozAdjust);
      } else {

        this.element.css("margin-left", 0);
      }

      //keep frozen columns fixed in position


      //this._calcFrozenColumnsPos(hozAdjust + 3);


      this.scrollLeft = left;

      if (this.table.extExists("frozenColumns")) {

        this.table.extensions.frozenColumns.layout();
      }
    };

    ///////////// Column Setup Functions /////////////


    ColumnManager.prototype.setColumns = function (cols, row) {

      var self = this;

      self.headersElement.empty();

      self.columns = [];

      self.columnsByIndex = [];

      self.columnsByField = [];

      //reset frozen columns


      if (self.table.extExists("frozenColumns")) {

        self.table.extensions.frozenColumns.reset();
      }

      cols.forEach(function (def, i) {

        self._addColumn(def);
      });

      self._reIndexColumns();

      if (self.table.options.responsiveLayout && self.table.extExists("responsiveLayout", true)) {

        self.table.extensions.responsiveLayout.initialize();
      }

      self.redraw(true);
    };

    ColumnManager.prototype._addColumn = function (definition, before, nextToColumn) {

      var column = new Column(definition, this);

      var index = nextToColumn ? this.findColumnIndex(nextToColumn) : nextToColumn;

      if (nextToColumn && index > -1) {

        var parentIndex = this.columns.indexOf(nextToColumn.getTopColumn());

        if (before) {

          this.columns.splice(parentIndex, 0, column);

          nextToColumn.getElement().before(column.getElement());
        } else {

          this.columns.splice(parentIndex + 1, 0, column);

          nextToColumn.getElement().after(column.getElement());
        }
      } else {

        if (before) {

          this.columns.unshift(column);

          this.headersElement.prepend(column.getElement());
        } else {

          this.columns.push(column);

          this.headersElement.append(column.getElement());
        }
      }

      return column;
    };

    ColumnManager.prototype.registerColumnField = function (col) {

      if (col.definition.field) {

        this.columnsByField[col.definition.field] = col;
      }
    };

    ColumnManager.prototype.registerColumnPosition = function (col) {

      this.columnsByIndex.push(col);
    };

    ColumnManager.prototype._reIndexColumns = function () {

      this.columnsByIndex = [];

      this.columns.forEach(function (column) {

        column.reRegisterPosition();
      });
    };

    //ensure column headers take up the correct amount of space in column groups


    ColumnManager.prototype._verticalAlignHeaders = function () {

      var self = this;

      self.columns.forEach(function (column) {

        column.clearVerticalAlign();
      });

      self.columns.forEach(function (column) {

        column.verticalAlign(self.table.options.columnVertAlign);
      });

      self.rowManager.adjustTableSize();
    };

    //////////////// Column Details /////////////////


    ColumnManager.prototype.findColumn = function (subject) {

      var self = this;

      if ((typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) == "object") {

        if (subject instanceof Column) {

          //subject is column element


          return subject;
        } else if (subject instanceof ColumnComponent) {

          //subject is public column component


          return subject._getSelf() || false;
        } else if (subject instanceof jQuery) {

          //subject is a jquery element of the column header


          var match = self.columns.find(function (column) {

            return column.element === subject;
          });

          return match || false;
        }
      } else {

        //subject should be treated as the field name of the column


        return this.columnsByField[subject] || false;
      }

      //catch all for any other type of input


      return false;
    };

    ColumnManager.prototype.getColumnByField = function (field) {

      return this.columnsByField[field];
    };

    ColumnManager.prototype.getColumnByIndex = function (index) {

      return this.columnsByIndex[index];
    };

    ColumnManager.prototype.getColumns = function () {

      return this.columns;
    };

    ColumnManager.prototype.findColumnIndex = function (column) {

      return this.columnsByIndex.findIndex(function (col) {

        return column === col;
      });
    };

    //return all columns that are not groups


    ColumnManager.prototype.getRealColumns = function () {

      return this.columnsByIndex;
    };

    //travers across columns and call action


    ColumnManager.prototype.traverse = function (callback) {

      var self = this;

      self.columnsByIndex.forEach(function (column, i) {

        callback(column, i);
      });
    };

    //get defintions of actual columns


    ColumnManager.prototype.getDefinitions = function (active) {

      var self = this,
          output = [];

      self.columnsByIndex.forEach(function (column) {

        if (!active || active && column.visible) {

          output.push(column.getDefinition());
        }
      });

      return output;
    };

    //get full nested definition tree


    ColumnManager.prototype.getDefinitionTree = function () {

      var self = this,
          output = [];

      self.columns.forEach(function (column) {

        output.push(column.getDefinition(true));
      });

      return output;
    };

    ColumnManager.prototype.getComponents = function () {

      var self = this,
          output = [];

      self.columnsByIndex.forEach(function (column) {

        output.push(column.getComponent());
      });

      return output;
    };

    ColumnManager.prototype.getWidth = function () {

      var width = 0;

      this.columnsByIndex.forEach(function (column) {

        if (column.visible) {

          width += column.getWidth();
        }
      });

      return width;
    };

    ColumnManager.prototype.moveColumn = function (from, to, after) {

      this._moveColumnInArray(this.columns, from, to, after);

      this._moveColumnInArray(this.columnsByIndex, from, to, after, true);

      this.table.options.columnMoved(from.getComponent());

      if (this.table.options.persistentLayout && this.table.extExists("persistentLayout", true)) {

        this.table.extensions.persistentLayout.save();
      }
    };

    ColumnManager.prototype._moveColumnInArray = function (columns, from, to, after, updateRows) {

      var fromIndex = columns.indexOf(from),
          toIndex;

      if (fromIndex > -1) {

        columns.splice(fromIndex, 1);

        toIndex = columns.indexOf(to);

        if (toIndex > -1) {

          if (after) {

            toIndex = toIndex + 1;
          }
        } else {

          toIndex = fromIndex;
        }

        columns.splice(toIndex, 0, from);

        if (updateRows) {

          this.table.rowManager.rows.forEach(function (row) {

            if (row.cells.length) {

              var cell = row.cells.splice(fromIndex, 1)[0];

              row.cells.splice(toIndex, 0, cell);
            }
          });
        }
      }
    };

    //////////////// Cell Management /////////////////


    ColumnManager.prototype.generateCells = function (row) {

      var self = this;

      var cells = [];

      self.columnsByIndex.forEach(function (column) {

        cells.push(column.generateCell(row));
      });

      return cells;
    };

    //////////////// Column Management /////////////////


    ColumnManager.prototype.getFlexBaseWidth = function () {

      var self = this,
          totalWidth = self.table.element.innerWidth(),
          //table element width


      fixedWidth = 0;

      //adjust for vertical scrollbar if present


      if (self.rowManager.element[0].scrollHeight > self.rowManager.element.innerHeight()) {

        totalWidth -= self.rowManager.element[0].offsetWidth - self.rowManager.element[0].clientWidth;
      }

      this.columnsByIndex.forEach(function (column) {

        var width, minWidth, colWidth;

        if (column.visible) {

          width = column.definition.width || 0;

          minWidth = typeof column.minWidth == "undefined" ? self.table.options.columnMinWidth : parseInt(column.minWidth);

          if (typeof width == "string") {

            if (width.indexOf("%") > -1) {

              colWidth = totalWidth / 100 * parseInt(width);
            } else {

              colWidth = parseInt(width);
            }
          } else {

            colWidth = width;
          }

          fixedWidth += colWidth > minWidth ? colWidth : minWidth;
        }
      });

      return fixedWidth;
    };

    ColumnManager.prototype.addColumn = function (definition, before, nextToColumn) {

      var column = this._addColumn(definition, before, nextToColumn);

      this._reIndexColumns();

      if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

        this.table.extensions.responsiveLayout.initialize();
      }

      if (this.table.extExists("columnCalcs")) {

        this.table.extensions.columnCalcs.recalc(this.table.rowManager.displayRows);
      }

      this.redraw();

      if (this.table.extensions.layout.getMode() != "fitColumns") {

        column.reinitializeWidth();
      }

      this._verticalAlignHeaders();

      this.table.rowManager.reinitialize();
    };

    //remove column from system


    ColumnManager.prototype.deregisterColumn = function (column) {

      var field = column.getField(),
          index;

      //remove from field list


      if (field) {

        delete this.columnsByField[field];
      }

      //remove from index list


      index = this.columnsByIndex.indexOf(column);

      if (index > -1) {

        this.columnsByIndex.splice(index, 1);
      }

      //remove from column list


      index = this.columns.indexOf(column);

      if (index > -1) {

        this.columns.splice(index, 1);
      }

      if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

        this.table.extensions.responsiveLayout.initialize();
      }

      this.redraw();
    };

    //redraw columns


    ColumnManager.prototype.redraw = function (force) {

      if (force) {

        if (this.element.is(":visible")) {

          this._verticalAlignHeaders();
        }

        this.table.rowManager.resetScroll();

        this.table.rowManager.reinitialize();
      }

      if (this.table.extensions.layout.getMode() == "fitColumns") {

        this.table.extensions.layout.layout();
      } else {

        if (force) {

          this.table.extensions.layout.layout();
        } else {

          if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

            this.table.extensions.responsiveLayout.update();
          }
        }
      }

      if (this.table.extExists("frozenColumns")) {

        this.table.extensions.frozenColumns.layout();
      }

      if (this.table.extExists("columnCalcs")) {

        this.table.extensions.columnCalcs.recalc(this.table.rowManager.displayRows);
      }

      if (force) {

        if (this.table.options.persistentLayout && this.table.extExists("persistentLayout", true)) {

          this.table.extensions.persistentLayout.save();
        }

        if (this.table.extExists("columnCalcs")) {

          this.table.extensions.columnCalcs.redraw();
        }
      }

      this.table.footerManager.redraw();
    };

    //public column object

    var ColumnComponent = function ColumnComponent(column) {

      this.column = column;

      this.type = "ColumnComponent";
    };

    ColumnComponent.prototype.getElement = function () {

      return this.column.getElement();
    };

    ColumnComponent.prototype.getDefinition = function () {

      return this.column.getDefinition();
    };

    ColumnComponent.prototype.getField = function () {

      return this.column.getField();
    };

    ColumnComponent.prototype.getCells = function () {

      var cells = [];

      this.column.cells.forEach(function (cell) {

        cells.push(cell.getComponent());
      });

      return cells;
    };

    ColumnComponent.prototype.getVisibility = function () {

      return this.column.visible;
    };

    ColumnComponent.prototype.show = function () {

      this.column.show();
    };

    ColumnComponent.prototype.hide = function () {

      this.column.hide();
    };

    ColumnComponent.prototype.toggle = function () {

      if (this.column.visible) {

        this.column.hide();
      } else {

        this.column.show();
      }
    };

    ColumnComponent.prototype.delete = function () {

      this.column.delete();
    };

    ColumnComponent.prototype._getSelf = function () {

      return this.column;
    };

    var Column = function Column(def, parent) {

      var self = this;

      this.table = parent.table;

      this.definition = def; //column definition

      this.parent = parent; //hold parent object

      this.type = "column"; //type of element

      this.columns = []; //child columns

      this.cells = []; //cells bound to this column

      this.element = $("<div class='tabulator-col' role='columnheader' aria-sort='none'></div>"); //column header element

      this.contentElement = false;

      this.groupElement = $("<div class='tabulator-col-group-cols'></div>"); //column group holder element

      this.isGroup = false;

      this.tooltip = false; //hold column tooltip

      this.hozAlign = ""; //horizontal text alignment


      //multi dimentional filed handling

      this.field = "";

      this.fieldStructure = "";

      this.getFieldValue = "";

      this.setFieldValue = "";

      this.setField(this.definition.field);

      this.extensions = {}; //hold extension variables;


      this.cellEvents = {

        cellClick: false,

        cellDblClick: false,

        cellContext: false,

        cellTap: false,

        cellDblTap: false,

        cellTapHold: false

      };

      this.width = null; //column width

      this.minWidth = null; //column minimum width

      this.widthFixed = false; //user has specified a width for this column


      this.visible = true; //default visible state


      //initialize column

      if (def.columns) {

        this.isGroup = true;

        def.columns.forEach(function (def, i) {

          var newCol = new Column(def, self);

          self.attachColumn(newCol);
        });

        self.checkColumnVisibility();
      } else {

        parent.registerColumnField(this);
      }

      if (def.rowHandle && this.table.options.movableRows !== false && this.table.extExists("moveRow")) {

        this.table.extensions.moveRow.setHandle(true);
      }

      this._mapDepricatedFunctionality();

      this._buildHeader();
    };

    //////////////// Setup Functions /////////////////

    Column.prototype._mapDepricatedFunctionality = function (field) {

      if (this.definition.tooltipHeader) {

        console.warn("The%c tooltipHeader%c column definition property has been depricated and will be removed in version 4.0, use %c headerTooltio%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");

        if (typeof this.definition.headerTooltip == "undefined") {

          this.definition.headerTooltip = this.definition.tooltipHeader;
        }
      }
    };

    Column.prototype.setField = function (field) {

      this.field = field;

      this.fieldStructure = field ? field.split(".") : [];

      this.getFieldValue = this.fieldStructure.length > 1 ? this._getNestedData : this._getFlatData;

      this.setFieldValue = this.fieldStructure.length > 1 ? this._setNesteData : this._setFlatData;
    };

    //register column position with column manager

    Column.prototype.registerColumnPosition = function (column) {

      this.parent.registerColumnPosition(column);
    };

    //register column position with column manager

    Column.prototype.registerColumnField = function (column) {

      this.parent.registerColumnField(column);
    };

    //trigger position registration

    Column.prototype.reRegisterPosition = function () {

      if (this.isGroup) {

        this.columns.forEach(function (column) {

          column.reRegisterPosition();
        });
      } else {

        this.registerColumnPosition(this);
      }
    };

    //build header element

    Column.prototype._buildHeader = function () {

      var self = this,
          def = self.definition,
          dblTap,
          tapHold,
          tap;

      self.element.empty();

      self.contentElement = self._buildColumnHeaderContent();

      self.element.append(self.contentElement);

      if (self.isGroup) {

        self._buildGroupHeader();
      } else {

        self._buildColumnHeader();
      }

      //set header tooltips

      var tooltip = def.headerTooltip || def.tooltip === false ? def.headerTooltip : self.table.options.tooltipsHeader;

      if (tooltip) {

        if (tooltip === true) {

          if (def.field) {

            self.table.extensions.localize.bind("columns." + def.field, function (value) {

              self.element.attr("title", value || def.title);
            });
          } else {

            self.element.attr("title", def.title);
          }
        } else {

          if (typeof tooltip == "function") {

            tooltip = tooltip(self.getComponent());
          }

          self.element.attr("title", tooltip);
        }
      } else {

        self.element.attr("title", "");
      }

      //set resizable handles

      if (self.table.options.resizableColumns && self.table.extExists("resizeColumns")) {

        self.table.extensions.resizeColumns.initializeColumn("header", self, self.element);
      }

      //set resizable handles

      if (def.headerFilter && self.table.extExists("filter") && self.table.extExists("edit")) {

        if (typeof def.headerFilterPlaceholder !== "undefined" && def.field) {

          self.table.extensions.localize.setHeaderFilterColumnPlaceholder(def.field, def.headerFilterPlaceholder);
        }

        self.table.extensions.filter.initializeColumn(self);
      }

      //set resizable handles

      if (self.table.extExists("frozenColumns")) {

        self.table.extensions.frozenColumns.initializeColumn(self);
      }

      //set movable column

      if (self.table.options.movableColumns && !self.isGroup && self.table.extExists("moveColumn")) {

        self.table.extensions.moveColumn.initializeColumn(self);
      }

      //set calcs column

      if ((def.topCalc || def.bottomCalc) && self.table.extExists("columnCalcs")) {

        self.table.extensions.columnCalcs.initializeColumn(self);
      }

      //setup header click event bindings

      if (typeof def.headerClick == "function") {

        self.element.on("click", function (e) {
          def.headerClick(e, self.getComponent());
        });
      }

      if (typeof def.headerDblClick == "function") {

        self.element.on("dblclick", function (e) {
          def.headerDblClick(e, self.getComponent());
        });
      }

      if (typeof def.headerContext == "function") {

        self.element.on("contextmenu", function (e) {
          def.headerContext(e, self.getComponent());
        });
      }

      //setup header tap event bindings

      if (typeof def.headerTap == "function") {

        tap = false;

        self.element.on("touchstart", function (e) {

          tap = true;
        });

        self.element.on("touchend", function (e) {

          if (tap) {

            def.headerTap(e, self.getComponent());
          }

          tap = false;
        });
      }

      if (typeof def.headerDblTap == "function") {

        dblTap = null;

        self.element.on("touchend", function (e) {

          if (dblTap) {

            clearTimeout(dblTap);

            dblTap = null;

            def.headerDblTap(e, self.getComponent());
          } else {

            dblTap = setTimeout(function () {

              clearTimeout(dblTap);

              dblTap = null;
            }, 300);
          }
        });
      }

      if (typeof def.headerTapHold == "function") {

        tapHold = null;

        self.element.on("touchstart", function (e) {

          clearTimeout(tapHold);

          tapHold = setTimeout(function () {

            clearTimeout(tapHold);

            tapHold = null;

            tap = false;

            def.headerTapHold(e, self.getComponent());
          }, 1000);
        });

        self.element.on("touchend", function (e) {

          clearTimeout(tapHold);

          tapHold = null;
        });
      }

      //store column cell click event bindings

      if (typeof def.cellClick == "function") {

        self.cellEvents.cellClick = def.cellClick;
      }

      if (typeof def.cellDblClick == "function") {

        self.cellEvents.cellDblClick = def.cellDblClick;
      }

      if (typeof def.cellContext == "function") {

        self.cellEvents.cellContext = def.cellContext;
      }

      //setup column cell tap event bindings

      if (typeof def.cellTap == "function") {

        self.cellEvents.cellTap = def.cellTap;
      }

      if (typeof def.cellDblTap == "function") {

        self.cellEvents.cellDblTap = def.cellDblTap;
      }

      if (typeof def.cellTapHold == "function") {

        self.cellEvents.cellTapHold = def.cellTapHold;
      }
    };

    //build header element for header

    Column.prototype._buildColumnHeader = function () {

      var self = this,
          def = self.definition,
          table = self.table,
          sortable;

      //set column sorter

      if (table.extExists("sort")) {

        table.extensions.sort.initializeColumn(self, self.contentElement);
      }

      //set column formatter

      if (table.extExists("format")) {

        table.extensions.format.initializeColumn(self);
      }

      //set column editor

      if (typeof def.editor != "undefined" && table.extExists("edit")) {

        table.extensions.edit.initializeColumn(self);
      }

      //set colum validator

      if (typeof def.validator != "undefined" && table.extExists("validate")) {

        table.extensions.validate.initializeColumn(self);
      }

      //set column mutator

      if (typeof def.mutator != "undefined" && table.extExists("mutator")) {

        table.extensions.mutator.initializeColumn(self);
      }

      //set column accessor

      if (typeof def.accessor != "undefined" && table.extExists("accessor")) {

        table.extensions.accessor.initializeColumn(self);
      }

      //set column visibility

      if (typeof def.visible != "undefined") {

        if (def.visible) {

          self.show();
        } else {

          self.hide();
        }
      }

      //asign additional css classes to column header

      if (def.cssClass) {

        self.element.addClass(def.cssClass);
      }

      //set min width if present

      self.setMinWidth(typeof def.minWidth == "undefined" ? self.table.options.columnMinWidth : def.minWidth);

      self.reinitializeWidth();

      //set tooltip if present

      self.tooltip = self.definition.tooltip || self.definition.tooltip === false ? self.definition.tooltip : self.table.options.tooltips;

      //set orizontal text alignment

      self.hozAlign = typeof self.definition.align == "undefined" ? "" : self.definition.align;
    };

    Column.prototype._buildColumnHeaderContent = function () {

      var self = this,
          def = self.definition,
          table = self.table;

      var contentElement = $("<div class='tabulator-col-content'></div>");

      contentElement.append(self._buildColumnHeaderTitle());

      return contentElement;
    };

    //build title element of column

    Column.prototype._buildColumnHeaderTitle = function () {

      var self = this,
          def = self.definition,
          table = self.table,
          title;

      var titleHolderElement = $("<div class='tabulator-col-title'></div>");

      if (def.editableTitle) {

        var titleElement = $("<input class='tabulator-title-editor'>");

        titleElement.on("click", function (e) {

          e.stopPropagation();

          $(this).focus();
        });

        titleElement.on("change", function () {

          var newTitle = $(this).val();

          def.title = newTitle;

          table.options.columnTitleChanged(self.getComponent());
        });

        titleHolderElement.append(titleElement);

        if (def.field) {

          table.extensions.localize.bind("columns." + def.field, function (text) {

            titleElement.val(text || def.title || "&nbsp");
          });
        } else {

          titleElement.val(def.title || "&nbsp");
        }
      } else {

        if (def.field) {

          table.extensions.localize.bind("columns." + def.field, function (text) {

            self._formatColumnHeaderTitle(titleHolderElement, text || def.title || "&nbsp");
          });
        } else {

          self._formatColumnHeaderTitle(titleHolderElement, def.title || "&nbsp");
        }
      }

      return titleHolderElement;
    };

    Column.prototype._formatColumnHeaderTitle = function (el, title) {

      var formatter, contents;

      if (this.definition.titleFormatter && this.table.extExists("format")) {

        formatter = this.table.extensions.format.getFormatter(this.definition.titleFormatter);

        contents = formatter.call(this.table.extensions.format, {

          getValue: function getValue() {

            return title;
          },

          getElement: function getElement() {

            return el;
          }

        }, this.definition.titleFormatterParams || {});

        el.append(contents);
      } else {

        el.html(title);
      }
    };

    //build header element for column group

    Column.prototype._buildGroupHeader = function () {

      var self = this,
          def = self.definition,
          table = self.table;

      self.element.addClass("tabulator-col-group").attr("role", "columngroup").attr("aria-title", def.title);

      self.element.append(self.groupElement);
    };

    //flat field lookup

    Column.prototype._getFlatData = function (data) {

      return data[this.field];
    };

    //nested field lookup

    Column.prototype._getNestedData = function (data) {

      var dataObj = data,
          structure = this.fieldStructure,
          length = structure.length,
          output;

      for (var i = 0; i < length; i++) {

        dataObj = dataObj[structure[i]];

        output = dataObj;

        if (!dataObj) {

          break;
        }
      }

      return output;
    };

    //flat field set

    Column.prototype._setFlatData = function (data, value) {

      data[this.field] = value;
    };

    //nested field set

    Column.prototype._setNesteData = function (data, value) {

      var dataObj = data,
          structure = this.fieldStructure,
          length = structure.length;

      for (var i = 0; i < length; i++) {

        if (i == length - 1) {

          dataObj[structure[i]] = value;
        } else {

          if (!dataObj[structure[i]]) {

            dataObj[structure[i]] = {};
          }

          dataObj = dataObj[structure[i]];
        }
      }
    };

    //attach column to this group

    Column.prototype.attachColumn = function (column) {

      var self = this;

      if (self.groupElement) {

        self.columns.push(column);

        self.groupElement.append(column.getElement());
      } else {

        console.warn("Column Warning - Column being attached to another column instead of column group");
      }
    };

    //vertically align header in column

    Column.prototype.verticalAlign = function (alignment) {

      if (this.parent.isGroup) {

        this.element.css("height", this.parent.getGroupElement().innerHeight());
      } else {

        this.element.css("height", this.parent.getHeadersElement().innerHeight());
      }

      //vertically align cell contents

      if (!this.isGroup && alignment !== "top") {

        if (alignment === "bottom") {

          this.element.css({ "padding-top": this.element.innerHeight() - this.contentElement.outerHeight() });
        } else {

          this.element.css({ "padding-top": (this.element.innerHeight() - this.contentElement.outerHeight()) / 2 });
        }
      }

      this.columns.forEach(function (column) {

        column.verticalAlign(alignment);
      });
    };

    //clear vertical alignmenet

    Column.prototype.clearVerticalAlign = function () {

      this.element.css("padding-top", "");

      this.element.css("height", "");

      this.columns.forEach(function (column) {

        column.clearVerticalAlign();
      });
    };

    //// Retreive Column Information ////


    //return column header element

    Column.prototype.getElement = function () {

      return this.element;
    };

    //return colunm group element

    Column.prototype.getGroupElement = function () {

      return this.groupElement;
    };

    //return field name

    Column.prototype.getField = function () {

      return this.field;
    };

    //return the first column in a group

    Column.prototype.getFirstColumn = function () {

      if (!this.isGroup) {

        return this;
      } else {

        if (this.columns.length) {

          return this.columns[0].getFirstColumn();
        } else {

          return false;
        }
      }
    };

    //return the last column in a group

    Column.prototype.getLastColumn = function () {

      if (!this.isGroup) {

        return this;
      } else {

        if (this.columns.length) {

          return this.columns[this.columns.length - 1].getLastColumn();
        } else {

          return false;
        }
      }
    };

    //return all columns in a group

    Column.prototype.getColumns = function () {

      return this.columns;
    };

    //return all columns in a group

    Column.prototype.getCells = function () {

      return this.cells;
    };

    //retreive the top column in a group of columns

    Column.prototype.getTopColumn = function () {

      if (this.parent.isGroup) {

        return this.parent.getTopColumn();
      } else {

        return this;
      }
    };

    //return column definition object

    Column.prototype.getDefinition = function (updateBranches) {

      var colDefs = [];

      if (this.isGroup && updateBranches) {

        this.columns.forEach(function (column) {

          colDefs.push(column.getDefinition(true));
        });

        this.definition.columns = colDefs;
      }

      return this.definition;
    };

    //////////////////// Actions ////////////////////


    Column.prototype.checkColumnVisibility = function () {

      var visible = false;

      this.columns.forEach(function (column) {

        if (column.visible) {

          visible = true;
        }
      });

      if (visible) {

        this.show();

        this.parent.table.options.columnVisibilityChanged(this.getComponent(), false);
      } else {

        this.hide();
      }
    };

    //show column

    Column.prototype.show = function () {

      if (!this.visible) {

        this.visible = true;

        this.element.show();

        this.table.columnManager._verticalAlignHeaders();

        if (this.parent.isGroup) {

          this.parent.checkColumnVisibility();
        }

        this.cells.forEach(function (cell) {

          cell.show();
        });

        if (this.table.options.persistentLayout && this.table.extExists("persistentLayout", true)) {

          this.table.extensions.persistentLayout.save();
        }

        this.table.options.groupVisibilityChanged(this.getComponent(), true);
      }
    };

    //hide column

    Column.prototype.hide = function () {

      if (this.visible) {

        this.visible = false;

        this.element.hide();

        this.table.columnManager._verticalAlignHeaders();

        if (this.parent.isGroup) {

          this.parent.checkColumnVisibility();
        }

        this.cells.forEach(function (cell) {

          cell.hide();
        });

        if (this.table.options.persistentLayout && this.table.extExists("persistentLayout", true)) {

          this.table.extensions.persistentLayout.save();
        }

        this.table.options.groupVisibilityChanged(this.getComponent(), false);
      }
    };

    Column.prototype.setWidth = function (width) {

      this.widthFixed = true;

      this.setWidthActual(width);
    };

    Column.prototype.setWidthActual = function (width) {

      if (isNaN(width)) {

        width = Math.floor(this.table.element.innerWidth() / 100 * parseInt(width));
      }

      width = Math.max(this.minWidth, width);

      this.width = width;

      if (!this.isGroup) {

        this.element.css("width", width || "");

        this.cells.forEach(function (cell) {

          cell.setWidth(width);
        });
      }

      //set resizable handles

      if (this.table.extExists("frozenColumns")) {

        this.table.extensions.frozenColumns.layout();
      }
    };

    Column.prototype.checkCellHeights = function () {

      var rows = [];

      this.cells.forEach(function (cell) {

        if (cell.row.heightInitialized) {

          if (cell.row.element[0].offsetParent !== null) {

            rows.push(cell.row);

            cell.row.clearCellHeight();
          } else {

            cell.row.heightInitialized = false;
          }
        }
      });

      rows.forEach(function (row) {

        row.calcHeight();
      });

      rows.forEach(function (row) {

        row.setCellHeight();
      });
    };

    Column.prototype.getWidth = function () {

      return this.element.outerWidth();
    };

    Column.prototype.getHeight = function () {

      return this.element.outerHeight();
    };

    Column.prototype.setMinWidth = function (minWidth) {

      this.minWidth = minWidth;

      this.element.css("min-width", minWidth || "");

      this.cells.forEach(function (cell) {

        cell.setMinWidth(minWidth);
      });
    };

    Column.prototype.delete = function () {

      if (this.isGroup) {

        this.columns.forEach(function (column) {

          column.delete();
        });
      }

      var cellCount = this.cells.length;

      for (var i = 0; i < cellCount; i++) {

        this.cells[0].delete();
      }

      this.element.detach();

      this.table.columnManager.deregisterColumn(this);
    };

    //////////////// Cell Management /////////////////


    //generate cell for this column

    Column.prototype.generateCell = function (row) {

      var self = this;

      var cell = new Cell(self, row);

      this.cells.push(cell);

      return cell;
    };

    Column.prototype.reinitializeWidth = function () {

      this.widthFixed = false;

      //set width if present

      if (typeof this.definition.width !== "undefined") {

        this.setWidth(this.definition.width);
      }

      this.fitToData();
    };

    //set column width to maximum cell width

    Column.prototype.fitToData = function () {

      var self = this;

      if (!this.widthFixed) {

        this.element.css("width", "");

        self.cells.forEach(function (cell) {

          cell.setWidth("");
        });
      }

      var maxWidth = this.element.outerWidth();

      if (!self.width || !this.widthFixed) {

        self.cells.forEach(function (cell) {

          var width = cell.getWidth();

          if (width > maxWidth) {

            maxWidth = width;
          }
        });

        if (maxWidth) {

          self.setWidthActual(maxWidth + 1);
        }
      }
    };

    Column.prototype.deleteCell = function (cell) {

      var index = this.cells.indexOf(cell);

      if (index > -1) {

        this.cells.splice(index, 1);
      }
    };

    //////////////// Event Bindings /////////////////


    //////////////// Object Generation /////////////////

    Column.prototype.getComponent = function () {

      return new ColumnComponent(this);
    };

    var RowManager = function RowManager(table) {

      this.table = table;

      this.element = $("<div class='tabulator-tableHolder' tabindex='0'></div>"); //containing element

      this.tableElement = $("<div class='tabulator-table'></div>"); //table element

      this.columnManager = null; //hold column manager object

      this.height = 0; //hold height of table element


      this.firstRender = false; //handle first render

      this.renderMode = "classic"; //current rendering mode


      this.rows = []; //hold row data objects

      this.activeRows = []; //rows currently available to on display in the table

      this.activeRowsCount = 0; //count of active rows


      this.displayRows = []; //rows currently on display in the table

      this.displayRowsCount = 0; //count of display rows


      this.scrollTop = 0;

      this.scrollLeft = 0;

      this.vDomRowHeight = 20; //approximation of row heights for padding


      this.vDomTop = 0; //hold position for first rendered row in the virtual DOM

      this.vDomBottom = 0; //hold possition for last rendered row in the virtual DOM


      this.vDomScrollPosTop = 0; //last scroll position of the vDom top;

      this.vDomScrollPosBottom = 0; //last scroll position of the vDom bottom;


      this.vDomTopPad = 0; //hold value of padding for top of virtual DOM

      this.vDomBottomPad = 0; //hold value of padding for bottom of virtual DOM


      this.vDomMaxRenderChain = 90; //the maximum number of dom elements that can be rendered in 1 go


      this.vDomWindowBuffer = 0; //window row buffer before removing elements, to smooth scrolling


      this.vDomWindowMinTotalRows = 20; //minimum number of rows to be generated in virtual dom (prevent buffering issues on tables with tall rows)

      this.vDomWindowMinMarginRows = 5; //minimum number of rows to be generated in virtual dom margin


      this.vDomTopNewRows = []; //rows to normalize after appending to optimize render speed

      this.vDomBottomNewRows = []; //rows to normalize after appending to optimize render speed


      this._initialize();
    };

    //////////////// Setup Functions /////////////////


    //return containing element

    RowManager.prototype.getElement = function () {

      return this.element;
    };

    //return table element

    RowManager.prototype.getTableElement = function () {

      return this.tableElement;
    };

    //link to column manager

    RowManager.prototype.setColumnManager = function (manager) {

      this.columnManager = manager;
    };

    RowManager.prototype._initialize = function () {

      var self = this;

      //initialize manager

      self.element.append(self.tableElement);

      self.firstRender = true;

      //scroll header along with table body

      self.element.scroll(function () {

        var left = self.element[0].scrollLeft;

        //handle horizontal scrolling

        if (self.scrollLeft != left) {

          self.columnManager.scrollHorizontal(left);

          if (self.table.options.groupBy) {

            self.table.extensions.groupRows.scrollHeaders(left);
          }

          if (self.table.extExists("columnCalcs")) {

            self.table.extensions.columnCalcs.scrollHorizontal(left);
          }
        }

        self.scrollLeft = left;
      });

      //handle virtual dom scrolling

      if (self.table.options.height && self.table.options.virtualDom) {

        self.element.scroll(function () {

          var top = self.element[0].scrollTop;

          var dir = self.scrollTop > top;

          //handle verical scrolling

          if (self.scrollTop != top) {

            self.scrollTop = top;

            self.scrollVertical(dir);
          } else {

            self.scrollTop = top;
          }
        });
      }
    };

    ////////////////// Row Manipulation //////////////////


    RowManager.prototype.findRow = function (subject) {

      var self = this;

      if ((typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) == "object") {

        if (subject instanceof Row) {

          //subject is row element

          return subject;
        } else if (subject instanceof RowComponent) {

          //subject is public row component

          return subject._getSelf() || false;
        } else if (subject instanceof jQuery) {

          //subject is a jquery element of the row

          var match = self.rows.find(function (row) {

            return row.element === subject;
          });

          return match || false;
        }
      } else {

        //subject should be treated as the index of the row

        var _match = self.rows.find(function (row) {

          return row.data[self.table.options.index] == subject;
        });

        return _match || false;
      }

      //catch all for any other type of input


      return false;
    };

    RowManager.prototype.scrollToRow = function (row) {

      var rowIndex;

      rowIndex = this.displayRows.indexOf(row);

      if (rowIndex > -1) {

        switch (this.renderMode) {

          case "classic":

            this.element.scrollTop(row.element.offset().top - this.element.offset().top + this.element.scrollTop());

            break;

          case "virtual":

            this._virtualRenderFill(rowIndex, true);

            break;

        }
      } else {

        console.warn("Scroll Error - Row not visible");
      }
    };

    ////////////////// Data Handling //////////////////


    RowManager.prototype.setData = function (data) {

      var self = this;

      self.table.options.dataLoading(data);

      self.rows = [];

      if (this.table.options.history && this.table.extExists("history")) {

        this.table.extensions.history.clear();
      }

      if (Array.isArray(data)) {

        if (this.table.extExists("selectRow")) {

          this.table.extensions.selectRow.clearSelectionData();
        }

        data.forEach(function (def, i) {

          var row = new Row(def, self);

          self.rows.push(row);
        });

        self.table.options.dataLoaded(data);

        self.refreshActiveData(true);
      } else {

        console.error("Data Loading Error - Unable to process data due to invalid data type \nExpecting: array \nReceived: ", typeof data === 'undefined' ? 'undefined' : _typeof(data), "\nData:     ", data);
      }
    };

    RowManager.prototype.deleteRow = function (row) {

      var allIndex = this.rows.indexOf(row),
          activeIndex = this.activeRows.indexOf(row),
          displayIndex = this.displayRows.indexOf(row);

      if (displayIndex > -1) {

        this.displayRows.splice(displayIndex, 1);
      }

      if (activeIndex > -1) {

        this.activeRows.splice(activeIndex, 1);
      }

      if (allIndex > -1) {

        this.rows.splice(allIndex, 1);
      }

      this.setActiveRows(this.activeRows);

      this.setDisplayRows(this.displayRows);

      this.table.options.rowDeleted(row.getComponent());

      this.table.options.dataEdited(this.getData());

      if (this.table.options.pagination && this.table.extExists("page")) {

        this.refreshActiveData();
      } else {

        this.renderTable();
      }
    };

    RowManager.prototype.addRow = function (data, pos, index) {

      var row = this.addRowActual(data, pos, index);

      if (this.table.options.history && this.table.extExists("history")) {

        this.table.extensions.history.action("rowAdd", row, { data: data, pos: pos, index: index });
      };

      return row;
    };

    //add multiple rows

    RowManager.prototype.addRows = function (data, pos, index) {

      var self = this,
          rows = [];

      pos = this.findAddRowPos(pos);

      if (!Array.isArray(data)) {

        data = [data];
      }

      if (typeof index == "undefined" && pos || typeof index !== "undefined" && !pos) {

        data.reverse();
      }

      data.forEach(function (item) {

        var row = self.addRow(item, pos, index);

        rows.push(row.getComponent());
      });

      return rows;
    };

    RowManager.prototype.findAddRowPos = function (pos) {

      if (typeof pos === "undefined") {

        pos = this.table.options.addRowPos;
      }

      if (pos === "pos") {

        pos = true;
      }

      if (pos === "bottom") {

        pos = false;
      }

      return pos;
    };

    RowManager.prototype.addRowActual = function (data, pos, index) {

      var safeData = data || {},
          row = new Row(safeData, this),
          top = this.findAddRowPos(pos);

      if (index) {

        index = this.findRow(index);
      }

      if (index) {

        var allIndex = this.rows.indexOf(index),
            activeIndex = this.activeRows.indexOf(index),
            displayIndex = this.displayRows.indexOf(index);

        if (displayIndex > -1) {

          this.displayRows.splice(top ? displayIndex : displayIndex + 1, 0, row);
        }

        if (activeIndex > -1) {

          this.activeRows.splice(top ? activeIndex : activeIndex + 1, 0, row);
        }

        if (allIndex > -1) {

          this.rows.splice(top ? allIndex : allIndex + 1, 0, row);
        }
      } else {

        if (top) {

          this.displayRows.unshift(row);

          this.activeRows.unshift(row);

          this.rows.unshift(row);
        } else {

          this.displayRows.push(row);

          this.activeRows.push(row);

          this.rows.push(row);
        }
      }

      this.setDisplayRows(this.displayRows);

      this.setActiveRows(this.activeRows);

      this.table.options.rowAdded(row.getComponent());

      this.table.options.dataEdited(this.getData());

      this.renderTable();

      return row;
    };

    RowManager.prototype.moveRow = function (from, to, after) {

      this._moveRowInArray(this.rows, from, to, after);

      this._moveRowInArray(this.activeRows, from, to, after);

      this._moveRowInArray(this.displayRows, from, to, after);

      this.table.options.rowMoved(from.getComponent());
    };

    RowManager.prototype._moveRowInArray = function (rows, from, to, after) {

      var fromIndex = rows.indexOf(from),
          toIndex,
          start,
          end;

      if (fromIndex > -1) {

        rows.splice(fromIndex, 1);

        toIndex = rows.indexOf(to);

        if (toIndex > -1) {

          if (after) {

            rows.splice(toIndex + 1, 0, from);
          } else {

            rows.splice(toIndex, 0, from);
          }
        } else {

          rows.splice(fromIndex, 0, from);
        }
      }

      //restyle rows

      if (rows === this.displayRows) {

        start = fromIndex < toIndex ? fromIndex : toIndex;

        end = toIndex > fromIndex ? toIndex : fromIndex + 1;

        for (var i = start; i <= end; i++) {

          if (rows[i]) {

            this.styleRow(rows[i], i);
          }
        }
      }
    };

    RowManager.prototype.clearData = function () {

      this.setData([]);
    };

    RowManager.prototype.getRowIndex = function (row) {

      return this.findRowIndex(row, this.rows);
    };

    RowManager.prototype.getDisplayRowIndex = function (row) {

      return this.findRowIndex(row, this.displayRows);
    };

    RowManager.prototype.nextDisplayRow = function (row) {

      var index = this.getDisplayRowIndex(row),
          nextRow = false;

      if (index !== false && index < this.displayRowsCount - 1) {

        nextRow = this.displayRows[index + 1];
      }

      return nextRow;
    };

    RowManager.prototype.prevDisplayRow = function (row) {

      var index = this.getDisplayRowIndex(row),
          prevRow = false;

      if (index) {

        prevRow = this.displayRows[index - 1];
      }

      return prevRow;
    };

    RowManager.prototype.findRowIndex = function (row, list) {

      var rowIndex;

      row = this.findRow(row);

      if (row) {

        rowIndex = list.indexOf(row);

        if (rowIndex > -1) {

          return rowIndex;
        }
      }

      return false;
    };

    RowManager.prototype.getData = function (active) {

      var self = this,
          output = [];

      var rows = active ? self.activeRows : self.rows;

      rows.forEach(function (row) {

        output.push(row.getData(true));
      });

      return output;
    };

    RowManager.prototype.getHtml = function (active) {

      var data = this.getData(active),
          columns = this.table.columnManager.getComponents(),
          header = "",
          body = "",
          table = "";

      //build header row

      columns.forEach(function (column) {

        var def = column.getDefinition();

        if (column.getVisibility()) {

          header += '<th>' + def.title + '</th>';
        }
      });

      //build body rows

      data.forEach(function (rowData) {

        var row = "";

        columns.forEach(function (column) {

          var value = typeof rowData[column.getField()] === "undefined" ? "" : rowData[column.getField()];

          if (column.getVisibility()) {

            row += '<td>' + value + '</td>';
          }
        });

        body += '<tr>' + row + '</tr>';
      });

      //build table

      table = '<table>\n\n \t\t\t\t<thead>\n\n \t\t\t\t<tr>' + header + '</tr>\n\n \t\t\t\t</thead>\n\n \t\t\t\t<tbody>' + body + '</tbody>\n\n \t\t\t\t</table>';

      return table;
    };

    RowManager.prototype.getComponents = function (active) {

      var self = this,
          output = [];

      var rows = active ? self.activeRows : self.rows;

      rows.forEach(function (row) {

        output.push(row.getComponent());
      });

      return output;
    };

    RowManager.prototype.getDataCount = function (active) {

      return active ? this.rows.length : this.activeRows.length;
    };

    RowManager.prototype._genRemoteRequest = function () {

      var self = this,
          table = self.table,
          options = table.options,
          params = {};

      if (table.extExists("page")) {

        //set sort data if defined

        if (options.ajaxSorting) {

          var sorters = self.table.extensions.sort.getSort();

          sorters.forEach(function (item) {

            delete item.column;
          });

          params[self.table.extensions.page.paginationDataSentNames.sorters] = sorters;
        }

        //set filter data if defined

        if (options.ajaxFiltering) {

          var filters = self.table.extensions.filter.getFilters(true, true);

          params[self.table.extensions.page.paginationDataSentNames.filters] = filters;
        }

        self.table.extensions.ajax.setParams(params, true);
      }

      table.extensions.ajax.sendRequest(function (data) {

        self.setData(data);
      });
    };

    //choose the path to refresh data after a filter update

    RowManager.prototype.filterRefresh = function () {

      var table = this.table,
          options = table.options;

      if (options.ajaxFiltering) {

        if (options.pagination == "remote" && table.extExists("page")) {

          table.extensions.page.reset(true);

          table.extensions.page.setPage(1);
        } else {

          //assume data is url, make ajax call to url to get data

          this._genRemoteRequest();
        }
      } else {

        this.refreshActiveData();
      }
    };

    //choose the path to refresh data after a sorter update

    RowManager.prototype.sorterRefresh = function () {

      var table = this.table,
          options = this.table.options,
          left = this.scrollLeft;

      if (options.ajaxSorting) {

        if (options.pagination == "remote" && table.extExists("page")) {

          table.extensions.page.reset(true);

          table.extensions.page.setPage(1);
        } else {

          //assume data is url, make ajax call to url to get data

          this._genRemoteRequest();
        }
      } else {

        this.refreshActiveData();
      }

      this.element.scrollLeft(left);
    };

    //set active data set

    RowManager.prototype.refreshActiveData = function (dataChanged) {

      var self = this,
          table = this.table;

      if (table.options.selectable && !table.options.selectablePersistence && table.extExists("selectRow")) {

        table.extensions.selectRow.deselectRows();
      }

      //filter data

      if (table.extExists("filter")) {

        if (table.extensions.filter.hasChanged() || dataChanged) {

          self.setActiveRows(table.extensions.filter.filter(self.rows));

          dataChanged = true;
        }
      } else {

        self.setActiveRows(self.rows.slice(0));
      }

      //sort data

      if (table.extExists("sort")) {

        if (table.extensions.sort.hasChanged() || dataChanged) {

          table.extensions.sort.sort();

          dataChanged = true;
        }
      }

      //group data

      if (table.options.groupBy && table.extExists("groupRows")) {

        self.setDisplayRows(table.extensions.groupRows.getRows(this.activeRows, dataChanged));

        if (table.options.pagination) {

          console.warn("Invalid Setup Combination - Pagination and Row Grouping cannot be enabled at the same time");
        }
      } else {

        //paginate data

        if (table.options.pagination && table.extExists("page")) {

          if (table.extensions.page.getMode() == "local") {

            if (dataChanged) {

              table.extensions.page.reset();
            }

            table.extensions.page.setMaxRows(this.activeRows.length);
          }

          self.setDisplayRows(table.extensions.page.getRows(this.activeRows));
        } else {

          self.setDisplayRows(self.activeRows.slice(0));
        }
      }

      if (self.element.is(":visible")) {

        self.renderTable();
      }

      if (table.extExists("columnCalcs")) {

        table.extensions.columnCalcs.recalc(this.displayRows);
      }
    };

    RowManager.prototype.setActiveRows = function (activeRows) {

      this.activeRows = activeRows;

      this.activeRowsCount = this.activeRows.length;
    };

    RowManager.prototype.setDisplayRows = function (displayRows) {

      this.displayRows = displayRows;

      this.displayRowsCount = this.displayRows.length;
    };

    //return only actual rows (not group headers etc)

    RowManager.prototype.getRows = function () {

      return this.rows;
    };

    ///////////////// Table Rendering /////////////////


    RowManager.prototype.renderTable = function () {

      var self = this;

      self.table.options.renderStarted();

      self.element.scrollTop(0);

      if (!self.height || !self.table.options.virtualDom || self.table.options.pagination) {

        self.renderMode = "classic";

        self._simpleRender();
      } else {

        self.renderMode = "virtual";

        self._virtualRenderFill();
      }

      if (self.firstRender) {

        if (self.displayRowsCount) {

          self.firstRender = false;

          self.table.extensions.layout.layout();
        } else {

          self.renderEmptyScroll();
        }
      }

      if (self.table.extExists("frozenColumns")) {

        self.table.extensions.frozenColumns.layout();
      }

      if (!self.displayRowsCount) {

        if (self.table.options.placeholder) {

          self.getElement().append(self.table.options.placeholder);
        }
      }

      self.table.options.renderComplete();
    };

    RowManager.prototype.getRenderMode = function () {

      return this.renderMode;
    };

    //simple render on heightless table

    RowManager.prototype._simpleRender = function () {

      var self = this,
          element = this.tableElement;

      self._clearVirtualDom();

      if (self.displayRowsCount) {

        self.displayRows.forEach(function (row, index) {

          self.styleRow(row, index);

          element.append(row.getElement());

          row.initialize(true);
        });
      } else {

        self.renderEmptyScroll();
      }
    };

    //show scrollbars on empty table div

    RowManager.prototype.renderEmptyScroll = function () {

      var self = this;

      self.tableElement.css({

        "min-width": self.table.columnManager.getWidth(),

        "min-height": "1px",

        "visibility": "hidden"

      });
    };

    RowManager.prototype._clearVirtualDom = function () {

      var element = this.tableElement;

      if (this.table.options.placeholder) {

        this.table.options.placeholder.detach();
      }

      element.children().detach();

      element.css({

        "padding-top": "",

        "padding-bottom": "",

        "min-width": "",

        "min-height": "",

        "visibility": ""

      });

      this.scrollTop = 0;

      this.scrollLeft = 0;

      this.vDomTop = 0;

      this.vDomBottom = 0;

      this.vDomTopPad = 0;

      this.vDomBottomPad = 0;
    };

    RowManager.prototype.styleRow = function (row, index) {

      if (index % 2) {

        row.element.addClass("tabulator-row-even").removeClass("tabulator-row-odd");
      } else {

        row.element.addClass("tabulator-row-odd").removeClass("tabulator-row-even");
      }
    };

    //full virtual render

    RowManager.prototype._virtualRenderFill = function (position, forceMove) {

      var self = this,
          element = self.tableElement,
          holder = self.element,
          topPad = 0,
          rowsHeight = 0,
          topPadHeight = 0,
          i = 0;

      position = position || 0;

      if (!position) {

        self._clearVirtualDom();
      } else {

        element.children().detach();

        //check if position is too close to bottom of table

        var heightOccpied = (self.displayRowsCount - position) * self.vDomRowHeight;

        if (heightOccpied < self.height) {

          position -= Math.ceil((self.height - heightOccpied) / self.displayRowsCount);

          if (position < 0) {

            position = 0;
          }
        }

        //calculate initial pad

        topPad = Math.min(Math.max(Math.floor(self.vDomWindowBuffer / self.vDomRowHeight), self.vDomWindowMinMarginRows), position);

        position -= topPad;
      }

      if (self.displayRowsCount && self.element.is(":visible")) {

        self.vDomTop = position;

        self.vDomBottom = position - 1;

        while ((rowsHeight <= self.height + self.vDomWindowBuffer || i < self.vDomWindowMinTotalRows) && self.vDomBottom < self.displayRowsCount - 1) {

          var index = self.vDomBottom + 1,
              row = self.displayRows[index];

          self.styleRow(row, index);

          element.append(row.getElement());

          if (!row.initialized) {

            row.initialize(true);
          } else {

            if (!row.heightInitialized) {

              row.normalizeHeight(true);
            }
          }

          if (i < topPad) {

            topPadHeight += row.getHeight();
          } else {

            rowsHeight += row.getHeight();
          }

          self.vDomBottom++;

          i++;
        }

        if (!position) {

          this.vDomTopPad = 0;

          //adjust rowheight to match average of rendered elements

          self.vDomRowHeight = Math.floor((rowsHeight + topPadHeight) / i);

          self.vDomBottomPad = self.vDomRowHeight * (self.displayRowsCount - self.vDomBottom - 1);

          self.vDomScrollHeight = topPadHeight + rowsHeight + self.vDomBottomPad - self.height;
        } else {

          self.vDomTopPad = !forceMove ? self.scrollTop - topPadHeight : self.vDomRowHeight * this.vDomTop + topPadHeight;

          self.vDomBottomPad = self.vDomBottom == self.displayRowsCount - 1 ? 0 : Math.max(self.vDomScrollHeight - self.vDomTopPad - rowsHeight - topPadHeight, 0);
        }

        element[0].style.paddingTop = self.vDomTopPad + "px";

        element[0].style.paddingBottom = self.vDomBottomPad + "px";

        if (forceMove) {

          this.scrollTop = self.vDomTopPad + topPadHeight;
        }

        this.scrollTop = Math.min(this.scrollTop, this.element[0].scrollHeight - this.height);

        //adjust for horizontal scrollbar if present

        if (this.element[0].scrollWidth > this.element[0].offsetWidt) {

          this.scrollTop += this.element[0].offsetHeight - this.element[0].clientHeight;
        }

        this.vDomScrollPosTop = this.scrollTop;

        this.vDomScrollPosBottom = this.scrollTop;

        holder.scrollTop(this.scrollTop);

        if (self.table.options.groupBy) {

          if (self.table.extensions.layout.getMode() != "fitDataFill" && self.displayRowsCount == self.table.extensions.groupRows.countGroups()) {

            self.tableElement.css({

              "min-width": self.table.columnManager.getWidth()

            });
          }
        }
      } else {

        this.renderEmptyScroll();
      }
    };

    //handle vertical scrolling

    RowManager.prototype.scrollVertical = function (dir) {

      var topDiff = this.scrollTop - this.vDomScrollPosTop;

      var bottomDiff = this.scrollTop - this.vDomScrollPosBottom;

      var margin = this.vDomWindowBuffer * 2;

      if (-topDiff > margin || bottomDiff > margin) {

        //if big scroll redraw table;

        this._virtualRenderFill(Math.floor(this.element[0].scrollTop / this.element[0].scrollHeight * this.displayRowsCount));
      } else {

        if (dir) {

          //scrolling up

          if (topDiff < 0) {

            this._addTopRow(-topDiff);
          }

          if (topDiff < 0) {

            //hide bottom row if needed

            if (this.vDomScrollHeight - this.scrollTop > this.vDomWindowBuffer) {

              this._removeBottomRow(-bottomDiff);
            }
          }
        } else {

          //scrolling down

          if (topDiff >= 0) {

            //hide top row if needed

            if (this.scrollTop > this.vDomWindowBuffer) {

              this._removeTopRow(topDiff);
            }
          }

          if (bottomDiff >= 0) {

            this._addBottomRow(bottomDiff);
          }
        }
      }
    };

    RowManager.prototype._addTopRow = function (topDiff) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


      var table = this.tableElement;

      if (this.vDomTop) {

        var index = this.vDomTop - 1,
            topRow = this.displayRows[index],
            topRowHeight = topRow.getHeight() || this.vDomRowHeight;

        //hide top row if needed

        if (topDiff >= topRowHeight) {

          this.styleRow(topRow, index);

          table.prepend(topRow.getElement());

          if (!topRow.initialized || !topRow.heightInitialized) {

            this.vDomTopNewRows.push(topRow);

            if (!topRow.heightInitialized) {

              topRow.clearCellHeight();
            }
          }

          topRow.initialize();

          this.vDomTopPad -= topRowHeight;

          if (this.vDomTopPad < 0) {

            this.vDomTopPad = (this.vDomTop - 1) * this.vDomRowHeight;
          }

          table[0].style.paddingTop = this.vDomTopPad + "px";

          this.vDomScrollPosTop -= topRowHeight;

          this.vDomTop--;
        }

        topDiff = -(this.scrollTop - this.vDomScrollPosTop);

        if (i < this.vDomMaxRenderChain && this.vDomTop && topDiff >= (this.displayRows[this.vDomTop - 1].getHeight() || this.vDomRowHeight)) {

          this._addTopRow(topDiff, i + 1);
        } else {

          this._quickNormalizeRowHeight(this.vDomTopNewRows);
        }
      }
    };

    RowManager.prototype._removeTopRow = function (topDiff) {

      var table = this.tableElement,
          topRow = this.displayRows[this.vDomTop],
          topRowHeight = topRow.getHeight() || this.vDomRowHeight;

      if (topDiff >= topRowHeight) {

        topRow.element.detach();

        this.vDomTopPad += topRowHeight;

        table[0].style.paddingTop = this.vDomTopPad + "px";

        this.vDomScrollPosTop += this.vDomTop ? topRowHeight : topRowHeight + this.vDomWindowBuffer;

        this.vDomTop++;

        topDiff = this.scrollTop - this.vDomScrollPosTop;

        this._removeTopRow(topDiff);
      }
    };

    RowManager.prototype._addBottomRow = function (bottomDiff) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


      var table = this.tableElement;

      if (this.vDomBottom < this.displayRowsCount - 1) {

        var index = this.vDomBottom + 1,
            bottomRow = this.displayRows[index],
            bottomRowHeight = bottomRow.getHeight() || this.vDomRowHeight;

        //hide bottom row if needed

        if (bottomDiff >= bottomRowHeight) {

          this.styleRow(bottomRow, index);

          table.append(bottomRow.getElement());

          if (!bottomRow.initialized || !bottomRow.heightInitialized) {

            this.vDomBottomNewRows.push(bottomRow);

            if (!bottomRow.heightInitialized) {

              bottomRow.clearCellHeight();
            }
          }

          bottomRow.initialize();

          this.vDomBottomPad -= bottomRowHeight;

          if (this.vDomBottomPad < 0 || index == this.displayRowsCount - 1) {

            this.vDomBottomPad = 0;
          }

          table[0].style.paddingBottom = this.vDomBottomPad + "px";

          this.vDomScrollPosBottom += bottomRowHeight;

          this.vDomBottom++;
        }

        bottomDiff = this.scrollTop - this.vDomScrollPosBottom;

        if (i < this.vDomMaxRenderChain && this.vDomBottom < this.displayRowsCount - 1 && bottomDiff >= (this.displayRows[this.vDomBottom + 1].getHeight() || this.vDomRowHeight)) {

          this._addBottomRow(bottomDiff, i + 1);
        } else {

          this._quickNormalizeRowHeight(this.vDomBottomNewRows);
        }
      }
    };

    RowManager.prototype._removeBottomRow = function (bottomDiff) {

      var table = this.tableElement,
          bottomRow = this.displayRows[this.vDomBottom],
          bottomRowHeight = bottomRow.getHeight() || this.vDomRowHeight;

      if (bottomDiff >= bottomRowHeight) {

        bottomRow.element.detach();

        this.vDomBottomPad += bottomRowHeight;

        if (this.vDomBottomPad < 0) {

          this.vDomBottomPad == 0;
        }

        table[0].style.paddingBottom = this.vDomBottomPad + "px";

        this.vDomScrollPosBottom -= bottomRowHeight;

        this.vDomBottom--;

        bottomDiff = -(this.scrollTop - this.vDomScrollPosBottom);

        this._removeBottomRow(bottomDiff);
      }
    };

    RowManager.prototype._quickNormalizeRowHeight = function (rows) {

      rows.forEach(function (row) {

        row.calcHeight();
      });

      rows.forEach(function (row) {

        row.setCellHeight();
      });

      rows.length = 0;
    };

    //normalize height of active rows

    RowManager.prototype.normalizeHeight = function () {

      var self = this;

      self.displayRows.forEach(function (row) {

        row.normalizeHeight();
      });
    };

    //adjust the height of the table holder to fit in the Tabulator element

    RowManager.prototype.adjustTableSize = function () {

      var self = this;

      if (self.table.options.height) {

        var otherHeigt = self.columnManager.getElement().outerHeight() + (self.table.footerManager ? self.table.footerManager.getElement().outerHeight() : 0);

        self.element.css({

          "min-height": "calc(100% - " + otherHeigt + "px)",

          "height": "calc(100% - " + otherHeigt + "px)",

          "max-height": "calc(100% - " + otherHeigt + "px)"

        });

        self.height = self.element.innerHeight();

        self.vDomWindowBuffer = self.table.options.virtualDomBuffer || self.height;
      }
    };

    //renitialize all rows

    RowManager.prototype.reinitialize = function () {

      this.rows.forEach(function (row) {

        row.reinitialize();
      });
    };

    //redraw table

    RowManager.prototype.redraw = function (force) {

      var pos = 0;

      if (this.renderMode == "virtual") {

        this.adjustTableSize();
      }

      if (!force) {

        if (self.renderMode == "simple") {

          this._simpleRender();
        } else {

          var pos = Math.floor(this.element.scrollTop() / this.element[0].scrollHeight * this.displayRowsCount);

          this._virtualRenderFill(pos);
        }

        if (!this.displayRowsCount) {

          if (this.table.options.placeholder) {

            this.getElement().append(this.table.options.placeholder);
          }
        }
      } else {

        this.renderTable();
      }
    };

    RowManager.prototype.resetScroll = function () {

      this.element.scrollLeft(0);

      this.element.scrollTop(0);

      this.element.scroll();
    };

    //public row object

    var RowComponent = function RowComponent(row) {

      this.row = row;
    };

    RowComponent.prototype.getData = function () {

      return this.row.getData(true);
    };

    RowComponent.prototype.getElement = function () {

      return this.row.getElement();
    };

    RowComponent.prototype.getCells = function () {

      var cells = [];

      this.row.getCells().forEach(function (cell) {

        cells.push(cell.getComponent());
      });

      return cells;
    };

    RowComponent.prototype.getCell = function (column) {

      return this.row.getCell(column).getComponent();
    };

    RowComponent.prototype.getIndex = function () {

      return this.row.getData(true)[this.row.table.options.index];
    };

    RowComponent.prototype.delete = function () {

      this.row.delete();
    };

    RowComponent.prototype.scrollTo = function () {

      this.row.table.rowManager.scrollToRow(this.row);
    };

    RowComponent.prototype.update = function (data) {

      this.row.updateData(data);
    };

    RowComponent.prototype.normalizeHeight = function () {

      this.row.normalizeHeight(true);
    };

    RowComponent.prototype.select = function () {

      this.row.table.extensions.selectthis.Row.selectRows(this.row);
    };

    RowComponent.prototype.deselect = function () {

      this.row.table.extensions.selectthis.Row.deselectRows(this.row);
    };

    RowComponent.prototype.toggleSelect = function () {

      this.row.table.extensions.selectthis.Row.toggleRow(this.row);
    };

    RowComponent.prototype._getSelf = function () {

      return this.row;
    };

    var Row = function Row(data, parent) {

      this.table = parent.table;

      this.parent = parent;

      this.data = {};

      this.type = "row"; //type of element

      this.element = $("<div class='tabulator-row' role='row'></div>");

      this.extensions = {}; //hold extension variables;

      this.cells = [];

      this.height = 0; //hold element height

      this.outerHeight = 0; //holde lements outer height

      this.initialized = false; //element has been rendered

      this.heightInitialized = false; //element has resized cells to fit


      this.setData(data);

      this.generateElement();
    };

    Row.prototype.getElement = function () {

      return this.element;
    };

    Row.prototype.generateElement = function () {

      var self = this,
          dblTap,
          tapHold,
          tap;

      //set row selection characteristics

      if (self.table.options.selectable !== false && self.table.extExists("selectRow")) {

        self.table.extensions.selectRow.initializeRow(this);
      }

      //setup movable rows

      if (self.table.options.movableRows !== false && self.table.extExists("moveRow")) {

        self.table.extensions.moveRow.initializeRow(this);
      }

      //handle row click events

      if (self.table.options.rowClick) {

        self.element.on("click", function (e) {

          self.table.options.rowClick(e, self.getComponent());
        });
      }

      if (self.table.options.rowDblClick) {

        self.element.on("dblclick", function (e) {

          self.table.options.rowDblClick(e, self.getComponent());
        });
      }

      if (self.table.options.rowContext) {

        self.element.on("contextmenu", function (e) {

          self.table.options.rowContext(e, self.getComponent());
        });
      }

      if (self.table.options.rowTap) {

        tap = false;

        self.element.on("touchstart", function (e) {

          tap = true;
        });

        self.element.on("touchend", function (e) {

          if (tap) {

            self.table.options.rowTap(e, self.getComponent());
          }

          tap = false;
        });
      }

      if (self.table.options.rowDblTap) {

        dblTap = null;

        self.element.on("touchend", function (e) {

          if (dblTap) {

            clearTimeout(dblTap);

            dblTap = null;

            self.table.options.rowDblTap(e, self.getComponent());
          } else {

            dblTap = setTimeout(function () {

              clearTimeout(dblTap);

              dblTap = null;
            }, 300);
          }
        });
      }

      if (self.table.options.rowTapHold) {

        tapHold = null;

        self.element.on("touchstart", function (e) {

          clearTimeout(tapHold);

          tapHold = setTimeout(function () {

            clearTimeout(tapHold);

            tapHold = null;

            tap = false;

            self.table.options.rowTapHold(e, self.getComponent());
          }, 1000);
        });

        self.element.on("touchend", function (e) {

          clearTimeout(tapHold);

          tapHold = null;
        });
      }
    };

    Row.prototype.generateCells = function () {

      this.cells = this.table.columnManager.generateCells(this);
    };

    //functions to setup on first render

    Row.prototype.initialize = function (force) {

      var self = this;

      if (!self.initialized || force) {

        self.deleteCells();

        self.element.empty();

        //handle frozen cells

        if (this.table.extExists("frozenColumns")) {

          this.table.extensions.frozenColumns.layoutRow(this);
        }

        this.generateCells();

        self.cells.forEach(function (cell) {

          self.element.append(cell.getElement());
        });

        if (force) {

          self.normalizeHeight();
        }

        if (self.table.options.rowFormatter) {

          self.table.options.rowFormatter(self.getComponent());
        }

        self.initialized = true;
      }
    };

    Row.prototype.reinitializeHeight = function () {

      this.heightInitialized = false;

      if (this.element[0].offsetParent !== null) {

        this.normalizeHeight(true);
      }
    };

    Row.prototype.reinitialize = function () {

      this.initialized = false;

      this.heightInitialized = false;

      this.height = 0;

      if (this.element[0].offsetParent !== null) {

        this.initialize(true);
      }
    };

    //get heights when doing bulk row style calcs in virtual DOM

    Row.prototype.calcHeight = function () {

      this.height = this.element[0].clientHeight;

      this.outerHeight = this.element[0].offsetHeight;
    };

    //set of cells

    Row.prototype.setCellHeight = function () {

      var height = this.height;

      this.cells.forEach(function (cell) {

        cell.setHeight(height);
      });

      this.heightInitialized = true;
    };

    Row.prototype.clearCellHeight = function () {

      this.cells.forEach(function (cell) {

        cell.clearHeight();
      });
    };

    //normalize the height of elements in the row

    Row.prototype.normalizeHeight = function (force) {

      if (force) {

        this.clearCellHeight();
      }

      this.calcHeight();

      this.setCellHeight();
    };

    //set height of rows

    Row.prototype.setHeight = function (height, force) {

      if (this.height != height || force) {

        this.height = height;

        this.setCellHeight();

        // this.outerHeight = this.element.outerHeight();

        this.outerHeight = this.element[0].offsetHeight;
      }
    };

    //return rows outer height

    Row.prototype.getHeight = function () {

      return this.outerHeight;
    };

    //return rows outer Width

    Row.prototype.getWidth = function () {

      return this.element.outerWidth();
    };

    //////////////// Cell Management /////////////////


    Row.prototype.deleteCell = function (cell) {

      var index = this.cells.indexOf(cell);

      if (index > -1) {

        this.cells.splice(index, 1);
      }
    };

    //////////////// Data Management /////////////////


    Row.prototype.setData = function (data) {

      var self = this;

      if (self.table.extExists("mutator")) {

        self.data = self.table.extensions.mutator.transformRow(data);
      } else {

        self.data = data;
      }
    };

    //update the rows data

    Row.prototype.updateData = function (data) {

      var self = this;

      //mutate incomming data if needed

      if (self.table.extExists("mutator")) {

        data = self.table.extensions.mutator.transformRow(data);
      }

      //set data

      for (var attrname in data) {

        self.data[attrname] = data[attrname];
      }

      //update affected cells only

      for (var attrname in data) {

        var cell = this.getCell(attrname);

        if (cell) {

          if (cell.getValue() != data[attrname]) {

            cell.setValueProcessData(data[attrname]);
          }
        }
      }

      //Partial reinitialization if visible

      if (this.element.is(":visible")) {

        self.normalizeHeight();

        if (self.table.options.rowFormatter) {

          self.table.options.rowFormatter(self.getComponent());
        }
      } else {

        this.initialized = false;

        this.height = 0;
      }

      //self.reinitialize();


      self.table.options.rowUpdated(self.getComponent());
    };

    Row.prototype.getData = function (transform) {

      var self = this;

      if (transform) {

        if (self.table.extExists("accessor")) {

          return self.table.extensions.accessor.transformRow(self.data);
        }
      } else {

        return this.data;
      }
    };

    Row.prototype.getCell = function (column) {

      var match = false,
          column = this.table.columnManager.findColumn(column);

      match = this.cells.find(function (cell) {

        return cell.column === column;
      });

      return match;
    }, Row.prototype.getCellIndex = function (findCell) {

      return this.cells.findIndex(function (cell) {

        return cell === findCell;
      });
    }, Row.prototype.findNextEditableCell = function (index) {

      var nextCell = false;

      if (index < this.cells.length - 1) {

        for (var i = index + 1; i < this.cells.length; i++) {

          var cell = this.cells[i];

          if (cell.column.extensions.edit && cell.getElement().is(":visible")) {

            var allowEdit = true;

            if (typeof cell.column.extensions.edit.check == "function") {

              allowEdit = cell.column.extensions.edit.check(cell.getComponent());
            }

            if (allowEdit) {

              nextCell = cell;

              break;
            }
          }
        }
      }

      return nextCell;
    }, Row.prototype.findPrevEditableCell = function (index) {

      var prevCell = false;

      if (index > 0) {

        for (var i = index - 1; i >= 0; i--) {

          var cell = this.cells[i],
              allowEdit = true;

          if (cell.column.extensions.edit && cell.getElement().is(":visible")) {

            if (typeof cell.column.extensions.edit.check == "function") {

              allowEdit = cell.column.extensions.edit.check(cell.getComponent());
            }

            if (allowEdit) {

              prevCell = cell;

              break;
            }
          }
        }
      }

      return prevCell;
    }, Row.prototype.getCells = function () {

      return this.cells;
    },

    ///////////////////// Actions  /////////////////////


    Row.prototype.delete = function () {

      var index = this.table.rowManager.getRowIndex(this);

      this.deleteActual();

      if (this.table.options.history && this.table.extExists("history")) {

        if (index) {

          index = this.table.rowManager.rows[index - 1];
        }

        this.table.extensions.history.action("rowDelete", this, { data: this.getData(), pos: !index, index: index });
      };
    };

    Row.prototype.deleteActual = function () {

      this.table.rowManager.deleteRow(this);

      this.deleteCells();
    };

    Row.prototype.deleteCells = function () {

      var cellCount = this.cells.length;

      for (var i = 0; i < cellCount; i++) {

        this.cells[0].delete();
      }
    };

    //////////////// Object Generation /////////////////

    Row.prototype.getComponent = function () {

      return new RowComponent(this);
    };

    //public row object

    var CellComponent = function CellComponent(cell) {

      this.cell = cell;
    };

    CellComponent.prototype.getValue = function () {

      return this.cell.getValue();
    };

    CellComponent.prototype.getOldValue = function () {

      return this.cell.getOldValue();
    };

    CellComponent.prototype.getElement = function () {

      return $(this.cell.getElement());
    };

    CellComponent.prototype.getRow = function () {

      return this.cell.row.getComponent();
    };

    CellComponent.prototype.getData = function () {

      return this.cell.row.getData();
    };

    CellComponent.prototype.getField = function () {

      return this.cell.column.getField();
    };

    CellComponent.prototype.getColumn = function () {

      return this.cell.column.getComponent();
    };

    CellComponent.prototype.setValue = function (value, mutate) {

      if (typeof mutate == "undefined") {

        mutate = true;
      }

      this.cell.setValue(value, mutate);
    };

    CellComponent.prototype.restoreOldValue = function () {

      this.cell.setValueActual(this.cell.getOldValue());
    };

    CellComponent.prototype.edit = function () {

      this.cell.edit();
    };

    CellComponent.prototype.nav = function () {

      return this.cell.nav();
    };

    CellComponent.prototype.checkHeight = function () {

      this.cell.checkHeight();
    };

    CellComponent.prototype._getSelf = function () {

      return this.cell;
    };

    var Cell = function Cell(column, row) {

      this.table = column.table;

      this.column = column;

      this.row = row;

      // this.element = $("<div class='tabulator-cell' role='gridcell'></div>");

      this.element = null;

      this.value = null;

      this.oldValue = null;

      this.height = null;

      this.width = null;

      this.minWidth = null;

      this.build();
    };

    //////////////// Setup Functions /////////////////


    //generate element

    Cell.prototype.build = function () {

      this.generateElement();

      this.setWidth(this.column.width);

      this._configureCell();

      this.setValueActual(this.column.getFieldValue(this.row.data));
    };

    Cell.prototype.generateElement = function () {

      this.element = document.createElement('div');

      this.element.className = "tabulator-cell";

      this.element.setAttribute("role", "gridcell");

      this.element = $(this.element);
    };

    Cell.prototype._configureCell = function () {

      var self = this,
          cellEvents = self.column.cellEvents,
          element = self.element,
          field = this.column.getField(),
          dblTap,
          tapHold,
          tap;

      //set text alignment

      element[0].style.textAlign = self.column.hozAlign;

      if (field) {

        element.attr("tabulator-field", field);
      }

      if (self.column.definition.cssClass) {

        element.addClass(self.column.definition.cssClass);
      }

      //set event bindings

      if (cellEvents.cellClick) {

        self.element.on("click", function (e) {

          cellEvents.cellClick(e, self.getComponent());
        });
      }

      if (cellEvents.cellDblClick) {

        self.element.on("dblclick", function (e) {

          cellEvents.cellDblClick(e, self.getComponent());
        });
      }

      if (cellEvents.cellContext) {

        self.element.on("contextmenu", function (e) {

          cellEvents.cellContext(e, self.getComponent());
        });
      }

      if (cellEvents.cellTap) {

        tap = false;

        self.element.on("touchstart", function (e) {

          tap = true;
        });

        self.element.on("touchend", function (e) {

          if (tap) {

            cellEvents.cellTap(e, self.getComponent());
          }

          tap = false;
        });
      }

      if (cellEvents.cellDblTap) {

        dblTap = null;

        self.element.on("touchend", function (e) {

          if (dblTap) {

            clearTimeout(dblTap);

            dblTap = null;

            cellEvents.cellDblTap(e, self.getComponent());
          } else {

            dblTap = setTimeout(function () {

              clearTimeout(dblTap);

              dblTap = null;
            }, 300);
          }
        });
      }

      if (cellEvents.cellTapHold) {

        tapHold = null;

        self.element.on("touchstart", function (e) {

          clearTimeout(tapHold);

          tapHold = setTimeout(function () {

            clearTimeout(tapHold);

            tapHold = null;

            tap = false;

            cellEvents.cellTapHold(e, self.getComponent());
          }, 1000);
        });

        self.element.on("touchend", function (e) {

          clearTimeout(tapHold);

          tapHold = null;
        });
      }

      if (self.column.extensions.edit) {

        self.table.extensions.edit.bindEditor(self);
      }

      if (self.column.definition.rowHandle && self.table.options.movableRows !== false && self.table.extExists("moveRow")) {

        self.table.extensions.moveRow.initializeCell(self);
      }

      //hide cell if not visible

      if (!self.column.visible) {

        self.hide();
      }
    };

    //generate cell contents

    Cell.prototype._generateContents = function () {

      var self = this;

      if (self.table.extExists("format")) {

        self.element.html(self.table.extensions.format.formatValue(self));
      } else {

        self.element.html(self.value);
      }
    };

    //generate tooltip text

    Cell.prototype._generateTooltip = function () {

      var self = this;

      var tooltip = self.column.tooltip;

      if (tooltip) {

        if (tooltip === true) {

          tooltip = self.value;
        } else if (typeof tooltip == "function") {

          tooltip = tooltip(self.getComponent());
        }

        self.element[0].setAttribute("title", tooltip);
      } else {

        self.element[0].setAttribute("title", "");
      }
    };

    //////////////////// Getters ////////////////////

    Cell.prototype.getElement = function () {

      return this.element;
    };

    Cell.prototype.getValue = function () {

      return this.value;
    };

    Cell.prototype.getOldValue = function () {

      return this.oldValue;
    };

    //////////////////// Actions ////////////////////


    Cell.prototype.setValue = function (value, mutate) {

      var changed = this.setValueProcessData(value, mutate);

      if (changed) {

        if (this.table.options.history && this.table.extExists("history")) {

          this.table.extensions.history.action("cellEdit", this, { oldValue: this.oldValue, newValue: this.value });
        };

        this.table.options.cellEdited(this.getComponent());

        this.table.options.dataEdited(this.table.rowManager.getData());
      }

      if (this.table.extExists("columnCalcs")) {

        if (this.column.definition.topCalc || this.column.definition.bottomCalc) {

          if (this.table.options.groupBy && this.table.extExists("groupRows")) {

            this.table.extensions.columnCalcs.recalcRowGroup(this.row);
          } else {

            this.table.extensions.columnCalcs.recalc(this.table.rowManager.displayRows);
          }
        }
      }
    };

    Cell.prototype.setValueProcessData = function (value, mutate) {

      var changed = false;

      if (this.value != value) {

        changed = true;

        if (mutate) {

          if (this.column.extensions.mutate && this.column.extensions.mutate.type !== "data") {

            value = this.table.extensions.mutator.transformCell(this, value);
          }
        }
      }

      this.setValueActual(value);

      return changed;
    };

    Cell.prototype.setValueActual = function (value) {

      this.oldValue = this.value;

      this.value = value;

      this.column.setFieldValue(this.row.data, value);

      this._generateContents();

      this._generateTooltip();

      //set resizable handles

      if (this.table.options.resizableColumns && this.table.extExists("resizeColumns")) {

        this.table.extensions.resizeColumns.initializeColumn("cell", this.column, this.element);
      }

      //handle frozen cells

      if (this.table.extExists("frozenColumns")) {

        this.table.extensions.frozenColumns.layoutElement(this.element, this.column);
      }
    };

    Cell.prototype.setWidth = function (width) {

      this.width = width;

      // this.element.css("width", width || "");

      this.element[0].style.width = width ? width + "px" : "";
    };

    Cell.prototype.getWidth = function () {

      return this.width || this.element.outerWidth();
    };

    Cell.prototype.setMinWidth = function (minWidth) {

      this.minWidth = minWidth;

      this.element[0].style.minWidth = minWidth ? minWidth + "px" : "";
    };

    Cell.prototype.checkHeight = function () {

      var height = this.element.css("height");

      this.row.reinitializeHeight();
    };

    Cell.prototype.clearHeight = function () {

      this.element[0].style.height = "";
    };

    Cell.prototype.setHeight = function (height) {

      this.height = height;

      this.element[0].style.height = height ? height + "px" : "";
    };

    Cell.prototype.getHeight = function () {

      return this.height || this.element.outerHeight();
    };

    Cell.prototype.show = function () {

      this.element[0].style.display = "";
    };

    Cell.prototype.hide = function () {

      this.element[0].style.display = "none";
    };

    Cell.prototype.edit = function () {

      this.element.focus();
    };

    Cell.prototype.delete = function () {

      this.element.detach();

      this.column.deleteCell(this);

      this.row.deleteCell(this);
    };

    //////////////// Navigation /////////////////


    Cell.prototype.nav = function () {

      var self = this,
          nextCell = false,
          index = this.row.getCellIndex(this);

      return {

        next: function next() {

          var nextCell = this.right(),
              nextRow;

          if (!nextCell) {

            nextRow = self.table.rowManager.nextDisplayRow(self.row);

            if (nextRow) {

              nextCell = nextRow.findNextEditableCell(-1);

              if (nextCell) {

                nextCell.edit();

                return true;
              }
            }
          } else {

            return true;
          }

          return false;
        },

        prev: function prev() {

          var nextCell = this.left(),
              prevRow;

          if (!nextCell) {

            prevRow = self.table.rowManager.prevDisplayRow(self.row);

            if (prevRow) {

              nextCell = prevRow.findPrevEditableCell(prevRow.cells.length);

              if (nextCell) {

                nextCell.edit();

                return true;
              }
            }
          } else {

            return true;
          }

          return false;
        },

        left: function left() {

          nextCell = self.row.findPrevEditableCell(index);

          if (nextCell) {

            nextCell.edit();

            return true;
          } else {

            return false;
          }
        },

        right: function right() {

          nextCell = self.row.findNextEditableCell(index);

          if (nextCell) {

            nextCell.edit();

            return true;
          } else {

            return false;
          }
        },

        up: function up() {

          var nextRow = self.table.rowManager.prevDisplayRow(self.row);

          if (nextRow) {

            nextRow.cells[index].edit();
          }
        },

        down: function down() {

          var nextRow = self.table.rowManager.nextDisplayRow(self.row);

          if (nextRow) {

            nextRow.cells[index].edit();
          }
        }

      };
    };

    Cell.prototype.getIndex = function () {

      this.row.getCellIndex(this);
    };

    //////////////// Object Generation /////////////////

    Cell.prototype.getComponent = function () {

      return new CellComponent(this);
    };

    var FooterManager = function FooterManager(table) {

      this.table = table;

      this.active = false;

      this.element = $("<div class='tabulator-footer'></div>"); //containing element

      this.links = [];

      this._initialize();
    };

    FooterManager.prototype._initialize = function (element) {

      if (this.table.options.footerElement) {

        this.element = this.table.options.footerElement;
      }
    };

    FooterManager.prototype.getElement = function () {

      return this.element;
    };

    FooterManager.prototype.append = function (element, parent) {

      this.activate(parent);

      this.element.append(element);

      this.table.rowManager.adjustTableSize();
    };

    FooterManager.prototype.prepend = function (element, parent) {

      this.activate(parent);

      this.element.prepend(element);

      this.table.rowManager.adjustTableSize();
    };

    FooterManager.prototype.activate = function (parent) {

      if (!this.active) {

        this.active = true;

        this.table.element.append(this.getElement());
      }

      if (parent) {

        this.links.push(parent);
      }
    };

    FooterManager.prototype.redraw = function () {

      this.links.forEach(function (link) {

        link.footerRedraw();
      });
    };

    window.Tabulator = {

      columnManager: null, // hold Column Manager

      rowManager: null, //hold Row Manager

      footerManager: null, //holder Footer Manager

      browser: "", //hold current browser type

      browserSlow: false, //handle reduced functionality for slower browsers


      //setup options

      options: {

        height: false, //height of tabulator


        layout: "fitData", ///layout type "fitColumns" | "fitData"

        fitColumns: false, //DEPRICATED - fit colums to width of screen;


        columnMinWidth: 40, //minimum global width for a column

        columnVertAlign: "top", //vertical alignment of column headers


        resizableColumns: true, //resizable columns


        columns: [], //store for colum header info


        data: [], //default starting data


        tooltips: false, //Tool tip value

        tooltipsHeader: false, //Tool tip for headers


        initialSort: false, //initial sorting criteria


        footerElement: false, //hold footer element


        index: "id", //filed for row index


        keybindings: [], //array for keybindings


        downloadDataMutator: false, //function to manipulate table data before it is downloaded


        addRowPos: "bottom", //position to insert blank rows, top|bottom


        selectable: "highlight", //highlight rows on hover

        selectableRollingSelection: true, //roll selection once maximum number of selectable rows is reached

        selectablePersistence: true, // maintain selection when table view is updated

        selectableCheck: function selectableCheck(data, row) {
          return true;
        }, //check wheather row is selectable


        headerFilterPlaceholder: false, //placeholder text to display in header filters


        history: false, //enable edit history


        locale: false, //current system language

        langs: {},

        virtualDom: true, //enable DOM virtualization


        persistentLayout: false, //store cookie with column _styles

        persistentLayoutID: "", //id for stored cookie


        responsiveLayout: false, //responsive layout flags


        pagination: false, //set pagination type

        paginationSize: false, //set number of rows to a page

        paginationElement: false, //element to hold pagination numbers

        paginationDataSent: {}, //pagination data sent to the server

        paginationDataReceived: {}, //pagination data received from the server

        paginator: false, //pagination url string builder


        ajaxURL: false, //url for ajax loading

        ajaxParams: {}, //params for ajax loading

        ajaxConfig: "get", //ajax request type

        ajaxLoader: true, //show loader

        ajaxLoaderLoading: false, //loader element

        ajaxLoaderError: false, //loader element

        ajaxFiltering: false,

        ajaxSorting: false,

        groupBy: false, //enable table grouping and set field to group by

        groupStartOpen: true, //starting state of group


        groupHeader: false, //header generation function


        movableColumns: false, //enable movable columns

        movableRows: false, //enable movable rows


        rowFormatter: false,

        placeholder: false,

        //table building callbacks

        tableBuilding: function tableBuilding() {},

        tableBuilt: function tableBuilt() {},

        //render callbacks

        renderStarted: function renderStarted() {},

        renderComplete: function renderComplete() {},

        //row callbacks

        rowClick: false,

        rowDblClick: false,

        rowContext: false,

        rowTap: false,

        rowDblTap: false,

        rowTapHold: false,

        rowAdded: function rowAdded() {},

        rowDeleted: function rowDeleted() {},

        rowMoved: function rowMoved() {},

        rowUpdated: function rowUpdated() {},

        rowSelectionChanged: function rowSelectionChanged() {},

        rowSelected: function rowSelected() {},

        rowDeselected: function rowDeselected() {},

        //cell callbacks

        cellEditing: function cellEditing() {},

        cellEdited: function cellEdited() {},

        cellEditCancelled: function cellEditCancelled() {},

        //column callbacks

        columnMoved: function columnMoved() {},

        columnResized: function columnResized() {},

        columnTitleChanged: function columnTitleChanged() {},

        columnVisibilityChanged: function columnVisibilityChanged() {},

        //HTML iport callbacks

        htmlImporting: function htmlImporting() {},

        htmlImported: function htmlImported() {},

        //data callbacks

        dataLoading: function dataLoading() {},

        dataLoaded: function dataLoaded() {},

        dataEdited: function dataEdited() {},

        //ajax callbacks

        ajaxRequesting: function ajaxRequesting() {},

        ajaxResponse: false,

        ajaxError: function ajaxError() {},

        //filtering callbacks

        dataFiltering: false,

        dataFiltered: false,

        //sorting callbacks

        dataSorting: function dataSorting() {},

        dataSorted: function dataSorted() {},

        //grouping callbacks

        groupToggleElement: "arrow",

        groupClosedShowCalcs: false,

        dataGrouping: function dataGrouping() {},

        dataGrouped: false,

        groupVisibilityChanged: function groupVisibilityChanged() {},

        groupClick: false,

        groupDblClick: false,

        groupContext: false,

        groupTap: false,

        groupDblTap: false,

        groupTapHold: false,

        //pagination callbacks

        pageLoaded: function pageLoaded() {},

        //localization callbacks

        localized: function localized() {},

        //validation has failed

        validationFailed: function validationFailed() {}

      },

      //convert depricated functionality to new functions

      _mapDepricatedFunctionality: function _mapDepricatedFunctionality() {

        if (this.options.fitColumns) {

          this.options.layout = "fitColumns";

          console.warn("The%c fitColumns:true%c option has been depricated and will be removed in version 4.0, use %c layout:'fitColumns'%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");
        }
      },

      //constructor

      _create: function _create() {

        var self = this,
            element = this.element;

        self._mapDepricatedFunctionality();

        self.bindExtensions();

        if (element.is("table")) {

          if (this.extExists("htmlTableImport", true)) {

            self.extensions.htmlTableImport.parseTable();
          }
        } else {

          self.columnManager = new ColumnManager(self);

          self.rowManager = new RowManager(self);

          self.footerManager = new FooterManager(self);

          self.columnManager.setRowManager(self.rowManager);

          self.rowManager.setColumnManager(self.columnManager);

          self._buildElement();

          //give the browser a chance to fully render the table then load first data set if present

          // setTimeout(function(){


          //load initial data set

          this._loadInitialData();

          // },20)
        }
      },

      //build tabulator element

      _buildElement: function _buildElement() {

        var element = this.element,
            ext = this.extensions,
            options = this.options;

        options.tableBuilding();

        element.addClass("tabulator").attr("role", "grid").empty();

        this._detectBrowser();

        if (this.extExists("layout", true)) {

          ext.layout.initialize(options.layout);
        }

        //set localization

        if (options.headerFilterPlaceholder !== false) {

          ext.localize.setHeaderFilterPlaceholder(options.headerFilterPlaceholder);
        }

        for (var locale in options.langs) {

          ext.localize.installLang(locale, options.langs[locale]);
        }

        ext.localize.setLocale(options.locale);

        //configure placeholder element

        if (typeof options.placeholder == "string") {

          options.placeholder = $("<div class='tabulator-placeholder'><span>" + options.placeholder + "</span></div>");
        }

        //set table height

        if (options.height) {

          options.height = isNaN(options.height) ? options.height : options.height + "px";

          this.element.css({ "height": options.height });
        }

        //build table elements

        element.append(this.columnManager.getElement());

        element.append(this.rowManager.getElement());

        if (options.footerElement) {

          this.footerManager.activate();
        }

        if (options.persistentLayout && this.extExists("persistentLayout", true)) {

          ext.persistentLayout.initialize(options.persistentLayout, options.persistentLayoutID);

          options.columns = ext.persistentLayout.load(options.columns);
        }

        if (this.extExists("columnCalcs")) {

          ext.columnCalcs.initialize();
        }

        this.columnManager.setColumns(options.columns);

        if (options.initialSort && this.extExists("sort", true)) {

          ext.sort.setSort(options.initialSort);
        }

        if (options.pagination && this.extExists("page", true)) {

          ext.page.initialize();
        }

        if (options.groupBy && this.extExists("groupRows", true)) {

          ext.groupRows.initialize();
        }

        if (this.extExists("ajax")) {

          ext.ajax.initialize();
        }

        if (this.extExists("keybindings")) {

          ext.keybindings.initialize();
        }

        if (this.extExists("selectRow")) {

          ext.selectRow.clearSelectionData();
        }

        options.tableBuilt();
      },

      _loadInitialData: function _loadInitialData() {

        var self = this;

        if (self.options.pagination && self.extExists("page")) {

          self.extensions.page.reset(true);

          self.extensions.page.setPage(1);

          if (self.options.pagination == "local") {

            self.rowManager.setData(self.options.data);
          }
        } else {

          if (self.options.data.length) {

            self.rowManager.setData(self.options.data);
          } else {

            if (self.options.ajaxURL && self.extExists("ajax")) {

              self.extensions.ajax.sendRequest(function (data) {

                self.rowManager.setData(data);
              });
            } else {

              self.rowManager.setData(self.options.data);
            }
          }
        }
      },

      //set options

      _setOption: function _setOption(option, value) {

        console.error("Options Error - Tabulator does not allow options to be set after initialization unless there is a function defined for that purpose");
      },

      //deconstructor

      _destroy: function _destroy() {

        var element = this.element;

        element.empty();

        element.removeClass("tabulator");
      },

      _detectBrowser: function _detectBrowser() {

        var ua = navigator.userAgent;

        if (ua.indexOf("Trident") > -1) {

          this.brower = "ie";

          this.browserSlow = true;
        } else if (ua.indexOf("Edge") > -1) {

          this.brower = "edge";

          this.browserSlow = true;
        } else {

          this.brower = "other";

          this.browserSlow = false;
        }
      },


      ////////////////// Data Handling //////////////////


      //load data

      setData: function setData(data, params, config) {

        var self = this;

        var self = this;

        if (typeof data === "string") {

          if (data.indexOf("{") == 0 || data.indexOf("[") == 0) {

            //data is a json encoded string

            self.rowManager.setData(JSON.parse(data));
          } else {

            if (self.extExists("ajax", true)) {

              if (params) {

                self.extensions.ajax.setParams(params);
              }

              if (config) {

                self.extensions.ajax.setConfig(config);
              }

              self.extensions.ajax.setUrl(data);

              if (self.options.pagination == "remote" && self.extExists("page", true)) {

                self.extensions.page.reset(true);

                self.extensions.page.setPage(1);
              } else {

                //assume data is url, make ajax call to url to get data

                self.extensions.ajax.sendRequest(function (data) {

                  self.rowManager.setData(data);
                });
              }
            }
          }
        } else {

          if (data) {

            //asume data is already an object

            self.rowManager.setData(data);
          } else {

            //no data provided, check if ajaxURL is present;

            if (self.extExists("ajax") && self.extensions.ajax.getUrl) {

              if (self.options.pagination == "remote" && self.extExists("page", true)) {

                self.extensions.page.reset(true);

                self.extensions.page.setPage(1);
              } else {

                self.extensions.ajax.sendRequest(function (data) {

                  self.rowManager.setData(data);
                });
              }
            } else {

              //empty data

              self.rowManager.setData([]);
            }
          }
        }
      },

      //clear data

      clearData: function clearData() {

        this.rowManager.clearData();
      },

      //get table data array

      getData: function getData(active) {

        return this.rowManager.getData(active);
      },

      //get table data array count

      getDataCount: function getDataCount(active) {

        return this.rowManager.getDataCount(active);
      },

      //get table html

      getHtml: function getHtml(active) {

        return this.rowManager.getHtml(active);
      },

      //retrieve Ajax URL

      getAjaxUrl: function getAjaxUrl() {

        if (this.extExists("ajax", true)) {

          return this.extensions.ajax.getUrl();
        }
      },

      //update table data

      updateData: function updateData(data) {

        var self = this;

        if (data) {

          data.forEach(function (item) {

            var row = self.rowManager.findRow(item[self.options.index]);

            if (row) {

              row.updateData(item);
            }
          });
        } else {

          console.warn("Update Error - No data provided");
        }
      },

      addData: function addData(data, pos, index) {

        if (data) {

          this.rowManager.addRows(data, pos, index);
        } else {

          console.warn("Update Error - No data provided");
        }
      },

      //update table data

      updateOrAddData: function updateOrAddData(data) {

        var self = this;

        if (data) {

          data.forEach(function (item) {

            var row = self.rowManager.findRow(item[self.options.index]);

            if (row) {

              row.updateData(item);
            } else {

              self.rowManager.addRow(item);
            }
          });
        } else {

          console.warn("Update Error - No data provided");
        }
      },

      //get row object

      getRow: function getRow(index) {

        var row = this.rowManager.findRow(index);

        if (row) {

          return row.getComponent();
        } else {

          console.warn("Find Error - No matching row found:", index);

          return false;
        }
      },

      //delete row from table

      deleteRow: function deleteRow(index) {

        var row = this.rowManager.findRow(index);

        if (row) {

          row.delete();

          return true;
        } else {

          console.warn("Delete Error - No matching row found:", index);

          return false;
        }
      },

      //add row to table

      addRow: function addRow(data, pos, index) {

        return this.rowManager.addRow(data, pos, index);
      },

      //update a row if it exitsts otherwise create it

      updateOrAddRow: function updateOrAddRow(index, data) {

        var row = this.rowManager.findRow(index);

        if (row) {

          row.updateData(data);
        } else {

          row = this.rowManager.addRow(data);
        }

        return row.getComponent();
      },

      //update row data

      updateRow: function updateRow(index, data) {

        var row = this.rowManager.findRow(index);

        if (row) {

          row.updateData(data);

          return row.getComponent();
        } else {

          console.warn("Update Error - No matching row found:", index);

          return false;
        }
      },

      //scroll to row in DOM

      scrollToRow: function scrollToRow(index) {

        var row = this.rowManager.findRow(index);

        if (row) {

          return this.rowManager.scrollToRow(row);
        } else {

          console.warn("Scroll Error - No matching row found:", index);

          return false;
        }
      },

      getRows: function getRows(active) {

        return this.rowManager.getComponents(active);
      },

      /////////////// Column Functions  ///////////////


      setColumns: function setColumns(definition) {

        this.columnManager.setColumns(definition);
      },

      getColumns: function getColumns() {

        return this.columnManager.getComponents();
      },

      getColumnDefinitions: function getColumnDefinitions() {

        return this.columnManager.getDefinitionTree();
      },

      getColumnLayout: function getColumnLayout() {

        if (this.extExists("persistentLayout", true)) {

          return this.extensions.persistentLayout.parseColumns(this.columnManager.getColumns());
        }
      },

      setColumnLayout: function setColumnLayout(layout) {

        if (this.extExists("persistentLayout", true)) {

          this.columnManager.setColumns(this.extensions.persistentLayout.mergeDefinition(this.options.columns, layout));

          return true;
        }

        return false;
      },

      showColumn: function showColumn(field) {

        var column = this.columnManager.findColumn(field);

        if (column) {

          column.show();
        } else {

          console.warn("Column Show Error - No matching column found:", field);

          return false;
        }
      },

      hideColumn: function hideColumn(field) {

        var column = this.columnManager.findColumn(field);

        if (column) {

          column.hide();
        } else {

          console.warn("Column Hide Error - No matching column found:", field);

          return false;
        }
      },

      toggleColumn: function toggleColumn(field) {

        var column = this.columnManager.findColumn(field);

        if (column) {

          if (column.visible) {

            column.hide();
          } else {

            column.show();
          }
        } else {

          console.warn("Column Visibility Toggle Error - No matching column found:", field);

          return false;
        }
      },

      addColumn: function addColumn(definition, before, field) {

        var column = this.columnManager.findColumn(field);

        this.columnManager.addColumn(definition, before, column);
      },

      deleteColumn: function deleteColumn(field) {

        var column = this.columnManager.findColumn(field);

        if (column) {

          column.delete();
        } else {

          console.warn("Column Delete Error - No matching column found:", field);

          return false;
        }
      },

      //////////// Localization Functions  ////////////

      setLocale: function setLocale(locale) {

        this.extensions.localize.setLocale(locale);
      },

      getLocale: function getLocale() {

        return this.extensions.localize.getLocale();
      },

      getLang: function getLang(locale) {

        return this.extensions.localize.getLang(locale);
      },

      //////////// General Public Functions ////////////


      //redraw list without updating data

      redraw: function redraw(force) {

        this.columnManager.redraw(force);

        this.rowManager.redraw(force);
      },

      setHeight: function setHeight(height) {

        this.options.height = isNaN(height) ? height : height + "px";

        this.element.css({ "height": this.options.height });

        this.rowManager.redraw();
      },

      ///////////////////// Sorting ////////////////////


      //trigger sort

      setSort: function setSort(sortList, dir) {

        if (this.extExists("sort", true)) {

          this.extensions.sort.setSort(sortList, dir);

          this.rowManager.sorterRefresh();
        }
      },

      getSort: function getSort() {

        if (this.extExists("sort", true)) {

          console.warn("The%c getSort%c function has been depricated and will be removed in version 4.0, use %c getSorters%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");

          return this.getSorters();
        }
      },

      getSorters: function getSorters() {

        if (this.extExists("sort", true)) {

          return this.extensions.sort.getSort();
        }
      },

      clearSort: function clearSort() {

        if (this.extExists("sort", true)) {

          this.extensions.sort.clear();

          this.rowManager.sorterRefresh();
        }
      },

      ///////////////////// Filtering ////////////////////


      //set standard filters

      setFilter: function setFilter(field, type, value) {

        if (this.extExists("filter", true)) {

          this.extensions.filter.setFilter(field, type, value);

          this.rowManager.filterRefresh();
        }
      },

      //add filter to array

      addFilter: function addFilter(field, type, value) {

        if (this.extExists("filter", true)) {

          this.extensions.filter.addFilter(field, type, value);

          this.rowManager.filterRefresh();
        }
      },

      //get all filters

      getFilter: function getFilter(all) {

        console.warn("The%c getFilter%c function has been depricated and will be removed in version 4.0, use %c getFilters%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");

        this.getFilters(all);
      },

      getFilters: function getFilters(all) {

        if (this.extExists("filter", true)) {

          return this.extensions.filter.getFilters(all);
        }
      },

      getHeaderFilters: function getHeaderFilters() {

        if (this.extExists("filter", true)) {

          return this.extensions.filter.getHeaderFilters();
        }
      },

      //remove filter from array

      removeFilter: function removeFilter(field, type, value) {

        if (this.extExists("filter", true)) {

          this.extensions.filter.removeFilter(field, type, value);

          this.rowManager.filterRefresh();
        }
      },

      //clear filters

      clearFilter: function clearFilter(all) {

        if (this.extExists("filter", true)) {

          this.extensions.filter.clearFilter(all);

          this.rowManager.filterRefresh();
        }
      },

      //clear header filters

      clearHeaderFilter: function clearHeaderFilter() {

        if (this.extExists("filter", true)) {

          this.extensions.filter.clearHeaderFilter();

          this.rowManager.filterRefresh();
        }
      },

      ///////////////////// Filtering ////////////////////

      selectRow: function selectRow(rows) {

        if (this.extExists("selectRow", true)) {

          this.extensions.selectRow.selectRows(rows);
        }
      },

      deselectRow: function deselectRow(rows) {

        if (this.extExists("selectRow", true)) {

          this.extensions.selectRow.deselectRows(rows);
        }
      },

      toggleSelectRow: function toggleSelectRow(row) {

        if (this.extExists("selectRow", true)) {

          this.extensions.selectRow.toggleRow(row);
        }
      },

      getSelectedRows: function getSelectedRows() {

        if (this.extExists("selectRow", true)) {

          return this.extensions.selectRow.getSelectedRows();
        }
      },

      getSelectedData: function getSelectedData() {

        if (this.extExists("selectRow", true)) {

          return this.extensions.selectRow.getSelectedData();
        }
      },

      //////////// Pagination Functions  ////////////


      setMaxPage: function setMaxPage(max) {

        if (this.options.pagination && this.extExists("page")) {

          this.extensions.page.setMaxPage(max);
        } else {

          return false;
        }
      },

      setPage: function setPage(page) {

        if (this.options.pagination && this.extExists("page")) {

          this.extensions.page.setPage(page);
        } else {

          return false;
        }
      },

      setPageSize: function setPageSize(size) {

        if (this.options.pagination && this.extExists("page")) {

          this.extensions.page.setPageSize(size);

          this.extensions.page.setPage(1);
        } else {

          return false;
        }
      },

      getPageSize: function getPageSize() {

        if (this.options.pagination && this.extExists("page", true)) {

          return this.extensions.page.getPageSize();
        }
      },

      previousPage: function previousPage() {

        if (this.options.pagination && this.extExists("page")) {

          this.extensions.page.previousPage();
        } else {

          return false;
        }
      },

      nextPage: function nextPage() {

        if (this.options.pagination && this.extExists("page")) {

          this.extensions.page.nextPage();
        } else {

          return false;
        }
      },

      getPage: function getPage() {

        if (this.options.pagination && this.extExists("page")) {

          return this.extensions.page.getPage();
        } else {

          return false;
        }
      },

      getPageMax: function getPageMax() {

        if (this.options.pagination && this.extExists("page")) {

          return this.extensions.page.getPageMax();
        } else {

          return false;
        }
      },

      ///////////////// Grouping Functions ///////////////


      setGroupBy: function setGroupBy(groups) {

        if (this.extExists("groupRows", true)) {

          this.options.groupBy = groups;

          this.extensions.groupRows.initialize();

          this.rowManager.refreshActiveData();
        } else {

          return false;
        }
      },

      setGroupStartOpen: function setGroupStartOpen(values) {

        if (this.extExists("groupRows", true)) {

          this.options.groupStartOpen = values;

          this.extensions.groupRows.initialize();

          if (this.options.groupBy) {

            this.rowManager.refreshActiveData();
          } else {

            console.warn("Grouping Update - cant refresh view, no groups have been set");
          }
        } else {

          return false;
        }
      },

      setGroupHeader: function setGroupHeader(values) {

        if (this.extExists("groupRows", true)) {

          this.options.groupHeader = values;

          this.extensions.groupRows.initialize();

          if (this.options.groupBy) {

            this.rowManager.refreshActiveData();
          } else {

            console.warn("Grouping Update - cant refresh view, no groups have been set");
          }
        } else {

          return false;
        }
      },

      getGroups: function getGroups(values) {

        if (this.extExists("groupRows", true)) {

          return this.extensions.groupRows.getGroups();
        } else {

          return false;
        }
      },

      /////////////// Navigation Management //////////////


      navigatePrev: function navigatePrev() {

        var cell = false;

        if (this.table.extExists("edit", true)) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().prev();
          }
        }

        return false;
      },

      navigateNext: function navigateNext() {

        var cell = false;

        if (this.table.extExists("edit", true)) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().next();
          }
        }

        return false;
      },

      navigateLeft: function navigateLeft() {

        var cell = false;

        if (this.table.extExists("edit", true)) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().left();
          }
        }

        return false;
      },

      navigateRight: function navigateRight() {

        var cell = false;

        if (this.table.extExists("edit", true)) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().right();
          }
        }

        return false;
      },

      navigateUp: function navigateUp() {

        var cell = false;

        if (this.table.extExists("edit", true)) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().up();
          }
        }

        return false;
      },

      navigateDown: function navigateDown() {

        var cell = false;

        if (this.table.extExists("edit", true)) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().dpwn();
          }
        }

        return false;
      },

      /////////////// History Management //////////////

      undo: function undo() {

        if (this.options.history && this.extExists("history", true)) {

          return this.extensions.history.undo();
        } else {

          return false;
        }
      },

      redo: function redo() {

        if (this.options.history && this.extExists("history", true)) {

          return this.extensions.history.redo();
        } else {

          return false;
        }
      },

      /////////////// Download Management //////////////


      download: function download(type, filename, options) {

        if (this.extExists("download", true)) {

          this.extensions.download.download(type, filename, options);
        }
      },

      ////////////// Extension Management //////////////


      //object to hold extensions

      extensions: {},

      extensionBindings: {},

      //extend extension

      extendExtension: function extendExtension(name, property, values) {

        if (this.extensionBindings[name]) {

          var source = this.extensionBindings[name].prototype[property];

          if (source) {

            if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) == "object") {

              for (var key in values) {

                source[key] = values[key];
              }
            } else {

              console.warn("Extension Error - Invalid value type, it must be an object");
            }
          } else {

            console.warn("Extension Error - property does not exist:", property);
          }
        } else {

          console.warn("Extension Error - extension does not exist:", name);
        }
      },

      //add extension to tabulator

      registerExtension: function registerExtension(name, extension) {

        var self = this;

        this.extensionBindings[name] = extension;
      },

      //ensure that extensions are bound to instantiated function

      bindExtensions: function bindExtensions() {

        var self = this;

        this.extensions = {};

        for (var name in self.extensionBindings) {

          self.extensions[name] = new self.extensionBindings[name](self);
        }
      },

      //Check for plugin

      extExists: function extExists(plugin, required) {

        if (this.extensions[plugin]) {

          return true;
        } else {

          if (required) {

            console.error("Tabulator Plugin Not Installed: " + plugin);
          }

          return false;
        }
      }

    };

    var Layout = function Layout(table) {

      this.table = table;

      this.mode = null;
    };

    //initialize layout system


    Layout.prototype.initialize = function (layout) {

      if (this.modes[layout]) {

        this.mode = layout;
      } else {

        console.warn("Layout Error - invalid mode set, defaulting to 'fitData' : " + layout);

        this.mode = 'fitData';
      }

      this.table.element.attr("tabulator-layout", this.mode);
    };

    Layout.prototype.getMode = function () {

      return this.mode;
    };

    //trigger table layout


    Layout.prototype.layout = function () {

      this.modes[this.mode].call(this, this.table.columnManager.columnsByIndex);
    };

    //layout render functions


    Layout.prototype.modes = {

      //resize columns to fit data the contain


      "fitData": function fitData(columns) {

        columns.forEach(function (column) {

          column.reinitializeWidth();
        });

        if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

          this.table.extensions.responsiveLayout.update();
        }
      },

      //resize columns to fit data the contain


      "fitDataFill": function fitDataFill(columns) {

        columns.forEach(function (column) {

          column.reinitializeWidth();
        });

        if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

          this.table.extensions.responsiveLayout.update();
        }
      },

      //resize columns to fit


      "fitColumns": function fitColumns(columns) {

        var self = this;

        var totalWidth = self.table.element.innerWidth(); //table element width


        var fixedWidth = 0; //total width of columns with a defined width


        var flexWidth = 0; //total width available to flexible columns


        var flexColWidth = 0; //desired width of flexible columns


        var flexColumns = []; //array of flexible width columns


        var gapFill = 0; //number of pixels to be added to final column to close and half pixel gaps


        if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

          this.table.extensions.responsiveLayout.update();
        }

        //adjust for vertical scrollbar if present


        if (this.table.rowManager.element[0].scrollHeight > this.table.rowManager.element.innerHeight()) {

          totalWidth -= this.table.rowManager.element[0].offsetWidth - this.table.rowManager.element[0].clientWidth;
        }

        columns.forEach(function (column) {

          var width, minWidth, colWidth;

          if (column.visible) {

            width = column.definition.width;

            if (width) {

              minWidth = parseInt(column.minWidth);

              if (typeof width == "string") {

                if (width.indexOf("%") > -1) {

                  colWidth = totalWidth / 100 * parseInt(width);
                } else {

                  colWidth = parseInt(width);
                }
              } else {

                colWidth = width;
              }

              fixedWidth += colWidth > minWidth ? colWidth : minWidth;
            } else {

              flexColumns.push(column);
            }
          }
        });

        //calculate available space


        flexWidth = totalWidth - fixedWidth;

        //calculate correct column size


        flexColWidth = Math.floor(flexWidth / flexColumns.length);

        //calculate any sub pixel space that needs to be filed by the last column


        gapFill = totalWidth - fixedWidth - flexColWidth * flexColumns.length;

        gapFill = gapFill > 0 ? gapFill : 0;

        flexColumns.forEach(function (column, i) {

          var width = flexColWidth >= column.minWidth ? flexColWidth : column.minWidth;

          if (i == flexColumns.length - 1 && gapFill) {

            width += gapFill;
          }

          column.setWidth(width);
        });
      }

    };

    Tabulator.registerExtension("layout", Layout);

    var Localize = function Localize(table) {

      this.table = table; //hold Tabulator object

      this.locale = "default"; //current locale

      this.lang = false; //current language

      this.bindings = {}; //update events to call when locale is changed
    };

    //set header placehoder

    Localize.prototype.setHeaderFilterPlaceholder = function (placeholder) {

      this.langs.default.headerFilters.default = placeholder;
    };

    //set header filter placeholder by column

    Localize.prototype.setHeaderFilterColumnPlaceholder = function (column, placeholder) {

      this.langs.default.headerFilters.columns[column] = placeholder;

      if (this.lang && !this.lang.headerFilters.columns[column]) {

        this.lang.headerFilters.columns[column] = placeholder;
      }
    };

    //setup a lang description object

    Localize.prototype.installLang = function (locale, lang) {

      if (this.langs[locale]) {

        this._setLangProp(this.langs[locale], lang);
      } else {

        this.langs[locale] = lang;
      }
    };

    Localize.prototype._setLangProp = function (lang, values) {

      for (var key in values) {

        if (lang[key] && _typeof(lang[key]) == "object") {

          this._setLangProp(lang[key], values[key]);
        } else {

          lang[key] = values[key];
        }
      }
    };

    //set current locale

    Localize.prototype.setLocale = function (desiredLocale) {

      var self = this;

      desiredLocale = desiredLocale || "default";

      //fill in any matching languge values

      function traverseLang(trans, path) {

        for (var prop in trans) {

          if (_typeof(trans[prop]) == "object") {

            if (!path[prop]) {

              path[prop] = {};
            }

            traverseLang(trans[prop], path[prop]);
          } else {

            path[prop] = trans[prop];
          }
        }
      }

      //determing correct locale to load

      if (desiredLocale === true && navigator.language) {

        //get local from system

        desiredLocale = navigator.language.toLowerCase();
      }

      if (desiredLocale) {

        //if locale is not set, check for matching top level locale else use default

        if (!self.langs[desiredLocale]) {

          var prefix = desiredLocale.split("-")[0];

          if (self.langs[prefix]) {

            console.warn("Localization Error - Exact matching locale not found, using closest match: ", desiredLocale, prefix);

            desiredLocale = prefix;
          } else {

            console.warn("Localization Error - Matching locale not found, using default: ", desiredLocale);

            desiredLocale = "default";
          }
        }
      }

      self.locale = desiredLocale;

      //load default lang template

      self.lang = $.extend(true, {}, self.langs.default);

      if (desiredLocale != "default") {

        traverseLang(self.langs[desiredLocale], self.lang);
      }

      self.table.options.localized(self.locale, self.lang);

      self._executeBindings();
    };

    //get current locale

    Localize.prototype.getLocale = function (locale) {

      return self.locale;
    };

    //get lang object for given local or current if none provided

    Localize.prototype.getLang = function (locale) {

      return locale ? this.langs[locale] : this.lang;
    };

    //get text for current locale

    Localize.prototype.getText = function (path, value) {

      var path = value ? path + "." + value : path,
          pathArray = path.split("."),
          text = this._getLangElement(pathArray, this.locale);

      // if(text === false){

      // 	console.warn("Localization Error - Matching localized text not found for given path: ", path);

      // }


      return text || "";
    };

    //traverse langs object and find localized copy

    Localize.prototype._getLangElement = function (path, locale) {

      var self = this;

      var root = self.lang;

      path.forEach(function (level) {

        var rootPath;

        if (root) {

          rootPath = root[level];

          if (typeof rootPath != "undefined") {

            root = rootPath;
          } else {

            root = false;
          }
        }
      });

      return root;
    };

    //set update binding

    Localize.prototype.bind = function (path, callback) {

      if (!this.bindings[path]) {

        this.bindings[path] = [];
      }

      this.bindings[path].push(callback);

      callback(this.getText(path), this.lang);
    };

    //itterate through bindings and trigger updates

    Localize.prototype._executeBindings = function () {

      var self = this;

      var _loop = function _loop(path) {

        self.bindings[path].forEach(function (binding) {

          binding(self.getText(path), self.lang);
        });
      };

      for (var path in self.bindings) {
        _loop(path);
      }
    };

    //Localized text listings

    Localize.prototype.langs = {

      "default": { //hold default locale text

        "groups": {

          "item": "item",

          "items": "items"

        },

        "columns": {},

        "ajax": {

          "loading": "Loading",

          "error": "Error"

        },

        "pagination": {

          "first": "First",

          "first_title": "First Page",

          "last": "Last",

          "last_title": "Last Page",

          "prev": "Prev",

          "prev_title": "Prev Page",

          "next": "Next",

          "next_title": "Next Page"

        },

        "headerFilters": {

          "default": "filter column...",

          "columns": {}

        }

      }

    };

    Tabulator.registerExtension("localize", Localize);

    var Accessor = function Accessor(table) {

      this.table = table; //hold Tabulator object

    };

    //initialize column accessor


    Accessor.prototype.initializeColumn = function (column) {

      var config = { accessor: false, params: column.definition.accessorParams || {} };

      //set column accessor


      switch (_typeof(column.definition.accessor)) {

        case "string":

          if (this.accessors[column.definition.accessor]) {

            config.accessor = this.accessors[column.definition.accessor];
          } else {

            console.warn("Accessor Error - No such accessor found, ignoring: ", column.definition.accessor);
          }

          break;

        case "function":

          config.accessor = column.definition.accessor;

          break;

      }

      if (config.accessor) {

        column.extensions.accessor = config;
      }
    },

    //apply accessor to row


    Accessor.prototype.transformRow = function (dataIn) {

      var self = this;

      //clone data object with deep copy to isolate internal data from returned result


      var data = $.extend(true, {}, dataIn || {});

      self.table.columnManager.traverse(function (column) {

        var field;

        if (column.extensions.accessor) {

          field = column.getField();

          if (typeof data[field] != "undefined") {

            column.setFieldValue(data, column.extensions.accessor.accessor(column.getFieldValue(data), data, column.extensions.accessor.params));
          }
        }
      });

      return data;
    },

    //default accessors


    Accessor.prototype.accessors = {};

    Tabulator.registerExtension("accessor", Accessor);

    var Ajax = function Ajax(table) {

      this.table = table; //hold Tabulator object


      this.config = false; //hold config object for ajax request


      this.url = ""; //request URL


      this.params = false; //request parameters


      this.loaderElement = $("<div class='tablulator-loader'></div>"); //loader message div


      this.msgElement = $("<div class='tabulator-loader-msg' role='alert'></div>"); //message element


      this.loadingElement = false;

      this.errorElement = false;
    };

    //initialize setup options


    Ajax.prototype.initialize = function () {

      this.loaderElement.append(this.msgElement);

      if (this.table.options.ajaxLoaderLoading) {

        this.loadingElement = this.table.options.ajaxLoaderLoading;
      }

      if (this.table.options.ajaxLoaderError) {

        this.errorElement = this.table.options.ajaxLoaderError;
      }

      if (this.table.options.ajaxParams) {

        this.setParams(this.table.options.ajaxParams);
      }

      if (this.table.options.ajaxConfig) {

        this.setConfig(this.table.options.ajaxConfig);
      }

      if (this.table.options.ajaxURL) {

        this.setUrl(this.table.options.ajaxURL);
      }
    };

    //set ajax params


    Ajax.prototype.setParams = function (params, update) {

      if (update) {

        this.params = this.params || {};

        for (var key in params) {

          this.params[key] = params[key];
        }
      } else {

        this.params = params;
      }
    };

    Ajax.prototype.getParams = function () {

      return this.params || {};
    };

    //load config object


    Ajax.prototype.setConfig = function (config) {

      this._loadDefaultConfig();

      if (typeof config == "string") {

        this.config.type = config;
      } else {

        for (var key in config) {

          this.config[key] = config[key];
        }
      }
    };

    //create config object from default


    Ajax.prototype._loadDefaultConfig = function (force) {

      var self = this;

      if (!self.config || force) {

        self.config = {};

        //load base config from defaults


        for (var key in self.defaultConfig) {

          self.config[key] = self.defaultConfig[key];
        }
      }
    };

    //set request url


    Ajax.prototype.setUrl = function (url) {

      this.url = url;
    };

    //get request url


    Ajax.prototype.getUrl = function () {

      return this.url;
    };

    //send ajax request


    Ajax.prototype.sendRequest = function (callback) {

      var self = this;

      if (self.url) {

        self._loadDefaultConfig();

        self.config.url = self.url;

        if (self.params) {

          self.config.data = self.params;
        }

        if (self.table.options.ajaxRequesting(self.url, self.params) !== false) {

          self.showLoader();

          $.ajax(self.config).done(function (data) {

            if (self.table.options.ajaxResponse) {

              data = self.table.options.ajaxResponse(self.url, self.params, data);
            }

            self.table.options.dataLoaded(data);

            callback(data);

            self.hideLoader();
          }).fail(function (xhr, textStatus, errorThrown) {

            console.error("Ajax Load Error - Connection Error: " + xhr.status, errorThrown);

            self.table.options.ajaxError(xhr, textStatus, errorThrown);

            self.showError();

            setTimeout(function () {

              self.hideLoader();
            }, 3000);
          });
        }
      } else {

        console.warn("Ajax Load Error - No URL Set");

        return false;
      }
    };

    Ajax.prototype.showLoader = function () {

      this.loaderElement.detach();

      this.msgElement.empty().removeClass("tabulator-error").addClass("tabulator-loading");

      if (this.loadingElement) {

        this.msgElement.append(this.loadingElement);
      } else {

        this.msgElement.append(this.table.extensions.localize.getText("ajax.loading"));
      }

      this.table.element.append(this.loaderElement);
    };

    Ajax.prototype.showError = function () {

      this.loaderElement.detach();

      this.msgElement.empty().removeClass("tabulator-loading").addClass("tabulator-error");

      if (this.errorElement) {

        this.msgElement.append(this.errorElement);
      } else {

        this.msgElement.append(this.table.extensions.localize.getText("ajax.error"));
      }

      this.table.element.append(this.loaderElement);
    };

    Ajax.prototype.hideLoader = function () {

      this.loaderElement.detach();
    };

    //default ajax config object


    Ajax.prototype.defaultConfig = {

      url: "",

      type: "GET",

      async: true,

      dataType: "json",

      success: function success(data) {}

    };

    Tabulator.registerExtension("ajax", Ajax);

    var ColumnCalcs = function ColumnCalcs(table) {

      this.table = table; //hold Tabulator object


      this.topCalcs = [];

      this.botCalcs = [];

      this.genColumn = false;

      this.topElement = $("<div class='tabulator-calcs-holder'></div>");

      this.botElement = $("<div class='tabulator-calcs-holder'></div>");

      this.topRow = false;

      this.botRow = false;

      this.topInitialized = false;

      this.botInitialized = false;

      this.initialize();
    };

    ColumnCalcs.prototype.initialize = function () {

      this.genColumn = new Column({ field: "value" }, this);
    };

    //dummy functions to handle being mock column manager


    ColumnCalcs.prototype.registerColumnField = function () {};

    //initialize column calcs


    ColumnCalcs.prototype.initializeColumn = function (column) {

      var def = column.definition;

      var config = {

        topCalcParams: def.topCalcParams || {},

        botCalcParams: def.bottomCalcParams || {}

      };

      if (def.topCalc) {

        switch (_typeof(def.topCalc)) {

          case "string":

            if (this.calculations[def.topCalc]) {

              config.topCalc = this.calculations[def.topCalc];
            } else {

              console.warn("Column Calc Error - No such calculation found, ignoring: ", def.topCalc);
            }

            break;

          case "function":

            config.topCalc = def.topCalc;

            break;

        }

        if (config.topCalc) {

          column.extensions.columnCalcs = config;

          this.topCalcs.push(column);

          if (!this.table.options.groupBy) {

            this.initializeTopRow();
          }
        }
      }

      if (def.bottomCalc) {

        switch (_typeof(def.bottomCalc)) {

          case "string":

            if (this.calculations[def.bottomCalc]) {

              config.botCalc = this.calculations[def.bottomCalc];
            } else {

              console.warn("Column Calc Error - No such calculation found, ignoring: ", def.bottomCalc);
            }

            break;

          case "function":

            config.botCalc = def.bottomCalc;

            break;

        }

        if (config.botCalc) {

          column.extensions.columnCalcs = config;

          this.botCalcs.push(column);

          if (!this.table.options.groupBy) {

            this.initializeBottomRow();
          }
        }
      }
    };

    ColumnCalcs.prototype.initializeTopRow = function () {

      if (!this.topInitialized) {

        this.table.columnManager.element.append(this.topElement);

        this.topInitialized = true;
      }
    };

    ColumnCalcs.prototype.initializeBottomRow = function () {

      if (!this.botInitialized) {

        this.table.footerManager.prepend(this.botElement);

        this.botInitialized = true;
      }
    };

    ColumnCalcs.prototype.scrollHorizontal = function (left) {

      var hozAdjust = 0,
          scrollWidth = this.table.columnManager.element[0].scrollWidth - this.table.element.innerWidth();

      if (this.botInitialized) {

        this.botRow.getElement().css("margin-left", -left);
      }
    };

    ColumnCalcs.prototype.recalc = function (rows) {

      var data, row;

      if (this.topInitialized || this.botInitialized) {

        data = this.rowsToData(rows);

        if (this.topInitialized) {

          row = this.generateRow("top", this.rowsToData(rows));

          this.topRow = row;

          this.topElement.empty();

          this.topElement.append(row.getElement());

          row.initialize(true);
        }

        if (this.botInitialized) {

          row = this.generateRow("bottom", this.rowsToData(rows));

          this.botRow = row;

          this.botElement.empty();

          this.botElement.append(row.getElement());

          row.initialize(true);
        }

        this.table.rowManager.adjustTableSize();

        //set resizable handles


        if (this.table.extExists("frozenColumns")) {

          this.table.extensions.frozenColumns.layout();
        }
      }
    };

    ColumnCalcs.prototype.recalcRowGroup = function (row) {

      var data, rowData;

      var group = this.table.extensions.groupRows.getRowGroup(row);

      if (group.calcs.bottom) {

        data = this.rowsToData(group.rows);

        rowData = this.generateRowData("bottom", data);

        group.calcs.bottom.updateData(rowData);
      }

      if (group.calcs.top) {

        data = this.rowsToData(group.rows);

        rowData = this.generateRowData("top", data);

        group.calcs.top.updateData(rowData);
      }
    };

    //generate top stats row


    ColumnCalcs.prototype.generateTopRow = function (rows) {

      return this.generateRow("top", this.rowsToData(rows));
    };

    //generate bottom stats row


    ColumnCalcs.prototype.generateBottomRow = function (rows) {

      return this.generateRow("bottom", this.rowsToData(rows));
    };

    ColumnCalcs.prototype.rowsToData = function (rows) {

      var data = [];

      rows.forEach(function (row) {

        data.push(row.getData());
      });

      return data;
    };

    //generate stats row


    ColumnCalcs.prototype.generateRow = function (pos, data) {

      var self = this,
          rowData = this.generateRowData(pos, data),
          row = new Row(rowData, this);

      row.getElement().addClass("tabulator-calcs").addClass("tabulator-calcs-" + pos);

      row.type = "calc";

      row.generateCells = function () {

        var cells = [];

        self.table.columnManager.columnsByIndex.forEach(function (column) {

          if (column.visible) {

            //set field name of mock column


            self.genColumn.setField(column.getField());

            self.genColumn.hozAlign = column.hozAlign;

            if (column.definition[pos + "CalcFormatter"] && self.table.extExists("format")) {

              self.genColumn.extensions.format = {

                formatter: self.table.extensions.format.getFormatter(column.definition[pos + "CalcFormatter"]),

                params: column.definition[pos + "CalcFormatterParams"]

              };
            } else {

              self.genColumn.extensions.format = {

                formatter: self.table.extensions.format.getFormatter("plaintext"),

                params: {}

              };
            }

            //generate cell and assign to correct column


            var cell = new Cell(self.genColumn, row);

            cell.column = column;

            cell.setWidth(column.getWidth());

            column.cells.push(cell);

            cells.push(cell);
          }
        });

        this.cells = cells;
      };

      return row;
    };

    //generate stats row


    ColumnCalcs.prototype.generateRowData = function (pos, data) {

      var rowData = {},
          calcs = pos == "top" ? this.topCalcs : this.botCalcs,
          type = pos == "top" ? "topCalc" : "botCalc";

      calcs.forEach(function (column) {

        var values = [];

        if (column.extensions.columnCalcs && column.extensions.columnCalcs[type]) {

          data.forEach(function (item) {

            values.push(column.getFieldValue(item));
          });

          column.setFieldValue(rowData, column.extensions.columnCalcs[type](values, data, column.extensions.columnCalcs[type + "Params"]));
        }
      });

      return rowData;
    };

    ColumnCalcs.prototype.hasTopCalcs = function () {

      return !!this.topCalcs.length;
    }, ColumnCalcs.prototype.hasBottomCalcs = function () {

      return !!this.botCalcs.length;
    },

    //handle table redraw


    ColumnCalcs.prototype.redraw = function () {

      if (this.topRow) {

        this.topRow.normalizeHeight(true);
      }

      if (this.botRow) {

        this.botRow.normalizeHeight(true);
      }
    };

    //default calculations


    ColumnCalcs.prototype.calculations = {

      "avg": function avg(values, data, calcParams) {

        var output = 0,
            precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : 2;

        if (values.length) {

          output = values.reduce(function (sum, value) {

            value = Number(value);

            return sum + value;
          });

          output = output / values.length;

          output = precision !== false ? output.toFixed(precision) : output;
        }

        return parseFloat(output).toString();
      },

      "max": function max(values, data, calcParams) {

        var output = null;

        values.forEach(function (value) {

          value = Number(value);

          if (value > output || output === null) {

            output = value;
          }
        });

        return output !== null ? output : "";
      },

      "min": function min(values, data, calcParams) {

        var output = null;

        values.forEach(function (value) {

          value = Number(value);

          if (value < output || output === null) {

            output = value;
          }
        });

        return output !== null ? output : "";
      },

      "sum": function sum(values, data, calcParams) {

        var output = 0;

        if (values.length) {

          values.forEach(function (value) {

            value = Number(value);

            output += !isNaN(value) ? Number(value) : 0;
          });
        }

        return output;
      },

      "concat": function concat(values, data, calcParams) {

        var output = 0;

        if (values.length) {

          output = values.reduce(function (sum, value) {

            return String(sum) + String(value);
          });
        }

        return output;
      },

      "count": function count(values, data, calcParams) {

        var output = 0;

        if (values.length) {

          values.forEach(function (value) {

            if (value) {

              output++;
            }
          });
        }

        return output;
      }

    };

    Tabulator.registerExtension("columnCalcs", ColumnCalcs);

    var Download = function Download(table) {

      this.table = table; //hold Tabulator object


      this.fields = {}; //hold filed multi dimension arrays

    };

    //trigger file download


    Download.prototype.download = function (type, filename, options) {

      var self = this,
          downloadFunc = false;

      function buildLink(data, mime) {

        self.triggerDownload(data, mime, type, filename);
      }

      if (typeof type == "function") {

        downloadFunc = type;
      } else {

        if (self.downloaders[type]) {

          downloadFunc = self.downloaders[type];
        } else {

          console.warn("Download Error - No such download type found: ", type);
        }
      }

      if (downloadFunc) {

        downloadFunc.call(this, self.processDefinitions(), self.processData(), options, buildLink);
      }
    };

    Download.prototype.processDefinitions = function () {

      var self = this,
          definitions = self.table.columnManager.getDefinitions(),
          processedDefinitions = [];

      self.fields = {};

      definitions.forEach(function (column) {

        if (column.field) {

          self.fields[column.field] = column.field.split(".");

          if (column.download !== false) {

            //isolate definiton from defintion object


            var def = {};

            for (var key in column) {

              def[key] = column[key];
            }

            if (typeof column.downloadTitle != "undefined") {

              def.title = column.downloadTitle;
            }

            processedDefinitions.push(def);
          }
        }
      });

      return processedDefinitions;
    };

    Download.prototype.processData = function () {

      var self = this,
          data = self.table.rowManager.getData(true);

      //add user data processing step;


      if (typeof self.table.options.downloadDataMutator == "function") {

        data = self.table.options.downloadDataMutator(data);
      }

      return data;
    };

    Download.prototype.triggerDownload = function (data, mime, type, filename) {

      var element = document.createElement('a'),
          blob = new Blob([data], { type: mime }),
          filename = filename || "Tabulator." + (typeof type === "function" ? "txt" : type);

      if (navigator.msSaveOrOpenBlob) {

        navigator.msSaveOrOpenBlob(blob, filename);
      } else {

        element.setAttribute('href', window.URL.createObjectURL(blob));

        //set file title


        element.setAttribute('download', filename);

        //trigger download


        element.style.display = 'none';

        document.body.appendChild(element);

        element.click();

        //remove temporary link element


        document.body.removeChild(element);
      }
    };

    //nested field lookup


    Download.prototype.getFieldValue = function (field, data) {

      var dataObj = data,
          structure = this.fields[field],
          length = structure.length,
          output;

      for (var i = 0; i < length; i++) {

        dataObj = dataObj[structure[i]];

        output = dataObj;

        if (!dataObj) {

          break;
        }
      }

      return output;
    };

    //downloaders


    Download.prototype.downloaders = {

      csv: function csv(columns, data, options, setFileContents) {

        var self = this,
            titles = [],
            fields = [],
            delimiter = options && options.delimiter ? options.delimiter : ",",
            fileContents;

        //get field lists


        columns.forEach(function (column) {

          if (column.field) {

            titles.push('"' + String(column.title).split('"').join('""') + '"');

            fields.push(column.field);
          }
        });

        //generate header row


        fileContents = [titles.join(delimiter)];

        //generate each row of the table


        data.forEach(function (row) {

          var rowData = [];

          fields.forEach(function (field) {

            var value = self.getFieldValue(field, row);

            switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {

              case "object":

                value = JSON.stringify(value);

                break;

              case "undefined":

              case "null":

                value = "";

                break;

              default:

                value = value;

            }

            //escape uotation marks


            rowData.push('"' + String(value).split('"').join('""') + '"');
          });

          fileContents.push(rowData.join(delimiter));
        });

        setFileContents(fileContents.join("\n"), "text/csv");
      },

      json: function json(columns, data, options, setFileContents) {

        var fileContents = JSON.stringify(data, null, '\t');

        setFileContents(fileContents, "application/json");
      },

      xlsx: function xlsx(columns, data, options, setFileContents) {

        var self = this,
            titles = [],
            fields = [],
            rows = [],
            workbook = { SheetNames: ["Sheet1"], Sheets: {} },
            worksheet,
            output;

        //convert rows to worksheet


        function rowsToSheet() {

          var sheet = {};

          var range = { s: { c: 0, r: 0 }, e: { c: fields.length, r: rows.length } };

          rows.forEach(function (row, i) {

            row.forEach(function (value, j) {

              var cell = { v: typeof value == "undefined" || value === null ? "" : value };

              if (cell != null) {

                switch (_typeof(cell.v)) {

                  case "number":

                    cell.t = 'n';

                    break;

                  case "boolean":

                    cell.t = 'b';

                    break;

                  default:

                    cell.t = 's';

                    break;

                }

                sheet[XLSX.utils.encode_cell({ c: j, r: i })] = cell;
              }
            });
          });

          sheet['!ref'] = XLSX.utils.encode_range(range);

          return sheet;
        }

        //convert workbook to binary array


        function s2ab(s) {

          var buf = new ArrayBuffer(s.length);

          var view = new Uint8Array(buf);

          for (var i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
          }return buf;
        }

        //get field lists


        columns.forEach(function (column) {

          if (column.field) {

            titles.push(column.title);

            fields.push(column.field);
          }
        });

        rows.push(titles);

        //generate each row of the table


        data.forEach(function (row) {

          var rowData = [];

          fields.forEach(function (field) {

            rowData.push(self.getFieldValue(field, row));
          });

          rows.push(rowData);
        });

        worksheet = rowsToSheet();

        workbook.Sheets["Sheet1"] = worksheet;

        output = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'binary' });

        setFileContents(s2ab(output), "application/octet-stream");
      }

    };

    Tabulator.registerExtension("download", Download);

    var Edit = function Edit(table) {

      this.table = table; //hold Tabulator object


      this.currentCell = false; //hold currently editing cell

    };

    //initialize column editor


    Edit.prototype.initializeColumn = function (column) {

      var self = this,
          config = {

        editor: false,

        blocked: false,

        check: column.definition.editable,

        params: column.definition.editorParams || {}

      };

      //set column editor


      switch (_typeof(column.definition.editor)) {

        case "string":

          if (self.editors[column.definition.editor]) {

            config.editor = self.editors[column.definition.editor];
          } else {

            console.warn("Editor Error - No such editor found: ", column.definition.editor);
          }

          break;

        case "function":

          config.editor = column.definition.editor;

          break;

        case "boolean":

          if (column.definition.editor === true) {

            if (typeof column.definition.formatter !== "function") {

              if (self.editors[column.definition.formatter]) {

                config.editor = self.editors[column.definition.formatter];
              } else {

                config.editor = self.editors["input"];
              }
            } else {

              console.warn("Editor Error - Cannot auto lookup editor for a custom formatter: ", column.definition.formatter);
            }
          }

          break;

      }

      if (config.editor) {

        column.extensions.edit = config;
      }
    };

    Edit.prototype.getCurrentCell = function () {

      return this.currentCell ? this.currentCell.getComponent() : false;
    };

    Edit.prototype.clearEditor = function (cell) {

      this.currentCell = false;

      cell.getElement().removeClass("tabulator-validation-fail");

      cell.getElement().removeClass("tabulator-editing").empty();

      cell.row.getElement().removeClass("tabulator-row-editing");
    };

    //return a formatted value for a cell


    Edit.prototype.bindEditor = function (cell) {

      var self = this,
          rendered = function rendered() {},
          element = cell.getElement(),
          mouseClick = false;

      //handle successfull value change


      function success(value) {

        var valid = true;

        if (cell.column.extensions.validate && self.table.extExists("validate")) {

          valid = self.table.extensions.validate.validate(cell.column.extensions.validate, cell.getComponent(), value);
        }

        if (valid === true) {

          self.clearEditor(cell);

          cell.setValue(value, true);
        } else {

          cell.getElement().addClass("tabulator-validation-fail");

          rendered();

          self.table.options.validationFailed(cell.getComponent(), value, valid);
        }
      };

      //handle aborted edit


      function cancel() {

        self.clearEditor(cell);

        cell.setValueActual(cell.getValue());

        self.table.options.cellEditCancelled(cell.getComponent());
      };

      element.attr("tabindex", 0);

      element.on("click", function (e) {

        if (!$(this).hasClass("tabulator-editing")) {

          $(this).focus();
        }
      });

      element.on("mousedown", function (e) {

        mouseClick = true;
      });

      element.on("focus", function (e) {

        var allowEdit = true,
            cellEditor;

        self.currentCell = cell;

        if (mouseClick) {

          mouseClick = false;

          if (cell.column.cellEvents.cellClick) {

            cell.column.cellEvents.cellClick(e, cell.getComponent());
          }
        }

        function onRendered(callback) {

          rendered = callback;
        }

        if (!cell.column.extensions.edit.blocked) {

          e.stopPropagation();

          if (typeof cell.column.extensions.edit.check == "function") {

            allowEdit = cell.column.extensions.edit.check(cell.getComponent());
          }

          if (allowEdit) {

            self.table.options.cellEditing(cell.getComponent());

            cellEditor = cell.column.extensions.edit.editor.call(self, cell.getComponent(), onRendered, success, cancel, cell.column.extensions.edit.params);

            //if editor returned, add to DOM, if false, abort edit


            if (cellEditor !== false) {

              element.addClass("tabulator-editing");

              cell.row.getElement().addClass("tabulator-row-editing");

              element.empty();

              element.append(cellEditor);

              //trigger onRendered Callback


              rendered();

              //prevent editing from triggering rowClick event


              element.children().click(function (e) {

                e.stopPropagation();
              });
            } else {

              element.blur();
            }
          } else {

            element.blur();
          }
        } else {

          element.blur();
        }
      });
    };

    //default data editors


    Edit.prototype.editors = {

      //input element


      input: function input(cell, onRendered, success, cancel, editorParams) {

        //create and style input


        var input = $("<input type='text'/>");

        input.css({

          "padding": "4px",

          "width": "100%",

          "box-sizing": "border-box"

        }).val(cell.getValue());

        onRendered(function () {

          input.focus();

          input.css("height", "100%");
        });

        //submit new value on blur


        input.on("change blur", function (e) {

          if (input.val() != cell.getValue()) {

            success(input.val());
          } else {

            cancel();
          }
        });

        //submit new value on enter


        input.on("keydown", function (e) {

          if (e.keyCode == 13) {

            success(input.val());
          }

          if (e.keyCode == 27) {

            cancel();
          }
        });

        return input;
      },

      //resizable text area element


      textarea: function textarea(cell, onRendered, success, cancel, editorParams) {

        var self = this,
            cellValue = cell.getValue(),
            value = String(typeof cellValue == "null" || typeof cellValue == "undefined" ? "" : cellValue),
            count = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1,
            input = $("<textarea></textarea>"),
            scrollHeight = 0;

        //create and style input


        input.css({

          "display": "block",

          "height": "100%",

          "width": "100%",

          "padding": "2px",

          "box-sizing": "border-box",

          "white-space": "pre-wrap",

          "resize": "none"

        }).val(value);

        onRendered(function () {

          input.focus();

          input.css("height", "100%");
        });

        //submit new value on blur


        input.on("change blur", function (e) {

          if (input.val() != cell.getValue()) {

            success(input.val());

            setTimeout(function () {

              cell.getRow().normalizeHeight();
            }, 300);
          } else {

            cancel();
          }
        });

        input.on("keyup", function () {

          input.css({ "height": "" });

          var heightNow = input[0].scrollHeight;

          input.css({ "height": heightNow });

          if (heightNow != scrollHeight) {

            scrollHeight = heightNow;

            cell.getRow().normalizeHeight();
          }
        });

        input.on("keydown", function (e) {

          if (e.keyCode == 27) {

            cancel();
          }
        });

        return input;
      },

      //input element with type of number


      number: function number(cell, onRendered, success, cancel, editorParams) {

        var input = $("<input type='number'/>");

        //create and style input


        input.css({

          "padding": "4px",

          "width": "100%",

          "box-sizing": "border-box"

        }).val(cell.getValue());

        onRendered(function () {

          input.focus();

          input.css("height", "100%");
        });

        //submit new value on blur


        input.on("blur", function (e) {

          var value = input.val();

          if (!isNaN(value)) {

            value = Number(value);
          }

          if (value != cell.getValue()) {

            success(value);
          } else {

            cancel();
          }
        });

        //submit new value on enter


        input.on("keydown", function (e) {

          var value;

          if (e.keyCode == 13) {

            value = input.val();

            if (!isNaN(value)) {

              value = Number(value);
            }

            success(value);
          }

          if (e.keyCode == 27) {

            cancel();
          }
        });

        return input;
      },

      //start rating


      star: function star(cell, onRendered, success, cancel, editorParams) {

        var element = cell.getElement(),
            value = cell.getValue(),
            maxStars = $("svg", element).length || 5,
            size = $("svg:first", element).attr("width") || 14,
            stars = $("<div style='vertical-align:middle; padding:4px; display:inline-block; vertical-align:middle;'></div>"),
            starActive = $('<svg width="' + size + '" height="' + size + '" class="tabulator-star-active" viewBox="0 0 512 512" xml:space="preserve" style="padding:0 1px;"><polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>'),
            starInactive = $('<svg width="' + size + '" height="' + size + '" class="tabulator-star-inactive" viewBox="0 0 512 512" xml:space="preserve" style="padding:0 1px;"><polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

        //change number of active stars


        var starChange = function starChange(element) {

          if ($(".tabulator-star-active", element.closest("div")).length != element.prevAll("svg").length + 1) {

            element.prevAll("svg").replaceWith(starActive.clone());

            element.nextAll("svg").replaceWith(starInactive.clone());

            element.replaceWith(starActive.clone());
          }
        };

        value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

        for (var i = 1; i <= maxStars; i++) {

          var nextStar = i <= value ? starActive : starInactive;

          stars.append(nextStar.clone());
        }

        stars.on("mouseover", "svg", function (e) {

          e.stopPropagation();

          starChange($(this));
        });

        stars.on("mouseover", function (e) {

          $("svg", $(this)).replaceWith(starInactive.clone());
        });

        stars.on("click", function (e) {

          success(0);
        });

        stars.on("click", "svg", function (e) {

          e.stopPropagation();

          success($(this).prevAll("svg").length + 1);
        });

        element.css({

          "white-space": "nowrap",

          "overflow": "hidden",

          "text-overflow": "ellipsis"

        });

        element.on("blur", function () {

          cancel();
        });

        //allow key based navigation


        element.on("keydown", function (e) {

          switch (e.keyCode) {

            case 39:
              //right arrow


              starChange($(".tabulator-star-inactive:first", stars));

              break;

            case 37:
              //left arrow


              var prevstar = $(".tabulator-star-active:last", stars).prev("svg");

              if (prevstar.length) {

                starChange(prevstar);
              } else {

                $("svg", stars).replaceWith(starInactive.clone());
              }

              break;

            case 13:
              //enter


              success($(".tabulator-star-active", stars).length);

              break;

            case 27:
              //escape


              cancel();

              break;

          }
        });

        return stars;
      },

      //draggable progress bar


      progress: function progress(cell, onRendered, success, cancel, editorParams) {

        var element = cell.getElement(),
            max = $("div", element).data("max"),
            min = $("div", element).data("min"),
            percent = (max - min) / 100,
            value = cell.getValue() || 0,
            handle = $("<div class='tabulator-progress-handle' style='position:absolute; right:0; top:0; bottom:0; width:5px;'></div>"),
            bar;

        var newVal = function newVal() {

          var calcVal = percent * Math.round(bar.outerWidth() / (element.width() / 100)) + min;

          success(calcVal);

          element.attr("aria-valuenow", calcVal).attr("aria-label", value);
        };

        //make sure value is in range


        value = parseFloat(value) <= max ? parseFloat(value) : max;

        value = parseFloat(value) >= min ? parseFloat(value) : min;

        //workout percentage


        value = 100 - Math.round((value - min) / percent);

        bar = $("<div style='position:absolute; top:8px; bottom:8px; left:4px; right:" + value + "%; margin-right:4px; background-color:#488CE9; display:inline-block; max-width:100%; min-width:0%;' data-max='" + max + "' data-min='" + min + "'></div>"), element.css({

          padding: "0 4px"

        });

        element.attr("aria-valuemin", min).attr("aria-valuemax", max);

        bar.append(handle);

        handle.on("mousedown", function (e) {

          bar.data("mouseDrag", e.screenX);

          bar.data("mouseDragWidth", bar.outerWidth());
        });

        handle.on("mouseover", function () {
          $(this).css({ cursor: "ew-resize" });
        });

        element.on("mousemove", function (e) {

          if (bar.data("mouseDrag")) {

            bar.css({ width: bar.data("mouseDragWidth") + (e.screenX - bar.data("mouseDrag")) });
          }
        });

        element.on("mouseup", function (e) {

          if (bar.data("mouseDrag")) {

            e.stopPropagation();

            e.stopImmediatePropagation();

            bar.data("mouseDragOut", true);

            bar.data("mouseDrag", false);

            bar.data("mouseDragWidth", false);

            newVal();
          }
        });

        //allow key based navigation


        element.on("keydown", function (e) {

          switch (e.keyCode) {

            case 39:
              //right arrow


              bar.css({ "width": bar.width() + element.width() / 100 });

              break;

            case 37:
              //left arrow


              bar.css({ "width": bar.width() - element.width() / 100 });

              break;

            case 13:
              //enter


              newVal();

              break;

            case 27:
              //escape


              cancel();

              break;

          }
        });

        element.on("blur", function () {

          cancel();
        });

        return bar;
      },

      //checkbox


      tickCross: function tickCross(cell, onRendered, success, cancel, editorParams) {

        var value = cell.getValue(),
            input = $("<input type='checkbox'/>");

        //create and style input


        input.css({

          "margin-top": "5px",

          "box-sizing": "border-box"

        }).val(value);

        onRendered(function () {

          input.focus();
        });

        if (value === true || value === "true" || value === "True" || value === 1) {

          input.prop("checked", true);
        } else {

          input.prop("checked", false);
        }

        //submit new value on blur


        input.on("change blur", function (e) {

          success(input.is(":checked"));
        });

        //submit new value on enter


        input.on("keydown", function (e) {

          if (e.keyCode == 13) {

            success(input.is(":checked"));
          }

          if (e.keyCode == 27) {

            cancel();
          }
        });

        return input;
      },

      //checkbox


      tick: function tick(cell, onRendered, success, cancel, editorParams) {

        var value = cell.getValue(),
            input = $("<input type='checkbox'/>");

        //create and style input


        input.css({

          "margin-top": "5px",

          "box-sizing": "border-box"

        }).val(value);

        onRendered(function () {

          input.focus();
        });

        if (value === true || value === "true" || value === "True" || value === 1) {

          input.prop("checked", true);
        } else {

          input.prop("checked", false);
        }

        //submit new value on blur


        input.on("change blur", function (e) {

          success(input.is(":checked"));
        });

        //submit new value on enter


        input.on("keydown", function (e) {

          if (e.keyCode == 13) {

            success(input.is(":checked"));
          }

          if (e.keyCode == 27) {

            cancel();
          }
        });

        return input;
      }

    };

    Tabulator.registerExtension("edit", Edit);

    var Filter = function Filter(table) {

      this.table = table; //hold Tabulator object


      this.filterList = []; //hold filter list


      this.headerFilters = {}; //hold column filters


      this.headerFilterElements = []; //hold header filter elements for manipulation


      this.changed = false; //has filtering changed since last render

    };

    //initialize column header filter


    Filter.prototype.initializeColumn = function (column) {

      var self = this,
          field = column.getField(),
          filterElement,
          editor,
          editorElement,
          cellWrapper,
          typingTimer,
          tagType,
          attrType;

      //handle successfull value change


      function success(value) {

        var filterType = tagType == "input" && attrType == "text" ? "partial" : "match",
            type = "",
            filterFunc;

        if (value) {

          switch (_typeof(column.definition.headerFilterFunc)) {

            case "string":

              if (self.filters[column.definition.headerFilterFunc]) {

                type = column.definition.headerFilterFunc;

                filterFunc = function filterFunc(data) {

                  return self.filters[column.definition.headerFilterFunc](value, column.getFieldValue(data));
                };
              } else {

                console.warn("Header Filter Error - Matching filter function not found: ", column.definition.headerFilterFunc);
              }

              break;

            case "function":

              filterFunc = function filterFunc(data) {

                return column.definition.headerFilterFunc(value, column.getFieldValue(data), data, column.definition.headerFilterFuncParams || {});
              };

              type = filterFunc;

              break;

          }

          if (!filterFunc) {

            switch (filterType) {

              case "partial":

                filterFunc = function filterFunc(data) {

                  return String(column.getFieldValue(data)).toLowerCase().indexOf(String(value).toLowerCase()) > -1;
                };

                type = "like";

                break;

              default:

                filterFunc = function filterFunc(data) {

                  return column.getFieldValue(data) == value;
                };

                type = "=";

            }
          }

          self.headerFilters[field] = { value: value, func: filterFunc, type: type };
        } else {

          delete self.headerFilters[field];
        }

        self.changed = true;

        self.table.rowManager.filterRefresh();
      };

      //handle aborted edit


      function cancel() {};

      if (field) {

        filterElement = $("<div class='tabulator-header-filter'></div>");

        //set column editor


        switch (_typeof(column.definition.headerFilter)) {

          case "string":

            if (self.table.extensions.edit.editors[column.definition.headerFilter]) {

              editor = self.table.extensions.edit.editors[column.definition.headerFilter];
            } else {

              console.warn("Filter Error - Cannot build header filter, No such editor found: ", column.definition.editor);
            }

            break;

          case "function":

            editor = column.definition.headerFilter;

            break;

          case "boolean":

            if (column.extensions.edit && column.extensions.edit.editor) {

              editor = column.extensions.edit.editor;
            } else {

              if (column.definition.formatter && self.table.extensions.edit.editors[column.definition.formatter]) {

                editor = self.table.extensions.edit.editors[column.definition.formatter];
              } else {

                editor = self.table.extensions.edit.editors["input"];
              }
            }

            break;

        }

        if (editor) {

          cellWrapper = {

            getValue: function getValue() {

              return "";
            },

            getField: function getField() {

              return column.definition.field;
            },

            getElement: function getElement() {

              return filterElement;
            }

          };

          editorElement = editor.call(self, cellWrapper, function () {}, success, cancel, column.definition.headerFilterParams || {});

          //set Placeholder Text


          if (field) {

            self.table.extensions.localize.bind("headerFilters.columns." + column.definition.field, function (value) {

              editorElement.attr("placeholder", typeof value !== "undefined" && value ? value : self.table.extensions.localize.getText("headerFilters.default"));
            });
          } else {

            self.table.extensions.localize.bind("headerFilters.default", function (value) {

              editorElement.attr("placeholdder", typeof self.column.definition.headerFilterPlaceholder !== "undefined" && self.column.definition.headerFilterPlaceholder ? self.column.definition.headerFilterPlaceholder : value);
            });
          }

          //focus on element on click


          editorElement.on("click", function (e) {

            e.stopPropagation();

            $(this).focus();
          });

          //live update filters as user types


          typingTimer = false;

          editorElement.on("keyup search", function (e) {

            var element = $(this);

            if (typingTimer) {

              clearTimeout(typingTimer);
            }

            typingTimer = setTimeout(function () {

              success(element.val());
            }, 300);
          });

          //update number filtered columns on change


          attrType = editorElement.attr("type") ? editorElement.attr("type").toLowerCase() : "";

          if (attrType == "number") {

            editorElement.on("change", function (e) {

              success($(this).val());
            });
          }

          //change text inputs to search inputs to allow for clearing of field


          if (attrType == "text") {

            editorElement.attr("type", "search");

            editorElement.off("change blur"); //prevent blur from triggering filter and preventing selection click

          }

          //prevent input and select elements from propegating click to column sorters etc


          tagType = editorElement.prop("tagName").toLowerCase();

          if (tagType == "input" || tagType == "select") {

            editorElement.on("mousedown", function (e) {

              e.stopPropagation();
            });
          }

          filterElement.append(editorElement);

          column.contentElement.append(filterElement);

          self.headerFilterElements.push(editorElement);
        }
      } else {

        console.warn("Filter Error - Cannot add header filter, column has no field set:", column.definition.title);
      }
    };

    //check if the filters has changed since last use


    Filter.prototype.hasChanged = function () {

      var changed = this.changed;

      this.changed = false;

      return changed;
    };

    //set standard filters


    Filter.prototype.setFilter = function (field, type, value) {

      var self = this;

      self.filterList = [];

      if (!Array.isArray(field)) {

        field = [{ field: field, type: type, value: value }];
      }

      self.addFilter(field);
    };

    //add filter to array


    Filter.prototype.addFilter = function (field, type, value) {

      var self = this,
          column;

      if (!Array.isArray(field)) {

        field = [{ field: field, type: type, value: value }];
      }

      field.forEach(function (filter) {

        var filterFunc = false;

        if (typeof filter.field == "function") {

          filterFunc = function filterFunc(data) {

            return filter.field(data, filter.type || {}); // pass params to custom filter function

          };
        } else {

          if (self.filters[filter.type]) {

            column = self.table.columnManager.getColumnByField(filter.field);

            if (column) {

              filterFunc = function filterFunc(data) {

                return self.filters[filter.type](filter.value, column.getFieldValue(data));
              };
            } else {

              filterFunc = function filterFunc(data) {

                return self.filters[filter.type](filter.value, data[filter.field]);
              };
            }
          } else {

            console.warn("Filter Error - No such filter type found, ignoring: ", filter.type);
          }
        }

        if (filterFunc) {

          filter.func = filterFunc;

          self.filterList.push(filter);

          self.changed = true;
        }
      });
    };

    //get all filters


    Filter.prototype.getFilters = function (all, ajax) {

      var self = this,
          output = [];

      if (all) {

        output = self.getHeaderFilters();
      }

      self.filterList.forEach(function (filter) {

        output.push({ field: filter.field, type: filter.type, value: filter.value });
      });

      if (ajax) {

        output.forEach(function (item) {

          if (typeof item.type == "function") {

            item.type = "function";
          }
        });
      }

      return output;
    };

    //get all filters


    Filter.prototype.getHeaderFilters = function () {

      var self = this,
          output = [];

      for (var key in this.headerFilters) {

        output.push({ field: key, type: this.headerFilters[key].type, value: this.headerFilters[key].value });
      }

      return output;
    };

    //remove filter from array


    Filter.prototype.removeFilter = function (field, type, value) {

      var self = this;

      if (!Array.isArray(field)) {

        field = [{ field: field, type: type, value: value }];
      }

      field.forEach(function (filter) {

        var index = -1;

        if (_typeof(filter.field) == "object") {

          index = self.filterList.findIndex(function (element) {

            return filter === element;
          });
        } else {

          index = self.filterList.findIndex(function (element) {

            return filter.field === element.field && filter.type === element.type && filter.value === element.value;
          });
        }

        if (index > -1) {

          self.filterList.splice(index, 1);

          self.changed = true;
        } else {

          console.warn("Filter Error - No matching filter type found, ignoring: ", filter.type);
        }
      });
    };

    //clear filters


    Filter.prototype.clearFilter = function (all) {

      this.filterList = [];

      if (all) {

        this.clearHeaderFilter();
      }

      this.changed = true;
    };

    //clear header filters


    Filter.prototype.clearHeaderFilter = function () {

      this.headerFilters = {};

      this.headerFilterElements.forEach(function (element) {

        element.val("");
      });

      self.changed = true;
    };

    //filter row array


    Filter.prototype.filter = function (rowList) {

      var self = this,
          activeRows = [],
          activeRowComponents = [];

      if (self.table.options.dataFiltering) {

        self.table.options.dataFiltering(self.getFilters());
      }

      if (!self.table.options.ajaxFiltering && (self.filterList.length || Object.keys(self.headerFilters).length)) {

        rowList.forEach(function (row) {

          if (self.filterRow(row)) {

            activeRows.push(row);
          }
        });

        activeRows;
      } else {

        activeRows = rowList.slice(0);
      }

      if (self.table.options.dataFiltered) {

        activeRows.forEach(function (row) {

          activeRowComponents.push(row.getComponent());
        });

        self.table.options.dataFiltered(self.getFilters(), activeRowComponents);
      }

      return activeRows;
    };

    //filter individual row


    Filter.prototype.filterRow = function (row) {

      var self = this,
          match = true,
          data = row.getData();

      self.filterList.forEach(function (filter) {

        if (!filter.func(data)) {

          match = false;
        }
      });

      for (var field in self.headerFilters) {

        if (!self.headerFilters[field].func(data)) {

          match = false;
        }
      }

      return match;
    };

    //list of available filters


    Filter.prototype.filters = {

      //equal to


      "=": function _(filterVal, rowVal) {

        return rowVal == filterVal ? true : false;
      },

      //less than


      "<": function _(filterVal, rowVal) {

        return rowVal < filterVal ? true : false;
      },

      //less than or equal to


      "<=": function _(filterVal, rowVal) {

        return rowVal <= filterVal ? true : false;
      },

      //greater than


      ">": function _(filterVal, rowVal) {

        return rowVal > filterVal ? true : false;
      },

      //greater than or equal to


      ">=": function _(filterVal, rowVal) {

        return rowVal >= filterVal ? true : false;
      },

      //not equal to


      "!=": function _(filterVal, rowVal) {

        return rowVal != filterVal ? true : false;
      },

      //contains the string


      "like": function like(filterVal, rowVal) {

        if (filterVal === null || typeof filterVal === "undefined") {

          return rowVal === filterVal ? true : false;
        } else {

          return rowVal.toLowerCase().indexOf(filterVal.toLowerCase()) > -1 ? true : false;
        }
      }

    };

    Tabulator.registerExtension("filter", Filter);

    var Format = function Format(table) {

      this.table = table; //hold Tabulator object

    };

    //initialize column formatter


    Format.prototype.initializeColumn = function (column) {

      var self = this,
          config = { params: column.definition.formatterParams || {} };

      //set column formatter


      switch (_typeof(column.definition.formatter)) {

        case "string":

          if (self.formatters[column.definition.formatter]) {

            config.formatter = self.formatters[column.definition.formatter];
          } else {

            console.warn("Formatter Error - No such formatter found: ", column.definition.formatter);

            config.formatter = self.formatters.plaintext;
          }

          break;

        case "function":

          config.formatter = column.definition.formatter;

          break;

        default:

          config.formatter = self.formatters.plaintext;

          break;

      }

      column.extensions.format = config;
    };

    //return a formatted value for a cell


    Format.prototype.formatValue = function (cell) {

      return cell.column.extensions.format.formatter.call(this, cell.getComponent(), cell.column.extensions.format.params);
    };

    Format.prototype.sanitizeHTML = function (value) {

      if (value) {

        var entityMap = {

          '&': '&amp;',

          '<': '&lt;',

          '>': '&gt;',

          '"': '&quot;',

          "'": '&#39;',

          '/': '&#x2F;',

          '`': '&#x60;',

          '=': '&#x3D;'

        };

        return String(value).replace(/[&<>"'`=\/]/g, function (s) {

          return entityMap[s];
        });
      } else {

        return value;
      }
    };

    Format.prototype.emptyToSpace = function (value) {

      return value === null ? "&nbsp" : value;
    };

    //get formatter for cell


    Format.prototype.getFormatter = function (formatter) {

      var formatter;

      switch (typeof formatter === 'undefined' ? 'undefined' : _typeof(formatter)) {

        case "string":

          if (this.formatters[formatter]) {

            formatter = this.formatters[formatter];
          } else {

            console.warn("Formatter Error - No such formatter found: ", formatter);

            formatter = this.formatters.plaintext;
          }

          break;

        case "function":

          formatter = formatter;

          break;

        default:

          formatter = this.formatters.plaintext;

          break;

      }

      return formatter;
    };

    //default data formatters


    Format.prototype.formatters = {

      //plain text value


      plaintext: function plaintext(cell, formatterParams) {

        return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
      },

      //html text value


      html: function html(cell, formatterParams) {

        return cell.getValue();
      },

      //multiline text area


      textarea: function textarea(cell, formatterParams) {

        cell.getElement().css({ "white-space": "pre-wrap" });

        return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
      },

      //currency formatting


      money: function money(cell, formatterParams) {

        var floatVal = parseFloat(cell.getValue()),
            number,
            integer,
            decimal,
            rgx;

        var decimalSym = formatterParams.decimal || ".";

        var thousandSym = formatterParams.thousand || ",";

        var symbol = formatterParams.symbol || "";

        var after = !!formatterParams.symbolAfter;

        var precision = typeof formatterParams.precision !== "undefined" ? formatterParams.precision : 2;

        if (isNaN(floatVal)) {

          return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
        }

        number = precision !== false ? floatVal.toFixed(precision) : floatVal;

        number = number.split(".");

        integer = number[0];

        decimal = number.length > 1 ? decimalSym + number[1] : "";

        rgx = /(\d+)(\d{3})/;

        while (rgx.test(integer)) {

          integer = integer.replace(rgx, "$1" + thousandSym + "$2");
        }

        return after ? integer + decimal + symbol : symbol + integer + decimal;
      },

      //clickable mailto link


      email: function email(cell, formatterParams) {

        var value = this.sanitizeHTML(cell.getValue());

        return "<a href='mailto:" + value + "'>" + this.emptyToSpace(value) + "</a>";
      },

      //clickable anchor tag


      link: function link(cell, formatterParams) {

        var value = this.sanitizeHTML(cell.getValue());

        return "<a href='" + value + "'>" + this.emptyToSpace(value) + "</a>";
      },

      //image element


      image: function image(cell, formatterParams) {

        var value = this.sanitizeHTML(cell.getValue());

        return "<img src='" + value + "'/>";
      },

      //tick or empty cell


      tick: function tick(cell, formatterParams) {

        var value = cell.getValue(),
            element = cell.getElement();

        var tick = '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';

        if (value === true || value === "true" || value === "True" || value === 1 || value === "1") {

          element.attr("aria-checked", true);

          return tick;
        } else {

          element.attr("aria-checked", false);

          return "";
        }
      },

      //tick or cross


      tickCross: function tickCross(cell, formatterParams) {

        var value = cell.getValue(),
            element = cell.getElement(),
            tick = '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>',
            cross = '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

        if (value === true || value === "true" || value === "True" || value === 1 || value === "1") {

          element.attr("aria-checked", true);

          return tick;
        } else {

          element.attr("aria-checked", false);

          return cross;
        }
      },

      //star rating


      star: function star(cell, formatterParams) {

        var value = cell.getValue(),
            element = cell.getElement(),
            maxStars = formatterParams && formatterParams.stars ? formatterParams.stars : 5,
            stars = $("<span style='vertical-align:middle;'></span>"),
            starActive = $('<svg width="14" height="14" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>'),
            starInactive = $('<svg width="14" height="14" viewBox="0 0 512 512" xml:space="preserve" style="margin:0 1px;"><polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/></svg>');

        value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

        for (var i = 1; i <= maxStars; i++) {

          var nextStar = i <= value ? starActive : starInactive;

          stars.append(nextStar.clone());
        }

        element.css({

          "white-space": "nowrap",

          "overflow": "hidden",

          "text-overflow": "ellipsis"

        });

        element.attr("aria-label", value);

        return stars.html();
      },

      //progress bar


      progress: function progress(cell, formatterParams) {
        //progress bar


        var value = this.sanitizeHTML(cell.getValue()) || 0,
            element = cell.getElement(),
            max = formatterParams && formatterParams.max ? formatterParams.max : 100,
            min = formatterParams && formatterParams.min ? formatterParams.min : 0,
            color = formatterParams && formatterParams.color ? formatterParams.color : "#2DC214",
            percent;

        //make sure value is in range


        value = parseFloat(value) <= max ? parseFloat(value) : max;

        value = parseFloat(value) >= min ? parseFloat(value) : min;

        //workout percentage


        percent = (max - min) / 100;

        value = 100 - Math.round((value - min) / percent);

        element.css({

          "min-width": "30px",

          "position": "relative"

        });

        element.attr("aria-label", value);

        return "<div style='position:absolute; top:8px; bottom:8px; left:4px; right:" + value + "%; margin-right:4px; background-color:" + color + "; display:inline-block;' data-max='" + max + "' data-min='" + min + "'></div>";
      },

      //background color


      color: function color(cell, formatterParams) {

        cell.getElement().css({ "background-color": this.sanitizeHTML(cell.getValue()) });

        return "";
      },

      //tick icon


      buttonTick: function buttonTick(cell, formatterParams) {

        return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
      },

      //cross icon


      buttonCross: function buttonCross(cell, formatterParams) {

        return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
      },

      //current row number


      rownum: function rownum(cell, formatterParams) {

        return this.table.rowManager.activeRows.indexOf(cell.getRow()._getSelf()) + 1;
      },

      //row handle


      handle: function handle(cell, formatterParams) {

        cell.getElement().addClass("tabulator-row-handle");

        return "<div class='tabulator-row-handle-box'><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div></div>";
      }

    };

    Tabulator.registerExtension("format", Format);

    var FrozenColumns = function FrozenColumns(table) {

      this.table = table; //hold Tabulator object


      this.leftColumns = [];

      this.rightColumns = [];

      this.leftMargin = 0;

      this.rightMargin = 0;

      this.initializationMode = "left";

      this.active = false;
    };

    //reset initial state


    FrozenColumns.prototype.reset = function () {

      this.initializationMode = "left";

      this.leftColumns = [];

      this.rightColumns = [];

      this.active = false;
    };

    //initialize specific column


    FrozenColumns.prototype.initializeColumn = function (column) {

      var config = { margin: 0, edge: false };

      if (column.definition.frozen) {

        if (!column.parent.isGroup) {

          if (!column.isGroup) {

            config.position = this.initializationMode;

            if (this.initializationMode == "left") {

              this.leftColumns.push(column);
            } else {

              this.rightColumns.unshift(column);
            }

            this.active = true;

            column.extensions.frozen = config;
          } else {

            console.warn("Frozen Column Error - Column Groups cannot be frozen");
          }
        } else {

          console.warn("Frozen Column Error - Grouped columns cannot be frozen");
        }
      } else {

        this.initializationMode = "right";
      }
    };

    //layout columns appropropriatly


    FrozenColumns.prototype.layout = function () {

      var self = this,
          tableHolder = this.table.rowManager.element,
          rightMargin = 0;

      if (self.active) {

        //calculate row padding


        self.leftMargin = self._calcSpace(self.leftColumns, self.leftColumns.length);

        self.table.columnManager.headersElement.css("margin-left", self.leftMargin);

        self.rightMargin = self._calcSpace(self.rightColumns, self.rightColumns.length);

        self.table.columnManager.element.css("padding-right", self.rightMargin);

        self.table.rowManager.activeRows.forEach(function (row) {

          self.layoutRow(row);
        });

        if (self.table.extExists("columnCalcs")) {

          if (self.table.extensions.columnCalcs.topInitialized && self.table.extensions.columnCalcs.topRow) {

            self.layoutRow(self.table.extensions.columnCalcs.topRow);
          }

          if (self.table.extensions.columnCalcs.botInitialized && self.table.extensions.columnCalcs.botRow) {

            self.layoutRow(self.table.extensions.columnCalcs.botRow);
          }
        }

        //calculate left columns


        self.leftColumns.forEach(function (column, i) {

          column.extensions.frozen.margin = self._calcSpace(self.leftColumns, i) + self.table.columnManager.scrollLeft;

          if (i == self.leftColumns.length - 1) {

            column.extensions.frozen.edge = true;
          } else {

            column.extensions.frozen.edge = false;
          }

          self.layoutColumn(column);
        });

        //calculate right frozen columns


        rightMargin = self.table.rowManager.element.innerWidth() + self.table.columnManager.scrollLeft;

        if (tableHolder[0].scrollHeight > tableHolder.innerHeight()) {

          rightMargin -= tableHolder[0].offsetWidth - tableHolder[0].clientWidth;
        }

        self.rightColumns.forEach(function (column, i) {

          column.extensions.frozen.margin = rightMargin - self._calcSpace(self.rightColumns, i + 1);

          if (i == self.rightColumns.length - 1) {

            column.extensions.frozen.edge = true;
          } else {

            column.extensions.frozen.edge = false;
          }

          self.layoutColumn(column);
        });
      }
    };

    FrozenColumns.prototype.layoutColumn = function (column) {

      var self = this;

      self.layoutElement(column.element, column);

      column.cells.forEach(function (cell) {

        self.layoutElement(cell.element, column);
      });
    };

    FrozenColumns.prototype.layoutRow = function (row) {

      row.getElement().css({

        "padding-left": this.leftMargin,

        "padding-right": this.rightMargin

      });
    };

    FrozenColumns.prototype.layoutElement = function (element, column) {

      if (column.extensions.frozen) {

        var css = {

          position: "absolute",

          left: column.extensions.frozen.margin

        };

        element.css(css);

        element.addClass("tabulator-frozen");

        if (column.extensions.frozen.edge) {

          element.addClass("tabulator-frozen-" + column.extensions.frozen.position);
        }
      }
    };

    FrozenColumns.prototype._calcSpace = function (columns, index) {

      var width = 0;

      for (var i = 0; i < index; i++) {

        if (columns[i].visible) {

          width += columns[i].getWidth();
        }
      }

      return width;
    };

    Tabulator.registerExtension("frozenColumns", FrozenColumns);

    //public group object


    var GroupComponent = function GroupComponent(group) {

      this.group = group;

      this.type = "GroupComponent";
    };

    GroupComponent.prototype.getKey = function () {

      return this.group.key;
    };

    GroupComponent.prototype.getElement = function () {

      return this.group.element;
    };

    GroupComponent.prototype.getRows = function () {

      var output = [];

      this.group.rows.forEach(function (row) {

        output.push(row.getComponent());
      });

      return output;
    };

    GroupComponent.prototype.getSubGroups = function () {

      var output = [];

      this.group.groupList.forEach(function (child) {

        output.push(child.getComponent());
      });

      return output;
    };

    GroupComponent.prototype.getParentGroup = function () {

      return this.group.parent ? this.group.parent.getComponent() : false;
    };

    GroupComponent.prototype.getVisibility = function () {

      return this.group.visible;
    };

    GroupComponent.prototype.show = function () {

      this.group.show();
    };

    GroupComponent.prototype.hide = function () {

      this.group.hide();
    };

    GroupComponent.prototype.toggle = function () {

      this.group.toggleVisibility();
    };

    GroupComponent.prototype._getSelf = function () {

      return this.group;
    };

    //////////////////////////////////////////////////


    //////////////// Group Functions /////////////////


    //////////////////////////////////////////////////


    var Group = function Group(groupManager, parent, level, key, generator, oldGroup) {

      this.groupManager = groupManager;

      this.parent = parent;

      this.key = key;

      this.level = level;

      this.hasSubGroups = level < groupManager.groupIDLookups.length - 1;

      this.addRow = this.hasSubGroups ? this._addRowToGroup : this._addRow;

      this.type = "group"; //type of element


      this.old = oldGroup;

      this.rows = [];

      this.groups = [];

      this.groupList = [];

      this.generator = generator;

      this.element = $("<div class='tabulator-row tabulator-group tabulator-group-level-" + level + "' role='rowgroup'></div>");

      this.arrowElement = $("<div class='tabulator-arrow'></div>");

      this.height = 0;

      this.outerHeight = 0;

      this.initialized = false;

      this.calcs = {};

      this.visible = oldGroup ? oldGroup.visible : typeof groupManager.startOpen[level] !== "undefined" ? groupManager.startOpen[level] : groupManager.startOpen[0];

      this.addBindings();
    };

    Group.prototype.addBindings = function () {

      var self = this,
          dblTap,
          tapHold,
          tap,
          toggleElement;

      if (self.groupManager.table.options.groupToggleElement) {

        toggleElement = self.groupManager.table.options.groupToggleElement == "arrow" ? self.arrowElement : self.element;

        toggleElement.on("click", function (e) {

          e.stopPropagation();

          e.stopImmediatePropagation();

          self.toggleVisibility();
        });
      }

      //handle group click events


      if (self.groupManager.table.options.groupClick) {

        self.element.on("click", function (e) {

          self.groupManager.table.options.groupClick(e, self.getComponent());
        });
      }

      if (self.groupManager.table.options.groupDblClick) {

        self.element.on("dblclick", function (e) {

          self.groupManager.table.options.groupDblClick(e, self.getComponent());
        });
      }

      if (self.groupManager.table.options.groupContext) {

        self.element.on("contextmenu", function (e) {

          self.groupManager.table.options.groupContext(e, self.getComponent());
        });
      }

      if (self.groupManager.table.options.groupTap) {

        tap = false;

        self.element.on("touchstart", function (e) {

          tap = true;
        });

        self.element.on("touchend", function (e) {

          if (tap) {

            self.groupManager.table.options.groupTap(e, self.getComponent());
          }

          tap = false;
        });
      }

      if (self.groupManager.table.options.groupDblTap) {

        dblTap = null;

        self.element.on("touchend", function (e) {

          if (dblTap) {

            clearTimeout(dblTap);

            dblTap = null;

            self.groupManager.table.options.groupDblTap(e, self.getComponent());
          } else {

            dblTap = setTimeout(function () {

              clearTimeout(dblTap);

              dblTap = null;
            }, 300);
          }
        });
      }

      if (self.groupManager.table.options.groupTapHold) {

        tapHold = null;

        self.element.on("touchstart", function (e) {

          clearTimeout(tapHold);

          tapHold = setTimeout(function () {

            clearTimeout(tapHold);

            tapHold = null;

            tap = false;

            self.groupManager.table.options.groupTapHold(e, self.getComponent());
          }, 1000);
        });

        self.element.on("touchend", function (e) {

          clearTimeout(tapHold);

          tapHold = null;
        });
      }
    };

    Group.prototype._addRowToGroup = function (row) {

      var level = this.level + 1;

      if (this.hasSubGroups) {

        var groupID = this.groupManager.groupIDLookups[level](row.getData());

        if (!this.groups[groupID]) {

          var group = new Group(this.groupManager, this, level, groupID, this.groupManager.headerGenerator[level] || this.groupManager.headerGenerator[0], this.old ? this.old.groups[groupID] : false);

          this.groups[groupID] = group;

          this.groupList.push(group);
        }

        this.groups[groupID].addRow(row);
      }
    };

    Group.prototype._addRow = function (row) {

      this.rows.push(row);
    };

    Group.prototype.getHeadersAndRows = function () {

      var output = [];

      output.push(this);

      this._visSet();

      if (this.visible) {

        if (this.groupList.length) {

          this.groupList.forEach(function (group) {

            output = output.concat(group.getHeadersAndRows());
          });
        } else {

          if (this.groupManager.table.extExists("columnCalcs") && this.groupManager.table.extensions.columnCalcs.hasTopCalcs()) {

            this.calcs.top = this.groupManager.table.extensions.columnCalcs.generateTopRow(this.rows);

            output.push(this.calcs.top);
          }

          output = output.concat(this.rows);

          if (this.groupManager.table.extExists("columnCalcs") && this.groupManager.table.extensions.columnCalcs.hasBottomCalcs()) {

            this.calcs.bottom = this.groupManager.table.extensions.columnCalcs.generateBottomRow(this.rows);

            output.push(this.calcs.bottom);
          }
        }
      } else {

        if (this.groupManager.table.options.groupClosedShowCalcs) {

          if (this.groupManager.table.extExists("columnCalcs")) {

            if (this.groupManager.table.extensions.columnCalcs.hasTopCalcs()) {

              this.calcs.top = this.groupManager.table.extensions.columnCalcs.generateTopRow(this.rows);

              output.push(this.calcs.top);
            }

            if (this.groupManager.table.extensions.columnCalcs.hasBottomCalcs()) {

              this.calcs.bottom = this.groupManager.table.extensions.columnCalcs.generateBottomRow(this.rows);

              output.push(this.calcs.bottom);
            }
          }
        }
      }

      return output;
    };

    Group.prototype.getRows = function () {

      this._visSet();

      return this.visible ? this.rows : [];
    };

    Group.prototype.getRowCount = function () {

      var count = 0;

      if (this.groupList.length) {

        this.groupList.forEach(function (group) {

          count += group.getRowCount();
        });
      } else {

        count = this.rows.length;
      }

      return count;
    };

    Group.prototype.toggleVisibility = function () {

      if (this.visible) {

        this.hide();
      } else {

        this.show();
      }
    };

    Group.prototype.hide = function () {

      this.visible = false;

      if (this.groupManager.table.rowManager.getRenderMode() == "classic") {

        this.rows.forEach(function (row) {

          row.getElement().detach();
        });
      } else {

        this.groupManager.updateGroupRows(true);
      }

      this.groupManager.table.options.groupVisibilityChanged(this.getComponent(), false);
    };

    Group.prototype.show = function () {

      var self = this;

      self.visible = true;

      if (this.groupManager.table.rowManager.getRenderMode() == "classic") {

        self.rows.forEach(function (row) {

          self.getElement().after(row.getElement());

          row.initialize();
        });
      } else {

        this.groupManager.updateGroupRows(true);
      }

      this.groupManager.table.options.groupVisibilityChanged(this.getComponent(), true);
    };

    Group.prototype._visSet = function () {

      var data = [];

      if (typeof this.visible == "function") {

        this.rows.forEach(function (row) {

          data.push(row.getData());
        });

        this.visible = this.visible(this.key, this.getRowCount(), data, this.getRowCount());
      }
    };

    Group.prototype.getRowGroup = function (row) {

      var match = false;

      if (this.groupList.length) {

        this.groupList.forEach(function (group) {

          var result = group.getRowGroup(row);

          if (result) {

            match = result;
          }
        });
      } else {

        if (this.rows.find(function (item) {

          return item === row;
        })) {

          match = this;
        }
      }

      return match;
    };

    ////////////// Standard Row Functions //////////////


    Group.prototype.getElement = function () {

      this.addBindingsd = false;

      this._visSet();

      var data = [];

      this.rows.forEach(function (row) {

        data.push(row.getData());
      });

      if (this.visible) {

        this.element.addClass("tabulator-group-visible");
      } else {

        this.element.removeClass("tabulator-group-visible");
      }

      this.element.children().detach();

      this.element.html(this.generator(this.key, this.getRowCount(), data, this.getComponent())).prepend(this.arrowElement);

      // this.addBindings();


      return this.element;
    };

    //normalize the height of elements in the row


    Group.prototype.normalizeHeight = function () {

      this.setHeight(this.element.innerHeight());
    };

    Group.prototype.initialize = function (force) {

      if (!this.initialized || force) {

        this.normalizeHeight();

        this.initialized = true;
      }
    };

    Group.prototype.reinitialize = function () {

      this.initialized = false;

      this.height = 0;

      if (this.element.is(":visible")) {

        this.initialize(true);
      }
    };

    Group.prototype.setHeight = function (height) {

      if (this.height != height) {

        this.height = height;

        this.outerHeight = this.element.outerHeight();
      }
    };

    //return rows outer height


    Group.prototype.getHeight = function () {

      return this.outerHeight;
    };

    Group.prototype.reinitializeHeight = function () {};

    Group.prototype.calcHeight = function () {};

    Group.prototype.setCellHeight = function () {};

    Group.prototype.clearCellHeight = function () {};

    //////////////// Object Generation /////////////////


    Group.prototype.getComponent = function () {

      return new GroupComponent(this);
    };

    //////////////////////////////////////////////////


    ////////////// Group Row Extension ///////////////


    //////////////////////////////////////////////////


    var GroupRows = function GroupRows(table) {

      this.table = table; //hold Tabulator object


      this.groupIDLookups = false; //enable table grouping and set field to group by


      this.startOpen = [function () {
        return false;
      }]; //starting state of group


      this.headerGenerator = [function () {
        return "";
      }];

      this.groupList = []; //ordered list of groups


      this.groups = {}; //hold row groups

    };

    //initialize group configuration


    GroupRows.prototype.initialize = function () {

      var self = this,
          groupBy = self.table.options.groupBy,
          startOpen = self.table.options.groupStartOpen,
          groupHeader = self.table.options.groupHeader;

      self.headerGenerator = [function () {
        return "";
      }];

      this.startOpen = [function () {
        return false;
      }]; //starting state of group


      self.table.extensions.localize.bind("groups.item", function (langValue, lang) {

        self.headerGenerator[0] = function (value, count, data) {
          //header layout function


          return value + "<span>(" + count + " " + (count === 1 ? langValue : lang.groups.items) + ")</span>";
        };
      });

      this.groupIDLookups = [];

      if (!Array.isArray(groupBy)) {

        groupBy = [groupBy];
      }

      groupBy.forEach(function (group) {

        var lookupFunc, column;

        if (typeof group == "function") {

          lookupFunc = group;
        } else {

          column = self.table.columnManager.getColumnByField(group);

          if (column) {

            lookupFunc = function lookupFunc(data) {

              return column.getFieldValue(data);
            };
          } else {

            lookupFunc = function lookupFunc(data) {

              return data[group];
            };
          }
        }

        self.groupIDLookups.push(lookupFunc);
      });

      if (startOpen) {

        if (!Array.isArray(startOpen)) {

          startOpen = [startOpen];
        }

        startOpen.forEach(function (level) {

          level = typeof level == "function" ? level : function () {
            return true;
          };
        });

        self.startOpen = startOpen;
      }

      if (groupHeader) {

        self.headerGenerator = Array.isArray(groupHeader) ? groupHeader : [groupHeader];
      }
    };

    //return appropriate rows with group headers


    GroupRows.prototype.getRows = function (rows) {

      if (this.groupIDLookups.length) {

        this.table.options.dataGrouping();

        this.generateGroups(rows);

        if (this.table.options.dataGrouped) {

          this.table.options.dataGrouped(this.getGroups());
        };

        return this.updateGroupRows();
      } else {

        return rows.slice(0);
      }
    };

    GroupRows.prototype.getGroups = function () {

      var groupComponents = [];

      if (this.table.options.dataGrouped) {

        this.groupList.forEach(function (group) {

          groupComponents.push(group.getComponent());
        });
      }

      return groupComponents;
    };

    GroupRows.prototype.getRowGroup = function (row) {

      var match = false;

      this.groupList.forEach(function (group) {

        var result = group.getRowGroup(row);

        if (result) {

          match = result;
        }
      });

      return match;
    };

    GroupRows.prototype.countGroups = function () {

      return this.groupList.length;
    };

    GroupRows.prototype.generateGroups = function (rows) {

      var self = this,
          oldGroups = self.groups;

      self.groups = {};

      self.groupList = [];

      rows.forEach(function (row) {

        var groupID = self.groupIDLookups[0](row.getData());

        if (!self.groups[groupID]) {

          var group = new Group(self, false, 0, groupID, self.headerGenerator[0], oldGroups[groupID]);

          self.groups[groupID] = group;

          self.groupList.push(group);
        }

        self.groups[groupID].addRow(row);
      });
    };

    GroupRows.prototype.updateGroupRows = function (force) {

      var self = this,
          output = [],
          oldRowCount;

      self.groupList.forEach(function (group) {

        output = output.concat(group.getHeadersAndRows());
      });

      //force update of table display


      if (force) {

        oldRowCount = self.table.rowManager.displayRowsCount;

        self.table.rowManager.setDisplayRows(output);

        self.table.rowManager._virtualRenderFill(Math.floor(self.table.rowManager.element.scrollTop() / self.table.rowManager.element[0].scrollHeight * oldRowCount));
      }

      return output;
    };

    GroupRows.prototype.scrollHeaders = function (left) {

      this.groupList.forEach(function (group) {

        group.arrowElement.css("margin-left", left);
      });
    };

    Tabulator.registerExtension("groupRows", GroupRows);

    var History = function History(table) {

      this.table = table; //hold Tabulator object


      this.history = [];

      this.index = -1;
    };

    History.prototype.clear = function () {

      this.history = [];

      this.index = -1;
    };

    History.prototype.action = function (type, component, data) {

      if (this.index > -1) {

        this.history = this.history.slice(0, this.index + 1);
      }

      this.history.push({

        type: type,

        component: component,

        data: data

      });

      this.index++;
    };

    History.prototype.undo = function () {

      if (this.index > -1) {

        var action = this.history[this.index];

        this.undoers[action.type].call(this, action);

        this.index--;

        return true;
      } else {

        console.warn("History Undo Error - No more history to undo");

        return false;
      }
    };

    History.prototype.redo = function () {

      if (this.history.length - 1 > this.index) {

        this.index++;

        var action = this.history[this.index];

        this.redoers[action.type].call(this, action);

        return true;
      } else {

        console.warn("History Redo Error - No more history to redo");

        return false;
      }
    };

    History.prototype.undoers = {

      cellEdit: function cellEdit(action) {

        action.component.setValueProcessData(action.data.oldValue);
      },

      rowAdd: function rowAdd(action) {

        action.component.delete();
      },

      rowDelete: function rowDelete(action) {

        var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

        this._rebindRow(action.component, newRow);
      }

    };

    History.prototype.redoers = {

      cellEdit: function cellEdit(action) {

        action.component.setValueProcessData(action.data.newValue);
      },

      rowAdd: function rowAdd(action) {

        var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

        this._rebindRow(action.component, newRow);
      },

      rowDelete: function rowDelete(action) {

        action.component.delete();
      }

    };

    //rebind rows to new element after deletion


    History.prototype._rebindRow = function (oldRow, newRow) {

      this.history.forEach(function (action) {

        if (action.component instanceof Row) {

          if (action.component === oldRow) {

            action.component = newRow;
          }
        } else if (action.component instanceof Cell) {

          if (action.component.row === oldRow) {

            var field = action.component.column.getField();

            if (field) {

              action.component = newRow.getCell(field);
            }
          }
        }
      });
    };

    Tabulator.registerExtension("history", History);

    var HtmlTableImport = function HtmlTableImport(table) {

      this.table = table; //hold Tabulator object

    };

    HtmlTableImport.prototype.parseTable = function () {

      var self = this,
          element = self.table.element,
          options = self.table.options,
          columns = options.columns,
          headers = $("th", element),
          hasIndex = false,
          rows = $("tbody tr", element),
          data = [];

      self.table.options.htmlImporting();

      //check for tablator inline options


      self._extractOptions(element, options);

      if (headers.length) {

        self._extractHeaders(element);
      } else {

        self._generateBlankHeaders(element);
      }

      //iterate through table rows and build data set


      rows.each(function (rowIndex) {

        var item = {};

        //create index if the dont exist in table


        if (!hasIndex) {

          item[options.index] = rowIndex;
        }

        //add row data to item


        $("td", $(this)).each(function (colIndex) {

          item[$(this).data("field")] = $(this).html();
        });

        data.push(item);
      });

      //create new element


      var newElement = $("<div></div>");

      //transfer attributes to new element


      var attributes = element.prop("attributes");

      // loop through attributes and apply them on div


      $.each(attributes, function () {

        newElement.attr(this.name, this.value);
      });

      // replace table with div element


      element.replaceWith(newElement);

      options.data = data;

      self.table.options.htmlImported();

      newElement.tabulator(options);
    };

    //extract tabluator attribute options


    HtmlTableImport.prototype._extractOptions = function (element, options) {

      var self = this,
          attributes = element[0].attributes;

      for (var index in attributes) {

        var attrib = attributes[index];

        var name;

        if (attrib && attrib.name && attrib.name.indexOf("tabulator-") === 0) {

          name = attrib.name.replace("tabulator-", "");

          for (var key in options) {

            if (key.toLowerCase() == name) {

              options[key] = self._attribValue(attrib.value);
            }
          }
        }
      }
    };

    //get value of attribute


    HtmlTableImport.prototype._attribValue = function (value) {

      if (value === "true") {

        return true;
      }

      if (value === "false") {

        return false;
      }

      return value;
    };

    //find column if it has already been defined


    HtmlTableImport.prototype._findCol = function (title) {

      var self = this;

      var match = self.table.options.columns.find(function (column) {

        return column.title === title;
      });

      return match || false;
    };

    //extract column from headers


    HtmlTableImport.prototype._extractHeaders = function (element) {

      var self = this,
          headers = $("th", element),
          rows = $("tbody tr", element);

      headers.each(function (index) {

        var header = $(this),
            exists = false,
            col = self._findCol(header.text()),
            width,
            attributes;

        //list of possible attributes


        var attribList = ["title", "field", "align", "width", "minWidth", "frozen", "sortable", "sorter", "formatter", "cellClick", "cellDblClick", "cellContext", "editable", "editor", "visible", "cssClass", "tooltip", "tooltipHeader", "editableTitle", "headerFilter", "mutator", "mutateType", "accessor"];

        if (col) {

          exists = true;
        } else {

          col = { title: header.text().trim() };
        }

        if (!col.field) {

          col.field = header.text().trim().toLowerCase().replace(" ", "_");
        }

        width = header.attr("width");

        if (width && !col.width) {

          col.width = width;
        }

        //check for tablator inline options


        attributes = header[0].attributes;

        //check for tablator inline options


        for (var i in attributes) {

          var attrib = attributes[i],
              name;

          if (attrib && attrib.name && attrib.name.indexOf("tabulator-") === 0) {

            name = attrib.name.replace("tabulator-", "");

            attribList.forEach(function (key) {

              if (key.toLowerCase() == name) {

                col[key] = self._attribValue(attrib.value);
              }
            });
          }
        }

        $("td:eq(" + index + ")", rows).data("field", col.field);

        if (col.field == self.table.options.index) {

          hasIndex = true;
        }

        if (!exists) {

          self.table.options.columns.push(col);
        }
      });
    };

    //generate blank headers


    HtmlTableImport.prototype._generateBlankHeaders = function (element) {

      var self = this;

      var headers = $("tr:first td", element);

      headers.each(function (index) {

        var col = { title: "", field: "col" + index };

        $("td:eq(" + index + ")", rows).data("field", col.field);

        var width = $(this).attr("width");

        if (width) {

          col.width = width;
        }

        self.table.options.columns.push(col);
      });
    };

    Tabulator.registerExtension("htmlTableImport", HtmlTableImport);

    var Keybindings = function Keybindings(table) {

      this.table = table; //hold Tabulator object


      this.watchKeys = null;

      this.pressedKeys = null;
    };

    Keybindings.prototype.initialize = function () {

      var bindings = this.table.options.keybindings,
          mergedBindings = {};

      this.watchKeys = {};

      this.pressedKeys = [];

      if (bindings !== false) {

        for (var key in this.bindings) {

          mergedBindings[key] = this.bindings[key];
        }

        if (Object.keys(bindings).length) {

          for (var _key in bindings) {

            mergedBindings[_key] = bindings[_key];
          }
        }

        this.mapBindings(mergedBindings);

        this.bindEvents();
      }
    };

    Keybindings.prototype.mapBindings = function (bindings) {
      var _this = this;

      var self = this;

      var _loop2 = function _loop2(key) {

        if (_this.actions[key]) {

          if (bindings[key]) {

            if (_typeof(bindings[key]) !== "object") {

              bindings[key] = [bindings[key]];
            }

            bindings[key].forEach(function (binding) {

              self.mapBinding(key, binding);
            });
          }
        } else {

          console.warn("Key Binding Error - no such action:", key);
        }
      };

      for (var key in bindings) {
        _loop2(key);
      }
    };

    Keybindings.prototype.mapBinding = function (action, symbolsList) {

      var self = this;

      var binding = {

        action: this.actions[action],

        keys: [],

        ctrl: false,

        shift: false

      };

      var symbols = symbolsList.toString().toLowerCase().split(" ").join("").split("+");

      symbols.forEach(function (symbol) {

        switch (symbol) {

          case "ctrl":

            binding.ctrl = true;

            break;

          case "shift":

            binding.shift = true;

            break;

          default:

            symbol = parseInt(symbol);

            binding.keys.push(symbol);

            if (!self.watchKeys[symbol]) {

              self.watchKeys[symbol] = [];
            }

            self.watchKeys[symbol].push(binding);

        }
      });
    };

    Keybindings.prototype.bindEvents = function () {

      var self = this;

      this.table.element.on("keydown", function (e) {

        var code = e.keyCode;

        var bindings = self.watchKeys[code];

        if (bindings) {

          self.pressedKeys.push(code);

          bindings.forEach(function (binding) {

            self.checkBinding(e, binding);
          });
        }
      });

      this.table.element.on("keyup", function (e) {

        var code = e.keyCode;

        var bindings = self.watchKeys[code];

        if (bindings) {

          var index = self.pressedKeys.indexOf(code);

          if (index > -1) {

            self.pressedKeys.splice(index, 1);
          }
        }
      });
    };

    Keybindings.prototype.checkBinding = function (e, binding) {

      var self = this,
          match = true;

      if (e.ctrlKey == binding.ctrl && e.shiftKey == binding.shift) {

        binding.keys.forEach(function (key) {

          var index = self.pressedKeys.indexOf(key);

          if (index == -1) {

            match = false;
          }
        });

        if (match) {

          binding.action.call(self, e);
        }

        return true;
      }

      return false;
    };

    //default bindings


    Keybindings.prototype.bindings = {

      navPrev: "shift + 9",

      navNext: 9,

      navUp: 38,

      navDown: 40,

      scrollPageUp: 33,

      scrollPageDown: 34,

      scrollToStart: 36,

      scrollToEnd: 35,

      undo: "ctrl + 90",

      redo: "ctrl + 89"

    };

    //default actions


    Keybindings.prototype.actions = {

      keyBlock: function keyBlock(e) {

        e.stopPropagation();

        e.preventDefault();
      },

      scrollPageUp: function scrollPageUp(e) {

        var rowManager = this.table.rowManager,
            newPos = rowManager.scrollTop - rowManager.height,
            scrollMax = rowManager.element[0].scrollHeight;

        e.preventDefault();

        if (rowManager.displayRowsCount) {

          if (newPos >= 0) {

            rowManager.element.scrollTop(newPos);
          } else {

            rowManager.scrollToRow(rowManager.displayRows[0]);
          }
        }

        this.table.element.focus();
      },

      scrollPageDown: function scrollPageDown(e) {

        var rowManager = this.table.rowManager,
            newPos = rowManager.scrollTop + rowManager.height,
            scrollMax = rowManager.element[0].scrollHeight;

        e.preventDefault();

        if (rowManager.displayRowsCount) {

          if (newPos <= scrollMax) {

            rowManager.element.scrollTop(newPos);
          } else {

            rowManager.scrollToRow(rowManager.displayRows[rowManager.displayRows.length - 1]);
          }
        }

        this.table.element.focus();
      },

      scrollToStart: function scrollToStart(e) {

        var rowManager = this.table.rowManager;

        e.preventDefault();

        if (rowManager.displayRowsCount) {

          rowManager.scrollToRow(rowManager.displayRows[0]);
        }

        this.table.element.focus();
      },

      scrollToEnd: function scrollToEnd(e) {

        var rowManager = this.table.rowManager;

        e.preventDefault();

        if (rowManager.displayRowsCount) {

          rowManager.scrollToRow(rowManager.displayRows[rowManager.displayRows.length - 1]);
        }

        this.table.element.focus();
      },

      navPrev: function navPrev(e) {

        var cell = false;

        if (this.table.extExists("edit")) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            cell.nav().prev();
          }
        }
      },

      navNext: function navNext(e) {

        var cell = false;

        if (this.table.extExists("edit")) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            cell.nav().next();
          }
        }
      },

      navLeft: function navLeft(e) {

        var cell = false;

        if (this.table.extExists("edit")) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            cell.nav().left();
          }
        }
      },

      navRight: function navRight(e) {

        var cell = false;

        if (this.table.extExists("edit")) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            cell.nav().right();
          }
        }
      },

      navUp: function navUp(e) {

        var cell = false;

        if (this.table.extExists("edit")) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            cell.nav().up();
          }
        }
      },

      navDown: function navDown(e) {

        var cell = false;

        if (this.table.extExists("edit")) {

          cell = this.table.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            cell.nav().down();
          }
        }
      },

      undo: function undo(e) {

        var cell = false;

        if (this.table.options.history && this.table.extExists("history") && this.table.extExists("edit")) {

          cell = this.table.extensions.edit.currentCell;

          if (!cell) {

            e.preventDefault();

            this.table.extensions.history.undo();
          }
        }
      },

      redo: function redo(e) {

        var cell = false;

        if (this.table.options.history && this.table.extExists("history") && this.table.extExists("edit")) {

          cell = this.table.extensions.edit.currentCell;

          if (!cell) {

            e.preventDefault();

            this.table.extensions.history.redo();
          }
        }
      }

    };

    Tabulator.registerExtension("keybindings", Keybindings);

    var MoveColumns = function MoveColumns(table) {

      this.table = table; //hold Tabulator object


      this.placeholderElement = $("<div class='tabulator-col tabulator-col-placeholder'></div>");

      this.hoverElement = $(); //floating column header element


      this.checkTimeout = false; //click check timeout holder


      this.checkPeriod = 250; //period to wait on mousedown to consider this a move and not a click


      this.moving = false; //currently moving column


      this.toCol = false; //destination column


      this.toColAfter = false; //position of moving column relative to the desitnation column


      this.startX = 0; //starting position within header element


      this.autoScrollMargin = 40; //auto scroll on edge when within margin


      this.autoScrollStep = 5; //auto scroll distance in pixels


      this.autoScrollTimeout = false; //auto scroll timeout


      this.moveHover = this.moveHover.bind(this);

      this.endMove = this.endMove.bind(this);
    };

    MoveColumns.prototype.initializeColumn = function (column) {

      var self = this,
          config = {};

      if (!column.extensions.frozen) {

        config.mousemove = function (e) {

          if (column.parent === self.moving.parent) {

            if (e.pageX - column.element.offset().left + self.table.columnManager.element.scrollLeft() > column.getWidth() / 2) {

              if (self.toCol !== column || !self.toColAfter) {

                column.element.after(self.placeholderElement);

                self.moveColumn(column, true);
              }
            } else {

              if (self.toCol !== column || self.toColAfter) {

                column.element.before(self.placeholderElement);

                self.moveColumn(column, false);
              }
            }
          }
        }.bind(self);

        column.getElement().on("mousedown", function (e) {

          self.checkTimeout = setTimeout(function () {

            self.startMove(e, column);
          }, self.checkPeriod);
        });

        column.getElement().on("mouseup", function (e) {

          if (self.checkTimeout) {

            clearTimeout(self.checkTimeout);
          }
        });
      }

      column.extensions.moveColumn = config;
    };

    MoveColumns.prototype.startMove = function (e, column) {

      var self = this,
          element = column.getElement();

      self.moving = column;

      self.startX = e.pageX - element.offset().left;

      self.table.element.addClass("tabulator-block-select");

      //create placeholder


      self.placeholderElement.css({

        width: column.getWidth(),

        height: column.getHeight()

      });

      element.before(self.placeholderElement);

      element.detach();

      //create hover element


      self.hoverElement = element.clone();

      self.hoverElement.addClass("tabulator-moving");

      self.table.columnManager.getElement().append(self.hoverElement);

      self.hoverElement.css({

        "left": 0,

        "bottom": 0

      });

      self._bindMouseMove();

      $("body").on("mousemove", self.moveHover);

      $("body").on("mouseup", self.endMove);

      self.moveHover(e);
    };

    MoveColumns.prototype._bindMouseMove = function () {

      var self = this;

      self.table.columnManager.columnsByIndex.forEach(function (column) {

        if (column.extensions.moveColumn.mousemove) {

          column.element.on("mousemove", column.extensions.moveColumn.mousemove);
        }
      });
    };

    MoveColumns.prototype._unbindMouseMove = function () {

      var self = this;

      self.table.columnManager.columnsByIndex.forEach(function (column) {

        if (column.extensions.moveColumn.mousemove) {

          column.element.off("mousemove", column.extensions.moveColumn.mousemove);
        }
      });
    };

    MoveColumns.prototype.moveColumn = function (column, after) {

      var self = this,
          movingCells = this.moving.getCells();

      self.toCol = column;

      self.toColAfter = after;

      if (after) {

        column.getCells().forEach(function (cell, i) {

          cell.getElement().after(movingCells[i].getElement());
        });
      } else {

        column.getCells().forEach(function (cell, i) {

          cell.getElement().before(movingCells[i].getElement());
        });
      }
    };

    MoveColumns.prototype.endMove = function (column) {

      var self = this;

      self._unbindMouseMove();

      self.placeholderElement.after(self.moving.getElement());

      self.placeholderElement.detach();

      self.hoverElement.detach();

      self.table.element.removeClass("tabulator-block-select");

      if (self.toCol) {

        self.table.columnManager.moveColumn(self.moving, self.toCol, self.toColAfter);
      }

      self.moving = false;

      self.toCol = false;

      self.toColAfter = false;

      $("body").off("mousemove", self.moveHover);

      $("body").off("mouseup", self.endMove);
    };

    MoveColumns.prototype.moveHover = function (e) {

      var self = this,
          columnHolder = self.table.columnManager.getElement(),
          scrollLeft = columnHolder.scrollLeft(),
          xPos = e.pageX - columnHolder.offset().left + scrollLeft,
          scrollPos;

      self.hoverElement.css({

        "left": xPos - self.startX

      });

      if (xPos - scrollLeft < self.autoScrollMargin) {

        if (!self.autoScrollTimeout) {

          self.autoScrollTimeout = setTimeout(function () {

            scrollPos = Math.max(0, scrollLeft - 5);

            self.table.rowManager.getElement().scrollLeft(scrollPos);

            self.autoScrollTimeout = false;
          }, 1);
        }
      }

      if (scrollLeft + columnHolder.innerWidth() - xPos < self.autoScrollMargin) {

        if (!self.autoScrollTimeout) {

          self.autoScrollTimeout = setTimeout(function () {

            scrollPos = Math.min(columnHolder.innerWidth(), scrollLeft + 5);

            self.table.rowManager.getElement().scrollLeft(scrollPos);

            self.autoScrollTimeout = false;
          }, 1);
        }
      }
    };

    Tabulator.registerExtension("moveColumn", MoveColumns);

    var MoveRows = function MoveRows(table) {

      this.table = table; //hold Tabulator object


      this.placeholderElement = $("<div class='tabulator-row tabulator-row-placeholder'></div>");

      this.hoverElement = $(); //floating row header element


      this.checkTimeout = false; //click check timeout holder


      this.checkPeriod = 150; //period to wait on mousedown to consider this a move and not a click


      this.moving = false; //currently moving row


      this.toRow = false; //destination row


      this.toRowAfter = false; //position of moving row relative to the desitnation row


      this.hasHandle = false; //row has handle instead of fully movable row


      this.startY = 0; //starting position within header element


      this.moveHover = this.moveHover.bind(this);

      this.endMove = this.endMove.bind(this);
    };

    MoveRows.prototype.setHandle = function (handle) {

      this.hasHandle = handle;
    };

    MoveRows.prototype.initializeRow = function (row) {

      var self = this,
          config = {};

      config.mousemove = function (e) {

        if (e.pageY - row.element.offset().top + self.table.rowManager.element.scrollTop() > row.getHeight() / 2) {

          if (self.toRow !== row || !self.toRowAfter) {

            row.element.after(self.placeholderElement);

            self.moveRow(row, true);
          }
        } else {

          if (self.toRow !== row || self.toRowAfter) {

            row.element.before(self.placeholderElement);

            self.moveRow(row, false);
          }
        }
      }.bind(self);

      if (!this.hasHandle) {

        row.getElement().on("mousedown", function (e) {

          self.checkTimeout = setTimeout(function () {

            self.startMove(e, row);
          }, self.checkPeriod);
        });

        row.getElement().on("mouseup", function (e) {

          if (self.checkTimeout) {

            clearTimeout(self.checkTimeout);
          }
        });
      }

      row.extensions.moveRow = config;
    };

    MoveRows.prototype.initializeCell = function (cell) {

      var self = this;

      cell.getElement().on("mousedown", function (e) {

        self.checkTimeout = setTimeout(function () {

          self.startMove(e, cell.row);
        }, self.checkPeriod);
      });

      cell.getElement().on("mouseup", function (e) {

        if (self.checkTimeout) {

          clearTimeout(self.checkTimeout);
        }
      });
    };

    MoveRows.prototype._bindMouseMove = function () {

      var self = this;

      self.table.rowManager.displayRows.forEach(function (row) {

        if (row.type === "row" && row.extensions.moveRow.mousemove) {

          row.element.on("mousemove", row.extensions.moveRow.mousemove);
        }
      });
    };

    MoveRows.prototype._unbindMouseMove = function () {

      var self = this;

      self.table.rowManager.displayRows.forEach(function (row) {

        if (row.type === "row" && row.extensions.moveRow.mousemove) {

          row.element.off("mousemove", row.extensions.moveRow.mousemove);
        }
      });
    };

    MoveRows.prototype.startMove = function (e, row) {

      var self = this,
          element = row.getElement();

      self.moving = row;

      self.startY = e.pageY - element.offset().top;

      self.table.element.addClass("tabulator-block-select");

      //create placeholder


      self.placeholderElement.css({

        width: row.getWidth(),

        height: row.getHeight()

      });

      element.before(self.placeholderElement);

      element.detach();

      //create hover element


      self.hoverElement = element.clone();

      self.hoverElement.addClass("tabulator-moving");

      self.table.rowManager.getTableElement().append(self.hoverElement);

      self.hoverElement.css({

        "left": 0,

        "top": 0

      });

      self._bindMouseMove();

      $("body").on("mousemove", self.moveHover);

      $("body").on("mouseup", self.endMove);

      self.moveHover(e);
    };

    MoveRows.prototype.endMove = function (column) {

      var self = this;

      self._unbindMouseMove();

      self.placeholderElement.after(self.moving.getElement());

      self.placeholderElement.detach();

      self.hoverElement.detach();

      self.table.element.removeClass("tabulator-block-select");

      if (self.toRow) {

        self.table.rowManager.moveRow(self.moving, self.toRow, self.toRowAfter);
      }

      self.moving = false;

      self.toRow = false;

      self.toRowAfter = false;

      $("body").off("mousemove", self.moveHover);

      $("body").off("mouseup", self.endMove);
    };

    MoveRows.prototype.moveRow = function (row, after) {

      var self = this;

      self.toRow = row;

      self.toRowAfter = after;
    };

    MoveRows.prototype.moveHover = function (e) {

      var self = this,
          rowHolder = self.table.rowManager.getElement(),
          scrollTop = rowHolder.scrollTop(),
          yPos = e.pageY - rowHolder.offset().top + scrollTop,
          scrollPos;

      self.hoverElement.css({

        "top": yPos - self.startY

      });
    };

    Tabulator.registerExtension("moveRow", MoveRows);

    var Mutator = function Mutator(table) {

      this.table = table; //hold Tabulator object

    };

    //initialize column mutator


    Mutator.prototype.initializeColumn = function (column) {

      var config = { mutator: false, type: column.definition.mutateType, params: column.definition.mutatorParams || {} };

      //set column mutator


      switch (_typeof(column.definition.mutator)) {

        case "string":

          if (this.mutators[column.definition.mutator]) {

            config.mutator = this.mutators[column.definition.mutator];
          } else {

            console.warn("Mutator Error - No such mutator found, ignoring: ", column.definition.mutator);
          }

          break;

        case "function":

          config.mutator = column.definition.mutator;

          break;

      }

      if (config.mutator) {

        column.extensions.mutate = config;
      }
    };

    //apply mutator to row


    Mutator.prototype.transformRow = function (data) {

      var self = this;

      self.table.columnManager.traverse(function (column) {

        var field;

        if (column.extensions.mutate) {

          field = column.getField();

          if (column.extensions.mutate.type != "edit") {

            column.setFieldValue(data, column.extensions.mutate.mutator(column.getFieldValue(data), data, "data", column.extensions.mutate.params));
          }
        }
      });

      return data;
    };

    //apply mutator to new cell value


    Mutator.prototype.transformCell = function (cell, value) {

      return cell.column.extensions.mutate.mutator(value, cell.row.getData(), "edit", cell.column.extensions.mutate.params, cell.getComponent());
    };

    //default mutators


    Mutator.prototype.mutators = {};

    Tabulator.registerExtension("mutator", Mutator);

    var Page = function Page(table) {

      this.table = table; //hold Tabulator object


      this.element = $("<span class='tabulator-paginator'></span>");

      this.pagesElement = $("<span class='tabulator-pages'></span>");

      this.firstBut = $("<button class='tabulator-page' data-page='first' role='button' aria-label='' title=''></button>");

      this.prevBut = $("<button class='tabulator-page' data-page='prev' role='button' aria-label='' title=''></button>");

      this.nextBut = $("<button class='tabulator-page' data-page='next' role='button' aria-label='' title=''></button>");

      this.lastBut = $("<button class='tabulator-page' data-page='last' role='button' aria-label='' title=''></button>");

      this.mode = "local";

      this.size = 0;

      this.page = 1;

      this.max = 1;

      this.paginator = false;
    };

    //setup pageination


    Page.prototype.initialize = function () {

      var self = this;

      //update param names


      for (var key in self.table.options.paginationDataSent) {

        self.paginationDataSentNames[key] = self.table.options.paginationDataSent[key];
      }

      for (var _key2 in self.table.options.paginationDataReceived) {

        self.paginationDataReceivedNames[_key2] = self.table.options.paginationDataReceived[_key2];
      }

      if (self.table.options.paginator) {

        self.paginator = self.table.options.paginator;
      }

      //build pagination element


      //bind localizations


      self.table.extensions.localize.bind("pagination.first", function (value) {

        self.firstBut.html(value);
      });

      self.table.extensions.localize.bind("pagination.first_title", function (value) {

        self.firstBut.attr("aria-label", value).attr("title", value);
      });

      self.table.extensions.localize.bind("pagination.prev", function (value) {

        self.prevBut.html(value);
      });

      self.table.extensions.localize.bind("pagination.prev_title", function (value) {

        self.prevBut.attr("aria-label", value).attr("title", value);
      });

      self.table.extensions.localize.bind("pagination.next", function (value) {

        self.nextBut.html(value);
      });

      self.table.extensions.localize.bind("pagination.next_title", function (value) {

        self.nextBut.attr("aria-label", value).attr("title", value);
      });

      self.table.extensions.localize.bind("pagination.last", function (value) {

        self.lastBut.html(value);
      });

      self.table.extensions.localize.bind("pagination.last_title", function (value) {

        self.lastBut.attr("aria-label", value).attr("title", value);
      });

      //click bindings


      self.firstBut.on("click", function () {

        self.setPage(1);
      });

      self.prevBut.on("click", function () {

        self.previousPage();
      });

      self.nextBut.on("click", function () {

        self.nextPage();
      });

      self.lastBut.on("click", function () {

        self.setPage(self.max);
      });

      if (self.table.options.paginationElement) {

        self.element = self.table.options.paginationElement;
      }

      //append to DOM


      self.element.append(self.firstBut);

      self.element.append(self.prevBut);

      self.element.append(self.pagesElement);

      self.element.append(self.nextBut);

      self.element.append(self.lastBut);

      if (!self.table.options.paginationElement) {

        self.table.footerManager.append(self.element, self);
      }

      //set default values


      self.mode = self.table.options.pagination;

      self.size = self.table.options.paginationSize || Math.floor(self.table.rowManager.getElement().innerHeight() / 26);
    };

    //calculate maximum page from number of rows


    Page.prototype.setMaxRows = function (rowCount) {

      if (!rowCount) {

        this.max = 1;
      } else {

        this.max = Math.ceil(rowCount / this.size);
      }

      if (this.page > this.max) {

        this.page = this.max;
      }
    };

    //reset to first page without triggering action


    Page.prototype.reset = function (force) {

      if (this.mode == "local" || force) {

        this.page = 1;
      }

      return true;
    };

    //set the maxmum page


    Page.prototype.setMaxPage = function (max) {

      this.max = max || 1;

      if (this.page > this.max) {

        this.page = this.max;

        this.trigger();
      }
    };

    //set current page number


    Page.prototype.setPage = function (page) {

      if (page > 0 && page <= this.max) {

        this.page = page;

        this.trigger();

        return true;
      } else {

        console.warn("Pagination Error - Requested page is out of range of 1 - " + this.max + ":", page);

        return false;
      }
    };

    Page.prototype.setPageSize = function (size) {

      if (size > 0) {

        this.size = size;
      }
    };

    //setup the pagination buttons


    Page.prototype._setPageButtons = function () {

      var self = this;

      var min = this.page < this.max - 2 ? this.page - 2 : this.page - (4 - (this.max - this.page));

      var max = this.page > 3 ? this.page + 2 : this.page + (5 - this.page);

      self.pagesElement.empty();

      if (self.page == 1) {

        self.firstBut.prop("disabled", true);

        self.prevBut.prop("disabled", true);
      } else {

        self.firstBut.prop("disabled", false);

        self.prevBut.prop("disabled", false);
      }

      if (self.page == self.max) {

        self.lastBut.prop("disabled", true);

        self.nextBut.prop("disabled", true);
      } else {

        self.lastBut.prop("disabled", false);

        self.nextBut.prop("disabled", false);
      }

      for (var i = min; i <= max; i++) {

        if (i > 0 && i <= self.max) {

          self.pagesElement.append(self._generatePageButton(i));
        }
      }

      this.footerRedraw();
    };

    Page.prototype._generatePageButton = function (page) {

      var self = this;

      var button = $("<button class='tabulator-page " + (page == self.page ? "active" : "") + "' data-page='" + page + "' role='button' arpagea-label='Show Page " + page + "'>" + page + "</button>");

      button.on("click", function (e) {

        self.setPage(page);
      });

      return button;
    };

    //previous page


    Page.prototype.previousPage = function () {

      if (this.page > 1) {

        this.page--;

        this.trigger();

        return true;
      } else {

        console.warn("Pagination Error - Previous page would be less than page 1:", 0);

        return false;
      }
    };

    //next page


    Page.prototype.nextPage = function () {

      if (this.page < this.max) {

        this.page++;

        this.trigger();

        return true;
      } else {

        console.warn("Pagination Error - Next page would be greater than maximum page of " + this.max + ":", this.max + 1);

        return false;
      }
    };

    //return current page number


    Page.prototype.getPage = function () {

      return this.page;
    };

    //return max page number


    Page.prototype.getPageMax = function () {

      return this.max;
    };

    Page.prototype.getPageSize = function (size) {
      ;

      return this.size;
    };

    Page.prototype.getMode = function () {

      return this.mode;
    };

    //return appropriate rows for current page


    Page.prototype.getRows = function (data) {

      var output, start, end;

      if (this.mode == "local") {

        output = [];

        start = this.size * (this.page - 1);

        end = start + parseInt(this.size);

        this._setPageButtons();

        for (var i = start; i < end; i++) {

          if (data[i]) {

            output.push(data[i]);
          }
        }

        return output;
      } else {

        this._setPageButtons();

        return data.slice(0);
      }
    };

    Page.prototype.trigger = function () {

      switch (this.mode) {

        case "local":

          this.table.rowManager.refreshActiveData();

          this.table.options.pageLoaded(this.getPage());

          break;

        case "remote":

          this._getRemotePage();

          break;

        default:

          console.warn("Pagination Error - no such pagination mode:", this.mode);

      }
    };

    Page.prototype._getRemotePage = function () {

      if (this.table.extExists("ajax", true)) {

        if (this.paginator) {

          this._getRemotePagePaginator();
        } else {

          this._getRemotePageAuto();
        }
      }
    };

    Page.prototype._getRemotePagePaginator = function () {

      var self = this,
          ajax = self.table.extensions.ajax,
          oldUrl = ajax.getUrl();

      ajax.setUrl(self.paginator(ajax.getUrl(), self.page, self.size, ajax.getParams()));

      ajax.sendRequest(function (data) {

        self._parseRemoteData(data);
      });

      ajax.setUrl(oldUrl);
    };

    Page.prototype._getRemotePageAuto = function () {

      var self = this,
          oldParams,
          pageParams;

      //record old params and restore after request has been made


      oldParams = $.extend(true, {}, self.table.extensions.ajax.getParams());

      pageParams = self.table.extensions.ajax.getParams();

      //configure request params


      pageParams[this.paginationDataSentNames.page] = self.page;

      //set page size if defined


      if (this.size) {

        pageParams[this.paginationDataSentNames.size] = this.size;
      }

      //set sort data if defined


      if (this.table.extExists("sort")) {

        var sorters = self.table.extensions.sort.getSort();

        sorters.forEach(function (item) {

          delete item.column;
        });

        pageParams[this.paginationDataSentNames.sort] = sorters;
      }

      //set filter data if defined


      if (this.table.extExists("filter")) {

        var filters = self.table.extensions.filter.getFilters(true, true);

        pageParams[this.paginationDataSentNames.filters] = filters;
      }

      self.table.extensions.ajax.setParams(pageParams);

      self.table.extensions.ajax.sendRequest(function (data) {

        self._parseRemoteData(data);
      });

      self.table.extensions.ajax.setParams(oldParams);
    };

    Page.prototype._parseRemoteData = function (data) {

      if (data[this.paginationDataReceivedNames.last_page]) {

        if (data[this.paginationDataReceivedNames.data]) {

          this.max = parseInt(data[this.paginationDataReceivedNames.last_page]);

          this.table.rowManager.setData(data[this.paginationDataReceivedNames.data]);

          this.table.options.pageLoaded(this.getPage());
        } else {

          console.warn("Remote Pagination Error - Server response missing '" + this.paginationDataReceivedNames.data + "' property");
        }
      } else {

        console.warn("Remote Pagination Error - Server response missing '" + this.paginationDataReceivedNames.last_page + "' property");
      }
    };

    //handle the footer element being redrawn


    Page.prototype.footerRedraw = function () {

      var footer = this.table.footerManager.element;

      if (footer.innerWidth() - footer[0].scrollWidth < 0) {

        this.pagesElement.hide();
      } else {

        this.pagesElement.show();

        if (footer.innerWidth() - footer[0].scrollWidth < 0) {

          this.pagesElement.hide();
        }
      }
    };

    //set the paramter names for pagination requests


    Page.prototype.paginationDataSentNames = {

      "page": "page",

      "size": "size",

      "sorters": "sorters",

      // "sort_dir":"sort_dir",


      "filters": "filters"

    };

    //set the property names for pagination responses


    Page.prototype.paginationDataReceivedNames = {

      "current_page": "current_page",

      "last_page": "last_page",

      "data": "data"

    };

    Tabulator.registerExtension("page", Page);

    var PersistentLayout = function PersistentLayout(table) {

      this.table = table; //hold Tabulator object


      this.mode = "";

      this.id = "";

      this.persistProps = ["field", "width", "visible"];
    };

    //setup parameters


    PersistentLayout.prototype.initialize = function (mode, id) {

      //determine persistent layout storage type


      this.mode = mode !== true ? mode : typeof window.localStorage !== 'undefined' ? "local" : "cookie";

      //set storage tag


      this.id = "tabulator-" + (id || this.table.element.attr("id") || "");
    };

    //load saved definitions


    PersistentLayout.prototype.load = function (definition) {

      var newDefinition = "";

      switch (this.mode) {

        case "local":

          newDefinition = localStorage.getItem(this.id);

          break;

        case "cookie":

          //find cookie


          var cookie = document.cookie,
              cookiePos = cookie.indexOf(this.id + "="),
              end = void 0;

          //if cookie exists, decode and load column data into tabulator


          if (cookiePos > -1) {

            cookie = cookie.substr(cookiePos);

            end = cookie.indexOf(";");

            if (end > -1) {

              cookie = cookie.substr(0, end);
            }

            newDefinition = cookie.replace(this.id + "=", "");
          }

          break;

        default:

          console.warn("Persistance Load Error - invalid mode selected", this.mode);

      }

      if (newDefinition) {

        newDefinition = JSON.parse(newDefinition);

        definition = this.mergeDefinition(definition, newDefinition);
      }

      return definition;
    };

    //merge old and new column defintions


    PersistentLayout.prototype.mergeDefinition = function (oldCols, newCols) {

      var self = this,
          output = [];

      newCols.forEach(function (column, to) {

        var from = self._findColumn(oldCols, column);

        if (from) {

          from.width = column.width;

          from.visible = column.visible;

          if (from.columns) {

            from.columns = self.mergeDefinition(from.columns, column.columns);
          }

          output.push(from);
        }
      });

      return output;
    };

    //find matching columns


    PersistentLayout.prototype._findColumn = function (columns, subject) {

      var type = subject.columns ? "group" : subject.field ? "field" : "object";

      return columns.find(function (col) {

        switch (type) {

          case "group":

            return col.title === subject.title && col.columns.length === subject.columns.length;

            break;

          case "field":

            return col.field === subject.field;

            break;

          case "object":

            return col === subject;

            break;

        }
      });
    };

    //save current definitions


    PersistentLayout.prototype.save = function () {

      var definition = this.parseColumns(this.table.columnManager.getColumns()),
          data = JSON.stringify(definition);

      switch (this.mode) {

        case "local":

          localStorage.setItem(this.id, data);

          break;

        case "cookie":

          var expireDate = new Date();

          expireDate.setDate(expireDate.getDate() + 10000);

          //save cookie


          document.cookie = this.id + "=" + data + "; expires=" + expireDate.toUTCString();

          break;

        default:

          console.warn("Persistance Save Error - invalid mode selected", this.mode);

      }
    };

    //build premission list


    PersistentLayout.prototype.parseColumns = function (columns) {

      var self = this,
          definitions = [];

      columns.forEach(function (column) {

        var def = {};

        if (column.isGroup) {

          def.title = column.getDefinition().title;

          def.columns = self.parseColumns(column.getColumns());
        } else {

          def.title = column.getDefinition().title;

          def.field = column.getField();

          def.width = column.getWidth();

          def.visible = column.visible;
        }

        definitions.push(def);
      });

      return definitions;
    };

    Tabulator.registerExtension("persistentLayout", PersistentLayout);

    var ResizeColumns = function ResizeColumns(table) {

      this.table = table; //hold Tabulator object


      this.startColumn = false;

      this.startX = false;

      this.startWidth = false;

      this.handle = null;

      this.prevHandle = null;
    };

    ResizeColumns.prototype.initializeColumn = function (type, column, element) {

      var self = this,
          variableHeight = false,
          mode = this.table.options.resizableColumns;

      //set column resize mode


      if (type === "header") {

        variableHeight = column.definition.formatter == "textarea" || column.definition.variableHeight;

        column.extensions.resize = { variableHeight: variableHeight };
      }

      if (mode === true || mode == type) {

        var handle = document.createElement('div');

        handle.className = "tabulator-col-resize-handle";

        var prevHandle = document.createElement('div');

        prevHandle.className = "tabulator-col-resize-handle prev";

        handle.addEventListener("click", function (e) {

          e.stopPropagation();
        });

        handle.addEventListener("mousedown", function (e) {

          var nearestColumn = column.getLastColumn();

          if (nearestColumn) {

            self.startColumn = column;

            self._mouseDown(e, nearestColumn);
          }
        });

        prevHandle.addEventListener("click", function (e) {

          e.stopPropagation();
        });

        prevHandle.addEventListener("mousedown", function (e) {

          var nearestColumn, colIndex, prevColumn;

          nearestColumn = column.getFirstColumn();

          if (nearestColumn) {

            colIndex = self.table.columnManager.findColumnIndex(nearestColumn);

            prevColumn = colIndex > 0 ? self.table.columnManager.getColumnByIndex(colIndex - 1) : false;

            if (prevColumn) {

              self.startColumn = column;

              self._mouseDown(e, prevColumn);
            }
          }
        });

        element.append(handle).append(prevHandle);
      }
    };

    ResizeColumns.prototype._mouseDown = function (e, column) {

      var self = this;

      self.table.element.addClass("tabulator-block-select");

      function mouseMove(e) {

        column.setWidth(self.startWidth + (e.screenX - self.startX));

        if (!self.table.browserSlow && column.extensions.resize && column.extensions.resize.variableHeight) {

          column.checkCellHeights();
        }
      }

      function mouseUp(e) {

        //block editor from taking action while resizing is taking place


        if (self.startColumn.extensions.edit) {

          self.startColumn.extensions.edit.blocked = false;
        }

        if (self.table.browserSlow && column.extensions.resize && column.extensions.resize.variableHeight) {

          column.checkCellHeights();
        }

        $("body").off("mouseup", mouseMove);

        $("body").off("mousemove", mouseMove);

        self.table.element.removeClass("tabulator-block-select");

        if (self.table.options.persistentLayout && self.table.extExists("persistentLayout", true)) {

          self.table.extensions.persistentLayout.save();
        }

        self.table.options.columnResized(self.startColumn.getComponent());
      }

      e.stopPropagation(); //prevent resize from interfereing with movable columns


      //block editor from taking action while resizing is taking place


      if (self.startColumn.extensions.edit) {

        self.startColumn.extensions.edit.blocked = true;
      }

      self.startX = e.screenX;

      self.startWidth = column.getWidth();

      $("body").on("mousemove", mouseMove);

      $("body").on("mouseup", mouseUp);
    };

    Tabulator.registerExtension("resizeColumns", ResizeColumns);

    var ResponsiveLayout = function ResponsiveLayout(table) {

      this.table = table; //hold Tabulator object


      this.columns = [];

      this.index = 0;
    };

    //generate resposivle columns list


    ResponsiveLayout.prototype.initialize = function () {

      var columns = [];

      //detemine level of responsivity for each column


      this.table.columnManager.columnsByIndex.forEach(function (column) {

        var def = column.getDefinition();

        column.extensions.responsive = { order: typeof def.responsive === "undefined" ? 1 : def.responsive };

        if (column.extensions.responsive.order) {

          columns.push(column);
        }
      });

      //sort list by responsivity


      columns = columns.reverse();

      columns = columns.sort(function (a, b) {

        return b.extensions.responsive.order - a.extensions.responsive.order;
      });

      this.columns = columns;
    };

    ResponsiveLayout.prototype.update = function () {

      var self = this,
          working = true;

      while (working) {

        var width = self.table.extensions.layout.getMode() == "fitColumns" ? self.table.columnManager.getFlexBaseWidth() : self.table.columnManager.getWidth();

        var diff = self.table.columnManager.element.innerWidth() - width;

        if (diff < 0) {

          //table is too wide


          var column = self.columns[self.index];

          if (column) {

            column.hide();

            self.index++;
          } else {

            working = false;
          }
        } else {

          //table has spare space


          var _column = self.columns[self.index - 1];

          if (_column) {

            if (diff > 0) {

              if (diff >= _column.getWidth()) {

                _column.show();

                self.index--;
              } else {

                working = false;
              }
            } else {

              working = false;
            }
          } else {

            working = false;
          }
        }

        if (!self.table.rowManager.activeRowsCount) {

          self.table.rowManager.renderEmptyScroll();
        }
      }
    };

    Tabulator.registerExtension("responsiveLayout", ResponsiveLayout);

    var SelectRow = function SelectRow(table) {

      this.table = table; //hold Tabulator object


      this.selecting = false; //flag selecting in progress


      this.selectPrev = []; //hold previously selected element for drag drop selection


      this.selectedRows = []; //hold selected rows

    };

    SelectRow.prototype.clearSelectionData = function () {

      this.selecting = false;

      this.selectPrev = [];

      this.selectedRows = [];
    };

    SelectRow.prototype.initializeRow = function (row) {

      var self = this,
          element = row.getElement();

      // trigger end of row selection


      var endSelect = function endSelect() {

        setTimeout(function () {

          self.selecting = false;
        }, 50);

        $("body").off("mouseup", endSelect);
      };

      row.extensions.select = { selected: false };

      //set row selection class


      if (self.table.options.selectableCheck(row.getComponent())) {

        element.addClass("tabulator-selectable").removeClass("tabulator-unselectable");

        if (self.table.options.selectable && self.table.options.selectable != "highlight") {

          element.on("click", function (e) {

            if (!self.selecting) {

              self.toggleRow(row);
            }
          });

          element.on("mousedown", function (e) {

            if (e.shiftKey) {

              self.selecting = true;

              self.selectPrev = [];

              $("body").on("mouseup", endSelect);

              $("body").on("keyup", endSelect);

              self.toggleRow(row);

              return false;
            }
          });

          element.on("mouseenter", function (e) {

            if (self.selecting) {

              self.toggleRow(row);

              if (self.selectPrev[1] == row) {

                self.toggleRow(self.selectPrev[0]);
              }
            }
          });

          element.on("mouseout", function (e) {

            if (self.selecting) {

              self.selectPrev.unshift(row);
            }
          });
        }
      } else {

        row.getElement().addClass("tabulator-unselectable").removeClass("tabulator-selectable");
      }
    };

    //toggle row selection


    SelectRow.prototype.toggleRow = function (row) {

      if (this.table.options.selectableCheck(row.getComponent())) {

        if (row.extensions.select.selected) {

          this._deselectRow(row);
        } else {

          this._selectRow(row);
        }
      }
    };

    //select a number of rows


    SelectRow.prototype.selectRows = function (rows) {

      var self = this;

      switch (typeof rows === 'undefined' ? 'undefined' : _typeof(rows)) {

        case "undefined":

          self.table.rowManager.rows.forEach(function (row) {

            self._selectRow(row, true, true);
          });

          self._rowSelectionChanged();

          break;

        case "boolean":

          if (rows === true) {

            self.table.rowManager.activeRows.forEach(function (row) {

              self._selectRow(row, true, true);
            });

            self._rowSelectionChanged();
          }

          break;

        default:

          if (Array.isArray(rows)) {

            rows.forEach(function (row) {

              self._selectRow(row, true);
            });

            self._rowSelectionChanged();
          } else {

            self._selectRow(rows);
          }

          break;

      }
    };

    //select an individual row


    SelectRow.prototype._selectRow = function (rowInfo, silent, force) {

      var self = this,
          index;

      //handle max row count


      if (!isNaN(self.table.options.selectable) && self.table.options.selectable !== true && !force) {

        if (self.selectedRows.length >= self.table.options.selectable) {

          if (self.table.options.selectableRollingSelection) {

            self._deselectRow(self.selectedRows[0], true);
          } else {

            return false;
          }
        }
      }

      var row = self.table.rowManager.findRow(rowInfo);

      if (row) {

        var self = this;

        row.extensions.select.selected = true;

        row.getElement().addClass("tabulator-selected");

        self.selectedRows.push(row);

        if (!silent) {

          self.table.options.rowSelected(row.getComponent());

          self._rowSelectionChanged();
        }
      } else {

        console.warn("Selection Error - No such row found, ignoring selection:" + rowInfo);
      }
    };

    //deselect a number of rows


    SelectRow.prototype.deselectRows = function (rows) {

      var self = this;

      if (typeof rows == "undefined") {

        var rowCount = self.selectedRows.length;

        for (var i = 0; i < rowCount; i++) {

          self._deselectRow(self.selectedRows[0], true);
        }

        self._rowSelectionChanged();
      } else {

        if (Array.isArray(rows)) {

          rows.forEach(function (row) {

            self._deselectRow(row, true);
          });

          self._rowSelectionChanged();
        } else {

          self._deselectRow(rows);
        }
      }
    };

    //deselect an individual row


    SelectRow.prototype._deselectRow = function (rowInfo, silent) {

      var self = this,
          row = self.table.rowManager.findRow(rowInfo),
          index;

      if (row) {

        index = self.selectedRows.findIndex(function (selectedRow) {

          return selectedRow == row;
        });

        if (index > -1) {

          row.extensions.select.selected = false;

          row.getElement().removeClass("tabulator-selected");

          self.selectedRows.splice(index, 1);

          if (!silent) {

            self.table.options.rowDeselected(row.getComponent());

            self._rowSelectionChanged();
          }
        }
      } else {

        console.warn("Selection Error - No such row found, ignoring selection:" + rowInfo);
      }
    };

    SelectRow.prototype.getSelectedData = function () {

      var data = [];

      this.selectedRows.forEach(function (row) {

        data.push(row.getData());
      });

      return data;
    };

    SelectRow.prototype.getSelectedRows = function () {

      var rows = [];

      this.selectedRows.forEach(function (row) {

        rows.push(row.getComponent());
      });

      return rows;
    };

    SelectRow.prototype._rowSelectionChanged = function () {

      this.table.options.rowSelectionChanged(this.getSelectedData(), this.getSelectedRows());
    };

    Tabulator.registerExtension("selectRow", SelectRow);

    var Sort = function Sort(table) {

      this.table = table; //hold Tabulator object


      this.sortList = []; //holder current sort


      this.changed = false; //has the sort changed since last render

    };

    //initialize column header for sorting


    Sort.prototype.initializeColumn = function (column, content) {

      var self = this,
          sorter = false;

      switch (_typeof(column.definition.sorter)) {

        case "string":

          if (self.sorters[column.definition.sorter]) {

            sorter = self.sorters[column.definition.sorter];
          } else {

            console.warn("Sort Error - No such sorter found: ", column.definition.sorter);
          }

          break;

        case "function":

          sorter = column.definition.sorter;

          break;

      }

      column.extensions.sort = { sorter: sorter, dir: "none", params: column.definition.sorterParams || {} };

      if (column.definition.headerSort !== false) {

        column.element.addClass("tabulator-sortable");

        //create sorter arrow


        content.append($("<div class='tabulator-arrow'></div>"));

        //sort on click


        column.element.on("click", function (e) {

          var dir = "",
              sorters = [],
              match = false;

          if (column.extensions.sort) {

            dir = column.extensions.sort.dir == "asc" ? "desc" : "asc";

            if (e.shiftKey || e.ctrlKey) {

              sorters = self.getSort();

              match = sorters.findIndex(function (sorter) {

                return sorter.field === column.getField();
              });

              if (match > -1) {

                sorters[match].dir = sorters[match].dir == "asc" ? "desc" : "asc";

                if (match != sorters.length - 1) {

                  sorters.push(sorters.splice(match, 1)[0]);
                }
              } else {

                sorters.push({ column: column, dir: dir });
              }

              //add to existing sort


              self.setSort(sorters);
            } else {

              //sort by column only


              self.setSort(column, dir);
            }

            self.table.rowManager.sorterRefresh();
          }
        });
      }
    };

    //check if the sorters have changed since last use


    Sort.prototype.hasChanged = function () {

      var changed = this.changed;

      this.changed = false;

      return changed;
    };

    //return current sorters


    Sort.prototype.getSort = function () {

      var self = this,
          sorters = [];

      self.sortList.forEach(function (item) {

        if (item.column) {

          sorters.push({ column: item.column.getComponent(), field: item.column.getField(), dir: item.dir });
        }
      });

      return sorters;
    };

    //change sort list and trigger sort


    Sort.prototype.setSort = function (sortList, dir) {

      var self = this,
          newSortList = [];

      if (!Array.isArray(sortList)) {

        sortList = [{ column: sortList, dir: dir }];
      }

      sortList.forEach(function (item) {

        var column;

        column = self.table.columnManager.findColumn(item.column);

        if (column) {

          item.column = column;

          newSortList.push(item);

          self.changed = true;
        } else {

          console.warn("Sort Warning - Sort field does not exist and is being ignored: ", item.column);
        }
      });

      self.sortList = newSortList;
    };

    //clear sorters


    Sort.prototype.clear = function () {

      this.setSort([]);
    },

    //find appropriate sorter for column


    Sort.prototype.findSorter = function (column) {

      var row = this.table.rowManager.activeRows[0],
          sorter = "string",
          field,
          value;

      if (row) {

        row = row.getData();

        field = column.getField();

        if (field) {

          value = column.getFieldValue(row);

          switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {

            case "undefined":

              sorter = "string";

              break;

            case "boolean":

              sorter = "boolean";

              break;

            default:

              if (!isNaN(value) && value !== "") {

                sorter = "number";
              } else {

                if (value.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)) {

                  sorter = "alphanum";
                }
              }

              break;

          }
        }
      }

      return this.sorters[sorter];
    };

    //work through sort list sorting data


    Sort.prototype.sort = function () {

      var self = this,
          lastSort;

      if (self.table.options.dataSorting) {

        self.table.options.dataSorting(self.getSort());
      }

      self.clearColumnHeaders();

      if (!self.table.options.ajaxSorting) {

        self.sortList.forEach(function (item, i) {

          if (item.column && item.column.extensions.sort) {

            //if no sorter has been defined, take a guess


            if (!item.column.extensions.sort.sorter) {

              item.column.extensions.sort.sorter = self.findSorter(item.column);
            }

            self._sortItem(item.column, item.dir, self.sortList, i);
          }

          self.setColumnHeader(item.column, item.dir);
        });
      }

      if (self.table.options.dataSorted) {

        self.table.options.dataSorted(self.getSort(), self.table.rowManager.getComponents(true));
      }
    };

    //clear sort arrows on columns


    Sort.prototype.clearColumnHeaders = function () {

      this.table.columnManager.getRealColumns().forEach(function (column) {

        if (column.extensions.sort) {

          column.extensions.sort.dir = "none";

          column.element.attr("aria-sort", "none");
        }
      });
    };

    //set the column header sort direction


    Sort.prototype.setColumnHeader = function (column, dir) {

      column.extensions.sort.dir = dir;

      column.element.attr("aria-sort", dir);
    };

    //sort each item in sort list


    Sort.prototype._sortItem = function (column, dir, sortList, i) {

      var self = this;

      var activeRows = self.table.rowManager.activeRows;

      activeRows.sort(function (a, b) {

        var result = self._sortRow(a, b, column, dir);

        //if results match recurse through previous searchs to be sure


        if (result == 0 && i) {

          for (var j = i - 1; j >= 0; j--) {

            result = self._sortRow(a, b, sortList[j].column, sortList[j].dir);

            if (result != 0) {

              break;
            }
          }
        }

        return result;
      });
    };

    //process individual rows for a sort function on active data


    Sort.prototype._sortRow = function (a, b, column, dir) {

      var self = this;

      //switch elements depending on search direction


      var el1 = dir == "asc" ? a : b;

      var el2 = dir == "asc" ? b : a;

      a = column.getFieldValue(el1.getData());

      b = column.getFieldValue(el2.getData());

      a = typeof a !== "undefined" ? a : "";

      b = typeof b !== "undefined" ? b : "";

      return column.extensions.sort.sorter.call(self, a, b, el1.getComponent(), el2.getComponent(), column.getComponent(), dir, column.extensions.sort.params);
    };

    //default data sorters


    Sort.prototype.sorters = {

      //sort numbers


      number: function number(a, b, aRow, bRow, column, dir, params) {

        return parseFloat(String(a).replace(",", "")) - parseFloat(String(b).replace(",", ""));
      },

      //sort strings


      string: function string(a, b, aRow, bRow, column, dir, params) {

        return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
      },

      //sort date


      date: function date(a, b, aRow, bRow, column, dir, params) {

        var self = this;

        var format = params.format || "DD/MM/YYYY";

        if (typeof moment != "undefined") {

          a = moment(a, format);

          b = moment(b, format);
        } else {

          console.error("Sort Error - 'date' sorter is dependant on moment.js");
        }

        return a - b;
      },

      //sort booleans


      boolean: function boolean(a, b, aRow, bRow, column, dir, params) {

        var el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;

        var el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

        return el1 - el2;
      },

      //sort alpha numeric strings


      alphanum: function alphanum(as, bs, aRow, bRow, column, dir, params) {

        var a,
            b,
            a1,
            b1,
            i = 0,
            L,
            rx = /(\d+)|(\D+)/g,
            rd = /\d/;

        if (isFinite(as) && isFinite(bs)) return as - bs;

        a = String(as).toLowerCase();

        b = String(bs).toLowerCase();

        if (a === b) return 0;

        if (!(rd.test(a) && rd.test(b))) return a > b ? 1 : -1;

        a = a.match(rx);

        b = b.match(rx);

        L = a.length > b.length ? b.length : a.length;

        while (i < L) {

          a1 = a[i];

          b1 = b[i++];

          if (a1 !== b1) {

            if (isFinite(a1) && isFinite(b1)) {

              if (a1.charAt(0) === "0") a1 = "." + a1;

              if (b1.charAt(0) === "0") b1 = "." + b1;

              return a1 - b1;
            } else return a1 > b1 ? 1 : -1;
          }
        }

        return a.length > b.length;
      },

      //sort hh:mm formatted times


      time: function time(a, b, aRow, bRow, column, dir, params) {

        var self = this;

        var format = params.format || "hh:mm";

        if (typeof moment != "undefined") {

          a = moment(a, format);

          b = moment(b, format);
        } else {

          console.error("Sort Error - 'date' sorter is dependant on moment.js");
        }

        return a - b;
      }

    };

    Tabulator.registerExtension("sort", Sort);

    var Validate = function Validate(table) {

      this.table = table;
    };

    //validate


    Validate.prototype.initializeColumn = function (column) {

      var self = this,
          config = [],
          validator;

      if (column.definition.validator) {

        if (Array.isArray(column.definition.validator)) {

          column.definition.validator.forEach(function (item) {

            validator = self._extractValidator(item);

            if (validator) {

              config.push(validator);
            }
          });
        } else {

          validator = this._extractValidator(column.definition.validator);

          if (validator) {

            config.push(validator);
          }
        }

        column.extensions.validate = config.length ? config : false;
      }
    };

    Validate.prototype._extractValidator = function (value) {

      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {

        case "string":

          var parts = value.split(":");

          var type = parts.shift();

          var params = parts.join();

          return this._buildValidator(type, params);

          break;

        case "function":

          return this._buildValidator(value);

          break;

        case "object":

          return this._buildValidator(value.type, value.parameters);

          break;

      }
    };

    Validate.prototype._buildValidator = function (type, params) {

      var func = typeof type == "function" ? type : this.validators[type];

      if (!func) {

        console.warn("Validator Setup Error - No matching validator found:", type);

        return false;
      } else {

        return {

          type: typeof type == "function" ? "function" : type,

          func: func,

          params: params

        };
      }
    };

    Validate.prototype.validate = function (validators, cell, value) {

      var self = this,
          valid = [];

      if (validators) {

        validators.forEach(function (item) {

          if (!item.func.call(self, cell, value, item.params)) {

            valid.push({

              type: item.type,

              parameters: item.params

            });
          }
        });
      }

      return valid.length ? valid : true;
    };

    Validate.prototype.validators = {

      //is integer


      integer: function integer(cell, value, parameters) {

        value = Number(value);

        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
      },

      //is float


      float: function float(cell, value, parameters) {

        value = Number(value);

        return typeof value === 'number' && isFinite(value) && value % 1 !== 0;;
      },

      //must be a number


      numeric: function numeric(cell, value, parameters) {

        return !isNaN(value);
      },

      //must be a string


      string: function string(cell, value, parameters) {

        return isNaN(value);
      },

      //maximum value


      max: function max(cell, value, parameters) {

        return parseFloat(value) <= parameters;
      },

      //minimum value


      min: function min(cell, value, parameters) {

        return parseFloat(value) >= parameters;
      },

      //minimum string length


      minLength: function minLength(cell, value, parameters) {

        return String(value).length >= parameters;
      },

      //maximum string length


      maxLength: function maxLength(cell, value, parameters) {

        return String(value).length <= parameters;
      },

      //in provided value list


      in: function _in(cell, value, parameters) {

        if (typeof parameters == "string") {

          parameters = parameters.split("|");
        }

        return value === "" || parameters.indexOf(value) > -1;
      },

      //must match provided regex


      regex: function regex(cell, value, parameters) {

        var reg = new RegExp(parameters);

        return reg.test(value);
      },

      //value must be unique in this column


      unique: function unique(cell, value, parameters) {

        var unique = true;

        var cellData = cell.getData();

        this.table.rowManager.rows.forEach(function (row) {

          var data = row.getData();

          if (data !== cellData) {

            if (value == data[cell.getField()]) {

              unique = false;
            }
          }
        });

        return unique;
      },

      //must have a value


      required: function required(cell, value, parameters) {

        return value !== "" & value !== null && typeof value != "undefined";
      }

    };

    Tabulator.registerExtension("validate", Validate);
  })();

  $.widget("ui.tabulator", Tabulator);
});