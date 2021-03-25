export default class MicroEvent {
    _events: {};
    on(events: any, fct: any): void;
    off(events: any, fct: any, ...args: any[]): void;
    trigger(events: any, ...args: any[]): void;
}
