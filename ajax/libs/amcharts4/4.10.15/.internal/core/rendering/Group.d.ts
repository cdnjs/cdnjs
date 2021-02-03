/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AMElement } from "./AMElement";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates an SVG `<g>` element.
 *
 * SVG groups are used for elements that need more elements just one.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g} About `<g>` element
 */
export declare class Group extends AMElement {
    /**
     * Constructor.
     *
     * @param elementName Element type (should be "g")
     */
    constructor(elementName: string);
    /**
     * Adds an element to group.
     *
     * This will manipulate DOM. `element` will be physically moved into group.
     *
     * @param element  Element
     */
    add(element: AMElement): void;
    /**
     * Adds an element to group.
     *
     * This will manipulate DOM. `element` will be physically moved into group.
     *
     * @param element  Element
     */
    addToBack(element: AMElement): void;
    /**
     * Removes the `element` from group.
     *
     * Please note that this will not dispose the element itself, it will just
     * remove it from the group.
     *
     * @param element  Element
     */
    removeElement(element: AMElement): void;
    /**
     * Checks if this group already has the child element added
     *
     * @param element
     * @return {boolean}
     */
    hasChild(element: AMElement): boolean;
    /**
     * Content of the group element.
     *
     * Can be used to add a lot of proprietary SVG markup into group.
     *
     * @param value  SVG markup
     */
    /**
    * @return SVG markup
    */
    content: string;
    /**
     * Removes all children from the group.
     */
    removeChildren(): void;
}
