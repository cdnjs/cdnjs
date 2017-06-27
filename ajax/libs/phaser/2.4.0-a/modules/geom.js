/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a new Circle object with the center coordinate specified by the x and y parameters and the diameter specified by the diameter parameter.
* If you call this function without parameters, a circle with x, y, diameter and radius properties set to 0 is created.
* 
* @class Phaser.Circle
* @constructor
* @param {number} [x=0] - The x coordinate of the center of the circle.
* @param {number} [y=0] - The y coordinate of the center of the circle.
* @param {number} [diameter=0] - The diameter of the circle.
*/
Phaser.Circle = function (x, y, diameter) {

    x = x || 0;
    y = y || 0;
    diameter = diameter || 0;

    /**
    * @property {number} x - The x coordinate of the center of the circle.
    */
    this.x = x;

    /**
    * @property {number} y - The y coordinate of the center of the circle.
    */
    this.y = y;

    /**
    * @property {number} _diameter - The diameter of the circle.
    * @private
    */
    this._diameter = diameter;

    /**
   * @property {number} _radius - The radius of the circle.
   * @private
   */
    this._radius = 0;

    if (diameter > 0)
    {
        this._radius = diameter * 0.5;
    }

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.CIRCLE;

};

Phaser.Circle.prototype = {

    /**
    * The circumference of the circle.
    * 
    * @method Phaser.Circle#circumference
    * @return {number} The circumference of the circle.
    */
    circumference: function () {

        return 2 * (Math.PI * this._radius);

    },

    /**
    * Returns a uniformly distributed random point from anywhere within this Circle.
    * 
    * @method Phaser.Circle#random
    * @param {Phaser.Point|object} [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an existing object.
    * @return {Phaser.Point} An object containing the random point in its `x` and `y` properties.
    */
    random: function (out) {

        if (out === undefined) { out = new Phaser.Point(); }

        var t = 2 * Math.PI * Math.random();
        var u = Math.random() + Math.random();
        var r = (u > 1) ? 2 - u : u;
        var x = r * Math.cos(t);
        var y = r * Math.sin(t);

        out.x = this.x + (x * this.radius);
        out.y = this.y + (y * this.radius);

        return out;

    },

    /**
    * Returns the framing rectangle of the circle as a Phaser.Rectangle object.
    * 
    * @method Phaser.Circle#getBounds
    * @return {Phaser.Rectangle} The bounds of the Circle.
    */
    getBounds: function () {

        return new Phaser.Rectangle(this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);

    },

    /**
    * Sets the members of Circle to the specified values.
    * @method Phaser.Circle#setTo
    * @param {number} x - The x coordinate of the center of the circle.
    * @param {number} y - The y coordinate of the center of the circle.
    * @param {number} diameter - The diameter of the circle.
    * @return {Circle} This circle object.
    */
    setTo: function (x, y, diameter) {

        this.x = x;
        this.y = y;
        this._diameter = diameter;
        this._radius = diameter * 0.5;

        return this;

    },

    /**
    * Copies the x, y and diameter properties from any given object to this Circle.
    * @method Phaser.Circle#copyFrom
    * @param {any} source - The object to copy from.
    * @return {Circle} This Circle object.
    */
    copyFrom: function (source) {

        return this.setTo(source.x, source.y, source.diameter);

    },

    /**
    * Copies the x, y and diameter properties from this Circle to any given object.
    * @method Phaser.Circle#copyTo
    * @param {any} dest - The object to copy to.
    * @return {object} This dest object.
    */
    copyTo: function (dest) {

        dest.x = this.x;
        dest.y = this.y;
        dest.diameter = this._diameter;

        return dest;

    },

    /**
    * Returns the distance from the center of the Circle object to the given object
    * (can be Circle, Point or anything with x/y properties)
    * @method Phaser.Circle#distance
    * @param {object} dest - The target object. Must have visible x and y properties that represent the center of the object.
    * @param {boolean} [round=false] - Round the distance to the nearest integer.
    * @return {number} The distance between this Point object and the destination Point object.
    */
    distance: function (dest, round) {

        var distance = Phaser.Math.distance(this.x, this.y, dest.x, dest.y);
        return round ? Math.round(distance) : distance;

    },

    /**
    * Returns a new Circle object with the same values for the x, y, width, and height properties as this Circle object.
    * @method Phaser.Circle#clone
    * @param {Phaser.Circle} output - Optional Circle object. If given the values will be set into the object, otherwise a brand new Circle object will be created and returned.
    * @return {Phaser.Circle} The cloned Circle object.
    */
    clone: function (output) {

        if (output === undefined || output === null)
        {
            output = new Phaser.Circle(this.x, this.y, this.diameter);
        }
        else
        {
            output.setTo(this.x, this.y, this.diameter);
        }

        return output;

    },

    /**
    * Return true if the given x/y coordinates are within this Circle object.
    * @method Phaser.Circle#contains
    * @param {number} x - The X value of the coordinate to test.
    * @param {number} y - The Y value of the coordinate to test.
    * @return {boolean} True if the coordinates are within this circle, otherwise false.
    */
    contains: function (x, y) {

        return Phaser.Circle.contains(this, x, y);

    },

    /**
    * Returns a Point object containing the coordinates of a point on the circumference of the Circle based on the given angle.
    * @method Phaser.Circle#circumferencePoint
    * @param {number} angle - The angle in radians (unless asDegrees is true) to return the point from.
    * @param {boolean} [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @param {Phaser.Point} [out] - An optional Point object to put the result in to. If none specified a new Point object will be created.
    * @return {Phaser.Point} The Point object holding the result.
    */
    circumferencePoint: function (angle, asDegrees, out) {

        return Phaser.Circle.circumferencePoint(this, angle, asDegrees, out);

    },

    /**
    * Adjusts the location of the Circle object, as determined by its center coordinate, by the specified amounts.
    * @method Phaser.Circle#offset
    * @param {number} dx - Moves the x value of the Circle object by this amount.
    * @param {number} dy - Moves the y value of the Circle object by this amount.
    * @return {Circle} This Circle object.
    */
    offset: function (dx, dy) {

        this.x += dx;
        this.y += dy;

        return this;

    },

    /**
    * Adjusts the location of the Circle object using a Point object as a parameter. This method is similar to the Circle.offset() method, except that it takes a Point object as a parameter.
    * @method Phaser.Circle#offsetPoint
    * @param {Point} point A Point object to use to offset this Circle object (or any valid object with exposed x and y properties).
    * @return {Circle} This Circle object.
    */
    offsetPoint: function (point) {
        return this.offset(point.x, point.y);
    },

    /**
    * Returns a string representation of this object.
    * @method Phaser.Circle#toString
    * @return {string} a string representation of the instance.
    */
    toString: function () {
        return "[{Phaser.Circle (x=" + this.x + " y=" + this.y + " diameter=" + this.diameter + " radius=" + this.radius + ")}]";
    }

};

Phaser.Circle.prototype.constructor = Phaser.Circle;

/**
* The largest distance between any two points on the circle. The same as the radius * 2.
* 
* @name Phaser.Circle#diameter
* @property {number} diameter - Gets or sets the diameter of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "diameter", {

    get: function () {
        return this._diameter;
    },

    set: function (value) {

        if (value > 0)
        {
            this._diameter = value;
            this._radius = value * 0.5;
        }
    }

});

/**
* The length of a line extending from the center of the circle to any point on the circle itself. The same as half the diameter.
* @name Phaser.Circle#radius
* @property {number} radius - Gets or sets the radius of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "radius", {

    get: function () {
        return this._radius;
    },

    set: function (value) {

        if (value > 0)
        {
            this._radius = value;
            this._diameter = value * 2;
        }

    }

});

/**
* The x coordinate of the leftmost point of the circle. Changing the left property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
* @name Phaser.Circle#left
* @propety {number} left - Gets or sets the value of the leftmost point of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "left", {

    get: function () {
        return this.x - this._radius;
    },

    set: function (value) {

        if (value > this.x)
        {
            this._radius = 0;
            this._diameter = 0;
        }
        else
        {
            this.radius = this.x - value;
        }

    }

});

/**
* The x coordinate of the rightmost point of the circle. Changing the right property of a Circle object has no effect on the x and y properties. However it does affect the diameter, whereas changing the x value does not affect the diameter property.
* @name Phaser.Circle#right
* @property {number} right - Gets or sets the value of the rightmost point of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "right", {

    get: function () {
        return this.x + this._radius;
    },

    set: function (value) {

        if (value < this.x)
        {
            this._radius = 0;
            this._diameter = 0;
        }
        else
        {
            this.radius = value - this.x;
        }

    }

});

/**
* The sum of the y minus the radius property. Changing the top property of a Circle object has no effect on the x and y properties, but does change the diameter.
* @name Phaser.Circle#top
* @property {number} top - Gets or sets the top of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "top", {

    get: function () {
        return this.y - this._radius;
    },

    set: function (value) {

        if (value > this.y)
        {
            this._radius = 0;
            this._diameter = 0;
        }
        else
        {
            this.radius = this.y - value;
        }

    }

});

/**
* The sum of the y and radius properties. Changing the bottom property of a Circle object has no effect on the x and y properties, but does change the diameter.
* @name Phaser.Circle#bottom
* @property {number} bottom - Gets or sets the bottom of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "bottom", {

    get: function () {
        return this.y + this._radius;
    },

    set: function (value) {

        if (value < this.y)
        {
            this._radius = 0;
            this._diameter = 0;
        }
        else
        {
            this.radius = value - this.y;
        }

    }

});

/**
* The area of this Circle.
* @name Phaser.Circle#area
* @property {number} area - The area of this circle.
* @readonly
*/
Object.defineProperty(Phaser.Circle.prototype, "area", {

    get: function () {

        if (this._radius > 0)
        {
            return Math.PI * this._radius * this._radius;
        }
        else
        {
            return 0;
        }

    }

});

/**
* Determines whether or not this Circle object is empty. Will return a value of true if the Circle objects diameter is less than or equal to 0; otherwise false.
* If set to true it will reset all of the Circle objects properties to 0. A Circle object is empty if its diameter is less than or equal to 0.
* @name Phaser.Circle#empty
* @property {boolean} empty - Gets or sets the empty state of the circle.
*/
Object.defineProperty(Phaser.Circle.prototype, "empty", {

    get: function () {
        return (this._diameter === 0);
    },

    set: function (value) {

        if (value === true)
        {
            this.setTo(0, 0, 0);
        }

    }

});

/**
* Return true if the given x/y coordinates are within the Circle object.
* @method Phaser.Circle.contains
* @param {Phaser.Circle} a - The Circle to be checked.
* @param {number} x - The X value of the coordinate to test.
* @param {number} y - The Y value of the coordinate to test.
* @return {boolean} True if the coordinates are within this circle, otherwise false.
*/
Phaser.Circle.contains = function (a, x, y) {

    //  Check if x/y are within the bounds first
    if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y <= a.bottom)
    {
        var dx = (a.x - x) * (a.x - x);
        var dy = (a.y - y) * (a.y - y);

        return (dx + dy) <= (a.radius * a.radius);
    }
    else
    {
        return false;
    }

};

/**
* Determines whether the two Circle objects match. This method compares the x, y and diameter properties.
* @method Phaser.Circle.equals
* @param {Phaser.Circle} a - The first Circle object.
* @param {Phaser.Circle} b - The second Circle object.
* @return {boolean} A value of true if the object has exactly the same values for the x, y and diameter properties as this Circle object; otherwise false.
*/
Phaser.Circle.equals = function (a, b) {
    return (a.x == b.x && a.y == b.y && a.diameter == b.diameter);
};

/**
* Determines whether the two Circle objects intersect.
* This method checks the radius distances between the two Circle objects to see if they intersect.
* @method Phaser.Circle.intersects
* @param {Phaser.Circle} a - The first Circle object.
* @param {Phaser.Circle} b - The second Circle object.
* @return {boolean} A value of true if the specified object intersects with this Circle object; otherwise false.
*/
Phaser.Circle.intersects = function (a, b) {
    return (Phaser.Math.distance(a.x, a.y, b.x, b.y) <= (a.radius + b.radius));
};

