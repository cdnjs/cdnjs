/*! HTML - v0.11.1 - 2014-04-05
* http://nbubna.github.io/HTML/
* Copyright (c) 2014 ESHA Research; Licensed MIT, GPL */
(function(document, HTML) {
    "use strict";

    var _ = HTML._,
    event = _.fn.event = function() {
        var args = _.slice.call(arguments),
            self = this,
            action,
            ret = [];
        if (!args[0]) {// first is falsy
            action = 'off';
            args.shift();
            if (typeof args[1] === "function"){ args.splice(1, 0, false); }// selector omitted
        } else if (!args[1] || args[1].forEach) {// second is absent or data
            action = 'trigger';
        } else {
            action = 'on';
            if (args[0] === 1){ args[4] = args.shift(); }// first is _once
            if (!args[2] || args[2].forEach) {// selector omitted
                args.splice(1, 0, false);
                args.splice(4, 1);// put _once back as fifth arg
            }
            args[3] = (args[3]||[]).slice(0);// don't let listener data change
            if (typeof args[2] === "string") {// third is _prop for each
                args[5] = args[2];
                args[3].unshift(args[2]);// _prop becomes first item in data
                args[2] = _.fn.each;// and is replace by each()
            }
        }
        (args[0]||'').split(' ').forEach(function(type) {
            args[0] = type;
            self.each(function(node) {
                ret.push(event[action].apply(node, args));
            });
        });
        return action === 'trigger' ? ret.length === 1 ? ret[0] : ret : this;
    },
    concat = Array.prototype.concat;

    event.on = function(type, selector, fn, data, _once, _prop) {
        var listener = function(e) {
            event.heard.call(this, e, selector, fn, data, _once, _prop);
        };
        this.addEventListener(type, listener);
        _.define(this, '_evt', []);
        this._evt.push([type, selector, _prop||fn, listener]);
    };
    event.off = function(type, selector, fn) {
        if (this._evt) {
            for (var i=0; i<this._evt.length; i++) {
                var evt = this._evt[i];
                if ((!type || evt[0] === type) &&
                    (!selector || evt[1] === selector) &&
                    (!fn || evt[2] === fn)) {
                    this.removeEventListener(evt[0], evt[3]);
                    this._evt.splice(i--, 1);
                }
            }
        } else {
            this.removeEventListener(type, fn);
        }
    };
    event.trigger = function(type, data) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, true, true);
        if (data){ e.data = data; }
        this.dispatchEvent(e);
        return e;
    };

    event.heard = function(e, selector, fn, data, _once, _prop) {
        var self = selector ? event.closest.call(e, selector) : this;
        if (self) {
            var args = [e];
            if (e.data){ args.push(e.data); }
            if (data){ args.unshift(data); }
            _.node(e.target);
            _.define(e, 'closest', event.closest);
            if (_once){ event.off.call(this, e.type, selector, _prop || fn); }
            fn.apply(self, concat.apply([], args));
        }
    };
    event.closest = function(selector) {
        var el = this.target;
        while (el && el.matches) {
            if (el.matches(selector)) {
                return _.node(el);
            }
            el = el.parentNode;
        }
    };

})(document, document.documentElement);
