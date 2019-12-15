var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.1.3 (c) Oliver Folkerd */

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
HtmlTableImport.prototype._extractOptions = function (element, options) {
	var attributes = element.attributes;

	for (var index in attributes) {
		var attrib = attributes[index];
		var name;

		if ((typeof attrib === "undefined" ? "undefined" : _typeof(attrib)) == "object" && attrib.name && attrib.name.indexOf("tabulator-") === 0) {
			name = attrib.name.replace("tabulator-", "");

			for (var key in options) {
				if (key.toLowerCase() == name) {
					options[key] = this._attribValue(attrib.value);
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
		this._extractOptions(header, col);

		for (var i in attributes) {
			var attrib = attributes[i],
			    name;

			if ((typeof attrib === "undefined" ? "undefined" : _typeof(attrib)) == "object" && attrib.name && attrib.name.indexOf("tabulator-") === 0) {

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