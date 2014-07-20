/**
 * This example demonstrates the flexible layout capabilities of the RadioGroup class.
 * It also shows that you can validate radios as a group - try submitting the form before
 * changing any values to see this.
 */
Ext.define('KitchenSink.view.form.RadioGroupForm', {
    extend: 'Ext.form.Panel',
    xtype: 'form-radiogroup',
    
    // This example shares its ViewController with Checkbox Group Form
    controller: 'form-checkboxgroup',
    
    //<example>
    exampleTitle: 'Radio Groups',
    otherContent: [{
        type: 'ViewController',
        path: 'app/view/form/CheckboxGroupFormController.js'
    }],
    //</example>
    
    title: 'Radio Group Example',
    frame: true,
    width: 650,
    bodyPadding: 10,
    
    fieldDefaults: {
        labelWidth: 120
    },
    
    items: [{
        /*====================================================================
         * Individual checkbox/radio examples
         *====================================================================*/

        // Using checkbox/radio groups will generally be more convenient and flexible than
        // using individual checkbox and radio controls, but this shows that you can
        // certainly do so if you only have a single control at a time.
        xtype: 'container',
        layout: 'hbox',
        margin: '0 0 10',
        items: [{
            xtype: 'fieldset',
            flex: 1,
            title: 'Individual Checkboxes',
            defaultType: 'checkbox', // each item will be a checkbox
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                hideEmptyLabel: false
            },
            items: [{
                xtype: 'textfield',
                name: 'txt-test1',
                fieldLabel: 'Alignment Test'
            }, {
                fieldLabel: 'Favorite Animals',
                boxLabel: 'Dog',
                name: 'fav-animal-dog',
                inputValue: 'dog'
            }, {
                boxLabel: 'Cat',
                name: 'fav-animal-cat',
                inputValue: 'cat'
            }, {
                checked: true,
                boxLabel: 'Monkey',
                name: 'fav-animal-monkey',
                inputValue: 'monkey'
            }]
        }, {
            xtype: 'component',
            width: 10
        }, {
            xtype: 'fieldset',
            flex: 1,
            title: 'Individual Radios',
            defaultType: 'radio', // each item will be a radio button
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                hideEmptyLabel: false
            },
            items: [{
                xtype: 'textfield',
                name: 'txt-test2',
                fieldLabel: 'Alignment Test'
            }, {
                checked: true,
                fieldLabel: 'Favorite Color',
                boxLabel: 'Red',
                name: 'fav-color',
                inputValue: 'red'
            }, {
                boxLabel: 'Blue',
                name: 'fav-color',
                inputValue: 'blue'
            }, {
                boxLabel: 'Green',
                name: 'fav-color',
                inputValue: 'green'
            }]
        }]
    }, {
        /*====================================================================
         * RadioGroup examples
         *====================================================================*/
        // NOTE: These radio examples use the exact same options as the checkbox ones
        // above, so the comments will not be repeated.  Please see comments above for
        // additional explanation on some config options.
        xtype: 'fieldset',
        title: 'Radio Groups',
        // in this section we use the form layout that will aggregate all of the fields
        // into a single table, rather than one table per field.
        layout: 'anchor',
        collapsible: true,
        defaults: {
            anchor: '100%'
        },
        items: [{
            xtype: 'textfield',
            name: 'txt-test4',
            fieldLabel: 'Alignment Test'
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Auto Layout',
            cls: 'x-check-group-alt',
            items: [
                {boxLabel: 'Item 1', name: 'rb-auto', inputValue: 1},
                {boxLabel: 'Item 2', name: 'rb-auto', inputValue: 2, checked: true},
                {boxLabel: 'Item 3', name: 'rb-auto', inputValue: 3},
                {boxLabel: 'Item 4', name: 'rb-auto', inputValue: 4},
                {boxLabel: 'Item 5', name: 'rb-auto', inputValue: 5}
            ]
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Single Column',
            columns: 1,
            items: [
                {boxLabel: 'Item 1', name: 'rb-col', inputValue: 1},
                {boxLabel: 'Item 2', name: 'rb-col', inputValue: 2, checked: true},
                {boxLabel: 'Item 3', name: 'rb-col', inputValue: 3}
            ]
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Multi-Column (horizontal)',
            cls: 'x-check-group-alt',
            columns: 3,
            items: [
                {boxLabel: 'Item 1', name: 'rb-horiz-1', inputValue: 1},
                {boxLabel: 'Item 2', name: 'rb-horiz-1', inputValue: 2, checked: true},
                {boxLabel: 'Item 3', name: 'rb-horiz-1', inputValue: 3},
                {boxLabel: 'Item 1', name: 'rb-horiz-2', inputValue: 1, checked: true},
                {boxLabel: 'Item 2', name: 'rb-horiz-2', inputValue: 2}
            ]
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Multi-Column (vertical)',
            columns: 3,
            vertical: true,
            items: [
                {boxLabel: 'Item 1', name: 'rb-vert', inputValue: 1},
                {boxLabel: 'Item 2', name: 'rb-vert', inputValue: 2, checked: true},
                {boxLabel: 'Item 3', name: 'rb-vert', inputValue: 3},
                {boxLabel: 'Item 4', name: 'rb-vert', inputValue: 4},
                {boxLabel: 'Item 5', name: 'rb-vert', inputValue: 5}
            ]
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Multi-Column<br />(custom widths)',
            cls: 'x-check-group-alt',
            columns: [100, 100],
            vertical: true,
            items: [
                {boxLabel: 'Item 1', name: 'rb-custwidth', inputValue: 1},
                {boxLabel: 'Item 2', name: 'rb-custwidth', inputValue: 2, checked: true},
                {boxLabel: 'Item 3', name: 'rb-custwidth', inputValue: 3},
                {boxLabel: 'Item 4', name: 'rb-custwidth', inputValue: 4},
                {boxLabel: 'Item 5', name: 'rb-custwidth', inputValue: 5}
            ]
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Custom Layout<br />(w/ validation)',
            allowBlank: false,
            msgTarget: 'side',
            autoFitErrors: false,
            anchor: '-18',
            layout: 'column',
            defaultType: 'container',
            items: [{
                columnWidth: .25,
                items: [
                    {xtype: 'component', html: 'Heading 1', cls:'x-form-check-group-label'},
                    {xtype: 'radiofield', boxLabel: 'Item 1', name: 'rb-cust', inputValue: 1},
                    {xtype: 'radiofield', boxLabel: 'Item 2', name: 'rb-cust', inputValue: 2}
                ]
            },{
                columnWidth: .4,
                items: [
                    {xtype: 'component', html: 'Heading 2', cls:'x-form-check-group-label'},
                    {xtype: 'radiofield', boxLabel: 'A long item just for fun', name: 'rb-cust', inputValue: 3}
                ]
            },{
                columnWidth: .25,
                items: [
                    {xtype: 'component', html: 'Heading 3', cls:'x-form-check-group-label'},
                    {xtype: 'radiofield', boxLabel: 'Item 4', name: 'rb-cust', inputValue: 4},
                    {xtype: 'radiofield', boxLabel: 'Item 5', name: 'rb-cust', inputValue: 5}
                ]
            }]
        }]
    }],
    
    buttons: [{
        text: 'Save',
        handler: 'onSaveFormClick'
    }, {
        text: 'Reset',
        handler: 'onResetFormClick'
    }]
});
