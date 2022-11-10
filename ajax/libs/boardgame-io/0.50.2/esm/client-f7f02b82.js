import { nanoid } from 'nanoid/non-secure';
import { D as Debug } from './Debug-8242c26e.js';
import { applyMiddleware, compose, createStore } from 'redux';
import { u as reset, v as undo, w as redo, s as sync, x as PlayerView, A as ActionCreators, k as SYNC, l as UPDATE, P as PATCH, m as RESET, R as REDO, j as UNDO, o as GAME_EVENT, M as MAKE_MOVE, p as STRIP_TRANSIENTS, y as patch, z as update } from './turn-order-8cc4909b.js';
import { P as ProcessGameConfig, C as CreateGameReducer, T as TransientHandlingMiddleware } from './reducer-24ea3e4c.js';
import { I as InitializeGame } from './initialize-7316768f.js';
import { T as Transport } from './transport-ce07b771.js';

/**
 * This class doesn’t do anything, but simplifies the client class by providing
 * dummy functions to call, so we don’t need to mock them in the client.
 */
class DummyImpl extends Transport {
    connect() { }
    disconnect() { }
    sendAction() { }
    sendChatMessage() { }
    requestSync() { }
    updateCredentials() { }
    updateMatchID() { }
    updatePlayerID() { }
}
const DummyTransport = (opts) => new DummyImpl(opts);

/**
 * Class to manage boardgame.io clients and limit debug panel rendering.
 */
