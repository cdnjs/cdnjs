import isCEFSharp from './modules/isCEFSharp';
import mergeCombatant from './modules/mergeCombatant';
import { EventType, EventData, EventCallback } from './types';
declare class OverlayAPI {
    static _instance: OverlayAPI | null;
    static mergeCombatant: typeof mergeCombatant;
    static isCEFSharp: typeof isCEFSharp;
    private _status;
    private _eventCenter;
    private _queue;
    private _wsURL;
    private _ws;
    private _rseqCounter;
    private _responsePromises;
    /**
     * init API
     */
    constructor();
    /**
     * `common.js` L90
     * event trigger function, need `this` binding
     */
    private _triggerEvents;
    /**
     * `common.js` L12 & L65
     * send message in callback mode & websocket mode
     */
    private _sendMessage;
    /**
     * `common.js` L19
     * init api in websocket mode
     */
    private _initWS;
    /**
     * `common.js` L72
     * init api in callback mode
     */
    private _initCB;
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
     * ends current encounter and save it, not working in websocket mode
     */
    endEncounter(): Promise<void>;
    /**
     * `common.js` L122
     * this function allows you to call an overlay handler,
     * these handlers are declared by Event Sources,
     * either built into OverlayPlugin or loaded through addons like Cactbot
     */
    callHandler(msg: any): Promise<any>;
    /**
     * simulate triggering event once
     */
    simulateData(data: EventData): void;
}
export default OverlayAPI;
