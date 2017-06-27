//     (c) 2012 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.
//

//

!function(root) {
  'use strict';

  var phrases = {}, currentLocale = 'en';

// ## Public Methods

// ### Polyglot.locale([locale])
//
// Get or set locale. Internally, Polyglot only uses locale for pluralization.

  function locale(newLocale) {
    if (newLocale) currentLocale = newLocale;
    return currentLocale;
  }

// ### Polyglot.extend(phrases)
//
// Use `extend` to tell Polyglot how to translate a given key.
//
//     Polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The key can be any string.  Feel free to call `extend` multiple times;
// it will override any phrases with the same key, but leave existing phrases
// untouched.

  function extend(morePhrases) {
    for (var key in morePhrases) {
      if (morePhrases.hasOwnProperty(key)) {
        phrases[key] = morePhrases[key];
      }
    }
  }

// ### Polyglot.clear()
//
// Clears all phrases. Useful for special cases, such as freeing
// up memory if you have lots of phrases but no longer need to
// perform any translation. Also used internally by `replace`.

  function clear() {
    phrases = {};
  }

// ### Polyglot.replace(phrases)
//
// Completely replace the existing phrases with a new set of phrases.
// Normally, just use `extend` to add more phrases, but under certain
// circumstances, you may want to make sure no old phrases are lying around.

  function replace(newPhrases) {
    clear();
    extend(newPhrases);
  }

// ### Polyglot.t(key, options)
//
// The most-used method. Provide a key, and `t` will return the
// phrase.
//
//     Polyglot.t("hello");
//     => "Hello"
//
// The phrase value is provided first by a call to `Polyglot.extend()` or
// `Polyglot.replace()`.
//
// Pass in an object as the second argument to perform interpolation.
//
//     Polyglot.t("hello_name", {name: "Spike"});
//     => "Hello, Spike"
//
// If you like, you can provide a default value in case the phrase is missing.
// Use the special option key "_" to specify a default.
//
//     Polyglot.t("i_like_to_write_in_language", {
//       _: "I like to write in %{language}.",
//       language: "JavaScript"
//     });
//     => "I like to write in JavaScript."
//

  function t(key, options) {
    var result;
    options = options || {};
    var phrase = phrases[key] || options._ || '';
    if (phrase === '') {
      warn('Missing translation for key: "'+key+'"');
      result = key;
    } else {
      options = clone(options);
      // This allows you to pass an Array, Backbone.Collection, or anything
      // with a `length` property as the `smart_count` parameter for pluralization.
      if (options.smart_count != null && options.smart_count.length != null) {
        options.smart_count = options.smart_count.length;
      }
      result = choosePluralForm(phrase, currentLocale, options.smart_count);
      result = interpolate(result, options);
    }
    return result;
  }


  // #### Pluralization methods

  // The string that separates the different phrase possibilities.
  var delimeter = '||||',

  // Mapping from pluralization group plural logic.
  pluralTypes = {
    chinese:   function(n) { return 0; },
    german:    function(n) { return n !== 1 ? 1 : 0; },
    french:    function(n) { return n > 1 ? 1 : 0; },
    russian:   function(n) { return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2; },
    czech:     function(n) { return (n === 1) ? 0 : (n >= 2 && n <= 4) ? 1 : 2; },
    polish:    function(n) { return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2) },
    icelandic: function(n) { return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0; }
  },

  // Mapping from pluralization group to individual locales.
  pluralTypeToLanguages = {
    chinese:   ['id', 'ja', 'ko', 'ms', 'th', 'tr', 'zh'],
    german:    ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
    french:    ['fr', 'tl'],
    russian:   ['hr', 'ru'],
    czech:     ['cs'],
    polish:    ['pl'],
    icelandic: ['is'],
  },

  // Mapping from individual locale to pluralization group.
  languageToPluralType = (function(mapping){
    var type, langs, l, ret = {};
    for (type in mapping) {
      if (mapping.hasOwnProperty(type)) {
        langs = mapping[type];
        for (l in langs) {
          ret[langs[l]] = type;
        }
      }
    }
    return ret;
  })(pluralTypeToLanguages),

  // RegExp for trimming a string.
  trimRe = /^\s+|\s+$/g;

  // Trim a string.
  function trim(str){
    return str.replace(trimRe, '');
  }

  // Based on a phrase text that contains `n` plural forms separated
  // by `delimeter`, a `locale`, and a `count`, choose the correct
  // plural form, or none if `count` is `null`.
  function choosePluralForm(text, locale, count){
    var ret, texts, chosenText;
    if (count != null && text) {
      texts = text.split(delimeter);
      chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
      ret = trim(chosenText);
    } else {
      ret = text;
    }
    return ret;
  }

  function pluralTypeName(locale) {
    return languageToPluralType[locale] ||
      languageToPluralType['en'];
  }

  function pluralTypeIndex(locale, count) {
    return pluralTypes[pluralTypeName(locale)](count);
  }

