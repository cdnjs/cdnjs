'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('nanoid/non-secure');
require('./Debug-710a6cb3.js');
require('redux');
require('./turn-order-4ab12333.js');
require('immer');
require('./plugin-random-7425844d.js');
require('lodash.isplainobject');
require('./reducer-6f7cf6b0.js');
require('rfc6902');
require('./initialize-648ccd94.js');
require('./transport-b1874dfa.js');
var client = require('./client-dde37916.js');
require('flatted');
require('setimmediate');
var ai = require('./ai-e933e60d.js');
var client$1 = require('./client-76dec77b.js');
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var Cookies = _interopDefault(require('react-cookies'));
require('./util-abef9b9f.js');
var socketio = require('./socketio-638b66b8.js');
require('./master-9bf9c1d4.js');
require('./filter-player-view-a8eeb11e.js');
require('socket.io-client');

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
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
function Client(opts) {
    var _a;
    const { game, numPlayers, board, multiplayer, enhancer } = opts;
    let { loading, debug } = opts;
    // Component that is displayed before the client has synced
    // with the game master.
    if (loading === undefined) {
        const Loading = () => React.createElement("div", { className: "bgio-loading" }, "connecting...");
        loading = Loading;
    }
    /*
     * WrappedBoard
     *
     * The main React component that wraps the passed in
     * board component and adds the API to its props.
     */
    return _a = class WrappedBoard extends React.Component {
            constructor(props) {
                super(props);
                if (debug === undefined) {
                    debug = props.debug;
                }
                this.client = client.Client({
                    game,
                    debug,
                    numPlayers,
                    multiplayer,
                    matchID: props.matchID,
                    playerID: props.playerID,
                    credentials: props.credentials,
                    enhancer,
                });
            }
            componentDidMount() {
                this.unsubscribe = this.client.subscribe(() => this.forceUpdate());
                this.client.start();
            }
            componentWillUnmount() {
                this.client.stop();
                this.unsubscribe();
            }
            componentDidUpdate(prevProps) {
                if (this.props.matchID != prevProps.matchID) {
                    this.client.updateMatchID(this.props.matchID);
                }
                if (this.props.playerID != prevProps.playerID) {
                    this.client.updatePlayerID(this.props.playerID);
                }
                if (this.props.credentials != prevProps.credentials) {
                    this.client.updateCredentials(this.props.credentials);
                }
            }
            render() {
                const state = this.client.getState();
                if (state === null) {
                    return React.createElement(loading);
                }
                let _board = null;
                if (board) {
                    _board = React.createElement(board, {
                        ...state,
                        ...this.props,
                        isMultiplayer: !!multiplayer,
                        moves: this.client.moves,
                        events: this.client.events,
                        matchID: this.client.matchID,
                        playerID: this.client.playerID,
                        reset: this.client.reset,
                        undo: this.client.undo,
                        redo: this.client.redo,
                        log: this.client.log,
                        matchData: this.client.matchData,
                        sendChatMessage: this.client.sendChatMessage,
                        chatMessages: this.client.chatMessages,
                    });
                }
                return React.createElement("div", { className: "bgio-client" }, _board);
            }
        },
        _a.propTypes = {
            // The ID of a game to connect to.
            // Only relevant in multiplayer.
            matchID: PropTypes.string,
            // The ID of the player associated with this client.
            // Only relevant in multiplayer.
            playerID: PropTypes.string,
            // This client's authentication credentials.
            // Only relevant in multiplayer.
            credentials: PropTypes.string,
            // Enable / disable the Debug UI.
            debug: PropTypes.any,
        },
        _a.defaultProps = {
            matchID: 'default',
            playerID: null,
            credentials: null,
            debug: true,
        },
        _a;
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
class _LobbyConnectionImpl {
    constructor({ server, gameComponents, playerName, playerCredentials, }) {
        this.client = new client$1.LobbyClient({ server });
        this.gameComponents = gameComponents;
        this.playerName = playerName || 'Visitor';
        this.playerCredentials = playerCredentials;
        this.matches = [];
    }
    async refresh() {
        try {
            this.matches = [];
            const games = await this.client.listGames();
            for (const game of games) {
                if (!this._getGameComponents(game))
                    continue;
                const { matches } = await this.client.listMatches(game);
                this.matches.push(...matches);
            }
        }
        catch (error) {
            throw new Error('failed to retrieve list of matches (' + error + ')');
        }
    }
    _getMatchInstance(matchID) {
        for (const inst of this.matches) {
            if (inst['matchID'] === matchID)
                return inst;
        }
    }
    _getGameComponents(gameName) {
        for (const comp of this.gameComponents) {
            if (comp.game.name === gameName)
                return comp;
        }
    }
    _findPlayer(playerName) {
        for (const inst of this.matches) {
            if (inst.players.some((player) => player.name === playerName))
                return inst;
        }
    }
    async join(gameName, matchID, playerID) {
        try {
            let inst = this._findPlayer(this.playerName);
            if (inst) {
                throw new Error('player has already joined ' + inst.matchID);
            }
            inst = this._getMatchInstance(matchID);
            if (!inst) {
                throw new Error('game instance ' + matchID + ' not found');
            }
            const json = await this.client.joinMatch(gameName, matchID, {
                playerID,
                playerName: this.playerName,
            });
            inst.players[Number.parseInt(playerID)].name = this.playerName;
            this.playerCredentials = json.playerCredentials;
        }
        catch (error) {
            throw new Error('failed to join match ' + matchID + ' (' + error + ')');
        }
    }
    async leave(gameName, matchID) {
        try {
            const inst = this._getMatchInstance(matchID);
            if (!inst)
                throw new Error('match instance not found');
            for (const player of inst.players) {
                if (player.name === this.playerName) {
                    await this.client.leaveMatch(gameName, matchID, {
                        playerID: player.id.toString(),
                        credentials: this.playerCredentials,
                    });
                    delete player.name;
                    delete this.playerCredentials;
                    return;
                }
            }
            throw new Error('player not found in match');
        }
        catch (error) {
            throw new Error('failed to leave match ' + matchID + ' (' + error + ')');
        }
    }
    async disconnect() {
        const inst = this._findPlayer(this.playerName);
        if (inst) {
            await this.leave(inst.gameName, inst.matchID);
        }
        this.matches = [];
        this.playerName = 'Visitor';
    }
    async create(gameName, numPlayers) {
        try {
            const comp = this._getGameComponents(gameName);
            if (!comp)
                throw new Error('game not found');
            if (numPlayers < comp.game.minPlayers ||
                numPlayers > comp.game.maxPlayers)
                throw new Error('invalid number of players ' + numPlayers);
            await this.client.createMatch(gameName, { numPlayers });
        }
        catch (error) {
            throw new Error('failed to create match for ' + gameName + ' (' + error + ')');
        }
    }
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
function LobbyConnection(opts) {
    return new _LobbyConnectionImpl(opts);
}

/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
class LobbyLoginForm extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            playerName: this.props.playerName,
            nameErrorMsg: '',
        };
        this.onClickEnter = () => {
            if (this.state.playerName === '')
                return;
            this.props.onEnter(this.state.playerName);
        };
        this.onKeyPress = (event) => {
            if (event.key === 'Enter') {
                this.onClickEnter();
            }
        };
        this.onChangePlayerName = (event) => {
            const name = event.target.value.trim();
            this.setState({
                playerName: name,
                nameErrorMsg: name.length > 0 ? '' : 'empty player name',
            });
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("p", { className: "phase-title" }, "Choose a player name:"),
            React.createElement("input", { type: "text", value: this.state.playerName, onChange: this.onChangePlayerName, onKeyPress: this.onKeyPress }),
            React.createElement("span", { className: "buttons" },
                React.createElement("button", { className: "buttons", onClick: this.onClickEnter }, "Enter")),
            React.createElement("br", null),
            React.createElement("span", { className: "error-msg" },
                this.state.nameErrorMsg,
                React.createElement("br", null))));
    }
}
LobbyLoginForm.defaultProps = {
    playerName: '',
};

