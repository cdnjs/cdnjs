Ext.define('Ext.theme.mountainview.Component', {
    override: 'Ext.Component'
}, function() {
    Ext.namespace('Ext.theme.is').MountainView = true;
    Ext.theme.name = 'MountainView';
});

Ext.define('Ext.theme.mountainview.field.Field', {
    override: 'Ext.field.Field',
    config: {
        labelAlign: 'top'
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

Ext.define('Ext.theme.device_base.dataview.NestedList', {
    override: 'Ext.dataview.NestedList',
    config: {
        itemHeight: 47
    }
});

Ext.define('Ext.theme.mountainview.picker.Picker', {
    override: 'Ext.picker.Picker',
    config: {
        toolbarPosition: 'bottom',
        toolbar: {
            defaults: {
                flex: 1
            }
        }
    }
});

Ext.define('Ext.theme.mountainview.field.Toggle', {
    override: 'Ext.field.Toggle',
    config: {
        activeLabel: 'On',
        inactiveLabel: 'Off'
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

Ext.define('Ext.theme.mountainview.tab.Bar', {
    override: 'Ext.tab.Bar',
    config: {
        defaults: {
            flex: 1
        }
    }
});

