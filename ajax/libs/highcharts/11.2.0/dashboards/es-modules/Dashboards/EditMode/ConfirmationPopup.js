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
import BaseForm from '../../Shared/BaseForm.js';
import EditGlobals from './EditGlobals.js';
import EditRenderer from './EditRenderer.js';
const { createElement } = U;
/**
 * Class to create confirmation popup.
 */
class ConfirmationPopup extends BaseForm {
    /* *
    *
    *  Static Properties
    *
    * */
    /* *
    *
    *  Constructor
    *
    * */
    /**
     * Constructs an instance of the ConfirmationPopup.
     *
     * @param parentDiv
     * Parent div where the popup will be added.
     *
     * @param iconsURL
     * URL to the icons.
     *
     * @param editMode
     * The EditMode instance.
     *
     * @param options
     * Options for confirmation popup.
     */
    constructor(parentDiv, iconsURL, editMode, options) {
        iconsURL =
            options && options.close && options.close.icon ?
                options.close.icon :
                iconsURL;
        super(parentDiv, iconsURL);
        this.editMode = editMode;
        this.options = options;
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Returns popup container.
     *
     * @param parentDiv
     * Parent div where the popup will be added.
     *
     * @param className
     * Class name added to the popup container.
     */
    createPopupContainer(parentDiv, className = EditGlobals.classNames.confirmationPopup) {
        return super.createPopupContainer(parentDiv, className);
    }
    /**
     * Adds close button to the popup.
     *
     * @param className
     * Class name added to the close button.
     */
    addCloseButton(className = EditGlobals.classNames.popupCloseButton) {
        return super.addCloseButton(className);
    }
    /**
     * Adds content inside the popup.
     *
     * @param options
     * Options for confirmation popup.
     */
    renderContent(options) {
        // Render content wrapper
        this.contentContainer = createElement('div', {
            className: EditGlobals.classNames.popupContentContainer
        }, {}, this.container);
        const popupContainer = this.contentContainer.parentNode;
        popupContainer.style.marginTop = '0px';
        const offsetTop = popupContainer.getBoundingClientRect().top;
        popupContainer.style.marginTop = (offsetTop < 0 ? Math.abs(offsetTop - 200) : 200) + 'px';
        // Render text
        EditRenderer.renderText(this.contentContainer, {
            title: options.text || ''
        });
        // Render button wrapper
        this.buttonContainer = createElement('div', {
            className: EditGlobals.classNames.popupButtonContainer
        }, {}, this.container);
        // Render cancel buttons
        EditRenderer.renderButton(this.buttonContainer, {
            text: options.cancelButton.value,
            className: EditGlobals.classNames.popupCancelBtn,
            callback: options.cancelButton.callback
        });
        // Confirm
        EditRenderer.renderButton(this.buttonContainer, {
            text: options.confirmButton.value,
            className: EditGlobals.classNames.popupConfirmBtn,
            callback: () => {
                // Run callback
                // confirmCallback.call(context);
                options.confirmButton.callback.call(options.confirmButton.context);
                // Hide popup
                this.closePopup();
            }
        });
    }
    /**
     * Shows confirmation popup.
     *
     * @param options
     * Options for confirmation popup.
     */
    show(options) {
        this.showPopup();
        this.renderContent(options);
        this.editMode.setEditOverlay();
    }
    /**
     * Hides confirmation popup.
     */
    closePopup() {
        super.closePopup();
        this.editMode.setEditOverlay(true);
    }
}
export default ConfirmationPopup;
