/* Tabulator v4.1.3 (c) Oliver Folkerd */

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