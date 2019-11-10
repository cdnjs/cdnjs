/*

Firmin, a JavaScript animation library using CSS transforms and transitions.

Documentation:  http://extralogical.net/projects/firmin
GitHub project: http://github.com/ionfish/firmin

<%= license %>
*/

Firmin = (typeof Firmin === 'undefined') ? {} : Firmin;

/*

Currently, several browsers support (to varying degrees) the CSS transform and
transition functionality which Firmin is based upon. However, they each use
vendor-specific prefixes for the various CSS properties involved. Consequently,
for Firmin to work on these different browsers it must detect which of these
prefixes is in use.

*/

Firmin.prefix = (function() {
    var test     = document.createElement("div"),
        prefixes = ["o", "moz", "webkit"],
        prefix, i;
    
    for (i = 0; i < 3; i++) {
        prefix = prefixes[i];
        
        test.style.cssText = "-" + prefix + "-transition-property: opacity;";
        
        if (prefix === "moz") {
            prefix = "Moz";
        } else if (prefix === "o") {
            prefix = "O";
        }
        
        if (typeof test.style[prefix + "TransitionProperty"] !== "undefined") {
            return prefix;
        }
    }
})();

/*

Transformation matrices

The CSS transform modules provide a way to create a new local coordinate system
for a given element and its descendants. All transform functions (rotate, skew,
translate, scale etc.) are defined in terms of a transformation matrix. Firmin
translates each use of these API-level transform functions into a matrix and
then concatenates them to determine the final value. By performing these
operations internally rather than deferring them to the browser, it is possible
to introduce stateful transforms, where each new state of the element is based
on the previous state.

While WebKit provides a native CSS matrix class which could be used instead of
the Firmin.TransformMatrix class, other browsers do not expose this
functionality via a JavaScript API.

*/

Firmin.TransformMatrix = function(vector) {
    var i, c;
    
    this.vector = [1, 0, 0, 1, 0, 0];
    
    if (typeof vector === "object") {
        for (i = 0; i < 6; i++) {
            this.vector[i] = typeof (c = vector[i]) === "number" ? c : this.vector[i];
        }
    }
};

Firmin.TransformMatrix.prototype.multiply = function(t) {
    var n = new Array(6), c = this.vector;
    
    n[0] = c[0] * t[0] + c[2] * t[1];        // M11 | Last term = x * 0
    n[1] = c[1] * t[0] + c[3] * t[1];        // M21 | Last term = x * 0
                                             // M31 | Always 0
    n[2] = c[0] * t[2] + c[2] * t[3];        // M12 | Last term = x * 0
    n[3] = c[1] * t[2] + c[3] * t[3];        // M22 | Last term = x * 0
                                             // M32 | Always 0
    n[4] = c[0] * t[4] + c[2] * t[5] + c[4]; // M13 | Last term = x * 1
    n[5] = c[1] * t[4] + c[3] * t[5] + c[5]; // M23 | Last term = x * 1
                                             // M33 | Always 1
    
    this.vector = n;
};

Firmin.TransformMatrix.prototype.build = function() {
    var v = this.vector, body;
    
    if (Firmin.prefix === "Moz") {
        body = v.slice(0,4).join(",") + "," + v[4] + "px," + v[5] + "px";
    } else {
        body = v.join(",");
    }
    
    return "matrix(" + body + ")";
};

/*

Instances of Firmin.Transform represent CSS transforms to be applied to a
given DOM element. As well as encapsulating a transformation matrix, they also
contain the transform origin, and methods for translating API methods such as
translate and rotate to lower-level matrix methods.

Transform objects have methods corresponding to all the CSS 2D transform
functions; this list is also used to add generate higher-level wrapper
functions and methods that wrap the more general animation functionality.

*/

Firmin.Transform = function(vector, origin) {
    this.ctm    = new Firmin.TransformMatrix(vector);
    this.centre = Firmin.pointToVector(origin) || ["50%", "50%"];
};

