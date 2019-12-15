/* Tabulator v4.1.3 (c) Oliver Folkerd */

'use strict';

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

	this.headersElement = this.createHeadersElement();

	this.element = this.createHeaderElement(); //containing element

	this.rowManager = null; //hold row manager object

	this.columns = []; // column definition object

	this.columnsByIndex = []; //columns by index

	this.columnsByField = []; //columns by field

	this.scrollLeft = 0;

	this.element.insertBefore(this.headersElement, this.element.firstChild);
};

////////////// Setup Functions /////////////////


ColumnManager.prototype.createHeadersElement = function () {

	var el = document.createElement("div");

	el.classList.add("tabulator-headers");

	return el;
};

ColumnManager.prototype.createHeaderElement = function () {

	var el = document.createElement("div");

	el.classList.add("tabulator-header");

	return el;
};

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
	    scrollWidth = this.element.scrollWidth - this.table.element.clientWidth;

	this.element.scrollLeft = left;

	//adjust for vertical scrollbar moving table when present

	if (left > scrollWidth) {

		hozAdjust = left - scrollWidth;

		this.element.style.marginLeft = -hozAdjust + "px";
	} else {

		this.element.style.marginLeft = 0;
	}

	//keep frozen columns fixed in position

	//this._calcFrozenColumnsPos(hozAdjust + 3);


	this.scrollLeft = left;

	if (this.table.modExists("frozenColumns")) {

		this.table.modules.frozenColumns.layout();
	}
};

///////////// Column Setup Functions /////////////


ColumnManager.prototype.setColumns = function (cols, row) {

	var self = this;

	while (self.headersElement.firstChild) {
		self.headersElement.removeChild(self.headersElement.firstChild);
	}self.columns = [];

	self.columnsByIndex = [];

	self.columnsByField = [];

	//reset frozen columns

	if (self.table.modExists("frozenColumns")) {

		self.table.modules.frozenColumns.reset();
	}

	cols.forEach(function (def, i) {

		self._addColumn(def);
	});

	self._reIndexColumns();

	if (self.table.options.responsiveLayout && self.table.modExists("responsiveLayout", true)) {

		self.table.modules.responsiveLayout.initialize();
	}

	self.redraw(true);
};

ColumnManager.prototype._addColumn = function (definition, before, nextToColumn) {

	var column = new Column(definition, this),
	    colEl = column.getElement(),
	    index = nextToColumn ? this.findColumnIndex(nextToColumn) : nextToColumn;

	if (nextToColumn && index > -1) {

		var parentIndex = this.columns.indexOf(nextToColumn.getTopColumn());

		var nextEl = nextToColumn.getElement();

		if (before) {

			this.columns.splice(parentIndex, 0, column);

			nextEl.parentNode.insertBefore(colEl, nextEl);
		} else {

			this.columns.splice(parentIndex + 1, 0, column);

			nextEl.parentNode.insertBefore(colEl, nextEl.nextSibling);
		}
	} else {

		if (before) {

			this.columns.unshift(column);

			this.headersElement.insertBefore(column.getElement(), this.headersElement.firstChild);
		} else {

			this.columns.push(column);

			this.headersElement.appendChild(column.getElement());
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

	var self = this,
	    minHeight = 0;

	self.columns.forEach(function (column) {

		var height;

		column.clearVerticalAlign();

		height = column.getHeight();

		if (height > minHeight) {

			minHeight = height;
		}
	});

	self.columns.forEach(function (column) {

		column.verticalAlign(self.table.options.columnVertAlign, minHeight);
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
		} else if (subject instanceof HTMLElement) {

			//subject is a HTML element of the column header

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

	if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

		this.table.modules.responsiveLayout.initialize();
	}

	if (this.table.options.columnMoved) {

		this.table.options.columnMoved.call(this.table, from.getComponent(), this.table.columnManager.getComponents());
	}

	if (this.table.options.persistentLayout && this.table.modExists("persistence", true)) {

		this.table.modules.persistence.save("columns");
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
	var _this = this;

	var left = 0,
	    offset = 0,
	    adjust = 0,
	    colEl = column.getElement();

	return new Promise(function (resolve, reject) {

		if (typeof position === "undefined") {

			position = _this.table.options.scrollToColumnPosition;
		}

		if (typeof ifVisible === "undefined") {

			ifVisible = _this.table.options.scrollToColumnIfVisible;
		}

		if (column.visible) {

			//align to correct position

			switch (position) {

				case "middle":

				case "center":

					adjust = -_this.element.clientWidth / 2;

					break;

				case "right":

					adjust = colEl.clientWidth - _this.headersElement.clientWidth;

					break;

			}

			//check column visibility

			if (!ifVisible) {

				offset = colEl.offsetLeft;

				if (offset > 0 && offset + colEl.offsetWidth < _this.element.clientWidth) {

					return false;
				}
			}

			//calculate scroll position

			left = colEl.offsetLeft + _this.element.scrollLeft + adjust;

			left = Math.max(Math.min(left, _this.table.rowManager.element.scrollWidth - _this.table.rowManager.element.clientWidth), 0);

			_this.table.rowManager.scrollHorizontal(left);

			_this.scrollHorizontal(left);

			resolve();
		} else {

			console.warn("Scroll Error - Column not visible");

			reject("Scroll Error - Column not visible");
		}
	});
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
	    totalWidth = self.table.element.clientWidth,
	    //table element width

	fixedWidth = 0;

	//adjust for vertical scrollbar if present

	if (self.rowManager.element.scrollHeight > self.rowManager.element.clientHeight) {

		totalWidth -= self.rowManager.element.offsetWidth - self.rowManager.element.clientWidth;
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

	if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

		this.table.modules.responsiveLayout.initialize();
	}

	if (this.table.modExists("columnCalcs")) {

		this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
	}

	this.redraw();

	if (this.table.modules.layout.getMode() != "fitColumns") {

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

	if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

		this.table.modules.responsiveLayout.initialize();
	}

	this.redraw();
};

//redraw columns

ColumnManager.prototype.redraw = function (force) {

	if (force) {

		if (Tabulator.prototype.helpers.elVisible(this.element)) {

			this._verticalAlignHeaders();
		}

		this.table.rowManager.resetScroll();

		this.table.rowManager.reinitialize();
	}

	if (this.table.modules.layout.getMode() == "fitColumns") {

		this.table.modules.layout.layout();
	} else {

		if (force) {

			this.table.modules.layout.layout();
		} else {

			if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

				this.table.modules.responsiveLayout.update();
			}
		}
	}

	if (this.table.modExists("frozenColumns")) {

		this.table.modules.frozenColumns.layout();
	}

	if (this.table.modExists("columnCalcs")) {

		this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
	}

	if (force) {

		if (this.table.options.persistentLayout && this.table.modExists("persistence", true)) {

			this.table.modules.persistence.save("columns");
		}

		if (this.table.modExists("columnCalcs")) {

			this.table.modules.columnCalcs.redraw();
		}
	}

	this.table.footerManager.redraw();
};

//public column object
var ColumnComponent = function ColumnComponent(column) {
	this._column = column;
	this.type = "ColumnComponent";
};

ColumnComponent.prototype.getElement = function () {
	return this._column.getElement();
};

ColumnComponent.prototype.getDefinition = function () {
	return this._column.getDefinition();
};

ColumnComponent.prototype.getField = function () {
	return this._column.getField();
};

ColumnComponent.prototype.getCells = function () {
	var cells = [];

	this._column.cells.forEach(function (cell) {
		cells.push(cell.getComponent());
	});

	return cells;
};

ColumnComponent.prototype.getVisibility = function () {
	return this._column.visible;
};

ColumnComponent.prototype.show = function () {
	if (this._column.isGroup) {
		this._column.columns.forEach(function (column) {
			column.show();
		});
	} else {
		this._column.show();
	}
};

ColumnComponent.prototype.hide = function () {
	if (this._column.isGroup) {
		this._column.columns.forEach(function (column) {
			column.hide();
		});
	} else {
		this._column.hide();
	}
};

ColumnComponent.prototype.toggle = function () {
	if (this._column.visible) {
		this.hide();
	} else {
		this.show();
	}
};

ColumnComponent.prototype.delete = function () {
	this._column.delete();
};

ColumnComponent.prototype.getSubColumns = function () {
	var output = [];

	if (this._column.columns.length) {
		this._column.columns.forEach(function (column) {
			output.push(column.getComponent());
		});
	}

	return output;
};

ColumnComponent.prototype.getParentColumn = function () {
	return this._column.parent instanceof Column ? this._column.parent.getComponent() : false;
};

ColumnComponent.prototype._getSelf = function () {
	return this._column;
};

ColumnComponent.prototype.scrollTo = function () {
	return this._column.table.columnManager.scrollToColumn(this._column);
};

ColumnComponent.prototype.getTable = function () {
	return this._column.table;
};

ColumnComponent.prototype.headerFilterFocus = function () {
	if (this._column.table.modExists("filter", true)) {
		this._column.table.modules.filter.setHeaderFilterFocus(this._column);
	}
};

ColumnComponent.prototype.reloadHeaderFilter = function () {
	if (this._column.table.modExists("filter", true)) {
		this._column.table.modules.filter.reloadHeaderFilter(this._column);
	}
};

ColumnComponent.prototype.setHeaderFilterValue = function (value) {
	if (this._column.table.modExists("filter", true)) {
		this._column.table.modules.filter.setHeaderFilterValue(this._column, value);
	}
};

var Column = function Column(def, parent) {
	var self = this;

	this.table = parent.table;
	this.definition = def; //column definition
	this.parent = parent; //hold parent object
	this.type = "column"; //type of element
	this.columns = []; //child columns
	this.cells = []; //cells bound to this column
	this.element = this.createElement(); //column header element
	this.contentElement = false;
	this.groupElement = this.createGroupElement(); //column group holder element
	this.isGroup = false;
	this.tooltip = false; //hold column tooltip
	this.hozAlign = ""; //horizontal text alignment

	//multi dimentional filed handling
	this.field = "";
	this.fieldStructure = "";
	this.getFieldValue = "";
	this.setFieldValue = "";

	this.setField(this.definition.field);

	this.modules = {}; //hold module variables;

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

	if (def.rowHandle && this.table.options.movableRows !== false && this.table.modExists("moveRow")) {
		this.table.modules.moveRow.setHandle(true);
	}

	this._buildHeader();
};

Column.prototype.createElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-col");
	el.setAttribute("role", "columnheader");
	el.setAttribute("aria-sort", "none");

	return el;
};

Column.prototype.createGroupElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-col-group-cols");

	return el;
};

Column.prototype.setField = function (field) {
	this.field = field;
	this.fieldStructure = field ? this.table.options.nestedFieldSeparator ? field.split(this.table.options.nestedFieldSeparator) : [field] : [];
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
				self.table.modules.localize.bind("columns|" + def.field, function (value) {
					self.element.setAttribute("title", value || def.title);
				});
			} else {
				self.element.setAttribute("title", def.title);
			}
		} else {
			if (typeof tooltip == "function") {
				tooltip = tooltip(self.getComponent());

				if (tooltip === false) {
					tooltip = "";
				}
			}

			self.element.setAttribute("title", tooltip);
		}
	} else {
		self.element.setAttribute("title", "");
	}
};

//build header element
Column.prototype._buildHeader = function () {
	var self = this,
	    def = self.definition;

	while (self.element.firstChild) {
		self.element.removeChild(self.element.firstChild);
	}if (def.headerVertical) {
		self.element.classList.add("tabulator-col-vertical");

		if (def.headerVertical === "flip") {
			self.element.classList.add("tabulator-col-vertical-flip");
		}
	}

	self.contentElement = self._bindEvents();

	self.contentElement = self._buildColumnHeaderContent();

	self.element.appendChild(self.contentElement);

	if (self.isGroup) {
		self._buildGroupHeader();
	} else {
		self._buildColumnHeader();
	}

	self.setTooltip();

	//set resizable handles
	if (self.table.options.resizableColumns && self.table.modExists("resizeColumns")) {
		self.table.modules.resizeColumns.initializeColumn("header", self, self.element);
	}

	//set resizable handles
	if (def.headerFilter && self.table.modExists("filter") && self.table.modExists("edit")) {
		if (typeof def.headerFilterPlaceholder !== "undefined" && def.field) {
			self.table.modules.localize.setHeaderFilterColumnPlaceholder(def.field, def.headerFilterPlaceholder);
		}

		self.table.modules.filter.initializeColumn(self);
	}

	//set resizable handles
	if (self.table.modExists("frozenColumns")) {
		self.table.modules.frozenColumns.initializeColumn(self);
	}

	//set movable column
	if (self.table.options.movableColumns && !self.isGroup && self.table.modExists("moveColumn")) {
		self.table.modules.moveColumn.initializeColumn(self);
	}

	//set calcs column
	if ((def.topCalc || def.bottomCalc) && self.table.modExists("columnCalcs")) {
		self.table.modules.columnCalcs.initializeColumn(self);
	}

	//update header tooltip on mouse enter
	self.element.addEventListener("mouseenter", function (e) {
		self.setTooltip();
	});
};

