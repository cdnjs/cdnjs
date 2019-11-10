/* Tabulator v4.2.5 (c) Oliver Folkerd */

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