class ClientManager {
    constructor() {
        this.debugPanel = null;
        this.currentClient = null;
        this.clients = new Map();
        this.subscribers = new Map();
    }
    /**
     * Register a client with the client manager.
     */
    register(client) {
        // Add client to clients map.
        this.clients.set(client, client);
        // Mount debug for this client (no-op if another debug is already mounted).
        this.mountDebug(client);
        this.notifySubscribers();
    }
    /**
     * Unregister a client from the client manager.
     */
    unregister(client) {
        // Remove client from clients map.
        this.clients.delete(client);
        if (this.currentClient === client) {
            // If the removed client owned the debug panel, unmount it.
            this.unmountDebug();
            // Mount debug panel for next available client.
            for (const [client] of this.clients) {
                if (this.debugPanel)
                    break;
                this.mountDebug(client);
            }
        }
        this.notifySubscribers();
    }
    /**
     * Subscribe to the client manager state.
     * Calls the passed callback each time the current client changes or a client
     * registers/unregisters.
     * Returns a function to unsubscribe from the state updates.
     */
    subscribe(callback) {
        const id = Symbol();
        this.subscribers.set(id, callback);
        callback(this.getState());
        return () => {
            this.subscribers.delete(id);
        };
    }
    /**
     * Switch to a client with a matching playerID.
     */
    switchPlayerID(playerID) {
        // For multiplayer clients, try switching control to a different client
        // that is using the same transport layer.
        if (this.currentClient.multiplayer) {
            for (const [client] of this.clients) {
                if (client.playerID === playerID &&
                    client.debugOpt !== false &&
                    client.multiplayer === this.currentClient.multiplayer) {
                    this.switchToClient(client);
                    return;
                }
            }
        }
        // If no client matches, update the playerID for the current client.
        this.currentClient.updatePlayerID(playerID);
        this.notifySubscribers();
    }
    /**
     * Set the passed client as the active client for debugging.
     */
    switchToClient(client) {
        if (client === this.currentClient)
            return;
        this.unmountDebug();
        this.mountDebug(client);
        this.notifySubscribers();
    }
    /**
     * Notify all subscribers of changes to the client manager state.
     */
    notifySubscribers() {
        const arg = this.getState();
        this.subscribers.forEach((cb) => {
            cb(arg);
        });
    }
    /**
     * Get the client manager state.
     */
    getState() {
        return {
            client: this.currentClient,
            debuggableClients: this.getDebuggableClients(),
        };
    }
    /**
     * Get an array of the registered clients that haven’t disabled the debug panel.
     */
    getDebuggableClients() {
        return [...this.clients.values()].filter((client) => client.debugOpt !== false);
    }
    /**
     * Mount the debug panel using the passed client.
     */
    mountDebug(client) {
        if (client.debugOpt === false ||
            this.debugPanel !== null ||
            typeof document === 'undefined') {
            return;
        }
        let DebugImpl;
        let target = document.body;
        if (process.env.NODE_ENV !== 'production') {
            DebugImpl = Debug;
        }
        if (client.debugOpt && client.debugOpt !== true) {
            DebugImpl = client.debugOpt.impl || DebugImpl;
            target = client.debugOpt.target || target;
        }
        if (DebugImpl) {
            this.currentClient = client;
            this.debugPanel = new DebugImpl({
                target,
                props: { clientManager: this },
            });
        }
    }
    /**
     * Unmount the debug panel.
     */
    unmountDebug() {
        this.debugPanel.$destroy();
        this.debugPanel = null;
        this.currentClient = null;
    }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Global client manager instance that all clients register with.
 */
const GlobalClientManager = new ClientManager();
/**
 * Standardise the passed playerID, using currentPlayer if appropriate.
 */
function assumedPlayerID(playerID, store, multiplayer) {
    // In singleplayer mode, if the client does not have a playerID
    // associated with it, we attach the currentPlayer as playerID.
    if (!multiplayer && (playerID === null || playerID === undefined)) {
        const state = store.getState();
        playerID = state.ctx.currentPlayer;
    }
    return playerID;
}
/**
 * createDispatchers
 *
 * Create action dispatcher wrappers with bound playerID and credentials
 */
function createDispatchers(storeActionType, innerActionNames, store, playerID, credentials, multiplayer) {
    const dispatchers = {};
    for (const name of innerActionNames) {
        dispatchers[name] = (...args) => {
            const action = ActionCreators[storeActionType](name, args, assumedPlayerID(playerID, store, multiplayer), credentials);
            store.dispatch(action);
        };
    }
    return dispatchers;
}
// Creates a set of dispatchers to make moves.
const createMoveDispatchers = createDispatchers.bind(null, 'makeMove');
// Creates a set of dispatchers to dispatch game flow events.
const createEventDispatchers = createDispatchers.bind(null, 'gameEvent');
// Creates a set of dispatchers to dispatch actions to plugins.
const createPluginDispatchers = createDispatchers.bind(null, 'plugin');
/**
 * Implementation of Client (see below).
 */
class _ClientImpl {
    constructor({ game, debug, numPlayers, multiplayer, matchID: matchID, playerID, credentials, enhancer, }) {
        this.game = ProcessGameConfig(game);
        this.playerID = playerID;
        this.matchID = matchID || 'default';
        this.credentials = credentials;
        this.multiplayer = multiplayer;
        this.debugOpt = debug;
        this.manager = GlobalClientManager;
        this.gameStateOverride = null;
        this.subscribers = {};
        this._running = false;
        this.reducer = CreateGameReducer({
            game: this.game,
            isClient: multiplayer !== undefined,
        });
        this.initialState = null;
        if (!multiplayer) {
            this.initialState = InitializeGame({ game: this.game, numPlayers });
        }
        this.reset = () => {
            this.store.dispatch(reset(this.initialState));
        };
        this.undo = () => {
            const undo$1 = undo(assumedPlayerID(this.playerID, this.store, this.multiplayer), this.credentials);
            this.store.dispatch(undo$1);
        };
        this.redo = () => {
            const redo$1 = redo(assumedPlayerID(this.playerID, this.store, this.multiplayer), this.credentials);
            this.store.dispatch(redo$1);
        };
        this.log = [];
        /**
         * Middleware that manages the log object.
         * Reducers generate deltalogs, which are log events
         * that are the result of application of a single action.
         * The master may also send back a deltalog or the entire
         * log depending on the type of request.
         * The middleware below takes care of all these cases while
         * managing the log object.
         */
        const LogMiddleware = (store) => (next) => (action) => {
            const result = next(action);
            const state = store.getState();
            switch (action.type) {
                case MAKE_MOVE:
                case GAME_EVENT:
                case UNDO:
                case REDO: {
                    const deltalog = state.deltalog;
                    this.log = [...this.log, ...deltalog];
                    break;
                }
                case RESET: {
                    this.log = [];
                    break;
                }
                case PATCH:
                case UPDATE: {
                    let id = -1;
                    if (this.log.length > 0) {
                        id = this.log[this.log.length - 1]._stateID;
                    }
                    let deltalog = action.deltalog || [];
                    // Filter out actions that are already present
                    // in the current log. This may occur when the
                    // client adds an entry to the log followed by
                    // the update from the master here.
                    deltalog = deltalog.filter((l) => l._stateID > id);
                    this.log = [...this.log, ...deltalog];
                    break;
                }
                case SYNC: {
                    this.initialState = action.initialState;
                    this.log = action.log || [];
                    break;
                }
            }
            return result;
        };
        /**
         * Middleware that intercepts actions and sends them to the master,
         * which keeps the authoritative version of the state.
         */
        const TransportMiddleware = (store) => (next) => (action) => {
            const baseState = store.getState();
            const result = next(action);
            if (!('clientOnly' in action) &&
                action.type !== STRIP_TRANSIENTS) {
                this.transport.sendAction(baseState, action);
            }
            return result;
        };
        /**
         * Middleware that intercepts actions and invokes the subscription callback.
         */
        const SubscriptionMiddleware = () => (next) => (action) => {
            const result = next(action);
            this.notifySubscribers();
            return result;
        };
        const middleware = applyMiddleware(TransientHandlingMiddleware, SubscriptionMiddleware, TransportMiddleware, LogMiddleware);
        enhancer =
            enhancer !== undefined ? compose(middleware, enhancer) : middleware;
        this.store = createStore(this.reducer, this.initialState, enhancer);
        if (!multiplayer)
            multiplayer = DummyTransport;
        this.transport = multiplayer({
            transportDataCallback: (data) => this.receiveTransportData(data),
            gameKey: game,
            game: this.game,
            matchID,
            playerID,
            credentials,
            gameName: this.game.name,
            numPlayers,
        });
        this.createDispatchers();
        this.chatMessages = [];
        this.sendChatMessage = (payload) => {
            this.transport.sendChatMessage(this.matchID, {
                id: nanoid(7),
                sender: this.playerID,
                payload: payload,
            });
        };
    }
    /** Handle incoming match data from a multiplayer transport. */
    receiveMatchData(matchData) {
        this.matchData = matchData;
        this.notifySubscribers();
    }
    /** Handle an incoming chat message from a multiplayer transport. */
    receiveChatMessage(message) {
        this.chatMessages = [...this.chatMessages, message];
        this.notifySubscribers();
    }
    /** Handle all incoming updates from a multiplayer transport. */
    receiveTransportData(data) {
        const [matchID] = data.args;
        if (matchID !== this.matchID)
            return;
        switch (data.type) {
            case 'sync': {
                const [, syncInfo] = data.args;
                const action = sync(syncInfo);
                this.receiveMatchData(syncInfo.filteredMetadata);
                this.store.dispatch(action);
                break;
            }
            case 'update': {
                const [, state, deltalog] = data.args;
                const currentState = this.store.getState();
                if (state._stateID >= currentState._stateID) {
                    const action = update(state, deltalog);
                    this.store.dispatch(action);
                }
                break;
            }
            case 'patch': {
                const [, prevStateID, stateID, patch$1, deltalog] = data.args;
                const currentStateID = this.store.getState()._stateID;
                if (prevStateID !== currentStateID)
                    break;
                const action = patch(prevStateID, stateID, patch$1, deltalog);
                this.store.dispatch(action);
                // Emit sync if patch apply failed.
                if (this.store.getState()._stateID === currentStateID) {
                    this.transport.requestSync();
                }
                break;
            }
            case 'matchData': {
                const [, matchData] = data.args;
                this.receiveMatchData(matchData);
                break;
            }
            case 'chat': {
                const [, chatMessage] = data.args;
                this.receiveChatMessage(chatMessage);
                break;
            }
        }
    }
    notifySubscribers() {
        Object.values(this.subscribers).forEach((fn) => fn(this.getState()));
    }
    overrideGameState(state) {
        this.gameStateOverride = state;
        this.notifySubscribers();
    }
    start() {
        this.transport.connect();
        this._running = true;
        this.manager.register(this);
    }
    stop() {
        this.transport.disconnect();
        this._running = false;
        this.manager.unregister(this);
    }
    subscribe(fn) {
        const id = Object.keys(this.subscribers).length;
        this.subscribers[id] = fn;
        this.transport.subscribeToConnectionStatus(() => this.notifySubscribers());
        if (this._running || !this.multiplayer) {
            fn(this.getState());
        }
        // Return a handle that allows the caller to unsubscribe.
        return () => {
            delete this.subscribers[id];
        };
    }
    getInitialState() {
        return this.initialState;
    }
    getState() {
        let state = this.store.getState();
        if (this.gameStateOverride !== null) {
            state = this.gameStateOverride;
        }
        // This is the state before a sync with the game master.
        if (state === null) {
            return state;
        }
        // isActive.
        let isActive = true;
        const isPlayerActive = this.game.flow.isPlayerActive(state.G, state.ctx, this.playerID);
        if (this.multiplayer && !isPlayerActive) {
            isActive = false;
        }
        if (!this.multiplayer &&
            this.playerID !== null &&
            this.playerID !== undefined &&
            !isPlayerActive) {
            isActive = false;
        }
        if (state.ctx.gameover !== undefined) {
            isActive = false;
        }
        // Secrets are normally stripped on the server,
        // but we also strip them here so that game developers
        // can see their effects while prototyping.
        // Do not strip again if this is a multiplayer game
        // since the server has already stripped secret info. (issue #818)
        if (!this.multiplayer) {
            state = {
                ...state,
                G: this.game.playerView({
                    G: state.G,
                    ctx: state.ctx,
                    playerID: this.playerID,
                }),
                plugins: PlayerView(state, this),
            };
        }
        // Combine into return value.
        return {
            ...state,
            log: this.log,
            isActive,
            isConnected: this.transport.isConnected,
        };
    }
    createDispatchers() {
        this.moves = createMoveDispatchers(this.game.moveNames, this.store, this.playerID, this.credentials, this.multiplayer);
        this.events = createEventDispatchers(this.game.flow.enabledEventNames, this.store, this.playerID, this.credentials, this.multiplayer);
        this.plugins = createPluginDispatchers(this.game.pluginNames, this.store, this.playerID, this.credentials, this.multiplayer);
    }
    updatePlayerID(playerID) {
        this.playerID = playerID;
        this.createDispatchers();
        this.transport.updatePlayerID(playerID);
        this.notifySubscribers();
    }
    updateMatchID(matchID) {
        this.matchID = matchID;
        this.createDispatchers();
        this.transport.updateMatchID(matchID);
        this.notifySubscribers();
    }
    updateCredentials(credentials) {
        this.credentials = credentials;
        this.createDispatchers();
        this.transport.updateCredentials(credentials);
        this.notifySubscribers();
    }
}
/**
 * Client
 *
 * boardgame.io JS client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} matchID - The matchID that you want to connect to.
 * @param {...object} playerID - The playerID associated with this client.
 * @param {...string} credentials - The authentication credentials associated with this client.
 *
 * Returns:
 *   A JS object that provides an API to interact with the
 *   game by dispatching moves and events.
 */
function Client(opts) {
    return new _ClientImpl(opts);
}

export { Client as C };
