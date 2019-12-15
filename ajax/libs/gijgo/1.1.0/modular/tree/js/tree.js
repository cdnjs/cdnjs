/*
 * Gijgo Tree v1.1.0
 * http://gijgo.com/tree
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
/* global window alert jQuery gj */
/**
  * @widget Tree
  * @plugin Base
  */
if (typeof(gj.tree) === 'undefined') {
    gj.tree = {
        plugins: {}
    };
}

gj.tree.config = {
    base: {

        /** When this setting is enabled the content of the tree will be loaded automatically after the creation of the tree.
         * @type boolean
         * @default true
         * @example disabled <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ],
         *         autoLoad: false
         *     });
         *     tree.reload(); //call .reload() explicitly in order to load the data in the tree
         * </script>
         * @example enabled <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ],
         *         autoLoad: true
         *     });
         * </script>
         */
        autoLoad: true,

        /** The type of the node selection.<br/>
         * If the type is set to multiple the user will be able to select more then one node in the tree.
         * @type (single|multiple)
         * @default single
         * @example Single.Selection <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         selectionType: 'single'
         *     });
         * </script>
         * @example Multiple.Selection <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         selectionType: 'multiple'
         *     });
         * </script>
         */
        selectionType: 'single',

        /** This setting enable cascade selection and unselection of children
         * @type boolean
         * @default false
         * @example Sample <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         cascadeSelection: true
         *     });
         * </script>
         */
        cascadeSelection: false,

        /** The data source of tree.
         * @additionalinfo If set to string, then the tree is going to use this string as a url for ajax requests to the server.<br />
         * If set to object, then the tree is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
         * If set to array, then the tree is going to use the array as data for tree nodes.
         * @type (string|object|array)
         * @default undefined
         * @example Local.DataSource <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: [ { text: 'foo', children: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         * @example Remote.DataSource <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     $('#tree').tree({
         *         dataSource: '/DataSources/GetCountries'
         *     });
         * </script>
         */
        dataSource: undefined,

        /** Primary key field name.
         * @type string
         * @default undefined
         * @example sample <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         primaryKey: 'id',
         *         dataSource: [ { id: 101, text: 'foo', children: [ { id: 202, text: 'bar' } ] } ]
         *     });
         *     alert(tree.getDataById(101).text);
         * </script>
         */
        primaryKey: undefined,

        /** Text field name.
         * @type string
         * @default 'text'
         * @example sample <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         textField: 'newTextName',
         *         dataSource: [ { newTextName: 'foo', children: [ { newTextName: 'bar' } ] } ]
         *     });
         * </script>
         */
        textField: 'text',

        /** Children field name.
         * @type string
         * @default 'children'
         * @example sample <!-- tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         childrenField: 'myChildrenNode',
         *         dataSource: [ { text: 'foo', myChildrenNode: [ { text: 'bar' } ] } ]
         *     });
         * </script>
         */
        childrenField: 'children',

        /** Width of the tree.
         * @type number
         * @default undefined
         * @example JS.Config <!-- bootstrap, tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: '/DataSources/GetCountries',
         *         width: 500,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example HTML.Config <!-- bootstrap, tree.base -->
         * <div id="tree" width="500" data-source="/DataSources/GetCountries" data-ui-library="bootstrap"></div>
         * <script>
         *     $('#tree').tree();
         * </script>
         */
        width: undefined,

        /** The name of the UI library that is going to be in use.
         * @additionalinfo The css files for Bootstrap should be manually included if you use bootstrap as UI Library.
         * @type (base|bootstrap|materialdesign)
         * @default single
         * @example Bootstrap <!-- bootstrap, tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         width: 500,
         *         uiLibrary: 'bootstrap'
         *     });
         * </script>
         * @example MaterialDesign <!-- materialdesign, tree.base -->
         * <div id="tree"></div>
         * <script>
         *     var tree = $('#tree').tree({
         *         dataSource: [
         *             { text: 'North America', children: [ { text: 'USA', children: [ { text: 'California' }, { text: 'Miami' } ] }, { text: 'Canada' },  { text: 'Mexico' } ] },
         *             { text: 'Europe', children: [ { text: 'France' },  { text: 'Spain' },  { text: 'Italy' } ] },
         *             { text: 'South America', children: [ { text: 'Brazil' },  { text: 'Argentina' },  { text: 'Columbia' } ] }
         *         ],
         *         width: 500,
         *         uiLibrary: 'materialdesign'
         *     });
         * </script>
         */
        uiLibrary: 'base',

        autoGenId: 1,

        style: {
            wrapper: 'gj-tree-unselectable',
            list: 'gj-tree-list',
            item: 'gj-tree-item',
            active: 'gj-tree-base-active',
            leftSpacer: undefined,
            expander: 'gj-tree-expander',
            display: 'gj-tree-display',
            expandIcon: undefined,
            collapseIcon: undefined,
            leafIcon: undefined
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-tree-unselectable',
            list: 'gj-tree-bootstrap-list list-group',
            item: 'gj-tree-bootstrap-item list-group-item',
            active: 'active',
            leftSpacer: 'gj-tree-bootstrap-left-spacer',
            expander: 'gj-tree-bootstrap-expander glyphicon',
            display: 'gj-tree-bootstrap-display',
            expandIcon: 'glyphicon-plus',
            collapseIcon: 'glyphicon-minus',
            leafIcon: undefined
        }
    },

    jqueryui: {},

    materialdesign: {
        style: {
            wrapper: 'gj-tree-unselectable',
            list: 'gj-tree-mdl-list mdl-list',
            item: 'gj-tree-mdl-item mdl-list__item',
            active: 'gj-tree-mdl-active',
            leftSpacer: '',
            expander: 'material-icons gj-font-size-16 gj-cursor-pointer',
            display: 'gj-tree-mdl-display mdl-list__item-primary-content',
            expandIcon: 'gj-tree-mdl-icon-plus',
            collapseIcon: 'gj-tree-mdl-icon-minus',
            leafIcon: undefined
        }
    }
};
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.events = {

    /**
     * Event fires when the tree is initialized
     * @event initialized
     * @param {object} e - event data
     * @example sample <!-- tree.base -->
     * <button id="reload">Reload</button>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         initialized: function (e) {
     *             alert('initialized is fired.');
     *         }
     *     });
     *     $('#reload').on('click', function() { 
     *         tree.reload(); 
     *     });
     * </script>
     */
    initialized: function ($tree) {
        $tree.triggerHandler('initialized');
    },

    /**
     * Event fired before data binding takes place.
     * @event dataBinding
     * @param {object} e - event data
     * @example sample <!-- tree.base -->
     * <div id="tree"></div>
     * <script>
     *     $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         dataBinding: function (e) {
     *             alert('dataBinding is fired.');
     *         }
     *     });
     * </script>
     */
    dataBinding: function ($tree) {
        $tree.triggerHandler('dataBinding');
    },

    /**
     * Event fires after the loading of the data in the grid.
     * @event dataBound
     * @param {object} e - event data
     * @example sample <!-- tree.base -->
     * <div id="tree"></div>
     * <script>
     *     $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         dataBound: function (e) {
     *             alert('dataBound is fired.');
     *         }
     *     });
     * </script>
     */
    dataBound: function ($tree) {
        $tree.triggerHandler('dataBound');
    },

    /**
     * Event fires after selection of tree node.
     * @event select
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the node
     * @example sample <!-- tree.base -->
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('select', function (e, node, id, record) {
     *         alert('select is fired.');
     *     });
     * </script>
     */
    select: function ($tree, $node, id, record) {
        return $tree.triggerHandler('select', [$node, id, record]);
    },

    /**
     * Event fires on un selection of tree node
     * @event unselect
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @param {object} record - the data of the node
     * @example sample <!-- tree.base -->
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('unselect', function (e, node, id, record) {
     *         alert('unselect is fired.');
     *     });
     * </script>
     */
    unselect: function ($tree, $node, id, record) {
        return $tree.triggerHandler('unselect', [$node, id, record]);
    },

    /**
     * Event fires before node expand.
     * @event expand
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree.base -->
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('expand', function (e, node, id) {
     *         alert('expand is fired.');
     *     });
     * </script>
     */
    expand: function ($tree, $node, id, record) {
        return $tree.triggerHandler('expand', [$node, id, record]);
    },

    /**
     * Event fires before node collapse.
     * @event collapse
     * @param {object} e - event data
     * @param {object} node - the node as jquery object
     * @param {string} id - the id of the record
     * @example Event.Sample <!-- tree.base -->
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('collapse', function (e, node, id) {
     *         alert('collapse is fired.');
     *     });
     * </script>
     */
    collapse: function ($tree, $node, id, record) {
        return $tree.triggerHandler('collapse', [$node, id, record]);
    },

    /**
     * Event fires before tree destroy
     * @event destroying
     * @param {object} e - event data
     * @example Event.Sample <!-- tree.base -->
     * <button onclick="tree.destroy()">Destroy</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     tree.on('destroying', function (e) {
     *         alert('destroying is fired.');
     *     });
     * </script>
     */
    destroying: function ($tree) {
        return $tree.triggerHandler('destroying');
    }
}
/*global gj $*/
gj.tree.methods = {

    init: function (jsConfig) {
        this.attr('data-type', 'tree');
        gj.widget.prototype.init.call(this, jsConfig, 'tree');

        gj.tree.methods.initialize.call(this);

        if (this.data('autoLoad')) {
            this.reload();
        }
        return this;
    },

    initialize: function () {
        var data = this.data(),
            $root = $('<ul class="' + data.style.list + '"/>');
        this.empty().addClass(data.style.wrapper).append($root);
        if (data.width) {
            this.width(data.width);
        }
        gj.tree.events.initialized(this);
    },

    useHtmlDataSource: function ($tree, data) {
        data.dataSource = [];
    },

    render: function ($tree, response) {
        if (response) {
            if (typeof (response) === 'string' && JSON) {
                response = JSON.parse(response);
            }
            $tree.data('records', gj.tree.methods.getRecords($tree, response));
            gj.tree.methods.loadData($tree);
        }
        return $tree;
    },

    filter: function ($grid) {
        return $grid.data().dataSource;
    },

    getRecords: function ($tree, response) {
        var i, id, nodeData, result = [],
            data = $tree.data();
        for (i = 0; i < response.length; i++) {
            id = data.primaryKey ? response[i][data.primaryKey] : data.autoGenId++;
            nodeData = { id: id, data: response[i] };
            if (response[i][data.childrenField] && response[i][data.childrenField].length) {
                nodeData.children = gj.tree.methods.getRecords($tree, response[i][data.childrenField]);
                delete response[i][data.childrenField];
            }
            result.push(nodeData);
        }
        return result;
    },

    loadData: function ($tree) {
        var i,
            records = $tree.data('records'),
            $root = $tree.children('ul');

        gj.tree.events.dataBinding($tree);
        $root.off().empty();
        for (i = 0; i < records.length; i++) {
            gj.tree.methods.appendNode($tree, $root, records[i], 1);
        }
        gj.tree.events.dataBound($tree);
    },

    appendNode: function ($tree, $parent, nodeData, level, position) {
        var i, $node, $newParent,
            data = $tree.data(),
            $node = $('<li data-id="' + nodeData.id + '"/>').addClass(data.style.item),
            $expander = $('<span data-role="expander" data-mode="close"></span>'),
            $display = $('<span data-role="display">' + nodeData.data[data.textField] + '</span>');

        if (data.style.leftSpacer) {
            if (!level) {
                level = $parent.parents('ul').length + 1;
            }
            for (i = 1; i < level; i++) {
                $node.append('<span data-role="spacer" class="' + data.style.leftSpacer + '"></span>');
            }
        }

        $expander.addClass(data.style.expander).on('click', gj.tree.methods.expanderClickHandler($tree));
        $node.append($expander);

        $display.addClass(data.style.display).on('click', gj.tree.methods.displayClickHandler($tree));
        $node.append($display);

        if (nodeData.children && nodeData.children.length) {
            data.style.expandIcon ? $expander.addClass(data.style.expandIcon) : $expander.text('+');
            $newParent = $('<ul />').addClass(data.style.list).addClass('gj-hidden');
            $node.append($newParent);

            for (i = 0; i < nodeData.children.length; i++) {
                gj.tree.methods.appendNode($tree, $newParent, nodeData.children[i], level + 1);
            }
        } else {
            data.style.leafIcon ? $expander.addClass(data.style.leafIcon) : $expander.html('&nbsp;');
        }

        if (position) {
            $parent.find('li:eq(' + (position - 1) + ')').before($node);
        } else {
            $parent.append($node);
        }
    },

    expanderClickHandler: function ($tree) {
        return function (e) {
            var $expander = $(this),
                $node = $expander.parent('li');
            if ($expander.attr('data-mode') === 'close') {
                $tree.expand($node);
            } else {
                $tree.collapse($node);
            }
        }
    },

    expand: function ($tree, $node, cascade) {
        var $children, i,
            $expander = $node.children('[data-role="expander"]'),
            data = $tree.data(),
            id = $node.attr('data-id'),
            $list = $node.children('ul');
        if ($list && $list.length) {
            if (gj.tree.events.expand($tree, $node, id) !== false) {
                $list.show();
                $expander.attr('data-mode', 'open');
                data.style.collapseIcon ? $expander.removeClass(data.style.expandIcon).addClass(data.style.collapseIcon) : $expander.text('-');
                if (cascade) {
                    $children = $node.find('ul>li');
                    for (i = 0; i < $children.length; i++) {
                        gj.tree.methods.expand($tree, $($children[i]), cascade);
                    }
                }
            }
        }
        return $tree;
    },

    collapse: function ($tree, $node, cascade) {
        var $children, i,
            $expander = $node.children('[data-role="expander"]'),
            data = $tree.data(),
            id = $node.attr('data-id'),
            $list = $node.children('ul');
        if ($list && $list.length) {
            if (gj.tree.events.collapse($tree, $node, id) !== false) {
                $list.hide();
                $expander.attr('data-mode', 'close');
                data.style.expandIcon ? $expander.removeClass(data.style.collapseIcon).addClass(data.style.expandIcon) : $expander.text('+');
                if (cascade) {
                    $children = $node.find('ul>li');
                    for (i = 0; i < $children.length; i++) {
                        gj.tree.methods.collapse($tree, $($children[i]), cascade);
                    }
                }
            }
        }
        return $tree;
    },

    expandAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.expand($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    collapseAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.collapse($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    displayClickHandler: function ($tree) {
        return function (e) {
            var $display = $(this),
                $node = $display.parent('li'),
                cascade = $tree.data().cascadeSelection;
            if ($node.attr('data-selected') === 'true') {
                gj.tree.methods.unselect($tree, $node, cascade);
            } else {
                if ($tree.data('selectionType') === 'single') {
                    gj.tree.methods.unselectAll($tree);
                }
                gj.tree.methods.select($tree, $node, cascade);
            }
        }
    },

    selectAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.select($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    select: function ($tree, $node, cascade) {
        var i, $children, data = $tree.data();
        if ($node.attr('data-selected') !== 'true' && gj.tree.events.select($tree, $node) !== false) {
            $node.addClass(data.style.active).attr('data-selected', 'true');
            if (cascade) {
                $children = $node.find('ul>li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.select($tree, $($children[i]), cascade);
                }
            }
        }
    },
    
    unselectAll: function ($tree) {
        var i, $nodes = $tree.find('ul>li');
        for (i = 0; i < $nodes.length; i++) {
            gj.tree.methods.unselect($tree, $($nodes[i]), true);
        }
        return $tree;
    },

    unselect: function ($tree, $node, cascade) {
        var i, $children, data = $tree.data();
        if ($node.attr('data-selected') === 'true' && gj.tree.events.unselect($tree, $node) !== false) {
            $node.removeClass($tree.data().style.active).removeAttr('data-selected');
            if (cascade) {
                $children = $node.find('ul li');
                for (i = 0; i < $children.length; i++) {
                    gj.tree.methods.unselect($tree, $($children[i]), cascade);
                }
            }
        }
    },

    getSelections: function ($list) {
        var i, $node, children,
            result = [],
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if ($node.attr('data-selected') === 'true') {
                    result.push($node.attr('data-id'));
                } else if ($node.has('ul')) {
                    children = gj.tree.methods.getSelections($node.children('ul'));
                    if (children.length) {
                        result = result.concat(children);
                    }
                }
            }
        }

        return result;
    },

    getById: function ($tree, id, records) {
        var i, result = undefined;
        for (i = 0; i < records.length; i++) {
            if (id == records[i].id) {
                result = records[i];
                break;
            } else if (records[i].children && records[i].children.length) {
                result = gj.tree.methods.getById($tree, id, records[i].children);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getDataById: function ($tree, id, records) {
        var result = gj.tree.methods.getById($tree, id, records);
        return result ? result.data : result;
    },

    getDataByText: function ($tree, text, records) {
        var i, id,
            result = undefined,
            data = $tree.data();
        for (i = 0; i < records.length; i++) {
            if (text === records[i].data[data.textField]) {
                result = records[i].data;
                break;
            } else if (records[i].children && records[i].children.length) {
                result = gj.tree.methods.getDataByText($tree, text, records[i].children);
                if (result) {
                    break;
                }
            }
        }
        return result;
    },

    getNodeById: function ($list, id) {
        var i, $node,
            $result = undefined,
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if (id == $node.attr('data-id')) {
                    $result = $node;
                    break;
                } else if ($node.has('ul')) {
                    $result = gj.tree.methods.getNodeById($node.children('ul'), id);
                    if ($result) {
                        break;
                    }
                }
            }
        }
        return $result;
    },

    getNodeByText: function ($list, text) {
        var i, $node,
            $result = undefined,
            $nodes = $list.children('li');
        if ($nodes && $nodes.length) {
            for (i = 0; i < $nodes.length; i++) {
                $node = $($nodes[i]);
                if (text === $node.children('[data-role="display"]').text()) {
                    $result = $node;
                    break;
                } else if ($node.has('ul')) {
                    $result = gj.tree.methods.getNodeByText($node.children('ul'), text);
                    if ($result) {
                        break;
                    }
                }
            }
        }
        return $result;
    },

    addNode: function ($tree, data, $parent, position) {
        var nodeData = gj.tree.methods.getRecords($tree, [data]);
        if (!$parent || !$parent.length) {
            $parent = $tree.children('ul');
        }
        
        gj.tree.methods.appendNode($tree, $parent, nodeData[0], undefined, position);

        return $tree;
    },

    remove: function ($tree, $node) {
        gj.tree.methods.removeDataById($tree, $node.attr('data-id'), $tree.data('records'));
        $node.remove();    
        return $tree;
    },

    removeDataById: function ($tree, id, records) {
        var i;
        for (i = 0; i < records.length; i++) {
            if (id == records[i].id) {
                records.splice(i, 1);
                break;
            } else if (records[i].children && records[i].children.length) {
                gj.tree.methods.removeDataById($tree, id, records[i].children);
            }
        }
    },

    destroy: function ($tree) {
        var data = $tree.data();
        if (data) {
            gj.tree.events.destroying($tree);
            $tree.xhr && $tree.xhr.abort();
            $tree.off();
            $tree.removeData();
            $tree.removeAttr('data-type');
            $tree.removeClass().empty();
        }
        return $tree;
    }
}
/**
  * @widget Tree
  * @plugin Base
  */
gj.tree.widget = function ($element, arguments) {
    var self = this,
        methods = gj.tree.methods;

    /**
     * Reload the tree.
     * @method
     * @param {object} params - Params that needs to be send to the server. Only in use for remote data sources.
     * @return jQuery object
     * @example Method.Sample <!-- tree.base -->
     * <button onclick="tree.reload()">Reload</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         autoLoad: false
     *     });
     * </script>
     */
    self.reload = function (params) {
        return gj.widget.prototype.reload.call(this, params);
    };

    /**
     * Render data in the tree
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the tree.
     * @fires dataBinding, dataBound
     * @return tree
     * @example sample <!-- tree.base -->
     * <div id="tree"></div>
     * <script>
     *     var tree, onSuccessFunc;
     *     onSuccessFunc = function (response) {
     *         //you can modify the response here if needed
     *         tree.render(response);
     *     };
     *     tree = $('#tree').tree({
     *         dataSource: { url: '/DataSources/GetCountries', success: onSuccessFunc }
     *     });
     * </script>
     */
    self.render = function (response) {
        return methods.render(this, response);
    };

    /**
     * Add node to the tree.
     * @method
     * @param {object} data - The node data.
     * @param {object} parentNode - Parent node as jquery object.
     * @param {Number} position - Position where the new node need to be added. 
     * @return jQuery object
     * @example Append.ToRoot <!-- tree.base -->
     * <button onclick="append()">Append Node</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree();
     *     function append() {
     *         tree.addNode({ text: 'New Node' });
     *     }
     * </script>
     * @example Append.Parent <!-- tree.base -->
     * <button onclick="append()">Append Node</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var parent, tree = $('#tree').tree();
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia').children('ul');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent);
     *     }
     * </script>
     * @example Bootstrap <!-- tree.base, bootstrap -->
     * <button onclick="append()">Append Node</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries" data-ui-library="bootstrap"></div>
     * <script>
     *     var parent, tree = $('#tree').tree();
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia').children('ul');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent);
     *     }
     * </script>
     * @example Prepend <!-- tree.base -->
     * <button onclick="append()">Append Node</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var parent, tree = $('#tree').tree();
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia').children('ul');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent, 1);
     *     }
     * </script>
     * @example Position <!-- tree.base -->
     * <button onclick="append()">Append Node</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var parent, tree = $('#tree').tree();
     *     tree.on('dataBound', function () {
     *         parent = tree.getNodeByText('Asia').children('ul');
     *         tree.off('dataBound');
     *     });
     *     function append() {
     *         tree.addNode({ text: 'New Node' }, parent, 2);
     *     }
     * </script>
     */
    self.addNode = function (data, $parentNode, position) {
        return methods.addNode(this, data, $parentNode, position);
    };

    /**
     * Remove node from the tree.
     * @method
     * @param {object} node - The node as jQuery object
     * @return jQuery object
     * @example Method.Sample <!-- tree.base -->
     * <button onclick="remove()">Remove USA</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries'
     *     });
     *     function remove() {
     *         var node = tree.getNodeByText('USA');
     *         tree.removeNode(node);
     *     }
     * </script>
     */
    self.removeNode = function ($node) {
        return methods.remove(this, $node);
    };

    /**
     * Destroy the tree.
     * @method
     * @return jQuery object
     * @example Method.Sample <!-- tree.base -->
     * <button onclick="tree.destroy()">Destroy</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries'
     *     });
     * </script>
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /**
     * Expand node from the tree.
     * @method
     * @param {object} node - The node as jQuery object
     * @param {boolean} cascade - Expand all children
     * @return jQuery object
     * @example Method.Sample <!-- tree.base -->
     * <button onclick="expand()">Expand Asia</button><button onclick="collapse()">Collapse Asia</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.expand(node);
     *     }
     *     function collapse() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.collapse(node);
     *     }
     * </script>
     * @example Cascade <!-- tree.base -->
     * <button onclick="expand()">Expand North America</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('North America');
     *         tree.expand(node, true);
     *     }
     * </script>
     */
    self.expand = function ($node, cascade) {
        return methods.expand(this, $node, cascade);
    };

    /**
     * Collapse node from the tree.
     * @method
     * @param {object} node - The node as jQuery object
     * @param {boolean} cascade - Collapse all children
     * @return jQuery object
     * @example Method.Sample <!-- tree.base -->
     * <button onclick="expand()">Expand Asia</button><button onclick="collapse()">Collapse Asia</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries'
     *     });
     *     function expand() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.expand(node);
     *     }
     *     function collapse() {
     *         var node = tree.getNodeByText('Asia');
     *         tree.collapse(node);
     *     }
     * </script>
     * @example Cascade <!-- tree.base -->
     * <button onclick="collapse()">Collapse North America</button>
     * <br/><br>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries'
     *     });
     *     function collapse() {
     *         var node = tree.getNodeByText('North America');
     *         tree.collapse(node, true);
     *     }
     * </script>
     */
    self.collapse = function ($node, cascade) {
        return methods.collapse(this, $node, cascade);
    };

    /**
     * Expand all tree nodes
     * @method
     * @return jQuery object
     * @example Sample <!-- tree.base -->
     * <button onclick="tree.expandAll()">Expand All</button><button onclick="tree.collapseAll()">Collapse All</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree();
     * </script>
     */
    self.expandAll = function () {
        return methods.expandAll(this);
    };

    /**
     * Collapse all tree nodes
     * @method
     * @return jQuery object
     * @example Sample <!-- tree.base -->
     * <button onclick="tree.expandAll()">Expand All</button><button onclick="tree.collapseAll()">Collapse All</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree();
     * </script>
     */
    self.collapseAll = function () {
        return methods.collapseAll(this);
    };

    /**
     * Return node data by id of the record.
     * @method
     * @param {string|number} id - The id of the record that needs to be returned
     * @return object
     * @example sample <!-- tree.base -->
     * <button id="btnGetData">Get Data</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     $('#btnGetData').on('click', function () {
     *         var data = tree.getDataById(9);
     *         alert('The population of ' + data.text + ' is ' + data.population);
     *     });
     * </script>
     */
    self.getDataById = function (id) {
        return methods.getDataById(this, id, this.data('records'));
    };

    /**
     * Return node data by text.
     * @method
     * @param {string} text - The text of the record that needs to be returned
     * @return object
     * @example sample <!-- tree.base -->
     * <button id="btnGetData">Get Data</button>
     * <br/><br/>
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *     });
     *     $('#btnGetData').on('click', function () {
     *         var data = tree.getDataByText('California');
     *         alert('The population of California is ' + data.population);
     *     });
     * </script>
     */
    self.getDataByText = function (text) {
        return methods.getDataByText(this, text, this.data('records'));
    };

    /**
     * Return node by id of the record.
     * @method
     * @param {string} id - The id of the node that needs to be returned
     * @return jQuery object
     * @example sample <!-- tree.base -->
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries',
     *         primaryKey: 'id' //define the name of the column that you want to use as ID here.
     *     });
     *     tree.on('dataBound', function() {
     *         var node = tree.getNodeById('1');
     *         node.css('background-color', 'red');
     *     });
     * </script>
     */
    self.getNodeById = function (id) {
        return methods.getNodeById(this.children('ul'), id);
    };

    /**
     * Return node by text.
     * @method
     * @param {string} text - The text in the node that needs to be returned
     * @return jQuery object
     * @example sample <!-- tree.base -->
     * <div id="tree"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         dataSource: '/DataSources/GetCountries'
     *     });
     *     tree.on('dataBound', function() {
     *         var node = tree.getNodeByText('Asia');
     *         node.css('background-color', 'red');
     *     });
     * </script>
     */
    self.getNodeByText = function (text) {
        return methods.getNodeByText(this.children('ul'), text);
    };

    /**
     * Select all tree nodes
     * @method
     * @return jQuery object
     * @example Sample <!-- tree.base -->
     * <button onclick="tree.selectAll()">Select All</button><button onclick="tree.unselectAll()">Unselect All</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         selectionType: 'multiple'
     *     });
     *     tree.on('dataBound', function() {
     *         tree.expandAll();
     *     });
     * </script>
     */
    self.selectAll = function () {
        return methods.selectAll(this);
    };

    /**
     * Unselect all tree nodes
     * @method
     * @return jQuery object
     * @example Sample <!-- tree.base -->
     * <button onclick="tree.selectAll()">Select All</button><button onclick="tree.unselectAll()">Unselect All</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         selectionType: 'multiple'
     *     });
     *     tree.on('dataBound', function() {
     *         tree.expandAll();
     *     });
     * </script>
     */
    self.unselectAll = function () {
        return methods.unselectAll(this);
    };

    /**
     * Return an array with the ids of the selected nodes.
     * @method
     * @return array
     * @example Sample <!-- tree.base -->
     * <button id="btnShowSelection">Show Selections</button>
     * <br/><br/>
     * <div id="tree" data-source="/DataSources/GetCountries"></div>
     * <script>
     *     var tree = $('#tree').tree({
     *         selectionType: 'multiple'
     *     });
     *     $('#btnShowSelection').on('click', function () {
     *         var selections = tree.getSelections();
     *         selections && selections.length && alert(selections.join());
     *     });
     * </script>
     */
    self.getSelections = function () {
        return methods.getSelections(this.children('ul'));
    };

    $.extend($element, self);
    if ('tree' !== $element.attr('data-type')) {
        methods.init.apply($element, arguments);
    }

    return $element;
};

gj.tree.widget.prototype = new gj.widget();
gj.tree.widget.constructor = gj.tree.widget;

(function ($) {
    $.fn.tree = function (method) {
        var $widget;        
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.tree.widget(this, arguments);
            } else {
                $widget = new gj.tree.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);