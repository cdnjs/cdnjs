
/** @jsx React.DOM */

/* jshint node: true, browser: true, newcap: false */

/* eslint max-statements: 0, no-else-return: 0, brace-style: 0 */
/* eslint-env node,browser */

/**
 * The Flocks library module.  Load this module and use either the
 * flocks <tt>flocks.createClass</tt> wrapper or the <tt>flocks plumbing</tt>
 * mixin to create <tt>flocks controls</tt>.  Place them into your document
 * using <tt>flocks.mount</tt>, and use the returned function or the data and
 * method that the mixin provides, <tt>this.fctx</tt> and <tt>this.fset()</tt>
 * respectively, to read and write to the <tt>flocks state</tt>.
 *
 * And suddenly you're done.
 *
 * Please see the <a href="http://flocks.rocks/what_is_flocks.html" target="_blank">tutorials</a>
 * for more information.
 *
 * @module flocks
 * @main   createClass
 * @class  flocks
 */





// if it's in a <script> it's defined already
// otherwise assume commonjs

/* eslint-disable no-use-before-define, vars-on-top */
if (typeof React === "undefined") {
    var React = require("react");
}
/* eslint-enable no-use-before-define, vars-on-top */





// wrap the remainder

(function() {





    "use strict";





    var Mixin,
        exports,

        initialized  = false,
        updateBlocks = 0,

        tagtype,

        /* eslint-disable no-unused-vars */
        dirty        = false,
        handler      = function(Ignored) { return true; },
        /* eslint-ensable no-unused-vars */

        finalizer    = function() { return true; },

        prevFCtx     = {},
        nextFCtx     = {},

        flocks2Ctxs  = { "flocks2context" : React.PropTypes.object };





    // ... lol
    function arrayMember(Item, Array) {
        return (!!(~( Array.indexOf(Item, 0) )));
    }





    function isArray(maybeArray) {
        return (Object.prototype.toString.call(maybeArray) === "[object Array]");
    }





    function isUndefined(maybeUndefined) {
        return (typeof maybeUndefined === "undefined");
    }





    function isNonArrayObject(maybeArray) {

        if (typeof maybeArray !== "object")                                  { return false; }
        if (Object.prototype.toString.call(maybeArray) === "[object Array]") { return false; }

        return true;

    }





    function flocksLog(Level, Message) {

        if (typeof Level === "string") {

            if (arrayMember(Level, ["warn","debug","error","log","info","exception","assert"])) {
                console[Level]("Flocks2 [" + Level + "] " + Message.toString());
            } else {
                console.log("Flocks2 [Unknown level] " + Message.toString());
            }

        } else if (isUndefined(nextFCtx.flocks2Config)) {
            console.log("Flocks2 pre-config [" + Level.toString() + "] " + Message.toString());

        } else if (nextFCtx.flocks2Config.log_level >= Level) {
            console.log("Flocks2 [" + Level.toString() + "] " + Message.toString());
        }

    }





    function attemptUpdate() {

        flocksLog(3, " - Flocks2 attempting update");
        dirty = true;

        if (!(initialized)) {
            flocksLog(1, " x Flocks2 skipped update: root is not initialized");
            return null;
        }

        if (updateBlocks) {
            flocksLog(1, " x Flocks2 skipped update: lock count updateBlocks is non-zero");
            return null;
        }

/* todo see issue #9 https://github.com/StoneCypher/flocks.js/issues/9

        if (deepCompare(nextFCtx, prevFCtx)) {
            flocksLog(2, " x Flocks2 skipped update: no update to state");
            return true;
        }
*/

        if (!(handler(nextFCtx))) {
            flocksLog(0, "   ! Flocks2 rolling back update: handler rejected propset");
            nextFCtx = prevFCtx;
            dirty    = false;
            return null;
        }

        prevFCtx = nextFCtx;

        flocksLog(3, "   - Flocks2 update passed");
        React.render( React.createFactory(tagtype)( { "flocks2context" : nextFCtx } ), prevFCtx.flocks2Config.target );
        dirty = false;

        flocksLog(3, "   - Flocks2 update complete; finalizing");
        finalizer();
        return true;

    }





    function enforceString(On, Label) {
        if (typeof On !== "string") {
            throw Label || "Argument must be a string";
        }
    }





    function enforceArray(On, Label) {
        if (!isArray(On)) {
            throw Label || "Argument must be an array";
        }
    }





    function enforceNonArrayObject(On, Label) {
        if (!isNonArrayObject(On)) {
            throw Label || "Argument must be a non-array object";
        }
    }





    function setByKey(Key, MaybeValue) {

        enforceString(Key, "Flocks2 set/2 must take a string for its key");
        nextFCtx[Key] = MaybeValue;
        flocksLog(1, "   - Flocks2 setByKey \"" + Key + "\"");
        attemptUpdate();

    }





    function setTargetByPath(Path, Target, NewVal) {

        var NextPath,
            OldVal;  // it gets hoisted anyway, so it triggers eslint warnings when inlined
                     // might as well be explicit about it

        if (!(isArray(Path)))  { throw "Path must be an array!"; }

        if (Path.length === 0) {
            OldVal = Target;
            Target = NewVal;
            return OldVal;
        }

        if (Path.length === 1) {
            OldVal = Target[Path[0]];
            Target[Path[0]] = NewVal;
            return OldVal;
        }

        if (["string","number"].indexOf(typeof Path[0]) !== -1) {
            NextPath = Path.splice(1, Number.MAX_VALUE);
            return setTargetByPath(NextPath, Target[Path[0]], NewVal);
        }

    }





    function setByPath(Path, NewVal) {

        enforceArray(Path, "Flocks2 setByPathh/2 must take an array for its key");
        flocksLog(1, "   - Flocks2 setByPath \"" + Path.join("|") + "\"");
        setTargetByPath(Path, nextFCtx, NewVal);
        attemptUpdate();

    }





// todo
//  function setByObject(Key, MaybeValue) {
//    flocksLog(0, "   - Flocks2 setByObject stub");
//    attemptUpdate();
//  }





    function set(Key, MaybeValue) {

        flocksLog(3, " - Flocks2 multi-set");

        if (typeof Key === "string")      { setByKey(Key, MaybeValue); }
        else if (isArray(Key))            { setByPath(Key, MaybeValue); }
//      else if (isNonArrayObject(Key))   { setByObject(Key); }              // todo
        else                              { throw "Flocks2 set/1,2 key must be a string or an array"; }

    }





    function getByPath(Path, Target) {

        var NextPath;

        if (!(isArray(Path)))  { throw "path must be an array!"; }

        if (Path.length === 0) {
            return Target;
        }

        if (Path.length === 1) {
            return Target[Path[0]];
        }

        if (["string","number"].indexOf(typeof Path[0]) !== -1) {
            NextPath = Path.splice(1, Number.MAX_VALUE);
            return getByPath(NextPath, Target[Path[0]]);
        }

    }





    function update(SparseObject) {

        // todo
        console.log("ERROR: stub called!");
        enforceNonArrayObject(SparseObject, "Flocks2 update/1 must take a plain object");

    }





    function lock() {
        ++updateBlocks;
    }





    function unlock() {

        if (updateBlocks <= 0) { throw "unlock()ed with no lock!"; }

        --updateBlocks;
        attemptUpdate();

    }





    function clone(obj) {

        var copy = obj.constructor(),
            attr;

        if ((obj === null) || (typeof obj !== "object")) { return obj; }

        for (attr in obj) {
            if (obj.hasOwnProperty(attr)) { copy[attr] = obj[attr]; }
        }

        return copy;

    }





    function create(iFlocksConfig, iFlocksData) {

        var FlocksConfig = iFlocksConfig || {},
            FlocksData   = iFlocksData   || {},

            target       = FlocksConfig.target || document.body,
            stub         = function() { console.log("ERROR: stub called!"); attemptUpdate(); }, // todo

            updater      = {
                "get"      : stub,          // todo
                "override" : stub,          // todo
                "clear"    : stub,          // todo

                "get_path" : getByPath,
                "set"      : set,
                "set_path" : setByPath,
                "update"   : update,
                "lock"     : lock,
                "unlock"   : unlock
            };

        FlocksConfig.log_level   = FlocksConfig.log_level || -1;
        tagtype                  = FlocksConfig.control;
        FlocksData.flocks2Config = FlocksConfig;
        nextFCtx                 = FlocksData;

        flocksLog(1, "Flocks2 root creation begins");

        if (!(tagtype)) {
            throw "Flocks2 fatal error: must provide a control in create/2 FlocksConfig";
        }

        if (FlocksConfig.handler) {
            handler = FlocksConfig.handler;
            flocksLog(3, " - Flocks2 handler assigned");
        }

        if (FlocksConfig.finalizer) {
            finalizer = FlocksConfig.finalizer;
            flocksLog(3, " - Flocks2 finalizer assigned");
        }

        if (FlocksConfig.preventAutoContext) {
            flocksLog(2, " - Flocks2 skipping auto-context");
        } else {
            flocksLog(2, " - Flocks2 engaging auto-context");
            this.fctx = clone(nextFCtx);
        }

        flocksLog(3, "Flocks2 creation finished; initializing");
        initialized = true;
        attemptUpdate();

        flocksLog(3, "Flocks2 expose updater");
        this.fupd     = updater;
        this.fset     = updater.set;
        this.fgetpath = updater.get_path;
        this.flock    = updater.lock;
        this.funlock  = updater.unlock;
        this.fupdate  = updater.update;

        flocksLog(3, "Flocks2 initialization finished");

        return updater;

    }





    // because of YUIdoc limitations, the extracted docs for the mixin are far
    // below.  search for the word "yuibama" to jump between these places.

    Mixin = {

        "contextTypes"       : flocks2Ctxs,
        "childContextTypes"  : flocks2Ctxs,

        "componentWillMount" : function() {

            flocksLog(1, " - Flocks2 component will mount: " + this.constructor.displayName);

            flocksLog(3, isUndefined(this.props.flocks2context)?
                           "   - No F2 Context Prop"
                         : "   - F2 Context Prop found");

            flocksLog(3, isUndefined(this.context.flocks2context)?
                           "   - No F2 Context"
                         : "   - F2 Context found");

            if (this.props.flocks2context) {
                this.context.flocks2context = this.props.flocks2context;
            }

            this.fupdate  = function(Obj) { return update(Obj); };
            this.fgetpath = function(P,T) { return getByPath(P,T); };
            this.fset     = function(K,V) { return set(K,V); };
            this.fsetpath = function(P,V) { return set(P,V); };
            this.flock    = function()    { return lock(); };
            this.funlock  = function()    { return unlock(); };

            this.fctx     = this.context.flocks2context;

        },

        "getChildContext"    : function() {
            return this.context;
        }


    };





    function atLeastFlocks(OriginalList) {

        var NewList;

        if (isUndefined(OriginalList)) {
            return [ Mixin ];
        }

        if (isArray(OriginalList)) {
            if (arrayMember(Mixin, OriginalList)) {
                return OriginalList;
            } else {
                NewList = clone(OriginalList);
                NewList.push(Mixin);
                return NewList;
            }
        }

        throw "Original mixin list must be an array or undefined!";

    }





    function createClass(spec) {
        spec.mixins = atLeastFlocks(spec.mixins);
        return React.createClass(spec);
    }





    exports = {

        /**
         * <tt>version</tt> is an exposed string on the <tt>module export</tt>
         * which mentions the current library version.  This number should
         * always be in sync with the <tt>package.json</tt> and <tt>bower.json</tt>
         * version, the <tt>github tag</tt>, the <tt>npm version</tt>, and will
         * define the paths available on <tt>cdnjs</tt>
         *
         * @property version
         * @type {String}
         */

        "version"               : "1.0.2",



        /**
         * <tt>createClass</tt> is a wrapper for <tt>react.createClass</tt> which
         * automatically adds the <tt>plumbing</tt> mixin to your control's spec,
         * to keep visual noise down.  If you prefer, you can add the <tt>plumbing</tt>
         * mixin manually, in the standard fashion, instead; that may be more
         * convenient in situations where many mixins are in use, or where other
         * wrappers of <tt>createClass</tt> are in use.
         *
         * @method createClass
         */

        "createClass"           : createClass,



        /**
         * <tt>mount</tt> accepts a <tt>flocks config</tt> and an initial state,
         * and then manages a root control for you.  <tt>mount</tt> returns to
         * you a function which you can use from outside the control tree to
         * update the <tt>flocks state</tt>.  From inside the control tree, a
         * control decorated with the <tt>flocks plumbing</tt> has a member
         * <tt>this.fctx</tt> which contains an up to date copy of the <tt>flocks
         * state</tt>, and another member <tt>this.fset()</tt> which you can
         * use to update the <tt>flocks state</tt>.
         *
         * To <tt>mount</tt> a control is to start the process by placing your
         * top level control into the document through <tt>flocks</tt>.
         *
         * @method mount
         */

        "mount"                 : create,



        /**
         * <tt>clone</tt> recursively deep-copies its argument.
         *
         * @method clone
         */

        "clone"                 : clone,



        /**
         * <tt>isArray</tt> produces a boolean regarding whether its argument
         * is a javascript <tt>Array</tt>.
         *
         * @method isArray
         */

        "isArray"               : isArray,



        /**
         * <tt>isUndefined</tt> produces a boolean regarding whether its argument
         * is the javascript value <tt>undefined</tt>.
         *
         * @method isUndefined
         */

        "isUndefined"           : isUndefined,



        /**
         * <tt>isNonArrayObject</tt> produces a boolean regarding whether its
         * argument is a javascript <tt>Object</tt>, but also goes to the effort
         * to exclude javascript <tt>Array</tt>s.
         *
         * @method isNonArrayObject
         */

        "isNonArrayObject"      : isNonArrayObject,



        /**
         * <tt>enforceString</tt> accepts a value argument and an optional
         * explanation argument, and will throw if the value argument is not of
         * type <tt>string</tt>.  The throw will be the explanation argument, or
         * a default if the explanation is not present.
         *
         * @method enforceString
         */

        "enforceString"         : enforceString,



        /**
         * <tt>enforceArray</tt> accepts a value argument and an optional
         * explanation argument, and will throw if the value argument is not of
         * type <tt>Array</tt>.  The throw will be the explanation argument, or
         * a default if the explanation is not present.
         *
         * @method enforceArray
         */

        "enforceArray"          : enforceArray,



        /**
         * <tt>enforceNonArrayObject</tt> accepts a value argument and an optional
         * explanation argument, and will throw if the value argument is of
         * type <tt>Array</tt>, or not of type <tt>Object</tt>.  The throw will be
         * the explanation argument, or a default if the explanation is not present.
         *
         * @method enforceNonArrayObject
         */

        "enforceNonArrayObject" : enforceNonArrayObject,



        /**
         * <tt>atLeastFlocks</tt> accepts a mixin set from a control spec, or
         * the value <tt>undefined</tt>, and produces a mixin set in response,
         * which contains the old mixin set if any, pre-pended with
         * the <tt>flocks plumbing</tt> mixin, or a mixin set with just that
         * mixin if the previous mixin set was empty or <tt>undefined</tt>.
         * If the mixin set provided already contains flocks, it will be
         * returned unaltered, in case the prior mixin set is order sensitive.
         *
         * This is not a method that the end user should expect to use.
         *
         * @method atLeastFlocks
         */

        "atLeastFlocks"         : atLeastFlocks,


        /**
         * <tt>plumbing</tt> is the <tt>flocks</tt> mixin which handles all of
         * the behind-the-scenes work to make <tt>flocks</tt> function.  The
         * mixin is automatically added by calling <tt>flocks.createClass</tt>,
         * or you can add it yourself in the standard mixin fashion if you prefer.
         *
         * @class plumbing
         */

        // grossest doc structure ever.  thanks yuibama.

        /**
         * Describes the context types accepted or required by any given React
         * component; mixin hook notes the need for <tt>flocks2context : object</tt>
         * as an incoming context to pay attention to.
         *
         * @property contextTypes
         */

        /**
         * Describes the context types provided by the React component; mixin
         * hook notes that this provides <tt>flocks2context : object</tt> to
         * subordinate controls.
         *
         * @property childContextTypes
         */

        /**
         * Called when the control is about to mount; mixin hooks this event to
         * add the flocks context <tt>this.fctx</tt>, the flocks updater
         * <tt>this.fset</tt>, and other flocks methods to the control object.
         *
         * @event componentWillMount
         */

        /**
         * Called when the control is about to pass context to children; the
         * plumbing mixin hooks this event to do the simple job of passing the
         * flocks context data downwards.
         *
         * @event getChildContext
         */

        "plumbing"              : Mixin

    };





    if (typeof module !== "undefined") {
        module.exports = exports;
    } else {
        window.flocks = exports;
    }





}());