/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
class LobbyMatchInstance extends React.Component {
    constructor() {
        super(...arguments);
        this._createSeat = (player) => {
            return player.name || '[free]';
        };
        this._createButtonJoin = (inst, seatId) => (React.createElement("button", { key: 'button-join-' + inst.matchID, onClick: () => this.props.onClickJoin(inst.gameName, inst.matchID, '' + seatId) }, "Join"));
        this._createButtonLeave = (inst) => (React.createElement("button", { key: 'button-leave-' + inst.matchID, onClick: () => this.props.onClickLeave(inst.gameName, inst.matchID) }, "Leave"));
        this._createButtonPlay = (inst, seatId) => (React.createElement("button", { key: 'button-play-' + inst.matchID, onClick: () => this.props.onClickPlay(inst.gameName, {
                matchID: inst.matchID,
                playerID: '' + seatId,
                numPlayers: inst.players.length,
            }) }, "Play"));
        this._createButtonSpectate = (inst) => (React.createElement("button", { key: 'button-spectate-' + inst.matchID, onClick: () => this.props.onClickPlay(inst.gameName, {
                matchID: inst.matchID,
                numPlayers: inst.players.length,
            }) }, "Spectate"));
        this._createInstanceButtons = (inst) => {
            const playerSeat = inst.players.find((player) => player.name === this.props.playerName);
            const freeSeat = inst.players.find((player) => !player.name);
            if (playerSeat && freeSeat) {
                // already seated: waiting for match to start
                return this._createButtonLeave(inst);
            }
            if (freeSeat) {
                // at least 1 seat is available
                return this._createButtonJoin(inst, freeSeat.id);
            }
            // match is full
            if (playerSeat) {
                return (React.createElement("div", null, [
                    this._createButtonPlay(inst, playerSeat.id),
                    this._createButtonLeave(inst),
                ]));
            }
            // allow spectating
            return this._createButtonSpectate(inst);
        };
    }
    render() {
        const match = this.props.match;
        let status = 'OPEN';
        if (!match.players.some((player) => !player.name)) {
            status = 'RUNNING';
        }
        return (React.createElement("tr", { key: 'line-' + match.matchID },
            React.createElement("td", { key: 'cell-name-' + match.matchID }, match.gameName),
            React.createElement("td", { key: 'cell-status-' + match.matchID }, status),
            React.createElement("td", { key: 'cell-seats-' + match.matchID }, match.players.map((player) => this._createSeat(player)).join(', ')),
            React.createElement("td", { key: 'cell-buttons-' + match.matchID }, this._createInstanceButtons(match))));
    }
}

