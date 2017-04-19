/*! Only.js (Only Javascript in HTML - Conditional JavaScript dependency loader & manager)
 v2.0.1 (c) Harrison Emmanuel (2016-05-22)
 MIT License
 ------------------------------------------
 Built on LAB.js v2.0.3 (c) Kyle Simpson
 */
(function(global) {
    "use strict";
    var _$O = global.$O, _js = "js", _wait = "wait", _text = "text", _type = "type", _charset = "charset", _elem = "elem", _head = "head", _exec = "exec", _push = "push", _exec_trigger = _exec + "_trigger", _on = "on", _load = "load", _onload = _on + _load, _preload = "pre" + _load, _onpreload = _on + _preload, _loaded = _load + "ed", _className = "className", _doScroll = "doScroll", _document = "document", _Element = "Element", _documentElement = _document + _Element, _finished = "finished", _finished_listeners = _finished + "_listeners", _createElement = "create" + _Element, _frameElement = "frame" + _Element, _insertBefore = "insertBefore", _charAt = "charAt", _call = "call", _callee = _call + "ee", _splice = "splice", _slice = "slice", _script = "script", _scripts = _script + "s", _console = "console", _log = "log", _end = "end", _setOptions = "setOptions", _test = "test", _src = "src", _real_src = "real_" + _src, _error = "error", _toString = "toString", _prototype = "prototype", _ready = "ready", _readyState = _ready + "State", _length = "length", _querySelector = "querySelector", _complete = "complete", _ready_listeners = _ready + "_listeners", _attributes = "attributes", _Event = "Event", _attachEvent = "attach" + _Event, _detachEvent = "detach" + _Event, _setAttribute = "setAttribute", _readystatechange = _ready + "statechange", _onreadystatechange = _on + _readystatechange, _Listener = "Listener", _addEvent = "add" + _Event, _addEventListener = _addEvent + _Listener, _removeEventListener = "remove" + _Event + _Listener, _DOMContentLoaded = "DOMContentLoaded", _l = location, _useLocalXHR = "useLocalXHR", _alwaysPreserveOrder = "alwaysPreserveOrder", _allowDuplicates = "allowDuplicates", _cacheBust = "cacheBust", _basePath = "basePath", _autoPolyfill = "autoPolyfill", root_page = /^[^?#]*\//[_exec](_l.href)[0], root_domain = /^[\w|\-]+\:\/\/\/?[^\/]+/[_exec](root_page)[0], append_to = global[_document][_head] || global[_document].getElementsByTagName(_head)[0], opera_or_gecko = global.opera && Object[_prototype][_toString][_call](global.opera) == "[object Opera]" || "MozAppearance" in global[_document][_documentElement].style, test_script_elem = global[_document][_createElement](_script), explicit_preloading = typeof test_script_elem[_preload] == "boolean", real_preloading = explicit_preloading || test_script_elem[_readyState] && test_script_elem[_readyState] == "uninitialized", script_ordered_async = !real_preloading && test_script_elem.async === true, xhr_or_cache_preloading = !real_preloading && !script_ordered_async && !opera_or_gecko;
    function contentLoaded(win, fn) {
        var done = false, doc = win[_document], root = doc[_documentElement], modern = doc[_addEventListener], add = modern ? _addEventListener : _attachEvent, rem = modern ? _removeEventListener : _detachEvent, pre = modern ? "" : _on, init = function(e) {
            if (e[_type] === _readystatechange && doc[_readyState] !== _complete) return;
            (e[_type] === _load ? win : doc)[rem](pre + e[_type], init, false);
            if (!done && (done = true)) fn.call(win, e[_type] || e);
        }, poll = function() {
            try {
                root[_doScroll]("left");
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init("poll");
        };
        if (doc[_readyState] === _complete) fn.call(win, "lazy"); else {
            if (!modern && root[_doScroll]) try {
                if (!win[_frameElement]) poll();
            } catch (e) {}
            doc[add](pre + _DOMContentLoaded, init, false);
            doc[add](pre + _readystatechange, init, false);
            win[add](pre + _load, init, false);
        }
    }
    function is_func(func) {
        return Object[_prototype][_toString][_call](func) == "[object Function]";
    }
    function is_array(arr) {
        return Object[_prototype][_toString][_call](arr) == "[object Array]";
    }
    function canonical_uri(src, base_path) {
        var absolute_regex = /^\w+\:\/\//;
        if (/^\/\/\/?/[_test](src)) src = _l.protocol + src; else if (!absolute_regex[_test](src) && src[_charAt](0) != "/") src = (base_path || "") + src;
        return absolute_regex[_test](src) ? src : (src[_charAt](0) == "/" ? root_domain : root_page) + src;
    }
    function merge_objs(source, target) {
        for (var k in source) if (source.hasOwnProperty(k)) target[k] = source[k];
        return target;
    }
    function check_chain_group_scripts_ready(chain_group) {
        var any_scripts_ready = false;
        for (var i = 0; i < chain_group[_scripts][_length]; i++) if (chain_group[_scripts][i][_ready] && chain_group[_scripts][i][_exec_trigger]) {
            any_scripts_ready = true;
            chain_group[_scripts][i][_exec_trigger]();
            chain_group[_scripts][i][_exec_trigger] = null;
        }
        return any_scripts_ready;
    }
    function create_script_load_listener(elem, registry_item, flag, onload) {
        elem[_onload] = elem[_onreadystatechange] = function() {
            if (elem[_readyState] && elem[_readyState] != _complete && elem[_readyState] != _loaded || registry_item[flag]) return;
            elem[_onload] = elem[_onreadystatechange] = null;
            onload();
        };
    }
    function script_executed(registry_item) {
        registry_item[_ready] = registry_item[_finished] = true;
        for (var i = 0; i < registry_item[_finished_listeners][_length]; i++) registry_item[_finished_listeners][i]();
        registry_item[_ready_listeners] = [];
        registry_item[_finished_listeners] = [];
    }
    function request_script(chain_opts, script_obj, registry_item, onload, preload_this_script) {
        setTimeout(function() {
            var script, src = script_obj[_real_src], xhr;
            if ("item" in append_to) {
                if (!append_to[0]) {
                    setTimeout(arguments[_callee], 25);
                    return;
                }
                append_to = append_to[0];
            }
            script = global[_document][_createElement](_script);
            if (script_obj[_type]) script[_type] = script_obj[_type];
            if (script_obj[_charset]) script[_charset] = script_obj[_charset];
            if (_attributes in script_obj) for (var key in script_obj[_attributes]) if (script_obj[_attributes].hasOwnProperty(key)) script[_setAttribute](key, script_obj[_attributes][key]);
            if (preload_this_script) {
                if (real_preloading) {
                    registry_item[_elem] = script;
                    if (explicit_preloading) {
                        script[_preload] = true;
                        script[_onpreload] = onload;
                    } else script[_onreadystatechange] = function() {
                        if (script[_readyState] == _loaded) onload();
                    };
                    script[_src] = src;
                } else if (preload_this_script && src.indexOf(root_domain) === 0 && chain_opts[_useLocalXHR]) {
                    xhr = new XMLHttpRequest();
                    xhr[_onreadystatechange] = function() {
                        if (xhr[_readyState] == 4) {
                            xhr[_onreadystatechange] = function() {};
                            registry_item[_text] = xhr.responseText + "\n//@ sourceURL=" + src;
                            onload();
                        }
                    };
                    xhr.open("GET", src);
                    xhr.send();
                } else {
                    script[_type] = "text/cache-script";
                    create_script_load_listener(script, registry_item, _ready, function() {
                        append_to.removeChild(script);
                        onload();
                    });
                    script[_src] = src;
                    append_to[_insertBefore](script, null);
                }
            } else {
                if (script_ordered_async) {
                    script.async = false;
                    create_script_load_listener(script, registry_item, _finished, onload);
                } else {
                    create_script_load_listener(script, registry_item, _finished, onload);
                }
                script[_src] = src;
                append_to[_insertBefore](script, null);
            }
        }, 0);
    }
    function create_sandbox() {
        var global_defaults = {}, can_use_preloading = real_preloading || xhr_or_cache_preloading, registry = {}, instanceAPI, nullAPI;
        global_defaults[_useLocalXHR] = true;
        global_defaults[_alwaysPreserveOrder] = false;
        global_defaults[_allowDuplicates] = false;
        global_defaults[_cacheBust] = false;
        global_defaults[_basePath] = "";
        global_defaults[_autoPolyfill] = false;
        function execute_preloaded_script(chain_opts, script_obj, registry_item) {
            var script;
            function preload_execute_finished() {
                if (script !== null) {
                    script = null;
                    script_executed(registry_item);
                }
            }
            if (registry[script_obj[_src]][_finished]) return;
            if (!chain_opts[_allowDuplicates]) registry[script_obj[_src]][_finished] = true;
            script = registry_item[_elem] || global[_document][_createElement](_script);
            if (script_obj[_type]) script[_type] = script_obj[_type];
            if (script_obj[_charset]) script[_charset] = script_obj[_charset];
            if (_attributes in script_obj) for (var key in script_obj[_attributes]) if (script_obj[_attributes].hasOwnProperty(key)) script[_setAttribute](key, script_obj[_attributes][key]);
            create_script_load_listener(script, registry_item, _finished, preload_execute_finished);
            if (registry_item[_elem]) registry_item[_elem] = null; else if (registry_item[_text]) {
                script[_onload] = script[_onreadystatechange] = null;
                script[_text] = registry_item[_text];
            } else script[_src] = script_obj[_real_src];
            append_to[_insertBefore](script, null);
            if (registry_item[_text]) preload_execute_finished();
        }
        function do_script(chain_opts, script_obj, chain_group, preload_this_script) {
            var registry_item, registry_items, ready_cb = function() {
                script_obj.ready_cb(script_obj, function() {
                    execute_preloaded_script(chain_opts, script_obj, registry_item);
                });
            }, finished_cb = function() {
                script_obj.finished_cb(script_obj, chain_group);
            };
            script_obj[_src] = canonical_uri(script_obj[_src], chain_opts[_basePath]);
            script_obj[_real_src] = script_obj[_src] + (chain_opts[_cacheBust] ? (/\?.*$/[_test](script_obj[_src]) ? "&_" : "?_") + ~~(Math.random() * 1e9) + "=" : "");
            if (!registry[script_obj[_src]]) registry[script_obj[_src]] = {
                items: [],
                finished: false
            };
            registry_items = registry[script_obj[_src]].items;
            if (chain_opts[_allowDuplicates] || registry_items[_length] === 0) {
                registry_item = registry_items[registry_items[_length]] = {
                    ready: false,
                    finished: false,
                    ready_listeners: [ ready_cb ],
                    finished_listeners: [ finished_cb ]
                };
                request_script(chain_opts, script_obj, registry_item, preload_this_script ? function() {
                    registry_item[_ready] = true;
                    for (var i = 0; i < registry_item[_ready_listeners][_length]; i++) registry_item[_ready_listeners][i]();
                    registry_item[_ready_listeners] = [];
                } : function() {
                    script_executed(registry_item);
                }, preload_this_script);
            } else {
                registry_item = registry_items[0];
                if (registry_item[_finished]) finished_cb(); else registry_item[_finished_listeners][_push](finished_cb);
            }
        }
        function create_chain() {
            var chainedAPI, chain_opts = merge_objs(global_defaults, {}), chain = [], exec_cursor = 0, scripts_currently_loading = false, group;
            function chain_script_ready(script_obj, exec_trigger) {
                script_obj[_ready] = true;
                script_obj[_exec_trigger] = exec_trigger;
                advance_exec_cursor();
            }
            function chain_script_executed(script_obj, chain_group) {
                script_obj[_ready] = script_obj[_finished] = true;
                script_obj[_exec_trigger] = null;
                for (var i = 0; i < chain_group[_scripts][_length]; i++) if (!chain_group[_scripts][i][_finished]) return;
                chain_group[_finished] = true;
                advance_exec_cursor();
            }
            function advance_exec_cursor() {
                while (exec_cursor < chain[_length]) {
                    if (is_func(chain[exec_cursor])) {
                        try {
                            chain[exec_cursor++]();
                        } catch (err) {}
                        continue;
                    } else if (!chain[exec_cursor][_finished]) {
                        if (check_chain_group_scripts_ready(chain[exec_cursor])) continue;
                        break;
                    }
                    exec_cursor++;
                }
                if (exec_cursor == chain[_length]) {
                    scripts_currently_loading = false;
                    group = false;
                }
            }
            function init_script_chain_group() {
                if (!group || !group[_scripts]) chain[_push](group = {
                    scripts: [],
                    finished: true
                });
            }
            chainedAPI = {
                test: function(selector) {
                    if (!is_array(selector)) selector = [ selector ];
                    for (var j = 0; j < selector[_length]; j++) {
                        if (global[_document][_querySelector](selector[j]) === null) return nullAPI;
                    }
                    return chainedAPI;
                },
                js: function() {
                    (function(args) {
                        for (var i = 0; i < args[_length]; i++) {
                            var splice_args, script_obj = args[i], script_list = script_obj;
                            if (!is_array(script_obj)) script_list = [ script_obj ];
                            for (var j = 0; j < script_list[_length]; j++) {
                                init_script_chain_group();
                                script_obj = script_list[j];
                                if (is_func(script_obj)) script_obj = script_obj();
                                if (!script_obj) continue;
                                if (is_array(script_obj)) {
                                    splice_args = [][_slice][_call](script_obj);
                                    splice_args.unshift(j, 1);
                                    [][_splice].apply(script_list, splice_args);
                                    j--;
                                    continue;
                                }
                                if (typeof script_obj == "string") script_obj = {
                                    src: script_obj
                                };
                                script_obj = merge_objs(script_obj, {
                                    ready: false,
                                    ready_cb: chain_script_ready,
                                    finished: false,
                                    finished_cb: chain_script_executed
                                });
                                group[_finished] = false;
                                group[_scripts][_push](script_obj);
                                do_script(chain_opts, script_obj, group, can_use_preloading && scripts_currently_loading);
                                scripts_currently_loading = true;
                                if (chain_opts[_alwaysPreserveOrder]) chainedAPI[_wait]();
                            }
                        }
                    })(arguments);
                    return chainedAPI;
                },
                wait: function() {
                    if (arguments[_length] > 0) {
                        for (var i = 0; i < arguments[_length]; i++) chain[_push](arguments[i]);
                        group = chain[chain[_length] - 1];
                    } else group = false;
                    advance_exec_cursor();
                    return chainedAPI;
                },
                end: function() {
                    return chainedAPI;
                }
            };
            return {
                test: chainedAPI[_test],
                js: chainedAPI[_js],
                wait: chainedAPI[_wait],
                end: chainedAPI[_end],
                setOptions: function(opts) {
                    merge_objs(opts, chain_opts);
                    return chainedAPI;
                }
            };
        }
        instanceAPI = {
            setDefaults: function(opts) {
                merge_objs(opts, global_defaults);
                if (global_defaults[_autoPolyfill]) instanceAPI[_js]("https://cdn.polyfill.io/v2/polyfill.min.js");
            },
            ready: function(fn) {
                contentLoaded(global, fn);
            },
            setOptions: function() {
                return create_chain()[_setOptions].apply(null, arguments);
            },
            test: function() {
                return create_chain()[_test].apply(null, arguments);
            },
            js: function() {
                return create_chain()[_js].apply(null, arguments);
            },
            wait: function() {
                return create_chain()[_wait].apply(null, arguments);
            },
            end: create_sandbox,
            noConflict: function() {
                global.$O = _$O;
                return instanceAPI;
            },
            sandbox: create_sandbox
        };
        nullAPI = {
            test: function() {
                return nullAPI;
            },
            js: function() {
                return nullAPI;
            },
            wait: function() {
                return nullAPI;
            },
            end: instanceAPI[_end]
        };
        return instanceAPI;
    }
    var dataOnly = global[_document][_querySelector]("[data-only]");
    if (!!dataOnly) create_sandbox()[_js](dataOnly.getAttribute("data-only"));
    (function(el) {
        el[_className] = el[_className].replace("no-" + _js, _js);
    })(global[_document][_documentElement]);
    (function(addEvent, domLoaded, handler) {
        if (global[_document][_readyState] === null && global[_document][addEvent]) {
            global[_document][_readyState] = "loading";
            global[_document][addEvent](domLoaded, handler = function() {
                global[_document][_removeEventListener](domLoaded, handler, false);
                global[_document][_readyState] = _complete;
            }, false);
        }
    })(_addEventListener, _DOMContentLoaded);
    global.$O = create_sandbox();
})(typeof global !== "undefined" ? global : typeof exports !== "undefined" ? exports : this);
