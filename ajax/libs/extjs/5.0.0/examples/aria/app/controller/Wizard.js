Ext.define('Aria.controller.Wizard', {
    extend: 'Ext.app.Controller',
    
    views: [
        'Wizard'
    ],
    
    refs: [{ ref: 'wizard', selector: 'mysimplewizard' }],
    
    init: function() {
        var me = this;
        
        me.control({
            'mysimplewizard button': {
                click: me.onWizardButtonClick
            }
        });
    },
    
    onWizardButtonClick: function(button) {
        var layout, item, child;
        
        layout = this.getWizard().getLayout();
        item = button.direction === 'next' ? layout.getNext()
             :                               layout.getPrev()
             ;
        
        if (item) {
            layout.setActiveItem(item);
            
            child = item.ariaFirstChild();
            
            if (child) {
                child.focus();
            }
        }
    }
});
