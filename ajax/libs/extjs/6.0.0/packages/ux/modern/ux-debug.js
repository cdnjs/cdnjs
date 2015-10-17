/**
 * This is a base class for more advanced "simlets" (simulated servers). A simlet is asked
 * to provide a response given a {@link Ext.ux.ajax.SimXhr} instance.
 */
Ext.define('Ext.ux.ajax.Simlet', function() {
    var urlRegex = /([^?#]*)(#.*)?$/,
        dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/,
        intRegex = /^[+-]?\d+$/,
        floatRegex = /^[+-]?\d+\.\d+$/;
    function parseParamValue(value) {
        var m;
        if (Ext.isDefined(value)) {
            value = decodeURIComponent(value);
            if (intRegex.test(value)) {
                value = parseInt(value, 10);
            } else if (floatRegex.test(value)) {
                value = parseFloat(value);
            } else if (!!(m = dateRegex.test(value))) {
                value = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]));
            }
        }
        return value;
    }
    return {
        alias: 'simlet.basic',
        isSimlet: true,
        responseProps: [
            'responseText',
            'responseXML',
            'status',
            'statusText'
        ],
        /**
         * @cfg {Number} responseText
         */
        /**
         * @cfg {Number} responseXML
         */
        /**
         * @cfg {Object} responseHeaders
         */
        /**
         * @cfg {Number} status
         */
        status: 200,
        /**
         * @cfg {String} statusText
         */
        statusText: 'OK',
        constructor: function(config) {
            Ext.apply(this, config);
        },
        doGet: function(ctx) {
            var me = this,
                ret = {};
            Ext.Array.forEach(me.responseProps, function(prop) {
                if (prop in me) {
                    ret[prop] = me[prop];
                }
            });
            return ret;
        },
        doPost: function(ctx) {
            var me = this,
                ret = {};
            Ext.Array.forEach(me.responseProps, function(prop) {
                if (prop in me) {
                    ret[prop] = me[prop];
                }
            });
            return ret;
        },
        doRedirect: function(ctx) {
            return false;
        },
        /**
         * Performs the action requested by the given XHR and returns an object to be applied
         * on to the XHR (containing `status`, `responseText`, etc.). For the most part,
         * this is delegated to `doMethod` methods on this class, such as `doGet`.
         *
         * @param {Ext.ux.ajax.SimXhr} xhr The simulated XMLHttpRequest instance.
         * @return {Object} The response properties to add to the XMLHttpRequest.
         */
        exec: function(xhr) {
            var me = this,
                ret = {},
                method = 'do' + Ext.String.capitalize(xhr.method.toLowerCase()),
                // doGet
                fn = me[method];
            if (fn) {
                ret = fn.call(me, me.getCtx(xhr.method, xhr.url, xhr));
            } else {
                ret = {
                    status: 405,
                    statusText: 'Method Not Allowed'
                };
            }
            return ret;
        },
        getCtx: function(method, url, xhr) {
            return {
                method: method,
                params: this.parseQueryString(url),
                url: url,
                xhr: xhr
            };
        },
        openRequest: function(method, url, options, async) {
            var ctx = this.getCtx(method, url),
                redirect = this.doRedirect(ctx),
                xhr;
            if (redirect) {
                xhr = redirect;
            } else {
                xhr = new Ext.ux.ajax.SimXhr({
                    mgr: this.manager,
                    simlet: this,
                    options: options
                });
                xhr.open(method, url, async);
            }
            return xhr;
        },
        parseQueryString: function(str) {
            var m = urlRegex.exec(str),
                ret = {},
                key, value, i, n;
            if (m && m[1]) {
                var pair,
                    parts = m[1].split('&');
                for (i = 0 , n = parts.length; i < n; ++i) {
                    if ((pair = parts[i].split('='))[0]) {
                        key = decodeURIComponent(pair.shift());
                        value = parseParamValue((pair.length > 1) ? pair.join('=') : pair[0]);
                        if (!(key in ret)) {
                            ret[key] = value;
                        } else if (Ext.isArray(ret[key])) {
                            ret[key].push(value);
                        } else {
                            ret[key] = [
                                ret[key],
                                value
                            ];
                        }
                    }
                }
            }
            return ret;
        },
        redirect: function(method, url, params) {
            switch (arguments.length) {
                case 2:
                    if (typeof url == 'string') {
                        break;
                    };
                    params = url;
                // fall...
                case 1:
                    url = method;
                    method = 'GET';
                    break;
            }
            if (params) {
                url = Ext.urlAppend(url, Ext.Object.toQueryString(params));
            }
            return this.manager.openRequest(method, url);
        }
    };
}());

/**
 * This base class is used to handle data preparation (e.g., sorting, filtering and
 * group summary).
 */
Ext.define('Ext.ux.ajax.DataSimlet', function() {
    function makeSortFn(def, cmp) {
        var order = def.direction,
            sign = (order && order.toUpperCase() === 'DESC') ? -1 : 1;
        return function(leftRec, rightRec) {
            var lhs = leftRec[def.property],
                rhs = rightRec[def.property],
                c = (lhs < rhs) ? -1 : ((rhs < lhs) ? 1 : 0);
            if (c || !cmp) {
                return c * sign;
            }
            return cmp(leftRec, rightRec);
        };
    }
    function makeSortFns(defs, cmp) {
        for (var sortFn = cmp,
            i = defs && defs.length; i; ) {
            sortFn = makeSortFn(defs[--i], sortFn);
        }
        return sortFn;
    }
    return {
        extend: 'Ext.ux.ajax.Simlet',
        buildNodes: function(node, path) {
            var me = this,
                nodeData = {
                    data: []
                },
                len = node.length,
                children, i, child, name;
            me.nodes[path] = nodeData;
            for (i = 0; i < len; ++i) {
                nodeData.data.push(child = node[i]);
                name = child.text || child.title;
                child.id = path ? path + '/' + name : name;
                children = child.children;
                if (!(child.leaf = !children)) {
                    delete child.children;
                    me.buildNodes(children, child.id);
                }
            }
        },
        fixTree: function(ctx, tree) {
            var me = this,
                node = ctx.params.node,
                nodes;
            if (!(nodes = me.nodes)) {
                me.nodes = nodes = {};
                me.buildNodes(tree, '');
            }
            node = nodes[node];
            if (node) {
                if (me.node) {
                    me.node.sortedData = me.sortedData;
                    me.node.currentOrder = me.currentOrder;
                }
                me.node = node;
                me.data = node.data;
                me.sortedData = node.sortedData;
                me.currentOrder = node.currentOrder;
            } else {
                me.data = null;
            }
        },
        getData: function(ctx) {
            var me = this,
                params = ctx.params,
                order = (params.filter || '') + (params.group || '') + '-' + (params.sort || '') + '-' + (params.dir || ''),
                tree = me.tree,
                dynamicData, data, fields, sortFn;
            if (tree) {
                me.fixTree(ctx, tree);
            }
            data = me.data;
            if (typeof data === 'function') {
                dynamicData = true;
                data = data.call(this, ctx);
            }
            // If order is '--' then it means we had no order passed, due to the string concat above
            if (!data || order === '--') {
                return data || [];
            }
            if (!dynamicData && order == me.currentOrder) {
                return me.sortedData;
            }
            ctx.filterSpec = params.filter && Ext.decode(params.filter);
            ctx.groupSpec = params.group && Ext.decode(params.group);
            fields = params.sort;
            if (params.dir) {
                fields = [
                    {
                        direction: params.dir,
                        property: fields
                    }
                ];
            } else {
                fields = Ext.decode(params.sort);
            }
            if (ctx.filterSpec) {
                var filters = new Ext.util.FilterCollection();
                filters.add(this.processFilters(ctx.filterSpec));
                data = Ext.Array.filter(data, filters.getFilterFn());
            }
            sortFn = makeSortFns((ctx.sortSpec = fields));
            if (ctx.groupSpec) {
                sortFn = makeSortFns([
                    ctx.groupSpec
                ], sortFn);
            }
            // If a straight Ajax request, data may not be an array.
            // If an Array, preserve 'physical' order of raw data...
            data = Ext.isArray(data) ? data.slice(0) : data;
            if (sortFn) {
                Ext.Array.sort(data, sortFn);
            }
            me.sortedData = data;
            me.currentOrder = order;
            return data;
        },
        processFilters: Ext.identityFn,
        getPage: function(ctx, data) {
            var ret = data,
                length = data.length,
                start = ctx.params.start || 0,
                end = ctx.params.limit ? Math.min(length, start + ctx.params.limit) : length;
            if (start || end < length) {
                ret = ret.slice(start, end);
            }
            return ret;
        },
        getGroupSummary: function(groupField, rows, ctx) {
            return rows[0];
        },
        getSummary: function(ctx, data, page) {
            var me = this,
                groupField = ctx.groupSpec.property,
                accum,
                todo = {},
                summary = [],
                fieldValue, lastFieldValue;
            Ext.each(page, function(rec) {
                fieldValue = rec[groupField];
                todo[fieldValue] = true;
            });
            function flush() {
                if (accum) {
                    summary.push(me.getGroupSummary(groupField, accum, ctx));
                    accum = null;
                }
            }
            // data is ordered primarily by the groupField, so one pass can pick up all
            // the summaries one at a time.
            Ext.each(data, function(rec) {
                fieldValue = rec[groupField];
                if (lastFieldValue !== fieldValue) {
                    flush();
                    lastFieldValue = fieldValue;
                }
                if (!todo[fieldValue]) {
                    // if we have even 1 summary, we have summarized all that we need
                    // (again because data and page are ordered by groupField)
                    return !summary.length;
                }
                if (accum) {
                    accum.push(rec);
                } else {
                    accum = [
                        rec
                    ];
                }
                return true;
            });
            flush();
            // make sure that last pesky summary goes...
            return summary;
        }
    };
}());

