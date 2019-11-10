(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-drag'), require('d3-shape'), require('d3-dispatch')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-drag', 'd3-shape', 'd3-dispatch'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3Selection,d3Drag,d3Shape,d3Dispatch) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Annotation = function () {
  function Annotation(_ref) {
    var _ref$x = _ref.x,
        x = _ref$x === undefined ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === undefined ? 0 : _ref$y,
        nx = _ref.nx,
        ny = _ref.ny,
        _ref$dy = _ref.dy,
        dy = _ref$dy === undefined ? 0 : _ref$dy,
        _ref$dx = _ref.dx,
        dx = _ref$dx === undefined ? 0 : _ref$dx,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? "grey" : _ref$color,
        data = _ref.data,
        type = _ref.type,
        subject = _ref.subject,
        connector = _ref.connector,
        note = _ref.note,
        disable = _ref.disable,
        id = _ref.id,
        className = _ref.className;
    classCallCheck(this, Annotation);

    this._dx = nx !== undefined ? nx - x : dx;
    this._dy = ny !== undefined ? ny - y : dy;
    this._x = x;
    this._y = y;
    this._color = color;
    this.id = id;
    this._className = className || "";

    this._type = type || "";
    this.data = data;

    this.note = note || {};
    this.connector = connector || {};
    this.subject = subject || {};

    this.disable = disable || [];
  }

  createClass(Annotation, [{
    key: "updatePosition",
    value: function updatePosition() {
      if (this.type.setPosition) {
        this.type.setPosition();
        if (this.type.subject && this.type.subject.selectAll(":not(.handle)").nodes().length !== 0) {
          this.type.redrawSubject();
        }
      }
    }
  }, {
    key: "clearComponents",
    value: function clearComponents() {
      this.type.clearComponents && this.type.clearComponents();
    }
  }, {
    key: "updateOffset",
    value: function updateOffset() {
      if (this.type.setOffset) {
        this.type.setOffset();

        if (this.type.connector.selectAll(":not(.handle)").nodes().length !== 0) {
          this.type.redrawConnector();
        }

        this.type.redrawNote();
      }
    }
  }, {
    key: "className",
    get: function get$$1() {
      return this._className;
    },
    set: function set$$1(className) {
      this._className = className;
      if (this.type.setClassName) this.type.setClassName();
    }
  }, {
    key: "type",
    get: function get$$1() {
      return this._type;
    },
    set: function set$$1(type) {
      this._type = type;
      this.clearComponents();
    }
  }, {
    key: "x",
    get: function get$$1() {
      return this._x;
    },
    set: function set$$1(x) {
      this._x = x;
      this.updatePosition();
    }
  }, {
    key: "y",
    get: function get$$1() {
      return this._y;
    },
    set: function set$$1(y) {
      this._y = y;
      this.updatePosition();
    }
  }, {
    key: "color",
    get: function get$$1() {
      return this._color;
    },
    set: function set$$1(color) {
      this._color = color;
      this.updatePosition();
    }
  }, {
    key: "dx",
    get: function get$$1() {
      return this._dx;
    },
    set: function set$$1(dx) {
      this._dx = dx;
      this.updateOffset();
    }
  }, {
    key: "dy",
    get: function get$$1() {
      return this._dy;
    },
    set: function set$$1(dy) {
      this._dy = dy;
      this.updateOffset();
    }
  }, {
    key: "nx",
    set: function set$$1(nx) {
      this._dx = nx - this._x;
      this.updateOffset();
    }
  }, {
    key: "ny",
    set: function set$$1(ny) {
      this._dy = ny - this._y;
      this.updateOffset();
    }
  }, {
    key: "offset",
    get: function get$$1() {
      return { x: this._dx, y: this._dy };
    },
    set: function set$$1(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      this._dx = x;
      this._dy = y;
      this.updateOffset();
    }
  }, {
    key: "position",
    get: function get$$1() {
      return { x: this._x, y: this._y };
    },
    set: function set$$1(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;

      this._x = x;
      this._y = y;
      this.updatePosition();
    }
  }, {
    key: "translation",
    get: function get$$1() {
      return {
        x: this._x + this._dx,
        y: this._y + this._dy
      };
    }
  }, {
    key: "json",
    get: function get$$1() {
      var json = {
        x: this._x,
        y: this._y,
        dx: this._dx,
        dy: this._dy
      };

      if (this.data && Object.keys(this.data).length > 0) json.data = this.data;
      if (this.type) json.type = this.type;
      if (this._className) json.className = this._className;

      if (Object.keys(this.connector).length > 0) json.connector = this.connector;
      if (Object.keys(this.subject).length > 0) json.subject = this.subject;
      if (Object.keys(this.note).length > 0) json.note = this.note;

      return json;
    }
  }]);
  return Annotation;
}();

var AnnotationCollection = function () {
  function AnnotationCollection(_ref) {
    var annotations = _ref.annotations,
        accessors = _ref.accessors,
        accessorsInverse = _ref.accessorsInverse;
    classCallCheck(this, AnnotationCollection);

    this.accessors = accessors;
    this.accessorsInverse = accessorsInverse;
    this.annotations = annotations;
  }

  createClass(AnnotationCollection, [{
    key: "clearTypes",
    value: function clearTypes(newSettings) {
      this.annotations.forEach(function (d) {
        d.type = undefined;
        d.subject = newSettings && newSettings.subject || d.subject;
        d.connector = newSettings && newSettings.connector || d.connector;
        d.note = newSettings && newSettings.note || d.note;
      });
    }
  }, {
    key: "setPositionWithAccessors",
    value: function setPositionWithAccessors() {
      var _this = this;

      this.annotations.forEach(function (d) {
        d.type.setPositionWithAccessors(_this.accessors);
      });
    }
  }, {
    key: "editMode",
    value: function editMode(_editMode) {
      this.annotations.forEach(function (a) {
        if (a.type) {
          a.type.editMode = _editMode;
          a.type.updateEditMode();
        }
      });
    }
  }, {
    key: "updateDisable",
    value: function updateDisable(disable) {
      this.annotations.forEach(function (a) {
        a.disable = disable;
        if (a.type) {
          disable.forEach(function (d) {
            if (a.type[d]) {
              a.type[d].remove && a.type[d].remove();
              a.type[d] = undefined;
            }
          });
        }
      });
    }
  }, {
    key: "updateTextWrap",
    value: function updateTextWrap(textWrap) {
      this.annotations.forEach(function (a) {
        if (a.type && a.type.updateTextWrap) {
          a.type.updateTextWrap(textWrap);
        }
      });
    }
  }, {
    key: "updateText",
    value: function updateText() {
      this.annotations.forEach(function (a) {
        if (a.type && a.type.drawText) {
          a.type.drawText();
        }
      });
    }
  }, {
    key: "updateNotePadding",
    value: function updateNotePadding(notePadding) {
      this.annotations.forEach(function (a) {
        if (a.type) {
          a.type.notePadding = notePadding;
        }
      });
    }
  }, {
    key: "json",
    get: function get$$1() {
      var _this2 = this;

      return this.annotations.map(function (a) {
        var json = a.json;
        if (_this2.accessorsInverse && a.data) {
          json.data = {};
          Object.keys(_this2.accessorsInverse).forEach(function (k) {
            json.data[k] = _this2.accessorsInverse[k]({ x: a.x, y: a.y });

            //TODO make this feasible to map back to data for other types of subjects
          });
        }
        return json;
      });
    }
  }, {
    key: "noteNodes",
    get: function get$$1() {
      return this.annotations.map(function (a) {
        return _extends({}, a.type.getNoteBBoxOffset(), { positionX: a.x, positionY: a.y });
      });
    }

    //TODO: come back and rethink if a.x and a.y are applicable in all situations
    // get connectorNodes() {
    //   return this.annotations.map(a => ({ ...a.type.getConnectorBBox(), startX: a.x, startY: a.y}))
    // }

    // get subjectNodes() {
    //   return this.annotations.map(a => ({ ...a.type.getSubjectBBox(), startX: a.x, startY: a.y}))
    // }

    // get annotationNodes() {
    //   return this.annotations.map(a => ({ ...a.type.getAnnotationBBox(), startX: a.x, startY: a.y}))
    // }

  }]);
  return AnnotationCollection;
}();

