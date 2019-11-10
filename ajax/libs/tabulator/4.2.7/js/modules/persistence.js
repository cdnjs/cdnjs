/* Tabulator v4.2.7 (c) Oliver Folkerd */

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