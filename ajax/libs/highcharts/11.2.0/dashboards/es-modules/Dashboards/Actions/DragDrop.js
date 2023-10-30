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
import U from '../../Core/Utilities.js';
import Globals from '../Globals.js';
import EditGlobals from '../EditMode/EditGlobals.js';
import GUIElement from '../Layout/GUIElement.js';
import ContextDetection from './ContextDetection.js';
const { addEvent, merge, css, fireEvent, createElement } = U;
/**
 * Class providing a drag and drop functionality.
 * @internal
 */
class DragDrop {
    /* *
     *
     *  Constructors
     *
     * */
    /**
     * Constructor for the DragDrop class.
     * @internal
     *
     * @param {EditMode} editMode
     * The parent editMode reference.
     *
     * @param {DragDrop.Options} options
     * Options for the DragDrop.
     */
    constructor(editMode, options) {
        this.editMode = editMode;
        this.options = merge(DragDrop.defaultOptions, options);
        this.mockElement = createElement('div', { className: EditGlobals.classNames.dragMock }, {}, editMode.board.container);
        this.dropPointer = {
            isVisible: false,
            align: '',
            element: createElement('div', { className: EditGlobals.classNames.dropPointer }, {}, editMode.board.container)
        };
        this.isActive = false;
        this.initEvents();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Method for showing and positioning drop pointer.
     *
     * @param {number} left
     * Drop pointer left position.
     *
     * @param {number} top
     * Drop pointer top position.
     *
     * @param {number} width
     * Drop pointer width.
     *
     * @param {number} height
     * Drop pointer height.
     */
    showDropPointer(left, top, width, height) {
        this.dropPointer.isVisible = true;
        css(this.dropPointer.element, {
            display: 'block',
            left: left + 'px',
            top: top + 'px',
            height: height + 'px',
            width: width + 'px'
        });
    }
    /**
     * Method for hiding drop pointer.
     */
    hideDropPointer() {
        if (this.dropPointer.isVisible) {
            this.dropPointer.isVisible = false;
            this.dropPointer.align = '';
            this.dropPointer.element.style.display = 'none';
        }
    }
    /**
     * Method for positioning drag mock element.
     *
     * @param {PointerEvent} mouseEvent
     * Mouse event.
     */
    setMockElementPosition(mouseEvent) {
        const dragDrop = this, dashBoundingRect = dragDrop.editMode.board.container.getBoundingClientRect(), offset = dragDrop.mockElement.clientWidth / 2, x = mouseEvent.clientX - dashBoundingRect.left - offset, y = mouseEvent.clientY - dashBoundingRect.top - offset;
        css(this.mockElement, { left: x + 'px', top: y + 'px' });
    }
    /**
     * Method for initializing drag drop events.
     */
    initEvents() {
        const dragDrop = this;
        // DragDrop events.
        addEvent(document, 'mousemove', dragDrop.onDrag.bind(dragDrop));
        addEvent(document, 'mouseup', dragDrop.onDragEnd.bind(dragDrop));
    }
    /**
     * General method used on drag start.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {Cell|Row} context
     * Reference to the dragged context.
     *
     * @param {Function} dragEndCallback
     * Callback invoked on drag end.
     */
    onDragStart(e, context, dragEndCallback) {
        this.isActive = true;
        this.editMode.hideToolbars(['cell', 'row']);
        if (this.editMode.resizer) {
            this.editMode.resizer.disableResizer();
        }
        this.setMockElementPosition(e);
        if (context) {
            this.context = context;
            context.hide();
            if (context.getType() === Globals.guiElementType.cell) {
                const draggedCell = context;
                // Call cellResize board event.
                fireEvent(this.editMode.board, 'cellResize', { cell: context });
                fireEvent(draggedCell.row, 'cellChange', { cell: context, row: draggedCell.row });
            }
        }
        else if (dragEndCallback) {
            this.dragEndCallback = dragEndCallback;
        }
        css(this.mockElement, {
            cursor: 'grabbing',
            display: 'block'
        });
    }
    /**
     * General method used while dragging.
     *
     * @param {PointerEvent} e
     * Mouse event.
     */
    onDrag(e) {
        const dragDrop = this;
        if (dragDrop.isActive) {
            e.preventDefault();
            dragDrop.setMockElementPosition(e);
            if (dragDrop.context) {
                if (dragDrop.context.getType() ===
                    Globals.guiElementType.cell) {
                    dragDrop.onCellDrag(e);
                }
                else if (dragDrop.context.getType() ===
                    Globals.guiElementType.row) {
                    dragDrop.onRowDrag(e);
                }
            }
            else if (dragDrop.dragEndCallback) {
                dragDrop.onCellDrag(e);
            }
        }
    }
    /**
     * General method used when drag finish.
     */
    onDragEnd() {
        const dragDrop = this;
        if (dragDrop.isActive) {
            dragDrop.isActive = false;
            css(dragDrop.mockElement, {
                cursor: 'grab',
                display: 'none'
            });
            if (dragDrop.context) {
                if (dragDrop.context.getType() ===
                    Globals.guiElementType.cell) {
                    dragDrop.onCellDragEnd();
                }
                else if (dragDrop.context.getType() ===
                    Globals.guiElementType.row) {
                    dragDrop.onRowDragEnd();
                }
                dragDrop.context = void 0;
                // Show toolbars and snaps.
                if (dragDrop.editMode.editCellContext) {
                    dragDrop.editMode.showToolbars(['row', 'cell'], dragDrop.editMode.editCellContext);
                    if (dragDrop.editMode.resizer) {
                        dragDrop.editMode.resizer.setSnapPositions(dragDrop.editMode.editCellContext);
                    }
                }
            }
            else if (dragDrop.dragEndCallback) {
                dragDrop.dragEndCallback(dragDrop.dropContext);
                dragDrop.dragEndCallback = void 0;
                dragDrop.hideDropPointer();
            }
        }
    }
    /**
     * Sets appropriate drop context and refresh drop pointer position when
     * row is dragged or cell is dragged as a row.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {ContextDetection.ContextDetails} contextDetails
     * Context details (cell, side)
     */
    onRowDrag(e, contextDetails) {
        const dragDrop = this, mouseCellContext = dragDrop.mouseCellContext, dropPointerSize = dragDrop.options.dropPointerSize, offset = dragDrop.options.rowDropOffset;
        let updateDropPointer = false;
        if (mouseCellContext) {
            const context = (contextDetails ||
                ContextDetection.getContext(mouseCellContext, e, offset));
            const align = context.side;
            if (dragDrop.dropPointer.align !== align ||
                dragDrop.dropContext !== context.cell.row) {
                updateDropPointer = true;
                dragDrop.dropPointer.align = align;
                dragDrop.dropContext = context.cell.row;
            }
            if (align) {
                const dropContextRowOffsets = GUIElement.getOffsets(dragDrop.dropContext, dragDrop.editMode.board.container);
                const { width, height } = GUIElement
                    .getDimFromOffsets(dropContextRowOffsets);
                // Update or show drop pointer.
                if (!dragDrop.dropPointer.isVisible || updateDropPointer) {
                    dragDrop.showDropPointer(dropContextRowOffsets.left, dropContextRowOffsets.top + (dragDrop.dropPointer.align === 'bottom' ?
                        height :
                        0) - dropPointerSize / 2, width, dropPointerSize);
                }
            }
            else {
                dragDrop.dropContext = void 0;
                dragDrop.hideDropPointer();
            }
        }
    }
    /**
     * Unmounts dropped row and mounts it in a new position.
     */
    onRowDragEnd() {
        const dragDrop = this, draggedRow = dragDrop.context, dropContext = dragDrop.dropContext;
        if (dragDrop.dropPointer.align) {
            draggedRow.layout.unmountRow(draggedRow);
            // Destroy layout when empty.
            if (draggedRow.layout.rows.length === 0) {
                draggedRow.layout.destroy();
            }
            dropContext.layout.mountRow(draggedRow, (dropContext.layout.getRowIndex(dropContext) || 0) +
                (dragDrop.dropPointer.align === 'bottom' ? 1 : 0));
            // Call cellResize board event.
            if (draggedRow.cells[0]) {
                fireEvent(dragDrop.editMode.board, 'cellResize', { cell: draggedRow.cells[0] });
                fireEvent(draggedRow, 'cellChange', { cell: draggedRow.cells[0], row: draggedRow });
            }
        }
        dragDrop.hideDropPointer();
        draggedRow.show();
    }
    /**
     * Method used as middleware when cell is dragged.
     * Decides where to pass an event depending on the mouse context.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {ContextDetection.ContextDetails} contextDetails
     * Context details (cell, side)
     */
    onCellDrag(e, contextDetails) {
        const dragDrop = this, mouseCellContext = dragDrop.mouseCellContext, offset = dragDrop.options.cellDropOffset;
        if (mouseCellContext || contextDetails) {
            dragDrop.onCellDragCellCtx(e, contextDetails ||
                ContextDetection.getContext(mouseCellContext, e, offset));
        }
        else if (dragDrop.mouseRowContext) {
            dragDrop.onCellDragRowCtx(e, dragDrop.mouseRowContext);
        }
    }
    /**
     * Sets appropriate drop context and refreshes the drop pointer
     * position when a cell is dragged and a cell context is detected.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {ContextDetection.ContextDetails} context
     * Context details (cell, side)
     */
    onCellDragCellCtx(e, context) {
        const dragDrop = this, dropPointerSize = dragDrop.options.dropPointerSize, align = context.side;
        let updateDropPointer = false;
        if (dragDrop.dropPointer.align !== align ||
            dragDrop.dropContext !== context.cell) {
            updateDropPointer = true;
            dragDrop.dropPointer.align = align;
            dragDrop.dropContext = context.cell;
        }
        if (align === 'right' || align === 'left') {
            const dropContextOffsets = GUIElement.getOffsets(dragDrop.dropContext, dragDrop.editMode.board.container);
            const { width, height } = GUIElement.getDimFromOffsets(dropContextOffsets);
            // Update or show drop pointer.
            if (!dragDrop.dropPointer.isVisible || updateDropPointer) {
                const rowLevelInfo = dragDrop.dropContext.row.getRowLevelInfo(e.clientY), pointerHeight = (rowLevelInfo ?
                    (rowLevelInfo.rowLevel.bottom -
                        rowLevelInfo.rowLevel.top) :
                    height);
                dragDrop.showDropPointer(dropContextOffsets.left + (align === 'right' ? width : 0) -
                    dropPointerSize / 2, dropContextOffsets.top, dropPointerSize, pointerHeight);
            }
        }
        else if (align === 'top' || align === 'bottom') {
            const dropContextOffsets = GUIElement.getOffsets(dragDrop.dropContext), rowLevelInfo = dragDrop.dropContext.row
                .getRowLevelInfo(dropContextOffsets.top);
            if (rowLevelInfo &&
                ((rowLevelInfo.index === 0 && align === 'top') ||
                    (rowLevelInfo.index ===
                        rowLevelInfo.rowLevels.length - 1 &&
                        align === 'bottom'))) {
                // Checks if a cell is dragged as a row
                // (only when a cell edge is on a row edge)
                dragDrop.onRowDrag(e, context);
            }
        }
        else {
            dragDrop.dropContext = void 0;
            dragDrop.hideDropPointer();
        }
    }
    /**
     * Sets appropriate drop context and refreshes the drop pointer
     * position when a cell is dragged and a row context is detected.
     *
     * @param {PointerEvent} e
     * Mouse event.
     *
     * @param {Row} mouseRowContext
     * Row context.
     */
    onCellDragRowCtx(e, mouseRowContext) {
        const dragDrop = this, dropPointerSize = dragDrop.options.dropPointerSize, rowOffsets = GUIElement.getOffsets(mouseRowContext), rowLevelInfo = mouseRowContext.getRowLevelInfo(e.clientY);
        let cell, cellOffsets;
        if (rowLevelInfo) {
            for (let i = 0, iEnd = rowLevelInfo.rowLevel.cells.length; i < iEnd; ++i) {
                cell = rowLevelInfo.rowLevel.cells[i];
                cellOffsets = GUIElement.getOffsets(cell);
                const { width, height } = GUIElement
                    .getDimFromOffsets(cellOffsets), dashOffsets = dragDrop.editMode.board.container
                    .getBoundingClientRect(), levelHeight = (rowLevelInfo.rowLevel.bottom -
                    rowLevelInfo.rowLevel.top);
                if (cell.isVisible) {
                    if (height < 0.8 * levelHeight &&
                        cellOffsets.left <= e.clientX &&
                        cellOffsets.right >= e.clientX) {
                        if (cellOffsets.top > e.clientY) {
                            // @ToDo - Mouse above the cell.
                        }
                        else if (cellOffsets.bottom < e.clientY) {
                            // Mouse below the cell.
                            dragDrop.showDropPointer(cellOffsets.left - dashOffsets.left, cellOffsets.top - dashOffsets.top + height, width, levelHeight - height);
                            dragDrop.dropPointer.align = 'nestedBottom';
                            dragDrop.dropContext = cell;
                        }
                        i = iEnd; // Stop the loop
                    }
                    else if ((i === 0 && cellOffsets.left > e.clientX) ||
                        (i === iEnd - 1 && cellOffsets.right < e.clientX)) {
                        if (cellOffsets.left > e.clientX) {
                            // @ToDo - Mouse on the cell left side.
                        }
                        else if (cellOffsets.right < e.clientX) {
                            // Mouse on the cell right side.
                            const pointerWidth = rowOffsets.right - cellOffsets.right;
                            dragDrop.showDropPointer(cellOffsets.left + ((i === 0 && cellOffsets.left > e.clientX) ?
                                0 :
                                width) - dropPointerSize / 2 - dashOffsets.left, cellOffsets.top - dashOffsets.top, pointerWidth > dropPointerSize ?
                                pointerWidth :
                                dropPointerSize, levelHeight || height);
                            dragDrop.dropPointer.align = 'right';
                            dragDrop.dropContext = cell;
                        }
                        i = iEnd; // Stop the loop
                    }
                }
                else if (!cell.isVisible && cell === dragDrop.context) {
                    // Element is not visible.
                    dragDrop.dropContext = void 0;
                    dragDrop.hideDropPointer();
                }
            }
        }
    }
    /**
     * Unmounts dropped cell and mounts it in a new position.
     * When cell is dragged as a row also creates a new row
     * and mounts cell there.
     *
     * @param {Cell} contextCell
     * Cell used as a dragDrop context.
     */
    onCellDragEnd(contextCell) {
        const dragDrop = this, draggedCell = contextCell || dragDrop.context;
        let dropContext = dragDrop.dropContext;
        if (dragDrop.dropPointer.align && dropContext && draggedCell) {
            draggedCell.row.unmountCell(draggedCell);
            // Destroy row when empty.
            if (draggedCell.row.cells.length === 0) {
                draggedCell.row.destroy();
            }
            if ((dragDrop.dropPointer.align === 'top' ||
                dragDrop.dropPointer.align === 'bottom') &&
                dropContext.getType() === Globals.guiElementType.row) {
                dropContext = dropContext;
                const newRow = dropContext.layout.addRow({}, void 0, (dropContext.layout.getRowIndex(dropContext) || 0) +
                    (dragDrop.dropPointer.align === 'bottom' ? 1 : 0));
                newRow.mountCell(draggedCell, 0);
            }
            else if (dragDrop.dropPointer.align === 'nestedBottom' &&
                dropContext.getType() === Globals.guiElementType.cell) {
                // Create nesting.
                const dropContextCell = dropContext;
                const row = dropContextCell.row;
                const dropContextCellIndex = row.getCellIndex(dropContextCell);
                row.unmountCell(dropContextCell);
                const newCell = row.addCell({
                    id: GUIElement.createElementId('col-nested-'),
                    layout: {
                        rows: [{}, {}]
                    }
                }, void 0, dropContextCellIndex);
                if (newCell.nestedLayout) {
                    newCell.nestedLayout.rows[0].mountCell(dropContextCell);
                    newCell.nestedLayout.rows[1].mountCell(draggedCell);
                }
            }
            else if (dropContext.getType() === Globals.guiElementType.cell) {
                dropContext = dropContext;
                dropContext.row.mountCell(draggedCell, (dropContext.row.getCellIndex(dropContext) || 0) +
                    (dragDrop.dropPointer.align === 'right' ? 1 : 0));
            }
        }
        // Call cellResize board event.
        fireEvent(dragDrop.editMode.board, 'cellResize', { cell: draggedCell });
        fireEvent(draggedCell.row, 'cellChange', { cell: draggedCell, row: draggedCell.row });
        dragDrop.hideDropPointer();
        draggedCell.show();
    }
}
/* *
 *
 *  Static Properties
 *
 * */
DragDrop.defaultOptions = {
    enabled: true,
    rowDropOffset: 30,
    cellDropOffset: 30,
    dropPointerSize: 16
};
/* *
 *
 *  Default Export
 *
 * */
export default DragDrop;
