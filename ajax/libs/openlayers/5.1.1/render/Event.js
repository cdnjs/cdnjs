/**
 * @module ol/render/Event
 */

import Event from '../events/Event.js';

var RenderEvent = (function (Event) {
  function RenderEvent(type, opt_vectorContext, opt_frameState, opt_context, opt_glContext) {

    Event.call(this, type);

    /**
     * For canvas, this is an instance of {@link module:ol/render/canvas/Immediate}.
     * @type {module:ol/render/VectorContext|undefined}
     * @api
     */
    this.vectorContext = opt_vectorContext;

    /**
     * An object representing the current render frame state.
     * @type {module:ol/PluggableMap~FrameState|undefined}
     * @api
     */
    this.frameState = opt_frameState;

    /**
     * Canvas context. Only available when a Canvas renderer is used, null
     * otherwise.
     * @type {CanvasRenderingContext2D|null|undefined}
     * @api
     */
    this.context = opt_context;

    /**
     * WebGL context. Only available when a WebGL renderer is used, null
     * otherwise.
     * @type {module:ol/webgl/Context|null|undefined}
     * @api
     */
    this.glContext = opt_glContext;

  }

  if ( Event ) RenderEvent.__proto__ = Event;
  RenderEvent.prototype = Object.create( Event && Event.prototype );
  RenderEvent.prototype.constructor = RenderEvent;

  return RenderEvent;
}(Event));

export default RenderEvent;

//# sourceMappingURL=Event.js.map