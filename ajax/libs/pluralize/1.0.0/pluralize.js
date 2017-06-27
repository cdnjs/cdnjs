(function (root, pluralize) {
  /* istanbul ignore else */
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    // Node.
    module.exports = pluralize();
  } else if (typeof define === 'function' && define.amd) {
    // AMD, registers as an anonymous module.
    define(function () {
      return pluralize();
    });
  } else {
    // Browser global.
    root.pluralize = pluralize();
  }
})(this, function () {
  // Rule storage - pluralize and singularize need to be run sequentially,
  // while other rules can be optimized using an object for instant lookups.
  var pluralRules      = [];
  var singularRules    = [];
  var uncountables     = {};
  var irregularPlurals = {};
  var irregularSingles = {};

  /**
   * Lowercase a string.
   *
   * @param  {string} str
   * @return {string}
   */
  var toLowerCase = function (str) {
    return str.toLowerCase();
  };

  /**
   * Uppercase a string.
   *
   * @param  {string} str
   * @return {string}
   */
  var toUpperCase = function (str) {
    return str.toUpperCase();
  };

  /**
   * Titlecase a string.
   *
   * @param  {string} str
   * @return {string}
   */
  var toTitleCase = function (str) {
    return toUpperCase(str[0]) + toLowerCase(str.substr(1));
  };

  /**
   * Return a word. This involves stringifying and trimming whitespace.
   *
   * @param  {string} word
   * @return {string}
   */
  var toWord = function (word) {
    return String(word).trim();
  };

  /**
   * Return a lowercased word.
   *
   * @param  {string} word
   * @return {string}
   */
  var toLowerWord = function (word) {
    return toLowerCase(toWord(word));
  };

  /**
   * Sanitize a pluralization rule to a usable regular expression.
   *
   * @param  {(RegExp|string)} rule
   * @return {RegExp}
   */
  var sanitizeRule = function (rule) {
    if (typeof rule === 'string') {
      return new RegExp('^' + rule + '$');
    }

    return rule;
  };

  /**
   * Pass in a word token to produce a function that can replicate the case on
   * another word.
   *
   * @param  {string}   token
   * @return {Function}
   */
  var restoreCase = function (token) {
    // Capitalized word.
    if (token === token.toUpperCase()) {
      return toUpperCase;
    }

    // Title-cased word.
    if (token[0] === token[0].toUpperCase()) {
      return toTitleCase;
    }

    // Lower-cased word.
    return toLowerCase;
  };

  /**
   * Sanitize a word by passing in the word and sanitization rules.
   *
   * @param  {String}   word
   * @param  {Array}    collection
   * @return {String}
   */
  var sanitizeWord = function (word, collection) {
    // Empty string or doesn't need fixing.
    if (!word.length || uncountables[word]) {
      return word;
    }

    var len = collection.length;

    // Iterate over the sanitization rules and use the first one to match.
    while (len--) {
      var rule = collection[len];

      // If the rule passes, return the replacement.
      if (rule[0].test(word)) {
        return word.replace(rule[0], rule[1]);
      }
    }

    return word;
  };

  /**
   * Replace a word with the updated word.
   *
   * @param  {Object}   replaceMap
   * @param  {Object}   keepMap
   * @param  {Array}    rules
   * @return {Function}
   */
  var replaceWord = function (replaceMap, keepMap, rules) {
    return function (word) {
      // Ensure the word is a string.
      word = toWord(word);

      // Get the correct token and case restoration functions.
      var token   = toLowerCase(word);
      var restore = restoreCase(word);

      // Check against the keep object map.
      if (keepMap[token]) {
        return restore(token);
      }

      // Check against the replacement map for a direct word replacement.
      if (replaceMap[token]) {
        return restore(replaceMap[token]);
      }

      // Run all the rules against the word.
      return restore(sanitizeWord(token, rules));
    };
  };

  /**
   * Pluralize or singularize a word based on the passed in count.
   *
   * @param  {String}  word
   * @param  {Number}  count
   * @param  {Boolean} inclusive
   * @return {String}
   */
  var pluralize = function (word, count, inclusive) {
    var pluralized = count === 1 ? singular(word) : plural(word);

    return (inclusive ? count + ' ' : '') + pluralized;
  };

  /**
   * Pluralize a word.
   *
   * @type {Function}
   */
  var plural = pluralize.plural = replaceWord(
    irregularSingles, irregularPlurals, pluralRules
  );

  /**
   * Singularize a word.
   *
   * @type {Function}
   */
  var singular = pluralize.singular = replaceWord(
    irregularPlurals, irregularSingles, singularRules
  );

  /**
   * Add a pluralization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addPluralRule = function (rule, replacement) {
    pluralRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add a singularization rule to the collection.
   *
   * @param {(string|RegExp)} rule
   * @param {string}          replacement
   */
  pluralize.addSingularRule = function (rule, replacement) {
    singularRules.push([sanitizeRule(rule), replacement]);
  };

  /**
   * Add an uncountable word rule.
   *
   * @param {(string|RegExp)} word
   */
  pluralize.addUncountableRule = function (word) {
    if (typeof word === 'string') {
      return uncountables[toLowerWord(word)] = true;
    }

    // Set singular and plural references for the word.
    pluralize.addPluralRule(word, '$&');
    pluralize.addSingularRule(word, '$&');
  };

  /**
   * Add an irregular word definition.
   *
   * @param {String} single
   * @param {String} plural
   */
  pluralize.addIrregularRule = function (single, plural) {
    plural = toLowerWord(plural);
    single = toLowerWord(single);

    irregularSingles[single] = plural;
    irregularPlurals[plural] = single;
  };

  /**
   * Irregular rules.
   */
  [
    // Pronouns.
    ['I',        'we'],
    ['me',       'us'],
    ['he',       'they'],
    ['she',      'they'],
    ['them',     'them'],
    ['myself',   'ourselves'],
    ['yourself', 'yourselves'],
    ['itself',   'themselves'],
    ['herself',  'themselves'],
    ['himself',  'themselves'],
    ['themself', 'themselves'],
    ['this',     'these'],
    ['that',     'those'],
    // Words ending in with a consonant and `o`.
    ['volcano', 'volcanoes'],
    ['tornado', 'tornadoes'],
    ['torpedo', 'torpedoes'],
    // Ends with `us`.
    ['genus',  'genera'],
    ['viscus', 'viscera'],
    // Ends with `ma`.
    ['stigma',   'stigmata'],
    ['stoma',    'stomata'],
    ['dogma',    'dogmata'],
    ['lemma',    'lemmata'],
    ['schema',   'schemata'],
    ['anathema', 'anathemata'],
    // Other irregular rules.
    ['ox',      'oxen'],
    ['axe',     'axes'],
    ['die',     'dice'],
    ['yes',     'yeses'],
    ['foot',    'feet'],
    ['eave',    'eaves'],
    ['beau',    'beaus'],
    ['goose',   'geese'],
    ['tooth',   'teeth'],
    ['quiz',    'quizzes'],
    ['human',   'humans'],
    ['proof',   'proofs'],
    ['carve',   'carves'],
    ['valve',   'valves'],
    ['thief',   'thieves'],
    ['genie',   'genies'],
    ['groove',  'grooves'],
    ['pickaxe', 'pickaxes'],
    ['whiskey', 'whiskies']
  ].forEach(function (rule) {
    return pluralize.addIrregularRule(rule[0], rule[1]);
  });

  /**
   * Pluralization rules.
   */
  [
    [/s?$/, 's'],
    [/([^aeiou]ese)$/, '$1'],
    [/^(ax|test)is$/, '$1es'],
    [/(alias|[^aou]us|tlas|gas|ris)$/, '$1es'],
    [/(e[mn]u)s?$/, '$1s'],
    [/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/, '$1'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc)(?:us|i)$/, '$1i'],
    [/^(alumn|alg|vertebr)(?:a|ae)$/, '$1ae'],
    [/(her|at)o$/, '$1oes'],
    [/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/, '$1a'],
    [/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)(?:a|on)$/, '$1a'],
    [/sis$/, 'ses'],
    [/(?:([^f])fe|(ar|l|[eo][ao])f)$/, '$1$2ves'],
    [/([^aeiouy]|qu)y$/, '$1ies'],
    [/([^ch][ieo][ln])ey$/, '$1ies'],
    [/(x|ch|ss|sh|zz)$/, '$1es'],
    [/(matr|cod|mur|sil|vert|ind)(?:ix|ex)$/, '$1ices'],
    [/^(m|l)(?:ice|ouse)$/, '$1ice'],
    [/(pe)(?:rson|ople)$/, '$1ople'],
    [/(child)(?:ren)?$/, '$1ren'],
    [/(eau)x?$/, '$1x'],
    [/m[ae]n$/, 'men']
  ].forEach(function (rule) {
    return pluralize.addPluralRule(rule[0], rule[1]);
  });

  /**
   * Singularization rules.
   */
  [
    [/s$/, ''],
    [/(ss)$/, '$1'],
    [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(?:sis|ses)$/, '$1sis'],
    [/(^analy)(?:sis|ses)$/, '$1sis'],
    [/([^aeflor])ves$/, '$1fe'],
    [/(hive|tive|dr?ive)s$/, '$1'],
    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/, '$1f'],
    [/([^aeiouy]|qu)ies$/, '$1y'],
    [/(^[pl]|zomb|^(?:neck)?t|[aeo][lt]|cut)ies$/, '$1ie'],
    [/([^c][eor]n|smil)ies$/, '$1ey'],
    [/^(m|l)ice$/, '$1ouse'],
    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|tlas|gas|hero|ato|ris)(?:es)?$/, '$1'],
    [/(e[mn]u)s?$/, '$1'],
    [/(movie|twelve)s$/, '$1'],
    [/(cris|test|diagnos)(?:is|es)$/, '$1is'],
    [/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc)(?:us|i)$/, '$1us'],
    [/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)a$/, '$1um'],
    [/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)a$/, '$1on'],
    [/^(alumn|alg|vertebr)ae$/, '$1a'],
    [/(cod|mur|sil|vert|ind)ices$/, '$1ex'],
    [/(matr)ices$/, '$1ix'],
    [/(pe)(rson|ople)$/, '$1rson'],
    [/(child)ren$/, '$1'],
    [/(eau)[sx]?$/, '$1'],
    [/men$/, 'man']
  ].forEach(function (rule) {
    return pluralize.addSingularRule(rule[0], rule[1]);
  });

  /**
   * Uncountable rules.
   */
  [
    // Singular words with no plurals.
    'advice',
    'agenda',
    'bison',
    'bream',
    'buffalo',
    'carp',
    'chassis',
    'cod',
    'cooperation',
    'corps',
    'digestion',
    'debris',
    'diabetes',
    'energy',
    'equipment',
    'elk',
    'excretion',
    'expertise',
    'flounder',
    'gallows',
    'graffiti',
    'headquarters',
    'health',
    'herpes',
    'highjinks',
    'homework',
    'information',
    'jeans',
    'justice',
    'kudos',
    'labour',
    'machinery',
    'mackerel',
    'media',
    'mews',
    'moose',
    'news',
    'pike',
    'plankton',
    'pliers',
    'pollution',
    'premises',
    'rain',
    'rice',
    'salmon',
    'scissors',
    'series',
    'sewage',
    'shambles',
    'shrimp',
    'species',
    'staff',
    'swine',
    'trout',
    'tuna',
    'whiting',
    'wildebeest',
    // Regexes.
    /pox$/, // "chickpox", "smallpox"
    /ois$/,
    /deer$/, // "deer", "reindeer"
    /fish$/, // "fish", "blowfish", "angelfish"
    /sheep$/,
    /measles$/,
    /[^aeiou]ese$/ // "chinese", "japanese"
  ].forEach(pluralize.addUncountableRule);

  return pluralize;
});
