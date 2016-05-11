/**
 * jqGrid addons using jQuery UI
 * Author: Mark Williams
 * Changed by Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * depends on jQuery UI
**/

/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, define */
/*jslint browser: true, devel: true, eqeq: true, nomen: true, plusplus: true, unparam: true, vars: true, white: true */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery",
			"./grid.base",
			//"../plugins/ui.multiselect",
			"jquery-ui/dialog",
			"jquery-ui/draggable",
			"jquery-ui/droppable",
			"jquery-ui/resizable",
			"jquery-ui/sortable"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	var jgrid = $.jgrid, jqID = jgrid.jqID;
	// begin module grid.jqueryui
	var $UiMultiselect = $.ui != null ? $.ui.multiselect : null;
	if (jgrid.msie && jgrid.msiever() === 8) {
		$.expr[":"].hidden = function (elem) {
			return elem.offsetWidth === 0 || elem.offsetHeight === 0 ||
				elem.style.display === "none";
		};
	}
	// requiere load multiselect before grid
	jgrid._multiselect = false;
	if ($UiMultiselect) {
		if ($UiMultiselect.prototype._setSelected) {
			var setSelected = $UiMultiselect.prototype._setSelected;
			$UiMultiselect.prototype._setSelected = function (item, selected) {
				var self = this, ret = setSelected.call(self, item, selected);
				if (selected && self.selectedList) {
					var elt = self.element;
					self.selectedList.find("li").each(function () {
						if ($(self).data("optionLink")) {
							$(self).data("optionLink").remove().appendTo(elt);
						}
					});
				}
				return ret;
			};
		}
		if ($UiMultiselect.prototype.destroy) {
			$UiMultiselect.prototype.destroy = function () {
				var self = this;
				self.element.show();
				self.container.remove();
				if ($.Widget === undefined) {
					$.widget.prototype.destroy.apply(self, arguments);
				} else {
					$.Widget.prototype.destroy.apply(self, arguments);
				}
			};
		}
		jgrid._multiselect = true;
	}

	jgrid.extend({
		sortableColumns: function (tblrow) {
			return this.each(function () {
				var ts = this, p = ts.p, tid = jqID(p.id);
				function start() { p.disableClick = true; }
				var sortableOpts = {
					tolerance: "pointer",
					axis: "x",
					scrollSensitivity: "1",
					items: ">th:not(:has(#jqgh_" + tid + "_cb" + ",#jqgh_" + tid + "_rn" + ",#jqgh_" + tid + "_subgrid),:hidden)",
					placeholder: {
						element: function (item) {
							var el = $(document.createElement(item[0].nodeName))
									.addClass(item[0].className + " ui-sortable-placeholder ui-state-highlight")
									.removeClass("ui-sortable-helper")[0];
							return el;
						},
						update: function (self, o) {
							o.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css("paddingTop") || 0, 10) - parseInt(self.currentItem.css("paddingBottom") || 0, 10));
							o.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css("paddingLeft") || 0, 10) - parseInt(self.currentItem.css("paddingRight") || 0, 10));
						}
					},
					update: function (event, ui) {
						var th = $(">th", $(ui.item).parent()), tid1 = p.id + "_", permutation = [];
						th.each(function () {
							var id = $(">div", this).get(0).id.replace(/^jqgh_/, "").replace(tid1, ""),
								iCol = p.iColByName[id];
							if (iCol !== undefined) {
								permutation.push(iCol);
							}
						});

						$(ts).jqGrid("remapColumns", permutation, true, true);
						if ($.isFunction(p.sortable.update)) {
							p.sortable.update(permutation);
						}
						setTimeout(function () { p.disableClick = false; }, 50);
					}
				};
				if (p.sortable.options) {
					$.extend(sortableOpts, p.sortable.options);
				} else if ($.isFunction(p.sortable)) {
					p.sortable = { "update": p.sortable };
				}
				if (sortableOpts.start) {
					var s = sortableOpts.start;
					sortableOpts.start = function (e, ui) {
						start();
						s.call(this, e, ui);
					};
				} else {
					sortableOpts.start = start;
				}
				if (p.sortable.exclude) {
					sortableOpts.items += ":not(" + p.sortable.exclude + ")";
				}
				var $e = tblrow.sortable(sortableOpts), dataObj = $e.data("sortable") || $e.data("uiSortable") || $e.data("ui-sortable");
				if (dataObj != null) {
					dataObj.floating = true;
				}
			});
		},
		columnChooser: function (opts) {
			var $self = this, self = $self[0], p = self.p, selector, select, colMap = {}, fixedCols = [], dopts, mopts, $dialogContent, multiselectData, listHeight,
				colModel = p.colModel, nCol = colModel.length, colNames = p.colNames,
				getMultiselectWidgetData = function ($elem) {
					return ($UiMultiselect && $UiMultiselect.prototype && $elem.data($UiMultiselect.prototype.widgetFullName || $UiMultiselect.prototype.widgetName)) ||
						$elem.data("ui-multiselect") || $elem.data("multiselect");
				};

			if ($("#colchooser_" + jqID(p.id)).length) { return; }
			selector = $('<div id="colchooser_' + p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>');
			select = $("select", selector);

			function insert(perm, i, v) {
				var a, b;
				if (i >= 0) {
					a = perm.slice();
					b = a.splice(i, Math.max(perm.length - i, i));
					if (i > perm.length) { i = perm.length; }
					a[i] = v;
					return a.concat(b);
				}
				return perm;
			}
			function call(fn, obj) {
				if (!fn) { return; }
				if (typeof fn === "string") {
					if ($.fn[fn]) {
						$.fn[fn].apply(obj, $.makeArray(arguments).slice(2));
					}
				} else if ($.isFunction(fn)) {
					fn.apply(obj, $.makeArray(arguments).slice(2));
				}
			}

			opts = $.extend({
				width: 400,
				height: 240,
				classname: null,
				done: function (perm) {
					if (perm && p.groupHeader == null) {
						$self.jqGrid("remapColumns", perm, true);
					}
				},
				/* msel is either the name of a ui widget class that
				   extends a multiselect, or a function that supports
				   creating a multiselect object (with no argument,
				   or when passed an object), and destroying it (when
				   passed the string "destroy"). */
				msel: "multiselect",
				/* "msel_opts" : {}, */

				/* dlog is either the name of a ui widget class that
				   behaves in a dialog-like way, or a function, that
				   supports creating a dialog (when passed dlog_opts)
				   or destroying a dialog (when passed the string
				   "destroy")
				   */
				dlog: "dialog",
				dialog_opts: {
					minWidth: 470,
					dialogClass: "ui-jqdialog"
				},
				/* dlog_opts is either an option object to be passed
				   to "dlog", or (more likely) a function that creates
				   the options object.
				   The default produces a suitable options object for
				   ui.dialog */
				dlog_opts: function (options) {
					var buttons = {};
					buttons[options.bSubmit] = function () {
						options.apply_perm();
						options.cleanup(false);
					};
					buttons[options.bCancel] = function () {
						options.cleanup(true);
					};
					return $.extend(true, {
						buttons: buttons,
						close: function () {
							options.cleanup(true);
						},
						modal: options.modal || false,
						resizable: options.resizable || true,
						width: options.width + 70,
						resize: function () {
							var widgetData = getMultiselectWidgetData(select),
								$thisDialogContent = widgetData.container.closest(".ui-dialog-content");

							if ($thisDialogContent.length > 0 && typeof $thisDialogContent[0].style === "object") {
								$thisDialogContent[0].style.width = "";
							} else {
								$thisDialogContent.css("width", ""); // or just remove width style
							}

							widgetData.selectedList.height(Math.max(widgetData.selectedContainer.height() - widgetData.selectedActions.outerHeight() - 1, 1));
							widgetData.availableList.height(Math.max(widgetData.availableContainer.height() - widgetData.availableActions.outerHeight() - 1, 1));
						}
					}, options.dialog_opts || {});
				},
				/* Function to get the permutation array, and pass it to the
				   "done" function */
				apply_perm: function () {
					var perm = [], showHideColOptions = { skipSetGridWidth: true, skipSetGroupHeaders: true };

					$("option", select).each(function () {
						if ($(this).is(":selected")) {
							$self.jqGrid("showCol", colModel[this.value].name, showHideColOptions);
						} else {
							$self.jqGrid("hideCol", colModel[this.value].name, showHideColOptions);
						}
					});
					if (p.groupHeader && (typeof p.groupHeader === "object" || $.isFunction(p.groupHeader))) {
						$self.jqGrid("destroyGroupHeader", false);
						if (p.pivotOptions != null && p.pivotOptions.colHeaders != null && p.pivotOptions.colHeaders.length > 1) {
							var i, gHead = p.pivotOptions.colHeaders;
							for (i = 0; i < gHead.length; i++) {
								// Multiple calls of setGroupHeaders for one grid are wrong,
								// but there are produces good results in case of usage
								// useColSpanStyle: false option. The rowspan values
								// needed be increased in case of usage useColSpanStyle: true
								if (gHead[i] && gHead[i].groupHeaders.length) {
									$self.jqGrid("setGroupHeaders", gHead[i]);
								}
							}
						} else {
							$self.jqGrid("setGroupHeaders", p.groupHeader);
						}
					}

					//fixedCols.slice(0);
					$("option", select).filter(":selected").each(function () { perm.push(parseInt(this.value, 10)); });
					$.each(perm, function () { delete colMap[colModel[parseInt(this, 10)].name]; });
					$.each(colMap, function () {
						var ti = parseInt(this, 10);
						perm = insert(perm, ti, ti);
					});
					if (opts.done) {
						opts.done.call($self, perm);
					}
					$self.jqGrid("setGridWidth",
						!p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%") ? p.tblwidth : p.width,
						p.shrinkToFit);
				},
				/* Function to cleanup the dialog, and select. Also calls the
				   done function with no permutation (to indicate that the
				   columnChooser was aborted */
				cleanup: function (calldone) {
					call(opts.dlog, selector, "destroy");
					call(opts.msel, select, "destroy");
					selector.remove();
					if (calldone && opts.done) {
						opts.done.call($self);
					}
				},
				msel_opts: {}
			},
			$self.jqGrid("getGridRes", "col"),
			jgrid.col, opts || {});
			if ($.ui) {
				if ($UiMultiselect && $UiMultiselect.defaults) {
					if (!jgrid._multiselect) {
						// should be in language file
						alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
						return;
					}
					// ??? the next line uses $.ui.multiselect.defaults which will be typically undefined
					opts.msel_opts = $.extend($UiMultiselect.defaults, opts.msel_opts);
				}
			}
			if (opts.caption) {
				selector.attr("title", opts.caption);
			}
			if (opts.classname) {
				selector.addClass(opts.classname);
				select.addClass(opts.classname);
			}
			if (opts.width) {
				$(">div", selector).css({ width: opts.width, margin: "0 auto" });
				select.css("width", opts.width);
			}
			if (opts.height) {
				$(">div", selector).css("height", opts.height);
				select.css("height", opts.height - 10);
			}

			select.empty();
			var gh = p.groupHeader, colHeader = {}, k, j, l, iCol, ghItem;
			// fill colHeader for columns which have column header
			if (gh != null && gh.groupHeaders != null) {
				for (k = 0, l = gh.groupHeaders.length; k < l; k++) {
					ghItem = gh.groupHeaders[k];
					for (j = 0; j < ghItem.numberOfColumns; j++) {
						iCol = p.iColByName[ghItem.startColumnName] + j;
						colHeader[iCol] = $.isFunction(opts.buildItemText) ?
								opts.buildItemText.call($self[0], {
									iCol: iCol,
									cm: colModel[iCol],
									cmName: colModel[iCol].name,
									colName: colNames[iCol],
									groupTitleText: ghItem.titleText
								}) :
								$.jgrid.stripHtml(ghItem.titleText) + ": " +
									$.jgrid.stripHtml(colNames[iCol] === "" ? colModel[iCol].name : colNames[iCol]);
					}
				}
			}
			// fill colHeader for all other columns
			for (iCol = 0; iCol < nCol; iCol++) {
				if (colHeader[iCol] === undefined) {
					colHeader[iCol] = $.isFunction(opts.buildItemText) ?
							opts.buildItemText.call($self[0], {
								iCol: iCol,
								cm: colModel[iCol],
								cmName: colModel[iCol].name,
								colName: colNames[iCol],
								groupTitleText: null
							}) :
							$.jgrid.stripHtml(colNames[iCol]);
				}
			}
			$.each(colModel, function (i) {

				colMap[this.name] = i;
				if (this.hidedlg) {
					if (!this.hidden) {
						fixedCols.push(i);
					}
					return;
				}
				select.append("<option value='" + i + "'" +
					(p.headertitles || this.headerTitle ? (" title='" + jgrid.stripHtml(typeof this.headerTitle === "string" ? this.headerTitle : colHeader[i]) + "'") : "") +
					(this.hidden ? "" : " selected='selected'") + ">" + colHeader[i] + "</option>");
			});

			dopts = $.isFunction(opts.dlog_opts) ? opts.dlog_opts.call($self, opts) : opts.dlog_opts;
			call(opts.dlog, selector, dopts);
			mopts = $.isFunction(opts.msel_opts) ? opts.msel_opts.call($self, opts) : opts.msel_opts;
			call(opts.msel, select, mopts);

			// fix height of elements of the multiselect widget
			$dialogContent = $("#colchooser_" + jqID(p.id));

			$dialogContent.css({ margin: "auto" });
			$dialogContent.find(">div").css({ width: "100%", height: "100%", margin: "auto" });

			multiselectData = getMultiselectWidgetData(select);
			if (multiselectData) {
				multiselectData.container.css({ width: "100%", height: "100%", margin: "auto" });

				multiselectData.selectedContainer.css({ width: multiselectData.options.dividerLocation * 100 + "%", height: "100%", margin: "auto", boxSizing: "border-box" });
				multiselectData.availableContainer.css({ width: (100 - multiselectData.options.dividerLocation * 100) + "%", height: "100%", margin: "auto", boxSizing: "border-box" });

				// set height for both selectedList and availableList
				multiselectData.selectedList.css("height", "auto");
				multiselectData.availableList.css("height", "auto");
				listHeight = Math.max(multiselectData.selectedList.height(), multiselectData.availableList.height());
				listHeight = Math.min(listHeight, $(window).height());
				multiselectData.selectedList.css("height", listHeight);
				multiselectData.availableList.css("height", listHeight);
			}
		},
		sortableRows: function (opts) {
			// Can accept all sortable options and events
			return this.each(function () {
				var $t = this, grid = $t.grid, p = $t.p;
				if (!grid) { return; }
				// Currently we disable a treeGrid sortable
				if (p.treeGrid) { return; }
				if ($.fn.sortable) {
					opts = $.extend({
						cursor: "move",
						axis: "y",
						items: ">.jqgrow"
					},
					opts || {});
					if (opts.start && $.isFunction(opts.start)) {
						opts._start_ = opts.start;
						delete opts.start;
					} else { opts._start_ = false; }
					if (opts.update && $.isFunction(opts.update)) {
						opts._update_ = opts.update;
						delete opts.update;
					} else { opts._update_ = false; }
					opts.start = function (ev, ui) {
						$(ui.item).css("border-width", "0");
						$("td", ui.item).each(function (i) {
							this.style.width = grid.cols[i].style.width;
						});
						if (p.subGrid) {
							var subgid = $(ui.item).attr("id");
							try {
								$($t).jqGrid("collapseSubGridRow", subgid);
							} catch (ignore) { }
						}
						if (opts._start_) {
							opts._start_.apply(this, [ev, ui]);
						}
					};
					opts.update = function (ev, ui) {
						$(ui.item).css("border-width", "");
						if (p.rownumbers === true) {
							$("td.jqgrid-rownum", $t.rows).each(function (i) {
								$(this).html(i + 1 + (parseInt(p.page, 10) - 1) * parseInt(p.rowNum, 10));
							});
						}
						if (opts._update_) {
							opts._update_.apply(this, [ev, ui]);
						}
					};
					$($t.tBodies[0]).sortable(opts);
					if ($.isFunction($.fn.disableSelection)) {
						// The method disableSelection exists starting with jQuery UI 1.6,
						// but it's declared as deprecated since jQuery UI 1.9
						// see http://jqueryui.com/upgrade-guide/1.9/#deprecated-disableselection-and-enableselection
						// so we use disableSelection only if it exists
						$($t.tBodies[0]).children("tr.jqgrow").disableSelection();
					}
				}
			});
		},
		gridDnD: function (opts) {
			return this.each(function () {
				var $t = this, j, cn;
				if (!$t.grid) { return; }
				// Currently we disable a treeGrid drag and drop
				if ($t.p.treeGrid) { return; }
				if (!$.fn.draggable || !$.fn.droppable) { return; }
				function updateDnD() {
					var datadnd = $.data($t, "dnd");
					$("tr.jqgrow:not(.ui-draggable)", $t).draggable($.isFunction(datadnd.drag) ? datadnd.drag.call($($t), datadnd) : datadnd.drag);
				}
				var appender = "<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>";
				if ($("#jqgrid_dnd")[0] === undefined) {
					$("body").append(appender);
				}

				if (typeof opts === "string" && opts === "updateDnD" && $t.p.jqgdnd === true) {
					updateDnD();
					return;
				}
				opts = $.extend({
					drag: function (opts1) {
						return $.extend({
							start: function (ev, ui) {
								var i, subgid;
								// if we are in subgrid mode try to collapse the node
								if ($t.p.subGrid) {
									subgid = $(ui.helper).attr("id");
									try {
										$($t).jqGrid("collapseSubGridRow", subgid);
									} catch (ignore) { }
								}
								// hack
								// drag and drop does not insert tr in table, when the table has no rows
								// we try to insert new empty row on the target(s)
								for (i = 0; i < $.data($t, "dnd").connectWith.length; i++) {
									if ($($.data($t, "dnd").connectWith[i]).jqGrid("getGridParam", "reccount") === 0) {
										$($.data($t, "dnd").connectWith[i]).jqGrid("addRowData", "jqg_empty_row", {});
									}
								}
								ui.helper.addClass("ui-state-highlight");
								$("td", ui.helper).each(function (iCol) {
									this.style.width = $t.grid.headers[iCol].width + "px";
								});
								if (opts1.onstart && $.isFunction(opts1.onstart)) { opts1.onstart.call($($t), ev, ui); }
							},
							stop: function (ev, ui) {
								var i, ids;
								if (ui.helper.dropped && !opts1.dragcopy) {
									ids = $(ui.helper).attr("id");
									if (ids === undefined) { ids = $(this).attr("id"); }
									$($t).jqGrid("delRowData", ids);
								}
								// if we have a empty row inserted from start event try to delete it
								for (i = 0; i < $.data($t, "dnd").connectWith.length; i++) {
									$($.data($t, "dnd").connectWith[i]).jqGrid("delRowData", "jqg_empty_row");
								}
								if (opts1.onstop && $.isFunction(opts1.onstop)) { opts1.onstop.call($($t), ev, ui); }
							}
						}, opts1.drag_opts || {});
					},
					drop: function (opts1) {
						return $.extend({
							accept: function (d) {
								if (!$(d).hasClass("jqgrow")) { return d; }
								var tid = $(d).closest("table.ui-jqgrid-btable");
								if (tid.length > 0 && $.data(tid[0], "dnd") !== undefined) {
									var cn1 = $.data(tid[0], "dnd").connectWith;
									return $.inArray("#" + jqID(this.id), cn1) !== -1 ? true : false;
								}
								return false;
							},
							drop: function (ev, ui) {
								if (!$(ui.draggable).hasClass("jqgrow")) { return; }
								var accept = $(ui.draggable).attr("id");
								var getdata = ui.draggable.parent().parent().jqGrid("getRowData", accept);
								if (!opts1.dropbyname) {
									var i = 0, tmpdata = {}, nm, key;
									var dropmodel = $("#" + jqID(this.id)).jqGrid("getGridParam", "colModel");
									try {
										for (key in getdata) {
											if (getdata.hasOwnProperty(key)) {
												nm = dropmodel[i].name;
												if (!(nm === "cb" || nm === "rn" || nm === "subgrid")) {
													if (getdata.hasOwnProperty(key) && dropmodel[i]) {
														tmpdata[nm] = getdata[key];
													}
												}
												i++;
											}
										}
										getdata = tmpdata;
									} catch (ignore) { }
								}
								ui.helper.dropped = true;
								if (opts1.beforedrop && $.isFunction(opts1.beforedrop)) {
									//parameters to this callback - event, element, data to be inserted, sender, reciever
									// should return object which will be inserted into the reciever
									var datatoinsert = opts1.beforedrop.call(this, ev, ui, getdata, $("#" + jqID($t.p.id)), $(this));
									if (datatoinsert !== undefined && datatoinsert !== null && typeof datatoinsert === "object") { getdata = datatoinsert; }
								}
								if (ui.helper.dropped) {
									var grid;
									if (opts1.autoid) {
										if ($.isFunction(opts1.autoid)) {
											grid = opts1.autoid.call(this, getdata);
										} else {
											grid = Math.ceil(Math.random() * 1000);
											grid = opts1.autoidprefix + grid;
										}
									}
									// NULL is interpreted as undefined while null as object
									$("#" + jqID(this.id)).jqGrid("addRowData", grid, getdata, opts1.droppos);
									getdata[$t.p.localReader.id] = grid;
								}
								if (opts1.ondrop && $.isFunction(opts1.ondrop)) { opts1.ondrop.call(this, ev, ui, getdata); }
							}
						}, opts1.drop_opts || {});
					},
					onstart: null,
					onstop: null,
					beforedrop: null,
					ondrop: null,
					drop_opts: {
						//activeClass: "ui-state-active",
						//hoverClass: "ui-state-hover"
					},
					drag_opts: {
						revert: "invalid",
						helper: "clone",
						cursor: "move",
						appendTo: "#jqgrid_dnd",
						zIndex: 5000
					},
					dragcopy: false,
					dropbyname: false,
					droppos: "first",
					autoid: true,
					autoidprefix: "dnd_"
				}, opts || {});

				if (!opts.connectWith) { return; }
				opts.connectWith = opts.connectWith.split(",");
				opts.connectWith = $.map(opts.connectWith, function (n) { return $.trim(n); });
				$.data($t, "dnd", opts);

				if ($t.p.reccount !== 0 && !$t.p.jqgdnd) {
					updateDnD();
				}
				$t.p.jqgdnd = true;
				for (j = 0; j < opts.connectWith.length; j++) {
					cn = opts.connectWith[j];
					$(cn).droppable($.isFunction(opts.drop) ? opts.drop.call($($t), opts) : opts.drop);
				}
			});
		},
		gridResize: function (opts) {
			return this.each(function () {
				var $t = this, grid = $t.grid, p = $t.p, bdivSelector = p.gView + ">.ui-jqgrid-bdiv", onlyHorizontal = false, sel, gridHeight = p.height;
				if (!grid || !$.fn.resizable) { return; }
				opts = $.extend({}, opts || {});
				if (opts.alsoResize) {
					opts._alsoResize_ = opts.alsoResize;
					delete opts.alsoResize;
				} else {
					opts._alsoResize_ = false;
				}
				if (opts.stop && $.isFunction(opts.stop)) {
					opts._stop_ = opts.stop;
					delete opts.stop;
				} else {
					opts._stop_ = false;
				}
				opts.stop = function (ev, ui) {
					$($t).jqGrid("setGridWidth", ui.size.width, opts.shrinkToFit);
					$(p.gView + ">.ui-jqgrid-titlebar").css("width", "");
					if (!onlyHorizontal) {
						$($t).jqGrid("setGridParam", { height: $(bdivSelector).height() });
					} else {
						$(sel).each(function () {
							$(this).css("height", "");
						});
						if (gridHeight === "auto" || gridHeight === "100%") {
							$(grid.bDiv).css("height", gridHeight);
						}
					}
					if ($t.fixScrollOffsetAndhBoxPadding) {
						$t.fixScrollOffsetAndhBoxPadding();
					}
					if (opts._stop_) { opts._stop_.call($t, ev, ui); }
				};
				sel = bdivSelector;
				if ((gridHeight === "auto" || gridHeight === "100%") && opts.handles === undefined) {
					opts.handles = "e,w";
				}
				if (opts.handles) {
					// test for "e, w"
					var ar = $.map(String(opts.handles).split(","), function (item) {
						return $.trim(item);
					});
					if (ar.length === 2 && ((ar[0] === "e" && ar[1] === "w") || (ar[1] === "e" && ar[1] === "w"))) {
						sel = p.gView + ">div:not(.frozen-div)";
						onlyHorizontal = true;
						if (p.pager) {
							sel += "," + p.pager;
						}
					}
				}
				if (opts._alsoResize_) {
					opts.alsoResize = sel + "," + opts._alsoResize_;
				} else {
					opts.alsoResize = sel;
				}
				delete opts._alsoResize_;
				$(p.gBox).resizable(opts);
			});
		}
	});
	// end module grid.jqueryui
}));
