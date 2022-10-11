/// <reference types="koa__router" />
/// <reference types="node" />
import Koa from 'koa';
import Router from '@koa/router';
import type { CorsOptions } from 'cors';
import { Auth } from './auth';
import { SocketIO } from './transport/socketio';
import type { Server as ServerTypes, Game, StorageAPI } from '../types';
export declare type KoaServer = ReturnType<Koa['listen']>;
interface ServerConfig {
    port?: number;
    callback?: () => void;
    lobbyConfig?: {
        apiPort: number;
        apiCallback?: () => void;
    };
}
interface HttpsOptions {
    cert: string;
    key: string;
}
/**
 * Build config object from server run arguments.
 */
export declare const createServerRunConfig: (portOrConfig: number | ServerConfig, callback?: () => void) => ServerConfig;
export declare const getPortFromServer: (server: KoaServer) => string | number | null;
interface ServerOpts {
    games: Game[];
    origins?: CorsOptions['origin'];
    apiOrigins?: CorsOptions['origin'];
    db?: StorageAPI.Async | StorageAPI.Sync;
    transport?: SocketIO;
    uuid?: () => string;
    authenticateCredentials?: ServerTypes.AuthenticateCredentials;
    generateCredentials?: ServerTypes.GenerateCredentials;
    https?: HttpsOptions;
}
/**
 * Instantiate a game server.
 *
 * @param games - The games that this server will handle.
 * @param db - The interface with the database.
 * @param transport - The interface with the clients.
 * @param authenticateCredentials - Function to test player credentials.
 * @param origins - Allowed origins to use this server, e.g. `['http://localhost:3000']`.
 * @param apiOrigins - Allowed origins to use the Lobby API, defaults to `origins`.
 * @param generateCredentials - Method for API to generate player credentials.
 * @param https - HTTPS configuration options passed through to the TLS module.
 * @param lobbyConfig - Configuration options for the Lobby API server.
 */
export declare function Server({ games, db, transport, https, uuid, origins, apiOrigins, generateCredentials, authenticateCredentials, }: ServerOpts): {
    app: ServerTypes.App;
    db: StorageAPI.Async | StorageAPI.Sync;
    auth: Auth;
    router: Router<any, ServerTypes.AppCtx>;
    transport: SocketIO;
    run: (portOrConfig: number | ServerConfig, callback?: () => void) => Promise<{
        apiServer: import("http").Server;
        appServer: import("http").Server;
    }>;
    kill: (servers: {
        apiServer?: KoaServer;
        appServer: KoaServer;
    }) => void;
};
export {};