Firmin.Transform.methods = [
    "translate", "translateX", "translateY",
    "scale", "scaleX", "scaleY",
    "rotate",
    "skew", "skewX", "skewY",
    "matrix"
];

/*

The Firmin.Transform.parse method follows the standard Firmin animation
description-parsing API. It accepts a description object and a context
(generally the previous animation applied), and returns an object with two
properties: the result (a Transform object, or null) and the remainder (an
object containing any unparsed properties of the description, to be passed to
other parsers).

The resultant Transform object wraps a transformation matrix formed by
cumulatively applying the transform options in the description to either the
identity matrix, or the transformation matrix given by the context's transform
property. This feature is what enables stateful transforms, as otherwise
applying a new transform to an element would simply overwrite its previous
state with the new state.

*/

Firmin.Transform.parse = function(description, context) {
    var methods   = Firmin.Transform.methods,
        rest      = {},
        transform = null,
        vector, origin;
    
    if (typeof context === "object" && context.transform) {
        vector    = context.transform.toVector();
        origin    = context.transform.getOrigin();
        transform = new Firmin.Transform(vector, origin);
    }
    
    for (property in description) {
        if (methods.indexOf(property) !== -1) {
            transform = transform || new Firmin.Transform();
            transform[property](description[property]);
        } else if (property === "origin") {
            transform = transform || new Firmin.Transform();
            transform[property](description[property]);
        } else {
            rest[property] = description[property];
        }
    }
    
    return {result: transform, remainder: rest};
};

Firmin.Transform.prototype.matrix = function(vector) {
    this.ctm.multiply(vector);
};

Firmin.Transform.prototype.toVector = function() {
    return this.ctm.vector;
};

Firmin.Transform.prototype.getOrigin = function() {
    return this.centre.join(" ");
};

Firmin.Transform.prototype.build = function(properties) {
    properties = properties || {};
    
    properties[Firmin.prefix + "Transform"]       = this.ctm.build();
    properties[Firmin.prefix + "TransformOrigin"] = this.getOrigin();
    
    return properties;
};

Firmin.Transform.prototype.translate = function(distances) {
    var vector, x, y;
    
    if (typeof distances === "number" || typeof distances === "string") {
        x = y = distances;
    } else {
        vector = Firmin.pointToVector(distances);
        x      = vector[0];
        y      = vector[1];
        
        if (typeof x !== "number") x = parseInt(x, 10) || 0;
        if (typeof y !== "number") y = parseInt(y, 10) || 0;
    }
    
    this.matrix([1, 0, 0, 1, x, y]);
};

Firmin.Transform.prototype.translateX = function(distance) {
    this.translate([distance, 0]);
};

Firmin.Transform.prototype.translateY = function(distance) {
    this.translate([0, distance]);
};

Firmin.Transform.prototype.scale = function(magnitudes) {
    var vector, x, y;
    
    if (typeof magnitudes === "number") {
        x = y = magnitudes;
    } else {
        vector = Firmin.pointToVector(magnitudes);
        x      = vector[0];
        y      = vector[1];
        
        if (typeof x !== "number") x = 1;
        if (typeof y !== "number") y = 1;
    }
    
    this.matrix([x, 0, 0, y, 0, 0]);
};

Firmin.Transform.prototype.scaleX = function(magnitude) {
    this.scale([magnitude, 1]);
};

Firmin.Transform.prototype.scaleY = function(magnitude) {
    this.scale([1, magnitude]);
};

Firmin.Transform.prototype.skew = function(magnitudes) {
    var parseAngle = Firmin.Parser.parseAngle,
        angle2rads = Firmin.angleToRadians,
        vector, x, y;
    
    if (typeof magnitudes === "number" || typeof magnitudes === "string") {
        x = y = angle2rads.apply(null, parseAngle(magnitudes));
    } else {
        vector = Firmin.pointToVector(magnitudes);
        x      = angle2rads.apply(null, parseAngle(vector[0])) || 0;
        y      = angle2rads.apply(null, parseAngle(vector[1])) || 0;
    }
    
    this.matrix([
        1,
        Math.tan(y),
        Math.tan(x),
        1,
        0,
        0
    ]);
};

