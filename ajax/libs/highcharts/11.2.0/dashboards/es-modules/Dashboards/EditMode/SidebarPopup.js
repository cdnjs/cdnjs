/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  Pawel Lysy
 *
 * */
'use strict';
import AccordionMenu from './AccordionMenu.js';
import BaseForm from '../../Shared/BaseForm.js';
import Bindings from '../Actions/Bindings.js';
import EditGlobals from './EditGlobals.js';
import EditRenderer from './EditRenderer.js';
import GUIElement from '../Layout/GUIElement.js';
import Layout from '../Layout/Layout.js';
import U from '../../Core/Utilities.js';
const { addEvent, createElement, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Class which creates the sidebar and handles its behaviour.
 */
class SidebarPopup extends BaseForm {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructor of the SidebarPopup class.
     *
     * @param parentDiv
     * Element to which the sidebar will be appended.
     * @param iconsURL
     * URL to the icons.
     * @param editMode
     * Instance of EditMode.
     */
    constructor(parentDiv, iconsURL, editMode) {
        super(parentDiv, iconsURL);
        /**
         * Whether the sidebar is visible.
         */
        this.isVisible = false;
        this.editMode = editMode;
        this.accordionMenu = new AccordionMenu(this.iconsURL, this.hide.bind(this));
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Function to detect on which side of the screen should the sidebar be.
     *
     * @param context
     * The cell or row which is the context of the sidebar.
     * @returns
     * Whether the sidebar should be on the right side of the screen.
     */
    detectRightSidebar(context) {
        const editMode = this.editMode;
        const layoutWrapper = editMode.board.layoutsWrapper;
        return GUIElement.getOffsets(context, layoutWrapper).left < ((layoutWrapper.offsetWidth / 2) - 10); // 10 = snap
    }
    /**
     * Function to remove the class names from the sidebar.
     */
    removeClassNames() {
        const classNames = EditGlobals.classNames, classList = this.container.classList;
        classList.remove(classNames.editSidebarShow);
        classList.remove(classNames.editSidebarRightShow);
    }
    /**
     * Function to add the class names to the sidebar depending on the position
     * of the sidebar.
     *
     * @param isRightSidebar
     * Whether the sidebar should be on the right side of the screen.
     */
    addClassNames(isRightSidebar) {
        const classList = this.container.classList;
        if (isRightSidebar) {
            classList.add(EditGlobals.classNames.editSidebarRight);
        }
        else {
            classList.remove(EditGlobals.classNames.editSidebarRight);
        }
        setTimeout(() => {
            classList.add(EditGlobals.classNames[isRightSidebar ? 'editSidebarRightShow' : 'editSidebarShow']);
        });
    }
    /**
     * Function to show the sidebar.
     *
     * @param context
     * The cell or row which is the context of the sidebar.
     */
    show(context) {
        const editMode = this.editMode, isRightSidebar = !!(context && this.detectRightSidebar(context));
        this.showPopup(EditGlobals.classNames.editSidebarShow);
        this.addClassNames(isRightSidebar);
        if (editMode.resizer) {
            editMode.resizer.disableResizer();
        }
        // Remove highlight from the row.
        if (editMode.editCellContext && editMode.editCellContext.row) {
            editMode.editCellContext.row.setHighlight(true);
        }
        editMode.hideToolbars(['cell', 'row']);
        editMode.stopContextDetection();
        this.isVisible = true;
        this.generateContent(context);
    }
    generateContent(context) {
        // Title
        this.renderHeader(context ?
            this.editMode.lang.settings :
            this.editMode.lang.addComponent, '');
        if (!context) {
            this.renderAddComponentsList();
            return;
        }
        const type = context.getType();
        if (type === 'cell') {
            const component = context.mountedComponent;
            if (!component) {
                return;
            }
            this.accordionMenu.renderContent(this.container, component);
        }
    }
    renderAddComponentsList() {
        const sidebar = this;
        const components = SidebarPopup.components;
        let gridElement;
        const gridWrapper = createElement('div', {
            className: EditGlobals.classNames.editGridItems
        }, {}, sidebar.container);
        for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
            gridElement = createElement('div', {}, {}, gridWrapper);
            // Drag drop new component.
            gridElement.addEventListener('mousedown', (e) => {
                if (sidebar.editMode.dragDrop) {
                    const onMouseLeave = () => {
                        sidebar.hide();
                    };
                    sidebar.container.addEventListener('mouseleave', onMouseLeave);
                    sidebar.editMode.dragDrop.onDragStart(e, void 0, (dropContext) => {
                        // Add component if there is no layout yet.
                        if (this.editMode.board.layouts.length === 0) {
                            const board = this.editMode.board, newLayoutName = GUIElement.createElementId('layout'), layout = new Layout(board, {
                                id: newLayoutName,
                                copyId: '',
                                parentContainerId: board.container.id,
                                rows: [{}],
                                style: {}
                            });
                            if (layout) {
                                board.layouts.push(layout);
                            }
                            dropContext = layout.rows[0];
                        }
                        const newCell = components[i].onDrop(sidebar, dropContext);
                        if (newCell) {
                            const mountedComponent = newCell.mountedComponent;
                            // skip init connector when is not defined by
                            // options f.e HTML component.
                            if (mountedComponent.options?.connector?.id) {
                                mountedComponent.initConnector();
                            }
                            sidebar.editMode.setEditCellContext(newCell);
                            sidebar.show(newCell);
                            newCell.setHighlight();
                        }
                        sidebar.container.removeEventListener('mouseleave', onMouseLeave);
                    });
                }
            });
            gridElement.innerHTML = components[i].text;
        }
        return;
    }
    onDropNewComponent(dropContext, componentOptions) {
        const sidebar = this, dragDrop = sidebar.editMode.dragDrop;
        if (dragDrop) {
            const row = (dropContext.getType() === 'cell' ?
                dropContext.row :
                dropContext), newCell = row.addCell({
                id: GUIElement.createElementId('col')
            });
            dragDrop.onCellDragEnd(newCell);
            const options = merge(componentOptions, {
                cell: newCell.id
            });
            Bindings.addComponent(options, newCell);
            sidebar.editMode.setEditOverlay();
            return newCell;
        }
    }
    /**
     * Function to hide the sidebar.
     */
    hide() {
        const editMode = this.editMode;
        const editCellContext = editMode.editCellContext;
        this.removeClassNames();
        // Remove edit overlay if active.
        if (editMode.isEditOverlayActive) {
            editMode.setEditOverlay(true);
        }
        if (editCellContext && editCellContext.row) {
            editMode.showToolbars(['cell', 'row'], editCellContext);
            editCellContext.row.setHighlight();
            // Remove cell highlight if active.
            if (editCellContext.isHighlighted) {
                editCellContext.setHighlight(true);
            }
        }
        editMode.isContextDetectionActive = true;
        this.isVisible = false;
    }
    /**
     * Function called when the close button is pressed.
     */
    closeButtonEvents() {
        this.hide();
    }
    renderHeader(title, iconURL) {
        const icon = EditRenderer.renderIcon(this.container, {
            icon: iconURL,
            className: EditGlobals.classNames.editSidebarTitle
        });
        if (icon) {
            icon.textContent = title;
        }
    }
    /**
     * Function to create and add the close button to the sidebar.
     *
     * @param className
     * Class name of the close button.
     * @returns Close button element
     */
    addCloseButton(className = EditGlobals.classNames.popupCloseButton) {
        return super.addCloseButton.call(this, className);
    }
    /**
     * Function that creates the container of the sidebar.
     *
     * @param parentDiv
     * The parent div to which the sidebar will be appended.
     * @param className
     * Class name of the sidebar.
     * @returns The container of the sidebar.
     */
    createPopupContainer(parentDiv, className = EditGlobals.classNames.editSidebar) {
        return super.createPopupContainer.call(this, parentDiv, className);
    }
}
SidebarPopup.components = [
    {
        text: 'HTML',
        onDrop: function (sidebar, dropContext) {
            if (sidebar && dropContext) {
                return sidebar.onDropNewComponent(dropContext, {
                    cell: '',
                    type: 'HTML',
                    elements: [{
                            tagName: 'img',
                            attributes: {
                                src: 'https://www.highcharts.com/samples/graphics/stock-dark.svg'
                            }
                        }]
                });
            }
        }
    }, {
        text: 'layout',
        onDrop: function (sidebar, dropContext) {
            if (!dropContext) {
                return;
            }
            const row = (dropContext.getType() === 'cell' ?
                dropContext.row :
                dropContext), board = row.layout.board, newLayoutName = GUIElement.createElementId('layout'), cellName = GUIElement.createElementId('cell'), layout = new Layout(board, {
                id: newLayoutName,
                copyId: '',
                parentContainerId: board.container.id,
                rows: [{
                        cells: [{
                                id: cellName
                            }]
                    }],
                style: {}
            });
            if (layout) {
                board.layouts.push(layout);
            }
            Bindings.addComponent({
                type: 'HTML',
                cell: cellName,
                elements: [
                    {
                        tagName: 'div',
                        style: { 'text-align': 'center' },
                        textContent: 'Placeholder text'
                    }
                ]
            });
        }
    }, {
        text: 'chart',
        onDrop: function (sidebar, dropContext) {
            if (sidebar && dropContext) {
                const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
                let options = {
                    cell: '',
                    type: 'Highcharts',
                    chartOptions: {
                        chart: {
                            animation: false,
                            type: 'column',
                            zooming: {}
                        }
                    }
                };
                if (connectorsIds.length) {
                    options = {
                        ...options,
                        connector: {
                            id: connectorsIds[0]
                        }
                    };
                }
                return sidebar.onDropNewComponent(dropContext, options);
            }
        }
    }, {
        text: 'datagrid',
        onDrop: function (sidebar, dropContext) {
            if (sidebar && dropContext) {
                const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
                let options = {
                    cell: '',
                    type: 'DataGrid'
                };
                if (connectorsIds.length) {
                    options = {
                        ...options,
                        connector: {
                            id: connectorsIds[0]
                        }
                    };
                }
                return sidebar.onDropNewComponent(dropContext, options);
            }
        }
    }, {
        text: 'KPI',
        onDrop: function (sidebar, dropContext) {
            if (sidebar && dropContext) {
                const connectorsIds = sidebar.editMode.board.dataPool.getConnectorIds();
                let options = {
                    cell: '',
                    type: 'KPI'
                };
                if (connectorsIds.length) {
                    options = {
                        ...options,
                        connector: {
                            id: connectorsIds[0]
                        }
                    };
                }
                return sidebar.onDropNewComponent(dropContext, options);
            }
        }
    }
];
/* *
 *
 *  Default Export
 *
 * */
export default SidebarPopup;
