export declare class DomWalker {
    static readonly blockTags: RegExp;
    static readonly ignoredTags: RegExp;
    static readonly presentationalTags: RegExp;
    static readonly spaceLikeTags: RegExp;
    static readonly spaceSensitiveTags: RegExp;
    static readonly ignoredClass = "no-pangu-spacing";
    static collectTextNodes(contextNode: Node, reverse?: boolean): Text[];
    static canIgnoreNode(node: Node): boolean;
    static isFirstTextChild(parentNode: Node, targetNode: Node): boolean;
    static isLastTextChild(parentNode: Node, targetNode: Node): boolean;
    private static isSpecificTag;
    private static isContentEditable;
    private static hasIgnoredClass;
}
