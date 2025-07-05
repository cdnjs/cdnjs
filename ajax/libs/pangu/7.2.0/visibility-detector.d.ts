export interface VisibilityDetectorConfig {
    enabled: boolean;
    commonHiddenPatterns: {
        clipRect: boolean;
        displayNone: boolean;
        visibilityHidden: boolean;
        opacityZero: boolean;
        heightWidth1px: boolean;
    };
}
export declare class VisibilityDetector {
    readonly config: VisibilityDetectorConfig;
    isElementVisuallyHidden(element: Element): boolean;
    shouldSkipSpacingAfterNode(node: Node): boolean;
    shouldSkipSpacingBeforeNode(node: Node): boolean;
    updateConfig(config: Partial<VisibilityDetectorConfig>): void;
}
