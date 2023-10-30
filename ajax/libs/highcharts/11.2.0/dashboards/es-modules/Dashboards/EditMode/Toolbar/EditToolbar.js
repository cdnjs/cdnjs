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
import U from '../../../Core/Utilities.js';
const { defined, createElement, css } = U;
import Menu from '../Menu/Menu.js';
/**
 * Abstract Class of Edit Toolbar.
 * @internal
 */
class EditToolbar {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(editMode, options) {
        this.container = createElement('div', {
            className: options.className
        }, void 0, editMode.board.container);
        this.editMode = editMode;
        this.iconURLPrefix = editMode.iconsURLPrefix;
        this.menu = new Menu(this.container, options.menu, editMode, this);
        this.options = options;
        this.isVisible = false;
        if (this.options.outline) {
            this.outline = createElement('div', {
                className: options.outlineClassName
            }, void 0, this.container);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    hide() {
        this.setPosition(void 0, void 0);
    }
    refreshOutline(x, y, guiElement, offset = 0) {
        const toolbar = this, guiElemCnt = (guiElement || {}).container;
        if (toolbar.outline && guiElemCnt) {
            css(toolbar.outline, {
                display: 'block',
                left: x - offset + 'px',
                top: y - offset + 'px',
                width: guiElemCnt.offsetWidth + offset * 2 + 'px',
                height: guiElemCnt.offsetHeight + offset * 2 + 'px'
            });
        }
    }
    hideOutline() {
        if (this.outline) {
            this.outline.style.display = 'none';
        }
    }
    setPosition(x, y) {
        const toolbar = this;
        if (toolbar.container) {
            css(toolbar.container, {
                left: (x || '-9999') + 'px',
                top: (y || '-9999') + 'px'
            });
        }
        toolbar.isVisible = defined(x) && defined(y);
    }
}
export default EditToolbar;
