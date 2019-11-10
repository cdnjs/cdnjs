var singularRules  = [],
    pluralizeRules = [],
    // Using objects for fast lookups
    uncountables   = {},
    irregular      = {},
    sanitizeWord, sanitizeRule,
    restoreCase,
    pluralize,
    plural, singular;

sanitizeRule = function (rule) {
  if (typeof rule === 'string') {
    return new RegExp('^' + rule + '$', 'i');
  }
  return rule;
};

restoreCase = function (token) {
  // All capital letters
  if (token === token.toUpperCase()) {
    return function (word) {
      return word.toUpperCase();
    };
  }
  // Title cased word
  if (token[0] === token[0].toUpperCase()) {
    return function (word) {
      return word[0].toUpperCase() + word.substr(1);
    };
  }

  return function (word) {
    return word.toLowerCase();
  };
};

// Conveniently, the word will always lowercased when passes in here
sanitizeWord = function (word, collection) {
  if (word.length < 2) { return word; } // Empty string or no word to fix

  var found, match;
  if (typeof uncountables[word] === 'undefined') {
    found = collection.some(function (rule) {
      match = rule;
      return word.match(rule[0]);
    });
    if (found) {
      return word.replace(match[0], match[1]);
    }
  }
  return word;
};

pluralize = module.exports = function (word, count, inclusive) {
  count = +count || 0; // If the numbered count is falsy, use `0`

  return (inclusive ? count + ' ' : '') + (count === 1 ? singular(word) : plural(word));
};

plural = pluralize.plural = function (word) {
  var restoreWord = restoreCase(word);
  word            = word.trim().toLowerCase();

  if (irregular[word]) { return restoreWord(irregular[word]); }

  var found;
  Object.keys(irregular).some(function (singular) {
    if (irregular[singular] === word) {
      return found = word;
    }
  });
  if (found) { return restoreWord(found); }

  return restoreWord(sanitizeWord(word, pluralizeRules));
};

singular = pluralize.singular = function (word) {
  var restoreWord = restoreCase(word);
  word            = word.trim().toLowerCase();

  if (irregular[word]) { return restoreWord(word); }

  var found;
  Object.keys(irregular).some(function (singular) {
    if (irregular[singular] === word) {
      return found = singular;
    }
  });
  if (found) { return restoreWord(found); }

  return restoreWord(sanitizeWord(word, singularRules));
};

pluralize.addPluralRule = function (rule, replacement) {
  pluralizeRules.unshift([ sanitizeRule(rule), replacement ]);
};

pluralize.addSingularRule = function (rule, replacement) {
  singularRules.unshift([ sanitizeRule(rule), replacement ]);
};

pluralize.addUncountableRule = function (word) {
  if (typeof word === 'string') {
    return uncountables[word.toLowerCase()] = true;
  }

  // Set singular and plural references for the word
  pluralize.addPluralRule(word, '$&');
  pluralize.addSingularRule(word, '$&');
};

pluralize.addIrregularRule = function (singular, plural) {
  irregular[singular.toLowerCase()] = plural.toLowerCase();
};

// Pronouns
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
// Words ending in with a consonant and `o`
pluralize.addIrregularRule('canto',   'cantos');
pluralize.addIrregularRule('hetero',  'heteros');
pluralize.addIrregularRule('photo',   'photos');
pluralize.addIrregularRule('zero',    'zeros');
pluralize.addIrregularRule('piano',   'pianos');
pluralize.addIrregularRule('portico', 'porticos');
pluralize.addIrregularRule('pro',     'pros');
pluralize.addIrregularRule('quarto',  'quartos');
pluralize.addIrregularRule('kimono',  'kimonos');
// Anything else
pluralize.addIrregularRule('ox',     'oxen');
pluralize.addIrregularRule('die',    'dice');
pluralize.addIrregularRule('foot',   'feet');
pluralize.addIrregularRule('goose',  'geese');
pluralize.addIrregularRule('quiz',   'quizzes');
pluralize.addIrregularRule('human',  'humans');
pluralize.addIrregularRule('proof',  'proofs');
pluralize.addIrregularRule('carve',  'carves');
pluralize.addIrregularRule('valve',  'valves');
pluralize.addIrregularRule('thief',  'thieves');
pluralize.addIrregularRule('genie',  'genies');
pluralize.addIrregularRule('groove', 'grooves');
// Ends with `us`
pluralize.addIrregularRule('genus',  'genera');
pluralize.addIrregularRule('viscus', 'viscera');
// Ends with `ma`
pluralize.addIrregularRule('stigma',   'stigmata');
pluralize.addIrregularRule('stoma',    'stomata');
pluralize.addIrregularRule('dogma',    'dogmata');
pluralize.addIrregularRule('lemma',    'lemmata');
pluralize.addIrregularRule('schema',   'schemata');
pluralize.addIrregularRule('anathema', 'anathemata');

