/// <reference types="web-animations-js" />
export declare type TypeItInstance = (element: El | string, options: Options) => void;
export declare type Character = {
    node: El | null;
    content: string | Node;
};
export interface CursorAnimationOptions {
    frames?: AnimationKeyFrame[];
    options?: Partial<AnimationEffectTiming>;
}
export interface CursorOptions {
    autoPause?: boolean;
    autoPauseDelay?: number;
    animation?: CursorAnimationOptions;
}
export interface Options {
    breakLines?: boolean;
    cursorChar?: string;
    cursor?: CursorOptions | boolean;
    cursorSpeed?: number;
    deleteSpeed?: null | number;
    html?: boolean;
    lifeLike?: boolean;
    loop?: boolean;
    loopDelay?: number;
    nextStringDelay?: number;
    speed?: number;
    startDelay?: number;
    startDelete?: boolean;
    strings?: string[] | string;
    waitUntilVisible?: boolean;
    beforeString?: Function;
    afterString?: Function;
    beforeStep?: Function;
    afterStep?: Function;
    afterComplete?: Function;
}
export declare type ActionOpts = Options & {
    to?: Sides;
    instant?: boolean;
    delay?: number;
};
export declare type QueueItem = {
    done?: boolean;
    func?: () => any;
    delay?: number;
    char?: any;
    typeable?: boolean;
    deletable?: boolean;
    cursorable?: boolean;
    shouldPauseCursor?: () => boolean;
};
export declare type QueueMapPair = [Symbol, QueueItem];
export interface El extends HTMLElement {
    value: string | number;
    originalParent?: HTMLElement;
}
export declare type Sides = "START" | "END";
