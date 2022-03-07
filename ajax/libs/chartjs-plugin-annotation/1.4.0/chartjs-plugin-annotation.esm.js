/*!
* chartjs-plugin-annotation v1.4.0
* https://www.chartjs.org/chartjs-plugin-annotation/index
 * (c) 2022 chartjs-plugin-annotation Contributors
 * Released under the MIT License
 */
import { Element, defaults, Animations, Chart } from 'chart.js';
import { defined, distanceBetweenPoints, callback, isFinite, valueOrDefault, isObject, toRadians, toFont, isArray, addRoundedRectPath, toTRBLCorners, toPadding, PI, drawPoint, RAD_PER_DEG, clipArea, unclipArea } from 'chart.js/helpers';

const clickHooks = ['click', 'dblclick'];
const moveHooks = ['enter', 'leave'];
const hooks = clickHooks.concat(moveHooks);

function updateListeners(chart, state, options) {
  state.listened = false;
  state.moveListened = false;

  hooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.listened = true;
      state.listeners[hook] = options[hook];
    } else if (defined(state.listeners[hook])) {
      delete state.listeners[hook];
    }
  });
  moveHooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.moveListened = true;
    }
  });

  if (!state.listened || !state.moveListened) {
    state.annotations.forEach(scope => {
      if (!state.listened) {
        clickHooks.forEach(hook => {
          if (typeof scope[hook] === 'function') {
            state.listened = true;
          }
        });
      }
      if (!state.moveListened) {
        moveHooks.forEach(hook => {
          if (typeof scope[hook] === 'function') {
            state.listened = true;
            state.moveListened = true;
          }
        });
      }
    });
  }
}

function handleEvent(state, event, options) {
  if (state.listened) {
    switch (event.type) {
    case 'mousemove':
    case 'mouseout':
      handleMoveEvents(state, event);
      break;
    case 'click':
      handleClickEvents(state, event, options);
      break;
    }
  }
}

function handleMoveEvents(state, event) {
  if (!state.moveListened) {
    return;
  }

  let element;

  if (event.type === 'mousemove') {
    element = getNearestItem(state.elements, event);
  }

  const previous = state.hovered;
  state.hovered = element;

  dispatchMoveEvents(state, {previous, element}, event);
}

function dispatchMoveEvents(state, elements, event) {
  const {previous, element} = elements;
  if (previous && previous !== element) {
    dispatchEvent(previous.options.leave || state.listeners.leave, previous, event);
  }
  if (element && element !== previous) {
    dispatchEvent(element.options.enter || state.listeners.enter, element, event);
  }
}

function handleClickEvents(state, event, options) {
  const listeners = state.listeners;
  const element = getNearestItem(state.elements, event);
  if (element) {
    const elOpts = element.options;
    const dblclick = elOpts.dblclick || listeners.dblclick;
    const click = elOpts.click || listeners.click;
    if (element.clickTimeout) {
      // 2nd click before timeout, so its a double click
      clearTimeout(element.clickTimeout);
      delete element.clickTimeout;
      dispatchEvent(dblclick, element, event);
    } else if (dblclick) {
      // if there is a dblclick handler, wait for dblClickSpeed ms before deciding its a click
      element.clickTimeout = setTimeout(() => {
        delete element.clickTimeout;
        dispatchEvent(click, element, event);
      }, options.dblClickSpeed);
    } else {
      // no double click handler, just call the click handler directly
      dispatchEvent(click, element, event);
    }
  }
}

function dispatchEvent(handler, element, event) {
  callback(handler, [element.$context, event]);
}

function getNearestItem(elements, position) {
  let minDistance = Number.POSITIVE_INFINITY;

  return elements
    .filter((element) => element.options.display && element.inRange(position.x, position.y))
    .reduce((nearestItems, element) => {
      const center = element.getCenterPoint();
      const distance = distanceBetweenPoints(position, center);

      if (distance < minDistance) {
        nearestItems = [element];
        minDistance = distance;
      } else if (distance === minDistance) {
        // Can have multiple items at the same distance in which case we sort by size
        nearestItems.push(element);
      }

      return nearestItems;
    }, [])
    .sort((a, b) => a._index - b._index)
    .slice(0, 1)[0]; // return only the top item
}

function adjustScaleRange(chart, scale, annotations) {
  const range = getScaleLimits(scale, annotations);
  let changed = changeScaleLimit(scale, range, 'min', 'suggestedMin');
  changed = changeScaleLimit(scale, range, 'max', 'suggestedMax') || changed;
  if (changed && typeof scale.handleTickRangeOptions === 'function') {
    scale.handleTickRangeOptions();
  }
}

function verifyScaleOptions(annotations, scales) {
  for (const annotation of annotations) {
    verifyScaleIDs(annotation, scales);
  }
}

function changeScaleLimit(scale, range, limit, suggestedLimit) {
  if (isFinite(range[limit]) && !scaleLimitDefined(scale.options, limit, suggestedLimit)) {
    const changed = scale[limit] !== range[limit];
    scale[limit] = range[limit];
    return changed;
  }
}

function scaleLimitDefined(scaleOptions, limit, suggestedLimit) {
  return defined(scaleOptions[limit]) || defined(scaleOptions[suggestedLimit]);
}

function verifyScaleIDs(annotation, scales) {
  for (const key of ['scaleID', 'xScaleID', 'yScaleID']) {
    if (annotation[key] && !scales[annotation[key]] && verifyProperties(annotation, key)) {
      console.warn(`No scale found with id '${annotation[key]}' for annotation '${annotation.id}'`);
    }
  }
}

function verifyProperties(annotation, key) {
  if (key === 'scaleID') {
    return true;
  }
  const axis = key.charAt(0);
  for (const prop of ['Min', 'Max', 'Value']) {
    if (defined(annotation[axis + prop])) {
      return true;
    }
  }
  return false;
}

function getScaleLimits(scale, annotations) {
  const axis = scale.axis;
  const scaleID = scale.id;
  const scaleIDOption = axis + 'ScaleID';
  const limits = {
    min: valueOrDefault(scale.min, Number.NEGATIVE_INFINITY),
    max: valueOrDefault(scale.max, Number.POSITIVE_INFINITY)
  };
  for (const annotation of annotations) {
    if (annotation.scaleID === scaleID) {
      updateLimits(annotation, scale, ['value', 'endValue'], limits);
    } else if (annotation[scaleIDOption] === scaleID) {
      updateLimits(annotation, scale, [axis + 'Min', axis + 'Max', axis + 'Value'], limits);
    }
  }
  return limits;
}

function updateLimits(annotation, scale, props, limits) {
  for (const prop of props) {
    const raw = annotation[prop];
    if (defined(raw)) {
      const value = scale.parse(raw);
      limits.min = Math.min(limits.min, value);
      limits.max = Math.max(limits.max, value);
    }
  }
}

const EPSILON = 0.001;

const clamp = (x, from, to) => Math.min(to, Math.max(from, x));

function clampAll(obj, from, to) {
  for (const key of Object.keys(obj)) {
    obj[key] = clamp(obj[key], from, to);
  }
  return obj;
}

