'use strict';

/*! gettext.js - Guillaume Potier - MIT Licensed */
var i18n = function (options) {
 options = options || {};
 this && (this.__version = '1.1.1');

 // default values that could be overriden in i18n() construct
 var defaults = {
   domain: 'messages',
   locale: (typeof document !== 'undefined' ? document.documentElement.getAttribute('lang') : false) || 'en',
   plural_func: function (n) { return { nplurals: 2, plural: (n!=1) ? 1 : 0 }; },
   ctxt_delimiter: String.fromCharCode(4) // \u0004
 };

 // handy mixins taken from underscode.js
 var _ = {
   isObject: function (obj) {
     var type = typeof obj;
     return type === 'function' || type === 'object' && !!obj;
   },
   isArray: function (obj) {
     return toString.call(obj) === '[object Array]';
   }
 };

 var
   _plural_funcs = {},
   _locale = options.locale || defaults.locale,
   _domain = options.domain || defaults.domain,
   _dictionary = {},
   _plural_forms = {},
   _ctxt_delimiter = options.ctxt_delimiter || defaults.ctxt_delimiter;

   if (options.messages) {
     _dictionary[_domain] = {};
     _dictionary[_domain][_locale] = options.messages;
   }

   if (options.plural_forms) {
     _plural_forms[_locale] = options.plural_forms;
   }

   // sprintf equivalent, takes a string and some arguments to make a computed string
   // eg: strfmt("%1 dogs are in %2", 7, "the kitchen"); => "7 dogs are in the kitchen"
   // eg: strfmt("I like %1, bananas and %1", "apples"); => "I like apples, bananas and apples"
   // NB: removes msg context if there is one present
   var strfmt = function (fmt) {
      var args = arguments;

      return fmt
       // put space after double % to prevent placeholder replacement of such matches
       .replace(/%%/g, '%% ')
       // replace placeholders
       .replace(/%(\d+)/g, function (str, p1) {
         return args[p1];
       })
       // replace double % and space with single %
       .replace(/%% /g, '%')
   };

   var removeContext = function(str) {
      // if there is context, remove it
      if (str.indexOf(_ctxt_delimiter) !== -1) {
        var parts = str.split(_ctxt_delimiter);
        return parts[1];
      }

    return str;
   };

   var expand_locale = function(locale) {
       var locales = [locale],
           i = locale.lastIndexOf('-');
       while (i > 0) {
           locale = locale.slice(0, i);
           locales.push(locale);
           i = locale.lastIndexOf('-');
       }
       return locales;
   };

   var normalizeLocale = function (locale) {
      // Convert locale to BCP 47. If the locale is in POSIX format, locale variant and encoding is discarded.
      locale = locale.replace('_', '-');
      var i = locale.search(/[.@]/);
      if (i != -1) locale = locale.slice(0, i);
      return locale;
   };

   var getPluralFunc = function (plural_form) {
     // Plural form string regexp
     // taken from https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
     // plural forms list available here http://localization-guide.readthedocs.org/en/latest/l10n/pluralforms.html
     var pf_re = new RegExp('^\\s*nplurals\\s*=\\s*[0-9]+\\s*;\\s*plural\\s*=\\s*(?:\\s|[-\\?\\|&=!<>+*/%:;n0-9_\(\)])+');

     if (!pf_re.test(plural_form))
       throw new Error(strfmt('The plural form "%1" is not valid', plural_form));

     // Careful here, this is a hidden eval() equivalent..
     // Risk should be reasonable though since we test the plural_form through regex before
     // taken from https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
     // TODO: should test if https://github.com/soney/jsep present and use it if so
     return new Function("n", 'var plural, nplurals; '+ plural_form +' return { nplurals: nplurals, plural: (plural === true ? 1 : (plural ? plural : 0)) };');
   };

   // Proper translation function that handle plurals and directives
   // Contains juicy parts of https://github.com/Orange-OpenSource/gettext.js/blob/master/lib.gettext.js
   var t = function (messages, n, options /* ,extra */) {
     // Singular is very easy, just pass dictionnary message through strfmt
     if (!options.plural_form)
      return strfmt.apply(this, [removeContext(messages[0])].concat(Array.prototype.slice.call(arguments, 3)));

     var plural;

     // if a plural func is given, use that one
     if (options.plural_func) {
       plural = options.plural_func(n);

     // if plural form never interpreted before, do it now and store it
     } else if (!_plural_funcs[_locale]) {
       _plural_funcs[_locale] = getPluralFunc(_plural_forms[_locale]);
       plural = _plural_funcs[_locale](n);

     // we have the plural function, compute the plural result
     } else {
       plural = _plural_funcs[_locale](n);
     }

     // If there is a problem with plurals, fallback to singular one
     if ('undefined' === typeof plural.plural || plural.plural > plural.nplurals || messages.length <= plural.plural)
       plural.plural = 0;

     return strfmt.apply(this, [removeContext(messages[plural.plural]), n].concat(Array.prototype.slice.call(arguments, 3)));
   };

 return {
   strfmt: strfmt, // expose strfmt util
   expand_locale: expand_locale, // expose expand_locale util

   // Declare shortcuts
   __: function () { return this.gettext.apply(this, arguments); },
   _n: function () { return this.ngettext.apply(this, arguments); },
   _p: function () { return this.pgettext.apply(this, arguments); },

   setMessages: function (domain, locale, messages, plural_forms) {
     if (!domain || !locale || !messages)
       throw new Error('You must provide a domain, a locale and messages');

     if ('string' !== typeof domain || 'string' !== typeof locale || !_.isObject(messages))
       throw new Error('Invalid arguments');

     locale = normalizeLocale(locale);

     if (plural_forms)
       _plural_forms[locale] = plural_forms;

     if (!_dictionary[domain])
       _dictionary[domain] = {};

     _dictionary[domain][locale] = messages;

     return this;
   },
   loadJSON: function (jsonData, domain) {
     if (!_.isObject(jsonData))
       jsonData = JSON.parse(jsonData);

     if (!jsonData[''] || !jsonData['']['language'] || !jsonData['']['plural-forms'])
       throw new Error('Wrong JSON, it must have an empty key ("") with "language" and "plural-forms" information');

     var headers = jsonData[''];
     delete jsonData[''];

     return this.setMessages(domain || defaults.domain, headers['language'], jsonData, headers['plural-forms']);
   },
   setLocale: function (locale) {
     _locale = normalizeLocale(locale);
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
     return this.dcnpgettext.apply(this, [undefined, undefined, msgid, undefined, undefined].concat(Array.prototype.slice.call(arguments, 1)));
   },
   ngettext: function (msgid, msgid_plural, n /* , extra */) {
     return this.dcnpgettext.apply(this, [undefined, undefined, msgid, msgid_plural, n].concat(Array.prototype.slice.call(arguments, 3)));
   },
   pgettext: function (msgctxt, msgid /* , extra */) {
     return this.dcnpgettext.apply(this, [undefined, msgctxt, msgid, undefined, undefined].concat(Array.prototype.slice.call(arguments, 2)));
   },
   dcnpgettext: function (domain, msgctxt, msgid, msgid_plural, n /* , extra */) {
     domain = domain || _domain;

     if ('string' !== typeof msgid)
       throw new Error(this.strfmt('Msgid "%1" is not a valid translatable string', msgid));

     var
       translation,
       options = { plural_form: false },
       key = msgctxt ? msgctxt + _ctxt_delimiter + msgid : msgid,
       exist,
       locale,
       locales = expand_locale(_locale);

     for (var i in locales) {
        locale = locales[i];
        exist = _dictionary[domain] && _dictionary[domain][locale] && _dictionary[domain][locale][key];

        // because it's not possible to define both a singular and a plural form of the same msgid,
        // we need to check that the stored form is the same as the expected one.
        // if not, we'll just ignore the translation and consider it as not translated.
        if (msgid_plural) {
          exist = exist && "string" !== typeof _dictionary[domain][locale][key];
        } else {
          exist = exist && "string" === typeof _dictionary[domain][locale][key];
        }
        if (exist) {
          break;
        }
     }

     if (!exist) {
       translation = msgid;
       options.plural_func = defaults.plural_func;
     } else {
       translation = _dictionary[domain][locale][key];
     }

     // Singular form
     if (!msgid_plural)
       return t.apply(this, [[translation], n, options].concat(Array.prototype.slice.call(arguments, 5)));

     // Plural one
     options.plural_form = true;
     return t.apply(this, [exist ? translation : [msgid, msgid_plural], n, options].concat(Array.prototype.slice.call(arguments, 5)));
   }
 };
};

module.exports = i18n;
