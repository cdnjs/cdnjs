/**
 * @module ol/pointer/EventSource
 */
var EventSource = /** @class */ (function () {
    /**
     * @param {import("./PointerEventHandler.js").default} dispatcher Event handler.
     * @param {!Object<string, function(Event): void>} mapping Event mapping.
     */
    function EventSource(dispatcher, mapping) {
        /**
         * @type {import("./PointerEventHandler.js").default}
         */
        this.dispatcher = dispatcher;
        /**
         * @private
         * @const
         * @type {!Object<string, function(Event): void>}
         */
        this.mapping_ = mapping;
    }
    /**
     * List of events supported by this source.
     * @return {Array<string>} Event names
     */
    EventSource.prototype.getEvents = function () {
        return Object.keys(this.mapping_);
    };
    /**
     * Returns the handler that should handle a given event type.
     * @param {string} eventType The event type.
     * @return {function(Event)} Handler
     */
    EventSource.prototype.getHandlerForEvent = function (eventType) {
        return this.mapping_[eventType];
    };
    return EventSource;
}());
export default EventSource;
//# sourceMappingURL=EventSource.js.map