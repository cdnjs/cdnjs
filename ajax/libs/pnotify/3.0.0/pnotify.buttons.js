// Buttons
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.buttons', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    PNotify.prototype.options.buttons = {
        // Provide a button for the user to manually close the notice.
        closer: true,
        // Only show the closer button on hover.
        closer_hover: true,
        // Provide a button for the user to manually stick the notice.
        sticker: true,
        // Only show the sticker button on hover.
        sticker_hover: true,
        // Show the buttons even when the nonblock module is in use.
        show_on_nonblock: false,
        // The various displayed text, helps facilitating internationalization.
        labels: {
            close: "Close",
            stick: "Stick",
            unstick: "Unstick"
        },
        // The classes to use for button icons. Leave them null to use the classes from the styling you're using.
        classes: {
            closer: null,
            pin_up: null,
            pin_down: null
        }
    };
    PNotify.prototype.modules.buttons = {
        closer: null,
        sticker: null,

        init: function(notice, options){
            var that = this;
            notice.elem.on({
                "mouseenter": function(e){
                    // Show the buttons.
                    if (that.options.sticker && (!(notice.options.nonblock && notice.options.nonblock.nonblock) || that.options.show_on_nonblock)) {
                        that.sticker.trigger("pnotify:buttons:toggleStick").css("visibility", "visible");
                    }
                    if (that.options.closer && (!(notice.options.nonblock && notice.options.nonblock.nonblock) || that.options.show_on_nonblock)) {
                        that.closer.css("visibility", "visible");
                    }
                },
                "mouseleave": function(e){
                    // Hide the buttons.
                    if (that.options.sticker_hover) {
                        that.sticker.css("visibility", "hidden");
                    }
                    if (that.options.closer_hover) {
                        that.closer.css("visibility", "hidden");
                    }
                }
            });

            // Provide a button to stick the notice.
            this.sticker = $("<div />", {
                "class": "ui-pnotify-sticker",
                "aria-role": "button",
                "aria-pressed": notice.options.hide ? "false" : "true",
                "tabindex": "0",
                "title": notice.options.hide ? options.labels.stick : options.labels.unstick,
                "css": {
                    "cursor": "pointer",
                    "visibility": options.sticker_hover ? "hidden" : "visible"
                },
                "click": function(){
                    notice.options.hide = !notice.options.hide;
                    if (notice.options.hide) {
                        notice.queueRemove();
                    } else {
                        notice.cancelRemove();
                    }
                    $(this).trigger("pnotify:buttons:toggleStick");
                }
            })
            .bind("pnotify:buttons:toggleStick", function(){
                var pin_up = that.options.classes.pin_up === null ? notice.styles.pin_up : that.options.classes.pin_up;
                var pin_down = that.options.classes.pin_down === null ? notice.styles.pin_down : that.options.classes.pin_down;
                $(this)
                .attr("title", notice.options.hide ? that.options.labels.stick : that.options.labels.unstick)
                .children()
                .attr("class", "")
                .addClass(notice.options.hide ? pin_up : pin_down)
                .attr("aria-pressed", notice.options.hide ? "false" : "true");
            })
            .append("<span />")
            .trigger("pnotify:buttons:toggleStick")
            .prependTo(notice.container);
            if (!options.sticker || (notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock)) {
                this.sticker.css("display", "none");
            }

            // Provide a button to close the notice.
            this.closer = $("<div />", {
                "class": "ui-pnotify-closer",
                "aria-role": "button",
                "tabindex": "0",
                "title": options.labels.close,
                "css": {"cursor": "pointer", "visibility": options.closer_hover ? "hidden" : "visible"},
                "click": function(){
                    notice.remove(false);
                    that.sticker.css("visibility", "hidden");
                    that.closer.css("visibility", "hidden");
                }
            })
            .append($("<span />", {"class": options.classes.closer === null ? notice.styles.closer : options.classes.closer}))
            .prependTo(notice.container);
            if (!options.closer || (notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock)) {
                this.closer.css("display", "none");
            }
        },
        update: function(notice, options){
            // Update the sticker and closer buttons.
            if (!options.closer || (notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock)) {
                this.closer.css("display", "none");
            } else if (options.closer) {
                this.closer.css("display", "block");
            }
            if (!options.sticker || (notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock)) {
                this.sticker.css("display", "none");
            } else if (options.sticker) {
                this.sticker.css("display", "block");
            }
            // Update the sticker icon.
            this.sticker.trigger("pnotify:buttons:toggleStick");
            // Update the close icon.
            this.closer.find("span").attr("class", "").addClass(options.classes.closer === null ? notice.styles.closer : options.classes.closer);
            // Update the hover status of the buttons.
            if (options.sticker_hover) {
                this.sticker.css("visibility", "hidden");
            } else if (!(notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock)) {
                this.sticker.css("visibility", "visible");
            }
            if (options.closer_hover) {
                this.closer.css("visibility", "hidden");
            } else if (!(notice.options.nonblock && notice.options.nonblock.nonblock && !options.show_on_nonblock)) {
                this.closer.css("visibility", "visible");
            }
        }
    };
    $.extend(PNotify.styling.brighttheme, {
        closer: "brighttheme-icon-closer",
        pin_up: "brighttheme-icon-sticker",
        pin_down: "brighttheme-icon-sticker brighttheme-icon-stuck"
    });
    $.extend(PNotify.styling.jqueryui, {
        closer: "ui-icon ui-icon-close",
        pin_up: "ui-icon ui-icon-pin-w",
        pin_down: "ui-icon ui-icon-pin-s"
    });
    $.extend(PNotify.styling.bootstrap2, {
        closer: "icon-remove",
        pin_up: "icon-pause",
        pin_down: "icon-play"
    });
    $.extend(PNotify.styling.bootstrap3, {
        closer: "glyphicon glyphicon-remove",
        pin_up: "glyphicon glyphicon-pause",
        pin_down: "glyphicon glyphicon-play"
    });
    $.extend(PNotify.styling.fontawesome, {
        closer: "fa fa-times",
        pin_up: "fa fa-pause",
        pin_down: "fa fa-play"
    });
}));
