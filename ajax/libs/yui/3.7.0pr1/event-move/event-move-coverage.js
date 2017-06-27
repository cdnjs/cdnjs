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
_yuitest_coverage["/build/event-move/event-move.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/event-move/event-move.js",
    code: []
};
_yuitest_coverage["/build/event-move/event-move.js"].code=["YUI.add('event-move', function(Y) {","","/**"," * Adds lower level support for \"gesturemovestart\", \"gesturemove\" and \"gesturemoveend\" events, which can be used to create drag/drop"," * interactions which work across touch and mouse input devices. They correspond to \"touchstart\", \"touchmove\" and \"touchend\" on a touch input"," * device, and \"mousedown\", \"mousemove\", \"mouseup\" on a mouse based input device."," *"," * @module event-gestures"," * @submodule event-move"," */","","var EVENT = ((Y.config.win && (\"ontouchstart\" in Y.config.win)) && !(Y.UA.chrome && Y.UA.chrome < 6)) ? {","        start: \"touchstart\",","        move: \"touchmove\",","        end: \"touchend\"","    } : {","        start: \"mousedown\",","        move: \"mousemove\",","        end: \"mouseup\"","    },","","    START = \"start\",","    MOVE = \"move\",","    END = \"end\",","","    GESTURE_MOVE = \"gesture\" + MOVE,","    GESTURE_MOVE_END = GESTURE_MOVE + END,","    GESTURE_MOVE_START = GESTURE_MOVE + START,","","    _MOVE_START_HANDLE = \"_msh\",","    _MOVE_HANDLE = \"_mh\",","    _MOVE_END_HANDLE = \"_meh\",","","    _DEL_MOVE_START_HANDLE = \"_dmsh\",","    _DEL_MOVE_HANDLE = \"_dmh\",","    _DEL_MOVE_END_HANDLE = \"_dmeh\",","","    _MOVE_START = \"_ms\",","    _MOVE = \"_m\",","","    MIN_TIME = \"minTime\",","    MIN_DISTANCE = \"minDistance\",","    PREVENT_DEFAULT = \"preventDefault\",","    BUTTON = \"button\",","    OWNER_DOCUMENT = \"ownerDocument\",","","    CURRENT_TARGET = \"currentTarget\",","    TARGET = \"target\",","","    NODE_TYPE = \"nodeType\",","","    _defArgsProcessor = function(se, args, delegate) {","        var iConfig = (delegate) ? 4 : 3, ","            config = (args.length > iConfig) ? Y.merge(args.splice(iConfig,1)[0]) : {};","","        if (!(PREVENT_DEFAULT in config)) {","            config[PREVENT_DEFAULT] = se.PREVENT_DEFAULT;","        }","","        return config;","    },","","    _getRoot = function(node, subscriber) {","        return subscriber._extra.root || (node.get(NODE_TYPE) === 9) ? node : node.get(OWNER_DOCUMENT);","    },","","    _normTouchFacade = function(touchFacade, touch, params) {","        touchFacade.pageX = touch.pageX;","        touchFacade.pageY = touch.pageY;","        touchFacade.screenX = touch.screenX;","        touchFacade.screenY = touch.screenY;","        touchFacade.clientX = touch.clientX;","        touchFacade.clientY = touch.clientY;","        touchFacade[TARGET] = touchFacade[TARGET] || touch[TARGET];","        touchFacade[CURRENT_TARGET] = touchFacade[CURRENT_TARGET] || touch[CURRENT_TARGET];","","        touchFacade[BUTTON] = (params && params[BUTTON]) || 1; // default to left (left as per vendors, not W3C which is 0)","    },","","    _prevent = function(e, preventDefault) {","        if (preventDefault) {","            // preventDefault is a boolean or a function","            if (!preventDefault.call || preventDefault(e)) {","                e.preventDefault();","            }","        }","    },","","    define = Y.Event.define;","","/**"," * Sets up a \"gesturemovestart\" event, that is fired on touch devices in response to a single finger \"touchstart\","," * and on mouse based devices in response to a \"mousedown\". The subscriber can specify the minimum time"," * and distance thresholds which should be crossed before the \"gesturemovestart\" is fired and for the mouse,"," * which button should initiate a \"gesturemovestart\". This event can also be listened for using node.delegate()."," * "," * <p>It is recommended that you use Y.bind to set up context and additional arguments for your event handler,"," * however if you want to pass the context and arguments as additional signature arguments to on/delegate, "," * you need to provide a null value for the configuration object, e.g: <code>node.on(\"gesturemovestart\", fn, null, context, arg1, arg2, arg3)</code></p>"," *"," * @event gesturemovestart"," * @for YUI"," * @param type {string} \"gesturemovestart\""," * @param fn {function} The method the event invokes. It receives the event facade of the underlying DOM event (mousedown or touchstart.touches[0]) which contains position co-ordinates."," * @param cfg {Object} Optional. An object which specifies:"," *"," * <dl>"," * <dt>minDistance (defaults to 0)</dt>"," * <dd>The minimum distance threshold which should be crossed before the gesturemovestart is fired</dd>"," * <dt>minTime (defaults to 0)</dt>"," * <dd>The minimum time threshold for which the finger/mouse should be help down before the gesturemovestart is fired</dd>"," * <dt>button (no default)</dt>"," * <dd>In the case of a mouse input device, if the event should only be fired for a specific mouse button.</dd>"," * <dt>preventDefault (defaults to false)</dt>"," * <dd>Can be set to true/false to prevent default behavior as soon as the touchstart or mousedown is received (that is before minTime or minDistance thresholds are crossed, and so before the gesturemovestart listener is notified) so that things like text selection and context popups (on touch devices) can be "," * prevented. This property can also be set to a function, which returns true or false, based on the event facade passed to it (for example, DragDrop can determine if the target is a valid handle or not before preventing default).</dd>"," * </dl>"," *"," * @return {EventHandle} the detach handle"," */","","define(GESTURE_MOVE_START, {","","    on: function (node, subscriber, ce) {","","        subscriber[_MOVE_START_HANDLE] = node.on(EVENT[START], ","            this._onStart,","            this,","            node,","            subscriber,","            ce);","    },","","    delegate : function(node, subscriber, ce, filter) {","","        var se = this;","","        subscriber[_DEL_MOVE_START_HANDLE] = node.delegate(EVENT[START],","            function(e) {","                se._onStart(e, node, subscriber, ce, true);","            },","            filter);","    },","","    detachDelegate : function(node, subscriber, ce, filter) {","        var handle = subscriber[_DEL_MOVE_START_HANDLE];","","        if (handle) {","            handle.detach();","            subscriber[_DEL_MOVE_START_HANDLE] = null;","        }","    },","","    detach: function (node, subscriber, ce) {","        var startHandle = subscriber[_MOVE_START_HANDLE];","","        if (startHandle) {","            startHandle.detach();","            subscriber[_MOVE_START_HANDLE] = null;","        }","    },","","    processArgs : function(args, delegate) {","        var params = _defArgsProcessor(this, args, delegate);","","        if (!(MIN_TIME in params)) {","            params[MIN_TIME] = this.MIN_TIME;","        }","","        if (!(MIN_DISTANCE in params)) {","            params[MIN_DISTANCE] = this.MIN_DISTANCE;","        }","","        return params;","    },","","    _onStart : function(e, node, subscriber, ce, delegate) {","","        if (delegate) {","            node = e[CURRENT_TARGET];","        }","","        var params = subscriber._extra,","            fireStart = true,","            minTime = params[MIN_TIME],","            minDistance = params[MIN_DISTANCE],","            button = params.button,","            preventDefault = params[PREVENT_DEFAULT],","            root = _getRoot(node, subscriber),","            startXY;","","        if (e.touches) {","            if (e.touches.length === 1) {","                _normTouchFacade(e, e.touches[0], params);","            } else {","                fireStart = false;","            }","        } else {","            fireStart = (button === undefined) || (button === e.button);","        }","","","        if (fireStart) {","","            _prevent(e, preventDefault);","","            if (minTime === 0 || minDistance === 0) {","                this._start(e, node, ce, params);","","            } else {","","                startXY = [e.pageX, e.pageY];","","                if (minTime > 0) {","","","                    params._ht = Y.later(minTime, this, this._start, [e, node, ce, params]);","","                    params._hme = root.on(EVENT[END], Y.bind(function() {","                        this._cancel(params);","                    }, this));","                }","","                if (minDistance > 0) {","","","                    params._hm = root.on(EVENT[MOVE], Y.bind(function(em) {","                        if (Math.abs(em.pageX - startXY[0]) > minDistance || Math.abs(em.pageY - startXY[1]) > minDistance) {","                            this._start(e, node, ce, params);","                        }","                    }, this));","                }                        ","            }","        }","    },","","    _cancel : function(params) {","        if (params._ht) {","            params._ht.cancel();","            params._ht = null;","        }","        if (params._hme) {","            params._hme.detach();","            params._hme = null;","        }","        if (params._hm) {","            params._hm.detach();","            params._hm = null;","        }","    },","","    _start : function(e, node, ce, params) {","","        if (params) {","            this._cancel(params);","        }","","        e.type = GESTURE_MOVE_START;","","","        node.setData(_MOVE_START, e);","        ce.fire(e);","    },","","    MIN_TIME : 0,","    MIN_DISTANCE : 0,","    PREVENT_DEFAULT : false","});","","/**"," * Sets up a \"gesturemove\" event, that is fired on touch devices in response to a single finger \"touchmove\","," * and on mouse based devices in response to a \"mousemove\"."," * "," * <p>By default this event is only fired when the same node"," * has received a \"gesturemovestart\" event. The subscriber can set standAlone to true, in the configuration properties,"," * if they want to listen for this event without an initial \"gesturemovestart\".</p>"," * "," * <p>By default this event sets up it's internal \"touchmove\" and \"mousemove\" DOM listeners on the document element. The subscriber"," * can set the root configuration property, to specify which node to attach DOM listeners to, if different from the document.</p> "," *"," * <p>This event can also be listened for using node.delegate().</p>"," *"," * <p>It is recommended that you use Y.bind to set up context and additional arguments for your event handler,"," * however if you want to pass the context and arguments as additional signature arguments to on/delegate, "," * you need to provide a null value for the configuration object, e.g: <code>node.on(\"gesturemove\", fn, null, context, arg1, arg2, arg3)</code></p>"," *"," * @event gesturemove"," * @for YUI"," * @param type {string} \"gesturemove\""," * @param fn {function} The method the event invokes. It receives the event facade of the underlying DOM event (mousemove or touchmove.touches[0]) which contains position co-ordinates."," * @param cfg {Object} Optional. An object which specifies:"," * <dl>"," * <dt>standAlone (defaults to false)</dt>"," * <dd>true, if the subscriber should be notified even if a \"gesturemovestart\" has not occured on the same node.</dd>"," * <dt>root (defaults to document)</dt>"," * <dd>The node to which the internal DOM listeners should be attached.</dd>"," * <dt>preventDefault (defaults to false)</dt>"," * <dd>Can be set to true/false to prevent default behavior as soon as the touchmove or mousemove is received. As with gesturemovestart, can also be set to function which returns true/false based on the event facade passed to it.</dd>"," * </dl>"," *"," * @return {EventHandle} the detach handle"," */","define(GESTURE_MOVE, {","","    on : function (node, subscriber, ce) {","","        var root = _getRoot(node, subscriber),","","            moveHandle = root.on(EVENT[MOVE], ","                this._onMove,","                this,","                node,","                subscriber,","                ce);","","        subscriber[_MOVE_HANDLE] = moveHandle;","    },","","    delegate : function(node, subscriber, ce, filter) {","","        var se = this;","","        subscriber[_DEL_MOVE_HANDLE] = node.delegate(EVENT[MOVE],","            function(e) {","                se._onMove(e, node, subscriber, ce, true);","            },","            filter);","    },","","    detach : function (node, subscriber, ce) {","        var moveHandle = subscriber[_MOVE_HANDLE];","","        if (moveHandle) {","            moveHandle.detach();","            subscriber[_MOVE_HANDLE] = null;","        }","    },","    ","    detachDelegate : function(node, subscriber, ce, filter) {","        var handle = subscriber[_DEL_MOVE_HANDLE];","","        if (handle) {","            handle.detach();","            subscriber[_DEL_MOVE_HANDLE] = null;","        }","","    },","","    processArgs : function(args, delegate) {","        return _defArgsProcessor(this, args, delegate);","    },","","    _onMove : function(e, node, subscriber, ce, delegate) {","","        if (delegate) {","            node = e[CURRENT_TARGET];","        }","","        var fireMove = subscriber._extra.standAlone || node.getData(_MOVE_START),","            preventDefault = subscriber._extra.preventDefault;","","","        if (fireMove) {","","            if (e.touches) {","                if (e.touches.length === 1) {","                    _normTouchFacade(e, e.touches[0]);                    ","                } else {","                    fireMove = false;","                }","            }","","            if (fireMove) {","","                _prevent(e, preventDefault);","","","                e.type = GESTURE_MOVE;","                ce.fire(e);","            }","        }","    },","    ","    PREVENT_DEFAULT : false","});","","/**"," * Sets up a \"gesturemoveend\" event, that is fired on touch devices in response to a single finger \"touchend\","," * and on mouse based devices in response to a \"mouseup\"."," * "," * <p>By default this event is only fired when the same node"," * has received a \"gesturemove\" or \"gesturemovestart\" event. The subscriber can set standAlone to true, in the configuration properties,"," * if they want to listen for this event without a preceding \"gesturemovestart\" or \"gesturemove\".</p>"," *"," * <p>By default this event sets up it's internal \"touchend\" and \"mouseup\" DOM listeners on the document element. The subscriber"," * can set the root configuration property, to specify which node to attach DOM listeners to, if different from the document.</p> "," *"," * <p>This event can also be listened for using node.delegate().</p>"," *"," * <p>It is recommended that you use Y.bind to set up context and additional arguments for your event handler,"," * however if you want to pass the context and arguments as additional signature arguments to on/delegate, "," * you need to provide a null value for the configuration object, e.g: <code>node.on(\"gesturemoveend\", fn, null, context, arg1, arg2, arg3)</code></p>"," *"," *"," * @event gesturemoveend"," * @for YUI"," * @param type {string} \"gesturemoveend\""," * @param fn {function} The method the event invokes. It receives the event facade of the underlying DOM event (mouseup or touchend.changedTouches[0])."," * @param cfg {Object} Optional. An object which specifies:"," * <dl>"," * <dt>standAlone (defaults to false)</dt>"," * <dd>true, if the subscriber should be notified even if a \"gesturemovestart\" or \"gesturemove\" has not occured on the same node.</dd>"," * <dt>root (defaults to document)</dt>"," * <dd>The node to which the internal DOM listeners should be attached.</dd>"," * <dt>preventDefault (defaults to false)</dt>"," * <dd>Can be set to true/false to prevent default behavior as soon as the touchend or mouseup is received. As with gesturemovestart, can also be set to function which returns true/false based on the event facade passed to it.</dd>"," * </dl>"," *"," * @return {EventHandle} the detach handle"," */","define(GESTURE_MOVE_END, {","","    on : function (node, subscriber, ce) {","","        var root = _getRoot(node, subscriber),","","            endHandle = root.on(EVENT[END], ","                this._onEnd, ","                this,","                node,","                subscriber, ","                ce);","","        subscriber[_MOVE_END_HANDLE] = endHandle;","    },","","    delegate : function(node, subscriber, ce, filter) {","","        var se = this;","","        subscriber[_DEL_MOVE_END_HANDLE] = node.delegate(EVENT[END],","            function(e) {","                se._onEnd(e, node, subscriber, ce, true);","            },","            filter);","    },","","    detachDelegate : function(node, subscriber, ce, filter) {","        var handle = subscriber[_DEL_MOVE_END_HANDLE];","","        if (handle) {","            handle.detach();","            subscriber[_DEL_MOVE_END_HANDLE] = null;","        }","","    },","","    detach : function (node, subscriber, ce) {","        var endHandle = subscriber[_MOVE_END_HANDLE];","    ","        if (endHandle) {","            endHandle.detach();","            subscriber[_MOVE_END_HANDLE] = null;","        }","    },","","    processArgs : function(args, delegate) {","        return _defArgsProcessor(this, args, delegate);","    },","","    _onEnd : function(e, node, subscriber, ce, delegate) {","","        if (delegate) {","            node = e[CURRENT_TARGET];","        }","","        var fireMoveEnd = subscriber._extra.standAlone || node.getData(_MOVE) || node.getData(_MOVE_START),","            preventDefault = subscriber._extra.preventDefault;","","        if (fireMoveEnd) {","","            if (e.changedTouches) {","                if (e.changedTouches.length === 1) {","                    _normTouchFacade(e, e.changedTouches[0]);                    ","                } else {","                    fireMoveEnd = false;","                }","            }","","            if (fireMoveEnd) {","","                _prevent(e, preventDefault);","","                e.type = GESTURE_MOVE_END;","                ce.fire(e);","","                node.clearData(_MOVE_START);","                node.clearData(_MOVE);","            }","        }","    },","","    PREVENT_DEFAULT : false","});","","","}, '@VERSION@' ,{requires:['node-base','event-touch','event-synthetic']});"];
_yuitest_coverage["/build/event-move/event-move.js"].lines = {"1":0,"12":0,"53":0,"56":0,"57":0,"60":0,"64":0,"68":0,"69":0,"70":0,"71":0,"72":0,"73":0,"74":0,"75":0,"77":0,"81":0,"83":0,"84":0,"122":0,"126":0,"136":0,"138":0,"140":0,"146":0,"148":0,"149":0,"150":0,"155":0,"157":0,"158":0,"159":0,"164":0,"166":0,"167":0,"170":0,"171":0,"174":0,"179":0,"180":0,"183":0,"192":0,"193":0,"194":0,"196":0,"199":0,"203":0,"205":0,"207":0,"208":0,"212":0,"214":0,"217":0,"219":0,"220":0,"224":0,"227":0,"228":0,"229":0,"238":0,"239":0,"240":0,"242":0,"243":0,"244":0,"246":0,"247":0,"248":0,"254":0,"255":0,"258":0,"261":0,"262":0,"303":0,"307":0,"316":0,"321":0,"323":0,"325":0,"331":0,"333":0,"334":0,"335":0,"340":0,"342":0,"343":0,"344":0,"350":0,"355":0,"356":0,"359":0,"363":0,"365":0,"366":0,"367":0,"369":0,"373":0,"375":0,"378":0,"379":0,"421":0,"425":0,"434":0,"439":0,"441":0,"443":0,"449":0,"451":0,"452":0,"453":0,"459":0,"461":0,"462":0,"463":0,"468":0,"473":0,"474":0,"477":0,"480":0,"482":0,"483":0,"484":0,"486":0,"490":0,"492":0,"494":0,"495":0,"497":0,"498":0};
_yuitest_coverage["/build/event-move/event-move.js"].functions = {"_defArgsProcessor:52":0,"_getRoot:63":0,"_normTouchFacade:67":0,"_prevent:80":0,"on:124":0,"(anonymous 2):139":0,"delegate:134":0,"detachDelegate:145":0,"detach:154":0,"processArgs:163":0,"(anonymous 3):219":0,"(anonymous 4):227":0,"_onStart:177":0,"_cancel:237":0,"_start:252":0,"on:305":0,"(anonymous 5):324":0,"delegate:319":0,"detach:330":0,"detachDelegate:339":0,"processArgs:349":0,"_onMove:353":0,"on:423":0,"(anonymous 6):442":0,"delegate:437":0,"detachDelegate:448":0,"detach:458":0,"processArgs:467":0,"_onEnd:471":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/event-move/event-move.js"].coveredLines = 129;
_yuitest_coverage["/build/event-move/event-move.js"].coveredFunctions = 30;
_yuitest_coverline("/build/event-move/event-move.js", 1);
YUI.add('event-move', function(Y) {

/**
 * Adds lower level support for "gesturemovestart", "gesturemove" and "gesturemoveend" events, which can be used to create drag/drop
 * interactions which work across touch and mouse input devices. They correspond to "touchstart", "touchmove" and "touchend" on a touch input
 * device, and "mousedown", "mousemove", "mouseup" on a mouse based input device.
 *
 * @module event-gestures
 * @submodule event-move
 */

_yuitest_coverfunc("/build/event-move/event-move.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/event-move/event-move.js", 12);
var EVENT = ((Y.config.win && ("ontouchstart" in Y.config.win)) && !(Y.UA.chrome && Y.UA.chrome < 6)) ? {
        start: "touchstart",
        move: "touchmove",
        end: "touchend"
    } : {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup"
    },

    START = "start",
    MOVE = "move",
    END = "end",

    GESTURE_MOVE = "gesture" + MOVE,
    GESTURE_MOVE_END = GESTURE_MOVE + END,
    GESTURE_MOVE_START = GESTURE_MOVE + START,

    _MOVE_START_HANDLE = "_msh",
    _MOVE_HANDLE = "_mh",
    _MOVE_END_HANDLE = "_meh",

    _DEL_MOVE_START_HANDLE = "_dmsh",
    _DEL_MOVE_HANDLE = "_dmh",
    _DEL_MOVE_END_HANDLE = "_dmeh",

    _MOVE_START = "_ms",
    _MOVE = "_m",

    MIN_TIME = "minTime",
    MIN_DISTANCE = "minDistance",
    PREVENT_DEFAULT = "preventDefault",
    BUTTON = "button",
    OWNER_DOCUMENT = "ownerDocument",

    CURRENT_TARGET = "currentTarget",
    TARGET = "target",

    NODE_TYPE = "nodeType",

    _defArgsProcessor = function(se, args, delegate) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "_defArgsProcessor", 52);
_yuitest_coverline("/build/event-move/event-move.js", 53);
var iConfig = (delegate) ? 4 : 3, 
            config = (args.length > iConfig) ? Y.merge(args.splice(iConfig,1)[0]) : {};

        _yuitest_coverline("/build/event-move/event-move.js", 56);
if (!(PREVENT_DEFAULT in config)) {
            _yuitest_coverline("/build/event-move/event-move.js", 57);
config[PREVENT_DEFAULT] = se.PREVENT_DEFAULT;
        }

        _yuitest_coverline("/build/event-move/event-move.js", 60);
return config;
    },

    _getRoot = function(node, subscriber) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "_getRoot", 63);
