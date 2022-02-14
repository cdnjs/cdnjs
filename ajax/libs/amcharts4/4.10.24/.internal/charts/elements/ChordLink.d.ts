/**
 * ChordLink module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { ChordDiagramDataItem } from "../types/ChordDiagram";
import { FlowDiagramLink, IFlowDiagramLinkAdapters, IFlowDiagramLinkEvents, IFlowDiagramLinkProperties } from "./FlowDiagramLink";
import { QuadraticCurve } from "../../core/elements/QuadraticCurve";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ChordLink]].
 */
export interface IChordLinkProperties extends IFlowDiagramLinkProperties {
    /**
     * [radius description]
     *
     * @todo Description
     */
    radius?: number;
    /**
     * [arc description]
     *
     * @todo Description
     */
    arc?: number;
}
/**
 * Defines events for [[ChordLink]].
 */
export interface IChordLinkEvents extends IFlowDiagramLinkEvents {
}
/**
 * Defines adapters for [[ChordLink]].
 *
 * @see {@link Adapter}
 */
export interface IChordLinkAdapters extends IFlowDiagramLinkAdapters, IChordLinkProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class creates a link (waved color-filled line) between two nodes in a
 * Chord Diagram.
 *
 * @see {@link IChordLinkEvents} for a list of available events
 * @see {@link IChordLinkAdapters} for a list of available Adapters
 * @important
 */
export declare class ChordLink extends FlowDiagramLink {
    /**
     * Defines available properties.
     */
    _properties: IChordLinkProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IChordLinkAdapters;
    /**
     * Defines available events.
     */
    _events: IChordLinkEvents;
    /**
     * Defines a type of data item used by this class.
     */
    _dataItem: ChordDiagramDataItem;
    /**
     * Spline which goes through the middle of a link, used to calculate bullet and tooltip positions, invisible by default
     */
    middleLine: QuadraticCurve;
    /**
     * Constructor
     */
    constructor();
    /**
     * (Re)validates (redraws) the link.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * [radius description]
     *
     * @todo Description
     * @param value End Y
     */
    /**
    * @return End Y
    */
    radius: number;
    /**
     * [arc description]
     *
     * @todo Description
     * @param value [description]
     */
    /**
    * @return [description]
    */
    arc: number;
}
