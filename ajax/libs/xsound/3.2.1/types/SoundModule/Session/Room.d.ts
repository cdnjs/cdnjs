import { Connectable } from '../../interfaces';
import { SessionSetupParams, SessionConnectionParams } from './';
export declare type RoomMap = {
    [id: string]: WebSocket | null;
};
/**
 * This class is entity for room feature in session.
 * @constructor
 */
export declare class Room implements Connectable {
    private static BUFFER_SIZE;
    private id;
    private context;
    private analyser;
    private sender;
    private receiver;
    private websocket;
    /**
     * @param {AudioContext} context This argument is in order to use interfaces of Web Audio API.
     * @param {SessionSetupParams} params This argument is in order to create instance of `Room`.
     */
    constructor(context: AudioContext, params: SessionSetupParams);
    /**
     * This method creates instance of `WebSocket` and registers event handlers. Namely, join room.
     * @param {SessionConnectionParams} params This argument is in order to create instance of `WebSocket`.
     */
    join(params: SessionConnectionParams): void;
    /**
     * This method sends sound Room ID and data (as `Float32Array`) to server.
     */
    send(): void;
    /**
     * This method stops sending and receiving data by disconnecting `AudioNode`.
     * Namely, leave room temporarily.
     */
    leave(): void;
    /**
     * This method closes connection to WebSocket server and destroys instance of `WebSocket`.
     * Namely, leave room permanently.
     */
    clear(): void;
    /**
     * This method connects `AudioNode`s for receiving data.
     */
    connect(): void;
    /**
     * This method determines whether there is connection to server.
     * @return {boolean} If connection to server exists, this value is `true`. Otherwise, this value is `false`.
     */
    connected(): boolean;
    /**
     * This method gets instance of `WebSocket` that corresponds Room ID.
     * @return {RoomMap}
     */
    get(): RoomMap;
    /** @override */
    get INPUT(): ScriptProcessorNode;
    /** @override */
    get OUTPUT(): ScriptProcessorNode;
    /** @override */
    toString(): string;
}
//# sourceMappingURL=Room.d.ts.map