var pointHandle = function pointHandle(_ref) {
  var _ref$cx = _ref.cx,
      cx = _ref$cx === undefined ? 0 : _ref$cx,
      _ref$cy = _ref.cy,
      cy = _ref$cy === undefined ? 0 : _ref$cy;

  return { move: { x: cx, y: cy } };
};

var circleHandles = function circleHandles(_ref2) {
  var _ref2$cx = _ref2.cx,
      cx = _ref2$cx === undefined ? 0 : _ref2$cx,
      _ref2$cy = _ref2.cy,
      cy = _ref2$cy === undefined ? 0 : _ref2$cy,
      r1 = _ref2.r1,
      r2 = _ref2.r2,
      padding = _ref2.padding;

  var h = { move: { x: cx, y: cy } };

  if (r1 !== undefined) {
    h.r1 = { x: cx + r1 / Math.sqrt(2), y: cy + r1 / Math.sqrt(2) };
  }

  if (r2 !== undefined) {
    h.r2 = { x: cx + r2 / Math.sqrt(2), y: cy + r2 / Math.sqrt(2) };
  }

  if (padding !== undefined) {
    h.padding = { x: cx + r1 + padding, y: cy };
  }

  return h;
};





//arc handles
var addHandles = function addHandles(_ref5) {
  var group = _ref5.group,
      handles = _ref5.handles,
      _ref5$r = _ref5.r,
      r = _ref5$r === undefined ? 10 : _ref5$r;

  //give it a group and x,y to draw handles
  //then give it instructions on what the handles change
  var h = group.selectAll("circle.handle").data(handles);

  h.enter().append("circle").attr("class", "handle").attr("fill", "grey").attr("fill-opacity", 0.1).attr("cursor", "move").attr("stroke-dasharray", 5).attr("stroke", "grey").call(d3Drag.drag().container(d3Selection.select("g.annotations").node()).on("start", function (d) {
    return d.start && d.start(d);
  }).on("drag", function (d) {
    return d.drag && d.drag(d);
  }).on("end", function (d) {
    return d.end && d.end(d);
  }));

  group.selectAll("circle.handle").attr("cx", function (d) {
    return d.x;
  }).attr("cy", function (d) {
    return d.y;
  }).attr("r", function (d) {
    return d.r || r;
  }).attr("class", function (d) {
    return "handle " + (d.className || "");
  });

  h.exit().remove();
};

var leftRightDynamic = function leftRightDynamic(align, y) {
  if (align === "dynamic" || align === "left" || align === "right") {
    if (y < 0) {
      align = "top";
    } else {
      align = "bottom";
    }
  }
  return align;
};

var topBottomDynamic = function topBottomDynamic(align, x) {
  if (align === "dynamic" || align === "top" || align === "bottom") {
    if (x < 0) {
      align = "right";
    } else {
      align = "left";
    }
  }
  return align;
};

var orientationTopBottom = ["topBottom", "top", "bottom"];
var orientationLeftRight = ["leftRight", "left", "right"];

var noteAlignment = (function (_ref) {
  var _ref$padding = _ref.padding,
      padding = _ref$padding === undefined ? 0 : _ref$padding,
      _ref$bbox = _ref.bbox,
      bbox = _ref$bbox === undefined ? { x: 0, y: 0, width: 0, height: 0 } : _ref$bbox,
      align = _ref.align,
      orientation = _ref.orientation,
      _ref$offset = _ref.offset,
      offset = _ref$offset === undefined ? { x: 0, y: 0 } : _ref$offset;

  var x = -bbox.x;
  var y = 0; //-bbox.y
  if (orientationTopBottom.indexOf(orientation) !== -1) {
    align = topBottomDynamic(align, offset.x);
    if (offset.y < 0 && orientation === "topBottom" || orientation === "top") {
      y -= bbox.height + padding;
    } else {
      y += padding;
    }

    if (align === "middle") {
      x -= bbox.width / 2;
    } else if (align === "right") {
      x -= bbox.width;
    }
  } else if (orientationLeftRight.indexOf(orientation) !== -1) {
    align = leftRightDynamic(align, offset.y);
    if (offset.x < 0 && orientation === "leftRight" || orientation === "left") {
      x -= bbox.width + padding;
    } else {
      x += padding;
    }

    if (align === "middle") {
      y -= bbox.height / 2;
    } else if (align === "top") {
      y -= bbox.height;
    }
  }

  return { x: x, y: y };
});

var lineBuilder = function lineBuilder(_ref) {
  var data = _ref.data,
      _ref$curve = _ref.curve,
      curve = _ref$curve === undefined ? d3Shape.curveLinear : _ref$curve,
      canvasContext = _ref.canvasContext,
      className = _ref.className,
      classID = _ref.classID;

  var lineGen = d3Shape.line().curve(curve);

  var builder = {
    type: 'path',
    className: className,
    classID: classID,
    data: data
  };

  if (canvasContext) {
    lineGen.context(canvasContext);
    builder.pathMethods = lineGen;
  } else {
    builder.attrs = {
      d: lineGen(data)
    };
  }

  return builder;
};

var arcBuilder = function arcBuilder(_ref2) {
  var data = _ref2.data,
      canvasContext = _ref2.canvasContext,
      className = _ref2.className,
      classID = _ref2.classID;


  var builder = {
    type: 'path',
    className: className,
    classID: classID,
    data: data
  };

  var arcShape = d3Shape.arc().innerRadius(data.innerRadius || 0).outerRadius(data.outerRadius || data.radius || 2).startAngle(data.startAngle || 0).endAngle(data.endAngle || 2 * Math.PI);

  if (canvasContext) {
    arcShape.context(canvasContext);
    builder.pathMethods = lineGen;
  } else {

    builder.attrs = {
      d: arcShape()
    };
  }

  return builder;
};

var noteVertical = (function (_ref) {
  var align = _ref.align,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      bbox = _ref.bbox,
      offset = _ref.offset;

  align = leftRightDynamic(align, offset.y);

  if (align === "top") {
    y -= bbox.height;
  } else if (align === "middle") {
    y -= bbox.height / 2;
  }

  var data = [[x, y], [x, y + bbox.height]];
  return { components: [lineBuilder({ data: data, className: "note-line" })] };
});

var noteHorizontal = (function (_ref) {
  var align = _ref.align,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      offset = _ref.offset,
      bbox = _ref.bbox;

  align = topBottomDynamic(align, offset.x);

  if (align === "right") {
    x -= bbox.width;
  } else if (align === "middle") {
    x -= bbox.width / 2;
  }

  var data = [[x, y], [x + bbox.width, y]];
  return { components: [lineBuilder({ data: data, className: "note-line" })] };
});

