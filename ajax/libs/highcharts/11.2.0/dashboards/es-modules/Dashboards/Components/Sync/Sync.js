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
import SyncEmitter from './Emitter.js';
import SyncHandler from './Handler.js';
/* *
 *
 * Class
 *
 * */
/** @internal */
class Sync {
    /* *
     *
     * Constructor
     *
     * */
    constructor(component, syncHandlers = Sync.defaultHandlers) {
        this.component = component;
        this.syncConfig = syncHandlers;
        this.registeredSyncHandlers = {};
        this.registeredSyncEmitters = {};
        this.isSyncing = false;
        this.listeners = [];
    }
    /**
     * Creates an instance of the sync class.
     *
     * @param component
     * The component to which the emitters and handlers are attached.
     *
     * @param syncHandlers
     * The emitters and handlers to use for each event.
     */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Add new emitter to the registered emitters.
     * @param emitter
     The emitter to register.
     */
    registerSyncEmitter(emitter) {
        const { id } = emitter;
        this.registeredSyncEmitters[id] = emitter;
    }
    /**
     * Method that checks if the emitter is registered.
     *
     * @param id
     * The id of the emitter to check.
     *
     * @returns
     * Whether the emitter is registered.
     */
    isRegisteredEmitter(id) {
        return Boolean(this.registeredSyncEmitters[id]);
    }
    /**
     * Register new handler to the registered handlers.
     *
     * @param handler
     * The handler to register.
     */
    registerSyncHandler(handler) {
        const { id } = handler;
        this.registeredSyncHandlers[id] = handler;
    }
    /**
     * Method that checks if the handler is registered.
     *
     * @param handlerID
     * The id of the handler to check.
     *
     * @returns
     * Whether the handler is registered.
     */
    isRegisteredHandler(handlerID) {
        return Boolean(this.registeredSyncHandlers[handlerID]);
    }
    /**
     * Registers the handlers and emitters on the component
     */
    start() {
        const { syncConfig, component } = this;
        for (const id of Object.keys(syncConfig)) {
            if (!syncConfig[id]) {
                continue;
            }
            let { emitter: emitterConfig, handler: handlerConfig } = syncConfig[id];
            if (handlerConfig) {
                // Avoid registering the same handler multiple times
                // i.e. panning and selection uses the same handler
                if (typeof handlerConfig === 'boolean') {
                    handlerConfig =
                        Sync.defaultHandlers[id]
                            .handler;
                }
                // TODO: should rework the SyncHandler constructor when
                // all handlers are updated
                if (typeof handlerConfig === 'function') {
                    handlerConfig = [id, void 0, handlerConfig];
                }
                const handler = new SyncHandler(...handlerConfig);
                if (!this.isRegisteredHandler(handler.id)) {
                    this.registerSyncHandler(handler);
                    // TODO: workaround for now
                    // we should only use register in the future
                    if (handlerConfig[1] !== void 0) {
                        handler.create(component);
                    }
                    else {
                        handler.register(component);
                    }
                }
            }
            if (emitterConfig) {
                if (typeof emitterConfig === 'boolean') {
                    emitterConfig =
                        Sync.defaultHandlers[id]
                            .emitter;
                }
                // TODO: should rework the SyncHandler constructor when
                // all handlers are updated
                if (typeof emitterConfig === 'function') {
                    emitterConfig = [id, emitterConfig];
                }
                const emitter = new SyncEmitter(...emitterConfig);
                if (!this.isRegisteredEmitter(emitter.id)) {
                    this.registerSyncEmitter(emitter);
                    emitter.create(component);
                }
            }
        }
        this.isSyncing = true;
        this.listeners.push(component.on('update', () => this.stop()));
    }
    /**
     * Removes the handlers and emitters from the component.
     */
    stop() {
        const { component, listeners, registeredSyncHandlers, registeredSyncEmitters } = this;
        Object.keys(registeredSyncHandlers).forEach((id) => {
            registeredSyncHandlers[id].remove();
            delete registeredSyncHandlers[id];
        });
        Object.keys(registeredSyncEmitters).forEach((id) => {
            registeredSyncEmitters[id].remove();
            delete registeredSyncEmitters[id];
        });
        this.isSyncing = false;
        for (let i = 0, iEnd = listeners.length; i < iEnd; ++i) {
            listeners[i]();
        }
        this.listeners.length = 0;
        this.listeners.push(component.on('afterUpdate', () => {
            this.start();
        }));
    }
}
/**
 * Default handlers for the sync class. This property is extended by
 * different Components, where default syncs are added. Allows overwriting
 * the configuration before creating the dashboard.
 */
Sync.defaultHandlers = {};
/* *
 *
 *  Default Export
 *
 * */
export default Sync;
