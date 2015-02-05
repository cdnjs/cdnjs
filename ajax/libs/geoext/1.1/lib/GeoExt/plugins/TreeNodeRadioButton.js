/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

 /**
  * @include GeoExt/widgets/tree/TreeNodeUIEventMixin.js
  */
Ext.namespace("GeoExt.plugins");

/** api: (define)
 *  module = GeoExt.plugins
 *  class = TreeNodeRadioButton
 */

/** api: constructor
 *  A plugin to create tree node UIs with radio buttons. Can be plugged into
 *  any ``Ext.tree.TreePanel`` and will be applied to nodes that are extended
 *  with the :class:`GeoExt.Tree.TreeNodeUIEventMixin`, in particular
 *  :class:`GeoExt.tree.LayerNodeUI` nodes.
 *
 *  A tree with a ``GeoExt.plugins.TreeNodeRadioButton`` fires the additional
 *  ``radiochange`` event when a node's radio button is clicked.
 *
 *  Only if a node is configured ``radioGroup`` attribute, it will be rendered
 *  with a radio button next to its icon. The ``radioGroup`` works like a
 *  HTML checkbox with its ``name`` attribute, and ``radioGroup`` is a string
 *  that identifies the options group.
 * 
 */

/** api: example
 *  Sample code to create a tree with a node that has a radio button:
 *
 *  .. code-block:: javascript
 *
 *      var UIClass = Ext.extend(
 *          Ext.tree.TreeNodeUI,
 *          GeoExt.tree.TreeNodeUIEventMixin
 *      );
 *      var tree = new Ext.tree.TreePanel({
 *          plugins: [
 *              new GeoExt.plugins.TreeNodeRadioButton({
 *                  listeners: {
 *                      "radiochange": function(node) {
 *                          alert(node.text + "'s radio button was clicked.");
 *                      }
 *                  }
 *              })
 *          ],
 *          root: {
 *              nodeType: "node",
 *              uiProvider: UIClass,
 *              text: "My Node",
 *              radioGroup: "myGroupId"
 *          }
 *      }
 */

GeoExt.plugins.TreeNodeRadioButton = Ext.extend(Ext.util.Observable, {
    
    /** private: method[constructor]
     *  :param config: ``Object``
     */
    constructor: function(config) {
        Ext.apply(this.initialConfig, Ext.apply({}, config));
        Ext.apply(this, config);

        this.addEvents(

            /** api: event[radiochange]
             *  Fires when a radio button is clicked.
             *
             *  Listener arguments:
             *  
             *  * node - ``Ext.TreeNode`` The node of the clicked radio button.
             */
            "radiochange"
        );

        GeoExt.plugins.TreeNodeRadioButton.superclass.constructor.apply(this, arguments);
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
        var a = node.attributes;
        if(a.radioGroup && !a.radio) {
            a.radio = Ext.DomHelper.insertBefore(node.ui.anchor,
                ['<input type="radio" class="gx-tree-radio" name="',
                a.radioGroup, '_radio"></input>'].join(""));
        }
    },
    
    /** private: method[onRawClickNode]
     *  :param node: ``Ext.tree.TreeNode``
     *  :param e: ``Ext.EventObject``
     */
    onRawClickNode: function(node, e) {
        var el = e.getTarget('.gx-tree-radio', 1); 
        if(el) {
            el.defaultChecked = el.checked;
            this.fireEvent("radiochange", node);
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

/** api: ptype = gx_treenoderadiobutton */
Ext.preg("gx_treenoderadiobutton", GeoExt.plugins.TreeNodeRadioButton);
