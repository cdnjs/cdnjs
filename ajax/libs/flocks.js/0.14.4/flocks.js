/** @jsx React.DOM */
/* jshint node: true, browser: true, newcap: false */

/**
 * The Flocks library module.
 *
 * @module Flocks
 * @main   Flocks
 */





// if it's in a <script> it's defined already
// otherwise assume commonjs

if (typeof React === 'undefined') {
    var React = require('react');
}





// wrap the remainder

(function() {





    'use strict';





    var initialized  = false,
        updateBlocks = 0,
        dirty        = false,

        tagtype      = undefined,

        handler      = function() { return true; },
        finalizer    = function() { return true; },

        prevFCtx     = {},
        nextFCtx     = {},

        flocks2_ctxs = { flocks2context: React.PropTypes.object };





    function flocksLog(Level, Message) {

        if (typeof Level === 'string') {
            if (member(Level, ['warn','debug','error','log','info','exception','assert'])) {
                console[Level]('Flocks2 [' + Level + '] ' + Message.toString());
            } else {
                console.log('Flocks2 [Unknown level] ' + Message.toString());
            }
        } else if (nextFCtx.flocks_config === undefined) {
            console.log('Flocks2 pre-config [' + Level.toString() + '] ' + Message.toString());
        } else if (nextFCtx.flocks_config.log_level >= Level) {
            console.log('Flocks2 [' + Level.toString() + '] ' + Message.toString());
        }

    }





    function enforceString(On, Label) {
        Label = Label || 'Argument must be a string';
        if (typeof On !== 'string') {
            throw Label;
        }
    }





    function isArray(maybeArray) {

        return (Object.prototype.toString.call(maybeArray) === '[object Array]');

    }





    function isNonArrayObject(maybeArray) {

        if (typeof maybeArray !== 'object')                                  { return false; }
        if (Object.prototype.toString.call(maybeArray) === '[object Array]') { return false; }

        return true;

    }





    function setByKey(Key, MaybeValue) {
        enforceString(Key, "Flocks2 set/2 must take a string for its key");
        nextFCtx[Key] = MaybeValue;
        flocksLog(1, "   - Flocks2 setByKey \"" + Key + "\"");
        attemptUpdate();
    }





    function setByPath(Key, MaybeValue)   { flocksLog(0, '   - Flocks2 setByPath stub'  ); attemptUpdate(); }
    function setByObject(Key, MaybeValue) { flocksLog(0, '   - Flocks2 setByObject stub'); attemptUpdate(); }

    function set(Key, MaybeValue) {

        flocksLog(3, ' - Flocks2 multi-set');

        if      (typeof Key === 'string') { setByKey(Key, MaybeValue); }
        else if (isArray(Key))            { setByPath(Key, MaybeValue); }
        else if (isNonArrayObject(Key))   { setByObject(Key); }
        else                              { throw 'Flocks2 set/1,2 key must be a string or an array'; }

    }





    function clone(obj, loglabel) {

        flocksLog(3, ' + Flocks2 cloning ' + (loglabel? loglabel : JSON.stringify(obj).substring(0,100) ) );

        if ((null === obj) || ('object' != typeof obj)) { return obj; }

        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) { copy[attr] = obj[attr]; }
        }

        return copy;

    }





    // ... lol
    function member(Item, Array) {
        return (!!(~( Array.indexOf(Item) )));
    }





    function attemptUpdate() {

        flocksLog(3, ' - Flocks2 attempting update');
        dirty = true;

        if (!(initialized)) {
            flocksLog(1, ' x Flocks2 skipped update: root is not initialized');
            return null;
        }

        if (updateBlocks) {
            flocksLog(1, ' x Flocks2 skipped update: lock count updateBlocks is non-zero');
            return null;
        }

/* whargarbl see issue #9 https://github.com/StoneCypher/flocks.js/issues/9

        if (deepCompare(nextFCtx, prevFCtx)) {
            flocksLog(2, ' x Flocks2 skipped update: no update to state');
            return true;
        }
*/

        if (!(handler(nextFCtx))) {
            flocksLog(0, '   ! Flocks2 rolling back update: handler rejected propset');
            nextFCtx = prevFCtx;
            dirty    = false;
            return null;
        }

        prevFCtx = nextFCtx;

        flocksLog(3, '   - Flocks2 update passed');
        React.render( React.createFactory(tagtype)( { flocks2context: nextFCtx } ), document.body );
        dirty = false;

        flocksLog(3, '   - Flocks2 update complete; finalizing');
        finalizer();
        return true;

    }





    function create(iFlocksConfig, iFlocksData) {

        var FlocksConfig = iFlocksConfig || {},
            FlocksData   = iFlocksData   || {},

            target       = FlocksConfig.target || document.body,
            stub         = function() { window.alert('whargarbl stub'); attemptUpdate(); },
            updater      = { get: stub, set: set, override: stub, clear: stub, update: stub, lock: stub, unlock: stub };

        FlocksConfig.log_level   = FlocksConfig.log_level || -1;
        tagtype                  = FlocksConfig.control;
        FlocksData.flocks_config = FlocksConfig;
        nextFCtx                 = FlocksData;

        flocksLog(1, 'Flocks2 root creation begins');

        if (!(tagtype))             { throw 'Flocks2 fatal error: must provide a control in create/2 FlocksConfig';      }
        if (FlocksConfig.handler)   { handler   = FlocksConfig.handler;   flocksLog(3, ' - Flocks2 handler assigned'  ); }
        if (FlocksConfig.finalizer) { finalizer = FlocksConfig.finalizer; flocksLog(3, ' - Flocks2 finalizer assigned'); }

        if (FlocksConfig.preventAutoContext) {
            flocksLog(2, ' - Flocks2 skipping auto-context');
        } else {
            flocksLog(2, ' - Flocks2 engaging auto-context');
            this.fctx = clone(nextFCtx);
        }

        flocksLog(3, 'Flocks2 creation finished; initializing');
        initialized = true;
        attemptUpdate();

        flocksLog(3, 'Flocks2 expose updater');
        this.fupd = updater;
        this.fset = updater.set;

        flocksLog(3, 'Flocks2 initialization finished');

        return updater;

    }





    var Mixin = {

        contextTypes      : flocks2_ctxs,
        childContextTypes : flocks2_ctxs,

        componentWillMount: function() {

            flocksLog(1, ' - Flocks2 component will mount: ' + this.constructor.displayName);
            flocksLog(3, typeof this.props.flocks2context   === 'undefined'? '   - No F2 Context Prop' : '   - F2 Context Prop found');
            flocksLog(3, typeof this.context.flocks2context === 'undefined'? '   - No F2 Context'      : '   - F2 Context found');

            if (this.props.flocks2context) {
                this.context.flocks2context = this.props.flocks2context;
            }

            this.fset = function(X,Y) { set(X,Y); };
            this.fctx = this.context.flocks2context;

        },

        getChildContext: function() {
            return this.context;
        }


    };





    var exports = {

        member                : Mixin,
        create                : create,
        clone                 : clone,

        isArray               : isArray,
        isNonArrayObject      : isNonArrayObject,

        enforceString         : enforceString,
/*
        enforceArray          : enforceArray,
        enforceNonArrayObject : enforceNonArrayObject,

        member                : member
*/
    };





    if (typeof module !== 'undefined') {
        module.exports = exports;
    } else {
        window.flocksjs2 = exports;
    }





}());
