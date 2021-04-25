/*!
* chartjs-plugin-annotation v1.0.1
* https://www.chartjs.org/chartjs-plugin-annotation/index
 * (c) 2021 chartjs-plugin-annotation Contributors
 * Released under the MIT License
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('chart.js/helpers')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'chart.js/helpers'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['chartjs-plugin-annotation'] = factory(global.Chart, global.Chart.helpers));
}(this, (function (chart_js, helpers) { 'use strict';

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

function handleEvent(chart, state, event, options) {
  if (state.listened) {
    switch (event.type) {
    case 'mousemove':
    case 'mouseout':
      handleMoveEvents(chart, state, event);
      break;
    case 'click':
      handleClickEvents(chart, state, event, options);
      break;
    }
  }
}

function handleMoveEvents(chart, state, event) {
  if (!state.moveListened) {
    return;
  }

  let element;

  if (event.type === 'mousemove') {
    element = getNearestItem(state.elements, event);
  }

  const previous = state.hovered;
  state.hovered = element;

  dispatchMoveEvents(chart, state, previous, element);
}

function dispatchMoveEvents(chart, state, previous, element) {
  if (previous && previous !== element) {
    dispatchEvent(chart, state, previous.options.leave || state.listeners.leave, previous);
  }
  if (element && element !== previous) {
    dispatchEvent(chart, state, element.options.enter || state.listeners.enter, element);
  }
}

function handleClickEvents(chart, state, event, options) {
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
      dispatchEvent(chart, state, dblclick, element);
    } else if (dblclick) {
      // if there is a dblclick handler, wait for dblClickSpeed ms before deciding its a click
      element.clickTimeout = setTimeout(() => {
        delete element.clickTimeout;
        dispatchEvent(chart, state, click, element);
      }, options.dblClickSpeed);
    } else {
      // no double click handler, just call the click handler directly
      dispatchEvent(chart, state, click, element);
    }
  }
}

function dispatchEvent(chart, _state, handler, element) {
  helpers.callback(handler, [{chart, element}]);
}

function getNearestItem(elements, position) {
  let minDistance = Number.POSITIVE_INFINITY;

  return elements
    .filter((element) => element.options.display && element.inRange(position.x, position.y))
    .reduce((nearestItems, element) => {
      const center = element.getCenterPoint();
      const distance = helpers.distanceBetweenPoints(position, center);

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

const PI$1 = Math.PI;
const HALF_PI = PI$1 / 2;

function scaleValue(scale, value, fallback) {
  value = typeof value === 'number' ? value : scale.parse(value);
  return helpers.isFinite(value) ? scale.getPixelForValue(value) : fallback;
}

/**
 * Creates a "path" for a rectangle with rounded corners at position (x, y) with a
 * given size (width, height) and the same `radius` for all corners.
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D Context.
 * @param {number} x - The x axis of the coordinate for the rectangle starting point.
 * @param {number} y - The y axis of the coordinate for the rectangle starting point.
 * @param {number} width - The rectangle's width.
 * @param {number} height - The rectangle's height.
 * @param {number} radius - The rounded amount (in pixels) for the four corners.
 * @todo handle `radius` as top-left, top-right, bottom-right, bottom-left array/object?
 */
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  if (radius) {
    const r = Math.min(radius, height / 2, width / 2);
    const left = x + r;
    const top = y + r;
    const right = x + width - r;
    const bottom = y + height - r;

    ctx.moveTo(x, top);
    if (left < right && top < bottom) {
      ctx.arc(left, top, r, -PI$1, -HALF_PI);
      ctx.arc(right, top, r, -HALF_PI, 0);
      ctx.arc(right, bottom, r, 0, HALF_PI);
      ctx.arc(left, bottom, r, HALF_PI, PI$1);
    } else if (left < right) {
      ctx.moveTo(left, y);
      ctx.arc(right, top, r, -HALF_PI, HALF_PI);
      ctx.arc(left, top, r, HALF_PI, PI$1 + HALF_PI);
    } else if (top < bottom) {
      ctx.arc(left, top, r, -PI$1, 0);
      ctx.arc(left, bottom, r, 0, PI$1);
    } else {
      ctx.arc(left, top, r, -PI$1, PI$1);
    }
    ctx.closePath();
    ctx.moveTo(x, y);
  } else {
    ctx.rect(x, y, width, height);
  }
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

