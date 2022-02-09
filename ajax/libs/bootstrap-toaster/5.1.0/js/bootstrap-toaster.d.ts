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
/** Defines the valid options for toast header timers. */
declare enum TOAST_TIMERS {
    DISABLED = 0,
    ELAPSED = 1,
    COUNTDOWN = 2
}
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
    enableTimers?: TOAST_TIMERS;
    enableQueue?: boolean;
}
declare class Toast {
    /** Maximum amount of toasts to be allowed on the page at once. */
    private static maxToastCount;
    /** Number of toasts currently rendered on the page. */
    private static currentToastCount;
    /** Controls whether toasts will have elapsed or countdown timers. */
    private static timersEnabled;
    /** Controls whether to queue toasts that exceed the maximum toast count. */
    private static queueEnabled;
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
     * @param {TOAST_THEME} theme The toast theme.
     */
    static setTheme(theme?: TOAST_THEME): void;
    /**
     * Sets whether timers in the toast header will display elapsed time or a countdown.
     * Timers display elapsed time by default.
     * @param type The timer type.
     */
    static enableTimers(type: TOAST_TIMERS): void;
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
    /**
     * Handles the rendering of the timer in the toast header.
     * @param toastInfo The toast object to be rendered.
     */
    private static renderTimer;
    /**
     * @deprecated This will be removed in a future version. Migrate to the new configure method.
     *
     * Shorthand function for quickly setting multiple global toast configurations.
     * @param {number} maxToasts The maximum number of toasts allowed on the page at once.
     * @param {number} placement The toast container's placement on-screen, defaults to top right. This will not affect small screens in portrait.
     * @param {number} theme The toasts' theme, either light or dark. If unset, they will follow OS light/dark preference.
     * @param {boolean} enableTimers Controls whether elapsed time will be displayed in the toast header.
     */
    static oldConfigure(maxToasts?: number, placement?: number, theme?: number, enableTimers?: boolean): void;
    /**
     * @deprecated This will be removed in a future version. Migrate to the new create method.
     *
     * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
     * run timers for each's elapsed time since appearing, and remove them from the
     * DOM after they are hidden. Caps toast count at maxToastCount.
     * @param {string} title The text of the toast's header.
     * @param {string} message The text of the toast's body.
     * @param {TOAST_STATUS} status The status/urgency of the toast. Affects status icon and ARIA accessibility features. Defaults to 0, which renders no icon.
     * @param {number} timeout Time in ms until toast disappears automatically. Defaults to 0, which is indefinite.
     */
    static oldCreate(title: string, message: string, status?: TOAST_STATUS, timeout?: number): void;
    /**
     * @deprecated This will be removed in a future version. Migrate to the new enableTimers method.
     *
     * Enables or disables toasts displaying elapsed time since appearing in the header.
     * Timers are enabled by default.
     * @param {boolean} enabled Controls whether elapsed time will be displayed in the toast header.
     */
    static oldEnableTimers(enabled: boolean): void;
}
//# sourceMappingURL=bootstrap-toaster.d.ts.map