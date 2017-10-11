/*! gettext.js - Guillaume Potier - MIT Licensed */
(function (root, undef) {
  // default values that could be overriden in i18n() construct
  var defaults = {
    domain: 'messages',
    locale: document.documentElement.getAttribute('lang') || 'en',
    plural_form: 'nplurals=2; plural=(n!=1);',
    ctxt_delimiter: String.fromCharCode(4)
  };

  // handy mixins taken from underscode.js
  var _ = {
    isObject: function (obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    },
    isArray: function (obj) {
      return toString.call(obj) === '[object Array]';
    },
    // _.get(window, 'foo.bar.baz') => window[foo][bar][baz]
    get: function (obj, path) {
      var
        i = 0,
        paths = (path || '').split('.');

      while (this.isObject(obj) || this.isArray(obj)) {
        obj = obj[paths[i++]];
        if (i === paths.length)
          return obj;
      }

      return undef;
    }
  };

  // Plural form string regexp
  // taken from https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
  var pf_re = new RegExp('^\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;a-zA-Z0-9_\(\)])+');

  var i18n = function (options) {
    options = options || {};
    this.__version = '0.0.1';

    var
      _locale = options.locale || defaults.locale,
      _domain = options.domain || defaults.domain,
      _dictionary = {},
      _plural_func = undef,
      _ctxt_delimiter = options.ctxt_delimiter || defaults.ctxt_delimiter,
      _plural_forms = options.plural_form || defaults.plural_form;

      // sprintf equivalent, takes a string and some arguments to make a computed string
      // eg: strfmt("%1 dogs are in %2", 7, "the kitchen"); => "7 dogs are in the kitchen"
      // eg: strfmt("I like %1, bananas and %1", "apples"); => "I like apples, bananas and apples"
      var strfmt = function (fmt) {
        var args = arguments;

        return fmt.replace(/%(\d+)/g, function (str, p1) {
          return args[p1];
        });
      };

      // Proper translation function that handle plurals and directives
      // Contains juicy parts of https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
      var t = function (messages, n /* ,extra */) {
        // Singular is very easy, just pass dictionnary message through strfmt
        if (1 === messages.length) {
          return strfmt.apply(this, [messages[0]].concat(Array.prototype.slice.call(arguments, 2)));
        }

        // Plural form never interpretated, do it then because we need it, we are facing a plural
        if (!_plural_func) {
          if (!pf_re.test(_plural_forms))
            throw new Error(strfmt('The plural form "%1" is not valid', _plural_forms));

          // Carefull here, this is a hidden eval() equivalent..
          // Risk should be reasonable though since we test the plural_form through regex before
          // taken from https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
          // TODO: should test if https://github.com/soney/jsep present and use it
          _plural_func = new Function("n", 'var plural, nplurals; '+ _plural_forms +' return { nplural: nplurals, plural: (plural === true ? 1 : (plural ? plural : 0)) };');
        }

        var plural = _plural_func(n) || {};

        // If there is a problem with plurals, fallback to singular one
        if ('undefined' === typeof plural.plural || plural.plural > plural.nplural || messages.length < plural.plural)
          plural.plural = 0;

        return strfmt.apply(this, [messages[plural.plural], n].concat(Array.prototype.slice.call(arguments, 2)));
      };

    return {
      strfmt: strfmt, // expose strfmt util

      // Declare shortcuts
      __: this.gettext,
      __n: this.ngettext,
      __p: this.pgettext,

      setMessages: function (domain, locale, messages, plural_forms) {
        if (!domain || !locale || !messages)
          throw new Error('You must provide a domain, a locale and messages');

        if ('string' !== typeof domain || 'string' !== locale || !_.isObject(messages))
          throw new Error('Invalid arguments');

        if (plural_forms)
          _plural_forms = plural_forms;

        if (!this.dictionary[domain])
          _dictionary[domain] = {};

        _dictionary[domain][locale] = messages;

        return this;
      },
      loadJSON: function (jsonData) {
        if (!jsonData[""] || !jsonData[""].lang || !jsonData[""].domain || !jsonData[""].plural_forms)
          throw new Error('Wrong JSON, it must have an empty key with domain, lang and plural_forms information');

        var headers = jsonData[""];
        delete jsonData[""];

        this.setMessages(headers.domain, headers.lang, jsonData, headers.plural_forms);
      },
      setLocale: function (locale) {
        _locale = locale;
        return this;
      },
      getLocale: function () {
        return _locale;
      },
      // getter/setter for domain
      textdomain: function (domain) {
        if (!domain)
          return _domain;
        _domain = domain;
        return this;
      },
      gettext: function (msgid /* , extra */) {
        return this.dcnpgettext.apply(this, [undef, undef, msgid, undef, undef].concat(Array.prototype.slice.call(arguments, 1)));
      },
      ngettext: function (msgid, msgid_plural, n /* , extra */) {
        return this.dcnpgettext.apply(this, [undef, undef, msgid, msgid_plural, n].concat(Array.prototype.slice.call(arguments, 3)));
      },
      pgettext: function (msgctxt, msgid /* , extra */) {
        return this.dcnpgettext.apply(this, [undef, msgctxt, msgid, undef, undef].concat(Array.prototype.slice.call(arguments, 2)));
      },
      dcnpgettext: function (domain, msgctxt, msgid, msgid_plural, n /* , extra */) {
        domain = domain || this.domain;

        if ('string' !== typeof msgid)
          throw new Error(this.strfmt('Msgid "%1" is not a valid translatable string', msgid));

        var
          key = msgctxt ? msgctxt + _ctxt_delimiter + msgid : msgid,
          translation = _.get(_dictionary, 'domain.' + _locale + '.' + key);

        // Singular form
        if (!msgid_plural)
          return t.apply(this, [[translation || msgid], n].concat(Array.prototype.slice.call(arguments, 5))); // if no translation found, use template msgid

        // Plural one
        return t.apply(this, [translation ? translation : [msgid, msgid_plural], n].concat(Array.prototype.slice.call(arguments, 5)));
      }
    };
  };

  // Handle node, commonjs
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = i18n;
    exports.i18n = i18n;

  // Handle AMD
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return i18n; });

  // Standard window browser thingy
  } else
    root['i18n'] = i18n;
})(this);
