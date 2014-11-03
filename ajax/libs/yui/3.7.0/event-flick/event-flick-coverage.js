if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/event-flick/event-flick.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/event-flick/event-flick.js",
    code: []
};
_yuitest_coverage["build/event-flick/event-flick.js"].code=["YUI.add('event-flick', function (Y, NAME) {","","/**"," * The gestures module provides gesture events such as \"flick\", which normalize user interactions"," * across touch and mouse or pointer based input devices. This layer can be used by application developers"," * to build input device agnostic components which behave the same in response to either touch or mouse based  "," * interaction."," *"," * <p>Documentation for events added by this module can be found in the event document for the <a href=\"YUI.html#events\">YUI</a> global.</p>"," *"," * @module event-gestures"," */","","/**"," * Adds support for a \"flick\" event, which is fired at the end of a touch or mouse based flick gesture, and provides "," * velocity of the flick, along with distance and time information."," *"," * @module event-gestures"," * @submodule event-flick"," */","var GESTURE_MAP = Y.Event._GESTURE_MAP,","    EVENT = {","        start: GESTURE_MAP.start,","        end: GESTURE_MAP.end,","        move: GESTURE_MAP.move","    },","    START = \"start\",","    END = \"end\",","    MOVE = \"move\",","","    OWNER_DOCUMENT = \"ownerDocument\",","    MIN_VELOCITY = \"minVelocity\",","    MIN_DISTANCE = \"minDistance\",","    PREVENT_DEFAULT = \"preventDefault\",","","    _FLICK_START = \"_fs\",","    _FLICK_START_HANDLE = \"_fsh\",","    _FLICK_END_HANDLE = \"_feh\",","    _FLICK_MOVE_HANDLE = \"_fmh\",","","    NODE_TYPE = \"nodeType\";","","/**"," * Sets up a \"flick\" event, that is fired whenever the user initiates a flick gesture on the node"," * where the listener is attached. The subscriber can specify a minimum distance or velocity for"," * which the event is to be fired. The subscriber can also specify if there is a particular axis which"," * they are interested in - \"x\" or \"y\". If no axis is specified, the axis along which there was most distance"," * covered is used."," *"," * <p>It is recommended that you use Y.bind to set up context and additional arguments for your event handler,"," * however if you want to pass the context and arguments as additional signature arguments to \"on\", "," * you need to provide a null value for the configuration object, e.g: <code>node.on(\"flick\", fn, null, context, arg1, arg2, arg3)</code></p>"," *"," * @event flick"," * @for YUI"," * @param type {string} \"flick\""," * @param fn {function} The method the event invokes. It receives an event facade with an e.flick object containing the flick related properties: e.flick.time, e.flick.distance, e.flick.velocity and e.flick.axis, e.flick.start."," * @param cfg {Object} Optional. An object which specifies any of the following:"," * <dl>"," * <dt>minDistance (in pixels, defaults to 10)</dt>"," * <dd>The minimum distance between start and end points, which would qualify the gesture as a flick.</dd>"," * <dt>minVelocity (in pixels/ms, defaults to 0)</dt>"," * <dd>The minimum velocity which would qualify the gesture as a flick.</dd>"," * <dt>preventDefault (defaults to false)</dt>"," * <dd>Can be set to true/false to prevent default behavior as soon as the touchstart/touchend or mousedown/mouseup is received so that things like scrolling or text selection can be "," * prevented. This property can also be set to a function, which returns true or false, based on the event facade passed to it.</dd>"," * <dt>axis (no default)</dt>"," * <dd>Can be set to \"x\" or \"y\" if you want to constrain the flick velocity and distance to a single axis. If not"," * defined, the axis along which the maximum distance was covered is used.</dd>"," * </dl>"," * @return {EventHandle} the detach handle"," */","","Y.Event.define('flick', {","","    on: function (node, subscriber, ce) {","","        var startHandle = node.on(EVENT[START],","            this._onStart,","            this,","            node,","            subscriber, ","            ce);"," ","        subscriber[_FLICK_START_HANDLE] = startHandle;","    },","","    detach: function (node, subscriber, ce) {","","        var startHandle = subscriber[_FLICK_START_HANDLE],","            endHandle = subscriber[_FLICK_END_HANDLE];","","        if (startHandle) {","            startHandle.detach();","            subscriber[_FLICK_START_HANDLE] = null;","        }","","        if (endHandle) {","            endHandle.detach();","            subscriber[_FLICK_END_HANDLE] = null;","        }","    },","","    processArgs: function(args) {","        var params = (args.length > 3) ? Y.merge(args.splice(3, 1)[0]) : {};","","        if (!(MIN_VELOCITY in params)) {","            params[MIN_VELOCITY] = this.MIN_VELOCITY;","        }","","        if (!(MIN_DISTANCE in params)) {","            params[MIN_DISTANCE] = this.MIN_DISTANCE;","        }","","        if (!(PREVENT_DEFAULT in params)) {","            params[PREVENT_DEFAULT] = this.PREVENT_DEFAULT;","        }","","        return params;","    },","","    _onStart: function(e, node, subscriber, ce) {","","        var start = true, // always true for mouse","            endHandle,","            moveHandle,","            doc,","            preventDefault = subscriber._extra.preventDefault,","            origE = e; ","","        if (e.touches) {","            start = (e.touches.length === 1);","            e = e.touches[0];","        }","","        if (start) {","","            if (preventDefault) {","                // preventDefault is a boolean or function","                if (!preventDefault.call || preventDefault(e)) {","                    origE.preventDefault();","                }","            }","","            e.flick = {","                time : new Date().getTime()","            };","","            subscriber[_FLICK_START] = e;","","            endHandle = subscriber[_FLICK_END_HANDLE];","","            doc = (node.get(NODE_TYPE) === 9) ? node : node.get(OWNER_DOCUMENT);","            if (!endHandle) {","                endHandle = doc.on(EVENT[END], Y.bind(this._onEnd, this), null, node, subscriber, ce);","                subscriber[_FLICK_END_HANDLE] = endHandle;","            }","","            subscriber[_FLICK_MOVE_HANDLE] = doc.once(EVENT[MOVE], Y.bind(this._onMove, this), null, node, subscriber, ce);","        }","    },","","    _onMove: function(e, node, subscriber, ce) {","        var start = subscriber[_FLICK_START];","","        // Start timing from first move.","        if (start && start.flick) {","            start.flick.time = new Date().getTime();","        }","    },","","    _onEnd: function(e, node, subscriber, ce) {","","        var endTime = new Date().getTime(),","            start = subscriber[_FLICK_START],","            valid = !!start,","            endEvent = e,","            startTime,","            time,","            preventDefault,","            params,","            xyDistance, ","            distance,","            velocity,","            axis,","            moveHandle = subscriber[_FLICK_MOVE_HANDLE];","","        if (moveHandle) {","            moveHandle.detach();","            delete subscriber[_FLICK_MOVE_HANDLE];","        }","","        if (valid) {","","            if (e.changedTouches) {","                if (e.changedTouches.length === 1 && e.touches.length === 0) {","                    endEvent = e.changedTouches[0];","                } else {","                    valid = false;","                }","            }","","            if (valid) {","","                params = subscriber._extra;","                preventDefault = params[PREVENT_DEFAULT];","","                if (preventDefault) {","                    // preventDefault is a boolean or function","                    if (!preventDefault.call || preventDefault(e)) {","                        e.preventDefault();","                    }","                }","","                startTime = start.flick.time;","                endTime = new Date().getTime();","                time = endTime - startTime;","","                xyDistance = [","                    endEvent.pageX - start.pageX,","                    endEvent.pageY - start.pageY","                ];","","                if (params.axis) {","                    axis = params.axis;","                } else {","                    axis = (Math.abs(xyDistance[0]) >= Math.abs(xyDistance[1])) ? 'x' : 'y';","                }","","                distance = xyDistance[(axis === 'x') ? 0 : 1];","                velocity = (time !== 0) ? distance/time : 0;","","                if (isFinite(velocity) && (Math.abs(distance) >= params[MIN_DISTANCE]) && (Math.abs(velocity)  >= params[MIN_VELOCITY])) {","","                    e.type = \"flick\";","                    e.flick = {","                        time:time,","                        distance: distance,","                        velocity:velocity,","                        axis: axis,","                        start : start","                    };","","                    ce.fire(e);","","                }","","                subscriber[_FLICK_START] = null;","            }","        }","    },","","    MIN_VELOCITY : 0,","    MIN_DISTANCE : 0,","    PREVENT_DEFAULT : false","});","","","}, '@VERSION@', {\"requires\": [\"node-base\", \"event-touch\", \"event-synthetic\"]});"];
_yuitest_coverage["build/event-flick/event-flick.js"].lines = {"1":0,"21":0,"74":0,"78":0,"85":0,"90":0,"93":0,"94":0,"95":0,"98":0,"99":0,"100":0,"105":0,"107":0,"108":0,"111":0,"112":0,"115":0,"116":0,"119":0,"124":0,"131":0,"132":0,"133":0,"136":0,"138":0,"140":0,"141":0,"145":0,"149":0,"151":0,"153":0,"154":0,"155":0,"156":0,"159":0,"164":0,"167":0,"168":0,"174":0,"188":0,"189":0,"190":0,"193":0,"195":0,"196":0,"197":0,"199":0,"203":0,"205":0,"206":0,"208":0,"210":0,"211":0,"215":0,"216":0,"217":0,"219":0,"224":0,"225":0,"227":0,"230":0,"231":0,"233":0,"235":0,"236":0,"244":0,"248":0};
_yuitest_coverage["build/event-flick/event-flick.js"].functions = {"on:76":0,"detach:88":0,"processArgs:104":0,"_onStart:122":0,"_onMove:163":0,"_onEnd:172":0,"(anonymous 1):1":0};
_yuitest_coverage["build/event-flick/event-flick.js"].coveredLines = 68;
_yuitest_coverage["build/event-flick/event-flick.js"].coveredFunctions = 7;
_yuitest_coverline("build/event-flick/event-flick.js", 1);
YUI.add('event-flick', function (Y, NAME) {

/**
 * The gestures module provides gesture events such as "flick", which normalize user interactions
 * across touch and mouse or pointer based input devices. This layer can be used by application developers
 * to build input device agnostic components which behave the same in response to either touch or mouse based  
 * interaction.
 *
 * <p>Documentation for events added by this module can be found in the event document for the <a href="YUI.html#events">YUI</a> global.</p>
 *
 * @module event-gestures
 */

/**
 * Adds support for a "flick" event, which is fired at the end of a touch or mouse based flick gesture, and provides 
 * velocity of the flick, along with distance and time information.
 *
 * @module event-gestures
 * @submodule event-flick
 */
_yuitest_coverfunc("build/event-flick/event-flick.js", "(anonymous 1)", 1);
_yuitest_coverline("build/event-flick/event-flick.js", 21);
var GESTURE_MAP = Y.Event._GESTURE_MAP,
    EVENT = {
        start: GESTURE_MAP.start,
        end: GESTURE_MAP.end,
        move: GESTURE_MAP.move
    },
    START = "start",
    END = "end",
    MOVE = "move",

    OWNER_DOCUMENT = "ownerDocument",
    MIN_VELOCITY = "minVelocity",
    MIN_DISTANCE = "minDistance",
    PREVENT_DEFAULT = "preventDefault",

    _FLICK_START = "_fs",
    _FLICK_START_HANDLE = "_fsh",
    _FLICK_END_HANDLE = "_feh",
    _FLICK_MOVE_HANDLE = "_fmh",

    NODE_TYPE = "nodeType";

/**
 * Sets up a "flick" event, that is fired whenever the user initiates a flick gesture on the node
 * where the listener is attached. The subscriber can specify a minimum distance or velocity for
 * which the event is to be fired. The subscriber can also specify if there is a particular axis which
 * they are interested in - "x" or "y". If no axis is specified, the axis along which there was most distance
 * covered is used.
 *
 * <p>It is recommended that you use Y.bind to set up context and additional arguments for your event handler,
 * however if you want to pass the context and arguments as additional signature arguments to "on", 
 * you need to provide a null value for the configuration object, e.g: <code>node.on("flick", fn, null, context, arg1, arg2, arg3)</code></p>
 *
 * @event flick
 * @for YUI
 * @param type {string} "flick"
 * @param fn {function} The method the event invokes. It receives an event facade with an e.flick object containing the flick related properties: e.flick.time, e.flick.distance, e.flick.velocity and e.flick.axis, e.flick.start.
 * @param cfg {Object} Optional. An object which specifies any of the following:
 * <dl>
 * <dt>minDistance (in pixels, defaults to 10)</dt>
 * <dd>The minimum distance between start and end points, which would qualify the gesture as a flick.</dd>
 * <dt>minVelocity (in pixels/ms, defaults to 0)</dt>
 * <dd>The minimum velocity which would qualify the gesture as a flick.</dd>
 * <dt>preventDefault (defaults to false)</dt>
 * <dd>Can be set to true/false to prevent default behavior as soon as the touchstart/touchend or mousedown/mouseup is received so that things like scrolling or text selection can be 
 * prevented. This property can also be set to a function, which returns true or false, based on the event facade passed to it.</dd>
 * <dt>axis (no default)</dt>
 * <dd>Can be set to "x" or "y" if you want to constrain the flick velocity and distance to a single axis. If not
 * defined, the axis along which the maximum distance was covered is used.</dd>
 * </dl>
 * @return {EventHandle} the detach handle
 */

_yuitest_coverline("build/event-flick/event-flick.js", 74);
Y.Event.define('flick', {

    on: function (node, subscriber, ce) {

        _yuitest_coverfunc("build/event-flick/event-flick.js", "on", 76);
_yuitest_coverline("build/event-flick/event-flick.js", 78);
var startHandle = node.on(EVENT[START],
            this._onStart,
            this,
            node,
            subscriber, 
            ce);
 
        _yuitest_coverline("build/event-flick/event-flick.js", 85);
subscriber[_FLICK_START_HANDLE] = startHandle;
    },

    detach: function (node, subscriber, ce) {

        _yuitest_coverfunc("build/event-flick/event-flick.js", "detach", 88);
_yuitest_coverline("build/event-flick/event-flick.js", 90);
var startHandle = subscriber[_FLICK_START_HANDLE],
            endHandle = subscriber[_FLICK_END_HANDLE];

        _yuitest_coverline("build/event-flick/event-flick.js", 93);
if (startHandle) {
            _yuitest_coverline("build/event-flick/event-flick.js", 94);
startHandle.detach();
            _yuitest_coverline("build/event-flick/event-flick.js", 95);
subscriber[_FLICK_START_HANDLE] = null;
        }

        _yuitest_coverline("build/event-flick/event-flick.js", 98);
if (endHandle) {
            _yuitest_coverline("build/event-flick/event-flick.js", 99);
endHandle.detach();
            _yuitest_coverline("build/event-flick/event-flick.js", 100);
subscriber[_FLICK_END_HANDLE] = null;
        }
    },

    processArgs: function(args) {
        _yuitest_coverfunc("build/event-flick/event-flick.js", "processArgs", 104);
_yuitest_coverline("build/event-flick/event-flick.js", 105);
var params = (args.length > 3) ? Y.merge(args.splice(3, 1)[0]) : {};

        _yuitest_coverline("build/event-flick/event-flick.js", 107);
if (!(MIN_VELOCITY in params)) {
            _yuitest_coverline("build/event-flick/event-flick.js", 108);
params[MIN_VELOCITY] = this.MIN_VELOCITY;
        }

        _yuitest_coverline("build/event-flick/event-flick.js", 111);
if (!(MIN_DISTANCE in params)) {
            _yuitest_coverline("build/event-flick/event-flick.js", 112);
params[MIN_DISTANCE] = this.MIN_DISTANCE;
        }

        _yuitest_coverline("build/event-flick/event-flick.js", 115);
if (!(PREVENT_DEFAULT in params)) {
            _yuitest_coverline("build/event-flick/event-flick.js", 116);
params[PREVENT_DEFAULT] = this.PREVENT_DEFAULT;
        }

        _yuitest_coverline("build/event-flick/event-flick.js", 119);
return params;
    },

    _onStart: function(e, node, subscriber, ce) {

        _yuitest_coverfunc("build/event-flick/event-flick.js", "_onStart", 122);
_yuitest_coverline("build/event-flick/event-flick.js", 124);
var start = true, // always true for mouse
            endHandle,
            moveHandle,
            doc,
            preventDefault = subscriber._extra.preventDefault,
            origE = e; 

        _yuitest_coverline("build/event-flick/event-flick.js", 131);
if (e.touches) {
            _yuitest_coverline("build/event-flick/event-flick.js", 132);
start = (e.touches.length === 1);
            _yuitest_coverline("build/event-flick/event-flick.js", 133);
e = e.touches[0];
        }

        _yuitest_coverline("build/event-flick/event-flick.js", 136);
if (start) {

            _yuitest_coverline("build/event-flick/event-flick.js", 138);
if (preventDefault) {
                // preventDefault is a boolean or function
                _yuitest_coverline("build/event-flick/event-flick.js", 140);
if (!preventDefault.call || preventDefault(e)) {
                    _yuitest_coverline("build/event-flick/event-flick.js", 141);
origE.preventDefault();
                }
            }

            _yuitest_coverline("build/event-flick/event-flick.js", 145);
e.flick = {
                time : new Date().getTime()
            };

            _yuitest_coverline("build/event-flick/event-flick.js", 149);
subscriber[_FLICK_START] = e;

            _yuitest_coverline("build/event-flick/event-flick.js", 151);
endHandle = subscriber[_FLICK_END_HANDLE];

            _yuitest_coverline("build/event-flick/event-flick.js", 153);
doc = (node.get(NODE_TYPE) === 9) ? node : node.get(OWNER_DOCUMENT);
            _yuitest_coverline("build/event-flick/event-flick.js", 154);
if (!endHandle) {
                _yuitest_coverline("build/event-flick/event-flick.js", 155);
endHandle = doc.on(EVENT[END], Y.bind(this._onEnd, this), null, node, subscriber, ce);
                _yuitest_coverline("build/event-flick/event-flick.js", 156);
subscriber[_FLICK_END_HANDLE] = endHandle;
            }

            _yuitest_coverline("build/event-flick/event-flick.js", 159);
subscriber[_FLICK_MOVE_HANDLE] = doc.once(EVENT[MOVE], Y.bind(this._onMove, this), null, node, subscriber, ce);
        }
    },

    _onMove: function(e, node, subscriber, ce) {
        _yuitest_coverfunc("build/event-flick/event-flick.js", "_onMove", 163);
_yuitest_coverline("build/event-flick/event-flick.js", 164);
var start = subscriber[_FLICK_START];

        // Start timing from first move.
        _yuitest_coverline("build/event-flick/event-flick.js", 167);
if (start && start.flick) {
            _yuitest_coverline("build/event-flick/event-flick.js", 168);
start.flick.time = new Date().getTime();
        }
    },

    _onEnd: function(e, node, subscriber, ce) {

        _yuitest_coverfunc("build/event-flick/event-flick.js", "_onEnd", 172);
_yuitest_coverline("build/event-flick/event-flick.js", 174);
var endTime = new Date().getTime(),
            start = subscriber[_FLICK_START],
            valid = !!start,
            endEvent = e,
            startTime,
            time,
            preventDefault,
            params,
            xyDistance, 
            distance,
            velocity,
            axis,
            moveHandle = subscriber[_FLICK_MOVE_HANDLE];

        _yuitest_coverline("build/event-flick/event-flick.js", 188);
if (moveHandle) {
            _yuitest_coverline("build/event-flick/event-flick.js", 189);
moveHandle.detach();
            _yuitest_coverline("build/event-flick/event-flick.js", 190);
delete subscriber[_FLICK_MOVE_HANDLE];
        }

        _yuitest_coverline("build/event-flick/event-flick.js", 193);
if (valid) {

            _yuitest_coverline("build/event-flick/event-flick.js", 195);
if (e.changedTouches) {
                _yuitest_coverline("build/event-flick/event-flick.js", 196);
if (e.changedTouches.length === 1 && e.touches.length === 0) {
                    _yuitest_coverline("build/event-flick/event-flick.js", 197);
endEvent = e.changedTouches[0];
                } else {
                    _yuitest_coverline("build/event-flick/event-flick.js", 199);
valid = false;
                }
            }

            _yuitest_coverline("build/event-flick/event-flick.js", 203);
if (valid) {

                _yuitest_coverline("build/event-flick/event-flick.js", 205);
params = subscriber._extra;
                _yuitest_coverline("build/event-flick/event-flick.js", 206);
preventDefault = params[PREVENT_DEFAULT];

                _yuitest_coverline("build/event-flick/event-flick.js", 208);
if (preventDefault) {
                    // preventDefault is a boolean or function
                    _yuitest_coverline("build/event-flick/event-flick.js", 210);
if (!preventDefault.call || preventDefault(e)) {
                        _yuitest_coverline("build/event-flick/event-flick.js", 211);
e.preventDefault();
                    }
                }

                _yuitest_coverline("build/event-flick/event-flick.js", 215);
startTime = start.flick.time;
                _yuitest_coverline("build/event-flick/event-flick.js", 216);
endTime = new Date().getTime();
                _yuitest_coverline("build/event-flick/event-flick.js", 217);
time = endTime - startTime;

                _yuitest_coverline("build/event-flick/event-flick.js", 219);
xyDistance = [
                    endEvent.pageX - start.pageX,
                    endEvent.pageY - start.pageY
                ];

                _yuitest_coverline("build/event-flick/event-flick.js", 224);
if (params.axis) {
                    _yuitest_coverline("build/event-flick/event-flick.js", 225);
axis = params.axis;
                } else {
                    _yuitest_coverline("build/event-flick/event-flick.js", 227);
axis = (Math.abs(xyDistance[0]) >= Math.abs(xyDistance[1])) ? 'x' : 'y';
                }

                _yuitest_coverline("build/event-flick/event-flick.js", 230);
distance = xyDistance[(axis === 'x') ? 0 : 1];
                _yuitest_coverline("build/event-flick/event-flick.js", 231);
velocity = (time !== 0) ? distance/time : 0;

                _yuitest_coverline("build/event-flick/event-flick.js", 233);
if (isFinite(velocity) && (Math.abs(distance) >= params[MIN_DISTANCE]) && (Math.abs(velocity)  >= params[MIN_VELOCITY])) {

                    _yuitest_coverline("build/event-flick/event-flick.js", 235);
e.type = "flick";
                    _yuitest_coverline("build/event-flick/event-flick.js", 236);
e.flick = {
                        time:time,
                        distance: distance,
                        velocity:velocity,
                        axis: axis,
                        start : start
                    };

                    _yuitest_coverline("build/event-flick/event-flick.js", 244);
ce.fire(e);

                }

                _yuitest_coverline("build/event-flick/event-flick.js", 248);
subscriber[_FLICK_START] = null;
            }
        }
    },

    MIN_VELOCITY : 0,
    MIN_DISTANCE : 0,
    PREVENT_DEFAULT : false
});


}, '@VERSION@', {"requires": ["node-base", "event-touch", "event-synthetic"]});
