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
import DG from '../Globals.js';
const PREFIX = DG.classNamePrefix + 'edit-';
/**
 * @internal
 */
const EditGlobals = {
    classNames: {
        resizeSnap: PREFIX + 'resize-snap',
        resizeSnapX: PREFIX + 'resize-snap-x',
        resizeSnapY: PREFIX + 'resize-snap-y',
        separator: PREFIX + 'separator',
        contextMenuBtn: PREFIX + 'context-menu-btn',
        contextMenu: PREFIX + 'context-menu',
        contextMenuItem: PREFIX + 'context-menu-item',
        editModeEnabled: PREFIX + 'enabled',
        editToolbar: PREFIX + 'toolbar',
        editToolbarCellOutline: PREFIX + 'toolbar-cell-outline',
        editToolbarRowOutline: PREFIX + 'toolbar-row-outline',
        editToolbarItem: PREFIX + 'toolbar-item',
        editToolbarRow: PREFIX + 'toolbar-row',
        editToolbarCell: PREFIX + 'toolbar-cell',
        editSidebar: PREFIX + 'sidebar',
        editSidebarShow: PREFIX + 'sidebar-show',
        editSidebarHide: PREFIX + 'sidebar-hide',
        editSidebarTitle: PREFIX + 'sidebar-title',
        editSidebarMenuItem: PREFIX + 'sidebar-item',
        rowContextHighlight: PREFIX + 'row-context-highlight',
        cellEditHighlight: PREFIX + 'cell-highlight',
        dashboardCellEditHighlightActive: PREFIX + 'cell-highlight-active',
        dragMock: PREFIX + 'drag-mock',
        dropPointer: PREFIX + 'drop-pointer',
        contextDetectionPointer: PREFIX + 'ctx-detection-pointer',
        resizePointer: PREFIX + 'resize-pointer',
        currentEditedElement: PREFIX + 'unmask',
        maskElement: PREFIX + 'mask',
        menuItem: PREFIX + 'menu-item',
        menu: PREFIX + 'menu',
        menuVerticalSeparator: PREFIX + 'menu-vertical-separator',
        menuHorizontalSeparator: PREFIX + 'menu-horizontal-separator',
        menuDestroy: PREFIX + 'menu-destroy',
        editSidebarWrapper: PREFIX + 'sidebar-wrapper',
        customSelect: PREFIX + 'custom-select',
        customSelectButton: PREFIX + 'custom-option-button',
        toggleContainer: PREFIX + 'toggle-container',
        toggleWrapper: PREFIX + 'toggle-wrapper',
        toggleSlider: PREFIX + 'toggle-slider',
        toggleWrapperColored: PREFIX + 'toggle-wrapper-colored',
        toggleLabels: PREFIX + 'toggle-labels',
        button: PREFIX + 'button',
        sidebarNavButton: PREFIX + 'sidebar-button-nav',
        labelText: PREFIX + 'label-text',
        editSidebarTabBtn: PREFIX + 'sidebar-tab-btn',
        editToolsBtn: PREFIX + 'tools-btn',
        editTools: PREFIX + 'tools',
        editGridItems: PREFIX + 'grid-items',
        // Confirmation popup
        confirmationPopup: PREFIX + 'confirmation-popup',
        popupButtonContainer: PREFIX + 'confirmation-popup-button-container',
        popupContentContainer: PREFIX + 'confirmation-popup-content',
        popupCancelBtn: PREFIX + 'confirmation-popup-cancel-btn',
        popupConfirmBtn: PREFIX + 'confirmation-popup-confirm-btn',
        popupCloseButton: PREFIX + 'popup-close',
        editOverlay: PREFIX + 'overlay',
        editOverlayActive: PREFIX + 'overlay-active',
        resizerMenuBtnActive: PREFIX + 'resizer-menu-btn-active',
        sidebarCloseButton: PREFIX + 'close-btn',
        editSidebarTabBtnWrapper: PREFIX + 'tabs-buttons-wrapper',
        editSidebarRight: PREFIX + 'sidebar-right',
        editSidebarRightShow: PREFIX + 'sidebar-right-show',
        viewFullscreen: PREFIX + 'view-fullscreen',
        // Accordion
        accordionMenu: PREFIX + 'accordion-menu',
        accordionContainer: PREFIX + 'accordion',
        accordionHeader: PREFIX + 'accordion-header',
        accordionHeaderBtn: PREFIX + 'accordion-header-btn',
        accordionHeaderIcon: PREFIX + 'accordion-header-icon',
        accordionContent: PREFIX + 'accordion-content',
        accordionNestedWrapper: PREFIX + 'accordion-nested',
        accordionMenuButtonsContainer: PREFIX + 'accordion-menu-buttons-container',
        accordionMenuButton: PREFIX + 'accordion-menu-button',
        hiddenElement: PREFIX + 'hidden-element',
        collapsableContentHeader: PREFIX + 'collapsable-content-header',
        // Custom dropdown with icons
        collapsedElement: PREFIX + 'collapsed-element',
        dropdown: PREFIX + 'dropdown',
        dropdownContent: PREFIX + 'dropdown-content',
        dropdownButton: PREFIX + 'dropdown-button',
        dropdownButtonContent: PREFIX + 'dropdown-button-content',
        dropdownIcon: PREFIX + 'pointer',
        icon: PREFIX + 'icon'
    },
    lang: {
        accessibility: {
            contextMenu: {
                button: 'Context menu'
            }
        },
        addComponent: 'Add component',
        cancelButton: 'Cancel',
        caption: 'Caption',
        chartClassName: 'Chart class name',
        chartConfig: 'Chart configuration',
        chartID: 'Chart ID',
        chartOptions: 'Chart options',
        chartType: 'Chart type',
        connectorName: 'Connector name',
        confirmButton: 'Confirm',
        confirmDestroyCell: 'Do you really want to destroy the cell?',
        confirmDestroyRow: 'Do you really want to destroy the row?',
        dataLabels: 'Data labels',
        editMode: 'Edit mode',
        errorMessage: 'Something went wrong',
        exitFullscreen: 'Exit full screen',
        id: 'Id',
        large: 'Large',
        medium: 'Medium',
        off: 'off',
        on: 'on',
        pointFormat: 'Point format',
        settings: 'Settings',
        small: 'Small',
        style: 'Styles',
        title: 'Title',
        viewFullscreen: 'View in full screen'
    }
};
export default EditGlobals;
