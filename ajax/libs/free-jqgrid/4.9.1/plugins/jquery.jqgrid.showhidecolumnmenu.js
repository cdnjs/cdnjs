/**
 * Copyright (c) 2014-2015, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * Date: 2014-11-13-2015-04-06
 * see https://github.com/tonytomov/jqGrid/issues/650 for more details
 */
/*global jQuery */
(function ($) {
	"use strict";
	$.jgrid = $.jgrid || {};
	$.extend($.jgrid, {
		// define default options of showHideColumnMenu plugin
		showHideColumnMenu: {
			adjustGridWidth: true,
			viewHideDlgColumnsAsDisabled: false,
			allowHideInernalColumns: false,
			shrink: false,
			menuStyle: { "float": "left" },
			modifyMenuItem: function ($li, cm, options) {
				if ($.inArray(cm.name, ["rn", "subgrid", "cb"]) >= 0) { // skip predefined columns
					if (!options.allowHideInernalColumns) {
						$li.hide();
					}
					return;
				}
				if (!cm.hidedlg) {
					return;
				}
				if (options.viewHideDlgColumnsAsDisabled) {
					$li.addClass("ui-state-disabled");
				} else {
					$li.hide();
				}
			}
		}
	});
	/*jslint continue: true, eqeq: true, unparam: true, plusplus: true */
	$.jgrid.extend({
		showHideColumnMenu: function (opt) {
			var options = $.extend(true, {}, $.jgrid.showHideColumnMenu, opt),
				versionParts = $.ui != null && typeof $.ui.version === "string" ? /^([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec($.ui.version) : [],
				isAncorRequired = versionParts != null && versionParts.length === 4 && versionParts[1] === "1" && versionParts[2] < 11;
			return this.each(function () {
				var $self = $(this),
					bindContextMenu = function () {
						$(this.grid.hDiv).find(".ui-jqgrid-labels").contextmenu(function (e) {
							var p = $self.jqGrid("getGridParam"), colModel = p.colModel, colNames = p.colNames, iCol, nCol = colModel.length, cm, $li,
								gh = p.groupHeader, iColByName = {}, colHeader = {}, i, j, l, ghItem,
								$menu = $("<ul class='ui-jqgrid-showHideColumnMenu'></ul>");
							// first fill the helper map which get iCol by the column name
							for (iCol = 0; iCol < nCol; iCol++) {
								iColByName[colModel[iCol].name] = iCol;
							}
							// fill colHeader for columns which have column header
							if (gh != null && gh.groupHeaders != null) {
								for (i = 0, l = gh.groupHeaders.length; i < l; i++) {
									ghItem = gh.groupHeaders[i];
									for (j = 0; j < ghItem.numberOfColumns; j++) {
										iCol = iColByName[ghItem.startColumnName] + j;
										cm = colModel[iCol];
										colHeader[iCol] = $.isFunction(options.buildItemText) ?
												options.buildItemText.call($self[0], {
													iCol: iCol,
													cm: cm,
													cmName: cm.name,
													colName: colNames[iCol],
													groupTitleText: ghItem.titleText
												}) :
												$.jgrid.stripHtml(ghItem.titleText) + ": " +
													$.jgrid.stripHtml(colNames[iCol] === "" ? cm.name : colNames[iCol]);
									}
								}
							}
							// fill colHeader for all other columns
							for (iCol = 0; iCol < nCol; iCol++) {
								if (colHeader[iCol] === undefined) {
									cm = colModel[iCol];
									colHeader[iCol] = $.isFunction(options.buildItemText) ?
											options.buildItemText.call($self[0], {
												iCol: iCol,
												cm: cm,
												cmName: cm.name,
												colName: colNames[iCol],
												groupTitleText: null
											}) :
											$.jgrid.stripHtml(colNames[iCol]);
								}
							}
							// fill the menu items now
							for (iCol = 0; iCol < nCol; iCol++) {
								cm = colModel[iCol];
								$li = $("<li></li>")
										.data("iCol", iCol)
										.html(colHeader[iCol]);
								options.modifyMenuItem.call($self[0], $li, cm, options);
								$li.prepend(cm.hidden ? options.checkboxUnChecked : options.checkboxChecked);
								if (isAncorRequired) {
									$li.wrapInner("<a></a>");
								}
								$li.appendTo($menu);
							}
							$menu.css(options.menuStyle);
							$("ul.ui-jqgrid-showHideColumnMenu").menu("destroy").remove(); // remove menu if any exist
							$menu.appendTo("body")
								.menu({
									select: function (event, ui) {
										var index = parseInt(ui.item.data("iCol"), 10), $cb = ui.item.find(options.checkboxSelector),
											cmi = colModel[index],
											toHide = options.isChecked.call($self[0], $cb, event, cmi);
										if (!isNaN(index) && index >= 0 && cmi != null && $cb.length > 0) {
											if (toHide) {
												options.toUnCheck.call($self[0], $cb, event, cmi);
												$self.jqGrid("hideCol", cmi.name);
											} else {
												options.toCheck.call($self[0], $cb, event, cmi);
												$self.jqGrid("showCol", cmi.name);
											}
											$(this).parent().css("zoom", 1); // fix visibility in IE
											$menu.menu("focus", event, ui.item);
										}
									},
									create: function () {
										var mHeight = $menu.height(),
											wHeight = window.innerHeight || document.documentElement.clientHeight;
										if (mHeight > wHeight) {
											$menu.height(wHeight).css("overflow-y", "scroll");
										}
									}
								})
								.mouseleave(function () {
									$(this).menu("destroy").remove();
								})
								.position({
									of: $(e.target),
									my: "left top",
									at: "right center",
									collision: "flipfit flipfit"
								});

							return false; // prevent creating of the standard context menu of web browser
						});
					};
				options = $.extend(true,
					(this.p.iconSet === "fontAwesome" || options.iconSet === "fontAwesome") ? {
						checkboxChecked: "<i class=\"fa fa-check-square-o fa-fw fa-lg\"></i>&nbsp;",
						checkboxUnChecked: "<i class=\"fa fa-square-o fa-fw fa-lg\"></i>&nbsp;",
						checkboxSelector: "i.fa",
						isChecked: function ($checkbox) { return $checkbox.hasClass("fa-check-square-o"); },
						toCheck: function ($checkbox) { $checkbox.removeClass("fa-square-o").addClass("fa-check-square-o"); },
						toUnCheck: function ($checkbox) { $checkbox.removeClass("fa-check-square-o").addClass("fa-square-o"); }
					} : {
						checkboxChecked: "<input disabled=\"disabled\" checked=\"checked\" type=\"checkbox\"/>",
						checkboxUnChecked: "<input disabled=\"disabled\" type=\"checkbox\"/>",
						checkboxSelector: "input[type=checkbox]",
						isChecked: function ($checkbox) { return $checkbox.is(":checked"); },
						toCheck: function ($checkbox) { $checkbox.prop("checked", true); },
						toUnCheck: function ($checkbox) { $checkbox.prop("checked", false); }
					},
					options);
				bindContextMenu.call(this);
				$self.bind("jqGridAfterSetGroupHeaders", function () {
					bindContextMenu.call(this);
				});
			});
		}
	});
}(jQuery));
