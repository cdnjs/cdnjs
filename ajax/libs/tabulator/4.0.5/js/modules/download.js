var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.0.5 (c) Oliver Folkerd */

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

	blob = this.table.options.downloadReady.call(this.table, data, blob);

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
		    autoTableParams = {},
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

				rowData.push(value);
			});

			body.push(rowData);
		});

		var doc = new jsPDF(orientation, 'pt'); //set document to landscape, better for most tables

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