function inPointRange(point, center, radius, borderWidth) {
  if (!point || !center || radius <= 0) {
    return false;
  }
  const hBorderWidth = borderWidth / 2 || 0;
  return (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)) <= Math.pow(radius + hBorderWidth, 2);
}

function inBoxRange(mouseX, mouseY, {x, y, width, height}, borderWidth) {
  const hBorderWidth = borderWidth / 2;
  return mouseX >= x - hBorderWidth - EPSILON &&
         mouseX <= x + width + hBorderWidth + EPSILON &&
         mouseY >= y - hBorderWidth - EPSILON &&
         mouseY <= y + height + hBorderWidth + EPSILON;
}

function getElementCenterPoint(element, useFinalPosition) {
  const {x, y} = element.getProps(['x', 'y'], useFinalPosition);
  return {x, y};
}

const isOlderPart = (act, req) => req > act || (act.length > req.length && act.substr(0, req.length) === req);

function requireVersion(pkg, min, ver, strict = true) {
  const parts = ver.split('.');
  let i = 0;
  for (const req of min.split('.')) {
    const act = parts[i++];
    if (parseInt(req, 10) < parseInt(act, 10)) {
      break;
    }
    if (isOlderPart(act, req)) {
      if (strict) {
        throw new Error(`${pkg} v${ver} is not supported. v${min} or newer is required.`);
      } else {
        return false;
      }
    }
  }
  return true;
}

const isPercentString = (s) => typeof s === 'string' && s.endsWith('%');
const toPercent = (s) => clamp(parseFloat(s) / 100, 0, 1);

function getRelativePosition(size, positionOption) {
  if (positionOption === 'start') {
    return 0;
  }
  if (positionOption === 'end') {
    return size;
  }
  if (isPercentString(positionOption)) {
    return toPercent(positionOption) * size;
  }
  return size / 2;
}

function getSize(size, value) {
  if (typeof value === 'number') {
    return value;
  } else if (isPercentString(value)) {
    return toPercent(value) * size;
  }
  return size;
}

function calculateTextAlignment(size, options) {
  const {x, width} = size;
  const textAlign = options.textAlign;
  if (textAlign === 'center') {
    return x + width / 2;
  } else if (textAlign === 'end' || textAlign === 'right') {
    return x + width;
  }
  return x;
}

function toPosition(value) {
  if (isObject(value)) {
    return {
      x: valueOrDefault(value.x, 'center'),
      y: valueOrDefault(value.y, 'center'),
    };
  }
  value = valueOrDefault(value, 'center');
  return {
    x: value,
    y: value
  };
}

function isBoundToPoint(options) {
  return options && (defined(options.xValue) || defined(options.yValue));
}

const widthCache = new Map();

/**
 * Determine if content is an image or a canvas.
 * @param {*} content
 * @returns boolean|undefined
 * @todo move this function to chart.js helpers
 */
function isImageOrCanvas(content) {
  if (content && typeof content === 'object') {
    const type = content.toString();
    return (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]');
  }
}

/**
 * Set the translation on the canvas if the rotation must be applied.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {Element} element - annotation element to use for applying the translation
 * @param {number} rotation - rotation (in degrees) to apply
 */
function translate(ctx, element, rotation) {
  if (rotation) {
    const center = element.getCenterPoint();
    ctx.translate(center.x, center.y);
    ctx.rotate(toRadians(rotation));
    ctx.translate(-center.x, -center.y);
  }
}

/**
 * Apply border options to the canvas context before drawing a shape
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {Object} options - options with border configuration
 * @returns {boolean} true is the border options have been applied
 */
function setBorderStyle(ctx, options) {
  if (options && options.borderWidth) {
    ctx.lineCap = options.borderCapStyle;
    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.lineJoin = options.borderJoinStyle;
    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    return true;
  }
}

/**
 * Apply shadow options to the canvas context before drawing a shape
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {Object} options - options with shadow configuration
 */
function setShadowStyle(ctx, options) {
  ctx.shadowColor = options.backgroundShadowColor;
  ctx.shadowBlur = options.shadowBlur;
  ctx.shadowOffsetX = options.shadowOffsetX;
  ctx.shadowOffsetY = options.shadowOffsetY;
}

/**
 * Measure the label size using the label options.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {Object} options - options to configure the label
 * @returns {{width: number, height: number}} the measured size of the label
 */
function measureLabelSize(ctx, options) {
  const content = options.content;
  if (isImageOrCanvas(content)) {
    return {
      width: getSize(content.width, options.width),
      height: getSize(content.height, options.height)
    };
  }
  const font = toFont(options.font);
  const strokeWidth = options.textStrokeWidth;
  const lines = isArray(content) ? content : [content];
  const mapKey = lines.join() + font.string + strokeWidth + (ctx._measureText ? '-spriting' : '');
  if (!widthCache.has(mapKey)) {
    ctx.save();
    ctx.font = font.string;
    const count = lines.length;
    let width = 0;
    for (let i = 0; i < count; i++) {
      const text = lines[i];
      width = Math.max(width, ctx.measureText(text).width + strokeWidth);
    }
    ctx.restore();
    const height = count * font.lineHeight + strokeWidth;
    widthCache.set(mapKey, {width, height});
  }
  return widthCache.get(mapKey);
}

/**
 * Draw a box with the size and the styling options.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {{x: number, y: number, width: number, height: number}} rect - rect to draw
 * @param {Object} options - options to style the box
 * @returns {undefined}
 */
