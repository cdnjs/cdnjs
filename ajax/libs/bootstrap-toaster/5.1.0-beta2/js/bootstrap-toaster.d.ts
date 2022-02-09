/**
 * Copyright (c) 2021 Peyton Gasink
 * Distributed under MIT License.
 *
 * This file contains all the necessary scripting to programmatically
 * generate Bootstrap toasts. It first inserts a container at the bottom
 * of the DOM, then fills a toast template and inserts it into the container.
 *
 * Configuration options are also provided for toast placement, light & dark themes,
 * and the maximum number of toasts allowed on the page at a given time.
 */
/** Container that generated toasts will be inserted into. */
declare const TOAST_CONTAINER: HTMLDivElement;
/** HTML markup for the toast template. */
declare const TOAST_TEMPLATE: HTMLDivElement;
/** Defines the valid status options for toasts. */
declare enum TOAST_STATUS {
    SUCCESS = 1,
    DANGER = 2,
    WARNING = 3,
    INFO = 4
}
/** Defines the valid placement options for the toast container. */
declare enum TOAST_PLACEMENT {
    TOP_LEFT = 1,
    TOP_CENTER = 2,
    TOP_RIGHT = 3,
    MIDDLE_LEFT = 4,
    MIDDLE_CENTER = 5,
    MIDDLE_RIGHT = 6,
    BOTTOM_LEFT = 7,
    BOTTOM_CENTER = 8,
    BOTTOM_RIGHT = 9
}
/** Defines the valid options for toast themes. */
declare enum TOAST_THEME {
    LIGHT = 1,
    DARK = 2
}
/** Maximum amount of toasts to be allowed on the page at once. */
declare var maxToastCount: number;
/** Controls whether to queue toasts that exceed the maximum toast count. */
declare var enableQueue: boolean;
/** Number of toasts currently rendered on the page. */
declare var currentToastCount: number;
/** Controls whether elapsed time will be displayed in the toast header. */
declare var enableTimers: boolean;
interface IToast {
    toast: HTMLElement;
    timeout: number;
}
interface IToastOptions {
    title: string;
    message: string;
    status?: TOAST_STATUS;
    timeout?: number;
}
interface IConfiguration {
    maxToasts?: number;
    placement?: TOAST_PLACEMENT;
    theme?: TOAST_THEME;
    enableTimers?: boolean;
    enableQueue?: boolean;
}
declare class Toast {
    private static queue;
    /**
     * Shorthand function for quickly setting multiple global toast configurations.
     * @param {IConfiguration} options Object containing all the desired toast options.
     */
    static configure(options: IConfiguration): void;
    /**
     * Sets the maximum number of toasts allowed on the page at once.
     * @param {number} maxToasts Maximum number of toasts allowed on the page at once.
     */
    static setMaxCount(maxToasts: number): void;
    /**
     * Sets the toast container's placement.
     * @param {TOAST_PLACEMENT} placement Placement of the toast container.
     */
    static setPlacement(placement: TOAST_PLACEMENT): void;
    /**
     * Sets the toasts' theme to light or dark. If unset, they will follow OS light/dark preference.
     * @param {TOAST_THEME} theme The toast theme. Options are TOAST_THEME.LIGHT and TOAST_THEME.DARK.
     */
    static setTheme(theme?: TOAST_THEME): void;
    /**
     * Enables or disables toasts displaying elapsed time since appearing in the header.
     * Timers are enabled by default.
     * @param {boolean} enabled Controls whether elapsed time will be displayed in the toast header.
     */
    static enableTimers(enabled?: boolean): void;
    /**
     * Enables or disables toasts queueing after the maximum toast count is reached.
     * Queuing is enabled by default.
     * @param {boolean} enabled Controls whether queue is enabled.
     */
    static enableQueue(enabled?: boolean): void;
    /**
     * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
     * run timers for each's elapsed time since appearing, and remove them from the
     * DOM after they are hidden. Caps toast count at maxToastCount.
     * @param {IToastOptions} toastOptions Object containing all the desired toast options.
     */
    static create(toastOptions: IToastOptions): void;
    /**
     * Sets the status icon and modifies ARIA properties if the context necessitates it
     * @param {HTMLElement} toastEl The HTML of the toast being modified.
     * @param {TOAST_STATUS} status The integer value representing the toast's status.
     */
    private static setStatus;
    /**
     * Inserts toast HTML onto page and sets up for toast deletion.
     * @param {IToast} toastInfo The toast object to be rendered.
     */
    private static render;
}
//# sourceMappingURL=bootstrap-toaster.d.ts.map