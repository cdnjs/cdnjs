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
  uncountables[word.toLowerCase()] = true;
};

pluralize.addIrregularRule = function (singular, plural) {
  irregular[singular] = plural; // Hashed pattern
};

// http://en.wikipedia.org/wiki/English_plural#Singulars_without_plurals
[
'advice', 'agenda', 'bison', 'bream', 'buffalo', 'carp', 'chassis',
'cod', 'cooperation', 'corps', 'digestion', 'debris', 'deer', 'diabetes',
'energy', 'equipment', 'elk', 'excretion', 'expertise', 'fish', 'flounder',
'gallows', 'graffiti', 'headquarters', 'health', 'herpes', 'highjinks',
'homework', 'information', 'jeans', 'justice', 'labour', 'machinery',
'mackerel', 'media', 'mews', 'money', 'moose', 'news', 'pike', 'plankton',
'pliers', 'pollution', 'rain', 'rice', 'salmon', 'scissors', 'series',
'sewage', 'sheep', 'shrimp', 'species', 'staff', 'swine', 'trout',
'tuna', 'whiting', 'wildebeest'
].forEach(pluralize.addUncountableRule);

// Pronouns
pluralize.addIrregularRule('i', 'we');
pluralize.addIrregularRule('me', 'us');
pluralize.addIrregularRule('he', 'they');
pluralize.addIrregularRule('she', 'they');
pluralize.addIrregularRule('them', 'them');
pluralize.addIrregularRule('myself', 'ourselves');
pluralize.addIrregularRule('yourself', 'yourselves');
pluralize.addIrregularRule('itself', 'themselves');
pluralize.addIrregularRule('herself', 'themselves');
pluralize.addIrregularRule('himself', 'themselves');
pluralize.addIrregularRule('themself', 'themselves');
// Words ending in with a consonant and `o`
pluralize.addIrregularRule('canto', 'cantos');
pluralize.addIrregularRule('hetero', 'heteros');
pluralize.addIrregularRule('photo', 'photos');
pluralize.addIrregularRule('zero', 'zeros');
pluralize.addIrregularRule('piano', 'pianos');
pluralize.addIrregularRule('portico', 'porticos');
pluralize.addIrregularRule('pro', 'pros');
pluralize.addIrregularRule('quarto', 'quartos');
pluralize.addIrregularRule('kimono', 'kimonos');
// Everything else
pluralize.addIrregularRule('ox', 'oxen');
pluralize.addIrregularRule('die', 'dice');
pluralize.addIrregularRule('foot', 'feet');
pluralize.addIrregularRule('turf', 'turfs');
pluralize.addIrregularRule('goose', 'geese');
pluralize.addIrregularRule('quiz', 'quizzes');
pluralize.addIrregularRule('human', 'humans');
pluralize.addIrregularRule('proof', 'proofs');
pluralize.addIrregularRule('thief', 'thieves');
pluralize.addIrregularRule('stigma', 'stigmata');
// Ends with `us`
pluralize.addIrregularRule('alumnus', 'alumni');
pluralize.addIrregularRule('syllabus', 'syllabi');
pluralize.addIrregularRule('genus', 'genera');
pluralize.addIrregularRule('viscus', 'viscera');

pluralize.addPluralRule(/$/, 's');
pluralize.addPluralRule(/s$/, 's');
pluralize.addPluralRule(/(ese)$/, '$1');
pluralize.addPluralRule(/^(ax|test)is$/, '$1es');
pluralize.addPluralRule(/([au]s)$/, '$1es');
pluralize.addPluralRule(/([^l]ias|[aeiou]las|[emjzr]as)$/, '$1');
pluralize.addPluralRule(/(octop|vir|radi|nucle|fung|cact|stimul)(us|i)$/, '$1i');
pluralize.addPluralRule(/^(alumn|alg|vertebr)(a|ae)$/, '$1ae');
pluralize.addPluralRule(/(bu)s$/, '$1ses');
pluralize.addPluralRule(/([^aeiou])o$/, '$1oes');
pluralize.addPluralRule(/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi)(a|um)$/, '$1a');
pluralize.addPluralRule(/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)(a|on)$/, '$1a');
pluralize.addPluralRule(/sis$/, 'ses');
pluralize.addPluralRule(/(?:([^f])fe|([aolr])f)$/, '$1$2ves');
pluralize.addPluralRule(/([^aeiouy]|qu)y$/, '$1ies');
pluralize.addPluralRule(/(x|ch|ss|sh|zz)$/, '$1es');
pluralize.addPluralRule(/(matr|cod|mur|sil|vert|ind)(ix|ex)$/, '$1ices');
pluralize.addPluralRule(/^(m|l)(ice|ouse)$/, '$1ice');
pluralize.addPluralRule(/(pe)(rson|ople)$/, '$1ople');
pluralize.addPluralRule(/(child)(ren)?$/, '$1ren');
pluralize.addPluralRule(/(eau)x?$/, '$1x');
pluralize.addPluralRule(/m(a|e)n$/, 'men');

pluralize.addSingularRule(/s$/, '');
pluralize.addSingularRule(/(ss)$/, '$1');
pluralize.addSingularRule(/(n)ews$/, '$1ews');
pluralize.addSingularRule(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/, '$1sis');
pluralize.addSingularRule(/(^analy)(sis|ses)$/, '$1sis');
pluralize.addSingularRule(/([^f])ves$/, '$1fe');
pluralize.addSingularRule(/([aolr])ves$/, '$1f');
pluralize.addSingularRule(/(hive|tive|drive)s$/, '$1');
pluralize.addSingularRule(/([^aeiouy]|qu)ies$/, '$1y');
pluralize.addSingularRule(/(^[pl]ie|tie|zombie)s$/, '$1');
pluralize.addSingularRule(/(x|ch|ss|sh|zz)es$/, '$1');
pluralize.addSingularRule(/^(m|l)ice$/, '$1ouse');
pluralize.addSingularRule(/(bus|alias|[mpst]us|atlas|gas)(es)?$/, '$1');
pluralize.addSingularRule(/(o)es$/, '$1');
pluralize.addSingularRule(/^(canoe)s$/, '$1');
pluralize.addSingularRule(/(shoe|movie|move)s$/, '$1');
pluralize.addSingularRule(/(cris|test|diagnos)(is|es)$/, '$1is');
pluralize.addSingularRule(/(octop|vir|radi|nucle|fung|cact|stimul)(us|i)$/, '$1us');
pluralize.addSingularRule(/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi)a$/, '$1um');
pluralize.addSingularRule(/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)a$/, '$1on');
pluralize.addSingularRule(/^(alumn|alg|vertebr)ae$/, '$1a');
pluralize.addSingularRule(/(cod|mur|sil|vert|ind)ices$/, '$1ex');
pluralize.addSingularRule(/(matr)ices$/, '$1ix');
pluralize.addSingularRule(/(pe)(rson|ople)$/, '$1rson');
pluralize.addSingularRule(/(child)ren$/, '$1');
pluralize.addSingularRule(/(eau)x$/, '$1');
pluralize.addSingularRule(/men$/, 'man');
