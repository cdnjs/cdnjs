/** Whether or not touch gestures are supported by the browser. */
export const touch = 'ontouchstart' in window ||
    (navigator.msMaxTouchPoints ? true : false) ||
    false;