/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
class LobbyCreateMatchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGame: 0,
            numPlayers: 2,
        };
        this._createGameNameOption = (game, idx) => {
            return (React.createElement("option", { key: 'name-option-' + idx, value: idx }, game.game.name));
        };
        this._createNumPlayersOption = (idx) => {
            return (React.createElement("option", { key: 'num-option-' + idx, value: idx }, idx));
        };
        this._createNumPlayersRange = (game) => {
            return Array.from({ length: game.maxPlayers + 1 })
                .map((_, i) => i)
                .slice(game.minPlayers);
        };
        this.onChangeNumPlayers = (event) => {
            this.setState({
                numPlayers: Number.parseInt(event.target.value),
            });
        };
        this.onChangeSelectedGame = (event) => {
            const idx = Number.parseInt(event.target.value);
            this.setState({
                selectedGame: idx,
                numPlayers: this.props.games[idx].game.minPlayers,
            });
        };
        this.onClickCreate = () => {
            this.props.createMatch(this.props.games[this.state.selectedGame].game.name, this.state.numPlayers);
        };
        /* fix min and max number of players */
        for (const game of props.games) {
            const matchDetails = game.game;
            if (!matchDetails.minPlayers) {
                matchDetails.minPlayers = 1;
            }
            if (!matchDetails.maxPlayers) {
                matchDetails.maxPlayers = 4;
            }
            console.assert(matchDetails.maxPlayers >= matchDetails.minPlayers);
        }
        this.state = {
            selectedGame: 0,
            numPlayers: props.games[0].game.minPlayers,
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("select", { value: this.state.selectedGame, onChange: (evt) => this.onChangeSelectedGame(evt) }, this.props.games.map((game, index) => this._createGameNameOption(game, index))),
            React.createElement("span", null, "Players:"),
            React.createElement("select", { value: this.state.numPlayers, onChange: this.onChangeNumPlayers }, this._createNumPlayersRange(this.props.games[this.state.selectedGame].game).map((number) => this._createNumPlayersOption(number))),
            React.createElement("span", { className: "buttons" },
                React.createElement("button", { onClick: this.onClickCreate }, "Create"))));
    }
}

