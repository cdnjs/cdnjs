import type { State, Server, LogEntry } from '../../types';
import * as StorageAPI from './base';
/**
 * InMemory data storage.
 */
export declare class InMemory extends StorageAPI.Sync {
    protected state: Map<string, State>;
    protected initial: Map<string, State>;
    protected metadata: Map<string, Server.MatchData>;
    protected log: Map<string, LogEntry[]>;
    /**
     * Creates a new InMemory storage.
     */
    constructor();
    /**
     * Create a new match.
     *
     * @override
     */
    createMatch(matchID: string, opts: StorageAPI.CreateMatchOpts): void;
    /**
     * Write the match metadata to the in-memory object.
     */
    setMetadata(matchID: string, metadata: Server.MatchData): void;
    /**
     * Write the match state to the in-memory object.
     */
    setState(matchID: string, state: State, deltalog?: LogEntry[]): void;
    /**
     * Fetches state for a particular matchID.
     */
    fetch<O extends StorageAPI.FetchOpts>(matchID: string, opts: O): StorageAPI.FetchResult<O>;
    /**
     * Remove the match state from the in-memory object.
     */
    wipe(matchID: string): void;
    /**
     * Return all keys.
     *
     * @override
     */
    listMatches(opts?: StorageAPI.ListMatchesOpts): string[];
}
