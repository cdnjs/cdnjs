/**
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * $Version: 2007.08.19 +r2
 * Updated by Oleg Kiriljuk to support touch devices
 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 */
/*jslint browser: true, white: true */
/*global jQuery, define */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	// begin module jqdnr
	var namespace = ".jqGrid", mouseDown = "mousedown", mouseMove = "mousemove", mouseUp = "mouseup",
		getMouseCoordinates = function (e) {
			var orgEvent = e.originalEvent, touches = orgEvent.targetTouches;
			if (touches) {
				touches = touches[0];
				return { x: touches.pageX, y: touches.pageY };
			}
			return { x: e.pageX, y: e.pageY };
		},
		jqDnR = {
			drag: function (e) {
				var d = e.data, $mainDialog = d.e, dnrMainDialog = d.dnr, $alsoResize = d.ar, dnrAlsoResize = d.dnrAr,
					xy = getMouseCoordinates(e);
				if (dnrMainDialog.k === "move") {
					$mainDialog.css({
						left: dnrMainDialog.X + xy.x - dnrMainDialog.pX,
						top: dnrMainDialog.Y + xy.y - dnrMainDialog.pY
					});
				} else {
					$mainDialog.css({
						width: Math.max(xy.x - dnrMainDialog.pX + dnrMainDialog.W, 0),
						height: Math.max(xy.y - dnrMainDialog.pY + dnrMainDialog.H, 0)
					});
					if (dnrAlsoResize) {
						$alsoResize.css({
							width: Math.max(xy.x - dnrAlsoResize.pX + dnrAlsoResize.W, 0),
							height: Math.max(xy.y - dnrAlsoResize.pY + dnrAlsoResize.H, 0)
						});
					}
				}
				return false;
			},
			stop: function () {
				//$mainDialog.css("opacity", dnr.o);
				$(document).unbind(mouseMove, jqDnR.drag).unbind(mouseUp, jqDnR.stop);
			}
		},
		init = function ($this, handle, actionName, alsoResize) {
			return $this.each(function () {
				handle = handle ? $(handle, $this) : $this;
				handle.bind(mouseDown, { e: $this, k: actionName }, function (e) {
					var d = e.data, p = {}, $inputDatePicker, $mainDialog, dnrMainDialog, $alsoResize, dnrAlsoResize,
						getCssProp = function ($elem, propertyName) {
							return parseInt($elem.css(propertyName), 10) || false;
						},
						getMainCssProp = function (propertyName) {
							return getCssProp($mainDialog, propertyName);
						},
						getAlsoResizeCssProp = function (propertyName) {
							return getCssProp($alsoResize, propertyName);
						},
						xy = getMouseCoordinates(e),
						eventData;

					if ($(e.target).hasClass("ui-jqdialog-titlebar-close") || $(e.target).parent().hasClass("ui-jqdialog-titlebar-close")) {
						//$(e.target).click();
						return;
					}

					$mainDialog = d.e;
					$alsoResize = alsoResize ? $(alsoResize) : false;
					// attempt utilization of dimensions plugin to fix IE issues
					if ($mainDialog.css("position") !== "relative") {
						try {
							// ???? probably one want to GET position and save it in p ?
							// the current implementation use always p = {}
							// probably one mean some additional work together with Dimensions Plugin (dimensions.js)
							$mainDialog.position(p);
						} catch (ignore) { }
					}
					dnrMainDialog = {
						X: p.left || getMainCssProp("left") || 0,
						Y: p.top || getMainCssProp("top") || 0,
						W: getMainCssProp("width") || $mainDialog[0].scrollWidth || 0,
						H: getMainCssProp("height") || $mainDialog[0].scrollHeight || 0,
						pX: xy.x,
						pY: xy.y,
						k: d.k
						//o:$mainDialog.css("opacity")
					};
					// also resize
					if ($alsoResize && d.k !== "move") {
						dnrAlsoResize = {
							X: p.left || getAlsoResizeCssProp("left") || 0,
							Y: p.top || getAlsoResizeCssProp("top") || 0,
							W: $alsoResize[0].offsetWidth || getAlsoResizeCssProp("width") || 0,
							H: $alsoResize[0].offsetHeight || getAlsoResizeCssProp("height") || 0,
							pX: xy.x,
							pY: xy.y,
							k: d.k
						};
					} else {
						dnrAlsoResize = false;
					}
					//E.css({opacity:0.8});
					$inputDatePicker = $mainDialog.find("input.hasDatepicker");
					if ($inputDatePicker.length > 0) {
						try {
							$inputDatePicker.datepicker("hide");
						} catch (ignore) { }
					}
					eventData = {
						e: $mainDialog,
						dnr: dnrMainDialog,
						ar: $alsoResize,
						dnrAr: dnrAlsoResize
					};
					$(document).bind(mouseMove, eventData, jqDnR.drag);
					$(document).bind(mouseUp, eventData, jqDnR.stop);
					return false;
				});
			});
		};

	// navigator.maxTouchPoints == 2, navigator.msMaxTouchPoints
	// https://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
	if (window.PointerEvent) {
		mouseDown += namespace + " pointerdown" + namespace;
		mouseMove += namespace + " pointermove" + namespace;
		mouseUp += namespace + " pointerup" + namespace;
	} else if (window.MSPointerEvent) {
		mouseDown += namespace + " mspointerdown" + namespace;
		mouseMove += namespace + " mspointermove" + namespace;
		mouseUp += namespace + " mspointerup";
	} else { //if (Object.prototype.hasOwnProperty.call(document, "ontouchend")) { or "ontouchstart" in document.documentElement or "ontouchstart" in window
		mouseDown += namespace + " touchstart" + namespace;
		mouseMove += namespace + " touchmove" + namespace;
		mouseUp += namespace + " touchend" + namespace;
	}

	$.jqDnR = jqDnR;

	$.fn.jqDrag = function (handle) {
		return init(this, handle, "move");
	};

	$.fn.jqResize = function (handle, alsoResize) {
		return init(this, handle, "resize", alsoResize);
	};
	// end module jqdnr
}));
