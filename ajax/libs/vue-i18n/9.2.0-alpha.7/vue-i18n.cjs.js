/*!
  * vue-i18n v9.2.0-alpha.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var coreBase = require('@intlify/core-base');
var vueI18nCore = require('@intlify/vue-i18n-core');

// register message compiler at vue-i18n
coreBase.registerMessageCompiler(coreBase.compileToFunction);
// register message resolver at vue-i18n
coreBase.registerMessageResolver(coreBase.resolveValue);
// register fallback locale at vue-i18n
coreBase.registerLocaleFallbacker(coreBase.fallbackWithLocaleChain);

Object.keys(vueI18nCore).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) exports[k] = vueI18nCore[k];
});
