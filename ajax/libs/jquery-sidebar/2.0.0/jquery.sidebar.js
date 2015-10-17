/*!
 *  jQuery sidebar plugin
 *  ---------------------
 *  A stupid simple sidebar jQuery plugin.
 *
 *  Developed with <3 and JavaScript by jillix developers.
 *  Copyright (c) 2013-14 jillix
 * */
(function($) {

    /**
     * sidebar
     * Initialize sidebar on selected elements.
     *
     * ```js
     * $(".my-sidebar").sidebar({...});
     * ```
     *
     * After the call above, you can programatically open/close/toggle the sidebar using:
     *
     * ```js
     * $(".my-sidebar").trigger("sidebar:open");
     * $(".my-sidebar").trigger("sidebar:close");
     * $(".my-sidebar").trigger("sidebar:toggle");
     * ```
     *
     * After the sidebar is opened/closed, `sidebar:opened`/`sidebar:closed` event is emitted.
     *
     * ```js
     * $(".my-sidebar").on("sidebar:opened", function () {
     *    // Do something on open
     * });
     *
     * $(".my-sidebar").on("sidebar:closed", function () {
     *    // Do something on close
     * });
     * ```
     *
     * @name sidebar
     * @function
     * @param {Object} options An object that will be merged with the default options.
     *
     *  - `speed`: animation speed (default: 200)
     *  - `side`: left|right|top|bottom (default: "left")
     * @return {jQuery} The jQuery elements that were selected.
     */
    $.fn.sidebar = function(options) {

        var self = this;

        // Width, height
        var width = self.outerWidth();
        var height = self.outerHeight();

        // Defaults
        var settings = $.extend({

            // Animation speed
            speed: 200,

            // Side: left|right|top|bottom
            side: "left",

            // Range defaults
            range: {
                left: [-width, 0],
                right: [-width, 0],
                top: [-height, 0],
                bottom: [-height, 0]
            },

            // Is closed
            closed: true

        }, options);

        // Override range
        settings.range = settings.range[settings.side];

        /*!
         *  Opens the sidebar
         *  $([jQuery selector]).trigger("sidebar:open");
         * */
        this.on("sidebar:open", function() {
            var properties = {};
            properties[settings.side] = settings.range[1];
            settings.closed = null;
            self.stop().animate(properties, settings.speed, function() {
                settings.closed = false;
                self.trigger("sidebar:opened");
            });
        });


        /*!
         *  Closes the sidebar
         *  $("[jQuery selector]).trigger("sidebar:close");
         * */
        this.on("sidebar:close", function(callback) {
            var properties = {};
            properties[settings.side] = settings.range[0];
            settings.closed = null;
            self.stop().animate(properties, settings.speed, function() {
                settings.closed = true;
                self.trigger("sidebar:closed");
            });
        });

        /*!
         *  Toggles the sidebar
         *  $("[jQuery selector]).trigger("sidebar:toggle");
         * */
        this.on("sidebar:toggle", function(callback) {
            if (settings.closed) {
                self.trigger("sidebar:open");
            } else {
                self.trigger("sidebar:close");
            }
        });

        return this;
    };
})(jQuery);
