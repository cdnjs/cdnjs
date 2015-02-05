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
_yuitest_coverage["build/tree-lazy/tree-lazy.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/tree-lazy/tree-lazy.js",
    code: []
};
_yuitest_coverage["build/tree-lazy/tree-lazy.js"].code=["YUI.add('tree-lazy', function (Y, NAME) {","","/*jshint expr:true, maxlen:200, onevar:false */","","/**","Provides `Plugin.Tree.Lazy`, a plugin for `Tree.Openable` that makes it easy to","lazily load and populate the contents of tree nodes the first time they're","opened.","","@module tree","@submodule tree-lazy","**/","","/**","A plugin for `Tree.Openable` that makes it easy to lazily load and populate the","contents of tree nodes the first time they're opened.","","### Example","","    YUI().use('jsonp', 'tree-openable', 'tree-lazy', function (Y) {","        var Tree = Y.Base.create('openableTree', Y.Tree, [Y.Tree.Openable]),","            tree = new Tree();","","        tree.plug(Y.Plugin.Tree.Lazy, {","","            // Custom function that Plugin.Tree.Lazy will call when it needs to","            // load the children for a node.","            load: function (node, callback) {","                // Request the data for this node's children via JSONP.","                Y.jsonp('http://example.com/api/data?callback={callback}', function (data) {","                    // If we didn't get any data back, treat this as an error.","                    if (!data) {","                        callback(new Error('No data!'));","                        return;","                    }","","                    // Append the children to the node (assume `data.children` is","                    // an array of child node data for the sake of this example).","                    node.append(data.children);","","                    // Call the callback function to tell Plugin.Tree.Lazy that","                    // we're done loading data.","                    callback();","                });","            }","","        });","    });","","@class Plugin.Tree.Lazy","@param {Object} config Config object.","","    @param {Function} config.load Custom `load()` function that will be called","        when a node's children need to be loaded. This function must call the","        provided callback to indicate completion.","","        @param {Function} config.load.callback Callback function. The custom","            `load()` function must call this callback to indicate completion.","","            @param {Error} [config.load.callback.err] Error object. If provided,","                the load action will be considered a failure, and an `error`","                event will be fired. Omit this argument (or set it to `null`) to","                indicate success.","","@extends Plugin.Base","@constructor","**/","","/**","Fired just before the custom `load()` method is called to load child nodes for a","node.","","Calling `preventDefault()` on this event's facade will cancel the load action","and prevent the `load()` method from being called.","","@event beforeLoad","@param {Tree.Node} node Tree node whose children will be loaded.","@preventable _defBeforeLoadFn","**/","var EVT_BEFORE_LOAD = 'beforeLoad';","","/**","Fired when the `load()` method indicates there was an error loading child nodes.","","@event error","@param {Error} error Error provided by the `load()` method.","@param {String} src Source of the error (defaults to \"load\").","**/","var EVT_ERROR = 'error';","","/**","Fired after child nodes have finished loading and have been added to the tree.","","@event load","@param {Tree.Node} node Tree node whose children have been loaded.","**/","var EVT_LOAD = 'load';","","Y.namespace('Plugin.Tree').Lazy = Y.Base.create('lazyTreePlugin', Y.Plugin.Base, [], {","    // -- Lifecycle Methods ----------------------------------------------------","    initializer: function (config) {","        this._host = config.host;","","        if (config.load) {","            this.load = config.load;","        }","","        // Make sure we've been plugged into a Tree that mixes in the","        // Tree.Openable extension.","        if (!this._host.openNode) {","        }","","        this._published = {};","        this._attachEvents();","    },","","    // -- Public Methods -------------------------------------------------------","    load: function (node, callback) {","        callback(new Error('Plugin.Tree.Lazy: Please provide a custom `load` method when instantiating this plugin.'));","    },","","    // -- Protected Methods ----------------------------------------------------","    _attachEvents: function () {","        this.onHostEvent('open', this._onOpen);","    },","","    // -- Protected Event Handlers ---------------------------------------------","    _onOpen: function (e) {","        var node = e.node;","","        // Nothing to do if this node can't have children or if its children","        // have already been (or are already being) loaded.","        if (!node.canHaveChildren || node.state.loaded || node.state.loading) {","            return;","        }","","        if (!this._published[EVT_BEFORE_LOAD]) {","            this._published[EVT_BEFORE_LOAD] = this.publish(EVT_BEFORE_LOAD, {","                defaultFn: this._defLoadingFn","            });","        }","","        this.fire(EVT_BEFORE_LOAD, {node: node});","    },","","    // -- Default Event Handlers -----------------------------------------------","    _defLoadingFn: function (e) {","        var node = e.node,","            self = this;","","        node.state.loading = true;","","        this.load(node, function (err) {","            delete node.state.loading;","","            if (err) {","                self.fire(EVT_ERROR, {","                    error: err,","                    src  : 'load'","                });","","                return;","            }","","            node.state.loaded = true;","","            self.fire(EVT_LOAD, {node: node});","        });","    }","}, {","    NS: 'lazy'","});","","","}, '@VERSION@', {\"requires\": [\"base-pluginhost\", \"plugin\", \"tree\"]});"];
_yuitest_coverage["build/tree-lazy/tree-lazy.js"].lines = {"1":0,"80":0,"89":0,"97":0,"99":0,"102":0,"104":0,"105":0,"110":0,"113":0,"114":0,"119":0,"124":0,"129":0,"133":0,"134":0,"137":0,"138":0,"143":0,"148":0,"151":0,"153":0,"154":0,"156":0,"157":0,"162":0,"165":0,"167":0};
_yuitest_coverage["build/tree-lazy/tree-lazy.js"].functions = {"initializer:101":0,"load:118":0,"_attachEvents:123":0,"_onOpen:128":0,"(anonymous 2):153":0,"_defLoadingFn:147":0,"(anonymous 1):1":0};
_yuitest_coverage["build/tree-lazy/tree-lazy.js"].coveredLines = 28;
_yuitest_coverage["build/tree-lazy/tree-lazy.js"].coveredFunctions = 7;
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 1);
YUI.add('tree-lazy', function (Y, NAME) {

/*jshint expr:true, maxlen:200, onevar:false */

/**
Provides `Plugin.Tree.Lazy`, a plugin for `Tree.Openable` that makes it easy to
lazily load and populate the contents of tree nodes the first time they're
opened.

@module tree
@submodule tree-lazy
**/

/**
A plugin for `Tree.Openable` that makes it easy to lazily load and populate the
contents of tree nodes the first time they're opened.

### Example

    YUI().use('jsonp', 'tree-openable', 'tree-lazy', function (Y) {
        var Tree = Y.Base.create('openableTree', Y.Tree, [Y.Tree.Openable]),
            tree = new Tree();

        tree.plug(Y.Plugin.Tree.Lazy, {

            // Custom function that Plugin.Tree.Lazy will call when it needs to
            // load the children for a node.
            load: function (node, callback) {
                // Request the data for this node's children via JSONP.
                Y.jsonp('http://example.com/api/data?callback={callback}', function (data) {
                    // If we didn't get any data back, treat this as an error.
                    if (!data) {
                        callback(new Error('No data!'));
                        return;
                    }

                    // Append the children to the node (assume `data.children` is
                    // an array of child node data for the sake of this example).
                    node.append(data.children);

                    // Call the callback function to tell Plugin.Tree.Lazy that
                    // we're done loading data.
                    callback();
                });
            }

        });
    });

@class Plugin.Tree.Lazy
@param {Object} config Config object.

    @param {Function} config.load Custom `load()` function that will be called
        when a node's children need to be loaded. This function must call the
        provided callback to indicate completion.

        @param {Function} config.load.callback Callback function. The custom
            `load()` function must call this callback to indicate completion.

            @param {Error} [config.load.callback.err] Error object. If provided,
                the load action will be considered a failure, and an `error`
                event will be fired. Omit this argument (or set it to `null`) to
                indicate success.

@extends Plugin.Base
@constructor
**/

/**
Fired just before the custom `load()` method is called to load child nodes for a
node.

Calling `preventDefault()` on this event's facade will cancel the load action
and prevent the `load()` method from being called.

@event beforeLoad
@param {Tree.Node} node Tree node whose children will be loaded.
@preventable _defBeforeLoadFn
**/
_yuitest_coverfunc("build/tree-lazy/tree-lazy.js", "(anonymous 1)", 1);
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 80);
var EVT_BEFORE_LOAD = 'beforeLoad';

/**
Fired when the `load()` method indicates there was an error loading child nodes.

@event error
@param {Error} error Error provided by the `load()` method.
@param {String} src Source of the error (defaults to "load").
**/
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 89);
var EVT_ERROR = 'error';

