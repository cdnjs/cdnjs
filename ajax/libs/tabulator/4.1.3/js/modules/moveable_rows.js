var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* Tabulator v4.1.3 (c) Oliver Folkerd */

var MoveRows = function MoveRows(table) {

	this.table = table; //hold Tabulator object
	this.placeholderElement = this.createPlaceholderElement();
	this.hoverElement = false; //floating row header element
	this.checkTimeout = false; //click check timeout holder
	this.checkPeriod = 150; //period to wait on mousedown to consider this a move and not a click
	this.moving = false; //currently moving row
	this.toRow = false; //destination row
	this.toRowAfter = false; //position of moving row relative to the desitnation row
	this.hasHandle = false; //row has handle instead of fully movable row
	this.startY = 0; //starting Y position within header element
	this.startX = 0; //starting X position within header element

	this.moveHover = this.moveHover.bind(this);
	this.endMove = this.endMove.bind(this);
	this.tableRowDropEvent = false;

	this.connection = false;
	this.connections = [];

	this.connectedTable = false;
	this.connectedRow = false;
};

MoveRows.prototype.createPlaceholderElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-row");
	el.classList.add("tabulator-row-placeholder");

	return el;
};

MoveRows.prototype.initialize = function (handle) {
	this.connection = this.table.options.movableRowsConnectedTables;
};

MoveRows.prototype.setHandle = function (handle) {
	this.hasHandle = handle;
};

MoveRows.prototype.initializeRow = function (row) {
	var self = this,
	    config = {},
	    rowEl;

	//inter table drag drop
	config.mouseup = function (e) {
		self.tableRowDrop(e, row);
	}.bind(self);

	//same table drag drop
	config.mousemove = function (e) {
		if (e.pageY - Tabulator.prototype.helpers.elOffset(row.element).top + self.table.rowManager.element.scrollTop > row.getHeight() / 2) {
			if (self.toRow !== row || !self.toRowAfter) {
				var rowEl = row.getElement();
				rowEl.parentNode.insertBefore(self.placeholderElement, rowEl.nextSibling);
				self.moveRow(row, true);
			}
		} else {
			if (self.toRow !== row || self.toRowAfter) {
				var rowEl = row.getElement();
				rowEl.parentNode.insertBefore(self.placeholderElement, rowEl);
				self.moveRow(row, false);
			}
		}
	}.bind(self);

	if (!this.hasHandle) {

		rowEl = row.getElement();

		rowEl.addEventListener("mousedown", function (e) {
			if (e.which === 1) {
				self.checkTimeout = setTimeout(function () {
					self.startMove(e, row);
				}, self.checkPeriod);
			}
		});

		rowEl.addEventListener("mouseup", function (e) {
			if (e.which === 1) {
				if (self.checkTimeout) {
					clearTimeout(self.checkTimeout);
				}
			}
		});
	}

	row.modules.moveRow = config;
};

MoveRows.prototype.initializeCell = function (cell) {
	var self = this,
	    cellEl = cell.getElement();

	cellEl.addEventListener("mousedown", function (e) {
		if (e.which === 1) {
			self.checkTimeout = setTimeout(function () {
				self.startMove(e, cell.row);
			}, self.checkPeriod);
		}
	});

	cellEl.addEventListener("mouseup", function (e) {
		if (e.which === 1) {
			if (self.checkTimeout) {
				clearTimeout(self.checkTimeout);
			}
		}
	});
};

MoveRows.prototype._bindMouseMove = function () {
	var self = this;

	self.table.rowManager.getDisplayRows().forEach(function (row) {
		if (row.type === "row" && row.modules.moveRow.mousemove) {
			row.getElement().addEventListener("mousemove", row.modules.moveRow.mousemove);
		}
	});
};

MoveRows.prototype._unbindMouseMove = function () {
	var self = this;

	self.table.rowManager.getDisplayRows().forEach(function (row) {
		if (row.type === "row" && row.modules.moveRow.mousemove) {
			row.getElement().removeEventListener("mousemove", row.modules.moveRow.mousemove);
		}
	});
};

