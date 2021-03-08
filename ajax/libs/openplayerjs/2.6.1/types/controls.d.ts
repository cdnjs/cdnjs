import PlayerComponent from './interfaces/component';
import EventsList from './interfaces/events-list';
import Player from './player';
/**
 * Controls element.
 *
 * @description This class handles the creation/destruction of all player's control elements.
 * @class Controls
 * @implements PlayerComponent
 */
declare class Controls implements PlayerComponent {
    /**
     * Events that will be triggered in Controls element:
     *  - mouse (to show/hide controls after specific number of seconds)
     *  - media (to trigger/stop timer that will hide or show controls)
     *
     * @private
     * @type EventsList
     * @memberof Controls
     */
    events: EventsList;
    /**
     * Instance of Settings object.
     *
     * @private
     * @type Settings
     * @memberof Controls
     */
    private settings;
    /**
     * Element that stores the time to hide controls.
     *
     * @private
     * @type number
     * @memberof Controls
     */
    private timer;
    /**
     * Main container of control elements.
     *
     * @private
     * @type HTMLDivElement
     * @memberof Controls
     */
    private controls;
    /**
     * Instance of OpenPlayer.
     *
     * @private
     * @type Player
     * @memberof Controls
     */
    private player;
    /**
     * Storage for all the control elements.
     *
     * @private
     * @type any
     * @memberof Controls
     */
    private items;
    private controlEls;
    /**
     * Create an instance of Controls.
     *
     * @param {Player} player
     * @returns {Controls}
     * @memberof Controls
     */
    constructor(player: Player);
    /**
     *
     * @inheritDoc
     * @memberof Controls
     */
    create(): void;
    /**
     *
     * @inheritDoc
     * @memberof Controls
     */
    destroy(): void;
    /**
     * Retrieve the main container of all control elements, to add/remove them in latter steps.
     *
     * @returns {HTMLDivElement}
     * @memberof Controls
     */
    getContainer(): HTMLDivElement;
    /**
     * Retrieve the layer to append/remove elements from the player controls.
     *
     * @param {string}
     * @memberof Controls
     */
    getLayer(layer: string): HTMLDivElement;
    private _createControlsLayer;
    /**
     * Set timer to hide controls.
     *
     * @private
     * @param {number} time The time when controls will be hidden in milliseconds (ms).
     * @memberof Controls
     */
    private _startControlTimer;
    /**
     * Stop timer to hide controls.
     *
     * @private
     * @memberof Controls
     */
    private _stopControlTimer;
    /**
     * Instantiate all control elements' classes and store them in `items` element.
     *
     * @see [[Controls.items]]
     * @private
     * @memberof Controls
     */
    private _setElements;
    /**
     * Create markup for all control elements and, if available, create entries for Settings element.
     *
     * It will dispatch a `controlschanged` event to reload all elements in the control bar.
     * @see [[Settings.addItem]]
     * @see [[Settings.addSettings]]
     * @private
     * @memberof Controls
     */
    private _buildElements;
    /**
     * Calback to hide custom menu.
     *
     * @private
     * @param {HTMLDivElement} menu
     * @memberof Controls
     */
    private _hideCustomMenu;
    private _toggleCustomMenu;
    /**
     * Create a button for custom control items and activate `click` event on it.
     *
     * @private
     * @param {ControlItem} item
     * @memberof Controls
     */
    private _createCustomControl;
    /**
     * Remove a custom control button and deactivate `click` event on it.
     *
     * If a submenu item was detected, remove also the events for each item and destroy the menu.
     *
     * @private
     * @param {ControlItem} item
     * @memberof Controls
     */
    private _destroyCustomControl;
}
export default Controls;
