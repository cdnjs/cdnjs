import Router from 'koa-router';
import type { Auth } from './auth';
import type { Server, Game, StorageAPI } from '../types';
export declare const createRouter: ({ db, auth, games, uuid, }: {
    auth: Auth;
    games: Game<any, import("../types").Ctx, any>[];
    uuid?: () => string;
    db: StorageAPI.Sync | StorageAPI.Async;
}) => Router<any, Server.AppCtx>;
export declare const configureApp: (app: Server.App, router: Router<any, Server.AppCtx>) => void;
