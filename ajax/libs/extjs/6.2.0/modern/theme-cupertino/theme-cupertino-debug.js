Ext.define('Ext.theme.cupertino.TitleBar', {
    override: 'Ext.TitleBar',
    config: {
        maxButtonWidth: '80%'
    }
});

Ext.define('Ext.theme.device_base.util.PositionMap', {
    override: 'Ext.util.PositionMap',
    config: {
        minimumHeight: 50
    }
});

Ext.define('Ext.theme.device_base.dataview.List', {
    override: 'Ext.dataview.List',
    config: {
        itemHeight: 42
    }
});

Ext.define('Ext.theme.cupertino.dataview.List', {
    override: 'Ext.dataview.List',
    config: {
        itemHeight: 43
    }
});

Ext.define('Ext.theme.device_base.dataview.NestedList', {
    override: 'Ext.dataview.NestedList',
    config: {
        itemHeight: 47
    }
});

Ext.define('Ext.theme.cupertino.dataview.NestedList', {
    override: 'Ext.dataview.NestedList',
    config: {
        itemHeight: 43,
        useTitleAsBackText: true,
        updateTitleText: false
    }
});

Ext.define('Ext.theme.device_base.grid.HeaderContainer', {
    override: 'Ext.grid.HeaderContainer',
    config: {
        height: 65
    },
    privates: {
        doUpdateSpacer: function() {
            var scrollable = this.getGrid().getScrollable();
            this.element.setStyle('margin-right', scrollable.getScrollbarSize().width + 'px');
        }
    }
});

Ext.define('Ext.theme.device_base.grid.Grid', {
    override: 'Ext.grid.Grid',
    config: {
        itemHeight: 60
    }
});

Ext.define('Ext.theme.device_base.grid.plugin.SummaryRow', {
    override: 'Ext.grid.plugin.SummaryRow',
    config: {
        height: 32
    }
});

Ext.namespace('Ext.theme.is').Cupertino = true;
Ext.theme.name = 'Cupertino';

