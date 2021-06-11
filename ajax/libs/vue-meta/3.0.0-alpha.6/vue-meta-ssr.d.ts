import { App } from 'vue';
import { SSRContext } from '@vue/server-renderer';

declare function renderMetaToString(app: App, ctx?: SSRContext): Promise<SSRContext>;

export { renderMetaToString };