Column.prototype._bindEvents = function () {

	var self = this,
	    def = self.definition,
	    dblTap,
	    tapHold,
	    tap;

	//setup header click event bindings
	if (typeof def.headerClick == "function") {
		self.element.addEventListener("click", function (e) {
			def.headerClick(e, self.getComponent());
		});
	}

	if (typeof def.headerDblClick == "function") {
		self.element.addEventListener("dblclick", function (e) {
			def.headerDblClick(e, self.getComponent());
		});
	}

	if (typeof def.headerContext == "function") {
		self.element.addEventListener("contextmenu", function (e) {
			def.headerContext(e, self.getComponent());
		});
	}

	//setup header tap event bindings
	if (typeof def.headerTap == "function") {
		tap = false;

		self.element.addEventListener("touchstart", function (e) {
			tap = true;
		});

		self.element.addEventListener("touchend", function (e) {
			if (tap) {
				def.headerTap(e, self.getComponent());
			}

			tap = false;
		});
	}

	if (typeof def.headerDblTap == "function") {
		dblTap = null;

		self.element.addEventListener("touchend", function (e) {

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

		self.element.addEventListener("touchstart", function (e) {
			clearTimeout(tapHold);

			tapHold = setTimeout(function () {
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				def.headerTapHold(e, self.getComponent());
			}, 1000);
		});

		self.element.addEventListener("touchend", function (e) {
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
	if (table.modExists("sort")) {
		table.modules.sort.initializeColumn(self, self.contentElement);
	}

	//set column formatter
	if (table.modExists("format")) {
		table.modules.format.initializeColumn(self);
	}

	//set column editor
	if (typeof def.editor != "undefined" && table.modExists("edit")) {
		table.modules.edit.initializeColumn(self);
	}

	//set colum validator
	if (typeof def.validator != "undefined" && table.modExists("validate")) {
		table.modules.validate.initializeColumn(self);
	}

	//set column mutator
	if (table.modExists("mutator")) {
		table.modules.mutator.initializeColumn(self);
	}

	//set column accessor
	if (table.modExists("accessor")) {
		table.modules.accessor.initializeColumn(self);
	}

	//set respoviveLayout
	if (_typeof(table.options.responsiveLayout) && table.modExists("responsiveLayout")) {
		table.modules.responsiveLayout.initializeColumn(self);
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
		self.element.classList.add(def.cssClass);
	}

	if (def.field) {
		this.element.setAttribute("tabulator-field", def.field);
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

	var contentElement = document.createElement("div");
	contentElement.classList.add("tabulator-col-content");

	contentElement.appendChild(self._buildColumnHeaderTitle());

	return contentElement;
};

//build title element of column
Column.prototype._buildColumnHeaderTitle = function () {
	var self = this,
	    def = self.definition,
	    table = self.table,
	    title;

	var titleHolderElement = document.createElement("div");
	titleHolderElement.classList.add("tabulator-col-title");

	if (def.editableTitle) {
		var titleElement = document.createElement("input");
		titleElement.classList.add("tabulator-title-editor");

		titleElement.addEventListener("click", function (e) {
			e.stopPropagation();
			titleElement.focus();
		});

		titleElement.addEventListener("change", function () {
			def.title = titleElement.value;
			table.options.columnTitleChanged.call(self.table, self.getComponent());
		});

		titleHolderElement.appendChild(titleElement);

		if (def.field) {
			table.modules.localize.bind("columns|" + def.field, function (text) {
				titleElement.value = text || def.title || "&nbsp";
			});
		} else {
			titleElement.value = def.title || "&nbsp";
		}
	} else {
		if (def.field) {
			table.modules.localize.bind("columns|" + def.field, function (text) {
				self._formatColumnHeaderTitle(titleHolderElement, text || def.title || "&nbsp");
			});
		} else {
			self._formatColumnHeaderTitle(titleHolderElement, def.title || "&nbsp");
		}
	}

	return titleHolderElement;
};

Column.prototype._formatColumnHeaderTitle = function (el, title) {
	var formatter, contents, params, mockCell;

	if (this.definition.titleFormatter && this.table.modExists("format")) {

		formatter = this.table.modules.format.getFormatter(this.definition.titleFormatter);

		mockCell = {
			getValue: function getValue() {
				return title;
			},
			getElement: function getElement() {
				return el;
			}
		};

		params = this.definition.titleFormatterParams || {};

		params = typeof params === "function" ? params() : params;

		contents = formatter.call(this.table.modules.format, mockCell, params);

		switch (typeof contents === 'undefined' ? 'undefined' : _typeof(contents)) {
			case "object":
				if (contents instanceof Node) {
					this.element.appendChild(contents);
				} else {
					this.element.innerHTML = "";
					console.warn("Format Error - Title formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", contents);
				}
				break;
			case "undefined":
			case "null":
				this.element.innerHTML = "";
				break;
			default:
				this.element.innerHTML = contents;
		}
	} else {
		el.innerHTML = title;
	}
};

//build header element for column group
Column.prototype._buildGroupHeader = function () {
	this.element.classList.add("tabulator-col-group");
	this.element.setAttribute("role", "columngroup");
	this.element.setAttribute("aria-title", this.definition.title);

	this.element.appendChild(this.groupElement);
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
		self.groupElement.appendChild(column.getElement());
	} else {
		console.warn("Column Warning - Column being attached to another column instead of column group");
	}
};

//vertically align header in column
Column.prototype.verticalAlign = function (alignment, height) {

	//calculate height of column header and group holder element
	var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : height || this.parent.getHeadersElement().clientHeight;
	// var parentHeight = this.parent.isGroup ? this.parent.getGroupElement().clientHeight : this.parent.getHeadersElement().clientHeight;

	this.element.style.height = parentHeight + "px";

	if (this.isGroup) {
		this.groupElement.style.minHeight = parentHeight - this.contentElement.offsetHeight + "px";
	}

	//vertically align cell contents
	if (!this.isGroup && alignment !== "top") {
		if (alignment === "bottom") {
			this.element.style.paddingTop = this.element.clientHeight - this.contentElement.offsetHeight + "px";
		} else {
			this.element.style.paddingTop = (this.element.clientHeight - this.contentElement.offsetHeight) / 2 + "px";
		}
	}

	this.columns.forEach(function (column) {
		column.verticalAlign(alignment);
	});
};

//clear vertical alignmenet
Column.prototype.clearVerticalAlign = function () {
	this.element.style.paddingTop = "";
	this.element.style.height = "";
	this.element.style.minHeight = "";

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
		this.parent.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), false);
	} else {
		this.hide();
	}
};

//show column
Column.prototype.show = function (silent, responsiveToggle) {
	if (!this.visible) {
		this.visible = true;

		this.element.style.display = "";

		this.table.columnManager._verticalAlignHeaders();

		if (this.parent.isGroup) {
			this.parent.checkColumnVisibility();
		}

		this.cells.forEach(function (cell) {
			cell.show();
		});

		if (this.table.options.persistentLayout && this.table.modExists("responsiveLayout", true)) {
			this.table.modules.persistence.save("columns");
		}

		if (!responsiveToggle && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
			this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible);
		}

		if (!silent) {
			this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), true);
		}
	}
};

//hide column
Column.prototype.hide = function (silent, responsiveToggle) {
	if (this.visible) {
		this.visible = false;

		this.element.style.display = "none";

		this.table.columnManager._verticalAlignHeaders();

		if (this.parent.isGroup) {
			this.parent.checkColumnVisibility();
		}

		this.cells.forEach(function (cell) {
			cell.hide();
		});

		if (this.table.options.persistentLayout && this.table.modExists("persistence", true)) {
			this.table.modules.persistence.save("columns");
		}

		if (!responsiveToggle && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {
			this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible);
		}

		if (!silent) {
			this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), false);
		}
	}
};

Column.prototype.matchChildWidths = function () {
	var childWidth = 0;

	if (this.contentElement && this.columns.length) {
		this.columns.forEach(function (column) {
			childWidth += column.getWidth();
		});

		this.contentElement.style.maxWidth = childWidth - 1 + "px";
	}
};

Column.prototype.setWidth = function (width) {
	this.widthFixed = true;
	this.setWidthActual(width);
};

Column.prototype.setWidthActual = function (width) {

	if (isNaN(width)) {
		width = Math.floor(this.table.element.clientWidth / 100 * parseInt(width));
	}

	width = Math.max(this.minWidth, width);

	this.width = width;

	this.element.style.width = width ? width + "px" : "";

	if (!this.isGroup) {
		this.cells.forEach(function (cell) {
			cell.setWidth(width);
		});
	}

	if (this.parent.isGroup) {
		this.parent.matchChildWidths();
	}

	//set resizable handles
	if (this.table.modExists("frozenColumns")) {
		this.table.modules.frozenColumns.layout();
	}
};

