'use strict';

var turnOrder = require('./turn-order-4ab12333.js');
var rfc6902 = require('rfc6902');

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
function Flow({ moves, phases, endIf, onEnd, turn, events, plugins, }) {
    // Attach defaults.
    if (moves === undefined) {
        moves = {};
    }
    if (events === undefined) {
        events = {};
    }
    if (plugins === undefined) {
        plugins = [];
    }
    if (phases === undefined) {
        phases = {};
    }
    if (!endIf)
        endIf = () => undefined;
    if (!onEnd)
        onEnd = ({ G }) => G;
    if (!turn)
        turn = {};
    const phaseMap = { ...phases };
    if ('' in phaseMap) {
        turnOrder.error('cannot specify phase with empty name');
    }
    phaseMap[''] = {};
    const moveMap = {};
    const moveNames = new Set();
    let startingPhase = null;
    Object.keys(moves).forEach((name) => moveNames.add(name));
    const HookWrapper = (hook, hookType) => {
        const withPlugins = turnOrder.FnWrap(hook, hookType, plugins);
        return (state) => {
            const pluginAPIs = turnOrder.GetAPIs(state);
            return withPlugins({
                ...pluginAPIs,
                G: state.G,
                ctx: state.ctx,
                playerID: state.playerID,
            });
        };
    };
    const TriggerWrapper = (trigger) => {
        return (state) => {
            const pluginAPIs = turnOrder.GetAPIs(state);
            return trigger({
                ...pluginAPIs,
                G: state.G,
                ctx: state.ctx,
            });
        };
    };
    const wrapped = {
        onEnd: HookWrapper(onEnd, turnOrder.GameMethod.GAME_ON_END),
        endIf: TriggerWrapper(endIf),
    };
    for (const phase in phaseMap) {
        const phaseConfig = phaseMap[phase];
        if (phaseConfig.start === true) {
            startingPhase = phase;
        }
        if (phaseConfig.moves !== undefined) {
            for (const move of Object.keys(phaseConfig.moves)) {
                moveMap[phase + '.' + move] = phaseConfig.moves[move];
                moveNames.add(move);
            }
        }
        if (phaseConfig.endIf === undefined) {
            phaseConfig.endIf = () => undefined;
        }
        if (phaseConfig.onBegin === undefined) {
            phaseConfig.onBegin = ({ G }) => G;
        }
        if (phaseConfig.onEnd === undefined) {
            phaseConfig.onEnd = ({ G }) => G;
        }
        if (phaseConfig.turn === undefined) {
            phaseConfig.turn = turn;
        }
        if (phaseConfig.turn.order === undefined) {
            phaseConfig.turn.order = turnOrder.TurnOrder.DEFAULT;
        }
        if (phaseConfig.turn.onBegin === undefined) {
            phaseConfig.turn.onBegin = ({ G }) => G;
        }
        if (phaseConfig.turn.onEnd === undefined) {
            phaseConfig.turn.onEnd = ({ G }) => G;
        }
        if (phaseConfig.turn.endIf === undefined) {
            phaseConfig.turn.endIf = () => false;
        }
        if (phaseConfig.turn.onMove === undefined) {
            phaseConfig.turn.onMove = ({ G }) => G;
        }
        if (phaseConfig.turn.stages === undefined) {
            phaseConfig.turn.stages = {};
        }
        // turns previously treated moveLimit as both minMoves and maxMoves, this behaviour is kept intentionally
        turnOrder.supportDeprecatedMoveLimit(phaseConfig.turn, true);
        for (const stage in phaseConfig.turn.stages) {
            const stageConfig = phaseConfig.turn.stages[stage];
            const moves = stageConfig.moves || {};
            for (const move of Object.keys(moves)) {
                const key = phase + '.' + stage + '.' + move;
                moveMap[key] = moves[move];
                moveNames.add(move);
            }
        }
        phaseConfig.wrapped = {
            onBegin: HookWrapper(phaseConfig.onBegin, turnOrder.GameMethod.PHASE_ON_BEGIN),
            onEnd: HookWrapper(phaseConfig.onEnd, turnOrder.GameMethod.PHASE_ON_END),
            endIf: TriggerWrapper(phaseConfig.endIf),
        };
        phaseConfig.turn.wrapped = {
            onMove: HookWrapper(phaseConfig.turn.onMove, turnOrder.GameMethod.TURN_ON_MOVE),
            onBegin: HookWrapper(phaseConfig.turn.onBegin, turnOrder.GameMethod.TURN_ON_BEGIN),
            onEnd: HookWrapper(phaseConfig.turn.onEnd, turnOrder.GameMethod.TURN_ON_END),
            endIf: TriggerWrapper(phaseConfig.turn.endIf),
        };
        if (typeof phaseConfig.next !== 'function') {
            const { next } = phaseConfig;
            phaseConfig.next = () => next || null;
        }
        phaseConfig.wrapped.next = TriggerWrapper(phaseConfig.next);
    }
    function GetPhase(ctx) {
        return ctx.phase ? phaseMap[ctx.phase] : phaseMap[''];
    }
    function OnMove(state) {
        return state;
    }
    function Process(state, events) {
        const phasesEnded = new Set();
        const turnsEnded = new Set();
        for (let i = 0; i < events.length; i++) {
            const { fn, arg, ...rest } = events[i];
            // Detect a loop of EndPhase calls.
            // This could potentially even be an infinite loop
            // if the endIf condition of each phase blindly
            // returns true. The moment we detect a single
            // loop, we just bail out of all phases.
            if (fn === EndPhase) {
                turnsEnded.clear();
                const phase = state.ctx.phase;
                if (phasesEnded.has(phase)) {
                    const ctx = { ...state.ctx, phase: null };
                    return { ...state, ctx };
                }
                phasesEnded.add(phase);
            }
            // Process event.
            const next = [];
            state = fn(state, {
                ...rest,
                arg,
                next,
            });
            if (fn === EndGame) {
                break;
            }
            // Check if we should end the game.
            const shouldEndGame = ShouldEndGame(state);
            if (shouldEndGame) {
                events.push({
                    fn: EndGame,
                    arg: shouldEndGame,
                    turn: state.ctx.turn,
                    phase: state.ctx.phase,
                    automatic: true,
                });
                continue;
            }
            // Check if we should end the phase.
            const shouldEndPhase = ShouldEndPhase(state);
            if (shouldEndPhase) {
                events.push({
                    fn: EndPhase,
                    arg: shouldEndPhase,
                    turn: state.ctx.turn,
                    phase: state.ctx.phase,
                    automatic: true,
                });
                continue;
            }
            // Check if we should end the turn.
            if ([OnMove, UpdateStage, UpdateActivePlayers].includes(fn)) {
                const shouldEndTurn = ShouldEndTurn(state);
                if (shouldEndTurn) {
                    events.push({
                        fn: EndTurn,
                        arg: shouldEndTurn,
                        turn: state.ctx.turn,
                        phase: state.ctx.phase,
                        automatic: true,
                    });
                    continue;
                }
            }
            events.push(...next);
        }
        return state;
    }
    ///////////
    // Start //
    ///////////
    function StartGame(state, { next }) {
        next.push({ fn: StartPhase });
        return state;
    }
    function StartPhase(state, { next }) {
        let { G, ctx } = state;
        const phaseConfig = GetPhase(ctx);
        // Run any phase setup code provided by the user.
        G = phaseConfig.wrapped.onBegin(state);
        next.push({ fn: StartTurn });
        return { ...state, G, ctx };
    }
    function StartTurn(state, { currentPlayer }) {
        let { ctx } = state;
        const phaseConfig = GetPhase(ctx);
        // Initialize the turn order state.
        if (currentPlayer) {
            ctx = { ...ctx, currentPlayer };
            if (phaseConfig.turn.activePlayers) {
                ctx = turnOrder.SetActivePlayers(ctx, phaseConfig.turn.activePlayers);
            }
        }
        else {
            // This is only called at the beginning of the phase
            // when there is no currentPlayer yet.
            ctx = turnOrder.InitTurnOrderState(state, phaseConfig.turn);
        }
        const turn = ctx.turn + 1;
        ctx = { ...ctx, turn, numMoves: 0, _prevActivePlayers: [] };
        const G = phaseConfig.turn.wrapped.onBegin({ ...state, ctx });
        return { ...state, G, ctx, _undo: [], _redo: [] };
    }
    ////////////
    // Update //
    ////////////
    function UpdatePhase(state, { arg, next, phase }) {
        const phaseConfig = GetPhase({ phase });
        let { ctx } = state;
        if (arg && arg.next) {
            if (arg.next in phaseMap) {
                ctx = { ...ctx, phase: arg.next };
            }
            else {
                turnOrder.error('invalid phase: ' + arg.next);
                return state;
            }
        }
        else {
            ctx = { ...ctx, phase: phaseConfig.wrapped.next(state) || null };
        }
        state = { ...state, ctx };
        // Start the new phase.
        next.push({ fn: StartPhase });
        return state;
    }
    function UpdateTurn(state, { arg, currentPlayer, next }) {
        let { G, ctx } = state;
        const phaseConfig = GetPhase(ctx);
        // Update turn order state.
        const { endPhase, ctx: newCtx } = turnOrder.UpdateTurnOrderState(state, currentPlayer, phaseConfig.turn, arg);
        ctx = newCtx;
        state = { ...state, G, ctx };
        if (endPhase) {
            next.push({ fn: EndPhase, turn: ctx.turn, phase: ctx.phase });
        }
        else {
            next.push({ fn: StartTurn, currentPlayer: ctx.currentPlayer });
        }
        return state;
    }
    function UpdateStage(state, { arg, playerID }) {
        if (typeof arg === 'string' || arg === turnOrder.Stage.NULL) {
            arg = { stage: arg };
        }
        if (typeof arg !== 'object')
            return state;
        // `arg` should be of type `StageArg`, loose typing as `any` here for historic reasons
        // stages previously did not enforce minMoves, this behaviour is kept intentionally
        turnOrder.supportDeprecatedMoveLimit(arg);
        let { ctx } = state;
        let { activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, _activePlayersNumMoves, } = ctx;
        // Checking if stage is valid, even Stage.NULL
        if (arg.stage !== undefined) {
            if (activePlayers === null) {
                activePlayers = {};
            }
            activePlayers[playerID] = arg.stage;
            _activePlayersNumMoves[playerID] = 0;
            if (arg.minMoves) {
                if (_activePlayersMinMoves === null) {
                    _activePlayersMinMoves = {};
                }
                _activePlayersMinMoves[playerID] = arg.minMoves;
            }
            if (arg.maxMoves) {
                if (_activePlayersMaxMoves === null) {
                    _activePlayersMaxMoves = {};
                }
                _activePlayersMaxMoves[playerID] = arg.maxMoves;
            }
        }
        ctx = {
            ...ctx,
            activePlayers,
            _activePlayersMinMoves,
            _activePlayersMaxMoves,
            _activePlayersNumMoves,
        };
        return { ...state, ctx };
    }
    function UpdateActivePlayers(state, { arg }) {
        return { ...state, ctx: turnOrder.SetActivePlayers(state.ctx, arg) };
    }
    ///////////////
    // ShouldEnd //
    ///////////////
    function ShouldEndGame(state) {
        return wrapped.endIf(state);
    }
    function ShouldEndPhase(state) {
        const phaseConfig = GetPhase(state.ctx);
        return phaseConfig.wrapped.endIf(state);
    }
    function ShouldEndTurn(state) {
        const phaseConfig = GetPhase(state.ctx);
        // End the turn if the required number of moves has been made.
        const currentPlayerMoves = state.ctx.numMoves || 0;
        if (phaseConfig.turn.maxMoves &&
            currentPlayerMoves >= phaseConfig.turn.maxMoves) {
            return true;
        }
        return phaseConfig.turn.wrapped.endIf(state);
    }
    /////////
    // End //
    /////////
    function EndGame(state, { arg, phase }) {
        state = EndPhase(state, { phase });
        if (arg === undefined) {
            arg = true;
        }
        state = { ...state, ctx: { ...state.ctx, gameover: arg } };
        // Run game end hook.
        const G = wrapped.onEnd(state);
        return { ...state, G };
    }
    function EndPhase(state, { arg, next, turn: initialTurn, automatic }) {
        // End the turn first.
        state = EndTurn(state, { turn: initialTurn, force: true, automatic: true });
        const { phase, turn } = state.ctx;
        if (next) {
            next.push({ fn: UpdatePhase, arg, phase });
        }
        // If we aren't in a phase, there is nothing else to do.
        if (phase === null) {
            return state;
        }
        // Run any cleanup code for the phase that is about to end.
        const phaseConfig = GetPhase(state.ctx);
        const G = phaseConfig.wrapped.onEnd(state);
        // Reset the phase.
        const ctx = { ...state.ctx, phase: null };
        // Add log entry.
        const action = turnOrder.gameEvent('endPhase', arg);
        const { _stateID } = state;
        const logEntry = { action, _stateID, turn, phase };
        if (automatic)
            logEntry.automatic = true;
        const deltalog = [...(state.deltalog || []), logEntry];
        return { ...state, G, ctx, deltalog };
    }
    function EndTurn(state, { arg, next, turn: initialTurn, force, automatic, playerID }) {
        // This is not the turn that EndTurn was originally
        // called for. The turn was probably ended some other way.
        if (initialTurn !== state.ctx.turn) {
            return state;
        }
        const { currentPlayer, numMoves, phase, turn } = state.ctx;
        const phaseConfig = GetPhase(state.ctx);
        // Prevent ending the turn if minMoves haven't been reached.
        const currentPlayerMoves = numMoves || 0;
        if (!force &&
            phaseConfig.turn.minMoves &&
            currentPlayerMoves < phaseConfig.turn.minMoves) {
            turnOrder.info(`cannot end turn before making ${phaseConfig.turn.minMoves} moves`);
            return state;
        }
        // Run turn-end triggers.
        const G = phaseConfig.turn.wrapped.onEnd(state);
        if (next) {
            next.push({ fn: UpdateTurn, arg, currentPlayer });
        }
        // Reset activePlayers.
        let ctx = { ...state.ctx, activePlayers: null };
        // Remove player from playerOrder
        if (arg && arg.remove) {
            playerID = playerID || currentPlayer;
            const playOrder = ctx.playOrder.filter((i) => i != playerID);
            const playOrderPos = ctx.playOrderPos > playOrder.length - 1 ? 0 : ctx.playOrderPos;
            ctx = { ...ctx, playOrder, playOrderPos };
            if (playOrder.length === 0) {
                next.push({ fn: EndPhase, turn, phase });
                return state;
            }
        }
        // Create log entry.
        const action = turnOrder.gameEvent('endTurn', arg);
        const { _stateID } = state;
        const logEntry = { action, _stateID, turn, phase };
        if (automatic)
            logEntry.automatic = true;
        const deltalog = [...(state.deltalog || []), logEntry];
        return { ...state, G, ctx, deltalog, _undo: [], _redo: [] };
    }
    function EndStage(state, { arg, next, automatic, playerID }) {
        playerID = playerID || state.ctx.currentPlayer;
        let { ctx, _stateID } = state;
        let { activePlayers, _activePlayersNumMoves, _activePlayersMinMoves, _activePlayersMaxMoves, phase, turn, } = ctx;
        const playerInStage = activePlayers !== null && playerID in activePlayers;
        const phaseConfig = GetPhase(ctx);
        if (!arg && playerInStage) {
            const stage = phaseConfig.turn.stages[activePlayers[playerID]];
            if (stage && stage.next) {
                arg = stage.next;
            }
        }
        // Checking if arg is a valid stage, even Stage.NULL
        if (next) {
            next.push({ fn: UpdateStage, arg, playerID });
        }
        // If player isn’t in a stage, there is nothing else to do.
        if (!playerInStage)
            return state;
        // Prevent ending the stage if minMoves haven't been reached.
        const currentPlayerMoves = _activePlayersNumMoves[playerID] || 0;
        if (_activePlayersMinMoves &&
            _activePlayersMinMoves[playerID] &&
            currentPlayerMoves < _activePlayersMinMoves[playerID]) {
            turnOrder.info(`cannot end stage before making ${_activePlayersMinMoves[playerID]} moves`);
            return state;
        }
        // Remove player from activePlayers.
        activePlayers = { ...activePlayers };
        delete activePlayers[playerID];
        if (_activePlayersMinMoves) {
            // Remove player from _activePlayersMinMoves.
            _activePlayersMinMoves = { ..._activePlayersMinMoves };
            delete _activePlayersMinMoves[playerID];
        }
        if (_activePlayersMaxMoves) {
            // Remove player from _activePlayersMaxMoves.
            _activePlayersMaxMoves = { ..._activePlayersMaxMoves };
            delete _activePlayersMaxMoves[playerID];
        }
        ctx = turnOrder.UpdateActivePlayersOnceEmpty({
            ...ctx,
            activePlayers,
            _activePlayersMinMoves,
            _activePlayersMaxMoves,
        });
        // Create log entry.
        const action = turnOrder.gameEvent('endStage', arg);
        const logEntry = { action, _stateID, turn, phase };
        if (automatic)
            logEntry.automatic = true;
        const deltalog = [...(state.deltalog || []), logEntry];
        return { ...state, ctx, deltalog };
    }
    /**
     * Retrieves the relevant move that can be played by playerID.
     *
     * If ctx.activePlayers is set (i.e. one or more players are in some stage),
     * then it attempts to find the move inside the stages config for
     * that turn. If the stage for a player is '', then the player is
     * allowed to make a move (as determined by the phase config), but
     * isn't restricted to a particular set as defined in the stage config.
     *
     * If not, it then looks for the move inside the phase.
     *
     * If it doesn't find the move there, it looks at the global move definition.
     *
     * @param {object} ctx
     * @param {string} name
     * @param {string} playerID
     */
    function GetMove(ctx, name, playerID) {
        const phaseConfig = GetPhase(ctx);
        const stages = phaseConfig.turn.stages;
        const { activePlayers } = ctx;
        if (activePlayers &&
            activePlayers[playerID] !== undefined &&
            activePlayers[playerID] !== turnOrder.Stage.NULL &&
            stages[activePlayers[playerID]] !== undefined &&
            stages[activePlayers[playerID]].moves !== undefined) {
            // Check if moves are defined for the player's stage.
            const stage = stages[activePlayers[playerID]];
            const moves = stage.moves;
            if (name in moves) {
                return moves[name];
            }
        }
        else if (phaseConfig.moves) {
            // Check if moves are defined for the current phase.
            if (name in phaseConfig.moves) {
                return phaseConfig.moves[name];
            }
        }
        else if (name in moves) {
            // Check for the move globally.
            return moves[name];
        }
        return null;
    }
    function ProcessMove(state, action) {
        const { playerID, type } = action;
        const { currentPlayer, activePlayers, _activePlayersMaxMoves } = state.ctx;
        const move = GetMove(state.ctx, type, playerID);
        const shouldCount = !move || typeof move === 'function' || move.noLimit !== true;
        let { numMoves, _activePlayersNumMoves } = state.ctx;
        if (shouldCount) {
            if (playerID === currentPlayer)
                numMoves++;
            if (activePlayers)
                _activePlayersNumMoves[playerID]++;
        }
        state = {
            ...state,
            ctx: {
                ...state.ctx,
                numMoves,
                _activePlayersNumMoves,
            },
        };
        if (_activePlayersMaxMoves &&
            _activePlayersNumMoves[playerID] >= _activePlayersMaxMoves[playerID]) {
            state = EndStage(state, { playerID, automatic: true });
        }
        const phaseConfig = GetPhase(state.ctx);
        const G = phaseConfig.turn.wrapped.onMove({ ...state, playerID });
        state = { ...state, G };
        const events = [{ fn: OnMove }];
        return Process(state, events);
    }
    function SetStageEvent(state, playerID, arg) {
        return Process(state, [{ fn: EndStage, arg, playerID }]);
    }
    function EndStageEvent(state, playerID) {
        return Process(state, [{ fn: EndStage, playerID }]);
    }
    function SetActivePlayersEvent(state, _playerID, arg) {
        return Process(state, [{ fn: UpdateActivePlayers, arg }]);
    }
    function SetPhaseEvent(state, _playerID, newPhase) {
        return Process(state, [
            {
                fn: EndPhase,
                phase: state.ctx.phase,
                turn: state.ctx.turn,
                arg: { next: newPhase },
            },
        ]);
    }
    function EndPhaseEvent(state) {
        return Process(state, [
            { fn: EndPhase, phase: state.ctx.phase, turn: state.ctx.turn },
        ]);
    }
    function EndTurnEvent(state, _playerID, arg) {
        return Process(state, [
            { fn: EndTurn, turn: state.ctx.turn, phase: state.ctx.phase, arg },
        ]);
    }
    function PassEvent(state, _playerID, arg) {
        return Process(state, [
            {
                fn: EndTurn,
                turn: state.ctx.turn,
                phase: state.ctx.phase,
                force: true,
                arg,
            },
        ]);
    }
    function EndGameEvent(state, _playerID, arg) {
        return Process(state, [
            { fn: EndGame, turn: state.ctx.turn, phase: state.ctx.phase, arg },
        ]);
    }
    const eventHandlers = {
        endStage: EndStageEvent,
        setStage: SetStageEvent,
        endTurn: EndTurnEvent,
        pass: PassEvent,
        endPhase: EndPhaseEvent,
        setPhase: SetPhaseEvent,
        endGame: EndGameEvent,
        setActivePlayers: SetActivePlayersEvent,
    };
    const enabledEventNames = [];
    if (events.endTurn !== false) {
        enabledEventNames.push('endTurn');
    }
    if (events.pass !== false) {
        enabledEventNames.push('pass');
    }
    if (events.endPhase !== false) {
        enabledEventNames.push('endPhase');
    }
    if (events.setPhase !== false) {
        enabledEventNames.push('setPhase');
    }
    if (events.endGame !== false) {
        enabledEventNames.push('endGame');
    }
    if (events.setActivePlayers !== false) {
        enabledEventNames.push('setActivePlayers');
    }
    if (events.endStage !== false) {
        enabledEventNames.push('endStage');
    }
    if (events.setStage !== false) {
        enabledEventNames.push('setStage');
    }
    function ProcessEvent(state, action) {
        const { type, playerID, args } = action.payload;
        if (typeof eventHandlers[type] !== 'function')
            return state;
        return eventHandlers[type](state, playerID, ...(Array.isArray(args) ? args : [args]));
    }
    function IsPlayerActive(_G, ctx, playerID) {
        if (ctx.activePlayers) {
            return playerID in ctx.activePlayers;
        }
        return ctx.currentPlayer === playerID;
    }
    return {
        ctx: (numPlayers) => ({
            numPlayers,
            turn: 0,
            currentPlayer: '0',
            playOrder: [...Array.from({ length: numPlayers })].map((_, i) => i + ''),
            playOrderPos: 0,
            phase: startingPhase,
            activePlayers: null,
        }),
        init: (state) => {
            return Process(state, [{ fn: StartGame }]);
        },
        isPlayerActive: IsPlayerActive,
        eventHandlers,
        eventNames: Object.keys(eventHandlers),
        enabledEventNames,
        moveMap,
        moveNames: [...moveNames.values()],
        processMove: ProcessMove,
        processEvent: ProcessEvent,
        getMove: GetMove,
    };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
function IsProcessed(game) {
    return game.processMove !== undefined;
}
/**
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 */
function ProcessGameConfig(game) {
    // The Game() function has already been called on this
    // config object, so just pass it through.
    if (IsProcessed(game)) {
        return game;
    }
    if (game.name === undefined)
        game.name = 'default';
    if (game.deltaState === undefined)
        game.deltaState = false;
    if (game.disableUndo === undefined)
        game.disableUndo = false;
    if (game.setup === undefined)
        game.setup = () => ({});
    if (game.moves === undefined)
        game.moves = {};
    if (game.playerView === undefined)
        game.playerView = ({ G }) => G;
    if (game.plugins === undefined)
        game.plugins = [];
    game.plugins.forEach((plugin) => {
        if (plugin.name === undefined) {
            throw new Error('Plugin missing name attribute');
        }
        if (plugin.name.includes(' ')) {
            throw new Error(plugin.name + ': Plugin name must not include spaces');
        }
    });
    if (game.name.includes(' ')) {
        throw new Error(game.name + ': Game name must not include spaces');
    }
    const flow = Flow(game);
    return {
        ...game,
        flow,
        moveNames: flow.moveNames,
        pluginNames: game.plugins.map((p) => p.name),
        processMove: (state, action) => {
            let moveFn = flow.getMove(state.ctx, action.type, action.playerID);
            if (IsLongFormMove(moveFn)) {
                moveFn = moveFn.move;
            }
            if (moveFn instanceof Function) {
                const fn = turnOrder.FnWrap(moveFn, turnOrder.GameMethod.MOVE, game.plugins);
                let args = [];
                if (action.args !== undefined) {
                    args = Array.isArray(action.args) ? action.args : [action.args];
                }
                const context = {
                    ...turnOrder.GetAPIs(state),
                    G: state.G,
                    ctx: state.ctx,
                    playerID: action.playerID,
                };
                return fn(context, ...args);
            }
            turnOrder.error(`invalid move object: ${action.type}`);
            return state.G;
        },
    };
}
function IsLongFormMove(move) {
    return move instanceof Object && move.move !== undefined;
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
var UpdateErrorType;
(function (UpdateErrorType) {
    // The action’s credentials were missing or invalid
    UpdateErrorType["UnauthorizedAction"] = "update/unauthorized_action";
    // The action’s matchID was not found
    UpdateErrorType["MatchNotFound"] = "update/match_not_found";
    // Could not apply Patch operation (rfc6902).
    UpdateErrorType["PatchFailed"] = "update/patch_failed";
})(UpdateErrorType || (UpdateErrorType = {}));
var ActionErrorType;
(function (ActionErrorType) {
    // The action contained a stale state ID
    ActionErrorType["StaleStateId"] = "action/stale_state_id";
    // The requested move is unknown or not currently available
    ActionErrorType["UnavailableMove"] = "action/unavailable_move";
    // The move declared it was invalid (INVALID_MOVE constant)
    ActionErrorType["InvalidMove"] = "action/invalid_move";
    // The player making the action is not currently active
    ActionErrorType["InactivePlayer"] = "action/inactive_player";
    // The game has finished
    ActionErrorType["GameOver"] = "action/gameover";
    // The requested action is disabled (e.g. undo/redo, events)
    ActionErrorType["ActionDisabled"] = "action/action_disabled";
    // The requested action is not currently possible
    ActionErrorType["ActionInvalid"] = "action/action_invalid";
    // The requested action was declared invalid by a plugin
    ActionErrorType["PluginActionInvalid"] = "action/plugin_invalid";
})(ActionErrorType || (ActionErrorType = {}));

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Check if the payload for the passed action contains a playerID.
 */
const actionHasPlayerID = (action) => action.payload.playerID !== null && action.payload.playerID !== undefined;
/**
 * Returns true if a move can be undone.
 */
const CanUndoMove = (G, ctx, move) => {
    function HasUndoable(move) {
        return move.undoable !== undefined;
    }
    function IsFunction(undoable) {
        return undoable instanceof Function;
    }
    if (!HasUndoable(move)) {
        return true;
    }
    if (IsFunction(move.undoable)) {
        return move.undoable({ G, ctx });
    }
    return move.undoable;
};
/**
 * Update the undo and redo stacks for a move or event.
 */
function updateUndoRedoState(state, opts) {
    if (opts.game.disableUndo)
        return state;
    const undoEntry = {
        G: state.G,
        ctx: state.ctx,
        plugins: state.plugins,
        playerID: opts.action.payload.playerID || state.ctx.currentPlayer,
    };
    if (opts.action.type === 'MAKE_MOVE') {
        undoEntry.moveType = opts.action.payload.type;
    }
    return {
        ...state,
        _undo: [...state._undo, undoEntry],
        // Always reset redo stack when making a move or event
        _redo: [],
    };
}
/**
 * Process state, adding the initial deltalog for this action.
 */
function initializeDeltalog(state, action, move) {
    // Create a log entry for this action.
    const logEntry = {
        action,
        _stateID: state._stateID,
        turn: state.ctx.turn,
        phase: state.ctx.phase,
    };
    const pluginLogMetadata = state.plugins.log.data.metadata;
    if (pluginLogMetadata !== undefined) {
        logEntry.metadata = pluginLogMetadata;
    }
    if (typeof move === 'object' && move.redact === true) {
        logEntry.redact = true;
    }
    else if (typeof move === 'object' && move.redact instanceof Function) {
        logEntry.redact = move.redact({ G: state.G, ctx: state.ctx });
    }
    return {
        ...state,
        deltalog: [logEntry],
    };
}
/**
 * Update plugin state after move/event & check if plugins consider the action to be valid.
 * @param state Current version of state in the reducer.
 * @param oldState State to revert to in case of error.
 * @param pluginOpts Plugin configuration options.
 * @returns Tuple of the new state updated after flushing plugins and the old
 * state augmented with an error if a plugin declared the action invalid.
 */
function flushAndValidatePlugins(state, oldState, pluginOpts) {
    const [newState, isInvalid] = turnOrder.FlushAndValidate(state, pluginOpts);
    if (!isInvalid)
        return [newState];
    return [
        newState,
        WithError(oldState, ActionErrorType.PluginActionInvalid, isInvalid),
    ];
}
/**
 * ExtractTransientsFromState
 *
 * Split out transients from the a TransientState
 */
function ExtractTransients(transientState) {
    if (!transientState) {
        // We preserve null for the state for legacy callers, but the transient
        // field should be undefined if not present to be consistent with the
        // code path below.
        return [null, undefined];
    }
    const { transients, ...state } = transientState;
    return [state, transients];
}
/**
 * WithError
 *
 * Augment a State instance with transient error information.
 */
function WithError(state, errorType, payload) {
    const error = {
        type: errorType,
        payload,
    };
    return {
        ...state,
        transients: {
            error,
        },
    };
}
/**
 * Middleware for processing TransientState associated with the reducer
 * returned by CreateGameReducer.
 * This should pretty much be used everywhere you want realistic state
 * transitions and error handling.
 */
const TransientHandlingMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    switch (action.type) {
        case turnOrder.STRIP_TRANSIENTS: {
            return result;
        }
        default: {
            const [, transients] = ExtractTransients(store.getState());
            if (typeof transients !== 'undefined') {
                store.dispatch(turnOrder.stripTransients());
                // Dev Note: If parent middleware needs to correlate the spawned
                // StripTransients action to the triggering action, instrument here.
                //
                // This is a bit tricky; for more details, see:
                //   https://github.com/boardgameio/boardgame.io/pull/940#discussion_r636200648
                return {
                    ...result,
                    transients,
                };
            }
            return result;
        }
    }
};
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 */
function CreateGameReducer({ game, isClient, }) {
    game = ProcessGameConfig(game);
    /**
     * GameReducer
     *
     * Redux reducer that maintains the overall game state.
     * @param {object} state - The state before the action.
     * @param {object} action - A Redux action.
     */
    return (stateWithTransients = null, action) => {
        let [state /*, transients */] = ExtractTransients(stateWithTransients);
        switch (action.type) {
            case turnOrder.STRIP_TRANSIENTS: {
                // This action indicates that transient metadata in the state has been
                // consumed and should now be stripped from the state..
                return state;
            }
            case turnOrder.GAME_EVENT: {
                state = { ...state, deltalog: [] };
                // Process game events only on the server.
                // These events like `endTurn` typically
                // contain code that may rely on secret state
                // and cannot be computed on the client.
                if (isClient) {
                    return state;
                }
                // Disallow events once the game is over.
                if (state.ctx.gameover !== undefined) {
                    turnOrder.error(`cannot call event after game end`);
                    return WithError(state, ActionErrorType.GameOver);
                }
                // Ignore the event if the player isn't active.
                if (actionHasPlayerID(action) &&
                    !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
                    turnOrder.error(`disallowed event: ${action.payload.type}`);
                    return WithError(state, ActionErrorType.InactivePlayer);
                }
                // Execute plugins.
                state = turnOrder.Enhance(state, {
                    game,
                    isClient: false,
                    playerID: action.payload.playerID,
                });
                // Process event.
                let newState = game.flow.processEvent(state, action);
                // Execute plugins.
                let stateWithError;
                [newState, stateWithError] = flushAndValidatePlugins(newState, state, {
                    game,
                    isClient: false,
                });
                if (stateWithError)
                    return stateWithError;
                // Update undo / redo state.
                newState = updateUndoRedoState(newState, { game, action });
                return { ...newState, _stateID: state._stateID + 1 };
            }
            case turnOrder.MAKE_MOVE: {
                const oldState = (state = { ...state, deltalog: [] });
                // Check whether the move is allowed at this time.
                const move = game.flow.getMove(state.ctx, action.payload.type, action.payload.playerID || state.ctx.currentPlayer);
                if (move === null) {
                    turnOrder.error(`disallowed move: ${action.payload.type}`);
                    return WithError(state, ActionErrorType.UnavailableMove);
                }
                // Don't run move on client if move says so.
                if (isClient && move.client === false) {
                    return state;
                }
                // Disallow moves once the game is over.
                if (state.ctx.gameover !== undefined) {
                    turnOrder.error(`cannot make move after game end`);
                    return WithError(state, ActionErrorType.GameOver);
                }
                // Ignore the move if the player isn't active.
                if (actionHasPlayerID(action) &&
                    !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
                    turnOrder.error(`disallowed move: ${action.payload.type}`);
                    return WithError(state, ActionErrorType.InactivePlayer);
                }
                // Execute plugins.
                state = turnOrder.Enhance(state, {
                    game,
                    isClient,
                    playerID: action.payload.playerID,
                });
                // Process the move.
                const G = game.processMove(state, action.payload);
                // The game declared the move as invalid.
                if (G === turnOrder.INVALID_MOVE) {
                    turnOrder.error(`invalid move: ${action.payload.type} args: ${action.payload.args}`);
                    // TODO(#723): Marshal a nice error payload with the processed move.
                    return WithError(state, ActionErrorType.InvalidMove);
                }
                const newState = { ...state, G };
                // Some plugin indicated that it is not suitable to be
                // materialized on the client (and must wait for the server
                // response instead).
                if (isClient && turnOrder.NoClient(newState, { game })) {
                    return state;
                }
                state = newState;
                // If we're on the client, just process the move
                // and no triggers in multiplayer mode.
                // These will be processed on the server, which
                // will send back a state update.
                if (isClient) {
                    let stateWithError;
                    [state, stateWithError] = flushAndValidatePlugins(state, oldState, {
                        game,
                        isClient: true,
                    });
                    if (stateWithError)
                        return stateWithError;
                    return {
                        ...state,
                        _stateID: state._stateID + 1,
                    };
                }
                // On the server, construct the deltalog.
                state = initializeDeltalog(state, action, move);
                // Allow the flow reducer to process any triggers that happen after moves.
                state = game.flow.processMove(state, action.payload);
                let stateWithError;
                [state, stateWithError] = flushAndValidatePlugins(state, oldState, {
                    game,
                });
                if (stateWithError)
                    return stateWithError;
                // Update undo / redo state.
                state = updateUndoRedoState(state, { game, action });
                return {
                    ...state,
                    _stateID: state._stateID + 1,
                };
            }
            case turnOrder.RESET:
            case turnOrder.UPDATE:
            case turnOrder.SYNC: {
                return action.state;
            }
            case turnOrder.UNDO: {
                state = { ...state, deltalog: [] };
                if (game.disableUndo) {
                    turnOrder.error('Undo is not enabled');
                    return WithError(state, ActionErrorType.ActionDisabled);
                }
                const { G, ctx, _undo, _redo, _stateID } = state;
                if (_undo.length < 2) {
                    turnOrder.error(`No moves to undo`);
                    return WithError(state, ActionErrorType.ActionInvalid);
                }
                const last = _undo[_undo.length - 1];
                const restore = _undo[_undo.length - 2];
                // Only allow players to undo their own moves.
                if (actionHasPlayerID(action) &&
                    action.payload.playerID !== last.playerID) {
                    turnOrder.error(`Cannot undo other players' moves`);
                    return WithError(state, ActionErrorType.ActionInvalid);
                }
                // If undoing a move, check it is undoable.
                if (last.moveType) {
                    const lastMove = game.flow.getMove(restore.ctx, last.moveType, last.playerID);
                    if (!CanUndoMove(G, ctx, lastMove)) {
                        turnOrder.error(`Move cannot be undone`);
                        return WithError(state, ActionErrorType.ActionInvalid);
                    }
                }
                state = initializeDeltalog(state, action);
                return {
                    ...state,
                    G: restore.G,
                    ctx: restore.ctx,
                    plugins: restore.plugins,
                    _stateID: _stateID + 1,
                    _undo: _undo.slice(0, -1),
                    _redo: [last, ..._redo],
                };
            }
            case turnOrder.REDO: {
                state = { ...state, deltalog: [] };
                if (game.disableUndo) {
                    turnOrder.error('Redo is not enabled');
                    return WithError(state, ActionErrorType.ActionDisabled);
                }
                const { _undo, _redo, _stateID } = state;
                if (_redo.length === 0) {
                    turnOrder.error(`No moves to redo`);
                    return WithError(state, ActionErrorType.ActionInvalid);
                }
                const first = _redo[0];
                // Only allow players to redo their own undos.
                if (actionHasPlayerID(action) &&
                    action.payload.playerID !== first.playerID) {
                    turnOrder.error(`Cannot redo other players' moves`);
                    return WithError(state, ActionErrorType.ActionInvalid);
                }
                state = initializeDeltalog(state, action);
                return {
                    ...state,
                    G: first.G,
                    ctx: first.ctx,
                    plugins: first.plugins,
                    _stateID: _stateID + 1,
                    _undo: [..._undo, first],
                    _redo: _redo.slice(1),
                };
            }
            case turnOrder.PLUGIN: {
                // TODO(#723): Expose error semantics to plugin processing.
                return turnOrder.ProcessAction(state, action, { game });
            }
            case turnOrder.PATCH: {
                const oldState = state;
                const newState = JSON.parse(JSON.stringify(oldState));
                const patchError = rfc6902.applyPatch(newState, action.patch);
                const hasError = patchError.some((entry) => entry !== null);
                if (hasError) {
                    turnOrder.error(`Patch ${JSON.stringify(action.patch)} apply failed`);
                    return WithError(oldState, UpdateErrorType.PatchFailed, patchError);
                }
                else {
                    return newState;
                }
            }
            default: {
                return state;
            }
        }
    };
}

exports.CreateGameReducer = CreateGameReducer;
exports.IsLongFormMove = IsLongFormMove;
exports.ProcessGameConfig = ProcessGameConfig;
exports.TransientHandlingMiddleware = TransientHandlingMiddleware;
