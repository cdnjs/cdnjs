// Backbone.Syphon, v0.2.0
// Copyright (c)2012 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
// http://github.com/derickbailey/backbone.syphon
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["_", "jQuery","Backbone"], factory);
    }
}(this, function (_, jQuery, Backbone) {
  Backbone.Syphon = (function(Backbone, $, _){
    var Syphon = {};
  
    // Ignore Element Types
    // --------------------
  
    // Tell Syphon to ignore all elements of these types. You can
    // push new types to ignore directly in to this array.
    Syphon.ignoredTypes = ["button", "submit", "reset"];
  
    // Syphon
    // ------
  
    // Get a JSON object that represents
    // all of the form inputs, in this view
    Syphon.serialize = function(view, options){
      var data = {};
  
      // Build the configuration
      var config = _.clone(options) || {};
      config.ignoredTypes = _.clone(Syphon.ignoredTypes);
      config.inputReaders = config.inputReaders || Syphon.InputReaders;
      config.keyExtractors = config.keyExtractors || Syphon.KeyExtractors;
      config.keyAssignmentValidators = config.keyAssignmentValidators || Syphon.KeyAssignmentValidators;
  
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
          data[key] = value;
        }
      });
  
      // Done; send back the results.
      return data;
    };
  
    // Helpers
    // -------
  
    // Retrieve all of the form inputs
    // from the view
    var getInputElements = function(view, config){
      var form = view.$("form")[0];
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
  
      if (tagName.toLowerCase() === "input"){
        typeAttr = $el.attr("type");
        if (typeAttr){
          type = typeAttr;
        } else {
          type = "text";
        }
      }
      
      // Always return the type as lowercase
      // so it can be matched to lowercase
      // type registrations.
      return type.toLowerCase();
    };
  
    return Syphon;
  })(Backbone, jQuery, _);
  
  // Type Registry
  // -------------
  
  // Type Registries allow you to register something to
  // an input type, and retrieve either the item registered
  // for a specific type or the default registration
  Backbone.Syphon.TypeRegistry = function(){
    this.registeredTypes = {};
  };
  
  // Borrow Backbone's `extend` keyword for our TypeRegistry
  Backbone.Syphon.TypeRegistry.extend = Backbone.Model.extend;
  
  _.extend(Backbone.Syphon.TypeRegistry.prototype, {
  
    // Get the registered item by type. If nothing is
    // found for the specified type, the default is
    // returned.
    get: function(type){
      var item = this.registeredTypes[type];
  
      if (!item){
        item = this.registeredTypes["default"];
      }
  
      return item;
    },
  
    // Register a new item for a specified type
    register: function(type, item){
      this.registeredTypes[type] = item;
    },
  
    // Register a default item to be used when no
    // item for a specified type is found
    registerDefault: function(item){
      this.registeredTypes["default"] = item;
    },
  
    // Remove an item from a given type registration
    unregister: function(type){
      if (this.registeredTypes[type]){
        delete this.registeredTypes[type];
      }
    }
  });
  
  
  
  
  // Key Extractors
  // --------------
  
  // Key extractors produce the "key" in `{key: "value"}`
  // pairs, when serializing.
  Backbone.Syphon.KeyExtractorSet = Backbone.Syphon.TypeRegistry.extend();
  
  // Built-in Key Extractors
  Backbone.Syphon.KeyExtractors = new Backbone.Syphon.KeyExtractorSet();
  
  // The default key extractor, which uses the
  // input element's "id" attribute
  Backbone.Syphon.KeyExtractors.registerDefault(function($el){
    return $el.prop("name");
  });
  
  
  // Input Readers
  // -------------
  
  // Input Readers are used to extract the value from
  // an input element, for the serialized object result
  Backbone.Syphon.InputReaderSet = Backbone.Syphon.TypeRegistry.extend();
  
  // Built-in Input Readers
  Backbone.Syphon.InputReaders = new Backbone.Syphon.InputReaderSet();
  
  // The default input reader, which uses an input
  // element's "value"
  Backbone.Syphon.InputReaders.registerDefault(function($el){
    return $el.val();
  });
  
  // Checkbox reader, returning a boolean value for
  // whether or not the checkbox is checked.
  Backbone.Syphon.InputReaders.register("checkbox", function($el){
    var checked = $el.prop("checked");
    return checked;
  });
  
  
  // Key Assignment Validators
  // -------------------------
  
  // Key Assignment Validators are used to determine whether or not a
  // key should be assigned to a value, after the key and value have been
  // extracted from the element. This is the last opportunity to prevent
  // bad data from getting serialized to your object.
  
  Backbone.Syphon.KeyAssignmentValidatorSet = Backbone.Syphon.TypeRegistry.extend();
  
  // Build-in Key Assignment Validators
  Backbone.Syphon.KeyAssignmentValidators = new Backbone.Syphon.KeyAssignmentValidatorSet();
  
  // Everything is valid by default
  Backbone.Syphon.KeyAssignmentValidators.registerDefault(function(){ return true; });
  
  // But only the "checked" radio button for a given
  // radio button group is valid
  Backbone.Syphon.KeyAssignmentValidators.register("radio", function($el, key, value){ 
    return $el.prop("checked");
  });
  
  
  
  return Backbone.Syphon;
}));