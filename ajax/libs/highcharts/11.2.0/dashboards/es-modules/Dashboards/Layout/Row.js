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
import Globals from '../Globals.js';
import Cell from './Cell.js';
import GUIElement from './GUIElement.js';
import U from '../../Core/Utilities.js';
import EditGlobals from '../EditMode/EditGlobals.js';
const { pick, defined, merge, objectEach, fireEvent } = U;
/**
 * @internal
 **/
class Row extends GUIElement {
    /* *
    *
    *  Static Properties
    *
    * */
    /** @internal */
    static fromJSON(json, layout) {
        if (layout) {
            const options = json.options;
            let id = options.containerId || '';
            if (id && layout.copyId) {
                id = id + '_' + layout.copyId;
            }
            return new Row(layout, {
                id: id,
                parentContainerId: (layout.container && layout.container.id) ||
                    options.parentContainerId,
                cellsJSON: options.cells,
                style: options.style
            });
        }
        return void 0;
    }
    static setContainerHeight(rowContainer, height) {
        if (height) {
            rowContainer.style.height = height + 'px';
        }
    }
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs an instance of the Row class.
     *
     * @param {Layout} layout
     * Reference to the layout instance.
     *
     * @param {Row.Options} options
     * Options for the row.
     *
     * @param {HTMLElement} rowElement
     * The container of the row HTML element.
     */
    constructor(layout, options, rowElement) {
        super();
        /**
         * The type of GUI element.
         */
        this.type = Globals.guiElementType.row;
        this.layout = layout;
        this.cells = [];
        this.options = options;
        this.isVisible = true;
        // Get parent container
        const parentContainer = document.getElementById(options.parentContainerId || '') ||
            layout.container;
        const layoutOptions = (layout.options || {}), rowClassName = layoutOptions.rowClassName || '';
        this.container = this.getElementContainer({
            render: layout.board.guiEnabled,
            parentContainer: parentContainer,
            attribs: {
                id: options.id,
                className: Globals.classNames.row + ' ' +
                    rowClassName
            },
            element: rowElement,
            elementId: options.id,
            style: merge(layoutOptions.style, options.style)
        });
        // Init rows from options.
        if (this.options.cells) {
            this.setCells();
        }
        // Init rows from JSON.
        if (options.cellsJSON && !this.cells.length) {
            this.setCellsFromJSON(options.cellsJSON);
        }
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Set the row cells using cell options or cellClassName.
     */
    setCells() {
        const row = this, cellClassName = (row.layout.options || {}).cellClassName || '', cellsElements = pick(row.options.cells, row.container && row.container.getElementsByClassName(cellClassName)) || [];
        let cellElement, i, iEnd;
        for (i = 0, iEnd = cellsElements.length; i < iEnd; ++i) {
            cellElement = cellsElements[i];
            row.addCell(row.layout.board.guiEnabled ? cellElement : { id: '' }, cellElement instanceof HTMLElement ? cellElement : void 0);
        }
    }
    /** @internal */
    setCellsFromJSON(json) {
        const row = this, componentsToMount = [];
        let cell, cellJSON;
        // Set cells.
        for (let i = 0, iEnd = json.length; i < iEnd; ++i) {
            cellJSON = json[i];
            cell = Cell.fromJSON({
                $class: cellJSON.$class,
                options: {
                    containerId: cellJSON.options.containerId,
                    parentContainerId: cellJSON.options.parentContainerId,
                    width: cellJSON.options.width,
                    height: cellJSON.options.height,
                    style: cellJSON.options.style,
                    layoutJSON: cellJSON.options.layoutJSON,
                    mountedComponentJSON: void 0 // Will be mounted later.
                }
            }, row);
            if (cell) {
                row.cells.push(cell);
                if (cellJSON.options.mountedComponentJSON) {
                    componentsToMount.push({
                        cell: cell,
                        // eslint-disable-next-line
                        mountedComponentJSON: cellJSON.options.mountedComponentJSON
                    });
                }
            }
        }
        // Mount components.
        for (let i = 0, iEnd = componentsToMount.length; i < iEnd; ++i) {
            componentsToMount[i].cell.mountComponentFromJSON(componentsToMount[i].mountedComponentJSON, (cell || {}).container);
        }
    }
    /**
     * Add a new Cell instance to the row cells array.
     *
     * @param {Cell.Options} [options]
     * Options for the row cell.
     *
     * @param {HTMLElement} [cellElement]
     * The container for a new cell HTML element.
     *
     * @return {Cell}
     * Returns the Cell object.
     */
    addCell(options, cellElement, index) {
        const row = this, cell = new Cell(row, options, cellElement);
        if (!defined(index)) {
            row.cells.push(cell);
        }
        else {
            row.mountCell(cell, index);
        }
        // Set editMode events.
        if (row.layout.board.editMode) {
            row.layout.board.editMode.setCellEvents(cell);
        }
        return cell;
    }
    /**
     * Destroy the element, its container, event hooks
     * and inner cells.
     */
    destroy() {
        const row = this;
        const { layout } = row;
        // Destroy cells.
        for (let i = 0, iEnd = row.cells.length; i < iEnd; ++i) {
            if (row.cells[i]) {
                row.cells[i].destroy();
            }
        }
        if (row.layout) {
            row.layout.unmountRow(row);
            super.destroy();
            if (layout.rows.length === 0) {
                layout.destroy();
            }
        }
    }
    /**
     * Converts the class instance to a class JSON.
     * @internal
     *
     * @return {Row.JSON}
     * Class JSON of this Row instance.
     */
    toJSON() {
        const row = this, layoutContainerId = (row.layout.container || {}).id || '', cells = [];
        // Get cells JSON.
        for (let i = 0, iEnd = row.cells.length; i < iEnd; ++i) {
            cells.push(row.cells[i].toJSON());
        }
        return {
            $class: 'Dashboards.Layout.Row',
            options: {
                containerId: row.container.id,
                parentContainerId: layoutContainerId,
                cells: cells,
                style: row.options.style
            }
        };
    }
    /**
     * Get the row's options.
     * @returns
     * The JSON of row's options.
     *
     * @internal
     *
     */
    getOptions() {
        const row = this, cells = [];
        for (let i = 0, iEnd = row.cells.length; i < iEnd; ++i) {
            cells.push(row.cells[i].getOptions());
        }
        return {
            id: this.options.id,
            style: this.options.style,
            cells
        };
    }
    setSize(height) {
        const cells = this.cells;
        Row.setContainerHeight(this.container, height);
    }
    // Get cell index from the row.cells array.
    getCellIndex(cell) {
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            if (this.cells[i].id === cell.id) {
                return i;
            }
        }
    }
    // Add cell to the row.cells array and move cell container.
    mountCell(cell, index = 0) {
        const row = this, nextCell = row.cells[index], prevCell = row.cells[index - 1];
        if (cell.container) {
            if (nextCell && nextCell.container) {
                nextCell.container.parentNode.insertBefore(cell.container, nextCell.container);
            }
            else if (prevCell && prevCell.container) {
                prevCell.container.parentNode.insertBefore(cell.container, prevCell.container.nextSibling);
            }
            else if (!prevCell && !nextCell && row.container) {
                row.container.appendChild(cell.container);
            }
            row.cells.splice(index, 0, cell);
            cell.row = row;
            setTimeout(() => {
                fireEvent(row, 'cellChange', { row, cell });
            }, 0);
        }
    }
    // Remove cell from the row.cells array.
    unmountCell(cell) {
        const cellIndex = this.getCellIndex(cell);
        if (defined(cellIndex)) {
            this.cells.splice(cellIndex, 1);
        }
        setTimeout(() => {
            fireEvent(this, 'cellChange', { row: this, cell });
        }, 0);
    }
    getVisibleCells() {
        const cells = [];
        for (let i = 0, iEnd = this.cells.length; i < iEnd; ++i) {
            if (this.cells[i].isVisible) {
                cells.push(this.cells[i]);
            }
        }
        return cells;
    }
    changeVisibility(setVisible = true, displayStyle) {
        const row = this;
        super.changeVisibility(setVisible, displayStyle);
        // Change layout visibility if needed.
        if (!row.layout.getVisibleRows().length) {
            row.layout.hide();
        }
        else if (row.isVisible && !row.layout.isVisible) {
            row.layout.show();
        }
    }
    show() {
        this.changeVisibility(true, 'flex');
    }
    setHighlight(remove) {
        if (this.container) {
            const cnt = this.container, isSet = cnt.classList.contains(EditGlobals.classNames.rowContextHighlight);
            if (!remove && !isSet) {
                cnt.classList.add(EditGlobals.classNames.rowContextHighlight);
            }
            else if (remove && isSet) {
                cnt.classList.remove(EditGlobals.classNames.rowContextHighlight);
            }
        }
    }
    // Row can have cells below each others.
    // This method returns cells split into levels.
    getRowLevels() {
        const row = this, rowLevels = {}, rowLevelsArray = [];
        let cell, cellOffsets;
        for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
            cell = row.cells[k];
            if (cell.isVisible) {
                cellOffsets = GUIElement.getOffsets(cell);
                if (!rowLevels[cellOffsets.top]) {
                    rowLevels[cellOffsets.top] = {
                        top: cellOffsets.top,
                        bottom: cellOffsets.bottom,
                        cells: []
                    };
                }
                if (rowLevels[cellOffsets.top].bottom < cellOffsets.bottom) {
                    rowLevels[cellOffsets.top].bottom = cellOffsets.bottom;
                }
                rowLevels[cellOffsets.top].cells.push(cell);
            }
        }
        objectEach(rowLevels, (value) => {
            rowLevelsArray.push(value);
        });
        return rowLevelsArray;
    }
    // Get row level with additional info
    // on a specific Y position.
    getRowLevelInfo(posY) {
        const rowLevels = this.getRowLevels();
        let rowLevelInfo;
        for (let i = 0, iEnd = rowLevels.length; i < iEnd; ++i) {
            if (rowLevels[i].top <= posY && rowLevels[i].bottom > posY) {
                rowLevelInfo = {
                    index: i,
                    rowLevels: rowLevels,
                    rowLevel: rowLevels[i]
                };
            }
        }
        return rowLevelInfo;
    }
}
export default Row;
