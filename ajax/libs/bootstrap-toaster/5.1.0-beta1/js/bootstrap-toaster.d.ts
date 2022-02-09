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
/** Defines the valid status options for toasts. */
export declare enum TOAST_STATUS {
    SUCCESS = 1,
    DANGER = 2,
    WARNING = 3,
    INFO = 4
}
/** Defines the valid placement options for the toast container. */
export declare enum TOAST_PLACEMENT {
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
export declare enum TOAST_THEME {
    LIGHT = 1,
    DARK = 2
}
export declare class Toast {
    /**
     * Shorthand function for quickly setting multiple global toast configurations.
     * @param {number} maxToasts The maximum number of toasts allowed on the page at once.
     * @param {number} placement The toast container's placement on-screen, defaults to top right. This will not affect small screens in portrait.
     * @param {number} theme The toasts' theme, either light or dark. If unset, they will follow OS light/dark preference.
     * @param {boolean} enableTimers Controls whether elapsed time will be displayed in the toast header.
     */
    static configure(maxToasts?: number, placement?: number, theme?: number, enableTimers?: boolean): void;
    /**
     * Sets the maximum number of toasts allowed on the page at once.
     * @param {number} maxToasts Maximum number of toasts allowed on the page at once.
     */
    static setMaxCount(maxToasts: number): void;
    /**
     * Sets the toast container's placement.
     * @param {number} placement Placement of the toast container.
     */
    static setPlacement(placement: number): void;
    /**
     * Sets the toasts' theme to light or dark. If unset, they will follow OS light/dark preference.
     * @param {number} theme The toast theme. Options are TOAST_THEME.LIGHT and TOAST_THEME.DARK.
     */
    static setTheme(theme?: number): void;
    /**
     * Enables or disables toasts displaying elapsed time since appearing in the header.
     * Timers are enabled by default.
     * @param {boolean} enabled Controls whether elapsed time will be displayed in the toast header.
     */
    static enableTimers(enabled?: boolean): void;
    /**
     * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
     * run timers for each's elapsed time since appearing, and remove them from the
     * DOM after they are hidden. Caps toast count at maxToastCount.
     * @param {string} title The text of the toast's header.
     * @param {string} message The text of the toast's body.
     * @param {number} status The status/urgency of the toast. Affects status icon and ARIA accessibility features. Defaults to 0, which renders no icon.
     * @param {number} timeout Time in ms until toast disappears automatically. Defaults to 0, which is indefinite.
     */
    static create(title: string, message: string, status?: number, timeout?: number): void;
    /**
     * Sets the status icon and modifies ARIA properties if the context necessitates it
     * @param {Node} toast The HTML of the toast being modified.
     * @param {number} status The integer value representing the toast's status.
     */
    private static setStatus;
    /**
     * Inserts toast HTML onto page and sets up for toast deletion.
     * @param {Node} toast The HTML of the toast being modified.
     * @param {number} timeout Time in ms until toast disappears automatically. Indefinite if zero.
     */
    private static render;
}
//# sourceMappingURL=bootstrap-toaster.d.ts.map