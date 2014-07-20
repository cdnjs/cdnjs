/**
 * @author Don Griffin
 *
 * Simulates an XMLHttpRequest object's methods and properties but is backed by a
 * {@link Ext.ux.ajax.Simlet} instance that provides the data.
 */
Ext.define('Ext.ux.ajax.SimXhr', {
    readyState: 0,

    mgr: null,
    simlet: null,

    constructor: function (config) {
        var me = this;

        Ext.apply(me, config);
        me.requestHeaders = {};
    },

    abort: function () {
        var me = this;

        if (me.timer) {
            clearTimeout(me.timer);
            me.timer = null;
        }
        me.aborted = true;
    },

    getAllResponseHeaders: function () {
        var headers = [];
        if (Ext.isObject(this.responseHeaders)) {
            Ext.Object.each(this.responseHeaders, function (name, value) {
                headers.push(name + ': ' + value);
            });
        }
        return headers.join('\x0d\x0a');
    },

    getResponseHeader: function (header) {
        var headers = this.responseHeaders;
        return (headers && headers[header]) || null;
    },

    open: function (method, url, async, user, password) {
        var me = this;
        me.method = method;
        me.url = url;
        me.async = async !== false;
        me.user = user;
        me.password = password;

        me.setReadyState(1);
    },

    overrideMimeType: function (mimeType) {
        this.mimeType = mimeType;
    },

    schedule: function () {
        var me = this,
            delay = me.mgr.delay;
            
        if (delay) {
            me.timer = setTimeout(function () {
                me.onTick();
            }, delay);
        } else {
            me.onTick();
        }
    },

    send: function (body) {
        var me = this;

        me.body = body;

        if (me.async) {
            me.schedule();
        } else {
            me.onComplete();
        }
    },

    setReadyState: function (state) {
        var me = this;
        if (me.readyState != state) {
            me.readyState = state;
            me.onreadystatechange();
        }
    },

    setRequestHeader: function (header, value) {
        this.requestHeaders[header] = value;
    },

    // handlers

    onreadystatechange: Ext.emptyFn,

    onComplete: function () {
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

    onTick: function () {
        var me = this;

        me.timer = null;
        me.onComplete();
        me.onreadystatechange && me.onreadystatechange();
    }
});
