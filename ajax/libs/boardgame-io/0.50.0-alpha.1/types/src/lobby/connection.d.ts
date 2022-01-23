import type { ComponentType } from 'react';
import { LobbyClient } from './client';
import type { Game, LobbyAPI } from '../types';
export interface GameComponent {
    game: Game;
    board: ComponentType<any>;
}
interface LobbyConnectionOpts {
    server: string;
    playerName?: string;
    playerCredentials?: string;
    gameComponents: GameComponent[];
}
declare class _LobbyConnectionImpl {
    client: LobbyClient;
    gameComponents: GameComponent[];
    playerName: string;
    playerCredentials?: string;
    matches: LobbyAPI.MatchList['matches'];
    constructor({ server, gameComponents, playerName, playerCredentials, }: LobbyConnectionOpts);
    refresh(): Promise<void>;
    _getMatchInstance(matchID: string): LobbyAPI.Match;
    _getGameComponents(gameName: string): GameComponent;
    _findPlayer(playerName: string): LobbyAPI.Match;
    join(gameName: string, matchID: string, playerID: string): Promise<void>;
    leave(gameName: string, matchID: string): Promise<void>;
    disconnect(): Promise<void>;
    create(gameName: string, numPlayers: number): Promise<void>;
}
/**
 * LobbyConnection
 *
 * Lobby model.
 *
 * @param {string}   server - '<host>:<port>' of the server.
 * @param {Array}    gameComponents - A map of Board and Game objects for the supported games.
 * @param {string}   playerName - The name of the player.
 * @param {string}   playerCredentials - The credentials currently used by the player, if any.
 *
 * Returns:
 *   A JS object that synchronizes the list of running game instances with the server and provides an API to create/join/start instances.
 */
export declare function LobbyConnection(opts: LobbyConnectionOpts): _LobbyConnectionImpl;
export {};