_yuitest_coverline("/build/event-move/event-move.js", 64);
return subscriber._extra.root || (node.get(NODE_TYPE) === 9) ? node : node.get(OWNER_DOCUMENT);
    },

    _normTouchFacade = function(touchFacade, touch, params) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "_normTouchFacade", 67);
_yuitest_coverline("/build/event-move/event-move.js", 68);
touchFacade.pageX = touch.pageX;
        _yuitest_coverline("/build/event-move/event-move.js", 69);
touchFacade.pageY = touch.pageY;
        _yuitest_coverline("/build/event-move/event-move.js", 70);
touchFacade.screenX = touch.screenX;
        _yuitest_coverline("/build/event-move/event-move.js", 71);
touchFacade.screenY = touch.screenY;
        _yuitest_coverline("/build/event-move/event-move.js", 72);
touchFacade.clientX = touch.clientX;
        _yuitest_coverline("/build/event-move/event-move.js", 73);
touchFacade.clientY = touch.clientY;
        _yuitest_coverline("/build/event-move/event-move.js", 74);
touchFacade[TARGET] = touchFacade[TARGET] || touch[TARGET];
        _yuitest_coverline("/build/event-move/event-move.js", 75);
touchFacade[CURRENT_TARGET] = touchFacade[CURRENT_TARGET] || touch[CURRENT_TARGET];

        _yuitest_coverline("/build/event-move/event-move.js", 77);
