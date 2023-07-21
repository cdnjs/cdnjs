/**
 * touch.ts 8.4.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
/**
 * Detect touch support - Windows Surface devices and other touch devices
 * should we use this instead ? (what we had for always showing resize handles)
 * /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
 */
export declare const isTouch: boolean;
/**
 * Handle the touchstart events
 * @param {Object} e The widget element's touchstart event
 */
export declare function touchstart(e: TouchEvent): void;
/**
 * Handle the touchmove events
 * @param {Object} e The document's touchmove event
 */
export declare function touchmove(e: TouchEvent): void;
/**
 * Handle the touchend events
 * @param {Object} e The document's touchend event
 */
export declare function touchend(e: TouchEvent): void;
/**
 * Note we don't get touchenter/touchleave (which are deprecated)
 * see https://stackoverflow.com/questions/27908339/js-touch-equivalent-for-mouseenter
 * so instead of PointerEvent to still get enter/leave and send the matching mouse event.
 */
export declare function pointerdown(e: PointerEvent): void;
export declare function pointerenter(e: PointerEvent): void;
export declare function pointerleave(e: PointerEvent): void;
