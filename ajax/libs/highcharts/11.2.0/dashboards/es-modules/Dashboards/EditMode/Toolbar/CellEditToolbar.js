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
const { merge, fireEvent, objectEach } = U;
/**
 * @internal
 */
class CellEditToolbar extends EditToolbar {
    static getItemsConfig(options, iconURLPrefix) {
        const items = [];
        if (options.dragDrop?.enabled) {
            items.push({
                id: 'drag',
                type: 'icon',
                icon: iconURLPrefix + 'drag.svg',
                events: {
                    onmousedown: function (e) {
                        const cellEditToolbar = this.menu
                            .parent;
                        const dragDrop = cellEditToolbar.editMode.dragDrop;
                        if (dragDrop && cellEditToolbar.cell) {
                            dragDrop.onDragStart(e, cellEditToolbar.cell);
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
                        this.menu.parent.onCellOptions();
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
                            callback: parentNode.onCellDestroy,
                            context: parentNode
                        },
                        cancelButton: {
                            value: editMode.lang.cancelButton,
                            callback: () => {
                                popup.closePopup();
                            }
                        },
                        text: editMode.lang.confirmDestroyCell
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
        super(editMode, merge(CellEditToolbar.defaultOptions, (editMode.options.toolbars || {}).cell, {
            menu: {
                items: CellEditToolbar.getItemsConfig(editMode.options, editMode.iconsURLPrefix)
            }
        }));
        this.menu.initItems({});
    }
    /* *
     *
     *  Functions
     *
     * */
    showToolbar(cell) {
        const toolbar = this, cellCnt = cell.container, toolbarWidth = 30, toolbarMargin = 10;
        let x, y;
        if (cellCnt &&
            toolbar.editMode.isActive() &&
            !(toolbar.editMode.dragDrop || {}).isActive) {
            const cellOffsets = GUIElement.getOffsets(cell, toolbar.editMode.board.container);
            x = cellOffsets.right - toolbarWidth - toolbarMargin;
            y = cellOffsets.top + toolbarMargin;
            // Temp - activate all items.
            objectEach(toolbar.menu.items, (item) => {
                item.activate();
            });
            toolbar.setPosition(x, y);
            toolbar.cell = cell;
            toolbar.refreshOutline();
        }
        else if (toolbar.isVisible) {
            toolbar.hide();
        }
    }
    refreshOutline() {
        const toolbar = this, offsetWidth = -1;
        if (toolbar.cell && toolbar.cell.container && toolbar.outline) {
            super.refreshOutline(-toolbar.cell.container.offsetWidth, 0, this.cell, offsetWidth);
        }
    }
    onCellOptions() {
        const toolbar = this;
        if (toolbar.editMode.sidebar) {
            toolbar.editMode.sidebar.show(toolbar.cell);
            if (this.cell) {
                this.cell.setHighlight();
            }
        }
    }
    onCellDestroy() {
        const toolbar = this;
        if (toolbar.cell) {
            const row = toolbar.cell.row;
            toolbar.resetEditedCell();
            toolbar.cell.destroy();
            toolbar.cell = void 0;
            // Hide row and cell toolbars.
            toolbar.editMode.hideToolbars(['cell', 'row']);
            // Call cellResize dashboard event.
            if (row && row.cells && row.cells.length) {
                fireEvent(toolbar.editMode.board, 'cellResize', {
                    cell: row.cells[0]
                });
                fireEvent(row, 'cellChange', { cell: row.cells[0], row });
            }
        }
    }
    resetEditedCell() {
        this.editedCell = void 0;
    }
}
/* *
 *
 *  Static Properties
 *
 * */
CellEditToolbar.defaultOptions = {
    enabled: true,
    className: EditGlobals.classNames.editToolbar,
    outline: false,
    outlineClassName: EditGlobals.classNames.editToolbarCellOutline,
    menu: {
        className: EditGlobals.classNames.editToolbarCell,
        itemsClassName: EditGlobals.classNames.editToolbarItem,
        items: []
    }
};
export default CellEditToolbar;
