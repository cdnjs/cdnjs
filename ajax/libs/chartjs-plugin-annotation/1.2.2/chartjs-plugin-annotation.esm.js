/*!
* chartjs-plugin-annotation v1.2.2
* https://www.chartjs.org/chartjs-plugin-annotation/index
 * (c) 2021 chartjs-plugin-annotation Contributors
 * Released under the MIT License
 */
import { Element, defaults, Chart, Animations } from 'chart.js';
import { defined, distanceBetweenPoints, callback, isFinite, valueOrDefault, isObject, toFont, isArray, addRoundedRectPath, toTRBLCorners, toPadding, toRadians, color, drawPoint, isNumber, RAD_PER_DEG, PI as PI$1, clipArea, unclipArea } from 'chart.js/helpers';

const clickHooks = ['click', 'dblclick'];
const moveHooks = ['enter', 'leave'];
const hooks = clickHooks.concat(moveHooks);

function updateListeners(chart, state, options) {
  const annotations = state.annotations || [];
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
    annotations.forEach(scope => {
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
    if (annotation[key] && !scales[annotation[key]]) {
      console.warn(`No scale found with id '${annotation[key]}' for annotation '${annotation.id}'`);
    }
  }
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
    if (raw) {
      const value = scale.parse(raw);
      limits.min = Math.min(limits.min, value);
      limits.max = Math.max(limits.max, value);
    }
  }
}

const clamp = (x, from, to) => Math.min(to, Math.max(from, x));

function clampAll(obj, from, to) {
  for (const key of Object.keys(obj)) {
    obj[key] = clamp(obj[key], from, to);
  }
  return obj;
}

function inPointRange(point, center, radius) {
  if (!point || !center || radius <= 0) {
    return false;
  }
  return (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)) <= Math.pow(radius, 2);
}

function inBoxRange(mouseX, mouseY, {x, y, width, height}) {
  return mouseX >= x &&
         mouseX <= x + width &&
         mouseY >= y &&
         mouseY <= y + height;
}