touchFacade[BUTTON] = (params && params[BUTTON]) || 1; // default to left (left as per vendors, not W3C which is 0)
    },

    _prevent = function(e, preventDefault) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "_prevent", 80);
_yuitest_coverline("/build/event-move/event-move.js", 81);
if (preventDefault) {
            // preventDefault is a boolean or a function
            _yuitest_coverline("/build/event-move/event-move.js", 83);
if (!preventDefault.call || preventDefault(e)) {
                _yuitest_coverline("/build/event-move/event-move.js", 84);
e.preventDefault();
            }
        }
    },

    define = Y.Event.define;

/**
 * Sets up a "gesturemovestart" event, that is fired on touch devices in response to a single finger "touchstart",
 * and on mouse based devices in response to a "mousedown". The subscriber can specify the minimum time
 * and distance thresholds which should be crossed before the "gesturemovestart" is fired and for the mouse,
 * which button should initiate a "gesturemovestart". This event can also be listened for using node.delegate().
 * 
 * <p>It is recommended that you use Y.bind to set up context and additional arguments for your event handler,
 * however if you want to pass the context and arguments as additional signature arguments to on/delegate, 
 * you need to provide a null value for the configuration object, e.g: <code>node.on("gesturemovestart", fn, null, context, arg1, arg2, arg3)</code></p>
 *
 * @event gesturemovestart
 * @for YUI
 * @param type {string} "gesturemovestart"
 * @param fn {function} The method the event invokes. It receives the event facade of the underlying DOM event (mousedown or touchstart.touches[0]) which contains position co-ordinates.
 * @param cfg {Object} Optional. An object which specifies:
 *
 * <dl>
 * <dt>minDistance (defaults to 0)</dt>
 * <dd>The minimum distance threshold which should be crossed before the gesturemovestart is fired</dd>
 * <dt>minTime (defaults to 0)</dt>
 * <dd>The minimum time threshold for which the finger/mouse should be help down before the gesturemovestart is fired</dd>
 * <dt>button (no default)</dt>
 * <dd>In the case of a mouse input device, if the event should only be fired for a specific mouse button.</dd>
 * <dt>preventDefault (defaults to false)</dt>
 * <dd>Can be set to true/false to prevent default behavior as soon as the touchstart or mousedown is received (that is before minTime or minDistance thresholds are crossed, and so before the gesturemovestart listener is notified) so that things like text selection and context popups (on touch devices) can be 
 * prevented. This property can also be set to a function, which returns true or false, based on the event facade passed to it (for example, DragDrop can determine if the target is a valid handle or not before preventing default).</dd>
 * </dl>
 *
 * @return {EventHandle} the detach handle
 */

