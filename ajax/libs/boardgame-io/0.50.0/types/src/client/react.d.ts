import React from 'react';
import PropTypes from 'prop-types';
import type { ClientOpts, ClientState, _ClientImpl } from './client';
declare type WrappedBoardDelegates = 'matchID' | 'playerID' | 'credentials';
export declare type WrappedBoardProps = Pick<ClientOpts, WrappedBoardDelegates | 'debug'>;
declare type ExposedClientProps<G extends any = any> = Pick<_ClientImpl<G>, 'log' | 'moves' | 'events' | 'reset' | 'undo' | 'redo' | 'playerID' | 'matchID' | 'matchData' | 'sendChatMessage' | 'chatMessages'>;
export declare type BoardProps<G extends any = any> = ClientState<G> & Omit<WrappedBoardProps, keyof ExposedClientProps<G>> & ExposedClientProps<G> & {
    isMultiplayer: boolean;
};
declare type ReactClientOpts<G extends any = any, P extends BoardProps<G> = BoardProps<G>, PluginAPIs extends Record<string, unknown> = Record<string, unknown>> = Omit<ClientOpts<G, PluginAPIs>, WrappedBoardDelegates> & {
    board?: React.ComponentType<P>;
    loading?: React.ComponentType;
};
/**
 * Client
 *
 * boardgame.io React client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} board - The React component for the game.
 * @param {...object} loading - (optional) The React component for the loading state.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} debug - Enables the Debug UI.
 * @param {...object} enhancer - Optional enhancer to send to the Redux store
 *
 * Returns:
 *   A React component that wraps board and provides an
 *   API through props for it to interact with the framework
 *   and dispatch actions such as MAKE_MOVE, GAME_EVENT, RESET,
 *   UNDO and REDO.
 */
export declare function Client<G extends any = any, P extends BoardProps<G> = BoardProps<G>, PluginAPIs extends Record<string, unknown> = Record<string, unknown>>(opts: ReactClientOpts<G, P, PluginAPIs>): {
    new (props: Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>): {
        client: _ClientImpl<G>;
        unsubscribe?: () => void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>): void;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>>, prevState: Readonly<{}>): any;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<ClientOpts<any, Record<string, unknown>>, "matchID" | "playerID" | "credentials" | "debug"> & Pick<P, Exclude<keyof P, "matchID" | "playerID" | "credentials" | "debug" | "log" | "moves" | "events" | "reset" | "undo" | "redo" | "matchData" | "sendChatMessage" | "chatMessages" | "plugins" | "deltalog" | "G" | "ctx" | "_undo" | "_redo" | "_stateID" | "isActive" | "isConnected" | "isMultiplayer">>>, nextState: Readonly<{}>, nextContext: any): void;
    };
    propTypes: {
        matchID: PropTypes.Requireable<string>;
        playerID: PropTypes.Requireable<string>;
        credentials: PropTypes.Requireable<string>;
        debug: PropTypes.Requireable<any>;
    };
    defaultProps: {
        matchID: string;
        playerID: any;
        credentials: any;
        debug: boolean;
    };
    contextType?: React.Context<any>;
};
export {};
