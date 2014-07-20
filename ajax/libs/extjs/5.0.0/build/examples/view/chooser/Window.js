/**
 * @class Ext.chooser.Window
 * @extends Ext.window.Window
 * @author Ed Spencer
 * 
 * This is a simple subclass of the built-in Ext.window.Window class. Although it weighs in at 100+ lines, most of this
 * is just configuration. This Window class uses a border layout and creates a DataView in the central region and an
 * information panel in the east. It also sets up a toolbar to enable sorting and filtering of the items in the 
 * DataView. We add a few simple methods to the class at the bottom, see the comments inline for details.
 */
Ext.define('Ext.chooser.Window', {
    extend: 'Ext.window.Window',
    uses: [
        'Ext.layout.container.Border',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.TextItem',
        'Ext.layout.container.Fit'
    ],
    
    height: 400,
    width : 700,
    title : 'Choose an Image',
    closeAction: 'hide',
    layout: 'border',
    // modal: true,
    border: false,
    bodyBorder: false,

    /**
     * @event selected
     * Fired whenever the user selects an image by double clicked it or clicking the window's OK button
     * @param {Ext.data.Model} image The image that was selected
     */
    
    /**
     * initComponent is a great place to put any code that needs to be run when a new instance of a component is
     * created. Here we just specify the items that will go into our Window, plus the Buttons that we want to appear
     * at the bottom. Finally we call the superclass initComponent.
     */
    initComponent: function() {
        this.items = [
            {
                xtype: 'panel',
                region: 'center',
                layout: 'fit',
                items: {
                    xtype: 'iconbrowser',
                    autoScroll: true,
                    id: 'img-chooser-view',
                    listeners: {
                        scope: this,
                        selectionchange: this.onIconSelect,
                        itemdblclick: this.fireImageSelected
                    }
                },
                
                tbar: [
                    {
                        xtype: 'textfield',
                        name : 'filter',
                        fieldLabel: 'Filter',
                        labelAlign: 'right',
                        labelWidth: null,
                        listeners: {
                            scope : this,
                            buffer: 200,
                            change: this.filter
                        }
                    },
                    {
                        margin: '0 0 0 10',
                        inputWidth: 150,
                        xtype: 'combo',
                        labelAlign: 'right',

                        // Use non-breaking space so that labelWidth of null shrinkwraps the unbroken string width
                        fieldLabel: 'Sort\u00a0By',
                        labelWidth: null,
                        valueField: 'field',
                        displayField: 'label',
                        value: 'type',
                        editable: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['field', 'label'],
                            data: [{label: 'Name', field: 'name'}, {label: 'Type', field: 'type'}]
                        }),
                        listeners: {
                            scope : this,
                            select: this.sort
                        }
                    }
                ]
            },
            {
                xtype: 'infopanel',
                region: 'east',
                split: true
            }
        ];
        
        this.buttons = [
            {
                text: 'OK',
                scope: this,
                handler: this.fireImageSelected
            },
            {
                text: 'Cancel',
                scope: this,
                handler: function() {
                    this.hide();
                }
            }
        ];
        
        this.callParent(arguments);
    },
    
    /**
     * @private
     * Called whenever the user types in the Filter textfield. Filters the DataView's store
     */
    filter: function(field, newValue) {
        var view = this.down('iconbrowser'),
            store = view.getStore(),
            selModel = view.getSelectionModel(),
            selection = selModel.getSelection()[0];
        
        store.getFilters().replaceAll({
            property: 'name',
            anyMatch: true,
            value   : newValue
        });
        if (selection && store.indexOf(selection) === -1) {
            selModel.clearSelections();
            this.down('infopanel').clear();
        }
        
    },
    
    /**
     * @private
     * Called whenever the user changes the sort field using the top toolbar's combobox
     */
    sort: function() {
        var field = this.down('combobox').getValue();
        this.down('iconbrowser').store.sort(field);
    },
    
    /**
     * Called whenever the user clicks on an item in the DataView. This tells the info panel in the east region to
     * display the details of the image that was clicked on
     */
    onIconSelect: function(dataview, selections) {
        var selected = selections[0];
        
        if (selected) {
            this.down('infopanel').loadRecord(selected);
        }
    },
    
    /**
     * Fires the 'selected' event, informing other components that an image has been selected
     */
    fireImageSelected: function() {
        var selectedImage = this.down('iconbrowser').selModel.getSelection()[0];
        
        if (selectedImage) {
            this.fireEvent('selected', selectedImage);
            this.hide();
        }
    }
});