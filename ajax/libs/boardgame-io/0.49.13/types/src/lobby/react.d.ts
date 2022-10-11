import React from 'react';
import PropTypes from 'prop-types';
import type { DebugOpt } from '../client/client';
import { Client } from '../client/react';
import type { GameComponent } from './connection';
import type { MatchOpts } from './match-instance';
import type { LobbyAPI } from '../types';
declare enum LobbyPhases {
    ENTER = "enter",
    PLAY = "play",
    LIST = "list"
}
declare type RunningMatch = {
    app: ReturnType<typeof Client>;
    matchID: string;
    playerID: string;
    credentials?: string;
};
declare type LobbyProps = {
    gameComponents: GameComponent[];
    lobbyServer?: string;
    gameServer?: string;
    debug?: DebugOpt | boolean;
    clientFactory?: typeof Client;
    refreshInterval?: number;
    renderer?: (args: {
        errorMsg: string;
        gameComponents: GameComponent[];
        matches: LobbyAPI.MatchList['matches'];
        phase: LobbyPhases;
        playerName: string;
        runningMatch?: RunningMatch;
        handleEnterLobby: (playerName: string) => void;
        handleExitLobby: () => Promise<void>;
        handleCreateMatch: (gameName: string, numPlayers: number) => Promise<void>;
        handleJoinMatch: (gameName: string, matchID: string, playerID: string) => Promise<void>;
        handleLeaveMatch: (gameName: string, matchID: string) => Promise<void>;
        handleExitMatch: () => void;
        handleRefreshMatches: () => Promise<void>;
        handleStartMatch: (gameName: string, matchOpts: MatchOpts) => void;
    }) => JSX.Element;
};
declare type LobbyState = {
    phase: LobbyPhases;
    playerName: string;
    runningMatch?: RunningMatch;
    errorMsg: string;
    credentialStore?: {
        [playerName: string]: string;
    };
};
/**
 * Lobby
 *
 * React lobby component.
 *
 * @param {Array}  gameComponents - An array of Board and Game objects for the supported games.
 * @param {string} lobbyServer - Address of the lobby server (for example 'localhost:8000').
 *                               If not set, defaults to the server that served the page.
 * @param {string} gameServer - Address of the game server (for example 'localhost:8001').
 *                              If not set, defaults to the server that served the page.
 * @param {function} clientFactory - Function that is used to create the game clients.
 * @param {number} refreshInterval - Interval between server updates (default: 2000ms).
 * @param {bool}   debug - Enable debug information (default: false).
 *
 * Returns:
 *   A React component that provides a UI to create, list, join, leave, play or
 *   spectate matches (game instances).
 */
declare class Lobby extends React.Component<LobbyProps, LobbyState> {
    static propTypes: {
        gameComponents: PropTypes.Validator<any[]>;
        lobbyServer: PropTypes.Requireable<string>;
        gameServer: PropTypes.Requireable<string>;
        debug: PropTypes.Requireable<boolean>;
        clientFactory: PropTypes.Requireable<(...args: any[]) => any>;
        refreshInterval: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        debug: boolean;
        clientFactory: typeof Client;
        refreshInterval: number;
    };
    state: {
        phase: LobbyPhases;
        playerName: string;
        runningMatch: any;
        errorMsg: string;
        credentialStore: {};
    };
    private connection?;
    private _currentInterval?;
    constructor(props: LobbyProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: LobbyProps, prevState: LobbyState): void;
    componentWillUnmount(): void;
    _startRefreshInterval(): void;
    _clearRefreshInterval(): void;
    _createConnection: (props: LobbyProps) => void;
    _updateCredentials: (playerName: string, credentials: string) => void;
    _updateConnection: () => Promise<void>;
    _enterLobby: (playerName: string) => void;
    _exitLobby: () => Promise<void>;
    _createMatch: (gameName: string, numPlayers: number) => Promise<void>;
    _joinMatch: (gameName: string, matchID: string, playerID: string) => Promise<void>;
    _leaveMatch: (gameName: string, matchID: string) => Promise<void>;
    _startMatch: (gameName: string, matchOpts: MatchOpts) => void;
    _exitMatch: () => void;
    _getPhaseVisibility: (phase: LobbyPhases) => "hidden" | "phase";
    renderMatches: (matches: LobbyAPI.MatchList['matches'], playerName: string) => JSX.Element[];
    render(): JSX.Element;
}
export default Lobby;
