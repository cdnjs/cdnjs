/**
 * @license ContextMenu - jQuery plugin for right-click context menus
 *
 * Author: Chris Domigan
 * Contributors: Dan G. Switzer, II
 * Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Version: r2
 * Date: 16 July 2007
 *
 * For documentation visit http://www.trendskitchens.co.nz/jquery/contextmenu/
 *
 * Updated: include support jQuery UI CSS classes existing starting with version 1.8
 *          and the currents modified CSS classes of version jQuery UI 1.9
 * by Oleg Kiriljuk, oleg.kiriljuk@ok-soft.gmbh.com
 * Date: 24 December 2011
 *
 * Updated by Oleg Kiriljuk to support jQuery UI 1.10 and 1.11
 * Date: 17 March 2015
 */

/*global jQuery, define */
/*jslint devel: true, browser: true, plusplus: true, eqeq: true */
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
    var menu, shadow, content, hash, currentTarget,
        versionParts = $.ui != null && typeof $.ui.version === "string" ? /^([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec($.ui.version) : [],
        isAncorRequired = versionParts != null && versionParts.length === 4 && versionParts[1] === "1" && versionParts[2] < 11,
        defaults = {
            menuClasses: "ui-menu ui-widget ui-widget-content ui-corner-all",
            menuIconClasses: "ui-menu-icons ui-menu ui-widget ui-widget-content ui-corner-all",
            menuDivStyle: {
                position: "absolute",
                zIndex: "500"
            },
            menuStyle: {
                width: "100%"
            },
            itemClasses: "ui-menu-item",
            itemStyle: {},
            itemHoverStyle: {},
            itemAnchorClasses: "ui-corner-all",
            itemAnchorStyle: {
                position: "relative",
                paddingRight: "0"
            },
            itemIconAnchorStyle: {
                paddingLeft: "2em"
            },
            itemIconSpanStyle: {
                left: ".2em",
                top: ".3em",
                marginRight: ".5em",
                position: "absolute",
                "float": "left"
            },
            itemHoverAnchorClasses: "ui-state-hover",
            eventPosX: "pageX",
            eventPosY: "pageY",
            shadow: true,
            menuShadowClasses: "ui-widget-shadow",
            menuShadowStyle: {
                position: "absolute",
                zIndex: "499",
                margin: "0",
                padding: "1px 0 0 6px"
            },
            onContextMenu: null,
            onShowMenu: null
        };

    $.fn.contextMenu = function (id, options) {
        hash = hash || [];
        hash.push({
            id: id,
            menuDivStyle: $.extend({}, defaults.menuDivStyle, options.menuDivStyle || {}),
            menuStyle: $.extend({}, defaults.menuStyle, options.menuStyle || {}),
            menuShadowStyle: $.extend({}, defaults.menuShadowStyle, options.menuShadowStyle || {}),
            itemStyle: $.extend({}, defaults.itemStyle, options.itemStyle || {}),
            itemHoverStyle: $.extend({}, defaults.itemHoverStyle, options.itemHoverStyle || {}),
            menuClasses: options.menuClasses || defaults.menuClasses,
            menuIconClasses: options.menuIconClasses || defaults.menuIconClasses,
            menuShadowClasses: options.menuShadowClasses || defaults.menuShadowClasses,
            itemClasses: options.itemClasses || defaults.itemClasses,
            itemAnchorClasses: options.itemAnchorClasses || defaults.itemAnchorClasses,
            itemAnchorStyle: $.extend({}, defaults.itemAnchorStyle, options.itemAnchorStyle || {}),
            itemIconSpanStyle: $.extend({}, defaults.itemIconSpanStyle, options.itemIconSpanStyle || {}),
            itemIconAnchorStyle: $.extend({}, defaults.itemIconAnchorStyle, options.itemIconAnchorStyle || {}),
            itemHoverAnchorClasses: options.itemHoverAnchorClasses || defaults.itemHoverAnchorClasses,
            bindings: options.bindings || {},
            shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
            onContextMenu: options.onContextMenu || defaults.onContextMenu,
            onShowMenu: options.onShowMenu || defaults.onShowMenu,
            eventPosX: options.eventPosX || defaults.eventPosX,
            eventPosY: options.eventPosY || defaults.eventPosY
        });

        function hide() {
            menu.hide().attr("aria-hidden", "true");
            shadow.hide().attr("aria-hidden", "true");
        }
        function display(i, trigger, e) {
            var cur = hash[i], items;
            content = $("#" + cur.id).find("ul:first").clone(true);

            // Send the content to the menu
            menu.html(content);

            // if there's an onShowMenu, run it now -- must run after content has been added
            // if you try to alter the content variable before the menu.html(), IE6 has issues
            // updating the content
            if (!!cur.onShowMenu) { menu = cur.onShowMenu(e, menu); }

            if (cur.menuClasses) {
                if (cur.menuIconClasses && content.find(".ui-icon").length > 0) {
                    content.addClass(cur.menuIconClasses);
                } else {
                    content.addClass(cur.menuClasses);
                }
            }
            if (!$.isEmptyObject(cur.menuStyle)) {
                content.css(cur.menuStyle);
            }
            items = content.attr("role", "menu").find("li");

            if (cur.itemClasses) {
                items.addClass(cur.itemClasses).attr("role", isAncorRequired ? "presentation" : "menuitem");
            }
            if (!$.isEmptyObject(cur.itemStyle)) {
                items.css(cur.itemStyle);
            }

            if (cur.itemAnchorClasses) {
                if (isAncorRequired) {
                    items.children("a").addClass(cur.itemAnchorClasses).filter(":not([role])").attr("role", "menuitem");
                } else {
                    items.addClass(cur.itemAnchorClasses);
                }
            }
            if (!$.isEmptyObject(cur.itemAnchorStyle)) {
                items.children("a").css(cur.itemAnchorStyle);
            }
            if (!$.isEmptyObject(cur.itemIconSpanStyle)) {
                items.children("a").children("span.ui-icon").css(cur.itemIconSpanStyle).parent("a").css(cur.itemIconAnchorStyle);
            }

            if ($.isEmptyObject(cur.itemHoverStyle)) {
                items.hover(
                    function () {
                        //$(this).siblings().children(".ui-state-active").removeClass("ui-state-active");
                        var menuItem = isAncorRequired ? $(this).children("a") : $(this);
                        menuItem.addClass(cur.itemHoverAnchorClasses);

                    },
                    function () {
                        var menuItem = isAncorRequired ? $(this).children("a") : $(this);
                        menuItem.removeClass(cur.itemHoverAnchorClasses);
                    }
                );
            } else if (!$.isEmptyObject(cur.itemHoverStyle)) {
                items.hover(
                    function () {
                        $(this).css(cur.itemHoverStyle);
                    },
                    function () {
                        $(this).css(cur.itemStyle);
                    }
                );
            }
            items.find("img").css({ verticalAlign: "middle", paddingRight: "2px" });

            $.each(cur.bindings, function (menuItemId, func) {
                $("#" + menuItemId, menu).bind("click", function () {
                    hide();
                    func(trigger, currentTarget);
                });
            });

            menu.css({
                left: e[cur.eventPosX],
                top: e[cur.eventPosY],
                "white-space": "pre"
            }).show().removeAttr("aria-hidden");
            if (cur.shadow) {
                shadow.css({
                    width: menu.width(),
                    height: menu.height(),
                    left: e.pageX + 2,
                    top: e.pageY + 2
                }).show().removeAttr("aria-hidden");
            }
            var of = menu.offset(), topDelta = 0;
            if (of.top + menu.height() > $(window).scrollTop() + window.innerHeight) {
                topDelta = $(window).scrollTop() - of.top - menu.height() + window.innerHeight;
                of.top += topDelta;
                menu.offset(of);
                of = shadow.offset();
                of.top += topDelta;
                shadow.offset(of);
            }
            /*of = menu.offset(), topDelta = 0;
            if (of.left + menu.width() > $(window).scrollLeft() + window.innerWidth) {
                topDelta = $(window).scrollLeft() - of.top - menu.width() + window.innerWidth;
                of.left += topDelta;
                menu.offset(of);
                of = shadow.offset();
                of.left += topDelta;
                shadow.offset(of);
            }*/
            $(document).one("click", hide);
        }

        var index = hash.length - 1;
        if (!menu) { // Create singleton menu
            menu = $("<div class=\"jqContextMenu\"></div>")
                .hide()
                .attr("aria-hidden", "true")
                .css(hash[index].menuDivStyle)
                .appendTo("body")
                .bind("click", function (e) {
                    e.stopPropagation();
                }).mouseleave(function (e) {
                    if (e.pageX === -1 && e.pageY === -1) {
                        return; // over tooltip
                    }
                    hide();
                });
        }
        if (!shadow) {
            shadow = $("<div></div>")
                 .addClass(hash[index].menuShadowClasses)
                 .css(hash[index].menuShadowStyle)
                 .appendTo("body")
                 .hide().attr("aria-hidden", "true");
        }
        $(this).bind("contextmenu", function (e) {
            // Check if onContextMenu() defined
            var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
            currentTarget = e.target;
            if (bShowContext) {
                display(index, this, e, options);
                return false;
            }
            hide();
            return true;
        });
        return this;
    };

    // Apply defaults
    $.contextMenu = {
        defaults: function (userDefaults) {
            $.each(userDefaults, function (i, val) {
                if (typeof val === "object" && defaults[i]) {
                    $.extend(defaults[i], val);
                } else {
                    defaults[i] = val;
                }
            });
        }
    };

    $(function () {
        $("div.contextMenu").hide().attr("aria-hidden", "true");
    });
}));
