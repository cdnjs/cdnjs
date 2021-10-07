import { Master } from '../../master/master';
import type { TransportData } from '../../master/master';
import { Transport } from './transport';
import type { TransportOpts } from './transport';
import type { ChatMessage, CredentialedActionShape, Game, PlayerID, State } from '../../types';
/**
 * Returns null if it is not a bot's turn.
 * Otherwise, returns a playerID of a bot that may play now.
 */
export declare function GetBotPlayer(state: State, bots: Record<PlayerID, any>): string;
interface LocalOpts {
    bots?: Record<PlayerID, any>;
    persist?: boolean;
    storageKey?: string;
}
declare type LocalMasterOpts = LocalOpts & {
    game: Game;
};
/**
 * Creates a local version of the master that the client
 * can interact with.
 */
export declare class LocalMaster extends Master {
    connect: (playerID: PlayerID, callback: (data: TransportData) => void) => void;
    constructor({ game, bots, storageKey, persist }: LocalMasterOpts);
}
declare type LocalTransportOpts = TransportOpts & {
    master?: LocalMaster;
};
/**
 * Local
 *
 * Transport interface that embeds a GameMaster within it
 * that you can connect multiple clients to.
 */
export declare class LocalTransport extends Transport {
    master: LocalMaster;
    /**
     * Creates a new Mutiplayer instance.
     * @param {string} matchID - The game ID to connect to.
     * @param {string} playerID - The player ID associated with this client.
     * @param {string} gameName - The game type (the `name` field in `Game`).
     * @param {string} numPlayers - The number of players.
     */
    constructor({ master, ...opts }: LocalTransportOpts);
    sendChatMessage(matchID: string, chatMessage: ChatMessage): void;
    sendAction(state: State, action: CredentialedActionShape.Any): void;
    requestSync(): void;
    connect(): void;
    disconnect(): void;
    updateMatchID(id: string): void;
    updatePlayerID(id: PlayerID): void;
    updateCredentials(credentials?: string): void;
}
/**
 * Create a local transport.
 */
export declare function Local({ bots, persist, storageKey }?: LocalOpts): (transportOpts: TransportOpts) => LocalTransport;
export {};
