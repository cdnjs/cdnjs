/**
 * @ngdoc module
 * @name gettext
 * @packageName angular-gettext
 * @description Super simple Gettext for Angular.JS
 *
 * A sample application can be found at https://github.com/rubenv/angular-gettext-example.
 * This is an adaptation of the [TodoMVC](http://todomvc.com/) example. You can use this as a guideline while adding {@link angular-gettext angular-gettext} to your own application.
 */
/**
 * @ngdoc factory
 * @module gettext
 * @name gettextPlurals
 * @param {String} [langCode=en] language code
 * @param {Number} [n=0] number to calculate form for
 * @returns {Number} plural form number
 * @description Provides correct plural form id for the given language
 *
 * Example
 * ```js
 * gettextPlurals('ru', 10); // 1
 * gettextPlurals('en', 1);  // 0
 * gettextPlurals();         // 1
 * ```
 */
angular.module('gettext', []);
/**
 * @ngdoc object
 * @module gettext
 * @name gettext
 * @kind function
 * @param {String} str annotation key
 * @description Gettext constant function for annotating strings
 *
 * ```js
 * angular.module('myApp', ['gettext']).config(function(gettext) {
 *   /// MyApp document title
 *   gettext('my-app.title');
 *   ...
 * })
 * ```
 */
angular.module('gettext').constant('gettext', function (str) {
    /*
     * Does nothing, simply returns the input string.
     *
     * This function serves as a marker for `grunt-angular-gettext` to know that
     * this string should be extracted for translations.
     */
    return str;
});

/**
 * @ngdoc service
 * @module gettext
 * @name gettextCatalog
 * @requires gettextPlurals
 * @requires gettextFallbackLanguage
 * @requires https://docs.angularjs.org/api/ng/service/$http $http
 * @requires https://docs.angularjs.org/api/ng/service/$cacheFactory $cacheFactory
 * @requires https://docs.angularjs.org/api/ng/service/$interpolate $interpolate
 * @requires https://docs.angularjs.org/api/ng/service/$rootScope $rootScope
 * @description Provides set of method to translate stings
 */
