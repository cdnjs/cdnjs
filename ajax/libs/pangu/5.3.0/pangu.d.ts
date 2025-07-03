import { Pangu } from '../shared';
export interface AutoSpacingPageConfig {
    pageDelayMs?: number;
    nodeDelayMs?: number;
    nodeMaxWaitMs?: number;
}
export interface SmartAutoSpacingPageConfig extends AutoSpacingPageConfig {
    sampleSize?: number;
    cjkObserverMaxWaitMs?: number;
}
export declare class BrowserPangu extends Pangu {
    isAutoSpacingPageExecuted: boolean;
    protected autoSpacingPageObserver: MutationObserver | null;
    protected cjkObserver: MutationObserver | null;
    blockTags: RegExp;
    ignoredTags: RegExp;
    presentationalTags: RegExp;
    spaceLikeTags: RegExp;
    spaceSensitiveTags: RegExp;
    ignoredClass: string;
    constructor();
    hasCjk(sampleSize?: number): boolean;
    autoSpacingPage({ pageDelayMs, nodeDelayMs, nodeMaxWaitMs }?: AutoSpacingPageConfig): void;
    smartAutoSpacingPage({ pageDelayMs, nodeDelayMs, nodeMaxWaitMs, sampleSize, cjkObserverMaxWaitMs }?: SmartAutoSpacingPageConfig): void;
    spacingPage(): void;
    spacingPageTitle(): void;
    spacingPageBody(): void;
    spacingNode(contextNode: Node): void;
    spacingElementById(idName: string): void;
    spacingElementByClassName(className: string): void;
    spacingElementByTagName(tagName: string): void;
    spacingNodeByXPath(xPathQuery: string, contextNode: Node): void;
    stopAutoSpacingPage(): void;
    protected isContentEditable(node: any): any;
    protected isSpecificTag(node: Node, tagRegex: RegExp): boolean | "";
    protected isInsideSpecificTag(node: Node, tagRegex: RegExp, checkCurrent?: boolean): boolean;
    protected hasIgnoredClass(node: Node): boolean;
    protected canIgnoreNode(node: Node): boolean;
    protected isFirstTextChild(parentNode: Node, targetNode: Node): boolean;
    protected isLastTextChild(parentNode: Node, targetNode: Node): boolean;
    protected setupAutoSpacingPageObserver(nodeDelayMs: number, nodeMaxWaitMs: number): void;
    protected setupCjkObserver({ nodeDelayMs, nodeMaxWaitMs, cjkObserverMaxWaitMs }: SmartAutoSpacingPageConfig): void;
}
export declare const pangu: BrowserPangu;
export default pangu;
