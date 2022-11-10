import type { Object } from 'ts-toolbelt';
import type Koa from 'koa';
import type { Store as ReduxStore } from 'redux';
import type * as ActionCreators from './core/action-creators';
import type { ActionErrorType, UpdateErrorType } from './core/errors';
import type { Flow } from './core/flow';
import type { CreateGameReducer } from './core/reducer';
import type { INVALID_MOVE } from './core/constants';
import type { GameMethod } from './core/game-methods';
import type { Auth } from './server/auth';
import type * as StorageAPI from './server/db/base';
import type { EventsAPI } from './plugins/plugin-events';
import type { LogAPI } from './plugins/plugin-log';
import type { RandomAPI } from './plugins/random/random';
import type { Operation } from 'rfc6902';
export type { StorageAPI };
export declare type AnyFn = (...args: any[]) => any;
export interface State<G extends any = any> {
    G: G;
    ctx: Ctx;
    deltalog?: Array<LogEntry>;
    plugins: {
        [pluginName: string]: PluginState;
    };
    _undo: Array<Undo<G>>;
    _redo: Array<Undo<G>>;
    _stateID: number;
}
export declare type ErrorType = UpdateErrorType | ActionErrorType;
export interface ActionError {
    type: ErrorType;
    payload?: any;
}
export interface TransientMetadata {
    error?: ActionError;
}
export declare type ActionResult = any;
export interface TransientState<G extends any = any> extends State<G> {
    transients?: TransientMetadata;
}
export declare type PartialGameState = Pick<State, 'G' | 'ctx' | 'plugins'>;
export declare type StageName = string;
export declare type PlayerID = string;
export declare type StageArg = StageName | {
    stage?: StageName;
    /** @deprecated Use `minMoves` and `maxMoves` instead. */
    moveLimit?: number;
    minMoves?: number;
    maxMoves?: number;
};
export declare type ActivePlayersArg = PlayerID[] | {
    currentPlayer?: StageArg;
    others?: StageArg;
    all?: StageArg;
    value?: Record<PlayerID, StageArg>;
    minMoves?: number;
    maxMoves?: number;
    /** @deprecated Use `minMoves` and `maxMoves` instead. */
    moveLimit?: number;
    revert?: boolean;
    next?: ActivePlayersArg;
};
export interface ActivePlayers {
    [playerID: string]: StageName;
}
export interface Ctx {
    numPlayers: number;
    playOrder: Array<PlayerID>;
    playOrderPos: number;
    activePlayers: null | ActivePlayers;
    currentPlayer: PlayerID;
    numMoves?: number;
    gameover?: any;
    turn: number;
    phase: string;
    _activePlayersMinMoves?: Record<PlayerID, number>;
    _activePlayersMaxMoves?: Record<PlayerID, number>;
    _activePlayersNumMoves?: Record<PlayerID, number>;
    _prevActivePlayers?: Array<{
        activePlayers: null | ActivePlayers;
        _activePlayersMinMoves?: Record<PlayerID, number>;
        _activePlayersMaxMoves?: Record<PlayerID, number>;
        _activePlayersNumMoves?: Record<PlayerID, number>;
    }>;
    _nextActivePlayers?: ActivePlayersArg;
    _random?: {
        seed: string | number;
    };
}
export interface DefaultPluginAPIs {
    events: EventsAPI;
    log: LogAPI;
    random: RandomAPI;
}
export interface PluginState {
    data: any;
    api?: any;
}
export interface LogEntry {
    action: ActionShape.MakeMove | ActionShape.GameEvent | ActionShape.Undo | ActionShape.Redo;
    _stateID: number;
    turn: number;
    phase: string;
    redact?: boolean;
    automatic?: boolean;
    metadata?: any;
    patch?: Operation[];
}
export interface PluginContext<API extends any = any, Data extends any = any, G extends any = any> {
    G: G;
    ctx: Ctx;
    game: Game;
    api: API;
    data: Data;
}
export interface Plugin<API extends any = any, Data extends any = any, G extends any = any> {
    name: string;
    noClient?: (context: PluginContext<API, Data, G>) => boolean;
    setup?: (setupCtx: {
        G: G;
        ctx: Ctx;
        game: Game<G>;
    }) => Data;
    isInvalid?: (context: Omit<PluginContext<API, Data, G>, 'api'>) => false | string;
    action?: (data: Data, payload: ActionShape.Plugin['payload']) => Data;
    api?: (context: {
        G: G;
        ctx: Ctx;
        game: Game<G>;
        data: Data;
        playerID?: PlayerID;
    }) => API;
    flush?: (context: PluginContext<API, Data, G>) => Data;
    dangerouslyFlushRawState?: (flushCtx: {
        state: State<G>;
        game: Game<G>;
        api: API;
        data: Data;
    }) => State<G>;
    fnWrap?: (moveOrHook: (context: FnContext<G>, ...args: any[]) => any, methodType: GameMethod) => (context: FnContext<G>, ...args: any[]) => any;
    playerView?: (context: {
        G: G;
        ctx: Ctx;
        game: Game<G>;
        data: Data;
        playerID?: PlayerID | null;
    }) => any;
}
export declare type FnContext<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> = PluginAPIs & DefaultPluginAPIs & {
    G: G;
    ctx: Ctx;
};
export declare type MoveFn<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> = (context: FnContext<G, PluginAPIs> & {
    playerID: PlayerID;
}, ...args: any[]) => void | G | typeof INVALID_MOVE;
export interface LongFormMove<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    move: MoveFn<G, PluginAPIs>;
    redact?: boolean | ((context: {
        G: G;
        ctx: Ctx;
    }) => boolean);
    noLimit?: boolean;
    client?: boolean;
    undoable?: boolean | ((context: {
        G: G;
        ctx: Ctx;
    }) => boolean);
    ignoreStaleStateID?: boolean;
}
export declare type Move<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> = MoveFn<G, PluginAPIs> | LongFormMove<G, PluginAPIs>;
export interface MoveMap<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    [moveName: string]: Move<G, PluginAPIs>;
}
export interface PhaseConfig<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    start?: boolean;
    next?: ((context: FnContext<G, PluginAPIs>) => string | void) | string;
    onBegin?: (context: FnContext<G, PluginAPIs>) => void | G;
    onEnd?: (context: FnContext<G, PluginAPIs>) => void | G;
    endIf?: (context: FnContext<G, PluginAPIs>) => boolean | void | {
        next: string;
    };
    moves?: MoveMap<G, PluginAPIs>;
    turn?: TurnConfig<G, PluginAPIs>;
    wrapped?: {
        endIf?: (state: State<G>) => boolean | void | {
            next: string;
        };
        onBegin?: (state: State<G>) => void | G;
        onEnd?: (state: State<G>) => void | G;
        next?: (state: State<G>) => string | void;
    };
}
export interface StageConfig<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    moves?: MoveMap<G, PluginAPIs>;
    next?: string;
}
export interface StageMap<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    [stageName: string]: StageConfig<G, PluginAPIs>;
}
export interface TurnOrderConfig<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    first: (context: FnContext<G, PluginAPIs>) => number;
    next: (context: FnContext<G, PluginAPIs>) => number | undefined;
    playOrder?: (context: FnContext<G, PluginAPIs>) => PlayerID[];
}
export interface TurnConfig<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    activePlayers?: ActivePlayersArg;
    minMoves?: number;
    maxMoves?: number;
    /** @deprecated Use `minMoves` and `maxMoves` instead. */
    moveLimit?: number;
    onBegin?: (context: FnContext<G, PluginAPIs>) => void | G;
    onEnd?: (context: FnContext<G, PluginAPIs>) => void | G;
    endIf?: (context: FnContext<G, PluginAPIs>) => boolean | void | {
        next: PlayerID;
    };
    onMove?: (context: FnContext<G, PluginAPIs> & {
        playerID: PlayerID;
    }) => void | G;
    stages?: StageMap<G, PluginAPIs>;
    order?: TurnOrderConfig<G, PluginAPIs>;
    wrapped?: {
        endIf?: (state: State<G>) => boolean | void | {
            next: PlayerID;
        };
        onBegin?: (state: State<G>) => void | G;
        onEnd?: (state: State<G>) => void | G;
        onMove?: (state: State<G> & {
            playerID: PlayerID;
        }) => void | G;
    };
}
export interface PhaseMap<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> {
    [phaseName: string]: PhaseConfig<G, PluginAPIs>;
}
export declare type AiEnumerate = Array<{
    event: string;
    args?: any[];
} | {
    move: string;
    args?: any[];
} | ActionShape.MakeMove | ActionShape.GameEvent>;
export interface Game<G extends any = any, PluginAPIs extends Record<string, unknown> = Record<string, unknown>, SetupData extends any = any> {
    name?: string;
    minPlayers?: number;
    maxPlayers?: number;
    deltaState?: boolean;
    disableUndo?: boolean;
    seed?: string | number;
    setup?: (context: PluginAPIs & DefaultPluginAPIs & {
        ctx: Ctx;
    }, setupData?: SetupData) => G;
    validateSetupData?: (setupData: SetupData | undefined, numPlayers: number) => string | undefined;
    moves?: MoveMap<G, PluginAPIs>;
    phases?: PhaseMap<G, PluginAPIs>;
    turn?: TurnConfig<G, PluginAPIs>;
    events?: {
        endGame?: boolean;
        endPhase?: boolean;
        endTurn?: boolean;
        setPhase?: boolean;
        endStage?: boolean;
        setStage?: boolean;
        pass?: boolean;
        setActivePlayers?: boolean;
    };
    endIf?: (context: FnContext<G, PluginAPIs>) => any;
    onEnd?: (context: FnContext<G, PluginAPIs>) => void | G;
    playerView?: (context: {
        G: G;
        ctx: Ctx;
        playerID: PlayerID | null;
    }) => any;
    plugins?: Array<Plugin<any, any, G>>;
    ai?: {
        enumerate: (G: G, ctx: Ctx, playerID: PlayerID) => AiEnumerate;
    };
    processMove?: (state: State<G>, action: ActionPayload.MakeMove) => State<G> | typeof INVALID_MOVE;
    flow?: ReturnType<typeof Flow>;
}
export declare type Undo<G extends any = any> = {
    G: G;
    ctx: Ctx;
    plugins: {
        [pluginName: string]: PluginState;
    };
    moveType?: string;
    playerID?: PlayerID;
};
export declare namespace Server {
    type GenerateCredentials = (ctx: Koa.DefaultContext) => Promise<string> | string;
    type AuthenticateCredentials = (credentials: string, playerMetadata: PlayerMetadata) => Promise<boolean> | boolean;
    type PlayerMetadata = {
        id: number;
        name?: string;
        credentials?: string;
        data?: any;
        isConnected?: boolean;
    };
    interface MatchData {
        gameName: string;
        players: {
            [id: number]: PlayerMetadata;
        };
        setupData?: any;
        gameover?: any;
        nextMatchID?: string;
        unlisted?: boolean;
        createdAt: number;
        updatedAt: number;
    }
    type AppCtx = Koa.DefaultContext & {
        db: StorageAPI.Async | StorageAPI.Sync;
        auth: Auth;
    };
    type App = Koa<Koa.DefaultState, AppCtx>;
}
export declare namespace LobbyAPI {
    export type GameList = string[];
    type PublicPlayerMetadata = Omit<Server.PlayerMetadata, 'credentials'>;
    export type Match = Omit<Server.MatchData, 'players'> & {
        matchID: string;
        players: PublicPlayerMetadata[];
    };
    export interface MatchList {
        matches: Match[];
    }
    export interface CreatedMatch {
        matchID: string;
    }
    export interface JoinedMatch {
        playerID: string;
        playerCredentials: string;
    }
    export interface NextMatch {
        nextMatchID: string;
    }
    export {};
}
export declare type Reducer = ReturnType<typeof CreateGameReducer>;
export declare type Store = ReduxStore<State, ActionShape.Any>;
export declare namespace CredentialedActionShape {
    type MakeMove = ReturnType<typeof ActionCreators.makeMove>;
    type GameEvent = ReturnType<typeof ActionCreators.gameEvent>;
    type Plugin = ReturnType<typeof ActionCreators.plugin>;
    type AutomaticGameEvent = ReturnType<typeof ActionCreators.automaticGameEvent>;
    type Undo = ReturnType<typeof ActionCreators.undo>;
    type Redo = ReturnType<typeof ActionCreators.redo>;
    type Any = MakeMove | GameEvent | AutomaticGameEvent | Undo | Redo | Plugin;
}
export declare namespace ActionShape {
    type StripCredentials<T extends CredentialedActionShape.Any> = Object.P.Omit<T, ['payload', 'credentials']>;
    export type MakeMove = StripCredentials<CredentialedActionShape.MakeMove>;
    export type GameEvent = StripCredentials<CredentialedActionShape.GameEvent>;
    export type Plugin = StripCredentials<CredentialedActionShape.Plugin>;
    export type AutomaticGameEvent = StripCredentials<CredentialedActionShape.AutomaticGameEvent>;
    export type Sync = ReturnType<typeof ActionCreators.sync>;
    export type Update = ReturnType<typeof ActionCreators.update>;
    export type Patch = ReturnType<typeof ActionCreators.patch>;
    export type Reset = ReturnType<typeof ActionCreators.reset>;
    export type Undo = StripCredentials<CredentialedActionShape.Undo>;
    export type Redo = StripCredentials<CredentialedActionShape.Redo>;
    export type StripTransients = ReturnType<typeof ActionCreators.stripTransients>;
    export type Any = MakeMove | GameEvent | AutomaticGameEvent | Sync | Update | Patch | Reset | Undo | Redo | Plugin | StripTransients;
    export {};
}
export declare namespace ActionPayload {
    type GetPayload<T extends ActionShape.Any> = Object.At<T, 'payload'>;
    export type MakeMove = GetPayload<ActionShape.MakeMove>;
    export type GameEvent = GetPayload<ActionShape.GameEvent>;
    export {};
}
export declare type FilteredMetadata = {
    id: number;
    name?: string;
    isConnected?: boolean;
}[];
export interface SyncInfo {
    state: State;
    filteredMetadata: FilteredMetadata;
    initialState: State;
    log: LogEntry[];
}
export interface ChatMessage {
    id: string;
    sender: PlayerID;
    payload: any;
}