function drawBox(ctx, rect, options) {
  const {x, y, width, height} = rect;
  ctx.save();
  setShadowStyle(ctx, options);
  const stroke = setBorderStyle(ctx, options);
  ctx.fillStyle = options.backgroundColor;
  ctx.beginPath();
  addRoundedRectPath(ctx, {
    x, y, w: width, h: height,
    // TODO: v2 remove support for cornerRadius
    radius: clampAll(toTRBLCorners(valueOrDefault(options.cornerRadius, options.borderRadius)), 0, Math.min(width, height) / 2)
  });
  ctx.closePath();
  ctx.fill();
  if (stroke) {
    ctx.shadowColor = options.borderShadowColor;
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Draw a label with the size and the styling options.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {{x: number, y: number, width: number, height: number}} rect - rect to map teh label
 * @param {Object} options - options to style the label
 * @returns {undefined}
 */
function drawLabel(ctx, rect, options) {
  const content = options.content;
  if (isImageOrCanvas(content)) {
    ctx.drawImage(content, rect.x, rect.y, rect.width, rect.height);
    return;
  }
  const labels = isArray(content) ? content : [content];
  const font = toFont(options.font);
  const lh = font.lineHeight;
  const x = calculateTextAlignment(rect, options);
  const y = rect.y + (lh / 2) + options.textStrokeWidth / 2;
  ctx.save();
  ctx.font = font.string;
  ctx.textBaseline = 'middle';
  ctx.textAlign = options.textAlign;
  if (setTextStrokeStyle(ctx, options)) {
    labels.forEach((l, i) => ctx.strokeText(l, x, y + (i * lh)));
  }
  ctx.fillStyle = options.color;
  labels.forEach((l, i) => ctx.fillText(l, x, y + (i * lh)));
  ctx.restore();
}

function setTextStrokeStyle(ctx, options) {
  if (options.textStrokeWidth > 0) {
    // https://stackoverflow.com/questions/13627111/drawing-text-with-an-outer-stroke-with-html5s-canvas
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.lineWidth = options.textStrokeWidth;
    ctx.strokeStyle = options.textStrokeColor;
    return true;
  }
}

/**
 * @typedef {import('chart.js').Point} Point
 */

/**
 * @param {{x: number, y: number, width: number, height: number}} rect
 * @returns {Point}
 */
function getRectCenterPoint(rect) {
  const {x, y, width, height} = rect;
  return {
    x: x + width / 2,
    y: y + height / 2
  };
}

/**
 * Rotate a `point` relative to `center` point by `angle`
 * @param {Point} point - the point to rotate
 * @param {Point} center - center point for rotation
 * @param {number} angle - angle for rotation, in radians
 * @returns {Point} rotated point
 */
function rotated(point, center, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const cx = center.x;
  const cy = center.y;

  return {
    x: cx + cos * (point.x - cx) - sin * (point.y - cy),
    y: cy + sin * (point.x - cx) + cos * (point.y - cy)
  };
}

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import("chart.js").Scale } Scale
 * @typedef { import("chart.js").Point } Point
 * @typedef { import('../../types/options').CoreAnnotationOptions } CoreAnnotationOptions
 * @typedef { import('../../types/options').PointAnnotationOptions } PointAnnotationOptions
 */

/**
 * @param {Scale} scale
 * @param {number|string} value
 * @param {number} fallback
 * @returns {number}
 */
function scaleValue(scale, value, fallback) {
  value = typeof value === 'number' ? value : scale.parse(value);
  return isFinite(value) ? scale.getPixelForValue(value) : fallback;
}

/**
 * @param {Scale} scale
 * @param {{start: number, end: number}} options
 * @returns {{start: number, end: number}}
 */
function getChartDimensionByScale(scale, options) {
  if (scale) {
    const min = scaleValue(scale, options.min, options.start);
    const max = scaleValue(scale, options.max, options.end);
    return {
      start: Math.min(min, max),
      end: Math.max(min, max)
    };
  }
  return {
    start: options.start,
    end: options.end
  };
}

/**
 * @param {Chart} chart
 * @param {CoreAnnotationOptions} options
 * @returns {Point}
 */
function getChartPoint(chart, options) {
  const {chartArea, scales} = chart;
  const xScale = scales[options.xScaleID];
  const yScale = scales[options.yScaleID];
  let x = chartArea.width / 2;
  let y = chartArea.height / 2;

  if (xScale) {
    x = scaleValue(xScale, options.xValue, x);
  }

  if (yScale) {
    y = scaleValue(yScale, options.yValue, y);
  }
  return {x, y};
}

/**
 * @param {Chart} chart
 * @param {CoreAnnotationOptions} options
 * @returns {{x?:number, y?: number, x2?: number, y2?: number, width?: number, height?: number}}
 */
function getChartRect(chart, options) {
  const xScale = chart.scales[options.xScaleID];
  const yScale = chart.scales[options.yScaleID];
  let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;

  if (!xScale && !yScale) {
    return {};
  }

  const xDim = getChartDimensionByScale(xScale, {min: options.xMin, max: options.xMax, start: x, end: x2});
  x = xDim.start;
  x2 = xDim.end;
  const yDim = getChartDimensionByScale(yScale, {min: options.yMin, max: options.yMax, start: y, end: y2});
  y = yDim.start;
  y2 = yDim.end;

  return {
    x,
    y,
    x2,
    y2,
    width: x2 - x,
    height: y2 - y
  };
}

/**
 * @param {Chart} chart
 * @param {PointAnnotationOptions} options
 */
function getChartCircle(chart, options) {
  const point = getChartPoint(chart, options);
  return {
    x: point.x + options.xAdjust,
    y: point.y + options.yAdjust,
    width: options.radius * 2,
    height: options.radius * 2
  };
}

/**
 * @param {Chart} chart
 * @param {PointAnnotationOptions} options
 * @returns
 */
function resolvePointPosition(chart, options) {
  if (!isBoundToPoint(options)) {
    const box = getChartRect(chart, options);
    const point = getRectCenterPoint(box);
    let radius = options.radius;
    if (!radius || isNaN(radius)) {
      radius = Math.min(box.width, box.height) / 2;
      options.radius = radius;
    }
    return {
      x: point.x + options.xAdjust,
      y: point.y + options.yAdjust,
      width: radius * 2,
      height: radius * 2
    };
  }
  return getChartCircle(chart, options);
}

class BoxAnnotation extends Element {
  inRange(mouseX, mouseY, useFinalPosition) {
    const {x, y} = rotated({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), toRadians(-this.options.rotation));
    return inBoxRange(x, y, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition), this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    ctx.save();
    translate(ctx, this, this.options.rotation);
    drawBox(ctx, this, this.options);
    ctx.restore();
  }

  drawLabel(ctx) {
    const {x, y, width, height, options} = this;
    const {label, borderWidth} = options;
    const halfBorder = borderWidth / 2;
    const position = toPosition(label.position);
    const padding = toPadding(label.padding);
    const labelSize = measureLabelSize(ctx, label);
    const labelRect = {
      x: calculateX(this, labelSize, position, padding),
      y: calculateY(this, labelSize, position, padding),
      width: labelSize.width,
      height: labelSize.height
    };

    ctx.save();
    translate(ctx, this, label.rotation);
    ctx.beginPath();
    ctx.rect(x + halfBorder + padding.left, y + halfBorder + padding.top,
      width - borderWidth - padding.width, height - borderWidth - padding.height);
    ctx.clip();
    drawLabel(ctx, labelRect, label);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return getChartRect(chart, options);
  }
}

BoxAnnotation.id = 'boxAnnotation';

BoxAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  borderShadowColor: 'transparent',
  borderWidth: 1,
  cornerRadius: undefined, // TODO: v2 remove support for cornerRadius
  display: true,
  label: {
    borderWidth: undefined,
    color: 'black',
    content: null,
    drawTime: undefined,
    enabled: false,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: undefined,
      weight: 'bold'
    },
    height: undefined,
    padding: 6,
    position: 'center',
    rotation: undefined,
    textAlign: 'start',
    textStrokeColor: undefined,
    textStrokeWidth: 0,
    xAdjust: 0,
    yAdjust: 0,
    width: undefined
  },
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y'
};

BoxAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

BoxAnnotation.descriptors = {
  label: {
    _fallback: true
  }
};

function calculateX(box, labelSize, position, padding) {
  const {x: start, x2: end, width: size, options} = box;
  const {xAdjust: adjust, borderWidth} = options.label;
  return calculatePosition$1({start, end, size}, {
    position: position.x,
    padding: {start: padding.left, end: padding.right},
    adjust, borderWidth,
    size: labelSize.width
  });
}

function calculateY(box, labelSize, position, padding) {
  const {y: start, y2: end, height: size, options} = box;
  const {yAdjust: adjust, borderWidth} = options.label;
  return calculatePosition$1({start, end, size}, {
    position: position.y,
    padding: {start: padding.top, end: padding.bottom},
    adjust, borderWidth,
    size: labelSize.height
  });
}

