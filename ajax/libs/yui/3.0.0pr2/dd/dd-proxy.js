YUI.add('dd-proxy', function(Y) {

    /**
     * The Drag & Drop Utility allows you to create a draggable interface efficiently, buffering you from browser-level abnormalities and enabling you to focus on the interesting logic surrounding your particular implementation. This component enables you to create a variety of standard draggable objects with just a few lines of code and then, using its extensive API, add your own specific implementation logic.
     * @module dd
     * @submodule dd-proxy
     */
    /**
     * This class extends dd-drag to allow for creating a proxy drag node, instead of dragging the original node.
     * @class Proxy
     * @extends Drag
     * @constructor
     */
    var DDM = Y.DD.DDM,
        NODE = 'node',
        DRAG_NODE = 'dragNode',
        PROXY = 'proxy';
     

    var Proxy = function() {
        Proxy.superclass.constructor.apply(this, arguments);

    };

    Proxy.NAME = 'dragProxy';

    Proxy.ATTRS = {
        /**
        * @attribute moveOnEnd
        * @description Move the original node at the end of the drag. Default: true
        * @type Boolean
        */
        moveOnEnd: {
            value: true
        },
        /**
        * @attribute resizeFrame
        * @description Make the Proxy node assume the size of the original node. Default: true
        * @type Boolean
        */
        resizeFrame: {
            value: true
        },
        /**
        * @attribute proxy
        * @description Make this Draggable instance a Proxy instance. Default: false
        * @type Boolean
        */
        proxy: {
            value: false
        },        
        /**
        * @attribute positionProxy
        * @description Make the Proxy node appear in the same place as the original node. Default: true
        * @type Boolean
        */
        positionProxy: {
            value: true
        },
        /**
        * @attribute borderStyle
        * @description The default border style for the border of the proxy. Default: 1px solid #808080
        * @type Boolean
        */
        borderStyle: {
            value: '1px solid #808080'
        }
    };

    var proto = {
        /**
        * @private
        * @method _createFrame
        * @description Create the proxy element if it doesn't already exist and set the DD.DDM._proxy value
        */
        _createFrame: function() {
            if (!DDM._proxy) {
                DDM._proxy = true;
                var p = Y.Node.create('<div></div>');

                p.setStyles({
                    position: 'absolute',
                    display: 'none',
                    zIndex: '999',
                    top: '-999px',
                    left: '-999px',
                    border: this.get('borderStyle')
                });

                var b = Y.Node.get('body');
                b.insertBefore(p, b.get('firstChild'));
                p.set('id', Y.stamp(p));
                p.addClass(DDM.CSS_PREFIX + '-proxy');
                DDM._proxy = p;
            }
        },
        /**
        * @private
        * @method _setFrame
        * @description If resizeProxy is set to true (default) it will resize the proxy element to match the size of the Drag Element.
        * If positionProxy is set to true (default) it will position the proxy element in the same location as the Drag Element.
        */
        _setFrame: function() {
            var n = this.get(NODE);
            if (this.get('resizeFrame')) {
                DDM._proxy.setStyles({
                    height: n.get('offsetHeight') + 'px',
                    width: n.get('offsetWidth') + 'px'
                });
            }
            this.get(DRAG_NODE).setStyles({
                visibility: 'hidden',
                display: 'block',
                border: this.get('borderStyle')
            });

            if (this.get('positionProxy')) {
                this.get(DRAG_NODE).setXY(this.nodeXY);
            }
            this.get(DRAG_NODE).setStyle('visibility', 'visible');
        },
        /**
        * @private
        * @method initializer
        * @description Lifecycle method
        */
        initializer: function() {
            if (this.get(PROXY)) {
                this._createFrame();
            }
        },
        /**
        * @method start
        * @description Starts the drag operation and sets the dragNode config option.
        */       
        start: function() {
            if (!this.get('lock')) {
                if (this.get(PROXY)) {
                    if (this.get(DRAG_NODE).compareTo(this.get(NODE))) {
                        this.set(DRAG_NODE, DDM._proxy);
                    }
                } else {
                    this.set(DRAG_NODE, this.get(NODE));
                }
            }
            Proxy.superclass.start.apply(this);
            if (this.get(PROXY)) {
                this._setFrame();
            }
        },
        /**
        * @method end
        * @description Ends the drag operation, if moveOnEnd is set it will position the Drag Element to the new location of the proxy.
        */        
        end: function() {
            if (this.get(PROXY) && this.get('dragging')) {
                if (this.get('moveOnEnd')) {
                    this.get(NODE).setXY(this.lastXY);
                }
                this.get(DRAG_NODE).setStyle('display', 'none');
            }
            Proxy.superclass.end.apply(this);
        }
    };
    //Extend DD.Drag
    Y.extend(Proxy, Y.DD.Drag, proto);
    //Set this new class as DD.Drag for other extensions
    Y.DD.Drag = Proxy;    



}, '@VERSION@' ,{requires:['dd-ddm', 'dd-drag'], skinnable:false});
