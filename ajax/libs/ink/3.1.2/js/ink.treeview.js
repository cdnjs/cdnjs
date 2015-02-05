/**
 * Elements in a tree structure
 * @module Ink.UI.TreeView_1
 * @version 1
 */
Ink.createModule('Ink.UI.TreeView', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, Element, Selector, InkArray ) {
    'use strict';


    /**
     * Shows elements in a tree structure which can be expanded and contracted.
     * A TreeView is built with "node"s and "children". "node"s are `li` tags, and "children" are `ul` tags.
     * You can build your TreeView out of a regular UL and  LI element structure which you already use to display lists with several levels.
     * If you want a node to be open when the TreeView is built, just add the data-open="true" attribute to it.
     * 
     * @class Ink.UI.TreeView
     * @constructor
     * @version 1
     * @param {String|Element}      selector                    Element or selector.
     * @param {String}              [options]                   Options object, containing:
     * @param {String}              [options.node]              Selector for the nodes. Defaults to 'li'.
     * @param {String}              [options.children]          Selector for the children. Defaults to 'ul'.
     * @param {String}              [options.parentClass]       CSS classes to be added to parent nodes. Defaults to 'parent'.
     * @param {String}              [options.openClass]         CSS classes to be added to the icon when a parent is open. Defaults to 'fa fa-minus-circle'.
     * @param {String}              [options.closedClass]       CSS classes to be added to the icon when a parent is closed. Defaults to 'fa fa-plus-circle'.
     * @param {String}              [options.hideClass]         CSS Class to toggle visibility of the children. Defaults to 'hide-all'.
     * @param {String}              [options.iconTag]           The name of icon tag. The component tries to find a tag with that name as a direct child of the node. If it doesn't find it, it creates it. Defaults to 'i'.
     * @param {Boolean}             [options.stopDefault]       Flag to stops the default behavior of the click handler. Defaults to true.
     * @example
     *      <ul class="ink-tree-view">
     *        <li data-open="true"><a href="#">root</a>
     *          <ul>
     *            <li><a href="#">child 1</a></li>
     *            <li><a href="#">child 2</a>
     *              <ul>
     *                <li><a href="#">grandchild 2a</a></li>
     *                <li><a href="#">grandchild 2b</a>
     *                  <ul>
     *                    <li><a href="#">grandgrandchild 1bA</a></li>
     *                    <li><a href="#">grandgrandchild 1bB</a></li>
     *                  </ul>
     *                </li>
     *              </ul>
     *            </li>
     *            <li><a href="#">child 3</a></li>
     *          </ul>
     *        </li>
     *      </ul>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.TreeView_1'], function( Selector, TreeView ){
     *              var treeViewElement = Ink.s('.ink-tree-view');
     *              var treeViewObj = new TreeView( treeViewElement );
     *          });
     *      </script>
     * 
     * @sample Ink_UI_TreeView_1.html
     */
    function TreeView() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    TreeView._name = 'TreeView_1';

    TreeView._optionDefinition = {
        'node':   ['String', 'li'],
        'children':  ['String','ul'],
        'parentClass': ['String','parent'],
        'openNodeClass': ['String', 'open'],
        'openClass': ['String','fa fa-minus-circle'],
        'closedClass': ['String','fa fa-plus-circle'],
        'hideClass': ['String','hide-all'],
        'iconTag': ['String', 'i'],
        'stopDefault' : ['Boolean', true]
    };

    TreeView.prototype = {
        /**
         * Init function called by the constructor. Sets the necessary event handlers.
         * 
         * @method _init
         * @private
         */
        _init: function(){
            this._handlers = {
                click: Ink.bindEvent(this._onClick,this)
            };

            Event.on(this._element, 'click', this._options.node, this._handlers.click);

            InkArray.each(Ink.ss(this._options.node, this._element), Ink.bind(function(item){
                if( this.isParent(item) ) {
                    Css.addClassName(item, this._options.parentClass);

                    var isOpen = this.isOpen(item);
                    if( !this._getIcon(item) ){
                        Element.create(this._options.iconTag, { insertTop: item });
                    }

                    this._setNodeOpen(item, isOpen);
                }
            },this));
        },

        _getIcon: function (node) {
            return Ink.s('> ' + this._options.iconTag, node);
        },

        /**
         * Checks if a node is open.
         *
         * @method isOpen
         * @param {Element} node  The tree node to check
         * @return {Boolean} Whether the node is open.
         **/
        isOpen: function (node) {
            if (!this._getChild(node)) {
                throw new Error('not a node!');
            }

            return node.getAttribute('data-open') === 'true' ||
                Css.hasClassName(node, this._options.openNodeClass);
        },

        /**
         * Checks if a node is a parent.
         *
         * @method isParent
         * @param {Element} node     Node to check
         * @return {Boolean} Whether `node` is a parent.
         **/
        isParent: function (node) {
            return Css.hasClassName(node, this._options.parentClass) ||
                this._getChild(node) != null;
        },

        _setNodeOpen: function (node, beOpen) {
            var child = this._getChild(node);
            if (child) {
                Css.setClassName(child, this._options.hideClass, !beOpen);
                var icon = this._getIcon(node);

                node.setAttribute('data-open', beOpen);

                /*
                 * Don't refactor this to
                 *
                 * setClassName(el, className, status); setClassName(el, className, !status);
                 *
                 * because it won't work with multiple classes.
                 *
                 * Doing:
                 * setClassName(el, 'fa fa-whatever', true);setClassName(el, 'fa fa-whatever-else', false);
                 *
                 * will remove 'fa' although it is a class we want.
                 */

                var toAdd = beOpen ? this._options.openClass : this._options.closedClass;
                var toRemove = beOpen ? this._options.closedClass : this._options.openClass;
                Css.removeClassName(icon, toRemove);
                Css.addClassName(icon, toAdd);

                Css.setClassName(node, this._options.openNodeClass, beOpen);
            } else {
                Ink.error('Ink.UI.TreeView: node', node, 'is not a node!');
            }
        },

        /**
         * Opens one of the tree nodes
         *
         * Make sure you pass the node's Element
         * @method open
         * @param {Element} node     The node you wish to open.
         * @return {void}
         **/
        open: function (node) {
            this._setNodeOpen(node, true);
        },

        /**
         * Closes one of the tree nodes
         *
         * Make sure you pass the node's Element
         * @method close
         * @param {Element} node     The node you wish to close.
         * @return {void}
         **/
        close: function (node) {
            this._setNodeOpen(node, false);
        },

        /**
         * Toggles a node state
         *
         * @method toggle
         * @param {Element} node     The node to toggle.
         * @return {void}
         **/
        toggle: function (node) {
            if (this.isOpen(node)) {
                this.close(node);
            } else {
                this.open(node);
            }
        },

        /**
         * @method _getChild
         **/
        _getChild: function (node) {
            return Selector.select(this._options.children, node)[0] || null;
        },

        /**
         * Handles the click event (as specified in the _init function).
         * 
         * @method _onClick
         * @param {Event} ev DOM click event.
         * @return {void}
         * @private
         */
        _onClick: function(ev){
            /**
             * Summary:
             * If the clicked element is a "node" as defined in the options, will check if it has any "child".
             * If so, will toggle its state and stop the event's default behavior if the stopDefault option is true.
             **/

            if (!this.isParent(ev.currentTarget) ||
                    Selector.matchesSelector(ev.target, this._options.node) ||
                    Selector.matchesSelector(ev.target, this._options.children)) {
                return;
            }

            if (this._options.stopDefault){
                ev.preventDefault();
            }

            this.toggle(ev.currentTarget);
        }
    };

    Common.createUIComponent(TreeView);

    return TreeView;
});