function calculatePosition$1(boxOpts, labelOpts) {
  const {start, end} = boxOpts;
  const {position, padding: {start: padStart, end: padEnd}, adjust, borderWidth} = labelOpts;
  const availableSize = end - borderWidth - start - padStart - padEnd - labelOpts.size;
  return start + borderWidth / 2 + adjust + padStart + getRelativePosition(availableSize, position);
}

const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;
const sqr = v => v * v;
const defaultEpsilon = 0.001;

function isLineInArea({x, y, x2, y2}, {top, right, bottom, left}) {
  return !(
    (x < left && x2 < left) ||
    (x > right && x2 > right) ||
    (y < top && y2 < top) ||
    (y > bottom && y2 > bottom)
  );
}

function limitPointToArea({x, y}, p2, {top, right, bottom, left}) {
  if (x < left) {
    y = interpolateY(left, {x, y}, p2);
    x = left;
  }
  if (x > right) {
    y = interpolateY(right, {x, y}, p2);
    x = right;
  }
  if (y < top) {
    x = interpolateX(top, {x, y}, p2);
    y = top;
  }
  if (y > bottom) {
    x = interpolateX(bottom, {x, y}, p2);
    y = bottom;
  }
  return {x, y};
}

function limitLineToArea(p1, p2, area) {
  const {x, y} = limitPointToArea(p1, p2, area);
  const {x: x2, y: y2} = limitPointToArea(p2, p1, area);
  return {x, y, x2, y2, width: Math.abs(x2 - x), height: Math.abs(y2 - y)};
}

class LineAnnotation extends Element {

  // TODO: make private in v2
  intersects(x, y, epsilon = defaultEpsilon, useFinalPosition) {
    // Adapted from https://stackoverflow.com/a/6853926/25507
    const {x: x1, y: y1, x2, y2} = this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition);
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = sqr(dx) + sqr(dy);
    const t = lenSq === 0 ? -1 : ((x - x1) * dx + (y - y1) * dy) / lenSq;
    let xx, yy;
    if (t < 0) {
      xx = x1;
      yy = y1;
    } else if (t > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + t * dx;
      yy = y1 + t * dy;
    }
    return (sqr(x - xx) + sqr(y - yy)) <= epsilon;
  }

  /**
   * @todo make private in v2
   * @param {boolean} useFinalPosition - use the element's animation target instead of current position
   * @param {top, right, bottom, left} [chartArea] - optional, area of the chart
   * @returns {boolean} true if the label is visible
   */
  labelIsVisible(useFinalPosition, chartArea) {
    const labelOpts = this.options.label;
    if (!labelOpts || !labelOpts.enabled) {
      return false;
    }
    return !chartArea || isLineInArea(this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition), chartArea);
  }

  // TODO: make private in v2
  isOnLabel(mouseX, mouseY, useFinalPosition) {
    if (!this.labelIsVisible(useFinalPosition)) {
      return false;
    }
    const {labelX, labelY, labelWidth, labelHeight, labelRotation} = this.getProps(['labelX', 'labelY', 'labelWidth', 'labelHeight', 'labelRotation'], useFinalPosition);
    const {x, y} = rotated({x: mouseX, y: mouseY}, {x: labelX, y: labelY}, -labelRotation);
    const hBorderWidth = this.options.label.borderWidth / 2 || 0;
    const w2 = labelWidth / 2 + hBorderWidth;
    const h2 = labelHeight / 2 + hBorderWidth;
    return x >= labelX - w2 - defaultEpsilon && x <= labelX + w2 + defaultEpsilon &&
      y >= labelY - h2 - defaultEpsilon && y <= labelY + h2 + defaultEpsilon;
  }

  inRange(mouseX, mouseY, useFinalPosition) {
    const epsilon = sqr(this.options.borderWidth / 2);
    return this.intersects(mouseX, mouseY, epsilon, useFinalPosition) || this.isOnLabel(mouseX, mouseY, useFinalPosition);
  }

  getCenterPoint() {
    return {
      x: (this.x2 + this.x) / 2,
      y: (this.y2 + this.y) / 2
    };
  }

  draw(ctx) {
    const {x, y, x2, y2, options} = this;

    ctx.save();
    if (!setBorderStyle(ctx, options)) {
      // no border width, then line is not drawn
      return ctx.restore();
    }
    setShadowStyle(ctx, options);
    const angle = Math.atan2(y2 - y, x2 - x);
    const length = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
    const {startOpts, endOpts, startAdjust, endAdjust} = getArrowHeads(this);

    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0 + startAdjust, 0);
    ctx.lineTo(length - endAdjust, 0);
    ctx.shadowColor = options.borderShadowColor;
    ctx.stroke();
    drawArrowHead(ctx, 0, startAdjust, startOpts);
    drawArrowHead(ctx, length, -endAdjust, endOpts);
    ctx.restore();
  }

  drawLabel(ctx, chartArea) {
    if (!this.labelIsVisible(false, chartArea)) {
      return;
    }
    const {labelX, labelY, labelWidth, labelHeight, labelRotation, labelPadding, labelTextSize, options: {label}} = this;

    ctx.save();
    ctx.translate(labelX, labelY);
    ctx.rotate(labelRotation);

    const boxRect = {
      x: -(labelWidth / 2),
      y: -(labelHeight / 2),
      width: labelWidth,
      height: labelHeight
    };
    drawBox(ctx, boxRect, label);

    const labelTextRect = {
      x: -(labelWidth / 2) + labelPadding.left + label.borderWidth / 2,
      y: -(labelHeight / 2) + labelPadding.top + label.borderWidth / 2,
      width: labelTextSize.width,
      height: labelTextSize.height
    };
    drawLabel(ctx, labelTextRect, label);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const scale = chart.scales[options.scaleID];
    let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;
    let min, max;

    if (scale) {
      min = scaleValue(scale, options.value, NaN);
      max = scaleValue(scale, options.endValue, min);
      if (scale.isHorizontal()) {
        x = min;
        x2 = max;
      } else {
        y = min;
        y2 = max;
      }
    } else {
      const xScale = chart.scales[options.xScaleID];
      const yScale = chart.scales[options.yScaleID];

      if (xScale) {
        x = scaleValue(xScale, options.xMin, x);
        x2 = scaleValue(xScale, options.xMax, x2);
      }

      if (yScale) {
        y = scaleValue(yScale, options.yMin, y);
        y2 = scaleValue(yScale, options.yMax, y2);
      }
    }
    const inside = isLineInArea({x, y, x2, y2}, chart.chartArea);
    const properties = inside
      ? limitLineToArea({x, y}, {x: x2, y: y2}, chart.chartArea)
      : {x, y, x2, y2, width: Math.abs(x2 - x), height: Math.abs(y2 - y)};

    const label = options.label;
    if (label && label.content) {
      return loadLabelRect(properties, chart, label);
    }
    return properties;
  }
}

LineAnnotation.id = 'lineAnnotation';

