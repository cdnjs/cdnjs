/**
 * jqGrid common function
 * Tony Tomov tony@trirand.com, http://trirand.com/blog/
 * Changed by Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
*/

/*jshint eqeqeq:false */
/*global jQuery, define, HTMLElement */
/*jslint browser: true, eqeq: true, plusplus: true, unparam: true, white: true, vars: true */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "./grid.base", "./jqdnr", "./jqmodal"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	var jgrid = $.jgrid, base = $.fn.jqGrid;
	// begin module grid.common
	var getGuiStyles = base.getGuiStyles, getGridRes = base.getGridRes;

	jgrid.jqModal = jgrid.jqModal || {};
	$.extend(true, jgrid.jqModal, { toTop: true });

	$.extend(jgrid, {
		// Modal functions
		// The methods showModal and closeModal will be used as callback of $.jqm jQuery plugin defined in jqModal.js
		// The modul can support multiple modal dialods. It hold the information about evety active modules in internal array of "hashes".
		// The modal dialogs as hidden typically. Before the dialog will be visible onShow callback (showModal) will be called.
		//
		// Every eleement contains "hash object" which have 4 properties:
		//  w: (jQuery object) The modal element, represent the outer div of the modal dialog
		//  o: (jQuery object) The overlay element. It will be assigned on the first opening of the modal
		//  c: (object) The modal's options object. The options used durin creating the modal.
		//          One can use global $.jgrid.jqModal or gris specifif p.jqModal to specify defaults of the options.
		//  t: (DOM object) The triggering element.
		//  s: numeric part of "id" used for modal dialog. The modal dialog have class "jqmID" + s.
		//  a: Boolean. It's false initially. It will be set to true during opening and will set to false on closing.
		showModal: function (h) {
			//  w: (jQuery object) The modal element
			h.w.show();
		},
		closeModal: function (h) {
			//  w: (jQuery object) The modal element
			//  o: (jQuery object) The overlay element
			//  c: (object) The modal's options object
			h.w.hide().attr("aria-hidden", "true");
			if (h.o) {
				h.o.remove();
			}
		},
		hideModal: function (selector, o) {
			o = $.extend({ jqm: true, gb: "", removemodal: false }, o || {});
			var thisgrid = o.gb && typeof o.gb === "string" && o.gb.substr(0, 6) === "#gbox_" ? $("#" + o.gb.substr(6))[0] : false,
				$selector = $(selector);
			if (o.onClose) {
				var oncret = thisgrid ? o.onClose.call(thisgrid, selector) : o.onClose(selector);
				if (typeof oncret === "boolean" && !oncret) { return; }
			}
			if ($.fn.jqm && o.jqm === true) {
				$selector.attr("aria-hidden", "true").jqmHide();
			} else {
				if (o.gb !== "") {
					try { $(">.jqgrid-overlay", o.gb).first().hide(); } catch (ignore) { }
				}
				$selector.hide().attr("aria-hidden", "true");
			}
			if (o.removemodal) {
				$selector.remove();
			}
		},
		//Helper functions
		findPos: function (obj) {
			var curleft = 0, curtop = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
					obj = obj.offsetParent;
				} while (obj);
				//do not change obj == obj.offsetParent
			}
			return [curleft, curtop];
		},
		createModal: function (aIDs, content, o, insertSelector, posSelector, appendsel, css) {
			var jqID = jgrid.jqID, p = this.p, gridjqModal = p != null ? p.jqModal || {} : {};
			o = $.extend(true, {
				resizingRightBottomIcon: base.getIconRes.call(this, "form.resizableLtr")
			}, jgrid.jqModal || {}, gridjqModal, o);
			// create main window "div.ui-jqdialog", which will contains other components of the modal window:
			// "div.ui-jqdialog-titlebar", "div.ui-jqdialog-content" and optionally resizer like "div.jqResize"
			var mw = document.createElement("div"), themodalSelector = "#" + jqID(aIDs.themodal),
				rtlsup = $(o.gbox).attr("dir") === "rtl" ? true : false,
				resizeAlso = aIDs.resizeAlso ? "#" + jqID(aIDs.resizeAlso) : false;
			css = $.extend({}, css || {});
			mw.className = getGuiStyles.call(this, "dialog.window", "ui-jqdialog");
			mw.id = aIDs.themodal;
			mw.dir = rtlsup ? "rtl" : "ltr";
			var mdoc = document.createElement("div");
			mdoc.className = getGuiStyles.call(this, "dialog.document");
			$(mdoc).attr("role", "document");
			var msubdoc = document.createElement("div");
			msubdoc.className = getGuiStyles.call(this, "dialog.subdocument");
			mdoc.appendChild(msubdoc);
			mw.appendChild(mdoc);
			// create the title "div.ui-jqdialog-titlebar", which contains:
			// "span.ui-jqdialog-title" with the title text and "a.ui-jqdialog-titlebar-close" with the closing button
			var mh = document.createElement("div");
			mh.className = getGuiStyles.call(this,
				"dialog.header",
				"ui-jqdialog-titlebar " + (rtlsup ? "ui-jqdialog-titlebar-rtl" : "ui-jqdialog-titlebar-ltr"));
			mh.id = aIDs.modalhead;
			$(mh).append("<span class='ui-jqdialog-title'>" + o.caption + "</span>");
			var hoverClasses = getGuiStyles.call(this, "states.hover"),
				ahr = $("<a aria-label='Close' class='" + getGuiStyles.call(this, "dialog.closeButton", "ui-jqdialog-titlebar-close") + "'></a>")
					.hover(function () { ahr.addClass(hoverClasses); },
						function () { ahr.removeClass(hoverClasses); })
					.append("<span class='" + base.getIconRes.call(this, "form.close") + "'></span>");
			$(mh).append(ahr);
			// create "div.ui-jqdialog-content" which hold some HTML content (see input parameter)
			var mc = document.createElement("div");
			$(mc).addClass(getGuiStyles.call(this, "dialog.content", "ui-jqdialog-content"))
				.attr("id", aIDs.modalcontent);
			$(mc).append(content);
			// place "div.ui-jqdialog-content" and "div.ui-jqdialog-titlebar" in main window "div.ui-jqdialog"
			msubdoc.appendChild(mc);
			$(msubdoc).prepend(mh);
			// appendsel and insertSelector specifies where the dialog should be placed on the HTML page
			if (appendsel === true) {
				$("body").append(mw);  //append as first child in body -for alert dialog
			} else if (typeof appendsel === "string") {
				$(appendsel).append(mw);
			} else { $(mw).insertBefore(insertSelector); }
			$(mw).css(css);
			if (o.jqModal === undefined) { o.jqModal = true; } // internal use
			var coord = {};
			if ($.fn.jqm && o.jqModal === true) {
				if (o.left === 0 && o.top === 0 && o.overlay) {
					var pos = [];
					pos = jgrid.findPos(posSelector);
					o.left = pos[0] + 4;
					o.top = pos[1] + 4;
				}
				coord.top = o.top + "px";
				coord.left = o.left;
			} else if (o.left !== 0 || o.top !== 0) {
				coord.left = o.left;
				coord.top = o.top + "px";
			}
			$("a.ui-jqdialog-titlebar-close", mh).click(function () {
				var oncm = $(themodalSelector).data("onClose") || o.onClose;
				var gboxclose = $(themodalSelector).data("gbox") || o.gbox;
				jgrid.hideModal(themodalSelector, {
					gb: gboxclose,
					jqm: o.jqModal,
					onClose: oncm,
					removemodal: o.removemodal || false
				});
				return false;
			});
			if (o.width === 0 || !o.width) { o.width = 300; }
			if (o.height === 0 || !o.height) { o.height = 200; }
			if (!o.zIndex) {
				var parentZ = $(insertSelector).parents("*[role=dialog]").first().css("z-index");
				if (parentZ) {
					o.zIndex = parseInt(parentZ, 10) + 2;
					o.toTop = true;
				} else {
					o.zIndex = 950;
				}
			}
			// ONE NEEDS correction of left position in case of RTL, but the current code places
			// modal dialog OUT OF visible part of/ the window if <body dir="rtl">.
			// Thus first of all the lines are commented. Later the FIXED code below will be included.
			/*var rtlt = 0;
			if( rtlsup && coord.left && !appendsel) {
				rtlt = $(o.gbox).width()- (!isNaN(o.width) ? parseInt(o.width,10) :0) - 8; // to do
			// just in case
				coord.left = parseInt(coord.left,10) + parseInt(rtlt,10);
			}*/
			if (coord.left) { coord.left += "px"; }
			$(mw).css($.extend({
				width: isNaN(o.width) ? "auto" : o.width + "px",
				height: isNaN(o.height) ? "auto" : o.height + "px",
				zIndex: o.zIndex
			}, coord))
				.attr({ tabIndex: "-1", "role": "dialog", "aria-labelledby": aIDs.modalhead, "aria-hidden": "true" });
			if (o.drag === undefined) { o.drag = true; }
			if (o.resize === undefined) { o.resize = true; }
			if (o.drag) {
				if ($.fn.jqDrag) {
					// .ui-draggable .ui-dialog-titlebar {cursor: move}
					//$(mw).addClass("ui-draggable"); //css("cursor", "move");
					$(mh).css("cursor", "move");
					$(mw).jqDrag(mh);
				} else {
					try {
						$(mw).draggable({ handle: $("#" + jqID(mh.id)) });
					} catch (ignore) { }
				}
			}
			if (o.resize) {
				if ($.fn.jqResize) {
					$(mc).append("<div class='jqResize ui-resizable-handle ui-resizable-se " + o.resizingRightBottomIcon + "'></div>");
					$(themodalSelector).jqResize(".jqResize", resizeAlso);
				} else {
					try {
						$(mw).resizable({ handles: "se, sw", alsoResize: resizeAlso });
					} catch (ignore) { }
				}
			}
			if (o.closeOnEscape === true) {
				$(mw).keydown(function (e) {
					if (e.which === 27) {
						var cone = $(themodalSelector).data("onClose") || o.onClose;
						jgrid.hideModal(themodalSelector, { gb: o.gbox, jqm: o.jqModal, onClose: cone, removemodal: o.removemodal || false, formprop: !o.recreateForm || false, form: o.form || "" });
					}
				});
			}
		},
		viewModal: function (selector, o) {
			o = $.extend(true, {
				//toTop: false,
				overlay: 30,
				modal: false,
				overlayClass: getGuiStyles.call(this, "overlay"), // "ui-widget-overlay"
				onShow: jgrid.showModal,
				onHide: jgrid.closeModal,
				gbox: "",
				jqm: true,
				jqM: true
			}, jgrid.jqModal || {}, o || {});
			if ($.fn.jqm && o.jqm === true) {
				if (o.jqM) {
					$(selector).attr("aria-hidden", "false").jqm(o).jqmShow();
				} else {
					$(selector).attr("aria-hidden", "false").jqmShow();
				}
			} else {
				if (o.gbox !== "") {
					$(">.jqgrid-overlay", o.gbox).first().show();
					$(selector).data("gbox", o.gbox);
				}
				$(selector).show().attr("aria-hidden", "false");
				try { $(":input:visible", selector)[0].focus(); } catch (ignore) { }
			}
		},
		info_dialog: function (caption, content, closeButtonText, modalopt) {
			var $t = this, p = $t.p, gridjqModal = p != null ? p.jqModal || {} : {},
				mopt = $.extend(true,
					{
						width: 290,
						height: "auto",
						dataheight: "auto",
						drag: true,
						resize: false,
						left: 250,
						top: 170,
						zIndex: 1000,
						jqModal: true,
						modal: false,
						closeOnEscape: true,
						align: "center",
						buttonalign: "center",
						buttons: []
						// {text:"textbutt", id:"buttid", onClick : function(){...}}
						// if the id is not provided we set it like info_button_+ the index in the array - i.e info_button_0,info_button_1...
					},
					jgrid.jqModal || {},
					gridjqModal,
					{ caption: "<b>" + caption + "</b>" },
					modalopt || {}),
				jm = mopt.jqModal;

			if ($.fn.jqm && !jm) { jm = false; }
			// in case there is no jqModal
			var buttstr = "", i, hoverClasses = getGuiStyles.call($t, "states.hover");
			if (mopt.buttons.length > 0) {
				for (i = 0; i < mopt.buttons.length; i++) {
					if (mopt.buttons[i].id === undefined) { mopt.buttons[i].id = "info_button_" + i; }
					buttstr += jgrid.builderFmButon.call($t, mopt.buttons[i].id, mopt.buttons[i].text);
				}
			}
			var dh = isNaN(mopt.dataheight) ? mopt.dataheight : mopt.dataheight + "px",
				cn = "text-align:" + mopt.align + ";",
				cnt = "<div id='info_id'>";
			cnt += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + dh + ";" + cn + "'>" + content + "</div>";
			if (closeButtonText || buttstr !== "") {
				cnt += "<hr class='" + getGuiStyles.call($t, "dialog.hr") + "' style='margin:1px'/><div style='text-align:" + mopt.buttonalign +
					";padding:.8em 0 .5em 0;background-image:none;border-width: 1px 0 0 0;'>" +
					(closeButtonText ? jgrid.builderFmButon.call($t, "closedialog", closeButtonText) : "") + buttstr + "</div>";
			}
			cnt += "</div>";

			try {
				if ($("#info_dialog").attr("aria-hidden") === "false") {
					jgrid.hideModal("#info_dialog", { jqm: jm });
				}
				$("#info_dialog").remove();
			} catch (ignore) { }
			jgrid.createModal.call($t,
				{
					themodal: "info_dialog",
					modalhead: "info_head",
					modalcontent: "info_content",
					resizeAlso: "infocnt"
				},
				cnt,
				mopt,
				"", "", true);
			// attach onclick after inserting into the dom
			if (buttstr) {
				$.each(mopt.buttons, function (j) {
					$("#" + jgrid.jqID($t.id), "#info_id").bind("click", function () { mopt.buttons[j].onClick.call($("#info_dialog")); return false; });
				});
			}
			$("#closedialog", "#info_id").click(function () {
				jgrid.hideModal("#info_dialog", {
					jqm: jm,
					onClose: $("#info_dialog").data("onClose") || mopt.onClose,
					gb: $("#info_dialog").data("gbox") || mopt.gbox
				});
				return false;
			});
			$(".fm-button", "#info_dialog").hover(
				function () { $(this).addClass(hoverClasses); },
				function () { $(this).removeClass(hoverClasses); }
			);
			if ($.isFunction(mopt.beforeOpen)) { mopt.beforeOpen(); }
			jgrid.viewModal.call($t, "#info_dialog", {
				onHide: function (h) {
					h.w.hide().remove();
					if (h.o) { h.o.remove(); }
				},
				modal: mopt.modal,
				jqm: jm
			});
			if ($.isFunction(mopt.afterOpen)) { mopt.afterOpen(); }
			try { $("#info_dialog").focus(); } catch (ignore) { }
		},
		bindEv: function (el, opt) {
			var $t = this;
			if ($.isFunction(opt.dataInit)) {
				opt.dataInit.call($t, el, opt);
			}
			if (opt.dataEvents) {
				$.each(opt.dataEvents, function () {
					if (this.data !== undefined) {
						$(el).bind(this.type, this.data, this.fn);
					} else {
						$(el).bind(this.type, this.fn);
					}
				});
			}
		},
		// Form Functions
		createEl: function (eltype, options, vl, autowidth, ajaxso) {
			var elem = "", $t = this, p = $t.p, infoDialog = jgrid.info_dialog,
				getRes = function (path) { return getGridRes.call($($t), path); },
				errcap = getRes("errors.errcap"), edit = getRes("edit"), editMsg = edit.msg, bClose = edit.bClose;
			function setAttributes(elm, atr, exl) {
				var exclude = ["dataInit", "dataEvents", "dataUrl", "buildSelect", "sopt", "searchhidden", "defaultValue", "attr", "custom_element", "custom_value", "selectFilled", "rowId", "mode"];
				if (exl !== undefined && $.isArray(exl)) {
					$.merge(exclude, exl);
				}
				$.each(atr, function (attrName, value) {
					if ($.inArray(attrName, exclude) === -1) {
						$(elm).attr(attrName, value);
					}
				});
				if (!atr.hasOwnProperty("id")) {
					$(elm).attr("id", jgrid.randId());
				}
			}

			if (options == null) { return ""; }

			switch (eltype) {
				case "textarea":
					elem = document.createElement("textarea");
					if (autowidth) {
						if (!options.cols) { $(elem).css({ width: "100%", "box-sizing": "border-box" }); }
					} else if (!options.cols) { options.cols = 19; }
					if (!options.rows) { options.rows = 2; }
					if (vl === "&nbsp;" || vl === "&#160;" || (vl.length === 1 && vl.charCodeAt(0) === 160)) { vl = ""; }
					elem.value = vl;
					setAttributes(elem, options);
					$(elem).attr({ role: "textbox" }); // , "multiline": "true"
					break;
				case "checkbox": //what code for simple checkbox
					elem = document.createElement("input");
					elem.type = "checkbox";
					if (!options.value) {
						var vl1 = String(vl).toLowerCase();
						if (vl1.search(/(false|f|0|no|n|off|undefined)/i) < 0 && vl1 !== "") {
							elem.checked = true;
							elem.defaultChecked = true;
							elem.value = vl;
						} else {
							elem.value = "on";
						}
						$(elem).data("offval", "off");
					} else {
						var cbval = options.value.split(":");
						if (vl === cbval[0]) {
							elem.checked = true;
							elem.defaultChecked = true;
						}
						elem.value = cbval[0];
						$(elem).data("offval", cbval[1]);
					}
					setAttributes(elem, options, ["value"]);
					$(elem).attr({ role: "checkbox", "aria-checked": elem.checked ? "true" : "false" });
					break;
				case "select":
					elem = document.createElement("select");
					var msl, ovm = [], isSelected;

					if (options.multiple === true) {
						msl = true;
						elem.multiple = "multiple";
						$(elem).attr("aria-multiselectable", "true");
						ovm = vl.split(",");
						ovm = $.map(ovm, function (n) { return $.trim(n); });
					} else {
						msl = false;
						ovm[0] = $.trim(vl);
					}
					if (options.size === undefined) {
						options.size = msl ? 3 : 1;
					}
					if (options.dataUrl !== undefined) {
						var rowid = null, postData = options.postData || ajaxso.postData,
							ajaxContext = { elem: elem, options: options, cm: options.cm, iCol: options.iCol, ovm: ovm };
						try {
							rowid = options.rowId;
						} catch (ignore) { }

						if (p && p.idPrefix) {
							rowid = jgrid.stripPref(p.idPrefix, rowid);
						}
						$.ajax($.extend({
							url: $.isFunction(options.dataUrl) ? options.dataUrl.call($t, rowid, vl, String(options.name), ajaxContext) : options.dataUrl,
							type: "GET",
							dataType: "html",
							data: $.isFunction(postData) ? postData.call($t, rowid, vl, String(options.name)) : postData,
							context: ajaxContext,
							success: function (data, textStatus, jqXHR) {
								var ovm1 = this.ovm, elem1 = this.elem, cm1 = this.cm, iCol1 = this.iCol,
									options1 = $.extend({}, this.options),
									a = $.isFunction(options1.buildSelect) ? options1.buildSelect.call($t, data, jqXHR, cm1, iCol1) : data;
								if (typeof a === "string") {
									a = $($.trim(a)).html();
								}
								if (a) {
									//$(elem1).empty(); // ???
									$(elem1).append(a);
									setAttributes(elem1, options1, postData ? ["postData"] : undefined);
									setTimeout(function () {
										var isSelected1; // undefined
										$("option", elem1).each(function (iOpt) {
											//if(i===0) { this.selected = ""; }
											// fix IE8/IE7 problem with selecting of the first item on multiple=true
											if (iOpt === 0 && elem1.multiple) { this.selected = false; }
											if ($.inArray($.trim($(this).val()), ovm1) > -1) {
												this.selected = "selected";
												isSelected1 = true;
											}
										});
										if (!isSelected1) {
											$("option", elem1).each(function () {
												if ($.inArray($.trim($(this).text()), ovm1) > -1) {
													this.selected = "selected";
												}
											});
										}
										jgrid.fullBoolFeedback.call($t, options1.selectFilled, "jqGridSelectFilled", {
											elem: elem1,
											options: options1,
											cm: cm1,
											cmName: cm1 != null ? cm1.name : options1.name,
											iCol: iCol1
										});
									}, 0);
								}
							}
						}, ajaxso || {}));
					} else if (options.value) {
						if (typeof options.value === "function") { options.value = options.value(); }
						var i, so, sv, ov, optionInfos = [], optionInfo,
							sep = options.separator === undefined ? ":" : options.separator,
							delim = options.delimiter === undefined ? ";" : options.delimiter,
							mapFunc = function (n, ii) { if (ii > 0) { return n; } };
						if (typeof options.value === "string") {
							so = options.value.split(delim);
							for (i = 0; i < so.length; i++) {
								sv = so[i].split(sep);
								if (sv.length > 2) {
									sv[1] = $.map(sv, mapFunc).join(sep);
								}
								optionInfos.push({
									value: sv[0],
									innerHtml: sv[1],
									selectValue: $.trim(sv[0]),
									selectText: $.trim(sv[1])
								});
							}
						} else if (typeof options.value === "object") {
							var oSv = options.value, key;
							for (key in oSv) {
								if (oSv.hasOwnProperty(key)) {
									optionInfos.push({
										value: key,
										innerHtml: oSv[key],
										selectValue: $.trim(key),
										selectText: $.trim(oSv[key])
									});
								}
							}
						}
						//$(elem).empty();
						for (i = 0; i < optionInfos.length; i++) {
							optionInfo = optionInfos[i];
							ov = document.createElement("option");
							ov.value = optionInfo.value;
							ov.innerHTML = optionInfo.innerHtml;
							elem.appendChild(ov);
							if (!msl && optionInfo.selectValue === $.trim(vl)) {
								ov.selected = "selected";
								isSelected = true;
							}
							if (msl && $.inArray(optionInfo.selectValue, ovm) > -1) {
								ov.selected = "selected";
								isSelected = true;
							}
						}
						if (!isSelected) {
							for (i = 0; i < optionInfos.length; i++) {
								optionInfo = optionInfos[i];
								if (!msl && optionInfo.selectText === $.trim(vl)) {
									ov.selected = "selected";
								}
								if (msl && $.inArray(optionInfo.selectText, ovm) > -1) {
									ov.selected = "selected";
								}
							}
						}
						setAttributes(elem, options, ["value"]);
						jgrid.fullBoolFeedback.call($t, options.selectFilled, "jqGridSelectFilled", {
							elem: elem,
							options: options,
							cm: options.cm,
							cmName: options.cm != null ? options.cm.name : options.name,
							iCol: options.iCol
						});
					}
					break;
				case "text":
				case "password":
				case "button":
					var role;
					if (eltype === "button") {
						role = "button";
					} else {
						role = "textbox";
					}
					elem = document.createElement("input");
					elem.type = eltype;
					setAttributes(elem, options);
					elem.value = vl;
					if (eltype !== "button") {
						if (autowidth) {
							if (!options.size) { $(elem).css({ width: "100%", "box-sizing": "border-box" }); }
						} else if (!options.size) {
							options.size = 20;
						}
					}
					$(elem).attr("role", role);
					break;
				case "image":
				case "file":
					elem = document.createElement("input");
					elem.type = eltype;
					setAttributes(elem, options);
					break;
				case "custom":
					elem = document.createElement("span");
					try {
						if ($.isFunction(options.custom_element)) {
							var celm = options.custom_element.call($t, vl, options);
							if (celm instanceof jQuery || jgrid.isHTMLElement(celm) || typeof celm === "string") {
								celm = $(celm).addClass("customelement").attr({ id: options.id, name: options.name });
								$(elem).empty().append(celm);
							} else {
								throw "editoptions.custom_element returns value of a wrong type";
							}
						} else {
							throw "editoptions.custom_element is not a function";
						}
					} catch (e) {
						if (e === "e1") {
							infoDialog.call($t, errcap, "function 'custom_element' " + editMsg.nodefined, bClose);
						}
						if (e === "e2") {
							infoDialog.call($t, errcap, "function 'custom_element' " + editMsg.novalue, bClose);
						} else {
							infoDialog.call($t, errcap, typeof e === "string" ? e : e.message, bClose);
						}
					}
					break;
			}
			return elem;
		},
		// Date Validation Javascript
		checkDate: function (format, date) {
			var daysInFebruary = function (year) {
					// February has 29 days in any year evenly divisible by four,
					// EXCEPT for centurial years which are not also divisible by 400.
					return (((year % 4 === 0) && (year % 100 !== 0 || (year % 400 === 0))) ? 29 : 28);
				},
				tsp = {},
				sep;
			format = format.toLowerCase();
			//we search for /,-,. for the date separator
			if (format.indexOf("/") !== -1) {
				sep = "/";
			} else if (format.indexOf("-") !== -1) {
				sep = "-";
			} else if (format.indexOf(".") !== -1) {
				sep = ".";
			} else {
				sep = "/";
			}
			format = format.split(sep);
			date = date.split(sep);
			if (date.length !== 3) { return false; }
			var j = -1, yln, dln = -1, mln = -1, i, dv;
			for (i = 0; i < format.length; i++) {
				dv = isNaN(date[i]) ? 0 : parseInt(date[i], 10);
				tsp[format[i]] = dv;
				yln = format[i];
				if (yln.indexOf("y") !== -1) { j = i; }
				if (yln.indexOf("m") !== -1) { mln = i; }
				if (yln.indexOf("d") !== -1) { dln = i; }
			}
			if (format[j] === "y" || format[j] === "yyyy") {
				yln = 4;
			} else if (format[j] === "yy") {
				yln = 2;
			} else {
				yln = -1;
			}
			var strDate, daysInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (j === -1) {
				return false;
			}
			strDate = tsp[format[j]].toString();
			if (yln === 2 && strDate.length === 1) { yln = 1; }
			if (strDate.length !== yln || (tsp[format[j]] === 0 && date[j] !== "00")) {
				return false;
			}
			if (mln === -1) {
				return false;
			}
			strDate = tsp[format[mln]].toString();
			if (strDate.length < 1 || tsp[format[mln]] < 1 || tsp[format[mln]] > 12) {
				return false;
			}
			if (dln === -1) {
				return false;
			}
			strDate = tsp[format[dln]].toString();
			if (strDate.length < 1 || tsp[format[dln]] < 1 || tsp[format[dln]] > 31 || (tsp[format[mln]] === 2 && tsp[format[dln]] > daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]) {
				return false;
			}
			return true;
		},
		isEmpty: function (val) {
			if (val.match(/^\s+$/) || val === "") {
				return true;
			}
			return false;
		},
		checkTime: function (time) {
			// checks only hh:ss (and optional am/pm)
			var re = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/, regs;
			if (!jgrid.isEmpty(time)) {
				regs = time.match(re);
				if (regs) {
					if (regs[3]) {
						if (regs[1] < 1 || regs[1] > 12) { return false; }
					} else {
						if (regs[1] > 23) { return false; }
					}
					if (regs[2] > 59) {
						return false;
					}
				} else {
					return false;
				}
			}
			return true;
		},
		checkValues: function (val, iCol, customobject, nam, options) {
			var edtrul, nm, dft, g = this, p = g.p, colModel = p.colModel, cm, isEmpty = jgrid.isEmpty,
				editMsg = getGridRes.call($(g), "edit.msg"), ret,
				dateMasks = getGridRes.call($(g), "formatter.date.masks");
			if (customobject === undefined) {
				if (typeof iCol === "string") {
					iCol = p.iColByName[iCol];
				}
				if (iCol === undefined || iCol < 0) {
					return [true, "", ""];
				}
				cm = colModel[iCol];
				edtrul = cm.editrules;
				if (cm.formoptions != null) { nm = cm.formoptions.label; }
			} else {
				edtrul = customobject;
				nm = nam === undefined ? "_" : nam;
				cm = colModel[iCol];
			}
			if (edtrul) {
				if (!nm) { nm = p.colNames != null ? p.colNames[iCol] : cm.label; }
				if (edtrul.required === true) {
					if (isEmpty(val)) { return [false, nm + ": " + editMsg.required, ""]; }
				}
				// force required
				var rqfield = edtrul.required === false ? false : true;
				if (edtrul.number === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if (isNaN(val)) { return [false, nm + ": " + editMsg.number, ""]; }
					}
				}
				if (edtrul.minValue !== undefined && !isNaN(edtrul.minValue)) {
					if (parseFloat(val) < parseFloat(edtrul.minValue)) { return [false, nm + ": " + editMsg.minValue + " " + edtrul.minValue, ""]; }
				}
				if (edtrul.maxValue !== undefined && !isNaN(edtrul.maxValue)) {
					if (parseFloat(val) > parseFloat(edtrul.maxValue)) { return [false, nm + ": " + editMsg.maxValue + " " + edtrul.maxValue, ""]; }
				}
				var filter;
				if (edtrul.email === true) {
					if (!(rqfield === false && isEmpty(val))) {
						// taken from $ Validate plugin
						filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
						if (!filter.test(val)) { return [false, nm + ": " + editMsg.email, ""]; }
					}
				}
				if (edtrul.integer === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if (isNaN(val)) { return [false, nm + ": " + editMsg.integer, ""]; }
						if ((val % 1 !== 0) || (val.indexOf(".") !== -1)) { return [false, nm + ": " + editMsg.integer, ""]; }
					}
				}
				if (edtrul.date === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if (cm.formatoptions && cm.formatoptions.newformat) {
							dft = cm.formatoptions.newformat;
							if (dateMasks.hasOwnProperty(dft)) {
								dft = dateMasks[dft];
							}
						} else {
							dft = colModel[iCol].datefmt || "Y-m-d";
						}
						if (!jgrid.checkDate(dft, val)) { return [false, nm + ": " + editMsg.date + " - " + dft, ""]; }
					}
				}
				if (edtrul.time === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if (!jgrid.checkTime(val)) { return [false, nm + ": " + editMsg.date + " - hh:mm (am/pm)", ""]; }
					}
				}
				if (edtrul.url === true) {
					if (!(rqfield === false && isEmpty(val))) {
						filter = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
						if (!filter.test(val)) { return [false, nm + ": " + editMsg.url, ""]; }
					}
				}
				if (edtrul.custom === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if ($.isFunction(edtrul.custom_func)) {
							ret = edtrul.custom_func.call(g, val, nm, iCol);
							return $.isArray(ret) ? ret : [false, editMsg.customarray, ""];
						}
						return [false, editMsg.customfcheck, ""];
					}
				} else if ($.isFunction(edtrul.custom)) {
					if (!(rqfield === false && isEmpty(val))) {
						ret = edtrul.custom.call(g, options);
						return $.isArray(ret) ? ret : [false, editMsg.customarray, ""];
					}
				}
			}
			return [true, "", ""];
		}
	});
	// end module grid.common
}));
