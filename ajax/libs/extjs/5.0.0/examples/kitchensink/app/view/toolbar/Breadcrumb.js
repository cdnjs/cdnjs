/**
 * Demonstrates a breadcrumb toolbar. A breadcrumb component is just another way of
 * navigating hierarchical data structures. It is bound to a standard tree store and
 * allows the user to set the selected node by clicking on the navigation buttons.
 */
Ext.define('KitchenSink.view.toolbar.Breadcrumb', {
    extend: 'Ext.panel.Panel',
    xtype: 'breadcrumb-toolbar',
    id: 'breadcrumb-toolbar',
    //<example>
    exampleTitle: 'Breadcrumb Toolbar',
    otherContent: [{
        type: 'store',
        path: 'app/store/Files.js'
    }],
    themes: {
        classic: {
            width: 380
        },
        neptune: {
            width: 500
        },
        'neptune-touch': {
            width: 620
        }
    },
    //</example>

    overflowHandler: 'scroller',

    height: 400,

    html: KitchenSink.DummyText.longText,
    bodyPadding: 20,

    initComponent: function() {
        var store = new KitchenSink.store.Files();

        this.width = this.themeInfo.width;

        //<example>
        // TODO: when using KitchenSink.store.Files(), nodes with children (e.g. app, or button)
        // will return false when hasChildNodes() is called.  When using the exact
        // same data inline, the problem does not occur.  Remove this workaround when fixed.
        store = new Ext.data.TreeStore({
            root: {
                expanded: true,
                children: [
                    {
                        text: 'app',
                        children: [
                            { leaf:true, text: 'Application.js' }
                        ]
                    },
                    {
                        text: 'button',
                        expanded: true,
                        children: [
                            { leaf:true, text: 'Button.js' },
                            { leaf:true, text: 'Cycle.js' },
                            { leaf:true, text: 'Split.js' }
                        ]
                    },
                    {
                        text: 'container',
                        children: [
                            { leaf:true, text: 'ButtonGroup.js' },
                            { leaf:true, text: 'Container.js' },
                            { leaf:true, text: 'Viewport.js' }
                        ]
                    },
                    {
                        text: 'core',
                        children: [
                            {
                                text: 'dom',
                                children: [
                                    { leaf:true, text: 'Element.form.js' },
                                    { leaf:true, text: 'Element.static-more.js' }
                                ]
                            }
                        ]
                    },
                    {
                        text: 'dd',
                        children: [
                            { leaf:true, text: 'DD.js' },
                            { leaf:true, text: 'DDProxy.js' },
                            { leaf:true, text: 'DDTarget.js' },
                            { leaf:true, text: 'DragDrop.js' },
                            { leaf:true, text: 'DragDropManager.js' },
                            { leaf:true, text: 'DragSource.js' },
                            { leaf:true, text: 'DragTracker.js' },
                            { leaf:true, text: 'DragZone.js' },
                            { leaf:true, text: 'DragTarget.js' },
                            { leaf:true, text: 'DragZone.js' },
                            { leaf:true, text: 'Registry.js' },
                            { leaf:true, text: 'ScrollManager.js' },
                            { leaf:true, text: 'StatusProxy.js' }
                        ]
                    },
                    {
                        text: 'core',
                        children: [
                            { leaf:true, text: 'Element.alignment.js' },
                            { leaf:true, text: 'Element.anim.js' },
                            { leaf:true, text: 'Element.dd.js' },
                            { leaf:true, text: 'Element.fx.js' },
                            { leaf:true, text: 'Element.js' },
                            { leaf:true, text: 'Element.position.js' },
                            { leaf:true, text: 'Element.scroll.js' },
                            { leaf:true, text: 'Element.style.js' },
                            { leaf:true, text: 'Element.traversal.js' },
                            { leaf:true, text: 'Helper.js' },
                            { leaf:true, text: 'Query.js' }
                        ]
                    },
                    { leaf:true, text: 'Action.js' },
                    { leaf:true, text: 'Component.js' },
                    { leaf:true, text: 'Editor.js' },
                    { leaf:true, text: 'Img.js' },
                    { leaf:true, text: 'Layer.js' },
                    { leaf:true, text: 'LoadMask.js' },
                    { leaf:true, text: 'ProgressBar.js' },
                    { leaf:true, text: 'Shadow.js' },
                    { leaf:true, text: 'ShadowPool.js' },
                    { leaf:true, text: 'ZIndexManager.js' }
                ]
            }
        });
        //</example>
        this.tbar = [{
            xtype: 'breadcrumb',
            store: store,
            showIcons: true,
            // Start with "Ext JS > dd > DragZone.js" selected
            selection: store.getRoot().childNodes[4].childNodes[7]
        }];

        this.callParent();
    }
});