/**
 * JSON Simlet.
 */
Ext.define('Ext.ux.ajax.JsonSimlet', {
    extend: 'Ext.ux.ajax.DataSimlet',
    alias: 'simlet.json',
    doGet: function(ctx) {
        var me = this,
            data = me.getData(ctx),
            page = me.getPage(ctx, data),
            reader = ctx.xhr.options.proxy && ctx.xhr.options.proxy.getReader(),
            root = reader && reader.getRootProperty(),
            ret = me.callParent(arguments),
            // pick up status/statusText
            response = {};
        if (root && Ext.isArray(page)) {
            response[root] = page;
            response[reader.getTotalProperty()] = data.length;
        } else {
            response = page;
        }
        if (ctx.groupSpec) {
            response.summaryData = me.getSummary(ctx, data, page);
        }
        ret.responseText = Ext.encode(response);
        return ret;
    }
});

/**
 * Simulates an XMLHttpRequest object's methods and properties but is backed by a
 * {@link Ext.ux.ajax.Simlet} instance that provides the data.
 */
Ext.define('Ext.ux.ajax.SimXhr', {
    readyState: 0,
    mgr: null,
    simlet: null,
    constructor: function(config) {
        var me = this;
        Ext.apply(me, config);
        me.requestHeaders = {};
    },
    abort: function() {
        var me = this;
        if (me.timer) {
            clearTimeout(me.timer);
            me.timer = null;
        }
        me.aborted = true;
    },
    getAllResponseHeaders: function() {
        var headers = [];
        if (Ext.isObject(this.responseHeaders)) {
            Ext.Object.each(this.responseHeaders, function(name, value) {
                headers.push(name + ': ' + value);
            });
        }
        return headers.join('\r\n');
    },
    getResponseHeader: function(header) {
        var headers = this.responseHeaders;
        return (headers && headers[header]) || null;
    },
    open: function(method, url, async, user, password) {
        var me = this;
        me.method = method;
        me.url = url;
        me.async = async !== false;
        me.user = user;
        me.password = password;
        me.setReadyState(1);
    },
    overrideMimeType: function(mimeType) {
        this.mimeType = mimeType;
    },
    schedule: function() {
        var me = this,
            delay = me.mgr.delay;
        if (delay) {
            me.timer = setTimeout(function() {
                me.onTick();
            }, delay);
        } else {
            me.onTick();
        }
    },
    send: function(body) {
        var me = this;
        me.body = body;
        if (me.async) {
            me.schedule();
        } else {
            me.onComplete();
        }
    },
    setReadyState: function(state) {
        var me = this;
        if (me.readyState != state) {
            me.readyState = state;
            me.onreadystatechange();
        }
    },
    setRequestHeader: function(header, value) {
        this.requestHeaders[header] = value;
    },
    // handlers
    onreadystatechange: Ext.emptyFn,
    onComplete: function() {
        var me = this,
            callback;
        me.readyState = 4;
        Ext.apply(me, me.simlet.exec(me));
        callback = me.jsonpCallback;
        if (callback) {
            var text = callback + '(' + me.responseText + ')';
            eval(text);
        }
    },
    onTick: function() {
        var me = this;
        me.timer = null;
        me.onComplete();
        me.onreadystatechange && me.onreadystatechange();
    }
});

/**
 * This singleton manages simulated Ajax responses. This allows application logic to be
 * written unaware that its Ajax calls are being handled by simulations ("simlets"). This
 * is currently done by hooking {@link Ext.data.Connection} methods, so all users of that
 * class (and {@link Ext.Ajax} since it is a derived class) qualify for simulation.
 *
 * The requires hooks are inserted when either the {@link #init} method is called or the
 * first {@link Ext.ux.ajax.Simlet} is registered. For example:
 *
 *      Ext.onReady(function () {
 *          initAjaxSim();
 *
 *          // normal stuff
 *      });
 *
 *      function initAjaxSim () {
 *          Ext.ux.ajax.SimManager.init({
 *              delay: 300
 *          }).register({
 *              '/app/data/url': {
 *                  type: 'json',  // use JsonSimlet (type is like xtype for components)
 *                  data: [
 *                      { foo: 42, bar: 'abc' },
 *                      ...
 *                  ]
 *              }
 *          });
 *      }
 *
 * As many URL's as desired can be registered and associated with a {@link Ext.ux.ajax.Simlet}. To make
 * non-simulated Ajax requests once this singleton is initialized, add a `nosim:true` option
 * to the Ajax options:
 *
 *      Ext.Ajax.request({
 *          url: 'page.php',
 *          nosim: true, // ignored by normal Ajax request
 *          params: {
 *              id: 1
 *          },
 *          success: function(response){
 *              var text = response.responseText;
 *              // process server response here
 *          }
 *      });
 */
Ext.define('Ext.ux.ajax.SimManager', {
    singleton: true,
    requires: [
        'Ext.data.Connection',
        'Ext.ux.ajax.SimXhr',
        'Ext.ux.ajax.Simlet',
        'Ext.ux.ajax.JsonSimlet'
    ],
    /**
     * @cfg {Ext.ux.ajax.Simlet} defaultSimlet
     * The {@link Ext.ux.ajax.Simlet} instance to use for non-matching URL's. By default, this will
     * return 404. Set this to null to use real Ajax calls for non-matching URL's.
     */
    /**
     * @cfg {String} defaultType
     * The default `type` to apply to generic {@link Ext.ux.ajax.Simlet} configuration objects. The
     * default is 'basic'.
     */
    defaultType: 'basic',
    /**
     * @cfg {Number} delay
     * The number of milliseconds to delay before delivering a response to an async request.
     */
    delay: 150,
    /**
     * @property {Boolean} ready
     * True once this singleton has initialized and applied its Ajax hooks.
     * @private
     */
    ready: false,
    constructor: function() {
        this.simlets = [];
    },
    getSimlet: function(url) {
        // Strip down to base URL (no query parameters or hash):
        var me = this,
            index = url.indexOf('?'),
            simlets = me.simlets,
            len = simlets.length,
            i, simlet, simUrl, match;
        if (index < 0) {
            index = url.indexOf('#');
        }
        if (index > 0) {
            url = url.substring(0, index);
        }
        for (i = 0; i < len; ++i) {
            simlet = simlets[i];
            simUrl = simlet.url;
            if (simUrl instanceof RegExp) {
                match = simUrl.test(url);
            } else {
                match = simUrl === url;
            }
            if (match) {
                return simlet;
            }
        }
        return me.defaultSimlet;
    },
    getXhr: function(method, url, options, async) {
        var simlet = this.getSimlet(url);
        if (simlet) {
            return simlet.openRequest(method, url, options, async);
        }
        return null;
    },
    /**
     * Initializes this singleton and applies configuration options.
     * @param {Object} config An optional object with configuration properties to apply.
     * @return {Ext.ux.ajax.SimManager} this
     */
    init: function(config) {
        var me = this;
        Ext.apply(me, config);
        if (!me.ready) {
            me.ready = true;
            if (!('defaultSimlet' in me)) {
                me.defaultSimlet = new Ext.ux.ajax.Simlet({
                    status: 404,
                    statusText: 'Not Found'
                });
            }
            me._openRequest = Ext.data.Connection.prototype.openRequest;
            Ext.data.request.Ajax.override({
                openRequest: function(options, requestOptions, async) {
                    var xhr = !options.nosim && me.getXhr(requestOptions.method, requestOptions.url, options, async);
                    if (!xhr) {
                        xhr = this.callParent(arguments);
                    }
                    return xhr;
                }
            });
            if (Ext.data.JsonP) {
                Ext.data.JsonP.self.override({
                    createScript: function(url, params, options) {
                        var fullUrl = Ext.urlAppend(url, Ext.Object.toQueryString(params)),
                            script = !options.nosim && me.getXhr('GET', fullUrl, options, true);
                        if (!script) {
                            script = this.callParent(arguments);
                        }
                        return script;
                    },
                    loadScript: function(request) {
                        var script = request.script;
                        if (script.simlet) {
                            script.jsonpCallback = request.params[request.callbackKey];
                            script.send(null);
                            // Ext.data.JsonP will attempt dom removal of a script tag, so emulate its presence
                            request.script = document.createElement('script');
                        } else {
                            this.callParent(arguments);
                        }
                    }
                });
            }
        }
        return me;
    },
    openRequest: function(method, url, async) {
        var opt = {
                method: method,
                url: url
            };
        return this._openRequest.call(Ext.data.Connection.prototype, {}, opt, async);
    },
    /**
     * Registeres one or more {@link Ext.ux.ajax.Simlet} instances.
     * @param {Array/Object} simlet Either a {@link Ext.ux.ajax.Simlet} instance or config, an Array
     * of such elements or an Object keyed by URL with values that are {@link Ext.ux.ajax.Simlet}
     * instances or configs.
     */
    register: function(simlet) {
        var me = this;
        me.init();
        function reg(one) {
            var simlet = one;
            if (!simlet.isSimlet) {
                simlet = Ext.create('simlet.' + (simlet.type || simlet.stype || me.defaultType), one);
            }
            me.simlets.push(simlet);
            simlet.manager = me;
        }
        if (Ext.isArray(simlet)) {
            Ext.each(simlet, reg);
        } else if (simlet.isSimlet || simlet.url) {
            reg(simlet);
        } else {
            Ext.Object.each(simlet, function(url, s) {
                s.url = url;
                reg(s);
            });
        }
        return me;
    }
});

