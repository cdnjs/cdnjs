/**
 * FlowDiagramLink module
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "../../core/Sprite";
import { Container, IContainerProperties, IContainerEvents, IContainerAdapters } from "../../core/Container";
import { FlowDiagramDataItem } from "../types/FlowDiagram";
import { LinearGradient } from "../../core/rendering/fills/LinearGradient";
import { RadialGradient } from "../../core/rendering/fills/RadialGradient";
import { Pattern } from "../../core/rendering/fills/Pattern";
import { Bullet } from "../elements/Bullet";
import { Color } from "../../core/utils/Color";
import { ListTemplate } from "../../core/utils/List";
import { Polyline } from "../../core/elements/Polyline";
import { Line } from "../../core/elements/Line";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[FlowDiagramLink]].
 */
export interface IFlowDiagramLinkProperties extends IContainerProperties {
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
     * [startAngle description]
     *
     * @todo Description
     */
    startAngle?: number;
    /**
     * [endAngle description]
     *
     * @todo Description
     */
    endAngle?: number;
    /**
     * Should link be filled with a solid color, color of from node, color of toNode or gradient between node colors.
     */
    colorMode?: "solid" | "gradient" | "fromNode" | "toNode";
    /**
     * [controlPointDistance description]
     *
     * @todo Description
     */
    controlPointDistance?: number;
    /**
     * [maskBullets description]
     *
     * @todo Description
     */
    maskBullets?: boolean;
    /**
     * [tooltipLocation description]
     *
     * @todo Description
     */
    tooltipLocation?: number;
}
/**
 * Defines events for [[FlowDiagramLink]].
 */
export interface IFlowDiagramLinkEvents extends IContainerEvents {
}
/**
 * Defines adapters for [[FlowDiagramLink]].
 *
 * @see {@link Adapter}
 */
export interface IFlowDiagramLinkAdapters extends IContainerAdapters, IFlowDiagramLinkProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * This class creates a link (waved color-filled line) between two nodes in a
 * Flow Diagram.
 *
 * @see {@link IFlowDiagramLinkEvents} for a list of available events
 * @see {@link IFlowDiagramLinkAdapters} for a list of available Adapters
 * @important
 */
export declare class FlowDiagramLink extends Container {
    /**
     * Defines available properties.
     */
    _properties: IFlowDiagramLinkProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IFlowDiagramLinkAdapters;
    /**
     * Defines available events.
     */
    _events: IFlowDiagramLinkEvents;
    /**
     * Defines a type of data item used by this class.
     */
    _dataItem: FlowDiagramDataItem;
    /**
     * A gradiend instance that is used to provided colored gradient fills for
     * the Flow link.
     */
    protected _gradient: LinearGradient;
    /**
     * List of bullets
     * @ignore
     */
    protected _bullets: ListTemplate<Bullet>;
    /**
     * Link sprite
     */
    link: Sprite;
    /**
     * Bullets mask spite
     */
    protected _bulletsMask: Sprite;
    /**
     * Bullets container
     */
    protected _bulletsContainer: Container;
    /**
     * Spline which goes through the middle of a link, used to calculate bullet and tooltip positions, invisible by default
     */
    middleLine: Line | Polyline;
    /**
     * Constructor
     */
    constructor();
    /**
     * Positions bullets
     * @ignore
     */
    protected positionBullets(): void;
    /**
     * Bullets container
     */
    readonly bulletsContainer: Container;
    /**
     * Bullets mask sprite
     */
    readonly bulletsMask: Sprite;
    /**
     * Positions bullets at relative bullet.locationX position on the link.
     * @ignore
     */
    protected positionBullet(bullet: Bullet): void;
    /**
     * [startAngle description]
     *
     * @todo Description
     * @param value  Start angle
     */
    /**
    * @return Start angle
    */
    startAngle: number;
    /**
     * [endAngle description]
     *
     * @todo Description
     * @param value  End angle
     */
    /**
    * @return End angle
    */
    endAngle: number;
    /**
     * Should link be filled with a solid color, color of from node, color of toNode or gradient between node colors.
     * Some of the links, like ChordLink does not support gradiens well.
     *
     * @param value  Fill mode
     */
    /**
    * Fill mode
    */
    colorMode: "solid" | "gradient" | "fromNode" | "toNode";
    /**
     * Should link bullets be masked or not
     *
     * @param value
     * @default false
     */
    /**
    * @return mask bullets value
    */
    maskBullets: boolean;
    /**
     * Relative location of a tooltip.
     * @default 0.5
     *
     * @param value
     */
    /**
    * Tooltip location value
    */
    tooltipLocation: number;
    /**
     * Adds color steps in the link gradient.
     *
     * @param value  Fill option
     */
    protected setFill(value: Color | Pattern | LinearGradient | RadialGradient): void;
    /**
     * Updates bounding box based on element dimension settings.
     *
     * @ignore Exclude from docs
     */
    measureElement(): void;
    /**
     * List of bullets
     *
     * @return [description]
     */
    readonly bullets: ListTemplate<Bullet>;
    /**
     * Copies properties from another [[FlowDiagramLink]].
     *
     * @param source  Source link
     */
    copyFrom(source: this): void;
    /**
     * @ignore Exclude from docs
     * @return Tooltip X (px)
     */
    getTooltipX(): number;
    /**
     * @ignore Exclude from docs
     * @return Tooltip Y (px)
     */
    getTooltipY(): number;
    /**
     * A gradiend instance that is used to provided colored gradient fills for
     * the Flow link.
     */
    readonly gradient: LinearGradient;
}