Column.prototype.checkCellHeights = function () {
	var rows = [];

	this.cells.forEach(function (cell) {
		if (cell.row.heightInitialized) {
			if (cell.row.getElement().offsetParent !== null) {
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
	// return this.element.offsetWidth;
	return this.width;
};

Column.prototype.getHeight = function () {
	return this.element.offsetHeight;
};

Column.prototype.setMinWidth = function (minWidth) {
	this.minWidth = minWidth;

	this.element.style.minWidth = minWidth ? minWidth + "px" : "";

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

	this.element.parentNode.removeChild(this.element);

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
	if (this.table.modExists("filter")) {
		this.table.modules.filter.hideHeaderFilterElements();
	}

	this.fitToData();

	//show header filters again after layout is complete
	if (this.table.modExists("filter")) {
		this.table.modules.filter.showHeaderFilterElements();
	}
};

//set column width to maximum cell width
Column.prototype.fitToData = function () {
	var self = this;

	if (!this.widthFixed) {
		this.element.width = "";

		self.cells.forEach(function (cell) {
			cell.setWidth("");
		});
	}

	var maxWidth = this.element.offsetWidth;

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
	this.element = this.createHolderElement(); //containing element
	this.tableElement = this.createTableElement(); //table element
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

RowManager.prototype.createHolderElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-tableHolder");
	el.setAttribute("tabindex", 0);

	return el;
};

RowManager.prototype.createTableElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-table");

	return el;
};

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
	self.element.appendChild(self.tableElement);

	self.firstRender = true;

	//scroll header along with table body
	self.element.addEventListener("scroll", function () {
		var left = self.element.scrollLeft;

		//handle horizontal scrolling
		if (self.scrollLeft != left) {
			self.columnManager.scrollHorizontal(left);

			if (self.table.options.groupBy) {
				self.table.modules.groupRows.scrollHeaders(left);
			}

			if (self.table.modExists("columnCalcs")) {
				self.table.modules.columnCalcs.scrollHorizontal(left);
			}
		}

		self.scrollLeft = left;
	});

	//handle virtual dom scrolling
	if (this.renderMode === "virtual") {

		self.element.addEventListener("scroll", function () {
			var top = self.element.scrollTop;
			var dir = self.scrollTop > top;

			//handle verical scrolling
			if (self.scrollTop != top) {
				self.scrollTop = top;
				self.scrollVertical(dir);

				if (self.table.options.ajaxProgressiveLoad == "scroll") {
					self.table.modules.ajax.nextPage(self.element.scrollHeight - self.element.clientHeight - top);
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
		} else if (subject instanceof HTMLElement) {
			//subject is a HTML element of the row
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
	var _this2 = this;

	var rowIndex = this.getDisplayRows().indexOf(row),
	    rowEl = row.getElement(),
	    rowTop,
	    offset = 0;

	return new Promise(function (resolve, reject) {
		if (rowIndex > -1) {

			if (typeof position === "undefined") {
				position = _this2.table.options.scrollToRowPosition;
			}

			if (typeof ifVisible === "undefined") {
				ifVisible = _this2.table.options.scrollToRowIfVisible;
			}

			if (position === "nearest") {
				switch (_this2.renderMode) {
					case "classic":
						rowTop = Tabulator.prototype.helpers.elOffset(rowEl).top;
						position = Math.abs(_this2.element.scrollTop - rowTop) > Math.abs(_this2.element.scrollTop + _this2.element.clientHeight - rowTop) ? "bottom" : "top";
						break;
					case "virtual":
						position = Math.abs(_this2.vDomTop - rowIndex) > Math.abs(_this2.vDomBottom - rowIndex) ? "bottom" : "top";
						break;
				}
			}

			//check row visibility
			if (!ifVisible) {
				if (Tabulator.prototype.helpers.elVisible(rowEl)) {
					offset = Tabulator.prototype.helpers.elOffset(rowEl).top - Tabulator.prototype.helpers.elOffset(_this2.element).top;

					if (offset > 0 && offset < _this2.element.clientHeight - rowEl.offsetHeight) {
						return false;
					}
				}
			}

			//scroll to row
			switch (_this2.renderMode) {
				case "classic":
					_this2.element.scrollTop = Tabulator.prototype.helpers.elOffset(rowEl).top - Tabulator.prototype.helpers.elOffset(_this2.element).top + _this2.element.scrollTop;
					break;
				case "virtual":
					_this2._virtualRenderFill(rowIndex, true);
					break;
			}

			//align to correct position
			switch (position) {
				case "middle":
				case "center":
					_this2.element.scrollTop = _this2.element.scrollTop - _this2.element.clientHeight / 2;
					break;

				case "bottom":
					_this2.element.scrollTop = _this2.element.scrollTop - _this2.element.clientHeight + rowEl.offsetHeight;
					break;
			}

			resolve();
		} else {
			console.warn("Scroll Error - Row not visible");
			reject("Scroll Error - Row not visible");
		}
	});
};

////////////////// Data Handling //////////////////

RowManager.prototype.setData = function (data, renderInPosition) {
	var _this3 = this;

	var self = this;

	return new Promise(function (resolve, reject) {
		if (renderInPosition && _this3.getDisplayRows().length) {
			if (self.table.options.pagination) {
				self._setDataActual(data, true);
			} else {
				_this3.reRenderInPosition(function () {
					self._setDataActual(data);
				});
			}
		} else {
			_this3.resetScroll();
			_this3._setDataActual(data);
		}

		resolve();
	});
};

RowManager.prototype._setDataActual = function (data, renderInPosition) {
	var self = this;

	self.table.options.dataLoading.call(this.table, data);

	self.rows.forEach(function (row) {
		row.wipe();
	});

	self.rows = [];

	if (this.table.options.history && this.table.modExists("history")) {
		this.table.modules.history.clear();
	}

	if (Array.isArray(data)) {

		if (this.table.modExists("selectRow")) {
			this.table.modules.selectRow.clearSelectionData();
		}

		data.forEach(function (def, i) {
			if (def && (typeof def === 'undefined' ? 'undefined' : _typeof(def)) === "object") {
				var row = new Row(def, self);
				self.rows.push(row);
			} else {
				console.warn("Data Loading Warning - Invalid row data detected and ignored, expecting object but received:", def);
			}
		});

		self.table.options.dataLoaded.call(this.table, data);

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

	this.table.options.rowDeleted.call(this.table, row.getComponent());

	this.table.options.dataEdited.call(this.table, this.getData());

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		this.table.modules.groupRows.updateGroupRows(true);
	} else if (this.table.options.pagination && this.table.modExists("page")) {
		this.refreshActiveData(false, false, true);
	} else {
		if (this.table.options.pagination && this.table.modExists("page")) {
			this.refreshActiveData("page");
		}
	}
};

RowManager.prototype.addRow = function (data, pos, index, blockRedraw) {

	var row = this.addRowActual(data, pos, index, blockRedraw);

	if (this.table.options.history && this.table.modExists("history")) {
		this.table.modules.history.action("rowAdd", row, { data: data, pos: pos, index: index });
	}

	return row;
};

//add multiple rows
RowManager.prototype.addRows = function (data, pos, index) {
	var _this4 = this;

	var self = this,
	    length = 0,
	    rows = [];

	return new Promise(function (resolve, reject) {
		pos = _this4.findAddRowPos(pos);

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

		if (_this4.table.options.groupBy && _this4.table.modExists("groupRows")) {
			_this4.table.modules.groupRows.updateGroupRows(true);
		} else if (_this4.table.options.pagination && _this4.table.modExists("page")) {
			_this4.refreshActiveData(false, false, true);
		} else {
			_this4.reRenderInPosition();
		}

		//recalc column calculations if present
		if (_this4.table.modExists("columnCalcs")) {
			_this4.table.modules.columnCalcs.recalc(_this4.table.rowManager.activeRows);
		}

		resolve(rows);
	});
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
	var row = data instanceof Row ? data : new Row(data || {}, this),
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
				top = dispRows.length < this.table.modules.page.getPageSize() ? false : true;
			}
		}
	}

	if (index) {
		index = this.findRow(index);
	}

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		this.table.modules.groupRows.assignRowToGroup(row);

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
	}

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

	this.table.options.rowAdded.call(this.table, row.getComponent());

	this.table.options.dataEdited.call(this.table, this.getData());

	if (!blockRedraw) {
		this.reRenderInPosition();
	}

	return row;
};

RowManager.prototype.moveRow = function (from, to, after) {
	if (this.table.options.history && this.table.modExists("history")) {
		this.table.modules.history.action("rowMove", from, { pos: this.getRowPosition(from), to: to, after: after });
	}

	this.moveRowActual(from, to, after);

	this.table.options.rowMoved.call(this.table, from.getComponent());
};

RowManager.prototype.moveRowActual = function (from, to, after) {
	var self = this;
	this._moveRowInArray(this.rows, from, to, after);
	this._moveRowInArray(this.activeRows, from, to, after);

	this.displayRowIterator(function (rows) {
		self._moveRowInArray(rows, from, to, after);
	});

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
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
	table = '<table>\n\t\t<thead>\n\t\t<tr>' + header + '</tr>\n\t\t</thead>\n\t\t<tbody>' + body + '</tbody>\n\t\t</table>';

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

	if (table.modExists("page")) {
		//set sort data if defined
		if (options.ajaxSorting) {
			var sorters = self.table.modules.sort.getSort();

			sorters.forEach(function (item) {
				delete item.column;
			});

			params[self.table.modules.page.paginationDataSentNames.sorters] = sorters;
		}

		//set filter data if defined
		if (options.ajaxFiltering) {
			var filters = self.table.modules.filter.getFilters(true, true);

			params[self.table.modules.page.paginationDataSentNames.filters] = filters;
		}

		self.table.modules.ajax.setParams(params, true);
	}

	table.modules.ajax.sendRequest().then(function (data) {
		self.setData(data);
	}).catch(function (e) {});
};

//choose the path to refresh data after a filter update
RowManager.prototype.filterRefresh = function () {
	var table = this.table,
	    options = table.options,
	    left = this.scrollLeft;

	if (options.ajaxFiltering) {
		if (options.pagination == "remote" && table.modExists("page")) {
			table.modules.page.reset(true);
			table.modules.page.setPage(1);
		} else if (options.ajaxProgressiveLoad) {
			table.modules.ajax.loadData();
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
		if ((options.pagination == "remote" || options.progressiveLoad) && table.modExists("page")) {
			table.modules.page.reset(true);
			table.modules.page.setPage(1);
		} else if (options.ajaxProgressiveLoad) {
			table.modules.ajax.loadData();
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
	this.element.scrollLeft = left;

	if (this.table.options.groupBy) {
		this.table.modules.groupRows.scrollHeaders(left);
	}

	if (this.table.modExists("columnCalcs")) {
		this.table.modules.columnCalcs.scrollHorizontal(left);
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

	if (table.options.selectable && !table.options.selectablePersistence && table.modExists("selectRow")) {
		table.modules.selectRow.deselectRows();
	}

	//cascade through data refresh stages
	switch (stage) {
		case "all":

		case "filter":
			if (!skipStage) {
				if (table.modExists("filter")) {
					self.setActiveRows(table.modules.filter.filter(self.rows));
				} else {
					self.setActiveRows(self.rows.slice(0));
				}
			} else {
				skipStage = false;
			}

		case "sort":
			if (!skipStage) {
				if (table.modExists("sort")) {
					table.modules.sort.sort();
				}
			} else {
				skipStage = false;
			}

		//generic stage to allow for pipeline trigger after the data manipulation stage
		case "display":
			this.resetDisplayRows();

		case "freeze":
			if (!skipStage) {
				if (this.table.modExists("frozenRows")) {
					if (table.modules.frozenRows.isFrozen()) {
						if (!table.modules.frozenRows.getDisplayIndex()) {
							table.modules.frozenRows.setDisplayIndex(this.getNextDisplayIndex());
						}

						displayIndex = table.modules.frozenRows.getDisplayIndex();

						displayIndex = self.setDisplayRows(table.modules.frozenRows.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

						if (displayIndex !== true) {
							table.modules.frozenRows.setDisplayIndex(displayIndex);
						}
					}
				}
			} else {
				skipStage = false;
			}

		case "group":
			if (!skipStage) {
				if (table.options.groupBy && table.modExists("groupRows")) {

					if (!table.modules.groupRows.getDisplayIndex()) {
						table.modules.groupRows.setDisplayIndex(this.getNextDisplayIndex());
					}

					displayIndex = table.modules.groupRows.getDisplayIndex();

					displayIndex = self.setDisplayRows(table.modules.groupRows.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

					if (displayIndex !== true) {
						table.modules.groupRows.setDisplayIndex(displayIndex);
					}
				}
			} else {
				skipStage = false;
			}

		case "tree":

			if (!skipStage) {
				if (table.options.dataTree && table.modExists("dataTree")) {
					if (!table.modules.dataTree.getDisplayIndex()) {
						table.modules.dataTree.setDisplayIndex(this.getNextDisplayIndex());
					}

					displayIndex = table.modules.dataTree.getDisplayIndex();

					displayIndex = self.setDisplayRows(table.modules.dataTree.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

					if (displayIndex !== true) {
						table.modules.dataTree.setDisplayIndex(displayIndex);
					}
				}
			} else {
				skipStage = false;
			}

			if (table.options.pagination && table.modExists("page") && !renderInPosition) {
				if (table.modules.page.getMode() == "local") {
					table.modules.page.reset();
				}
			}

		case "page":
			if (!skipStage) {
				if (table.options.pagination && table.modExists("page")) {

					if (!table.modules.page.getDisplayIndex()) {
						table.modules.page.setDisplayIndex(this.getNextDisplayIndex());
					}

					displayIndex = table.modules.page.getDisplayIndex();

					if (table.modules.page.getMode() == "local") {
						table.modules.page.setMaxRows(this.getDisplayRows(displayIndex - 1).length);
					}

					displayIndex = self.setDisplayRows(table.modules.page.getRows(this.getDisplayRows(displayIndex - 1)), displayIndex);

					if (displayIndex !== true) {
						table.modules.page.setDisplayIndex(displayIndex);
					}
				}
			} else {
				skipStage = false;
			}
	}

	if (Tabulator.prototype.helpers.elVisible(self.element)) {
		if (renderInPosition) {
			self.reRenderInPosition();
		} else {
			self.renderTable();
			if (table.options.layoutColumnsOnNewData) {
				self.table.columnManager.redraw(true);
			}
		}
	}

	if (table.modExists("columnCalcs")) {
		table.modules.columnCalcs.recalc(this.activeRows);
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

	if (this.table.modExists("frozenRows")) {
		this.table.modules.frozenRows.setDisplayIndex(0);
	}

	if (this.table.options.groupBy && this.table.modExists("groupRows")) {
		this.table.modules.groupRows.setDisplayIndex(0);
	}

	if (this.table.options.pagination && this.table.modExists("page")) {
		this.table.modules.page.setDisplayIndex(0);
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

		var scrollTop = this.element.scrollTop;
		var topRow = false;
		var topOffset = false;

		var left = this.scrollLeft;

		var rows = this.getDisplayRows();

		for (var i = this.vDomTop; i <= this.vDomBottom; i++) {

			if (rows[i]) {
				var diff = scrollTop - rows[i].getElement().offsetTop;

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
	if ((this.table.element.clientHeight || this.table.options.height) && this.table.options.virtualDom) {
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

	self.table.options.renderStarted.call(this.table);

	self.element.scrollTop = 0;

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
			self.table.modules.layout.layout();
		} else {
			self.renderEmptyScroll();
		}
	}

	if (self.table.modExists("frozenColumns")) {
		self.table.modules.frozenColumns.layout();
	}

	if (!self.displayRowsCount) {
		if (self.table.options.placeholder) {

			if (this.renderMode) {
				self.table.options.placeholder.setAttribute("tabulator-render-mode", this.renderMode);
			}

			self.getElement().appendChild(self.table.options.placeholder);
		}
	}

	self.table.options.renderComplete.call(this.table);
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
			element.appendChild(row.getElement());
			row.initialize(true);

			if (row.type !== "group") {
				onlyGroupHeaders = false;
			}
		});

		if (onlyGroupHeaders) {
			element.style.minWidth = self.table.columnManager.getWidth() + "px";
		}
	} else {
		self.renderEmptyScroll();
	}
};

//show scrollbars on empty table div
RowManager.prototype.renderEmptyScroll = function () {
	this.tableElement.style.minWidth = this.table.columnManager.getWidth();
	this.tableElement.style.minHeight = "1px";
	// this.tableElement.style.visibility = "hidden";
};

RowManager.prototype._clearVirtualDom = function () {
	var element = this.tableElement;

	if (this.table.options.placeholder && this.table.options.placeholder.parentNode) {
		this.table.options.placeholder.parentNode.removeChild(this.table.options.placeholder);
	}

	// element.children.detach();
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}element.style.paddingTop = "";
	element.style.paddingBottom = "";
	element.style.minWidth = "";
	element.style.minHeight = "";
	element.style.visibility = "";

	this.scrollTop = 0;
	this.scrollLeft = 0;
	this.vDomTop = 0;
	this.vDomBottom = 0;
	this.vDomTopPad = 0;
	this.vDomBottomPad = 0;
};

RowManager.prototype.styleRow = function (row, index) {
	var rowEl = row.getElement();

	if (index % 2) {
		rowEl.classList.add("tabulator-row-even");
		rowEl.classList.remove("tabulator-row-odd");
	} else {
		rowEl.classList.add("tabulator-row-odd");
		rowEl.classList.remove("tabulator-row-even");
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
	    onlyGroupHeaders = true,
	    rows = self.getDisplayRows();

	position = position || 0;

	offset = offset || 0;

	if (!position) {
		self._clearVirtualDom();
	} else {
		// element.children().detach();
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		} //check if position is too close to bottom of table
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

	if (self.displayRowsCount && Tabulator.prototype.helpers.elVisible(self.element)) {

		self.vDomTop = position;

		self.vDomBottom = position - 1;

		while ((rowsHeight <= self.height + self.vDomWindowBuffer || i < self.vDomWindowMinTotalRows) && self.vDomBottom < self.displayRowsCount - 1) {
			var index = self.vDomBottom + 1,
			    row = rows[index];

			self.styleRow(row, index);

			element.appendChild(row.getElement());
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

			if (row.type !== "group") {
				onlyGroupHeaders = false;
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

		element.style.paddingTop = self.vDomTopPad + "px";
		element.style.paddingBottom = self.vDomBottomPad + "px";

		if (forceMove) {
			this.scrollTop = self.vDomTopPad + topPadHeight + offset - (this.element.scrollWidth > this.element.clientWidth ? this.element.offsetHeight - this.element.clientHeight : 0);
		}

		this.scrollTop = Math.min(this.scrollTop, this.element.scrollHeight - this.height);

		//adjust for horizontal scrollbar if present (and not at top of table)
		if (this.element.scrollWidth > this.element.offsetWidth && forceMove) {
			this.scrollTop += this.element.offsetHeight - this.element.clientHeight;
		}

		this.vDomScrollPosTop = this.scrollTop;
		this.vDomScrollPosBottom = this.scrollTop;

		holder.scrollTop = this.scrollTop;

		element.style.minWidth = onlyGroupHeaders ? self.table.columnManager.getWidth() + "px" : "";

		if (self.table.options.groupBy) {
			if (self.table.modules.layout.getMode() != "fitDataFill" && self.displayRowsCount == self.table.modules.groupRows.countGroups()) {
				self.tableElement.style.minWidth = self.table.columnManager.getWidth();
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
		this._virtualRenderFill(Math.floor(this.element.scrollTop / this.element.scrollHeight * this.displayRowsCount));
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
			table.insertBefore(topRow.getElement(), table.firstChild);
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

			table.style.paddingTop = this.vDomTopPad + "px";
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

		var rowEl = topRow.getElement();
		rowEl.parentNode.removeChild(rowEl);

		this.vDomTopPad += topRowHeight;
		table.style.paddingTop = this.vDomTopPad + "px";
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
			table.appendChild(bottomRow.getElement());

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

			table.style.paddingBottom = this.vDomBottomPad + "px";
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

		var rowEl = bottomRow.getElement();

		if (rowEl.parentNode) {
			rowEl.parentNode.removeChild(rowEl);
		}

		this.vDomBottomPad += bottomRowHeight;

		if (this.vDomBottomPad < 0) {
			this.vDomBottomPad = 0;
		}

		table.style.paddingBottom = this.vDomBottomPad + "px";
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
	this.activeRows.forEach(function (row) {
		row.normalizeHeight();
	});
};

//adjust the height of the table holder to fit in the Tabulator element
RowManager.prototype.adjustTableSize = function () {

	if (this.renderMode === "virtual") {
		this.height = this.element.clientHeight;
		this.vDomWindowBuffer = this.table.options.virtualDomBuffer || this.height;

		var otherHeight = this.columnManager.getElement().offsetHeight + (this.table.footerManager && !this.table.footerManager.external ? this.table.footerManager.getElement().offsetHeight : 0);

		this.element.style.minHeight = "calc(100% - " + otherHeight + "px)";
		this.element.style.height = "calc(100% - " + otherHeight + "px)";
		this.element.style.maxHeight = "calc(100% - " + otherHeight + "px)";
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
				this.getElement().appendChild(this.table.options.placeholder);
			}
		}
	} else {
		this.renderTable();
	}
};

RowManager.prototype.resetScroll = function () {
	this.element.scrollLeft = 0;
	this.element.scrollTop = 0;

	if (this.table.browser === "ie") {
		var event = document.createEvent("Event");
		event.initEvent("scroll", false, true);
		this.element.dispatchEvent(event);
	} else {
		this.element.dispatchEvent(new Event('scroll'));
	}
};

//public row object
var RowComponent = function RowComponent(row) {
	this._row = row;
};

RowComponent.prototype.getData = function (transform) {
	return this._row.getData(transform);
};

RowComponent.prototype.getElement = function () {
	return this._row.getElement();
};

RowComponent.prototype.getCells = function () {
	var cells = [];

	this._row.getCells().forEach(function (cell) {
		cells.push(cell.getComponent());
	});

	return cells;
};

RowComponent.prototype.getCell = function (column) {
	var cell = this._row.getCell(column);
	return cell ? cell.getComponent() : false;
};

RowComponent.prototype.getIndex = function () {
	return this._row.getData("data")[this._row.table.options.index];
};

RowComponent.prototype.getPosition = function (active) {
	return this._row.table.rowManager.getRowPosition(this._row, active);
};

RowComponent.prototype.delete = function () {
	return this._row.delete();
};

RowComponent.prototype.scrollTo = function () {
	return this._row.table.rowManager.scrollToRow(this._row);
};

RowComponent.prototype.update = function (data) {
	return this._row.updateData(data);
};

RowComponent.prototype.normalizeHeight = function () {
	this._row.normalizeHeight(true);
};

RowComponent.prototype.select = function () {
	this._row.table.modules.selectRow.selectRows(this._row);
};

RowComponent.prototype.deselect = function () {
	this._row.table.modules.selectRow.deselectRows(this._row);
};

RowComponent.prototype.toggleSelect = function () {
	this._row.table.modules.selectRow.toggleRow(this._row);
};

RowComponent.prototype.isSelected = function () {
	return this._row.table.modules.selectRow.isRowSelected(this._row);
};

RowComponent.prototype._getSelf = function () {
	return this._row;
};

RowComponent.prototype.freeze = function () {
	if (this._row.table.modExists("frozenRows", true)) {
		this._row.table.modules.frozenRows.freezeRow(this._row);
	}
};

RowComponent.prototype.unfreeze = function () {
	if (this._row.table.modExists("frozenRows", true)) {
		this._row.table.modules.frozenRows.unfreezeRow(this._row);
	}
};

RowComponent.prototype.treeCollapse = function () {
	if (this._row.table.modExists("dataTree", true)) {
		this._row.table.modules.dataTree.collapseRow(this._row);
	}
};

RowComponent.prototype.treeExpand = function () {
	if (this._row.table.modExists("dataTree", true)) {
		this._row.table.modules.dataTree.expandRow(this._row);
	}
};

RowComponent.prototype.treeToggle = function () {
	if (this._row.table.modExists("dataTree", true)) {
		this._row.table.modules.dataTree.toggleRow(this._row);
	}
};

RowComponent.prototype.getTreeParent = function () {
	if (this._row.table.modExists("dataTree", true)) {
		return this._row.table.modules.dataTree.getTreeParent(this._row);
	}

	return false;
};

RowComponent.prototype.getTreeChildren = function () {
	if (this._row.table.modExists("dataTree", true)) {
		return this._row.table.modules.dataTree.getTreeChildren(this._row);
	}

	return false;
};

RowComponent.prototype.reformat = function () {
	return this._row.reinitialize();
};

RowComponent.prototype.getGroup = function () {
	return this._row.getGroup().getComponent();
};

RowComponent.prototype.getTable = function () {
	return this._row.table;
};

RowComponent.prototype.getNextRow = function () {
	return this._row.nextRow();
};

RowComponent.prototype.getPrevRow = function () {
	return this._row.prevRow();
};

var Row = function Row(data, parent) {
	this.table = parent.table;
	this.parent = parent;
	this.data = {};
	this.type = "row"; //type of element
	this.element = this.createElement();
	this.modules = {}; //hold module variables;
	this.cells = [];
	this.height = 0; //hold element height
	this.outerHeight = 0; //holde lements outer height
	this.initialized = false; //element has been rendered
	this.heightInitialized = false; //element has resized cells to fit

	this.setData(data);
	this.generateElement();
};

Row.prototype.createElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-row");
	el.setAttribute("role", "row");

	return el;
};

Row.prototype.getElement = function () {
	return this.element;
};

Row.prototype.detachElement = function () {
	if (this.element && this.element.parentNode) {
		this.element.parentNode.removeChild(this.element);
	}
};

Row.prototype.generateElement = function () {
	var self = this,
	    dblTap,
	    tapHold,
	    tap;

	//set row selection characteristics
	if (self.table.options.selectable !== false && self.table.modExists("selectRow")) {
		self.table.modules.selectRow.initializeRow(this);
	}

	//setup movable rows
	if (self.table.options.movableRows !== false && self.table.modExists("moveRow")) {
		self.table.modules.moveRow.initializeRow(this);
	}

	//setup data tree
	if (self.table.options.dataTree !== false && self.table.modExists("dataTree")) {
		self.table.modules.dataTree.initializeRow(this);
	}

	//handle row click events
	if (self.table.options.rowClick) {
		self.element.addEventListener("click", function (e) {
			self.table.options.rowClick(e, self.getComponent());
		});
	}

	if (self.table.options.rowDblClick) {
		self.element.addEventListener("dblclick", function (e) {
			self.table.options.rowDblClick(e, self.getComponent());
		});
	}

	if (self.table.options.rowContext) {
		self.element.addEventListener("contextmenu", function (e) {
			self.table.options.rowContext(e, self.getComponent());
		});
	}

	if (self.table.options.rowTap) {

		tap = false;

		self.element.addEventListener("touchstart", function (e) {
			tap = true;
		});

		self.element.addEventListener("touchend", function (e) {
			if (tap) {
				self.table.options.rowTap(e, self.getComponent());
			}

			tap = false;
		});
	}

	if (self.table.options.rowDblTap) {

		dblTap = null;

		self.element.addEventListener("touchend", function (e) {

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

		self.element.addEventListener("touchstart", function (e) {
			clearTimeout(tapHold);

			tapHold = setTimeout(function () {
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				self.table.options.rowTapHold(e, self.getComponent());
			}, 1000);
		});

		self.element.addEventListener("touchend", function (e) {
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

		while (self.element.firstChild) {
			self.element.removeChild(self.element.firstChild);
		} //handle frozen cells
		if (this.table.modExists("frozenColumns")) {
			this.table.modules.frozenColumns.layoutRow(this);
		}

		this.generateCells();

		self.cells.forEach(function (cell) {
			self.element.appendChild(cell.getElement());
			cell.cellRendered();
		});

		if (force) {
			self.normalizeHeight();
		}

		//setup movable rows
		if (self.table.options.dataTree && self.table.modExists("dataTree")) {
			self.table.modules.dataTree.layoutRow(this);
		}

		//setup movable rows
		if (self.table.options.responsiveLayout === "collapse" && self.table.modExists("responsiveLayout")) {
			self.table.modules.responsiveLayout.layoutRow(this);
		}

		if (self.table.options.rowFormatter) {
			self.table.options.rowFormatter(self.getComponent());
		}

		//set resizable handles
		if (self.table.options.resizableRows && self.table.modExists("resizeRows")) {
			self.table.modules.resizeRows.initializeRow(self);
		}

		self.initialized = true;
	}
};

Row.prototype.reinitializeHeight = function () {
	this.heightInitialized = false;

	if (this.element.offsetParent !== null) {
		this.normalizeHeight(true);
	}
};

Row.prototype.reinitialize = function () {
	this.initialized = false;
	this.heightInitialized = false;
	this.height = 0;

	if (this.element.offsetParent !== null) {
		this.initialize(true);
	}
};

//get heights when doing bulk row style calcs in virtual DOM
Row.prototype.calcHeight = function () {

	var maxHeight = 0,
	    minHeight = this.table.options.resizableRows ? this.element.clientHeight : 0;

	this.cells.forEach(function (cell) {
		var height = cell.getHeight();
		if (height > maxHeight) {
			maxHeight = height;
		}
	});

	this.height = Math.max(maxHeight, minHeight);
	this.outerHeight = this.element.offsetHeight;
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
		this.outerHeight = this.element.offsetHeight;
	}
};

//return rows outer height
Row.prototype.getHeight = function () {
	return this.outerHeight;
};

//return rows outer Width
Row.prototype.getWidth = function () {
	return this.element.offsetWidth;
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

	if (self.table.modExists("mutator")) {
		self.data = self.table.modules.mutator.transformRow(data, "data");
	} else {
		self.data = data;
	}
};

//update the rows data
Row.prototype.updateData = function (data) {
	var _this5 = this;

	var self = this;

	return new Promise(function (resolve, reject) {

		if (typeof data === "string") {
			data = JSON.parse(data);
		}

		//mutate incomming data if needed
		if (self.table.modExists("mutator")) {
			data = self.table.modules.mutator.transformRow(data, "data", true);
		}

		//set data
		for (var attrname in data) {
			self.data[attrname] = data[attrname];
		}

		//update affected cells only
		for (var attrname in data) {
			var cell = _this5.getCell(attrname);

			if (cell) {
				if (cell.getValue() != data[attrname]) {
					cell.setValueProcessData(data[attrname]);
				}
			}
		}

		//Partial reinitialization if visible
		if (Tabulator.prototype.helpers.elVisible(_this5.element)) {
			self.normalizeHeight();

			if (self.table.options.rowFormatter) {
				self.table.options.rowFormatter(self.getComponent());
			}
		} else {
			_this5.initialized = false;
			_this5.height = 0;
		}

		//self.reinitialize();

		self.table.options.rowUpdated.call(_this5.table, self.getComponent());

		resolve();
	});
};

Row.prototype.getData = function (transform) {
	var self = this;

	if (transform) {
		if (self.table.modExists("accessor")) {
			return self.table.modules.accessor.transformRow(self.data, transform);
		}
	} else {
		return this.data;
	}
};

Row.prototype.getCell = function (column) {
	var match = false;

	column = this.table.columnManager.findColumn(column);

	match = this.cells.find(function (cell) {
		return cell.column === column;
	});

	return match;
};

Row.prototype.getCellIndex = function (findCell) {
	return this.cells.findIndex(function (cell) {
		return cell === findCell;
	});
};

Row.prototype.findNextEditableCell = function (index) {
	var nextCell = false;

	if (index < this.cells.length - 1) {
		for (var i = index + 1; i < this.cells.length; i++) {
			var cell = this.cells[i];

			if (cell.column.modules.edit && Tabulator.prototype.helpers.elVisible(cell.getElement())) {
				var allowEdit = true;

				if (typeof cell.column.modules.edit.check == "function") {
					allowEdit = cell.column.modules.edit.check(cell.getComponent());
				}

				if (allowEdit) {
					nextCell = cell;
					break;
				}
			}
		}
	}

	return nextCell;
};

Row.prototype.findPrevEditableCell = function (index) {
	var prevCell = false;

	if (index > 0) {
		for (var i = index - 1; i >= 0; i--) {
			var cell = this.cells[i],
			    allowEdit = true;

			if (cell.column.modules.edit && Tabulator.prototype.helpers.elVisible(cell.getElement())) {
				if (typeof cell.column.modules.edit.check == "function") {
					allowEdit = cell.column.modules.edit.check(cell.getComponent());
				}

				if (allowEdit) {
					prevCell = cell;
					break;
				}
			}
		}
	}

	return prevCell;
};

Row.prototype.getCells = function () {
	return this.cells;
};

Row.prototype.nextRow = function () {
	var row = this.table.rowManager.nextDisplayRow(this, true);
	return row ? row.getComponent() : false;
};

Row.prototype.prevRow = function () {
	var row = this.table.rowManager.prevDisplayRow(this, true);
	return row ? row.getComponent() : false;
};

///////////////////// Actions  /////////////////////

Row.prototype.delete = function () {
	var _this6 = this;

	return new Promise(function (resolve, reject) {
		var index = _this6.table.rowManager.getRowIndex(_this6);

		_this6.deleteActual();

		if (_this6.table.options.history && _this6.table.modExists("history")) {

			if (index) {
				index = _this6.table.rowManager.rows[index - 1];
			}

			_this6.table.modules.history.action("rowDelete", _this6, { data: _this6.getData(), pos: !index, index: index });
		}

		resolve();
	});
};

Row.prototype.deleteActual = function () {

	var index = this.table.rowManager.getRowIndex(this);

	//deselect row if it is selected
	if (this.table.modExists("selectRow")) {
		this.table.modules.selectRow._deselectRow(this, true);
	}

	// if(this.table.options.dataTree && this.table.modExists("dataTree")){
	// 	this.table.modules.dataTree.collapseRow(this, true);
	// }

	this.table.rowManager.deleteRow(this);

	this.deleteCells();

	this.initialized = false;
	this.heightInitialized = false;

	//remove from group
	if (this.modules.group) {
		this.modules.group.removeRow(this);
	}

	//recalc column calculations if present
	if (this.table.modExists("columnCalcs")) {
		if (this.table.options.groupBy && this.table.modExists("groupRows")) {
			this.table.modules.columnCalcs.recalcRowGroup(this);
		} else {
			this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
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

	// this.element.children().each(function(){
	// 	$(this).remove();
	// })
	// this.element.empty();

	while (this.element.firstChild) {
		this.element.removeChild(this.element.firstChild);
	} // this.element.remove();
	if (this.element.parentNode) {
		this.element.parentNode.removeChild(this.element);
	}
};

Row.prototype.getGroup = function () {
	return this.modules.group || false;
};

//////////////// Object Generation /////////////////
Row.prototype.getComponent = function () {
	return new RowComponent(this);
};

//public row object
var CellComponent = function CellComponent(cell) {
	this._cell = cell;
};

CellComponent.prototype.getValue = function () {
	return this._cell.getValue();
};

CellComponent.prototype.getOldValue = function () {
	return this._cell.getOldValue();
};

CellComponent.prototype.getElement = function () {
	return this._cell.getElement();
};

CellComponent.prototype.getRow = function () {
	return this._cell.row.getComponent();
};

CellComponent.prototype.getData = function () {
	return this._cell.row.getData();
};

CellComponent.prototype.getField = function () {
	return this._cell.column.getField();
};

CellComponent.prototype.getColumn = function () {
	return this._cell.column.getComponent();
};

CellComponent.prototype.setValue = function (value, mutate) {
	if (typeof mutate == "undefined") {
		mutate = true;
	}

	this._cell.setValue(value, mutate);
};

CellComponent.prototype.restoreOldValue = function () {
	this._cell.setValueActual(this._cell.getOldValue());
};

CellComponent.prototype.edit = function (force) {
	return this._cell.edit(force);
};

CellComponent.prototype.cancelEdit = function () {
	this._cell.cancelEdit();
};

CellComponent.prototype.nav = function () {
	return this._cell.nav();
};

CellComponent.prototype.checkHeight = function () {
	this._cell.checkHeight();
};

CellComponent.prototype.getTable = function () {
	return this._cell.table;
};

CellComponent.prototype._getSelf = function () {
	return this._cell;
};

var Cell = function Cell(column, row) {

	this.table = column.table;
	this.column = column;
	this.row = row;
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
	this.element = this.element;
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
	element.style.textAlign = self.column.hozAlign;

	if (field) {
		element.setAttribute("tabulator-field", field);
	}

	if (self.column.definition.cssClass) {
		element.classList.add(self.column.definition.cssClass);
	}

	//set event bindings
	if (cellEvents.cellClick || self.table.options.cellClick) {
		self.element.addEventListener("click", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellClick) {
				cellEvents.cellClick.call(self.table, e, component);
			}

			if (self.table.options.cellClick) {
				self.table.options.cellClick.call(self.table, e, component);
			}
		});
	}

	if (cellEvents.cellDblClick || this.table.options.cellDblClick) {
		element.addEventListener("dblclick", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellDblClick) {
				cellEvents.cellDblClick.call(self.table, e, component);
			}

			if (self.table.options.cellDblClick) {
				self.table.options.cellDblClick.call(self.table, e, component);
			}
		});
	}

	if (cellEvents.cellContext || this.table.options.cellContext) {
		element.addEventListener("contextmenu", function (e) {
			var component = self.getComponent();

			if (cellEvents.cellContext) {
				cellEvents.cellContext.call(self.table, e, component);
			}

			if (self.table.options.cellContext) {
				self.table.options.cellContext.call(self.table, e, component);
			}
		});
	}

	if (this.table.options.tooltipGenerationMode === "hover") {
		//update tooltip on mouse enter
		element.addEventListener("mouseenter", function (e) {
			self._generateTooltip();
		});
	}

	if (cellEvents.cellTap || this.table.options.cellTap) {
		tap = false;

		element.addEventListener("touchstart", function (e) {
			tap = true;
		});

		element.addEventListener("touchend", function (e) {
			if (tap) {
				var component = self.getComponent();

				if (cellEvents.cellTap) {
					cellEvents.cellTap.call(self.table, e, component);
				}

				if (self.table.options.cellTap) {
					self.table.options.cellTap.call(self.table, e, component);
				}
			}

			tap = false;
		});
	}

	if (cellEvents.cellDblTap || this.table.options.cellDblTap) {
		dblTap = null;

		element.addEventListener("touchend", function (e) {

			if (dblTap) {
				clearTimeout(dblTap);
				dblTap = null;

				var component = self.getComponent();

				if (cellEvents.cellDblTap) {
					cellEvents.cellDblTap.call(self.table, e, component);
				}

				if (self.table.options.cellDblTap) {
					self.table.options.cellDblTap.call(self.table, e, component);
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

		element.addEventListener("touchstart", function (e) {
			clearTimeout(tapHold);

			tapHold = setTimeout(function () {
				clearTimeout(tapHold);
				tapHold = null;
				tap = false;
				var component = self.getComponent();

				if (cellEvents.cellTapHold) {
					cellEvents.cellTapHold.call(self.table, e, component);
				}

				if (self.table.options.cellTapHold) {
					self.table.options.cellTapHold.call(self.table, e, component);
				}
			}, 1000);
		});

		element.addEventListener("touchend", function (e) {
			clearTimeout(tapHold);
			tapHold = null;
		});
	}

	if (self.column.modules.edit) {
		self.table.modules.edit.bindEditor(self);
	}

	if (self.column.definition.rowHandle && self.table.options.movableRows !== false && self.table.modExists("moveRow")) {
		self.table.modules.moveRow.initializeCell(self);
	}

	//hide cell if not visible
	if (!self.column.visible) {
		self.hide();
	}
};

//generate cell contents
Cell.prototype._generateContents = function () {
	var val;

	if (this.table.modExists("format")) {
		val = this.table.modules.format.formatValue(this);
	} else {
		val = this.element.innerHTML = this.value;
	}

	switch (typeof val === 'undefined' ? 'undefined' : _typeof(val)) {
		case "object":
			if (val instanceof Node) {
				this.element.appendChild(val);
			} else {
				this.element.innerHTML = "";
				console.warn("Format Error - Formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", val);
			}
			break;
		case "undefined":
		case "null":
			this.element.innerHTML = "";
			break;
		default:
			this.element.innerHTML = val;
	}
};

Cell.prototype.cellRendered = function () {
	if (this.table.modExists("format") && this.table.modules.format.cellRendered) {
		this.table.modules.format.cellRendered(this);
	}
};

//generate tooltip text
Cell.prototype._generateTooltip = function () {
	var tooltip = this.column.tooltip;

	if (tooltip) {
		if (tooltip === true) {
			tooltip = this.value;
		} else if (typeof tooltip == "function") {
			tooltip = tooltip(this.getComponent());

			if (tooltip === false) {
				tooltip = "";
			}
		}

		if (typeof tooltip === "undefined") {
			tooltip = "";
		}

		this.element.setAttribute("title", tooltip);
	} else {
		this.element.setAttribute("title", "");
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
		if (this.table.options.history && this.table.modExists("history")) {
			this.table.modules.history.action("cellEdit", this, { oldValue: this.oldValue, newValue: this.value });
		}

		component = this.getComponent();

		if (this.column.cellEvents.cellEdited) {
			this.column.cellEvents.cellEdited.call(this.table, component);
		}

		this.table.options.cellEdited.call(this.table, component);

		this.table.options.dataEdited.call(this.table, this.table.rowManager.getData());
	}

	if (this.table.modExists("columnCalcs")) {
		if (this.column.definition.topCalc || this.column.definition.bottomCalc) {
			if (this.table.options.groupBy && this.table.modExists("groupRows")) {
				this.table.modules.columnCalcs.recalcRowGroup(this.row);
			} else {
				this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
			}
		}
	}
};

Cell.prototype.setValueProcessData = function (value, mutate) {
	var changed = false;

	if (this.value != value) {

		changed = true;

		if (mutate) {
			if (this.column.modules.mutate) {
				value = this.table.modules.mutator.transformCell(this, value);
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
	if (this.table.options.resizableColumns && this.table.modExists("resizeColumns")) {
		this.table.modules.resizeColumns.initializeColumn("cell", this.column, this.element);
	}

	//handle frozen cells
	if (this.table.modExists("frozenColumns")) {
		this.table.modules.frozenColumns.layoutElement(this.element, this.column);
	}
};

Cell.prototype.setWidth = function (width) {
	this.width = width;
	// this.element.css("width", width || "");
	this.element.style.width = width ? width + "px" : "";
};

Cell.prototype.getWidth = function () {
	return this.width || this.element.offsetWidth;
};

Cell.prototype.setMinWidth = function (minWidth) {
	this.minWidth = minWidth;
	this.element.style.minWidth = minWidth ? minWidth + "px" : "";
};

Cell.prototype.checkHeight = function () {
	// var height = this.element.css("height");

	this.row.reinitializeHeight();
};

Cell.prototype.clearHeight = function () {
	this.element.style.height = "";
	this.height = null;
};

Cell.prototype.setHeight = function (height) {
	this.height = height;
	this.element.style.height = height ? height + "px" : "";
};

Cell.prototype.getHeight = function () {
	return this.height || this.element.offsetHeight;
};

Cell.prototype.show = function () {
	this.element.style.display = "";
};

Cell.prototype.hide = function () {
	this.element.style.display = "none";
};

Cell.prototype.edit = function (force) {
	if (this.table.modExists("edit", true)) {
		return this.table.modules.edit.editCell(this, force);
	}
};

Cell.prototype.cancelEdit = function () {
	if (this.table.modExists("edit", true)) {
		var editing = this.table.modules.edit.getCurrentCell();

		if (editing && editing._getSelf() === this) {
			this.table.modules.edit.cancelEdit();
		} else {
			console.warn("Cancel Editor Error - This cell is not currently being edited ");
		}
	}
};

Cell.prototype.delete = function () {
	this.element.parentNode.removeChild(this.element);
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
	this.element = this.createElement(); //containing element
	this.external = false;
	this.links = [];

	this._initialize();
};

FooterManager.prototype.createElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-footer");

	return el;
};

FooterManager.prototype._initialize = function (element) {
	if (this.table.options.footerElement) {

		switch (_typeof(this.table.options.footerElement)) {
			case "string":

				if (this.table.options.footerElement[0] === "<") {
					this.element.innerHTML = this.table.options.footerElement;
				} else {
					this.external = true;
					this.element = document.querySelector(this.table.options.footerElement);
				}
				break;
			default:
				this.element = this.table.options.footerElement;
				break;
		}
	}
};

FooterManager.prototype.getElement = function () {
	return this.element;
};

FooterManager.prototype.append = function (element, parent) {
	this.activate(parent);

	this.element.appendChild(element);
	this.table.rowManager.adjustTableSize();
};

FooterManager.prototype.prepend = function (element, parent) {
	this.activate(parent);

	this.element.insertBefore(element, this.element.firstChild);
	this.table.rowManager.adjustTableSize();
};

FooterManager.prototype.remove = function (element) {
	element.parentNode.removeChild(element);
	this.deactivate();
};

FooterManager.prototype.deactivate = function (force) {
	if (!this.element.firstChild || force) {
		if (!this.external) {
			this.element.parentNode.removeChild(this.element);
		}
		this.active = false;
	}

	// this.table.rowManager.adjustTableSize();
};

FooterManager.prototype.activate = function (parent) {
	if (!this.active) {
		this.active = true;
		if (!this.external) {
			this.table.element.appendChild(this.getElement());
			this.table.element.style.display = '';
		}
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

var Tabulator = function Tabulator(element, options) {

	this.options = {};

	this.columnManager = null; // hold Column Manager
	this.rowManager = null; //hold Row Manager
	this.footerManager = null; //holder Footer Manager
	this.browser = ""; //hold current browser type
	this.browserSlow = false; //handle reduced functionality for slower browsers

	this.modules = {}; //hold all modules bound to this table

	this.initializeElement(element);
	this.initializeOptions(options || {});
	this._create();

	Tabulator.prototype.comms.register(this); //register table for inderdevice communication
};

//default setup options
Tabulator.prototype.defaultOptions = {

	height: false, //height of tabulator

	layout: "fitData", ///layout type "fitColumns" | "fitData"
	layoutColumnsOnNewData: false, //update column widths on setData

	columnMinWidth: 40, //minimum global width for a column
	columnVertAlign: "top", //vertical alignment of column headers

	resizableColumns: true, //resizable columns
	resizableRows: false, //resizable rows
	autoResize: true, //auto resize table

	columns: [], //store for colum header info

	data: [], //default starting data

	nestedFieldSeparator: ".", //seperatpr for nested data

	tooltips: false, //Tool tip value
	tooltipsHeader: false, //Tool tip for headers
	tooltipGenerationMode: "load", //when to generate tooltips

	initialSort: false, //initial sorting criteria
	initialFilter: false, //initial filtering criteria

	columnHeaderSortMulti: true, //multiple or single column sorting

	sortOrderReverse: false, //reverse internal sort ordering

	footerElement: false, //hold footer element

	index: "id", //filed for row index

	keybindings: [], //array for keybindings

	clipboard: false, //enable clipboard
	clipboardCopyStyled: true, //formatted table data
	clipboardCopySelector: "active", //method of chosing which data is coppied to the clipboard
	clipboardCopyFormatter: "table", //convert data to a clipboard string
	clipboardPasteParser: "table", //convert pasted clipboard data to rows
	clipboardPasteAction: "insert", //how to insert pasted data into the table
	clipboardCopyConfig: false, //clipboard config

	clipboardCopied: function clipboardCopied() {}, //data has been copied to the clipboard
	clipboardPasted: function clipboardPasted() {}, //data has been pasted into the table
	clipboardPasteError: function clipboardPasteError() {}, //data has not successfully been pasted into the table

	downloadDataFormatter: false, //function to manipulate table data before it is downloaded
	downloadReady: function downloadReady(data, blob) {
		return blob;
	}, //function to manipulate download data
	downloadComplete: false, //function to manipulate download data
	downloadConfig: false, //download config

	dataTree: false, //enable data tree
	dataTreeBranchElement: true, //show data tree branch element
	dataTreeChildIndent: 9, //data tree child indent in px
	dataTreeChildField: "_children", //data tre column field to look for child rows
	dataTreeCollapseElement: false, //data tree row collapse element
	dataTreeExpandElement: false, //data tree row expand element
	dataTreeStartExpanded: false,
	dataTreeRowExpanded: function dataTreeRowExpanded() {}, //row has been expanded
	dataTreeRowCollapsed: function dataTreeRowCollapsed() {}, //row has been collapsed


	addRowPos: "bottom", //position to insert blank rows, top|bottom

	selectable: "highlight", //highlight rows on hover
	selectableRangeMode: "drag", //highlight rows on hover
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
	paginationAddRow: "page", //add rows on table or page

	ajaxURL: false, //url for ajax loading
	ajaxURLGenerator: false,
	ajaxParams: {}, //params for ajax loading
	ajaxConfig: "get", //ajax request type
	ajaxContentType: "form", //ajax request type
	ajaxRequestFunc: false, //promise function
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
	groupValues: false,

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

};

Tabulator.prototype.initializeOptions = function (options) {
	for (var key in this.defaultOptions) {
		if (key in options) {
			this.options[key] = options[key];
		} else {
			if (Array.isArray(this.defaultOptions[key])) {
				this.options[key] = [];
			} else if (_typeof(this.defaultOptions[key]) === "object") {
				this.options[key] = {};
			} else {
				this.options[key] = this.defaultOptions[key];
			}
		}
	}
};

Tabulator.prototype.initializeElement = function (element) {

	if (element instanceof HTMLElement) {
		this.element = element;
		return true;
	} else if (typeof element === "string") {
		this.element = document.querySelector(element);

		if (this.element) {
			return true;
		} else {
			console.error("Tabulator Creation Error - no element found matching selector: ", element);
			return false;
		}
	} else {
		console.error("Tabulator Creation Error - Invalid element provided:", element);
		return false;
	}
};

//convert depricated functionality to new functions
Tabulator.prototype._mapDepricatedFunctionality = function () {};

//concreate table
Tabulator.prototype._create = function () {
	this._clearObjectPointers();

	this._mapDepricatedFunctionality();

	this.bindModules();

	if (this.element.tagName === "TABLE") {
		if (this.modExists("htmlTableImport", true)) {
			this.modules.htmlTableImport.parseTable();
		}
	}

	this.columnManager = new ColumnManager(this);
	this.rowManager = new RowManager(this);
	this.footerManager = new FooterManager(this);

	this.columnManager.setRowManager(this.rowManager);
	this.rowManager.setColumnManager(this.columnManager);

	this._buildElement();

	this._loadInitialData();
};

//clear pointers to objects in default config object
Tabulator.prototype._clearObjectPointers = function () {
	this.options.columns = this.options.columns.slice(0);
	this.options.data = this.options.data.slice(0);
};

//build tabulator element
Tabulator.prototype._buildElement = function () {
	var element = this.element,
	    mod = this.modules,
	    options = this.options;

	options.tableBuilding.call(this);

	element.classList.add("tabulator");
	element.setAttribute("role", "grid");

	//empty element
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	} //set table height
	if (options.height) {
		options.height = isNaN(options.height) ? options.height : options.height + "px";
		element.style.height = options.height;
	}

	this.rowManager.initialize();

	this._detectBrowser();

	if (this.modExists("layout", true)) {
		mod.layout.initialize(options.layout);
	}

	//set localization
	if (options.headerFilterPlaceholder !== false) {
		mod.localize.setHeaderFilterPlaceholder(options.headerFilterPlaceholder);
	}

	for (var locale in options.langs) {
		mod.localize.installLang(locale, options.langs[locale]);
	}

	mod.localize.setLocale(options.locale);

	//configure placeholder element
	if (typeof options.placeholder == "string") {

		var el = document.createElement("div");
		el.classList.add("tabulator-placeholder");

		var span = document.createElement("span");
		span.innerHTML = options.placeholder;

		el.appendChild(span);

		options.placeholder = el;
	}

	//build table elements
	element.appendChild(this.columnManager.getElement());
	element.appendChild(this.rowManager.getElement());

	if (options.footerElement) {
		this.footerManager.activate();
	}

	if (options.dataTree && this.modExists("dataTree", true)) {
		mod.dataTree.initialize();
	}

	if ((options.persistentLayout || options.persistentSort || options.persistentFilter) && this.modExists("persistence", true)) {
		mod.persistence.initialize(options.persistenceMode, options.persistenceID);
	}

	if (options.persistentLayout && this.modExists("persistence", true)) {
		options.columns = mod.persistence.load("columns", options.columns);
	}

	if (options.movableRows && this.modExists("moveRow")) {
		mod.moveRow.initialize();
	}

	if (this.modExists("columnCalcs")) {
		mod.columnCalcs.initialize();
	}

	this.columnManager.setColumns(options.columns);

	if (this.modExists("frozenRows")) {
		this.modules.frozenRows.initialize();
	}

	if ((options.persistentSort || options.initialSort) && this.modExists("sort", true)) {
		var sorters = [];

		if (options.persistentSort && this.modExists("persistence", true)) {
			sorters = mod.persistence.load("sort");

			if (sorters === false && options.initialSort) {
				sorters = options.initialSort;
			}
		} else if (options.initialSort) {
			sorters = options.initialSort;
		}

		mod.sort.setSort(sorters);
	}

	if ((options.persistentFilter || options.initialFilter) && this.modExists("filter", true)) {
		var filters = [];

		if (options.persistentFilter && this.modExists("persistence", true)) {
			filters = mod.persistence.load("filter");

			if (filters === false && options.initialFilter) {
				filters = options.initialFilter;
			}
		} else if (options.initialFilter) {
			filters = options.initialFilter;
		}

		mod.filter.setFilter(filters);
		// this.setFilter(filters);
	}

	if (this.modExists("ajax")) {
		mod.ajax.initialize();
	}

	if (options.pagination && this.modExists("page", true)) {
		mod.page.initialize();
	}

	if (options.groupBy && this.modExists("groupRows", true)) {
		mod.groupRows.initialize();
	}

	if (this.modExists("keybindings")) {
		mod.keybindings.initialize();
	}

	if (this.modExists("selectRow")) {
		mod.selectRow.clearSelectionData(true);
	}

	if (options.autoResize && this.modExists("resizeTable")) {
		mod.resizeTable.initialize();
	}

	if (this.modExists("clipboard")) {
		mod.clipboard.initialize();
	}

	options.tableBuilt.call(this);
};

Tabulator.prototype._loadInitialData = function () {
	var self = this;

	if (self.options.pagination && self.modExists("page")) {
		self.modules.page.reset(true);

		if (self.options.pagination == "local") {
			if (self.options.data.length) {
				self.rowManager.setData(self.options.data);
			} else {
				if ((self.options.ajaxURL || self.options.ajaxURLGenerator) && self.modExists("ajax")) {
					self.modules.ajax.loadData();
				} else {
					self.rowManager.setData(self.options.data);
				}
			}
		} else {
			self.modules.page.setPage(1);
		}
	} else {
		if (self.options.data.length) {
			self.rowManager.setData(self.options.data);
		} else {
			if ((self.options.ajaxURL || self.options.ajaxURLGenerator) && self.modExists("ajax")) {
				self.modules.ajax.loadData();
			} else {
				self.rowManager.setData(self.options.data);
			}
		}
	}
};

//deconstructor
Tabulator.prototype.destroy = function () {
	var element = this.element;

	Tabulator.prototype.comms.deregister(this); //deregister table from inderdevice communication

	//clear row data
	this.rowManager.rows.forEach(function (row) {
		row.wipe();
	});

	this.rowManager.rows = [];
	this.rowManager.activeRows = [];
	this.rowManager.displayRows = [];

	//clear event bindings
	if (this.options.autoResize && this.modExists("resizeTable")) {
		this.modules.resizeTable.clearBindings();
	}

	if (this.modExists("keybindings")) {
		this.modules.keybindings.clearBindings();
	}

	//clear DOM
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}element.classList.remove("tabulator");
};

Tabulator.prototype._detectBrowser = function () {
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
};

////////////////// Data Handling //////////////////


//load data
Tabulator.prototype.setData = function (data, params, config) {
	if (this.modExists("ajax")) {
		this.modules.ajax.blockActiveRequest();
	}

	return this._setData(data, params, config);
};

Tabulator.prototype._setData = function (data, params, config, inPosition) {
	var self = this;

	if (typeof data === "string") {
		if (data.indexOf("{") == 0 || data.indexOf("[") == 0) {
			//data is a json encoded string
			return self.rowManager.setData(JSON.parse(data), inPosition);
		} else {

			if (self.modExists("ajax", true)) {
				if (params) {
					self.modules.ajax.setParams(params);
				}

				if (config) {
					self.modules.ajax.setConfig(config);
				}

				self.modules.ajax.setUrl(data);

				if (self.options.pagination == "remote" && self.modExists("page", true)) {
					self.modules.page.reset(true);
					return self.modules.page.setPage(1);
				} else {
					//assume data is url, make ajax call to url to get data
					return self.modules.ajax.loadData(inPosition);
				}
			}
		}
	} else {
		if (data) {
			//asume data is already an object
			return self.rowManager.setData(data, inPosition);
		} else {

			//no data provided, check if ajaxURL is present;
			if (self.modExists("ajax") && (self.modules.ajax.getUrl || self.options.ajaxURLGenerator)) {

				if (self.options.pagination == "remote" && self.modExists("page", true)) {
					self.modules.page.reset(true);
					return self.modules.page.setPage(1);
				} else {
					return self.modules.ajax.loadData(inPosition);
				}
			} else {
				//empty data
				return self.rowManager.setData([], inPosition);
			}
		}
	}
};

//clear data
Tabulator.prototype.clearData = function () {
	if (this.modExists("ajax")) {
		this.modules.ajax.blockActiveRequest();
	}

	this.rowManager.clearData();
};

//get table data array
Tabulator.prototype.getData = function (active) {
	return this.rowManager.getData(active);
};

//get table data array count
Tabulator.prototype.getDataCount = function (active) {
	return this.rowManager.getDataCount(active);
};

//search for specific row components
Tabulator.prototype.searchRows = function (field, type, value) {
	if (this.modExists("filter", true)) {
		return this.modules.filter.search("rows", field, type, value);
	}
};

//search for specific data
Tabulator.prototype.searchData = function (field, type, value) {
	if (this.modExists("filter", true)) {
		return this.modules.filter.search("data", field, type, value);
	}
};

//get table html
Tabulator.prototype.getHtml = function (active) {
	return this.rowManager.getHtml(active);
};

//retrieve Ajax URL
Tabulator.prototype.getAjaxUrl = function () {
	if (this.modExists("ajax", true)) {
		return this.modules.ajax.getUrl();
	}
};

//replace data, keeping table in position with same sort
Tabulator.prototype.replaceData = function (data, params, config) {
	if (this.modExists("ajax")) {
		this.modules.ajax.blockActiveRequest();
	}

	return this._setData(data, params, config, true);
};

//update table data
Tabulator.prototype.updateData = function (data) {
	var _this7 = this;

	var self = this;
	var responses = 0;

	return new Promise(function (resolve, reject) {
		if (_this7.modExists("ajax")) {
			_this7.modules.ajax.blockActiveRequest();
		}

		if (typeof data === "string") {
			data = JSON.parse(data);
		}

		if (data) {
			data.forEach(function (item) {
				var row = self.rowManager.findRow(item[self.options.index]);

				if (row) {
					responses++;

					row.updateData(item).then(function () {
						responses--;

						if (!responses) {
							resolve();
						}
					});
				}
			});
		} else {
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		}
	});
};

Tabulator.prototype.addData = function (data, pos, index) {
	var _this8 = this;

	return new Promise(function (resolve, reject) {
		if (_this8.modExists("ajax")) {
			_this8.modules.ajax.blockActiveRequest();
		}

		if (typeof data === "string") {
			data = JSON.parse(data);
		}

		if (data) {
			_this8.rowManager.addRows(data, pos, index).then(function (rows) {
				var output = [];

				rows.forEach(function (row) {
					output.push(row.getComponent());
				});

				resolve(output);
			});
		} else {
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		}
	});
};

//update table data
Tabulator.prototype.updateOrAddData = function (data) {
	var _this9 = this;

	var self = this,
	    rows = [],
	    responses = 0;

	return new Promise(function (resolve, reject) {
		if (_this9.modExists("ajax")) {
			_this9.modules.ajax.blockActiveRequest();
		}

		if (typeof data === "string") {
			data = JSON.parse(data);
		}

		if (data) {
			data.forEach(function (item) {
				var row = self.rowManager.findRow(item[self.options.index]);

				responses++;

				if (row) {
					row.updateData(item).then(function () {
						responses--;
						rows.push(row.getComponent());

						if (!responses) {
							resolve(rows);
						}
					});
				} else {
					self.rowManager.addRows(item).then(function (newRows) {
						responses--;
						rows.push(newRows[0].getComponent());

						if (!responses) {
							resolve(rows);
						}
					});
				}
			});
		} else {
			console.warn("Update Error - No data provided");
			reject("Update Error - No data provided");
		}
	});
};

//get row object
Tabulator.prototype.getRow = function (index) {
	var row = this.rowManager.findRow(index);

	if (row) {
		return row.getComponent();
	} else {
		console.warn("Find Error - No matching row found:", index);
		return false;
	}
};

//get row object
Tabulator.prototype.getRowFromPosition = function (position, active) {
	var row = this.rowManager.getRowFromPosition(position, active);

	if (row) {
		return row.getComponent();
	} else {
		console.warn("Find Error - No matching row found:", position);
		return false;
	}
};

//delete row from table
Tabulator.prototype.deleteRow = function (index) {
	var _this10 = this;

	return new Promise(function (resolve, reject) {
		var row = _this10.rowManager.findRow(index);

		if (row) {
			row.delete().then(function () {
				resolve();
			}).catch(function (err) {
				reject(err);
			});
		} else {
			console.warn("Delete Error - No matching row found:", index);
			reject("Delete Error - No matching row found");
		}
	});
};

//add row to table
Tabulator.prototype.addRow = function (data, pos, index) {
	var _this11 = this;

	return new Promise(function (resolve, reject) {
		if (typeof data === "string") {
			data = JSON.parse(data);
		}

		_this11.rowManager.addRows(data, pos, index).then(function (rows) {
			//recalc column calculations if present
			if (_this11.modExists("columnCalcs")) {
				_this11.modules.columnCalcs.recalc(_this11.rowManager.activeRows);
			}

			resolve(rows[0].getComponent());
		});
	});
};

//update a row if it exitsts otherwise create it
Tabulator.prototype.updateOrAddRow = function (index, data) {
	var _this12 = this;

	return new Promise(function (resolve, reject) {
		var row = _this12.rowManager.findRow(index);

		if (typeof data === "string") {
			data = JSON.parse(data);
		}

		if (row) {
			row.updateData(data).then(function () {
				//recalc column calculations if present
				if (_this12.modExists("columnCalcs")) {
					_this12.modules.columnCalcs.recalc(_this12.rowManager.activeRows);
				}

				resolve(row.getComponent());
			}).catch(function (err) {
				reject(err);
			});
		} else {
			row = _this12.rowManager.addRows(data).then(function (rows) {
				//recalc column calculations if present
				if (_this12.modExists("columnCalcs")) {
					_this12.modules.columnCalcs.recalc(_this12.rowManager.activeRows);
				}

				resolve(rows[0].getComponent());
			}).catch(function (err) {
				reject(err);
			});
		}
	});
};

//update row data
Tabulator.prototype.updateRow = function (index, data) {
	var _this13 = this;

	return new Promise(function (resolve, reject) {
		var row = _this13.rowManager.findRow(index);

		if (typeof data === "string") {
			data = JSON.parse(data);
		}

		if (row) {
			row.updateData(data).then(function () {
				resolve(row.getComponent());
			}).catch(function (err) {
				reject(err);
			});
		} else {
			console.warn("Update Error - No matching row found:", index);
			reject("Update Error - No matching row found");
		}
	});
};

//scroll to row in DOM
Tabulator.prototype.scrollToRow = function (index, position, ifVisible) {
	var _this14 = this;

	return new Promise(function (resolve, reject) {
		var row = _this14.rowManager.findRow(index);

		if (row) {
			_this14.rowManager.scrollToRow(row, position, ifVisible).then(function () {
				resolve();
			}).catch(function (err) {
				reject(err);
			});
		} else {
			console.warn("Scroll Error - No matching row found:", index);
			reject("Scroll Error - No matching row found");
		}
	});
};

Tabulator.prototype.getRows = function (active) {
	return this.rowManager.getComponents(active);
};

//get position of row in table
Tabulator.prototype.getRowPosition = function (index, active) {
	var row = this.rowManager.findRow(index);

	if (row) {
		return this.rowManager.getRowPosition(row, active);
	} else {
		console.warn("Position Error - No matching row found:", index);
		return false;
	}
};

//copy table data to clipboard
Tabulator.prototype.copyToClipboard = function (selector, selectorParams, formatter, formatterParams) {
	if (this.modExists("clipboard", true)) {
		this.modules.clipboard.copy(selector, selectorParams, formatter, formatterParams);
	}
};

/////////////// Column Functions  ///////////////

Tabulator.prototype.setColumns = function (definition) {
	this.columnManager.setColumns(definition);
};

Tabulator.prototype.getColumns = function (structured) {
	return this.columnManager.getComponents(structured);
};

Tabulator.prototype.getColumn = function (field) {
	var col = this.columnManager.findColumn(field);

	if (col) {
		return col.getComponent();
	} else {
		console.warn("Find Error - No matching column found:", field);
		return false;
	}
};

Tabulator.prototype.getColumnDefinitions = function () {
	return this.columnManager.getDefinitionTree();
};

Tabulator.prototype.getColumnLayout = function () {
	if (this.modExists("persistence", true)) {
		return this.modules.persistence.parseColumns(this.columnManager.getColumns());
	}
};

Tabulator.prototype.setColumnLayout = function (layout) {
	if (this.modExists("persistence", true)) {
		this.columnManager.setColumns(this.modules.persistence.mergeDefinition(this.options.columns, layout));
		return true;
	}
	return false;
};

Tabulator.prototype.showColumn = function (field) {
	var column = this.columnManager.findColumn(field);

	if (column) {
		column.show();

		if (this.options.responsiveLayout && this.modExists("responsiveLayout", true)) {
			this.modules.responsiveLayout.update();
		}
	} else {
		console.warn("Column Show Error - No matching column found:", field);
		return false;
	}
};

Tabulator.prototype.hideColumn = function (field) {
	var column = this.columnManager.findColumn(field);

	if (column) {
		column.hide();

		if (this.options.responsiveLayout && this.modExists("responsiveLayout", true)) {
			this.modules.responsiveLayout.update();
		}
	} else {
		console.warn("Column Hide Error - No matching column found:", field);
		return false;
	}
};

Tabulator.prototype.toggleColumn = function (field) {
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
};

Tabulator.prototype.addColumn = function (definition, before, field) {
	var column = this.columnManager.findColumn(field);

	this.columnManager.addColumn(definition, before, column);
};

Tabulator.prototype.deleteColumn = function (field) {
	var column = this.columnManager.findColumn(field);

	if (column) {
		column.delete();
	} else {
		console.warn("Column Delete Error - No matching column found:", field);
		return false;
	}
};

//scroll to column in DOM
Tabulator.prototype.scrollToColumn = function (field, position, ifVisible) {
	var _this15 = this;

	return new Promise(function (resolve, reject) {
		var column = _this15.columnManager.findColumn(field);

		if (column) {
			_this15.columnManager.scrollToColumn(column, position, ifVisible).then(function () {
				resolve();
			}).catch(function (err) {
				reject(err);
			});
		} else {
			console.warn("Scroll Error - No matching column found:", field);
			reject("Scroll Error - No matching column found");
		}
	});
};

//////////// Localization Functions  ////////////
Tabulator.prototype.setLocale = function (locale) {
	this.modules.localize.setLocale(locale);
};

Tabulator.prototype.getLocale = function () {
	return this.modules.localize.getLocale();
};

Tabulator.prototype.getLang = function (locale) {
	return this.modules.localize.getLang(locale);
};

//////////// General Public Functions ////////////

//redraw list without updating data
Tabulator.prototype.redraw = function (force) {
	this.columnManager.redraw(force);
	this.rowManager.redraw(force);
};

Tabulator.prototype.setHeight = function (height) {
	this.options.height = isNaN(height) ? height : height + "px";
	this.element.style.height = this.options.height;
	this.rowManager.redraw();
};

///////////////////// Sorting ////////////////////

//trigger sort
Tabulator.prototype.setSort = function (sortList, dir) {
	if (this.modExists("sort", true)) {
		this.modules.sort.setSort(sortList, dir);
		this.rowManager.sorterRefresh();
	}
};

Tabulator.prototype.getSorters = function () {
	if (this.modExists("sort", true)) {
		return this.modules.sort.getSort();
	}
};

Tabulator.prototype.clearSort = function () {
	if (this.modExists("sort", true)) {
		this.modules.sort.clear();
		this.rowManager.sorterRefresh();
	}
};

///////////////////// Filtering ////////////////////

//set standard filters
Tabulator.prototype.setFilter = function (field, type, value) {
	if (this.modExists("filter", true)) {
		this.modules.filter.setFilter(field, type, value);
		this.rowManager.filterRefresh();
	}
};

//add filter to array
Tabulator.prototype.addFilter = function (field, type, value) {
	if (this.modExists("filter", true)) {
		this.modules.filter.addFilter(field, type, value);
		this.rowManager.filterRefresh();
	}
};

//get all filters
Tabulator.prototype.getFilters = function (all) {
	if (this.modExists("filter", true)) {
		return this.modules.filter.getFilters(all);
	}
};

Tabulator.prototype.setHeaderFilterFocus = function (field) {
	if (this.modExists("filter", true)) {
		var column = this.columnManager.findColumn(field);

		if (column) {
			this.modules.filter.setHeaderFilterFocus(column);
		} else {
			console.warn("Column Filter Focus Error - No matching column found:", field);
			return false;
		}
	}
};

Tabulator.prototype.setHeaderFilterValue = function (field, value) {
	if (this.modExists("filter", true)) {
		var column = this.columnManager.findColumn(field);

		if (column) {
			this.modules.filter.setHeaderFilterValue(column, value);
		} else {
			console.warn("Column Filter Error - No matching column found:", field);
			return false;
		}
	}
};

Tabulator.prototype.getHeaderFilters = function () {
	if (this.modExists("filter", true)) {
		return this.modules.filter.getHeaderFilters();
	}
};

//remove filter from array
Tabulator.prototype.removeFilter = function (field, type, value) {
	if (this.modExists("filter", true)) {
		this.modules.filter.removeFilter(field, type, value);
		this.rowManager.filterRefresh();
	}
};

//clear filters
Tabulator.prototype.clearFilter = function (all) {
	if (this.modExists("filter", true)) {
		this.modules.filter.clearFilter(all);
		this.rowManager.filterRefresh();
	}
};

//clear header filters
Tabulator.prototype.clearHeaderFilter = function () {
	if (this.modExists("filter", true)) {
		this.modules.filter.clearHeaderFilter();
		this.rowManager.filterRefresh();
	}
};

///////////////////// Filtering ////////////////////
Tabulator.prototype.selectRow = function (rows) {
	if (this.modExists("selectRow", true)) {
		this.modules.selectRow.selectRows(rows);
	}
};

Tabulator.prototype.deselectRow = function (rows) {
	if (this.modExists("selectRow", true)) {
		this.modules.selectRow.deselectRows(rows);
	}
};

Tabulator.prototype.toggleSelectRow = function (row) {
	if (this.modExists("selectRow", true)) {
		this.modules.selectRow.toggleRow(row);
	}
};

Tabulator.prototype.getSelectedRows = function () {
	if (this.modExists("selectRow", true)) {
		return this.modules.selectRow.getSelectedRows();
	}
};

Tabulator.prototype.getSelectedData = function () {
	if (this.modExists("selectRow", true)) {
		return this.modules.selectRow.getSelectedData();
	}
};

//////////// Pagination Functions  ////////////

Tabulator.prototype.setMaxPage = function (max) {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.setMaxPage(max);
	} else {
		return false;
	}
};

Tabulator.prototype.setPage = function (page) {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.setPage(page);
	} else {
		return false;
	}
};

Tabulator.prototype.setPageSize = function (size) {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.setPageSize(size);
		this.modules.page.setPage(1);
	} else {
		return false;
	}
};

Tabulator.prototype.getPageSize = function () {
	if (this.options.pagination && this.modExists("page", true)) {
		return this.modules.page.getPageSize();
	}
};

Tabulator.prototype.previousPage = function () {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.previousPage();
	} else {
		return false;
	}
};

Tabulator.prototype.nextPage = function () {
	if (this.options.pagination && this.modExists("page")) {
		this.modules.page.nextPage();
	} else {
		return false;
	}
};

Tabulator.prototype.getPage = function () {
	if (this.options.pagination && this.modExists("page")) {
		return this.modules.page.getPage();
	} else {
		return false;
	}
};

Tabulator.prototype.getPageMax = function () {
	if (this.options.pagination && this.modExists("page")) {
		return this.modules.page.getPageMax();
	} else {
		return false;
	}
};

///////////////// Grouping Functions ///////////////

Tabulator.prototype.setGroupBy = function (groups) {
	if (this.modExists("groupRows", true)) {
		this.options.groupBy = groups;
		this.modules.groupRows.initialize();
		this.rowManager.refreshActiveData("display");
	} else {
		return false;
	}
};

Tabulator.prototype.setGroupStartOpen = function (values) {
	if (this.modExists("groupRows", true)) {
		this.options.groupStartOpen = values;
		this.modules.groupRows.initialize();
		if (this.options.groupBy) {
			this.rowManager.refreshActiveData("group");
		} else {
			console.warn("Grouping Update - cant refresh view, no groups have been set");
		}
	} else {
		return false;
	}
};

Tabulator.prototype.setGroupHeader = function (values) {
	if (this.modExists("groupRows", true)) {
		this.options.groupHeader = values;
		this.modules.groupRows.initialize();
		if (this.options.groupBy) {
			this.rowManager.refreshActiveData("group");
		} else {
			console.warn("Grouping Update - cant refresh view, no groups have been set");
		}
	} else {
		return false;
	}
};

Tabulator.prototype.getGroups = function (values) {
	if (this.modExists("groupRows", true)) {
		return this.modules.groupRows.getGroups(true);
	} else {
		return false;
	}
};

// get grouped table data in the same format as getData()
Tabulator.prototype.getGroupedData = function () {
	if (this.modExists("groupRows", true)) {
		return this.options.groupBy ? this.modules.groupRows.getGroupedData() : this.getData();
	}
};

///////////////// Column Calculation Functions ///////////////
Tabulator.prototype.getCalcResults = function () {
	if (this.modExists("columnCalcs", true)) {
		return this.modules.columnCalcs.getResults();
	} else {
		return false;
	}
};

/////////////// Navigation Management //////////////

Tabulator.prototype.navigatePrev = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().prev();
		}
	}

	return false;
};

Tabulator.prototype.navigateNext = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().next();
		}
	}

	return false;
};

Tabulator.prototype.navigateLeft = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().left();
		}
	}

	return false;
};

Tabulator.prototype.navigateRight = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().right();
		}
	}

	return false;
};

Tabulator.prototype.navigateUp = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().up();
		}
	}

	return false;
};

