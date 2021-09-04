import type { Plugin, PlayerID } from '../types';
interface PlayerData<PlayerState extends any = any> {
    players: Record<PlayerID, PlayerState>;
}
export interface PlayerAPI<PlayerState extends any = any> {
    state: Record<PlayerID, PlayerState>;
    get(): PlayerState;
    set(value: PlayerState): PlayerState;
    opponent?: {
        get(): PlayerState;
        set(value: PlayerState): PlayerState;
    };
}
interface PluginPlayerOpts<PlayerState extends any = any> {
    setup?: (playerID: string) => PlayerState;
    playerView?: (players: Record<PlayerID, PlayerState>, playerID?: string | null) => any;
}
export interface PlayerPlugin<PlayerState extends any = any> {
    player: PlayerAPI<PlayerState>;
}
/**
 * Plugin that maintains state for each player in G.players.
 * During a turn, G.player will contain the object for the current player.
 * In two player games, G.opponent will contain the object for the other player.
 *
 * @param {function} initPlayerState - Function of type (playerID) => playerState.
 */
declare const PlayerPlugin: <PlayerState extends unknown = any>({ setup, playerView, }?: PluginPlayerOpts<PlayerState>) => Plugin<PlayerAPI<PlayerState>, PlayerData<PlayerState>, any>;
export default PlayerPlugin;
