import type { Page } from 'playwright';
export declare function sleep(delay: number): Promise<unknown>;
export declare function getText(page: Page, selector: string, options?: Parameters<Page['locator']>[1]): Promise<string>;
export declare function getData(page: Page, selector: string, options?: Parameters<Page['locator']>[1]): Promise<any>;
export declare function assetLocaleHead(page: Page, headSelector: string): Promise<void>;
export declare function getDom(html: string): Document;
export declare function getDataFromDom(dom: Document, selector: string): any;
export declare function assertLocaleHeadWithDom(dom: Document, headSelector: string): Promise<void>;
//# sourceMappingURL=helper.d.ts.map