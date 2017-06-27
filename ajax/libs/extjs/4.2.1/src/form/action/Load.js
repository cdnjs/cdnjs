/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * A class which handles loading of data from a server into the Fields of an {@link Ext.form.Basic}.
 *
 * Instances of this class are only created by a {@link Ext.form.Basic Form} when {@link Ext.form.Basic#load load}ing.
 *
 * ## Response Packet Criteria
 *
 * A response packet **must** contain:
 *
 *   - **`success`** property : Boolean
 *   - **`data`** property : Object
 *
 * The `data` property contains the values of Fields to load. The individual value object for each Field is passed to
 * the Field's {@link Ext.form.field.Field#setValue setValue} method.
 *
 * ## JSON Packets
 *
 * By default, response packets are assumed to be JSON, so for the following form load call:
 *
 *     var myFormPanel = new Ext.form.Panel({
 *         title: 'Client and routing info',
 *         renderTo: Ext.getBody(),
 *         defaults: {
 *             xtype: 'textfield'
 *         },
 *         items: [{
 *             fieldLabel: 'Client',
 *             name: 'clientName'
 *         }, {
 *             fieldLabel: 'Port of loading',
 *             name: 'portOfLoading'
 *         }, {
 *             fieldLabel: 'Port of discharge',
 *             name: 'portOfDischarge'
 *         }]
 *     });
 *     myFormPanel.{@link Ext.form.Panel#getForm getForm}().{@link Ext.form.Basic#load load}({
 *         url: '/getRoutingInfo.php',
 *         params: {
 *             consignmentRef: myConsignmentRef
 *         },
 *         failure: function(form, action) {
 *             Ext.Msg.alert("Load failed", action.result.errorMessage);
 *         }
 *     });
 *
 * a **success response** packet may look like this:
 *
 *     {
 *         success: true,
 *         data: {
 *             clientName: "Fred. Olsen Lines",
 *             portOfLoading: "FXT",
 *             portOfDischarge: "OSL"
 *         }
 *     }
 *
 * while a **failure response** packet may look like this:
 *
 *     {
 *         success: false,
 *         errorMessage: "Consignment reference not found"
 *     }
 *
 * Other data may be placed into the response for processing the {@link Ext.form.Basic Form}'s callback or event handler
 * methods. The object decoded from this JSON is available in the {@link Ext.form.action.Action#result result} property.
 */
Ext.define('Ext.form.action.Load', {
    extend:'Ext.form.action.Action',
    requires: ['Ext.data.Connection'],
    alternateClassName: 'Ext.form.Action.Load',
    alias: 'formaction.load',

    type: 'load',

    /**
     * @private
     */
    run: function() {
        Ext.Ajax.request(Ext.apply(
            this.createCallback(),
            {
                method: this.getMethod(),
                url: this.getUrl(),
                headers: this.headers,
                params: this.getParams()
            }
        ));
    },

    /**
     * @private
     */
    onSuccess: function(response){
        var result = this.processResponse(response),
            form = this.form;
        if (result === true || !result.success || !result.data) {
            this.failureType = Ext.form.action.Action.LOAD_FAILURE;
            form.afterAction(this, false);
            return;
        }
        form.clearInvalid();
        form.setValues(result.data);
        form.afterAction(this, true);
    },

    /**
     * @private
     */
    handleResponse: function(response) {
        var reader = this.form.reader,
            rs, data;
        if (reader) {
            rs = reader.read(response);
            data = rs.records && rs.records[0] ? rs.records[0].data : null;
            return {
                success : rs.success,
                data : data
            };
        }
        return Ext.decode(response.responseText);
    }
});

