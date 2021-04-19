import PlayerComponent from '../interfaces/component';
import SettingsItem from '../interfaces/settings/item';
import Player from '../player';
/**
 * Levels element.
 *
 * @description
 * @class Levels
 * @implements PlayerComponent
 */
declare class Levels implements PlayerComponent {
    #private;
    /**
     * Create an instance of Captions.
     *
     * @param {Player} player
     * @memberof Levels
     * @returns {Levels}
     */
    constructor(player: Player, position: string, layer: string);
    /**
     * Create a button and a container to display levels (if any).
     *
     * @inheritDoc
     * @memberof Levels
     */
    create(): void;
    destroy(): void;
    /**
     * Add list of available captions in the `Settings` menu.
     *
     * @see [[Settings.addSettings]]
     * @returns {SettingsItem|object}
     * @memberof Captions
     */
    addSettings(): SettingsItem | object;
    private _formatMenuItems;
    /**
     * Get the standard label of level depending of media's height.
     *
     * @see https://en.wikipedia.org/wiki/Computer_display_standard#Standards
     * @private
     * @returns {string}
     * @memberof Levels
     */
    private _getResolutionsLabel;
    private _gatherLevels;
    private _buildMenu;
}
export default Levels;
