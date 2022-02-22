import * as ioNamespace from 'socket.io-client';
import { Transport } from './transport';
import type { TransportOpts } from './transport';
import type { CredentialedActionShape, PlayerID, State, ChatMessage } from '../../types';
declare type SocketOpts = Partial<ioNamespace.SocketOptions & ioNamespace.ManagerOptions>;
interface SocketIOOpts {
    server?: string;
    socketOpts?: SocketOpts;
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
    socket: ioNamespace.Socket;
    socketOpts: SocketOpts;
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
    constructor({ socket, socketOpts, server, ...opts }: SocketIOTransportOpts);
    sendAction(state: State, action: CredentialedActionShape.Any): void;
    sendChatMessage(matchID: string, chatMessage: ChatMessage): void;
    connect(): void;
    disconnect(): void;
    requestSync(): void;
    updateMatchID(id: string): void;
    updatePlayerID(id: PlayerID): void;
    updateCredentials(credentials?: string): void;
}
export declare function SocketIO({ server, socketOpts }?: SocketIOOpts): (transportOpts: SocketIOTransportOpts) => SocketIOTransport;
export {};
