/**
 * Modal class is used to display information over chart area.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Popup, IPopupAdapters } from "./Popup";
import { Adapter } from "../utils/Adapter";
/**
 * Represents a list of available adapters for Export.
 */
export interface IModalAdapters extends IPopupAdapters {
}
/**
 * Shows an HTML modal which covers window or a chart area.
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/popups-and-modals/} For examples and docs on Popups and Modals.
 */
export declare class Modal extends Popup {
    /**
     * Defines available adapters.
     */
    _adapter: IModalAdapters;
    /**
     * Adapter.
     */
    adapter: Adapter<Modal, IModalAdapters>;
    /**
     * Constructor
     */
    constructor();
}
