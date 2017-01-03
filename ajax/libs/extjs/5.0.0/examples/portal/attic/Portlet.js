/**
 * @class Portal.view.Portlet
 * @extends Ext.panel.Panel
 * A {@link Ext.panel.Panel Panel} class that is managed by {@link Portal.view.PortalPanel}.
 */
Ext.define('Portal.view.Portlet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.portlet',
    layout: 'fit',
    anchor: '100%',
    frame: true,
    padding: '8 8 0 0',
    closable: true,
    collapsible: true,
    animCollapse: true,
    draggable: {
        moveOnDrag: false
    },
    // Important: Portlets are fixed width. Only height may change, and then only from bottom
    resizeHandles: 's',
    resizable: true,
    cls: 'x-portlet',

    // Override Panel's default doClose to provide a custom fade out effect
    // when a portlet is removed from the portal
    doClose: function() {
        if (!this.closing) {
            this.closing = true;
            this.el.animate({
                opacity: 0,
                callback: function(){
                    var closeAction = this.closeAction;
                    this.closing = false;
                    this.fireEvent('close', this);
                    this[closeAction]();
                    if (closeAction == 'hide') {
                        this.el.setOpacity(1);
                    }
                },
                scope: this
            });
        }
    }
});
