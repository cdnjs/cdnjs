/**
 * ForceDirectedLink module.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite, ISpriteProperties, ISpriteAdapters, ISpriteEvents } from "../../core/Sprite";
import { ForceDirectedNode } from "./ForceDirectedNode";
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines properties for [[ForceDirectedLink]].
 */
export interface IForceDirectedLinkProperties extends ISpriteProperties {
    /**
     * Distance between centers of source and target nodes.
     */
    distance?: number;
    /**
     * Strength of the "traction" between source and target nodes.
     */
    strength?: number;
}
/**
 * Defines events for [[ForceDirectedLink]].
 */
export interface IForceDirectedLinkEvents extends ISpriteEvents {
}
/**
 * Defines adapters for [[ForceDirectedLink]].
 *
 * @see {@link Adapter}
 */
export interface IForceDirectedLinkAdapters extends ISpriteAdapters, IForceDirectedLinkProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * A class that builds links between [[ForceDirectedNode]] elements.
 *
 * @see {@link IForceDirectedLinkEvents} for a list of available events
 * @see {@link IForceDirectedLinkAdapters} for a list of available Adapters
 * @since 4.3.8
 * @important
 */
export declare class ForceDirectedLink extends Sprite {
    /**
     * Defines available properties.
     */
    _properties: IForceDirectedLinkProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IForceDirectedLinkAdapters;
    /**
     * Defines available events.
     */
    _events: IForceDirectedLinkEvents;
    /**
     * Link source node
     */
    protected _source: ForceDirectedNode;
    /**
     * Link parent node
     */
    protected _target: ForceDirectedNode;
    /**
     * Constructor
     */
    constructor();
    /**
     * Validates element:
     * * Triggers events
     * * Redraws the element
     *
     * @ignore Exclude from docs
     */
    validate(): void;
    /**
     * Source node - a node link starts from.
     *
     * @param  value  Source node
     */
    /**
    * @return Source node
    */
    source: ForceDirectedNode;
    /**
     * Target node - a node link ends at.
     *
     * @param  value  Target node
     */
    /**
    * @return Target node
    */
    target: ForceDirectedNode;
    /**
     * Distance between centers of source and target nodes.
     *
     * This is relative to the radii to sum of both source and target nodes.
     *
     * E.g. if this would be set to `1` both nodes would be touching each other.
     *
     * @default 1.5
     * @param  value  Distance
     */
    /**
    * @return Distance
    */
    distance: number;
    /**
     * Relative "strength" of the traction between linked nodes.
     *
     * Available values: 0 to XX.
     *
     * The bigger the number, the more rigid the link and the less it will
     * stretch when node is dragged.
     *
     * Carefully with very big numbers: nodes and links might start behaving
     * quite "nerviously".
     *
     * @default 1
     * @param  value  Strength
     */
    /**
    * @return Strength
    */
    strength: number;
    /**
     * X coordinate for the slice tooltip.
     *
     * @ignore
     * @return X
     */
    getTooltipX(): number;
    /**
     * Y coordinate for the slice tooltip.
     *
     * @ignore
     * @return Y
     */
    getTooltipY(): number;
}