/**
 * This class simulates XML-based requests.
 */
Ext.define('Ext.ux.ajax.XmlSimlet', {
    extend: 'Ext.ux.ajax.DataSimlet',
    alias: 'simlet.xml',
    /**
     * This template is used to populate the XML response. The configuration of the Reader
     * is available so that its `root` and `record` properties can be used as well as the
     * `fields` of the associated `model`. But beyond that, the way these pieces are put
     * together in the document requires the flexibility of a template.
     */
    xmlTpl: [
        '<{root}>\n',
        '<tpl for="data">',
        '    <{parent.record}>\n',
        '<tpl for="parent.fields">',
        '        <{name}>{[parent[values.name]]}</{name}>\n',
        '</tpl>',
        '    </{parent.record}>\n',
        '</tpl>',
        '</{root}>'
    ],
    doGet: function(ctx) {
        var me = this,
            data = me.getData(ctx),
            page = me.getPage(ctx, data),
            proxy = ctx.xhr.options.operation.getProxy(),
            reader = proxy && proxy.getReader(),
            model = reader && reader.getModel(),
            ret = me.callParent(arguments),
            // pick up status/statusText
            response = {
                data: page,
                reader: reader,
                fields: model && model.fields,
                root: reader && reader.getRootProperty(),
                record: reader && reader.record
            },
            tpl, xml, doc;
        if (ctx.groupSpec) {
            response.summaryData = me.getSummary(ctx, data, page);
        }
        // If a straight Ajax request there won't be an xmlTpl.
        if (me.xmlTpl) {
            tpl = Ext.XTemplate.getTpl(me, 'xmlTpl');
            xml = tpl.apply(response);
        } else {
            xml = data;
        }
        if (typeof DOMParser != 'undefined') {
            doc = (new DOMParser()).parseFromString(xml, "text/xml");
        } else {
            // IE doesn't have DOMParser, but fortunately, there is an ActiveX for XML
            doc = new ActiveXObject("Microsoft.XMLDOM");
            doc.async = false;
            doc.loadXML(xml);
        }
        ret.responseText = xml;
        ret.responseXML = doc;
        return ret;
    },
    fixTree: function() {
        this.callParent(arguments);
        var buffer = [];
        this.buildTreeXml(this.data, buffer);
        this.data = buffer.join('');
    },
    buildTreeXml: function(nodes, buffer) {
        var rootProperty = this.rootProperty,
            recordProperty = this.recordProperty;
        buffer.push('<', rootProperty, '>');
        Ext.Array.forEach(nodes, function(node) {
            buffer.push('<', recordProperty, '>');
            for (var key in node) {
                if (key == 'children') {
                    this.buildTreeXml(node.children, buffer);
                } else {
                    buffer.push('<', key, '>', node[key], '</', key, '>');
                }
            }
            buffer.push('</', recordProperty, '>');
        });
        buffer.push('</', rootProperty, '>');
    }
});

/**
 * This is the base class for {@link Ext.ux.event.Recorder} and {@link Ext.ux.event.Player}.
 */
Ext.define('Ext.ux.event.Driver', {
    extend: 'Ext.util.Observable',
    active: null,
    specialKeysByName: {
        PGUP: 33,
        PGDN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    },
    specialKeysByCode: {},
    /**
     * @event start
     * Fires when this object is started.
     * @param {Ext.ux.event.Driver} this
     */
    /**
     * @event stop
     * Fires when this object is stopped.
     * @param {Ext.ux.event.Driver} this
     */
    getTextSelection: function(el) {
        // See https://code.google.com/p/rangyinputs/source/browse/trunk/rangyinputs_jquery.js
        var doc = el.ownerDocument,
            range, range2, start, end;
        if (typeof el.selectionStart === "number") {
            start = el.selectionStart;
            end = el.selectionEnd;
        } else if (doc.selection) {
            range = doc.selection.createRange();
            range2 = el.createTextRange();
            range2.setEndPoint('EndToStart', range);
            start = range2.text.length;
            end = start + range.text.length;
        }
        return [
            start,
            end
        ];
    },
    getTime: function() {
        return new Date().getTime();
    },
    /**
     * Returns the number of milliseconds since start was called.
     */
    getTimestamp: function() {
        var d = this.getTime();
        return d - this.startTime;
    },
    onStart: function() {},
    onStop: function() {},
    /**
     * Starts this object. If this object is already started, nothing happens.
     */
    start: function() {
        var me = this;
        if (!me.active) {
            me.active = new Date();
            me.startTime = me.getTime();
            me.onStart();
            me.fireEvent('start', me);
        }
    },
    /**
     * Stops this object. If this object is not started, nothing happens.
     */
    stop: function() {
        var me = this;
        if (me.active) {
            me.active = null;
            me.onStop();
            me.fireEvent('stop', me);
        }
    }
}, function() {
    var proto = this.prototype;
    Ext.Object.each(proto.specialKeysByName, function(name, value) {
        proto.specialKeysByCode[value] = name;
    });
});

/**
 * Event maker.
 */
Ext.define('Ext.ux.event.Maker', {
    eventQueue: [],
    startAfter: 500,
    timerIncrement: 500,
    currentTiming: 0,
    constructor: function(config) {
        var me = this;
        me.currentTiming = me.startAfter;
        if (!Ext.isArray(config)) {
            config = [
                config
            ];
        }
        Ext.Array.each(config, function(item) {
            item.el = item.el || 'el';
            Ext.Array.each(Ext.ComponentQuery.query(item.cmpQuery), function(cmp) {
                var event = {},
                    x, y, el;
                if (!item.domQuery) {
                    el = cmp[item.el];
                } else {
                    el = cmp.el.down(item.domQuery);
                }
                event.target = '#' + el.dom.id;
                event.type = item.type;
                event.button = config.button || 0;
                x = el.getX() + (el.getWidth() / 2);
                y = el.getY() + (el.getHeight() / 2);
                event.xy = [
                    x,
                    y
                ];
                event.ts = me.currentTiming;
                me.currentTiming += me.timerIncrement;
                me.eventQueue.push(event);
            });
            if (item.screenshot) {
                me.eventQueue[me.eventQueue.length - 1].screenshot = true;
            }
        });
        return me.eventQueue;
    }
});

/**
 * @extends Ext.ux.event.Driver
 * This class manages the playback of an array of "event descriptors". For details on the
 * contents of an "event descriptor", see {@link Ext.ux.event.Recorder}. The events recorded by the
 * {@link Ext.ux.event.Recorder} class are designed to serve as input for this class.
 * 
 * The simplest use of this class is to instantiate it with an {@link #eventQueue} and call
 * {@link #method-start}. Like so:
 *
 *      var player = Ext.create('Ext.ux.event.Player', {
 *          eventQueue: [ ... ],
 *          speed: 2,  // play at 2x speed
 *          listeners: {
 *              stop: function () {
 *                  player = null; // all done
 *              }
 *          }
 *      });
 *
 *      player.start();
 *
 * A more complex use would be to incorporate keyframe generation after playing certain
 * events.
 *
 *      var player = Ext.create('Ext.ux.event.Player', {
 *          eventQueue: [ ... ],
 *          keyFrameEvents: {
 *              click: true
 *          },
 *          listeners: {
 *              stop: function () {
 *                  // play has completed... probably time for another keyframe...
 *                  player = null;
 *              },
 *              keyframe: onKeyFrame
 *          }
 *      });
 *
 *      player.start();
 *
 * If a keyframe can be handled immediately (synchronously), the listener would be:
 *
 *      function onKeyFrame () {
 *          handleKeyFrame();
 *      }
 *
 *  If the keyframe event is always handled asynchronously, then the event listener is only
 *  a bit more:
 *
 *      function onKeyFrame (p, eventDescriptor) {
 *          eventDescriptor.defer(); // pause event playback...
 *
 *          handleKeyFrame(function () {
 *              eventDescriptor.finish(); // ...resume event playback
 *          });
 *      }
 *
 * Finally, if the keyframe could be either handled synchronously or asynchronously (perhaps
 * differently by browser), a slightly more complex listener is required.
 *
 *      function onKeyFrame (p, eventDescriptor) {
 *          var async;
 *
 *          handleKeyFrame(function () {
 *              // either this callback is being called immediately by handleKeyFrame (in
 *              // which case async is undefined) or it is being called later (in which case
 *              // async will be true).
 *
 *              if (async) {
 *                  eventDescriptor.finish();
 *              } else {
 *                  async = false;
 *              }
 *          });
 *
 *          // either the callback was called (and async is now false) or it was not
 *          // called (and async remains undefined).
 *
 *          if (async !== false) {
 *              eventDescriptor.defer();
 *              async = true; // let the callback know that we have gone async
 *          }
 *      }
 */
