import { Pangu } from '../shared';
import { TaskScheduler } from './task-scheduler';
import { VisibilityDetector } from './visibility-detector';
export interface AutoSpacingPageConfig {
    pageDelayMs?: number;
    nodeDelayMs?: number;
    nodeMaxWaitMs?: number;
}
export declare class BrowserPangu extends Pangu {
    private isAutoSpacingPageExecuted;
    private autoSpacingPageObserver;
    readonly taskScheduler: TaskScheduler;
    readonly visibilityDetector: VisibilityDetector;
    autoSpacingPage({ pageDelayMs, nodeDelayMs, nodeMaxWaitMs }?: AutoSpacingPageConfig): void;
    spacingPage(): void;
    spacingNode(contextNode: Node): void;
    stopAutoSpacingPage(): void;
    isElementVisuallyHidden(element: Element): boolean;
    private spacingTextNodes;
    private spacingTextNodesInQueue;
    private waitForVideosToLoad;
    private setupAutoSpacingPageObserver;
}
export declare const pangu: BrowserPangu;
export default pangu;
