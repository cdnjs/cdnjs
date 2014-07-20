/**
 * A class which handles submission of data from {@link Ext.form.Basic Form}s using a standard `<form>` element submit.
 * It does not handle the response from the submit.
 *
 * If validation of the form fields fails, the Form's afterAction method will be called. Otherwise, afterAction will not
 * be called.
 *
 * Instances of this class are only created by a {@link Ext.form.Basic Form} when
 * {@link Ext.form.Basic#submit submit}ting, when the form's {@link Ext.form.Basic#standardSubmit} config option is true.
 */
Ext.define('Ext.form.action.StandardSubmit', {
    extend:'Ext.form.action.Submit',
    alias: 'formaction.standardsubmit',

    /**
     * @cfg {String} target
     * Optional target attribute to be used for the form when submitting.
     * 
     * Defaults to the current window/frame.
     */

    /**
     * @private
     * Perform the form submit. Creates and submits a temporary form element containing an input element for each
     * field value returned by {@link Ext.form.Basic#getValues}, plus any configured {@link #params params} or
     * {@link Ext.form.Basic#baseParams baseParams}.
     */
    doSubmit: function() {
        var formInfo = this.buildForm();
        formInfo.formEl.submit();
        this.cleanup(formInfo);
    }

});
