import 'svelte';
import type { StoreEnhancer } from 'redux';
import { ProcessGameConfig } from '../core/game';
import type Debug from './debug/Debug.svelte';
import type { Transport, TransportOpts } from './transport/transport';
import type { ActivePlayersArg, FilteredMetadata, Game, LogEntry, PlayerID, State, Store, ChatMessage } from '../types';
export interface DebugOpt {
    target?: HTMLElement;
    impl?: typeof Debug;
    collapseOnLoad?: boolean;
    hideToggleButton?: boolean;
}
export declare const createMoveDispatchers: any;
export declare const createEventDispatchers: any;
export declare const createPluginDispatchers: any;
export interface ClientOpts<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    game: Game<G, PluginAPIs>;
    debug?: DebugOpt | boolean;
    numPlayers?: number;
    multiplayer?: (opts: TransportOpts) => Transport;
    matchID?: string;
    playerID?: PlayerID;
    credentials?: string;
    enhancer?: StoreEnhancer;
}
export declare type ClientState<G extends any = any> = null | (State<G> & {
    isActive: boolean;
    isConnected: boolean;
    log: LogEntry[];
});
/**
 * Implementation of Client (see below).
 */
export declare class _ClientImpl<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    private gameStateOverride?;
    private initialState;
    readonly multiplayer: (opts: TransportOpts) => Transport;
    private reducer;
    private _running;
    private subscribers;
    private transport;
    private manager;
    readonly debugOpt?: DebugOpt | boolean;
    readonly game: ReturnType<typeof ProcessGameConfig>;
    readonly store: Store;
    log: State['deltalog'];
    matchID: string;
    playerID: PlayerID | null;
    credentials: string;
    matchData?: FilteredMetadata;
    moves: Record<string, (...args: any[]) => void>;
    events: {
        endGame?: (gameover?: any) => void;
        endPhase?: () => void;
        endTurn?: (arg?: {
            next: PlayerID;
        }) => void;
        setPhase?: (newPhase: string) => void;
        endStage?: () => void;
        setStage?: (newStage: string) => void;
        setActivePlayers?: (arg: ActivePlayersArg) => void;
    };
    plugins: Record<string, (...args: any[]) => void>;
    reset: () => void;
    undo: () => void;
    redo: () => void;
    sendChatMessage: (message: any) => void;
    chatMessages: ChatMessage[];
    constructor({ game, debug, numPlayers, multiplayer, matchID: matchID, playerID, credentials, enhancer, }: ClientOpts<G, PluginAPIs>);
    /** Handle incoming match data from a multiplayer transport. */
    private receiveMatchData;
    /** Handle an incoming chat message from a multiplayer transport. */
    private receiveChatMessage;
    /** Handle all incoming updates from a multiplayer transport. */
    private receiveTransportData;
    private notifySubscribers;
    overrideGameState(state: any): void;
    start(): void;
    stop(): void;
    subscribe(fn: (state: ClientState<G>) => void): () => void;
    getInitialState(): State<G>;
    getState(): ClientState<G>;
    private createDispatchers;
    updatePlayerID(playerID: PlayerID | null): void;
    updateMatchID(matchID: string): void;
    updateCredentials(credentials: string): void;
}
/**
 * Client
 *
 * boardgame.io JS client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} matchID - The matchID that you want to connect to.
 * @param {...object} playerID - The playerID associated with this client.
 * @param {...string} credentials - The authentication credentials associated with this client.
 *
 * Returns:
 *   A JS object that provides an API to interact with the
 *   game by dispatching moves and events.
 */
export declare function Client<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>>(opts: ClientOpts<G, PluginAPIs>): _ClientImpl<G, PluginAPIs>;