_yuitest_coverline("/build/event-move/event-move.js", 122);
define(GESTURE_MOVE_START, {

    on: function (node, subscriber, ce) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "on", 124);
_yuitest_coverline("/build/event-move/event-move.js", 126);
subscriber[_MOVE_START_HANDLE] = node.on(EVENT[START], 
            this._onStart,
            this,
            node,
            subscriber,
            ce);
    },

    delegate : function(node, subscriber, ce, filter) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "delegate", 134);
_yuitest_coverline("/build/event-move/event-move.js", 136);
var se = this;

        _yuitest_coverline("/build/event-move/event-move.js", 138);
subscriber[_DEL_MOVE_START_HANDLE] = node.delegate(EVENT[START],
            function(e) {
                _yuitest_coverfunc("/build/event-move/event-move.js", "(anonymous 2)", 139);
_yuitest_coverline("/build/event-move/event-move.js", 140);
se._onStart(e, node, subscriber, ce, true);
            },
            filter);
    },

    detachDelegate : function(node, subscriber, ce, filter) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "detachDelegate", 145);
_yuitest_coverline("/build/event-move/event-move.js", 146);
var handle = subscriber[_DEL_MOVE_START_HANDLE];

        _yuitest_coverline("/build/event-move/event-move.js", 148);
