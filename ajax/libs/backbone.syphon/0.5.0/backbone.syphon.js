(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'jquery'], function(_, Backbone, $) {
      return factory(_, Backbone, $);
    });
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var $ = require('jquery');
    module.exports = factory(_, Backbone, $);
  } else {
    factory(root._, root.Backbone, root.jQuery);
  }

}(this, function(_, Backbone, $) {
  'use strict';

  var previousSyphon = Backbone.Syphon;

  var Syphon = Backbone.Syphon = {};

  Syphon.VERSION = '0.5.0';

  Syphon.noConflict = function() {
    Backbone.Syphon = previousSyphon;
    return this;
  };

  /* jshint maxstatements: 13, maxlen: 102, maxcomplexity: 8, latedef: false */
  
  // Ignore Element Types
  // --------------------
  
  // Tell Syphon to ignore all elements of these types. You can
  // push new types to ignore directly in to this array.
  Syphon.ignoredTypes = ['button', 'submit', 'reset', 'fieldset'];
  
  // Syphon
  // ------
  
  // Get a JSON object that represents
  // all of the form inputs, in this view.
  // Alternately, pass a form element directly
  // in place of the view.
  Syphon.serialize = function(view, options){
    var data = {};
  
    // Build the configuration
    var config = buildConfig(options);
  
    // Get all of the elements to process
    var elements = getInputElements(view, config);
  
    // Process all of the elements
    _.each(elements, function(el){
      var $el = $(el);
      var type = getElementType($el);
  
      // Get the key for the input
      var keyExtractor = config.keyExtractors.get(type);
      var key = keyExtractor($el);
  
      // Get the value for the input
      var inputReader = config.inputReaders.get(type);
      var value = inputReader($el);
  
      // Get the key assignment validator and make sure
      // it's valid before assigning the value to the key
      var validKeyAssignment = config.keyAssignmentValidators.get(type);
      if (validKeyAssignment($el, key, value)){
        var keychain = config.keySplitter(key);
        data = assignKeyValue(data, keychain, value);
      }
    });
  
    // Done; send back the results.
    return data;
  };
  
  // Use the given JSON object to populate
  // all of the form inputs, in this view.
  // Alternately, pass a form element directly
  // in place of the view.
  Syphon.deserialize = function(view, data, options){
    // Build the configuration
    var config = buildConfig(options);
  
    // Get all of the elements to process
    var elements = getInputElements(view, config);
  
    // Flatten the data structure that we are deserializing
    var flattenedData = flattenData(config, data);
  
    // Process all of the elements
    _.each(elements, function(el){
      var $el = $(el);
      var type = getElementType($el);
  
      // Get the key for the input
      var keyExtractor = config.keyExtractors.get(type);
      var key = keyExtractor($el);
  
      // Get the input writer and the value to write
      var inputWriter = config.inputWriters.get(type);
      var value = flattenedData[key];
  
      // Write the value to the input
      inputWriter($el, value);
    });
  };
  
  // Helpers
  // -------
  
  // Retrieve all of the form inputs
  // from the form
  var getInputElements = function(view, config){
    var form = getForm(view);
    var elements = form.elements;
  
    elements = _.reject(elements, function(el){
      var reject;
      var type = getElementType(el);
      var extractor = config.keyExtractors.get(type);
      var identifier = extractor($(el));
  
      var foundInIgnored = _.include(config.ignoredTypes, type);
      var foundInInclude = _.include(config.include, identifier);
      var foundInExclude = _.include(config.exclude, identifier);
  
      if (foundInInclude){
        reject = false;
      } else {
        if (config.include){
          reject = true;
        } else {
          reject = (foundInExclude || foundInIgnored);
        }
      }
  
      return reject;
    });
  
    return elements;
  };
  
  // Determine what type of element this is. It
  // will either return the `type` attribute of
  // an `<input>` element, or the `tagName` of
  // the element when the element is not an `<input>`.
  var getElementType = function(el){
    var typeAttr;
    var $el = $(el);
    var tagName = $el[0].tagName;
    var type = tagName;
  
    if (tagName.toLowerCase() === 'input'){
      typeAttr = $el.attr('type');
      if (typeAttr){
        type = typeAttr;
      } else {
        type = 'text';
      }
    }
  
    // Always return the type as lowercase
    // so it can be matched to lowercase
    // type registrations.
    return type.toLowerCase();
  };
  
  // If a form element is given, just return it.
  // Otherwise, get the form element from the view.
  var getForm = function(viewOrForm){
    if (_.isUndefined(viewOrForm.$el) && viewOrForm.tagName.toLowerCase() === 'form'){
      return viewOrForm;
    } else {
      return viewOrForm.$el.is('form') ? viewOrForm.el : viewOrForm.$('form')[0];
    }
  };
  
  // Build a configuration object and initialize
  // default values.
  var buildConfig = function(options){
    var config = _.clone(options) || {};
  
    config.ignoredTypes = _.clone(Syphon.ignoredTypes);
    config.inputReaders = config.inputReaders || Syphon.InputReaders;
    config.inputWriters = config.inputWriters || Syphon.InputWriters;
    config.keyExtractors = config.keyExtractors || Syphon.KeyExtractors;
    config.keySplitter = config.keySplitter || Syphon.KeySplitter;
    config.keyJoiner = config.keyJoiner || Syphon.KeyJoiner;
    config.keyAssignmentValidators = config.keyAssignmentValidators || Syphon.KeyAssignmentValidators;
  
    return config;
  };
  
  // Assigns `value` to a parsed JSON key.
  //
  // The first parameter is the object which will be
  // modified to store the key/value pair.
  //
  // The second parameter accepts an array of keys as a
  // string with an option array containing a
  // single string as the last option.
  //
  // The third parameter is the value to be assigned.
  //
  // Examples:
  //
  // `['foo', 'bar', 'baz'] => {foo: {bar: {baz: 'value'}}}`
  //
  // `['foo', 'bar', ['baz']] => {foo: {bar: {baz: ['value']}}}`
  //
  // When the final value is an array with a string, the key
  // becomes an array, and values are pushed in to the array,
  // allowing multiple fields with the same name to be
  // assigned to the array.
  var assignKeyValue = function(obj, keychain, value) {
    if (!keychain){ return obj; }
  
    var key = keychain.shift();
  
    // build the current object we need to store data
    if (!obj[key]){
      obj[key] = _.isArray(key) ? [] : {};
    }
  
    // if it's the last key in the chain, assign the value directly
    if (keychain.length === 0){
      if (_.isArray(obj[key])){
        obj[key].push(value);
      } else {
        obj[key] = value;
      }
    }
  
    // recursive parsing of the array, depth-first
    if (keychain.length > 0){
      assignKeyValue(obj[key], keychain, value);
    }
  
    return obj;
  };
  
  // Flatten the data structure in to nested strings, using the
  // provided `KeyJoiner` function.
  //
  // Example:
  //
  // This input:
  //
  // ```js
  // {
  //   widget: 'wombat',
  //   foo: {
  //     bar: 'baz',
  //     baz: {
  //       quux: 'qux'
  //     },
  //     quux: ['foo', 'bar']
  //   }
  // }
  // ```
  //
  // With a KeyJoiner that uses [ ] square brackets,
  // should produce this output:
  //
  // ```js
  // {
  //  'widget': 'wombat',
  //  'foo[bar]': 'baz',
  //  'foo[baz][quux]': 'qux',
  //  'foo[quux]': ['foo', 'bar']
  // }
  // ```
  var flattenData = function(config, data, parentKey){
    var flatData = {};
  
    _.each(data, function(value, keyName){
      var hash = {};
  
      // If there is a parent key, join it with
      // the current, child key.
      if (parentKey){
        keyName = config.keyJoiner(parentKey, keyName);
      }
  
      if (_.isArray(value)){
        keyName += '[]';
        hash[keyName] = value;
      } else if (_.isObject(value)){
        hash = flattenData(config, value, keyName);
      } else {
        hash[keyName] = value;
      }
  
      // Store the resulting key/value pairs in the
      // final flattened data object
      _.extend(flatData, hash);
    });
  
    return flatData;
  };
  
  // Type Registry
  // -------------
  
  // Type Registries allow you to register something to
  // an input type, and retrieve either the item registered
  // for a specific type or the default registration
  var TypeRegistry = Syphon.TypeRegistry = function() {
    this.registeredTypes = {};
  };
  
  // Borrow Backbone's `extend` keyword for our TypeRegistry
  TypeRegistry.extend = Backbone.Model.extend;
  
  _.extend(TypeRegistry.prototype, {
  
    // Get the registered item by type. If nothing is
    // found for the specified type, the default is
    // returned.
    get: function(type){
      return this.registeredTypes[type] || this.registeredTypes['default'];
    },
  
    // Register a new item for a specified type
    register: function(type, item) {
      this.registeredTypes[type] = item;
    },
  
    // Register a default item to be used when no
    // item for a specified type is found
    registerDefault: function(item) {
      this.registeredTypes['default'] = item;
    },
  
    // Remove an item from a given type registration
    unregister: function(type) {
      if (this.registeredTypes[type]) {
        delete this.registeredTypes[type];
      }
    }
  });
  
  // Key Extractors
  // --------------
  
  // Key extractors produce the "key" in `{key: "value"}`
  // pairs, when serializing.
  var KeyExtractorSet = Syphon.KeyExtractorSet = TypeRegistry.extend();
  
  // Built-in Key Extractors
  var KeyExtractors = Syphon.KeyExtractors = new KeyExtractorSet();
  
  // The default key extractor, which uses the
  // input element's "name" attribute
  KeyExtractors.registerDefault(function($el) {
    return $el.prop('name') || '';
  });
  
  // Input Readers
  // -------------
  
  // Input Readers are used to extract the value from
  // an input element, for the serialized object result
  var InputReaderSet = Syphon.InputReaderSet = TypeRegistry.extend();
  
  // Built-in Input Readers
  var InputReaders = Syphon.InputReaders = new InputReaderSet();
  
  // The default input reader, which uses an input
  // element's "value"
  InputReaders.registerDefault(function($el){
    return $el.val();
  });
  
  // Checkbox reader, returning a boolean value for
  // whether or not the checkbox is checked.
  InputReaders.register('checkbox', function($el) {
    return $el.prop('checked');
  });
  
  // Input Writers
  // -------------
  
  // Input Writers are used to insert a value from an
  // object into an input element.
  var InputWriterSet = Syphon.InputWriterSet = TypeRegistry.extend();
  
  // Built-in Input Writers
  var InputWriters = Syphon.InputWriters = new InputWriterSet();
  
  // The default input writer, which sets an input
  // element's "value"
  InputWriters.registerDefault(function($el, value) {
    $el.val(value);
  });
  
  // Checkbox writer, set whether or not the checkbox is checked
  // depending on the boolean value.
  InputWriters.register('checkbox', function($el, value) {
    $el.prop('checked', value);
  });
  
  // Radio button writer, set whether or not the radio button is
  // checked.  The button should only be checked if it's value
  // equals the given value.
  InputWriters.register('radio', function($el, value) {
    $el.prop('checked', $el.val() === value.toString());
  });
  
  // Key Assignment Validators
  // -------------------------
  
  // Key Assignment Validators are used to determine whether or not a
  // key should be assigned to a value, after the key and value have been
  // extracted from the element. This is the last opportunity to prevent
  // bad data from getting serialized to your object.
  
  var KeyAssignmentValidatorSet = Syphon.KeyAssignmentValidatorSet = TypeRegistry.extend();
  
  // Build-in Key Assignment Validators
  var KeyAssignmentValidators = Syphon.KeyAssignmentValidators = new KeyAssignmentValidatorSet();
  
  // Everything is valid by default
  KeyAssignmentValidators.registerDefault(function() {
    return true;
  });
  
  // But only the "checked" radio button for a given
  // radio button group is valid
  KeyAssignmentValidators.register('radio', function($el, key, value) {
    return $el.prop('checked');
  });
  
  // Backbone.Syphon.KeySplitter
  // ---------------------------
  
  // This function is used to split DOM element keys in to an array
  // of parts, which are then used to create a nested result structure.
  // returning `["foo", "bar"]` results in `{foo: { bar: "value" }}`.
  //
  // Override this method to use a custom key splitter, such as:
  // `<input name="foo.bar.baz">`, `return key.split(".")`
  Syphon.KeySplitter = function(key) {
    var matches = key.match(/[^\[\]]+/g);
    var lastKey;
  
    if (key.indexOf('[]') === key.length - 2) {
      lastKey = matches.pop();
      matches.push([lastKey]);
    }
  
    return matches;
  };
  
  // Backbone.Syphon.KeyJoiner
  // -------------------------
  
  // Take two segments of a key and join them together, to create the
  // de-normalized key name, when deserializing a data structure back
  // in to a form.
  //
  // Example:
  //
  // With this data strucutre `{foo: { bar: {baz: "value", quux: "another"} } }`,
  // the key joiner will be called with these parameters, and assuming the
  // join happens with "[ ]" square brackets, the specified output:
  //
  // `KeyJoiner("foo", "bar")` //=> "foo[bar]"
  // `KeyJoiner("foo[bar]", "baz")` //=> "foo[bar][baz]"
  // `KeyJoiner("foo[bar]", "quux")` //=> "foo[bar][quux]"
  
  Syphon.KeyJoiner = function(parentKey, childKey) {
    return parentKey + '[' + childKey + ']';
  };
  

  return Backbone.Syphon;
}));
