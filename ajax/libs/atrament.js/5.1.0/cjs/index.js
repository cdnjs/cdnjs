'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* eslint-disable max-classes-per-file */
// make a class for Point
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

// make a class for the mouse data
class Mouse extends Point {
  constructor() {
    super(0, 0);
    this.down = false;
    this.previous = new Point(0, 0);
  }
}

class AtramentEventTarget {
  constructor() {
    this.eventListeners = new Map();
  }

  addEventListener(eventName, handler) {
    const handlers = this.eventListeners.get(eventName) || new Set();
    handlers.add(handler);
    this.eventListeners.set(eventName, handlers);
  }

  removeEventListener(eventName, handler) {
    const handlers = this.eventListeners.get(eventName);
    if (!handlers) return;
    handlers.delete(handler);
  }

  dispatchEvent(eventName, data) {
    const handlers = this.eventListeners.get(eventName);
    if (!handlers) return;
    [...handlers].forEach((handler) => handler(data));
  }
}

// colour indices per pixel

const lineDistance = (x1, y1, x2, y2) => {
  // calculate euclidean distance between (x1, y1) and (x2, y2)
  const xs = (x2 - x1) ** 2;
  const ys = (y2 - y1) ** 2;
  return Math.sqrt(xs + ys);
};
/* eslint-enable no-param-reassign */

const pointerEventHandler = (handler, instance) => (event) => {
  // Ignore pointers such as additional touches on a multi-touch screen
  if (!event.isPrimary || (!instance.secondaryMouseButton && event.button > 0)
    || (instance.ignoreModifiers
      && (event.altKey || event.ctrlKey || event.metaKey || event.button === 1))) {
    return;
  }

  if (event.cancelable) {
    event.preventDefault();
  }

  handler(event);
};

const setupPointerEvents = ({
  canvas,
  move,
  down,
  up,
}, instance) => {
  const moveListener = pointerEventHandler(move, instance);
  const downListener = pointerEventHandler(down, instance);
  const upListener = pointerEventHandler(up, instance);

  canvas.addEventListener('pointermove', moveListener);
  canvas.addEventListener('pointerdown', downListener);
  document.addEventListener('pointerup', upListener);
  document.addEventListener('pointerout', upListener);

  return () => {
    canvas.removeEventListener('pointermove', moveListener);
    canvas.removeEventListener('pointerdown', downListener);
    document.removeEventListener('pointerup', upListener);
    document.removeEventListener('pointerout', upListener);
  };
};

const MAX_LINE_THICKNESS = 100;

const MIN_LINE_THICKNESS = 2;
const LINE_THICKNESS_RANGE = MAX_LINE_THICKNESS - MIN_LINE_THICKNESS;
const THICKNESS_INCREMENT = 0.25;
const MIN_SMOOTHING_FACTOR = 0.87;
const INITIAL_SMOOTHING_FACTOR = 0.85;
const WEIGHT_SPREAD = 30;
const INITIAL_THICKNESS = 2;
const DEFAULT_PRESSURE = 0.5;

const scale = (value, smin, smax, tmin, tmax) => ((value - smin) * (tmax - tmin))
  / (smax - smin) + tmin;

const MODE_DRAW = 'draw';
const MODE_ERASE = 'erase';
const MODE_FILL = 'fill';
const MODE_DISABLED = 'disabled';

const pathDrawingModes = [MODE_DRAW, MODE_ERASE];
const configKeys = ['weight', 'smoothing', 'adaptiveStroke', 'mode', 'secondaryMouseButton', 'ignoreModifiers', 'pressureLow', 'pressureHigh', 'pressureSmoothing'];

class Atrament extends AtramentEventTarget {
  adaptiveStroke = true;
  canvas;
  recordStrokes = false;
  smoothing = INITIAL_SMOOTHING_FACTOR;
  thickness = INITIAL_THICKNESS;
  secondaryMouseButton = false;
  ignoreModifiers = false;
  pressureLow = 0;
  pressureHigh = 2;
  pressureSmoothing = 0.3;

  #context;
  #contextMenu = false;
  #dirty = false;
  #filling = false;
  #fillStack = [];
  #fillWorker = null;
  #mode = MODE_DRAW;
  #mouse = new Mouse();
  #previousPressure = DEFAULT_PRESSURE;
  #removePointerEventListeners;
  #strokeMemory = [];
  #thickness = INITIAL_THICKNESS;
  #weight = INITIAL_THICKNESS;