if (handle) {
            _yuitest_coverline("/build/event-move/event-move.js", 149);
handle.detach();
            _yuitest_coverline("/build/event-move/event-move.js", 150);
subscriber[_DEL_MOVE_START_HANDLE] = null;
        }
    },

    detach: function (node, subscriber, ce) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "detach", 154);
_yuitest_coverline("/build/event-move/event-move.js", 155);
var startHandle = subscriber[_MOVE_START_HANDLE];

        _yuitest_coverline("/build/event-move/event-move.js", 157);
if (startHandle) {
            _yuitest_coverline("/build/event-move/event-move.js", 158);
startHandle.detach();
            _yuitest_coverline("/build/event-move/event-move.js", 159);
subscriber[_MOVE_START_HANDLE] = null;
        }
    },

    processArgs : function(args, delegate) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "processArgs", 163);
_yuitest_coverline("/build/event-move/event-move.js", 164);
var params = _defArgsProcessor(this, args, delegate);

        _yuitest_coverline("/build/event-move/event-move.js", 166);
if (!(MIN_TIME in params)) {
            _yuitest_coverline("/build/event-move/event-move.js", 167);
params[MIN_TIME] = this.MIN_TIME;
        }

        _yuitest_coverline("/build/event-move/event-move.js", 170);
