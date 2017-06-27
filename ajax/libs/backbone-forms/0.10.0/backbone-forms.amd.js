/**
 * Backbone Forms v0.10.0
 *
 * NOTE:
 * This version is for use with RequireJS
 * If using regular <script> tags to include your files, use backbone-forms.min.js
 *
 * Copyright (c) 2012 Charles Davison, Pow Media Ltd
 * 
 * License and more information at:
 * http://github.com/powmedia/backbone-forms
 */
define(['jquery', 'underscore', 'Backbone'], function($, _, Backbone) {

  
//==================================================================================================
//FORM
//==================================================================================================
  
var Form = (function() {

  return Backbone.View.extend({

    /**
     * Creates a new form
     *
     * @param {Object} options
     * @param {Model} [options.model]                 Model the form relates to. Required if options.data is not set
     * @param {Object} [options.data]                 Date to populate the form. Required if options.model is not set
     * @param {String[]} [options.fields]             Fields to include in the form, in order
     * @param {String[]|Object[]} [options.fieldsets] How to divide the fields up by section. E.g. [{ legend: 'Title', fields: ['field1', 'field2'] }]        
     * @param {String} [options.idPrefix]             Prefix for editor IDs. By default, the model's CID is used.
     * @param {String} [options.template]             Form template key/name
     * @param {String} [options.fieldsetTemplate]     Fieldset template key/name
     * @param {String} [options.fieldTemplate]        Field template key/name
     *
     * @return {Form}
     */
    initialize: function(options) { 
      //Check templates have been loaded
      if (!Form.templates.form) throw new Error('Templates not loaded');

      //Get the schema
      this.schema = (function() {
        if (options.schema) return options.schema;
      
        var model = options.model;
        if (!model) throw new Error('Could not find schema');
      
        if (_.isFunction(model.schema)) return model.schema();
      
        return model.schema;
      })();

      //Option defaults
      options = _.extend({
        template: 'form',
        fieldsetTemplate: 'fieldset',
        fieldTemplate: 'field'
      }, options);

      //Determine fieldsets
      if (!options.fieldsets) {
        var fields = options.fields || _.keys(this.schema);

        options.fieldsets = [{ fields: fields }];
      }
      
      //Store main attributes
      this.options = options;
      this.model = options.model;
      this.data = options.data;
      this.fields = {};
    },

    /**
     * Renders the form and all fields
     */
    render: function() {
      var self = this,
          options = this.options,
          template = Form.templates[options.template];
      
      //Create el from template
      var $form = $(template({
        fieldsets: '<b class="bbf-tmp"></b>'
      }));

      //Render fieldsets
      var $fieldsetContainer = $('.bbf-tmp', $form);

      _.each(options.fieldsets, function(fieldset) {
        $fieldsetContainer.append(self.renderFieldset(fieldset));
      });

      $fieldsetContainer.children().unwrap();

      //Set the template contents as the main element; removes the wrapper element
      this.setElement($form);

      return this;
    },

    /**
     * Renders a fieldset and the fields within it
     *
     * Valid fieldset definitions:
     * ['field1', 'field2']
     * { legend: 'Some Fieldset', fields: ['field1', 'field2'] }
     *
     * @param {Object|Array} fieldset     A fieldset definition
     * 
     * @return {jQuery}                   The fieldset DOM element
     */
    renderFieldset: function(fieldset) {
      var self = this,
          template = Form.templates[this.options.fieldsetTemplate],
          schema = this.schema,
          getNested = Form.helpers.getNested;

      //Normalise to object
      if (_.isArray(fieldset)) {
        fieldset = { fields: fieldset };
      }

      //Concatenating HTML as strings won't work so we need to insert field elements into a placeholder
      var $fieldset = $(template(_.extend({}, fieldset, {
        legend: '<b class="bbf-tmp-legend"></b>',
        fields: '<b class="bbf-tmp-fields"></b>'
      })));

      //Set legend
      if (fieldset.legend) {
        $fieldset.find('.bbf-tmp-legend').replaceWith(fieldset.legend);
      }
      //or remove the containing tag if there isn't a legend
      else {
        $fieldset.find('.bbf-tmp-legend').parent().remove();
      }

      var $fieldsContainer = $('.bbf-tmp-fields', $fieldset);

      //Render fields
      _.each(fieldset.fields, function(key) {
        //Get the field schema
        var itemSchema = (function() {
          //Return a normal key or path key
          if (schema[key]) return schema[key];

          //Return a nested schema, i.e. Object
          var path = key.replace(/\./g, '.subSchema.');
          return getNested(schema, path);
        })();

        if (!itemSchema) throw "Field '"+key+"' not found in schema";

        //Create the field
        var field = self.fields[key] = self.createField(key, itemSchema);

        //Render the fields with editors, apart from Hidden fields
        if (schema.type == 'Hidden') {
          field.editor = Form.helpers.createEditor('Hidden', options);
        } else {
          $fieldsContainer.append(field.render().el);
        }
      });

      $fieldsContainer = $fieldsContainer.children().unwrap()

      return $fieldset;
    },

    /**
     * Renders a field and returns it
     *
     * @param {String} key            The key for the field in the form schema
     * @param {Object} schema         Field schema
     *
     * @return {Field}                The field view
     */
    createField: function(key, schema) {
      schema.template = schema.template || this.options.fieldTemplate;

      var options = {
        form: this,
        key: key,
        schema: schema,
        idPrefix: this.options.idPrefix,
        template: this.options.fieldTemplate
      };

      if (this.model) {
        options.model = this.model;
      } else if (this.data) {
        options.value = this.data[key];
      } else {
        options.value = null;
      }

      return new Form.Field(options);
    },

    /**
     * Validate the data
     *
     * @return {Object} Validation errors
     */
    validate: function() {
      var self = this,
          fields = this.fields,
          model = this.model,
          errors = {};

      //Collect errors from schema validation
      _.each(fields, function(field) {
        var error = field.validate();
        if (error) {
          errors[field.key] = error;
        }
      });

      //Get errors from default Backbone model validator
      if (model && model.validate) {
        var modelErrors = model.validate(this.getValue());
        
        if (modelErrors) {
          var isDictionary = _.isObject(modelErrors) && !_.isArray(modelErrors);
          
          //If errors are not in object form then just store on the error object
          if (!isDictionary) {
            errors._others = errors._others || [];
            errors._others.push(modelErrors);
          }
          
          //Merge programmatic errors (requires model.validate() to return an object e.g. { fieldKey: 'error' })
          if (isDictionary) {
            _.each(modelErrors, function(val, key) {
              //Set error on field if there isn't one already
              if (self.fields[key] && !errors[key]) {
                self.fields[key].setError(val);
              }
              
              else {
                //Otherwise add to '_others' key
                errors._others = errors._others || [];
                var tmpErr = {};
                tmpErr[key] = val;
                errors._others.push(tmpErr);
              }
            });
          }
        }
      }

      return _.isEmpty(errors) ? null : errors;
    },

    /**
     * Update the model with all latest values.
     *
     * @return {Object}  Validation errors
     */
    commit: function() {
      //Validate
      var errors = this.validate();
      if (errors) return errors;

      //Commit
      var modelError;
      this.model.set(this.getValue(), {
        error: function(model, e) {
          modelError = e;
        }
      });
      
      if (modelError) return modelError;
    },

    /**
     * Get all the field values as an object.
     * Use this method when passing data instead of objects
     * 
     * @param {String} [key]    Specific field value to get
     */
    getValue: function(key) {
      //Return only given key if specified
      if (key) return this.fields[key].getValue();
      
      //Otherwise return entire form      
      var values = {};
      _.each(this.fields, function(field) {
        values[field.key] = field.getValue();
      });

      return values;
    },
    
    /**
     * Update field values, referenced by key
     * @param {Object} data     New values to set
     */
    setValue: function(data) {
      for (var key in data) {
        this.fields[key].setValue(data[key]);
      }
    },

    /**
     * Override default remove function in order to remove embedded views
     */
    remove: function() {
      var fields = this.fields;
      
      for (var key in fields) {
        fields[key].remove();
      }

      Backbone.View.prototype.remove.call(this);
    }
  });

})();


//==================================================================================================
//HELPERS
//==================================================================================================

Form.helpers = (function() {

  var helpers = {};

  /**
   * Gets a nested attribute using a path e.g. 'user.name'
   *
   * @param {Object} obj    Object to fetch attribute from
   * @param {String} path   Attribute path e.g. 'user.name'
   * @return {Mixed}
   * @api private
   */
  helpers.getNested = function(obj, path) {
    var fields = path.split(".");
    var result = obj;
    for (var i = 0, n = fields.length; i < n; i++) {
      result = result[fields[i]];
    }
    return result;
  }
  
  /**
   * This function is used to transform the key from a schema into the title used in a label.
   * (If a specific title is provided it will be used instead).
   * 
   * By default this converts a camelCase string into words, i.e. Camel Case
   * If you have a different naming convention for schema keys, replace this function.
   * 
   * @param {String}  Key
   * @return {String} Title
   */
  helpers.keyToTitle = function(str) {
    //Add spaces
    str = str.replace(/([A-Z])/g, ' $1');

    //Uppercase first character
    str = str.replace(/^./, function(str) { return str.toUpperCase(); });

    return str;
  };

  /**
   * Helper to compile a template with the {{mustache}} style tags. Template settings are reset
   * to user's settings when done to avoid conflicts.
   * @param {String}    Template string
   * @return {Template} Compiled template
   */
  helpers.compileTemplate = function(str) {
      //Store user's template options
      var _interpolateBackup = _.templateSettings.interpolate;

      //Set custom template settings
      _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

      var template = _.template(str);

      //Reset to users' template settings
      _.templateSettings.interpolate = _interpolateBackup;

      return template;
  }

  /**
   * Helper to create a template with the {{mustache}} style tags.
   * If context is passed in, the template will be evaluated.
   * @param {String}             Template string
   * @param {Object}             Optional; values to replace in template
   * @return {Template|String}   Compiled template or the evaluated string
   */
  helpers.createTemplate = function(str, context) {
    var template = helpers.compileTemplate(str);
    
    if (!context) {
      return template;
    } else {
      return template(context);
    }
  };
  

  /**
   * Sets the template compiler to the given function
   * @param {Function} Template compiler function
   */
  helpers.setTemplateCompiler = function(compiler) {
    helpers.compileTemplate = compiler;
  }
  
  
  /**
   * Sets the templates to be used.
   * 
   * If the templates passed in are strings, they will be compiled, expecting Mustache style tags,
   * i.e. <div>{{varName}}</div>
   *
   * You can also pass in previously compiled Underscore templates, in which case you can use any style
   * tags.
   * 
   * @param {Object} templates
   * @param {Object} classNames
   */
  helpers.setTemplates = function(templates, classNames) {
    var createTemplate = helpers.createTemplate;
    
    Form.templates = Form.templates || {};
    Form.classNames = Form.classNames || {};
    
    //Set templates, compiling them if necessary
    _.each(templates, function(template, key, index) {
      if (_.isString(template)) template = createTemplate(template);
      
      Form.templates[key] = template;
    });
    
    //Set class names
    _.extend(Form.classNames, classNames);
  };
  
  
  /**
   * Return the editor constructor for a given schema 'type'.
   * Accepts strings for the default editors, or the reference to the constructor function
   * for custom editors
   * 
   * @param {String|Function} The schema type e.g. 'Text', 'Select', or the editor constructor e.g. editors.Date
   * @param {Object}          Options to pass to editor, including required 'key', 'schema'
   * @return {Mixed}          An instance of the mapped editor
   */
  helpers.createEditor = function(schemaType, options) {
    var constructorFn;

    if (_.isString(schemaType)) {
      constructorFn = Form.editors[schemaType];
    } else {
      constructorFn = schemaType;
    }

    return new constructorFn(options);
  };
  
  /**
   * Triggers an event that can be cancelled. Requires the user to invoke a callback. If false
   * is passed to the callback, the action does not run.
   *
   * NOTE: This helper uses private Backbone apis so can break when Backbone is upgraded
   * 
   * @param {Mixed}       Instance of Backbone model, view, collection to trigger event on
   * @param {String}      Event name
   * @param {Array}       Arguments to pass to the event handlers
   * @param {Function}    Callback to run after the event handler has run.
   *                      If any of them passed false or error, this callback won't run
   */ 
  helpers.triggerCancellableEvent = function(subject, event, args, callback) { 
    //Return if there are no event listeners
    if (!subject._callbacks || !subject._callbacks[event]) return callback();
    
    var next = subject._callbacks[event].next;
    if (!next) return callback();
    
    var fn = next.callback,
        context = next.context || this;
    
    //Add the callback that will be used when done
    args.push(callback);
    
    fn.apply(context, args);
  }
  
  /**
   * Returns a validation function based on the type defined in the schema
   *
   * @param {RegExp|String|Function} validator
   * @return {Function}
   */
  helpers.getValidator = function(validator) {
    var validators = Form.validators;

    //Convert regular expressions to validators
    if (_.isRegExp(validator)) {
      return validators.regexp({ regexp: validator });
    }
    
    //Use a built-in validator if given a string
    if (_.isString(validator)) {
      if (!validators[validator]) throw new Error('Validator "'+validator+'" not found');
      
      return validators[validator]();
    }

    //Functions can be used directly
    if (_.isFunction(validator)) return validator;

    //Use a customised built-in validator if given an object
    if (_.isObject(validator) && validator.type) {
      var config = validator;
      
      return validators[config.type](config);
    }
    
    //Unkown validator type
    throw new Error('Invalid validator: ' + validator);
  };


  return helpers;

})();

  
//==================================================================================================
//VALIDATORS
//==================================================================================================

Form.validators = (function() {

  var validators = {};

  validators.errMessages = {
    required: 'Required',
    regexp: 'Invalid',
    email: 'Invalid email address',
    url: 'Invalid URL',
    match: 'Must match field "{{field}}"'
  }
  
  validators.required = function(options) {
    options = _.extend({
      type: 'required',
      message: this.errMessages.required
    }, options);
     
    return function required(value) {
      options.value = value;
      
      var err = {
        type: options.type,
        message: Form.helpers.createTemplate(options.message, options)
      };
      
      if (value === null || value === undefined || value === '') return err;
    };
  };
  
  validators.regexp = function(options) {
    if (!options.regexp) throw new Error('Missing required "regexp" option for "regexp" validator');
  
    options = _.extend({
      type: 'regexp',
      message: this.errMessages.regexp
    }, options);
    
    return function regexp(value) {
      options.value = value;
      
      var err = {
        type: options.type,
        message: Form.helpers.createTemplate(options.message, options)
      };
      
      //Don't check empty values (add a 'required' validator for this)
      if (value === null || value === undefined || value === '') return;

      if (!options.regexp.test(value)) return err;
    };
  };
  
  validators.email = function(options) {
    options = _.extend({
      type: 'email',
      message: this.errMessages.email,
      regexp: /^[\w\-]{1,}([\w\-.]{1,1}[\w\-]{1,}){0,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/
    }, options);
    
    return validators.regexp(options);
  };
  
  validators.url = function(options) {
    options = _.extend({
      type: 'url',
      message: this.errMessages.url,
      regexp: /^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i
    }, options);
    
    return validators.regexp(options);
  };
  
  validators.match = function(options) {
    if (!options.field) throw new Error('Missing required "field" options for "match" validator');
    
    options = _.extend({
      type: 'match',
      message: this.errMessages.match
    }, options);
    
    return function match(value, attrs) {
      options.value = value;
      
      var err = {
        type: options.type,
        message: Form.helpers.createTemplate(options.message, options)
      };
      
      //Don't check empty values (add a 'required' validator for this)
      if (value === null || value === undefined || value === '') return;
      
      if (value != attrs[options.field]) return err;
    }
  };


  return validators;

})();


//==================================================================================================
//FIELD
//==================================================================================================

Form.Field = (function() {

  var helpers = Form.helpers,
      templates = Form.templates;

  return Backbone.View.extend({

    /**
     * @param {Object}  Options
     *      Required:
     *          key     {String} : The model attribute key
     *      Optional:
     *          schema  {Object} : Schema for the field
     *          value       {Mixed} : Pass value when not using a model. Use getValue() to get out value
     *          model       {Backbone.Model} : Use instead of value, and use commit().
     *          idPrefix    {String} : Prefix to add to the editor DOM element's ID
     */
    /**
     * Creates a new field
     * 
     * @param {Object} options
     * @param {Object} [options.schema]     Field schema. Defaults to { type: 'Text' }
     * @param {Model} [options.model]       Model the field relates to. Required if options.data is not set.
     * @param {String} [options.key]        Model key/attribute the field relates to.
     * @param {Mixed} [options.value]       Field value. Required if options.model is not set.
     * @param {String} [options.idPrefix]   Prefix for the editor ID. By default, the model's CID is used.
     *
     * @return {Field}
     */
    initialize: function(options) {
      options = options || {};

      this.form = options.form;
      this.key = options.key;
      this.value = options.value;
      this.model = options.model;

      //Turn schema shorthand notation (e.g. 'Text') into schema object
      if (_.isString(options.schema)) options.schema = { type: options.schema };
      
      //Set schema defaults
      this.schema = _.extend({
        type: 'Text',
        title: helpers.keyToTitle(this.key),
        template: 'field'
      }, options.schema);
    },

    /**
     * Renders the field
     */
    render: function() {
      var schema = this.schema,
          templates = Form.templates;

      //Standard options that will go to all editors
      var options = {
        form: this.form,
        key: this.key,
        schema: schema,
        idPrefix: this.options.idPrefix,
        id: this.getId()
      };

      //Decide on data delivery type to pass to editors
      if (this.model) {
        options.model = this.model;
      } else {
        options.value = this.value;
      }

      //Decide on the editor to use
      var editor = this.editor = helpers.createEditor(schema.type, options);
      
      //Create the element
      var $field = $(templates[schema.template]({
        key: this.key,
        title: schema.title,
        id: editor.id,
        type: schema.type,
        editor: '<b class="bbf-tmp-editor"></b>',
        help: '<b class="bbf-tmp-help"></b>'
      }));
      
      //Render editor
      $field.find('.bbf-tmp-editor').replaceWith(editor.render().el);

      //Set help text
      this.$help = $('.bbf-tmp-help', $field).parent();
      this.$help.empty();
      if (this.schema.help) this.$help.html(this.schema.help);
      
      //Add custom CSS class names
      if (this.schema.fieldClass) $field.addClass(this.schema.fieldClass);
      
      //Add custom attributes
      if (this.schema.fieldAttrs) $field.attr(this.schema.fieldAttrs);
      
      //Replace the generated wrapper tag
      this.setElement($field);

      return this;
    },

    /**
     * Creates the ID that will be assigned to the editor
     *
     * @return {String}
     */
    getId: function() {
      var prefix = this.options.idPrefix,
          id = this.key;

      //Replace periods with underscores (e.g. for when using paths)
      id = id.replace(/\./g, '_');

      //If a specific ID prefix is set, use it
      if (_.isString(prefix) || _.isNumber(prefix)) return prefix + id;
      if (_.isNull(prefix)) return id;

      //Otherwise, if there is a model use it's CID to avoid conflicts when multiple forms are on the page
      if (this.model) return this.model.cid + '_' + id;

      return id;
    },
    
    /**
     * Check the validity of the field
     *
     * @return {String}
     */
    validate: function() {
      var error = this.editor.validate();

      if (error) {
        this.setError(error.message);
      } else {
        this.clearError();
      }

      return error;
    },
    
    /**
     * Set the field into an error state, adding the error class and setting the error message
     *
     * @param {String} msg     Error message
     */
    setError: function(msg) {
      //Object and NestedModel types set their own errors internally
      if (this.editor.hasNestedForm) return;
      
      var errClass = Form.classNames.error;

      this.$el.addClass(errClass);
      
      if (this.$help) this.$help.html(msg);
    },
    
    /**
     * Clear the error state and reset the help message
     */
    clearError: function() {
      var errClass = Form.classNames.error;
       
      this.$el.removeClass(errClass);
      
      // some fields (e.g., Hidden), may not have a help el
      if (this.$help) {
        this.$help.empty();
      
        //Reset help text if available
        var helpMsg = this.schema.help;
        if (helpMsg) this.$help.html(helpMsg);
      }
    },

    /**
     * Update the model with the new value from the editor
     */
    commit: function() {
      return this.editor.commit();
    },

    /**
     * Get the value from the editor
     *
     * @return {Mixed}
     */
    getValue: function() {
      return this.editor.getValue();
    },
    
    /**
     * Set/change the value of the editor
     *
     * @param {Mixed} value
     */
    setValue: function(value) {
      this.editor.setValue(value);
    },

    /**
     * Remove the field and editor views
     */
    remove: function() {
      this.editor.remove();

      Backbone.View.prototype.remove.call(this);
    }

  });

})();

//========================================================================
//EDITORS
//========================================================================

Form.editors = (function() {

  var helpers = Form.helpers;

  var editors = {};

  /**
   * Base editor (interface). To be extended, not used directly
   *
   * @param {Object}  Options
   *      Optional:
   *         model   {Backbone.Model} : Use instead of value, and use commit().
   *         key     {String} : The model attribute key. Required when using 'model'
   *         value   {String} : When not using a model. If neither provided, defaultValue will be used.
   *         schema  {Object} : May be required by some editors
   */
  editors.Base = Backbone.View.extend({

    defaultValue: null,

    initialize: function(options) {
      var options = options || {};

      if (options.model) {
        if (!options.key) throw "Missing option: 'key'";

        this.model = options.model;

        this.value = this.model.get(options.key);
      }
      else if (options.value) {
        this.value = options.value;
      }
      
      if (this.value === undefined) this.value = this.defaultValue;

      this.key = options.key;
      this.form = options.form;
      this.schema = options.schema || {};
      this.validators = options.validators || this.schema.validators;
      
      //Main attributes
      this.$el.attr('name', this.getName());
      
      //Add custom CSS class names
      if (this.schema.editorClass) this.$el.addClass(this.schema.editorClass);
      
      //Add custom attributes
      if (this.schema.editorAttrs) this.$el.attr(this.schema.editorAttrs);
    },

    getValue: function() {
      throw 'Not implemented. Extend and override this method.';
    },
    
    setValue: function() {
      throw 'Not implemented. Extend and override this method.';
    },

    /**
     * Get the value for the form input 'name' attribute
     *
     * @return {String}
     * 
     * @api private
     */
    getName: function() {
      var key = this.key || '';

      //Replace periods with underscores (e.g. for when using paths)
      return key.replace(/\./g, '_')
    },
    
    /**
     * Update the model with the current value
     * NOTE: The method is defined on the editors so that they can be used independently of fields
     *
     * @return {Mixed} error
     */
    commit: function() {
      var error = this.validate();
      if (error) return error;
      
      this.model.set(this.key, this.getValue(), {
        error: function(model, e) {
          error = e;
        }
      });
      
      if (error) return error;
    },
    
    /**
     * Check validity
     * NOTE: The method is defined on the editors so that they can be used independently of fields
     * 
     * @return {String}
     */
    validate: function() {
      var $el = this.$el,
          error = null,
          value = this.getValue(),
          formValues = this.form ? this.form.getValue() : {},
          validators = this.validators,
          getValidator = Form.helpers.getValidator;

      if (validators) {
        //Run through validators until an error is found
        _.every(validators, function(validator) {
          error = getValidator(validator)(value, formValues);

          return continueLoop = error ? false : true;
        });
      }

      return error;
    }
  });


  //TEXT
  editors.Text = editors.Base.extend({

    tagName: 'input',
    
    defaultValue: '',
    
    initialize: function(options) {
      editors.Base.prototype.initialize.call(this, options);
      
      var schema = this.schema;
      
      //Allow customising text type (email, phone etc.) for HTML5 browsers
      var type = 'text';
      
      if (schema && schema.editorAttrs && schema.editorAttrs.type) type = schema.editorAttrs.type;
      if (schema && schema.dataType) type = schema.dataType;

      this.$el.attr('type', type);
    },

    /**
     * Adds the editor to the DOM
     */
    render: function() {
      this.setValue(this.value);

      return this;
    },

    /**
     * Returns the current editor value
     * @return {String}
     */
    getValue: function() {
      return this.$el.val();
    },
    
    /**
     * Sets the value of the form element
     * @param {String}
     */
    setValue: function(value) { 
      this.$el.val(value);
    }

  });


  /**
   * NUMBER
   * Normal text input that only allows a number. Letters etc. are not entered
   */
  editors.Number = editors.Text.extend({

    defaultValue: 0,

    events: {
      'keypress': 'onKeyPress'
    },

    initialize: function(options) {
      editors.Text.prototype.initialize.call(this, options);

      this.$el.attr('type', 'number');
    },

    /**
     * Check value is numeric
     */
    onKeyPress: function(event) {
      //Allow backspace
      if (event.charCode == 0) return;
      
      //Get the whole new value so that we can prevent things like double decimals points etc.
      var newVal = this.$el.val() + String.fromCharCode(event.charCode);

      var numeric = /^[0-9]*\.?[0-9]*?$/.test(newVal);

      if (!numeric) event.preventDefault();
    },

    getValue: function() {        
      var value = this.$el.val();
      
      return value === "" ? null : parseFloat(value, 10);
    },
    
    setValue: function(value) {
      value = (function() {
        if (_.isNumber(value)) return value;

        if (_.isString(value) && value !== '') return parseFloat(value, 10);

        return null;
      })();

      if (_.isNaN(value)) value = null;
      
      editors.Text.prototype.setValue.call(this, value);
    }

  });


  //PASSWORD
  editors.Password = editors.Text.extend({

    initialize: function(options) {
      editors.Text.prototype.initialize.call(this, options);

      this.$el.attr('type', 'password');
    }

  });


  //TEXTAREA
  editors.TextArea = editors.Text.extend({

    tagName: 'textarea'

  });
  
  
  //CHECKBOX
  editors.Checkbox = editors.Base.extend({
      
    defaultValue: false,
    
    tagName: 'input',
    
    initialize: function(options) {
      editors.Base.prototype.initialize.call(this, options);
      
      this.$el.attr('type', 'checkbox');
    },

    /**
     * Adds the editor to the DOM
     */
    render: function() {
      this.setValue(this.value);

      return this;
    },
    
    getValue: function() {
      return this.$el.attr('checked') ? true : false;
    },
    
    setValue: function(value) {
      if (value) {
        this.$el.attr('checked', true);
      }
    }
    
  });
  
  
  //HIDDEN
  editors.Hidden = editors.Base.extend({
    
    defaultValue: '',

    initialize: function(options) {
      editors.Text.prototype.initialize.call(this, options);

      this.$el.attr('type', 'hidden');
    },
    
    getValue: function() {
      return this.value;
    },
    
    setValue: function(value) {
      this.value = value;
    }

  });


  /**
   * SELECT
   * 
   * Renders a <select> with given options
   *
   * Requires an 'options' value on the schema.
   *  Can be an array of options, a function that calls back with the array of options, a string of HTML
   *  or a Backbone collection. If a collection, the models must implement a toString() method
   */
  editors.Select = editors.Base.extend({

    tagName: 'select',

    initialize: function(options) {
      editors.Base.prototype.initialize.call(this, options);

      if (!this.schema || !this.schema.options) throw "Missing required 'schema.options'";
    },

    render: function() {
      var options = this.schema.options,
          self = this;

      //If a collection was passed, check if it needs fetching
      if (options instanceof Backbone.Collection) {
        var collection = options;

        //Don't do the fetch if it's already populated
        if (collection.length > 0) {
          self.renderOptions(options);
        } else {
          collection.fetch({
            success: function(collection) {
              self.renderOptions(options);
            }
          });
        }
      }

      //If a function was passed, run it to get the options
      else if (_.isFunction(options)) {
        options(function(result) {
          self.renderOptions(result);
        });
      }

      //Otherwise, ready to go straight to renderOptions
      else {
        self.renderOptions(options);
      }

      return this;
    },

    /**
     * Adds the <option> html to the DOM
     * @param {Mixed}   Options as a simple array e.g. ['option1', 'option2']
     *                      or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
     *                      or as a string of <option> HTML to insert into the <select>
     */
    renderOptions: function(options) {
      var $select = this.$el,
          html;

      //Accept string of HTML
      if (_.isString(options)) {
        html = options;
      }

      //Or array
      else if (_.isArray(options)) {
        html = this._arrayToHtml(options);
      }

      //Or Backbone collection
      else if (options instanceof Backbone.Collection) {
        html = this._collectionToHtml(options)
      }

      //Insert options
      $select.html(html);

      //Select correct option
      this.setValue(this.value);
    },

    getValue: function() {
      return this.$el.val();
    },
    
    setValue: function(value) {
      this.$el.val(value);
    },

    /**
     * Transforms a collection into HTML ready to use in the renderOptions method
     * @param {Backbone.Collection} 
     * @return {String}
     */
    _collectionToHtml: function(collection) {
      //Convert collection to array first
      var array = [];
      collection.each(function(model) {
        array.push({ val: model.id, label: model.toString() });
      });

      //Now convert to HTML
      var html = this._arrayToHtml(array);

      return html;
    },

    /**
     * Create the <option> HTML
     * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
     *                      or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
     * @return {String} HTML
     */
    _arrayToHtml: function(array) {
      var html = [];

      //Generate HTML
      _.each(array, function(option) {
        if (_.isObject(option)) {
          var val = option.val ? option.val : '';
          html.push('<option value="'+val+'">'+option.label+'</option>');
        }
        else {
          html.push('<option>'+option+'</option>');
        }
      });

      return html.join('');
    }

  });



  /**
   * RADIO
   * 
   * Renders a <ul> with given options represented as <li> objects containing radio buttons
   *
   * Requires an 'options' value on the schema.
   *  Can be an array of options, a function that calls back with the array of options, a string of HTML
   *  or a Backbone collection. If a collection, the models must implement a toString() method
   */
  editors.Radio = editors.Select.extend({

    tagName: 'ul',
    className: 'bbf-radio',

    getValue: function() {
      return this.$el.find('input[type=radio]:checked').val();
    },

    setValue: function(value) {
      this.$el.find('input[type=radio][value='+value+']').attr('checked', true);
    },

    /**
     * Create the radio list HTML
     * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
     *                      or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
     * @return {String} HTML
     */
    _arrayToHtml: function (array) {
      var html = [];
      var self = this;

      _.each(array, function(option, index) {
        var itemHtml = '<li>';
        if (_.isObject(option)) {
          var val = option.val ? option.val : '';
          itemHtml += ('<input type="radio" name="'+self.id+'" value="'+val+'" id="'+self.id+'-'+index+'" />')
          itemHtml += ('<label for="'+self.id+'-'+index+'">'+option.label+'</label>')
        }
        else {
          itemHtml += ('<input type="radio" name="'+self.id+'" value="'+option+'" id="'+self.id+'-'+index+'" />')
          itemHtml += ('<label for="'+self.id+'-'+index+'">'+option+'</label>')
        }
        itemHtml += '</li>';
        html.push(itemHtml);
      });

      return html.join('');
    }

  });



  /**
   * CHECKBOXES
   * Renders a <ul> with given options represented as <li> objects containing checkboxes
   *
   * Requires an 'options' value on the schema.
   *  Can be an array of options, a function that calls back with the array of options, a string of HTML
   *  or a Backbone collection. If a collection, the models must implement a toString() method
   */
  editors.Checkboxes = editors.Select.extend({

    tagName: 'ul',
    className: 'bbf-checkboxes',

    getValue: function() {
      var values = [];
      this.$el.find('input[type=checkbox]:checked').each(function() {
        values.push($(this).val());
      });
      return values;
    },

    setValue: function(value) {
      var self = this;
      _.each(value, function(val) {
        self.$el.find('input[type=checkbox][value="'+val+'"]').attr('checked', true);
      });
    },

    /**
     * Create the checkbox list HTML
     * @param {Array}   Options as a simple array e.g. ['option1', 'option2']
     *                      or as an array of objects e.g. [{val: 543, label: 'Title for object 543'}]
     * @return {String} HTML
     */
    _arrayToHtml: function (array) {
      var html = [];
      var self = this;

      _.each(array, function(option, index) {
        var itemHtml = '<li>';
        if (_.isObject(option)) {
          var val = option.val ? option.val : '';
          itemHtml += ('<input type="checkbox" name="'+self.id+'" value="'+val+'" id="'+self.id+'-'+index+'" />')
          itemHtml += ('<label for="'+self.id+'-'+index+'">'+option.label+'</label>')
        }
        else {
          itemHtml += ('<input type="checkbox" name="'+self.id+'" value="'+option+'" id="'+self.id+'-'+index+'" />')
          itemHtml += ('<label for="'+self.id+'-'+index+'">'+option+'</label>')
        }
        itemHtml += '</li>';
        html.push(itemHtml);
      });

      return html.join('');
    }

  });



  /**
   * OBJECT
   * 
   * Creates a child form. For editing Javascript objects
   * 
   * @param {Object} options
   * @param {Object} options.schema             The schema for the object
   * @param {Object} options.schema.subSchema   The schema for the nested form
   */
  editors.Object = editors.Base.extend({
    //Prevent error classes being set on the main control; they are internally on the individual fields
    hasNestedForm: true,

    className: 'bbf-object',

    initialize: function(options) {
      //Set default value for the instance so it's not a shared object
      this.value = {};

      //Init
      editors.Base.prototype.initialize.call(this, options);

      //Check required options
      if (!this.schema.subSchema) throw new Error("Missing required 'schema.subSchema' option for Object editor");
    },

    render: function() {
      //Create the nested form
      this.form = new Form({
        schema: this.schema.subSchema,
        data: this.value,
        idPrefix: this.id + '_',
        fieldTemplate: 'nestedField'
      });

      this.$el.html(this.form.render().el);

      return this;
    },

    getValue: function() {
      if (this.form) return this.form.getValue();

      return this.value;
    },
    
    setValue: function(value) {
      this.value = value;
      
      this.render();
    },

    remove: function() {
      this.form.remove();

      Backbone.View.prototype.remove.call(this);
    },
    
    validate: function() {
      return this.form.validate();
    }

  });



  /**
   * NESTED MODEL
   * 
   * Creates a child form. For editing nested Backbone models
   * 
   * Special options:
   *   schema.model:   Embedded model constructor
   */
  editors.NestedModel = editors.Object.extend({
    initialize: function(options) {
      editors.Base.prototype.initialize.call(this, options);

      if (!options.schema.model)
        throw 'Missing required "schema.model" option for NestedModel editor';
    },

    render: function() {
      var data = this.value || {},
          key = this.key,
          nestedModel = this.schema.model,
          nestedModelSchema = (nestedModel).prototype.schema;

      //Handle schema functions
      if (_.isFunction(nestedModelSchema)) nestedModelSchema = nestedModelSchema();

      this.form = new Form({
        schema: nestedModelSchema,
        model: new nestedModel(data),
        idPrefix: this.id + '_',
        fieldTemplate: 'nestedField'
      });

      //Render form
      this.$el.html(this.form.render().el);

      return this;
    },

    /**
     * Update the embedded model, checking for nested validation errors and pass them up
     * Then update the main model if all OK
     *
     * @return {Error|null} Validation error or null
     */
    commit: function() {
      var error = this.form.commit();
      if (error) {
        this.$el.addClass('error');
        return error;
      }

      return editors.Object.prototype.commit.call(this);
    }

  });



  /**
   * DATE
   *
   * Schema options
   * @param {Number|String} [options.schema.yearStart]  First year in list. Default: 100 years ago
   * @param {Number|String} [options.schema.yearEnd]    Last year in list. Default: current year
   *
   * Config options (if not set, defaults to options stored on the main Date class)
   * @param {Boolean} [options.showMonthNames]  Use month names instead of numbers. Default: true
   * @param {String[]} [options.monthNames]     Month names. Default: Full English names
   */
  editors.Date = editors.Base.extend({

    events: {
      'change select': 'updateHidden'
    },

    initialize: function(options) {
      options = options || {}

      editors.Base.prototype.initialize.call(this, options);

      var Self = editors.Date,
          today = new Date;

      //Option defaults
      this.options = _.extend({
        monthNames: Self.monthNames,
        showMonthNames: Self.showMonthNames
      }, options);

      //Schema defaults
      this.schema = _.extend({
        yearStart: today.getFullYear() - 100,
        yearEnd: today.getFullYear()
      }, options.schema || {});
            
      //Cast to Date
      if (this.value && !_.isDate(this.value)) {
        this.value = new Date(this.value);
      }
      
      //Set default date
      if (!this.value) {
        var date = new Date();
        date.setSeconds(0);
        date.setMilliseconds(0);
        
        this.value = date;
      }
    },

    render: function() {
      var options = this.options,
          schema = this.schema;

      var datesOptions = _.map(_.range(1, 32), function(date) {
        return '<option value="'+date+'">' + date + '</option>';
      });

      var monthsOptions = _.map(_.range(0, 12), function(month) {
        var value = options.showMonthNames ? options.monthNames[month] : (month + 1);
        return '<option value="'+month+'">' + value + '</option>';
      });

      var yearsOptions = _.map(_.range(schema.yearStart, schema.yearEnd + 1), function(year) {
        return '<option value="'+year+'">' + year + '</option>';
      });

      //Render the selects
      var $el = $(Form.templates.date({
        dates: datesOptions.join(''),
        months: monthsOptions.join(''),
        years: yearsOptions.join('')
      }));

      //Store references to selects
      this.$date = $el.find('[data-type="date"]');
      this.$month = $el.find('[data-type="month"]');
      this.$year = $el.find('[data-type="year"]');

      //Create the hidden field to store values in case POSTed to server
      this.$hidden = $('<input type="hidden" name="'+this.key+'" />');
      $el.append(this.$hidden);

      //Set value on this and hidden field
      this.setValue(this.value);

      //Remove the wrapper tag
      this.setElement($el);
      this.$el.attr('id', this.id);

      return this;
    },

    /**
    * @return {Date}   Selected date
    */
    getValue: function() {
      var year = this.$year.val(),
          month = this.$month.val(),
          date = this.$date.val();

      if (!year || !month || !date) return null;

      return new Date(year, month, date);
    },
    
    /**
     * @param {Date} date
     */
    setValue: function(date) {
      this.$date.val(date.getDate());
      this.$month.val(date.getMonth());
      this.$year.val(date.getFullYear());

      this.updateHidden();
    },

    /**
     * Update the hidden input which is maintained for when submitting a form
     * via a normal browser POST
     */
    updateHidden: function() {
      var val = this.getValue();
      if (_.isDate(val)) val = val.toISOString();

      this.$hidden.val(val);
    }

  }, {
    //STATICS

    //Whether to show month names instead of numbers
    showMonthNames: true,

    //Month names to use if showMonthNames is true
    //Replace for localisation, e.g. Form.editors.Date.monthNames = ['Janvier', 'Fevrier'...]
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  });


  /**
   * DATETIME
   * 
   * @param {Editor} [options.DateEditor]           Date editor view to use (not definition)
   * @param {Number} [options.schema.minsInterval]  Interval between minutes. Default: 15
   */
  editors.DateTime = editors.Base.extend({

    events: {
      'change select': 'updateHidden'
    },

    initialize: function(options) {
      options = options || {};

      editors.Base.prototype.initialize.call(this, options);

      //Option defaults
      this.options = _.extend({
        DateEditor: editors.DateTime.DateEditor
      }, options);

      //Schema defaults
      this.schema = _.extend({
        minsInterval: 15
      }, options.schema || {});

      //Create embedded date editor
      this.dateEditor = new this.options.DateEditor(options);

      this.value = this.dateEditor.value;
    },

    render: function() {
      function pad(n) {
        return n < 10 ? '0' + n : n
      }

      var schema = this.schema;

      //Create options
      var hoursOptions = _.map(_.range(0, 24), function(hour) {
        return '<option value="'+hour+'">' + pad(hour) + '</option>';
      });

      var minsOptions = _.map(_.range(0, 60, schema.minsInterval), function(min) {
        return '<option value="'+min+'">' + pad(min) + '</option>';
      });

      //Render time selects
      var $el = $(Form.templates.dateTime({
        date: '<b class="bbf-tmp"></b>',
        hours: hoursOptions.join(),
        mins: minsOptions.join()
      }));

      //Include the date editor
      $el.find('.bbf-tmp').replaceWith(this.dateEditor.render().el);

      //Store references to selects
      this.$hour = $el.find('[data-type="hour"]');
      this.$min = $el.find('[data-type="min"]');

      //Get the hidden date field to store values in case POSTed to server
      this.$hidden = $el.find('input[type="hidden"]');
      
      //Set time
      this.setValue(this.value);

      this.setElement($el);
      this.$el.attr('id', this.id);

      return this;
    },

    /**
    * @return {Date}   Selected datetime
    */
    getValue: function() {
      var date = this.dateEditor.getValue();

      var hour = this.$hour.val(),
          min = this.$min.val();

      if (!date || !hour || !min) return null;

      date.setHours(hour);
      date.setMinutes(min);

      return date;
    },
    
    setValue: function(date) {
      this.dateEditor.setValue(date);
      
      this.$hour.val(date.getHours());
      this.$min.val(date.getMinutes());

      this.updateHidden();
    },

    /**
     * Update the hidden input which is maintained for when submitting a form
     * via a normal browser POST
     */
    updateHidden: function() {
      var val = this.getValue();
      if (_.isDate(val)) val = val.toISOString();

      this.$hidden.val(val);
    }

  }, {
    //STATICS

    //The date editor to use (constructor function, not instance)
    DateEditor: editors.Date
  });

  return editors;

})();


  //SETUP
  
  //Add function shortcuts
  Form.setTemplates = Form.helpers.setTemplates;
  Form.setTemplateCompiler = Form.helpers.setTemplateCompiler;

  Form.templates = {};


  //DEFAULT TEMPLATES
  Form.setTemplates({
    
    //HTML
    form: '\
      <form class="bbf-form">{{fieldsets}}</form>\
    ',
    
    fieldset: '\
      <fieldset>\
        <legend>{{legend}}</legend>\
        <ul>{{fields}}</ul>\
      </fieldset>\
    ',
    
    field: '\
      <li class="bbf-field">\
        <label for="{{id}}">{{title}}</label>\
        <div class="bbf-editor">{{editor}}</div>\
        <div class="bbf-help">{{help}}</div>\
      </li>\
    ',

    nestedField: '\
      <li class="bbf-field" title="{{title}}">\
        <label for="{{id}}">{{title}}</label>\
        <div class="bbf-editor">{{editor}}</div>\
        <div class="bbf-help">{{help}}</div>\
      </li>\
    ',

    list: '\
      <div class="bbf-list">\
        <ul>{{items}}</ul>\
        <div class="bbf-actions"><button data-action="add">Add</div>\
      </div>\
    ',

    listItem: '\
      <li>\
        <button data-action="remove" class="bbf-remove">x</button>\
        <div class="bbf-editor-container">{{editor}}</div>\
      </li>\
    ',

    date: '\
      <div class="bbf-date">\
        <select data-type="date" class="bbf-date">{{dates}}</select>\
        <select data-type="month" class="bbf-month">{{months}}</select>\
        <select data-type="year" class="bbf-year">{{years}}</select>\
      </div>\
    ',

    dateTime: '\
      <div class="bbf-datetime">\
        <div class="bbf-date-container">{{date}}</div>\
        <select data-type="hour">{{hours}}</select>\
        :\
        <select data-type="min">{{mins}}</select>\
      </div>\
    ',

    'list.Modal': '\
      <div class="bbf-list-modal">\
        {{summary}}\
      </div>\
    '
  }, {

    //CLASSNAMES
    error: 'bbf-error'

  });



  //Exports
  return Form;

});
