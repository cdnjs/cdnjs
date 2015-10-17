YUI.add('widget-modality', function(Y) {

var WIDGET         = 'widget',
    HOST            = 'host',
    RENDER_UI       = 'renderUI',
    BIND_UI         = 'bindUI',
    SYNC_UI         = 'syncUI',
    RENDERED        = 'rendered',
    BOUNDING_BOX    = 'boundingBox',
    CONTENT_BOX     = 'contentBox',
    VISIBLE         = 'visible',
    Z_INDEX         = 'zIndex',
    ALIGN           = 'align',

    CHANGE          = 'Change',

    isBoolean       = Y.Lang.isBoolean,
    getCN           = Y.ClassNameManager.getClassName,

    supportsPosFixed = (function(){

        /*! IS_POSITION_FIXED_SUPPORTED - Juriy Zaytsev (kangax) - http://yura.thinkweb2.com/cft/ */

        var isSupported = null,
            el, root;

        if (document.createElement) {
            el = document.createElement('div');
            if (el && el.style) {
                el.style.position = 'fixed';
                el.style.top = '10px';
                root = document.body;
                if (root && root.appendChild && root.removeChild) {
                    root.appendChild(el);
                    isSupported = (el.offsetTop === 10);
                    root.removeChild(el);
                }
            }
        }

        return isSupported;
    }()),

    WidgetModal;

(function(){

    var WIDGET_MODAL   = 'widgetModal',
        MODAL           = 'modal',
        MASK            = 'mask',
        MODAL_CLASSES   = {
            modal   : getCN(WIDGET, MODAL),
            mask    : getCN(WIDGET, MASK)
        };

    WidgetModal = Y.Base.create(WIDGET_MODAL, Y.Plugin.Base, [], {

        // *** Instance Members *** //
        _maskNode   : null,
        _uiHandles  : null,

        // *** Lifecycle Methods *** //

        initializer : function (config) {
            var self = this;
            this.afterHostMethod(RENDER_UI, this.renderUI);
            this.afterHostMethod(BIND_UI, this.bindUI);
            this.afterHostMethod(SYNC_UI, this.syncUI);

            if (this.get(HOST).get(RENDERED)) {
                this.renderUI();
                this.bindUI();
                this.syncUI();
            }

            this._maskNode = WidgetModal._GET_MASK();
        },

        destructor : function () {

            if (this._maskNode) {
                this._maskNode.remove(true);
            }

            this._detachUIHandles();
            this.get(HOST).get(BOUNDING_BOX).removeClass(MODAL_CLASSES.modal);
        },

        renderUI : function () {
            
            var bb = this.get(HOST).get(BOUNDING_BOX),
                cb = this.get(HOST).get(CONTENT_BOX);

            //this makes the content box content appear over the mask
            cb.setStyles({
                position: "relative"
            });

            this._repositionMask(this.get(HOST));
            bb.addClass(MODAL_CLASSES.modal);

        },

        bindUI : function () {

            this.afterHostEvent(VISIBLE+CHANGE, this._afterHostVisibleChange);
            this.afterHostEvent(Z_INDEX+CHANGE, this._afterHostZIndexChange);
        },

        syncUI : function () {

            var host = this.get(HOST);

            this._uiSetHostVisible(host.get(VISIBLE));
            this._uiSetHostZIndex(host.get(Z_INDEX));

        },

        // *** Private Methods *** //

        _focus : function (e) {

            
            var host = this.get(HOST),
                bb = host.get(BOUNDING_BOX),
                oldTI = bb.get('tabIndex');

            bb.set('tabIndex', oldTI >= 0 ? oldTI : 0);
            host.focus();
            //Y.later(0, host, 'focus');

            //this._detachUIHandles();
            //host.focus();
            //bb.set('tabIndex', oldTI);
        },

        _blur : function () {

            this.get(HOST).blur();
        },

        _getMaskNode : function () {

            return WidgetModal._GET_MASK();
        },

        _uiSetHostVisible : function (visible) {
            var stack   = WidgetModal.STACK,
                host    = this.get('host'),
                topModal, topModalHost;
            
            if (visible) {
            
                Y.Array.each(stack, function(modal){
                    modal._detachUIHandles();
                    modal._blur();
                });
                
                // push on top of stack
                stack.unshift(this);
                
                this._attachUIHandles();
                this._repositionMask(host);
                this._uiSetHostZIndex(host.get(Z_INDEX));
                this._maskNode.show();
                this._focus();
                
            } else {
            
                stack.splice(Y.Array.indexOf(stack, this), 1);
                this._detachUIHandles();
                this._blur();
                
                if (stack.length) {
                    topModal        = stack[0];
                    topModalHost    = topModal.get('host');
                    
                    topModal._repositionMask(topModalHost);
                    topModal._attachUIHandles();
                    topModal._uiSetHostZIndex(topModalHost.get(Z_INDEX));
                    topModal._focus();
                } else {
                    this._maskNode.hide();
                }
                
            }
        },

        _uiSetHostZIndex : function (zIndex) {

            this._maskNode.setStyle(Z_INDEX, zIndex || 0);
        },

        _attachUIHandles : function (modal) {

            if (this._uiHandles) { return; }

            var host = this.get(HOST),
                bb = host.get(BOUNDING_BOX);

            this._uiHandles = [
                bb.on('clickoutside', Y.bind(this._focus, this)),
                bb.on('focusoutside', Y.bind(this._focus, this))
            ];

            if ( ! supportsPosFixed) {
                this._uiHandles.push(Y.one('win').on('scroll', Y.bind(function(e){
                    var maskNode = this._maskNode;
                    maskNode.setStyle('top', maskNode.get('docScrollY'));
                }, this)));
            }
        },

        _detachUIHandles : function () {
            console.log(this);
            Y.each(this._uiHandles, function(h){
                h.detach();
            });
            this._uiHandles = null;
        },

        _afterHostVisibleChange : function (e) {

            this._uiSetHostVisible(e.newVal);
        },

        _afterHostZIndexChange : function (e) {

            this._uiSetHostZIndex(e.newVal);
        },

        _isNested: function() {
            var m = WidgetModal._GET_MASK();
            return m.get(VISIBLE);
        },

        //w is the host behind which mask should be repositioned
        _repositionMask: function(host) {
            //get rid of the mask and reposition it behind the last element in the stack
            this._maskNode.remove();
            var bb = host.get(BOUNDING_BOX),
            bbParent = bb.get('parentNode') || Y.one('body');
            bbParent.insert(this._maskNode, bbParent.get('firstChild'));
        }

    }, {

        // *** Static *** //

        NS      : MODAL,

        ATTRS   : {

            maskNode : {
                getter      : '_getMaskNode',
                readOnly    : true
            },

            node: {
                value: undefined
            }

        },

        CLASSES : MODAL_CLASSES,

        //Returns the mask if it exists on the page - otherwise creates a mask. There's only
        //one mask on a page at a given time.

        _GET_MASK: function() {

            var mask = Y.one(".yui3-widget-mask") || null;

            if (mask) {
                return mask;
            }
            else {
                
                mask = Y.Node.create('<div></div>');
                mask.addClass(MODAL_CLASSES.mask);
                mask.setStyles({
                    position    : supportsPosFixed ? 'fixed' : 'absolute',
                    width       : '100%',
                    height      : '100%',
                    top         : '0',
                    left        : '0',
                    display     : 'block'
                });

                return mask;
            }

        },
        
        //associative array of objects
        STACK: []    

    });
    Y.namespace("Plugin").Modal = WidgetModal;

}());


}, '@VERSION@' ,{requires:['widget','plugin','event-outside','base-build']});
