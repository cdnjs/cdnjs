/**
 * @private
 */
Ext.define('Ext.util.sizemonitor.Abstract', {

    mixins: ['Ext.mixin.Templatable'],

    requires: [
        'Ext.TaskQueue'
    ],

    config: {
        element: null,

        callback: Ext.emptyFn,

        scope: null,

        args: []
    },

    width: 0,

    height: 0,

    contentWidth: 0,

    contentHeight: 0,

    constructor: function(config) {
        this.refresh = Ext.Function.bind(this.refresh, this);

        this.info = {
            width: 0,
            height: 0,
            contentWidth: 0,
            contentHeight: 0,
            flag: 0
        };

        this.initElement();

        this.initConfig(config);

        this.bindListeners(true);
    },

    bindListeners: Ext.emptyFn,

    applyElement: function(element) {
        if (element) {
            return Ext.get(element);
        }
    },

    updateElement: function(element) {
        element.append(this.detectorsContainer);
        element.addCls('x-size-monitored');
    },

    applyArgs: function(args) {
        return args.concat([this.info]);
    },

    refreshMonitors: Ext.emptyFn,

    forceRefresh: function() {
        Ext.TaskQueue.requestRead('refresh', this);
    },

    getContentBounds: function() {
        return this.detectorsContainer.getBoundingClientRect();
    },

    getContentWidth: function() {
        return this.detectorsContainer.offsetWidth;
    },

    getContentHeight: function() {
        return this.detectorsContainer.offsetHeight;
    },

    refreshSize: function() {
        var element = this.getElement();

        if (!element || element.isDestroyed) {
            return false;
        }

        var width = element.getWidth(),
            height = element.getHeight(),
            contentWidth = this.getContentWidth(),
            contentHeight = this.getContentHeight(),
            currentContentWidth = this.contentWidth,
            currentContentHeight = this.contentHeight,
            info = this.info,
            resized = false,
            flag;

        this.width = width;
        this.height = height;
        this.contentWidth = contentWidth;
        this.contentHeight = contentHeight;

        flag = ((currentContentWidth !== contentWidth ? 1 : 0) + (currentContentHeight !== contentHeight ? 2 : 0));

        if (flag > 0) {
            info.width = width;
            info.height = height;
            info.contentWidth = contentWidth;
            info.contentHeight = contentHeight;
            info.flag = flag;

            resized = true;
            this.getCallback().apply(this.getScope(), this.getArgs());
        }

        return resized;
    },

    refresh: function(force) {
        if (this.refreshSize() || force) {
            Ext.TaskQueue.requestWrite('refreshMonitors', this);
        }
    },

    destroy: function() {
        var element = this.getElement();

        this.bindListeners(false);

        if (element && !element.isDestroyed) {
            element.removeCls('x-size-monitored');
        }

        delete this._element;

        this.callSuper();
    }
});
