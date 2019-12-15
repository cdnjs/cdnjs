/*! Tablesaw - v3.0.6 - 2017-11-20
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2017 Filament Group; Licensed MIT */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["jquery"], function (jQuery) {
      return (root.Tablesaw = factory(jQuery, root));
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery')(root), root);
  } else {
    root.Tablesaw = factory(jQuery, root);
  }
}(typeof window !== "undefined" ? window : this, function ($, win) {
	"use strict";

var domContentLoadedTriggered = false;
document.addEventListener("DOMContentLoaded", function() {
	domContentLoadedTriggered = true;
});

var Tablesaw = {
	i18n: {
		modeStack: "Stack",
		modeSwipe: "Swipe",
		modeToggle: "Toggle",
		modeSwitchColumnsAbbreviated: "Cols",
		modeSwitchColumns: "Columns",
		columnToggleButton: "Columns",
		columnToggleError: "No eligible columns.",
		sort: "Sort",
		swipePreviousColumn: "Previous column",
		swipeNextColumn: "Next column"
	},
	// cut the mustard
	mustard:
		"head" in document && // IE9+, Firefox 4+, Safari 5.1+, Mobile Safari 4.1+, Opera 11.5+, Android 2.3+
		(!window.blackberry || window.WebKitPoint) && // only WebKit Blackberry (OS 6+)
		!window.operamini,
	$: $,
	_init: function(element) {
		Tablesaw.$(element || document).trigger("enhance.tablesaw");
	},
	init: function(element) {
		if (!domContentLoadedTriggered) {
			if ("addEventListener" in document) {
				// Use raw DOMContentLoaded instead of shoestring (may have issues in Android 2.3, exhibited by stack table)
				document.addEventListener("DOMContentLoaded", function() {
					Tablesaw._init(element);
				});
			}
		} else {
			Tablesaw._init(element);
		}
	}
};

$(win.document).on("enhance.tablesaw", function() {
	// Extend i18n config, if one exists.
	if (typeof TablesawConfig !== "undefined" && TablesawConfig.i18n) {
		Tablesaw.i18n = $.extend(Tablesaw.i18n, TablesawConfig.i18n || {});
	}

	Tablesaw.i18n.modes = [
		Tablesaw.i18n.modeStack,
		Tablesaw.i18n.modeSwipe,
		Tablesaw.i18n.modeToggle
	];
});

if (Tablesaw.mustard) {
	$(document.documentElement).addClass("tablesaw-enhanced");
}

(function() {
	var pluginName = "tablesaw";
	var classes = {
		toolbar: "tablesaw-bar"
	};
	var events = {
		create: "tablesawcreate",
		destroy: "tablesawdestroy",
		refresh: "tablesawrefresh",
		resize: "tablesawresize"
	};
	var defaultMode = "stack";
	var initSelector = "table";
	var initFilterSelector = "[data-tablesaw],[data-tablesaw-mode],[data-tablesaw-sortable]";
	var defaultConfig = {};

	Tablesaw.events = events;

	var Table = function(element) {
		if (!element) {
			throw new Error("Tablesaw requires an element.");
		}

		this.table = element;
		this.$table = $(element);

		// only one <thead> and <tfoot> are allowed, per the specification
		this.$thead = this.$table
			.children()
			.filter("thead")
			.eq(0);

		// multiple <tbody> are allowed, per the specification
		this.$tbody = this.$table.children().filter("tbody");

		this.mode = this.$table.attr("data-tablesaw-mode") || defaultMode;

		this.$toolbar = null;

		this.attributes = {
			subrow: "data-tablesaw-subrow",
			ignorerow: "data-tablesaw-ignorerow"
		};

		this.init();
	};

	Table.prototype.init = function() {
		if (!this.$thead.length) {
			throw new Error("tablesaw: a <thead> is required, but none was found.");
		}

		if (!this.$thead.find("th").length) {
			throw new Error("tablesaw: no header cells found. Are you using <th> inside of <thead>?");
		}

		// assign an id if there is none
		if (!this.$table.attr("id")) {
			this.$table.attr("id", pluginName + "-" + Math.round(Math.random() * 10000));
		}

		this.createToolbar();

		this._initCells();

		this.$table.data(pluginName, this);

		this.$table.trigger(events.create, [this]);
	};

	Table.prototype.getConfig = function(pluginSpecificConfig) {
		// shoestring extend doesn’t support arbitrary args
		var configs = $.extend(defaultConfig, pluginSpecificConfig || {});
		return $.extend(configs, typeof TablesawConfig !== "undefined" ? TablesawConfig : {});
	};

	Table.prototype._getPrimaryHeaderRow = function() {
		return this._getHeaderRows().eq(0);
	};

	Table.prototype._getHeaderRows = function() {
		return this.$thead
			.children()
			.filter("tr")
			.filter(function() {
				return !$(this).is("[data-tablesaw-ignorerow]");
			});
	};

	Table.prototype._getRowIndex = function($row) {
		return $row.prevAll().length;
	};

	Table.prototype._getHeaderRowIndeces = function() {
		var self = this;
		var indeces = [];
		this._getHeaderRows().each(function() {
			indeces.push(self._getRowIndex($(this)));
		});
		return indeces;
	};

	Table.prototype._getPrimaryHeaderCells = function($row) {
		return ($row || this._getPrimaryHeaderRow()).find("th");
	};

	Table.prototype._$getCells = function(th) {
		var self = this;
		return $(th)
			.add(th.cells)
			.filter(function() {
				var $t = $(this);
				var $row = $t.parent();
				var hasColspan = $t.is("[colspan]");
				// no subrows or ignored rows (keep cells in ignored rows that do not have a colspan)
				return (
					!$row.is("[" + self.attributes.subrow + "]") &&
					(!$row.is("[" + self.attributes.ignorerow + "]") || !hasColspan)
				);
			});
	};

	Table.prototype._getVisibleColspan = function() {
		var colspan = 0;
		this._getPrimaryHeaderCells().each(function() {
			var $t = $(this);
			if ($t.css("display") !== "none") {
				colspan += parseInt($t.attr("colspan"), 10) || 1;
			}
		});
		return colspan;
	};

	Table.prototype.getColspanForCell = function($cell) {
		var visibleColspan = this._getVisibleColspan();
		var visibleSiblingColumns = 0;
		if ($cell.closest("tr").data("tablesaw-rowspanned")) {
			visibleSiblingColumns++;
		}

		$cell.siblings().each(function() {
			var $t = $(this);
			var colColspan = parseInt($t.attr("colspan"), 10) || 1;

			if ($t.css("display") !== "none") {
				visibleSiblingColumns += colColspan;
			}
		});
		// console.log( $cell[ 0 ], visibleColspan, visibleSiblingColumns );

		return visibleColspan - visibleSiblingColumns;
	};

	Table.prototype.isCellInColumn = function(header, cell) {
		return $(header)
			.add(header.cells)
			.filter(function() {
				return this === cell;
			}).length;
	};

	Table.prototype.updateColspanCells = function(cls, header, userAction) {
		var self = this;
		var primaryHeaderRow = self._getPrimaryHeaderRow();

		// find persistent column rowspans
		this.$table.find("[rowspan][data-tablesaw-priority]").each(function() {
			var $t = $(this);
			if ($t.attr("data-tablesaw-priority") !== "persist") {
				return;
			}

			var $row = $t.closest("tr");
			var rowspan = parseInt($t.attr("rowspan"), 10);
			if (rowspan > 1) {
				$row = $row.next();

				$row.data("tablesaw-rowspanned", true);

				rowspan--;
			}
		});

		this.$table
			.find("[colspan],[data-tablesaw-maxcolspan]")
			.filter(function() {
				// is not in primary header row
				return $(this).closest("tr")[0] !== primaryHeaderRow[0];
			})
			.each(function() {
				var $cell = $(this);

				if (userAction === undefined || self.isCellInColumn(header, this)) {
				} else {
					// if is not a user action AND the cell is not in the updating column, kill it
					return;
				}

				var colspan = self.getColspanForCell($cell);

				if (cls && userAction !== undefined) {
					// console.log( colspan === 0 ? "addClass" : "removeClass", $cell );
					$cell[colspan === 0 ? "addClass" : "removeClass"](cls);
				}

				// cache original colspan
				var maxColspan = parseInt($cell.attr("data-tablesaw-maxcolspan"), 10);
				if (!maxColspan) {
					$cell.attr("data-tablesaw-maxcolspan", $cell.attr("colspan"));
				} else if (colspan > maxColspan) {
					colspan = maxColspan;
				}

				// console.log( this, "setting colspan to ", colspan );
				$cell.attr("colspan", colspan);
			});
	};

	Table.prototype._findPrimaryHeadersForCell = function(cell) {
		var $headerRow = this._getPrimaryHeaderRow();
		var $headers = this._getPrimaryHeaderCells($headerRow);
		var headerRowIndex = this._getRowIndex($headerRow);
		var results = [];

		for (var rowNumber = 0; rowNumber < this.headerMapping.length; rowNumber++) {
			if (rowNumber === headerRowIndex) {
				continue;
			}
			for (var colNumber = 0; colNumber < this.headerMapping[rowNumber].length; colNumber++) {
				if (this.headerMapping[rowNumber][colNumber] === cell) {
					results.push($headers[colNumber]);
				}
			}
		}
		return results;
	};

	// used by init cells
	Table.prototype.getRows = function() {
		var self = this;
		return this.$table.find("tr").filter(function() {
			return $(this)
				.closest("table")
				.is(self.$table);
		});
	};

	// used by sortable
	Table.prototype.getBodyRows = function(tbody) {
		return (tbody ? $(tbody) : this.$tbody).children().filter("tr");
	};

	Table.prototype.getHeaderCellIndex = function(cell) {
		var lookup = this.headerMapping[0];
		for (var colIndex = 0; colIndex < lookup.length; colIndex++) {
			if (lookup[colIndex] === cell) {
				return colIndex;
			}
		}

		return -1;
	};

	Table.prototype._initCells = function() {
		// re-establish original colspans
		this.$table.find("[data-tablesaw-maxcolspan]").each(function() {
			var $t = $(this);
			$t.attr("colspan", $t.attr("data-tablesaw-maxcolspan"));
		});

		var $rows = this.getRows();
		var columnLookup = [];

		$rows.each(function(rowNumber) {
			columnLookup[rowNumber] = [];
		});

		$rows.each(function(rowNumber) {
			var coltally = 0;
			var $t = $(this);
			var children = $t.children();

			children.each(function() {
				var colspan = parseInt(
					this.getAttribute("data-tablesaw-maxcolspan") || this.getAttribute("colspan"),
					10
				);
				var rowspan = parseInt(this.getAttribute("rowspan"), 10);

				// set in a previous rowspan
				while (columnLookup[rowNumber][coltally]) {
					coltally++;
				}

				columnLookup[rowNumber][coltally] = this;

				// TODO? both colspan and rowspan
				if (colspan) {
					for (var k = 0; k < colspan - 1; k++) {
						coltally++;
						columnLookup[rowNumber][coltally] = this;
					}
				}
				if (rowspan) {
					for (var j = 1; j < rowspan; j++) {
						columnLookup[rowNumber + j][coltally] = this;
					}
				}

				coltally++;
			});
		});

		var headerRowIndeces = this._getHeaderRowIndeces();
		for (var colNumber = 0; colNumber < columnLookup[0].length; colNumber++) {
			for (var headerIndex = 0, k = headerRowIndeces.length; headerIndex < k; headerIndex++) {
				var headerCol = columnLookup[headerRowIndeces[headerIndex]][colNumber];

				var rowNumber = headerRowIndeces[headerIndex];
				var rowCell;

				if (!headerCol.cells) {
					headerCol.cells = [];
				}

				while (rowNumber < columnLookup.length) {
					rowCell = columnLookup[rowNumber][colNumber];

					if (headerCol !== rowCell) {
						headerCol.cells.push(rowCell);
					}

					rowNumber++;
				}
			}
		}

		this.headerMapping = columnLookup;
	};

	Table.prototype.refresh = function() {
		this._initCells();

		this.$table.trigger(events.refresh, [this]);
	};

	Table.prototype._getToolbarAnchor = function() {
		var $parent = this.$table.parent();
		if ($parent.is(".tablesaw-overflow")) {
			return $parent;
		}
		return this.$table;
	};

	Table.prototype._getToolbar = function($anchor) {
		if (!$anchor) {
			$anchor = this._getToolbarAnchor();
		}
		return $anchor.prev().filter("." + classes.toolbar);
	};

	Table.prototype.createToolbar = function() {
		// Insert the toolbar
		// TODO move this into a separate component
		var $anchor = this._getToolbarAnchor();
		var $toolbar = this._getToolbar($anchor);
		if (!$toolbar.length) {
			$toolbar = $("<div>")
				.addClass(classes.toolbar)
				.insertBefore($anchor);
		}
		this.$toolbar = $toolbar;

		if (this.mode) {
			this.$toolbar.addClass("tablesaw-mode-" + this.mode);
		}
	};

	Table.prototype.destroy = function() {
		// Don’t remove the toolbar, just erase the classes on it.
		// Some of the table features are not yet destroy-friendly.
		this._getToolbar().each(function() {
			this.className = this.className.replace(/\btablesaw-mode\-\w*\b/gi, "");
		});

		var tableId = this.$table.attr("id");
		$(document).off("." + tableId);
		$(window).off("." + tableId);

		// other plugins
		this.$table.trigger(events.destroy, [this]);

		this.$table.removeData(pluginName);
	};

	// Collection method.
	$.fn[pluginName] = function() {
		return this.each(function() {
			var $t = $(this);

			if ($t.data(pluginName)) {
				return;
			}

			new Table(this);
		});
	};

	var $doc = $(win.document);
	$doc.on("enhance.tablesaw", function(e) {
		// Cut the mustard
		if (Tablesaw.mustard) {
			$(e.target)
				.find(initSelector)
				.filter(initFilterSelector)
				[pluginName]();
		}
	});

	// Avoid a resize during scroll:
	// Some Mobile devices trigger a resize during scroll (sometimes when
	// doing elastic stretch at the end of the document or from the
	// location bar hide)
	var isScrolling = false;
	var scrollTimeout;
	$doc.on("scroll.tablesaw", function() {
		isScrolling = true;

		win.clearTimeout(scrollTimeout);
		scrollTimeout = win.setTimeout(function() {
			isScrolling = false;
		}, 300); // must be greater than the resize timeout below
	});

	var resizeTimeout;
	$(win).on("resize", function() {
		if (!isScrolling) {
			win.clearTimeout(resizeTimeout);
			resizeTimeout = win.setTimeout(function() {
				$doc.trigger(events.resize);
			}, 150); // must be less than the scrolling timeout above.
		}
	});

	Tablesaw.Table = Table;
})();

(function() {
	var classes = {
		stackTable: "tablesaw-stack",
		cellLabels: "tablesaw-cell-label",
		cellContentLabels: "tablesaw-cell-content"
	};

	var data = {
		key: "tablesaw-stack"
	};

	var attrs = {
		labelless: "data-tablesaw-no-labels",
		hideempty: "data-tablesaw-hide-empty"
	};

	var Stack = function(element, tablesaw) {
		this.tablesaw = tablesaw;
		this.$table = $(element);

		this.labelless = this.$table.is("[" + attrs.labelless + "]");
		this.hideempty = this.$table.is("[" + attrs.hideempty + "]");

		this.$table.data(data.key, this);
	};

	Stack.prototype.init = function() {
		this.$table.addClass(classes.stackTable);

		if (this.labelless) {
			return;
		}

		var self = this;

		this.$table
			.find("th, td")
			.filter(function() {
				return !$(this).closest("thead").length;
			})
			.filter(function() {
				return (
					!$(this)
						.closest("tr")
						.is("[" + attrs.labelless + "]") &&
					(!self.hideempty || !!$(this).html())
				);
			})
			.each(function() {
				var $newHeader = $(document.createElement("b")).addClass(classes.cellLabels);
				var $cell = $(this);

				$(self.tablesaw._findPrimaryHeadersForCell(this)).each(function(index) {
					var $header = $(this.cloneNode(true));
					// TODO decouple from sortable better
					// Changed from .text() in https://github.com/filamentgroup/tablesaw/commit/b9c12a8f893ec192830ec3ba2d75f062642f935b
					// to preserve structural html in headers, like <a>
					var $sortableButton = $header.find(".tablesaw-sortable-btn");
					$header.find(".tablesaw-sortable-arrow").remove();

					// TODO decouple from checkall better
					var $checkall = $header.find("[data-tablesaw-checkall]");
					$checkall.closest("label").remove();
					if ($checkall.length) {
						$newHeader = $([]);
						return;
					}

					if (index > 0) {
						$newHeader.append(document.createTextNode(", "));
					}
					$newHeader.append(
						$sortableButton.length ? $sortableButton[0].childNodes : $header[0].childNodes
					);
				});

				if ($newHeader.length && !$cell.find("." + classes.cellContentLabels).length) {
					$cell.wrapInner("<span class='" + classes.cellContentLabels + "'></span>");
				}

				// Update if already exists.
				var $label = $cell.find("." + classes.cellLabels);
				if (!$label.length) {
					$cell.prepend($newHeader);
				} else {
					// only if changed
					$label.replaceWith($newHeader);
				}
			});
	};

	Stack.prototype.destroy = function() {
		this.$table.removeClass(classes.stackTable);
		this.$table.find("." + classes.cellLabels).remove();
		this.$table.find("." + classes.cellContentLabels).each(function() {
			$(this).replaceWith(this.childNodes);
		});
	};

	// on tablecreate, init
	$(document)
		.on(Tablesaw.events.create, function(e, tablesaw) {
			if (tablesaw.mode === "stack") {
				var table = new Stack(tablesaw.table, tablesaw);
				table.init();
			}
		})
		.on(Tablesaw.events.refresh, function(e, tablesaw) {
			if (tablesaw.mode === "stack") {
				$(tablesaw.table)
					.data(data.key)
					.init();
			}
		})
		.on(Tablesaw.events.destroy, function(e, tablesaw) {
			if (tablesaw.mode === "stack") {
				$(tablesaw.table)
					.data(data.key)
					.destroy();
			}
		});

	Tablesaw.Stack = Stack;
})();

	return Tablesaw;
}));
