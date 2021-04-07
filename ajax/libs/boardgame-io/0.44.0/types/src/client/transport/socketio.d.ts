/// <reference types="socket.io-client" />
import { Transport } from './transport';
import type { TransportOpts, MetadataCallback, ChatCallback } from './transport';
import type { CredentialedActionShape, PlayerID, State, ChatMessage } from '../../types';
interface SocketIOOpts {
    server?: string;
    socketOpts?: SocketIOClient.ConnectOpts;
}
declare type SocketIOTransportOpts = TransportOpts & SocketIOOpts & {
    socket?: any;
};
/**
 * SocketIO
 *
 * Transport interface that interacts with the Master via socket.io.
 */
export declare class SocketIOTransport extends Transport {
    server: string;
    socket: SocketIOClient.Socket;
    socketOpts: SocketIOClient.ConnectOpts;
    callback: () => void;
    matchDataCallback: MetadataCallback;
    chatMessageCallback: ChatCallback;
    /**
     * Creates a new Multiplayer instance.
     * @param {object} socket - Override for unit tests.
     * @param {object} socketOpts - Options to pass to socket.io.
     * @param {object} store - Redux store
     * @param {string} matchID - The game ID to connect to.
     * @param {string} playerID - The player ID associated with this client.
     * @param {string} credentials - Authentication credentials
     * @param {string} gameName - The game type (the `name` field in `Game`).
     * @param {string} numPlayers - The number of players.
     * @param {string} server - The game server in the form of 'hostname:port'. Defaults to the server serving the client if not provided.
     */
    constructor({ socket, socketOpts, server, ...opts }?: SocketIOTransportOpts);
    /**
     * Called when an action that has to be relayed to the
     * game master is made.
     */
    onAction(state: State, action: CredentialedActionShape.Any): void;
    onChatMessage(matchID: string, chatMessage: ChatMessage): void;
    /**
     * Connect to the server.
     */
    connect(): void;
    /**
     * Disconnect from the server.
     */
    disconnect(): void;
    /**
     * Subscribe to connection state changes.
     */
    subscribe(fn: () => void): void;
    subscribeMatchData(fn: MetadataCallback): void;
    subscribeChatMessage(fn: ChatCallback): void;
    /**
     * Send a “sync” event to the server.
     */
    private sync;
    /**
     * Dispatches a reset action, then requests a fresh sync from the server.
     */
    private resetAndSync;
    /**
     * Updates the game id.
     * @param {string} id - The new game id.
     */
    updateMatchID(id: string): void;
    /**
     * Updates the player associated with this client.
     * @param {string} id - The new player id.
     */
    updatePlayerID(id: PlayerID): void;
    /**
     * Updates the credentials associated with this client.
     * @param {string|undefined} credentials - The new credentials to use.
     */
    updateCredentials(credentials?: string): void;
}
export declare function SocketIO({ server, socketOpts }?: SocketIOOpts): (transportOpts: SocketIOTransportOpts) => SocketIOTransport;
export {};
