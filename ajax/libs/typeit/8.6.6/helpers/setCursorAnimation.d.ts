/// <reference types="web-animations-js" />
import { El } from "../types";
/**
 * Create and return an animation for the cursor.
 */
declare let setCursorAnimation: ({ cursor, frames, timingOptions, }: {
    cursor: El;
    frames?: AnimationKeyFrame[] | null;
    timingOptions: Partial<AnimationEffectTiming>;
}) => Animation | null;
export default setCursorAnimation;