Tabulator.prototype.navigateDown = function () {
	var cell = false;

	if (this.modExists("edit", true)) {
		cell = this.modules.edit.currentCell;

		if (cell) {
			e.preventDefault();
			return cell.nav().dpwn();
		}
	}

	return false;
};

/////////////// History Management //////////////
Tabulator.prototype.undo = function () {
	if (this.options.history && this.modExists("history", true)) {
		return this.modules.history.undo();
	} else {
		return false;
	}
};

Tabulator.prototype.redo = function () {
	if (this.options.history && this.modExists("history", true)) {
		return this.modules.history.redo();
	} else {
		return false;
	}
};

Tabulator.prototype.getHistoryUndoSize = function () {
	if (this.options.history && this.modExists("history", true)) {
		return this.modules.history.getHistoryUndoSize();
	} else {
		return false;
	}
};

Tabulator.prototype.getHistoryRedoSize = function () {
	if (this.options.history && this.modExists("history", true)) {
		return this.modules.history.getHistoryRedoSize();
	} else {
		return false;
	}
};

/////////////// Download Management //////////////

Tabulator.prototype.download = function (type, filename, options) {
	if (this.modExists("download", true)) {
		this.modules.download.download(type, filename, options);
	}
};

/////////// Inter Table Communications ///////////

