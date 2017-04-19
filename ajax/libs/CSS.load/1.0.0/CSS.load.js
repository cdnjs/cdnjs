/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w) {
    "use strict";
    var _$CSS = w.$CSS, d = w.document, head = d.head || d.getElementsByTagName("head")[0], root_page = /^[^?#]*\//.exec(location.href)[0], root_domain = /^[\w|\-]+:\/\/\/?[^\/]+/.exec(root_page)[0], loaded_stylesheets = [];
    function is_func(func) {
        return Object.prototype.toString.call(func) == "[object Function]";
    }
    function is_array(arr) {
        return Object.prototype.toString.call(arr) == "[object Array]";
    }
    function is_method(meth) {
        return typeof meth !== "undefined";
    }
    function canonical_uri(href, base_path) {
        var absolute_regex = /^\w+:\/\//;
        if (/^\/\/\/?/.test(href)) href = location.protocol + href; else if (!absolute_regex.test(href) && href.charAt(0) != "/") href = (base_path || "") + href;
        return absolute_regex.test(href) ? href : (href.charAt(0) == "/" ? root_domain : root_page) + href;
    }
    function merge_objs(source, target) {
        for (var k in source) if (source.hasOwnProperty(k)) target[k] = source[k];
        return target;
    }
    function create_instance() {
        var promise, global_defaults = {
            insertAtElement: null,
            insertBefore: false,
            basePath: "",
            allowDuplicates: false,
            cacheBust: false
        };
        function create_chain() {
            var chain_opts = merge_objs(global_defaults, {}), initialPromise, chainedPromise, resolutions = [], rejections = [], always = [], ss_objs = [], ss_obj, resolved = false, rejected = false;
            function resolve(ss, media) {
                resolved = true;
                ss.media = media;
                for (var i = 0, len = resolutions.length; i < len; i++) resolutions[i](ss);
                for (var ai = 0, a_len = always.length; i < a_len; i++) always[ai](ss);
            }
            function reject(ss) {
                rejected = true;
                for (var i = 0, len = rejections.length; i < len; i++) rejections[i](ss);
                for (var ai = 0, a_len = always.length; i < a_len; i++) always[ai](ss);
            }
            function request_css(attributes, insertAtElement, insertBefore, base_path) {
                var ss = d.createElement("link"), key;
                insertAtElement = d.querySelector(insertAtElement) || d.querySelector("meta");
                attributes["data-href"] = attributes.href;
                attributes.href = canonical_uri(attributes.href, base_path) + (chain_opts.cacheBust ? (/\?.*$/.test(attributes.href) ? "&_" : "?_") + ~~(Math.random() * 1e9) + "=" : "");
                if (!chain_opts.allowDuplicates) {
                    var len = loaded_stylesheets.length;
                    while (len--) if (attributes.href === loaded_stylesheets[len]) return false;
                }
                loaded_stylesheets.push(attributes.href);
                if (typeof attributes === "object") for (key in attributes) if (attributes.hasOwnProperty(key)) ss.setAttribute(key, attributes[key]);
                ss.rel = "stylesheet";
                ss.media = "none";
                insertAtElement.parentNode.insertBefore(ss, insertBefore ? insertAtElement : insertAtElement.nextSibling);
                return ss;
            }
            function run_callback(ss_obj, media) {
                var counter = 0, max_attempts = 20, initialSheetsLength = d.styleSheets.length;
                if (is_method(ss_obj.addEventListener)) {
                    ss_obj.addEventListener("load", resolve.bind(w, ss_obj, media), false);
                    ss_obj.addEventListener("error", reject.bind(w, ss_obj), false);
                } else if (is_method(ss_obj.attachEvent)) ss_obj.attachEvent("onload", poll); else poll();
                function poll() {
                    var intervalId = setInterval(function() {
                        var sheets = d.styleSheets, i = sheets.length, txt;
                        if (i > initialSheetsLength) {
                            try {
                                while (i--) {
                                    if (sheets[i].href === ss_obj.href) {
                                        clearInterval(intervalId);
                                        txt = sheets[i].cssText;
                                        resolve(ss_obj, media);
                                        return;
                                    }
                                }
                            } catch (e) {}
                            if (!resolved) reject(ss_obj);
                        }
                        if (counter++ >= max_attempts) {
                            clearInterval(intervalId);
                            if (!resolved) reject(ss_obj);
                        }
                    }, 500);
                }
            }
            initialPromise = {
                load: function() {
                    (function(args) {
                        for (var i = 0; i < args.length; i++) {
                            var splice_args, css_list = args[i], css_obj;
                            if (!is_array(css_list)) css_list = [ css_list ];
                            for (var j = 0, len = css_list.length; j < len; j++) {
                                css_obj = css_list[j];
                                if (is_func(css_obj)) css_obj = css_obj();
                                if (!css_obj) continue;
                                if (is_array(css_obj)) {
                                    splice_args = [].slice.call(css_obj);
                                    splice_args.unshift(j, 1);
                                    [].splice.apply(css_list, splice_args);
                                    j--;
                                    continue;
                                }
                                if (typeof css_obj == "string") css_obj = {
                                    href: css_obj
                                };
                                css_obj = merge_objs(css_obj, {
                                    media: "all"
                                });
                                ss_obj = request_css(css_obj, chain_opts.insertAtElement, chain_opts.insertBefore, chain_opts.basePath);
                                if (!ss_obj) continue;
                                ss_objs.push(ss_obj);
                                run_callback(ss_obj, css_obj.media);
                            }
                        }
                    })(arguments);
                    return chainedPromise;
                },
                noConflict: function() {
                    w.$CSS = _$CSS;
                    return promise.setOptions;
                }
            };
            chainedPromise = {
                done: function(callback) {
                    resolutions.push(callback);
                    if (resolved) callback(ss_objs[ss_objs.length - 1]);
                    return chainedPromise;
                },
                fail: function(callback) {
                    rejections.push(callback);
                    if (rejected) callback(ss_objs[ss_objs.length - 1]);
                    return chainedPromise;
                },
                always: function(callback) {
                    always.push(callback);
                    if (resolved || rejected) callback(ss_objs[ss_objs.length - 1]);
                    return chainedPromise;
                }
            };
            return {
                setOptions: function(opts) {
                    chain_opts = merge_objs(opts, chain_opts);
                    return initialPromise;
                }
            };
        }
        promise = {
            setOptions: function() {
                return create_chain().setOptions.apply(null, arguments);
            }
        };
        return promise;
    }
    w.$CSS = create_instance().setOptions;
    (function(links) {
        for (var i = 0, len = links.length; i < len; i++) {
            var href = links[i].getAttribute("href"), insertAtElement = 'link[href="' + href + '"]';
            w.$CSS({
                insertAtElement: insertAtElement
            }).load(href).always(function(insertAtElement) {
                head.removeChild(head.querySelector(insertAtElement));
            }.bind(w, insertAtElement));
        }
    })(head.querySelectorAll('link[rel=preload][as="style"]'));
})(typeof global !== "undefined" ? global : typeof exports !== "undefined" ? exports : this);
