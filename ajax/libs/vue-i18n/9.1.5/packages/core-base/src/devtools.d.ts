import { IntlifyDevToolsHooks } from '@intlify/devtools-if';
import type { IntlifyDevToolsEmitter, IntlifyDevToolsHookPayloads } from '@intlify/devtools-if';
export declare function setDevToolsHook(hook: IntlifyDevToolsEmitter | null): void;
export declare function getDevToolsHook(): IntlifyDevToolsEmitter | null;
export declare function initI18nDevTools(i18n: unknown, version: string, meta?: Record<string, unknown>): void;
export declare const translateDevTools: (payloads: IntlifyDevToolsHookPayloads[IntlifyDevToolsHooks]) => void | null;
//# sourceMappingURL=devtools.d.ts.map