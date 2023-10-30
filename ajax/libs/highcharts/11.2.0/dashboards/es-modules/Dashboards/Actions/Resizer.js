import EditGlobals from '../EditMode/EditGlobals.js';
import GUIElement from '../Layout/GUIElement.js';
import U from '../../Core/Utilities.js';
const { merge, addEvent, createElement, fireEvent, removeEvent, pick } = U;
/**
 * Class providing a resizing functionality.
 */
class Resizer {
    /* *
    *
    *  Static Properties
    *
    * */
    /**
     * Creates a new instance of the Resizer class based on JSON.
     * @internal
     */
    static fromJSON(editMode, json) {
        return new Resizer(editMode, json.options);
    }
    /* *
    *
    *  Constructors
    *
    * */
    /**
     * Constructor for the Resizer class.
     *
     * @param {EditMode} editMode
     * The parent editMode reference.
     *
     * @param {Resizer.Options} options
     * Options for the Resizer.
     */
    constructor(editMode, options) {
        this.editMode = editMode;
        this.options = merge({}, Resizer.defaultOptions, editMode.options.resize, options);
        this.currentCell = void 0;
        this.isX = this.options.type.indexOf('x') > -1;
        this.isY = this.options.type.indexOf('y') > -1;
        this.isActive = false;
        this.startX = 0;
        this.tempSiblingsWidth = [];
        this.addSnaps();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add Snap - create snaps and add events.
     *
     */
    addSnaps() {
        const iconsURLPrefix = this.editMode.iconsURLPrefix;
        const snapWidth = this.options.snap.width || 0;
        const snapHeight = this.options.snap.height || 0;
        const dashboardContainer = this.editMode.board.container;
        // Right snap
        this.snapRight = createElement('img', {
            className: EditGlobals.classNames.resizeSnap + ' ' +
                EditGlobals.classNames.resizeSnapX,
            src: iconsURLPrefix + 'resize-handle.svg'
        }, {
            width: snapWidth + 'px',
            height: snapHeight + 'px',
            left: -9999 + 'px'
        }, dashboardContainer);
        // Bottom snap
        this.snapBottom = createElement('img', {
            className: EditGlobals.classNames.resizeSnap + ' ' +
                EditGlobals.classNames.resizeSnapY,
            src: iconsURLPrefix + 'resize-handle.svg'
        }, {
            width: snapWidth + 'px',
            height: snapHeight + 'px',
            top: -9999 + 'px',
            left: '0px'
        }, dashboardContainer);
        this.addResizeEvents();
    }
    /**
     * Hide snaps
     *
     */
    disableResizer() {
        this.isActive = false;
        this.currentDimension = void 0;
        this.currentCell = void 0;
        if (this.snapRight) {
            this.snapRight.style.left = '-9999px';
        }
        if (this.snapBottom) {
            this.snapBottom.style.left = '-9999px';
        }
    }
    /**
     * Update snap position.
     *
     * @param cell
     * Cell reference
     */
    setSnapPositions(cell) {
        // Set current cell
        this.currentCell = cell;
        // Set position of snaps
        const cellOffsets = GUIElement.getOffsets(cell, this.editMode.board.container);
        const left = cellOffsets.left || 0;
        const top = cellOffsets.top || 0;
        const { width, height } = GUIElement.getDimFromOffsets(cellOffsets);
        const snapWidth = (this.options.snap.width || 0);
        const snapHeight = (this.options.snap.height || 0);
        if (this.snapRight) {
            this.snapRight.style.left = (left + width - snapWidth) + 'px';
            this.snapRight.style.top = top + (height / 2) - (snapHeight / 2) + 'px';
        }
        if (this.snapBottom) {
            this.snapBottom.style.top = (top + height - snapHeight) + 'px';
            this.snapBottom.style.left = (left + (width / 2) - (snapWidth / 2)) + 'px';
        }
    }
    /**
     * Method detects siblings and auto-width applied by flex. The resizer
     * requires static widths for correct calculations, so we need to apply
     * temporary width on siblings.
     */
    setTempWidthSiblings() {
        const currentCell = this.currentCell;
        if (currentCell) {
            const currentRwdMode = this.editMode.rwdMode, cellOffsets = GUIElement.getOffsets(currentCell), rowLevelInfo = currentCell.row.getRowLevelInfo(cellOffsets.top), rowLevelCells = (rowLevelInfo && rowLevelInfo.rowLevel.cells) || [];
            let cellContainer, cell, optionsWidth;
            for (let i = 0, iEnd = rowLevelCells.length; i < iEnd; ++i) {
                cell = rowLevelCells[i];
                cellContainer = cell.container;
                optionsWidth = pick(((cell.options.responsive || {})[currentRwdMode] || {})
                    .width, cell.options.width);
                // Do not convert width on the current cell and next siblings.
                if (cell === currentCell) {
                    break;
                }
                if (cellContainer &&
                    (!optionsWidth || optionsWidth === 'auto')) {
                    cellContainer.style.flex =
                        '0 0 ' + cellContainer.offsetWidth + 'px';
                    this.tempSiblingsWidth.push(cell);
                }
            }
        }
    }
    /**
     * Revert widths to auto.
     */
    revertSiblingsAutoWidth() {
        const tempSiblingsWidth = this.tempSiblingsWidth;
        let cellContainer, cellResize;
        for (let i = 0, iEnd = tempSiblingsWidth.length; i < iEnd; ++i) {
            cellContainer = tempSiblingsWidth[i].container;
            if (cellContainer) {
                cellContainer.style.flex = '1 1 0%';
                cellResize = tempSiblingsWidth[i];
            }
        }
        this.tempSiblingsWidth = [];
        // Call cellResize dashboard event.
        if (cellResize) {
            fireEvent(this.editMode.board, 'cellResize', {
                cell: cellResize
            });
            fireEvent(cellResize.row, 'cellChange', {
                cell: cellResize,
                row: cellResize.row
            });
        }
    }
    /**
     * Add mouse events to snaps
     *
     */
    addResizeEvents() {
        const resizer = this;
        let mouseDownSnapX, mouseDownSnapY, mouseMoveSnap, mouseUpSnap;
        resizer.mouseDownSnapX = mouseDownSnapX = function (e) {
            resizer.isActive = true;
            resizer.currentDimension = 'x';
            resizer.editMode.hideToolbars(['row', 'cell']);
            resizer.setTempWidthSiblings();
            resizer.startX = e.clientX;
        };
        resizer.mouseDownSnapY = mouseDownSnapY = function (e) {
            resizer.isActive = true;
            resizer.currentDimension = 'y';
            resizer.editMode.hideToolbars(['row', 'cell']);
        };
        resizer.mouseMoveSnap = mouseMoveSnap = function (e) {
            if (resizer.isActive) {
                resizer.onMouseMove(e);
            }
        };
        resizer.mouseUpSnap = mouseUpSnap = function (e) {
            if (resizer.isActive) {
                resizer.isActive = false;
                resizer.currentDimension = void 0;
                resizer.revertSiblingsAutoWidth();
                resizer.editMode.showToolbars(['row', 'cell'], resizer.currentCell);
                if (resizer.currentCell) {
                    resizer.setSnapPositions(resizer.currentCell);
                }
            }
        };
        // Add mouse events
        addEvent(this.snapRight, 'mousedown', mouseDownSnapX);
        addEvent(this.snapBottom, 'mousedown', mouseDownSnapY);
        addEvent(document, 'mousemove', mouseMoveSnap);
        addEvent(document, 'mouseup', mouseUpSnap);
        // Touch events
        // if (hasTouch) {
        //     addEvent(snapX, 'touchstart', mouseDownSnapX);
        //     addEvent(snapY, 'touchstart', mouseDownSnapY);
        //     if (!rowContainer.hcEvents.mousemove) {
        //         addEvent(rowContainer, 'touchmove', mouseMoveSnap);
        //         addEvent(rowContainer, 'touchend', mouseUpSnap);
        //     }
        // }
        const runReflow = () => {
            if (resizer.currentCell) {
                resizer.setSnapPositions(resizer.currentCell);
            }
        };
        if (typeof ResizeObserver === 'function') {
            this.resizeObserver = new ResizeObserver(runReflow);
            this.resizeObserver.observe(resizer.editMode.board.container);
        }
        else {
            const unbind = addEvent(window, 'resize', runReflow);
            addEvent(this, 'destroy', unbind);
        }
    }
    /**
     * General method used on resizing.
     *
     * @param {global.Event} e
     * A mouse event.
     *
     */
    onMouseMove(e) {
        const currentCell = this.currentCell;
        const cellContainer = currentCell && currentCell.container;
        const currentDimension = this.currentDimension;
        const sidebar = this.editMode.sidebar;
        const currentRwdMode = sidebar && sidebar.editMode.rwdMode;
        if (currentCell &&
            cellContainer &&
            !((currentCell.row.layout.board.editMode || {}).dragDrop || {})
                .isActive) {
            const cellOffsets = GUIElement.getOffsets(currentCell);
            const { width: parentRowWidth } = GUIElement.getDimFromOffsets(GUIElement.getOffsets(currentCell.row));
            // Resize width
            if (currentDimension === 'x') {
                const newWidth = (Math.min(e.clientX - cellOffsets.left, parentRowWidth) /
                    parentRowWidth) *
                    100 +
                    '%';
                currentCell.setSize(newWidth);
                currentCell.updateSize(newWidth, currentRwdMode);
                this.startX = e.clientX;
            }
            // Resize height
            if (currentDimension === 'y') {
                currentCell.setSize(void 0, e.clientY - cellOffsets.top);
            }
            // Call cellResize dashboard event.
            fireEvent(this.editMode.board, 'cellResize', {
                cell: currentCell
            });
            fireEvent(currentCell.row, 'cellChange', {
                cell: currentCell,
                row: currentCell.row
            });
            this.setSnapPositions(currentCell);
        }
    }
    /**
     * Destroy resizer
     */
    destroy() {
        const snaps = ['snapRight', 'snapBottom'];
        let snap;
        // Unbind events
        removeEvent(document, 'mousemove');
        removeEvent(document, 'mouseup');
        this.resizeObserver?.unobserve(this.editMode.board.container);
        for (let i = 0, iEnd = snaps.length; i < iEnd; ++i) {
            snap = this[snaps[i]];
            // Unbind event
            removeEvent(snap, 'mousedown');
            // Destroy snap
            snap.remove();
        }
    }
    /**
     * Converts the class instance to a class JSON.
     * @internal
     *
     * @return {Resizer.JSON}
     * Class JSON of this Resizer instance.
     */
    toJSON() {
        const options = this.options;
        return {
            $class: 'Dashboards.Action.Resizer',
            options: {
                enabled: options.enabled,
                styles: {
                    minWidth: options.styles.minWidth,
                    minHeight: options.styles.minHeight
                },
                type: options.type,
                snap: {
                    width: options.snap.width,
                    height: options.snap.height
                }
            }
        };
    }
}
Resizer.defaultOptions = {
    enabled: true,
    styles: {
        minWidth: 20,
        minHeight: 50
    },
    type: 'xy',
    snap: {
        width: 9,
        height: 17
    }
};
export default Resizer;
