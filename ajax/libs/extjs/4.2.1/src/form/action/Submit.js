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
 * A class which handles submission of data from {@link Ext.form.Basic Form}s and processes the returned response.
 *
 * Instances of this class are only created by a {@link Ext.form.Basic Form} when
 * {@link Ext.form.Basic#submit submit}ting.
 *
 * # Response Packet Criteria
 *
 * A response packet may contain:
 *
 *   - **`success`** property : Boolean - required.
 *
 *   - **`errors`** property : Object - optional, contains error messages for invalid fields.
 *
 * # JSON Packets
 *
 * By default, response packets are assumed to be JSON, so a typical response packet may look like this:
 *
 *     {
 *         success: false,
 *         errors: {
 *             clientCode: "Client not found",
 *             portOfLoading: "This field must not be null"
 *         }
 *     }
 *
 * Other data may be placed into the response for processing by the {@link Ext.form.Basic}'s callback or event handler
 * methods. The object decoded from this JSON is available in the {@link Ext.form.action.Action#result result} property.
 *
 * Alternatively, if an {@link Ext.form.Basic#errorReader errorReader} is specified as an
 * {@link Ext.data.reader.Xml XmlReader}:
 *
 *     errorReader: new Ext.data.reader.Xml({
 *             record : 'field',
 *             success: '@success'
 *         }, [
 *             'id', 'msg'
 *         ]
 *     )
 *
 * then the results may be sent back in XML format:
 *
 *     <?xml version="1.0" encoding="UTF-8"?>
 *     <message success="false">
 *     <errors>
 *         <field>
 *             <id>clientCode</id>
 *             <msg><![CDATA[Code not found. <br /><i>This is a test validation message from the server </i>]]></msg>
 *         </field>
 *         <field>
 *             <id>portOfLoading</id>
 *             <msg><![CDATA[Port not found. <br /><i>This is a test validation message from the server </i>]]></msg>
 *         </field>
 *     </errors>
 *     </message>
 *
 * Other elements may be placed into the response XML for processing by the {@link Ext.form.Basic}'s callback or event
 * handler methods. The XML document is available in the {@link Ext.form.Basic#errorReader errorReader}'s
 * {@link Ext.data.reader.Xml#xmlData xmlData} property.
 */
Ext.define('Ext.form.action.Submit', {
    extend:'Ext.form.action.Action',
    alternateClassName: 'Ext.form.Action.Submit',
    alias: 'formaction.submit',

    type: 'submit',

    /**
     * @cfg {Boolean} [clientValidation=true]
     * Determines whether a Form's fields are validated in a final call to {@link Ext.form.Basic#isValid isValid} prior
     * to submission. Pass false in the Form's submit options to prevent this.
     */

    // inherit docs
    run : function(){
        var me = this,
            form = me.form;
            
        if (me.clientValidation === false || form.isValid()) {
            me.doSubmit();
        } else {
            // client validation failed
            me.failureType = Ext.form.action.Action.CLIENT_INVALID;
            form.afterAction(me, false);
        }
    },

    /**
     * @private
     * Performs the submit of the form data.
     */
    doSubmit: function() {
        var me = this,
            ajaxOptions = Ext.apply(me.createCallback(), {
                url: me.getUrl(),
                method: me.getMethod(),
                headers: me.headers
            }),
            form = me.form,
            jsonSubmit = me.jsonSubmit || form.jsonSubmit,
            paramsProp = jsonSubmit ? 'jsonData' : 'params',
            formEl, formInfo;

        // For uploads we need to create an actual form that contains the file upload fields,
        // and pass that to the ajax call so it can do its iframe-based submit method.
        if (form.hasUpload()) {
            formInfo = me.buildForm();
            ajaxOptions.form = formInfo.formEl;
            ajaxOptions.isUpload = true;
        } else {
            ajaxOptions[paramsProp] = me.getParams(jsonSubmit);
        }

        Ext.Ajax.request(ajaxOptions);
        if (formInfo) {
            me.cleanup(formInfo);
        }
    },
    
    cleanup: function(formInfo) {
        var formEl = formInfo.formEl,
            uploadEls = formInfo.uploadEls,
            uploadFields = formInfo.uploadFields,
            len = uploadFields.length,
            i, field;
            
        for (i = 0; i < len; ++i) {
            field = uploadFields[i];
            if (!field.clearOnSubmit) {
                field.restoreInput(uploadEls[i]);
            }    
        }
        
        if (formEl) {
            Ext.removeNode(formEl);
        }    
    },

    /**
     * @private
     * Builds the full set of parameters from the field values plus any additional configured params.
     */
    getParams: function(useModelValues) {
        var falseVal = false,
            configParams = this.callParent(),
            fieldParams = this.form.getValues(falseVal, falseVal, this.submitEmptyText !== falseVal, useModelValues);
        return Ext.apply({}, fieldParams, configParams);
    },

    /**
     * @private
     * Builds a form element containing fields corresponding to all the parameters to be
     * submitted (everything returned by {@link #getParams}.
     *
     * NOTE: the form element is automatically added to the DOM, so any code that uses
     * it must remove it from the DOM after finishing with it.
     *
     * @return {HTMLElement}
     */
    buildForm: function() {
        var me = this,
            fieldsSpec = [],
            formSpec,
            formEl,
            basicForm = me.form,
            params = me.getParams(),
            uploadFields = [],
            uploadEls = [],
            fields = basicForm.getFields().items,
            i,
            len   = fields.length,
            field, key, value, v, vLen,
            el;

        for (i = 0; i < len; ++i) {
            field = fields[i];

            // can only have a selected file value after being rendered
            if (field.rendered && field.isFileUpload()) {
                uploadFields.push(field);
            }
        }

        for (key in params) {
            if (params.hasOwnProperty(key)) {
                value = params[key];

                if (Ext.isArray(value)) {
                    vLen = value.length;
                    for (v = 0; v < vLen; v++) {
                        fieldsSpec.push(me.getFieldConfig(key, value[v]));
                    }
                } else {
                    fieldsSpec.push(me.getFieldConfig(key, value));
                }
            }
        }

        formSpec = {
            tag: 'form',
            action: me.getUrl(),
            method: me.getMethod(),
            target: me.target || '_self',
            style: 'display:none',
            cn: fieldsSpec
        };

        // Set the proper encoding for file uploads
        if (uploadFields.length) {
            formSpec.encoding = formSpec.enctype = 'multipart/form-data';
        }

        // Create the form
        formEl = Ext.DomHelper.append(Ext.getBody(), formSpec);

        // Special handling for file upload fields: since browser security measures prevent setting
        // their values programatically, and prevent carrying their selected values over when cloning,
        // we have to move the actual field instances out of their components and into the form.
        len = uploadFields.length;

        for (i = 0; i < len; ++i) {
            el = uploadFields[i].extractFileInput();
            formEl.appendChild(el);
            uploadEls.push(el);
        }

        return {
            formEl: formEl,
            uploadFields: uploadFields,
            uploadEls: uploadEls
        };
    },

    getFieldConfig: function(name, value) {
        return {
            tag: 'input',
            type: 'hidden',
            name: name,
            value: Ext.String.htmlEncode(value)
        };
    },

    /**
     * @private
     */
    onSuccess: function(response) {
        var form = this.form,
            success = true,
            result = this.processResponse(response);
        if (result !== true && !result.success) {
            if (result.errors) {
                form.markInvalid(result.errors);
            }
            this.failureType = Ext.form.action.Action.SERVER_INVALID;
            success = false;
        }
        form.afterAction(this, success);
    },

    /**
     * @private
     */
    handleResponse: function(response) {
        var form = this.form,
            errorReader = form.errorReader,
            rs, errors, i, len, records, result;
            
        if (errorReader) {
            rs = errorReader.read(response);
            records = rs.records;
            errors = [];
            if (records) {
                for(i = 0, len = records.length; i < len; i++) {
                    errors[i] = records[i].data;
                }
            }
            if (errors.length < 1) {
                errors = null;
            }
            result = {
                success : rs.success,
                errors : errors
            };
        } else {
            try {
                result = Ext.decode(response.responseText);    
            } catch (e) {
                result = {
                    success: false,
                    errors: []
                };
            }
            
        }
        return result;
    }
});
