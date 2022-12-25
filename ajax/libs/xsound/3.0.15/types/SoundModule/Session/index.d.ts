import { Connectable } from '../../interfaces';
import { BufferSize } from '../../types';
import { Analyser } from '../Analyser';
import { Room, RoomMap } from './Room';
export declare type NumberOfSessionChannels = 1 | 2;
export type { Room, RoomMap };
/**
 * @property {string} roomId This property is string that identifies messaging room.
 * @property {BufferSize} bufferSize This property is buffer size for `ScriptProcessorNode`.
 * @property {NumberOfSessionChannels} numberOfInputs This property is the number of inputs for `ScriptProcessorNode`.
 * @property {NumberOfSessionChannels} numberOfOutputs This property the number of outputs for `ScriptProcessorNode`.
 * @property {Analyser} analyser This property is instance of `Analyser`.
 */
export declare type SessionSetupParams = {
    roomId: string;
    bufferSize: BufferSize;
    numberOfInputs: NumberOfSessionChannels;
    numberOfOutputs: NumberOfSessionChannels;
    analyser: Analyser;
};
/**
 * @property {string} roomId This property is string that identifies messaging room.
 * @property {boolean} tls This property is in order to select protocol (either `wss` or `ws`).
 * @property {string} host This property is server's hostname.
 * @property {number} port This property is port number for connection.
 * @property {string} path This property is script path that is executed in server side.
 * @property {function} openCallback This property is invoked as `onopen` event handler in instance of `WebSocket`.
 * @property {function} closeCallback This property is invoked as `onclose` event handler in instance of `WebSocket`.
 * @property {function} errorCallback This property is invoked as `onerror` event handler in instance of `WebSocket`.
 */
export declare type SessionConnectionParams = {
    roomId: string;
    tls: boolean;
    host: string;
    port: number;
    path: string;
    openCallback?(event: Event): void;
    closeCallback?(event: Event): void;
    errorCallback?(event: Event): void;
};
/**
 * This private class manages sound session rooms.
 * @constructor
 */
export declare class Session implements Connectable {
    private context;
    private input;
    private output;
    private rooms;
    /**
     * @param {AudioContext} context This argument is in order to use Web Audio API.
     */
    constructor(context: AudioContext);
    /**
     * This method creates instance of `Room`
     * @param {SessionSetupParams} params This argument is in order to create instance of `Room`.
     * @return {Session} Return value is for method chain.
     */
    setup(params: SessionSetupParams): Session;
    /**
     * This method creates instance of `WebSocket`
     * @param {SessionConnectionParams} params This argument is in order to create instance of `WebSocket`.
     * @return {Session} Return value is for method chain.
     */
    ready(params: SessionConnectionParams): Session;
    /**
     * This method sends sound data to server.
     * @param {string} roomId This argument is string that identifies messaging room.
     * @return {Session} Return value is for method chain.
     */
    start(roomId: string): Session;
    /**
     * This method stops sending and receiving data.
     * @param {string} roomId This argument is string that identifies messaging room.
     * @return {Session} Return value is for method chain.
     */
    stop(roomId: string): Session;
    /**
     * This method closes connection to WebSocket server and destroys instance of `WebSocket`.
     * @param {string} roomId This argument is string that identifies messaging room.
     * @return {Session} Return value is for method chain.
     */
    clear(roomId: string): Session;
    /**
     * This method connects `AudioNode`s.
     * @param {string} roomId This argument is string that identifies messaging room.
     * @return {Session} Return value is for method chain.
     */
    connect(roomId: string): Session;
    /**
     * This method determines whether there is connection to server.
     * @param {string} roomId This argument is string that identifies messaging room.
     * @return {boolean}
     */
    connected(roomId: string): boolean;
    /**
     * This method gets instance of `Room` that is designated Room ID.
     * @param {string} roomId This argument is string that identifies room.
     * @return {Room}
     */
    get(roomId: string): Room | null;
    /** @override */
    get INPUT(): GainNode;
    /** @override */
    get OUTPUT(): GainNode;
}
//# sourceMappingURL=index.d.ts.map