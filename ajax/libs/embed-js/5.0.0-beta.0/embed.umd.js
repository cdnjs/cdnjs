/*
 * embed-js - v5.0.0-beta.0
 * A boilerplate to write plugins in pure JavaScript using ES2015
 * https://github.com/ritz078/embed.js
 *
 * Made by Ritesh Kumar
 * Under MIT License
 */
 
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EmbedJS = factory());
}(this, (function () { 'use strict';

var index$1 = extend;
function extend(obj1, obj2) {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] === 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && typeof value == 'object') {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$3 = createCommonjsModule(function (module) {
    'use strict';
    module.exports = (function (iterable, reducer, initVal) { return new Promise(function (resolve, reject) {
        var iterator = iterable[Symbol.iterator]();
        var i = 0;
        var next = function (total) {
            var el = iterator.next();
            if (el.done) {
                resolve(total);
                return;
            }
            Promise.all([total,el.value]).then(function (value) {
                next(reducer(value[0], value[1], i++));
            }).catch(reject);
        };
        next(initVal);
    }); });
});

var index$2 = function (iterable, initVal) { return index$3(iterable, function (prev, fn) { return fn(prev); }, initVal); };

var index$5 = isNode;
function isNode(val) {
    return !val || typeof val !== 'object' ? false : typeof window === 'object' && typeof window.Node === 'object' ? val instanceof window.Node : typeof val.nodeType === 'number' && typeof val.nodeName === 'string';
}

function matchAll(str, re) {
    var matches = [];
    var res = re.exec(str);
    while (res) {
        matches.push(res);
        if (!re.global) {
            break;
        }
        res = re.exec(str);
    }
    return matches;
}

function replaceAll(str, matches) {
    return matches.reverse().reduce(function (res, match) {
        var prefix = res.slice(0, match.index);
        var postfix = res.slice(match.index + match[0].length);
        return prefix + match.replacement + postfix;
    }, str);
}

function assignReplacement(match, replacer) {
    var args = match.concat([match.index,match.input]);
    return replacer.apply(null, args).then(function (res) {
        return index$1({}, match, {
            replacement: res
        });
    });
}

function concurrency(matches, replacer) {
    var promises = matches.map(function (match) {
        return assignReplacement(match, replacer);
    });
    return Promise.all(promises);
}

function processString(str, re, replacer) {
    var matches = matchAll(str, re);
    var processor = concurrency;
    return processor(matches, replacer).then(function (matches) {
        return replaceAll(str, matches);
    });
}

function stringReplaceAsync(str, re, replacer) {
    re.lastIndex = 0;
    try {
        return Promise.resolve(processString(str, re, replacer));
    } catch (e) {
        return Promise.reject(e);
    }
}

var anchorRegex = /<a[^>]*>([^<]+)<\/a>/gi;
function isMatchPresent(regex, text, test) {
    if ( test === void 0 ) test = false;

    return test ? regex.test(text) : text.match(regex);
}

function isAnchorTagApplied(text) {
    return anchorRegex.test(text);
}

function sortEmbeds(embeds) {
    return embeds.sort(function (a, b) { return a.index - b.index; });
}

function combineEmbedsText(embeds) {
    return sortEmbeds(embeds).map(function (ref) {
        var content = ref.content;

        return content;
    }).join(" ");
}

function appendEmbedsAtEnd(ref) {
    var result = ref.result;
    var _embeds = ref._embeds;

    return (result + " " + (combineEmbedsText(_embeds)));
}

function saveServiceName(ref, ref$1, match) {
    var _services = ref._services;
    var name = ref$1.name;

    if (!_services.filter(function (x) { return x.match === match; }).length) {
        _services.push({
            name: name,
            match: match
        });
    }
}

function pushEmbedContent(text, options, pluginOptions, index) {
    return new Promise(function ($return, $error) {
        var regex;
        var assign;
        ((assign = pluginOptions, regex = assign.regex));
        return stringReplaceAsync(text, regex, function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return new Promise(function ($return, $error) { return getTemplate(args, options, pluginOptions).then(function ($await_7) {
            try {
                options._embeds.push({
                    content: $await_7,
                    index: index || args.find(function (x) { return typeof x === "number"; })
                });
                saveServiceName(options, pluginOptions, args[0]);
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }, $error); });
        }).then(function ($await_8) {
            try {
                return $return(options);
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }, $error);
    });
}

function saveEmbedData(opts, pluginOptions) {
    var this$1 = this;

    return new Promise(function ($return, $error) {
        var regex;
        var options;
        var assign;
        ((assign = pluginOptions, regex = assign.regex));
        options = index$1({}, opts);
        if (isAnchorTagApplied(options.result)) {
            return stringReplaceAsync(options.result, anchorRegex, function (match, url, index) { return new Promise(function ($return, $error) {
                if (!isMatchPresent(regex, match, true)) 
                    { return $return(match); }
                saveServiceName(options, pluginOptions, match);
                return pushEmbedContent(url, options, pluginOptions, index).then(function ($await_9) {
                    try {
                        options = $await_9;
                        return $return(match);
                    } catch ($boundEx) {
                        return $error($boundEx);
                    }
                }, $error);
            }); }).then(function ($await_10) {
                try {
                    return $If_3.call(this$1);
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error);
        } else {
            options = pushEmbedContent(options.result, options, pluginOptions);
            return $If_3.call(this$1);
        }
        function $If_3() {
            return $return(options);
        }
        
    });
}

function getMatch(regex, string) {
    regex.lastIndex = 0;
    var matches = regex.exec(string);
    regex.lastIndex = 0;
    return matches;
}

function getTemplate(args, options, pluginOptions) {
    var this$1 = this;

    return new Promise(function ($return, $error) {
        var _process, template;
        var data;
        var assign;
        ((assign = pluginOptions, _process = assign._process, template = assign.template));
        if (_process) {
            return _process(args, options, pluginOptions).then(function ($await_11) {
                try {
                    data = $await_11;
                    return $If_4.call(this$1);
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error);
        }
        function $If_4() {
            return $return(template(args, options, pluginOptions, data));
        }
        
        return $If_4.call(this$1);
    });
}

function basicReplace(options, pluginOptions) {
    return new Promise(function ($return, $error) {
        var result = options.result;
        var replaceUrl = options.replaceUrl;
        var regex = pluginOptions.regex;
        var _replaceAnyways = pluginOptions._replaceAnyways;
        return $return(stringReplaceAsync(result, regex, function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return new Promise(function ($return, $error) {
            saveServiceName(options, pluginOptions, args[0]);
            return new Promise(function ($return, $error) {
                if (replaceUrl || _replaceAnyways) 
                    { return $return(getTemplate(args, options, pluginOptions)); }
                return getTemplate(args, options, pluginOptions).then(function ($await_12) {
                    try {
                        return $return(((args[0]) + " " + $await_12));
                    } catch ($boundEx) {
                        return $error($boundEx);
                    }
                }, $error);
            }).then($return, $error);
        });
        }));
    });
}

function anchorReplace(options, pluginOptions) {
    return new Promise(function ($return, $error) {
        var result = options.result;
        var replaceUrl = options.replaceUrl;
        var regex = pluginOptions.regex;
        var _replaceAnyways = pluginOptions._replaceAnyways;
        return $return(stringReplaceAsync(result, anchorRegex, function (match, url) { return new Promise(function ($return, $error) {
            var args, t;
            if (!isMatchPresent(regex, url, true)) {
                return $return(match);
            }
            if (!(replaceUrl || _replaceAnyways)) {
                args = getMatch(regex, url);
                saveServiceName(options, pluginOptions, args[0]);
                return getTemplate(args, options, pluginOptions).then(function ($await_14) {
                    try {
                        t = $await_14;
                        return $return(args ? match + t : match);
                    } catch ($boundEx) {
                        return $error($boundEx);
                    }
                }, $error);
            }
            return $return(stringReplaceAsync(url, regex, function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return new Promise(function ($return, $error) {
                saveServiceName(options, pluginOptions, args[0]);
                return $return(getTemplate(args, options, pluginOptions));
            });
            }));
        }); }));
    });
}

function insert(options, pluginOptions) {
    return new Promise(function ($return, $error) {
        var result, inlineEmbed, _ignoreAnchorCheck, _ignoreInlineCheck;
        var output;
        var assign;
        ((assign = options, result = assign.result, inlineEmbed = assign.inlineEmbed));
        var assign$1;
        ((assign$1 = pluginOptions, _ignoreAnchorCheck = assign$1._ignoreAnchorCheck, _ignoreInlineCheck = assign$1._ignoreInlineCheck));
        if (!inlineEmbed && !_ignoreInlineCheck) {
            return $return(saveEmbedData(options, pluginOptions));
        }
        return new Promise(function ($return, $error) {
            if (isAnchorTagApplied(result) && !_ignoreAnchorCheck) {
                return anchorReplace(options, pluginOptions).then($return, $error);
            }
            return basicReplace(options, pluginOptions).then($return, $error);
        }).then(function ($await_17) {
            try {
                output = $await_17;
                return $return(index$1({}, options, {
                    result: output
                }));
            } catch ($boundEx) {
                return $error($boundEx);
            }
        }, $error);
    });
}

var index$6 = createCommonjsModule(function (module, exports) {
    exports = (module.exports = detect);
    function detect() {
        if (typeof process != "undefined") 
            { return true; }
        return false;
    }
    
});

var base = function (opts) {
    var defaultOptions = {
        _replaceAnyways: false,
        _ignoreAnchorCheck: false,
        _ignoreInlineCheck: false,
        onLoad: function onLoad() {}
    };
    var pluginOptions = index$1({}, defaultOptions, opts);
    var _onLoadInternal = pluginOptions._onLoadInternal;
    var onLoad = pluginOptions.onLoad;
    var regex = pluginOptions.regex;
    var template = pluginOptions.template;
    if (!regex) {
        throw new Error("regex not passed.");
    }
    if (!template) {
        throw new Error("template not passed.");
    }
    return {
        transform: function transform(options) {
            return new Promise(function ($return, $error) { return insert(options, pluginOptions).then(function ($await_1) {
                try {
                    return $return(index$1({}, options, $await_1));
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error); });
        },
        onLoad: function onLoad$1(options) {
            if (_onLoadInternal) {
                _onLoadInternal(options, pluginOptions);
            }
            if (onLoad) {
                onLoad(options, pluginOptions);
            }
        }
    };
};

var name = 'highlight';
function highlight(opts) {
    var defaultOptions = {
        name: name,
        regex: /(`{3})(\s|[a-z]+)\s*([\s\S]*?[^`])\s*\1(?!`)/gm,
        prismjs: index$6() ? require('prismjs') : window.Prism,
        template: function template(args, options, ref) {
            var prismjs = ref.prismjs;

            var language = args[2];
            var code = args[3];
            var className = "language-" + (language || 'markup');
            return ("<pre class=\"" + className + "\"><code class=\"" + className + "\">" + (prismjs.highlight(code, prismjs.languages[language || 'markup'])) + "</code></pre>");
        }
    };
    var pluginOptions = index$1({}, defaultOptions, opts, {
        _replaceAnyways: true,
        _ignoreAnchorCheck: true,
        _ignoreInlineCheck: true
    });
    return base(pluginOptions);
}

highlight.id = name;

var index$7 = function emojiRegex() {
    return /:([a-z0-9_\+\-]+):/g;
};

var index$8 = kebabCase;
var wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
var capitals = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g;
function kebabCase(str) {
    str = str.replace(capitals, function (match) {
        return ' ' + (match.toLowerCase() || match);
    });
    return str.trim().split(wordSeparators).join('-');
}

var name$1 = "emoji";
function emoji(opts) {
    var defaultOptions = {
        name: name$1,
        regex: index$7(),
        template: function template(emojiName) {
            return ("<span class=\"ec ec-" + (index$8(emojiName)) + "\"></span>");
        }
    };
    var pluginOptions = index$1({}, defaultOptions, opts);
    return {
        transform: function transform(options) {
            return Promise.resolve(index$1({}, options, {
                result: options.result.replace(pluginOptions.regex, function (match, emojiName) {
                    options._services.push({
                        name: name$1,
                        match: match
                    });
                    return pluginOptions.template(emojiName, options, pluginOptions);
                })
            }));
        }
    };
}

emoji.id = name$1;

var unfetch = index$6() ? require("node-fetch") : window.fetch || window.unfetch;

var index$9 = truncate;
function truncate(str, length, end) {
    if (length == null || length >= str.length) {
        return str;
    }
    if (end == null) {
        end = '...';
    }
    return str.slice(0, Math.max(0, length - end.length)) + end;
}

var withDetailsTemplate = function (ref, thumbClassName) {
    var url = ref.url;
    var title = ref.title;
    var embedUrl = ref.embedUrl;
    var description = ref.description;
    var thumbnail = ref.thumbnail;

    return ("<div class=\"ejs-preview ejs-embed\"><div class=\"ejs-thumb " + thumbClassName + "\" data-url=\"" + embedUrl + "\" style=\"background-image:url(" + thumbnail + ")\"><span>&#9658;</span></div><div class=\"ejs-info\"><h4 class=\"ejs-title\"><a href=\"" + url + "\">" + title + "</a></h4><div class=\"ejs-desc\">" + (index$9(description, 150)) + "</div></div></div>");
};

var name$2 = 'github';
function _process(args) {
    return new Promise(function ($return, $error) {
        var user, repo, res;
        var assign;
        (assign = args, user = assign[1], repo = assign[2]);
        var $Try_1_Post = function () {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        var $Try_1_Catch = function (e) {
            try {
                return $return({});
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        try {
            return unfetch(("https://api.github.com/repos/" + user + "/" + repo)).then(function ($await_2) {
                try {
                    res = $await_2;
                    return $return(res.json());
                } catch ($boundEx) {
                    return $Try_1_Catch($boundEx);
                }
            }, $Try_1_Catch);
        } catch (e) {
            $Try_1_Catch(e);
        }
    });
}

function github(opts) {
    var defaultOptions = {
        name: name$2,
        regex: /[^\.]github.com\/([\w\.\-]+)\/([\w\.\-]+[^\.])/gi,
        template: function template(args, options, pluginOptions, ref) {
            var owner = ref.owner;
            var description = ref.description;
            var html_url = ref.html_url;
            var full_name = ref.full_name;

            return new Promise(function ($return, $error) { return $return(withDetailsTemplate({
                thumbnail: owner.avatar_url,
                url: html_url,
                description: description,
                title: full_name
            })); });
        }
    };
    var pluginOptions = index$1({}, defaultOptions, opts, {
        _process: _process
    });
    return base(pluginOptions);
}

github.id = name$2;

var name$3 = 'media';
var image = ['gif','jpg','jpeg','tiff','png','svg','webp'];
var video = ['ogv','webm','mp4'];
var audio = ['wav','mp3','ogg'];
function basicImage(opts) {
    var defaultOptions = {
        name: name$3,
        regex: new RegExp(("(?:https?)://\\S*\\.(?:" + (image.concat(video, audio).join('|')) + ")"), 'gi'),
        template: function template(args) {
            var url = args[0];
            var ext = url.split('.').slice(-1)[0];
            if (image.indexOf(ext) >= 0) {
                return ("<img class=\"ejs-embed\" src=\"" + url + "\"/>");
            } else if (video.indexOf(ext) >= 0) {
                return ("<video src=\"" + url + "\" controls class=\"ejs-video\"></video>");
            } else if (audio.indexOf(ext) >= 0) {
                return ("<audio src=\"" + url + "\" controls class=\"ejs-audio\"></audio>");
            }
        }
    };
    var pluginOptions = index$1({}, defaultOptions, opts);
    return base(pluginOptions);
}

basicImage.id = name$3;

var index$10 = function youtubeRegex() {
    var regex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/g;
    return regex;
};

var withoutDetailTemplate = function (embedUrl, height, name) {
    return ("<iframe class=\"ejs-embed ejs-" + name + "\" src=\"" + embedUrl + "\" frameBorder=\"0\" height=\"" + height + "\"></iframe>");
};

var name$4 = 'youtube';
var baseUrl = 'https://www.youtube.com/';
function formatData(ref) {
    var snippet = ref.snippet;
    var id = ref.id;

    return {
        title: snippet.title,
        thumbnail: snippet.thumbnails.medium.url,
        description: snippet.description,
        url: (baseUrl + "watch?v=" + id),
        embedUrl: (baseUrl + "embed/" + id)
    };
}

function fetchDetails(id, gAuthKey) {
    return new Promise(function ($return, $error) {
        var res, data;
        var $Try_1_Post = function () {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        var $Try_1_Catch = function (e) {
            try {
                return $return({});
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        try {
            return unfetch(("https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + gAuthKey + "&part=snippet,statistics")).then(function ($await_2) {
                try {
                    res = $await_2;
                    return res.json().then(function ($await_3) {
                        try {
                            data = $await_3;
                            return $return(data.items[0]);
                        } catch ($boundEx) {
                            return $Try_1_Catch($boundEx);
                        }
                    }, $Try_1_Catch);
                } catch ($boundEx) {
                    return $Try_1_Catch($boundEx);
                }
            }, $Try_1_Catch);
        } catch (e) {
            $Try_1_Catch(e);
        }
    });
}

function onLoad(ref, ref$1) {
    var input = ref.input;
    var clickClass = ref$1.clickClass;
    var onVideoShow = ref$1.onVideoShow;
    var height = ref$1.height;

    if (!index$5(input)) {
        throw new Error("input should be a DOM Element.");
    }
    var classes = document.getElementsByClassName(clickClass);
    for (var i = 0;i < classes.length; i++) {
        classes[i].onclick = function () {
            var url = this.getAttribute("data-url");
            onVideoShow(url);
            url += "?autoplay=1";
            this.parentNode.innerHTML = withoutDetailTemplate(url, height, name$4);
        };
    }
}

function _process$1(args, options, ref) {
    var gAuthKey = ref.gAuthKey;
    var details = ref.details;

    return details && fetchDetails(args[1], gAuthKey);
}

function youtube(opts) {
    var defaultOptions = {
        name: name$4,
        regex: index$10(),
        gAuthKey: "",
        details: true,
        height: 300,
        clickClass: "ejs-video-thumb",
        onVideoShow: function onVideoShow() {},
        _onLoadInternal: function _onLoadInternal(options, pluginOptions) {
            onLoad(options, pluginOptions);
        },
        onLoad: function onLoad() {},
        template: function template(args, options, ref, data) {
            var details = ref.details;
            var height = ref.height;
            var clickClass = ref.clickClass;

            return new Promise(function ($return, $error) {
                var embedUrl = baseUrl + "embed/" + (args[1]);
                return $return(details ? withDetailsTemplate(formatData(data), clickClass) : withoutDetailTemplate(embedUrl, height, name$4));
            });
        }
    };
    if (!opts.gAuthKey) {
        throw new Error("You need to pass google auth key.");
    }
    var pluginOptions = index$1({}, defaultOptions, opts, {
        _process: _process$1
    });
    return base(pluginOptions);
}

youtube.id = name$4;

var index$11 = pluck;
function pluck(collection, propertyName) {
    if (!collection || typeof collection != 'object') {
        return new Error('expected first argument to be an object or array');
    }
    var result, len, i, keys, key;
    if (Array.isArray(collection)) {
        result = [];
        len = collection.length;
        for (i = 0; i < len; i++) {
            result.push(collection[i][propertyName]);
        }
    } else {
        result = {};
        keys = Object.keys(collection);
        len = keys.length;
        for (i = 0; i < len; i++) {
            key = keys[i];
            result[key] = collection[key][propertyName];
        }
    }
    return result;
}

var index$12 = flatten;
function flatten(arr) {
    var result = [];
    var len = arr.length;
    for (var i = 0;i < len; i++) {
        var elem = arr[i];
        if (Array.isArray(elem)) {
            result.push.apply(result, flatten(elem));
        } else {
            result.push(elem);
        }
    }
    return result;
}

var regexes = [{
    patterns: ["https?://soundcloud.com/.*/.[^\\s]*"],
    name: "SoundCloud"
},{
    name: "slideshare",
    patterns: ["https?://www\\.slideshare\\.net/.*/.[^\\s]*","https?://fr\\.slideshare\\.net/.*/.[^\\s]*",
        "https?://de\\.slideshare\\.net/.*/.[^\\s]*","https?://es\\.slideshare\\.net/.*/.[^\\s]*",
        "https?://pt\\.slideshare\\.net/.*/.[^\\s]*"]
},{
    name: "vimeo",
    patterns: ["https?://vimeo\\.com/.[^\\s]*","https?://vimeo\\.com/album/.*/video/.[^\\s]*",
        "https?://vimeo\\.com/channels/.*/.[^\\s]*","https?://vimeo\\.com/groups/.*/videos/.[^\\s]*",
        "https?://vimeo\\.com/ondemand/.*/.[^\\s]*"]
},{
    patterns: ["https?://photos\\.app\\.net/.*/.[^\\s]*","https?://live\\.amcharts\\.com/.[^\\s]*",
        "https?://codepen\\.io/.[^\\s]*","https?://codepen\\.io/.[^\\s]*","https?://www\\.collegehumor\\.com/video/.[^\\s]*",
        "https?://www\\.dailymotion\\.com/video/.[^\\s]*","https?://.*\\.deviantart\\.com/art/.[^\\s]*",
        "https?://.*\\.deviantart\\.com/.*#/d.[^\\s]*","https?://dotsub\\.com/view/.[^\\s]*",
        "https?://.*\\.flickr\\.com/photos/.[^\\s]*","https?://flic\\.kr/p/.[^\\s]*",
        "https?://.*\\.wikimedia\\.org/.*_geograph\\.org\\.uk_.[^\\s]*","https?://gfycat\\.com/.[^\\s]*",
        "https?://www\\.gfycat\\.com/.[^\\s]*","https?://gfycat\\.com/.[^\\s]*","https?://www\\.gfycat\\.com/.[^\\s]*",
        "https?://giphy\\.com/gifs/.[^\\s]*","https?://media\\.giphy\\.com/media/.*/giphy\\.gif",
        "https?://www\\.hulu\\.com/watch/.[^\\s]*","https?://www\\.kickstarter\\.com/projects/.[^\\s]*",
        "https?://www\\.mixcloud\\.com/.*/.*/","https?://reddit\\.com/r/.*/comments/.*/.[^\\s]*",
        "https?://.*\\.screen9\\.tv/.[^\\s]*","https?://www\\.scribd\\.com/doc/.[^\\s]*",
        "https?://.*\\.smugmug\\.com/.[^\\s]*","https?://soundcloud\\.com/.[^\\s]*",
        "https?://play\\.soundsgood\\.co/playlist/.[^\\s]*","https?://speakerdeck\\.com/.*/.[^\\s]*",
        "https?://speakerdeck\\.com/.*/.[^\\s]*","https?://ted\\.com/talks/.[^\\s]*",
        "https?://www\\.nytimes\\.com/svc/oembed","https?://nytimes\\.com/.[^\\s]*",
        "https?://.*\\.nytimes\\.com/.[^\\s]*","https?://clips\\.twitch\\.tv/.[^\\s]*",
        "https?://clips\\.twitch\\.tv/.[^\\s]*","https?://www\\.twitch\\.tv/.[^\\s]*",
        "https?://www\\.twitch\\.tv/.[^\\s]*","https?://twitch\\.tv/.[^\\s]*","https?://twitch\\.tv/.[^\\s]*",
        "https?://.*\\.ustream\\.tv/.[^\\s]*","https?://.*\\.ustream\\.com/.[^\\s]*",
        "https?://veervr\\.tv/videos/.[^\\s]*","https?://www\\.vevo\\.com/.[^\\s]*",
        "https?://www\\.vevo\\.com/.[^\\s]*","https?://player\\.vimeo\\.com/video/.[^\\s]*",
        "https?://vine\\.co/v/.[^\\s]*","https?://vine\\.co/v/.[^\\s]*"],
    name: "oEmbed"
},{
    name: "Imgur",
    patterns: ["https?://imgur\\.com/(?:[^\\/]+/)?[0-9a-zA-Z]+$"]
},{
    patterns: ["https?://www\\.(dropbox\\.com/s/.+\\.(?:jpg|png|gif))","https?://db\\.tt/[a-zA-Z0-9][^\\s]+"],
    name: "Dropbox"
},{
    patterns: ["https?://(?:www|mobile\\.)?twitter\\.com/(?:#!/)?([^/]+)/status(?:es)?/(\\d+)"],
    name: "Twitter"
}];
function getRegexes(excludeServices) {
    if ( excludeServices === void 0 ) excludeServices = [];

    var includedRegexes = regexes.filter(function (r) { return excludeServices.indexOf(r.name.toLowerCase()) === -1; });
    var patterns = index$12(index$11(includedRegexes, "patterns"));
    return new RegExp(patterns.join("|"), "gi");
}

function isServicePresent(serviceName, text) {
    var service = regexes.filter(function (r) { return r.name.toLowerCase() === serviceName; })[0];
    var regex = new RegExp(service.patterns.join('|'), 'gi');
    return regex.test(text);
}

var name$6 = "noEmbed";
function _process$3(args) {
    return new Promise(function ($return, $error) {
        var url, res;
        url = args[0];
        var $Try_1_Post = function () {
            try {
                return $return();
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        var $Try_1_Catch = function (e) {
            try {
                return $return({
                    html: url
                });
            } catch ($boundEx) {
                return $error($boundEx);
            }
        };
        try {
            return unfetch(("https://noembed.com/embed?url=" + url)).then(function ($await_2) {
                try {
                    res = $await_2;
                    return res.json().then($return, $Try_1_Catch);
                } catch ($boundEx) {
                    return $Try_1_Catch($boundEx);
                }
            }, $Try_1_Catch);
        } catch (e) {
            $Try_1_Catch(e);
        }
    });
}

function noEmbed(opts) {
    if ( opts === void 0 ) opts = {};

    var defaultOptions = {
        name: name$6,
        regex: null,
        exclude: [],
        twttr: !index$6() ? window.twttr : null,
        onLoad: function onLoad() {},
        template: function template(args, options, pluginOptions, ref) {
            var html = ref.html;

            return new Promise(function ($return, $error) { return $return(("<div class=\"ejs-embed\">" + html + "</div>")); });
        },
        _onLoadInternal: function _onLoadInternal(ref, ref$1) {
            var input = ref.input;
            var result = ref.result;
            var twttr = ref$1.twttr;
            var onLoad = ref$1.onLoad;

            if (isServicePresent('twitter', result) && twttr && index$5(input)) {
                twttr.widgets.load(input);
                twttr.events.bind("loaded", onLoad);
            }
        }
    };
    var pluginOptions = index$1({}, defaultOptions, opts, {
        _process: _process$3
    });
    if (!opts.regex) {
        pluginOptions.regex = getRegexes(pluginOptions.exclude);
    }
    return base(pluginOptions);
}

noEmbed.id = name$6;

var unfetch$1;
if (index$6()) {
    unfetch$1 = require("node-fetch");
}

var rAmp = /&/g;
var rLt = /</g;
var rGt = />/g;
var rApos = /\'/g;
var rQuot = /\"/g;
var hChars = /[&<>\"\']/;
function coerceToString(val) {
    return String(val === null || val === undefined ? '' : val);
}

var index$14 = function (str) {
    str = coerceToString(str);
    return hChars.test(str) ? str.replace(rAmp, '&amp;').replace(rLt, '&lt;').replace(rGt, '&gt;').replace(rApos, '&#39;').replace(rQuot, '&quot;') : str;
};

var rLink = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
var rEmail = /\b(([a-zA-Z0-9\-\_\.])+(\+[a-zA-Z0-9]*)?@[a-zA-Z\_\-]+?(\.[a-zA-Z]{2,6})+)/gim;
var index$13 = function (text, options) {
    if (!options) 
        { options = {}; }
    var retval = "", cur = 0, match;
    var escapeFn = options.escape === false ? function (str) {
        return str;
    } : index$14;
    while (match = rLink.exec(text)) {
        retval += escapeFn(text.slice(cur, match.index));
        retval += anchor(match[0], options.attributes);
        cur = rLink.lastIndex;
    }
    retval += escapeFn(text.slice(cur));
    retval = emails(retval, options.attributes);
    return retval;
};
function anchor(url, attrs) {
    var text = index$14(url), href = url;
    if (!/^[a-zA-Z]{1,6}:/.test(href)) {
        href = 'http://' + href;
    }
    var attrsString = combine({
        href: href
    }, attrs);
    return "<a " + attrsString + ">" + text + "</a>";
}

function combine() {
    return Array.prototype.slice.call(arguments).map(attributes).filter(Boolean).join(" ");
}

function emails(text, attrs) {
    var attrsString = attributes(attrs);
    return text.replace(rEmail, function (match, email) {
        var elAttrs = attributes({
            href: "mailto:" + email
        });
        if (attrsString) {
            elAttrs += " " + attrsString;
        }
        return "<a " + elAttrs + ">" + index$14(email) + "</a>";
    });
}

function attributes(attrs) {
    if (!attrs) 
        { return ""; }
    return Object.keys(attrs).map(function (name) {
        var value = attrs[name];
        return index$14(name) + "=\"" + index$14(value) + "\"";
    }).join(" ");
}

var name$8 = "url";
function url(opts) {
    var defaultOptions = {
        attributes: {},
        escape: false
    };
    var ref = index$1({}, defaultOptions, opts);
    var attributes = ref.attributes;
    var escape = ref.escape;
    return {
        transform: function transform(options) {
            return new Promise(function ($return, $error) { return $return(index$1({}, options, {
                result: index$13(options.result, {
                    attributes: attributes,
                    escape: escape
                })
            })); });
        }
    };
}

url.id = name$8;

var name$9 = "facebook";
function facebook(opts) {
    var defaultOptions = {
        name: name$9,
        regex: /(https?:\/\/)?www\.facebook\.com\/(?:(videos|posts)\.php\?v=\d+|.*?\/(videos|posts)\/\d+\/?)/gi,
        height: 225,
        template: function template(args, options, ref) {
            var height = ref.height;

            var url = args[0];
            var type = url.indexOf("/videos/") < 0 ? "post" : "video";
            return withoutDetailTemplate(("https://www.facebook.com/plugins/" + type + ".php?href=" + url), height, name$9);
        }
    };
    var pluginOptions = index$1({}, defaultOptions, opts);
    return base(pluginOptions);
}

facebook.id = name$9;

var name$10 = 'instagram';
function instagram(opts) {
    var defaultOptions = {
        name: name$10,
        height: 440,
        regex: /((https?:\/\/)(www\.)?instagram.com\/p\/[a-zA-Z0-9_\-\=]+)(\/\?[a-zA-Z0-9_\-\=]+)?/gi,
        template: function template(args, options, ref) {
            var width = ref.width;
            var height = ref.height;

            return ("<iframe class=\"ejs-embed ejs-instagram\" src=\"" + (args[1]) + "/embed\" height=\"" + height + "\"></iframe>");
        }
    };
    var pluginOptions = index$1({}, defaultOptions, opts);
    return base(pluginOptions);
}

instagram.id = name$10;



var plugins = Object.freeze({
	highlight: highlight,
	media: basicImage,
	emoji: emoji,
	github: github,
	youtube: youtube,
	noEmbed: noEmbed,
	url: url,
	facebook: facebook,
	base: base,
	instagram: instagram
});

var all = function (options) {
    var defaultOptions = {
        exclude: []
    };
    var presetOptions = index$1({}, defaultOptions, options);
    var pluginNames = [url,emoji,github,noEmbed,youtube,facebook,highlight,basicImage,
        instagram];
    var plugins = pluginNames.map(function (plugin) {
        var id = plugin.id;
        var pluginOptions = presetOptions[id];
        if (presetOptions.exclude.indexOf(plugin.id) === -1) {
            if (id === "youtube" || id === "map") {
                return plugin(index$1({}, {
                    gAuthKey: options.gAuthKey
                }, pluginOptions));
            } else if (id === "noEmbed") {
                return plugin(index$1({}, pluginOptions, {
                    exclude: ["youtube"]
                }));
            }
            return plugin(pluginOptions);
        }
        return null;
    });
    return plugins.filter(function (plugin) { return !(!plugin); });
};



var presets = Object.freeze({
	all: all
});

function isElementPresent(ref) {
    var input = ref.input;
    var target = ref.target;

    return index$5(input) || target && index$5(target);
}

var EmbedJS = function EmbedJS(options) {
    var defaultOptions = {
        plugins: [],
        preset: null,
        inlineEmbed: true,
        replaceText: false,
        _embeds: [],
        _services: []
    };
    var input = options.input;
    var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
    var preset = options.preset;
    if (!input) {
        throw new Error('You need to pass input element or string in the options object.');
    }
    var inputString = index$5(input) ? input.innerHTML : input;
    this.options = index$1({}, defaultOptions, options, {
        result: inputString,
        plugins: preset ? plugins.concat(preset) : plugins,
        inputString: inputString
    });
};
EmbedJS.prototype.text = function text () {
    var options = this.resetOptions();
    var transformers = options.plugins.map(function (p) { return p.transform; });
    return index$2(transformers, options);
};
EmbedJS.prototype.resetOptions = function resetOptions () {
    return index$1({}, this.options, {
        _embeds: []
    });
};
EmbedJS.prototype.load = function load () {
        var this$1 = this;

    this.options.plugins.forEach(function (p) { return p.onLoad && p.onLoad(this$1.options); });
};
EmbedJS.prototype.render = function render () {
        var this$1 = this;

    return new Promise(function ($return, $error) {
        var input, target, inlineEmbed, element;
        var options;
        var assign;
            ((assign = this$1.options, input = assign.input, target = assign.target, inlineEmbed = assign.inlineEmbed));
        if (!isElementPresent(this$1.options)) {
            return $error(new Error('You haven\'t passed the input as an element.'));
        }
        if (index$5(input) && input.classList.contains('ejs-applied')) {
            options = this$1.options;
            return $If_1.call(this$1);
        } else {
            return this$1.text().then(function ($await_2) {
                try {
                    options = $await_2;
                    element = target || input;
                    element.innerHTML = inlineEmbed ? options.result : appendEmbedsAtEnd(options);
                    element.classList.add('ejs-applied');
                    return $If_1.call(this$1);
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error);
        }
        function $If_1() {
            this.load();
            return $return(options);
        }
            
    });
};
EmbedJS.prototype.destroy = function destroy () {
    var ref = this.options;
        var inputString = ref.inputString;
        var input = ref.input;
        var target = ref.target;
    if (!isElementPresent(this.options)) {
        throw new Error('You haven\'t passed the input as an element.');
    }
    var element = target || input;
    element.innerHTML = inputString;
    element.classList.remove('ejs-applied');
    return this.options;
};

EmbedJS.plugins = plugins;
EmbedJS.presets = presets;

return EmbedJS;

})));
//# sourceMappingURL=embed.umd.js.map
