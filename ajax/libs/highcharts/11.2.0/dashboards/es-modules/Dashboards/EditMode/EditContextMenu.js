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
import EditGlobals from './EditGlobals.js';
import U from '../../Core/Utilities.js';
import Menu from './Menu/Menu.js';
const { addEvent, merge } = U;
/**
 * Class to create context menu.
 * @internal
 */
class EditContextMenu extends Menu {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(parentElement, options, editMode, parent) {
        super(editMode.board.container, merge(EditContextMenu.defaultOptions, options || {}), editMode);
        this.editMode = editMode;
        this.options = merge(EditContextMenu.defaultOptions, options || {});
        // Set the context menu container width.
        this.container.style.width = this.options.width + 'px';
        super.initItems(EditContextMenu.items);
        if (this.options.items) {
            const items = [];
            for (let i = 0, iEnd = this.options.items.length; i < iEnd; ++i) {
                if (typeof this.options.items[i] === 'string') {
                    items.push(this.options.items[i]);
                }
                else if (this.options.items[i].id) {
                    items.push(this.options.items[i].id);
                }
            }
            this.setActiveItems(items);
        }
        this.initEvents();
    }
    /* *
    *
    *  Functions
    *
    * */
    initEvents() {
        const contextMenu = this;
        // Click on document close the context menu
        // TODO refactor
        addEvent(document, 'click', (event) => {
            if (event.target !== this.container &&
                event.target !==
                    contextMenu.editMode.tools.contextButtonElement &&
                !event.target.classList
                    .contains(EditGlobals.classNames.toggleSlider) &&
                event.target.tagName !== 'INPUT' &&
                this.isVisible) {
                this.setVisible(false);
            }
        });
    }
    setVisible(visible) {
        const contextMenu = this, contextButtonElement = contextMenu.editMode.tools.contextButtonElement;
        if (contextMenu.container && contextButtonElement) {
            if (visible) {
                contextMenu.container.style.display = 'block';
                contextMenu.isVisible = true;
                contextButtonElement.setAttribute('aria-expanded', 'true');
            }
            else {
                contextMenu.container.style.display = 'none';
                contextMenu.isVisible = false;
                contextButtonElement.setAttribute('aria-expanded', 'false');
            }
        }
    }
    updatePosition(ctxButton, x, y) {
        const contextMenu = this, width = contextMenu.options.width || 0, left = (ctxButton ?
            ctxButton.offsetLeft - width + ctxButton.offsetWidth :
            x), top = ctxButton ? ctxButton.offsetTop + ctxButton.offsetHeight : y;
        if (left && top) {
            contextMenu.container.style.left = left + 'px';
            contextMenu.container.style.top = top + 'px';
        }
    }
}
/* *
*
*  Static Properties
*
* */
EditContextMenu.defaultOptions = {
    enabled: true,
    width: 150,
    className: EditGlobals.classNames.contextMenu,
    itemsClassName: EditGlobals.classNames.contextMenuItem,
    items: ['editMode']
};
/**
 * Default Context menu items.
 */
EditContextMenu.items = merge(Menu.items, {
    editMode: {
        id: 'editMode',
        type: 'toggle',
        getValue: function (item) {
            return item.menu.editMode.isActive();
        },
        langKey: 'editMode',
        events: {
            click: function () {
                this.menu.editMode.onEditModeToggle();
            }
        }
    }
});
export default EditContextMenu;
