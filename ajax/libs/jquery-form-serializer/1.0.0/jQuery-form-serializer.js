(function (root, $) {
    if (typeof $ === "undefined") {
        throw new Error("jQuery is not loaded.");
    }

    // Utils
    // https://github.com/jillix/utils
    var Utils = {};

    /**
     * flattenObject
     * Converts an object to a flat one
     *
     * @name flattenObject
     * @function
     * @param {Object} obj The object that should be converted
     * @return {Object} Flatten object
     */
    Utils.flattenObject = function(obj) {

        var result = {};

        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;

            if (typeof obj[key] === 'object' && obj[key].constructor === Object) {

                var flat = Utils.flattenObject(obj[key]);
                for (var x in flat) {
                    if (!flat.hasOwnProperty(x)) {
                        continue;
                    }

                    result[key + '.' + x] = flat[x];
                }
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    };

    /**
     * unflattenObject
     * Converts a flat object to an unflatten one
     *
     * @name unflattenObject
     * @function
     * @param {Object} flat The flat object that should be converted
     * @return {Object} Unflatten object
     */
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
    };


    // Converters
    var Converters = {
        string: function (value) {
            return String(value);
        },
        number: function (value) {
            return Number(value);
        },
        "boolean": function (value) {
            return (value === true || value === "true" || value === "on" || typeof value == "number" && value > 0 || value === "1");
        },
        "json": function (value) {
            if (!value) { return null; }
            return JSON.parse(value);
        }
    };

    /**
     * serializer
     * Create the form serializer.
     *
     * @name serializer
     * @function
     * @return {jQuery} The selected elements.
     */
    $.fn.serializer = function () {

        var $self = this;

        // Multiple elements
        if ($self.length > 1) {
            $self.each(function () {
                $(this).serializer();
            });
            return $self;
        }

        // Handlers
        var handlers = {
            serialize: function (e) {
                var $form = $(this);
                var serializedForm = {};

                // Collect information from all [data-field] elements
                $form.find("[data-field]").each(function () {

                    // Get the current element
                    var $element = $(this)

                    // How to get the value?
                    var how = $element.attr("data-value") || "val";

                    // Get params
                    var params = $element.attr("data-params");

                    // Get field name
                    var field = $element.attr("data-field");

                    // Convert to
                    var convertTo = $element.attr("data-convert-to");

                    // Delete if
                    var deleteIfValue = $element.attr("data-delete-if");

                    // Arguments that are passed to how function
                    var howArguments = params ? [params] : [];

                    // Create the value
                    var value = $element[how].apply($element, howArguments);

                    // Convert to a valid value
                    if (convertTo && Converters[convertTo]) {
                        value = Converters[convertTo](value);
                        deleteIfValue = Converters[convertTo](deleteIfValue);
                    }

                    // Verify if value can be added
                    if (value === deleteIfValue) {
                        return;
                    }

                    // Set the value in the serialized form object using the field
                    serializedForm[field] = value;
                });

                // The final object should be unflatten
                serializedForm = Utils.unflattenObject(serializedForm);

                // "serializer:data" event
                $self.trigger("serializer:data", [serializedForm]);
            },
            fill: function (e, data) {
                var flattenForm = Utils.flattenObject(data);
                var fields = Object.keys(flattenForm);

                fields.forEach(function (c) {
                    var $field = $("[data-field='" + c + "']", e.target);
                    var dataParams = $field.attr("data-params");
                    var dataValue = $field.attr("data-value");
                    var args = dataParams ? [dataParams] : [];

                    args.push(flattenForm[c]);
                    dataValue = dataValue || "val";

                    $field[dataValue].apply($field, args);
                });
                return;
            }
        };

        $self.on("serializer:submit", function () {
            handlers.serialize.apply(this, arguments);
        });

        $self.on("serializer:fill", function () {
            handlers.fill.apply(this, arguments);
        });

        function submit(e) {
            $(this).trigger("serializer:submit", e);
            e.preventDefault();
            return false;
        }

        $self.on("submit", "form", submit);
        $self.on("submit", submit);

        return $self;
    };

    $.fn.serializer.version = "1.0.0";
})(this, this.$ || this.jQuery);