Ext.define('Ext.ux.event.Player', function(Player) {
    var defaults = {},
        mouseEvents = {},
        keyEvents = {},
        doc,
        //HTML events supported
        uiEvents = {},
        //events that bubble by default
        bubbleEvents = {
            //scroll:     1,
            resize: 1,
            reset: 1,
            submit: 1,
            change: 1,
            select: 1,
            error: 1,
            abort: 1
        };
    Ext.each([
        'click',
        'dblclick',
        'mouseover',
        'mouseout',
        'mousedown',
        'mouseup',
        'mousemove'
    ], function(type) {
        bubbleEvents[type] = defaults[type] = mouseEvents[type] = {
            bubbles: true,
            cancelable: (type != "mousemove"),
            // mousemove cannot be cancelled
            detail: 1,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0
        };
    });
    Ext.each([
        'keydown',
        'keyup',
        'keypress'
    ], function(type) {
        bubbleEvents[type] = defaults[type] = keyEvents[type] = {
            bubbles: true,
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: 0,
            charCode: 0
        };
    });
    Ext.each([
        'blur',
        'change',
        'focus',
        'resize',
        'scroll',
        'select'
    ], function(type) {
        defaults[type] = uiEvents[type] = {
            bubbles: (type in bubbleEvents),
            cancelable: false,
            detail: 1
        };
    });
    var inputSpecialKeys = {
            8: function(target, start, end) {
                // backspace: 8,
                if (start < end) {
                    target.value = target.value.substring(0, start) + target.value.substring(end);
                } else if (start > 0) {
                    target.value = target.value.substring(0, --start) + target.value.substring(end);
                }
                this.setTextSelection(target, start, start);
            },
            46: function(target, start, end) {
                // delete: 46
                if (start < end) {
                    target.value = target.value.substring(0, start) + target.value.substring(end);
                } else if (start < target.value.length - 1) {
                    target.value = target.value.substring(0, start) + target.value.substring(start + 1);
                }
                this.setTextSelection(target, start, start);
            }
        };
    return {
        extend: 'Ext.ux.event.Driver',
        /**
     * @cfg {Array} eventQueue The event queue to playback. This must be provided before
     * the {@link #method-start} method is called.
     */
        /**
     * @cfg {Object} keyFrameEvents An object that describes the events that should generate
     * keyframe events. For example, `{ click: true }` would generate keyframe events after
     * each `click` event.
     */
        keyFrameEvents: {
            click: true
        },
        /**
     * @cfg {Boolean} pauseForAnimations True to pause event playback during animations, false
     * to ignore animations. Default is true.
     */
        pauseForAnimations: true,
        /**
     * @cfg {Number} speed The playback speed multiplier. Default is 1.0 (to playback at the
     * recorded speed). A value of 2 would playback at 2x speed.
     */
        speed: 1,
        stallTime: 0,
        _inputSpecialKeys: {
            INPUT: inputSpecialKeys,
            TEXTAREA: Ext.apply({}, //13: function (target, start, end) { // enter: 8,
            //TODO ?
            //}
            inputSpecialKeys)
        },
        tagPathRegEx: /(\w+)(?:\[(\d+)\])?/,
        /**
     * @event beforeplay
     * Fires before an event is played.
     * @param {Ext.ux.event.Player} this
     * @param {Object} eventDescriptor The event descriptor about to be played.
     */
        /**
     * @event keyframe
     * Fires when this player reaches a keyframe. Typically, this is after events
     * like `click` are injected and any resulting animations have been completed.
     * @param {Ext.ux.event.Player} this
     * @param {Object} eventDescriptor The keyframe event descriptor.
     */
        constructor: function(config) {
            var me = this;
            me.callParent(arguments);
            me.timerFn = function() {
                me.onTick();
            };
            me.attachTo = me.attachTo || window;
            doc = me.attachTo.document;
        },
        /**
     * Returns the element given is XPath-like description.
     * @param {String} xpath The XPath-like description of the element.
     * @return {HTMLElement}
     */
        getElementFromXPath: function(xpath) {
            var me = this,
                parts = xpath.split('/'),
                regex = me.tagPathRegEx,
                i, n, m, count, tag, child,
                el = me.attachTo.document;
            el = (parts[0] == '~') ? el.body : el.getElementById(parts[0].substring(1));
            // remove '#'
            for (i = 1 , n = parts.length; el && i < n; ++i) {
                m = regex.exec(parts[i]);
                count = m[2] ? parseInt(m[2], 10) : 1;
                tag = m[1].toUpperCase();
                for (child = el.firstChild; child; child = child.nextSibling) {
                    if (child.tagName == tag) {
                        if (count == 1) {
                            break;
                        }
                        --count;
                    }
                }
                el = child;
            }
            return el;
        },
        // Moving across a line break only counts as moving one character in a TextRange, whereas a line break in
        // the textarea value is two characters. This function corrects for that by converting a text offset into a
        // range character offset by subtracting one character for every line break in the textarea prior to the
        // offset
        offsetToRangeCharacterMove: function(el, offset) {
            return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
        },
        setTextSelection: function(el, startOffset, endOffset) {
            // See https://code.google.com/p/rangyinputs/source/browse/trunk/rangyinputs_jquery.js
            if (startOffset < 0) {
                startOffset += el.value.length;
            }
            if (endOffset == null) {
                endOffset = startOffset;
            }
            if (endOffset < 0) {
                endOffset += el.value.length;
            }
            if (typeof el.selectionStart === "number") {
                el.selectionStart = startOffset;
                el.selectionEnd = endOffset;
            } else {
                var range = el.createTextRange();
                var startCharMove = this.offsetToRangeCharacterMove(el, startOffset);
                range.collapse(true);
                if (startOffset == endOffset) {
                    range.move("character", startCharMove);
                } else {
                    range.moveEnd("character", this.offsetToRangeCharacterMove(el, endOffset));
                    range.moveStart("character", startCharMove);
                }
                range.select();
            }
        },
        getTimeIndex: function() {
            var t = this.getTimestamp() - this.stallTime;
            return t * this.speed;
        },
        makeToken: function(eventDescriptor, signal) {
            var me = this,
                t0;
            eventDescriptor[signal] = true;
            eventDescriptor.defer = function() {
                eventDescriptor[signal] = false;
                t0 = me.getTime();
            };
            eventDescriptor.finish = function() {
                eventDescriptor[signal] = true;
                me.stallTime += me.getTime() - t0;
                me.schedule();
            };
        },
        /**
     * This method is called after an event has been played to prepare for the next event.
     * @param {Object} eventDescriptor The descriptor of the event just played.
     */
        nextEvent: function(eventDescriptor) {
            var me = this,
                index = ++me.queueIndex;
            // keyframe events are inserted after a keyFrameEvent is played.
            if (me.keyFrameEvents[eventDescriptor.type]) {
                Ext.Array.insert(me.eventQueue, index, [
                    {
                        keyframe: true,
                        ts: eventDescriptor.ts
                    }
                ]);
            }
        },
        /**
     * This method returns the event descriptor at the front of the queue. This does not
     * dequeue the event. Repeated calls return the same object (until {@link #nextEvent}
     * is called).
     */
        peekEvent: function() {
            return this.eventQueue[this.queueIndex] || null;
        },
        /**
     * Replaces an event in the queue with an array of events. This is often used to roll
     * up a multi-step pseudo-event and expand it just-in-time to be played. The process
     * for doing this in a derived class would be this:
     * 
     *      Ext.define('My.Player', {
     *          extend: 'Ext.ux.event.Player',
     *
     *          peekEvent: function () {
     *              var event = this.callParent();
     *
     *              if (event.multiStepSpecial) {
     *                  this.replaceEvent(null, [
     *                      ... expand to actual events
     *                  ]);
     *
     *                  event = this.callParent(); // get the new next event
     *              }
     *
     *              return event;
     *          }
     *      });
     * 
     * This method ensures that the `beforeplay` hook (if any) from the replaced event is
     * placed on the first new event and the `afterplay` hook (if any) is placed on the
     * last new event.
     * 
     * @param {Number} index The queue index to replace. Pass `null` to replace the event
     * at the current `queueIndex`.
     * @param {Event[]} events The array of events with which to replace the specified
     * event.
     */
        replaceEvent: function(index, events) {
            for (var t,
                i = 0,
                n = events.length; i < n; ++i) {
                if (i) {
                    t = events[i - 1];
                    delete t.afterplay;
                    delete t.screenshot;
                    delete events[i].beforeplay;
                }
            }
            Ext.Array.replace(this.eventQueue, (index == null) ? this.queueIndex : index, 1, events);
        },
        /**
     * This method dequeues and injects events until it has arrived at the time index. If
     * no events are ready (based on the time index), this method does nothing.
     * @return {Boolean} True if there is more to do; false if not (at least for now).
     */
        processEvents: function() {
            var me = this,
                animations = me.pauseForAnimations && me.attachTo.Ext.fx.Manager.items,
                eventDescriptor;
            while ((eventDescriptor = me.peekEvent()) !== null) {
                if (animations && animations.getCount()) {
                    return true;
                }
                if (eventDescriptor.keyframe) {
                    if (!me.processKeyFrame(eventDescriptor)) {
                        return false;
                    }
                    me.nextEvent(eventDescriptor);
                } else if (eventDescriptor.ts <= me.getTimeIndex() && me.fireEvent('beforeplay', me, eventDescriptor) !== false && me.playEvent(eventDescriptor)) {
                    me.nextEvent(eventDescriptor);
                } else {
                    return true;
                }
            }
            me.stop();
            return false;
        },
        /**
     * This method is called when a keyframe is reached. This will fire the keyframe event.
     * If the keyframe has been handled, true is returned. Otherwise, false is returned.
     * @param {Object} eventDescriptor The event descriptor of the keyframe.
     * @return {Boolean} True if the keyframe was handled, false if not.
     */
        processKeyFrame: function(eventDescriptor) {
            var me = this;
            // only fire keyframe event (and setup the eventDescriptor) once...
            if (!eventDescriptor.defer) {
                me.makeToken(eventDescriptor, 'done');
                me.fireEvent('keyframe', me, eventDescriptor);
            }
            return eventDescriptor.done;
        },
        /**
     * Called to inject the given event on the specified target.
     * @param {HTMLElement} target The target of the event.
     * @param {Object} event The event to inject. The properties of this object should be
     * those of standard DOM events but vary based on the `type` property. For details on
     * event types and their properties, see the class documentation.
     */
        injectEvent: function(target, event) {
            var me = this,
                type = event.type,
                options = Ext.apply({}, event, defaults[type]),
                handler;
            if (type === 'type') {
                handler = me._inputSpecialKeys[target.tagName];
                if (handler) {
                    return me.injectTypeInputEvent(target, event, handler);
                }
                return me.injectTypeEvent(target, event);
            }
            if (type === 'focus' && target.focus) {
                target.focus();
                return true;
            }
            if (type === 'blur' && target.blur) {
                target.blur();
                return true;
            }
            if (type === 'scroll') {
                target.scrollLeft = event.pos[0];
                target.scrollTop = event.pos[1];
                return true;
            }
            if (type === 'mduclick') {
                return me.injectEvent(target, Ext.applyIf({
                    type: 'mousedown'
                }, event)) && me.injectEvent(target, Ext.applyIf({
                    type: 'mouseup'
                }, event)) && me.injectEvent(target, Ext.applyIf({
                    type: 'click'
                }, event));
            }
            if (mouseEvents[type]) {
                return Player.injectMouseEvent(target, options, me.attachTo);
            }
            if (keyEvents[type]) {
                return Player.injectKeyEvent(target, options, me.attachTo);
            }
            if (uiEvents[type]) {
                return Player.injectUIEvent(target, type, options.bubbles, options.cancelable, options.view || me.attachTo, options.detail);
            }
            return false;
        },
        injectTypeEvent: function(target, event) {
            var me = this,
                text = event.text,
                xlat = [],
                ch, chUp, i, n, sel, upper, isInput;
            if (text) {
                delete event.text;
                upper = text.toUpperCase();
                for (i = 0 , n = text.length; i < n; ++i) {
                    ch = text.charCodeAt(i);
                    chUp = upper.charCodeAt(i);
                    xlat.push(Ext.applyIf({
                        type: 'keydown',
                        charCode: chUp,
                        keyCode: chUp
                    }, event), Ext.applyIf({
                        type: 'keypress',
                        charCode: ch,
                        keyCode: ch
                    }, event), Ext.applyIf({
                        type: 'keyup',
                        charCode: chUp,
                        keyCode: chUp
                    }, event));
                }
            } else {
                xlat.push(Ext.applyIf({
                    type: 'keydown',
                    charCode: event.keyCode
                }, event), Ext.applyIf({
                    type: 'keyup',
                    charCode: event.keyCode
                }, event));
            }
            for (i = 0 , n = xlat.length; i < n; ++i) {
                me.injectEvent(target, xlat[i]);
            }
            return true;
        },
        injectTypeInputEvent: function(target, event, handler) {
            var me = this,
                text = event.text,
                sel, n;
            if (handler) {
                sel = me.getTextSelection(target);
                if (text) {
                    n = sel[0];
                    target.value = target.value.substring(0, n) + text + target.value.substring(sel[1]);
                    n += text.length;
                    me.setTextSelection(target, n, n);
                } else {
                    if (!(handler = handler[event.keyCode])) {
                        // no handler for the special key for this element
                        if ('caret' in event) {
                            me.setTextSelection(target, event.caret, event.caret);
                        } else if (event.selection) {
                            me.setTextSelection(target, event.selection[0], event.selection[1]);
                        }
                        return me.injectTypeEvent(target, event);
                    }
                    handler.call(this, target, sel[0], sel[1]);
                    return true;
                }
            }
            return true;
        },
        playEvent: function(eventDescriptor) {
            var me = this,
                target = me.getElementFromXPath(eventDescriptor.target),
                event;
            if (!target) {
                // not present (yet)... wait for element present...
                // TODO - need a timeout here
                return false;
            }
            if (!me.playEventHook(eventDescriptor, 'beforeplay')) {
                return false;
            }
            if (!eventDescriptor.injected) {
                eventDescriptor.injected = true;
                event = me.translateEvent(eventDescriptor, target);
                me.injectEvent(target, event);
            }
            return me.playEventHook(eventDescriptor, 'afterplay');
        },
        playEventHook: function(eventDescriptor, hookName) {
            var me = this,
                doneName = hookName + '.done',
                firedName = hookName + '.fired',
                hook = eventDescriptor[hookName];
            if (hook && !eventDescriptor[doneName]) {
                if (!eventDescriptor[firedName]) {
                    eventDescriptor[firedName] = true;
                    me.makeToken(eventDescriptor, doneName);
                    if (me.eventScope && Ext.isString(hook)) {
                        hook = me.eventScope[hook];
                    }
                    if (hook) {
                        hook.call(me.eventScope || me, eventDescriptor);
                    }
                }
                return false;
            }
            return true;
        },
        schedule: function() {
            var me = this;
            if (!me.timer) {
                me.timer = setTimeout(me.timerFn, 10);
            }
        },
        _translateAcross: [
            'type',
            'button',
            'charCode',
            'keyCode',
            'caret',
            'pos',
            'text',
            'selection'
        ],
        translateEvent: function(eventDescriptor, target) {
            var me = this,
                event = {},
                modKeys = eventDescriptor.modKeys || '',
                names = me._translateAcross,
                i = names.length,
                name, xy;
            while (i--) {
                name = names[i];
                if (name in eventDescriptor) {
                    event[name] = eventDescriptor[name];
                }
            }
            event.altKey = modKeys.indexOf('A') > 0;
            event.ctrlKey = modKeys.indexOf('C') > 0;
            event.metaKey = modKeys.indexOf('M') > 0;
            event.shiftKey = modKeys.indexOf('S') > 0;
            if (target && 'x' in eventDescriptor) {
                xy = Ext.fly(target).getXY();
                xy[0] += eventDescriptor.x;
                xy[1] += eventDescriptor.y;
            } else if ('x' in eventDescriptor) {
                xy = [
                    eventDescriptor.x,
                    eventDescriptor.y
                ];
            } else if ('px' in eventDescriptor) {
                xy = [
                    eventDescriptor.px,
                    eventDescriptor.py
                ];
            }
            if (xy) {
                event.clientX = event.screenX = xy[0];
                event.clientY = event.screenY = xy[1];
            }
            if (eventDescriptor.key) {
                event.keyCode = me.specialKeysByName[eventDescriptor.key];
            }
            if (eventDescriptor.type === 'wheel') {
                if ('onwheel' in me.attachTo.document) {
                    event.wheelX = eventDescriptor.dx;
                    event.wheelY = eventDescriptor.dy;
                } else {
                    event.type = 'mousewheel';
                    event.wheelDeltaX = -40 * eventDescriptor.dx;
                    event.wheelDeltaY = event.wheelDelta = -40 * eventDescriptor.dy;
                }
            }
            return event;
        },
        //---------------------------------
        // Driver overrides
        onStart: function() {
            var me = this;
            me.queueIndex = 0;
            me.schedule();
        },
        onStop: function() {
            var me = this;
            if (me.timer) {
                clearTimeout(me.timer);
                me.timer = null;
            }
        },
        //---------------------------------
        onTick: function() {
            var me = this;
            me.timer = null;
            if (me.processEvents()) {
                me.schedule();
            }
        },
        statics: {
            ieButtonCodeMap: {
                0: 1,
                1: 4,
                2: 2
            },
            /*
         * Injects a key event using the given event information to populate the event
         * object.
         * 
         * **Note:** `keydown` causes Safari 2.x to crash.
         * 
         * @param {HTMLElement} target The target of the given event.
         * @param {Object} options Object object containing all of the event injection
         * options.
         * @param {String} options.type The type of event to fire. This can be any one of
         * the following: `keyup`, `keydown` and `keypress`.
         * @param {Boolean} [options.bubbles=true] `tru` if the event can be bubbled up.
         * DOM Level 3 specifies that all key events bubble by default.
         * @param {Boolean} [options.cancelable=true] `true` if the event can be canceled
         * using `preventDefault`. DOM Level 3 specifies that all key events can be
         * cancelled.
         * @param {Boolean} [options.ctrlKey=false] `true` if one of the CTRL keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.altKey=false] `true` if one of the ALT keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.shiftKey=false] `true` if one of the SHIFT keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.metaKey=false] `true` if one of the META keys is
         * pressed while the event is firing.
         * @param {int} [options.keyCode=0] The code for the key that is in use.
         * @param {int} [options.charCode=0] The Unicode code for the character associated
         * with the key being used.
         * @param {Window} [view=window] The view containing the target. This is typically
         * the window object.
         * @private
         */
            injectKeyEvent: function(target, options, view) {
                var type = options.type,
                    customEvent = null;
                if (type === 'textevent') {
                    type = 'keypress';
                }
                view = view || window;
                //check for DOM-compliant browsers first
                if (doc.createEvent) {
                    try {
                        customEvent = doc.createEvent("KeyEvents");
                        // Interesting problem: Firefox implemented a non-standard
                        // version of initKeyEvent() based on DOM Level 2 specs.
                        // Key event was removed from DOM Level 2 and re-introduced
                        // in DOM Level 3 with a different interface. Firefox is the
                        // only browser with any implementation of Key Events, so for
                        // now, assume it's Firefox if the above line doesn't error.
                        // @TODO: Decipher between Firefox's implementation and a correct one.
                        customEvent.initKeyEvent(type, options.bubbles, options.cancelable, view, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.keyCode, options.charCode);
                    } catch (ex) {
                        // If it got here, that means key events aren't officially supported. 
                        // Safari/WebKit is a real problem now. WebKit 522 won't let you
                        // set keyCode, charCode, or other properties if you use a
                        // UIEvent, so we first must try to create a generic event. The
                        // fun part is that this will throw an error on Safari 2.x. The
                        // end result is that we need another try...catch statement just to
                        // deal with this mess.
                        try {
                            //try to create generic event - will fail in Safari 2.x
                            customEvent = doc.createEvent("Events");
                        } catch (uierror) {
                            //the above failed, so create a UIEvent for Safari 2.x
                            customEvent = doc.createEvent("UIEvents");
                        } finally {
                            customEvent.initEvent(type, options.bubbles, options.cancelable);
                            customEvent.view = view;
                            customEvent.altKey = options.altKey;
                            customEvent.ctrlKey = options.ctrlKey;
                            customEvent.shiftKey = options.shiftKey;
                            customEvent.metaKey = options.metaKey;
                            customEvent.keyCode = options.keyCode;
                            customEvent.charCode = options.charCode;
                        }
                    }
                    target.dispatchEvent(customEvent);
                } else if (doc.createEventObject) {
                    //IE
                    customEvent = doc.createEventObject();
                    customEvent.bubbles = options.bubbles;
                    customEvent.cancelable = options.cancelable;
                    customEvent.view = view;
                    customEvent.ctrlKey = options.ctrlKey;
                    customEvent.altKey = options.altKey;
                    customEvent.shiftKey = options.shiftKey;
                    customEvent.metaKey = options.metaKey;
                    // IE doesn't support charCode explicitly. CharCode should
                    // take precedence over any keyCode value for accurate
                    // representation.
                    customEvent.keyCode = (options.charCode > 0) ? options.charCode : options.keyCode;
                    target.fireEvent("on" + type, customEvent);
                } else {
                    return false;
                }
                return true;
            },
            /*
         * Injects a mouse event using the given event information to populate the event
         * object.
         *
         * @param {HTMLElement} target The target of the given event.
         * @param {Object} options Object object containing all of the event injection
         * options.
         * @param {String} options.type The type of event to fire. This can be any one of
         * the following: `click`, `dblclick`, `mousedown`, `mouseup`, `mouseout`,
         * `mouseover` and `mousemove`.
         * @param {Boolean} [options.bubbles=true] `tru` if the event can be bubbled up.
         * DOM Level 2 specifies that all mouse events bubble by default.
         * @param {Boolean} [options.cancelable=true] `true` if the event can be canceled
         * using `preventDefault`. DOM Level 2 specifies that all mouse events except
         * `mousemove` can be cancelled. This defaults to `false` for `mousemove`.
         * @param {Boolean} [options.ctrlKey=false] `true` if one of the CTRL keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.altKey=false] `true` if one of the ALT keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.shiftKey=false] `true` if one of the SHIFT keys is
         * pressed while the event is firing.
         * @param {Boolean} [options.metaKey=false] `true` if one of the META keys is
         * pressed while the event is firing.
         * @param {int} [options.detail=1] The number of times the mouse button has been
         * used.
         * @param {int} [options.screenX=0] The x-coordinate on the screen at which point
         * the event occurred.
         * @param {int} [options.screenY=0] The y-coordinate on the screen at which point
         * the event occurred.
         * @param {int} [options.clientX=0] The x-coordinate on the client at which point
         * the event occurred.
         * @param {int} [options.clientY=0] The y-coordinate on the client at which point
         * the event occurred.
         * @param {int} [options.button=0] The button being pressed while the event is
         * executing. The value should be 0 for the primary mouse button (typically the
         * left button), 1 for the tertiary mouse button (typically the middle button),
         * and 2 for the secondary mouse button (typically the right button).
         * @param {HTMLElement} [options.relatedTarget=null] For `mouseout` events, this
         * is the element that the mouse has moved to. For `mouseover` events, this is
         * the element that the mouse has moved from. This argument is ignored for all
         * other events.
         * @param {Window} [view=window] The view containing the target. This is typically
         * the window object.
         * @private
         */
            injectMouseEvent: function(target, options, view) {
                var type = options.type,
                    customEvent = null;
                view = view || window;
                //check for DOM-compliant browsers first
                if (doc.createEvent) {
                    customEvent = doc.createEvent("MouseEvents");
                    //Safari 2.x (WebKit 418) still doesn't implement initMouseEvent()
                    if (customEvent.initMouseEvent) {
                        customEvent.initMouseEvent(type, options.bubbles, options.cancelable, view, options.detail, options.screenX, options.screenY, options.clientX, options.clientY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, options.relatedTarget);
                    } else {
                        //Safari
                        //the closest thing available in Safari 2.x is UIEvents
                        customEvent = doc.createEvent("UIEvents");
                        customEvent.initEvent(type, options.bubbles, options.cancelable);
                        customEvent.view = view;
                        customEvent.detail = options.detail;
                        customEvent.screenX = options.screenX;
                        customEvent.screenY = options.screenY;
                        customEvent.clientX = options.clientX;
                        customEvent.clientY = options.clientY;
                        customEvent.ctrlKey = options.ctrlKey;
                        customEvent.altKey = options.altKey;
                        customEvent.metaKey = options.metaKey;
                        customEvent.shiftKey = options.shiftKey;
                        customEvent.button = options.button;
                        customEvent.relatedTarget = options.relatedTarget;
                    }
                    /*
                 * Check to see if relatedTarget has been assigned. Firefox
                 * versions less than 2.0 don't allow it to be assigned via
                 * initMouseEvent() and the property is readonly after event
                 * creation, so in order to keep YAHOO.util.getRelatedTarget()
                 * working, assign to the IE proprietary toElement property
                 * for mouseout event and fromElement property for mouseover
                 * event.
                 */
                    if (options.relatedTarget && !customEvent.relatedTarget) {
                        if (type == "mouseout") {
                            customEvent.toElement = options.relatedTarget;
                        } else if (type == "mouseover") {
                            customEvent.fromElement = options.relatedTarget;
                        }
                    }
                    target.dispatchEvent(customEvent);
                } else if (doc.createEventObject) {
                    //IE
                    customEvent = doc.createEventObject();
                    customEvent.bubbles = options.bubbles;
                    customEvent.cancelable = options.cancelable;
                    customEvent.view = view;
                    customEvent.detail = options.detail;
                    customEvent.screenX = options.screenX;
                    customEvent.screenY = options.screenY;
                    customEvent.clientX = options.clientX;
                    customEvent.clientY = options.clientY;
                    customEvent.ctrlKey = options.ctrlKey;
                    customEvent.altKey = options.altKey;
                    customEvent.metaKey = options.metaKey;
                    customEvent.shiftKey = options.shiftKey;
                    customEvent.button = Player.ieButtonCodeMap[options.button] || 0;
                    /*
                 * Have to use relatedTarget because IE won't allow assignment
                 * to toElement or fromElement on generic events. This keeps
                 * YAHOO.util.customEvent.getRelatedTarget() functional.
                 */
                    customEvent.relatedTarget = options.relatedTarget;
                    target.fireEvent('on' + type, customEvent);
                } else {
                    return false;
                }
                return true;
            },
            /*
         * Injects a UI event using the given event information to populate the event
         * object.
         * 
         * @param {HTMLElement} target The target of the given event.
         * @param {String} options.type The type of event to fire. This can be any one of
         * the following: `click`, `dblclick`, `mousedown`, `mouseup`, `mouseout`,
         * `mouseover` and `mousemove`.
         * @param {Boolean} [options.bubbles=true] `tru` if the event can be bubbled up.
         * DOM Level 2 specifies that all mouse events bubble by default.
         * @param {Boolean} [options.cancelable=true] `true` if the event can be canceled
         * using `preventDefault`. DOM Level 2 specifies that all mouse events except
         * `mousemove` can be canceled. This defaults to `false` for `mousemove`.
         * @param {int} [options.detail=1] The number of times the mouse button has been
         * used.
         * @param {Window} [view=window] The view containing the target. This is typically
         * the window object.
         * @private
         */
            injectUIEvent: function(target, options, view) {
                var customEvent = null;
                view = view || window;
                //check for DOM-compliant browsers first
                if (doc.createEvent) {
                    //just a generic UI Event object is needed
                    customEvent = doc.createEvent("UIEvents");
                    customEvent.initUIEvent(options.type, options.bubbles, options.cancelable, view, options.detail);
                    target.dispatchEvent(customEvent);
                } else if (doc.createEventObject) {
                    //IE
                    customEvent = doc.createEventObject();
                    customEvent.bubbles = options.bubbles;
                    customEvent.cancelable = options.cancelable;
                    customEvent.view = view;
                    customEvent.detail = options.detail;
                    target.fireEvent("on" + options.type, customEvent);
                } else {
                    return false;
                }
                return true;
            }
        }
    };
});
// statics

