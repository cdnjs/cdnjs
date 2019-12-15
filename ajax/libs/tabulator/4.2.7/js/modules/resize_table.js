/* Tabulator v4.2.7 (c) Oliver Folkerd */

var ResizeTable = function ResizeTable(table) {
	this.table = table; //hold Tabulator object
	this.binding = false;
	this.observer = false;
};

ResizeTable.prototype.initialize = function (row) {
	var table = this.table,
	    observer;

	if (typeof ResizeObserver !== "undefined" && table.rowManager.getRenderMode() === "virtual") {
		this.observer = new ResizeObserver(function (entry) {
			table.redraw();
		});

		this.observer.observe(table.element);
	} else {
		this.binding = function () {
			table.redraw();
		};

		window.addEventListener("resize", this.binding);
	}
};

ResizeTable.prototype.clearBindings = function (row) {
	if (this.binding) {
		window.removeEventListener("resize", this.binding);
	}

	if (this.observer) {
		this.observer.unobserve(this.table.element);
	}
};

Tabulator.prototype.registerModule("resizeTable", ResizeTable);