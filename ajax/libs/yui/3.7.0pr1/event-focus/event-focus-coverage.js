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
_yuitest_coverage["/build/event-focus/event-focus.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/event-focus/event-focus.js",
    code: []
};
_yuitest_coverage["/build/event-focus/event-focus.js"].code=["YUI.add('event-focus', function(Y) {","","/**"," * Adds bubbling and delegation support to DOM events focus and blur."," * "," * @module event"," * @submodule event-focus"," */","var Event    = Y.Event,","    YLang    = Y.Lang,","    isString = YLang.isString,","    arrayIndex = Y.Array.indexOf,","    useActivate = YLang.isFunction(","        Y.DOM.create('<p onbeforeactivate=\";\"/>').onbeforeactivate);","","function define(type, proxy, directEvent) {","    var nodeDataKey = '_' + type + 'Notifiers';","","    Y.Event.define(type, {","","        _attach: function (el, notifier, delegate) {","            if (Y.DOM.isWindow(el)) {","                return Event._attach([type, function (e) {","                    notifier.fire(e);","                }, el]);","            } else {","                return Event._attach(","                    [proxy, this._proxy, el, this, notifier, delegate],","                    { capture: true });","            }","        },","","        _proxy: function (e, notifier, delegate) {","            var target        = e.target,","                currentTarget = e.currentTarget,","                notifiers     = target.getData(nodeDataKey),","                yuid          = Y.stamp(currentTarget._node),","                defer         = (useActivate || target !== currentTarget),","                directSub;","                ","            notifier.currentTarget = (delegate) ? target : currentTarget;","            notifier.container     = (delegate) ? currentTarget : null;","","            // Maintain a list to handle subscriptions from nested","            // containers div#a>div#b>input #a.on(focus..) #b.on(focus..),","            // use one focus or blur subscription that fires notifiers from","            // #b then #a to emulate bubble sequence.","            if (!notifiers) {","                notifiers = {};","                target.setData(nodeDataKey, notifiers);","","                // only subscribe to the element's focus if the target is","                // not the current target (","                if (defer) {","                    directSub = Event._attach(","                        [directEvent, this._notify, target._node]).sub;","                    directSub.once = true;","                }","            } else {","                // In old IE, defer is always true.  In capture-phase browsers,","                // The delegate subscriptions will be encountered first, which","                // will establish the notifiers data and direct subscription","                // on the node.  If there is also a direct subscription to the","                // node's focus/blur, it should not call _notify because the","                // direct subscription from the delegate sub(s) exists, which","                // will call _notify.  So this avoids _notify being called","                // twice, unnecessarily.","                defer = true;","            }","","            if (!notifiers[yuid]) {","                notifiers[yuid] = [];","            }","","            notifiers[yuid].push(notifier);","","            if (!defer) {","                this._notify(e);","            }","        },","","        _notify: function (e, container) {","            var currentTarget = e.currentTarget,","                notifierData  = currentTarget.getData(nodeDataKey),","                axisNodes     = currentTarget.ancestors(),","                doc           = currentTarget.get('ownerDocument'),","                delegates     = [],","                                // Used to escape loops when there are no more","                                // notifiers to consider","                count         = notifierData ?","                                    Y.Object.keys(notifierData).length :","                                    0,","                target, notifiers, notifier, yuid, match, tmp, i, len, sub, ret;","","            // clear the notifications list (mainly for delegation)","            currentTarget.clearData(nodeDataKey);","","            // Order the delegate subs by their placement in the parent axis","            axisNodes.push(currentTarget);","            // document.get('ownerDocument') returns null","            // which we'll use to prevent having duplicate Nodes in the list","            if (doc) {","                axisNodes.unshift(doc);","            }","","            // ancestors() returns the Nodes from top to bottom","            axisNodes._nodes.reverse();","","            if (count) {","                // Store the count for step 2","                tmp = count;","                axisNodes.some(function (node) {","                    var yuid      = Y.stamp(node),","                        notifiers = notifierData[yuid],","                        i, len;","","                    if (notifiers) {","                        count--;","                        for (i = 0, len = notifiers.length; i < len; ++i) {","                            if (notifiers[i].handle.sub.filter) {","                                delegates.push(notifiers[i]);","                            }","                        }","                    }","","                    return !count;","                });","                count = tmp;","            }","","            // Walk up the parent axis, notifying direct subscriptions and","            // testing delegate filters.","            while (count && (target = axisNodes.shift())) {","                yuid = Y.stamp(target);","","                notifiers = notifierData[yuid];","","                if (notifiers) {","                    for (i = 0, len = notifiers.length; i < len; ++i) {","                        notifier = notifiers[i];","                        sub      = notifier.handle.sub;","                        match    = true;","","                        e.currentTarget = target;","","                        if (sub.filter) {","                            match = sub.filter.apply(target,","                                [target, e].concat(sub.args || []));","","                            // No longer necessary to test against this","                            // delegate subscription for the nodes along","                            // the parent axis.","                            delegates.splice(","                                arrayIndex(delegates, notifier), 1);","                        }","","                        if (match) {","                            // undefined for direct subs","                            e.container = notifier.container;","                            ret = notifier.fire(e);","                        }","","                        if (ret === false || e.stopped === 2) {","                            break;","                        }","                    }","                    ","                    delete notifiers[yuid];","                    count--;","                }","","                if (e.stopped !== 2) {","                    // delegates come after subs targeting this specific node","                    // because they would not normally report until they'd","                    // bubbled to the container node.","                    for (i = 0, len = delegates.length; i < len; ++i) {","                        notifier = delegates[i];","                        sub = notifier.handle.sub;","","                        if (sub.filter.apply(target,","                            [target, e].concat(sub.args || []))) {","","                            e.container = notifier.container;","                            e.currentTarget = target;","                            ret = notifier.fire(e);","                        }","","                        if (ret === false || e.stopped === 2) {","                            break;","                        }","                    }","                }","","                if (e.stopped) {","                    break;","                }","            }","        },","","        on: function (node, sub, notifier) {","            sub.handle = this._attach(node._node, notifier);","        },","","        detach: function (node, sub) {","            sub.handle.detach();","        },","","        delegate: function (node, sub, notifier, filter) {","            if (isString(filter)) {","                sub.filter = function (target) {","                    return Y.Selector.test(target._node, filter,","                        node === target ? null : node._node);","                };","            }","","            sub.handle = this._attach(node._node, notifier, true);","        },","","        detachDelegate: function (node, sub) {","            sub.handle.detach();","        }","    }, true);","}","","// For IE, we need to defer to focusin rather than focus because","// `el.focus(); doSomething();` executes el.onbeforeactivate, el.onactivate,","// el.onfocusin, doSomething, then el.onfocus.  All others support capture","// phase focus, which executes before doSomething.  To guarantee consistent","// behavior for this use case, IE's direct subscriptions are made against","// focusin so subscribers will be notified before js following el.focus() is","// executed.","if (useActivate) {","    //     name     capture phase       direct subscription","    define(\"focus\", \"beforeactivate\",   \"focusin\");","    define(\"blur\",  \"beforedeactivate\", \"focusout\");","} else {","    define(\"focus\", \"focus\", \"focus\");","    define(\"blur\",  \"blur\",  \"blur\");","}","","","}, '@VERSION@' ,{requires:['event-synthetic']});"];
_yuitest_coverage["/build/event-focus/event-focus.js"].lines = {"1":0,"9":0,"16":0,"17":0,"19":0,"22":0,"23":0,"24":0,"27":0,"34":0,"41":0,"42":0,"48":0,"49":0,"50":0,"54":0,"55":0,"57":0,"68":0,"71":0,"72":0,"75":0,"77":0,"78":0,"83":0,"96":0,"99":0,"102":0,"103":0,"107":0,"109":0,"111":0,"112":0,"113":0,"117":0,"118":0,"119":0,"120":0,"121":0,"126":0,"128":0,"133":0,"134":0,"136":0,"138":0,"139":0,"140":0,"141":0,"142":0,"144":0,"146":0,"147":0,"153":0,"157":0,"159":0,"160":0,"163":0,"164":0,"168":0,"169":0,"172":0,"176":0,"177":0,"178":0,"180":0,"183":0,"184":0,"185":0,"188":0,"189":0,"194":0,"195":0,"201":0,"205":0,"209":0,"210":0,"211":0,"216":0,"220":0,"232":0,"234":0,"235":0,"237":0,"238":0};
_yuitest_coverage["/build/event-focus/event-focus.js"].functions = {"(anonymous 2):23":0,"_attach:21":0,"_proxy:33":0,"(anonymous 3):112":0,"_notify:82":0,"on:200":0,"detach:204":0,"filter:210":0,"delegate:208":0,"detachDelegate:219":0,"define:16":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/event-focus/event-focus.js"].coveredLines = 84;
_yuitest_coverage["/build/event-focus/event-focus.js"].coveredFunctions = 12;
_yuitest_coverline("/build/event-focus/event-focus.js", 1);
YUI.add('event-focus', function(Y) {

/**
 * Adds bubbling and delegation support to DOM events focus and blur.
 * 
 * @module event
 * @submodule event-focus
 */
_yuitest_coverfunc("/build/event-focus/event-focus.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/event-focus/event-focus.js", 9);
var Event    = Y.Event,
    YLang    = Y.Lang,
    isString = YLang.isString,
    arrayIndex = Y.Array.indexOf,
    useActivate = YLang.isFunction(
        Y.DOM.create('<p onbeforeactivate=";"/>').onbeforeactivate);

_yuitest_coverline("/build/event-focus/event-focus.js", 16);
function define(type, proxy, directEvent) {
    _yuitest_coverfunc("/build/event-focus/event-focus.js", "define", 16);
_yuitest_coverline("/build/event-focus/event-focus.js", 17);
var nodeDataKey = '_' + type + 'Notifiers';

    _yuitest_coverline("/build/event-focus/event-focus.js", 19);
Y.Event.define(type, {

        _attach: function (el, notifier, delegate) {
            _yuitest_coverfunc("/build/event-focus/event-focus.js", "_attach", 21);
_yuitest_coverline("/build/event-focus/event-focus.js", 22);
if (Y.DOM.isWindow(el)) {
                _yuitest_coverline("/build/event-focus/event-focus.js", 23);
return Event._attach([type, function (e) {
                    _yuitest_coverfunc("/build/event-focus/event-focus.js", "(anonymous 2)", 23);
_yuitest_coverline("/build/event-focus/event-focus.js", 24);
notifier.fire(e);
                }, el]);
            } else {
                _yuitest_coverline("/build/event-focus/event-focus.js", 27);
return Event._attach(
                    [proxy, this._proxy, el, this, notifier, delegate],
                    { capture: true });
            }
        },

        _proxy: function (e, notifier, delegate) {
            _yuitest_coverfunc("/build/event-focus/event-focus.js", "_proxy", 33);
_yuitest_coverline("/build/event-focus/event-focus.js", 34);
var target        = e.target,
                currentTarget = e.currentTarget,
                notifiers     = target.getData(nodeDataKey),
                yuid          = Y.stamp(currentTarget._node),
                defer         = (useActivate || target !== currentTarget),
                directSub;
                
            _yuitest_coverline("/build/event-focus/event-focus.js", 41);
notifier.currentTarget = (delegate) ? target : currentTarget;
            _yuitest_coverline("/build/event-focus/event-focus.js", 42);
notifier.container     = (delegate) ? currentTarget : null;

            // Maintain a list to handle subscriptions from nested
            // containers div#a>div#b>input #a.on(focus..) #b.on(focus..),
            // use one focus or blur subscription that fires notifiers from
            // #b then #a to emulate bubble sequence.
            _yuitest_coverline("/build/event-focus/event-focus.js", 48);
if (!notifiers) {
                _yuitest_coverline("/build/event-focus/event-focus.js", 49);
notifiers = {};
                _yuitest_coverline("/build/event-focus/event-focus.js", 50);
target.setData(nodeDataKey, notifiers);

                // only subscribe to the element's focus if the target is
                // not the current target (
                _yuitest_coverline("/build/event-focus/event-focus.js", 54);
if (defer) {
                    _yuitest_coverline("/build/event-focus/event-focus.js", 55);
directSub = Event._attach(
                        [directEvent, this._notify, target._node]).sub;
                    _yuitest_coverline("/build/event-focus/event-focus.js", 57);
directSub.once = true;
                }
            } else {
                // In old IE, defer is always true.  In capture-phase browsers,
                // The delegate subscriptions will be encountered first, which
                // will establish the notifiers data and direct subscription
                // on the node.  If there is also a direct subscription to the
                // node's focus/blur, it should not call _notify because the
                // direct subscription from the delegate sub(s) exists, which
                // will call _notify.  So this avoids _notify being called
                // twice, unnecessarily.
                _yuitest_coverline("/build/event-focus/event-focus.js", 68);
defer = true;
            }

            _yuitest_coverline("/build/event-focus/event-focus.js", 71);
if (!notifiers[yuid]) {
                _yuitest_coverline("/build/event-focus/event-focus.js", 72);
notifiers[yuid] = [];
            }

            _yuitest_coverline("/build/event-focus/event-focus.js", 75);
notifiers[yuid].push(notifier);

            _yuitest_coverline("/build/event-focus/event-focus.js", 77);
if (!defer) {
                _yuitest_coverline("/build/event-focus/event-focus.js", 78);
this._notify(e);
            }
        },

        _notify: function (e, container) {
            _yuitest_coverfunc("/build/event-focus/event-focus.js", "_notify", 82);
_yuitest_coverline("/build/event-focus/event-focus.js", 83);
var currentTarget = e.currentTarget,
                notifierData  = currentTarget.getData(nodeDataKey),
                axisNodes     = currentTarget.ancestors(),
                doc           = currentTarget.get('ownerDocument'),
                delegates     = [],
                                // Used to escape loops when there are no more
                                // notifiers to consider
                count         = notifierData ?
                                    Y.Object.keys(notifierData).length :
                                    0,
                target, notifiers, notifier, yuid, match, tmp, i, len, sub, ret;

            // clear the notifications list (mainly for delegation)
            _yuitest_coverline("/build/event-focus/event-focus.js", 96);
currentTarget.clearData(nodeDataKey);

            // Order the delegate subs by their placement in the parent axis
            _yuitest_coverline("/build/event-focus/event-focus.js", 99);
axisNodes.push(currentTarget);
            // document.get('ownerDocument') returns null
            // which we'll use to prevent having duplicate Nodes in the list
            _yuitest_coverline("/build/event-focus/event-focus.js", 102);
if (doc) {
                _yuitest_coverline("/build/event-focus/event-focus.js", 103);
axisNodes.unshift(doc);
            }

            // ancestors() returns the Nodes from top to bottom
            _yuitest_coverline("/build/event-focus/event-focus.js", 107);
axisNodes._nodes.reverse();

            _yuitest_coverline("/build/event-focus/event-focus.js", 109);
if (count) {
                // Store the count for step 2
                _yuitest_coverline("/build/event-focus/event-focus.js", 111);
tmp = count;
                _yuitest_coverline("/build/event-focus/event-focus.js", 112);
axisNodes.some(function (node) {
                    _yuitest_coverfunc("/build/event-focus/event-focus.js", "(anonymous 3)", 112);
_yuitest_coverline("/build/event-focus/event-focus.js", 113);
var yuid      = Y.stamp(node),
                        notifiers = notifierData[yuid],
                        i, len;

                    _yuitest_coverline("/build/event-focus/event-focus.js", 117);
if (notifiers) {
                        _yuitest_coverline("/build/event-focus/event-focus.js", 118);
count--;
                        _yuitest_coverline("/build/event-focus/event-focus.js", 119);
for (i = 0, len = notifiers.length; i < len; ++i) {
                            _yuitest_coverline("/build/event-focus/event-focus.js", 120);
if (notifiers[i].handle.sub.filter) {
                                _yuitest_coverline("/build/event-focus/event-focus.js", 121);
delegates.push(notifiers[i]);
                            }
                        }
                    }

                    _yuitest_coverline("/build/event-focus/event-focus.js", 126);
return !count;
                });
                _yuitest_coverline("/build/event-focus/event-focus.js", 128);
count = tmp;
            }

            // Walk up the parent axis, notifying direct subscriptions and
            // testing delegate filters.
            _yuitest_coverline("/build/event-focus/event-focus.js", 133);
while (count && (target = axisNodes.shift())) {
                _yuitest_coverline("/build/event-focus/event-focus.js", 134);
yuid = Y.stamp(target);

                _yuitest_coverline("/build/event-focus/event-focus.js", 136);
notifiers = notifierData[yuid];

                _yuitest_coverline("/build/event-focus/event-focus.js", 138);
if (notifiers) {
                    _yuitest_coverline("/build/event-focus/event-focus.js", 139);
for (i = 0, len = notifiers.length; i < len; ++i) {
                        _yuitest_coverline("/build/event-focus/event-focus.js", 140);
notifier = notifiers[i];
                        _yuitest_coverline("/build/event-focus/event-focus.js", 141);
sub      = notifier.handle.sub;
                        _yuitest_coverline("/build/event-focus/event-focus.js", 142);
match    = true;

                        _yuitest_coverline("/build/event-focus/event-focus.js", 144);
e.currentTarget = target;

                        _yuitest_coverline("/build/event-focus/event-focus.js", 146);
if (sub.filter) {
                            _yuitest_coverline("/build/event-focus/event-focus.js", 147);
match = sub.filter.apply(target,
                                [target, e].concat(sub.args || []));

                            // No longer necessary to test against this
                            // delegate subscription for the nodes along
                            // the parent axis.
                            _yuitest_coverline("/build/event-focus/event-focus.js", 153);
delegates.splice(
                                arrayIndex(delegates, notifier), 1);
                        }

                        _yuitest_coverline("/build/event-focus/event-focus.js", 157);
if (match) {
                            // undefined for direct subs
                            _yuitest_coverline("/build/event-focus/event-focus.js", 159);
e.container = notifier.container;
                            _yuitest_coverline("/build/event-focus/event-focus.js", 160);
ret = notifier.fire(e);
                        }

                        _yuitest_coverline("/build/event-focus/event-focus.js", 163);
if (ret === false || e.stopped === 2) {
                            _yuitest_coverline("/build/event-focus/event-focus.js", 164);
break;
                        }
                    }
                    
                    _yuitest_coverline("/build/event-focus/event-focus.js", 168);
delete notifiers[yuid];
                    _yuitest_coverline("/build/event-focus/event-focus.js", 169);
count--;
                }

                _yuitest_coverline("/build/event-focus/event-focus.js", 172);
if (e.stopped !== 2) {
                    // delegates come after subs targeting this specific node
                    // because they would not normally report until they'd
                    // bubbled to the container node.
                    _yuitest_coverline("/build/event-focus/event-focus.js", 176);
for (i = 0, len = delegates.length; i < len; ++i) {
                        _yuitest_coverline("/build/event-focus/event-focus.js", 177);
notifier = delegates[i];
                        _yuitest_coverline("/build/event-focus/event-focus.js", 178);
sub = notifier.handle.sub;

                        _yuitest_coverline("/build/event-focus/event-focus.js", 180);
if (sub.filter.apply(target,
                            [target, e].concat(sub.args || []))) {

                            _yuitest_coverline("/build/event-focus/event-focus.js", 183);
e.container = notifier.container;
                            _yuitest_coverline("/build/event-focus/event-focus.js", 184);
e.currentTarget = target;
                            _yuitest_coverline("/build/event-focus/event-focus.js", 185);
ret = notifier.fire(e);
                        }

                        _yuitest_coverline("/build/event-focus/event-focus.js", 188);
if (ret === false || e.stopped === 2) {
                            _yuitest_coverline("/build/event-focus/event-focus.js", 189);
break;
                        }
                    }
                }

                _yuitest_coverline("/build/event-focus/event-focus.js", 194);
if (e.stopped) {
                    _yuitest_coverline("/build/event-focus/event-focus.js", 195);
break;
                }
            }
        },

        on: function (node, sub, notifier) {
            _yuitest_coverfunc("/build/event-focus/event-focus.js", "on", 200);
_yuitest_coverline("/build/event-focus/event-focus.js", 201);
sub.handle = this._attach(node._node, notifier);
        },

        detach: function (node, sub) {
            _yuitest_coverfunc("/build/event-focus/event-focus.js", "detach", 204);
_yuitest_coverline("/build/event-focus/event-focus.js", 205);
sub.handle.detach();
        },

        delegate: function (node, sub, notifier, filter) {
            _yuitest_coverfunc("/build/event-focus/event-focus.js", "delegate", 208);
_yuitest_coverline("/build/event-focus/event-focus.js", 209);
if (isString(filter)) {
                _yuitest_coverline("/build/event-focus/event-focus.js", 210);
sub.filter = function (target) {
                    _yuitest_coverfunc("/build/event-focus/event-focus.js", "filter", 210);
_yuitest_coverline("/build/event-focus/event-focus.js", 211);
return Y.Selector.test(target._node, filter,
                        node === target ? null : node._node);
                };
            }

            _yuitest_coverline("/build/event-focus/event-focus.js", 216);
sub.handle = this._attach(node._node, notifier, true);
        },

        detachDelegate: function (node, sub) {
            _yuitest_coverfunc("/build/event-focus/event-focus.js", "detachDelegate", 219);
_yuitest_coverline("/build/event-focus/event-focus.js", 220);
sub.handle.detach();
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
_yuitest_coverline("/build/event-focus/event-focus.js", 232);
if (useActivate) {
    //     name     capture phase       direct subscription
    _yuitest_coverline("/build/event-focus/event-focus.js", 234);
define("focus", "beforeactivate",   "focusin");
    _yuitest_coverline("/build/event-focus/event-focus.js", 235);
define("blur",  "beforedeactivate", "focusout");
} else {
    _yuitest_coverline("/build/event-focus/event-focus.js", 237);
define("focus", "focus", "focus");
    _yuitest_coverline("/build/event-focus/event-focus.js", 238);
define("blur",  "blur",  "blur");
}


}, '@VERSION@' ,{requires:['event-synthetic']});
