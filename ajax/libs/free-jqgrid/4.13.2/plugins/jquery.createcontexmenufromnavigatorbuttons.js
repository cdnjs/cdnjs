/**
 * @license Copyright (c) 2014-2016, Dr. Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * Date: 2015-04-06
 * see the answers http://stackoverflow.com/a/8491939/315935
 *             and http://stackoverflow.com/a/29048089/315935
 *             and http://stackoverflow.com/q/29457007/315935
 */

/*global jQuery, define */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "./jqdnr", "./jqmodal"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	/*global $ */
    /*jslint plusplus: true, browser: true, eqeq: true, unparam: true, white: true */
	$.jgrid.extend({
		createContexMenuFromNavigatorButtons: function (pager, opt) {
			var grid = this, menuId = "menu_" + grid[0].id, menuUl = $("<ul>"),
				menuDiv = $("<div>").attr("id", menuId),
				getSelectedText = function () {
					var text = "";
					if (window.getSelection) {
						text = window.getSelection();
					} else if (document.getSelection) {
						text = document.getSelection();
					} else if (document.selection) {
						text = document.selection.createRange().text;
					}
					return typeof text === "string" ? text : text.toString();
				};

			menuUl.appendTo(menuDiv);
			menuDiv.appendTo("body");

			grid.contextMenu(menuId, {
				bindings: {}, // the bindings will be created in the onShowMenu
				onContextMenu: function (e) {
					var p = grid[0].p, i, lastSelId, $target = $(e.target),
						rowId = $target.closest("tr.jqgrow").attr("id"),
						isInput = $target.is(":text:enabled") ||
						$target.is("input[type=textarea]:enabled") ||
						$target.is("textarea:enabled");
					if (rowId && !isInput && getSelectedText() === "") {
						i = $.inArray(rowId, p.selarrrow);
						if (p.selrow !== rowId && i < 0) {
							// prevent the row from be unselected
							// the implementation is for "multiselect:false" which we use,
							// but one can easy modify the code for "multiselect:true"
							grid.jqGrid("setSelection", rowId);
						} else if (p.multiselect) {
							// Edit will edit FIRST selected row.
							// rowId is allready selected, but can be not the last selected.
							// Se we swap rowId with the first element of the array p.selarrrow
							lastSelId = p.selarrrow[p.selarrrow.length - 1];
							if (i !== p.selarrrow.length - 1) {
								p.selarrrow[p.selarrrow.length - 1] = rowId;
								p.selarrrow[i] = lastSelId;
								p.selrow = rowId;
							}
						}
						return true;
					}
					return false; // no contex menu
				},
				onShowMenu: function (e, $menu) {
					var options = this, $menuUl = $menu.children("ul").first().empty(),
						versionParts = $.ui != null && typeof $.ui.version === "string" ? /^([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec($.ui.version) : [],
						isAncorRequired = versionParts != null && versionParts.length === 4 && versionParts[1] === "1" && versionParts[2] < 11;

					$(pager).find(".navtable .ui-pg-button").filter(function () {
						return !($(this).prop("disabled") || $(this).hasClass("ui-state-disabled"));
					}).each(function () {
						var $spanIcon, text, $td, id, $li,
							$div = $(this).children("div.ui-pg-div").first();

						if ($div.length === 1) {
							text = $div.children(".ui-pg-button-text").html();
							$td = $div.parent();
							if ($.trim(text) === "") {
								text = $td.attr("title");
							}
							if (this.id !== "" && text !== "") {
								id = "menuitem_" + this.id;
							} else {
								// for custom buttons
								id = $.jgrid.randId();
							}
							$li = $("<li>").attr("id", id);
							$spanIcon = $div.children("span").not(".ui-pg-button-text").first();
							if ($spanIcon.length > 0) {
								// standard navGrid button or button added by navButtonAdd
								if (isAncorRequired) {
									$li.append($("<a>")
										.html(text)
										.prepend(
											$spanIcon
												.clone()
												.removeClass("ui-pg-button-icon-over-text")
												.css({
													"float": "left",
													marginTop: $spanIcon.hasClass("ui-icon") ? "0.25em" : "0.125em",
													marginRight: "0.5em"
												})
										));
								} else {
									$li.html(text)
										.prepend(
											$spanIcon
												.clone()
												.removeClass("ui-pg-button-icon-over-text")
												.css({
													"float": "left",
													marginTop: $spanIcon.first().hasClass("ui-icon") ? "0.25em" : "0.125em",
													marginRight: "0.5em"
												})
										);
								}
								if ($div.parent().hasClass("ui-state-active")) {
									$li.find("span").addClass("ui-state-active");
								}
								if ($li.find("select,input").length > 0) {
									$li.hide(); // hide custom elements in the menu
								}
								$menuUl.append($li);
								options.bindings[id] = (function ($button) {
									return function () {
										$button.click();
									};
								}($div));
							}
						}
					});
					$.jgrid.fullBoolFeedback.call(grid, (opt || {}).onShowContextMenu, "jqGridShowContextMenu", $menuUl, options);
					return $menu;
				}
			});
		}
	});
}));
