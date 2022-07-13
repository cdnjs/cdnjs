/// <reference types="web-animations-js" />
import { El } from "../types";
declare global {
    interface AnimationEffect {
        getKeyframes: () => any;
    }
}
interface rebuildCursorAnimationArgs {
    cursor: El | undefined;
    frames: AnimationKeyFrame[];
    timingOptions: any;
}
declare let rebuildCursorAnimation: ({ cursor, frames, timingOptions, }: rebuildCursorAnimationArgs) => Animation;
export default rebuildCursorAnimation;