/**
* Returns a Point object containing the coordinates of a point on the circumference of the Circle based on the given angle.
* @method Phaser.Circle.circumferencePoint
* @param {Phaser.Circle} a - The first Circle object.
* @param {number} angle - The angle in radians (unless asDegrees is true) to return the point from.
* @param {boolean} [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
* @param {Phaser.Point} [out] - An optional Point object to put the result in to. If none specified a new Point object will be created.
* @return {Phaser.Point} The Point object holding the result.
*/
Phaser.Circle.circumferencePoint = function (a, angle, asDegrees, out) {

    if (asDegrees === undefined) { asDegrees = false; }
    if (out === undefined) { out = new Phaser.Point(); }

    if (asDegrees === true)
    {
        angle = Phaser.Math.degToRad(angle);
    }

    out.x = a.x + a.radius * Math.cos(angle);
    out.y = a.y + a.radius * Math.sin(angle);

    return out;

};

/**
* Checks if the given Circle and Rectangle objects intersect.
* @method Phaser.Circle.intersectsRectangle
* @param {Phaser.Circle} c - The Circle object to test.
* @param {Phaser.Rectangle} r - The Rectangle object to test.
* @return {boolean} True if the two objects intersect, otherwise false.
*/
Phaser.Circle.intersectsRectangle = function (c, r) {

    var cx = Math.abs(c.x - r.x - r.halfWidth);
    var xDist = r.halfWidth + c.radius;

    if (cx > xDist)
    {
        return false;
    }

    var cy = Math.abs(c.y - r.y - r.halfHeight);
    var yDist = r.halfHeight + c.radius;

    if (cy > yDist)
    {
        return false;
    }

    if (cx <= r.halfWidth || cy <= r.halfHeight)
    {
        return true;
    }

    var xCornerDist = cx - r.halfWidth;
    var yCornerDist = cy - r.halfHeight;
    var xCornerDistSq = xCornerDist * xCornerDist;
    var yCornerDistSq = yCornerDist * yCornerDist;
    var maxCornerDistSq = c.radius * c.radius;

    return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;

};

//   Because PIXI uses its own Circle, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Circle = Phaser.Circle;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Chad Engler <chad@pantherdev.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a Ellipse object. A curve on a plane surrounding two focal points.
* 
* @class Phaser.Ellipse
* @constructor
* @param {number} [x=0] - The X coordinate of the upper-left corner of the framing rectangle of this ellipse.
* @param {number} [y=0] - The Y coordinate of the upper-left corner of the framing rectangle of this ellipse.
* @param {number} [width=0] - The overall width of this ellipse.
* @param {number} [height=0] - The overall height of this ellipse.
*/
Phaser.Ellipse = function (x, y, width, height) {

    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    /**
    * @property {number} x - The X coordinate of the upper-left corner of the framing rectangle of this ellipse.
    */
    this.x = x;

    /**
    * @property {number} y - The Y coordinate of the upper-left corner of the framing rectangle of this ellipse.
    */
    this.y = y;

    /**
    * @property {number} width - The overall width of this ellipse.
    */
    this.width = width;

    /**
    * @property {number} height - The overall height of this ellipse.
    */
    this.height = height;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.ELLIPSE;

};

Phaser.Ellipse.prototype = {

    /**
    * Sets the members of the Ellipse to the specified values.
    * @method Phaser.Ellipse#setTo
    * @param {number} x - The X coordinate of the upper-left corner of the framing rectangle of this ellipse.
    * @param {number} y - The Y coordinate of the upper-left corner of the framing rectangle of this ellipse.
    * @param {number} width - The overall width of this ellipse.
    * @param {number} height - The overall height of this ellipse.
    * @return {Phaser.Ellipse} This Ellipse object.
    */
    setTo: function (x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;

    },

    /**
    * Returns the framing rectangle of the ellipse as a Phaser.Rectangle object.
    * 
    * @method Phaser.Ellipse#getBounds
    * @return {Phaser.Rectangle} The bounds of the Ellipse.
    */
    getBounds: function () {

        return new Phaser.Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);

    },

    /**
    * Copies the x, y, width and height properties from any given object to this Ellipse.
    * 
    * @method Phaser.Ellipse#copyFrom
    * @param {any} source - The object to copy from.
    * @return {Phaser.Ellipse} This Ellipse object.
    */
    copyFrom: function (source) {

        return this.setTo(source.x, source.y, source.width, source.height);

    },

    /**
    * Copies the x, y, width and height properties from this Ellipse to any given object.
    * @method Phaser.Ellipse#copyTo
    * @param {any} dest - The object to copy to.
    * @return {object} This dest object.
    */
    copyTo: function(dest) {

        dest.x = this.x;
        dest.y = this.y;
        dest.width = this.width;
        dest.height = this.height;

        return dest;

    },

    /**
    * Returns a new Ellipse object with the same values for the x, y, width, and height properties as this Ellipse object.
    * @method Phaser.Ellipse#clone
    * @param {Phaser.Ellipse} output - Optional Ellipse object. If given the values will be set into the object, otherwise a brand new Ellipse object will be created and returned.
    * @return {Phaser.Ellipse} The cloned Ellipse object.
    */
    clone: function(output) {

        if (output === undefined || output === null)
        {
            output = new Phaser.Ellipse(this.x, this.y, this.width, this.height);
        }
        else
        {
            output.setTo(this.x, this.y, this.width, this.height);
        }

        return output;

    },

    /**
    * Return true if the given x/y coordinates are within this Ellipse object.
    * 
    * @method Phaser.Ellipse#contains
    * @param {number} x - The X value of the coordinate to test.
    * @param {number} y - The Y value of the coordinate to test.
    * @return {boolean} True if the coordinates are within this ellipse, otherwise false.
    */
    contains: function (x, y) {

        return Phaser.Ellipse.contains(this, x, y);

    },

    /**
    * Returns a uniformly distributed random point from anywhere within this Ellipse.
    * 
    * @method Phaser.Ellipse#random
    * @param {Phaser.Point|object} [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an existing object.
    * @return {Phaser.Point} An object containing the random point in its `x` and `y` properties.
    */
    random: function (out) {

        if (out === undefined) { out = new Phaser.Point(); }

        var p = Math.random() * Math.PI * 2;
        var r = Math.random();

        out.x = Math.sqrt(r) * Math.cos(p);
        out.y = Math.sqrt(r) * Math.sin(p);

        out.x = this.x + (out.x * this.width / 2.0);
        out.y = this.y + (out.y * this.height / 2.0);

        return out;

    },

    /**
    * Returns a string representation of this object.
    * @method Phaser.Ellipse#toString
    * @return {string} A string representation of the instance.
    */
    toString: function () {
        return "[{Phaser.Ellipse (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")}]";
    }

};

Phaser.Ellipse.prototype.constructor = Phaser.Ellipse;

/**
* The left coordinate of the Ellipse. The same as the X coordinate.
* @name Phaser.Ellipse#left
* @propety {number} left - Gets or sets the value of the leftmost point of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "left", {

    get: function () {
        return this.x;
    },

    set: function (value) {

        this.x = value;

    }

});

/**
* The x coordinate of the rightmost point of the Ellipse. Changing the right property of an Ellipse object has no effect on the x property, but does adjust the width.
* @name Phaser.Ellipse#right
* @property {number} right - Gets or sets the value of the rightmost point of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "right", {

    get: function () {
        return this.x + this.width;
    },

    set: function (value) {

        if (value < this.x)
        {
            this.width = 0;
        }
        else
        {
            this.width = value - this.x;
        }
    }

});

/**
* The top of the Ellipse. The same as its y property.
* @name Phaser.Ellipse#top
* @property {number} top - Gets or sets the top of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "top", {

    get: function () {
        return this.y;
    },

    set: function (value) {
        this.y = value;
    }

});

/**
* The sum of the y and height properties. Changing the bottom property of an Ellipse doesn't adjust the y property, but does change the height.
* @name Phaser.Ellipse#bottom
* @property {number} bottom - Gets or sets the bottom of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "bottom", {

    get: function () {
        return this.y + this.height;
    },

    set: function (value) {

        if (value < this.y)
        {
            this.height = 0;
        }
        else
        {
            this.height = value - this.y;
        }
    }

});

/**
* Determines whether or not this Ellipse object is empty. Will return a value of true if the Ellipse objects dimensions are less than or equal to 0; otherwise false.
* If set to true it will reset all of the Ellipse objects properties to 0. An Ellipse object is empty if its width or height is less than or equal to 0.
* @name Phaser.Ellipse#empty
* @property {boolean} empty - Gets or sets the empty state of the ellipse.
*/
Object.defineProperty(Phaser.Ellipse.prototype, "empty", {

    get: function () {
        return (this.width === 0 || this.height === 0);
    },

    set: function (value) {

        if (value === true)
        {
            this.setTo(0, 0, 0, 0);
        }

    }

});

/**
* Return true if the given x/y coordinates are within the Ellipse object.
* 
* @method Phaser.Ellipse.contains
* @param {Phaser.Ellipse} a - The Ellipse to be checked.
* @param {number} x - The X value of the coordinate to test.
* @param {number} y - The Y value of the coordinate to test.
* @return {boolean} True if the coordinates are within this ellipse, otherwise false.
*/
Phaser.Ellipse.contains = function (a, x, y) {
 
    if (a.width <= 0 || a.height <= 0) {
        return false;
    }
 
    //  Normalize the coords to an ellipse with center 0,0 and a radius of 0.5
    var normx = ((x - a.x) / a.width) - 0.5;
    var normy = ((y - a.y) / a.height) - 0.5;
 
    normx *= normx;
    normy *= normy;
 
    return (normx + normy < 0.25);
 
};

//   Because PIXI uses its own Ellipse, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Ellipse = Phaser.Ellipse;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a new Line object with a start and an end point.
* 
* @class Phaser.Line
* @constructor
* @param {number} [x1=0] - The x coordinate of the start of the line.
* @param {number} [y1=0] - The y coordinate of the start of the line.
* @param {number} [x2=0] - The x coordinate of the end of the line.
* @param {number} [y2=0] - The y coordinate of the end of the line.
*/
Phaser.Line = function (x1, y1, x2, y2) {

    x1 = x1 || 0;
    y1 = y1 || 0;
    x2 = x2 || 0;
    y2 = y2 || 0;

    /**
    * @property {Phaser.Point} start - The start point of the line.
    */
    this.start = new Phaser.Point(x1, y1);

    /**
    * @property {Phaser.Point} end - The end point of the line.
    */
    this.end = new Phaser.Point(x2, y2);

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.LINE;

};

