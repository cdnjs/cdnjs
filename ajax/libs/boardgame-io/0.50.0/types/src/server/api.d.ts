/// <reference types="koa__router" />
import type { CorsOptions } from 'cors';
import type Router from '@koa/router';
import type { Auth } from './auth';
import type { Server, Game, StorageAPI } from '../types';
export declare const configureRouter: ({ router, db, auth, games, uuid, }: {
    router: Router<any, Server.AppCtx>;
    auth: Auth;
    games: Game[];
    uuid?: () => string;
    db: StorageAPI.Sync | StorageAPI.Async;
}) => Router<any, Server.AppCtx>;
export declare const configureApp: (app: Server.App, router: Router<any, Server.AppCtx>, origins: CorsOptions['origin']) => void;
