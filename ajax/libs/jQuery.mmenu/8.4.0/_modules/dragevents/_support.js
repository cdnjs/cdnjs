/** Whether or not touch gestures are supported by the browser. */
export var touch = 'ontouchstart' in window ||
    (navigator.msMaxTouchPoints ? true : false) ||
    false;