Phaser.Line.prototype = {

    /**
    * Sets the components of the Line to the specified values.
    * 
    * @method Phaser.Line#setTo
    * @param {number} [x1=0] - The x coordinate of the start of the line.
    * @param {number} [y1=0] - The y coordinate of the start of the line.
    * @param {number} [x2=0] - The x coordinate of the end of the line.
    * @param {number} [y2=0] - The y coordinate of the end of the line.
    * @return {Phaser.Line} This line object
    */
    setTo: function (x1, y1, x2, y2) {

        this.start.setTo(x1, y1);
        this.end.setTo(x2, y2);

        return this;

    },

    /**
    * Sets the line to match the x/y coordinates of the two given sprites.
    * Can optionally be calculated from their center coordinates.
    * 
    * @method Phaser.Line#fromSprite
    * @param {Phaser.Sprite} startSprite - The coordinates of this Sprite will be set to the Line.start point.
    * @param {Phaser.Sprite} endSprite - The coordinates of this Sprite will be set to the Line.start point.
    * @param {boolean} [useCenter=false] - If true it will use startSprite.center.x, if false startSprite.x. Note that Sprites don't have a center property by default, so only enable if you've over-ridden your Sprite with a custom class.
    * @return {Phaser.Line} This line object
    */
    fromSprite: function (startSprite, endSprite, useCenter) {

        if (useCenter === undefined) { useCenter = false; }

        if (useCenter)
        {
            return this.setTo(startSprite.center.x, startSprite.center.y, endSprite.center.x, endSprite.center.y);
        }

        return this.setTo(startSprite.x, startSprite.y, endSprite.x, endSprite.y);

    },

    /**
    * Sets this line to start at the given `x` and `y` coordinates and for the segment to extend at `angle` for the given `length`.
    * 
    * @method Phaser.Line#fromAngle
    * @param {number} x - The x coordinate of the start of the line.
    * @param {number} y - The y coordinate of the start of the line.
    * @param {number} angle - The angle of the line in radians.
    * @param {number} length - The length of the line in pixels.
    * @return {Phaser.Line} This line object
    */
    fromAngle: function (x, y, angle, length) {

        this.start.setTo(x, y);
        this.end.setTo(x + (Math.cos(angle) * length), y + (Math.sin(angle) * length));

        return this;

    },

    /**
    * Rotates the line by the amount specified in `angle`.
    * 
    * Rotation takes place from the center of the line.
    * 
    * If you wish to rotate from either end see Line.start.rotate or Line.end.rotate.
    * 
    * @method Phaser.Line#rotate
    * @param {number} angle - The angle in radians (unless asDegrees is true) to rotate the line by.
    * @param {boolean} [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @return {Phaser.Line} This line object
    */
    rotate: function (angle, asDegrees) {

        var x = this.start.x;
        var y = this.start.y;

        this.start.rotate(this.end.x, this.end.y, angle, asDegrees, this.length);
        this.end.rotate(x, y, angle, asDegrees, this.length);

        return this;

    },

    /**
    * Checks for intersection between this line and another Line.
    * If asSegment is true it will check for segment intersection. If asSegment is false it will check for line intersection.
    * Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
    *
    * @method Phaser.Line#intersects
    * @param {Phaser.Line} line - The line to check against this one.
    * @param {boolean} [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
    * @param {Phaser.Point} [result] - A Point object to store the result in, if not given a new one will be created.
    * @return {Phaser.Point} The intersection segment of the two lines as a Point, or null if there is no intersection.
    */
    intersects: function (line, asSegment, result) {

        return Phaser.Line.intersectsPoints(this.start, this.end, line.start, line.end, asSegment, result);

    },

    /**
    * Returns the reflected angle between two lines.
    * This is the outgoing angle based on the angle of this line and the normalAngle of the given line.
    *
    * @method Phaser.Line#reflect
    * @param {Phaser.Line} line - The line to reflect off this line.
    * @return {number} The reflected angle in radians.
    */
    reflect: function (line) {

        return Phaser.Line.reflect(this, line);

    },

    /**
    * Tests if the given coordinates fall on this line. See pointOnSegment to test against just the line segment.
    * 
    * @method Phaser.Line#pointOnLine
    * @param {number} x - The line to check against this one.
    * @param {number} y - The line to check against this one.
    * @return {boolean} True if the point is on the line, false if not.
    */
    pointOnLine: function (x, y) {

        return ((x - this.start.x) * (this.end.y - this.start.y) === (this.end.x - this.start.x) * (y - this.start.y));

    },

    /**
    * Tests if the given coordinates fall on this line and within the segment. See pointOnLine to test against just the line.
    * 
    * @method Phaser.Line#pointOnSegment
    * @param {number} x - The line to check against this one.
    * @param {number} y - The line to check against this one.
    * @return {boolean} True if the point is on the line and segment, false if not.
    */
    pointOnSegment: function (x, y) {

        var xMin = Math.min(this.start.x, this.end.x);
        var xMax = Math.max(this.start.x, this.end.x);
        var yMin = Math.min(this.start.y, this.end.y);
        var yMax = Math.max(this.start.y, this.end.y);

        return (this.pointOnLine(x, y) && (x >= xMin && x <= xMax) && (y >= yMin && y <= yMax));

    },

    /**
    * Picks a random point from anywhere on the Line segment and returns it.
    * 
    * @method Phaser.Line#random
    * @param {Phaser.Point|object} [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an object.
    * @return {Phaser.Point} An object containing the random point in its `x` and `y` properties.
    */
    random: function (out) {

        if (out === undefined) { out = new Phaser.Point(); }

        var t = Math.random();

        out.x = this.start.x + t * (this.end.x - this.start.x);
        out.y = this.start.y + t * (this.end.y - this.start.y);

        return out;

    },

    /**
    * Using Bresenham's line algorithm this will return an array of all coordinates on this line.
    * The start and end points are rounded before this runs as the algorithm works on integers.
    *
    * @method Phaser.Line#coordinatesOnLine
    * @param {number} [stepRate=1] - How many steps will we return? 1 = every coordinate on the line, 2 = every other coordinate, etc.
    * @param {array} [results] - The array to store the results in. If not provided a new one will be generated.
    * @return {array} An array of coordinates.
    */
    coordinatesOnLine: function (stepRate, results) {

        if (stepRate === undefined) { stepRate = 1; }
        if (results === undefined) { results = []; }

        var x1 = Math.round(this.start.x);
        var y1 = Math.round(this.start.y);
        var x2 = Math.round(this.end.x);
        var y2 = Math.round(this.end.y);

        var dx = Math.abs(x2 - x1);
        var dy = Math.abs(y2 - y1);
        var sx = (x1 < x2) ? 1 : -1;
        var sy = (y1 < y2) ? 1 : -1;
        var err = dx - dy;

        results.push([x1, y1]);

        var i = 1;

        while (!((x1 == x2) && (y1 == y2)))
        {
            var e2 = err << 1;

            if (e2 > -dy)
            {
                err -= dy;
                x1 += sx;
            }

            if (e2 < dx)
            {
                err += dx;
                y1 += sy;
            }

            if (i % stepRate === 0)
            {
                results.push([x1, y1]);
            }

            i++;

        }

        return results;

    },

    /**
     * Returns a new Line object with the same values for the start and end properties as this Line object.
     * @method Phaser.Line#clone
     * @param {Phaser.Line} output - Optional Line object. If given the values will be set into the object, otherwise a brand new Line object will be created and returned.
     * @return {Phaser.Line} The cloned Line object.
     */
    clone: function (output) {

        if (output === undefined || output === null)
        {
            output = new Phaser.Line(this.start.x, this.start.y, this.end.x, this.end.y);
        }
        else
        {
            output.setTo(this.start.x, this.start.y, this.end.x, this.end.y);
        }

        return output;

    }

};

/**
* @name Phaser.Line#length
* @property {number} length - Gets the length of the line segment.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "length", {

    get: function () {
        return Math.sqrt((this.end.x - this.start.x) * (this.end.x - this.start.x) + (this.end.y - this.start.y) * (this.end.y - this.start.y));
    }

});

/**
* @name Phaser.Line#angle
* @property {number} angle - Gets the angle of the line in radians.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "angle", {

    get: function () {
        return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
    }

});

/**
* @name Phaser.Line#slope
* @property {number} slope - Gets the slope of the line (y/x).
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "slope", {

    get: function () {
        return (this.end.y - this.start.y) / (this.end.x - this.start.x);
    }

});

/**
* @name Phaser.Line#perpSlope
* @property {number} perpSlope - Gets the perpendicular slope of the line (x/y).
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "perpSlope", {

    get: function () {
        return -((this.end.x - this.start.x) / (this.end.y - this.start.y));
    }

});

/**
* @name Phaser.Line#x
* @property {number} x - Gets the x coordinate of the top left of the bounds around this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "x", {

    get: function () {
        return Math.min(this.start.x, this.end.x);
    }

});

/**
* @name Phaser.Line#y
* @property {number} y - Gets the y coordinate of the top left of the bounds around this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "y", {

    get: function () {
        return Math.min(this.start.y, this.end.y);
    }

});

/**
* @name Phaser.Line#left
* @property {number} left - Gets the left-most point of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "left", {

    get: function () {
        return Math.min(this.start.x, this.end.x);
    }

});

/**
* @name Phaser.Line#right
* @property {number} right - Gets the right-most point of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "right", {

    get: function () {
        return Math.max(this.start.x, this.end.x);
    }

});

/**
* @name Phaser.Line#top
* @property {number} top - Gets the top-most point of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "top", {

    get: function () {
        return Math.min(this.start.y, this.end.y);
    }

});

/**
* @name Phaser.Line#bottom
* @property {number} bottom - Gets the bottom-most point of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "bottom", {

    get: function () {
        return Math.max(this.start.y, this.end.y);
    }

});

/**
* @name Phaser.Line#width
* @property {number} width - Gets the width of this bounds of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "width", {

    get: function () {
        return Math.abs(this.start.x - this.end.x);
    }

});

/**
* @name Phaser.Line#height
* @property {number} height - Gets the height of this bounds of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "height", {

    get: function () {
        return Math.abs(this.start.y - this.end.y);
    }

});

/**
* @name Phaser.Line#normalX
* @property {number} normalX - Gets the x component of the left-hand normal of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "normalX", {

    get: function () {
        return Math.cos(this.angle - 1.5707963267948966);
    }

});

/**
* @name Phaser.Line#normalY
* @property {number} normalY - Gets the y component of the left-hand normal of this line.
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "normalY", {

    get: function () {
        return Math.sin(this.angle - 1.5707963267948966);
    }

});

/**
* @name Phaser.Line#normalAngle
* @property {number} normalAngle - Gets the angle in radians of the normal of this line (line.angle - 90 degrees.)
* @readonly
*/
Object.defineProperty(Phaser.Line.prototype, "normalAngle", {

    get: function () {
        return Phaser.Math.wrap(this.angle - 1.5707963267948966, -Math.PI, Math.PI);
    }

});

/**
* Checks for intersection between two lines as defined by the given start and end points.
* If asSegment is true it will check for line segment intersection. If asSegment is false it will check for line intersection.
* Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
* Adapted from code by Keith Hair
*
* @method Phaser.Line.intersectsPoints
* @param {Phaser.Point} a - The start of the first Line to be checked.
* @param {Phaser.Point} b - The end of the first line to be checked.
* @param {Phaser.Point} e - The start of the second Line to be checked.
* @param {Phaser.Point} f - The end of the second line to be checked.
* @param {boolean} [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
* @param {Phaser.Point|object} [result] - A Point object to store the result in, if not given a new one will be created.
* @return {Phaser.Point} The intersection segment of the two lines as a Point, or null if there is no intersection.
*/
Phaser.Line.intersectsPoints = function (a, b, e, f, asSegment, result) {

    if (asSegment === undefined) { asSegment = true; }
    if (result === undefined) { result = new Phaser.Point(); }

    var a1 = b.y - a.y;
    var a2 = f.y - e.y;
    var b1 = a.x - b.x;
    var b2 = e.x - f.x;
    var c1 = (b.x * a.y) - (a.x * b.y);
    var c2 = (f.x * e.y) - (e.x * f.y);
    var denom = (a1 * b2) - (a2 * b1);

    if (denom === 0)
    {
        return null;
    }

    result.x = ((b1 * c2) - (b2 * c1)) / denom;
    result.y = ((a2 * c1) - (a1 * c2)) / denom;

    if (asSegment)
    {
        var uc = ((f.y - e.y) * (b.x - a.x) - (f.x - e.x) * (b.y - a.y));
        var ua = (((f.x - e.x) * (a.y - e.y)) - (f.y - e.y) * (a.x - e.x)) / uc;
        var ub = (((b.x - a.x) * (a.y - e.y)) - ((b.y - a.y) * (a.x - e.x))) / uc;

        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1)
        {
            return result;
        }
        else
        {
            return null;
        }
    }

    return result;

};

/**
* Checks for intersection between two lines.
* If asSegment is true it will check for segment intersection.
* If asSegment is false it will check for line intersection.
* Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
* Adapted from code by Keith Hair
*
* @method Phaser.Line.intersects
* @param {Phaser.Line} a - The first Line to be checked.
* @param {Phaser.Line} b - The second Line to be checked.
* @param {boolean} [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
* @param {Phaser.Point} [result] - A Point object to store the result in, if not given a new one will be created.
* @return {Phaser.Point} The intersection segment of the two lines as a Point, or null if there is no intersection.
*/
Phaser.Line.intersects = function (a, b, asSegment, result) {

    return Phaser.Line.intersectsPoints(a.start, a.end, b.start, b.end, asSegment, result);

};

/**
* Returns the reflected angle between two lines.
* This is the outgoing angle based on the angle of Line 1 and the normalAngle of Line 2.
*
* @method Phaser.Line.reflect
* @param {Phaser.Line} a - The base line.
* @param {Phaser.Line} b - The line to be reflected from the base line.
* @return {number} The reflected angle in radians.
*/
Phaser.Line.reflect = function (a, b) {

    return 2 * b.normalAngle - 3.141592653589793 - a.angle;

};

