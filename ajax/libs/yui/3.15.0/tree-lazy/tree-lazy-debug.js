/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

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
var EVT_BEFORE_LOAD = 'beforeLoad';

/**
Fired when the `load()` method indicates there was an error loading child nodes.

@event error
@param {Error} error Error provided by the `load()` method.
@param {String} src Source of the error (defaults to "load").
**/
var EVT_ERROR = 'error';

/**
Fired after child nodes have finished loading and have been added to the tree.

@event load
@param {Tree.Node} node Tree node whose children have been loaded.
**/
var EVT_LOAD = 'load';

Y.namespace('Plugin.Tree').Lazy = Y.Base.create('lazyTreePlugin', Y.Plugin.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------
    initializer: function (config) {
        this._host = config.host;

        if (config.load) {
            this.load = config.load;
        }

        // Make sure we've been plugged into a Tree that mixes in the
        // Tree.Openable extension.
        if (!this._host.openNode) {
            Y.log("Plugin.Tree.Lazy was plugged into a Tree that doesn't mix in the Tree.Openable extension. This probably won't do you much good.", 'warn', 'tree-lazy');
        }

        this._published = {};
        this._attachEvents();
    },

    // -- Public Methods -------------------------------------------------------
    load: function (node, callback) {
        callback(new Error('Plugin.Tree.Lazy: Please provide a custom `load` method when instantiating this plugin.'));
    },

    // -- Protected Methods ----------------------------------------------------
    _attachEvents: function () {
        this.onHostEvent('open', this._onOpen);
    },

    // -- Protected Event Handlers ---------------------------------------------
    _onOpen: function (e) {
        var node = e.node;

        // Nothing to do if this node can't have children or if its children
        // have already been (or are already being) loaded.
        if (!node.canHaveChildren || node.state.loaded || node.state.loading) {
            return;
        }

        if (!this._published[EVT_BEFORE_LOAD]) {
            this._published[EVT_BEFORE_LOAD] = this.publish(EVT_BEFORE_LOAD, {
                defaultFn: this._defLoadingFn
            });
        }

        this.fire(EVT_BEFORE_LOAD, {node: node});
    },

    // -- Default Event Handlers -----------------------------------------------
    _defLoadingFn: function (e) {
        var node = e.node,
            self = this;

        node.state.loading = true;

        this.load(node, function (err) {
            delete node.state.loading;

            if (err) {
                self.fire(EVT_ERROR, {
                    error: err,
                    src  : 'load'
                });

                return;
            }

            node.state.loaded = true;

            self.fire(EVT_LOAD, {node: node});
        });
    }
}, {
    NS: 'lazy'
});


}, '3.15.0', {"requires": ["base-pluginhost", "plugin", "tree"]});