var lineSetup = function lineSetup(_ref) {
  var type = _ref.type,
      subjectType = _ref.subjectType;

  var annotation = type.annotation;
  var offset = annotation.position;

  var x1 = annotation.x - offset.x,
      x2 = x1 + annotation.dx,
      y1 = annotation.y - offset.y,
      y2 = y1 + annotation.dy;

  var subjectData = annotation.subject;

  if (subjectType === "circle" && (subjectData.outerRadius || subjectData.radius)) {
    var h = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    var angle = Math.asin(-y2 / h);
    var r = subjectData.outerRadius || subjectData.radius + (subjectData.radiusPadding || 0);

    x1 = Math.abs(Math.cos(angle) * r) * (x2 < 0 ? -1 : 1);
    y1 = Math.abs(Math.sin(angle) * r) * (y2 < 0 ? -1 : 1);
  }

  if (subjectType === "rect") {
    var width = subjectData.width,
        height = subjectData.height;


    if (width > 0 && annotation.dx > 0 || width < 0 && annotation.dx < 0) {
      if (Math.abs(width) > Math.abs(annotation.dx)) x1 = width / 2;else x1 = width;
    }
    if (height > 0 && annotation.dy > 0 || height < 0 && annotation.dy < 0) {
      if (Math.abs(height) > Math.abs(annotation.dy)) y1 = height / 2;else y1 = height;
    }
    if (x1 === width / 2 && y1 === height / 2) {
      x1 = x2;y1 = y2;
    }
  }

  return [[x1, y1], [x2, y2]];
};

var connectorLine = (function (connectorData) {
  var data = lineSetup(connectorData);
  return { components: [lineBuilder({ data: data, className: "connector" })] };
});

var connectorElbow = (function (_ref) {
  var type = _ref.type,
      subjectType = _ref.subjectType;


  var annotation = type.annotation;
  var offset = annotation.position;

  var x1 = annotation.x - offset.x,
      x2 = x1 + annotation.dx,
      y1 = annotation.y - offset.y,
      y2 = y1 + annotation.dy;

  var subjectData = annotation.subject;

  if (subjectType === "rect") {
    var width = subjectData.width,
        height = subjectData.height;


    if (width > 0 && annotation.dx > 0 || width < 0 && annotation.dx < 0) {
      if (Math.abs(width) > Math.abs(annotation.dx)) x1 = width / 2;else x1 = width;
    }
    if (height > 0 && annotation.dy > 0 || height < 0 && annotation.dy < 0) {
      if (Math.abs(height) > Math.abs(annotation.dy)) y1 = height / 2;else y1 = height;
    }
    if (x1 === width / 2 && y1 === height / 2) {
      x1 = x2;y1 = y2;
    }
  }

  var data = [[x1, y1], [x2, y2]];

  var diffY = y2 - y1;
  var diffX = x2 - x1;
  var xe = x2;
  var ye = y2;
  var opposite = y2 < y1 && x2 > x1 || x2 < x1 && y2 > y1 ? -1 : 1;

  if (Math.abs(diffX) < Math.abs(diffY)) {
    xe = x2;
    ye = y1 + diffX * opposite;
  } else {
    ye = y2;
    xe = x1 + diffY * opposite;
  }

  if (subjectType === "circle" && (subjectData.outerRadius || subjectData.radius)) {
    var r = (subjectData.outerRadius || subjectData.radius) + (subjectData.radiusPadding || 0);
    var length = r / Math.sqrt(2);

    if (Math.abs(diffX) > length && Math.abs(diffY) > length) {
      x1 = length * (x2 < 0 ? -1 : 1);
      y1 = length * (y2 < 0 ? -1 : 1);
      data = [[x1, y1], [xe, ye], [x2, y2]];
    } else if (Math.abs(diffX) > Math.abs(diffY)) {
      var angle = Math.asin(-y2 / r);
      x1 = Math.abs(Math.cos(angle) * r) * (x2 < 0 ? -1 : 1);
      data = [[x1, y2], [x2, y2]];
    } else {
      var _angle = Math.acos(x2 / r);
      y1 = Math.abs(Math.sin(_angle) * r) * (y2 < 0 ? -1 : 1);
      data = [[x2, y1], [x2, y2]];
    }
  } else {
    data = [[x1, y1], [xe, ye], [x2, y2]];
  }

  return { components: [lineBuilder({ data: data, className: "connector" })] };
});

var connectorCurve = (function (_ref) {
  var type = _ref.type,
      connectorData = _ref.connectorData,
      subjectType = _ref.subjectType;


  if (!connectorData) {
    connectorData = {};
  }
  if (!connectorData.points || typeof connectorData.points === "number") {
    connectorData.points = createPoints(type.annotation.offset, connectorData.points);
  }
  if (!connectorData.curve) {
    connectorData.curve = d3Shape.curveCatmullRom;
  }

  var handles = [];

  if (type.editMode) {
    var cHandles = connectorData.points.map(function (c, i) {
      return _extends({}, pointHandle({ cx: c[0], cy: c[1] }), { index: i });
    });

    var updatePoint = function updatePoint(index) {
      connectorData.points[index][0] += d3Selection.event.dx;
      connectorData.points[index][1] += d3Selection.event.dy;
      type.redrawConnector();
    };

    handles = type.mapHandles(cHandles.map(function (h) {
      return _extends({}, h.move, { drag: updatePoint.bind(type, h.index) });
    }));
  }

  var data = lineSetup({ type: type, subjectType: subjectType });
  data = [data[0]].concat(toConsumableArray(connectorData.points), [data[1]]);
  var components = [lineBuilder({ data: data, curve: connectorData.curve, className: "connector" })];

  return { components: components, handles: handles };
});

var createPoints = function createPoints(offset) {
  var anchors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var diff = { x: offset.x / (anchors + 1), y: offset.y / (anchors + 1) };
  var p = [];

  var i = 1;
  for (; i <= anchors; i++) {
    p.push([diff.x * i + i % 2 * 20, diff.y * i - i % 2 * 20]);
  }
  return p;
};

var connectorArrow = (function (_ref) {
  var annotation = _ref.annotation,
      start = _ref.start,
      end = _ref.end,
      _ref$scale = _ref.scale,
      scale = _ref$scale === undefined ? 1 : _ref$scale;

  var offset = annotation.position;
  if (!start) {
    start = [annotation.dx, annotation.dy];
  } else {
    start = [-end[0] + start[0], -end[1] + start[1]];
  }
  if (!end) {
    end = [annotation.x - offset.x, annotation.y - offset.y];
  }

  var x1 = end[0],
      y1 = end[1];

  var dx = start[0];
  var dy = start[1];

  var size = 10 * scale;
  var angleOffset = 16 / 180 * Math.PI;
  var angle = Math.atan(dy / dx);

  if (dx < 0) {
    angle += Math.PI;
  }

  var data = [[x1, y1], [Math.cos(angle + angleOffset) * size + x1, Math.sin(angle + angleOffset) * size + y1], [Math.cos(angle - angleOffset) * size + x1, Math.sin(angle - angleOffset) * size + y1], [x1, y1]];

  //TODO add in reverse
  // if (canvasContext.arrowReverse){
  //   data = [[x1, y1],
  //   [Math.cos(angle + angleOffset)*size, Math.sin(angle + angleOffset)*size],
  //   [Math.cos(angle - angleOffset)*size, Math.sin(angle - angleOffset)*size],
  //   [x1, y1]
  //   ]
  // } else {
  //   data = [[x1, y1],
  //   [Math.cos(angle + angleOffset)*size, Math.sin(angle + angleOffset)*size],
  //   [Math.cos(angle - angleOffset)*size, Math.sin(angle - angleOffset)*size],
  //   [x1, y1]
  //   ]
  // }

  return {
    components: [lineBuilder({
      data: data,
      className: "connector-end connector-arrow",
      classID: "connector-end"
    })]
  };
});

