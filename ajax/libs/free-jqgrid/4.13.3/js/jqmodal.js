/**
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqmodal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Version: 07/06/2008 +r13
 * Changed by Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 */
/*jslint browser: true, nomen: true, plusplus: true, white: true */
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
	// begin module jqmodal
	var jqmHashLength = 0,
		jqmHash,
		createdModals = [],
		setFocusOnFirstVisibleInput = function (h) {
			try {
				$(":input:visible", h.w).first().focus();
			} catch (ignore) {}
		},
		setFocus = function (h) {
			setFocusOnFirstVisibleInput(h);
		},
		keyOrMouseEventHandler = function (e) {
			var activeModal = jqmHash[createdModals[createdModals.length - 1]],
				modal = !$(e.target).parents(".jqmID" + activeModal.s)[0],
				targetOffset = $(e.target).offset(),
				eX = e.pageX !== undefined ? e.pageX : targetOffset.left,
				eY = e.pageY !== undefined ? e.pageY : targetOffset.top,
				isEventInsideOfModal = function () {
					var isInside = false;
					$(".jqmID" + activeModal.s).each(function () {
						var $self = $(this), offset = $self.offset();
						// mouse event have e.pageX and e.pageY
						// keyboard event have e.type == "keydown" or "keypress",
						// e.pageX and e.pageY are undefined and one can use
						// $(e.target).offset()
						if (offset.top <= eY && eY <= offset.top + $self.height() &&
								offset.left <= eX && eX <= offset.left + $self.width()) {
							isInside = true;
							return false; // stop enumeration
						}
					});
					return isInside;
				};
			if (e.type !== "mousedown" && isEventInsideOfModal()) {
				// allows keyboard events inside of the modal
				return true;
			}
			if (e.type === "mousedown" && modal) {
				if (isEventInsideOfModal()) {
					modal = false;
				}
				if (modal && !$(e.target).is(":input")) {
					setFocusOnFirstVisibleInput(activeModal);
				}
			}
			return !modal;
		},
		bindOrUnbindEvents = function (bindOrUnbind) {
			// bindOrUnbind is either "bind" or "unbind" string
			$(document)[bindOrUnbind]("keypress keydown mousedown", keyOrMouseEventHandler);
		},
		registerHideOrShow = function (w, trigger, key) {
			return w.each(function () {
				var jqm = this._jqm;
				$(trigger).each(function () {
					if (!this[key]) {
						this[key] = [];
						$(this).click(function () {
							var i, method, propertyName, methods = ["jqmShow", "jqmHide"];
							for (i = 0; i < methods.length; i++) {
								method = methods[i];
								for (propertyName in this[method]) {
									if (this[method].hasOwnProperty(propertyName) && jqmHash[this[method][propertyName]]) {
										jqmHash[this[method][propertyName]].w[method](this);
									}
								}
							}
							return false;
						});
					}
					this[key].push(jqm);
				});
			});
		};

	$.fn.jqm = function (o) {
		var p = {
			overlay: 50,
			closeoverlay: false,
			overlayClass: "jqmOverlay",
			closeClass: "jqmClose",
			trigger: ".jqModal",
			ajax: false,
			ajaxText: "",
			target: false,
			modal: false,
			toTop: false,
			onShow: false,
			onHide: false,
			onLoad: false
		};
		return this.each(function () {
			if (this._jqm) {
				jqmHash[this._jqm].c = $.extend({}, jqmHash[this._jqm].c, o);
				return jqmHash[this._jqm].c;
			}
			jqmHashLength++;
			this._jqm = jqmHashLength;
			jqmHash[jqmHashLength] = {
				// comment from https://github.com/briceburg/jqModal/blob/master/jqModal.js
				// hash object;
				//  w: (jQuery object) The modal element
				//  c: (object) The modal's options object
				//  o: (jQuery object) The overlay element
				//  t: (DOM object) The triggering element
				c: $.extend(p, $.jqm.params, o),
				a: false,
				w: $(this).addClass("jqmID" + jqmHashLength),
				s: jqmHashLength // used as id too
			};
			if (p.trigger) {
				$(this).jqmAddTrigger(p.trigger);
			}
		});
	};

	$.fn.jqmAddClose = function (trigger) {
		return registerHideOrShow(this, trigger, "jqmHide");
	};
	$.fn.jqmAddTrigger = function (trigger) {
		return registerHideOrShow(this, trigger, "jqmShow");
	};
	$.fn.jqmShow = function (trigger) {
		return this.each(function () {
			$.jqm.open(this._jqm, trigger);
		});
	};
	$.fn.jqmHide = function (trigger) {
		return this.each(function () {
			$.jqm.close(this._jqm, trigger);
		});
	};

	$.jqm = {
		hash: {},
		open: function (s, trigger) {
			var h = jqmHash[s], $overlay, target, url,
				options = h.c, parentOffset = h.w.parent().offset(), left, top,
				cc = "." + options.closeClass,
				z = (parseInt(h.w.css("z-index"), 10));
			z = (z > 0) ? z : 3000;
			$overlay = $("<div></div>").css({
				height: "100%",
				width: "100%",
				position: "fixed",
				left: 0,
				top: 0,
				"z-index": z - 1,
				opacity: options.overlay / 100
			});
			if (h.a) {
				return false;
			}
			h.t = trigger;
			h.a = true;
			h.w.css("z-index", z);
			if ($(h.w[0].ownerDocument).data("ui-dialog-overlays")) {
				h.w.addClass("ui-dialog"); // hack to allow input inside of jQuery UI modal
			}
			if (options.modal) {
				if (!createdModals[0]) {
					setTimeout(function () {
						bindOrUnbindEvents("bind");
					}, 1);
				}
				createdModals.push(s);
			} else if (options.overlay > 0) {
				if (options.closeoverlay) {
					h.w.jqmAddClose($overlay);
				}
			} else {
				$overlay = false;
			}

			h.o = $overlay ? $overlay.addClass(options.overlayClass).prependTo("body") : false;

			if (options.ajax) {
				target = options.target || h.w;
				url = options.ajax;
				target = (typeof target === "string") ? $(target, h.w) : $(target);
				url = (url.substr(0, 1) === "@") ? $(trigger).attr(url.substring(1)) : url;
				target.html(options.ajaxText)
					.load(url, function () {
						if (options.onLoad) {
							options.onLoad.call(this, h);
						}
						if (cc) {
							h.w.jqmAddClose($(cc, h.w));
						}
						setFocus(h);
					});
			} else if (cc) {
				h.w.jqmAddClose($(cc, h.w));
			}

			if (options.toTop && h.o) {
				parentOffset = h.w.parent().offset();
				left = parseFloat(h.w.css("left") || 0);
				top = parseFloat(h.w.css("top") || 0);
				h.w.before('<span id="jqmP' + h.w[0]._jqm + '"></span>')
					.insertAfter(h.o);
				h.w.css({ top: parentOffset.top + top, left: parentOffset.left + left });
			}
			if (options.onShow) {
				options.onShow(h);
			} else {
				h.w.show();
			}
			setFocus(h);
			return false;
		},
		close: function (s) {
			var h = jqmHash[s];
			if (!h.a) {
				return false;
			}
			h.a = false;
			if (createdModals[0]) {
				createdModals.pop();
				if (!createdModals[0]) {
					bindOrUnbindEvents("unbind");
				}
			}
			if (h.c.toTop && h.o) {
				$("#jqmP" + h.w[0]._jqm)
					.after(h.w)
					.remove();
			}
			if (h.c.onHide) {
				h.c.onHide(h);
			} else {
				h.w.hide();
				if (h.o) {
					h.o.remove();
				}
			}
			return false;
		},
		params: {}
	};
	jqmHash = $.jqm.hash;
	// end module jqmodal
}));