MoveRows.prototype.startMove = function (e, row) {
	var element = row.getElement();

	this.setStartPosition(e, row);

	this.moving = row;

	this.table.element.classList.add("tabulator-block-select");

	//create placeholder
	this.placeholderElement.style.width = row.getWidth() + "px";
	this.placeholderElement.style.height = row.getHeight() + "px";

	if (!this.connection) {
		element.parentNode.insertBefore(this.placeholderElement, element);
		element.parentNode.removeChild(element);
	} else {
		this.table.element.classList.add("tabulator-movingrow-sending");
		this.connectToTables(row);
	}

	//create hover element
	this.hoverElement = element.cloneNode(true);
	this.hoverElement.classList.add("tabulator-moving");

	if (this.connection) {
		document.body.appendChild(this.hoverElement);
		this.hoverElement.style.left = "0";
		this.hoverElement.style.top = "0";
		this.hoverElement.style.width = this.table.element.clientWidth + "px";
		this.hoverElement.style.whiteSpace = "nowrap";
		this.hoverElement.style.overflow = "hidden";
		this.hoverElement.style.pointerEvents = "none";
	} else {
		this.table.rowManager.getTableElement().appendChild(this.hoverElement);

		this.hoverElement.style.left = "0";
		this.hoverElement.style.top = "0";

		this._bindMouseMove();
	}

	document.body.addEventListener("mousemove", this.moveHover);
	document.body.addEventListener("mouseup", this.endMove);

	this.moveHover(e);
};

MoveRows.prototype.setStartPosition = function (e, row) {
	var element, position;

	element = row.getElement();
	if (this.connection) {
		position = element.getBoundingClientRect();

		this.startX = position.left - e.pageX + window.scrollX;
		this.startY = position.top - e.pageY + window.scrollY;
	} else {
		this.startY = e.pageY - element.getBoundingClientRect().top;
	}
};

MoveRows.prototype.endMove = function (e) {
	if (!e || e.which === 1) {
		this._unbindMouseMove();

		if (!this.connection) {
			this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling);
			this.placeholderElement.parentNode.removeChild(this.placeholderElement);
		}

		this.hoverElement.parentNode.removeChild(this.hoverElement);

		this.table.element.classList.remove("tabulator-block-select");

		if (this.toRow) {
			this.table.rowManager.moveRow(this.moving, this.toRow, this.toRowAfter);
		}

		this.moving = false;
		this.toRow = false;
		this.toRowAfter = false;

		document.body.removeEventListener("mousemove", this.moveHover);
		document.body.removeEventListener("mouseup", this.endMove);

		if (this.connection) {
			this.table.element.classList.remove("tabulator-movingrow-sending");
			this.disconnectFromTables();
		}
	}
};

MoveRows.prototype.moveRow = function (row, after) {
	this.toRow = row;
	this.toRowAfter = after;
};

MoveRows.prototype.moveHover = function (e) {
	if (this.connection) {
		this.moveHoverConnections.call(this, e);
	} else {
		this.moveHoverTable.call(this, e);
	}
};

MoveRows.prototype.moveHoverTable = function (e) {
	var rowHolder = this.table.rowManager.getElement(),
	    scrollTop = rowHolder.scrollTop,
	    yPos = e.pageY - rowHolder.getBoundingClientRect().top + scrollTop,
	    scrollPos;

	this.hoverElement.style.top = yPos - this.startY + "px";
};

MoveRows.prototype.moveHoverConnections = function (e) {
	this.hoverElement.style.left = this.startX + e.pageX + "px";
	this.hoverElement.style.top = this.startY + e.pageY + "px";
};

//establish connection with other tables
MoveRows.prototype.connectToTables = function (row) {
	var self = this,
	    connections = this.table.modules.comms.getConnections(this.connection);

	this.table.options.movableRowsSendingStart.call(this.table, connections);

	this.table.modules.comms.send(this.connection, "moveRow", "connect", {
		row: row
	});
};

//disconnect from other tables
MoveRows.prototype.disconnectFromTables = function () {
	var self = this,
	    connections = this.table.modules.comms.getConnections(this.connection);

	this.table.options.movableRowsSendingStop.call(this.table, connections);

	this.table.modules.comms.send(this.connection, "moveRow", "disconnect");
};

