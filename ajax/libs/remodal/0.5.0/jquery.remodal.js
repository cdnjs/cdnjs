/*
 *  Remodal - v0.5.0
 *  Flat, responsive, lightweight, easy customizable modal window plugin with declarative state notation and hash tracking.
 *  http://vodkabears.github.io/remodal/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
!(function($) {
    "use strict";

    /**
     * Remodal settings
     * @private
     */
    var pluginName = "remodal",
        defaults = {
            hashTracking: true,
            closeOnConfirm: true,
            closeOnCancel: true,
            closeOnEscape: true,
            closeOnAnyClick: true
        },

        // Current modal
        current,

        // Scroll position
        scrollTop;

    /**
     * Get a transition duration in ms
     * @param {jQuery} $elem
     * @return {Number}
     * @private
     */
    function getTransitionDuration($elem) {
        var duration = $elem.css("transition-duration") ||
                $elem.css("-webkit-transition-duration") ||
                $elem.css("-moz-transition-duration") ||
                $elem.css("-o-transition-duration") ||
                $elem.css("-ms-transition-duration") ||
                "0s",
            delay = $elem.css("transition-delay") ||
                $elem.css("-webkit-transition-delay") ||
                $elem.css("-moz-transition-delay") ||
                $elem.css("-o-transition-delay") ||
                $elem.css("-ms-transition-delay") ||
                "0s",
            max, len, num, i;

        duration = duration.split(", ");
        delay = delay.split(", ");

        // The duration length is the same as the delay length
        for (i = 0, len = duration.length, max = Number.NEGATIVE_INFINITY; i < len; i++) {
            num = parseFloat(duration[i]) + parseFloat(delay[i]);

            if (num > max) {
                max = num;
            }
        }

        return num * 1000;
    }

    /**
     * Get a scrollbar width
     * @return {Number}
     * @private
     */
    function getScrollbarWidth() {
        if ($(document.body).height() <= $(window).height()) {
            return 0;
        }

        var outer = document.createElement("div"),
            inner = document.createElement("div"),
            widthNoScroll,
            widthWithScroll;

        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        document.body.appendChild(outer);

        widthNoScroll = outer.offsetWidth;

        // Force scrollbars
        outer.style.overflow = "scroll";

        // Add innerdiv
        inner.style.width = "100%";
        outer.appendChild(inner);

        widthWithScroll = inner.offsetWidth;

        // Remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }

    /**
     * Lock screen
     * @private
     */
    function lockScreen() {
        var $body = $(document.body),

            // Zepto does not support '-=', '+=' in the `css` method
            paddingRight = parseInt($body.css("padding-right"), 10) + getScrollbarWidth();

        $body.css("padding-right", paddingRight + "px");
        $("html").addClass(pluginName + "-is-locked");
    }

    /**
     * Unlock screen
     * @private
     */
    function unlockScreen() {
        var $body = $(document.body),

            // Zepto does not support '-=', '+=' in the `css` method
            paddingRight = parseInt($body.css("padding-right"), 10) - getScrollbarWidth();

        $body.css("padding-right", paddingRight + "px");
        $("html").removeClass(pluginName + "-is-locked");
    }

    /**
     * Parse string with options
     * @param str
     * @returns {Object}
     * @private
     */
    function parseOptions(str) {
        var obj = {},
            arr, len, val, i;

        // Remove spaces before and after delimiters
        str = str.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",");

        // Parse string
        arr = str.split(",");
        for (i = 0, len = arr.length; i < len; i++) {
            arr[i] = arr[i].split(":");
            val = arr[i][1];

            // Convert string value if it is like a boolean
            if (typeof val === "string" || val instanceof String) {
                val = val === "true" || (val === "false" ? false : val);
            }

            // Convert string value if it is like a number
            if (typeof val === "string" || val instanceof String) {
                val = !isNaN(val) ? +val : val;
            }

            obj[arr[i][0]] = val;
        }

        return obj;
    }

    /**
     * Remodal constructor
     * @param {jQuery} $modal
     * @param {Object} options
     * @constructor
     */
    function Remodal($modal, options) {
        var remodal = this,
            tdOverlay,
            tdModal,
            tdBg;

        remodal.settings = $.extend({}, defaults, options);

        // Build DOM
        remodal.$body = $(document.body);
        remodal.$overlay = $("." + pluginName + "-overlay");

        if (!remodal.$overlay.length) {
            remodal.$overlay = $("<div>").addClass(pluginName + "-overlay");
            remodal.$body.append(remodal.$overlay);
        }

        remodal.$bg = $("." + pluginName + "-bg");
        remodal.$closeButton = $("<a href='#'></a>").addClass(pluginName + "-close");
        remodal.$wrapper = $("<div>").addClass(pluginName + "-wrapper");
        remodal.$modal = $modal;
        remodal.$modal.addClass(pluginName);
        remodal.$modal.css("visibility", "visible");

        remodal.$modal.append(remodal.$closeButton);
        remodal.$wrapper.append(remodal.$modal);
        remodal.$body.append(remodal.$wrapper);
        remodal.$confirmButton = remodal.$modal.find("." + pluginName + "-confirm");
        remodal.$cancelButton = remodal.$modal.find("." + pluginName + "-cancel");

        // Calculate timeouts
        tdOverlay = getTransitionDuration(remodal.$overlay);
        tdModal = getTransitionDuration(remodal.$modal);
        tdBg = getTransitionDuration(remodal.$bg);
        remodal.td = tdModal > tdOverlay ? tdModal : tdOverlay;
        remodal.td = tdBg > remodal.td ? tdBg : remodal.td;

        // Add close button event listener
        remodal.$closeButton.bind("click." + pluginName, function(e) {
            e.preventDefault();

            remodal.close();
        });

        // Add cancel button event listener
        remodal.$cancelButton.bind("click." + pluginName, function(e) {
            e.preventDefault();

            remodal.$modal.trigger("cancel");

            if (remodal.settings.closeOnCancel) {
                remodal.close("cancellation");
            }
        });

        // Add confirm button event listener
        remodal.$confirmButton.bind("click." + pluginName, function(e) {
            e.preventDefault();

            remodal.$modal.trigger("confirm");

            if (remodal.settings.closeOnConfirm) {
                remodal.close("confirmation");
            }
        });

        // Add keyboard event listener
        $(document).bind("keyup." + pluginName, function(e) {
            if (e.keyCode === 27 && remodal.settings.closeOnEscape) {
                remodal.close();
            }
        });

        // Add overlay event listener
        remodal.$wrapper.bind("click." + pluginName, function(e) {
            var $target = $(e.target);

            if (!$target.hasClass(pluginName + "-wrapper")) {
                return;
            }

            if (remodal.settings.closeOnAnyClick) {
                remodal.close();
            }
        });

        remodal.index = $[pluginName].lookup.push(remodal) - 1;
        remodal.busy = false;
    }

    /**
     * Open the modal window
     * @public
     */
    Remodal.prototype.open = function() {
        // Check if animation is complete
        if (this.busy) {
            return;
        }

        var remodal = this,
            id;

        remodal.busy = true;
        remodal.$modal.trigger("open");

        id = remodal.$modal.attr("data-" + pluginName + "-id");

        if (id && remodal.settings.hashTracking) {
            scrollTop = $(window).scrollTop();
            location.hash = id;
        }

        if (current && current !== remodal) {
            current.$overlay.hide();
            current.$wrapper.hide();
            current.$body.removeClass(pluginName + "-is-active");
        }

        current = remodal;

        lockScreen();
        remodal.$overlay.show();
        remodal.$wrapper.show();

        setTimeout(function() {
            remodal.$body.addClass(pluginName + "-is-active");

            setTimeout(function() {
                remodal.busy = false;
                remodal.$modal.trigger("opened");
            }, remodal.td + 50);
        }, 25);
    };

    /**
     * Close the modal window
     * @public
     * @param {String|undefined} reason A reason to close
     */
    Remodal.prototype.close = function(reason) {

        // Check if the animation was completed
        if (this.busy) {
            return;
        }

        this.busy = true;
        this.$modal.trigger({
            type: "close",
            reason: reason
        });

        var remodal = this;

        if (remodal.settings.hashTracking &&
            remodal.$modal.attr("data-" + pluginName + "-id") === location.hash.substr(1)) {

            location.hash = "";
            $(window).scrollTop(scrollTop);
        }

        remodal.$body.removeClass(pluginName + "-is-active");

        setTimeout(function() {
            remodal.$overlay.hide();
            remodal.$wrapper.hide();
            unlockScreen();

            remodal.busy = false;
            remodal.$modal.trigger({
                type: "closed",
                reason: reason
            });
        }, remodal.td + 50);
    };

    /**
     * Special plugin object for instances.
     * @type {Object}
     * @public
     */
    $[pluginName] = {
        lookup: []
    };

    /**
     * Plugin constructor
     * @param {Object} options
     * @returns {JQuery}
     * @constructor
     */
    $.fn[pluginName] = function(opts) {
        var instance,
            $elem;

        this.each(function(index, elem) {
            $elem = $(elem);

            if ($elem.data(pluginName) == null) {
                instance = new Remodal($elem, opts);
                $elem.data(pluginName, instance.index);

                if (instance.settings.hashTracking &&
                    $elem.attr("data-" + pluginName + "-id") === location.hash.substr(1)) {

                    instance.open();
                }
            } else {
                instance = $[pluginName].lookup[$elem.data(pluginName)];
            }
        });

        return instance;
    };

    $(document).ready(function() {

        // data-remodal-target opens a modal window with the special Id.
        $(document).on("click", "[data-" + pluginName + "-target]", function(e) {
            e.preventDefault();

            var elem = e.currentTarget,
                id = elem.getAttribute("data-" + pluginName + "-target"),
                $target = $("[data-" + pluginName + "-id=" + id + "]");

            $[pluginName].lookup[$target.data(pluginName)].open();
        });

        // Auto initialization of modal windows.
        // They should have the 'remodal' class attribute.
        // Also you can write `data-remodal-options` attribute to pass params into the modal.
        $(document).find("." + pluginName).each(function(i, container) {
            var $container = $(container),
                options = $container.data(pluginName + "-options");

            if (!options) {
                options = {};
            } else if (typeof options === "string" || options instanceof String) {
                options = parseOptions(options);
            }

            $container[pluginName](options);
        });
    });

    /**
     * Hashchange handler
     * @param {Event} e
     * @param {Boolean} [closeOnEmptyHash=true]
     * @private
     */
    function hashHandler(e, closeOnEmptyHash) {
        var id = location.hash.replace("#", ""),
            instance,
            $elem;

        if (typeof closeOnEmptyHash === "undefined") {
            closeOnEmptyHash = true;
        }

        if (!id) {
            if (closeOnEmptyHash) {

                // Check if we have currently opened modal and animation is complete
                if (current && !current.busy && current.settings.hashTracking) {
                    current.close();
                }
            }
        } else {

            // Catch syntax error if your hash is bad
            try {
                $elem = $(
                    "[data-" + pluginName + "-id=" +
                    id.replace(new RegExp("/", "g"), "\\/") + "]"
                );
            } catch (err) {}

            if ($elem && $elem.length) {
                instance = $[pluginName].lookup[$elem.data(pluginName)];

                if (instance && instance.settings.hashTracking) {
                    instance.open();
                }
            }

        }
    }

    $(window).bind("hashchange." + pluginName, hashHandler);

})(window.jQuery || window.Zepto);
