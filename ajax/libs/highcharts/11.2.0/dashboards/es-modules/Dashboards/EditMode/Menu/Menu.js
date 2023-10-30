/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
import EditGlobals from '../EditGlobals.js';
import U from '../../../Core/Utilities.js';
import MenuItem from './MenuItem.js';
import MenuItemBindings from './MenuItemBindings.js';
const { createElement, merge } = U;
class Menu {
    /* *
    *
    *  Constructor
    *
    * */
    constructor(parentElement, options, editMode, parent) {
        this.parentElement = parentElement;
        this.isVisible = false;
        this.activeItems = [];
        this.options = options;
        this.items = {};
        this.editMode = editMode;
        if (parent) {
            this.parent = parent;
        }
        this.container = this.setContainer();
    }
    /* *
    *
    *  Functions
    *
    * */
    setContainer() {
        return createElement('div', {
            className: EditGlobals.classNames.menu +
                ' ' + (this.options.className || '')
        }, {}, this.parentElement);
    }
    // ItemsSchemas - default items definitions.
    initItems(itemsSchemas, activeItems) {
        const menu = this, optionsItems = menu.options.items || [];
        let itemSchema, itemConfig, item, options;
        for (let i = 0, iEnd = optionsItems.length; i < iEnd; ++i) {
            itemConfig = optionsItems[i];
            itemSchema =
                typeof itemConfig === 'string' ? itemsSchemas[itemConfig] :
                    itemConfig.id ? itemsSchemas[itemConfig.id] :
                        {};
            options = typeof itemConfig === 'string' ?
                merge(itemSchema, { id: itemConfig }) :
                merge(itemSchema, itemConfig);
            if (options.id) {
                item = new MenuItem(menu, options);
                // Save initialized item.
                menu.items[item.options.id] = item;
                if (activeItems) {
                    item.activate();
                    menu.activeItems.push(item);
                }
            }
            else {
                // Error - defined item needs an id.
            }
        }
    }
    setActiveItems(items) {
        const menu = this;
        let item;
        // Deactivate items.
        for (let i = 0, iEnd = menu.activeItems.length; i < iEnd; ++i) {
            if (items.indexOf(menu.activeItems[i].options.id) === -1) {
                menu.activeItems[i].deactivate();
            }
        }
        menu.activeItems.length = 0;
        for (let j = 0, jEnd = items.length; j < jEnd; ++j) {
            item = menu.items[items[j]];
            if (item) {
                // Activate item.
                if (!item.isActive) {
                    item.activate();
                }
                else {
                    item.update();
                }
                menu.activeItems.push(item);
            }
        }
    }
    deactivateActiveItems() {
        const menu = this;
        for (let i = 0, iEnd = menu.activeItems.length; i < iEnd; ++i) {
            menu.activeItems[i].deactivate();
        }
    }
    updateActiveItems() {
        const activeItems = this.activeItems;
        for (let i = 0, iEnd = activeItems.length; i < iEnd; ++i) {
            activeItems[i].update();
        }
    }
    destroy() {
        this.activeItems.length = 0;
        this.container.remove();
        this.items = {};
        this.options = {};
    }
}
/* *
*
*  Static Properties
*
* */
Menu.items = MenuItemBindings;
export default Menu;
