YUI.add('button-base', function(Y) {

/**
* Provides an interface for working with button-like DOM nodes
*
* @module button
* @main button
* @since 3.5.0
*/

/**
* returns a properly formed yui class name
*
* @method
* @param str {String} string to be appended at the end of class name
* @return
* @private
*/
function makeClassName(str) {
    if (str) {
        return Y.ClassNameManager.getClassName(Button.NAME, str);
    } else {
        return Y.ClassNameManager.getClassName(Button.NAME);
    }
}

/**
* Creates a button
*
* @class Button
* @param config {Object} Configuration object
* @constructor
*/
function Button(config) {
    this.initializer(config);
}

Button.prototype = {
    TEMPLATE: '<button/>',

    constructor: Button,

    enable: function() {
        this.set('disabled', false);
    },

    disable: function() {
        this.set('disabled', true);
    },
    
    _initAttributes: function(config) {
        config.label = config.label || config.host.getContent(); //Todo: Is this the right place?
        Y.AttributeCore.call(this, Button.ATTRS, config);
    },

    _initNode: function(config) {
        if (config.srcNode) {
            this._host = Y.one(config.srcNode);
        } else {
            this._host = Y.Node.create(this.TEMPLATE);
        }
    },

    _uiSetLabel: function(value) {
        var node = this._host,
            attr = (node.get('tagName').toLowerCase() === 'input') ? 'value' : 'text';

        node.set(attr, value);
        return value;
    },

    _uiSetDisabled: function(value) {
        var node = this.getNode();
        node.getDOMNode().disabled = value; // avoid rerunning setter when this === node
        node.toggleClass(Button.CLASS_NAMES.DISABLED, value);
        return value;
    },

    _uiGetLabel: function() {
        var node = this._host,
            attr = (node.get('tagName').toLowerCase() === 'input') ? 'value' : 'text',
            value;

        value = node.get(attr);
        return value;
    },

    getNode: function() {
        return this._host;
    },

    /**
    * @method initializer
    * @description Internal init() handler.
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config) {
        this._initNode(config);
        this._initAttributes(config);
        this.renderUI(config);
    },
    
    /**
    * @method renderUI
    * @description Renders any UI/DOM elements for Button instances
    * @private
    */
    renderUI: function(config) {
        var node = this._host;
        
        // Set some default node attributes
        node.addClass(Button.CLASS_NAMES.BUTTON);
        node.set('role', 'button');
    }
};

/** 
* Attribute configuration. 
*
* @property ATTRS
* @type {Object}
* @private
* @static
*/
Button.ATTRS = {
    label: {
        setter: '_uiSetLabel',
        getter: '_uiGetLabel',
        lazyAdd: false
    },

    disabled: {
        value: false,
        setter: '_uiSetDisabled',
        lazyAdd: false
    }
};

/**
* Name of this component.
*
* @property NAME
* @type String
* @static
*/
Button.NAME = "button";

/** 
* Array of static constants used to identify the classnames applied to the Button DOM objects
*
* @property CLASS_NAMES
* @type {Array}
* @static
*/
Button.CLASS_NAMES = {
    BUTTON  : makeClassName(),
    DISABLED: makeClassName('disabled')
};

Y.mix(Button.prototype, Y.AttributeCore.prototype);

// Export Button
Y.ButtonBase = Button;
function ButtonPlugin(config) {
    if (!this._initNode) { // hand off to factory when called without new 
        return ButtonPlugin.factory(config);
    }
    ButtonPlugin.superclass.constructor.apply(this, arguments);
}

Y.extend(ButtonPlugin, Y.ButtonBase, {
    // TODO: point to method (_uiSetLabel, etc) instead of getter/setter
    _afterNodeGet: function (name) {
        var ATTRS = this.constructor.ATTRS,
            fn = ATTRS[name] && ATTRS[name].getter && this[ATTRS[name].getter];
        if (fn) {
            return new Y.Do.AlterReturn('get ' + name, fn.call(this));
        }
    },  

    _afterNodeSet: function (name, val) {
        var ATTRS = this.constructor.ATTRS,
            fn = ATTRS[name] && ATTRS[name].setter && this[ATTRS[name].setter];
        if (fn) {
            fn.call(this, val);
        }
    },

    _initNode: function(config) {
        var node = config.host;
        this._host = node;
        Y.Do.after(this._afterNodeGet, node, 'get', this);
        Y.Do.after(this._afterNodeSet, node, 'set', this);
    },
    destroy: function(){
        // TODO: Anything?
    }
}, {
    ATTRS: Y.merge(Y.ButtonBase.ATTRS),
    NAME: 'buttonPlugin',
    NS: 'button'
});

// (node)
// (node, config)
// (config)
ButtonPlugin.factory = function(node, config) {
    
    if (node && !config) {
        if (! (node.nodeType || node.getDOMNode || typeof node == 'string')) {
            config = node;
            node = config.srcNode;
        }
    }
    node = node || config && config.srcNode || Y.DOM.create(Y.Plugin.Button.prototype.TEMPLATE);

    return Y.one(node).plug(Y.Plugin.Button, config);
};

Y.Plugin.Button = ButtonPlugin;

function ButtonWidget(config) {
    ButtonWidget.superclass.constructor.apply(this, arguments);
}

Y.extend(ButtonWidget, Y.Widget,  {
    initializer: function(config) {
        this._host = this.get('boundingBox');
    },

    BOUNDING_TEMPLATE: Y.ButtonBase.prototype.TEMPLATE,
    CONTENT_TEMPLATE: null,

    bindUI: function() {
        var button = this;
        this.after('labelChange', this._afterLabelChange);
        this.after('disabledChange', this._afterDisabledChange);
        this.after('selectedChange', this._afterSelectedChange);
    },

    _uiSetSelected: function(value) {
        this.get('contentBox').toggleClass('yui3-button-selected', value).set('aria-pressed', value); // TODO should support aria-checked (if applicable)
    },
    _afterLabelChange: function(e) {
        this._uiSetLabel(e.newVal);
    },

    _afterDisabledChange: function(e) {
        this._uiSetDisabled(e.newVal);
    },

    _afterSelectedChange: function(e) {
        this._uiSetSelected(e.newVal);
    },

    syncUI: function() {
        this._uiSetLabel(this.get('label'));
        this._uiSetDisabled(this.get('disabled'));
        this._uiSetSelected(this.get('selected'));
    },

}, {
    NAME: 'button',
});

ButtonWidget.ATTRS = {
    label: {
        value: Y.ButtonBase.ATTRS.label.value
    },

    disabled: {
        value: false
    },

    selected: {
        value: false
    }
};

ButtonWidget.HTML_PARSER = {
    label: function(node) {
        this._host = node; // TODO: remove
        return this._uiGetLabel();
    },

    disabled: function(node) {
        return node.getDOMNode().disabled;
    },

    selected: function(node) {
        return node.hasClass('yui3-button-selected');
    }
};

Y.mix(ButtonWidget.prototype, Y.ButtonBase.prototype);

Y.Button = ButtonWidget;





function ToggleButton(config) {
    ButtonWidget.superclass.constructor.apply(this, arguments);
}

// TODO: move to ButtonBase subclass to enable toggle plugin, widget, etc.
Y.extend(ToggleButton, Y.Button,  {
    trigger: 'click',

    select: function() {
        this.set('selected', true);
    },

    unselect: function() {
        this.set('selected', false);
    },

    toggle: function() {
        var button = this;
        button.set('selected', !button.get('selected'));
    },

    bindUI: function() {
        var button = this;
        ToggleButton.superclass.bindUI.call(button);
        button.get('contentBox').set('role', 'toggle');
        button.get('contentBox').on(button.trigger, button.toggle, button);
    }
}, {
    NAME: 'toggleButton'
});

Y.ToggleButton = ToggleButton;


}, '@VERSION@' ,{requires:['widget', 'classnamemanager', 'node']});