if (!(MIN_DISTANCE in params)) {
            _yuitest_coverline("/build/event-move/event-move.js", 171);
params[MIN_DISTANCE] = this.MIN_DISTANCE;
        }

        _yuitest_coverline("/build/event-move/event-move.js", 174);
return params;
    },

    _onStart : function(e, node, subscriber, ce, delegate) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "_onStart", 177);
_yuitest_coverline("/build/event-move/event-move.js", 179);
if (delegate) {
            _yuitest_coverline("/build/event-move/event-move.js", 180);
node = e[CURRENT_TARGET];
        }

        _yuitest_coverline("/build/event-move/event-move.js", 183);
var params = subscriber._extra,
            fireStart = true,
            minTime = params[MIN_TIME],
            minDistance = params[MIN_DISTANCE],
            button = params.button,
            preventDefault = params[PREVENT_DEFAULT],
            root = _getRoot(node, subscriber),
            startXY;

        _yuitest_coverline("/build/event-move/event-move.js", 192);
if (e.touches) {
            _yuitest_coverline("/build/event-move/event-move.js", 193);
if (e.touches.length === 1) {
                _yuitest_coverline("/build/event-move/event-move.js", 194);
_normTouchFacade(e, e.touches[0], params);
            } else {
                _yuitest_coverline("/build/event-move/event-move.js", 196);
fireStart = false;
            }
        } else {
            _yuitest_coverline("/build/event-move/event-move.js", 199);
fireStart = (button === undefined) || (button === e.button);
        }


        _yuitest_coverline("/build/event-move/event-move.js", 203);
if (fireStart) {

            _yuitest_coverline("/build/event-move/event-move.js", 205);
_prevent(e, preventDefault);

            _yuitest_coverline("/build/event-move/event-move.js", 207);
if (minTime === 0 || minDistance === 0) {
                _yuitest_coverline("/build/event-move/event-move.js", 208);
this._start(e, node, ce, params);

            } else {

                _yuitest_coverline("/build/event-move/event-move.js", 212);
startXY = [e.pageX, e.pageY];

                _yuitest_coverline("/build/event-move/event-move.js", 214);
if (minTime > 0) {


                    _yuitest_coverline("/build/event-move/event-move.js", 217);
params._ht = Y.later(minTime, this, this._start, [e, node, ce, params]);

                    _yuitest_coverline("/build/event-move/event-move.js", 219);
params._hme = root.on(EVENT[END], Y.bind(function() {
                        _yuitest_coverfunc("/build/event-move/event-move.js", "(anonymous 3)", 219);
_yuitest_coverline("/build/event-move/event-move.js", 220);
this._cancel(params);
                    }, this));
                }

                _yuitest_coverline("/build/event-move/event-move.js", 224);
if (minDistance > 0) {


                    _yuitest_coverline("/build/event-move/event-move.js", 227);
params._hm = root.on(EVENT[MOVE], Y.bind(function(em) {
                        _yuitest_coverfunc("/build/event-move/event-move.js", "(anonymous 4)", 227);
_yuitest_coverline("/build/event-move/event-move.js", 228);
if (Math.abs(em.pageX - startXY[0]) > minDistance || Math.abs(em.pageY - startXY[1]) > minDistance) {
                            _yuitest_coverline("/build/event-move/event-move.js", 229);
this._start(e, node, ce, params);
                        }
                    }, this));
                }                        
            }
        }
    },

    _cancel : function(params) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "_cancel", 237);
_yuitest_coverline("/build/event-move/event-move.js", 238);
if (params._ht) {
            _yuitest_coverline("/build/event-move/event-move.js", 239);
params._ht.cancel();
            _yuitest_coverline("/build/event-move/event-move.js", 240);
params._ht = null;
        }
        _yuitest_coverline("/build/event-move/event-move.js", 242);
if (params._hme) {
            _yuitest_coverline("/build/event-move/event-move.js", 243);
params._hme.detach();
            _yuitest_coverline("/build/event-move/event-move.js", 244);
params._hme = null;
        }
        _yuitest_coverline("/build/event-move/event-move.js", 246);
if (params._hm) {
            _yuitest_coverline("/build/event-move/event-move.js", 247);
params._hm.detach();
            _yuitest_coverline("/build/event-move/event-move.js", 248);
params._hm = null;
        }
    },

    _start : function(e, node, ce, params) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "_start", 252);
_yuitest_coverline("/build/event-move/event-move.js", 254);
if (params) {
            _yuitest_coverline("/build/event-move/event-move.js", 255);
this._cancel(params);
        }

        _yuitest_coverline("/build/event-move/event-move.js", 258);
e.type = GESTURE_MOVE_START;


        _yuitest_coverline("/build/event-move/event-move.js", 261);
node.setData(_MOVE_START, e);
        _yuitest_coverline("/build/event-move/event-move.js", 262);
ce.fire(e);
    },

    MIN_TIME : 0,
    MIN_DISTANCE : 0,
    PREVENT_DEFAULT : false
});

