import type { ProcessGameConfig } from '../../core/game';
import type { TransportData } from '../../master/master';
import type { Game, PlayerID, CredentialedActionShape, State, SyncInfo, ChatMessage } from '../../types';
export declare type MetadataCallback = (metadata: SyncInfo['filteredMetadata']) => void;
export declare type ChatCallback = (message: ChatMessage) => void;
export interface TransportOpts {
    transportDataCallback: (data: TransportData) => void;
    gameName?: string;
    gameKey: Game;
    game: ReturnType<typeof ProcessGameConfig>;
    playerID?: PlayerID;
    matchID?: string;
    credentials?: string;
    numPlayers?: number;
}
export declare abstract class Transport {
    protected gameName: string;
    protected playerID: PlayerID | null;
    protected matchID: string;
    protected credentials?: string;
    protected numPlayers: number;
    /** Callback to pass transport data back to the client. */
    private transportDataCallback;
    /** Callback to let the client know when the connection status has changed. */
    private connectionStatusCallback;
    isConnected: boolean;
    constructor({ transportDataCallback, gameName, playerID, matchID, credentials, numPlayers, }: TransportOpts);
    /** Subscribe to connection state changes. */
    subscribeToConnectionStatus(fn: () => void): void;
    /** Transport implementations should call this when they connect/disconnect. */
    protected setConnectionStatus(isConnected: boolean): void;
    /** Transport implementations should call this when they receive data from a master. */
    protected notifyClient(data: TransportData): void;
    /** Called by the client to connect the transport. */
    abstract connect(): void;
    /** Called by the client to disconnect the transport. */
    abstract disconnect(): void;
    /** Called by the client to dispatch an action via the transport. */
    abstract sendAction(state: State, action: CredentialedActionShape.Any): void;
    /** Called by the client to dispatch a chat message via the transport. */
    abstract sendChatMessage(matchID: string, chatMessage: ChatMessage): void;
    /** Called by the client to request a sync action from the transport. */
    abstract requestSync(): void;
    /** Called by the client to update the matchID it wants to connect to. */
    abstract updateMatchID(id: string): void;
    /** Called by the client to update the playerID it is playing as. */
    abstract updatePlayerID(id: PlayerID): void;
    /** Called by the client to update the credentials it is using. */
    abstract updateCredentials(credentials?: string): void;
}