class BoxAnnotation extends chart_js.Element {
  inRange(mouseX, mouseY, useFinalPosition) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);

    return mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height;
  }

  getCenterPoint(useFinalPosition) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
    return {
      x: x + width / 2,
      y: y + height / 2
    };
  }

  draw(ctx) {
    const {x, y, width, height, options} = this;

    ctx.save();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;

    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;

    roundedRect(ctx, x, y, width, height, options.cornerRadius);
    ctx.fill();

    // If no border, don't draw it
    if (options.borderWidth) {
      ctx.stroke();
    }

    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const xScale = chart.scales[options.xScaleID];
    const yScale = chart.scales[options.yScaleID];
    let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;
    let min, max;

    if (!xScale && !yScale) {
      return {options: {}};
    }

    if (xScale) {
      min = scaleValue(xScale, options.xMin, x);
      max = scaleValue(xScale, options.xMax, x2);
      x = Math.min(min, max);
      x2 = Math.max(min, max);
    }

    if (yScale) {
      min = scaleValue(yScale, options.yMin, y2);
      max = scaleValue(yScale, options.yMax, y);
      y = Math.min(min, max);
      y2 = Math.max(min, max);
    }

    return {
      x,
      y,
      x2,
      y2,
      width: x2 - x,
      height: y2 - y
    };
  }
}

BoxAnnotation.id = 'boxAnnotation';

BoxAnnotation.defaults = {
  display: true,
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 1,
  cornerRadius: 0,
  xScaleID: 'x',
  xMin: undefined,
  xMax: undefined,
  yScaleID: 'y',
  yMin: undefined,
  yMax: undefined
};

BoxAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

const PI = Math.PI;
const clamp = (x, from, to) => Math.min(to, Math.max(from, x));
const pointInLine = (p1, p2, t) => {
  t = clamp(t, 0, 1);
  return {x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)};
};
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;
const toPercent = (s) => typeof s === 'string' && s.endsWith('%') && parseFloat(s) / 100;

function limitPointToArea({x, y}, p2, {top, right, bottom, left}) {
  if (x < left) {
    y = p2.x < left ? NaN : interpolateY(left, {x, y}, p2);
    x = left;
  }
  if (x > right) {
    y = p2.x > right ? NaN : interpolateY(right, {x, y}, p2);
    x = right;
  }
  if (y < top) {
    x = p2.y < top ? NaN : interpolateX(top, {x, y}, p2);
    y = top;
  }
  if (y > bottom) {
    x = p2.y > bottom ? NaN : interpolateX(bottom, {x, y}, p2);
    y = bottom;
  }
  return {x, y};
}

function limitLineToArea(p1, p2, area) {
  const {x, y} = limitPointToArea(p1, p2, area);
  const {x: x2, y: y2} = limitPointToArea(p2, p1, area);
  return {x, y, x2, y2, width: Math.abs(x2 - x), height: Math.abs(y2 - y)};
}

class LineAnnotation extends chart_js.Element {
  intersects(x, y, epsilon) {
    epsilon = epsilon || 0.001;
    const me = this;
    const p1 = {x: me.x, y: me.y};
    const p2 = {x: me.x2, y: me.y2};
    const dy = interpolateY(x, p1, p2);
    const dx = interpolateX(y, p1, p2);
    return (
      (!isFinite(dy) || Math.abs(y - dy) < epsilon) &&
			(!isFinite(dx) || Math.abs(x - dx) < epsilon)
    );
  }

  labelIsVisible() {
    const label = this.options.label;
    return label && label.enabled && label.content;
  }

  isOnLabel(mouseX, mouseY) {
    const {labelRect} = this;

    if (!labelRect) {
      return false;
    }

    const {x, y} = rotated({x: mouseX, y: mouseY}, labelRect, -labelRect.rotation);
    const w2 = labelRect.width / 2;
    const h2 = labelRect.height / 2;
    return x >= labelRect.x - w2 && x <= labelRect.x + w2 &&
      y >= labelRect.y - h2 && y <= labelRect.y + h2;
  }

  inRange(x, y) {
    const epsilon = this.options.borderWidth || 1;
    return this.intersects(x, y, epsilon) || this.isOnLabel(x, y);
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
    if (this.labelIsVisible()) {
      ctx.save();
      drawLabel(ctx, this, chartArea);
      ctx.restore();
    }
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
    return limitLineToArea({x, y}, {x: x2, y: y2}, chart.chartArea);
  }
}

