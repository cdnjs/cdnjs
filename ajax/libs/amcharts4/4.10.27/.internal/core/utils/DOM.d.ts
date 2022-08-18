/**
 * A collection of DOM-related functions.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Disposer, IDisposer } from "./Disposer";
import * as $type from "./Type";
/**
 * SVG namespace.
 *
 * @ignore Exclude from docs
 */
export declare const SVGNS: string;
/**
 * XML namespace.
 *
 * @ignore Exclude from docs
 */
export declare const XMLNS: string;
/**
 * XLINK namespace.
 *
 * @ignore Exclude from docs
 */
export declare const XLINK: string;
/**
 * Function that adds a disposable event listener directly to a DOM element.
 *
 * @ignore Exclude from docs
 * @param dom       A DOM element to add event to
 * @param type      Event type
 * @param listener  Event listener
 * @returns Disposable event
 */
export declare function addEventListener<E extends Event>(dom: EventTarget, type: string, listener: (event: E) => void, options?: any): IDisposer;
/**
 * Finds and returns an element reference using following logic:
 * * If we pass in an element instance, we just return it back.
 * * If we pass in a string, the function looks for an element with such id.
 * * If no element with such id is found, we grab the first element with a tag name like this.
 *
 * @ignore Exclude from docs
 * @param el  Element definition (reference, or id, or tag name)
 * @return Element reference
 * @todo Review this function as it seems pretty fuzzy and hacky
 */
export declare function getElement(el: $type.Optional<HTMLElement | string>): $type.Optional<HTMLElement>;
/**
 * Adds a class name to an HTML or SVG element.
 *
 * @ignore Exclude from docs
 * @param element    Element
 * @param className  Class name to add
 */
export declare function addClass(element: HTMLElement | SVGSVGElement, className: string): void;
/**
 * Removes a class name from an HTML or SVG element.
 *
 * @ignore Exclude from docs
 * @param element    Element
 * @param className  Class name to add
 */
export declare function removeClass(element: HTMLElement | SVGSVGElement, className: string): void;
/**
 * Sets style property on DOM element.
 *
 * @ignore Exclude from docs
 * @todo Still needed?
 */
export declare function setStyle(element: HTMLElement | SVGSVGElement, property: string, value: string): void;
/**
 * Gets the computed style value for an element.
 *
 * @ignore Exclude from docs
 */
export declare function getComputedStyle(element: Element, property: string): string | number;
/**
 * Removes focus from any element by shifting focus to body.
 *
 * @ignore Exclude from docs
 */
export declare function blur(): void;
/**
 * Tries to focus the element.
 *
 * @ignore Exlude from docs
 * @param element  Element to focus
 */
export declare function focus(element: HTMLElement | SVGSVGElement): void;
/**
 * Returns markup for the element including the element tag itself.
 * SVG elements do not support `outerHTML` so this functions applies of
 * a workaround which creates a new temporary wrapper, clones element and uses
 * wrapper's `innerHTML`.
 *
 * @ignore Exclude from docs
 * @param element  Element to get full markup for
 * @return Markup
 * @deprecated Not in use anywhere
 */
export declare function outerHTML(element: HTMLElement | SVGSVGElement): string;
/**
 * Checks if element is a valid DOM node.
 *
 * @ignore Exclude from docs
 * @param el  Element
 * @return `true` if element is a valid DOM node
 */
export declare function isElement(el: HTMLElement): boolean;
/**
 * Checks of element `a` contains element `b`.
 *
 * @param a  Aleged ascendant
 * @param b  Aleged descendant
 * @return Contains?
 */
export declare function contains(a: HTMLElement | SVGSVGElement, b: HTMLElement | SVGSVGElement): boolean;
/**
 * Returns the shadow root of the element or null
 *
 * @param a  Node
 * @return Root
 */
export declare function getShadowRoot(a: Node): ShadowRoot | null;
/**
 * Returns the root of the element (either the Document or the ShadowRoot)
 *
 * @param a  Node
 * @return Root
 */
export declare function getRoot(a: Node): Document | ShadowRoot | null;
/**
 * Gets the true target of the Event.
 *
 * This is needed to make events work with the shadow DOM.
 *
 * @param event  Event
 * @return EventTarget
 */
export declare function eventTarget(event: Event): EventTarget;
/**
 * Copies attributes from one element to another.
 *
 * @ignore Exclude from docs
 * @param source  Element to copy attributes from
 * @param target  Element to copy attributes to
 */
export declare function copyAttributes(source: Element | HTMLElement | SVGSVGElement, target: HTMLElement | SVGSVGElement): void;
/**
 * [fixPixelPerfect description]
 *
 * @ignore Exclude from docs
 * @todo Description
 * @param el  Element
 */
export declare function fixPixelPerfect(el: HTMLElement): void;
/**
 * Defines a class for a CSS rule.
 *
 * Can be used to dynamically add CSS to the document.
 */
export declare class StyleRule extends Disposer {
    /**
     * CSS rule.
     */
    private _rule;
    /**
     * A CSS selector text.
     *
     * E.g.: `.myClass p`
     *
     * @param selector  CSS selector
     */
    /**
    * @return CSS selector
    */
    selector: string;
    /**
     * Constructor.
     *
     * @param selector  CSS selector
     * @param styles    An object of style attribute - value pairs
     */
    constructor(element: ShadowRoot | null, selector: string, styles: {
        [name: string]: string;
    });
    /**
     * Sets the same style properties with browser-specific prefixes.
     *
     * @param name   Attribute name
     * @param value  Attribute value
     */
    private _setVendorPrefixName;
    /**
     * Sets a value for specific style attribute.
     *
     * @param name   Attribute
     * @param value  Value
     */
    setStyle(name: string, value: string): void;
}
/**
 * @ignore Exclude from docs
 * @todo Description
 */
export declare class StyleClass extends StyleRule {
    /**
     * Class name.
     */
    private _className;
    /**
     * Constructor.
     *
     * @param styles  An object of style attribute - value pairs
     * @param name    Class name
     */
    constructor(element: ShadowRoot | null, styles: {
        [name: string]: string;
    }, name?: string);
    /**
     * Class name.
     *
     * @param name  Class name
     */
    /**
    * @return Class name
    */
    className: string;
    /**
     * Converts the whole class to
     * @ignore Exclude from docs
     */
    toString(): string;
}
export declare function ready(f: () => void): void;
/**
 * Returns a font fmaily name for the element (directly set or
 * computed/inherited).
 *
 * @ignore Exclude from docs
 * @param element  Element
 * @return Font family
 */
export declare function findFont(element: Element): string;
/**
 * Returns a font fmaily name for the element (directly set or
 * computed/inherited).
 *
 * @ignore Exclude from docs
 * @param element  Element
 * @return Font family
 */
export declare function findFontSize(element: Element): string;
/**
 * Checks whether element is not visible, whether directly or via its
 * ascendants.
 *
 * @param   element  Target element
 * @return           Hidden?
 */
export declare function isHidden(element: HTMLElement): boolean;
/**
 * Checks wthether element is in the current viewport.
 *
 * @since 2.5.5
 * @param   el Element
 * @return     Within viewport?
 */
export declare function isElementInViewport(el: HTMLElement, viewportTarget?: HTMLElement | HTMLElement[]): boolean;
