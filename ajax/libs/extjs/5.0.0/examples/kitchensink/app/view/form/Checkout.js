/**
 * This shows an example of a common shopping cart checkout form. It demonstrates uses
 * of FieldContainer and various layouts for arranging and aligning fields, ComboBox
 * fields for state and month selection, and listening to change events to automatically
 * copy values from Mailing Address to Billing Address fields.
 */
Ext.define('KitchenSink.view.form.Checkout', {
    extend: 'Ext.form.Panel',
    xtype: 'form-checkout',
    
    //<example>
    requires: [
        'KitchenSink.model.State',
        'KitchenSink.store.States'
    ],
    
    exampleTitle: 'Checkout Form',
    otherContent: [{
        type: 'Model',
        path: 'app/model/State.js'
    },{
        type: 'Data',
        path: 'app/data/DataSets.js'
    }],
    themes: {
        classic: {
            formWidth: 550,
            normalLabelWidth: 90,
            longLabelWidth: 90,
            phoneWidth: 200,
            phoneLabelWidth: 100,
            stateWidth: 115,
            postalCodeLabelWidth: 80,
            expirationMonthWidth: 100,
            expirationYearWidth: 70
        },
        neptune: {
            formWidth: 550,
            normalLabelWidth: 90,
            longLabelWidth: 110,
            phoneWidth: 200,
            phoneLabelWidth: 100,
            stateWidth: 115,
            postalCodeLabelWidth: 80,
            expirationMonthWidth: 100,
            expirationYearWidth: 70
        },
        'neptune-touch': {
            formWidth: 650,
            normalLabelWidth: 100,
            longLabelWidth: 130,
            phoneWidth: 230,
            phoneLabelWidth: 120,
            stateWidth: 125,
            postalCodeLabelWidth: 90,
            expirationMonthWidth: 120,
            expirationYearWidth: 110
        }
    },
    //</example>

    frame: true,
    title: 'Complete Check Out',
    bodyPadding: 5,

    initComponent: function(){
        var states = new Ext.data.Store({
            model: KitchenSink.model.State,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'array'
                }
            },
            data: KitchenSink.data.DataSets.states
        }),
        billingStates = new Ext.data.Store({
            model: KitchenSink.model.State,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'array'
                }
            },
            data: KitchenSink.data.DataSets.states
        });

        Ext.apply(this, {
            width: this.themeInfo.formWidth,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: this.themeInfo.normalLabelWidth,
                msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
            },

            items: [{
                xtype: 'fieldset',
                title: 'Your Contact Information',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Name',
                    layout: 'hbox',
                    combineErrors: true,
                    defaultType: 'textfield',
                    defaults: {
                        hideLabel: 'true'
                    },
                    items: [{
                        name: 'firstName',
                        fieldLabel: 'First Name',
                        flex: 2,
                        emptyText: 'First',
                        allowBlank: false
                    }, {
                        name: 'lastName',
                        fieldLabel: 'Last Name',
                        flex: 3,
                        margin: '0 0 0 6',
                        emptyText: 'Last',
                        allowBlank: false
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    margin: '0 0 5 0',
                    items: [{
                        fieldLabel: 'Email Address',
                        name: 'email',
                        vtype: 'email',
                        flex: 1,
                        allowBlank: false
                    }, {
                        fieldLabel: 'Phone Number',
                        labelWidth: this.themeInfo.phoneLabelWidth,
                        name: 'phone',
                        width: this.themeInfo.phoneWidth,
                        emptyText: 'xxx-xxx-xxxx',
                        maskRe: /[\d\-]/,
                        regex: /^\d{3}-\d{3}-\d{4}$/,
                        regexText: 'Must be in the format xxx-xxx-xxxx'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Mailing Address',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    labelWidth: this.themeInfo.longLabelWidth,
                    fieldLabel: 'Street Address',
                    name: 'mailingStreet',
                    listeners: {
                        scope: this,
                        change: this.onMailingAddrFieldChange
                    },
                    billingFieldName: 'billingStreet',
                    allowBlank: false
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        labelWidth: this.themeInfo.longLabelWidth,
                        xtype: 'textfield',
                        fieldLabel: 'City',
                        name: 'mailingCity',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billingFieldName: 'billingCity',
                        flex: 1,
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        name: 'mailingState',
                        forceSelection: true,
                        maxLength: 2,
                        enforceMaxLength: true,
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billingFieldName: 'billingState',
                        fieldLabel: 'State',
                        labelWidth: 50,
                        width: this.themeInfo.stateWidth,
                        listConfig: {
                            minWidth: null
                        },
                        store: states,
                        valueField: 'abbr',
                        displayField: 'abbr',
                        typeAhead: true,
                        queryMode: 'local',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Postal Code',
                        labelWidth: this.themeInfo.postalCodeLabelWidth,
                        name: 'mailingPostalCode',
                        listeners: {
                            scope: this,
                            change: this.onMailingAddrFieldChange
                        },
                        billingFieldName: 'billingPostalCode',
                        width: 160,
                        allowBlank: false,
                        maxLength: 10,
                        enforceMaxLength: true,
                        maskRe: /[\d\-]/,
                        regex: /^\d{5}(\-\d{4})?$/,
                        regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Billing Address',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'checkbox',
                    name: 'billingSameAsMailing',
                    boxLabel: 'Same as Mailing Address?',
                    hideLabel: true,
                    checked: true,
                    margin: '0 0 10 0',
                    scope: this,
                    handler: this.onSameAddressChange
                }, {
                    labelWidth: this.themeInfo.longLabelWidth,
                    xtype: 'textfield',
                    fieldLabel: 'Street Address',
                    name: 'billingStreet',
                    style: 'opacity:.3',
                    disabled: true,
                    allowBlank: false
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        labelWidth: this.themeInfo.longLabelWidth,
                        xtype: 'textfield',
                        fieldLabel: 'City',
                        name: 'billingCity',
                        style: 'opacity:.3',
                        flex: 1,
                        disabled: true,
                        allowBlank: false
                    }, {
                        xtype: 'combobox',
                        name: 'billingState',
                        maxLength: 2,
                        enforceMaxLength: true,
                        style: 'opacity:.3',
                        fieldLabel: 'State',
                        labelWidth: 50,
                        listConfig: {
                            minWidth: null
                        },
                        width: this.themeInfo.stateWidth,
                        store: billingStates,
                        valueField: 'abbr',
                        displayField: 'abbr',
                        typeAhead: true,
                        queryMode: 'local',
                        disabled: true,
                        allowBlank: false,
                        forceSelection: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Postal Code',
                        labelWidth: this.themeInfo.postalCodeLabelWidth,
                        name: 'billingPostalCode',
                        style: 'opacity:.3',
                        width: 160,
                        disabled: true,
                        allowBlank: false,
                        maxLength: 10,
                        enforceMaxLength: true,
                        maskRe: /[\d\-]/,
                        regex: /^\d{5}(\-\d{4})?$/,
                        regexText: 'Must be in the format xxxxx or xxxxx-xxxx'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Payment',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'radiogroup',
                    layout: {
                        autoFlex: false
                    },
                    defaults: {
                        name: 'ccType',
                        margin: '0 15 0 0'
                    },
                    items: [{
                        inputValue: 'visa',
                        boxLabel: 'VISA',
                        checked: true
                    }, {
                        inputValue: 'mastercard',
                        boxLabel: 'MasterCard'
                    }, {
                        inputValue: 'amex',
                        boxLabel: 'American Express'
                    }, {
                        inputValue: 'discover',
                        boxLabel: 'Discover'
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'ccName',
                    fieldLabel: 'Name On Card',
                    labelWidth: 110,
                    allowBlank: false
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'ccNumber',
                        fieldLabel: 'Card Number',
                        labelWidth: 110,
                        flex: 1,
                        allowBlank: false,
                        minLength: 15,
                        maxLength: 16,
                        enforceMaxLength: true,
                        maskRe: /\d/
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Expiration',
                        labelWidth: 75,
                        layout: 'hbox',
                        items: [{
                            xtype: 'combobox',
                            name: 'ccExpireMonth',
                            displayField: 'name',
                            valueField: 'num',
                            queryMode: 'local',
                            emptyText: 'Month',
                            hideLabel: true,
                            margin: '0 6 0 0',
                            store: new Ext.data.Store({
                                fields: ['name', 'num'],
                                data: (function() {
                                    var data = [];
                                        Ext.Array.forEach(Ext.Date.monthNames, function(name, i) {
                                        data[i] = {name: name, num: i + 1};
                                    });
                                    return data;
                                })()
                            }),
                            width: this.themeInfo.expirationMonthWidth,
                            allowBlank: false,
                            forceSelection: true
                        }, {
                            xtype: 'numberfield',
                            name: 'ccExpireYear',
                            hideLabel: true,
                            width: this.themeInfo.expirationYearWidth,
                            value: new Date().getFullYear(),
                            minValue: new Date().getFullYear(),
                            allowBlank: false
                        }]
                    }]
                }]
            }
        ],

        buttons: [{
            text: 'Reset',
            scope: this,
            handler: this.onResetClick
        }, {
            text: 'Complete Purchase',
            width: 150,
            scope: this,
            handler: this.onCompleteClick
        }]
        });
        this.callParent();
    },

    onResetClick: function(){
        this.getForm().reset();
    },

    onCompleteClick: function(){
        var form = this.getForm();
        if (form.isValid()) {
            Ext.MessageBox.alert('Submitted Values', form.getValues(true));
        }
    },

    onMailingAddrFieldChange: function(field){
        var copyToBilling = this.down('[name=billingSameAsMailing]').getValue(),
            copyField = this.down('[name=' + field.billingFieldName + ']');

        if (copyToBilling) {
            copyField.setValue(field.getValue());
        } else {
            copyField.clearInvalid();
        }
    },

    /**
     * Enables or disables the billing address fields according to whether the checkbox is checked.
     * In addition to disabling the fields, they are animated to a low opacity so they don't take
     * up visual attention.
     */
    onSameAddressChange: function(box, checked){
        var fieldset = box.ownerCt;
        Ext.Array.forEach(fieldset.previousSibling().query('textfield'), this.onMailingAddrFieldChange, this);
        Ext.Array.forEach(fieldset.query('textfield'), function(field) {
            field.setDisabled(checked);
            field.el.animate({opacity: checked ? 0.3 : 1});
        });
    }
});
