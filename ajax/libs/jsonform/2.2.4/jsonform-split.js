/**
 * @fileoverview The JSON Form "split" library exposes a "split" method
 * that can be used to divide a JSON Form object into two disjoint
 * JSON Form objects:
 * - the first one includes the schema and layout of the form that
 * contains the list of keys given as parameters as well as keys that
 * cannot be separated from them (typically because they belong to the
 * same array in the layout)
 * - the second one includes the schema and layout of a form that does not
 * contain the list of keys given as parameters.
 *
 * The options parameter lets one be explicit about whether it wants to include
 * fields that are tightly coupled with the provided list of keys or not.
 */
/*global exports, _*/

(function (serverside, global, _) {
  if (serverside && !_) {
    _ = require('underscore');
  }

  /**
   * Splits a JSON Form object into two autonomous JSON Form objects,
   * one that includes the provided list of schema keys as well as keys
   * that are tightly coupled to these keys, and the other that does not
   * include these keys.
   *
   * The function operates on the "schema", "form", and "value" properties
   * of the initial JSON Form object. It copies over the other properties
   * to the resulting JSON Form objects.
   *
   * Note that the split function does not support "*" form definitions. The
   * "form" property must be set in the provided in the provided JSON Form
   * object.
   *
   * @function
   * @param {Object} jsonform JSON Form object with a "schema" and "form"
   * @param {Array(String)} keys Schema keys used to split the form. Each
   *  key must reference a schema key at the first level in the schema
   *  (in other words, the keys cannot include "." or "[]")
   * @param {Object} options Split options. Set the "excludeCoupledKeys" flag
   *  not to include keys that are tightly coupled with the ones provided in
   *  the included part of the JSON Form object.
   * @return {Object} An object with an "included" property whose value is
   *  the JSON Form object that includes the keys and an "excluded" property
   *  whose value is the JSON Form object that does not contain any of the
   *  keys. These objects may be empty.
   */
  var split = function (jsonform, keys, options) {
    options = options || {};
    keys = keys || [];
    if (!jsonform || !jsonform.form) {
      return {
        included: {},
        excluded: {}
      };
    }

    if (_.isString(keys)) {
      keys = [keys];
    }

    // Prepare the object that will be returned
    var result = {
      included: {
        schema: {
          properties: {}
        },
        form: []
      },
      excluded: {
        schema: {
          properties: {}
        },
        form: []
      }
    };

    // Copy over properties such as "value" or "tpldata" that do not need
    // to be split (note both forms will reference the same structures)
    _.each(jsonform, function (value, key) {
      if ((key !== 'schema') && (key !== 'form')) {
        result.included[key] = value;
        result.excluded[key] = value;
      }
    });


    /**
     * Helper function that parses the given field and returns true if
     * it references one of the keys to include directly. Note the function
     * does not parse the potential children of the field and will thus
     * return false even if the field actually references a key to include
     * indirectly.
     *
     * @function
     * @param {Object} formField The form field to parse
     * @return {boolean} true when the field references one of the keys to
     *  include, false when not
     */
    var formFieldReferencesKey = function (formField) {
      var referencedKey = _.isString(formField) ?
        formField :
        formField.key;
      if (!referencedKey) {
        return false;
      }
      return _.include(keys, referencedKey) ||
        !!_.find(keys, function (key) {
          return (referencedKey.indexOf(key + '.') === 0) ||
            (referencedKey.indexOf(key + '[]') === 0);
        });
    };


    /**
     * Helper function that parses the given field and returns true if
     * it references a key that is not in the list of keys to include.
     * Note the function does not parse the potential children of the field
     * and will thus return false even if the field actually references a key
     * to include indirectly.
     *
     * @function
     * @param {Object} formField The form field to parse
     * @return {boolean} true when the field references one of the keys to
     *  include, false when not
     */
    var formFieldReferencesOtherKey = function (formField) {
      var referencedKey = _.isString(formField) ?
        formField :
        formField.key;
      if (!referencedKey) {
        return false;
      }
      return !_.include(keys, referencedKey) &&
        !_.find(keys, function (key) {
          return (referencedKey.indexOf(key + '.') === 0) ||
            (referencedKey.indexOf(key + '[]') === 0);
        });
    };


    /**
     * Helper function that parses the given field and returns true if
     * it references one of the keys to include somehow (either directly
     * or through one of its descendants).
     *
     * @function
     * @param {Object} formField The form field to parse
     * @return {boolean} true when the field references one of the keys to
     *  include, false when not
     */
    var includeFormField = function (formField) {
      return formFieldReferencesKey(formField) ||
        formField.items && !!_.some(formField.items, function (item) {
          return includeFormField(item);
        });
    };


    /**
     * Helper function that parses the given field and returns true if
     * it references a key that is not one of the keys to include somehow
     * (either directly or through one of its descendants).
     *
     * @function
     * @param {Object} formField The form field to parse
     * @return {boolean} true when the field references one of the keys to
     *  include, false when not
     */
    var excludeFormField = function (formField) {
      return formFieldReferencesOtherKey(formField) ||
        formField.items && !!_.some(formField.items, function (item) {
          return excludeFormField(item);
        });
    };


    /**
     * Converts the provided form field for inclusion in the included/excluded
     * portion of the result. The function returns null if the field should not
     * appear in the relevant part.
     *
     * Note the function is recursive.
     *
     * @function
     * @param {Object} formField The form field to convert
     * @param {string} splitPart The targeted result part, one of "included",
     *  "excluded", or "all". The "all" string is used in recursions to force
     *  the inclusion of the field even if it does not reference one of the
     *  provided keys.
     * @param {Object} parentField Pointer to the form field parent. This
     *  parameter is used in recursions to preserve direct children of a
     *  "selectfieldset".
     * @return {Object} The converted field.
     */
    var convertFormField = function (formField, splitPart, parentField) {
      var convertedField = null;

      var keepField = formField.root ||
          (splitPart === 'all') ||
          (parentField && parentField.key &&
            (parentField.type === 'selectfieldset')) ||
          (formField.type && formField.type === 'help');
      if (!keepField) {
        keepField = (splitPart === 'included') && includeFormField(formField);
      }
      if (!keepField) {
        keepField = (splitPart === 'excluded') && excludeFormField(formField);
        if (keepField && !options.excludeCoupledKeys) {
          keepField = !includeFormField(formField);
        }
      }
      if (!keepField) {
        return null;
      }

      var childPart = splitPart;
      if ((childPart === 'included') &&
          !options.excludeCoupledKeys &&
          !formField.root) {
        childPart = 'all';
      }

      // Make a shallow copy of the field since we will preserve all of its
      // properties (save perhaps "items")
      convertedField = _.clone(formField);

      // Recurse through the descendants of the field
      if (convertedField.items) {
        convertedField.items = _.map(convertedField.items, function (field) {
          return convertFormField(field, childPart, convertedField);
        });
        convertedField.items = _.compact(convertedField.items);
      }
      return convertedField;
    };


    /**
     * Helper function that checks the given schema key definition
     * and returns true when the definition is referenced in the given
     * form field definition
     *
     * @function
     * @param {Object} formField The form field to check
     * @param {string} schemaKey The key to search in the form field
     * @return {boolean} true if the form field references the key somehow,
     *   false otherwise.
     */
    var includeSchemaKey = function (formField, schemaKey) {
      if (!formField) return false;
      if (!schemaKey) return false;

      if (_.isString(formField)) {
        // Direct reference to a key in the schema
        return (formField === schemaKey) ||
          (formField.indexOf(schemaKey + '.') === 0) ||
          (formField.indexOf(schemaKey + '[]') === 0);
      }

      if (formField.key) {
        if ((formField.key === schemaKey) ||
          (formField.key.indexOf(schemaKey + '.') === 0) ||
          (formField.key.indexOf(schemaKey + '[]') === 0)
        ) {
          return true;
        }
      }

      return !!_.some(formField.items, function (item) {
        return includeSchemaKey(item, schemaKey);
      });
    };


    // Prepare the included/excluded forms
    var converted = null;
    converted = convertFormField({
      items: jsonform.form,
      root: true
    }, 'included');
    if (converted) {
      result.included.form = converted.items;
    }
    converted = convertFormField({
      items: jsonform.form,
      root: true
    }, 'excluded');
    if (converted) {
      result.excluded.form = converted.items;
    }

    // Split the schema into two schemas.
    // (note that the "excluded" JSON Form object may contain keys that
    // are never referenced in the initial JSON Form layout. That's normal)
    var schemaProperties = jsonform.schema;
    if (schemaProperties.properties) {
      schemaProperties = schemaProperties.properties;
    }
    _.each(schemaProperties, function (schemaDefinition, schemaKey) {
      if (_.some(result.included.form, function (formField) {
        return includeSchemaKey(formField, schemaKey);
      })) {
        result.included.schema.properties[schemaKey] = schemaDefinition;
      }
      else {
        result.excluded.schema.properties[schemaKey] = schemaDefinition;
      }
    });

    return result;
  };

  global.JSONForm = global.JSONForm || {};
  global.JSONForm.split = split;

})((typeof exports !== 'undefined'),
  ((typeof exports !== 'undefined') ? exports : window),
  ((typeof _ !== 'undefined') ? _ : null));
