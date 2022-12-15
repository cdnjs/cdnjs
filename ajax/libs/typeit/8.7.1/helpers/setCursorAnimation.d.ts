/// <reference types="web-animations-js" />
import { El } from "../types";
/**
 * Create and return an animation for the cursor.
 */
declare let setCursorAnimation: ({ cursor, frames, options, }: {
    cursor: El;
    frames: AnimationKeyFrame[];
    options: Partial<AnimationEffectTiming>;
}) => Animation;
export default setCursorAnimation;
