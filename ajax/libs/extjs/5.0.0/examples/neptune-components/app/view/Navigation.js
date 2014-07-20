Ext.define('Neptune.view.Navigation', {
    extend: 'Ext.tree.Panel',
    xtype: 'navigation',
    width: 220,
    rootVisible: false,
    useArrows: true,
    split: true,
    root: {
        children: [
            {
                text: 'Panels',
                expanded: true,
                children: [
                    { text: 'Basic Panels', id: 'panels', leaf: true },
                    { text: 'Framed Panels', id: 'framed-panels', leaf: true },
                    { text: 'Accordions', id: 'accordions', leaf: true }
                ]
            },
            {
                text: 'Toolbars',
                expanded: true,
                children: [
                    { text: 'Toolbars', id: 'toolbars', leaf: true }
                ]
            },
            {
                text: 'Buttons',
                expanded: true,
                children: [
                    { text: 'Basic Buttons', id: 'buttons', leaf: true },
                    { text: 'Menu Buttons', id: 'menuButtons', leaf: true },
                    { text: 'Split Buttons', id: 'splitButtons', leaf: true },
                    { text: 'ButtonGroups', id: 'buttonGroups', leaf: true }
                ]
            },
            {
                text: 'Forms',
                expanded: true,
                children: [
                    { text: 'Form Fields', id: 'formFields', leaf: true },
                    { text: 'Fieldsets', id: 'fieldsets', leaf: true },
                    { text: 'Forms', id: 'forms', leaf: true }
                ]
            },
            {
                text: 'Windows',
                expanded: true,
                children: [
                    { text: 'Windows', id: 'windows', leaf: true }
                ]
            },
            {
                text: 'Tabs',
                expanded: true,
                children: [
                    { text: 'Basic Tabs', id: 'tabs', leaf: true },
                    { text: 'Bottom Tabs', id: 'bottomTabs', leaf: true },
                    { text: 'Tab Scrolling', id: 'overflowTabs', leaf: true }
                ]
            },
            {
                text: 'Trees',
                expanded: true,
                children: [
                    { text: 'Trees', id: 'trees', leaf: true }
                ]
            },
            {
                text: 'Grids',
                expanded: true,
                children: [
                    { text: 'Grids', id: 'grids', leaf: true }
                ]
            },
            {
                text: 'Combinations',
                expanded: true,
                children: [
                    { text: 'Panel Tab Toolbar Grid', id: 'panelTabToolbarGrid', leaf: true },
                    { text: 'Toolbars In Panels', id: 'toolbarsInPanels', leaf: true },
                    { text: 'Toolbars In Tabs', id: 'toolbarsInTabs', leaf: true },
                    { text: 'Border Layout', id: 'borderLayout', leaf: true },
                    { text: 'Form with Inner Tabs', id: 'formWithTabs', leaf: true },
                    { text: 'Nested Tab Panels', id: 'nestedTabs', leaf: true },
                    { text: 'Border Layout Window', id: 'borderLayoutWindow', leaf: true }
                ]
            }
        ]
    }
});