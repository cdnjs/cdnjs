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
 *  class = TreeNodeComponent
 */

/** api: constructor
 *  A plugin to create tree node UIs that can have an Ext.Component below the
 *  node's title. Can be plugged into any ``Ext.tree.TreePanel`` and will be
 *  applied to nodes that are extended with the
 *  :class:`GeoExt.Tree.TreeNodeUIEventMixin`.
 *
 *  If a node is configured with a ``component`` attribute, it will be rendered
 *  with the component in addition to icon and title.
 */

/** api: example
 *  Sample code to create a tree with a node that has a component:
 *
 *  .. code-block:: javascript
 *
 *      var uiClass = Ext.extend(
 *          Ext.tree.TreeNodeUI,
 *          GeoExt.tree.TreeNodeUIEventMixin
 *      );
 *      var tree = new Ext.tree.TreePanel({
 *          plugins: [
 *              new GeoExt.plugins.TreeNodeComponent(),
 *          ],
 *          root: {
 *              nodeType: "node",
 *              uiProvider: uiClass,
 *              text: "My Node",
 *              component: {
 *                  xtype: "box",
 *                  autoEl: {
 *                      tag: "img",
 *                      src: "/images/my-image.jpg"
 *                  }
 *              }
 *          }
 *      }
 */

GeoExt.plugins.TreeNodeComponent = Ext.extend(Ext.util.Observable, {
    
    /** private: method[constructor]
     *  :param config: ``Object``
     */
    constructor: function(config) {
        Ext.apply(this.initialConfig, Ext.apply({}, config));
        Ext.apply(this, config);

        GeoExt.plugins.TreeNodeComponent.superclass.constructor.apply(this, arguments);
    },

    /** private: method[init]
     *  :param tree: ``Ext.tree.TreePanel`` The tree.
     */
    init: function(tree) {
        tree.on({
            "rendernode": this.onRenderNode,
            "beforedestroy": this.onBeforeDestroy,
            scope: this
        });
    },
    
    /** private: method[onRenderNode]
     *  :param node: ``Ext.tree.TreeNode``
     */
    onRenderNode: function(node) {
        var rendered = node.rendered;
        var attr = node.attributes;
        var component = attr.component || this.component;
        if(!rendered && component) {
            var elt = Ext.DomHelper.append(node.ui.elNode, [
                {"tag": "div"}
            ]);
            if(typeof component == "function") {
                component = component(node, elt);
            } else if (typeof component == "object" &&
                       typeof component.fn == "function") {
                component = component.fn.apply(
                    component.scope, [node, elt]
                );
            }
            if(typeof component == "object" &&
               typeof component.xtype == "string") {
                component = Ext.ComponentMgr.create(component);
            }
            if(component instanceof Ext.Component) {
                component.render(elt);
                node.component = component;
            }
        }
    },
    
    /** private: method[onBeforeDestroy]
     */
    onBeforeDestroy: function(tree) {
        tree.un("rendernode", this.onRenderNode, this);
        tree.un("beforedestroy", this.onBeforeDestroy, this);
    }

});

/** api: ptype = gx_treenodecomponent */
Ext.preg("gx_treenodecomponent", GeoExt.plugins.TreeNodeComponent);
