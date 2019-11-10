/* Tabulator v4.2.7 (c) Oliver Folkerd */

var MoveColumns = function MoveColumns(table) {
	this.table = table; //hold Tabulator object
	this.placeholderElement = this.createPlaceholderElement();
	this.hoverElement = false; //floating column header element
	this.checkTimeout = false; //click check timeout holder
	this.checkPeriod = 250; //period to wait on mousedown to consider this a move and not a click
	this.moving = false; //currently moving column
	this.toCol = false; //destination column
	this.toColAfter = false; //position of moving column relative to the desitnation column
	this.startX = 0; //starting position within header element
	this.autoScrollMargin = 40; //auto scroll on edge when within margin
	this.autoScrollStep = 5; //auto scroll distance in pixels
	this.autoScrollTimeout = false; //auto scroll timeout
	this.touchMove = false;

	this.moveHover = this.moveHover.bind(this);
	this.endMove = this.endMove.bind(this);
};

MoveColumns.prototype.createPlaceholderElement = function () {
	var el = document.createElement("div");

	el.classList.add("tabulator-col");
	el.classList.add("tabulator-col-placeholder");

	return el;
};

MoveColumns.prototype.initializeColumn = function (column) {
	var self = this,
	    config = {},
	    colEl;

	if (!column.modules.frozen) {

		colEl = column.getElement();

		config.mousemove = function (e) {
			if (column.parent === self.moving.parent) {
				if ((self.touchMove ? e.touches[0].pageX : e.pageX) - Tabulator.prototype.helpers.elOffset(colEl).left + self.table.columnManager.element.scrollLeft > column.getWidth() / 2) {
					if (self.toCol !== column || !self.toColAfter) {
						colEl.parentNode.insertBefore(self.placeholderElement, colEl.nextSibling);
						self.moveColumn(column, true);
					}
				} else {
					if (self.toCol !== column || self.toColAfter) {
						colEl.parentNode.insertBefore(self.placeholderElement, colEl);
						self.moveColumn(column, false);
					}
				}
			}
		}.bind(self);

		colEl.addEventListener("mousedown", function (e) {
			self.touchMove = false;
			if (e.which === 1) {
				self.checkTimeout = setTimeout(function () {
					self.startMove(e, column);
				}, self.checkPeriod);
			}
		});

		colEl.addEventListener("mouseup", function (e) {
			if (e.which === 1) {
				if (self.checkTimeout) {
					clearTimeout(self.checkTimeout);
				}
			}
		});

		self.bindTouchEvents(column);
	}

	column.modules.moveColumn = config;
};

MoveColumns.prototype.bindTouchEvents = function (column) {
	var self = this,
	    colEl = column.getElement(),
	    startXMove = false,
	    //shifting center position of the cell
	dir = false,
	    currentCol,
	    nextCol,
	    prevCol,
	    nextColWidth,
	    prevColWidth,
	    nextColWidthLast,
	    prevColWidthLast;

	colEl.addEventListener("touchstart", function (e) {
		self.checkTimeout = setTimeout(function () {
			self.touchMove = true;
			currentCol = column;
			nextCol = column.nextColumn();
			nextColWidth = nextCol ? nextCol.getWidth() / 2 : 0;
			prevCol = column.prevColumn();
			prevColWidth = prevCol ? prevCol.getWidth() / 2 : 0;
			nextColWidthLast = 0;
			prevColWidthLast = 0;
			startXMove = false;

			self.startMove(e, column);
		}, self.checkPeriod);
	});

	colEl.addEventListener("touchmove", function (e) {
		var halfCol, diff, moveToCol;

		if (self.moving) {
			self.moveHover(e);

			if (!startXMove) {
				startXMove = e.touches[0].pageX;
			}

			diff = e.touches[0].pageX - startXMove;

			if (diff > 0) {
				if (nextCol && diff - nextColWidthLast > nextColWidth) {
					moveToCol = nextCol;

					if (moveToCol !== column) {
						startXMove = e.touches[0].pageX;
						moveToCol.getElement().parentNode.insertBefore(self.placeholderElement, moveToCol.getElement().nextSibling);
						self.moveColumn(moveToCol, true);
					}
				}
			} else {
				if (prevCol && -diff - prevColWidthLast > prevColWidth) {
					moveToCol = prevCol;

					if (moveToCol !== column) {
						startXMove = e.touches[0].pageX;
						moveToCol.getElement().parentNode.insertBefore(self.placeholderElement, moveToCol.getElement());
						self.moveColumn(moveToCol, false);
					}
				}
			}

			if (moveToCol) {
				currentCol = moveToCol;
				nextCol = moveToCol.nextColumn();
				nextColWidthLast = nextColWidth;
				nextColWidth = nextCol ? nextCol.getWidth() / 2 : 0;
				prevCol = moveToCol.prevColumn();
				prevColWidthLast = prevColWidth;
				prevColWidth = prevCol ? prevCol.getWidth() / 2 : 0;
			}
		}
	});

	colEl.addEventListener("touchend", function (e) {
		if (self.checkTimeout) {
			clearTimeout(self.checkTimeout);
		}
		if (self.moving) {
			self.endMove(e);
		}
	});
};

