(function(globals) {

  Ember.assert('i18n-plurals must be included after i18n.', globals.Ember.I18n != null);

  // CLDR Pluralization Data
  // see http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html

  // The six plural forms. Not all languages use all six forms.
  var Zero = 'zero',
      One = 'one',
      Two = 'two',
      Few = 'few',
      Many = 'many',
      Other = 'other',
      Data = {};

  function isInt(value) {
    return value << 0 === value;
  }

  function isAmong(value, array) {
    for ( var i = 0; i < array.length; ++i ) {
      if (array[i] === value) { return true; }
    }
    return false;
  }

  function defineLanguageRule(languages, rule) {
    for ( var i = 0; i < languages.length; ++i ) {
      Data[ languages[i] ] = rule;
    }
  }

  defineLanguageRule([
    'az', 'bm', 'my', 'zh', 'dz', 'ka', 'hu', 'ig', 'id', 'ja', 'jv', 'kea',
    'kn', 'km', 'ko', 'ses', 'lo', 'kde', 'ms', 'fa', 'root', 'sah', 'sg',
    'ii', 'th', 'bo', 'to', 'tr', 'vi', 'wo', 'yo'
  ], function(/* n */) {
    return Other;
  });

  defineLanguageRule([ 'gv' ], function(n) {
    if ( isAmong(n % 10, [ 1, 2 ]) || n % 20 === 0 ) { return One; }
    return Other;
  });

  defineLanguageRule([ 'tzm' ], function(n) {
    if ( n === 0 || n === 1 ) { return One; }
    if ( isInt(n) && n >= 11 && n <= 99 ) { return One; }
    return Other;
  });

  defineLanguageRule([ 'mk' ], function(n) {
    return n % 10 === 1 && n !== 11 ? One : Other;
  });

  defineLanguageRule([ 'fr', 'ff', 'kab' ], function(n) {
    return n >= 0 && n < 2 ? One : Other;
  });

  defineLanguageRule([
    'ak', 'am', 'bh', 'fil', 'guw', 'hi', 'ln', 'mg', 'nso', 'tl', 'ti', 'wa'
  ], function(n) {
    return n === 0 || n === 1 ? One : Other;
  });

  defineLanguageRule([
    'af', 'sq', 'eu', 'bem', 'bn', 'brx', 'bg', 'ca', 'chr', 'cgg', 'da', 'dv',
    'nl', 'en', 'eo', 'et', 'ee', 'fo', 'fi', 'fur', 'gl', 'lg', 'de', 'el',
    'gu', 'ha', 'haw', 'he', 'is', 'it', 'kl', 'kk', 'ku', 'lb', 'ml', 'mr',
    'mas', 'mn', 'nah', 'ne', 'no', 'nb', 'nn', 'nyn', 'or', 'om', 'pap', 'ps',
    'pt', 'pa', 'rm', 'ssy', 'saq', 'xog', 'so', 'es', 'sw', 'sv', 'gsw',
    'syr', 'ta', 'te', 'tk', 'ur', 'wae', 'fy', 'zu'
  ], function(n) {
    return n === 1 ? One : Other;
  });

  defineLanguageRule([ 'lv' ], function(n) {
    if (n === 0) { return Zero; }
    if (n % 10 === 1 && n % 100 !== 11) { return One; }
    return Other;
  });

  defineLanguageRule([ 'ksh' ], function(n) {
    if (n === 0) { return Zero; }
    if (n === 1) { return One; }
    return Other;
  });

  defineLanguageRule([ 'lag' ], function(n) {
    if (n === 0) { return Zero; }
    if (n > 0 && n < 2) { return One; }
    return Other;
  });

  defineLanguageRule([
    'kw', 'smn', 'iu', 'ga', 'smj', 'se', 'smi', 'sms', 'sma'
  ], function(n) {
    if (n === 1) { return One; }
    if (n === 2) { return Two; }
    return Other;
  });

  defineLanguageRule([
    'be', 'bs', 'hr', 'ru', 'sr', 'sh', 'uk'
  ], function(n) {
    var mod10  = n % 10,
        mod100 = n % 100;

    if ( mod10 === 1 && n % 100 !== 11 ) { return One; }

    if ( isAmong(mod10, [ 2, 3, 4 ]) &&
         !isAmong(mod100, [ 12, 13, 14 ]) ) { return Few; }

    if ( isAmong(mod10, [ 0, 5, 6, 7, 8, 9 ]) ||
         isAmong(mod100, [ 11, 12, 13, 14 ]) ) { return Many; }

    return Other;
  });

  defineLanguageRule([ 'pl' ], function(n) {
    var mod10  = n % 10,
        mod100 = n % 100;

    if ( n === 1 ) { return One; }

    if ( isAmong(mod10, [ 2, 3, 4 ]) &&
         !isAmong(mod100, [ 12, 13, 14 ]) ) { return Few; }

    if ( isAmong(mod10, [ 0, 1, 5, 6, 7, 8, 9 ]) ||
         isAmong(mod100, [ 12, 13, 14 ]) ) { return Many; }

    return Other;
  });

  defineLanguageRule([ 'lt' ], function(n) {
    var mod10  = n % 10,
        mod100 = n % 100;

    if ( mod10 === 1 && mod100 !== 11 ) { return One; }

    if ( isInt(n) &&
         mod10 >= 2 && mod10 <= 9 &&
         mod100 >= 12 && mod100 <= 19 ) { return Few; }

    return Other;
  });

  defineLanguageRule([ 'shi' ], function(n) {
    if ( n >= 0 && n <= 1 ) { return One; }
    if ( isInt(n) && n >= 2 && n <= 9 ) { return Few; }
    return Other;
  });

  defineLanguageRule([ 'mo', 'ro' ], function(n) {
    var mod100 = n % 100;

    if ( n === 1 ) { return One; }

    if ( n === 0 ||
         (isInt(n) && mod100 >= 1 && mod100 <= 19) ) { return Few; }

    return Other;
  });

  defineLanguageRule([ 'cs', 'sk' ], function(n) {
    if ( n === 1 ) { return One; }
    if ( isAmong(n, [ 2, 3, 4 ]) ) { return Few; }
    return Other;
  });

  defineLanguageRule([ 'sl' ], function(n) {
    var mod100 = n % 100;
    if ( mod100 === 1 ) { return One; }
    if ( mod100 === 2 ) { return Two; }
    if ( mod100 === 3 || mod100 === 4 ) { return Few; }
    return Other;
  });

  defineLanguageRule([ 'mt' ], function(n) {
    if ( n === 1 ) { return One; }
    var mod100 = n % 100;
    if ( isInt(mod100) && mod100 >= 2 && mod100 <= 10 ) { return Few; }
    if ( isInt(mod100) && mod100 >= 11 && mod100 <= 19 ) { return Many; }
    return Other;
  });

  defineLanguageRule([ 'ar' ], function(n) {
    if ( n === 0 ) { return Zero; }
    if ( n === 1 ) { return One; }
    if ( n === 2 ) { return Two; }
    var mod100 = n % 100;
    if ( isInt(mod100) && mod100 >= 3 && mod100 <= 10 ) { return Few; }
    if ( isInt(mod100) && mod100 >= 11 && mod100 <= 99 ) { return Many; }
    return Other;
  });

  defineLanguageRule([ 'br', 'cy' ], function(n) {
    switch ( n ) {
      case 0: return Zero;
      case 1: return One;
      case 2: return Two;
      case 3: return Few;
      case 6: return Many;
      default: return Other;
    }
  });

  // Look up the proper plural key for a count and language.
  // If Ember.I18n.locale is set, language is optional.
  //
  // For example:
  //
  //     Ember.I18n.pluralForm(0, 'en');     // => 'other'
  //     Ember.I18n.pluralForm(1, 'en-US');  // => 'one'
  //     Ember.I18n.pluralForm(2.383, 'fr'); // => 'other'
  //     Ember.I18n.pluralForm(1, 'zh');     // => 'other'
  //     Ember.I18n.pluralForm(26, 'uk');    // => 'many'
  //
  // @return [String] the proper key (one of `Ember.I18n.pluralForm.Zero`,
  //   `.One`, `.Two`, `.Few`, `.Many`, or `.Other`).
  function pluralForm(count, language) {
    if (count == null) { throw new Error("Ember.I18n.pluralForm requires a count"); }
    language = language || Ember.I18n.locale;
    if (language == null) { throw new Error("Ember.I18n.pluralForm requires a language"); }
    language = language.replace(/^(\w\w\w?)-?.*/, "$1");
    if (Data[language] == null) { throw new Error("No pluralization information for " + language); }
    return Data[language].call(undefined, +count);
  }

  pluralForm.Zero  = Zero;
  pluralForm.One   = One;
  pluralForm.Two   = Two;
  pluralForm.Few   = Few;
  pluralForm.Many  = Many;
  pluralForm.Other = Other;

  Ember.I18n.pluralForm = pluralForm;

}(this));
