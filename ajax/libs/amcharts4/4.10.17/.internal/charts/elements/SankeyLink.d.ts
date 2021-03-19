/**
 * SankeyLink module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { SankeyDiagramDataItem, SankeyDiagram } from "../types/SankeyDiagram";
import { FlowDiagramLink, IFlowDiagramLinkAdapters, IFlowDiagramLinkEvents, IFlowDiagramLinkProperties } from "./FlowDiagramLink";
import { Polyspline } from "../../core/elements/Polyspline";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[SankeyLink]].
 */
export interface ISankeyLinkProperties extends IFlowDiagramLinkProperties {
    /**
     * [tension description]
     *
     * @todo Description
     */
    tension?: number;
    /**
     * [startX description]
     *
     * @todo Description
     */
    startX?: number;
    /**
     * [startY description]
     *
     * @todo Description
     */
    startY?: number;
    /**
     * [endX description]
     *
     * @todo Description
     */
    endX?: number;
    /**
     * [endY description]
     *
     * @todo Description
     */
    endY?: number;
    /**
     * [linkWidth description]
     *
     * @todo Description
     */
    linkWidth?: number;
    /**
     * [controlPointDistance description]
     *
     * @todo Description
     */
    controlPointDistance?: number;
}
/**
 * Defines events for [[SankeyLink]].
 */
export interface ISankeyLinkEvents extends IFlowDiagramLinkEvents {
}
/**
 * Defines adapters for [[SankeyLink]].
 *
 * @see {@link Adapter}
 */
export interface ISankeyLinkAdapters extends IFlowDiagramLinkAdapters, ISankeyLinkProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class creates a link (waved color-filled line) between two nodes in a
 * Sankey Diagram.
 *
 * @see {@link ISankeyLinkEvents} for a list of available events
 * @see {@link ISankeyLinkAdapters} for a list of available Adapters
 * @important
 */
export declare class SankeyLink extends FlowDiagramLink {
    /**
     * Defines available properties.
     */
    _properties: ISankeyLinkProperties;
    /**
     * Defines available adapters.
     */
    _adapter: ISankeyLinkAdapters;
    /**
     * Defines available events.
     */
    _events: ISankeyLinkEvents;
    /**
     * Defines a type of data item used by this class.
     */
    _dataItem: SankeyDiagramDataItem;
    /**
     * Spline which goes through the middle of a link, used to calculate bullet and tooltip positions, invisible by default
     */
    middleLine: Polyspline;
    chart: SankeyDiagram;
    /**
     * Constructor
     */
    constructor();
    protected makeBackwards(): void;
    /**
     * (Re)validates (redraws) the link.
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * [startX description]
     *
     * @todo Description
     * @param value  Start X
     */
    /**
    * @return Start X
    */
    startX: number;
    /**
     * [endX description]
     *
     * @todo Description
     * @param value  End X
     */
    /**
    * @return End X
    */
    endX: number;
    /**
     * [startY description]
     *
     * @todo Description
     * @param value  Start Y
     */
    /**
    * @return Start Y
    */
    startY: number;
    /**
     * [endY description]
     *
     * @todo Description
     * @param value End Y
     */
    /**
    * @return End Y
    */
    endY: number;
    /**
     * [linkWidth description]
     *
     * @todo Description
     * @param value [description]
     */
    /**
    * @return [description]
    */
    linkWidth: number;
    /**
     * Distance of control point of a link, defines relative distance from a node at which linke should bend
     * @default 0.2
     * @param value
     */
    /**
    * @return relative control point distance
    */
    controlPointDistance: number;
    /**
     * Tension of a spline, 1 would make the link to have sharp edges
     * @default 0.8
     * @param value
     */
    /**
    * @return tension value
    */
    tension: number;
}
