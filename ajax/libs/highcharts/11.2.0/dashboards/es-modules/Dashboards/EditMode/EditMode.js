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
import EditGlobals from './EditGlobals.js';
import EditRenderer from './EditRenderer.js';
import CellEditToolbar from './Toolbar/CellEditToolbar.js';
import RowEditToolbar from './Toolbar/RowEditToolbar.js';
import SidebarPopup from './SidebarPopup.js';
import EditContextMenu from './EditContextMenu.js';
import DragDrop from '../Actions/DragDrop.js';
import Resizer from '../Actions/Resizer.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import ContextDetection from '../Actions/ContextDetection.js';
import GUIElement from '../Layout/GUIElement.js';
const { addEvent, createElement, css, merge } = U;
/* *
 *
 *  Class
 *
 * */
class EditMode {
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Edit mode constructor.
     * @internal
      *
     * @param board
     * Board instance
     *
     * @param options
     * Edit mode options
     */
    constructor(board, options) {
        /* *
        *
        *  Properties
        *
        * */
        /**
         * @internal
         */
        this.active = false;
        /**
         * URL from which the icons will be fetched.
         */
        this.iconsURLPrefix = '/code/dashboards/gfx/dashboards-icons/';
        this.iconsURLPrefix =
            (options && options.iconsURLPrefix) || this.iconsURLPrefix;
        this.options = merge(
        // Default options.
        {
            dragDrop: {
                enabled: true
            },
            resize: {
                enabled: true
            },
            settings: {
                enabled: true
            },
            enabled: true,
            contextMenu: {
                icon: this.iconsURLPrefix + 'menu.svg'
            },
            tools: {
                addComponentBtn: {
                    enabled: true,
                    icon: this.iconsURLPrefix + 'add.svg'
                },
                rwdButtons: {
                    enabled: true,
                    icons: {
                        small: this.iconsURLPrefix + 'smartphone.svg',
                        medium: this.iconsURLPrefix + 'tablet.svg',
                        large: this.iconsURLPrefix + 'computer.svg'
                    }
                }
            },
            confirmationPopup: {
                close: {
                    icon: this.iconsURLPrefix + 'close.svg'
                }
            },
            toolbars: {
                cell: {
                    enabled: true
                },
                row: {
                    enabled: true
                }
            }
        }, options || {});
        this.board = board;
        this.lang = merge({}, EditGlobals.lang, this.options.lang);
        this.contextPointer = {
            isVisible: false,
            element: createElement('div', { className: EditGlobals.classNames.contextDetectionPointer }, {}, this.board.container)
        };
        this.isInitialized = false;
        this.isContextDetectionActive = false;
        this.tools = {};
        this.rwdMenu = [];
        this.rwdMode = this.board.getLayoutContainerSize();
        this.createTools();
        this.confirmationPopup = new ConfirmationPopup(board.container, this.iconsURLPrefix, this, this.options.confirmationPopup);
        // Create edit overlay.
        this.editOverlay = createElement('div', {
            className: EditGlobals.classNames.editOverlay
        }, {}, board.container);
        this.isEditOverlayActive = false;
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Event to fire on click of the context button.
     * @internal
     */
    onContextBtnClick() {
        const editMode = this;
        // Init contextMenu if doesn't exist.
        if (!editMode.tools.contextMenu) {
            editMode.tools.contextMenu = new EditContextMenu(editMode.board.container, editMode.options.contextMenu || {}, editMode);
        }
        // Show context menu.
        if (editMode.tools.contextMenu) {
            if (!editMode.tools.contextMenu.isVisible) {
                editMode.tools.contextMenu
                    .updatePosition(editMode.tools.contextButtonElement);
            }
            editMode.tools.contextMenu.setVisible(!editMode.tools.contextMenu.isVisible);
        }
    }
    /**
     * Activate or deactivate edit mode.
     */
    onEditModeToggle() {
        const editMode = this;
        if (editMode.active) {
            editMode.deactivate();
        }
        else {
            editMode.activate();
        }
    }
    /**
     * Init the instance of edit mode.
     * @internal
     */
    init() {
        const editMode = this;
        if (this.options.resize?.enabled) {
            editMode.resizer = new Resizer(editMode, editMode.options.resize);
        }
        editMode.dragDrop = new DragDrop(editMode, editMode.options.dragDrop);
        // Init rowToolbar.
        if (editMode.options.toolbars?.row?.enabled && !editMode.rowToolbar) {
            editMode.rowToolbar = new RowEditToolbar(editMode);
        }
        // Init cellToolbar.
        if (editMode.options.toolbars?.cell?.enabled && !editMode.cellToolbar) {
            editMode.cellToolbar = new CellEditToolbar(editMode);
        }
        // Init Sidebar.
        if (!editMode.sidebar) {
            editMode.sidebar = new SidebarPopup(this.board.container, this.iconsURLPrefix, editMode);
        }
        editMode.isInitialized = true;
    }
    /**
     * Init events for edit mode.
     * @internal
     */
    initEvents() {
        const editMode = this, board = editMode.board;
        for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
            editMode.setLayoutEvents(board.layouts[i]);
        }
        if (editMode.cellToolbar) {
            // Stop context detection when mouse on cell toolbar.
            addEvent(editMode.cellToolbar.container, 'mouseenter', function () {
                editMode.stopContextDetection();
            });
            addEvent(editMode.cellToolbar.container, 'mouseleave', function () {
                editMode.isContextDetectionActive = true;
            });
        }
        if (editMode.rowToolbar) {
            // Stop context detection when mouse on row toolbar.
            addEvent(editMode.rowToolbar.container, 'mouseenter', function () {
                editMode.stopContextDetection();
            });
            addEvent(editMode.rowToolbar.container, 'mouseleave', function () {
                editMode.isContextDetectionActive = true;
            });
        }
        addEvent(board.layoutsWrapper, 'mousemove', editMode.onDetectContext.bind(editMode));
        addEvent(board.layoutsWrapper, 'click', editMode.onContextConfirm.bind(editMode));
        addEvent(board.layoutsWrapper, 'mouseleave', () => {
            editMode.hideContextPointer();
        });
    }
    /**
     * Set events for the layout.
     * @internal
     */
    setLayoutEvents(layout) {
        const editMode = this;
        for (let j = 0, jEnd = layout.rows.length; j < jEnd; ++j) {
            const row = layout.rows[j];
            editMode.setRowEvents(row);
            for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
                editMode.setCellEvents(row.cells[k]);
            }
        }
    }
    /**
     * Set events for the row.
     * @internal
     */
    setRowEvents(row) {
        const editMode = this;
        // Init dragDrop row events.
        if (editMode.dragDrop) {
            const dragDrop = editMode.dragDrop;
            addEvent(row.container, 'mouseenter', function () {
                if (editMode.isContextDetectionActive) {
                    editMode.mouseRowContext = row;
                }
            });
            addEvent(row.container, 'mousemove', function (e) {
                if (dragDrop.isActive && e.target === row.container) {
                    dragDrop.mouseRowContext = row;
                }
            });
            addEvent(row.container, 'mouseleave', function (e) {
                if (dragDrop.isActive && dragDrop.mouseRowContext === row) {
                    dragDrop.mouseRowContext = void 0;
                }
                if (editMode.isContextDetectionActive) {
                    editMode.mouseRowContext = void 0;
                }
            });
        }
    }
    /**
     * Set events for the cell.
     * @internal
     */
    setCellEvents(cell) {
        const editMode = this;
        if (cell.nestedLayout) {
            editMode.setLayoutEvents(cell.nestedLayout);
        }
        else if (editMode.cellToolbar && cell.container) {
            // Init dragDrop cell events.
            if (editMode.dragDrop || editMode.resizer) {
                const dragDrop = editMode.dragDrop;
                addEvent(cell.container, 'mouseenter', function (e) {
                    if (editMode.isContextDetectionActive) {
                        editMode.mouseCellContext = cell;
                    }
                });
                addEvent(cell.container, 'mousemove', function (e) {
                    if (dragDrop &&
                        dragDrop.isActive &&
                        e.target === cell.container) {
                        dragDrop.mouseCellContext = cell;
                        dragDrop.mouseRowContext = void 0;
                    }
                });
                addEvent(cell.container, 'mouseleave', function () {
                    if (dragDrop &&
                        dragDrop.isActive &&
                        dragDrop.mouseCellContext === cell) {
                        dragDrop.mouseCellContext = void 0;
                    }
                    if (editMode.isContextDetectionActive) {
                        editMode.mouseCellContext = void 0;
                    }
                });
            }
        }
    }
    /**
     * Activate the edit mode.
     * @internal
     */
    activate() {
        const editMode = this;
        // Init edit mode.
        if (!editMode.isInitialized) {
            editMode.init();
            editMode.initEvents();
        }
        // Set edit mode active class to dashboard.
        editMode.board.container.classList.add(EditGlobals.classNames.editModeEnabled);
        // TODO all buttons should be activated, add some wrapper?
        if (this.addComponentBtn) {
            this.addComponentBtn.style.display = 'block';
        }
        // Sets proper rwd mode.
        editMode.rwdMode = editMode.board.getLayoutContainerSize();
        // Show responsive buttons.
        this.showRwdButtons();
        editMode.active = true;
        editMode.isContextDetectionActive = true;
    }
    /**
     * Deactivate the edit mode.
     * @internal
     */
    deactivate() {
        const editMode = this, dashboardCnt = editMode.board.container;
        dashboardCnt.classList.remove(EditGlobals.classNames.editModeEnabled);
        // Hide toolbars.
        editMode.hideToolbars();
        // Remove highlight from the context row if exists.
        if (this.editCellContext) {
            this.editCellContext.row.setHighlight(true);
        }
        // TODO all buttons should be deactivated.
        if (this.addComponentBtn) {
            this.addComponentBtn.style.display = 'none';
        }
        if (editMode.resizer) {
            editMode.resizer.disableResizer();
        }
        // Hide responsive buttons.
        this.hideRwdButtons();
        // Disable responsive width and restore elements to their original
        // positions and sizes.
        this.board.layoutsWrapper.style.width = '100%';
        this.board.reflow();
        editMode.active = false;
        editMode.stopContextDetection();
        this.editCellContext = void 0;
        this.potentialCellContext = void 0;
    }
    /**
     * Function to check whether the edit mode is activated.
     * @internal
     *
     * @returns
     * Whether the edit mode is activated.
     */
    isActive() {
        return this.active;
    }
    /**
     * Method for hiding edit toolbars.
     * @internal
     *
     * @param toolbarTypes
     * The array of toolbar names to hide ('cell', 'row', 'sidebar').
     */
    hideToolbars(toolbarTypes) {
        const editMode = this, toolbarsToHide = toolbarTypes || ['cell', 'row', 'sidebar'];
        for (let i = 0, iEnd = toolbarsToHide.length; i < iEnd; ++i) {
            switch (toolbarsToHide[i]) {
                case 'cell': {
                    if (editMode.cellToolbar &&
                        editMode.cellToolbar.isVisible) {
                        editMode.cellToolbar.hide();
                    }
                    break;
                }
                case 'row': {
                    if (editMode.rowToolbar && editMode.rowToolbar.isVisible) {
                        editMode.rowToolbar.hide();
                    }
                    break;
                }
                case 'sidebar': {
                    if (editMode.sidebar && editMode.sidebar.isVisible) {
                        editMode.sidebar.hide();
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    /**
     * Method for hiding edit toolbars.
     * @internal
     *
     * @param toolbarTypes
     * The array of toolbar names to hide ('cell', 'row', 'sidebar').
     *
     * @param currentCell
     * The cell reference for toolbar.
     *
     */
    showToolbars(toolbarTypes, currentCell) {
        const editMode = this, toolbarsToShow = toolbarTypes || ['cell', 'row', 'sidebar'];
        for (let i = 0, iEnd = toolbarsToShow.length; i < iEnd; ++i) {
            switch (toolbarsToShow[i]) {
                case 'cell': {
                    if (currentCell && editMode.cellToolbar) {
                        editMode.cellToolbar.isVisible = true;
                        editMode.cellToolbar.showToolbar(currentCell);
                    }
                    break;
                }
                case 'row': {
                    if (currentCell && currentCell.row && editMode.rowToolbar) {
                        editMode.rowToolbar.isVisible = true;
                        editMode.rowToolbar.showToolbar(currentCell.row);
                    }
                    break;
                }
                case 'sidebar': {
                    if (editMode.sidebar && !editMode.sidebar.isVisible) {
                        editMode.sidebar.show();
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    /**
     * Creates the buttons such as `addComponent` button, rwd buttons and
     * context menu button.
     * @internal
     */
    createTools() {
        const editMode = this;
        const options = this.options;
        // Create tools container
        this.tools.container = document.createElement('div');
        this.tools.container.classList.add(EditGlobals.classNames.editTools);
        this.board.layoutsWrapper.parentNode.insertBefore(this.tools.container, this.board.layoutsWrapper);
        // Create context menu button
        if (options.contextMenu?.enabled) {
            this.tools.contextButtonElement = EditRenderer.renderContextButton(this.tools.container, editMode);
        }
        // Create rwd menu
        if (options.tools?.rwdButtons?.enabled) {
            this.createRwdMenu();
        }
        // Create add component button
        if (options.tools?.addComponentBtn?.enabled &&
            options.toolbars?.cell?.enabled) {
            const addIconURL = options.tools.addComponentBtn.icon;
            this.addComponentBtn = EditRenderer.renderButton(this.tools.container, {
                className: EditGlobals.classNames.editToolsBtn,
                icon: addIconURL,
                text: this.lang.addComponent,
                callback: () => {
                    // Sidebar trigger
                    if (editMode.sidebar) {
                        editMode.sidebar.show();
                        editMode.setEditOverlay();
                    }
                },
                style: {
                    display: 'none'
                }
            });
        }
    }
    /**
     * Creates the responsive width buttons.
     * @internal
     */
    createRwdMenu() {
        const rwdBreakingPoints = this.board.options.responsiveBreakpoints;
        const toolsContainer = this.tools.container;
        const options = this.options;
        const rwdIcons = options?.tools?.rwdButtons?.icons || {};
        for (const key in rwdBreakingPoints) {
            if (toolsContainer) {
                const btn = EditRenderer.renderButton(toolsContainer, {
                    className: EditGlobals.classNames.editToolsBtn,
                    icon: rwdIcons[key] || '',
                    text: this.lang[key],
                    callback: (e) => {
                        const button = e.target, isSelected = button.classList.contains('selected');
                        // Deselect given button and reset board width.
                        if (isSelected) {
                            button.classList.remove('selected');
                            this.board.layoutsWrapper.style.width = '';
                            this.rwdMode = '';
                        }
                        else {
                            // Deselect all buttons.
                            this.rwdMenu.forEach((btn) => {
                                btn.classList.remove('selected');
                            });
                            // Select given button and change board width.
                            button.classList.add('selected');
                            this.board.layoutsWrapper.style.width =
                                rwdBreakingPoints[key] + 'px';
                            this.rwdMode = key;
                        }
                        // Reflow elements.
                        this.board.reflow();
                    },
                    style: {
                        display: 'none'
                    }
                });
                if (btn) {
                    this.rwdMenu.push(btn);
                }
            }
        }
    }
    /**
     * Shows responsive buttons.
     * @internal
     */
    showRwdButtons() {
        for (let i = 0, iEnd = this.rwdMenu.length; i < iEnd; ++i) {
            this.rwdMenu[i].style.display = 'block';
        }
    }
    /**
     * Hides responsive buttons.
     * @internal
     */
    hideRwdButtons() {
        for (let i = 0, iEnd = this.rwdMenu.length; i < iEnd; ++i) {
            this.rwdMenu[i].style.display = 'none';
        }
    }
    /**
     * Event fired when detecting context on drag&drop.
     *
     * @param e
     * Mouse pointer event.
     */
    onDetectContext(e) {
        const editMode = this, offset = 50; // TODO - add it from options.
        if (editMode.isActive() &&
            editMode.isContextDetectionActive &&
            (editMode.mouseCellContext || editMode.mouseRowContext) &&
            !(editMode.dragDrop || {}).isActive) {
            let cellContext, rowContext;
            if (editMode.mouseCellContext) {
                cellContext = ContextDetection
                    .getContext(editMode.mouseCellContext, e, offset).cell;
            }
            else if (editMode.mouseRowContext) {
                rowContext = editMode.mouseRowContext;
                cellContext = rowContext.layout.parentCell;
            }
            this.potentialCellContext = cellContext;
            if (cellContext) {
                const cellContextOffsets = GUIElement
                    .getOffsets(cellContext, editMode.board.container);
                const { width, height } = GUIElement
                    .getDimFromOffsets(cellContextOffsets);
                editMode.showContextPointer(cellContextOffsets.left, cellContextOffsets.top, width, height);
            }
        }
    }
    /**
     * Stops the context detection.
     */
    stopContextDetection() {
        this.isContextDetectionActive = false;
        if (this.dragDrop) {
            this.dragDrop.mouseCellContext = void 0;
        }
        this.mouseCellContext = void 0;
        this.hideContextPointer();
    }
    /**
     * Confirms the selected context.
     */
    onContextConfirm() {
        if (this.isContextDetectionActive &&
            this.potentialCellContext &&
            this.editCellContext !== this.potentialCellContext) {
            this.setEditCellContext(this.potentialCellContext, this.editCellContext);
        }
    }
    /**
     * Sets the edit cell context.
     * @internal
     */
    setEditCellContext(editCellContext, oldEditCellContext) {
        const editMode = this, oldContextRow = oldEditCellContext && oldEditCellContext.row;
        editMode.editCellContext = editCellContext;
        editMode.showToolbars(['row', 'cell'], editCellContext);
        if (!oldContextRow || oldContextRow !== editCellContext.row) {
            if (oldContextRow) {
                // Remove highlight from the previous row.
                oldContextRow.setHighlight(true);
            }
            // Add highlight to the context row.
            editCellContext.row.setHighlight();
        }
        if (editMode.resizer) {
            editMode.resizer.setSnapPositions(editCellContext);
        }
    }
    /**
     * Method for showing and positioning context pointer.
     * @internal
     */
    showContextPointer(left, top, width, height) {
        this.contextPointer.isVisible = true;
        css(this.contextPointer.element, {
            display: 'block',
            left: left + 'px',
            top: top + 'px',
            height: height + 'px',
            width: width + 'px'
        });
    }
    /**
     * Method for hiding context pointer.
     * @internal
     */
    hideContextPointer() {
        if (this.contextPointer.isVisible) {
            this.contextPointer.isVisible = false;
            this.contextPointer.element.style.display = 'none';
        }
    }
    /**
     * Adds/Removes the edit mode overlay.
     * @internal
     *
     * @param remove
     * Whether the edit overlay should be removed.
     */
    setEditOverlay(remove) {
        const editMode = this, cnt = editMode.editOverlay, isSet = cnt.classList.contains(EditGlobals.classNames.editOverlayActive);
        if (!remove && !isSet) {
            cnt.classList.add(EditGlobals.classNames.editOverlayActive);
            editMode.isEditOverlayActive = true;
        }
        else if (remove && isSet) {
            cnt.classList.remove(EditGlobals.classNames.editOverlayActive);
            editMode.isEditOverlayActive = false;
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default EditMode;