var connectorDot = (function (_ref) {
  var line$$1 = _ref.line,
      _ref$scale = _ref.scale,
      scale = _ref$scale === undefined ? 1 : _ref$scale;

  var dot = arcBuilder({
    className: "connector-end connector-dot",
    classID: "connector-end",
    data: { radius: 3 * Math.sqrt(scale) }
  });
  dot.attrs.transform = "translate(" + line$$1.data[0][0] + ", " + line$$1.data[0][1] + ")";

  return { components: [dot] };
});

var subjectCircle = (function (_ref) {
  var subjectData = _ref.subjectData,
      type = _ref.type;

  if (!subjectData.radius && !subjectData.outerRadius) {
    subjectData.radius = 20;
  }

  var handles = [];
  var c = arcBuilder({ data: subjectData, className: "subject" });
  if (type.editMode) {
    var h = circleHandles({
      r1: c.data.outerRadius || c.data.radius,
      r2: c.data.innerRadius,
      padding: subjectData.radiusPadding
    });

    var updateRadius = function updateRadius(attr) {
      var r = subjectData[attr] + d3Selection.event.dx * Math.sqrt(2);
      subjectData[attr] = r;
      type.redrawSubject();
      type.redrawConnector();
    };

    var cHandles = [_extends({}, h.r1, {
      drag: updateRadius.bind(type, subjectData.outerRadius !== undefined ? "outerRadius" : "radius")
    })];

    if (subjectData.innerRadius) {
      cHandles.push(_extends({}, h.r2, { drag: updateRadius.bind(type, "innerRadius") }));
    }
    handles = type.mapHandles(cHandles);
  }

  c.attrs["fill-opacity"] = 0;

  return { components: [c], handles: handles };
});

var subjectRect = (function (_ref) {
  var subjectData = _ref.subjectData,
      type = _ref.type;

  if (!subjectData.width) {
    subjectData.width = 100;
  }
  if (!subjectData.height) {
    subjectData.height = 100;
  }

  var handles = [];
  var width = subjectData.width,
      height = subjectData.height;


  var data = [[0, 0], [width, 0], [width, height], [0, height], [0, 0]];
  var rect = lineBuilder({ data: data, className: "subject" });

  if (type.editMode) {
    var updateWidth = function updateWidth() {
      subjectData.width = d3Selection.event.x;
      type.redrawSubject();
      type.redrawConnector();
    };

    var updateHeight = function updateHeight() {
      subjectData.height = d3Selection.event.y;
      type.redrawSubject();
      type.redrawConnector();
    };

    var rHandles = [{ x: width, y: height / 2, drag: updateWidth.bind(type) }, { x: width / 2, y: height, drag: updateHeight.bind(type) }];

    handles = type.mapHandles(rHandles);
  }
  rect.attrs["fill-opacity"] = 0.1;
  return { components: [rect], handles: handles };
});

var subjectThreshold = (function (_ref) {
  var subjectData = _ref.subjectData,
      type = _ref.type;

  var offset = type.annotation.position;

  var x1 = (subjectData.x1 !== undefined ? subjectData.x1 : offset.x) - offset.x,
      x2 = (subjectData.x2 !== undefined ? subjectData.x2 : offset.x) - offset.x,
      y1 = (subjectData.y1 !== undefined ? subjectData.y1 : offset.y) - offset.y,
      y2 = (subjectData.y2 !== undefined ? subjectData.y2 : offset.y) - offset.y;

  var data = [[x1, y1], [x2, y2]];
  return { components: [lineBuilder({ data: data, className: 'subject' })] };
});

var subjectBadge = (function (_ref) {
  var _ref$subjectData = _ref.subjectData,
      subjectData = _ref$subjectData === undefined ? {} : _ref$subjectData,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? {} : _ref$type;
  var annotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var typeSettings = type.typeSettings && type.typeSettings.subject;

  if (!subjectData.radius) {
    if (typeSettings && typeSettings.radius) {
      subjectData.radius = typeSettings.radius;
    } else {
      subjectData.radius = 14;
    }
  }
  if (!subjectData.x) {
    if (typeSettings && typeSettings.x) {
      subjectData.x = typeSettings.x;
    }
  }
  if (!subjectData.y) {
    if (typeSettings && typeSettings.y) {
      subjectData.y = typeSettings.y;
    }
  }

  var handles = [];
  var components = [];
  var radius = subjectData.radius;
  var innerRadius = radius * 0.7;
  var x = 0;
  var y = 0;

  var notCornerOffset = Math.sqrt(2) * radius;
  var placement = {
    xleftcorner: -radius,
    xrightcorner: radius,
    ytopcorner: -radius,
    ybottomcorner: radius,
    xleft: -notCornerOffset,
    xright: notCornerOffset,
    ytop: -notCornerOffset,
    ybottom: notCornerOffset
  };

  if (subjectData.x && !subjectData.y) {
    x = placement["x" + subjectData.x];
  } else if (subjectData.y && !subjectData.x) {
    y = placement["y" + subjectData.y];
  } else if (subjectData.x && subjectData.y) {
    x = placement["x" + subjectData.x + "corner"];
    y = placement["y" + subjectData.y + "corner"];
  }

  var transform = "translate(" + x + ", " + y + ")";
  var circlebg = arcBuilder({ className: "subject", data: { radius: radius } });
  circlebg.attrs.transform = transform;
  circlebg.attrs.fill = annotation.color;
  circlebg.attrs["stroke-linecap"] = "round";
  circlebg.attrs["stroke-width"] = "3px";

  var circle = arcBuilder({
    className: "subject-ring",
    data: { outerRadius: radius, innerRadius: innerRadius }
  });

  circle.attrs.transform = transform;
  // circle.attrs.fill = annotation.color
  circle.attrs["stroke-width"] = "3px";
  circle.attrs.fill = "white";

  var pointer = void 0;
  if (x && y || !x && !y) {
    pointer = lineBuilder({
      className: "subject-pointer",
      data: [[0, 0], [x || 0, 0], [0, y || 0], [0, 0]]
    });
  } else if (x || y) {
    var notCornerPointerXY = function notCornerPointerXY(v) {
      var sign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return v && v / Math.sqrt(2) / Math.sqrt(2) || sign * radius / Math.sqrt(2);
    };

    pointer = lineBuilder({
      className: "subject-pointer",
      data: [[0, 0], [notCornerPointerXY(x), notCornerPointerXY(y)], [notCornerPointerXY(x, -1), notCornerPointerXY(y, -1)], [0, 0]]
    });
  }

  if (pointer) {
    pointer.attrs.fill = annotation.color;
    pointer.attrs["stroke-linecap"] = "round";
    pointer.attrs["stroke-width"] = "3px";
    components.push(pointer);
  }

  if (type.editMode) {
    var dragBadge = function dragBadge() {
      subjectData.x = d3Selection.event.x < -radius * 2 ? "left" : d3Selection.event.x > radius * 2 ? "right" : undefined;
      subjectData.y = d3Selection.event.y < -radius * 2 ? "top" : d3Selection.event.y > radius * 2 ? "bottom" : undefined;

      type.redrawSubject();
    };

    var bHandles = { x: x * 2, y: y * 2, drag: dragBadge.bind(type) };
    if (!bHandles.x && !bHandles.y) {
      bHandles.y = -radius;
    }

    handles = type.mapHandles([bHandles]);
  }

  var text = void 0;
  if (subjectData.text) {
    text = {
      type: "text",
      className: "badge-text",
      attrs: {
        fill: "white",
        stroke: "none",
        "font-size": ".7em",
        text: subjectData.text,
        "text-anchor": "middle",
        dy: ".25em",
        x: x,
        y: y
      }
    };
  }

  components.push(circlebg);
  components.push(circle);
  components.push(text);

  return { components: components, handles: handles };
});

