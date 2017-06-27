/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

Ext.namespace("GeoExt.plugins");

/** api: (define)
 *  module = GeoExt.plugins
 *  class = TreeNodeActions
 */

/** api: constructor
 *  A plugin to create tree node UIs with actions.
 *
 *  An action is a clickable image in a tree node, which, when clicked,
 *  leads to an "action" event being triggered by the node.
 *
 *  To set actions in a node an ``actions`` property must be provided in
 *  the node config options. This property  is an array of 
 *  action objects, each action object has the following property:
 *
 *  * "action" ``String`` the name of the action. It is used as
 *    the name of the ``<img>`` class. The ``img`` tag being placed in a
 *    div whose class is "gx-tree-layer-actions" a CSS selector for the
 *    action is ``.gx-tree-layer-actions .action-name``. The name of the
 *    action is also provided in the "action" event for listeners to know
 *    which action got clicked. (required)
 *  * "qtip" ``String`` the tooltip displayed when the action
 *    image is hovered. (required)
 *  * "update" ``Function`` a function executed after the action is
 *    rendered in the node, it receives the ``Ext.Element`` object
 *    representing the image and executes with the node as its
 *    scope. For example, this function can be used to hide the
 *    action based on some condition. (optional)
 */

/** api: example
 *  Sample code to create a layer node UI with an actions plugin:
 *
 *  .. code-block:: javascript
 *
 *      var uiClass = GeoExt.examples.LayerNodeUI = Ext.extend(
 *         GeoExt.tree.LayerNodeUI,
 *         new GeoExt.tree.TreeNodeUIEventMixin()
 *      );
 *
 *      // this function takes action based on the "action"
 *      // parameter, it is used as a listener to layer
 *      // nodes' "action" events
 *      function onAction(node, action, evt) {
 *          var layer = node.layer;
 *          switch(action) {
 *          case "delete":
 *              layer.destroy();
 *              break;
 *          }
 *      };
 *
 *      var tree = new Ext.tree.TreePanel({
 *          region: "west",
 *          width: 250,
 *          title: "Layer Tree",
 *          loader: {
 *              applyLoader: false,
 *              uiProviders: {
 *                  "ui": GeoExt.examples.LayerNodeUI
 *              }
 *          },
 *          // apply the tree node actions plugin to layer nodes
 *          plugins: [{
 *              ptype: "gx_treenodeactions",
 *              listeners: {
 *                  action: onAction
 *              }
 *          }],
 *          root: {
 *              nodeType: "gx_layercontainer",
 *              loader: {
 *                  baseAttrs: {
 *                      radioGroup: "radiogroup",
 *                      uiProvider: "ui",
 *                      actions: [{
 *                          action: "delete",
 *                          qtip: "delete"
 *                      }]
 *                  }
 *              }
 *          },
 *          rootVisible: false
 *      });
 */

GeoExt.plugins.TreeNodeActions = Ext.extend(Ext.util.Observable, { 
    /** private: constant[actionsCls]
     */
    actionsCls: "gx-tree-layer-actions",
 
    /** private: constant[actionCls]
     */
    actionCls: "gx-tree-layer-action",

    /** private: method[constructor]
     *  :param config: ``Object``
     */
    constructor: function(config) {
        Ext.apply(this.initialConfig, Ext.apply({}, config));
        Ext.apply(this, config);

        this.addEvents(

            /** api: event[radiochange]
             *  Fires when an action image is clicked.
             *
             *  Listener arguments:
             *  
             *  * node - ``Ext.TreeNode`` The node of the clicked action image.
             */
            "action"
        );

        GeoExt.plugins.TreeNodeActions.superclass.constructor.apply(this, arguments);
    },

    /** private: method[init]
     *  :param tree: ``Ext.tree.TreePanel`` The tree.
     */
    init: function(tree) {
        tree.on({
            "rendernode": this.onRenderNode,
            "rawclicknode": this.onRawClickNode,
            "beforedestroy": this.onBeforeDestroy,
            scope: this
        });
    },

    /** private: method[onRenderNode]
     *  :param node: ``Ext.tree.TreeNode``
     */
    onRenderNode: function(node) {
        var rendered = node.rendered;
        if(!rendered) {
            var attr = node.attributes;
            var actions = attr.actions || this.actions;
            if(actions && actions.length > 0) {
                var html = ['<div class="', this.actionsCls, '">'];
                for(var i=0,len=actions.length; i<len; i++) {
                    var a = actions[i];
                    html = html.concat([
                        '<img id="'+node.id+'_'+a.action,
                        '" ext:qtip="'+a.qtip,
                        '" src="'+Ext.BLANK_IMAGE_URL,
                        '" class="'+this.actionCls+' '+a.action+'" />'
                    ]);
                }
                html.concat(['</div>']);
                Ext.DomHelper.insertFirst(node.ui.elNode, html.join(""));
            }
            if (node.layer && node.layer.map) {
                this.updateActions(node);
            } else if (node.layerStore) {
                node.layerStore.on({
                    'bind': function() {
                        this.updateActions(node);
                    },
                    scope: this
                });
            }
        }
    },

    /** private: method[updateActions]
     *
     *  Update all the actions.
     */
    updateActions: function(node) {
        var actions = node.attributes.actions || this.actions || [];
        Ext.each(actions, function(a, index) {
            var el = Ext.get(node.id + '_' + a.action);
            if (el && typeof a.update == "function") {
                a.update.call(node, el);
            }
        });
    },
 
    /** private: method[onRawClickNode]
     *  :param node: ``Ext.tree.TreeNode``
     *  :param e: ``Ext.EventObject``
     */
    onRawClickNode: function(node, e) {
        if(e.getTarget('.' + this.actionCls, 1)) {
            var t = e.getTarget('.' + this.actionCls, 1);
            var action = t.className.replace(this.actionCls + ' ', '');
            this.fireEvent("action", node, action, e);
            return false;
        }
    },
    
    /** private: method[onBeforeDestroy]
     */
    onBeforeDestroy: function(tree) {
        tree.un("rendernode", this.onRenderNode, this);
        tree.un("rawclicknode", this.onRawClickNode, this);
        tree.un("beforedestroy", this.onBeforeDestroy, this);
    }
});

/** api: ptype = gx_treenodeactions */
Ext.preg("gx_treenodeactions", GeoExt.plugins.TreeNodeActions);
