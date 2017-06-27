/*!
 * angular-translate - v2.11.0 - 2016-03-20
 * 
 * Copyright (c) 2016 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(a,b){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module unless amdModuleId is set
define([],function(){return b()}):"object"==typeof exports?
// Node. Does not work with strict CommonJS, but
// only CommonJS-like environments that support module.exports,
// like Node.
module.exports=b():b()}(this,function(){function a(a){"use strict";var b=a.storageKey(),c=a.storage(),d=function(){var d=a.preferredLanguage();angular.isString(d)?a.use(d):c.put(b,a.use())};d.displayName="fallbackFromIncorrectStorageValue",c?c.get(b)?a.use(c.get(b))["catch"](d):d():angular.isString(a.preferredLanguage())&&a.use(a.preferredLanguage())}function b(){"use strict";var a,b,c=null,// TODO change to either 'sanitize', 'escape' or ['sanitize', 'escapeParameters'] in 3.0.
d=!1,e=!1;b={sanitize:function(a,b){return"text"===b&&(a=g(a)),a},escape:function(a,b){return"text"===b&&(a=f(a)),a},sanitizeParameters:function(a,b){return"params"===b&&(a=h(a,g)),a},escapeParameters:function(a,b){return"params"===b&&(a=h(a,f)),a}},b.escaped=b.escapeParameters,this.addStrategy=function(a,c){return b[a]=c,this},this.removeStrategy=function(a){return delete b[a],this},this.useStrategy=function(a){return d=!0,c=a,this},this.$get=["$injector","$log",function(f,g){var h={},i=function(a,c,d){return angular.forEach(d,function(d){if(angular.isFunction(d))a=d(a,c);else if(angular.isFunction(b[d]))a=b[d](a,c);else{if(!angular.isString(b[d]))throw new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '"+d+"'");if(!h[b[d]])try{h[b[d]]=f.get(b[d])}catch(e){throw h[b[d]]=function(){},new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '"+d+"'")}a=h[b[d]](a,c)}}),a},j=function(){d||e||(g.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."),e=!0)};return f.has("$sanitize")&&(a=f.get("$sanitize")),{useStrategy:function(a){return function(b){a.useStrategy(b)}}(this),sanitize:function(a,b,d){if(c||j(),arguments.length<3&&(d=c),!d)return a;var e=angular.isArray(d)?d:[d];return i(a,b,e)}}}];var f=function(a){var b=angular.element("<div></div>");// not chainable, see #1044
return b.text(a),b.html()},g=function(b){if(!a)throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'.");return a(b)},h=function(a,b,c){if(angular.isObject(a)){var d=angular.isArray(a)?[]:{};if(c){if(c.indexOf(a)>-1)throw new Error("pascalprecht.translate.$translateSanitization: Error cannot interpolate parameter due recursive object")}else c=[];// remove last
return c.push(a),angular.forEach(a,function(a,e){d[e]=h(a,b,c)}),c.splice(-1,1),d}return angular.isNumber(a)?a:b(a)}}function c(a,b,c,d){"use strict";var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u={},v=[],w=a,x=[],y="translate-cloak",z=!1,A=!1,B=".",C=!1,D=0,E=!0,F="default",G={"default":function(a){return(a||"").split("-").join("_")},java:function(a){var b=(a||"").split("-").join("_"),c=b.split("_");return c.length>1?c[0].toLowerCase()+"_"+c[1].toUpperCase():b},bcp47:function(a){var b=(a||"").split("_").join("-"),c=b.split("-");return c.length>1?c[0].toLowerCase()+"-"+c[1].toUpperCase():b},"iso639-1":function(a){var b=(a||"").split("_").join("-"),c=b.split("-");return c[0].toLowerCase()}},H="2.11.0",I=function(){
// internal purpose only
if(angular.isFunction(d.getLocale))return d.getLocale();var a,c,e=b.$get().navigator,f=["language","browserLanguage","systemLanguage","userLanguage"];
// support for HTML 5.1 "navigator.languages"
if(angular.isArray(e.languages))for(a=0;a<e.languages.length;a++)if(c=e.languages[a],c&&c.length)return c;
// support for other well known properties in browsers
for(a=0;a<f.length;a++)if(c=e[f[a]],c&&c.length)return c;return null};I.displayName="angular-translate/service: getFirstBrowserLanguage";
// tries to determine the browsers locale
var J=function(){var a=I()||"";return G[F]&&(a=G[F](a)),a};J.displayName="angular-translate/service: getLocale";/**
   * @name indexOf
   * @private
   *
   * @description
   * indexOf polyfill. Kinda sorta.
   *
   * @param {array} array Array to search in.
   * @param {string} searchElement Element to search for.
   *
   * @returns {int} Index of search element.
   */
var K=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},L=function(){return this.toString().replace(/^\s+|\s+$/g,"")},M=function(a){if(a){for(var b=[],c=angular.lowercase(a),d=0,e=v.length;e>d;d++)b.push(angular.lowercase(v[d]));
// Check for an exact match in our list of available keys
if(K(b,c)>-1)return a;if(f){var g;for(var h in f)if(f.hasOwnProperty(h)){var i=!1,j=Object.prototype.hasOwnProperty.call(f,h)&&angular.lowercase(h)===angular.lowercase(a);if("*"===h.slice(-1)&&(i=h.slice(0,-1)===a.slice(0,h.length-1)),(j||i)&&(g=f[h],K(b,angular.lowercase(g))>-1))return g}}
// Check for a language code without region
var k=a.split("_");return k.length>1&&K(b,angular.lowercase(k[0]))>-1?k[0]:void 0}},N=function(a,b){if(!a&&!b)return u;if(a&&!b){if(angular.isString(a))return u[a]}else angular.isObject(u[a])||(u[a]={}),angular.extend(u[a],O(b));return this};this.translations=N,/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#cloakClassName
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the class name for `translate-cloak` directive.
   * Default class name is `translate-cloak`.
   *
   * @param {string} name translate-cloak class name
   */
this.cloakClassName=function(a){return a?(y=a,this):y},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#nestedObjectDelimeter
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   *
   * Let's you change the delimiter for namespaced translations.
   * Default delimiter is `.`.
   *
   * @param {string} delimiter namespace separator
   */