/**
* @author       Mat Groves http://matgroves.com/ @Doormat23
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Matrix is a 3x3 matrix mostly used for display transforms within the renderer.
* 
* It is represented like so:
* 
* | a | b | tx |
* | c | d | ty |
* | 0 | 0 | 1 |
*
* @class Phaser.Matrix
* @constructor
* @param {number} [a=1]
* @param {number} [b=0]
* @param {number} [c=0]
* @param {number} [d=1]
* @param {number} [tx=0]
* @param {number} [ty=0]
*/
Phaser.Matrix = function (a, b, c, d, tx, ty) {

    a = a || 1;
    b = b || 0;
    c = c || 0;
    d = d || 1;
    tx = tx || 0;
    ty = ty || 0;

    /**
    * @property {number} a
    * @default 1
    */
    this.a = a;

    /**
    * @property {number} b
    * @default 0
    */
    this.b = b;

    /**
    * @property {number} c
    * @default 0
    */
    this.c = c;

    /**
    * @property {number} d
    * @default 1
    */
    this.d = d;

    /**
    * @property {number} tx
    * @default 0
    */
    this.tx = tx;

    /**
    * @property {number} ty
    * @default 0
    */
    this.ty = ty;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.MATRIX;

};

Phaser.Matrix.prototype = {

    /**
    * Sets the values of this Matrix to the values in the given array.
    * 
    * The Array elements should be set as follows:
    *
    * a = array[0]
    * b = array[1]
    * c = array[3]
    * d = array[4]
    * tx = array[2]
    * ty = array[5]
    *
    * @method Phaser.Matrix#fromArray
    * @param {Array} array - The array to copy from.
    * @return {Phaser.Matrix} This Matrix object.
    */
    fromArray: function (array) {

        return this.setTo(array[0], array[1], array[3], array[4], array[2], array[5]);

    },

    /**
    * Sets the values of this Matrix to the given values.
    *
    * @method Phaser.Matrix#setTo
    * @param {number} a
    * @param {number} b
    * @param {number} c
    * @param {number} d
    * @param {number} tx
    * @param {number} ty
    * @return {Phaser.Matrix} This Matrix object.
    */
    setTo: function (a, b, c, d, tx, ty) {

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;

        return this;

    },

    /**
     * Creates a new Matrix object based on the values of this Matrix.
     * If you provide the output parameter the values of this Matrix will be copied over to it.
     * If the output parameter is blank a new Matrix object will be created.
     *
     * @method Phaser.Matrix#clone
     * @param {Phaser.Matrix} [output] - If provided the values of this Matrix will be copied to it, otherwise a new Matrix object is created.
     * @return {Phaser.Matrix} A clone of this Matrix.
     */
    clone: function (output) {

        if (output === undefined || output === null)
        {
            output = new Phaser.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        }
        else
        {
            output.a = this.a;
            output.b = this.b;
            output.c = this.c;
            output.d = this.d;
            output.tx = this.tx;
            output.ty = this.ty;
        }

        return output;

    },

    /**
    * Copies the properties from this Matrix to the given Matrix.
    *
    * @method Phaser.Matrix#copyTo
    * @param {Phaser.Matrix} matrix - The Matrix to copy from.
    * @return {Phaser.Matrix} The destination Matrix object.
    */
    copyTo: function (matrix) {

        matrix.copyFrom(this);

        return matrix;

    },

    /**
    * Copies the properties from the given Matrix into this Matrix.
    *
    * @method Phaser.Matrix#copyFrom
    * @param {Phaser.Matrix} matrix - The Matrix to copy from.
    * @return {Phaser.Matrix} This Matrix object.
    */
    copyFrom: function (matrix) {

        this.a = matrix.a;
        this.b = matrix.b;
        this.c = matrix.c;
        this.d = matrix.d;
        this.tx = matrix.tx;
        this.ty = matrix.ty;

        return this;

    },

    /**
    * Creates a Float32 Array with values populated from this Matrix object.
    *
    * @method Phaser.Matrix#toArray
    * @param {boolean} [transpose=false] - Whether the values in the array are transposed or not.
    * @param {PIXI.Float32Array} [array] - If provided the values will be set into this array, otherwise a new Float32Array is created.
    * @return {PIXI.Float32Array} The newly created array which contains the matrix.
    */
    toArray: function (transpose, array) {

        if (array === undefined) { array = new PIXI.Float32Array(9); }

        if (transpose)
        {
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        }
        else
        {
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        }

        return array;

    },

    /**
    * Get a new position with the current transformation applied.
    * 
    * Can be used to go from a childs coordinate space to the world coordinate space (e.g. rendering)
    *
    * @method Phaser.Matrix#apply
    * @param {Phaser.Point} pos - The origin Point.
    * @param {Phaser.Point} [newPos] - The point that the new position is assigned to. This can be same as input point.
    * @return {Phaser.Point} The new point, transformed through this matrix.
    */
    apply: function (pos, newPos) {

        if (newPos === undefined) { newPos = new Phaser.Point(); }

        newPos.x = this.a * pos.x + this.c * pos.y + this.tx;
        newPos.y = this.b * pos.x + this.d * pos.y + this.ty;

        return newPos;

    },

    /**
    * Get a new position with the inverse of the current transformation applied.
    * 
    * Can be used to go from the world coordinate space to a childs coordinate space. (e.g. input)
    *
    * @method Phaser.Matrix#applyInverse
    * @param {Phaser.Point} pos - The origin Point.
    * @param {Phaser.Point} [newPos] - The point that the new position is assigned to. This can be same as input point.
    * @return {Phaser.Point} The new point, inverse transformed through this matrix.
    */
    applyInverse: function (pos, newPos) {

        if (newPos === undefined) { newPos = new Phaser.Point(); }

        var id = 1 / (this.a * this.d + this.c * -this.b);
        var x = pos.x;
        var y = pos.y;

        newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
        newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;

        return newPos;

    },

    /**
    * Translates the matrix on the x and y.
    * This is the same as Matrix.tx += x.
    * 
    * @method Phaser.Matrix#translate
    * @param {number} x - The x value to translate on.
    * @param {number} y - The y value to translate on.
    * @return {Phaser.Matrix} This Matrix object.
    */
    translate: function (x, y) {

        this.tx += x;
        this.ty += y;
        
        return this;

    },

    /**
    * Applies a scale transformation to this matrix.
    * 
    * @method Phaser.Matrix#scale
    * @param {number} x - The amount to scale horizontally.
    * @param {number} y - The amount to scale vertically.
    * @return {Phaser.Matrix} This Matrix object.
    */
    scale: function (x, y) {

        this.a *= x;
        this.d *= y;
        this.c *= x;
        this.b *= y;
        this.tx *= x;
        this.ty *= y;

        return this;

    },

    /**
    * Applies a rotation transformation to this matrix.
    * 
    * @method Phaser.Matrix#rotate
    * @param {number} angle - The angle to rotate by, given in radians.
    * @return {Phaser.Matrix} This Matrix object.
    */
    rotate: function (angle) {

        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        var a1 = this.a;
        var c1 = this.c;
        var tx1 = this.tx;

        this.a = a1 * cos-this.b * sin;
        this.b = a1 * sin+this.b * cos;
        this.c = c1 * cos-this.d * sin;
        this.d = c1 * sin+this.d * cos;
        this.tx = tx1 * cos - this.ty * sin;
        this.ty = tx1 * sin + this.ty * cos;
     
        return this;

    },

    /**
    * Appends the given Matrix to this Matrix.
    * 
    * @method Phaser.Matrix#append
    * @param {Phaser.Matrix} matrix - The matrix to append to this one.
    * @return {Phaser.Matrix} This Matrix object.
    */
    append: function (matrix) {

        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;

        this.a  = matrix.a * a1 + matrix.b * c1;
        this.b  = matrix.a * b1 + matrix.b * d1;
        this.c  = matrix.c * a1 + matrix.d * c1;
        this.d  = matrix.c * b1 + matrix.d * d1;

        this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
        this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;
        
        return this;

    },

    /**
    * Resets this Matrix to an identity (default) matrix.
    * 
    * @method Phaser.Matrix#identity
    * @return {Phaser.Matrix} This Matrix object.
    */
    identity: function () {

        return this.setTo(1, 0, 0, 1, 0, 0);

    }

};

Phaser.identityMatrix = new Phaser.Matrix();

//  Because PIXI uses its own type, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Matrix = Phaser.Matrix;
PIXI.identityMatrix = Phaser.identityMatrix;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* A Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
* The following code creates a point at (0,0):
* `var myPoint = new Phaser.Point();`
* You can also use them as 2D Vectors and you'll find different vector related methods in this class.
* 
* @class Phaser.Point
* @constructor
* @param {number} [x=0] - The horizontal position of this Point.
* @param {number} [y=0] - The vertical position of this Point.
*/
Phaser.Point = function (x, y) {

    x = x || 0;
    y = y || 0;

    /**
    * @property {number} x - The x value of the point.
    */
    this.x = x;

    /**
    * @property {number} y - The y value of the point.
    */
    this.y = y;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.POINT;

};