const arrowHeadsDefaults = {
  backgroundColor: undefined,
  backgroundShadowColor: undefined,
  borderColor: undefined,
  borderDash: undefined,
  borderDashOffset: undefined,
  borderShadowColor: undefined,
  borderWidth: undefined,
  enabled: undefined,
  fill: undefined,
  length: undefined,
  shadowBlur: undefined,
  shadowOffsetX: undefined,
  shadowOffsetY: undefined,
  width: undefined
};

LineAnnotation.defaults = {
  adjustScaleRange: true,
  arrowHeads: {
    enabled: false,
    end: Object.assign({}, arrowHeadsDefaults),
    fill: false,
    length: 12,
    start: Object.assign({}, arrowHeadsDefaults),
    width: 6
  },
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: 'transparent',
  borderWidth: 2,
  display: true,
  endValue: undefined,
  label: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    backgroundShadowColor: 'transparent',
    borderCapStyle: 'butt',
    borderColor: 'black',
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderRadius: 6,
    borderShadowColor: 'transparent',
    borderWidth: 0,
    color: '#fff',
    content: null,
    cornerRadius: undefined, // TODO: v2 remove support for cornerRadius
    drawTime: undefined,
    enabled: false,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: undefined,
      weight: 'bold'
    },
    height: undefined,
    padding: 6,
    position: 'center',
    rotation: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textAlign: 'center',
    textStrokeColor: undefined,
    textStrokeWidth: 0,
    width: undefined,
    xAdjust: 0,
    xPadding: undefined, // TODO: v2 remove support for xPadding
    yAdjust: 0,
    yPadding: undefined, // TODO: v2 remove support for yPadding
  },
  scaleID: undefined,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  value: undefined,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y'
};

LineAnnotation.descriptors = {
  arrowHeads: {
    start: {
      _fallback: true
    },
    end: {
      _fallback: true
    },
    _fallback: true
  }
};

LineAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function loadLabelRect(line, chart, options) {
  // TODO: v2 remove support for xPadding and yPadding
  const {padding: lblPadding, xPadding, yPadding, borderWidth} = options;
  const padding = getPadding(lblPadding, xPadding, yPadding);
  const textSize = measureLabelSize(chart.ctx, options);
  const width = textSize.width + padding.width + borderWidth;
  const height = textSize.height + padding.height + borderWidth;
  const labelRect = calculateLabelPosition(line, options, {width, height, padding}, chart.chartArea);
  line.labelX = labelRect.x;
  line.labelY = labelRect.y;
  line.labelWidth = labelRect.width;
  line.labelHeight = labelRect.height;
  line.labelRotation = labelRect.rotation;
  line.labelPadding = padding;
  line.labelTextSize = textSize;
  return line;
}

function calculateAutoRotation(line) {
  const {x, y, x2, y2} = line;
  const rotation = Math.atan2(y2 - y, x2 - x);
  // Flip the rotation if it goes > PI/2 or < -PI/2, so label stays upright
  return rotation > PI / 2 ? rotation - PI : rotation < PI / -2 ? rotation + PI : rotation;
}

// TODO: v2 remove support for xPadding and yPadding
function getPadding(padding, xPadding, yPadding) {
  let tempPadding = padding;
  if (xPadding || yPadding) {
    tempPadding = {x: xPadding || 6, y: yPadding || 6};
  }
  return toPadding(tempPadding);
}

function calculateLabelPosition(line, label, sizes, chartArea) {
  const {width, height, padding} = sizes;
  const {xAdjust, yAdjust} = label;
  const p1 = {x: line.x, y: line.y};
  const p2 = {x: line.x2, y: line.y2};
  const rotation = label.rotation === 'auto' ? calculateAutoRotation(line) : toRadians(label.rotation);
  const size = rotatedSize(width, height, rotation);
  const t = calculateT(line, label, {labelSize: size, padding}, chartArea);
  const pt = pointInLine(p1, p2, t);
  const xCoordinateSizes = {size: size.w, min: chartArea.left, max: chartArea.right, padding: padding.left};
  const yCoordinateSizes = {size: size.h, min: chartArea.top, max: chartArea.bottom, padding: padding.top};

  return {
    x: adjustLabelCoordinate(pt.x, xCoordinateSizes) + xAdjust,
    y: adjustLabelCoordinate(pt.y, yCoordinateSizes) + yAdjust,
    width,
    height,
    rotation
  };
}

function rotatedSize(width, height, rotation) {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  return {
    w: Math.abs(width * cos) + Math.abs(height * sin),
    h: Math.abs(width * sin) + Math.abs(height * cos)
  };
}

function calculateT(line, label, sizes, chartArea) {
  let t;
  const space = spaceAround(line, chartArea);
  if (label.position === 'start') {
    t = calculateTAdjust({w: line.x2 - line.x, h: line.y2 - line.y}, sizes, label, space);
  } else if (label.position === 'end') {
    t = 1 - calculateTAdjust({w: line.x - line.x2, h: line.y - line.y2}, sizes, label, space);
  } else {
    t = getRelativePosition(1, label.position);
  }
  return t;
}

function calculateTAdjust(lineSize, sizes, label, space) {
  const {labelSize, padding} = sizes;
  const lineW = lineSize.w * space.dx;
  const lineH = lineSize.h * space.dy;
  const x = (lineW > 0) && ((labelSize.w / 2 + padding.left - space.x) / lineW);
  const y = (lineH > 0) && ((labelSize.h / 2 + padding.top - space.y) / lineH);
  return clamp(Math.max(x, y), 0, 0.25);
}

function spaceAround(line, chartArea) {
  const {x, x2, y, y2} = line;
  const t = Math.min(y, y2) - chartArea.top;
  const l = Math.min(x, x2) - chartArea.left;
  const b = chartArea.bottom - Math.max(y, y2);
  const r = chartArea.right - Math.max(x, x2);
  return {
    x: Math.min(l, r),
    y: Math.min(t, b),
    dx: l <= r ? 1 : -1,
    dy: t <= b ? 1 : -1
  };
}

function adjustLabelCoordinate(coordinate, labelSizes) {
  const {size, min, max, padding} = labelSizes;
  const halfSize = size / 2;
  if (size > max - min) {
    // if it does not fit, display as much as possible
    return (max + min) / 2;
  }
  if (min >= (coordinate - padding - halfSize)) {
    coordinate = min + padding + halfSize;
  }
  if (max <= (coordinate + padding + halfSize)) {
    coordinate = max - padding - halfSize;
  }
  return coordinate;
}

function getArrowHeads(line) {
  const options = line.options;
  const arrowStartOpts = options.arrowHeads && options.arrowHeads.start;
  const arrowEndOpts = options.arrowHeads && options.arrowHeads.end;
  return {
    startOpts: arrowStartOpts,
    endOpts: arrowEndOpts,
    startAdjust: getLineAdjust(line, arrowStartOpts),
    endAdjust: getLineAdjust(line, arrowEndOpts)
  };
}

function getLineAdjust(line, arrowOpts) {
  if (!arrowOpts || !arrowOpts.enabled) {
    return 0;
  }
  const {length, width} = arrowOpts;
  const adjust = line.options.borderWidth / 2;
  const p1 = {x: length, y: width + adjust};
  const p2 = {x: 0, y: adjust};
  return Math.abs(interpolateX(0, p1, p2));
}

