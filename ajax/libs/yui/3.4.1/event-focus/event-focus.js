YUI.add('event-focus', function(Y) {

/**
 * Adds bubbling and delegation support to DOM events focus and blur.
 * 
 * @module event
 * @submodule event-focus
 */
var Event    = Y.Event,
    YLang    = Y.Lang,
    isString = YLang.isString,
    useActivate = YLang.isFunction(
        Y.DOM.create('<p onbeforeactivate=";"/>').onbeforeactivate);

function define(type, proxy, directEvent) {
    var nodeDataKey = '_' + type + 'Notifiers';

    Y.Event.define(type, {

        _attach: function (el, notifier, delegate) {
            if (Y.DOM.isWindow(el)) {
                return Event._attach([type, function (e) {
                    notifier.fire(e);
                }, el]);
            } else {
                return Event._attach(
                    [proxy, this._proxy, el, this, notifier, delegate],
                    { capture: true });
            }
        },

        _proxy: function (e, notifier, delegate) {
            var node       = e.target,
                notifiers  = node.getData(nodeDataKey),
                yuid       = Y.stamp(e.currentTarget._node),
                defer      = (useActivate || e.target !== e.currentTarget),
                sub        = notifier.handle.sub,
                filterArgs = [node, e].concat(sub.args || []),
                directSub;
                
            notifier.currentTarget = (delegate) ? node : e.currentTarget;
            notifier.container     = (delegate) ? e.currentTarget : null;

            if (!sub.filter || sub.filter.apply(node, filterArgs)) {
                // Maintain a list to handle subscriptions from nested
                // containers div#a>div#b>input #a.on(focus..) #b.on(focus..),
                // use one focus or blur subscription that fires notifiers from
                // #b then #a to emulate bubble sequence.
                if (!notifiers) {
                    notifiers = {};
                    node.setData(nodeDataKey, notifiers);

                    // only subscribe to the element's focus if the target is
                    // not the current target (
                    if (defer) {
                        directSub = Event._attach(
                            [directEvent, this._notify, node._node]).sub;
                        directSub.once = true;
                    }
                }

                if (!notifiers[yuid]) {
                    notifiers[yuid] = [];
                }

                notifiers[yuid].push(notifier);

                if (!defer) {
                    this._notify(e);
                }
            }
        },

        _notify: function (e, container) {
            var node        = e.currentTarget,
                notifiers   = node.getData(nodeDataKey),
                              // document.get('ownerDocument') returns null
                doc         = node.get('ownerDocument') || node,
                target      = node,
                nots        = [],
                notifier, i, len;

            if (notifiers) {
                // Walk up the parent axis until the origin node, 
                while (target && target !== doc) {
                    nots.push.apply(nots, notifiers[Y.stamp(target)] || []);
                    target = target.get('parentNode');
                }
                nots.push.apply(nots, notifiers[Y.stamp(doc)] || []);

                for (i = 0, len = nots.length; i < len; ++i) {
                    notifier = nots[i];
                    e.currentTarget = nots[i].currentTarget;

                    if (notifier.container) {
                        e.container = notifier.container;
                    }

                    notifier.fire(e);
                }

                // clear the notifications list (mainly for delegation)
                node.clearData(nodeDataKey);
            }
        },

        on: function (node, sub, notifier) {
            sub.onHandle = this._attach(node._node, notifier);
        },

        detach: function (node, sub) {
            sub.onHandle.detach();
        },

        delegate: function (node, sub, notifier, filter) {
            if (isString(filter)) {
                sub.filter = Y.delegate.compileFilter(filter);
            }

            sub.delegateHandle = this._attach(node._node, notifier, true);
        },

        detachDelegate: function (node, sub) {
            sub.delegateHandle.detach();
        }
    }, true);
}

// For IE, we need to defer to focusin rather than focus because
// `el.focus(); doSomething();` executes el.onbeforeactivate, el.onactivate,
// el.onfocusin, doSomething, then el.onfocus.  All others support capture
// phase focus, which executes before doSomething.  To guarantee consistent
// behavior for this use case, IE's direct subscriptions are made against
// focusin so subscribers will be notified before js following el.focus() is
// executed.
if (useActivate) {
    //     name     capture phase       direct subscription
    define("focus", "beforeactivate",   "focusin");
    define("blur",  "beforedeactivate", "focusout");
} else {
    define("focus", "focus", "focus");
    define("blur",  "blur",  "blur");
}


}, '@VERSION@' ,{requires:['event-synthetic']});