//Note options
//Connector options
//Subject options
var Type = function () {
  function Type(_ref) {
    var a = _ref.a,
        annotation = _ref.annotation,
        editMode = _ref.editMode,
        dispatcher = _ref.dispatcher,
        notePadding = _ref.notePadding,
        accessors = _ref.accessors;
    classCallCheck(this, Type);

    this.a = a;

    this.note = annotation.disable.indexOf("note") === -1 && a.select("g.annotation-note");
    this.noteContent = this.note && a.select("g.annotation-note-content");
    this.connector = annotation.disable.indexOf("connector") === -1 && a.select("g.annotation-connector");
    this.subject = annotation.disable.indexOf("subject") === -1 && a.select("g.annotation-subject");
    this.dispatcher = dispatcher;

    if (dispatcher) {
      var handler = addHandlers.bind(null, dispatcher, annotation);
      handler({ component: this.note, name: "note" });
      handler({ component: this.connector, name: "connector" });
      handler({ component: this.subject, name: "subject" });
    }

    this.annotation = annotation;
    this.editMode = annotation.editMode || editMode;
    this.notePadding = notePadding !== undefined ? notePadding : 3;
    this.offsetCornerX = 0;
    this.offsetCornerY = 0;

    if (accessors && annotation.data) {
      this.init(accessors);
    }
  }

  createClass(Type, [{
    key: "init",
    value: function init(accessors) {
      if (!this.annotation.x) {
        this.mapX(accessors);
      }
      if (!this.annotation.y) {
        this.mapY(accessors);
      }
    }
  }, {
    key: "mapY",
    value: function mapY(accessors) {
      if (accessors.y) {
        this.annotation.y = accessors.y(this.annotation.data);
      }
    }
  }, {
    key: "mapX",
    value: function mapX(accessors) {
      if (accessors.x) {
        this.annotation.x = accessors.x(this.annotation.data);
      }
    }
  }, {
    key: "updateEditMode",
    value: function updateEditMode() {
      this.a.selectAll("circle.handle").remove();
    }
  }, {
    key: "drawOnSVG",
    value: function drawOnSVG(component, builders) {
      var _this = this;

      if (!Array.isArray(builders)) {
        builders = [builders];
      }

      builders.filter(function (b) {
        return b;
      }).forEach(function (_ref2) {
        var type = _ref2.type,
            className = _ref2.className,
            attrs = _ref2.attrs,
            handles = _ref2.handles,
            classID = _ref2.classID;

        if (type === "handle") {
          addHandles({ group: component, r: attrs && attrs.r, handles: handles });
        } else {
          newWithClass(component, [_this.annotation], type, className, classID);
          var el = component.select(type + "." + (classID || className));
          var addAttrs = Object.keys(attrs);
          var removeAttrs = [];

          var currentAttrs = el.node().attributes;
          for (var i = currentAttrs.length - 1; i >= 0; i--) {
            var name = currentAttrs[i].name;
            if (addAttrs.indexOf(name) === -1 && name !== "class") removeAttrs.push(name);
          }

          addAttrs.forEach(function (attr) {
            if (attr === "text") {
              el.text(attrs[attr]);
            } else {
              el.attr(attr, attrs[attr]);
            }
          });

          removeAttrs.forEach(function (attr) {
            return el.attr(attr, null);
          });
        }
      });
    }

    //TODO: how to extend this to a drawOnCanvas mode?

  }, {
    key: "getNoteBBox",
    value: function getNoteBBox() {
      return bboxWithoutHandles(this.note, ".annotation-note-content text");
    }
  }, {
    key: "getNoteBBoxOffset",
    value: function getNoteBBoxOffset() {
      var bbox = bboxWithoutHandles(this.note, ".annotation-note-content");
      var transform = this.noteContent.attr("transform").split(/\(|\,|\)/g);
      bbox.offsetCornerX = parseFloat(transform[1]) + this.annotation.dx;
      bbox.offsetCornerY = parseFloat(transform[2]) + this.annotation.dy;
      bbox.offsetX = this.annotation.dx;
      bbox.offsetY = this.annotation.dy;
      return bbox;
    }
  }, {
    key: "drawSubject",
    value: function drawSubject() {
      var _this2 = this;

      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var subjectData = this.annotation.subject;
      var type = context.type;
      var subjectParams = { type: this, subjectData: subjectData };

      var subject = {};
      if (type === "circle") subject = subjectCircle(subjectParams);else if (type === "rect") subject = subjectRect(subjectParams);else if (type === "threshold") subject = subjectThreshold(subjectParams);else if (type === "badge") subject = subjectBadge(subjectParams, this.annotation);

      var _subject = subject,
          _subject$components = _subject.components,
          components = _subject$components === undefined ? [] : _subject$components,
          _subject$handles = _subject.handles,
          handles = _subject$handles === undefined ? [] : _subject$handles;

      components.forEach(function (c) {
        if (c && c.attrs && !c.attrs.stroke) {
          c.attrs.stroke = _this2.annotation.color;
        }
      });

      if (this.editMode) {
        handles = handles.concat(this.mapHandles([{ drag: this.dragSubject.bind(this) }]));
        components.push({ type: "handle", handles: handles });
      }

      return components;
    }
  }, {
    key: "drawConnector",
    value: function drawConnector() {
      var _this3 = this;

      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var connectorData = this.annotation.connector;
      var type = connectorData.type || context.type;
      var connectorParams = { type: this, connectorData: connectorData };
      connectorParams.subjectType = this.typeSettings && this.typeSettings.subject && this.typeSettings.subject.type;

      var connector = {};
      if (type === "curve") connector = connectorCurve(connectorParams);else if (type === "elbow") connector = connectorElbow(connectorParams);else connector = connectorLine(connectorParams);
      var _connector = connector,
          _connector$components = _connector.components,
          components = _connector$components === undefined ? [] : _connector$components,
          _connector$handles = _connector.handles,
          handles = _connector$handles === undefined ? [] : _connector$handles;

      var line$$1 = components[0];
      //TODO: genericize this into fill t/f stroke t/f
      if (line$$1) {
        line$$1.attrs.stroke = this.annotation.color;
        line$$1.attrs.fill = "none";
      }
      var endType = connectorData.end || context.end;
      var end = {};
      if (endType === "arrow") {
        var s = line$$1.data[1];
        var e = line$$1.data[0];
        var distance = Math.sqrt(Math.pow(s[0] - e[0], 2) + Math.pow(s[1] - e[1], 2));
        if (distance < 5 && line$$1.data[2]) {
          s = line$$1.data[2];
        }
        end = connectorArrow({
          annotation: this.annotation,
          start: s,
          end: e,
          scale: connectorData.endScale
        });
      } else if (endType === "dot") {
        end = connectorDot({ line: line$$1, scale: connectorData.endScale });
      } else if (!endType || endType === "none") {
        this.connector && this.connector.select(".connector-end").remove();
      }

      if (end.components) {
        end.components.forEach(function (c) {
          c.attrs.fill = _this3.annotation.color;
          c.attrs.stroke = _this3.annotation.color;
        });
        components = components.concat(end.components);
      }

      if (this.editMode) {
        if (handles.length !== 0) components.push({ type: "handle", handles: handles });
      }
      return components;
    }
  }, {
    key: "drawNote",
    value: function drawNote() {
      var _this4 = this;

      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var noteData = this.annotation.note;
      var align = noteData.align || context.align || "dynamic";
      var noteParams = {
        bbox: context.bbox,
        align: align,
        offset: this.annotation.offset
      };
      var lineType = noteData.lineType || context.lineType;
      var note = {};
      if (lineType === "vertical") note = noteVertical(noteParams);else if (lineType === "horizontal") note = noteHorizontal(noteParams);

      var _note = note,
          _note$components = _note.components,
          components = _note$components === undefined ? [] : _note$components,
          _note$handles = _note.handles,
          handles = _note$handles === undefined ? [] : _note$handles;

      components.forEach(function (c) {
        c.attrs.stroke = _this4.annotation.color;
      });

      if (this.editMode) {
        handles = this.mapHandles([{ x: 0, y: 0, drag: this.dragNote.bind(this) }]);
        components.push({ type: "handle", handles: handles });

        var dragging = this.dragNote.bind(this),
            start = this.dragstarted.bind(this),
            end = this.dragended.bind(this);
        this.note.call(d3Drag.drag().container(d3Selection.select("g.annotations").node()).on("start", function (d) {
          return start(d);
        }).on("drag", function (d) {
          return dragging(d);
        }).on("end", function (d) {
          return end(d);
        }));
      } else {
        this.note.on("mousedown.drag", null);
      }
      return components;
    }
  }, {
    key: "drawNoteContent",
    value: function drawNoteContent(context) {
      var noteData = this.annotation.note;
      var padding = noteData.padding !== undefined ? noteData.padding : this.notePadding;
      var orientation = noteData.orientation || context.orientation || "topBottom";
      var lineType = noteData.lineType || context.lineType;
      var align = noteData.align || context.align || "dynamic";

      if (lineType === "vertical") orientation = "leftRight";else if (lineType === "horizontal") orientation = "topBottom";

      var noteParams = {
        padding: padding,
        bbox: context.bbox,
        offset: this.annotation.offset,
        orientation: orientation,
        align: align
      };

      var _noteAlignment = noteAlignment(noteParams),
          x = _noteAlignment.x,
          y = _noteAlignment.y;

      this.offsetCornerX = x + this.annotation.dx;
      this.offsetCornerY = y + this.annotation.dy;
      this.note && this.noteContent.attr("transform", "translate(" + x + ", " + y + ")");

      return [];
    }
  }, {
    key: "drawOnScreen",
    value: function drawOnScreen(component, drawFunction) {
      return this.drawOnSVG(component, drawFunction);
    }
  }, {
    key: "redrawSubject",
    value: function redrawSubject() {
      this.subject && this.drawOnScreen(this.subject, this.drawSubject());
    }
  }, {
    key: "redrawConnector",
    value: function redrawConnector() {
      this.connector && this.drawOnScreen(this.connector, this.drawConnector());
    }
  }, {
    key: "redrawNote",
    value: function redrawNote() {
      var bbox = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getNoteBBox();

      this.noteContent && this.drawOnScreen(this.noteContent, this.drawNoteContent({ bbox: bbox }));
      this.note && this.drawOnScreen(this.note, this.drawNote({ bbox: bbox }));
    }
  }, {
    key: "setPosition",
    value: function setPosition() {
      var position = this.annotation.position;
      this.a.attr("transform", "translate(" + position.x + ", " + position.y + ")");
    }
  }, {
    key: "clearComponents",
    value: function clearComponents() {
      this.subject && this.subject.select("*").remove();
      this.connector && this.connector.select("*").remove();
      // this.note && this.note.select("*").remove()
    }
  }, {
    key: "setOffset",
    value: function setOffset() {
      if (this.note) {
        var offset = this.annotation.offset;
        this.note.attr("transform", "translate(" + offset.x + ", " + offset.y + ")");
      }
    }
  }, {
    key: "setPositionWithAccessors",
    value: function setPositionWithAccessors(accessors) {
      if (accessors && this.annotation.data) {
        this.mapX(accessors);
        this.mapY(accessors);
      }
      this.setPosition();
    }
  }, {
    key: "setClassName",
    value: function setClassName() {
      this.a.attr("class", "annotation " + (this.className && this.className()) + " " + (this.editMode ? "editable" : "") + " " + (this.annotation.className || ""));
    }
  }, {
    key: "draw",
    value: function draw() {
      this.setClassName();
      this.setPosition();
      this.setOffset();
      this.redrawSubject();
      this.redrawConnector();
      this.redrawNote();
    }
  }, {
    key: "dragstarted",
    value: function dragstarted() {
      d3Selection.event.sourceEvent.stopPropagation();
      this.dispatcher && this.dispatcher.call("dragstart", this.a, this.annotation);
      this.a.classed("dragging", true);
      this.a.selectAll("circle.handle").style("pointer-events", "none");
    }
  }, {
    key: "dragended",
    value: function dragended() {
      this.dispatcher && this.dispatcher.call("dragend", this.a, this.annotation);
      this.a.classed("dragging", false);
      this.a.selectAll("circle.handle").style("pointer-events", "all");
    }
  }, {
    key: "dragSubject",
    value: function dragSubject() {
      var position = this.annotation.position;
      position.x += d3Selection.event.dx;
      position.y += d3Selection.event.dy;
      this.annotation.position = position;
    }
  }, {
    key: "dragNote",
    value: function dragNote() {
      var offset = this.annotation.offset;
      offset.x += d3Selection.event.dx;
      offset.y += d3Selection.event.dy;
      this.annotation.offset = offset;
    }
  }, {
    key: "mapHandles",
    value: function mapHandles(handles) {
      var _this5 = this;

      return handles.map(function (h) {
        return _extends({}, h, {
          start: _this5.dragstarted.bind(_this5),
          end: _this5.dragended.bind(_this5)
        });
      });
    }
  }]);
  return Type;
}();

