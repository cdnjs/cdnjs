import SettingsSubItem from './subitem';
/**
 * Settings Item.
 *
 * @description An element to create elements in the `Settings` menu and submenus linked
 * to them.
 * @see [[Settings.addSettings]]
 * @interface SettingsItem
 * @export
 */
export default interface SettingsItem {
    /**
     * Specific class name to be used for:
     *  - Event listeners and dispatchers
     *  - Specific styling
     */
    readonly className: string;
    /**
     * Identifier to indicate the initial value of `Settings` element when created.
     *
     * This element must exist in the `submenu` attribute (if not empty).
     */
    readonly default: string;
    /**
     * Unique identifier to avoid collisions with other items.
     */
    readonly key: string;
    /**
     * Human-readable name of the item.
     */
    readonly name: string;
    /**
     * List of elements to generate a submenu linked to item.
     */
    subitems?: SettingsSubItem[];
}
