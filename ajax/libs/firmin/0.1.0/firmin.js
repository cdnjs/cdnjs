/*

Firmin, a JavaScript animation library using CSS transforms and transitions.

<%= license %>
*/

Firmin = {};

Firmin.prefix = (function() {
    var test     = document.createElement("div"),
        prefixes = ["o", "moz", "webkit"],
        prefix, i;
    
    for (i = 0; i < 3; i++) {
        prefix = prefixes[i];
        test.style.cssText = "-" + prefix + "-transition-property: opacity;";
        if (prefix === "moz") prefix = "Moz";
        if (typeof test.style[prefix + "TransitionProperty"] !== "undefined") break;
    }
    
    return prefix;
})();

Firmin.CTM = function(vector) {
    var i, c;
    
    this.vector = [1, 0, 0, 1, 0, 0];
    
    if (typeof vector === "object") {
        for (i = 0; i < 6; i++) {
            this.vector[i] = typeof (c = vector[i]) === "number" ? c : this.vector[i];
        }
    }
};

Firmin.CTM.KEYS = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5};

Firmin.CTM.prototype.get = function(index) {
    return this.vector[typeof index === "string" ? Firmin.CTM.KEYS[index] : index];
};

Firmin.CTM.prototype.multiply = function(t) {
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

Firmin.CTM.prototype.build = function() {
    return "matrix(" + this.vector.join(",") + ")";
};

Firmin.Transform = function(vector, origin) {
    this.ctm    = new Firmin.CTM(vector);
    this.centre = origin || {x: "50%", y: "50%"};
};

Firmin.Transform.methods = [
    "translate", "translateX", "translateY",
    "scale", "scaleX", "scaleY",
    "rotate",
    "skew", "skewX", "skewY",
    "matrix"
];

Firmin.Transform.parse = function(description, context) {
    var methods   = Firmin.Transform.methods,
        rest      = {},
        transform = null,
        vector, origin;
    
    if (context.transform) {
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
    return this.centre.x + " " + this.centre.y;
};

Firmin.Transform.prototype.build = function(properties) {
    properties = properties || {};
    
    properties[Firmin.prefix + "Transform"]       = this.ctm.build();
    properties[Firmin.prefix + "TransformOrigin"] = this.getOrigin();
    
    return properties;
};

Firmin.Transform.prototype.translate = function(distances) {
    var x, y;
    
    if (typeof distances === "number" || typeof distances === "string") {
        x = distances;
        y = distances;
    } else {
        x = distances.x;
        y = distances.y;
        
        if (typeof x !== "number") x = parseInt(x, 10) || 0;
        if (typeof y !== "number") y = parseInt(y, 10) || 0;
    }
    
    this.matrix([1, 0, 0, 1, x, y]);
};

Firmin.Transform.prototype.translateX = function(distance) {
    this.translate({x: distance});
};

Firmin.Transform.prototype.translateY = function(distance) {
    this.translate({y: distance});
};

Firmin.Transform.prototype.scale = function(magnitudes) {
    var x, y;
    
    if (typeof magnitudes === "number") {
        x = magnitudes;
        y = magnitudes;
    } else {
        x = magnitudes.x;
        y = magnitudes.y;
        
        if (typeof x !== "number") x = 1;
        if (typeof y !== "number") y = 1;
    }
    
    this.matrix([x, 0, 0, y, 0, 0]);
};

Firmin.Transform.prototype.scaleX = function(magnitude) {
    this.scale({x: magnitude});
};

Firmin.Transform.prototype.scaleY = function(magnitude) {
    this.scale({y: magnitude});
};

Firmin.Transform.prototype.skew = function(magnitudes) {
    var parseAngle = Firmin.Parser.parseAngle,
        angle2rads = Firmin.angleToRadians,
        x = 0, y = 0;
    
    if (typeof magnitudes.x === "number" || typeof magnitudes.x === "string") {
        x = angle2rads.apply(null, parseAngle(magnitudes.x));
    }
    
    if (typeof magnitudes.y === "number" || typeof magnitudes.y === "string") {
        y = angle2rads.apply(null, parseAngle(magnitudes.y));
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
    this.skew({x: magnitude});
};

Firmin.Transform.prototype.skewY = function(magnitude) {
    this.skew({y: magnitude});
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
    if (origin.x) this.centre.x = origin.x;
    if (origin.y) this.centre.y = origin.y;
};

/*

Transforms can be composed with transitions to produce animation.
Transitions have much the same API as Transforms.

*/

Firmin.Transition = function() {
    this.properties     = ["all"];
    this.duration       = ["s", 0];
    this.delay          = ["s", 0];
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
    return duration[1] === 0 ? 0 : duration.reverse().join("");
};

Firmin.Transition.prototype.hasDelay = function() {
    return this.delay[1] !== 0;
};

Firmin.Transition.prototype.getDelay = function() {
    var delay = this.delay;
    return delay[1] === 0 ? 0 : duration.reverse().join("");
};

Firmin.Transition.prototype.build = function(properties) {
    properties = properties || {};
    
    if (typeof this.properties === "string") {
        properties[Firmin.prefix + "TransitionProperty"] = this.properties;
    } else {
        properties[Firmin.prefix + "TransitionProperty"] = this.properties.join(", ");
    }
    
    properties[Firmin.prefix + "TransitionDuration"] = this.getDuration();
    properties[Firmin.prefix + "TransitionDelay"]    = this.getDelay();
    
    if (this.timingFunction) {
        properties[Firmin.prefix + "TransitionTimingFunction"] = this.timingFunction;
    }
    
    return properties;
};

Firmin.Animation = function(description, context) {
    var tsp, trp;
    
    tsp = Firmin.Transition.parse(description, context);
    this.transition = tsp.result;
    
    trp = Firmin.Transform.parse(tsp.remainder, context);
    this.transform  = trp.result;
    
    this.style = trp.remainder;
};

Firmin.Animation.prototype.hasDuration = function() {
    return this.transition && this.transition.hasDuration();
};

Firmin.Animation.prototype.exec = function(element) {
    var properties = this.style, property;
    
    if (this.transition) properties = this.transition.build(properties);
    if (this.transform)  properties = this.transform.build(properties);
    
    for (property in properties) {
        element.style[property] = properties[property];
    }
};

Firmin.Animated = function(element) {
    var self = this;
    
    this.element    = element;
    this.operations = [];
    this.index      = 0;
    
    this.element.addEventListener(Firmin.prefix + "TransitionEnd", function() {
        if (self.index < self.operations.length) {
            self.run();
        }
    }, false);
};

Firmin.Animated.prototype.run = function() {
    var animation = this.operations[this.index++],
        next      = this.operations[this.index],
        self      = this;
    
    animation.exec(this.element);
    
    if (next && !animation.hasDuration()) {
        setTimeout(function() {
            self.run();
        }, 1);
    }
    
    return this;
};

Firmin.Animated.prototype.animate = function(description, duration) {
    var previous = this.operations[this.operations.length - 1] || {};
    
    if (["string", "number"].indexOf(typeof description.duration) === -1) {
        description.duration = duration;
    }
    
    this.operations.push(new Firmin.Animation(description, previous));
    
    return this;
};

Firmin.animate = function(el, description, duration) {
    var animated = new Firmin.Animated(el);
    
    if (["string", "number"].indexOf(typeof description.duration) === -1) {
        description.duration = duration;
    }
    
    animated.animate(description);
    
    return animated.run();
};

/*

Animation function aliases

*/

Firmin.Transform.methods.forEach(function(method) {
    Firmin[method] = function(el, value, duration) {
        var description = {};
        description[method] = value;
        return Firmin.animate(el, description, duration);
    };
    
    Firmin.Animated.prototype[method] = function(value, duration) {
        var description = {};
        description[method] = value;
        return this.animate(description, duration);
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