/**
 * Sets up a "gesturemove" event, that is fired on touch devices in response to a single finger "touchmove",
 * and on mouse based devices in response to a "mousemove".
 * 
 * <p>By default this event is only fired when the same node
 * has received a "gesturemovestart" event. The subscriber can set standAlone to true, in the configuration properties,
 * if they want to listen for this event without an initial "gesturemovestart".</p>
 * 
 * <p>By default this event sets up it's internal "touchmove" and "mousemove" DOM listeners on the document element. The subscriber
 * can set the root configuration property, to specify which node to attach DOM listeners to, if different from the document.</p> 
 *
 * <p>This event can also be listened for using node.delegate().</p>
 *
 * <p>It is recommended that you use Y.bind to set up context and additional arguments for your event handler,
 * however if you want to pass the context and arguments as additional signature arguments to on/delegate, 
 * you need to provide a null value for the configuration object, e.g: <code>node.on("gesturemove", fn, null, context, arg1, arg2, arg3)</code></p>
 *
 * @event gesturemove
 * @for YUI
 * @param type {string} "gesturemove"
 * @param fn {function} The method the event invokes. It receives the event facade of the underlying DOM event (mousemove or touchmove.touches[0]) which contains position co-ordinates.
 * @param cfg {Object} Optional. An object which specifies:
 * <dl>
 * <dt>standAlone (defaults to false)</dt>
 * <dd>true, if the subscriber should be notified even if a "gesturemovestart" has not occured on the same node.</dd>
 * <dt>root (defaults to document)</dt>
 * <dd>The node to which the internal DOM listeners should be attached.</dd>
 * <dt>preventDefault (defaults to false)</dt>
 * <dd>Can be set to true/false to prevent default behavior as soon as the touchmove or mousemove is received. As with gesturemovestart, can also be set to function which returns true/false based on the event facade passed to it.</dd>
 * </dl>
 *
 * @return {EventHandle} the detach handle
 */
_yuitest_coverline("/build/event-move/event-move.js", 303);
define(GESTURE_MOVE, {

    on : function (node, subscriber, ce) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "on", 305);
_yuitest_coverline("/build/event-move/event-move.js", 307);
var root = _getRoot(node, subscriber),

            moveHandle = root.on(EVENT[MOVE], 
                this._onMove,
                this,
                node,
                subscriber,
                ce);

        _yuitest_coverline("/build/event-move/event-move.js", 316);
subscriber[_MOVE_HANDLE] = moveHandle;
    },

    delegate : function(node, subscriber, ce, filter) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "delegate", 319);
_yuitest_coverline("/build/event-move/event-move.js", 321);
var se = this;

        _yuitest_coverline("/build/event-move/event-move.js", 323);
subscriber[_DEL_MOVE_HANDLE] = node.delegate(EVENT[MOVE],
            function(e) {
                _yuitest_coverfunc("/build/event-move/event-move.js", "(anonymous 5)", 324);
_yuitest_coverline("/build/event-move/event-move.js", 325);
se._onMove(e, node, subscriber, ce, true);
            },
            filter);
    },

    detach : function (node, subscriber, ce) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "detach", 330);
_yuitest_coverline("/build/event-move/event-move.js", 331);
var moveHandle = subscriber[_MOVE_HANDLE];

        _yuitest_coverline("/build/event-move/event-move.js", 333);
if (moveHandle) {
            _yuitest_coverline("/build/event-move/event-move.js", 334);
moveHandle.detach();
            _yuitest_coverline("/build/event-move/event-move.js", 335);
subscriber[_MOVE_HANDLE] = null;
        }
    },
    
    detachDelegate : function(node, subscriber, ce, filter) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "detachDelegate", 339);
_yuitest_coverline("/build/event-move/event-move.js", 340);
var handle = subscriber[_DEL_MOVE_HANDLE];

        _yuitest_coverline("/build/event-move/event-move.js", 342);
if (handle) {
            _yuitest_coverline("/build/event-move/event-move.js", 343);
handle.detach();
            _yuitest_coverline("/build/event-move/event-move.js", 344);
subscriber[_DEL_MOVE_HANDLE] = null;
        }

    },

    processArgs : function(args, delegate) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "processArgs", 349);
_yuitest_coverline("/build/event-move/event-move.js", 350);
return _defArgsProcessor(this, args, delegate);
    },

    _onMove : function(e, node, subscriber, ce, delegate) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "_onMove", 353);
_yuitest_coverline("/build/event-move/event-move.js", 355);
if (delegate) {
            _yuitest_coverline("/build/event-move/event-move.js", 356);
node = e[CURRENT_TARGET];
        }

        _yuitest_coverline("/build/event-move/event-move.js", 359);
var fireMove = subscriber._extra.standAlone || node.getData(_MOVE_START),
            preventDefault = subscriber._extra.preventDefault;


        _yuitest_coverline("/build/event-move/event-move.js", 363);
if (fireMove) {

            _yuitest_coverline("/build/event-move/event-move.js", 365);
if (e.touches) {
                _yuitest_coverline("/build/event-move/event-move.js", 366);
if (e.touches.length === 1) {
                    _yuitest_coverline("/build/event-move/event-move.js", 367);
_normTouchFacade(e, e.touches[0]);                    
                } else {
                    _yuitest_coverline("/build/event-move/event-move.js", 369);
fireMove = false;
                }
            }

            _yuitest_coverline("/build/event-move/event-move.js", 373);
if (fireMove) {

                _yuitest_coverline("/build/event-move/event-move.js", 375);
_prevent(e, preventDefault);


                _yuitest_coverline("/build/event-move/event-move.js", 378);
e.type = GESTURE_MOVE;
                _yuitest_coverline("/build/event-move/event-move.js", 379);
ce.fire(e);
            }
        }
    },
    
    PREVENT_DEFAULT : false
});

