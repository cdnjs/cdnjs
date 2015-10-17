YUI.add('widget-buttons', function(Y) {

/**
 * Provides header/footer button support for Widgets that implement the WidgetStdMod extension
 *
 * @module widget-buttons
 * @author tilomitra
 */

var BOUNDING_BOX        = "boundingBox",
    VISIBLE             = "visible",
    CLICK               = "click",
    RENDER_UI           = "renderUI",
    BIND_UI             = "bindUI",
    SYNC_UI             = "syncUI",
    BTN                 = "button",
    BTN_CONTENT         = "button-content",
    BTN_WRAPPER         = "button-wrapper",
    BUTTON_CHANGE       = "buttonsChange",
    getCN               = Y.ClassNameManager.getClassName,
    CREATE              = Y.Node.create;


/**
 * Widget extension, which can be used to add header/footer buttons support to a widget that implements the WidgetStdMod extension, 
 *
 * @class WidgetButtons
 * @param {Object} config User configuration object
 */
function WidgetButtons(config) {

    Y.after(this._renderUIButtons, this, RENDER_UI);
    Y.after(this._bindUIButtons, this, BIND_UI);
    Y.after(this._syncUIButtons, this, SYNC_UI);


}

/**
 * Static property used to define the default attribute 
 * configuration introduced by WidgetButtons.
 * 
 * @property WidgetButtons.ATTRS
 * @type Object
 * @static
 */
WidgetButtons.ATTRS = {


    /**
     * @attribute buttons
     * @type {Array}
     * @default [
            {
                type: "close"
            }
        ],
     * @description <p>An array of objects, with each object corresponding to a button that you want to be added to the widget. Each button can have upto 4 properties:</p>
     *
     * <p>type: {string} Use one of the default buttons provided by the WidgetButtons class. Set this to "close" if you want the 
     * [x] at the top-right corner of the window. If this key has a value, then values for the remaining properties below don't need to be provided.</p>
     *
     * <p>value: {string} HTML string or text that should be shown on the button</p>
     * <p>action: {function} The callback function that should be executed when the button is clicked.</p>
     * <p>href: {string} (optional) The link to redirect to if the button is clicked> If not supplied, defaults to "#"</p>
     * <p>section: {string || object} Whether the button should be placed in the header or footer. Represented as "header" or "footer"</p>
     */
    buttons: {

        value: [
            {
                type: "close"
            }
        ],
        validator: Y.Lang.isArray
    }

};


/**
 * Static hash of buttons that have all their properties defined, so that they can be used by supplying a value to the "type" property in the button attribute.
 * The "close" button is currently defined in this object (sets the [x] in the top-right of the header). 
 * 
 * @property WidgetButtons.DEFAULT_BUTTONS
 * @static
 * @type object
 */
WidgetButtons.DEFAULT_BUTTONS = {
    "close": {
        value:'<div style="background:url(../../assets/skins/sam/sprite_icons.gif) no-repeat; width:13px; height:13px; background-position: 0 2px;"></div>',
        action: function(e) {
                    e.preventDefault();
                    this.hide();
                },
        section: Y.WidgetStdMod.HEADER
    }
};

/**
 * Static hash of default class names used for the inner <span> ("content"), the <a> ("button"), and the outer span ("wrapper")
 * 
 * @property WidgetButtons.BUTTON_CLASS_NAMES
 * @static
 * @type object
 */
WidgetButtons.BUTTON_CLASS_NAMES = {
    button: getCN(BTN),
    content: getCN(BTN_CONTENT),
    wrapper: Y.Widget.getClassName(BTN_WRAPPER)
};


/**
 * <p>Object used to specify the HTML template for the buttons. Consists of the following properties</p>
 * <p>defaultTemplate: Specifies the HTML markup for each button</p>
 * <p>wrapper: Specifies the HTML markup for the wrapper, which is a DOM Element that wraps around all the buttons</p>
 * 
 * @property WidgetButtons.TEMPLATES
 * @static
 * @type object
 */
WidgetButtons.TEMPLATES = {
    defaultTemplate: "<a href={href} class='"+WidgetButtons.BUTTON_CLASS_NAMES.button+"'><span class='"+WidgetButtons.BUTTON_CLASS_NAMES.content+"'>{value}</a>",
    wrapper: "<span class='"+WidgetButtons.BUTTON_CLASS_NAMES.wrapper+"'></span>",
    clearfix: "<div style='clear:both;'></div>"
};

WidgetButtons.prototype = {
    // *** Instance Members *** //

        _hdBtnNode : null,
        _ftBtnNode : null,
        _buttonsArray : [],
        _uiHandlesButtons : [],

        /**
         * Creates the button nodes based on whether they are defined as being in the header or footer
         * <p>
         * This method is invoked after renderUI is invoked for the Widget class
         * using YUI's aop infrastructure.
         * </p>
         * @method _renderUIButtons
         * @protected
         */
        _renderUIButtons : function () {
            
            this._removeButtonNode(true,true);
            this._hdBtnNode = CREATE(WidgetButtons.TEMPLATES.wrapper);
            this._ftBtnNode = CREATE(WidgetButtons.TEMPLATES.wrapper);
            this._createButtons();


            
        },

        /**
         * Binds event listeners to listen for events on the buttons. 
         * <p>
         * This method is invoked after bindUI is invoked for the Widget class
         * using YUI's aop infrastructure.
         * </p>
         * @method _bindUIButtons
         * @protected
         */
        _bindUIButtons : function () {

            var self = this;

            Y.each(this._buttonsArray, function(o) {
               self._attachEventsToButton(o); 
            });
            this.after(BUTTON_CHANGE, this._afterButtonsChange);

        },

        /**
         * Binds event listeners to listen for events on the buttons
         * <p>
         * This method is invoked after bindUI is invoked for the Widget class
         * using YUI's aop infrastructure.
         * </p>
         * @method _bindUIButtons
         * @protected
         */
        _syncUIButtons : function () {

            if (this._hdBtnNode.hasChildNodes()) {
                this.setStdModContent(Y.WidgetStdMod.HEADER, this._hdBtnNode, Y.WidgetStdMod.AFTER);
                this._appendClearFix();
            }
            if (this._ftBtnNode.hasChildNodes()) {
                this.setStdModContent(Y.WidgetStdMod.FOOTER, this._ftBtnNode, Y.WidgetStdMod.AFTER);
            }

            



        },

        /**
         * Add a button to the existing set of buttons
         *
         * @method _bindUIButtons
         * @param button {object} The object literal consisting of the button's properties and callback function
         * @public
         */
        addButton: function (button) {
            var btns = this.get('buttons');
            btns.push(button);
            this.set('buttons', btns);
        },

        /**
         * Iterate through the buttons attribute, create Y.Node instances of each button and append them to either the _hdBtnNode or _ftBtnNode nodes.
         *
         * @method _createButtons
         * @protected
         */
        _createButtons : function () {
            var btns = this.get('buttons'),
            template = '',
            html = '',
            node,
            self = this,
            defBtns;


            Y.each(btns, function(o) {

                //Check to see if the type property is defined, and if a button corresponds to that type.
                if (o.type && WidgetButtons.DEFAULT_BUTTONS[o.type]) {
                    o = WidgetButtons.DEFAULT_BUTTONS[o.type];
                }


                template = Y.Lang.sub(WidgetButtons.TEMPLATES.defaultTemplate, {
                    href: o.href || '#',
                    value: o.value
                });

                //create Y.Node instance of button
                node = CREATE(template);
                //push the node onto an array of all the buttons
                self._buttonsArray.push({node: node, cb: o.action});

                //append it to the wrapper node
                if (o.section === Y.WidgetStdMod.HEADER) {
                    self._hdBtnNode.appendChild(node);
                }
                else if (o.section === Y.WidgetStdMod.FOOTER) {
                    self._ftBtnNode.appendChild(node);
                }
                else {
                    Y.log("Warning: One of the buttons did not have the specified sections property, and was not attached to the appropriate section.");
                }
                
            });

            return true;
        },

        _appendClearFix: function () {
            //if (!this.get("headerContent")) {
                this.setStdModContent(Y.WidgetStdMod.HEADER, CREATE(WidgetButtons.TEMPLATES.clearfix), Y.WidgetStdMod.AFTER);
            //}
        },

        /**
         * Attaches the event listeners to execute the callback function after button click.
         *
         * @method _attachEventsToButton
         * @protected
         */
        _attachEventsToButton : function (o) {
            this._uiHandlesButtons.push(o.node.after(CLICK, o.cb, this));
        },

        /**
         * Attaches the event listeners to execute the callback function after button click.
         *
         * @method _attachEventsToButton
         * @protected
         */
        _afterButtonsChange : function (e) {
            this._detachEventsFromButtons();
            this._renderUIButtons();
            this._bindUIButtons();
            this._syncUIButtons();
        },

        /**
         * Removes the header and footer button wrappers from the DOM if they exist
         *
         * @method _removeButtonNode
         * @param fromHd {bool} Whether to remove the header button wrapper
         * @param fromFt {bool} Whether to remove the footer button wrapper
         * @protected
         */
        _removeButtonNode : function(fromHd, fromFt) {

            if (fromHd && this._hdBtnNode && this._hdBtnNode.hasChildNodes()) {
                this._hdBtnNode.remove();
                this._hdBtnNode = null;
            }

            if (fromFt && this._ftBtnNode && this._ftBtnNode.hasChildNodes()) {
                this._ftBtnNode.remove();
                this._ftBtnNode = null;
            }

        },

        /**
         * Detaches all event listeners from the buttons
         *
         * @method _detachEventsFromButtons
         * @protected
         */
        _detachEventsFromButtons : function () {
            Y.each(this._uiHandlesButtons, function(h){
                h.detach();
            });

            this._uiHandlesButtons = [];
        }
}


Y.WidgetButtons = WidgetButtons;


}, '@VERSION@' ,{requires:['base-build', 'widget']});
