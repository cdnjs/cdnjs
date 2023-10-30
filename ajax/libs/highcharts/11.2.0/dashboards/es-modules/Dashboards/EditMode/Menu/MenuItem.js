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
import EditRenderer from '../EditRenderer.js';
const { createElement, merge } = U;
class MenuItem {
    /* *
    *
    *  Constructor
    *
    * */
    constructor(menu, options) {
        this.menu = menu;
        this.isActive = false;
        this.options = merge(MenuItem.defaultOptions, options);
        this.container = this.setContainer();
        this.innerElement = this.setInnerElement();
    }
    /* *
    *
    *  Functions
    *
    * */
    setContainer() {
        const item = this, options = item.options;
        let className = EditGlobals.classNames.menuItem;
        if (item.menu.options.itemsClassName) {
            className += ' ' + item.menu.options.itemsClassName;
        }
        if (options.className) {
            className += ' ' + options.className;
        }
        return createElement('div', { className: className || '' }, merge(this.options.style || {}, 
        // to remove
        this.isActive ? { display: 'block' } : {}), this.menu.container);
    }
    setInnerElement() {
        const item = this, options = item.options, container = item.container, langKey = options.langKey;
        if (options.type === 'toggle') {
            return EditRenderer.renderToggle(container, {
                id: options.id,
                name: options.id,
                title: langKey ?
                    this.menu.editMode.lang[langKey] :
                    options.text,
                value: !!(options.getValue && options.getValue(item)),
                lang: this.menu.editMode.lang,
                onchange: options.events?.click?.bind(item)
            });
        }
        if (options.type === 'text') {
            return EditRenderer.renderText(container, {
                title: langKey ?
                    this.menu.editMode.lang[langKey] :
                    options.text || '',
                className: options.className || ''
            });
        }
        if (options.type === 'icon') {
            return EditRenderer.renderIcon(container, {
                icon: options.icon || '',
                mousedown: options.events?.onmousedown?.bind(item),
                click: options.events?.click?.bind(item)
            });
        }
        if (options.type === 'button') {
            return EditRenderer.renderButton(container, {
                callback: options.events?.click?.bind(item),
                className: options.className || '',
                style: options.style || {},
                text: langKey ?
                    this.menu.editMode.lang[langKey] :
                    (options.text || '')
            });
        }
    }
    update() {
        const item = this, options = item.options;
        if (options.events && options.events.update) {
            options.events.update.apply(item, arguments);
        }
    }
    activate() {
        const item = this;
        item.update();
        // Temp.
        if (item.container) {
            item.isActive = true;
            item.container.style.display = 'block';
        }
    }
    deactivate() {
        const item = this;
        // Temp.
        if (item.container) {
            item.isActive = false;
            item.container.style.display = 'none';
        }
    }
}
/* *
*
*  Static Properties
*
* */
MenuItem.defaultOptions = {
    id: '',
    type: 'text'
};
export default MenuItem;