Firmin.Transform.prototype.skewX = function(magnitude) {
    this.skew([magnitude, 0]);
};

Firmin.Transform.prototype.skewY = function(magnitude) {
    this.skew([0, magnitude]);
};

Firmin.Transform.prototype.rotate = function(angle) {
    angle = Firmin.angleToRadians.apply(null, Firmin.Parser.parseAngle(angle));
    
    this.matrix([
        Math.cos(angle),
        Math.sin(angle),
        -Math.sin(angle),
        Math.cos(angle),
        0,
        0
    ]);
};

Firmin.Transform.prototype.origin = function(origin) {
    var vector = Firmin.pointToVector(origin);
    
    if (vector[0]) this.centre[0] = vector[0];
    if (vector[1]) this.centre[1] = vector[1];
};

/*

CSS transitions are the basic mechanism behind animation in Firmin, and
Firmin.Transition objects encapsulate specific CSS transition properties. As
well as those properties, Transition objects feature various utility methods
allowing other objects to alter their behaviour based on the state of the
Transition object they are concerned with.

For example, if the duration of a Transition is 0, any animation using that
Transition should execute immediately and then trigger the next state directly,
as at least in WebKit-based browsers, the transitionEnd event is not triggered
when the transition duration is 0.

*/

Firmin.Transition = function() {
    this.properties     = ["all"];
    this.duration       = ["ms", 0];
    this.delay          = ["ms", 0];
    this.timingFunction = "ease";
};

Firmin.Transition.methods = [
    "properties",
    "timingFunction",
    "duration",
    "delay"
];

Firmin.Transition.parse = function(description, context) {
    var methods    = Firmin.Transition.methods,
        rest       = {},
        transition = new Firmin.Transition(),
        duration, delay;
    
    for (p in description) {
        if (methods.indexOf(p) !== -1) {
            if (p === "properties" && typeof p === "string") {
                transition[p] = [description[p]];
            } else if (p === "timingFunction" && typeof description[p] !== "string") {
                transition[p] = "cubic-bezier(" + description[p].join(",") + ")";
            } else if (p === "duration") {
                duration = Firmin.Parser.parseTime(description[p]);
                if (duration) { transition[p] = duration; }
            } else if (p === "delay") {
                delay = Firmin.Parser.parseTime(description[p]);
                if (delay) { transition[p] = delay; }
            } else {
                transition[p] = description[p];
            }
        } else {
            rest[p] = description[p];
        }
    }
    
    return {result: transition, remainder: rest};
};

Firmin.Transition.prototype.hasDuration = function() {
    return this.duration[1] !== 0;
};

Firmin.Transition.prototype.getDuration = function() {
    var duration = this.duration;
    return duration[0] === "s" ? duration[1] * 1000 : duration[1];
};

Firmin.Transition.prototype.hasDelay = function() {
    return this.delay[1] !== 0;
};

Firmin.Transition.prototype.getDelay = function() {
    var delay = this.delay;
    return delay[0] === "s" ? delay[1] * 1000 : delay[1];
};

Firmin.Transition.prototype.build = function(properties) {
    properties = properties || {};
    
    if (typeof this.properties === "string") {
        properties[Firmin.prefix + "TransitionProperty"] = this.properties;
    } else {
        properties[Firmin.prefix + "TransitionProperty"] = this.properties.join(", ");
    }
    
    properties[Firmin.prefix + "TransitionDuration"] = this.duration[1] + this.duration[0];
    properties[Firmin.prefix + "TransitionDelay"]    = this.delay[1] + this.delay[0];
    
    if (this.timingFunction) {
        properties[Firmin.prefix + "TransitionTimingFunction"] = this.timingFunction;
    }
    
    return properties;
};

