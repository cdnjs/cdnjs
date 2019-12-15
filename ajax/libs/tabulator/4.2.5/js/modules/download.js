var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.2.5 (c) Oliver Folkerd */

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
	var _this = this;

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
			var subGroupData = _this.processColumnGroup(subGroup);

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
	var _this2 = this;

	var self = this,
	    data = [],
	    groups = [],
	    calcs = {};

	if (this.config.rowGroups) {
		groups = this.table.modules.groupRows.getGroups();

		groups.forEach(function (group) {
			data.push(_this2.processGroupData(group));
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
	var _this3 = this;

	var subGroups = group.getSubGroups();

	var groupData = {
		type: "group",
		key: group.key
	};

	if (subGroups.length) {
		groupData.subGroups = [];

		subGroups.forEach(function (subGroup) {
			groupData.subGroups.push(_this3.processGroupData(subGroup));
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
			output = "\uFEFF" + output;
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
					rowData.push(!(value instanceof Date) && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? JSON.stringify(value) : value);
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