Phaser.Point.prototype = {

    /**
    * Copies the x and y properties from any given object to this Point.
    *
    * @method Phaser.Point#copyFrom
    * @param {any} source - The object to copy from.
    * @return {Phaser.Point} This Point object.
    */
    copyFrom: function (source) {

        return this.setTo(source.x, source.y);

    },

    /**
    * Inverts the x and y values of this Point
    *
    * @method Phaser.Point#invert
    * @return {Phaser.Point} This Point object.
    */
    invert: function () {

        return this.setTo(this.y, this.x);

    },

    /**
    * Sets the `x` and `y` values of this Point object to the given values.
    * If you omit the `y` value then the `x` value will be applied to both, for example:
    * `Point.setTo(2)` is the same as `Point.setTo(2, 2)`
    *
    * @method Phaser.Point#setTo
    * @param {number} x - The horizontal value of this point.
    * @param {number} [y] - The vertical value of this point. If not given the x value will be used in its place.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    */
    setTo: function (x, y) {

        this.x = x || 0;
        this.y = y || ( (y !== 0) ? this.x : 0 );

        return this;

    },

    /**
    * Sets the `x` and `y` values of this Point object to the given values.
    * If you omit the `y` value then the `x` value will be applied to both, for example:
    * `Point.set(2)` is the same as `Point.set(2, 2)`
    *
    * @method Phaser.Point#set
    * @param {number} x - The horizontal value of this point.
    * @param {number} [y] - The vertical value of this point. If not given the x value will be used in its place.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    */
    set: function (x, y) {

        this.x = x || 0;
        this.y = y || ( (y !== 0) ? this.x : 0 );

        return this;

    },

    /**
    * Adds the given x and y values to this Point.
    *
    * @method Phaser.Point#add
    * @param {number} x - The value to add to Point.x.
    * @param {number} y - The value to add to Point.y.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    */
    add: function (x, y) {

        this.x += x;
        this.y += y;
        return this;

    },

    /**
    * Subtracts the given x and y values from this Point.
    *
    * @method Phaser.Point#subtract
    * @param {number} x - The value to subtract from Point.x.
    * @param {number} y - The value to subtract from Point.y.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    */
    subtract: function (x, y) {

        this.x -= x;
        this.y -= y;
        return this;

    },

    /**
    * Multiplies Point.x and Point.y by the given x and y values. Sometimes known as `Scale`.
    *
    * @method Phaser.Point#multiply
    * @param {number} x - The value to multiply Point.x by.
    * @param {number} y - The value to multiply Point.x by.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    */
    multiply: function (x, y) {

        this.x *= x;
        this.y *= y;
        return this;

    },

    /**
    * Divides Point.x and Point.y by the given x and y values.
    *
    * @method Phaser.Point#divide
    * @param {number} x - The value to divide Point.x by.
    * @param {number} y - The value to divide Point.x by.
    * @return {Phaser.Point} This Point object. Useful for chaining method calls.
    */
    divide: function (x, y) {

        this.x /= x;
        this.y /= y;
        return this;

    },

    /**
    * Clamps the x value of this Point to be between the given min and max.
    *
    * @method Phaser.Point#clampX
    * @param {number} min - The minimum value to clamp this Point to.
    * @param {number} max - The maximum value to clamp this Point to.
    * @return {Phaser.Point} This Point object.
    */
    clampX: function (min, max) {

        this.x = Phaser.Math.clamp(this.x, min, max);
        return this;

    },

    /**
    * Clamps the y value of this Point to be between the given min and max
    *
    * @method Phaser.Point#clampY
    * @param {number} min - The minimum value to clamp this Point to.
    * @param {number} max - The maximum value to clamp this Point to.
    * @return {Phaser.Point} This Point object.
    */
    clampY: function (min, max) {

        this.y = Phaser.Math.clamp(this.y, min, max);
        return this;

    },

    /**
    * Clamps this Point object values to be between the given min and max.
    *
    * @method Phaser.Point#clamp
    * @param {number} min - The minimum value to clamp this Point to.
    * @param {number} max - The maximum value to clamp this Point to.
    * @return {Phaser.Point} This Point object.
    */
    clamp: function (min, max) {

        this.x = Phaser.Math.clamp(this.x, min, max);
        this.y = Phaser.Math.clamp(this.y, min, max);
        return this;

    },

    /**
    * Creates a copy of the given Point.
    *
    * @method Phaser.Point#clone
    * @param {Phaser.Point} [output] Optional Point object. If given the values will be set into this object, otherwise a brand new Point object will be created and returned.
    * @return {Phaser.Point} The new Point object.
    */
    clone: function (output) {

        if (output === undefined || output === null)
        {
            output = new Phaser.Point(this.x, this.y);
        }
        else
        {
            output.setTo(this.x, this.y);
        }

        return output;

    },

    /**
    * Copies the x and y properties from this Point to any given object.
    *
    * @method Phaser.Point#copyTo
    * @param {any} dest - The object to copy to.
    * @return {object} The dest object.
    */
    copyTo: function (dest) {

        dest.x = this.x;
        dest.y = this.y;

        return dest;

    },

    /**
    * Returns the distance of this Point object to the given object (can be a Circle, Point or anything with x/y properties)
    *
    * @method Phaser.Point#distance
    * @param {object} dest - The target object. Must have visible x and y properties that represent the center of the object.
    * @param {boolean} [round] - Round the distance to the nearest integer (default false).
    * @return {number} The distance between this Point object and the destination Point object.
    */
    distance: function (dest, round) {

        return Phaser.Point.distance(this, dest, round);

    },

    /**
    * Determines whether the given objects x/y values are equal to this Point object.
    *
    * @method Phaser.Point#equals
    * @param {Phaser.Point|any} a - The object to compare with this Point.
    * @return {boolean} A value of true if the x and y points are equal, otherwise false.
    */
    equals: function (a) {

        return (a.x === this.x && a.y === this.y);

    },

    /**
    * Returns the angle between this Point object and another object with public x and y properties.
    *
    * @method Phaser.Point#angle
    * @param {Phaser.Point|any} a - The object to get the angle from this Point to.
    * @param {boolean} [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @return {number} The angle between the two objects.
    */
    angle: function (a, asDegrees) {

        if (asDegrees === undefined) { asDegrees = false; }

        if (asDegrees)
        {
            return Phaser.Math.radToDeg(Math.atan2(a.y - this.y, a.x - this.x));
        }
        else
        {
            return Math.atan2(a.y - this.y, a.x - this.x);
        }

    },

    /**
    * Rotates this Point around the x/y coordinates given to the desired angle.
    *
    * @method Phaser.Point#rotate
    * @param {number} x - The x coordinate of the anchor point.
    * @param {number} y - The y coordinate of the anchor point.
    * @param {number} angle - The angle in radians (unless asDegrees is true) to rotate the Point to.
    * @param {boolean} [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
    * @param {number} [distance] - An optional distance constraint between the Point and the anchor.
    * @return {Phaser.Point} The modified point object.
    */
    rotate: function (x, y, angle, asDegrees, distance) {

        return Phaser.Point.rotate(this, x, y, angle, asDegrees, distance);

    },

    /**
    * Calculates the length of the Point object.
    *
    * @method Phaser.Point#getMagnitude
    * @return {number} The length of the Point.
    */
    getMagnitude: function () {

        return Math.sqrt((this.x * this.x) + (this.y * this.y));

    },

    /**
    * Calculates the length squared of the Point object.
    *
    * @method Phaser.Point#getMagnitudeSq
    * @return {number} The length ^ 2 of the Point.
    */
    getMagnitudeSq: function () {

        return (this.x * this.x) + (this.y * this.y);

    },

    /**
    * Alters the length of the Point without changing the direction.
    *
    * @method Phaser.Point#setMagnitude
    * @param {number} magnitude - The desired magnitude of the resulting Point.
    * @return {Phaser.Point} This Point object.
    */
    setMagnitude: function (magnitude) {

        return this.normalize().multiply(magnitude, magnitude);

    },

    /**
    * Alters the Point object so that its length is 1, but it retains the same direction.
    *
    * @method Phaser.Point#normalize
    * @return {Phaser.Point} This Point object.
    */
    normalize: function () {

        if (!this.isZero())
        {
            var m = this.getMagnitude();
            this.x /= m;
            this.y /= m;
        }

        return this;

    },

    /**
    * Determine if this point is at 0,0.
    *
    * @method Phaser.Point#isZero
    * @return {boolean} True if this Point is 0,0, otherwise false.
    */
    isZero: function () {

        return (this.x === 0 && this.y === 0);

    },

    /**
    * The dot product of this and another Point object.
    * 
    * @method Phaser.Point#dot
    * @param {Phaser.Point} a - The Point object to get the dot product combined with this Point.
    * @return {number} The result.
    */
    dot: function (a) {

        return ((this.x * a.x) + (this.y * a.y));

    },

    /**
    * The cross product of this and another Point object.
    * 
    * @method Phaser.Point#cross
    * @param {Phaser.Point} a - The Point object to get the cross product combined with this Point.
    * @return {number} The result.
    */
    cross: function (a) {

        return ((this.x * a.y) - (this.y * a.x));

    },

    /**
    * Make this Point perpendicular (90 degrees rotation)
    * 
    * @method Phaser.Point#perp
    * @return {Phaser.Point} This Point object.
    */
    perp: function () {

        return this.setTo(-this.y, this.x);

    },

    /**
    * Make this Point perpendicular (-90 degrees rotation)
    * 
    * @method Phaser.Point#rperp
    * @return {Phaser.Point} This Point object.
    */
    rperp: function () {

        return this.setTo(this.y, -this.x);

    },

    /**
    * Right-hand normalize (make unit length) this Point.
    *
    * @method Phaser.Point#normalRightHand
    * @return {Phaser.Point} This Point object.
    */
    normalRightHand: function () {

        return this.setTo(this.y * -1, this.x);

    },

    /**
    * Math.floor() both the x and y properties of this Point.
    *
    * @method Phaser.Point#floor
    * @return {Phaser.Point} This Point object.
    */
    floor: function () {

        return this.setTo(Math.floor(this.x), Math.floor(this.y));

    },

    /**
    * Math.ceil() both the x and y properties of this Point.
    *
    * @method Phaser.Point#ceil
    * @return {Phaser.Point} This Point object.
    */
    ceil: function () {

        return this.setTo(Math.ceil(this.x), Math.ceil(this.y));

    },

    /**
    * Returns a string representation of this object.
    *
    * @method Phaser.Point#toString
    * @return {string} A string representation of the instance.
    */
    toString: function () {

        return '[{Point (x=' + this.x + ' y=' + this.y + ')}]';

    }

};

Phaser.Point.prototype.constructor = Phaser.Point;

/**
* Adds the coordinates of two points together to create a new point.
*
* @method Phaser.Point.add
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.add = function (a, b, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    out.x = a.x + b.x;
    out.y = a.y + b.y;

    return out;

};

/**
* Subtracts the coordinates of two points to create a new point.
*
* @method Phaser.Point.subtract
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.subtract = function (a, b, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    out.x = a.x - b.x;
    out.y = a.y - b.y;

    return out;

};

/**
* Multiplies the coordinates of two points to create a new point.
*
* @method Phaser.Point.multiply
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.multiply = function (a, b, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    out.x = a.x * b.x;
    out.y = a.y * b.y;

    return out;

};

/**
* Divides the coordinates of two points to create a new point.
*
* @method Phaser.Point.divide
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.divide = function (a, b, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    out.x = a.x / b.x;
    out.y = a.y / b.y;

    return out;

};

/**
* Determines whether the two given Point objects are equal. They are considered equal if they have the same x and y values.
*
* @method Phaser.Point.equals
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @return {boolean} A value of true if the Points are equal, otherwise false.
*/
Phaser.Point.equals = function (a, b) {

    return (a.x === b.x && a.y === b.y);

};

/**
* Returns the angle between two Point objects.
*
* @method Phaser.Point.angle
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @return {number} The angle between the two Points.
*/
Phaser.Point.angle = function (a, b) {

    // return Math.atan2(a.x * b.y - a.y * b.x, a.x * b.x + a.y * b.y);
    return Math.atan2(a.y - b.y, a.x - b.x);

};

/**
* Creates a negative Point.
*
* @method Phaser.Point.negative
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.negative = function (a, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    return out.setTo(-a.x, -a.y);

};

/**
* Adds two 2D Points together and multiplies the result by the given scalar.
* 
* @method Phaser.Point.multiplyAdd
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {number} s - The scaling value.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.multiplyAdd = function (a, b, s, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    return out.setTo(a.x + b.x * s, a.y + b.y * s);

};

/**
* Interpolates the two given Points, based on the `f` value (between 0 and 1) and returns a new Point.
* 
* @method Phaser.Point.interpolate
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {number} f - The level of interpolation between the two points. Indicates where the new point will be, along the line between pt1 and pt2. If f=1, pt1 is returned; if f=0, pt2 is returned.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.interpolate = function (a, b, f, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    return out.setTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);

};

/**
* Return a perpendicular vector (90 degrees rotation)
*
* @method Phaser.Point.perp
* @param {Phaser.Point} a - The Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.perp = function (a, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    return out.setTo(-a.y, a.x);

};

/**
* Return a perpendicular vector (-90 degrees rotation)
*
* @method Phaser.Point.rperp
* @param {Phaser.Point} a - The Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.rperp = function (a, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    return out.setTo(a.y, -a.x);

};

/**
* Returns the euclidian distance of this Point object to the given object (can be a Circle, Point or anything with x/y properties).
*
* @method Phaser.Point.distance
* @param {object} a - The target object. Must have visible x and y properties that represent the center of the object.
* @param {object} b - The target object. Must have visible x and y properties that represent the center of the object.
* @param {boolean} [round=false] - Round the distance to the nearest integer.
* @return {number} The distance between this Point object and the destination Point object.
*/
Phaser.Point.distance = function (a, b, round) {

    var distance = Phaser.Math.distance(a.x, a.y, b.x, b.y);
    return round ? Math.round(distance) : distance;

};

/**
* Project two Points onto another Point.
* 
* @method Phaser.Point.project
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.project = function (a, b, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    var amt = a.dot(b) / b.getMagnitudeSq();

    if (amt !== 0)
    {
        out.setTo(amt * b.x, amt * b.y);
    }

    return out;

};

/**
* Project two Points onto a Point of unit length.
* 
* @method Phaser.Point.projectUnit
* @param {Phaser.Point} a - The first Point object.
* @param {Phaser.Point} b - The second Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.projectUnit = function (a, b, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    var amt = a.dot(b);

    if (amt !== 0)
    {
        out.setTo(amt * b.x, amt * b.y);
    }

    return out;

};

/**
* Right-hand normalize (make unit length) a Point.
*
* @method Phaser.Point.normalRightHand
* @param {Phaser.Point} a - The Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.normalRightHand = function (a, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    return out.setTo(a.y * -1, a.x);

};

/**
* Normalize (make unit length) a Point.
*
* @method Phaser.Point.normalize
* @param {Phaser.Point} a - The Point object.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.normalize = function (a, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    var m = a.getMagnitude();

    if (m !== 0)
    {
        out.setTo(a.x / m, a.y / m);
    }

    return out;

};

/**
* Rotates a Point object, or any object with exposed x/y properties, around the given coordinates by
* the angle specified. If the angle between the point and coordinates was 45 deg and the angle argument
* is 45 deg then the resulting angle will be 90 deg, as the angle argument is added to the current angle.
*
* The distance allows you to specify a distance constraint for the rotation between the point and the 
* coordinates. If none is given the distance between the two is calculated and used.
*
* @method Phaser.Point.rotate
* @param {Phaser.Point} a - The Point object to rotate.
* @param {number} x - The x coordinate of the anchor point
* @param {number} y - The y coordinate of the anchor point
* @param {number} angle - The angle in radians (unless asDegrees is true) to rotate the Point by.
* @param {boolean} [asDegrees=false] - Is the given angle in radians (false) or degrees (true)?
* @param {number} [distance] - An optional distance constraint between the Point and the anchor.
* @return {Phaser.Point} The modified point object.
*/
Phaser.Point.rotate = function (a, x, y, angle, asDegrees, distance) {

    if (asDegrees === undefined) { asDegrees = false; }
    if (distance === undefined) { distance = null; }

    if (asDegrees)
    {
        angle = Phaser.Math.degToRad(angle);
    }

    if (distance === null)
    {
        //  Get distance from origin (cx/cy) to this point
        distance = Math.sqrt(((x - a.x) * (x - a.x)) + ((y - a.y) * (y - a.y)));
    }

    var t = angle + Math.atan2(a.y - y, a.x - x);

    a.x = x + distance * Math.cos(t);
    a.y = y + distance * Math.sin(t);

    return a;

};

