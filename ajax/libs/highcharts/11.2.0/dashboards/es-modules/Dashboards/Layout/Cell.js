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
'use strict';
import Bindings from '../Actions/Bindings.js';
const { componentFromJSON } = Bindings;
import EditGlobals from '../EditMode/EditGlobals.js';
import Globals from '../Globals.js';
import GUIElement from './GUIElement.js';
import U from '../../Core/Utilities.js';
const { merge, fireEvent } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * @internal
 **/
class Cell extends GUIElement {
    /* *
     *
     *  Static Properties
     *
     * */
    /** @internal */
    static fromJSON(json, row) {
        if (row) {
            const options = json.options;
            let id = options.containerId;
            if (row.layout.copyId) {
                id = id + '_' + row.layout.copyId;
            }
            return new Cell(row, {
                id: id,
                parentContainerId: (row.container && row.container.id) ||
                    options.parentContainerId,
                mountedComponentJSON: options.mountedComponentJSON,
                style: options.style,
                layoutJSON: options.layoutJSON,
                width: options.width,
                height: options.height
            });
        }
        return void 0;
    }
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the Cell class.
     *
     * @param {Row} row
     * Reference to the row instance.
     *
     * @param {Cell.Options} options
     * Options for the cell.
     *
     * @param {HTMLElement} cellElement
     * The container of the cell HTML element.
     */
    constructor(row, options, cellElement) {
        super();
        /**
         * The type of GUI element.
         */
        this.type = Globals.guiElementType.cell;
        this.id = options.id;
        this.options = options;
        this.row = row;
        this.isVisible = true;
        // Get parent container
        const parentContainer = document.getElementById(options.parentContainerId || '') ||
            row.container;
        const layoutOptions = row.layout.options || {}, rowOptions = row.options || {}, cellClassName = layoutOptions.cellClassName || '';
        let cellHeight;
        if (options.height) {
            if (typeof options.height === 'number') {
                cellHeight = options.height + 'px';
            }
            else {
                cellHeight = options.height;
            }
        }
        this.container = this.getElementContainer({
            render: row.layout.board.guiEnabled,
            parentContainer: parentContainer,
            attribs: {
                id: options.id,
                className: Globals.classNames.cell + ' ' +
                    cellClassName
            },
            element: cellElement,
            elementId: options.id,
            style: merge(layoutOptions.style, rowOptions.style, options.style, {
                height: cellHeight
            })
        });
        // Set cell width respecting responsive options.
        this.reflow();
        // Mount component from JSON.
        if (this.options.mountedComponentJSON) {
            this.mountComponentFromJSON(this.options.mountedComponentJSON, this.container);
        }
        // nested layout
        if (this.options.layout) {
            this.setNestedLayout();
        }
        if (this.options.layoutJSON) {
            const layout = this.row.layout, board = layout.board, layoutFromJSON = layout.constructor.fromJSON;
            this.nestedLayout = layoutFromJSON(merge(this.options.layoutJSON, {
                parentContainerId: this.options.id
            }), board, this);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create a nested layout in the cell and assign it to the nestedCell
     * property.
     * @internal
     */
    setNestedLayout() {
        const board = this.row.layout.board, Layout = this.row.layout.constructor;
        const optionsGui = board.options.gui;
        this.nestedLayout = new Layout(board, merge({}, optionsGui && optionsGui.layoutOptions, this.options.layout, {
            parentContainerId: this.options.id
        }), this);
    }
    /**
     * Mount component from JSON.
     * @internal
     *
     * @param {Component.JSON} [json]
     * Component JSON.
     *
     * @param {HTMLDOMElement} [cellContainer]
     * Cell container
     *
     * @return {boolean}
     * Returns true, if the component created from JSON is mounted,
     * otherwise false.
     */
    mountComponentFromJSON(json, cellContainer // @todo
    ) {
        const cell = this;
        if (cell.id !== json.options.parentElement) {
            json.options.parentElement = cell.id;
        }
        const component = componentFromJSON(json, cellContainer);
        if (component) {
            cell.mountedComponent = component;
            return true;
        }
        return false;
    }
    /**
     * Destroy the element, its container, event hooks
     * and mounted component.
     */
    destroy() {
        const cell = this;
        const { row } = cell;
        // Destroy mounted component.
        if (cell.mountedComponent) {
            cell.mountedComponent.destroy();
        }
        row.unmountCell(cell);
        const destroyRow = row.cells.length === 0;
        super.destroy();
        if (destroyRow) {
            row.destroy();
        }
    }
    /**
     * Converts the class instance to a class JSON.
     * @internal
     *
     * @return {Cell.JSON}
     * Class JSON of this Cell instance.
     */
    toJSON() {
        const cell = this, rowContainerId = (cell.row.container || {}).id || '';
        return {
            $class: 'Dashboards.Layout.Cell',
            options: {
                containerId: cell.container.id,
                parentContainerId: rowContainerId,
                width: cell.options.width,
                height: cell.options.height,
                mountedComponentJSON: cell.mountedComponent && cell.mountedComponent.toJSON(),
                style: cell.options.style,
                layoutJSON: cell.nestedLayout && cell.nestedLayout.toJSON()
            }
        };
    }
    /**
     * Get the cell's options.
     * @returns
     * The JSON of cell's options.
     *
     * @internal
     *
     */
    getOptions() {
        return this.options;
    }
    changeVisibility(setVisible = true) {
        super.changeVisibility(setVisible);
        const cell = this, row = cell.row;
        // Change row visibility if needed.
        if (!cell.row.getVisibleCells().length) {
            cell.row.hide();
        }
        else if (cell.isVisible && !row.isVisible) {
            cell.row.show();
        }
        setTimeout(() => {
            fireEvent(row, 'cellChange', { row, cell });
        }, 0);
    }
    getParentCell(level) {
        const cell = this;
        let parentCell;
        if (level <= cell.row.layout.level) {
            if (cell.row.layout.level === level) {
                return cell;
            }
            if (cell.row.layout.level - 1 >= 0) {
                parentCell = cell.row.layout.parentCell;
                if (parentCell) {
                    return parentCell.getParentCell(level);
                }
            }
        }
    }
    // Method to get array of overlapping levels.
    getOverlappingLevels(align, // left, right, top, bottom
    levelMaxGap, // max distance between levels
    offset // analized cell offset
    ) {
        const cell = this, parentCell = cell.row.layout.parentCell;
        let levels = [cell.row.layout.level];
        if (parentCell) {
            const cellOffset = offset || GUIElement.getOffsets(cell)[align];
            const parentCellOffset = GUIElement.getOffsets(parentCell)[align];
            if (Math.abs(cellOffset - parentCellOffset) < levelMaxGap) {
                levels = [
                    ...levels,
                    ...parentCell.getOverlappingLevels(align, levelMaxGap, parentCellOffset)
                ];
            }
        }
        return levels;
    }
    reflow(dashContainerSize) {
        const cell = this, cntSize = dashContainerSize ||
            cell.row.layout.board.getLayoutContainerSize(), respoOptions = cell.options.responsive, optWidth = cell.options.width;
        if (cell.container) {
            let width = '';
            if (respoOptions &&
                respoOptions[cntSize] &&
                respoOptions[cntSize].width) {
                width = cell.convertWidthToValue(respoOptions[cntSize].width);
            }
            else if (optWidth) {
                width = cell.convertWidthToValue(optWidth);
            }
            cell.setSize(width || 'auto');
        }
    }
    /**
     * Set cell size.
     *
     * @param width
     * % value or 'auto' or px
     *
     * @param height
     * value in px
     */
    setSize(width, height) {
        const cell = this, editMode = cell.row.layout.board.editMode;
        if (cell.container) {
            if (width) {
                if (width === 'auto' &&
                    cell.container.style.flex !== '1 1 0%') {
                    cell.container.style.flex = '1 1 0%';
                }
                else {
                    const cellWidth = cell.convertWidthToValue(width);
                    if (cellWidth &&
                        cell.container.style.flex !== '0 0 ' + cellWidth) {
                        cell.container.style.flex = '0 0 ' + cellWidth;
                    }
                    cell.options.width = cellWidth;
                }
            }
            if (height) {
                cell.options.height = cell.container.style.height =
                    height + 'px';
            }
            if (editMode) {
                editMode.hideContextPointer();
                if (editMode.cellToolbar &&
                    editMode.cellToolbar.isVisible) {
                    if (editMode.cellToolbar.cell === cell) {
                        editMode.cellToolbar.showToolbar(cell);
                    }
                    else {
                        editMode.cellToolbar.hide();
                    }
                }
            }
            // Call cellResize board event.
            fireEvent(cell.row.layout.board, 'cellResize', { cell: cell });
            fireEvent(cell.row, 'cellChange', { cell: cell, row: cell.row });
        }
    }
    // Updates width in responsive options.
    updateSize(width, // % value or 'auto' or px
    rwdMode // small, medium, large
    ) {
        const cell = this, cntSize = rwdMode ||
            cell.row.layout.board.getLayoutContainerSize();
        if (!cell.options.responsive) {
            cell.options.responsive = {};
        }
        cell.options.responsive[cntSize] = {
            width: width
        };
    }
    setHighlight(remove) {
        const cell = this, editMode = cell.row.layout.board.editMode;
        if (cell.container && editMode) {
            const cnt = cell.container, isSet = cnt.classList.contains(EditGlobals.classNames.cellEditHighlight);
            if (!remove && !isSet) {
                cnt.classList.add(EditGlobals.classNames.cellEditHighlight);
                cell.row.layout.board.container.classList.add(EditGlobals.classNames.dashboardCellEditHighlightActive);
                cell.isHighlighted = true;
            }
            else if (remove && isSet) {
                cnt.classList.remove(EditGlobals.classNames.cellEditHighlight);
                cell.row.layout.board.container.classList.remove(EditGlobals.classNames.dashboardCellEditHighlightActive);
                cell.isHighlighted = false;
            }
        }
    }
    setActiveState() {
        // reset other boxes
        const cell = this;
        cell.row.layout.board.mountedComponents.forEach((mountedComponent) => {
            if (mountedComponent.cell.container) {
                mountedComponent.cell.container.classList.remove(Globals.classNames.cellActive);
            }
        });
        // apply class
        if (cell.container) {
            cell.container.classList.add(Globals.classNames.cellActive);
        }
    }
    /**
     * Enables or disables the loading indicator in the cell.
     *
     * @internal
     */
    setLoadingState(enabled = true) {
        this.container?.classList?.toggle(Globals.classNames.cellLoading, enabled);
    }
    convertWidthToValue(width) {
        if (typeof width === 'number') {
            return width + 'px';
        }
        if (/px/.test(width)) {
            return width;
        }
        return GUIElement.getPercentageWidth(width) || '';
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Cell;
