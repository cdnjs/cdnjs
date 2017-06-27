/*! Remodal - v0.1.7 - 2014-07-14
 * https://github.com/VodkaBears/remodal
 * Copyright (c) 2014 VodkaBears; */
;(function ($) {
    "use strict";

    /**
     * Remodal settings
     */
    var pluginName = "remodal",
        defaults = {
            hashTracking: true,
            closeOnConfirm: true,
            closeOnCancel: true
        };

    /**
     * Special plugin object for instances.
     * @type {Object}
     */
    $[pluginName] = {
        lookup: []
    };

    var current, // current modal
        scrollTop; // scroll position

    /**
     * Get transition duration in ms
     * @return {Number}
     */
    var getTransitionDuration = function ($elem) {
        var duration = $elem.css('transition-duration') ||
            $elem.css('-webkit-transition-duration') ||
            $elem.css('-moz-transition-duration') ||
            $elem.css('-o-transition-duration') ||
            $elem.css('-ms-transition-duration') ||
            0;
        var delay = $elem.css('transition-delay') ||
            $elem.css('-webkit-transition-delay') ||
            $elem.css('-moz-transition-delay') ||
            $elem.css('-o-transition-delay') ||
            $elem.css('-ms-transition-delay') ||
            0;

        return (parseFloat(duration) + parseFloat(delay)) * 1000;
    };

    /**
     * Get a scrollbar width
     * @return {Number}
     */
    var getScrollbarWidth = function () {
        if ($(document.body).height() <= $(window).height()) {
            return 0;
        }

        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = "scroll";

        // add innerdiv
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        // remove divs
        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    };

    /**
     * Lock screen
     */
    var lockScreen = function () {
        $("html, body").addClass(pluginName + "_lock");
        $(document.body).css("padding-right", "+=" + getScrollbarWidth());
    };

    /**
     * Unlock screen
     */
    var unlockScreen = function () {
        $("html, body").removeClass(pluginName + "_lock");
        $(document.body).css("padding-right", "-=" + getScrollbarWidth());
    };

    /**
     * Remodal constructor
     */
    function Remodal(modal, options) {
        this.settings = $.extend({}, defaults, options);
        this.modal = modal;
        this.buildDOM();
        this.addEventListeners();
        this.index = $[pluginName].lookup.push(this) - 1;
        this.busy = false;
    }

    /**
     * Build required DOM
     */
    Remodal.prototype.buildDOM = function () {
        this.body = $(document.body);
        this.bg = $("." + pluginName + "-bg");
        this.modalClose = $("<a href='#'>").addClass(pluginName + "-close");
        this.overlay = $("<div>").addClass(pluginName + "-overlay");
        if (!this.modal.hasClass(pluginName)) {
            this.modal.addClass(pluginName);
        }

        this.modal.css("visibility", "visible");
        this.modal.append(this.modalClose);
        this.overlay.append(this.modal);
        this.body.append(this.overlay);

        this.confirm = this.modal.find("." + pluginName + "-confirm");
        this.cancel = this.modal.find("." + pluginName + "-cancel");

        var tdOverlay = getTransitionDuration(this.overlay),
            tdModal = getTransitionDuration(this.modal),
            tdBg = getTransitionDuration(this.bg);
        this.td = tdModal > tdOverlay ? tdModal : tdOverlay;
        this.td = tdBg > this.td ? tdBg : this.td;
    };

    /**
     * Add event listeners to the current modal window
     */
    Remodal.prototype.addEventListeners = function () {
        var self = this;

        this.modalClose.bind("click." + pluginName, function (e) {
            e.preventDefault();
            self.close();
        });

        this.cancel.bind("click." + pluginName, function (e) {
            e.preventDefault();
            self.modal.trigger("cancel");
            if (self.settings.closeOnCancel) {
                self.close();
            }
        });

        this.confirm.bind("click." + pluginName, function (e) {
            e.preventDefault();
            self.modal.trigger("confirm");
            if (self.settings.closeOnConfirm) {
                self.close();
            }
        });

        $(document).bind('keyup.' + pluginName, function (e) {
            if (e.keyCode === 27) {
                self.close();
            }
        });

        this.overlay.bind("click." + pluginName, function (e) {
            var $target = $(e.target);
            if (!$target.hasClass(pluginName + "-overlay")) {
                return;
            }

            self.close();
        });
    };

    /**
     * Open modal window
     */
    Remodal.prototype.open = function () {
        // check if animation is complete
        if (this.busy) {
            return;
        }
        this.busy = true;

        this.modal.trigger("open");

        var id = this.modal.attr("data-" + pluginName + "-id");
        if (id && this.settings.hashTracking) {
            scrollTop = $(window).scrollTop();
            location.hash = id;
        }

        if (current && current !== this) {
            current.overlay.hide();
            current.body.removeClass(pluginName + "_active");
        }
        current = this;

        lockScreen();
        this.overlay.show();

        var self = this;
        setTimeout(function () {
            self.body.addClass(pluginName + "_active");

            setTimeout(function () {
                self.busy = false;
                self.modal.trigger("opened");
            }, self.td + 50);
        }, 25);
    };

    /**
     * Close modal window
     */
    Remodal.prototype.close = function () {
        // check if animation is complete
        if (this.busy) {
            return;
        }
        this.busy = true;

        this.modal.trigger("close");

        if (this.settings.hashTracking &&
            this.modal.attr("data-" + pluginName + "-id") === location.hash.substr(1)) {
            location.hash = "";
            $(window).scrollTop(scrollTop);
        }

        this.body.removeClass(pluginName + "_active");

        var self = this;
        setTimeout(function () {
            self.overlay.hide();
            unlockScreen();

            self.busy = false;
            self.modal.trigger("closed");
        }, self.td + 50);
    };

    if ($) {
        $["fn"][pluginName] = function (opts) {
            var instance;
            this["each"](function (i, e) {
                var $e = $(e);
                if ($e.data(pluginName) == null) {
                    instance = new Remodal($e, opts);
                    $e.data(pluginName, instance.index);

                    if (instance.settings.hashTracking &&
                        $e.attr("data-" + pluginName + "-id") === location.hash.substr(1)) {
                        instance.open();
                    }
                }
            });

            return instance;
        };
    }

    $(document).ready(function () {
        /**
         * data-remodal-target opens a modal window with a special id without hash change.
         */
        $(document).on("click", "[data-" + pluginName + "-target]", function (e) {
            e.preventDefault();

            var elem = e.currentTarget,
                id = elem.getAttribute("data-" + pluginName + "-target"),
                $target = $("[data-" + pluginName + "-id=" + id + "]");

            $[pluginName].lookup[$target.data(pluginName)].open();
        });

        /**
         * Auto initialization of modal windows.
         * They should have the 'remodal' class attribute.
         * Also you can pass params into the modal throw the data-remodal-options attribute.
         * data-remodal-options must be a valid JSON string.
         */
        $(document).find("." + pluginName).each(function (i, container) {
            var $container = $(container),
                options = $container.data(pluginName + "-options");

            if (!options) {
                options = {};
            }

            $container[pluginName](options);
        });
    });

    /**
     * Hashchange handling to show a modal with a special id.
     */
    var hashHandler = function (e, closeOnEmptyHash) {
        var id = location.hash.replace("#", "");

        if (typeof closeOnEmptyHash === "undefined") {
            closeOnEmptyHash = true;
        }

        if (!id) {
            if (closeOnEmptyHash) {
                // check if we have currently opened modal and animation is complete
                if (current && !current.busy && current.settings.hashTracking) {
                    current.close();
                }
            }
        } else {
            var $elem;

            // Catch syntax error if your hash is bad
            try {
                $elem = $("[data-" + pluginName + "-id=" + id.replace(new RegExp('/', 'g'), "\\/") + "]");
            } catch (e) {}

            if ($elem && $elem.length) {
                var instance = $[pluginName].lookup[$elem.data(pluginName)];

                if (instance && instance.settings.hashTracking) {
                    instance.open();
                }
            }

        }
    };
    $(window).bind("hashchange." + pluginName, hashHandler);
})(window["jQuery"] || window["Zepto"]);