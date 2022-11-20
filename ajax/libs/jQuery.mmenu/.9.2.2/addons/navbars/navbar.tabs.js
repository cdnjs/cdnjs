import * as DOM from '../../_modules/dom';
export default function (navbar) {
    navbar.classList.add('mm-navbar--tabs');
    navbar.closest('.mm-navbars').classList.add('mm-navbars--has-tabs');
    DOM.children(navbar, 'a').forEach(anchor => {
        anchor.classList.add('mm-navbar__tab');
    });
    /**
     * Mark a tab as selected.
     * @param {HTMLElement} panel Opened panel.
     */
    function selectTab(panel) {
        /** The tab that links to the opened panel. */
        const anchor = DOM.children(navbar, `.mm-navbar__tab[href="#${panel.id}"]`)[0];
        if (anchor) {
            anchor.classList.add('mm-navbar__tab--selected');
            // @ts-ignore
            anchor.ariaExpanded = 'true';
        }
        else {
            /** The parent listitem. */
            const parent = DOM.find(this.node.pnls, `#${panel.dataset.mmParent}`)[0];
            if (parent) {
                selectTab.call(this, parent.closest('.mm-panel'));
            }
        }
    }
    this.bind('openPanel:before', (panel) => {
        //  Remove selected class.
        DOM.children(navbar, 'a').forEach(anchor => {
            anchor.classList.remove('mm-navbar__tab--selected');
            // @ts-ignore
            anchor.ariaExpanded = 'false';
        });
        selectTab.call(this, panel);
    });
    this.bind('initPanels:after', () => {
        //	Add animation class to panel.
        navbar.addEventListener('click', event => {
            var _a, _b, _c;
            /** The href for the clicked tab. */
            const href = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.closest('.mm-navbar__tab')) === null || _b === void 0 ? void 0 : _b.getAttribute('href');
            try {
                (_c = DOM.find(this.node.pnls, `${href}.mm-panel`)[0]) === null || _c === void 0 ? void 0 : _c.classList.add('mm-panel--noanimation');
            }
            catch (err) { }
        }, {
            // useCapture to ensure the logical order.
            capture: true
        });
    });
}
