"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualLayout = void 0;
const config_1 = require("./config/config");
const resolved_config_1 = require("./config/resolved-config");
const external_error_1 = require("./errors/external-error");
const internal_error_1 = require("./errors/internal-error");
const layout_manager_1 = require("./layout-manager");
const i18n_strings_1 = require("./utils/i18n-strings");
const utils_1 = require("./utils/utils");
/** @public */
class VirtualLayout extends layout_manager_1.LayoutManager {
    /** @internal */
    constructor(configOrOptionalContainer, containerOrBindComponentEventHandler, unbindComponentEventHandler) {
        super(VirtualLayout.createLayoutManagerConstructorParameters(configOrOptionalContainer, containerOrBindComponentEventHandler));
        /** @internal */
        this._subWindowsCreated = false;
        /** @internal */
        this._creationTimeoutPassed = false;
        // More work needed to get popouts working with virtual.
        if (containerOrBindComponentEventHandler !== undefined) {
            if (typeof containerOrBindComponentEventHandler === 'function') {
                this.bindComponentEvent = containerOrBindComponentEventHandler;
                if (unbindComponentEventHandler !== undefined) {
                    this.unbindComponentEvent = unbindComponentEventHandler;
                }
            }
        }
        if (this.isSubWindow) {
            document.body.style.visibility = 'hidden';
        }
        if (this.layoutConfig.root === undefined || this.isSubWindow) {
            this.init();
        }
    }
    destroy() {
        this.bindComponentEvent = undefined;
        this.unbindComponentEvent = undefined;
        super.destroy();
    }
    /**
     * Creates the actual layout. Must be called after all initial components
     * are registered. Recurses through the configuration and sets up
     * the item tree.
     *
     * If called before the document is ready it adds itself as a listener
     * to the document.ready event
     * @deprecated LayoutConfig should not be loaded in {@link (LayoutManager:class)} constructor, but rather in a
     * {@link (LayoutManager:class).loadLayout} call.  If LayoutConfig is not specified in {@link (LayoutManager:class)} constructor,
     * then init() will be automatically called internally and should not be called externally.
     */
    init() {
        /**
         * Create the popout windows straight away. If popouts are blocked
         * an error is thrown on the same 'thread' rather than a timeout and can
         * be caught. This also prevents any further initilisation from taking place.
         */
        if (this._subWindowsCreated === false) {
            this.createSubWindows();
            this._subWindowsCreated = true;
        }
        /**
         * If the document isn't ready yet, wait for it.
         */
        if (document.readyState === 'loading' || document.body === null) {
            document.addEventListener('DOMContentLoaded', () => this.init(), { passive: true });
            return;
        }
        /**
         * If this is a subwindow, wait a few milliseconds for the original
         * page's js calls to be executed, then replace the bodies content
         * with GoldenLayout
         */
        if (this.isSubWindow === true && this._creationTimeoutPassed === false) {
            setTimeout(() => this.init(), 7);
            this._creationTimeoutPassed = true;
            return;
        }
        if (this.isSubWindow === true) {
            this.adjustToWindowMode();
        }
        super.init();
    }
    /** @internal */
    bindComponent(container, itemConfig) {
        if (this.bindComponentEvent !== undefined) {
            const bindableComponent = this.bindComponentEvent(container, itemConfig);
            return bindableComponent;
        }
        else {
            if (this.getComponentEvent !== undefined) {
                return {
                    virtual: false,
                    component: this.getComponentEvent(container, itemConfig),
                };
            }
            else {
                // There is no component registered for this type, and we don't have a getComponentEvent defined.
                // This might happen when the user pops out a dialog and the component types are not registered upfront.
                const text = i18n_strings_1.i18nStrings[2 /* ComponentTypeNotRegisteredAndBindComponentEventHandlerNotAssigned */];
                const message = `${text}: ${JSON.stringify(itemConfig)}`;
                throw new external_error_1.BindError(message);
            }
        }
    }
    /** @internal */
    unbindComponent(container, virtual, component) {
        if (virtual) {
            if (this.unbindComponentEvent !== undefined) {
                this.unbindComponentEvent(container);
            }
        }
        else {
            if (this.releaseComponentEvent !== undefined) {
                if (component === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('VCUCRCU333998');
                }
                else {
                    this.releaseComponentEvent(container, component);
                }
            }
        }
    }
    /**
     * Creates Subwindows (if there are any). Throws an error
     * if popouts are blocked.
     * @internal
     */
    createSubWindows() {
        for (let i = 0; i < this.layoutConfig.openPopouts.length; i++) {
            const popoutConfig = this.layoutConfig.openPopouts[i];
            this.createPopoutFromPopoutLayoutConfig(popoutConfig);
        }
    }
    /**
     * This is executed when GoldenLayout detects that it is run
     * within a previously opened popout window.
     * @internal
     */
    adjustToWindowMode() {
        const headElement = document.head;
        const appendNodeLists = new Array(4);
        appendNodeLists[0] = document.querySelectorAll('body link');
        appendNodeLists[1] = document.querySelectorAll('body style');
        appendNodeLists[2] = document.querySelectorAll('template');
        appendNodeLists[3] = document.querySelectorAll('.gl_keep');
        for (let listIdx = 0; listIdx < appendNodeLists.length; listIdx++) {
            const appendNodeList = appendNodeLists[listIdx];
            for (let nodeIdx = 0; nodeIdx < appendNodeList.length; nodeIdx++) {
                const node = appendNodeList[nodeIdx];
                headElement.appendChild(node);
            }
        }
        const bodyElement = document.body;
        bodyElement.innerHTML = '';
        bodyElement.style.visibility = 'visible';
        if (!this.layoutConfig.settings.popInOnClose) {
            const popInButtonElement = document.createElement('div');
            popInButtonElement.classList.add("lm_popin" /* Popin */);
            popInButtonElement.setAttribute('title', this.layoutConfig.header.dock);
            const iconElement = document.createElement('div');
            iconElement.classList.add("lm_icon" /* Icon */);
            const bgElement = document.createElement('div');
            bgElement.classList.add("lm_bg" /* Bg */);
            popInButtonElement.appendChild(iconElement);
            popInButtonElement.appendChild(bgElement);
            popInButtonElement.addEventListener('click', () => this.emit('popIn'));
            bodyElement.appendChild(popInButtonElement);
        }
        /*
        * This seems a bit pointless, but actually causes a reflow/re-evaluation getting around
        * slickgrid's "Cannot find stylesheet." bug in chrome
        */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const x = document.body.offsetHeight;
        /*
        * Expose this instance on the window object
        * to allow the opening window to interact with
        * it
        */
        window.__glInstance = this;
    }
}
exports.VirtualLayout = VirtualLayout;
/** @public */
(function (VirtualLayout) {
    /** @internal
     * Veriable to hold the state whether we already checked if we are running in a sub window.
     * Fixes popout and creation of nested golden-layouts.
     */
    let subWindowChecked = false;
    /** @internal */
    function createLayoutManagerConstructorParameters(configOrOptionalContainer, containerOrBindComponentEventHandler) {
        const windowConfigKey = subWindowChecked ? null : utils_1.getQueryStringParam('gl-window');
        subWindowChecked = true;
        const isSubWindow = windowConfigKey !== null;
        let containerElement;
        let config;
        if (windowConfigKey !== null) {
            const windowConfigStr = localStorage.getItem(windowConfigKey);
            if (windowConfigStr === null) {
                throw new Error('Null gl-window Config');
            }
            localStorage.removeItem(windowConfigKey);
            const minifiedWindowConfig = JSON.parse(windowConfigStr);
            config = resolved_config_1.ResolvedLayoutConfig.unminifyConfig(minifiedWindowConfig);
        }
        else {
            if (configOrOptionalContainer === undefined) {
                config = undefined;
            }
            else {
                if (configOrOptionalContainer instanceof HTMLElement) {
                    config = undefined;
                    containerElement = configOrOptionalContainer;
                }
                else {
                    if (config_1.LayoutConfig.isResolved(configOrOptionalContainer)) {
                        config = configOrOptionalContainer;
                    }
                    else {
                        config = config_1.LayoutConfig.resolve(configOrOptionalContainer);
                    }
                }
            }
            if (containerElement === undefined) {
                if (containerOrBindComponentEventHandler instanceof HTMLElement) {
                    containerElement = containerOrBindComponentEventHandler;
                }
            }
        }
        return {
            layoutConfig: config,
            isSubWindow,
            containerElement,
        };
    }
    VirtualLayout.createLayoutManagerConstructorParameters = createLayoutManagerConstructorParameters;
})(VirtualLayout = exports.VirtualLayout || (exports.VirtualLayout = {}));
//# sourceMappingURL=virtual-layout.js.map