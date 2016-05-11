/**
 * jqGrid extension for manipulating Grid Data
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com,  http://trirand.com/blog/
 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/

/*jslint browser: true, eqeq: true, nomen: true, vars: true, devel: true, unparam: true, plusplus: true, white: true, todo: true */
/*global jQuery, define */
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
	var jgrid = $.jgrid, fullBoolFeedback = jgrid.fullBoolFeedback, hasOneFromClasses = jgrid.hasOneFromClasses,
		base = $.fn.jqGrid,
		getGuiStateStyles = function (path) {
			return base.getGuiStyles.call(this, "states." + path);
		};
	// begin module grid.inlinedit
	var editFeedback = function (o) {
			var args = $.makeArray(arguments).slice(1);
			args.unshift("");
			args.unshift("Inline");
			args.unshift(o);
			return jgrid.feedback.apply(this, args);
		};
	jgrid.inlineEdit = jgrid.inlineEdit || {};
	jgrid.extend({
		//Editing
		editRow: function (rowid, keys, oneditfunc, successfunc, url, extraparam, aftersavefunc, errorfunc, afterrestorefunc, beforeEditRow) {
			// Compatible mode old versions
			var oMuligrid = {}, args = $.makeArray(arguments).slice(1);

			if ($.type(args[0]) === "object") {
				oMuligrid = args[0];
			} else {
				if (keys !== undefined) { oMuligrid.keys = keys; }
				if ($.isFunction(oneditfunc)) { oMuligrid.oneditfunc = oneditfunc; }
				if ($.isFunction(successfunc)) { oMuligrid.successfunc = successfunc; }
				if (url !== undefined) { oMuligrid.url = url; }
				if (extraparam != null) { oMuligrid.extraparam = extraparam; }
				if ($.isFunction(aftersavefunc)) { oMuligrid.aftersavefunc = aftersavefunc; }
				if ($.isFunction(errorfunc)) { oMuligrid.errorfunc = errorfunc; }
				if ($.isFunction(afterrestorefunc)) { oMuligrid.afterrestorefunc = afterrestorefunc; }
				if ($.isFunction(beforeEditRow)) { oMuligrid.beforeEditRow = beforeEditRow; }
				// last two not as param, but as object (sorry)
				//if (restoreAfterError !== undefined) { oMuligrid.restoreAfterError = restoreAfterError; }
				//if (mtype !== undefined) { oMuligrid.mtype = mtype || "POST"; }
			}

			// End compatible
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, cnt = 0, focus = null, svr = {}, colModel = p.colModel, opers = p.prmNames;
				if (!$t.grid) { return; }
				var o = $.extend(true, {
						keys: false,
						oneditfunc: null,
						successfunc: null,
						url: null,
						extraparam: {},
						aftersavefunc: null,
						errorfunc: null,
						afterrestorefunc: null,
						restoreAfterError: true,
						beforeEditRow: null,
						mtype: "POST",
						focusField: true
					}, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid),
					ind = $self.jqGrid("getInd", rowid, true),
					focusField = o.focusField,
					td = typeof focusField === "object" && focusField != null ?
						$(focusField.target || focusField).closest("tr.jqgrow>td")[0] : null;

				if (ind === false) { return; }

				if (o.extraparam[opers.oper] !== opers.addoper) {
					if (!editFeedback.call($t, o, "beforeEditRow", o, rowid)) { return; }
				}

				if (($(ind).attr("editable") || "0") === "0" && !$(ind).hasClass("not-editable-row")) {
					var editingInfo = jgrid.detectRowEditing.call($t, rowid);
					if (editingInfo != null && editingInfo.mode === "cellEditing") {
						var savedRowInfo = editingInfo.savedRow, tr = $t.rows[savedRowInfo.id],
							highlightClass = getGuiStateStyles.call($t, "select");
						$self.jqGrid("restoreCell", savedRowInfo.id, savedRowInfo.ic);
						// remove highlighting of the cell
						$(tr.cells[savedRowInfo.ic]).removeClass("edit-cell " + highlightClass);
						$(tr).addClass(highlightClass).attr({ "aria-selected": "true", "tabindex": "0" });
					}
					jgrid.enumEditableCells.call($t, ind, $(ind).hasClass("jqgrid-new-row") ? "add" : "edit", function (options) {
						var cm = options.cm, $dataFiled = $(options.dataElement), dataWidth = options.dataWidth, tmp, opt, elc,
							nm = cm.name, edittype = cm.edittype, iCol = options.iCol, editoptions = cm.editoptions || {};
						if (options.editable === "hidden") { return; }
						try {
							tmp = $.unformat.call(this, options.td, { rowId: rowid, colModel: cm }, iCol);
						} catch (_) {
							tmp = edittype === "textarea" ? $dataFiled.text() : $dataFiled.html();
						}
						svr[nm] = tmp; // include only editable fields in svr object
						$dataFiled.html("");
						opt = $.extend({}, editoptions,
							{ id: rowid + "_" + nm, name: nm, rowId: rowid, mode: options.mode, cm: cm, iCol: iCol });
						if (tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length === 1 && tmp.charCodeAt(0) === 160)) { tmp = ""; }
						elc = jgrid.createEl.call($t, edittype, opt, tmp, true, $.extend({}, jgrid.ajaxOptions, p.ajaxSelectOptions || {}));
						$(elc).addClass("editable");
						$dataFiled.append(elc);
						if (dataWidth) {
							// change the width from auto or the value from editoptions
							// in case of editing ExpandColumn of TreeGrid
							$(elc).width(options.dataWidth);
						}
						jgrid.bindEv.call($t, elc, opt);
						//Again IE
						if (edittype === "select" && editoptions.multiple === true && editoptions.dataUrl === undefined && jgrid.msie) {
							$(elc).width($(elc).width());
						}
						if (focus === null) { focus = iCol; }
						cnt++;
					});
					if (cnt > 0) {
						svr.id = rowid;
						p.savedRow.push(svr);
						$(ind).attr("editable", "1");
						if (focusField) {
							if (typeof focusField === "number" && parseInt(focusField, 10) <= colModel.length) {
								focus = focusField;
							} else if (typeof focusField === "string") {
								focus = p.iColByName[focusField];
							} else if (td != null) {
								focus = td.cellIndex;
							}
							setTimeout(function () {
								// we want to use ":focusable"
								var nFrozenColumns = $self.jqGrid("getNumberOfFrozenColumns"),
									getTdByColIndex = function (iCol) {
										return p.frozenColumns && nFrozenColumns > 0 && focus < nFrozenColumns ?
											$t.grid.fbRows[ind.rowIndex].cells[iCol] :
											ind.cells[iCol];
									},
									getFocusable = function (elem) {
										return $(elem).find("input,textarea,select,button,object,*[tabindex]")
												.filter(":input:visible:not(:disabled)");
									},
									getFirstFocusable = function () {
										return getFocusable(p.frozenColumns && nFrozenColumns > 0 ? $t.grid.fbRows[ind.rowIndex] : ind)
												.first();
									},
									$fe = getFocusable(getTdByColIndex(focus));

								if ($fe.length > 0) {
									$fe.first().focus();
								} else if (typeof o.defaultFocusField === "number" || typeof o.defaultFocusField === "string") {
									$fe = getFocusable(getTdByColIndex(typeof o.defaultFocusField === "number" ? o.defaultFocusField : p.iColByName[o.defaultFocusField]));
									if ($fe.length === 0) {
										$fe = getFirstFocusable();
									}
									$fe.first().focus();
								} else {
									getFirstFocusable().focus();
								}
							}, 0);
						}
						if (o.keys === true) {
							var $ind = $(ind);
							if (p.frozenColumns) {
								$ind = $ind.add($t.grid.fbRows[ind.rowIndex]);
							}
							$ind.bind("keydown", function (e) {
								if (e.keyCode === 27) {
									$self.jqGrid("restoreRow", rowid, o.afterrestorefunc);
									return false;
								}
								if (e.keyCode === 13) {
									var ta = e.target;
									if (ta.tagName === "TEXTAREA") { return true; }
									$self.jqGrid("saveRow", rowid, o);
									return false;
								}
							});
						}
						fullBoolFeedback.call($t, o.oneditfunc, "jqGridInlineEditRow", rowid, o);
					}
				}
			});
		},
		saveRow: function (rowid, successfunc, url, extraparam, aftersavefunc, errorfunc, afterrestorefunc, beforeSaveRow) {
			// Compatible mode old versions
			var args = $.makeArray(arguments).slice(1), o = {}, $t = this[0], $self = $($t), p = $t != null ? $t.p : null, editOrAdd, infoDialog = jgrid.info_dialog;
			if (!$t.grid || p == null) { return; }

			if ($.type(args[0]) === "object") {
				o = args[0];
			} else {
				if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
				if (url !== undefined) { o.url = url; }
				if (extraparam !== undefined) { o.extraparam = extraparam; }
				if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
				if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
				if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
				if ($.isFunction(beforeSaveRow)) { o.beforeSaveRow = beforeSaveRow; }
			}
			var getRes = function (path) { return $self.jqGrid("getGridRes", path); };
			o = $.extend(true, {
				successfunc: null,
				url: null,
				extraparam: {},
				aftersavefunc: null,
				errorfunc: null,
				afterrestorefunc: null,
				restoreAfterError: true,
				beforeSaveRow: null,
				ajaxSaveOptions: {},
				serializeSaveData: null,
				mtype: "POST",
				saveui: "enable",
				savetext: getRes("defaults.savetext") || "Saving..."
			}, jgrid.inlineEdit, p.inlineEditing || {}, o);
			// End compatible
			// TODO: add return this.each(function(){....}
			var tmp = {}, tmp2 = {}, postData = {}, editable, k, fr, resp, cv, ind = $self.jqGrid("getInd", rowid, true), $tr = $(ind),
				opers = p.prmNames, errcap = getRes("errors.errcap"), bClose = getRes("edit.bClose"), isRemoteSave;

			if (ind === false) { return; }

			editOrAdd = o.extraparam[opers.oper] === opers.addoper ? "add" : "edit";

			if (!editFeedback.call($t, o, "beforeSaveRow", o, rowid, editOrAdd)) { return; }

			editable = $tr.attr("editable");
			o.url = o.url || p.editurl;
			isRemoteSave = o.url !== "clientArray";
			if (editable === "1") {
				jgrid.enumEditableCells.call($t, ind, $tr.hasClass("jqgrid-new-row") ? "add" : "edit", function (options) {
					var cm = options.cm, formatter = cm.formatter, editoptions = cm.editoptions || {},
						formatoptions = cm.formatoptions || {}, valueText = {},
						savedRow = ($.jgrid.detectRowEditing.call($t, rowid) || {}).savedRow,
						v = jgrid.getEditedValue.call($t, $(options.dataElement), cm, valueText, options.editable);

					if (cm.edittype === "select" && cm.formatter !== "select") {
						tmp2[cm.name] = valueText.text;
					}
					cv = jgrid.checkValues.call($t, v, options.iCol, undefined, undefined,
							$.extend(options, {
								oldValue: savedRow != null ? savedRow[cm.name] : null,
								newValue: v,
								oldRowData: savedRow }));
					if (cv != null && cv[0] === false) {
						return false;
					}
					if (formatter === "date" && formatoptions.sendFormatted !== true) {
						// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
						// Floating point separator for example
						v = $.unformat.date.call($t, v, cm);
					}
					if (isRemoteSave && editoptions.NullIfEmpty === true) {
						if (v === "") {
							v = "null";
						}
					}
					tmp[cm.name] = v;
				});

				if (cv != null && cv[0] === false) {
					try {
						var tr = $self.jqGrid("getGridRowById", rowid), positions = jgrid.findPos(tr);
						infoDialog.call($t, errcap, cv[1], bClose, { left: positions[0], top: positions[1] + $(tr).outerHeight() });
					} catch (e) {
						alert(cv[1]);
					}
					return;
				}
				var idname, oldRowId = rowid;
				opers = p.prmNames;
				if (p.keyName === false) {
					idname = opers.id;
				} else {
					idname = p.keyName;
				}
				if (tmp) {
					tmp[opers.oper] = opers.editoper;
					if (tmp[idname] === undefined || tmp[idname] === "") {
						tmp[idname] = rowid;
					} else if (ind.id !== p.idPrefix + tmp[idname]) {
						// rename rowid
						var oldid = jgrid.stripPref(p.idPrefix, rowid);
						if (p._index[oldid] !== undefined) {
							p._index[tmp[idname]] = p._index[oldid];
							delete p._index[oldid];
						}
						rowid = p.idPrefix + tmp[idname];
						// TODO: to test the case of frozen columns
						$tr.attr("id", rowid);
						if (p.selrow === oldRowId) {
							p.selrow = rowid;
						}
						if ($.isArray(p.selarrrow)) {
							var i = $.inArray(oldRowId, p.selarrrow);
							if (i >= 0) {
								p.selarrrow[i] = rowid;
							}
						}
						if (p.multiselect) {
							var newCboxId = "jqg_" + p.id + "_" + rowid;
							$tr.find("input.cbox")
								.attr("id", newCboxId)
								.attr("name", newCboxId);
						}
					}
					tmp = $.extend({}, tmp, p.inlineData || {}, o.extraparam);
				}
				if (!isRemoteSave) {
					tmp = $.extend({}, tmp, tmp2);
					resp = $self.jqGrid("setRowData", rowid, tmp);
					$tr.attr("editable", "0");
					for (k = 0; k < p.savedRow.length; k++) {
						if (String(p.savedRow[k].id) === String(oldRowId)) { fr = k; break; }
					}
					if (fr >= 0) { p.savedRow.splice(fr, 1); }
					fullBoolFeedback.call($t, o.aftersavefunc, "jqGridInlineAfterSaveRow", rowid, resp, tmp, o);
					$tr.removeClass("jqgrid-new-row").unbind("keydown");
				} else {
					$self.jqGrid("progressBar", { method: "show", loadtype: o.saveui, htmlcontent: o.savetext });
					postData = $.extend({}, tmp, postData);
					postData[idname] = jgrid.stripPref(p.idPrefix, postData[idname]);
					if (p.autoEncodeOnEdit) {
						$.each(postData, function (n, v) {
							if (!$.isFunction(v)) {
								postData[n] = jgrid.oldEncodePostedData(v);
							}
						});
					}

					$.ajax($.extend({
						url: $.isFunction(o.url) ? o.url.call($t, postData[idname], editOrAdd, postData, o) : o.url,
						data: jgrid.serializeFeedback.call($t,
								$.isFunction(o.serializeSaveData) ? o.serializeSaveData : p.serializeRowData,
								"jqGridInlineSerializeSaveData",
								postData),
						type: $.isFunction(o.mtype) ? o.mtype.call($t, editOrAdd, o, postData[idname], postData) : o.mtype,
						complete: function (jqXHR, textStatus) {
							$self.jqGrid("progressBar", { method: "hide", loadtype: o.saveui, htmlcontent: o.savetext });
							// textStatus can be "abort", "timeout", "error", "parsererror" or some text from text part of HTTP error occurs
							// see the answer http://stackoverflow.com/a/3617710/315935 about xhr.readyState === 4 && xhr.status === 0
							if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
								var ret, sucret, j;
								sucret = $self.triggerHandler("jqGridInlineSuccessSaveRow", [jqXHR, rowid, o]);
								if (sucret == null || sucret === true) { sucret = [true, tmp]; }
								if (sucret[0] && $.isFunction(o.successfunc)) { sucret = o.successfunc.call($t, jqXHR); }
								if ($.isArray(sucret)) {
									// expect array - status, data, rowid
									ret = sucret[0];
									tmp = sucret[1] || tmp;
								} else {
									ret = sucret;
								}
								if (ret === true) {
									if (p.autoEncodeOnEdit) {
										$.each(tmp, function (n, v) {
											tmp[n] = jgrid.oldDecodePostedData(v);
										});
									}
									tmp = $.extend({}, tmp, tmp2);
									$self.jqGrid("setRowData", rowid, tmp);
									$tr.attr("editable", "0");
									for (j = 0; j < p.savedRow.length; j++) {
										if (String(p.savedRow[j].id) === String(rowid)) { fr = j; break; }
									}
									if (fr >= 0) { p.savedRow.splice(fr, 1); }
									fullBoolFeedback.call($t, o.aftersavefunc, "jqGridInlineAfterSaveRow", rowid, jqXHR, tmp, o);
									$tr.removeClass("jqgrid-new-row").unbind("keydown");
								} else {
									fullBoolFeedback.call($t, o.errorfunc, "jqGridInlineErrorSaveRow", rowid, jqXHR, textStatus, null, o);
									if (o.restoreAfterError === true) {
										$self.jqGrid("restoreRow", rowid, o.afterrestorefunc);
									}
								}
							}
						},
						error: function (res, stat, err) {
							$("#lui_" + jgrid.jqID(p.id)).hide();
							$self.triggerHandler("jqGridInlineErrorSaveRow", [rowid, res, stat, err, o]);
							if ($.isFunction(o.errorfunc)) {
								o.errorfunc.call($t, rowid, res, stat, err);
							} else {
								var rT = res.responseText || res.statusText;
								try {
									infoDialog.call($t, errcap, '<div class="' + getGuiStateStyles.call($t, "error") + '">' + rT + "</div>", bClose, { buttonalign: "right" });
								} catch (e1) {
									alert(rT);
								}
							}
							if (o.restoreAfterError === true) {
								$self.jqGrid("restoreRow", rowid, o.afterrestorefunc);
							}
						}
					}, jgrid.ajaxOptions, p.ajaxRowOptions, o.ajaxSaveOptions || {}));
				}
			}
			return;
		},
		restoreRow: function (rowid, afterrestorefunc) {
			// Compatible mode old versions
			var args = $.makeArray(arguments).slice(1), oMuligrid = {};

			if ($.type(args[0]) === "object") {
				oMuligrid = args[0];
			} else {
				if ($.isFunction(afterrestorefunc)) { oMuligrid.afterrestorefunc = afterrestorefunc; }
			}

			// End compatible

			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, fr = -1, ares = {}, k;
				if (!$t.grid) { return; }

				var o = $.extend(true, {}, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid);
				var ind = $self.jqGrid("getInd", rowid, true);
				if (ind === false) { return; }

				if (!editFeedback.call($t, o, "beforeCancelRow", o, rowid)) { return; }

				for (k = 0; k < p.savedRow.length; k++) {
					if (String(p.savedRow[k].id) === String(rowid)) {
						fr = k;
						break;
					}
				}
				if (fr >= 0) {
					if ($.isFunction($.fn.datepicker)) {
						try {
							$("input.hasDatepicker", "#" + jgrid.jqID(ind.id)).datepicker("hide");
						} catch (ignore) { }
					}

					$.each(p.colModel, function () {
						var nm = this.name;
						if (p.savedRow[fr].hasOwnProperty(nm)) {
							ares[nm] = p.savedRow[fr][nm];
							if (this.formatter && this.formatter === "date" && (this.formatoptions == null || this.formatoptions.sendFormatted !== true)) {
								// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
								// Floating point separator for example
								ares[nm] = $.unformat.date.call($t, ares[nm], this);
							}
						}
					});
					$self.jqGrid("setRowData", rowid, ares);
					$(ind).attr("editable", "0").unbind("keydown");
					p.savedRow.splice(fr, 1);
					if ($("#" + jgrid.jqID(rowid), $t).hasClass("jqgrid-new-row")) {
						setTimeout(function () {
							$self.jqGrid("delRowData", rowid);
							$self.jqGrid("showAddEditButtons", false);
						}, 0);
					}
				}
				fullBoolFeedback.call($t, o.afterrestorefunc, "jqGridInlineAfterRestoreRow", rowid);
			});
		},
		addRow: function (oMuligrid) {
			return this.each(function () {
				if (!this.grid) { return; }

				var $t = this, $self = $($t), p = $t.p,
					o = $.extend(true, {
						rowID: null,
						initdata: {},
						position: "first",
						useDefValues: true,
						useFormatter: false,
						beforeAddRow: null,
						addRowParams: { extraparam: {} }
					}, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid || {});
				if (!editFeedback.call($t, o, "beforeAddRow", o.addRowParams)) { return; }

				o.rowID = $.isFunction(o.rowID) ? o.rowID.call($t, o) : ((o.rowID != null) ? o.rowID : jgrid.randId());
				if (o.useDefValues === true) {
					$(p.colModel).each(function () {
						if (this.editoptions && this.editoptions.defaultValue) {
							var opt = this.editoptions.defaultValue;
							o.initdata[this.name] = $.isFunction(opt) ? opt.call($t) : opt;
						}
					});
				}
				o.rowID = p.idPrefix + o.rowID;
				$self.jqGrid("addRowData", o.rowID, o.initdata, o.position);
				$("#" + jgrid.jqID(o.rowID), $t).addClass("jqgrid-new-row");
				if (o.useFormatter) {
					$("#" + jgrid.jqID(o.rowID) + " .ui-inline-edit", $t).click();
				} else {
					var opers = p.prmNames, oper = opers.oper;
					o.addRowParams.extraparam[oper] = opers.addoper;
					$self.jqGrid("editRow", o.rowID, o.addRowParams);
					$self.jqGrid("setSelection", o.rowID);
				}
			});
		},
		inlineNav: function (elem, oMuligrid) {
			if (typeof elem === "object") {
				// the option pager are skipped
				oMuligrid = elem;
				elem = undefined;
			}
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!this.grid || p == null) { return; }
				var $elem, gID = elem === p.toppager ? p.idSel + "_top" : p.idSel,
					gid = elem === p.toppager ? p.id + "_top" : p.id, disabledClass = getGuiStateStyles.call($t, "disabled"),
					o = $.extend(true,
						{
							edit: true,
							editicon: "ui-icon-pencil",
							add: true,
							addicon: "ui-icon-plus",
							save: true,
							saveicon: "ui-icon-disk",
							cancel: true,
							cancelicon: "ui-icon-cancel",
							commonIconClass: "ui-icon",
							iconsOverText: false,
							//alertToTop: false, use undefined to be able to use defaults from $.jgrid.jqModal or later from p.jqModal
							addParams: { addRowParams: { extraparam: {} } },
							editParams: {},
							restoreAfterSelect: true
						},
						//TODO make getRes(locales[p.locale], "nav"), jgrid.nav || {}, p.navOptions || {}
						// as the result of working getRes("nav")
						//getRes(locales[p.locale], "nav"),
						$self.jqGrid("getGridRes", "nav"),
						jgrid.nav || {},
						p.navOptions || {},
						jgrid.inlineNav || {},
						p.inlineNavOptions || {},
						oMuligrid || {}
					),
					viewModalAlert = function () {
						$t.modalAlert();
					};

				if (elem === undefined) {
					if (p.pager) {
						$self.jqGrid("inlineNav", p.pager, o);
						if (p.toppager) {
							elem = p.toppager;
							gID = p.idSel + "_top";
							gid = p.id + "_top";
						} else {
							return;
						}
					} else if (p.toppager) {
						elem = p.toppager;
						gID = p.idSel + "_top";
						gid = p.id + "_top";
					}
				}
				if (elem === undefined) {
					return; // error
				}
				$elem = $(elem);
				if ($elem.length <= 0) {
					return; // error
				}
				if ($elem.find(".navtable").length <= 0) {
					// create navigator bar if it is not yet exist
					$self.jqGrid("navGrid", elem, { add: false, edit: false, del: false, search: false, refresh: false, view: false });
				}

				p._inlinenav = true;
				// detect the formatactions column
				if (o.addParams.useFormatter === true) {
					var cm = p.colModel, i, defaults, ap;
					for (i = 0; i < cm.length; i++) {
						if (cm[i].formatter && cm[i].formatter === "actions") {
							if (cm[i].formatoptions) {
								defaults = {
									keys: false,
									onEdit: null,
									onSuccess: null,
									afterSave: null,
									onError: null,
									afterRestore: null,
									extraparam: {},
									url: null
								};
								ap = $.extend(defaults, cm[i].formatoptions);
								o.addParams.addRowParams = {
									"keys": ap.keys,
									"oneditfunc": ap.onEdit,
									"successfunc": ap.onSuccess,
									"url": ap.url,
									"extraparam": ap.extraparam,
									"aftersavefunc": ap.afterSave,
									"errorfunc": ap.onError,
									"afterrestorefunc": ap.afterRestore
								};
							}
							break;
						}
					}
				}
				if (o.add) {
					$self.jqGrid("navButtonAdd", elem, {
						caption: o.addtext,
						title: o.addtitle,
						commonIconClass: o.commonIconClass,
						buttonicon: o.addicon,
						iconsOverText: o.iconsOverText,
						id: gid + "_iladd",
						onClickButton: function () {
							if (!hasOneFromClasses(this, disabledClass)) {
								$self.jqGrid("addRow", o.addParams);
							}
						}
					});
				}
				if (o.edit) {
					$self.jqGrid("navButtonAdd", elem, {
						caption: o.edittext,
						title: o.edittitle,
						commonIconClass: o.commonIconClass,
						buttonicon: o.editicon,
						iconsOverText: o.iconsOverText,
						id: gid + "_iledit",
						onClickButton: function () {
							if (!hasOneFromClasses(this, disabledClass)) {
								var sr = p.selrow;
								if (sr) {
									$self.jqGrid("editRow", sr, o.editParams);
								} else {
									viewModalAlert();
								}
							}
						}
					});
				}
				if (o.save) {
					$self.jqGrid("navButtonAdd", elem, {
						caption: o.savetext,
						title: o.savetitle,
						commonIconClass: o.commonIconClass,
						buttonicon: o.saveicon,
						iconsOverText: o.iconsOverText,
						id: gid + "_ilsave",
						onClickButton: function () {
							if (!hasOneFromClasses(this, disabledClass)) {
								var sr = p.savedRow[0].id;
								if (sr) {
									var opers = p.prmNames, oper = opers.oper, tmpParams = o.editParams;
									if ($("#" + jgrid.jqID(sr), $t).hasClass("jqgrid-new-row")) {
										o.addParams.addRowParams.extraparam[oper] = opers.addoper;
										tmpParams = o.addParams.addRowParams;
									} else {
										if (!o.editParams.extraparam) {
											o.editParams.extraparam = {};
										}
										o.editParams.extraparam[oper] = opers.editoper;
									}
									$self.jqGrid("saveRow", sr, tmpParams);
								} else {
									viewModalAlert();
								}
							}
						}
					});
					$(gID + "_ilsave").addClass(disabledClass);
				}
				if (o.cancel) {
					$self.jqGrid("navButtonAdd", elem, {
						caption: o.canceltext,
						title: o.canceltitle,
						commonIconClass: o.commonIconClass,
						buttonicon: o.cancelicon,
						iconsOverText: o.iconsOverText,
						id: gid + "_ilcancel",
						onClickButton: function () {
							if (!hasOneFromClasses(this, disabledClass)) {
								var sr = p.savedRow[0].id, cancelPrm = o.editParams;
								if (sr) {
									if ($("#" + jgrid.jqID(sr), $t).hasClass("jqgrid-new-row")) {
										cancelPrm = o.addParams.addRowParams;
									}
									$self.jqGrid("restoreRow", sr, cancelPrm);
								} else {
									viewModalAlert();
								}
							}
						}
					});
					$(gID + "_ilcancel").addClass(disabledClass);
				}
				if (o.restoreAfterSelect === true) {
					$self.bind("jqGridSelectRow", function (e, rowid) {
						if (p.savedRow.length > 0 && p._inlinenav === true) {
							var editingRowId = p.savedRow[0].id;
							if (rowid !== editingRowId && typeof editingRowId !== "number") {
								$self.jqGrid("restoreRow", editingRowId, o.editParams);
							}
						}
					});
				}
				$self.bind("jqGridInlineAfterRestoreRow jqGridInlineAfterSaveRow", function () {
					$self.jqGrid("showAddEditButtons", false);
				});
				$self.bind("jqGridInlineEditRow", function (e, rowid) {
					$self.jqGrid("showAddEditButtons", true, rowid);
				});
			});
		},
		showAddEditButtons: function (isEditing) {
			return this.each(function () {
				var $t = this;
				if (!$t.grid) { return; }
				var p = $t.p, idSel = p.idSel, disabledClass = getGuiStateStyles.call($t, "disabled"),
					saveCancel = idSel + "_ilsave," + idSel + "_ilcancel" + (p.toppager ? "," + idSel + "_top_ilsave," + idSel + "_top_ilcancel" : ""),
					addEdit = idSel + "_iladd," + idSel + "_iledit" + (p.toppager ? "," + idSel + "_top_iladd," + idSel + "_top_iledit" : "");
				$(isEditing ? addEdit : saveCancel).addClass(disabledClass);
				$(isEditing ? saveCancel : addEdit).removeClass(disabledClass);
			});
		}
	});
	// end module grid.inlinedit
}));