/**
 * @extends Ext.ux.event.Driver
 * Event recorder.
 */
Ext.define('Ext.ux.event.Recorder', function(Recorder) {
    function apply() {
        var a = arguments,
            n = a.length,
            obj = {
                kind: 'other'
            },
            i;
        for (i = 0; i < n; ++i) {
            Ext.apply(obj, arguments[i]);
        }
        if (obj.alt && !obj.event) {
            obj.event = obj.alt;
        }
        return obj;
    }
    function key(extra) {
        return apply({
            kind: 'keyboard',
            modKeys: true,
            key: true
        }, extra);
    }
    function mouse(extra) {
        return apply({
            kind: 'mouse',
            button: true,
            modKeys: true,
            xy: true
        }, extra);
    }
    var eventsToRecord = {
            keydown: key(),
            keypress: key(),
            keyup: key(),
            dragmove: mouse({
                alt: 'mousemove',
                pageCoords: true,
                whileDrag: true
            }),
            mousemove: mouse({
                pageCoords: true
            }),
            mouseover: mouse(),
            mouseout: mouse(),
            click: mouse(),
            wheel: mouse({
                wheel: true
            }),
            mousedown: mouse({
                press: true
            }),
            mouseup: mouse({
                release: true
            }),
            scroll: apply({
                listen: false
            }),
            focus: apply(),
            blur: apply()
        };
    for (var key in eventsToRecord) {
        if (!eventsToRecord[key].event) {
            eventsToRecord[key].event = key;
        }
    }
    eventsToRecord.wheel.event = null;
    // must detect later
    return {
        extend: 'Ext.ux.event.Driver',
        /**
         * @event add
         * Fires when an event is added to the recording.
         * @param {Ext.ux.event.Recorder} this
         * @param {Object} eventDescriptor The event descriptor.
         */
        /**
         * @event coalesce
         * Fires when an event is coalesced. This edits the tail of the recorded
         * event list.
         * @param {Ext.ux.event.Recorder} this
         * @param {Object} eventDescriptor The event descriptor that was coalesced.
         */
        eventsToRecord: eventsToRecord,
        ignoreIdRegEx: /ext-gen(?:\d+)/,
        inputRe: /^(input|textarea)$/i,
        constructor: function(config) {
            var me = this,
                events = config && config.eventsToRecord;
            if (events) {
                me.eventsToRecord = Ext.apply(Ext.apply({}, me.eventsToRecord), // duplicate
                events);
                // and merge
                delete config.eventsToRecord;
            }
            // don't smash
            me.callParent(arguments);
            me.clear();
            me.modKeys = [];
            me.attachTo = me.attachTo || window;
        },
        clear: function() {
            this.eventsRecorded = [];
        },
        listenToEvent: function(event) {
            var me = this,
                el = me.attachTo.document.body,
                fn = function() {
                    return me.onEvent.apply(me, arguments);
                },
                cleaner = {};
            if (el.attachEvent && el.ownerDocument.documentMode < 10) {
                event = 'on' + event;
                el.attachEvent(event, fn);
                cleaner.destroy = function() {
                    if (fn) {
                        el.detachEvent(event, fn);
                        fn = null;
                    }
                };
            } else {
                el.addEventListener(event, fn, true);
                cleaner.destroy = function() {
                    if (fn) {
                        el.removeEventListener(event, fn, true);
                        fn = null;
                    }
                };
            }
            return cleaner;
        },
        coalesce: function(rec, ev) {
            var me = this,
                events = me.eventsRecorded,
                length = events.length,
                tail = length && events[length - 1],
                tail2 = (length > 1) && events[length - 2],
                tail3 = (length > 2) && events[length - 3];
            if (!tail) {
                return false;
            }
            if (rec.type === 'mousemove') {
                if (tail.type === 'mousemove' && rec.ts - tail.ts < 200) {
                    rec.ts = tail.ts;
                    events[length - 1] = rec;
                    return true;
                }
            } else if (rec.type === 'click') {
                if (tail2 && tail.type === 'mouseup' && tail2.type === 'mousedown') {
                    if (rec.button == tail.button && rec.button == tail2.button && rec.target == tail.target && rec.target == tail2.target && me.samePt(rec, tail) && me.samePt(rec, tail2)) {
                        events.pop();
                        // remove mouseup
                        tail2.type = 'mduclick';
                        return true;
                    }
                }
            } else if (rec.type === 'keyup') {
                // tail3 = { type: "type",     text: "..." },
                // tail2 = { type: "keydown",  charCode: 65, keyCode: 65 },
                // tail  = { type: "keypress", charCode: 97, keyCode: 97 },
                // rec   = { type: "keyup",    charCode: 65, keyCode: 65 },
                if (tail2 && tail.type === 'keypress' && tail2.type === 'keydown') {
                    if (rec.target === tail.target && rec.target === tail2.target) {
                        events.pop();
                        // remove keypress
                        tail2.type = 'type';
                        tail2.text = String.fromCharCode(tail.charCode);
                        delete tail2.charCode;
                        delete tail2.keyCode;
                        if (tail3 && tail3.type === 'type') {
                            if (tail3.text && tail3.target === tail2.target) {
                                tail3.text += tail2.text;
                                events.pop();
                            }
                        }
                        return true;
                    }
                }
                // tail = { type: "keydown", charCode: 40, keyCode: 40 },
                // rec  = { type: "keyup",   charCode: 40, keyCode: 40 },
                else if (me.completeKeyStroke(tail, rec)) {
                    tail.type = 'type';
                    me.completeSpecialKeyStroke(ev.target, tail, rec);
                    return true;
                }
                // tail2 = { type: "keydown", charCode: 40, keyCode: 40 },
                // tail  = { type: "scroll",  ... },
                // rec   = { type: "keyup",   charCode: 40, keyCode: 40 },
                else if (tail.type === 'scroll' && me.completeKeyStroke(tail2, rec)) {
                    tail2.type = 'type';
                    me.completeSpecialKeyStroke(ev.target, tail2, rec);
                    // swap the order of type and scroll events
                    events.pop();
                    events.pop();
                    events.push(tail, tail2);
                    return true;
                }
            }
            return false;
        },
        completeKeyStroke: function(down, up) {
            if (down && down.type === 'keydown' && down.keyCode === up.keyCode) {
                delete down.charCode;
                return true;
            }
            return false;
        },
        completeSpecialKeyStroke: function(target, down, up) {
            var key = this.specialKeysByCode[up.keyCode];
            if (key && this.inputRe.test(target.tagName)) {
                // home,end,arrow keys + shift get crazy, so encode selection/caret
                delete down.keyCode;
                down.key = key;
                down.selection = this.getTextSelection(target);
                if (down.selection[0] === down.selection[1]) {
                    down.caret = down.selection[0];
                    delete down.selection;
                }
                return true;
            }
            return false;
        },
        getElementXPath: function(el) {
            var me = this,
                good = false,
                xpath = [],
                count, sibling, t, tag;
            for (t = el; t; t = t.parentNode) {
                if (t == me.attachTo.document.body) {
                    xpath.unshift('~');
                    good = true;
                    break;
                }
                if (t.id && !me.ignoreIdRegEx.test(t.id)) {
                    xpath.unshift('#' + t.id);
                    good = true;
                    break;
                }
                for (count = 1 , sibling = t; !!(sibling = sibling.previousSibling); ) {
                    if (sibling.tagName == t.tagName) {
                        ++count;
                    }
                }
                tag = t.tagName.toLowerCase();
                if (count < 2) {
                    xpath.unshift(tag);
                } else {
                    xpath.unshift(tag + '[' + count + ']');
                }
            }
            return good ? xpath.join('/') : null;
        },
        getRecordedEvents: function() {
            return this.eventsRecorded;
        },
        onEvent: function(ev) {
            var me = this,
                e = new Ext.event.Event(ev),
                info = me.eventsToRecord[e.type],
                root, modKeys, elXY,
                rec = {
                    type: e.type,
                    ts: me.getTimestamp(),
                    target: me.getElementXPath(e.target)
                },
                xy;
            if (!info || !rec.target) {
                return;
            }
            root = e.target.ownerDocument;
            root = root.defaultView || root.parentWindow;
            // Standards || IE
            if (root !== me.attachTo) {
                return;
            }
            if (me.eventsToRecord.scroll) {
                me.syncScroll(e.target);
            }
            if (info.xy) {
                xy = e.getXY();
                if (info.pageCoords || !rec.target) {
                    rec.px = xy[0];
                    rec.py = xy[1];
                } else {
                    elXY = Ext.fly(e.getTarget()).getXY();
                    xy[0] -= elXY[0];
                    xy[1] -= elXY[1];
                    rec.x = xy[0];
                    rec.y = xy[1];
                }
            }
            if (info.button) {
                if ('buttons' in ev) {
                    rec.button = ev.buttons;
                } else // LEFT=1, RIGHT=2, MIDDLE=4, etc.
                {
                    rec.button = ev.button;
                }
                if (!rec.button && info.whileDrag) {
                    return;
                }
            }
            if (info.wheel) {
                rec.type = 'wheel';
                if (info.event === 'wheel') {
                    // Current FireFox (technically IE9+ if we use addEventListener but
                    // checking document.onwheel does not detect this)
                    rec.dx = ev.deltaX;
                    rec.dy = ev.deltaY;
                } else if (typeof ev.wheelDeltaX === 'number') {
                    // new WebKit has both X & Y
                    rec.dx = -1 / 40 * ev.wheelDeltaX;
                    rec.dy = -1 / 40 * ev.wheelDeltaY;
                } else if (ev.wheelDelta) {
                    // old WebKit and IE
                    rec.dy = -1 / 40 * ev.wheelDelta;
                } else if (ev.detail) {
                    // Old Gecko
                    rec.dy = ev.detail;
                }
            }
            if (info.modKeys) {
                me.modKeys[0] = e.altKey ? 'A' : '';
                me.modKeys[1] = e.ctrlKey ? 'C' : '';
                me.modKeys[2] = e.metaKey ? 'M' : '';
                me.modKeys[3] = e.shiftKey ? 'S' : '';
                modKeys = me.modKeys.join('');
                if (modKeys) {
                    rec.modKeys = modKeys;
                }
            }
            if (info.key) {
                rec.charCode = e.getCharCode();
                rec.keyCode = e.getKey();
            }
            if (me.coalesce(rec, e)) {
                me.fireEvent('coalesce', me, rec);
            } else {
                me.eventsRecorded.push(rec);
                me.fireEvent('add', me, rec);
            }
        },
        onStart: function() {
            var me = this,
                ddm = me.attachTo.Ext.dd.DragDropManager,
                evproto = me.attachTo.Ext.EventObjectImpl.prototype,
                special = [];
            // FireFox does not support the 'mousewheel' event but does support the
            // 'wheel' event instead.
            Recorder.prototype.eventsToRecord.wheel.event = ('onwheel' in me.attachTo.document) ? 'wheel' : 'mousewheel';
            me.listeners = [];
            Ext.Object.each(me.eventsToRecord, function(name, value) {
                if (value && value.listen !== false) {
                    if (!value.event) {
                        value.event = name;
                    }
                    if (value.alt && value.alt !== name) {
                        // The 'drag' event is just mousemove while buttons are pressed,
                        // so if there is a mousemove entry as well, ignore the drag
                        if (!me.eventsToRecord[value.alt]) {
                            special.push(value);
                        }
                    } else {
                        me.listeners.push(me.listenToEvent(value.event));
                    }
                }
            });
            Ext.each(special, function(info) {
                me.eventsToRecord[info.alt] = info;
                me.listeners.push(me.listenToEvent(info.alt));
            });
            me.ddmStopEvent = ddm.stopEvent;
            ddm.stopEvent = Ext.Function.createSequence(ddm.stopEvent, function(e) {
                me.onEvent(e);
            });
            me.evStopEvent = evproto.stopEvent;
            evproto.stopEvent = Ext.Function.createSequence(evproto.stopEvent, function() {
                me.onEvent(this);
            });
        },
        onStop: function() {
            var me = this;
            Ext.destroy(me.listeners);
            me.listeners = null;
            me.attachTo.Ext.dd.DragDropManager.stopEvent = me.ddmStopEvent;
            me.attachTo.Ext.EventObjectImpl.prototype.stopEvent = me.evStopEvent;
        },
        samePt: function(pt1, pt2) {
            return pt1.x == pt2.x && pt1.y == pt2.y;
        },
        syncScroll: function(el) {
            var me = this,
                ts = me.getTimestamp(),
                oldX, oldY, x, y, scrolled, rec;
            for (var p = el; p; p = p.parentNode) {
                oldX = p.$lastScrollLeft;
                oldY = p.$lastScrollTop;
                x = p.scrollLeft;
                y = p.scrollTop;
                scrolled = false;
                if (oldX !== x) {
                    if (x) {
                        scrolled = true;
                    }
                    p.$lastScrollLeft = x;
                }
                if (oldY !== y) {
                    if (y) {
                        scrolled = true;
                    }
                    p.$lastScrollTop = y;
                }
                if (scrolled) {
                    //console.log('scroll x:' + x + ' y:' + y, p);
                    me.eventsRecorded.push(rec = {
                        type: 'scroll',
                        target: me.getElementXPath(p),
                        ts: ts,
                        pos: [
                            x,
                            y
                        ]
                    });
                    me.fireEvent('add', me, rec);
                }
                if (p.tagName === 'BODY') {
                    break;
                }
            }
        }
    };
});