/**
* Calculates centroid (or midpoint) from an array of points. If only one point is provided, that point is returned.
*
* @method Phaser.Point.centroid
* @param {Phaser.Point[]} points - The array of one or more points.
* @param {Phaser.Point} [out] - Optional Point to store the value in, if not supplied a new Point object will be created.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.centroid = function (points, out) {

    if (out === undefined) { out = new Phaser.Point(); }

    if (Object.prototype.toString.call(points) !== '[object Array]')
    {
        throw new Error("Phaser.Point. Parameter 'points' must be an array");
    }

    var pointslength = points.length;

    if (pointslength < 1)
    {
        throw new Error("Phaser.Point. Parameter 'points' array must not be empty");
    }

    if (pointslength === 1)
    {
        out.copyFrom(points[0]);
        return out;
    }

    for (var i = 0; i < pointslength; i++)
    {
        Phaser.Point.add(out, points[i], out);
    }

    out.divide(pointslength, pointslength);

    return out;

};

/**
* Parses an object for x and/or y properties and returns a new Phaser.Point with matching values.
* If the object doesn't contain those properties a Point with x/y of zero will be returned.
*
* @method Phaser.Point.parse
* @static
* @param {object} obj - The object to parse.
* @param {string} [xProp='x'] - The property used to set the Point.x value.
* @param {string} [yProp='y'] - The property used to set the Point.y value.
* @return {Phaser.Point} The new Point object.
*/
Phaser.Point.parse = function(obj, xProp, yProp) {

    xProp = xProp || 'x';
    yProp = yProp || 'y';

    var point = new Phaser.Point();

    if (obj[xProp])
    {
        point.x = parseInt(obj[xProp], 10);
    }

    if (obj[yProp])
    {
        point.y = parseInt(obj[yProp], 10);
    }

    return point;

};

//   Because PIXI uses its own Point, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Point = Phaser.Point;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @author       Adrien Brault <adrien.brault@gmail.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a new Polygon.
* 
* The points can be set from a variety of formats:
*
* - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
* - An array of objects with public x/y properties: `[obj1, obj2, ...]`
* - An array of paired numbers that represent point coordinates: `[x1,y1, x2,y2, ...]`
* - As separate Point arguments: `setTo(new Phaser.Point(x1, y1), ...)`
* - As separate objects with public x/y properties arguments: `setTo(obj1, obj2, ...)`
* - As separate arguments representing point coordinates: `setTo(x1,y1, x2,y2, ...)`
*
* @class Phaser.Polygon
* @constructor
* @param {Phaser.Point[]|number[]|...Phaser.Point|...number} points - The points to set.
*/
Phaser.Polygon = function () {

    /**
    * @property {number} area - The area of this Polygon.
    */
    this.area = 0;

    /**
    * @property {array} _points - An array of Points that make up this Polygon.
    * @private
    */
    this._points = [];

    if (arguments.length > 0)
    {
        this.setTo.apply(this, arguments);
    }

    /**
    * @property {boolean} closed - Is the Polygon closed or not?
    */
    this.closed = true;

    /**
     * @property {number} type - The base object type.
     */
    this.type = Phaser.POLYGON;

};

Phaser.Polygon.prototype = {

    /**
     * Export the points as an array of flat numbers, following the sequence [ x,y, x,y, x,y ]
     *
     * @method Phaser.Polygon#toNumberArray
     * @param {array} [output] - The array to append the points to. If not specified a new array will be created.
     * @return {array} The flattened array.
     */
    toNumberArray: function (output) {

        if (output === undefined) { output = []; }

        for (var i = 0; i < this._points.length; i++)
        {
            if (typeof this._points[i] === 'number')
            {
                output.push(this._points[i]);
                output.push(this._points[i + 1]);
                i++;
            }
            else
            {
                output.push(this._points[i].x);
                output.push(this._points[i].y);
            }
        }

        return output;

    },

    /**
     * Flattens this Polygon so the points are a sequence of numbers. Any Point objects found are removed and replaced with two numbers.
     *
     * @method Phaser.Polygon#flatten
     * @return {Phaser.Polygon} This Polygon object
     */
    flatten: function () {

        this._points = this.toNumberArray();

        return this;

    },

    /**
     * Creates a copy of the given Polygon.
     * This is a deep clone, the resulting copy contains new Phaser.Point objects
     *
     * @method Phaser.Polygon#clone
     * @param {Phaser.Polygon} [output=(new Polygon)] - The polygon to update. If not specified a new polygon will be created.
     * @return {Phaser.Polygon} The cloned (`output`) polygon object.
     */
    clone: function (output) {

        var points = this._points.slice();

        if (output === undefined || output === null)
        {
            output = new Phaser.Polygon(points);
        }
        else
        {
            output.setTo(points);
        }

        return output;

    },

    /**
    * Checks whether the x and y coordinates are contained within this polygon.
    *
    * @method Phaser.Polygon#contains
    * @param {number} x - The X value of the coordinate to test.
    * @param {number} y - The Y value of the coordinate to test.
    * @return {boolean} True if the coordinates are within this polygon, otherwise false.
    */
    contains: function (x, y) {

        //  Adapted from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html by Jonas Raoni Soares Silva

        var length = this._points.length;
        var inside = false;

        for (var i = -1, j = length - 1; ++i < length; j = i)
        {
            var ix = this._points[i].x;
            var iy = this._points[i].y;

            var jx = this._points[j].x;
            var jy = this._points[j].y;

            if (((iy <= y && y < jy) || (jy <= y && y < iy)) && (x < (jx - ix) * (y - iy) / (jy - iy) + ix))
            {
                inside = !inside;
            }
        }

        return inside;

    },

    /**
     * Sets this Polygon to the given points.
     *
     * The points can be set from a variety of formats:
     *
     * - An array of Point objects: `[new Phaser.Point(x1, y1), ...]`
     * - An array of objects with public x/y properties: `[obj1, obj2, ...]`
     * - An array of paired numbers that represent point coordinates: `[x1,y1, x2,y2, ...]`
     * - As separate Point arguments: `setTo(new Phaser.Point(x1, y1), ...)`
     * - As separate objects with public x/y properties arguments: `setTo(obj1, obj2, ...)`
     * - As separate arguments representing point coordinates: `setTo(x1,y1, x2,y2, ...)`
     *
     * `setTo` may also be called without any arguments to remove all points.
     *
     * @method Phaser.Polygon#setTo
     * @param {Phaser.Point[]|number[]|...Phaser.Point|...number} points - The points to set.
     * @return {Phaser.Polygon} This Polygon object
     */
    setTo: function (points) {

        this.area = 0;
        this._points = [];

        if (arguments.length > 0)
        {
            //  If points isn't an array, use arguments as the array
            if (!Array.isArray(points))
            {
                points = Array.prototype.slice.call(arguments);
            }

            var y0 = Number.MAX_VALUE;

            //  Allows for mixed-type arguments
            for (var i = 0, len = points.length; i < len; i++)
            {
                if (typeof points[i] === 'number')
                {
                    var p = new PIXI.Point(points[i], points[i + 1]);
                    i++;
                }
                else
                {
                    var p = new PIXI.Point(points[i].x, points[i].y);
                }

                this._points.push(p);

                //  Lowest boundary
                if (p.y < y0)
                {
                    y0 = p.y;
                }
            }

            this.calculateArea(y0);
        }

        return this;

    },

    /**
     * Calcuates the area of the Polygon. This is available in the property Polygon.area
     *
     * @method Phaser.Polygon#calculateArea
     * @private
     * @param {number} y0 - The lowest boundary
     * @return {number} The area of the Polygon.
     */
    calculateArea: function (y0) {

        var p1;
        var p2;
        var avgHeight;
        var width;

        for (var i = 0, len = this._points.length; i < len; i++)
        {
            p1 = this._points[i];

            if (i === len - 1)
            {
                p2 = this._points[0];
            }
            else
            {
                p2 = this._points[i + 1];
            }

            avgHeight = ((p1.y - y0) + (p2.y - y0)) / 2;
            width = p1.x - p2.x;
            this.area += avgHeight * width;
        }

        return this.area;

    }

};

Phaser.Polygon.prototype.constructor = Phaser.Polygon;

/**
* Sets and modifies the points of this polygon.
*
* See {@link Phaser.Polygon#setTo setTo} for the different kinds of arrays formats that can be assigned.
*
* @name Phaser.Polygon#points
* @property {Phaser.Point[]} points - The array of vertex points.
* @deprecated Use `setTo`.
*/
Object.defineProperty(Phaser.Polygon.prototype, 'points', {

    get: function() {
        return this._points;
    },

    set: function(points) {

        if (points != null)
        {
            this.setTo(points);
        }
        else
        {
            //  Clear the points
            this.setTo();
        }

    }

});

//  Because PIXI uses its own type, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Polygon = Phaser.Polygon;

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified width and height parameters.
* If you call this function without parameters, a Rectangle with x, y, width, and height properties set to 0 is created.
*
* @class Phaser.Rectangle
* @constructor
* @param {number} x - The x coordinate of the top-left corner of the Rectangle.
* @param {number} y - The y coordinate of the top-left corner of the Rectangle.
* @param {number} width - The width of the Rectangle. Should always be either zero or a positive value.
* @param {number} height - The height of the Rectangle. Should always be either zero or a positive value.
*/
Phaser.Rectangle = function (x, y, width, height) {

    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    /**
    * @property {number} x - The x coordinate of the top-left corner of the Rectangle.
    */
    this.x = x;

    /**
    * @property {number} y - The y coordinate of the top-left corner of the Rectangle.
    */
    this.y = y;

    /**
    * @property {number} width - The width of the Rectangle. This value should never be set to a negative.
    */
    this.width = width;

    /**
    * @property {number} height - The height of the Rectangle. This value should never be set to a negative.
    */
    this.height = height;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.RECTANGLE;

};

