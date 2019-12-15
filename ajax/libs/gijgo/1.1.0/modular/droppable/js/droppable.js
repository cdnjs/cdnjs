/*
 * Gijgo Droppable v1.1.0
 * http://gijgo.com/droppable
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
if (typeof (gj) === 'undefined') {
    gj = {};
}

gj.widget = function () {
    var self = this;

    self.xhr = null;

    self.generateGUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
};

gj.widget.prototype.init = function (jsConfig, type) {
    var option, clientConfig, fullConfig;

    clientConfig = $.extend(true, {}, this.getHTMLConfig() || {});
    $.extend(true, clientConfig, jsConfig || {});
    fullConfig = this.getConfig(clientConfig, type);

    this.attr('data-guid', fullConfig.guid);

    this.data(fullConfig);

    // Initialize events configured as options
    for (option in fullConfig) {
        if (gj[type].events.hasOwnProperty(option)) {
            this.on(option, fullConfig[option]);
            delete fullConfig[option];
        }
    }

    // Initialize all plugins
    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            gj[type].plugins[plugin].configure(this, fullConfig, clientConfig);
        }
    }

    return this;
};

gj.widget.prototype.getConfig = function (clientConfig, type) {
    var config, uiLibrary, plugin;

    config = $.extend(true, {}, gj[type].config.base);

    uiLibrary = clientConfig.uiLibrary || config.uiLibrary;
    if (gj[type].config[uiLibrary]) {
        $.extend(true, config, gj[type].config[uiLibrary]);
    }

    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            $.extend(true, config, gj[type].plugins[plugin].config.base);
            if (gj[type].plugins[plugin].config[uiLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[uiLibrary]);
            }
        }
    }

    $.extend(true, config, clientConfig);

    if (!config.guid) {
        config.guid = this.generateGUID();
    }

    return config;
}

gj.widget.prototype.getHTMLConfig = function () {
    var result = this.data(),
        attrs = this[0].attributes;
    if (attrs['width']) {
        result.width = attrs['width'].nodeValue;
    }
    if (attrs['height']) {
        result.height = attrs['height'].nodeValue;
    }
    if (attrs['align']) {
        result.align = attrs['align'].nodeValue;
    }
    if (result && result.source) {
        result.dataSource = result.source;
        delete result.source;
    }
    return result;
};

gj.widget.prototype.createDoneHandler = function () {
    var $widget = this;
    return function (response) {
        if (typeof (response) === 'string' && JSON) {
            response = JSON.parse(response);
        }
        gj[$widget.data('type')].methods.render($widget, response);
    };
};

gj.widget.prototype.createErrorHandler = function () {
    var $widget = this;
    return function (response) {
        if (response && response.statusText && response.statusText !== 'abort') {
            alert(response);
        }
    };
};

gj.widget.prototype.reload = function (params) {
    var ajaxOptions, result, data = this.data();
    if (data.dataSource === undefined) {
        gj[this.data('type')].methods.useHtmlDataSource(this, data);
    }
    $.extend(data.params, params);
    if ($.isArray(data.dataSource)) {
        result = gj[this.data('type')].methods.filter(this);
        gj[this.data('type')].methods.render(this, result);
    } else if (typeof(data.dataSource) === 'string') {
        ajaxOptions = { url: data.dataSource, data: data.params };
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions).done(this.createDoneHandler()).fail(this.createErrorHandler());
    } else if (typeof (data.dataSource) === 'object') {
        if (!data.dataSource.data) {
            data.dataSource.data = {};
        }
        $.extend(data.dataSource.data, data.params);
        ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
        if (ajaxOptions.dataType === 'json' && typeof(ajaxOptions.data) === 'object') {
            ajaxOptions.data = JSON.stringify(ajaxOptions.data);
        }
        if (!ajaxOptions.success) {
            ajaxOptions.success = this.createDoneHandler();
        }
        if (!ajaxOptions.error) {
            ajaxOptions.error = this.createErrorHandler();
        }
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions);
    }
    return this;
}

gj.documentManager = {
    events: {},

    subscribeForEvent: function (eventName, widgetId, callback) {
        if (!gj.documentManager.events[eventName] || gj.documentManager.events[eventName].length === 0) {
            gj.documentManager.events[eventName] = [{ widgetId: widgetId, callback: callback }];
            $(document).on(eventName, gj.documentManager.executeCallbacks);
        } else if (!gj.documentManager.events[eventName][widgetId]) {
            gj.documentManager.events[eventName].push({ widgetId: widgetId, callback: callback });
        } else {
            throw "Event " + eventName + " for widget with guid='" + widgetId + "' is already attached.";
        }
    },

    executeCallbacks: function (e) {
        var callbacks = gj.documentManager.events[e.type];
        if (callbacks) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].callback(e);
            }
        }
    },

    unsubscribeForEvent: function (eventName, widgetId) {
        var success = false,
            events = gj.documentManager.events[eventName];
        if (events) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].widgetId === widgetId) {
                    events.splice(i, 1);
                    success = true;
                    if (events.length === 0) {
                        $(document).off(eventName);
                        delete gj.documentManager.events[eventName];
                    }
                }
            }
        }
        if (!success) {
            throw 'The "' + eventName + '" for widget with guid="' + widgetId + '" can\'t be removed.';
        }
    }
};
/* global window alert jQuery */
/** 
 * @widget Droppable 
 * @plugin Base
 */
if (typeof (gj.droppable) === 'undefined') {
    gj.droppable = {};
}

gj.droppable.config = {
    /** If specified, the class will be added to the droppable while draggable is being hovered over the droppable.
     * @type string
     * @default undefined
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({ hoverClass: 'hover' });
     * </script>
     */
    hoverClass: undefined
};