LineAnnotation.id = 'lineAnnotation';
LineAnnotation.defaults = {
  display: true,
  adjustScaleRange: true,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0,
  label: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    drawTime: undefined,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: 'bold',
      weight: undefined
    },
    color: '#fff',
    xPadding: 6,
    yPadding: 6,
    rotation: 0,
    cornerRadius: 6,
    position: 'center',
    xAdjust: 0,
    yAdjust: 0,
    textAlign: 'center',
    enabled: false,
    content: null
  },
  value: undefined,
  endValue: undefined,
  scaleID: undefined,
  xScaleID: 'x',
  xMin: undefined,
  xMax: undefined,
  yScaleID: 'y',
  yMin: undefined,
  yMax: undefined
};

LineAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function calculateAutoRotation(line) {
  const {x, y, x2, y2} = line;
  const rotation = Math.atan2(y2 - y, x2 - x);
  // Flip the rotation if it goes > PI/2 or < -PI/2, so label stays upright
  return rotation > PI / 2 ? rotation - PI : rotation < PI / -2 ? rotation + PI : rotation;
}

function drawLabel(ctx, line, chartArea) {
  const label = line.options.label;

  ctx.font = helpers.toFontString(label.font);

  const {width, height} = measureLabel(ctx, label);
  const rect = line.labelRect = calculateLabelPosition(line, width, height, chartArea);

  ctx.translate(rect.x, rect.y);
  ctx.rotate(rect.rotation);

  ctx.fillStyle = label.backgroundColor;
  roundedRect(ctx, -(width / 2), -(height / 2), width, height, label.cornerRadius);
  ctx.fill();

  ctx.fillStyle = label.color;
  if (helpers.isArray(label.content)) {
    ctx.textAlign = label.textAlign;
    const x = calculateLabelXAlignment(label, width);
    let textYPosition = -(height / 2) + label.yPadding;
    for (let i = 0; i < label.content.length; i++) {
      ctx.textBaseline = 'top';
      ctx.fillText(
        label.content[i],
        x,
        textYPosition
      );
      textYPosition += label.font.size + label.yPadding;
    }
  } else if (label.content instanceof Image) {
    const x = -(width / 2) + label.xPadding;
    const y = -(height / 2) + label.yPadding;
    ctx.drawImage(label.content, x, y, width - (2 * label.xPadding), height - (2 * label.yPadding));
  } else {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label.content, 0, 0);
  }
}

function calculateLabelXAlignment(label, width) {
  const {textAlign, xPadding} = label;
  if (textAlign === 'start') {
    return -(width / 2) + xPadding;
  } else if (textAlign === 'end') {
    return +(width / 2) - xPadding;
  }
  return 0;
}

function getImageSize(size, value) {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    return toPercent(value) * size;
  }
  return size;
}

const widthCache = new Map();
function measureLabel(ctx, label) {
  const content = label.content;
  if (content instanceof Image) {
    return {
      width: getImageSize(content.width, label.width) + 2 * label.xPadding,
      height: getImageSize(content.height, label.height) + 2 * label.yPadding
    };
  }
  const lines = helpers.isArray(content) ? content : [content];
  const count = lines.length;
  let width = 0;
  for (let i = 0; i < count; i++) {
    const text = lines[i];
    if (!widthCache.has(text)) {
      widthCache.set(text, ctx.measureText(text).width);
    }
    width = Math.max(width, widthCache.get(text));
  }
  width += 2 * label.xPadding;

  return {
    width,
    height: count * label.font.size + ((count + 1) * label.yPadding)
  };
}

