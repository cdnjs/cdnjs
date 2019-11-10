var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.0.3 (c) Oliver Folkerd */

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

	this.blocked = true; //block copy actions not originating from this command
};

Clipboard.prototype.initialize = function () {
	var self = this;

	this.mode = this.table.options.clipboard;

	if (this.mode === true || this.mode === "copy") {
		this.table.element.addEventListener("copy", function (e) {
			var data;

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
				this.copySelectorParams = sel.toString();
			}

			sel.removeAllRanges();
			sel.addRange(range);
		} else if (typeof document.selection != "undefined" && typeof document.body.createTextRange != "undefined") {
			textRange = document.body.createTextRange();
			textRange.moveToElementText(this.table.element);
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
	data = this.copySelector.call(this, this.copySelectorParams);

	return this.copyFormatter.call(this, data, this.copyFormatterParams);
};

Clipboard.prototype.rowsToData = function (rows, params) {
	var columns = this.table.columnManager.columnsByIndex,
	    headers = [],
	    data = [];

	if (this.table.options.clipboardCopyStyled) {
		this.generateHTML(rows, params);
	}

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

Clipboard.prototype.generateHTML = function (rows, showHeaders) {
	var self = this,
	    columns = this.table.columnManager.columnsByIndex,
	    data = [],
	    headers,
	    body,
	    oddRow,
	    evenRow,
	    firstRow,
	    firstCell,
	    lastCell,
	    styleCells;

	//create table element
	this.htmlElement = document.createElement("table");
	self.mapElementStyles(this.table.element, this.htmlElement, ["border-top", "border-left", "border-right", "border-bottom"]);

	//create headers if needed
	if (showHeaders) {
		headers = document.createElement("tr");

		columns.forEach(function (column) {
			var col = document.createElement("th");
			col.innerHTML = column.definition.title;

			self.mapElementStyles(column.getElement(), col, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

			headers.appendChild(col);
		});

		self.mapElementStyles(this.table.columnManager.getHeadersElement(), headers, ["border-top", "border-left", "border-right", "border-bottom", "background-color", "color", "font-weight", "font-family", "font-size"]);

		this.htmlElement.appendChild(document.createElement("thead").appendChild(headers));
	}

	//create table body
	body = document.createElement("tbody");

	//lookup row styles
	if (window.getComputedStyle) {
		oddRow = this.table.element.getElementsByClassName("tabulator-row-odd")[0];
		evenRow = this.table.element.getElementsByClassName("tabulator-row-even")[0];
		firstRow = this.table.element.getElementsByClassName("tabulator-row")[0];

		if (firstRow) {
			styleCells = firstRow.getElementsByClassName("tabulator-cell");
			firstCell = styleCells[0];
			lastCell = styleCells[styleCells.length - 1];
		}
	}

	//add rows to table
	rows.forEach(function (row, i) {
		var rowEl = document.createElement("tr"),
		    rowData = row.getData("clipboard"),
		    styleRow = firstRow;

		columns.forEach(function (column, j) {
			var cellEl = document.createElement("td");
			cellEl.innerHTML = column.getFieldValue(rowData);

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

		if (!(i % 2) && oddRow) {
			styleRow = oddRow;
		}

		if (i % 2 && evenRow) {
			styleRow = evenRow;
		}

		if (styleRow) {
			self.mapElementStyles(styleRow, rowEl, ["border-top", "border-left", "border-right", "border-bottom", "color", "font-weight", "font-family", "font-size", "background-color"]);
		}

		body.appendChild(rowEl);
	});

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
	userSelection: function userSelection(params) {
		return params;
	},
	selected: function selected(params) {
		var rows = [];

		if (this.table.modExists("selectRow", true)) {
			rows = this.table.modules.selectRow.getSelectedRows();
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