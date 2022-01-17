/**
 * Player Component
 *
 * @description List of methods to be integrated on most of the player's elements.
 * @interface PlayerComponent
 * @export
 */
export default interface PlayerComponent {
    /**
     * Create HTML and insert it into OpenPlayer's DOM.
     *
     * This method must include its events setup.
     */
    create(): void;
    /**
     * Remove HTML associated to specific OpenPlayer's element.
     *
     * This method must include the removal of its previously set events.
     */
    destroy(): void;
}