function drawArrowHead(ctx, offset, adjust, arrowOpts) {
  if (!arrowOpts || !arrowOpts.enabled) {
    return;
  }
  const {length, width, fill, backgroundColor, borderColor} = arrowOpts;
  const arrowOffsetX = Math.abs(offset - length) + adjust;
  ctx.beginPath();
  setShadowStyle(ctx, arrowOpts);
  setBorderStyle(ctx, arrowOpts);
  ctx.moveTo(arrowOffsetX, -width);
  ctx.lineTo(offset + adjust, 0);
  ctx.lineTo(arrowOffsetX, width);
  if (fill === true) {
    ctx.fillStyle = backgroundColor || borderColor;
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';
  } else {
    ctx.shadowColor = arrowOpts.borderShadowColor;
  }
  ctx.stroke();
}

class EllipseAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    return pointInEllipse({x: mouseX, y: mouseY}, this.getProps(['width', 'height'], useFinalPosition), this.options.rotation, this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    const {width, height, options} = this;
    const center = this.getCenterPoint();

    ctx.save();
    translate(ctx, this, options.rotation);
    setShadowStyle(ctx, this.options);
    ctx.beginPath();
    ctx.fillStyle = options.backgroundColor;
    const stroke = setBorderStyle(ctx, options);
    ctx.ellipse(center.x, center.y, height / 2, width / 2, PI / 2, 0, 2 * PI);
    ctx.fill();
    if (stroke) {
      ctx.shadowColor = options.borderShadowColor;
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return getChartRect(chart, options);
  }

}

EllipseAnnotation.id = 'ellipseAnnotation';

EllipseAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: 'transparent',
  borderWidth: 1,
  display: true,
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y'
};

EllipseAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function pointInEllipse(p, ellipse, rotation, borderWidth) {
  const {width, height} = ellipse;
  const center = ellipse.getCenterPoint(true);
  const xRadius = width / 2;
  const yRadius = height / 2;

  if (xRadius <= 0 || yRadius <= 0) {
    return false;
  }
  // https://stackoverflow.com/questions/7946187/point-and-ellipse-rotated-position-test-algorithm
  const angle = toRadians(rotation || 0);
  const hBorderWidth = borderWidth / 2 || 0;
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const a = Math.pow(cosAngle * (p.x - center.x) + sinAngle * (p.y - center.y), 2);
  const b = Math.pow(sinAngle * (p.x - center.x) - cosAngle * (p.y - center.y), 2);
  return (a / Math.pow(xRadius + hBorderWidth, 2)) + (b / Math.pow(yRadius + hBorderWidth, 2)) <= 1.0001;
}

class LabelAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    const {x, y} = rotated({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), toRadians(-this.options.rotation));
    return inBoxRange(x, y, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition), this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    if (!this.options.content) {
      return;
    }
    const {labelX, labelY, labelWidth, labelHeight, options} = this;
    ctx.save();
    translate(ctx, this, options.rotation);
    drawCallout(ctx, this);
    drawBox(ctx, this, options);
    drawLabel(ctx, {x: labelX, y: labelY, width: labelWidth, height: labelHeight}, options);
    ctx.restore();
  }

  // TODO: make private in v2
  resolveElementProperties(chart, options) {
    const point = !isBoundToPoint(options) ? getRectCenterPoint(getChartRect(chart, options)) : getChartPoint(chart, options);
    const padding = toPadding(options.padding);
    const labelSize = measureLabelSize(chart.ctx, options);
    const boxSize = measureRect(point, labelSize, options, padding);
    const hBorderWidth = options.borderWidth / 2;
    const properties = {
      pointX: point.x,
      pointY: point.y,
      ...boxSize,
      labelX: boxSize.x + padding.left + hBorderWidth,
      labelY: boxSize.y + padding.top + hBorderWidth,
      labelWidth: labelSize.width,
      labelHeight: labelSize.height
    };
    properties.calloutPosition = options.callout.enabled && resolveCalloutPosition(properties, options.callout, options.rotation);
    return properties;
  }
}

LabelAnnotation.id = 'labelAnnotation';

LabelAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundColor: 'transparent',
  backgroundShadowColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  borderShadowColor: 'transparent',
  borderWidth: 0,
  callout: {
    borderCapStyle: 'butt',
    borderColor: undefined,
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderWidth: 1,
    enabled: false,
    margin: 5,
    position: 'auto',
    side: 5,
    start: '50%',
  },
  color: 'black',
  content: null,
  display: true,
  font: {
    family: undefined,
    lineHeight: undefined,
    size: undefined,
    style: undefined,
    weight: undefined
  },
  height: undefined,
  padding: 6,
  position: 'center',
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  textAlign: 'center',
  textStrokeColor: undefined,
  textStrokeWidth: 0,
  width: undefined,
  xAdjust: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};

LabelAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function measureRect(point, size, options, padding) {
  const width = size.width + padding.width + options.borderWidth;
  const height = size.height + padding.height + options.borderWidth;
  const position = toPosition(options.position);

  return {
    x: calculatePosition(point.x, width, options.xAdjust, position.x),
    y: calculatePosition(point.y, height, options.yAdjust, position.y),
    width,
    height
  };
}

function calculatePosition(start, size, adjust = 0, position) {
  return start - getRelativePosition(size, position) + adjust;
}

function drawCallout(ctx, element) {
  const {pointX, pointY, calloutPosition, options} = element;
  if (!calloutPosition || element.inRange(pointX, pointY)) {
    return;
  }
  const callout = options.callout;

  ctx.save();
  ctx.beginPath();
  const stroke = setBorderStyle(ctx, callout);
  if (!stroke) {
    return ctx.restore();
  }
  const {separatorStart, separatorEnd} = getCalloutSeparatorCoord(element, calloutPosition);
  const {sideStart, sideEnd} = getCalloutSideCoord(element, calloutPosition, separatorStart);
  if (callout.margin > 0 || options.borderWidth === 0) {
    ctx.moveTo(separatorStart.x, separatorStart.y);
    ctx.lineTo(separatorEnd.x, separatorEnd.y);
  }
  ctx.moveTo(sideStart.x, sideStart.y);
  ctx.lineTo(sideEnd.x, sideEnd.y);
  const rotatedPoint = rotated({x: pointX, y: pointY}, element.getCenterPoint(), toRadians(-options.rotation));
  ctx.lineTo(rotatedPoint.x, rotatedPoint.y);
  ctx.stroke();
  ctx.restore();
}

function getCalloutSeparatorCoord(element, position) {
  const {x, y, width, height} = element;
  const adjust = getCalloutSeparatorAdjust(element, position);
  let separatorStart, separatorEnd;
  if (position === 'left' || position === 'right') {
    separatorStart = {x: x + adjust, y};
    separatorEnd = {x: separatorStart.x, y: separatorStart.y + height};
  } else {
    //  position 'top' or 'bottom'
    separatorStart = {x, y: y + adjust};
    separatorEnd = {x: separatorStart.x + width, y: separatorStart.y};
  }
  return {separatorStart, separatorEnd};
}

function getCalloutSeparatorAdjust(element, position) {
  const {width, height, options} = element;
  const adjust = options.callout.margin + options.borderWidth / 2;
  if (position === 'right') {
    return width + adjust;
  } else if (position === 'bottom') {
    return height + adjust;
  }
  return -adjust;
}

