YUI.add('widget-buttons', function(Y) {

/**
 * Provides header/footer button support for Widgets that implement the WidgetStdMod extension
 *
 * @module widget-buttons
 * @author tilomitra
 */

var BOUNDING_BOX  = "boundingBox",
    VISIBLE       = "visible",
    CLICK         = "click",
    RENDER_UI     = "renderUI",
    BIND_UI       = "bindUI",
    SYNC_UI       = "syncUI",
    BTN           = "button",
    BUTTON_CHANGE = "buttonsChange",
    getCN         = Y.ClassNameManager.getClassName,
    CREATE        = Y.Node.create,

    Lang = Y.Lang;


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
 * Static hash of default class names used for the inner <span> ("content"),
 * the <a> ("button"), and the outer span ("wrapper").
 *
 * @property BUTTON_CLASS_NAMES
 * @static
 * @type object
 */
WidgetButtons.BUTTON_CLASS_NAMES = {
    buttons: Y.Widget.getClassName('buttons'),
    wrapper: Y.Widget.getClassName(BTN, 'wrapper'),
    button : getCN(BTN),
    content: getCN(BTN, 'content'),
    icon   : getCN(BTN, 'icon')
};

/**
 * Static property used to define the default attribute
 * configuration introduced by WidgetButtons.
 *
 * @property ATTRS
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
     * <p>section: {String|Object} Whether the button should be placed in the header or footer. Represented as "header" or "footer"</p>
     * <p>classNames: {String|Array[String]} A set of additional CSS class names which would be added to the button node.</p>
     */
    buttons: {

        value: [
            {
                type: "close"
            }
        ],
        validator: Lang.isArray
    }

};


/**
 * Static hash of buttons that have all their properties defined, so that they can be used by supplying a value to the "type" property in the button attribute.
 * The "close" button is currently defined in this object (sets the [x] in the top-right of the header).
 *
 * @property DEFAULT_BUTTONS
 * @static
 * @type object
 */
WidgetButtons.DEFAULT_BUTTONS = {
    "close": {
        section   : Y.WidgetStdMod.HEADER,
        value     : '<span class="' + WidgetButtons.BUTTON_CLASS_NAMES.icon + '" />',
        classNames: getCN(BTN, 'close'),
        action    : function (e) {
            e.preventDefault();
            this.hide();
        }
    }
};

/**
 * <p>Object used to specify the HTML template for the buttons. Consists of the following properties</p>
 * <p>defaultTemplate: Specifies the HTML markup for each button</p>
 * <p>wrapper: Specifies the HTML markup for the wrapper, which is a DOM Element that wraps around all the buttons</p>
 *
 * @property TEMPLATES
 * @static
 * @type object
 */
WidgetButtons.TEMPLATES = {
    wrapper        : '<span class="' + WidgetButtons.BUTTON_CLASS_NAMES.wrapper + '"></span>',
    defaultTemplate: '<a href="{href}" class="' + WidgetButtons.BUTTON_CLASS_NAMES.button + '">' +
                        '<span class="' + WidgetButtons.BUTTON_CLASS_NAMES.content + '">{value}</span></a>'
};

WidgetButtons.prototype = {
    // *** Instance Members *** //

        _hdBtnNode       : null,
        _ftBtnNode       : null,
        _buttonsArray    : null,
        _uiHandlesButtons: null,

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
            this.get(BOUNDING_BOX).addClass(WidgetButtons.BUTTON_CLASS_NAMES.buttons);

            this._buttonsArray = [];

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

            this._uiHandlesButtons = [];

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
        _createButtons: function () {
            var header         = Y.WidgetStdMod.HEADER,
                footer         = Y.WidgetStdMod.FOOTER,
                templates      = WidgetButtons.TEMPLATES,
                defaultButtons = WidgetButtons.DEFAULT_BUTTONS,
                hdBtnNode      = this._hdBtnNode,
                ftBtnNode      = this._ftBtnNode,
                buttonsArray   = this._buttonsArray;

            Y.each(this.get('buttons'), function (button) {
                var template, node, classNames;

                // Make sure we actually have some Object.
                if ( ! Lang.isObject(button)) { return; }

                // Check to see if the `type` property is defined,
                // and if a button corresponds to that type.
                if (button.type && defaultButtons[button.type]) {
                    button = defaultButtons[button.type];
                }

                template = Lang.sub(templates.defaultTemplate, {
                    href : button.href || '#',
                    value: button.value
                });

                // Create Y.Node instance of button.
                node = CREATE(template);

                // Add any classes to the Node.
                classNames = Y.Array(button.classNames);
                Y.Array.each(classNames, node.addClass, node);

                // Push the Node onto the Array of all the buttons.
                buttonsArray.push({ node: node, cb: button.action });

                // Append button to wrapper Node.
                switch (button.section) {
                case header:
                    hdBtnNode.appendChild(node);
                    break;

                case footer:
                    ftBtnNode.appendChild(node);
                    break;

                default:
                }
            });

            return true;
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
};


Y.WidgetButtons = WidgetButtons;


}, '@VERSION@' ,{requires:['base-build', 'widget', 'widget-stdmod']});
