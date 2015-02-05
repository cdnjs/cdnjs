/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

Ext.namespace("GeoExt.tree");

/** api: (define)
 *  module = GeoExt.tree
 *  class = TreeNodeUIEventMixin
 */

/** api: constructor
 *  A mixin that adds events to TreeNodeUIs. With these events, tree plugins
 *  can modify the node ui's DOM when it is rendered, and react to raw click
 *  events on tree nodes.
 */

 /** api: example
  *  Sample code to create a tree with a node that uses the
  *  :class:`GeoExt.tree.TreeNodeUIEventMixin`:
  *
  *  .. code-block:: javascript
  *
  *      var UIClass = Ext.extend(
  *          Ext.tree.TreeNodeUI,
  *          GeoExt.tree.TreeNodeUIEventMixin
  *      );
  *      var tree = new Ext.tree.TreePanel({
  *          root: {
  *              nodeType: "node",
  *              uiProvider: UIClass,
  *              text: "My Node"
  *          }
  *      }
  */

GeoExt.tree.TreeNodeUIEventMixin = function(){
    return {
        
        constructor: function(node) {
            
            node.addEvents(

                /** api: event[rendernode]
                 *  Fires on the tree when a node is rendered.
                 *
                 *  Listener arguments:
                 *  
                 *  * node - ``Ext.TreeNode`` The rendered node.
                 */
                "rendernode",

                /** api: event[rawclicknode]
                 *  Fires on the tree when a node is clicked.
                 *
                 *  Listener arguments:
                 *  
                 *  * node - ``Ext.TreeNode`` The clicked node.
                 *  * event - ``Ext.EventObject`` The click event.
                 */
                "rawclicknode"
            );
            this.superclass = arguments.callee.superclass;
            this.superclass.constructor.apply(this, arguments);
            
        },
        
        /** private: method[render]
         *  :param bulkRender: ``Boolean``
         */
        render: function(bulkRender) {
            if(!this.rendered) {
                this.superclass.render.apply(this, arguments);
                this.fireEvent("rendernode", this.node);
            }
        },
        
        /** private: method[onClick]
         *  :param e: ``Ext.EventObject``
         */
        onClick: function(e) {
            if(this.fireEvent("rawclicknode", this.node, e) !== false) {
                this.superclass.onClick.apply(this, arguments);
            }
        }
    };
};
