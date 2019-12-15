var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.4.3 (c) Oliver Folkerd */

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
		tristate: typeof column.definition.headerSortTristate !== "undefined" ? column.definition.headerSortTristate : this.table.options.headerSortTristate
	};

	if (typeof column.definition.headerSort === "undefined" ? this.table.options.headerSort !== false : column.definition.headerSort !== false) {

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

			switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
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