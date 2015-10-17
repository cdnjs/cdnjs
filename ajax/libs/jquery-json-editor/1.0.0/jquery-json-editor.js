/*!
 *  jQuery JSON Editor
 *  ==================
 *  A jQuery plugin for editing JSON data.
 *
 *  Developed with JavaScript and <3 by jillix developers.
 *  Licensed under the MIT license.
 * */
(function ($) {

    /*!
     * findValue
     * Finds a value in parent (object) using the dot notation passed in dotNot.
     *
     * @name findValue
     * @function
     * @param {Object} parent The object containing the searched value
     * @param {String} dotNot Path to the value
     * @return {Anything} Found value or undefined
     */
    function findValue(parent, dotNot) {

        if (!dotNot || !dotNot) return undefined;

        var splits = dotNot.split(".");
        var value;

        for (var i = 0; i < splits.length; ++i) {
            value = parent[splits[i]];
            if (value === undefined) return undefined;
            if (typeof value === "object") parent = value;
        }

        return value;
    }

    /*!
     * flattenObject
     * Converts an object to a flat one
     *
     * @name flattenObject
     * @function
     * @param {Object} obj The object that should be converted
     * @return {Object} Flatten object
     */
    function flattenObject(obj) {

        var result = {};

        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) continue;

            if (obj[key] && obj[key].constructor === Object) {
                var flat = flattenObject (obj[key]);
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
    }

    /*!
     * unflattenObject
     * Converts a flat object to an unflatten one
     *
     * @name unflattenObject
     * @function
     * @param {Object} flat The flat object that should be converted
     * @return {Object} Unflatten object
     */
    function unflattenObject(flat) {

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
     * handleArrays
     * Converts object like `{ 0: ..., 1: ..., 2: ... }` into `[..., ..., ...]`.
     *
     * @name handleArrays
     * @function
     * @param {Object} obj Object containing objects with numbers as keys.
     * @return {Object} The object with converted objects in arrays.
     */
    function handleArrays(obj) {
        var convert = true;
        var keys = Object.keys(obj).map(function (key) {
            var val = parseInt(key, 10);
            if (isNaN(val)) {
                convert = false;
            }
            return val;
        }).sort();

        var arr = convert ? [] : obj;
        if (!convert) {
            for (var k in obj) {
                if (obj[k] && obj[k].constructor === Object) {
                    arr[k] = handleArrays(obj[k]);
                }
            }
        } else {
            keys.forEach(function (key) {
                if (obj[key] && obj[key].constructor === Object) return (arr[key] = handleArrays(obj[key]));
                arr.push(obj[key]);
            });
        }
        return arr;
    }

    /*!
     * mergeRecursive
     * Merges the two objects in the first object.
     *
     * @name mergeRecursive
     * @function
     * @param {Object} obj1 The first object.
     * @param {The second object.} obj2
     * @return {Object} The two objects merged in the first one.
     */
    function mergeRecursive (obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = mergeRecursive(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                obj1[p] = obj2[p];
            }
        }

        return obj1;
    }

    /*!
     * sch
     * Creates the schema object providing data.
     *
     * @name sch
     * @function
     * @param {Object} obj The current field object.
     * @param {Object} out The field that should be edited (default: `{}`).
     * @param {String} path The path to the field value.
     * @return {Object} The schema object.
     */
    function sch(obj, out, path) {

        var schema = out || {};
        path = path || "";

        var t = getTypeOf(obj);
        if (t !== "object") {
            return {
                type: t
            };
        } else {
            for (var k in obj) {
                var c = obj[k];
                t = getTypeOf(c)

                if (t === "array" || t === "object") {
                    schema[path + k] = {
                        schema: t === "array" ? sch(c[0]) : sch(c),
                        type: t
                    };
                    continue;
                }

                schema[path + k] = {
                    type: t
                };
            }
        }

        return schema;
    }

    /*!
     * schemaCoreFields
     * Sets the core fields in schema.
     *
     * @name schemaCoreFields
     * @function
     * @param {Object} obj The current field object.
     * @param {String} path The path to the field value.
     * @return {undefined}
     */
    function schemaCoreFields(obj, path) {
        path = path || "";
        for (var k in obj) {
            var c = obj[k];
            if ((c.type === "array" && typeof Object(c.schema).type !== "string") || c.type === "object") {
                schemaCoreFields(c.schema, path + k + ".");
            }
            c.label = c.label || k;
            c.path = path + k;
            c.name = k;
        }
    }

    /*!
     * getTypeOf
     * Returns the type of input variable.
     *
     * @name getTypeOf
     * @function
     * @param {Anything} o The input variable.
     * @return {String} The type of the input variable.
     */
    function getTypeOf(o) {

        var types = {
            "undefined"                          : "undefined",
            "number"                             : "number",
            "boolean"                            : "boolean",
            "string"                             : "string",
            "[object Function]"                  : "function",
            "[object RegExp]"                    : "regexp",
            "function Array() { [native code] }" : "array",
            "function Date() { [native code] }"  : "date",
            "[object Error]"                     : "error"
        };

        return types[o && o.constructor] || types[typeof o] || types[o] || (o ? "object" : "null");
    }

    /**
     * $.fn.jsonEdit
     * Initializes the JSON editor on selected elements.
     *
     * @name $.fn.jsonEdit
     * @function
     * @param {Object} opt_options An object containing the following fields:
     *
     *  - `data` (Object): The input JSON data (default: `{}`).
     *  - `schema` (Object): The JSON data schema. The provided object will be merged with default schema.
     *  - `autoInit` (Boolean): If `true`, the forms will be added by default (default: `true`).
     *
     * @return {Object} The JSON editor object containing:
     *
     *  - `labels` (Object): An object with UI elements used for labels.
     *  - `groups` (Object): An object with UI elements used for groups.
     *  - `inputs` (Object): An object with UI elements used for inputs.
     *  - `container` (jQuery): A jQuery object being the container of the JSON editor.
     *  - `createGroup` (Function): Creates a form group.
     */
    var JsonEdit = $.fn.jsonEdit = function (opt_options) {

        // Default settings
        var settings = $.extend({
            data: {},
            schema: {},
            autoInit: true
        }, opt_options);

        // JSON Editor object
        var self = {

            // UI
            labels: $.extend(JsonEdit.labels, opt_options.labels),
            groups: $.extend(JsonEdit.groups, opt_options.groups),
            inputs: $.extend(JsonEdit.inputs, opt_options.inputs),
            container: this,

            // Data manipulation
            converters: $.extend(JsonEdit.converters, opt_options.converters),
        };

        /**
         * createGroup
         * Creates a form group and returns the jQuery object.
         *
         * @name createGroup
         * @function
         * @param {Object} field The field object.
         * @return {jQuery} The jQuery object form.
         */
        self.createGroup = function (field) {

            // Create form group
            var $group = self.groups[field.type].clone(true);

            // TODO Configurable
            // Add label
            $group.find("label").append(self.labels[field.type].clone(true).text(field.label));

            // Add input
            var $input = null;
            if (field.type == "array") {
                // TODO Configurable
                var $headers = null;
                var $tbody = null;
                $input = $("<table>", {
                    "border": "1"
                }).append([
                    $headers = $("<thead>").append("<tr>"),
                    $tbody = $("<tbody>")
                ]);

               var fieldData = self.getValue(field.path);
               if (!fieldData) { return; }

               var headers = [];
               // headers
               for (var k in field.schema) {
                   var c = field.schema[k];
                   headers.push(c.name);
                   $headers.append(
                        $("<th>", { text: c.label || "Values" })
                   );
               }

               for (var i = 0; i < fieldData.length; ++i) {
                  var cFieldData = fieldData[i];
                  var $tr = $("<tr>").appendTo($tbody);
                  if (typeof Object(field.schema).type === "string") {
                     var path = null;
                     $tr.append($("<td>").append(self.createGroup({
                         type: getTypeOf(cFieldData),
                         path: field.path + "." + i,
                         schema: field.schema
                     })));
                  } else {
                      for (var ii = 0; ii < headers.length; ++ii) {
                         var sch = field.schema[headers[ii]];
                         var path = field.path + "." + i + "." + headers[ii];
                         $tr.append($("<td>").append(self.createGroup({
                             type: sch.type,
                             path: path,
                             schema: sch.schema,
                             name: sch.name
                         })));
                      }
                  }
               }

            } else if (field.type === "object") {
                $input = [];
                for (var k in field.schema) {
                    var cField = field.schema[k];
                    $input.push(self.createGroup({
                        path: field.path + "." + k,
                        type: cField.type,
                        schema: cField.schema,
                        name: cField.name,
                        label: cField.label
                    }));
                }
            } else {
                $input = self.inputs[field.type].clone(true).attr({
                    "data-json-editor-path": field.path,
                    "data-json-editor-type": field.type
                });

                // Set value in input
                var value = self.getValue(field.path);
                if (field.type === "boolean") {
                    $input.prop("checked", value);
                } else if (field.type === "date") {
                    $input[0].valueAsDate = value;
                } else {
                    $input.val(value);
                }
            }

            $group.find("label").append($input);


            return $group;
        };

        /**
         * getValue
         * Returns the value of field.
         *
         * @name getValue
         * @function
         * @param {String} fieldPath The path to the value.
         * @return {Anything} The value taken from data.
         */
        self.getValue = function (fieldPath) {
            return findValue(settings.data, fieldPath);
        };

        /**
         * initUi
         * Creates the form from JSON data.
         *
         * @name initUi
         * @function
         * @return {undefined}
         */
        self.initUi = function () {

            function create(obj) {
                for (var k in obj) {
                    var c = obj[k];
                    self.container.append(self.createGroup(c));
                }
            }

            create(settings.schema);
        };

        /**
         * getData
         * Collects data from form inputs and return the data object.
         *
         * @name getData
         * @function
         * @return {Object} The object containing data taken from forms.
         */
        self.getData = function () {
            var data = {};
            $("[data-json-editor-path]", self.container).each(function () {
                var $this = $(this);
                var type = $(this).attr("data-json-editor-type");
                var path = $this.attr("data-json-editor-path");
                if ($this.attr("type") === "checkbox") {
                    data[path] = $this.prop("checked");
                } else {
                    data[path] = $this.val();
                }

                var converter = self.converters[type];
                if (typeof converter === "function") {
                    data[path] = converter(data[path]);
                }
            });
            return handleArrays(unflattenObject(data));
        };

        // Merge schema object
        settings.schema = mergeRecursive(sch(settings.data), settings.schema);

        // Attach core fields to schema objects
        schemaCoreFields(settings.schema);

        // Auto init
        if (settings.autoInit === true) {
            self.initUi();
        }

        return self;
    };

    // Default converter functions
    JsonEdit.converters = {
        boolean: function (value) {
            return (value === true || value === "true" || value === "on" || typeof value == "number" && value > 0 || value === "1");
        },
        string: function (value) {
            return value.toString();
        },
        number: function (value) {
            return Number (value);
        },
        regexp: function (value) {
            return new RegExp(value);
        },
        date: function (value) {
            return new Date(value);
        }
    };

    // Default group elements
    JsonEdit.groups = {
        "number":   $("<div>").append($("<label>")),
        "boolean":  $("<div>").append($("<label>")),
        "string":   $("<div>").append($("<label>")),
        "regexp":   $("<div>").append($("<label>")),
        "array":    $("<div>").append($("<label>")),
        "object":   $("<div>").append($("<label>")),
        "date":     $("<div>").append($("<label>"))
    };

    // Default label elements
    JsonEdit.labels = {
        "number": $("<span>"),
        "boolean": $("<span>"),
        "string": $("<span>"),
        "regexp": $("<span>"),
        "date": $("<span>"),
        "object": $("<h3>"),
        "array": $("<h3>")
    };

    // Default input elements
    JsonEdit.inputs = {
        "number": $("<input>", {type: "number"}),
        "boolean": $("<input>", {type: "checkbox"}),
        "string": $("<input>", {type: "text"}),
        "regexp": $("<input>", {type: "text"}),
        "date": $("<input>", {type: "date"}),
        "array": $("<input>", {type: "text"}),
    };
})($);
