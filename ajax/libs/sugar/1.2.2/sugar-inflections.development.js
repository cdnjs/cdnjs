(function(context) {

  /***
   * String module
   *
   ***/


  var globalContext,
      plurals      = [],
      singulars    = [],
      uncountables = [],
      humans       = [],
      acronyms     = {},
      Downcased,
      Normalize,
      Inflector;

  globalContext = typeof global !== 'undefined' ? global : context;

  function removeFromUncountablesAndAddTo(arr, rule, replacement) {
    if(Object.isString(rule)) {
      uncountables.remove(rule);
    }
    uncountables.remove(replacement)
    arr.unshift({ rule: rule, replacement: replacement })
  }

  function paramMatchesType(param, type) {
    return param == type || param == 'all' || !param;
  }

  function isUncountable(word) {
    return uncountables.any(function(uncountable) {
      return new RegExp('\\b' + uncountable + '$', 'i').test(word);
    });
  }

  function inflect(word, pluralize) {
    word = Object.isString(word) ? word.toString() : '';
    if(word.isBlank() || isUncountable(word)) {
      return word;
    } else {
      return runReplacements(word, pluralize ? plurals : singulars);
    }
  }

  function runReplacements(word, table) {
    table.each(function(inflection) {
      if(word.match(inflection.rule)) {
        word = word.replace(inflection.rule, inflection.replacement);
        return false;
      }
    });
    return word;
  }

  function capitalize(word) {
    return word.replace(/^\W*[a-z]/, function(w){
      return w.toUpperCase();
    });
  }

  Inflector = {

    /*
     * Specifies a new acronym. An acronym must be specified as it will appear in a camelized string.  An underscore
     * string that contains the acronym will retain the acronym when passed to %camelize%, %humanize%, or %titleize%.
     * A camelized string that contains the acronym will maintain the acronym when titleized or humanized, and will
     * convert the acronym into a non-delimited single lowercase word when passed to String#underscore.
     *
     * Examples:
     *   String.Inflector.acronym('HTML')
     *   'html'.titleize()     -> 'HTML'
     *   'html'.camelize()     -> 'HTML'
     *   'MyHTML'.underscore() -> 'my_html'
     *
     * The acronym, however, must occur as a delimited unit and not be part of another word for conversions to recognize it:
     *
     *   String.Inflector.acronym('HTTP')
     *   'my_http_delimited'.camelize() -> 'MyHTTPDelimited'
     *   'https'.camelize()             -> 'Https', not 'HTTPs'
     *   'HTTPS'.underscore()           -> 'http_s', not 'https'
     *
     *   String.Inflector.acronym('HTTPS')
     *   'https'.camelize()   -> 'HTTPS'
     *   'HTTPS'.underscore() -> 'https'
     *
     * Note: Acronyms that are passed to %pluralize% will no longer be recognized, since the acronym will not occur as
     * a delimited unit in the pluralized result. To work around this, you must specify the pluralized form as an
     * acronym as well:
     *
     *    String.Inflector.acronym('API')
     *    'api'.pluralize().camelize() -> 'Apis'
     *
     *    String.Inflector.acronym('APIs')
     *    'api'.pluralize().camelize() -> 'APIs'
     *
     * %acronym% may be used to specify any word that contains an acronym or otherwise needs to maintain a non-standard
     * capitalization. The only restriction is that the word must begin with a capital letter.
     *
     * Examples:
     *   String.Inflector.acronym('RESTful')
     *   'RESTful'.underscore()           -> 'restful'
     *   'RESTfulController'.underscore() -> 'restful_controller'
     *   'RESTfulController'.titleize()   -> 'RESTful Controller'
     *   'restful'.camelize()             -> 'RESTful'
     *   'restful_controller'.camelize()  -> 'RESTfulController'
     *
     *   String.Inflector.acronym('McDonald')
     *   'McDonald'.underscore() -> 'mcdonald'
     *   'mcdonald'.camelize()   -> 'McDonald'
     */
    'acronym': function(word) {
      acronyms[word.toLowerCase()] = word;
      Inflector.acronymRegExp = new RegExp(Object.values(acronyms).join('|'), 'g');
    },

    /*
     * Specifies a new pluralization rule and its replacement. The rule can either be a string or a regular expression.
     * The replacement should always be a string that may include references to the matched data from the rule.
     */
    'plural': function(rule, replacement) {
      removeFromUncountablesAndAddTo(plurals, rule, replacement);
    },

    /*
     * Specifies a new singularization rule and its replacement. The rule can either be a string or a regular expression.
     * The replacement should always be a string that may include references to the matched data from the rule.
     */
    'singular': function(rule, replacement) {
      removeFromUncountablesAndAddTo(singulars, rule, replacement);
    },

    /*
     * Specifies a new irregular that applies to both pluralization and singularization at the same time. This can only be used
     * for strings, not regular expressions. You simply pass the irregular in singular and plural form.
     *
     * Examples:
     *   String.Inflector.irregular('octopus', 'octopi')
     *   String.Inflector.irregular('person', 'people')
     */
    'irregular': function(singular, plural) {
      var singularFirst      = singular.first(),
          singularRest       = singular.from(1),
          pluralFirst        = plural.first(),
          pluralRest         = plural.from(1),
          pluralFirstUpper   = pluralFirst.toUpperCase(),
          pluralFirstLower   = pluralFirst.toLowerCase(),
          singularFirstUpper = singularFirst.toUpperCase(),
          singularFirstLower = singularFirst.toLowerCase();
      uncountables.remove(singular)
      uncountables.remove(plural)
      if(singularFirstUpper == pluralFirstUpper) {
        Inflector.plural(new RegExp('({1}){2}$'.assign(singularFirst, singularRest), 'i'), '$1' + pluralRest);
        Inflector.plural(new RegExp('({1}){2}$'.assign(pluralFirst, pluralRest), 'i'), '$1' + pluralRest);
        Inflector.singular(new RegExp('({1}){2}$'.assign(pluralFirst, pluralRest), 'i'), '$1' + singularRest);
      } else {
        Inflector.plural(new RegExp('{1}{2}$'.assign(singularFirstUpper, singularRest)), pluralFirstUpper + pluralRest);
        Inflector.plural(new RegExp('{1}{2}$'.assign(singularFirstLower, singularRest)), pluralFirstLower + pluralRest);
        Inflector.plural(new RegExp('{1}{2}$'.assign(pluralFirstUpper, pluralRest)), pluralFirstUpper + pluralRest);
        Inflector.plural(new RegExp('{1}{2}$'.assign(pluralFirstLower, pluralRest)), pluralFirstLower + pluralRest);
        Inflector.singular(new RegExp('{1}{2}$'.assign(pluralFirstUpper, pluralRest)), singularFirstUpper + singularRest);
        Inflector.singular(new RegExp('{1}{2}$'.assign(pluralFirstLower, pluralRest)), singularFirstLower + singularRest);
      }
    },

    /*
     * Add uncountable words that shouldn't be attempted inflected.
     *
     * Examples:
     *   String.Inflector.uncountable('money')
     *   String.Inflector.uncountable('money', 'information')
     *   String.Inflector.uncountable(['money', 'information', 'rice'])
     */
    'uncountable': function() {
      uncountables.add(Array.create(arguments).flatten());
    },

    /*
     * Specifies a humanized form of a string by a regular expression rule or by a string mapping.
     * When using a regular expression based replacement, the normal humanize formatting is called after the replacement.
     * When a string is used, the human form should be specified as desired (example: 'The name', not 'the_name')
     *
     * Examples:
     *   String.Inflector.human(/_cnt$/i, '_count')
     *   String.Inflector.human('legacy_col_person_name', 'Name')
     */
    'human': function(rule, replacement) {
      humans.unshift({ rule: rule, replacement: replacement })
    },


    /*
     * Clears the loaded inflections within a given scope (default is 'all').
     * Options are: 'all', 'plurals', 'singulars', 'uncountables', 'humans'.
     *
     * Examples:
     *   String.Inflector.clear('all')
     *   String.Inflector.clear('plurals')
     */
    'clear': function(type) {
      if(paramMatchesType(type, 'singulars'))    singulars    = [];
      if(paramMatchesType(type, 'plurals'))      plurals      = [];
      if(paramMatchesType(type, 'uncountables')) uncountables = [];
      if(paramMatchesType(type, 'humans'))       humans       = [];
      if(paramMatchesType(type, 'acronyms'))     acronyms     = {};
    }

  };

  Downcased = [
    'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at',
    'by', 'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over',
    'with', 'for'
  ];

  Normalize = {
    'A':  /[AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ]/g,
    'B':  /[BⒷＢḂḄḆɃƂƁ]/g,
    'C':  /[CⒸＣĆĈĊČÇḈƇȻꜾ]/g,
    'D':  /[DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ]/g,
    'E':  /[EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ]/g,
    'F':  /[FⒻＦḞƑꝻ]/g,
    'G':  /[GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ]/g,
    'H':  /[HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ]/g,
    'I':  /[IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ]/g,
    'J':  /[JⒿＪĴɈ]/g,
    'K':  /[KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ]/g,
    'L':  /[LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ]/g,
    'M':  /[MⓂＭḾṀṂⱮƜ]/g,
    'N':  /[NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ]/g,
    'O':  /[OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ]/g,
    'P':  /[PⓅＰṔṖƤⱣꝐꝒꝔ]/g,
    'Q':  /[QⓆＱꝖꝘɊ]/g,
    'R':  /[RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ]/g,
    'S':  /[SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ]/g,
    'T':  /[TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ]/g,
    'U':  /[UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ]/g,
    'V':  /[VⓋＶṼṾƲꝞɅ]/g,
    'W':  /[WⓌＷẀẂŴẆẄẈⱲ]/g,
    'X':  /[XⓍＸẊẌ]/g,
    'Y':  /[YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ]/g,
    'Z':  /[ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ]/g,
    'a':  /[aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ]/g,
    'b':  /[bⓑｂḃḅḇƀƃɓ]/g,
    'c':  /[cⓒｃćĉċčçḉƈȼꜿↄ]/g,
    'd':  /[dⓓｄḋďḍḑḓḏđƌɖɗꝺ]/g,
    'e':  /[eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ]/g,
    'f':  /[fⓕｆḟƒꝼ]/g,
    'g':  /[gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ]/g,
    'h':  /[hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ]/g,
    'i':  /[iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı]/g,
    'j':  /[jⓙｊĵǰɉ]/g,
    'k':  /[kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ]/g,
    'l':  /[lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ]/g,
    'm':  /[mⓜｍḿṁṃɱɯ]/g,
    'n':  /[nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ]/g,
    'o':  /[oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ]/g,
    'p':  /[pⓟｐṕṗƥᵽꝑꝓꝕ]/g,
    'q':  /[qⓠｑɋꝗꝙ]/g,
    'r':  /[rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ]/g,
    's':  /[sⓢｓśṥŝṡšṧṣṩșşȿꞩꞅẛ]/g,
    't':  /[tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ]/g,
    'u':  /[uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ]/g,
    'v':  /[vⓥｖṽṿʋꝟʌ]/g,
    'w':  /[wⓦｗẁẃŵẇẅẘẉⱳ]/g,
    'x':  /[xⓧｘẋẍ]/g,
    'y':  /[yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ]/g,
    'z':  /[zⓩｚźẑżžẓẕƶȥɀⱬꝣ]/g,
    'AA': /[Ꜳ]/g,
    'AE': /[ÆǼǢ]/g,
    'AO': /[Ꜵ]/g,
    'AU': /[Ꜷ]/g,
    'AV': /[ꜸꜺ]/g,
    'AY': /[Ꜽ]/g,
    'DZ': /[ǱǄ]/g,
    'Dz': /[ǲǅ]/g,
    'LJ': /[Ǉ]/g,
    'Lj': /[ǈ]/g,
    'NJ': /[Ǌ]/g,
    'Nj': /[ǋ]/g,
    'OI': /[Ƣ]/g,
    'OO': /[Ꝏ]/g,
    'OU': /[Ȣ]/g,
    'TZ': /[Ꜩ]/g,
    'VY': /[Ꝡ]/g,
    'aa': /[ꜳ]/g,
    'ae': /[æǽǣ]/g,
    'ao': /[ꜵ]/g,
    'au': /[ꜷ]/g,
    'av': /[ꜹꜻ]/g,
    'ay': /[ꜽ]/g,
    'dz': /[ǳǆ]/g,
    'hv': /[ƕ]/g,
    'lj': /[ǉ]/g,
    'nj': /[ǌ]/g,
    'oi': /[ƣ]/g,
    'ou': /[ȣ]/g,
    'oo': /[ꝏ]/g,
    'ss':  /[ß]/g,
    'tz': /[ꜩ]/g,
    'vy': /[ꝡ]/
  };


  Inflector.plural(/$/, 's');
  Inflector.plural(/s$/gi, 's');
  Inflector.plural(/(ax|test)is$/gi, '$1es');
  Inflector.plural(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi, '$1i');
  Inflector.plural(/(census|alias|status)$/gi, '$1es');
  Inflector.plural(/(bu)s$/gi, '$1ses');
  Inflector.plural(/(buffal|tomat)o$/gi, '$1oes');
  Inflector.plural(/([ti])um$/gi, '$1a');
  Inflector.plural(/([ti])a$/gi, '$1a');
  Inflector.plural(/sis$/gi, 'ses');
  Inflector.plural(/f+e?$/gi, 'ves');
  Inflector.plural(/(cuff|roof)$/gi, '$1s');
  Inflector.plural(/([ht]ive)$/gi, '$1s');
  Inflector.plural(/([^aeiouy]o)$/gi, '$1es');
  Inflector.plural(/([^aeiouy]|qu)y$/gi, '$1ies');
  Inflector.plural(/(x|ch|ss|sh)$/gi, '$1es');
  Inflector.plural(/(matr|vert|ind)(?:ix|ex)$/gi, '$1ices');
  Inflector.plural(/([ml])ouse$/gi, '$1ice');
  Inflector.plural(/([ml])ice$/gi, '$1ice');
  Inflector.plural(/^(ox)$/gi, '$1en');
  Inflector.plural(/^(oxen)$/gi, '$1');
  Inflector.plural(/(quiz)$/gi, '$1zes');
  Inflector.plural(/(phot|cant|hom|zer|pian|portic|pr|quart|kimon)o$/gi, '$1os');
  Inflector.plural(/(craft)$/gi, '$1');
  Inflector.plural(/[eo]{2}(th?)$/gi, 'ee$1');

  Inflector.singular(/s$/gi, '');
  Inflector.singular(/([pst][aiu]s)$/gi, '$1');
  Inflector.singular(/([aeiouy])ss$/gi, '$1ss');
  Inflector.singular(/(n)ews$/gi, '$1ews');
  Inflector.singular(/([ti])a$/gi, '$1um');
  Inflector.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, '$1$2sis');
  Inflector.singular(/(^analy)ses$/gi, '$1sis');
  Inflector.singular(/(i)(f|ves)$/i, '$1fe');
  Inflector.singular(/([aeolr]f?)(f|ves)$/i, '$1f');
  Inflector.singular(/([ht]ive)s$/gi, '$1');
  Inflector.singular(/([^aeiouy]|qu)ies$/gi, '$1y');
  Inflector.singular(/(s)eries$/gi, '$1eries');
  Inflector.singular(/(m)ovies$/gi, '$1ovie');
  Inflector.singular(/(x|ch|ss|sh)es$/gi, '$1');
  Inflector.singular(/([ml])(ous|ic)e$/gi, '$1ouse');
  Inflector.singular(/(bus)(es)?$/gi, '$1');
  Inflector.singular(/(o)es$/gi, '$1');
  Inflector.singular(/(shoe)s?$/gi, '$1');
  Inflector.singular(/(cris|ax|test)[ie]s$/gi, '$1is');
  Inflector.singular(/(octop|vir|fung|foc|radi|alumn)(i|us)$/gi, '$1us');
  Inflector.singular(/(census|alias|status)(es)?$/gi, '$1');
  Inflector.singular(/^(ox)(en)?/gi, '$1');
  Inflector.singular(/(vert|ind)(ex|ices)$/gi, '$1ex');
  Inflector.singular(/(matr)(ix|ices)$/gi, '$1ix');
  Inflector.singular(/(quiz)(zes)?$/gi, '$1');
  Inflector.singular(/(database)s?$/gi, '$1');
  Inflector.singular(/ee(th?)$/gi, 'oo$1');

  Inflector.irregular('person', 'people');
  Inflector.irregular('man', 'men');
  Inflector.irregular('child', 'children');
  Inflector.irregular('sex', 'sexes');
  Inflector.irregular('move', 'moves');
  Inflector.irregular('save', 'saves');
  Inflector.irregular('save', 'saves');
  Inflector.irregular('cow', 'kine');
  Inflector.irregular('goose', 'geese');
  Inflector.irregular('zombie', 'zombies');

  Inflector.uncountable('equipment,information,rice,money,species,series,fish,sheep,jeans'.split(','));


  String.extend({

    /***
     * @method pluralize()
     * @returns String
     * @short Returns the plural form of the word in the string.
     * @example
     *
     *   'post'.pluralize()         -> 'posts'
     *   'octopus'.pluralize()      -> 'octopi'
     *   'sheep'.pluralize()        -> 'sheep'
     *   'words'.pluralize()        -> 'words'
     *   'CamelOctopus'.pluralize() -> 'CamelOctopi'
     *
     ***/
    'pluralize': function() {
      return inflect(this, true);
    },

    /***
     * @method singularize()
     * @returns String
     * @short The reverse of String#pluralize. Returns the singular form of a word in a string.
     * @example
     *
     *   'posts'.singularize()       -> 'post'
     *   'octopi'.singularize()      -> 'octopus'
     *   'sheep'.singularize()       -> 'sheep'
     *   'word'.singularize()        -> 'word'
     *   'CamelOctopi'.singularize() -> 'CamelOctopus'
     *
     ***/
    'singularize': function() {
      return inflect(this, false);
    },

    /***
     * @method humanize()
     * @returns String
     * @short Creates a human readable string.
     * @extra Capitalizes the first word and turns underscores into spaces and strips a trailing '_id', if any. Like String#titleize, this is meant for creating pretty output.
     * @example
     *
     *   'employee_salary'.humanize() -> 'Employee salary'
     *   'author_id'.humanize()       -> 'Author'
     *
     ***/
    'humanize': function() {
      var str = runReplacements(this, humans);
      str = str.replace(/_id$/g, '');
      str = str.replace(/(_)?([a-z\d]*)/gi, function(match, _, word){
        return (_ ? ' ' : '') + (acronyms[word] || word.toLowerCase());
      });
      return capitalize(str);
    },

    /***
     * @method titleize()
     * @returns String
     * @short Creates a title version of the string.
     * @extra Capitalizes all the words and replaces some characters in the string to create a nicer looking title. String#titleize is meant for creating pretty output.
     * @example
     *
     *   'man from the boondocks'.titleize() -> 'Man from the Boondocks'
     *   'x-men: the last stand'.titleize() -> 'X Men: The Last Stand'
     *   'TheManWithoutAPast'.titleize() -> 'The Man Without a Past'
     *   'raiders_of_the_lost_ark'.titleize() -> 'Raiders of the Lost Ark'
     *
     ***/
    'titleize': function() {
      var fullStopPunctuation = /[.:;!]$/, hasPunctuation, lastHadPunctuation, isFirstOrLast;
      return this.spacify().humanize().words(function(word, index, words) {
        hasPunctuation = fullStopPunctuation.test(word);
        isFirstOrLast = index == 0 || index == words.length - 1 || hasPunctuation || lastHadPunctuation;
        lastHadPunctuation = hasPunctuation;
        if(isFirstOrLast || !Downcased.any(word)) {
          return capitalize(word);
        } else {
          return word;
        }
      }).join(' ');
    },

    /***
     * @method namespace()
     * @returns Mixed
     * @short Tries to find the namespace or property with the name specified in the string.
     * @extra Namespacing begins at the global level and operates on every "." in the string. If any level returns %undefined% the result will be %undefined%.
     * @example
     *
     *   'Path.To.Namespace'.namespace() -> Path.To.Namespace
     *
     ***/
    'namespace': function() {
      var spaces = this.split('.'), scope = globalContext;
      spaces.each(function(s) {
        return !!(scope = scope[s]);
      });
      return scope;
    },

    /***
     * @method parameterize()
     * @returns String
     * @short Replaces special characters in a string so that it may be used as part of a pretty URL.
     * @example
     *
     *   'hell, no!'.parameterize() -> 'hell-no'
     *
     ***/
    'parameterize': function(separator) {
      if(separator === undefined) separator = '-';
      var str = this.normalize();
      str = str.replace(/[^a-z0-9\-_]+/gi, separator)
      if(separator) {
        str = str.replace(new RegExp('^{sep}+|{sep}+$|({sep}){sep}+'.assign({ 'sep': RegExp.escape(separator) }), 'g'), '$1');
      }
      return str.toLowerCase();
    },

    /***
     * @method normalize()
     * @returns String
     * @short Returns the string with accented and non-standard Latin-based characters converted into ASCII approximate equivalents.
     * @example
     *
     *   'á'.normalize()                  -> 'a'
     *   'Ménage à trois'.normalize()     -> 'Menage a trois'
     *   'Volkswagen'.normalize()         -> 'Volkswagen'
     *   'ＦＵＬＬＷＩＤＴＨ'.normalize() -> 'FULLWIDTH'
     *
     ***/
    'normalize': function() {
      var str = this.toString();
      Object.each(Normalize, function(base, reg) {
        str = str.replace(reg, base);
      });
      return str;
    }

  });

  String.Inflector = Inflector;
  String.Inflector.acronyms = acronyms;

})(this);
