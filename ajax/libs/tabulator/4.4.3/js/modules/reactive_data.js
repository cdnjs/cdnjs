/* Tabulator v4.4.3 (c) Oliver Folkerd */

var ReactiveData = function ReactiveData(table) {
	this.table = table; //hold Tabulator object
	this.data = false;
	this.blocked = false; //block reactivity while performing update
	this.origFuncs = {}; // hold original data array functions to allow replacement after data is done with
	this.currentVersion = 0;
};

ReactiveData.prototype.watchData = function (data) {
	var self = this,
	    pushFunc,
	    version;

	this.currentVersion++;

	version = this.currentVersion;

	self.unwatchData();

	self.data = data;

	//override array push function
	self.origFuncs.push = data.push;

	Object.defineProperty(self.data, "push", {
		enumerable: false,
		configurable: true,
		value: function value() {
			var args = Array.from(arguments);

			if (!self.blocked && version === self.currentVersion) {
				args.forEach(function (arg) {
					self.table.rowManager.addRowActual(arg, false);
				});
			}

			return self.origFuncs.push.apply(data, arguments);
		}
	});

	//override array unshift function
	self.origFuncs.unshift = data.unshift;

	Object.defineProperty(self.data, "unshift", {
		enumerable: false,
		configurable: true,
		value: function value() {
			var args = Array.from(arguments);

			if (!self.blocked && version === self.currentVersion) {
				args.forEach(function (arg) {
					self.table.rowManager.addRowActual(arg, true);
				});
			}

			return self.origFuncs.unshift.apply(data, arguments);
		}
	});

	//override array shift function
	self.origFuncs.shift = data.shift;

	Object.defineProperty(self.data, "shift", {
		enumerable: false,
		configurable: true,
		value: function value() {
			var row;

			if (!self.blocked && version === self.currentVersion) {
				if (self.data.length) {
					row = self.table.rowManager.getRowFromDataObject(self.data[0]);

					if (row) {
						row.deleteActual();
					}
				}
			}

			return self.origFuncs.shift.call(data);
		}
	});

	//override array pop function
	self.origFuncs.pop = data.pop;

	Object.defineProperty(self.data, "pop", {
		enumerable: false,
		configurable: true,
		value: function value() {
			var row;
			if (!self.blocked && version === self.currentVersion) {
				if (self.data.length) {
					row = self.table.rowManager.getRowFromDataObject(self.data[self.data.length - 1]);

					if (row) {
						row.deleteActual();
					}
				}
			}
			return self.origFuncs.pop.call(data);
		}
	});

	//override array splice function
	self.origFuncs.splice = data.splice;

	Object.defineProperty(self.data, "splice", {
		enumerable: false,
		configurable: true,
		value: function value() {
			var args = Array.from(arguments),
			    start = args[0] < 0 ? data.length + args[0] : args[0],
			    end = args[1],
			    newRows = args[2] ? args.slice(2) : false,
			    startRow;

			if (!self.blocked && version === self.currentVersion) {

				//add new rows
				if (newRows) {
					startRow = data[start] ? self.table.rowManager.getRowFromDataObject(data[start]) : false;

					if (startRow) {
						newRows.forEach(function (rowData) {
							self.table.rowManager.addRowActual(rowData, true, startRow, true);
						});
					} else {
						newRows = newRows.slice().reverse();

						newRows.forEach(function (rowData) {
							self.table.rowManager.addRowActual(rowData, true, false, true);
						});
					}
				}

				//delete removed rows
				if (end !== 0) {
					var oldRows = data.slice(start, typeof args[1] === "undefined" ? args[1] : start + end);

					oldRows.forEach(function (rowData, i) {
						var row = self.table.rowManager.getRowFromDataObject(rowData);

						if (row) {
							row.deleteActual(i !== oldRows.length - 1);
						}
					});
				}

				if (newRows || end !== 0) {
					self.table.rowManager.reRenderInPosition();
				}
			}

			return self.origFuncs.splice.apply(data, arguments);
		}
	});
};

ReactiveData.prototype.unwatchData = function () {
	if (this.data !== false) {
		for (var key in this.origFuncs) {
			Object.defineProperty(this.data, key, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: this.origFuncs.key
			});
		}
	}
};

ReactiveData.prototype.watchRow = function (row) {
	var self = this,
	    data = row.getData();

	this.blocked = true;

	for (var key in data) {
		this.watchKey(row, data, key);
	}

	this.blocked = false;
};

ReactiveData.prototype.watchKey = function (row, data, key) {
	var self = this,
	    props = Object.getOwnPropertyDescriptor(data, key),
	    value = data[key],
	    version = this.currentVersion;

	Object.defineProperty(data, key, {
		set: function set(newValue) {
			value = newValue;
			if (!self.blocked && version === self.currentVersion) {
				var update = {};
				update[key] = newValue;
				row.updateData(update);
			}

			if (props.set) {
				props.set(newValue);
			}
		},
		get: function get() {

			if (props.get) {
				props.get();
			}

			return value;
		}
	});
};

ReactiveData.prototype.unwatchRow = function (row) {
	var data = row.getData();

	for (var key in data) {
		Object.defineProperty(data, key, {
			value: data[key]
		});
	}
};

ReactiveData.prototype.block = function () {
	this.blocked = true;
};

ReactiveData.prototype.unblock = function () {
	this.blocked = false;
};

Tabulator.prototype.registerModule("reactiveData", ReactiveData);