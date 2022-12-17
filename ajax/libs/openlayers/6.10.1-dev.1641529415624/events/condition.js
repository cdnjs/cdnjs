/**
 * @module ol/events/condition
 */
import MapBrowserEventType from '../MapBrowserEventType.js';
import { FALSE, TRUE } from '../functions.js';
import { MAC, WEBKIT } from '../has.js';
import { assert } from '../asserts.js';
/**
 * A function that takes an {@link module:ol/MapBrowserEvent} and returns a
 * `{boolean}`. If the condition is met, true should be returned.
 *
 * @typedef {function(this: ?, import("../MapBrowserEvent.js").default): boolean} Condition
 */
/**
 * Creates a condition function that passes when all provided conditions pass.
 * @param {...Condition} var_args Conditions to check.
 * @return {Condition} Condition function.
 */
export function all(var_args) {
    var conditions = arguments;
    /**
     * @param {import("../MapBrowserEvent.js").default} event Event.
     * @return {boolean} All conditions passed.
     */
    return function (event) {
        var pass = true;
        for (var i = 0, ii = conditions.length; i < ii; ++i) {
            pass = pass && conditions[i](event);
            if (!pass) {
                break;
            }
        }
        return pass;
    };
}
/**
 * Return `true` if only the alt-key is pressed, `false` otherwise (e.g. when
 * additionally the shift-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the alt key is pressed.
 * @api
 */
export var altKeyOnly = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    return (originalEvent.altKey &&
        !(originalEvent.metaKey || originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
};
/**
 * Return `true` if only the alt-key and shift-key is pressed, `false` otherwise
 * (e.g. when additionally the platform-modifier-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the alt and shift keys are pressed.
 * @api
 */
export var altShiftKeysOnly = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    return (originalEvent.altKey &&
        !(originalEvent.metaKey || originalEvent.ctrlKey) &&
        originalEvent.shiftKey);
};
/**
 * Return `true` if the map has the focus. This condition requires a map target
 * element with a `tabindex` attribute, e.g. `<div id="map" tabindex="1">`.
 *
 * @param {import("../MapBrowserEvent.js").default} event Map browser event.
 * @return {boolean} The map has the focus.
 * @api
 */
export var focus = function (event) {
    var targetElement = event.map.getTargetElement();
    var activeElement = event.map.getOwnerDocument().activeElement;
    return targetElement.contains(activeElement);
};
/**
 * Return `true` if the map has the focus or no 'tabindex' attribute set.
 *
 * @param {import("../MapBrowserEvent.js").default} event Map browser event.
 * @return {boolean} The map container has the focus or no 'tabindex' attribute.
 */
export var focusWithTabindex = function (event) {
    return event.map.getTargetElement().hasAttribute('tabindex')
        ? focus(event)
        : true;
};
/**
 * Return always true.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True.
 * @api
 */
export var always = TRUE;
/**
 * Return `true` if the event is a `click` event, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event is a map `click` event.
 * @api
 */
export var click = function (mapBrowserEvent) {
    return mapBrowserEvent.type == MapBrowserEventType.CLICK;
};
/**
 * Return `true` if the event has an "action"-producing mouse button.
 *
 * By definition, this includes left-click on windows/linux, and left-click
 * without the ctrl key on Macs.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} The result.
 */
export var mouseActionButton = function (mapBrowserEvent) {
    var originalEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
    return originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey);
};
/**
 * Return always false.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} False.
 * @api
 */
export var never = FALSE;
/**
 * Return `true` if the browser event is a `pointermove` event, `false`
 * otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the browser event is a `pointermove` event.
 * @api
 */
export var pointerMove = function (mapBrowserEvent) {
    return mapBrowserEvent.type == 'pointermove';
};
/**
 * Return `true` if the event is a map `singleclick` event, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event is a map `singleclick` event.
 * @api
 */