/*

Animations in Firmin consist of three components: a Transform object,
representing the how the target element's local coordinate space will be
transformed when the animation is run; a Transition object, determining how
the element's state will evolve; and a bundle of other CSS properties, which
represent the final state of the element when the animation completes, and
which will be modified incrementally as the animation progresses, just as the
transformation matrix will.

It is these additional CSS properties which allow Firmin to operate as a
replacement for existing JavaScript animation libraries: the visual properties
of the element can be modified over an interval, with the evolution of their
state unfolding in accord with the provided transition function. For example,
an element's background might be set to animate from one colour to another.

When an Animation object is created, it must be given a description object
describing the properties of the animation. This description will be passed to
Transition and Transform parsers in turn, and they will return result objects
and any remaining, unconsumed description properties, which will "fall through"
to become style properties. For example, if the description has a
backgroundColor property then that will not be removed by either parser, and
will thus be set as a normal CSS property.

*/

Firmin.Animation = function(description, context) {
    var tsp, trp;
    
    if (typeof description.callback === "function") {
        this.callback = description.callback;
    }
    
    delete description.callback;
    
    tsp = Firmin.Transition.parse(description, context);
    this.transition = tsp.result;
    
    trp = Firmin.Transform.parse(tsp.remainder, context);
    this.transform  = trp.result;
    
    this.style = trp.remainder;
};

Firmin.Animation.prototype.hasDuration = function() {
    return this.transition && this.transition.hasDuration();
};

Firmin.Animation.prototype.getTotalDuration = function() {
    return this.transition ?
        this.transition.getDuration() + this.transition.getDelay() : 0;
};

Firmin.Animation.prototype.exec = function(element) {
    var properties = this.style, property;
    
    if (this.transition) properties = this.transition.build(properties);
    if (this.transform)  properties = this.transform.build(properties);
    
    for (property in properties) {
        element.style[property] = properties[property];
    }
};

/*

Instances of Firmin.Animated allow for the construction of chained sequences of
animations: they contain a list of Animation objects, and as soon as one
animation completes, it fires the next. Because Animated objects are returned
by the Firmin.animate function, and calling the animate method on an Animated
object returns the object itself, one can call animate (or one of the transform
function aliases) any number of times in a chain of method calls.

    Firmin.animate(el, {color: "#f00"}, "1.0s")
        .translateX("500px", "0.4s")
        .scale(2, "0.5s")
        .rotate("30deg", "0.1s");

Because of the callback-based nature of the animations, the method chain will
run synchronously, but firing the animations will not block the execution of
the next statement. For examples of prior art in this area, take a look at
JS.MethodChain and Ojay's animation module.

* http://jsclass.jcoglan.com/methodchain.html
* http://ojay.othermedia.org/articles/animation.html

*/

Firmin.Animated = function(element) {
    var self = this;
    
    this.element    = element;
    this.operations = [];
    this.callback   = null;
};

Firmin.Animated.prototype.run = function() {
    var animation = this.operations.shift(),
        self      = this;
    
    if (!animation) {
        this.fired = true;
        return this;
    }
    
    animation.exec(this.element);
    
    setTimeout(function() {
        self.fireCallback();
        self.run();
    }, animation.getTotalDuration() || 1);
    
    this.callback = animation.callback;
    
    return this;
};

Firmin.Animated.prototype.fireCallback = function() {
    var callback = this.callback;
    
    if (typeof callback === "function") {
        callback.call(null, this.element);
    }
};

Firmin.Animated.prototype.__animate__ = function(animation) {
    this.operations.push(animation);
    this.__lastAnim = animation;
    
    if (this.fired) {
        this.fired = false;
        this.run();
    }
    
    return this;
};

Firmin.Animated.prototype.animate = function(description, duration, callback) {
    description.duration = duration;
    description.callback = callback;
    
    return this.__animate__(new Firmin.Animation(description));
};

Firmin.Animated.prototype.animateR = function(description, duration, callback) {
    description.duration = duration;
    description.callback = callback;
    
    return this.__animate__(new Firmin.Animation(description, this.__lastAnim));
};

Firmin.animate = function(el, description, duration, callback) {
    var animated = new Firmin.Animated(el);
    
    animated.animate(description, duration, callback);
    
    return animated.run();
};