this.nestedObjectDelimeter=function(a){return a?(B=a,this):B};/**
   * @name flatObject
   * @private
   *
   * @description
   * Flats an object. This function is used to flatten given translation data with
   * namespaces, so they are later accessible via dot notation.
   */
var O=function(a,b,c,d){var e,f,g,h;b||(b=[]),c||(c={});for(e in a)Object.prototype.hasOwnProperty.call(a,e)&&(h=a[e],angular.isObject(h)?O(h,b.concat(e),c,e):(f=b.length?""+b.join(B)+B+e:e,b.length&&e===d&&(g=""+b.join(B),c[g]="@:"+f),c[f]=h));return c};O.displayName="flatObject",/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#addInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Adds interpolation services to angular-translate, so it can manage them.
   *
   * @param {object} factory Interpolation service factory
   */
this.addInterpolation=function(a){return x.push(a),this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMessageFormatInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use interpolation functionality of messageformat.js.
   * This is useful when having high level pluralization and gender selection.
   */
this.useMessageFormatInterpolation=function(){return this.useInterpolation("$translateMessageFormatInterpolation")},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useInterpolation
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which interpolation style to use as default, application-wide.
   * Simply pass a factory/service name. The interpolation service has to implement
   * the correct interface.
   *
   * @param {string} factory Interpolation service name.
   */
this.useInterpolation=function(a){return n=a,this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useSanitizeStrategy
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Simply sets a sanitation strategy type.
   *
   * @param {string} value Strategy type.
   */
this.useSanitizeValueStrategy=function(a){return c.useStrategy(a),this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#preferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use for translation
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **prefer**.
   *
   * @param {string} langKey A language key.
   */
this.preferredLanguage=function(a){return a?(P(a),this):e};var P=function(a){return a&&(e=a),e};/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicator
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found. E.g. when
   * setting the indicator as 'X' and one tries to translate a translation id
   * called `NOT_FOUND`, this will result in `X NOT_FOUND X`.
   *
   * Internally this methods sets a left indicator and a right indicator using
   * `$translateProvider.translationNotFoundIndicatorLeft()` and
   * `$translateProvider.translationNotFoundIndicatorRight()`.
   *
   * **Note**: These methods automatically add a whitespace between the indicators
   * and the translation id.
   *
   * @param {string} indicator An indicator, could be any string.
   */
this.translationNotFoundIndicator=function(a){return this.translationNotFoundIndicatorLeft(a),this.translationNotFoundIndicatorRight(a),this},/**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found left to the
   * translation id.
   *
   * @param {string} indicator An indicator.
   */
this.translationNotFoundIndicatorLeft=function(a){return a?(q=a,this):q},/**
   * ngdoc function
   * @name pascalprecht.translate.$translateProvider#translationNotFoundIndicatorLeft
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets an indicator which is used when a translation isn't found right to the
   * translation id.
   *
   * @param {string} indicator An indicator.
   */
this.translationNotFoundIndicatorRight=function(a){return a?(r=a,this):r},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#fallbackLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which of the registered translation tables to use when missing translations
   * at initial startup by passing a language key. Similar to `$translateProvider#use`
   * only that it says which language to **fallback**.
   *
   * @param {string||array} langKey A language key.
   *
   */
this.fallbackLanguage=function(a){return Q(a),this};var Q=function(a){return a?(angular.isString(a)?(h=!0,g=[a]):angular.isArray(a)&&(h=!1,g=a),angular.isString(e)&&K(g,e)<0&&g.push(e),this):h?g[0]:g};/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#use
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Set which translation table to use for translation by given language key. When
   * trying to 'use' a language which isn't provided, it'll throw an error.
   *
   * You actually don't have to use this method since `$translateProvider#preferredLanguage`
   * does the job too.
   *
   * @param {string} langKey A language key.
   */
this.use=function(a){if(a){if(!u[a]&&!o)
// only throw an error, when not loading translation data asynchronously
throw new Error("$translateProvider couldn't find translationTable for langKey: '"+a+"'");return i=a,this}return i},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#resolveClientLocale
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * This returns the current browser/client's language key. The result is processed with the configured uniform tag resolver.
   *
   * @returns {string} the current client/browser language key
   */
this.resolveClientLocale=function(){return J()};/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storageKey
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells the module which key must represent the choosed language by a user in the storage.
   *
   * @param {string} key A key for the storage.
   */
var R=function(a){return a?(w=a,this):l?l+w:w};this.storageKey=R,/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useUrlLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateUrlLoader` extension service as loader.
   *
   * @param {string} url Url
   * @param {Object=} options Optional configuration object
   */
this.useUrlLoader=function(a,b){return this.useLoader("$translateUrlLoader",angular.extend({url:a},b))},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStaticFilesLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateStaticFilesLoader` extension service as loader.
   *
   * @param {Object=} options Optional configuration object
   */
this.useStaticFilesLoader=function(a){return this.useLoader("$translateStaticFilesLoader",a)},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoader
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use any other service as loader.
   *
   * @param {string} loaderFactory Factory name to use
   * @param {Object=} options Optional configuration object
   */
this.useLoader=function(a,b){return o=a,p=b||{},this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLocalStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateLocalStorage` service as storage layer.
   *
   */
this.useLocalStorage=function(){return this.useStorage("$translateLocalStorage")},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useCookieStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use `$translateCookieStorage` service as storage layer.
   */
this.useCookieStorage=function(){return this.useStorage("$translateCookieStorage")},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useStorage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use custom service as storage layer.
   */
this.useStorage=function(a){return k=a,this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#storagePrefix
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets prefix for storage key.
   *
   * @param {string} prefix Storage key prefix
   */
this.storagePrefix=function(a){return a?(l=a,this):a},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandlerLog
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to use built-in log handler when trying to translate
   * a translation Id which doesn't exist.
   *
   * This is actually a shortcut method for `useMissingTranslationHandler()`.
   *
   */
this.useMissingTranslationHandlerLog=function(){return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useMissingTranslationHandler
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Expects a factory name which later gets instantiated with `$injector`.
   * This method can be used to tell angular-translate to use a custom
   * missingTranslationHandler. Just build a factory which returns a function
   * and expects a translation id as argument.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.useMissingTranslationHandler('customHandler');
   *  });
   *
   *  app.factory('customHandler', function (dep1, dep2) {
   *    return function (translationId) {
   *      // something with translationId and dep1 and dep2
   *    };
   *  });
   * </pre>
   *
   * @param {string} factory Factory name
   */
this.useMissingTranslationHandler=function(a){return m=a,this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#usePostCompiling
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If post compiling is enabled, all translated values will be processed
   * again with AngularJS' $compile.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.usePostCompiling(true);
   *  });
   * </pre>
   *
   * @param {string} factory Factory name
   */
this.usePostCompiling=function(a){return z=!!a,this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#forceAsyncReload
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * If force async reload is enabled, async loader will always be called
   * even if $translationTable already contains the language key, adding
   * possible new entries to the $translationTable.
   *
   * Example:
   * <pre>
   *  app.config(function ($translateProvider) {
   *    $translateProvider.forceAsyncReload(true);
   *  });
   * </pre>
   *
   * @param {boolean} value - valid values are true or false
   */
this.forceAsyncReload=function(a){return A=!!a,this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#uniformLanguageTag
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate which language tag should be used as a result when determining
   * the current browser language.
   *
   * This setting must be set before invoking {@link pascalprecht.translate.$translateProvider#methods_determinePreferredLanguage determinePreferredLanguage()}.
   *
   * <pre>
   * $translateProvider
   *   .uniformLanguageTag('bcp47')
   *   .determinePreferredLanguage()
   * </pre>
   *
   * The resolver currently supports:
   * * default
   *     (traditionally: hyphens will be converted into underscores, i.e. en-US => en_US)
   *     en-US => en_US
   *     en_US => en_US
   *     en-us => en_us
   * * java
   *     like default, but the second part will be always in uppercase
   *     en-US => en_US
   *     en_US => en_US
   *     en-us => en_US
   * * BCP 47 (RFC 4646 & 4647)
   *     en-US => en-US
   *     en_US => en-US
   *     en-us => en-US
   *
   * See also:
   * * http://en.wikipedia.org/wiki/IETF_language_tag
   * * http://www.w3.org/International/core/langtags/
   * * http://tools.ietf.org/html/bcp47
   *
   * @param {string|object} options - options (or standard)
   * @param {string} options.standard - valid values are 'default', 'bcp47', 'java'
   */
this.uniformLanguageTag=function(a){return a?angular.isString(a)&&(a={standard:a}):a={},F=a.standard,this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#determinePreferredLanguage
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Tells angular-translate to try to determine on its own which language key
   * to set as preferred language. When `fn` is given, angular-translate uses it
   * to determine a language key, otherwise it uses the built-in `getLocale()`
   * method.
   *
   * The `getLocale()` returns a language key in the format `[lang]_[country]` or
   * `[lang]` depending on what the browser provides.
   *
   * Use this method at your own risk, since not all browsers return a valid
   * locale (see {@link pascalprecht.translate.$translateProvider#methods_uniformLanguageTag uniformLanguageTag()}).
   *
   * @param {Function=} fn Function to determine a browser's locale
   */
this.determinePreferredLanguage=function(a){var b=a&&angular.isFunction(a)?a():J();return e=v.length?M(b)||b:b,this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#registerAvailableLanguageKeys
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a set of language keys the app will work with. Use this method in
   * combination with
   * {@link pascalprecht.translate.$translateProvider#determinePreferredLanguage determinePreferredLanguage}.
   * When available languages keys are registered, angular-translate
   * tries to find the best fitting language key depending on the browsers locale,
   * considering your language key convention.
   *
   * @param {object} languageKeys Array of language keys the your app will use
   * @param {object=} aliases Alias map.
   */
this.registerAvailableLanguageKeys=function(a,b){return a?(v=a,b&&(f=b),this):v},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#useLoaderCache
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Registers a cache for internal $http based loaders.
   * {@link pascalprecht.translate.$translationCache $translationCache}.
   * When false the cache will be disabled (default). When true or undefined
   * the cache will be a default (see $cacheFactory). When an object it will
   * be treat as a cache object itself: the usage is $http({cache: cache})
   *
   * @param {object} cache boolean, string or cache-object
   */
this.useLoaderCache=function(a){
// disable cache
// enable cache using AJS defaults
// enable cache using default
// enable cache using given one (see $cacheFactory)
return a===!1?s=void 0:a===!0?s=!0:"undefined"==typeof a?s="$translationCache":a&&(s=a),this},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#directivePriority
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Sets the default priority of the translate directive. The standard value is `0`.
   * Calling this function without an argument will return the current value.
   *
   * @param {number} priority for the translate-directive
   */
this.directivePriority=function(a){
// setter with chaining
return void 0===a?D:(D=a,this)},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#statefulFilter
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * Since AngularJS 1.3, filters which are not stateless (depending at the scope)
   * have to explicit define this behavior.
   * Sets whether the translate filter should be stateful or stateless. The standard value is `true`
   * meaning being stateful.
   * Calling this function without an argument will return the current value.
   *
   * @param {boolean} state - defines the state of the filter
   */
this.statefulFilter=function(a){
// setter with chaining
return void 0===a?E:(E=a,this)},/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateProvider#postProcess
   * @methodOf pascalprecht.translate.$translateProvider
   *
   * @description
   * The post processor will be intercept right after the translation result. It can modify the result.
   *
   * @param {object} fn Function or service name (string) to be called after the translation value has been set / resolved. The function itself will enrich every value being processed and then continue the normal resolver process
   */
this.postProcess=function(a){return t=a?a:void 0,this},/**
   * @ngdoc object
   * @name pascalprecht.translate.$translate
   * @requires $interpolate
   * @requires $log
   * @requires $rootScope
   * @requires $q
   *
   * @description
   * The `$translate` service is the actual core of angular-translate. It expects a translation id
   * and optional interpolate parameters to translate contents.
   *
   * <pre>
   *  $translate('HEADLINE_TEXT').then(function (translation) {
   *    $scope.translatedText = translation;
   *  });
   * </pre>
   *
   * @param {string|array} translationId A token which represents a translation id
   *                                     This can be optionally an array of translation ids which
   *                                     results that the function returns an object where each key
   *                                     is the translation id and the value the translation.
   * @param {object=} interpolateParams An object hash for dynamic values
   * @param {string} interpolationId The id of the interpolation to use
   * @param {string} forceLanguage A language to be used instead of the current language
   * @returns {object} promise
   */
this.$get=["$log","$injector","$rootScope","$q",function(a,b,c,d){var f,l,F,G=b.get(n||"$translateDefaultInterpolation"),I=!1,S={},T={},U=function(a,b,c,h,j){!i&&e&&(i=e);var m=j&&j!==i?// we don't want to re-negotiate $uses
M(j)||j:i;
// Duck detection: If the first argument is an array, a bunch of translations was requested.
// The result is an object.
if(
// Check forceLanguage is present
j&&ja(j),angular.isArray(a)){
// Inspired by Q.allSettled by Kris Kowal
// https://github.com/kriskowal/q/blob/b0fa72980717dc202ffc3cbf03b936e10ebbb9d7/q.js#L1553-1563
// This transforms all promises regardless resolved or rejected
var n=function(a){for(var e={},f=[],g=function(a){var f=d.defer(),g=function(b){e[a]=b,f.resolve([a,b])};
// we don't care whether the promise was resolved or rejected; just store the values
return U(a,b,c,h,j).then(g,g),f.promise},i=0,k=a.length;k>i;i++)f.push(g(a[i]));
// wait for all (including storing to results)
return d.all(f).then(function(){
// return the results
return e})};return n(a)}var o=d.defer();
// trim off any whitespace
a&&(a=L.apply(a));var p=function(){var a=e?T[e]:T[m];if(l=0,k&&!a){
// looks like there's no pending promise for $preferredLanguage or
// $uses. Maybe there's one pending for a language that comes from
// storage.
var b=f.get(w);if(a=T[b],g&&g.length){var c=K(g,b);
// maybe the language from storage is also defined as fallback language
// we increase the fallback language index to not search in that language
// as fallback, since it's probably the first used language
// in that case the index starts after the first element
l=0===c?1:0,
// but we can make sure to ALWAYS fallback to preferred language at least
K(g,e)<0&&g.push(e)}}return a}();if(p){var q=function(){
// $uses may have changed while waiting
j||(m=i),fa(a,b,c,h,m).then(o.resolve,o.reject)};q.displayName="promiseResolved",p["finally"](q)}else
// no promise to wait for? okay. Then there's no loader registered
// nor is a one pending for language that comes from storage.
// We can just translate.
fa(a,b,c,h,m).then(o.resolve,o.reject);return o.promise},V=function(a){
// applying notFoundIndicators
return q&&(a=[q,a].join(" ")),r&&(a=[a,r].join(" ")),a},W=function(a){i=a,k&&f.put(U.storageKey(),i),c.$emit("$translateChangeSuccess",{language:a}),G.setLocale(i);var b=function(a,b){S[b].setLocale(i)};b.displayName="eachInterpolatorLocaleSetter",
// inform all others too!
angular.forEach(S,b),c.$emit("$translateChangeEnd",{language:a})},X=function(a){if(!a)throw"No language key specified for loading.";var e=d.defer();c.$emit("$translateLoadingStart",{language:a}),I=!0;var f=s;"string"==typeof f&&(
// getting on-demand instance of loader
f=b.get(f));var g=angular.extend({},p,{key:a,$http:angular.extend({},{cache:f},p.$http)}),h=function(b){var d={};c.$emit("$translateLoadingSuccess",{language:a}),angular.isArray(b)?angular.forEach(b,function(a){angular.extend(d,O(a))}):angular.extend(d,O(b)),I=!1,e.resolve({key:a,table:d}),c.$emit("$translateLoadingEnd",{language:a})};h.displayName="onLoaderSuccess";var i=function(a){c.$emit("$translateLoadingError",{language:a}),e.reject(a),c.$emit("$translateLoadingEnd",{language:a})};return i.displayName="onLoaderError",b.get(o)(g).then(h,i),e.promise};if(k&&(f=b.get(k),!f.get||!f.put))throw new Error("Couldn't use storage '"+k+"', missing get() or put() method!");
// if we have additional interpolations that were added via
// $translateProvider.addInterpolation(), we have to map'em
if(x.length){var Y=function(a){var c=b.get(a);
// setting initial locale for each interpolation service
c.setLocale(e||i),
// make'em recognizable through id
S[c.getInterpolationIdentifier()]=c};Y.displayName="interpolationFactoryAdder",angular.forEach(x,Y)}/**
       * @name getTranslationTable
       * @private
       *
       * @description
       * Returns a promise that resolves to the translation table
       * or is rejected if an error occurred.
       *
       * @param langKey
       * @returns {Q.promise}
       */
var Z=function(a){var b=d.defer();if(Object.prototype.hasOwnProperty.call(u,a))b.resolve(u[a]);else if(T[a]){var c=function(a){N(a.key,a.table),b.resolve(a.table)};c.displayName="translationTableResolver",T[a].then(c,b.reject)}else b.reject();return b.promise},$=function(a,b,c,e){var f=d.defer(),g=function(d){if(Object.prototype.hasOwnProperty.call(d,b)){e.setLocale(a);var g=d[b];if("@:"===g.substr(0,2))$(a,g.substr(2),c,e).then(f.resolve,f.reject);else{var h=e.interpolate(d[b],c);h=ia(b,d[b],h,c,a),f.resolve(h)}e.setLocale(i)}else f.reject()};return g.displayName="fallbackTranslationResolver",Z(a).then(g,f.reject),f.promise},_=function(a,b,c,d){var e,f=u[a];if(f&&Object.prototype.hasOwnProperty.call(f,b)){if(d.setLocale(a),e=d.interpolate(f[b],c),"@:"===e.substr(0,2))return _(a,e.substr(2),c,d);d.setLocale(i)}return e},aa=function(a,c,d){
// If we have a handler factory - we might also call it here to determine if it provides
// a default text for a translationid that can't be found anywhere in our tables
if(m){var e=b.get(m)(a,i,c,d);return void 0!==e?e:a}return a},ba=function(a,b,c,e,f){var h=d.defer();if(a<g.length){var i=g[a];$(i,b,c,e).then(function(a){h.resolve(a)},function(){
// Look in the next fallback language for a translation.
// It delays the resolving by passing another promise to resolve.
return ba(a+1,b,c,e,f).then(h.resolve,h.reject)})}else
// No translation found in any fallback language
// if a default translation text is set in the directive, then return this as a result
f?h.resolve(f):
// if no default translation is set and an error handler is defined, send it to the handler
// and then return the result
m?h.resolve(aa(b,c)):h.reject(aa(b,c));return h.promise},ca=function(a,b,c,d){var e;if(a<g.length){var f=g[a];e=_(f,b,c,d),e||(e=ca(a+1,b,c,d))}return e},da=function(a,b,c,d){
// Start with the fallbackLanguage with index 0
return ba(F>0?F:l,a,b,c,d)},ea=function(a,b,c){
// Start with the fallbackLanguage with index 0
return ca(F>0?F:l,a,b,c)},fa=function(a,b,c,e,f){var h=d.defer(),i=f?u[f]:u,j=c?S[c]:G;
// if the translation id exists, we can just interpolate it
if(i&&Object.prototype.hasOwnProperty.call(i,a)){var k=i[a];
// If using link, rerun $translate with linked translationId and return it
if("@:"===k.substr(0,2))U(k.substr(2),b,c,e,f).then(h.resolve,h.reject);else{
//
var l=j.interpolate(k,b);l=ia(a,k,l,b,f),h.resolve(l)}}else{var n;
// for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
m&&!I&&(n=aa(a,b,e)),
// since we couldn't translate the inital requested translation id,
// we try it now with one or more fallback languages, if fallback language(s) is
// configured.
f&&g&&g.length?da(a,b,j,e).then(function(a){h.resolve(a)},function(a){h.reject(V(a))}):m&&!I&&n?
// looks like the requested translation id doesn't exists.
// Now, if there is a registered handler for missing translations and no
// asyncLoader is pending, we execute the handler
e?h.resolve(e):h.resolve(n):e?h.resolve(e):h.reject(V(a))}return h.promise},ga=function(a,b,c,d){var e,f=d?u[d]:u,h=G;
// if the translation id exists, we can just interpolate it
if(
// if the interpolation id exists use custom interpolator
S&&Object.prototype.hasOwnProperty.call(S,c)&&(h=S[c]),f&&Object.prototype.hasOwnProperty.call(f,a)){var i=f[a];
// If using link, rerun $translate with linked translationId and return it
e="@:"===i.substr(0,2)?ga(i.substr(2),b,c,d):h.interpolate(i,b)}else{var j;
// for logging purposes only (as in $translateMissingTranslationHandlerLog), value is not returned to promise
m&&!I&&(j=aa(a,b)),
// since we couldn't translate the inital requested translation id,
// we try it now with one or more fallback languages, if fallback language(s) is
// configured.
d&&g&&g.length?(l=0,e=ea(a,b,h)):e=m&&!I&&j?j:V(a)}return e},ha=function(a){j===a&&(j=void 0),T[a]=void 0},ia=function(a,c,d,e,f){var g=t;
// getting on-demand instance
return g&&("string"==typeof g&&(g=b.get(g)),g)?g(a,c,d,e,f):d},ja=function(a){u[a]||!o||T[a]||(T[a]=X(a).then(function(a){N(a.key,a.table)}))};/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#preferredLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key for the preferred language.
       *
       * @param {string} langKey language String or Array to be used as preferredLanguage (changing at runtime)
       *
       * @return {string} preferred language key
       */
U.preferredLanguage=function(a){return a&&P(a),e},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#cloakClassName
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the configured class name for `translate-cloak` directive.
       *
       * @return {string} cloakClassName
       */
U.cloakClassName=function(){return y},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#nestedObjectDelimeter
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the configured delimiter for nested namespaces.
       *
       * @return {string} nestedObjectDelimeter
       */
U.nestedObjectDelimeter=function(){return B},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#fallbackLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key for the fallback languages or sets a new fallback stack.
       *
       * @param {string=} langKey language String or Array of fallback languages to be used (to change stack at runtime)
       *
       * @return {string||array} fallback language key
       */
U.fallbackLanguage=function(a){if(void 0!==a&&null!==a){
// as we might have an async loader initiated and a new translation language might have been defined
// we need to add the promise to the stack also. So - iterate.
if(Q(a),o&&g&&g.length)for(var b=0,c=g.length;c>b;b++)T[g[b]]||(T[g[b]]=X(g[b]));U.use(U.use())}return h?g[0]:g},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#useFallbackLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Sets the first key of the fallback language stack to be used for translation.
       * Therefore all languages in the fallback array BEFORE this key will be skipped!
       *
       * @param {string=} langKey Contains the langKey the iteration shall start with. Set to false if you want to
       * get back to the whole stack
       */
U.useFallbackLanguage=function(a){if(void 0!==a&&null!==a)if(a){var b=K(g,a);b>-1&&(F=b)}else F=0},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#proposedLanguage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the language key of language that is currently loaded asynchronously.
       *
       * @return {string} language key
       */
U.proposedLanguage=function(){return j},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#storage
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns registered storage.
       *
       * @return {object} Storage
       */
U.storage=function(){return f},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#negotiateLocale
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns a language key based on available languages and language aliases. If a
       * language key cannot be resolved, returns undefined.
       *
       * If no or a falsy key is given, returns undefined.
       *
       * @param {string} [key] Language key
       * @return {string|undefined} Language key or undefined if no language key is found.
       */
U.negotiateLocale=M,/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#use
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Tells angular-translate which language to use by given language key. This method is
       * used to change language at runtime. It also takes care of storing the language
       * key in a configured store to let your app remember the choosed language.
       *
       * When trying to 'use' a language which isn't available it tries to load it
       * asynchronously with registered loaders.
       *
       * Returns promise object with loaded language file data or string of the currently used language.
       *
       * If no or a falsy key is given it returns the currently used language key.
       * The returned string will be ```undefined``` if setting up $translate hasn't finished.
       * @example
       * $translate.use("en_US").then(function(data){
       *   $scope.text = $translate("HELLO");
       * });
       *
       * @param {string} [key] Language key
       * @return {object|string} Promise with loaded language data or the language key if a falsy param was given.
       */
U.use=function(a){if(!a)return i;var b=d.defer();c.$emit("$translateChangeStart",{language:a});
// Try to get the aliased language key
var e=M(a);
// Ensure only registered language keys will be loaded
// Ensure only registered language keys will be loaded
// if there isn't a translation table for the language we've requested,
// we load it asynchronously
// we are already loading this asynchronously
// resolve our new deferred when the old langPromise is resolved
return v.length>0&&!e?d.reject(a):(e&&(a=e),j=a,!A&&u[a]||!o||T[a]?T[a]?T[a].then(function(a){return j===a.key&&W(a.key),b.resolve(a.key),a},function(a){return!i&&g&&g.length>0?U.use(g[0]).then(b.resolve,b.reject):b.reject(a)}):(b.resolve(a),W(a)):(T[a]=X(a).then(function(c){return N(c.key,c.table),b.resolve(c.key),j===a&&W(c.key),c},function(a){return c.$emit("$translateChangeError",{language:a}),b.reject(a),c.$emit("$translateChangeEnd",{language:a}),d.reject(a)}),T[a]["finally"](function(){ha(a)})),b.promise)},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#resolveClientLocale
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * This returns the current browser/client's language key. The result is processed with the configured uniform tag resolver.
       *
       * @returns {string} the current client/browser language key
       */
U.resolveClientLocale=function(){return J()},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#storageKey
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the key for the storage.
       *
       * @return {string} storage key
       */
U.storageKey=function(){return R()},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#isPostCompilingEnabled
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether post compiling is enabled or not
       *
       * @return {bool} storage key
       */
U.isPostCompilingEnabled=function(){return z},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#isForceAsyncReloadEnabled
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether force async reload is enabled or not
       *
       * @return {boolean} forceAsyncReload value
       */
U.isForceAsyncReloadEnabled=function(){return A},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#refresh
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Refreshes a translation table pointed by the given langKey. If langKey is not specified,
       * the module will drop all existent translation tables and load new version of those which
       * are currently in use.
       *
       * Refresh means that the module will drop target translation table and try to load it again.
       *
       * In case there are no loaders registered the refresh() method will throw an Error.
       *
       * If the module is able to refresh translation tables refresh() method will broadcast
       * $translateRefreshStart and $translateRefreshEnd events.
       *
       * @example
       * // this will drop all currently existent translation tables and reload those which are
       * // currently in use
       * $translate.refresh();
       * // this will refresh a translation table for the en_US language
       * $translate.refresh('en_US');
       *
       * @param {string} langKey A language key of the table, which has to be refreshed
       *
       * @return {promise} Promise, which will be resolved in case a translation tables refreshing
       * process is finished successfully, and reject if not.
       */
U.refresh=function(a){function b(){f.resolve(),c.$emit("$translateRefreshEnd",{language:a})}function e(){f.reject(),c.$emit("$translateRefreshEnd",{language:a})}if(!o)throw new Error("Couldn't refresh translation table, no loader registered!");var f=d.defer();if(c.$emit("$translateRefreshStart",{language:a}),a)if(u[a]){var h=function(c){N(c.key,c.table),a===i&&W(i),b()};h.displayName="refreshPostProcessor",X(a).then(h,e)}else e();else{
// if there's no language key specified we refresh ALL THE THINGS!
var j=[],k={};
// reload registered fallback languages
if(g&&g.length)for(var l=0,m=g.length;m>l;l++)j.push(X(g[l])),k[g[l]]=!0;
// reload currently used language
i&&!k[i]&&j.push(X(i));var n=function(a){u={},angular.forEach(a,function(a){N(a.key,a.table)}),i&&W(i),b()};n.displayName="refreshPostProcessor",d.all(j).then(n,e)}return f.promise},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#instant
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns a translation instantly from the internal state of loaded translation. All rules
       * regarding the current language, the preferred language of even fallback languages will be
       * used except any promise handling. If a language was not found, an asynchronous loading
       * will be invoked in the background.
       *
       * @param {string|array} translationId A token which represents a translation id
       *                                     This can be optionally an array of translation ids which
       *                                     results that the function's promise returns an object where
       *                                     each key is the translation id and the value the translation.
       * @param {object} interpolateParams Params
       * @param {string} interpolationId The id of the interpolation to use
       * @param {string} forceLanguage A language to be used instead of the current language
       *
       * @return {string|object} translation
       */
U.instant=function(a,b,c,d){
// we don't want to re-negotiate $uses
var f=d&&d!==i?// we don't want to re-negotiate $uses
M(d)||d:i;
// Detect undefined and null values to shorten the execution and prevent exceptions
if(null===a||angular.isUndefined(a))return a;
// Duck detection: If the first argument is an array, a bunch of translations was requested.
// The result is an object.
if(
// Check forceLanguage is present
d&&ja(d),angular.isArray(a)){for(var h={},j=0,k=a.length;k>j;j++)h[a[j]]=U.instant(a[j],b,c,d);return h}
// We discarded unacceptable values. So we just need to verify if translationId is empty String
if(angular.isString(a)&&a.length<1)return a;
// trim off any whitespace
a&&(a=L.apply(a));var l,n=[];e&&n.push(e),f&&n.push(f),g&&g.length&&(n=n.concat(g));for(var o=0,p=n.length;p>o;o++){var s=n[o];if(u[s]&&"undefined"!=typeof u[s][a]&&(l=ga(a,b,c,f)),"undefined"!=typeof l)break}
// Return translation of default interpolator if not found anything.
return l||""===l||(q||r?l=V(a):(l=G.interpolate(a,b),m&&!I&&(l=aa(a,b)))),l},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#versionInfo
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the current version information for the angular-translate library
       *
       * @return {string} angular-translate version
       */
U.versionInfo=function(){return H},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#loaderCache
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns the defined loaderCache.
       *
       * @return {boolean|string|object} current value of loaderCache
       */
U.loaderCache=function(){return s},
// internal purpose only
U.directivePriority=function(){return D},
// internal purpose only
U.statefulFilter=function(){return E},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#isReady
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether the service is "ready" to translate (i.e. loading 1st language).
       *
       * See also {@link pascalprecht.translate.$translate#methods_onReady onReady()}.
       *
       * @return {boolean} current value of ready
       */
U.isReady=function(){return C};var ka=d.defer();ka.promise.then(function(){C=!0}),/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#onReady
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * Returns whether the service is "ready" to translate (i.e. loading 1st language).
       *
       * See also {@link pascalprecht.translate.$translate#methods_isReady isReady()}.
       *
       * @param {Function=} fn Function to invoke when service is ready
       * @return {object} Promise resolved when service is ready
       */
U.onReady=function(a){var b=d.defer();return angular.isFunction(a)&&b.promise.then(a),C?b.resolve():ka.promise.then(b.resolve),b.promise},/**
       * @ngdoc function
       * @name pascalprecht.translate.$translate#getAvailableLanguageKeys
       * @methodOf pascalprecht.translate.$translate
       *
       * @description
       * This function simply returns the registered language keys being defined before in the config phase
       * With this, an application can use the array to provide a language selection dropdown or similar
       * without any additional effort
       *
       * @returns {object} returns the list of possibly registered language keys and mapping or null if not defined
       */
U.getAvailableLanguageKeys=function(){return v.length>0?v:null};
// Whenever $translateReady is being fired, this will ensure the state of $isReady
var la=c.$on("$translateReady",function(){ka.resolve(),la(),// one time only
la=null}),ma=c.$on("$translateChangeEnd",function(){ka.resolve(),ma(),// one time only
ma=null});if(o){
// Also, if there are any fallback language registered, we start
// loading them asynchronously as soon as we can.
if(
// If at least one async loader is defined and there are no
// (default) translations available we should try to load them.
angular.equals(u,{})&&U.use()&&U.use(U.use()),g&&g.length)for(var na=function(a){return N(a.key,a.table),c.$emit("$translateChangeEnd",{language:a.key}),a},oa=0,pa=g.length;pa>oa;oa++){var qa=g[oa];!A&&u[qa]||(T[qa]=X(qa).then(na))}}else c.$emit("$translateReady",{language:U.use()});return U}]}function d(a,b){"use strict";var c,d={},e="default";/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#setLocale
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Sets current locale (this is currently not use in this interpolation).
   *
   * @param {string} locale Language key or locale.
   */
/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#getInterpolationIdentifier
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Returns an identifier for this interpolation service.
   *
   * @returns {string} $identifier
   */
/**
   * @deprecated will be removed in 3.0
   * @see {@link pascalprecht.translate.$translateSanitization}
   */
/**
   * @ngdoc function
   * @name pascalprecht.translate.$translateDefaultInterpolation#interpolate
   * @methodOf pascalprecht.translate.$translateDefaultInterpolation
   *
   * @description
   * Interpolates given string agains given interpolate params using angulars
   * `$interpolate` service.
   *
   * @returns {string} interpolated string.
   */
return d.setLocale=function(a){c=a},d.getInterpolationIdentifier=function(){return e},d.useSanitizeValueStrategy=function(a){return b.useStrategy(a),this},d.interpolate=function(c,d){d=d||{},d=b.sanitize(d,"params");var e=a(c)(d);return e=b.sanitize(e,"text")},d}function e(a,b,c,d,e,g){"use strict";/**
   * @name trim
   * @private
   *
   * @description
   * trim polyfill
   *
   * @returns {string} The string stripped of whitespace from both ends
   */
var h=function(){return this.toString().replace(/^\s+|\s+$/g,"")};return{restrict:"AE",scope:!0,priority:a.directivePriority(),compile:function(b,i){var j=i.translateValues?i.translateValues:void 0,k=i.translateInterpolation?i.translateInterpolation:void 0,l=b[0].outerHTML.match(/translate-value-+/i),m="^(.*)("+c.startSymbol()+".*"+c.endSymbol()+")(.*)",n="^(.*)"+c.startSymbol()+"(.*)"+c.endSymbol()+"(.*)";return function(b,o,p){b.interpolateParams={},b.preText="",b.postText="",b.translateNamespace=f(b);var q={},r=function(a,c,d){
// initially fetch all attributes if existing and fill the params
if(
// initial setup
c.translateValues&&angular.extend(a,e(c.translateValues)(b.$parent)),l)for(var f in d)if(Object.prototype.hasOwnProperty.call(c,f)&&"translateValue"===f.substr(0,14)&&"translateValues"!==f){var g=angular.lowercase(f.substr(14,1))+f.substr(15);a[g]=d[f]}},s=function(a){if(
// Remove any old watcher
angular.isFunction(s._unwatchOld)&&(s._unwatchOld(),s._unwatchOld=void 0),angular.equals(a,"")||!angular.isDefined(a)){var d=h.apply(o.text()),e=d.match(m);
// Interpolate translation id if required
if(angular.isArray(e)){b.preText=e[1],b.postText=e[3],q.translate=c(e[2])(b.$parent);var f=d.match(n);angular.isArray(f)&&f[2]&&f[2].length&&(s._unwatchOld=b.$watch(f[2],function(a){q.translate=a,y()}))}else
// do not assigne the translation id if it is empty.
q.translate=d?d:void 0}else q.translate=a;y()},t=function(a){p.$observe(a,function(b){q[a]=b,y()})};
// initial setup with values
r(b.interpolateParams,p,i);var u=!0;p.$observe("translate",function(a){"undefined"==typeof a?
// case of element "<translate>xyz</translate>"
s(""):
// case of regular attribute
""===a&&u||(q.translate=a,y()),u=!1});for(var v in p)p.hasOwnProperty(v)&&"translateAttr"===v.substr(0,13)&&t(v);if(p.$observe("translateDefault",function(a){b.defaultText=a,y()}),j&&p.$observe("translateValues",function(a){a&&b.$parent.$watch(function(){angular.extend(b.interpolateParams,e(a)(b.$parent))})}),l){var w=function(a){p.$observe(a,function(c){var d=angular.lowercase(a.substr(14,1))+a.substr(15);b.interpolateParams[d]=c})};for(var x in p)Object.prototype.hasOwnProperty.call(p,x)&&"translateValue"===x.substr(0,14)&&"translateValues"!==x&&w(x)}
// Master update function
var y=function(){for(var a in q)q.hasOwnProperty(a)&&void 0!==q[a]&&z(a,q[a],b,b.interpolateParams,b.defaultText,b.translateNamespace)},z=function(b,c,d,e,f,g){c?(
// if translation id starts with '.' and translateNamespace given, prepend namespace
g&&"."===c.charAt(0)&&(c=g+c),a(c,e,k,f,d.translateLanguage).then(function(a){A(a,d,!0,b)},function(a){A(a,d,!1,b)})):
// as an empty string cannot be translated, we can solve this using successful=false
A(c,d,!1,b)},A=function(b,c,e,f){if(e||"undefined"!=typeof c.defaultText&&(b=c.defaultText),"translate"===f){
// default translate into innerHTML
(e||!e&&"undefined"==typeof p.translateKeepContent)&&o.empty().append(c.preText+b+c.postText);var g=a.isPostCompilingEnabled(),h="undefined"!=typeof i.translateCompile,j=h&&"false"!==i.translateCompile;(g&&!h||j)&&d(o.contents())(c)}else{
// translate attribute
var k=p.$attr[f];"data-"===k.substr(0,5)&&(
// ensure html5 data prefix is stripped
k=k.substr(5)),k=k.substr(15),o.attr(k,b)}};(j||l||p.translateDefault)&&b.$watch("interpolateParams",y,!0);
// Replaced watcher on translateLanguage with event listener
var B=b.$on("translateLanguageChanged",y),C=g.$on("$translateChangeSuccess",y);
// ensure translation will be looked up at least one
o.text().length?s(p.translate?p.translate:""):p.translate&&
// ensure attribute will be not skipped
s(p.translate),y(),b.$on("$destroy",function(){B(),C()})}}}}/**
 * Returns the scope's namespace.
 * @private
 * @param scope
 * @returns {string}
 */
function f(a){"use strict";return a.translateNamespace?a.translateNamespace:a.$parent?f(a.$parent):void 0}function g(a,b){"use strict";return{compile:function(c){var d=function(){c.addClass(a.cloakClassName())},e=function(){c.removeClass(a.cloakClassName())};return a.onReady(function(){e()}),d(),function(c,f,g){g.translateCloak&&g.translateCloak.length&&(
// Register a watcher for the defined translation allowing a fine tuned cloak
g.$observe("translateCloak",function(b){a(b).then(e,d)}),
// Register for change events as this is being another indicicator revalidating the cloak)
b.$on("$translateChangeSuccess",function(){a(g.translateCloak).then(e,d)}))}}}}function h(){"use strict";return{restrict:"A",scope:!0,compile:function(){return{pre:function(a,b,c){a.translateNamespace=f(a),a.translateNamespace&&"."===c.translateNamespace.charAt(0)?a.translateNamespace+=c.translateNamespace:a.translateNamespace=c.translateNamespace}}}}}/**
 * Returns the scope's namespace.
 * @private
 * @param scope
 * @returns {string}
 */
function f(a){"use strict";return a.translateNamespace?a.translateNamespace:a.$parent?f(a.$parent):void 0}function i(){"use strict";return{restrict:"A",scope:!0,compile:function(){return function(a,b,c){c.$observe("translateLanguage",function(b){a.translateLanguage=b}),a.$watch("translateLanguage",function(){a.$broadcast("translateLanguageChanged")})}}}}function j(a,b){"use strict";var c=function(c,d,e,f){return angular.isObject(d)||(d=a(d)(this)),b.instant(c,d,e,f)};return b.statefulFilter()&&(c.$stateful=!0),c}function k(a){"use strict";return a("translations")}/**
 * @ngdoc overview
 * @name pascalprecht.translate
 *
 * @description
 * The main module which holds everything together.
 */
/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateSanitizationProvider
 *
 * @description
 *
 * Configurations for $translateSanitization
 */
/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateProvider
 * @description
 *
 * $translateProvider allows developers to register translation-tables, asynchronous loaders
 * and similar to configure translation behavior directly inside of a module.
 *
 */
/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateDefaultInterpolation
 * @requires $interpolate
 *
 * @description
 * Uses angular's `$interpolate` services to interpolate strings against some values.
 *
 * Be aware to configure a proper sanitization strategy.
 *
 * See also:
 * * {@link pascalprecht.translate.$translateSanitization}
 *
 * @return {object} $translateDefaultInterpolation Interpolator service
 */
return a.$inject=["$translate"],c.$inject=["$STORAGE_KEY","$windowProvider","$translateSanitizationProvider","pascalprechtTranslateOverrider"],d.$inject=["$interpolate","$translateSanitization"],e.$inject=["$translate","$q","$interpolate","$compile","$parse","$rootScope"],g.$inject=["$translate","$rootScope"],j.$inject=["$parse","$translate"],k.$inject=["$cacheFactory"],angular.module("pascalprecht.translate",["ng"]).run(a),a.displayName="runTranslate",angular.module("pascalprecht.translate").provider("$translateSanitization",b),angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider",{}).provider("$translate",c),c.displayName="displayName",angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation",d),d.displayName="$translateDefaultInterpolation",angular.module("pascalprecht.translate").constant("$STORAGE_KEY","NG_TRANSLATE_LANG_KEY"),angular.module("pascalprecht.translate").directive("translate",e),e.displayName="translateDirective",angular.module("pascalprecht.translate").directive("translateCloak",g),g.displayName="translateCloakDirective",angular.module("pascalprecht.translate").directive("translateNamespace",h),h.displayName="translateNamespaceDirective",angular.module("pascalprecht.translate").directive("translateLanguage",i),i.displayName="translateLanguageDirective",angular.module("pascalprecht.translate").filter("translate",j),j.displayName="translateFilterFactory",angular.module("pascalprecht.translate").factory("$translationCache",k),k.displayName="$translationCache","pascalprecht.translate"});