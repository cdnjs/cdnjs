export default KeyboardZoom;
export type Options = {
    /**
     * Animation duration in milliseconds.
     */
    duration?: number | undefined;
    /**
     * A function that
     * takes a {@link module :ol/MapBrowserEvent~MapBrowserEvent} and returns a
     * boolean to indicate whether that event should be handled. The default condition is
     * that {@link module :ol/events/condition.targetNotEditable} is fulfilled and that
     * the platform modifier key isn't pressed
     * (!{@link module :ol/events/condition.platformModifierKey}).
     */
    condition?: import("../events/condition.js").Condition | undefined;
    /**
     * The zoom level delta on each key press.
     */
    delta?: number | undefined;
};
/**
 * @typedef {Object} Options
 * @property {number} [duration=100] Animation duration in milliseconds.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. The default condition is
 * that {@link module:ol/events/condition.targetNotEditable} is fulfilled and that
 * the platform modifier key isn't pressed
 * (!{@link module:ol/events/condition.platformModifierKey}).
 * @property {number} [delta=1] The zoom level delta on each key press.
 */
/**
 * @classdesc
 * Allows the user to zoom the map using keyboard + and -.
 * Note that, although this interaction is by default included in maps,
 * the keys can only be used when browser focus is on the element to which
 * the keyboard events are attached. By default, this is the map div,
 * though you can change this with the `keyboardEventTarget` in
 * {@link module:ol/Map~Map}. `document` never loses focus but, for any other
 * element, focus will have to be on, and returned to, this element if the keys
 * are to function.
 * See also {@link module:ol/interaction/KeyboardPan~KeyboardPan}.
 * @api
 */
declare class KeyboardZoom extends Interaction {
    /**
     * @param {Options} [options] Options.
     */
    constructor(options?: Options);
    /**
     * @private
     * @type {import("../events/condition.js").Condition}
     */
    private condition_;
    /**
     * @private
     * @type {number}
     */
    private delta_;
    /**
     * @private
     * @type {number}
     */
    private duration_;
}
import Interaction from './Interaction.js';
//# sourceMappingURL=KeyboardZoom.d.ts.map