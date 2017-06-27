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
 * @docauthor Jason Johnston <jason@sencha.com>
 *
 * A file upload field which has custom styling and allows control over the button text and other
 * features of {@link Ext.form.field.Text text fields} like {@link Ext.form.field.Text#emptyText empty text}.
 * It uses a hidden file input element behind the scenes to allow user selection of a file and to
 * perform the actual upload during {@link Ext.form.Basic#submit form submit}.
 *
 * Because there is no secure cross-browser way to programmatically set the value of a file input,
 * the standard Field `setValue` method is not implemented. The `{@link #getValue}` method will return
 * a value that is browser-dependent; some have just the file name, some have a full path, some use
 * a fake path.
 *
 * **IMPORTANT:** File uploads are not performed using normal 'Ajax' techniques; see the description for
 * {@link Ext.form.Basic#hasUpload} for details.
 *
 * # Example Usage
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Upload a Photo',
 *         width: 400,
 *         bodyPadding: 10,
 *         frame: true,
 *         renderTo: Ext.getBody(),
 *         items: [{
 *             xtype: 'filefield',
 *             name: 'photo',
 *             fieldLabel: 'Photo',
 *             labelWidth: 50,
 *             msgTarget: 'side',
 *             allowBlank: false,
 *             anchor: '100%',
 *             buttonText: 'Select Photo...'
 *         }],
 *
 *         buttons: [{
 *             text: 'Upload',
 *             handler: function() {
 *                 var form = this.up('form').getForm();
 *                 if(form.isValid()){
 *                     form.submit({
 *                         url: 'photo-upload.php',
 *                         waitMsg: 'Uploading your photo...',
 *                         success: function(fp, o) {
 *                             Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
 *                         }
 *                     });
 *                 }
 *             }
 *         }]
 *     });
 */
Ext.define('Ext.form.field.File', {
    extend: 'Ext.form.field.Trigger',
    alias: ['widget.filefield', 'widget.fileuploadfield'],
    alternateClassName: ['Ext.form.FileUploadField', 'Ext.ux.form.FileUploadField', 'Ext.form.File'],
    requires: [
        'Ext.form.field.FileButton'
    ],

    //<locale>
    /**
     * @cfg {String} buttonText
     * The button text to display on the upload button. Note that if you supply a value for
     * {@link #buttonConfig}, the buttonConfig.text value will be used instead if available.
     */
    buttonText: 'Browse...',
    //</locale>

    /**
     * @cfg {Boolean} buttonOnly
     * True to display the file upload field as a button with no visible text field. If true, all
     * inherited Text members will still be available.
     */
    buttonOnly: false,

    /**
     * @cfg {Number} buttonMargin
     * The number of pixels of space reserved between the button and the text field. Note that this only
     * applies if {@link #buttonOnly} = false.
     */
    buttonMargin: 3,
    
    /**
     * @cfg {Boolean} clearOnSubmit
     * True to clear the selected file value when the form this field belongs to
     * is submitted to the server.
     */
    clearOnSubmit: true,

    /**
     * @cfg {Object} buttonConfig
     * A standard {@link Ext.button.Button} config object.
     */

    /**
     * @event change
     * Fires when the underlying file input field's value has changed from the user selecting a new file from the system
     * file selection dialog.
     * @param {Ext.ux.form.FileUploadField} this
     * @param {String} value The file value returned by the underlying file input field
     */

    /**
     * @property {Ext.Element} fileInputEl
     * A reference to the invisible file input element created for this upload field. Only populated after this
     * component is rendered.
     */

    /**
     * @property {Ext.button.Button} button
     * A reference to the trigger Button component created for this upload field. Only populated after this component is
     * rendered.
     */


    // private
    extraFieldBodyCls: Ext.baseCSSPrefix + 'form-file-wrap',

    /**
     * @cfg {Boolean} readOnly
     * Unlike with other form fields, the readOnly config defaults to true in File field.
     */
    readOnly: true,

    /**
     * Do not show hand pointer over text field since file choose dialog is only shown when clicking in the button
     * @private
     */
    triggerNoEditCls: '',

    // private
    componentLayout: 'triggerfield',

    // private. Extract the file element, button outer element, and button active element.
    childEls: ['browseButtonWrap'],

    // private
    onRender: function() {
        var me = this,
            id = me.id,
            inputEl;

        me.callParent(arguments);

        inputEl = me.inputEl;
        inputEl.dom.name = ''; //name goes on the fileInput, not the text input

        // render the button here. This isn't ideal, however it will be 
        // rendered before layouts are resumed, also we modify the DOM
        // below anyway
        me.button = new Ext.form.field.FileButton(Ext.apply({
            renderTo: id + '-browseButtonWrap',
            ownerCt: me,
            ownerLayout: me.componentLayout,
            id: id + '-button',
            ui: me.ui,
            disabled: me.disabled,
            text: me.buttonText,
            style: me.buttonOnly ? '' : me.getButtonMarginProp() + me.buttonMargin + 'px',
            inputName: me.getName(),
            listeners: {
                scope: me,
                change: me.onFileChange
            }
        }, me.buttonConfig));
        me.fileInputEl = me.button.fileInputEl;

        if (me.buttonOnly) {
            me.inputCell.setDisplayed(false);
        }

        // Ensure the trigger cell is sized correctly upon render
        me.browseButtonWrap.dom.style.width = (me.browseButtonWrap.dom.lastChild.offsetWidth + me.button.getEl().getMargin('lr')) + 'px';
        if (Ext.isIE) {
            me.button.getEl().repaint();
        }
    },

    /**
     * Gets the markup to be inserted into the subTplMarkup.
     */
    getTriggerMarkup: function() {
        return '<td id="' + this.id + '-browseButtonWrap"></td>';
    },

    /**
     * @private Event handler fired when the user selects a file.
     */
    onFileChange: function(button, e, value) {
        this.lastValue = null; // force change event to get fired even if the user selects a file with the same name
        Ext.form.field.File.superclass.setValue.call(this, value);
    },

    /**
     * Overridden to do nothing
     * @method
     */
    setValue: Ext.emptyFn,

    reset : function(){
        var me = this,
            clear = me.clearOnSubmit;
        if (me.rendered) {
            me.button.reset(clear);
            me.fileInputEl = me.button.fileInputEl;
            if (clear) {
                me.inputEl.dom.value = '';
            }
        }
        me.callParent();
    },
    
    onShow: function(){
        this.callParent();
        // If we started out hidden, the button may have a messed up layout
        // since we don't act like a container
        this.button.updateLayout();    
    },

    onDisable: function(){
        this.callParent();
        this.button.disable();
    },

    onEnable: function(){
        this.callParent();
        this.button.enable();
    },

    isFileUpload: function() {
        return true;
    },

    extractFileInput: function() {
        var fileInput = this.button.fileInputEl.dom;
        this.reset();
        return fileInput;
    },
    
    restoreInput: function(el) {
        var button = this.button;
        button.restoreInput(el);
        this.fileInputEl = button.fileInputEl;
    },

    onDestroy: function(){
        Ext.destroyMembers(this, 'button');
        delete this.fileInputEl;
        this.callParent();
    },

    getButtonMarginProp: function() {
        return 'margin-left:';
    }
});