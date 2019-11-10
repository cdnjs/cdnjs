/**
 * jqGrid extension for SubGrid Data
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/

/*jshint eqeqeq:false */
/*global jQuery, define */
/*jslint eqeq: true, nomen: true, plusplus: true, unparam: true, white: true */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "./grid.base"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	var jgrid = $.jgrid, jqID = jgrid.jqID, base = $.fn.jqGrid;
	// begin module grid.subgrid
	var subGridFeedback = function () {
			var args = $.makeArray(arguments);
			args[0] = "subGrid" + args[0].charAt(0).toUpperCase() + args[0].substring(1);
			args.unshift("");
			args.unshift("");
			args.unshift(this.p);
			return jgrid.feedback.apply(this, args);
		},
		collapseOrExpand = function (rowid, className) {
			return this.each(function () {
				if (this.grid && rowid != null && this.p.subGrid === true) {
					var tr = $(this).jqGrid("getInd", rowid, true);
					$(tr).find(">td." + className).trigger("click");
				}
			});
		};
	jgrid.extend({
		setSubGrid: function () {
			return this.each(function () {
				var p = this.p, cm = p.subGridModel[0], i;
				p.subGridOptions = $.extend({
					expandOnLoad: false,
					delayOnLoad: 50,
					selectOnExpand: false,
					selectOnCollapse: false,
					reloadOnExpand: true
				}, p.subGridOptions || {});
				p.colNames.unshift("");
				p.colModel.unshift({
					name: "subgrid",
					width: jgrid.cell_width ? p.subGridWidth + p.cellLayout : p.subGridWidth,
					labelClasses: "jqgh_subgrid",
					sortable: false,
					resizable: false,
					hidedlg: true,
					search: false,
					fixed: true,
					frozen: true
				});
				if (cm) {
					cm.align = $.extend([], cm.align || []);
					for (i = 0; i < cm.name.length; i++) {
						cm.align[i] = cm.align[i] || "left";
					}
				}
			});
		},
		addSubGridCell: function (pos, iRow, rowid, item) {
			var self = this[0], subGridOptions = self.p.subGridOptions,
				hasSubgrid = $.isFunction(subGridOptions.hasSubgrid) ?
					subGridOptions.hasSubgrid.call(self, { rowid: rowid, iRow: iRow, iCol: pos, data: item }) :
					true;
			return self == null || self.p == null || subGridOptions == null ? "" :
					"<td role='gridcell' class='" + base.getGuiStyles.call(this, "subgrid.tdStart", hasSubgrid ? "ui-sgcollapsed sgcollapsed" : "") + "' " +
					self.formatCol(pos, iRow) + ">" +
					(hasSubgrid ? "<div class='" + base.getGuiStyles.call(this, "subgrid.buttonDiv", "sgbutton-div") +
						"'><a role='button' class='" + base.getGuiStyles.call(this, "subgrid.button", "sgbutton") +
						"'><span class='" + jgrid.mergeCssClasses(subGridOptions.commonIconClass, subGridOptions.plusicon) + "'></span></a></div>" : "&nbsp;") +
					"</td>";
		},
		addSubGrid: function (pos, sind) {
			return this.each(function () {
				var ts = this, p = ts.p, cm = p.subGridModel[0],
					getSubgridStyle = function (name, calsses) {
						return base.getGuiStyles.call(ts, "subgrid." + name, calsses || "");
					},
					thSubgridClasses = getSubgridStyle("thSubgrid", "ui-th-subgrid ui-th-column ui-th-" + p.direction),
					rowSubTableClasses = getSubgridStyle("rowSubTable", "ui-subtblcell"),
					rowClasses = getSubgridStyle("row", "ui-subgrid ui-row-" + p.direction),
					tdWithIconClasses = getSubgridStyle("tdWithIcon", "subgrid-cell"),
					tdDataClasses = getSubgridStyle("tdData", "subgrid-data"),
					subGridCell = function ($tr, cell, pos1) {
						var align = cm.align[pos1],
							$td = $("<td" +
								(align ? " style='text-align:" + align + ";'" : "") +
								"></td>").html(cell);
						$tr.append($td);
					},
					fillXmlBody = function (data, $tbody) {
						var sgmap = p.xmlReader.subgrid;
						$(sgmap.root + " " + sgmap.row, data).each(function () {
							var f, i, $tr = $("<tr class='" + rowSubTableClasses + "'></tr>");
							if (sgmap.repeatitems === true) {
								$(sgmap.cell, this).each(function (j) {
									subGridCell($tr, $(this).text() || "&#160;", j);
								});
							} else {
								f = cm.mapping || cm.name;
								if (f) {
									for (i = 0; i < f.length; i++) {
										subGridCell($tr, $(f[i], this).text() || "&#160;", i);
									}
								}
							}
							$tbody.append($tr);
						});
					},
					fillJsonBody = function (data, $tbody) {
						var $tr, i, j, f, cur, sgmap = p.jsonReader.subgrid,
							result = jgrid.getAccessor(data, sgmap.root);
						if (result != null) {
							for (i = 0; i < result.length; i++) {
								cur = result[i];
								$tr = $("<tr class='" + rowSubTableClasses + "'></tr>");
								if (sgmap.repeatitems === true) {
									if (sgmap.cell) {
										cur = cur[sgmap.cell];
									}
									for (j = 0; j < cur.length; j++) {
										subGridCell($tr, cur[j] || "&#160;", j);
									}
								} else {
									f = cm.mapping || cm.name;
									if (f.length) {
										for (j = 0; j < f.length; j++) {
											subGridCell($tr, cur[f[j]] || "&#160;", j);
										}
									}
								}
								$tbody.append($tr);
							}
						}
					},
					subGridXmlOrJson = function (sjxml, sbid, fullBody) {
						var $th, i,	subgridTableClasses = getSubgridStyle("legacyTable", "ui-jqgrid-legacy-subgrid" +
								(p.altRows === true && $(ts).jqGrid("isBootstrapGuiStyle") ? " table-striped" : "")),
							$table = $("<table" +
								(subgridTableClasses ? " class='" + subgridTableClasses + "'" : "") +
								"><thead></thead><tbody></tbody></table>"),
							$tr = $("<tr></tr>");
						for (i = 0; i < cm.name.length; i++) {
							$th = $("<th class='" + thSubgridClasses + "'></th>")
									.html(cm.name[i])
									.width(cm.width[i]);
							$tr.append($th);
						}
						$tr.appendTo($table[0].tHead);
						fullBody(sjxml, $($table[0].tBodies[0]));
						$("#" + jqID(p.id + "_" + sbid)).append($table);
						ts.grid.hDiv.loading = false;
						$("#load_" + jqID(p.id)).hide();
						return false;
					},
					populatesubgrid = function (rd) {
						var sid = $(rd).attr("id"), dp = { nd_: (new Date().getTime()) }, iCol, j;
						dp[p.prmNames.subgridid] = sid;
						if (!cm) {
							return false;
						}
						if (cm.params) {
							for (j = 0; j < cm.params.length; j++) {
								iCol = p.iColByName[cm.params[j]];
								if (iCol !== undefined) {
									dp[p.colModel[iCol].name] = $(rd.cells[iCol]).text().replace(/\&#160\;/ig, "");
								}
							}
						}
						if (!ts.grid.hDiv.loading) {
							ts.grid.hDiv.loading = true;
							$("#load_" + jqID(p.id)).show();
							if (!p.subgridtype) {
								p.subgridtype = p.datatype;
							}
							if ($.isFunction(p.subgridtype)) {
								p.subgridtype.call(ts, dp);
							} else {
								p.subgridtype = p.subgridtype.toLowerCase();
							}
							switch (p.subgridtype) {
								case "xml":
								case "json":
									$.ajax($.extend({
										type: p.mtype,
										url: $.isFunction(p.subGridUrl) ? p.subGridUrl.call(ts, dp) : p.subGridUrl,
										dataType: p.subgridtype,
										context: sid,
										data: jgrid.serializeFeedback.call(ts, p.serializeSubGridData, "jqGridSerializeSubGridData", dp),
										success: function (data) {
											$(ts.grid.eDiv).hide();
											subGridXmlOrJson(
												data,
												this,
												p.subgridtype === "xml" ? fillXmlBody : fillJsonBody
											);
										},
										error: function (jqXHR, textStatus, errorThrown) {
											var loadError = p.loadSubgridError === undefined ?
													p.loadError :
													p.loadSubgridError;
											if ($.isFunction(loadError)) {
												loadError.call(ts, jqXHR, textStatus, errorThrown);
											}
											// for compatibility only
											if (!p.subGridOptions.noEmptySubgridOnError) {
												subGridXmlOrJson(
													null,
													this,
													p.subgridtype === "xml" ? fillXmlBody : fillJsonBody
												);
											} else {
												ts.grid.hDiv.loading = false;
												$("#load_" + jqID(p.id)).hide();
											}
										}
									}, jgrid.ajaxOptions, p.ajaxSubgridOptions || {}));
									break;
							}
						}
						return false;
					},
					onClick = function () {
						var tr = $(this).parent("tr")[0], r = tr.nextSibling, rowid = tr.id, subgridDivId = p.id + "_" + rowid, atd,
							iconClass = function (iconName) {
								return jgrid.mergeCssClasses(p.subGridOptions.commonIconClass, p.subGridOptions[iconName]);
							},
							nhc = 1;
						$.each(p.colModel, function () {
							if (this.hidden === true || this.name === "rn" || this.name === "cb") {
								// ??? probably one should don't calculate hidden columns of subgrid?
								// (remove this.hidden === true part from the if) ???
								nhc++;
							}
						});
						if ($(this).hasClass("sgcollapsed")) {
							if (p.subGridOptions.reloadOnExpand === true || (p.subGridOptions.reloadOnExpand === false && !$(r).hasClass('ui-subgrid'))) {
								atd = pos >= 1 ? "<td colspan='" + pos + "'>&#160;</td>" : "";
								if (!subGridFeedback.call(ts, "beforeExpand", subgridDivId, rowid)) {
									return;
								}
								$(tr).after("<tr role='row' class='" + rowClasses + "'>" + atd + "<td class='" + tdWithIconClasses +
									"'><span class='" + iconClass("openicon") + "'></span></td><td colspan='" + parseInt(p.colNames.length - nhc, 10) +
									"' class='" + tdDataClasses + "'><div id='" + subgridDivId + "' class='tablediv'></div></td></tr>");
								$(ts).triggerHandler("jqGridSubGridRowExpanded", [subgridDivId, rowid]);
								if ($.isFunction(p.subGridRowExpanded)) {
									p.subGridRowExpanded.call(ts, subgridDivId, rowid);
								} else {
									populatesubgrid(tr);
								}
							} else {
								$(r).show();
							}
							$(this).html(
								"<div class='" + base.getGuiStyles.call(ts, "subgrid.buttonDiv", "sgbutton-div") +
								"'><a role='button' class='" + base.getGuiStyles.call(ts, "subgrid.button", "sgbutton") +
								"'><span class='" + iconClass("minusicon") + "'></span></a></div>"
							).removeClass("sgcollapsed").addClass("sgexpanded");
							if (p.subGridOptions.selectOnExpand) {
								$(ts).jqGrid("setSelection", rowid);
							}
						} else if ($(this).hasClass("sgexpanded")) {
							if (!subGridFeedback.call(ts, "beforeCollapse", subgridDivId, rowid)) {
								return;
							}
							if (p.subGridOptions.reloadOnExpand === true) {
								$(r).remove(".ui-subgrid");
							} else if ($(r).hasClass("ui-subgrid")) { // incase of dynamic deleting
								$(r).hide();
							}
							$(this).html(
								"<div class='" + base.getGuiStyles.call(ts, "subgrid.buttonDiv", "sgbutton-div") +
								"'><a role='button' class='" + base.getGuiStyles.call(ts, "subgrid.button", "sgbutton") +
								"'><span class='" + iconClass("plusicon") + "'></span></a></div>"
							).removeClass("sgexpanded").addClass("sgcollapsed");
							if (p.subGridOptions.selectOnCollapse) {
								$(ts).jqGrid("setSelection", rowid);
							}
						}
						return false;
					},
					len,
					tr1,
					$td1,
					iRow = 1;

				if (!ts.grid) {
					return;
				}

				len = ts.rows.length;
				if (sind !== undefined && sind > 0) {
					iRow = sind;
					len = sind + 1;
				}
				while (iRow < len) {
					tr1 = ts.rows[iRow];
					if ($(tr1).hasClass("jqgrow")) {
						$td1 = $(tr1.cells[pos]);
						if ($td1.hasClass("ui-sgcollapsed")) {
							if (p.scroll) {
								$td1.unbind("click");
							}
							$td1.bind("click", onClick);
						}
					}
					iRow++;
				}
				if (p.subGridOptions.expandOnLoad === true) {
					$(ts.rows).filter(".jqgrow").each(function (index, row) {
						$(row.cells[0]).click();
					});
				}
				ts.subGridXml = function (xml, sid) {
					return subGridXmlOrJson(xml, sid, fillXmlBody);
				};
				ts.subGridJson = function (json, sid) {
					return subGridXmlOrJson(json, sid, fillJsonBody);
				};
			});
		},
		expandSubGridRow: function (rowid) {
			return collapseOrExpand.call(this, rowid, "sgcollapsed");
		},
		collapseSubGridRow: function (rowid) {
			return collapseOrExpand.call(this, rowid, "sgexpanded");
		},
		toggleSubGridRow: function (rowid) {
			return collapseOrExpand.call(this, rowid, "ui-sgcollapsed");
		}
	});
	// end module grid.subgrid
}));
