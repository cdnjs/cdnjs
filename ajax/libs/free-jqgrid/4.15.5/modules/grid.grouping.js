/*jshint eqeqeq:false, eqnull:true */
/*global jQuery, define, exports, module, require */
/*jslint plusplus: true, unparam: true, eqeq: true, nomen: true, todo: true, continue: true */
// Grouping module
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.base"
		], factory);
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
			factory($);
			return $;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	var jgrid = $.jgrid, base = $.fn.jqGrid;
	// begin module grid.grouping
	jgrid.extend({
		groupingSetup: function () {
			return this.each(function () {
				var $t = this, i, j, cml, p = $t.p, colModel = p.colModel, grp = p.groupingView, cm, summary,
					emptyFormatter = function () {
						return "";
					};
				if (grp !== null && ((typeof grp === "object") || $.isFunction(grp))) {
					if (!grp.groupField.length) {
						p.grouping = false;
					} else {
						if (grp.visibiltyOnNextGrouping === undefined) {
							grp.visibiltyOnNextGrouping = [];
						}

						grp.lastvalues = [];
						if (!grp._locgr) {
							grp.groups = [];
						}
						grp.counters = [];
						for (i = 0; i < grp.groupField.length; i++) {
							if (!grp.groupOrder[i]) {
								grp.groupOrder[i] = "asc";
							}
							if (!grp.groupText[i]) {
								grp.groupText[i] = "{0}";
							}
							if (typeof grp.groupColumnShow[i] !== "boolean") {
								grp.groupColumnShow[i] = true;
							}
							if (typeof grp.groupSummary[i] !== "boolean") {
								grp.groupSummary[i] = false;
							}
							if (!grp.groupSummaryPos[i]) {
								grp.groupSummaryPos[i] = "footer";
							}
							// TODO: allow groupField be from additionalProperties
							// and not only from colModel
							cm = colModel[p.iColByName[grp.groupField[i]]];
							if (grp.groupColumnShow[i] === true) {
								grp.visibiltyOnNextGrouping[i] = true;
								if (cm != null && cm.hidden === true) {
									base.showCol.call($($t), grp.groupField[i]);
								}
							} else {
								grp.visibiltyOnNextGrouping[i] = $("#" + jgrid.jqID(p.id + "_" + grp.groupField[i])).is(":visible");
								if (cm != null && cm.hidden !== true) {
									base.hideCol.call($($t), grp.groupField[i]);
								}
							}
						}
						grp.summary = [];
						if (grp.hideFirstGroupCol) {
							grp.formatDisplayField[0] = function (v) {
								return v;
							};
						}
						for (j = 0, cml = colModel.length; j < cml; j++) {
							cm = colModel[j];
							if (grp.hideFirstGroupCol) {
								if (!cm.hidden && grp.groupField[0] === cm.name) {
									cm.formatter = emptyFormatter;
								}
							}
							if (cm.summaryType) {
								summary = {
									nm: cm.name,
									st: cm.summaryType,
									v: "",
									sr: cm.summaryRound,
									srt: cm.summaryRoundType || "round"
								};
								if (cm.summaryDivider) {
									summary.sd = cm.summaryDivider;
									summary.vd = "";
								}
								grp.summary.push(summary);
							}
						}
					}
				} else {
					p.grouping = false;
				}
			});
		},
		groupingPrepare: function (record, irow) {
			this.each(function () {
				var $t = this, p = $t.p, grp = p.groupingView, groups = grp.groups, counters = grp.counters,
					lastvalues = grp.lastvalues, isInTheSameGroup = grp.isInTheSameGroup, groupLength = grp.groupField.length,
					i, j, keys, newGroup, counter, fieldName, v, displayName, displayValue, changed = false,
					groupingCalculationsHandler = base.groupingCalculations.handler, key,
					buildSummary = function () {
						var iSummary, summary, st;
						for (iSummary = 0; iSummary < counter.summary.length; iSummary++) {
							summary = counter.summary[iSummary];
							st = $.isArray(summary.st) ? summary.st[newGroup.idx] : summary.st;
							if ($.isFunction(st)) {
								summary.v = st.call($t, summary.v, summary.nm, record, newGroup);
							} else {
								summary.v = groupingCalculationsHandler.call($($t), st, summary.v, summary.nm, summary.sr, summary.srt, record);
								if (st.toLowerCase() === "avg" && summary.sd) {
									summary.vd = groupingCalculationsHandler.call($($t), st, summary.vd, summary.sd, summary.sr, summary.srt, record);
								}
							}
						}
						return counter.summary;
					},
					normilizeValue = function (value, cmOrPropName) {
						if (value == null && grp.useDefaultValuesOnGrouping) {
							var cm = p.iColByName[cmOrPropName] !== undefined ?
									p.colModel[p.iColByName[cmOrPropName]] :
									p.additionalProperties[p.iPropByName[cmOrPropName]],
									defaultValue;

							if (cm != null && cm.formatter != null) {
								if (cm.formatoptions != null && cm.formatoptions.defaultValue !== undefined) {
									value = cm.formatoptions.defaultValue;
								} else if (typeof cm.formatter === "string") {
									defaultValue = $($t).jqGrid("getGridRes", "formatter." + cm.formatter + ".defaultValue");
									if (defaultValue !== undefined) {
										value = defaultValue;
									}
								}
							}
						}
						return value;
					};

				for (i = 0; i < groupLength; i++) {
					fieldName = grp.groupField[i];
					v = normilizeValue(record[fieldName], fieldName);
					key = v;
					displayName = grp.displayField[i];
					displayValue = displayName == null ?
						null :
						normilizeValue(record[displayName], displayName);

					if (displayValue == null) {
						displayValue = v;
					}
					if (v !== undefined) {
						keys = [];
						for (j = 0; j <= i; j++) {
							keys.push(record[grp.groupField[j]]);
						}
						newGroup = {
							idx: i, // index in grp.groupField array
							dataIndex: fieldName,
							value: v,
							displayValue: displayValue,
							startRow: irow,
							cnt: 1,
							keys: keys,
							summary: []
						};
						counter = {
							cnt: 1,
							pos: groups.length,
							summary: $.extend(true, [], grp.summary)
						};
						if (irow === 0) {
							// First record always starts a new group
							groups.push(newGroup);
							lastvalues[i] = v;
							counters[i] = counter;
						} else {
							if (typeof v !== "object" && ($.isArray(isInTheSameGroup) && $.isFunction(isInTheSameGroup[i]) ? !isInTheSameGroup[i].call($t, lastvalues[i], v, i, grp) : lastvalues[i] !== v)) {
								// This record is not in same group as previous one
								groups.push(newGroup);
								lastvalues[i] = v;
								changed = true;
								counters[i] = counter;
							} else {
								if (changed) {
									// This group has changed because an earlier group changed.
									groups.push(newGroup);
									lastvalues[i] = v;
									counters[i] = counter;
								} else {
									counter = counters[i];
									counter.cnt += 1;
									groups[counter.pos].cnt = counter.cnt;
								}
							}
						}
						groups[counter.pos].summary = buildSummary();
						for (j = counter.pos - 1; j >= 0; j--) {
							// find the parent group (the grouping header)
							if (groups[j].idx < groups[counter.pos].idx) {
								groups[counter.pos].parentGroupIndex = j;
								groups[counter.pos].parentGroup = groups[j];
								break;
							}
						}
					}
				}
				//gdata.push( rData );
			});
			return this;
		},
		getGroupHeaderIndex: function (hid, clickedElem) {
			var $self = this, self = $self[0], p = self.p,
				$tr = clickedElem ?
						$(clickedElem).closest("tr.jqgroup") :
						$("#" + jgrid.jqID(hid)),
				groupLevel = parseInt($tr.data("jqgrouplevel"), 10),
				hPrefix = p.id + "ghead_" + groupLevel + "_";
			if (isNaN(groupLevel) || !$tr.hasClass("jqgroup") || hid.length <= hPrefix.length) {
				return -1;
			}
			return parseInt(hid.substring(hPrefix.length), 10);
		},
		groupingToggle: function (hid, clickedElem) {
			this.each(function () {
				var $t = this, p = $t.p, grp = p.groupingView,
					minusClasses = grp.minusicon, plusClasses = grp.plusicon,
					$tr = clickedElem ?
							$(clickedElem).closest("tr.jqgroup") :
							$("#" + jgrid.jqID(hid)),
					getGroupHeaderIcon = function ($trElem) {
						return $trElem.find(">td>span." + "tree-wrap");
					},
					itemGroupingLevel, iRowStart, showDataRowsOnExpending = true,
					$groupIcon, collapsed = false, rowsToHideOrShow = [],
					addToHideOrShow = function ($elem) {
						var i, l = $elem.length;
						for (i = 0; i < l; i++) {
							rowsToHideOrShow.push($elem[i]);
						}
					},
					num = parseInt($tr.data("jqgrouplevel"), 10);

				if (p.frozenColumns && $tr.length > 0) {
					// always get row from non-frozen column
					iRowStart = $tr[0].rowIndex;
					$tr = $($t.rows[iRowStart]);
					$tr = $tr.add($t.grid.fbRows[iRowStart]);
				}
				$groupIcon = getGroupHeaderIcon($tr);

				if (jgrid.hasAllClasses($groupIcon, minusClasses)) {
					$groupIcon.removeClass(minusClasses).addClass(plusClasses);
					collapsed = true;
				} else {
					$groupIcon.removeClass(plusClasses).addClass(minusClasses);
				}
				for ($tr = $tr.next(); $tr.length; $tr = $tr.next()) {
					if ($tr.hasClass("jqfoot")) {
						itemGroupingLevel = parseInt($tr.data("jqfootlevel"), 10);
						if (collapsed) {
							// hide all till the summary row of the same level.
							// don't hide the summary row if grp.showSummaryOnHide === true
							itemGroupingLevel = parseInt($tr.data("jqfootlevel"), 10);
							if ((!grp.showSummaryOnHide && itemGroupingLevel === num) || itemGroupingLevel > num) {
								addToHideOrShow($tr);
							}
							// stop hiding of rows if the footer of parent group are found
							if (itemGroupingLevel < num) { break; }
						} else {
							if (itemGroupingLevel === num || (grp.showSummaryOnHide && itemGroupingLevel === num + 1)) {
								addToHideOrShow($tr);
							}
							if (itemGroupingLevel <= num) { break; }
						}
					} else if ($tr.hasClass("jqgroup")) {
						itemGroupingLevel = parseInt($tr.data("jqgrouplevel"), 10);
						if (collapsed) {
							// stop hiding of rows if the grouping header of the next group
							// of the same (or higher) level are found
							if (itemGroupingLevel <= num) { break; }

							addToHideOrShow($tr);
						} else {
							// stop next grouping header of the same lever are found
							if (itemGroupingLevel <= num) { break; }
							if (itemGroupingLevel === num + 1) {
								// one should display subgroupes in collaped form
								getGroupHeaderIcon($tr).removeClass(minusClasses).addClass(plusClasses);
								addToHideOrShow($tr);
							}
							// one need hide all data if subgroup is found
							showDataRowsOnExpending = false;
						}
					} else { // data
						// we set currently no information about the level of data
						// se we use showDataRowsOnExpending variable which will be
						// used during expanding of data
						if (collapsed || showDataRowsOnExpending) {
							// grouping data need be displayed only
							// if the last level group with data (no subgroups)
							// is expanded
							addToHideOrShow($tr);
						}
					}
				}
				//$(rowsToHideOrShow)[collapsed ? "hide" : "show"]();
				$(rowsToHideOrShow).css("display", collapsed ? "none" : "");
				// fix position of elements of frozen divs
				if (p.frozenColumns) {
					$($t).triggerHandler("jqGridResetFrozenHeights", [{
						header: {
							resizeDiv: false,
							resizedRows: {
								iRowStart: -1, // -1 means don't recalculate heights or rows
								iRowEnd: -1
							}
						},
						resizeFooter: false,
						body: {
							resizeDiv: true,
							resizedRows: {
								iRowStart: iRowStart,
								iRowEnd: ($tr.length ? $tr[0].rowIndex - 1 : -1)
							}
						}
					}]);
				}

				// recalculate the width because vertical scrollbar can
				// appears/disappears after expanding/collapsing
				$t.fixScrollOffsetAndhBoxPadding();
				$($t).triggerHandler("jqGridGroupingClickGroup", [hid, collapsed]);
				if ($.isFunction(p.onClickGroup)) {
					p.onClickGroup.call($t, hid, collapsed);
				}
			});
			return false;
		},
		groupingRender: function (grdata, rn) {
			// input parameter grdata is array of strings, which are either opening <tr> element
			// or full HTML fragment (outer HTML) of <td> element, inclusive the closing tag </td>
			// or it contains the closing </tr> tag. The array grdata contains HTML fragments
			// of all rows from the current group.
			// The exact contain of the grdata is the following:
			//    "<tr ...>" - the opening tag of the first row of the group
			//        "<td>...</td>" - the irst cell of the first row
			//        "<td>...</td>" - the second cell of the first row
			//            ...
			//        "<td>...</td>" - the last cell of the first row
			//    "</tr>" - closing tag of the first row of the group
			//    "<tr ...>" - the opening tag of the second row of the group
			//        ... - all <td> elements of the second row
			//    "</tr>" - closing tag of the second row of the group
			//    ...
			//    "<tr ...>" - the opening tag of the last row of the group
			//        ... - all <td> elements of the last row
			//    "</tr>" - closing tag of the last row of the group
			// The input parameter rn corresponds to p.rowNum in the most cases.
			var str = "", $t = this[0], p = $t.p, toEnd = 0, cp = [],
				grp = p.groupingView, sumreverse = $.makeArray(grp.groupSummary),
				groupLength = grp.groupField.length, groups = grp.groups, colModel = p.colModel,
				cmLength = colModel.length, page = p.page,
				eventNames = "jqGridShowHideCol.groupingRender",
				getGridRowStyles = function (classes) {
					return base.getGuiStyles.call($t, "gridRow", classes);
				},
				jqgroupClass = getGridRowStyles("jqgroup ui-row-" + p.direction),
				jqfootClass = getGridRowStyles("jqfoot ui-row-" + p.direction);

			function buildSummaryTd(iEndGroup, offset, g, foffset, iconHtml) {
				var fdata = groups[iEndGroup], i, groupCount, strTd = "", tmpdata, colSpan, align, vv,
					madeHidden, nMakeHidden = 0, iSummary, summary, cm, iCol, summaryType, summaryTpl,
					isColumnForIconNotFound = true;

				if (offset !== 0 && groups[iEndGroup].idx !== 0) {
					for (i = iEndGroup; i >= 0; i--) {
						if (groups[i].idx === groups[iEndGroup].idx - offset) {
							fdata = groups[i];
							break;
						}
					}
				}
				groupCount = fdata.cnt;

				for (iCol = (iconHtml === undefined ? foffset : 0); iCol < cmLength; iCol++) {
					tmpdata = "&#160;";
					cm = colModel[iCol];
					for (iSummary = 0; iSummary < fdata.summary.length; iSummary++) {
						summary = fdata.summary[iSummary];
						summaryType = $.isArray(summary.st) ? summary.st[g.idx] : summary.st;
						summaryTpl = $.isArray(cm.summaryTpl) ? cm.summaryTpl[g.idx] : (cm.summaryTpl || "{0}");
						if (summary.nm === cm.name) {
							if (typeof summaryType === "string" && summaryType.toLowerCase() === "avg") {
								if (summary.sd && summary.vd) {
									summary.v = (summary.v / summary.vd);
								} else if (summary.v && groupCount > 0) {
									summary.v = (summary.v / groupCount);
								}
							}
							try {
								summary.groupCount = fdata.cnt;
								summary.groupIndex = fdata.dataIndex;
								summary.groupValue = fdata.value;
								vv = $t.formatter("", summary.v, iCol, summary);
							} catch (ef) {
								vv = summary.v;
							}
							tmpdata = jgrid.format(summaryTpl, vv);
							if (cm.summaryFormat) {
								tmpdata = cm.summaryFormat.call($t, g, tmpdata, vv, cm, summary);
							}
							break;
						}
					}
					colSpan = false;
					align = false;
					if (iconHtml !== undefined && isColumnForIconNotFound) {
						if (!cm.hidden) {
							// the icon need be placed in the first non-hidden column
							tmpdata = iconHtml;
							isColumnForIconNotFound = false;
							if (foffset > 1) {
								colSpan = true;
								// if foffset > 1 then the next foffset-1 non-hidden columns
								// must be displayed hidden.
								nMakeHidden = foffset - 1;
							}
							// the icon in the column header must be left aligned
							align = cm.align; // save the original align value
							cm.align = p.direction === "rtl" ? "right" : "left";
							grp.iconColumnName = cm.name;
						}
					}
					madeHidden = false;
					if (nMakeHidden > 0 && !cm.hidden && tmpdata === "&#160;") {
						madeHidden = true;
						if (align) {
							cm.align = align; // restore the original align value
						}
						nMakeHidden--;
						continue;
					}
					strTd += "<td role='gridcell' " + $t.formatCol(iCol, 1, "") +
							(colSpan ? "colspan='" + foffset + "'" : "") + ">" + tmpdata + "</td>";
					colSpan = false;
					if (align) {
						cm.align = align; // restore the original align value
					}
					if (madeHidden) {
						cm.hidden = false;
						nMakeHidden--;
					}
				}
				return strTd;
			}

			// TODO: allow groupField be from additionalProperties
			// and not only from colModel
			$.each(colModel, function (i, n) {
				var iGroup;
				for (iGroup = 0; iGroup < groupLength; iGroup++) {
					if (grp.groupField[iGroup] === n.name) {
						cp[iGroup] = i;
						break;
					}
				}
			});

			sumreverse.reverse();
			$.each(groups, function (i, n) {
				var gv, clid = p.id + "ghead_" + n.idx, hid = clid + "_" + i,
					groupCollapse = $.isFunction(grp.groupCollapse) ?
						grp.groupCollapse.call($t, { group: n, rowid: hid }) :
						grp.groupCollapse,
					jj, kk, ik, colspan = 1, offset = 0, sgr, gg, end, grpTextStr,
					leaf = groupLength - 1 === n.idx,
					parentGroupCollapse = n.parentGroup != null ?
						n.parentGroup.collapsed :
						false,
					icon = "<span style='cursor:pointer;margin-" +
						(p.direction === "rtl" ? "right:" : "left:") + (n.idx * 12) +
						"px;' class='" + grp.commonIconClass + " " +
						(groupCollapse ? grp.plusicon : grp.minusicon) + " tree-wrap'></span>";
				if (grp._locgr) {
					if (!(n.startRow + n.cnt > (page - 1) * rn && n.startRow < page * rn)) {
						return true;
					}
				}
				if (parentGroupCollapse) {
					groupCollapse = true;
				}
				if (groupCollapse !== undefined) {
					n.collapsed = groupCollapse;
				}
				toEnd++;
				try {
					if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
						n.displayValue = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, colModel[cp[n.idx]], n.idx, n, i);
						gv = n.displayValue;
					} else {
						gv = $t.formatter(hid, n.displayValue, cp[n.idx], n.value, n);
					}
				} catch (egv) {
					gv = n.displayValue;
				}
				str += "<tr id='" + hid + "' data-jqgrouplevel='" + n.idx + "' " +
					(groupCollapse && parentGroupCollapse ? "style='display:none;' " : "") +
					"role='row' class='" + jqgroupClass + " " + clid + "'>";
				grpTextStr = $.isFunction(grp.groupText[n.idx]) ?
					grp.groupText[n.idx].call($t, gv, n.cnt, n.summary) :
					jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary);
				if (typeof grpTextStr !== "string" && typeof grpTextStr !== "number") {
					grpTextStr = gv;
				}
				if (grp.groupSummaryPos[n.idx] === "header") {
					colspan = 1;
					if (colModel[0].name === "cb" || colModel[1].name === "cb") {
						colspan++;
					}
					if (colModel[0].name === "subgrid" || colModel[1].name === "subgrid") {
						colspan++;
					}
					str += buildSummaryTd(i, 0, n, colspan, icon + "<span class='cell-wrapper'>" + grpTextStr + "</span>");
				} else {
					str += "<td role='gridcell' style='padding-left:" + (n.idx * 12) + "px;'" +
							" colspan='" + cmLength + "'>" + icon + grpTextStr + "</td>";
				}
				str += "</tr>";
				if (leaf) {
					gg = groups[i + 1];
					sgr = n.startRow;
					end = gg !== undefined ? gg.startRow : groups[i].startRow + groups[i].cnt;
					if (grp._locgr) {
						offset = (page - 1) * rn;
						if (offset > n.startRow) {
							sgr = offset;
						}
					}
					for (kk = sgr; kk < end; kk++) {
						if (!grdata[kk - offset]) {
							break;
						}
						str += grdata[kk - offset].join("");
					}
					if (grp.groupSummaryPos[n.idx] !== "header") {
						if (gg !== undefined) {
							for (jj = 0; jj < grp.groupField.length; jj++) {
								if (gg.dataIndex === grp.groupField[jj]) {
									break;
								}
							}
							toEnd = grp.groupField.length - jj;
						}
						for (ik = 0; ik < toEnd; ik++) {
							if (!sumreverse[ik]) {
								continue;
							}
							str += "<tr data-jqfootlevel='" + (n.idx - ik) +
									(groupCollapse && ((n.idx - ik) > 0 || !grp.showSummaryOnHide) ? "' style='display:none;'" : "'") +
									" role='row' class='" + jqfootClass + "'>";
							str += buildSummaryTd(i, ik, groups[n.idx - ik], 0);
							str += "</tr>";
						}
						toEnd = jj;
					}
				}
			});
			this.off(eventNames)
				.on(eventNames, function () { //e, show, cmName, iColShow) {
					// TODO fix the code after resorting columns
					var iCol = p.iColByName[grp.iconColumnName], iRow, row, iColNew, i; //$cellData;
					if ($.inArray("header", grp.groupSummaryPos) >= 0) {
						for (i = 0; i < colModel.length; i++) {
							if (!colModel[i].hidden) {
								iColNew = i;
								break;
							}
						}
						if (iColNew === undefined || iCol === iColNew) { return; }

						for (iRow = 0; iRow < $t.rows.length; iRow++) {
							row = $t.rows[iRow];
							if ($(row).hasClass("jqgroup")) {
								/*$cellData = $(row.cells[iCol]).children(".cell-wrapper").detach();
								$.wrapInner(row.cells[iColNew], function () {//"<span class='cell-wrapper'></span>");
									return "<span class='cell-wrapper'>" + this.nodeValue + "</span>";
								});
								row.cells[iColNew]
								$cellData = $(row.cells[iCol]).children(".cell-wrapper").detach();
								$(row.cells[iCol]).html($(row.cells[iCol]).children("").html());*/
								$(row.cells[iColNew]).html(row.cells[iCol].innerHTML);
								$(row.cells[iCol]).html("&nbsp;");
							}
						}
						grp.iconColumnName = colModel[iColNew].name;
					}
				});
			return str;
		},
		groupingGroupBy: function (name, options) {
			return this.each(function () {
				var $t = this, p = $t.p, grp = p.groupingView, i, cm;
				if (typeof name === "string") {
					name = [name];
				}
				p.grouping = true;
				grp._locgr = false;
				//Set default, in case visibilityOnNextGrouping is undefined
				if (grp.visibiltyOnNextGrouping === undefined) {
					grp.visibiltyOnNextGrouping = [];
				}
				// show previous hidden groups if they are hidden and weren't removed yet
				for (i = 0; i < grp.groupField.length; i++) {
					cm = p.colModel[p.iColByName[grp.groupField[i]]];
					if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i] && cm != null && cm.hidden === true) {
						base.showCol.call($($t), grp.groupField[i]);
					}
				}
				// set visibility status of current group columns on next grouping
				for (i = 0; i < name.length; i++) {
					grp.visibiltyOnNextGrouping[i] = $(p.idSel + "_" + jgrid.jqID(name[i])).is(":visible");
				}
				p.groupingView = $.extend(p.groupingView, options || {});
				grp.groupField = name;
				$($t).trigger("reloadGrid");
			});
		},
		groupingRemove: function (current) {
			return this.each(function () {
				var $t = this, p = $t.p, tbody = $t.tBodies[0], grp = p.groupingView, i;
				if (current === undefined) {
					current = true;
				}
				p.grouping = false;
				if (current === true) {
					// show previous hidden groups if they are hidden and weren't removed yet
					for (i = 0; i < grp.groupField.length; i++) {
						if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
							base.showCol.call($($t), grp.groupField);
						}
					}
					$("tr.jqgroup, tr.jqfoot", tbody).remove();
					$("tr.jqgrow", tbody).filter(":hidden").show();
				} else {
					$($t).trigger("reloadGrid");
				}
			});
		},
		groupingCalculations: {
			handler: function (fn, v, field, round, roundType, rc) {
				var funcs = {
						sum: function () {
							return parseFloat(v || 0) + parseFloat((rc[field] || 0));
						},

						min: function () {
							if (v === "") {
								return parseFloat(rc[field] || 0);
							}
							return Math.min(parseFloat(v), parseFloat(rc[field] || 0));
						},

						max: function () {
							if (v === "") {
								return parseFloat(rc[field] || 0);
							}
							return Math.max(parseFloat(v), parseFloat(rc[field] || 0));
						},

						count: function () {
							if (v === "") {
								v = 0;
							}
							if (rc.hasOwnProperty(field)) {
								return v + 1;
							}
							return 0;
						},

						avg: function () {
							// the same as sum, but at end we divide it
							// so use sum instead of duplicating the code (?)
							return funcs.sum();
						}
					},
					res,
					mul;

				if (!funcs[fn]) {
					throw ("jqGrid Grouping No such method: " + fn);
				}
				res = funcs[fn]();

				if (round != null) {
					if (roundType === "fixed") {
						res = res.toFixed(round);
					} else {
						mul = Math.pow(10, round);
						res = Math.round(res * mul) / mul;
					}
				}

				return res;
			}
		}
	});
	// end module grid.grouping
}));
