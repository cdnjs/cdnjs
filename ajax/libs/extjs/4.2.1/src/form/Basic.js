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
 * Provides input field management, validation, submission, and form loading services for the collection
 * of {@link Ext.form.field.Field Field} instances within a {@link Ext.container.Container}. It is recommended
 * that you use a {@link Ext.form.Panel} as the form container, as that has logic to automatically
 * hook up an instance of {@link Ext.form.Basic} (plus other conveniences related to field configuration.)
 *
 * ## Form Actions
 *
 * The Basic class delegates the handling of form loads and submits to instances of {@link Ext.form.action.Action}.
 * See the various Action implementations for specific details of each one's functionality, as well as the
 * documentation for {@link #doAction} which details the configuration options that can be specified in
 * each action call.
 *
 * The default submit Action is {@link Ext.form.action.Submit}, which uses an Ajax request to submit the
 * form's values to a configured URL. To enable normal browser submission of an Ext form, use the
 * {@link #standardSubmit} config option.
 *
 * ## File uploads
 *
 * File uploads are not performed using normal 'Ajax' techniques; see the description for
 * {@link #hasUpload} for details. If you're using file uploads you should read the method description.
 *
 * ## Example usage:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Basic Form',
 *         renderTo: Ext.getBody(),
 *         bodyPadding: 5,
 *         width: 350,
 *
 *         // Any configuration items here will be automatically passed along to
 *         // the Ext.form.Basic instance when it gets created.
 *
 *         // The form will submit an AJAX request to this URL when submitted
 *         url: 'save-form.php',
 *
 *         items: [{
 *             xtype: 'textfield',
 *             fieldLabel: 'Field',
 *             name: 'theField'
 *         }],
 *
 *         buttons: [{
 *             text: 'Submit',
 *             handler: function() {
 *                 // The getForm() method returns the Ext.form.Basic instance:
 *                 var form = this.up('form').getForm();
 *                 if (form.isValid()) {
 *                     // Submit the Ajax request and handle the response
 *                     form.submit({
 *                         success: function(form, action) {
 *                            Ext.Msg.alert('Success', action.result.message);
 *                         },
 *                         failure: function(form, action) {
 *                             Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
 *                         }
 *                     });
 *                 }
 *             }
 *         }]
 *     });
 *
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.form.Basic', {
    extend: 'Ext.util.Observable',
    alternateClassName: 'Ext.form.BasicForm',
    requires: ['Ext.util.MixedCollection', 'Ext.form.action.Load', 'Ext.form.action.Submit',
               'Ext.window.MessageBox', 'Ext.data.Errors', 'Ext.util.DelayedTask'],

    /**
     * Creates new form.
     * @param {Ext.container.Container} owner The component that is the container for the form, usually a {@link Ext.form.Panel}
     * @param {Object} config Configuration options. These are normally specified in the config to the
     * {@link Ext.form.Panel} constructor, which passes them along to the BasicForm automatically.
     */
    constructor: function(owner, config) {
        var me = this,
            reader;

        /**
         * @property {Ext.container.Container} owner
         * The container component to which this BasicForm is attached.
         */
        me.owner = owner;
        
        me.checkValidityTask = new Ext.util.DelayedTask(me.checkValidity, me);
        me.checkDirtyTask = new Ext.util.DelayedTask(me.checkDirty, me);
        
        // We use the monitor here as opposed to event bubbling. The problem with bubbling is it doesn't
        // let us react to items being added/remove at different places in the hierarchy which may have an
        // impact on the dirty/valid state.
        me.monitor = new Ext.container.Monitor({
            selector: '[isFormField]',
            scope: me,
            addHandler: me.onFieldAdd,
            removeHandler: me.onFieldRemove
        });
        me.monitor.bind(owner);

        Ext.apply(me, config);

        // Normalize the paramOrder to an Array
        if (Ext.isString(me.paramOrder)) {
            me.paramOrder = me.paramOrder.split(/[\s,|]/);
        }
        
        reader = me.reader;
        if (reader && !reader.isReader) {
            if (typeof reader === 'string') {
                reader = {
                    type: reader
                };
            }
            me.reader = Ext.createByAlias('reader.' + reader.type, reader);
        }
        
        reader = me.errorReader;
        if (reader && !reader.isReader) {
            if (typeof reader === 'string') {
                reader = {
                    type: reader
                };
            }
            me.errorReader = Ext.createByAlias('reader.' + reader.type, reader);
        }

        me.addEvents(
            /**
             * @event beforeaction
             * Fires before any action is performed. Return false to cancel the action.
             * @param {Ext.form.Basic} this
             * @param {Ext.form.action.Action} action The {@link Ext.form.action.Action} to be performed
             */
            'beforeaction',
            /**
             * @event actionfailed
             * Fires when an action fails.
             * @param {Ext.form.Basic} this
             * @param {Ext.form.action.Action} action The {@link Ext.form.action.Action} that failed
             */
            'actionfailed',
            /**
             * @event actioncomplete
             * Fires when an action is completed.
             * @param {Ext.form.Basic} this
             * @param {Ext.form.action.Action} action The {@link Ext.form.action.Action} that completed
             */
            'actioncomplete',
            /**
             * @event validitychange
             * Fires when the validity of the entire form changes.
             * @param {Ext.form.Basic} this
             * @param {Boolean} valid `true` if the form is now valid, `false` if it is now invalid.
             */
            'validitychange',
            /**
             * @event dirtychange
             * Fires when the dirty state of the entire form changes.
             * @param {Ext.form.Basic} this
             * @param {Boolean} dirty `true` if the form is now dirty, `false` if it is no longer dirty.
             */
            'dirtychange'
        );
        me.callParent();
    },

    /**
     * Do any post layout initialization
     * @private
     */
    initialize : function() {
        this.initialized = true;
        this.onValidityChange(!this.hasInvalidField());
    },


    /**
     * @cfg {String} method
     * The request method to use (GET or POST) for form actions if one isn't supplied in the action options.
     */

    /**
     * @cfg {Object/Ext.data.reader.Reader} reader
     * An Ext.data.reader.Reader (e.g. {@link Ext.data.reader.Xml}) instance or
     * configuration to be used to read data when executing 'load' actions. This 
     * is optional as there is built-in support for processing JSON responses.
     */

    /**
     * @cfg {Object/Ext.data.reader.Reader} errorReader
     * An Ext.data.reader.Reader (e.g. {@link Ext.data.reader.Xml}) instance or
     * configuration to be used to read field error messages returned from 'submit' actions. 
     * This is optional as there is built-in support for processing JSON responses.
     *
     * The Records which provide messages for the invalid Fields must use the
     * Field name (or id) as the Record ID, and must contain a field called 'msg'
     * which contains the error message.
     *
     * The errorReader does not have to be a full-blown implementation of a
     * Reader. It simply needs to implement a `read(xhr)` function
     * which returns an Array of Records in an object with the following
     * structure:
     *
     *     {
     *         records: recordArray
     *     }
     */

    /**
     * @cfg {String} url
     * The URL to use for form actions if one isn't supplied in the
     * {@link #doAction doAction} options.
     */

    /**
     * @cfg {Object} baseParams
     * Parameters to pass with all requests. e.g. baseParams: `{id: '123', foo: 'bar'}`.
     *
     * Parameters are encoded as standard HTTP parameters using {@link Ext.Object#toQueryString}.
     */

    /**
     * @cfg {Number} timeout
     * Timeout for form actions in seconds.
     */
    timeout: 30,

    /**
     * @cfg {Object} api
     * If specified, load and submit actions will be handled with {@link Ext.form.action.DirectLoad DirectLoad}
     * and {@link Ext.form.action.DirectSubmit DirectSubmit}.  Methods which have been imported by
     * {@link Ext.direct.Manager} can be specified here to load and submit forms. API methods may also be
     * specified as strings. See {@link Ext.data.proxy.Direct#directFn}.  Such as the following:
     *
     *     api: {
     *         load: App.ss.MyProfile.load,
     *         submit: App.ss.MyProfile.submit
     *     }
     *
     * Load actions can use {@link #paramOrder} or {@link #paramsAsHash} to customize how the load method
     * is invoked.  Submit actions will always use a standard form submit. The `formHandler` configuration
     * (see Ext.direct.RemotingProvider#action) must be set on the associated server-side method which has
     * been imported by {@link Ext.direct.Manager}.
     */

    /**
     * @cfg {String/String[]} paramOrder
     * A list of params to be executed server side. Only used for the {@link #api} `load`
     * configuration.
     *
     * Specify the params in the order in which they must be executed on the
     * server-side as either (1) an Array of String values, or (2) a String of params
     * delimited by either whitespace, comma, or pipe. For example,
     * any of the following would be acceptable:
     *
     *     paramOrder: ['param1','param2','param3']
     *     paramOrder: 'param1 param2 param3'
     *     paramOrder: 'param1,param2,param3'
     *     paramOrder: 'param1|param2|param'
     */

    /**
     * @cfg {Boolean} paramsAsHash
     * Only used for the {@link #api} `load` configuration. If true, parameters will be sent as a
     * single hash collection of named arguments. Providing a {@link #paramOrder} nullifies this
     * configuration.
     */
    paramsAsHash: false,

    //<locale>
    /**
     * @cfg {String} waitTitle
     * The default title to show for the waiting message box
     */
    waitTitle: 'Please Wait...',
    //</locale>

    /**
     * @cfg {Boolean} trackResetOnLoad
     * If set to true, {@link #reset}() resets to the last loaded or {@link #setValues}() data instead of
     * when the form was first created.
     */
    trackResetOnLoad: false,

    /**
     * @cfg {Boolean} standardSubmit
     * If set to true, a standard HTML form submit is used instead of a XHR (Ajax) style form submission.
     * All of the field values, plus any additional params configured via {@link #baseParams}
     * and/or the `options` to {@link #submit}, will be included in the values submitted in the form.
     */

    /**
     * @cfg {Boolean} jsonSubmit
     * If set to true, the field values are sent as JSON in the request body.
     * All of the field values, plus any additional params configured via {@link #baseParams}
     * and/or the `options` to {@link #submit}, will be included in the values POSTed in the body of the request.
     */

    /**
     * @cfg {String/HTMLElement/Ext.Element} waitMsgTarget
     * By default wait messages are displayed with Ext.MessageBox.wait. You can target a specific
     * element by passing it or its id or mask the form itself by passing in true.
     */


    // Private
    wasDirty: false,


    /**
     * Destroys this object.
     */
    destroy: function() {
        var me = this,
            mon = me.monitor;
        
        if (mon) {
            mon.unbind();
            me.monitor = null;
        }
        me.clearListeners();
        me.checkValidityTask.cancel();
        me.checkDirtyTask.cancel();
    },
    
    onFieldAdd: function(field){
        var me = this;
        
        me.mon(field, 'validitychange', me.checkValidityDelay, me);
        me.mon(field, 'dirtychange', me.checkDirtyDelay, me);
        if (me.initialized) {
            me.checkValidityDelay();
        }
    },
    
    onFieldRemove: function(field){
        var me = this;
        
        me.mun(field, 'validitychange', me.checkValidityDelay, me);
        me.mun(field, 'dirtychange', me.checkDirtyDelay, me);
        if (me.initialized) {
            me.checkValidityDelay();
        }
    },
    
    /**
     * Return all the {@link Ext.form.field.Field} components in the owner container.
     * @return {Ext.util.MixedCollection} Collection of the Field objects
     */
    getFields: function() {
        return this.monitor.getItems();
    },

    /**
     * @private
     * Finds and returns the set of all items bound to fields inside this form
     * @return {Ext.util.MixedCollection} The set of all bound form field items
     */
    getBoundItems: function() {
        var boundItems = this._boundItems;
        
        if (!boundItems || boundItems.getCount() === 0) {
            boundItems = this._boundItems = new Ext.util.MixedCollection();
            boundItems.addAll(this.owner.query('[formBind]'));
        }
        
        return boundItems;
    },

    /**
     * Returns true if the form contains any invalid fields. No fields will be marked as invalid
     * as a result of calling this; to trigger marking of fields use {@link #isValid} instead.
     */
    hasInvalidField: function() {
        return !!this.getFields().findBy(function(field) {
            var preventMark = field.preventMark,
                isValid;
            field.preventMark = true;
            isValid = field.isValid();
            field.preventMark = preventMark;
            return !isValid;
        });
    },

    /**
     * Returns true if client-side validation on the form is successful. Any invalid fields will be
     * marked as invalid. If you only want to determine overall form validity without marking anything,
     * use {@link #hasInvalidField} instead.
     * @return {Boolean}
     */
    isValid: function() {
        var me = this,
            invalid;
        Ext.suspendLayouts();
        invalid = me.getFields().filterBy(function(field) {
            return !field.validate();
        });
        Ext.resumeLayouts(true);
        return invalid.length < 1;
    },

    /**
     * Check whether the validity of the entire form has changed since it was last checked, and
     * if so fire the {@link #validitychange validitychange} event. This is automatically invoked
     * when an individual field's validity changes.
     */
    checkValidity: function() {
        var me = this,
            valid = !me.hasInvalidField();
        if (valid !== me.wasValid) {
            me.onValidityChange(valid);
            me.fireEvent('validitychange', me, valid);
            me.wasValid = valid;
        }
    },
    
    checkValidityDelay: function(){
        this.checkValidityTask.delay(10);
    },

    /**
     * @private
     * Handle changes in the form's validity. If there are any sub components with
     * `formBind=true` then they are enabled/disabled based on the new validity.
     * @param {Boolean} valid
     */
    onValidityChange: function(valid) {
        var boundItems = this.getBoundItems(),
            items, i, iLen, cmp;

        if (boundItems) {
            items = boundItems.items;
            iLen  = items.length;

            for (i = 0; i < iLen; i++) {
                cmp = items[i];

                if (cmp.disabled === valid) {
                    cmp.setDisabled(!valid);
                }
            }
        }
    },

    /**
     * Returns `true` if any fields in this form have changed from their original values.
     *
     * Note that if this BasicForm was configured with {@link Ext.form.Basic#trackResetOnLoad
     * trackResetOnLoad} then the Fields' *original values* are updated when the values are
     * loaded by {@link Ext.form.Basic#setValues setValues} or {@link #loadRecord}.
     *
     * @return {Boolean}
     */
    isDirty: function() {
        return !!this.getFields().findBy(function(f) {
            return f.isDirty();
        });
    },
    
    checkDirtyDelay: function(){
        this.checkDirtyTask.delay(10);
    },

    /**
     * Check whether the dirty state of the entire form has changed since it was last checked, and
     * if so fire the {@link #dirtychange dirtychange} event. This is automatically invoked
     * when an individual field's `dirty` state changes.
     */
    checkDirty: function() {
        var dirty = this.isDirty();
        if (dirty !== this.wasDirty) {
            this.fireEvent('dirtychange', this, dirty);
            this.wasDirty = dirty;
        }
    },

    /**
     * Returns `true` if the form contains a file upload field. This is used to determine the method for submitting the
     * form: File uploads are not performed using normal 'Ajax' techniques, that is they are **not** performed using
     * XMLHttpRequests. Instead a hidden `<form>` element containing all the fields is created temporarily and submitted
     * with its [target][1] set to refer to a dynamically generated, hidden `<iframe>` which is inserted into the document
     * but removed after the return data has been gathered.
     *
     * The server response is parsed by the browser to create the document for the IFRAME. If the server is using JSON
     * to send the return object, then the [Content-Type][2] header must be set to "text/html" in order to tell the
     * browser to insert the text unchanged into the document body.
     *
     * Characters which are significant to an HTML parser must be sent as HTML entities, so encode `"<"` as `"&lt;"`,
     * `"&"` as `"&amp;"` etc.
     *
     * The response text is retrieved from the document, and a fake XMLHttpRequest object is created containing a
     * responseText property in order to conform to the requirements of event handlers and callbacks.
     *
     * Be aware that file upload packets are sent with the content type [multipart/form][3] and some server technologies
     * (notably JEE) may require some custom processing in order to retrieve parameter names and parameter values from
     * the packet content.
     *
     * [1]: http://www.w3.org/TR/REC-html40/present/frames.html#adef-target
     * [2]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
     * [3]: http://www.faqs.org/rfcs/rfc2388.html
     *
     * @return {Boolean}
     */
    hasUpload: function() {
        return !!this.getFields().findBy(function(f) {
            return f.isFileUpload();
        });
    },

    /**
     * Performs a predefined action (an implementation of {@link Ext.form.action.Action}) to perform application-
     * specific processing.
     *
     * @param {String/Ext.form.action.Action} action The name of the predefined action type, or instance of {@link
     * Ext.form.action.Action} to perform.
     *
     * @param {Object} [options] The options to pass to the {@link Ext.form.action.Action} that will get created,
     * if the action argument is a String.
     *
     * All of the config options listed below are supported by both the {@link Ext.form.action.Submit submit} and
     * {@link Ext.form.action.Load load} actions unless otherwise noted (custom actions could also accept other
     * config options):
     *
     * @param {String} options.url
     * The url for the action (defaults to the form's {@link #url}.)
     *
     * @param {String} options.method
     * The form method to use (defaults to the form's method, or POST if not defined)
     *
     * @param {String/Object} options.params
     * The params to pass (defaults to the form's baseParams, or none if not defined)
     *
     * Parameters are encoded as standard HTTP parameters using {@link Ext#urlEncode Ext.Object.toQueryString}.
     *
     * @param {Object} options.headers
     * Request headers to set for the action.
     *
     * @param {Function} options.success
     * The callback that will be invoked after a successful response (see top of {@link Ext.form.action.Submit submit}
     * and {@link Ext.form.action.Load load} for a description of what constitutes a successful response).
     * @param {Ext.form.Basic} options.success.form The form that requested the action.
     * @param {Ext.form.action.Action} options.success.action The Action object which performed the operation.
     * The action object contains these properties of interest:
     *
     *  - {@link Ext.form.action.Action#response response}
     *  - {@link Ext.form.action.Action#result result} - interrogate for custom postprocessing
     *  - {@link Ext.form.action.Action#type type}
     *
     * @param {Function} options.failure
     * The callback that will be invoked after a failed transaction attempt.
     * @param {Ext.form.Basic} options.failure.form The form that requested the action.
     * @param {Ext.form.action.Action} options.failure.action The Action object which performed the operation.
     * The action object contains these properties of interest:
     *
     * - {@link Ext.form.action.Action#failureType failureType}
     * - {@link Ext.form.action.Action#response response}
     * - {@link Ext.form.action.Action#result result} - interrogate for custom postprocessing
     * - {@link Ext.form.action.Action#type type}
     *
     * @param {Object} options.scope
     * The scope in which to call the callback functions (The this reference for the callback functions).
     *
     * @param {Boolean} options.clientValidation
     * Submit Action only. Determines whether a Form's fields are validated in a final call to {@link
     * Ext.form.Basic#isValid isValid} prior to submission. Set to false to prevent this. If undefined, pre-submission
     * field validation is performed.
     *
     * @return {Ext.form.Basic} this
     */
    doAction: function(action, options) {
        if (Ext.isString(action)) {
            action = Ext.ClassManager.instantiateByAlias('formaction.' + action, Ext.apply({}, options, {form: this}));
        }
        if (this.fireEvent('beforeaction', this, action) !== false) {
            this.beforeAction(action);
            Ext.defer(action.run, 100, action);
        }
        return this;
    },

    /**
     * Shortcut to {@link #doAction do} a {@link Ext.form.action.Submit submit action}. This will use the
     * {@link Ext.form.action.Submit AJAX submit action} by default. If the {@link #standardSubmit} config
     * is enabled it will use a standard form element to submit, or if the {@link #api} config is present
     * it will use the {@link Ext.form.action.DirectLoad Ext.direct.Direct submit action}.
     *
     * The following code:
     *
     *     myFormPanel.getForm().submit({
     *         clientValidation: true,
     *         url: 'updateConsignment.php',
     *         params: {
     *             newStatus: 'delivered'
     *         },
     *         success: function(form, action) {
     *            Ext.Msg.alert('Success', action.result.msg);
     *         },
     *         failure: function(form, action) {
     *             switch (action.failureType) {
     *                 case Ext.form.action.Action.CLIENT_INVALID:
     *                     Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
     *                     break;
     *                 case Ext.form.action.Action.CONNECT_FAILURE:
     *                     Ext.Msg.alert('Failure', 'Ajax communication failed');
     *                     break;
     *                 case Ext.form.action.Action.SERVER_INVALID:
     *                    Ext.Msg.alert('Failure', action.result.msg);
     *            }
     *         }
     *     });
     *
     * would process the following server response for a successful submission:
     *
     *     {
     *         "success":true, // note this is Boolean, not string
     *         "msg":"Consignment updated"
     *     }
     *
     * and the following server response for a failed submission:
     *
     *     {
     *         "success":false, // note this is Boolean, not string
     *         "msg":"You do not have permission to perform this operation"
     *     }
     *
     * @param {Object} options The options to pass to the action (see {@link #doAction} for details).
     * @return {Ext.form.Basic} this
     */
    submit: function(options) {
        options = options || {};
        var me = this,
            action;
            
        if (options.standardSubmit || me.standardSubmit) {
            action = 'standardsubmit';
        } else {
            action = me.api ? 'directsubmit' : 'submit';
        }
            
        return me.doAction(action, options);
    },

    /**
     * Shortcut to {@link #doAction do} a {@link Ext.form.action.Load load action}.
     * @param {Object} options The options to pass to the action (see {@link #doAction} for details)
     * @return {Ext.form.Basic} this
     */
    load: function(options) {
        return this.doAction(this.api ? 'directload' : 'load', options);
    },

    /**
     * Persists the values in this form into the passed {@link Ext.data.Model} object in a beginEdit/endEdit block.
     * If the record is not specified, it will attempt to update (if it exists) the record provided to loadRecord.
     * @param {Ext.data.Model} [record] The record to edit
     * @return {Ext.form.Basic} this
     */
    updateRecord: function(record) {
        record = record || this._record;
        if (!record) {
            //<debug>
            Ext.Error.raise("A record is required.");
            //</debug>
            return this;
        }
        
        var fields = record.fields.items,
            values = this.getFieldValues(),
            obj = {},
            i = 0,
            len = fields.length,
            name;

        for (; i < len; ++i) {
            name  = fields[i].name;

            if (values.hasOwnProperty(name)) {
                obj[name] = values[name];
            }
        }

        record.beginEdit();
        record.set(obj);
        record.endEdit();

        return this;
    },

    /**
     * Loads an {@link Ext.data.Model} into this form by calling {@link #setValues} with the
     * {@link Ext.data.Model#raw record data}.
     * See also {@link #trackResetOnLoad}.
     * @param {Ext.data.Model} record The record to load
     * @return {Ext.form.Basic} this
     */
    loadRecord: function(record) {
        this._record = record;
        return this.setValues(record.getData());
    },

    /**
     * Returns the last Ext.data.Model instance that was loaded via {@link #loadRecord}
     * @return {Ext.data.Model} The record
     */
    getRecord: function() {
        return this._record;
    },

    /**
     * @private
     * Called before an action is performed via {@link #doAction}.
     * @param {Ext.form.action.Action} action The Action instance that was invoked
     */
    beforeAction: function(action) {
        var me = this,
            waitMsg = action.waitMsg,
            maskCls = Ext.baseCSSPrefix + 'mask-loading',
            fields  = me.getFields().items,
            f,
            fLen    = fields.length,
            field, waitMsgTarget;

        // Call HtmlEditor's syncValue before actions
        for (f = 0; f < fLen; f++) {
            field = fields[f];

            if (field.isFormField && field.syncValue) {
                field.syncValue();
            }
        }

        if (waitMsg) {
            waitMsgTarget = me.waitMsgTarget;
            if (waitMsgTarget === true) {
                me.owner.el.mask(waitMsg, maskCls);
            } else if (waitMsgTarget) {
                waitMsgTarget = me.waitMsgTarget = Ext.get(waitMsgTarget);
                waitMsgTarget.mask(waitMsg, maskCls);
            } else {
                me.floatingAncestor = me.owner.up('[floating]');

                // https://sencha.jira.com/browse/EXTJSIV-6397
                // When the "wait" MessageBox is hidden, the ZIndexManager activates the previous
                // topmost floating item which would be any Window housing this form.
                // That kicks off a delayed focus call on that Window.
                // So if any form post submit processing displayed a MessageBox, that gets
                // stomped on.
                // The solution is to not move focus at all during this process.
                if (me.floatingAncestor) {
                    me.savePreventFocusOnActivate = me.floatingAncestor.preventFocusOnActivate;
                    me.floatingAncestor.preventFocusOnActivate = true;
                }
                Ext.MessageBox.wait(waitMsg, action.waitTitle || me.waitTitle);
            }
        }
    },

    /**
     * @private
     * Called after an action is performed via {@link #doAction}.
     * @param {Ext.form.action.Action} action The Action instance that was invoked
     * @param {Boolean} success True if the action completed successfully, false, otherwise.
     */
    afterAction: function(action, success) {
        var me = this;
        if (action.waitMsg) {
            var messageBox = Ext.MessageBox,
                waitMsgTarget = me.waitMsgTarget;
            if (waitMsgTarget === true) {
                me.owner.el.unmask();
            } else if (waitMsgTarget) {
                waitMsgTarget.unmask();
            } else {
                messageBox.hide();
            }
        }
        // Restore setting of any floating ancestor which was manipulated in beforeAction
        if (me.floatingAncestor) {
            me.floatingAncestor.preventFocusOnActivate = me.savePreventFocusOnActivate;
        }
        if (success) {
            if (action.reset) {
                me.reset();
            }
            Ext.callback(action.success, action.scope || action, [me, action]);
            me.fireEvent('actioncomplete', me, action);
        } else {
            Ext.callback(action.failure, action.scope || action, [me, action]);
            me.fireEvent('actionfailed', me, action);
        }
    },


    /**
     * Find a specific {@link Ext.form.field.Field} in this form by id or name.
     * @param {String} id The value to search for (specify either a {@link Ext.Component#id id} or
     * {@link Ext.form.field.Field#getName name or hiddenName}).
     * @return {Ext.form.field.Field} The first matching field, or `null` if none was found.
     */
    findField: function(id) {
        return this.getFields().findBy(function(f) {
            return f.id === id || f.getName() === id;
        });
    },


    /**
     * Mark fields in this form invalid in bulk.
     * @param {Object/Object[]/Ext.data.Errors} errors
     * Either an array in the form `[{id:'fieldId', msg:'The message'}, ...]`,
     * an object hash of `{id: msg, id2: msg2}`, or a {@link Ext.data.Errors} object.
     * @return {Ext.form.Basic} this
     */
    markInvalid: function(errors) {
        var me = this,
            e, eLen, error, value,
            key;

        function mark(fieldId, msg) {
            var field = me.findField(fieldId);
            if (field) {
                field.markInvalid(msg);
            }
        }

        if (Ext.isArray(errors)) {
            eLen = errors.length;

            for (e = 0; e < eLen; e++) {
                error = errors[e];
                mark(error.id, error.msg);
            }
        } else if (errors instanceof Ext.data.Errors) {
            eLen  = errors.items.length;
            for (e = 0; e < eLen; e++) {
                error = errors.items[e];

                mark(error.field, error.message);
            }
        } else {
            for (key in errors) {
                if (errors.hasOwnProperty(key)) {
                    value = errors[key];
                    mark(key, value, errors);
                }
            }
        }
        return this;
    },

    /**
     * Set values for fields in this form in bulk.
     *
     * @param {Object/Object[]} values Either an array in the form:
     *
     *     [{id:'clientName', value:'Fred. Olsen Lines'},
     *      {id:'portOfLoading', value:'FXT'},
     *      {id:'portOfDischarge', value:'OSL'} ]
     *
     * or an object hash of the form:
     *
     *     {
     *         clientName: 'Fred. Olsen Lines',
     *         portOfLoading: 'FXT',
     *         portOfDischarge: 'OSL'
     *     }
     *
     * @return {Ext.form.Basic} this
     */
    setValues: function(values) {
        var me = this,
            v, vLen, val, field;

        function setVal(fieldId, val) {
            var field = me.findField(fieldId);
            if (field) {
                field.setValue(val);
                if (me.trackResetOnLoad) {
                    field.resetOriginalValue();
                }
            }
        }

        // Suspend here because setting the value on a field could trigger
        // a layout, for example if an error gets set, or it's a display field
        Ext.suspendLayouts();
        if (Ext.isArray(values)) {
            // array of objects
            vLen = values.length;

            for (v = 0; v < vLen; v++) {
                val = values[v];

                setVal(val.id, val.value);
            }
        } else {
            // object hash
            Ext.iterate(values, setVal);
        }
        Ext.resumeLayouts(true);
        return this;
    },

    /**
     * Retrieves the fields in the form as a set of key/value pairs, using their
     * {@link Ext.form.field.Field#getSubmitData getSubmitData()} method to collect the values.
     * If multiple fields return values under the same name those values will be combined into an Array.
     * This is similar to {@link Ext.form.Basic#getFieldValues getFieldValues} except that this method
     * collects only String values for submission, while getFieldValues collects type-specific data
     * values (e.g. Date objects for date fields.)
     *
     * @param {Boolean} [asString=false] If true, will return the key/value collection as a single
     * URL-encoded param string.
     * @param {Boolean} [dirtyOnly=false] If true, only fields that are dirty will be included in the result.
     * @param {Boolean} [includeEmptyText=false] If true, the configured emptyText of empty fields will be used.
     * @param {Boolean} [useDataValues=false] If true, the {@link Ext.form.field.Field#getModelData getModelData}
     * method is used to retrieve values from fields, otherwise the {@link Ext.form.field.Field#getSubmitData getSubmitData}
     * method is used.
     * @return {String/Object}
     */
    getValues: function(asString, dirtyOnly, includeEmptyText, useDataValues) {
        var values  = {},
            fields  = this.getFields().items,
            f,
            fLen    = fields.length,
            isArray = Ext.isArray,
            field, data, val, bucket, name;

        for (f = 0; f < fLen; f++) {
            field = fields[f];

            if (!dirtyOnly || field.isDirty()) {
                data = field[useDataValues ? 'getModelData' : 'getSubmitData'](includeEmptyText);

                if (Ext.isObject(data)) {
                    for (name in data) {
                        if (data.hasOwnProperty(name)) {
                            val = data[name];

                            if (includeEmptyText && val === '') {
                                val = field.emptyText || '';
                            }

                            if (values.hasOwnProperty(name)) {
                                bucket = values[name];

                                if (!isArray(bucket)) {
                                    bucket = values[name] = [bucket];
                                }

                                if (isArray(val)) {
                                    values[name] = bucket.concat(val);
                                } else {
                                    bucket.push(val);
                                }
                            } else {
                                values[name] = val;
                            }
                        }
                    }
                }
            }
        }

        if (asString) {
            values = Ext.Object.toQueryString(values);
        }
        return values;
    },

    /**
     * Retrieves the fields in the form as a set of key/value pairs, using their
     * {@link Ext.form.field.Field#getModelData getModelData()} method to collect the values.
     * If multiple fields return values under the same name those values will be combined into an Array.
     * This is similar to {@link #getValues} except that this method collects type-specific data values
     * (e.g. Date objects for date fields) while getValues returns only String values for submission.
     *
     * @param {Boolean} [dirtyOnly=false] If true, only fields that are dirty will be included in the result.
     * @return {Object}
     */
    getFieldValues: function(dirtyOnly) {
        return this.getValues(false, dirtyOnly, false, true);
    },

    /**
     * Clears all invalid field messages in this form.
     * @return {Ext.form.Basic} this
     */
    clearInvalid: function() {
        Ext.suspendLayouts();

        var me     = this,
            fields = me.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            fields[f].clearInvalid();
        }

        Ext.resumeLayouts(true);
        return me;
    },

    /**
     * Resets all fields in this form. By default, any record bound by {@link #loadRecord}
     * will be retained.
     * @param {Boolean} [resetRecord=false] True to unbind any record set
     * by {@link #loadRecord}
     * @return {Ext.form.Basic} this
     */
    reset: function(resetRecord) {
        Ext.suspendLayouts();

        var me     = this,
            fields = me.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            fields[f].reset();
        }

        Ext.resumeLayouts(true);
        
        if (resetRecord === true) {
            delete me._record;
        }
        return me;
    },

    /**
     * Calls {@link Ext#apply Ext.apply} for all fields in this form with the passed object.
     * @param {Object} obj The object to be applied
     * @return {Ext.form.Basic} this
     */
    applyToFields: function(obj) {
        var fields = this.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            Ext.apply(fields[f], obj);
        }

        return this;
    },

    /**
     * Calls {@link Ext#applyIf Ext.applyIf} for all field in this form with the passed object.
     * @param {Object} obj The object to be applied
     * @return {Ext.form.Basic} this
     */
    applyIfToFields: function(obj) {
        var fields = this.getFields().items,
            f,
            fLen   = fields.length;

        for (f = 0; f < fLen; f++) {
            Ext.applyIf(fields[f], obj);
        }

        return this;
    }
});