Tabulator.prototype.tableComms = function (table, module, action, data) {
	this.modules.comms.receive(table, module, action, data);
};

////////////// Extension Management //////////////

//object to hold module
Tabulator.prototype.moduleBindings = {};

//extend module
Tabulator.prototype.extendModule = function (name, property, values) {

	if (Tabulator.prototype.moduleBindings[name]) {
		var source = Tabulator.prototype.moduleBindings[name].prototype[property];

		if (source) {
			if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) == "object") {
				for (var key in values) {
					source[key] = values[key];
				}
			} else {
				console.warn("Module Error - Invalid value type, it must be an object");
			}
		} else {
			console.warn("Module Error - property does not exist:", property);
		}
	} else {
		console.warn("Module Error - module does not exist:", name);
	}
};

//add module to tabulator
Tabulator.prototype.registerModule = function (name, module) {
	var self = this;
	Tabulator.prototype.moduleBindings[name] = module;
};

//ensure that module are bound to instantiated function
Tabulator.prototype.bindModules = function () {
	this.modules = {};

	for (var name in Tabulator.prototype.moduleBindings) {
		this.modules[name] = new Tabulator.prototype.moduleBindings[name](this);
	}
};

//Check for module
Tabulator.prototype.modExists = function (plugin, required) {
	if (this.modules[plugin]) {
		return true;
	} else {
		if (required) {
			console.error("Tabulator Module Not Installed: " + plugin);
		}
		return false;
	}
};

