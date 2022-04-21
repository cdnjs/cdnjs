/**
 * @module ol/pointer/EventSource
 */

var EventSource = function EventSource(dispatcher, mapping) {

  /**
   * @type {import("./PointerEventHandler.js").default}
   */
  this.dispatcher = dispatcher;

  /**
   * @private
   * @const
   * @type {!Object<string, function(Event)>}
   */
  this.mapping_ = mapping;
};

/**
 * List of events supported by this source.
 * @return {Array<string>} Event names
 */
EventSource.prototype.getEvents = function getEvents () {
  return Object.keys(this.mapping_);
};

/**
 * Returns the handler that should handle a given event type.
 * @param {string} eventType The event type.
 * @return {function(Event)} Handler
 */
EventSource.prototype.getHandlerForEvent = function getHandlerForEvent (eventType) {
  return this.mapping_[eventType];
};

export default EventSource;

//# sourceMappingURL=EventSource.js.map