export var singleClick = function (mapBrowserEvent) {
    return mapBrowserEvent.type == MapBrowserEventType.SINGLECLICK;
};
/**
 * Return `true` if the event is a map `dblclick` event, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event is a map `dblclick` event.
 * @api
 */
export var doubleClick = function (mapBrowserEvent) {
    return mapBrowserEvent.type == MapBrowserEventType.DBLCLICK;
};
/**
 * Return `true` if no modifier key (alt-, shift- or platform-modifier-key) is
 * pressed.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True only if there no modifier keys are pressed.
 * @api
 */
export var noModifierKeys = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    return (!originalEvent.altKey &&
        !(originalEvent.metaKey || originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
};
/**
 * Return `true` if only the platform-modifier-key (the meta-key on Mac,
 * ctrl-key otherwise) is pressed, `false` otherwise (e.g. when additionally
 * the shift-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the platform modifier key is pressed.
 * @api
 */
export var platformModifierKeyOnly = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    return (!originalEvent.altKey &&
        (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) &&
        !originalEvent.shiftKey);
};
/**
 * Return `true` if only the shift-key is pressed, `false` otherwise (e.g. when
 * additionally the alt-key is pressed).
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if only the shift key is pressed.
 * @api
 */
export var shiftKeyOnly = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    return (!originalEvent.altKey &&
        !(originalEvent.metaKey || originalEvent.ctrlKey) &&
        originalEvent.shiftKey);
};
/**
 * Return `true` if the target element is not editable, i.e. not a `<input>`-,
 * `<select>`- or `<textarea>`-element, `false` otherwise.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True only if the target element is not editable.
 * @api
 */
export var targetNotEditable = function (mapBrowserEvent) {
    var originalEvent = /** @type {KeyboardEvent|MouseEvent|TouchEvent} */ (mapBrowserEvent.originalEvent);
    var tagName = /** @type {Element} */ (originalEvent.target).tagName;
    return tagName !== 'INPUT' && tagName !== 'SELECT' && tagName !== 'TEXTAREA';
};
/**
 * Return `true` if the event originates from a mouse device.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a mouse device.
 * @api
 */
export var mouseOnly = function (mapBrowserEvent) {
    var pointerEvent = /** @type {import("../MapBrowserEvent").default} */ (mapBrowserEvent).originalEvent;
    assert(pointerEvent !== undefined, 56); // mapBrowserEvent must originate from a pointer event
    // see https://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType
    return pointerEvent.pointerType == 'mouse';
};
/**
 * Return `true` if the event originates from a touchable device.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a touchable device.
 * @api
 */
export var touchOnly = function (mapBrowserEvent) {
    var pointerEvt = /** @type {import("../MapBrowserEvent").default} */ (mapBrowserEvent).originalEvent;
    assert(pointerEvt !== undefined, 56); // mapBrowserEvent must originate from a pointer event
    // see https://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType
    return pointerEvt.pointerType === 'touch';
};
/**
 * Return `true` if the event originates from a digital pen.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a digital pen.
 * @api
 */
export var penOnly = function (mapBrowserEvent) {
    var pointerEvt = /** @type {import("../MapBrowserEvent").default} */ (mapBrowserEvent).originalEvent;
    assert(pointerEvt !== undefined, 56); // mapBrowserEvent must originate from a pointer event
    // see https://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType
    return pointerEvt.pointerType === 'pen';
};
/**
 * Return `true` if the event originates from a primary pointer in
 * contact with the surface or if the left mouse button is pressed.
 * See https://www.w3.org/TR/pointerevents/#button-states.
 *
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
 * @return {boolean} True if the event originates from a primary pointer.
 * @api
 */
export var primaryAction = function (mapBrowserEvent) {
    var pointerEvent = /** @type {import("../MapBrowserEvent").default} */ (mapBrowserEvent).originalEvent;
    assert(pointerEvent !== undefined, 56); // mapBrowserEvent must originate from a pointer event
    return pointerEvent.isPrimary && pointerEvent.button === 0;
};
//# sourceMappingURL=condition.js.map