  constructor(selector, config = {}) {
    if (typeof window === 'undefined') {
      throw new Error('atrament: looks like we\'re not running in a browser');
    }

    super();

    this.canvas = Atrament.#setupCanvas(selector, config);
    this.#context = Atrament.#setupContext(this.canvas, config);
    this.#setupFill({ FillWorker: config.fill });

    this.#removePointerEventListeners = setupPointerEvents({
      canvas: this.canvas,
      move: this.#pointerMove.bind(this),
      down: this.#pointerDown.bind(this),
      up: this.#pointerUp.bind(this),
    }, this);

    configKeys.forEach((key) => {
      if (config[key] !== undefined) {
        this[key] = config[key];
      }
    });

    this.canvas.addEventListener('contextmenu', (event) => {
      if (this.secondaryMouseButton && this.mode !== MODE_DISABLED) {
        event.preventDefault();
      } else {
        // On certain browsers/devices, left-clicking away from the contextmenu
        // seems to already trigger pointermove, so this way we prevent the coordinates
        // of that pointermove from being drawn.
        this.#contextMenu = true;
      }
    });
  }

  /**
   * Begins a stroke at a given position
   *
   * @param {number} x
   * @param {number} y
   */
  beginStroke(x, y) {
    this.#context.moveTo(x, y);
    this.#thickness = this.#weight;

    if (this.recordStrokes) {
      this.strokeTimestamp = performance.now();
    }

    this.dispatchEvent('strokestart', { x, y });
  }

  /**
   * Ends a stroke at a given position
   *
   * @param {number} x
   * @param {number} y
   */
  endStroke(x, y) {
    this.dispatchEvent('strokeend', { x, y });

    if (this.recordStrokes) {
      this.dispatchEvent('strokerecorded', { stroke: this.currentStroke });
    }
    this.#strokeMemory = [];
    delete (this.strokeTimestamp);
  }

  /**
   * Draws the next stroke segment as a smooth quadratic curve
   * with adaptive stroke thickness between two points.
   *
   * @param {number} x current X coordinate
   * @param {number} y current Y coordinate
   * @param {number} previousX previous X coordinate
   * @param {number} previousY previous Y coordinate
   * @param {number} pressure the pointer pressure at this point (defaults to 0.5)
   */
  draw(x, y, previousX, previousY, pressure = DEFAULT_PRESSURE) {
    // If the user clicks (or double clicks) without moving the mouse,
    // previousX/Y will be 0. In this case, we don't want to draw a line from (0,0) to (x,y),
    // but a "point" from (x,y) to (x,y).
    const prevX = previousX || x;
    const prevY = previousY || y;
    // get distance from the previous point
    // and use it to calculate the smoothed coordinates
    const smoothingFactor = this.getSmoothingFactor(lineDistance(x, y, prevX, prevY));
    const procX = x - (x - prevX) * smoothingFactor;
    const procY = y - (y - prevY) * smoothingFactor;

    // low-pass filtering pressure to avoid jagged stroke ends
    // where stylus pressure tends to be very low
    const pressureDiff = pressure - this.#previousPressure;
    const smoothedPressure = pressure - pressureDiff * this.pressureSmoothing;

    // recalculate distance from previous point, this time relative to the smoothed coords
    const dist = lineDistance(procX, procY, prevX, prevY);

    // Adaptive stroke allows an effect where thickness changes
    // over the course of the stroke. This simulates the variation in
    // ink discharge of a physical pen.
    // For pressure-sensitive devices, there will be natural variation,
    // so we don't apply adaptive stroke.
    if (this.adaptiveStroke && pressure === DEFAULT_PRESSURE) {
      const ratio = (dist - MIN_LINE_THICKNESS) / LINE_THICKNESS_RANGE;
      // Calculate target thickness based on weight settings.
      const targetThickness = ratio * (this.#maxWeight - this.#weight) + this.#weight;

      // approach the target gradually
      if (this.#thickness > targetThickness) {
        this.#thickness -= THICKNESS_INCREMENT;
      } else if (this.#thickness < targetThickness) {
        this.#thickness += THICKNESS_INCREMENT;
      }
    } else {
      this.#thickness = this.#getWeightWithPressure(smoothedPressure);
    }

    // Adjust thickness to intrinsic canvas size;
    this.#context.lineWidth = (this.#thickness / this.canvas.offsetWidth) * this.canvas.width;

    const segmentStart = this.#extrinsicToIntrinsicPoint(prevX, prevY);
    const segmentEnd = this.#extrinsicToIntrinsicPoint(procX, procY);

    // Draw the segment using quad interpolation.
    this.#context.beginPath();
    this.#context.moveTo(...segmentStart);
    this.#context.quadraticCurveTo(...segmentStart, ...segmentEnd);
    this.#context.closePath();
    this.#context.stroke();

    if (this.recordStrokes) {
      this.#strokeMemory.push({
        point: new Point(x, y),
        time: performance.now() - this.strokeTimestamp,
        pressure,
      });

      this.dispatchEvent('segmentdrawn', { stroke: this.currentStroke });
    }

    // At this point, we can be certain the canvas has some drawing on it,
    // so we can toggle the "dirty" state. Checking it here ensures that
    // the state is also updated during programmatic drawing.
    if (!this.#dirty && this.#mode === MODE_DRAW) {
      this.#dirty = true;
      this.dispatchEvent('dirty');
    }

    return { x: procX, y: procY };
  }

  clear() {
    this.#dirty = false;
    this.dispatchEvent('clean');

    // make sure we're in the right compositing mode, and erase everything
    const eraseMode = this.mode === MODE_ERASE;
    if (eraseMode) {
      this.mode = MODE_DRAW;
    }

    // clear the canvas without the transform
    // code taken from https://stackoverflow.com/a/6722031
    this.#context.save();
    this.#context.setTransform(1, 0, 0, 1, 0, 0);
    this.#context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.#context.restore();

    if (eraseMode) {
      this.mode = MODE_ERASE;
    }
  }

  destroy() {
    this.clear();
    this.#removePointerEventListeners?.();
  }

  get color() {
    return this.#context.strokeStyle;
  }

  set color(c) {
    if (typeof c !== 'string') throw new Error('atrament: wrong argument type setting color');
    this.#context.strokeStyle = c;
  }

  get weight() {
    return this.#weight;
  }

  set weight(w) {
    if (typeof w !== 'number') throw new Error('atrament: wrong argument type setting weight');
    this.#thickness = w;
    this.#weight = w;
  }

  // For small weights, this allows for a lot of spread,
  // while for larger weights, the effect is less prominent.
  // This means at small weights, Atrament behaves more like an ink pen,
  // and at larger weights more like a marker.
  get #maxWeight() {
    return this.#weight + WEIGHT_SPREAD;
  }

  // Here we scale the initial smoothing factor by the raw distance
  // - this means that when the mouse moves fast, there is more smoothing,
  // and when we're drawing small detailed stuff, we have more control.
  getSmoothingFactor(dist) {
    return Math.min(
      MIN_SMOOTHING_FACTOR,
      this.smoothing + (dist - 60) / 3000,
    );
  }

  get mode() {
    return this.#mode;
  }

  set mode(m) {
    switch (m) {
      case MODE_ERASE:
        this.#mode = MODE_ERASE;
        this.#context.globalCompositeOperation = 'destination-out';
        break;
      case MODE_FILL:
        this.#mode = MODE_FILL;
        this.#context.globalCompositeOperation = 'source-over';
        break;
      case MODE_DISABLED:
        this.#mode = MODE_DISABLED;
        break;
      case MODE_DRAW:
        this.#mode = MODE_DRAW;
        this.#context.globalCompositeOperation = 'source-over';
        break;
      default:
        throw new Error('atrament: mode is not one of the allowed modes.');
    }
  }

  get currentStroke() {
    return {
      segments: this.#strokeMemory.slice(),
      mode: this.mode,
      weight: this.weight,
      smoothing: this.smoothing,
      color: this.color,
      adaptiveStroke: this.adaptiveStroke,
    };
  }

  get dirty() {
    return this.#dirty;
  }

  // Translates between extrinsic (DOM) coordinates and intrinsic (bitmap) coordinates.
  // Returns an array for easy passing into argument lists of CanvasRenderingContext2D methods.
  #extrinsicToIntrinsicPoint(offsetX, offsetY) {
    const x = (offsetX / this.canvas.offsetWidth) * this.canvas.width;
    const y = (offsetY / this.canvas.offsetHeight) * this.canvas.height;
    return [x, y];
  }

  #getWeightWithPressure(pressure) {
    if (pressure === 0.5) {
      return this.#weight;
    }

    if (pressure < 0.5) {
      return this.#weight * scale(pressure, 0, 0.5, this.pressureLow, 1);
    }

    return this.#weight * scale(pressure, 0.5, 1, 1, this.pressureHigh);
  }

  static #setupCanvas(selector, config) {
    let canvas;
    // get canvas element
    if (selector instanceof window.Node && selector.tagName === 'CANVAS') canvas = selector;
    else if (typeof selector === 'string') canvas = document.querySelector(selector);
    else throw new Error(`atrament: can't look for canvas based on '${selector}'`);
    if (!canvas) throw new Error('atrament: canvas not found');
    canvas.width = config.width || canvas.width;
    canvas.height = config.height || canvas.height;
    canvas.style.touchAction = 'none';

    return canvas;
  }

  static #setupContext(canvas, config) {
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'source-over';
    context.globalAlpha = 1;
    context.strokeStyle = config.color || 'rgba(0,0,0,1)';
    context.lineCap = 'round';
    context.lineJoin = 'round';

    return context;
  }

  #pointerMove(event) {
    const positions = event.getCoalescedEvents?.() || [event];
    positions.forEach((position) => {
      const x = position.offsetX;
      const y = position.offsetY;

      // draw if we should draw
      if (this.#mouse.down && pathDrawingModes.includes(this.#mode)) {
        if (this.#contextMenu) {
          this.#mouse.previous.set(x, y);
          this.#contextMenu = false;
        }
        const { x: newX, y: newY } = this.draw(
          x,
          y,
          this.#mouse.previous.x,
          this.#mouse.previous.y,
          position.pressure,
        );

        this.#mouse.set(x, y);
        this.#mouse.previous.set(newX, newY);
        this.#previousPressure = position.pressure;
      } else {
        this.#mouse.set(x, y);
        this.#mouse.previous.set(x, y);
      }
    });
  }

  #pointerDown(event) {
    this.dispatchEvent('pointerdown', event);

    if (this.mode === MODE_FILL) {
      this.#fill();
      return;
    }

    this.#mouse.down = true;
    // update position just in case
    this.#pointerMove(event);
    this.#previousPressure = event.pressure;

    this.beginStroke(this.#mouse.previous.x, this.#mouse.previous.y);
  }

  #pointerUp(event) {
    this.dispatchEvent('pointerup', event);

    if (this.#mode === MODE_FILL) {
      return;
    }

    if (!this.#mouse.down) {
      return;
    }

    this.#mouse.down = false;

    if (this.#mouse.x === event.offsetX
      && this.#mouse.y === event.offsetY && pathDrawingModes.includes(this.mode)) {
      this.draw(
        this.#mouse.x,
        this.#mouse.y,
        this.#mouse.previous.x,
        this.#mouse.previous.y,
        this.#previousPressure,
      );
    }

    this.#mouse.previous.set(0, 0);

    this.endStroke(this.#mouse.x, this.#mouse.y);
  }

  #setupFill({ FillWorker }) {
    if (!FillWorker) {
      return;
    }

    this.#fillWorker = new FillWorker();
    this.#fillWorker.addEventListener('message', ({ data }) => {
      if (data.type === 'fill-result') {
        this.#filling = false;
        this.dispatchEvent('fillend', {});

        const imageData = new ImageData(data.result, this.canvas.width, this.canvas.height);
        this.#context.putImageData(imageData, 0, 0);

        if (this.#fillStack.length > 0) {
          this.#postToFillWorker(this.#fillStack.shift());
        }
      }
    });
  }

  #fill() {
    if (!this.#fillWorker) {
      throw new Error('atrament: fill mode only works if the fillWorker option is passed to the Atrament constructor');
    }

    const { x, y } = this.#mouse;
    this.dispatchEvent('fillstart', { x, y });

    const startColor = Array.from(this.#context.getImageData(x, y, 1, 1).data);
    const fillData = {
      color: this.color,
      globalAlpha: this.#context.globalAlpha,
      width: this.canvas.width,
      height: this.canvas.height,
      startColor,
      startX: x,
      startY: y,
    };

    if (!this.#filling) {
      this.#filling = true;
      this.#postToFillWorker(fillData);
    } else {
      this.#fillStack.push(fillData);
    }
  }

  #postToFillWorker(fillData) {
    const image = this.#context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    this.#fillWorker?.postMessage({ image, ...fillData }, [image.buffer]);
  }
}

exports.MODE_DISABLED = MODE_DISABLED;
exports.MODE_DRAW = MODE_DRAW;
exports.MODE_ERASE = MODE_ERASE;
exports.MODE_FILL = MODE_FILL;
exports.default = Atrament;