angular.module('gettext').factory('gettextCatalog', ["gettextPlurals", "gettextFallbackLanguage", "$http", "$cacheFactory", "$interpolate", "$rootScope", function (gettextPlurals, gettextFallbackLanguage, $http, $cacheFactory, $interpolate, $rootScope) {
    var catalog;
    var noContext = '$$noContext';

    // IE8 returns UPPER CASE tags, even though the source is lower case.
    // This can causes the (key) string in the DOM to have a different case to
    // the string in the `po` files.
    // IE9, IE10 and IE11 reorders the attributes of tags.
    var test = '<span id="test" title="test" class="tested">test</span>';
    var isHTMLModified = (angular.element('<span>' + test + '</span>').html() !== test);

    var prefixDebug = function (string) {
        if (catalog.debug && catalog.currentLanguage !== catalog.baseLanguage) {
            return catalog.debugPrefix + string;
        } else {
            return string;
        }
    };

    var addTranslatedMarkers = function (string) {
        if (catalog.showTranslatedMarkers) {
            return catalog.translatedMarkerPrefix + string + catalog.translatedMarkerSuffix;
        } else {
            return string;
        }
    };

    function broadcastUpdated() {
        /**
         * @ngdoc event
         * @name gettextCatalog#gettextLanguageChanged
         * @eventType broadcast on $rootScope
         * @description Fires language change notification without any additional parameters.
         */
        $rootScope.$broadcast('gettextLanguageChanged');
    }

    catalog = {
        /**
         * @ngdoc property
         * @name gettextCatalog#debug
         * @public
         * @type {Boolean} false
         * @see gettextCatalog#debug
         * @description Whether or not to prefix untranslated strings with `[MISSING]:` or a custom prefix.
         */
        debug: false,
        /**
         * @ngdoc property
         * @name gettextCatalog#debugPrefix
         * @public
         * @type {String} [MISSING]:
         * @description Custom prefix for untranslated strings when {@link gettextCatalog#debug gettextCatalog#debug} set to `true`.
         */
        debugPrefix: '[MISSING]: ',
        /**
         * @ngdoc property
         * @name gettextCatalog#showTranslatedMarkers
         * @public
         * @type {Boolean} false
         * @description Whether or not to wrap all processed text with markers.
         *
         * Example output: `[Welcome]`
         */
        showTranslatedMarkers: false,
        /**
         * @ngdoc property
         * @name gettextCatalog#translatedMarkerPrefix
         * @public
         * @type {String} [
         * @description Custom prefix to mark strings that have been run through {@link angular-gettext angular-gettext}.
         */
        translatedMarkerPrefix: '[',
        /**
         * @ngdoc property
         * @name gettextCatalog#translatedMarkerSuffix
         * @public
         * @type {String} ]
         * @description Custom suffix to mark strings that have been run through {@link angular-gettext angular-gettext}.
         */
        translatedMarkerSuffix: ']',
        /**
         * @ngdoc property
         * @name gettextCatalog#strings
         * @private
         * @type {Object}
         * @description An object of loaded translation strings. Shouldn't be used directly.
         */
        strings: {},
        /**
         * @ngdoc property
         * @name gettextCatalog#baseLanguage
         * @protected
         * @deprecated
         * @since 2.0
         * @type {String} en
         * @description The default language, in which you're application is written.
         *
         * This defaults to English and it's generally a bad idea to use anything else:
         * if your language has different pluralization rules you'll end up with incorrect translations.
         */
        baseLanguage: 'en',
        /**
         * @ngdoc property
         * @name gettextCatalog#currentLanguage
         * @public
         * @type {String}
         * @description Active language.
         */
        currentLanguage: 'en',
        /**
         * @ngdoc property
         * @name gettextCatalog#cache
         * @public
         * @type {String} en
         * @description Language cache for lazy load
         */
        cache: $cacheFactory('strings'),

        /**
         * @ngdoc method
         * @name gettextCatalog#setCurrentLanguage
         * @public
         * @param {String} lang language name
         * @description Sets the current language and makes sure that all translations get updated correctly.
         */
        setCurrentLanguage: function (lang) {
            this.currentLanguage = lang;
            broadcastUpdated();
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#getCurrentLanguage
         * @public
         * @returns {String} current language
         * @description Returns the current language.
         */
        getCurrentLanguage: function () {
            return this.currentLanguage;
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#setStrings
         * @public
         * @param {String} language language name
         * @param {Object.<String>} strings set of strings where the key is the translation `key` and `value` is the translated text
         * @description Processes an object of string definitions. {@link guide:manual-setstrings More details here}.
         */
        setStrings: function (language, strings) {
            if (!this.strings[language]) {
                this.strings[language] = {};
            }

            var defaultPlural = gettextPlurals(language, 1);
            for (var key in strings) {
                var val = strings[key];

                if (isHTMLModified) {
                    // Use the DOM engine to render any HTML in the key (#131).
                    key = angular.element('<span>' + key + '</span>').html();
                }

                if (angular.isString(val) || angular.isArray(val)) {
                    // No context, wrap it in $$noContext.
                    var obj = {};
                    obj[noContext] = val;
                    val = obj;
                }

                if (!this.strings[language][key]) {
                    this.strings[language][key] = {};
                }

                for (var context in val) {
                    var str = val[context];
                    if (!angular.isArray(str)) {
                        // Expand single strings
                        this.strings[language][key][context] = [];
                        this.strings[language][key][context][defaultPlural] = str;
                    } else {
                        this.strings[language][key][context] = str;
                    }
                }
            }

            broadcastUpdated();
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#getStringFormFor
         * @protected
         * @param {String} language language name
         * @param {String} string translation key
         * @param {Number=} n number to build sting form for
         * @param {String=} context translation key context, e.g. {@link doc:context Verb, Noun}
         * @returns {String|Null} translated or annotated string or null if language is not set
         * @description Translate a string with the given language, count and context.
         */
        getStringFormFor: function (language, string, n, context) {
            if (!language) {
                return null;
            }
            var stringTable = this.strings[language] || {};
            var contexts = stringTable[string] || {};
            var plurals = contexts[context || noContext] || [];
            return plurals[gettextPlurals(language, n)];
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#getString
         * @public
         * @param {String} string translation key
         * @param {$rootScope.Scope=} scope scope to do interpolation against
         * @param {String=} context translation key context, e.g. {@link doc:context Verb, Noun}
         * @returns {String} translated or annotated string
         * @description Translate a string with the given scope and context.
         *
         * First it tries {@link gettextCatalog#currentLanguage gettextCatalog#currentLanguage} (e.g. `en-US`) then {@link gettextFallbackLanguage fallback} (e.g. `en`).
         *
         * When `scope` is supplied it uses Angular.JS interpolation, so something like this will do what you expect:
         * ```js
         * var hello = gettextCatalog.getString("Hello {{name}}!", { name: "Ruben" });
         * // var hello will be "Hallo Ruben!" in Dutch.
         * ```
         * Avoid using scopes - this skips interpolation and is a lot faster.
         */
        getString: function (string, scope, context) {
            var fallbackLanguage = gettextFallbackLanguage(this.currentLanguage);
            string = this.getStringFormFor(this.currentLanguage, string, 1, context) ||
                     this.getStringFormFor(fallbackLanguage, string, 1, context) ||
                     prefixDebug(string);
            string = scope ? $interpolate(string)(scope) : string;
            return addTranslatedMarkers(string);
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#getPlural
         * @public
         * @param {Number} n number to build sting form for
         * @param {String} string translation key
         * @param {String} stringPlural plural translation key
         * @param {$rootScope.Scope=} scope scope to do interpolation against
         * @param {String=} context translation key context, e.g. {@link doc:context Verb, Noun}
         * @returns {String} translated or annotated string
         * @see {@link gettextCatalog#getString gettextCatalog#getString} for details
         * @description Translate a plural string with the given context.
         */
        getPlural: function (n, string, stringPlural, scope, context) {
            var fallbackLanguage = gettextFallbackLanguage(this.currentLanguage);
            string = this.getStringFormFor(this.currentLanguage, string, n, context) ||
                     this.getStringFormFor(fallbackLanguage, string, n, context) ||
                     prefixDebug(n === 1 ? string : stringPlural);
            if (scope) {
                scope.$count = n;
                string = $interpolate(string)(scope);
            }
            return addTranslatedMarkers(string);
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#loadRemote
         * @public
         * @param {String} url location of the translations
         * @description Load a set of translation strings from a given URL.
         *
         * This should be a JSON catalog generated with [angular-gettext-tools](https://github.com/rubenv/angular-gettext-tools).
         * {@link guide:lazy-loading More details here}.
         */
        loadRemote: function (url) {
            return $http({
                method: 'GET',
                url: url,
                cache: catalog.cache
            }).then(function (response) {
                var data = response.data;
                for (var lang in data) {
                    catalog.setStrings(lang, data[lang]);
                }
                return response;
            });
        }
    };

    return catalog;
}]);

/**
 * @ngdoc directive
 * @module gettext
 * @name translate
 * @requires gettextCatalog
 * @requires gettextUtil
 * @requires https://docs.angularjs.org/api/ng/service/$parse $parse
 * @requires https://docs.angularjs.org/api/ng/service/$animate $animate
 * @requires https://docs.angularjs.org/api/ng/service/$compile $compile
 * @requires https://docs.angularjs.org/api/ng/service/$window $window
 * @restrict AE
 * @param {String} [translatePlural] plural form
 * @param {Number} translateN value to watch to substitute correct plural form
 * @param {String} translateContext context value, e.g. {@link doc:context Verb, Noun}
 * @description Annotates and translates text inside directive
 *
 * Full interpolation support is available in translated strings, so the following will work as expected:
 * ```js
 * <div translate>Hello {{name}}!</div>
 * ```
 *
 * You can also use custom context parameters while interpolating. This approach allows usage
 * of angular filters as well as custom logic inside your translated messages without unnecessary impact on translations.
 *
 * So for example when you have message like this:
 * ```js
 * <div translate>Last modified {{modificationDate | date:'yyyy-MM-dd HH:mm:ss Z'}} by {{author}}.</div>
 * ```
 * you will have it extracted in exact same version so it would look like this:
 * `Last modified {{modificationDate | date:'yyyy-MM-dd HH:mm:ss Z'}} by {{author}}`.
 * To start with it might be too complicated to read and handle by non technical translator. It's easy to make mistake
 * when copying format for example. Secondly if you decide to change format by some point of the project translation will broke
 * as it won't be the same string anymore.
 *
 * Instead your translator should only be concerned to place {{modificationDate}} correctly and you should have a free hand
 * to modify implementation details on how to present the results. This is how you can achieve the goal:
 * ```js
 * <div translate translate-params-modification-date="modificationDate | date:'yyyy-MM-dd HH:mm:ss Z'">Last modified {{modificationDate}} by {{author}}.</div>
 * ```
 *
 * There's a few more things worth to point out:
 * 1. You can use as many parameters as you want. Each parameter begins with `translate-params-` followed by snake-case parameter name.
 * Each parameter will be available for interpolation in camelCase manner (just like angular directive works by default).
 * ```js
 * <div translate translate-params-my-custom-param="param1" translate-params-name="name">Param {{myCustomParam}} has been changed by {{name}}.</div>
 * ```
 * 2. You can rename your variables from current scope to simple ones if you like.
 * ```js
 * <div translate translate-params-date="veryUnintuitiveNameForDate">Today's date is: {{date}}.</div>
 * ```
 * 3. You can use translate-params only for some interpolations. Rest would be treated as usual.
 * ```js
 * <div translate translate-params-cost="cost | currency">This product: {{product}} costs {{cost}}.</div>
 * ```
 */
angular.module('gettext').directive('translate', ["gettextCatalog", "$parse", "$animate", "$compile", "$window", "gettextUtil", function (gettextCatalog, $parse, $animate, $compile, $window, gettextUtil) {
    var msie = parseInt((/msie (\d+)/.exec(angular.lowercase($window.navigator.userAgent)) || [])[1], 10);
    var PARAMS_PREFIX = 'translateParams';

    function getCtxAttr(key) {
        return gettextUtil.lcFirst(key.replace(PARAMS_PREFIX, ''));
    }

    function handleInterpolationContext(scope, attrs, update) {
        var attributes = Object.keys(attrs).filter(function (key) {
            return gettextUtil.startsWith(key, PARAMS_PREFIX) && key !== PARAMS_PREFIX;
        });

        if (!attributes.length) {
            return null;
        }

        var interpolationContext = angular.extend({}, scope);
        var unwatchers = [];
        attributes.forEach(function (attribute) {
            var unwatch = scope.$watch(attrs[attribute], function (newVal) {
                var key = getCtxAttr(attribute);
                interpolationContext[key] = newVal;
                update(interpolationContext);
            });
            unwatchers.push(unwatch);
        });
        scope.$on('$destroy', function () {
            unwatchers.forEach(function (unwatch) {
                unwatch();
            });
        });
        return interpolationContext;
    }

    return {
        restrict: 'AE',
        terminal: true,
        compile: function compile(element, attrs) {
            // Validate attributes
            gettextUtil.assert(!attrs.translatePlural || attrs.translateN, 'translate-n', 'translate-plural');
            gettextUtil.assert(!attrs.translateN || attrs.translatePlural, 'translate-plural', 'translate-n');

            var msgid = gettextUtil.trim(element.html());
            var translatePlural = attrs.translatePlural;
            var translateContext = attrs.translateContext;

            if (msie <= 8) {
                // Workaround fix relating to angular adding a comment node to
                // anchors. angular/angular.js/#1949 / angular/angular.js/#2013
                if (msgid.slice(-13) === '<!--IE fix-->') {
                    msgid = msgid.slice(0, -13);
                }
            }

            return {
                post: function (scope, element, attrs) {
                    var countFn = $parse(attrs.translateN);
                    var pluralScope = null;
                    var linking = true;

                    function update(interpolationContext) {
                        interpolationContext = interpolationContext || null;

                        // Fetch correct translated string.
                        var translated;
                        if (translatePlural) {
                            scope = pluralScope || (pluralScope = scope.$new());
                            scope.$count = countFn(scope);
                            translated = gettextCatalog.getPlural(scope.$count, msgid, translatePlural, interpolationContext, translateContext);
                        } else {
                            translated = gettextCatalog.getString(msgid, interpolationContext, translateContext);
                        }
                        var oldContents = element.contents();

                        if (!oldContents && !translated){
                            return;
                        }

                        // Avoid redundant swaps
                        if (translated === gettextUtil.trim(oldContents.html())){
                            // Take care of unlinked content
                            if (linking){
                                $compile(oldContents)(scope);
                            }
                            return;
                        }

                        // Swap in the translation
                        var newWrapper = angular.element('<span>' + translated + '</span>');
                        $compile(newWrapper.contents())(scope);
                        var newContents = newWrapper.contents();

                        $animate.enter(newContents, element);
                        $animate.leave(oldContents);
                    }

                    var interpolationContext = handleInterpolationContext(scope, attrs, update);
                    update(interpolationContext);
                    linking = false;

                    if (attrs.translateN) {
                        scope.$watch(attrs.translateN, function () {
                            update(interpolationContext);
                        });
                    }

                    /**
                     * @ngdoc event
                     * @name translate#gettextLanguageChanged
                     * @eventType listen on scope
                     * @description Listens for language updates and changes translation accordingly
                     */
                    scope.$on('gettextLanguageChanged', function () {
                        update(interpolationContext);
                    });

                }
            };
        }
    };
}]);

/**
 * @ngdoc factory
 * @module gettext
 * @name gettextFallbackLanguage
 * @param {String} langCode language code
 * @returns {String|Null} fallback language
 * @description Strips regional code and returns language code only
 *
 * Example
 * ```js
 * gettextFallbackLanguage('ru');     // "null"
 * gettextFallbackLanguage('en_GB');  // "en"
 * gettextFallbackLanguage();         // null
 * ```
 */
angular.module("gettext").factory("gettextFallbackLanguage", function () {
    var cache = {};
    var pattern = /([^_]+)_[^_]+$/;

    return function (langCode) {
        if (cache[langCode]) {
            return cache[langCode];
        }

        var matches = pattern.exec(langCode);
        if (matches) {
            cache[langCode] = matches[1];
            return matches[1];
        }

        return null;
    };
});
/**
 * @ngdoc filter
 * @module gettext
 * @name translate
 * @requires gettextCatalog
 * @param {String} input translation key
 * @param {String} context context to evaluate key against
 * @returns {String} translated string or annotated key
 * @see {@link doc:context Verb, Noun}
 * @description Takes key and returns string
 *
 * Sometimes it's not an option to use an attribute (e.g. when you want to annotate an attribute value).
 * There's a `translate` filter available for this purpose.
 *
 * ```html
 * <input type="text" placeholder="{{'Username'|translate}}" />
 * ```
 * This filter does not support plural strings.
 *
 * You may want to use {@link guide:custom-annotations custom annotations} to avoid using the `translate` filter all the time. * Is
 */
angular.module('gettext').filter('translate', ["gettextCatalog", function (gettextCatalog) {
    function filter(input, context) {
        return gettextCatalog.getString(input, null, context);
    }
    filter.$stateful = true;
    return filter;
}]);

// Do not edit this file, it is autogenerated using genplurals.py!
angular.module("gettext").factory("gettextPlurals", function () {
    var languageCodes = {
        "pt_BR": "pt_BR",
        "pt-BR": "pt_BR"
    };
    return function (langCode, n) {
        switch (getLanguageCode(langCode)) {
            case "ay":  // Aymará
            case "bo":  // Tibetan
            case "cgg": // Chiga
            case "dz":  // Dzongkha
            case "fa":  // Persian
            case "id":  // Indonesian
            case "ja":  // Japanese
            case "jbo": // Lojban
            case "ka":  // Georgian
            case "kk":  // Kazakh
            case "km":  // Khmer
            case "ko":  // Korean
            case "ky":  // Kyrgyz
            case "lo":  // Lao
            case "ms":  // Malay
            case "my":  // Burmese
            case "sah": // Yakut
            case "su":  // Sundanese
            case "th":  // Thai
            case "tt":  // Tatar
            case "ug":  // Uyghur
            case "vi":  // Vietnamese
            case "wo":  // Wolof
            case "zh":  // Chinese
                // 1 form
                return 0;
            case "is":  // Icelandic
                // 2 forms
                return (n%10!=1 || n%100==11) ? 1 : 0;
            case "jv":  // Javanese
                // 2 forms
                return n!=0 ? 1 : 0;
            case "mk":  // Macedonian
                // 2 forms
                return n==1 || n%10==1 ? 0 : 1;
            case "ach": // Acholi
            case "ak":  // Akan
            case "am":  // Amharic
            case "arn": // Mapudungun
            case "br":  // Breton
            case "fil": // Filipino
            case "fr":  // French
            case "gun": // Gun
            case "ln":  // Lingala
            case "mfe": // Mauritian Creole
            case "mg":  // Malagasy
            case "mi":  // Maori
            case "oc":  // Occitan
            case "pt_BR":  // Brazilian Portuguese
            case "tg":  // Tajik
            case "ti":  // Tigrinya
            case "tr":  // Turkish
            case "uz":  // Uzbek
            case "wa":  // Walloon
            case "zh":  // Chinese
                // 2 forms
                return n>1 ? 1 : 0;
            case "lv":  // Latvian
                // 3 forms
                return (n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);
            case "lt":  // Lithuanian
                // 3 forms
                return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2);
            case "be":  // Belarusian
            case "bs":  // Bosnian
            case "hr":  // Croatian
            case "ru":  // Russian
            case "sr":  // Serbian
            case "uk":  // Ukrainian
                // 3 forms
                return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
            case "mnk": // Mandinka
                // 3 forms
                return (n==0 ? 0 : n==1 ? 1 : 2);
            case "ro":  // Romanian
                // 3 forms
                return (n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2);
            case "pl":  // Polish
                // 3 forms
                return (n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
            case "cs":  // Czech
            case "sk":  // Slovak
                // 3 forms
                return (n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;
            case "sl":  // Slovenian
                // 4 forms
                return (n%100==1 ? 1 : n%100==2 ? 2 : n%100==3 || n%100==4 ? 3 : 0);
            case "mt":  // Maltese
                // 4 forms
                return (n==1 ? 0 : n==0 || ( n%100>1 && n%100<11) ? 1 : (n%100>10 && n%100<20 ) ? 2 : 3);
            case "gd":  // Scottish Gaelic
                // 4 forms
                return (n==1 || n==11) ? 0 : (n==2 || n==12) ? 1 : (n > 2 && n < 20) ? 2 : 3;
            case "cy":  // Welsh
                // 4 forms
                return (n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3;
            case "kw":  // Cornish
                // 4 forms
                return (n==1) ? 0 : (n==2) ? 1 : (n == 3) ? 2 : 3;
            case "ga":  // Irish
                // 5 forms
                return n==1 ? 0 : n==2 ? 1 : n<7 ? 2 : n<11 ? 3 : 4;
            case "ar":  // Arabic
                // 6 forms
                return (n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 ? 4 : 5);
            default: // Everything else
                return n != 1 ? 1 : 0;
        }
    };

    /**
     * Method extracts iso639-2 language code from code with locale e.g. pl_PL, en_US, etc.
     * If it's provided with standalone iso639-2 language code it simply returns it.
     * @param {String} langCode
     * @returns {String} iso639-2 language Code
     */
    function getLanguageCode(langCode) {
        if (!languageCodes[langCode]) {
            languageCodes[langCode] = langCode.split(/\-|_/).shift();
        }
        return languageCodes[langCode];
    }
});

/**
 * @ngdoc factory
 * @module gettext
 * @name gettextUtil
 * @description Utility service for common operations and polyfills.
 */
angular.module('gettext').factory('gettextUtil', function gettextUtil() {
    /**
     * @ngdoc method
     * @name gettextUtil#trim
     * @public
     * @param {string} value String to be trimmed.
     * @description Trim polyfill for old browsers (instead of jQuery). Based on AngularJS-v1.2.2 (angular.js#620).
     *
     * Example
     * ```js
     * gettextUtil.assert('  no blanks  '); // "no blanks"
     * ```
     */
    var trim = (function () {
        if (!String.prototype.trim) {
            return function (value) {
                return (typeof value === 'string') ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
            };
        }
        return function (value) {
            return (typeof value === 'string') ? value.trim() : value;
        };
    })();

    /**
     * @ngdoc method
     * @name gettextUtil#assert
     * @public
     * @param {bool} condition condition to check
     * @param {String} missing name of the directive missing attribute
     * @param {String} found name of attribute that has been used with directive
     * @description Throws error if condition is not met, which means that directive was used with certain parameter
     * that requires another one (which is missing).
     *
     * Example
     * ```js
     * gettextUtil.assert(!attrs.translatePlural || attrs.translateN, 'translate-n', 'translate-plural');
     * //You should add a translate-n attribute whenever you add a translate-plural attribute.
     * ```
     */
    function assert(condition, missing, found) {
        if (!condition) {
            throw new Error('You should add a ' + missing + ' attribute whenever you add a ' + found + ' attribute.');
        }
    }

    /**
     * @ngdoc method
     * @name gettextUtil#startsWith
     * @public
     * @param {string} target String on which checking will occur.
     * @param {string} query String expected to be at the beginning of target.
     * @returns {boolean} Returns true if object has no ownProperties. For arrays returns true if length == 0.
     * @description Checks if string starts with another string.
     *
     * Example
     * ```js
     * gettextUtil.startsWith('Home sweet home.', 'Home'); //true
     * gettextUtil.startsWith('Home sweet home.', 'sweet'); //false
     * ```
     */
    function startsWith(target, query) {
        return target.indexOf(query) === 0;
    }

    /**
     * @ngdoc method
     * @name gettextUtil#lcFirst
     * @public
     * @param {string} target String to transform.
     * @returns {string} Strings beginning with lowercase letter.
     * @description Makes first letter of the string lower case
     *
     * Example
     * ```js
     * gettextUtil.lcFirst('Home Sweet Home.'); //'home Sweet Home'
     * gettextUtil.lcFirst('ShouldBeCamelCase.'); //'shouldBeCamelCase'
     * ```
     */
    function lcFirst(target) {
        var first = target.charAt(0).toLowerCase();
        return first + target.substr(1);
    }

    return {
        trim: trim,
        assert: assert,
        startsWith: startsWith,
        lcFirst: lcFirst
    };
});