/**
Fired after child nodes have finished loading and have been added to the tree.

@event load
@param {Tree.Node} node Tree node whose children have been loaded.
**/
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 97);
var EVT_LOAD = 'load';

_yuitest_coverline("build/tree-lazy/tree-lazy.js", 99);
Y.namespace('Plugin.Tree').Lazy = Y.Base.create('lazyTreePlugin', Y.Plugin.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        _yuitest_coverfunc("build/tree-lazy/tree-lazy.js", "initializer", 101);
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 102);
this._host = config.host;

        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 104);
if (config.load) {
            _yuitest_coverline("build/tree-lazy/tree-lazy.js", 105);
this.load = config.load;
        }

        // Make sure we've been plugged into a Tree that mixes in the
        // Tree.Openable extension.
        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 110);
if (!this._host.openNode) {
        }

        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 113);
this._published = {};
        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 114);
this._attachEvents();
    },

    // -- Public Methods -------------------------------------------------------
    load: function (node, callback) {
        _yuitest_coverfunc("build/tree-lazy/tree-lazy.js", "load", 118);
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 119);
callback(new Error('Plugin.Tree.Lazy: Please provide a custom `load` method when instantiating this plugin.'));
    },

    // -- Protected Methods ----------------------------------------------------
    _attachEvents: function () {
        _yuitest_coverfunc("build/tree-lazy/tree-lazy.js", "_attachEvents", 123);
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 124);
this.onHostEvent('open', this._onOpen);
    },

    // -- Protected Event Handlers ---------------------------------------------
    _onOpen: function (e) {
        _yuitest_coverfunc("build/tree-lazy/tree-lazy.js", "_onOpen", 128);
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 129);
var node = e.node;

        // Nothing to do if this node can't have children or if its children
        // have already been (or are already being) loaded.
        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 133);