Tabulator.prototype.helpers = {

	elVisible: function elVisible(el) {
		return !(el.offsetWidth <= 0 && el.offsetHeight <= 0);
	},

	elOffset: function elOffset(el) {
		var box = el.getBoundingClientRect();

		return {
			top: box.top + window.pageYOffset - document.documentElement.clientTop,
			left: box.left + window.pageXOffset - document.documentElement.clientLeft
		};
	},

	deepClone: function deepClone(obj) {
		var clone = Array.isArray(obj) ? [] : {};

		for (var i in obj) {
			if (obj[i] != null && _typeof(obj[i]) === "object") {
				if (obj[i] instanceof Date) {
					clone[i] = new Date(obj[i]);
				} else {
					clone[i] = this.deepClone(obj[i]);
				}
			} else {
				clone[i] = obj[i];
			}
		}
		return clone;
	}
};

Tabulator.prototype.comms = {
	tables: [],
	register: function register(table) {
		Tabulator.prototype.comms.tables.push(table);
	},
	deregister: function deregister(table) {
		var index = Tabulator.prototype.comms.tables.indexOf(table);

		if (index > -1) {
			Tabulator.prototype.comms.tables.splice(index, 1);
		}
	},
	lookupTable: function lookupTable(query) {
		var results = [],
		    matches,
		    match;

		if (typeof query === "string") {
			matches = document.querySelectorAll(query);

			if (matches.length) {
				for (var i = 0; i < matches.length; i++) {
					match = Tabulator.prototype.comms.matchElement(matches[i]);

					if (match) {
						results.push(match);
					}
				}
			}
		} else if (query instanceof HTMLElement || query instanceof Tabulator) {
			match = Tabulator.prototype.comms.matchElement(query);

			if (match) {
				results.push(match);
			}
		} else if (Array.isArray(query)) {
			query.forEach(function (item) {
				results = results.concat(Tabulator.prototype.comms.lookupTable(item));
			});
		} else {
			console.warn("Table Connection Error - Invalid Selector", query);
		}

		return results;
	},
	matchElement: function matchElement(element) {
		return Tabulator.prototype.comms.tables.find(function (table) {
			return element instanceof Tabulator ? table === element : table.element === element;
		});
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

	this.table.element.setAttribute("tabulator-layout", this.mode);
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

		if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

			this.table.modules.responsiveLayout.update();
		}
	},

	//resize columns to fit data the contain

	"fitDataFill": function fitDataFill(columns) {

		columns.forEach(function (column) {

			column.reinitializeWidth();
		});

		if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

			this.table.modules.responsiveLayout.update();
		}
	},

	//resize columns to fit

	"fitColumns": function fitColumns(columns) {

		var self = this;

		var totalWidth = self.table.element.clientWidth; //table element width

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

		if (this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

			this.table.modules.responsiveLayout.update();
		}

		//adjust for vertical scrollbar if present

		if (this.table.rowManager.element.scrollHeight > this.table.rowManager.element.clientHeight) {

			totalWidth -= this.table.rowManager.element.offsetWidth - this.table.rowManager.element.clientWidth;
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

Tabulator.prototype.registerModule("layout", Layout);
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
	self.lang = Tabulator.prototype.helpers.deepClone(self.langs.default || {});

	if (desiredLocale != "default") {
		traverseLang(self.langs[desiredLocale], self.lang);
	}

	self.table.options.localized.call(self.table, self.locale, self.lang);

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

Tabulator.prototype.registerModule("localize", Localize);
var Comms = function Comms(table) {
	this.table = table;
};

Comms.prototype.getConnections = function (selectors) {
	var self = this,
	    connections = [],
	    connection;

	connection = Tabulator.prototype.comms.lookupTable(selectors);

	connection.forEach(function (con) {
		if (self.table !== con) {
			connections.push(con);
		}
	});

	return connections;
};

Comms.prototype.send = function (selectors, module, action, data) {
	var self = this,
	    connections = this.getConnections(selectors);

	connections.forEach(function (connection) {
		connection.tableComms(self.table.element, module, action, data);
	});

	if (!connections.length && selectors) {
		console.warn("Table Connection Error - No tables matching selector found", selectors);
	}
};

Comms.prototype.receive = function (table, module, action, data) {
	if (this.table.modExists(module)) {
		return this.table.modules[module].commsReceived(table, action, data);
	} else {
		console.warn("Inter-table Comms Error - no such module:", module);
	}
};

Tabulator.prototype.registerModule("comms", Comms);