/**
 * This base class can be used by derived classes to dynamically require Google API's.
 */
Ext.define('Ext.ux.google.Api', {
    mixins: [
        'Ext.mixin.Mashup'
    ],
    requiredScripts: [
        '//www.google.com/jsapi'
    ],
    statics: {
        loadedModules: {}
    },
    /*
             *  feeds: [ callback1, callback2, .... ]  transitions to -> feeds : true  (when complete)
             */
    onClassExtended: function(cls, data, hooks) {
        var onBeforeClassCreated = hooks.onBeforeCreated,
            Api = this;
        // the Ext.ux.google.Api class
        hooks.onBeforeCreated = function(cls, data) {
            var me = this,
                apis = [],
                requiresGoogle = Ext.Array.from(data.requiresGoogle),
                loadedModules = Api.loadedModules,
                remaining = 0,
                callback = function() {
                    if (!--remaining) {
                        onBeforeClassCreated.call(me, cls, data, hooks);
                    }
                    Ext.env.Ready.unblock();
                },
                api, i, length;
            /*
             *  requiresGoogle: [
             *      'feeds',
             *      { api: 'feeds', version: '1.x',
             *        callback : fn, nocss : true }  //optionals
             *  ]
             */
            length = requiresGoogle.length;
            for (i = 0; i < length; ++i) {
                if (Ext.isString(api = requiresGoogle[i])) {
                    apis.push({
                        api: api
                    });
                } else if (Ext.isObject(api)) {
                    apis.push(Ext.apply({}, api));
                }
            }
            Ext.each(apis, function(api) {
                var name = api.api,
                    version = String(api.version || '1.x'),
                    module = loadedModules[name];
                if (!module) {
                    ++remaining;
                    Ext.env.Ready.block();
                    loadedModules[name] = module = [
                        callback
                    ].concat(api.callback || []);
                    delete api.api;
                    delete api.version;
                    //TODO:  window.google assertion?
                    google.load(name, version, Ext.applyIf({
                        callback: function() {
                            loadedModules[name] = true;
                            for (var n = module.length; n-- > 0; ) {
                                module[n]();
                            }
                        }
                    }, //iterate callbacks in reverse
                    api));
                } else if (module !== true) {
                    module.push(callback);
                }
            });
            if (!remaining) {
                onBeforeClassCreated.call(me, cls, data, hooks);
            }
        };
    }
});

/**
 * This class, when required, ensures that the Google RSS Feeds API is available.
 */
Ext.define('Ext.ux.google.Feeds', {
    extend: 'Ext.ux.google.Api',
    requiresGoogle: {
        api: 'feeds',
        nocss: true
    }
});

