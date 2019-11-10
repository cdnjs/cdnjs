/* Tabulator v4.2.5 (c) Oliver Folkerd */

var History = function History(table) {
	this.table = table; //hold Tabulator object

	this.history = [];
	this.index = -1;
};

History.prototype.clear = function () {
	this.history = [];
	this.index = -1;
};

History.prototype.action = function (type, component, data) {

	this.history = this.history.slice(0, this.index + 1);

	this.history.push({
		type: type,
		component: component,
		data: data
	});

	this.index++;
};

History.prototype.getHistoryUndoSize = function () {
	return this.index + 1;
};

History.prototype.getHistoryRedoSize = function () {
	return this.history.length - (this.index + 1);
};

History.prototype.undo = function () {

	if (this.index > -1) {
		var action = this.history[this.index];

		this.undoers[action.type].call(this, action);

		this.index--;

		this.table.options.historyUndo.call(this.table, action.type, action.component.getComponent(), action.data);

		return true;
	} else {
		console.warn("History Undo Error - No more history to undo");
		return false;
	}
};

History.prototype.redo = function () {
	if (this.history.length - 1 > this.index) {

		this.index++;

		var action = this.history[this.index];

		this.redoers[action.type].call(this, action);

		this.table.options.historyRedo.call(this.table, action.type, action.component.getComponent(), action.data);

		return true;
	} else {
		console.warn("History Redo Error - No more history to redo");
		return false;
	}
};

History.prototype.undoers = {
	cellEdit: function cellEdit(action) {
		action.component.setValueProcessData(action.data.oldValue);
	},

	rowAdd: function rowAdd(action) {
		action.component.deleteActual();
	},

	rowDelete: function rowDelete(action) {
		var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

		this._rebindRow(action.component, newRow);
	},

	rowMove: function rowMove(action) {
		this.table.rowManager.moveRowActual(action.component, this.table.rowManager.rows[action.data.pos], false);
		this.table.rowManager.redraw();
	}
};

History.prototype.redoers = {
	cellEdit: function cellEdit(action) {
		action.component.setValueProcessData(action.data.newValue);
	},

	rowAdd: function rowAdd(action) {
		var newRow = this.table.rowManager.addRowActual(action.data.data, action.data.pos, action.data.index);

		this._rebindRow(action.component, newRow);
	},

	rowDelete: function rowDelete(action) {
		action.component.deleteActual();
	},

	rowMove: function rowMove(action) {
		this.table.rowManager.moveRowActual(action.component, this.table.rowManager.rows[action.data.pos], false);
		this.table.rowManager.redraw();
	}
};

//rebind rows to new element after deletion
History.prototype._rebindRow = function (oldRow, newRow) {
	this.history.forEach(function (action) {
		if (action.component instanceof Row) {
			if (action.component === oldRow) {
				action.component = newRow;
			}
		} else if (action.component instanceof Cell) {
			if (action.component.row === oldRow) {
				var field = action.component.column.getField();

				if (field) {
					action.component = newRow.getCell(field);
				}
			}
		}
	});
};

Tabulator.prototype.registerModule("history", History);