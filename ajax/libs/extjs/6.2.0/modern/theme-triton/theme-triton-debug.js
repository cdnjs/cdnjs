Ext.define('Ext.theme.neptune.Titlebar', {
    override: 'Ext.TitleBar',
    config: {
        defaultButtonUI: 'alt'
    }
});

Ext.define('Ext.theme.neptune.tip.ToolTip', {
    override: 'Ext.tip.ToolTip',
    bodyBorder: false
});

Ext.namespace('Ext.theme.is').Neptune = true;
Ext.theme.name = 'Neptune';
Ext.theme.getDocCls = function() {
    return Ext.platformTags.desktop ? '' : 'x-big';
};

Ext.namespace('Ext.theme.is').Triton = true;
Ext.theme.name = 'Triton';
Ext.theme.getDocCls = function() {
    return Ext.platformTags.phone ? 'x-big' : '';
};