/**
 * Sets up a "gesturemoveend" event, that is fired on touch devices in response to a single finger "touchend",
 * and on mouse based devices in response to a "mouseup".
 * 
 * <p>By default this event is only fired when the same node
 * has received a "gesturemove" or "gesturemovestart" event. The subscriber can set standAlone to true, in the configuration properties,
 * if they want to listen for this event without a preceding "gesturemovestart" or "gesturemove".</p>
 *
 * <p>By default this event sets up it's internal "touchend" and "mouseup" DOM listeners on the document element. The subscriber
 * can set the root configuration property, to specify which node to attach DOM listeners to, if different from the document.</p> 
 *
 * <p>This event can also be listened for using node.delegate().</p>
 *
 * <p>It is recommended that you use Y.bind to set up context and additional arguments for your event handler,
 * however if you want to pass the context and arguments as additional signature arguments to on/delegate, 
 * you need to provide a null value for the configuration object, e.g: <code>node.on("gesturemoveend", fn, null, context, arg1, arg2, arg3)</code></p>
 *
 *
 * @event gesturemoveend
 * @for YUI
 * @param type {string} "gesturemoveend"
 * @param fn {function} The method the event invokes. It receives the event facade of the underlying DOM event (mouseup or touchend.changedTouches[0]).
 * @param cfg {Object} Optional. An object which specifies:
 * <dl>
 * <dt>standAlone (defaults to false)</dt>
 * <dd>true, if the subscriber should be notified even if a "gesturemovestart" or "gesturemove" has not occured on the same node.</dd>
 * <dt>root (defaults to document)</dt>
 * <dd>The node to which the internal DOM listeners should be attached.</dd>
 * <dt>preventDefault (defaults to false)</dt>
 * <dd>Can be set to true/false to prevent default behavior as soon as the touchend or mouseup is received. As with gesturemovestart, can also be set to function which returns true/false based on the event facade passed to it.</dd>
 * </dl>
 *
 * @return {EventHandle} the detach handle
 */
_yuitest_coverline("/build/event-move/event-move.js", 421);
define(GESTURE_MOVE_END, {

    on : function (node, subscriber, ce) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "on", 423);
_yuitest_coverline("/build/event-move/event-move.js", 425);
var root = _getRoot(node, subscriber),

            endHandle = root.on(EVENT[END], 
                this._onEnd, 
                this,
                node,
                subscriber, 
                ce);

        _yuitest_coverline("/build/event-move/event-move.js", 434);
subscriber[_MOVE_END_HANDLE] = endHandle;
    },

    delegate : function(node, subscriber, ce, filter) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "delegate", 437);
_yuitest_coverline("/build/event-move/event-move.js", 439);
var se = this;

        _yuitest_coverline("/build/event-move/event-move.js", 441);
subscriber[_DEL_MOVE_END_HANDLE] = node.delegate(EVENT[END],
            function(e) {
                _yuitest_coverfunc("/build/event-move/event-move.js", "(anonymous 6)", 442);
_yuitest_coverline("/build/event-move/event-move.js", 443);
se._onEnd(e, node, subscriber, ce, true);
            },
            filter);
    },

    detachDelegate : function(node, subscriber, ce, filter) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "detachDelegate", 448);
_yuitest_coverline("/build/event-move/event-move.js", 449);
var handle = subscriber[_DEL_MOVE_END_HANDLE];

        _yuitest_coverline("/build/event-move/event-move.js", 451);
if (handle) {
            _yuitest_coverline("/build/event-move/event-move.js", 452);
handle.detach();
            _yuitest_coverline("/build/event-move/event-move.js", 453);
subscriber[_DEL_MOVE_END_HANDLE] = null;
        }

    },

    detach : function (node, subscriber, ce) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "detach", 458);
_yuitest_coverline("/build/event-move/event-move.js", 459);
var endHandle = subscriber[_MOVE_END_HANDLE];
    
        _yuitest_coverline("/build/event-move/event-move.js", 461);
if (endHandle) {
            _yuitest_coverline("/build/event-move/event-move.js", 462);
endHandle.detach();
            _yuitest_coverline("/build/event-move/event-move.js", 463);
subscriber[_MOVE_END_HANDLE] = null;
        }
    },

    processArgs : function(args, delegate) {
        _yuitest_coverfunc("/build/event-move/event-move.js", "processArgs", 467);
_yuitest_coverline("/build/event-move/event-move.js", 468);
return _defArgsProcessor(this, args, delegate);
    },

    _onEnd : function(e, node, subscriber, ce, delegate) {

        _yuitest_coverfunc("/build/event-move/event-move.js", "_onEnd", 471);
_yuitest_coverline("/build/event-move/event-move.js", 473);
if (delegate) {
            _yuitest_coverline("/build/event-move/event-move.js", 474);
node = e[CURRENT_TARGET];
        }

        _yuitest_coverline("/build/event-move/event-move.js", 477);
var fireMoveEnd = subscriber._extra.standAlone || node.getData(_MOVE) || node.getData(_MOVE_START),
            preventDefault = subscriber._extra.preventDefault;

        _yuitest_coverline("/build/event-move/event-move.js", 480);
if (fireMoveEnd) {

            _yuitest_coverline("/build/event-move/event-move.js", 482);
if (e.changedTouches) {
                _yuitest_coverline("/build/event-move/event-move.js", 483);
if (e.changedTouches.length === 1) {
                    _yuitest_coverline("/build/event-move/event-move.js", 484);
_normTouchFacade(e, e.changedTouches[0]);                    
                } else {
                    _yuitest_coverline("/build/event-move/event-move.js", 486);
fireMoveEnd = false;
                }
            }

            _yuitest_coverline("/build/event-move/event-move.js", 490);
if (fireMoveEnd) {

                _yuitest_coverline("/build/event-move/event-move.js", 492);
_prevent(e, preventDefault);

                _yuitest_coverline("/build/event-move/event-move.js", 494);
e.type = GESTURE_MOVE_END;
                _yuitest_coverline("/build/event-move/event-move.js", 495);
ce.fire(e);

                _yuitest_coverline("/build/event-move/event-move.js", 497);
node.clearData(_MOVE_START);
                _yuitest_coverline("/build/event-move/event-move.js", 498);
node.clearData(_MOVE);
            }
        }
    },

    PREVENT_DEFAULT : false
});


}, '@VERSION@' ,{requires:['node-base','event-touch','event-synthetic']});
