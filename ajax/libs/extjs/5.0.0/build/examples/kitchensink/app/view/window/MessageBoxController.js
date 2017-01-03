Ext.define('KitchenSink.view.window.MessageBoxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.window-messagebox',

    onConfirmClick: function() {
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', this.showResult, this);
    },

    onPromptClick: function() {
        Ext.MessageBox.prompt('Name', 'Please enter your name:', this.showResultText, this);
    },

    onMultiLinePromptClick: function(btn) {
        Ext.MessageBox.show({
            title: 'Address',
            msg: 'Please enter your address:',
            width:300,
            buttons: Ext.MessageBox.OKCANCEL,
            multiline: true,
            scope: this,
            fn: this.showResultText,
            animateTarget: btn
        });
    },

    onYesNoCancelClick: function(btn) {
        Ext.MessageBox.show({
            title:'Save Changes?',
            msg: 'You are closing a tab that has unsaved changes. <br />Would you like to save your changes?',
            buttons: Ext.MessageBox.YESNOCANCEL,
            scope: this,
            fn: this.showResult,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION
        });
    },

    onProgressClick: function(btn) {
        var me = this,
            i = 0,
            fn;

        Ext.MessageBox.show({
            title: 'Please wait',
            msg: 'Loading items...',
            progressText: 'Initializing...',
            width:300,
            progress:true,
            closable:false,
            animateTarget: btn
        });

        // Fake progress fn
        fn = function() {
            ++i;
            if (i === 12) {
                Ext.MessageBox.hide();
                me.showToast('Your fake items were loaded', 'Done');
            } else {
                var val = i / 11;
                Ext.MessageBox.updateProgress(val, Math.round(100 * val) + '% completed');
                setTimeout(fn, 500);
            }
        };
        setTimeout(fn, 500);

    },

    onWaitClick: function(btn) {
        Ext.MessageBox.show({
            msg: 'Saving your data, please wait...',
            progressText: 'Saving...',
            width:300,
            wait: {
                interval:200
            },
            animateTarget: btn
        });

        var me = this;
        setTimeout(function(){
            //This simulates a long-running operation like a database save or XHR call.
            //In real code, this would be in a callback function.
            Ext.MessageBox.hide();
            me.showToast('Your fake data was saved!', 'Done');
        }, 8000);
    },

    onAlertClick: function() {
        Ext.MessageBox.alert('Status', 'Changes saved successfully.', this.showResult, this);
    },

    onIconClick: function(btn) {
        var value = this.lookupReference('icon').getValue(),
            icon = Ext.MessageBox[value.toUpperCase()];

        Ext.MessageBox.show({
            title: 'Icon Support',
            msg: 'Here is a message with an icon!',
            buttons: Ext.MessageBox.OK,
            animateTarget: btn,
            scope: this,
            fn: this.showResult,
            icon: icon
        });
    },

    onCustomButtonText: function() {
        Ext.MessageBox.show({
            title: 'What, really?',
            msg: 'Are you sure?',
            buttons: Ext.MessageBox.YESNO,
            buttonText:{ 
                yes: "Definitely!", 
                no: "No chance!" 
            },
            scope: this,
            fn: this.showResult
        });
    },

    showResult: function(btn, text) {
        this.showToast(Ext.String.format('You clicked the {0} button', btn));
    },

    showResultText: function(btn, text) {
        this.showToast(Ext.String.format('You clicked the {0} button and entered the text "{1}".', btn, text));
    },

    showToast: function(s, title) {
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });
    },

    destroy: function() {
        Ext.Msg.hide();
        this.callParent();
    }
});
