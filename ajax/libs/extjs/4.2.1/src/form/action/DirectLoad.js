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
 * Provides {@link Ext.direct.Manager} support for loading form data.
 *
 * This example illustrates usage of Ext.direct.Direct to **load** a form through Ext.Direct.
 *
 *     var myFormPanel = new Ext.form.Panel({
 *         // configs for FormPanel
 *         title: 'Basic Information',
 *         renderTo: document.body,
 *         width: 300, height: 160,
 *         padding: 10,
 *
 *         // configs apply to child items
 *         defaults: {anchor: '100%'},
 *         defaultType: 'textfield',
 *         items: [{
 *             fieldLabel: 'Name',
 *             name: 'name'
 *         },{
 *             fieldLabel: 'Email',
 *             name: 'email'
 *         },{
 *             fieldLabel: 'Company',
 *             name: 'company'
 *         }],
 *
 *         // configs for BasicForm
 *         api: {
 *             // The server-side method to call for load() requests
 *             load: Profile.getBasicInfo,
 *             // The server-side must mark the submit handler as a 'formHandler'
 *             submit: Profile.updateBasicInfo
 *         },
 *         // specify the order for the passed params
 *         paramOrder: ['uid', 'foo']
 *     });
 *
 *     // load the form
 *     myFormPanel.getForm().load({
 *         // pass 2 arguments to server side getBasicInfo method (len=2)
 *         params: {
 *             foo: 'bar',
 *             uid: 34
 *         }
 *     });
 *
 * The data packet sent to the server will resemble something like:
 *
 *     [
 *         {
 *             "action":"Profile","method":"getBasicInfo","type":"rpc","tid":2,
 *             "data":[34,"bar"] // note the order of the params
 *         }
 *     ]
 *
 * The form will process a data packet returned by the server that is similar to the following format:
 *
 *     [
 *         {
 *             "action":"Profile","method":"getBasicInfo","type":"rpc","tid":2,
 *             "result":{
 *                 "success":true,
 *                 "data":{
 *                     "name":"Fred Flintstone",
 *                     "company":"Slate Rock and Gravel",
 *                     "email":"fred.flintstone@slaterg.com"
 *                 }
 *             }
 *         }
 *     ]
 */
Ext.define('Ext.form.action.DirectLoad', {
    extend:'Ext.form.action.Load',
    requires: ['Ext.direct.Manager'],
    alternateClassName: 'Ext.form.Action.DirectLoad',
    alias: 'formaction.directload',

    type: 'directload',

    run: function() {
        var me = this,
            form = me.form,
            api = form.api,
            fn = api.load,
            method, args;

        if (typeof fn !== 'function') {
            //<debug>
            var fnName = fn;
            //</debug>
            
            api.load = fn = Ext.direct.Manager.parseMethod(fn);

            //<debug>
            if (!Ext.isFunction(fn)) {
                Ext.Error.raise('Cannot resolve Ext.Direct API method ' + fnName);
            }
            //</debug>
        }
        
        method = fn.directCfg.method;
        args = method.getArgs(me.getParams(), form.paramOrder, form.paramsAsHash);
            
        args.push(me.onComplete, me);
        fn.apply(window, args);
    },

    // Direct actions have already been processed and therefore
    // we can directly set the result; Direct Actions do not have
    // a this.response property.
    processResponse: function(result) {
        return (this.result = result);
    },

    onComplete: function(data, response) {
        if (data) {
            this.onSuccess(data);
        } else {
            this.onFailure(null);
        }
    }
});


