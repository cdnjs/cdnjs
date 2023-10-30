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
/* *
 *
 *  Class
 *
 * */
/**
 * Class responsible for storing handler callbacks used in component sync.
 * @internal
 */
class SyncHandler {
    /**
     * Adds a handler to the handler regisitry.
     *
     * @param handler The handler to add to the registry.
     */
    static register(handler) {
        const { id } = handler;
        this.registry[id] = handler;
    }
    /**
     * Gets a handler from handler registry.
     *
     * @param handlerID The ID of the handler to get.
     */
    static get(handlerID) {
        return this.registry[handlerID];
    }
    /**
     * Creates a new handler instance.
     *
     * @param id an unique ID for the handler.
     *
     * @param trigger The id of the presentationState that should trigger
     * this handler. Should be `undefined` when DataCursor is used.
     *
     * @param func
     * The function to be called when the handler is activated.
     */
    constructor(id, trigger, func) {
        this.id = id;
        this.presentationStateTrigger = trigger;
        this.func = func;
        SyncHandler.register(this);
    }
    /**
     * Attaches the handler to a component and presentationState.
     *
     * @deprecated use {@link register}
     * @param component The component to attach to.
     */
    create(component) {
        const { activeGroup } = component;
        const { func } = this;
        if (activeGroup && this.presentationStateTrigger) {
            this.callback = activeGroup
                .getSharedState()
                .on(this.presentationStateTrigger, function (e) {
                if (component.id !==
                    (e.detail ? e.detail.sender : void 0)) {
                    func.call(component, e);
                }
            });
        }
    }
    /**
     * Calls the activation function on the component and sets the callback to
     * the return function.
     *
     * @param component The component to register on.
     */
    register(component) {
        const { func } = this;
        this.callback = func.call(component);
    }
    /**
     * To be used when removing the handler from the component.
     * Calls the {@link callback} function.
     */
    remove() {
        if (this.callback) {
            this.callback();
        }
    }
}
/**
 * Registry for reusable handlers.
 * The handler is stored by ID.
 */
SyncHandler.registry = {};
/* *
 *
 *  Default Export
 *
 * */
export default SyncHandler;
