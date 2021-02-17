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
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Levels
     */
    private player;
    /**
     * Button to toggle captions.
     *
     * @private
     * @type HTMLButtonElement
     * @memberof Levels
     */
    private button;
    /**
     * Container to display Levels options if `detachMenus` is set as `true`.
     *
     * @private
     * @type HTMLDivElement
     * @memberof Levels
     */
    private menu;
    /**
     * Events that will be triggered:
     *  - button (to display menu of Levels if detached menus are active)
     *  - global (to dispatch click on the subitems on the menu settings)
     *  - media (to check the available levels)
     *
     * @private
     * @type EventsList
     * @memberof Levels
     */
    private events;
    /**
     * Determine if a submenu must be created with the CC button, instead of using the Settings menu.
     *
     * @private
     * @type boolean
     * @memberof Levels
     */
    private detachMenu;
    /**
     * Default labels from player's config
     *
     * @private
     * @type object
     * @memberof Levels
     */
    private labels;
    private levels;
    /**
     * Initial level to be used as a default value in the `Settings` component.
     *
     * @see [[Levels.addSettings]]
     * @private
     * @type string
     * @memberof Levels
     */
    private default;
    /**
     * Position of the button to be indicated as part of its class name
     *
     * @private
     * @type {string}
     * @memberof Levels
     */
    private position;
    /**
     * Layer where the control item will be placed
     *
     * @private
     * @type {string}
     * @memberof Captions
     */
    private layer;
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
