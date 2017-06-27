YUI.add('treeview', function(Y) {

var getClassName = Y.ClassNameManager.getClassName,
        TREEVIEW = 'treeview',
        TREE = 'tree',
        TREELEAF = 'treeleaf',
        CONTENT_BOX = "contentBox",
        BOUNDING_BOX = "boundingBox",
        TRUE = true,
        WIDGET = Y.Widget,
        VALUE = "value",
        CONTENT = "content",
        Widget = Y.Widget,
        Node = Y.Node,
        ID = "id",
        DESTROYED = "destroyed",
        BODY = "body",
        KEY_DOWN        = 40,
        KEY_LEFT_ARROW  = 37,
        KEY_RIGHT_ARROW = 39,
        KEY_UP          = 38,
        Handlebars = Y.Handlebars,
        _getClassName = Y.ClassNameManager.getClassName,
        _getWidgetClassName = Y.Widget.getClassName,
        classNames = {
            loading : getClassName(TREEVIEW,'loading'),
            tree : getClassName(TREE),
            treeLabel : getClassName(TREEVIEW,"treelabel"),
            labelcontent : getClassName(TREEVIEW,'label-content'),
            treeview : getClassName(TREEVIEW),
            treeviewcontent : getClassName(TREEVIEW,"content"),
            collapsed : getClassName(TREE,"collapsed"),
            leaf : getClassName(TREELEAF)
        },
        _getBox = function (widget,box) {
            var value;
            
            if (widget.get("initialized") && !widget.get("rendered") && !widget._handling && widget.get("DOMReady")) {
                widget._handling = TRUE;
                widget.render();
                value = widget._state.get(box,VALUE);
            }
            return value;
        };
            
/**
 * Provides the WidgetHTMLRenderer extensions, which overrides the base Widget API 
 * to allow widgets to be rendered purely using HTML from templates, without any Node references. 
 * 
 * This allows Widgets to be rendered on the server, and also optimizes rendering 
 * in high-scale applications such as TreeView.
 * 
 * NOTE: When applied, Node references to boundingBox and contentBox won't be 
 * available until the Widget is rendered.
 * 
 * Although not required of widget implementors, the Widget base class uses
 * Handlebars to render it's boundingBox and contentBox templates. If overriding
 * the CONTENT_TEMPLATE or BOUNDING_TEMPLATE values, you should use Handlebars 
 * token syntax, and maintain tokens used by the default templates.
 *
 * @module widget-htmlrenderer
 */


/**
 * WidgetHTMLRenderer is an Extension for Widget, to be used with Y.Base.create or
 * Y.Base.mix and provides a renderHTML method which can be used to generate the 
 * initial markup for the widget purely from templates, without creating Node 
 * references.
 *
 * When mixed in, renderHTML() will generate the markup for the widget and the 
 * caller is responsible for adding it to the DOM. 
 *
 * Widget developers need to implement a renderUI(buffer) method which writes
 * string content to the buffer passed in. This buffer gets added as the contents
 * of the contentBox.
 *
 * render() will generate boundingBox and contentBox node references, and invoke 
 * bindUI() and syncUI() to bind them.
 *
 * If render() is called and renderHTML() hasn't been invoked already, 
 * it will be invoked, before bindUI and syncUI are called.
 *
 * @class WidgetHTMLRenderer
 */
Y.WidgetHTMLRenderer = function() {};

Y.WidgetHTMLRenderer.prototype = {

    /**
     * Generates the markup for the widget. 
     * 
     * Widget implementers need to implement a renderUI(buffer) method which
     * writes string content to the buffer (array) passed in. The buffers contents
     * get added as the contents of the contentBox.
     *
     * @method renderHTML
     * @public
     * @param appendTarget {Node|Array}. Optional. The array or node to push content to.
     * @return {HTML} The rendered HTML string for the widget
     */
    renderHTML: function(appendTarget) {

        var boxBuffer,
            contentBuffer,
            context,
            renderedContent;


        if (!this.get(DESTROYED)) {

            context = {};

            contentBuffer = [];
            this.renderUI(contentBuffer, context);

            context.content = contentBuffer.join("");

            boxBuffer = [];
            this._renderUI(boxBuffer, context);

            renderedContent = boxBuffer.join("");

            if (appendTarget) {
                if (Node && appendTarget instanceof Node) {
                    appendTarget.append(renderedContent);
                } else {
                    appendTarget.push(renderedContent);
                }
            }

            this._renderedUI = true;
        }

        return renderedContent;
    },

    /**
     * Internal method which wraps renderHTML with the default parent node for the 
     * widget. Used by the renderer to support the case where renderHTML hasn't been
     * invoked already when render() is called. 
     *
     * @method _renderHTML
     * @private
     */
    _renderHTML: function() {

        // HACK - Widget should extract this logic into a method for easy reuse
        var defParentNode = this.DEF_PARENT_NODE,
            parentNode = this._parentNode || (defParentNode && Node.one(defParentNode)),
            buffer = parentNode || [],
            content;

        this.renderHTML(buffer);

        if (!parentNode) {
            content = buffer.join();
            Node.one(BODY).insert(content, 0);
        }
    },

    /**
     * Renders the template for the Widget's bounding/content boxes.
     *
     * @method _renderUI
     * @param {Array} buffer The buffer to write the rendered template to. Will ultimately be Array.join'd
     * @param {Object} context The context, passed to Handlebars.
     * @protected
     */
    _renderUI: function(buffer, context) {
        this._renderBox(buffer, context);
    },

    /**
     * Renders the templates for the Widget's bounding/content boxes
     *
     * @method _renderBox
     * @param {Array} The buffer to write the rendered template to. Will ultimately be Array.join'd
     * @param {Object} The context, passed to Handlebars.
     * @protected
     */
    _renderBox: function(buffer, context) {

        context.id = this.get(ID);
        
        this._renderBoxClassNames(context);

        if (this.CONTENT_TEMPLATE) {
            context.contentBox = Handlebars.render(this.CONTENT_TEMPLATE, context); 
        } else {
            context.contentBox = context.content;
        }

        buffer.push(Handlebars.render(this.BOUNDING_TEMPLATE, context));

        this._mapInstance(context.id);
    },

    /**
     * Utility method to add the boundingClasses and contentClasses property values
     * to the Handlebars context passed in. Similar to _renderBoxClassNames() on 
     * the Node based renderer.
     * 
     * @method _renderBoxClassNames
     * @param {Object} context The Handlebars context object on which the 
     * boundingClasses and contentClasses properties get added.
     */
    _renderBoxClassNames: function(context) {

        var classes = this._getClasses(),
            cl,
            i,
            contentClass = this.getClassName(CONTENT),
            boundingClasses = [];

        boundingClasses[boundingClasses.length] = _getWidgetClassName();

        for (i = classes.length-3; i >= 0; i--) {
            cl = classes[i];
            boundingClasses[boundingClasses.length] = cl.CSS_PREFIX || _getClassName(cl.NAME.toLowerCase());
        }

        if (this.CONTENT_TEMPLATE === null) {
            boundingClasses.push(contentClass);
        } else {
            context.contentClasses = contentClass;
        }

        context.boundingClasses = boundingClasses.join(" ");
    },

    /**
     * Sync method, used to generate the boundingBox and contentBox node references,
     * after they've been added to the DOM. This method is invoked by render(),
     * prior to invoking bindUI()/syncUI() so that Node references are available 
     * for event binding and incremental updates.
     *
     * @method syncRenderedBoxes
     */
    syncRenderedBoxes : function() {

        var bb = Y.Node.one("#" + this.get(ID)),
            cb = (this.CONTENT_TEMPLATE === null) ? bb : bb.one("." + this.getClassName(CONTENT));

        this._set("boundingBox", bb);
        this._set("contentBox", cb);
    },

    /**
     * Overrides the base Widget renderer implementation to invoke:
     * 
     * - renderHTML() if it hasn't been invoked already. For the common use case it will have already been called to generate the markup string for the Widget.
     * - bindUI()
     * - syncUI()
     *
     * The renderer will invoke syncRenderedBoxes() before calling bindUI()/syncUI()
     * to establish the contentBox and boundingBox Node references, which don't 
     * exist prior to render() call. 
     * 
     * This method is invoked by render() and is not chained 
     * automatically for the class hierarchy (unlike initializer, destructor) 
     * so it should be chained manually for subclasses if required.
     *
     * @method renderer
     * @protected
     */
    renderer: function() {

        if (!this._renderedUI) {
            this._renderHTML();
        }

        // We need to setup bb/cb references, before bind/sync for backwards compat
        this.syncRenderedBoxes();

        this._bindUI();
        this.bindUI();

        this._syncUI();
        this.syncUI();
    },

    /**
     * The Handlebars template to use to render the basic boundingBox HTML.
     * 
     * When overriding this value, tokens should be maintained.
     * 
     * @property BOUNDING_TEMPLATE
     * @type String 
     */
    BOUNDING_TEMPLATE : '<div id="{{id}}" class="{{boundingClasses}}">{{{contentBox}}}</div>',

    /**
     * The Handlebars template to use to render the basic contentBox HTML.
     * 
     * When overriding this value, tokens should be maintained.
     * 
     * @property CONTENT_TEMPLATE
     * @type String 
     */
    CONTENT_TEMPLATE : '<div class="{{contentClasses}}">{{{content}}}</div>',

    /**
     * Helper method to set the bounding/content box.
     * 
     * Overrides the base Widget implementation to avoid creating a Node 
     * instance from the box templates. Node references to the boundingBox
     * and contentBox will be created during widget.render().
     *
     * @method _setBox
     * @private
     *
     * @param {String} id The node's id attribute
     * @param {Node|String} node The node reference
     * @param {String} template HTML string template for the node
     * @return {Node} The node
     */
    _setBox : function(id, node) {
        // We don't want to create a new node        
        node = Node.one(node);

        if (node && !node.get(ID)) {
            node.set(ID, id || Y.guid());
        }

        return node;
    }
};


/**
 * The Treeview component is a UI widget that allows users
 * to create a hierarchical-like structure of elements.
 * Extends Y.WidgetParent, Y.WidgetChild, Y.WidgetHTMLRenderer
 * Treeview can be generated either by providing a configuration object  
 * @module TreeView
 */
    Y.TreeView = Y.Base.create("treeview", WIDGET, [Y.WidgetParent, Y.WidgetChild, Y.WidgetHTMLRenderer], {
    
        /**
         * Property defining the markup template for bounding box.
         *
         * @property BOUNDING_TEMPLATE
         * @type String
        */
        BOUNDING_TEMPLATE : '<ul id="{{id}}" class="{{boundingClasses}}">{{{contentBox}}}</ul>',
        
        /**
         * Property defining the markup template for content box.          
         *
         * @property CONTENT_TEMPLATE
         * @type String
        */
        
        /**
         * Property defining the markup template for the trewview label .
         *
         * @property TREEVIEWLABEL_TEMPLATE
         * @type String
        */
        TREEVIEWLABEL_TEMPLATE : "<li class='{{{treelabelClassName}}}' role='treeitem' tabindex='0'><span class={{{labelcontentClassName}}}>{{{label}}}</span></li>",
        
                      
        /**
         * Flag to indicate whether a content Box/Bounding box has been returned from the getter attribute.
         *
         * @property _handling
         * @type Boolean
        */
        
        /**
         * The template for a branch element.
         *
         * @property branchTemplate
         * @type String
        */

        /**
         * Initializer lifecycle implementation for the Treeview class. 
         * <p>Registers the Treeview instance. It subscribes to the onParentChange 
         *    event which is triggered each time a new tree is added.</p>
         * <p>It publishes the toggleTreeState event, which gets fired everytime a node is
         *    collapsed/expanded</p>
         *
         * @method initializer
         * @public
         * @param  config {Object} Configuration object literal for the widget
         */
        initializer : function (config) {
            this.publish('toggleTreeState', { 
                defaultFn: this.toggleTreeState
            });
            
            Y.after(this._setChildrenContainer, this, "render");
        },
        
        /**
         * renderUI implementation
         *
         * Creates a visual representation of the treeview based on existing parameters. 
         * @method renderUI
        */  
        renderUI: function (contentBuffer) {
            var label = this.get("label"),
                labelContent,
                isBranch = this.get("depth") > -1,
                treelabelClassName = this.getClassName("treelabel"),
                labelcontentClassName = classNames.labelcontent;
                
                this.BOUNDING_TEMPLATE = isBranch ? '<li id="{{{id}}}" role="presentation" class="{{{boundingClasses}}}">{{{contentBox}}}</li>' : '<ul id="{{{id}}}" role="tree" class="{{{boundingClasses}}}">{{{contentBox}}}</ul>';
                this.CONTENT_TEMPLATE = isBranch ? '<ul id="{{id}}" role="group" class="{{{contentClasses}}}">{{{content}}}</ul>' : null;
                labelContent = Y.Handlebars.render(this.TREEVIEWLABEL_TEMPLATE, {label:label, treelabelClassName : treelabelClassName, labelcontentClassName : labelcontentClassName});
                contentBuffer.push(labelContent);
        },
        
      
        /**
         * bindUI implementation
         *
         * Assigns listeners to relevant events that change the state
         * of the treeview.
         * @method bindUI
        */ 
        bindUI: function() {
            //only attaching to the root element
            if (this.isRoot()) {
                this.get("boundingBox").delegate("click",this._onViewEvents,"." + classNames.labelcontent,this);
                //this.get("boundingBox").delegate("click",this._onViewEvents,this);

                this.get("boundingBox").on("keydown",this._onKeyDown,this);
                
                this._keyEvents = [];
                this._keyEvents[KEY_UP] = this._onUpKey;
                this._keyEvents[KEY_DOWN] = this._onDownKey;
                this._keyEvents[KEY_LEFT_ARROW] = this._onLeftArrowKey;
                this._keyEvents[KEY_RIGHT_ARROW] = this._onRightArrowKey;
            }
        },
        
        /**
         * Handles all the internal treeview events.         
         * @method onViewEvents
         * @protected
         */
        _onViewEvents : function (event) {
            var target = event.target;
               
            this.toggleTreeState(target);
        },
        
        /**
         * Handles all the internal keydown events.          
         * @method onViewEvents
         * @protected
         */
        _onKeyDown : function (e) {
            var keyCode = e.keyCode,
                target = e.target,
                handler = this._keyEvents[keyCode];
                
            if (handler) {
                handler.call(this,e,target);
            }
        },
        
         /**
         * Called when the up arrow key is pressed.
         *
         * @method _keyDown
         * @protected
         */
        _onUpKey : function (e,target) {
            var prevEl = target.previous("li");
            
            e.preventDefault();
            
            if (prevEl) {
                prevEl.focus();
            }
        },
        
         /**
         * Called when the down arrow key is pressed.
         * @param {Y.Node} The target element
         *
         * @method _keyDown
         * @protected
         */
        _onDownKey : function (e,target) {
            var nextEl = target.next("li");
            
            e.preventDefault();
            
            if (nextEl) {
                nextEl.focus();
            }
        },
        
         /**
         * Called when the right arrow key is pressed.
         *
         * @param {Y.Node} The target element
         * @method _keyDown
         * @protected
         */
        _onRightArrowKey : function (e,target) {
            if (target.hasClass(classNames.treeLabel)) {
                this.expand(target);
            }
        },
        
         /**
         * Called when the left arrow key is pressed.
         *
         * @param {Y.Node} The target element
         * @method _keyDown
         * @protected
         */
        _onLeftArrowKey : function (e,target) {
            if (target.hasClass(classNames.treeLabel)) {
                this.collapse(target);
            }
        },
        
       /**
        * Renders all child Widgets for the parent.  
        * <p>
        * This method in invoked after renderUI is invoked for the Widget class
        * using YUI's aop infrastructure. 
        * OVERWRITE : Overwritting for string rendering mode, if lazyLoad is enabled
        * it will not prepare the children strings until is needed.
        * </p>
        * @param {Object} The contentBuffer 
        * @method _renderChildren
        * @protected
        */ 
        _renderChildren: function (contentBuffer) {
            var childrenHTML;
            
            if (!this.get("lazyLoad")) {
                childrenHTML = this._getChildrenHTML(this);
                contentBuffer.push(childrenHTML);
            }
        },
        
        /**
        * Renders all child Widgets for the parent.  
        * <p>
        * Giving a tree, it concatenates all the strings for it's children
        * </p>
        * @param {Object} The tree we are trying to obtain the children from
        * @method getChildrenHTML
        * @protected
        */ 
        _getChildrenHTML : function (tree) {
             var childrenHTML = "";

            tree.each(function (child) {
                childrenHTML += child.renderHTML();
                child.set("DOMReady",true);
            });
            
            return childrenHTML;
        },
        
      /**
        *  
        * <p>
        * This method in invoked on demand when children are required
        * to be displayed. Gets the strings, then append it to its parent
        * </p>
        * @method _lazyRenderChildren
        * @param {Object} treeWidget, the widget Object 
        * @param {Y.Node} treeNode 
        * @protected
        */ 
        _lazyRenderChildren : function (treeWidget,treeNode) {
            
            var childrenHTML = treeWidget._getChildrenHTML(treeWidget);
            
            treeNode.append(childrenHTML);
            treeWidget.set("populated",true);
        },
        
       /**
        * <p>
        *   Collapses a tree.
        * </p>
        * @param {Y.Node} This param is optional - The target that triggered the event
        * @method collapse
        * @protected
        */ 
        collapse : function (target) {
            var treeNode = target ? target.ancestor('.'+ classNames.treeviewcontent) : this.get("contentBox"),
                treeWidget = Y.Widget.getByNode(treeNode);
            
            if (!treeWidget.get("collapsed")) {
                treeWidget.set("collapsed", true);   
                treeNode.addClass(classNames.collapsed);
                treeNode.setAttrs({'aria-collapsed': true });
            }
            
        },
        
       /**
        * <p>
        *   Expands a tree. If the tree hasn't been rendered yet, it will render it before, then expand it.
        * </p>
        * @param {Y.Node} This param is optional - The target that triggered the event
        * @method expand
        * @protected
        */ 
        expand : function (target) {
            var treeNode = target ? target.ancestor('.'+ classNames.treeviewcontent) : this.get("contentBox"),
                treeWidget = Y.Widget.getByNode(treeNode),
                isPopulated = treeWidget.get("populated");
            
            
            if (this.get("lazyLoad") && !isPopulated) {
                treeWidget._lazyRenderChildren(treeWidget,treeNode);
                treeWidget.set("populated",true);
            }
            
            if (treeWidget.get("collapsed")) {
                treeWidget.set("collapsed", false); 
                treeNode.removeClass(classNames.collapsed);
                treeNode.setAttrs({'aria-collapsed': false });
            }        
        },
        
       /**
        * Toggles the tree. If the Tree hasn't been rendered it will render it before.
        * @param {Y.Node} This param is optional - The target that triggered the event
        * @method _toggleTreeState
        * @protected
        */
       toggleTreeState : function (target) {
            var treeNode = target ? target.ancestor('.'+ classNames.treeviewcontent) : this.get("contentBox"),
                treeWidget = Y.Widget.getByNode(treeNode),
                isPopulated = treeWidget.get("populated");
            
            if (this.get("lazyLoad") && !isPopulated) {
                treeWidget._lazyRenderChildren(treeWidget,treeNode);
                treeWidget.set("populated",true);
            }
            
            treeWidget.set("collapsed", !treeWidget.get("collapsed"));        
            treeNode.toggleClass(classNames.collapsed);
        },

        
        /******************* OVERWRITE **************************/
                
         
        /**
         * Sets the container for children to renderTo when using _uiAddChild
         *
         * @method _setChildrenContainer
        */  
        _setChildrenContainer : function () {
             var renderTo = this._childrenContainer || this.get("contentBox");
             this._childrenContainer = renderTo;
        },
        
          /**
        * Utility method to add the boundingClasses and contentClasses property values
        * to the Handlebars context passed in. Similar to _renderBoxClassNames() on
        * the Node based renderer.
        *
        * @method _renderBoxClassNames
        * @param {Object} context The Handlebars context object on which the
        * boundingClasses and contentClasses properties get added.
        */
        _renderBoxClassNames: function(context) {
            var classes = this._getClasses(),
                cl,
                i,
                contentClass = this.getClassName(CONTENT),
                boundingClasses = [];
                
                boundingClasses[boundingClasses.length] = Widget.getClassName();
                
                
            for (i = classes.length-3; i >= 0; i--) {
                cl = classes[i];
                boundingClasses[boundingClasses.length] = Y.ClassNameManager.getClassName(cl.NAME.toLowerCase()) || this.getClassName(cl.NAME.toLowerCase());
            }
            
            
            
            if (this.CONTENT_TEMPLATE === null) {
                boundingClasses.push(contentClass);
                boundingClasses.push(classNames.collapsed);
            } else {
                context.contentClasses = contentClass + " " + classNames.collapsed;
            }
            
            context.boundingClasses = boundingClasses.join(" ");
        },

        
        /**
        * Updates the UI in response to a child being added.
        *
        * @method _uiAddChild
        * @protected
        * @param child {Widget} The child Widget instance to render.
        * @param parentNode {Object} The Node under which the 
        * child Widget is to be rendered.
        */    
        _uiAddChild: function (child, parentNode) {
            var parent = child.get("parent"),
                childBB,
                siblingBB,
                nextSibling,
                prevSibling;
            
            if (parent.get("populated")) {
                child.render(parentNode);
                childBB = child.get("boundingBox");
                nextSibling = child.next(false);

            
            // Insert or Append to last child.
            
            // Avoiding index, and using the current sibling 
            // state (which should be accurate), means we don't have 
            // to worry about decorator elements which may be added 
            // to the _childContainer node.
            
            if (nextSibling && nextSibling.get("DOMReady")) {
            
                siblingBB = nextSibling.get(BOUNDING_BOX);
                siblingBB.insert(childBB, "before");
            
            } else {
                prevSibling = child.previous(false);
                
                if (prevSibling && prevSibling.get("DOMReady")) {
                
                    siblingBB = prevSibling.get(BOUNDING_BOX);
                    siblingBB.insert(childBB, "after");
                
                } else if (!parentNode.contains(childBB)) {
                
                    // Based on pull request from andreas-karlsson
                    // https://github.com/yui/yui3/pull/25#issuecomment-2103536
                
                    // Account for case where a child was rendered independently of the 
                    // parent-child framework, to a node outside of the parentNode,
                    // and there are no siblings.
                
                    parentNode.appendChild(childBB);
                }
            }

            }
        }

    }, {
        ATTRS: {
            /**
             * The label attribute for the tree.
             *
             * @attribute label
             * @type String
             */
            label : {
                value:""
            },
            
            /**
             * Flag to indicate if a tree has been rendered to the DOM or not
             *
             * @attribute _populated
             * @type Boolean
            */
            DOMReady : {}, 

             
            /**
             * Configuration to set lazyLoad enabled. When enabled, all the children rendering will be done on demand.
             *
             * @attribute lazyLoad
             * @type Boolean
            */
            
            lazyLoad : {
                writeOnce : "initOnly",
                value : true
            },
            
            
            /**
             * Attribute to indicate whether a tree has been populated with it's children or not.
             *
             * @attribute populated
             * @type Boolean
            */

            populated : {
                readOnly : true
            },
            
            /**
             * Attribute to indicate whether a tree is in a collapsed state or not
             *
             * @attribute collapsed
             * @type Boolean
            */
            
            collapsed : {
                value : true
            },
            
            /**
             * The default children type.
             *
             * @attribute defaultChildType
             * @type String
             */
            defaultChildType: {  
                value: "TreeLeaf"
            },
            
            /**
             * Specifying a custom getter for the Bounding box so that
             * it's only rendered when needed. 
             * @attribute boundingBox
             * @type BoundingBox
             */
            boundingBox: {
                getter : function(val) {
                    return val ? val :  _getBox(this,BOUNDING_BOX);

                }
            },
            
            /**
             * Specifying a custom getter for the Content box so that
             * it's only rendered when needed. 
             * @attribute contentBox
             * @type contentBox
             */
            contentBox: {
                getter : function(val) {
                    return val ? val :  _getBox(this,CONTENT_BOX);
                }
            }
        }
    });
    
    /**
    *  Treeleaf component of Treeview. Defines a Y.Widget that extends from Y.WidgetChild,
    * this is the default child type of a tree unless specified otherwise.
    * @module Y.TreeLeaf
    */
    Y.TreeLeaf = Y.Base.create("treeleaf", WIDGET, [Y.WidgetChild,Y.WidgetHTMLRenderer], {
    
        /**
         * Property defining the markup template for bounding box.
         *
         * @property BOUNDING_TEMPLATE
         * @type String
        */
        BOUNDING_TEMPLATE : '<li id="{{id}}" role="treeitem" class="{{boundingClasses}}" tabindex="-1">{{{contentBox}}}</li>',
        
        /**
         * Property defining the markup template for content box.
         *
         * @property CONTENT_TEMPLATE
         * @type String
        */
        CONTENT_TEMPLATE : null,
    
        /**
         * renderUI implementation
         *
         * Creates a visual representation of the treeview based on existing parameters. 
         * @method renderUI
        */  
        renderUI: function (contentBuffer) {
            contentBuffer.push(this.get("label"));
        }
    }, {
    
        ATTRS: {
            /**
             * Flag to indicate if a leaf has been rendered to the DOM or not
             *
             * @attribute DOMReady
             * @type Boolean
            */
            DOMReady : {
                value : false
            }, 

            /**
             * The label attribute for the tree.
             *
             * @attribute label
             * @type String
             */
            label: {},
            
            /**
             * Specifying a custom getter for the Bounding box so that
             * it's only rendered when needed. 
             * @attribute boundingBox
             * @type BoundingBox
             */
            boundingBox: {
                getter : function(val) {
                    return val ? val :  _getBox(this,BOUNDING_BOX);
                }
            },
            
            /**
             * Specifying a custom getter for the Content box so that
             * it's only rendered when needed. 
             * @attribute contentBox
             * @type contentBox
             */
            contentBox: {
                getter : function(val) {
                    return val ? val :  _getBox(this,CONTENT_BOX);
                }
            }
        }
    });


}, '@VERSION@' ,{requires:['base', 'widget', 'widget-parent', 'widget-child', 'node-focusmanager', 'handlebars']});
