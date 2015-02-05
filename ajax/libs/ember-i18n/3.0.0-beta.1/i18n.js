(function(window) {
  var I18n, assert, findTemplate, get, set, lookupKey,
      PlainHandlebars, EmHandlebars, keyExists;

  PlainHandlebars = window.Handlebars;
  EmHandlebars = Ember.Handlebars;
  get = Ember.get;
  set = Ember.set;
  assert = Ember.assert;

  lookupKey = function(key, hash) {
    var firstKey, idx, remainingKeys;

    if (hash[key] != null) { return hash[key]; }

    if ((idx = key.indexOf('.')) !== -1) {
      firstKey = key.substr(0, idx);
      remainingKeys = key.substr(idx + 1);
      hash = hash[firstKey];
      if (hash) { return lookupKey(remainingKeys, hash); }
    }
  };

  findTemplate = function(key, setOnMissing) {
    assert("You must provide a translation key string, not %@".fmt(key), typeof key === 'string');
    var result = lookupKey(key, I18n.translations);

    if (setOnMissing) {
      if (result == null) {
        result = I18n.translations[key] = function() { return I18n.missingMessage(key); };
        result._isMissing = true;
        I18n.trigger('missing', key);
      }
    }

    if ((result != null) && !Ember.$.isFunction(result)) {
      result = I18n.translations[key] = I18n.compile(result);
    }

    return result;
  };

  keyExists = function(key) {
    var translation = lookupKey(key, I18n.translations);
    return translation != null && !translation._isMissing;
  };

  function eachTranslatedAttribute(object, fn) {
    var isTranslatedAttribute = /(.+)Translation$/,
        isTranslatedAttributeMatch;

    for (var key in object) {
      isTranslatedAttributeMatch = key.match(isTranslatedAttribute);
      if (isTranslatedAttributeMatch) {
        var translation = object[key] == null ? null : I18n.t(object[key]);
        fn.call(object, isTranslatedAttributeMatch[1], translation);
      }
    }
  }

  function compileTemplate(template) {
    return function(data) {
      return template.replace(/\{\{(.*?)\}\}/g, function(i, match) {
        return data[match];
      });
    };
  }

  I18n = Ember.Evented.apply({
    pluralForm: undefined,

    compile: compileTemplate,

    translations: {},

    // Ember.I18n.eachTranslatedAttribute(object, callback)
    //
    // Iterate over the keys in `object`; for each property that ends in "Translation",
    // call `callback` with the property name (minus the "Translation" suffix) and the
    // translation whose key is the property's value.
    eachTranslatedAttribute: eachTranslatedAttribute,

    template: function(key, count) {
      var interpolatedKey, result, suffix;
      if ((count != null) && (I18n.pluralForm != null)) {
        suffix = I18n.pluralForm(count);
        interpolatedKey = "%@.%@".fmt(key, suffix);
        result = findTemplate(interpolatedKey, false);
      }
      return result != null ? result : result = findTemplate(key, true);
    },

    t: function(key, context) {
      var template;
      if (context == null) context = {};
      template = I18n.template(key, get(context, 'count'));
      return template(context);
    },

    exists: keyExists,

    missingMessage: function(key) {
      return "Missing translation: " + key;
    },

    TranslateableProperties: Ember.Mixin.create({
      init: function() {
        var result = this._super.apply(this, arguments);
        eachTranslatedAttribute(this, function(attribute, translation) {
          this.addObserver(attribute + 'Translation', this, function(){
            set(this, attribute, I18n.t(this.get(attribute + 'Translation')));
          });
          set(this, attribute, translation);
        });

        return result;
      }
    }),

    TranslateableAttributes: Ember.Mixin.create({
      didInsertElement: function() {
        var result = this._super.apply(this, arguments);
        eachTranslatedAttribute(this, function(attribute, translation) {
          this.$().attr(attribute, translation);
        });
        return result;
      }
    })
  });

  Ember.I18n = I18n;

  EmHandlebars.registerBoundHelper('t', function(key, options) {
    return new PlainHandlebars.SafeString(I18n.t(key, options.hash));
  });

  var attrHelperFunction = function(options) {
    var attrs, result;
    attrs = options.hash;
    result = [];

    Ember.keys(attrs).forEach(function(property) {
      var translatedValue;
      translatedValue = I18n.t(attrs[property]);
      return result.push('%@="%@"'.fmt(property, translatedValue));
    });

    return new EmHandlebars.SafeString(result.join(' '));
  };

  EmHandlebars.registerHelper('translateAttr', attrHelperFunction);
  EmHandlebars.registerHelper('ta', attrHelperFunction);

}).call(undefined, this);