var customType = function customType(initialType, typeSettings, _init) {
  return function (_initialType) {
    inherits(customType, _initialType);

    function customType(settings) {
      classCallCheck(this, customType);

      var _this6 = possibleConstructorReturn(this, (customType.__proto__ || Object.getPrototypeOf(customType)).call(this, settings));

      _this6.typeSettings = typeSettings;

      if (typeSettings.disable) {
        typeSettings.disable.forEach(function (d) {
          _this6[d] && _this6[d].remove();

          _this6[d] = undefined;
          if (d === "note") {
            _this6.noteContent = undefined;
          }
        });
      }
      return _this6;
    }

    createClass(customType, [{
      key: "className",
      value: function className() {
        return "" + (typeSettings.className || get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "className", this) && get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "className", this).call(this) || "");
      }
    }, {
      key: "drawSubject",
      value: function drawSubject(context) {
        this.typeSettings.subject = _extends({}, typeSettings.subject, this.typeSettings.subject);
        return get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "drawSubject", this).call(this, _extends({}, context, this.typeSettings.subject));
      }
    }, {
      key: "drawConnector",
      value: function drawConnector(context) {
        this.typeSettings.connector = _extends({}, typeSettings.connector, this.typeSettings.connector);
        return get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "drawConnector", this).call(this, _extends({}, context, typeSettings.connector, this.typeSettings.connector));
      }
    }, {
      key: "drawNote",
      value: function drawNote(context) {
        this.typeSettings.note = _extends({}, typeSettings.note, this.typeSettings.note);
        return get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "drawNote", this).call(this, _extends({}, context, typeSettings.note, this.typeSettings.note));
      }
    }, {
      key: "drawNoteContent",
      value: function drawNoteContent(context) {
        return get(customType.prototype.__proto__ || Object.getPrototypeOf(customType.prototype), "drawNoteContent", this).call(this, _extends({}, context, typeSettings.note, this.typeSettings.note));
      }
    }], [{
      key: "init",
      value: function init(annotation, accessors) {
        get(customType.__proto__ || Object.getPrototypeOf(customType), "init", this).call(this, annotation, accessors);
        if (_init) {
          annotation = _init(annotation, accessors);
        }
        return annotation;
      }
    }]);
    return customType;
  }(initialType);
};

