/**
 * A collection of low-level async operation stuff.
 */
/**
 * [Listener description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare type Listener = (now: number) => void;
/**
 * [raf description]
 *
 * @ignore Exclude from docs
 * @todo Description
 */
export declare const raf: (fn: () => void) => void;
/**
 * [nextFrame description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param fn [description]
 */
export declare function nextFrame(fn: Listener): void;
/**
 * [readFrame description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param fn [description]
 */
export declare function readFrame(fn: Listener): void;
/**
 * [writeFrame description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param fn [description]
 */
export declare function writeFrame(fn: Listener): void;
/**
 * [whenIdle description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param fn [description]
 */
export declare function whenIdle(fn: Listener): void;
/**
 * [triggerIdle description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @todo Maybe don't trigger a callback which was added while in the middle of triggering?
 */
export declare function triggerIdle(): void;
