import * as StorageAPI from './base';
import type { State, Server, LogEntry } from '../../types';
interface InitOptions {
    dir: string;
    logging?: boolean;
    ttl?: boolean;
}
/**
 * FlatFile data storage.
 */
export declare class FlatFile extends StorageAPI.Async {
    private games;
    private dir;
    private logging?;
    private ttl?;
    private fileQueues;
    constructor({ dir, logging, ttl }: InitOptions);
    private chainRequest;
    private getItem;
    private setItem;
    private removeItem;
    connect(): Promise<void>;
    /**
     * Create new match.
     *
     * @param matchID
     * @param opts
     * @override
     */
    createMatch(matchID: string, opts: StorageAPI.CreateMatchOpts): Promise<void>;
    fetch<O extends StorageAPI.FetchOpts>(matchID: string, opts: O): Promise<StorageAPI.FetchResult<O>>;
    clear(): Promise<void>;
    setState(id: string, state: State, deltalog?: LogEntry[]): Promise<any>;
    setMetadata(id: string, metadata: Server.MatchData): Promise<void>;
    wipe(id: string): Promise<void>;
    /**
     * List matches IDs.
     *
     * @param opts
     * @override
     */
    listMatches(opts?: StorageAPI.ListMatchesOpts): Promise<string[]>;
}
export {};
