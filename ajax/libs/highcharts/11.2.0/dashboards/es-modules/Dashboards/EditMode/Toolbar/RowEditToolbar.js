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
import U from '../../../Core/Utilities.js';
import EditGlobals from '../EditGlobals.js';
import EditToolbar from './EditToolbar.js';
import GUIElement from '../../Layout/GUIElement.js';
const { merge, objectEach } = U;
/**
 * @internal
 */
class RowEditToolbar extends EditToolbar {
    static getMenuItemsConfig(options, iconURLPrefix) {
        const items = [];
        if (options.dragDrop?.enabled) {
            items.push({
                id: 'drag',
                type: 'icon',
                icon: iconURLPrefix + 'drag.svg',
                events: {
                    onmousedown: function (e) {
                        const rowEditToolbar = this.menu
                            .parent, dragDrop = rowEditToolbar.editMode.dragDrop;
                        if (dragDrop && rowEditToolbar.row) {
                            dragDrop.onDragStart(e, rowEditToolbar.row);
                        }
                    }
                }
            });
        }
        if (options.settings?.enabled) {
            items.push({
                id: 'settings',
                type: 'icon',
                icon: iconURLPrefix + 'settings.svg',
                events: {
                    click: function (e) {
                        this.menu.parent.editMode.setEditOverlay();
                        this.menu.parent.onRowOptions(e);
                    }
                }
            });
        }
        items.push({
            id: 'destroy',
            type: 'icon',
            className: EditGlobals.classNames.menuDestroy,
            icon: iconURLPrefix + 'destroy.svg',
            events: {
                click: function (e) {
                    const parentNode = this.menu.parent, editMode = this.menu.parent.editMode, popup = editMode.confirmationPopup;
                    popup.show({
                        confirmButton: {
                            value: editMode.lang.confirmButton,
                            callback: parentNode.onRowDestroy,
                            context: parentNode
                        },
                        cancelButton: {
                            value: editMode.lang.cancelButton,
                            callback: () => {
                                popup.closePopup();
                            }
                        },
                        text: editMode.lang.confirmDestroyRow
                    });
                }
            }
        });
        return items;
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor(editMode) {
        super(editMode, merge(RowEditToolbar.defaultOptions, (editMode.options.toolbars || {}).row, {
            menu: {
                items: RowEditToolbar.getMenuItemsConfig(editMode.options, editMode.iconsURLPrefix)
            }
        }));
        this.menu.initItems({});
    }
    /* *
     *
     *  Functions
     *
     * */
    refreshOutline(x, y) {
        const toolbar = this, offsetWidth = 2;
        if (toolbar.row && toolbar.row.container) {
            super.refreshOutline(x, y, this.row, offsetWidth);
        }
    }
    showToolbar(row) {
        const toolbar = this, rowCnt = row.container;
        let x, y, offsetX;
        if (rowCnt &&
            toolbar.editMode.isActive() &&
            !(toolbar.editMode.dragDrop || {}).isActive) {
            const rowOffsets = GUIElement.getOffsets(row, toolbar.editMode.board.container);
            const rowWidth = rowOffsets.right - rowOffsets.left;
            // Temp - activate all items.
            objectEach(toolbar.menu.items, (item) => {
                item.activate();
            });
            offsetX = rowWidth / 2 - toolbar.container.clientWidth / 2;
            x = rowOffsets.left + offsetX;
            y = rowOffsets.top - toolbar.container.clientHeight;
            toolbar.setPosition(x, y);
            toolbar.row = row;
            toolbar.refreshOutline(-offsetX, toolbar.container.clientHeight);
        }
        else if (toolbar.isVisible) {
            toolbar.hide();
        }
    }
    onRowOptions(e) {
        const toolbar = this;
        if (toolbar.editMode.sidebar) {
            toolbar.editMode.sidebar.show(toolbar.row);
            // toolbar.editMode.sidebar.updateTitle('ROW OPTIONS');
            // @ToDo - mask is buggy - should be refactored or removed.
            // if (this.row) {
            //     super.maskNotEditedElements(
            //         this.row,
            //         true
            //     );
            //     this.editedRow = this.row;
            // }
        }
    }
    onRowDestroy(e) {
        const toolbar = this;
        if (toolbar.row) {
            this.resetEditedRow();
            toolbar.row.destroy();
            toolbar.row = void 0;
            // Hide row and cell toolbars.
            toolbar.editMode.hideToolbars(['cell', 'row']);
        }
    }
    resetEditedRow() {
        // super.resetCurrentElements(this.row as Row, true);
        this.editedRow = void 0;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
RowEditToolbar.defaultOptions = {
    enabled: true,
    className: EditGlobals.classNames.editToolbar,
    outline: true,
    outlineClassName: EditGlobals.classNames.editToolbarRowOutline,
    menu: {
        className: EditGlobals.classNames.editToolbarRow,
        itemsClassName: EditGlobals.classNames.editToolbarItem,
        items: []
    }
};
export default RowEditToolbar;
