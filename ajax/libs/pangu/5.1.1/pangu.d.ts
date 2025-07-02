import { Pangu } from '../shared';
export declare class BrowserPangu extends Pangu {
    blockTags: RegExp;
    ignoredTags: RegExp;
    presentationalTags: RegExp;
    spaceLikeTags: RegExp;
    spaceSensitiveTags: RegExp;
    isAutoSpacingPageExecuted: boolean;
    constructor();
    spacingNodeByXPath(xPathQuery: string, contextNode: Node): void;
    spacingNode(contextNode: Node): void;
    spacingElementById(idName: string): void;
    spacingElementByClassName(className: string): void;
    spacingElementByTagName(tagName: string): void;
    spacingPageTitle(): void;
    spacingPageBody(): void;
    spacingPage(): void;
    autoSpacingPage(pageDelay?: number, nodeDelay?: number, nodeMaxWait?: number): void;
    protected isContentEditable(node: any): any;
    protected isSpecificTag(node: Node, tagRegex: RegExp): boolean | "";
    protected isInsideSpecificTag(node: Node, tagRegex: RegExp, checkCurrent?: boolean): boolean;
    protected canIgnoreNode(node: Node): boolean;
    protected isFirstTextChild(parentNode: Node, targetNode: Node): boolean;
    protected isLastTextChild(parentNode: Node, targetNode: Node): boolean;
}
export declare const pangu: BrowserPangu;
export default pangu;
