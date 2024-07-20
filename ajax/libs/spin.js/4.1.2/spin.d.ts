import { SpinnerOptions } from './SpinnerOptions.js';
export { SpinnerOptions } from './SpinnerOptions.js';
export declare class Spinner {
    private opts;
    /**
     * The Spinner's HTML element - can be used to manually insert the spinner into the DOM
     */
    el: HTMLElement | undefined;
    constructor(opts?: SpinnerOptions);
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target by calling
     * stop() internally.
     */
    spin(target?: HTMLElement): this;
    /**
     * Stops and removes the Spinner.
     * Stopped spinners may be reused by calling spin() again.
     */
    stop(): this;
}
