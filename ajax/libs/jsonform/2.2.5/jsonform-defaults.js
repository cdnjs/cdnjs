/**
 * @fileoverview The JSON Form "defaults" library exposes a setDefaultValues
 * method that extends the object passed as argument so that it includes
 * values for all required fields of the JSON schema it is to follow that
 * define a default value.
 *
 * The library is called to complete the configuration settings of a template in
 * the Factory and to complete datasource settings.
 *
 * The library is useless if the settings have already been validated against the
 * schema using the JSON schema validator (typically, provided the validator is
 * loaded, submitting the form created from the schema will raise an error when
 * required properties are missing).
 *
 * Note the library does not validate the created object, it merely sets missing
 * values to the default values specified in the schema. All other values may
 * be invalid.
 *
 * Nota Bene:
 * - in data-joshfire, the runtime/nodejs/lib/jsonform-defaults.js file is a
 * symbolic link to the jsonform submodule in deps/jsonform
 * - in platform-joshfire, the server/public/js/libs/jsonform-defaults.js file
 * is a symbolic link to the jsonform submodule in deps/jsonform
 */

(function () {
  // Establish the root object:
  // that's "window" in the browser, "global" in node.js
  var root = this;

  /**
   * Sets default values, ensuring that fields defined as "required" in the
   * schema appear in the object. If missing, the hierarchy that leads to
   * a required key is automatically created.
   *
   * @function
   * @param {Object} obj The object to complete with default values according
   *  to the schema
   * @param {Object} schema The JSON schema that the object follows
   * @param {boolean} includeOptionalValues Include default values for fields
   *  that are not "required"
   * @param {boolean} skipFieldsWithoutDefaultValue Set flag not to include a
   *  generated empty default value for fields marked as "required" in the
   *  schema but that do not define a default value.
   * @return {Object} The completed object (same instance as obj)
   */
  var setDefaultValues = function (obj, schema, includeOptionalValues, skipFieldsWithoutDefaultValue) {
    if (!obj || !schema) return obj;
    if (!schema.properties) {
      schema = { properties: schema };
    }

    // Inner function that parses the schema recursively to build a flat
    // list of defaults
    var defaults = {};
    var extractDefaultValues = function (schemaItem, path) {
      var properties = null;
      var child = null;

      if (!schemaItem || (schemaItem !== Object(schemaItem))) return null;

      if (schemaItem.required) {
        // Item is required
        if (schemaItem['default']) {
          // Item defines a default value, let's use it,
          // no need to continue in that case, we have the default value
          // for the whole subtree starting at schemaItem.
          defaults[path] = schemaItem['default'];
          return;
        }
        else if (skipFieldsWithoutDefaultValue) {
          // Required but no default value and caller explicitly asked not
          // include such fields in the returned object.
        }
        else if ((schemaItem.type === 'object') || schemaItem.properties) {
          // Item is a required object
          defaults[path] = {};
        }
        else if ((schemaItem.type === 'array') || schemaItem.items) {
          // Item is a required array
          defaults[path] = [];
        }
        else if (schemaItem.type === 'string') {
          defaults[path] = '';
        }
        else if ((schemaItem.type === 'number') || (schemaItem.type === 'integer')) {
          defaults[path] = 0;
        }
        else if (schemaItem.type === 'boolean') {
          defaults[path] = false;
        }
        else {
          // Unknown type, use an empty object by default
          defaults[path] = {};
        }
      }
      else if (schemaItem['default'] && includeOptionalValues) {
        // Item is not required but defines a default value and the
        // include optional values flag is set, so let's use it.
        // No need to continue in that case, we have the default value
        // for the whole subtree starting at schemaItem.
        defaults[path] = schemaItem['default'];
        return;
      }

      // Parse schema item's properties recursively
      properties = schemaItem.properties;
      if (properties) {
        for (var key in properties) {
          if (properties.hasOwnProperty(key)) {
            extractDefaultValues(properties[key], path + '.' + key);
          }
        }
      }

      // Parse schema item's children recursively
      if (schemaItem.items) {
        // Items may be a single item or an array composed of only one item
        child = schemaItem.items;
        if (_isArray(child)) {
          child = child[0];
        }

        extractDefaultValues(child, path + '[]');
      }
    };

    // Build a flat list of default values
    extractDefaultValues(schema, '');

    // Ensure the object's default values are correctly set
    for (var key in defaults) {
      if (defaults.hasOwnProperty(key)) {
        setObjKey(obj, key, defaults[key]);
      }
    }
  };


  /**
   * Retrieves the default value for the given key in the schema
   *
   * Levels in the path are separated by a dot. Array items are marked
   * with []. For instance:
   *  foo.bar[].baz
   *
   * @function
   * @param {Object} schema The schema to parse
   * @param {String} key The path to the key whose default value we're
   *  looking for. each level is separated by a dot, and array items are
   *  flagged with [x].
   * @return {Object} The default value, null if not found.
   */
  var getSchemaKeyDefaultValue = function(schema,key) {
    var schemaKey = key
      .replace(/\./g, '.properties.')
      .replace(/\[.*\](\.|$)/g, '.items$1');
    var schemaDef = getObjKey(schema, schemaKey);
    if (schemaDef) return schemaDef['default'];
    return null;
  };

  /**
   * Retrieves the key identified by a path selector in the structured object.
   *
   * Levels in the path are separated by a dot. Array items are marked
   * with []. For instance:
   *  foo.bar[].baz
   *
   * @function
   * @param {Object} obj The object to parse
   * @param {String} key The path to the key whose default value we're
   *  looking for. each level is separated by a dot, and array items are
   *  flagged with [x].
   * @return {Object} The key definition, null if not found.
   */
  var getObjKey = function (obj, key) {
    var innerobj = obj;
    var keyparts = key.split('.');
    var subkey = null;
    var arrayMatch = null;
    var reArraySingle = /\[([0-9]*)\](?:\.|$)/;

    for (var i = 0; i < keyparts.length; i++) {
      if (typeof innerobj !== 'object') return null;
      subkey = keyparts[i];
      arrayMatch = subkey.match(reArraySingle);
      if (arrayMatch) {
        // Subkey is part of an array
        subkey = subkey.replace(reArraySingle, '');
        if (!_isArray(innerobj[subkey])) {
          return null;
        }
        innerobj = innerobj[subkey][parseInt(arrayMatch[1], 10)];
      }
      else {
        innerobj = innerobj[subkey];
      }
    }

    return innerobj;
  };


  /**
   * Sets the key identified by a path selector to the given value.
   *
   * Levels in the path are separated by a dot. Array items are marked
   * with []. For instance:
   *  foo.bar[].baz
   *
   * The hierarchy is automatically created if it does not exist yet.
   *
   * Default values are added to all array items. Array items are not
   * automatically created if they do not exist (in particular, the
   * minItems constraint is not enforced)
   *
   * @function
   * @param {Object} obj The object to build
   * @param {String} key The path to the key to set where each level
   *  is separated by a dot, and array items are flagged with [x].
   * @param {Object} value The value to set, may be of any type.
   */
  var setObjKey = function (obj, key, value) {
    var keyparts = key.split('.');

    // Recursive version of setObjKey
    var recSetObjKey = function (obj, keyparts, value) {
      var arrayMatch = null;
      var reArray = /\[([0-9]*)\]$/;
      var subkey = keyparts.shift();
      var idx = 0;

      if (keyparts.length > 0) {
        // Not the end yet, build the hierarchy
        arrayMatch = subkey.match(reArray);
        if (arrayMatch) {
          // Subkey is part of an array, check all existing array items
          // TODO: review that! Only create the right item!!!
          subkey = subkey.replace(reArray, '');
          if (!_isArray(obj[subkey])) {
            obj[subkey] = [];
          }
          obj = obj[subkey];
          if (arrayMatch[1] !== '') {
            idx = parseInt(arrayMatch[1], 10);
            if (!obj[idx]) {
              obj[idx] = {};
            }
            recSetObjKey(obj[idx], keyparts, value);
          }
          else {
            for (var k = 0; k < obj.length; k++) {
              recSetObjKey(obj[k], keyparts, value);
            }
          }
          return;
        }
        else {
          // "Normal" subkey
          if (typeof obj[subkey] !== 'object') {
            obj[subkey] = {};
          }
          obj = obj[subkey];
          recSetObjKey(obj, keyparts, value);
        }
      }
      else {
        // Last key, time to set the value, unless already defined
        arrayMatch = subkey.match(reArray);
        if (arrayMatch) {
          subkey = subkey.replace(reArray, '');
          if (!_isArray(obj[subkey])) {
            obj[subkey] = [];
          }
          idx = parseInt(arrayMatch[1], 10);
          if (!obj[subkey][idx]) {
            obj[subkey][idx] = value;
          }
        }
        else if (!obj[subkey]) {
          obj[subkey] = value;
        }
      }
    };

    // Skip first item if empty (key starts with a '.')
    if (!keyparts[0]) {
      keyparts.shift();
    }
    recSetObjKey(obj, keyparts, value);
  };

  // Taken from Underscore.js (not included to save bytes)
  var _isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
  };


  // Export the code as:
  //  1. an AMD module (the "define" method exists in that case), or
  //  2. a node.js module ("module.exports" is defined in that case), or
  //  3. a global JSONForm object (using "root")
  if (typeof define !== 'undefined') {
    // AMD module
    define([], function () {
      return {
        setDefaultValues: setDefaultValues,
        setObjKey: setObjKey,
        getSchemaKeyDefaultValue: getSchemaKeyDefaultValue
      };
    });
  }
  else if ((typeof module !== 'undefined') && module.exports) {
    // Node.js module
    module.exports = {
      setDefaultValues: setDefaultValues,
      setObjKey: setObjKey,
      getSchemaKeyDefaultValue: getSchemaKeyDefaultValue
    };
  }
  else {
    // Export the function to the global context, using a "string" for
    // Google Closure Compiler "advanced" mode
    // (not sure why it's needed, done by Underscore)
    root['JSONForm'] = root['JSONForm'] || {};
    root['JSONForm'].setDefaultValues = setDefaultValues;
    root['JSONForm'].setObjKey = setObjKey;
    root['JSONForm'].getSchemaKeyDefaultValue = getSchemaKeyDefaultValue;
  }
})();