function getCalloutSideCoord(element, position, separatorStart) {
  const {y, width, height, options} = element;
  const start = options.callout.start;
  const side = getCalloutSideAdjust(position, options.callout);
  let sideStart, sideEnd;
  if (position === 'left' || position === 'right') {
    sideStart = {x: separatorStart.x, y: y + getSize(height, start)};
    sideEnd = {x: sideStart.x + side, y: sideStart.y};
  } else {
    //  position 'top' or 'bottom'
    sideStart = {x: separatorStart.x + getSize(width, start), y: separatorStart.y};
    sideEnd = {x: sideStart.x, y: sideStart.y + side};
  }
  return {sideStart, sideEnd};
}

function getCalloutSideAdjust(position, options) {
  const side = options.side;
  if (position === 'left' || position === 'top') {
    return -side;
  }
  return side;
}

function resolveCalloutPosition(properties, options, rotation) {
  const position = options.position;
  if (position === 'left' || position === 'right' || position === 'top' || position === 'bottom') {
    return position;
  }
  return resolveCalloutAutoPosition(properties, options, rotation);
}

const positions = ['left', 'bottom', 'top', 'right'];

function resolveCalloutAutoPosition(properties, options, rotation) {
  const {x, y, width, height, pointX, pointY} = properties;
  const center = {x: x + width / 2, y: y + height / 2};
  const start = options.start;
  const xAdjust = getSize(width, start);
  const yAdjust = getSize(height, start);
  const xPoints = [x, x + xAdjust, x + xAdjust, x + width];
  const yPoints = [y + yAdjust, y + height, y, y + yAdjust];
  const result = [];
  for (let index = 0; index < 4; index++) {
    const rotatedPoint = rotated({x: xPoints[index], y: yPoints[index]}, center, toRadians(rotation));
    result.push({
      position: positions[index],
      distance: distanceBetweenPoints(rotatedPoint, {x: pointX, y: pointY})
    });
  }
  return result.sort((a, b) => a.distance - b.distance)[0].position;
}

class PointAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    const {width} = this.getProps(['width'], useFinalPosition);
    return inPointRange({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), width / 2, this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const options = this.options;
    const borderWidth = options.borderWidth;
    if (options.radius < 0.1) {
      return;
    }
    ctx.save();
    ctx.fillStyle = options.backgroundColor;
    setShadowStyle(ctx, options);
    const stroke = setBorderStyle(ctx, options);
    options.borderWidth = 0;
    drawPoint(ctx, options, this.x, this.y);
    if (stroke && !isImageOrCanvas(options.pointStyle)) {
      ctx.shadowColor = options.borderShadowColor;
      ctx.stroke();
    }
    ctx.restore();
    options.borderWidth = borderWidth;
  }

  resolveElementProperties(chart, options) {
    return resolvePointPosition(chart, options);
  }
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: 'transparent',
  borderWidth: 1,
  display: true,
  pointStyle: 'circle',
  radius: 10,
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  xAdjust: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

class PolygonAnnotation extends Element {
  inRange(mouseX, mouseY, useFinalPosition) {
    return this.options.radius >= 0.1 && this.elements.length > 1 && pointIsInPolygon(this.elements, mouseX, mouseY, useFinalPosition);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {elements, options} = this;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = options.backgroundColor;
    setShadowStyle(ctx, options);
    const stroke = setBorderStyle(ctx, options);
    let first = true;
    for (const el of elements) {
      if (first) {
        ctx.moveTo(el.x, el.y);
        first = false;
      } else {
        ctx.lineTo(el.x, el.y);
      }
    }
    ctx.closePath();
    ctx.fill();
    // If no border, don't draw it
    if (stroke) {
      ctx.shadowColor = options.borderShadowColor;
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const {x, y, width, height} = resolvePointPosition(chart, options);
    const {sides, radius, rotation, borderWidth} = options;
    const halfBorder = borderWidth / 2;
    const elements = [];
    const angle = (2 * PI) / sides;
    let rad = rotation * RAD_PER_DEG;
    for (let i = 0; i < sides; i++, rad += angle) {
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);
      elements.push({
        type: 'point',
        optionScope: 'point',
        properties: {
          x: x + sin * radius,
          y: y - cos * radius,
          bX: x + sin * (radius + halfBorder),
          bY: y - cos * (radius + halfBorder)
        }
      });
    }
    return {x, y, width, height, elements, initProperties: {x, y}};
  }
}

PolygonAnnotation.id = 'polygonAnnotation';

PolygonAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderShadowColor: 'transparent',
  borderWidth: 1,
  display: true,
  point: {
    radius: 0
  },
  radius: 10,
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  sides: 3,
  xAdjust: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PolygonAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};


function pointIsInPolygon(points, x, y, useFinalPosition) {
  let isInside = false;
  let A = points[points.length - 1].getProps(['bX', 'bY'], useFinalPosition);
  for (const point of points) {
    const B = point.getProps(['bX', 'bY'], useFinalPosition);
    if ((B.bY > y) !== (A.bY > y) && x < (A.bX - B.bX) * (y - B.bY) / (A.bY - B.bY) + B.bX) {
      isInside = !isInside;
    }
    A = B;
  }
  return isInside;
}

const annotationTypes = {
  box: BoxAnnotation,
  ellipse: EllipseAnnotation,
  label: LabelAnnotation,
  line: LineAnnotation,
  point: PointAnnotation,
  polygon: PolygonAnnotation
};

/**
 * Register fallback for annotation elements
 * For example lineAnnotation options would be looked through:
 * - the annotation object (options.plugins.annotation.annotations[id])
 * - element options (options.elements.lineAnnotation)
 * - element defaults (defaults.elements.lineAnnotation)
 * - annotation plugin defaults (defaults.plugins.annotation, this is what we are registering here)
 */
Object.keys(annotationTypes).forEach(key => {
  defaults.describe(`elements.${annotationTypes[key].id}`, {
    _fallback: 'plugins.annotation'
  });
});

const directUpdater = {
  update: Object.assign
};

/**
 * Resolve the annotation type, checking if is supported.
 * @param {string} [type=line] - annotation type
 * @returns {string} resolved annotation type
 */
function resolveType(type = 'line') {
  if (annotationTypes[type]) {
    return type;
  }
  console.warn(`Unknown annotation type: '${type}', defaulting to 'line'`);
  return 'line';
}

/**
 * Create or update all annotation elements, configured to the plugin.
 * @param {Chart} chart - the chart where the plugin is enabled
 * @param {Object} state - the state of the plugin
 * @param {Object} options - annotation options to use
 * @param {UpdateMode} mode - The update mode
 */
