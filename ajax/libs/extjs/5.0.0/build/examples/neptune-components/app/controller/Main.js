Ext.define('Neptune.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
        'AppHeader',
        'Navigation',
        'Content',

        'button.Buttons',
        'button.MenuButtons',
        'button.SplitButtons',
        'button.Groups',
        'button.widget.Small',
        'button.widget.Medium',
        'button.widget.Large',
        'button.widget.SmallMenu',
        'button.widget.MediumMenu',
        'button.widget.LargeMenu',
        'button.widget.SmallSplit',
        'button.widget.MediumSplit',
        'button.widget.LargeSplit',
        'button.widget.SimpleGroup',
        'button.widget.ComplexGroup',

        'panel.Panels',
        'panel.FramedPanels',
        'panel.Accordions',
        'panel.widget.Basic',
        'panel.widget.Framed',
        'panel.widget.Collapsed',
        'panel.widget.CollapsedFramed',
        'panel.widget.Tool',
        'panel.widget.FramedTool',
        'panel.widget.NoTitle',
        'panel.widget.NoTitleFramed',
        'panel.widget.Nested',
        'panel.widget.NestedFramed',
        'panel.widget.Accordion',
        'panel.widget.FramedAccordion',

        'form.Fields',
        'form.Forms',
        'form.Fieldsets',
        'form.widget.Basic',
        'form.widget.Framed',
        'form.widget.TextField',
        'form.widget.ComboBox',
        'form.widget.DateField',
        'form.widget.NumberField',
        'form.widget.HtmlEditor',
        'form.widget.Checkboxes',
        'form.widget.RadioButtons',
        'form.widget.SearchField',
        'form.widget.TextArea',
        'form.widget.Fieldset',
        'form.widget.FieldsetForm',
        'form.widget.FramedFieldsetForm',
        'form.widget.CollapsibleFieldset',
        'form.widget.CheckboxFieldset',

        'toolbar.Toolbars',
        'toolbar.widget.Basic',
        'toolbar.widget.Medium',
        'toolbar.widget.Large',
        'toolbar.widget.Mixed',
        'toolbar.widget.Fields',
        'toolbar.widget.Fields2',
        'toolbar.widget.SimpleButtonGroup',
        'toolbar.widget.ComplexButtonGroup',
        'toolbar.widget.Vertical',
        'toolbar.widget.VerticalFields',
        'toolbar.widget.MenuOverflow',
        'toolbar.widget.ScrollerOverflow',
        'toolbar.widget.VerticalMenuOverflow',
        'toolbar.widget.VerticalScrollerOverflow',

        'tab.Tabs',
        'tab.BottomTabs',
        'tab.OverflowTabs',
        'tab.widget.Basic',
        'tab.widget.BasicPlain',
        'tab.widget.Framed',
        'tab.widget.FramedPlain',
        'tab.widget.Overflow',

        'tree.Trees',
        'tree.widget.Basic',
        'tree.widget.TreeGrid',

        'grid.Grids',
        'grid.widget.Basic',
        'grid.widget.GroupHeader',
        'grid.widget.Grouped',
        'grid.widget.LockGroupSummary',

        'window.Windows',
        'window.widget.Basic',
        'window.widget.WithButtons',

        'combination.PanelTabToolbarGrid',
        'combination.ToolbarsInPanels',
        'combination.ToolbarsInTabs',
        'combination.BorderLayoutWindow',
        'combination.BorderLayout',
        'combination.FormWithTabs',
        'combination.NestedTabs'
    ],

    stores: [
        'FileSystem',
        'Company'
    ],

    refs: [
        {
            ref: 'navigation',
            selector: 'navigation'
        },
        {
            ref: 'content',
            selector: 'content'
        }
    ],

    init: function() {
        this.control({
            'navigation': {
                selectionchange: this.onNavSelectionChange
            },
            'content': {
                afterrender: this.afterContentRender
            }
        });
    },

    onNavSelectionChange: function(selModel, records) {
        var id = records[0].get('id');
        if (id) {
            this.getContent().getLayout().setActiveItem(id);
            location.hash = id;
        }
    },

    afterContentRender: function(contentPanel) {
        var id = location.hash.substring(1) || 'panels',
            navigation = this.getNavigation();

        navigation.getSelectionModel().select(navigation.getStore().getNodeById(id));
    }
});