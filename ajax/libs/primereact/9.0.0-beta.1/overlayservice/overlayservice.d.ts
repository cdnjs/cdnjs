/**
 *
 * OverlayService allows all overlay components to communicate with each other.
 *
 * [Live Demo](https://www.primefaces.org/primereact/dropdown/)
 *
 * @module overlayservice
 *
 */
import * as React from 'react';

/**
 * Overlay service event.
 */
export interface OverlayServiceEvent {
    /**
     * Original event that triggered the overlay.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Target element that the overlay is bound to.
     */
    target: HTMLElement;
}

/**
 * @group Misc
 */
export interface OverlayServiceOptions {
    /**
     * Add event listener for overlay click.
     * @param {string} action - Custom listener.
     * @param {*} fn - Custom listener.
     */
    on(action: 'overlay-click', fn: any): void;
    /**
     * Trigger overlay click event.
     * @param {string} action - Custom listener.
     * @param {*} params - Custom listener.
     */
    emit(action: 'overlay-click', params?: OverlayServiceEvent): void;
    /**
     * Remove event listener for overlay click.
     * @param {string} action - Custom listener.
     * @param {*} fn - Custom listener.
     */
    off(action: 'overlay-click', fn: any): void;
}

/**
 * **PrimeReact - OverlayService**
 *
 * _OverlayService allows all overlay components to communicate with each other._
 *
 * [Live Demo](https://www.primefaces.org/primereact/dropdown/)
 * --- ---
 * ![PrimeReact](https://www.primefaces.org/primereact/images/logo-100.png)
 *
 * @group Service
 */
export declare const OverlayService: OverlayServiceOptions;
