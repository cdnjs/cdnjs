"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoldenLayout = void 0;
const resolved_config_1 = require("./config/resolved-config");
const external_error_1 = require("./errors/external-error");
const internal_error_1 = require("./errors/internal-error");
const i18n_strings_1 = require("./utils/i18n-strings");
const utils_1 = require("./utils/utils");
const virtual_layout_1 = require("./virtual-layout");
/** @public */
class GoldenLayout extends virtual_layout_1.VirtualLayout {
    constructor() {
        super(...arguments);
        /** @internal */
        this._componentTypesMap = new Map();
        /** @internal */
        this._virtuableComponentMap = new Map();
        /** @internal */
        this._containerVirtualRectingRequiredEventListener = (container, width, height) => this.handleContainerVirtualRectingRequiredEvent(container, width, height);
        /** @internal */
        this._containerVirtualVisibilityChangeRequiredEventListener = (container, visible) => this.handleContainerVirtualVisibilityChangeRequiredEvent(container, visible);
        /** @internal */
        this._containerVirtualZIndexChangeRequiredEventListener = (container, logicalZIndex, defaultZIndex) => this.handleContainerVirtualZIndexChangeRequiredEvent(container, logicalZIndex, defaultZIndex);
    }
    /**
     * Register a new component type with the layout manager.
     *
     * @deprecated See {@link https://stackoverflow.com/questions/40922531/how-to-check-if-a-javascript-function-is-a-constructor}
     * instead use {@link (GoldenLayout:class).registerComponentConstructor}
     * or {@link (GoldenLayout:class).registerComponentFactoryFunction}
     */
    registerComponent(name, componentConstructorOrFactoryFtn, virtual = false) {
        if (typeof componentConstructorOrFactoryFtn !== 'function') {
            throw new external_error_1.ApiError('registerComponent() componentConstructorOrFactoryFtn parameter is not a function');
        }
        else {
            if (componentConstructorOrFactoryFtn.hasOwnProperty('prototype')) {
                const componentConstructor = componentConstructorOrFactoryFtn;
                this.registerComponentConstructor(name, componentConstructor, virtual);
            }
            else {
                const componentFactoryFtn = componentConstructorOrFactoryFtn;
                this.registerComponentFactoryFunction(name, componentFactoryFtn, virtual);
            }
        }
    }
    /**
     * Register a new component type with the layout manager.
     */
    registerComponentConstructor(typeName, componentConstructor, virtual = false) {
        if (typeof componentConstructor !== 'function') {
            throw new Error(i18n_strings_1.i18nStrings[1 /* PleaseRegisterAConstructorFunction */]);
        }
        const existingComponentType = this._componentTypesMap.get(typeName);
        if (existingComponentType !== undefined) {
            throw new external_error_1.BindError(`${i18n_strings_1.i18nStrings[3 /* ComponentIsAlreadyRegistered */]}: ${typeName}`);
        }
        this._componentTypesMap.set(typeName, {
            constructor: componentConstructor,
            factoryFunction: undefined,
            virtual,
        });
    }
    /**
     * Register a new component with the layout manager.
     */
    registerComponentFactoryFunction(typeName, componentFactoryFunction, virtual = false) {
        if (typeof componentFactoryFunction !== 'function') {
            throw new external_error_1.BindError('Please register a constructor function');
        }
        const existingComponentType = this._componentTypesMap.get(typeName);
        if (existingComponentType !== undefined) {
            throw new external_error_1.BindError(`${i18n_strings_1.i18nStrings[3 /* ComponentIsAlreadyRegistered */]}: ${typeName}`);
        }
        this._componentTypesMap.set(typeName, {
            constructor: undefined,
            factoryFunction: componentFactoryFunction,
            virtual,
        });
    }
    /**
     * Register a component function with the layout manager. This function should
     * return a constructor for a component based on a config.
     * This function will be called if a component type with the required name is not already registered.
     * It is recommended that applications use the {@link (VirtualLayout:class).getComponentEvent} and
     * {@link (VirtualLayout:class).releaseComponentEvent} instead of registering a constructor callback
     * @deprecated use {@link (GoldenLayout:class).registerGetComponentConstructorCallback}
     */
    registerComponentFunction(callback) {
        this.registerGetComponentConstructorCallback(callback);
    }
    /**
     * Register a callback closure with the layout manager which supplies a Component Constructor.
     * This callback should return a constructor for a component based on a config.
     * This function will be called if a component type with the required name is not already registered.
     * It is recommended that applications use the {@link (VirtualLayout:class).getComponentEvent} and
     * {@link (VirtualLayout:class).releaseComponentEvent} instead of registering a constructor callback
     */
    registerGetComponentConstructorCallback(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Please register a callback function');
        }
        if (this._getComponentConstructorFtn !== undefined) {
            console.warn('Multiple component functions are being registered.  Only the final registered function will be used.');
        }
        this._getComponentConstructorFtn = callback;
    }
    getRegisteredComponentTypeNames() {
        const typeNamesIterableIterator = this._componentTypesMap.keys();
        return Array.from(typeNamesIterableIterator);
    }
    /**
     * Returns a previously registered component instantiator.  Attempts to utilize registered
     * component type by first, then falls back to the component constructor callback function (if registered).
     * If neither gets an instantiator, then returns `undefined`.
     * Note that `undefined` will return if config.componentType is not a string
     *
     * @param config - The item config
     * @public
     */
    getComponentInstantiator(config) {
        let instantiator;
        const typeName = resolved_config_1.ResolvedComponentItemConfig.resolveComponentTypeName(config);
        if (typeName !== undefined) {
            instantiator = this._componentTypesMap.get(typeName);
        }
        if (instantiator === undefined) {
            if (this._getComponentConstructorFtn !== undefined) {
                instantiator = {
                    constructor: this._getComponentConstructorFtn(config),
                    factoryFunction: undefined,
                    virtual: false,
                };
            }
        }
        return instantiator;
    }
    /** @internal */
    bindComponent(container, itemConfig) {
        let instantiator;
        const typeName = resolved_config_1.ResolvedComponentItemConfig.resolveComponentTypeName(itemConfig);
        if (typeName !== undefined) {
            instantiator = this._componentTypesMap.get(typeName);
        }
        if (instantiator === undefined) {
            if (this._getComponentConstructorFtn !== undefined) {
                instantiator = {
                    constructor: this._getComponentConstructorFtn(itemConfig),
                    factoryFunction: undefined,
                    virtual: false,
                };
            }
        }
        let result;
        if (instantiator !== undefined) {
            const virtual = instantiator.virtual;
            // handle case where component is obtained by name or component constructor callback
            let componentState;
            if (itemConfig.componentState === undefined) {
                componentState = undefined;
            }
            else {
                // make copy
                componentState = utils_1.deepExtendValue({}, itemConfig.componentState);
            }
            let component;
            const componentConstructor = instantiator.constructor;
            if (componentConstructor !== undefined) {
                component = new componentConstructor(container, componentState, virtual);
            }
            else {
                const factoryFunction = instantiator.factoryFunction;
                if (factoryFunction !== undefined) {
                    component = factoryFunction(container, componentState, virtual);
                }
                else {
                    throw new internal_error_1.AssertError('LMBCFFU10008');
                }
            }
            if (virtual) {
                if (component === undefined) {
                    throw new internal_error_1.UnexpectedUndefinedError('GLBCVCU988774');
                }
                else {
                    const virtuableComponent = component;
                    const componentRootElement = virtuableComponent.rootHtmlElement;
                    if (componentRootElement === undefined) {
                        throw new external_error_1.BindError(`${i18n_strings_1.i18nStrings[5 /* VirtualComponentDoesNotHaveRootHtmlElement */]}: ${typeName}`);
                    }
                    else {
                        utils_1.ensureElementPositionAbsolute(componentRootElement);
                        this.container.appendChild(componentRootElement);
                        this._virtuableComponentMap.set(container, virtuableComponent);
                        container.virtualRectingRequiredEvent = this._containerVirtualRectingRequiredEventListener;
                        container.virtualVisibilityChangeRequiredEvent = this._containerVirtualVisibilityChangeRequiredEventListener;
                        container.virtualZIndexChangeRequiredEvent = this._containerVirtualZIndexChangeRequiredEventListener;
                    }
                }
            }
            result = {
                virtual: instantiator.virtual,
                component,
            };
        }
        else {
            // Use getComponentEvent
            result = super.bindComponent(container, itemConfig);
        }
        return result;
    }
    /** @internal */
    unbindComponent(container, virtual, component) {
        const virtuableComponent = this._virtuableComponentMap.get(container);
        if (virtuableComponent === undefined) {
            super.unbindComponent(container, virtual, component);
        }
        else {
            const componentRootElement = virtuableComponent.rootHtmlElement;
            if (componentRootElement === undefined) {
                throw new internal_error_1.AssertError('GLUC77743', container.title);
            }
            else {
                this.container.removeChild(componentRootElement);
                this._virtuableComponentMap.delete(container);
            }
        }
    }
    fireBeforeVirtualRectingEvent(count) {
        this._goldenLayoutBoundingClientRect = this.container.getBoundingClientRect();
        super.fireBeforeVirtualRectingEvent(count);
    }
    /** @internal */
    handleContainerVirtualRectingRequiredEvent(container, width, height) {
        const virtuableComponent = this._virtuableComponentMap.get(container);
        if (virtuableComponent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('GLHCSCE55933');
        }
        else {
            const rootElement = virtuableComponent.rootHtmlElement;
            if (rootElement === undefined) {
                throw new external_error_1.BindError(i18n_strings_1.i18nStrings[4 /* ComponentIsNotVirtuable */] + ' ' + container.title);
            }
            else {
                const containerBoundingClientRect = container.element.getBoundingClientRect();
                const left = containerBoundingClientRect.left - this._goldenLayoutBoundingClientRect.left;
                rootElement.style.left = utils_1.numberToPixels(left);
                const top = containerBoundingClientRect.top - this._goldenLayoutBoundingClientRect.top;
                rootElement.style.top = utils_1.numberToPixels(top);
                utils_1.setElementWidth(rootElement, width);
                utils_1.setElementHeight(rootElement, height);
            }
        }
    }
    /** @internal */
    handleContainerVirtualVisibilityChangeRequiredEvent(container, visible) {
        const virtuableComponent = this._virtuableComponentMap.get(container);
        if (virtuableComponent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('GLHCVVCRE55934');
        }
        else {
            const rootElement = virtuableComponent.rootHtmlElement;
            if (rootElement === undefined) {
                throw new external_error_1.BindError(i18n_strings_1.i18nStrings[4 /* ComponentIsNotVirtuable */] + ' ' + container.title);
            }
            else {
                utils_1.setElementDisplayVisibility(rootElement, visible);
            }
        }
    }
    /** @internal */
    handleContainerVirtualZIndexChangeRequiredEvent(container, logicalZIndex, defaultZIndex) {
        const virtuableComponent = this._virtuableComponentMap.get(container);
        if (virtuableComponent === undefined) {
            throw new internal_error_1.UnexpectedUndefinedError('GLHCVZICRE55935');
        }
        else {
            const rootElement = virtuableComponent.rootHtmlElement;
            if (rootElement === undefined) {
                throw new external_error_1.BindError(i18n_strings_1.i18nStrings[4 /* ComponentIsNotVirtuable */] + ' ' + container.title);
            }
            else {
                rootElement.style.zIndex = defaultZIndex;
            }
        }
    }
}
exports.GoldenLayout = GoldenLayout;
//# sourceMappingURL=golden-layout.js.map