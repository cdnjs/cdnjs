/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import AST from '../Core/Renderer/HTML/AST.js';
import U from '../Core/Utilities.js';
const { addEvent, createElement } = U;
/* *
 *
 *  Class
 *
 * */
class BaseForm {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(parentDiv, iconsURL) {
        this.iconsURL = iconsURL;
        this.container = this.createPopupContainer(parentDiv);
        this.closeButton = this.addCloseButton();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Create popup div container.
     *
     * @param {HTMLElement} parentDiv
     * Parent div to attach popup.
     *
     * @param  {string} className
     * Class name of the popup.
     *
     * @return {HTMLElement}
     * Popup div.
     */
    createPopupContainer(parentDiv, className = 'highcharts-popup highcharts-no-tooltip') {
        return createElement('div', { className }, void 0, parentDiv);
    }
    /**
     * Create HTML element and attach click event to close popup.
     *
     * @param {string} className
     * Class name of the close button.
     *
     * @return {HTMLElement}
     * Close button.
     */
    addCloseButton(className = 'highcharts-popup-close') {
        const popup = this, iconsURL = this.iconsURL;
        // Create close popup button.
        const closeButton = createElement('div', { className }, void 0, this.container);
        closeButton.style['background-image'] = 'url(' +
            (iconsURL.match(/png|svg|jpeg|jpg|gif/ig) ?
                iconsURL : iconsURL + 'close.svg') + ')';
        ['click', 'touchstart'].forEach((eventName) => {
            addEvent(closeButton, eventName, popup.closeButtonEvents.bind(popup));
        });
        return closeButton;
    }
    /**
     * Close button events.
     * @return {void}
     */
    closeButtonEvents() {
        this.closePopup();
    }
    /**
     * Reset content of the current popup and show.
     *
     * @param {string} toolbarClass
     * Class name of the toolbar which styles should be reset.
     */
    showPopup(toolbarClass = 'highcharts-annotation-toolbar') {
        const popupDiv = this.container, popupCloseButton = this.closeButton;
        this.type = void 0;
        // Reset content.
        popupDiv.innerHTML = AST.emptyHTML;
        // Reset toolbar styles if exists.
        if (popupDiv.className.indexOf(toolbarClass) >= 0) {
            popupDiv.classList.remove(toolbarClass);
            // reset toolbar inline styles
            popupDiv.removeAttribute('style');
        }
        // Add close button.
        popupDiv.appendChild(popupCloseButton);
        popupDiv.style.display = 'block';
        popupDiv.style.height = '';
    }
    /**
     * Hide popup.
     */
    closePopup() {
        this.container.style.display = 'none';
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default BaseForm;
