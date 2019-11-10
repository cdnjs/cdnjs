var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.2.5 (c) Oliver Folkerd */

;(function (global, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		global.Tabulator = factory();
	}
})(this, function () {

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


		this.blockHozScrollEvent = false;

		this.headersElement = this.createHeadersElement();

		this.element = this.createHeaderElement(); //containing element


		this.rowManager = null; //hold row manager object


		this.columns = []; // column definition object


		this.columnsByIndex = []; //columns by index


		this.columnsByField = {}; //columns by field


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

	ColumnManager.prototype.initialize = function () {

		var self = this;

		//scroll body along with header


		self.element.addEventListener("scroll", function (e) {

			if (!self.blockHozScrollEvent) {

				self.table.rowManager.scrollHorizontal(self.element.scrollLeft);
			}
		});
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

	ColumnManager.prototype.tempScrollBlock = function () {
		var _this = this;

		clearTimeout(this.blockHozScrollEvent);

		this.blockHozScrollEvent = setTimeout(function () {
			_this.blockHozScrollEvent = false;
		}, 50);
	};

	//scroll horizontally to match table body


	ColumnManager.prototype.scrollHorizontal = function (left) {

		var hozAdjust = 0,
		    scrollWidth = this.element.scrollWidth - this.table.element.clientWidth;

		this.tempScrollBlock();

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


	ColumnManager.prototype.generateColumnsFromRowData = function (data) {

		var cols = [],
		    row,
		    sorter;

		if (data && data.length) {

			row = data[0];

			for (var key in row) {

				var col = {

					field: key,

					title: key

				};

				var _value = row[key];

				switch (typeof _value === 'undefined' ? 'undefined' : _typeof(_value)) {

					case "undefined":

						sorter = "string";

						break;

					case "boolean":

						sorter = "boolean";

						break;

					case "object":

						if (Array.isArray(_value)) {

							sorter = "array";
						} else {

							sorter = "string";
						}

						break;

					default:

						if (!isNaN(_value) && _value !== "") {

							sorter = "number";
						} else {

							if (_value.match(/((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+$/i)) {

								sorter = "alphanum";
							} else {

								sorter = "string";
							}
						}

						break;

				}

				col.sorter = sorter;

				cols.push(col);
			}

			this.table.options.columns = cols;

			this.setColumns(this.table.options.columns);
		}
	};

	ColumnManager.prototype.setColumns = function (cols, row) {

		var self = this;

		while (self.headersElement.firstChild) {
			self.headersElement.removeChild(self.headersElement.firstChild);
		}self.columns = [];

		self.columnsByIndex = [];

		self.columnsByField = {};

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

	ColumnManager.prototype.getFirstVisibileColumn = function (index) {

		var index = this.columnsByIndex.findIndex(function (col) {

			return col.visible;
		});

		return index > -1 ? this.columnsByIndex[index] : false;
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
		var _this2 = this;

		var left = 0,
		    offset = 0,
		    adjust = 0,
		    colEl = column.getElement();

		return new Promise(function (resolve, reject) {

			if (typeof position === "undefined") {

				position = _this2.table.options.scrollToColumnPosition;
			}

			if (typeof ifVisible === "undefined") {

				ifVisible = _this2.table.options.scrollToColumnIfVisible;
			}

			if (column.visible) {

				//align to correct position


				switch (position) {

					case "middle":

					case "center":

						adjust = -_this2.element.clientWidth / 2;

						break;

					case "right":

						adjust = colEl.clientWidth - _this2.headersElement.clientWidth;

						break;

				}

				//check column visibility


				if (!ifVisible) {

					offset = colEl.offsetLeft;

					if (offset > 0 && offset + colEl.offsetWidth < _this2.element.clientWidth) {

						return false;
					}
				}

				//calculate scroll position


				left = colEl.offsetLeft + _this2.element.scrollLeft + adjust;

				left = Math.max(Math.min(left, _this2.table.rowManager.element.scrollWidth - _this2.table.rowManager.element.clientWidth), 0);

				_this2.table.rowManager.scrollHorizontal(left);

				_this2.scrollHorizontal(left);

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

	ColumnComponent.prototype.getNextColumn = function () {

		return this._column.nextColumn().getComponent();
	};

	ColumnComponent.prototype.getPrevColumn = function () {

		return this._column.prevColumn().getComponent();
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

			cellTapHold: false,

			cellMouseEnter: false,

			cellMouseLeave: false,

			cellMouseOver: false,

			cellMouseOut: false,

			cellMouseMove: false

		};

		this.width = null; //column width

		this.widthStyled = ""; //column width prestyled to improve render efficiency

		this.minWidth = null; //column minimum width

		this.minWidthStyled = ""; //column minimum prestyled to improve render efficiency

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

		//store column mouse event bindings

		if (typeof def.cellMouseEnter == "function") {

			self.cellEvents.cellMouseEnter = def.cellMouseEnter;
		}

		if (typeof def.cellMouseLeave == "function") {

			self.cellEvents.cellMouseLeave = def.cellMouseLeave;
		}

		if (typeof def.cellMouseOver == "function") {

			self.cellEvents.cellMouseOver = def.cellMouseOver;
		}

		if (typeof def.cellMouseOut == "function") {

			self.cellEvents.cellMouseOut = def.cellMouseOut;
		}

		if (typeof def.cellMouseMove == "function") {

			self.cellEvents.cellMouseMove = def.cellMouseMove;
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

			var classeNames = def.cssClass.split(" ");

			classeNames.forEach(function (className) {

				self.element.classList.add(className);
			});
		}

		if (def.field) {

			this.element.setAttribute("tabulator-field", def.field);
		}

		//set min width if present

		self.setMinWidth(typeof def.minWidth == "undefined" ? self.table.options.columnMinWidth : parseInt(def.minWidth));

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

		if (this.field) {

			data[this.field] = value;
		}
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

		this.groupElement.style.minHeight = "";

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

			if (this.parent.isGroup) {

				this.parent.checkColumnVisibility();
			}

			this.cells.forEach(function (cell) {

				cell.show();
			});

			if (!this.isGroup && this.width === null) {

				this.reinitializeWidth();
			}

			this.table.columnManager._verticalAlignHeaders();

			if (this.table.options.persistentLayout && this.table.modExists("responsiveLayout", true)) {

				this.table.modules.persistence.save("columns");
			}

			if (!responsiveToggle && this.table.options.responsiveLayout && this.table.modExists("responsiveLayout", true)) {

				this.table.modules.responsiveLayout.updateColumnVisibility(this, this.visible);
			}

			if (!silent) {

				this.table.options.columnVisibilityChanged.call(this.table, this.getComponent(), true);
			}

			if (this.parent.isGroup) {

				this.parent.matchChildWidths();
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

			if (this.parent.isGroup) {

				this.parent.matchChildWidths();
			}
		}
	};

	Column.prototype.matchChildWidths = function () {

		var childWidth = 0;

		if (this.contentElement && this.columns.length) {

			this.columns.forEach(function (column) {

				if (column.visible) {

					childWidth += column.getWidth();
				}
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

		this.widthStyled = width ? width + "px" : "";

		this.element.style.width = this.widthStyled;

		if (!this.isGroup) {

			this.cells.forEach(function (cell) {

				cell.setWidth();
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

		this.minWidthStyled = minWidth ? minWidth + "px" : "";

		this.element.style.minWidth = this.minWidthStyled;

		this.cells.forEach(function (cell) {

			cell.setMinWidth();
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

	Column.prototype.nextColumn = function () {

		var index = this.table.columnManager.findColumnIndex(this);

		return index > -1 ? this.table.columnManager.getColumnByIndex(index + 1) : false;
	};

	Column.prototype.prevColumn = function () {

		var index = this.table.columnManager.findColumnIndex(this);

		return index > -1 ? this.table.columnManager.getColumnByIndex(index - 1) : false;
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

			this.element.style.width = "";

			self.cells.forEach(function (cell) {

				cell.clearWidth();
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

	Column.prototype.defaultOptionList = ["title", "field", "visible", "align", "width", "minWidth", "widthGrow", "widthShrink", "resizable", "frozen", "responsive", "tooltip", "cssClass", "rowHandle", "hideInHtml", "sorter", "sorterParams", "formatter", "formatterParams", "variableHeight", "editable", "editor", "editorParams", "validator", "mutator", "mutatorParams", "mutatorData", "mutatorDataParams", "mutatorEdit", "mutatorEditParams", "mutatorClipboard", "mutatorClipboardParams", "accessor", "accessorParams", "accessorData", "accessorDataParams", "accessorDownload", "accessorDownloadParams", "accessorClipboard", "accessorClipboardParams", "download", "downloadTitle", "topCalc", "topCalcParams", "topCalcFormatter", "topCalcFormatterParams", "bottomCalc", "bottomCalcParams", "bottomCalcFormatter", "bottomCalcFormatterParams", "cellClick", "cellDblClick", "cellContext", "cellTap", "cellDblTap", "cellTapHold", "cellMouseEnter", "cellMouseLeave", "cellMouseOver", "cellMouseOut", "cellMouseMove", "cellEditing", "cellEdited", "cellEditCancelled", "headerSort", "headerSortStartingDir", "headerSortTristate", "headerClick", "headerDblClick", "headerContext", "headerTap", "headerDblTap", "headerTapHold", "headerTooltip", "headerVertical", "editableTitle", "titleFormatter", "titleFormatterParams", "headerFilter", "headerFilterPlaceholder", "headerFilterParams", "headerFilterEmptyCheck", "headerFilterFunc", "headerFilterFuncParams", "headerFilterLiveFilter"];

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

	RowManager.prototype.getRowFromDataObject = function (data) {

		var match = this.rows.find(function (row) {

			return row.data === data;
		});

		return match || false;
	};

	RowManager.prototype.getRowFromPosition = function (position, active) {

		if (active) {

			return this.activeRows[position];
		} else {

			return this.rows[position];
		}
	};

	RowManager.prototype.scrollToRow = function (row, position, ifVisible) {
		var _this3 = this;

		var rowIndex = this.getDisplayRows().indexOf(row),
		    rowEl = row.getElement(),
		    rowTop,
		    offset = 0;

		return new Promise(function (resolve, reject) {

			if (rowIndex > -1) {

				if (typeof position === "undefined") {

					position = _this3.table.options.scrollToRowPosition;
				}

				if (typeof ifVisible === "undefined") {

					ifVisible = _this3.table.options.scrollToRowIfVisible;
				}

				if (position === "nearest") {

					switch (_this3.renderMode) {

						case "classic":

							rowTop = Tabulator.prototype.helpers.elOffset(rowEl).top;

							position = Math.abs(_this3.element.scrollTop - rowTop) > Math.abs(_this3.element.scrollTop + _this3.element.clientHeight - rowTop) ? "bottom" : "top";

							break;

						case "virtual":

							position = Math.abs(_this3.vDomTop - rowIndex) > Math.abs(_this3.vDomBottom - rowIndex) ? "bottom" : "top";

							break;

					}
				}

				//check row visibility

				if (!ifVisible) {

					if (Tabulator.prototype.helpers.elVisible(rowEl)) {

						offset = Tabulator.prototype.helpers.elOffset(rowEl).top - Tabulator.prototype.helpers.elOffset(_this3.element).top;

						if (offset > 0 && offset < _this3.element.clientHeight - rowEl.offsetHeight) {

							return false;
						}
					}
				}

				//scroll to row

				switch (_this3.renderMode) {

					case "classic":

						_this3.element.scrollTop = Tabulator.prototype.helpers.elOffset(rowEl).top - Tabulator.prototype.helpers.elOffset(_this3.element).top + _this3.element.scrollTop;

						break;

					case "virtual":

						_this3._virtualRenderFill(rowIndex, true);

						break;

				}

				//align to correct position

				switch (position) {

					case "middle":

					case "center":

						_this3.element.scrollTop = _this3.element.scrollTop - _this3.element.clientHeight / 2;

						break;

					case "bottom":

						_this3.element.scrollTop = _this3.element.scrollTop - _this3.element.clientHeight + rowEl.offsetHeight;

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
		var _this4 = this;

		var self = this;

		return new Promise(function (resolve, reject) {

			if (renderInPosition && _this4.getDisplayRows().length) {

				if (self.table.options.pagination) {

					self._setDataActual(data, true);
				} else {

					_this4.reRenderInPosition(function () {

						self._setDataActual(data);
					});
				}
			} else {

				if (_this4.table.options.autoColumns) {

					_this4.table.columnManager.generateColumnsFromRowData(data);
				}

				_this4.resetScroll();

				_this4._setDataActual(data);
			}

			resolve();
		});
	};

	RowManager.prototype._setDataActual = function (data, renderInPosition) {

		var self = this;

		self.table.options.dataLoading.call(this.table, data);

		this._wipeElements();

		if (this.table.options.history && this.table.modExists("history")) {

			this.table.modules.history.clear();
		}

		if (Array.isArray(data)) {

			if (this.table.modExists("selectRow")) {

				this.table.modules.selectRow.clearSelectionData();
			}

			if (this.table.options.reactiveData && this.table.modExists("reactiveData", true)) {

				this.table.modules.reactiveData.watchData(data);
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

	RowManager.prototype._wipeElements = function () {

		this.rows.forEach(function (row) {

			row.wipe();
		});

		if (this.table.options.groupBy && this.table.modExists("groupRows")) {

			this.table.modules.groupRows.wipe();
		}

		this.rows = [];
	};

	RowManager.prototype.deleteRow = function (row, blockRedraw) {

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

		if (!blockRedraw) {

			this.reRenderInPosition();
		}

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
		var _this5 = this;

		var self = this,
		    length = 0,
		    rows = [];

		return new Promise(function (resolve, reject) {

			pos = _this5.findAddRowPos(pos);

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

			if (_this5.table.options.groupBy && _this5.table.modExists("groupRows")) {

				_this5.table.modules.groupRows.updateGroupRows(true);
			} else if (_this5.table.options.pagination && _this5.table.modExists("page")) {

				_this5.refreshActiveData(false, false, true);
			} else {

				_this5.reRenderInPosition();
			}

			//recalc column calculations if present

			if (_this5.table.modExists("columnCalcs")) {

				_this5.table.modules.columnCalcs.recalc(_this5.table.rowManager.activeRows);
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

		table = '<table>\n\n\t\t\t<thead>\n\n\t\t\t<tr>' + header + '</tr>\n\n\t\t\t</thead>\n\n\t\t\t<tbody>' + body + '</tbody>\n\n\t\t\t</table>';

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

				table.modules.page.setPage(1).then(function () {}).catch(function () {});
			} else if (options.ajaxProgressiveLoad) {

				table.modules.ajax.loadData().then(function () {}).catch(function () {});
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

	RowManager.prototype.sorterRefresh = function (loadOrignalData) {

		var table = this.table,
		    options = this.table.options,
		    left = this.scrollLeft;

		if (options.ajaxSorting) {

			if ((options.pagination == "remote" || options.progressiveLoad) && table.modExists("page")) {

				table.modules.page.reset(true);

				table.modules.page.setPage(1).then(function () {}).catch(function () {});
			} else if (options.ajaxProgressiveLoad) {

				table.modules.ajax.loadData().then(function () {}).catch(function () {});
			} else {

				//assume data is url, make ajax call to url to get data

				this._genRemoteRequest();
			}
		} else {

			this.refreshActiveData(loadOrignalData ? "filter" : "sort");
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

		if (self.table.modExists("edit")) {

			self.table.modules.edit.cancelEdit();
		}

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

						table.modules.sort.sort(this.activeRows);
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

			if (callback) {

				callback();
			}
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

		this._clearVirtualDom();

		if (this.displayRowsCount) {

			this.checkClassicModeGroupHeaderWidth();
		} else {

			this.renderEmptyScroll();
		}
	};

	RowManager.prototype.checkClassicModeGroupHeaderWidth = function () {

		var self = this,
		    element = this.tableElement,
		    onlyGroupHeaders = true;

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
		} else {

			element.style.minWidth = "";
		}
	};

	//show scrollbars on empty table div

	RowManager.prototype.renderEmptyScroll = function () {

		this.tableElement.style.minWidth = this.table.columnManager.getWidth() + "px";

		this.tableElement.style.minHeight = "1px";

		this.tableElement.style.visibility = "hidden";
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

			while (element.firstChild) {
				element.removeChild(element.firstChild);
			} //check if position is too close to bottom of table

			var heightOccupied = (self.displayRowsCount - position + 1) * self.vDomRowHeight;

			if (heightOccupied < self.height) {

				position -= Math.ceil((self.height - heightOccupied) / self.vDomRowHeight);

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
				    row = rows[index],
				    rowHeight = 0;

				self.styleRow(row, index);

				element.appendChild(row.getElement());

				if (!row.initialized) {

					row.initialize(true);
				} else {

					if (!row.heightInitialized) {

						row.normalizeHeight(true);
					}
				}

				rowHeight = row.getHeight();

				if (i < topPad) {

					topPadHeight += rowHeight;
				} else {

					rowsHeight += rowHeight;
				}

				if (rowHeight > this.vDomWindowBuffer) {

					this.vDomWindowBuffer = rowHeight * 2;
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

				if (bottomDiff < 0) {

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

			if (topRow.getHeight() > this.vDomWindowBuffer) {

				this.vDomWindowBuffer = topRow.getHeight() * 2;
			}

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

			if (bottomRow.getHeight() > this.vDomWindowBuffer) {

				this.vDomWindowBuffer = bottomRow.getHeight() * 2;
			}

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

	RowComponent.prototype.pageTo = function () {

		if (this._row.table.modExists("page", true)) {

			return this._row.table.modules.page.setPageToRow(this._row);
		}
	};

	RowComponent.prototype.move = function (to, after) {

		this._row.moveToRow(to, after);
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

		var row = this._row.nextRow();

		return row ? row.getComponent() : row;
	};

	RowComponent.prototype.getPrevRow = function () {

		var row = this._row.prevRow();

		return row ? row.getComponent() : row;
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

		this.heightStyled = ""; //hold element height prestyled to improve render efficiency

		this.manualHeight = false; //user has manually set row height

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

		//handle mouse events

		if (self.table.options.rowMouseEnter) {

			self.element.addEventListener("mouseenter", function (e) {

				self.table.options.rowMouseEnter(e, self.getComponent());
			});
		}

		if (self.table.options.rowMouseLeave) {

			self.element.addEventListener("mouseleave", function (e) {

				self.table.options.rowMouseLeave(e, self.getComponent());
			});
		}

		if (self.table.options.rowMouseOver) {

			self.element.addEventListener("mouseover", function (e) {

				self.table.options.rowMouseOver(e, self.getComponent());
			});
		}

		if (self.table.options.rowMouseOut) {

			self.element.addEventListener("mouseout", function (e) {

				self.table.options.rowMouseOut(e, self.getComponent());
			});
		}

		if (self.table.options.rowMouseMove) {

			self.element.addEventListener("mousemove", function (e) {

				self.table.options.rowMouseMove(e, self.getComponent());
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

		if (!this.manualHeight) {

			this.height = 0;

			this.heightStyled = "";
		}

		if (this.element.offsetParent !== null) {

			this.initialize(true);
		}
	};

	//get heights when doing bulk row style calcs in virtual DOM

	Row.prototype.calcHeight = function (force) {

		var maxHeight = 0,
		    minHeight = this.table.options.resizableRows ? this.element.clientHeight : 0;

		this.cells.forEach(function (cell) {

			var height = cell.getHeight();

			if (height > maxHeight) {

				maxHeight = height;
			}
		});

		if (force) {

			this.height = Math.max(maxHeight, minHeight);
		} else {

			this.height = this.manualHeight ? this.height : Math.max(maxHeight, minHeight);
		}

		this.heightStyled = this.height ? this.height + "px" : "";

		this.outerHeight = this.element.offsetHeight;
	};

	//set of cells

	Row.prototype.setCellHeight = function () {

		this.cells.forEach(function (cell) {

			cell.setHeight();
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

		this.calcHeight(force);

		this.setCellHeight();
	};

	// Row.prototype.setHeight = function(height){

	// 	this.height = height;


	// 	this.setCellHeight();

	// };


	//set height of rows

	Row.prototype.setHeight = function (height, force) {

		if (this.height != height || force) {

			this.manualHeight = true;

			this.height = height;

			this.heightStyled = height ? height + "px" : "";

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

		if (this.table.modExists("mutator")) {

			data = this.table.modules.mutator.transformRow(data, "data");
		}

		this.data = data;

		if (this.table.options.reactiveData && this.table.modExists("reactiveData", true)) {

			this.table.modules.reactiveData.watchRow(this);
		}
	};

	//update the rows data

	Row.prototype.updateData = function (data) {
		var _this6 = this;

		var self = this,
		    visible = Tabulator.prototype.helpers.elVisible(this.element);

		return new Promise(function (resolve, reject) {

			if (typeof data === "string") {

				data = JSON.parse(data);
			}

			if (_this6.table.options.reactiveData && _this6.table.modExists("reactiveData", true)) {

				_this6.table.modules.reactiveData.block();
			}

			//mutate incomming data if needed

			if (self.table.modExists("mutator")) {

				data = self.table.modules.mutator.transformRow(data, "data", true);
			}

			//set data

			for (var attrname in data) {

				self.data[attrname] = data[attrname];
			}

			if (_this6.table.options.reactiveData && _this6.table.modExists("reactiveData", true)) {

				_this6.table.modules.reactiveData.unblock();
			}

			//update affected cells only

			for (var attrname in data) {

				var cell = _this6.getCell(attrname);

				if (cell) {

					if (cell.getValue() != data[attrname]) {

						cell.setValueProcessData(data[attrname]);

						if (visible) {

							cell.cellRendered();
						}
					}
				}
			}

			//Partial reinitialization if visible

			if (visible) {

				self.normalizeHeight();

				if (self.table.options.rowFormatter) {

					self.table.options.rowFormatter(self.getComponent());
				}
			} else {

				_this6.initialized = false;

				_this6.height = 0;

				_this6.heightStyled = "";
			}

			if (self.table.options.dataTree !== false && self.table.modExists("dataTree") && typeof data[_this6.table.modules.dataTree.getChildField()] !== "undefined") {

				_this6.table.modules.dataTree.initializeRow(_this6);

				_this6.table.rowManager.refreshActiveData("tree", false, true);
			}

			//self.reinitialize();


			self.table.options.rowUpdated.call(_this6.table, self.getComponent());

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

		return row || false;
	};

	Row.prototype.prevRow = function () {

		var row = this.table.rowManager.prevDisplayRow(this, true);

		return row || false;
	};

	Row.prototype.moveToRow = function (to, before) {

		var toRow = this.table.rowManager.findRow(to);

		if (toRow) {

			this.table.rowManager.moveRowActual(this, toRow, !before);

			this.table.rowManager.refreshActiveData("display", false, true);
		} else {

			console.warn("Move Error - No matching row found:", to);
		}
	};

	///////////////////// Actions  /////////////////////


	Row.prototype.delete = function () {
		var _this7 = this;

		return new Promise(function (resolve, reject) {

			var index = _this7.table.rowManager.getRowIndex(_this7);

			_this7.deleteActual();

			if (_this7.table.options.history && _this7.table.modExists("history")) {

				if (index) {

					index = _this7.table.rowManager.rows[index - 1];
				}

				_this7.table.modules.history.action("rowDelete", _this7, { data: _this7.getData(), pos: !index, index: index });
			}

			resolve();
		});
	};

	Row.prototype.deleteActual = function (blockRedraw) {

		var index = this.table.rowManager.getRowIndex(this);

		//deselect row if it is selected

		if (this.table.modExists("selectRow")) {

			this.table.modules.selectRow._deselectRow(this, true);
		}

		// if(this.table.options.dataTree && this.table.modExists("dataTree")){

		// 	this.table.modules.dataTree.collapseRow(this, true);

		// }


		//remove any reactive data watchers from row object

		if (this.table.options.reactiveData && this.table.modExists("reactiveData", true)) {}

		// this.table.modules.reactiveData.unwatchRow(this);

		//remove from group

		if (this.modules.group) {

			this.modules.group.removeRow(this);
		}

		this.table.rowManager.deleteRow(this, blockRedraw);

		this.deleteCells();

		this.initialized = false;

		this.heightInitialized = false;

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

		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}this.element = false;

		this.modules = {};

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

		this.setWidth();

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
		    field = this.column.getField();

		//set text alignment

		element.style.textAlign = self.column.hozAlign;

		if (field) {

			element.setAttribute("tabulator-field", field);
		}

		//add class to cell if needed

		if (self.column.definition.cssClass) {

			var classNames = self.column.definition.cssClass.split(" ");

			classNames.forEach(function (className) {

				element.classList.add(className);
			});
		}

		//update tooltip on mouse enter

		if (this.table.options.tooltipGenerationMode === "hover") {

			element.addEventListener("mouseenter", function (e) {

				self._generateTooltip();
			});
		}

		self._bindClickEvents(cellEvents);

		self._bindTouchEvents(cellEvents);

		self._bindMouseEvents(cellEvents);

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

	Cell.prototype._bindClickEvents = function (cellEvents) {

		var self = this,
		    element = self.element;

		//set event bindings

		if (cellEvents.cellClick || self.table.options.cellClick) {

			element.addEventListener("click", function (e) {

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
	};

	Cell.prototype._bindMouseEvents = function (cellEvents) {

		var self = this,
		    element = self.element;

		if (cellEvents.cellMouseEnter || self.table.options.cellMouseEnter) {

			element.addEventListener("mouseenter", function (e) {

				var component = self.getComponent();

				if (cellEvents.cellMouseEnter) {

					cellEvents.cellMouseEnter.call(self.table, e, component);
				}

				if (self.table.options.cellMouseEnter) {

					self.table.options.cellMouseEnter.call(self.table, e, component);
				}
			});
		}

		if (cellEvents.cellMouseLeave || self.table.options.cellMouseLeave) {

			element.addEventListener("mouseleave", function (e) {

				var component = self.getComponent();

				if (cellEvents.cellMouseLeave) {

					cellEvents.cellMouseLeave.call(self.table, e, component);
				}

				if (self.table.options.cellMouseLeave) {

					self.table.options.cellMouseLeave.call(self.table, e, component);
				}
			});
		}

		if (cellEvents.cellMouseOver || self.table.options.cellMouseOver) {

			element.addEventListener("mouseover", function (e) {

				var component = self.getComponent();

				if (cellEvents.cellMouseOver) {

					cellEvents.cellMouseOver.call(self.table, e, component);
				}

				if (self.table.options.cellMouseOver) {

					self.table.options.cellMouseOver.call(self.table, e, component);
				}
			});
		}

		if (cellEvents.cellMouseOut || self.table.options.cellMouseOut) {

			element.addEventListener("mouseout", function (e) {

				var component = self.getComponent();

				if (cellEvents.cellMouseOut) {

					cellEvents.cellMouseOut.call(self.table, e, component);
				}

				if (self.table.options.cellMouseOut) {

					self.table.options.cellMouseOut.call(self.table, e, component);
				}
			});
		}

		if (cellEvents.cellMouseMove || self.table.options.cellMouseMove) {

			element.addEventListener("mousemove", function (e) {

				var component = self.getComponent();

				if (cellEvents.cellMouseMove) {

					cellEvents.cellMouseMove.call(self.table, e, component);
				}

				if (self.table.options.cellMouseMove) {

					self.table.options.cellMouseMove.call(self.table, e, component);
				}
			});
		}
	};

	Cell.prototype._bindTouchEvents = function (cellEvents) {

		var self = this,
		    element = self.element,
		    dblTap,
		    tapHold,
		    tap;

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

					//clear previous cell contents

					while (this.element.firstChild) {
						this.element.removeChild(this.element.firstChild);
					}this.element.appendChild(val);
				} else {

					this.element.innerHTML = "";

					if (val != null) {

						console.warn("Format Error - Formatter has returned a type of object, the only valid formatter object return is an instance of Node, the formatter returned:", val);
					}
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

		if (changed && this.table.modExists("columnCalcs")) {

			if (this.column.definition.topCalc || this.column.definition.bottomCalc) {

				if (this.table.options.groupBy && this.table.modExists("groupRows")) {

					this.table.modules.columnCalcs.recalcRowGroup(this.row);
				} else {

					this.table.modules.columnCalcs.recalc(this.table.rowManager.activeRows);
				}
			}
		}

		return changed;
	};

	Cell.prototype.setValueActual = function (value) {

		this.oldValue = this.value;

		this.value = value;

		if (this.table.options.reactiveData && this.table.modExists("reactiveData")) {

			this.table.modules.reactiveData.block();
		}

		this.column.setFieldValue(this.row.data, value);

		if (this.table.options.reactiveData && this.table.modExists("reactiveData")) {

			this.table.modules.reactiveData.unblock();
		}

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

	Cell.prototype.setWidth = function () {

		this.width = this.column.width;

		this.element.style.width = this.column.widthStyled;
	};

	Cell.prototype.clearWidth = function () {

		this.width = "";

		this.element.style.width = "";
	};

	Cell.prototype.getWidth = function () {

		return this.width || this.element.offsetWidth;
	};

	Cell.prototype.setMinWidth = function () {

		this.minWidth = this.column.minWidth;

		this.element.style.minWidth = this.column.minWidthStyled;
	};

	Cell.prototype.checkHeight = function () {

		// var height = this.element.css("height");

		this.row.reinitializeHeight();
	};

	Cell.prototype.clearHeight = function () {

		this.element.style.height = "";

		this.height = null;
	};

	Cell.prototype.setHeight = function () {

		this.height = this.row.height;

		this.element.style.height = this.row.heightStyled;
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

		this.element = false;

		this.column.deleteCell(this);

		this.row.deleteCell(this);

		this.calcs = {};
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


		autoColumns: false, //build columns from data row structure


		reactiveData: false, //enable data reactivity


		nestedFieldSeparator: ".", //seperatpr for nested data


		tooltips: false, //Tool tip value

		tooltipsHeader: false, //Tool tip for headers

		tooltipGenerationMode: "load", //when to generate tooltips


		initialSort: false, //initial sorting criteria

		initialFilter: false, //initial filtering criteria

		initialHeaderFilter: false, //initial header filtering criteria


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

		dataTreeElementColumn: false,

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

		virtualDomBuffer: 0, // set virtual DOM buffer size


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

		paginationSizeSelector: false, //add pagination size selector element

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

		rowMouseEnter: false,

		rowMouseLeave: false,

		rowMouseOver: false,

		rowMouseOut: false,

		rowMouseMove: false,

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

		cellMouseEnter: false,

		cellMouseLeave: false,

		cellMouseOver: false,

		cellMouseOut: false,

		cellMouseMove: false,

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

		if (!this.options.reactiveData) {

			this.options.data = this.options.data.slice(0);
		}
	};

	//build tabulator element

	Tabulator.prototype._buildElement = function () {
		var _this8 = this;

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

		this.columnManager.initialize();

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

		if ((options.persistentLayout || options.persistentSort || options.persistentFilter) && this.modExists("persistence", true)) {

			mod.persistence.initialize(options.persistenceMode, options.persistenceID);
		}

		if (options.persistentLayout && this.modExists("persistence", true)) {

			options.columns = mod.persistence.load("columns", options.columns);
		}

		if (options.movableRows && this.modExists("moveRow")) {

			mod.moveRow.initialize();
		}

		if (options.autoColumns && this.options.data) {

			this.columnManager.generateColumnsFromRowData(this.options.data);
		}

		if (this.modExists("columnCalcs")) {

			mod.columnCalcs.initialize();
		}

		this.columnManager.setColumns(options.columns);

		if (options.dataTree && this.modExists("dataTree", true)) {

			mod.dataTree.initialize();
		}

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
		}

		if (options.initialHeaderFilter && this.modExists("filter", true)) {

			options.initialHeaderFilter.forEach(function (item) {

				var column = _this8.columnManager.findColumn(item.field);

				if (column) {

					mod.filter.setHeaderFilterValue(column, item.value);
				} else {

					console.warn("Column Filter Error - No matching column found:", item.field);

					return false;
				}
			});
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

						self.modules.ajax.loadData().then(function () {}).catch(function () {});
					} else {

						self.rowManager.setData(self.options.data);
					}
				}
			} else {

				if (self.options.ajaxURL) {

					self.modules.page.setPage(1).then(function () {}).catch(function () {});
				} else {

					self.rowManager.setData([]);
				}
			}
		} else {

			if (self.options.data.length) {

				self.rowManager.setData(self.options.data);
			} else {

				if ((self.options.ajaxURL || self.options.ajaxURLGenerator) && self.modExists("ajax")) {

					self.modules.ajax.loadData().then(function () {}).catch(function () {});
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


		if (this.options.reactiveData && this.modExists("reactiveData", true)) {

			this.modules.reactiveData.unwatchData();
		}

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


	//loca data from local file

	Tabulator.prototype.setDataFromLocalFile = function (extensions) {
		var _this9 = this;

		return new Promise(function (resolve, reject) {

			var input = document.createElement("input");

			input.type = "file";

			input.accept = extensions || ".json,application/json";

			input.addEventListener("change", function (e) {

				var file = input.files[0],
				    reader = new FileReader(),
				    data;

				reader.readAsText(file);

				reader.onload = function (e) {

					try {

						data = JSON.parse(reader.result);
					} catch (e) {

						console.warn("File Load Error - File contents is invalid JSON", e);

						reject(e);

						return;
					}

					_this9._setData(data).then(function (data) {

						resolve(data);
					}).catch(function (err) {

						resolve(err);
					});
				};

				reader.onerror = function (e) {

					console.warn("File Load Error - Unable to read file");

					reject();
				};
			});

			input.click();
		});
	};

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
		var _this10 = this;

		var self = this;

		var responses = 0;

		return new Promise(function (resolve, reject) {

			if (_this10.modExists("ajax")) {

				_this10.modules.ajax.blockActiveRequest();
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
		var _this11 = this;

		return new Promise(function (resolve, reject) {

			if (_this11.modExists("ajax")) {

				_this11.modules.ajax.blockActiveRequest();
			}

			if (typeof data === "string") {

				data = JSON.parse(data);
			}

			if (data) {

				_this11.rowManager.addRows(data, pos, index).then(function (rows) {

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
		var _this12 = this;

		var self = this,
		    rows = [],
		    responses = 0;

		return new Promise(function (resolve, reject) {

			if (_this12.modExists("ajax")) {

				_this12.modules.ajax.blockActiveRequest();
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
		var _this13 = this;

		return new Promise(function (resolve, reject) {

			var row = _this13.rowManager.findRow(index);

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
		var _this14 = this;

		return new Promise(function (resolve, reject) {

			if (typeof data === "string") {

				data = JSON.parse(data);
			}

			_this14.rowManager.addRows(data, pos, index).then(function (rows) {

				//recalc column calculations if present

				if (_this14.modExists("columnCalcs")) {

					_this14.modules.columnCalcs.recalc(_this14.rowManager.activeRows);
				}

				resolve(rows[0].getComponent());
			});
		});
	};

	//update a row if it exitsts otherwise create it

	Tabulator.prototype.updateOrAddRow = function (index, data) {
		var _this15 = this;

		return new Promise(function (resolve, reject) {

			var row = _this15.rowManager.findRow(index);

			if (typeof data === "string") {

				data = JSON.parse(data);
			}

			if (row) {

				row.updateData(data).then(function () {

					//recalc column calculations if present

					if (_this15.modExists("columnCalcs")) {

						_this15.modules.columnCalcs.recalc(_this15.rowManager.activeRows);
					}

					resolve(row.getComponent());
				}).catch(function (err) {

					reject(err);
				});
			} else {

				row = _this15.rowManager.addRows(data).then(function (rows) {

					//recalc column calculations if present

					if (_this15.modExists("columnCalcs")) {

						_this15.modules.columnCalcs.recalc(_this15.rowManager.activeRows);
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
		var _this16 = this;

		return new Promise(function (resolve, reject) {

			var row = _this16.rowManager.findRow(index);

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
		var _this17 = this;

		return new Promise(function (resolve, reject) {

			var row = _this17.rowManager.findRow(index);

			if (row) {

				_this17.rowManager.scrollToRow(row, position, ifVisible).then(function () {

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

	Tabulator.prototype.moveRow = function (from, to, after) {

		var fromRow = this.rowManager.findRow(from);

		if (fromRow) {

			fromRow.moveToRow(to, after);
		} else {

			console.warn("Move Error - No matching row found:", from);
		}
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
		var _this18 = this;

		return new Promise(function (resolve, reject) {

			var column = _this18.columnManager.findColumn(field);

			if (column) {

				_this18.columnManager.scrollToColumn(column, position, ifVisible).then(function () {

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

			return this.modules.page.setPage(page);
		} else {

			return new Promise(function (resolve, reject) {
				reject();
			});
		}
	};

	Tabulator.prototype.setPageToRow = function (row) {
		var _this19 = this;

		return new Promise(function (resolve, reject) {

			if (_this19.options.pagination && _this19.modExists("page")) {

				row = _this19.rowManager.findRow(row);

				if (row) {

					_this19.modules.page.setPageToRow(row).then(function () {

						resolve();
					}).catch(function () {

						reject();
					});
				} else {

					reject();
				}
			} else {

				reject();
			}
		});
	};

	Tabulator.prototype.setPageSize = function (size) {

		if (this.options.pagination && this.modExists("page")) {

			this.modules.page.setPageSize(size);

			this.modules.page.setPage(1).then(function () {}).catch(function () {});
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

	Tabulator.prototype.downloadToTab = function (type, filename, options) {

		if (this.modExists("download", true)) {

			this.modules.download.download(type, filename, options, true);
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

				"page_size": "Page Size",

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
			column.modules.accessor = config;
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
		var data = Tabulator.prototype.helpers.deepClone(dataIn || {});

		self.table.columnManager.traverse(function (column) {
			var value, accessor, params, component;

			if (column.modules.accessor) {

				accessor = column.modules.accessor[key] || column.modules.accessor.accessor || false;

				if (accessor) {
					value = column.getFieldValue(data);

					if (value != "undefined") {
						component = column.getComponent();
						params = typeof accessor.params === "function" ? accessor.params(value, data, type, component) : accessor.params;
						column.setFieldValue(data, accessor.accessor(value, data, type, params, component));
					}
				}
			}
		});

		return data;
	},

	//default accessors
	Accessor.prototype.accessors = {};

	Tabulator.prototype.registerModule("accessor", Accessor);
	var Ajax = function Ajax(table) {

		this.table = table; //hold Tabulator object
		this.config = false; //hold config object for ajax request
		this.url = ""; //request URL
		this.urlGenerator = false;
		this.params = false; //request parameters

		this.loaderElement = this.createLoaderElement(); //loader message div
		this.msgElement = this.createMsgElement(); //message element
		this.loadingElement = false;
		this.errorElement = false;
		this.loaderPromise = false;

		this.progressiveLoad = false;
		this.loading = false;

		this.requestOrder = 0; //prevent requests comming out of sequence if overridden by another load request
	};

	//initialize setup options
	Ajax.prototype.initialize = function () {
		var template;

		this.loaderElement.appendChild(this.msgElement);

		if (this.table.options.ajaxLoaderLoading) {
			if (typeof this.table.options.ajaxLoaderLoading == "string") {
				template = document.createElement('template');
				template.innerHTML = this.table.options.ajaxLoaderLoading.trim();
				this.loadingElement = template.content.firstChild;
			} else {
				this.loadingElement = this.table.options.ajaxLoaderLoading;
			}
		}

		this.loaderPromise = this.table.options.ajaxRequestFunc || this.defaultLoaderPromise;

		this.urlGenerator = this.table.options.ajaxURLGenerator || this.defaultURLGenerator;

		if (this.table.options.ajaxLoaderError) {
			if (typeof this.table.options.ajaxLoaderError == "string") {
				template = document.createElement('template');
				template.innerHTML = this.table.options.ajaxLoaderError.trim();
				this.errorElement = template.content.firstChild;
			} else {
				this.errorElement = this.table.options.ajaxLoaderError;
			}
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
				if (this.table.modExists("page")) {
					this.progressiveLoad = this.table.options.ajaxProgressiveLoad;
					this.table.modules.page.initializeProgressive(this.progressiveLoad);
				} else {
					console.error("Pagination plugin is required for progressive ajax loading");
				}
			}
		}
	};

	Ajax.prototype.createLoaderElement = function () {
		var el = document.createElement("div");
		el.classList.add("tabulator-loader");
		return el;
	};

	Ajax.prototype.createMsgElement = function () {
		var el = document.createElement("div");

		el.classList.add("tabulator-loader-msg");
		el.setAttribute("role", "alert");

		return el;
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
			this.config.method = config;
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
			return this._loadDataProgressive();
		} else {
			return this._loadDataStandard(inPosition);
		}
	};

	Ajax.prototype.nextPage = function (diff) {
		var margin;

		if (!this.loading) {

			margin = this.table.options.ajaxProgressiveLoadScrollMargin || this.table.rowManager.getElement().clientHeight * 2;

			if (diff < margin) {
				this.table.modules.page.nextPage().then(function () {}).catch(function () {});
			}
		}
	};

	Ajax.prototype.blockActiveRequest = function () {
		this.requestOrder++;
	};

	Ajax.prototype._loadDataProgressive = function () {
		this.table.rowManager.setData([]);
		return this.table.modules.page.setPage(1);
	};

	Ajax.prototype._loadDataStandard = function (inPosition) {
		var _this20 = this;

		return new Promise(function (resolve, reject) {
			_this20.sendRequest(inPosition).then(function (data) {
				_this20.table.rowManager.setData(data, inPosition).then(function () {
					resolve();
				}).catch(function (e) {
					reject(e);
				});
			}).catch(function (e) {
				reject(e);
			});
		});
	};

	Ajax.prototype.generateParamsList = function (data, prefix) {
		var self = this,
		    output = [];

		prefix = prefix || "";

		if (Array.isArray(data)) {
			data.forEach(function (item, i) {
				output = output.concat(self.generateParamsList(item, prefix ? prefix + "[" + i + "]" : i));
			});
		} else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === "object") {
			for (var key in data) {
				output = output.concat(self.generateParamsList(data[key], prefix ? prefix + "[" + key + "]" : key));
			}
		} else {
			output.push({ key: prefix, value: data });
		}

		return output;
	};

	Ajax.prototype.serializeParams = function (params) {
		var output = this.generateParamsList(params),
		    encoded = [];

		output.forEach(function (item) {
			encoded.push(encodeURIComponent(item.key) + "=" + encodeURIComponent(item.value));
		});

		return encoded.join("&");
	};

	//send ajax request
	Ajax.prototype.sendRequest = function (silent) {
		var _this21 = this;

		var self = this,
		    url = self.url,
		    requestNo,
		    esc,
		    query;

		self.requestOrder++;
		requestNo = self.requestOrder;

		self._loadDefaultConfig();

		return new Promise(function (resolve, reject) {
			if (self.table.options.ajaxRequesting.call(_this21.table, self.url, self.params) !== false) {

				self.loading = true;

				if (!silent) {
					self.showLoader();
				}

				_this21.loaderPromise(url, self.config, self.params).then(function (data) {
					if (requestNo === self.requestOrder) {
						if (self.table.options.ajaxResponse) {
							data = self.table.options.ajaxResponse.call(self.table, self.url, self.params, data);
						}
						resolve(data);
					} else {
						console.warn("Ajax Response Blocked - An active ajax request was blocked by an attempt to change table data while the request was being made");
					}

					self.hideLoader();

					self.loading = false;
				}).catch(function (error) {
					console.error("Ajax Load Error: ", error);
					self.table.options.ajaxError.call(self.table, error);

					self.showError();

					setTimeout(function () {
						self.hideLoader();
					}, 3000);

					self.loading = false;

					reject();
				});
			} else {
				reject();
			}
		});
	};

	Ajax.prototype.showLoader = function () {
		var shouldLoad = typeof this.table.options.ajaxLoader === "function" ? this.table.options.ajaxLoader() : this.table.options.ajaxLoader;

		if (shouldLoad) {

			this.hideLoader();

			while (this.msgElement.firstChild) {
				this.msgElement.removeChild(this.msgElement.firstChild);
			}this.msgElement.classList.remove("tabulator-error");
			this.msgElement.classList.add("tabulator-loading");

			if (this.loadingElement) {
				this.msgElement.appendChild(this.loadingElement);
			} else {
				this.msgElement.innerHTML = this.table.modules.localize.getText("ajax|loading");
			}

			this.table.element.appendChild(this.loaderElement);
		}
	};

	Ajax.prototype.showError = function () {
		this.hideLoader();

		while (this.msgElement.firstChild) {
			this.msgElement.removeChild(this.msgElement.firstChild);
		}this.msgElement.classList.remove("tabulator-loading");
		this.msgElement.classList.add("tabulator-error");

		if (this.errorElement) {
			this.msgElement.appendChild(this.errorElement);
		} else {
			this.msgElement.innerHTML = this.table.modules.localize.getText("ajax|error");
		}

		this.table.element.appendChild(this.loaderElement);
	};

	Ajax.prototype.hideLoader = function () {
		if (this.loaderElement.parentNode) {
			this.loaderElement.parentNode.removeChild(this.loaderElement);
		}
	};

	//default ajax config object
	Ajax.prototype.defaultConfig = {
		method: "GET"
	};

	Ajax.prototype.defaultURLGenerator = function (url, config, params) {

		if (url) {
			if (params && Object.keys(params).length) {
				if (!config.method || config.method.toLowerCase() == "get") {
					config.method = "get";
					url += "?" + this.serializeParams(params);
				}
			}
		}

		return url;
	};

	Ajax.prototype.defaultLoaderPromise = function (url, config, params) {
		var self = this,
		    contentType;

		return new Promise(function (resolve, reject) {

			//set url
			url = self.urlGenerator(url, config, params);

			//set body content if not GET request
			if (config.method.toUpperCase() != "GET") {
				contentType = _typeof(self.table.options.ajaxContentType) === "object" ? self.table.options.ajaxContentType : self.contentTypeFormatters[self.table.options.ajaxContentType];
				if (contentType) {

					for (var key in contentType.headers) {
						if (!config.headers) {
							config.headers = {};
						}

						if (typeof config.headers[key] === "undefined") {
							config.headers[key] = contentType.headers[key];
						}
					}

					config.body = contentType.body.call(self, url, config, params);
				} else {
					console.warn("Ajax Error - Invalid ajaxContentType value:", self.table.options.ajaxContentType);
				}
			}

			if (url) {

				//configure headers
				if (typeof config.headers === "undefined") {
					config.headers = {};
				}

				if (typeof config.headers.Accept === "undefined") {
					config.headers.Accept = "application/json";
				}

				if (typeof config.headers["X-Requested-With"] === "undefined") {
					config.headers["X-Requested-With"] = "XMLHttpRequest";
				}

				if (typeof config.mode === "undefined") {
					config.mode = "cors";
				}

				if (config.mode == "cors") {

					if (typeof config.headers["Access-Control-Allow-Origin"] === "undefined") {
						config.headers["Access-Control-Allow-Origin"] = window.location.origin;
					}

					if (typeof config.credentials === "undefined") {
						config.credentials = 'same-origin';
					}
				} else {
					if (typeof config.credentials === "undefined") {
						config.credentials = 'include';
					}
				}

				//send request
				fetch(url, config).then(function (response) {
					if (response.ok) {
						response.json().then(function (data) {
							resolve(data);
						}).catch(function (error) {
							reject(error);
							console.warn("Ajax Load Error - Invalid JSON returned", error);
						});
					} else {
						console.error("Ajax Load Error - Connection Error: " + response.status, response.statusText);
						reject(response);
					}
				}).catch(function (error) {
					console.error("Ajax Load Error - Connection Error: ", error);
					reject(error);
				});
			} else {
				console.warn("Ajax Load Error - No URL Set");
				resolve([]);
			}
		});
	};

	Ajax.prototype.contentTypeFormatters = {
		"json": {
			headers: {
				'Content-Type': 'application/json'
			},
			body: function body(url, config, params) {
				return JSON.stringify(params);
			}
		},
		"form": {
			headers: {},
			body: function body(url, config, params) {
				var output = this.generateParamsList(params),
				    form = new FormData();

				output.forEach(function (item) {
					form.append(item.key, item.value);
				});

				return form;
			}
		}
	};

	Tabulator.prototype.registerModule("ajax", Ajax);

	var ColumnCalcs = function ColumnCalcs(table) {
		this.table = table; //hold Tabulator object
		this.topCalcs = [];
		this.botCalcs = [];
		this.genColumn = false;
		this.topElement = this.createElement();
		this.botElement = this.createElement();
		this.topRow = false;
		this.botRow = false;
		this.topInitialized = false;
		this.botInitialized = false;

		this.initialize();
	};

	ColumnCalcs.prototype.createElement = function () {
		var el = document.createElement("div");
		el.classList.add("tabulator-calcs-holder");
		return el;
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
				column.modules.columnCalcs = config;
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
				column.modules.columnCalcs = config;
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
			this.topElement.parentNode.removeChild(this.topElement);
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
			// this.table.columnManager.headersElement.after(this.topElement);
			this.table.columnManager.getElement().insertBefore(this.topElement, this.table.columnManager.headersElement.nextSibling);
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
		    scrollWidth = this.table.columnManager.getElement().scrollWidth - this.table.element.clientWidth;

		if (this.botInitialized) {
			this.botRow.getElement().style.marginLeft = -left + "px";
		}
	};

	ColumnCalcs.prototype.recalc = function (rows) {
		var data, row;

		if (this.topInitialized || this.botInitialized) {
			data = this.rowsToData(rows);

			if (this.topInitialized) {
				row = this.generateRow("top", this.rowsToData(rows));
				this.topRow = row;
				while (this.topElement.firstChild) {
					this.topElement.removeChild(this.topElement.firstChild);
				}this.topElement.appendChild(row.getElement());
				row.initialize(true);
			}

			if (this.botInitialized) {
				row = this.generateRow("bottom", this.rowsToData(rows));
				this.botRow = row;
				while (this.botElement.firstChild) {
					this.botElement.removeChild(this.botElement.firstChild);
				}this.botElement.appendChild(row.getElement());
				row.initialize(true);
			}

			this.table.rowManager.adjustTableSize();

			//set resizable handles
			if (this.table.modExists("frozenColumns")) {
				this.table.modules.frozenColumns.layout();
			}
		}
	};

	ColumnCalcs.prototype.recalcRowGroup = function (row) {
		this.recalcGroup(this.table.modules.groupRows.getRowGroup(row));
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
		    row;

		if (self.table.modExists("mutator")) {
			self.table.modules.mutator.disable();
		}

		row = new Row(rowData, this);

		if (self.table.modExists("mutator")) {
			self.table.modules.mutator.enable();
		}

		row.getElement().classList.add("tabulator-calcs", "tabulator-calcs-" + pos);
		row.type = "calc";

		row.generateCells = function () {

			var cells = [];

			self.table.columnManager.columnsByIndex.forEach(function (column) {

				//set field name of mock column
				self.genColumn.setField(column.getField());
				self.genColumn.hozAlign = column.hozAlign;

				if (column.definition[pos + "CalcFormatter"] && self.table.modExists("format")) {

					self.genColumn.modules.format = {
						formatter: self.table.modules.format.getFormatter(column.definition[pos + "CalcFormatter"]),
						params: column.definition[pos + "CalcFormatterParams"]
					};
				} else {
					self.genColumn.modules.format = {
						formatter: self.table.modules.format.getFormatter("plaintext"),
						params: {}
					};
				}

				//ensure css class defintion is replicated to calculation cell
				self.genColumn.definition.cssClass = column.definition.cssClass;

				//generate cell and assign to correct column
				var cell = new Cell(self.genColumn, row);
				cell.column = column;
				cell.setWidth();

				column.cells.push(cell);
				cells.push(cell);

				if (!column.visible) {
					cell.hide();
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
		    type = pos == "top" ? "topCalc" : "botCalc",
		    params,
		    paramKey;

		calcs.forEach(function (column) {
			var values = [];

			if (column.modules.columnCalcs && column.modules.columnCalcs[type]) {
				data.forEach(function (item) {
					values.push(column.getFieldValue(item));
				});

				paramKey = type + "Params";
				params = typeof column.modules.columnCalcs[paramKey] === "function" ? column.modules.columnCalcs[paramKey](value, data) : column.modules.columnCalcs[paramKey];

				column.setFieldValue(rowData, column.modules.columnCalcs[type](values, data, params));
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

		if (this.table.options.groupBy && this.table.modExists("groupRows")) {
			groups = this.table.modules.groupRows.getGroups(true);

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

	Tabulator.prototype.registerModule("columnCalcs", ColumnCalcs);
	var Clipboard = function Clipboard(table) {
		this.table = table;
		this.mode = true;
		this.copySelector = false;
		this.copySelectorParams = {};
		this.copyFormatter = false;
		this.copyFormatterParams = {};
		this.pasteParser = function () {};
		this.pasteAction = function () {};
		this.htmlElement = false;
		this.config = {};

		this.blocked = true; //block copy actions not originating from this command
	};

	Clipboard.prototype.initialize = function () {
		var self = this;

		this.mode = this.table.options.clipboard;

		if (this.mode === true || this.mode === "copy") {
			this.table.element.addEventListener("copy", function (e) {
				var data;

				self.processConfig();

				if (!self.blocked) {
					e.preventDefault();

					data = self.generateContent();

					if (window.clipboardData && window.clipboardData.setData) {
						window.clipboardData.setData('Text', data);
					} else if (e.clipboardData && e.clipboardData.setData) {
						e.clipboardData.setData('text/plain', data);
						if (self.htmlElement) {
							e.clipboardData.setData('text/html', self.htmlElement.outerHTML);
						}
					} else if (e.originalEvent && e.originalEvent.clipboardData.setData) {
						e.originalEvent.clipboardData.setData('text/plain', data);
						if (self.htmlElement) {
							e.originalEvent.clipboardData.setData('text/html', self.htmlElement.outerHTML);
						}
					}

					self.table.options.clipboardCopied.call(this.table, data);

					self.reset();
				}
			});
		}

		if (this.mode === true || this.mode === "paste") {
			this.table.element.addEventListener("paste", function (e) {
				self.paste(e);
			});
		}

		this.setPasteParser(this.table.options.clipboardPasteParser);
		this.setPasteAction(this.table.options.clipboardPasteAction);
	};

	Clipboard.prototype.processConfig = function () {
		var config = {
			columnHeaders: "groups",
			rowGroups: true,
			columnCalcs: true
		};

		if (typeof this.table.options.clipboardCopyHeader !== "undefined") {
			config.columnHeaders = this.table.options.clipboardCopyHeader;
			console.warn("DEPRECATION WANRING - clipboardCopyHeader option has been depricated, please use the columnHeaders property on the clipboardCopyConfig option");
		}

		if (this.table.options.clipboardCopyConfig) {
			for (var key in this.table.options.clipboardCopyConfig) {
				config[key] = this.table.options.clipboardCopyConfig[key];
			}
		}

		if (config.rowGroups && this.table.options.groupBy && this.table.modExists("groupRows")) {
			this.config.rowGroups = true;
		}

		if (config.columnHeaders) {
			if ((config.columnHeaders === "groups" || config === true) && this.table.columnManager.columns.length != this.table.columnManager.columnsByIndex.length) {
				this.config.columnHeaders = "groups";
			} else {
				this.config.columnHeaders = "columns";
			}
		} else {
			this.config.columnHeaders = false;
		}

		if (config.columnCalcs && this.table.modExists("columnCalcs")) {
			this.config.columnCalcs = true;
		}
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

				if (this.table.modExists("mutator")) {
					rowData = this.mutateData(rowData);
				}

				rows = this.pasteAction.call(this, rowData);
				this.table.options.clipboardPasted.call(this.table, data, rowData, rows);
			} else {
				this.table.options.clipboardPasteError.call(this.table, data);
			}
		}
	};

	Clipboard.prototype.mutateData = function (data) {
		var self = this,
		    output = [];

		if (Array.isArray(data)) {
			data.forEach(function (row) {
				output.push(self.table.modules.mutator.transformRow(row, "clipboard"));
			});
		} else {
			output = data;
		}

		return output;
	};

	Clipboard.prototype.checkPaseOrigin = function (e) {
		var valid = true;

		if (e.target.tagName != "DIV" || this.table.modules.edit.currentCell) {
			valid = false;
		}

		return valid;
	};

	Clipboard.prototype.getPasteData = function (e) {
		var data;

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
				range.selectNodeContents(this.table.element);
				sel = window.getSelection();

				if (sel.toString() && internal) {
					selector = "userSelection";
					formatter = "raw";
					selectorParams = sel.toString();
				}

				sel.removeAllRanges();
				sel.addRange(range);
			} else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
				textRange = document.body.createTextRange();
				textRange.moveToElementText(this.table.element);
				textRange.select();
			}

			this.setSelector(selector);
			this.copySelectorParams = typeof selectorParams != "undefined" && selectorParams != null ? selectorParams : this.config.columnHeaders;
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
		var data;

		this.htmlElement = false;
		data = this.copySelector.call(this, this.config, this.copySelectorParams);

		return this.copyFormatter.call(this, data, this.config, this.copyFormatterParams);
	};

	Clipboard.prototype.generateSimpleHeaders = function (columns) {
		var headers = [];

		columns.forEach(function (column) {
			headers.push(column.definition.title);
		});

		return headers;
	};

	Clipboard.prototype.generateColumnGroupHeaders = function (columns) {
		var _this22 = this;

		var output = [];

		this.table.columnManager.columns.forEach(function (column) {
			var colData = _this22.processColumnGroup(column);

			if (colData) {
				output.push(colData);
			}
		});

		return output;
	};

	Clipboard.prototype.processColumnGroup = function (column) {
		var _this23 = this;

		var subGroups = column.columns;

		var groupData = {
			type: "group",
			title: column.definition.title,
			column: column
		};

		if (subGroups.length) {
			groupData.subGroups = [];
			groupData.width = 0;

			subGroups.forEach(function (subGroup) {
				var subGroupData = _this23.processColumnGroup(subGroup);

				if (subGroupData) {
					groupData.width += subGroupData.width;
					groupData.subGroups.push(subGroupData);
				}
			});

			if (!groupData.width) {
				return false;
			}
		} else {
			if (column.field && column.visible) {
				groupData.width = 1;
			} else {
				return false;
			}
		}

		return groupData;
	};

	Clipboard.prototype.groupHeadersToRows = function (columns) {

		var headers = [];

		function parseColumnGroup(column, level) {

			if (typeof headers[level] === "undefined") {
				headers[level] = [];
			}

			headers[level].push(column.title);

			if (column.subGroups) {
				column.subGroups.forEach(function (subGroup) {
					parseColumnGroup(subGroup, level + 1);
				});
			} else {
				padColumnheaders();
			}
		}

		function padColumnheaders() {
			var max = 0;

			headers.forEach(function (title) {
				var len = title.length;
				if (len > max) {
					max = len;
				}
			});

			headers.forEach(function (title) {
				var len = title.length;
				if (len < max) {
					for (var i = len; i < max; i++) {
						title.push("");
					}
				}
			});
		}

		columns.forEach(function (column) {
			parseColumnGroup(column, 0);
		});

		return headers;
	};

	Clipboard.prototype.rowsToData = function (rows, config, params) {
		var columns = this.table.columnManager.columnsByIndex,
		    data = [];

		rows.forEach(function (row) {
			var rowArray = [],
			    rowData = row instanceof RowComponent ? row.getData("clipboard") : row;

			columns.forEach(function (column) {
				var value = column.getFieldValue(rowData);

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

				rowArray.push(value);
			});

			data.push(rowArray);
		});

		return data;
	};

	Clipboard.prototype.buildComplexRows = function (config) {
		var _this24 = this;

		var output = [],
		    groups = this.table.modules.groupRows.getGroups();

		groups.forEach(function (group) {
			output.push(_this24.processGroupData(group));
		});

		return output;
	};

	Clipboard.prototype.processGroupData = function (group) {
		var _this25 = this;

		var subGroups = group.getSubGroups();

		var groupData = {
			type: "group",
			key: group.key
		};

		if (subGroups.length) {
			groupData.subGroups = [];

			subGroups.forEach(function (subGroup) {
				groupData.subGroups.push(_this25.processGroupData(subGroup));
			});
		} else {
			groupData.rows = group.getRows(true);
		}

		return groupData;
	};

	Clipboard.prototype.getCalcRow = function (calcs, selector, pos) {
		var calcData = calcs[selector];

		if (calcData) {
			if (pos) {
				calcData = calcData[pos];
			}

			if (Object.keys(calcData).length) {
				return this.rowsToData([calcData]);
			}
		}

		return [];
	};

	Clipboard.prototype.buildOutput = function (rows, config, params) {
		var _this26 = this;

		var output = [],
		    calcs,
		    columns = this.table.columnManager.columnsByIndex;

		if (config.columnHeaders) {

			if (config.columnHeaders == "groups") {
				columns = this.generateColumnGroupHeaders(this.table.columnManager.columns);

				output = output.concat(this.groupHeadersToRows(columns));
			} else {
				output.push(this.generateSimpleHeaders(columns));
			}
		}

		if (this.config.columnCalcs) {
			calcs = this.table.getCalcResults();
		}

		//generate styled content
		if (this.table.options.clipboardCopyStyled) {
			this.generateHTML(rows, columns, calcs, config, params);
		}

		//generate unstyled content
		if (config.rowGroups) {
			rows.forEach(function (row) {
				output = output.concat(_this26.parseRowGroupData(row, config, params, calcs || {}));
			});
		} else {
			if (config.columnCalcs) {
				output = output.concat(this.getCalcRow(calcs, "top"));
			}

			output = output.concat(this.rowsToData(rows, config, params));

			if (config.columnCalcs) {
				output = output.concat(this.getCalcRow(calcs, "bottom"));
			}
		}

		return output;
	};

	Clipboard.prototype.parseRowGroupData = function (group, config, params, calcObj) {
		var _this27 = this;

		var groupData = [];

		groupData.push([group.key]);

		if (group.subGroups) {
			group.subGroups.forEach(function (subGroup) {
				groupData = groupData.concat(_this27.parseRowGroupData(subGroup, config, params, calcObj[group.key] ? calcObj[group.key].groups || {} : {}));
			});
		} else {
			if (config.columnCalcs) {
				groupData = groupData.concat(this.getCalcRow(calcObj, group.key, "top"));
			}

			groupData = groupData.concat(this.rowsToData(group.rows, config, params));

			if (config.columnCalcs) {
				groupData = groupData.concat(this.getCalcRow(calcObj, group.key, "bottom"));
			}
		}

		return groupData;
	};

	Clipboard.prototype.generateHTML = function (rows, columns, calcs, config, params) {
		var self = this,
		    data = [],
		    headers = [],
		    body,
		    oddRow,
		    evenRow,
		    calcRow,
		    firstRow,
		    firstCell,
		    firstGroup,
		    lastCell,
		    styleCells;

		//create table element
		this.htmlElement = document.createElement("table");
		self.mapElementStyles(this.table.element, this.htmlElement, ["border-top", "border-left", "border-right", "border-bottom"]);

		function generateSimpleHeaders() {
			var headerEl = document.createElement("tr");

			columns.forEach(function (column) {
				var columnEl = document.createElement("th");
				columnEl.innerHTML = column.definition.title;

				self.mapElementStyles(column.getElement(), columnEl, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

				headerEl.appendChild(columnEl);
			});

			self.mapElementStyles(self.table.columnManager.getHeadersElement(), headerEl, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

			self.htmlElement.appendChild(document.createElement("thead").appendChild(headerEl));
		}

		function generateHeaders(headers) {

			var headerHolderEl = document.createElement("thead");

			headers.forEach(function (columns) {
				var headerEl = document.createElement("tr");

				columns.forEach(function (column) {
					var columnEl = document.createElement("th");

					if (column.width > 1) {
						columnEl.colSpan = column.width;
					}

					if (column.height > 1) {
						columnEl.rowSpan = column.height;
					}

					columnEl.innerHTML = column.title;

					self.mapElementStyles(column.element, columnEl, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

					headerEl.appendChild(columnEl);
				});

				self.mapElementStyles(self.table.columnManager.getHeadersElement(), headerEl, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

				headerHolderEl.appendChild(headerEl);
			});

			self.htmlElement.appendChild(headerHolderEl);
		}

		function parseColumnGroup(column, level) {

			if (typeof headers[level] === "undefined") {
				headers[level] = [];
			}

			headers[level].push({
				title: column.title,
				width: column.width,
				height: 1,
				children: !!column.subGroups,
				element: column.column.getElement()
			});

			if (column.subGroups) {
				column.subGroups.forEach(function (subGroup) {
					parseColumnGroup(subGroup, level + 1);
				});
			}
		}

		function padVerticalColumnheaders() {
			headers.forEach(function (row, index) {
				row.forEach(function (header) {
					if (!header.children) {
						header.height = headers.length - index;
					}
				});
			});
		}

		function addCalcRow(calcs, selector, pos) {
			var calcData = calcs[selector];

			if (calcData) {
				if (pos) {
					calcData = calcData[pos];
				}

				if (Object.keys(calcData).length) {
					// calcRowIndexs.push(body.length);
					processRows([calcData]);
				}
			}
		}

		//create headers if needed
		if (config.columnHeaders) {
			if (config.columnHeaders == "groups") {
				columns.forEach(function (column) {
					parseColumnGroup(column, 0);
				});

				padVerticalColumnheaders();
				generateHeaders(headers);
			} else {
				generateSimpleHeaders();
			}
		}

		columns = this.table.columnManager.columnsByIndex;

		//create table body
		body = document.createElement("tbody");

		//lookup row styles
		if (window.getComputedStyle) {
			oddRow = this.table.element.querySelector(".tabulator-row-odd:not(.tabulator-group):not(.tabulator-calcs)");
			evenRow = this.table.element.querySelector(".tabulator-row-even:not(.tabulator-group):not(.tabulator-calcs)");
			calcRow = this.table.element.querySelector(".tabulator-row.tabulator-calcs");
			firstRow = this.table.element.querySelector(".tabulator-row:not(.tabulator-group):not(.tabulator-calcs)");
			firstGroup = this.table.element.getElementsByClassName("tabulator-group")[0];

			if (firstRow) {
				styleCells = firstRow.getElementsByClassName("tabulator-cell");
				firstCell = styleCells[0];
				lastCell = styleCells[styleCells.length - 1];
			}
		}

		function processRows(rowArray) {
			//add rows to table
			rowArray.forEach(function (row, i) {
				var rowEl = document.createElement("tr"),
				    styleRow = firstRow,
				    isCalc = false,
				    rowData;

				if (row instanceof RowComponent) {
					rowData = row.getData("clipboard");
				} else {
					rowData = row;
					isCalc = true;
				}

				columns.forEach(function (column, j) {
					var cellEl = document.createElement("td"),
					    value = column.getFieldValue(rowData);

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

					cellEl.innerHTML = value;

					if (column.definition.align) {
						cellEl.style.textAlign = column.definition.align;
					}

					if (j < columns.length - 1) {
						if (firstCell) {
							self.mapElementStyles(firstCell, cellEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size"]);
						}
					} else {
						if (firstCell) {
							self.mapElementStyles(firstCell, cellEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size"]);
						}
					}

					rowEl.appendChild(cellEl);
				});

				if (isCalc) {
					styleRow = calcRow;
				} else {
					if (!(i % 2) && oddRow) {
						styleRow = oddRow;
					}

					if (i % 2 && evenRow) {
						styleRow = evenRow;
					}
				}

				if (styleRow) {
					self.mapElementStyles(styleRow, rowEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]);
				}

				body.appendChild(rowEl);
			});
		}

		function processGroup(group, calcObj) {
			var groupEl = document.createElement("tr"),
			    groupCellEl = document.createElement("td");

			groupCellEl.colSpan = columns.length;

			groupCellEl.innerHTML = group.key;

			groupEl.appendChild(groupCellEl);
			body.appendChild(groupEl);

			self.mapElementStyles(firstGroup, groupEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]);

			if (group.subGroups) {
				group.subGroups.forEach(function (subGroup) {
					processGroup(subGroup, calcObj[group.key] ? calcObj[group.key].groups || {} : {});
				});
			} else {
				if (config.columnCalcs) {
					addCalcRow(calcObj, group.key, "top");
				}

				processRows(group.rows);

				if (config.columnCalcs) {
					addCalcRow(calcObj, group.key, "bottom");
				}
			}
		}

		if (config.rowGroups) {
			rows.forEach(function (group) {
				processGroup(group, calcs || {});
			});
		} else {
			if (config.columnCalcs) {
				addCalcRow(calcs, "top");
			}

			processRows(rows);

			if (config.columnCalcs) {
				addCalcRow(calcs, "bottom");
			}
		}

		this.htmlElement.appendChild(body);
	};

	Clipboard.prototype.mapElementStyles = function (from, to, props) {

		var lookup = {
			"background-color": "backgroundColor",
			"color": "fontColor",
			"font-weight": "fontWeight",
			"font-family": "fontFamily",
			"font-size": "fontSize",
			"border-top": "borderTop",
			"border-left": "borderLeft",
			"border-right": "borderRight",
			"border-bottom": "borderBottom"
		};

		if (window.getComputedStyle) {
			var fromStyle = window.getComputedStyle(from);

			props.forEach(function (prop) {
				to.style[lookup[prop]] = fromStyle.getPropertyValue(prop);
			});
		}

		// return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
	};

	Clipboard.prototype.copySelectors = {
		userSelection: function userSelection(config, params) {
			return params;
		},
		selected: function selected(config, params) {
			var rows = [];

			if (this.table.modExists("selectRow", true)) {
				rows = this.table.modules.selectRow.getSelectedRows();
			}

			if (config.rowGroups) {
				console.warn("Clipboard Warning - select coptSelector does not support row groups");
			}

			return this.buildOutput(rows, config, params);
		},
		table: function table(config, params) {
			if (config.rowGroups) {
				console.warn("Clipboard Warning - table coptSelector does not support row groups");
			}

			return this.buildOutput(this.table.rowManager.getComponents(), config, params);
		},
		active: function active(config, params) {
			var rows;

			if (config.rowGroups) {
				rows = this.buildComplexRows(config);
			} else {
				rows = this.table.rowManager.getComponents(true);
			}

			return this.buildOutput(rows, config, params);
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
						return value && column.definition.title && value.trim() && column.definition.title.trim() === value.trim();
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
							return value && column.field && value.trim() && column.field.trim() === value.trim();
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

	Tabulator.prototype.registerModule("clipboard", Clipboard);

	var DataTree = function DataTree(table) {
		this.table = table;
		this.indent = 10;
		this.field = "";
		this.collapseEl = null;
		this.expandEl = null;
		this.branchEl = null;
		this.elementField = false;

		this.startOpen = function () {};

		this.displayIndex = 0;
	};

	DataTree.prototype.initialize = function () {
		var dummyEl = null,
		    firstCol = this.table.columnManager.getFirstVisibileColumn(),
		    options = this.table.options;

		this.field = options.dataTreeChildField;
		this.indent = options.dataTreeChildIndent;
		this.elementField = options.dataTreeElementColumn || (firstCol ? firstCol.field : false);

		if (options.dataTreeBranchElement) {

			if (options.dataTreeBranchElement === true) {
				this.branchEl = document.createElement("div");
				this.branchEl.classList.add("tabulator-data-tree-branch");
			} else {
				if (typeof options.dataTreeBranchElement === "string") {
					dummyEl = document.createElement("div");
					dummyEl.innerHTML = options.dataTreeBranchElement;
					this.branchEl = dummyEl.firstChild;
				} else {
					this.branchEl = options.dataTreeBranchElement;
				}
			}
		}

		if (options.dataTreeCollapseElement) {
			if (typeof options.dataTreeCollapseElement === "string") {
				dummyEl = document.createElement("div");
				dummyEl.innerHTML = options.dataTreeCollapseElement;
				this.collapseEl = dummyEl.firstChild;
			} else {
				this.collapseEl = options.dataTreeCollapseElement;
			}
		} else {
			this.collapseEl = document.createElement("div");
			this.collapseEl.classList.add("tabulator-data-tree-control");
			this.collapseEl.innerHTML = "<div class='tabulator-data-tree-control-collapse'></div>";
		}

		if (options.dataTreeExpandElement) {
			if (typeof options.dataTreeExpandElement === "string") {
				dummyEl = document.createElement("div");
				dummyEl.innerHTML = options.dataTreeExpandElement;
				this.expandEl = dummyEl.firstChild;
			} else {
				this.expandEl = options.dataTreeExpandElement;
			}
		} else {
			this.expandEl = document.createElement("div");
			this.expandEl.classList.add("tabulator-data-tree-control");
			this.expandEl.innerHTML = "<div class='tabulator-data-tree-control-expand'></div>";
		}

		switch (_typeof(options.dataTreeStartExpanded)) {
			case "boolean":
				this.startOpen = function (row, index) {
					return options.dataTreeStartExpanded;
				};
				break;

			case "function":
				this.startOpen = options.dataTreeStartExpanded;
				break;

			default:
				this.startOpen = function (row, index) {
					return options.dataTreeStartExpanded[index];
				};
				break;
		}
	};

	DataTree.prototype.initializeRow = function (row) {
		var childArray = row.getData()[this.field];
		var isArray = Array.isArray(childArray);

		var children = isArray || !isArray && (typeof childArray === 'undefined' ? 'undefined' : _typeof(childArray)) === "object" && childArray !== null;

		row.modules.dataTree = {
			index: 0,
			open: children ? this.startOpen(row.getComponent(), 0) : false,
			controlEl: false,
			branchEl: false,
			parent: false,
			children: children
		};
	};

	DataTree.prototype.layoutRow = function (row) {
		var cell = this.elementField ? row.getCell(this.elementField) : row.getCells()[0],
		    el = cell.getElement(),
		    config = row.modules.dataTree;

		if (config.branchEl) {
			config.branchEl.parentNode.removeChild(config.branchEl);
		}

		this.generateControlElement(row, el);

		if (config.index) {
			if (this.branchEl) {
				config.branchEl = this.branchEl.cloneNode(true);
				el.insertBefore(config.branchEl, el.firstChild);
				config.branchEl.style.marginLeft = (config.branchEl.offsetWidth + config.branchEl.style.marginRight) * (config.index - 1) + config.index * this.indent + "px";
			} else {
				el.style.paddingLeft = parseInt(window.getComputedStyle(el, null).getPropertyValue('padding-left')) + config.index * this.indent + "px";
			}
		}
	};

	DataTree.prototype.generateControlElement = function (row, el) {
		var _this28 = this;

		var config = row.modules.dataTree,
		    el = el || row.getCells()[0].getElement(),
		    oldControl = config.controlEl;

		if (config.children !== false) {

			if (config.open) {
				config.controlEl = this.collapseEl.cloneNode(true);
				config.controlEl.addEventListener("click", function (e) {
					e.stopPropagation();
					_this28.collapseRow(row);
				});
			} else {
				config.controlEl = this.expandEl.cloneNode(true);
				config.controlEl.addEventListener("click", function (e) {
					e.stopPropagation();
					_this28.expandRow(row);
				});
			}

			config.controlEl.addEventListener("mousedown", function (e) {
				e.stopPropagation();
			});

			if (oldControl && oldControl.parentNode === el) {
				oldControl.parentNode.replaceChild(config.controlEl, oldControl);
			} else {
				el.insertBefore(config.controlEl, el.firstChild);
			}
		}
	};

	DataTree.prototype.setDisplayIndex = function (index) {
		this.displayIndex = index;
	};

	DataTree.prototype.getDisplayIndex = function () {
		return this.displayIndex;
	};

	DataTree.prototype.getRows = function (rows) {
		var _this29 = this;

		var output = [];

		rows.forEach(function (row, i) {
			var config, children;

			output.push(row);

			if (row instanceof Row) {

				config = row.modules.dataTree.children;

				if (!config.index && config.children !== false) {
					children = _this29.getChildren(row);

					children.forEach(function (child) {
						output.push(child);
					});
				}
			}
		});

		return output;
	};

	DataTree.prototype.getChildren = function (row) {
		var _this30 = this;

		var config = row.modules.dataTree,
		    children = [],
		    output = [];

		if (config.children !== false && config.open) {
			if (!Array.isArray(config.children)) {
				config.children = this.generateChildren(row);
			}

			if (this.table.modExists("filter")) {
				children = this.table.modules.filter.filter(config.children);
			} else {
				children = config.children;
			}

			if (this.table.modExists("sort")) {
				this.table.modules.sort.sort(children);
			}

			children.forEach(function (child) {
				output.push(child);

				var subChildren = _this30.getChildren(child);

				subChildren.forEach(function (sub) {
					output.push(sub);
				});
			});
		}

		return output;
	};

	DataTree.prototype.generateChildren = function (row) {
		var _this31 = this;

		var children = [];

		var childArray = row.getData()[this.field];

		if (!Array.isArray(childArray)) {
			childArray = [childArray];
		}

		childArray.forEach(function (childData) {
			var childRow = new Row(childData || {}, _this31.table.rowManager);
			childRow.modules.dataTree.index = row.modules.dataTree.index + 1;
			childRow.modules.dataTree.parent = row;
			if (childRow.modules.dataTree.children) {
				childRow.modules.dataTree.open = _this31.startOpen(childRow.getComponent(), childRow.modules.dataTree.index);
			}
			children.push(childRow);
		});

		return children;
	};

	DataTree.prototype.expandRow = function (row, silent) {
		var config = row.modules.dataTree;

		if (config.children !== false) {
			config.open = true;

			row.reinitialize();

			this.table.rowManager.refreshActiveData("tree", false, true);

			this.table.options.dataTreeRowExpanded(row.getComponent(), row.modules.dataTree.index);
		}
	};

	DataTree.prototype.collapseRow = function (row) {
		var config = row.modules.dataTree;

		if (config.children !== false) {
			config.open = false;

			row.reinitialize();

			this.table.rowManager.refreshActiveData("tree", false, true);

			this.table.options.dataTreeRowCollapsed(row.getComponent(), row.modules.dataTree.index);
		}
	};

	DataTree.prototype.toggleRow = function (row) {
		var config = row.modules.dataTree;

		if (config.children !== false) {
			if (config.open) {
				this.collapseRow(row);
			} else {
				this.expandRow(row);
			}
		}
	};

	DataTree.prototype.getTreeParent = function (row) {
		return row.modules.dataTree.parent ? row.modules.dataTree.parent.getComponent() : false;
	};

	DataTree.prototype.getTreeChildren = function (row) {
		var config = row.modules.dataTree,
		    output = [];

		if (config.children) {

			if (!Array.isArray(config.children)) {
				config.children = this.generateChildren(row);
			}

			config.children.forEach(function (childRow) {
				if (childRow instanceof Row) {
					output.push(childRow.getComponent());
				}
			});
		}

		return output;
	};

	DataTree.prototype.checkForRestyle = function (cell) {
		if (!cell.row.cells.indexOf(cell)) {
			if (cell.row.modules.dataTree.children !== false) {
				cell.row.reinitialize();
			}
		}
	};

	DataTree.prototype.getChildField = function () {
		return this.field;
	};

	Tabulator.prototype.registerModule("dataTree", DataTree);
	var Download = function Download(table) {
		this.table = table; //hold Tabulator object
		this.fields = {}; //hold filed multi dimension arrays
		this.columnsByIndex = []; //hold columns in their order in the table
		this.columnsByField = {}; //hold columns with lookup by field name
		this.config = {};
	};

	//trigger file download
	Download.prototype.download = function (type, filename, options, interceptCallback) {
		var self = this,
		    downloadFunc = false;
		this.processConfig();

		function buildLink(data, mime) {
			if (interceptCallback) {
				if (interceptCallback === true) {
					self.triggerDownload(data, mime, type, filename, true);
				} else {
					interceptCallback(data);
				}
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
			downloadFunc.call(this, self.processDefinitions(), self.processData(), options || {}, buildLink, this.config);
		}
	};

	Download.prototype.processConfig = function () {
		var config = { //download config
			columnGroups: true,
			rowGroups: true,
			columnCalcs: true
		};

		if (this.table.options.downloadConfig) {
			for (var key in this.table.options.downloadConfig) {
				config[key] = this.table.options.downloadConfig[key];
			}
		}

		if (config.rowGroups && this.table.options.groupBy && this.table.modExists("groupRows")) {
			this.config.rowGroups = true;
		}

		if (config.columnGroups && this.table.columnManager.columns.length != this.table.columnManager.columnsByIndex.length) {
			this.config.columnGroups = true;
		}

		if (config.columnCalcs && this.table.modExists("columnCalcs")) {
			this.config.columnCalcs = true;
		}
	};

	Download.prototype.processColumns = function () {
		var self = this;

		self.columnsByIndex = [];
		self.columnsByField = {};

		self.table.columnManager.columnsByIndex.forEach(function (column) {

			if (column.field && column.definition.download !== false && (column.visible || !column.visible && column.definition.download)) {
				self.columnsByIndex.push(column);
				self.columnsByField[column.field] = column;
			}
		});
	};

	Download.prototype.processDefinitions = function () {
		var self = this,
		    processedDefinitions = [];

		if (this.config.columnGroups) {
			self.table.columnManager.columns.forEach(function (column) {
				var colData = self.processColumnGroup(column);

				if (colData) {
					processedDefinitions.push(colData);
				}
			});
		} else {
			self.columnsByIndex.forEach(function (column) {
				if (column.download !== false) {
					//isolate definiton from defintion object
					processedDefinitions.push(self.processDefinition(column));
				}
			});
		}

		return processedDefinitions;
	};

	Download.prototype.processColumnGroup = function (column) {
		var _this32 = this;

		var subGroups = column.columns,
		    maxDepth = 0;

		var groupData = {
			type: "group",
			title: column.definition.title,
			depth: 1
		};

		if (subGroups.length) {
			groupData.subGroups = [];
			groupData.width = 0;

			subGroups.forEach(function (subGroup) {
				var subGroupData = _this32.processColumnGroup(subGroup);

				if (subGroupData.depth > maxDepth) {
					maxDepth = subGroupData.depth;
				}

				if (subGroupData) {
					groupData.width += subGroupData.width;
					groupData.subGroups.push(subGroupData);
				}
			});

			groupData.depth += maxDepth;

			if (!groupData.width) {
				return false;
			}
		} else {
			if (column.field && column.definition.download !== false && (column.visible || !column.visible && column.definition.download)) {
				groupData.width = 1;
				groupData.definition = this.processDefinition(column);
			} else {
				return false;
			}
		}

		return groupData;
	};

	Download.prototype.processDefinition = function (column) {
		var def = {};

		for (var key in column.definition) {
			def[key] = column.definition[key];
		}

		if (typeof column.definition.downloadTitle != "undefined") {
			def.title = column.definition.downloadTitle;
		}

		return def;
	};

	Download.prototype.processData = function () {
		var _this33 = this;

		var self = this,
		    data = [],
		    groups = [],
		    calcs = {};

		if (this.config.rowGroups) {
			groups = this.table.modules.groupRows.getGroups();

			groups.forEach(function (group) {
				data.push(_this33.processGroupData(group));
			});
		} else {
			data = self.table.rowManager.getData(true, "download");
		}

		if (this.config.columnCalcs) {
			calcs = this.table.getCalcResults();

			data = {
				calcs: calcs,
				data: data
			};
		}

		//bulk data processing
		if (typeof self.table.options.downloadDataFormatter == "function") {
			data = self.table.options.downloadDataFormatter(data);
		}

		return data;
	};

	Download.prototype.processGroupData = function (group) {
		var _this34 = this;

		var subGroups = group.getSubGroups();

		var groupData = {
			type: "group",
			key: group.key
		};

		if (subGroups.length) {
			groupData.subGroups = [];

			subGroups.forEach(function (subGroup) {
				groupData.subGroups.push(_this34.processGroupData(subGroup));
			});
		} else {
			groupData.rows = group.getData(true, "download");
		}

		return groupData;
	};

	Download.prototype.triggerDownload = function (data, mime, type, filename, newTab) {
		var element = document.createElement('a'),
		    blob = new Blob([data], { type: mime }),
		    filename = filename || "Tabulator." + (typeof type === "function" ? "txt" : type);

		blob = this.table.options.downloadReady.call(this.table, data, blob);

		if (blob) {

			if (newTab) {
				window.open(window.URL.createObjectURL(blob));
			} else {
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
		csv: function csv(columns, data, options, setFileContents, config) {
			var self = this,
			    titles = [],
			    fields = [],
			    delimiter = options && options.delimiter ? options.delimiter : ",",
			    fileContents,
			    output;

			//build column headers
			function parseSimpleTitles() {
				columns.forEach(function (column) {
					titles.push('"' + String(column.title).split('"').join('""') + '"');
					fields.push(column.field);
				});
			}

			function parseColumnGroup(column, level) {
				if (column.subGroups) {
					column.subGroups.forEach(function (subGroup) {
						parseColumnGroup(subGroup, level + 1);
					});
				} else {
					titles.push('"' + String(column.title).split('"').join('""') + '"');
					fields.push(column.definition.field);
				}
			}

			if (config.columnGroups) {
				console.warn("Download Warning - CSV downloader cannot process column groups");

				columns.forEach(function (column) {
					parseColumnGroup(column, 0);
				});
			} else {
				parseSimpleTitles();
			}

			//generate header row
			fileContents = [titles.join(delimiter)];

			function parseRows(data) {
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

						//escape quotation marks
						rowData.push('"' + String(value).split('"').join('""') + '"');
					});

					fileContents.push(rowData.join(delimiter));
				});
			}

			function parseGroup(group) {
				if (group.subGroups) {
					group.subGroups.forEach(function (subGroup) {
						parseGroup(subGroup);
					});
				} else {
					parseRows(group.rows);
				}
			}

			if (config.columnCalcs) {
				console.warn("Download Warning - CSV downloader cannot process column calculations");
				data = data.data;
			}

			if (config.rowGroups) {
				console.warn("Download Warning - CSV downloader cannot process row groups");

				data.forEach(function (group) {
					parseGroup(group);
				});
			} else {
				parseRows(data);
			}

			output = fileContents.join("\n");

			if (options.bom) {
				output = '\uFEFF' + output;
			}

			setFileContents(output, "text/csv");
		},

		json: function json(columns, data, options, setFileContents, config) {
			var fileContents;

			if (config.columnCalcs) {
				console.warn("Download Warning - CSV downloader cannot process column calculations");
				data = data.data;
			}

			fileContents = JSON.stringify(data, null, '\t');

			setFileContents(fileContents, "application/json");
		},

		pdf: function pdf(columns, data, options, setFileContents, config) {
			var self = this,
			    fields = [],
			    header = [],
			    body = [],
			    calcs = {},
			    headerDepth = 1,
			    table = "",
			    autoTableParams = {},
			    rowGroupStyles = options.rowGroupStyles || {
				fontStyle: "bold",
				fontSize: 12,
				cellPadding: 6,
				fillColor: 220
			},
			    rowCalcStyles = options.rowCalcStyles || {
				fontStyle: "bold",
				fontSize: 10,
				cellPadding: 4,
				fillColor: 232
			},
			    jsPDFParams = options.jsPDF || {},
			    title = options && options.title ? options.title : "";

			if (config.columnCalcs) {
				calcs = data.calcs;
				data = data.data;
			}

			if (!jsPDFParams.orientation) {
				jsPDFParams.orientation = options.orientation || "landscape";
			}

			if (!jsPDFParams.unit) {
				jsPDFParams.unit = "pt";
			}

			//build column headers
			function parseSimpleTitles() {
				columns.forEach(function (column) {
					if (column.field) {
						header.push(column.title || "");
						fields.push(column.field);
					}
				});

				header = [header];
			}

			function parseColumnGroup(column, level) {
				var colSpan = column.width,
				    rowSpan = 1,
				    col = {
					content: column.title || ""
				};

				if (column.subGroups) {
					column.subGroups.forEach(function (subGroup) {
						parseColumnGroup(subGroup, level + 1);
					});
					rowSpan = 1;
				} else {
					fields.push(column.definition.field);
					rowSpan = headerDepth - level;
				}

				col.rowSpan = rowSpan;
				// col.colSpan = colSpan;

				header[level].push(col);

				colSpan--;

				if (rowSpan > 1) {
					for (var i = level + 1; i < headerDepth; i++) {
						header[i].push("");
					}
				}

				for (var i = 0; i < colSpan; i++) {
					header[level].push("");
				}
			}

			if (config.columnGroups) {
				columns.forEach(function (column) {
					if (column.depth > headerDepth) {
						headerDepth = column.depth;
					}
				});

				for (var i = 0; i < headerDepth; i++) {
					header.push([]);
				}

				columns.forEach(function (column) {
					parseColumnGroup(column, 0);
				});
			} else {
				parseSimpleTitles();
			}

			function parseValue(value) {
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

				return value;
			}

			function parseRows(data) {
				//build table rows
				data.forEach(function (row) {
					body.push(parseRow(row));
				});
			}

			function parseRow(row, styles) {
				var rowData = [];

				fields.forEach(function (field) {
					var value = self.getFieldValue(field, row);
					value = parseValue(value);

					if (styles) {
						rowData.push({
							content: value,
							styles: styles
						});
					} else {
						rowData.push(value);
					}
				});

				return rowData;
			}

			function parseGroup(group, calcObj) {
				var groupData = [];

				groupData.push({ content: parseValue(group.key), colSpan: fields.length, styles: rowGroupStyles });

				body.push(groupData);

				if (group.subGroups) {
					group.subGroups.forEach(function (subGroup) {
						parseGroup(subGroup, calcObj[group.key] ? calcObj[group.key].groups || {} : {});
					});
				} else {

					if (config.columnCalcs) {
						addCalcRow(calcObj, group.key, "top");
					}

					parseRows(group.rows);

					if (config.columnCalcs) {
						addCalcRow(calcObj, group.key, "bottom");
					}
				}
			}

			function addCalcRow(calcs, selector, pos) {
				var calcData = calcs[selector];

				if (calcData) {
					if (pos) {
						calcData = calcData[pos];
					}

					if (Object.keys(calcData).length) {
						body.push(parseRow(calcData, rowCalcStyles));
					}
				}
			}

			if (config.rowGroups) {
				data.forEach(function (group) {
					parseGroup(group, calcs);
				});
			} else {
				if (config.columnCalcs) {
					addCalcRow(calcs, "top");
				}

				parseRows(data);

				if (config.columnCalcs) {
					addCalcRow(calcs, "bottom");
				}
			}

			var doc = new jsPDF(jsPDFParams); //set document to landscape, better for most tables

			if (options && options.autoTable) {
				if (typeof options.autoTable === "function") {
					autoTableParams = options.autoTable(doc) || {};
				} else {
					autoTableParams = options.autoTable;
				}
			}

			if (title) {
				autoTableParams.addPageContent = function (data) {
					doc.text(title, 40, 30);
				};
			}

			autoTableParams.head = header;
			autoTableParams.body = body;

			doc.autoTable(autoTableParams);

			setFileContents(doc.output("arraybuffer"), "application/pdf");
		},

		xlsx: function xlsx(columns, data, options, setFileContents, config) {
			var self = this,
			    sheetName = options.sheetName || "Sheet1",
			    workbook = { SheetNames: [], Sheets: {} },
			    calcs = {},
			    groupRowIndexs = [],
			    groupColumnIndexs = [],
			    calcRowIndexs = [],
			    output;

			if (config.columnCalcs) {
				calcs = data.calcs;
				data = data.data;
			}

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

					var merges = generateMerges();

					if (merges.length) {
						sheet["!merges"] = merges;
					}

					return sheet;
				}

				function parseSimpleTitles() {
					//get field lists
					columns.forEach(function (column) {
						titles.push(column.title);
						fields.push(column.field);
					});

					rows.push(titles);
				}

				function parseColumnGroup(column, level) {

					if (typeof titles[level] === "undefined") {
						titles[level] = [];
					}

					if (typeof groupColumnIndexs[level] === "undefined") {
						groupColumnIndexs[level] = [];
					}

					if (column.width > 1) {

						groupColumnIndexs[level].push({
							type: "hoz",
							start: titles[level].length,
							end: titles[level].length + column.width - 1
						});
					}

					titles[level].push(column.title);

					if (column.subGroups) {
						column.subGroups.forEach(function (subGroup) {
							parseColumnGroup(subGroup, level + 1);
						});
					} else {
						fields.push(column.definition.field);
						padColumnTitles(fields.length - 1, level);

						groupColumnIndexs[level].push({
							type: "vert",
							start: fields.length - 1
						});
					}
				}

				function padColumnTitles() {
					var max = 0;

					titles.forEach(function (title) {
						var len = title.length;
						if (len > max) {
							max = len;
						}
					});

					titles.forEach(function (title) {
						var len = title.length;
						if (len < max) {
							for (var i = len; i < max; i++) {
								title.push("");
							}
						}
					});
				}

				if (config.columnGroups) {
					columns.forEach(function (column) {
						parseColumnGroup(column, 0);
					});

					titles.forEach(function (title) {
						rows.push(title);
					});
				} else {
					parseSimpleTitles();
				}

				function generateMerges() {
					var output = [];

					groupRowIndexs.forEach(function (index) {
						output.push({ s: { r: index, c: 0 }, e: { r: index, c: fields.length - 1 } });
					});

					groupColumnIndexs.forEach(function (merges, level) {
						merges.forEach(function (merge) {
							if (merge.type === "hoz") {
								output.push({ s: { r: level, c: merge.start }, e: { r: level, c: merge.end } });
							} else {
								if (level != titles.length - 1) {
									output.push({ s: { r: level, c: merge.start }, e: { r: titles.length - 1, c: merge.start } });
								}
							}
						});
					});

					return output;
				}

				//generate each row of the table
				function parseRows(data) {
					data.forEach(function (row) {
						rows.push(parseRow(row));
					});
				}

				function parseRow(row) {
					var rowData = [];

					fields.forEach(function (field) {
						var value = self.getFieldValue(field, row);
						rowData.push(!(value instanceof Date) && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object" ? JSON.stringify(value) : value);
					});

					return rowData;
				}

				function addCalcRow(calcs, selector, pos) {
					var calcData = calcs[selector];

					if (calcData) {
						if (pos) {
							calcData = calcData[pos];
						}

						if (Object.keys(calcData).length) {
							calcRowIndexs.push(rows.length);
							rows.push(parseRow(calcData));
						}
					}
				}

				function parseGroup(group, calcObj) {
					var groupData = [];

					groupData.push(group.key);

					groupRowIndexs.push(rows.length);

					rows.push(groupData);

					if (group.subGroups) {
						group.subGroups.forEach(function (subGroup) {
							parseGroup(subGroup, calcObj[group.key] ? calcObj[group.key].groups || {} : {});
						});
					} else {

						if (config.columnCalcs) {
							addCalcRow(calcObj, group.key, "top");
						}

						parseRows(group.rows);

						if (config.columnCalcs) {
							addCalcRow(calcObj, group.key, "bottom");
						}
					}
				}

				if (config.rowGroups) {
					data.forEach(function (group) {
						parseGroup(group, calcs);
					});
				} else {
					if (config.columnCalcs) {
						addCalcRow(calcs, "top");
					}

					parseRows(data);

					if (config.columnCalcs) {
						addCalcRow(calcs, "bottom");
					}
				}

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

						this.table.modules.comms.send(options.sheets[sheet], "download", "intercept", {
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

	Tabulator.prototype.registerModule("download", Download);

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

				if (column.definition.editor === "tick") {
					column.definition.editor = "tickCross";
					console.warn("DEPRECATION WANRING - the tick editor has been depricated, please use the tickCross editor");
				}

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

						if (column.definition.formatter === "tick") {
							column.definition.formatter = "tickCross";
							console.warn("DEPRECATION WANRING - the tick editor has been depricated, please use the tickCross editor");
						}

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
			column.modules.edit = config;
		}
	};

	Edit.prototype.getCurrentCell = function () {
		return this.currentCell ? this.currentCell.getComponent() : false;
	};

	Edit.prototype.clearEditor = function () {
		var cell = this.currentCell,
		    cellEl;

		this.invalidEdit = false;

		if (cell) {
			this.currentCell = false;

			cellEl = cell.getElement();
			cellEl.classList.remove("tabulator-validation-fail");
			cellEl.classList.remove("tabulator-editing");
			while (cellEl.firstChild) {
				cellEl.removeChild(cellEl.firstChild);
			}cell.row.getElement().classList.remove("tabulator-row-editing");
		}
	};

	Edit.prototype.cancelEdit = function () {

		if (this.currentCell) {
			var cell = this.currentCell;
			var component = this.currentCell.getComponent();

			this.clearEditor();
			cell.setValueActual(cell.getValue());

			if (cell.column.cellEvents.cellEditCancelled) {
				cell.column.cellEvents.cellEditCancelled.call(this.table, component);
			}

			this.table.options.cellEditCancelled.call(this.table, component);
		}
	};

	//return a formatted value for a cell
	Edit.prototype.bindEditor = function (cell) {
		var self = this,
		    element = cell.getElement();

		element.setAttribute("tabindex", 0);

		element.addEventListener("click", function (e) {
			if (!element.classList.contains("tabulator-editing")) {
				element.focus();
			}
		});

		element.addEventListener("mousedown", function (e) {
			self.mouseClick = true;
		});

		element.addEventListener("focus", function (e) {
			if (!self.recursionBlock) {
				self.edit(cell, e, false);
			}
		});
	};

	Edit.prototype.focusCellNoEvent = function (cell) {
		this.recursionBlock = true;
		if (this.table.browser !== "ie") {
			cell.getElement().focus();
		}
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
		    component,
		    params;

		//prevent editing if another cell is refusing to leave focus (eg. validation fail)
		if (this.currentCell) {
			if (!this.invalidEdit) {
				this.cancelEdit();
			}
			return;
		}

		//handle successfull value change
		function success(value) {

			if (self.currentCell === cell) {
				var valid = true;

				if (cell.column.modules.validate && self.table.modExists("validate")) {
					valid = self.table.modules.validate.validate(cell.column.modules.validate, cell.getComponent(), value);
				}

				if (valid === true) {
					self.clearEditor();
					cell.setValue(value, true);

					if (self.table.options.dataTree && self.table.modExists("dataTree")) {
						self.table.modules.dataTree.checkForRestyle(cell);
					}
				} else {
					self.invalidEdit = true;
					element.classList.add("tabulator-validation-fail");
					self.focusCellNoEvent(cell);
					rendered();
					self.table.options.validationFailed.call(self.table, cell.getComponent(), value, valid);
				}
			} else {
				// console.warn("Edit Success Error - cannot call success on a cell that is no longer being edited");
			}
		}

		//handle aborted edit
		function cancel() {
			if (self.currentCell === cell) {
				self.cancelEdit();

				if (self.table.options.dataTree && self.table.modExists("dataTree")) {
					self.table.modules.dataTree.checkForRestyle(cell);
				}
			} else {
				// console.warn("Edit Success Error - cannot call cancel on a cell that is no longer being edited");
			}
		}

		function onRendered(callback) {
			rendered = callback;
		}

		if (!cell.column.modules.edit.blocked) {
			if (e) {
				e.stopPropagation();
			}

			switch (_typeof(cell.column.modules.edit.check)) {
				case "function":
					allowEdit = cell.column.modules.edit.check(cell.getComponent());
					break;

				case "boolean":
					allowEdit = cell.column.modules.edit.check;
					break;
			}

			if (allowEdit || forceEdit) {

				self.cancelEdit();

				self.currentCell = cell;

				component = cell.getComponent();

				if (this.mouseClick) {
					this.mouseClick = false;

					if (cell.column.cellEvents.cellClick) {
						cell.column.cellEvents.cellClick.call(this.table, e, component);
					}
				}

				if (cell.column.cellEvents.cellEditing) {
					cell.column.cellEvents.cellEditing.call(this.table, component);
				}

				self.table.options.cellEditing.call(this.table, component);

				params = typeof cell.column.modules.edit.params === "function" ? cell.column.modules.edit.params(component) : cell.column.modules.edit.params;

				cellEditor = cell.column.modules.edit.editor.call(self, component, onRendered, success, cancel, params);

				//if editor returned, add to DOM, if false, abort edit
				if (cellEditor !== false) {

					if (cellEditor instanceof Node) {
						element.classList.add("tabulator-editing");
						cell.row.getElement().classList.add("tabulator-row-editing");
						while (element.firstChild) {
							element.removeChild(element.firstChild);
						}element.appendChild(cellEditor);

						//trigger onRendered Callback
						rendered();

						//prevent editing from triggering rowClick event
						var children = element.children;

						for (var i = 0; i < children.length; i++) {
							children[i].addEventListener("click", function (e) {
								e.stopPropagation();
							});
						}
					} else {
						console.warn("Edit Error - Editor should return an instance of Node, the editor returned:", cellEditor);
						element.blur();
						return false;
					}
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
			var cellValue = cell.getValue(),
			    input = document.createElement("input");

			input.setAttribute("type", "text");

			input.style.padding = "4px";
			input.style.width = "100%";
			input.style.boxSizing = "border-box";

			input.value = typeof cellValue !== "undefined" ? cellValue : "";

			onRendered(function () {
				input.focus();
				input.style.height = "100%";
			});

			function onChange(e) {
				if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value != cellValue) {
					success(input.value);
				} else {
					cancel();
				}
			}

			//submit new value on blur or change
			input.addEventListener("change", onChange);
			input.addEventListener("blur", onChange);

			//submit new value on enter
			input.addEventListener("keydown", function (e) {
				switch (e.keyCode) {
					case 13:
						success(input.value);
						break;

					case 27:
						cancel();
						break;
				}
			});

			return input;
		},

		//resizable text area element
		textarea: function textarea(cell, onRendered, success, cancel, editorParams) {
			var self = this,
			    cellValue = cell.getValue(),
			    value = String(cellValue !== null && cellValue !== "undefined" ? cellValue : ""),
			    count = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1,
			    input = document.createElement("textarea"),
			    scrollHeight = 0;

			//create and style input
			input.style.display = "block";
			input.style.padding = "2px";
			input.style.height = "100%";
			input.style.width = "100%";
			input.style.boxSizing = "border-box";
			input.style.whiteSpace = "pre-wrap";
			input.style.resize = "none";

			input.value = value;

			onRendered(function () {
				input.focus();
				input.style.height = "100%";
			});

			function onChange(e) {

				if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value != cellValue) {
					success(input.value);
					setTimeout(function () {
						cell.getRow().normalizeHeight();
					}, 300);
				} else {
					cancel();
				}
			}

			//submit new value on blur or change
			input.addEventListener("change", onChange);
			input.addEventListener("blur", onChange);

			input.addEventListener("keyup", function () {

				input.style.height = "";

				var heightNow = input.scrollHeight;

				input.style.height = heightNow + "px";

				if (heightNow != scrollHeight) {
					scrollHeight = heightNow;
					cell.getRow().normalizeHeight();
				}
			});

			input.addEventListener("keydown", function (e) {
				if (e.keyCode == 27) {
					cancel();
				}
			});

			return input;
		},

		//input element with type of number
		number: function number(cell, onRendered, success, cancel, editorParams) {

			var cellValue = cell.getValue(),
			    input = document.createElement("input");

			input.setAttribute("type", "number");

			if (typeof editorParams.max != "undefined") {
				input.setAttribute("max", editorParams.max);
			}

			if (typeof editorParams.min != "undefined") {
				input.setAttribute("min", editorParams.min);
			}

			if (typeof editorParams.step != "undefined") {
				input.setAttribute("step", editorParams.step);
			}

			//create and style input
			input.style.padding = "4px";
			input.style.width = "100%";
			input.style.boxSizing = "border-box";

			input.value = cellValue;

			onRendered(function () {
				input.focus();
				input.style.height = "100%";
			});

			function onChange() {
				var value = input.value;

				if (!isNaN(value) && value !== "") {
					value = Number(value);
				}

				if (value != cellValue) {
					success(value);
				} else {
					cancel();
				}
			}

			//submit new value on blur
			input.addEventListener("blur", function (e) {
				onChange();
			});

			//submit new value on enter
			input.addEventListener("keydown", function (e) {
				switch (e.keyCode) {
					case 13:
					case 9:
						onChange();
						break;

					case 27:
						cancel();
						break;
				}
			});

			return input;
		},

		//input element with type of number
		range: function range(cell, onRendered, success, cancel, editorParams) {

			var cellValue = cell.getValue(),
			    input = document.createElement("input");

			input.setAttribute("type", "range");

			if (typeof editorParams.max != "undefined") {
				input.setAttribute("max", editorParams.max);
			}

			if (typeof editorParams.min != "undefined") {
				input.setAttribute("min", editorParams.min);
			}

			if (typeof editorParams.step != "undefined") {
				input.setAttribute("step", editorParams.step);
			}

			//create and style input
			input.style.padding = "4px";
			input.style.width = "100%";
			input.style.boxSizing = "border-box";

			input.value = cellValue;

			onRendered(function () {
				input.focus();
				input.style.height = "100%";
			});

			function onChange() {
				var value = input.value;

				if (!isNaN(value) && value !== "") {
					value = Number(value);
				}

				if (value != cellValue) {
					success(value);
				} else {
					cancel();
				}
			}

			//submit new value on blur
			input.addEventListener("blur", function (e) {
				onChange();
			});

			//submit new value on enter
			input.addEventListener("keydown", function (e) {
				switch (e.keyCode) {
					case 13:
					case 9:
						onChange();
						break;

					case 27:
						cancel();
						break;
				}
			});

			return input;
		},

		//select
		select: function select(cell, onRendered, success, cancel, editorParams) {
			var self = this,
			    cellEl = cell.getElement(),
			    initialValue = cell.getValue(),
			    input = document.createElement("input"),
			    listEl = document.createElement("div"),
			    dataItems = [],
			    displayItems = [],
			    currentItem = {},
			    blurable = true;

			if (Array.isArray(editorParams) || !Array.isArray(editorParams) && (typeof editorParams === 'undefined' ? 'undefined' : _typeof(editorParams)) === "object" && !editorParams.values) {
				console.warn("DEPRECATION WANRING - values for the select editor must now be passed into the values property of the editorParams object, not as the editorParams object");
				editorParams = { values: editorParams };
			}

			function getUniqueColumnValues() {
				var output = {},
				    column = cell.getColumn()._getSelf(),
				    data = self.table.getData();

				data.forEach(function (row) {
					var val = column.getFieldValue(row);

					if (val !== null && typeof val !== "undefined" && val !== "") {
						output[val] = true;
					}
				});

				if (editorParams.sortValuesList) {
					if (editorParams.sortValuesList == "asc") {
						output = Object.keys(output).sort();
					} else {
						output = Object.keys(output).sort().reverse();
					}
				} else {
					output = Object.keys(output);
				}

				return output;
			}

			function parseItems(inputValues, curentValue) {
				var dataList = [];
				var displayList = [];

				function processComplexListItem(item) {
					var item = {
						label: editorParams.listItemFormatter ? editorParams.listItemFormatter(item.value, item.label) : item.label,
						value: item.value,
						element: false
					};

					if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
						setCurrentItem(item);
					}

					dataList.push(item);
					displayList.push(item);

					return item;
				}

				if (typeof inputValues == "function") {
					inputValues = inputValues(cell);
				}

				if (Array.isArray(inputValues)) {
					inputValues.forEach(function (value) {
						var item;

						if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object") {

							if (value.options) {
								item = {
									label: value.label,
									group: true,
									element: false
								};

								displayList.push(item);

								value.options.forEach(function (item) {
									processComplexListItem(item);
								});
							} else {
								processComplexListItem(value);
							}
						} else {

							item = {
								label: editorParams.listItemFormatter ? editorParams.listItemFormatter(value, value) : value,
								value: value,
								element: false
							};

							if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
								setCurrentItem(item);
							}

							dataList.push(item);
							displayList.push(item);
						}
					});
				} else {
					for (var key in inputValues) {
						var item = {
							label: editorParams.listItemFormatter ? editorParams.listItemFormatter(key, inputValues[key]) : inputValues[key],
							value: key,
							element: false
						};

						if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
							setCurrentItem(item);
						}

						dataList.push(item);
						displayList.push(item);
					}
				}

				dataItems = dataList;
				displayItems = displayList;

				fillList();
			}

			function fillList() {
				while (listEl.firstChild) {
					listEl.removeChild(listEl.firstChild);
				}displayItems.forEach(function (item) {
					var el = item.element;

					if (!el) {

						if (item.group) {
							el = document.createElement("div");
							el.classList.add("tabulator-edit-select-list-group");
							el.tabIndex = 0;
							el.innerHTML = item.label === "" ? "&nbsp;" : item.label;
						} else {
							el = document.createElement("div");
							el.classList.add("tabulator-edit-select-list-item");
							el.tabIndex = 0;
							el.innerHTML = item.label === "" ? "&nbsp;" : item.label;

							el.addEventListener("click", function () {
								setCurrentItem(item);
								chooseItem();
							});

							if (item === currentItem) {
								el.classList.add("active");
							}
						}

						el.addEventListener("mousedown", function () {
							blurable = false;

							setTimeout(function () {
								blurable = true;
							}, 10);
						});

						item.element = el;
					}

					listEl.appendChild(el);
				});
			}

			function setCurrentItem(item) {

				if (currentItem && currentItem.element) {
					currentItem.element.classList.remove("active");
				}

				currentItem = item;
				input.value = item.label === "&nbsp;" ? "" : item.label;

				if (item.element) {
					item.element.classList.add("active");
				}
			}

			function chooseItem() {
				hideList();

				if (initialValue !== currentItem.value) {
					initialValue = currentItem.value;
					success(currentItem.value);
				} else {
					cancel();
				}
			}

			function cancelItem() {
				hideList();
				cancel();
			}

			function showList() {
				if (!listEl.parentNode) {

					if (editorParams.values === true) {
						parseItems(getUniqueColumnValues(), initialValue);
					} else {
						parseItems(editorParams.values || [], initialValue);
					}

					var offset = Tabulator.prototype.helpers.elOffset(cellEl);

					listEl.style.minWidth = cellEl.offsetWidth + "px";

					listEl.style.top = offset.top + cellEl.offsetHeight + "px";
					listEl.style.left = offset.left + "px";
					document.body.appendChild(listEl);
				}
			}

			function hideList() {
				if (listEl.parentNode) {
					listEl.parentNode.removeChild(listEl);
				}
			}

			//style input
			input.setAttribute("type", "text");

			input.style.padding = "4px";
			input.style.width = "100%";
			input.style.boxSizing = "border-box";
			input.readOnly = true;

			input.value = typeof initialValue !== "undefined" ? initialValue : "";

			if (editorParams.values === true) {
				parseItems(getUniqueColumnValues(), initialValue);
			} else {
				parseItems(editorParams.values || [], initialValue);
			}

			//allow key based navigation
			input.addEventListener("keydown", function (e) {
				var index;

				switch (e.keyCode) {
					case 38:
						//up arrow
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();

						index = dataItems.indexOf(currentItem);

						if (index > 0) {
							setCurrentItem(dataItems[index - 1]);
						}
						break;

					case 40:
						//down arrow
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();

						index = dataItems.indexOf(currentItem);

						if (index < dataItems.length - 1) {
							if (index == -1) {
								setCurrentItem(dataItems[0]);
							} else {
								setCurrentItem(dataItems[index + 1]);
							}
						}
						break;

					case 37: //left arrow
					case 39:
						//right arrow
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();
						break;

					case 13:
						//enter
						chooseItem();
						break;

					case 27:
						//escape
						cancelItem();
						break;
				}
			});

			input.addEventListener("blur", function (e) {
				if (blurable) {
					cancelItem();
				}
			});

			input.addEventListener("focus", function (e) {
				showList();
			});

			//style list element
			listEl = document.createElement("div");
			listEl.classList.add("tabulator-edit-select-list");

			onRendered(function () {
				input.style.height = "100%";
				input.focus();
			});

			return input;
		},

		//autocomplete
		autocomplete: function autocomplete(cell, onRendered, success, cancel, editorParams) {
			var self = this,
			    cellEl = cell.getElement(),
			    initialValue = cell.getValue(),
			    input = document.createElement("input"),
			    listEl = document.createElement("div"),
			    allItems = [],
			    displayItems = [],
			    values = [],
			    currentItem = {},
			    blurable = true;

			function getUniqueColumnValues() {
				var output = {},
				    column = cell.getColumn()._getSelf(),
				    data = self.table.getData();

				data.forEach(function (row) {
					var val = column.getFieldValue(row);

					if (val !== null && typeof val !== "undefined" && val !== "") {
						output[val] = true;
					}
				});

				if (editorParams.sortValuesList) {
					if (editorParams.sortValuesList == "asc") {
						output = Object.keys(output).sort();
					} else {
						output = Object.keys(output).sort().reverse();
					}
				} else {
					output = Object.keys(output);
				}

				return output;
			}

			function parseItems(inputValues, curentValue) {
				var itemList = [];

				if (Array.isArray(inputValues)) {
					inputValues.forEach(function (value) {
						var item = {
							title: editorParams.listItemFormatter ? editorParams.listItemFormatter(value, value) : value,
							value: value,
							element: false
						};

						if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
							setCurrentItem(item);
						}

						itemList.push(item);
					});
				} else {
					for (var key in inputValues) {
						var item = {
							title: editorParams.listItemFormatter ? editorParams.listItemFormatter(key, inputValues[key]) : inputValues[key],
							value: key,
							element: false
						};

						if (item.value === curentValue || !isNaN(parseFloat(item.value)) && !isNaN(parseFloat(item.value)) && parseFloat(item.value) === parseFloat(curentValue)) {
							setCurrentItem(item);
						}

						itemList.push(item);
					}
				}

				if (editorParams.searchFunc) {
					itemList.forEach(function (item) {
						item.search = {
							title: item.title,
							value: item.value
						};
					});
				}

				allItems = itemList;
			}

			function filterList(term, intialLoad) {
				var matches = [],
				    searchObjs = [],
				    searchResults = [];

				if (editorParams.searchFunc) {

					allItems.forEach(function (item) {
						searchObjs.push(item.search);
					});

					searchResults = editorParams.searchFunc(term, searchObjs);

					searchResults.forEach(function (result) {
						var match = allItems.find(function (item) {
							return item.search === result;
						});

						if (match) {
							matches.push(match);
						}
					});
				} else {
					if (term === "") {

						if (editorParams.showListOnEmpty) {
							allItems.forEach(function (item) {
								matches.push(item);
							});
						}
					} else {
						allItems.forEach(function (item) {

							if (item.value !== null || typeof item.value !== "undefined") {
								if (String(item.value).toLowerCase().indexOf(String(term).toLowerCase()) > -1 || String(item.title).toLowerCase().indexOf(String(term).toLowerCase()) > -1) {
									matches.push(item);
								}
							}
						});
					}
				}

				displayItems = matches;

				fillList(intialLoad);
			}

			function fillList(intialLoad) {
				var current = false;

				while (listEl.firstChild) {
					listEl.removeChild(listEl.firstChild);
				}displayItems.forEach(function (item) {
					var el = item.element;

					if (!el) {
						el = document.createElement("div");
						el.classList.add("tabulator-edit-select-list-item");
						el.tabIndex = 0;
						el.innerHTML = item.title;

						el.addEventListener("click", function () {
							setCurrentItem(item);
							chooseItem();
						});

						el.addEventListener("mousedown", function () {
							blurable = false;

							setTimeout(function () {
								blurable = true;
							}, 10);
						});

						item.element = el;

						if (intialLoad && item.value == initialValue) {
							input.value = item.title;
							item.element.classList.add("active");
							current = true;
						}

						if (item === currentItem) {
							item.element.classList.add("active");
							current = true;
						}
					}

					listEl.appendChild(el);
				});

				if (!current) {
					setCurrentItem(false);
				}
			}

			function setCurrentItem(item, showInputValue) {
				if (currentItem && currentItem.element) {
					currentItem.element.classList.remove("active");
				}

				currentItem = item;

				if (item && item.element) {
					item.element.classList.add("active");
				}
			}

			function chooseItem() {
				hideList();

				if (currentItem) {
					if (initialValue !== currentItem.value) {
						initialValue = currentItem.value;
						input.value = currentItem.title;
						success(currentItem.value);
					} else {
						cancel();
					}
				} else {
					if (editorParams.freetext) {
						initialValue = input.value;
						success(input.value);
					} else {
						if (editorParams.allowEmpty && input.value === "") {
							initialValue = input.value;
							success(input.value);
						} else {
							cancel();
						}
					}
				}
			}

			function cancelItem() {
				hideList();
				cancel();
			}

			function showList() {
				if (!listEl.parentNode) {
					while (listEl.firstChild) {
						listEl.removeChild(listEl.firstChild);
					}if (editorParams.values === true) {
						values = getUniqueColumnValues();
					} else {
						values = editorParams.values || [];
					}

					parseItems(values, initialValue);

					var offset = Tabulator.prototype.helpers.elOffset(cellEl);

					listEl.style.minWidth = cellEl.offsetWidth + "px";

					listEl.style.top = offset.top + cellEl.offsetHeight + "px";
					listEl.style.left = offset.left + "px";
					document.body.appendChild(listEl);
				}
			}

			function hideList() {
				if (listEl.parentNode) {
					listEl.parentNode.removeChild(listEl);
				}
			}

			//style input
			input.setAttribute("type", "search");

			input.style.padding = "4px";
			input.style.width = "100%";
			input.style.boxSizing = "border-box";

			//allow key based navigation
			input.addEventListener("keydown", function (e) {
				var index;

				switch (e.keyCode) {
					case 38:
						//up arrow
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();

						index = displayItems.indexOf(currentItem);

						if (index > 0) {
							setCurrentItem(displayItems[index - 1]);
						} else {
							setCurrentItem(false);
						}
						break;

					case 40:
						//down arrow
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();

						index = displayItems.indexOf(currentItem);

						if (index < displayItems.length - 1) {
							if (index == -1) {
								setCurrentItem(displayItems[0]);
							} else {
								setCurrentItem(displayItems[index + 1]);
							}
						}
						break;

					case 37: //left arrow
					case 39:
						//right arrow
						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();
						break;

					case 13:
						//enter
						chooseItem();
						break;

					case 27:
						//escape
						cancelItem();
						break;

					case 36: //home
					case 35:
						//end
						//prevent table navigation while using input element
						e.stopImmediatePropagation();
						break;
				}
			});

			input.addEventListener("keyup", function (e) {

				switch (e.keyCode) {
					case 38: //up arrow
					case 37: //left arrow
					case 39: //up arrow
					case 40: //right arrow
					case 13: //enter
					case 27:
						//escape
						break;

					default:
						filterList(input.value);
				}
			});

			input.addEventListener("search", function (e) {
				filterList(input.value);
			});

			input.addEventListener("blur", function (e) {
				if (blurable) {
					chooseItem();
				}
			});

			input.addEventListener("focus", function (e) {
				showList();
				input.value = initialValue;
				filterList(initialValue, true);
			});

			//style list element
			listEl = document.createElement("div");
			listEl.classList.add("tabulator-edit-select-list");

			onRendered(function () {
				input.style.height = "100%";
				input.focus();
			});

			return input;
		},

		//start rating
		star: function star(cell, onRendered, success, cancel, editorParams) {
			var self = this,
			    element = cell.getElement(),
			    value = cell.getValue(),
			    maxStars = element.getElementsByTagName("svg").length || 5,
			    size = element.getElementsByTagName("svg")[0] ? element.getElementsByTagName("svg")[0].getAttribute("width") : 14,
			    stars = [],
			    starsHolder = document.createElement("div"),
			    star = document.createElementNS('http://www.w3.org/2000/svg', "svg");

			//change star type
			function starChange(val) {
				stars.forEach(function (star, i) {
					if (i < val) {
						if (self.table.browser == "ie") {
							star.setAttribute("class", "tabulator-star-active");
						} else {
							star.classList.replace("tabulator-star-inactive", "tabulator-star-active");
						}

						star.innerHTML = '<polygon fill="#488CE9" stroke="#014AAE" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
					} else {
						if (self.table.browser == "ie") {
							star.setAttribute("class", "tabulator-star-inactive");
						} else {
							star.classList.replace("tabulator-star-active", "tabulator-star-inactive");
						}

						star.innerHTML = '<polygon fill="#010155" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';
					}
				});
			}

			//build stars
			function buildStar(i) {

				var starHolder = document.createElement("span");
				var nextStar = star.cloneNode(true);

				stars.push(nextStar);

				starHolder.addEventListener("mouseenter", function (e) {
					e.stopPropagation();
					e.stopImmediatePropagation();
					starChange(i);
				});

				starHolder.addEventListener("mousemove", function (e) {
					e.stopPropagation();
					e.stopImmediatePropagation();
				});

				starHolder.addEventListener("click", function (e) {
					e.stopPropagation();
					e.stopImmediatePropagation();
					success(i);
				});

				starHolder.appendChild(nextStar);
				starsHolder.appendChild(starHolder);
			}

			//handle keyboard navigation value change
			function changeValue(val) {
				value = val;
				starChange(val);
			}

			//style cell
			element.style.whiteSpace = "nowrap";
			element.style.overflow = "hidden";
			element.style.textOverflow = "ellipsis";

			//style holding element
			starsHolder.style.verticalAlign = "middle";
			starsHolder.style.display = "inline-block";
			starsHolder.style.padding = "4px";

			//style star
			star.setAttribute("width", size);
			star.setAttribute("height", size);
			star.setAttribute("viewBox", "0 0 512 512");
			star.setAttribute("xml:space", "preserve");
			star.style.padding = "0 1px";

			//create correct number of stars
			for (var i = 1; i <= maxStars; i++) {
				buildStar(i);
			}

			//ensure value does not exceed number of stars
			value = Math.min(parseInt(value), maxStars);

			// set initial styling of stars
			starChange(value);

			starsHolder.addEventListener("mousemove", function (e) {
				starChange(0);
			});

			starsHolder.addEventListener("click", function (e) {
				success(0);
			});

			element.addEventListener("blur", function (e) {
				cancel();
			});

			//allow key based navigation
			element.addEventListener("keydown", function (e) {
				switch (e.keyCode) {
					case 39:
						//right arrow
						changeValue(value + 1);
						break;

					case 37:
						//left arrow
						changeValue(value - 1);
						break;

					case 13:
						//enter
						success(value);
						break;

					case 27:
						//escape
						cancel();
						break;
				}
			});

			return starsHolder;
		},

		//draggable progress bar
		progress: function progress(cell, onRendered, success, cancel, editorParams) {
			var element = cell.getElement(),
			    max = typeof editorParams.max === "undefined" ? element.getElementsByTagName("div")[0].getAttribute("max") || 100 : editorParams.max,
			    min = typeof editorParams.min === "undefined" ? element.getElementsByTagName("div")[0].getAttribute("min") || 0 : editorParams.min,
			    percent = (max - min) / 100,
			    value = cell.getValue() || 0,
			    handle = document.createElement("div"),
			    bar = document.createElement("div"),
			    mouseDrag,
			    mouseDragWidth;

			//set new value
			function updateValue() {
				var calcVal = percent * Math.round(bar.offsetWidth / (element.clientWidth / 100)) + min;
				success(calcVal);
				element.setAttribute("aria-valuenow", calcVal);
				element.setAttribute("aria-label", value);
			}

			//style handle
			handle.style.position = "absolute";
			handle.style.right = "0";
			handle.style.top = "0";
			handle.style.bottom = "0";
			handle.style.width = "5px";
			handle.classList.add("tabulator-progress-handle");

			//style bar
			bar.style.display = "inline-block";
			bar.style.position = "relative";
			// bar.style.top = "8px";
			// bar.style.bottom = "8px";
			// bar.style.left = "4px";
			// bar.style.marginRight = "4px";
			bar.style.height = "100%";
			bar.style.backgroundColor = "#488CE9";
			bar.style.maxWidth = "100%";
			bar.style.minWidth = "0%";

			//style cell
			element.style.padding = "4px 4px";

			//make sure value is in range
			value = Math.min(parseFloat(value), max);
			value = Math.max(parseFloat(value), min);

			//workout percentage
			value = Math.round((value - min) / percent);
			// bar.style.right = value + "%";
			bar.style.width = value + "%";

			element.setAttribute("aria-valuemin", min);
			element.setAttribute("aria-valuemax", max);

			bar.appendChild(handle);

			handle.addEventListener("mousedown", function (e) {
				mouseDrag = e.screenX;
				mouseDragWidth = bar.offsetWidth;
			});

			handle.addEventListener("mouseover", function () {
				handle.style.cursor = "ew-resize";
			});

			element.addEventListener("mousemove", function (e) {
				if (mouseDrag) {
					bar.style.width = mouseDragWidth + e.screenX - mouseDrag + "px";
				}
			});

			element.addEventListener("mouseup", function (e) {
				if (mouseDrag) {
					e.stopPropagation();
					e.stopImmediatePropagation();

					mouseDrag = false;
					mouseDragWidth = false;

					updateValue();
				}
			});

			//allow key based navigation
			element.addEventListener("keydown", function (e) {
				switch (e.keyCode) {
					case 39:
						//right arrow
						bar.style.width = bar.clientWidth + element.clientWidth / 100 + "px";
						break;

					case 37:
						//left arrow
						bar.style.width = bar.clientWidth - element.clientWidth / 100 + "px";
						break;

					case 13:
						//enter
						updateValue();
						break;

					case 27:
						//escape
						cancel();
						break;

				}
			});

			element.addEventListener("blur", function () {
				cancel();
			});

			return bar;
		},

		//checkbox
		tickCross: function tickCross(cell, onRendered, success, cancel, editorParams) {
			var value = cell.getValue(),
			    input = document.createElement("input"),
			    tristate = editorParams.tristate,
			    indetermValue = typeof editorParams.indeterminateValue === "undefined" ? null : editorParams.indeterminateValue,
			    indetermState = false;

			input.setAttribute("type", "checkbox");
			input.style.marginTop = "5px";
			input.style.boxSizing = "border-box";

			input.value = value;

			if (tristate && (typeof value === "undefined" || value === indetermValue || value === "")) {
				indetermState = true;
				input.indeterminate = true;
			}

			if (this.table.browser != "firefox") {
				//prevent blur issue on mac firefox
				onRendered(function () {
					input.focus();
				});
			}

			input.checked = value === true || value === "true" || value === "True" || value === 1;

			function setValue(blur) {
				if (tristate) {
					if (!blur) {
						if (input.checked && !indetermState) {
							input.checked = false;
							input.indeterminate = true;
							indetermState = true;
							return indetermValue;
						} else {
							indetermState = false;
							return input.checked;
						}
					} else {
						if (indetermState) {
							return indetermValue;
						} else {
							return input.checked;
						}
					}
				} else {
					return input.checked;
				}
			}

			//submit new value on blur
			input.addEventListener("change", function (e) {
				success(setValue());
			});

			input.addEventListener("blur", function (e) {
				success(setValue(true));
			});

			//submit new value on enter
			input.addEventListener("keydown", function (e) {
				if (e.keyCode == 13) {
					success(setValue());
				}
				if (e.keyCode == 27) {
					cancel();
				}
			});

			return input;
		}
	};

	Tabulator.prototype.registerModule("edit", Edit);
	var Filter = function Filter(table) {

		this.table = table; //hold Tabulator object

		this.filterList = []; //hold filter list
		this.headerFilters = {}; //hold column filters
		this.headerFilterElements = []; //hold header filter elements for manipulation
		this.headerFilterColumns = []; //hold columns that use header filters

		this.changed = false; //has filtering changed since last render
	};

	//initialize column header filter
	Filter.prototype.initializeColumn = function (column, value) {
		var self = this,
		    field = column.getField(),
		    prevSuccess,
		    params;

		//handle successfull value change
		function success(value) {
			var filterType = column.modules.filter.tagType == "input" && column.modules.filter.attrType == "text" || column.modules.filter.tagType == "textarea" ? "partial" : "match",
			    type = "",
			    filterFunc;

			if (typeof prevSuccess === "undefined" || prevSuccess !== value) {

				prevSuccess = value;

				if (!column.modules.filter.emptyFunc(value)) {
					column.modules.filter.value = value;

					switch (_typeof(column.definition.headerFilterFunc)) {
						case "string":
							if (self.filters[column.definition.headerFilterFunc]) {
								type = column.definition.headerFilterFunc;
								filterFunc = function filterFunc(data) {
									var params = column.definition.headerFilterFuncParams || {};
									var fieldVal = column.getFieldValue(data);

									params = typeof params === "function" ? params(value, fieldVal, data) : params;

									return self.filters[column.definition.headerFilterFunc](value, fieldVal, data, params);
								};
							} else {
								console.warn("Header Filter Error - Matching filter function not found: ", column.definition.headerFilterFunc);
							}
							break;

						case "function":
							filterFunc = function filterFunc(data) {
								var params = column.definition.headerFilterFuncParams || {};
								var fieldVal = column.getFieldValue(data);

								params = typeof params === "function" ? params(value, fieldVal, data) : params;

								return column.definition.headerFilterFunc(value, fieldVal, data, params);
							};

							type = filterFunc;
							break;
					}

					if (!filterFunc) {
						switch (filterType) {
							case "partial":
								filterFunc = function filterFunc(data) {
									var colVal = column.getFieldValue(data);

									if (typeof colVal !== 'undefined' && colVal !== null) {
										return String(colVal).toLowerCase().indexOf(String(value).toLowerCase()) > -1;
									} else {
										return false;
									}
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
			}
		}

		column.modules.filter = {
			success: success,
			attrType: false,
			tagType: false,
			emptyFunc: false
		};

		this.generateHeaderFilterElement(column);
	};

	Filter.prototype.generateHeaderFilterElement = function (column, initialValue) {
		var self = this,
		    success = column.modules.filter.success,
		    field = column.getField(),
		    filterElement,
		    editor,
		    editorElement,
		    cellWrapper,
		    typingTimer,
		    searchTrigger,
		    params;

		//handle aborted edit
		function cancel() {}

		if (column.modules.filter.headerElement && column.modules.filter.headerElement.parentNode) {
			var oldFilterElement = column.modules.filter.headerElement.parentNode;
			var oldFilterElementIndex = self.headerFilterElements.indexOf(oldFilterElement);
			if (oldFilterElementIndex >= 0) {
				self.headerFilterElements.splice(oldFilterElementIndex, 1);
			}

			var oldColumnIndex = self.headerFilterColumns.indexOf(oldColumnIndex);
			if (oldColumnIndex >= 0) {
				self.headerFilterColumns.splice(oldColumnIndex, 1);
			}

			column.contentElement.removeChild(oldFilterElement);
		}

		if (field) {

			//set empty value function
			column.modules.filter.emptyFunc = column.definition.headerFilterEmptyCheck || function (value) {
				return !value && value !== "0";
			};

			filterElement = document.createElement("div");
			filterElement.classList.add("tabulator-header-filter");

			//set column editor
			switch (_typeof(column.definition.headerFilter)) {
				case "string":
					if (self.table.modules.edit.editors[column.definition.headerFilter]) {
						editor = self.table.modules.edit.editors[column.definition.headerFilter];

						if ((column.definition.headerFilter === "tick" || column.definition.headerFilter === "tickCross") && !column.definition.headerFilterEmptyCheck) {
							column.modules.filter.emptyFunc = function (value) {
								return value !== true && value !== false;
							};
						}
					} else {
						console.warn("Filter Error - Cannot build header filter, No such editor found: ", column.definition.editor);
					}
					break;

				case "function":
					editor = column.definition.headerFilter;
					break;

				case "boolean":
					if (column.modules.edit && column.modules.edit.editor) {
						editor = column.modules.edit.editor;
					} else {
						if (column.definition.formatter && self.table.modules.edit.editors[column.definition.formatter]) {
							editor = self.table.modules.edit.editors[column.definition.formatter];

							if ((column.definition.formatter === "tick" || column.definition.formatter === "tickCross") && !column.definition.headerFilterEmptyCheck) {
								column.modules.filter.emptyFunc = function (value) {
									return value !== true && value !== false;
								};
							}
						} else {
							editor = self.table.modules.edit.editors["input"];
						}
					}
					break;
			}

			if (editor) {

				cellWrapper = {
					getValue: function getValue() {
						return typeof initialValue !== "undefined" ? initialValue : "";
					},
					getField: function getField() {
						return column.definition.field;
					},
					getElement: function getElement() {
						return filterElement;
					},
					getColumn: function getColumn() {
						return column.getComponent();
					},
					getRow: function getRow() {
						return {
							normalizeHeight: function normalizeHeight() {}
						};
					}
				};

				params = column.definition.headerFilterParams || {};

				params = typeof params === "function" ? params.call(self.table) : params;

				editorElement = editor.call(this.table.modules.edit, cellWrapper, function () {}, success, cancel, params);

				if (!editorElement) {
					console.warn("Filter Error - Cannot add filter to " + field + " column, editor returned a value of false");
					return;
				}

				if (!(editorElement instanceof Node)) {
					console.warn("Filter Error - Cannot add filter to " + field + " column, editor should return an instance of Node, the editor returned:", editorElement);
					return;
				}

				//set Placeholder Text
				if (field) {
					self.table.modules.localize.bind("headerFilters|columns|" + column.definition.field, function (value) {
						editorElement.setAttribute("placeholder", typeof value !== "undefined" && value ? value : self.table.modules.localize.getText("headerFilters|default"));
					});
				} else {
					self.table.modules.localize.bind("headerFilters|default", function (value) {
						editorElement.setAttribute("placeholder", typeof self.column.definition.headerFilterPlaceholder !== "undefined" && self.column.definition.headerFilterPlaceholder ? self.column.definition.headerFilterPlaceholder : value);
					});
				}

				//focus on element on click
				editorElement.addEventListener("click", function (e) {
					e.stopPropagation();
					editorElement.focus();
				});

				//live update filters as user types
				typingTimer = false;

				searchTrigger = function searchTrigger(e) {
					if (typingTimer) {
						clearTimeout(typingTimer);
					}

					typingTimer = setTimeout(function () {
						success(editorElement.value);
					}, 300);
				};

				column.modules.filter.headerElement = editorElement;
				column.modules.filter.attrType = editorElement.hasAttribute("type") ? editorElement.getAttribute("type").toLowerCase() : "";
				column.modules.filter.tagType = editorElement.tagName.toLowerCase();

				if (column.definition.headerFilterLiveFilter !== false) {

					if (!((column.definition.headerFilter === 'autocomplete' || column.definition.editor === 'autocomplete' || column.definition.headerFilter === 'tickCross' || column.definition.editor === 'tickCross') && column.definition.headerFilter === true)) {
						editorElement.addEventListener("keyup", searchTrigger);
						editorElement.addEventListener("search", searchTrigger);

						//update number filtered columns on change
						if (column.modules.filter.attrType == "number") {
							editorElement.addEventListener("change", function (e) {
								success(editorElement.value);
							});
						}

						//change text inputs to search inputs to allow for clearing of field
						if (column.modules.filter.attrType == "text" && this.table.browser !== "ie") {
							editorElement.setAttribute("type", "search");
							// editorElement.off("change blur"); //prevent blur from triggering filter and preventing selection click
						}
					}

					//prevent input and select elements from propegating click to column sorters etc
					if (column.modules.filter.tagType == "input" || column.modules.filter.tagType == "select" || column.modules.filter.tagType == "textarea") {
						editorElement.addEventListener("mousedown", function (e) {
							e.stopPropagation();
						});
					}
				}

				filterElement.appendChild(editorElement);

				column.contentElement.appendChild(filterElement);

				self.headerFilterElements.push(editorElement);
				self.headerFilterColumns.push(column);
			}
		} else {
			console.warn("Filter Error - Cannot add header filter, column has no field set:", column.definition.title);
		}
	};

	//hide all header filter elements (used to ensure correct column widths in "fitData" layout mode)
	Filter.prototype.hideHeaderFilterElements = function () {
		this.headerFilterElements.forEach(function (element) {
			element.style.display = 'none';
		});
	};

	//show all header filter elements (used to ensure correct column widths in "fitData" layout mode)
	Filter.prototype.showHeaderFilterElements = function () {
		this.headerFilterElements.forEach(function (element) {
			element.style.display = '';
		});
	};

	//programatically set value of header filter
	Filter.prototype.setHeaderFilterFocus = function (column) {
		if (column.modules.filter && column.modules.filter.headerElement) {
			column.modules.filter.headerElement.focus();
		} else {
			console.warn("Column Filter Focus Error - No header filter set on column:", column.getField());
		}
	};

	//programatically set value of header filter
	Filter.prototype.setHeaderFilterValue = function (column, value) {
		if (column) {
			if (column.modules.filter && column.modules.filter.headerElement) {
				this.generateHeaderFilterElement(column, value);
				column.modules.filter.success(value);
			} else {
				console.warn("Column Filter Error - No header filter set on column:", column.getField());
			}
		}
	};

	Filter.prototype.reloadHeaderFilter = function (column) {
		if (column) {
			if (column.modules.filter && column.modules.filter.headerElement) {
				this.generateHeaderFilterElement(column, column.modules.filter.value);
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

		if (this.table.options.persistentFilter && this.table.modExists("persistence", true)) {
			this.table.modules.persistence.save("filter");
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

		if (this.table.options.persistentFilter && this.table.modExists("persistence", true)) {
			this.table.modules.persistence.save("filter");
		}
	};

	//clear filters
	Filter.prototype.clearFilter = function (all) {
		this.filterList = [];

		if (all) {
			this.clearHeaderFilter();
		}

		this.changed = true;

		if (this.table.options.persistentFilter && this.table.modExists("persistence", true)) {
			this.table.modules.persistence.save("filter");
		}
	};

	//clear header filters
	Filter.prototype.clearHeaderFilter = function () {
		var self = this;

		this.headerFilters = {};

		this.headerFilterColumns.forEach(function (column) {
			column.modules.filter.value = null;
			self.reloadHeaderFilter(column);
		});

		this.changed = true;
	};

	//search data and return matching rows
	Filter.prototype.search = function (searchType, field, type, value) {
		var self = this,
		    activeRows = [],
		    filterList = [];

		if (!Array.isArray(field)) {
			field = [{ field: field, type: type, value: value }];
		}

		field.forEach(function (filter) {
			filter = self.findFilter(filter);

			if (filter) {
				filterList.push(filter);
			}
		});

		this.table.rowManager.rows.forEach(function (row) {
			var match = true;

			filterList.forEach(function (filter) {
				if (!self.filterRecurse(filter, row.getData())) {
					match = false;
				}
			});

			if (match) {
				activeRows.push(searchType === "data" ? row.getData("data") : row.getComponent());
			}
		});

		return activeRows;
	};

	//filter row array
	Filter.prototype.filter = function (rowList, filters) {
		var self = this,
		    activeRows = [],
		    activeRowComponents = [];

		if (self.table.options.dataFiltering) {
			self.table.options.dataFiltering.call(self.table, self.getFilters());
		}

		if (!self.table.options.ajaxFiltering && (self.filterList.length || Object.keys(self.headerFilters).length)) {

			rowList.forEach(function (row) {
				if (self.filterRow(row)) {
					activeRows.push(row);
				}
			});
		} else {
			activeRows = rowList.slice(0);
		}

		if (self.table.options.dataFiltered) {

			activeRows.forEach(function (row) {
				activeRowComponents.push(row.getComponent());
			});

			self.table.options.dataFiltered.call(self.table, self.getFilters(), activeRowComponents);
		}

		return activeRows;
	};

	//filter individual row
	Filter.prototype.filterRow = function (row, filters) {
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
		"=": function _(filterVal, rowVal, rowData, filterParams) {
			return rowVal == filterVal ? true : false;
		},

		//less than
		"<": function _(filterVal, rowVal, rowData, filterParams) {
			return rowVal < filterVal ? true : false;
		},

		//less than or equal to
		"<=": function _(filterVal, rowVal, rowData, filterParams) {
			return rowVal <= filterVal ? true : false;
		},

		//greater than
		">": function _(filterVal, rowVal, rowData, filterParams) {
			return rowVal > filterVal ? true : false;
		},

		//greater than or equal to
		">=": function _(filterVal, rowVal, rowData, filterParams) {
			return rowVal >= filterVal ? true : false;
		},

		//not equal to
		"!=": function _(filterVal, rowVal, rowData, filterParams) {
			return rowVal != filterVal ? true : false;
		},

		"regex": function regex(filterVal, rowVal, rowData, filterParams) {

			if (typeof filterVal == "string") {
				filterVal = new RegExp(filterVal);
			}

			return filterVal.test(rowVal);
		},

		//contains the string
		"like": function like(filterVal, rowVal, rowData, filterParams) {
			if (filterVal === null || typeof filterVal === "undefined") {
				return rowVal === filterVal ? true : false;
			} else {
				if (typeof rowVal !== 'undefined' && rowVal !== null) {
					return String(rowVal).toLowerCase().indexOf(filterVal.toLowerCase()) > -1;
				} else {
					return false;
				}
			}
		},

		//in array
		"in": function _in(filterVal, rowVal, rowData, filterParams) {
			if (Array.isArray(filterVal)) {
				return filterVal.indexOf(rowVal) > -1;
			} else {
				console.warn("Filter Error - filter value is not an array:", filterVal);
				return false;
			}
		}
	};

	Tabulator.prototype.registerModule("filter", Filter);
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

				if (column.definition.formatter === "tick") {
					column.definition.formatter = "tickCross";

					if (typeof config.params.crossElement == "undefined") {
						config.params.crossElement = false;
					}

					console.warn("DEPRECATION WANRING - the tick formatter has been depricated, please use the tickCross formatter with the crossElement param set to false");
				}

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

		column.modules.format = config;
	};

	Format.prototype.cellRendered = function (cell) {
		if (cell.column.modules.format.renderedCallback) {
			cell.column.modules.format.renderedCallback();
		}
	};

	//return a formatted value for a cell
	Format.prototype.formatValue = function (cell) {
		var component = cell.getComponent(),
		    params = typeof cell.column.modules.format.params === "function" ? cell.column.modules.format.params(component) : cell.column.modules.format.params;

		function onRendered(callback) {
			cell.column.modules.format.renderedCallback = callback;
		}

		return cell.column.modules.format.formatter.call(this, component, params, onRendered);
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
		return value === null || typeof value === "undefined" ? "&nbsp" : value;
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
		plaintext: function plaintext(cell, formatterParams, onRendered) {
			return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
		},

		//html text value
		html: function html(cell, formatterParams, onRendered) {
			return cell.getValue();
		},

		//multiline text area
		textarea: function textarea(cell, formatterParams, onRendered) {
			cell.getElement().style.whiteSpace = "pre-wrap";
			return this.emptyToSpace(this.sanitizeHTML(cell.getValue()));
		},

		//currency formatting
		money: function money(cell, formatterParams, onRendered) {
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
			number = String(number).split(".");

			integer = number[0];
			decimal = number.length > 1 ? decimalSym + number[1] : "";

			rgx = /(\d+)(\d{3})/;

			while (rgx.test(integer)) {
				integer = integer.replace(rgx, "$1" + thousandSym + "$2");
			}

			return after ? integer + decimal + symbol : symbol + integer + decimal;
		},

		//clickable anchor tag
		link: function link(cell, formatterParams, onRendered) {
			var value = cell.getValue(),
			    urlPrefix = formatterParams.urlPrefix || "",
			    label = this.emptyToSpace(value),
			    el = document.createElement("a"),
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

			el.setAttribute("href", urlPrefix + value);

			if (formatterParams.target) {
				el.setAttribute("target", formatterParams.target);
			}

			el.innerHTML = this.emptyToSpace(this.sanitizeHTML(label));

			return el;
		},

		//image element
		image: function image(cell, formatterParams, onRendered) {
			var el = document.createElement("img");
			el.setAttribute("src", cell.getValue());

			switch (_typeof(formatterParams.height)) {
				case "number":
					el.style.height = formatterParams.height + "px";
					break;

				case "string":
					el.style.height = formatterParams.height;
					break;
			}

			switch (_typeof(formatterParams.width)) {
				case "number":
					el.style.width = formatterParams.width + "px";
					break;

				case "string":
					el.style.width = formatterParams.width;
					break;
			}

			el.addEventListener("load", function () {
				cell.getRow().normalizeHeight();
			});

			return el;
		},

		//tick or cross
		tickCross: function tickCross(cell, formatterParams, onRendered) {
			var value = cell.getValue(),
			    element = cell.getElement(),
			    empty = formatterParams.allowEmpty,
			    truthy = formatterParams.allowTruthy,
			    tick = typeof formatterParams.tickElement !== "undefined" ? formatterParams.tickElement : '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>',
			    cross = typeof formatterParams.crossElement !== "undefined" ? formatterParams.crossElement : '<svg enable-background="new 0 0 24 24" height="14" width="14"  viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';

			if (truthy && value || value === true || value === "true" || value === "True" || value === 1 || value === "1") {
				element.setAttribute("aria-checked", true);
				return tick || "";
			} else {
				if (empty && (value === "null" || value === "" || value === null || typeof value === "undefined")) {
					element.setAttribute("aria-checked", "mixed");
					return "";
				} else {
					element.setAttribute("aria-checked", false);
					return cross || "";
				}
			}
		},

		datetime: function datetime(cell, formatterParams, onRendered) {
			var inputFormat = formatterParams.inputFormat || "YYYY-MM-DD hh:mm:ss";
			var outputFormat = formatterParams.outputFormat || "DD/MM/YYYY hh:mm:ss";
			var invalid = typeof formatterParams.invalidPlaceholder !== "undefined" ? formatterParams.invalidPlaceholder : "";
			var value = cell.getValue();

			var newDatetime = moment(value, inputFormat);

			if (newDatetime.isValid()) {
				return newDatetime.format(outputFormat);
			} else {

				if (invalid === true) {
					return value;
				} else if (typeof invalid === "function") {
					return invalid(value);
				} else {
					return invalid;
				}
			}
		},

		datetimediff: function datetime(cell, formatterParams, onRendered) {
			var inputFormat = formatterParams.inputFormat || "YYYY-MM-DD hh:mm:ss";
			var invalid = typeof formatterParams.invalidPlaceholder !== "undefined" ? formatterParams.invalidPlaceholder : "";
			var suffix = typeof formatterParams.suffix !== "undefined" ? formatterParams.suffix : false;
			var unit = typeof formatterParams.unit !== "undefined" ? formatterParams.unit : undefined;
			var humanize = typeof formatterParams.humanize !== "undefined" ? formatterParams.humanize : false;
			var date = typeof formatterParams.date !== "undefined" ? formatterParams.date : moment();
			var value = cell.getValue();

			var newDatetime = moment(value, inputFormat);

			if (newDatetime.isValid()) {
				if (humanize) {
					return moment.duration(newDatetime.diff(date)).humanize(suffix);
				} else {
					return newDatetime.diff(date, unit) + (suffix ? " " + suffix : "");
				}
			} else {

				if (invalid === true) {
					return value;
				} else if (typeof invalid === "function") {
					return invalid(value);
				} else {
					return invalid;
				}
			}
		},

		//select
		lookup: function lookup(cell, formatterParams, onRendered) {
			var value = cell.getValue();

			if (typeof formatterParams[value] === "undefined") {
				console.warn('Missing display value for ' + value);
				return value;
			}

			return formatterParams[value];
		},

		//star rating
		star: function star(cell, formatterParams, onRendered) {
			var value = cell.getValue(),
			    element = cell.getElement(),
			    maxStars = formatterParams && formatterParams.stars ? formatterParams.stars : 5,
			    stars = document.createElement("span"),
			    star = document.createElementNS('http://www.w3.org/2000/svg', "svg"),
			    starActive = '<polygon fill="#FFEA00" stroke="#C1AB60" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>',
			    starInactive = '<polygon fill="#D2D2D2" stroke="#686868" stroke-width="37.6152" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 "/>';

			//style stars holder
			stars.style.verticalAlign = "middle";

			//style star
			star.setAttribute("width", "14");
			star.setAttribute("height", "14");
			star.setAttribute("viewBox", "0 0 512 512");
			star.setAttribute("xml:space", "preserve");
			star.style.padding = "0 1px";

			value = parseInt(value) < maxStars ? parseInt(value) : maxStars;

			for (var i = 1; i <= maxStars; i++) {
				var nextStar = star.cloneNode(true);
				nextStar.innerHTML = i <= value ? starActive : starInactive;

				stars.appendChild(nextStar);
			}

			element.style.whiteSpace = "nowrap";
			element.style.overflow = "hidden";
			element.style.textOverflow = "ellipsis";

			element.setAttribute("aria-label", value);

			return stars;
		},

		traffic: function traffic(cell, formatterParams, onRendered) {
			var value = this.sanitizeHTML(cell.getValue()) || 0,
			    el = document.createElement("span"),
			    max = formatterParams && formatterParams.max ? formatterParams.max : 100,
			    min = formatterParams && formatterParams.min ? formatterParams.min : 0,
			    colors = formatterParams && typeof formatterParams.color !== "undefined" ? formatterParams.color : ["red", "orange", "green"],
			    color = "#666666",
			    percent,
			    percentValue;

			if (isNaN(value) || typeof cell.getValue() === "undefined") {
				return;
			}

			el.classList.add("tabulator-traffic-light");

			//make sure value is in range
			percentValue = parseFloat(value) <= max ? parseFloat(value) : max;
			percentValue = parseFloat(percentValue) >= min ? parseFloat(percentValue) : min;

			//workout percentage
			percent = (max - min) / 100;
			percentValue = Math.round((percentValue - min) / percent);

			//set color
			switch (typeof colors === 'undefined' ? 'undefined' : _typeof(colors)) {
				case "string":
					color = colors;
					break;
				case "function":
					color = colors(value);
					break;
				case "object":
					if (Array.isArray(colors)) {
						var unit = 100 / colors.length;
						var index = Math.floor(percentValue / unit);

						index = Math.min(index, colors.length - 1);
						index = Math.max(index, 0);
						color = colors[index];
						break;
					}
			}

			el.style.backgroundColor = color;

			return el;
		},

		//progress bar
		progress: function progress(cell, formatterParams, onRendered) {
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
					}
					break;
				default:
					legendColor = "#000";
			}

			element.style.minWidth = "30px";
			element.style.position = "relative";

			element.setAttribute("aria-label", percentValue);

			return "<div style='position:realtive; height:100%;'  data-max='" + max + "' data-min='" + min + "'><div style='position:relative; height:100%; width:calc(" + percentValue + "%); background-color:" + color + "; display:inline-block;'></div></div>" + (legend ? "<div style='position:absolute; top:4px; left:0; text-align:" + legendAlign + "; width:100%; color:" + legendColor + ";'>" + legend + "</div>" : "");
		},

		//background color
		color: function color(cell, formatterParams, onRendered) {
			cell.getElement().style.backgroundColor = this.sanitizeHTML(cell.getValue());
			return "";
		},

		//tick icon
		buttonTick: function buttonTick(cell, formatterParams, onRendered) {
			return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#2DC214" clip-rule="evenodd" d="M21.652,3.211c-0.293-0.295-0.77-0.295-1.061,0L9.41,14.34  c-0.293,0.297-0.771,0.297-1.062,0L3.449,9.351C3.304,9.203,3.114,9.13,2.923,9.129C2.73,9.128,2.534,9.201,2.387,9.351  l-2.165,1.946C0.078,11.445,0,11.63,0,11.823c0,0.194,0.078,0.397,0.223,0.544l4.94,5.184c0.292,0.296,0.771,0.776,1.062,1.07  l2.124,2.141c0.292,0.293,0.769,0.293,1.062,0l14.366-14.34c0.293-0.294,0.293-0.777,0-1.071L21.652,3.211z" fill-rule="evenodd"/></svg>';
		},

		//cross icon
		buttonCross: function buttonCross(cell, formatterParams, onRendered) {
			return '<svg enable-background="new 0 0 24 24" height="14" width="14" viewBox="0 0 24 24" xml:space="preserve" ><path fill="#CE1515" d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z"/></svg>';
		},

		//current row number
		rownum: function rownum(cell, formatterParams, onRendered) {
			return this.table.rowManager.activeRows.indexOf(cell.getRow()._getSelf()) + 1;
		},

		//row handle
		handle: function handle(cell, formatterParams, onRendered) {
			cell.getElement().classList.add("tabulator-row-handle");
			return "<div class='tabulator-row-handle-box'><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div><div class='tabulator-row-handle-bar'></div></div>";
		},

		responsiveCollapse: function responsiveCollapse(cell, formatterParams, onRendered) {
			var self = this,
			    open = false,
			    el = document.createElement("div");

			function toggleList(isOpen) {
				var collapse = cell.getRow().getElement().getElementsByClassName("tabulator-responsive-collapse")[0];

				open = isOpen;

				if (open) {
					el.classList.add("open");
					if (collapse) {
						collapse.style.display = '';
					}
				} else {
					el.classList.remove("open");
					if (collapse) {
						collapse.style.display = 'none';
					}
				}
			}

			el.classList.add("tabulator-responsive-collapse-toggle");
			el.innerHTML = "<span class='tabulator-responsive-collapse-toggle-open'>+</span><span class='tabulator-responsive-collapse-toggle-close'>-</span>";

			cell.getElement().classList.add("tabulator-row-handle");

			if (self.table.options.responsiveLayoutCollapseStartOpen) {
				open = true;
			}

			el.addEventListener("click", function (e) {
				e.stopImmediatePropagation();
				toggleList(!open);
			});

			toggleList(open);

			return el;
		}
	};

	Tabulator.prototype.registerModule("format", Format);

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
		this.leftMargin = 0;
		this.rightMargin = 0;
		this.active = false;

		this.table.columnManager.headersElement.style.marginLeft = 0;
		this.table.columnManager.element.style.paddingRight = 0;
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

					column.modules.frozen = config;
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
			self.table.columnManager.headersElement.style.marginLeft = self.leftMargin + "px";

			self.rightMargin = self._calcSpace(self.rightColumns, self.rightColumns.length);
			self.table.columnManager.element.style.paddingRight = self.rightMargin + "px";

			self.table.rowManager.activeRows.forEach(function (row) {
				self.layoutRow(row);
			});

			if (self.table.options.dataTree) {
				self.table.rowManager.getDisplayRows().forEach(function (row) {
					self.layoutRow(row);
				});
			}

			if (self.table.modExists("columnCalcs")) {
				if (self.table.modules.columnCalcs.topInitialized && self.table.modules.columnCalcs.topRow) {
					self.layoutRow(self.table.modules.columnCalcs.topRow);
				}
				if (self.table.modules.columnCalcs.botInitialized && self.table.modules.columnCalcs.botRow) {
					self.layoutRow(self.table.modules.columnCalcs.botRow);
				}
			}

			//calculate left columns
			self.leftColumns.forEach(function (column, i) {
				column.modules.frozen.margin = self._calcSpace(self.leftColumns, i) + self.table.columnManager.scrollLeft;

				if (i == self.leftColumns.length - 1) {
					column.modules.frozen.edge = true;
				} else {
					column.modules.frozen.edge = false;
				}

				self.layoutColumn(column);
			});

			//calculate right frozen columns
			rightMargin = self.table.rowManager.element.clientWidth + self.table.columnManager.scrollLeft;

			// if(tableHolder.scrollHeight > tableHolder.clientHeight){
			// 	rightMargin -= tableHolder.offsetWidth - tableHolder.clientWidth;
			// }

			self.rightColumns.forEach(function (column, i) {
				column.modules.frozen.margin = rightMargin - self._calcSpace(self.rightColumns, i + 1);

				if (i == self.rightColumns.length - 1) {
					column.modules.frozen.edge = true;
				} else {
					column.modules.frozen.edge = false;
				}

				self.layoutColumn(column);
			});

			this.table.rowManager.tableElement.style.marginRight = this.rightMargin + "px";
		}
	};

	FrozenColumns.prototype.layoutColumn = function (column) {
		var self = this;

		self.layoutElement(column.getElement(), column);

		column.cells.forEach(function (cell) {
			self.layoutElement(cell.getElement(), column);
		});
	};

	FrozenColumns.prototype.layoutRow = function (row) {
		var rowEl = row.getElement();

		rowEl.style.paddingLeft = this.leftMargin + "px";
		// rowEl.style.paddingRight = this.rightMargin + "px";
	};

	FrozenColumns.prototype.layoutElement = function (element, column) {

		if (column.modules.frozen) {
			element.style.position = "absolute";
			element.style.left = column.modules.frozen.margin + "px";

			element.classList.add("tabulator-frozen");

			if (column.modules.frozen.edge) {
				element.classList.add("tabulator-frozen-" + column.modules.frozen.position);
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

	Tabulator.prototype.registerModule("frozenColumns", FrozenColumns);
	var FrozenRows = function FrozenRows(table) {
		this.table = table; //hold Tabulator object
		this.topElement = document.createElement("div");
		this.rows = [];
		this.displayIndex = 0; //index in display pipeline
	};

	FrozenRows.prototype.initialize = function () {
		this.rows = [];

		this.topElement.classList.add("tabulator-frozen-rows-holder");

		// this.table.columnManager.element.append(this.topElement);
		this.table.columnManager.getElement().insertBefore(this.topElement, this.table.columnManager.headersElement.nextSibling);
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
		if (!row.modules.frozen) {
			row.modules.frozen = true;
			this.topElement.appendChild(row.getElement());
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

		if (row.modules.frozen) {

			row.modules.frozen = false;

			var rowEl = row.getElement();
			rowEl.parentNode.removeChild(rowEl);

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

	Tabulator.prototype.registerModule("frozenRows", FrozenRows);

	//public group object
	var GroupComponent = function GroupComponent(group) {
		this._group = group;
		this.type = "GroupComponent";
	};

	GroupComponent.prototype.getKey = function () {
		return this._group.key;
	};

	GroupComponent.prototype.getElement = function () {
		return this._group.element;
	};

	GroupComponent.prototype.getRows = function () {
		return this._group.getRows(true);
	};

	GroupComponent.prototype.getSubGroups = function () {
		return this._group.getSubGroups(true);
	};

	GroupComponent.prototype.getParentGroup = function () {
		return this._group.parent ? this._group.parent.getComponent() : false;
	};

	GroupComponent.prototype.getVisibility = function () {
		return this._group.visible;
	};

	GroupComponent.prototype.show = function () {
		this._group.show();
	};

	GroupComponent.prototype.hide = function () {
		this._group.hide();
	};

	GroupComponent.prototype.toggle = function () {
		this._group.toggleVisibility();
	};

	GroupComponent.prototype._getSelf = function () {
		return this._group;
	};

	GroupComponent.prototype.getTable = function () {
		return this._group.groupManager.table;
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
		this.elementContents = false;
		this.height = 0;
		this.outerHeight = 0;
		this.initialized = false;
		this.calcs = {};
		this.initialized = false;
		this.modules = {};
		this.arrowElement = false;

		this.visible = oldGroup ? oldGroup.visible : typeof groupManager.startOpen[level] !== "undefined" ? groupManager.startOpen[level] : groupManager.startOpen[0];

		this.createElements();
		this.addBindings();

		this.createValueGroups();
	};

	Group.prototype.wipe = function () {
		if (this.groupList.length) {
			this.groupList.forEach(function (group) {
				group.wipe();
			});
		} else {
			this.element = false;
			this.arrowElement = false;
			this.elementContents = false;
		}
	};

	Group.prototype.createElements = function () {
		this.element = document.createElement("div");
		this.element.classList.add("tabulator-row");
		this.element.classList.add("tabulator-group");
		this.element.classList.add("tabulator-group-level-" + this.level);
		this.element.setAttribute("role", "rowgroup");

		this.arrowElement = document.createElement("div");
		this.arrowElement.classList.add("tabulator-arrow");

		//setup movable rows
		if (this.groupManager.table.options.movableRows !== false && this.groupManager.table.modExists("moveRow")) {
			this.groupManager.table.modules.moveRow.initializeGroupHeader(this);
		}
	};

	Group.prototype.createValueGroups = function () {
		var _this35 = this;

		var level = this.level + 1;
		if (this.groupManager.allowedValues && this.groupManager.allowedValues[level]) {
			this.groupManager.allowedValues[level].forEach(function (value) {
				_this35._createGroup(value, level);
			});
		}
	};

	Group.prototype.addBindings = function () {
		var self = this,
		    dblTap,
		    tapHold,
		    tap,
		    toggleElement;

		//handle group click events
		if (self.groupManager.table.options.groupClick) {
			self.element.addEventListener("click", function (e) {
				self.groupManager.table.options.groupClick(e, self.getComponent());
			});
		}

		if (self.groupManager.table.options.groupDblClick) {
			self.element.addEventListener("dblclick", function (e) {
				self.groupManager.table.options.groupDblClick(e, self.getComponent());
			});
		}

		if (self.groupManager.table.options.groupContext) {
			self.element.addEventListener("contextmenu", function (e) {
				self.groupManager.table.options.groupContext(e, self.getComponent());
			});
		}

		if (self.groupManager.table.options.groupTap) {

			tap = false;

			self.element.addEventListener("touchstart", function (e) {
				tap = true;
			});

			self.element.addEventListener("touchend", function (e) {
				if (tap) {
					self.groupManager.table.options.groupTap(e, self.getComponent());
				}

				tap = false;
			});
		}

		if (self.groupManager.table.options.groupDblTap) {

			dblTap = null;

			self.element.addEventListener("touchend", function (e) {

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

			self.element.addEventListener("touchstart", function (e) {
				clearTimeout(tapHold);

				tapHold = setTimeout(function () {
					clearTimeout(tapHold);
					tapHold = null;
					tap = false;
					self.groupManager.table.options.groupTapHold(e, self.getComponent());
				}, 1000);
			});

			self.element.addEventListener("touchend", function (e) {
				clearTimeout(tapHold);
				tapHold = null;
			});
		}

		if (self.groupManager.table.options.groupToggleElement) {
			toggleElement = self.groupManager.table.options.groupToggleElement == "arrow" ? self.arrowElement : self.element;

			toggleElement.addEventListener("click", function (e) {
				e.stopPropagation();
				e.stopImmediatePropagation();
				self.toggleVisibility();
			});
		}
	};

	Group.prototype._createGroup = function (groupID, level) {
		var groupKey = level + "_" + groupID;
		var group = new Group(this.groupManager, this, level, groupID, this.groupManager.groupIDLookups[level].field, this.groupManager.headerGenerator[level] || this.groupManager.headerGenerator[0], this.old ? this.old.groups[groupKey] : false);

		this.groups[groupKey] = group;
		this.groupList.push(group);
	};

	Group.prototype._addRowToGroup = function (row) {

		var level = this.level + 1;

		if (this.hasSubGroups) {
			var groupID = this.groupManager.groupIDLookups[level].func(row.getData()),
			    groupKey = level + "_" + groupID;

			if (this.groupManager.allowedValues && this.groupManager.allowedValues[level]) {
				if (this.groups[groupKey]) {
					this.groups[groupKey].addRow(row);
				}
			} else {
				if (!this.groups[groupKey]) {
					this._createGroup(groupID, level);
				}

				this.groups[groupKey].addRow(row);
			}
		}
	};

	Group.prototype._addRow = function (row) {
		this.rows.push(row);
		row.modules.group = this;
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

		row.modules.group = this;

		this.generateGroupHeaderContents();

		if (this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.options.columnCalcs != "table") {
			this.groupManager.table.modules.columnCalcs.recalcGroup(this);
		}

		this.groupManager.updateGroupRows(true);
	};

	Group.prototype.scrollHeader = function (left) {
		this.arrowElement.style.marginLeft = left;

		this.groupList.forEach(function (child) {
			child.scrollHeader(left);
		});
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
		var el = row.getElement();

		if (index > -1) {
			this.rows.splice(index, 1);
		}

		if (!this.groupManager.table.options.groupValues && !this.rows.length) {
			if (this.parent) {
				this.parent.removeGroup(this);
			} else {
				this.groupManager.removeGroup(this);
			}

			this.groupManager.updateGroupRows(true);
		} else {

			if (el.parentNode) {
				el.parentNode.removeChild(el);
			}

			this.generateGroupHeaderContents();

			if (this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.options.columnCalcs != "table") {
				this.groupManager.table.modules.columnCalcs.recalcGroup(this);
			}
		}
	};

	Group.prototype.removeGroup = function (group) {
		var groupKey = group.level + "_" + group.key,
		    index;

		if (this.groups[groupKey]) {
			delete this.groups[groupKey];

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

	Group.prototype.getHeadersAndRows = function (noCalc) {
		var output = [];

		output.push(this);

		this._visSet();

		if (this.visible) {

			if (this.groupList.length) {
				this.groupList.forEach(function (group) {
					output = output.concat(group.getHeadersAndRows(noCalc));
				});
			} else {
				if (!noCalc && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasTopCalcs()) {
					if (this.calcs.top) {
						this.calcs.top.detachElement();
					}

					this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows);
					output.push(this.calcs.top);
				}

				output = output.concat(this.rows);

				if (!noCalc && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.modExists("columnCalcs") && this.groupManager.table.modules.columnCalcs.hasBottomCalcs()) {

					if (this.calcs.bottom) {
						this.calcs.bottom.detachElement();
					}

					this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows);
					output.push(this.calcs.bottom);
				}
			}
		} else {
			if (!this.groupList.length && this.groupManager.table.options.columnCalcs != "table" && this.groupManager.table.options.groupClosedShowCalcs) {
				if (this.groupManager.table.modExists("columnCalcs")) {
					if (!noCalc && this.groupManager.table.modules.columnCalcs.hasTopCalcs()) {
						if (this.calcs.top) {
							this.calcs.top.detachElement();
						}
						this.calcs.top = this.groupManager.table.modules.columnCalcs.generateTopRow(this.rows);
						output.push(this.calcs.top);
					}

					if (!noCalc && this.groupManager.table.modules.columnCalcs.hasBottomCalcs()) {
						if (this.calcs.bottom) {
							this.calcs.bottom.detachElement();
						}
						this.calcs.bottom = this.groupManager.table.modules.columnCalcs.generateBottomRow(this.rows);
						output.push(this.calcs.bottom);
					}
				}
			}
		}

		return output;
	};

	Group.prototype.getData = function (visible, transform) {
		var self = this,
		    output = [];

		this._visSet();

		if (!visible || visible && this.visible) {
			this.rows.forEach(function (row) {
				output.push(row.getData(transform || "data"));
			});
		}

		return output;
	};

	// Group.prototype.getRows = function(){
	// 	this._visSet();

	// 	return this.visible ? this.rows : [];
	// };

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

			this.element.classList.remove("tabulator-group-visible");

			if (this.groupList.length) {
				this.groupList.forEach(function (group) {

					var rows = group.getHeadersAndRows();

					rows.forEach(function (row) {
						row.detachElement();
					});
				});
			} else {
				this.rows.forEach(function (row) {
					var rowEl = row.getElement();
					rowEl.parentNode.removeChild(rowEl);
				});
			}

			this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex());

			this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth();
		} else {
			this.groupManager.updateGroupRows(true);
		}

		this.groupManager.table.options.groupVisibilityChanged.call(this.table, this.getComponent(), false);
	};

	Group.prototype.show = function () {
		var self = this;

		self.visible = true;

		if (this.groupManager.table.rowManager.getRenderMode() == "classic" && !this.groupManager.table.options.pagination) {

			this.element.classList.add("tabulator-group-visible");

			var prev = self.getElement();

			if (this.groupList.length) {
				this.groupList.forEach(function (group) {
					var rows = group.getHeadersAndRows();

					rows.forEach(function (row) {
						var rowEl = row.getElement();
						prev.parentNode.insertBefore(rowEl, prev.nextSibling);
						row.initialize();
						prev = rowEl;
					});
				});
			} else {
				self.rows.forEach(function (row) {
					var rowEl = row.getElement();
					prev.parentNode.insertBefore(rowEl, prev.nextSibling);
					row.initialize();
					prev = rowEl;
				});
			}

			this.groupManager.table.rowManager.setDisplayRows(this.groupManager.updateGroupRows(), this.groupManager.getDisplayIndex());

			this.groupManager.table.rowManager.checkClassicModeGroupHeaderWidth();
		} else {
			this.groupManager.updateGroupRows(true);
		}

		this.groupManager.table.options.groupVisibilityChanged.call(this.table, this.getComponent(), true);
	};

	Group.prototype._visSet = function () {
		var data = [];

		if (typeof this.visible == "function") {

			this.rows.forEach(function (row) {
				data.push(row.getData());
			});

			this.visible = this.visible(this.key, this.getRowCount(), data, this.getComponent());
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

	Group.prototype.getSubGroups = function (component) {
		var output = [];

		this.groupList.forEach(function (child) {
			output.push(component ? child.getComponent() : child);
		});

		return output;
	};

	Group.prototype.getRows = function (compoment) {
		var output = [];

		this.rows.forEach(function (row) {
			output.push(compoment ? row.getComponent() : row);
		});

		return output;
	};

	Group.prototype.generateGroupHeaderContents = function () {
		var data = [];

		this.rows.forEach(function (row) {
			data.push(row.getData());
		});

		this.elementContents = this.generator(this.key, this.getRowCount(), data, this.getComponent());

		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}if (typeof this.elementContents === "string") {
			this.element.innerHTML = this.elementContents;
		} else {
			this.element.appendChild(this.elementContents);
		}

		this.element.insertBefore(this.arrowElement, this.element.firstChild);
	};

	////////////// Standard Row Functions //////////////

	Group.prototype.getElement = function () {
		this.addBindingsd = false;

		this._visSet();

		if (this.visible) {
			this.element.classList.add("tabulator-group-visible");
		} else {
			this.element.classList.remove("tabulator-group-visible");
		}

		for (var i = 0; i < this.element.childNodes.length; ++i) {
			this.element.childNodes[i].parentNode.removeChild(this.element.childNodes[i]);
		}

		this.generateGroupHeaderContents();

		// this.addBindings();

		return this.element;
	};

	Group.prototype.detachElement = function () {
		if (this.element && this.element.parentNode) {
			this.element.parentNode.removeChild(this.element);
		}
	};

	//normalize the height of elements in the row
	Group.prototype.normalizeHeight = function () {
		this.setHeight(this.element.clientHeight);
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

		if (Tabulator.prototype.helpers.elVisible(this.element)) {
			this.initialize(true);
		}
	};

	Group.prototype.setHeight = function (height) {
		if (this.height != height) {
			this.height = height;
			this.outerHeight = this.element.offsetHeight;
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
		this.allowedValues = false;
		this.groups = {}; //hold row groups
		this.displayIndex = 0; //index in display pipeline
	};

	//initialize group configuration
	GroupRows.prototype.initialize = function () {
		var self = this,
		    groupBy = self.table.options.groupBy,
		    startOpen = self.table.options.groupStartOpen,
		    groupHeader = self.table.options.groupHeader;

		this.allowedValues = self.table.options.groupValues;

		self.headerGenerator = [function () {
			return "";
		}];
		this.startOpen = [function () {
			return false;
		}]; //starting state of group

		self.table.modules.localize.bind("groups|item", function (langValue, lang) {
			self.headerGenerator[0] = function (value, count, data) {
				//header layout function
				return (typeof value === "undefined" ? "" : value) + "<span>(" + count + " " + (count === 1 ? langValue : lang.groups.items) + ")</span>";
			};
		});

		this.groupIDLookups = [];

		if (Array.isArray(groupBy) || groupBy) {
			if (this.table.modExists("columnCalcs") && this.table.options.columnCalcs != "table" && this.table.options.columnCalcs != "both") {
				this.table.modules.columnCalcs.removeCalcs();
			}
		} else {
			if (this.table.modExists("columnCalcs") && this.table.options.columnCalcs != "group") {

				var cols = this.table.columnManager.getRealColumns();

				cols.forEach(function (col) {
					if (col.definition.topCalc) {
						self.table.modules.columnCalcs.initializeTopRow();
					}

					if (col.definition.bottomCalc) {
						self.table.modules.columnCalcs.initializeBottomRow();
					}
				});
			}
		}

		if (!Array.isArray(groupBy)) {
			groupBy = [groupBy];
		}

		groupBy.forEach(function (group, i) {
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
				func: lookupFunc,
				values: self.allowedValues ? self.allowedValues[i] : false
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

			this.table.options.dataGrouping.call(this.table);

			this.generateGroups(rows);

			if (this.table.options.dataGrouped) {
				this.table.options.dataGrouped.call(this.table, this.getGroups(true));
			}

			return this.updateGroupRows();
		} else {
			return rows.slice(0);
		}
	};

	GroupRows.prototype.getGroups = function (compoment) {
		var groupComponents = [];

		this.groupList.forEach(function (group) {
			groupComponents.push(compoment ? group.getComponent() : group);
		});

		return groupComponents;
	};

	GroupRows.prototype.wipe = function () {
		this.groupList.forEach(function (group) {
			group.wipe();
		});
	};

	GroupRows.prototype.pullGroupListData = function (groupList) {
		var self = this;
		var groupListData = [];

		groupList.forEach(function (group) {
			var groupHeader = {};
			groupHeader.level = 0;
			groupHeader.rowCount = 0;
			groupHeader.headerContent = "";
			var childData = [];

			if (group.hasSubGroups) {
				childData = self.pullGroupListData(group.groupList);

				groupHeader.level = group.level;
				groupHeader.rowCount = childData.length - group.groupList.length; // data length minus number of sub-headers
				groupHeader.headerContent = group.generator(group.key, groupHeader.rowCount, group.rows, group);

				groupListData.push(groupHeader);
				groupListData = groupListData.concat(childData);
			} else {
				groupHeader.level = group.level;
				groupHeader.headerContent = group.generator(group.key, group.rows.length, group.rows, group);
				groupHeader.rowCount = group.getRows().length;

				groupListData.push(groupHeader);

				group.getRows().forEach(function (row) {
					groupListData.push(row.getData("data"));
				});
			}
		});

		return groupListData;
	};

	GroupRows.prototype.getGroupedData = function () {

		return this.pullGroupListData(this.groupList);
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

		if (this.allowedValues && this.allowedValues[0]) {
			this.allowedValues[0].forEach(function (value) {
				self.createGroup(value, 0, oldGroups);
			});

			rows.forEach(function (row) {
				self.assignRowToExistingGroup(row, oldGroups);
			});
		} else {
			rows.forEach(function (row) {
				self.assignRowToGroup(row, oldGroups);
			});
		}
	};

	GroupRows.prototype.createGroup = function (groupID, level, oldGroups) {
		var groupKey = level + "_" + groupID,
		    group;

		oldGroups = oldGroups || [];

		group = new Group(this, false, level, groupID, this.groupIDLookups[0].field, this.headerGenerator[0], oldGroups[groupKey]);

		this.groups[groupKey] = group;
		this.groupList.push(group);
	};

	GroupRows.prototype.assignRowToGroup = function (row, oldGroups) {
		var groupID = this.groupIDLookups[0].func(row.getData()),
		    groupKey = "0_" + groupID;

		if (!this.groups[groupKey]) {
			this.createGroup(groupID, 0, oldGroups);
		}

		this.groups[groupKey].addRow(row);
	};

	GroupRows.prototype.assignRowToExistingGroup = function (row, oldGroups) {
		var groupID = this.groupIDLookups[0].func(row.getData()),
		    groupKey = "0_" + groupID;

		if (this.groups[groupKey]) {
			this.groups[groupKey].addRow(row);
		}
	};

	GroupRows.prototype.assignRowToGroup = function (row, oldGroups) {
		var groupID = this.groupIDLookups[0].func(row.getData()),
		    newGroupNeeded = !this.groups["0_" + groupID];

		if (newGroupNeeded) {
			this.createGroup(groupID, 0, oldGroups);
		}

		this.groups["0_" + groupID].addRow(row);

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
		left = left + "px";

		this.groupList.forEach(function (group) {
			group.scrollHeader(left);
		});
	};

	GroupRows.prototype.removeGroup = function (group) {
		var groupKey = group.level + "_" + group.key,
		    index;

		if (this.groups[groupKey]) {
			delete this.groups[groupKey];

			index = this.groupList.indexOf(group);

			if (index > -1) {
				this.groupList.splice(index, 1);
			}
		}
	};

	Tabulator.prototype.registerModule("groupRows", GroupRows);
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

	History.prototype.getHistoryUndoSize = function () {
		return this.index + 1;
	};

	History.prototype.getHistoryRedoSize = function () {
		return this.history.length - (this.index + 1);
	};

	History.prototype.undo = function () {

		if (this.index > -1) {
			var action = this.history[this.index];

			this.undoers[action.type].call(this, action);

			this.index--;

			this.table.options.historyUndo.call(this.table, action.type, action.component.getComponent(), action.data);

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

			this.table.options.historyRedo.call(this.table, action.type, action.component.getComponent(), action.data);

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

	Tabulator.prototype.registerModule("history", History);
	var HtmlTableImport = function HtmlTableImport(table) {
		this.table = table; //hold Tabulator object
		this.fieldIndex = [];
		this.hasIndex = false;
	};

	HtmlTableImport.prototype.parseTable = function () {
		var self = this,
		    element = self.table.element,
		    options = self.table.options,
		    columns = options.columns,
		    headers = element.getElementsByTagName("th"),
		    rows = element.getElementsByTagName("tbody")[0],
		    data = [],
		    newTable;

		self.hasIndex = false;

		self.table.options.htmlImporting.call(this.table);

		rows = rows ? rows.getElementsByTagName("tr") : [];

		//check for tablator inline options
		self._extractOptions(element, options);

		if (headers.length) {
			self._extractHeaders(headers, rows);
		} else {
			self._generateBlankHeaders(headers, rows);
		}

		//iterate through table rows and build data set
		for (var index = 0; index < rows.length; index++) {
			var row = rows[index],
			    cells = row.getElementsByTagName("td"),
			    item = {};

			//create index if the dont exist in table
			if (!self.hasIndex) {
				item[options.index] = index;
			}

			for (var i = 0; i < cells.length; i++) {
				var cell = cells[i];
				if (typeof this.fieldIndex[i] !== "undefined") {
					item[this.fieldIndex[i]] = cell.innerHTML;
				}
			}

			//add row data to item
			data.push(item);
		}

		//create new element
		var newElement = document.createElement("div");

		//transfer attributes to new element
		var attributes = element.attributes;

		// loop through attributes and apply them on div

		for (var i in attributes) {
			if (_typeof(attributes[i]) == "object") {
				newElement.setAttribute(attributes[i].name, attributes[i].value);
			}
		}

		// replace table with div element
		element.parentNode.replaceChild(newElement, element);

		options.data = data;

		self.table.options.htmlImported.call(this.table);

		// // newElement.tabulator(options);

		this.table.element = newElement;
	};

	//extract tabulator attribute options
	HtmlTableImport.prototype._extractOptions = function (element, options, defaultOptions) {
		var attributes = element.attributes;
		var optionsArr = defaultOptions ? Object.assign([], defaultOptions) : Object.keys(options);
		var optionsList = {};

		optionsArr.forEach(function (item) {
			optionsList[item.toLowerCase()] = item;
		});

		for (var index in attributes) {
			var attrib = attributes[index];
			var name;

			if (attrib && (typeof attrib === 'undefined' ? 'undefined' : _typeof(attrib)) == "object" && attrib.name && attrib.name.indexOf("tabulator-") === 0) {
				name = attrib.name.replace("tabulator-", "");

				if (typeof optionsList[name] !== "undefined") {
					options[optionsList[name]] = this._attribValue(attrib.value);
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
		var match = this.table.options.columns.find(function (column) {
			return column.title === title;
		});

		return match || false;
	};

	//extract column from headers
	HtmlTableImport.prototype._extractHeaders = function (headers, rows) {
		for (var index = 0; index < headers.length; index++) {
			var header = headers[index],
			    exists = false,
			    col = this._findCol(header.textContent),
			    width,
			    attributes;

			if (col) {
				exists = true;
			} else {
				col = { title: header.textContent.trim() };
			}

			if (!col.field) {
				col.field = header.textContent.trim().toLowerCase().replace(" ", "_");
			}

			width = header.getAttribute("width");

			if (width && !col.width) {
				col.width = width;
			}

			//check for tablator inline options
			attributes = header.attributes;

			// //check for tablator inline options
			this._extractOptions(header, col, Column.prototype.defaultOptionList);

			for (var i in attributes) {
				var attrib = attributes[i],
				    name;

				if (attrib && (typeof attrib === 'undefined' ? 'undefined' : _typeof(attrib)) == "object" && attrib.name && attrib.name.indexOf("tabulator-") === 0) {

					name = attrib.name.replace("tabulator-", "");

					col[name] = this._attribValue(attrib.value);
				}
			}

			this.fieldIndex[index] = col.field;

			if (col.field == this.table.options.index) {
				this.hasIndex = true;
			}

			if (!exists) {
				this.table.options.columns.push(col);
			}
		}
	};

	//generate blank headers
	HtmlTableImport.prototype._generateBlankHeaders = function (headers, rows) {
		for (var index = 0; index < headers.length; index++) {
			var header = headers[index],
			    col = { title: "", field: "col" + index };

			this.fieldIndex[index] = col.field;

			var width = header.getAttribute("width");

			if (width) {
				col.width = width;
			}

			this.table.options.columns.push(col);
		}
	};

	Tabulator.prototype.registerModule("htmlTableImport", HtmlTableImport);
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
		var _this36 = this;

		var self = this;

		var _loop2 = function _loop2(key) {

			if (_this36.actions[key]) {

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

		this.table.element.addEventListener("keydown", this.keyupBinding);

		this.table.element.addEventListener("keyup", this.keydownBinding);
	};

	Keybindings.prototype.clearBindings = function () {
		if (this.keyupBinding) {
			this.table.element.removeEventListener("keydown", this.keyupBinding);
		}

		if (this.keydownBinding) {
			this.table.element.removeEventListener("keyup", this.keydownBinding);
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
			    scrollMax = rowManager.element.scrollHeight;

			e.preventDefault();

			if (rowManager.displayRowsCount) {
				if (newPos >= 0) {
					rowManager.element.scrollTop = newPos;
				} else {
					rowManager.scrollToRow(rowManager.getDisplayRows()[0]);
				}
			}

			this.table.element.focus();
		},
		scrollPageDown: function scrollPageDown(e) {
			var rowManager = this.table.rowManager,
			    newPos = rowManager.scrollTop + rowManager.height,
			    scrollMax = rowManager.element.scrollHeight;

			e.preventDefault();

			if (rowManager.displayRowsCount) {
				if (newPos <= scrollMax) {
					rowManager.element.scrollTop = newPos;
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

			if (this.table.modExists("edit")) {
				cell = this.table.modules.edit.currentCell;

				if (cell) {
					e.preventDefault();
					cell.nav().prev();
				}
			}
		},

		navNext: function navNext(e) {
			var cell = false;

			if (this.table.modExists("edit")) {
				cell = this.table.modules.edit.currentCell;

				if (cell) {
					e.preventDefault();
					cell.nav().next();
				}
			}
		},

		navLeft: function navLeft(e) {
			var cell = false;

			if (this.table.modExists("edit")) {
				cell = this.table.modules.edit.currentCell;

				if (cell) {
					e.preventDefault();
					cell.nav().left();
				}
			}
		},

		navRight: function navRight(e) {
			var cell = false;

			if (this.table.modExists("edit")) {
				cell = this.table.modules.edit.currentCell;

				if (cell) {
					e.preventDefault();
					cell.nav().right();
				}
			}
		},

		navUp: function navUp(e) {
			var cell = false;

			if (this.table.modExists("edit")) {
				cell = this.table.modules.edit.currentCell;

				if (cell) {
					e.preventDefault();
					cell.nav().up();
				}
			}
		},

		navDown: function navDown(e) {
			var cell = false;

			if (this.table.modExists("edit")) {
				cell = this.table.modules.edit.currentCell;

				if (cell) {
					e.preventDefault();
					cell.nav().down();
				}
			}
		},

		undo: function undo(e) {
			var cell = false;
			if (this.table.options.history && this.table.modExists("history") && this.table.modExists("edit")) {

				cell = this.table.modules.edit.currentCell;

				if (!cell) {
					e.preventDefault();
					this.table.modules.history.undo();
				}
			}
		},

		redo: function redo(e) {
			var cell = false;
			if (this.table.options.history && this.table.modExists("history") && this.table.modExists("edit")) {

				cell = this.table.modules.edit.currentCell;

				if (!cell) {
					e.preventDefault();
					this.table.modules.history.redo();
				}
			}
		},

		copyToClipboard: function copyToClipboard(e) {
			if (!this.table.modules.edit.currentCell) {
				if (this.table.modExists("clipboard", true)) {
					this.table.modules.clipboard.copy(!this.table.options.selectable || this.table.options.selectable == "highlight" ? "active" : "selected", null, null, null, true);
				}
			}
		}
	};

	Tabulator.prototype.registerModule("keybindings", Keybindings);
	var MoveColumns = function MoveColumns(table) {
		this.table = table; //hold Tabulator object
		this.placeholderElement = this.createPlaceholderElement();
		this.hoverElement = false; //floating column header element
		this.checkTimeout = false; //click check timeout holder
		this.checkPeriod = 250; //period to wait on mousedown to consider this a move and not a click
		this.moving = false; //currently moving column
		this.toCol = false; //destination column
		this.toColAfter = false; //position of moving column relative to the desitnation column
		this.startX = 0; //starting position within header element
		this.autoScrollMargin = 40; //auto scroll on edge when within margin
		this.autoScrollStep = 5; //auto scroll distance in pixels
		this.autoScrollTimeout = false; //auto scroll timeout
		this.touchMove = false;

		this.moveHover = this.moveHover.bind(this);
		this.endMove = this.endMove.bind(this);
	};

	MoveColumns.prototype.createPlaceholderElement = function () {
		var el = document.createElement("div");

		el.classList.add("tabulator-col");
		el.classList.add("tabulator-col-placeholder");

		return el;
	};

	MoveColumns.prototype.initializeColumn = function (column) {
		var self = this,
		    config = {},
		    colEl;

		if (!column.modules.frozen) {

			colEl = column.getElement();

			config.mousemove = function (e) {
				if (column.parent === self.moving.parent) {
					if ((self.touchMove ? e.touches[0].pageX : e.pageX) - Tabulator.prototype.helpers.elOffset(colEl).left + self.table.columnManager.element.scrollLeft > column.getWidth() / 2) {
						if (self.toCol !== column || !self.toColAfter) {
							colEl.parentNode.insertBefore(self.placeholderElement, colEl.nextSibling);
							self.moveColumn(column, true);
						}
					} else {
						if (self.toCol !== column || self.toColAfter) {
							colEl.parentNode.insertBefore(self.placeholderElement, colEl);
							self.moveColumn(column, false);
						}
					}
				}
			}.bind(self);

			colEl.addEventListener("mousedown", function (e) {
				self.touchMove = false;
				if (e.which === 1) {
					self.checkTimeout = setTimeout(function () {
						self.startMove(e, column);
					}, self.checkPeriod);
				}
			});

			colEl.addEventListener("mouseup", function (e) {
				if (e.which === 1) {
					if (self.checkTimeout) {
						clearTimeout(self.checkTimeout);
					}
				}
			});

			self.bindTouchEvents(column);
		}

		column.modules.moveColumn = config;
	};

	MoveColumns.prototype.bindTouchEvents = function (column) {
		var self = this,
		    colEl = column.getElement(),
		    startXMove = false,
		    //shifting center position of the cell
		dir = false,
		    currentCol,
		    nextCol,
		    prevCol,
		    nextColWidth,
		    prevColWidth,
		    nextColWidthLast,
		    prevColWidthLast;

		colEl.addEventListener("touchstart", function (e) {
			self.checkTimeout = setTimeout(function () {
				self.touchMove = true;
				currentCol = column;
				nextCol = column.nextColumn();
				nextColWidth = nextCol ? nextCol.getWidth() / 2 : 0;
				prevCol = column.prevColumn();
				prevColWidth = prevCol ? prevCol.getWidth() / 2 : 0;
				nextColWidthLast = 0;
				prevColWidthLast = 0;
				startXMove = false;

				self.startMove(e, column);
			}, self.checkPeriod);
		});

		colEl.addEventListener("touchmove", function (e) {
			var halfCol, diff, moveToCol;

			if (self.moving) {
				self.moveHover(e);

				if (!startXMove) {
					startXMove = e.touches[0].pageX;
				}

				diff = e.touches[0].pageX - startXMove;

				if (diff > 0) {
					if (nextCol && diff - nextColWidthLast > nextColWidth) {
						moveToCol = nextCol;

						if (moveToCol !== column) {
							startXMove = e.touches[0].pageX;
							moveToCol.getElement().parentNode.insertBefore(self.placeholderElement, moveToCol.getElement().nextSibling);
							self.moveColumn(moveToCol, true);
						}
					}
				} else {
					if (prevCol && -diff - prevColWidthLast > prevColWidth) {
						moveToCol = prevCol;

						if (moveToCol !== column) {
							startXMove = e.touches[0].pageX;
							moveToCol.getElement().parentNode.insertBefore(self.placeholderElement, moveToCol.getElement());
							self.moveColumn(moveToCol, false);
						}
					}
				}

				if (moveToCol) {
					currentCol = moveToCol;
					nextCol = moveToCol.nextColumn();
					nextColWidthLast = nextColWidth;
					nextColWidth = nextCol ? nextCol.getWidth() / 2 : 0;
					prevCol = moveToCol.prevColumn();
					prevColWidthLast = prevColWidth;
					prevColWidth = prevCol ? prevCol.getWidth() / 2 : 0;
				}
			}
		});

		colEl.addEventListener("touchend", function (e) {
			if (self.checkTimeout) {
				clearTimeout(self.checkTimeout);
			}
			if (self.moving) {
				self.endMove(e);
			}
		});
	};

	MoveColumns.prototype.startMove = function (e, column) {
		var element = column.getElement();

		this.moving = column;
		this.startX = (this.touchMove ? e.touches[0].pageX : e.pageX) - Tabulator.prototype.helpers.elOffset(element).left;

		this.table.element.classList.add("tabulator-block-select");

		//create placeholder
		this.placeholderElement.style.width = column.getWidth() + "px";
		this.placeholderElement.style.height = column.getHeight() + "px";

		element.parentNode.insertBefore(this.placeholderElement, element);
		element.parentNode.removeChild(element);

		//create hover element
		this.hoverElement = element.cloneNode(true);
		this.hoverElement.classList.add("tabulator-moving");

		this.table.columnManager.getElement().appendChild(this.hoverElement);

		this.hoverElement.style.left = "0";
		this.hoverElement.style.bottom = "0";

		if (!this.touchMove) {
			this._bindMouseMove();

			document.body.addEventListener("mousemove", this.moveHover);
			document.body.addEventListener("mouseup", this.endMove);
		}

		this.moveHover(e);
	};

	MoveColumns.prototype._bindMouseMove = function () {
		this.table.columnManager.columnsByIndex.forEach(function (column) {
			if (column.modules.moveColumn.mousemove) {
				column.getElement().addEventListener("mousemove", column.modules.moveColumn.mousemove);
			}
		});
	};

	MoveColumns.prototype._unbindMouseMove = function () {
		this.table.columnManager.columnsByIndex.forEach(function (column) {
			if (column.modules.moveColumn.mousemove) {
				column.getElement().removeEventListener("mousemove", column.modules.moveColumn.mousemove);
			}
		});
	};

	MoveColumns.prototype.moveColumn = function (column, after) {
		var movingCells = this.moving.getCells();

		this.toCol = column;
		this.toColAfter = after;

		if (after) {
			column.getCells().forEach(function (cell, i) {
				var cellEl = cell.getElement();
				cellEl.parentNode.insertBefore(movingCells[i].getElement(), cellEl.nextSibling);
			});
		} else {
			column.getCells().forEach(function (cell, i) {
				var cellEl = cell.getElement();
				cellEl.parentNode.insertBefore(movingCells[i].getElement(), cellEl);
			});
		}
	};

	MoveColumns.prototype.endMove = function (e) {
		if (e.which === 1 || this.touchMove) {
			this._unbindMouseMove();

			this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling);
			this.placeholderElement.parentNode.removeChild(this.placeholderElement);
			this.hoverElement.parentNode.removeChild(this.hoverElement);

			this.table.element.classList.remove("tabulator-block-select");

			if (this.toCol) {
				this.table.columnManager.moveColumn(this.moving, this.toCol, this.toColAfter);
			}

			this.moving = false;
			this.toCol = false;
			this.toColAfter = false;

			if (!this.touchMove) {
				document.body.removeEventListener("mousemove", this.moveHover);
				document.body.removeEventListener("mouseup", this.endMove);
			}
		}
	};

	MoveColumns.prototype.moveHover = function (e) {
		var self = this,
		    columnHolder = self.table.columnManager.getElement(),
		    scrollLeft = columnHolder.scrollLeft,
		    xPos = (self.touchMove ? e.touches[0].pageX : e.pageX) - Tabulator.prototype.helpers.elOffset(columnHolder).left + scrollLeft,
		    scrollPos;

		self.hoverElement.style.left = xPos - self.startX + "px";

		if (xPos - scrollLeft < self.autoScrollMargin) {
			if (!self.autoScrollTimeout) {
				self.autoScrollTimeout = setTimeout(function () {
					scrollPos = Math.max(0, scrollLeft - 5);
					self.table.rowManager.getElement().scrollLeft = scrollPos;
					self.autoScrollTimeout = false;
				}, 1);
			}
		}

		if (scrollLeft + columnHolder.clientWidth - xPos < self.autoScrollMargin) {
			if (!self.autoScrollTimeout) {
				self.autoScrollTimeout = setTimeout(function () {
					scrollPos = Math.min(columnHolder.clientWidth, scrollLeft + 5);
					self.table.rowManager.getElement().scrollLeft = scrollPos;
					self.autoScrollTimeout = false;
				}, 1);
			}
		}
	};

	Tabulator.prototype.registerModule("moveColumn", MoveColumns);
	var MoveRows = function MoveRows(table) {

		this.table = table; //hold Tabulator object
		this.placeholderElement = this.createPlaceholderElement();
		this.hoverElement = false; //floating row header element
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

		this.touchMove = false;

		this.connection = false;
		this.connections = [];

		this.connectedTable = false;
		this.connectedRow = false;
	};

	MoveRows.prototype.createPlaceholderElement = function () {
		var el = document.createElement("div");

		el.classList.add("tabulator-row");
		el.classList.add("tabulator-row-placeholder");

		return el;
	};

	MoveRows.prototype.initialize = function (handle) {
		this.connection = this.table.options.movableRowsConnectedTables;
	};

	MoveRows.prototype.setHandle = function (handle) {
		this.hasHandle = handle;
	};

	MoveRows.prototype.initializeGroupHeader = function (group) {
		var self = this,
		    config = {},
		    rowEl;

		//inter table drag drop
		config.mouseup = function (e) {
			self.tableRowDrop(e, row);
		}.bind(self);

		//same table drag drop
		config.mousemove = function (e) {
			if (e.pageY - Tabulator.prototype.helpers.elOffset(group.element).top + self.table.rowManager.element.scrollTop > group.getHeight() / 2) {
				if (self.toRow !== group || !self.toRowAfter) {
					var rowEl = group.getElement();
					rowEl.parentNode.insertBefore(self.placeholderElement, rowEl.nextSibling);
					self.moveRow(group, true);
				}
			} else {
				if (self.toRow !== group || self.toRowAfter) {
					var rowEl = group.getElement();
					if (rowEl.previousSibling) {
						rowEl.parentNode.insertBefore(self.placeholderElement, rowEl);
						self.moveRow(group, false);
					}
				}
			}
		}.bind(self);

		group.modules.moveRow = config;
	};

	MoveRows.prototype.initializeRow = function (row) {
		var self = this,
		    config = {},
		    rowEl;

		//inter table drag drop
		config.mouseup = function (e) {
			self.tableRowDrop(e, row);
		}.bind(self);

		//same table drag drop
		config.mousemove = function (e) {
			if (e.pageY - Tabulator.prototype.helpers.elOffset(row.element).top + self.table.rowManager.element.scrollTop > row.getHeight() / 2) {
				if (self.toRow !== row || !self.toRowAfter) {
					var rowEl = row.getElement();
					rowEl.parentNode.insertBefore(self.placeholderElement, rowEl.nextSibling);
					self.moveRow(row, true);
				}
			} else {
				if (self.toRow !== row || self.toRowAfter) {
					var rowEl = row.getElement();
					rowEl.parentNode.insertBefore(self.placeholderElement, rowEl);
					self.moveRow(row, false);
				}
			}
		}.bind(self);

		if (!this.hasHandle) {

			rowEl = row.getElement();

			rowEl.addEventListener("mousedown", function (e) {
				if (e.which === 1) {
					self.checkTimeout = setTimeout(function () {
						self.startMove(e, row);
					}, self.checkPeriod);
				}
			});

			rowEl.addEventListener("mouseup", function (e) {
				if (e.which === 1) {
					if (self.checkTimeout) {
						clearTimeout(self.checkTimeout);
					}
				}
			});

			this.bindTouchEvents(row, row.getElement());
		}

		row.modules.moveRow = config;
	};

	MoveRows.prototype.initializeCell = function (cell) {
		var self = this,
		    cellEl = cell.getElement();

		cellEl.addEventListener("mousedown", function (e) {
			if (e.which === 1) {
				self.checkTimeout = setTimeout(function () {
					self.startMove(e, cell.row);
				}, self.checkPeriod);
			}
		});

		cellEl.addEventListener("mouseup", function (e) {
			if (e.which === 1) {
				if (self.checkTimeout) {
					clearTimeout(self.checkTimeout);
				}
			}
		});

		this.bindTouchEvents(cell.row, cell.getElement());
	};

	MoveRows.prototype.bindTouchEvents = function (row, element) {
		var self = this,
		    startYMove = false,
		    //shifting center position of the cell
		dir = false,
		    currentRow,
		    nextRow,
		    prevRow,
		    nextRowHeight,
		    prevRowHeight,
		    nextRowHeightLast,
		    prevRowHeightLast;

		element.addEventListener("touchstart", function (e) {
			self.checkTimeout = setTimeout(function () {
				self.touchMove = true;
				currentRow = row;
				nextRow = row.nextRow();
				nextRowHeight = nextRow ? nextRow.getHeight() / 2 : 0;
				prevRow = row.prevRow();
				prevRowHeight = prevRow ? prevRow.getHeight() / 2 : 0;
				nextRowHeightLast = 0;
				prevRowHeightLast = 0;
				startYMove = false;

				self.startMove(e, row);
			}, self.checkPeriod);
		});
		this.moving, this.toRow, this.toRowAfter;
		element.addEventListener("touchmove", function (e) {

			var halfCol, diff, moveToRow;

			if (self.moving) {
				e.preventDefault();

				self.moveHover(e);

				if (!startYMove) {
					startYMove = e.touches[0].pageY;
				}

				diff = e.touches[0].pageY - startYMove;

				if (diff > 0) {
					if (nextRow && diff - nextRowHeightLast > nextRowHeight) {
						moveToRow = nextRow;

						if (moveToRow !== row) {
							startYMove = e.touches[0].pageY;
							moveToRow.getElement().parentNode.insertBefore(self.placeholderElement, moveToRow.getElement().nextSibling);
							self.moveRow(moveToRow, true);
						}
					}
				} else {
					if (prevRow && -diff - prevRowHeightLast > prevRowHeight) {
						moveToRow = prevRow;

						if (moveToRow !== row) {
							startYMove = e.touches[0].pageY;
							moveToRow.getElement().parentNode.insertBefore(self.placeholderElement, moveToRow.getElement());
							self.moveRow(moveToRow, false);
						}
					}
				}

				if (moveToRow) {
					currentRow = moveToRow;
					nextRow = moveToRow.nextRow();
					nextRowHeightLast = nextRowHeight;
					nextRowHeight = nextRow ? nextRow.getHeight() / 2 : 0;
					prevRow = moveToRow.prevRow();
					prevRowHeightLast = prevRowHeight;
					prevRowHeight = prevRow ? prevRow.getHeight() / 2 : 0;
				}
			}
		});

		element.addEventListener("touchend", function (e) {
			if (self.checkTimeout) {
				clearTimeout(self.checkTimeout);
			}
			if (self.moving) {
				self.endMove(e);
				self.touchMove = false;
			}
		});
	};

	MoveRows.prototype._bindMouseMove = function () {
		var self = this;

		self.table.rowManager.getDisplayRows().forEach(function (row) {
			if ((row.type === "row" || row.type === "group") && row.modules.moveRow.mousemove) {
				row.getElement().addEventListener("mousemove", row.modules.moveRow.mousemove);
			}
		});
	};

	MoveRows.prototype._unbindMouseMove = function () {
		var self = this;

		self.table.rowManager.getDisplayRows().forEach(function (row) {
			if ((row.type === "row" || row.type === "group") && row.modules.moveRow.mousemove) {
				row.getElement().removeEventListener("mousemove", row.modules.moveRow.mousemove);
			}
		});
	};

	MoveRows.prototype.startMove = function (e, row) {
		var element = row.getElement();

		this.setStartPosition(e, row);

		this.moving = row;

		this.table.element.classList.add("tabulator-block-select");

		//create placeholder
		this.placeholderElement.style.width = row.getWidth() + "px";
		this.placeholderElement.style.height = row.getHeight() + "px";

		if (!this.connection) {
			element.parentNode.insertBefore(this.placeholderElement, element);
			element.parentNode.removeChild(element);
		} else {
			this.table.element.classList.add("tabulator-movingrow-sending");
			this.connectToTables(row);
		}

		//create hover element
		this.hoverElement = element.cloneNode(true);
		this.hoverElement.classList.add("tabulator-moving");

		if (this.connection) {
			document.body.appendChild(this.hoverElement);
			this.hoverElement.style.left = "0";
			this.hoverElement.style.top = "0";
			this.hoverElement.style.width = this.table.element.clientWidth + "px";
			this.hoverElement.style.whiteSpace = "nowrap";
			this.hoverElement.style.overflow = "hidden";
			this.hoverElement.style.pointerEvents = "none";
		} else {
			this.table.rowManager.getTableElement().appendChild(this.hoverElement);

			this.hoverElement.style.left = "0";
			this.hoverElement.style.top = "0";

			this._bindMouseMove();
		}

		document.body.addEventListener("mousemove", this.moveHover);
		document.body.addEventListener("mouseup", this.endMove);

		this.moveHover(e);
	};

	MoveRows.prototype.setStartPosition = function (e, row) {
		var pageX = this.touchMove ? e.touches[0].pageX : e.pageX,
		    pageY = this.touchMove ? e.touches[0].pageY : e.pageY,
		    element,
		    position;

		element = row.getElement();
		if (this.connection) {
			position = element.getBoundingClientRect();

			this.startX = position.left - pageX + window.pageXOffset;
			this.startY = position.top - pageY + window.pageYOffset;
		} else {
			this.startY = pageY - element.getBoundingClientRect().top;
		}
	};

	MoveRows.prototype.endMove = function (e) {
		if (!e || e.which === 1 || this.touchMove) {
			this._unbindMouseMove();

			if (!this.connection) {
				this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling);
				this.placeholderElement.parentNode.removeChild(this.placeholderElement);
			}

			this.hoverElement.parentNode.removeChild(this.hoverElement);

			this.table.element.classList.remove("tabulator-block-select");

			if (this.toRow) {
				this.table.rowManager.moveRow(this.moving, this.toRow, this.toRowAfter);
			}

			this.moving = false;
			this.toRow = false;
			this.toRowAfter = false;

			document.body.removeEventListener("mousemove", this.moveHover);
			document.body.removeEventListener("mouseup", this.endMove);

			if (this.connection) {
				this.table.element.classList.remove("tabulator-movingrow-sending");
				this.disconnectFromTables();
			}
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
		    scrollTop = rowHolder.scrollTop,
		    yPos = (this.touchMove ? e.touches[0].pageY : e.pageY) - rowHolder.getBoundingClientRect().top + scrollTop,
		    scrollPos;

		this.hoverElement.style.top = yPos - this.startY + "px";
	};

	MoveRows.prototype.moveHoverConnections = function (e) {
		this.hoverElement.style.left = this.startX + (this.touchMove ? e.touches[0].pageX : e.pageX) + "px";
		this.hoverElement.style.top = this.startY + (this.touchMove ? e.touches[0].pageY : e.pageY) + "px";
	};

	//establish connection with other tables
	MoveRows.prototype.connectToTables = function (row) {
		var self = this,
		    connections = this.table.modules.comms.getConnections(this.connection);

		this.table.options.movableRowsSendingStart.call(this.table, connections);

		this.table.modules.comms.send(this.connection, "moveRow", "connect", {
			row: row
		});
	};

	//disconnect from other tables
	MoveRows.prototype.disconnectFromTables = function () {
		var self = this,
		    connections = this.table.modules.comms.getConnections(this.connection);

		this.table.options.movableRowsSendingStop.call(this.table, connections);

		this.table.modules.comms.send(this.connection, "moveRow", "disconnect");
	};

	//accept incomming connection
	MoveRows.prototype.connect = function (table, row) {
		var self = this;
		if (!this.connectedTable) {
			this.connectedTable = table;
			this.connectedRow = row;

			this.table.element.classList.add("tabulator-movingrow-receiving");

			self.table.rowManager.getDisplayRows().forEach(function (row) {
				if (row.type === "row" && row.modules.moveRow && row.modules.moveRow.mouseup) {
					row.getElement().addEventListener("mouseup", row.modules.moveRow.mouseup);
				}
			});

			self.tableRowDropEvent = self.tableRowDrop.bind(self);

			self.table.element.addEventListener("mouseup", self.tableRowDropEvent);

			this.table.options.movableRowsReceivingStart.call(this.table, row, table);

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

			this.table.element.classList.remove("tabulator-movingrow-receiving");

			self.table.rowManager.getDisplayRows().forEach(function (row) {
				if (row.type === "row" && row.modules.moveRow && row.modules.moveRow.mouseup) {
					row.getElement().removeEventListener("mouseup", row.modules.moveRow.mouseup);
				}
			});

			self.table.element.removeEventListener("mouseup", self.tableRowDropEvent);

			this.table.options.movableRowsReceivingStop.call(this.table, table);
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

			this.table.options.movableRowsSent.call(this.table, this.moving.getComponent(), row ? row.getComponent() : undefined, table);
		} else {
			this.table.options.movableRowsSentFailed.call(this.table, this.moving.getComponent(), row ? row.getComponent() : undefined, table);
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
			this.table.options.movableRowsReceived.call(this.table, this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
		} else {
			this.table.options.movableRowsReceivedFailed.call(this.table, this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
		}

		this.table.modules.comms.send(this.connectedTable, "moveRow", "dropcomplete", {
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

	Tabulator.prototype.registerModule("moveRow", MoveRows);
	var Mutator = function Mutator(table) {
		this.table = table; //hold Tabulator object
		this.allowedTypes = ["", "data", "edit", "clipboard"]; //list of muatation types
		this.enabled = true;
	};

	//initialize column mutator
	Mutator.prototype.initializeColumn = function (column) {
		var self = this,
		    match = false,
		    config = {};

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
			column.modules.mutate = config;
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
	Mutator.prototype.transformRow = function (data, type, update) {
		var self = this,
		    key = "mutator" + (type.charAt(0).toUpperCase() + type.slice(1)),
		    value;

		if (this.enabled) {

			self.table.columnManager.traverse(function (column) {
				var mutator, params, component;

				if (column.modules.mutate) {
					mutator = column.modules.mutate[key] || column.modules.mutate.mutator || false;

					if (mutator) {
						value = column.getFieldValue(data);

						if (!update || update && typeof value !== "undefined") {
							component = column.getComponent();
							params = typeof mutator.params === "function" ? mutator.params(value, data, type, component) : mutator.params;
							column.setFieldValue(data, mutator.mutator(value, data, type, params, component));
						}
					}
				}
			});
		}

		return data;
	};

	//apply mutator to new cell value
	Mutator.prototype.transformCell = function (cell, value) {
		var mutator = cell.column.modules.mutate.mutatorEdit || cell.column.modules.mutate.mutator || false;

		if (mutator) {
			return mutator.mutator(value, cell.row.getData(), "edit", mutator.params, cell.getComponent());
		} else {
			return value;
		}
	};

	Mutator.prototype.enable = function () {
		this.enabled = true;
	};

	Mutator.prototype.disable = function () {
		this.enabled = false;
	};

	//default mutators
	Mutator.prototype.mutators = {};

	Tabulator.prototype.registerModule("mutator", Mutator);
	var Page = function Page(table) {

		this.table = table; //hold Tabulator object

		this.mode = "local";
		this.progressiveLoad = false;

		this.size = 0;
		this.page = 1;
		this.count = 5;
		this.max = 1;

		this.displayIndex = 0; //index in display pipeline

		this.pageSizes = [];

		this.createElements();
	};

	Page.prototype.createElements = function () {

		var button;

		this.element = document.createElement("span");
		this.element.classList.add("tabulator-paginator");

		this.pagesElement = document.createElement("span");
		this.pagesElement.classList.add("tabulator-pages");

		button = document.createElement("button");
		button.classList.add("tabulator-page");
		button.setAttribute("type", "button");
		button.setAttribute("role", "button");
		button.setAttribute("aria-label", "");
		button.setAttribute("title", "");

		this.firstBut = button.cloneNode(true);
		this.firstBut.setAttribute("data-page", "first");

		this.prevBut = button.cloneNode(true);
		this.prevBut.setAttribute("data-page", "prev");

		this.nextBut = button.cloneNode(true);
		this.nextBut.setAttribute("data-page", "next");

		this.lastBut = button.cloneNode(true);
		this.lastBut.setAttribute("data-page", "last");

		if (this.table.options.paginationSizeSelector) {
			this.pageSizeSelect = document.createElement("select");
			this.pageSizeSelect.classList.add("tabulator-page-size");
		}
	};

	Page.prototype.generatePageSizeSelectList = function () {
		var _this37 = this;

		var pageSizes = [];

		if (this.pageSizeSelect) {

			if (Array.isArray(this.table.options.paginationSizeSelector)) {
				pageSizes = this.table.options.paginationSizeSelector;
				this.pageSizes = pageSizes;

				if (this.pageSizes.indexOf(this.size) == -1) {
					pageSizes.unshift(this.size);
				}
			} else {

				if (this.pageSizes.indexOf(this.size) == -1) {
					pageSizes = [];

					for (var i = 1; i < 5; i++) {
						pageSizes.push(this.size * i);
					}

					this.pageSizes = pageSizes;
				} else {
					pageSizes = this.pageSizes;
				}
			}

			while (this.pageSizeSelect.firstChild) {
				this.pageSizeSelect.removeChild(this.pageSizeSelect.firstChild);
			}pageSizes.forEach(function (item) {
				var itemEl = document.createElement("option");
				itemEl.value = item;
				itemEl.innerHTML = item;

				_this37.pageSizeSelect.appendChild(itemEl);
			});

			this.pageSizeSelect.value = this.size;
		}
	};

	//setup pageination
	Page.prototype.initialize = function (hidden) {
		var self = this,
		    pageSelectLabel;

		//update param names
		for (var key in self.table.options.paginationDataSent) {
			self.paginationDataSentNames[key] = self.table.options.paginationDataSent[key];
		}

		for (var _key2 in self.table.options.paginationDataReceived) {
			self.paginationDataReceivedNames[_key2] = self.table.options.paginationDataReceived[_key2];
		}

		//build pagination element

		//bind localizations
		self.table.modules.localize.bind("pagination|first", function (value) {
			self.firstBut.innerHTML = value;
		});

		self.table.modules.localize.bind("pagination|first_title", function (value) {
			self.firstBut.setAttribute("aria-label", value);
			self.firstBut.setAttribute("title", value);
		});

		self.table.modules.localize.bind("pagination|prev", function (value) {
			self.prevBut.innerHTML = value;
		});

		self.table.modules.localize.bind("pagination|prev_title", function (value) {
			self.prevBut.setAttribute("aria-label", value);
			self.prevBut.setAttribute("title", value);
		});

		self.table.modules.localize.bind("pagination|next", function (value) {
			self.nextBut.innerHTML = value;
		});

		self.table.modules.localize.bind("pagination|next_title", function (value) {
			self.nextBut.setAttribute("aria-label", value);
			self.nextBut.setAttribute("title", value);
		});

		self.table.modules.localize.bind("pagination|last", function (value) {
			self.lastBut.innerHTML = value;
		});

		self.table.modules.localize.bind("pagination|last_title", function (value) {
			self.lastBut.setAttribute("aria-label", value);
			self.lastBut.setAttribute("title", value);
		});

		//click bindings
		self.firstBut.addEventListener("click", function () {
			self.setPage(1);
		});

		self.prevBut.addEventListener("click", function () {
			self.previousPage();
		});

		self.nextBut.addEventListener("click", function () {
			self.nextPage().then(function () {}).catch(function () {});
		});

		self.lastBut.addEventListener("click", function () {
			self.setPage(self.max);
		});

		if (self.table.options.paginationElement) {
			self.element = self.table.options.paginationElement;
		}

		if (this.pageSizeSelect) {
			pageSelectLabel = document.createElement("label");

			self.table.modules.localize.bind("pagination|page_size", function (value) {
				self.pageSizeSelect.setAttribute("aria-label", value);
				self.pageSizeSelect.setAttribute("title", value);
				pageSelectLabel.innerHTML = value;
			});

			self.element.appendChild(pageSelectLabel);
			self.element.appendChild(self.pageSizeSelect);

			self.pageSizeSelect.addEventListener("change", function (e) {
				self.setPageSize(self.pageSizeSelect.value);
				self.setPage(1).then(function () {}).catch(function () {});
			});
		}

		//append to DOM
		self.element.appendChild(self.firstBut);
		self.element.appendChild(self.prevBut);
		self.element.appendChild(self.pagesElement);
		self.element.appendChild(self.nextBut);
		self.element.appendChild(self.lastBut);

		if (!self.table.options.paginationElement && !hidden) {
			self.table.footerManager.append(self.element, self);
		}

		//set default values
		self.mode = self.table.options.pagination;
		self.size = self.table.options.paginationSize || Math.floor(self.table.rowManager.getElement().clientHeight / 24);
		self.count = self.table.options.paginationButtonCount;

		self.generatePageSizeSelectList();
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

		max = parseInt(max);

		this.max = max || 1;

		if (this.page > this.max) {
			this.page = this.max;
			this.trigger();
		}
	};

	//set current page number
	Page.prototype.setPage = function (page) {
		var _this38 = this;

		return new Promise(function (resolve, reject) {

			page = parseInt(page);

			if (page > 0 && page <= _this38.max) {
				_this38.page = page;
				_this38.trigger().then(function () {
					resolve();
				}).catch(function () {
					reject();
				});
			} else {
				console.warn("Pagination Error - Requested page is out of range of 1 - " + _this38.max + ":", page);
				reject();
			}
		});
	};

	Page.prototype.setPageToRow = function (row) {
		var _this39 = this;

		return new Promise(function (resolve, reject) {

			var rows = _this39.table.rowManager.getDisplayRows(_this39.displayIndex - 1);
			var index = rows.indexOf(row);

			if (index > -1) {
				var page = Math.ceil((index + 1) / _this39.size);

				_this39.setPage(page).then(function () {
					resolve();
				}).catch(function () {
					reject();
				});
			} else {
				console.warn("Pagination Error - Requested row is not visible");
				reject();
			}
		});
	};

	Page.prototype.setPageSize = function (size) {
		size = parseInt(size);

		if (size > 0) {
			this.size = size;
		}

		if (this.pageSizeSelect) {
			// this.pageSizeSelect.value = size;
			this.generatePageSizeSelectList();
		}
	};

	//setup the pagination buttons
	Page.prototype._setPageButtons = function () {
		var self = this;

		var leftSize = Math.floor((this.count - 1) / 2);
		var rightSize = Math.ceil((this.count - 1) / 2);
		var min = this.max - this.page + leftSize + 1 < this.count ? this.max - this.count + 1 : Math.max(this.page - leftSize, 1);
		var max = this.page <= rightSize ? Math.min(this.count, this.max) : Math.min(this.page + rightSize, this.max);

		while (self.pagesElement.firstChild) {
			self.pagesElement.removeChild(self.pagesElement.firstChild);
		}if (self.page == 1) {
			self.firstBut.disabled = true;
			self.prevBut.disabled = true;
		} else {
			self.firstBut.disabled = false;
			self.prevBut.disabled = false;
		}

		if (self.page == self.max) {
			self.lastBut.disabled = true;
			self.nextBut.disabled = true;
		} else {
			self.lastBut.disabled = false;
			self.nextBut.disabled = false;
		}

		for (var i = min; i <= max; i++) {
			if (i > 0 && i <= self.max) {
				self.pagesElement.appendChild(self._generatePageButton(i));
			}
		}

		this.footerRedraw();
	};

	Page.prototype._generatePageButton = function (page) {
		var self = this,
		    button = document.createElement("button");

		button.classList.add("tabulator-page");
		if (page == self.page) {
			button.classList.add("active");
		}

		button.setAttribute("type", "button");
		button.setAttribute("role", "button");
		button.setAttribute("aria-label", "Show Page " + page);
		button.setAttribute("title", "Show Page " + page);
		button.setAttribute("data-page", page);
		button.textContent = page;

		button.addEventListener("click", function (e) {
			self.setPage(page);
		});

		return button;
	};

	//previous page
	Page.prototype.previousPage = function () {
		var _this40 = this;

		return new Promise(function (resolve, reject) {
			if (_this40.page > 1) {
				_this40.page--;
				_this40.trigger().then(function () {
					resolve();
				}).catch(function () {
					reject();
				});
			} else {
				console.warn("Pagination Error - Previous page would be less than page 1:", 0);
				reject();
			}
		});
	};

	//next page
	Page.prototype.nextPage = function () {
		var _this41 = this;

		return new Promise(function (resolve, reject) {
			if (_this41.page < _this41.max) {
				_this41.page++;
				_this41.trigger().then(function () {
					resolve();
				}).catch(function () {
					reject();
				});
			} else {
				if (!_this41.progressiveLoad) {
					console.warn("Pagination Error - Next page would be greater than maximum page of " + _this41.max + ":", _this41.max + 1);
				}
				reject();
			}
		});
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
		var _this42 = this;

		var left;

		return new Promise(function (resolve, reject) {

			switch (_this42.mode) {
				case "local":
					left = _this42.table.rowManager.scrollLeft;

					_this42.table.rowManager.refreshActiveData("page");
					_this42.table.rowManager.scrollHorizontal(left);

					_this42.table.options.pageLoaded.call(_this42.table, _this42.getPage());
					resolve();
					break;

				case "remote":
				case "progressive_load":
				case "progressive_scroll":
					_this42.table.modules.ajax.blockActiveRequest();
					_this42._getRemotePage().then(function () {
						resolve();
					}).catch(function () {
						reject();
					});
					break;

				default:
					console.warn("Pagination Error - no such pagination mode:", _this42.mode);
					reject();
			}
		});
	};

	Page.prototype._getRemotePage = function () {
		var _this43 = this;

		var self = this,
		    oldParams,
		    pageParams;

		return new Promise(function (resolve, reject) {

			if (!self.table.modExists("ajax", true)) {
				reject();
			}

			//record old params and restore after request has been made
			oldParams = Tabulator.prototype.helpers.deepClone(self.table.modules.ajax.getParams() || {});
			pageParams = self.table.modules.ajax.getParams();

			//configure request params
			pageParams[_this43.paginationDataSentNames.page] = self.page;

			//set page size if defined
			if (_this43.size) {
				pageParams[_this43.paginationDataSentNames.size] = _this43.size;
			}

			//set sort data if defined
			if (_this43.table.options.ajaxSorting && _this43.table.modExists("sort")) {
				var sorters = self.table.modules.sort.getSort();

				sorters.forEach(function (item) {
					delete item.column;
				});

				pageParams[_this43.paginationDataSentNames.sorters] = sorters;
			}

			//set filter data if defined
			if (_this43.table.options.ajaxFiltering && _this43.table.modExists("filter")) {
				var filters = self.table.modules.filter.getFilters(true, true);
				pageParams[_this43.paginationDataSentNames.filters] = filters;
			}

			self.table.modules.ajax.setParams(pageParams);

			self.table.modules.ajax.sendRequest(_this43.progressiveLoad).then(function (data) {
				self._parseRemoteData(data);
				resolve();
			}).catch(function (e) {
				reject();
			});

			self.table.modules.ajax.setParams(oldParams);
		});
	};

	Page.prototype._parseRemoteData = function (data) {
		var self = this,
		    left,
		    data,
		    margin;

		if (typeof data[this.paginationDataReceivedNames.last_page] === "undefined") {
			console.warn("Remote Pagination Error - Server response missing '" + this.paginationDataReceivedNames.last_page + "' property");
		}

		if (data[this.paginationDataReceivedNames.data]) {
			this.max = parseInt(data[this.paginationDataReceivedNames.last_page]) || 1;

			if (this.progressiveLoad) {
				switch (this.mode) {
					case "progressive_load":
						this.table.rowManager.addRows(data[this.paginationDataReceivedNames.data]);
						if (this.page < this.max) {
							setTimeout(function () {
								self.nextPage().then(function () {}).catch(function () {});
							}, self.table.options.ajaxProgressiveLoadDelay);
						}
						break;

					case "progressive_scroll":
						data = this.table.rowManager.getData().concat(data[this.paginationDataReceivedNames.data]);

						this.table.rowManager.setData(data, true);

						margin = this.table.options.ajaxProgressiveLoadScrollMargin || this.table.rowManager.element.clientHeight * 2;

						if (self.table.rowManager.element.scrollHeight <= self.table.rowManager.element.clientHeight + margin) {
							self.nextPage().then(function () {}).catch(function () {});
						}
						break;
				}
			} else {
				left = this.table.rowManager.scrollLeft;

				this.table.rowManager.setData(data[this.paginationDataReceivedNames.data]);

				this.table.rowManager.scrollHorizontal(left);

				this.table.columnManager.scrollHorizontal(left);

				this.table.options.pageLoaded.call(this.table, this.getPage());
			}
		} else {
			console.warn("Remote Pagination Error - Server response missing '" + this.paginationDataReceivedNames.data + "' property");
		}
	};

	//handle the footer element being redrawn
	Page.prototype.footerRedraw = function () {
		var footer = this.table.footerManager.element;

		if (Math.ceil(footer.clientWidth) - footer.scrollWidth < 0) {
			this.pagesElement.style.display = 'none';
		} else {
			this.pagesElement.style.display = '';

			if (Math.ceil(footer.clientWidth) - footer.scrollWidth < 0) {
				this.pagesElement.style.display = 'none';
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

	Tabulator.prototype.registerModule("page", Page);

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
		this.id = "tabulator-" + (id || this.table.element.getAttribute("id") || "");
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
				data = this.table.modules.filter.getFilters();
				break;

			case "sort":
				data = this.validateSorters(this.table.modules.sort.getSort());
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

	Tabulator.prototype.registerModule("persistence", Persistence);

	var ReactiveData = function ReactiveData(table) {
		this.table = table; //hold Tabulator object
		this.data = false;
		this.blocked = false; //block reactivity while performing update
		this.origFuncs = {}; // hold original data array functions to allow replacement after data is done with
		this.currentVersion = 0;
	};

	ReactiveData.prototype.watchData = function (data) {
		var self = this,
		    pushFunc,
		    version;

		this.currentVersion++;

		version = this.currentVersion;

		self.unwatchData();

		self.data = data;

		//override array push function
		self.origFuncs.push = data.push;

		Object.defineProperty(self.data, "push", {
			enumerable: false,
			configurable: true,
			value: function value() {
				var args = Array.from(arguments);

				if (!self.blocked && version === self.currentVersion) {
					args.forEach(function (arg) {
						self.table.rowManager.addRowActual(arg, false);
					});
				}

				return self.origFuncs.push.apply(data, arguments);
			}
		});

		//override array unshift function
		self.origFuncs.unshift = data.unshift;

		Object.defineProperty(self.data, "unshift", {
			enumerable: false,
			configurable: true,
			value: function value() {
				var args = Array.from(arguments);

				if (!self.blocked && version === self.currentVersion) {
					args.forEach(function (arg) {
						self.table.rowManager.addRowActual(arg, true);
					});
				}

				return self.origFuncs.unshift.apply(data, arguments);
			}
		});

		//override array shift function
		self.origFuncs.shift = data.shift;

		Object.defineProperty(self.data, "shift", {
			enumerable: false,
			configurable: true,
			value: function value() {
				var row;

				if (!self.blocked && version === self.currentVersion) {
					if (self.data.length) {
						row = self.table.rowManager.getRowFromDataObject(self.data[0]);

						if (row) {
							row.deleteActual();
						}
					}
				}

				return self.origFuncs.shift.call(data);
			}
		});

		//override array pop function
		self.origFuncs.pop = data.pop;

		Object.defineProperty(self.data, "pop", {
			enumerable: false,
			configurable: true,
			value: function value() {
				var row;
				if (!self.blocked && version === self.currentVersion) {
					if (self.data.length) {
						row = self.table.rowManager.getRowFromDataObject(self.data[self.data.length - 1]);

						if (row) {
							row.deleteActual();
						}
					}
				}
				return self.origFuncs.pop.call(data);
			}
		});

		//override array splice function
		self.origFuncs.splice = data.splice;

		Object.defineProperty(self.data, "splice", {
			enumerable: false,
			configurable: true,
			value: function value() {
				var args = Array.from(arguments),
				    start = args[0] < 0 ? data.length + args[0] : args[0],
				    end = args[1],
				    newRows = args[2] ? args.slice(2) : false,
				    startRow;

				if (!self.blocked && version === self.currentVersion) {

					//add new rows
					if (newRows) {
						startRow = data[start] ? self.table.rowManager.getRowFromDataObject(data[start]) : false;

						if (startRow) {
							newRows.forEach(function (rowData) {
								self.table.rowManager.addRowActual(rowData, true, startRow, true);
							});
						} else {
							newRows = newRows.slice().reverse();

							newRows.forEach(function (rowData) {
								self.table.rowManager.addRowActual(rowData, true, false, true);
							});
						}
					}

					//delete removed rows
					if (end !== 0) {
						var oldRows = data.slice(start, typeof args[1] === "undefined" ? args[1] : start + end);

						oldRows.forEach(function (rowData, i) {
							var row = self.table.rowManager.getRowFromDataObject(rowData);

							if (row) {
								row.deleteActual(i !== oldRows.length - 1);
							}
						});
					}

					if (newRows || end !== 0) {
						self.table.rowManager.reRenderInPosition();
					}
				}

				return self.origFuncs.splice.apply(data, arguments);
			}
		});
	};

	ReactiveData.prototype.unwatchData = function () {
		if (this.data !== false) {
			for (var key in this.origFuncs) {
				Object.defineProperty(this.data, key, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: this.origFuncs.key
				});
			}
		}
	};

	ReactiveData.prototype.watchRow = function (row) {
		var self = this,
		    data = row.getData();

		this.blocked = true;

		for (var key in data) {
			this.watchKey(row, data, key);
		}

		this.blocked = false;
	};

	ReactiveData.prototype.watchKey = function (row, data, key) {
		var self = this,
		    props = Object.getOwnPropertyDescriptor(data, key),
		    value = data[key],
		    version = this.currentVersion;

		Object.defineProperty(data, key, {
			set: function set(newValue) {
				value = newValue;
				if (!self.blocked && version === self.currentVersion) {
					var update = {};
					update[key] = newValue;
					row.updateData(update);
				}

				if (props.set) {
					props.set(newValue);
				}
			},
			get: function get() {

				if (props.get) {
					props.get();
				}

				return value;
			}
		});
	};

	ReactiveData.prototype.unwatchRow = function (row) {
		var data = row.getData();

		for (var key in data) {
			Object.defineProperty(data, key, {
				value: data[key]
			});
		}
	};

	ReactiveData.prototype.block = function () {
		this.blocked = true;
	};

	ReactiveData.prototype.unblock = function () {
		this.blocked = false;
	};

	Tabulator.prototype.registerModule("reactiveData", ReactiveData);

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
			column.modules.resize = { variableHeight: variableHeight };
		}

		if (mode === true || mode == type) {

			var handle = document.createElement('div');
			handle.className = "tabulator-col-resize-handle";

			var prevHandle = document.createElement('div');
			prevHandle.className = "tabulator-col-resize-handle prev";

			handle.addEventListener("click", function (e) {
				e.stopPropagation();
			});

			var handleDown = function handleDown(e) {
				var nearestColumn = column.getLastColumn();

				if (nearestColumn && self._checkResizability(nearestColumn)) {
					self.startColumn = column;
					self._mouseDown(e, nearestColumn, handle);
				}
			};

			handle.addEventListener("mousedown", handleDown);
			handle.addEventListener("touchstart", handleDown);

			//reszie column on  double click
			handle.addEventListener("dblclick", function (e) {
				if (self._checkResizability(column)) {
					column.reinitializeWidth(true);
				}
			});

			prevHandle.addEventListener("click", function (e) {
				e.stopPropagation();
			});

			var prevHandleDown = function prevHandleDown(e) {
				var nearestColumn, colIndex, prevColumn;

				nearestColumn = column.getFirstColumn();

				if (nearestColumn) {
					colIndex = self.table.columnManager.findColumnIndex(nearestColumn);
					prevColumn = colIndex > 0 ? self.table.columnManager.getColumnByIndex(colIndex - 1) : false;

					if (prevColumn && self._checkResizability(prevColumn)) {
						self.startColumn = column;
						self._mouseDown(e, prevColumn, prevHandle);
					}
				}
			};

			prevHandle.addEventListener("mousedown", prevHandleDown);
			prevHandle.addEventListener("touchstart", prevHandleDown);

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

			element.appendChild(handle);
			element.appendChild(prevHandle);
		}
	};

	ResizeColumns.prototype._checkResizability = function (column) {
		return typeof column.definition.resizable != "undefined" ? column.definition.resizable : this.table.options.resizableColumns;
	};

	ResizeColumns.prototype._mouseDown = function (e, column, handle) {
		var self = this;

		self.table.element.classList.add("tabulator-block-select");

		function mouseMove(e) {
			self.table.columnManager.tempScrollBlock();

			column.setWidth(self.startWidth + ((typeof e.screenX === "undefined" ? e.touches[0].screenX : e.screenX) - self.startX));

			if (!self.table.browserSlow && column.modules.resize && column.modules.resize.variableHeight) {
				column.checkCellHeights();
			}
		}

		function mouseUp(e) {

			//block editor from taking action while resizing is taking place
			if (self.startColumn.modules.edit) {
				self.startColumn.modules.edit.blocked = false;
			}

			if (self.table.browserSlow && column.modules.resize && column.modules.resize.variableHeight) {
				column.checkCellHeights();
			}

			document.body.removeEventListener("mouseup", mouseUp);
			document.body.removeEventListener("mousemove", mouseMove);

			handle.removeEventListener("touchmove", mouseMove);
			handle.removeEventListener("touchend", mouseUp);

			self.table.element.classList.remove("tabulator-block-select");

			if (self.table.options.persistentLayout && self.table.modExists("persistence", true)) {
				self.table.modules.persistence.save("columns");
			}

			self.table.options.columnResized.call(self.table, column.getComponent());
		}

		e.stopPropagation(); //prevent resize from interfereing with movable columns

		//block editor from taking action while resizing is taking place
		if (self.startColumn.modules.edit) {
			self.startColumn.modules.edit.blocked = true;
		}

		self.startX = typeof e.screenX === "undefined" ? e.touches[0].screenX : e.screenX;
		self.startWidth = column.getWidth();

		document.body.addEventListener("mousemove", mouseMove);
		document.body.addEventListener("mouseup", mouseUp);
		handle.addEventListener("touchmove", mouseMove);
		handle.addEventListener("touchend", mouseUp);
	};

	Tabulator.prototype.registerModule("resizeColumns", ResizeColumns);
	var ResizeRows = function ResizeRows(table) {
		this.table = table; //hold Tabulator object
		this.startColumn = false;
		this.startY = false;
		this.startHeight = false;
		this.handle = null;
		this.prevHandle = null;
	};

	ResizeRows.prototype.initializeRow = function (row) {
		var self = this,
		    rowEl = row.getElement();

		var handle = document.createElement('div');
		handle.className = "tabulator-row-resize-handle";

		var prevHandle = document.createElement('div');
		prevHandle.className = "tabulator-row-resize-handle prev";

		handle.addEventListener("click", function (e) {
			e.stopPropagation();
		});

		var handleDown = function handleDown(e) {
			self.startRow = row;
			self._mouseDown(e, row, handle);
		};

		handle.addEventListener("mousedown", handleDown);
		handle.addEventListener("touchstart", handleDown);

		prevHandle.addEventListener("click", function (e) {
			e.stopPropagation();
		});

		var prevHandleDown = function prevHandleDown(e) {
			var prevRow = self.table.rowManager.prevDisplayRow(row);

			if (prevRow) {
				self.startRow = prevRow;
				self._mouseDown(e, prevRow, prevHandle);
			}
		};

		prevHandle.addEventListener("mousedown", prevHandleDown);
		prevHandle.addEventListener("touchstart", prevHandleDown);

		rowEl.appendChild(handle);
		rowEl.appendChild(prevHandle);
	};

	ResizeRows.prototype._mouseDown = function (e, row, handle) {
		var self = this;

		self.table.element.classList.add("tabulator-block-select");

		function mouseMove(e) {
			row.setHeight(self.startHeight + ((typeof e.screenY === "undefined" ? e.touches[0].screenY : e.screenY) - self.startY));
		}

		function mouseUp(e) {

			// //block editor from taking action while resizing is taking place
			// if(self.startColumn.modules.edit){
			// 	self.startColumn.modules.edit.blocked = false;
			// }

			document.body.removeEventListener("mouseup", mouseMove);
			document.body.removeEventListener("mousemove", mouseMove);

			handle.removeEventListener("touchmove", mouseMove);
			handle.removeEventListener("touchend", mouseUp);

			self.table.element.classList.remove("tabulator-block-select");

			self.table.options.rowResized.call(this.table, row.getComponent());
		}

		e.stopPropagation(); //prevent resize from interfereing with movable columns

		//block editor from taking action while resizing is taking place
		// if(self.startColumn.modules.edit){
		// 	self.startColumn.modules.edit.blocked = true;
		// }

		self.startY = typeof e.screenY === "undefined" ? e.touches[0].screenY : e.screenY;
		self.startHeight = row.getHeight();

		document.body.addEventListener("mousemove", mouseMove);
		document.body.addEventListener("mouseup", mouseUp);

		handle.addEventListener("touchmove", mouseMove);
		handle.addEventListener("touchend", mouseUp);
	};

	Tabulator.prototype.registerModule("resizeRows", ResizeRows);
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

			this.observer.observe(table.element);
		} else {
			this.binding = function () {
				table.redraw();
			};

			window.addEventListener("resize", this.binding);
		}
	};

	ResizeTable.prototype.clearBindings = function (row) {
		if (this.binding) {
			window.removeEventListener("resize", this.binding);
		}

		if (this.observer) {
			this.observer.unobserve(this.table.element);
		}
	};

	Tabulator.prototype.registerModule("resizeTable", ResizeTable);
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
		var self = this,
		    columns = [];

		this.mode = this.table.options.responsiveLayout;
		this.collapseFormatter = this.table.options.responsiveLayoutCollapseFormatter || this.formatCollapsedData;
		this.collapseStartOpen = this.table.options.responsiveLayoutCollapseStartOpen;
		this.hiddenColumns = [];

		//detemine level of responsivity for each column
		this.table.columnManager.columnsByIndex.forEach(function (column, i) {
			if (column.modules.responsive) {
				if (column.modules.responsive.order && column.modules.responsive.visible) {
					column.modules.responsive.index = i;
					columns.push(column);

					if (!column.visible && self.mode === "collapse") {
						self.hiddenColumns.push(column);
					}
				}
			}
		});

		//sort list by responsivity
		columns = columns.reverse();
		columns = columns.sort(function (a, b) {
			var diff = b.modules.responsive.order - a.modules.responsive.order;
			return diff || b.modules.responsive.index - a.modules.responsive.index;
		});

		this.columns = columns;

		if (this.mode === "collapse") {
			this.generateCollapsedContent();
		}
	};

	//define layout information
	ResponsiveLayout.prototype.initializeColumn = function (column) {
		var def = column.getDefinition();

		column.modules.responsive = { order: typeof def.responsive === "undefined" ? 1 : def.responsive, visible: def.visible === false ? false : true };
	};

	ResponsiveLayout.prototype.layoutRow = function (row) {
		var rowEl = row.getElement(),
		    el = document.createElement("div");

		el.classList.add("tabulator-responsive-collapse");

		if (!rowEl.classList.contains("tabulator-calcs")) {
			row.modules.responsiveLayout = {
				element: el
			};

			if (!this.collapseStartOpen) {
				el.style.display = 'none';
			}

			rowEl.appendChild(el);

			this.generateCollapsedRowContent(row);
		}
	};

	//update column visibility
	ResponsiveLayout.prototype.updateColumnVisibility = function (column, visible) {
		var index;
		if (column.modules.responsive) {
			column.modules.responsive.visible = visible;
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

			var width = self.table.modules.layout.getMode() == "fitColumns" ? self.table.columnManager.getFlexBaseWidth() : self.table.columnManager.getWidth();

			var diff = self.table.columnManager.element.clientWidth - width;

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
		var el, contents;

		if (row.modules.responsiveLayout) {
			el = row.modules.responsiveLayout.element;

			while (el.firstChild) {
				el.removeChild(el.firstChild);
			}contents = this.collapseFormatter(this.generateCollapsedRowData(row));

			if (contents) {
				el.appendChild(contents);
			}
		}
	};

	ResponsiveLayout.prototype.generateCollapsedRowData = function (row) {
		var self = this,
		    data = row.getData(),
		    output = [],
		    mockCellComponent;

		this.hiddenColumns.forEach(function (column) {
			var value = column.getFieldValue(data);

			if (column.definition.title && column.field) {
				if (column.modules.format && self.table.options.responsiveLayoutCollapseUseFormatters) {

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
							return document.createElement("div");
						},
						getRow: function getRow() {
							return row.getComponent();
						},
						getColumn: function getColumn() {
							return column.getComponent();
						}
					};

					output.push({
						title: column.definition.title,
						value: column.modules.format.formatter.call(self.table.modules.format, mockCellComponent, column.modules.format.params)
					});
				} else {
					output.push({
						title: column.definition.title,
						value: value
					});
				}
			}
		});

		return output;
	};

	ResponsiveLayout.prototype.formatCollapsedData = function (data) {
		var list = document.createElement("table"),
		    listContents = "";

		data.forEach(function (item) {
			listContents += "<tr><td><strong>" + item.title + "</strong></td><td>" + item.value + "</td></tr>";
		});

		list.innerHTML = listContents;

		return Object.keys(data).length ? list : "";
	};

	Tabulator.prototype.registerModule("responsiveLayout", ResponsiveLayout);

	var SelectRow = function SelectRow(table) {
		this.table = table; //hold Tabulator object
		this.selecting = false; //flag selecting in progress
		this.lastClickedRow = false; //last clicked row
		this.selectPrev = []; //hold previously selected element for drag drop selection
		this.selectedRows = []; //hold selected rows
	};

	SelectRow.prototype.clearSelectionData = function (silent) {
		this.selecting = false;
		this.lastClickedRow = false;
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

			document.body.removeEventListener("mouseup", endSelect);
		};

		row.modules.select = { selected: false };

		//set row selection class
		if (self.table.options.selectableCheck.call(this.table, row.getComponent())) {
			element.classList.add("tabulator-selectable");
			element.classList.remove("tabulator-unselectable");

			if (self.table.options.selectable && self.table.options.selectable != "highlight") {
				if (self.table.options.selectableRangeMode && self.table.options.selectableRangeMode === "click") {
					element.addEventListener("click", function (e) {
						if (e.shiftKey) {
							self.lastClickedRow = self.lastClickedRow || row;

							var lastClickedRowIdx = self.table.rowManager.getDisplayRowIndex(self.lastClickedRow);
							var rowIdx = self.table.rowManager.getDisplayRowIndex(row);

							var fromRowIdx = lastClickedRowIdx <= rowIdx ? lastClickedRowIdx : rowIdx;
							var toRowIdx = lastClickedRowIdx >= rowIdx ? lastClickedRowIdx : rowIdx;

							var rows = self.table.rowManager.getDisplayRows().slice(0);
							var toggledRows = rows.splice(fromRowIdx, toRowIdx - fromRowIdx + 1);

							if (e.ctrlKey) {
								toggledRows.forEach(function (toggledRow) {
									if (toggledRow !== self.lastClickedRow) {
										self.toggleRow(toggledRow);
									}
								});
								self.lastClickedRow = row;
							} else {
								self.deselectRows();
								self.selectRows(toggledRows);
							}
						} else if (e.ctrlKey) {
							self.toggleRow(row);
							self.lastClickedRow = row;
						} else {
							self.deselectRows();
							self.selectRows(row);
							self.lastClickedRow = row;
						}
					});
				} else {
					element.addEventListener("click", function (e) {
						if (!self.selecting) {
							self.toggleRow(row);
						}
					});

					element.addEventListener("mousedown", function (e) {
						if (e.shiftKey) {
							self.selecting = true;

							self.selectPrev = [];

							document.body.addEventListener("mouseup", endSelect);
							document.body.addEventListener("keyup", endSelect);

							self.toggleRow(row);

							return false;
						}
					});

					element.addEventListener("mouseenter", function (e) {
						if (self.selecting) {
							self.toggleRow(row);

							if (self.selectPrev[1] == row) {
								self.toggleRow(self.selectPrev[0]);
							}
						}
					});

					element.addEventListener("mouseout", function (e) {
						if (self.selecting) {
							self.selectPrev.unshift(row);
						}
					});
				}
			}
		} else {
			element.classList.add("tabulator-unselectable");
			element.classList.remove("tabulator-selectable");
		}
	};

	//toggle row selection
	SelectRow.prototype.toggleRow = function (row) {
		if (this.table.options.selectableCheck.call(this.table, row.getComponent())) {
			if (row.modules.select && row.modules.select.selected) {
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
						self._selectRow(row, true, true);
					});

					self._rowSelectionChanged();
				} else {
					self._selectRow(rows, false, true);
				}
				break;
		}
	};

	//select an individual row
	SelectRow.prototype._selectRow = function (rowInfo, silent, force) {
		var index;

		//handle max row count
		if (!isNaN(this.table.options.selectable) && this.table.options.selectable !== true && !force) {
			if (this.selectedRows.length >= this.table.options.selectable) {
				if (this.table.options.selectableRollingSelection) {
					this._deselectRow(this.selectedRows[0]);
				} else {
					return false;
				}
			}
		}

		var row = this.table.rowManager.findRow(rowInfo);

		if (row) {
			if (this.selectedRows.indexOf(row) == -1) {
				if (!row.modules.select) {
					row.modules.select = {};
				}

				row.modules.select.selected = true;
				row.getElement().classList.add("tabulator-selected");

				this.selectedRows.push(row);

				if (!silent) {
					this.table.options.rowSelected.call(this.table, row.getComponent());
					this._rowSelectionChanged();
				}
			}
		} else {
			if (!silent) {
				console.warn("Selection Error - No such row found, ignoring selection:" + rowInfo);
			}
		}
	};

	SelectRow.prototype.isRowSelected = function (row) {
		return this.selectedRows.indexOf(row) !== -1;
	};

	//deselect a number of rows
	SelectRow.prototype.deselectRows = function (rows) {
		var self = this,
		    rowCount;

		if (typeof rows == "undefined") {

			rowCount = self.selectedRows.length;

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

				if (!row.modules.select) {
					row.modules.select = {};
				}

				row.modules.select.selected = false;
				row.getElement().classList.remove("tabulator-selected");
				self.selectedRows.splice(index, 1);

				if (!silent) {
					self.table.options.rowDeselected.call(this.table, row.getComponent());
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
		this.table.options.rowSelectionChanged.call(this.table, this.getSelectedData(), this.getSelectedRows());
	};

	Tabulator.prototype.registerModule("selectRow", SelectRow);

	var Sort = function Sort(table) {
		this.table = table; //hold Tabulator object
		this.sortList = []; //holder current sort
		this.changed = false; //has the sort changed since last render
	};

	//initialize column header for sorting
	Sort.prototype.initializeColumn = function (column, content) {
		var self = this,
		    sorter = false,
		    colEl,
		    arrowEl;

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

		column.modules.sort = {
			sorter: sorter, dir: "none",
			params: column.definition.sorterParams || {},
			startingDir: column.definition.headerSortStartingDir || "asc",
			tristate: column.definition.headerSortTristate
		};

		if (column.definition.headerSort !== false) {

			colEl = column.getElement();

			colEl.classList.add("tabulator-sortable");

			arrowEl = document.createElement("div");
			arrowEl.classList.add("tabulator-arrow");
			//create sorter arrow
			content.appendChild(arrowEl);

			//sort on click
			colEl.addEventListener("click", function (e) {
				var dir = "",
				    sorters = [],
				    match = false;

				if (column.modules.sort) {
					if (column.modules.sort.tristate) {
						if (column.modules.sort.dir == "none") {
							dir = column.modules.sort.startingDir;
						} else {
							if (column.modules.sort.dir == column.modules.sort.startingDir) {
								dir = column.modules.sort.dir == "asc" ? "desc" : "asc";
							} else {
								dir = "none";
							}
						}
					} else {
						switch (column.modules.sort.dir) {
							case "asc":
								dir = "desc";
								break;

							case "desc":
								dir = "asc";
								break;

							default:
								dir = column.modules.sort.startingDir;
						}
					}

					if (self.table.options.columnHeaderSortMulti && (e.shiftKey || e.ctrlKey)) {
						sorters = self.getSort();

						match = sorters.findIndex(function (sorter) {
							return sorter.field === column.getField();
						});

						if (match > -1) {
							sorters[match].dir = dir;

							if (match != sorters.length - 1) {
								match = sorters.splice(match, 1)[0];
								if (dir != "none") {
									sorters.push(match);
								}
							}
						} else {
							if (dir != "none") {
								sorters.push({ column: column, dir: dir });
							}
						}

						//add to existing sort
						self.setSort(sorters);
					} else {
						if (dir == "none") {
							self.clear();
						} else {
							//sort by column only
							self.setSort(column, dir);
						}
					}

					self.table.rowManager.sorterRefresh(!self.sortList.length);
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

		if (this.table.options.persistentSort && this.table.modExists("persistence", true)) {
			this.table.modules.persistence.save("sort");
		}
	};

	//clear sorters
	Sort.prototype.clear = function () {
		this.setSort([]);
	};

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
	Sort.prototype.sort = function (data) {
		var self = this,
		    lastSort,
		    sortList;

		sortList = this.table.options.sortOrderReverse ? self.sortList.slice().reverse() : self.sortList;

		if (self.table.options.dataSorting) {
			self.table.options.dataSorting.call(self.table, self.getSort());
		}

		self.clearColumnHeaders();

		if (!self.table.options.ajaxSorting) {

			sortList.forEach(function (item, i) {

				if (item.column && item.column.modules.sort) {

					//if no sorter has been defined, take a guess
					if (!item.column.modules.sort.sorter) {
						item.column.modules.sort.sorter = self.findSorter(item.column);
					}

					self._sortItem(data, item.column, item.dir, sortList, i);
				}

				self.setColumnHeader(item.column, item.dir);
			});
		} else {
			sortList.forEach(function (item, i) {
				self.setColumnHeader(item.column, item.dir);
			});
		}

		if (self.table.options.dataSorted) {
			self.table.options.dataSorted.call(self.table, self.getSort(), self.table.rowManager.getComponents(true));
		}
	};

	//clear sort arrows on columns
	Sort.prototype.clearColumnHeaders = function () {
		this.table.columnManager.getRealColumns().forEach(function (column) {
			if (column.modules.sort) {
				column.modules.sort.dir = "none";
				column.getElement().setAttribute("aria-sort", "none");
			}
		});
	};

	//set the column header sort direction
	Sort.prototype.setColumnHeader = function (column, dir) {
		column.modules.sort.dir = dir;
		column.getElement().setAttribute("aria-sort", dir);
	};

	//sort each item in sort list
	Sort.prototype._sortItem = function (data, column, dir, sortList, i) {
		var self = this;

		var params = typeof column.modules.sort.params === "function" ? column.modules.sort.params(column.getComponent(), dir) : column.modules.sort.params;

		data.sort(function (a, b) {

			var result = self._sortRow(a, b, column, dir, params);

			//if results match recurse through previous searchs to be sure
			if (result === 0 && i) {
				for (var j = i - 1; j >= 0; j--) {
					result = self._sortRow(a, b, sortList[j].column, sortList[j].dir, params);

					if (result !== 0) {
						break;
					}
				}
			}

			return result;
		});
	};

	//process individual rows for a sort function on active data
	Sort.prototype._sortRow = function (a, b, column, dir, params) {
		var el1Comp, el2Comp, colComp;

		//switch elements depending on search direction
		var el1 = dir == "asc" ? a : b;
		var el2 = dir == "asc" ? b : a;

		a = column.getFieldValue(el1.getData());
		b = column.getFieldValue(el2.getData());

		a = typeof a !== "undefined" ? a : "";
		b = typeof b !== "undefined" ? b : "";

		el1Comp = el1.getComponent();
		el2Comp = el2.getComponent();

		return column.modules.sort.sorter.call(this, a, b, el1Comp, el2Comp, column.getComponent(), dir, params);
	};

	//default data sorters
	Sort.prototype.sorters = {

		//sort numbers
		number: function number(a, b, aRow, bRow, column, dir, params) {
			var alignEmptyValues = params.alignEmptyValues;
			var decimal = params.decimalSeparator || ".";
			var thousand = params.thousandSeparator || ",";
			var emptyAlign = 0;

			a = parseFloat(String(a).split(thousand).join("").split(decimal).join("."));
			b = parseFloat(String(b).split(thousand).join("").split(decimal).join("."));

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
							locale = this.table.modules.localize.getLocale();
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
			if (!params.format) {
				params.format = "DD/MM/YYYY";
			}

			return this.sorters.datetime.call(this, a, b, aRow, bRow, column, dir, params);
		},

		//sort hh:mm formatted times
		time: function time(a, b, aRow, bRow, column, dir, params) {
			if (!params.format) {
				params.format = "hh:mm";
			}

			return this.sorters.datetime.call(this, a, b, aRow, bRow, column, dir, params);
		},

		//sort datetime
		datetime: function datetime(a, b, aRow, bRow, column, dir, params) {
			var format = params.format || "DD/MM/YYYY hh:mm:ss",
			    alignEmptyValues = params.alignEmptyValues,
			    emptyAlign = 0;

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
				console.error("Sort Error - 'datetime' sorter is dependant on moment.js");
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

	Tabulator.prototype.registerModule("sort", Sort);

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

			column.modules.validate = config.length ? config : false;
		}
	};

	Validate.prototype._extractValidator = function (value) {
		var parts, type, params;

		switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
			case "string":
				parts = value.split(":", 2);
				type = parts.shift();
				params = parts[0];

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
			return typeof value === 'number' && isFinite(value) && value % 1 !== 0;
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

	Tabulator.prototype.registerModule("validate", Validate);

	return Tabulator;
});