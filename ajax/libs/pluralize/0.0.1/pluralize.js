var singularRules  = [],
    pluralizeRules = [],
    uncountables   = [],
    irregular      = {},
    sanitizeWord, sanitizeRule,
    pluralize,
    plural, singular;

sanitizeRule = function (rule) {
  if (typeof rule === 'string') {
    return new RegExp('^' + rule + '$', 'i');
  }
  return rule;
};

sanitizeWord = function (word, collection) {
  if (word.length < 2) { return word; } // Empty string or no word

  var found, match;
  if (!~uncountables.indexOf(word)) {
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
  if (irregular[word.toLowerCase()]) { return irregular[word]; }

  var found;
  Object.keys(irregular).some(function (singular) {
    if (irregular[singular] === word.toLowerCase()) {
      return found = word;
    }
  });
  if (found) { return found; }

  return sanitizeWord(word, pluralizeRules);
};

singular = pluralize.singular = function (word) {
  if (irregular[word.toLowerCase()]) { return word; }

  var found;
  Object.keys(irregular).some(function (singular) {
    if (irregular[singular] === word.toLowerCase()) {
      return found = singular;
    }
  });
  if (found) { return found; }

  return sanitizeWord(word, singularRules);
};

pluralize.addPluralRule = function (rule, replacement) {
  pluralizeRules.unshift([ sanitizeRule(rule), replacement ]);
};

pluralize.addSingularRule = function (rule, replacement) {
  singularRules.unshift([ sanitizeRule(rule), replacement ]);
};

pluralize.addUncountableRule = function (word) {
  uncountables.push(word);
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
pluralize.addPluralRule(/s$/i, 's');
pluralize.addPluralRule(/(ese)$/i, '$1');
pluralize.addPluralRule(/^(ax|test)is$/i, '$1es');
pluralize.addPluralRule(/([au]s)$/i, '$1es');
pluralize.addPluralRule(/([^l]ias|[aeiou]las|[emjzr]as)$/i, '$1');
pluralize.addPluralRule(/(octop|vir|radi|nucle|fung|cact|stimul)(us|i)$/i, '$1i');
pluralize.addPluralRule(/^(alumn|alg|vertebr)(a|ae)$/i, '$1ae');
pluralize.addPluralRule(/(bu)s$/i, '$1ses');
pluralize.addPluralRule(/([^aeiou])o$/i, '$1oes');
pluralize.addPluralRule(/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi)(a|um)$/i, '$1a');
pluralize.addPluralRule(/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)(a|on)$/i, '$1a');
pluralize.addPluralRule(/sis$/i, 'ses');
pluralize.addPluralRule(/(?:([^f])fe|([aolr])f)$/i, '$1$2ves');
pluralize.addPluralRule(/([^aeiouy]|qu)y$/i, '$1ies');
pluralize.addPluralRule(/(x|ch|ss|sh|zz)$/i, '$1es');
pluralize.addPluralRule(/(matr|cod|mur|sil|vert|ind)(ix|ex)$/i, '$1ices');
pluralize.addPluralRule(/^(m|l)(ice|ouse)$/i, '$1ice');
pluralize.addPluralRule(/(pe)(rson|ople)$/i, '$1ople');
pluralize.addPluralRule(/(child)(ren)?$/i, '$1ren');
pluralize.addPluralRule(/(eau)x?$/i, '$1x');
pluralize.addPluralRule(/m(a|e)n$/i, 'men');

pluralize.addSingularRule(/s$/i, '');
pluralize.addSingularRule(/(ss)$/i, '$1');
pluralize.addSingularRule(/(n)ews$/i, '$1ews');
pluralize.addSingularRule(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i, '$1sis');
pluralize.addSingularRule(/(^analy)(sis|ses)$/i, '$1sis');
pluralize.addSingularRule(/([^f])ves$/i, '$1fe');
pluralize.addSingularRule(/([aolr])ves$/i, '$1f');
pluralize.addSingularRule(/(hive|tive|drive)s$/i, '$1');
pluralize.addSingularRule(/([^aeiouy]|qu)ies$/i, '$1y');
pluralize.addSingularRule(/^([pl]ie)s$/i, '$1');
pluralize.addSingularRule(/(x|ch|ss|sh|zz)es$/i, '$1');
pluralize.addSingularRule(/^(m|l)ice$/i, '$1ouse');
pluralize.addSingularRule(/(bus|alias|[mpst]us|atlas|gas)(es)?$/i, '$1');
pluralize.addSingularRule(/(o)es$/i, '$1');
pluralize.addSingularRule(/^(canoe)s$/i, '$1');
pluralize.addSingularRule(/(shoe|movie|move)s$/i, '$1');
pluralize.addSingularRule(/(cris|test|diagnos)(is|es)$/i, '$1is');
pluralize.addSingularRule(/(octop|vir|radi|nucle|fung|cact|stimul)(us|i)$/i, '$1us');
pluralize.addSingularRule(/^(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi)a$/i, '$1um');
pluralize.addSingularRule(/^(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|\w+hedr)a$/i, '$1on');
pluralize.addSingularRule(/^(alumn|alg|vertebr)ae$/i, '$1a');
pluralize.addSingularRule(/(cod|mur|sil|vert|ind)ices$/i, '$1ex');
pluralize.addSingularRule(/(matr)ices$/i, '$1ix');
pluralize.addSingularRule(/(pe)(rson|ople)$/i, '$1rson');
pluralize.addSingularRule(/(child)ren$/i, '$1');
pluralize.addSingularRule(/(eau)x$/i, '$1');
pluralize.addSingularRule(/men$/i, 'man');