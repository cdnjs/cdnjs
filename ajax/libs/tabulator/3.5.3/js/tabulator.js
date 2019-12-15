'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v3.5.3 (c) Oliver Folkerd */

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

    ColumnManager.prototype.getComponents = function (structured) {

      var self = this,
          output = [],
          columns = structured ? self.columns : self.columnsByIndex;

      columns.forEach(function (column) {

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

      if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

        this.table.extensions.responsiveLayout.initialize();
      }

      if (this.table.options.columnMoved) {

        this.table.options.columnMoved(from.getComponent(), this.table.columnManager.getComponents());
      }

      if (this.table.options.persistentLayout && this.table.extExists("persistence", true)) {

        this.table.extensions.persistence.save("columns");
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

    ColumnManager.prototype.scrollToColumn = function (column, position, ifVisible) {

      var left = 0,
          offset = 0,
          adjust = 0;

      if (typeof position === "undefined") {

        position = this.table.options.scrollToColumnPosition;
      }

      if (typeof ifVisible === "undefined") {

        ifVisible = this.table.options.scrollToColumnIfVisible;
      }

      if (column.visible) {

        //align to correct position


        switch (position) {

          case "middle":

          case "center":

            adjust = -this.element[0].clientWidth / 2;

            break;

          case "right":

            adjust = column.element.innerWidth() - this.headersElement.innerWidth();

            break;

        }

        //check column visibility


        if (!ifVisible) {

          offset = column.element.position().left;

          if (offset > 0 && offset + column.element.outerWidth() < this.element[0].clientWidth) {

            return false;
          }
        }

        //calculate scroll position


        left = column.element.position().left + this.element.scrollLeft() + adjust;

        left = Math.max(Math.min(left, this.table.rowManager.element[0].scrollWidth - this.table.rowManager.element[0].clientWidth), 0);

        this.table.rowManager.scrollHorizontal(left);

        this.scrollHorizontal(left);

        return true;
      } else {

        console.warn("Scroll Error - Column not visible");

        return false;
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

        this.table.extensions.columnCalcs.recalc(this.table.rowManager.activeRows);
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

        this.table.extensions.columnCalcs.recalc(this.table.rowManager.activeRows);
      }

      if (force) {

        if (this.table.options.persistentLayout && this.table.extExists("persistence", true)) {

          this.table.extensions.persistence.save("columns");
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

      if (this.column.isGroup) {

        this.column.columns.forEach(function (column) {

          column.show();
        });
      } else {

        this.column.show();
      }
    };

    ColumnComponent.prototype.hide = function () {

      if (this.column.isGroup) {

        this.column.columns.forEach(function (column) {

          column.hide();
        });
      } else {

        this.column.hide();
      }
    };

    ColumnComponent.prototype.toggle = function () {

      if (this.column.visible) {

        this.hide();
      } else {

        this.show();
      }
    };

    ColumnComponent.prototype.delete = function () {

      this.column.delete();
    };

    ColumnComponent.prototype.getSubColumns = function () {

      var output = [];

      if (this.column.columns.length) {

        this.column.columns.forEach(function (column) {

          output.push(column.getComponent());
        });
      }

      return output;
    };

    ColumnComponent.prototype.getParentColumn = function () {

      return this.column.parent instanceof Column ? this.column.parent.getComponent() : false;
    };

    ColumnComponent.prototype._getSelf = function () {

      return this.column;
    };

    ColumnComponent.prototype.scrollTo = function () {

      this.column.table.columManager.scrollToColumn(this.column);
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

        console.warn("The%c tooltipHeader%c column definition property has been depricated and will be removed in version 4.0, use %c headerTooltip%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");

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

    Column.prototype.setTooltip = function () {

      var self = this,
          def = self.definition;

      //set header tooltips

      var tooltip = def.headerTooltip || def.tooltip === false ? def.headerTooltip : self.table.options.tooltipsHeader;

      if (tooltip) {

        if (tooltip === true) {

          if (def.field) {

            self.table.extensions.localize.bind("columns|" + def.field, function (value) {

              self.element.attr("title", value || def.title);
            });
          } else {

            self.element.attr("title", def.title);
          }
        } else {

          if (typeof tooltip == "function") {

            tooltip = tooltip(self.getComponent());

            if (tooltip === false) {

              tooltip = "";
            }
          }

          self.element.attr("title", tooltip);
        }
      } else {

        self.element.attr("title", "");
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

      self.setTooltip();

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

      //update header tooltip on mouse enter

      self.element.on("mouseenter", function (e) {

        self.setTooltip();
      });

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

      //setup column cell edit callbacks

      if (typeof def.cellEdited == "function") {

        self.cellEvents.cellEdited = def.cellEdited;
      }

      if (typeof def.cellEditing == "function") {

        self.cellEvents.cellEditing = def.cellEditing;
      }

      if (typeof def.cellEditCancelled == "function") {

        self.cellEvents.cellEditCancelled = def.cellEditCancelled;
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

      if (table.extExists("mutator")) {

        table.extensions.mutator.initializeColumn(self);
      }

      //set column accessor

      if (table.extExists("accessor")) {

        table.extensions.accessor.initializeColumn(self);
      }

      //set respoviveLayout

      if (_typeof(table.options.responsiveLayout) && table.extExists("responsiveLayout")) {

        table.extensions.responsiveLayout.initializeColumn(self);
      }

      //set column visibility

      if (typeof def.visible != "undefined") {

        if (def.visible) {

          self.show(true);
        } else {

          self.hide(true);
        }
      }

      //asign additional css classes to column header

      if (def.cssClass) {

        self.element.addClass(def.cssClass);
      }

      if (def.field) {

        this.element.attr("tabulator-field", def.field);
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

          table.extensions.localize.bind("columns|" + def.field, function (text) {

            titleElement.val(text || def.title || "&nbsp");
          });
        } else {

          titleElement.val(def.title || "&nbsp");
        }
      } else {

        if (def.field) {

          table.extensions.localize.bind("columns|" + def.field, function (text) {

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

      //calculate height of column header and group holder element

      var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().innerHeight() : this.parent.getHeadersElement().innerHeight();

      this.element.css("height", parentHeight);

      if (this.isGroup) {

        this.groupElement.css("min-height", parentHeight - this.contentElement.outerHeight());
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

      this.element.css("min-height", "");

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

    Column.prototype.show = function (silent, responsiveToggle) {

      if (!this.visible) {

        this.visible = true;

        this.element.css({

          "display": ""

        });

        this.table.columnManager._verticalAlignHeaders();

        if (this.parent.isGroup) {

          this.parent.checkColumnVisibility();
        }

        this.cells.forEach(function (cell) {

          cell.show();
        });

        if (this.table.options.persistentLayout && this.table.extExists("responsiveLayout", true)) {

          this.table.extensions.persistence.save("columns");
        }

        if (!responsiveToggle && this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

          this.table.extensions.responsiveLayout.updateColumnVisibility(this, this.visible);
        }

        if (!silent) {

          this.table.options.columnVisibilityChanged(this.getComponent(), true);
        }
      }
    };

    //hide column

    Column.prototype.hide = function (silent, responsiveToggle) {

      if (this.visible) {

        this.visible = false;

        this.element.css({

          "display": "none"

        });

        this.table.columnManager._verticalAlignHeaders();

        if (this.parent.isGroup) {

          this.parent.checkColumnVisibility();
        }

        this.cells.forEach(function (cell) {

          cell.hide();
        });

        if (this.table.options.persistentLayout && this.table.extExists("persistence", true)) {

          this.table.extensions.persistence.save("columns");
        }

        if (!responsiveToggle && this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

          this.table.extensions.responsiveLayout.updateColumnVisibility(this, this.visible);
        }

        if (!silent) {

          this.table.options.columnVisibilityChanged(this.getComponent(), false);
        }
      }
    };

    Column.prototype.matchChildWidths = function () {

      var childWidth = 0;

      if (this.contentElement && this.columns.length) {

        this.columns.forEach(function (column) {

          childWidth += column.getWidth();
        });

        this.contentElement.css("max-width", childWidth - 1);
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

      this.element.css("width", width || "");

      if (!this.isGroup) {

        this.cells.forEach(function (cell) {

          cell.setWidth(width);
        });
      }

      if (this.parent.isGroup) {

        this.parent.matchChildWidths();
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

    Column.prototype.reinitializeWidth = function (force) {

      this.widthFixed = false;

      //set width if present

      if (typeof this.definition.width !== "undefined" && !force) {

        this.setWidth(this.definition.width);
      }

      //hide header filters to prevent them altering column width

      if (this.table.extExists("filter")) {

        this.table.extensions.filter.hideHeaderFilterElements();
      }

      this.fitToData();

      //show header filters again after layout is complete

      if (this.table.extExists("filter")) {

        this.table.extensions.filter.showHeaderFilterElements();
      }
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

    //return position of row in table

    RowManager.prototype.getRowPosition = function (row, active) {

      if (active) {

        return this.activeRows.indexOf(row);
      } else {

        return this.rows.indexOf(row);
      }
    };

    //link to column manager

    RowManager.prototype.setColumnManager = function (manager) {

      this.columnManager = manager;
    };

    RowManager.prototype.initialize = function () {

      var self = this;

      self.setRenderMode();

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

      if (this.renderMode === "virtual") {

        self.element.scroll(function () {

          var top = self.element[0].scrollTop;

          var dir = self.scrollTop > top;

          //handle verical scrolling

          if (self.scrollTop != top) {

            self.scrollTop = top;

            self.scrollVertical(dir);

            if (self.table.options.ajaxProgressiveLoad == "scroll") {

              self.table.extensions.ajax.nextPage(self.element[0].scrollHeight - self.element[0].clientHeight - top);
            }
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
      } else if (typeof subject == "undefined" || subject === null) {

        return false;
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

    RowManager.prototype.getRowFromPosition = function (position, active) {

      if (active) {

        return this.activeRows[position];
      } else {

        return this.rows[position];
      }
    };

    RowManager.prototype.scrollToRow = function (row, position, ifVisible) {

      var rowIndex = this.getDisplayRows().indexOf(row),
          offset = 0;

      if (rowIndex > -1) {

        if (typeof position === "undefined") {

          position = this.table.options.scrollToRowPosition;
        }

        if (typeof ifVisible === "undefined") {

          ifVisible = this.table.options.scrollToRowIfVisible;
        }

        if (position === "nearest") {

          switch (this.renderMode) {

            case "classic":

              position = Math.abs(this.element.scrollTop() - row.element.position().top) > Math.abs(this.element.scrollTop() + this.element[0].clientHeight - row.element.position().top) ? "bottom" : "top";

              break;

            case "virtual":

              position = Math.abs(this.vDomTop - rowIndex) > Math.abs(this.vDomBottom - rowIndex) ? "bottom" : "top";

              break;

          }
        }

        //check row visibility

        if (!ifVisible) {

          if (row.element.is(":visible")) {

            offset = row.element.offset().top - this.element.offset().top;

            if (offset > 0 && offset < this.element[0].clientHeight - row.element.outerHeight()) {

              return false;
            }
          }
        }

        //scroll to row

        switch (this.renderMode) {

          case "classic":

            this.element.scrollTop(row.element.offset().top - this.element.offset().top + this.element.scrollTop());

            break;

          case "virtual":

            this._virtualRenderFill(rowIndex, true);

            break;

        }

        //align to correct position

        switch (position) {

          case "middle":

          case "center":

            this.element.scrollTop(this.element.scrollTop() - this.element[0].clientHeight / 2);

            break;

          case "bottom":

            this.element.scrollTop(this.element.scrollTop() - this.element[0].clientHeight + row.getElement().outerHeight());

            break;

        }

        return true;
      } else {

        console.warn("Scroll Error - Row not visible");

        return false;
      }
    };

    ////////////////// Data Handling //////////////////


    RowManager.prototype.setData = function (data, renderInPosition) {

      var self = this;

      if (renderInPosition && this.getDisplayRows().length) {

        if (self.table.options.pagination) {

          self._setDataActual(data, true);
        } else {

          this.reRenderInPosition(function () {

            self._setDataActual(data);
          });
        }
      } else {

        this.resetScroll();

        this._setDataActual(data);
      }
    };

    RowManager.prototype._setDataActual = function (data, renderInPosition) {

      var self = this;

      self.table.options.dataLoading(data);

      self.rows.forEach(function (row) {

        row.wipe();
      });

      self.rows = [];

      if (this.table.options.history && this.table.extExists("history")) {

        this.table.extensions.history.clear();
      }

      if (Array.isArray(data)) {

        if (this.table.extExists("selectRow")) {

          this.table.extensions.selectRow.clearSelectionData();
        }

        data.forEach(function (def, i) {

          if (def && (typeof def === 'undefined' ? 'undefined' : _typeof(def)) === "object") {

            var row = new Row(def, self);

            self.rows.push(row);
          } else {

            console.warn("Data Loading Warning - Invalid row data detected and ignored, expecting object but receved:", def);
          }
        });

        self.table.options.dataLoaded(data);

        self.refreshActiveData(false, false, renderInPosition);
      } else {

        console.error("Data Loading Error - Unable to process data due to invalid data type \nExpecting: array \nReceived: ", typeof data === 'undefined' ? 'undefined' : _typeof(data), "\nData:     ", data);
      }
    };

    RowManager.prototype.deleteRow = function (row) {

      var allIndex = this.rows.indexOf(row),
          activeIndex = this.activeRows.indexOf(row);

      if (activeIndex > -1) {

        this.activeRows.splice(activeIndex, 1);
      }

      if (allIndex > -1) {

        this.rows.splice(allIndex, 1);
      }

      this.setActiveRows(this.activeRows);

      this.displayRowIterator(function (rows) {

        var displayIndex = rows.indexOf(row);

        if (displayIndex > -1) {

          rows.splice(displayIndex, 1);
        }
      });

      this.reRenderInPosition();

      this.table.options.rowDeleted(row.getComponent());

      this.table.options.dataEdited(this.getData());

      if (this.table.options.groupBy && this.table.extExists("groupRows")) {

        this.table.extensions.groupRows.updateGroupRows(true);
      } else if (this.table.options.pagination && this.table.extExists("page")) {

        this.refreshActiveData(false, false, true);
      } else {

        if (this.table.options.pagination && this.table.extExists("page")) {

          this.refreshActiveData("page");
        }
      }
    };

    RowManager.prototype.addRow = function (data, pos, index, blockRedraw) {

      var row = this.addRowActual(data, pos, index, blockRedraw);

      if (this.table.options.history && this.table.extExists("history")) {

        this.table.extensions.history.action("rowAdd", row, { data: data, pos: pos, index: index });
      };

      return row;
    };

    //add multiple rows

    RowManager.prototype.addRows = function (data, pos, index) {

      var self = this,
          length = 0,
          rows = [];

      pos = this.findAddRowPos(pos);

      if (!Array.isArray(data)) {

        data = [data];
      }

      length = data.length - 1;

      if (typeof index == "undefined" && pos || typeof index !== "undefined" && !pos) {

        data.reverse();
      }

      data.forEach(function (item, i) {

        var row = self.addRow(item, pos, index, true);

        rows.push(row);
      });

      if (this.table.options.groupBy && this.table.extExists("groupRows")) {

        this.table.extensions.groupRows.updateGroupRows(true);
      } else if (this.table.options.pagination && this.table.extExists("page")) {

        this.refreshActiveData(false, false, true);
      } else {

        this.reRenderInPosition();
      }

      //recalc column calculations if present

      if (this.table.extExists("columnCalcs")) {

        this.table.extensions.columnCalcs.recalc(this.table.rowManager.activeRows);
      }

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

    RowManager.prototype.addRowActual = function (data, pos, index, blockRedraw) {

      var row = new Row(data || {}, this),
          top = this.findAddRowPos(pos),
          dispRows;

      if (!index && this.table.options.pagination && this.table.options.paginationAddRow == "page") {

        dispRows = this.getDisplayRows();

        if (top) {

          if (dispRows.length) {

            index = dispRows[0];
          } else {

            if (this.activeRows.length) {

              index = this.activeRows[this.activeRows.length - 1];

              top = false;
            }
          }
        } else {

          if (dispRows.length) {

            index = dispRows[dispRows.length - 1];

            top = dispRows.length < this.table.extensions.page.getPageSize() ? false : true;
          }
        }
      }

      if (index) {

        index = this.findRow(index);
      }

      if (this.table.options.groupBy && this.table.extExists("groupRows")) {

        this.table.extensions.groupRows.assignRowToGroup(row);

        var groupRows = row.getGroup().rows;

        if (groupRows.length > 1) {

          if (!index || index && groupRows.indexOf(index) == -1) {

            if (top) {

              if (groupRows[0] !== row) {

                index = groupRows[0];

                this._moveRowInArray(row.getGroup().rows, row, index, top);
              }
            } else {

              if (groupRows[groupRows.length - 1] !== row) {

                index = groupRows[groupRows.length - 1];

                this._moveRowInArray(row.getGroup().rows, row, index, top);
              }
            }
          } else {

            this._moveRowInArray(row.getGroup().rows, row, index, top);
          }
        }
      };

      if (index) {

        var allIndex = this.rows.indexOf(index),
            activeIndex = this.activeRows.indexOf(index);

        this.displayRowIterator(function (rows) {

          var displayIndex = rows.indexOf(index);

          if (displayIndex > -1) {

            rows.splice(top ? displayIndex : displayIndex + 1, 0, row);
          }
        });

        if (activeIndex > -1) {

          this.activeRows.splice(top ? activeIndex : activeIndex + 1, 0, row);
        }

        if (allIndex > -1) {

          this.rows.splice(top ? allIndex : allIndex + 1, 0, row);
        }
      } else {

        if (top) {

          this.displayRowIterator(function (rows) {

            rows.unshift(row);
          });

          this.activeRows.unshift(row);

          this.rows.unshift(row);
        } else {

          this.displayRowIterator(function (rows) {

            rows.push(row);
          });

          this.activeRows.push(row);

          this.rows.push(row);
        }
      }

      this.setActiveRows(this.activeRows);

      this.table.options.rowAdded(row.getComponent());

      this.table.options.dataEdited(this.getData());

      if (!blockRedraw) {

        this.reRenderInPosition();
      }

      return row;
    };

    RowManager.prototype.moveRow = function (from, to, after) {

      if (this.table.options.history && this.table.extExists("history")) {

        this.table.extensions.history.action("rowMove", from, { pos: this.getRowPosition(from), to: to, after: after });
      };

      this.moveRowActual(from, to, after);

      this.table.options.rowMoved(from.getComponent());
    };

    RowManager.prototype.moveRowActual = function (from, to, after) {

      var self = this;

      this._moveRowInArray(this.rows, from, to, after);

      this._moveRowInArray(this.activeRows, from, to, after);

      this.displayRowIterator(function (rows) {

        self._moveRowInArray(rows, from, to, after);
      });

      if (this.table.options.groupBy && this.table.extExists("groupRows")) {

        var toGroup = to.getGroup();

        var fromGroup = from.getGroup();

        if (toGroup === fromGroup) {

          this._moveRowInArray(toGroup.rows, from, to, after);
        } else {

          if (fromGroup) {

            fromGroup.removeRow(from);
          }

          toGroup.insertRow(from, to, after);
        }
      }
    };

    RowManager.prototype._moveRowInArray = function (rows, from, to, after) {

      var fromIndex, toIndex, start, end;

      if (from !== to) {

        fromIndex = rows.indexOf(from);

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

        if (rows === this.getDisplayRows()) {

          start = fromIndex < toIndex ? fromIndex : toIndex;

          end = toIndex > fromIndex ? toIndex : fromIndex + 1;

          for (var i = start; i <= end; i++) {

            if (rows[i]) {

              this.styleRow(rows[i], i);
            }
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

      var index = this.getDisplayRows().indexOf(row);

      return index > -1 ? index : false;
    };

    RowManager.prototype.nextDisplayRow = function (row, rowOnly) {

      var index = this.getDisplayRowIndex(row),
          nextRow = false;

      if (index !== false && index < this.displayRowsCount - 1) {

        nextRow = this.getDisplayRows()[index + 1];
      }

      if (nextRow && (!(nextRow instanceof Row) || nextRow.type != "row")) {

        return this.nextDisplayRow(nextRow, rowOnly);
      }

      return nextRow;
    };

    RowManager.prototype.prevDisplayRow = function (row, rowOnly) {

      var index = this.getDisplayRowIndex(row),
          prevRow = false;

      if (index) {

        prevRow = this.getDisplayRows()[index - 1];
      }

      if (prevRow && (!(prevRow instanceof Row) || prevRow.type != "row")) {

        return this.prevDisplayRow(prevRow, rowOnly);
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

    RowManager.prototype.getData = function (active, transform) {

      var self = this,
          output = [];

      var rows = active ? self.activeRows : self.rows;

      rows.forEach(function (row) {

        output.push(row.getData(transform || "data"));
      });

      return output;
    };

    RowManager.prototype.getHtml = function (active) {

      var data = this.getData(active),
          columns = [],
          header = "",
          body = "",
          table = "";

      //build header row

      this.table.columnManager.getColumns().forEach(function (column) {

        var def = column.getDefinition();

        if (column.visible && !def.hideInHtml) {

          header += '<th>' + (def.title || "") + '</th>';

          columns.push(column);
        }
      });

      //build body rows

      data.forEach(function (rowData) {

        var row = "";

        columns.forEach(function (column) {

          var value = column.getFieldValue(rowData);

          if (typeof value === "undefined" || value === null) {

            value = ":";
          }

          row += '<td>' + value + '</td>';
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
          options = table.options,
          left = this.scrollLeft;

      if (options.ajaxFiltering) {

        if (options.pagination == "remote" && table.extExists("page")) {

          table.extensions.page.reset(true);

          table.extensions.page.setPage(1);
        } else {

          //assume data is url, make ajax call to url to get data

          this._genRemoteRequest();
        }
      } else {

        this.refreshActiveData("filter");
      }

      this.scrollHorizontal(left);
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

        this.refreshActiveData("sort");
      }

      this.scrollHorizontal(left);
    };

    RowManager.prototype.scrollHorizontal = function (left) {

      this.scrollLeft = left;

      this.element.scrollLeft(left);

      if (this.table.options.groupBy) {

        this.table.extensions.groupRows.scrollHeaders(left);
      }

      if (this.table.extExists("columnCalcs")) {

        this.table.extensions.columnCalcs.scrollHorizontal(left);
      }
    };

    //set active data set

    RowManager.prototype.refreshActiveData = function (stage, skipStage, renderInPosition) {

      var self = this,
          table = this.table,
          displayIndex;

      if (!stage) {

        stage = "all";
      }

      if (table.options.selectable && !table.options.selectablePersistence && table.extExists("selectRow")) {

        table.extensions.selectRow.deselectRows();
      }

      //cascade through data refresh stages

      switch (stage) {

        case "all":

        case "filter":

          if (!skipStage) {

            if (table.extExists("filter")) {

              self.setActiveRows(table.extensions.filter.filter(self.rows));
            } else {

              self.setActiveRows(self.rows.slice(0));
            }
          } else {

            skipStage = false;
          }

        case "sort":

          if (!skipStage) {

            if (table.extExists("sort")) {

              table.extensions.sort.sort();
            }
          } else {

            skipStage = false;
          }

        //generic stage to allow for pipeline trigger after the data manipulation stage

        case "display":

          this.resetDisplayRows();

        case "freeze":

          if (!skipStage) {

            if (this.table.extExists("frozenRows")) {

              if (table.extensions.frozenRows.isFrozen()) {

                if (!table.extensions.frozenRows.getDisplayIndex()) {

                  table.extensions.frozenRows.setDisplayIndex(this.getNextDisplayIndex());
                }

                displayIndex = table.extensions.frozenRows.getDisplayIndex();

                displayIndex = self.setDisplayRows(table.extensions.frozenRows.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

                if (displayIndex !== true) {

                  table.extensions.frozenRows.setDisplayIndex(displayIndex);
                }
              }
            }
          } else {

            skipStage = false;
          }

        case "group":

          if (!skipStage) {

            if (table.options.groupBy && table.extExists("groupRows")) {

              if (!table.extensions.groupRows.getDisplayIndex()) {

                table.extensions.groupRows.setDisplayIndex(this.getNextDisplayIndex());
              }

              displayIndex = table.extensions.groupRows.getDisplayIndex();

              displayIndex = self.setDisplayRows(table.extensions.groupRows.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

              if (displayIndex !== true) {

                table.extensions.groupRows.setDisplayIndex(displayIndex);
              }
            }
          } else {

            skipStage = false;
          }

          if (table.options.pagination && table.extExists("page") && !renderInPosition) {

            if (table.extensions.page.getMode() == "local") {

              table.extensions.page.reset();
            }
          }

        case "page":

          if (!skipStage) {

            if (table.options.pagination && table.extExists("page")) {

              if (!table.extensions.page.getDisplayIndex()) {

                table.extensions.page.setDisplayIndex(this.getNextDisplayIndex());
              }

              displayIndex = table.extensions.page.getDisplayIndex();

              if (table.extensions.page.getMode() == "local") {

                table.extensions.page.setMaxRows(this.getDisplayRows(displayIndex - 1).length);
              }

              displayIndex = self.setDisplayRows(table.extensions.page.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

              if (displayIndex !== true) {

                table.extensions.page.setDisplayIndex(displayIndex);
              }
            }
          } else {

            skipStage = false;
          }

      }

      if (self.element.is(":visible")) {

        if (renderInPosition) {

          self.reRenderInPosition();
        } else {

          self.renderTable();

          if (table.options.layoutColumnsOnNewData) {

            self.table.columnManager.redraw(true);
          }
        }
      }

      if (table.extExists("columnCalcs")) {

        table.extensions.columnCalcs.recalc(this.activeRows);
      }
    };

    RowManager.prototype.setActiveRows = function (activeRows) {

      this.activeRows = activeRows;

      this.activeRowsCount = this.activeRows.length;
    };

    //reset display rows array

    RowManager.prototype.resetDisplayRows = function () {

      this.displayRows = [];

      this.displayRows.push(this.activeRows.slice(0));

      this.displayRowsCount = this.displayRows[0].length;

      if (this.table.extExists("frozenRows")) {

        this.table.extensions.frozenRows.setDisplayIndex(0);
      }

      if (this.table.options.groupBy && this.table.extExists("groupRows")) {

        this.table.extensions.groupRows.setDisplayIndex(0);
      }

      if (this.table.options.pagination && this.table.extExists("page")) {

        this.table.extensions.page.setDisplayIndex(0);
      }
    };

    RowManager.prototype.getNextDisplayIndex = function () {

      return this.displayRows.length;
    };

    //set display row pipeline data

    RowManager.prototype.setDisplayRows = function (displayRows, index) {

      var output = true;

      if (index && typeof this.displayRows[index] != "undefined") {

        this.displayRows[index] = displayRows;

        output = true;
      } else {

        this.displayRows.push(displayRows);

        output = index = this.displayRows.length - 1;
      }

      if (index == this.displayRows.length - 1) {

        this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length;
      }

      return output;
    };

    RowManager.prototype.getDisplayRows = function (index) {

      if (typeof index == "undefined") {

        return this.displayRows.length ? this.displayRows[this.displayRows.length - 1] : [];
      } else {

        return this.displayRows[index] || [];
      }
    };

    //repeat action accross display rows

    RowManager.prototype.displayRowIterator = function (callback) {

      this.displayRows.forEach(callback);

      this.displayRowsCount = this.displayRows[this.displayRows.length - 1].length;
    };

    //return only actual rows (not group headers etc)

    RowManager.prototype.getRows = function () {

      return this.rows;
    };

    ///////////////// Table Rendering /////////////////


    //trigger rerender of table in current position

    RowManager.prototype.reRenderInPosition = function (callback) {

      if (this.getRenderMode() == "virtual") {

        var scrollTop = this.element.scrollTop();

        var topRow = false;

        var topOffset = false;

        var left = this.scrollLeft;

        var rows = this.getDisplayRows();

        for (var i = this.vDomTop; i <= this.vDomBottom; i++) {

          if (rows[i]) {

            var diff = scrollTop - rows[i].getElement().position().top;

            if (topOffset === false || Math.abs(diff) < topOffset) {

              topOffset = diff;

              topRow = i;
            } else {

              break;
            }
          }
        }

        if (callback) {

          callback();
        }

        this._virtualRenderFill(topRow === false ? this.displayRowsCount - 1 : topRow, true, topOffset || 0);

        this.scrollHorizontal(left);
      } else {

        this.renderTable();
      }
    };

    RowManager.prototype.setRenderMode = function () {

      if ((this.table.element.innerHeight() || this.table.options.height) && this.table.options.virtualDom) {

        this.renderMode = "virtual";
      } else {

        this.renderMode = "classic";
      }
    };

    RowManager.prototype.getRenderMode = function () {

      return this.renderMode;
    };

    RowManager.prototype.renderTable = function () {

      var self = this;

      self.table.options.renderStarted();

      self.element.scrollTop(0);

      switch (self.renderMode) {

        case "classic":

          self._simpleRender();

          break;

        case "virtual":

          self._virtualRenderFill();

          break;

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

          if (this.renderMode) {

            self.table.options.placeholder.attr("tabulator-render-mode", this.renderMode);
          }

          self.getElement().append(self.table.options.placeholder);
        }
      }

      self.table.options.renderComplete();
    };

    //simple render on heightless table

    RowManager.prototype._simpleRender = function () {

      var self = this,
          element = this.tableElement;

      self._clearVirtualDom();

      if (self.displayRowsCount) {

        var onlyGroupHeaders = true;

        self.getDisplayRows().forEach(function (row, index) {

          self.styleRow(row, index);

          element.append(row.getElement());

          row.initialize(true);

          if (row.type !== "group") {

            onlyGroupHeaders = false;
          }
        });

        if (onlyGroupHeaders) {

          self.tableElement.css({

            "min-width": self.table.columnManager.getWidth()

          });
        }
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

    RowManager.prototype._virtualRenderFill = function (position, forceMove, offset) {

      var self = this,
          element = self.tableElement,
          holder = self.element,
          topPad = 0,
          rowsHeight = 0,
          topPadHeight = 0,
          i = 0,
          rows = self.getDisplayRows();

      position = position || 0;

      offset = offset || 0;

      if (!position) {

        self._clearVirtualDom();
      } else {

        element.children().detach();

        //check if position is too close to bottom of table

        var heightOccpied = (self.displayRowsCount - position + 1) * self.vDomRowHeight;

        if (heightOccpied < self.height) {

          position -= Math.ceil((self.height - heightOccpied) / self.vDomRowHeight);

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
              row = rows[index];

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

          self.vDomTopPad = !forceMove ? self.scrollTop - topPadHeight : self.vDomRowHeight * this.vDomTop + offset;

          self.vDomBottomPad = self.vDomBottom == self.displayRowsCount - 1 ? 0 : Math.max(self.vDomScrollHeight - self.vDomTopPad - rowsHeight - topPadHeight, 0);
        }

        element[0].style.paddingTop = self.vDomTopPad + "px";

        element[0].style.paddingBottom = self.vDomBottomPad + "px";

        if (forceMove) {

          this.scrollTop = self.vDomTopPad + topPadHeight + offset;
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

        var left = this.scrollLeft;

        this._virtualRenderFill(Math.floor(this.element[0].scrollTop / this.element[0].scrollHeight * this.displayRowsCount));

        this.scrollHorizontal(left);
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


      var table = this.tableElement,
          rows = this.getDisplayRows();

      if (this.vDomTop) {

        var index = this.vDomTop - 1,
            topRow = rows[index],
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

            this.vDomTopPad = index * this.vDomRowHeight;
          }

          if (!index) {

            this.vDomTopPad = 0;
          }

          table[0].style.paddingTop = this.vDomTopPad + "px";

          this.vDomScrollPosTop -= topRowHeight;

          this.vDomTop--;
        }

        topDiff = -(this.scrollTop - this.vDomScrollPosTop);

        if (i < this.vDomMaxRenderChain && this.vDomTop && topDiff >= (rows[this.vDomTop - 1].getHeight() || this.vDomRowHeight)) {

          this._addTopRow(topDiff, i + 1);
        } else {

          this._quickNormalizeRowHeight(this.vDomTopNewRows);
        }
      }
    };

    RowManager.prototype._removeTopRow = function (topDiff) {

      var table = this.tableElement,
          topRow = this.getDisplayRows()[this.vDomTop],
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


      var table = this.tableElement,
          rows = this.getDisplayRows();

      if (this.vDomBottom < this.displayRowsCount - 1) {

        var index = this.vDomBottom + 1,
            bottomRow = rows[index],
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

        if (i < this.vDomMaxRenderChain && this.vDomBottom < this.displayRowsCount - 1 && bottomDiff >= (rows[this.vDomBottom + 1].getHeight() || this.vDomRowHeight)) {

          this._addBottomRow(bottomDiff, i + 1);
        } else {

          this._quickNormalizeRowHeight(this.vDomBottomNewRows);
        }
      }
    };

    RowManager.prototype._removeBottomRow = function (bottomDiff) {

      var table = this.tableElement,
          bottomRow = this.getDisplayRows()[this.vDomBottom],
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

      self.activeRows.forEach(function (row) {

        row.normalizeHeight();
      });
    };

    //adjust the height of the table holder to fit in the Tabulator element

    RowManager.prototype.adjustTableSize = function () {

      var self = this;

      if (this.renderMode === "virtual") {

        self.height = self.element.innerHeight();

        self.vDomWindowBuffer = self.table.options.virtualDomBuffer || self.height;

        var otherHeight = self.columnManager.getElement().outerHeight() + (self.table.footerManager ? self.table.footerManager.getElement().outerHeight() : 0);

        self.element.css({

          "min-height": "calc(100% - " + otherHeight + "px)",

          "height": "calc(100% - " + otherHeight + "px)",

          "max-height": "calc(100% - " + otherHeight + "px)"

        });
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

      var pos = 0,
          left = this.scrollLeft;

      this.adjustTableSize();

      if (!force) {

        if (self.renderMode == "classic") {

          if (self.table.options.groupBy) {

            self.refreshActiveData("group", false, false);
          } else {

            this._simpleRender();
          }
        } else {

          this.reRenderInPosition();

          this.scrollHorizontal(left);
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

    RowComponent.prototype.getData = function (transform) {

      return this.row.getData(transform);
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

      return this.row.getData("data")[this.row.table.options.index];
    };

    RowComponent.prototype.getPosition = function (active) {

      return this.row.table.rowManager.getRowPosition(this.row, active);
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

      this.row.table.extensions.selectRow.selectRows(this.row);
    };

    RowComponent.prototype.deselect = function () {

      this.row.table.extensions.selectRow.deselectRows(this.row);
    };

    RowComponent.prototype.toggleSelect = function () {

      this.row.table.extensions.selectRow.toggleRow(this.row);
    };

    RowComponent.prototype._getSelf = function () {

      return this.row;
    };

    RowComponent.prototype.freeze = function () {

      if (this.row.table.extExists("frozenRows", true)) {

        this.row.table.extensions.frozenRows.freezeRow(this.row);
      }
    };

    RowComponent.prototype.unfreeze = function () {

      if (this.row.table.extExists("frozenRows", true)) {

        this.row.table.extensions.frozenRows.unfreezeRow(this.row);
      }
    };

    RowComponent.prototype.reformat = function () {

      return this.row.reinitialize();
    };

    RowComponent.prototype.getGroup = function () {

      return this.row.getGroup().getComponent();
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

        //setup movable rows

        if (self.table.options.responsiveLayout === "collapse" && self.table.extExists("responsiveLayout")) {

          self.table.extensions.responsiveLayout.layoutRow(this);
        }

        if (self.table.options.rowFormatter) {

          self.table.options.rowFormatter(self.getComponent());
        }

        //set resizable handles

        if (self.table.options.resizableRows && self.table.extExists("resizeRows")) {

          self.table.extensions.resizeRows.initializeRow(self);
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

      var maxHeight = 0,
          minHeight = this.element[0].clientHeight;

      this.cells.forEach(function (cell) {

        var height = cell.getHeight();

        if (height > maxHeight) {

          maxHeight = height;
        }
      });

      this.height = Math.max(maxHeight, minHeight);

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

    Row.prototype.setHeight = function (height) {

      this.height = height;

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

        self.data = self.table.extensions.mutator.transformRow(data, "data");
      } else {

        self.data = data;
      }
    };

    //update the rows data

    Row.prototype.updateData = function (data) {

      var self = this;

      if (typeof data === "string") {

        data = JSON.parse(data);
      }

      //mutate incomming data if needed

      if (self.table.extExists("mutator")) {

        data = self.table.extensions.mutator.transformRow(data, "data");
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

          return self.table.extensions.accessor.transformRow(self.data, transform);
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

      var index = this.table.rowManager.getRowIndex(this);

      //deselect row if it is selected

      if (this.table.extExists("selectRow")) {

        this.table.extensions.selectRow._deselectRow(this.row, true);
      }

      this.table.rowManager.deleteRow(this);

      this.deleteCells();

      //remove from group

      if (this.extensions.group) {

        this.extensions.group.removeRow(this);
      }

      //recalc column calculations if present

      if (this.table.extExists("columnCalcs")) {

        if (this.table.options.groupBy && this.table.extExists("groupRows")) {

          this.table.extensions.columnCalcs.recalcRowGroup(this);
        } else {

          this.table.extensions.columnCalcs.recalc(this.table.rowManager.activeRows);
        }
      }
    };

    Row.prototype.deleteCells = function () {

      var cellCount = this.cells.length;

      for (var i = 0; i < cellCount; i++) {

        this.cells[0].delete();
      }
    };

    Row.prototype.wipe = function () {

      this.deleteCells();

      this.element.children().each(function () {

        $(this).remove();
      });

      this.element.empty();

      this.element.remove();
    };

    Row.prototype.getGroup = function () {

      return this.extensions.group || false;
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

    CellComponent.prototype.edit = function (force) {

      return this.cell.edit(force);
    };

    CellComponent.prototype.cancelEdit = function () {

      this.cell.cancelEdit(force);
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

      if (cellEvents.cellClick || self.table.options.cellClick) {

        self.element.on("click", function (e) {

          var component = self.getComponent();

          if (cellEvents.cellClick) {

            cellEvents.cellClick(e, component);
          }

          if (self.table.options.cellClick) {

            self.table.options.cellClick(e, component);
          }
        });
      }

      if (cellEvents.cellDblClick || this.table.options.cellDblClick) {

        self.element.on("dblclick", function (e) {

          var component = self.getComponent();

          if (cellEvents.cellDblClick) {

            cellEvents.cellDblClick(e, component);
          }

          if (self.table.options.cellDblClick) {

            self.table.options.cellDblClick(e, component);
          }
        });
      }

      if (cellEvents.cellContext || this.table.options.cellContext) {

        self.element.on("contextmenu", function (e) {

          var component = self.getComponent();

          if (cellEvents.cellContext) {

            cellEvents.cellContext(e, component);
          }

          if (self.table.options.cellContext) {

            self.table.options.cellContext(e, component);
          }
        });
      }

      if (this.table.options.tooltipGenerationMode === "hover") {

        //update tooltip on mouse enter

        self.element.on("mouseenter", function (e) {

          self._generateTooltip();
        });
      }

      if (cellEvents.cellTap || this.table.options.cellTap) {

        tap = false;

        self.element.on("touchstart", function (e) {

          tap = true;
        });

        self.element.on("touchend", function (e) {

          if (tap) {

            var component = self.getComponent();

            if (cellEvents.cellTap) {

              cellEvents.cellTap(e, component);
            }

            if (self.table.options.cellTap) {

              self.table.options.cellTap(e, component);
            }
          }

          tap = false;
        });
      }

      if (cellEvents.cellDblTap || this.table.options.cellDblTap) {

        dblTap = null;

        self.element.on("touchend", function (e) {

          if (dblTap) {

            clearTimeout(dblTap);

            dblTap = null;

            var component = self.getComponent();

            if (cellEvents.cellDblTap) {

              cellEvents.cellDblTap(e, component);
            }

            if (self.table.options.cellDblTap) {

              self.table.options.cellDblTap(e, component);
            }
          } else {

            dblTap = setTimeout(function () {

              clearTimeout(dblTap);

              dblTap = null;
            }, 300);
          }
        });
      }

      if (cellEvents.cellTapHold || this.table.options.cellTapHold) {

        tapHold = null;

        self.element.on("touchstart", function (e) {

          clearTimeout(tapHold);

          tapHold = setTimeout(function () {

            clearTimeout(tapHold);

            tapHold = null;

            tap = false;

            var component = self.getComponent();

            if (cellEvents.cellTapHold) {

              cellEvents.cellTapHold(e, component);
            }

            if (self.table.options.cellTapHold) {

              self.table.options.cellTapHold(e, component);
            }
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

          if (tooltip === false) {

            tooltip = "";
          }
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

      var changed = this.setValueProcessData(value, mutate),
          component;

      if (changed) {

        if (this.table.options.history && this.table.extExists("history")) {

          this.table.extensions.history.action("cellEdit", this, { oldValue: this.oldValue, newValue: this.value });
        };

        component = this.getComponent();

        if (this.column.cellEvents.cellEdited) {

          this.column.cellEvents.cellEdited(component);
        }

        this.table.options.cellEdited(component);

        this.table.options.dataEdited(this.table.rowManager.getData());
      }

      if (this.table.extExists("columnCalcs")) {

        if (this.column.definition.topCalc || this.column.definition.bottomCalc) {

          if (this.table.options.groupBy && this.table.extExists("groupRows")) {

            this.table.extensions.columnCalcs.recalcRowGroup(this.row);
          } else {

            this.table.extensions.columnCalcs.recalc(this.table.rowManager.activeRows);
          }
        }
      }
    };

    Cell.prototype.setValueProcessData = function (value, mutate) {

      var changed = false;

      if (this.value != value) {

        changed = true;

        if (mutate) {

          if (this.column.extensions.mutate) {

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

    Cell.prototype.edit = function (force) {

      if (this.table.extExists("edit", true)) {

        return this.table.extensions.edit.editCell(this, false, force);
      }
    };

    Cell.prototype.cancelEdit = function () {

      if (this.table.extExists("edit", true)) {

        var editing = this.table.extensions.edit.getCurrentCell();

        if (editing && editing._getSelf() === this) {

          this.table.extensions.edit.cancelEdit();
        } else {

          console.warn("Cancel Editor Error - This cell is not currently being edited ");
        }
      }
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

            nextRow = self.table.rowManager.nextDisplayRow(self.row, true);

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

            prevRow = self.table.rowManager.prevDisplayRow(self.row, true);

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

          var nextRow = self.table.rowManager.prevDisplayRow(self.row, true);

          if (nextRow) {

            nextRow.cells[index].edit();
          }
        },

        down: function down() {

          var nextRow = self.table.rowManager.nextDisplayRow(self.row, true);

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

    FooterManager.prototype.remove = function (element) {

      element.remove();

      this.deactivate();
    };

    FooterManager.prototype.deactivate = function (force) {

      if (this.element.is(":empty") || force) {

        this.element.remove();

        this.active = false;
      }

      // this.table.rowManager.adjustTableSize();
    };

    FooterManager.prototype.activate = function (parent) {

      if (!this.active) {

        this.active = true;

        this.table.element.append(this.getElement());

        this.table.element.show();
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

        layoutColumnsOnNewData: false, //update column widths on setData

        fitColumns: false, //DEPRICATED - fit colums to width of screen;


        columnMinWidth: 40, //minimum global width for a column

        columnVertAlign: "top", //vertical alignment of column headers


        resizableColumns: true, //resizable columns

        resizableRows: false, //resizable rows

        autoResize: true, //auto resize table


        columns: [], //store for colum header info


        data: [], //default starting data


        tooltips: false, //Tool tip value

        tooltipsHeader: false, //Tool tip for headers

        tooltipGenerationMode: "load", //when to generate tooltips


        initialSort: false, //initial sorting criteria


        footerElement: false, //hold footer element


        index: "id", //filed for row index


        keybindings: [], //array for keybindings


        clipboard: false, //enable clipboard

        clipboardCopySelector: "active", //method of chosing which data is coppied to the clipboard

        clipboardCopyFormatter: "table", //convert data to a clipboard string

        clipboardCopyHeader: true, //include table headers in copt

        clipboardPasteParser: "table", //convert pasted clipboard data to rows

        clipboardPasteAction: "insert", //how to insert pasted data into the table


        clipboardCopied: function clipboardCopied() {}, //data has been copied to the clipboard

        clipboardPasted: function clipboardPasted() {}, //data has been pasted into the table

        clipboardPasteError: function clipboardPasteError() {}, //data has not successfully been pasted into the table


        downloadDataFormatter: false, //function to manipulate table data before it is downloaded

        downloadReady: function downloadReady(data, blob) {
          return blob;
        }, //function to manipulate download data

        downloadComplete: false, //function to manipulate download data


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


        persistentLayout: false, //store column layout in memory

        persistentSort: false, //store sorting in memory

        persistentFilter: false, //store filters in memory

        persistenceID: "", //key for persistent storage

        persistenceMode: true, //mode for storing persistence information

        persistentLayoutID: "", //DEPRICATED - key for persistent storage;


        responsiveLayout: false, //responsive layout flags

        responsiveLayoutCollapseStartOpen: true, //start showing collapsed data

        responsiveLayoutCollapseUseFormatters: true, //responsive layout collapse formatter

        responsiveLayoutCollapseFormatter: false, //responsive layout collapse formatter


        pagination: false, //set pagination type

        paginationSize: false, //set number of rows to a page

        paginationButtonCount: 5, // set count of page button

        paginationElement: false, //element to hold pagination numbers

        paginationDataSent: {}, //pagination data sent to the server

        paginationDataReceived: {}, //pagination data received from the server

        paginator: false, //pagination url string builder

        paginationAddRow: "page", //add rows on table or page


        ajaxURL: false, //url for ajax loading

        ajaxParams: {}, //params for ajax loading

        ajaxConfig: "get", //ajax request type

        ajaxLoader: true, //show loader

        ajaxLoaderLoading: false, //loader element

        ajaxLoaderError: false, //loader element

        ajaxFiltering: false,

        ajaxSorting: false,

        ajaxProgressiveLoad: false, //progressive loading

        ajaxProgressiveLoadDelay: 0, //delay between requests

        ajaxProgressiveLoadScrollMargin: 0, //margin before scroll begins


        groupBy: false, //enable table grouping and set field to group by

        groupStartOpen: true, //starting state of group


        groupHeader: false, //header generation function


        movableColumns: false, //enable movable columns


        movableRows: false, //enable movable rows

        movableRowsConnectedTables: false, //tables for movable rows to be connected to

        movableRowsSender: false,

        movableRowsReceiver: "insert",

        movableRowsSendingStart: function movableRowsSendingStart() {},

        movableRowsSent: function movableRowsSent() {},

        movableRowsSentFailed: function movableRowsSentFailed() {},

        movableRowsSendingStop: function movableRowsSendingStop() {},

        movableRowsReceivingStart: function movableRowsReceivingStart() {},

        movableRowsReceived: function movableRowsReceived() {},

        movableRowsReceivedFailed: function movableRowsReceivedFailed() {},

        movableRowsReceivingStop: function movableRowsReceivingStop() {},

        scrollToRowPosition: "top",

        scrollToRowIfVisible: true,

        scrollToColumnPosition: "left",

        scrollToColumnIfVisible: true,

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

        rowResized: function rowResized() {},

        //cell callbacks

        //row callbacks

        cellClick: false,

        cellDblClick: false,

        cellContext: false,

        cellTap: false,

        cellDblTap: false,

        cellTapHold: false,

        cellEditing: function cellEditing() {},

        cellEdited: function cellEdited() {},

        cellEditCancelled: function cellEditCancelled() {},

        //column callbacks

        columnMoved: false,

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

        columnCalcs: true,

        //pagination callbacks

        pageLoaded: function pageLoaded() {},

        //localization callbacks

        localized: function localized() {},

        //validation has failed

        validationFailed: function validationFailed() {},

        //history callbacks

        historyUndo: function historyUndo() {},

        historyRedo: function historyRedo() {}

      },

      //convert depricated functionality to new functions

      _mapDepricatedFunctionality: function _mapDepricatedFunctionality() {

        if (this.options.fitColumns) {

          this.options.layout = "fitColumns";

          console.warn("The%c fitColumns:true%c option has been depricated and will be removed in version 4.0, use %c layout:'fitColumns'%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");
        }

        if (this.options.persistentLayoutID) {

          this.options.persistenceID = this.options.persistentLayoutID;

          console.warn("The%c persistentLayoutID%c option has been depricated and will be removed in version 4.0, use %c persistenceID%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");
        }

        if (this.options.persistentLayout === "cookie" || this.options.persistentLayout === "local") {

          this.options.persistenceMode = this.options.persistentLayout;

          this.options.persistentLayout = true;

          console.warn("Setting the persistent storage mode on the%c persistentLayout%c option has been depricated and will be removed in version 4.0, use %c persistenceMode%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");
        }

        if (this.options.downloadDataMutator) {

          this.options.downloadDataFormatter = this.options.downloadDataMutator;

          console.warn("The%c downloadDataMutator%c option has been depricated and will be removed in version 4.0, use %cdownloadDataFormatter%c instead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");
        }
      },

      //constructor

      _create: function _create() {

        var self = this,
            element = this.element;

        self._clearObjectPointers();

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

          //load initial data set

          this._loadInitialData();
        }
      },

      //clear pointers to objects in default config object


      _clearObjectPointers: function _clearObjectPointers() {

        this.options.columns = this.options.columns.slice(0);

        this.options.data = this.options.data.slice(0);
      },

      //build tabulator element

      _buildElement: function _buildElement() {

        var element = this.element,
            ext = this.extensions,
            options = this.options;

        options.tableBuilding();

        element.addClass("tabulator").attr("role", "grid").empty();

        //set table height

        if (options.height) {

          options.height = isNaN(options.height) ? options.height : options.height + "px";

          this.element.css({ "height": options.height });
        }

        this.rowManager.initialize();

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

        //build table elements

        element.append(this.columnManager.getElement());

        element.append(this.rowManager.getElement());

        if (options.footerElement) {

          this.footerManager.activate();
        }

        if ((options.persistentLayout || options.persistentSort || options.persistentFilter) && this.extExists("persistence", true)) {

          ext.persistence.initialize(options.persistenceMode, options.persistenceID);
        }

        if (options.persistentLayout && this.extExists("persistence", true)) {

          options.columns = ext.persistence.load("columns", options.columns);
        }

        if (options.movableRows && this.extExists("moveRow")) {

          ext.moveRow.initialize();
        }

        if (this.extExists("columnCalcs")) {

          ext.columnCalcs.initialize();
        }

        this.columnManager.setColumns(options.columns);

        if (this.extExists("frozenRows")) {

          this.extensions.frozenRows.initialize();
        }

        if ((options.persistentSort || options.initialSort) && this.extExists("sort", true)) {

          var sorters = [];

          if (options.persistentSort && this.extExists("persistence", true)) {

            sorters = ext.persistence.load("sort");

            if (sorters === false && options.initialSort) {

              sorters = options.initialSort;
            }
          } else if (options.initialSort) {

            sorters = options.initialSort;
          }

          ext.sort.setSort(sorters);
        }

        if (options.persistentFilter && this.extExists("persistence", true)) {

          var filters = ext.persistence.load("filter");

          if (filters !== false) {

            this.setFilter(filters);
          }
        }

        if (this.extExists("ajax")) {

          ext.ajax.initialize();
        }

        if (options.pagination && this.extExists("page", true)) {

          ext.page.initialize();
        }

        if (options.groupBy && this.extExists("groupRows", true)) {

          ext.groupRows.initialize();
        }

        if (this.extExists("keybindings")) {

          ext.keybindings.initialize();
        }

        if (this.extExists("selectRow")) {

          ext.selectRow.clearSelectionData(true);
        }

        if (options.autoResize && this.extExists("resizeTable")) {

          ext.resizeTable.initialize();
        }

        if (this.extExists("clipboard")) {

          ext.clipboard.initialize();
        }

        options.tableBuilt();
      },

      _loadInitialData: function _loadInitialData() {

        var self = this;

        if (self.options.pagination && self.extExists("page")) {

          self.extensions.page.reset(true);

          if (self.options.pagination == "local") {

            if (self.options.data.length) {

              self.rowManager.setData(self.options.data);
            } else {

              if (self.options.ajaxURL && self.extExists("ajax")) {

                self.extensions.ajax.loadData();
              } else {

                self.rowManager.setData(self.options.data);
              }
            }
          } else {

            self.extensions.page.setPage(1);
          }
        } else {

          if (self.options.data.length) {

            self.rowManager.setData(self.options.data);
          } else {

            if (self.options.ajaxURL && self.extExists("ajax")) {

              self.extensions.ajax.loadData();
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

        //clear row data

        this.rowManager.rows.forEach(function (row) {

          row.wipe();
        });

        this.rowManager.rows = [];

        this.rowManager.activeRows = [];

        this.rowManager.displayRows = [];

        //clear event bindings

        if (this.options.autoResize && this.extExists("resizeTable")) {

          this.extensions.resizeTable.clearBindings();
        }

        if (this.extExists("keybindings")) {

          this.extensions.keybindings.clearBindings();
        }

        //clear DOM

        element.empty();

        element.removeClass("tabulator");
      },

      _detectBrowser: function _detectBrowser() {

        var ua = navigator.userAgent;

        if (ua.indexOf("Trident") > -1) {

          this.browser = "ie";

          this.browserSlow = true;
        } else if (ua.indexOf("Edge") > -1) {

          this.browser = "edge";

          this.browserSlow = true;
        } else if (ua.indexOf("Firefox") > -1) {

          this.browser = "firefox";

          this.browserSlow = false;
        } else {

          this.browser = "other";

          this.browserSlow = false;
        }
      },


      ////////////////// Data Handling //////////////////


      //load data


      setData: function setData(data, params, config) {

        if (this.extExists("ajax")) {

          this.extensions.ajax.blockActiveRequest();
        }

        this._setData(data, params, config);
      },

      _setData: function _setData(data, params, config, inPosition) {

        var self = this;

        if (typeof data === "string") {

          if (data.indexOf("{") == 0 || data.indexOf("[") == 0) {

            //data is a json encoded string

            self.rowManager.setData(JSON.parse(data), inPosition);
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

                self.extensions.ajax.loadData(inPosition);
              }
            }
          }
        } else {

          if (data) {

            //asume data is already an object

            self.rowManager.setData(data, inPosition);
          } else {

            //no data provided, check if ajaxURL is present;

            if (self.extExists("ajax") && self.extensions.ajax.getUrl) {

              if (self.options.pagination == "remote" && self.extExists("page", true)) {

                self.extensions.page.reset(true);

                self.extensions.page.setPage(1);
              } else {

                self.extensions.ajax.loadData(inPosition);
              }
            } else {

              //empty data

              self.rowManager.setData([], inPosition);
            }
          }
        }
      },

      //clear data

      clearData: function clearData() {

        if (this.extExists("ajax")) {

          this.extensions.ajax.blockActiveRequest();
        }

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

      //replace data, keeping table in position with same sort

      replaceData: function replaceData(data, params, config) {

        if (this.extExists("ajax")) {

          this.extensions.ajax.blockActiveRequest();
        }

        this._setData(data, params, config, true);
      },

      //update table data

      updateData: function updateData(data) {

        var self = this;

        if (this.extExists("ajax")) {

          this.extensions.ajax.blockActiveRequest();
        }

        if (typeof data === "string") {

          data = JSON.parse(data);
        }

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

        var rows = [],
            output = [];

        if (this.extExists("ajax")) {

          this.extensions.ajax.blockActiveRequest();
        }

        if (typeof data === "string") {

          data = JSON.parse(data);
        }

        if (data) {

          rows = this.rowManager.addRows(data, pos, index);

          rows.forEach(function (row) {

            output.push(row.getComponent());
          });

          return output;
        } else {

          console.warn("Update Error - No data provided");
        }
      },

      //update table data

      updateOrAddData: function updateOrAddData(data) {

        var self = this;

        var rows = [];

        if (this.extExists("ajax")) {

          this.extensions.ajax.blockActiveRequest();
        }

        if (typeof data === "string") {

          data = JSON.parse(data);
        }

        if (data) {

          data.forEach(function (item) {

            var row = self.rowManager.findRow(item[self.options.index]);

            if (row) {

              row.updateData(item);

              rows.push(row.getComponent());
            } else {

              rows.push(self.rowManager.addRows(item)[0].getComponent());
            }
          });

          return rows;
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

      //get row object

      getRowFromPosition: function getRowFromPosition(position, active) {

        var row = this.rowManager.getRowFromPosition(position, active);

        if (row) {

          return row.getComponent();
        } else {

          console.warn("Find Error - No matching row found:", position);

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

        var row;

        if (typeof data === "string") {

          data = JSON.parse(data);
        }

        row = this.rowManager.addRows(data, pos, index)[0];

        //recalc column calculations if present

        if (this.extExists("columnCalcs")) {

          this.extensions.columnCalcs.recalc(this.rowManager.activeRows);
        }

        return row.getComponent();
      },

      //update a row if it exitsts otherwise create it

      updateOrAddRow: function updateOrAddRow(index, data) {

        var row = this.rowManager.findRow(index);

        if (typeof data === "string") {

          data = JSON.parse(data);
        }

        if (row) {

          row.updateData(data);
        } else {

          row = this.rowManager.addRows(data)[0];

          //recalc column calculations if present

          if (this.extExists("columnCalcs")) {

            this.extensions.columnCalcs.recalc(this.rowManager.activeRows);
          }
        }

        return row.getComponent();
      },

      //update row data

      updateRow: function updateRow(index, data) {

        var row = this.rowManager.findRow(index);

        if (typeof data === "string") {

          data = JSON.parse(data);
        }

        if (row) {

          row.updateData(data);

          return row.getComponent();
        } else {

          console.warn("Update Error - No matching row found:", index);

          return false;
        }
      },

      //scroll to row in DOM

      scrollToRow: function scrollToRow(index, position, ifVisible) {

        var row = this.rowManager.findRow(index);

        if (row) {

          return this.rowManager.scrollToRow(row, position, ifVisible);
        } else {

          console.warn("Scroll Error - No matching row found:", index);

          return false;
        }
      },

      getRows: function getRows(active) {

        return this.rowManager.getComponents(active);
      },

      //get position of row in table

      getRowPosition: function getRowPosition(index, active) {

        var row = this.rowManager.findRow(index);

        if (row) {

          return this.rowManager.getRowPosition(row, active);
        } else {

          console.warn("Position Error - No matching row found:", index);

          return false;
        }
      },

      //copy table data to clipboard

      copyToClipboard: function copyToClipboard(selector, selectorParams, formatter, formatterParams) {

        if (this.extExists("clipboard", true)) {

          this.extensions.clipboard.copy(selector, selectorParams, formatter, formatterParams);
        }
      },

      /////////////// Column Functions  ///////////////


      setColumns: function setColumns(definition) {

        this.columnManager.setColumns(definition);
      },

      getColumns: function getColumns(structured) {

        return this.columnManager.getComponents(structured);
      },

      getColumnDefinitions: function getColumnDefinitions() {

        return this.columnManager.getDefinitionTree();
      },

      getColumnLayout: function getColumnLayout() {

        if (this.extExists("persistence", true)) {

          return this.extensions.persistence.parseColumns(this.columnManager.getColumns());
        }
      },

      setColumnLayout: function setColumnLayout(layout) {

        if (this.extExists("persistence", true)) {

          this.columnManager.setColumns(this.extensions.persistence.mergeDefinition(this.options.columns, layout));

          return true;
        }

        return false;
      },

      showColumn: function showColumn(field) {

        var column = this.columnManager.findColumn(field);

        if (column) {

          column.show();

          if (this.options.responsiveLayout && this.extExists("responsiveLayout", true)) {

            this.extensions.responsiveLayout.update();
          }
        } else {

          console.warn("Column Show Error - No matching column found:", field);

          return false;
        }
      },

      hideColumn: function hideColumn(field) {

        var column = this.columnManager.findColumn(field);

        if (column) {

          column.hide();

          if (this.options.responsiveLayout && this.extExists("responsiveLayout", true)) {

            this.extensions.responsiveLayout.update();
          }
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

      //scroll to column in DOM

      scrollToColumn: function scrollToColumn(field, position, ifVisible) {

        var column = this.columnManager.findColumn(field);

        if (column) {

          return this.columnManager.scrollToColumn(column, position, ifVisible);
        } else {

          console.warn("Scroll Error - No matching column found:", field);

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

      setHeaderFilterFocus: function setHeaderFilterFocus(field) {

        if (this.extExists("filter", true)) {

          var column = this.columnManager.findColumn(field);

          if (column) {

            this.extensions.filter.setHeaderFilterFocus(column);
          } else {

            console.warn("Column Filter Focus Error - No matching column found:", field);

            return false;
          }
        }
      },

      setHeaderFilterValue: function setHeaderFilterValue(field, value) {

        if (this.extExists("filter", true)) {

          var column = this.columnManager.findColumn(field);

          if (column) {

            this.extensions.filter.setHeaderFilterValue(column, value);
          } else {

            console.warn("Column Filter Error - No matching column found:", field);

            return false;
          }
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

          this.rowManager.refreshActiveData("display");
        } else {

          return false;
        }
      },

      setGroupStartOpen: function setGroupStartOpen(values) {

        if (this.extExists("groupRows", true)) {

          this.options.groupStartOpen = values;

          this.extensions.groupRows.initialize();

          if (this.options.groupBy) {

            this.rowManager.refreshActiveData("group");
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

            this.rowManager.refreshActiveData("group");
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

      ///////////////// Column Calculation Functions ///////////////

      getCalcResults: function getCalcResults() {

        if (this.extExists("columnCalcs", true)) {

          return this.extensions.columnCalcs.getResults();
        } else {

          return false;
        }
      },

      /////////////// Navigation Management //////////////


      navigatePrev: function navigatePrev() {

        var cell = false;

        if (this.extExists("edit", true)) {

          cell = this.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().prev();
          }
        }

        return false;
      },

      navigateNext: function navigateNext() {

        var cell = false;

        if (this.extExists("edit", true)) {

          cell = this.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().next();
          }
        }

        return false;
      },

      navigateLeft: function navigateLeft() {

        var cell = false;

        if (this.extExists("edit", true)) {

          cell = this.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().left();
          }
        }

        return false;
      },

      navigateRight: function navigateRight() {

        var cell = false;

        if (this.extExists("edit", true)) {

          cell = this.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().right();
          }
        }

        return false;
      },

      navigateUp: function navigateUp() {

        var cell = false;

        if (this.extExists("edit", true)) {

          cell = this.extensions.edit.currentCell;

          if (cell) {

            e.preventDefault();

            return cell.nav().up();
          }
        }

        return false;
      },

      navigateDown: function navigateDown() {

        var cell = false;

        if (this.extExists("edit", true)) {

          cell = this.extensions.edit.currentCell;

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

      /////////// Inter Table Communications ///////////


      tableComms: function tableComms(table, extension, action, data) {

        this.extensions.comms.receive(table, extension, action, data);
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


        var flexGrowUnits = 0; //total number of widthGrow blocks accross all columns


        var flexColWidth = 0; //desired width of flexible columns


        var flexColumns = []; //array of flexible width columns


        var fixedShrinkColumns = []; //array of fixed width columns that can shrink


        var flexShrinkUnits = 0; //total number of widthShrink blocks accross all columns


        var overflowWidth = 0; //horizontal overflow width


        var gapFill = 0; //number of pixels to be added to final column to close and half pixel gaps


        function calcWidth(width) {

          var colWidth;

          if (typeof width == "string") {

            if (width.indexOf("%") > -1) {

              colWidth = totalWidth / 100 * parseInt(width);
            } else {

              colWidth = parseInt(width);
            }
          } else {

            colWidth = width;
          }

          return colWidth;
        }

        //ensure columns resize to take up the correct amount of space


        function scaleColumns(columns, freeSpace, colWidth, shrinkCols) {

          var oversizeCols = [],
              oversizeSpace = 0,
              remainingSpace = 0,
              nextColWidth = 0,
              gap = 0,
              changeUnits = 0,
              undersizeCols = [];

          function calcGrow(col) {

            return colWidth * (col.column.definition.widthGrow || 1);
          }

          function calcShrink(col) {

            return calcWidth(col.width) - colWidth * (col.column.definition.widthShrink || 0);
          }

          columns.forEach(function (col, i) {

            var width = shrinkCols ? calcShrink(col) : calcGrow(col);

            if (col.column.minWidth >= width) {

              oversizeCols.push(col);
            } else {

              undersizeCols.push(col);

              changeUnits += shrinkCols ? col.column.definition.widthShrink || 1 : col.column.definition.widthGrow || 1;
            }
          });

          if (oversizeCols.length) {

            oversizeCols.forEach(function (col) {

              oversizeSpace += shrinkCols ? col.width - col.column.minWidth : col.column.minWidth;

              col.width = col.column.minWidth;
            });

            remainingSpace = freeSpace - oversizeSpace;

            nextColWidth = changeUnits ? Math.floor(remainingSpace / changeUnits) : remainingSpace;

            gap = remainingSpace - nextColWidth * changeUnits;

            gap += scaleColumns(undersizeCols, remainingSpace, nextColWidth, shrinkCols);
          } else {

            gap = changeUnits ? freeSpace - Math.floor(freeSpace / changeUnits) * changeUnits : freeSpace;

            undersizeCols.forEach(function (column) {

              column.width = shrinkCols ? calcShrink(column) : calcGrow(column);
            });
          }

          return gap;
        }

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

            minWidth = parseInt(column.minWidth);

            if (width) {

              colWidth = calcWidth(width);

              fixedWidth += colWidth > minWidth ? colWidth : minWidth;

              if (column.definition.widthShrink) {

                fixedShrinkColumns.push({

                  column: column,

                  width: colWidth > minWidth ? colWidth : minWidth

                });

                flexShrinkUnits += column.definition.widthShrink;
              }
            } else {

              flexColumns.push({

                column: column,

                width: 0

              });

              flexGrowUnits += column.definition.widthGrow || 1;
            }
          }
        });

        //calculate available space


        flexWidth = totalWidth - fixedWidth;

        //calculate correct column size


        flexColWidth = Math.floor(flexWidth / flexGrowUnits);

        //generate column widths


        var gapFill = scaleColumns(flexColumns, flexWidth, flexColWidth, false);

        //increase width of last column to account for rounding errors


        if (flexColumns.length && gapFill > 0) {

          flexColumns[flexColumns.length - 1].width += +gapFill;
        }

        //caculate space for columns to be shrunk into


        flexColumns.forEach(function (col) {

          flexWidth -= col.width;
        });

        overflowWidth = Math.abs(gapFill) + flexWidth;

        //shrink oversize columns if there is no available space


        if (overflowWidth > 0 && flexShrinkUnits) {

          gapFill = scaleColumns(fixedShrinkColumns, overflowWidth, Math.floor(overflowWidth / flexShrinkUnits), true);
        }

        //decrease width of last column to account for rounding errors


        if (fixedShrinkColumns.length) {

          fixedShrinkColumns[fixedShrinkColumns.length - 1].width -= gapFill;
        }

        flexColumns.forEach(function (col) {

          col.column.setWidth(col.width);
        });

        fixedShrinkColumns.forEach(function (col) {

          col.column.setWidth(col.width);
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

      var path = value ? path + "|" + value : path,
          pathArray = path.split("|"),
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

    var Comms = function Comms(table) {

      this.table = table;
    };

    Comms.prototype.getConnections = function (selectors) {

      var self = this,
          connections = [],
          connection;

      if (Array.isArray(selectors)) {

        connections = selectors;
      } else {

        connection = typeof selectors == "string" ? $(selectors) : selectors;

        connection.each(function () {

          if (self.table.element[0] !== this) {

            connections.push($(this));
          }
        });
      }

      return connections;
    };

    Comms.prototype.send = function (selectors, extension, action, data) {

      var self = this,
          connections = this.getConnections(selectors);

      connections.forEach(function (connection) {

        connection.tabulator("tableComms", self.table.element, extension, action, data);
      });

      if (!connections.length && selectors) {

        console.warn("Table Connection Error - No tables matching selector found", selectors);
      }
    };

    Comms.prototype.receive = function (table, extension, action, data) {

      if (this.table.extExists(extension)) {

        return this.table.extensions[extension].commsReceived(table, action, data);
      } else {

        console.warn("Inter-table Comms Error - no such extension:", extension);
      }
    };

    Tabulator.registerExtension("comms", Comms);

    var Accessor = function Accessor(table) {

      this.table = table; //hold Tabulator object


      this.allowedTypes = ["", "data", "download", "clipboard"]; //list of accessor types

    };

    //initialize column accessor


    Accessor.prototype.initializeColumn = function (column) {

      var self = this,
          match = false,
          config = {};

      this.allowedTypes.forEach(function (type) {

        var key = "accessor" + (type.charAt(0).toUpperCase() + type.slice(1)),
            accessor;

        if (column.definition[key]) {

          accessor = self.lookupAccessor(column.definition[key]);

          if (accessor) {

            match = true;

            config[key] = {

              accessor: accessor,

              params: column.definition[key + "Params"] || {}

            };
          }
        }
      });

      if (match) {

        column.extensions.accessor = config;
      }
    }, Accessor.prototype.lookupAccessor = function (value) {

      var accessor = false;

      //set column accessor


      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {

        case "string":

          if (this.accessors[value]) {

            accessor = this.accessors[value];
          } else {

            console.warn("Accessor Error - No such accessor found, ignoring: ", value);
          }

          break;

        case "function":

          accessor = value;

          break;

      }

      return accessor;
    };

    //apply accessor to row


    Accessor.prototype.transformRow = function (dataIn, type) {

      var self = this,
          key = "accessor" + (type.charAt(0).toUpperCase() + type.slice(1));

      //clone data object with deep copy to isolate internal data from returned result


      var data = $.extend(true, {}, dataIn || {});

      self.table.columnManager.traverse(function (column) {

        var value, accessor;

        if (column.extensions.accessor) {

          accessor = column.extensions.accessor[key] || column.extensions.accessor.accessor || false;

          if (accessor) {

            value = column.getFieldValue(data);

            if (value != "undefined") {

              column.setFieldValue(data, accessor.accessor(value, data, type, accessor.params, column.getComponent()));
            }
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

      this.progressiveLoad = false;

      this.loading = false;

      this.requestOrder = 0; //prevent requests comming out of sequence if overridden by another load request

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

      if (this.table.options.ajaxProgressiveLoad) {

        if (this.table.options.pagination) {

          this.progressiveLoad = false;

          console.error("Progressive Load Error - Pagination and progressive load cannot be used at the same time");
        } else {

          if (this.table.extExists("page")) {

            this.progressiveLoad = this.table.options.ajaxProgressiveLoad;

            this.table.extensions.page.initializeProgressive(this.progressiveLoad);
          } else {

            console.error("Pagination plugin is required for progressive ajax loading");
          }
        }
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

    //lstandard loading function


    Ajax.prototype.loadData = function (inPosition) {

      var self = this;

      if (this.progressiveLoad) {

        this._loadDataProgressive();
      } else {

        this._loadDataStandard(inPosition);
      }
    };

    Ajax.prototype.nextPage = function (diff) {

      var margin;

      if (!this.loading) {

        margin = this.table.options.ajaxProgressiveLoadScrollMargin || this.table.rowManager.element[0].clientHeight * 2;

        if (diff < margin) {

          this.table.extensions.page.nextPage();
        }
      }
    };

    Ajax.prototype.blockActiveRequest = function () {

      this.requestOrder++;
    };

    Ajax.prototype._loadDataProgressive = function () {

      this.table.rowManager.setData([]);

      this.table.extensions.page.setPage(1);
    };

    Ajax.prototype._loadDataStandard = function (inPosition) {

      var self = this;

      this.sendRequest(function (data) {

        self.table.rowManager.setData(data, inPosition);
      }, inPosition);
    };

    //send ajax request


    Ajax.prototype.sendRequest = function (callback, silent) {

      var self = this,
          requestNo;

      if (self.url) {

        self.requestOrder++;

        requestNo = self.requestOrder;

        self._loadDefaultConfig();

        self.config.url = self.url;

        if (self.params) {

          self.config.data = self.params;
        }

        if (self.table.options.ajaxRequesting(self.url, self.params) !== false) {

          self.loading = true;

          if (!silent) {

            self.showLoader();
          }

          $.ajax(self.config).done(function (data) {

            if (requestNo === self.requestOrder) {

              if (self.table.options.ajaxResponse) {

                data = self.table.options.ajaxResponse(self.url, self.params, data);
              }

              callback(data);
            } else {

              console.warn("Ajax Response Blocked - An active ajax request was blocked by an attempt to change table data while the request was being made");
            }

            self.hideLoader();

            self.loading = false;
          }).fail(function (xhr, textStatus, errorThrown) {

            console.error("Ajax Load Error - Connection Error: " + xhr.status, errorThrown);

            self.table.options.ajaxError(xhr, textStatus, errorThrown);

            self.showError();

            setTimeout(function () {

              self.hideLoader();
            }, 3000);

            self.loading = false;
          });
        }
      } else {

        console.warn("Ajax Load Error - No URL Set");

        return false;
      }
    };

    Ajax.prototype.showLoader = function () {

      var shouldLoad = typeof this.table.options.ajaxLoader === "function" ? this.table.options.ajaxLoader() : this.table.options.ajaxLoader;

      if (shouldLoad) {

        this.loaderElement.detach();

        this.msgElement.empty().removeClass("tabulator-error").addClass("tabulator-loading");

        if (this.loadingElement) {

          this.msgElement.append(this.loadingElement);
        } else {

          this.msgElement.append(this.table.extensions.localize.getText("ajax|loading"));
        }

        this.table.element.append(this.loaderElement);
      }
    };

    Ajax.prototype.showError = function () {

      this.loaderElement.detach();

      this.msgElement.empty().removeClass("tabulator-loading").addClass("tabulator-error");

      if (this.errorElement) {

        this.msgElement.append(this.errorElement);
      } else {

        this.msgElement.append(this.table.extensions.localize.getText("ajax|error"));
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

          if (this.table.options.columnCalcs != "group") {

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

          if (this.table.options.columnCalcs != "group") {

            this.initializeBottomRow();
          }
        }
      }
    };

    ColumnCalcs.prototype.removeCalcs = function () {

      var changed = false;

      if (this.topInitialized) {

        this.topInitialized = false;

        this.topElement.remove();

        changed = true;
      }

      if (this.botInitialized) {

        this.botInitialized = false;

        this.table.footerManager.remove(this.botElement);

        changed = true;
      }

      if (changed) {

        this.table.rowManager.adjustTableSize();
      }
    };

    ColumnCalcs.prototype.initializeTopRow = function () {

      if (!this.topInitialized) {

        this.table.columnManager.headersElement.after(this.topElement);

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

      this.recalcGroup(this.table.extensions.groupRows.getRowGroup(row));
    };

    ColumnCalcs.prototype.recalcGroup = function (group) {

      var data, rowData;

      if (group) {

        if (group.calcs) {

          if (group.calcs.bottom) {

            data = this.rowsToData(group.rows);

            rowData = this.generateRowData("bottom", data);

            group.calcs.bottom.updateData(rowData);

            group.calcs.bottom.reinitialize();
          }

          if (group.calcs.top) {

            data = this.rowsToData(group.rows);

            rowData = this.generateRowData("top", data);

            group.calcs.top.updateData(rowData);

            group.calcs.top.reinitialize();
          }
        }
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

            cell.setWidth(column.width);

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

    //return the calculated


    ColumnCalcs.prototype.getResults = function () {

      var self = this,
          results = {},
          groups;

      if (this.table.options.groupBy && this.table.extExists("groupRows")) {

        groups = this.table.extensions.groupRows.getGroups();

        groups.forEach(function (group) {

          results[group.getKey()] = self.getGroupResults(group);
        });
      } else {

        results = {

          top: this.topRow ? this.topRow.getData() : {},

          bottom: this.botRow ? this.botRow.getData() : {}

        };
      }

      return results;
    };

    //get results from a group


    ColumnCalcs.prototype.getGroupResults = function (group) {

      var self = this,
          groupObj = group._getSelf(),
          subGroups = group.getSubGroups(),
          subGroupResults = {},
          results = {};

      subGroups.forEach(function (subgroup) {

        subGroupResults[subgroup.getKey()] = self.getGroupResults(subgroup);
      });

      results = {

        top: groupObj.calcs.top ? groupObj.calcs.top.getData() : {},

        bottom: groupObj.calcs.bottom ? groupObj.calcs.bottom.getData() : {},

        groups: subGroupResults

      };

      return results;
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

        var output = null,
            precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;

        values.forEach(function (value) {

          value = Number(value);

          if (value > output || output === null) {

            output = value;
          }
        });

        return output !== null ? precision !== false ? output.toFixed(precision) : output : "";
      },

      "min": function min(values, data, calcParams) {

        var output = null,
            precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;

        values.forEach(function (value) {

          value = Number(value);

          if (value < output || output === null) {

            output = value;
          }
        });

        return output !== null ? precision !== false ? output.toFixed(precision) : output : "";
      },

      "sum": function sum(values, data, calcParams) {

        var output = 0,
            precision = typeof calcParams.precision !== "undefined" ? calcParams.precision : false;

        if (values.length) {

          values.forEach(function (value) {

            value = Number(value);

            output += !isNaN(value) ? Number(value) : 0;
          });
        }

        return precision !== false ? output.toFixed(precision) : output;
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

    var Clipboard = function Clipboard(table) {

      this.table = table;

      this.mode = true;

      this.copySelector = false;

      this.copySelectorParams = {};

      this.copyFormatter = false;

      this.copyFormatterParams = {};

      this.pasteParser = function () {};

      this.pasteAction = function () {};

      this.blocked = true; //block copy actions not originating from this command

    };

    Clipboard.prototype.initialize = function () {

      var self = this;

      this.mode = this.table.options.clipboard;

      if (this.mode === true || this.mode === "copy") {

        this.table.element.on("copy", function (e) {

          var data;

          if (!self.blocked) {

            e.preventDefault();

            data = self.generateContent();

            if (window.clipboardData && window.clipboardData.setData) {

              window.clipboardData.setData('Text', data);
            } else if (e.clipboardData && e.clipboardData.setData) {

              e.clipboardData.setData('text/plain', data);
            } else if (e.originalEvent && e.originalEvent.clipboardData.setData) {

              e.originalEvent.clipboardData.setData('text/plain', data);
            }

            self.table.options.clipboardCopied(data);

            self.reset();
          }
        });
      }

      if (this.mode === true || this.mode === "paste") {

        this.table.element.on("paste", function (e) {

          self.paste(e);
        });
      }

      this.setPasteParser(this.table.options.clipboardPasteParser);

      this.setPasteAction(this.table.options.clipboardPasteAction);
    };

    Clipboard.prototype.reset = function () {

      this.blocked = false;

      this.originalSelectionText = "";
    };

    Clipboard.prototype.setPasteAction = function (action) {

      switch (typeof action === 'undefined' ? 'undefined' : _typeof(action)) {

        case "string":

          this.pasteAction = this.pasteActions[action];

          if (!this.pasteAction) {

            console.warn("Clipboard Error - No such paste action found:", action);
          }

          break;

        case "function":

          this.pasteAction = action;

          break;

      }
    };

    Clipboard.prototype.setPasteParser = function (parser) {

      switch (typeof parser === 'undefined' ? 'undefined' : _typeof(parser)) {

        case "string":

          this.pasteParser = this.pasteParsers[parser];

          if (!this.pasteParser) {

            console.warn("Clipboard Error - No such paste parser found:", parser);
          }

          break;

        case "function":

          this.pasteParser = parser;

          break;

      }
    };

    Clipboard.prototype.paste = function (e) {

      var data, rowData, rows;

      if (this.checkPaseOrigin(e)) {

        data = this.getPasteData(e);

        rowData = this.pasteParser.call(this, data);

        if (rowData) {

          e.preventDefault();

          if (this.table.extExists("mutator")) {

            rowData = this.mutateData(rowData);
          }

          rows = this.pasteAction.call(this, rowData);

          this.table.options.clipboardPasted(data, rowData, rows);
        } else {

          this.table.options.clipboardPasteError(data);
        }
      }
    };

    Clipboard.prototype.mutateData = function (data) {

      var self = this,
          output = [];

      if (Array.isArray(data)) {

        data.forEach(function (row) {

          output.push(self.table.extensions.mutator.transformRow(row, "clipboard"));
        });
      } else {

        output = data;
      }

      return output;
    };

    Clipboard.prototype.checkPaseOrigin = function (e) {

      var valid = true;

      if (e.target.tagName != "DIV" || this.table.extensions.edit.currentCell) {

        valid = false;
      }

      return valid;
    };

    Clipboard.prototype.getPasteData = function (e) {

      var data = undefined;

      if (window.clipboardData && window.clipboardData.getData) {

        data = window.clipboardData.getData('Text');
      } else if (e.clipboardData && e.clipboardData.getData) {

        data = e.clipboardData.getData('text/plain');
      } else if (e.originalEvent && e.originalEvent.clipboardData.getData) {

        data = e.originalEvent.clipboardData.getData('text/plain');
      }

      return data;
    };

    Clipboard.prototype.copy = function (selector, selectorParams, formatter, formatterParams, internal) {

      var range, sel;

      this.blocked = false;

      if (this.mode === true || this.mode === "copy") {

        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {

          range = document.createRange();

          range.selectNodeContents(this.table.element[0]);

          sel = window.getSelection();

          if (sel.toString() && internal) {

            selector = "userSelection";

            formatter = "raw";

            this.copySelectorParams = sel.toString();
          }

          sel.removeAllRanges();

          sel.addRange(range);
        } else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {

          textRange = document.body.createTextRange();

          textRange.moveToElementText(this.table.element[0]);

          textRange.select();
        }

        this.setSelector(selector);

        this.copySelectorParams = typeof selectorParams != "undefined" && selectorParams != null ? selectorParams : this.table.options.clipboardCopyHeader;

        this.setFormatter(formatter);

        this.copyFormatterParams = typeof formatterParams != "undefined" && formatterParams != null ? formatterParams : {};

        document.execCommand('copy');

        if (sel) {

          sel.removeAllRanges();
        }
      }
    };

    Clipboard.prototype.setSelector = function (selector) {

      selector = selector || this.table.options.clipboardCopySelector;

      switch (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) {

        case "string":

          if (this.copySelectors[selector]) {

            this.copySelector = this.copySelectors[selector];
          } else {

            console.warn("Clipboard Error - No such selector found:", selector);
          }

          break;

        case "function":

          this.copySelector = selector;

          break;

      }
    };

    Clipboard.prototype.setFormatter = function (formatter) {

      formatter = formatter || this.table.options.clipboardCopyFormatter;

      switch (typeof formatter === 'undefined' ? 'undefined' : _typeof(formatter)) {

        case "string":

          if (this.copyFormatters[formatter]) {

            this.copyFormatter = this.copyFormatters[formatter];
          } else {

            console.warn("Clipboard Error - No such formatter found:", formatter);
          }

          break;

        case "function":

          this.copyFormatter = formatter;

          break;

      }
    };

    Clipboard.prototype.generateContent = function () {

      var data = this.copySelector.call(this, this.copySelectorParams);

      return this.copyFormatter.call(this, data, this.copyFormatterParams);
    };

    Clipboard.prototype.rowsToData = function (rows, params) {

      var columns = this.table.columnManager.columnsByIndex,
          headers = [],
          data = [];

      if (params) {

        columns.forEach(function (column) {

          headers.push(column.definition.title);
        });

        data.push(headers);
      }

      rows.forEach(function (row) {

        var rowArray = [],
            rowData = row.getData("clipboard");

        columns.forEach(function (column) {

          var value = column.getFieldValue(rowData);

          rowArray.push(value);
        });

        data.push(rowArray);
      });

      return data;
    };

    Clipboard.prototype.copySelectors = {

      userSelection: function userSelection(params) {

        return params;
      },

      selected: function selected(params) {

        var rows = [];

        if (this.table.extExists("selectRow", true)) {

          rows = this.table.extensions.selectRow.getSelectedRows();
        }

        return this.rowsToData(rows, params);
      },

      table: function table(params) {

        return this.rowsToData(this.table.rowManager.getComponents(), params);
      },

      active: function active(params) {

        return this.rowsToData(this.table.rowManager.getComponents(true), params);
      }

    };

    Clipboard.prototype.copyFormatters = {

      raw: function raw(data, params) {

        return data;
      },

      table: function table(data, params) {

        var output = [];

        data.forEach(function (row) {

          row.forEach(function (value) {

            if (typeof value == "undefined") {

              value = "";
            }

            value = typeof value == "undefined" || value === null ? "" : value.toString();

            if (value.match(/\r|\n/)) {

              value = value.split('"').join('""');

              value = '"' + value + '"';
            }
          });

          output.push(row.join("\t"));
        });

        return output.join("\n");
      }

    };

    Clipboard.prototype.pasteParsers = {

      table: function table(clipboard) {

        var data = [],
            success = false,
            headerFindSuccess = true,
            columns = this.table.columnManager.columns,
            columnMap = [],
            rows = [];

        //get data from clipboard into array of columns and rows.


        clipboard = clipboard.split("\n");

        clipboard.forEach(function (row) {

          data.push(row.split("\t"));
        });

        if (data.length && !(data.length === 1 && data[0].length < 2)) {

          success = true;

          //check if headers are present by title


          data[0].forEach(function (value) {

            var column = columns.find(function (column) {

              return value.trim() && column.definition.title.trim() === value.trim();
            });

            if (column) {

              columnMap.push(column);
            } else {

              headerFindSuccess = false;
            }
          });

          //check if column headers are present by field


          if (!headerFindSuccess) {

            headerFindSuccess = true;

            columnMap = [];

            data[0].forEach(function (value) {

              var column = columns.find(function (column) {

                return value.trim() && column.field.trim() === value.trim();
              });

              if (column) {

                columnMap.push(column);
              } else {

                headerFindSuccess = false;
              }
            });

            if (!headerFindSuccess) {

              columnMap = this.table.columnManager.columnsByIndex;
            }
          }

          //remove header row if found


          if (headerFindSuccess) {

            data.shift();
          }

          data.forEach(function (item) {

            var row = {};

            item.forEach(function (value, i) {

              if (columnMap[i]) {

                row[columnMap[i].field] = value;
              }
            });

            rows.push(row);
          });

          return rows;
        } else {

          return false;
        }
      }

    };

    Clipboard.prototype.pasteActions = {

      replace: function replace(rows) {

        return this.table.setData(rows);
      },

      update: function update(rows) {

        return this.table.updateOrAddData(rows);
      },

      insert: function insert(rows) {

        return this.table.addData(rows);
      }

    };

    Tabulator.registerExtension("clipboard", Clipboard);

    var Download = function Download(table) {

      this.table = table; //hold Tabulator object


      this.fields = {}; //hold filed multi dimension arrays


      this.columnsByIndex = []; //hold columns in their order in the table


      this.columnsByField = {}; //hold columns with lookup by field name

    };

    //trigger file download


    Download.prototype.download = function (type, filename, options, interceptCallback) {

      var self = this,
          downloadFunc = false;

      function buildLink(data, mime) {

        if (interceptCallback) {

          interceptCallback(data);
        } else {

          self.triggerDownload(data, mime, type, filename);
        }
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

      this.processColumns();

      if (downloadFunc) {

        downloadFunc.call(this, self.processDefinitions(), self.processData(), options || {}, buildLink);
      }
    };

    Download.prototype.processColumns = function () {

      var self = this;

      self.columnsByIndex = [];

      self.columnsByField = {};

      self.table.columnManager.columnsByIndex.forEach(function (column) {

        if (column.field && column.visible && column.definition.download !== false) {

          self.columnsByIndex.push(column);

          self.columnsByField[column.field] = column;
        }
      });
    };

    Download.prototype.processDefinitions = function () {

      var self = this,
          processedDefinitions = [];

      self.columnsByIndex.forEach(function (column) {

        var definition = column.definition;

        if (column.download !== false) {

          //isolate definiton from defintion object


          var def = {};

          for (var key in definition) {

            def[key] = definition[key];
          }

          if (typeof definition.downloadTitle != "undefined") {

            def.title = definition.downloadTitle;
          }

          processedDefinitions.push(def);
        }
      });

      return processedDefinitions;
    };

    Download.prototype.processData = function () {

      var self = this,
          data = self.table.rowManager.getData(true, "download");

      //bulk data processing


      if (typeof self.table.options.downloadDataFormatter == "function") {

        data = self.table.options.downloadDataFormatter(data);
      }

      return data;
    };

    Download.prototype.triggerDownload = function (data, mime, type, filename) {

      var element = document.createElement('a'),
          blob = new Blob([data], { type: mime }),
          filename = filename || "Tabulator." + (typeof type === "function" ? "txt" : type);

      blob = this.table.options.downloadReady(data, blob);

      if (blob) {

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

        if (this.table.options.downloadComplete) {

          this.table.options.downloadComplete();
        }
      }
    };

    //nested field lookup


    Download.prototype.getFieldValue = function (field, data) {

      var column = this.columnsByField[field];

      if (column) {

        return column.getFieldValue(data);
      }

      return false;
    };

    Download.prototype.commsReceived = function (table, action, data) {

      switch (action) {

        case "intercept":

          this.download(data.type, "", data.options, data.intercept);

          break;

      }
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

      pdf: function pdf(columns, data, options, setFileContents) {

        var self = this,
            fields = [],
            header = [],
            body = [],
            table = "",
            autoTableParams = options && options.autoTable ? options.autoTable : {},
            title = options && options.title ? options.title : "",
            orientation = options && options.orientation == "portrait" ? "p" : "l";

        //build column headers


        columns.forEach(function (column) {

          if (column.field) {

            header.push(column.title || "");

            fields.push(column.field);
          }
        });

        //build table rows


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

            rowData.push(value);
          });

          body.push(rowData);
        });

        var doc = new jsPDF(orientation, 'pt'); //set document to landscape, better for most tables


        if (title) {

          autoTableParams.addPageContent = function (data) {

            doc.text(title, 40, 30);
          };
        }

        doc.autoTable(header, body, autoTableParams);

        setFileContents(doc.output("arraybuffer"), "application/pdf");
      },

      xlsx: function xlsx(columns, data, options, setFileContents) {

        var self = this,
            sheetName = options.sheetName || "Sheet1",
            workbook = { SheetNames: [], Sheets: {} },
            output;

        function generateSheet() {

          var titles = [],
              fields = [],
              rows = [],
              worksheet;

          //convert rows to worksheet


          function rowsToSheet() {

            var sheet = {};

            var range = { s: { c: 0, r: 0 }, e: { c: fields.length, r: rows.length } };

            XLSX.utils.sheet_add_aoa(sheet, rows);

            sheet['!ref'] = XLSX.utils.encode_range(range);

            return sheet;
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

          return worksheet;
        }

        if (options.sheetOnly) {

          setFileContents(generateSheet());

          return;
        }

        if (options.sheets) {

          for (var sheet in options.sheets) {

            if (options.sheets[sheet] === true) {

              workbook.SheetNames.push(sheet);

              workbook.Sheets[sheet] = generateSheet();
            } else {

              workbook.SheetNames.push(sheet);

              this.table.extensions.comms.send(options.sheets[sheet], "download", "intercept", {

                type: "xlsx",

                options: { sheetOnly: true },

                intercept: function intercept(data) {

                  workbook.Sheets[sheet] = data;
                }

              });
            }
          }
        } else {

          workbook.SheetNames.push(sheetName);

          workbook.Sheets[sheetName] = generateSheet();
        }

        //convert workbook to binary array


        function s2ab(s) {

          var buf = new ArrayBuffer(s.length);

          var view = new Uint8Array(buf);

          for (var i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
          }return buf;
        }

        output = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'binary' });

        setFileContents(s2ab(output), "application/octet-stream");
      }

    };

    Tabulator.registerExtension("download", Download);

    var Edit = function Edit(table) {

      this.table = table; //hold Tabulator object


      this.currentCell = false; //hold currently editing cell


      this.mouseClick = false; //hold mousedown state to prevent click binding being overriden by editor opening


      this.recursionBlock = false; //prevent focus recursion


      this.invalidEdit = false;
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

    Edit.prototype.clearEditor = function () {

      var cell = this.currentCell;

      this.invalidEdit = false;

      if (cell) {

        this.currentCell = false;

        cell.getElement().removeClass("tabulator-validation-fail");

        cell.getElement().removeClass("tabulator-editing").empty();

        cell.row.getElement().removeClass("tabulator-row-editing");
      }
    };

    Edit.prototype.cancelEdit = function () {

      if (this.currentCell) {

        var cell = this.currentCell;

        var component = this.currentCell.getComponent();

        this.clearEditor();

        cell.setValueActual(cell.getValue());

        if (cell.column.cellEvents.cellEditCancelled) {

          cell.column.cellEvents.cellEditCancelled(component);
        }

        this.table.options.cellEditCancelled(component);
      }
    };

    //return a formatted value for a cell


    Edit.prototype.bindEditor = function (cell) {

      var self = this,
          element = cell.getElement();

      element.attr("tabindex", 0);

      element.on("click", function (e) {

        if (!$(this).hasClass("tabulator-editing")) {

          $(this).focus();
        }
      });

      element.on("mousedown", function (e) {

        self.mouseClick = true;
      });

      element.on("focus", function (e) {

        if (!self.recursionBlock) {

          self.edit(cell, e, false);
        }
      });
    };

    Edit.prototype.focusCellNoEvent = function (cell) {

      this.recursionBlock = true;

      cell.getElement().focus();

      this.recursionBlock = false;
    };

    Edit.prototype.editCell = function (cell, forceEdit) {

      this.focusCellNoEvent(cell);

      this.edit(cell, false, forceEdit);
    };

    Edit.prototype.edit = function (cell, e, forceEdit) {

      var self = this,
          allowEdit = true,
          rendered = function rendered() {},
          element = cell.getElement(),
          cellEditor,
          component;

      //prevent editing if another cell is refusing to leave focus (eg. validation fail)


      if (this.currentCell) {

        if (!this.invalidEdit) {

          this.cancelEdit();
        } else {

          return;
        }

        return;
      }

      //handle successfull value change


      function success(value) {

        if (self.currentCell === cell) {

          var valid = true;

          if (cell.column.extensions.validate && self.table.extExists("validate")) {

            valid = self.table.extensions.validate.validate(cell.column.extensions.validate, cell.getComponent(), value);
          }

          if (valid === true) {

            self.clearEditor();

            cell.setValue(value, true);
          } else {

            self.invalidEdit = true;

            cell.getElement().addClass("tabulator-validation-fail");

            self.focusCellNoEvent(cell);

            rendered();

            self.table.options.validationFailed(cell.getComponent(), value, valid);
          }
        } else {

          console.warn("Edit Success Error - cannot call success on a cell that is no longer being edited");
        }
      };

      //handle aborted edit


      function cancel() {

        if (self.currentCell === cell) {

          self.cancelEdit();
        } else {

          console.warn("Edit Success Error - cannot call cancel on a cell that is no longer being edited");
        }
      };

      function onRendered(callback) {

        rendered = callback;
      }

      if (!cell.column.extensions.edit.blocked) {

        if (e) {

          e.stopPropagation();
        }

        switch (_typeof(cell.column.extensions.edit.check)) {

          case "function":

            allowEdit = cell.column.extensions.edit.check(cell.getComponent());

            break;

          case "boolean":

            allowEdit = cell.column.extensions.edit.check;

            break;

        }

        if (allowEdit || forceEdit) {

          self.cancelEdit();

          self.currentCell = cell;

          component = cell.getComponent();

          if (this.mouseClick) {

            this.mouseClick = false;

            if (cell.column.cellEvents.cellClick) {

              cell.column.cellEvents.cellClick(component);
            }
          }

          if (cell.column.cellEvents.cellEditing) {

            cell.column.cellEvents.cellEditing(component);
          }

          self.table.options.cellEditing(component);

          cellEditor = cell.column.extensions.edit.editor.call(self, component, onRendered, success, cancel, cell.column.extensions.edit.params);

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

            return false;
          }

          return true;
        } else {

          this.mouseClick = false;

          element.blur();

          return false;
        }
      } else {

        this.mouseClick = false;

        element.blur();

        return false;
      }
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

        var max = typeof editorParams.max != "undefined" ? "max='" + editorParams.max + "'" : "";

        var min = typeof editorParams.min != "undefined" ? "min='" + editorParams.min + "'" : "";

        var step = "step='" + (typeof editorParams.step != "undefined" ? editorParams.step : 1) + "'";

        var input = $("<input type='number' " + max + " " + min + " " + step + "/>");

        //create and style input


        input.css({

          "padding": "4px",

          "width": "100%",

          "box-sizing": "border-box"

        }).val(cell.getValue());

        onRendered(function () {

          input.css("height", "100%");

          setTimeout(function () {

            input.focus();
          }, 10);
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

      //input element with type of number


      range: function range(cell, onRendered, success, cancel, editorParams) {

        var max = "max='" + (typeof editorParams.max != "undefined" ? editorParams.max : 10) + "'";

        var min = "min='" + (typeof editorParams.min != "undefined" ? editorParams.min : 0) + "'";

        var step = "step='" + (typeof editorParams.step != "undefined" ? editorParams.step : 1) + "'";

        var input = $("<input type='range' " + max + " " + min + " " + step + "/>");

        //create and style input


        input.css({

          "padding": "4px",

          "width": "100%",

          "box-sizing": "border-box"

        }).val(cell.getValue());

        onRendered(function () {

          input.css("height", "100%");

          setTimeout(function () {

            input.focus();
          }, 10);
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

      //select


      select: function select(cell, onRendered, success, cancel, editorParams) {

        //create and style select


        var select = $("<select><select/>");

        var isArray = Array.isArray(editorParams);

        if (typeof editorParams == "function") {

          editorParams = editorParams(cell);

          isArray = Array.isArray(editorParams);
        }

        function optionAppend(element, label, value, disabled) {

          var option = $("<option></option>").attr("value", value).text(label);

          if (disabled) {

            option.prop("disabled", true);
          }

          element.append(option);
        }

        function processOption(element, option) {

          var groupEl;

          if (option.options) {

            groupEl = $("<optgroup></optgroup>").attr("label", option.label);

            option.options.forEach(function (item) {

              processOption(groupEl, item);
            });

            element.append(groupEl);
          } else {

            optionAppend(element, typeof option.label == "undefined" ? option.value : option.label, typeof option.value == "undefined" ? option.label : option.value, option.disabled);
          }
        }

        if (!isArray && (typeof editorParams === 'undefined' ? 'undefined' : _typeof(editorParams)) === "object") {

          for (var key in editorParams) {

            optionAppend(select, editorParams[key], key);
          }
        } else if (isArray) {

          editorParams.forEach(function (item) {

            processOption(select, item);
          });
        }

        select.css({

          "padding": "4px",

          "width": "100%",

          "box-sizing": "border-box",

          "font-family": ""

        }).val(cell.getValue());

        onRendered(function () {

          select.focus().click();
        });

        //submit new value on blur


        select.on("change blur", function (e) {

          success(select.val());
        });

        //submit new value on enter


        select.on("keydown", function (e) {

          if (e.keyCode === 13) {

            success(select.val());
          }
        });

        return select;
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

        if (this.table.browser != "firefox") {
          //prevent blur issue on mac firefox


          onRendered(function () {

            input.focus();
          });
        }

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

        if (this.table.browser != "firefox") {
          //prevent blur issue on mac firefox


          onRendered(function () {

            input.focus();
          });
        }

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

        var filterType = tagType == "input" && attrType == "text" || tagType == "textarea" ? "partial" : "match",
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

      column.extensions.filter = {

        success: success

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
            },

            getRow: function getRow() {

              return {

                normalizeHeight: function normalizeHeight() {}

              };
            }

          };

          editorElement = editor.call(self, cellWrapper, function () {}, success, cancel, column.definition.headerFilterParams || {});

          //set Placeholder Text


          if (field) {

            self.table.extensions.localize.bind("headerFilters|columns|" + column.definition.field, function (value) {

              editorElement.attr("placeholder", typeof value !== "undefined" && value ? value : self.table.extensions.localize.getText("headerFilters|default"));
            });
          } else {

            self.table.extensions.localize.bind("headerFilters|default", function (value) {

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

          column.extensions.filter.headerElement = editorElement;

          //update number filtered columns on change


          attrType = editorElement.attr("type") ? editorElement.attr("type").toLowerCase() : "";

          if (attrType == "number") {

            editorElement.on("change", function (e) {

              success($(this).val());
            });
          }

          //change text inputs to search inputs to allow for clearing of field


          if (attrType == "text" && this.table.browser !== "ie") {

            editorElement.attr("type", "search");

            editorElement.off("change blur"); //prevent blur from triggering filter and preventing selection click

          }

          //prevent input and select elements from propegating click to column sorters etc


          tagType = editorElement.prop("tagName").toLowerCase();

          if (tagType == "input" || tagType == "select" || tagType == "textarea") {

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

    //hide all header filter elements (used to ensure correct column widths in "fitData" layout mode)


    Filter.prototype.hideHeaderFilterElements = function () {

      this.headerFilterElements.forEach(function (element) {

        element.hide();
      });
    };

    //show all header filter elements (used to ensure correct column widths in "fitData" layout mode)


    Filter.prototype.showHeaderFilterElements = function () {

      this.headerFilterElements.forEach(function (element) {

        element.show();
      });
    };

    //programatically set value of header filter


    Filter.prototype.setHeaderFilterFocus = function (column) {

      if (column.extensions.filter && column.extensions.filter.headerElement) {

        column.extensions.filter.headerElement.focus();
      } else {

        console.warn("Column Filter Focus Error - No header filter set on column:", column.getField());
      }
    };

    //programatically set value of header filter


    Filter.prototype.setHeaderFilterValue = function (column, value) {

      if (column) {

        if (column.extensions.filter && column.extensions.filter.headerElement) {

          column.extensions.filter.headerElement.val(value);

          column.extensions.filter.success(value);
        } else {

          console.warn("Column Filter Error - No header filter set on column:", column.getField());
        }
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

      var self = this;

      if (!Array.isArray(field)) {

        field = [{ field: field, type: type, value: value }];
      }

      field.forEach(function (filter) {

        filter = self.findFilter(filter);

        if (filter) {

          self.filterList.push(filter);

          self.changed = true;
        }
      });

      if (this.table.options.persistentFilter && this.table.extExists("persistence", true)) {

        this.table.extensions.persistence.save("filter");
      }
    };

    Filter.prototype.findFilter = function (filter) {

      var self = this,
          column;

      if (Array.isArray(filter)) {

        return this.findSubFilters(filter);
      }

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

      filter.func = filterFunc;

      return filter.func ? filter : false;
    };

    Filter.prototype.findSubFilters = function (filters) {

      var self = this,
          output = [];

      filters.forEach(function (filter) {

        filter = self.findFilter(filter);

        if (filter) {

          output.push(filter);
        }
      });

      return output.length ? output : false;
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

      if (this.table.options.persistentFilter && this.table.extExists("persistence", true)) {

        this.table.extensions.persistence.save("filter");
      }
    };

    //clear filters


    Filter.prototype.clearFilter = function (all) {

      this.filterList = [];

      if (all) {

        this.clearHeaderFilter();
      }

      this.changed = true;

      if (this.table.options.persistentFilter && this.table.extExists("persistence", true)) {

        this.table.extensions.persistence.save("filter");
      }
    };

    //clear header filters


    Filter.prototype.clearHeaderFilter = function () {

      this.headerFilters = {};

      this.headerFilterElements.forEach(function (element) {

        element.val("");
      });

      this.changed = true;
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

        if (!self.filterRecurse(filter, data)) {

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

    Filter.prototype.filterRecurse = function (filter, data) {

      var self = this,
          match = false;

      if (Array.isArray(filter)) {

        filter.forEach(function (subFilter) {

          if (self.filterRecurse(subFilter, data)) {

            match = true;
          }
        });
      } else {

        match = filter.func(data);
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

          if (typeof rowVal !== 'undefined' && rowVal !== null) {

            return String(rowVal).toLowerCase().indexOf(filterVal.toLowerCase()) > -1 ? true : false;
          } else {

            return false;
          }
        }
      },

      //in array


      "in": function _in(filterVal, rowVal) {

        if (Array.isArray(filterVal)) {

          return filterVal.indexOf(rowVal) > -1;
        } else {

          console.warn("Filter Error - filter value is not an array:", filterVal);

          return false;
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

            if (column.definition.formatter === "email") {

              console.warn("The%c email%c formatter has been depricated and will be removed in version 4.0, use the %clink %cformatter with %cformatterParams:{urlPrefix:'mailto:'} %cinstead.", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");
            }
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

        var value = this.sanitizeHTML(cell.getValue()),
            urlPrefix = formatterParams.urlPrefix || "",
            label = this.emptyToSpace(value),
            data;

        if (formatterParams.labelField) {

          data = cell.getData();

          label = data[formatterParams.labelField];
        }

        if (formatterParams.label) {

          switch (_typeof(formatterParams.label)) {

            case "string":

              label = formatterParams.label;

              break;

            case "function":

              label = formatterParams.label(cell);

              break;

          }
        }

        if (formatterParams.urlField) {

          data = cell.getData();

          value = data[formatterParams.urlField];
        }

        if (formatterParams.url) {

          switch (_typeof(formatterParams.url)) {

            case "string":

              value = formatterParams.url;

              break;

            case "function":

              value = formatterParams.url(cell);

              break;

          }
        }

        return "<a href='" + urlPrefix + value + "'>" + label + "</a>";
      },

      //image element


      image: function image(cell, formatterParams) {

        var value = this.sanitizeHTML(cell.getValue());

        var el = $("<img src='" + value + "'/>");

        el.on("load", function () {

          cell.getRow().normalizeHeight();
        });

        return el;
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

      //select


      lookup: function lookup(cell, formatterParams) {

        var value = cell.getValue();

        if (typeof formatterParams[value] === "undefined") {

          console.warn('Missing display value for ' + value);

          return value;
        }

        return formatterParams[value];
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
            legendAlign = formatterParams && formatterParams.legendAlign ? formatterParams.legendAlign : "center",
            percent,
            percentValue,
            color,
            legend,
            legendColor,
            top,
            left,
            right,
            bottom;

        //make sure value is in range


        percentValue = parseFloat(value) <= max ? parseFloat(value) : max;

        percentValue = parseFloat(percentValue) >= min ? parseFloat(percentValue) : min;

        //workout percentage


        percent = (max - min) / 100;

        percentValue = Math.round((percentValue - min) / percent);

        //set bar color


        switch (_typeof(formatterParams.color)) {

          case "string":

            color = formatterParams.color;

            break;

          case "function":

            color = formatterParams.color(value);

            break;

          case "object":

            if (Array.isArray(formatterParams.color)) {

              var unit = 100 / formatterParams.color.length;

              var index = Math.floor(percentValue / unit);

              index = Math.min(index, formatterParams.color.length - 1);

              index = Math.max(index, 0);

              color = formatterParams.color[index];

              break;
            }

          default:

            color = "#2DC214";

        }

        //generate legend


        switch (_typeof(formatterParams.legend)) {

          case "string":

            legend = formatterParams.legend;

            break;

          case "function":

            legend = formatterParams.legend(value);

            break;

          case "boolean":

            legend = value;

            break;

          default:

            legend = false;

        }

        //set legend color


        switch (_typeof(formatterParams.legendColor)) {

          case "string":

            legendColor = formatterParams.legendColor;

            break;

          case "function":

            legendColor = formatterParams.legendColor(value);

            break;

          case "object":

            if (Array.isArray(formatterParams.legendColor)) {

              var unit = 100 / formatterParams.legendColor.length;

              var index = Math.floor(percentValue / unit);

              index = Math.min(index, formatterParams.legendColor.length - 1);

              index = Math.max(index, 0);

              legendColor = formatterParams.legendColor[index];

              break;
            }

          default:

            legendColor = "#000";

        }

        element.css({

          "min-width": "30px",

          "position": "relative"

        });

        element.attr("aria-label", percentValue);

        return "<div style='position:absolute; top:8px; bottom:8px; left:4px; right:4px;'  data-max='" + max + "' data-min='" + min + "'><div style='position:relative; height:100%; width:calc(" + percentValue + "%); background-color:" + color + "; display:inline-block;'></div></div>" + (legend ? "<div style='position:absolute; top:4px; left:0; text-align:" + legendAlign + "; width:100%; color:" + legendColor + ";'>" + legend + "</div>" : "");
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
      },

      responsiveCollapse: function responsiveCollapse(cell, formatterParams) {

        var self = this,
            el = $("<div class='tabulator-responsive-collapse-toggle'><span class='tabulator-responsive-collapse-toggle-open'>+</span><span class='tabulator-responsive-collapse-toggle-close'>-</span></div>");

        cell.getElement().addClass("tabulator-row-handle");

        if (self.table.options.responsiveLayoutCollapseStartOpen) {

          el.addClass("open");
        }

        el.click(function () {

          $(this).toggleClass("open");

          $(this).closest(".tabulator-row").find(".tabulator-responsive-collapse").toggle();
        });

        return el;
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

    var FrozenRows = function FrozenRows(table) {

      this.table = table; //hold Tabulator object


      this.topElement = $("<div class='tabulator-frozen-rows-holder'></div>");

      this.rows = [];

      this.displayIndex = 0; //index in display pipeline

    };

    FrozenRows.prototype.initialize = function () {

      this.rows = [];

      this.table.columnManager.element.append(this.topElement);
    };

    FrozenRows.prototype.setDisplayIndex = function (index) {

      this.displayIndex = index;
    };

    FrozenRows.prototype.getDisplayIndex = function () {

      return this.displayIndex;
    };

    FrozenRows.prototype.isFrozen = function () {

      return !!this.rows.length;
    };

    //filter frozen rows out of display data


    FrozenRows.prototype.getRows = function (rows) {

      var self = this,
          frozen = [],
          output = rows.slice(0);

      this.rows.forEach(function (row) {

        var index = output.indexOf(row);

        if (index > -1) {

          output.splice(index, 1);
        }
      });

      return output;
    };

    FrozenRows.prototype.freezeRow = function (row) {

      if (!row.extensions.frozen) {

        row.extensions.frozen = true;

        this.topElement.append(row.getElement());

        row.initialize();

        row.normalizeHeight();

        this.table.rowManager.adjustTableSize();

        this.rows.push(row);

        this.table.rowManager.refreshActiveData("display");

        this.styleRows();
      } else {

        console.warn("Freeze Error - Row is already frozen");
      }
    };

    FrozenRows.prototype.unfreezeRow = function (row) {

      var index = this.rows.indexOf(row);

      if (row.extensions.frozen) {

        row.extensions.frozen = false;

        row.getElement().detach();

        this.table.rowManager.adjustTableSize();

        this.rows.splice(index, 1);

        this.table.rowManager.refreshActiveData("display");

        if (this.rows.length) {

          this.styleRows();
        }
      } else {

        console.warn("Freeze Error - Row is already unfrozen");
      }
    };

    FrozenRows.prototype.styleRows = function (row) {

      var self = this;

      this.rows.forEach(function (row, i) {

        self.table.rowManager.styleRow(row, i);
      });
    };

    Tabulator.registerExtension("frozenRows", FrozenRows);

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


    var Group = function Group(groupManager, parent, level, key, field, generator, oldGroup) {

      this.groupManager = groupManager;

      this.parent = parent;

      this.key = key;

      this.level = level;

      this.field = field;

      this.hasSubGroups = level < groupManager.groupIDLookups.length - 1;

      this.addRow = this.hasSubGroups ? this._addRowToGroup : this._addRow;

      this.type = "group"; //type of element


      this.old = oldGroup;

      this.rows = [];

      this.groups = [];

      this.groupList = [];

      this.generator = generator;

      this.element = $("<div class='tabulator-row tabulator-group tabulator-group-level-" + level + "' role='rowgroup'></div>");

      this.elementContents = $(""), this.arrowElement = $("<div class='tabulator-arrow'></div>");

      this.height = 0;

      this.outerHeight = 0;

      this.initialized = false;

      this.calcs = {};

      this.initialized = false;

      this.extensions = {};

      this.visible = oldGroup ? oldGroup.visible : typeof groupManager.startOpen[level] !== "undefined" ? groupManager.startOpen[level] : groupManager.startOpen[0];

      this.addBindings();
    };

    Group.prototype.addBindings = function () {

      var self = this,
          dblTap,
          tapHold,
          tap,
          toggleElement;

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

      if (self.groupManager.table.options.groupToggleElement) {

        toggleElement = self.groupManager.table.options.groupToggleElement == "arrow" ? self.arrowElement : self.element;

        toggleElement.on("click", function (e) {

          e.stopPropagation();

          e.stopImmediatePropagation();

          self.toggleVisibility();
        });
      }
    };

    Group.prototype._addRowToGroup = function (row) {

      var level = this.level + 1;

      if (this.hasSubGroups) {

        var groupID = this.groupManager.groupIDLookups[level].func(row.getData());

        if (!this.groups[groupID]) {

          var group = new Group(this.groupManager, this, level, groupID, this.groupManager.groupIDLookups[level].field, this.groupManager.headerGenerator[level] || this.groupManager.headerGenerator[0], this.old ? this.old.groups[groupID] : false);

          this.groups[groupID] = group;

          this.groupList.push(group);
        }

        this.groups[groupID].addRow(row);
      }
    };

    Group.prototype._addRow = function (row) {

      this.rows.push(row);

      row.extensions.group = this;
    };

    Group.prototype.insertRow = function (row, to, after) {

      var data = this.conformRowData({});

      row.updateData(data);

      var toIndex = this.rows.indexOf(to);

      if (toIndex > -1) {

        if (after) {

          this.rows.splice(toIndex + 1, 0, row);
        } else {

          this.rows.splice(toIndex, 0, row);
        }
      } else {

        if (after) {

          this.rows.push(row);
        } else {

          this.rows.unshift(row);
        }
      }

      row.extensions.group = this;

      this.generateGroupHeaderContents();

      if (this.groupManager.table.extExists("columnCalcs") && this.groupManager.table.options.columnCalcs != "table") {

        this.groupManager.table.extensions.columnCalcs.recalcGroup(this);
      }
    };

    Group.prototype.getRowIndex = function (row) {};

    //update row data to match grouping contraints


    Group.prototype.conformRowData = function (data) {

      if (this.field) {

        data[this.field] = this.key;
      } else {

        console.warn("Data Conforming Error - Cannot conform row data to match new group as groupBy is a function");
      }

      if (this.parent) {

        data = this.parent.conformRowData(data);
      }

      return data;
    };

    Group.prototype.removeRow = function (row) {

      var index = this.rows.indexOf(row);

      if (index > -1) {

        this.rows.splice(index, 1);
      }

      if (!this.rows.length) {

        if (this.parent) {

          this.parent.removeGroup(this);
        } else {

          this.groupManager.removeGroup(this);
        }

        this.groupManager.updateGroupRows(true);
      } else {

        this.generateGroupHeaderContents();

        if (this.groupManager.table.extExists("columnCalcs") && this.groupManager.table.options.columnCalcs != "table") {

          this.groupManager.table.extensions.columnCalcs.recalcGroup(this);
        }
      }
    };

    Group.prototype.removeGroup = function (group) {

      var index;

      if (this.groups[group.key]) {

        delete this.groups[group.key];

        index = this.groupList.indexOf(group);

        if (index > -1) {

          this.groupList.splice(index, 1);
        }

        if (!this.groupList.length) {

          if (this.parent) {

            this.parent.removeGroup(this);
          } else {

            this.groupManager.removeGroup(this);
          }
        }
      }
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

          if (this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.extExists("columnCalcs") && this.groupManager.table.extensions.columnCalcs.hasTopCalcs()) {

            this.calcs.top = this.groupManager.table.extensions.columnCalcs.generateTopRow(this.rows);

            output.push(this.calcs.top);
          }

          output = output.concat(this.rows);

          if (this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.extExists("columnCalcs") && this.groupManager.table.extensions.columnCalcs.hasBottomCalcs()) {

            this.calcs.bottom = this.groupManager.table.extensions.columnCalcs.generateBottomRow(this.rows);

            output.push(this.calcs.bottom);
          }
        }
      } else {

        if (!this.groupList.length && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.options.groupClosedShowCalcs) {

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

      if (this.groupManager.table.rowManager.getRenderMode() == "classic" && !this.groupManager.table.options.pagination) {

        this.element.removeClass("tabulator-group-visible");

        if (this.groupList.length) {

          this.groupList.forEach(function (group) {

            if (group.calcs.top) {

              group.calcs.top.getElement().detach();
            }

            if (group.calcs.bottom) {

              group.calcs.bottom.getElement().detach();
            }

            var rows = group.getHeadersAndRows();

            rows.forEach(function (row) {

              row.getElement().detach();
            });
          });
        } else {

          this.rows.forEach(function (row) {

            row.getElement().detach();
          });
        }

        this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex());
      } else {

        this.groupManager.updateGroupRows(true);
      }

      this.groupManager.table.options.groupVisibilityChanged(this.getComponent(), false);
    };

    Group.prototype.show = function () {

      var self = this;

      self.visible = true;

      if (this.groupManager.table.rowManager.getRenderMode() == "classic" && !this.groupManager.table.options.pagination) {

        this.element.addClass("tabulator-group-visible");

        var prev = self.getElement();

        if (this.groupList.length) {

          this.groupList.forEach(function (group) {

            var rows = group.getHeadersAndRows();

            rows.forEach(function (row) {

              prev.after(row.getElement());

              row.initialize();

              prev = row.getElement();
            });
          });
        } else {

          self.rows.forEach(function (row) {

            prev.after(row.getElement());

            row.initialize();

            prev = row.getElement();
          });
        }

        this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex());
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

    Group.prototype.generateGroupHeaderContents = function () {

      var data = [];

      this.rows.forEach(function (row) {

        data.push(row.getData());
      });

      this.elementContents = this.generator(this.key, this.getRowCount(), data, this.getComponent());

      this.element.empty().append(this.elementContents).prepend(this.arrowElement);
    };

    ////////////// Standard Row Functions //////////////


    Group.prototype.getElement = function () {

      this.addBindingsd = false;

      this._visSet();

      if (this.visible) {

        this.element.addClass("tabulator-group-visible");
      } else {

        this.element.removeClass("tabulator-group-visible");
      }

      this.element.children().detach();

      this.generateGroupHeaderContents();

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

    Group.prototype.getGroup = function () {

      return this;
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


      this.displayIndex = 0; //index in display pipeline

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


      self.table.extensions.localize.bind("groups|item", function (langValue, lang) {

        self.headerGenerator[0] = function (value, count, data) {
          //header layout function


          return (typeof value === "undefined" ? "" : value) + "<span>(" + count + " " + (count === 1 ? langValue : lang.groups.items) + ")</span>";
        };
      });

      this.groupIDLookups = [];

      if (Array.isArray(groupBy) || groupBy) {

        if (this.table.extExists("columnCalcs") && this.table.options.columnCalcs != "table" && this.table.options.columnCalcs != "both") {

          this.table.extensions.columnCalcs.removeCalcs();
        }
      } else {

        if (this.table.extExists("columnCalcs") && this.table.options.columnCalcs != "group") {

          var cols = this.table.columnManager.getRealColumns();

          cols.forEach(function (col) {

            if (col.definition.topCalc) {

              self.table.extensions.columnCalcs.initializeTopRow();
            }

            if (col.definition.bottomCalc) {

              self.table.extensions.columnCalcs.initializeBottomRow();
            }
          });
        }
      }

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

        self.groupIDLookups.push({

          field: typeof group === "function" ? false : group,

          func: lookupFunc

        });
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

      this.initialized = true;
    };

    GroupRows.prototype.setDisplayIndex = function (index) {

      this.displayIndex = index;
    };

    GroupRows.prototype.getDisplayIndex = function () {

      return this.displayIndex;
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

      this.groupList.forEach(function (group) {

        groupComponents.push(group.getComponent());
      });

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

        self.assignRowToGroup(row, oldGroups);
      });
    };

    GroupRows.prototype.assignRowToGroup = function (row, oldGroups) {

      var groupID = this.groupIDLookups[0].func(row.getData()),
          oldGroups = oldGroups || [],
          newGroupNeeded = !this.groups[groupID];

      if (newGroupNeeded) {

        var group = new Group(this, false, 0, groupID, this.groupIDLookups[0].field, this.headerGenerator[0], oldGroups[groupID]);

        this.groups[groupID] = group;

        this.groupList.push(group);
      }

      this.groups[groupID].addRow(row);

      return !newGroupNeeded;
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

        var displayIndex = self.table.rowManager.setDisplayRows(output, this.getDisplayIndex());

        if (displayIndex !== true) {

          this.setDisplayIndex(displayIndex);
        }

        self.table.rowManager.refreshActiveData("group", true, true);
      }

      return output;
    };

    GroupRows.prototype.scrollHeaders = function (left) {

      this.groupList.forEach(function (group) {

        group.arrowElement.css("margin-left", left);
      });
    };

    GroupRows.prototype.removeGroup = function (group) {

      var index;

      if (this.groups[group.key]) {

        delete this.groups[group.key];

        index = this.groupList.indexOf(group);

        if (index > -1) {

          this.groupList.splice(index, 1);
        }
      }
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

      this.history = this.history.slice(0, this.index + 1);

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

        this.table.options.historyUndo(action.type, action.component.getComponent(), action.data);

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

        this.table.options.historyRedo(action.type, action.component.getComponent(), action.data);

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

        action.component.deleteActual();
      },

      rowDelete: function rowDelete(action) {

        var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

        this._rebindRow(action.component, newRow);
      },

      rowMove: function rowMove(action) {

        this.table.rowManager.moveRowActual(action.component, this.table.rowManager.rows[action.data.pos], false);

        this.table.rowManager.redraw();
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

        action.component.deleteActual();
      },

      rowMove: function rowMove(action) {

        this.table.rowManager.moveRowActual(action.component, this.table.rowManager.rows[action.data.pos], false);

        this.table.rowManager.redraw();
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


      this.hasIndex = false;
    };

    HtmlTableImport.prototype.parseTable = function () {

      var self = this,
          element = self.table.element,
          options = self.table.options,
          columns = options.columns,
          headers = $("th", element),
          rows = $("tbody tr", element),
          data = [];

      self.hasIndex = false;

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


        if (!self.hasIndex) {

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

        // //check for tablator inline options


        self._extractOptions(header, col);

        for (var i in attributes) {

          var attrib = attributes[i],
              name;

          if (attrib && attrib.name && attrib.name.indexOf("tabulator-") === 0) {

            name = attrib.name.replace("tabulator-", "");

            col[name] = self._attribValue(attrib.value);
          }
        }

        $("td:eq(" + index + ")", rows).data("field", col.field);

        if (col.field == self.table.options.index) {

          self.hasIndex = true;
        }

        if (!exists) {

          self.table.options.columns.push(col);
        }
      });
    };

    //generate blank headers


    HtmlTableImport.prototype._generateBlankHeaders = function (element) {

      var self = this,
          headers = $("tr:first td", element),
          rows = $("tbody tr", element);

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

      this.keyupBinding = false;

      this.keydownBinding = false;
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

      this.keyupBinding = function (e) {

        var code = e.keyCode;

        var bindings = self.watchKeys[code];

        if (bindings) {

          self.pressedKeys.push(code);

          bindings.forEach(function (binding) {

            self.checkBinding(e, binding);
          });
        }
      };

      this.keydownBinding = function (e) {

        var code = e.keyCode;

        var bindings = self.watchKeys[code];

        if (bindings) {

          var index = self.pressedKeys.indexOf(code);

          if (index > -1) {

            self.pressedKeys.splice(index, 1);
          }
        }
      };

      this.table.element.on("keydown", this.keyupBinding);

      this.table.element.on("keyup", this.keydownBinding);
    };

    Keybindings.prototype.clearBindings = function () {

      if (this.keyupBinding) {

        this.table.element.off("keydown", this.keyupBinding);
      }

      if (this.keydownBinding) {

        this.table.element.off("keyup", this.keydownBinding);
      }
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

      redo: "ctrl + 89",

      copyToClipboard: "ctrl + 67"

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

            rowManager.scrollToRow(rowManager.getDisplayRows()[0]);
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

            rowManager.scrollToRow(rowManager.getDisplayRows()[rowManager.displayRowsCount - 1]);
          }
        }

        this.table.element.focus();
      },

      scrollToStart: function scrollToStart(e) {

        var rowManager = this.table.rowManager;

        e.preventDefault();

        if (rowManager.displayRowsCount) {

          rowManager.scrollToRow(rowManager.getDisplayRows()[0]);
        }

        this.table.element.focus();
      },

      scrollToEnd: function scrollToEnd(e) {

        var rowManager = this.table.rowManager;

        e.preventDefault();

        if (rowManager.displayRowsCount) {

          rowManager.scrollToRow(rowManager.getDisplayRows()[rowManager.displayRowsCount - 1]);
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
      },

      copyToClipboard: function copyToClipboard(e) {

        if (!this.table.extensions.edit.currentCell) {

          if (this.table.extExists("clipboard", true)) {

            this.table.extensions.clipboard.copy(!this.table.options.selectable || this.table.options.selectable == "highlight" ? "active" : "selected", null, null, null, true);
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


      this.startY = 0; //starting Y position within header element


      this.startX = 0; //starting X position within header element


      this.moveHover = this.moveHover.bind(this);

      this.endMove = this.endMove.bind(this);

      this.tableRowDropEvent = false;

      this.connection = false;

      this.connections = [];

      this.connectedTable = false;

      this.connectedRow = false;
    };

    MoveRows.prototype.initialize = function (handle) {

      this.connection = this.table.options.movableRowsConnectedTables;
    };

    MoveRows.prototype.setHandle = function (handle) {

      this.hasHandle = handle;
    };

    MoveRows.prototype.initializeRow = function (row) {

      var self = this,
          config = {};

      //inter table drag drop


      config.mouseup = function (e) {

        self.tableRowDrop(e, row);
      }.bind(self);

      //same table drag drop


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

      self.table.rowManager.getDisplayRows().forEach(function (row) {

        if (row.type === "row" && row.extensions.moveRow.mousemove) {

          row.element.on("mousemove", row.extensions.moveRow.mousemove);
        }
      });
    };

    MoveRows.prototype._unbindMouseMove = function () {

      var self = this;

      self.table.rowManager.getDisplayRows().forEach(function (row) {

        if (row.type === "row" && row.extensions.moveRow.mousemove) {

          row.element.off("mousemove", row.extensions.moveRow.mousemove);
        }
      });
    };

    MoveRows.prototype.startMove = function (e, row) {

      var element = row.getElement();

      this.setStartPosition(e, row);

      this.moving = row;

      this.table.element.addClass("tabulator-block-select");

      //create placeholder


      this.placeholderElement.css({

        width: row.getWidth(),

        height: row.getHeight()

      });

      if (!this.connection) {

        element.before(this.placeholderElement);

        element.detach();
      } else {

        this.table.element.addClass("tabulator-movingrow-sending");

        this.connectToTables(row);
      }

      //create hover element


      this.hoverElement = element.clone();

      this.hoverElement.addClass("tabulator-moving");

      if (this.connection) {

        $("body").append(this.hoverElement);

        this.hoverElement.css({

          "left": 0,

          "top": 0,

          "width": this.table.element.innerWidth(),

          "white-space": "nowrap",

          "overflow": "hidden",

          "pointer-events": "none"

        });
      } else {

        this.table.rowManager.getTableElement().append(this.hoverElement);

        this.hoverElement.css({

          "left": 0,

          "top": 0

        });

        this._bindMouseMove();
      }

      $("body").on("mousemove", this.moveHover);

      $("body").on("mouseup", this.endMove);

      this.moveHover(e);
    };

    MoveRows.prototype.setStartPosition = function (e, row) {

      var element, position;

      element = row.getElement();

      if (this.connection) {

        position = element[0].getBoundingClientRect();

        this.startX = position.left - e.pageX + window.scrollX;

        this.startY = position.top - e.pageY + window.scrollY;
      } else {

        this.startY = e.pageY - element.offset().top;
      }
    };

    MoveRows.prototype.endMove = function (column) {

      this._unbindMouseMove();

      if (!this.connection) {

        this.placeholderElement.after(this.moving.getElement());

        this.placeholderElement.detach();
      }

      this.hoverElement.detach();

      this.table.element.removeClass("tabulator-block-select");

      if (this.toRow) {

        this.table.rowManager.moveRow(this.moving, this.toRow, this.toRowAfter);
      }

      this.moving = false;

      this.toRow = false;

      this.toRowAfter = false;

      $("body").off("mousemove", this.moveHover);

      $("body").off("mouseup", this.endMove);

      if (this.connection) {

        this.table.element.removeClass("tabulator-movingrow-sending");

        this.disconnectFromTables();
      }
    };

    MoveRows.prototype.moveRow = function (row, after) {

      this.toRow = row;

      this.toRowAfter = after;
    };

    MoveRows.prototype.moveHover = function (e) {

      if (this.connection) {

        this.moveHoverConnections.call(this, e);
      } else {

        this.moveHoverTable.call(this, e);
      }
    };

    MoveRows.prototype.moveHoverTable = function (e) {

      var rowHolder = this.table.rowManager.getElement(),
          scrollTop = rowHolder.scrollTop(),
          yPos = e.pageY - rowHolder.offset().top + scrollTop,
          scrollPos;

      this.hoverElement.css({

        "top": yPos - this.startY

      });
    };

    MoveRows.prototype.moveHoverConnections = function (e) {

      this.hoverElement.css({

        "left": this.startX + e.pageX,

        "top": this.startY + e.pageY

      });
    };

    //establish connection with other tables


    MoveRows.prototype.connectToTables = function (row) {

      var self = this,
          connections = this.table.extensions.comms.getConnections(this.connection);

      this.table.options.movableRowsSendingStart(connections);

      this.table.extensions.comms.send(this.connection, "moveRow", "connect", {

        row: row

      });
    };

    //disconnect from other tables


    MoveRows.prototype.disconnectFromTables = function () {

      var self = this,
          connections = this.table.extensions.comms.getConnections(this.connection);

      this.table.options.movableRowsSendingStop(connections);

      this.table.extensions.comms.send(this.connection, "moveRow", "disconnect");
    };

    //accept incomming connection


    MoveRows.prototype.connect = function (table, row) {

      var self = this;

      if (!this.connectedTable) {

        this.connectedTable = table;

        this.connectedRow = row;

        this.table.element.addClass("tabulator-movingrow-receiving");

        self.table.rowManager.getDisplayRows().forEach(function (row) {

          if (row.type === "row" && row.extensions.moveRow && row.extensions.moveRow.mouseup) {

            row.element.on("mouseup", row.extensions.moveRow.mouseup);
          }
        });

        self.tableRowDropEvent = self.tableRowDrop.bind(self);

        self.table.element.on("mouseup", self.tableRowDropEvent);

        this.table.options.movableRowsReceivingStart(row, table);

        return true;
      } else {

        console.warn("Move Row Error - Table cannot accept connection, already connected to table:", this.connectedTable);

        return false;
      }
    };

    //close incomming connection


    MoveRows.prototype.disconnect = function (table) {

      var self = this;

      if (table === this.connectedTable) {

        this.connectedTable = false;

        this.connectedRow = false;

        this.table.element.removeClass("tabulator-movingrow-receiving");

        self.table.rowManager.getDisplayRows().forEach(function (row) {

          if (row.type === "row" && row.extensions.moveRow && row.extensions.moveRow.mouseup) {

            row.element.off("mouseup", row.extensions.moveRow.mouseup);
          }
        });

        self.table.element.off("mouseup", self.tableRowDropEvent);

        this.table.options.movableRowsReceivingStop(table);
      } else {

        console.warn("Move Row Error - trying to disconnect from non connected table");
      }
    };

    MoveRows.prototype.dropComplete = function (table, row, success) {

      var sender = false;

      if (success) {

        switch (_typeof(this.table.options.movableRowsSender)) {

          case "string":

            sender = this.senders[this.table.options.movableRowsSender];

            break;

          case "function":

            sender = this.table.options.movableRowsSender;

            break;

        }

        if (sender) {

          sender.call(this, this.moving.getComponent(), row ? row.getComponent() : undefined, table);
        } else {

          if (this.table.options.movableRowsSender) {

            console.warn("Mover Row Error - no matching sender found:", this.table.options.movableRowsSender);
          }
        }

        this.table.options.movableRowsSent(this.moving.getComponent(), row ? row.getComponent() : undefined, table);
      } else {

        this.table.options.movableRowsSentFailed(this.moving.getComponent(), row ? row.getComponent() : undefined, table);
      }

      this.endMove();
    };

    MoveRows.prototype.tableRowDrop = function (e, row) {

      var receiver = false,
          success = false;

      e.stopImmediatePropagation();

      switch (_typeof(this.table.options.movableRowsReceiver)) {

        case "string":

          receiver = this.receivers[this.table.options.movableRowsReceiver];

          break;

        case "function":

          receiver = this.table.options.movableRowsReceiver;

          break;

      }

      if (receiver) {

        success = receiver.call(this, this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
      } else {

        console.warn("Mover Row Error - no matching receiver found:", this.table.options.movableRowsReceiver);
      }

      if (success) {

        this.table.options.movableRowsReceived(this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
      } else {

        this.table.options.movableRowsReceivedFailed(this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
      }

      this.table.extensions.comms.send(this.connectedTable, "moveRow", "dropcomplete", {

        row: row,

        success: success

      });
    };

    MoveRows.prototype.receivers = {

      insert: function insert(fromRow, toRow, fromTable) {

        this.table.addRow(fromRow.getData(), undefined, toRow);

        return true;
      },

      add: function add(fromRow, toRow, fromTable) {

        this.table.addRow(fromRow.getData());

        return true;
      },

      update: function update(fromRow, toRow, fromTable) {

        if (toRow) {

          toRow.update(fromRow.getData());

          return true;
        }

        return false;
      },

      replace: function replace(fromRow, toRow, fromTable) {

        if (toRow) {

          this.table.addRow(fromRow.getData(), undefined, toRow);

          toRow.delete();

          return true;
        }

        return false;
      }

    };

    MoveRows.prototype.senders = {

      delete: function _delete(fromRow, toRow, toTable) {

        fromRow.delete();
      }

    };

    MoveRows.prototype.commsReceived = function (table, action, data) {

      switch (action) {

        case "connect":

          return this.connect(table, data.row);

          break;

        case "disconnect":

          return this.disconnect(table);

          break;

        case "dropcomplete":

          return this.dropComplete(table, data.row, data.success);

          break;

      }
    };

    Tabulator.registerExtension("moveRow", MoveRows);

    var Mutator = function Mutator(table) {

      this.table = table; //hold Tabulator object


      this.allowedTypes = ["", "data", "edit", "clipboard"]; //list of muatation types

    };

    //initialize column mutator


    Mutator.prototype.initializeColumn = function (column) {

      var self = this,
          match = false,
          config = {};

      this.mapDepricatedFunctionality(column);

      this.allowedTypes.forEach(function (type) {

        var key = "mutator" + (type.charAt(0).toUpperCase() + type.slice(1)),
            mutator;

        if (column.definition[key]) {

          mutator = self.lookupMutator(column.definition[key]);

          if (mutator) {

            match = true;

            config[key] = {

              mutator: mutator,

              params: column.definition[key + "Params"] || {}

            };
          }
        }
      });

      if (match) {

        column.extensions.mutate = config;
      }
    };

    Mutator.prototype.mapDepricatedFunctionality = function (column) {

      var key = "";

      if (column.definition.mutateType) {

        if (column.definition.mutateType != "all") {

          key = "mutator" + (type.charAt(0).toUpperCase() + type.slice(1));

          column.defintion[key] = column.definition.mutator;

          delete column.definition.mutator;

          console.warn("The %cmutateType='" + column.definition.mutateType + "'' %coption has been depricated and will be removed in version 4.0, use the %c " + key + "%c option instead", "font-weight:bold;", "font-weight:regular;", "font-weight:bold;", "font-weight:regular;");
        } else {

          console.warn("The %cmutateType='all'' %coption has been depricated and will be removed in version 4.0, it is no longer needed", "font-weight:bold;", "font-weight:regular;");
        }
      }
    };

    Mutator.prototype.lookupMutator = function (value) {

      var mutator = false;

      //set column mutator


      switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {

        case "string":

          if (this.mutators[value]) {

            mutator = this.mutators[value];
          } else {

            console.warn("Mutator Error - No such mutator found, ignoring: ", value);
          }

          break;

        case "function":

          mutator = value;

          break;

      }

      return mutator;
    };

    //apply mutator to row


    Mutator.prototype.transformRow = function (data, type) {

      var self = this,
          key = "mutator" + (type.charAt(0).toUpperCase() + type.slice(1));

      self.table.columnManager.traverse(function (column) {

        var mutator;

        if (column.extensions.mutate) {

          mutator = column.extensions.mutate[key] || column.extensions.mutate.mutator || false;

          if (mutator) {

            column.setFieldValue(data, mutator.mutator(column.getFieldValue(data), data, type, mutator.params, column.getComponent()));
          }
        }
      });

      return data;
    };

    //apply mutator to new cell value


    Mutator.prototype.transformCell = function (cell, value) {

      var mutator = cell.column.extensions.mutate.mutatorEdit || cell.column.extensions.mutate.mutator || false;

      if (mutator) {

        return mutator.mutator(value, cell.row.getData(), "edit", mutator.params, cell.getComponent());
      } else {

        return value;
      }
    };

    //default mutators


    Mutator.prototype.mutators = {};

    Tabulator.registerExtension("mutator", Mutator);

    var Page = function Page(table) {

      this.table = table; //hold Tabulator object


      this.element = $("<span class='tabulator-paginator'></span>");

      this.pagesElement = $("<span class='tabulator-pages'></span>");

      this.firstBut = $("<button class='tabulator-page' data-page='first' role='button' aria-label='' title='' type='button'></button>");

      this.prevBut = $("<button class='tabulator-page' data-page='prev' role='button' aria-label='' title='' type='button'></button>");

      this.nextBut = $("<button class='tabulator-page' data-page='next' role='button' aria-label='' title='' type='button'></button>");

      this.lastBut = $("<button class='tabulator-page' data-page='last' role='button' aria-label='' title='' type='button'></button>");

      this.mode = "local";

      this.progressiveLoad = false;

      this.size = 0;

      this.page = 1;

      this.count = 5;

      this.max = 1;

      this.paginator = false;

      this.displayIndex = 0; //index in display pipeline

    };

    //setup pageination


    Page.prototype.initialize = function (hidden) {

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


      self.table.extensions.localize.bind("pagination|first", function (value) {

        self.firstBut.html(value);
      });

      self.table.extensions.localize.bind("pagination|first_title", function (value) {

        self.firstBut.attr("aria-label", value).attr("title", value);
      });

      self.table.extensions.localize.bind("pagination|prev", function (value) {

        self.prevBut.html(value);
      });

      self.table.extensions.localize.bind("pagination|prev_title", function (value) {

        self.prevBut.attr("aria-label", value).attr("title", value);
      });

      self.table.extensions.localize.bind("pagination|next", function (value) {

        self.nextBut.html(value);
      });

      self.table.extensions.localize.bind("pagination|next_title", function (value) {

        self.nextBut.attr("aria-label", value).attr("title", value);
      });

      self.table.extensions.localize.bind("pagination|last", function (value) {

        self.lastBut.html(value);
      });

      self.table.extensions.localize.bind("pagination|last_title", function (value) {

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

      if (!self.table.options.paginationElement && !hidden) {

        self.table.footerManager.append(self.element, self);
      }

      //set default values


      self.mode = self.table.options.pagination;

      self.size = self.table.options.paginationSize || Math.floor(self.table.rowManager.getElement().innerHeight() / 24);

      self.count = self.table.options.paginationButtonCount;
    };

    Page.prototype.initializeProgressive = function (mode) {

      this.initialize(true);

      this.mode = "progressive_" + mode;

      this.progressiveLoad = true;
    };

    Page.prototype.setDisplayIndex = function (index) {

      this.displayIndex = index;
    };

    Page.prototype.getDisplayIndex = function () {

      return this.displayIndex;
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

      var leftSize = Math.floor((this.count - 1) / 2);

      var rightSize = Math.ceil((this.count - 1) / 2);

      var min = this.max - this.page + leftSize + 1 < this.count ? this.max - this.count + 1 : Math.max(this.page - leftSize, 1);

      var max = this.page <= rightSize ? Math.min(this.count, this.max) : Math.min(this.page + rightSize, this.max);

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

      var button = $("<button class='tabulator-page " + (page == self.page ? "active" : "") + "' data-page='" + page + "' role='button' type='button' aria-label='Show Page " + page + "'>" + page + "</button>");

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

        if (!this.progressiveLoad) {

          console.warn("Pagination Error - Next page would be greater than maximum page of " + this.max + ":", this.max + 1);
        }

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

      var left;

      switch (this.mode) {

        case "local":

          left = this.table.rowManager.scrollLeft;

          this.table.rowManager.refreshActiveData("page");

          this.table.rowManager.scrollHorizontal(left);

          this.table.options.pageLoaded(this.getPage());

          break;

        case "remote":

        case "progressive_load":

        case "progressive_scroll":

          this.table.extensions.ajax.blockActiveRequest();

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

        pageParams[this.paginationDataSentNames.sorters] = sorters;
      }

      //set filter data if defined


      if (this.table.extExists("filter")) {

        var filters = self.table.extensions.filter.getFilters(true, true);

        pageParams[this.paginationDataSentNames.filters] = filters;
      }

      self.table.extensions.ajax.setParams(pageParams);

      self.table.extensions.ajax.sendRequest(function (data) {

        self._parseRemoteData(data);
      }, this.progressiveLoad);

      self.table.extensions.ajax.setParams(oldParams);
    };

    Page.prototype._parseRemoteData = function (data) {

      var self = this,
          left,
          data,
          margin;

      if (data[this.paginationDataReceivedNames.last_page]) {

        if (data[this.paginationDataReceivedNames.data]) {

          this.max = parseInt(data[this.paginationDataReceivedNames.last_page]);

          if (this.progressiveLoad) {

            switch (this.mode) {

              case "progressive_load":

                this.table.rowManager.addRows(data[this.paginationDataReceivedNames.data]);

                if (this.page < this.max) {

                  setTimeout(function () {

                    self.nextPage();
                  }, self.table.options.ajaxProgressiveLoadDelay);
                }

                break;

              case "progressive_scroll":

                data = this.table.rowManager.getData().concat(data[this.paginationDataReceivedNames.data]);

                this.table.rowManager.setData(data, true);

                margin = this.table.options.ajaxProgressiveLoadScrollMargin || this.table.rowManager.element[0].clientHeight * 2;

                if (self.table.rowManager.element[0].scrollHeight <= self.table.rowManager.element[0].clientHeight + margin) {

                  self.nextPage();
                }

                break;

            }
          } else {

            left = this.table.rowManager.scrollLeft;

            this.table.rowManager.setData(data[this.paginationDataReceivedNames.data]);

            this.table.rowManager.scrollHorizontal(left);

            this.table.columnManager.scrollHorizontal(left);

            this.table.options.pageLoaded(this.getPage());
          }
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

      if (Math.ceil(footer.innerWidth()) - footer[0].scrollWidth < 0) {

        this.pagesElement.hide();
      } else {

        this.pagesElement.show();

        if (Math.ceil(footer.innerWidth()) - footer[0].scrollWidth < 0) {

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

    var Persistence = function Persistence(table) {

      this.table = table; //hold Tabulator object


      this.mode = "";

      this.id = "";

      this.persistProps = ["field", "width", "visible"];
    };

    //setup parameters


    Persistence.prototype.initialize = function (mode, id) {

      //determine persistent layout storage type


      this.mode = mode !== true ? mode : typeof window.localStorage !== 'undefined' ? "local" : "cookie";

      //set storage tag


      this.id = "tabulator-" + (id || this.table.element.attr("id") || "");
    };

    //load saved definitions


    Persistence.prototype.load = function (type, current) {

      var data = this.retreiveData(type);

      if (current) {

        data = data ? this.mergeDefinition(current, data) : current;
      }

      return data;
    };

    //retreive data from memory


    Persistence.prototype.retreiveData = function (type) {

      var data = "",
          id = this.id + (type === "columns" ? "" : "-" + type);

      switch (this.mode) {

        case "local":

          data = localStorage.getItem(id);

          break;

        case "cookie":

          //find cookie


          var cookie = document.cookie,
              cookiePos = cookie.indexOf(id + "="),
              end = void 0;

          //if cookie exists, decode and load column data into tabulator


          if (cookiePos > -1) {

            cookie = cookie.substr(cookiePos);

            end = cookie.indexOf(";");

            if (end > -1) {

              cookie = cookie.substr(0, end);
            }

            data = cookie.replace(id + "=", "");
          }

          break;

        default:

          console.warn("Persistance Load Error - invalid mode selected", this.mode);

      }

      return data ? JSON.parse(data) : false;
    };

    //merge old and new column defintions


    Persistence.prototype.mergeDefinition = function (oldCols, newCols) {

      var self = this,
          output = [];

      // oldCols = oldCols || [];


      newCols = newCols || [];

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

      oldCols.forEach(function (column, i) {

        var from = self._findColumn(newCols, column);

        if (!from) {

          if (output.length > i) {

            output.splice(i, 0, column);
          } else {

            output.push(column);
          }
        }
      });

      return output;
    };

    //find matching columns


    Persistence.prototype._findColumn = function (columns, subject) {

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

    //save data


    Persistence.prototype.save = function (type) {

      var data = {};

      switch (type) {

        case "columns":

          data = this.parseColumns(this.table.columnManager.getColumns());

          break;

        case "filter":

          data = this.table.extensions.filter.getFilters();

          break;

        case "sort":

          data = this.validateSorters(this.table.extensions.sort.getSort());

          break;

      }

      var id = this.id + (type === "columns" ? "" : "-" + type);

      this.saveData(id, data);
    };

    //ensure sorters contain no function data


    Persistence.prototype.validateSorters = function (data) {

      data.forEach(function (item) {

        item.column = item.field;

        delete item.field;
      });

      return data;
    };

    //save data to chosed medium


    Persistence.prototype.saveData = function (id, data) {

      data = JSON.stringify(data);

      switch (this.mode) {

        case "local":

          localStorage.setItem(id, data);

          break;

        case "cookie":

          var expireDate = new Date();

          expireDate.setDate(expireDate.getDate() + 10000);

          //save cookie


          document.cookie = id + "=" + data + "; expires=" + expireDate.toUTCString();

          break;

        default:

          console.warn("Persistance Save Error - invalid mode selected", this.mode);

      }
    };

    //build premission list


    Persistence.prototype.parseColumns = function (columns) {

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

    Tabulator.registerExtension("persistence", Persistence);

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

          if (nearestColumn && self._checkResizability(nearestColumn)) {

            self.startColumn = column;

            self._mouseDown(e, nearestColumn);
          }
        });

        //reszie column on  double click


        handle.addEventListener("dblclick", function (e) {

          if (self._checkResizability(column)) {

            column.reinitializeWidth(true);
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

            if (prevColumn && self._checkResizability(prevColumn)) {

              self.startColumn = column;

              self._mouseDown(e, prevColumn);
            }
          }
        });

        //resize column on double click


        prevHandle.addEventListener("dblclick", function (e) {

          var nearestColumn, colIndex, prevColumn;

          nearestColumn = column.getFirstColumn();

          if (nearestColumn) {

            colIndex = self.table.columnManager.findColumnIndex(nearestColumn);

            prevColumn = colIndex > 0 ? self.table.columnManager.getColumnByIndex(colIndex - 1) : false;

            if (prevColumn && self._checkResizability(prevColumn)) {

              prevColumn.reinitializeWidth(true);
            }
          }
        });

        element.append(handle).append(prevHandle);
      }
    };

    ResizeColumns.prototype._checkResizability = function (column) {

      return typeof column.definition.resizable != "undefined" ? column.definition.resizable : this.table.options.resizableColumns;
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

        if (self.table.options.persistentLayout && self.table.extExists("persistence", true)) {

          self.table.extensions.persistence.save("columns");
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

    var ResizeRows = function ResizeRows(table) {

      this.table = table; //hold Tabulator object


      this.startColumn = false;

      this.startY = false;

      this.startHeight = false;

      this.handle = null;

      this.prevHandle = null;
    };

    ResizeRows.prototype.initializeRow = function (row) {

      var self = this;

      var handle = document.createElement('div');

      handle.className = "tabulator-row-resize-handle";

      var prevHandle = document.createElement('div');

      prevHandle.className = "tabulator-row-resize-handle prev";

      handle.addEventListener("click", function (e) {

        e.stopPropagation();
      });

      handle.addEventListener("mousedown", function (e) {

        self.startRow = row;

        self._mouseDown(e, row);
      });

      prevHandle.addEventListener("click", function (e) {

        e.stopPropagation();
      });

      prevHandle.addEventListener("mousedown", function (e) {

        var prevRow = self.table.rowManager.prevDisplayRow(row);

        if (prevRow) {

          self.startRow = prevRow;

          self._mouseDown(e, prevRow);
        }
      });

      row.getElement().append(handle).append(prevHandle);
    };

    ResizeRows.prototype._mouseDown = function (e, row) {

      var self = this;

      self.table.element.addClass("tabulator-block-select");

      function mouseMove(e) {

        row.setHeight(self.startHeight + (e.screenY - self.startY));
      }

      function mouseUp(e) {

        // //block editor from taking action while resizing is taking place


        // if(self.startColumn.extensions.edit){


        // 	self.startColumn.extensions.edit.blocked = false;


        // }


        $("body").off("mouseup", mouseMove);

        $("body").off("mousemove", mouseMove);

        self.table.element.removeClass("tabulator-block-select");

        self.table.options.rowResized(row.getComponent());
      }

      e.stopPropagation(); //prevent resize from interfereing with movable columns


      //block editor from taking action while resizing is taking place


      // if(self.startColumn.extensions.edit){


      // 	self.startColumn.extensions.edit.blocked = true;


      // }


      self.startY = e.screenY;

      self.startHeight = row.getHeight();

      $("body").on("mousemove", mouseMove);

      $("body").on("mouseup", mouseUp);
    };

    Tabulator.registerExtension("resizeRows", ResizeRows);

    var ResizeTable = function ResizeTable(table) {

      this.table = table; //hold Tabulator object


      this.binding = false;

      this.observer = false;
    };

    ResizeTable.prototype.initialize = function (row) {

      var table = this.table,
          observer;

      if (typeof ResizeObserver !== "undefined" && table.rowManager.getRenderMode() === "virtual") {

        this.observer = new ResizeObserver(function (entry) {

          table.redraw();
        });

        this.observer.observe(table.element[0]);
      } else {

        this.binding = function () {

          table.element.tabulator("redraw");
        };

        $(window).resize(this.binding);
      }
    };

    ResizeTable.prototype.clearBindings = function (row) {

      if (this.binding) {

        $(window).off("resize", this.binding);
      }

      if (this.observer) {

        this.observer.unobserve(this.table.element[0]);
      }
    };

    Tabulator.registerExtension("resizeTable", ResizeTable);

    var ResponsiveLayout = function ResponsiveLayout(table) {

      this.table = table; //hold Tabulator object


      this.columns = [];

      this.hiddenColumns = [];

      this.mode = "";

      this.index = 0;

      this.collapseFormatter = [];

      this.collapseStartOpen = true;
    };

    //generate resposive columns list


    ResponsiveLayout.prototype.initialize = function () {

      var columns = [];

      this.mode = this.table.options.responsiveLayout;

      this.collapseFormatter = this.table.options.responsiveLayoutCollapseFormatter || this.formatCollapsedData;

      this.collapseStartOpen = this.table.options.responsiveLayoutCollapseStartOpen;

      this.hiddenColumns = [];

      //detemine level of responsivity for each column


      this.table.columnManager.columnsByIndex.forEach(function (column, i) {

        if (column.extensions.responsive) {

          if (column.extensions.responsive.order && column.extensions.responsive.visible) {

            column.extensions.responsive.index = i;

            columns.push(column);

            if (!column.visible && this.mode === "collapse") {

              this.hiddenColumns.push(column);
            }
          }
        }
      });

      //sort list by responsivity


      columns = columns.reverse();

      columns = columns.sort(function (a, b) {

        var diff = b.extensions.responsive.order - a.extensions.responsive.order;

        return diff || b.extensions.responsive.index - a.extensions.responsive.index;
      });

      this.columns = columns;

      if (this.mode === "collapse") {

        this.generateCollapsedContent();
      }
    };

    //define layout information


    ResponsiveLayout.prototype.initializeColumn = function (column) {

      var def = column.getDefinition();

      column.extensions.responsive = { order: typeof def.responsive === "undefined" ? 1 : def.responsive, visible: def.visible === false ? false : true };
    };

    ResponsiveLayout.prototype.layoutRow = function (row) {

      var rowEl = row.getElement(),
          el = $("<div class='tabulator-responsive-collapse'></div>");

      if (!rowEl.hasClass("tabulator-calcs")) {

        row.extensions.responsiveLayout = {

          element: el

        };

        if (!this.collapseStartOpen) {

          el.hide();
        }

        row.getElement().append(el);

        this.generateCollapsedRowContent(row);
      }
    };

    //update column visibility


    ResponsiveLayout.prototype.updateColumnVisibility = function (column, visible) {

      var index;

      if (column.extensions.responsive) {

        column.extensions.responsive.visible = visible;

        this.initialize();
      }
    };

    ResponsiveLayout.prototype.hideColumn = function (column) {

      column.hide(false, true);

      if (this.mode === "collapse") {

        this.hiddenColumns.unshift(column);

        this.generateCollapsedContent();
      }
    };

    ResponsiveLayout.prototype.showColumn = function (column) {

      var index;

      column.show(false, true);

      //set column width to prevent calculation loops on uninitialized columns


      column.setWidth(column.getWidth());

      if (this.mode === "collapse") {

        index = this.hiddenColumns.indexOf(column);

        if (index > -1) {

          this.hiddenColumns.splice(index, 1);
        }

        this.generateCollapsedContent();
      }
    };

    //redraw columns to fit space


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

            self.hideColumn(column);

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

                self.showColumn(_column);

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

    ResponsiveLayout.prototype.generateCollapsedContent = function () {

      var self = this,
          rows = this.table.rowManager.getDisplayRows();

      rows.forEach(function (row) {

        self.generateCollapsedRowContent(row);
      });
    };

    ResponsiveLayout.prototype.generateCollapsedRowContent = function (row) {

      var el;

      if (row.extensions.responsiveLayout) {

        el = row.extensions.responsiveLayout.element;

        el.empty();

        el.append(this.collapseFormatter(this.generateCollapsedRowData(row)));
      }
    };

    ResponsiveLayout.prototype.generateCollapsedRowData = function (row) {

      var self = this,
          data = row.getData(),
          output = {},
          mockCellComponent;

      this.hiddenColumns.forEach(function (column) {

        var value = column.getFieldValue(data);

        if (column.definition.title && column.field) {

          if (column.extensions.format && self.table.options.responsiveLayoutCollapseUseFormatters) {

            mockCellComponent = {

              value: false,

              data: {},

              getValue: function getValue() {

                return value;
              },

              getData: function getData() {

                return data;
              },

              getElement: function getElement() {

                return $();
              },

              getRow: function getRow() {

                return row.getComponent();
              },

              getColumn: function getColumn() {

                return column.getComponent();
              }

            };

            output[column.definition.title] = column.extensions.format.formatter.call(self.table.extensions.format, mockCellComponent, column.extensions.format.params);
          } else {

            output[column.definition.title] = value;
          }
        }
      });

      return output;
    };

    ResponsiveLayout.prototype.formatCollapsedData = function (data) {

      var list = $("<table></table>");

      for (var key in data) {

        list.append("<tr><td><strong>" + key + "</strong></td><td>" + data[key] + "</td></tr>");
      }

      return Object.keys(data).length ? list : "";
    };

    Tabulator.registerExtension("responsiveLayout", ResponsiveLayout);

    var SelectRow = function SelectRow(table) {

      this.table = table; //hold Tabulator object


      this.selecting = false; //flag selecting in progress


      this.selectPrev = []; //hold previously selected element for drag drop selection


      this.selectedRows = []; //hold selected rows

    };

    SelectRow.prototype.clearSelectionData = function (silent) {

      this.selecting = false;

      this.selectPrev = [];

      this.selectedRows = [];

      if (!silent) {

        this._rowSelectionChanged();
      }
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

            self._selectRow(row, false, true);
          });

          self._rowSelectionChanged();

          break;

        case "boolean":

          if (rows === true) {

            self.table.rowManager.activeRows.forEach(function (row) {

              self._selectRow(row, false, true);
            });

            self._rowSelectionChanged();
          }

          break;

        default:

          if (Array.isArray(rows)) {

            rows.forEach(function (row) {

              self._selectRow(row);
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

            self._deselectRow(self.selectedRows[0]);
          } else {

            return false;
          }
        }
      }

      var row = self.table.rowManager.findRow(rowInfo);

      if (row) {

        if (self.selectedRows.indexOf(row) == -1) {

          var self = this;

          row.extensions.select.selected = true;

          row.getElement().addClass("tabulator-selected");

          self.selectedRows.push(row);

          if (!silent) {

            self.table.options.rowSelected(row.getComponent());

            self._rowSelectionChanged();
          }
        }
      } else {

        if (!silent) {

          console.warn("Selection Error - No such row found, ignoring selection:" + rowInfo);
        }
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

            self._deselectRow(row);
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

        if (!silent) {

          console.warn("Deselection Error - No such row found, ignoring selection:" + rowInfo);
        }
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

      column.extensions.sort = {

        sorter: sorter, dir: "none",

        params: column.definition.sorterParams || {},

        startingDir: column.definition.headerSortStartingDir || "asc"

      };

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

            dir = column.extensions.sort.dir == "asc" ? "desc" : column.extensions.sort.dir == "desc" ? "asc" : column.extensions.sort.startingDir;

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

      if (this.table.options.persistentSort && this.table.extExists("persistence", true)) {

        this.table.extensions.persistence.save("sort");
      }
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
      } else {

        self.sortList.forEach(function (item, i) {

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

        var alignEmptyValues = params.alignEmptyValues;

        var emptyAlign = 0;

        var a = parseFloat(String(a).replace(",", ""));

        var b = parseFloat(String(b).replace(",", ""));

        //handle non numeric values


        if (isNaN(a)) {

          emptyAlign = isNaN(b) ? 0 : -1;
        } else if (isNaN(b)) {

          emptyAlign = 1;
        } else {

          //compare valid values


          return a - b;
        }

        //fix empty values in position


        if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {

          emptyAlign *= -1;
        }

        return emptyAlign;
      },

      //sort strings


      string: function string(a, b, aRow, bRow, column, dir, params) {

        var alignEmptyValues = params.alignEmptyValues;

        var emptyAlign = 0;

        var locale;

        //handle empty values


        if (!a) {

          emptyAlign = !b ? 0 : -1;
        } else if (!b) {

          emptyAlign = 1;
        } else {

          //compare valid values


          switch (_typeof(params.locale)) {

            case "boolean":

              if (params.locale) {

                locale = this.table.extensions.localize.getLocale();
              }

              break;

            case "string":

              locale = params.locale;

              break;

          }

          return String(a).toLowerCase().localeCompare(String(b).toLowerCase(), locale);
        }

        //fix empty values in position


        if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {

          emptyAlign *= -1;
        }

        return emptyAlign;
      },

      //sort date


      date: function date(a, b, aRow, bRow, column, dir, params) {

        var self = this;

        var format = params.format || "DD/MM/YYYY";

        var alignEmptyValues = params.alignEmptyValues;

        var emptyAlign = 0;

        if (typeof moment != "undefined") {

          a = moment(a, format);

          b = moment(b, format);

          if (!a.isValid()) {

            emptyAlign = !b.isValid() ? 0 : -1;
          } else if (!b.isValid()) {

            emptyAlign = 1;
          } else {

            //compare valid values


            return a - b;
          }

          //fix empty values in position


          if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {

            emptyAlign *= -1;
          }

          return emptyAlign;
        } else {

          console.error("Sort Error - 'date' sorter is dependant on moment.js");
        }
      },

      //sort hh:mm formatted times


      time: function time(a, b, aRow, bRow, column, dir, params) {

        var self = this;

        var format = params.format || "hh:mm";

        var alignEmptyValues = params.alignEmptyValues;

        var emptyAlign = 0;

        if (typeof moment != "undefined") {

          a = moment(a, format);

          b = moment(b, format);

          if (!a.isValid()) {

            emptyAlign = !b.isValid() ? 0 : -1;
          } else if (!b.isValid()) {

            emptyAlign = 1;
          } else {

            //compare valid values


            return a - b;
          }

          //fix empty values in position


          if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {

            emptyAlign *= -1;
          }

          return emptyAlign;
        } else {

          console.error("Sort Error - 'date' sorter is dependant on moment.js");
        }
      },

      //sort datetime


      datetime: function datetime(a, b, aRow, bRow, column, dir, params) {

        var self = this;

        var format = params.format || "DD/MM/YYYY hh:mm:ss";

        var alignEmptyValues = params.alignEmptyValues;

        var emptyAlign = 0;

        if (typeof moment != "undefined") {

          a = moment(a, format);

          b = moment(b, format);

          if (!a.isValid()) {

            emptyAlign = !b.isValid() ? 0 : -1;
          } else if (!b.isValid()) {

            emptyAlign = 1;
          } else {

            //compare valid values


            return a - b;
          }

          //fix empty values in position


          if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {

            emptyAlign *= -1;
          }

          return emptyAlign;
        } else {

          console.error("Sort Error - 'date' sorter is dependant on moment.js");
        }
      },

      //sort booleans


      boolean: function boolean(a, b, aRow, bRow, column, dir, params) {

        var el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;

        var el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

        return el1 - el2;
      },

      //sort if element contains any data


      array: function array(a, b, aRow, bRow, column, dir, params) {

        var el1 = 0;

        var el2 = 0;

        var type = params.type || "length";

        var alignEmptyValues = params.alignEmptyValues;

        var emptyAlign = 0;

        function calc(value) {

          switch (type) {

            case "length":

              return value.length;

              break;

            case "sum":

              return value.reduce(function (c, d) {

                return c + d;
              });

              break;

            case "max":

              return Math.max.apply(null, value);

              break;

            case "min":

              return Math.min.apply(null, value);

              break;

            case "avg":

              return value.reduce(function (c, d) {

                return c + d;
              }) / value.length;

              break;

          }
        }

        //handle non array values


        if (!Array.isArray(a)) {

          alignEmptyValues = !Array.isArray(b) ? 0 : -1;
        } else if (!Array.isArray(b)) {

          alignEmptyValues = 1;
        } else {

          //compare valid values


          el1 = a ? calc(a) : 0;

          el2 = b ? calc(b) : 0;

          return el1 - el2;
        }

        //fix empty values in position


        if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {

          emptyAlign *= -1;
        }

        return emptyAlign;
      },

      //sort if element contains any data


      exists: function exists(a, b, aRow, bRow, column, dir, params) {

        var el1 = typeof a == "undefined" ? 0 : 1;

        var el2 = typeof b == "undefined" ? 0 : 1;

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

        var alignEmptyValues = params.alignEmptyValues;

        var emptyAlign = 0;

        //handle empty values


        if (!as && as !== 0) {

          emptyAlign = !bs && bs !== 0 ? 0 : -1;
        } else if (!bs && bs !== 0) {

          emptyAlign = 1;
        } else {

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
        }

        //fix empty values in position


        if (alignEmptyValues === "top" && dir === "desc" || alignEmptyValues === "bottom" && dir === "asc") {

          emptyAlign *= -1;
        }

        return emptyAlign;
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

          var _type = parts.shift();

          var params = parts.join();

          return this._buildValidator(_type, params);

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

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        value = Number(value);

        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
      },

      //is float


      float: function float(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        value = Number(value);

        return typeof value === 'number' && isFinite(value) && value % 1 !== 0;;
      },

      //must be a number


      numeric: function numeric(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        return !isNaN(value);
      },

      //must be a string


      string: function string(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        return isNaN(value);
      },

      //maximum value


      max: function max(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        return parseFloat(value) <= parameters;
      },

      //minimum value


      min: function min(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        return parseFloat(value) >= parameters;
      },

      //minimum string length


      minLength: function minLength(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        return String(value).length >= parameters;
      },

      //maximum string length


      maxLength: function maxLength(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        return String(value).length <= parameters;
      },

      //in provided value list


      in: function _in(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        if (typeof parameters == "string") {

          parameters = parameters.split("|");
        }

        return value === "" || parameters.indexOf(value) > -1;
      },

      //must match provided regex


      regex: function regex(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        var reg = new RegExp(parameters);

        return reg.test(value);
      },

      //value must be unique in this column


      unique: function unique(cell, value, parameters) {

        if (value === "" || value === null || typeof value === "undefined") {

          return true;
        }

        var unique = true;

        var cellData = cell.getData();

        var column = cell.getColumn()._getSelf();

        this.table.rowManager.rows.forEach(function (row) {

          var data = row.getData();

          if (data !== cellData) {

            if (value == column.getFieldValue(data)) {

              unique = false;
            }
          }
        });

        return unique;
      },

      //must have a value


      required: function required(cell, value, parameters) {

        return value !== "" & value !== null && typeof value !== "undefined";
      }

    };

    Tabulator.registerExtension("validate", Validate);
  })();

  $.widget("ui.tabulator", Tabulator);
});