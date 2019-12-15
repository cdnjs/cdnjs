/*! Tablesaw - v3.0.5 - 2017-10-30
* https://github.com/filamentgroup/tablesaw
* Copyright (c) 2017 Filament Group; Licensed MIT */
// UMD module definition
// From: https://github.com/umdjs/umd/blob/master/templates/jqueryPlugin.js

(function (factory) {
	if (typeof define === 'function' && define.amd) {
			// AMD. Register as an anonymous module.
			define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				// require('jQuery') returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				if ( typeof window !== 'undefined' ) {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";

	var win = typeof window !== "undefined" ? window : this;

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
		!window.operamini
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
		this.$thead = this.$table.children().filter("thead").eq(0);

		// multiple <tbody> are allowed, per the specification
		this.$tbody = this.$table.children().filter("tbody");

		this.mode = this.$table.attr("data-tablesaw-mode") || defaultMode;

		this.$toolbar = null;

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
		return this.$thead.children().filter("tr").filter(function() {
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
			return $(this).closest("table").is(self.$table);
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
				var colspan = parseInt(this.getAttribute("colspan"), 10);
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
			$toolbar = $("<div>").addClass(classes.toolbar).insertBefore($anchor);
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
			$(e.target).find(initSelector).filter(initFilterSelector)[pluginName]();
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
					!$(this).closest("tr").is("[" + attrs.labelless + "]") &&
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
				$(tablesaw.table).data(data.key).init();
			}
		})
		.on(Tablesaw.events.destroy, function(e, tablesaw) {
			if (tablesaw.mode === "stack") {
				$(tablesaw.table).data(data.key).destroy();
			}
		});
})();

(function() {
	var pluginName = "tablesawbtn",
		methods = {
			_create: function() {
				return $(this).each(function() {
					$(this)
						.trigger("beforecreate." + pluginName)
						[pluginName]("_init")
						.trigger("create." + pluginName);
				});
			},
			_init: function() {
				var oEl = $(this),
					sel = this.getElementsByTagName("select")[0];

				if (sel) {
					// TODO next major version: remove .btn-select
					$(this).addClass("btn-select tablesaw-btn-select")[pluginName]("_select", sel);
				}
				return oEl;
			},
			_select: function(sel) {
				var update = function(oEl, sel) {
					var opts = $(sel).find("option");
					var label = document.createElement("span");
					var el;
					var children;
					var found = false;

					label.setAttribute("aria-hidden", "true");
					label.innerHTML = "&#160;";

					opts.each(function() {
						var opt = this;
						if (opt.selected) {
							label.innerHTML = opt.text;
						}
					});

					children = oEl.childNodes;
					if (opts.length > 0) {
						for (var i = 0, l = children.length; i < l; i++) {
							el = children[i];

							if (el && el.nodeName.toUpperCase() === "SPAN") {
								oEl.replaceChild(label, el);
								found = true;
							}
						}

						if (!found) {
							oEl.insertBefore(label, oEl.firstChild);
						}
					}
				};

				update(this, sel);
				$(this).on("change refresh", function() {
					update(this, sel);
				});
			}
		};

	// Collection method.
	$.fn[pluginName] = function(arrg, a, b, c) {
		return this.each(function() {
			// if it's a method
			if (arrg && typeof arrg === "string") {
				return $.fn[pluginName].prototype[arrg].call(this, a, b, c);
			}

			// don't re-init
			if ($(this).data(pluginName + "active")) {
				return $(this);
			}

			$(this).data(pluginName + "active", true);

			$.fn[pluginName].prototype._create.call(this);
		});
	};

	// add methods
	$.extend($.fn[pluginName].prototype, methods);
})();