gj.droppable.methods = {
    init: function (jsConfig) {
        var $dropEl = this;

        gj.widget.prototype.init.call(this, jsConfig, 'droppable');
        $dropEl.attr('data-droppable', 'true');
        
        gj.documentManager.subscribeForEvent('mousedown', $dropEl.data('guid'), gj.droppable.methods.createMouseDownHandler($dropEl));
        gj.documentManager.subscribeForEvent('mousemove', $dropEl.data('guid'), gj.droppable.methods.createMouseMoveHandler($dropEl));
        gj.documentManager.subscribeForEvent('mouseup', $dropEl.data('guid'), gj.droppable.methods.createMouseUpHandler($dropEl));
        
        return $dropEl;
    },

    createMouseDownHandler: function ($dropEl) {
        return function (e) {
            $dropEl.isDragging = true;
        }
    },

    createMouseMoveHandler: function ($dropEl) {
        return function (e) {
            if ($dropEl.isDragging) {
                var hoverClass = $dropEl.data('hoverClass'),
                    newIsOver = gj.droppable.methods.isOver($dropEl, e);
                if (newIsOver != $dropEl.isOver) {
                    if (newIsOver) {
                        if (hoverClass) {
                            $dropEl.addClass(hoverClass);
                        }
                        gj.droppable.events.over($dropEl);
                    } else {
                        if (hoverClass) {
                            $dropEl.removeClass(hoverClass);
                        }
                        gj.droppable.events.out($dropEl);
                    }
                }
                $dropEl.isOver = newIsOver;
            }
        }
    },

    createMouseUpHandler: function ($dropEl) {
        return function (e) {
            $dropEl.isDragging = false;
            if (gj.droppable.methods.isOver($dropEl, e)) {
                gj.droppable.events.drop($dropEl);
            }
        }
    },

    isOver: function ($dropEl, e) {
        var x = gj.droppable.methods.mouseX(e),
            y = gj.droppable.methods.mouseY(e),
            offset = $dropEl.offset();
        return x > offset.left && x < (offset.left + $dropEl.width()) && y > offset.top && y < (offset.top + $dropEl.height());
    },

    mouseX: function (e) {
        if (e) {
            if (e.pageX) {
                return e.pageX;
            } else if (e.clientX) {
                return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            }
        }
        return null;
    },

    mouseY: function (e) {
        if (e) {
            if (e.pageY) {
                return e.pageY;
            } else if (e.clientY) {
                return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            }
        }
        return null;
    },

    destroy: function ($dropEl) {
        if ($dropEl.attr('data-droppable') === 'true') {
            gj.documentManager.unsubscribeForEvent('mousedown', $dropEl.data('guid'));
            gj.documentManager.unsubscribeForEvent('mousemove', $dropEl.data('guid'));
            gj.documentManager.unsubscribeForEvent('mouseup', $dropEl.data('guid'));
            $dropEl.removeData();
            $dropEl.removeAttr('data-guid');
            $dropEl.removeAttr('data-droppable');
            $dropEl.off('drop').off('over').off('out');
        }
        return $dropEl;
    }
};

gj.droppable.events = {
    /** Triggered when a draggable element is dropped.
     * @event drop
     * @param {object} e - event data
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .drop { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({ drop: function() { $(this).addClass('drop') } });
     * </script>
     */
    drop: function ($dropEl, offsetX, offsetY) {
        $dropEl.trigger('drop', [{ top: offsetY, left: offsetX }]);
    },

    /** Triggered when a draggable element is dragged over the droppable.
     * @event over
     * @param {object} e - event data
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({
     *         over: function() { $(this).addClass('hover') },
     *         out: function() { $(this).removeClass('hover') }
     *     });
     * </script>
     */
    over: function ($dropEl) {
        $dropEl.trigger('over');
    },

    /** Triggered when a draggable element is dragged out of the droppable.
     * @event out
     * @param {object} e - event data
     * @example sample <!-- droppable.base, draggable.base -->
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     $('#draggable').draggable();
     *     $('#droppable').droppable({
     *         over: function() { $(this).addClass('hover') },
     *         out: function() { $(this).removeClass('hover') }
     *     });
     * </script>
     */
    out: function ($dropEl) {
        $dropEl.trigger('out');
    }
};


gj.droppable.widget = function ($element, arguments) {
    var self = this,
        methods = gj.droppable.methods;

    self.isOver = false;
    self.isDragging = false;

    /** Removes the droppable functionality.
     * @method
     * @return jquery element
     * @example sample <!-- draggable.base, droppable.base -->
     * <button onclick="create()">Create</button>
     * <button onclick="dropEl.destroy()">Destroy</button>
     * <br/><br/>
     * <style>
     * .draggable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .droppable { border: 1px solid #999; width: 300px; height: 200px; text-align: center; }
     * .hover { background-color: #FF0000; }
     * </style>
     * <div id="droppable" class="droppable">Drop Here</div>
     * <div id="draggable" class="draggable">Drag Me</div>
     * <script>
     *     var dropEl;
     *     $('#draggable').draggable();
     *     function create() {
     *         dropEl = $('#droppable').droppable({
     *             hoverClass: 'hover'
     *         });
     *     }
     *     create();
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    }

    self.isOver = function (mouseEvent) {
        return methods.isOver(this, mouseEvent);
    }

    $.extend($element, self);
    if ('true' !== $element.attr('data-droppable')) {
        methods.init.apply($element, arguments);
    }

    return $element;
};

gj.droppable.widget.prototype = new gj.widget();
gj.droppable.widget.constructor = gj.droppable.widget;

(function ($) {
    $.fn.droppable = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.droppable.widget(this, arguments);
            } else {
                $widget = new gj.droppable.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);