// ### Polyglot.registerHandlebars(Handlebars)
//
// Registers Polyglot's Handlebars helpers on a given
// Handlebars context. This is automatically called if we find
// a global `Handlebars` object, which makes use in the
// browser a snap if Handlebars is included before Polyglot.
// Otherwise, you can manually register the Handlebars helpers
// by passing in a Handlebars conext, which is the primary Node
// use case:
//
//     var Handlebars = require('handlebars');
//     var Polyglot = require('polyglot');
//
//     console.log(Handlebars.helpers.t);
//     // => undefined
//
//     Polyglot.registerHandlebars(Handlebars);
//
//     console.log(Handlebars.helpers.t);
//     // => function(){...}

  function registerHandlebars(handlebars) {
    for (var key in handlebarsHelpers) {
      if (handlebarsHelpers.hasOwnProperty(key)) {
        handlebars.registerHelper(key, handlebarsHelpers[key]);
      }
    }
  }

// ## Private Methods

// ### interpolate
//
// Does the dirty work. Creates a `RegExp` object for each
// interpolation placeholder.

  function interpolate(phrase, options) {
    for (var arg in options) {
      if (arg !== '_' && options.hasOwnProperty(arg)) {
        // We create a new `RegExp` each time instead of using a more-efficient
        // string replace so that the same argument can be replaced multiple times
        // in the same phrase.
        phrase = phrase.replace(new RegExp('%\\{'+arg+'\\}', 'g'), options[arg]);
      }
    }
    return phrase;
  }

// ### warn
//
// Provides a warning in the console if a phrase key is missing.

  function warn(message) {
    root.console && root.console.warn && root.console.warn('WARNING: ' + message);
  }

// ### clone
//
// Clone an object.

  function clone(source) {
    var ret = {};
    for (var prop in source) {
      ret[prop] = source[prop];
    }
    return ret;
  }

// ## Handlebars helpers

  var handlebarsHelpers = {

// ### t
//
//     // In your JavaScript
//     Polyglot.extend({
//       "hello_first_and_last_name": "Hello, %{firstName} %{lastName}."
//     });
//
//     // In a Handlebars template
//     <h1>{{t "hello_first_and_last_name" firstName=firstName lastName=lastName}}</h1>
//
// gives:
//
//     <h1>Hello, Robert DeNiro.</h1>

    t: function(key, block) {
      return t(key, block.hash);
    }
  };


// ## Export public methods

  var Polyglot = {
    locale: locale,
    extend: extend,
    replace: replace,
    clear: clear,
    t: t,
    registerHandlebars: registerHandlebars
  };

// Export for Node, attach to `window` for browser.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Polyglot;
  } else {
    root.Polyglot = Polyglot;
  }


// Register Handlebars helpers if Handlebars is found.
// If not, you can manually register Handlebars helpers by
// calling `Polyglot.registerHandlebars(Handlebars)`,
// passing in your Handlebars context.
  if (root.Handlebars && root.Handlebars.registerHelper) {
    registerHandlebars(root.Handlebars);
  }

}(this);
