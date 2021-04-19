import { VueDevToolsTimelineEvents } from '@intlify/vue-devtools';
import type { App } from 'vue';
import type { VueDevToolsTimelineEventPayloads } from '@intlify/vue-devtools';
import type { I18n, I18nInternal } from './i18n';
declare type _I18n<Messages, DateTimeFormats, NumberFormats, Legacy extends boolean> = I18n<Messages, DateTimeFormats, NumberFormats, Legacy> & I18nInternal;
export declare function enableDevTools<Messages, DateTimeFormats, NumberFormats, Legacy extends boolean>(app: App, i18n: _I18n<Messages, DateTimeFormats, NumberFormats, Legacy>): Promise<boolean>;
export declare function addTimelineEvent(event: VueDevToolsTimelineEvents, payload?: VueDevToolsTimelineEventPayloads[VueDevToolsTimelineEvents]): void;
export {};
//# sourceMappingURL=devtools.d.ts.map