function getElementCenterPoint(element, useFinalPosition) {
  const {x, y} = element.getProps(['x', 'y'], useFinalPosition);
  return {x, y};
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

function readValueToProps(value, props, defValue) {
  const ret = {};
  const objProps = isObject(props);
  const keys = objProps ? Object.keys(props) : props;
  const read = isObject(value)
    ? objProps
      ? prop => valueOrDefault(value[prop], value[props[prop]])
      : prop => value[prop]
    : () => value;

  for (const prop of keys) {
    ret[prop] = valueOrDefault(read(prop), defValue);
  }
  return ret;
}

function toPosition(value) {
  return readValueToProps(value, ['x', 'y'], 'center');
}

function isBoundToPoint(options) {
  return options && (defined(options.xValue) || defined(options.yValue));
}

const widthCache = new Map();

function isImageOrCanvas(content) {
  return content instanceof Image || content instanceof HTMLCanvasElement;
}

/**
 * Apply border options to the canvas context before drawing a box
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
  const lines = isArray(content) ? content : [content];
  const mapKey = lines.join() + font.string + (ctx._measureText ? '-spriting' : '');
  if (!widthCache.has(mapKey)) {
    ctx.save();
    ctx.font = font.string;
    const count = lines.length;
    let width = 0;
    for (let i = 0; i < count; i++) {
      const text = lines[i];
      width = Math.max(width, ctx.measureText(text).width);
    }
    ctx.restore();
    const height = count * font.lineHeight;
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
    ctx.stroke();
  }
  ctx.restore();
}

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
  const y = rect.y + (lh / 2);
  ctx.font = font.string;
  ctx.textBaseline = 'middle';
  ctx.textAlign = options.textAlign;
  ctx.fillStyle = options.color;
  labels.forEach((l, i) => ctx.fillText(l, x, y + (i * lh)));
}

function getRectCenterPoint(rect) {
  const {x, y, width, height} = rect;
  return {
    x: x + width / 2,
    y: y + height / 2
  };
}

/**
 * Rotate a `point` relative to `center` point by `angle`
 * @param {{x: number, y: number}} point - the point to rotate
 * @param {{x: number, y: number}} center - center point for rotation
 * @param {number} angle - angle for rotation, in radians
 * @returns {{x: number, y: number}} rotated point
 */
function rotated(point, center, angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var cx = center.x;
  var cy = center.y;

  return {
    x: cx + cos * (point.x - cx) - sin * (point.y - cy),
    y: cy + sin * (point.x - cx) + cos * (point.y - cy)
  };
}

function scaleValue(scale, value, fallback) {
  value = typeof value === 'number' ? value : scale.parse(value);
  return isFinite(value) ? scale.getPixelForValue(value) : fallback;
}

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

function getChartRect(chart, options) {
  const xScale = chart.scales[options.xScaleID];
  const yScale = chart.scales[options.yScaleID];
  let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;

  if (!xScale && !yScale) {
    return {options: {}};
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

function getChartCircle(chart, options) {
  const point = getChartPoint(chart, options);
  return {
    x: point.x + options.xAdjust,
    y: point.y + options.yAdjust,
    width: options.radius * 2,
    height: options.radius * 2
  };
}

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
    return inBoxRange(mouseX, mouseY, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    ctx.save();
    drawBox(ctx, this, this.options);
    ctx.restore();
  }

  drawLabel(ctx) {
    const {x, y, width, height, options} = this;
    const labelOpts = options.label;
    labelOpts.borderWidth = options.borderWidth;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + labelOpts.borderWidth / 2, y + labelOpts.borderWidth / 2, width - labelOpts.borderWidth, height - labelOpts.borderWidth);
    ctx.clip();
    const position = toPosition(labelOpts.position);
    const padding = toPadding(labelOpts.padding);
    const labelSize = measureLabelSize(ctx, labelOpts);
    const labelRect = {
      x: calculateX(this, labelSize, position, padding),
      y: calculateY(this, labelSize, position, padding),
      width: labelSize.width,
      height: labelSize.height
    };
    drawLabel(ctx, labelRect, labelOpts);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return getChartRect(chart, options);
  }
}

BoxAnnotation.id = 'boxAnnotation';

BoxAnnotation.defaults = {
  adjustScaleRange: true,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  borderWidth: 1,
  cornerRadius: undefined, // TODO: v2 remove support for cornerRadius
  display: true,
  label: {
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
    textAlign: 'start',
    xAdjust: 0,
    yAdjust: 0,
    width: undefined
  },
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

const PI = Math.PI;
const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;
const sqr = v => v * v;

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
  intersects(x, y, epsilon = 0.001, useFinalPosition) {
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
    return (sqr(x - xx) + sqr(y - yy)) < epsilon;
  }

  // TODO: make private in v2
  labelIsVisible(useFinalPosition, chartArea) {
    const labelOpts = this.options.label;
    if (!chartArea || !labelOpts || !labelOpts.enabled) {
      return false;
    }
    return isLineInArea(this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition), chartArea);
  }

  // TODO: make private in v2
  isOnLabel(mouseX, mouseY, useFinalPosition) {
    if (!this.labelIsVisible(useFinalPosition)) {
      return false;
    }
    const {labelX, labelY, labelWidth, labelHeight, labelRotation} = this.getProps(['labelX', 'labelY', 'labelWidth', 'labelHeight', 'labelRotation'], useFinalPosition);
    const {x, y} = rotated({x: mouseX, y: mouseY}, {x: labelX, y: labelY}, -labelRotation);
    const w2 = labelWidth / 2;
    const h2 = labelHeight / 2;
    return x >= labelX - w2 && x <= labelX + w2 &&
      y >= labelY - h2 && y <= labelY + h2;
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

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;

    // Draw
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

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
LineAnnotation.defaults = {
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 2,
  display: true,
  endValue: undefined,
  label: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderCapStyle: 'butt',
    borderColor: 'black',
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderRadius: 6,
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
    textAlign: 'center',
    width: undefined,
    xAdjust: 0,
    xPadding: undefined, // TODO: v2 remove support for xPadding
    yAdjust: 0,
    yPadding: undefined, // TODO: v2 remove support for yPadding
  },
  scaleID: undefined,
  value: undefined,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y'
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

class EllipseAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    return pointInEllipse({x: mouseX, y: mouseY}, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition), this.options.rotation);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    const {width, height, options} = this;
    const center = this.getCenterPoint();

    ctx.save();

    ctx.translate(center.x, center.y);
    if (options.rotation) {
      ctx.rotate(toRadians(options.rotation));
    }

    ctx.beginPath();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;

    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;

    ctx.ellipse(0, 0, height / 2, width / 2, Math.PI / 2, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return getChartRect(chart, options);
  }

}

EllipseAnnotation.id = 'ellipseAnnotation';