var d3NoteText = function (_Type) {
  inherits(d3NoteText, _Type);

  function d3NoteText(params) {
    classCallCheck(this, d3NoteText);

    var _this7 = possibleConstructorReturn(this, (d3NoteText.__proto__ || Object.getPrototypeOf(d3NoteText)).call(this, params));

    _this7.textWrap = params.textWrap || 120;
    _this7.drawText();
    return _this7;
  }

  createClass(d3NoteText, [{
    key: "updateTextWrap",
    value: function updateTextWrap(textWrap) {
      this.textWrap = textWrap;
      this.drawText();
    }

    //TODO: add update text functionality

  }, {
    key: "drawText",
    value: function drawText() {
      if (this.note) {
        newWithClass(this.note, [this.annotation], "g", "annotation-note-content");

        var noteContent = this.note.select("g.annotation-note-content");
        newWithClass(noteContent, [this.annotation], "rect", "annotation-note-bg");
        newWithClass(noteContent, [this.annotation], "text", "annotation-note-label");
        newWithClass(noteContent, [this.annotation], "text", "annotation-note-title");

        var titleBBox = { height: 0 };
        var label = this.a.select("text.annotation-note-label");
        var wrapLength = this.annotation.note && this.annotation.note.wrap || this.typeSettings && this.typeSettings.note && this.typeSettings.note.wrap || this.textWrap;

        var wrapSplitter = this.annotation.note && this.annotation.note.wrapSplitter || this.typeSettings && this.typeSettings.note && this.typeSettings.note.wrapSplitter;

        var bgPadding = this.annotation.note && this.annotation.note.bgPadding || this.typeSettings && this.typeSettings.note && this.typeSettings.note.bgPadding;

        var bgPaddingFinal = { top: 0, bottom: 0, left: 0, right: 0 };
        if (typeof bgPadding === "number") {
          bgPaddingFinal = {
            top: bgPadding,
            bottom: bgPadding,
            left: bgPadding,
            right: bgPadding
          };
        } else if (bgPadding && (typeof bgPadding === "undefined" ? "undefined" : _typeof(bgPadding)) === "object") {
          bgPaddingFinal = _extends(bgPaddingFinal, bgPadding);
        }

        if (this.annotation.note.title) {
          var title = this.a.select("text.annotation-note-title");
          title.text(this.annotation.note.title);
          title.attr("fill", this.annotation.color);
          title.attr("font-weight", "bold");
          title.call(wrap, wrapLength, wrapSplitter);
          titleBBox = title.node().getBBox();
        }

        label.text(this.annotation.note.label).attr("dx", "0");
        label.call(wrap, wrapLength, wrapSplitter);

        label.attr("y", titleBBox.height * 1.1 || 0);
        label.attr("fill", this.annotation.color);

        var bbox = this.getNoteBBox();

        this.a.select("rect.annotation-note-bg").attr("width", bbox.width + bgPaddingFinal.left + bgPaddingFinal.right).attr("height", bbox.height + bgPaddingFinal.top + bgPaddingFinal.bottom).attr("x", bbox.x - bgPaddingFinal.left).attr("y", -bgPaddingFinal.top).attr("fill", "white").attr("fill-opacity", 0);
      }
    }
  }]);
  return d3NoteText;
}(Type);

var d3Label = customType(d3NoteText, {
  className: "label",
  note: { align: "middle" }
});

var d3Callout = customType(d3NoteText, {
  className: "callout",
  note: { lineType: "horizontal" }
});

var d3CalloutElbow = customType(d3Callout, {
  className: "callout elbow",
  connector: { type: "elbow" }
});

var d3CalloutCurve = customType(d3Callout, {
  className: "callout curve",
  connector: { type: "curve" }
});

var d3Badge = customType(Type, {
  className: "badge",
  subject: { type: "badge" },
  disable: ["connector", "note"]
});

var d3CalloutCircle = customType(d3NoteText, {
  className: "callout circle",
  subject: { type: "circle" },
  note: { lineType: "horizontal" },
  connector: { type: "elbow" }
});

var d3CalloutRect = customType(d3NoteText, {
  className: "callout rect",
  subject: { type: "rect" },
  note: { lineType: "horizontal" },
  connector: { type: "elbow" }
});

var ThresholdMap = function (_d3Callout) {
  inherits(ThresholdMap, _d3Callout);

  function ThresholdMap() {
    classCallCheck(this, ThresholdMap);
    return possibleConstructorReturn(this, (ThresholdMap.__proto__ || Object.getPrototypeOf(ThresholdMap)).apply(this, arguments));
  }

  createClass(ThresholdMap, [{
    key: "mapY",
    value: function mapY(accessors) {
      get(ThresholdMap.prototype.__proto__ || Object.getPrototypeOf(ThresholdMap.prototype), "mapY", this).call(this, accessors);
      var a = this.annotation;
      if ((a.subject.x1 || a.subject.x2) && a.data && accessors.y) {
        a.y = accessors.y(a.data);
      }
      if ((a.subject.x1 || a.subject.x2) && !a.x) {
        a.x = a.subject.x1 || a.subject.x2;
      }
    }
  }, {
    key: "mapX",
    value: function mapX(accessors) {
      get(ThresholdMap.prototype.__proto__ || Object.getPrototypeOf(ThresholdMap.prototype), "mapX", this).call(this, accessors);
      var a = this.annotation;
      if ((a.subject.y1 || a.subject.y2) && a.data && accessors.x) {
        a.x = accessors.x(a.data);
      }
      if ((a.subject.y1 || a.subject.y2) && !a.y) {
        a.y = a.subject.y1 || a.subject.y2;
      }
    }
  }]);
  return ThresholdMap;
}(d3Callout);

var d3XYThreshold = customType(ThresholdMap, {
  className: "callout xythreshold",
  subject: { type: "threshold" }
});

var newWithClass = function newWithClass(a, d, type, className, classID) {
  var group = a.selectAll(type + "." + (classID || className)).data(d);
  group.enter().append(type).merge(group).attr("class", className);

  group.exit().remove();
  return a;
};

var addHandlers = function addHandlers(dispatcher, annotation, _ref3) {
  var component = _ref3.component,
      name = _ref3.name;

  if (component) {
    component.on("mouseover.annotations", function () {
      dispatcher.call(name + "over", component, annotation);
    }).on("mouseout.annotations", function () {
      return dispatcher.call(name + "out", component, annotation);
    }).on("click.annotations", function () {
      return dispatcher.call(name + "click", component, annotation);
    });
  }
};

//Text wrapping code adapted from Mike Bostock
var wrap = function wrap(text, width, wrapSplitter) {
  var lineHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.2;

  text.each(function () {
    var text = d3Selection.select(this),
        words = text.text().split(wrapSplitter || /[ \t\r\n]+/).reverse().filter(function (w) {
      return w !== "";
    });
    var word = void 0,
        line$$1 = [],
        tspan = text.text(null).append("tspan").attr("x", 0).attr("dy", 0.8 + "em");

    while (word = words.pop()) {
      line$$1.push(word);
      tspan.text(line$$1.join(" "));
      if (tspan.node().getComputedTextLength() > width && line$$1.length > 1) {
        line$$1.pop();
        tspan.text(line$$1.join(" "));
        line$$1 = [word];
        tspan = text.append("tspan").attr("x", 0).attr("dy", lineHeight + "em").text(word);
      }
    }
  });
};