//accept incomming connection
MoveRows.prototype.connect = function (table, row) {
	var self = this;
	if (!this.connectedTable) {
		this.connectedTable = table;
		this.connectedRow = row;

		this.table.element.classList.add("tabulator-movingrow-receiving");

		self.table.rowManager.getDisplayRows().forEach(function (row) {
			if (row.type === "row" && row.modules.moveRow && row.modules.moveRow.mouseup) {
				row.getElement().addEventListener("mouseup", row.modules.moveRow.mouseup);
			}
		});

		self.tableRowDropEvent = self.tableRowDrop.bind(self);

		self.table.element.addEventListener("mouseup", self.tableRowDropEvent);

		this.table.options.movableRowsReceivingStart.call(this.table, row, table);

		return true;
	} else {
		console.warn("Move Row Error - Table cannot accept connection, already connected to table:", this.connectedTable);
		return false;
	}
};

//close incomming connection
MoveRows.prototype.disconnect = function (table) {
	var self = this;
	if (table === this.connectedTable) {
		this.connectedTable = false;
		this.connectedRow = false;

		this.table.element.classList.remove("tabulator-movingrow-receiving");

		self.table.rowManager.getDisplayRows().forEach(function (row) {
			if (row.type === "row" && row.modules.moveRow && row.modules.moveRow.mouseup) {
				row.getElement().removeEventListener("mouseup", row.modules.moveRow.mouseup);
			}
		});

		self.table.element.removeEventListener("mouseup", self.tableRowDropEvent);

		this.table.options.movableRowsReceivingStop.call(this.table, table);
	} else {
		console.warn("Move Row Error - trying to disconnect from non connected table");
	}
};

MoveRows.prototype.dropComplete = function (table, row, success) {
	var sender = false;

	if (success) {

		switch (_typeof(this.table.options.movableRowsSender)) {
			case "string":
				sender = this.senders[this.table.options.movableRowsSender];
				break;

			case "function":
				sender = this.table.options.movableRowsSender;
				break;
		}

		if (sender) {
			sender.call(this, this.moving.getComponent(), row ? row.getComponent() : undefined, table);
		} else {
			if (this.table.options.movableRowsSender) {
				console.warn("Mover Row Error - no matching sender found:", this.table.options.movableRowsSender);
			}
		}

		this.table.options.movableRowsSent.call(this.table, this.moving.getComponent(), row ? row.getComponent() : undefined, table);
	} else {
		this.table.options.movableRowsSentFailed.call(this.table, this.moving.getComponent(), row ? row.getComponent() : undefined, table);
	}

	this.endMove();
};

MoveRows.prototype.tableRowDrop = function (e, row) {
	var receiver = false,
	    success = false;

	e.stopImmediatePropagation();

	switch (_typeof(this.table.options.movableRowsReceiver)) {
		case "string":
			receiver = this.receivers[this.table.options.movableRowsReceiver];
			break;

		case "function":
			receiver = this.table.options.movableRowsReceiver;
			break;
	}

	if (receiver) {
		success = receiver.call(this, this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
	} else {
		console.warn("Mover Row Error - no matching receiver found:", this.table.options.movableRowsReceiver);
	}

	if (success) {
		this.table.options.movableRowsReceived.call(this.table, this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
	} else {
		this.table.options.movableRowsReceivedFailed.call(this.table, this.connectedRow.getComponent(), row ? row.getComponent() : undefined, this.connectedTable);
	}

	this.table.modules.comms.send(this.connectedTable, "moveRow", "dropcomplete", {
		row: row,
		success: success
	});
};

MoveRows.prototype.receivers = {
	insert: function insert(fromRow, toRow, fromTable) {
		this.table.addRow(fromRow.getData(), undefined, toRow);
		return true;
	},

	add: function add(fromRow, toRow, fromTable) {
		this.table.addRow(fromRow.getData());
		return true;
	},

	update: function update(fromRow, toRow, fromTable) {
		if (toRow) {
			toRow.update(fromRow.getData());
			return true;
		}

		return false;
	},

	replace: function replace(fromRow, toRow, fromTable) {
		if (toRow) {
			this.table.addRow(fromRow.getData(), undefined, toRow);
			toRow.delete();
			return true;
		}

		return false;
	}
};

MoveRows.prototype.senders = {
	delete: function _delete(fromRow, toRow, toTable) {
		fromRow.delete();
	}
};

MoveRows.prototype.commsReceived = function (table, action, data) {
	switch (action) {
		case "connect":
			return this.connect(table, data.row);
			break;

		case "disconnect":
			return this.disconnect(table);
			break;

		case "dropcomplete":
			return this.dropComplete(table, data.row, data.success);
			break;
	}
};

Tabulator.prototype.registerModule("moveRow", MoveRows);