(function() {
	var data = {
		key: "tablesaw-coltoggle"
	};

	var ColumnToggle = function(element) {
		this.$table = $(element);

		if (!this.$table.length) {
			return;
		}

		this.tablesaw = this.$table.data("tablesaw");

		this.attributes = {
			subrow: "data-tablesaw-subrow",
			ignorerow: "data-tablesaw-ignorerow",
			btnTarget: "data-tablesaw-columntoggle-btn-target",
			set: "data-tablesaw-columntoggle-set"
		};

		this.classes = {
			columnToggleTable: "tablesaw-columntoggle",
			columnBtnContain: "tablesaw-columntoggle-btnwrap tablesaw-advance",
			columnBtn: "tablesaw-columntoggle-btn tablesaw-nav-btn down",
			popup: "tablesaw-columntoggle-popup",
			priorityPrefix: "tablesaw-priority-"
		};

		this.set = [];
		this.$headers = this.tablesaw._getPrimaryHeaderCells();

		this.$table.data(data.key, this);
	};

	// Column Toggle Sets (one column chooser can control multiple tables)
	ColumnToggle.prototype.initSet = function() {
		var set = this.$table.attr(this.attributes.set);
		if (set) {
			// Should not include the current table
			var table = this.$table[0];
			this.set = $("table[" + this.attributes.set + "='" + set + "']")
				.filter(function() {
					return this !== table;
				})
				.get();
		}
	};

	ColumnToggle.prototype.init = function() {
		if (!this.$table.length) {
			return;
		}

		var tableId,
			id,
			$menuButton,
			$popup,
			$menu,
			$btnContain,
			self = this;

		var cfg = this.tablesaw.getConfig({
			getColumnToggleLabelTemplate: function(text) {
				return "<label><input type='checkbox' checked>" + text + "</label>";
			}
		});

		this.$table.addClass(this.classes.columnToggleTable);

		tableId = this.$table.attr("id");
		id = tableId + "-popup";
		$btnContain = $("<div class='" + this.classes.columnBtnContain + "'></div>");
		// TODO next major version: remove .btn
		$menuButton = $(
			"<a href='#" +
				id +
				"' class='btn tablesaw-btn btn-micro " +
				this.classes.columnBtn +
				"' data-popup-link>" +
				"<span>" +
				Tablesaw.i18n.columnToggleButton +
				"</span></a>"
		);
		$popup = $("<div class='" + this.classes.popup + "' id='" + id + "'></div>");
		$menu = $("<div class='btn-group'></div>");

		this.$popup = $popup;

		var hasNonPersistentHeaders = false;
		this.$headers.each(function() {
			var $this = $(this),
				priority = $this.attr("data-tablesaw-priority"),
				$cells = self.$getCells(this);

			if (priority && priority !== "persist") {
				$cells.addClass(self.classes.priorityPrefix + priority);

				$(cfg.getColumnToggleLabelTemplate($this.text()))
					.appendTo($menu)
					.find('input[type="checkbox"]')
					.data("tablesaw-header", this);

				hasNonPersistentHeaders = true;
			}
		});

		if (!hasNonPersistentHeaders) {
			$menu.append("<label>" + Tablesaw.i18n.columnToggleError + "</label>");
		}

		$menu.appendTo($popup);

		function onToggleCheckboxChange(checkbox) {
			var checked = checkbox.checked;

			var header = self.getHeaderFromCheckbox(checkbox);
			var $cells = self.$getCells(header);

			$cells[!checked ? "addClass" : "removeClass"]("tablesaw-toggle-cellhidden");
			$cells[checked ? "addClass" : "removeClass"]("tablesaw-toggle-cellvisible");

			self.updateColspanIgnoredRows(checked, $(header).add(header.cells));

			self.$table.trigger("tablesawcolumns");
		}

		// bind change event listeners to inputs - TODO: move to a private method?
		$menu.find('input[type="checkbox"]').on("change", function(e) {
			onToggleCheckboxChange(e.target);

			if (self.set.length) {
				var index;
				$(self.$popup).find("input[type='checkbox']").each(function(j) {
					if (this === e.target) {
						index = j;
						return false;
					}
				});

				$(self.set).each(function() {
					var checkbox = $(this).data(data.key).$popup.find("input[type='checkbox']").get(index);
					if (checkbox) {
						checkbox.checked = e.target.checked;
						onToggleCheckboxChange(checkbox);
					}
				});
			}
		});

		$menuButton.appendTo($btnContain);

		// Use a different target than the toolbar
		var $btnTarget = $(this.$table.attr(this.attributes.btnTarget));
		$btnContain.appendTo($btnTarget.length ? $btnTarget : this.tablesaw.$toolbar);

		function closePopup(event) {
			// Click came from inside the popup, ignore.
			if (event && $(event.target).closest("." + self.classes.popup).length) {
				return;
			}

			$(document).off("click." + tableId);
			$menuButton.removeClass("up").addClass("down");
			$btnContain.removeClass("visible");
		}

		var closeTimeout;
		function openPopup() {
			$btnContain.addClass("visible");
			$menuButton.removeClass("down").addClass("up");

			$(document).off("click." + tableId, closePopup);

			window.clearTimeout(closeTimeout);
			closeTimeout = window.setTimeout(function() {
				$(document).on("click." + tableId, closePopup);
			}, 15);
		}

		$menuButton.on("click.tablesaw", function(event) {
			event.preventDefault();

			if (!$btnContain.is(".visible")) {
				openPopup();
			} else {
				closePopup();
			}
		});

		$popup.appendTo($btnContain);

		this.$menu = $menu;

		// Fix for iOS not rendering shadows correctly when using `-webkit-overflow-scrolling`
		var $overflow = this.$table.closest(".tablesaw-overflow");
		if ($overflow.css("-webkit-overflow-scrolling")) {
			var timeout;
			$overflow.on("scroll", function() {
				var $div = $(this);
				window.clearTimeout(timeout);
				timeout = window.setTimeout(function() {
					$div.css("-webkit-overflow-scrolling", "auto");
					window.setTimeout(function() {
						$div.css("-webkit-overflow-scrolling", "touch");
					}, 0);
				}, 100);
			});
		}

		$(window).on(Tablesaw.events.resize + "." + tableId, function() {
			self.refreshToggle();
		});

		this.initSet();
		this.refreshToggle();
	};

	ColumnToggle.prototype.updateColspanIgnoredRows = function(invisibleColumnCount, $cells) {
		this.$table
			.find("[" + this.attributes.subrow + "],[" + this.attributes.ignorerow + "]")
			.each(function() {
				var $t = $(this);
				var $td = $t.find("td[colspan]").eq(0);
				var excludedInvisibleColumns;

				var colspan;
				var originalColspan;
				var modifier;

				// increment or decrementing only (from a user triggered column show/hide)
				if (invisibleColumnCount === true || invisibleColumnCount === false) {
					// unless the column being hidden is not included in the colspan
					modifier = $cells.filter(function() {
						return this === $td[0];
					}).length
						? invisibleColumnCount ? 1 : -1
						: 0;

					colspan = parseInt($td.attr("colspan"), 10) + modifier;
				} else {
					// triggered from a resize or init
					originalColspan = $td.data("original-colspan");

					if (originalColspan) {
						colspan = originalColspan;
					} else {
						colspan = parseInt($td.attr("colspan"), 10);
						$td.data("original-colspan", colspan);
					}

					excludedInvisibleColumns = $t.find("td").filter(function() {
						return this !== $td[0] && $(this).css("display") === "none";
					}).length;

					colspan -= invisibleColumnCount - excludedInvisibleColumns;
				}

				// TODO add a colstart param so that this more appropriately selects colspan elements based on the column being hidden.
				$td.attr("colspan", colspan);
			});
	};

	ColumnToggle.prototype.$getCells = function(th) {
		var self = this;
		return $(th).add(th.cells).filter(function() {
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

	ColumnToggle.prototype.getHeaderFromCheckbox = function(checkbox) {
		return $(checkbox).data("tablesaw-header");
	};

	ColumnToggle.prototype.refreshToggle = function() {
		var self = this;
		var invisibleColumns = 0;
		this.$menu.find("input").each(function() {
			var header = self.getHeaderFromCheckbox(this);
			var isVisible = self.$getCells(header).eq(0).css("display") === "table-cell";
			this.checked = isVisible;

			if (!isVisible) {
				invisibleColumns++;
			}
		});

		this.updateColspanIgnoredRows(invisibleColumns);
	};

	ColumnToggle.prototype.destroy = function() {
		this.$table.removeClass(this.classes.columnToggleTable);
		this.$table.find("th, td").each(function() {
			var $cell = $(this);
			$cell.removeClass("tablesaw-toggle-cellhidden").removeClass("tablesaw-toggle-cellvisible");

			this.className = this.className.replace(/\bui\-table\-priority\-\d\b/g, "");
		});
	};

	// on tablecreate, init
	$(document).on(Tablesaw.events.create, function(e, tablesaw) {
		if (tablesaw.mode === "columntoggle") {
			var table = new ColumnToggle(tablesaw.table);
			table.init();
		}
	});

	$(document).on(Tablesaw.events.destroy, function(e, tablesaw) {
		if (tablesaw.mode === "columntoggle") {
			$(tablesaw.table).data(data.key).destroy();
		}
	});

	$(document).on(Tablesaw.events.refresh, function(e, tablesaw) {
		if (tablesaw.mode === "columntoggle") {
			$(tablesaw.table).data(data.key).refreshPriority();
		}
	});
})();

(function() {
	function getSortValue(cell) {
		var text = [];
		$(cell.childNodes).each(function() {
			var $el = $(this);
			if ($el.is("input, select")) {
				text.push($el.val());
			} else if ($el.is(".tablesaw-cell-label")) {
			} else {
				text.push(($el.text() || "").replace(/^\s+|\s+$/g, ""));
			}
		});

		return text.join("");
	}

	var pluginName = "tablesaw-sortable",
		initSelector = "table[data-" + pluginName + "]",
		sortableSwitchSelector = "[data-" + pluginName + "-switch]",
		attrs = {
			sortCol: "data-tablesaw-sortable-col",
			defaultCol: "data-tablesaw-sortable-default-col",
			numericCol: "data-tablesaw-sortable-numeric",
			subRow: "data-tablesaw-subrow",
			ignoreRow: "data-tablesaw-ignorerow"
		},
		classes = {
			head: pluginName + "-head",
			ascend: pluginName + "-ascending",
			descend: pluginName + "-descending",
			switcher: pluginName + "-switch",
			tableToolbar: "tablesaw-bar-section",
			sortButton: pluginName + "-btn"
		},
		methods = {
			_create: function(o) {
				return $(this).each(function() {
					var init = $(this).data(pluginName + "-init");
					if (init) {
						return false;
					}
					$(this)
						.data(pluginName + "-init", true)
						.trigger("beforecreate." + pluginName)
						[pluginName]("_init", o)
						.trigger("create." + pluginName);
				});
			},
			_init: function() {
				var el = $(this);
				var tblsaw = el.data("tablesaw");
				var heads;
				var $switcher;

				function addClassToHeads(h) {
					$.each(h, function(i, v) {
						$(v).addClass(classes.head);
					});
				}

				function makeHeadsActionable(h, fn) {
					$.each(h, function(i, col) {
						var b = $("<button class='" + classes.sortButton + "'/>");
						b.on("click", { col: col }, fn);
						$(col).wrapInner(b).find("button").append("<span class='tablesaw-sortable-arrow'>");
					});
				}

				function clearOthers(headcells) {
					$.each(headcells, function(i, v) {
						var col = $(v);
						col.removeAttr(attrs.defaultCol);
						col.removeClass(classes.ascend);
						col.removeClass(classes.descend);
					});
				}

				function headsOnAction(e) {
					if ($(e.target).is("a[href]")) {
						return;
					}

					e.stopPropagation();
					var headCell = $(e.target).closest("[" + attrs.sortCol + "]"),
						v = e.data.col,
						newSortValue = heads.index(headCell[0]);

					clearOthers(
						headCell.closest("thead").find("th").filter(function() {
							return this !== headCell[0];
						})
					);
					if (headCell.is("." + classes.descend) || !headCell.is("." + classes.ascend)) {
						el[pluginName]("sortBy", v, true);
						newSortValue += "_asc";
					} else {
						el[pluginName]("sortBy", v);
						newSortValue += "_desc";
					}
					if ($switcher) {
						$switcher.find("select").val(newSortValue).trigger("refresh");
					}

					e.preventDefault();
				}

				function handleDefault(heads) {
					$.each(heads, function(idx, el) {
						var $el = $(el);
						if ($el.is("[" + attrs.defaultCol + "]")) {
							if (!$el.is("." + classes.descend)) {
								$el.addClass(classes.ascend);
							}
						}
					});
				}

				function addSwitcher(heads) {
					$switcher = $("<div>").addClass(classes.switcher).addClass(classes.tableToolbar);

					var html = ["<label>" + Tablesaw.i18n.sort + ":"];

					// TODO next major version: remove .btn
					html.push('<span class="btn tablesaw-btn"><select>');
					heads.each(function(j) {
						var $t = $(this);
						var isDefaultCol = $t.is("[" + attrs.defaultCol + "]");
						var isDescending = $t.is("." + classes.descend);

						var hasNumericAttribute = $t.is("[" + attrs.numericCol + "]");
						var numericCount = 0;
						// Check only the first four rows to see if the column is numbers.
						var numericCountMax = 5;

						$(this.cells.slice(0, numericCountMax)).each(function() {
							if (!isNaN(parseInt(getSortValue(this), 10))) {
								numericCount++;
							}
						});
						var isNumeric = numericCount === numericCountMax;
						if (!hasNumericAttribute) {
							$t.attr(attrs.numericCol, isNumeric ? "" : "false");
						}

						html.push(
							"<option" +
								(isDefaultCol && !isDescending ? " selected" : "") +
								' value="' +
								j +
								'_asc">' +
								$t.text() +
								" " +
								(isNumeric ? "&#x2191;" : "(A-Z)") +
								"</option>"
						);
						html.push(
							"<option" +
								(isDefaultCol && isDescending ? " selected" : "") +
								' value="' +
								j +
								'_desc">' +
								$t.text() +
								" " +
								(isNumeric ? "&#x2193;" : "(Z-A)") +
								"</option>"
						);
					});
					html.push("</select></span></label>");

					$switcher.html(html.join(""));

					var $firstChild = tblsaw.$toolbar.children().eq(0);
					if ($firstChild.length) {
						$switcher.insertBefore($firstChild);
					} else {
						$switcher.appendTo(tblsaw.$toolbar);
					}
					$switcher.find(".tablesaw-btn").tablesawbtn();
					$switcher.find("select").on("change", function() {
						var val = $(this).val().split("_"),
							head = heads.eq(val[0]);

						clearOthers(head.siblings());
						el[pluginName]("sortBy", head.get(0), val[1] === "asc");
					});
				}

				el.addClass(pluginName);

				heads = el.children().filter("thead").find("th[" + attrs.sortCol + "]");

				addClassToHeads(heads);
				makeHeadsActionable(heads, headsOnAction);
				handleDefault(heads);

				if (el.is(sortableSwitchSelector)) {
					addSwitcher(heads);
				}
			},
			sortRows: function(rows, colNum, ascending, col, tbody) {
				function convertCells(cellArr, belongingToTbody) {
					var cells = [];
					$.each(cellArr, function(i, cell) {
						var row = cell.parentNode;
						var $row = $(row);
						// next row is a subrow
						var subrows = [];
						var $next = $row.next();
						while ($next.is("[" + attrs.subRow + "]")) {
							subrows.push($next[0]);
							$next = $next.next();
						}

						var tbody = row.parentNode;

						// current row is a subrow
						if ($row.is("[" + attrs.subRow + "]")) {
						} else if (tbody === belongingToTbody) {
							cells.push({
								element: cell,
								cell: getSortValue(cell),
								row: row,
								subrows: subrows.length ? subrows : null,
								ignored: $row.is("[" + attrs.ignoreRow + "]")
							});
						}
					});
					return cells;
				}

				function getSortFxn(ascending, forceNumeric) {
					var fn,
						regex = /[^\-\+\d\.]/g;
					if (ascending) {
						fn = function(a, b) {
							if (a.ignored || b.ignored) {
								return 0;
							}
							if (forceNumeric) {
								return (
									parseFloat(a.cell.replace(regex, "")) - parseFloat(b.cell.replace(regex, ""))
								);
							} else {
								return a.cell.toLowerCase() > b.cell.toLowerCase() ? 1 : -1;
							}
						};
					} else {
						fn = function(a, b) {
							if (a.ignored || b.ignored) {
								return 0;
							}
							if (forceNumeric) {
								return (
									parseFloat(b.cell.replace(regex, "")) - parseFloat(a.cell.replace(regex, ""))
								);
							} else {
								return a.cell.toLowerCase() < b.cell.toLowerCase() ? 1 : -1;
							}
						};
					}
					return fn;
				}

				function convertToRows(sorted) {
					var newRows = [],
						i,
						l;
					for (i = 0, l = sorted.length; i < l; i++) {
						newRows.push(sorted[i].row);
						if (sorted[i].subrows) {
							newRows.push(sorted[i].subrows);
						}
					}
					return newRows;
				}

				var fn;
				var sorted;
				var cells = convertCells(col.cells, tbody);

				var customFn = $(col).data("tablesaw-sort");

				fn =
					(customFn && typeof customFn === "function" ? customFn(ascending) : false) ||
					getSortFxn(
						ascending,
						$(col).is("[" + attrs.numericCol + "]") &&
							!$(col).is("[" + attrs.numericCol + '="false"]')
					);

				sorted = cells.sort(fn);

				rows = convertToRows(sorted);

				return rows;
			},
			makeColDefault: function(col, a) {
				var c = $(col);
				c.attr(attrs.defaultCol, "true");
				if (a) {
					c.removeClass(classes.descend);
					c.addClass(classes.ascend);
				} else {
					c.removeClass(classes.ascend);
					c.addClass(classes.descend);
				}
			},
			sortBy: function(col, ascending) {
				var el = $(this);
				var colNum;
				var tbl = el.data("tablesaw");
				tbl.$tbody.each(function() {
					var tbody = this;
					var $tbody = $(this);
					var rows = tbl.getBodyRows(tbody);
					var sortedRows;
					var map = tbl.headerMapping[0];
					var j, k;

					// find the column number that we’re sorting
					for (j = 0, k = map.length; j < k; j++) {
						if (map[j] === col) {
							colNum = j;
							break;
						}
					}

					sortedRows = el[pluginName]("sortRows", rows, colNum, ascending, col, tbody);

					// replace Table rows
					for (j = 0, k = sortedRows.length; j < k; j++) {
						$tbody.append(sortedRows[j]);
					}
				});

				el[pluginName]("makeColDefault", col, ascending);

				el.trigger("tablesaw-sorted");
			}
		};

	// Collection method.
	$.fn[pluginName] = function(arrg) {
		var args = Array.prototype.slice.call(arguments, 1),
			returnVal;

		// if it's a method
		if (arrg && typeof arrg === "string") {
			returnVal = $.fn[pluginName].prototype[arrg].apply(this[0], args);
			return typeof returnVal !== "undefined" ? returnVal : $(this);
		}
		// check init
		if (!$(this).data(pluginName + "-active")) {
			$(this).data(pluginName + "-active", true);
			$.fn[pluginName].prototype._create.call(this, arrg);
		}
		return $(this);
	};
	// add methods
	$.extend($.fn[pluginName].prototype, methods);

	$(document).on(Tablesaw.events.create, function(e, Tablesaw) {
		if (Tablesaw.$table.is(initSelector)) {
			Tablesaw.$table[pluginName]();
		}
	});
})();

(function() {
	var classes = {
		hideBtn: "disabled",
		persistWidths: "tablesaw-fix-persist",
		hiddenCol: "tablesaw-swipe-cellhidden",
		persistCol: "tablesaw-swipe-cellpersist",
		allColumnsVisible: "tablesaw-all-cols-visible"
	};
	var attrs = {
		disableTouchEvents: "data-tablesaw-no-touch",
		ignorerow: "data-tablesaw-ignorerow",
		subrow: "data-tablesaw-subrow"
	};

	function createSwipeTable(tbl, $table) {
		var tblsaw = $table.data("tablesaw");

		var $btns = $("<div class='tablesaw-advance'></div>");
		// TODO next major version: remove .btn
		var $prevBtn = $(
			"<a href='#' class='btn tablesaw-nav-btn tablesaw-btn btn-micro left'>" +
				Tablesaw.i18n.swipePreviousColumn +
				"</a>"
		).appendTo($btns);
		// TODO next major version: remove .btn
		var $nextBtn = $(
			"<a href='#' class='btn tablesaw-nav-btn tablesaw-btn btn-micro right'>" +
				Tablesaw.i18n.swipeNextColumn +
				"</a>"
		).appendTo($btns);

		var $headerCells = tbl._getPrimaryHeaderCells();
		var $headerCellsNoPersist = $headerCells.not('[data-tablesaw-priority="persist"]');
		var headerWidths = [];
		var $head = $(document.head || "head");
		var tableId = $table.attr("id");

		if (!$headerCells.length) {
			throw new Error("tablesaw swipe: no header cells found.");
		}

		$table.addClass("tablesaw-swipe");

		$table.find("." + classes.hiddenCol).removeClass(classes.hiddenCol);

		// Calculate initial widths
		$headerCells.each(function() {
			var width = this.offsetWidth;
			headerWidths.push(width);
		});

		$btns.appendTo(tblsaw.$toolbar);

		if (!tableId) {
			tableId = "tableswipe-" + Math.round(Math.random() * 10000);
			$table.attr("id", tableId);
		}

		function $getCells(headerCell) {
			return $(headerCell.cells).add(headerCell).filter(function() {
				return !$(this).parent().is("[" + attrs.ignorerow + "],[" + attrs.subrow + "]");
			});
		}

		function showColumn(headerCell) {
			$getCells(headerCell).removeClass(classes.hiddenCol);
		}

		function hideColumn(headerCell) {
			$getCells(headerCell).addClass(classes.hiddenCol);
		}

		function persistColumn(headerCell) {
			$getCells(headerCell).addClass(classes.persistCol);
		}

		function isPersistent(headerCell) {
			return $(headerCell).is('[data-tablesaw-priority="persist"]');
		}

		function countVisibleColspan() {
			var count = 0;
			$headerCells.each(function() {
				var $t = $(this);
				if ($t.is("." + classes.hiddenCol)) {
					return;
				}
				count += parseInt($t.attr("colspan") || 1, 10);
			});
			return count;
		}

		function updateColspanOnIgnoredRows(newColspan) {
			if (!newColspan) {
				newColspan = countVisibleColspan();
			}
			$table
				.find("[" + attrs.ignorerow + "],[" + attrs.subrow + "]")
				.find("td[colspan]")
				.each(function() {
					var $t = $(this);
					var colspan = parseInt($t.attr("colspan"), 10);
					$t.attr("colspan", newColspan);
				});
		}

		function unmaintainWidths() {
			$table.removeClass(classes.persistWidths);
			$("#" + tableId + "-persist").remove();
		}

		function maintainWidths() {
			var prefix = "#" + tableId + ".tablesaw-swipe ",
				styles = [],
				tableWidth = $table.width(),
				hash = [],
				newHash;

			// save persistent column widths (as long as they take up less than 75% of table width)
			$headerCells.each(function(index) {
				var width;
				if (isPersistent(this)) {
					width = this.offsetWidth;

					if (width < tableWidth * 0.75) {
						hash.push(index + "-" + width);
						styles.push(
							prefix +
								" ." +
								classes.persistCol +
								":nth-child(" +
								(index + 1) +
								") { width: " +
								width +
								"px; }"
						);
					}
				}
			});
			newHash = hash.join("_");

			if (styles.length) {
				$table.addClass(classes.persistWidths);
				var $style = $("#" + tableId + "-persist");
				// If style element not yet added OR if the widths have changed
				if (!$style.length || $style.data("tablesaw-hash") !== newHash) {
					// Remove existing
					$style.remove();

					$("<style>" + styles.join("\n") + "</style>")
						.attr("id", tableId + "-persist")
						.data("tablesaw-hash", newHash)
						.appendTo($head);
				}
			}
		}

		function getNext() {
			var next = [],
				checkFound;

			$headerCellsNoPersist.each(function(i) {
				var $t = $(this),
					isHidden = $t.css("display") === "none" || $t.is("." + classes.hiddenCol);

				if (!isHidden && !checkFound) {
					checkFound = true;
					next[0] = i;
				} else if (isHidden && checkFound) {
					next[1] = i;

					return false;
				}
			});

			return next;
		}

		function getPrev() {
			var next = getNext();
			return [next[1] - 1, next[0] - 1];
		}

		function nextpair(fwd) {
			return fwd ? getNext() : getPrev();
		}

		function canAdvance(pair) {
			return pair[1] > -1 && pair[1] < $headerCellsNoPersist.length;
		}

		function matchesMedia() {
			var matchMedia = $table.attr("data-tablesaw-swipe-media");
			return !matchMedia || ("matchMedia" in win && win.matchMedia(matchMedia).matches);
		}

		function fakeBreakpoints() {
			if (!matchesMedia()) {
				return;
			}

			var containerWidth = $table.parent().width(),
				persist = [],
				sum = 0,
				sums = [],
				visibleNonPersistantCount = $headerCells.length;

			$headerCells.each(function(index) {
				var $t = $(this),
					isPersist = $t.is('[data-tablesaw-priority="persist"]');

				persist.push(isPersist);
				sum += headerWidths[index];
				sums.push(sum);

				// is persistent or is hidden
				if (isPersist || sum > containerWidth) {
					visibleNonPersistantCount--;
				}
			});

			// We need at least one column to swipe.
			var needsNonPersistentColumn = visibleNonPersistantCount === 0;
			var visibleColumnCount = 0;

			$headerCells.each(function(index) {
				var colspan = parseInt($(this).attr("colspan") || 1, 10);
				if (persist[index]) {
					visibleColumnCount += colspan;
					// for visual box-shadow
					persistColumn(this);
					return;
				}

				if (sums[index] <= containerWidth || needsNonPersistentColumn) {
					visibleColumnCount += colspan;
					needsNonPersistentColumn = false;
					showColumn(this);
				} else {
					hideColumn(this);
				}
			});

			updateColspanOnIgnoredRows(visibleColumnCount);
			unmaintainWidths();

			$table.trigger("tablesawcolumns");
		}

		function advance(fwd) {
			var pair = nextpair(fwd);
			if (canAdvance(pair)) {
				if (isNaN(pair[0])) {
					if (fwd) {
						pair[0] = 0;
					} else {
						pair[0] = $headerCellsNoPersist.length - 1;
					}
				}

				maintainWidths();

				hideColumn($headerCellsNoPersist.get(pair[0]));
				showColumn($headerCellsNoPersist.get(pair[1]));
				updateColspanOnIgnoredRows();

				$table.trigger("tablesawcolumns");
			}
		}

		$prevBtn.add($nextBtn).on("click", function(e) {
			advance(!!$(e.target).closest($nextBtn).length);
			e.preventDefault();
		});

		function getCoord(event, key) {
			return (event.touches || event.originalEvent.touches)[0][key];
		}

		if (!$table.is("[" + attrs.disableTouchEvents + "]")) {
			$table.on("touchstart.swipetoggle", function(e) {
				var originX = getCoord(e, "pageX");
				var originY = getCoord(e, "pageY");
				var x;
				var y;
				var scrollTop = window.pageYOffset;

				$(win).off(Tablesaw.events.resize, fakeBreakpoints);

				$(this)
					.on("touchmove.swipetoggle", function(e) {
						x = getCoord(e, "pageX");
						y = getCoord(e, "pageY");
					})
					.on("touchend.swipetoggle", function() {
						var cfg = tbl.getConfig({
							swipeHorizontalThreshold: 30,
							swipeVerticalThreshold: 30
						});

						// This config code is a little awkward because shoestring doesn’t support deep $.extend
						// Trying to work around when devs only override one of (not both) horizontalThreshold or
						// verticalThreshold in their TablesawConfig.
						// @TODO major version bump: remove cfg.swipe, move to just use the swipePrefix keys
						var verticalThreshold = cfg.swipe
							? cfg.swipe.verticalThreshold
							: cfg.swipeVerticalThreshold;
						var horizontalThreshold = cfg.swipe
							? cfg.swipe.horizontalThreshold
							: cfg.swipeHorizontalThreshold;

						var isPageScrolled = Math.abs(window.pageYOffset - scrollTop) >= verticalThreshold;
						var isVerticalSwipe = Math.abs(y - originY) >= verticalThreshold;

						if (!isVerticalSwipe && !isPageScrolled) {
							if (x - originX < -1 * horizontalThreshold) {
								advance(true);
							}
							if (x - originX > horizontalThreshold) {
								advance(false);
							}
						}

						window.setTimeout(function() {
							$(win).on(Tablesaw.events.resize, fakeBreakpoints);
						}, 300);

						$(this).off("touchmove.swipetoggle touchend.swipetoggle");
					});
			});
		}

		$table
			.on("tablesawcolumns.swipetoggle", function() {
				var canGoPrev = canAdvance(getPrev());
				var canGoNext = canAdvance(getNext());
				$prevBtn[canGoPrev ? "removeClass" : "addClass"](classes.hideBtn);
				$nextBtn[canGoNext ? "removeClass" : "addClass"](classes.hideBtn);

				tblsaw.$toolbar[!canGoPrev && !canGoNext ? "addClass" : "removeClass"](
					classes.allColumnsVisible
				);
			})
			.on("tablesawnext.swipetoggle", function() {
				advance(true);
			})
			.on("tablesawprev.swipetoggle", function() {
				advance(false);
			})
			.on(Tablesaw.events.destroy + ".swipetoggle", function() {
				var $t = $(this);

				$t.removeClass("tablesaw-swipe");
				tblsaw.$toolbar.find(".tablesaw-advance").remove();
				$(win).off(Tablesaw.events.resize, fakeBreakpoints);

				$t.off(".swipetoggle");
			})
			.on(Tablesaw.events.refresh, function() {
				// manual refresh
				headerWidths = [];
				$headerCells.each(function() {
					var width = this.offsetWidth;
					headerWidths.push(width);
				});

				fakeBreakpoints();
			});

		fakeBreakpoints();
		$(win).on(Tablesaw.events.resize, fakeBreakpoints);
	}

	// on tablecreate, init
	$(document).on(Tablesaw.events.create, function(e, tablesaw) {
		if (tablesaw.mode === "swipe") {
			createSwipeTable(tablesaw, tablesaw.$table);
		}
	});
})();

(function() {
	var MiniMap = {
		attr: {
			init: "data-tablesaw-minimap"
		}
	};

	function createMiniMap($table) {
		var tblsaw = $table.data("tablesaw");
		var $btns = $('<div class="tablesaw-advance minimap">');
		var $dotNav = $('<ul class="tablesaw-advance-dots">').appendTo($btns);
		var hideDot = "tablesaw-advance-dots-hide";
		var $headerCells = $table.data("tablesaw")._getPrimaryHeaderCells();

		// populate dots
		$headerCells.each(function() {
			$dotNav.append("<li><i></i></li>");
		});

		$btns.appendTo(tblsaw.$toolbar);

		function showMinimap($table) {
			var mq = $table.attr(MiniMap.attr.init);
			return !mq || (win.matchMedia && win.matchMedia(mq).matches);
		}

		function showHideNav() {
			if (!showMinimap($table)) {
				$btns.css("display", "none");
				return;
			}
			$btns.css("display", "block");

			// show/hide dots
			var dots = $dotNav.find("li").removeClass(hideDot);
			$table.find("thead th").each(function(i) {
				if ($(this).css("display") === "none") {
					dots.eq(i).addClass(hideDot);
				}
			});
		}

		// run on init and resize
		showHideNav();
		$(win).on(Tablesaw.events.resize, showHideNav);

		$table
			.on("tablesawcolumns.minimap", function() {
				showHideNav();
			})
			.on(Tablesaw.events.destroy + ".minimap", function() {
				var $t = $(this);

				tblsaw.$toolbar.find(".tablesaw-advance").remove();
				$(win).off(Tablesaw.events.resize, showHideNav);

				$t.off(".minimap");
			});
	}

	// on tablecreate, init
	$(document).on(Tablesaw.events.create, function(e, tablesaw) {
		if (
			(tablesaw.mode === "swipe" || tablesaw.mode === "columntoggle") &&
			tablesaw.$table.is("[ " + MiniMap.attr.init + "]")
		) {
			createMiniMap(tablesaw.$table);
		}
	});
})();

(function() {
	var S = {
		selectors: {
			init: "table[data-tablesaw-mode-switch]"
		},
		attributes: {
			excludeMode: "data-tablesaw-mode-exclude"
		},
		classes: {
			main: "tablesaw-modeswitch",
			toolbar: "tablesaw-bar-section"
		},
		modes: ["stack", "swipe", "columntoggle"],
		init: function(table) {
			var $table = $(table);
			var tblsaw = $table.data("tablesaw");
			var ignoreMode = $table.attr(S.attributes.excludeMode);
			var $toolbar = tblsaw.$toolbar;
			var $switcher = $("<div>").addClass(S.classes.main + " " + S.classes.toolbar);

			var html = [
					'<label><span class="abbreviated">' +
						Tablesaw.i18n.modeSwitchColumnsAbbreviated +
						'</span><span class="longform">' +
						Tablesaw.i18n.modeSwitchColumns +
						"</span>:"
				],
				dataMode = $table.attr("data-tablesaw-mode"),
				isSelected;

			// TODO next major version: remove .btn
			html.push('<span class="btn tablesaw-btn"><select>');
			for (var j = 0, k = S.modes.length; j < k; j++) {
				if (ignoreMode && ignoreMode.toLowerCase() === S.modes[j]) {
					continue;
				}

				isSelected = dataMode === S.modes[j];

				html.push(
					"<option" +
						(isSelected ? " selected" : "") +
						' value="' +
						S.modes[j] +
						'">' +
						Tablesaw.i18n.modes[j] +
						"</option>"
				);
			}
			html.push("</select></span></label>");

			$switcher.html(html.join(""));

			var $otherToolbarItems = $toolbar.find(".tablesaw-advance").eq(0);
			if ($otherToolbarItems.length) {
				$switcher.insertBefore($otherToolbarItems);
			} else {
				$switcher.appendTo($toolbar);
			}

			$switcher.find(".tablesaw-btn").tablesawbtn();
			$switcher.find("select").on("change", function(event) {
				return S.onModeChange.call(table, event, $(this).val());
			});
		},
		onModeChange: function(event, val) {
			var $table = $(this);
			var tblsaw = $table.data("tablesaw");
			var $switcher = tblsaw.$toolbar.find("." + S.classes.main);

			$switcher.remove();
			tblsaw.destroy();

			$table.attr("data-tablesaw-mode", val);
			$table.tablesaw();
		}
	};

	$(win.document).on(Tablesaw.events.create, function(e, Tablesaw) {
		if (Tablesaw.$table.is(S.selectors.init)) {
			S.init(Tablesaw.table);
		}
	});
})();

(function() {
	var pluginName = "tablesawCheckAll";

	function CheckAll(tablesaw) {
		this.tablesaw = tablesaw;
		this.$table = tablesaw.$table;

		this.attr = "data-tablesaw-checkall";
		this.checkAllSelector = "[" + this.attr + "]";
		this.forceCheckedSelector = "[" + this.attr + "-checked]";
		this.forceUncheckedSelector = "[" + this.attr + "-unchecked]";
		this.checkboxSelector = 'input[type="checkbox"]';

		this.$triggers = null;
		this.$checkboxes = null;

		if (this.$table.data(pluginName)) {
			return;
		}
		this.$table.data(pluginName, this);
		this.init();
	}

	CheckAll.prototype._filterCells = function($checkboxes) {
		return $checkboxes
			.filter(function() {
				return !$(this).closest("tr").is("[data-tablesaw-subrow],[data-tablesaw-ignorerow]");
			})
			.find(this.checkboxSelector)
			.not(this.checkAllSelector);
	};

	// With buttons you can use a scoping selector like: data-tablesaw-checkall="#my-scoped-id input[type='checkbox']"
	CheckAll.prototype.getCheckboxesForButton = function(button) {
		return this._filterCells($($(button).attr(this.attr)));
	};

	CheckAll.prototype.getCheckboxesForCheckbox = function(checkbox) {
		return this._filterCells($($(checkbox).closest("th")[0].cells));
	};

	CheckAll.prototype.init = function() {
		var self = this;
		this.$table.find(this.checkAllSelector).each(function() {
			var $trigger = $(this);
			if ($trigger.is(self.checkboxSelector)) {
				self.addCheckboxEvents(this);
			} else {
				self.addButtonEvents(this);
			}
		});
	};

	CheckAll.prototype.addButtonEvents = function(trigger) {
		var self = this;

		// Update body checkboxes when header checkbox is changed
		$(trigger).on("click", function(event) {
			event.preventDefault();

			var $checkboxes = self.getCheckboxesForButton(this);

			var allChecked = true;
			$checkboxes.each(function() {
				if (!this.checked) {
					allChecked = false;
				}
			});

			var setChecked;
			if ($(this).is(self.forceCheckedSelector)) {
				setChecked = true;
			} else if ($(this).is(self.forceUncheckedSelector)) {
				setChecked = false;
			} else {
				setChecked = allChecked ? false : true;
			}

			$checkboxes.each(function() {
				this.checked = setChecked;

				$(this).trigger("change." + pluginName);
			});
		});
	};

	CheckAll.prototype.addCheckboxEvents = function(trigger) {
		var self = this;

		// Update body checkboxes when header checkbox is changed
		$(trigger).on("change", function() {
			var setChecked = this.checked;

			self.getCheckboxesForCheckbox(this).each(function() {
				this.checked = setChecked;
			});
		});

		var $checkboxes = self.getCheckboxesForCheckbox(trigger);

		// Update header checkbox when body checkboxes are changed
		$checkboxes.on("change." + pluginName, function() {
			var checkedCount = 0;
			$checkboxes.each(function() {
				if (this.checked) {
					checkedCount++;
				}
			});

			var allSelected = checkedCount === $checkboxes.length;

			trigger.checked = allSelected;

			// only indeterminate if some are selected (not all and not none)
			trigger.indeterminate = checkedCount !== 0 && !allSelected;
		});
	};

	// on tablecreate, init
	$(document).on(Tablesaw.events.create, function(e, tablesaw) {
		new CheckAll(tablesaw);
	});
})();

}));
