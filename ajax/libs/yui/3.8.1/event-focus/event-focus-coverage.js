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
_yuitest_coverage["build/event-focus/event-focus.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/event-focus/event-focus.js",
    code: []
};
_yuitest_coverage["build/event-focus/event-focus.js"].code=["YUI.add('event-focus', function (Y, NAME) {","","/**"," * Adds bubbling and delegation support to DOM events focus and blur."," * "," * @module event"," * @submodule event-focus"," */","var Event    = Y.Event,","","    YLang    = Y.Lang,","","    isString = YLang.isString,","","    arrayIndex = Y.Array.indexOf,","","    useActivate = (function() {","","        // Changing the structure of this test, so that it doesn't use inline JS in HTML,","        // which throws an exception in Win8 packaged apps, due to additional security restrictions:","        // http://msdn.microsoft.com/en-us/library/windows/apps/hh465380.aspx#differences","","        var supported = false,","            doc = Y.config.doc,","            p;","","        if (doc) {","","            p = doc.createElement(\"p\");","            p.setAttribute(\"onbeforeactivate\", \";\");","","            // onbeforeactivate is a function in IE8+.","            // onbeforeactivate is a string in IE6,7 (unfortunate, otherwise we could have just checked for function below).","            // onbeforeactivate is a function in IE10, in a Win8 App environment (no exception running the test).","","            // onbeforeactivate is undefined in Webkit/Gecko.","            // onbeforeactivate is a function in Webkit/Gecko if it's a supported event (e.g. onclick).","","            supported = (p.onbeforeactivate !== undefined);","        }","","        return supported;","    }());","","function define(type, proxy, directEvent) {","    var nodeDataKey = '_' + type + 'Notifiers';","","    Y.Event.define(type, {","","        _useActivate : useActivate,","","        _attach: function (el, notifier, delegate) {","            if (Y.DOM.isWindow(el)) {","                return Event._attach([type, function (e) {","                    notifier.fire(e);","                }, el]);","            } else {","                return Event._attach(","                    [proxy, this._proxy, el, this, notifier, delegate],","                    { capture: true });","            }","        },","","        _proxy: function (e, notifier, delegate) {","            var target        = e.target,","                currentTarget = e.currentTarget,","                notifiers     = target.getData(nodeDataKey),","                yuid          = Y.stamp(currentTarget._node),","                defer         = (useActivate || target !== currentTarget),","                directSub;","                ","            notifier.currentTarget = (delegate) ? target : currentTarget;","            notifier.container     = (delegate) ? currentTarget : null;","","            // Maintain a list to handle subscriptions from nested","            // containers div#a>div#b>input #a.on(focus..) #b.on(focus..),","            // use one focus or blur subscription that fires notifiers from","            // #b then #a to emulate bubble sequence.","            if (!notifiers) {","                notifiers = {};","                target.setData(nodeDataKey, notifiers);","","                // only subscribe to the element's focus if the target is","                // not the current target (","                if (defer) {","                    directSub = Event._attach(","                        [directEvent, this._notify, target._node]).sub;","                    directSub.once = true;","                }","            } else {","                // In old IE, defer is always true.  In capture-phase browsers,","                // The delegate subscriptions will be encountered first, which","                // will establish the notifiers data and direct subscription","                // on the node.  If there is also a direct subscription to the","                // node's focus/blur, it should not call _notify because the","                // direct subscription from the delegate sub(s) exists, which","                // will call _notify.  So this avoids _notify being called","                // twice, unnecessarily.","                defer = true;","            }","","            if (!notifiers[yuid]) {","                notifiers[yuid] = [];","            }","","            notifiers[yuid].push(notifier);","","            if (!defer) {","                this._notify(e);","            }","        },","","        _notify: function (e, container) {","            var currentTarget = e.currentTarget,","                notifierData  = currentTarget.getData(nodeDataKey),","                axisNodes     = currentTarget.ancestors(),","                doc           = currentTarget.get('ownerDocument'),","                delegates     = [],","                                // Used to escape loops when there are no more","                                // notifiers to consider","                count         = notifierData ?","                                    Y.Object.keys(notifierData).length :","                                    0,","                target, notifiers, notifier, yuid, match, tmp, i, len, sub, ret;","","            // clear the notifications list (mainly for delegation)","            currentTarget.clearData(nodeDataKey);","","            // Order the delegate subs by their placement in the parent axis","            axisNodes.push(currentTarget);","            // document.get('ownerDocument') returns null","            // which we'll use to prevent having duplicate Nodes in the list","            if (doc) {","                axisNodes.unshift(doc);","            }","","            // ancestors() returns the Nodes from top to bottom","            axisNodes._nodes.reverse();","","            if (count) {","                // Store the count for step 2","                tmp = count;","                axisNodes.some(function (node) {","                    var yuid      = Y.stamp(node),","                        notifiers = notifierData[yuid],","                        i, len;","","                    if (notifiers) {","                        count--;","                        for (i = 0, len = notifiers.length; i < len; ++i) {","                            if (notifiers[i].handle.sub.filter) {","                                delegates.push(notifiers[i]);","                            }","                        }","                    }","","                    return !count;","                });","                count = tmp;","            }","","            // Walk up the parent axis, notifying direct subscriptions and","            // testing delegate filters.","            while (count && (target = axisNodes.shift())) {","                yuid = Y.stamp(target);","","                notifiers = notifierData[yuid];","","                if (notifiers) {","                    for (i = 0, len = notifiers.length; i < len; ++i) {","                        notifier = notifiers[i];","                        sub      = notifier.handle.sub;","                        match    = true;","","                        e.currentTarget = target;","","                        if (sub.filter) {","                            match = sub.filter.apply(target,","                                [target, e].concat(sub.args || []));","","                            // No longer necessary to test against this","                            // delegate subscription for the nodes along","                            // the parent axis.","                            delegates.splice(","                                arrayIndex(delegates, notifier), 1);","                        }","","                        if (match) {","                            // undefined for direct subs","                            e.container = notifier.container;","                            ret = notifier.fire(e);","                        }","","                        if (ret === false || e.stopped === 2) {","                            break;","                        }","                    }","                    ","                    delete notifiers[yuid];","                    count--;","                }","","                if (e.stopped !== 2) {","                    // delegates come after subs targeting this specific node","                    // because they would not normally report until they'd","                    // bubbled to the container node.","                    for (i = 0, len = delegates.length; i < len; ++i) {","                        notifier = delegates[i];","                        sub = notifier.handle.sub;","","                        if (sub.filter.apply(target,","                            [target, e].concat(sub.args || []))) {","","                            e.container = notifier.container;","                            e.currentTarget = target;","                            ret = notifier.fire(e);","                        }","","                        if (ret === false || e.stopped === 2) {","                            break;","                        }","                    }","                }","","                if (e.stopped) {","                    break;","                }","            }","        },","","        on: function (node, sub, notifier) {","            sub.handle = this._attach(node._node, notifier);","        },","","        detach: function (node, sub) {","            sub.handle.detach();","        },","","        delegate: function (node, sub, notifier, filter) {","            if (isString(filter)) {","                sub.filter = function (target) {","                    return Y.Selector.test(target._node, filter,","                        node === target ? null : node._node);","                };","            }","","            sub.handle = this._attach(node._node, notifier, true);","        },","","        detachDelegate: function (node, sub) {","            sub.handle.detach();","        }","    }, true);","}","","// For IE, we need to defer to focusin rather than focus because","// `el.focus(); doSomething();` executes el.onbeforeactivate, el.onactivate,","// el.onfocusin, doSomething, then el.onfocus.  All others support capture","// phase focus, which executes before doSomething.  To guarantee consistent","// behavior for this use case, IE's direct subscriptions are made against","// focusin so subscribers will be notified before js following el.focus() is","// executed.","if (useActivate) {","    //     name     capture phase       direct subscription","    define(\"focus\", \"beforeactivate\",   \"focusin\");","    define(\"blur\",  \"beforedeactivate\", \"focusout\");","} else {","    define(\"focus\", \"focus\", \"focus\");","    define(\"blur\",  \"blur\",  \"blur\");","}","","","}, '@VERSION@', {\"requires\": [\"event-synthetic\"]});"];
_yuitest_coverage["build/event-focus/event-focus.js"].lines = {"1":0,"9":0,"23":0,"27":0,"29":0,"30":0,"39":0,"42":0,"45":0,"46":0,"48":0,"53":0,"54":0,"55":0,"58":0,"65":0,"72":0,"73":0,"79":0,"80":0,"81":0,"85":0,"86":0,"88":0,"99":0,"102":0,"103":0,"106":0,"108":0,"109":0,"114":0,"127":0,"130":0,"133":0,"134":0,"138":0,"140":0,"142":0,"143":0,"144":0,"148":0,"149":0,"150":0,"151":0,"152":0,"157":0,"159":0,"164":0,"165":0,"167":0,"169":0,"170":0,"171":0,"172":0,"173":0,"175":0,"177":0,"178":0,"184":0,"188":0,"190":0,"191":0,"194":0,"195":0,"199":0,"200":0,"203":0,"207":0,"208":0,"209":0,"211":0,"214":0,"215":0,"216":0,"219":0,"220":0,"225":0,"226":0,"232":0,"236":0,"240":0,"241":0,"242":0,"247":0,"251":0,"263":0,"265":0,"266":0,"268":0,"269":0};
_yuitest_coverage["build/event-focus/event-focus.js"].functions = {"(anonymous 2):17":0,"(anonymous 3):54":0,"_attach:52":0,"_proxy:64":0,"(anonymous 4):143":0,"_notify:113":0,"on:231":0,"detach:235":0,"filter:241":0,"delegate:239":0,"detachDelegate:250":0,"define:45":0,"(anonymous 1):1":0};
_yuitest_coverage["build/event-focus/event-focus.js"].coveredLines = 90;
_yuitest_coverage["build/event-focus/event-focus.js"].coveredFunctions = 13;
_yuitest_coverline("build/event-focus/event-focus.js", 1);
YUI.add('event-focus', function (Y, NAME) {

/**
 * Adds bubbling and delegation support to DOM events focus and blur.
 * 
 * @module event
 * @submodule event-focus
 */
_yuitest_coverfunc("build/event-focus/event-focus.js", "(anonymous 1)", 1);
_yuitest_coverline("build/event-focus/event-focus.js", 9);
var Event    = Y.Event,

    YLang    = Y.Lang,

    isString = YLang.isString,

    arrayIndex = Y.Array.indexOf,

    useActivate = (function() {

        // Changing the structure of this test, so that it doesn't use inline JS in HTML,
        // which throws an exception in Win8 packaged apps, due to additional security restrictions:
        // http://msdn.microsoft.com/en-us/library/windows/apps/hh465380.aspx#differences

        _yuitest_coverfunc("build/event-focus/event-focus.js", "(anonymous 2)", 17);
_yuitest_coverline("build/event-focus/event-focus.js", 23);
var supported = false,
            doc = Y.config.doc,
            p;

        _yuitest_coverline("build/event-focus/event-focus.js", 27);
if (doc) {

            _yuitest_coverline("build/event-focus/event-focus.js", 29);
p = doc.createElement("p");
            _yuitest_coverline("build/event-focus/event-focus.js", 30);
p.setAttribute("onbeforeactivate", ";");

            // onbeforeactivate is a function in IE8+.
            // onbeforeactivate is a string in IE6,7 (unfortunate, otherwise we could have just checked for function below).
            // onbeforeactivate is a function in IE10, in a Win8 App environment (no exception running the test).

            // onbeforeactivate is undefined in Webkit/Gecko.
            // onbeforeactivate is a function in Webkit/Gecko if it's a supported event (e.g. onclick).

            _yuitest_coverline("build/event-focus/event-focus.js", 39);
supported = (p.onbeforeactivate !== undefined);
        }

        _yuitest_coverline("build/event-focus/event-focus.js", 42);
return supported;
    }());

_yuitest_coverline("build/event-focus/event-focus.js", 45);
function define(type, proxy, directEvent) {
    _yuitest_coverfunc("build/event-focus/event-focus.js", "define", 45);
_yuitest_coverline("build/event-focus/event-focus.js", 46);
var nodeDataKey = '_' + type + 'Notifiers';

    _yuitest_coverline("build/event-focus/event-focus.js", 48);
Y.Event.define(type, {

        _useActivate : useActivate,

        _attach: function (el, notifier, delegate) {
            _yuitest_coverfunc("build/event-focus/event-focus.js", "_attach", 52);
_yuitest_coverline("build/event-focus/event-focus.js", 53);
if (Y.DOM.isWindow(el)) {
                _yuitest_coverline("build/event-focus/event-focus.js", 54);
return Event._attach([type, function (e) {
                    _yuitest_coverfunc("build/event-focus/event-focus.js", "(anonymous 3)", 54);
_yuitest_coverline("build/event-focus/event-focus.js", 55);
notifier.fire(e);
                }, el]);
            } else {
                _yuitest_coverline("build/event-focus/event-focus.js", 58);
return Event._attach(
                    [proxy, this._proxy, el, this, notifier, delegate],
                    { capture: true });
            }
        },

        _proxy: function (e, notifier, delegate) {
            _yuitest_coverfunc("build/event-focus/event-focus.js", "_proxy", 64);
_yuitest_coverline("build/event-focus/event-focus.js", 65);
var target        = e.target,
                currentTarget = e.currentTarget,
                notifiers     = target.getData(nodeDataKey),
                yuid          = Y.stamp(currentTarget._node),
                defer         = (useActivate || target !== currentTarget),
                directSub;
                
            _yuitest_coverline("build/event-focus/event-focus.js", 72);
notifier.currentTarget = (delegate) ? target : currentTarget;
            _yuitest_coverline("build/event-focus/event-focus.js", 73);
notifier.container     = (delegate) ? currentTarget : null;

            // Maintain a list to handle subscriptions from nested
            // containers div#a>div#b>input #a.on(focus..) #b.on(focus..),
            // use one focus or blur subscription that fires notifiers from
            // #b then #a to emulate bubble sequence.
            _yuitest_coverline("build/event-focus/event-focus.js", 79);
if (!notifiers) {
                _yuitest_coverline("build/event-focus/event-focus.js", 80);
notifiers = {};
                _yuitest_coverline("build/event-focus/event-focus.js", 81);
target.setData(nodeDataKey, notifiers);

                // only subscribe to the element's focus if the target is
                // not the current target (
                _yuitest_coverline("build/event-focus/event-focus.js", 85);
if (defer) {
                    _yuitest_coverline("build/event-focus/event-focus.js", 86);
directSub = Event._attach(
                        [directEvent, this._notify, target._node]).sub;
                    _yuitest_coverline("build/event-focus/event-focus.js", 88);
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
                _yuitest_coverline("build/event-focus/event-focus.js", 99);
defer = true;
            }

            _yuitest_coverline("build/event-focus/event-focus.js", 102);
if (!notifiers[yuid]) {
                _yuitest_coverline("build/event-focus/event-focus.js", 103);
notifiers[yuid] = [];
            }

            _yuitest_coverline("build/event-focus/event-focus.js", 106);
notifiers[yuid].push(notifier);

            _yuitest_coverline("build/event-focus/event-focus.js", 108);
if (!defer) {
                _yuitest_coverline("build/event-focus/event-focus.js", 109);
this._notify(e);
            }
        },

        _notify: function (e, container) {
            _yuitest_coverfunc("build/event-focus/event-focus.js", "_notify", 113);
_yuitest_coverline("build/event-focus/event-focus.js", 114);
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
            _yuitest_coverline("build/event-focus/event-focus.js", 127);
currentTarget.clearData(nodeDataKey);

            // Order the delegate subs by their placement in the parent axis
            _yuitest_coverline("build/event-focus/event-focus.js", 130);
axisNodes.push(currentTarget);
            // document.get('ownerDocument') returns null
            // which we'll use to prevent having duplicate Nodes in the list
            _yuitest_coverline("build/event-focus/event-focus.js", 133);
if (doc) {
                _yuitest_coverline("build/event-focus/event-focus.js", 134);
axisNodes.unshift(doc);
            }

            // ancestors() returns the Nodes from top to bottom
            _yuitest_coverline("build/event-focus/event-focus.js", 138);
axisNodes._nodes.reverse();

            _yuitest_coverline("build/event-focus/event-focus.js", 140);
if (count) {
                // Store the count for step 2
                _yuitest_coverline("build/event-focus/event-focus.js", 142);
tmp = count;
                _yuitest_coverline("build/event-focus/event-focus.js", 143);
axisNodes.some(function (node) {
                    _yuitest_coverfunc("build/event-focus/event-focus.js", "(anonymous 4)", 143);
_yuitest_coverline("build/event-focus/event-focus.js", 144);
var yuid      = Y.stamp(node),
                        notifiers = notifierData[yuid],
                        i, len;

                    _yuitest_coverline("build/event-focus/event-focus.js", 148);
if (notifiers) {
                        _yuitest_coverline("build/event-focus/event-focus.js", 149);
count--;
                        _yuitest_coverline("build/event-focus/event-focus.js", 150);
for (i = 0, len = notifiers.length; i < len; ++i) {
                            _yuitest_coverline("build/event-focus/event-focus.js", 151);
if (notifiers[i].handle.sub.filter) {
                                _yuitest_coverline("build/event-focus/event-focus.js", 152);
delegates.push(notifiers[i]);
                            }
                        }
                    }

                    _yuitest_coverline("build/event-focus/event-focus.js", 157);
return !count;
                });
                _yuitest_coverline("build/event-focus/event-focus.js", 159);
count = tmp;
            }

            // Walk up the parent axis, notifying direct subscriptions and
            // testing delegate filters.
            _yuitest_coverline("build/event-focus/event-focus.js", 164);
while (count && (target = axisNodes.shift())) {
                _yuitest_coverline("build/event-focus/event-focus.js", 165);
yuid = Y.stamp(target);

                _yuitest_coverline("build/event-focus/event-focus.js", 167);
notifiers = notifierData[yuid];

                _yuitest_coverline("build/event-focus/event-focus.js", 169);
if (notifiers) {
                    _yuitest_coverline("build/event-focus/event-focus.js", 170);
for (i = 0, len = notifiers.length; i < len; ++i) {
                        _yuitest_coverline("build/event-focus/event-focus.js", 171);
notifier = notifiers[i];
                        _yuitest_coverline("build/event-focus/event-focus.js", 172);
sub      = notifier.handle.sub;
                        _yuitest_coverline("build/event-focus/event-focus.js", 173);
match    = true;

                        _yuitest_coverline("build/event-focus/event-focus.js", 175);
e.currentTarget = target;

                        _yuitest_coverline("build/event-focus/event-focus.js", 177);
if (sub.filter) {
                            _yuitest_coverline("build/event-focus/event-focus.js", 178);
match = sub.filter.apply(target,
                                [target, e].concat(sub.args || []));

                            // No longer necessary to test against this
                            // delegate subscription for the nodes along
                            // the parent axis.
                            _yuitest_coverline("build/event-focus/event-focus.js", 184);
delegates.splice(
                                arrayIndex(delegates, notifier), 1);
                        }

                        _yuitest_coverline("build/event-focus/event-focus.js", 188);
if (match) {
                            // undefined for direct subs
                            _yuitest_coverline("build/event-focus/event-focus.js", 190);
e.container = notifier.container;
                            _yuitest_coverline("build/event-focus/event-focus.js", 191);
ret = notifier.fire(e);
                        }

                        _yuitest_coverline("build/event-focus/event-focus.js", 194);
if (ret === false || e.stopped === 2) {
                            _yuitest_coverline("build/event-focus/event-focus.js", 195);
break;
                        }
                    }
                    
                    _yuitest_coverline("build/event-focus/event-focus.js", 199);
delete notifiers[yuid];
                    _yuitest_coverline("build/event-focus/event-focus.js", 200);
count--;
                }

                _yuitest_coverline("build/event-focus/event-focus.js", 203);
if (e.stopped !== 2) {
                    // delegates come after subs targeting this specific node
                    // because they would not normally report until they'd
                    // bubbled to the container node.
                    _yuitest_coverline("build/event-focus/event-focus.js", 207);
for (i = 0, len = delegates.length; i < len; ++i) {
                        _yuitest_coverline("build/event-focus/event-focus.js", 208);
notifier = delegates[i];
                        _yuitest_coverline("build/event-focus/event-focus.js", 209);
sub = notifier.handle.sub;

                        _yuitest_coverline("build/event-focus/event-focus.js", 211);
if (sub.filter.apply(target,
                            [target, e].concat(sub.args || []))) {

                            _yuitest_coverline("build/event-focus/event-focus.js", 214);
e.container = notifier.container;
                            _yuitest_coverline("build/event-focus/event-focus.js", 215);
e.currentTarget = target;
                            _yuitest_coverline("build/event-focus/event-focus.js", 216);
ret = notifier.fire(e);
                        }

                        _yuitest_coverline("build/event-focus/event-focus.js", 219);
if (ret === false || e.stopped === 2) {
                            _yuitest_coverline("build/event-focus/event-focus.js", 220);
break;
                        }
                    }
                }

                _yuitest_coverline("build/event-focus/event-focus.js", 225);
if (e.stopped) {
                    _yuitest_coverline("build/event-focus/event-focus.js", 226);
break;
                }
            }
        },

        on: function (node, sub, notifier) {
            _yuitest_coverfunc("build/event-focus/event-focus.js", "on", 231);
_yuitest_coverline("build/event-focus/event-focus.js", 232);
sub.handle = this._attach(node._node, notifier);
        },

        detach: function (node, sub) {
            _yuitest_coverfunc("build/event-focus/event-focus.js", "detach", 235);
_yuitest_coverline("build/event-focus/event-focus.js", 236);
sub.handle.detach();
        },

        delegate: function (node, sub, notifier, filter) {
            _yuitest_coverfunc("build/event-focus/event-focus.js", "delegate", 239);
_yuitest_coverline("build/event-focus/event-focus.js", 240);
if (isString(filter)) {
                _yuitest_coverline("build/event-focus/event-focus.js", 241);
sub.filter = function (target) {
                    _yuitest_coverfunc("build/event-focus/event-focus.js", "filter", 241);
_yuitest_coverline("build/event-focus/event-focus.js", 242);
return Y.Selector.test(target._node, filter,
                        node === target ? null : node._node);
                };
            }

            _yuitest_coverline("build/event-focus/event-focus.js", 247);
sub.handle = this._attach(node._node, notifier, true);
        },

        detachDelegate: function (node, sub) {
            _yuitest_coverfunc("build/event-focus/event-focus.js", "detachDelegate", 250);
_yuitest_coverline("build/event-focus/event-focus.js", 251);
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
_yuitest_coverline("build/event-focus/event-focus.js", 263);
if (useActivate) {
    //     name     capture phase       direct subscription
    _yuitest_coverline("build/event-focus/event-focus.js", 265);
define("focus", "beforeactivate",   "focusin");
    _yuitest_coverline("build/event-focus/event-focus.js", 266);
define("blur",  "beforedeactivate", "focusout");
} else {
    _yuitest_coverline("build/event-focus/event-focus.js", 268);
define("focus", "focus", "focus");
    _yuitest_coverline("build/event-focus/event-focus.js", 269);
define("blur",  "blur",  "blur");
}


}, '@VERSION@', {"requires": ["event-synthetic"]});
