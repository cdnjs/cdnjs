/**
 * jqGrid extension for custom methods
 * Tony Tomov tony@trirand.com, http://trirand.com/blog/
 *
 * Wildraid wildraid@mail.ru
 * Oleg Kiriljuk oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/

/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, nomen: true, plusplus: true, vars: true, unparam: true, white: true, todo: true */
/*global jQuery, define, exports, module, require */
(function (global, factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		//console.log("grid.custom AMD");
		define([
			"jquery",
			"./grid.base",
			"./jquery.fmatter",
			"./grid.common"
		], function ($) {
			//console.log("grid.custom AMD: define callback");
			return factory($, global.document);
		});
	} else if (typeof module === "object" && module.exports) {
		// Node/CommonJS
		//console.log("grid.custom CommonJS, typeof define=" + typeof define + ", define=" + define);
		module.exports = function (root, $) {
			//console.log("grid.custom CommonJS: in module.exports");
			if (!root) {
				root = window;
			}
			//console.log("grid.custom CommonJS: before require('jquery')");
			if ($ === undefined) {
				// require("jquery") returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				$ = typeof window !== "undefined" ?
						require("jquery") :
						require("jquery")(root);
			}
			//console.log("grid.custom CommonJS: before require('./grid.base')");
			require("./grid.base");
			//console.log("grid.custom CommonJS: before require('./jquery.fmatter')");
			require("./jquery.fmatter");
			//console.log("grid.custom CommonJS: before require('./grid.common')");
			require("./grid.common");
			factory($, root.document);
			return $;
		};
	} else {
		// Browser globals
		//console.log("grid.custom Browser: before factory");
		factory(jQuery, global.document);
	}
}(typeof window !== "undefined" ? window : this, function ($, document) {
	"use strict";
	var jgrid = $.jgrid, jqID = jgrid.jqID, base = $.fn.jqGrid,
		getGuiStyles = base.getGuiStyles, getGridRes = base.getGridRes;

	// begin module grid.custom
	jgrid.extend({
		getColProp: function (colname) {
			var ret = {}, t = this[0], iCol;
			if (t != null && t.grid) {
				iCol = t.p.iColByName[colname];
				if (iCol !== undefined) {
					return t.p.colModel[iCol];
				}
			}
			return ret;
		},
		setColProp: function (colname, obj) {
			//do not set width will not work
			return this.each(function () {
				var self = this, p = self.p, iCol;
				if (self.grid && p != null && obj) {
					iCol = p.iColByName[colname];
					if (iCol !== undefined) {
						$.extend(true, p.colModel[iCol], obj);
					}
				}
			});
		},
		sortGrid: function (colname, reload, sor) {
			return this.each(function () {
				var self = this, grid = self.grid, p = self.p, colModel = p.colModel, l = colModel.length, cm, i, sobj = false, sort;
				if (!grid) { return; }
				if (!colname) { colname = p.sortname; }
				if (typeof reload !== "boolean") { reload = false; }
				for (i = 0; i < l; i++) {
					cm = colModel[i];
					if (cm.index === colname || cm.name === colname) {
						if (p.frozenColumns === true && cm.frozen === true) {
							sobj = grid.fhDiv.find("#" + jqID(p.id + "_" + colname));
						}
						if (!sobj || sobj.length === 0) {
							sobj = grid.headers[i].el;
						}
						sort = cm.sortable;
						if (typeof sort !== "boolean" || sort) {
							self.sortData(cm.index || cm.name, i, reload, sor, sobj);
						}
						break;
					}
				}
			});
		},
		clearBeforeUnload: function () {
			return this.each(function () {
				var self = this, p = self.p, grid = self.grid, propOrMethod, clearArray = jgrid.clearArray,
					hasOwnProperty = Object.prototype.hasOwnProperty;
				if ($.isFunction(grid.emptyRows)) {
					grid.emptyRows.call(self, true, true); // this work quick enough and reduce the size of memory leaks if we have someone
				}

				$(document).off("mousemove.jqGrid mouseup.jqGrid" + p.id);
				$(self).off();

				/*grid.dragEnd = null;
				grid.dragMove = null;
				grid.dragStart = null;
				grid.emptyRows = null;
				grid.populate = null;
				grid.populateVisible = null;
				grid.scrollGrid = null;
				grid.selectionPreserver = null;

				grid.bDiv = null;
				grid.fbRows = null;
				grid.cDiv = null;
				grid.hDiv = null;
				grid.cols = null;*/
				var i, l = grid.headers.length;
				for (i = 0; i < l; i++) {
					grid.headers[i].el = null;
				}
				for (propOrMethod in grid) {
					if (grid.hasOwnProperty(propOrMethod)) {
						grid.propOrMethod = null;
					}
				}

				/*self.formatCol = null;
				self.sortData = null;
				self.updatepager = null;
				self.refreshIndex = null;
				self.setHeadCheckBox = null;
				self.constructTr = null;
				self.formatter = null;
				self.addXmlData = null;
				self.addJSONData = null;
				self.grid = null;*/

				var propOrMethods = ["formatCol", "sortData", "updatepager", "refreshIndex", "setHeadCheckBox", "constructTr", "clearToolbar", "fixScrollOffsetAndhBoxPadding", "rebuildRowIndexes", "modalAlert", "toggleToolbar", "triggerToolbar", "formatter", "addXmlData", "addJSONData", "ftoolbar", "_inlinenav", "nav", "grid", "p"];
				l = propOrMethods.length;
				for (i = 0; i < l; i++) {
					if (hasOwnProperty.call(self, propOrMethods[i])) {
						self[propOrMethods[i]] = null;
					}
				}
				self._index = {};
				clearArray(p.data);
				clearArray(p.lastSelectedData);
				clearArray(p.selarrrow);
				clearArray(p.savedRow);
				p.editingInfo = {};
			});
		},
		GridDestroy: function () {
			return this.each(function () {
				var self = this, p = self.p;
				if (self.grid && p != null) {
					if (p.pager) { // if not part of grid
						$(p.pager).remove();
					}
					try {
						$("#alertmod_" + jqID(p.id)).remove();
						$(self).jqGrid("clearBeforeUnload");
						$(p.gBox).remove();
					} catch (ignore) { }
				}
			});
		},
		GridUnload: function () {
			return this.each(function () {
				var self = this, $self = $(self), p = self.p, $j = $.fn.jqGrid;
				if (!self.grid) { return; }
				$self.removeClass($j.getGuiStyles.call($self, "grid", "ui-jqgrid-btable"));
				// The multiple removeAttr can be replace to one after dropping of support of old jQuery
				if (p.pager) {
					if (p.pager.substr(1, $.jgrid.uidPref.length) === $.jgrid.uidPref) {
						$(p.pager).remove();
					} else {
						$(p.pager).empty()
							.removeClass($j.getGuiStyles.call($self, "pager.pager", "ui-jqgrid-pager " +
								$j.getGuiStyles.call($self, "bottom")))
							.removeAttr("style")
							.removeAttr("dir");
					}
				}
				$self.jqGrid("clearBeforeUnload");
				$self.removeAttr("style")
					.removeAttr("tabindex")
					.removeAttr("role")
					.removeAttr("aria-labelledby")
					.removeAttr("style");
				$self.empty(); // remove the first line
				$self.insertBefore(p.gBox).show();
				$(p.pager).insertBefore(p.gBox).show();
				$(p.gBox).remove();
			});
		},
		setGridState: function (state) {
			return this.each(function () {
				var $t = this, p = $t.p, grid = $t.grid, cDiv = grid.cDiv, $uDiv = $(grid.uDiv), $ubDiv = $(grid.ubDiv);
				if (!grid || p == null) { return; }
				var getMinimizeIcon = function (path) {
						return base.getIconRes.call($t, "gridMinimize." + path);
					},
					visibleGridIcon = getMinimizeIcon("visible"), // "ui-icon-circle-triangle-n"
					hiddenGridIcon = getMinimizeIcon("hidden");  // "ui-icon-circle-triangle-s"
				if (state === "hidden") {
					$(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", p.gView).slideUp("fast");
					if (p.pager) { $(p.pager).slideUp("fast"); }
					if (p.toppager) { $(p.toppager).slideUp("fast"); }
					if (p.toolbar[0] === true) {
						if (p.toolbar[1] === "both") {
							$ubDiv.slideUp("fast");
						}
						$uDiv.slideUp("fast");
					}
					if (p.footerrow) { $(".ui-jqgrid-sdiv", p.gBox).slideUp("fast"); }
					$(".ui-jqgrid-titlebar-close span", cDiv).removeClass(visibleGridIcon).addClass(hiddenGridIcon);
					p.gridstate = "hidden";
				} else if (state === "visible") {
					$(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", p.gView).slideDown("fast");
					if (p.pager) { $(p.pager).slideDown("fast"); }
					if (p.toppager) { $(p.toppager).slideDown("fast"); }
					if (p.toolbar[0] === true) {
						if (p.toolbar[1] === "both") {
							$ubDiv.slideDown("fast");
						}
						$uDiv.slideDown("fast");
					}
					if (p.footerrow) { $(".ui-jqgrid-sdiv", p.gBox).slideDown("fast"); }
					$(".ui-jqgrid-titlebar-close span", cDiv).removeClass(hiddenGridIcon).addClass(visibleGridIcon);
					p.gridstate = "visible";
				}
			});
		},
		filterToolbar: function (oMuligrid) {
			// if one uses jQuery wrapper with multiple grids, then oMultiple specify the object with common options
			return this.each(function () {
				var $t = this, grid = $t.grid, $self = $($t), p = $t.p, infoDialog = jgrid.info_dialog, htmlEncode = jgrid.htmlEncode;
				if (this.ftoolbar) { return; }
				// make new copy of the options and use it for ONE specific grid.
				// p.searching can contains grid specific options
				// we will don't modify the input options oMuligrid
				var o = $.extend(true, {
						autosearch: true,
						autosearchDelay: 500,
						searchOnEnter: true,
						beforeSearch: null,
						afterSearch: null,
						beforeClear: null,
						afterClear: null,
						searchurl: "",
						sField: "searchField",
						sValue: "searchString",
						sOper: "searchOper",
						sFilter: p.prmNames.filters,
						stringResult: false,
						groupOp: "AND",
						defaultSearch: "bw",
						idMode: "new", // support "old", "compatibility", "new"
						searchOperators: false,
						resetIcon: "&times;",
						applyLabelClasses: true,
						loadFilterDefaults: true, // this options activates loading of default filters from grid's postData for Multipe Search only.
						operands: { "eq": "==", "ne": "!", "lt": "<", "le": "<=", "gt": ">", "ge": ">=", "bw": "^", "bn": "!^", "in": "=", "ni": "!=", "ew": "|", "en": "!@", "cn": "~", "nc": "!~", "nu": "#", "nn": "!#" }
					}, jgrid.search, p.searching || {}, oMuligrid || {}),
					colModel = p.colModel,
					getRes = function (path) {
						return getGridRes.call($self, path);
					},
					errcap = getRes("errors.errcap"),
					bClose = getRes("edit.bClose"),
					editMsg = getRes("edit.msg"),
					hoverClasses = getGuiStyles.call($t, "states.hover"),
					highlightClass = getGuiStyles.call($t, "states.select"),
					dataFieldClass = getGuiStyles.call($t, "filterToolbar.dataField"),
					currentFilters = {},
					getId = function (cmName) {
						var prefix = "gs_";
						switch (o.idMode) {
							case "compatibility":
								prefix += p.idPrefix;
								break;
							case "new":
								prefix += p.id + "_";
								break;
							default: // "old"
								break;
						}
						return prefix + cmName;
					},
					getIdSel = function (cmName) {
						return "#" + jqID(getId(cmName));
					},
					getOnOffValue = function (soptions) {
						var checkboxValue = (soptions.value || "").split(":");

						return {
							on: checkboxValue[0] || "on",
							off: checkboxValue[1] || "off"
						};
					},
					parseFilter = function (fillAll) {
						var i, j, filters = p.postData[o.sFilter], filter = {}, rules, rule,
							iColByName = p.iColByName, cm, soptions;
						if (fillAll) {
							for (j = 0; j < colModel.length; j++) {
								cm = colModel[j];
								if (cm.search !== false) {
									soptions = cm.searchoptions || {};
									filter[cm.name] = {
										op: soptions.sopt ?
												soptions.sopt[0] :
												(cm.stype === "select" || cm.stype === "checkbox") ? "eq" : o.defaultSearch,
										data: soptions.defaultValue !== undefined ? soptions.defaultValue : ""
									};
								}
							}
						}

						// TODO: test for !o.stringResult && !o.searchOperators && p.datatype !== "local"
						// and use p.postData[cm.index || cm.name] instead of filter[cm.name]
						if (!filters || !p.search) { return filter; }
						if (typeof filters === "string") {
							try {
								filters = $.parseJSON(filters);
							} catch (ignore) {
								filters = {};
							}
						} else {
							filters = filters || {};
						}
						rules = filters.rules || {};
						if (filters == null ||
								(filters.groupOp != null && o.groupOp != null && filters.groupOp.toUpperCase() !== o.groupOp.toUpperCase()) ||
								rules == null || rules.length === 0 ||
								(filters.groups != null && filters.groups.length > 0)) {
							return filter;
						}
						for (j = 0; j < rules.length; j++) {
							rule = rules[j];
							// find all columns in colModel, where
							// colModel[i].index || colModel[i].name === rule.field
							cm = colModel[iColByName[rule.field]];
							for (i = 0; i < colModel.length; i++) {
								cm = colModel[i];
								if ((cm.index || cm.name) !== rule.field || cm.search === false) {
									continue;
								}
								soptions = cm.searchoptions || {};
								if (soptions.sopt) {
									if ($.inArray(rule.op, soptions.sopt) < 0) {
										continue;
									}
								} else if (cm.stype === "select" || cm.stype === "checkbox") {
									if (rule.op !== "eq") {
										continue;
									}
								} else if (rule.op !== o.defaultSearch) {
									continue;
								}
								filter[cm.name] = { op: rule.op, data: rule.data };
							}
						}
						return filter;
					},
					setThreeStateCheckbox = function ($checkbox, state) {
						switch (state) {
							case 1: // make checked
								$checkbox.data("state", 1)
									.prop({
										checked: true,
										indeterminate: false
									});
								break;
							case 0: // make unchecked
								$checkbox.data("state", 0)
									.prop({
										checked: false,
										indeterminate: false
									});
								break;
							default: // make indeterminate
								$checkbox.data("state", -1)
									.prop({
										checked: false,
										indeterminate: true
									});
								break;
						}
					},
					triggerToolbar = function () {
						var sdata = {}, j = 0, sopt = {};
						$.each(colModel, function () {
							var cm = this, nm = cm.index || cm.name, v, so, searchoptions = cm.searchoptions || {},
								$elem = $(getIdSel(cm.name), (cm.frozen === true && p.frozenColumns === true) ? grid.fhDiv : grid.hDiv),
								getFormaterOption = function (optionName, formatter) {
									var formatoptions = cm.formatoptions || {};
									return formatoptions[optionName] !== undefined ?
										formatoptions[optionName] :
										getRes("formatter." + (formatter || cm.formatter) + "." + optionName);
								},
								cutThousandsSeparator = function (val) {
									var separator = getFormaterOption("thousandsSeparator")
											.replace(/([\.\*\_\'\(\)\{\}\+\?\\])/g, "\\$1");
									return val.replace(new RegExp(separator, "g"), "");
								};

							if (o.searchOperators) {
								so = $elem.parent().prev().children("a").data("soper") || o.defaultSearch;
							} else {
								so = searchoptions.sopt ? searchoptions.sopt[0] : (cm.stype === "select" || cm.stype === "checkbox") ? "eq" : o.defaultSearch;
							}
							/* the format of element of the searching toolbar if ANOTHER
							 * as the format of cells in the grid. So one can't use
							 *     value = $.unformat.call($t, $elem, { colModel: cm }, iCol)
							 * to get the value. Even the access to the value should be
							 * $elem.val() instead of $elem.text() used in the common case of
							 * formatter. So we have to make manual conversion of searching filed
							 * used for integer/number/currency. The code will be duplicate */
							if (cm.stype === "custom" && $.isFunction(searchoptions.custom_value) && $elem.length > 0 && $elem[0].nodeName.toUpperCase() === "SPAN") {
								v = searchoptions.custom_value.call($t, $elem.children(".customelement").first(), "get");
							} else if (cm.stype === "select") {
								if ($elem.prop("multiple")) {
									v = $elem.val();
									if (v == null || v.length === 0) {
										v = "";
									} else {
										v = v.join(p.inFilterSeparator || ",");
									}
								} else {
									v = $elem.val();
								}
							} else if (cm.stype === "checkbox") {
								var onOffValue = getOnOffValue(searchoptions);

								switch ($elem.data("state")) {
									case -1:   // has indeterminate state
										v = "";
										break;
									case 0:    // is unchecked
										// make indeterminate
										v = onOffValue.off;
										break;
									default:    // is checked
										// make unchecked
										v = onOffValue.on;
										break;
								}
							} else {
								v = $.trim($elem.val());
								switch (cm.formatter) {
									case "integer":
										v = cutThousandsSeparator(v)
												.replace(getFormaterOption("decimalSeparator", "number"), ".");
										if (v !== "") {
											// normalize the strings like "010.01" to "10"
											v = String(parseInt(v, 10));
										}
										break;
									case "number":
										v = cutThousandsSeparator(v)
												.replace(getFormaterOption("decimalSeparator"), ".");
										if (v !== "" && String(v).charAt(0) === "0") {
											// normalize the strings like "010.00" to "10"
											// and "010.12" to "10.12"
											v = String(parseFloat(v));
										}
										break;
									case "currency":
										var prefix = getFormaterOption("prefix"),
											suffix = getFormaterOption("suffix");
										if (prefix && prefix.length && v.substr(0, prefix.length) === prefix) {
											v = v.substr(prefix.length);
										}
										if (suffix && suffix.length && v.length > suffix.length && v.substr(v.length - suffix.length, suffix.length) === suffix) {
											v = v.substr(0, v.length - suffix.length);
										}
										v = cutThousandsSeparator(v)
												.replace(getFormaterOption("decimalSeparator"), ".");
										if (v !== "") {
											// normalize the strings like "010.00" to "10"
											// and "010.12" to "10.12"
											v = String(parseFloat(v));
										}
										break;
									default:
										// TODO: call unformatter if it's defined.
										break;
								}
							}
							if (v || so === "nu" || so === "nn" || $.inArray(so, p.customUnaryOperations) >= 0) {
								sdata[nm] = v;
								sopt[nm] = so;
								j++;
							} else {
								if (sdata.hasOwnProperty(nm)) {
									delete sdata[nm];
								}
								if (!(o.stringResult || o.searchOperators || p.datatype === "local")) {
									try {
										if (p.postData != null && p.postData.hasOwnProperty(nm)) {
											delete p.postData[nm];
										}
									} catch (ignore) { }
								}
							}
						});
						var sd = j > 0 ? true : false;
						if (o.stringResult || o.searchOperators || p.datatype === "local") {
							var ruleGroup = '{"groupOp":"' + o.groupOp + '","rules":[';
							var gi = 0;
							$.each(sdata, function (cmName, n) {
								//var iCol = p.iColByName[cmName], cm = p.colModel[iCol],
								//	value = $.unformat.call($t, $("<span></span>").text(n), { colModel: cm }, iCol);
								if (gi > 0) { ruleGroup += ","; }
								ruleGroup += '{"field":"' + cmName + '",';
								ruleGroup += '"op":"' + sopt[cmName] + '",';
								n += "";
								ruleGroup += '"data":"' + n.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
								gi++;
							});
							ruleGroup += "]}";
							p.postData[o.sFilter] = ruleGroup;
							$.each([o.sField, o.sValue, o.sOper], function (i, n) {
								if (p.postData.hasOwnProperty(n)) { delete p.postData[n]; }
							});
						} else {
							$.extend(p.postData, sdata);
						}
						var saveurl;
						if (p.searchurl) {
							saveurl = p.url;
							$self.jqGrid("setGridParam", { url: p.searchurl });
						}
						var bsr = $self.triggerHandler("jqGridToolbarBeforeSearch") === "stop" ? true : false;
						if (!bsr && $.isFunction(o.beforeSearch)) { bsr = o.beforeSearch.call($t); }
						if (!bsr) {
							$self.jqGrid("setGridParam", { search: sd })
								.trigger("reloadGrid", [$.extend({ page: 1 }, o.reloadGridSearchOptions || {})]);
						}
						if (saveurl) { $self.jqGrid("setGridParam", { url: saveurl }); }
						$self.triggerHandler("jqGridToolbarAfterSearch");
						if ($.isFunction(o.afterSearch)) { o.afterSearch.call($t); }
					},
					clearToolbar = function (trigger) {
						var sdata = {}, j = 0, nm;
						trigger = (typeof trigger !== "boolean") ? true : trigger;
						$.each(colModel, function () {
							var v, cm = this, $elem = $(getIdSel(cm.name), (cm.frozen === true && p.frozenColumns === true) ? grid.fhDiv : grid.hDiv),
								isSindleSelect, searchoptions = cm.searchoptions || {};
							if (searchoptions.defaultValue !== undefined) { v = searchoptions.defaultValue; }
							nm = cm.index || cm.name;
							switch (cm.stype) {
								case "checkbox":
									// set indeterminate state
									setThreeStateCheckbox($elem, -1);
									break;
								case "select":
									isSindleSelect = $elem.length > 0 ? !$elem[0].multiple : true;
									$elem.find("option").each(function (i) {
										this.selected = i === 0 && isSindleSelect;
										if ($(this).val() === v) {
											this.selected = true;
											return false;
										}
									});
									if (v !== undefined) {
										// post the key and not the text
										sdata[nm] = v;
										j++;
									} else {
										try {
											delete p.postData[nm];
										} catch (ignore) { }
									}
									break;
								case "text":
									$elem.val(v || "");
									if (v !== undefined) {
										sdata[nm] = v;
										j++;
									} else {
										try {
											delete p.postData[nm];
										} catch (ignore) { }
									}
									break;
								case "custom":
									if ($.isFunction(searchoptions.custom_value) && $elem.length > 0 && $elem[0].nodeName.toUpperCase() === "SPAN") {
										if (v === undefined) {
											v = "";
										}
										searchoptions.custom_value.call($t, $elem.children(".customelement").first(), "set", v);
									}
									break;
							}
						});
						var sd = j > 0 ? true : false;
						p.resetsearch = true;
						if (o.stringResult || o.searchOperators || p.datatype === "local") {
							var ruleGroup = '{"groupOp":"' + o.groupOp + '","rules":[';
							var gi = 0;
							$.each(sdata, function (i, n) {
								if (gi > 0) { ruleGroup += ","; }
								ruleGroup += '{"field":"' + i + '",';
								ruleGroup += '"op":"' + "eq" + '",';
								n += "";
								ruleGroup += '"data":"' + n.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
								gi++;
							});
							ruleGroup += "]}";
							p.postData[o.sFilter] = ruleGroup;
							$.each([o.sField, o.sValue, o.sOper], function (i, n) {
								if (p.postData.hasOwnProperty(n)) { delete p.postData[n]; }
							});
						} else {
							$.extend(p.postData, sdata);
						}
						var saveurl;
						if (p.searchurl) {
							saveurl = p.url;
							$self.jqGrid("setGridParam", { url: p.searchurl });
						}
						var bcv = $self.triggerHandler("jqGridToolbarBeforeClear") === "stop" ? true : false;
						if (!bcv && $.isFunction(o.beforeClear)) { bcv = o.beforeClear.call($t); }
						if (!bcv) {
							if (trigger) {
								$self.jqGrid("setGridParam", { search: sd })
									.trigger("reloadGrid", [$.extend({ page: 1 }, o.reloadGridResetOptions || {})]);
							}
						}
						if (saveurl) { $self.jqGrid("setGridParam", { url: saveurl }); }
						$self.triggerHandler("jqGridToolbarAfterClear");
						if ($.isFunction(o.afterClear)) { o.afterClear.call($t); }
					},
					toggleToolbar = function () {
						var trow = $("tr.ui-search-toolbar", grid.hDiv),
							trow2 = p.frozenColumns === true ? $("tr.ui-search-toolbar", grid.fhDiv) : false;
						if (trow.css("display") === "none") {
							trow.show();
							if (trow2) {
								trow2.show();
							}
						} else {
							trow.hide();
							if (trow2) {
								trow2.hide();
							}
						}
						if (p.frozenColumns === true) {
							$self.jqGrid("destroyFrozenColumns");
							$self.jqGrid("setFrozenColumns");
						}
					},
					odata = getRes("search.odata") || [],
					customSortOperations = p.customSortOperations,
					buildRuleMenu = function (elem, left, top) {
						$("#sopt_menu").remove();

						left = parseInt(left, 10);
						top = parseInt(top, 10) + 18;

						var selclass, ina, i = 0, aoprs = [], selected = $(elem).data("soper"), nm = $(elem).data("colname"),
							fs = $(".ui-jqgrid-view").css("font-size") || "11px",
							str = "<ul id='sopt_menu' class='" +
									getGuiStyles.call($t, "searchToolbar.menu", "ui-search-menu") +
									"' role='menu' tabindex='0' style='z-index:9999;display:block;font-size:" + fs + ";left:" + left + "px;top:" + top + "px;'>";
						i = p.iColByName[nm];
						if (i === undefined) { return; }
						var cm = colModel[i], options = $.extend({}, cm.searchoptions), odataItem, item, itemOper, itemOperand, itemText;
						if (!options.sopt) {
							options.sopt = [];
							options.sopt[0] = (cm.stype === "select" || cm.stype === "checkbox") ? "eq" : o.defaultSearch;
						}
						$.each(odata, function () { aoprs.push(this.oper); });
						// append aoprs array with custom operations defined in customSortOperations parameter jqGrid
						if (customSortOperations != null) {
							$.each(customSortOperations, function (propertyName) { aoprs.push(propertyName); });
						}
						for (i = 0; i < options.sopt.length; i++) {
							itemOper = options.sopt[i];
							ina = $.inArray(itemOper, aoprs);
							if (ina !== -1) {
								odataItem = odata[ina];
								if (odataItem !== undefined) {
									// standard operation
									itemOperand = o.operands[itemOper];
									itemText = odataItem.text;
								} else if (customSortOperations != null) {
									// custom operation
									item = customSortOperations[itemOper];
									itemOperand = item.operand;
									itemText = item.text;
								}
								selclass = selected === itemOper ? highlightClass : "";
								str += '<li class="ui-menu-item ' + selclass + '" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="' + htmlEncode(itemOper) + '" data-oper="' + htmlEncode(itemOperand) + '"><table><tr><td style="width:25px">' + htmlEncode(itemOperand) + '</td><td>' + htmlEncode(itemText) + '</td></tr></table></a></li>';
							}
						}
						str += "</ul>";
						$("body").append(str);
						$("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all");
						$("#sopt_menu > li > a").hover(
							function () { $(this).addClass(hoverClasses); },
							function () { $(this).removeClass(hoverClasses); }
						).click(function () {
							var v = $(this).attr("value"),
								oper = $(this).data("oper");
							$self.triggerHandler("jqGridToolbarSelectOper", [v, oper, elem]);
							$("#sopt_menu").hide();
							$(elem).data("soper", v).text(oper);
							if (o.autosearch === true) {
								var inpelm = $(elem).parent().next().children()[0];
								if ($(inpelm).val() || v === "nu" || v === "nn" || $.inArray(v, p.customUnaryOperations) >= 0) {
									triggerToolbar();
								}
							}
						});
					},
					timeoutHnd,
					bindings = [],
					$tr = $("<tr></tr>", { "class": "ui-search-toolbar", role: "row form" });

				if (o.loadFilterDefaults) {
					currentFilters = parseFilter() || {};
				}
				// create the row
				$.each(colModel, function (ci) {
					var cm = this, soptions, mode = "filter", surl, sot, so, i, searchoptions = cm.searchoptions || {}, editoptions = cm.editoptions || {},
						$th = $("<th></th>", {
							"class": getGuiStyles.call($t, "colHeaders", "ui-th-column ui-th-" + p.direction + " " + (o.applyLabelClasses ? cm.labelClasses || "" : "")),
							role: "gridcell",
							"aria-describedby": p.id + "_" + cm.name
						}),
						$thd = $("<div></div>"), elem, $elem,
						$stable = $("<table class='ui-search-table'><tbody><tr><td class='ui-search-oper'></td><td class='ui-search-input'></td><td class='ui-search-clear' style='width:1px'></td></tr></tbody></table>"),
						$tds = $stable.children("tbody").children("tr").children("td"),
						$tdOper = $tds.eq(0),
						$tdInput = $tds.eq(1),
						$tdClear = $tds.eq(2);
					if (this.hidden === true) { $th.css("display", "none"); }
					this.search = this.search === false ? false : true;
					if (this.stype === undefined) { this.stype = "text"; }
					soptions = $.extend({ mode: mode, name: cm.name, cm: cm, iCol: ci, id: getId(cm.name) }, searchoptions);
					if (this.search) {
						if (o.searchOperators) {
							if (p.search && currentFilters[this.name] != null) {
								so = currentFilters[this.name].op;
							} else {
								so = (soptions.sopt) ? soptions.sopt[0] : (cm.stype === "select" || cm.stype === "checkbox") ? "eq" : o.defaultSearch;
							}
							for (i = 0; i < odata.length; i++) {
								if (odata[i].oper === so) {
									sot = o.operands[so] || "";
									break;
								}
							}
							if (sot === undefined && customSortOperations != null) {
								var customOp;
								for (customOp in customSortOperations) {
									if (customSortOperations.hasOwnProperty(customOp) && customOp === so) {
										sot = customSortOperations[customOp].operand;
										break;
										//soptions.searchtitle = customSortOperations[customOp].title;
									}
								}
							}
							if (sot === undefined) { sot = "="; }
							$tdOper.append("<a title='" +
								(soptions.searchtitle != null ? soptions.searchtitle : getRes("search.operandTitle")) +
								"' data-soper='" + so + "' class='" +
								getGuiStyles.call($t, "searchToolbar.operButton", "soptclass") +
								"' data-colname='" + this.name + "'>" + sot + "</a>");
						}
						$tdOper.data("colindex", ci);
						if (soptions.sopt == null || soptions.sopt.length === 1) {
							$tdOper.hide();
						}
						if (p.search && currentFilters[this.name] != null) {
							soptions.defaultValue = currentFilters[this.name].data;
						}
						if (soptions.clearSearch === undefined) {
							soptions.clearSearch = this.stype === "text" ? true : false;
						}
						if (soptions.clearSearch) {
							var csv = $.isFunction(o.resetTitle) ?
									o.resetTitle.call($t, {
										options: o,
										cm: cm,
										cmName: cm.name,
										iCol: ci
									}) :
									(getRes("search.resetTitle") || "Clear Search Value") + " " + jgrid.stripHtml(p.colNames[ci]);
							$tdClear.append("<a title='" + csv + "' aria-label='" + csv + "' class='" +
									getGuiStyles.call($t, "searchToolbar.clearButton", "clearsearchclass") +
									"'><span>" + o.resetIcon + "</span></a>");
						} else {
							$tdClear.hide();
						}
						$thd.append($stable);
						switch (this.stype) {
							case "checkbox":
								var state = soptions.defaultValue !== undefined ? soptions.defaultValue : "-1";
								$elem = $("<input role='search' type='checkbox' class='" + dataFieldClass +
									"' name='" + (cm.index || cm.name) +
									"' id='" + getId(cm.name) +
									"' aria-labelledby='" + "jqgh_" + p.id + "_" + cm.name +
									"' data-state='" + state + "'/>");
								if (state === "-1") {
									$elem.prop("indeterminate", true);
								} else if (state === "1") {
									$elem.prop("checked", true);
								}
								$elem.click(function () {
									var $checkbox = $(this);
									switch ($checkbox.data("state")) {
										case -1: // has indeterminate state
											// make checked
											setThreeStateCheckbox($checkbox, 1);
											break;
										case 0: // is unchecked
											// set indeterminate state
											setThreeStateCheckbox($checkbox, -1);
											break;
										default: // is checked
											// make unchecked
											setThreeStateCheckbox($checkbox, 0);
											break;
									}
									if (o.autosearch === true) {
										triggerToolbar();
									}
								});
								$tdInput.append($elem);
								if (soptions.attr) { $elem.attr(soptions.attr); }
								bindings.push({ elem: $elem[0], options: soptions });								break;
							case "select":
								surl = this.surl || soptions.dataUrl;
								if (surl) {
									// data returned should have already constructed html select
									// primitive jQuery load
									$.ajax($.extend({
										url: surl,
										context: { $tdInput: $tdInput, options: soptions, cm: cm, iCol: ci },
										dataType: "html",
										success: function (data, textStatus, jqXHR) {
											var cm1 = this.cm, iCol1 = this.iCol, soptions1 = this.options, d, ov1,
												$td = this.$tdInput, $select;
											if (soptions1.buildSelect !== undefined) {
												d = soptions1.buildSelect.call($t, data, jqXHR, cm1, iCol1);
												if (d) {
													$td.append(d);
												}
											} else {
												$td.append(data);
											}
											$select = $td.children("select");
											$select.attr({ name: cm1.index || cm1.name, id: getId(cm1.name) });
											if (soptions1.attr) { $select.attr(soptions1.attr); }
											$select.addClass(dataFieldClass);
											$select.css({ width: "100%" });
											if ($select.find("option[value='']").length === 0 && typeof soptions.noFilterText === "string") {
												ov1 = document.createElement("option");
												ov1.value = "";
												ov1.innerHTML = soptions.noFilterText;
												$select.prepend(ov1);
												if ($($select[0].options[$select[0].selectedIndex]).attr("selected") == null && !$select[0].multiple) {
													$select[0].selectedIndex = 0;
												}
											}
											if ($select[0].multiple && $select.find("option[selected]").length === 0 && $select[0].selectedIndex !== -1) {
												// It can be that multiselect (select with multiple attribute) will be returned from surl
												// or build with respect of buildSelect WITHOUT having multiple attribute
												// (just as <select>...</select> instead of <select multiple="multiple">...</select>)
												// and the multiple attribute will be assigned via soptions.attr (attr: { multiple: "multiple" }).
												// One will have non-multiple select initially, where the first element will be automatically selected.
												// After assigning the attribute multiple="multiple" the select will be able to have no selected elements,
												// but it will be too late. To fix the case we will unselect the first element in the special case.
												$select[0].options[$select[0].selectedIndex].selected = false;
											}

											if (soptions1.defaultValue !== undefined) { $select.val(soptions1.defaultValue); }
											// preserve autoserch
											jgrid.bindEv.call($t, $select[0], soptions1);
											jgrid.fullBoolFeedback.call($t, soptions1.selectFilled, "jqGridSelectFilled", {
												elem: $select[0],
												options: soptions1,
												cm: cm1,
												cmName: cm1.name,
												iCol: iCol1,
												mode: mode
											});
											if (o.autosearch === true) {
												$select.change(function () {
													triggerToolbar();
													return false;
												});
											}
										}
									}, jgrid.ajaxOptions, p.ajaxSelectOptions || {}));
								} else {
									var oSv, sep, delim;
									if (cm.searchoptions) {
										oSv = searchoptions.value === undefined ? editoptions.value || "" : searchoptions.value;
										sep = searchoptions.separator === undefined ? editoptions.separator || ":" : searchoptions.separator;
										delim = searchoptions.delimiter === undefined ? editoptions.delimiter || ";" : searchoptions.delimiter;
									} else if (cm.editoptions) {
										oSv = editoptions.value === undefined ? "" : editoptions.value;
										sep = editoptions.separator === undefined ? ":" : editoptions.separator;
										delim = editoptions.delimiter === undefined ? ";" : editoptions.delimiter;
									}
									if (searchoptions.generateValue && p.indexByColumnData[cm.name] != null) {
										oSv = $t.generateValueFromColumnIndex(cm.name, sep, delim);
									}
									if (oSv) {
										elem = document.createElement("select");
										elem.style.width = "100%";
										$elem = $(elem).attr({
											name: cm.index || cm.name,
											role: "search",
											id: getId(cm.name),
											"aria-describedby": p.id + "_" + cm.name
										});
										if (soptions.attr) { $elem.attr(soptions.attr); }
										var isNoFilterValueExist = jgrid.fillSelectOptions(
												elem,
												oSv,
												sep,
												delim,
												soptions.attr != null && soptions.attr.multiple
											);
										if (!isNoFilterValueExist && typeof soptions.noFilterText === "string") {
											var ov = document.createElement("option");
											ov.value = "";
											ov.innerHTML = soptions.noFilterText;
											ov.selected = true;
											$elem.prepend(ov);
										}
										if (soptions.defaultValue !== undefined) { $elem.val(soptions.defaultValue); }
										$elem.addClass(dataFieldClass);
										//bindEv.call($t, elem, soptions);
										bindings.push({ elem: elem, options: soptions });
										$tdInput.append(elem);
										jgrid.fullBoolFeedback.call($t, soptions.selectFilled, "jqGridSelectFilled", {
											elem: elem,
											options: cm.searchoptions || editoptions,
											cm: cm,
											cmName: cm.name,
											iCol: ci,
											mode: mode
										});
										if (o.autosearch === true) {
											$elem.change(function () {
												triggerToolbar();
												return false;
											});
										}
									}
								}
								break;
							case "text":
								$elem = $("<input role='search' type='text' class='" + dataFieldClass +
									"' name='" + (cm.index || cm.name) +
									"' id='" + getId(cm.name) +
									"' aria-labelledby='" + "jqgh_" + p.id + "_" + cm.name +
									"' value='" + (soptions.defaultValue !== undefined ? soptions.defaultValue : "") + "'/>");

								$tdInput.append($elem);
								if (cm.createColumnIndex && soptions.generateDatalist) {
									var dataListId = "dl_" + getId(cm.name),
										$datalist = $self.jqGrid("generateDatalistFromColumnIndex", cm.name);
									if ($datalist != null && $datalist.length > 0) {
										$elem.attr("list", dataListId);
										$tdInput.append($datalist.attr("id", dataListId));
									}
								}
								if (soptions.attr) { $elem.attr(soptions.attr); }
								bindings.push({ elem: $elem[0], options: soptions });
								if (o.autosearch === true) {
									if (o.searchOnEnter) {
										$elem.keypress(function (e) {
											var key1 = e.charCode || e.keyCode || 0;
											if (key1 === 13) {
												triggerToolbar();
												return false;
											}
											return this;
										});
									} else {
										$elem.keydown(function (e) {
											var key1 = e.which;
											switch (key1) {
												case 13:
													return false;
												case 9:
												case 16:
												case 37:
												case 38:
												case 39:
												case 40:
												case 27:
													break;
												default:
													if (timeoutHnd) { clearTimeout(timeoutHnd); }
													timeoutHnd = setTimeout(function () { triggerToolbar(); }, o.autosearchDelay);
											}
										});
									}
								}
								break;
							case "custom":
								$tdInput.append("<span style='width:100%;padding:0;box-sizing:border-box;' name='" + (cm.index || cm.name) + "' id='" + getId(cm.name) + "'/>");
								try {
									if ($.isFunction(soptions.custom_element)) {
										var celm = soptions.custom_element.call($t, soptions.defaultValue !== undefined ? soptions.defaultValue : "", soptions);
										if (celm) {
											celm = $(celm).addClass("customelement");
											$thd.find("span[name='" + (cm.index || cm.name) + "']").append(celm);
										} else {
											throw "e2";
										}
									} else {
										throw "e1";
									}
								} catch (ex) {
									if (ex === "e1") {
										infoDialog.call($t, errcap, "function 'custom_element' " + editMsg.nodefined, bClose);
									}
									if (ex === "e2") {
										infoDialog.call($t, errcap, "function 'custom_element' " + editMsg.novalue, bClose);
									} else {
										infoDialog.call($t, errcap, typeof ex === "string" ? ex : ex.message, bClose);
									}
								}
								break;
						}
					}
					$th.append($thd);
					$th.find(".ui-search-oper .soptclass,.ui-search-clear .clearsearchclass")
						.hover(function () {
							$(this).addClass(hoverClasses);
						}, function () {
							$(this).removeClass(hoverClasses);
						});
					$tr.append($th);
					if (!o.searchOperators) {
						$tdOper.hide();
					}
				});
				$(grid.hDiv).find(">div>.ui-jqgrid-htable>thead").append($tr);
				$.each(bindings, function () {
					jgrid.bindEv.call($t, this.elem, this.options);
				});
				if (o.searchOperators) {
					$(".soptclass", $tr).click(function (e) {
						var offset = $(this).offset(),
							left = (offset.left),
							top = (offset.top);
						buildRuleMenu(this, left, top);
						e.stopPropagation();
					});
					$("body").on("click", function (e) {
						if (e.target.className !== "soptclass") {
							$("#sopt_menu").hide();
						}
					});
				}
				$(".clearsearchclass", $tr).click(function () {
					var $tdOper = $(this).closest(".ui-search-clear"),
						$tdSearchOper = $tdOper.siblings(".ui-search-oper"),
						$oper = $tdSearchOper.children("a"),
						soper = $oper.data("soper"), v, operText,
						coli = parseInt($tdSearchOper.data("colindex"), 10),
						$tdInput = $tdOper.siblings(".ui-search-input"),
						cm = colModel[coli],
						sval = $.extend({}, cm.searchoptions || {}),
						dval = sval.defaultValue || "";
					switch (cm.stype) {
						case "select":
							if (dval) {
								$tdInput.find("select").val(dval);
							} else {
								$tdInput.find("select")[0].selectedIndex = 0;
							}
							break;
						case "checkbox":
							// set indeterminate state
							setThreeStateCheckbox($tdInput.find("input[type=checkbox]"), -1);
							break;
						default:
							$tdInput.find("input").val(dval);
							break;
					}

					if (soper === "nu" || soper === "nn" || $.inArray(soper, p.customUnaryOperations) >= 0) {
						// one need reset an unary operation to default search operation
						v = sval.sopt ?
								sval.sopt[0] :
								(cm.stype === "select" || cm.stype === "checkbox") ?
									"eq" :
									o.defaultSearch;

						operText = customSortOperations != null && customSortOperations[v] != null ?
							customSortOperations[v].operand :
							o.operands[v] || "";

						$oper.data("soper", v).text(operText);
					}

					// ToDo custom search type
					if (o.autosearch === true) {
						triggerToolbar();
					}

				});
				$t.ftoolbar = true;
				$t.triggerToolbar = triggerToolbar;
				$t.clearToolbar = clearToolbar;
				$t.toggleToolbar = toggleToolbar;
				if (p.frozenColumns === true) {
					$self.jqGrid("destroyFrozenColumns");
					$self.jqGrid("setFrozenColumns");
				}
				$self.on(
					"jqGridRefreshFilterValues.filterToolbar" + (o.loadFilterDefaults ? " jqGridAfterLoadComplete.filterToolbar" : ""),
					function () {
						var cmName, filter, newFilters = parseFilter(true) || {}, $input, $searchOper, i, $th, searchoptions;
						if (!o.stringResult && !o.searchOperators && p.datatype !== "local" && p.search) {
							return; // do nothing on legacy searching
						}

						for (cmName in newFilters) {
							if (newFilters.hasOwnProperty(cmName)) {
								filter = newFilters[cmName];
								$input = $(getIdSel(cmName));
								$th = $input.closest("th.ui-th-column");
								if ($input.length > 0 && $th.length > 0) {
									searchoptions = (p.colModel[$th[0].cellIndex] || {}).searchoptions || {};
									if ($input[0].tagName.toUpperCase() === "SELECT" && $input[0].multiple) {
										$input.val(filter.data.split(p.inFilterSeparator || ","));
									} else if ($input.is("input[type=checkbox]")) {
										var onOffValue = getOnOffValue(searchoptions);
										setThreeStateCheckbox(
											$input,
											filter.data === onOffValue.on ?
												1 :
												(filter.data === onOffValue.off ? 0 : -1)
										);
									} else if ($input.find(".customelement").length > 0 && $.isFunction(searchoptions.custom_value)) {
										var oldValue = searchoptions.custom_value.call($t, $input.find(".customelement").first(), "get");
										if (filter.data === "" && searchoptions.defaultValue !== undefined) {
											filter.data = searchoptions.defaultValue;
										}
										if (oldValue === undefined) {
											oldValue = "";
										}
										if (filter.data !== oldValue && String(filter.data) !== String(oldValue)) {
											searchoptions.custom_value.call($t, $input.find(".customelement").first(), "set", filter.data);
										}
									} else {
										if (filter.data === "" && searchoptions.defaultValue !== undefined) {
											filter.data = searchoptions.defaultValue;
										}
										if ($.trim($input.val()) !== String(filter.data)) {
											$input.val(filter.data);
										}
									}
									$searchOper = $input.closest(".ui-search-input")
											.siblings(".ui-search-oper")
											.children(".soptclass");
									$searchOper.data("soper", filter.op);
									$searchOper.text(o.operands[filter.op] || (p.customSortOperations[filter.op] || {}).operand);
								}
							}
						}
						for (i = 0; i < p.colModel.length; i++) {
							cmName = p.colModel[i].name;
							if (!newFilters.hasOwnProperty(cmName)) {
								$(getIdSel(cmName)).val("");
							}
						}
					}
				);
			});
		},
		destroyFilterToolbar: function () {
			return this.each(function () {
				var self = this;
				if (!self.ftoolbar) {
					return;
				}
				self.triggerToolbar = null;
				self.clearToolbar = null;
				self.toggleToolbar = null;
				self.ftoolbar = false;
				$(self.grid.hDiv).find("table thead tr.ui-search-toolbar").remove();
				if (self.p.frozenColumns === true) {
					$(self).jqGrid("destroyFrozenColumns")
						.jqGrid("setFrozenColumns");
				}
			});
		},
		destroyGroupHeader: function (nullHeader) {
			if (nullHeader === undefined) {
				nullHeader = true;
			}
			return this.each(function () {
				var $t = this, i, l, $th, $resizing, grid = $t.grid, cm = $t.p.colModel, hc,
					thead = $("table.ui-jqgrid-htable thead", grid.hDiv);
				if (!grid) { return; }

				$($t).off(".setGroupHeaders");
				var $tr = $("<tr>", { role: "row" }).addClass("ui-jqgrid-labels");
				var headers = grid.headers;
				for (i = 0, l = headers.length; i < l; i++) {
					hc = cm[i].hidden ? "none" : "";
					$th = $(headers[i].el)
						.width(headers[i].width)
						.css("display", hc);
					try {
						$th.removeAttr("rowSpan");
					} catch (rs) {
						//IE 6/7
						$th.attr("rowSpan", 1);
					}
					$tr.append($th);
					$resizing = $th.children("span.ui-jqgrid-resize");
					if ($resizing.length > 0) {// resizable column
						$resizing[0].style.height = "";
					}
					$th.children("div")[0].style.top = "";
				}
				$(thead).children("tr.ui-jqgrid-labels").remove();
				$(thead).prepend($tr);

				if (nullHeader === true) {
					$($t).jqGrid("setGridParam", { "groupHeader": null });
				}
			});
		},
		setGroupHeaders: function (o) {
			o = $.extend({
				useColSpanStyle: false,
				applyLabelClasses: true,
				groupHeaders: []
			}, o || {});
			return this.each(function () {
				this.p.groupHeader = o;
				var ts = this, i, cmi, skip = 0, $tr, $colHeader, th, $th, thStyle, iCol, cghi, numberOfColumns, titleText, cVisibleColumns,
					p = ts.p, colModel = p.colModel, cml = colModel.length, ths = ts.grid.headers, $theadInTable, thClasses,
					$htable = $("table.ui-jqgrid-htable", ts.grid.hDiv), isCellClassHidden = jgrid.isCellClassHidden,
					$trLabels = $htable.children("thead").children("tr.ui-jqgrid-labels"),
					$trLastWithLabels = $trLabels.last().addClass("jqg-second-row-header"),
					$thead = $htable.children("thead"),
					$firstHeaderRow = $htable.find(".jqg-first-row-header");
				if ($firstHeaderRow[0] === undefined) {
					$firstHeaderRow = $("<tr>", { role: "row", "aria-hidden": "true" }).addClass("jqg-first-row-header").css("height", "auto");
				} else {
					$firstHeaderRow.empty();
				}
				var inColumnHeader = function (cmName, columnHeaders) {
					var j;
					for (j = 0; j < columnHeaders.length; j++) {
						if (columnHeaders[j].startColumnName === cmName) {
							return columnHeaders[j];
						}
					}
					return 0; // falsy value
				};

				$(ts).prepend($thead);
				$tr = $("<tr>", { role: "row" }).addClass("ui-jqgrid-labels jqg-third-row-header");
				for (i = 0; i < cml; i++) {
					th = ths[i].el;
					$th = $(th);
					cmi = colModel[i];
					// build the next cell for the first header row
					// ??? cmi.hidden || isCellClassHidden(cmi.classes) || $th.is(":hidden")
					thStyle = { height: "0", width: ths[i].width + "px", display: (cmi.hidden ? "none" : "") };
					$("<th>", { role: "gridcell" }).css(thStyle).addClass("ui-first-th-" + p.direction + (o.applyLabelClasses ? " " + (cmi.labelClasses || "") : "")).appendTo($firstHeaderRow);

					th.style.width = ""; // remove unneeded style
					thClasses = getGuiStyles.call(ts, "colHeaders", "ui-th-column-header ui-th-" + p.direction + " " + (o.applyLabelClasses ? cmi.labelClasses || "" : ""));
					cghi = inColumnHeader(cmi.name, o.groupHeaders);
					if (cghi) {
						numberOfColumns = cghi.numberOfColumns;
						titleText = cghi.titleText;

						// caclulate the number of visible columns from the next numberOfColumns columns
						for (cVisibleColumns = 0, iCol = 0; iCol < numberOfColumns && (i + iCol < cml); iCol++) {
							if (!colModel[i + iCol].hidden && !isCellClassHidden(colModel[i + iCol].classes)) {
								cVisibleColumns++;
							}
						}

						// The next numberOfColumns headers will be moved in the next row
						// in the current row will be placed the new column header with the titleText.
						// The text will be over the cVisibleColumns columns
						$colHeader = $("<th>")
							.addClass(thClasses)
							.html(titleText || "&nbsp;");
						if (cVisibleColumns > 0) {
							$colHeader.attr("colspan", String(cVisibleColumns));
						}
						if (p.headertitles) {
							$colHeader.attr("title", $colHeader.text());
						}
						// hide if not a visible cols
						if (cVisibleColumns === 0) {
							$colHeader.hide();
						}

						$th.before($colHeader); // insert new column header before the current
						$tr.append(th);         // move the current header in the next row

						// set the counter of headers which will be moved in the next row
						skip = numberOfColumns - 1;
					} else {
						if (skip === 0) {
							if (o.useColSpanStyle) {
								// expand the header height to two rows
								$th.attr("rowspan", $trLabels.length + 1); // consider to use ($th.attr("rowspan") || 1) instead of $trLabels.length
							} else {
								$("<th>")
									.addClass(thClasses)
									.css({ "display": cmi.hidden ? "none" : "", "border-top": "0 none" })
									.insertBefore($th);
								$tr.append(th);
							}
						} else {
							// move the header to the next row
							$tr.append(th);
							skip--;
						}
					}
				}
				$theadInTable = $(ts).children("thead");
				$theadInTable.prepend($firstHeaderRow);
				$tr.insertAfter($trLastWithLabels);
				$htable.prepend($theadInTable);

				$(ts).triggerHandler("jqGridAfterSetGroupHeaders");
			});
		},
		getNumberOfFrozenColumns: function () {
			var $t = this;
			if ($t.length === 0) {
				return 0;
			}
			$t = $t[0];
			var colModel = $t.p.colModel, len = colModel.length, maxfrozen = -1, i;
			// get the max index of frozen col
			for (i = 0; i < len; i++) {
				// from left, no breaking frozen
				if (colModel[i].frozen !== true) {
					break;
				}
				maxfrozen = i;
			}
			return maxfrozen + 1;
		},
		setFrozenColumns: function (o) {
			o = o || {};
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, grid = $t.grid;
				if (!grid || p == null || p.frozenColumns === true) { return; }
				var cm = p.colModel, i, len = cm.length, maxfrozen = -1, frozen = false, frozenIds = [], $colHeaderRow,// nonFrozenIds = [],
					tid = jqID(p.id), // one can use p.idSel and remove "#"
					hoverClasses = getGuiStyles.call($t, "states.hover");

				// TODO treeGrid and grouping  Support
				// TODO: allow to edit columns AFTER frozen columns
				if (p.subGrid === true || p.treeGrid === true || p.scroll) {
					return;
				}

				// get the max index of frozen col
				for (i = 0; i < len; i++) {
					// from left, no breaking frozen
					if (cm[i].frozen !== true) {
						break;
						//nonFrozenIds.push("#jqgh_" + tid + "_" + jqID(cm[i].name));
					}
					frozen = true;
					maxfrozen = i;
					frozenIds.push("#jqgh_" + tid + "_" + jqID(cm[i].name));
				}
				if (p.sortable) {
					$colHeaderRow = $(grid.hDiv).find(".ui-jqgrid-htable .ui-jqgrid-labels");
					try {
						$colHeaderRow.sortable("destroy");
					} catch (ignore) { }
					$self.jqGrid("setGridParam", {
						sortable: {
							options: {
								items: frozenIds.length > 0 ?
										">th:not(:has(" + frozenIds.join(",") + "),:hidden)" :
										">th:not(:hidden)"
							}
						}
					});
					$self.jqGrid("sortableColumns", $colHeaderRow);
				}
				if (maxfrozen >= 0 && frozen) {
					var top = p.caption ? $(grid.cDiv).outerHeight() : 0,
						hth = $(".ui-jqgrid-htable", p.gView).height();
					//headers
					if (p.toppager) {
						top = top + $(grid.topDiv).outerHeight();
					}
					if (p.toolbar[0] === true) {
						if (p.toolbar[1] !== "bottom") {
							top = top + $(grid.uDiv).outerHeight();
						}
					}
					grid.fhDiv = $("<div style='position:absolute;overflow:hidden;" +
							(p.direction === "rtl" ? "right:0;border-top-left-radius:0;" : "left:0;border-top-right-radius:0;") +
							"top:" + top + "px;height:" + hth +
							"px;' class='" + getGuiStyles.call($t, "hDiv", "frozen-div ui-jqgrid-hdiv") + "'></div>");
					grid.fbDiv = $("<div style='position:absolute;overflow:hidden;" +
							(p.direction === "rtl" ? "right:0;" : "left:0;") +
							"top:" + (parseInt(top, 10) + parseInt(hth, 10) + 1) +
							"px;overflow:hidden;' class='frozen-bdiv ui-jqgrid-bdiv'></div>");
					$(p.gView).append(grid.fhDiv);
					var htbl = $(".ui-jqgrid-htable", p.gView).clone(true),
						tHeadRows = htbl[0].tHead.rows;
					// groupheader support - only if useColSpanstyle is false
					if (p.groupHeader) {
						// TODO: remove all th which corresponds non-frozen columns. One can identify there by id
						// for example. Consider to use name attribute of th on column headers. It simplifies
						// identifying of the columns.
						$(tHeadRows[0].cells).filter(":gt(" + maxfrozen + ")").remove();
						$(tHeadRows).filter(".jqg-third-row-header").each(function () {
							$(this).children("th[id]")
								.each(function () {
									var id = $(this).attr("id"), colName;
									if (id && id.substr(0, $t.id.length + 1) === $t.id + "_") {
										colName = id.substr($t.id.length + 1);
										if (p.iColByName[colName] > maxfrozen) {
											$(this).remove();
										}
									}
								});
						});
						var swapfroz = -1, fdel = -1, cs, rs;
						// TODO: test carefully processing of hidden columns
						$(tHeadRows).filter(".jqg-second-row-header").children("th").each(function () {
							cs = parseInt($(this).attr("colspan") || 1, 10);
							rs = parseInt($(this).attr("rowspan") || 1, 10);
							if (rs > 1) {
								swapfroz++;
								fdel++;
							} else if (cs) {
								swapfroz = swapfroz + cs;
								fdel++;
							}
							if (swapfroz === maxfrozen) {
								return false;
							}
						});
						if (swapfroz !== maxfrozen) {
							fdel = maxfrozen;
						}
						$(tHeadRows).filter(".jqg-second-row-header,.ui-search-toolbar").each(function () {
							$(this).children(":gt(" + fdel + ")").remove();
						});
					} else {
						$(tHeadRows).each(function () {
							$(this).children(":gt(" + maxfrozen + ")").remove();
						});
					}
					// htable, bdiv and ftable uses table-layout:fixed; style
					// to make it working one have to set ANY width value on table.
					// The value of the width will be ignored, the sum of widths
					// of the first column will be used as the width of tables
					// and all columns will have the same width like the first row.
					// We set below just width=1 of the tables.
					$(htbl).width(1);
					// resizing stuff
					$(grid.fhDiv).append(htbl)
						.scroll(function () {
							// the fhDiv can be scrolled because of tab keyboard navigation
							// we prevent horizontal scrolling of fhDiv
							this.scrollLeft = 0;
						});
					if (p.footerrow) {
						var hbd = $(".ui-jqgrid-bdiv", p.gView).height();

						grid.fsDiv = $("<div style='position:absolute;" + (p.direction === "rtl" ? "right:0;" : "left:0;") + "top:" + (parseInt(top, 10) + parseInt(hth, 10) + parseInt(hbd, 10) + 1) + "px;' class='frozen-sdiv ui-jqgrid-sdiv'></div>");
						$(p.gView).append(grid.fsDiv);
						var ftbl = $(".ui-jqgrid-ftable", p.gView).clone(true);
						$("tr", ftbl).each(function () {
							$("td:gt(" + maxfrozen + ")", this).remove();
						});
						$(ftbl).width(1);
						$(grid.fsDiv).append(ftbl);
					}

					// data stuff
					//TODO support for setRowData
					$(p.gView).append(grid.fbDiv);
					$(grid.bDiv).scroll(function () {
						$(grid.fbDiv).scrollTop($(this).scrollTop());
					});
					$(grid.fbDiv).on("mousewheel.setFrozenColumns DOMMouseScroll.setFrozenColumns", function (e) {
						grid.bDiv.scrollTop += $.isFunction(o.mouseWheel) ?
							o.mouseWheel.call($t, e) :
							e.type === "mousewheel" ?
								-e.originalEvent.wheelDelta / 10 :
								e.originalEvent.detail * 6;
					});
					if (p.hoverrows === true) {
						$(p.idSel).off("mouseover.jqGrid mouseout.jqGrid");
					}
					var safeHeightSet = function ($elem, newHeight) {
							var height = $elem.height();
							if (Math.abs(height - newHeight) >= 1 && newHeight > 0) {
								$elem.height(newHeight);
								height = $elem.height();
								if (Math.abs(newHeight - height) >= 1) {
									$elem.height(newHeight + Math.round((newHeight - height)));
								}
							}
						},
						safeWidthSet = function ($elem, newWidth) {
							var width = $elem.width();
							if (Math.abs(width - newWidth) >= 1) {
								$elem.width(newWidth);
								width = $elem.width();
								if (Math.abs(newWidth - width) >= 1) {
									$elem.width(newWidth + Math.round((newWidth - width)));
								}
							}
						},
						fixDiv = function ($hDiv, hDivBase, iRowStart, iRowEnd) {
							var iRow, n, $frozenRows, $rows, $row, $frozenRow, posFrozenTop, height, newHeightFrozen, td,
								posTop = $(hDivBase).position().top, frozenTableTop, tableTop, cells;
							if ($hDiv != null && $hDiv.length > 0) {
								$hDiv[0].scrollTop = hDivBase.scrollTop;
								$hDiv.css(p.direction === "rtl" ?
									{ top: posTop, right: 0 } :
									{ top: posTop, left: 0 }
								);
								// first try with thead for the hdiv
								$frozenRows = $hDiv.children("table").children("thead").children("tr");
								$rows = $(hDivBase).children("div").children("table").children("thead").children("tr");
								if ($rows.length === 0 && $hDiv.children("table").length > 0) {
									// then use tbody for bdiv
									$frozenRows = $($hDiv.children("table")[0].rows);
									$rows = $($(hDivBase).children("div").children("table")[0].rows);
								}
								n = Math.min($frozenRows.length, $rows.length);
								frozenTableTop = n > 0 ? $($frozenRows[0]).position().top : 0;
								tableTop = n > 0 ? $($rows[0]).position().top : 0; // typically 0
								if (iRowStart >= 0) { // negative iRowStart means no changing of the height of individual rows
									if (iRowEnd >= 0) { // negative iRowEnd means all rows
										n = Math.min(iRowEnd + 1, n);
									}
									for (iRow = iRowStart; iRow < n; iRow++) {
										// but after that one have to verify all scenarios
										$row = $($rows[iRow]);
										if ($row.css("display") !== "none" && $row.is(":visible")) {
											posTop = $row.position().top;
											$frozenRow = $($frozenRows[iRow]);
											posFrozenTop = $frozenRow.position().top;
											height = $row.height();
											if (p.groupHeader != null && p.groupHeader.useColSpanStyle) {
												cells = $row[0].cells;
												for (i = 0; i < cells.length; i++) { // maxfrozen
													td = cells[i];
													if (td != null && td.nodeName.toUpperCase() === "TH") {
														height = Math.max(height, $(td).height());
													}
												}
											}
											newHeightFrozen = height + (posTop - tableTop) + (frozenTableTop - posFrozenTop);
											safeHeightSet($frozenRow, newHeightFrozen);
										}
									}
								}
								safeHeightSet($hDiv, hDivBase.clientHeight);
							}
						},
						/** @const */
						resizeAll = {
							resizeDiv: true,
							resizedRows: {
								iRowStart: 0,
								iRowEnd: -1 // -1 means "till the end"
							}
						},
						/** @const */
						fullResize = {
							header: resizeAll,
							resizeFooter: true,
							body: resizeAll
						};

					$self.on("jqGridAfterGridComplete.setFrozenColumns", function () {
						$(p.idSel + "_frozen").remove();
						$(grid.fbDiv).height(grid.hDiv.clientHeight);
						// clone with data and events !!!
						var $frozenBTable = $(this).clone(true),
							frozenRows = $frozenBTable[0].rows,
							rows = $self[0].rows;
						$(frozenRows).filter("tr[role=row]").each(function () {
							$(this.cells).filter("td[role=gridcell]:gt(" + maxfrozen + ")").remove();
							/*if (this.id) {
								$(this).attr("id", this.id + "_frozen");
							}*/
						});
						grid.fbRows = frozenRows;

						$frozenBTable.width(1).attr("id", p.id + "_frozen");
						$frozenBTable.appendTo(grid.fbDiv);
						if (p.hoverrows === true) {
							var hoverRows = function (tr, method, additionalRows) {
									$(tr)[method](hoverClasses);
									$(additionalRows[tr.rowIndex])[method](hoverClasses);
								};
							$(frozenRows).filter(".jqgrow").hover(
								function () {
									hoverRows(this, "addClass", rows);
								},
								function () {
									hoverRows(this, "removeClass", rows);
								}
							);
							$(rows).filter(".jqgrow").hover(
								function () {
									hoverRows(this, "addClass", frozenRows);
								},
								function () {
									hoverRows(this, "removeClass", frozenRows);
								}
							);
						}
						fixDiv(grid.fhDiv, grid.hDiv, 0, -1);
						fixDiv(grid.fbDiv, grid.bDiv, 0, -1);
						if (grid.sDiv) { fixDiv(grid.fsDiv, grid.sDiv, 0, -1); }
					});
					var myResize = function (resizeOptions) {
							$(grid.fbDiv).scrollTop($(grid.bDiv).scrollTop());
							// TODO: the width of all column headers can be changed
							// so one should recalculate frozenWidth in other way.
							if (resizeOptions.header.resizeDiv) {
								fixDiv(grid.fhDiv, grid.hDiv, resizeOptions.header.resizedRows.iRowStart, resizeOptions.header.resizedRows.iRowEnd);
							}
							if (resizeOptions.body.resizeDiv) {
								fixDiv(grid.fbDiv, grid.bDiv, resizeOptions.body.resizedRows.iRowStart, resizeOptions.body.resizedRows.iRowEnd);
							}
							if (resizeOptions.resizeFooter && grid.sDiv && resizeOptions.resizeFooter) {
								fixDiv(grid.fsDiv, grid.sDiv, 0, -1);
							}
							var frozenWidth = grid.fhDiv[0].clientWidth;
							if (resizeOptions.header.resizeDiv && grid.fhDiv != null && grid.fhDiv.length >= 1) {
								safeHeightSet($(grid.fhDiv), grid.hDiv.clientHeight);
							}
							if (resizeOptions.body.resizeDiv && grid.fbDiv != null && grid.fbDiv.length > 0) {
								safeWidthSet($(grid.fbDiv), frozenWidth);
							}
							if (resizeOptions.resizeFooter && grid.fsDiv != null && grid.fsDiv.length >= 0) {
								safeWidthSet($(grid.fsDiv), frozenWidth);
							}
						};
					$(p.gBox).on("resizestop.setFrozenColumns", function () {
						setTimeout(function () {
							myResize(fullResize);
						}, 50);
					});
					$self.on("jqGridInlineEditRow.setFrozenColumns jqGridInlineAfterRestoreRow.setFrozenColumns jqGridInlineAfterSaveRow.setFrozenColumns jqGridAfterEditCell.setFrozenColumns jqGridAfterRestoreCell.setFrozenColumns jqGridAfterSaveCell.setFrozenColumns jqGridResizeStop.setFrozenColumns", function (e, rowid) {
						// TODO: probably one should handle additional events like afterSetRow
						// and remove jqGridInlineAfterSaveRow and jqGridInlineAfterRestoreRow
						var iRow = $self.jqGrid("getInd", rowid);
						myResize({
							header: {
								resizeDiv: false,  // don't recalculate the position and the height of hDiv
								resizedRows: {
									iRowStart: -1, // -1 means don't recalculate heights or rows
									iRowEnd: -1
								}
							},
							resizeFooter: true,    // recalculate the position and the height of sDiv
							body: {
								resizeDiv: true,   // recalculate the position and the height of bDiv
								resizedRows: {
									// recalculate the height of only one row inside of bDiv
									iRowStart: iRow,
									iRowEnd: iRow
								}
							}
						});
					});
					$self.on("jqGridResizeStop.setFrozenColumns", function () {
						myResize(fullResize);
					});
					$self.on("jqGridResetFrozenHeights.setFrozenColumns", function (e, o) {
						myResize(o || fullResize);
					});
					if (!grid.hDiv.loading) {
						setTimeout(function () {
							$self.triggerHandler("jqGridAfterGridComplete");
						}, 0);
					}
					p.frozenColumns = true;
				}
			});
		},
		destroyFrozenColumns: function () {
			return this.each(function () {
				var $t = this, $self = $($t), grid = $t.grid, p = $t.p, tid = jqID(p.id);
				if (!grid) { return; }
				if (p.frozenColumns === true) {
					$(grid.fhDiv).remove();
					$(grid.fbDiv).off(".setFrozenColumns");
					$(grid.fbDiv).remove();
					grid.fhDiv = null;
					grid.fbDiv = null;
					grid.fbRows = null;
					if (p.footerrow) {
						$(grid.fsDiv).remove();
						grid.fsDiv = null;
					}
					$self.off(".setFrozenColumns");
					if (p.hoverrows === true) {
						var ptr, hoverClasses = getGuiStyles.call($t, "states.hover");
						$self.on("mouseover.jqGrid", function (e) {
							ptr = $(e.target).closest("tr.jqgrow");
							if ($(ptr).attr("class") !== "ui-subgrid") {
								$(ptr).addClass(hoverClasses);
							}
						}).on("mouseout.jqGrid", function (e) {
							ptr = $(e.target).closest("tr.jqgrow");
							$(ptr).removeClass(hoverClasses);
						});
					}
					p.frozenColumns = false;
					if (p.sortable) {
						var $colHeaderRow = $(grid.hDiv).find(".ui-jqgrid-htable .ui-jqgrid-labels");
						$colHeaderRow.sortable("destroy");
						$self.jqGrid("setGridParam", {
							sortable: {
								options: {
									items: ">th:not(:has(#jqgh_" + tid + "_cb" + ",#jqgh_" + tid + "_rn" + ",#jqgh_" + tid + "_subgrid),:hidden)"
								}
							}
						});
						$self.jqGrid("sortableColumns", $colHeaderRow);
					}
				}
			});
		}
	});
	// end module grid.custom
}));
