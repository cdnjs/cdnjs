import mergeCombatant from './modules/mergeCombatant';
import { EventType, EventMessage, EventCallback, OverlayOptions } from './types';
declare type MessageCallback = (msg: any) => void;
interface MessageObject {
    msg: any;
    cb?: MessageCallback;
}
interface EventSubscribers {
    [event: string]: EventCallback[];
}
declare class OverlayAPI {
    static _instance: OverlayAPI | null;
    static mergeCombatant: typeof mergeCombatant;
    _options: OverlayOptions;
    _subscribers: EventSubscribers;
    _status: boolean;
    _queue: MessageObject[];
    _wsURL: string;
    _ws: WebSocket | null;
    _resCounter: number;
    _resPromises: {};
    /**
     * init API
     */
    constructor(options?: {});
    /**
     * send message to OverlayPluginApi or push into queue before its init
     */
    _sendMessage(msg: any, cb?: MessageCallback): void;
    /**
     * trigger event function, called by OverlayPluginApi, need `this` binding
     */
    _triggerEvents(msg: EventMessage): void;
    /**
     * init websocket connection
     */
    _initWebSocketMode(): void;
    /**
     * init OverlayPluginApi connection
     */
    _initCallbackMode(): void;
    /**
     * add an event listener
     */
    addListener(event: EventType, cb: EventCallback): void;
    /**
     * remove a listener
     */
    removeListener(event: EventType, cb: EventCallback): void;
    /**
     * remove all listener of one event type
     */
    removeAllListener(event: EventType): void;
    /**
     * get all listeners of a event
     */
    getAllListener(event: EventType): EventCallback[];
    /**
     * start listening event
     */
    startEvent(): void;
    /**
     * ends current encounter and save it
     */
    endEncounter(): any;
    /**
     * this function allows you to call an overlay handler,
     * these handlers are declared by Event Sources,
     * either built into OverlayPlugin or loaded through addons like Cactbot
     */
    callHandler(msg: any): Promise<unknown> | undefined;
    /**
     * simulate triggering event once
     */
    simulateData(msg: EventMessage): void;
}
export default OverlayAPI;
