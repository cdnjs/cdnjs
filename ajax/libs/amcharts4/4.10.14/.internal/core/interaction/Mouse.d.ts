/**
 * Mouse-related functionality
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { IStyleProperty } from "../defs/IStyleProperty";
/**
 * Defines static methods that hold style list for various mouse cursor styles,
 * maintaining browser compatibility.
 */
export declare class MouseCursorStyle {
    /**
     * Styles for "grab" mouse cursor.
     */
    static grab: Array<IStyleProperty>;
    /**
     * Styles for "grabbing" mouse cursor.
     */
    static grabbing: Array<IStyleProperty>;
    /**
     * Styles for "pointer" mouse cursor. (usually used for links)
     */
    static pointer: Array<IStyleProperty>;
    /**
     * Styles for default mouse cursor. (browser determines style)
     */
    static default: Array<IStyleProperty>;
    /**
     * Styles for horizontal bi-directional resize mouse cursor.
     */
    static horizontalResize: Array<IStyleProperty>;
    /**
     * Styles for vertical bi-directional mouse cursor.
     */
    static verticalResize: Array<IStyleProperty>;
    /**
     * Styles for "no-allowed" cursor.
     * @since 4.7.15
     */
    static notAllowed: Array<IStyleProperty>;
    /**
     * Styles for "text" cursor.
     * @since 4.9.12
     */
    static text: Array<IStyleProperty>;
}