function updateElements(chart, state, options, mode) {
  const animations = resolveAnimations(chart, options.animations, mode);

  const annotations = state.annotations;
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotationOptions = annotations[i];
    const element = getOrCreateElement(elements, i, annotationOptions.type);
    const resolver = annotationOptions.setContext(getContext(chart, element, annotationOptions));
    const properties = element.resolveElementProperties(chart, resolver);

    properties.skip = toSkip(properties);

    if ('elements' in properties) {
      updateSubElements(element, properties, resolver, animations);
      // Remove the sub-element definitions from properties, so the actual elements
      // are not overwritten by their definitions
      delete properties.elements;
    }

    if (!defined(element.x)) {
      // If the element is newly created, assing the properties directly - to
      // make them readily awailable to any scriptable options. If we do not do this,
      // the properties retruned by `resolveElementProperties` are available only
      // after options resolution.
      Object.assign(element, properties);
    }

    properties.options = resolveAnnotationOptions(resolver);

    animations.update(element, properties);
  }
}

function toSkip(properties) {
  return isNaN(properties.x) || isNaN(properties.y);
}

function resolveAnimations(chart, animOpts, mode) {
  if (mode === 'reset' || mode === 'none' || mode === 'resize') {
    return directUpdater;
  }
  return new Animations(chart, animOpts);
}

function updateSubElements(mainElement, {elements, initProperties}, resolver, animations) {
  const subElements = mainElement.elements || (mainElement.elements = []);
  subElements.length = elements.length;
  for (let i = 0; i < elements.length; i++) {
    const definition = elements[i];
    const properties = definition.properties;
    const subElement = getOrCreateElement(subElements, i, definition.type, initProperties);
    const subResolver = resolver[definition.optionScope].override(definition);
    properties.options = resolveAnnotationOptions(subResolver);
    animations.update(subElement, properties);
  }
}

function getOrCreateElement(elements, index, type, initProperties) {
  const elementClass = annotationTypes[resolveType(type)];
  let element = elements[index];
  if (!element || !(element instanceof elementClass)) {
    element = elements[index] = new elementClass();
    if (isObject(initProperties)) {
      Object.assign(element, initProperties);
    }
  }
  return element;
}

function resolveAnnotationOptions(resolver) {
  const elementClass = annotationTypes[resolveType(resolver.type)];
  const result = {};
  result.id = resolver.id;
  result.type = resolver.type;
  result.drawTime = resolver.drawTime;
  Object.assign(result,
    resolveObj(resolver, elementClass.defaults),
    resolveObj(resolver, elementClass.defaultRoutes));
  for (const hook of hooks) {
    result[hook] = resolver[hook];
  }
  return result;
}

function resolveObj(resolver, defs) {
  const result = {};
  for (const prop of Object.keys(defs)) {
    const optDefs = defs[prop];
    const value = resolver[prop];
    result[prop] = isObject(optDefs) ? resolveObj(value, optDefs) : value;
  }
  return result;
}

function getContext(chart, element, annotation) {
  return element.$context || (element.$context = Object.assign(Object.create(chart.getContext()), {
    element,
    id: annotation.id,
    type: 'annotation'
  }));
}

function resyncElements(elements, annotations) {
  const count = annotations.length;
  const start = elements.length;

  if (start < count) {
    const add = count - start;
    elements.splice(start, 0, ...new Array(add));
  } else if (start > count) {
    elements.splice(count, start - count);
  }
  return elements;
}

var name = "chartjs-plugin-annotation";
var version = "1.4.0";

const chartStates = new Map();

var annotation = {
  id: 'annotation',

  version,

  /* TODO: enable in v2
  beforeRegister() {
    requireVersion('chart.js', '3.7', Chart.version);
  },
  */

  afterRegister() {
    Chart.register(annotationTypes);

    // TODO: Remove this check, warning and workaround in v2
    if (!requireVersion('chart.js', '3.7', Chart.version, false)) {
      console.warn(`${name} has known issues with chart.js versions prior to 3.7, please consider upgrading.`);

      // Workaround for https://github.com/chartjs/chartjs-plugin-annotation/issues/572
      Chart.defaults.set('elements.lineAnnotation', {
        callout: {},
        font: {},
        padding: 6
      });
    }
  },

  afterUnregister() {
    Chart.unregister(annotationTypes);
  },

  beforeInit(chart) {
    chartStates.set(chart, {
      annotations: [],
      elements: [],
      visibleElements: [],
      listeners: {},
      listened: false,
      moveListened: false
    });
  },

  beforeUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    const annotations = state.annotations = [];

    let annotationOptions = options.annotations;
    if (isObject(annotationOptions)) {
      Object.keys(annotationOptions).forEach(key => {
        const value = annotationOptions[key];
        if (isObject(value)) {
          value.id = key;
          annotations.push(value);
        }
      });
    } else if (isArray(annotationOptions)) {
      annotations.push(...annotationOptions);
    }
    verifyScaleOptions(annotations, chart.scales);
  },

  afterDataLimits(chart, args) {
    const state = chartStates.get(chart);
    adjustScaleRange(chart, args.scale, state.annotations.filter(a => a.display && a.adjustScaleRange));
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    updateListeners(chart, state, options);
    updateElements(chart, state, options, args.mode);
    state.visibleElements = state.elements.filter(el => !el.skip && el.options.display);
  },

  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, 'beforeDatasetsDraw', options.clip);
  },

  afterDatasetsDraw(chart, _args, options) {
    draw(chart, 'afterDatasetsDraw', options.clip);
  },

  beforeDraw(chart, _args, options) {
    draw(chart, 'beforeDraw', options.clip);
  },

  afterDraw(chart, _args, options) {
    draw(chart, 'afterDraw', options.clip);
  },

  beforeEvent(chart, args, options) {
    const state = chartStates.get(chart);
    handleEvent(state, args.event, options);
  },

  destroy(chart) {
    chartStates.delete(chart);
  },

  _getState(chart) {
    return chartStates.get(chart);
  },

  defaults: {
    animations: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height', 'pointX', 'pointY', 'labelX', 'labelY', 'labelWidth', 'labelHeight', 'radius'],
        type: 'number'
      },
    },
    clip: true,
    dblClickSpeed: 350, // ms
    drawTime: 'afterDatasetsDraw',
    label: {
      drawTime: null
    }
  },

  descriptors: {
    _indexable: false,
    _scriptable: (prop) => !hooks.includes(prop),
    annotations: {
      _allKeys: false,
      _fallback: (prop, opts) => `elements.${annotationTypes[resolveType(opts.type)].id}`,
    },
  },

  additionalOptionScopes: ['']
};

function draw(chart, caller, clip) {
  const {ctx, chartArea} = chart;
  const {visibleElements} = chartStates.get(chart);

  if (clip) {
    clipArea(ctx, chartArea);
  }

  drawElements(ctx, visibleElements, caller);
  drawSubElements(ctx, visibleElements, caller);

  if (clip) {
    unclipArea(ctx);
  }

  visibleElements.forEach(el => {
    if (!('drawLabel' in el)) {
      return;
    }
    const label = el.options.label;
    if (label && label.enabled && label.content && (label.drawTime || el.options.drawTime) === caller) {
      el.drawLabel(ctx, chartArea);
    }
  });
}

function drawElements(ctx, elements, caller) {
  for (const el of elements) {
    if (el.options.drawTime === caller) {
      el.draw(ctx);
    }
  }
}

function drawSubElements(ctx, elements, caller) {
  for (const el of elements) {
    if (isArray(el.elements)) {
      drawElements(ctx, el.elements, caller);
    }
  }
}

export { annotation as default };