/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var LobbyPhases;
(function (LobbyPhases) {
    LobbyPhases["ENTER"] = "enter";
    LobbyPhases["PLAY"] = "play";
    LobbyPhases["LIST"] = "list";
})(LobbyPhases || (LobbyPhases = {}));
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
class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: LobbyPhases.ENTER,
            playerName: 'Visitor',
            runningMatch: null,
            errorMsg: '',
            credentialStore: {},
        };
        this._createConnection = (props) => {
            const name = this.state.playerName;
            this.connection = LobbyConnection({
                server: props.lobbyServer,
                gameComponents: props.gameComponents,
                playerName: name,
                playerCredentials: this.state.credentialStore[name],
            });
        };
        this._updateCredentials = (playerName, credentials) => {
            this.setState((prevState) => {
                // clone store or componentDidUpdate will not be triggered
                const store = Object.assign({}, prevState.credentialStore);
                store[playerName] = credentials;
                return { credentialStore: store };
            });
        };
        this._updateConnection = async () => {
            await this.connection.refresh();
            this.forceUpdate();
        };
        this._enterLobby = (playerName) => {
            this._startRefreshInterval();
            this.setState({ playerName, phase: LobbyPhases.LIST });
        };
        this._exitLobby = async () => {
            this._clearRefreshInterval();
            await this.connection.disconnect();
            this.setState({ phase: LobbyPhases.ENTER, errorMsg: '' });
        };
        this._createMatch = async (gameName, numPlayers) => {
            try {
                await this.connection.create(gameName, numPlayers);
                await this.connection.refresh();
                // rerender
                this.setState({});
            }
            catch (error) {
                this.setState({ errorMsg: error.message });
            }
        };
        this._joinMatch = async (gameName, matchID, playerID) => {
            try {
                await this.connection.join(gameName, matchID, playerID);
                await this.connection.refresh();
                this._updateCredentials(this.connection.playerName, this.connection.playerCredentials);
            }
            catch (error) {
                this.setState({ errorMsg: error.message });
            }
        };
        this._leaveMatch = async (gameName, matchID) => {
            try {
                await this.connection.leave(gameName, matchID);
                await this.connection.refresh();
                this._updateCredentials(this.connection.playerName, this.connection.playerCredentials);
            }
            catch (error) {
                this.setState({ errorMsg: error.message });
            }
        };
        this._startMatch = (gameName, matchOpts) => {
            const gameCode = this.connection._getGameComponents(gameName);
            if (!gameCode) {
                this.setState({
                    errorMsg: 'game ' + gameName + ' not supported',
                });
                return;
            }
            let multiplayer = undefined;
            if (matchOpts.numPlayers > 1) {
                multiplayer = this.props.gameServer
                    ? socketio.SocketIO({ server: this.props.gameServer })
                    : socketio.SocketIO();
            }
            if (matchOpts.numPlayers == 1) {
                const maxPlayers = gameCode.game.maxPlayers;
                const bots = {};
                for (let i = 1; i < maxPlayers; i++) {
                    bots[i + ''] = ai.MCTSBot;
                }
                multiplayer = socketio.Local({ bots });
            }
            const app = this.props.clientFactory({
                game: gameCode.game,
                board: gameCode.board,
                debug: this.props.debug,
                multiplayer,
            });
            const match = {
                app: app,
                matchID: matchOpts.matchID,
                playerID: matchOpts.numPlayers > 1 ? matchOpts.playerID : '0',
                credentials: this.connection.playerCredentials,
            };
            this._clearRefreshInterval();
            this.setState({ phase: LobbyPhases.PLAY, runningMatch: match });
        };
        this._exitMatch = () => {
            this._startRefreshInterval();
            this.setState({ phase: LobbyPhases.LIST, runningMatch: null });
        };
        this._getPhaseVisibility = (phase) => {
            return this.state.phase !== phase ? 'hidden' : 'phase';
        };
        this.renderMatches = (matches, playerName) => {
            return matches.map((match) => {
                const { matchID, gameName, players } = match;
                return (React.createElement(LobbyMatchInstance, { key: 'instance-' + matchID, match: { matchID, gameName, players: Object.values(players) }, playerName: playerName, onClickJoin: this._joinMatch, onClickLeave: this._leaveMatch, onClickPlay: this._startMatch }));
            });
        };
        this._createConnection(this.props);
    }
    componentDidMount() {
        const cookie = Cookies.load('lobbyState') || {};
        if (cookie.phase && cookie.phase === LobbyPhases.PLAY) {
            cookie.phase = LobbyPhases.LIST;
        }
        if (cookie.phase && cookie.phase !== LobbyPhases.ENTER) {
            this._startRefreshInterval();
        }
        this.setState({
            phase: cookie.phase || LobbyPhases.ENTER,
            playerName: cookie.playerName || 'Visitor',
            credentialStore: cookie.credentialStore || {},
        });
    }
    componentDidUpdate(prevProps, prevState) {
        const name = this.state.playerName;
        const creds = this.state.credentialStore[name];
        if (prevState.phase !== this.state.phase ||
            prevState.credentialStore[name] !== creds ||
            prevState.playerName !== name) {
            this._createConnection(this.props);
            this._updateConnection();
            const cookie = {
                phase: this.state.phase,
                playerName: name,
                credentialStore: this.state.credentialStore,
            };
            Cookies.save('lobbyState', cookie, { path: '/' });
        }
        if (prevProps.refreshInterval !== this.props.refreshInterval) {
            this._startRefreshInterval();
        }
    }
    componentWillUnmount() {
        this._clearRefreshInterval();
    }
    _startRefreshInterval() {
        this._clearRefreshInterval();
        this._currentInterval = setInterval(this._updateConnection, this.props.refreshInterval);
    }
    _clearRefreshInterval() {
        clearInterval(this._currentInterval);
    }
    render() {
        const { gameComponents, renderer } = this.props;
        const { errorMsg, playerName, phase, runningMatch } = this.state;
        if (renderer) {
            return renderer({
                errorMsg,
                gameComponents,
                matches: this.connection.matches,
                phase,
                playerName,
                runningMatch,
                handleEnterLobby: this._enterLobby,
                handleExitLobby: this._exitLobby,
                handleCreateMatch: this._createMatch,
                handleJoinMatch: this._joinMatch,
                handleLeaveMatch: this._leaveMatch,
                handleExitMatch: this._exitMatch,
                handleRefreshMatches: this._updateConnection,
                handleStartMatch: this._startMatch,
            });
        }
        return (React.createElement("div", { id: "lobby-view", style: { padding: 50 } },
            React.createElement("div", { className: this._getPhaseVisibility(LobbyPhases.ENTER) },
                React.createElement(LobbyLoginForm, { key: playerName, playerName: playerName, onEnter: this._enterLobby })),
            React.createElement("div", { className: this._getPhaseVisibility(LobbyPhases.LIST) },
                React.createElement("p", null,
                    "Welcome, ",
                    playerName),
                React.createElement("div", { className: "phase-title", id: "match-creation" },
                    React.createElement("span", null, "Create a match:"),
                    React.createElement(LobbyCreateMatchForm, { games: gameComponents, createMatch: this._createMatch })),
                React.createElement("p", { className: "phase-title" }, "Join a match:"),
                React.createElement("div", { id: "instances" },
                    React.createElement("table", null,
                        React.createElement("tbody", null, this.renderMatches(this.connection.matches, playerName))),
                    React.createElement("span", { className: "error-msg" },
                        errorMsg,
                        React.createElement("br", null))),
                React.createElement("p", { className: "phase-title" }, "Matches that become empty are automatically deleted.")),
            React.createElement("div", { className: this._getPhaseVisibility(LobbyPhases.PLAY) },
                runningMatch && (React.createElement(runningMatch.app, { matchID: runningMatch.matchID, playerID: runningMatch.playerID, credentials: runningMatch.credentials })),
                React.createElement("div", { className: "buttons", id: "match-exit" },
                    React.createElement("button", { onClick: this._exitMatch }, "Exit match"))),
            React.createElement("div", { className: "buttons", id: "lobby-exit" },
                React.createElement("button", { onClick: this._exitLobby }, "Exit lobby"))));
    }
}
Lobby.propTypes = {
    gameComponents: PropTypes.array.isRequired,
    lobbyServer: PropTypes.string,
    gameServer: PropTypes.string,
    debug: PropTypes.bool,
    clientFactory: PropTypes.func,
    refreshInterval: PropTypes.number,
};
Lobby.defaultProps = {
    debug: false,
    clientFactory: Client,
    refreshInterval: 2000,
};

exports.Client = Client;
exports.Lobby = Lobby;