Phaser.Rectangle.prototype = {

    /**
    * Adjusts the location of the Rectangle object, as determined by its top-left corner, by the specified amounts.
    * @method Phaser.Rectangle#offset
    * @param {number} dx - Moves the x value of the Rectangle object by this amount.
    * @param {number} dy - Moves the y value of the Rectangle object by this amount.
    * @return {Phaser.Rectangle} This Rectangle object.
    */
    offset: function (dx, dy) {

        this.x += dx;
        this.y += dy;

        return this;

    },

    /**
    * Adjusts the location of the Rectangle object using a Point object as a parameter. This method is similar to the Rectangle.offset() method, except that it takes a Point object as a parameter.
    * @method Phaser.Rectangle#offsetPoint
    * @param {Phaser.Point} point - A Point object to use to offset this Rectangle object.
    * @return {Phaser.Rectangle} This Rectangle object.
    */
    offsetPoint: function (point) {

        return this.offset(point.x, point.y);

    },

    /**
    * Sets the members of Rectangle to the specified values.
    * @method Phaser.Rectangle#setTo
    * @param {number} x - The x coordinate of the top-left corner of the Rectangle.
    * @param {number} y - The y coordinate of the top-left corner of the Rectangle.
    * @param {number} width - The width of the Rectangle. Should always be either zero or a positive value.
    * @param {number} height - The height of the Rectangle. Should always be either zero or a positive value.
    * @return {Phaser.Rectangle} This Rectangle object
    */
    setTo: function (x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;

    },

    /**
    * Scales the width and height of this Rectangle by the given amounts.
    * 
    * @method Phaser.Rectangle#scale
    * @param {number} x - The amount to scale the width of the Rectangle by. A value of 0.5 would reduce by half, a value of 2 would double the width, etc.
    * @param {number} [y] - The amount to scale the height of the Rectangle by. A value of 0.5 would reduce by half, a value of 2 would double the height, etc.
    * @return {Phaser.Rectangle} This Rectangle object
    */
    scale: function (x, y) {

        if (y === undefined) { y = x; }

        this.width *= x;
        this.height *= y;

        return this;

    },

    /**
    * Centers this Rectangle so that the center coordinates match the given x and y values.
    *
    * @method Phaser.Rectangle#centerOn
    * @param {number} x - The x coordinate to place the center of the Rectangle at.
    * @param {number} y - The y coordinate to place the center of the Rectangle at.
    * @return {Phaser.Rectangle} This Rectangle object
    */
    centerOn: function (x, y) {

        this.centerX = x;
        this.centerY = y;

        return this;

    },

    /**
    * Runs Math.floor() on both the x and y values of this Rectangle.
    * @method Phaser.Rectangle#floor
    */
    floor: function () {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

    },

    /**
    * Runs Math.floor() on the x, y, width and height values of this Rectangle.
    * @method Phaser.Rectangle#floorAll
    */
    floorAll: function () {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);

    },

    /**
    * Runs Math.ceil() on both the x and y values of this Rectangle.
    * @method Phaser.Rectangle#ceil
    */
    ceil: function () {

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

    },

    /**
    * Runs Math.ceil() on the x, y, width and height values of this Rectangle.
    * @method Phaser.Rectangle#ceilAll
    */
    ceilAll: function () {

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);

    },

    /**
    * Copies the x, y, width and height properties from any given object to this Rectangle.
    * @method Phaser.Rectangle#copyFrom
    * @param {any} source - The object to copy from.
    * @return {Phaser.Rectangle} This Rectangle object.
    */
    copyFrom: function (source) {

        return this.setTo(source.x, source.y, source.width, source.height);

    },

    /**
    * Copies the x, y, width and height properties from this Rectangle to any given object.
    * @method Phaser.Rectangle#copyTo
    * @param {any} source - The object to copy to.
    * @return {object} This object.
    */
    copyTo: function (dest) {

        dest.x = this.x;
        dest.y = this.y;
        dest.width = this.width;
        dest.height = this.height;

        return dest;

    },

    /**
    * Increases the size of the Rectangle object by the specified amounts. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
    * @method Phaser.Rectangle#inflate
    * @param {number} dx - The amount to be added to the left side of the Rectangle.
    * @param {number} dy - The amount to be added to the bottom side of the Rectangle.
    * @return {Phaser.Rectangle} This Rectangle object.
    */
    inflate: function (dx, dy) {

        return Phaser.Rectangle.inflate(this, dx, dy);

    },

    /**
    * The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
    * @method Phaser.Rectangle#size
    * @param {Phaser.Point} [output] - Optional Point object. If given the values will be set into the object, otherwise a brand new Point object will be created and returned.
    * @return {Phaser.Point} The size of the Rectangle object.
    */
    size: function (output) {

        return Phaser.Rectangle.size(this, output);

    },

    /**
    * Resize the Rectangle by providing a new width and height.
    * The x and y positions remain unchanged.
    * 
    * @method Phaser.Rectangle#resize
    * @param {number} width - The width of the Rectangle. Should always be either zero or a positive value.
    * @param {number} height - The height of the Rectangle. Should always be either zero or a positive value.
    * @return {Phaser.Rectangle} This Rectangle object
    */
    resize: function (width, height) {

        this.width = width;
        this.height = height;

        return this;

    },

    /**
    * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
    * @method Phaser.Rectangle#clone
    * @param {Phaser.Rectangle} [output] - Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
    * @return {Phaser.Rectangle}
    */
    clone: function (output) {

        return Phaser.Rectangle.clone(this, output);

    },

    /**
    * Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
    * @method Phaser.Rectangle#contains
    * @param {number} x - The x coordinate of the point to test.
    * @param {number} y - The y coordinate of the point to test.
    * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
    */
    contains: function (x, y) {

        return Phaser.Rectangle.contains(this, x, y);

    },

    /**
    * Determines whether the first Rectangle object is fully contained within the second Rectangle object.
    * A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
    * @method Phaser.Rectangle#containsRect
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
    */
    containsRect: function (b) {

        return Phaser.Rectangle.containsRect(b, this);

    },

    /**
    * Determines whether the two Rectangles are equal.
    * This method compares the x, y, width and height properties of each Rectangle.
    * @method Phaser.Rectangle#equals
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @return {boolean} A value of true if the two Rectangles have exactly the same values for the x, y, width and height properties; otherwise false.
    */
    equals: function (b) {

        return Phaser.Rectangle.equals(this, b);

    },

    /**
    * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the Rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
    * @method Phaser.Rectangle#intersection
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @param {Phaser.Rectangle} out - Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
    * @return {Phaser.Rectangle} A Rectangle object that equals the area of intersection. If the Rectangles do not intersect, this method returns an empty Rectangle object; that is, a Rectangle with its x, y, width, and height properties set to 0.
    */
    intersection: function (b, out) {

        return Phaser.Rectangle.intersection(this, b, out);

    },

    /**
    * Determines whether this Rectangle and another given Rectangle intersect with each other.
    * This method checks the x, y, width, and height properties of the two Rectangles.
    * 
    * @method Phaser.Rectangle#intersects
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
    */
    intersects: function (b) {

        return Phaser.Rectangle.intersects(this, b);

    },

    /**
    * Determines whether the coordinates given intersects (overlaps) with this Rectangle.
    *
    * @method Phaser.Rectangle#intersectsRaw
    * @param {number} left - The x coordinate of the left of the area.
    * @param {number} right - The right coordinate of the area.
    * @param {number} top - The y coordinate of the area.
    * @param {number} bottom - The bottom coordinate of the area.
    * @param {number} tolerance - A tolerance value to allow for an intersection test with padding, default to 0
    * @return {boolean} A value of true if the specified object intersects with the Rectangle; otherwise false.
    */
    intersectsRaw: function (left, right, top, bottom, tolerance) {

        return Phaser.Rectangle.intersectsRaw(this, left, right, top, bottom, tolerance);

    },

    /**
    * Adds two Rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two Rectangles.
    * @method Phaser.Rectangle#union
    * @param {Phaser.Rectangle} b - The second Rectangle object.
    * @param {Phaser.Rectangle} [out] - Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
    * @return {Phaser.Rectangle} A Rectangle object that is the union of the two Rectangles.
    */
    union: function (b, out) {

        return Phaser.Rectangle.union(this, b, out);

    },

    /**
    * Returns a uniformly distributed random point from anywhere within this Rectangle.
    * 
    * @method Phaser.Rectangle#random
    * @param {Phaser.Point|object} [out] - A Phaser.Point, or any object with public x/y properties, that the values will be set in.
    *     If no object is provided a new Phaser.Point object will be created. In high performance areas avoid this by re-using an existing object.
    * @return {Phaser.Point} An object containing the random point in its `x` and `y` properties.
    */
    random: function (out) {

        if (out === undefined) { out = new Phaser.Point(); }

        out.x = this.randomX;
        out.y = this.randomY;

        return out;

    },

    /**
    * Returns a string representation of this object.
    * @method Phaser.Rectangle#toString
    * @return {string} A string representation of the instance.
    */
    toString: function () {

        return "[{Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " empty=" + this.empty + ")}]";

    }

};

/**
* @name Phaser.Rectangle#halfWidth
* @property {number} halfWidth - Half of the width of the Rectangle.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "halfWidth", {

    get: function () {
        return Math.round(this.width / 2);
    }

});

/**
* @name Phaser.Rectangle#halfHeight
* @property {number} halfHeight - Half of the height of the Rectangle.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "halfHeight", {

    get: function () {
        return Math.round(this.height / 2);
    }

});

/**
* The sum of the y and height properties. Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
* @name Phaser.Rectangle#bottom
* @property {number} bottom - The sum of the y and height properties.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "bottom", {

    get: function () {
        return this.y + this.height;
    },

    set: function (value) {

        if (value <= this.y)
        {
            this.height = 0;
        }
        else
        {
            this.height = value - this.y;
        }

    }

});

/**
* The location of the Rectangles bottom left corner as a Point object.
* @name Phaser.Rectangle#bottomLeft
* @property {Phaser.Point} bottomLeft - Gets or sets the location of the Rectangles bottom left corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "bottomLeft", {

    get: function () {
        return new Phaser.Point(this.x, this.bottom);
    },

    set: function (value) {
        this.x = value.x;
        this.bottom = value.y;
    }

});

/**
* The location of the Rectangles bottom right corner as a Point object.
* @name Phaser.Rectangle#bottomRight
* @property {Phaser.Point} bottomRight - Gets or sets the location of the Rectangles bottom right corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "bottomRight", {

    get: function () {
        return new Phaser.Point(this.right, this.bottom);
    },

    set: function (value) {
        this.right = value.x;
        this.bottom = value.y;
    }

});

/**
* The x coordinate of the left of the Rectangle. Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
* @name Phaser.Rectangle#left
* @property {number} left - The x coordinate of the left of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "left", {

    get: function () {
        return this.x;
    },

    set: function (value) {
        if (value >= this.right) {
            this.width = 0;
        } else {
            this.width = this.right - value;
        }
        this.x = value;
    }

});

/**
* The sum of the x and width properties. Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
* @name Phaser.Rectangle#right
* @property {number} right - The sum of the x and width properties.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "right", {

    get: function () {
        return this.x + this.width;
    },

    set: function (value) {
        if (value <= this.x) {
            this.width = 0;
        } else {
            this.width = value - this.x;
        }
    }

});

/**
* The volume of the Rectangle derived from width * height.
* @name Phaser.Rectangle#volume
* @property {number} volume - The volume of the Rectangle derived from width * height.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "volume", {

    get: function () {
        return this.width * this.height;
    }

});

/**
* The perimeter size of the Rectangle. This is the sum of all 4 sides.
* @name Phaser.Rectangle#perimeter
* @property {number} perimeter - The perimeter size of the Rectangle. This is the sum of all 4 sides.
* @readonly
*/
Object.defineProperty(Phaser.Rectangle.prototype, "perimeter", {

    get: function () {
        return (this.width * 2) + (this.height * 2);
    }

});

/**
* The x coordinate of the center of the Rectangle.
* @name Phaser.Rectangle#centerX
* @property {number} centerX - The x coordinate of the center of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "centerX", {

    get: function () {
        return this.x + this.halfWidth;
    },

    set: function (value) {
        this.x = value - this.halfWidth;
    }

});

/**
* The y coordinate of the center of the Rectangle.
* @name Phaser.Rectangle#centerY
* @property {number} centerY - The y coordinate of the center of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "centerY", {

    get: function () {
        return this.y + this.halfHeight;
    },

    set: function (value) {
        this.y = value - this.halfHeight;
    }

});

/**
* A random value between the left and right values (inclusive) of the Rectangle.
*
* @name Phaser.Rectangle#randomX
* @property {number} randomX - A random value between the left and right values (inclusive) of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "randomX", {

    get: function () {

        return this.x + (Math.random() * this.width);

    }

});

/**
* A random value between the top and bottom values (inclusive) of the Rectangle.
*
* @name Phaser.Rectangle#randomY
* @property {number} randomY - A random value between the top and bottom values (inclusive) of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "randomY", {

    get: function () {

        return this.y + (Math.random() * this.height);

    }

});

/**
* The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
* However it does affect the height property, whereas changing the y value does not affect the height property.
* @name Phaser.Rectangle#top
* @property {number} top - The y coordinate of the top of the Rectangle.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "top", {

    get: function () {
        return this.y;
    },

    set: function (value) {
        if (value >= this.bottom) {
            this.height = 0;
            this.y = value;
        } else {
            this.height = (this.bottom - value);
        }
    }

});

/**
* The location of the Rectangles top left corner as a Point object.
* @name Phaser.Rectangle#topLeft
* @property {Phaser.Point} topLeft - The location of the Rectangles top left corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "topLeft", {

    get: function () {
        return new Phaser.Point(this.x, this.y);
    },

    set: function (value) {
        this.x = value.x;
        this.y = value.y;
    }

});

/**
* The location of the Rectangles top right corner as a Point object.
* @name Phaser.Rectangle#topRight
* @property {Phaser.Point} topRight - The location of the Rectangles top left corner as a Point object.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "topRight", {

    get: function () {
        return new Phaser.Point(this.x + this.width, this.y);
    },

    set: function (value) {
        this.right = value.x;
        this.y = value.y;
    }

});

/**
* Determines whether or not this Rectangle object is empty. A Rectangle object is empty if its width or height is less than or equal to 0.
* If set to true then all of the Rectangle properties are set to 0.
* @name Phaser.Rectangle#empty
* @property {boolean} empty - Gets or sets the Rectangles empty state.
*/
Object.defineProperty(Phaser.Rectangle.prototype, "empty", {

    get: function () {
        return (!this.width || !this.height);
    },

    set: function (value) {

        if (value === true)
        {
            this.setTo(0, 0, 0, 0);
        }

    }

});

