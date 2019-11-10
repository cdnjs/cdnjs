/**
 * jqGrid extension for cellediting Grid Data
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com, http://trirand.com/blog/
 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/

/**
 * all events and options here are added anonymous and not in the base grid
 * since the array is to big. Here is the order of execution.
 * From this point we use jQuery isFunction
 * formatCell
 * beforeEditCell,
 * onSelectCell (used only for non-editable cells)
 * afterEditCell,
 * beforeSaveCell, (called before validation of values if any)
 * beforeSubmitCell (if cellsubmit remote (Ajax))
 * afterSubmitCell(if cellsubmit remote (Ajax)),
 * afterSaveCell,
 * errorCell,
 * serializeCellData - new
 * Options
 * cellsubmit ("remote","clientArray") (added in grid options)
 * cellurl
 * ajaxCellOptions
**/

/*jshint eqeqeq:false */
/*global jQuery, define */
/*jslint browser: true, eqeq: true, plusplus: true, vars: true, white: true, todo: true */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "./grid.base", "./jquery.fmatter", "./grid.common"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	var jgrid = $.jgrid,
		feedback = function () {
			// short form of $.jgrid.feedback to save usage this.p as the first parameter
			var args = $.makeArray(arguments);
			args.unshift("");
			args.unshift("");
			args.unshift(this.p);
			return jgrid.feedback.apply(this, args);
		};
	// begin module grid.celledit
	var getTdByColumnIndex = function (tr, iCol) {
			var $t = this, frozenRows = $t.grid.fbRows;
			return $((frozenRows != null && frozenRows[0].cells.length > iCol ? frozenRows[tr.rowIndex] : tr).cells[iCol]);
		};
	jgrid.extend({
		editCell: function (iRow, iCol, ed) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, nm, tmp, cc, cm, rows = $t.rows;
				if (!$t.grid || p.cellEdit !== true || rows == null || rows[iRow] == null) {
					return;
				}
				iRow = parseInt(iRow, 10); // we change iRow and rows[iRow] can be change too
				iCol = parseInt(iCol, 10);
				if (isNaN(iRow) || isNaN(iCol)) {
					return;
				}
				var tr = rows[iRow], rowid = tr != null ? tr.id : null, $tr = $(tr), edittype,
					iColOld = parseInt(p.iCol, 10), iRowOld = parseInt(p.iRow, 10),
					$trOld = $(rows[iRowOld]), savedRow = p.savedRow;
				// select the row that can be used for other methods
				if (rowid == null) {
					return;
				}
				p.selrow = rowid;
				if (!p.knv) {
					$self.jqGrid("GridNav");
				}
				// check to see if we have already edited cell
				if (savedRow.length > 0) {
					// prevent second click on that field and enable selects
					if (ed === true) {
						if (iRow === iRowOld && iCol === iColOld) {
							return;
						}
					}
					// save the cell
					$self.jqGrid("saveCell", savedRow[0].id, savedRow[0].ic);
				} else {
					setTimeout(function () {
						$("#" + jgrid.jqID(p.knv)).attr("tabindex", "-1").focus();
					}, 1);
				}
				cm = p.colModel[iCol];
				nm = cm.name;
				if (nm === "subgrid" || nm === "cb" || nm === "rn") {
					return;
				}
				cc = getTdByColumnIndex.call($t, tr, iCol);
				var editable = cm.editable, mode = "cell";
				if ($.isFunction(editable)) {
					editable = editable.call($t, {
						rowid: rowid,
						iCol: iCol,
						iRow: iRow,
						name: nm,
						cm: cm,
						mode: mode
					});
				}
				var highlightClasses = $self.jqGrid("getGuiStyles", "select", "edit-cell"),
					hoverClasses = $self.jqGrid("getGuiStyles", "hover", "selected-row");
				if (editable === true && ed === true && !cc.hasClass("not-editable-cell")) {
					if (iColOld >= 0 && iRowOld >= 0) {
						getTdByColumnIndex.call($t, $trOld[0], iColOld).removeClass(highlightClasses);
						$trOld.removeClass(hoverClasses);
					}
					cc.addClass(highlightClasses);
					$tr.addClass(hoverClasses);
					if (!cm.edittype) {
						cm.edittype = "text";
					}
					edittype = cm.edittype;
					try {
						tmp = $.unformat.call($t, cc, { rowId: rowid, colModel: cm }, iCol);
					} catch (ex) {
						tmp = edittype === "textarea" ? cc.text() : cc.html();
					}
					if (p.autoEncodeOnEdit) {
						tmp = jgrid.oldDecodePostedData(tmp);
					}
					savedRow.push({ id: iRow, ic: iCol, name: nm, v: tmp });
					if (tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length === 1 && tmp.charCodeAt(0) === 160)) {
						tmp = "";
					}
					if ($.isFunction(p.formatCell)) {
						var tmp2 = p.formatCell.call($t, rowid, nm, tmp, iRow, iCol);
						if (tmp2 !== undefined) {
							tmp = tmp2;
						}
					}
					feedback.call($t, "beforeEditCell", rowid, nm, tmp, iRow, iCol);
					var opt = $.extend({}, cm.editoptions || {},
						{ id: iRow + "_" + nm, name: nm, rowId: rowid, mode: mode, cm: cm, iCol: iCol });
					var elc = jgrid.createEl.call($t, edittype, opt, tmp, true, $.extend({}, jgrid.ajaxOptions, p.ajaxSelectOptions || {})),
						$dataFiled = cc,
						editingColumnWithTreeGridIcon = p.treeGrid === true && nm === p.ExpandColumn;
					if (editingColumnWithTreeGridIcon) {
						$dataFiled = cc.children("span.cell-wrapperleaf,span.cell-wrapper");
					}
					$dataFiled.html("").append(elc).attr("tabindex", "0");
					if (editingColumnWithTreeGridIcon) { // && elc.style.width === "100%"
						$(elc).width(cc.width() - cc.children("div.tree-wrap").outerWidth());
					}
					jgrid.bindEv.call($t, elc, opt);
					setTimeout(function () {
						$(elc).focus();
					}, 1);
					$("input, select, textarea", cc).bind("keydown", function (e) {
						if (e.keyCode === 27) {
							if ($("input.hasDatepicker", cc).length > 0) {
								if ($(".ui-datepicker").is(":hidden")) {
									$self.jqGrid("restoreCell", iRow, iCol);
								} else {
									$("input.hasDatepicker", cc).datepicker("hide");
								}
							} else {
								$self.jqGrid("restoreCell", iRow, iCol);
							}
						} //ESC
						if (e.keyCode === 13 && !e.shiftKey) {
							$self.jqGrid("saveCell", iRow, iCol);
							// Prevent default action
							return false;
						} //Enter
						if (e.keyCode === 9) {
							if (!$t.grid.hDiv.loading) {
								if (e.shiftKey) {
									$self.jqGrid("prevCell", iRow, iCol); //Shift TAb
								} else {
									$self.jqGrid("nextCell", iRow, iCol); //Tab
								}
							} else {
								return false;
							}
						}
						e.stopPropagation();
					});
					feedback.call($t, "afterEditCell", rowid, nm, tmp, iRow, iCol);
					$self.triggerHandler("jqGridAfterEditCell", [rowid, nm, tmp, iRow, iCol]);
				} else {
					if (iColOld >= 0 && iRowOld >= 0) {
						getTdByColumnIndex.call($t, $trOld[0], iColOld).removeClass(highlightClasses);
						$trOld.removeClass(hoverClasses);
					}
					cc.addClass(highlightClasses);
					$tr.addClass(hoverClasses);
					tmp = cc.html().replace(/&#160;/ig, "");
					feedback.call($t, "onSelectCell", rowid, nm, tmp, iRow, iCol);
				}
				p.iCol = iCol;
				p.iRow = iRow;
			});
		},
		saveCell: function (iRow, iCol) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, infoDialog = jgrid.info_dialog, jqID = jgrid.jqID;

				if (!$t.grid || p.cellEdit !== true) {
					return;
				}
				var errors = $self.jqGrid("getGridRes", "errors"), errcap = errors.errcap,
					edit = $self.jqGrid("getGridRes", "edit"), bClose = edit.bClose,
					savedRow = p.savedRow, fr = savedRow.length >= 1 ? 0 : null;
				if (fr !== null) {
					var tr = $t.rows[iRow], rowid = tr.id, $tr = $(tr), cm = p.colModel[iCol], nm = cm.name, vv,
						cc = getTdByColumnIndex.call($t, tr, iCol), valueText = {},
						v = jgrid.getEditedValue.call($t, cc, cm, valueText);

					// The common approach is if nothing changed do not do anything
					if (v !== savedRow[fr].v) {
						vv = $self.triggerHandler("jqGridBeforeSaveCell", [rowid, nm, v, iRow, iCol]);
						if (vv !== undefined) {
							v = vv;
						}
						if ($.isFunction(p.beforeSaveCell)) {
							vv = p.beforeSaveCell.call($t, rowid, nm, v, iRow, iCol);
							if (vv !== undefined) {
								v = vv;
							}
						}
						var cv = jgrid.checkValues.call($t, v, iCol, undefined, undefined, {
								oldValue: savedRow[fr].v,
								newValue: v,
								cmName: nm,
								rowid: rowid,
								iCol: iCol,
								iRow: iRow,
								cm: cm,
								tr: tr,
								td: cc,
								mode: "cell"
							}),
							formatoptions = cm.formatoptions || {};
						if (cv == null || cv === true || cv[0] === true) {
							var addpost = $self.triggerHandler("jqGridBeforeSubmitCell", [rowid, nm, v, iRow, iCol]) || {};
							if ($.isFunction(p.beforeSubmitCell)) {
								addpost = p.beforeSubmitCell.call($t, rowid, nm, v, iRow, iCol);
								if (!addpost) {
									addpost = {};
								}
							}
							if ($("input.hasDatepicker", cc).length > 0) {
								$("input.hasDatepicker", cc).datepicker("hide");
							}
							if (cm.formatter === "date" && formatoptions.sendFormatted !== true) {
								// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
								// Floating point separator for example
								v = $.unformat.date.call($t, v, cm);
							}
							if (p.cellsubmit === "remote") {
								if (p.cellurl) {
									var postdata = {};
									postdata[nm] = v;
									var opers = p.prmNames, idname = opers.id, oper = opers.oper, hDiv = $t.grid.hDiv;
									postdata[idname] = jgrid.stripPref(p.idPrefix, rowid);
									postdata[oper] = opers.editoper;
									postdata = $.extend(addpost, postdata);
									if (p.autoEncodeOnEdit) {
										$.each(postdata, function (n, val) {
											if (!$.isFunction(val)) {
												postdata[n] = jgrid.oldEncodePostedData(val);
											}
										});
									}
									$self.jqGrid("progressBar", { method: "show", loadtype: p.loadui, htmlcontent: jgrid.defaults.savetext || "Saving..." });
									hDiv.loading = true;
									$.ajax($.extend({
										url: $.isFunction(p.cellurl) ? p.cellurl.call($t, p.cellurl, iRow, iCol, rowid, v, nm) : p.cellurl,
										//data :$.isFunction(p.serializeCellData) ? p.serializeCellData.call($t, postdata) : postdata,
										data: jgrid.serializeFeedback.call($t, p.serializeCellData, "jqGridSerializeCellData", postdata),
										type: "POST",
										complete: function (jqXHR) {
											$self.jqGrid("progressBar", { method: "hide", loadtype: p.loadui });
											hDiv.loading = false;
											if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
												var ret = $self.triggerHandler("jqGridAfterSubmitCell", [$t, jqXHR, postdata.id, nm, v, iRow, iCol]) || [true, ""];
												if (ret == null || ret === true || (ret[0] === true && $.isFunction(p.afterSubmitCell))) {
													ret = p.afterSubmitCell.call($t, jqXHR, postdata.id, nm, v, iRow, iCol);
												}
												if (ret == null || ret === true || ret[0] === true) {
													$self.jqGrid("setCell", rowid, iCol, v, false, false, true);
													cc.addClass("dirty-cell");
													$tr.addClass("edited");
													feedback.call($t, "afterSaveCell", rowid, nm, v, iRow, iCol);
													savedRow.splice(0, 1);
												} else {
													infoDialog.call($t, errcap, ret[1], bClose);
													$self.jqGrid("restoreCell", iRow, iCol);
												}
											}
										},
										error: function (jqXHR, textStatus, errorThrown) {
											$("#lui_" + jqID(p.id)).hide();
											hDiv.loading = false;
											$self.triggerHandler("jqGridErrorCell", [jqXHR, textStatus, errorThrown]);
											if ($.isFunction(p.errorCell)) {
												p.errorCell.call($t, jqXHR, textStatus, errorThrown);
												$self.jqGrid("restoreCell", iRow, iCol);
											} else {
												infoDialog.call($t, errcap, jqXHR.status + " : " + jqXHR.statusText + "<br/>" + textStatus, bClose);
												$self.jqGrid("restoreCell", iRow, iCol);
											}
										}
									}, jgrid.ajaxOptions, p.ajaxCellOptions || {}));
								} else {
									try {
										infoDialog.call($t, errcap, errors.nourl, bClose);
										$self.jqGrid("restoreCell", iRow, iCol);
									} catch (ignore) { }
								}
							}
							if (p.cellsubmit === "clientArray") {
								$self.jqGrid("setCell", rowid, iCol,
									cm.edittype === "select" && cm.formatter !== "select" ? valueText.text : v,
									false, false, true);
								cc.addClass("dirty-cell");
								$tr.addClass("edited");
								feedback.call($t, "afterSaveCell", rowid, nm, v, iRow, iCol);
								savedRow.splice(0, 1);
							}
						} else {
							try {
								setTimeout(function () {
									infoDialog.call($t, errcap, v + " " + cv[1], bClose);
								}, 100);
								$self.jqGrid("restoreCell", iRow, iCol);
							} catch (ignore) { }
						}
					} else {
						$self.jqGrid("restoreCell", iRow, iCol);
					}
				}
				setTimeout(function () {
					$("#" + jqID(p.knv)).attr("tabindex", "-1").focus();
				}, 0);
			});
		},
		restoreCell: function (iRow, iCol) {
			return this.each(function () {
				var $t = this, p = $t.p, tr = $t.rows[iRow], rowid = tr.id, v, cm, formatoptions;
				if (!$t.grid || p.cellEdit !== true) {
					return;
				}
				var savedRow = p.savedRow, cc = getTdByColumnIndex.call($t, tr, iCol);
				if (savedRow.length >= 1) {
					// datepicker fix
					if ($.isFunction($.fn.datepicker)) {
						try {
							$("input.hasDatepicker", cc).datepicker("hide");
						} catch (ignore) { }
					}
					cm = p.colModel[iCol];
					if (p.treeGrid === true && cm.name === p.ExpandColumn) {
						cc.children("span.cell-wrapperleaf,span.cell-wrapper").empty();
					} else {
						cc.empty();
					}
					cc.attr("tabindex", "-1");
					v = savedRow[0].v;
					formatoptions = cm.formatoptions || {};
					if (cm.formatter === "date" && formatoptions.sendFormatted !== true) {
						// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
						// Floating point separator for example
						v = $.unformat.date.call($t, v, cm);
					}
					$($t).jqGrid("setCell", rowid, iCol, v, false, false, true);
					feedback.call($t, "afterRestoreCell", rowid, v, iRow, iCol);
					savedRow.splice(0, 1);
				}
				setTimeout(function () {
					$("#" + p.knv).attr("tabindex", "-1").focus();
				}, 0);
			});
		},
		nextCell: function (iRow, iCol) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, nCol = false, i, editable, cm, rows = $t.rows;
				if (!$t.grid || p.cellEdit !== true || rows == null || rows[iRow] == null) {
					return;
				}
				// try to find next editable cell
				for (i = iCol + 1; i < p.colModel.length; i++) {
					cm = p.colModel[i];
					editable = cm.editable;
					if ($.isFunction(editable)) {
						editable = editable.call($t, {
							rowid: rows[iRow].id,
							iCol: i,
							iRow: iRow,
							name: cm.name,
							cm: cm,
							mode: "cell"
						});
					}
					if (editable === true) {
						nCol = i;
						break;
					}
				}
				if (nCol !== false) {
					$self.jqGrid("editCell", iRow, nCol, true);
				} else {
					if (p.savedRow.length > 0) {
						$self.jqGrid("saveCell", iRow, iCol);
					}
				}
			});
		},
		prevCell: function (iRow, iCol) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, nCol = false, i, editable, cm, rows = $t.rows;
				if (!$t.grid || p.cellEdit !== true || rows == null || rows[iRow] == null) {
					return;
				}
				// try to find next editable cell
				for (i = iCol - 1; i >= 0; i--) {
					cm = p.colModel[i];
					editable = cm.editable;
					if ($.isFunction(editable)) {
						editable = editable.call($t, {
							rowid: rows[iRow].id,
							iCol: i,
							iRow: iRow,
							name: cm.name,
							cm: cm,
							mode: "cell"
						});
					}
					if (editable === true) {
						nCol = i;
						break;
					}
				}
				if (nCol !== false) {
					$self.jqGrid("editCell", iRow, nCol, true);
				} else {
					if (p.savedRow.length > 0) {
						$self.jqGrid("saveCell", iRow, iCol);
					}
				}
			});
		},
		GridNav: function () {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, grid = $t.grid, i, kdir;
				if (!grid || p.cellEdit !== true) {
					return;
				}
				var bDiv = grid.bDiv;
				// trick to process keydown on non input elements
				p.knv = p.id + "_kn";
				var selection = $("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + p.knv + "'></div></div>");
				function scrollGrid(iR, iC, tp) {
					var tr = $t.rows[iR];
					if (tp.substr(0, 1) === "v") {
						var ch = bDiv.clientHeight,
							st = bDiv.scrollTop,
							nRot = tr.offsetTop + tr.clientHeight,
							pRot = tr.offsetTop;

						if (tp === "vd") {
							if (nRot >= ch) {
								bDiv.scrollTop = bDiv.scrollTop + tr.clientHeight;
							}
						}
						if (tp === "vu") {
							if (pRot < st) {
								bDiv.scrollTop = bDiv.scrollTop - tr.clientHeight;
							}
						}
					}
					if (tp === "h") {
						var cw = bDiv.clientWidth,
							sl = bDiv.scrollLeft,
							td = tr.cells[iC],
							nCol = td.offsetLeft + td.clientWidth,
							pCol = td.offsetLeft;

						if (nCol >= cw + parseInt(sl, 10)) {
							bDiv.scrollLeft = bDiv.scrollLeft + td.clientWidth;
						} else if (pCol < sl) {
							bDiv.scrollLeft = bDiv.scrollLeft - td.clientWidth;
						}
					}
				}
				function findNextVisible(iC, act) {
					var ind = 0, j, colModel = p.colModel;
					if (act === "lft") {
						ind = iC + 1;
						for (j = iC; j >= 0; j--) {
							if (colModel[j].hidden !== true) {
								ind = j;
								break;
							}
						}
					}
					if (act === "rgt") {
						ind = iC - 1;
						for (j = iC; j < colModel.length; j++) {
							if (colModel[j].hidden !== true) {
								ind = j;
								break;
							}
						}
					}
					return ind;
				}

				$(selection).insertBefore(grid.cDiv);
				$("#" + p.knv)
					.focus()
					.keydown(function (e) {
						var iRowOld = parseInt(p.iRow, 10), iColOld = parseInt(p.iCol, 10);
						kdir = e.keyCode;
						if (p.direction === "rtl") {
							if (kdir === 37) {
								kdir = 39;
							} else if (kdir === 39) {
								kdir = 37;
							}
						}
						switch (kdir) {
							case 38:
								if (iRowOld - 1 > 0) {
									scrollGrid(iRowOld - 1, iColOld, "vu");
									$self.jqGrid("editCell", iRowOld - 1, iColOld, false);
								}
								break;
							case 40:
								if (iRowOld + 1 <= $t.rows.length - 1) {
									scrollGrid(iRowOld + 1, iColOld, "vd");
									$self.jqGrid("editCell", iRowOld + 1, iColOld, false);
								}
								break;
							case 37:
								if (iColOld - 1 >= 0) {
									i = findNextVisible(iColOld - 1, "lft");
									scrollGrid(iRowOld, i, "h");
									$self.jqGrid("editCell", iRowOld, i, false);
								}
								break;
							case 39:
								if (iColOld + 1 <= p.colModel.length - 1) {
									i = findNextVisible(iColOld + 1, "rgt");
									scrollGrid(iRowOld, i, "h");
									$self.jqGrid("editCell", iRowOld, i, false);
								}
								break;
							case 13:
								if (iColOld >= 0 && iRowOld >= 0) {
									$self.jqGrid("editCell", iRowOld, iColOld, true);
								}
								break;
							default:
								return true;
						}
						return false;
					});
			});
		},
		getChangedCells: function (mthd) {
			var ret = [];
			if (!mthd) {
				mthd = "all";
			}
			this.each(function () {
				var $t = this, p = $t.p, htmlDecode = jgrid.htmlDecode, rows = $t.rows;
				if (!$t.grid || p.cellEdit !== true) {
					return;
				}
				$(rows).each(function (j) {
					var res = {};
					if ($(this).hasClass("edited")) {
						var tr = this;
						$(this.cells).each(function (i) {
							var cm = p.colModel[i], nm = cm.name, $td = getTdByColumnIndex.call($t, tr, i); // $td = $(this);
							if (nm !== "cb" && nm !== "subgrid" && nm !== "rn" && (mthd !== "dirty" || $td.hasClass("dirty-cell"))) {
								try {
									res[nm] = $.unformat.call($t, $td[0], { rowId: rows[j].id, colModel: cm }, i);
								} catch (e) {
									res[nm] = htmlDecode($td.html());
								}
							}
						});
						res.id = this.id;
						ret.push(res);
					}
				});
			});
			return ret;
		}
	});
	// end module grid.celledit
}));
