/// <reference types="lodash" />
/**
 * @returns {HTMLElement} - either dashboard element, or the overlay that's most on top
 */
export declare function getActiveOverlayEl(dashboardEl: HTMLElement, activeOverlayType: string): Element;
export declare function createSuperFocus(): import("lodash").DebouncedFunc<(dashboardEl: HTMLElement, activeOverlayType: string) => void>;
