class CallbackRegistry {
    constructor() {
        this.registry = {};
    }
    addCallback(id, callback) {
        this.registry[id] = callback;
    }
    getCallback(id) {
        return this.registry[id];
    }
    /** @internal */
    toJSON() {
        const json = {};
        Object.keys(this.registry).forEach((key) => {
            const entry = this.getCallback(key);
            const { func, type } = entry;
            json[key] = {
                func: func.toString(),
                type
            };
        });
        return json;
    }
}
export default CallbackRegistry;
