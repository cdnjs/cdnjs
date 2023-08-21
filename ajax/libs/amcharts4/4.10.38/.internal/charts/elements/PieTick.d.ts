/**
 * Pie tick module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Tick, ITickProperties, ITickAdapters, ITickEvents } from "../elements/Tick";
import { AxisLabelCircular } from "../axes/AxisLabelCircular";
import { Slice } from "../../core/elements/Slice";
import { MutableValueDisposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[PieTick]].
 */
export interface IPieTickProperties extends ITickProperties {
}
/**
 * Defines events for [[PieTick]].
 */
export interface IPieTickEvents extends ITickEvents {
}
/**
 * Defines adapters for [[PieTick]].
 *
 * @see {@link Adapter}
 */
export interface IPieTickAdapters extends ITickAdapters, IPieTickProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Draws an tick line for a pie slice connecting it to a related label.
 *
 * @see {@link IPieTickEvents} for a list of available events
 * @see {@link IPieTickAdapters} for a list of available Adapters
 */
export declare class PieTick extends Tick {
    /**
     * Defines available properties.
     */
    _properties: IPieTickProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IPieTickAdapters;
    /**
     * Defines available events.
     */
    _events: IPieTickEvents;
    /**
     * A label element this tick is attached to.
     */
    protected _label: MutableValueDisposer<AxisLabelCircular>;
    /**
     * A slice element this tick is attached to.
     */
    protected _slice: MutableValueDisposer<Slice>;
    /**
     * Constructor
     */
    constructor();
    /**
     * Draws the tick element.
     *
     * @ignore Exclude from docs
     */
    draw(): void;
    /**
     * Slice element tick is attached to.
     *
     * @param slice  Slice
     */
    /**
    * @return Slice
    */
    slice: Slice;
    /**
     * Label element tick is attached to.
     *
     * @param label  Label
     */
    /**
    * @return Label
    */
    label: AxisLabelCircular;
}
