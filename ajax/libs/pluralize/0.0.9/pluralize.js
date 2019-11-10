var singleRules = [];
var pluralRules = [];

// Use objects for simpler lookups.
var uncountables     = {};
var irregularPlurals = {};
var irregularSingles = {};

/**
 * Sanitize a pluralization rule to a usable regular expression.
 *
 * @param  {*}      rule
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
 * @param  {String}   token
 * @return {Function}
 */
var restoreCase = function (token) {
  // Capitalized word.
  if (token === token.toUpperCase()) {
    return function (word) {
      return word.toUpperCase();
    };
  }

  // Title-cased word.
  if (token[0] === token[0].toUpperCase()) {
    return function (word) {
      return word[0].toUpperCase() + word.substr(1);
    };
  }

  // Regular lower-cased word.
  return function (word) {
    return word.toLowerCase();
  };
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

  // Iterate over the sanitization rules and attempt to use ones that match.
  for (var i = 0; i < collection.length; i++) {
    var rule = collection[i];

    // If the rule matches the word, return the replacement.
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
    var token   = word.toString().trim().toLowerCase();
    var restore = restoreCase(word);

    // Check against the keep object map.
    if (keepMap[token]) {
      return restore(token);
    }

    // Check against the replacement map for a direct word replacement.
    if (replaceMap[token]) {
      return restore(replaceMap[token]);
    }

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
var pluralize = module.exports = function (word, count, inclusive) {
  var pluralized = count === 1 ? singular(word) : plural(word);

  return (inclusive ? (count|0) + ' ' : '') + pluralized;
};

/**
 * Pluralize a single word.
 *
 * @type {Function}
 */
var plural = pluralize.plural = replaceWord(
  irregularSingles, irregularPlurals, pluralRules
);

/**
 * Singularize a single word.
 *
 * @type {Function}
 */
var singular = pluralize.singular = replaceWord(
  irregularPlurals, irregularSingles, singleRules
);

/**
 * Add a pluralization rule to the collection.
 *
 * @param {RegExp} rule
 * @param {String} replacement
 */
pluralize.addPluralRule = function (rule, replacement) {
  pluralRules.unshift([sanitizeRule(rule), replacement]);
};

/**
 * Add a singularization rule to the collection.
 *
 * @param {RegExp} rule
 * @param {String} replacement
 */
pluralize.addSingularRule = function (rule, replacement) {
  singleRules.unshift([sanitizeRule(rule), replacement]);
};

/**
 * Add an uncountable word rule.
 *
 * @param {(String|RegExp)} word
 */
pluralize.addUncountableRule = function (word) {
  if (typeof word === 'string') {
    return uncountables[word.toLowerCase()] = true;
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
  plural = plural.toLowerCase();
  single = single.toLowerCase();

  irregularSingles[single] = plural;
  irregularPlurals[plural] = single;
};

/**
 * Pronouns.
 */
pluralize.addIrregularRule('I',        'we');
pluralize.addIrregularRule('me',       'us');
pluralize.addIrregularRule('he',       'they');
pluralize.addIrregularRule('she',      'they');
pluralize.addIrregularRule('them',     'them');
pluralize.addIrregularRule('myself',   'ourselves');
pluralize.addIrregularRule('yourself', 'yourselves');
pluralize.addIrregularRule('itself',   'themselves');
pluralize.addIrregularRule('herself',  'themselves');
pluralize.addIrregularRule('himself',  'themselves');
pluralize.addIrregularRule('themself', 'themselves');

/**
 * Words ending in with a consonant and `o`.
 */
pluralize.addIrregularRule('canto',   'cantos');
pluralize.addIrregularRule('hetero',  'heteros');
pluralize.addIrregularRule('photo',   'photos');
pluralize.addIrregularRule('zero',    'zeros');
pluralize.addIrregularRule('piano',   'pianos');
pluralize.addIrregularRule('portico', 'porticos');
pluralize.addIrregularRule('pro',     'pros');
pluralize.addIrregularRule('quarto',  'quartos');
pluralize.addIrregularRule('kimono',  'kimonos');

/**
 * Ends with `us`.
 */
pluralize.addIrregularRule('genus',  'genera');
pluralize.addIrregularRule('viscus', 'viscera');

/**
 * Ends with `ma`.
 */
pluralize.addIrregularRule('stigma',   'stigmata');
pluralize.addIrregularRule('stoma',    'stomata');
pluralize.addIrregularRule('dogma',    'dogmata');
pluralize.addIrregularRule('lemma',    'lemmata');
pluralize.addIrregularRule('schema',   'schemata');
pluralize.addIrregularRule('anathema', 'anathemata');

/**
 * Other irregular rules.
 */
pluralize.addIrregularRule('no',      'nos');
pluralize.addIrregularRule('ox',      'oxen');
pluralize.addIrregularRule('die',     'dice');
pluralize.addIrregularRule('yes',     'yeses');
pluralize.addIrregularRule('foot',    'feet');
pluralize.addIrregularRule('eave',    'eaves');
pluralize.addIrregularRule('goose',   'geese');
pluralize.addIrregularRule('quiz',    'quizzes');
pluralize.addIrregularRule('human',   'humans');
pluralize.addIrregularRule('proof',   'proofs');
pluralize.addIrregularRule('carve',   'carves');
pluralize.addIrregularRule('valve',   'valves');
pluralize.addIrregularRule('thief',   'thieves');
pluralize.addIrregularRule('genie',   'genies');
pluralize.addIrregularRule('canoe',   'canoes');
pluralize.addIrregularRule('groove',  'grooves');
pluralize.addIrregularRule('valley',  'vallies');
pluralize.addIrregularRule('whisky',  'whiskies');
pluralize.addIrregularRule('whiskey', 'whiskies');

/**
 * Pluralization regular expressions.
 */
pluralize.addPluralRule(/$/, 's');
pluralize.addPluralRule(/s$/, 's');
pluralize.addPluralRule(/([^aeiou]ese)$/, '$1');
pluralize.addPluralRule(/^(ax|test)is$/, '$1es');
pluralize.addPluralRule(/(alias|[bcimnpst]us|tlas|gas)$/, '$1es');
pluralize.addPluralRule(/(e[mn]u)s?$/, '$1s');
pluralize.addPluralRule(/([^l]ias|[aeiou]las|[emjzr]as|[iu]am)$/, '$1');
pluralize.addPluralRule(/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc)(?:us|i)$/, '$1i');
pluralize.addPluralRule(/^(alumn|alg|vertebr)(?:a|ae)$/, '$1ae');
pluralize.addPluralRule(/([^aeiou])o$/, '$1oes');
pluralize.addPluralRule(/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/, '$1a');
pluralize.addPluralRule(/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)(?:a|on)$/, '$1a');
pluralize.addPluralRule(/sis$/, 'ses');
pluralize.addPluralRule(/(?:([^f])fe|(ar|l|[eo][ao])f)$/, '$1$2ves');
pluralize.addPluralRule(/([^aeiouy]|qu)y$/, '$1ies');
pluralize.addPluralRule(/([^ch][ieor][ln])ey$/, '$1ies');
pluralize.addPluralRule(/(x|ch|ss|sh|zz)$/, '$1es');
pluralize.addPluralRule(/(matr|cod|mur|sil|vert|ind)(?:ix|ex)$/, '$1ices');
pluralize.addPluralRule(/^(m|l)(ice|ouse)$/, '$1ice');
pluralize.addPluralRule(/(pe)(rson|ople)$/, '$1ople');
pluralize.addPluralRule(/(child)(ren)?$/, '$1ren');
pluralize.addPluralRule(/(eau)x?$/, '$1x');
pluralize.addPluralRule(/m(a|e)n$/, 'men');

/**
 * Singularization regular expressions.
 */
pluralize.addSingularRule(/s$/, '');
pluralize.addSingularRule(/(ss)$/, '$1');
pluralize.addSingularRule(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(?:sis|ses)$/, '$1sis');
pluralize.addSingularRule(/(^analy)(?:sis|ses)$/, '$1sis');
pluralize.addSingularRule(/([^aeflor])ves$/, '$1fe');
pluralize.addSingularRule(/(hive|tive|dr?ive)s$/, '$1');
pluralize.addSingularRule(/(ar|(?:wo|[ae])l|[eo][ao])ves$/, '$1f');
pluralize.addSingularRule(/([^aeiouy]|qu)ies$/, '$1y');
pluralize.addSingularRule(/(^[pl]|zomb|^(?:neck)?t|[aeo][lt]|cut)ies$/, '$1ie');
pluralize.addSingularRule(/([^c][eor]n|[i]l)ies$/, '$1ey');
pluralize.addSingularRule(/(x|ch|ss|sh|zz)es$/, '$1');
pluralize.addSingularRule(/^(m|l)ice$/, '$1ouse');
pluralize.addSingularRule(/(alias|[bcimnpst]us|tlas|gas)(?:es)?$/, '$1');
pluralize.addSingularRule(/(e[mn]u)s?$/, '$1');
pluralize.addSingularRule(/(o)es$/, '$1');
pluralize.addSingularRule(/(shoe|movie|move|twelve)s$/, '$1');
pluralize.addSingularRule(/(cris|test|diagnos)(?:is|es)$/, '$1is');
pluralize.addSingularRule(/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc)(?:us|i)$/, '$1us');
pluralize.addSingularRule(/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)a$/, '$1um');
pluralize.addSingularRule(/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)a$/, '$1on');
pluralize.addSingularRule(/^(alumn|alg|vertebr)ae$/, '$1a');
pluralize.addSingularRule(/(cod|mur|sil|vert|ind)ices$/, '$1ex');
pluralize.addSingularRule(/(matr)ices$/, '$1ix');
pluralize.addSingularRule(/(pe)(rson|ople)$/, '$1rson');
pluralize.addSingularRule(/(child)ren$/, '$1');
pluralize.addSingularRule(/(eau)x$/, '$1');
pluralize.addSingularRule(/men$/, 'man');