EllipseAnnotation.defaults = {
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 1,
  display: true,
  rotation: 0,
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

function pointInEllipse(p, ellipse, rotation) {
  const {width, height} = ellipse;
  const center = ellipse.getCenterPoint(true);
  const xRadius = width / 2;
  const yRadius = height / 2;

  if (xRadius <= 0 || yRadius <= 0) {
    return false;
  }
  // https://stackoverflow.com/questions/7946187/point-and-ellipse-rotated-position-test-algorithm
  const angle = toRadians(rotation || 0);
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const a = Math.pow(cosAngle * (p.x - center.x) + sinAngle * (p.y - center.y), 2);
  const b = Math.pow(sinAngle * (p.x - center.x) - cosAngle * (p.y - center.y), 2);
  return (a / Math.pow(xRadius, 2)) + (b / Math.pow(yRadius, 2)) <= 1;
}

class LabelAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    return inBoxRange(mouseX, mouseY, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    if (!this.options.content) {
      return;
    }
    const {labelX, labelY, labelWidth, labelHeight, options} = this;
    drawCallout(ctx, this);
    if (this.boxVisible) {
      drawBox(ctx, this, options);
    }
    drawLabel(ctx, {x: labelX, y: labelY, width: labelWidth, height: labelHeight}, options);
  }

  // TODO: make private in v2
  resolveElementProperties(chart, options) {
    const point = !isBoundToPoint(options) ? getRectCenterPoint(getChartRect(chart, options)) : getChartPoint(chart, options);
    const padding = toPadding(options.padding);
    const labelSize = measureLabelSize(chart.ctx, options);
    const boxSize = measureRect(point, labelSize, options, padding);
    const bgColor = color(options.backgroundColor);
    const boxVisible = options.borderWidth > 0 || (bgColor && bgColor.valid && bgColor.rgb.a > 0);

    const properties = {
      boxVisible,
      pointX: point.x,
      pointY: point.y,
      ...boxSize,
      labelX: boxSize.x + padding.left + (options.borderWidth / 2),
      labelY: boxSize.y + padding.top + (options.borderWidth / 2),
      labelWidth: labelSize.width,
      labelHeight: labelSize.height
    };
    properties.calloutPosition = options.callout.enabled && resolveCalloutPosition(properties, options.callout);
    return properties;
  }
}

LabelAnnotation.id = 'labelAnnotation';

LabelAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
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
  textAlign: 'center',
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
  borderColor: 'color',
  backgroundColor: 'color',
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
  if (!calloutPosition) {
    return;
  }
  const callout = options.callout;
  const {separatorStart, separatorEnd} = getCalloutSeparatorCoord(element, calloutPosition);
  const {sideStart, sideEnd} = getCalloutSideCoord(element, calloutPosition, separatorStart);
  ctx.save();
  ctx.beginPath();
  const stroke = setBorderStyle(ctx, callout);
  if (callout.margin > 0 || options.borderWidth === 0) {
    ctx.moveTo(separatorStart.x, separatorStart.y);
    ctx.lineTo(separatorEnd.x, separatorEnd.y);
  }
  ctx.moveTo(sideStart.x, sideStart.y);
  ctx.lineTo(sideEnd.x, sideEnd.y);
  ctx.lineTo(pointX, pointY);
  if (stroke) {
    ctx.stroke();
  }
  ctx.restore();
}

