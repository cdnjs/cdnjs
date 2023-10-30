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
/**
 *  Class responsible for adding event listeners on a component
 *  @internal
 */
class SyncEmitter {
    /**
     * Adds an emitter to the emitter registry.
     *
     * @param emitter the emitter to add to the registry.
     */
    static register(emitter) {
        const { id } = emitter;
        this.registry[id] = emitter;
    }
    /**
     * Gets an emitter from emitter registry.
     *
     * @param emitterID The ID of the emitter to get.
     */
    static get(emitterID) {
        return this.registry[emitterID];
    }
    /**
     * Creates a new emitter instance.
     *
     * @param id An unique ID for the emitter.
     *
     * @param func
     * The function to be called when the emitter is activated.
     */
    constructor(id, func) {
        this.id = id;
        this.func = func;
        SyncEmitter.register(this);
    }
    /**
     * Attaches the emitter to a component.
     *
     * @param component The component to attach to.
     */
    create(component) {
        this.callback = this.func.call(component);
    }
    /**
     * To be used when removing the emitter from the component.
     * Calls the {@link callback} function.
     */
    remove() {
        if (this.callback) {
            this.callback();
        }
    }
}
/**
 * Registry for reusable emitter.
 * The emitter is stored by ID.
 */
SyncEmitter.registry = {};
export default SyncEmitter;
