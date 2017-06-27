/*! Remodal - v0.1.0 - 2014-02-15
 * https://github.com/VodkaBears/remodal
 * Copyright (c) 2014 VodkaBears; */
;
(function ($) {
    "use strict";

    /**
     * Remodal settings
     */
    var pluginName = "remodal",
        defaults = {
            hashTracking: true
        };

    /**
     * Instances of modal windows.
     * @type {Array}
     */
    var instances = [];

    /**
     * Current modal
     */
    var current;

    /**
     * Get transition duration in ms
     * @return {Number}
     */
    var getTransitionDuration = function ($elem) {
        var duration = $elem.css('transitionDuration') ||
            $elem.css('webkitTransitionDuration') ||
            $elem.css('mozTransitionDuration') ||
            $elem.css('oTransitionDuration') ||
            $elem.css('msTransitionDuration') ||
            0;
        var delay = $elem.css('transitionDelay') ||
            $elem.css('webkitTransitionDelay') ||
            $elem.css('mozTransitionDelay') ||
            $elem.css('oTransitionDelay') ||
            $elem.css('msTransitionDelay') ||
            0;

        return (parseFloat(duration) + parseFloat(delay)) * 1000;
    };

    var getScrollbarWidth = function () {
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
     * Remodal constructor
     */
    function Remodal(modal, options) {
        this.settings = $.extend({}, defaults, options);
        this.modal = modal;
        this.buildDOM();
        this.addEventListeners();
        this.index = instances.push(this) - 1;
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
        this.modalClose.bind("click." + pluginName, function (e) {
            e.preventDefault();
            this.close();
        }.bind(this));

        this.cancel.bind("click." + pluginName, function (e) {
            e.preventDefault();
            this.modal.trigger("cancel");
            this.close();
        }.bind(this));

        this.confirm.bind("click." + pluginName, function (e) {
            e.preventDefault();
            this.modal.trigger("confirm");
            this.close();
        }.bind(this));

        $(document).bind('keyup.' + pluginName, function (e) {
            if (e.keyCode === 27) {
                this.close();
            }
        }.bind(this));

        this.overlay.bind("click." + pluginName, function (e) {
            var $target = $(e.target);
            if (!$target.hasClass(pluginName + "-overlay")) {
                return;
            }

            this.close();
        }.bind(this));
    };

    /**
     * Lock screen
     */
    Remodal.prototype.lockScreen = function () {
        $("html, body").addClass(pluginName + "_lock");
        this.body.css("padding-right", "+=" + getScrollbarWidth());
    };

    /**
     * Unlock screen
     */
    Remodal.prototype.unlockScreen = function () {
        $("html, body").removeClass(pluginName + "_lock");
        this.body.css("padding-right", "-=" + getScrollbarWidth());
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
            location.hash = id;
        }

        if (current && current !== this) {
            current.overlay.hide();
            current.body.removeClass(pluginName + "_active");
        }
        current = this;

        this.lockScreen();
        this.overlay.show();
        setTimeout(function () {
            this.body.addClass(pluginName + "_active");

            setTimeout(function () {
                this.busy = false;
                this.modal.trigger("opened");
            }.bind(this), this.td + 50);
        }.bind(this), 25);
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
            // save current scroll position
            location.hash = "";
        }

        this.body.removeClass(pluginName + "_active");

        setTimeout(function () {
            this.overlay.hide();
            this.unlockScreen();

            this.busy = false;
            this.modal.trigger("closed");
        }.bind(this), this.td + 50);
    };

    if ($) {
        $["fn"][pluginName] = function (opts) {
            return this["each"](function (i, e) {
                var $e = $(e);
                if (!$e.data(pluginName) || !$e.data(pluginName).open) {
                    var instance = new Remodal($e, opts);
                    $e.data(pluginName, instance);
                }
            });
        };
    }

    /**
     * data-remodal-target opens a modal window with a special id without hash change.
     */
    $(document).on("click", "[data-" + pluginName + "-target]", function (e) {
        e.preventDefault();

        var elem = e.currentTarget,
            id = elem.getAttribute("data-" + pluginName + "-target"),
            $target = $("[data-" + pluginName + "-id=" + id + "]");

        $target.data(pluginName).open();
    });

    /**
     * Auto initialization of modal windows.
     * They should have the 'data-remodal' attribute.
     * Also you can pass params into the modal throw the data-remodal-options attribute.
     * data-remodal-options must be a JSON string without brackets.
     */
    $(document).find("." + pluginName).each(function (i, container) {
        var $container = $(container),
            options = $container.data(pluginName + "-options");

        if (!options) {
            options = {};
        }

        $container[pluginName](options);
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
            var $elem = $("[data-" + pluginName + "-id=" + id + "]");

            if ($elem.length) {
                var data = $elem.data(pluginName);
                if (data && data.settings.hashTracking) {
                    data.open();
                }
            }

        }
    };
    $(window).bind("hashchange." + pluginName, hashHandler);
    hashHandler(null, false);
})(window["jQuery"]);