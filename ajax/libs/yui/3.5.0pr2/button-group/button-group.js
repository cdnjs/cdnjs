YUI.add('button-group', function(Y) {

/**
* Allows Y.Button instances to be grouped together
*
* @module ButtonGroup
* @main ButtonGroup
* @since 3.5.0
*/

/**
* Creates a ButtonGroup
*
* @class ButtonGroup
* @extends Base
* @param config {Object} Configuration object
* @constructor
*/
function ButtonGroup(config) {
    ButtonGroup.superclass.constructor.apply(this, arguments);
}

/* ButtonGroup extends the Base class */
Y.extend(ButtonGroup, Y.Base, {
    
    /**
    * @method initializer
    * @description Internal init() handler.
    * @param config {Object} Config object.
    * @private
    */
    initializer: function(config){
        
        this.buttons = new Y.ArrayList();

        if (config.srcNodes){
            if (Y.Lang.isString(config.srcNodes)){
                config.srcNodes = Y.all(config.srcNodes);
            }
            config.buttons = [];
            config.srcNodes.each(function(node){
                config.srcNode = node;
                config.buttons.push(new Y.Button(config));
            });

            delete config.srcNodes;
        }
        
        if (config.buttons) {
            Y.Array.each(config.buttons, function(button){
                this.addButton(button);
            }, this);
        }
        
    },
    
    /**
    * @method getButtons
    * @description Returns all Y.Buttons instances assigned to this group
    * @public
    */
    getButtons: function() {
        return this.buttons._items;
    },
    
    /**
    * @method getSelectedButtons
    * @description Returns all Y.Buttons instances that are selected
    * @public
    */
    getSelectedButtons: function() {

        var selected = [], buttons;
        buttons = this.buttons;

        buttons.each(function(button){
            if (button.get('selected')){
                selected.push(button);
            }
        });

        return selected;
    },
    
    /**
    * @method getSelectedValues
    * @description Returns the values of all Y.Button instances that are selected
    * @public
    */
    getSelectedValues: function() {
        var selected, values = [];
        selected = this.getSelectedButtons();
        Y.Array.each(selected, function(button){
            values.push(button.getNode().get('value'));
        });

        return values;
    },
    
    /**
    * @method addButton
    * @description Assigns a Y.Button instance to this group
    * @public
    */
    addButton: function(button){
        var type = this.get('type');
        if (type === 'checkbox') {
            button.set('type', 'checkbox');
            button.on('click', this._onCBButtonClick, this);
        }
        else if (type === 'radio') {
            button.on('click', this._onRadioButtonClick, this);
        }
        
        this.buttons.add(button);
    },
    
    /**
    * @method _onButtonClick
    * @description Triggered when a button is clicked and this is a radio group
    * @protected
    */
    _onRadioButtonClick: function(e) {
        var clickedButton = e.target;
        
        if (!clickedButton.get('selected')) {
            var selectedButtons = this.getSelectedButtons();
            Y.Array.each(selectedButtons, function(button){
                button.unselect();
            });
            clickedButton.select();

            // Fire change event
            this.fire('selectionChange');
        }
        else {
            // TODO: anything?
        }
    },
    
    /**
    * @method _onButtonClick
    * @description Triggered when a button is clicked and this is a checkbox group
    * @protected
    */
    _onCBButtonClick: function(e) {
        // Fire change event
        this.fire('selectionChange');
    }
    
}, {
    /** 
    * Array of attributes
    *
    * @property ATTRS
    * @type {Array}
    * @private
    * @static
    */
    ATTRS: {
        type: {
            writeOnce: 'initOnly',
            value: 'radio'
        }
    }
});

// -- Static Properties ----------------------------------------------------------

/**
* Name of this component.
*
* @property NAME
* @type String
* @static
*/
ButtonGroup.NAME = "buttongroup";


// Export ButtonGroup
Y.ButtonGroup = ButtonGroup;


}, '@VERSION@' ,{requires:['button-base']});