function getCalloutSeparatorCoord(element, position) {
  const {x, y, width, height} = element;
  const adjust = getCalloutSeparatorAdjust(element, position);
  let separatorStart, separatorEnd;
  if (position === 'left' || position === 'right') {
    separatorStart = {x: x + adjust, y};
    separatorEnd = {x: separatorStart.x, y: separatorStart.y + height};
  } else if (position === 'top' || position === 'bottom') {
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
  } else if (position === 'top' || position === 'bottom') {
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

function resolveCalloutPosition(element, options) {
  const position = options.position;
  if (position === 'left' || position === 'right' || position === 'top' || position === 'bottom') {
    return position;
  }
  return resolveCalloutAutoPosition(element, options);
}

function resolveCalloutAutoPosition(element, options) {
  const {x, y, width, height, pointX, pointY} = element;
  const {margin, side} = options;
  const adjust = margin + side;
  if (pointX < (x - adjust)) {
    return 'left';
  } else if (pointX > (x + width + adjust)) {
    return 'right';
  } else if (pointY < (y + height + adjust)) {
    return 'top';
  } else if (pointY > (y - adjust)) {
    return 'bottom';
  }
}

class PointAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    const {width} = this.getProps(['width'], useFinalPosition);
    return inPointRange({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), width / 2 + this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const options = this.options;
    ctx.save();
    ctx.fillStyle = options.backgroundColor;
    setBorderStyle(ctx, options);
    drawPoint(ctx, options, this.x, this.y);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return resolvePointPosition(chart, options);
  }
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = {
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 1,
  display: true,
  pointStyle: 'circle',
  radius: 10,
  rotation: 0,
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
    const vertices = getVertices(this.getProps(['x', 'y'], useFinalPosition), this.options);
    return vertices && vertices.length > 0 && pointIsInPolygon(vertices, mouseX, mouseY);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {x, y, options} = this;
    const vertices = getVertices({x, y}, options);
    let vertex = vertices[0];
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = options.backgroundColor;
    const stroke = setBorderStyle(ctx, options);
    ctx.moveTo(vertex.x, vertex.y);
    for (let i = 1; i < vertices.length; i++) {
      vertex = vertices[i];
      ctx.lineTo(vertex.x, vertex.y);
    }
    ctx.closePath();
    ctx.fill();
    // If no border, don't draw it
    if (stroke) {
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    if (isNumber(options.sides) && options.sides >= 1) {
      return resolvePointPosition(chart, options);
    }
    return {options: {}};
  }

}

PolygonAnnotation.id = 'polygonAnnotation';

PolygonAnnotation.defaults = {
  adjustScaleRange: true,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderWidth: 1,
  display: true,
  radius: 10,
  rotation: 0,
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

function getVertices(point, options) {
  const {sides, radius} = options;
  let angle = (2 * PI$1) / sides;
  let rad = options.rotation * RAD_PER_DEG;
  const vertices = new Array();
  addVertex(vertices, point, rad, radius);
  for (let i = 0; i < sides; i++) {
    rad += angle;
    addVertex(vertices, point, rad, radius);
  }
  return vertices;
}

function addVertex(array, point, rad, radius) {
  array.push({
    x: point.x + Math.sin(rad) * radius,
    y: point.y - Math.cos(rad) * radius
  });
}

function pointIsInPolygon(vertices, x, y) {
  let isInside = false;
  let i = 0;
  let j = vertices.length - 1;
  for (j; i < vertices.length; j = i++) {
    if ((vertices[i].y > y) !== (vertices[j].y > y) &&
         x < (vertices[j].x - vertices[i].x) * (y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x) {
      isInside = !isInside;
    }
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

var version = "1.2.2";

const chartStates = new Map();
const versionParts = Chart.version.split('.');

var annotation = {
  id: 'annotation',

  version,

  afterRegister() {
    Chart.register(annotationTypes);

    // TODO: Remove this workaround when strictly requiring Chart.js v3.7 or newer
    if (versionParts[0] === '3' && parseInt(versionParts[1], 10) <= 6) {
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

const directUpdater = {
  update: Object.assign
};

function resolveAnimations(chart, animOpts, mode) {
  if (mode === 'reset' || mode === 'none' || mode === 'resize') {
    return directUpdater;
  }
  return new Animations(chart, animOpts);
}

function resolveType(type = 'line') {
  if (annotationTypes[type]) {
    return type;
  }
  console.warn(`Unknown annotation type: '${type}', defaulting to 'line'`);
  return 'line';
}

function updateElements(chart, state, options, mode) {
  const animations = resolveAnimations(chart, options.animations, mode);

  const annotations = state.annotations;
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i];
    let el = elements[i];
    const elementClass = annotationTypes[resolveType(annotation.type)];
    if (!el || !(el instanceof elementClass)) {
      el = elements[i] = new elementClass();
    }
    const opts = resolveAnnotationOptions(annotation.setContext(getContext(chart, el, annotation)));
    const properties = el.resolveElementProperties(chart, opts);
    properties.skip = isNaN(properties.x) || isNaN(properties.y);
    properties.options = opts;
    animations.update(el, properties);
  }
}

function resolveAnnotationOptions(resolver) {
  const elementClass = annotationTypes[resolveType(resolver.type)];
  const result = {};
  result.id = resolver.id;
  result.type = resolver.type;
  result.drawTime = resolver.drawTime;
  Object.assign(result, resolveObj(resolver, elementClass.defaults), resolveObj(resolver, elementClass.defaultRoutes));
  for (const hook of hooks) {
    result[hook] = resolver[hook];
  }
  return result;
}

function resolveObj(resolver, defs) {
  const result = {};
  for (const name of Object.keys(defs)) {
    const optDefs = defs[name];
    const value = resolver[name];
    result[name] = isObject(optDefs) ? resolveObj(value, optDefs) : value;
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

function draw(chart, caller, clip) {
  const {ctx, chartArea} = chart;
  const state = chartStates.get(chart);

  if (clip) {
    clipArea(ctx, chartArea);
  }
  state.visibleElements.forEach(el => {
    if (el.options.drawTime === caller) {
      el.draw(ctx);
    }
  });
  if (clip) {
    unclipArea(ctx);
  }

  state.visibleElements.forEach(el => {
    if (!('drawLabel' in el)) {
      return;
    }
    const label = el.options.label;
    if (label && label.enabled && label.content && (label.drawTime || el.options.drawTime) === caller) {
      el.drawLabel(ctx, chartArea);
    }
  });
}

export { annotation as default };