Firmin.animateR = function(el, description, duration, callback) {
    var animated = new Firmin.Animated(el);
    
    animated.animateR(description, duration, callback);
    
    return animated.run();
};

/*

Transform function aliases

For convenience, all the transform functions are provided as wrappers around
the animate function and method. Without these wrappers, one would have to
call animate and pass in a description, even if that description only contained
one transform function:

    Firmin.animate(el, {rotate: "45deg"});

By effectively aliasing rotate to this call, one can effectively use rotate (or
any other transform function) directly:

    Firmin.rotate(el, "45deg");

The abbreviated notation expresses intention more directly in such scenarios,
and thus should be preferred.

*/

Firmin.Transform.methods.forEach(function(method) {
    var relativeMethod = method + "R";
    
    Firmin[method] = function(el, value, t, cb) {
        var description = {};
        description[method] = value;
        return Firmin.animate(el, description, t, cb);
    };
    
    Firmin[relativeMethod] = function(el, value, t, cb) {
        var description = {};
        description[method] = value;
        return Firmin.animateR(el, description, t, cb);
    };
    
    Firmin.Animated.prototype[method] = function(value, t, cb) {
        var description = {};
        description[method] = value;
        return this.animate(description, t, cb);
    };
    
    Firmin.Animated.prototype[relativeMethod] = function(value, t, cb) {
        var description = {};
        description[method] = value;
        return this.animateR(description, t, cb);
    };
});

/*

CSS data type parsing

There are numerous CSS data types. We are mainly interested in the various
numeric types, generally consisting of a magnitude plus a unit (e.g. 45deg or
50%), but there are a few functions which allow or require a keyword instead.

The parsers implemented below all have a common pattern: they accept a string
(or, if the type can be numeric and has a default unit, a number) and return a
pair consisting of the unit and the magnitude (or null, if the input was not of
the expected format).

One major limitation, albeit not with the parsing library itself, is that there
is currently no straightforward way to convert between length units. Users of
this library must use pixels, rather than being able to use any length unit
they like and relying on the library to perform an internal conversion to
pixels. This limits the usefulness of the parsing library, essentially to
angles and times.

*/

Firmin.Parser = {};

Firmin.Parser.NUMBER_PATTERN = /^-?\d+(\.\d+)?/;

Firmin.Parser.parseNumeric = function(units, def) {
    return function(input) {
        var unit, magnitude;
        
        if (typeof input === "number") {
            return [def, input];
        } else if (typeof input !== "string") {
            return null;
        }
        
        magnitude = (input.match(Firmin.Parser.NUMBER_PATTERN) || [""])[0];
        
        if (magnitude.length === input.length) {
            unit = def;
        } else {
            unit = units.filter(function(u) {
                return input.substr(magnitude.length) === u;
            })[0];
        }
        
        return unit && magnitude ? [unit, parseFloat(magnitude)] : null;
    };
};

Firmin.Parser.parseAngle = Firmin.Parser.parseNumeric(["deg", "grad", "rad", "turn"], "deg");
Firmin.Parser.parseTime  = Firmin.Parser.parseNumeric(["s", "ms"], "s");

/*

Angular conversion

The transform operations assume that angles are given in radians. However,
there are several other valid CSS angle types: degrees, grads and turns.
We therefore need code to, at a minimum, convert values of all these types to
values in radians.

*/

Firmin.angleToRadians = function(type, magnitude) {
    var ratio;
    
    switch (type) {
        case "rad"  : return magnitude;
        case "deg"  : ratio = Math.PI / 180; break;
        case "grad" : ratio = Math.PI / 200; break;
        case "turn" : ratio = Math.PI * 2;   break;
    }
    
    return ratio * magnitude;
};

/*

Point to vector conversion

Points are used as a convenient and meaningful way for users to specify
origins, translations etc., but a vector is a more convenient internal format,
so in general points are converted to vectors on the way in.

*/

Firmin.pointToVector = function(point) {
    if (!point) return null;
    
    return point instanceof Array ? point : [point.x, point.y, point.z];
};
