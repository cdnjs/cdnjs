import { Master } from '../../master/master';
import type { TransportData } from '../../master/master';
import { Transport } from './transport';
import type { TransportOpts, ChatCallback } from './transport';
import type { ChatMessage, CredentialedActionShape, Game, LogEntry, PlayerID, State, SyncInfo } from '../../types';
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
    connect: (matchID: string, playerID: PlayerID, callback: (data: TransportData) => void) => void;
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
    chatMessageCallback: ChatCallback;
    /**
     * Creates a new Mutiplayer instance.
     * @param {string} matchID - The game ID to connect to.
     * @param {string} playerID - The player ID associated with this client.
     * @param {string} gameName - The game type (the `name` field in `Game`).
     * @param {string} numPlayers - The number of players.
     */
    constructor({ master, ...opts }: LocalTransportOpts);
    /**
     * Called when any player sends a chat message and the
     * master broadcasts the update to other clients (including
     * this one).
     */
    onChatMessage(matchID: string, chatMessage: ChatMessage): void;
    /**
     * Called when another player makes a move and the
     * master broadcasts the update to other clients (including
     * this one).
     */
    onUpdate(matchID: string, state: State, deltalog: LogEntry[]): Promise<void>;
    /**
     * Called when the client first connects to the master
     * and requests the current game state.
     */
    onSync(matchID: string, syncInfo: SyncInfo): void;
    /**
     * Called when an action that has to be relayed to the
     * game master is made.
     */
    onAction(state: State, action: CredentialedActionShape.Any): void;
    /**
     * Connect to the master.
     */
    connect(): void;
    /**
     * Disconnect from the master.
     */
    disconnect(): void;
    /**
     * Subscribe to connection state changes.
     */
    subscribe(): void;
    subscribeMatchData(): void;
    subscribeChatMessage(fn: ChatCallback): void;
    /**
     * Dispatches a reset action, then requests a fresh sync from the master.
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
/**
 * Create a local transport.
 */
export declare function Local({ bots, persist, storageKey }?: LocalOpts): (transportOpts: TransportOpts) => LocalTransport;
export {};
