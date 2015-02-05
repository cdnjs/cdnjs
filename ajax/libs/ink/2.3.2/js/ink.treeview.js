/**
 * @module Ink.UI.TreeView_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.TreeView', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, Element, Selector, InkArray ) {
    'use strict';

    /**
     * Shows elements in a tree-like hierarchical structure.
     * 
     * @class Ink.UI.TreeView
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {String} [options.node='li'] Selector to define which elements are seen as nodes.
     * @param {String} [options.children='ul'] Selector to define which elements are represented as children.
     * @param {String} [options.parentClass='parent'] Classes to be added to the parent node.
     * @param {String} [options.openClass='icon icon-minus-circle'] Classes to be added to the icon when a parent is open.
     * @param {String} [options.closedClass='icon icon-plus-circle'] Classes to be added to the icon when a parent is closed.
     * @param {String} [options.hideClass='hide-all'] Class to toggle visibility of the children.
     * @param {String} [options.iconTag='i'] The name of icon tag. The component tries to find a tag with that name as a direct child of the node. If it doesn't find it, it creates it.
     * @param {Boolean} [options.stopDefault=true] Stops the default behavior of the click handler.
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
     */
    var TreeView = function(selector, options){
        this._element = Common.elOrSelector(selector, '[Ink.UI.TreeView_1]');

        this._options = Common.options('Treeview', {
            'node':   ['String', 'li'],
            // [3.0.1] Deprecate this terrible, terrible name
            'child':  ['String',null],
            'children':  ['String','ul'],
            'parentClass': ['String','parent'],
            // [3.0.0] use these classes because you'll have font-awesome 4
            // 'openClass': ['String','fa fa-minus-circle'],
            // 'closedClass': ['String','fa fa-plus-circle'],
            'openNodeClass': ['String', 'open'],
            'openClass': ['String','icon-minus-sign'],
            'closedClass': ['String','icon-plus-sign'],
            'hideClass': ['String','hide-all'],
            'iconTag': ['String', 'i'],
            'stopDefault' : ['Boolean', true]
        }, options || {}, this._element);

        if (this._options.child) {
            Ink.warn('Ink.UI.TreeView: options.child is being renamed to options.children.');
            this._options.children = this._options.child;
        }

        this._init();
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

        isOpen: function (node) {
            if (!this._getChild(node)) {
                throw new Error('not a node!');
            }

            return Element.data(node).open === 'true' ||
                Css.hasClassName(node, this._options.openNodeClass);
        },

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

                Css.setClassName(icon, this._options.openClass, beOpen);
                Css.setClassName(icon, this._options.closedClass, !beOpen);
                Css.setClassName(node, this._options.openNodeClass, beOpen);
            } else {
                Ink.error('Ink.UI.TreeView: node', node, 'is not a node!');
            }
        },

        open: function (node) {
            this._setNodeOpen(node, true);
        },

        close: function (node) {
            this._setNodeOpen(node, false);
        },

        toggle: function (node) {
            if (this.isOpen(node)) {
                this.close(node);
            } else {
                this.open(node);
            }
        },

        _getChild: function (node) {
            return Selector.select(this._options.children, node)[0] || null;
        },

        /**
         * Handles the click event (as specified in the _init function).
         * 
         * @method _onClick
         * @param {Event} event
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

    return TreeView;
});