function calculateLabelPosition(line, width, height, chartArea) {
  const label = line.options.label;
  const {xAdjust, yAdjust, xPadding, yPadding, position} = label;
  const p1 = {x: line.x, y: line.y};
  const p2 = {x: line.x2, y: line.y2};
  const rotation = label.rotation === 'auto' ? calculateAutoRotation(line) : helpers.toRadians(label.rotation);
  const size = rotatedSize(width, height, rotation);
  const t = calculateT(line, position, size, chartArea);
  const pt = pointInLine(p1, p2, t);
  const xCoordinateSizes = {size: size.w, min: chartArea.left, max: chartArea.right, padding: xPadding};
  const yCoordinateSizes = {size: size.h, min: chartArea.top, max: chartArea.bottom, padding: yPadding};

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

function calculateT(line, position, rotSize, chartArea) {
  let t = 0.5;
  const space = spaceAround(line, chartArea);
  const label = line.options.label;
  if (position === 'start') {
    t = calculateTAdjust({w: line.x2 - line.x, h: line.y2 - line.y}, rotSize, label, space);
  } else if (position === 'end') {
    t = 1 - calculateTAdjust({w: line.x - line.x2, h: line.y - line.y2}, rotSize, label, space);
  }
  return t;
}

function calculateTAdjust(lineSize, labelSize, label, space) {
  const {xPadding, yPadding} = label;
  const lineW = lineSize.w * space.dx;
  const lineH = lineSize.h * space.dy;
  const x = (lineW > 0) && ((labelSize.w / 2 + xPadding - space.x) / lineW);
  const y = (lineH > 0) && ((labelSize.h / 2 + yPadding - space.y) / lineH);
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
    dx: l < r ? 1 : -1,
    dy: t < b ? 1 : -1
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

class EllipseAnnotation extends BoxAnnotation {

  inRange(x, y) {
    return pointInEllipse({x, y}, this);
  }

  draw(ctx) {
    const {width, height, options} = this;
    const center = this.getCenterPoint();

    ctx.save();

    ctx.beginPath();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;

    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;

    ctx.ellipse(center.x, center.y, height / 2, width / 2, Math.PI / 2, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

EllipseAnnotation.id = 'ellipseAnnotation';

EllipseAnnotation.defaults = {
  display: true,
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 1,
  xScaleID: 'x',
  xMin: undefined,
  xMax: undefined,
  yScaleID: 'y',
  yMin: undefined,
  yMax: undefined
};

EllipseAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function pointInEllipse(p, ellipse) {
  const {width, height} = ellipse;
  const center = ellipse.getCenterPoint(true);
  const xRadius = width / 2;
  const yRadius = height / 2;

  if (xRadius <= 0 || yRadius <= 0) {
    return false;
  }

  return (Math.pow(p.x - center.x, 2) / Math.pow(xRadius, 2)) + (Math.pow(p.y - center.y, 2) / Math.pow(yRadius, 2)) <= 1.0;
}

class PointAnnotation extends chart_js.Element {

  inRange(x, y) {
    const {width, options} = this;
    const center = this.getCenterPoint(true);
    const radius = width / 2 + options.borderWidth;

    if (radius <= 0) {
      return false;
    }

    return (Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2)) <= Math.pow(radius, 2);
  }

  getCenterPoint(useFinalPosition) {
    const {x, y} = this.getProps(['x', 'y'], useFinalPosition);
    return {x, y};
  }

  draw(ctx) {
    const {x, y, width, options} = this;

    ctx.save();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;

    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;

    ctx.beginPath();
    ctx.arc(x, y, width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  resolveElementProperties(chart, options) {
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

    return {
      x,
      y,
      width: options.radius * 2,
      height: options.radius * 2
    };
  }
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = {
  display: true,
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 1,
  radius: 10,
  xScaleID: 'x',
  xValue: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

var version = "1.0.1";

const chartStates = new Map();

const annotationTypes = {
  box: BoxAnnotation,
  line: LineAnnotation,
  ellipse: EllipseAnnotation,
  point: PointAnnotation
};

Object.keys(annotationTypes).forEach(key => {
  chart_js.defaults.describe(`elements.${annotationTypes[key].id}`, {
    _fallback: 'plugins.annotation'
  });
});

var Annotation = {
  id: 'annotation',

  version,

  afterRegister() {
    chart_js.Chart.register(annotationTypes);
  },

  afterUnregister() {
    chart_js.Chart.unregister(annotationTypes);
  },

  beforeInit(chart) {
    chartStates.set(chart, {
      annotations: [],
      elements: [],
      listeners: {},
      listened: false,
      moveListened: false
    });
  },

  beforeUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    const annotations = state.annotations = [];

    let annotationOptions = options.annotations;
    if (helpers.isObject(annotationOptions)) {
      Object.keys(annotationOptions).forEach(key => {
        const value = annotationOptions[key];
        if (helpers.isObject(value)) {
          value.id = key;
          annotations.push(value);
        }
      });
    } else if (helpers.isArray(annotationOptions)) {
      annotations.push(...annotationOptions);
    }
  },

  afterDataLimits(chart, args) {
    const state = chartStates.get(chart);
    adjustScaleRange(chart, args.scale, state.annotations.filter(a => a.display && a.adjustScaleRange));
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    updateListeners(chart, state, options);
    updateElements(chart, state, options, args.mode);
  },

  beforeDatasetsDraw(chart) {
    draw(chart, 'beforeDatasetsDraw');
  },

  afterDatasetsDraw(chart) {
    draw(chart, 'afterDatasetsDraw');
  },

  beforeDraw(chart) {
    draw(chart, 'beforeDraw');
  },

  afterDraw(chart) {
    draw(chart, 'afterDraw');
  },

  beforeEvent(chart, args, options) {
    const state = chartStates.get(chart);
    handleEvent(chart, state, args.event, options);
  },

  destroy(chart) {
    chartStates.delete(chart);
  },

  _getState(chart) {
    return chartStates.get(chart);
  },

  defaults: {
    drawTime: 'afterDatasetsDraw',
    dblClickSpeed: 350, // ms
    animations: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height'],
        type: 'number'
      },
    },
    label: {
      drawTime: null
    }
  },

  descriptors: {
    _indexable: false,
    _scriptable: (prop) => !hooks.includes(prop),
    annotations: {
      _allKeys: false,
      _fallback: (prop, opts) => `elements.${annotationTypes[opts.type || 'line'].id}`,
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
  return new chart_js.Animations(chart, animOpts);
}

function updateElements(chart, state, options, mode) {
  const animations = resolveAnimations(chart, options.animations, mode);

  const annotations = state.annotations;
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i];
    let el = elements[i];
    const elType = annotationTypes[annotation.type] || annotationTypes.line;
    if (!el || !(el instanceof elType)) {
      el = elements[i] = new elType();
    }
    const opts = resolveAnnotationOptions(annotation.setContext(getContext(chart, el, annotation)));
    const properties = el.resolveElementProperties(chart, opts);
    properties.skip = isNaN(properties.x) || isNaN(properties.y);
    properties.options = opts;
    animations.update(el, properties);
  }
}

function resolveAnnotationOptions(resolver) {
  const elType = annotationTypes[resolver.type] || annotationTypes.line;
  const result = {};
  result.id = resolver.id;
  result.type = resolver.type;
  result.drawTime = resolver.drawTime;
  Object.assign(result, resolveObj(resolver, elType.defaults), resolveObj(resolver, elType.defaultRoutes));
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
    result[name] = helpers.isObject(optDefs) ? resolveObj(value, optDefs) : value;
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

function draw(chart, caller) {
  const {ctx, chartArea} = chart;
  const state = chartStates.get(chart);
  const elements = state.elements.filter(el => !el.skip && el.options.display);

  helpers.clipArea(ctx, chartArea);
  elements.forEach(el => {
    if (el.options.drawTime === caller) {
      el.draw(ctx);
    }
  });
  helpers.unclipArea(ctx);

  elements.forEach(el => {
    if ('drawLabel' in el && el.options.label && (el.options.label.drawTime || el.options.drawTime) === caller) {
      el.drawLabel(ctx, chartArea);
    }
  });
}

function adjustScaleRange(chart, scale, annotations) {
  const range = getScaleLimits(scale, annotations);
  let changed = false;
  if (helpers.isFinite(range.min) &&
		typeof scale.options.min === 'undefined' &&
		typeof scale.options.suggestedMin === 'undefined') {
    changed = scale.min !== range.min;
    scale.min = range.min;
  }
  if (helpers.isFinite(range.max) &&
		typeof scale.options.max === 'undefined' &&
		typeof scale.options.suggestedMax === 'undefined') {
    changed = scale.max !== range.max;
    scale.max = range.max;
  }
  if (changed && typeof scale.handleTickRangeOptions === 'function') {
    scale.handleTickRangeOptions();
  }
}

function getScaleLimits(scale, annotations) {
  const axis = scale.axis;
  const scaleID = scale.id;
  const scaleIDOption = axis + 'ScaleID';
  let min = helpers.valueOrDefault(scale.min, Number.NEGATIVE_INFINITY);
  let max = helpers.valueOrDefault(scale.max, Number.POSITIVE_INFINITY);
  for (const annotation of annotations) {
    if (annotation.scaleID === scaleID) {
      for (const prop of ['value', 'endValue']) {
        const raw = annotation[prop];
        if (raw) {
          const value = scale.parse(raw);
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }
    } else if (annotation[scaleIDOption] === scaleID) {
      for (const prop of [axis + 'Min', axis + 'Max', axis + 'Value']) {
        const raw = annotation[prop];
        if (raw) {
          const value = scale.parse(raw);
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }
    }
  }
  return {min, max};
}

chart_js.Chart.register(Annotation);

return Annotation;

})));
