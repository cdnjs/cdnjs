/*!
* chartjs-plugin-annotation v1.0.0-beta.2
* undefined
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
  const annotations = options.annotations || [];
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
    .filter((element) => element.inRange(position.x, position.y))
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
    .sort((a, b) => {
      // If there are multiple elements equally close,
      // sort them by size, then by index
      const sizeA = a.getArea();
      const sizeB = b.getArea();
      return (sizeA > sizeB || sizeA < sizeB) ? sizeA - sizeB : a._index - b._index;
    })
    .slice(0, 1)[0]; // return only the top item
}

const PI = Math.PI;
const HALF_PI = PI / 2;

function scaleValue(scale, value, fallback) {
  value = scale.parse(value);
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
      ctx.arc(left, top, r, -PI, -HALF_PI);
      ctx.arc(right, top, r, -HALF_PI, 0);
      ctx.arc(right, bottom, r, 0, HALF_PI);
      ctx.arc(left, bottom, r, HALF_PI, PI);
    } else if (left < right) {
      ctx.moveTo(left, y);
      ctx.arc(right, top, r, -HALF_PI, HALF_PI);
      ctx.arc(left, top, r, HALF_PI, PI + HALF_PI);
    } else if (top < bottom) {
      ctx.arc(left, top, r, -PI, 0);
      ctx.arc(left, bottom, r, 0, PI);
    } else {
      ctx.arc(left, top, r, -PI, PI);
    }
    ctx.closePath();
    ctx.moveTo(x, y);
  } else {
    ctx.rect(x, y, width, height);
  }
}

function inTriangle(point, a, b, c) {
  // see https://en.wikipedia.org/wiki/Barycentric_coordinate_system
  const A = 1 / 2 * (-b.y * c.x + a.y * (-b.x + c.x) + a.x * (b.y - c.y) + b.x * c.y);
  const sign = A < 0 ? -1 : 1;
  const s = (a.y * c.x - a.x * c.y + (c.y - a.y) * point.x + (a.x - c.x) * point.y) * sign;
  const t = (a.x * b.y - a.y * b.x + (a.y - b.y) * point.x + (b.x - a.x) * point.y) * sign;

  return s > 0 && t > 0 && (s + t) < 2 * A * sign;
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

    roundedRect(ctx, x, y, width, height, options.cornerRadius);
    ctx.fill();
    ctx.stroke();

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
  borderWidth: 1,
  cornerRadius: 0
};

BoxAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;

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

  isOnLabel(x, y) {
    const {labelRect} = this;

    if (!labelRect) {
      return false;
    }

    const eventPoint = {x, y};
    return inTriangle(eventPoint, labelRect.a, labelRect.b, labelRect.c) || inTriangle(eventPoint, labelRect.b, labelRect.c, labelRect.d);
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

    if (ctx.setLineDash) {
      ctx.setLineDash(options.borderDash);
    }
    ctx.lineDashOffset = options.borderDashOffset;

    // Draw
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.restore();
  }

  drawLabel(ctx) {
    if (this.labelIsVisible()) {
      ctx.save();
      drawLabel(ctx, this);
      ctx.restore();
    }
  }

  resolveElementProperties(chart, options) {
    const scale = chart.scales[options.scaleID];
    let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;
    let min, max, _horizontal;

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
      _horizontal = !scale.isHorizontal();
    }
    return {
      x,
      y,
      x2,
      y2,
      width: x2 - x,
      height: y2 - y,
      _chartArea: chart.chartArea,
      _horizontal
    };
  }
}

LineAnnotation.id = 'lineAnnotation';
LineAnnotation.defaults = {
  display: true,
  borderDash: [],
  borderDashOffset: 0,
  label: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    font: {
      family: chart_js.defaults.font.family,
      size: chart_js.defaults.font.size,
      style: 'bold',
      color: '#fff',
    },
    xPadding: 6,
    yPadding: 6,
    rotation: 0,
    cornerRadius: 6,
    position: 'center',
    xAdjust: 0,
    yAdjust: 0,
    enabled: false,
    content: null
  }
};

function calculateAutoRotation(line) {
  const {x, y, x2, y2} = line;
  let cathetusAdjacent, cathetusOpposite;
  if (line._horizontal) {
    cathetusAdjacent = y2 > y ? x2 - x : -(x2 - x);
    cathetusOpposite = Math.abs(y - y2);
  } else {
    cathetusAdjacent = Math.abs(x - x2);
    cathetusOpposite = x2 > x ? y2 - y : -(y2 - y);
  }
  return Math.atan(cathetusOpposite / cathetusAdjacent);
}

function drawLabel(ctx, line) {
  const label = line.options.label;

  ctx.font = helpers.toFontString(label.font);
  ctx.textAlign = 'center';

  const {width, height} = measureLabel(ctx, label);
  const rotation = label.rotation === 'auto' ? calculateAutoRotation(line) : helpers.toRadians(label.rotation);

  line.labelRect = calculateLabelPosition(line, width, height, rotation);
  adjustLabelPosition(line, rotation);

  ctx.translate(line.labelRect.x, line.labelRect.y);
  ctx.rotate(rotation);

  ctx.fillStyle = label.backgroundColor;
  roundedRect(ctx, -(width / 2), -(height / 2), width, height, label.cornerRadius);
  ctx.fill();

  ctx.fillStyle = label.font.color;
  if (helpers.isArray(label.content)) {
    let textYPosition = -(height / 2) + label.yPadding;
    for (let i = 0; i < label.content.length; i++) {
      ctx.textBaseline = 'top';
      ctx.fillText(
        label.content[i],
        -(width / 2) + (width / 2),
        textYPosition
      );
      textYPosition += label.font.size + label.yPadding;
    }
  } else {
    ctx.textBaseline = 'middle';
    ctx.fillText(label.content, 0, 0);
  }
}

const widthCache = new Map();
function measureLabel(ctx, label) {
  const content = label.content;
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

function calculateLabelPosition(line, width, height, angle) {
  const label = line.options.label;
  const {xPadding, xAdjust, yPadding, yAdjust, position} = label;
  const p1 = {x: line.x, y: line.y};
  const p2 = {x: line.x2, y: line.y2};
  let x, y, pt;

  switch (validPosition(position, line._horizontal)) {
  case 'top':
    y = line.y + (height / 2) + yPadding + yAdjust;
    x = interpolateX(y, p1, p2) + xAdjust;
    break;
  case 'bottom':
    y = line.y2 - (height / 2) - yPadding + yAdjust;
    x = interpolateX(y, p1, p2) + xAdjust;
    break;
  case 'left':
    x = line.x + (width / 2) + xPadding + xAdjust;
    y = interpolateY(x, p1, p2) + yAdjust;
    break;
  case 'right':
    x = line.x2 - (width / 2) - xPadding + xAdjust;
    y = interpolateY(x, p1, p2) + yAdjust;
    break;
  default:
    pt = pointInLine(p1, p2, 0.5);
    x = pt.x + xAdjust;
    y = pt.y + yAdjust;
  }

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rotatedHeight = Math.abs(width * sin) + Math.abs(height * cos);
  const rotatedWidth = Math.abs(width * cos) + Math.abs(height * sin);

  return {
    x,
    y,
    width,
    height,
    rotatedWidth,
    rotatedHeight
  };
}

function adjustLabelPosition(line, angle) {
  const {options, labelRect, _chartArea} = line;
  const {rotatedHeight, rotatedWidth, height, width} = labelRect;
  const label = options.label;
  const {xPadding, xAdjust, yPadding, yAdjust, position} = label;
  const p1 = {x: line.x, y: line.y};
  const p2 = {x: line.x2, y: line.y2};
  const xCoordinateSizes = {size: rotatedWidth, min: _chartArea.left, max: _chartArea.right, padding: xPadding, adjust: xAdjust};
  const yCoordinateSizes = {size: rotatedHeight, min: _chartArea.top, max: _chartArea.bottom, padding: yPadding, adjust: yAdjust};
  const xApexFactor = (width / 2 * Math.cos(angle)) - (height / 2 * Math.sin(angle));
  const yApexFactor = (width / 2 * Math.sin(angle)) + (height / 2 * Math.cos(angle));
  let x, y, pt;

  switch (validPosition(position, line._horizontal)) {
  case 'top':
    y = line.y + (rotatedHeight / 2) + yAdjust + yPadding;
    break;
  case 'bottom':
    y = line.y2 - (rotatedHeight / 2) + yAdjust - yPadding;
    break;
  case 'left':
    x = line.x + (rotatedWidth / 2) + xAdjust + xPadding;
    break;
  case 'right':
    x = line.x2 - (rotatedWidth / 2) + xAdjust - xPadding;
    break;
  default:
    pt = pointInLine(p1, p2, 0.5);
    x = adjustLabelCoordinate(pt.x + xAdjust, xCoordinateSizes);
    y = adjustLabelCoordinate(pt.y + yAdjust, yCoordinateSizes);
  }

  if (!y) {
    x = adjustLabelCoordinate(x, xCoordinateSizes);
    y = adjustLabelCoordinate(interpolateY(x, p1, p2) + yAdjust, yCoordinateSizes);
  } else if (!x) {
    y = adjustLabelCoordinate(y, yCoordinateSizes);
    x = adjustLabelCoordinate(interpolateX(y, p1, p2) + xAdjust, xCoordinateSizes);
  }

  labelRect.x = x;
  labelRect.y = y;
  labelRect.a = {x: x - xApexFactor, y: y - yApexFactor};
  labelRect.b = {x: x + xApexFactor, y: y + yApexFactor};
  labelRect.c = {x: x - xApexFactor, y: y - yApexFactor};
  labelRect.d = {x: x + xApexFactor, y: y + yApexFactor};
}

function validPosition(position, horizontal) {
  return ((horizontal && (position === 'top' || position === 'bottom')) ||
		(!horizontal && (position === 'left' || position === 'right')))
    ? 'center' : position;
}

function adjustLabelCoordinate(coordinate, labelSizes) {
  const {size, min, max, padding, adjust} = labelSizes;
  let value = coordinate;
  const halfSize = size / 2;

  if (min >= (coordinate + padding + adjust - halfSize)) {
    value = min + padding - adjust + halfSize;
  }
  if (max <= (coordinate - padding + adjust + halfSize)) {
    value = max - padding + adjust - halfSize;
  }

  return value;
}

class EllipseAnnotation extends BoxAnnotation {

  inRange(x, y) {
    return pointInEllipse({x, y}, this);
  }

  draw(ctx) {
    const {width, height, options} = this;
    const center = this.getCenterPoint(true);

    ctx.save();

    ctx.beginPath();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;

    ctx.ellipse(center.x, center.y, height / 2, width / 2, Math.PI / 2, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

EllipseAnnotation.id = 'ellipseAnnotation';

EllipseAnnotation.defaults = {
  display: true,
  borderWidth: 1
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
    return pointInCircle({x, y}, this);
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

    ctx.beginPath();
    ctx.arc(x, y, width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const xScale = chart.scales[options.xScaleID];
    const yScale = chart.scales[options.yScaleID];
    let x = chart.chartArea.width / 2;
    let y = chart.chartArea.height / 2;

    if (!xScale && !yScale) {
      return {options: {}};
    }

    if (xScale) {
      x = scaleValue(xScale, options.xValue, x);
    }

    if (yScale) {
      y = scaleValue(yScale, options.yValue, y);
    }

    return {
      x,
      y,
      x2: x + (options.radius * 2),
      y2: y + (options.radius * 2),
      width: options.radius * 2,
      height: options.radius * 2
    };
  }
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = {
  display: true,
  borderWidth: 1,
  radius: 10
};

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function pointInCircle(p, point) {
  const {width} = point;
  const center = point.getCenterPoint(true);
  const radius = width / 2;

  if (radius <= 0) {
    return false;
  }

  return (Math.pow(p.x - center.x, 2) + Math.pow(p.y - center.y, 2)) <= Math.pow(radius, 2);
}

const chartStates = new Map();

const annotationTypes = {
  box: BoxAnnotation,
  line: LineAnnotation,
  ellipse: EllipseAnnotation,
  point: PointAnnotation
};

var Annotation = {
  id: 'annotation',

  beforeInit(chart) {
    chartStates.set(chart, {
      elements: [],
      listeners: {},
      listened: false,
      moveListened: false,
      scales: new Set()
    });
  },

  afterDataLimits(chart, args, options) {
    const state = chartStates.get(chart);
    adjustScaleRange(args.scale, state, options);
  },

  beforeUpdate(chart, args, options) {
    if (helpers.isObject(options.annotations)) {
      const array = new Array();
      Object.keys(options.annotations).forEach(key => {
        const value = options.annotations[key];
        if (helpers.isObject(value)) {
          value.id = key;
          array.push(value);
        }
      });
      options.annotations = array;
    }
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    updateListeners(chart, state, options);
    updateElements(chart, state, options, args.mode);
  },

  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, options, 'beforeDatasetsDraw');
  },

  afterDatasetsDraw(chart, _args, options) {
    draw(chart, options, 'afterDatasetsDraw');
  },

  afterDraw(chart, _args, options) {
    draw(chart, options, 'afterDraw');
  },

  beforeEvent(chart, args, options) {
    const state = chartStates.get(chart);
    handleEvent(chart, state, args.event, options);
  },

  destroy(chart) {
    chartStates.delete(chart);
  },

  defaults: {
    drawTime: 'afterDatasetsDraw',
    dblClickSpeed: 350, // ms
    annotations: {},
    animation: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height'],
        type: 'number'
      },
    }
  },
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
  const chartAnims = chart.options.animation;
  const animOpts = chartAnims && helpers.merge({}, [chartAnims, options.animation]);
  const animations = resolveAnimations(chart, animOpts, mode);

  const annotations = options.annotations || [];
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i];
    let el = elements[i];
    const elType = annotationTypes[annotation.type] || annotationTypes.line;
    if (!el || !(el instanceof elType)) {
      el = elements[i] = new elType();
    }
    const display = typeof annotation.display === 'function' ? helpers.callback(annotation.display, [{chart, element: el}]) : helpers.valueOrDefault(annotation.display, true);
    el._display = !!display;

    if (el._display) {
      const properties = el.resolveElementProperties(chart, annotation);
      properties.options = helpers.merge(Object.create(null), [elType.defaults, annotation]);
      animations.update(el, properties);
    }
  }
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

function draw(chart, options, caller) {
  const {ctx, chartArea} = chart;
  const elements = chartStates.get(chart).elements.filter(el => el._display);

  helpers.clipArea(ctx, chartArea);
  elements.forEach(el => {
    if ((el.options.drawTime || options.drawTime || caller) === caller) {
      el.draw(ctx);
    }
  });
  elements.forEach(el => {
    if ('drawLabel' in el && el.options.label && (el.options.label.drawTime || el.options.drawTime || options.drawTime || caller) === caller) {
      el.drawLabel(ctx);
    }
  });
  helpers.unclipArea(ctx);
}

function getAnnotationOptions(elements, options) {
  if (elements && elements.length) {
    return elements.map(el => el.options);
  }
  return options.annotations || [];
}

function adjustScaleRange(scale, state, options) {
  const annotations = getAnnotationOptions(state.elements, options);
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
  const scaleIDOption = scale.axis + 'ScaleID';
  const scaleAnnotations = annotations.filter(annotation => annotation[scaleIDOption] === scaleID || annotation.scaleID === scaleID);
  let min = helpers.valueOrDefault(scale.min, Number.NEGATIVE_INFINITY);
  let max = helpers.valueOrDefault(scale.max, Number.POSITIVE_INFINITY);
  scaleAnnotations.forEach(annotation => {
    ['value', 'endValue', axis + 'Min', axis + 'Max', 'xValue', 'yValue'].forEach(prop => {
      if (prop in annotation) {
        const value = annotation[prop];
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    });
  });
  return {min, max};
}

chart_js.Chart.register(Annotation, BoxAnnotation, LineAnnotation, EllipseAnnotation, PointAnnotation);

return Annotation;

})));
