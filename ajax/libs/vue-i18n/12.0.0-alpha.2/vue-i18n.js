/*!
  * vue-i18n v12.0.0-alpha.2
  * (c) 2016-present kazuya kawaguchi and contributors
  * Released under the MIT License.
  */
import { registerMessageCompiler, compile, registerMessageResolver, resolveValue, registerLocaleFallbacker, fallbackWithLocaleChain, setDevToolsHook } from '@intlify/core-base';
import { getGlobalThis } from '@intlify/shared';
import { initFeatureFlags, initDev } from '@intlify/vue-i18n-core';
export { I18nInjectionKey, VERSION, createI18n, useI18n } from '@intlify/vue-i18n-core';

{
    initFeatureFlags();
}
// register message compiler at vue-i18n
registerMessageCompiler(compile);
// register message resolver at vue-i18n
registerMessageResolver(resolveValue);
// register fallback locale at vue-i18n
registerLocaleFallbacker(fallbackWithLocaleChain);
// NOTE: experimental !!
if ((process.env.NODE_ENV !== 'production') || __INTLIFY_PROD_DEVTOOLS__) {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
if ((process.env.NODE_ENV !== 'production')) {
    initDev();
}