MoveColumns.prototype.startMove = function (e, column) {
	var element = column.getElement();

	this.moving = column;
	this.startX = (this.touchMove ? e.touches[0].pageX : e.pageX) - Tabulator.prototype.helpers.elOffset(element).left;

	this.table.element.classList.add("tabulator-block-select");

	//create placeholder
	this.placeholderElement.style.width = column.getWidth() + "px";
	this.placeholderElement.style.height = column.getHeight() + "px";

	element.parentNode.insertBefore(this.placeholderElement, element);
	element.parentNode.removeChild(element);

	//create hover element
	this.hoverElement = element.cloneNode(true);
	this.hoverElement.classList.add("tabulator-moving");

	this.table.columnManager.getElement().appendChild(this.hoverElement);

	this.hoverElement.style.left = "0";
	this.hoverElement.style.bottom = "0";

	if (!this.touchMove) {
		this._bindMouseMove();

		document.body.addEventListener("mousemove", this.moveHover);
		document.body.addEventListener("mouseup", this.endMove);
	}

	this.moveHover(e);
};

MoveColumns.prototype._bindMouseMove = function () {
	this.table.columnManager.columnsByIndex.forEach(function (column) {
		if (column.modules.moveColumn.mousemove) {
			column.getElement().addEventListener("mousemove", column.modules.moveColumn.mousemove);
		}
	});
};

MoveColumns.prototype._unbindMouseMove = function () {
	this.table.columnManager.columnsByIndex.forEach(function (column) {
		if (column.modules.moveColumn.mousemove) {
			column.getElement().removeEventListener("mousemove", column.modules.moveColumn.mousemove);
		}
	});
};

MoveColumns.prototype.moveColumn = function (column, after) {
	var movingCells = this.moving.getCells();

	this.toCol = column;
	this.toColAfter = after;

	if (after) {
		column.getCells().forEach(function (cell, i) {
			var cellEl = cell.getElement();
			cellEl.parentNode.insertBefore(movingCells[i].getElement(), cellEl.nextSibling);
		});
	} else {
		column.getCells().forEach(function (cell, i) {
			var cellEl = cell.getElement();
			cellEl.parentNode.insertBefore(movingCells[i].getElement(), cellEl);
		});
	}
};

MoveColumns.prototype.endMove = function (e) {
	if (e.which === 1 || this.touchMove) {
		this._unbindMouseMove();

		this.placeholderElement.parentNode.insertBefore(this.moving.getElement(), this.placeholderElement.nextSibling);
		this.placeholderElement.parentNode.removeChild(this.placeholderElement);
		this.hoverElement.parentNode.removeChild(this.hoverElement);

		this.table.element.classList.remove("tabulator-block-select");

		if (this.toCol) {
			this.table.columnManager.moveColumn(this.moving, this.toCol, this.toColAfter);
		}

		this.moving = false;
		this.toCol = false;
		this.toColAfter = false;

		if (!this.touchMove) {
			document.body.removeEventListener("mousemove", this.moveHover);
			document.body.removeEventListener("mouseup", this.endMove);
		}
	}
};

MoveColumns.prototype.moveHover = function (e) {
	var self = this,
	    columnHolder = self.table.columnManager.getElement(),
	    scrollLeft = columnHolder.scrollLeft,
	    xPos = (self.touchMove ? e.touches[0].pageX : e.pageX) - Tabulator.prototype.helpers.elOffset(columnHolder).left + scrollLeft,
	    scrollPos;

	self.hoverElement.style.left = xPos - self.startX + "px";

	if (xPos - scrollLeft < self.autoScrollMargin) {
		if (!self.autoScrollTimeout) {
			self.autoScrollTimeout = setTimeout(function () {
				scrollPos = Math.max(0, scrollLeft - 5);
				self.table.rowManager.getElement().scrollLeft = scrollPos;
				self.autoScrollTimeout = false;
			}, 1);
		}
	}

	if (scrollLeft + columnHolder.clientWidth - xPos < self.autoScrollMargin) {
		if (!self.autoScrollTimeout) {
			self.autoScrollTimeout = setTimeout(function () {
				scrollPos = Math.min(columnHolder.clientWidth, scrollLeft + 5);
				self.table.rowManager.getElement().scrollLeft = scrollPos;
				self.autoScrollTimeout = false;
			}, 1);
		}
	}
};

Tabulator.prototype.registerModule("moveColumn", MoveColumns);