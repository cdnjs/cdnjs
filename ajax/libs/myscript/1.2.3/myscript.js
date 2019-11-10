/**
 * Polyfills
 */
(function () {
    /**
     * CustomEvent
     */
    function CustomEvent ( event, params ) {    // jshint ignore:line
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;

    /**
     * bind()
     */
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs   = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP    = function() {},
                fBound  = function() {
                    return fToBind.apply(this instanceof fNOP ? this : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP(); // jshint ignore:line

            return fBound;
        };
    }
})();

/**
 * MyScript javascript library
 *
 * @module MyScript
 * @requires Q
 * @requires CryptoJS
 */
/*global MyScript:true */
MyScript = {
    RecognitionType: {
        TEXT: 'TEXT',
        MATH: 'MATH',
        SHAPE: 'SHAPE',
        MUSIC: 'MUSIC',
        ANALYZER: 'ANALYZER'
    },
    InputMode: {
        CURSIVE: 'CURSIVE',
        ISOLATED: 'ISOLATED',
        SUPERIMPOSED: 'SUPERIMPOSED',
        VERTICAL: 'VERTICAL'
    },
    InputType: {
        CHAR: 'CHAR',
        WORD: 'WORD',
        SINGLE_LINE_TEXT: 'SINGLE_LINE_TEXT',
        MULTI_LINE_TEXT: 'MULTI_LINE_TEXT'
    },
    ResultDetail: {
        TEXT: 'TEXT',
        WORD: 'WORD',
        CHARACTER: 'CHARACTER'
    },
    ResultType: {
        Math: {
            LATEX: 'LATEX',
            MATHML: 'MATHML',
            SYMBOLTREE: 'SYMBOLTREE',
            OFFICEOPENXMLMATH : 'OFFICEOPENXMLMATH'
        },
        Music: {
            MUSICXML: 'MUSICXML',
            SCORETREE: 'SCORETREE'
        }
    },
    Protocol: {
        WS: 'WebSocket',
        REST: 'REST'
    }
};



(function (scope) {
    /**
     * Point
     *
     * @class Point
     * @param {Object} [obj]
     * @constructor
     */
    function Point(obj) {
        if (obj) {
            this.x = obj.x;
            this.y = obj.y;
        }
    }

    /**
     * Get x
     *
     * @method getX
     * @returns {Number}
     */
    Point.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set x
     *
     * @method setX
     * @param {Number} x
     */
    Point.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Get y
     *
     * @method getY
     * @returns {Number}
     */
    Point.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set y
     *
     * @method setY
     * @param {Number} y
     */
    Point.prototype.setY = function (y) {
        this.y = y;
    };

    // Export
    scope.Point = Point;
})(MyScript);


(function (scope) {
    /**
     * Rectangle
     *
     * @class Rectangle
     * @param {Object} [obj]
     * @constructor
     */
    function Rectangle(obj) {
        if (obj) {
            this.x = obj.x;
            this.y = obj.y;
            this.width = obj.width;
            this.height = obj.height;
        }
    }

    /**
     * Get top-left x
     *
     * @method getX
     * @returns {Number}
     */
    Rectangle.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set top-left x
     *
     * @method setX
     * @param {Number} x
     */
    Rectangle.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Get top-left y
     *
     * @method getY
     * @returns {Number}
     */
    Rectangle.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set top-left y
     *
     * @method setY
     * @param {Number} y
     */
    Rectangle.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     * Get top-left point
     *
     * @method getTopLeftPoint
     * @returns {Point}
     */
    Rectangle.prototype.getTopLeftPoint = function () {
        var point = new scope.Point();
        point.setX(this.x);
        point.setY(this.y);
        return point;
    };

    /**
     * Set top-left point
     *
     * @method setTopLeftPoint
     * @param {Point} topLeftPoint
     */
    Rectangle.prototype.setTopLeftPoint = function (topLeftPoint) {
        this.x = topLeftPoint.getX();
        this.y = topLeftPoint.getY();
    };

    /**
     * Get width
     *
     * @method getWidth
     * @returns {Number}
     */
    Rectangle.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Set width
     *
     * @method setWidth
     * @param {Number} width
     */
    Rectangle.prototype.setWidth = function (width) {
        this.width = width;
    };

    /**
     * Get height
     *
     * @method getHeight
     * @returns {Number}
     */
    Rectangle.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * Set height
     *
     * @method setHeight
     * @param {Number} height
     */
    Rectangle.prototype.setHeight = function (height) {
        this.height = height;
    };

    // Export
    scope.Rectangle = Rectangle;
})(MyScript);


(function (scope) {
    /**
     * Parameters used for both input and output canvas draw.
     *
     * @class PenParameters
     * @constructor
     */
    function PenParameters(obj) {
        this.color = '#1580CD';
        this.rectColor = 'rgba(0, 0, 0, 0.2)';
        this.font = 'Times New Roman';
        this.decoration = 'normal';
        this.width = 3;
        this.pressureType = 'SIMULATED';
        this.alpha = '1.0';
        if (obj) {
            this.color = obj.color;
            this.rectColor = obj.rectColor;
            this.font = obj.font;
            this.decoration = obj.decoration;
            this.width = obj.width;
            this.pressureType = obj.pressureType;
            this.alpha = obj.alpha;
        }
    }

    /**
     * Get the color renderer parameter
     *
     * @method getColor
     * @returns {String} The color of the ink
     */
    PenParameters.prototype.getColor = function () {
        return this.color;
    };

    /**
     * Set the color renderer parameter
     *
     * @method setColor
     * @param {String} color
     */
    PenParameters.prototype.setColor = function (color) {
        this.color = color;
    };

    /**
     * Get the rect renderer parameter
     *
     * @method getRectColor
     * @returns {String} the rectangle color
     */
    PenParameters.prototype.getRectColor = function () {
        return this.rectColor;
    };

    /**
     * Set the rect renderer parameter
     *
     * @method setRectColor
     * @param {String} rectColor
     */
    PenParameters.prototype.setRectColor = function (rectColor) {
        this.rectColor = rectColor;
    };

    /**
     * Get the font renderer parameter
     *
     * @method getFont
     * @returns {String} The font
     */
    PenParameters.prototype.getFont = function () {
        return this.font;
    };

    /**
     * Set the font renderer parameter
     *
     * @method setFont
     * @param {String} font
     */
    PenParameters.prototype.setFont = function (font) {
        this.font = font;
    };

    /**
     * Get the decoration renderer parameter
     *
     * @method getDecoration
     * @returns {String} The decoration
     */
    PenParameters.prototype.getDecoration = function () {
        return this.decoration;
    };

    /**
     * Set the decoration renderer parameter
     *
     * @method setDecoration
     * @param {String} decoration
     */
    PenParameters.prototype.setDecoration = function (decoration) {
        this.decoration = decoration;
    };

    /**
     * Get the width renderer parameter
     *
     * @method getWidth
     * @returns {Number} The ink width
     */
    PenParameters.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Set the width renderer parameter
     *
     * @method setWidth
     * @param {Number} width
     */
    PenParameters.prototype.setWidth = function (width) {
        this.width = width;
    };

    // Export
    scope.PenParameters = PenParameters;
})(MyScript);



(function (scope) {
    /**
     * The mathUtil class is use to calculate lines
     *
     * @class MathUtil
     * @constructor
     */
    function MathUtils() {
    }

    /**
     * This method is use to calculate the size of the rectangle that contains an ellipse arc.
     *
     * @method getEllipseArcRect
     * @param {Point} center
     * @param {Number} maxRadius
     * @param {Number} minRadius
     * @param {Number} orientation
     * @param {Number} startAngle
     * @param {Number} sweepAngle
     * @returns {Rectangle}
     */
    MathUtils.getEllipseArcRect = function (center, maxRadius, minRadius, orientation, startAngle, sweepAngle) {

        var angleStep = 0.02, // angle delta between interpolated points on the arc, in radian
            angle, // angle
            alpha, // angle
            z1,
            z2,
            z3,
            z4,
            cosAlpha,
            sinAlpha,
            n,
            xList,
            yList,
            i,
            x,
            y,
            xMin,
            xMax,
            yMin,
            yMax,
            sortFloat = function (a, b) {
                return a - b;
            };

        z1 = z2 = Math.cos(orientation);
        z3 = z4 = Math.sin(orientation);
        z1 *= maxRadius;
        z2 *= minRadius;
        z3 *= maxRadius;
        z4 *= minRadius;

        n = Math.abs(sweepAngle) / angleStep;

        xList = [];
        yList = [];

        for (i = 0; i <= n; i++) {

            angle = startAngle + (i / n) * sweepAngle;
            alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

            cosAlpha = Math.cos(alpha);
            sinAlpha = Math.sin(alpha);

            // current point
            x = center.x + z1 * cosAlpha - z4 * sinAlpha;
            y = center.y + z2 * sinAlpha + z3 * cosAlpha;

            xList.push(x);
            yList.push(y);
        }

        xList.sort(sortFloat);
        yList.sort(sortFloat);

        xMin = xList[0];
        xMax = xList[xList.length - 1];
        yMin = yList[0];
        yMax = yList[yList.length - 1];

        return new scope.Rectangle({x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin});
    };

    /**
     * This method is use to calculate the size of the rectangle that contains a line.
     *
     * @method getLineRect
     * @param {Point} firstPoint
     * @param {Point} lastPoint
     * @returns {Rectangle}
     */
    MathUtils.getLineRect = function (firstPoint, lastPoint) {

        var xFirst = firstPoint.x,
            xLast = lastPoint.x,
            xMin = Math.min(xFirst, xLast),
            xMax = Math.max(xFirst, xLast),

            yFirst = firstPoint.y,
            yLast = lastPoint.y,
            yMin = Math.min(yFirst, yLast),
            yMax = Math.max(yFirst, yLast);

        return new scope.Rectangle({x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin});
    };

    /**
     * This method is use to calculate the size of the rectangle that contains bounding boxes.
     *
     * @method getBoundingRect
     * @param {Rectangle[]} boundingBoxes List of bounding box
     * @returns {Rectangle}
     */
    MathUtils.getBoundingRect = function (boundingBoxes) {

        var xList = [],
            yList = [];

        for (var i in boundingBoxes) {
            var rectangle = boundingBoxes[i];
            xList.push(rectangle.getX());
            xList.push(rectangle.getX() + rectangle.getWidth());
            yList.push(rectangle.getY());
            yList.push(rectangle.getY() + rectangle.getHeight());
        }

        var xMin = Math.min.apply(Math, xList);
        var xMax = Math.max.apply(Math, xList);
        var yMin = Math.min.apply(Math, yList);
        var yMax = Math.max.apply(Math, yList);

        return new scope.Rectangle({x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin});
    };

    // Export
    scope.MathUtils = MathUtils;
})(MyScript);



(function (scope) {
    /**
     * Abstract WebSocket recognition message
     *
     * @class AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function AbstractWSMessage(obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get the message type
     *
     * @method getType
     * @returns {String}
     */
    AbstractWSMessage.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AbstractWSMessage = AbstractWSMessage;
})(MyScript);


(function (scope) {
    /**
     * Represent an abstract input component
     *
     * @class AbstractComponent
     * @constructor
     */
    function AbstractComponent() {
    }

    /**
     * Get the type of the input component
     *
     * @method getType
     * @returns {String}
     */
    AbstractComponent.prototype.getType = function () {
        return this.type;
    };

    /**
     * Set the type of the input component
     *
     * @method setType
     * @param {String} type
     */
    AbstractComponent.prototype.setType = function (type) {
        this.type = type;
    };

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AbstractComponent.prototype.getBoundingBox = function () {
        throw new Error('not implemented');
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    AbstractComponent.prototype.setBoundingBox = function (boundingBox) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.AbstractComponent = AbstractComponent;
})(MyScript);


(function (scope) {
    /**
     * Represent a simple StrokeComponent input component
     *
     * @class StrokeComponent
     * @extends AbstractComponent
     * @constructor
     */
    function StrokeComponent(obj) {
        scope.AbstractComponent.call(this);
        this.type = 'stroke';
        this.x = [];
        this.y = [];
        this.t = [];
        this.p = [];
        this.d = [];
        this.l = [];
        this.color = undefined;
        this.alpha = undefined;
        this.width = 0;
        if (obj) {
            if (obj.x) {
                this.x = obj.x;
            }
            if (obj.y) {
                this.y = obj.y;
            }
            if (obj.t) {
                this.t = obj.t;
            }
            if (obj.p) {
                this.p = obj.p;
            }
            if (obj.d) {
                this.d = obj.d;
            }
            if (obj.l) {
                this.l = obj.l;
            }
            if (obj.color) {
                this.color = obj.color;
            }
            if (obj.alpha) {
                this.alpha = obj.alpha;
            }
            if (obj.width) {
                this.width = obj.width;
            }
        }
    }

    /**
     * Inheritance property
     */
    StrokeComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    StrokeComponent.prototype.constructor = StrokeComponent;

    /**
     * @method toJSON
     * @returns {Object}
     */
    StrokeComponent.prototype.toJSON = function () {
        return {type: this.type, x: this.x, y: this.y, t: this.t};
    };

    /**
     * Get the list of x coordinates
     *
     * @method getX
     * @returns {Number[]}
     */
    StrokeComponent.prototype.getX = function () {
        return this.x;
    };

    /**
     * Set the list of x coordinates
     *
     * @method setX
     * @param {Number[]} x
     */
    StrokeComponent.prototype.setX = function (x) {
        this.x = x;
    };

    /**
     * Add a x to the list of x coordinates
     *
     * @method addX
     * @param {Number} x
     */
    StrokeComponent.prototype.addX = function (x) {
        if ((x !== null) && (x !== undefined)) {
            this.x.push(x);
        }
    };

    /**
     * Get the list of y coordinates
     *
     * @method getY
     * @returns {Number[]}
     */
    StrokeComponent.prototype.getY = function () {
        return this.y;
    };

    /**
     * Set the list of y coordinates
     *
     * @method setY
     * @param {Number[]} y
     */
    StrokeComponent.prototype.setY = function (y) {
        this.y = y;
    };

    /**
     * Add a y to the list of y coordinates
     *
     * @method addY
     * @param {Number} y
     */
    StrokeComponent.prototype.addY = function (y) {
        if ((y !== null) && (y !== undefined)) {
            this.y.push(y);
        }
    };

    /**
     * Get the list of timestamps
     *
     * @method getT
     * @returns {Number[]}
     */
    StrokeComponent.prototype.getT = function () {
        return this.t;
    };

    /**
     * Set the list of timestamps
     *
     * @method setT
     * @param {Number[]} t
     */
    StrokeComponent.prototype.setT = function (t) {
        this.t = t;
    };

    /**
     * Add a timestamp to the list
     *
     * @method addT
     * @param {Number} t
     */
    StrokeComponent.prototype.addT = function (t) {
        if ((t !== null) && (t !== undefined)) {
            this.t.push(t);
        }
    };

    StrokeComponent.prototype.getLength = function () {
        return this.x.length;
    };

    /**
     * Get the boundingBox
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    StrokeComponent.prototype.getBoundingBox = function () {
        var boundingBox = new scope.Rectangle();
        boundingBox.setX(Math.min.apply(Math, this.getX()));
        boundingBox.setY(Math.min.apply(Math, this.getY()));
        boundingBox.setWidth(Math.max.apply(Math, this.getX()) - boundingBox.getX());
        boundingBox.setHeight(Math.max.apply(Math, this.getY()) - boundingBox.getY());
        return boundingBox;
    };

    StrokeComponent.prototype.toFixed = function (precision) {
        if (precision !== undefined) {
            for (var i in this.x) {
                this.x[i] = this.x[i].toFixed(precision);
                this.y[i] = this.y[i].toFixed(precision);
            }
        }
    };

    StrokeComponent.prototype.getP = function () {
        return this.p;
    };

    StrokeComponent.prototype.setP = function (p) {
        this.p = p;
    };

    StrokeComponent.prototype.addP = function (p) {
        if ((p !== null) && (p !== undefined)) {
            this.p.push(p);
        }
    };

    StrokeComponent.prototype.getD = function () {
        return this.d;
    };

    StrokeComponent.prototype.setD = function (d) {
        this.d = d;
    };

    StrokeComponent.prototype.addD = function (d) {
        if ((d !== null) && (d !== undefined)) {
            this.d.push(d);
        }
    };

    StrokeComponent.prototype.getL = function () {
        return this.l;
    };

    StrokeComponent.prototype.setL = function (l) {
        this.l = l;
    };

    StrokeComponent.prototype.addL = function (l) {
        if ((l !== null) && (l !== undefined)) {
            this.l.push(l);
        }
    };

    StrokeComponent.prototype.getColor = function () {
        return this.color;
    };

    StrokeComponent.prototype.setColor = function (color) {
        this.color = color;
    };

    StrokeComponent.prototype.getWidth = function () {
        return this.width;
    };

    StrokeComponent.prototype.setWidth = function (width) {
        this.width = width;
    };

    StrokeComponent.prototype.addPoint = function (x, y, t) {
        if (_filterPointByAcquisitionDelta(x, y, this.getX(), this.getY(), this.getLastIndexPoint(), this.getWidth(), this.getLength())) {
            this.addX(x);
            this.addY(y);
            this.addT(t);
            this.addP(_computePressure(x, y, this.getX(), this.getY(), this.getL(), this.getLastIndexPoint()));
            this.addD(_computeDistance(x, y, this.getX(), this.getY(), this.getLastIndexPoint()));
            this.addL(_computeLength(x, y, this.getX(), this.getY(), this.getL(), this.getLastIndexPoint()));
        }
    };

    StrokeComponent.prototype.getLastIndexPoint = function () {
        return this.x.length - 1;
    };

    StrokeComponent.prototype.getPointByIndex = function (index) {
        var point;
        if (index !== undefined && index >= 0 && index < this.getLength()) {
            point = {
                x: this.getX()[index],
                y: this.getY()[index],
                t: this.getT()[index],
                p: this.getP()[index],
                d: this.getD()[index],
                l: this.getL()[index]
            };
        }
        return point;
    };

    function _computeDistance(x, y, xArray, yArray, lastIndexPoint) {
        var distance = Math.sqrt(Math.pow((y - yArray[lastIndexPoint - 1]), 2) + Math.pow((x - xArray[lastIndexPoint - 1]), 2));

        if (isNaN(distance)) {
            distance = 0;
        }

        return distance;
    }

    function _computeLength(x, y, xArray, yArray, lArray, lastIndexPoint) {
        var length = lArray[lastIndexPoint - 1] + _computeDistance(x, y, xArray, yArray, lastIndexPoint);

        if (isNaN(length)) {
            length = 0;
        }

        return length;
    }

    function _computePressure(x, y, xArray, yArray, lArray, lastIndexPoint) {
        var ratio = 1.0;
        var distance = _computeDistance(x, y, xArray, yArray, lastIndexPoint);
        var length = _computeLength(x, y, xArray, yArray, lArray, lastIndexPoint);

        if(length === 0) {
            ratio = 0.5;
        } else if(distance == length){
            ratio = 1.0;
        } else  if (distance < 10) {
            ratio = 0.2 + Math.pow(0.1 * distance, 0.4);
        } else if (distance > length - 10) {
            ratio = 0.2 + Math.pow(0.1 * (length - distance), 0.4);
        }
        var pressure = ratio * Math.max(0.1, 1.0 - 0.1 * Math.sqrt(distance));
        if (isNaN(parseFloat(pressure))) {
            pressure = 0.5;
        }
        return pressure;
    }

    function _filterPointByAcquisitionDelta(x, y, xArray, yArray, lastIndexPoint, width, length) {
        var delta = (2 + (width / 4));
        var ret = false;
        if (length === 0 || Math.abs(xArray[lastIndexPoint] - x) >= delta || Math.abs(yArray[lastIndexPoint] - y) >= delta) {
            ret = true;
        }
        return ret;
    }

    // Export
    scope.StrokeComponent = StrokeComponent;
})(MyScript);



(function (scope) {
    /**
     * Char input component
     *
     * @class CharacterInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function CharacterInputComponent(obj) {
        scope.AbstractComponent.call(this);
        this.type = 'inputCharacter';
        this.alternates = [];
        if (obj) {
            if (obj.alternates) {
                for (var i in obj.alternates) {
                    this.alternates.push(new scope.CharacterInputComponentAlternate(obj.alternates[i]));
                }
            }
            if (obj.boundingBox) {
                this.boundingBox = new scope.Rectangle(obj.boundingBox);
            }
        }
    }

    /**
     * Inheritance property
     */
    CharacterInputComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    CharacterInputComponent.prototype.constructor = CharacterInputComponent;

    /**
     * Get character input alternates
     *
     * @method getAlternates
     * @returns {CharacterInputComponentAlternate[]}
     */
    CharacterInputComponent.prototype.getAlternates = function () {
        return this.alternates;
    };

    /**
     * Set character input alternates
     *
     * @method setAlternates
     * @param {CharacterInputComponentAlternate[]} alternates
     */
    CharacterInputComponent.prototype.setAlternates = function (alternates) {
        this.alternates = alternates;
    };

    /**
     * Add a character input alternate
     *
     * @method addAlternate
     * @param {CharacterInputComponent} alternate
     */
    CharacterInputComponent.prototype.addAlternate = function (alternate) {
        this.alternates.push(alternate);
    };

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    CharacterInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    CharacterInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.CharacterInputComponent = CharacterInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Character input component alternate
     *
     * @class CharacterInputComponentAlternate
     * @constructor
     */
    function CharacterInputComponentAlternate(obj) {
        if (obj) {
            if (obj.alternate) {
                this.alternate = obj.alternate;
            }
            if (obj.probability) {
                this.probability = obj.probability;
            }
        }
    }

    /**
     * Get alternate
     *
     * @method getAlternate
     * @returns {String}
     */
    CharacterInputComponentAlternate.prototype.getAlternate = function () {
        return this.alternate;
    };

    /**
     * Set alternate
     *
     * @method setAlternate
     * @param {String} alternate
     */
    CharacterInputComponentAlternate.prototype.setAlternate = function (alternate) {
        this.alternate = alternate;
    };

    /**
     * Get probability
     *
     * @method getProbability
     * @returns {Number}
     */
    CharacterInputComponentAlternate.prototype.getProbability = function () {
        return this.probability;
    };

    /**
     * Set probability
     *
     * @method setProbability
     * @param {Number} probability
     */
    CharacterInputComponentAlternate.prototype.setProbability = function (probability) {
        this.probability = probability;
    };

    // Export
    scope.CharacterInputComponentAlternate = CharacterInputComponentAlternate;
})(MyScript);



(function (scope) {
    /**
     * Abstract parameters used for recognition
     *
     * @class AbstractParameter
     * @constructor
     */
    function AbstractParameter() {
    }

    // Export
    scope.AbstractParameter = AbstractParameter;
})(MyScript);


(function (scope) {
    /**
     * Abstraction of recognizer input
     *
     * @class AbstractRecognitionInput
     * @constructor
     */
    function AbstractRecognitionInput() {
    }

    // Export
    scope.AbstractRecognitionInput = AbstractRecognitionInput;
})(MyScript);


(function (scope) {
    /**
     * Abstract input recognition data
     *
     * @class AbstractRecognitionData
     * @constructor
     */
    function AbstractRecognitionData() {
    }

    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    AbstractRecognitionData.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    AbstractRecognitionData.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    /**
     * Get the instanceId
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractRecognitionData.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Set the instanceId
     *
     * @method setInstanceId
     * @param {String} instanceId
     */
    AbstractRecognitionData.prototype.setInstanceId = function (instanceId) {
        this.instanceId = instanceId;
    };

    /**
     * @returns {string}
     */
    AbstractRecognitionData.prototype.getHmac = function () {
        return this.hmac;
    };

    /**
     * @param {string} hmac
     */
    AbstractRecognitionData.prototype.setHmac = function (hmac) {
        this.hmac = hmac;
    };

    /**
     * Get recognition input
     *
     * @method getRecognitionInput
     * @returns {AbstractRecognitionInput} input
     */
    AbstractRecognitionData.prototype.getRecognitionInput = function () {
        throw new Error('not implemented');
    };

    /**
     * Set text input
     *
     * @method setRecognitionInput
     * @param {AbstractRecognitionInput} input
     */
    AbstractRecognitionData.prototype.setRecognitionInput = function (input) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.AbstractRecognitionData = AbstractRecognitionData;
})(MyScript);



(function (scope) {
    /**
     * List of languages recognition input
     *
     * @class RecognitionLanguagesData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function RecognitionLanguagesData() {
    }

    /**
     * Inheritance property
     */
    RecognitionLanguagesData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    RecognitionLanguagesData.prototype.constructor = RecognitionLanguagesData;

    /**
     * Get the recognition input mode
     *
     * @method getInputMode
     * @returns {String} inputMode
     */
    RecognitionLanguagesData.prototype.getInputMode = function () {
        return this.inputMode;
    };

    /**
     * Set the recognition input mode
     *
     * @method setInputMode
     * @param {String} inputMode
     */
    RecognitionLanguagesData.prototype.setInputMode = function (inputMode) {
        this.inputMode = inputMode;
    };

    // Export
    scope.RecognitionLanguagesData = RecognitionLanguagesData;
})(MyScript);


(function (scope) {
    /**
     * WebSocket start math recognition message
     *
     * @class AbstractStartRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function AbstractStartRequestWSMessage(obj) {
        this.type = 'start';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    AbstractStartRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    AbstractStartRequestWSMessage.prototype.constructor = AbstractStartRequestWSMessage;

    // Export
    scope.AbstractStartRequestWSMessage = AbstractStartRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket continue math recognition message
     *
     * @class AbstractContinueRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function AbstractContinueRequestWSMessage(obj) {
        this.type = 'continue';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    AbstractContinueRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    AbstractContinueRequestWSMessage.prototype.constructor = AbstractContinueRequestWSMessage;

    /**
     * Get instanceId
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractContinueRequestWSMessage.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Set instanceId
     *
     * @method setInstanceId
     * @param {String} instanceId
     */
    AbstractContinueRequestWSMessage.prototype.setInstanceId = function (instanceId) {
        this.instanceId = instanceId;
    };

    // Export
    scope.AbstractContinueRequestWSMessage = AbstractContinueRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket recognition hmac challenge message
     *
     * @class ChallengeRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ChallengeRequestWSMessage(obj) {
        this.type = 'hmac';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ChallengeRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ChallengeRequestWSMessage.prototype.constructor = ChallengeRequestWSMessage;

    /**
     * Get the challenge
     *
     * @method getChallenge
     * @returns {String}
     */
    ChallengeRequestWSMessage.prototype.getChallenge = function () {
        return this.challenge;
    };

    /**
     * Set the challenge
     *
     * @method setChallenge
     * @param {String} challenge
     */
    ChallengeRequestWSMessage.prototype.setChallenge = function (challenge) {
        this.challenge = challenge;
    };

    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    ChallengeRequestWSMessage.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    ChallengeRequestWSMessage.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    /**
     * Get HMAC signature
     *
     * @method getHmacSignature
     * @returns {String}
     */
    ChallengeRequestWSMessage.prototype.getHmacSignature = function () {
        return this.hmac;
    };

    /**
     * Set HMAC signature
     *
     * @method setHmacSignature
     * @param {String} hmac
     */
    ChallengeRequestWSMessage.prototype.setHmacSignature = function (hmac) {
        this.hmac = hmac;
    };

    // Export
    scope.ChallengeRequestWSMessage = ChallengeRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket recognition hmac challenge message
     *
     * @class InitRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function InitRequestWSMessage(obj) {
        this.type = 'applicationKey';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    InitRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    InitRequestWSMessage.prototype.constructor = InitRequestWSMessage;

    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    InitRequestWSMessage.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    InitRequestWSMessage.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    // Export
    scope.InitRequestWSMessage = InitRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket recognition hmac challenge message
     *
     * @class ResetRequestWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ResetRequestWSMessage(obj) {
        this.type = 'reset';
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ResetRequestWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ResetRequestWSMessage.prototype.constructor = ResetRequestWSMessage;

    // Export
    scope.ResetRequestWSMessage = ResetRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * Abstract text input component
     *
     * @class AbstractTextInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function AbstractTextInputComponent(obj) {
        scope.AbstractComponent.call(this);
        if (obj) {
            if (obj.boundingBox) {
                this.boundingBox = new scope.Rectangle(obj.boundingBox);
            }
        }
    }

    /**
     * Inheritance property
     */
    AbstractTextInputComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    AbstractTextInputComponent.prototype.constructor = AbstractTextInputComponent;

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AbstractTextInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    AbstractTextInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.AbstractTextInputComponent = AbstractTextInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Char input component
     *
     * @class CharInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function CharInputComponent(obj) {
        scope.AbstractTextInputComponent.call(this, obj);
        this.type = 'char';
        if (obj) {
            if (obj.character) {
                this.character = obj.character;
            }
        }
    }

    /**
     * Inheritance property
     */
    CharInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    CharInputComponent.prototype.constructor = CharInputComponent;

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    CharInputComponent.prototype.getLabel = function () {
        return this.character;
    };

    /**
     * Set label
     *
     * @method setLabel
     * @param {String} label
     */
    CharInputComponent.prototype.setLabel = function (label) {
        this.character = label;
    };

    // Export
    scope.CharInputComponent = CharInputComponent;
})(MyScript);



(function (scope) {
    /**
     * String input component
     *
     * @class StringInputComponent
     * @extends AbstractTextInputComponent
     * @constructor
     */
    function StringInputComponent(obj) {
        scope.AbstractTextInputComponent.call(this, obj);
        this.type = 'string';
        if (obj) {
            if (obj.string) {
                this.string = obj.string;
            }
        }
    }

    /**
     * Inheritance property
     */
    StringInputComponent.prototype = new scope.AbstractTextInputComponent();

    /**
     * Constructor property
     */
    StringInputComponent.prototype.constructor = StringInputComponent;

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    StringInputComponent.prototype.getLabel = function () {
        return this.string;
    };

    /**
     * Set label
     *
     * @method setLabel
     * @param {String} label
     */
    StringInputComponent.prototype.setLabel = function (label) {
        this.string = label;
    };

    // Export
    scope.StringInputComponent = StringInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Input unit used for text recognition
     *
     * @class TextInputUnit
     * @constructor
     */
    function TextInputUnit() {
        this.textInputType = 'MULTI_LINE_TEXT';
        this.components = [];
    }

    /**
     * Get the input type
     *
     * @method getInputType
     * @returns {String}
     */
    TextInputUnit.prototype.getInputType = function () {
        return this.textInputType;
    };

    /**
     * Set the input type
     *
     * @method setInputType
     * @returns {String} inputType
     */
    TextInputUnit.prototype.setInputType = function (inputType) {
        this.textInputType = inputType;
    };

    /**
     * Get components for this input unit
     *
     * @method getComponents
     * @param {TextInkRange} [inkRange]
     * @returns {AbstractComponent[]}
     */
    TextInputUnit.prototype.getComponents = function (inkRange) {
        if (inkRange && (inkRange instanceof scope.TextInkRange)) {
            return this.components.slice(inkRange.getStartComponent(), inkRange.getEndComponent() + 1);
        }
        return this.components;
    };

    /**
     * Set components for this input unit
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    TextInputUnit.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.TextInputUnit = TextInputUnit;
})(MyScript);


(function (scope) {
    /**
     * Parameters used for text recognition
     *
     * @class TextParameter
     * @extends AbstractParameter
     * @constructor
     */
    function TextParameter(obj) {
        scope.AbstractParameter.call(this, obj);
        this.textProperties = new scope.TextProperties();
        if (obj) {
            if (obj.language) {
                this.language = obj.language;
            }
            if (obj.textInputMode) {
                this.textInputMode = obj.textInputMode;
            }
            if (obj.contentTypes) {
                this.contentTypes = obj.contentTypes;
            }
            if (obj.subsetKnowledges) {
                this.subsetKnowledges = obj.subsetKnowledges;
            }
            if (obj.userResources) {
                this.userResources = obj.userResources;
            }
            if (obj.userLkWords) {
                this.userLkWords = obj.userLkWords;
            }
            if (obj.resultDetail) {
                this.resultDetail = obj.resultDetail;
            }
            if (obj.textProperties) {
                this.textProperties = new scope.TextProperties(obj.textProperties);
            }
        }
    }

    /**
     * Inheritance property
     */
    TextParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    TextParameter.prototype.constructor = TextParameter;

    /**
     * Get recognition language
     *
     * @method getLanguage
     * @returns {String}
     */
    TextParameter.prototype.getLanguage = function () {
        return this.language;
    };

    /**
     * Set recognition language
     *
     * @method getLanguage
     * @param {String} language
     */
    TextParameter.prototype.setLanguage = function (language) {
        this.language = language;
    };

    /**
     * Get input mode
     *
     * @method getInputMode
     * @returns {'CURSIVE'|'ISOLATED'|'SUPERIMPOSED'|'VERTICAL'}
     */
    TextParameter.prototype.getInputMode = function () {
        return this.textInputMode;
    };

    /**
     * Set input mode
     *
     * @method setInputMode
     * @param {'CURSIVE'|'ISOLATED'|'SUPERIMPOSED'|'VERTICAL'} inputMode
     */
    TextParameter.prototype.setInputMode = function (inputMode) {
        this.textInputMode = inputMode;
    };

    /**
     * Get content types
     *
     * @method getContentTypes
     * @returns {Array}
     */
    TextParameter.prototype.getContentTypes = function () {
        return this.contentTypes;
    };

    /**
     * Set content types
     *
     * @method setContentTypes
     * @param {Array} contentTypes
     */
    TextParameter.prototype.setContentTypes = function (contentTypes) {
        this.contentTypes = contentTypes;
    };

    /**
     * Get SK
     *
     * @method getSubsetKnowledges
     * @returns {Array}
     */
    TextParameter.prototype.getSubsetKnowledges = function () {
        return this.subsetKnowledges;
    };

    /**
     * Set SK
     *
     * @method setSubsetKnowledges
     * @param {Array} subsetKnowledges
     */
    TextParameter.prototype.setSubsetKnowledges = function (subsetKnowledges) {
        this.subsetKnowledges = subsetKnowledges;
    };

    /**
     * Get user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    TextParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set user resources
     *
     * @method setUserResources
     * @param {Array} userResources
     */
    TextParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get user LK words
     *
     * @method getUserLkWords
     * @returns {Array}
     */
    TextParameter.prototype.getUserLkWords = function () {
        return this.userLkWords;
    };

    /**
     * Set user LK words
     *
     * @method setUserLkWords
     * @param {Array} userLkWords
     */
    TextParameter.prototype.setUserLkWords = function (userLkWords) {
        this.userLkWords = userLkWords;
    };

    /**
     * Get result detail (e.g. TEXT, WORD ...)
     *
     * @method getResultDetail
     * @returns {'TEXT'|'WORD'|'CHARACTER'}
     */
    TextParameter.prototype.getResultDetail = function () {
        return this.resultDetail;
    };

    /**
     * Set result detail (e.g. TEXT, WORD ...)
     *
     * @method setResultDetail
     * @param {'TEXT'|'WORD'|'CHARACTER'} resultDetail
     */
    TextParameter.prototype.setResultDetail = function (resultDetail) {
        this.resultDetail = resultDetail;
    };

    /**
     * Get text properties
     *
     * @method getTextProperties
     * @returns {TextProperties}
     */
    TextParameter.prototype.getTextProperties = function () {
        return this.textProperties;
    };

    /**
     * Set text properties
     *
     * @method setTextProperties
     * @param {TextProperties} properties
     */
    TextParameter.prototype.setTextProperties = function (textProperties) {
        this.textProperties = textProperties;
    };

    // Export
    scope.TextParameter = TextParameter;
})(MyScript);



(function (scope) {
    /**
     * Text recognition properties
     *
     * @class TextProperties
     * @constructor
     */
    function TextProperties(obj) {
        if (obj) {
            if (obj.textCandidateListSize) {
                this.textCandidateListSize = obj.textCandidateListSize;
            }
            if (obj.wordCandidateListSize) {
                this.wordCandidateListSize = obj.wordCandidateListSize;
            }
            if (obj.wordPredictionListSize) {
                this.wordPredictionListSize = obj.wordPredictionListSize;
            }
            if (obj.wordCompletionListSize) {
                this.wordCompletionListSize = obj.wordCompletionListSize;
            }
            if (obj.characterCandidateListSize) {
                this.characterCandidateListSize = obj.characterCandidateListSize;
            }
            if (obj.discardCaseVariations) {
                this.discardCaseVariations = obj.discardCaseVariations;
            }
            if (obj.discardAccentuationVariations) {
                this.discardAccentuationVariations = obj.discardAccentuationVariations;
            }
            if (obj.disableSpatialOrdering) {
                this.disableSpatialOrdering = obj.disableSpatialOrdering;
            }
            if (obj.glyphDistortion) {
                this.glyphDistortion = obj.glyphDistortion;
            }
            if (obj.enableOutOfLexicon) {
                this.enableOutOfLexicon = obj.enableOutOfLexicon;
            }
            if (obj.spellingDistortion) {
                this.spellingDistortion = obj.spellingDistortion;
            }
        }
    }

    /**
     * Get the number of text candidates requested
     *
     * @method getTextCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getTextCandidateListSize = function () {
        return this.textCandidateListSize;
    };

    /**
     * Set the number of text candidates requested
     *
     * @method setTextCandidateListSize
     * @param {Number} textCandidateListSize
     */
    TextProperties.prototype.setTextCandidateListSize = function (textCandidateListSize) {
        this.textCandidateListSize = textCandidateListSize;
    };

    /**
     * Get the number of word candidates requested
     *
     * @method getWordCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordCandidateListSize = function () {
        return this.wordCandidateListSize;
    };

    /**
     * Set the number of word candidates requested
     *
     * @method setWordCandidateListSize
     * @param {Number} wordCandidateListSize
     */
    TextProperties.prototype.setWordCandidateListSize = function (wordCandidateListSize) {
        this.wordCandidateListSize = wordCandidateListSize;
    };

    /**
     * Get the number of word prediction candidates requested
     *
     * @method getWordPredictionListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordPredictionListSize = function () {
        return this.wordPredictionListSize;
    };

    /**
     * Set the number of word prediction candidates requested
     *
     * @method setWordPredictionListSize
     * @param {Number} wordPredictionListSize
     */
    TextProperties.prototype.setWordPredictionListSize = function (wordPredictionListSize) {
        this.wordPredictionListSize = wordPredictionListSize;
    };

    /**
     * Get the number of word completion candidates requested
     *
     * @method getWordCompletionListSize
     * @returns {Number}
     */
    TextProperties.prototype.getWordCompletionListSize = function () {
        return this.wordCompletionListSize;
    };

    /**
     * Set the number of word completion candidates requested
     *
     * @method setWordCompletionListSize
     * @param {Number} wordCompletionListSize
     */
    TextProperties.prototype.setWordCompletionListSize = function (wordCompletionListSize) {
        this.wordCompletionListSize = wordCompletionListSize;
    };

    /**
     * Get the number of character candidates requested
     *
     * @method getCharacterCandidateListSize
     * @returns {Number}
     */
    TextProperties.prototype.getCharacterCandidateListSize = function () {
        return this.characterCandidateListSize;
    };

    /**
     * Set the number of character candidates requested
     *
     * @method setCharacterCandidateListSize
     * @param {Number} characterCandidateListSize
     */
    TextProperties.prototype.setCharacterCandidateListSize = function (characterCandidateListSize) {
        this.characterCandidateListSize = characterCandidateListSize;
    };

    /**
     * Get the discard case variations
     *
     * @method getDiscardCaseVariations
     * @returns {boolean}
     */
    TextProperties.prototype.getDiscardCaseVariations = function () {
        return this.discardCaseVariations;
    };

    /**
     * Set the discard case variations
     *
     * @method setDiscardCaseVariations
     * @param {boolean} discardCaseVariations
     */
    TextProperties.prototype.setDiscardCaseVariations = function (discardCaseVariations) {
        this.discardCaseVariations = discardCaseVariations;
    };

    /**
     * Get the discard accentuation variations
     *
     * @method getDiscardAccentuationVariations
     * @returns {boolean}
     */
    TextProperties.prototype.getDiscardAccentuationVariations = function () {
        return this.discardAccentuationVariations;
    };

    /**
     * Set the discard accentuation variations
     *
     * @method setDiscardAccentuationVariations
     * @param {boolean} discardAccentuationVariations
     */
    TextProperties.prototype.setDiscardAccentuationVariations = function (discardAccentuationVariations) {
        this.discardAccentuationVariations = discardAccentuationVariations;
    };

    /**
     * Get disable spatial ordering
     *
     * @method getDisableSpatialOrdering
     * @returns {Boolean}
     */
    TextProperties.prototype.getDisableSpatialOrdering = function () {
        return this.disableSpatialOrdering;
    };

    /**
     * Set disable spatial ordering
     *
     * @method setDisableSpatialOrdering
     * @param {Boolean} disableSpatialOrdering
     */
    TextProperties.prototype.setDisableSpatialOrdering = function (disableSpatialOrdering) {
        this.disableSpatialOrdering = disableSpatialOrdering;
    };

    /**
     * Get glyph distortion
     *
     * @method getGlyphDistortion
     * @returns {Number}
     */
    TextProperties.prototype.getGlyphDistortion = function () {
        return this.glyphDistortion;
    };

    /**
     * Set glyph distortion
     *
     * @method setGlyphDistortion
     * @param {Number} glyphDistortion
     */
    TextProperties.prototype.setGlyphDistortion = function (glyphDistortion) {
        this.glyphDistortion = glyphDistortion;
    };

    /**
     * Get enable out of lexicon
     *
     * @method getEnableOutOfLexicon
     * @returns {Boolean}
     */
    TextProperties.prototype.getEnableOutOfLexicon = function () {
        return this.enableOutOfLexicon;
    };

    /**
     * Set enable out of lexicon
     *
     * @method setEnableOutOfLexicon
     * @param {Boolean} enableOutOfLexicon
     */
    TextProperties.prototype.setEnableOutOfLexicon = function (enableOutOfLexicon) {
        this.enableOutOfLexicon = enableOutOfLexicon;
    };

    /**
     * Get spelling distortion
     *
     * @method getSpellingDistortion
     * @returns {Number}
     */
    TextProperties.prototype.getSpellingDistortion = function () {
        return this.spellingDistortion;
    };

    /**
     * Set spelling distortion
     *
     * @method setSpellingDistortion
     * @param {Number} spellingDistortion
     */
    TextProperties.prototype.setSpellingDistortion = function (spellingDistortion) {
        this.spellingDistortion = spellingDistortion;
    };

    // Export
    scope.TextProperties = TextProperties;
})(MyScript);



(function (scope) {
    /**
     * Recognition input object for text recognition
     *
     * @class TextRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function TextRecognitionInput() {
    }

    /**
     * Inheritance property
     */
    TextRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    TextRecognitionInput.prototype.constructor = TextRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {TextParameter}
     */
    TextRecognitionInput.prototype.getParameters = function () {
        return this.textParameter;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {TextParameter} parameters
     */
    TextRecognitionInput.prototype.setParameters = function (parameters) {
        this.textParameter = parameters;
    };

    /**
     * Get input units
     *
     * @method getInputUnits
     * @param {TextInkRange} [inkRange]
     * @returns {TextInputUnit[]}
     */
    TextRecognitionInput.prototype.getInputUnits = function (inkRange) {
        if (inkRange && (inkRange instanceof scope.TextInkRange)) {
            return this.inputUnits.slice(inkRange.getStartUnit(), inkRange.getEndUnit() + 1);
        }
        return this.inputUnits;
    };

    /**
     * Set input units
     *
     * @method setInputUnits
     * @param {TextInputUnit[]} inputUnits
     */
    TextRecognitionInput.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

    // Export
    scope.TextRecognitionInput = TextRecognitionInput;
})(MyScript);


(function (scope) {
    /**
     * Recognition data for text input
     *
     * @class TextRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function TextRecognitionData() {
    }

    /**
     * Inheritance property
     */
    TextRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    TextRecognitionData.prototype.constructor = TextRecognitionData;

    /**
     * Get text input
     *
     * @method getRecognitionInput
     * @returns {TextRecognitionInput} input
     */
    TextRecognitionData.prototype.getRecognitionInput = function () {
        return this.textInput;
    };

    /**
     * Set text input
     *
     * @method setRecognitionInput
     * @param {TextRecognitionInput} input
     */
    TextRecognitionData.prototype.setRecognitionInput = function (input) {
        this.textInput = JSON.stringify(input);
    };

    // Export
    scope.TextRecognitionData = TextRecognitionData;
})(MyScript);



(function (scope) {
    /**
     * WebSocket start text recognition message
     *
     * @class TextStartRequestWSMessage
     * @extends AbstractStartRequestWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function TextStartRequestWSMessage(obj) {
        scope.AbstractStartRequestWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    TextStartRequestWSMessage.prototype = new scope.AbstractStartRequestWSMessage();

    /**
     * Constructor property
     */
    TextStartRequestWSMessage.prototype.constructor = TextStartRequestWSMessage;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {TextParameter}
     */
    TextStartRequestWSMessage.prototype.getParameters = function () {
        return this.textParameter;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {TextParameter} parameters
     */
    TextStartRequestWSMessage.prototype.setParameters = function (parameters) {
        this.textParameter = parameters;
    };

    /**
     * Get input units
     *
     * @method getInputUnits
     * @returns {TextInputUnit[]}
     */
    TextStartRequestWSMessage.prototype.getInputUnits = function () {
        return this.inputUnits;
    };

    /**
     * Set input units
     *
     * @method setInputUnits
     * @param {TextInputUnit[]} inputUnits
     */
    TextStartRequestWSMessage.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

    // Export
    scope.TextStartRequestWSMessage = TextStartRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket continue text recognition message
     *
     * @class TextContinueRequestWSMessage
     * @extends AbstractContinueRequestWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function TextContinueRequestWSMessage(obj) {
        scope.AbstractContinueRequestWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    TextContinueRequestWSMessage.prototype = new scope.AbstractContinueRequestWSMessage();

    /**
     * Constructor property
     */
    TextContinueRequestWSMessage.prototype.constructor = TextContinueRequestWSMessage;

    /**
     * Get input units
     *
     * @method getInputUnits
     * @returns {TextInputUnit[]}
     */
    TextContinueRequestWSMessage.prototype.getInputUnits = function () {
        return this.inputUnits;
    };

    /**
     * Set input units
     *
     * @method setInputUnits
     * @param {TextInputUnit[]} inputUnits
     */
    TextContinueRequestWSMessage.prototype.setInputUnits = function (inputUnits) {
        this.inputUnits = inputUnits;
    };

    // Export
    scope.TextContinueRequestWSMessage = TextContinueRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * Parameters used for shape recognition
     *
     * @class ShapeParameter
     * @extends AbstractParameter
     * @constructor
     */
    function ShapeParameter(obj) {
        scope.AbstractParameter.call(this, obj);
        if (obj) {
            if (obj.rejectDetectionSensitivity) {
                this.rejectDetectionSensitivity = obj.rejectDetectionSensitivity;
            }
            if (obj.doBeautification) {
                this.doBeautification = obj.doBeautification;
            }
            if (obj.userResources) {
                this.userResources = obj.userResources;
            }
        }
    }

    /**
     * Inheritance property
     */
    ShapeParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    ShapeParameter.prototype.constructor = ShapeParameter;

    /**
     * Get the sensitivity of the reject detection
     *
     * @method getRejectDetectionSensitivity
     * @returns {Boolean}
     */
    ShapeParameter.prototype.getRejectDetectionSensitivity = function () {
        return this.rejectDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the reject detection
     *
     * @method setRejectDetectionSensitivity
     * @param {Boolean} rejectDetectionSensitivity
     */
    ShapeParameter.prototype.setRejectDetectionSensitivity = function (rejectDetectionSensitivity) {
        this.rejectDetectionSensitivity = rejectDetectionSensitivity;
    };

    /**
     * Get the beautification
     *
     * @method hasBeautification
     * @returns {Boolean}
     */
    ShapeParameter.prototype.hasBeautification = function () {
        return this.doBeautification;
    };

    /**
     * Set the beautification
     *
     * @method setBeautification
     * @param {Boolean} doBeautification
     */
    ShapeParameter.prototype.setBeautification = function (doBeautification) {
        this.doBeautification = doBeautification;
    };

    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    ShapeParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array} userResources
     */
    ShapeParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    // Export
    scope.ShapeParameter = ShapeParameter;
})(MyScript);



(function (scope) {
    /**
     * Recognition input object for shape recognition
     *
     * @class ShapeRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function ShapeRecognitionInput() {
    }

    /**
     * Inheritance property
     */
    ShapeRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    ShapeRecognitionInput.prototype.constructor = ShapeRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {ShapeParameter}
     */
    ShapeRecognitionInput.prototype.getParameters = function () {
        return new ShapeParameter({
            rejectDetectionSensitivity: this.rejectDetectionSensitivity,
            doBeautification: this.doBeautification,
            userResources: this.userResources
        });
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {ShapeParameter} parameters
     */
    ShapeRecognitionInput.prototype.setParameters = function (parameters) {
        if (parameters) {
            this.rejectDetectionSensitivity = parameters.getRejectDetectionSensitivity();
            this.doBeautification = parameters.hasBeautification();
            this.userResources = parameters.getUserResources();
        }
    };

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    ShapeRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    ShapeRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.ShapeRecognitionInput = ShapeRecognitionInput;
})(MyScript);



(function (scope) {
    /**
     * Recognition data for shape input
     *
     * @class ShapeRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function ShapeRecognitionData() {
    }

    /**
     * Inheritance property
     */
    ShapeRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    ShapeRecognitionData.prototype.constructor = ShapeRecognitionData;

    /**
     * Get shape input
     *
     * @method getRecognitionInput
     * @returns {ShapeRecognitionInput}
     */
    ShapeRecognitionData.prototype.getRecognitionInput = function () {
        return this.shapeInput;
    };

    /**
     * Set shape input
     *
     * @method setRecognitionInput
     * @param {ShapeRecognitionInput} input
     */
    ShapeRecognitionData.prototype.setRecognitionInput = function (input) {
        this.shapeInput = JSON.stringify(input);
    };

    // Export
    scope.ShapeRecognitionData = ShapeRecognitionData;
})(MyScript);



(function (scope) {
    /**
     * Parameters used for math recognition
     *
     * @class MathParameter
     * @extends AbstractParameter
     * @constructor
     */
    function MathParameter(obj) {
        scope.AbstractParameter.call(this, obj);
        this.resultTypes = [];
        this.userResources = [];
        if (obj) {
            if (obj.resultTypes) {
                this.resultTypes = obj.resultTypes;
            }
            if (obj.columnarOperation) {
                this.columnarOperation = obj.columnarOperation;
            }
            if (obj.userResources) {
                this.userResources = obj.userResources;
            }
            if (obj.scratchOutDetectionSensitivity) {
                this.scratchOutDetectionSensitivity = obj.scratchOutDetectionSensitivity;
            }
        }
    }

    /**
     * Inheritance property
     */
    MathParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    MathParameter.prototype.constructor = MathParameter;

    /**
     * Get the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method getResultTypes
     * @returns {Array}
     */
    MathParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the math result types (e.g. LaTex, MathML, SymbolTree)
     *
     * @method setResultTypes
     * @param {Array} resultTypes
     */
    MathParameter.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * Get the math result result orientation to columnar operations
     *
     * @method isColumnar
     * @returns {Boolean}
     */
    MathParameter.prototype.isColumnar = function () {
        return this.columnarOperation;
    };

    /**
     * Set the math result orientation to columnar operations
     *
     * @method setColumnar
     * @param  {Boolean} columnar
     */
    MathParameter.prototype.setColumnar = function (columnar) {
        this.columnarOperation = columnar;
    };

    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    MathParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array} userResources
     */
    MathParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MathParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @method setScratchOutDetectionSensitivity
     * @param {Number} scratchOutDetectionSensitivity
     */
    MathParameter.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    // Export
    scope.MathParameter = MathParameter;
})(MyScript);



(function (scope) {
    /**
     * Recognition input object for math recognition
     *
     * @class MathRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function MathRecognitionInput() {
    }

    /**
     * Inheritance property
     */
    MathRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    MathRecognitionInput.prototype.constructor = MathRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MathParameter}
     */
    MathRecognitionInput.prototype.getParameters = function () {
        return new MathParameter({
            resultTypes: this.resultTypes,
            columnarOperation: this.columnarOperation,
            userResources: this.userResources,
            scratchOutDetectionSensitivity: this.scratchOutDetectionSensitivity
        });
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MathParameter} parameters
     */
    MathRecognitionInput.prototype.setParameters = function (parameters) {
        if (parameters) {
            this.resultTypes = parameters.getResultTypes();
            this.columnarOperation = parameters.isColumnar();
            this.userResources = parameters.getUserResources();
            this.scratchOutDetectionSensitivity = parameters.getScratchOutDetectionSensitivity();
        }
    };

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    MathRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    MathRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.MathRecognitionInput = MathRecognitionInput;
})(MyScript);



(function (scope) {
    /**
     * Recognition data for math input
     *
     * @class MathRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function MathRecognitionData() {
    }

    /**
     * Inheritance property
     */
    MathRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    MathRecognitionData.prototype.constructor = MathRecognitionData;


    /**
     * Get math input
     *
     * @method getRecognitionInput
     * @returns {MathRecognitionInput}
     */
    MathRecognitionData.prototype.getRecognitionInput = function () {
        return this.mathInput;
    };

    /**
     * Set math input
     *
     * @method setRecognitionInput
     * @param {MathRecognitionInput} input
     */
    MathRecognitionData.prototype.setRecognitionInput = function (input) {
        this.mathInput = JSON.stringify(input);
    };

    // Export
    scope.MathRecognitionData = MathRecognitionData;
})(MyScript);



(function (scope) {
    /**
     * WebSocket start math recognition message
     *
     * @class MathStartRequestWSMessage
     * @extends AbstractStartRequestWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function MathStartRequestWSMessage(obj) {
        scope.AbstractStartRequestWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathStartRequestWSMessage.prototype = new scope.AbstractStartRequestWSMessage();

    /**
     * Constructor property
     */
    MathStartRequestWSMessage.prototype.constructor = MathStartRequestWSMessage;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MathParameter}
     */
    MathStartRequestWSMessage.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MathParameter} parameters
     */
    MathStartRequestWSMessage.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Get components
     *
     * @method getComponents
     * @returns {MathInputUnit[]}
     */
    MathStartRequestWSMessage.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set components
     *
     * @method setComponents
     * @param {MathInputUnit[]} components
     */
    MathStartRequestWSMessage.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.MathStartRequestWSMessage = MathStartRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket continue math recognition message
     *
     * @class MathContinueRequestWSMessage
     * @extends AbstractContinueRequestWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function MathContinueRequestWSMessage(obj) {
        this.type = 'continue';
        scope.AbstractContinueRequestWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MathContinueRequestWSMessage.prototype = new scope.AbstractContinueRequestWSMessage();

    /**
     * Constructor property
     */
    MathContinueRequestWSMessage.prototype.constructor = MathContinueRequestWSMessage;

    /**
     * Get components
     *
     * @method getComponents
     * @returns {MathInputUnit[]}
     */
    MathContinueRequestWSMessage.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set components
     *
     * @method setComponents
     * @param {MathInputUnit[]} components
     */
    MathContinueRequestWSMessage.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.MathContinueRequestWSMessage = MathContinueRequestWSMessage;
})(MyScript);


(function (scope) {
    /**
     * Abstract music input component
     *
     * @class AbstractMusicInputComponent
     * @extends AbstractComponent
     * @constructor
     */
    function AbstractMusicInputComponent(obj) {
        scope.AbstractComponent.call(this);
        if (obj) {
            if (obj.boundingBox) {
                this.boundingBox = new scope.Rectangle(obj.boundingBox);
            }
        }
    }

    /**
     * Inheritance property
     */
    AbstractMusicInputComponent.prototype = new scope.AbstractComponent();

    /**
     * Constructor property
     */
    AbstractMusicInputComponent.prototype.constructor = AbstractMusicInputComponent;

    /**
     * Get input component bounding-box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AbstractMusicInputComponent.prototype.getBoundingBox = function () {
        return this.boundingBox;
    };

    /**
     * Set input component bounding-box
     *
     * @method setBoundingBox
     * @param {Rectangle} boundingBox
     */
    AbstractMusicInputComponent.prototype.setBoundingBox = function (boundingBox) {
        this.boundingBox = boundingBox;
    };

    // Export
    scope.AbstractMusicInputComponent = AbstractMusicInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Accidental input component
     *
     * @class MusicAccidentalInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicAccidentalInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'accidental';
        if (obj) {
            if (obj.value) {
                this.value = obj.value;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicAccidentalInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicAccidentalInputComponent.prototype.constructor = MusicAccidentalInputComponent;

    /**
     * Get accidental input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicAccidentalInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set accidental input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicAccidentalInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicAccidentalInputComponent = MusicAccidentalInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Arpeggiate input component
     *
     * @class MusicArpeggiateInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicArpeggiateInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'arpeggiate';
        if (obj) {
            if (obj.value) {
                this.value = obj.value;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicArpeggiateInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicArpeggiateInputComponent.prototype.constructor = MusicArpeggiateInputComponent;

    /**
     * Get arpeggiate input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicArpeggiateInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set arpeggiate input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicArpeggiateInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicArpeggiateInputComponent = MusicArpeggiateInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Bar input component
     *
     * @class MusicBarInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicBarInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'bar';
        this.value = new scope.MusicBar();
        if (obj) {
            if (obj.value) {
                this.value = new scope.MusicBar(obj.value);
            }
        }

    }

    /**
     * Inheritance property
     */
    MusicBarInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicBarInputComponent.prototype.constructor = MusicBarInputComponent;

    /**
     * Get bar component value
     *
     * @method getValue
     * @returns {MusicBar}
     */
    MusicBarInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set bar component value
     *
     * @method setValue
     * @param {MusicBar} value
     */
    MusicBarInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBarInputComponent = MusicBarInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Beam input component
     *
     * @class MusicBeamInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicBeamInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'beam';
        this.value = new scope.MusicBeam();
        if (obj) {
            if (obj.value) {
                this.value = new scope.MusicBeam(obj.value);
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicBeamInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicBeamInputComponent.prototype.constructor = MusicBeamInputComponent;

    /**
     * Get beam input component value
     *
     * @method getValue
     * @returns {MusicBeam}
     */
    MusicBeamInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set beam input component value
     *
     * @method setValue
     * @param {MusicBeam} value
     */
    MusicBeamInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicBeamInputComponent = MusicBeamInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Clef input component
     * default clef values: symbol='G', octave=0
     *
     * @class MusicClefInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicClefInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'clef';
        this.value = new scope.MusicClef();
        if (obj) {
            if (obj.value) {
                this.value = new scope.MusicClef(obj.value);
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicClefInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicClefInputComponent.prototype.constructor = MusicClefInputComponent;

    /**
     * Get clef input component value
     *
     * @method getValue
     * @returns {MusicClef}
     */
    MusicClefInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set clef input component value
     *
     * @method setValue
     * @param {MusicClef} value
     */
    MusicClefInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicClefInputComponent = MusicClefInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Decoration input component
     *
     * @class MusicDecorationInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicDecorationInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'decoration';
        this.value = new scope.MusicDecoration();
        if (obj) {
            if (obj.value) {
                this.value = new scope.MusicDecoration(obj.value);
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicDecorationInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicDecorationInputComponent.prototype.constructor = MusicDecorationInputComponent;

    /**
     * Get decoration input component value
     *
     * @method getValue
     * @returns {MusicDecoration}
     */
    MusicDecorationInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set decoration input component value
     *
     * @method setValue
     * @param {MusicDecoration} value
     */
    MusicDecorationInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicDecorationInputComponent = MusicDecorationInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Dots input component
     *
     * @class MusicDotsInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicDotsInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'dots';
        if (obj) {
            if (obj.value) {
                this.value = obj.value;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicDotsInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicDotsInputComponent.prototype.constructor = MusicDotsInputComponent;

    /**
     * Get dots input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicDotsInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set dots input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicDotsInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicDotsInputComponent = MusicDotsInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Head input component
     *
     * @class MusicHeadInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicHeadInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'head';
        if (obj) {
            if (obj.value) {
                this.value = obj.value;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicHeadInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicHeadInputComponent.prototype.constructor = MusicHeadInputComponent;

    /**
     * Get head input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicHeadInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set head input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicHeadInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicHeadInputComponent = MusicHeadInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Ledger line input component
     *
     * @class MusicLedgerLineInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicLedgerLineInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'ledgerLine';
    }

    /**
     * Inheritance property
     */
    MusicLedgerLineInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicLedgerLineInputComponent.prototype.constructor = MusicLedgerLineInputComponent;

    // Export
    scope.MusicLedgerLineInputComponent = MusicLedgerLineInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Rest input component
     *
     * @class MusicRestInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicRestInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'rest';
        if (obj) {
            if (obj.value) {
                this.value = obj.value;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicRestInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicRestInputComponent.prototype.constructor = MusicRestInputComponent;

    /**
     * Get rest input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicRestInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set rest input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicRestInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicRestInputComponent = MusicRestInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Stem input component
     *
     * @class MusicStemInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicStemInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'stem';
        if (obj) {
            if (obj.value) {
                this.value = obj.value;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicStemInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicStemInputComponent.prototype.constructor = MusicStemInputComponent;

    /**
     * Get stem input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicStemInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set stem input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicStemInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicStemInputComponent = MusicStemInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Tie ro slur input component
     *
     * @class MusicTieOrSlurInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicTieOrSlurInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'tieOrSlur';
        if (obj) {
            if (obj.value) {
                this.value = obj.value;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicTieOrSlurInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicTieOrSlurInputComponent.prototype.constructor = MusicTieOrSlurInputComponent;

    /**
     * Get tie or slur input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicTieOrSlurInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set tie or slur input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicTieOrSlurInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicTieOrSlurInputComponent = MusicTieOrSlurInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Time signature input component
     *
     * @class MusicTimeSignatureInputComponent
     * @extends AbstractMusicInputComponent
     * @constructor
     */
    function MusicTimeSignatureInputComponent(obj) {
        scope.AbstractMusicInputComponent.call(this, obj);
        this.type = 'timeSignature';
        if (obj) {
            if (obj.value) {
                this.value = obj.value;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicTimeSignatureInputComponent.prototype = new scope.AbstractMusicInputComponent();

    /**
     * Constructor property
     */
    MusicTimeSignatureInputComponent.prototype.constructor = MusicTimeSignatureInputComponent;

    /**
     * Get time signature input component value
     *
     * @method getValue
     * @returns {String}
     */
    MusicTimeSignatureInputComponent.prototype.getValue = function () {
        return this.value;
    };

    /**
     * Set time signature input component value
     *
     * @method setValue
     * @param {String} value
     */
    MusicTimeSignatureInputComponent.prototype.setValue = function (value) {
        this.value = value;
    };

    // Export
    scope.MusicTimeSignatureInputComponent = MusicTimeSignatureInputComponent;
})(MyScript);



(function (scope) {
    /**
     * Represents a staff used for music recognition
     * default values: count=5, gap=20
     *
     * @class MusicStaff
     * @constructor
     */
    function MusicStaff(obj) {
        this.count = 5;
        this.gap = 20;
        if (obj) {
            if (obj.count) {
                this.count = obj.count;
            }
            if (obj.gap) {
                this.gap = obj.gap;
            }
            if (obj.top) {
                this.top = obj.top;
            }
        }
    }

    /**
     * Get the lines count
     *
     * @method getCount
     * @returns {Number}
     */
    MusicStaff.prototype.getCount = function () {
        return this.count;
    };

    /**
     * Set the lines count
     *
     * @method setCount
     * @param {Number} count
     */
    MusicStaff.prototype.setCount = function (count) {
        this.count = count;
    };

    /**
     * Get the spacing from the top
     *
     * @method getTop
     * @returns {Number}
     */
    MusicStaff.prototype.getTop = function () {
        return this.top;
    };

    /**
     * Set the spacing from the top
     *
     * @method setTop
     * @param {Number} top
     */
    MusicStaff.prototype.setTop = function (top) {
        this.top = top;
    };

    /**
     * Get the gap between lines
     *
     * @method getGap
     * @returns {Number}
     */
    MusicStaff.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * Set the gap between lines
     *
     * @method setGap
     * @param {Number} gap
     */
    MusicStaff.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    // Export
    scope.MusicStaff = MusicStaff;
})(MyScript);



(function (scope) {
    /**
     * Parameters used for music recognition
     *
     * @class MusicParameter
     * @extends AbstractParameter
     * @constructor
     */
    function MusicParameter(obj) {
        scope.AbstractParameter.call(this, obj);
        this.resultTypes = [];
        this.userResources = [];
        if (obj) {
            if (obj.divisions) {
                this.divisions = obj.divisions;
            }
            if (obj.staff) {
                this.staff = new scope.MusicStaff(obj.staff);
            }
            if (obj.scratchOutDetectionSensitivity) {
                this.scratchOutDetectionSensitivity = obj.scratchOutDetectionSensitivity;
            }
            if (obj.userResources) {
                this.userResources = obj.userResources;
            }
            if (obj.resultTypes) {
                this.resultTypes = obj.resultTypes;
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    MusicParameter.prototype.constructor = MusicParameter;

    /**
     * Get the music result types (e.g. MusicXML, ScoreTree)
     *
     * @method getResultTypes
     * @returns {Array}
     */
    MusicParameter.prototype.getResultTypes = function () {
        return this.resultTypes;
    };

    /**
     * Set the music result types (e.g. MusicXML, ScoreTree)
     *
     * @method setResultTypes
     * @param {Array} resultTypes
     */
    MusicParameter.prototype.setResultTypes = function (resultTypes) {
        this.resultTypes = resultTypes;
    };

    /**
     * Get the user resources
     *
     * @method getUserResources
     * @returns {Array}
     */
    MusicParameter.prototype.getUserResources = function () {
        return this.userResources;
    };

    /**
     * Set the user resources
     *
     * @method setUserResources
     * @param {Array} userResources
     */
    MusicParameter.prototype.setUserResources = function (userResources) {
        this.userResources = userResources;
    };

    /**
     * Get the sensitivity of the scratch-out detection
     *
     * @method getScratchOutDetectionSensitivity
     * @returns {Number}
     */
    MusicParameter.prototype.getScratchOutDetectionSensitivity = function () {
        return this.scratchOutDetectionSensitivity;
    };

    /**
     * Set the sensitivity of the scratch-out detection
     *
     * @method setScratchOutDetectionSensitivity
     * @param {Number} scratchOutDetectionSensitivity
     */
    MusicParameter.prototype.setScratchOutDetectionSensitivity = function (scratchOutDetectionSensitivity) {
        this.scratchOutDetectionSensitivity = scratchOutDetectionSensitivity;
    };

    /**
     * Get the staff
     *
     * @method getStaff
     * @returns {MusicStaff}
     */
    MusicParameter.prototype.getStaff = function () {
        return this.staff;
    };

    /**
     * Set the staff
     *
     * @method setStaff
     * @param {MusicStaff} staff
     */
    MusicParameter.prototype.setStaff = function (staff) {
        this.staff = staff;
    };

    /**
     * Get the number of divisions
     *
     * @method getDivisions
     * @returns {Number}
     */
    MusicParameter.prototype.getDivisions = function () {
        return this.divisions;
    };

    /**
     * Set the number of divisions
     *
     * @method setDivisions
     * @param {Number} divisions
     */
    MusicParameter.prototype.setDivisions = function (divisions) {
        this.divisions = divisions;
    };

    // Export
    scope.MusicParameter = MusicParameter;
})(MyScript);



(function (scope) {
    /**
     * Recognition input object for music recognition
     *
     * @class MusicRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function MusicRecognitionInput() {
    }

    /**
     * Inheritance property
     */
    MusicRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    MusicRecognitionInput.prototype.constructor = MusicRecognitionInput;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MusicParameter}
     */
    MusicRecognitionInput.prototype.getParameters = function () {
        return new MusicParameter({
            divisions: this.divisions,
            staff: this.staff,
            scratchOutDetectionSensitivity: this.scratchOutDetectionSensitivity,
            resultTypes: this.resultTypes,
            userResources: this.userResources
        });
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MusicParameter} parameters
     */
    MusicRecognitionInput.prototype.setParameters = function (parameters) {
        if (parameters) {
            this.divisions = parameters.getDivisions();
            this.staff = parameters.getStaff();
            this.scratchOutDetectionSensitivity = parameters.getScratchOutDetectionSensitivity();
            this.resultTypes = parameters.getResultTypes();
            this.userResources = parameters.getUserResources();
        }
    };

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    MusicRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    MusicRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.MusicRecognitionInput = MusicRecognitionInput;
})(MyScript);



(function (scope) {
    /**
     * Recognition data for music input
     *
     * @class MusicRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function MusicRecognitionData() {
    }

    /**
     * Inheritance property
     */
    MusicRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    MusicRecognitionData.prototype.constructor = MusicRecognitionData;

    /**
     * Get music input
     *
     * @method getRecognitionInput
     * @returns {MusicRecognitionInput}
     */
    MusicRecognitionData.prototype.getRecognitionInput = function () {
        return this.musicInput;
    };

    /**
     * Set music input
     *
     * @method setRecognitionInput
     * @param {MusicRecognitionInput} input
     */
    MusicRecognitionData.prototype.setRecognitionInput = function (input) {
        this.musicInput = JSON.stringify(input);
    };

    // Export
    scope.MusicRecognitionData = MusicRecognitionData;
})(MyScript);



(function (scope) {
    /**
     * Parameters used for analyzer recognition
     *
     * @class AnalyzerParameter
     * @extends AbstractParameter
     * @constructor
     */
    function AnalyzerParameter(obj) {
        scope.AbstractParameter.call(this, obj);
        this.textParameter = new scope.TextParameter();
        this.textParameter.setLanguage('en_US');
        this.textParameter.setInputMode('CURSIVE');
        if (obj) {
            if (obj.coordinateResolution) {
                this.coordinateResolution = obj.coordinateResolution;
            }
            if (obj.textParameter) {
                this.textParameter = new scope.TextParameter(obj.textParameter);
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerParameter.prototype = new scope.AbstractParameter();

    /**
     * Constructor property
     */
    AnalyzerParameter.prototype.constructor = AnalyzerParameter;

    /**
     * Get text recognition parameters
     *
     * @method getTextParameters
     * @returns {TextParameter}
     */
    AnalyzerParameter.prototype.getTextParameters = function () {
        return this.textParameter;
    };

    /**
     * Set text recognition parameters
     *
     * @method setTextParameters
     * @param {TextParameter} parameters
     */
    AnalyzerParameter.prototype.setTextParameters = function (parameters) {
        this.textParameter = parameters;
    };

    /**
     * Get analyzer coordinate resolution
     *
     * @method getCoordinateResolution
     * @returns {Number}
     */
    AnalyzerParameter.prototype.getCoordinateResolution = function () {
        return this.coordinateResolution;
    };

    /**
     * Set analyzer coordinate resolution
     *
     * @method setCoordinateResolution
     * @param {Number} coordinateResolution
     */
    AnalyzerParameter.prototype.setCoordinateResolution = function (coordinateResolution) {
        this.coordinateResolution = coordinateResolution;
    };

    // Export
    scope.AnalyzerParameter = AnalyzerParameter;
})(MyScript);



(function (scope) {
    /**
     * Recognition input object for analyzer recognition
     *
     * @class AnalyzerRecognitionInput
     * @extends AbstractRecognitionInput
     * @constructor
     */
    function AnalyzerRecognitionInput() {

    }

    /**
     * Inheritance property
     */
    AnalyzerRecognitionInput.prototype = new scope.AbstractRecognitionInput();

    /**
     * Constructor property
     */
    AnalyzerRecognitionInput.prototype.constructor = AnalyzerRecognitionInput;

    /**
     * Get analyzer recognition parameters
     *
     * @method getParameters
     * @returns {AnalyzerParameter}
     */
    AnalyzerRecognitionInput.prototype.getParameters = function () {
        return this.parameter;
    };

    /**
     * Set analyzer recognition parameters
     *
     * @method setParameters
     * @param {AnalyzerParameter} parameters
     */
    AnalyzerRecognitionInput.prototype.setParameters = function (parameters) {
        this.parameter = parameters;
    };

    /**
     * Get input components
     *
     * @method getComponents
     * @returns {AbstractComponent[]}
     */
    AnalyzerRecognitionInput.prototype.getComponents = function () {
        return this.components;
    };

    /**
     * Set input components
     *
     * @method setComponents
     * @param {AbstractComponent[]} components
     */
    AnalyzerRecognitionInput.prototype.setComponents = function (components) {
        this.components = components;
    };

    // Export
    scope.AnalyzerRecognitionInput = AnalyzerRecognitionInput;
})(MyScript);


(function (scope) {
    /**
     * Recognition data for analyzer input
     *
     * @class AnalyzerRecognitionData
     * @extends AbstractRecognitionData
     * @constructor
     */
    function AnalyzerRecognitionData() {
    }

    /**
     * Inheritance property
     */
    AnalyzerRecognitionData.prototype = new scope.AbstractRecognitionData();

    /**
     * Constructor property
     */
    AnalyzerRecognitionData.prototype.constructor = AnalyzerRecognitionData;

    /**
     * Get analyzer input
     *
     * @method getRecognitionInput
     * @returns {AnalyzerRecognitionInput}
     */
    AnalyzerRecognitionData.prototype.getRecognitionInput = function () {
        return this.analyzerInput;
    };

    /**
     * Set analyzer input
     *
     * @method setRecognitionInput
     * @param {AnalyzerRecognitionInput} input
     */
    AnalyzerRecognitionData.prototype.setRecognitionInput = function (input) {
        this.analyzerInput = JSON.stringify(input);
    };

    // Export
    scope.AnalyzerRecognitionData = AnalyzerRecognitionData;
})(MyScript);



(function (scope) {
    /**
     * Abstract result
     *
     * @class AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function AbstractResult(obj) {
        if (obj) {
            this.instanceId = obj.instanceId;
        }
    }

    /**
     * Get instance id
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractResult.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Get document
     *
     * @method getDocument
     * @returns {TextDocument|ShapeDocument|MathDocument|MusicDocument|AnalyzerDocument}
     */
    AbstractResult.prototype.getDocument = function () {
        return this.result;
    };

    // Export
    scope.AbstractResult = AbstractResult;
})(MyScript);


(function (scope) {
    /**
     * WebSocket recognition text result message
     *
     * @class AbstractRecoResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function AbstractRecoResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
        if (obj) {
            this.instanceId = obj.instanceId;
        }
    }

    /**
     * Inheritance property
     */
    AbstractRecoResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    AbstractRecoResponseWSMessage.prototype.constructor = AbstractRecoResponseWSMessage;

    /**
     * Get instance id
     *
     * @method getInstanceId
     * @returns {String}
     */
    AbstractRecoResponseWSMessage.prototype.getInstanceId = function () {
        return this.instanceId;
    };

    /**
     * Get document
     *
     * @method getDocument
     * @returns {TextDocument|ShapeDocument|MathDocument|MusicDocument|AnalyzerDocument}
     */
    AbstractRecoResponseWSMessage.prototype.getDocument = function () {
        return this.result;
    };

    // Export
    scope.AbstractRecoResponseWSMessage = AbstractRecoResponseWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket recognition hmac challenge message
     *
     * @class ChallengeResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ChallengeResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
        if (obj) {
            this.challenge = obj.challenge;
        }
    }

    /**
     * Inheritance property
     */
    ChallengeResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ChallengeResponseWSMessage.prototype.constructor = ChallengeResponseWSMessage;

    /**
     * Get the challenge
     *
     * @method getChallenge
     * @returns {String}
     */
    ChallengeResponseWSMessage.prototype.getChallenge = function () {
        return this.challenge;
    };

    // Export
    scope.ChallengeResponseWSMessage = ChallengeResponseWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket recognition error message
     *
     * @class ErrorResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ErrorResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
        if (obj) {
            this.error = obj.error;
        }
    }

    /**
     * Inheritance property
     */
    ErrorResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ErrorResponseWSMessage.prototype.constructor = ErrorResponseWSMessage;

    /**
     * Get the error
     *
     * @method getError
     * @returns {String}
     */
    ErrorResponseWSMessage.prototype.getError = function () {
        return this.error;
    };

    // Export
    scope.ErrorResponseWSMessage = ErrorResponseWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket recognition init message
     *
     * @class InitResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function InitResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    InitResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    InitResponseWSMessage.prototype.constructor = InitResponseWSMessage;

    // Export
    scope.InitResponseWSMessage = InitResponseWSMessage;
})(MyScript);


(function (scope) {
    /**
     * WebSocket recognition reset message
     *
     * @class ResetResponseWSMessage
     * @extends AbstractWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function ResetResponseWSMessage(obj) {
        scope.AbstractWSMessage.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ResetResponseWSMessage.prototype = new scope.AbstractWSMessage();

    /**
     * Constructor property
     */
    ResetResponseWSMessage.prototype.constructor = ResetResponseWSMessage;

    // Export
    scope.ResetResponseWSMessage = ResetResponseWSMessage;
})(MyScript);


(function (scope) {
    /**
     * Text ink ranges
     *
     * @class TextInkRange
     * @param {Object} [obj]
     * @constructor
     */
    function TextInkRange(obj) {
        if (obj) {
            if (typeof obj === 'string') {
                var cpt = obj.split(/[:-]+/);
                this.startUnit = Number(cpt[0]);
                this.startComponent = Number(cpt[1]);
                this.startPoint = Number(cpt[2]);
                this.endUnit = Number(cpt[3]);
                this.endComponent = Number(cpt[4]);
                this.endPoint = Number(cpt[5]);
            } else {
                this.startUnit = obj.startUnit;
                this.startComponent = obj.startComponent;
                this.startPoint = obj.startPoint;
                this.endUnit = obj.endUnit;
                this.endComponent = obj.endComponent;
                this.endPoint = obj.endPoint;
            }
        }
    }

    /**
     * Get start unit
     *
     * @method getStartUnit
     * @returns {Number}
     */
    TextInkRange.prototype.getStartUnit = function () {
        return this.startUnit;
    };

    /**
     * Get end unit
     *
     * @method getEndUnit
     * @returns {Number}
     */
    TextInkRange.prototype.getEndUnit = function () {
        return this.endUnit;
    };

    /**
     * Get start component
     *
     * @method getStartComponent
     * @returns {Number}
     */
    TextInkRange.prototype.getStartComponent = function () {
        return this.startComponent;
    };

    /**
     * Get end component
     *
     * @method getEndComponent
     * @returns {Number}
     */
    TextInkRange.prototype.getEndComponent = function () {
        return this.endComponent;
    };

    /**
     * Get start point
     *
     * @method getStartPoint
     * @returns {Number}
     */
    TextInkRange.prototype.getStartPoint = function () {
        return this.startPoint;
    };

    /**
     * Get end point
     *
     * @method getEndPoint
     * @returns {Number}
     */
    TextInkRange.prototype.getEndPoint = function () {
        return this.endPoint;
    };

    // Export
    scope.TextInkRange = TextInkRange;
})(MyScript);



(function (scope) {
    /**
     * Text candidate
     *
     * @class TextCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function TextCandidate(obj) {
        this.flags = [];
        this.children = [];
        if (obj) {
            this.label = obj.label;
            this.normalizedScore = obj.normalizedScore;
            this.spellingDistortionRatio = obj.spellingDistortionRatio;
            for (var i in obj.flags) {
                this.flags.push(obj.flags[i]);
            }
            for (var j in obj.children) {
                this.children.push(new scope.TextSegment(obj.children[j]));
            }
        }
    }

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    TextCandidate.prototype.getLabel = function () {
        return this.label;
    };

    /**
     * Get normalized score
     *
     * @method getNormalizedScore
     * @returns {Number}
     */
    TextCandidate.prototype.getNormalizedScore = function () {
        return this.normalizedScore;
    };

    /**
     * Get resemblance score
     *
     * @method getResemblanceScore
     * @returns {Number}
     */
    TextCandidate.prototype.getResemblanceScore = function () {
        return this.resemblanceScore;
    };

    /**
     * Get spelling distortion ratio
     *
     * @method getSpellingDistortionRatio
     * @returns {Number}
     */
    TextCandidate.prototype.getSpellingDistortionRatio = function () {
        return this.spellingDistortionRatio;
    };

    /**
     * Get flags
     *
     * @method getFlags
     * @returns {Array}
     */
    TextCandidate.prototype.getFlags = function () {
        return this.flags;
    };

    /**
     * Get children
     *
     * @method getChildren
     * @returns {TextSegment[]}
     */
    TextCandidate.prototype.getChildren = function () {
        return this.children;
    };

    // Export
    scope.TextCandidate = TextCandidate;
})(MyScript);


(function (scope) {
    /**
     * Text document
     *
     * @class TextDocument
     * @param {Object} [obj]
     * @constructor
     */
    function TextDocument(obj) {
        this.tagItems = [];
        this.wordSegments = [];
        this.charSegments = [];
        if (obj) {
            if (obj.textSegmentResult) {
                this.textSegmentResult = new scope.TextSegment(obj.textSegmentResult);
            }
            for (var i in obj.tagItems) {
                this.tagItems.push(new scope.TextTagItem(obj.tagItems[i]));
            }
            for (var j in obj.wordSegments) {
                this.wordSegments.push(new scope.TextSegment(obj.wordSegments[j]));
            }
            for (var k in obj.charSegments) {
                this.charSegments.push(new scope.TextSegment(obj.charSegments[k]));
            }
            /**
             * @deprecated
             */
            for (var l in obj.wordCandidates) {
                this.wordSegments.push(new scope.TextSegment(obj.wordCandidates[l]));
            }
            /**
             * @deprecated
             */
            for (var m in obj.charCandidates) {
                this.charSegments.push(new scope.TextSegment(obj.charCandidates[m]));
            }
        }
    }

    /**
     * Get tag items
     *
     * @method getTagItems
     * @returns {TextTagItem[]}
     */
    TextDocument.prototype.getTagItems = function () {
        return this.tagItems;
    };

    /**
     * Get word segments
     *
     * @method getWordSegments
     * @returns {TextSegment[]}
     */
    TextDocument.prototype.getWordSegments = function () {
        return this.wordSegments;
    };

    /**
     * Get word segment
     *
     * @method getWordSegment
     * @param {TextInkRange[]} inkRanges
     * @returns {TextSegment}
     */
    TextDocument.prototype.getWordSegment = function (inkRanges) {
        for (var i = 0; i < this.getWordSegments().length; i++) {
            if (JSON.stringify(this.getWordSegments()[i].getInkRanges()) === JSON.stringify(inkRanges)) {
                return this.getWordSegments()[i];
            }
        }
        return undefined;
    };

    /**
     * Get char segments
     *
     * @method getCharSegments
     * @returns {TextSegment[]}
     */
    TextDocument.prototype.getCharSegments = function () {
        return this.charSegments;
    };

    /**
     * Get char segment
     *
     * @method getCharSegment
     * @param {TextInkRange[]} inkRanges
     * @returns {TextSegment}
     */
    TextDocument.prototype.getCharSegment = function (inkRanges) {
        for (var i = 0; i < this.getCharSegments().length; i++) {
            if (JSON.stringify(this.getCharSegments()[i].getInkRanges()) === JSON.stringify(inkRanges)) {
                return this.getCharSegments()[i];
            }
        }
        return undefined;
    };

    /**
     * Get text segment
     *
     * @method getTextSegment
     * @returns {TextSegment}
     */
    TextDocument.prototype.getTextSegment = function () {
        return this.textSegmentResult;
    };

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    TextDocument.prototype.hasScratchOutResults = function () {
        return false;
    };

    // Export
    scope.TextDocument = TextDocument;
})(MyScript);



(function (scope) {
    /**
     * Text result
     *
     * @class TextResult
     * @extends AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function TextResult(obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.TextDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    TextResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    TextResult.prototype.constructor = TextResult;

    // Export
    scope.TextResult = TextResult;
})(MyScript);



(function (scope) {
    /**
     * Text segment
     *
     * @class TextSegment
     * @param {Object} [obj]
     * @constructor
     */
    function TextSegment(obj) {
        this.candidates = [];
        this.inkRanges = [];
        if (obj) {
            this.selectedCandidateIdx = obj.selectedCandidateIdx;
            if (obj.inkRanges) {
                var ranges = obj.inkRanges;
                if (!Array.isArray(ranges)) {
                    ranges = ranges.split(/[\s]+/);
                }
                for (var j in ranges) {
                    this.inkRanges.push(new scope.TextInkRange(ranges[j]));
                }
            }
            for (var i in obj.candidates) {
                this.candidates.push(new scope.TextCandidate(obj.candidates[i]));
            }
        }
    }

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {TextCandidate[]}
     */
    TextSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    TextSegment.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidateIdx;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {TextCandidate}
     */
    TextSegment.prototype.getSelectedCandidate = function () {
        if ((this.getCandidates().length > 0) && (this.getSelectedCandidateIdx() !== undefined)) {
            return this.getCandidates()[this.getSelectedCandidateIdx()];
        } else {
            return undefined;
        }
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {TextInkRange[]}
     */
    TextSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextSegment = TextSegment;
})(MyScript);



(function (scope) {
    /**
     * Text tag item
     *
     * @class TextTagItem
     * @param {Object} [obj]
     * @constructor
     */
    function TextTagItem(obj) {
        this.inkRanges = [];
        if (obj) {
            this.tagType = obj.tagType;
            if (obj.inkRanges) {
                var ranges = obj.inkRanges;
                if (!Array.isArray(ranges)) {
                    ranges = ranges.split(/[\s]+/);
                }
                for (var i in ranges) {
                    this.inkRanges.push(new scope.TextInkRange(ranges[i]));
                }
            }
        }
    }

    /**
     * Get tag type
     *
     * @method getTagType
     * @returns {String}
     */
    TextTagItem.prototype.getTagType = function () {
        return this.tagType;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {TextInkRange[]}
     */
    TextTagItem.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.TextTagItem = TextTagItem;
})(MyScript);



(function (scope) {
    /**
     * WebSocket recognition text result message
     *
     * @class TextResponseWSMessage
     * @extends AbstractRecoResponseWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function TextResponseWSMessage(obj) {
        scope.AbstractRecoResponseWSMessage.call(this, obj);
        if (obj) {
            this.result = new scope.TextDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    TextResponseWSMessage.prototype = new scope.AbstractRecoResponseWSMessage();

    /**
     * Constructor property
     */
    TextResponseWSMessage.prototype.constructor = TextResponseWSMessage;

    // Export
    scope.TextResponseWSMessage = TextResponseWSMessage;
})(MyScript);



(function (scope) {
    /**
     * Abstract shape primitive
     *
     * @class AbstractShapePrimitive
     * @param {Object} [obj]
     * @constructor
     */
    function AbstractShapePrimitive(obj) {
        if (obj) {
            this.type = obj.type;
            this.beginDecoration = obj.beginDecoration;
            this.beginTangentAngle = obj.beginTangentAngle;
            this.endDecoration = obj.endDecoration;
            this.endTangentAngle = obj.endTangentAngle;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AbstractShapePrimitive.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is line
     *
     * @method isLine
     * @returns {Boolean}
     */
    AbstractShapePrimitive.prototype.isLine = function () {
        return this.type === 'line';
    };

    /**
     * Is ellipse
     *
     * @method isEllipse
     * @returns {Boolean}
     */
    AbstractShapePrimitive.prototype.isEllipse = function () {
        return this.type === 'ellipse';
    };

    /**
     * Has begin decoration
     *
     * @method hasBeginDecoration
     * @returns {Boolean}
     */
    AbstractShapePrimitive.prototype.hasBeginDecoration = function () {
        return typeof this.beginDecoration !== 'undefined';
    };

    /**
     * Has end decoration
     *
     * @method hasEndDecoration
     * @returns {Boolean}
     */
    AbstractShapePrimitive.prototype.hasEndDecoration = function () {
        return typeof this.endDecoration !== 'undefined';
    };

    /**
     * Get begin decoration
     *
     * @method getBeginDecoration
     * @returns {String}
     */
    AbstractShapePrimitive.prototype.getBeginDecoration = function () {
        return this.beginDecoration;
    };

    /**
     * Get end decoration
     *
     * @method getEndDecoration
     * @returns {String}
     */
    AbstractShapePrimitive.prototype.getEndDecoration = function () {
        return this.endDecoration;
    };

    /**
     * Get begin tangent angle
     *
     * @method getBeginTangentAngle
     * @returns {Number}
     */
    AbstractShapePrimitive.prototype.getBeginTangentAngle = function () {
        return this.beginTangentAngle;
    };

    /**
     * Get end tangent angle
     *
     * @method getEndTangentAngle
     * @returns {Number}
     */
    AbstractShapePrimitive.prototype.getEndTangentAngle = function () {
        return this.endTangentAngle;
    };

    // Export
    scope.AbstractShapePrimitive = AbstractShapePrimitive;
})(MyScript);


(function (scope) {
    /**
     * Shape candidate
     *
     * @class ShapeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeCandidate(obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    ShapeCandidate.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is erased
     *
     * @method isErased
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isErased = function () {
        return this.type === 'erased';
    };

    /**
     * Is scratch-out
     *
     * @method isScratchOut
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isScratchOut = function () {
        return this.type === 'scratchOut';
    };

    /**
     * Is not recognized
     *
     * @method isNotRecognized
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isNotRecognized = function () {
        return this.type === 'notRecognized';
    };

    /**
     * Is recognized
     *
     * @method isRecognized
     * @returns {Boolean}
     */
    ShapeCandidate.prototype.isRecognized = function () {
        return this.type === 'recognizedShape';
    };

    // Export
    scope.ShapeCandidate = ShapeCandidate;
})(MyScript);


(function (scope) {
    /**
     * Shape document
     *
     * @class ShapeDocument
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeDocument(obj) {
        this.segments = [];
        if (obj) {
            for (var i in obj.segments) {
                this.segments.push(new scope.ShapeSegment(obj.segments[i]));
            }
        }
    }

    /**
     * Get segments
     *
     * @method getSegments
     * @returns {ShapeSegment[]}
     */
    ShapeDocument.prototype.getSegments = function () {
        return this.segments;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {ShapeInkRange[]}
     */
    ShapeDocument.prototype.getInkRanges = function () {
        var inkRanges = [];
        for (var i in this.segments) {
            inkRanges = inkRanges.concat(this.segments[i].getInkRanges());
        }
        return inkRanges;
    };

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    ShapeDocument.prototype.hasScratchOutResults = function () {
        for (var i in this.getSegments()) {
            var currentSeg = this.getSegments()[i];
            for (var j in currentSeg.getCandidates()) {
                var currentCandidate = currentSeg.getCandidates()[j];
                if (currentCandidate instanceof scope.ShapeScratchOut) {
                    return true;
                }
            }
        }
        return false;
    };

    // Export
    scope.ShapeDocument = ShapeDocument;
})(MyScript);



(function (scope) {
    /**
     * Shape ellipse
     *
     * @class ShapeEllipse
     * @extends AbstractShapePrimitive
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeEllipse(obj) {
        scope.AbstractShapePrimitive.call(this, obj);
        if (obj) {
            this.center = new scope.Point(obj.center);
            this.minRadius = obj.minRadius;
            this.maxRadius = obj.maxRadius;
            this.orientation = obj.orientation;
            this.startAngle = obj.startAngle;
            this.sweepAngle = obj.sweepAngle;
        }
    }

    /**
     * Inheritance property
     */
    ShapeEllipse.prototype = new scope.AbstractShapePrimitive();

    /**
     * Constructor property
     */
    ShapeEllipse.prototype.constructor = ShapeEllipse;

    /**
     * Get center
     *
     * @method getCenter
     * @returns {Point}
     */
    ShapeEllipse.prototype.getCenter = function () {
        return this.center;
    };

    /**
     * Get min radius
     *
     * @method getMinRadius
     * @returns {Number}
     */
    ShapeEllipse.prototype.getMinRadius = function () {
        return this.minRadius;
    };

    /**
     * Get max radius
     *
     * @method getMaxRadius
     * @returns {Number}
     */
    ShapeEllipse.prototype.getMaxRadius = function () {
        return this.maxRadius;
    };

    /**
     * Get orientation
     *
     * @method getOrientation
     * @returns {String}
     */
    ShapeEllipse.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     * Get start angle
     *
     * @method getStartAngle
     * @returns {Number}
     */
    ShapeEllipse.prototype.getStartAngle = function () {
        return this.startAngle;
    };

    /**
     * Get sweep angle
     *
     * @method getSweepAngle
     * @returns {Number}
     */
    ShapeEllipse.prototype.getSweepAngle = function () {
        return this.sweepAngle;
    };

    // Export
    scope.ShapeEllipse = ShapeEllipse;
})(MyScript);


(function (scope) {
    /**
     * Shape erased
     *
     * @class ShapeErased
     * @extends ShapeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeErased(obj) {
        scope.ShapeCandidate.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ShapeErased.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeErased.prototype.constructor = ShapeErased;

    // Export
    scope.ShapeErased = ShapeErased;
})(MyScript);


(function (scope) {
    /**
     * Shape ink range
     *
     * @class ShapeInkRange
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeInkRange(obj) {
        if (obj) {
            this.firstStroke = obj.firstStroke;
            this.lastStroke = obj.lastStroke;
            this.firstPoint = obj.firstPoint;
            this.lastPoint = obj.lastPoint;
        }
    }

    /**
     * Get first stroke
     *
     * @method getFirstStroke
     * @returns {Number}
     */
    ShapeInkRange.prototype.getFirstStroke = function () {
        return this.firstStroke;
    };

    /**
     * Get last stroke
     *
     * @method getLastStroke
     * @returns {Number}
     */
    ShapeInkRange.prototype.getLastStroke = function () {
        return this.lastStroke;
    };

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {Number}
     */
    ShapeInkRange.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {Number}
     */
    ShapeInkRange.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    // Export
    scope.ShapeInkRange = ShapeInkRange;
})(MyScript);


(function (scope) {
    /**
     * Shape line
     *
     * @class ShapeLine
     * @extends AbstractShapePrimitive
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeLine(obj) {
        scope.AbstractShapePrimitive.call(this, obj);
        if (obj) {
            this.firstPoint = new scope.Point(obj.firstPoint);
            this.lastPoint = new scope.Point(obj.lastPoint);
        }
    }

    /**
     * Inheritance property
     */
    ShapeLine.prototype = new scope.AbstractShapePrimitive();

    /**
     * Constructor property
     */
    ShapeLine.prototype.constructor = ShapeLine;

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {Point}
     */
    ShapeLine.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {Point}
     */
    ShapeLine.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    // Export
    scope.ShapeLine = ShapeLine;
})(MyScript);


(function (scope) {
    /**
     * Shape not recognized
     *
     * @class ShapeNotRecognized
     * @extends ShapeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeNotRecognized(obj) {
        scope.ShapeCandidate.call(this, obj);
    }

    /**
     * Inheritance property
     */
    ShapeNotRecognized.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeNotRecognized.prototype.constructor = ShapeNotRecognized;

    // Export
    scope.ShapeNotRecognized = ShapeNotRecognized;
})(MyScript);


(function (scope) {
    /**
     * Shape recognized
     *
     * @class ShapeRecognized
     * @extends ShapeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeRecognized(obj) {
        scope.ShapeCandidate.call(this, obj);
        this.primitives = [];
        if (obj) {
            this.label = obj.label;
            this.normalizedRecognitionScore = obj.normalizedRecognitionScore;
            this.resemblanceScore = obj.resemblanceScore;
            for (var i in obj.primitives) {
                switch (obj.primitives[i].type) {
                    case 'line':
                        this.primitives.push(new scope.ShapeLine(obj.primitives[i]));
                        break;
                    case 'ellipse':
                        this.primitives.push(new scope.ShapeEllipse(obj.primitives[i]));
                        break;
                    default:
                        throw new Error('Unknown shape primitive');
                }
            }
        }
    }

    /**
     * Inheritance property
     */
    ShapeRecognized.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeRecognized.prototype.constructor = ShapeRecognized;

    /**
     * Get primitives
     *
     * @method getPrimitives
     * @returns {AbstractShapePrimitive[]}
     */
    ShapeRecognized.prototype.getPrimitives = function () {
        return this.primitives;
    };

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    ShapeRecognized.prototype.getLabel = function () {
        return this.label;
    };

    /**
     * Get normalized score
     *
     * @method getNormalizedRecognitionScore
     * @returns {Number}
     */
    ShapeRecognized.prototype.getNormalizedRecognitionScore = function () {
        return this.normalizedRecognitionScore;
    };

    /**
     * Get resemblance score
     *
     * @method getResemblanceScore
     * @returns {Number}
     */
    ShapeRecognized.prototype.getResemblanceScore = function () {
        return this.resemblanceScore;
    };

    // Export
    scope.ShapeRecognized = ShapeRecognized;
})(MyScript);


(function (scope) {
    /**
     * Shape result
     *
     * @class ShapeResult
     * @extends AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeResult(obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.ShapeDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    ShapeResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    ShapeResult.prototype.constructor = ShapeResult;

    // Export
    scope.ShapeResult = ShapeResult;
})(MyScript);



(function (scope) {
    /**
     * Shape scratch-out
     *
     * @class ShapeScratchOut
     * @extends ShapeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeScratchOut(obj) {
        scope.ShapeCandidate.call(this, obj);
        this.inkRanges = [];
        if (obj) {
            for (var j in obj.inkRanges) {
                this.inkRanges.push(new scope.ShapeInkRange(obj.inkRanges[j]));
            }
        }
    }

    /**
     * Inheritance property
     */
    ShapeScratchOut.prototype = new scope.ShapeCandidate();

    /**
     * Constructor property
     */
    ShapeScratchOut.prototype.constructor = ShapeScratchOut;

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {ShapeInkRange[]}
     */
    ShapeScratchOut.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.ShapeScratchOut = ShapeScratchOut;
})(MyScript);


(function (scope) {
    /**
     * Shape segment
     *
     * @class ShapeSegment
     * @param {Object} [obj]
     * @constructor
     */
    function ShapeSegment(obj) {
        this.inkRanges = [];
        this.candidates = [];
        if (obj) {
            this.elementType = obj.elementType;
            this.uniqueID = obj.uniqueID;
            this.selectedCandidateIndex = obj.selectedCandidateIndex;
            for (var i in obj.candidates) {
                switch (obj.candidates[i].type) {
                    case 'erased':
                        this.candidates.push(new scope.ShapeErased(obj.candidates[i]));
                        break;
                    case 'scratchOut':
                        this.candidates.push(new scope.ShapeScratchOut(obj.candidates[i]));
                        break;
                    case 'recognizedShape':
                        this.candidates.push(new scope.ShapeRecognized(obj.candidates[i]));
                        break;
                    default:
                        this.candidates.push(new scope.ShapeNotRecognized(obj.candidates[i]));
                        break;
                }
            }
            for (var j in obj.inkRanges) {
                this.inkRanges.push(new scope.ShapeInkRange(obj.inkRanges[j]));
            }
        }
    }

    /**
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    ShapeSegment.prototype.getElementType = function () {
        return this.elementType;
    };

    /**
     * Get unique id
     *
     * @method getUniqueId
     * @returns {String}
     */
    ShapeSegment.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {ShapeInkRange[]}
     */
    ShapeSegment.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    ShapeSegment.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidateIndex;
    };

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {ShapeCandidate[]}
     */
    ShapeSegment.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {ShapeCandidate}
     */
    ShapeSegment.prototype.getSelectedCandidate = function () {
        if ((this.getCandidates().length > 0) && (this.getSelectedCandidateIdx() !== undefined)) {
            return this.getCandidates()[this.getSelectedCandidateIdx()];
        } else {
            return undefined;
        }
    };

    // Export
    scope.ShapeSegment = ShapeSegment;
})(MyScript);


(function (scope) {
    /**
     * Math node
     *
     * @class MathNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathNode(obj) {
        if (obj) {
            this.name = obj.name;
            this.type = obj.type;
        }
    }

    /**
     * Get name
     *
     * @method getName
     * @returns {String}
     */
    MathNode.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MathNode.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MathNode = MathNode;
})(MyScript);


(function (scope) {
    /**
     * Math non-terminal node
     *
     * @class MathNonTerminalNode
     * @extends MathNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathNonTerminalNode(obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        if (obj) {
            this.selectedCandidate = obj.selectedCandidate;
            for (var i in obj.candidates) {
                switch (obj.candidates[i].type) {
                    case 'nonTerminalNode':
                        this.candidates.push(new scope.MathNonTerminalNode(obj.candidates[i]));
                        break;
                    case 'terminalNode':
                        this.candidates.push(new scope.MathTerminalNode(obj.candidates[i]));
                        break;
                    case 'rule':
                        this.candidates.push(new scope.MathRuleNode(obj.candidates[i]));
                        break;
                    case 'cell':
                        this.candidates.push(new scope.MathCellNonTerminalNode(obj.candidates[i]));
                        break;
                    case 'border':
                        this.candidates.push(new scope.MathBorderNonTerminalNode(obj.candidates[i]));
                        break;
                    case 'table':
                        this.candidates.push(new scope.MathTableRuleNode(obj.candidates[i]));
                        break;
                    default:
                        throw new Error('Unknown math node type: ' + obj.candidates[i].type);
                }
            }
        }
    }

    /**
     * Inheritance property
     */
    MathNonTerminalNode.prototype = new scope.MathNode();

    /**
     * Constructor property
     */
    MathNonTerminalNode.prototype.constructor = MathNonTerminalNode;

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MathNode[]}
     */
    MathNonTerminalNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    MathNonTerminalNode.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidate;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {MathNode}
     */
    MathNonTerminalNode.prototype.getSelectedCandidate = function () {
        if ((this.getCandidates().length > 0) && (this.getSelectedCandidateIdx() !== undefined)) {
            return this.getCandidates()[this.getSelectedCandidateIdx()];
        } else {
            return undefined;
        }
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathNonTerminalNode.prototype.getInkRanges = function () {
        if (this.getSelectedCandidate()) {
            return this.getSelectedCandidate().getInkRanges();
        } else {
            throw new Error('No selected candidate');
        }
    };

    // Export
    scope.MathNonTerminalNode = MathNonTerminalNode;
})(MyScript);



(function (scope) {
    /**
     * Abstract math result
     *
     * @class MathResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MathResultElement(obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MathResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is LaTeX result
     *
     * @method isLatex
     * @returns {Boolean}
     */
    MathResultElement.prototype.isLaTex = function () {
        return this.type === 'LATEX';
    };

    /**
     * Is MathML result
     *
     * @method isMathMl
     * @returns {Boolean}
     */
    MathResultElement.prototype.isMathMl = function () {
        return this.type === 'MATHML';
    };

    /**
     * Is SymbolTree result
     *
     * @method isSymbolTree
     * @returns {Boolean}
     */
    MathResultElement.prototype.isSymbolTree = function () {
        return this.type === 'SYMBOLTREE';
    };

    // Export
    scope.MathResultElement = MathResultElement;
})(MyScript);
(function (scope) {
    
    /**
     * Math rule node
     *
     * @class MathRuleNode
     * @extends MathNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathRuleNode(obj) {
        scope.MathNode.call(this, obj);
        this.children = [];
        if (obj) {
            this.name = obj.name;
            for (var i in obj.children) {
                switch (obj.children[i].type) {
                    case 'nonTerminalNode':
                        this.children.push(new scope.MathNonTerminalNode(obj.children[i]));
                        break;
                    case 'terminalNode':
                        this.children.push(new scope.MathTerminalNode(obj.children[i]));
                        break;
                    case 'rule':
                        this.children.push(new scope.MathRuleNode(obj.children[i]));
                        break;
                    case 'cell':
                        this.children.push(new scope.MathCellNonTerminalNode(obj.children[i]));
                        break;
                    case 'border':
                        this.children.push(new scope.MathBorderNonTerminalNode(obj.children[i]));
                        break;
                    case 'table':
                        this.children.push(new scope.MathTableRuleNode(obj.children[i]));
                        break;
                    default:
                        throw new Error('Unknown math node type: ' + obj.children[i].type);
                }
            }
        }
    }

    /**
     * Inheritance property
     */
    MathRuleNode.prototype = new scope.MathNode();

    /**
     * Constructor property
     */
    MathRuleNode.prototype.constructor = MathRuleNode;

    /**
     * Get name
     *
     * @method getName
     * @returns {String}
     */
    MathRuleNode.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get children
     *
     * @method getChildren
     * @returns {MathNode[]}
     */
    MathRuleNode.prototype.getChildren = function () {
        return this.children;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathRuleNode.prototype.getInkRanges = function () {
        var inkRanges = [];
        for (var i in this.getChildren()) {
            var childInkRanges = this.getChildren()[i].getInkRanges();
            for (var j in childInkRanges) {
                inkRanges.push(childInkRanges[j]);
            }
        }
        return inkRanges;
    };

    // Export
    scope.MathRuleNode = MathRuleNode;
})(MyScript);


(function (scope) {
    /**
     * Math document
     *
     * @class MathDocument
     * @param {Object} [obj]
     * @constructor
     */
    function MathDocument(obj) {
        this.results = [];
        this.scratchOutResults = [];
        if (obj) {
            for (var i in obj.results) {
                var result = obj.results[i];
                switch (result.type) {
                    case 'MATHML':
                        this.results.push(new scope.MathMathMLResultElement(result));
                        break;
                    case 'LATEX':
                        this.results.push(new scope.MathLaTexResultElement(result));
                        break;
                    case 'SYMBOLTREE':
                        this.results.push(new scope.MathSymbolTreeResultElement(result));
                        break;
                    case 'OFFICEOPENXMLMATH':
                        this.results.push(new scope.MathOfficeOpenXmlMathResultElement(result));
                        break;
                    default:
                        throw new Error('Unknown math result type: ' + result.type);
                }
            }
            for (var j in obj.scratchOutResults) {
                this.scratchOutResults.push(new scope.MathScratchOut(obj.scratchOutResults[j]));
            }
        }
    }

    /**
     * Get result elements
     *
     * @method getResultElements
     * @returns {MathResultElement[]}
     */
    MathDocument.prototype.getResultElements = function () {
        return this.results;
    };

    /**
     * Get scratch-out results
     *
     * @method getScratchOutResults
     * @returns {MathScratchOut[]}
     */
    MathDocument.prototype.getScratchOutResults = function () {
        return this.scratchOutResults;
    };

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    MathDocument.prototype.hasScratchOutResults = function () {
        if (this.getScratchOutResults() && (this.getScratchOutResults().length > 0)) {
            return true;
        }
        return false;
    };

    // Export
    scope.MathDocument = MathDocument;
})(MyScript);



(function (scope) {
    /**
     * Math ink range
     *
     * @class MathInkRange
     * @param {Object} [obj]
     * @constructor
     */
    function MathInkRange(obj) {
        if (obj) {
            this.component = obj.component;
            this.firstItem = obj.firstItem;
            this.lastItem = obj.lastItem;
        }
    }

    /**
     * Get component
     *
     * @method getComponent
     * @returns {Number}
     */
    MathInkRange.prototype.getComponent = function () {
        return this.component;
    };

    /**
     * Get first item
     *
     * @method getFirstItem
     * @returns {Number}
     */
    MathInkRange.prototype.getFirstItem = function () {
        return this.firstItem;
    };

    /**
     * Get last item
     *
     * @method getLastItem
     * @returns {Number}
     */
    MathInkRange.prototype.getLastItem = function () {
        return this.lastItem;
    };

    // Export
    scope.MathInkRange = MathInkRange;
})(MyScript);


(function (scope) {
    /**
     * MathOfficeOpenXmlMathResultElement result element
     *
     * @class MathOfficeOpenXmlMathResultElement
     * @extends MathResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MathOfficeOpenXmlMathResultElement(obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }


    /**
     * Inheritance property
     */
    MathOfficeOpenXmlMathResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathOfficeOpenXmlMathResultElement.prototype.constructor = MathOfficeOpenXmlMathResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MathOfficeOpenXmlMathResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathOfficeOpenXmlMathResultElement = MathOfficeOpenXmlMathResultElement;
})(MyScript);



(function (scope) {
    /**
     * LaTex result element
     *
     * @class MathLaTexResultElement
     * @extends MathResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MathLaTexResultElement(obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MathLaTexResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathLaTexResultElement.prototype.constructor = MathLaTexResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MathLaTexResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathLaTexResultElement = MathLaTexResultElement;
})(MyScript);


(function (scope) {
    /**
     * MathML result element
     *
     * @class MathMathMLResultElement
     * @extends MathResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MathMathMLResultElement(obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MathMathMLResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathMathMLResultElement.prototype.constructor = MathMathMLResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MathMathMLResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathMathMLResultElement = MathMathMLResultElement;
})(MyScript);


(function (scope) {
    /**
     * Math result
     *
     * @class MathResult
     * @extends AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function MathResult(obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.MathDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    MathResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    MathResult.prototype.constructor = MathResult;

    // Export
    scope.MathResult = MathResult;
})(MyScript);



(function (scope) {
    /**
     * Math scratch-out
     *
     * @class MathScratchOut
     * @param {Object} [obj]
     * @constructor
     */
    function MathScratchOut(obj) {
        this.inkRanges = [];
        this.erasedInkRanges = [];
        if (obj) {
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.MathInkRange(obj.inkRanges[i]));
            }
            for (var j in obj.erasedInkRanges) {
                this.erasedInkRanges.push(new scope.MathInkRange(obj.erasedInkRanges[j]));
            }
        }
    }

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathScratchOut.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get erased ink ranges
     *
     * @method getErasedInkRanges
     * @returns {MathInkRange[]}
     */
    MathScratchOut.prototype.getErasedInkRanges = function () {
        return this.erasedInkRanges;
    };

    // Export
    scope.MathScratchOut = MathScratchOut;
})(MyScript);


(function (scope) {
    /**
     * Math symbol tree
     *
     * @class MathSymbolTreeResultElement
     * @extends MathResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MathSymbolTreeResultElement(obj) {
        scope.MathResultElement.call(this, obj);
        if (obj) {
            if (obj.root) {
                switch (obj.root.type) {
                    case 'nonTerminalNode':
                        this.root = new scope.MathNonTerminalNode(obj.root);
                        break;
                    case 'terminalNode':
                        this.root = new scope.MathTerminalNode(obj.root);
                        break;
                    case 'rule':
                        this.root = new scope.MathRuleNode(obj.root);
                        break;
                    case 'cell':
                        this.root = new scope.MathCellNonTerminalNode(obj.root);
                        break;
                    case 'border':
                        this.root = new scope.MathBorderNonTerminalNode(obj.root);
                        break;
                    case 'table':
                        this.root = new scope.MathTableRuleNode(obj.root);
                        break;
                    default:
                        throw new Error('Unknown math node type: ' + obj.root.type);
                }
                this.value = JSON.stringify(obj.root, null, '  ');
            } else {
                throw new Error('Missing root');
            }
        }
    }

    /**
     * Inheritance property
     */
    MathSymbolTreeResultElement.prototype = new scope.MathResultElement();

    /**
     * Constructor property
     */
    MathSymbolTreeResultElement.prototype.constructor = MathSymbolTreeResultElement;

    /**
     * Get tree root
     *
     * @method getRoot
     * @returns {MathNode}
     */
    MathSymbolTreeResultElement.prototype.getRoot = function () {
        return this.root;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathSymbolTreeResultElement.prototype.getInkRanges = function () {
        if (this.getRoot()) {
            return this.getRoot().getInkRanges();
        } else {
            throw new Error('No selected candidate');
        }
    };

    /**
    * Get value
    *
    * @method getValue
    * @returns {String}
    */
    MathSymbolTreeResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MathSymbolTreeResultElement = MathSymbolTreeResultElement;
})(MyScript);



(function (scope) {
    /**
     * Math terminal node
     *
     * @class MathTerminalNode
     * @extends MathNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathTerminalNode(obj) {
        scope.MathNode.call(this, obj);
        this.candidates = [];
        this.inkRanges = [];
        if (obj) {
            this.selectedCandidate = obj.selectedCandidate;
            for (var i in obj.candidates) {
                this.candidates.push(new scope.MathTerminalNodeCandidate(obj.candidates[i]));
            }
            for (var j in obj.inkRanges) {
                this.inkRanges.push(new scope.MathInkRange(obj.inkRanges[j]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MathTerminalNode.prototype = new scope.MathNode();

    /**
     * Constructor property
     */
    MathTerminalNode.prototype.constructor = MathTerminalNode;

    /**
     * Get candidates
     *
     * @method getCandidates
     * @returns {MathTerminalNodeCandidate[]}
     */
    MathTerminalNode.prototype.getCandidates = function () {
        return this.candidates;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {MathInkRange[]}
     */
    MathTerminalNode.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get selected candidate index
     *
     * @method getSelectedCandidateIdx
     * @returns {Number}
     */
    MathTerminalNode.prototype.getSelectedCandidateIdx = function () {
        return this.selectedCandidate;
    };

    /**
     * Get selected candidate
     *
     * @method getSelectedCandidate
     * @returns {MathTerminalNodeCandidate}
     */
    MathTerminalNode.prototype.getSelectedCandidate = function () {
        if ((this.getCandidates().length > 0) && (this.getSelectedCandidateIdx() !== undefined)) {
            return this.getCandidates()[this.getSelectedCandidateIdx()];
        } else {
            return undefined;
        }
    };

    // Export
    scope.MathTerminalNode = MathTerminalNode;
})(MyScript);



(function (scope) {
    /**
     * Math terminal node candidate
     *
     * @class MathTerminalNodeCandidate
     * @param {Object} [obj]
     * @constructor
     */
    function MathTerminalNodeCandidate(obj) {
        if (obj) {
            this.label = obj.label;
            this.normalizedRecognitionScore = obj.normalizedRecognitionScore;
        }
    }

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    MathTerminalNodeCandidate.prototype.getLabel = function () {
        return this.label;
    };

    /**
     * Get score
     *
     * @method getNormalizedRecognitionScore
     * @returns {Number}
     */
    MathTerminalNodeCandidate.prototype.getNormalizedRecognitionScore = function () {
        return this.normalizedRecognitionScore;
    };

    // Export
    scope.MathTerminalNodeCandidate = MathTerminalNodeCandidate;
})(MyScript);


(function (scope) {
    /**
     * Math border data
     *
     * @class MathBorderData
     * @param {Object} [obj]
     * @constructor
     */
    function MathBorderData(obj) {
        if (obj) {
            this.position = obj.position;
            this.start = obj.start;
            this.stop = obj.stop;
            this.type = obj.type;
        }
    }

    /**
     * Get position
     *
     * @method getPosition
     * @returns {Number}
     */
    MathBorderData.prototype.getPosition = function () {
        return this.position;
    };

    /**
     * Get start
     *
     * @method getStart
     * @returns {Number}
     */
    MathBorderData.prototype.getStart = function () {
        return this.start;
    };

    /**
     * Get stop
     *
     * @method getStop
     * @returns {Number}
     */
    MathBorderData.prototype.getStop = function () {
        return this.stop;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MathBorderData.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MathBorderData = MathBorderData;
})(MyScript);



(function (scope) {
    /**
     * Math border non-terminal node
     *
     * @class MathBorderNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathBorderNonTerminalNode(obj) {
        scope.MathNonTerminalNode.call(this, obj);
        if (obj) {
            this.data = new scope.MathBorderData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    MathBorderNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathBorderNonTerminalNode.prototype.constructor = MathBorderNonTerminalNode;

    /**
     * Get data
     *
     * @method getData
     * @returns {MathBorderData}
     */
    MathBorderNonTerminalNode.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.MathBorderNonTerminalNode = MathBorderNonTerminalNode;
})(MyScript);



(function (scope) {
    /**
     * Math cell data
     *
     * @class MathCellData
     * @param {Object} [obj]
     * @constructor
     */
    function MathCellData(obj) {
        if (obj) {
            this.columnStart = obj.columnStart;
            this.columnStop = obj.columnStop;
            this.rowStart = obj.rowStart;
            this.rowStop = obj.rowStop;
        }
    }

    /**
     * Get column start
     *
     * @method getColumnStart
     * @returns {Number}
     */
    MathCellData.prototype.getColumnStart = function () {
        return this.columnStart;
    };

    /**
     * Get column stop
     *
     * @method getColumnStop
     * @returns {Number}
     */
    MathCellData.prototype.getColumnStop = function () {
        return this.columnStop;
    };

    /**
     * Get row start
     *
     * @method getRowStart
     * @returns {Number}
     */
    MathCellData.prototype.getRowStart = function () {
        return this.rowStart;
    };

    /**
     * Get row stop
     *
     * @method getRowStop
     * @returns {Number}
     */
    MathCellData.prototype.getRowStop = function () {
        return this.rowStop;
    };

    // Export
    scope.MathCellData = MathCellData;
})(MyScript);



(function (scope) {
    /**
     * Math cell non-terminal node
     *
     * @class MathCellNonTerminalNode
     * @extends MathNonTerminalNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathCellNonTerminalNode(obj) {
        scope.MathNonTerminalNode.call(this, obj);
        if (obj) {
            this.data = new scope.MathCellData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    MathCellNonTerminalNode.prototype = new scope.MathNonTerminalNode();

    /**
     * Constructor property
     */
    MathCellNonTerminalNode.prototype.constructor = MathCellNonTerminalNode;

    /**
     * Get data
     *
     * @method getData
     * @returns {MathCellData}
     */
    MathCellNonTerminalNode.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.MathCellNonTerminalNode = MathCellNonTerminalNode;
})(MyScript);



(function (scope) {
    /**
     * Math table data
     *
     * @class MathTableData
     * @param {Object} [obj]
     * @constructor
     */
    function MathTableData(obj) {
        if (obj) {
            this.columnCount = obj.columnCount;
            this.rowCount = obj.rowCount;
        }
    }

    /**
     * Get column count
     *
     * @method getColumnCount
     * @returns {Number}
     */
    MathTableData.prototype.getColumnCount = function () {
        return this.columnCount;
    };

    /**
     * Get row count
     *
     * @method getRowCount
     * @returns {Number}
     */
    MathTableData.prototype.getRowCount = function () {
        return this.rowCount;
    };

    // Export
    scope.MathTableData = MathTableData;
})(MyScript);



(function (scope) {
    /**
     * Math table rule node
     *
     * @class MathTableRuleNode
     * @extends MathRuleNode
     * @param {Object} [obj]
     * @constructor
     */
    function MathTableRuleNode(obj) {
        scope.MathRuleNode.call(this, obj);
        if (obj) {
            this.data = new scope.MathTableData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    MathTableRuleNode.prototype = new scope.MathRuleNode();

    /**
     * Constructor property
     */
    MathTableRuleNode.prototype.constructor = MathTableRuleNode;

    /**
     * Get data
     *
     * @method getData
     * @returns {MathTableData}
     */
    MathTableRuleNode.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.MathTableRuleNode = MathTableRuleNode;
})(MyScript);



(function (scope) {
    /**
     * WebSocket recognition math result message
     *
     * @class MathResponseWSMessage
     * @extends AbstractRecoResponseWSMessage
     * @param {Object} [obj] Recognition WebSocket message
     * @constructor
     */
    function MathResponseWSMessage(obj) {
        scope.AbstractRecoResponseWSMessage.call(this, obj);
        if (obj) {
            this.result = new scope.MathDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    MathResponseWSMessage.prototype = new scope.AbstractRecoResponseWSMessage();

    /**
     * Constructor property
     */
    MathResponseWSMessage.prototype.constructor = MathResponseWSMessage;

    // Export
    scope.MathResponseWSMessage = MathResponseWSMessage;
})(MyScript);



(function (scope) {
    /**
     * Abstract music element
     *
     * @class MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicElement(obj) {
        if (obj) {
            this.inputRanges = [];
            this.elementType = obj.elementType;
            this.inputRanges = obj.inputRanges;
        }
    }

    /**
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    MusicElement.prototype.getElementType = function () {
        return this.elementType;
    };

    /**
     * Get input ranges
     *
     * @method getInputRanges
     * @returns {MusicInputRange[]}
     */
    MusicElement.prototype.getInputRanges = function () {
        return this.inputRanges;
    };

    // Export
    scope.MusicElement = MusicElement;
})(MyScript);


(function (scope) {
    /**
     * Abstract music result element
     *
     * @class MusicResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicResultElement(obj) {
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicResultElement.prototype.getType = function () {
        return this.type;
    };

    /**
     * Is MusicXML
     *
     * @method isMusicXML
     * @returns {Boolean}
     */
    MusicResultElement.prototype.isMusicXML = function () {
        return this.type === 'MUSICXML';
    };

    /**
     * Is ScoreTree
     *
     * @method isScoreTree
     * @returns {Boolean}
     */
    MusicResultElement.prototype.isScoreTree = function () {
        return this.type === 'SCORETREE';
    };

    // Export
    scope.MusicResultElement = MusicResultElement;
})(MyScript);


(function (scope) {
    /**
     * Music accidental
     *
     * @class MusicAccidental
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicAccidental(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicAccidental.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicAccidental.prototype.constructor = MusicAccidental;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicAccidental.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicAccidental = MusicAccidental;
})(MyScript);


(function (scope) {
    /**
     * Music annotation
     *
     * @class MusicAnnotation
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicAnnotation(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.label = obj.label;
        }
    }

    /**
     * Inheritance property
     */
    MusicAnnotation.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicAnnotation.prototype.constructor = MusicAnnotation;

    /**
     * Get label
     *
     * @method getLabel
     * @returns {String}
     */
    MusicAnnotation.prototype.getLabel = function () {
        return this.label;
    };

    // Export
    scope.MusicAnnotation = MusicAnnotation;
})(MyScript);


(function (scope) {
    /**
     * Music arpeggiate
     *
     * @class MusicArpeggiate
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicArpeggiate(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicArpeggiate.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicArpeggiate.prototype.constructor = MusicArpeggiate;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicArpeggiate.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicArpeggiate = MusicArpeggiate;
})(MyScript);


(function (scope) {
    /**
     * Music bar
     *
     * @class MusicBar
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicBar(obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        if (obj) {
            this.repeatDirection = obj.repeatDirection;
            this.style = obj.style;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicBar.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicBar.prototype.constructor = MusicBar;

    /**
     * Get repeat direction
     *
     * @method getRepeatDirection
     * @returns {String}
     */
    MusicBar.prototype.getRepeatDirection = function () {
        return this.repeatDirection;
    };

    /**
     * Set repeat direction
     *
     * @method setRepeatDirection
     * @param {String} repeatDirection
     */
    MusicBar.prototype.setRepeatDirection = function (repeatDirection) {
        this.repeatDirection = repeatDirection;
    };

    /**
     * Get style
     *
     * @method getStyle
     * @returns {String}
     */
    MusicBar.prototype.getStyle = function () {
        return this.style;
    };

    /**
     * Set style
     *
     * @method setStyle
     * @param {String} style
     */
    MusicBar.prototype.setStyle = function (style) {
        this.style = style;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MusicDecoration[]}
     */
    MusicBar.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     * Set decorations
     *
     * @method setDecorations
     * @param {MusicDecoration[]}
     */
    MusicBar.prototype.setDecorations = function (decorations) {
        this.decorations = decorations;
    };

    // Export
    scope.MusicBar = MusicBar;
})(MyScript);


(function (scope) {
    /**
     * Music beam
     *
     * @class MusicBeam
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicBeam(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.gap = obj.gap;
            this.slope = obj.slope;
            this.placement = obj.placement;
            this.leftCount = obj.leftCount;
            this.rightCount = obj.rightCount;
        }
    }

    /**
     * Inheritance property
     */
    MusicBeam.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicBeam.prototype.constructor = MusicBeam;

    /**
     * Get gap
     *
     * @method getGap
     * @returns {Number}
     */
    MusicBeam.prototype.getGap = function () {
        return this.gap;
    };

    /**
     * Set gap
     *
     * @method setGap
     * @param {Number} gap
     */
    MusicBeam.prototype.setGap = function (gap) {
        this.gap = gap;
    };

    /**
     * Get slope
     *
     * @method getSlope
     * @returns {String}
     */
    MusicBeam.prototype.getSlope = function () {
        return this.slope;
    };

    /**
     * Set slope
     *
     * @method setSlope
     * @param {String} slope
     */
    MusicBeam.prototype.setSlope = function (slope) {
        this.slope = slope;
    };

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicBeam.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Set placement
     *
     * @method setPlacement
     * @param {String} placement
     */
    MusicBeam.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    /**
     * Get left count
     *
     * @method getLeftCount
     * @returns {Number}
     */
    MusicBeam.prototype.getLeftCount = function () {
        return this.leftCount;
    };

    /**
     * Set left count
     *
     * @method setLeftCount
     * @param {Number} leftCount
     */
    MusicBeam.prototype.setLeftCount = function (leftCount) {
        this.leftCount = leftCount;
    };

    /**
     * Get right count
     *
     * @method getRightCount
     * @returns {Number}
     */
    MusicBeam.prototype.getRightCount = function () {
        return this.rightCount;
    };

    /**
     * Set right count
     *
     * @method setRightCount
     * @param {Number} rightCount
     */
    MusicBeam.prototype.setRightCount = function (rightCount) {
        this.rightCount = rightCount;
    };


    // Export
    scope.MusicBeam = MusicBeam;
})(MyScript);


(function (scope) {
    /**
     * Music chord
     *
     * @class MusicChord
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicChord(obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        this.notes = [];
        this.beamTypes = [];
        this.ledgerLines = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.duration = obj.duration;
            this.arpeggiate = new scope.MusicArpeggiate(obj.arpeggiate);
            this.startBeam = new scope.MusicBeam(obj.startBeam);
            this.stopBeam = new scope.MusicBeam(obj.stopBeam);
            this.stem = new scope.MusicStem(obj.stem);
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
            for (var j in obj.notes) {
                this.notes.push(new scope.MusicNote(obj.notes[j]));
            }
            for (var k in obj.beamTypes) {
                this.beamTypes.push(obj.beamTypes[k]);
            }
            for (var l in obj.ledgerLines) {
                this.ledgerLines.push(new scope.MusicLedgerLine(obj.ledgerLines[l]));
            }
            for (var m in obj.startSlurs) {
                this.startSlurs.push(new scope.MusicSlur(obj.startSlurs[m]));
            }
            for (var n in obj.stopSlurs) {
                this.stopSlurs.push(new scope.MusicSlur(obj.stopSlurs[n]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicChord.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicChord.prototype.constructor = MusicChord;

    /**
     * Get duration
     *
     * @method getDuration
     * @returns {Number}
     */
    MusicChord.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     * Get arpeggiate
     *
     * @method getArpeggiate
     * @returns {MusicArpeggiate}
     */
    MusicChord.prototype.getArpeggiate = function () {
        return this.arpeggiate;
    };

    /**
     * Get start beam
     *
     * @method getStartBeam
     * @returns {MusicBeam}
     */
    MusicChord.prototype.getStartBeam = function () {
        return this.startBeam;
    };

    /**
     * Get stop beam
     *
     * @method getStopBeam
     * @returns {MusicBeam}
     */
    MusicChord.prototype.getStopBeam = function () {
        return this.stopBeam;
    };

    /**
     * Get stem
     *
     * @method getStem
     * @returns {MusicStem}
     */
    MusicChord.prototype.getStem = function () {
        return this.stem;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MusicDecoration[]}
     */
    MusicChord.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     * Get notes
     *
     * @method getNotes
     * @returns {MusicNote[]}
     */
    MusicChord.prototype.getNotes = function () {
        return this.notes;
    };

    /**
     * Get beam types
     *
     * @method getBeamTypes
     * @returns {Array}
     */
    MusicChord.prototype.getBeamTypes = function () {
        return this.beamTypes;
    };

    /**
     * Get ledger lines
     *
     * @method getLedgerLines
     * @returns {MusicLedgerLine[]}
     */
    MusicChord.prototype.getLedgerLines = function () {
        return this.ledgerLines;
    };

    /**
     * Get start slurs
     *
     * @method getStartSlurs
     * @returns {MusicSlur[]}
     */
    MusicChord.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     * Get stop slurs
     *
     * @method getStopSlurs
     * @returns {MusicSlur[]}
     */
    MusicChord.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicChord = MusicChord;
})(MyScript);


(function (scope) {
    /**
     * Music clef
     * default values: symbol='G', octave=0
     *
     * @class MusicClef
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicClef(obj) {
        scope.MusicElement.call(this, obj);
        this.symbol = 'G';
        this.octave = 0;
        if (obj) {
            this.line = obj.line;
            this.yAnchor = obj.yAnchor;
            this.octave = obj.octave;
            this.symbol = obj.symbol;
        }
    }

    /**
     * Inheritance property
     */
    MusicClef.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicClef.prototype.constructor = MusicClef;

    /**
     * Get y anchor
     *
     * @method getYAnchor
     * @returns {Number}
     */
    MusicClef.prototype.getYAnchor = function () {
        return this.yAnchor;
    };

    /**
     * Set y anchor
     *
     * @method setYAnchor
     * @param {Number} yAnchor
     */
    MusicClef.prototype.setYAnchor = function (yAnchor) {
        this.yAnchor = yAnchor;
    };

    /**
     * Get line
     *
     * @method getLine
     * @returns {Number}
     */
    MusicClef.prototype.getLine = function () {
        return this.line;
    };

    /**
     * Set line
     *
     * @method setLine
     * @param {Number} line
     */
    MusicClef.prototype.setLine = function (line) {
        this.line = line;
    };

    /**
     * Get octave
     *
     * @method getOctave
     * @returns {Number}
     */
    MusicClef.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     * Set octave
     *
     * @method setOctave
     * @param {Number} octave
     */
    MusicClef.prototype.setOctave = function (octave) {
        this.octave = octave;
    };

    /**
     * Get symbol
     *
     * @method getSymbol
     * @returns {String}
     */
    MusicClef.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Set symbol
     *
     * @method setSymbol
     * @param {String} symbol
     */
    MusicClef.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    // Export
    scope.MusicClef = MusicClef;
})(MyScript);


(function (scope) {
    /**
     * Music decoration
     *
     * @class MusicDecoration
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicDecoration(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.symbol = obj.symbol;
            this.placement = obj.placement;
        }
    }

    /**
     * Inheritance property
     */
    MusicDecoration.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicDecoration.prototype.constructor = MusicDecoration;

    /**
     * Get symbol
     *
     * @method getSymbol
     * @returns {String}
     */
    MusicDecoration.prototype.getSymbol = function () {
        return this.symbol;
    };

    /**
     * Set symbol
     *
     * @method setSymbol
     * @param {String} symbol
     */
    MusicDecoration.prototype.setSymbol = function (symbol) {
        this.symbol = symbol;
    };

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicDecoration.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Set placement
     *
     * @method setPlacement
     * @param {String} placement
     */
    MusicDecoration.prototype.setPlacement = function (placement) {
        this.placement = placement;
    };

    // Export
    scope.MusicDecoration = MusicDecoration;
})(MyScript);


(function (scope) {
    /**
     * Music document
     *
     * @class MusicDocument
     * @param {Object} [obj]
     * @constructor
     */
    function MusicDocument(obj) {
        this.results = [];
        this.scratchOutResults = [];
        if (obj) {
            for (var i in obj.results) {
                switch (obj.results[i].type) {
                    case 'MUSICXML':
                        this.results.push(new scope.MusicXMLResultElement(obj.results[i]));
                        break;
                    default:
                        this.results.push(new scope.MusicScoreTreeResultElement(obj.results[i]));
                        break;
                }
            }
            for (var j in obj.scratchOutResults) {
                this.scratchOutResults.push(new scope.MusicScratchOut(obj.scratchOutResults[j]));
            }
        }
    }

    /**
     * Get result elements
     *
     * @method getResultElements
     * @returns {MusicResultElement[]}
     */
    MusicDocument.prototype.getResultElements = function () {
        return this.results;
    };

    /**
     * Get scratch-out results
     *
     * @method getScratchOutResults
     * @returns {MusicScratchOut[]}
     */
    MusicDocument.prototype.getScratchOutResults = function () {
        return this.scratchOutResults;
    };

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    MusicDocument.prototype.hasScratchOutResults = function () {
        if (this.getScratchOutResults() && (this.getScratchOutResults().length > 0)) {
            return true;
        }
        return false;
    };

    // Export
    scope.MusicDocument = MusicDocument;
})(MyScript);


(function (scope) {
    /**
     * Music dots
     *
     * @class MusicDots
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicDots(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.count = obj.count;
        }
    }

    /**
     * Inheritance property
     */
    MusicDots.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicDots.prototype.constructor = MusicDots;

    /**
     * Get dots counts
     *
     * @method getCount
     * @returns {Number}
     */
    MusicDots.prototype.getCount = function () {
        return this.count;
    };

    // Export
    scope.MusicDots = MusicDots;
})(MyScript);


(function (scope) {
    /**
     * Music head
     *
     * @class MusicHead
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicHead(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicHead.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicHead.prototype.constructor = MusicHead;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicHead.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicHead = MusicHead;
})(MyScript);


(function (scope) {
    /**
     * Music input range
     *
     * @class MusicInputRange
     * @param {Object} [obj]
     * @constructor
     */
    function MusicInputRange(obj) {
        if (obj) {
            this.component = obj.component;
            this.firstItem = obj.firstItem;
            this.lastItem = obj.lastItem;
        }
    }

    /**
     * Get component
     *
     * @method getComponent
     * @returns {Number}
     */
    MusicInputRange.prototype.getComponent = function () {
        return this.component;
    };

    /**
     * Get first item
     *
     * @method getFirstItem
     * @returns {Number}
     */
    MusicInputRange.prototype.getFirstItem = function () {
        return this.firstItem;
    };

    /**
     * Get last item
     *
     * @method getLastItem
     * @returns {Number}
     */
    MusicInputRange.prototype.getLastItem = function () {
        return this.lastItem;
    };

    // Export
    scope.MusicInputRange = MusicInputRange;
})(MyScript);


(function (scope) {
    /**
     * Music key signature
     *
     * @class MusicKeySignature
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicKeySignature(obj) {
        scope.MusicElement.call(this, obj);
        this.accidentals = [];
        if (obj) {
            this.signature = new scope.MusicKeySignatureData(obj.signature);
            for (var i in obj.accidentals) {
                this.accidentals.push(new scope.MusicAccidental(obj.accidentals[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicKeySignature.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicKeySignature.prototype.constructor = MusicKeySignature;

    /**
     * Get signature
     *
     * @method getSignature
     * @returns {MusicKeySignatureData}
     */
    MusicKeySignature.prototype.getSignature = function () {
        return this.signature;
    };

    /**
     * Get accidentals
     *
     * @method getAccidentals
     * @returns {MusicAccidental[]}
     */
    MusicKeySignature.prototype.getAccidentals = function () {
        return this.accidentals;
    };

    // Export
    scope.MusicKeySignature = MusicKeySignature;
})(MyScript);


(function (scope) {
    /**
     * Music key signature data
     *
     * @class MusicKeySignatureData
     * @param {Object} [obj]
     * @constructor
     */
    function MusicKeySignatureData(obj) {
        if (obj) {
            this.fifths = obj.fifths;
            this.cancel = obj.cancel;
        }
    }

    /**
     * Get fifths
     *
     * @method getFifths
     * @returns {Number}
     */
    MusicKeySignatureData.prototype.getFifths = function () {
        return this.fifths;
    };

    /**
     * Get cancel
     *
     * @method getCancel
     * @returns {Number}
     */
    MusicKeySignatureData.prototype.getCancel = function () {
        return this.cancel;
    };

    // Export
    scope.MusicKeySignatureData = MusicKeySignatureData;
})(MyScript);


(function (scope) {
    /**
     * Music ledger line
     *
     * @class MusicLedgerLine
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicLedgerLine(obj) {
        scope.MusicElement.call(this, obj);
    }

    /**
     * Inheritance property
     */
    MusicLedgerLine.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicLedgerLine.prototype.constructor = MusicLedgerLine;

    // Export
    scope.MusicLedgerLine = MusicLedgerLine;
})(MyScript);


(function (scope) {
    /**
     * Music note
     *
     * @class MusicNote
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicNote(obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        this.beamTypes = [];
        this.ledgerLines = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.accidental = new scope.MusicAccidental(obj.accidental);
            this.dots = new scope.MusicDots(obj.dots);
            this.duration = obj.duration;
            this.head = new scope.MusicHead(obj.head);
            this.line = obj.line;
            this.pitch = new scope.MusicPitchData(obj.pitch);
            this.startBeam = new scope.MusicBeam(obj.startBeam);
            this.stopBeam = new scope.MusicBeam(obj.stopBeam);
            this.stem = new scope.MusicStem(obj.stem);
            this.startTie = new scope.MusicTie(obj.startTie);
            this.stopTie = new scope.MusicTie(obj.stopTie);
            this.startTuplet = new scope.MusicTuplet(obj.startTuplet);
            this.stopTuplet = new scope.MusicTuplet(obj.stopTuplet);
            this.timeModification = new scope.MusicTimeModificationData(obj.timeModification);
            this.type = obj.type;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
            for (var j in obj.beamTypes) {
                this.beamTypes.push(obj.beamTypes[j]);
            }
            for (var k in obj.ledgerLines) {
                this.ledgerLines.push(new scope.MusicLedgerLine(obj.ledgerLines[k]));
            }
            for (var l in obj.startSlurs) {
                this.startSlurs.push(new scope.MusicSlur(obj.startSlurs[l]));
            }
            for (var m in obj.stopSlurs) {
                this.stopSlurs.push(new scope.MusicSlur(obj.stopSlurs[m]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicNote.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicNote.prototype.constructor = MusicNote;

    /**
     * Get accidental
     *
     * @method getAccidental
     * @returns {MusicAccidental}
     */
    MusicNote.prototype.getAccidental = function () {
        return this.accidental;
    };

    /**
     * Get dots
     *
     * @method getDots
     * @returns {MusicDots}
     */
    MusicNote.prototype.getDots = function () {
        return this.dots;
    };

    /**
     * Get duration
     *
     * @method getDuration
     * @returns {Number}
     */
    MusicNote.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     * Get head
     *
     * @method getHead
     * @returns {MusicHead}
     */
    MusicNote.prototype.getHead = function () {
        return this.head;
    };

    /**
     * Get line
     *
     * @method getLine
     * @returns {Number}
     */
    MusicNote.prototype.getLine = function () {
        return this.line;
    };

    /**
     * Get pitch
     *
     * @method getPitch
     * @returns {MusicPitchData}
     */
    MusicNote.prototype.getPitch = function () {
        return this.pitch;
    };

    /**
     * Get start beam
     *
     * @method getStartBeam
     * @returns {MusicBeam}
     */
    MusicNote.prototype.getStartBeam = function () {
        return this.startBeam;
    };

    /**
     * Get stop beam
     *
     * @method getStopBeam
     * @returns {MusicBeam}
     */
    MusicNote.prototype.getStopBeam = function () {
        return this.stopBeam;
    };

    /**
     * Get stem
     *
     * @method getStem
     * @returns {MusicStem}
     */
    MusicNote.prototype.getStem = function () {
        return this.stem;
    };

    /**
     * Get start tie
     *
     * @method getStartTie
     * @returns {MusicTie}
     */
    MusicNote.prototype.getStartTie = function () {
        return this.startTie;
    };

    /**
     * Get stop tie
     *
     * @method getStopTie
     * @returns {MusicTie}
     */
    MusicNote.prototype.getStopTie = function () {
        return this.stopTie;
    };

    /**
     * Get start tuplet
     *
     * @method getStartTuplet
     * @returns {MusicTuplet}
     */
    MusicNote.prototype.getStartTuplet = function () {
        return this.startTuplet;
    };

    /**
     * Get stop tuplet
     *
     * @method getStopTuplet
     * @returns {MusicTuplet}
     */
    MusicNote.prototype.getStopTuplet = function () {
        return this.stopTuplet;
    };

    /**
     * Get time modification
     *
     * @method getTimeModification
     * @returns {MusicTimeModificationData}
     */
    MusicNote.prototype.getTimeModification = function () {
        return this.timeModification;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicNote.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MusicDecoration[]}
     */
    MusicNote.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     * Get beam types
     *
     * @method getBeamTypes
     * @returns {Array}
     */
    MusicNote.prototype.getBeamTypes = function () {
        return this.beamTypes;
    };

    /**
     * Get ledger lines
     *
     * @method getLedgerLines
     * @returns {MusicLedgerLine[]}
     */
    MusicNote.prototype.getLedgerLines = function () {
        return this.ledgerLines;
    };

    /**
     * Get start slurs
     *
     * @method getStartSlurs
     * @returns {MusicSlur[]}
     */
    MusicNote.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     * Get stop slurs
     *
     * @method getStopSlurs
     * @returns {MusicSlur[]}
     */
    MusicNote.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicNote = MusicNote;
})(MyScript);


(function (scope) {
    /**
     * Music part
     *
     * @class MusicPart
     * @param {Object} [obj]
     * @constructor
     */
    function MusicPart(obj) {
        this.elements = [];
        if (obj) {
            for (var i in obj.elements) {
                switch (obj.elements[i].elementType) {
                    case 'accidental':
                        this.elements.push(new scope.MusicAccidental(obj.elements[i]));
                        break;
                    case 'annotation':
                        this.elements.push(new scope.MusicAnnotation(obj.elements[i]));
                        break;
                    case 'arpeggiate':
                        this.elements.push(new scope.MusicArpeggiate(obj.elements[i]));
                        break;
                    case 'bar':
                        this.elements.push(new scope.MusicBar(obj.elements[i]));
                        break;
                    case 'beam':
                        this.elements.push(new scope.MusicBeam(obj.elements[i]));
                        break;
                    case 'chord':
                        this.elements.push(new scope.MusicChord(obj.elements[i]));
                        break;
                    case 'clef':
                        this.elements.push(new scope.MusicClef(obj.elements[i]));
                        break;
                    case 'decoration':
                        this.elements.push(new scope.MusicDecoration(obj.elements[i]));
                        break;
                    case 'dots':
                        this.elements.push(new scope.MusicDots(obj.elements[i]));
                        break;
                    case 'head':
                        this.elements.push(new scope.MusicHead(obj.elements[i]));
                        break;
                    case 'keySignature':
                        this.elements.push(new scope.MusicKeySignature(obj.elements[i]));
                        break;
                    case 'ledgerLine':
                        this.elements.push(new scope.MusicLedgerLine(obj.elements[i]));
                        break;
                    case 'note':
                        this.elements.push(new scope.MusicNote(obj.elements[i]));
                        break;
                    case 'rest':
                        this.elements.push(new scope.MusicRest(obj.elements[i]));
                        break;
                    case 'slur':
                        this.elements.push(new scope.MusicSlur(obj.elements[i]));
                        break;
                    case 'stem':
                        this.elements.push(new scope.MusicStem(obj.elements[i]));
                        break;
                    case 'tie':
                        this.elements.push(new scope.MusicTie(obj.elements[i]));
                        break;
                    case 'timeSignature':
                        this.elements.push(new scope.MusicTimeSignature(obj.elements[i]));
                        break;
                    case 'tuplet':
                        this.elements.push(new scope.MusicTuplet(obj.elements[i]));
                        break;
                    case 'tupletBracket':
                        this.elements.push(new scope.MusicTupletBracket(obj.elements[i]));
                        break;
                    default:
                        throw new Error('Unknown music element');
                }
            }
        }
    }

    /**
     * Get elements
     *
     * @method getElements
     * @returns {MusicElement[]}
     */
    MusicPart.prototype.getElements = function () {
        return this.elements;
    };

    // Export
    scope.MusicPart = MusicPart;
})(MyScript);


(function (scope) {
    /**
     * Music pitch data
     *
     * @class MusicPitchData
     * @param {Object} [obj]
     * @constructor
     */
    function MusicPitchData(obj) {
        if (obj) {
            this.alteration = obj.alteration;
            this.octave = obj.octave;
            this.step = obj.step;
        }
    }

    /**
     * Get alteration
     *
     * @method getAlteration
     * @returns {Number}
     */
    MusicPitchData.prototype.getAlteration = function () {
        return this.alteration;
    };

    /**
     * Get octave
     *
     * @method getOctave
     * @returns {Number}
     */
    MusicPitchData.prototype.getOctave = function () {
        return this.octave;
    };

    /**
     * Get step
     *
     * @method getStep
     * @returns {String}
     */
    MusicPitchData.prototype.getStep = function () {
        return this.step;
    };

    // Export
    scope.MusicPitchData = MusicPitchData;
})(MyScript);


(function (scope) {
    /**
     * Music rest
     *
     * @class MusicRest
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicRest(obj) {
        scope.MusicElement.call(this, obj);
        this.decorations = [];
        this.startSlurs = [];
        this.stopSlurs = [];
        if (obj) {
            this.type = obj.type;
            this.dots = new scope.MusicDots(obj.dots);
            this.startTuplet = new scope.MusicTuplet(obj.startTuplet);
            this.stopTuplet = new scope.MusicTuplet(obj.stopTuplet);
            this.timeModification = new scope.MusicTimeModificationData(obj.timeModification);
            this.duration = obj.duration;
            for (var i in obj.decorations) {
                this.decorations.push(new scope.MusicDecoration(obj.decorations[i]));
            }
            for (var l in obj.startSlurs) {
                this.startSlurs.push(new scope.MusicSlur(obj.startSlurs[l]));
            }
            for (var m in obj.stopSlurs) {
                this.stopSlurs.push(new scope.MusicSlur(obj.stopSlurs[m]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicRest.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicRest.prototype.constructor = MusicRest;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicRest.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get dots
     *
     * @method getDots
     * @returns {MusicDots}
     */
    MusicRest.prototype.getDots = function () {
        return this.dots;
    };

    /**
     * Get start tuplet
     *
     * @method getStartTuplet
     * @returns {MusicTuplet}
     */
    MusicRest.prototype.getStartTuplet = function () {
        return this.startTuplet;
    };

    /**
     * Get stop tuplet
     *
     * @method getStopTuplet
     * @returns {MusicTuplet}
     */
    MusicRest.prototype.getStopTuplet = function () {
        return this.stopTuplet;
    };

    /**
     * Get time modification
     *
     * @method getTimeModification
     * @returns {MusicTimeModificationData}
     */
    MusicRest.prototype.getTimeModification = function () {
        return this.timeModification;
    };

    /**
     * Get duration
     *
     * @method getDuration
     * @returns {Number}
     */
    MusicRest.prototype.getDuration = function () {
        return this.duration;
    };

    /**
     * Get decorations
     *
     * @method getDecorations
     * @returns {MusicDecoration[]}
     */
    MusicRest.prototype.getDecorations = function () {
        return this.decorations;
    };

    /**
     * Get start slurs
     *
     * @method getStartSlurs
     * @returns {MusicSlur[]}
     */
    MusicRest.prototype.getStartSlurs = function () {
        return this.startSlurs;
    };

    /**
     * Get stop slurs
     *
     * @method getStopSlurs
     * @returns {MusicSlur[]}
     */
    MusicRest.prototype.getStopSlurs = function () {
        return this.stopSlurs;
    };

    // Export
    scope.MusicRest = MusicRest;
})(MyScript);


(function (scope) {
    /**
     * Music result
     *
     * @class MusicResult
     * @extends AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function MusicResult(obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.MusicDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    MusicResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    MusicResult.prototype.constructor = MusicResult;

    // Export
    scope.MusicResult = MusicResult;
})(MyScript);



(function (scope) {
    /**
     * Music score
     *
     * @class MusicScore
     * @param {Object} [obj]
     * @constructor
     */
    function MusicScore(obj) {
        this.parts = [];
        if (obj) {
            for (var i in obj.parts) {
                this.parts.push(new scope.MusicPart(obj.parts[i]));
            }
        }
    }

    /**
     * Get parts
     *
     * @method getParts
     * @returns {MusicPart[]}
     */
    MusicScore.prototype.getParts = function () {
        return this.parts;
    };

    // Export
    scope.MusicScore = MusicScore;
})(MyScript);


(function (scope) {
    /**
     * Music score tree
     *
     * @class MusicScoreTreeResultElement
     * @extends MusicResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicScoreTreeResultElement(obj) {
        scope.MusicResultElement.call(this, obj);
        if (obj) {
            this.score = new scope.MusicScore(obj.score);
        }
    }

    /**
     * Inheritance property
     */
    MusicScoreTreeResultElement.prototype = new scope.MusicResultElement();

    /**
     * Constructor property
     */
    MusicScoreTreeResultElement.prototype.constructor = MusicScoreTreeResultElement;

    /**
     * Get score
     *
     * @method getScore
     * @returns {MusicScore}
     */
    MusicScoreTreeResultElement.prototype.getScore = function () {
        return this.score;
    };

    // Export
    scope.MusicScoreTreeResultElement = MusicScoreTreeResultElement;
})(MyScript);


(function (scope) {
    /**
     * Music scratch-out
     *
     * @class MusicScratchOut
     * @param {Object} [obj]
     * @constructor
     */
    function MusicScratchOut(obj) {
        this.inputRanges = [];
        this.erasedInputRanges = [];
        if (obj) {
            for (var i in obj.inputRanges) {
                this.inputRanges.push(new scope.MusicInputRange(obj.inputRanges[i]));
            }
            for (var j in obj.erasedInputRanges) {
                this.erasedInputRanges.push(new scope.MusicInputRange(obj.erasedInputRanges[j]));
            }
        }
    }

    /**
     * Get input ranges
     *
     * @method getInputRanges
     * @returns {MusicInputRange[]}
     */
    MusicScratchOut.prototype.getInputRanges = function () {
        return this.inputRanges;
    };

    /**
     * Get erased input ranges
     *
     * @method getErasedInputRanges
     * @returns {MusicInputRange[]}
     */
    MusicScratchOut.prototype.getErasedInputRanges = function () {
        return this.erasedInputRanges;
    };

    // Export
    scope.MusicScratchOut = MusicScratchOut;
})(MyScript);


(function (scope) {
    /**
     * Music slur
     *
     * @class MusicSlur
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicSlur(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
        }
    }

    /**
     * Inheritance property
     */
    MusicSlur.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicSlur.prototype.constructor = MusicSlur;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicSlur.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicSlur = MusicSlur;
})(MyScript);


(function (scope) {
    /**
     * Music stem
     *
     * @class MusicStem
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicStem(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicStem.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicStem.prototype.constructor = MusicStem;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicStem.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicStem = MusicStem;
})(MyScript);


(function (scope) {
    /**
     * Music tie
     *
     * @class MusicTie
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTie(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.placement = obj.placement;
        }
    }

    /**
     * Inheritance property
     */
    MusicTie.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTie.prototype.constructor = MusicTie;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicTie.prototype.getPlacement = function () {
        return this.placement;
    };

    // Export
    scope.MusicTie = MusicTie;
})(MyScript);


(function (scope) {
    /**
     * Music time modification data
     *
     * @class MusicTimeModificationData
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTimeModificationData(obj) {
        if (obj) {
            this.actual = obj.actual;
            this.dots = obj.dots;
            this.normal = obj.normal;
            this.type = obj.type;
        }
    }

    /**
     * Get actual
     *
     * @method getActual
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getActual = function () {
        return this.actual;
    };

    /**
     * Get dots
     *
     * @method getDots
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getDots = function () {
        return this.dots;
    };

    /**
     * Get normal
     *
     * @method getNormal
     * @returns {Number}
     */
    MusicTimeModificationData.prototype.getNormal = function () {
        return this.normal;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicTimeModificationData.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicTimeModificationData = MusicTimeModificationData;
})(MyScript);


(function (scope) {
    /**
     * Music time signature
     *
     * @class MusicTimeSignature
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTimeSignature(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.top = new scope.MusicAnnotation(obj.top);
            this.bottom = new scope.MusicAnnotation(obj.bottom);
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicTimeSignature.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTimeSignature.prototype.constructor = MusicTimeSignature;

    /**
     * Get top
     *
     * @method getTop
     * @returns {MusicAnnotation}
     */
    MusicTimeSignature.prototype.getTop = function () {
        return this.top;
    };

    /**
     * Get bottom
     *
     * @method getBottom
     * @returns {MusicAnnotation}
     */
    MusicTimeSignature.prototype.getBottom = function () {
        return this.bottom;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicTimeSignature.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicTimeSignature = MusicTimeSignature;
})(MyScript);


(function (scope) {
    /**
     * Music tuplet bracket
     *
     * @class MusicTupletBracket
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTupletBracket(obj) {
        scope.MusicElement.call(this, obj);
        if (obj) {
            this.type = obj.type;
        }
    }

    /**
     * Inheritance property
     */
    MusicTupletBracket.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTupletBracket.prototype.constructor = MusicTupletBracket;

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    MusicTupletBracket.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.MusicTupletBracket = MusicTupletBracket;
})(MyScript);


(function (scope) {
    /**
     * Music tuplet
     *
     * @class MusicTuplet
     * @extends MusicElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicTuplet(obj) {
        scope.MusicElement.call(this, obj);
        this.brackets = [];
        if (obj) {
            this.placement = obj.placement;
            this.number = new scope.MusicAnnotation(obj.number);
            for (var i in obj.brackets) {
                this.brackets.push(new scope.MusicTupletBracket(obj.brackets[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    MusicTuplet.prototype = new scope.MusicElement();

    /**
     * Constructor property
     */
    MusicTuplet.prototype.constructor = MusicTuplet;

    /**
     * Get placement
     *
     * @method getPlacement
     * @returns {String}
     */
    MusicTuplet.prototype.getPlacement = function () {
        return this.placement;
    };

    /**
     * Get number
     *
     * @method getNumber
     * @returns {MusicAnnotation}
     */
    MusicTuplet.prototype.getNumber = function () {
        return this.number;
    };

    /**
     * Get brackets
     *
     * @method getBrackets
     * @returns {Array}
     */
    MusicTuplet.prototype.getBrackets = function () {
        return this.brackets;
    };

    // Export
    scope.MusicTuplet = MusicTuplet;
})(MyScript);


(function (scope) {
    /**
     * MusicXML result
     *
     * @class MusicXMLResultElement
     * @extends MusicResultElement
     * @param {Object} [obj]
     * @constructor
     */
    function MusicXMLResultElement(obj) {
        scope.MusicResultElement.call(this, obj);
        if (obj) {
            this.value = obj.value;
        }
    }

    /**
     * Inheritance property
     */
    MusicXMLResultElement.prototype = new scope.MusicResultElement();

    /**
     * Constructor property
     */
    MusicXMLResultElement.prototype.constructor = MusicXMLResultElement;

    /**
     * Get value
     *
     * @method getValue
     * @returns {String}
     */
    MusicXMLResultElement.prototype.getValue = function () {
        return this.value;
    };

    // Export
    scope.MusicXMLResultElement = MusicXMLResultElement;
})(MyScript);


(function (scope) {
    /**
     * Analyzer element
     *
     * @class AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerElement(obj) {
        if (obj) {
            this.elementType = obj.elementType;
        }
    }

    /**
     * Get element type
     *
     * @method getElementType
     * @returns {String}
     */
    AnalyzerElement.prototype.getElementType = function () {
        return this.elementType;
    };

    // Export
    scope.AnalyzerElement = AnalyzerElement;
})(MyScript);


(function (scope) {
    /**
     * Analyzer table cell
     *
     * @class AnalyzerCell
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerCell(obj) {
        scope.AnalyzerElement.call(this, obj);
        if (obj) {
            this.data = new scope.AnalyzerCellData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerCell.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerCell.prototype.constructor = AnalyzerCell;

    /**
     * Get analyzer cell data
     *
     * @method getData
     * @returns {AnalyzerCellData}
     */
    AnalyzerCell.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.AnalyzerCell = AnalyzerCell;
})(MyScript);


(function (scope) {
    /**
     * Analyzer cell data
     *
     * @class AnalyzerCellData
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerCellData(obj) {
        if (obj) {
            this.firstColumn = obj.firstColumn;
            this.lastColumn = obj.lastColumn;
            this.firstRow = obj.firstRow;
            this.lastRow = obj.lastRow;
            this.height = obj.height;
            this.width = obj.width;
            this.orientation = obj.orientation;
            this.topLeftPoint = new scope.Point(obj.topLeftPoint);
            this.topBorder = obj.topBorder;
            this.bottomBorder = obj.bottomBorder;
            this.leftBorder = obj.leftBorder;
            this.rightBorder = obj.rightBorder;
        }
    }

    /**
     * Get first column
     *
     * @method getFirstColumn
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getFirstColumn = function () {
        return this.firstColumn;
    };

    /**
     * Get last column
     *
     * @method getLastColumn
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getLastColumn = function () {
        return this.lastColumn;
    };

    /**
     * Get first row
     *
     * @method getFirstRow
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getFirstRow = function () {
        return this.firstRow;
    };

    /**
     * Get last row
     *
     * @method getLastRow
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getLastRow = function () {
        return this.lastRow;
    };

    /**
     * Get height
     *
     * @method getHeight
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * Get width
     *
     * @method getWidth
     * @returns {Number}
     */
    AnalyzerCellData.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Get orientation
     *
     * @method getOrientation
     * @returns {String}
     */
    AnalyzerCellData.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     * Get top-left point
     *
     * @method getTopLeftPoint
     * @returns {Point}
     */
    AnalyzerCellData.prototype.getTopLeftPoint = function () {
        return this.topLeftPoint;
    };

    /**
     * Has top border
     *
     * @method hasTopBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasTopBorder = function () {
        return this.topBorder;
    };

    /**
     * Has bottom border
     *
     * @method hasBottomBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasBottomBorder = function () {
        return this.bottomBorder;
    };

    /**
     * Has left border
     *
     * @method hasLeftBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasLeftBorder = function () {
        return this.leftBorder;
    };

    /**
     * Has right border
     *
     * @method hasRightBorder
     * @returns {Boolean}
     */
    AnalyzerCellData.prototype.hasRightBorder = function () {
        return this.rightBorder;
    };

    /**
     * Get bounding box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AnalyzerCellData.prototype.getBoundingBox = function () {
        var rectangle = new scope.Rectangle();
        rectangle.setTopLeftPoint(this.getTopLeftPoint());
        rectangle.setWidth(this.getWidth());
        rectangle.setHeight(this.getHeight());
        return rectangle;
    };

    // Export
    scope.AnalyzerCellData = AnalyzerCellData;
})(MyScript);


(function (scope) {
    /**
     * Analyzer document
     *
     * @class AnalyzerDocument
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerDocument(obj) {
        scope.AnalyzerElement.call(this, obj);
        this.textLines = [];
        this.shapes = [];
        this.tables = [];
        this.groups = [];
        if (obj) {
            for (var i in obj.textLines) {
                this.textLines.push(new scope.AnalyzerTextLine(obj.textLines[i]));
            }
            for (var j in obj.shapes) {
                this.shapes.push(new scope.ShapeSegment(obj.shapes[j]));
            }
            for (var k in obj.tables) {
                this.tables.push(new scope.AnalyzerTable(obj.tables[k]));
            }
            for (var l in obj.groups) {
                this.groups.push(new scope.AnalyzerGroup(obj.groups[l]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerDocument.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerDocument.prototype.constructor = AnalyzerDocument;

    /**
     * Get text lines
     *
     * @method getTextLines
     * @returns {AnalyzerTextLine[]}
     */
    AnalyzerDocument.prototype.getTextLines = function () {
        return this.textLines;
    };

    /**
     * Get shapes
     *
     * @method getShapes
     * @returns {ShapeSegment[]}
     */
    AnalyzerDocument.prototype.getShapes = function () {
        return this.shapes;
    };

    /**
     * Get tables
     *
     * @method getTables
     * @returns {AnalyzerTable[]}
     */
    AnalyzerDocument.prototype.getTables = function () {
        return this.tables;
    };

    /**
     * Get groups
     *
     * @method getGroups
     * @returns {AnalyzerGroup[]}
     */
    AnalyzerDocument.prototype.getGroups = function () {
        return this.groups;
    };

    /**
     * Has scratch-out results
     *
     * @method hasScratchOutResults
     * @returns {Boolean}
     */
    AnalyzerDocument.prototype.hasScratchOutResults = function () {
        for (var i in this.getShapes()) {
            var currentSeg = this.getShapes()[i];
            for (var j in currentSeg.getCandidates()) {
                var currentCandidate = currentSeg.getCandidates()[j];
                if (currentCandidate instanceof scope.ShapeScratchOut) {
                    return true;
                }
            }
        }
        return false;
    };

    // Export
    scope.AnalyzerDocument = AnalyzerDocument;
})(MyScript);


(function (scope) {
    /**
     * Analyzer element reference
     *
     * @class AnalyzerElementReference
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerElementReference(obj) {
        if (obj) {
            this.uniqueID = obj.uniqueID;
            this.type = obj.type;
        }
    }

    /**
     * Get unique id
     *
     * @method getUniqueId
     * @returns {String}
     */
    AnalyzerElementReference.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerElementReference.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AnalyzerElementReference = AnalyzerElementReference;
})(MyScript);


(function (scope) {
    /**
     * Analyzer group
     *
     * @class AnalyzerGroup
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerGroup(obj) {
        scope.AnalyzerElement.call(this, obj);
        this.elementReferences = [];
        if (obj) {
            this.type = obj.type;
            this.uniqueID = obj.uniqueID;
            for (var i in obj.elementReferences) {
                this.elementReferences.push(new scope.AnalyzerElementReference(obj.elementReferences[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerGroup.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerGroup.prototype.constructor = AnalyzerGroup;

    /**
     * Get element references
     *
     * @method getElementReferences
     * @returns {AnalyzerElementReference[]}
     */
    AnalyzerGroup.prototype.getElementReferences = function () {
        return this.elementReferences;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerGroup.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get unique Id
     *
     * @method getUniqueId
     * @returns {String}
     */
    AnalyzerGroup.prototype.getUniqueId = function () {
        return this.uniqueID;
    };

    // Export
    scope.AnalyzerGroup = AnalyzerGroup;
})(MyScript);


(function (scope) {
    /**
     * Analyzer ink range
     *
     * @class AnalyzerInkRange
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerInkRange(obj) {
        if (obj) {
            this.firstPoint = new scope.Point(obj.firstPoint);
            this.lastPoint = new scope.Point(obj.lastPoint);
            this.stroke = new scope.AnalyzerRecognizedStroke(obj.stroke);
        }
    }

    /**
     * Get first point
     *
     * @method getFirstPoint
     * @returns {Point}
     */
    AnalyzerInkRange.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };

    /**
     * Get last point
     *
     * @method getLastPoint
     * @returns {Point}
     */
    AnalyzerInkRange.prototype.getLastPoint = function () {
        return this.lastPoint;
    };

    /**
     * Get stroke
     *
     * @method getStroke
     * @returns {null|*}
     */
    AnalyzerInkRange.prototype.getStroke = function () {
        return this.stroke;
    };

    // Export
    scope.AnalyzerInkRange = AnalyzerInkRange;
})(MyScript);


(function (scope) {
    /**
     * Analyzer line
     *
     * @class AnalyzerLine
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerLine(obj) {
        scope.AnalyzerElement.call(this, obj);
        if (obj) {
            this.data = new scope.AnalyzerLineData(obj.data);
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerLine.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerLine.prototype.constructor = AnalyzerLine;

    /**
     * Get data
     *
     * @method getData
     * @returns {AnalyzerLineData}
     */
    AnalyzerLine.prototype.getData = function () {
        return this.data;
    };

    // Export
    scope.AnalyzerLine = AnalyzerLine;
})(MyScript);


(function (scope) {
    /**
     * Analyzer line data
     *
     * @class AnalyzerLineData
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerLineData(obj) {
        if (obj) {
            this.p1 = new scope.Point(obj.p1);
            this.p2 = new scope.Point(obj.p2);
        }
    }

    /**
     * Get p1
     *
     * @method getP1
     * @returns {Point}
     */
    AnalyzerLineData.prototype.getP1 = function () {
        return this.p1;
    };

    /**
     * Get p2
     *
     * @method getP2
     * @returns {Point}
     */
    AnalyzerLineData.prototype.getP2 = function () {
        return this.p2;
    };

    // Export
    scope.AnalyzerLineData = AnalyzerLineData;
})(MyScript);


(function (scope) {
    /**
     * AnalyzerRecognizedStroke
     *
     * @class AnalyzerRecognizedStroke
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerRecognizedStroke(obj) {
        if (obj) {
            this.type = obj.type;
            this.x = obj.x;
            this.y = obj.y;
        }
    }

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerRecognizedStroke.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get x
     *
     * @method getX
     * @returns {Number[]}
     */
    AnalyzerRecognizedStroke.prototype.getX = function () {
        return this.x;
    };

    /**
     * Get y
     *
     * @method getY
     * @returns {Number[]}
     */
    AnalyzerRecognizedStroke.prototype.getY = function () {
        return this.y;
    };

    // Export
    scope.AnalyzerRecognizedStroke = AnalyzerRecognizedStroke;
})(MyScript);


(function (scope) {
    /**
     * Analyzer result
     *
     * @class AnalyzerResult
     * @extends AbstractResult
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerResult(obj) {
        scope.AbstractResult.call(this, obj);
        if (obj) {
            this.result = new scope.AnalyzerDocument(obj.result);
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerResult.prototype = new scope.AbstractResult();

    /**
     * Constructor property
     */
    AnalyzerResult.prototype.constructor = AnalyzerResult;

    // Export
    scope.AnalyzerResult = AnalyzerResult;
})(MyScript);



(function (scope) {
    /**
     * Analyzer stroke type
     *
     * @class AnalyzerStrokeType
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerStrokeType(obj) {
        if (obj) {
            this.inkRange = new scope.AnalyzerInkRange(obj.inkRange);
            this.type = obj.type;
        }
    }

    /**
     * Get ink range
     *
     * @method getInkRange
     * @returns {AnalyzerInkRange}
     */
    AnalyzerStrokeType.prototype.getInkRange = function () {
        return this.inkRange;
    };

    /**
     * Get type
     *
     * @method getType
     * @returns {String}
     */
    AnalyzerStrokeType.prototype.getType = function () {
        return this.type;
    };

    // Export
    scope.AnalyzerStrokeType = AnalyzerStrokeType;
})(MyScript);


(function (scope) {
    /**
     * Analyzer table
     *
     * @class AnalyzerTable
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerTable(obj) {
        scope.AnalyzerElement.call(this, obj);
        this.lines = [];
        this.cells = [];
        this.inkRanges = [];
        if (obj) {
            this.data = new scope.AnalyzerTableData(obj.data);
            for (var i in obj.lines) {
                this.lines.push(new scope.AnalyzerLine(obj.lines[i]));
            }
            for (var j in obj.cells) {
                this.cells.push(new scope.AnalyzerCell(obj.cells[j]));
            }
            for (var k in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[k]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerTable.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerTable.prototype.constructor = AnalyzerTable;

    /**
     * Get data
     *
     * @method getData
     * @returns {AnalyzerTableData}
     */
    AnalyzerTable.prototype.getData = function () {
        return this.data;
    };

    /**
     * Get lines
     *
     * @method getLines
     * @returns {AnalyzerLine[]}
     */
    AnalyzerTable.prototype.getLines = function () {
        return this.lines;
    };

    /**
     * Get cells
     *
     * @method getCells
     * @returns {AnalyzerCell[]}
     */
    AnalyzerTable.prototype.getCells = function () {
        return this.cells;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {AnalyzerInkRange[]}
     */
    AnalyzerTable.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.AnalyzerTable = AnalyzerTable;
})(MyScript);


(function (scope) {
    /**
     * Analyzer table data
     *
     * @class AnalyzerTableData
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerTableData(obj) {
        if (obj) {
            this.columnCount = obj.columnCount;
            this.rowCount = obj.rowCount;
        }
    }

    /**
     * Get column count
     *
     * @method getColumnCount
     * @returns {Number}
     */
    AnalyzerTableData.prototype.getColumnCount = function () {
        return this.columnCount;
    };

    /**
     * Get row count
     *
     * @method getRowCount
     * @returns {Number}
     */
    AnalyzerTableData.prototype.getRowCount = function () {
        return this.rowCount;
    };

    // Export
    scope.AnalyzerTableData = AnalyzerTableData;
})(MyScript);


(function (scope) {
    /**
     * Analyzer text line
     *
     * @class AnalyzerTextLine
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerTextLine(obj) {
        scope.AnalyzerElement.call(this, obj);
        this.inkRanges = [];
        this.underlineList = [];
        if (obj) {
            this.data = new scope.AnalyzerTextLineData(obj.data);
            this.result = new scope.TextDocument(obj.result);
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[i]));
            }
            for (var j in obj.underlineList) {
                this.underlineList.push(new scope.AnalyzerUnderline(obj.underlineList[j]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerTextLine.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerTextLine.prototype.constructor = AnalyzerTextLine;

    /**
     * Get data
     *
     * @method getData
     * @returns {AnalyzerTextLineData}
     */
    AnalyzerTextLine.prototype.getData = function () {
        return this.data;
    };

    /**
     * Get text document
     *
     * @method getTextDocument
     * @returns {TextDocument}
     */
    AnalyzerTextLine.prototype.getTextDocument = function () {
        return this.result;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {AnalyzerInkRange[]}
     */
    AnalyzerTextLine.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    /**
     * Get underline list
     *
     * @method getUnderlineList
     * @returns {AnalyzerUnderline[]}
     */
    AnalyzerTextLine.prototype.getUnderlineList = function () {
        return this.underlineList;
    };

    // Export
    scope.AnalyzerTextLine = AnalyzerTextLine;
})(MyScript);


(function (scope) {
    /**
     * Analyzer text line data
     *
     * @class AnalyzerTextLineData
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerTextLineData(obj) {
        if (obj) {
            this.baselinePos = obj.baselinePos;
            this.toMidline = obj.toMidline;
            this.orientation = obj.orientation;
            this.topLeftPoint = new scope.Point(obj.topLeftPoint);
            this.textHeight = obj.textHeight;
            this.justificationType = obj.justificationType;
            this.height = obj.height;
            this.width = obj.width;
        }
    }

    /**
     * Get baseline position
     *
     * @method getBaselinePos
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getBaselinePos = function () {
        return this.baselinePos;
    };

    /**
     * Get to midline
     *
     * @method getToMidline
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getToMidline = function () {
        return this.toMidline;
    };

    /**
     * Get orientation
     *
     * @method getOrientation
     * @returns {String}
     */
    AnalyzerTextLineData.prototype.getOrientation = function () {
        return this.orientation;
    };

    /**
     * Get top-left point
     *
     * @method getTopLeftPoint
     * @returns {Point}
     */
    AnalyzerTextLineData.prototype.getTopLeftPoint = function () {
        return this.topLeftPoint;
    };

    /**
     * Get text height
     *
     * @method getTextHeight
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getTextHeight = function () {
        return this.textHeight;
    };

    /**
     * Get justification type
     *
     * @method getJustificationType
     * @returns {String}
     */
    AnalyzerTextLineData.prototype.getJustificationType = function () {
        return this.justificationType;
    };

    /**
     * Get height
     *
     * @method getHeight
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getHeight = function () {
        return this.height;
    };

    /**
     * Get width
     *
     * @method getWidth
     * @returns {Number}
     */
    AnalyzerTextLineData.prototype.getWidth = function () {
        return this.width;
    };

    /**
     * Get bounding box
     *
     * @method getBoundingBox
     * @returns {Rectangle}
     */
    AnalyzerTextLineData.prototype.getBoundingBox = function () {
        var rectangle = new scope.Rectangle();
        if (this.getTopLeftPoint() || this.getWidth() || this.getHeight()) {
            rectangle.setTopLeftPoint(this.getTopLeftPoint());
            rectangle.setWidth(this.getWidth());
            rectangle.setHeight(this.getHeight());
        }
        return rectangle;
    };

    // Export
    scope.AnalyzerTextLineData = AnalyzerTextLineData;
})(MyScript);


(function (scope) {
    /**
     * Analyzer underline
     *
     * @class AnalyzerUnderline
     * @extends AnalyzerElement
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerUnderline(obj) {
        scope.AnalyzerElement.call(this, obj);
        this.inkRanges = [];
        if (obj) {
            this.data = new scope.AnalyzerUnderlineData(obj.data);
            for (var i in obj.inkRanges) {
                this.inkRanges.push(new scope.AnalyzerInkRange(obj.inkRanges[i]));
            }
        }
    }

    /**
     * Inheritance property
     */
    AnalyzerUnderline.prototype = new scope.AnalyzerElement();

    /**
     * Constructor property
     */
    AnalyzerUnderline.prototype.constructor = AnalyzerUnderline;

    /**
     * Get data
     *
     * @method getData
     * @returns {AnalyzerUnderlineData}
     */
    AnalyzerUnderline.prototype.getData = function () {
        return this.data;
    };

    /**
     * Get ink ranges
     *
     * @method getInkRanges
     * @returns {AnalyzerInkRange[]}
     */
    AnalyzerUnderline.prototype.getInkRanges = function () {
        return this.inkRanges;
    };

    // Export
    scope.AnalyzerUnderline = AnalyzerUnderline;
})(MyScript);


(function (scope) {
    /**
     * Analyzer underline data
     *
     * @class AnalyzerUnderlineData
     * @param {Object} [obj]
     * @constructor
     */
    function AnalyzerUnderlineData(obj) {
        if (obj) {
            this.firstCharacter = obj.firstCharacter;
            this.lastCharacter = obj.lastCharacter;
        }
    }

    /**
     * Get first character
     *
     * @method getFirstCharacter
     * @returns {Number}
     */
    AnalyzerUnderlineData.prototype.getFirstCharacter = function () {
        return this.firstCharacter;
    };

    /**
     * Get last character
     *
     * @method getLastCharacter
     * @returns {Number}
     */
    AnalyzerUnderlineData.prototype.getLastCharacter = function () {
        return this.lastCharacter;
    };

    // Export
    scope.AnalyzerUnderlineData = AnalyzerUnderlineData;
})(MyScript);


(function (scope, Q) {
    /**
     * Network interface
     *
     * @class NetworkInterface
     * @constructor
     */
    function NetworkInterface() {
    }

    NetworkInterface.parseURL = function (url) {

        var parser = document.createElement('a'),
            searchObject = {},
            queries, split, i;
        // Let the browser do the work
        parser.href = url;
        // Convert query string to object
        queries = parser.search.replace(/^\?/, '').split('&');
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }
        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash
        };
    };

    /**
     * Parse JSON String to Object
     *
     * @method parse
     * @param {Object} req
     * @returns {Object}
     */
    NetworkInterface.parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return result;
    };

    /**
     * Transform object data request to a list of parameters
     *
     * @method transformRequest
     * @param {Object} [obj]
     * @returns {String}
     */
    NetworkInterface.transformRequest = function (obj) {
        var str = [];
        for (var p in obj) {
            if ((typeof obj[p] !== 'undefined') &&
                (typeof obj[p] !== 'function')) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return str.join('&');
    };

    /**
     * Send request to the network and return a promise
     *
     * @method xhr
     * @param {String} type
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.xhr = function (type, url, data) {

        return Q.Promise(function (resolve, reject, notify) {

            function onStateChange() {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(NetworkInterface.parse(request));
                    }
                }
            }

            function onLoad() {
                if (request.status >= 200 && request.status < 300) {
                    resolve(NetworkInterface.parse(request));
                } else {
                    reject(new Error(request.responseText));
                }
            }

            function onError() {
                reject(new Error('Can\'t XHR ' + url));
            }

            function onProgress(e) {
                notify(e.loaded / e.total);
            }

            var request = new XMLHttpRequest();
            request.open(type, url, true);
            request.withCredentials = true;
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            request.onerror = onError;
            request.onprogress = onProgress;
            request.onload = onLoad;
            request.onreadystatechange = onStateChange;
            request.send(NetworkInterface.transformRequest(data));
        });
    };

    /**
     * Get request
     *
     * @method get
     * @param {String} src
     * @param {Object} params
     * @returns {Promise}
     */
    NetworkInterface.get = function (src, params) {
        if (params) {
            src += '?' + NetworkInterface.transformRequest(params);
        }
        return scope.NetworkInterface.xhr('GET', src, undefined);
    };

    /**
     * Put request
     *
     * @method put
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.put = function (url, data) {
        return scope.NetworkInterface.xhr('PUT', url, data);
    };

    /**
     * Post request
     *
     * @method post
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.post = function (url, data) {
        return scope.NetworkInterface.xhr('POST', url, data);
    };

    /**
     * Delete request
     *
     * @method delete
     * @param {String} url
     * @param {Object} data
     * @returns {Promise}
     */
    NetworkInterface.delete = function (url, data) {
        return scope.NetworkInterface.xhr('DELETE', url, data);
    };

    // Export
    scope.NetworkInterface = NetworkInterface;
})(MyScript, Q);


/* jshint ignore:start */

(function (scope, Q) {
    /**
     * Network interface
     *
     * @class NetworkWSInterface
     * @constructor
     */
    function NetworkWSInterface() {
    }

    NetworkWSInterface.prototype.setUrl = function (url) {
        if ((url !== undefined) && (url !== this._url)) {
            this.close();
            this._url = url;
        }
    };

    NetworkWSInterface.prototype.getUrl = function () {
        return this._url;
    };

    NetworkWSInterface.prototype.setCallback = function (callback) {
        if (callback !== undefined) {
            this.close();
            this._callback = callback;
        }
    };

    NetworkWSInterface.prototype.getCallback = function () {
        return this._callback;
    };

    NetworkWSInterface.prototype.getState = function () {
        return _getWebSocketState(this._socket);
    };

    NetworkWSInterface.prototype.isClosed = function () {
        return this.getState() === 3;
    };

    NetworkWSInterface.prototype.isClosing = function () {
        return this.getState() === 2;
    };

    NetworkWSInterface.prototype.isOpen = function () {
        return this.getState() === 1;
    };

    NetworkWSInterface.prototype.isConnecting = function () {
        return this.getState() === 0;
    };

    NetworkWSInterface.prototype.open = function () {
        if (this.getUrl() && this.getCallback() && ((this.getState() < 0) || this.isClosed())) {
            this._socket = _openWebSocket(this.getUrl(), this.getCallback());
        }
    };

    NetworkWSInterface.prototype.close = function (code, reason) {
        if (this.getState() < 2) {
            _closeWebSocket(this._socket, code, reason);
        }
    };

    NetworkWSInterface.prototype.send = function (request) {
        var state = _getWebSocketState(this._socket);
        if (state  === 1) {
            _sendMessage(this._socket, request);
        } else {
            this.open();
        }
    };

    /**
     *
     * @param url
     * @param callback
     * @returns {WebSocket}
     * @private
     */
    var _openWebSocket = function (url, callback) {
        function onOpen(e) {
            callback(e);
        }
        function onClose(e) {
            callback(e);
        }
        function onError(e) {
            callback(e);
        }
        function onMessage(e) {
            callback({
                type: e.type,
                data: JSON.parse(e.data)
            });
        }

        var socket = new WebSocket(url);
        socket.onopen = onOpen;
        socket.onclose = onClose;
        socket.onerror = onError;
        socket.onmessage = onMessage;
        return socket;
    };

    /**
     *
     * @param socket
     * @param code
     * @param reason
     * @private
     */
    var _closeWebSocket = function (socket, code, reason) {
        if (socket) {
            socket.close(code, reason);
        }
    };

    /**
     *
     * @param socket
     * @returns {*}
     * @private
     */
    var _getWebSocketState = function (socket) {
        if (socket) {
            return socket.readyState;
        }
        return -1;
    };

    /**
     *
     * @param socket
     * @param message
     * @private
     */
    var _sendMessage = function (socket, message) {
        if (socket) {
            socket.send(JSON.stringify(message));
        }
    };

    // Export
    scope.NetworkWSInterface = NetworkWSInterface;
})(MyScript, Q);
/* jshint ignore:end */



(function (scope, CryptoJS) {
    /**
     * Abstract recognizer interface
     *
     * @class AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AbstractRecognizer(host) {
        this.setUrl(this.getProtocol() + 'cloud.myscript.com');
        if (host) {
            this.setUrl(this.getProtocol() + host);
        }
        this.setSSL(true);
    }

    AbstractRecognizer.prototype.getProtocol = function() {
        return this._ssl? 'https://': 'http://';
    };

    AbstractRecognizer.prototype.getSSL = function() {
        return this._ssl;
    };

    AbstractRecognizer.prototype.setSSL = function (ssl) {
        if (ssl !== undefined) {
            this._ssl = ssl;
            this.setUrl(this.getProtocol() + this.getHost());
        }
    };

    /**
     * Get the recognition service host
     *
     * @method getHost
     * @returns {string|String|*}
     */
    AbstractRecognizer.prototype.getHost = function() {
        return scope.NetworkInterface.parseURL(this.getUrl()).host;
    };

    /**
     * Set the recognition service host
     *
     * @method setHost
     * @param {String}
     */
    AbstractRecognizer.prototype.setHost = function (host) {
        if (host !== undefined) {
            this.setUrl(this.getProtocol() + host);
        }
    };

    /**
     * Get the recognition service host
     *
     * @method getUrl
     * @returns {String}
     */
    AbstractRecognizer.prototype.getUrl = function() {
        return this.url;
    };

    /**
     * Set the recognition service url
     *
     * @method setUrl
     * @param {String}
     */
    AbstractRecognizer.prototype.setUrl = function (url) {
        if (url !== undefined) {
            this.url = url;
        }
    };

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {AbstractParameter}
     */
    AbstractRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {AbstractParameter} parameters
     */
    AbstractRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Get precision
     *
     * @method getPrecision
     * @returns {Number}
     */
    AbstractRecognizer.prototype.getPrecision = function () {
        return this.precision;
    };

    /**
     * Set precision
     *
     * @method setPrecision
     * @param {Number} precision
     */
    AbstractRecognizer.prototype.setPrecision = function (precision) {
        this.precision = precision;
    };

    /**
     * Get the recognition languages available for an application and a specific inputMode
     *
     * @method getAvailableLanguageList
     * @param {String} applicationKey
     * @param {String} inputMode
     * @returns {Promise}
     */
    AbstractRecognizer.prototype.getAvailableLanguageList = function (applicationKey, inputMode) {
        var data = new scope.RecognitionLanguagesData();
        data.setApplicationKey(applicationKey);
        data.setInputMode(inputMode);

        return scope.NetworkInterface.get(this.getUrl() + '/api/v3.0/recognition/rest/text/languages.json', data).then(
            function success(response) {
                return response.result;
            }
        );
    };

    /**
     * Do REST recognition
     *
     * @private
     * @method doRestRecognition
     * @param {AbstractRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    AbstractRecognizer.prototype.doRestRecognition = function (input, applicationKey, hmacKey, instanceId) {
        if (input.getComponents) {
            _filterStrokes(input.getComponents(), this.getPrecision());
        } else if (input.getInputUnits) {
            for (var i in input.getInputUnits()) {
                _filterStrokes(input.getInputUnits()[i].getComponents(), this.getPrecision());
            }
        }

        if (input instanceof scope.TextRecognitionInput) {
            return _doTextRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else if (input instanceof scope.ShapeRecognitionInput) {
            return _doShapeRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else if (input instanceof scope.MathRecognitionInput) {
            return _doMathRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else if (input instanceof scope.MusicRecognitionInput) {
            return _doMusicRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else if (input instanceof scope.AnalyzerRecognitionInput) {
            return _doAnalyzerRecognition(this.getUrl(), input, applicationKey, hmacKey, instanceId);
        } else {
            throw new Error('not implemented');
        }
    };

    /**
     * Clear REST recognition
     *
     * @method clearRestRecognition
     * @param {String} instanceId
     * @returns {Promise}
     */
    AbstractRecognizer.prototype.clearRestRecognition = function (instanceId) {
        var data = {
            instanceSessionId: instanceId
        };
        return _clearShapeRecognition(this.getUrl(), data);
    };

    /**
     * Do text recognition
     *
     * @private
     * @method _doTextRecognition
     * @param {String} url
     * @param {TextRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doTextRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.TextRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/text/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.TextResult(response);
            }
        );
    };

    /**
     * Do shape recognition
     *
     * @private
     * @method _doShapeRecognition
     * @param {String} url
     * @param {ShapeRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doShapeRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.ShapeRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/shape/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.ShapeResult(response);
            }
        );
    };

    /**
     * Clear shape recognition
     *
     * @private
     * @method _clearShapeRecognition
     * @param {String} url
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _clearShapeRecognition = function (url, instanceId) {
        var data = {
            instanceSessionId: instanceId
        };

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/shape/clearSessionId.json', data).then(
            function success(response) {
                return new scope.ShapeResult(response);
            }
        );
    };

    /**
     * Do shape recognition
     *
     * @private
     * @method _doMathRecognition
     * @param {String} url
     * @param {MathRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doMathRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.MathRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/math/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.MathResult(response);
            }
        );
    };

    /**
     * Do music recognition
     *
     * @private
     * @method _doMusicRecognition
     * @param {String} url
     * @param {MusicRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doMusicRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.MusicRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/music/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.MusicResult(response);
            }
        );
    };

    /**
     * Do analyzer recognition
     *
     * @method _doAnalyzerRecognition
     * @param {String} url
     * @param {AnalyzerRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    var _doAnalyzerRecognition = function (url, input, applicationKey, hmacKey, instanceId) {
        var data = new scope.AnalyzerRecognitionData();
        _fillData(data, input, instanceId, applicationKey, hmacKey);

        return scope.NetworkInterface.post(url + '/api/v3.0/recognition/rest/analyzer/doSimpleRecognition.json', data).then(
            function success(response) {
                return new scope.AnalyzerResult(response);
            }
        );
    };

    /**
     * Compute HMAC signature for server authentication
     *
     * @private
     * @method _computeHmac
     * @param {AbstractRecognitionInput} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     */
    var _computeHmac = function (input, applicationKey, hmacKey) {
        var jsonInput = (typeof input === 'object') ? JSON.stringify(input) : input;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };

    var _filterStrokes = function (components, precision) {
        components.forEach(function (currentValue) {
            if (currentValue instanceof scope.StrokeComponent) {
                currentValue.toFixed(precision);
            }
        });
    };

    var _fillData = function (data, input, instanceId, applicationKey, hmacKey) {
        data.setRecognitionInput(input);
        data.setApplicationKey(applicationKey);
        data.setInstanceId(instanceId);
        if (hmacKey) {
            data.setHmac(_computeHmac(data.getRecognitionInput(), applicationKey, hmacKey));
        }
    };

    // Export
    scope.AbstractRecognizer = AbstractRecognizer;
})(MyScript, CryptoJS);



(function (scope, CryptoJS) {
    /**
     * Abstract WebSocket recognizer interface
     *
     * @class AbstractWSRecognizer
     * @constructor
     */
    function AbstractWSRecognizer() {
        this._wsInterface = new scope.NetworkWSInterface();
    }

    AbstractWSRecognizer.prototype.getProtocol = function() {
        return this._ssl? 'wss://': 'ws://';
    };

    AbstractWSRecognizer.prototype.getSSL = function() {
        return this._ssl;
    };

    AbstractWSRecognizer.prototype.setSSL = function (ssl) {
        if (ssl !== undefined) {
            this._ssl = ssl;
            this.setUrl(this.getProtocol() + this.getHost());
        }
    };

    /**
     * Get the recognition service host
     *
     * @method getHost
     * @returns {string|String|*}
     */
    AbstractWSRecognizer.prototype.getHost = function() {
        return scope.NetworkInterface.parseURL(this.getUrl()).host;
    };

    /**
     * Set the recognition service host
     *
     * @method setHost
     * @param {String}
     */
    AbstractWSRecognizer.prototype.setHost = function (host) {
        if ((host !== undefined) && (host != this.getHost())) {
            this.setUrl(this.getProtocol() + host);
        }
    };

    AbstractWSRecognizer.prototype.setUrl = function (url) { // jshint ignore:line
        throw new Error('not implemented');
    };

    AbstractWSRecognizer.prototype.getUrl = function () {
        return this._wsInterface.getUrl();
    };

    AbstractWSRecognizer.prototype.setCallback = function (callback) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {AbstractParameter}
     */
    AbstractWSRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {AbstractParameter} parameters
     */
    AbstractWSRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    /**
     * Get precision
     *
     * @method getPrecision
     * @returns {Number}
     */
    AbstractWSRecognizer.prototype.getPrecision = function () {
        return this.precision;
    };

    /**
     * Set precision
     *
     * @method setPrecision
     * @param {Number} precision
     */
    AbstractWSRecognizer.prototype.setPrecision = function (precision) {
        this.precision = precision;
    };

    AbstractWSRecognizer.prototype.isClosed = function () {
        return this._wsInterface.isClosed();
    };

    AbstractWSRecognizer.prototype.isClosing = function () {
        return this._wsInterface.isClosing();
    };

    AbstractWSRecognizer.prototype.isOpen = function () {
        return this._wsInterface.isOpen();
    };

    AbstractWSRecognizer.prototype.isConnecting = function () {
        return this._wsInterface.isConnecting();
    };

    /**
     * Open the socket
     *
     * @method open
     */
    AbstractWSRecognizer.prototype.open = function () {
        this._wsInterface.open();
    };

    /**
     * Close the socket
     *
     * @method close
     */
    AbstractWSRecognizer.prototype.close = function () {
        this._wsInterface.close();
    };

    /**
     * Send a message
     *
     * @method sendMessage
     * @param {AbstractWSMessage} message
     */
    AbstractWSRecognizer.prototype.sendMessage = function (message) {
        if (message.getComponents) {
            _filterStrokes(message.getComponents(), this.getPrecision());
        } else if (message.getInputUnits) {
            for (var i in message.getInputUnits()) {
                _filterStrokes(message.getInputUnits()[i].getComponents(), this.getPrecision());
            }
        }
        this._wsInterface.send(message);
    };

    /**
     * Initialize the WebSocket
     *
     * @method initWSRecognition
     * @param {String} applicationKey
     */
    AbstractWSRecognizer.prototype.initWSRecognition = function (applicationKey) {
        var message = new scope.InitRequestWSMessage();
        message.setApplicationKey(applicationKey);
        this.sendMessage(message);
    };

    /**
     * Authenticate the WebSocket client end with a handshake of HMAC signature
     *
     * @method takeUpHmacChallenge
     * @param {String} applicationKey
     * @param {String} challenge
     * @param {String} hmacKey
     */
    AbstractWSRecognizer.prototype.takeUpHmacChallenge = function (applicationKey, challenge, hmacKey) {
        var message = new scope.ChallengeRequestWSMessage();
        message.setApplicationKey(applicationKey);
        message.setChallenge(challenge);
        if (hmacKey) {
            message.setHmacSignature(_computeHmac(challenge, applicationKey, hmacKey));
        }
        this.sendMessage(message);
    };

    /**
     * Reset the WebSocket recognition session
     *
     * @method resetWSRecognition
     */
    AbstractWSRecognizer.prototype.resetWSRecognition = function () {
        var message = new scope.ResetRequestWSMessage();
        this.sendMessage(message);
    };

    /**
     * Compute HMAC signature for server authentication
     *
     * @private
     * @method _computeHmac
     * @param {String} input
     * @param {String} applicationKey
     * @param {String} hmacKey
     */
    var _computeHmac = function (input, applicationKey, hmacKey) {
        var jsonInput = (typeof input === 'object') ? JSON.stringify(input) : input;
        return CryptoJS.HmacSHA512(jsonInput, applicationKey + hmacKey).toString(CryptoJS.enc.Hex);
    };

    var _filterStrokes = function (components, precision) {
        components.forEach(function (currentValue) {
            if (currentValue instanceof scope.StrokeComponent) {
                currentValue.toFixed(precision);
            }
        });
    };

    // Export
    scope.AbstractWSRecognizer = AbstractWSRecognizer;
})(MyScript, CryptoJS);



(function (scope) {
    /**
     * Text recognizer interface
     *
     * @class TextRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function TextRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.TextParameter();
        this.parameters.setLanguage('en_US');
        this.parameters.setInputMode('CURSIVE');
    }

    /**
     * Inheritance property
     */
    TextRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    TextRecognizer.prototype.constructor = TextRecognizer;

    /**
     * Do text recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]|TextInputUnit[]} components
     * @param {String} hmacKey
     * @param {TextParameter} [parameters]
     * @returns {Promise}
     */
    TextRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var inputUnits = [];
        if (components && components.length > 0) {
            if (components[0] instanceof scope.TextInputUnit) {
                inputUnits = components;
            } else {
                var unit = new scope.TextInputUnit();
                unit.setComponents(components);
                inputUnits.push(unit);
            }
        }
        var input = new scope.TextRecognitionInput();
        input.setParameters(params);
        input.setInputUnits(inputUnits);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, input, applicationKey, hmacKey, instanceId); // super
    };

    // Export
    scope.TextRecognizer = TextRecognizer;
})(MyScript);



(function (scope) {
    /**
     * Text WebSocket recognizer interface
     *
     * @class TextWSRecognizer
     * @extends AbstractWSRecognizer
     * @param {Function} callback The WebSocket response callback
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function TextWSRecognizer(callback, host) {
        scope.AbstractWSRecognizer.call(this);
        this.parameters = new scope.TextParameter();
        this.parameters.setLanguage('en_US');
        this.parameters.setInputMode('CURSIVE');
        this.setUrl(this.getProtocol() + 'cloud.myscript.com');
        if (host) {
            this.setUrl(this.getProtocol() + host);
        }
        this.setSSL(true);
        this.setCallback(callback);
    }

    /**
     * Inheritance property
     */
    TextWSRecognizer.prototype = new scope.AbstractWSRecognizer();

    /**
     * Constructor property
     */
    TextWSRecognizer.prototype.constructor = TextWSRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {TextParameter}
     */
    TextWSRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {TextParameter} parameters
     */
    TextWSRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    TextWSRecognizer.prototype.setUrl = function (url) {
        if (url !== undefined) {
            this._wsInterface.setUrl(url + '/api/v3.0/recognition/ws/text');
        }
    };

    TextWSRecognizer.prototype.setCallback = function (callback) {
        if (callback !== undefined) {
            this._wsInterface.setCallback(function (message) {
                switch (message.type) {
                    case 'open':
                        callback(message);
                        break;
                    case 'close':
                        callback(message);
                        break;
                    case 'error':
                        callback(undefined, message);
                        break;
                    default:
                        switch (message.data.type) {
                            case 'init':
                                message.data = new scope.InitResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            case 'reset':
                                message.data = new scope.ResetResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            case 'error':
                                message.data = new scope.ErrorResponseWSMessage(message.data);
                                callback(undefined, new Error(JSON.stringify(message.data.getError())));
                                break;
                            case 'hmacChallenge':
                                message.data = new scope.ChallengeResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            default:
                                message.data = new scope.TextResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                        }
                        break;
                }
            });
        }
    };

    /**
     * Start the WebSocket session
     *
     * @method startWSRecognition
     * @param {AbstractComponent[]|TextInputUnit[]} components
     * @param {TextParameter} [parameters]
     */
    TextWSRecognizer.prototype.startWSRecognition = function (components, parameters) {
        var message = new scope.TextStartRequestWSMessage();
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var inputUnits = [];
        if (components && components.length > 0) {
            if (components[0] instanceof scope.TextInputUnit) {
                inputUnits = components;
            } else {
                var unit = new scope.TextInputUnit();
                unit.setComponents(components);
                inputUnits.push(unit);
            }
        }
        message.setParameters(params);
        message.setInputUnits(inputUnits);
        this.sendMessage(message);
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {AbstractComponent[]|TextInputUnit[]} components
     * @param {String} instanceId
     */
    TextWSRecognizer.prototype.continueWSRecognition = function (components, instanceId) {
        var message = new scope.TextContinueRequestWSMessage();
        var inputUnits = [];
        if (components && components.length > 0) {
            if (components[0] instanceof scope.TextInputUnit) {
                inputUnits = components;
            } else {
                var unit = new scope.TextInputUnit();
                unit.setComponents(components);
                inputUnits.push(unit);
            }
        }
        message.setInputUnits(inputUnits);
        message.setInstanceId(instanceId);
        this.sendMessage(message);
    };

    // Export
    scope.TextWSRecognizer = TextWSRecognizer;
})(MyScript);



(function (scope) {
    /**
     * Shape recognizer interface
     *
     * @class ShapeRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function ShapeRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.ShapeParameter();
    }

    /**
     * Inheritance property
     */
    ShapeRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    ShapeRecognizer.prototype.constructor = ShapeRecognizer;

    /**
     * Do shape recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {ShapeParameter} [parameters]
     * @returns {Promise}
     */
    ShapeRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var input = new scope.ShapeRecognitionInput();
        input.setParameters(params);
        input.setComponents(components);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, input, applicationKey, hmacKey, instanceId); // super
    };

    /**
     * Clear shape recognition session
     *
     * @method clearShapeRecognitionSession
     * @param {String} applicationKey
     * @param {String} instanceId
     * @returns {Promise}
     */
    ShapeRecognizer.prototype.clearShapeRecognitionSession = function (applicationKey, instanceId) {
        return scope.AbstractRecognizer.prototype.clearRestRecognition.call(this, instanceId); // super
    };

    // Export
    scope.ShapeRecognizer = ShapeRecognizer;
})(MyScript);



(function (scope) {
    /**
     * Math recognizer interface
     *
     * @class MathRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MathRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.MathParameter();
    }

    /**
     * Inheritance property
     */
    MathRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    MathRecognizer.prototype.constructor = MathRecognizer;

    /**
     * Do math recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {MathParameter} [parameters]
     * @returns {Promise}
     */
    MathRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var input = new scope.MathRecognitionInput();
        input.setParameters(params);
        input.setComponents(components);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, input, applicationKey, hmacKey, instanceId); // super
    };

    // Export
    scope.MathRecognizer = MathRecognizer;
})(MyScript);



(function (scope) {
    /**
     * Math WebSocket recognizer interface
     *
     * @class MathWSRecognizer
     * @extends AbstractWSRecognizer
     * @param {Function} callback The WebSocket response callback
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MathWSRecognizer(callback, host) {
        scope.AbstractWSRecognizer.call(this);
        this.parameters = new scope.MathParameter();
        this.setUrl(this.getProtocol() + 'cloud.myscript.com');
        if (host) {
            this.setUrl(this.getProtocol() + host);
        }
        this.setSSL(true);
        this.setCallback(callback);
    }

    /**
     * Inheritance property
     */
    MathWSRecognizer.prototype = new scope.AbstractWSRecognizer();

    /**
     * Constructor property
     */
    MathWSRecognizer.prototype.constructor = MathWSRecognizer;

    /**
     * Get parameters
     *
     * @method getParameters
     * @returns {MathParameter}
     */
    MathWSRecognizer.prototype.getParameters = function () {
        return this.parameters;
    };

    /**
     * Set parameters
     *
     * @method setParameters
     * @param {MathParameter} parameters
     */
    MathWSRecognizer.prototype.setParameters = function (parameters) {
        this.parameters = parameters;
    };

    MathWSRecognizer.prototype.setUrl = function (url) {
        if (url !== undefined) {
            this._wsInterface.setUrl(url + '/api/v3.0/recognition/ws/math');
        }
    };

    MathWSRecognizer.prototype.setCallback = function (callback) {
        if (callback !== undefined) {
            this._wsInterface.setCallback(function (message) {
                switch (message.type) {
                    case 'open':
                        callback(message);
                        break;
                    case 'close':
                        callback(message);
                        break;
                    case 'error':
                        callback(undefined, message);
                        break;
                    default:
                        switch (message.data.type) {
                            case 'init':
                                message.data = new scope.InitResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            case 'reset':
                                message.data = new scope.ResetResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            case 'error':
                                message.data = new scope.ErrorResponseWSMessage(message.data);
                                callback(undefined, new Error(JSON.stringify(message.data.getError())));
                                break;
                            case 'hmacChallenge':
                                message.data = new scope.ChallengeResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                            default:
                                message.data = new scope.MathResponseWSMessage(message.data);
                                callback(message.data);
                                break;
                        }
                        break;
                }
            });
        }
    };

    /**
     * Start the WebSocket session
     *
     * @method startWSRecognition
     * @param {AbstractComponent[]} components
     * @param {MathParameter} [parameters]
     */
    MathWSRecognizer.prototype.startWSRecognition = function (components, parameters) {
        var message = new scope.MathStartRequestWSMessage();
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        message.setParameters(params);
        message.setComponents(components);
        this.sendMessage(message);
    };

    /**
     * Continue the recognition
     *
     * @method continueWSRecognition
     * @param {AbstractComponent[]} components
     * @param {String} instanceId
     */
    MathWSRecognizer.prototype.continueWSRecognition = function (components, instanceId) {
        var message = new scope.MathContinueRequestWSMessage();
        message.setComponents(components);
        message.setInstanceId(instanceId);
        this.sendMessage(message);
    };

    // Export
    scope.MathWSRecognizer = MathWSRecognizer;
})(MyScript);



(function (scope) {
    /**
     * Music recognizer interface
     *
     * @class MusicRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function MusicRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.MusicParameter();
    }

    /**
     * Inheritance property
     */
    MusicRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    MusicRecognizer.prototype.constructor = MusicRecognizer;

    /**
     * Do music recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {MusicParameter} [parameters]
     * @returns {Promise}
     */
    MusicRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var input = new scope.MusicRecognitionInput();
        input.setParameters(params);
        input.setComponents(components);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, input, applicationKey, hmacKey, instanceId); // super
    };

    // Export
    scope.MusicRecognizer = MusicRecognizer;
})(MyScript);



(function (scope) {
    /**
     * Analyzer recognizer interface
     *
     * @class AnalyzerRecognizer
     * @extends AbstractRecognizer
     * @param {String} [host='cloud.myscript.com'] Recognition service host
     * @constructor
     */
    function AnalyzerRecognizer(host) {
        scope.AbstractRecognizer.call(this, host);
        this.parameters = new scope.AnalyzerParameter();
    }

    /**
     * Inheritance property
     */
    AnalyzerRecognizer.prototype = new scope.AbstractRecognizer();

    /**
     * Constructor property
     */
    AnalyzerRecognizer.prototype.constructor = AnalyzerRecognizer;

    /**
     * Do analyzer recognition
     *
     * @method doSimpleRecognition
     * @param {String} applicationKey
     * @param {String} instanceId
     * @param {AbstractComponent[]} components
     * @param {String} hmacKey
     * @param {AnalyzerParameter} [parameters]
     * @returns {Promise}
     */
    AnalyzerRecognizer.prototype.doSimpleRecognition = function (applicationKey, instanceId, components, hmacKey, parameters) {
        var params = this.getParameters();
        if (parameters) {
            params = parameters;
        }
        var input = new scope.AnalyzerRecognitionInput();
        input.setParameters(params);
        input.setComponents(components);
        return scope.AbstractRecognizer.prototype.doRestRecognition.call(this, input, applicationKey, hmacKey, instanceId); // super
    };

    // Export
    scope.AnalyzerRecognizer = AnalyzerRecognizer;
})(MyScript);



(function (scope) {
    /**
     * Represent the Abstract Renderer. It's used to calculate the ink rendering in HTML5 canvas
     *
     * @class AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function AbstractRenderer(context) {
        this.penParameters = new scope.PenParameters();
        this.showBoundingBoxes = false;
        this.typeset = true;
        this.context = context;
    }

    /**
     * Get the context
     *
     * @returns {Object}
     */
    AbstractRenderer.prototype.getContext = function () {
        return this.context;
    };

    /**
     * This property is use to show or not show the bounding box
     *
     * @method getShowBoundingBoxes
     * @returns {Boolean}
     */
    AbstractRenderer.prototype.getShowBoundingBoxes = function () {
        return this.showBoundingBoxes;
    };

    /**
     * Set the show state of bounding box
     *
     * @method setShowBoundingBoxes
     * @param {Boolean} showBoundingBoxes
     */
    AbstractRenderer.prototype.setShowBoundingBoxes = function (showBoundingBoxes) {
        this.showBoundingBoxes = showBoundingBoxes;
    };

    /**
     * Get the default pen parameters
     *
     * @returns {PenParameters}
     */
    AbstractRenderer.prototype.getParameters = function () {
        return this.penParameters;
    };

    /**
     * Set the default pen parameters
     *
     * @param {PenParameters} penParameters
     */
    AbstractRenderer.prototype.setParameters = function (penParameters) {
        this.penParameters = penParameters;
    };

    /**
     * Is typesetting
     *
     * @returns {Boolean}
     */
    AbstractRenderer.prototype.isTypesetting = function () {
        return this.typeset;
    };

    /**
     * Enable / disable typesetting
     *
     * @param {Boolean} typeset
     */
    AbstractRenderer.prototype.setTypeset = function (typeset) {
        this.typeset = typeset;
    };

    /**
     * Clear the recognition context
     *
     * @method clear
     */
    AbstractRenderer.prototype.clear = function () {
        this.getContext().clearRect(0, 0, this.getContext().canvas.width, this.getContext().canvas.height);
    };

    /**
     * Draw recognition result on HTML5 canvas.
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {Object} recognitionResult
     */
    AbstractRenderer.prototype.drawRecognitionResult = function (components, recognitionResult) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw input components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    AbstractRenderer.prototype.drawComponents = function (components) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw component
     *
     * @method drawComponent
     * @param {AbstractComponent} component
     */
    AbstractRenderer.prototype.drawComponent = function (component) {
        if (component instanceof scope.StrokeComponent) {
            _drawStroke(component, this.getContext(), this.getParameters());
        } else if (component instanceof scope.CharacterInputComponent) {
            _drawCharacter(component, this.getContext(), this.getParameters());
        } else {
            throw new Error('Component not implemented: ' + component.getType());
        }
    };

    /**
     * Draw stroke component
     *
     * @private
     * @method _drawStroke
     * @param {StrokeComponent} stroke
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawStroke = function (stroke, context, parameters) { // jshint ignore:line
        if (stroke && stroke.getLength() > 0) {
            _renderStroke(stroke, context);
        }
    };

    /**
     * Draw character component
     *
     * @private
     * @method _drawCharacter
     * @param {CharacterInputComponent} character
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawCharacter = function (character, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw a rectangle on context
     *
     * @private
     * @method _drawRectangle
     * @param {Rectangle} rectangle
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawRectangle = function (rectangle, context, parameters) {
        context.save();
        try {
            context.fillStyle = parameters.getRectColor();
            context.strokeStyle = parameters.getColor();
            context.lineWidth = 0.5 * parameters.getWidth();
            context.fillRect(rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());
        } finally {
            context.restore();
        }
    };

    /*******************************************************************************************************************
     * Algorithm methods to compute rendering
     ******************************************************************************************************************/

    function _computeLinksPoints(point, angle, width) {
        var radius = point.p * width;
        return [{
            x: (point.x - Math.sin(angle) * radius),
            y: (point.y + Math.cos(angle) * radius)
        }, {
            x: (point.x + Math.sin(angle) * radius),
            y: (point.y - Math.cos(angle) * radius)
        }
        ];
    }

    function _computeMiddlePoint(point1, point2) {
        return {
            x: ((point2.x + point1.x) / 2),
            y: ((point2.y + point1.y) / 2),
            p: ((point2.p + point1.p) / 2)
        };
    }

    function _computeAxeAngle(begin, end) {
        return Math.atan2(end.y - begin.y, end.x - begin.x);
    }

    function _fill(context, color) {
        if (color !== undefined) {
            context.fillStyle = color;
            context.fill();
        }
    }

    /**
     *
     * @param stroke
     * @param context
     * @param parameters
     * @private
     */
    function _renderStroke(stroke, context) {
        context.beginPath();
        var length = stroke.getLength();
        var width = stroke.getWidth();
        var firstPoint = stroke.getPointByIndex(0);
        if (length < 3) {
            context.arc(firstPoint.x, firstPoint.y, width * 0.6, 0, Math.PI * 2, true);
        } else {
            context.arc(firstPoint.x, firstPoint.y, width * firstPoint.p, 0, Math.PI * 2, true);
            _renderLine(context, firstPoint, _computeMiddlePoint(firstPoint, stroke.getPointByIndex(1)), width);

            // Possibility to try this (the start looks better when the ink is large)
            //var first = _computeMiddlePoint(stroke[0], stroke[1]);
            //context.arc(first.x, first.y, width * first.p, 0, Math.PI * 2, true);

            var nbquadratics = length - 2;
            for (var i = 0; i < nbquadratics; i++) {
                _renderQuadratic(context, _computeMiddlePoint(stroke.getPointByIndex(i), stroke.getPointByIndex(i + 1)), _computeMiddlePoint(stroke.getPointByIndex(i + 1), stroke.getPointByIndex(i + 2)), stroke.getPointByIndex(i + 1), width);
            }
            _renderLine(context, _computeMiddlePoint(stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1)), stroke.getPointByIndex(length - 1), width);
            _renderFinal(context, stroke.getPointByIndex(length - 2), stroke.getPointByIndex(length - 1), width);
        }
        context.closePath();
        _fill(context, stroke.getColor());
    }

    function _renderFinal(context, begin, end, width) {
        var ARCSPLIT = 6;
        var angle = _computeAxeAngle(begin, end);
        var linkPoints = _computeLinksPoints(end, angle, width);
        context.moveTo(linkPoints[0].x, linkPoints[0].y);
        for (var i = 1; i <= ARCSPLIT; i++) {
            var newAngle = angle - i * Math.PI / ARCSPLIT;
            context.lineTo(end.x - end.p * width * Math.sin(newAngle), end.y + end.p * width * Math.cos(newAngle));
        }
    }

    function _renderLine(context, begin, end, width) {
        var linkPoints1 = _computeLinksPoints(begin, _computeAxeAngle(begin, end), width);
        var linkPoints2 = _computeLinksPoints(end, _computeAxeAngle(begin, end), width);

        context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
        context.lineTo(linkPoints2[0].x, linkPoints2[0].y);
        context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
        context.lineTo(linkPoints1[1].x, linkPoints1[1].y);
    }

    function _renderQuadratic(context, begin, end, ctrl, width) {
        var linkPoints1 = _computeLinksPoints(begin, _computeAxeAngle(begin, ctrl), width);
        var linkPoints2 = _computeLinksPoints(end, _computeAxeAngle(ctrl, end), width);
        var linkPoints3 = _computeLinksPoints(ctrl, _computeAxeAngle(begin, end), width);

        context.moveTo(linkPoints1[0].x, linkPoints1[0].y);
        context.quadraticCurveTo(linkPoints3[0].x, linkPoints3[0].y, linkPoints2[0].x, linkPoints2[0].y);
        context.lineTo(linkPoints2[1].x, linkPoints2[1].y);
        context.quadraticCurveTo(linkPoints3[1].x, linkPoints3[1].y, linkPoints1[1].x, linkPoints1[1].y);
    }

    // Export
    scope.AbstractRenderer = AbstractRenderer;
})(MyScript);



(function (scope) {
    /**
     * Represent the Text Renderer. It's used to calculate the text ink rendering in HTML5 canvas
     *
     * @class TextRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function TextRenderer(context) {
        scope.AbstractRenderer.call(this, context);
    }

    /**
     * Inheritance property
     */
    TextRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    TextRenderer.prototype.constructor = TextRenderer;

    /**
     * Draw text recognition result on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {TextDocument} recognitionResult
     */
    TextRenderer.prototype.drawRecognitionResult = function (components, recognitionResult) {
        this.clear();
        if (recognitionResult) {
            this.drawComponents(components);
        } else {
            this.drawComponents(components);
        }
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    TextRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.TextInputUnit) {
                this.drawComponents(component.getComponents());
            } else if (component instanceof scope.AbstractTextInputComponent) {
                _drawTextComponent(component, this.getContext(), this.getParameters());
            } else if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw text component
     *
     * @private
     * @method _drawTextComponent
     * @param {AbstractTextInputComponent} component
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawTextComponent = function (component, context, parameters) {
        if (component instanceof scope.CharInputComponent) {
            _drawChar(component, context, parameters);
        } else if (component instanceof scope.StringInputComponent) {
            _drawString(component, context, parameters);
        } else {
            throw new Error('Component not implemented: ' + component.getType());
        }
    };

    /**
     * Draw char
     *
     * @private
     * @method _drawChar
     * @param {CharInputComponent} char
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawChar = function (char, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw string
     *
     * @private
     * @method _drawString
     * @param {StringInputComponent} string
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawString = function (string, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    // Export
    scope.TextRenderer = TextRenderer;
})(MyScript);



(function (scope) {
    /**
     * Represent the Shape Renderer. It's used to calculate the shape ink rendering in HTML5 canvas
     *
     * @class ShapeRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function ShapeRenderer(context) {
        scope.AbstractRenderer.call(this, context);
    }

    /**
     * Inheritance property
     */
    ShapeRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    ShapeRenderer.prototype.constructor = ShapeRenderer;

    /**
     * Draw shape recognition result on HTML5 canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {ShapeDocument} document
     */
    ShapeRenderer.prototype.drawRecognitionResult = function (components, document) {
        this.clear();
        if (document && (document instanceof scope.ShapeDocument)) {
            this.drawShapes(components, document.getSegments());
            var lastComponents = [];
            var processedComponents = _extractComponents(components, document.getInkRanges());

            for (var i in components) {
                var component = components[i];
                if (processedComponents.indexOf(component) !== -1) {
                    lastComponents.push(component);
                }
            }
            this.drawComponents(lastComponents);
        } else {
            this.drawComponents(components);
        }
        return {components : components, document : document}
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    ShapeRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractShapePrimitive) {
                _drawShapePrimitive(component, this.getContext(), this.getParameters());
            } else if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw the shapes
     *
     * @method drawShapes
     * @param {AbstractComponent[]} components
     * @param {ShapeSegment[]} shapes
     */
    ShapeRenderer.prototype.drawShapes = function (components, shapes) {
        for (var i in shapes) {
            this.drawShapeSegment(components, shapes[i]);
        }
    };

    /**
     * Draw shape segment
     *
     * @method drawShapeSegment
     * @param {AbstractComponent[]} components
     * @param {ShapeSegment} segment
     */
    ShapeRenderer.prototype.drawShapeSegment = function (components, segment) {
        var candidate = segment.getSelectedCandidate();
        if (candidate instanceof scope.ShapeRecognized) {
            _drawShapeRecognized(candidate, this.getContext(), this.getParameters());
        } else if (candidate instanceof scope.ShapeNotRecognized) {
            this.drawComponents(_extractComponents(components, segment.getInkRanges()));
        } else {
            throw new Error('not implemented');
        }
    };

    /**
     * This method allow you to draw not recognized shape
     *
     * @method drawShapeNotRecognized
     * @param {AbstractComponent[]} components
     * @param {ShapeInkRange[]} inkRanges
     */
    ShapeRenderer.prototype.drawShapeNotRecognized = function (components, inkRanges) {
        this.drawComponents(_extractComponents(components, inkRanges));
    };

    /**
     * Draw shape primitive
     *
     * @method drawShapePrimitive
     * @param {AbstractShapePrimitive} primitive
     */
    ShapeRenderer.prototype.drawShapePrimitive = function (primitive) {
        _drawShapePrimitive(primitive, this.getContext(), this.getParameters());
    };

    /**
     * This method allow you to draw recognized shape
     *
     * @private
     * @method _drawShapeRecognized
     * @param {ShapeRecognized} shapeRecognized
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawShapeRecognized = function (shapeRecognized, context, parameters) {
        for (var i in shapeRecognized.getPrimitives()) {
            _drawShapePrimitive(shapeRecognized.getPrimitives()[i], context, parameters);
        }
    };

    /**
     * Draw shape primitive
     *
     * @private
     * @method _drawShapePrimitive
     * @param {AbstractShapePrimitive} primitive
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawShapePrimitive = function (primitive, context, parameters) {
        if (primitive instanceof scope.ShapeEllipse) {
            _drawShapeEllipse(primitive, context, parameters);
        } else if (primitive instanceof scope.ShapeLine) {
            _drawShapeLine(primitive, context, parameters);
        } else {
            throw new Error('Primitive not implemented: ' + primitive.getType());
        }
    };

    /**
     * Draw shape line
     *
     * @private
     * @method _drawShapeLine
     * @param {ShapeLine} shapeLine
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawShapeLine = function (shapeLine, context, parameters) {
        _drawLine(shapeLine.getFirstPoint(), shapeLine.getLastPoint(), context, parameters);
        if (shapeLine.hasBeginDecoration() && shapeLine.getBeginDecoration() === 'ARROW_HEAD') {
            _drawArrowHead(shapeLine.getFirstPoint(), shapeLine.getBeginTangentAngle(), 12.0, context, parameters);
        }
        if (shapeLine.hasEndDecoration() && shapeLine.getEndDecoration() === 'ARROW_HEAD') {
            _drawArrowHead(shapeLine.getLastPoint(), shapeLine.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Draw shape ellipse
     *
     * @private
     * @method _drawShapeEllipse
     * @param {ShapeEllipse} shapeEllipse
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawShapeEllipse = function (shapeEllipse, context, parameters) {
        var points = _drawEllipseArc(
            shapeEllipse.getCenter(),
            shapeEllipse.getMaxRadius(),
            shapeEllipse.getMinRadius(),
            shapeEllipse.getOrientation(),
            shapeEllipse.getStartAngle(),
            shapeEllipse.getSweepAngle(),
            context, parameters);

        if (shapeEllipse.hasBeginDecoration() && shapeEllipse.getBeginDecoration() === 'ARROW_HEAD') {
            _drawArrowHead(points[0], shapeEllipse.getBeginTangentAngle(), 12.0, context, parameters);
        }
        if (shapeEllipse.hasEndDecoration() && shapeEllipse.getEndDecoration() === 'ARROW_HEAD') {
            _drawArrowHead(points[1], shapeEllipse.getEndTangentAngle(), 12.0, context, parameters);
        }
    };

    /**
     * Draw an ellipse arc on context
     *
     * @private
     * @method _drawEllipseArc
     * @param {Point} centerPoint
     * @param {Number} maxRadius
     * @param {Number} minRadius
     * @param {String} orientation
     * @param {Number} startAngle
     * @param {Number} sweepAngle
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     * @returns {Point[]}
     */
    var _drawEllipseArc = function (centerPoint, maxRadius, minRadius, orientation, startAngle, sweepAngle, context, parameters) {

        var angleStep = 0.02; // angle delta between interpolated

        var z1 = Math.cos(orientation);
        var z3 = Math.sin(orientation);
        var z2 = z1;
        var z4 = z3;
        z1 *= maxRadius;
        z2 *= minRadius;
        z3 *= maxRadius;
        z4 *= minRadius;

        var n = Math.floor(Math.abs(sweepAngle) / angleStep);

        var boundariesPoints = [];

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();

            for (var i = 0; i <= n; i++) {

                var angle = startAngle + (i / n) * sweepAngle; // points on the arc, in radian
                var alpha = Math.atan2(Math.sin(angle) / minRadius, Math.cos(angle) / maxRadius);

                var cosAlpha = Math.cos(alpha);
                var sinAlpha = Math.sin(alpha);

                // current point
                var x = centerPoint.x + z1 * cosAlpha - z4 * sinAlpha;
                var y = centerPoint.y + z2 * sinAlpha + z3 * cosAlpha;
                if (i === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }

                if (i === 0 || i === n) {
                    boundariesPoints.push(new scope.Point({x: x, y: y}));
                }
            }

            context.stroke();

        } finally {
            context.restore();
        }

        return boundariesPoints;
    };

    /**
     * Draw a line on context
     *
     * @private
     * @method _drawLine
     * @param {Point} p1
     * @param {Point} p2
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawLine = function (p1, p2, context, parameters) {
        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            context.moveTo(p1.getX(), p1.getY());
            context.lineTo(p2.getX(), p2.getY());
            context.stroke();
        } finally {
            context.restore();
        }
    };

    /**
     * Clamp an angle into the range [-PI, +PI]
     *
     * @private
     * @method _phi
     * @param {Number} angle
     * @returns {Number}
     */
    var _phi = function (angle) {
        angle = ((angle + Math.PI) % (Math.PI * 2)) - Math.PI;
        if (angle < -Math.PI) {
            angle += Math.PI * 2;
        }
        return angle;
    };

    /**
     * Draw an arrow head on context
     *
     * @private
     * @method _drawArrowHead
     * @param {Point} headPoint
     * @param {Number} angle
     * @param {Number} length
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters
     */
    var _drawArrowHead = function (headPoint, angle, length, context, parameters) {
        var alpha = _phi(angle + Math.PI - (Math.PI / 8)),
            beta = _phi(angle - Math.PI + (Math.PI / 8));

        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.moveTo(headPoint.getX(), headPoint.getY());
            context.beginPath();
            context.lineTo(headPoint.getX() + (length * Math.cos(alpha)), headPoint.getY() + (length * Math.sin(alpha)));
            context.lineTo(headPoint.getX() + (length * Math.cos(beta)), headPoint.getY() + (length * Math.sin(beta)));
            context.lineTo(headPoint.getX(), headPoint.getY());
            context.fill();

        } finally {
            context.restore();
        }

    };

    /**
     * Return components from ink ranges
     *
     * @private
     * @param components
     * @param inkRanges
     * @returns {AbstractComponent[]}
     */
    var _extractComponents = function (components, inkRanges) {
        var result = [];

        for (var i in inkRanges) {
            var inkRange = inkRanges[i];

            var firstPointIndex = Math.floor(inkRange.getFirstPoint());
            var lastPointIndex = Math.ceil(inkRange.getLastPoint());

            for (var strokeIndex = inkRange.getFirstStroke(); strokeIndex <= inkRange.getLastStroke(); strokeIndex++) {
                var currentStroke = components[strokeIndex];
                var currentStrokePointCount = currentStroke.getX().length;

                var newStroke = new scope.StrokeComponent();
                newStroke.setColor(currentStroke.getColor());
                newStroke.setWidth(currentStroke.getWidth());

                for (var pointIndex = firstPointIndex; (strokeIndex === inkRange.getLastStroke() && pointIndex <= lastPointIndex && pointIndex < currentStrokePointCount) || (strokeIndex !== inkRange.getLastStroke() && pointIndex < currentStrokePointCount); pointIndex++) {
                    newStroke.addPoint(currentStroke.getX()[pointIndex], currentStroke.getY()[pointIndex], currentStroke.getT()[pointIndex]);
                }
                result.push(newStroke);
            }
        }
        return result;

    };

    // Export
    scope.ShapeRenderer = ShapeRenderer;
})(MyScript);



(function (scope) {
    /**
     * Represent the Math Renderer. It's used to calculate the math ink rendering in HTML5 canvas
     *
     * @class MathRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function MathRenderer(context) {
        scope.AbstractRenderer.call(this, context);
    }

    /**
     * Inheritance property
     */
    MathRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    MathRenderer.prototype.constructor = MathRenderer;

    /**
     * Draw math recognition result on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {MathDocument} recognitionResult
     */
    MathRenderer.prototype.drawRecognitionResult = function (components, recognitionResult) {
        this.clear();
        if (recognitionResult) {
            var notScratchOutComponents = _filterScratchOut(components, recognitionResult.getScratchOutResults());
            this.drawComponents(notScratchOutComponents);
        } else {
            this.drawComponents(components);
        }
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    MathRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractComponent) {
                if(!component.scratchedStroke){
                    scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
                }
            } else {
                throw new Error('not implemented');
            }
        }
    };


    /**
     * Return non-scratched out components
     *
     * @private
     * @param components
     * @param scratchOutResults
     * @returns {*}
     */
    var _filterScratchOut = function (components, scratchOutResults) {
        if (!scratchOutResults || scratchOutResults.length === 0) {
            return components;
        }
        for (var k in scratchOutResults) {
            for (var n in scratchOutResults[k].getErasedInkRanges()) {
                components[scratchOutResults[k].getErasedInkRanges()[n].getComponent()].scratchedStroke = true;
            }
            for (var p in scratchOutResults[k].getInkRanges()) {
                components[scratchOutResults[k].getInkRanges()[p].getComponent()].scratchedStroke = true;;
            }
        }
        return components;
    };

    // Export
    scope.MathRenderer = MathRenderer;
})(MyScript);



(function (scope) {
    /**
     * Represent the Music Renderer. It's used to calculate the music ink rendering in HTML5 canvas
     *
     * @class MusicRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function MusicRenderer(context) {
        scope.AbstractRenderer.call(this, context);
    }

    /**
     * Inheritance property
     */
    MusicRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    MusicRenderer.prototype.constructor = MusicRenderer;

    /**
     * Draw music recognition result on HTML5 canvas. Scratch out results are use to redraw HTML5 Canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {MusicDocument} recognitionResult
     */
    MusicRenderer.prototype.drawRecognitionResult = function (components, recognitionResult) {
        this.clear();
        if (recognitionResult) {
            var notScratchOutComponents = _removeMusicScratchOut(components, recognitionResult.getScratchOutResults());
            this.drawComponents(notScratchOutComponents);
        } else {
            this.drawComponents(components);
        }
    };

    /**
     * Draw staff on the HTML5 canvas
     *
     * @method drawStaff
     * @param {MusicStaff} staff
     */
    MusicRenderer.prototype.drawStaff = function (staff) {
        _drawStaff(staff, this.getContext(), this.getParameters());
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    MusicRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractMusicInputComponent) {
                _drawMusicNode(component, this.getContext(), this.getParameters());
            } else if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw staff on the HTML5 canvas
     *
     * @private
     * @method _drawStaff
     * @param {MusicStaff} staff
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawStaff = function (staff, context, parameters) {
        var staffHeight = staff.getTop() + ((staff.getCount() - 1) * staff.getGap());
//            var staves = Math.floor(context.canvas.clientHeight / staff.height);
        var staves = 1;

        context.beginPath();

        // Drawing horizontal staff lines
        for (var i = 0; i < staves; i++) {
            var offset = staffHeight * i;
            for (var j = 0; j < staff.getCount(); j++) {
                context.moveTo(0, (staff.getTop() + offset) + j * staff.getGap());
                context.lineTo(context.canvas.clientWidth, (staff.getTop() + offset) + j * staff.getGap());
            }
        }

        context.stroke();
    };

    /**
     * Draw music node
     *
     * @private
     * @method _drawMusicNode
     * @param {AbstractMusicInputComponent} component
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawMusicNode = function (component, context, parameters) {
        if (component instanceof scope.MusicAccidentalInputComponent) {
            _drawAccidental(component, context, parameters);
        } else if (component instanceof scope.MusicArpeggiateInputComponent) {
            _drawArpeggiate(component, context, parameters);
        } else if (component instanceof scope.MusicBarInputComponent) {
            _drawBar(component, context, parameters);
        } else if (component instanceof scope.MusicBeamInputComponent) {
            _drawBeam(component, context, parameters);
        } else if (component instanceof scope.MusicClefInputComponent) {
            _drawClef(component, context, parameters);
        } else if (component instanceof scope.MusicDecorationInputComponent) {
            _drawDecoration(component, context, parameters);
        } else if (component instanceof scope.MusicDotsInputComponent) {
            _drawDots(component, context, parameters);
        } else if (component instanceof scope.MusicHeadInputComponent) {
            _drawHead(component, context, parameters);
        } else if (component instanceof scope.MusicLedgerLineInputComponent) {
            _drawLedgerLine(component, context, parameters);
        } else if (component instanceof scope.MusicRestInputComponent) {
            _drawRest(component, context, parameters);
        } else if (component instanceof scope.MusicStemInputComponent) {
            _drawStem(component, context, parameters);
        } else if (component instanceof scope.MusicTieOrSlurInputComponent) {
            _drawTieOrSlur(component, context, parameters);
        } else if (component instanceof scope.MusicTimeSignatureInputComponent) {
            _drawTimeSignature(component, context, parameters);
        } else {
            throw new Error('Node not implemented: ' + component.getType());
        }
    };

    /**
     * Draw accidental
     *
     * @private
     * @method _drawAccidental
     * @param {MusicAccidentalInputComponent} accidental
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawAccidental = function (accidental, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw arpeggiate
     *
     * @private
     * @method _drawArpeggiate
     * @param {MusicArpeggiateInputComponent} arpeggiate
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawArpeggiate = function (arpeggiate, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw bar
     *
     * @private
     * @method _drawBar
     * @param {MusicBarInputComponent} bar
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawBar = function (bar, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw beam
     *
     * @private
     * @method _drawBeam
     * @param {MusicBeamInputComponent} beam
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawBeam = function (beam, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw clef
     *
     * @private
     * @method _drawClef
     * @param {MusicClefInputComponent} clef
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawClef = function (clef, context, parameters) { // jshint ignore:line
        var src = 'data:image/svg+xml;base64,';
        switch (clef.getValue().getSymbol()) {
            case 'F':
                src = src +  btoa('<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" x="0" y="0" width="18" height="20"><defs/><g transform="translate(6.600000e-3,3.125356e-3)"><g><path d="M17.3 3.1 C17.3 3.5 17.1 3.8 16.8 4.1 C16.5 4.4 15.9 4.5 15.5 4.3 C15 4.1 14.7 3.7 14.7 3.2 C14.6 2.8 14.8 2.5 15 2.2 C15.3 1.9 15.7 1.8 16 1.8 C16.4 1.8 16.8 2 17 2.3 C17.2 2.5 17.3 2.8 17.3 3.1 z"/></g><g><path d="M17.3 8.9 C17.3 9.3 17.1 9.7 16.8 9.9 C16.5 10.3 15.9 10.3 15.5 10.2 C15 10 14.7 9.5 14.7 9.1 C14.6 8.7 14.8 8.3 15 8 C15.3 7.8 15.7 7.6 16 7.6 C16.5 7.7 17 8 17.2 8.4 C17.2 8.6 17.3 8.8 17.3 8.9 z"/></g><g><path d="M13 7.2 C13 10 11.8 12.7 9.8 14.7 C7.3 17.2 4 18.8 0.7 19.8 C0.3 20.1 -0.4 19.8 0.3 19.4 C1.6 18.8 3 18.3 4.2 17.5 C7 15.8 9.3 13.1 9.8 9.9 C10.1 8 10.1 5.9 9.6 4 C9.2 2.6 8.2 1.1 6.7 0.9 C5.3 0.7 3.7 1.2 2.7 2.2 C2.5 2.4 2 3.2 2 4 C2.6 3.6 2.6 3.6 3.1 3.4 C4.2 2.9 5.7 3.6 6 4.9 C6.3 6 6.1 7.5 5 8.1 C3.8 8.7 2 8.5 1.4 7.2 C0.3 5.3 0.9 2.6 2.6 1.2 C4.4 -0.3 7.1 -0.3 9.2 0.4 C11.4 1.3 12.7 3.5 12.9 5.8 C13 6.2 13 6.7 13 7.2 z"/></g></g></svg>');
                break;
            case 'C':
                src = src +  btoa('<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="18" height="25"><defs/><g><g transform="matrix(1,0,0,1.030698,-309.364,-543.8647)"><path d="M 325.9 546.8 C 325.8 548.7 324.7 550.7 322.8 551.5 C 321.1 552.1 319.1 552.2 317.6 551 C 316.6 550.2 316.2 548.4 317.3 547.5 C 318.3 546.5 320.4 547.4 320.3 548.9 C 320.7 549.9 318.5 550.5 319.7 551.3 C 321 551.6 322.3 550.5 322.6 549.3 C 323.1 547.5 323.1 545.6 322.7 543.8 C 322.4 542.9 321.9 541.5 320.7 541.9 C 319.2 542.2 318.3 543.8 317.9 545.1 C 317.6 543.2 316.4 541.5 315 540.2 C 315 544.1 315 548 315 551.9 L 314.1 551.9 C 314.1 543.9 314.1 535.7 314.1 527.7 L 315 527.7 C 315 531.5 315 535.5 315 539.4 C 316.4 538.1 317.6 536.4 317.8 534.5 C 318.3 535.9 319.3 537.5 321 537.8 C 322.2 537.8 322.5 536.3 322.8 535.4 C 323.1 533.7 323.1 531.8 322.6 530.1 C 322.2 529 320.9 528 319.6 528.3 C 318.6 529 320.6 529.6 320.3 530.6 C 320.5 532 318.8 533 317.6 532.3 C 316.3 531.6 316.4 529.7 317.4 528.8 C 318 528.1 319.3 527.7 320.3 527.7 C 321.2 527.7 321.8 527.7 322.6 528 C 324.6 528.7 325.7 530.7 325.9 532.7 C 326.2 534.9 324.9 537.3 322.8 538.2 C 321.5 538.7 319.9 538.3 318.8 537.3 C 318.7 538.3 318.2 539.2 317.7 539.9 C 318.1 540.6 318.6 541.8 318.8 542.1 C 320.1 540.9 322.5 540.8 323.8 542 C 325.2 543.1 326.1 545 325.9 546.8 z "/></g><g transform="matrix(1,0,0,1.030928,-309.364,-543.9805)"><path d="M 312.2 551.9 L 309.4 551.9 L 309.4 527.7 L 312.2 527.7 L 312.2 551.9 z "/></g></g></svg>');
                break;
            case 'G':
                src = src +  btoa('<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.0" width="15" height="40"><defs/><path d="m 12 3.4 c 0.3 3.1 -2 5.6 -4.1 7.6 -0.9 0.9 -0.2 0.1 -0.6 0.6 -0.1 -0.5 -0.3 -1.7 -0.3 -2.1 0.1 -2.6 2.3 -6.5 4.2 -7.9 0.3 0.6 0.6 0.6 0.8 1.8 z m 0.7 15.9 c -1.2 -0.9 -2.8 -1.1 -4.3 -0.9 -0.2 -1.2 -0.4 -2.5 -0.6 -3.7 2.4 -2.3 4.9 -4.9 5 -8.4 0.1 -2.2 -0.3 -4.6 -1.7 -6.4 C 9.5 0.1 8.3 2.1 7.4 3.3 c -1.5 2.6 -1.1 5.8 -0.6 8.6 -0.8 0.9 -1.9 1.7 -2.7 2.7 -2.4 2.3 -4.4 5.3 -4 8.7 0.2 3.3 2.6 6.3 5.9 7.1 1.2 0.3 2.6 0.3 3.8 0.1 0.2 2.2 1 4.5 0.1 6.7 -0.7 1.6 -2.8 2.9 -4.3 2.2 -0.6 -0.3 -0.1 -0.1 -0.5 -0.2 1.1 -0.3 2 -1 2.3 -1.5 0.8 -1.4 -0.4 -3.6 -2.2 -3.3 -2.3 0 -3.2 3.1 -1.7 4.6 1.3 1.5 3.8 1.3 5.4 0.3 1.8 -1.2 2 -3.5 1.8 -5.5 -0.1 -0.7 -0.4 -2.6 -0.4 -3.3 0.7 -0.2 0.2 -0.1 1.2 -0.4 2.7 -1 4.4 -4.2 3.6 -7 -0.3 -1.4 -1 -2.9 -2.3 -3.7 z m 0.6 5.7 c 0.2 2 -1.1 4.2 -3.1 4.9 -0.1 -0.8 -0.2 -1 -0.3 -1.4 -0.5 -2.4 -0.7 -4.9 -1.1 -7.3 1.6 -0.2 3.5 0.5 4 2.1 0.2 0.6 0.3 1.2 0.4 1.8 z m -5.1 5.1 c -2.5 0.1 -5 -1.6 -5.6 -4 -0.7 -2.1 -0.5 -4.5 0.8 -6.4 1.1 -1.7 2.6 -3 4 -4.5 0.2 1.1 0.4 2.2 0.5 3.3 -3 0.8 -5 4.6 -3.2 7.3 0.5 0.8 2 2.2 2.8 1.6 -1.1 -0.7 -2 -1.8 -1.8 -3.2 -0.1 -1.3 1.4 -2.9 2.7 -3.1 0.4 2.8 0.9 6 1.4 8.8 -0.5 0.1 -1 0.1 -1.5 0.1 z"/></svg>');
                break;
            default:
                throw new Error('Unknown music clef symbol');
        }

        var imageObj = new Image();
        imageObj.onload = function () {
            var ratio = clef.getBoundingBox().getHeight() / this.height;
            clef.getBoundingBox().setWidth(this.width * ratio);
            context.drawImage(imageObj, clef.getBoundingBox().getX(), clef.getBoundingBox().getY(), clef.getBoundingBox().getWidth(), clef.getBoundingBox().getHeight());
        };
        imageObj.src = src;
    };

    /**
     * Draw decoration
     *
     * @private
     * @method _drawDecoration
     * @param {MusicDecorationInputComponent} decoration
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawDecoration = function (decoration, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw dots
     *
     * @private
     * @method _drawDots
     * @param {MusicDotsInputComponent} dots
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawDots = function (dots, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw head
     *
     * @private
     * @method _drawHead
     * @param {MusicHeadInputComponent} head
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawHead = function (head, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw ledgerLine
     *
     * @private
     * @method _drawLedgerLine
     * @param {MusicLedgerLineInputComponent} ledgerLine
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawLedgerLine = function (ledgerLine, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw rest
     *
     * @private
     * @method _drawRest
     * @param {MusicRestInputComponent} rest
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawRest = function (rest, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw stem
     *
     * @private
     * @method _drawStem
     * @param {MusicStemInputComponent} stem
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawStem = function (stem, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw tieOrSlur
     *
     * @private
     * @method _drawTieOrSlur
     * @param {MusicTieOrSlurInputComponent} tieOrSlur
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawTieOrSlur = function (tieOrSlur, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Draw timeSignature
     *
     * @private
     * @method _drawTimeSignature
     * @param {MusicTimeSignatureInputComponent} timeSignature
     * @param {Object} context The canvas 2d context
     * @param {PenParameters} parameters Rendering parameters
     */
    var _drawTimeSignature = function (timeSignature, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };

    /**
     * Return non-scratched out components
     *
     * @private
     * @param components
     * @param scratchOutResults
     * @returns {*}
     */
    var _removeMusicScratchOut = function (components, scratchOutResults) {
        if (!scratchOutResults || scratchOutResults.length === 0) {
            return components;
        }

        var cloneComponents = components.slice(0);
        var componentsToRemove = [];

        for (var k in scratchOutResults) {
            if (scratchOutResults[k].getErasedInputRanges()) {
                for (var n in scratchOutResults[k].getErasedInputRanges()) {
                    componentsToRemove.push(scratchOutResults[k].getErasedInputRanges()[n].getComponent());
                }
                for (var p in scratchOutResults[k].getInputRanges()) {
                    componentsToRemove.push(scratchOutResults[k].getInputRanges()[p].getComponent());
                }
            }
        }

        componentsToRemove.sort(function (a, b) {
            return b - a;
        });

        for (var z in componentsToRemove) {
            cloneComponents.splice(componentsToRemove[z], 1);
        }
        return cloneComponents;
    };

    // Export
    scope.MusicRenderer = MusicRenderer;
})(MyScript);



(function (scope) {
    /**
     * Represent the Analyzer Renderer. It's used to calculate the analyzer ink rendering in HTML5 canvas
     *
     * @class AnalyzerRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function AnalyzerRenderer(context) {
        scope.AbstractRenderer.call(this, context);
        this.shapeRenderer = new scope.ShapeRenderer(context);
    }

    /**
     * Inheritance property
     */
    AnalyzerRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    AnalyzerRenderer.prototype.constructor = AnalyzerRenderer;

    /**
     * Get shape renderer
     *
     * @method getShapeRenderer
     * @returns {ShapeRenderer}
     */
    AnalyzerRenderer.prototype.getShapeRenderer = function () {
        return this.shapeRenderer;
    };

    /**
     * Set shape renderer
     *
     * @method setShapeRenderer
     * @param {ShapeRenderer} shapeRenderer
     */
    AnalyzerRenderer.prototype.setShapeRenderer = function (shapeRenderer) {
        this.shapeRenderer = shapeRenderer;
    };

    /**
     * Draw shape recognition result on HTML5 canvas
     *
     * @method drawRecognitionResult
     * @param {AbstractComponent[]} components
     * @param {AnalyzerDocument} recognitionResult
     */
    AnalyzerRenderer.prototype.drawRecognitionResult = function (components, recognitionResult) {
        this.clear();
        if (recognitionResult) {
            this.shapeRenderer.drawShapes(components, recognitionResult.getShapes());
            _drawTables(components, recognitionResult.getTables(), this.getContext(), this.getParameters());
            _drawTextLines(components, recognitionResult.getTextLines(), this.getContext(), this.getParameters());
            //_drawGroups(components, recognitionResult.getGroups(), this.getContext(), this.getParameters()); // TODO: not implemented
        } else {
            this.drawComponents(components);
        }
    };

    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    AnalyzerRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractShapePrimitive) {
                this.shapeRenderer.drawShapePrimitive(component);
            } else if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
            } else {
                throw new Error('not implemented');
            }
        }
    };

    /**
     * Draw table
     *
     * @private
     * @method _drawTables
     * @param {AbstractComponent[]} components
     * @param {AnalyzerTable[]} tables
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawTables = function (components, tables, context, parameters) {
        for (var i in tables) {
            for (var k in tables[i].getLines()) {
                var data = tables[i].getLines()[k].getData();
                _drawLine(data.getP1(), data.getP2(), context, parameters);
            }
        }
    };

    /**
     * Draw the text line
     *
     * @private
     * @method _drawTextLines
     * @param {AbstractComponent[]} components
     * @param {AnalyzerTextLine[]} textLines
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawTextLines = function (components, textLines, context, parameters) {
        for (var i in textLines) {
            var textLine = textLines[i];
            var data = textLine.getData();
            if (data) {
                var text = textLine.getTextDocument().getTextSegment().getSelectedCandidate().getLabel();
                _drawText(data.getBoundingBox(), text, data.getJustificationType(), data.getTextHeight(), data.getBaselinePos(), context, parameters);

                var underlines = textLine.getUnderlineList();
                for (var j in underlines) {
                    _drawUnderline(data.getBoundingBox(), underlines[j], text, data.getTextHeight(), data.getBaselinePos() + data.getTextHeight() / 10, context, parameters);
                }
            }
        }
    };

    /**
     * Draw text on analyser
     *
     * @private
     * @method _drawText
     * @param {Rectangle} boundingBox
     * @param {String} text
     * @param {String} justificationType
     * @param {Number} textHeight
     * @param {Number} baseline
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawText = function (boundingBox, text, justificationType, textHeight, baseline, context, parameters) {
        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.lineWidth = 0.5 * parameters.getWidth();
            context.font = parameters.getDecoration() + ' ' + textHeight + 'px' + ' ' + parameters.getFont();
            context.textAlign = (justificationType === 'CENTER') ? 'center' : 'left';

            context.fillText(text, boundingBox.getX(), baseline);

        } finally {
            context.restore();
        }
    };

    /**
     * Draw Groups
     *
     * @private
     * @method _drawGroups
     * @param {AbstractComponent[]} components
     * @param {AnalyzerGroup[]} groups
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawGroups = function (components, groups, context, parameters) { // jshint ignore:line
        throw new Error('not implemented');
    };


    /**
     * Draw Underline
     *
     * @private
     * @method _drawUnderline
     * @param {Rectangle} boundingBox
     * @param {AnalyzerUnderline} underline
     * @param {String} text
     * @param {Number} textHeight
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawUnderline = function (boundingBox, underline, text, textHeight, baseline, context, parameters) {
        var topLeft = boundingBox.getTopLeftPoint();
        var firstCharacter = underline.getData().getFirstCharacter();
        var lastCharacter = underline.getData().getLastCharacter();

        context.font = parameters.getDecoration() + ' ' + textHeight + 'px' + ' ' + parameters.getFont();

        var textMetrics = context.measureText(text.substring(0, firstCharacter));
        var x1 = topLeft.x + textMetrics.width;

        textMetrics = context.measureText(text.substring(firstCharacter, lastCharacter + 1));
        var x2 = x1 + textMetrics.width;
        _drawLine(new scope.Point({x: x1, y: baseline}), new scope.Point({x: x2, y: baseline}), context, parameters);
    };

    /**
     * Draw a cell
     *
     * @private
     * @method _drawCell
     * @param {AnalyzerCell} cell
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawCell = function (cell, context, parameters) {
        if (cell.getData()) {
            var rectangle = cell.getData().getBoundingBox();
            context.save();
            try {
                context.fillStyle = parameters.getRectColor();
                context.strokeStyle = parameters.getColor();
                context.lineWidth = 0.5 * parameters.getWidth();
                context.fillRect(rectangle.getX(), rectangle.getY(), rectangle.getWidth(), rectangle.getHeight());
            } finally {
                context.restore();
            }
        }
    };

    /**
     * Draw a line on context
     *
     * @private
     * @method _drawLine
     * @param {Point} p1
     * @param {Point} p2
     * @param {Object} context
     * @param {PenParameters} parameters
     */
    var _drawLine = function (p1, p2, context, parameters) {
        context.save();
        try {
            context.fillStyle = parameters.getColor();
            context.strokeStyle = parameters.getColor();
            context.lineWidth = 0.5 * parameters.getWidth();

            context.beginPath();
            context.moveTo(p1.getX(), p1.getY());
            context.lineTo(p2.getX(), p2.getY());
            context.stroke();
        } finally {
            context.restore();
        }
    };

    // Export
    scope.AnalyzerRenderer = AnalyzerRenderer;
})(MyScript);



(function (scope) {
    /**
     * Represent the Image Renderer. It's used to calculate the Image ink rendering in HTML5 canvas
     *
     * @class ImageRenderer
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function ImageRenderer(context) {
        scope.AbstractRenderer.call(this, context);
    }

    /**
     * Inheritance property
     */
    ImageRenderer.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    ImageRenderer.prototype.constructor = ImageRenderer;


    /**
     * Draw components
     *
     * @method drawComponents
     * @param {AbstractComponent[]} components
     */
    ImageRenderer.prototype.drawComponents = function (components) {
        for (var i in components) {
            var component = components[i];
            if (component instanceof scope.AbstractComponent) {
                scope.AbstractRenderer.prototype.drawComponent.call(this, component); // super
            } else {
                console.log(components);
                console.log(typeof component);
                throw new Error('not implemented');
            }
        }
    };

    // Export
    scope.ImageRenderer = ImageRenderer;
})(MyScript);



(function (scope) {
    /**
     * The InkGrabber class that render, capture and build strokes
     *
     * @class InkGrabber
     * @extends AbstractRenderer
     * @param {Object} context
     * @constructor
     */
    function InkGrabber(context) {
        scope.AbstractRenderer.call(this, context);
        this.stroke = undefined;
        this.writing = false;
    }

    /**
     * Inheritance property
     */
    InkGrabber.prototype = new scope.AbstractRenderer();

    /**
     * Constructor property
     */
    InkGrabber.prototype.constructor = InkGrabber;

    /**
     * Is Writing a stroke
     *
     * @method isWriting
     * @returns {Boolean}
     */
    InkGrabber.prototype.isWriting = function () {
        return this.writing;
    };

    /**
     * Get the last wrote stroke
     *
     * @method getStroke
     * @returns {StrokeComponent}
     */
    InkGrabber.prototype.getStroke = function () {
        return this.stroke;
    };

    InkGrabber.prototype.startCapture = function (x, y, t) {
        if (!this.writing) {
            this.writing = true;
            this.stroke = new scope.StrokeComponent();
            this.stroke.setColor(this.penParameters.getColor());
            this.stroke.setWidth(this.penParameters.getWidth());
            this.stroke.addPoint(x, y, t);
            this.clear();
            this.drawComponent(this.stroke);
        } else {
            throw new Error('StrokeComponent capture already running');
        }
    };

    InkGrabber.prototype.continueCapture = function (x, y, t) {
        if (this.writing) {
            this.stroke.addPoint(x, y, t);
            this.clear();
            this.drawComponent(this.stroke);
        } else {
            throw new Error('Missing startInkCapture');
        }
    };

    InkGrabber.prototype.endCapture = function (x, y, t) {
        if (this.writing) {
            this.stroke.addPoint(x, y, t);
            this.clear();
            this.drawComponent(this.stroke);
            this.writing = false;
        } else {
            throw new Error('Missing startInkCapture');
        }
    };

    // Export
    scope.InkGrabber = InkGrabber;
})(MyScript);




(function (scope) {
    /**
     * InkPaper
     *
     * @class InkPaper
     * @param {Element} element
     * @param {Object} [options]
     * @param {Function} [callback] callback function
     * @param {Object} callback.data The recognition result
     * @param {Object} callback.err The err to the callback
     * @constructor
     */
    function InkPaper(element, options, callback) {
        this._element = element;
        this._instanceId = undefined;
        this._timerId = undefined;
        this._initialized = false;
        this._lastSentComponentIndex = 0;
        this._components = [];
        this._redoComponents = [];
        this.isStarted = false;
        this.resultCallback = callback;
        this.changeCallback = undefined;


        // Capture
        var tempCanvas = _createCanvas(element, 'ms-temp-canvas');
        this.canvasRatio = _getCanvasRatio(tempCanvas);
        element.removeChild(tempCanvas);
        //this.canvasRatio = 1;

        this._captureCanvas = _createCanvas(element, 'ms-capture-canvas');

        this._inkGrabber = new scope.InkGrabber(this._captureCanvas.getContext('2d'));

        // Rendering
        this._renderingCanvas = _createCanvas(element, 'ms-rendering-canvas');


        this._textRenderer = new scope.TextRenderer(this._renderingCanvas.getContext('2d'));
        this._mathRenderer = new scope.MathRenderer(this._renderingCanvas.getContext('2d'));
        this._shapeRenderer = new scope.ShapeRenderer(this._renderingCanvas.getContext('2d'));
        this._musicRenderer = new scope.MusicRenderer(this._renderingCanvas.getContext('2d'));
        this._analyzerRenderer = new scope.AnalyzerRenderer(this._renderingCanvas.getContext('2d'));

        // Recognition
        this._textRecognizer = new scope.TextRecognizer();
        this._mathRecognizer = new scope.MathRecognizer();
        this._shapeRecognizer = new scope.ShapeRecognizer();
        this._musicRecognizer = new scope.MusicRecognizer();
        this._analyzerRecognizer = new scope.AnalyzerRecognizer();

        this._textWSRecognizer = new scope.TextWSRecognizer(this._handleMessage.bind(this));
        this._mathWSRecognizer = new scope.MathWSRecognizer(this._handleMessage.bind(this));

        this._attachListeners(element);

        this.options = { // Default options
            type: scope.RecognitionType.TEXT,
            protocol: scope.Protocol.REST,
            ssl: true,
            width: 400,
            height: 300,
            timeout: 2000,
            typeset: false,
            components: [],
            textParameters: new scope.TextParameter(),
            mathParameters: new scope.MathParameter(),
            shapeParameters: new scope.ShapeParameter(),
            musicParameters: new scope.MusicParameter(),
            analyzerParameters: new scope.AnalyzerParameter()
        };

        if (options) {
            for (var idx in options) {
                if (options[idx] !== undefined) {
                    this.options[idx] = options[idx]; // Override current options
                }
            }
        }

        // Recognition type
        this.setType(this.options.type);

        this.setHost(this.options.host);
        this.setSSL(this.options.ssl);

        this.setTextParameters(this.options.textParameters); // jshint ignore:line
        this.setMathParameters(this.options.mathParameters); // jshint ignore:line
        this.setShapeParameters(this.options.shapeParameters); // jshint ignore:line
        this.setMusicParameters(this.options.musicParameters); // jshint ignore:line
        this.setAnalyzerParameters(this.options.analyzerParameters); // jshint ignore:line

        this.setProtocol(this.options.protocol);
        this.setTimeout(this.options.timeout);
        this.setApplicationKey(this.options.applicationKey);
        this.setHmacKey(this.options.hmacKey);

        this.setPenParameters(this.options.penParameters);

        this.setPrecision(this.options.precision);
        this.setTypeset(this.options.typeset);
        this.setComponents(this.options.components);

        this.setWidth(this.options.width);
        this.setHeight(this.options.height);
    }

    /**
     * Set the width
     *
     * @method setWidth
     * @param {Number} width
     */
    InkPaper.prototype.setWidth = function (width) {
        if (width > 0) {
            this._captureCanvas.width = width * this.canvasRatio;
            this._captureCanvas.style.width = width + 'px';
            this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);

            this._renderingCanvas.width = width * this.canvasRatio;
            this._renderingCanvas.style.width = width + 'px';
            this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
        }
        this._initRenderingCanvas();
    };

    /**
     * Set the height
     *
     * @method setHeight
     * @param {Number} height
     */
    InkPaper.prototype.setHeight = function (height) {
        if (height > 0) {
            this._captureCanvas.height = height * this.canvasRatio;
            this._captureCanvas.style.height = height + 'px';
            this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);

            this._renderingCanvas.height = height * this.canvasRatio;
            this._renderingCanvas.style.height = height + 'px';

            this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
        }
        this._initRenderingCanvas();
    };

    /**
     * Set the network protocol (REST or WebSocket)
     *
     * @param {'REST'|'WebSocket'} protocol
     */
    InkPaper.prototype.setProtocol = function (protocol) {
        switch (protocol) {
            case scope.Protocol.REST:
                this._selectedRecognizer = this._selectedRESTRecognizer;
                break;
            case scope.Protocol.WS:
                this.setTimeout(-1); // FIXME hack to avoid border issues
                this._selectedRecognizer = this._selectedWSRecognizer;
                break;
            default:
                throw new Error('Unknown protocol: ' + protocol);
        }
        this._instanceId = undefined;
        this._initialized = false;
        this._lastSentComponentIndex = 0;
    };

    /**
     * Get the network protocol (REST or WebSocket)
     *
     * @returns {'REST'|'WebSocket'}
     */
    InkPaper.prototype.getProtocol = function () {
        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            return scope.Protocol.WS;
        } else {
            return scope.Protocol.REST;
        }
    };

    /**
     * Set recognition type
     *
     * @method setType
     * @param {'TEXT'|'MATH'|'SHAPE'|'MUSIC'|'ANALYZER'} type
     */
    InkPaper.prototype.setType = function (type) {
        switch (type) {
            case scope.RecognitionType.TEXT:
                this._selectedRenderer = this._textRenderer;
                this._selectedRESTRecognizer = this._textRecognizer;
                this._selectedWSRecognizer = this._textWSRecognizer;
                break;
            case scope.RecognitionType.MATH:
                this._selectedRenderer = this._mathRenderer;
                this._selectedRESTRecognizer = this._mathRecognizer;
                this._selectedWSRecognizer = this._mathWSRecognizer;
                break;
            case scope.RecognitionType.SHAPE:
                this._selectedRenderer = this._shapeRenderer;
                this._selectedRESTRecognizer = this._shapeRecognizer;
                break;
            case scope.RecognitionType.MUSIC:
                this._selectedRenderer = this._musicRenderer;
                this._selectedRESTRecognizer = this._musicRecognizer;
                break;
            case scope.RecognitionType.ANALYZER:
                this._selectedRenderer = this._analyzerRenderer;
                this._selectedRESTRecognizer = this._analyzerRecognizer;
                break;
            default:
                throw new Error('Unknown type: ' + type);
        }
        this._instanceId = undefined;
        this._initialized = false;
        this._lastSentComponentIndex = 0;
    };

    /**
     * Get recognition type
     *
     * @method getType
     * @returns {'TEXT'|'MATH'|'SHAPE'|'MUSIC'|'ANALYZER'} type
     */
    InkPaper.prototype.getType = function () {
        if (this._selectedRenderer instanceof scope.TextRenderer) {
            return scope.RecognitionType.TEXT;
        }
        if (this._selectedRenderer instanceof scope.MathRenderer) {
            return scope.RecognitionType.MATH;
        }
        if (this._selectedRenderer instanceof scope.ShapeRenderer) {
            return scope.RecognitionType.SHAPE;
        }
        if (this._selectedRenderer instanceof scope.MusicRenderer) {
            return scope.RecognitionType.MUSIC;
        }
        if (this._selectedRenderer instanceof scope.AnalyzerRenderer) {
            return scope.RecognitionType.ANALYZER;
        }
        throw new Error('Unknown type');
    };

    /**
     * Get the recognition timeout
     *
     * @method getTimeout
     * @returns {Number}
     */
    InkPaper.prototype.getTimeout = function () {
        return this.timeout;
    };

    /**
     * Set the recognition timeout
     *
     * @method setTimeout
     * @param {Number} timeout
     */
    InkPaper.prototype.setTimeout = function (timeout) {
        this.timeout = timeout;
    };

    /**
     * Set the recognition precision
     *
     * @method setPrecision
     * @param {Number} precision
     */
    InkPaper.prototype.setPrecision = function (precision) {
        this._textRecognizer.setPrecision(precision);
        this._textWSRecognizer.setPrecision(precision);
        this._mathRecognizer.setPrecision(precision);
        this._mathWSRecognizer.setPrecision(precision);
        this._shapeRecognizer.setPrecision(precision);
        this._musicRecognizer.setPrecision(precision);
        this._analyzerRecognizer.setPrecision(precision);
    };

    /**
     * Get the default components
     *
     * @method getComponents
     * @return {Array} components
     */
    InkPaper.prototype.getComponents = function () {
        return this.options.components;
    };

    /**
     * Set the default components
     *
     * @method setComponents
     * @param {Array} components
     */
    InkPaper.prototype.setComponents = function (components) {
        this.options.components = components;
        this._initRenderingCanvas();
    };


    /**
     * Get the application key
     *
     * @method getApplicationKey
     * @returns {String}
     */
    InkPaper.prototype.getApplicationKey = function () {
        return this.applicationKey;
    };

    /**
     * Set the application key
     *
     * @method setApplicationKey
     * @param {String} applicationKey
     */
    InkPaper.prototype.setApplicationKey = function (applicationKey) {
        this.applicationKey = applicationKey;
    };

    /**
     * Get the HMAC key
     *
     * @method getHmacKey
     * @returns {String}
     */
    InkPaper.prototype.getHmacKey = function () {
        return this.hmacKey;
    };

    /**
     * Set the HMAC key
     *
     * @method setHmacKey
     * @param {String} hmacKey
     */
    InkPaper.prototype.setHmacKey = function (hmacKey) {
        this.hmacKey = hmacKey;
    };

    /**
     * Set text recognition parameters
     *
     * @method setTextParameters
     * @param {TextParameter} textParameters
     */
    InkPaper.prototype.setTextParameters = function (textParameters) {
        if (textParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in textParameters) {
                if (textParameters[i] !== undefined) {
                    this._textRecognizer.getParameters()[i] = textParameters[i]; // Override options
                    this._textWSRecognizer.getParameters()[i] = textParameters[i]; // Override options
                    this._analyzerRecognizer.getParameters().getTextParameters()[i] = textParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Get text recognition parameters
     *
     * @method getTextParameters
     * @returns {TextParameter} textParameters
     */
    InkPaper.prototype.getTextParameters = function () {
        return this._textRecognizer.getParameters();
    };

    /**
     * Set math recognition parameters
     *
     * @method setMathParameters
     * @param {MathParameter} mathParameters
     */
    InkPaper.prototype.setMathParameters = function (mathParameters) {
        if (mathParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in mathParameters) {
                if (mathParameters[i] !== undefined) {
                    this._mathRecognizer.getParameters()[i] = mathParameters[i]; // Override options
                    this._mathWSRecognizer.getParameters()[i] = mathParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Get math recognition parameters
     *
     * @method getMathParameters
     * @returns {MathParameter} mathParameters
     */
    InkPaper.prototype.getMathParameters = function () {
        return this._mathRecognizer.getParameters();
    };

    /**
     * Set shape recognition parameters
     *
     * @method setShapeParameters
     * @param {ShapeParameter} shapeParameters
     */
    InkPaper.prototype.setShapeParameters = function (shapeParameters) {
        if (shapeParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in shapeParameters) {
                if (shapeParameters[i] !== undefined) {
                    this._shapeRecognizer.getParameters()[i] = shapeParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Get shape recognition parameters
     *
     * @method getShapeParameters
     * @returns {ShapeParameter} shapeParameters
     */
    InkPaper.prototype.getShapeParameters = function () {
        return this._shapeRecognizer.getParameters();
    };

    /**
     * Set music recognition parameters
     *
     * @method setMusicParameters
     * @param {MusicParameter} musicParameters
     */
    InkPaper.prototype.setMusicParameters = function (musicParameters) {
        if (musicParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in musicParameters) {
                if (musicParameters[i] !== undefined) {
                    this._musicRecognizer.getParameters()[i] = musicParameters[i]; // Override options
                }
            }
            this._initRenderingCanvas();
        }
    };

    /**
     * Get music recognition parameters
     *
     * @method getMusicParameters
     * @returns {MusicParameter} musicParameters
     */
    InkPaper.prototype.getMusicParameters = function () {
        return this._musicRecognizer.getParameters();
    };

    /**
     * Set analyzer recognition parameters
     *
     * @method setAnalyzerParameters
     * @param {AnalyzerParameter} analyzerParameters
     */
    InkPaper.prototype.setAnalyzerParameters = function (analyzerParameters) {
        if (analyzerParameters) {
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.isStarted = false;
                this._selectedRecognizer.resetWSRecognition();
            }
            for (var i in analyzerParameters) {
                if (analyzerParameters[i] !== undefined) {
                    this._analyzerRecognizer.getParameters()[i] = analyzerParameters[i]; // Override options
                }
            }
        }
    };

    /**
     * Get analyzer recognition parameters
     *
     * @method getAnalyzerParameters
     * @returns {AnalyzerParameter} analyzerParameters
     */
    InkPaper.prototype.getAnalyzerParameters = function () {
        return this._analyzerRecognizer.getParameters();
    };

    /**
     * Set pen parameters
     *
     * @method setPenParameters
     * @param {PenParameters} penParameters
     */
    InkPaper.prototype.setPenParameters = function (penParameters) {
        if (penParameters) {
            for (var i in penParameters) {
                if (penParameters[i] !== undefined) {
                    this._selectedRenderer.getParameters()[i] = penParameters[i]; // Override options
                }
            }
            var params = this._selectedRenderer.getParameters();
            this._inkGrabber.setParameters(params); // Override options
            this._textRenderer.setParameters(params); // Override options
            this._mathRenderer.setParameters(params); // Override options
            this._shapeRenderer.setParameters(params); // Override options
            this._musicRenderer.setParameters(params); // Override options
            this._analyzerRenderer.setParameters(params); // Override options
        }
    };

    /**
     * Get pen parameters
     *
     * @method getPenParameters
     * @returns {PenParameters} penParameters
     */
    InkPaper.prototype.getPenParameters = function () {
        return this._selectedRenderer.getParameters();
    };

    /**
     * Enable / disable typeset
     *
     * @method setTypeset
     * @param {Boolean} typeset
     */
    InkPaper.prototype.setTypeset = function (typeset) {
        this._textRenderer.setTypeset(typeset);
        this._mathRenderer.setTypeset(typeset);
        this._shapeRenderer.setTypeset(typeset);
        this._musicRenderer.setTypeset(typeset);
        this._analyzerRenderer.setTypeset(typeset);
    };

    /**
     * Get available languages
     *
     * @method getAvailableLanguages
     * @param {String} [inputMode] input mode
     */
    InkPaper.prototype.getAvailableLanguages = function (inputMode) {
        this._selectedRESTRecognizer.getAvailableLanguageList(
            this.getApplicationKey(),
            inputMode ? inputMode : this._textRecognizer.getParameters().getInputMode()
        ).then(
            function (data) {
                this._onResult(data);
            }.bind(this),
            function (error) {
                this._onResult(undefined, error);
            }.bind(this)
        );
    };

    /**
     * Get the renderer
     *
     * @method getRenderer
     * @returns {AbstractRenderer}
     */
    InkPaper.prototype.getRenderer = function () {
        return this._selectedRenderer;
    };

    /**
     * Get the ink capturer
     *
     * @method getInkGrabber
     * @returns {InkGrabber}
     */
    InkPaper.prototype.getInkGrabber = function () {
        return this._inkGrabber;
    };

    /**
     * Get the recognizer
     *
     * @method getRecognizer
     * @returns {AbstractRecognizer}
     */
    InkPaper.prototype.getRecognizer = function () {
        return this._selectedRecognizer;
    };

    /**
     * Set the change callback
     *
     * @method setChangeCallback
     * @param {Function} callback callback function
     * @param {Object} callback.data The inkPaper state
     */
    InkPaper.prototype.setChangeCallback = function (changeCallback) {
        this.changeCallback = changeCallback;
    };

    /**
     * Set the recognition result callback
     *
     * @method setResultCallback
     * @param {Function} callback callback function
     * @param {Object} callback.data The recognition result
     */
    InkPaper.prototype.setResultCallback = function (callback) {
        this.resultCallback = callback;
    };

    /**
     * Recognize
     *
     * @method recognize
     * @returns {Promise}
     */
    InkPaper.prototype.recognize = function () {
        var input = this.getComponents().concat(this._components);
        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            if (this._initialized) {
                var lastInput = input.slice(this._lastSentComponentIndex);

                if (lastInput.length > 0) {
                    this._lastSentComponentIndex = input.length;
                    if (!this.isStarted) {
                        this.isStarted = true;
                        this._selectedRecognizer.startWSRecognition(lastInput);
                    } else {
                        this._selectedRecognizer.continueWSRecognition(lastInput, this._instanceId);
                    }
                } else {
                    this._renderResult();
                }
            }
        } else {
            if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
                this._instanceId = undefined;
            }

            if (input.length > 0) {
                if (!this.isStarted) {
                    this._startRESTRecognition(input);
                } else {
                    this._continueRESTRecognition(input, this._instanceId);
                }
            } else {
                this._renderResult();
            }
        }
    };

    InkPaper.prototype._startRESTRecognition = function (components) {

        this._instanceId = undefined;
        this._selectedRecognizer.doSimpleRecognition(
            this.getApplicationKey(),
            this._instanceId,
            components,
            this.getHmacKey()
        ).then(
            function (data) {
                if (!this.isStarted) {
                    this.isStarted = true;
                    this._lastSentComponentIndex = components.length;
                    this._instanceId = data.getInstanceId();
                    this._renderResult(data);
                }
            }.bind(this),
            function (error) {
                this._onResult(undefined, error);
            }.bind(this)
        );
    };

    InkPaper.prototype._continueRESTRecognition = function (components, instanceId) {

        this._selectedRecognizer.doSimpleRecognition(
            this.getApplicationKey(),
            instanceId,
            components,
            this.getHmacKey()
        ).then(
            function (data) {
                this._lastSentComponentIndex = this._lastSentComponentIndex + components.length;
                this._renderResult(data);
            }.bind(this),
            function (error) {
                this._onResult(undefined, error);
            }.bind(this)
        );
    };

    InkPaper.prototype._clearRESTRecognition = function (instanceId) {

        if (this._selectedRecognizer instanceof scope.ShapeRecognizer) {
            this.isStarted = false;
            this._lastSentComponentIndex = 0;
            this._selectedRecognizer.clearShapeRecognitionSession(
                this.getApplicationKey(),
                instanceId
            ).then(
                function (data) {
                    this._instanceId = undefined;
                    this._onResult(data);
                }.bind(this),
                function (error) {
                    this._onResult(undefined, error);
                }.bind(this)
            );
        } else {
            this._onResult();
        }
    };

    /**
     * Return true if you can undo
     *
     * @method canUndo
     * @returns {Boolean}
     */
    InkPaper.prototype.canUndo = function () {
        return this._components.length > 0;
    };

    /**
     * Undo
     *
     * @method undo
     */
    InkPaper.prototype.undo = function () {
        if (this.canUndo()) {
            //Remove the scratched state for Math strokes
            this._components.forEach(function(stroke){
                stroke.scratchedStroke = false;
            });
            //Remove the latsModel used for Shape
            this.updatedModel = undefined;

            this._redoComponents.push(this._components.pop());

            this._clearRESTRecognition(this._instanceId);

            this._initRenderingCanvas();
            this._onChange();

            this.isStarted = false;
            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this._selectedRecognizer.resetWSRecognition();
            } else {
                clearTimeout(this._timerId);
                if (this.getTimeout() > -1) {
                    this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
                } else {
                    this._onResult();
                }
            }
        }
    };

    /**
     * Return true if you can redo
     *
     * @method canRedo
     * @returns {Boolean}
     */
    InkPaper.prototype.canRedo = function () {
        return this._redoComponents.length > 0;
    };

    /**
     * Redo
     *
     * @method redo
     */
    InkPaper.prototype.redo = function () {
        if (this.canRedo()) {
            this._components.push(this._redoComponents.pop());

            this._clearRESTRecognition(this._instanceId);

            this._initRenderingCanvas();
            this._onChange();

            if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
                this.recognize();
            } else {
                clearTimeout(this._timerId);
                this.isStarted = false;
                if (this.getTimeout() > -1) {
                    this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
                } else {
                    this._onResult();
                }
            }
        }
    };

    /**
     * Clear the ink paper
     *
     * @method clear
     */
    InkPaper.prototype.clear = function () {
        this._components = [];
        this._redoComponents = [];
        this._initRenderingCanvas();
        this._clearRESTRecognition(this._instanceId);

        this._onChange();

        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            this.isStarted = false;
            this._selectedRecognizer.resetWSRecognition();
        } else if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            clearTimeout(this._timerId);
            this._onResult();
        } else {
            clearTimeout(this._timerId);
            if (this.getTimeout() > -1) {
                this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
            } else {
                this._onResult();
            }
        }
    };

    InkPaper.event = {
        'addDomListener': function (element, useCapture, myfunction) {
            element.addEventListener(useCapture, myfunction);
        }
    };

    /**
     *
     * @private
     * @method _down
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Date} [t] timeStamp
     */
    InkPaper.prototype._down = function (x, y, t) {
        clearTimeout(this._timerId);
        var sizeChanged = false;
        if (this._captureCanvas.clientHeight * this.canvasRatio !== this._captureCanvas.height) {
            this._captureCanvas.height = this._captureCanvas.clientHeight * this.canvasRatio;
            this._renderingCanvas.height = this._renderingCanvas.clientHeight * this.canvasRatio;
            sizeChanged = true;
        }

        if (this._captureCanvas.clientWidth * this.canvasRatio !== this._captureCanvas.width) {
            this._captureCanvas.width = this._captureCanvas.clientWidth * this.canvasRatio;
            this._renderingCanvas.width = this._renderingCanvas.clientWidth * this.canvasRatio;
            sizeChanged = true;
        }

        //Safari trash the canvas content when heigth or width are modified.
        if (sizeChanged) {

            this._captureCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
            this._renderingCanvas.getContext('2d').scale(this.canvasRatio, this.canvasRatio);
            this._initRenderingCanvas();
        }

        if (this.canRedo()) {
            this._redoComponents = [];
            this._onChange();
        }

        this._inkGrabber.startCapture(x, y, t);


    };

    /**
     *
     * @private
     * @method _move
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Date} [t] timeStamp
     */
    InkPaper.prototype._move = function (x, y, t) {
        this._inkGrabber.continueCapture(x, y, t);
    };

    /**
     *
     * @private
     * @method _move
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Date} [t] timeStamp
     */
    InkPaper.prototype._up = function (x, y, t) {
        this._inkGrabber.endCapture(x, y, t);

        var stroke = this._inkGrabber.getStroke();

        this._inkGrabber.clear();
        this._selectedRenderer.drawComponent(stroke);

        this._components.push(stroke);
        this._onChange();

        if (this._selectedRecognizer instanceof scope.AbstractWSRecognizer) {
            if (!this._selectedRecognizer.isOpen() && !this._selectedRecognizer.isConnecting()) {
                this._selectedRecognizer.open();
            } else {
                this.recognize();
            }
        } else {
            clearTimeout(this._timerId);
            if (this.getTimeout() > -1) {
                this._timerId = setTimeout(this.recognize.bind(this), this.getTimeout());
            }
        }
    };

    InkPaper.prototype._onResult = function (data, err) {
        if (this.resultCallback) {
            this.resultCallback(data, err);
        }
        if (err) {
            this._element.dispatchEvent(new CustomEvent('error', {detail: err}));
        } else {
            this._element.dispatchEvent(new CustomEvent('success', {detail: data}));
        }
    };

    InkPaper.prototype._onChange = function () {
        var data = {
            canUndo: this.canUndo(),
            undoLength: this._components.length,
            canRedo: this.canRedo(),
            redoLength: this._redoComponents.length
        };

        if (this.changeCallback) {
            this.changeCallback(data)
        }
        this._element.dispatchEvent(new CustomEvent('changed', {detail: data}));
    };

    InkPaper.prototype._renderResult = function (data) {
        this.updatedModel = this._selectedRenderer.drawRecognitionResult(this.getComponents().concat(this._components), data? data.getDocument(): undefined);
        if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            if (this._selectedRecognizer.getParameters().getStaff() instanceof scope.MusicStaff) {
                this._selectedRenderer.drawStaff(this._selectedRecognizer.getParameters().getStaff());
            }
        }
        this._onResult(data);
        return data;
    };

    /**
     * Set recognition service url
     *
     * @param {String} host
     */
    InkPaper.prototype.setHost = function (host) {
        this._textRecognizer.setHost(host);
        this._textWSRecognizer.setHost(host);
        this._mathRecognizer.setHost(host);
        this._mathWSRecognizer.setHost(host);
        this._shapeRecognizer.setHost(host);
        this._musicRecognizer.setHost(host);
        this._analyzerRecognizer.setHost(host);
    };

    /**
     * @private
     */
    InkPaper.prototype.setSSL = function (ssl) {
        this._textRecognizer.setSSL(ssl);
        this._textWSRecognizer.setSSL(ssl);
        this._mathRecognizer.setSSL(ssl);
        this._mathWSRecognizer.setSSL(ssl);
        this._shapeRecognizer.setSSL(ssl);
        this._musicRecognizer.setSSL(ssl);
        this._analyzerRecognizer.setSSL(ssl);
    };

    /**
     * Tool to attach touch events
     *
     * @private
     * @param {Element} element
     */
    InkPaper.prototype._attachListeners = function (element) {
        var self = this;
        var pointerId;

        //Desactivation of contextmenu to prevent safari to fire pointerdown only once
        element.addEventListener("contextmenu", function (e) {
                                     e.preventDefault();
                                     e.stopPropagation();
                                     return false;
                                 }
        );

        element.addEventListener('pointerdown', function (e) {
            if (!pointerId) {
                pointerId = e.pointerId;
                e.preventDefault();pointerId
                var coord = _getCoordinates(e, element);
                self._down(coord.x, coord.y, coord.t);
            }
        }, false);

        element.addEventListener('pointermove', function (e) {
            if (pointerId === e.pointerId) {
                e.preventDefault();

                var coord = _getCoordinates(e, element);
                self._move(coord.x, coord.y, coord.t);
            }
        }, false);

        element.addEventListener('pointerup', function (e) {
            if (pointerId === e.pointerId) {
                e.preventDefault();

                var coord = _getCoordinates(e, element);
                self._up(coord.x, coord.y, coord.t);

                pointerId = undefined;
            }
        }, false);

        element.addEventListener('pointerleave', function (e) {
            if (pointerId === e.pointerId) {
                e.preventDefault();

                var point = self._inkGrabber.getStroke().getPointByIndex(self._inkGrabber.getStroke().getLastIndexPoint());
                self._up(point.x, point.y, point.t);
                pointerId = undefined;
            }
        }, false);

        element.addEventListener('pointerout', function (e) {
            if (pointerId === e.pointerId) {
                e.preventDefault();

                var point = self._inkGrabber.getStroke().getPointByIndex(self._inkGrabber.getStroke().getLastIndexPoint());
                self._up(point.x, point.y, point.t);
                pointerId = undefined;
            }
        }, false);
    };

    InkPaper.prototype._initRenderingCanvas = function () {
        this._selectedRenderer.clear();

        if (this._selectedRecognizer instanceof scope.MusicRecognizer) {
            if (this._selectedRecognizer.getParameters().getStaff() instanceof scope.MusicStaff) {
                this._selectedRenderer.drawStaff(this._selectedRecognizer.getParameters().getStaff());
            }
        }
        if(this._selectedRecognizer instanceof scope.ShapeRecognizer && this.updatedModel){
            this._selectedRenderer.drawRecognitionResult(this.updatedModel.components, this.updatedModel.document);
        } else {
            this._selectedRenderer.drawComponents(this.getComponents().concat(this._components));
        }
    };

    /**
     *
     * @param message
     * @param error
     * @returns {boolean} false no immediate replay needed, true when the call need to be replay ASAP
     * @private
     */
    InkPaper.prototype._handleMessage = function (message, error) {
        var replayNeeded = false;
        if (error) {
            replayNeeded = true;
            this._instanceId = undefined;
            this.isStarted = false;
            this._lastSentComponentIndex = 0;
            this._onResult(undefined, error);
        }

        if (message) {
            switch (message.type) {
                case 'open':
                    this._selectedWSRecognizer.initWSRecognition(this.getApplicationKey());
                    break;
                case 'hmacChallenge':
                    this._selectedWSRecognizer.takeUpHmacChallenge(this.getApplicationKey(), message.getChallenge(), this.getHmacKey());
                    break;
                case 'init':
                    this.isStarted = false;
                    this._initialized = true;
                    this._instanceId = undefined;
                    this._lastSentComponentIndex = 0;
                    this.recognize();
                    break;
                case 'reset':
                    this.isStarted = false;
                    this._instanceId = undefined;
                    this._lastSentComponentIndex = 0;
                    this.recognize();
                    break;
                case 'close':
                    this._initialized = false;
                    this._instanceId = undefined;
                    this._lastSentComponentIndex = 0;
                    break;
                default:
                    this.isStarted = true;
                    if (!this._instanceId) {
                        this._instanceId = message.getInstanceId();
                    }
                    this._renderResult(message);
                    break;
            }
        }
        return replayNeeded;
    };

    /**
     * Return the stats allowing to monitor what ink size is send to the server.
     * @returns Stats objects format {strokesCount : 0, pointsCount : 0, byteSize : 0, humanSize : 0, humanUnit : 'BYTE'} humanUnit could have the values BYTE, BYTES, KiB, MiB
     */
    InkPaper.prototype.getStats = function () {
        var stats = {strokesCount: 0, pointsCount: 0, byteSize: 0, humanSize: 0, humanUnit: 'BYTE'};
        if (this._components) {
            stats.strokesCount = this._components.length;
            var pointsCount = 0;
            for (var strokeNb = 0; strokeNb < this._components.length; strokeNb++) {
                pointsCount = pointsCount + this._components[strokeNb].x.length;
            }
            stats.strokesCount = this._components.length;
            stats.pointsCount = pointsCount;
            //We start with 270 as it is the size in bytes. Make a real computation implies to recode a doRecogntion
            var byteSize = 270;
            byteSize = JSON.stringify(this._components).length;
            stats.byteSize = byteSize;
            if (byteSize < 270) {
                stats.humanUnit = 'BYTE';
                stats.byteSize = 0;
                stats.humanSize = 0;
            } else if (byteSize < 2048) {
                stats.humanUnit = 'BYTES';
                stats.humanSize = byteSize;
            } else if (byteSize < 1024 * 1024) {
                stats.humanUnit = 'KiB';
                stats.humanSize = (byteSize / 1024).toFixed(2);
            } else {
                stats.humanUnit = 'MiB';
                stats.humanSize = (byteSize / 1024 / 1024).toFixed(2);
            }
        }
        return stats;
    };

    /**
     *
     * @param marginX the horizontal margin to apply (by default 10)
     * @param marginY the vertical margin to apply (by default 10)
     * @returns {ImageData} Build an ImageData object with content shrink to border of strokes.
     * @private
     */
    InkPaper.prototype.getInkAsImageData = function (marginX, marginY) {
        //Remove the scratched strokes
        var componentCopy = [];
        this._components.forEach(function(stroke) {
                                     if (stroke.scratchedStroke !== true) {
                                         componentCopy.push(stroke);
                                     }
                                 }
        );

        if (!marginX) {
            marginX = 10;
        }
        if (!marginY) {
            marginY = 10;
        }

        if (componentCopy && componentCopy.length > 0) {
            var updatedStrokes;
            var strokesCount = componentCopy.length;
            //Initializing min and max
            var minX = componentCopy[0].x[0];
            var maxX = componentCopy[0].x[0];
            var minY = componentCopy[0].y[0];
            var maxY = componentCopy[0].y[0];

            // Computing the min and max for x and y
            for (var strokeNb = 0; strokeNb < componentCopy.length; strokeNb++) {
                var pointCount = componentCopy[strokeNb].x.length;
                for (var pointNb = 0; pointNb < pointCount; pointNb++) {
                    var currentX = componentCopy[strokeNb].x[pointNb];
                    var currentY = componentCopy[strokeNb].y[pointNb];
                    if (currentX < minX) {
                        minX = currentX;
                    }
                    if (currentX > maxX) {
                        maxX = currentX;
                    }
                    if (currentY < minY) {
                        minY = currentY;
                    }
                    if (currentY > maxY) {
                        maxY = currentY;
                    }
                }
            }
            var nonDisplayCanvas = document.createElement('canvas');
            nonDisplayCanvas.width = (maxX ) + (2 * marginX);
            nonDisplayCanvas.height = (maxY ) + (2 * marginY)

            var ctx = nonDisplayCanvas.getContext("2d");

            var imageRendered = new scope.ImageRenderer(ctx);
            imageRendered.drawComponents(componentCopy, ctx);

            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
            return ctx.getImageData(minX - marginX, minY - marginY, (maxX - minX ) + (2 * marginX), (maxY - minY ) + (2 * marginY));
        }
    };

    /**
     *
     * @param marginX the horizontal margin to apply (by default 10)
     * @param marginY the vertical margin to apply (by default 10)
     * @returns {String} Build an String containg dataUrl with content shrink to border of strokes.
     * @private
     */
    InkPaper.prototype.getInkAsPng = function (marginX, marginY) {
        var imageRenderingCanvas = document.createElement('canvas');
        imageRenderingCanvas.style.display = 'none';

        var imageDataToRender = this.getInkAsImageData();
        imageRenderingCanvas.width = imageDataToRender.width;
        imageRenderingCanvas.style.width = imageDataToRender.width + 'px';
        imageRenderingCanvas.height = imageDataToRender.height;
        imageRenderingCanvas.style.height = imageDataToRender.height + 'px';
        var ctx = imageRenderingCanvas.getContext('2d');
        ctx.putImageData(imageDataToRender, 0, 0);
        return imageRenderingCanvas.toDataURL("image/png");
    };

    /**
     * Tool to create canvas
     *
     * @private
     * @param {Element} parent
     * @param {String} id
     * @returns {Element}
     */
    function _createCanvas(parent, id) {
        var count = document.querySelectorAll('canvas[id^=' + id + ']').length;
        var canvas = document.createElement('canvas');
        canvas.id = id + '-' + count;
        parent.appendChild(canvas);
        return canvas;
    }

    /**
     * Tool to get canvas ratio (retina display)
     *
     * @private
     * @param {Element} canvas
     * @returns {Number}
     */
    function _getCanvasRatio(canvas) {
        if (canvas) {
            var context = canvas.getContext('2d'),
                devicePixelRatio = window.devicePixelRatio || 1,
                backingStoreRatio = context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
            return devicePixelRatio / backingStoreRatio;
        }
        return 1;
    }


    /**
     * Tool to get proper coordinates
     *
     * @private
     * @param {Event} e
     * @param {Element} element
     * @returns {Object}
     */
    function _getCoordinates(e, container) {
        if (e.changedTouches) e = e.changedTouches[0];
        var rect = container.getBoundingClientRect();
        return {
            x: e.clientX - rect.left - container.clientLeft,
            y: e.clientY - rect.top - container.clientTop,
            t: e.timeStamp
        };
    }

    // Export
    scope.InkPaper = InkPaper;
})(MyScript);
