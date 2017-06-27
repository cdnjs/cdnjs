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
     *  - `speed` (Number): animation speed (default: `200`)
     *  - `side` (String): left|right|top|bottom (default: `"left"`)
     *  - `isClosed` (Boolean): A boolean value indicating if the sidebar is closed or not (default: `false`).
     *  - `close` (Boolean): If `true`, the sidebar will be closed by default.
     *  - `range` (Object): An object containing:
     *    - `left` (Array): An array with the min and max left values (default: `[-width, 0]`).
     *    - `right` (Array): An array with the min and max right values (default: `[-width, 0]`).
     *    - `top` (Array): An array with the min and max top values (default: `[-height, 0]`).
     *    - `bottom` (Array): An array with the min and max bottom values (default: `[-height, 0]`).
     *
     * @return {jQuery} The jQuery elements that were selected.
     */
    $.fn.sidebar = function(options) {

        var self = this;
        if (self.length > 1) {
            return self.each(function () {
                $(this).sidebar(options);
            });
        }

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
            isClosed: false,

            // Should I close the sidebar?
            close: true

        }, options);

        // Override range
        settings.range = settings.range[settings.side];

        /*!
         *  Opens the sidebar
         *  $([jQuery selector]).trigger("sidebar:open");
         * */
        self.on("sidebar:open", function() {
            var properties = {};
            properties[settings.side] = settings.range[1];
            settings.isClosed = null;
            self.stop().animate(properties, settings.speed, function() {
                settings.isClosed = false;
                self.trigger("sidebar:opened");
            });
        });


        /*!
         *  Closes the sidebar
         *  $("[jQuery selector]).trigger("sidebar:close");
         * */
        self.on("sidebar:close", function(callback) {
            var properties = {};
            properties[settings.side] = settings.range[0];
            settings.isClosed = null;
            self.stop().animate(properties, settings.speed, function() {
                settings.isClosed = true;
                self.trigger("sidebar:closed");
            });
        });

        /*!
         *  Toggles the sidebar
         *  $("[jQuery selector]).trigger("sidebar:toggle");
         * */
        self.on("sidebar:toggle", function(callback) {
            if (settings.isClosed) {
                self.trigger("sidebar:open");
            } else {
                self.trigger("sidebar:close");
            }
        });

        // Close the sidebar
        if (!settings.isClosed && settings.close) {
            self.hide().trigger("sidebar:close").one("sidebar:closed", function() {
                $(this).show();
            });
        }

        return self;
    };

    // Version
    $.fn.sidebar.version = "3.0.0";
})(jQuery);
