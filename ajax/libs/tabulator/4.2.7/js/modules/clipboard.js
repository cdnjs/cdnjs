var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.2.7 (c) Oliver Folkerd */

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

	switch (typeof action === "undefined" ? "undefined" : _typeof(action)) {
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
	switch (typeof parser === "undefined" ? "undefined" : _typeof(parser)) {
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

	switch (typeof selector === "undefined" ? "undefined" : _typeof(selector)) {
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

	switch (typeof formatter === "undefined" ? "undefined" : _typeof(formatter)) {
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
	var _this = this;

	var output = [];

	this.table.columnManager.columns.forEach(function (column) {
		var colData = _this.processColumnGroup(column);

		if (colData) {
			output.push(colData);
		}
	});

	return output;
};

Clipboard.prototype.processColumnGroup = function (column) {
	var _this2 = this;

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
			var subGroupData = _this2.processColumnGroup(subGroup);

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

			switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
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
	var _this3 = this;

	var output = [],
	    groups = this.table.modules.groupRows.getGroups();

	groups.forEach(function (group) {
		output.push(_this3.processGroupData(group));
	});

	return output;
};

Clipboard.prototype.processGroupData = function (group) {
	var _this4 = this;

	var subGroups = group.getSubGroups();

	var groupData = {
		type: "group",
		key: group.key
	};

	if (subGroups.length) {
		groupData.subGroups = [];

		subGroups.forEach(function (subGroup) {
			groupData.subGroups.push(_this4.processGroupData(subGroup));
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
	var _this5 = this;

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
			output = output.concat(_this5.parseRowGroupData(row, config, params, calcs || {}));
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
	var _this6 = this;

	var groupData = [];

	groupData.push([group.key]);

	if (group.subGroups) {
		group.subGroups.forEach(function (subGroup) {
			groupData = groupData.concat(_this6.parseRowGroupData(subGroup, config, params, calcObj[group.key] ? calcObj[group.key].groups || {} : {}));
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

				switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
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