var bboxWithoutHandles = function bboxWithoutHandles(selection) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ":not(.handle)";

  if (!selection) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return selection.selectAll(selector).nodes().reduce(function (p, c) {
    var bbox = c.getBBox();
    p.x = Math.min(p.x, bbox.x);
    p.y = Math.min(p.y, bbox.y);
    p.width = Math.max(p.width, bbox.width);

    var yOffset = c && c.attributes && c.attributes.y;
    p.height = Math.max(p.height, (yOffset && parseFloat(yOffset.value) || 0) + bbox.height);
    return p;
  }, { x: 0, y: 0, width: 0, height: 0 });
};

function annotation() {
  var annotations = [],
      collection = void 0,
      context = void 0,
      //TODO: add canvas functionality
  disable = [],
      accessors = {},
      accessorsInverse = {},
      editMode = false,
      ids = void 0,
      type = d3Callout,
      textWrap = void 0,
      notePadding = void 0,
      annotationDispatcher = d3Dispatch.dispatch("subjectover", "subjectout", "subjectclick", "connectorover", "connectorout", "connectorclick", "noteover", "noteout", "noteclick", "dragend", "dragstart"),
      sel = void 0;

  var annotation = function annotation(selection) {
    sel = selection;
    //TODO: check to see if this is still needed
    if (!editMode) {
      selection.selectAll("circle.handle").remove();
    }

    var translatedAnnotations = annotations.map(function (a) {
      if (!a.type) {
        a.type = type;
      }
      if (!a.disable) {
        a.disable = disable;
      }
      return new Annotation(a);
    });

    collection = collection || new AnnotationCollection({
      annotations: translatedAnnotations,
      accessors: accessors,
      accessorsInverse: accessorsInverse,
      ids: ids
    });

    var annotationG = selection.selectAll("g").data([collection]);
    annotationG.enter().append("g").attr("class", "annotations");

    var group = selection.select("g.annotations");
    newWithClass(group, collection.annotations, "g", "annotation");

    var annotation = group.selectAll("g.annotation");

    annotation.each(function (d) {
      var a = d3Selection.select(this);

      a.attr("class", "annotation");

      newWithClass(a, [d], "g", "annotation-connector");
      newWithClass(a, [d], "g", "annotation-subject");
      newWithClass(a, [d], "g", "annotation-note");
      newWithClass(a.select("g.annotation-note"), [d], "g", "annotation-note-content");
      d.type = d.type.toString() === "[object Object]" ? d.type : new d.type({
        a: a,
        annotation: d,
        textWrap: textWrap,
        notePadding: notePadding,
        editMode: editMode,
        dispatcher: annotationDispatcher,
        accessors: accessors
      });
      d.type.draw();
      d.type.drawText && d.type.drawText();
    });
  };

  annotation.json = function () {
    /* eslint-disable no-console */
    console.log("Annotations JSON was copied to your clipboard. Please note the annotation type is not JSON compatible. It appears in the objects array in the console, but not in the copied JSON.", collection.json);
    /* eslint-enable no-console */
    window.copy(JSON.stringify(collection.json.map(function (a) {
      delete a.type;
      return a;
    })));
    return annotation;
  };

  annotation.update = function () {
    if (annotations && collection) {
      annotations = collection.annotations.map(function (a) {
        a.type.draw();
        return a;
      });
    }
    return annotation;
  };

  annotation.updateText = function () {
    if (collection) {
      collection.updateText(textWrap);
      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.updatedAccessors = function () {
    collection.setPositionWithAccessors();
    annotations = collection.annotations;
    return annotation;
  };

  annotation.disable = function (_) {
    if (!arguments.length) return disable;
    disable = _;
    if (collection) {
      collection.updateDisable(disable);
      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.textWrap = function (_) {
    if (!arguments.length) return textWrap;
    textWrap = _;
    if (collection) {
      collection.updateTextWrap(textWrap);
      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.notePadding = function (_) {
    if (!arguments.length) return notePadding;
    notePadding = _;
    if (collection) {
      collection.updateNotePadding(notePadding);
      annotations = collection.annotations;
    }
    return annotation;
  };
  //todo think of how to handle when undefined is sent
  annotation.type = function (_, settings) {
    if (!arguments.length) return type;
    type = _;
    if (collection) {
      collection.annotations.map(function (a) {
        a.type.note && a.type.note.selectAll("*:not(.annotation-note-content)").remove();
        a.type.noteContent && a.type.noteContent.selectAll("*").remove();
        a.type.subject && a.type.subject.selectAll("*").remove();
        a.type.connector && a.type.connector.selectAll("*").remove();
        a.type.typeSettings = {};
        a.type = type;

        a.subject = settings && settings.subject || a.subject;
        a.connector = settings && settings.connector || a.connector;
        a.note = settings && settings.note || a.note;
      });

      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.annotations = function (_) {
    if (!arguments.length) return collection && collection.annotations || annotations;
    annotations = _;

    if (collection && collection.annotations) {
      var rerun = annotations.some(function (d) {
        return !d.type || d.type.toString() !== "[object Object]";
      });

      if (rerun) {
        collection = null;
        annotation(sel);
      } else {
        collection.annotations = annotations;
      }
    }
    return annotation;
  };

  annotation.context = function (_) {
    if (!arguments.length) return context;
    context = _;
    return annotation;
  };

  annotation.accessors = function (_) {
    if (!arguments.length) return accessors;
    accessors = _;
    return annotation;
  };

  annotation.accessorsInverse = function (_) {
    if (!arguments.length) return accessorsInverse;
    accessorsInverse = _;
    return annotation;
  };

  annotation.ids = function (_) {
    if (!arguments.length) return ids;
    ids = _;
    return annotation;
  };

  annotation.editMode = function (_) {
    if (!arguments.length) return editMode;
    editMode = _;

    if (sel) {
      sel.selectAll("g.annotation").classed("editable", editMode);
    }

    if (collection) {
      collection.editMode(editMode);
      annotations = collection.annotations;
    }
    return annotation;
  };

  annotation.collection = function (_) {
    if (!arguments.length) return collection;
    collection = _;
    return annotation;
  };

  annotation.on = function () {
    var value = annotationDispatcher.on.apply(annotationDispatcher, arguments);
    return value === annotationDispatcher ? annotation : value;
  };

  return annotation;
}

var index = {
  annotation: annotation,
  annotationTypeBase: Type,
  annotationLabel: d3Label,
  annotationCallout: d3Callout,
  annotationCalloutCurve: d3CalloutCurve,
  annotationCalloutElbow: d3CalloutElbow,
  annotationCalloutCircle: d3CalloutCircle,
  annotationCalloutRect: d3CalloutRect,
  annotationXYThreshold: d3XYThreshold,
  annotationBadge: d3Badge,
  annotationCustomType: customType
};

exports.annotation = annotation;
exports.annotationTypeBase = Type;
exports.annotationLabel = d3Label;
exports.annotationCallout = d3Callout;
exports.annotationCalloutCurve = d3CalloutCurve;
exports.annotationCalloutElbow = d3CalloutElbow;
exports.annotationCalloutCircle = d3CalloutCircle;
exports.annotationCalloutRect = d3CalloutRect;
exports.annotationXYThreshold = d3XYThreshold;
exports.annotationBadge = d3Badge;
exports.annotationCustomType = customType;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=d3-annotation.js.map
