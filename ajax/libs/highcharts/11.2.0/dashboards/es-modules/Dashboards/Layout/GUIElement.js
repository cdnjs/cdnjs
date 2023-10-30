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
const { addEvent, createElement, uniqueKey, objectEach, error } = U;
class GUIElement {
    /* *
    *
    *  Static Properties
    *
    * */
    // Get offsets of the guiElement relative to
    // the referenceElement or the Viewport.
    static getOffsets(guiElement, referenceElement) {
        const offset = { left: 0, top: 0, right: 0, bottom: 0 };
        if (guiElement.container) {
            const guiElementClientRect = guiElement.container.getBoundingClientRect();
            const referenceClientRect = referenceElement ?
                referenceElement.getBoundingClientRect() : { left: 0, top: 0 };
            offset.left = guiElementClientRect.left - referenceClientRect.left;
            offset.top = guiElementClientRect.top - referenceClientRect.top;
            offset.right =
                guiElementClientRect.right - referenceClientRect.left;
            offset.bottom =
                guiElementClientRect.bottom - referenceClientRect.top;
        }
        return offset;
    }
    // Get dimensions of the guiElement container from offsets.
    static getDimFromOffsets(offsets) {
        return {
            width: offsets.right - offsets.left,
            height: offsets.bottom - offsets.top
        };
    }
    // Method for element id generation.
    static createElementId(elementType // col, row, layout
    ) {
        return (Globals.classNamePrefix + elementType + '-' +
            uniqueKey().slice(11));
    }
    // Get width in percentages (0% - 100%).
    static getPercentageWidth(width // supported formats '50%' or '1/2'
    ) {
        const fractionRegEx = /^([0-9]{1})[\-\/\.]([0-9]{1,2})$/;
        let result;
        if (fractionRegEx.test(width)) {
            const match = width.match(fractionRegEx) || [], multiplier = +match[1], divider = +match[2];
            result = 100 * multiplier / divider;
            result = (result <= 100 ? result : 100) + '%';
        }
        else if (width.indexOf('%') !== -1) {
            const value = parseFloat(width);
            result = (value <= 100 ?
                (value >= 0 ? value : 0) : 100) + '%';
        }
        return result;
    }
    /* *
    *
    *  Functions
    *
    * */
    /**
     * Create or get existing HTML element as a GUIElement container.
     *
     * @param {GUIElement.ContainerOptions} options
     * Options.
     */
    getElementContainer(options) {
        const guiElement = this;
        let elem;
        if (options.render) {
            if (options.attribs && !options.attribs.id) {
                delete options.attribs.id;
            }
        }
        else if (typeof options.elementId === 'string') {
            const div = document.getElementById(options.elementId);
            if (div) {
                guiElement.container = div;
            }
            else {
                error('Element ' + options.elementId + ' does not exist');
            }
        }
        if (options.element instanceof HTMLElement) {
            elem = options.element;
        }
        else {
            elem = createElement('div', options.attribs || {}, options.style || {}, options.parentContainer);
        }
        // Set bindedGUIElement event on GUIElement container.
        guiElement.removeBindedEventFn = addEvent(elem, 'bindedGUIElement', function (e) {
            e.guiElement = guiElement;
            e.stopImmediatePropagation();
        });
        return elem;
    }
    /**
     * Destroy the element, its container, event hooks
     * and all properties.
     */
    destroy() {
        const guiElement = this;
        // Remove bindedGUIElement event.
        if (guiElement.removeBindedEventFn) {
            guiElement.removeBindedEventFn();
        }
        // Remove HTML container.
        if (guiElement.container && guiElement.container.parentNode) {
            guiElement.container.parentNode.removeChild(guiElement.container);
        }
        // Delete all properties.
        objectEach(guiElement, function (val, key) {
            delete guiElement[key];
        });
    }
    /**
     * Return the GUIElement instance type.
     * @return {GUIElement.GUIElementType|undefined}
     * The GUIElement instance type
     */
    getType() {
        return this.type;
    }
    changeVisibility(setVisible = true, displayStyle) {
        const visibilityChanged = (this.isVisible && !setVisible ||
            !this.isVisible && setVisible);
        if (this.container && visibilityChanged) {
            this.container.style.display = (setVisible ?
                (displayStyle || 'block') :
                'none');
            this.isVisible = setVisible;
        }
    }
    hide() {
        this.changeVisibility(false);
    }
    show() {
        this.changeVisibility();
    }
}
export default GUIElement;
