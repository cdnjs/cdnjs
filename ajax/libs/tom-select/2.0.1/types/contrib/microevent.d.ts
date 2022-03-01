/**
 * MicroEvent - to make any js object an event emitter
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * @author Jerome Etienne (https://github.com/jeromeetienne)
 */
declare type TCallback = (...args: any) => any;
export default class MicroEvent {
    _events: {
        [key: string]: TCallback[];
    };
    constructor();
    on(events: string, fct: TCallback): void;
    off(events: string, fct: TCallback): void;
    trigger(events: string, ...args: any): void;
}
export {};