Phaser.Rectangle.prototype.constructor = Phaser.Rectangle;

/**
* Increases the size of the Rectangle object by the specified amounts. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
* @method Phaser.Rectangle.inflate
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {number} dx - The amount to be added to the left side of the Rectangle.
* @param {number} dy - The amount to be added to the bottom side of the Rectangle.
* @return {Phaser.Rectangle} This Rectangle object.
*/
Phaser.Rectangle.inflate = function (a, dx, dy) {

    a.x -= dx;
    a.width += 2 * dx;
    a.y -= dy;
    a.height += 2 * dy;

    return a;

};

/**
* Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
* @method Phaser.Rectangle.inflatePoint
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {Phaser.Point} point - The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
* @return {Phaser.Rectangle} The Rectangle object.
*/
Phaser.Rectangle.inflatePoint = function (a, point) {

    return Phaser.Rectangle.inflate(a, point.x, point.y);

};

/**
* The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
* @method Phaser.Rectangle.size
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {Phaser.Point} [output] - Optional Point object. If given the values will be set into the object, otherwise a brand new Point object will be created and returned.
* @return {Phaser.Point} The size of the Rectangle object
*/
Phaser.Rectangle.size = function (a, output) {

    if (output === undefined || output === null)
    {
        output = new Phaser.Point(a.width, a.height);
    }
    else
    {
        output.setTo(a.width, a.height);
    }

    return output;

};

/**
* Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
* @method Phaser.Rectangle.clone
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {Phaser.Rectangle} [output] - Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
* @return {Phaser.Rectangle}
*/
Phaser.Rectangle.clone = function (a, output) {

    if (output === undefined || output === null)
    {
        output = new Phaser.Rectangle(a.x, a.y, a.width, a.height);
    }
    else
    {
        output.setTo(a.x, a.y, a.width, a.height);
    }

    return output;

};

/**
* Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
* @method Phaser.Rectangle.contains
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {number} x - The x coordinate of the point to test.
* @param {number} y - The y coordinate of the point to test.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.contains = function (a, x, y) {

    if (a.width <= 0 || a.height <= 0)
    {
        return false;
    }

    return (x >= a.x && x < a.right && y >= a.y && y < a.bottom);

};

/**
* Determines whether the specified coordinates are contained within the region defined by the given raw values.
* @method Phaser.Rectangle.containsRaw
* @param {number} rx - The x coordinate of the top left of the area.
* @param {number} ry - The y coordinate of the top left of the area.
* @param {number} rw - The width of the area.
* @param {number} rh - The height of the area.
* @param {number} x - The x coordinate of the point to test.
* @param {number} y - The y coordinate of the point to test.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.containsRaw = function (rx, ry, rw, rh, x, y) {

    return (x >= rx && x < (rx + rw) && y >= ry && y < (ry + rh));

};

/**
* Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
* @method Phaser.Rectangle.containsPoint
* @param {Phaser.Rectangle} a - The Rectangle object.
* @param {Phaser.Point} point - The point object being checked. Can be Point or any object with .x and .y values.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.containsPoint = function (a, point) {

    return Phaser.Rectangle.contains(a, point.x, point.y);

};

/**
* Determines whether the first Rectangle object is fully contained within the second Rectangle object.
* A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
* @method Phaser.Rectangle.containsRect
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Phaser.Rectangle.containsRect = function (a, b) {

    //  If the given rect has a larger volume than this one then it can never contain it
    if (a.volume > b.volume)
    {
        return false;
    }

    return (a.x >= b.x && a.y >= b.y && a.right < b.right && a.bottom < b.bottom);

};

/**
* Determines whether the two Rectangles are equal.
* This method compares the x, y, width and height properties of each Rectangle.
* @method Phaser.Rectangle.equals
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the two Rectangles have exactly the same values for the x, y, width and height properties; otherwise false.
*/
Phaser.Rectangle.equals = function (a, b) {

    return (a.x == b.x && a.y == b.y && a.width == b.width && a.height == b.height);

};

/**
* Determines if the two objects (either Rectangles or Rectangle-like) have the same width and height values under strict equality.
* @method Phaser.Rectangle.sameDimensions
* @param {Rectangle-like} a - The first Rectangle object.
* @param {Rectangle-like} b - The second Rectangle object.
* @return {boolean} True if the object have equivalent values for the width and height properties.
*/
Phaser.Rectangle.sameDimensions = function (a, b) {

    return (a.width === b.width && a.height === b.height);

};

/**
* If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the Rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
* @method Phaser.Rectangle.intersection
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @param {Phaser.Rectangle} [output] - Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
* @return {Phaser.Rectangle} A Rectangle object that equals the area of intersection. If the Rectangles do not intersect, this method returns an empty Rectangle object; that is, a Rectangle with its x, y, width, and height properties set to 0.
*/
Phaser.Rectangle.intersection = function (a, b, output) {

    if (output === undefined)
    {
        output = new Phaser.Rectangle();
    }

    if (Phaser.Rectangle.intersects(a, b))
    {
        output.x = Math.max(a.x, b.x);
        output.y = Math.max(a.y, b.y);
        output.width = Math.min(a.right, b.right) - output.x;
        output.height = Math.min(a.bottom, b.bottom) - output.y;
    }

    return output;

};

/**
* Determines whether the two Rectangles intersect with each other.
* This method checks the x, y, width, and height properties of the Rectangles.
* @method Phaser.Rectangle.intersects
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
*/
Phaser.Rectangle.intersects = function (a, b) {

    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0)
    {
        return false;
    }

    return !(a.right < b.x || a.bottom < b.y || a.x > b.right || a.y > b.bottom);

};

/**
* Determines whether the object specified intersects (overlaps) with the given values.
* @method Phaser.Rectangle.intersectsRaw
* @param {number} left - The x coordinate of the left of the area.
* @param {number} right - The right coordinate of the area.
* @param {number} top - The y coordinate of the area.
* @param {number} bottom - The bottom coordinate of the area.
* @param {number} tolerance - A tolerance value to allow for an intersection test with padding, default to 0
* @return {boolean} A value of true if the specified object intersects with the Rectangle; otherwise false.
*/
Phaser.Rectangle.intersectsRaw = function (a, left, right, top, bottom, tolerance) {

    if (tolerance === undefined) { tolerance = 0; }

    return !(left > a.right + tolerance || right < a.left - tolerance || top > a.bottom + tolerance || bottom < a.top - tolerance);

};

/**
* Adds two Rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two Rectangles.
* @method Phaser.Rectangle.union
* @param {Phaser.Rectangle} a - The first Rectangle object.
* @param {Phaser.Rectangle} b - The second Rectangle object.
* @param {Phaser.Rectangle} [output] - Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
* @return {Phaser.Rectangle} A Rectangle object that is the union of the two Rectangles.
*/
Phaser.Rectangle.union = function (a, b, output) {

    if (output === undefined)
    {
        output = new Phaser.Rectangle();
    }

    return output.setTo(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.right, b.right) - Math.min(a.left, b.left), Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top));

};

/**
* Calculates the Axis Aligned Bounding Box (or aabb) from an array of points.
*
* @method Phaser.Rectangle#aabb
* @param {Phaser.Point[]} points - The array of one or more points.
* @param {Phaser.Rectangle} [out] - Optional Rectangle to store the value in, if not supplied a new Rectangle object will be created.
* @return {Phaser.Rectangle} The new Rectangle object.
* @static
*/
Phaser.Rectangle.aabb = function(points, out) {

    if (out === undefined) {
        out = new Phaser.Rectangle();
    }

    var xMax = Number.MIN_VALUE,
        xMin = Number.MAX_VALUE,
        yMax = Number.MIN_VALUE,
        yMin = Number.MAX_VALUE;

    points.forEach(function(point) {
        if (point.x > xMax) {
            xMax = point.x;
        }
        if (point.x < xMin) {
            xMin = point.x;
        }

        if (point.y > yMax) {
            yMax = point.y;
        }
        if (point.y < yMin) {
            yMin = point.y;
        }
    });

    out.setTo(xMin, yMin, xMax - xMin, yMax - yMin);

    return out;
};

//   Because PIXI uses its own Rectangle, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.Rectangle = Phaser.Rectangle;
PIXI.EmptyRectangle = new Phaser.Rectangle(0, 0, 0, 0);

/**
* @author       Mat Groves http://matgroves.com/
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Rounded Rectangle object is an area defined by its position and has nice rounded corners, 
* as indicated by its top-left corner point (x, y) and by its width and its height.
*
* @class Phaser.RoundedRectangle
* @constructor
* @param {number} [x=0] - The x coordinate of the top-left corner of the Rectangle.
* @param {number} [y=0] - The y coordinate of the top-left corner of the Rectangle.
* @param {number} [width=0] - The width of the Rectangle. Should always be either zero or a positive value.
* @param {number} [height=0] - The height of the Rectangle. Should always be either zero or a positive value.
* @param {number} [radius=20] - Controls the radius of the rounded corners.
*/
Phaser.RoundedRectangle = function(x, y, width, height, radius)
{
    if (x === undefined) { x = 0; }
    if (y === undefined) { y = 0; }
    if (width === undefined) { width = 0; }
    if (height === undefined) { height = 0; }
    if (radius === undefined) { radius = 20; }

    /**
    * @property {number} x - The x coordinate of the top-left corner of the Rectangle.
    */
    this.x = x;

    /**
    * @property {number} y - The y coordinate of the top-left corner of the Rectangle.
    */
    this.y = y;

    /**
    * @property {number} width - The width of the Rectangle. This value should never be set to a negative.
    */
    this.width = width;

    /**
    * @property {number} height - The height of the Rectangle. This value should never be set to a negative.
    */
    this.height = height;

    /**
    * @property {number} radius - The radius of the rounded corners.
    */
    this.radius = radius || 20;

    /**
    * @property {number} type - The const type of this object.
    * @readonly
    */
    this.type = Phaser.ROUNDEDRECTANGLE;
};

Phaser.RoundedRectangle.prototype = {

    /**
    * Returns a new RoundedRectangle object with the same values for the x, y, width, height and
    * radius properties as this RoundedRectangle object.
    * 
    * @method Phaser.RoundedRectangle#clone
    * @return {Phaser.RoundedRectangle}
    */
    clone: function () {

        return new Phaser.RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);

    },

    /**
    * Determines whether the specified coordinates are contained within the region defined by this Rounded Rectangle object.
    * 
    * @method Phaser.RoundedRectangle#contains
    * @param {number} x - The x coordinate of the point to test.
    * @param {number} y - The y coordinate of the point to test.
    * @return {boolean} A value of true if the RoundedRectangle Rectangle object contains the specified point; otherwise false.
    */
    contains: function (x, y) {

        if (this.width <= 0 || this.height <= 0)
        {
            return false;
        }

        var x1 = this.x;

        if (x >= x1 && x <= x1 + this.width)
        {
            var y1 = this.y;

            if (y >= y1 && y <= y1 + this.height)
            {
                return true;
            }
        }

        return false;

    }

};

Phaser.RoundedRectangle.prototype.constructor = Phaser.RoundedRectangle;

//  Because PIXI uses its own type, we'll replace it with ours to avoid duplicating code or confusion.
PIXI.RoundedRectangle = Phaser.RoundedRectangle;
