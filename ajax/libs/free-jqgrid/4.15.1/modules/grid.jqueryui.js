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
/*global jQuery, define, exports, module, require */
/*jslint browser: true, devel: true, eqeq: true, nomen: true, plusplus: true, unparam: true, vars: true, white: true */
(function (global, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.base",
			//"../plugins/ui.multiselect",
			"free-jqgrid-plugins/ui.multiselect",
			"jquery-ui/dialog",
			"jquery-ui/draggable",
			"jquery-ui/droppable",
			"jquery-ui/resizable",
			"jquery-ui/sortable"
		], function ($) {
			return factory($, global, global.document);
		});
	} else if (typeof module === "object" && module.exports) {
		// Node/CommonJS
		module.exports = function (root, $) {
			if (!root) {
				root = window;
			}
			if ($ === undefined) {
				// require("jquery") returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				$ = typeof window !== "undefined" ?
						require("jquery") :
						require("jquery")(root);
			}
			require("./grid.base");
			//require("../plugins/ui.multiselect");
			require("free-jqgrid-plugins/ui.multiselect");
			require("jquery-ui/dialog");
			require("jquery-ui/draggable");
			require("jquery-ui/droppable");
			require("jquery-ui/resizable");
			require("jquery-ui/sortable");
			factory($, root, root.document);
			return $;
		};
	} else {
		// Browser globals
		factory(jQuery, global, global.document);
	}
}(typeof window !== "undefined" ? window : this, function ($, window, document) {
	"use strict";
	var jgrid = $.jgrid, jqID = jgrid.jqID;
	// begin module grid.jqueryui
	var $UiMultiselect = $.ui != null ? $.ui.multiselect : null,
		reorderSelectedColumns = function (iColItem) {
			/* Background information:
			 *
			 * Multiselect contains the list of selected items this.selectedList,
			 * which is jQuery wrapper of <ul> element. The items of this.selectedList
			 * are <li> elements, which represent visible (hidden:false) and movable
			 * (hidedlg:false) columns of the grid.
			 *
			 * Additionally there are exist hidden <select multiple="multiple">.
			 * Every <option> of the <select> corresponds the column of the grid.
			 * The visible columns (hidden:false) are selected. The value of the <option>
			 * contains the column index (iCol) in colModel. <li> elements of
			 * this.selectedLis have data with the "optionLink" pointed to the corresponding
			 * option of the hidden select.
			 *
			 * this.grid is the DOM of the grid and this.newColOrder is the array with
			 * ALL column names in the order, which should be applied after reordering
			 * the grid. Additionally this.gh contains the COPY of p.groupHeader.groupHeaders.
			 * It's important that startColumnName property of elements of
			 * p.groupHeader.groupHeaders could be changed during reordering of the columns.
			 * On the other side the user can't click Cancel button of columnChooser for
			 * breaking reordering. Because of that this.gh contains the COPY of
			 * p.groupHeader.groupHeaders and the original p.groupHeader.groupHeaders will be
			 * not changed in the reorderSelectedColumns function.
			 *
			 * An important implementation problem: reorderSelectedColumns function will be
			 * called after ONE reordering of the columns. On the other side, the user can
			 * reorder the columns MULTIPLE TIMES before saving the new order. Thus, one
			 * have to take in consideration not only the original order of columns in
			 * colModel, but THE CURRENT order of the columns saved only internally in
			 * the dialog in this.newColOrder.
			 */
			if (this.grid != null && this.grid.p != null) {
				var that = this, p = this.grid.p, iCol, j, iGrp, ghItem,
					gh = this.gh, selectedList = this.selectedList, inGroup = this.inGroup,
					items = selectedList.find("li"), optionLink,
					indexOfAddedItem = items.length - 1,
					enumSelected = function (callback, startIndex, reverse) {
						var i, opt, items = selectedList.find("li");
						if (startIndex === undefined) {
							startIndex = reverse ? items.length - 1 : 0;
						}
						for (i = startIndex; !reverse ? i < items.length : i >= 0; !reverse ? i++ : i--) {
							opt = $(items[i]).data("optionLink");
							if (opt && callback.call(items[i], parseInt(opt.val(), 10), i)) {
								return i;
							}
						}
					},
					updateNewColOrder = function () {
						// !!! the function set additionally indexOfAddedItem and update items

						// remove iColItem from this.newColOrder
						j = $.inArray(p.colModel[iColItem].name, that.newColOrder);
						if (j >= 0) {
							that.newColOrder.splice(j, 1);
						}

						// refill items
						items = selectedList.find("li");

						// iCol will be the index in newColOrder. The order of columns in items
						// should be mostly THE SAME like in selectedList, but newColOrder
						// contains additional elements (hidden and hidedlg). The array items
						// on the other side contains just inserted iColItem element.

						// we need find indexOfAddedItem - the index of <li> with iColItem
						// in the list of this.selectedList.find("li") elements
						iCol = 0;
						enumSelected(
							function (iColOld, index) {
								if (iColOld === iColItem) {
									indexOfAddedItem = index;
									// if iColItem is in the same header group as p.colModel[iCol] or
									// both belongs no header group then the column could be NOT in
									// selectedList. I find better to insert the item AFTER the hidden
									// or non-movable columns (like "rn", "subgrid" column or other)
									while (iCol >= 0 && iCol < p.colModel.length && iCol !== iColItem &&
											(p.colModel[iCol].hidden || p.colModel[iCol].hidedlg) &&
											(inGroup == null ||
											//inGroup[iCol] !== undefined && inGroup[iColItem] !== undefined &&
											inGroup[iCol] === inGroup[iColItem])) {
										iCol++;
									}
									that.newColOrder.splice(iCol, 0, p.colModel[iColItem].name);
									return true; // stop enumeration
								}
								// selectedList contains SUBSET of columns from colModel, but newColOrder
								// contains ALL columns. It's important that all columns from selectedList
								// exist in newColOrder IN THE SAME order. Thus iCol will be the current
								// index in newColOrder array with p.colModel[iColOld].name column name.
								iCol = $.inArray(p.colModel[iColOld].name, that.newColOrder, iCol);
								if (iCol < 0) {
									// to be sure that the code works in case of some errors too
									iCol = $.inArray(p.colModel[iColOld].name, that.newColOrder);
								}
								iCol++;
							}
						);
					},
					enumPreviousAndInsertAfter = function (iCol) {
						if (inGroup[iCol] === inGroup[iColItem]) {
							$(this).after(items[indexOfAddedItem]);
							updateNewColOrder();
							return true; // stop enumeration
						}
					},
					enumNextAndInsertBefore = function (iCol) {
						if (inGroup[iCol] === inGroup[iColItem]) {
							$(this).before(items[indexOfAddedItem]);
							updateNewColOrder();
							return true; // stop enumeration
						}
					},
					updateStartColumn = function (iCol) {
						if (inGroup[iCol] === inGroup[iColItem] && inGroup[iCol] !== undefined) {
							gh[inGroup[iCol]].startColumnName = p.colModel[iCol].name;
							return true; // stop enumeration
						}
					};

				// Fix potition of added/moved item iColItem in that.newColOrder array.
				// We syncronize only the initial state of newColOrder. The position of
				// iColItem item can be changed later in both selectedList and newColOrder
				updateNewColOrder();

				if (gh && gh[inGroup[iColItem]] !== undefined) {
					// the item belong to some group
					ghItem = gh[inGroup[iColItem]];
					for (j = 0; j < ghItem.numberOfColumns; j++) {
						iCol = p.iColByName[ghItem.startColumnName] + j;
						if (!p.colModel[iCol].hidden && !p.colModel[iCol].hidedlg) {
							// the columns are displayed in the selectedList

							// We need to enumerate items in reverse order and to find the index of the item
							// in the array items comparing the items by $(items[j]).data("optionLink").val()
							// If the item is found then append prevously found item AFTER this one.
							// We can use j variable bacause the outer loop will be exit (see break below)
							enumSelected(
								enumPreviousAndInsertAfter,
								indexOfAddedItem - 1,
								true // enum in reverse order
							);
							// If step 2 didn't find the group then we need examin NEXT items and find
							// the items from the same group. We should test the items in sequential order
							// after the item found. If the item is found then apend prevously found
							// item BEFORE this one.
							enumSelected(
								enumNextAndInsertBefore,
								indexOfAddedItem + 1
							);
							// fix the name of the first column in the group
							enumSelected(updateStartColumn);
							break; // !!!
						}
					}
				} else if (gh) {
					// The item from no group is added/moved.
					// We have to verify that the item is not dropped inside of some header group
					// find the index of added/moved element in this.selectedList.find("li")
					items = selectedList.find("li");
					j = enumSelected(function (iCol) {
						if (iCol === iColItem) {
							return true;
						}
					});
					if (j + 1 >= items.length || j < 0) {
						return;
					}
					optionLink = $(items[j + 1]).data("optionLink");
					if (optionLink) {
						iGrp = inGroup[parseInt(optionLink.val(), 10)];
						if (iGrp !== undefined) {
							optionLink = $(items[j - 1]).data("optionLink");
							if (optionLink && inGroup[parseInt(optionLink.val(), 10)] === iGrp) {
								// The next and the previous items are in the same group, but
								// the added/moved item in NOT in the group.
								// We have to move the item items[j] AFTER the last item of the group.
								var iColNotInTheGroup = enumSelected(
									function (iCol) {
										if (inGroup[iCol] !== iGrp) {
											return true; // stop enumeration
										}
									},
									j + 1 // start enumeration with the index
								);
								$(items[iColNotInTheGroup === undefined || iColNotInTheGroup >= items.length ? items.length - 1 : iColNotInTheGroup - 1])
									.after(items[indexOfAddedItem]);
								updateNewColOrder();
							}
						}
					}
				}
			}
		};
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
				// the method will be called if the user clicks "+" button on the item of "available" list
				// or if the user clicks "-" button on the item of "selected" list.
				// The parameter "selected" is equal true on click on the item of "selected" list
				// and false on click on the item of "available" list.
				var ret = setSelected.call(this, item, selected), elt = this.element,
					iColItem = parseInt(item.data("optionLink").val(), 10);
				if (selected && this.selectedList) {
					// reorder items of selectedList
					// all items of selectedList from one group have to be together
					// all items of availableList from one group have to be together
					reorderSelectedColumns.call(this, iColItem);

					// apply the new sort order to the original selectbox
					this.selectedList.find("li").each(function () {
						if ($(this).data("optionLink")) {
							$(this).data("optionLink").remove().appendTo(elt);
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
				if (!p || !p.sortable || !$.isFunction($.fn.sortable)) { return; }
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
					start: function () {
						ts.grid.hDiv.scrollLeft = ts.grid.bDiv.scrollLeft;
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
			var $self = this, self = $self[0], p = self.p, selector, select, dopts, mopts,
				$dialogContent, multiselectData, listHeight,
				colModel = p.colModel, nCol = colModel.length, colNames = p.colNames,
				getMultiselectWidgetData = function ($elem) {
					return ($UiMultiselect && $UiMultiselect.prototype && $elem.data($UiMultiselect.prototype.widgetFullName || $UiMultiselect.prototype.widgetName)) ||
						$elem.data("ui-multiselect") || $elem.data("multiselect");
				};

			if ($("#colchooser_" + jqID(p.id)).length) { return; }
			selector = $('<div id="colchooser_' + p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>');
			select = $("select", selector);

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
					if (perm) {
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
					var perm = new Array(p.colModel.length), i, gHead,
						showHideColOptions = {
							notSkipFrozen: opts.notSkipFrozen === undefined ? false : opts.notSkipFrozen,
							skipSetGridWidth: true,
							skipSetGroupHeaders: true
						};

					// we can use remapColumnsByName instead of remapColumns in general,
					// but we try to hold the compatibility with old version. Thus we
					// fill perm based on multiselectData.newColOrder
					for (i = 0; i < p.colModel.length; i++) {
						perm[i] = p.iColByName[multiselectData.newColOrder[i]];
					}

					$("option", select).each(function () {
						if ($(this).is(":selected")) {
							$self.jqGrid("showCol", colModel[this.value].name, showHideColOptions);
						} else {
							$self.jqGrid("hideCol", colModel[this.value].name, showHideColOptions);
						}
					});

					if (opts.done) {
						opts.done.call($self, perm);
					}
					if (p.groupHeader && (typeof p.groupHeader === "object" || $.isFunction(p.groupHeader))) {
						$self.jqGrid("destroyGroupHeader", false);
						p.groupHeader.groupHeaders = multiselectData.gh; // use modified groupHeader
						if (p.pivotOptions != null && p.pivotOptions.colHeaders != null && p.pivotOptions.colHeaders.length > 1) {
							gHead = p.pivotOptions.colHeaders;
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
					var newWidth = !p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%") ? p.tblwidth : p.width;
					if (newWidth !== p.width) {
						$self.jqGrid("setGridWidth", newWidth, p.shrinkToFit);
					}
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
						(jgrid.defaults != null && $.isFunction(jgrid.defaults.fatalError) ? jgrid.defaults.fatalError : alert)("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
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
			var gh = p.groupHeader != null ? p.groupHeader.groupHeaders : 0,
				colHeader = {}, k, j, iCol, ghItem;
			// fill colHeader for columns which have column header
			if (gh) {
				for (k = 0; k < gh.length; k++) {
					ghItem = gh[k];
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
				if (!this.hidedlg) {
					select.append("<option value='" + i + "'" +
						(p.headertitles || this.headerTitle ? (" title='" + jgrid.stripHtml(typeof this.headerTitle === "string" ? this.headerTitle : colHeader[i]) + "'") : "") +
						(this.hidden ? "" : " selected='selected'") + ">" + colHeader[i] + "</option>");
				}
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
				// grid property will be used to access the grid inside of _setSelected
				multiselectData.grid = self;
				if (gh) {
					// make deep copy of groupHeaders to be able to hold changes of startColumnName,
					// but to apply the changes only after the user click OK button (not Cancel)
					multiselectData.gh = $.extend(true, [], gh);

					// filling the helper array inGroup. It contains
					// an item for every column. The value is undefined if the column
					// not belongs to a header group and it is 0-based index of the
					// header group (the index in gh array) if the column belongs to
					// a header group. The array inGroup helps us to detect whether
					// two columns belong to the same group or not.
					multiselectData.inGroup = new Array(p.colModel.length); // allocate array with undefined values

					var iGrp, headerItem;
					for (iGrp = 0; iGrp < gh.length; iGrp++) {
						headerItem = gh[iGrp];
						for (iCol = 0; iCol < headerItem.numberOfColumns; iCol++) {
							multiselectData.inGroup[p.iColByName[headerItem.startColumnName] + iCol] = iGrp;
						}
					}
				}
				multiselectData.newColOrder = $.map(colModel, function (cm) { return cm.name; });
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
				if (multiselectData.options != null && multiselectData.options.sortable) {
					multiselectData.selectedList.on("sortupdate", function (e, ui) {
						// remove fixed inline style values of width and height
						// added during gragging
						reorderSelectedColumns.call(
							multiselectData,
							parseInt(ui.item.data("optionLink").val(), 10)
						);
						ui.item.css({ width: "", height: "" });
						if ($.isFunction(opts.sortUpdate)) {
							opts.sortUpdate.call(self, e, ui);
						}
					});
				}
				if ($.isFunction(opts.init)) {
					opts.init.call(self, multiselectData);
				}
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
						items: ">tbody>.jqgrow"
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
					$($t).sortable(opts);
					/*if ($.isFunction($.fn.disableSelection)) {
						// The method disableSelection exists starting with jQuery UI 1.6,
						// but it's declared as deprecated since jQuery UI 1.9
						// see http://jqueryui.com/upgrade-guide/1.9/#deprecated-disableselection-and-enableselection
						// so we use disableSelection only if it exists
						var jQueryUiVersion = $.ui != null && typeof $.ui.version === "string" ?
								$.ui.version.match(/(\d+)\.(\d+).(\d+)/) : [];
						// jQuery UI version is: jQueryUiVersion[1].jQueryUiVersion[2].jQueryUiVersion[3]
						if (jQueryUiVersion.length === 4 && jQueryUiVersion[1] === "1" &&
							jQueryUiVersion[2] > 5 && jQueryUiVersion[2] < 9) {
							// disable selection only for old jQuery UI
							$($t.tBodies[0]).children("tr.jqgrow").disableSelection();
						}
					}*/
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
