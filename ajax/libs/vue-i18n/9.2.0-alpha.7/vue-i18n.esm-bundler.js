/*!
  * vue-i18n v9.2.0-alpha.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
import { registerMessageCompiler, compileToFunction, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain } from '@intlify/core-base';
export * from '@intlify/vue-i18n-core';

// register message compiler at vue-i18n
registerMessageCompiler(compileToFunction);
// register message resolver at vue-i18n
registerMessageResolver(resolveValue);
// register fallback locale at vue-i18n
registerLocaleFallbacker(fallbackWithLocaleChain);