/**
 * Singular words with no plurals.
 *
 * http://en.wikipedia.org/wiki/English_plural#Singulars_without_plurals
 */
[
  'advice', 'agenda', 'bison', 'bream', 'buffalo', 'carp', 'chassis',
  'cod', 'cooperation', 'corps', 'digestion', 'debris', 'diabetes',
  'energy', 'equipment', 'elk', 'excretion', 'expertise', 'flounder',
  'gallows', 'graffiti', 'headquarters', 'health', 'herpes', 'highjinks',
  'homework', 'information', 'jeans', 'justice', 'labour', 'machinery',
  'mackerel', 'media', 'mews', 'moose', 'news', 'pike', 'plankton', 'pliers',
  'pollution', 'rain', 'rice', 'salmon', 'scissors', 'series', 'sewage',
  'shrimp', 'species', 'staff', 'swine', 'trout', 'tuna', 'whiting',
  'wildebeest'
].forEach(pluralize.addUncountableRule);

/**
 * Uncountable word regexes.
 */
pluralize.addUncountableRule(/pox$/);
pluralize.addUncountableRule(/ois$/);
pluralize.addUncountableRule(/deer$/);
pluralize.addUncountableRule(/fish$/);
pluralize.addUncountableRule(/sheep$/);
pluralize.addUncountableRule(/measles$/);
pluralize.addUncountableRule(/[nrlm]ese$/);
