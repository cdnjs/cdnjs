import type { ProcessGameConfig } from '../../core/game';
import type { Game, PlayerID, CredentialedActionShape, State, Store, SyncInfo, ChatMessage } from '../../types';
export declare type MetadataCallback = (metadata: SyncInfo['filteredMetadata']) => void;
export declare type ChatCallback = (message: ChatMessage) => void;
export interface TransportOpts {
    store?: Store;
    gameName?: string;
    gameKey?: Game;
    game?: ReturnType<typeof ProcessGameConfig>;
    playerID?: PlayerID;
    matchID?: string;
    credentials?: string;
    numPlayers?: number;
}
export declare abstract class Transport {
    protected store: Store;
    protected gameName: string;
    protected playerID: PlayerID | null;
    protected matchID: string;
    protected credentials?: string;
    protected numPlayers: number;
    isConnected: boolean;
    constructor({ store, gameName, playerID, matchID, credentials, numPlayers, }: TransportOpts);
    abstract onAction(state: State, action: CredentialedActionShape.Any): void;
    abstract connect(): void;
    abstract disconnect(): void;
    abstract subscribe(fn: () => void): void;
    abstract subscribeMatchData(fn: MetadataCallback): void;
    abstract updateMatchID(id: string): void;
    abstract updatePlayerID(id: PlayerID): void;
    abstract updateCredentials(credentials?: string): void;
    abstract onChatMessage(matchID: string, chatMessage: ChatMessage): void;
    abstract subscribeChatMessage(fn: ChatCallback): void;
}
