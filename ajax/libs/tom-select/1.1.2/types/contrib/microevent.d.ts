/**
 * MicroEvent - to make any js object an event emitter
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * @author Jerome Etienne (https://github.com/jeromeetienne)
 */
export default class MicroEvent {
    _events: {};
    on(event: any, fct: any): void;
    off(event: any, fct: any, ...args: any[]): boolean;
    trigger(event: any, ...args: any[]): void;
}
