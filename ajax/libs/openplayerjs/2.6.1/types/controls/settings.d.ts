import PlayerComponent from '../interfaces/component';
import SettingsItem from '../interfaces/settings/item';
import SettingsSubItem from '../interfaces/settings/subitem';
import Player from '../player';
/**
 * Settings element.
 *
 * @description This class creates a menu of options to manipulate media that cannot
 * be placed in the main control necessarily (such as different captions associated with media,
 * levels of speed to play media, etc.)
 * This element is based on YouTube's Settings element.
 * @class Settings
 * @implements PlayerComponent
 */
declare class Settings implements PlayerComponent {
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Settings
     */
    private player;
    /**
     * Collection of items associated with a specific menu item.
     *
     * @private
     * @type SettingsSubMenu
     * @memberof Settings
     */
    private submenu;
    /**
     * Button to toggle menu's visibility.
     *
     * @private
     * @type HTMLButtonElement
     * @memberof Settings
     */
    private button;
    /**
     * HTML markup to display Settings options.
     *
     * @private
     * @type HTMLElement
     * @memberof Settings
     */
    private menu;
    /**
     * Events that will be triggered in Settings element:
     *  - global (to hide menu on resize and manipulate speed levels, and to manipulate submenu elements)
     *  - media (to hide menu when media is played/paused or when `controls.hide` is triggered)
     *
     * @private
     * @type EventsList
     * @memberof Settings
     */
    private events;
    /**
     * Storage of the initial state of the menu's markup.
     *
     * @private
     * @type string
     * @memberof Settings
     */
    private originalOutput;
    /**
     * Event that displays main menu when clicking in Settings button.
     *
     * @private
     * @type callback
     * @memberof Settings
     */
    private clickEvent;
    /**
     * Event that hides Settings main menu when other events occur, such as play/pause media
     * or when resizing the user's window.
     *
     * @private
     * @type callback
     * @memberof Settings
     */
    private hideEvent;
    /**
     * Event that is triggered when an element from Settings is removed.
     *
     * @private
     * @type callback
     * @memberof Settings
     */
    private removeEvent;
    /**
     * Default labels from player's config
     *
     * @private
     * @type object
     * @memberof Settings
     */
    private labels;
    /**
     * Position of the button to be indicated as part of its class name
     *
     * @private
     * @type {string}
     * @memberof Settings
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
     * Create an instance of Settings.
     *
     * @param {Player} player
     * @returns {Settings}
     * @memberof Settings
     */
    constructor(player: Player, position: string, layer: string);
    /**
     *
     * @inheritDoc
     * @memberof Settings
     */
    create(): void;
    /**
     *
     * @inheritDoc
     * @memberof Settings
     */
    destroy(): void;
    /**
     * Build `Settings` default option: media speed levels
     *
     * @returns {SettingItem}
     * @memberof Settings
     */
    addSettings(): SettingsItem;
    /**
     * Add a new element and subelements to Setting's menu.
     *
     * The subelements will be transformed in HTML output, and this will be cached via
     * [[Settings.submenu]] element. A global event will be associated with the newly
     * added elements.
     *
     * @param {string} name  The name of the Settings element.
     * @param {string} key  Identifier to generate unique Settings' items and subitems.
     * @param {string} defaultValue  It can represent a number or a string.
     * @param {?SettingsSubItem[]} submenu  A collection of subitems.
     * @param {?string} className  A specific class to trigger events on submenu items.
     * @memberof Settings
     */
    addItem(name: string, key: string, defaultValue: string, submenu?: SettingsSubItem[], className?: string): void;
    /**
     *
     *
     * @param {(string|number)} id
     * @param {string} type
     * @param {number} [minItems=2]
     * @memberof Settings
     */
    removeItem(id: string | number, type: string, minItems?: number): void;
}
export default Settings;
