'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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


    this.element = $("<div class='tabulator-header'></div>"); //containing element


    this.rowManager = null; //hold row manager object


    this.columns = []; // column definition object


    this.columnsByIndex = []; //columns by index


    this.columnsByField = []; //columns by field


    this.scrollLeft = 0;
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

    self.element.empty();

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

        this.element.prepend(column.getElement());
      } else {

        this.columns.push(column);

        this.element.append(column.getElement());
      }
    }
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
      } else if (subject instanceof jQuery) {

        //subject is a jquery element of the column header


        var match = self.columns.find(function (column) {

          return column.element === subject;
        });

        return match || false;
      } else {

        //subject is public column object


        return subject._getSelf() || false;
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

    this._moveColumnInArray(this.columnsByIndex, from, to, after);

    this.table.options.columnMoved(from.getComponent());

    if (this.table.options.persistentLayout && this.table.extExists("persistentLayout", true)) {

      this.table.extensions.persistentLayout.save();
    }
  };

  ColumnManager.prototype._moveColumnInArray = function (columns, from, to, after) {

    var fromIndex = columns.indexOf(from),
        toIndex;

    if (fromIndex > -1) {

      columns.splice(fromIndex, 1);

      toIndex = columns.indexOf(to);

      if (toIndex > -1) {

        if (after) {

          columns.splice(toIndex + 1, 0, from);
        } else {

          columns.splice(toIndex, 0, from);
        }
      } else {

        columns.splice(fromIndex, 0, from);
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


  //resize columns to fit data in cells


  ColumnManager.prototype.fitToData = function () {

    var self = this;

    self.columnsByIndex.forEach(function (column) {

      column.fitToData();
    });
  };

  //resize columns to fill the table element


  ColumnManager.prototype.fitToTable = function () {

    var self = this;

    var totalWidth = self.table.element.innerWidth(); //table element width


    var fixedWidth = 0; //total width of columns with a defined width


    var flexWidth = 0; //total width available to flexible columns


    var flexColWidth = 0; //desired width of flexible columns


    var flexColumns = []; //array of flexible width columns


    var gapFill = 0; //number of pixels to be added to final column to close and half pixel gaps


    //adjust for vertical scrollbar if present


    if (self.rowManager.element[0].scrollHeight > self.rowManager.element.innerHeight()) {

      totalWidth -= self.rowManager.element[0].offsetWidth - self.rowManager.element[0].clientWidth;
    }

    self.columnsByIndex.forEach(function (column) {

      var width, minWidth, colWidth;

      if (column.visible) {

        width = column.definition.width;

        if (width) {

          minWidth = parseInt(column.minWidth);

          if (typeof width == "string") {

            if (width.indexOf("%") > -1) {

              colWidth = totWidth / 100 * parseInt(width);
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

    //calculate correctl column size


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
  };

  ColumnManager.prototype.addColumn = function (definition, before, nextToColumn) {

    this._addColumn(definition, before, nextToColumn);

    this._reIndexColumns();

    if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

      this.table.extensions.responsiveLayout.initialize();
    }

    this.redraw();

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

      this._verticalAlignHeaders();

      this.table.rowManager.resetScroll();

      this.table.rowManager.reinitialize();
    }

    if (this.table.options.fitColumns) {

      this.fitToTable();
    } else {

      if (force) {

        this.fitToData();
      }

      if (this.table.options.responsiveLayout && this.table.extExists("responsiveLayout", true)) {

        this.table.extensions.responsiveLayout.update();
      }
    }

    if (this.table.extExists("frozenColumns")) {

      this.table.extensions.frozenColumns.layout();
    }

    if (force) {

      if (this.table.options.persistentLayout && this.table.extExists("persistentLayout", true)) {

        this.table.extensions.persistentLayout.save();
      }
    }
  };

  //public column object

  var ColumnComponent = function ColumnComponent(column) {

    var obj = {

      type: "ColumnComponent", //type of element

      getElement: function getElement() {

        return column.getElement();
      },

      getDefinition: function getDefinition() {

        return column.getDefinition();
      },

      getField: function getField() {

        return column.getField();
      },

      getCells: function getCells() {

        var cells = [];

        column.cells.forEach(function (cell) {

          cells.push(cell.getComponent());
        });

        return cells;
      },

      getVisibility: function getVisibility() {

        return column.visible;
      },

      show: function show() {

        column.show();
      },

      hide: function hide() {

        column.hide();
      },

      toggle: function toggle() {

        if (column.visible) {

          column.hide();
        } else {

          column.show();
        }
      },

      delete: function _delete() {

        column.delete();
      },

      _getSelf: function _getSelf() {

        return column;
      }

    };

    return obj;
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

    this.extensions = {}; //hold extension variables;


    this.cellEvents = {

      cellClick: false,

      cellDblClick: false,

      cellContext: false

    };

    this.width = null; //column width

    this.minWidth = null; //column minimum width


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

    this._buildHeader();
  };

  //////////////// Setup Functions /////////////////


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
        def = self.definition;

    self.element.empty();

    self.contentElement = self._buildColumnHeaderContent();

    self.element.append(self.contentElement);

    if (self.isGroup) {

      self._buildGroupHeader();
    } else {

      self._buildColumnHeader();
    }

    //set header tooltips

    var tooltip = def.tooltipHeader || def.tooltip === false ? def.tooltipHeader : self.table.options.tooltipsHeader;

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

          tooltip = tooltip(column.getComponent());
        }

        self.element.attr("title", tooltip);
      }
    } else {

      self.element.attr("title", "");
    }

    //set resizable handles

    if (self.table.options.resizableColumns && self.table.extExists("resizeColumns")) {

      self.table.extensions.resizeColumns.initializeColumn(self, self.element);
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

    //set width if present

    self.setWidth(def.width);
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

          titleHolderElement.html(text || def.title || "&nbsp");
        });
      } else {

        titleHolderElement.html(def.title || "&nbsp");
      }
    }

    return titleHolderElement;
  };

  //build header element for column group

  Column.prototype._buildGroupHeader = function () {

    var self = this,
        def = self.definition,
        table = self.table;

    self.element.addClass("tabulator-col-group").attr("role", "columngroup").attr("aria-title", def.title);

    self.element.append(self.groupElement);
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

      this.element.css("height", this.parent.getElement().innerHeight());
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

    return this.definition.field;
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

      if (this.table.options.persistentLayout && self.table.extExists("persistentLayout", true)) {

        self.table.extensions.persistentLayout.save();
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

      if (this.table.options.persistentLayout && self.table.extExists("persistentLayout", true)) {

        self.table.extensions.persistentLayout.save();
      }

      this.table.options.groupVisibilityChanged(this.getComponent(), false);
    }
  };

  Column.prototype.setWidth = function (width) {

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

    this.cells.forEach(function (cell) {

      cell.checkHeight();
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

  //set column width to maximum cell width

  Column.prototype.fitToData = function () {

    var self = this;

    var maxWidth = this.element.outerWidth() + 1;

    if (!self.width) {

      self.cells.forEach(function (cell) {

        var width = cell.getWidth();

        if (width > maxWidth) {

          maxWidth = width;
        }
      });

      if (maxWidth) {

        self.setWidth(maxWidth);
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


    this.vDomWindowBuffer = 0; //window row buffer before removing elements, to smooth scrolling


    this.vDomWindowMinTotalRows = 20; //minimum number of rows to be generated in virtual dom (prevent buffering issues on tables with tall rows)

    this.vDomWindowMinMarginRows = 5; //minimum number of rows to be generated in virtual dom margin


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

      var left = self.element.scrollLeft();

      //handle horizontal scrolling

      if (self.scrollLeft != left) {

        self.columnManager.scrollHorizontal(left);

        if (self.table.options.groupBy) {

          self.table.extensions.groupRows.scrollHeaders(left);
        }
      }

      self.scrollLeft = left;
    });

    //handle virtual dom scrolling

    if (self.table.options.height && self.table.options.virtualDom) {

      self.element.scroll(function () {

        var top = self.element.scrollTop();

        //handle verical scrolling

        if (self.scrollTop != top) {

          self.scrollTop = top;

          self.scrollVertical();
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
      } else if (subject instanceof jQuery) {

        //subject is a jquery element of the row

        var match = self.rows.find(function (row) {

          return row.element === subject;
        });

        return match || false;
      } else {

        //subject is public row object

        return subject._getSelf() || false;
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

    this.table.options.rowDeleted(row.getComponent());

    this.table.options.dataEdited(this.getData());

    this.setActiveRows(this.activeRows);

    this.setDisplayRows(this.displayRows);

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

  RowManager.prototype.addRowActual = function (data, pos, index) {

    var safeData = data || {},
        row = new Row(safeData, this),
        top = typeof pos == "undefined" ? this.table.options.addRowPos : pos;

    if (index) {

      index = this.findRow(index);
    }

    if (top === "top") {

      top = true;
    }

    if (top === "bottom") {

      top = false;
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

    var rows = active ? self.rows : self.activeRows;

    rows.forEach(function (row) {

      output.push(row.getData(true));
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

        if (sorters[0] && typeof sorters[0].column != "function") {

          params[self.table.extensions.page.paginationDataSentNames.sort] = sorters[0].column.getField();

          params[self.table.extensions.page.paginationDataSentNames.sort_dir] = sorters[0].dir;
        }
      }

      //set filter data if defined

      if (options.ajaxFiltering) {

        var filters = self.table.extensions.filter.getFilter();

        if (filters[0] && typeof filters[0].field == "string") {

          params[self.table.extensions.page.paginationDataSentNames.filter] = filters[0].field;

          params[self.table.extensions.page.paginationDataSentNames.filter_type] = filters[0].type;

          params[self.table.extensions.page.paginationDataSentNames.filter_value] = filters[0].value;
        }
      }

      self.table.extensions.ajax.setParams(params, true);
    }

    table.extensions.ajax.sendRequest(function (data) {

      self.setData(data);
    });
  };

  //choose the path ro refresh data after a filter update

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

  //choose the path ro refresh data after a sorter update

  RowManager.prototype.sorterRefresh = function () {

    var table = this.table,
        options = this.table.options;

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

    self.renderTable();

    if (!this.displayRowsCount) {

      if (table.options.placeholder) {

        self.getElement().append(table.options.placeholder);
      }
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

        if (self.table.options.fitColumns) {

          self.columnManager.fitToTable();
        } else {

          self.columnManager.fitToData();
        }
      } else {

        self.renderEmptyScroll();
      }

      if (self.table.options.responsiveLayout && self.table.extExists("responsiveLayout", true)) {

        self.table.extensions.responsiveLayout.update();
      }
    }

    if (this.table.extExists("frozenColumns")) {

      this.table.extensions.frozenColumns.layout();
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

        row.initialize();
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

        row.initialize();

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

        self.vDomScrollHeight = topPadHeight + rowsHeight + self.vDomBottomPad - self.element.innerHeight();
      } else {

        self.vDomTopPad = !forceMove ? this.element.scrollTop() - topPadHeight : self.vDomRowHeight * this.vDomTop + topPadHeight;

        self.vDomBottomPad = self.vDomBottom == self.displayRowsCount - 1 ? 0 : Math.max(self.vDomScrollHeight - self.vDomTopPad - rowsHeight - topPadHeight, 0);
      }

      element.css({

        "padding-top": self.vDomTopPad,

        "padding-bottom": self.vDomBottomPad

      });

      if (forceMove) {

        this.scrollTop = self.vDomTopPad + topPadHeight;
      }

      this.vDomScrollPosTop = this.scrollTop;

      this.vDomScrollPosBottom = this.scrollTop;

      if (forceMove) {

        holder.scrollTop(this.scrollTop);
      }
    } else {

      this.renderEmptyScroll();
    }
  };

  //handle vertical scrolling

  RowManager.prototype.scrollVertical = function () {

    var topDiff = this.scrollTop - this.vDomScrollPosTop;

    var bottomDiff = this.scrollTop - this.vDomScrollPosBottom;

    var margin = this.vDomWindowBuffer * 2;

    if (-topDiff > margin || bottomDiff > margin) {

      //if big scroll redraw table;

      this._virtualRenderFill(Math.floor(this.element.scrollTop() / this.element[0].scrollHeight * this.displayRowsCount));
    } else {

      //handle top rows

      if (topDiff >= 0) {

        //scrolling down

        this._removeTopRow(topDiff);
      } else {

        //scrolling up

        this._addTopRow(-topDiff);
      }

      //handle bottom rows

      if (bottomDiff >= 0) {

        //scrolling down

        this._addBottomRow(bottomDiff);
      } else {

        //scrolling up

        this._removeBottomRow(-bottomDiff);
      }
    }
  };

  RowManager.prototype._addTopRow = function (topDiff) {

    var table = this.tableElement;

    if (this.vDomTop) {

      var index = this.vDomTop - 1,
          topRow = this.displayRows[index],
          topRowHeight = topRow.getHeight() || this.vDomRowHeight;

      //hide top row if needed

      if (topDiff >= topRowHeight) {

        this.styleRow(topRow, index);

        table.prepend(topRow.getElement());

        topRow.initialize();

        this.vDomTopPad -= topRowHeight;

        if (this.vDomTopPad < 0) {

          this.vDomTopPad = (this.vDomTop - 1) * this.vDomRowHeight;
        }

        table.css("padding-top", this.vDomTopPad);

        this.vDomScrollPosTop -= topRowHeight;

        this.vDomTop--;
      }

      topDiff = -(this.scrollTop - this.vDomScrollPosTop);

      if (this.vDomTop && topDiff >= (this.displayRows[this.vDomTop - 1].getHeight() || this.vDomRowHeight)) {

        this._addTopRow(topDiff);
      }
    }
  };

  RowManager.prototype._removeTopRow = function (topDiff) {

    var table = this.tableElement,
        topRow = this.displayRows[this.vDomTop],
        topRowHeight = topRow.getHeight();

    //hide top row if needed

    if (this.scrollTop > this.vDomWindowBuffer) {

      topRow.element.detach();

      this.vDomTopPad += topRowHeight;

      table.css("padding-top", this.vDomTopPad);

      this.vDomScrollPosTop += this.vDomTop ? topRowHeight : topRowHeight + this.vDomWindowBuffer;

      this.vDomTop++;

      topDiff = this.scrollTop - this.vDomScrollPosTop;

      if (topDiff >= (this.displayRows[this.vDomTop].getHeight() || this.vDomRowHeight)) {

        this._removeTopRow(topDiff);
      }
    }
  };

  RowManager.prototype._addBottomRow = function (bottomDiff) {

    var table = this.tableElement;

    if (this.vDomBottom < this.displayRowsCount - 1) {

      var index = this.vDomBottom + 1,
          bottomRow = this.displayRows[index],
          bottomRowHeight = bottomRow.getHeight() || this.vDomRowHeight;

      //hide bottom row if needed

      if (bottomDiff >= bottomRowHeight) {

        this.styleRow(bottomRow, index);

        table.append(bottomRow.getElement());

        bottomRow.initialize();

        this.vDomBottomPad -= bottomRowHeight;

        if (this.vDomBottomPad < 0 || index == this.displayRowsCount - 1) {

          this.vDomBottomPad = 0;
        }

        table.css("padding-bottom", this.vDomBottomPad);

        this.vDomScrollPosBottom += bottomRowHeight;

        this.vDomBottom++;
      }

      bottomDiff = this.scrollTop - this.vDomScrollPosBottom;

      if (this.vDomBottom < this.displayRowsCount - 1 && bottomDiff >= (this.displayRows[this.vDomBottom + 1].getHeight() || this.vDomRowHeight)) {

        this._addBottomRow(bottomDiff);
      }
    }
  };

  RowManager.prototype._removeBottomRow = function (bottomDiff) {

    var table = this.tableElement,
        bottomRow = this.displayRows[this.vDomBottom],
        bottomRowHeight = bottomRow.getHeight() || this.vDomRowHeight;

    //hide bottom row if needed

    if (this.scrollTop < this.element.innerHeight() - this.element[0].scrollHeight - this.vDomWindowBuffer) {

      bottomRow.element.detach();

      this.vDomBottomPad += bottomRowHeight;

      if (this.vDomBottomPad < 0) {

        this.vDomBottomPad == 0;
      }

      table.css("padding-bottom", this.vDomBottomPad);

      this.vDomScrollPosBottom -= bottomRowHeight;

      this.vDomBottom--;

      bottomDiff = -(this.scrollTop - this.vDomScrollPosBottom);

      if (bottomDiff >= (this.displayRows[this.vDomBottom].getHeight() || this.vDomRowHeight)) {

        this._removeBottomRow(bottomDiff);
      }
    }
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

      self.vDomWindowBuffer = self.height;
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

    var obj = {

      getData: function getData() {

        return row.getData(true);
      },

      getElement: function getElement() {

        return row.getElement();
      },

      getCells: function getCells() {

        var cells = [];

        row.getCells().forEach(function (cell) {

          cells.push(cell.getComponent());
        });

        return cells;
      },

      getCell: function getCell(column) {

        return row.getCell(column);
      },

      getIndex: function getIndex() {

        return row.getData(true)[row.table.options.index];
      },

      delete: function _delete() {

        row.delete();
      },

      scrollTo: function scrollTo() {

        row.table.rowManager.scrollToRow(row);
      },

      update: function update(data) {

        row.updateData(data);
      },

      normalizeHeight: function normalizeHeight() {

        row.normalizeHeight(true);
      },

      _getSelf: function _getSelf() {

        return row;
      }

    };

    return obj;
  };

  var Row = function Row(data, parent) {

    this.table = parent.table;

    this.parent = parent;

    this.data = {};

    this.element = $("<div class='tabulator-row' role='row'></div>");

    this.extensions = {}; //hold extension variables;

    this.cells = [];

    this.height = 0; //hold element height

    this.outerHeight = 0; //holde lements outer height

    this.initialized = false; //element has been rendered


    this.setData(data);

    this.generateElement();
  };

  Row.prototype.getElement = function () {

    return this.element;
  };

  Row.prototype.generateElement = function () {

    var self = this;

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
  };

  //normalize the height of elements in the row

  Row.prototype.normalizeHeight = function (force) {

    if (force) {

      //zero cell heights

      this.cells.forEach(function (cell) {

        cell.setHeight();
      });
    }

    this.setHeight(this.element.innerHeight(), force);
  };

  //functions to setup on first render

  Row.prototype.initialize = function (force) {

    var self = this;

    if (!self.initialized || force) {

      self.element.empty();

      //handle frozen cells

      if (this.table.extExists("frozenColumns")) {

        this.table.extensions.frozenColumns.layoutRow(this);
      }

      self.cells = this.parent.columnManager.generateCells(self);

      self.cells.forEach(function (cell) {

        self.element.append(cell.getElement());
      });

      self.normalizeHeight();

      if (self.table.options.rowFormatter) {

        self.table.options.rowFormatter(self.getComponent());
      }

      self.initialized = true;
    }
  };

  Row.prototype.reinitialize = function () {

    this.initialized = false;

    this.height = 0;

    if (this.element.is(":visible")) {

      this.initialize(true);
    }
  };

  Row.prototype.setHeight = function (height, force) {

    var self = this;

    if (self.height != height || force) {

      self.height = height;

      self.cells.forEach(function (cell) {

        cell.setHeight(height);
      });

      self.outerHeight = this.element.outerHeight();
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

      var _cell = this.getCell(attrname);

      if (_cell) {

        if (_cell.getValue() != data[attrname]) {

          _cell.setValueProcessData(data[attrname]);
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

        var _cell2 = this.cells[i];

        if (_cell2.column.extensions.edit) {

          var allowEdit = true;

          if (typeof _cell2.column.extensions.edit.check == "function") {

            allowEdit = _cell2.column.extensions.edit.check(_cell2.getComponent());
          }

          if (allowEdit) {

            nextCell = _cell2;

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

        var _cell3 = this.cells[i],
            allowEdit = true;

        if (_cell3.column.extensions.edit) {

          if (typeof _cell3.column.extensions.edit.check == "function") {

            allowEdit = _cell3.column.extensions.edit.check(_cell3.getComponent());
          }

          if (allowEdit) {

            prevCell = _cell3;

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

    var obj = {

      getValue: function getValue() {

        return cell.getValue();
      },

      getOldValue: function getOldValue() {

        return cell.getOldValue();
      },

      getElement: function getElement() {

        return cell.getElement();
      },

      getRow: function getRow() {

        return cell.row.getComponent();
      },

      getColumn: function getColumn() {

        return cell.column.getComponent();
      },

      setValue: function setValue(value, mutate) {

        if (typeof mutate == "undefined") {

          mutate = true;
        }

        cell.setValue(value, mutate);
      },

      edit: function edit() {

        cell.edit();
      },

      nav: function nav() {

        return cell.nav();
      },

      checkHeight: function checkHeight() {

        cell.checkHeight();
      },

      _getSelf: function _getSelf() {

        return cell;
      }

    };

    return obj;
  };

  var Cell = function Cell(column, row) {

    this.table = column.table;

    this.column = column;

    this.row = row;

    this.element = $("<div class='tabulator-cell' role='gridcell'></div>");

    this.value = null;

    this.oldValue = null;

    this.height = null;

    this.width = null;

    this.minWidth = null;

    this.generateElement();
  };

  //////////////// Setup Functions /////////////////


  //generate element

  Cell.prototype.generateElement = function () {

    this.setWidth(this.column.width);

    this._configureCell();

    this.setValueProcessData(this.row.data[this.column.getField()]);
  };

  Cell.prototype._configureCell = function () {

    var self = this,
        cellEvents = self.column.cellEvents,
        element = self.element,
        field = this.column.getField();

    //set text alignment

    element.css("text-align", typeof self.column.definition.align == "undefined" ? "" : self.column.definition.align);

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

    if (self.column.extensions.edit) {

      self.table.extensions.edit.bindEditor(self);
    }

    if (self.column.definition.rowHandle && self.table.options.movableRows !== false && self.table.extExists("moveRow")) {

      self.table.extensions.moveRow.initializeCell(self);
    }

    if (self.column.visible) {

      self.show();
    } else {

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

    var tooltip = self.column.definition.tooltip || self.column.definition.tooltip === false ? self.column.definition.tooltip : self.table.options.tooltips;

    if (tooltip) {

      if (tooltip === true) {

        tooltip = self.value;
      } else if (typeof tooltip == "function") {

        tooltip = tooltip(self.getComponent());
      }

      self.element.attr("title", tooltip);
    } else {

      self.element.attr("title", "");
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
  };

  Cell.prototype.setValueProcessData = function (value, mutate) {

    var changed = false;

    if (this.value != value) {

      changed = true;

      if (mutate) {

        if (this.column.extensions.mutate && this.column.extensions.mutate.type !== "data") {

          value = this.table.extensions.mutator.transformCell(cell, value);
        }
      }
    }

    this.setValueActual(value);

    return changed;
  };

  Cell.prototype.setValueActual = function (value) {

    this.oldValue = this.value;

    this.value = value;

    this.row.data[this.column.getField()] = value;

    this._generateContents();

    this._generateTooltip();

    //set resizable handles

    if (this.table.options.resizableColumns && this.table.extExists("resizeColumns")) {

      this.table.extensions.resizeColumns.initializeColumn(this.column, this.element);
    }

    //handle frozen cells

    if (this.table.extExists("frozenColumns")) {

      this.table.extensions.frozenColumns.layoutElement(this.element, this.column);
    }
  };

  Cell.prototype.setWidth = function (width) {

    this.width = width;

    this.element.css("width", width || "");
  };

  Cell.prototype.getWidth = function () {

    return this.width || this.element.outerWidth();
  };

  Cell.prototype.setMinWidth = function (minWidth) {

    this.minWidth = minWidth;

    this.element.css("min-width", minWidth || "");
  };

  Cell.prototype.checkHeight = function () {

    var height = this.element.css("height");

    if (this.element.is(":visible") && height) {

      this.element.css("height", "");

      if (this.element.outerHeight() != parseInt(height)) {

        this.row.normalizeHeight(true);
      } else {

        this.element.css("height", height);
      }
    } else {

      this.row.reinitialize();
    }
  };

  Cell.prototype.setHeight = function (height) {

    this.height = height;

    this.element.css("height", height || "");
  };

  Cell.prototype.getHeight = function () {

    return this.height || this.element.outerHeight();
  };

  Cell.prototype.show = function () {

    this.element.css("display", "");
  };

  Cell.prototype.hide = function () {

    this.element.css("display", "none");
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

    this.element = $("<div class='tabulator-footer'></div>"); //containing element


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

  FooterManager.prototype.append = function (element) {

    this.element.append(element);

    this.table.rowManager.adjustTableSize();
  };

  window.Tabulator = {

    columnManager: null, // hold Column Manager

    rowManager: null, //hold Row Manager

    footerManager: null, //holder Footer Manager


    //setup options

    options: {

      height: false, //height of tabulator


      fitColumns: false, //fit colums to width of screen;

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

      dataGrouping: function dataGrouping() {},

      dataGrouped: false,

      groupVisibilityChanged: function groupVisibilityChanged() {},

      //pagination callbacks

      pageLoaded: function pageLoaded() {},

      //localization callbacks

      localized: function localized() {}

    },

    //constructor

    _create: function _create() {

      var self = this,
          element = this.element;

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

        if (self.options.pagination && this.extExists("page")) {

          self.extensions.page.reset(true);

          self.extensions.page.setPage(1);
        } else {

          if (self.options.data.length) {

            self.rowManager.setData(self.options.data);
          } else {

            if (self.options.ajaxURL && this.extExists("ajax")) {

              self.extensions.ajax.sendRequest(function (data) {

                self.rowManager.setData(data);
              });
            } else {

              self.rowManager.setData(self.options.data);
            }
          }
        }
      }
    },

    //build tabulator element

    _buildElement: function _buildElement() {

      var element = this.element,
          ext = this.extensions,
          options = this.options;

      options.tableBuilding();

      element.addClass("tabulator").attr("role", "grid").empty();

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

      if (options.pagination && this.extExists("page", true) || options.footerElement) {

        element.append(this.footerManager.getElement());
      }

      if (options.persistentLayout && this.extExists("persistentLayout", true)) {

        ext.persistentLayout.initialize(options.persistentLayout, options.persistentLayoutID);

        options.columns = ext.persistentLayout.load(options.columns);
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

      options.tableBuilt();
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

      return this.rowManager.addRow(data, pos, index).getComponent();
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

      row = this.rowManager.findRow(index);

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

      row = this.rowManager.findRow(index);

      if (row) {

        return this.rowManager.scrollToRow(row);
      } else {

        console.warn("Scroll Error - No matching row found:", index);

        return false;
      }
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

    getFilter: function getFilter() {

      if (this.extExists("filter", true)) {

        return this.extensions.filter.getFilter();
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

        this.extensions.page.getPage();
      } else {

        return false;
      }
    },

    getPageMax: function getPageMax() {

      if (this.options.pagination && this.extExists("page")) {

        this.extensions.page.getPageMax();
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

    var self = this,
        path = value ? path + "." + value : path,
        pathArray = path.split("."),
        text = this._getLangElement(pathArray, self.locale);

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

    callback(this.getText(path));
  };

  //itterate through bindings and trigger updates


  Localize.prototype._executeBindings = function () {

    var self = this;

    var _loop = function _loop(path) {

      self.bindings[path].forEach(function (binding) {

        binding(self.getText(path));
      });
    };

    for (var path in self.bindings) {
      _loop(path);
    }
  };

  //Localized text listings


  Localize.prototype.langs = {

    "default": { //hold default locale text


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

          data[field] = column.extensions.accessor.accessor(data[field], data, column.extensions.accessor.params);
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

      self.table.options.ajaxRequesting(self.url, self.params);

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

  var Download = function Download(table) {

    this.table = table; //hold Tabulator object

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

      downloadFunc(self.table.columnManager.getDefinitions(), self.table.rowManager.getData(true), options, buildLink);
    }
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

  //downloaders


  Download.prototype.downloaders = {

    csv: function csv(columns, data, options, setFileContents) {

      var titles = [],
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

          var value = _typeof(row[field]) == "object" ? JSON.stringify(row[field]) : row[field];

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

      var titles = [],
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

            var cell = { v: typeof value == "undefined" ? "" : value };

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

      rows.push(fields);

      //generate each row of the table


      data.forEach(function (row) {

        var rowData = [];

        fields.forEach(function (field) {

          rowData.push(row[field]);
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

          if (typeof column.definition.formatter == "string") {

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

    cell.getElement().removeClass("tabulator-editing").empty();

    cell.row.getElement().removeClass("tabulator-row-editing");
  };

  //return a formatted value for a cell


  Edit.prototype.bindEditor = function (cell) {

    var self = this,
        element = cell.getElement(),
        mouseClick = false;

    //handle successfull value change


    function success(value) {

      self.clearEditor(cell);

      cell.setValue(value, true);
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

      var rendered = function rendered() {},
          allowEdit = true,
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
      });

      return input;
    },

    //resizable text area element


    textarea: function textarea(cell, onRendered, success, cancel, editorParams) {

      var self = this,
          value = cell.getValue(),
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
          filterFunc;

      if (value) {

        switch (filterType) {

          case "partial":

            filterFunc = function filterFunc(data) {

              return String(data[field]).toLowerCase().indexOf(String(value).toLowerCase()) > -1;
            };

            break;

          default:

            filterFunc = function filterFunc(data) {

              return data[field] == value;
            };

        }

        self.headerFilters[field] = { value: value, func: filterFunc };
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

            console.warn("Filter Error - Build header filter, No such editor found: ", column.definition.editor);
          }

          break;

        case "function":

          editor = column.definition.editor;

          break;

        case "boolean":

          if (column.extensions.edit && column.extensions.edit.editor) {

            editor = column.extensions.edit.editor;
          } else {

            console.warn("Filter Error - Cannot auto detect editor element, none set");
          }

          break;

      }

      if (editor) {

        cellWrapper = {

          getValue: function getValue() {

            return "";
          },

          getElement: function getElement() {

            return filterElement;
          }

        };

        editorElement = editor.call(self, cellWrapper, function () {}, success, cancel, column.definition.headerFilterParams || {});

        //set Placeholder Text


        if (column.definition.field) {

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

    var self = this;

    if (!Array.isArray(field)) {

      field = [{ field: field, type: type, value: value }];
    }

    field.forEach(function (filter) {

      var filterFunc = false;

      if (typeof filter.field == "function") {

        filterFunc = filter.field;
      } else {

        if (self.filters[filter.type]) {

          filterFunc = function filterFunc(data) {

            return self.filters[filter.type](filter.value, data[filter.field]);
          };
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


  Filter.prototype.getFilter = function () {

    var self = this,
        output = [];

    self.filterList.forEach(function (filter) {

      output.push({ field: filter.field, type: filter.type, value: filter.value });
    });

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

      self.table.options.dataFiltering(self.getFilter());
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

      self.table.options.dataFiltered(self.getFilter(), activeRowComponents);
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

      if (filterVal === null) {

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

    var value = cell.column.extensions.format.formatter.call(this, cell.getComponent(), cell.column.extensions.format.params);

    return value;
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

      return "<div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div>";
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

      self.table.columnManager.element.css("padding-left", self.leftMargin);

      self.rightMargin = self._calcSpace(self.rightColumns, self.rightColumns.length);

      self.table.columnManager.element.css("padding-right", self.rightMargin);

      self.table.rowManager.getRows().forEach(function (row) {

        self.layoutRow(row);
      });

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

    var obj = {

      type: "GroupComponent", //type of element


      getKey: function getKey() {

        return group.key;
      },

      getElement: function getElement() {

        return group.element;
      },

      getRows: function getRows() {

        var output = [];

        group.rows.forEach(function (row) {

          output.push(row.getComponent());
        });

        return output;
      },

      getVisibility: function getVisibility() {

        return group.visible;
      },

      show: function show() {

        group.show();
      },

      hide: function hide() {

        group.hide();
      },

      toggle: function toggle() {

        group.toggleVisibility();
      },

      _getSelf: function _getSelf() {

        return group;
      }

    };

    return obj;
  };

  //////////////////////////////////////////////////


  //////////////// Group Functions /////////////////


  //////////////////////////////////////////////////


  var Group = function Group(parent, key, generator, visible) {

    this.key = key;

    this.parent = parent;

    this.type = "group"; //type of element


    this.rows = [];

    this.generator = generator;

    this.element = $("<div class='tabulator-row tabulator-group' role='rowgroup'></div>");

    this.arrowElement = $("<div class='tabulator-arrow'></div>");

    this.height = 0;

    this.outerHeight = 0;

    this.initialized = false;

    this.visible = visible;

    this.addBindings();
  };

  Group.prototype.addBindings = function () {

    var self = this;

    self.arrowElement.on("click", function (e) {

      e.stopPropagation();

      e.stopImmediatePropagation();

      self.toggleVisibility();
    });
  };

  Group.prototype.addRow = function (row) {

    this.rows.push(row);
  };

  Group.prototype.getRows = function () {

    this._visSet();

    return this.visible ? this.rows : [];
  };

  Group.prototype.getRowCount = function () {

    return this.rows.length;
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

    if (this.parent.table.rowManager.getRenderMode() == "classic") {

      this.rows.forEach(function (row) {

        row.getElement().detach();
      });
    } else {

      this.parent.updateGroupRows(true);
    }

    this.parent.table.options.groupVisibilityChanged(this.getComponent(), false);
  };

  Group.prototype.show = function () {

    var self = this;

    self.visible = true;

    if (this.parent.table.rowManager.getRenderMode() == "classic") {

      self.rows.forEach(function (row) {

        self.getElement().after(row.getElement());

        row.initialize();
      });
    } else {

      this.parent.updateGroupRows(true);
    }

    this.parent.table.options.groupVisibilityChanged(this.getComponent(), true);
  };

  Group.prototype._visSet = function () {

    var data = [];

    if (typeof this.visible == "function") {

      this.rows.forEach(function (row) {

        data.push(row.getData());
      });

      this.visible = this.visible(this.key, this.getRowCount(), data);
    }
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

    this.element.html(this.generator(this.key, this.getRowCount(), data)).prepend(this.arrowElement);

    this.addBindings();

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

  //////////////// Object Generation /////////////////


  Group.prototype.getComponent = function () {

    return new GroupComponent(this);
  };

  //////////////////////////////////////////////////


  ////////////// Group Row Extension ///////////////


  //////////////////////////////////////////////////


  var GroupRows = function GroupRows(table) {

    this.table = table; //hold Tabulator object


    this.findGroupId = false; //enable table grouping and set field to group by


    this.startOpen = function () {
      return false;
    }; //starting state of group


    this.headerGenerator = function (value, count, data) {
      //header layout function


      return value + "<span>(" + count + " " + (count === 1 ? "item" : "items") + ")</span>";
    };

    this.groupList = []; //ordered list of groups


    this.groups = {}; //hold row groups

  };

  //initialize group configuration


  GroupRows.prototype.initialize = function () {

    var self = this;

    if (typeof self.table.options.groupBy == "function") {

      self.findGroupId = self.table.options.groupBy;
    } else {

      self.findGroupId = function (data) {

        return data[self.table.options.groupBy];
      };
    }

    if (self.table.options.groupStartOpen) {

      self.startOpen = typeof self.table.options.groupStartOpen == "function" ? self.table.options.groupStartOpen : function () {
        return true;
      };
    }

    if (self.table.options.groupHeader) {

      self.headerGenerator = self.table.options.groupHeader;
    }
  };

  //return appropriate rows with group headers


  GroupRows.prototype.getRows = function (data) {

    var self = this,
        oldGroups = self.groups,
        groupComponents = [];

    self.groups = {};

    self.groupList = [];

    if (self.findGroupId) {

      self.table.options.dataGrouping();

      data.forEach(function (row) {

        var groupID = self.findGroupId(row.getData());

        if (!self.groups[groupID]) {

          var group = new Group(self, groupID, self.headerGenerator, oldGroups[groupID] ? oldGroups[groupID].visible : self.startOpen);

          self.groups[groupID] = group;

          self.groupList.push(group);
        }

        self.groups[groupID].addRow(row);
      });

      if (self.table.options.dataGrouped) {

        self.groupList.forEach(function (group) {

          self.groupComponents.push(group.getComponent());
        });

        self.table.options.dataGrouped(groupList);
      };

      return self.updateGroupRows();
    } else {

      return data.slice(0);
    }
  };

  GroupRows.prototype.updateGroupRows = function (force) {

    var self = this,
        output = [],
        oldRowCount;

    self.groupList.forEach(function (group) {

      output.push(group);

      group.getRows().forEach(function (row) {

        output.push(row);
      });
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

        col = { title: header.text() };
      }

      if (!col.field) {

        col.field = header.text().toLowerCase().replace(" ", "_");
      }

      $("td:eq(" + index + ")", rows).data("field", col.field);

      width = header.attr("width");

      if (width && !col.width) {

        col.width = width;
      }

      if (col.field == self.table.options.index) {

        hasIndex = true;
      }

      //check for tablator inline options


      attributes = header[0].attributes;

      //check for tablator inline options


      for (var index in attributes) {

        var attrib = attributes[index],
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


    this.activeBindings = {};

    this.watchKeys = {};

    this.pressedKeys = [];
  };

  Keybindings.prototype.initialize = function () {

    var bindings = this.table.options.keybindings;

    if (bindings !== false) {

      if (bindings.length) {

        for (var key in bindings) {

          this.bindings[key] = bindings[key];
        }
      }

      this.mapBindings();

      this.bindEvents();
    }
  };

  Keybindings.prototype.mapBindings = function () {
    var _this = this;

    var self = this;

    var _loop2 = function _loop2(key) {

      if (_this.actions[key]) {

        var symbols = _this.bindings[key].toString();

        var binding = {

          action: _this.actions[key],

          keys: [],

          ctrl: false,

          shift: false

        };

        symbols = symbols.toLowerCase().split(" ").join("").split("+");

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

              self.watchKeys[symbol].push(key);

          }
        });

        _this.activeBindings[key] = binding;
      } else {

        console.warn("Key Binding Error - no such action:", key);
      }
    };

    for (var key in this.bindings) {
      _loop2(key);
    }
  };

  Keybindings.prototype.bindEvents = function () {

    var self = this;

    this.table.element.on("keydown", function (e) {

      var code = e.keyCode;

      var bindings = self.watchKeys[code];

      if (bindings) {

        self.pressedKeys.push(code);

        bindings.forEach(function (binding) {

          self.checkBinding(e, self.activeBindings[binding]);
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

    undo: "ctrl + 90",

    redo: "ctrl + 89"

  };

  //default actions


  Keybindings.prototype.actions = {

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

      if (row.extensions.moveRow.mousemove) {

        row.element.on("mousemove", row.extensions.moveRow.mousemove);
      }
    });
  };

  MoveRows.prototype._unbindMouseMove = function () {

    var self = this;

    self.table.rowManager.displayRows.forEach(function (row) {

      if (row.extensions.moveRow.mousemove) {

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

        if (typeof data[field] != "undefined" && column.extensions.mutate.type != "edit") {

          data[field] = column.extensions.mutate.mutator(data[field], data, "data", column.extensions.mutate.params);
        }
      }
    });

    return data;
  };

  //apply mutator to new cell value


  Mutator.prototype.transformCell = function (cell, value) {

    return cell.column.extensions.mutate.mutator(value, cell.row.getData(), "edit", cell.column.extensions.mutate.params);
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

    for (var _key in self.table.options.paginationDataReceived) {

      self.paginationDataReceivedNames[_key] = self.table.options.paginationDataReceived[_key];
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

      self.table.footerManager.append(self.element);
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

  Page.prototype.getMode = function () {

    return this.mode;
  };

  //return appropriate rows for current page


  Page.prototype.getRows = function (data) {

    var output, start, end;

    if (this.mode == "local") {

      output = [];

      start = this.size * (this.page - 1);

      end = start + this.size;

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

      if (sorters[0] && typeof sorters[0].column != "function") {

        pageParams[this.paginationDataSentNames.sort] = sorters[0].column.getField();

        pageParams[this.paginationDataSentNames.sort_dir] = sorters[0].dir;
      }
    }

    //set filter data if defined


    if (this.table.extExists("filter")) {

      var filters = self.table.extensions.filter.getFilter();

      if (filters[0] && typeof filters[0].field == "string") {

        pageParams[this.paginationDataSentNames.filter] = filters[0].field;

        pageParams[this.paginationDataSentNames.filter_type] = filters[0].type;

        pageParams[this.paginationDataSentNames.filter_value] = filters[0].value;
      }
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

  //set the paramter names for pagination requests


  Page.prototype.paginationDataSentNames = {

    "page": "page",

    "size": "size",

    "sort": "sort",

    "sort_dir": "sort_dir",

    "filter": "filter",

    "filter_value": "filter_value",

    "filter_type": "fitler_type"

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

    this.handle = $("<div class='tabulator-col-resize-handle'></div>");

    this.prevHandle = $("<div class='tabulator-col-resize-handle prev'></div>");
  };

  ResizeColumns.prototype.initializeColumn = function (column, element) {

    var self = this,
        handle = self.handle.clone(),
        prevHandle = self.prevHandle.clone();

    handle.on("click", function (e) {

      e.stopPropagation();
    });

    prevHandle.on("click", function (e) {

      e.stopPropagation();
    });

    handle.on("mousedown", function (e) {

      var nearestColumn = column.getLastColumn();

      if (nearestColumn) {

        self.startColumn = column;

        self._mouseDown(e, nearestColumn);
      }
    });

    prevHandle.on("mousedown", function (e) {

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
  };

  ResizeColumns.prototype._mouseDown = function (e, column) {

    var self = this;

    self.table.element.addClass("tabulator-block-select");

    function mouseMove(e) {

      column.setWidth(self.startWidth + (e.screenX - self.startX));

      // column.checkCellHeights();

    }

    function mouseUp(e) {

      //block editor from taking action while resizing is taking place


      if (self.startColumn.extensions.edit) {

        self.startColumn.extensions.edit.blocked = false;
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

      var diff = self.table.columnManager.element.innerWidth() - self.table.columnManager.getWidth();

      if (diff < 0) {

        //table is too wide


        var _column = self.columns[self.index];

        if (_column) {

          _column.hide();

          self.index++;
        } else {

          working = false;
        }
      } else {

        //table has spare space


        var _column2 = self.columns[self.index - 1];

        if (_column2) {

          if (diff > 0) {

            if (diff >= _column2.getWidth()) {

              _column2.show();

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

    if (typeof rows == "undefined") {

      self.table.rowManager.rows.forEach(function (row) {

        self._selectRow(row, true, true);
      });

      self._rowSelectionChanged();
    } else {

      if (Array.isArray(rows)) {

        rows.forEach(function (row) {

          self._selectRow(row, true);
        });

        self._rowSelectionChanged();
      } else {

        self._selectRow(rows);
      }
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
        index;

    var row = self.table.rowManager.findRow(rowInfo);

    if (row) {

      index = self.selectedRows.findIndex(function (selectedRow) {

        return selectedRow = row;
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


      column.element.on("click", function () {

        if (column.extensions.sort) {

          if (column.extensions.sort.dir == "asc") {

            self.setSort(column, "desc");
          } else {

            self.setSort(column, "asc");
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

      item.column = self.table.columnManager.findColumn(item.column);

      if (item.column) {

        // item.column = item.column;


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
        field;

    if (row) {

      row = row.getData();

      field = column.getField();

      if (field) {

        switch (_typeof(row[field])) {

          case "undefined":

            sorter = "string";

            break;

          case "boolean":

            sorter = "boolean";

            break;

          default:

            if (!isNaN(row[field])) {

              sorter = "number";
            } else {

              if (row[field].match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)) {

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
      });
    }

    if (self.sortList.length) {

      lastSort = self.sortList[self.sortList.length - 1];

      if (lastSort.column) {

        self.setColumnHeader(lastSort.column, lastSort.dir);
      }
    }

    if (self.table.options.dataSorted) {

      self.table.options.dataSorted(self.getSort());
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

    this.clearColumnHeaders();

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

    a = el1.getData()[column.getField()];

    b = el2.getData()[column.getField()];

    return column.extensions.sort.sorter.call(self, a, b, el1, el2, column.getComponent(), dir, column.extensions.sort.params);
  };

  //default data sorters


  Sort.prototype.sorters = {

    //sort numbers


    number: function number(a, b, aData, bData, column, dir, params) {

      return parseFloat(String(a).replace(",", "")) - parseFloat(String(b).replace(",", ""));
    },

    //sort strings


    string: function string(a, b, aData, bData, column, dir, params) {

      return String(a).toLowerCase().localeCompare(String(b).toLowerCase());
    },

    //sort date


    date: function date(a, b, aData, bData, column, dir, params) {

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


    boolean: function boolean(a, b, aData, bData, column, dir, params) {

      var el1 = a === true || a === "true" || a === "True" || a === 1 ? 1 : 0;

      var el2 = b === true || b === "true" || b === "True" || b === 1 ? 1 : 0;

      return el1 - el2;
    },

    //sort alpha numeric strings


    alphanum: function alphanum(as, bs, aData, bData, column, dir, params) {

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


    time: function time(a, b, aData, bData, column, dir, params) {

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
})();

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

  $.widget("ui.tabulator", Tabulator)();
});