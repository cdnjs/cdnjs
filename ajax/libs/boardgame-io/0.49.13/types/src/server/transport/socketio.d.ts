/// <reference types="node" />
import type { CorsOptions } from 'cors';
import type IOTypes from 'socket.io';
import type { ServerOptions as HttpsOptions } from 'https';
import PQueue from 'p-queue';
import type { TransportAPI as MasterTransport } from '../../master/master';
import type { Game, Server } from '../../types';
import type { GenericPubSub } from './pubsub/generic-pub-sub';
import type { IntermediateTransportData } from '../../master/master';
/**
 * API that's exposed by SocketIO for the Master to send
 * information to the clients.
 */
export declare const TransportAPI: (matchID: string, socket: IOTypes.Socket, filterPlayerView: any, pubSub: GenericPubSub<IntermediateTransportData>) => MasterTransport;
export interface SocketOpts {
    https?: HttpsOptions;
    socketOpts?: IOTypes.ServerOptions;
    socketAdapter?: any;
    pubSub?: GenericPubSub<IntermediateTransportData>;
}
interface Client {
    matchID: string;
    playerID: string;
    socket: IOTypes.Socket;
    credentials: string | undefined;
}
/**
 * Transport interface that uses socket.io
 */
export declare class SocketIO {
    protected clientInfo: Map<string, Client>;
    protected roomInfo: Map<string, Set<string>>;
    protected perMatchQueue: Map<string, PQueue>;
    private readonly https;
    private readonly socketAdapter;
    private readonly socketOpts;
    protected pubSub: GenericPubSub<IntermediateTransportData>;
    constructor({ https, socketAdapter, socketOpts, pubSub }?: SocketOpts);
    /**
     * Unregister client data for a socket.
     */
    private removeClient;
    /**
     * Register client data for a socket.
     */
    private addClient;
    private subscribePubSubChannel;
    private unsubscribePubSubChannel;
    init(app: Server.App & {
        _io?: IOTypes.Server;
    }, games: Game[], origins?: CorsOptions['origin']): void;
    /**
     * Create a PQueue for a given matchID if none exists and return it.
     * @param matchID
     * @returns
     */
    getMatchQueue(matchID: string): PQueue;
    /**
     * Delete a PQueue for a given matchID.
     * @param matchID
     */
    deleteMatchQueue(matchID: string): void;
}
export {};
