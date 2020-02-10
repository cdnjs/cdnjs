var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.4.3 (c) Oliver Folkerd */

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
			if (this.topRow) {
				this.topRow.deleteCells();
			}

			row = this.generateRow("top", this.rowsToData(rows));
			this.topRow = row;
			while (this.topElement.firstChild) {
				this.topElement.removeChild(this.topElement.firstChild);
			}this.topElement.appendChild(row.getElement());
			row.initialize(true);
		}

		if (this.botInitialized) {
			if (this.botRow) {
				this.botRow.deleteCells();
			}

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
			params = typeof column.modules.columnCalcs[paramKey] === "function" ? column.modules.columnCalcs[paramKey](values, data) : column.modules.columnCalcs[paramKey];

			column.setFieldValue(rowData, column.modules.columnCalcs[type](values, data, params));
		}
	});

	return rowData;
};

ColumnCalcs.prototype.hasTopCalcs = function () {
	return !!this.topCalcs.length;
};

ColumnCalcs.prototype.hasBottomCalcs = function () {
	return !!this.botCalcs.length;
};

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