if (!node.canHaveChildren || node.state.loaded || node.state.loading) {
            _yuitest_coverline("build/tree-lazy/tree-lazy.js", 134);
return;
        }

        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 137);
if (!this._published[EVT_BEFORE_LOAD]) {
            _yuitest_coverline("build/tree-lazy/tree-lazy.js", 138);
this._published[EVT_BEFORE_LOAD] = this.publish(EVT_BEFORE_LOAD, {
                defaultFn: this._defLoadingFn
            });
        }

        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 143);
this.fire(EVT_BEFORE_LOAD, {node: node});
    },

    // -- Default Event Handlers -----------------------------------------------
    _defLoadingFn: function (e) {
        _yuitest_coverfunc("build/tree-lazy/tree-lazy.js", "_defLoadingFn", 147);
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 148);
var node = e.node,
            self = this;

        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 151);
node.state.loading = true;

        _yuitest_coverline("build/tree-lazy/tree-lazy.js", 153);
this.load(node, function (err) {
            _yuitest_coverfunc("build/tree-lazy/tree-lazy.js", "(anonymous 2)", 153);
_yuitest_coverline("build/tree-lazy/tree-lazy.js", 154);
delete node.state.loading;

            _yuitest_coverline("build/tree-lazy/tree-lazy.js", 156);
if (err) {
                _yuitest_coverline("build/tree-lazy/tree-lazy.js", 157);
self.fire(EVT_ERROR, {
                    error: err,
                    src  : 'load'
                });

                _yuitest_coverline("build/tree-lazy/tree-lazy.js", 162);
return;
            }

            _yuitest_coverline("build/tree-lazy/tree-lazy.js", 165);
node.state.loaded = true;

            _yuitest_coverline("build/tree-lazy/tree-lazy.js", 167);
self.fire(EVT_LOAD, {node: node});
        });
    }
}, {
    NS: 'lazy'
});


}, '@VERSION@', {"requires": ["base-pluginhost", "plugin", "tree"]});
