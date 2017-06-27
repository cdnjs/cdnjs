/**
 *  jQuery Prompt21
 *  ===============
 *  A minimalist jQuery prompt plugin for the 21st Century.
 *  Created with JavaScript and <3 by the @jillix developers.
 * */
(function ($) {

    /**
     * unflattenObject
     * Converts a flat object to an unflatten one
     *
     * @name unflattenObject
     * @function
     * @param {Object} flat The flat object that should be converted
     * @return {Object} Unflatten object
     */
    var Utils = {};
    Utils.unflattenObject = function(flat) {

        var result = {};
        var parentObj = result;

        var keys = Object.keys(flat);
        for (var i = 0; i < keys.length; ++i) {

            var key = keys[i];
            var subkeys = key.split('.');
            var last = subkeys.pop();

            for (var ii = 0; ii < subkeys.length; ++ii) {
                var subkey = subkeys[ii];
                parentObj[subkey] = typeof parentObj[subkey] === 'undefined' ? {} : parentObj[subkey];
                parentObj = parentObj[subkey];
            }

            parentObj[last] = flat[key];
            parentObj = result;
        }

        return result;
    }

    /**
     * prompt21
     * Initializes a new instance of Prompt21.
     *
     * Example:
     *
     * ```js
     * var p21 = $(".container").prompt21();
     * ```
     *
     * @name prompt21
     * @function
     * @param {Object} opt_options The options for Prompt21 instance.
     *
     *  - `cancel` (String): The cancel button jQuery selector (default: `"button.cancel"`).
     *  - `showFunc` (String): The jQuery function called to show the form (default: `"fadeIn"`).
     *  - `hideFunc` (String): The jQuery function called to hide the form (default: `"fadeOut"`).
     *  - `form` (String): The form jQuery selector (default: `"form"`).
     *
     * @return {Prompt21} An object containing:
     *
     *  - `getData` (Function): The `getData` function. See below.
     */
    var Prompt21 = $.fn.prompt21 = function (opt_options) {

        var $self = this;
        var settings = $.extend(opt_options, Prompt21.defaults);

        var $cancelButton = $(settings.cancel, $self);
        var $form = $(settings.form, $self);

        $self.hide();

        $cancelButton.on("click", function () {
            $self[settings.hideFunc]();
            $form[0].reset();
            return false;
        });

        /**
         * getData
         * Shows the popup and calls the callback function when the OK button is clicked.
         *
         * @name getData
         * @function
         * @param {Function} callback The callback function.
         * @return {undefined}
         */
        function getData (callback) {
            $self[settings.showFunc].call($self, function () {
                $(":input:first", $form).focus();
            });
            $form.on("submit", function () {
                var data = {};
                $("[name]:input", $form).each(function() {
                    var $this = $(this);
                    var name = $this.attr("name");
                    var value = $this.val();
                    if ($this.attr("data-parse") === "json") {
                        try {
                            value = JSON.parse(value);
                        } catch (e) {};
                    }
                    data[name] = value;
                });
                data = Utils.unflattenObject(data);
                callback(null, data);
                $self[settings.hideFunc]();
                return false;
            });
        }

        return {
            getData: getData
        };
    };

    // Version
    Prompt21.version = "1.1.0";

    // Defaults
    Prompt21.defaults = {
        cancel: "button.cancel",
        showFunc: "fadeIn",
        hideFunc: "fadeOut",
        form: "form"
    };
})($);
