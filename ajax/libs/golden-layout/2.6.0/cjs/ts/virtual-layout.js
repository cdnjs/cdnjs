"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualLayout = void 0;
const config_1 = require("./config/config");
const resolved_config_1 = require("./config/resolved-config");
const external_error_1 = require("./errors/external-error");
const internal_error_1 = require("./errors/internal-error");
const layout_manager_1 = require("./layout-manager");
const i18n_strings_1 = require("./utils/i18n-strings");
/** @public */
class VirtualLayout extends layout_manager_1.LayoutManager {
    /** @internal */
    constructor(configOrOptionalContainer, containerOrBindComponentEventHandler, unbindComponentEventHandler, skipInit) {
        super(VirtualLayout.createLayoutManagerConstructorParameters(configOrOptionalContainer, containerOrBindComponentEventHandler));
        /** @internal @deprecated use while constructor is not determinate */
        this._bindComponentEventHanlderPassedInConstructor = false; // remove when constructor is determinate
        /** @internal  @deprecated use while constructor is not determinate */
        this._creationTimeoutPassed = false; // remove when constructor is determinate
        if (containerOrBindComponentEventHandler !== undefined) {
            if (typeof containerOrBindComponentEventHandler === 'function') {
                this.bindComponentEvent = containerOrBindComponentEventHandler;
                this._bindComponentEventHanlderPassedInConstructor = true;
                if (unbindComponentEventHandler !== undefined) {
                    this.unbindComponentEvent = unbindComponentEventHandler;
                }
            }
        }
        if (!this._bindComponentEventHanlderPassedInConstructor) {
            // backward compatibility
            if (this.isSubWindow) {
                // document.body.style.visibility = 'hidden';
                // Set up layoutConfig since constructor is not determinate and may exit early. Other functions may need
                // this.layoutConfig. this.layoutConfig is again calculated in the same way when init() completes.
                // Remove this when constructor is determinate.
                if (this._constructorOrSubWindowLayoutConfig === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('VLC98823');
                }
                else {
                    const resolvedLayoutConfig = config_1.LayoutConfig.resolve(this._constructorOrSubWindowLayoutConfig);
                    // remove root from layoutConfig
                    this.layoutConfig = Object.assign(Object.assign({}, resolvedLayoutConfig), { root: undefined });
                }
            }
        }
        if (skipInit !== true) {
            if (!this.deprecatedConstructor) {
                this.init();
            }
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
         * If the document isn't ready yet, wait for it.
         */
        if (!this._bindComponentEventHanlderPassedInConstructor && (document.readyState === 'loading' || document.body === null)) {
            document.addEventListener('DOMContentLoaded', () => this.init(), { passive: true });
            return;
        }
        /**
         * If this is a subwindow, wait a few milliseconds for the original
         * page's js calls to be executed, then replace the bodies content
         * with GoldenLayout
         */
        if (!this._bindComponentEventHanlderPassedInConstructor && this.isSubWindow === true && !this._creationTimeoutPassed) {
            setTimeout(() => this.init(), 7);
            this._creationTimeoutPassed = true;
            return;
        }
        if (this.isSubWindow === true) {
            if (!this._bindComponentEventHanlderPassedInConstructor) {
                this.clearHtmlAndAdjustStylesForSubWindow();
            }
            // Expose this instance on the window object to allow the opening window to interact with it
            window.__glInstance = this;
        }
        super.init();
    }
    /**
     * Clears existing HTML and adjusts style to make window suitable to be a popout sub window
     * Curently is automatically called when window is a subWindow and bindComponentEvent is not passed in the constructor
     * If bindComponentEvent is not passed in the constructor, the application must either call this function explicitly or
     * (preferably) make the window suitable as a subwindow.
     * In the future, it is planned that this function is NOT automatically called in any circumstances.  Applications will
     * need to determine whether a window is a Golden Layout popout window and either call this function explicitly or
     * hide HTML not relevant to the popout.
     * See apitest for an example of how HTML is hidden when popout windows are displayed
     */
    clearHtmlAndAdjustStylesForSubWindow() {
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
        this.checkAddDefaultPopinButton();
        /*
        * This seems a bit pointless, but actually causes a reflow/re-evaluation getting around
        * slickgrid's "Cannot find stylesheet." bug in chrome
        */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const x = document.body.offsetHeight;
    }
    /**
     * Will add button if not popinOnClose specified in settings
     * @returns true if added otherwise false
     */
    checkAddDefaultPopinButton() {
        if (this.layoutConfig.settings.popInOnClose) {
            return false;
        }
        else {
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
            document.body.appendChild(popInButtonElement);
            return true;
        }
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
        if (this.unbindComponentEvent !== undefined) {
            this.unbindComponentEvent(container);
        }
        else {
            if (!virtual && this.releaseComponentEvent !== undefined) {
                if (component === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('VCUCRCU333998');
                }
                else {
                    this.releaseComponentEvent(container, component);
                }
            }
        }
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
        const windowConfigKey = subWindowChecked ? null : new URL(document.location.href).searchParams.get('gl-window');
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
            const resolvedConfig = resolved_config_1.ResolvedLayoutConfig.unminifyConfig(minifiedWindowConfig);
            config = config_1.LayoutConfig.fromResolved(resolvedConfig);
            if (configOrOptionalContainer instanceof HTMLElement) {
                containerElement = configOrOptionalContainer;
            }
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
                    // backwards compatibility
                    config = configOrOptionalContainer;
                }
            }
            if (containerElement === undefined) {
                if (containerOrBindComponentEventHandler instanceof HTMLElement) {
                    containerElement = containerOrBindComponentEventHandler;
                }
            }
        }
        return {
            constructorOrSubWindowLayoutConfig: config,
            isSubWindow,
            containerElement,
        };
    }
    VirtualLayout.createLayoutManagerConstructorParameters = createLayoutManagerConstructorParameters;
})(VirtualLayout = exports.VirtualLayout || (exports.VirtualLayout = {}));
//# sourceMappingURL=virtual-layout.js.map