// Pluralization regular expressions
pluralize.addPluralRule(/$/, 's');
pluralize.addPluralRule(/s$/, 's');
pluralize.addPluralRule(/(ese)$/, '$1');
pluralize.addPluralRule(/^(ax|test)is$/, '$1es');
pluralize.addPluralRule(/([au]s)$/, '$1es');
pluralize.addPluralRule(/(e[mn]u)s?$/, '$1s');
pluralize.addPluralRule(/([^l]ias|[aeiou]las|[emjzr]as)$/, '$1');
pluralize.addPluralRule(/(bu)s$/, '$1ses');
pluralize.addPluralRule(/(alumn|syllab|octop|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc)(?:us|i)$/, '$1i');
pluralize.addPluralRule(/^(alumn|alg|vertebr)(?:a|ae)$/, '$1ae');
pluralize.addPluralRule(/([^aeiou])o$/, '$1oes');
pluralize.addPluralRule(/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/, '$1a');
pluralize.addPluralRule(/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)(?:a|on)$/, '$1a');
pluralize.addPluralRule(/sis$/, 'ses');
pluralize.addPluralRule(/(?:([^f])fe|(ar|l|[eo][ao])f)$/, '$1$2ves');
pluralize.addPluralRule(/([^aeiouy]|qu)y$/, '$1ies');
pluralize.addPluralRule(/(x|ch|ss|sh|zz)$/, '$1es');
pluralize.addPluralRule(/(matr|cod|mur|sil|vert|ind)(?:ix|ex)$/, '$1ices');
pluralize.addPluralRule(/^(m|l)(ice|ouse)$/, '$1ice');
pluralize.addPluralRule(/(pe)(rson|ople)$/, '$1ople');
pluralize.addPluralRule(/(child)(ren)?$/, '$1ren');
pluralize.addPluralRule(/(eau)x?$/, '$1x');
pluralize.addPluralRule(/m(a|e)n$/, 'men');

// Singularization regular expressions
pluralize.addSingularRule(/s$/, '');
pluralize.addSingularRule(/(ss)$/, '$1');
pluralize.addSingularRule(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(?:sis|ses)$/, '$1sis');
pluralize.addSingularRule(/(^analy)(?:sis|ses)$/, '$1sis');
pluralize.addSingularRule(/([^afor])ves$/, '$1fe');
pluralize.addSingularRule(/(hive|tive|dr?ive)s$/, '$1');
pluralize.addSingularRule(/(ar|l|[eo][ao])ves$/, '$1f');
pluralize.addSingularRule(/([^aeiouy]|qu)ies$/, '$1y');
pluralize.addSingularRule(/(^[pl]ie|tie|zombie)s$/, '$1');
pluralize.addSingularRule(/(x|ch|ss|sh|zz)es$/, '$1');
pluralize.addSingularRule(/^(m|l)ice$/, '$1ouse');
pluralize.addSingularRule(/(bus|alias|[impst]us|atlas|gas)(?:es)?$/, '$1');
pluralize.addSingularRule(/(e[mn]u)s?$/, '$1');
pluralize.addSingularRule(/(o)es$/, '$1');
pluralize.addSingularRule(/^(canoe)s$/, '$1');
pluralize.addSingularRule(/(shoe|movie|move)s$/, '$1');
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

// http://en.wikipedia.org/wiki/English_plural#Singulars_without_plurals
[
'advice', 'agenda', 'bison', 'bream', 'buffalo', 'carp', 'chassis',
'cod', 'cooperation', 'corps', 'digestion', 'debris', 'diabetes',
'energy', 'equipment', 'elk', 'excretion', 'expertise', 'flounder',
'gallows', 'graffiti', 'headquarters', 'health', 'herpes', 'highjinks',
'homework', 'information', 'jeans', 'justice', 'labour', 'machinery',
'mackerel', 'media', 'mews', 'money', 'moose', 'news', 'pike', 'plankton',
'pliers', 'pollution', 'rain', 'rice', 'salmon', 'scissors', 'series',
'sewage', 'shrimp', 'species', 'staff', 'swine', 'trout', 'tuna',
'whiting', 'wildebeest'
].forEach(pluralize.addUncountableRule);

// Uncountable regexes
pluralize.addUncountableRule(/pox$/);
pluralize.addUncountableRule(/ois$/);
pluralize.addUncountableRule(/deer$/);
pluralize.addUncountableRule(/fish$/);
pluralize.addUncountableRule(/sheep$/);
pluralize.addUncountableRule(/measles$/);
pluralize.addUncountableRule(/[nrlm]ese$/);
