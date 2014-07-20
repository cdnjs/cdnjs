Ext.define('KitchenSink.view.form.FileUploadsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.form-fileuploads',
    
    getFilePath: function() {
        var v = this.lookupReference('basicFile').getValue();
        
        Ext.Msg.alert('Selected File', v && v !== '' ? v : 'None');
    },
    
    buttonOnlyChange: function(field, value) {
        Ext.toast('<b>Selected:</b> ' + value);
    },
    
    firstFormSave: function() {
        var form = this.lookupReference('firstForm').getForm();
        
        if (form.isValid()) {
            form.submit({
                url: 'resources/data/form/file-upload.php',
                waitMsg: 'Uploading your photo...',
                success: function(fp, o) {
                    var tpl = new Ext.XTemplate(
                        'File processed on the server.<br />',
                        'Name: {fileName}<br />',
                        'Size: {fileSize:fileSize}'
                    );
                    
                    Ext.Msg.alert('Success', tpl.apply(o.result));
                }
            });
        }
    },
    
    firstFormReset: function() {
        this.lookupReference('firstForm').getForm().reset();
    },
    
    secondFormSubmit: function() {
        var form = this.lookupReference('secondForm').getForm();
        
        if (form.isValid()) {
            form.submit({
                url: 'resources/data/form/file-upload.php',
                waitMsg: 'Uploading your photo...',
                success: this.secondFormUploadSuccess,
                failure: this.secondFormUploadFailure
            });
        }
    },
    
    secondFormReset: function() {
        this.lookupReference('secondForm').getForm().reset();
    },
    
    secondFormUploadSuccess: function(form, action) {
        Ext.Msg.alert('Success', 'Processed file "' + action.result.file + '" on the server');
    },
    
    secondFormUploadFailure: function(form, action) {
        Ext.Msg.alert("Error", Ext.JSON.decode(this.response.responseText).message);
    }
});
