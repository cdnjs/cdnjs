/**
 * This example shows simple dynamic data binding. When the data in the underlying view
 * model is modified, the change is relayed back to the panel and the markup is updated.
 */
Ext.define('KitchenSink.view.binding.Dynamic', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.binding-dynamic',
    //<example>
    otherContent: [{
        type: 'Controller',
        path: 'app/view/binding/DynamicController.js'
    }],
    //</example>
    
    width: 300,
    bodyPadding: 10,
    controller: 'binding-dynamic',

    viewModel: {
        data: {
            title: 'Some Title',
            content: 'Some Content'
        }
    },
    
    bind: {
        title: 'Info - {title}',
        html: 'Stuff: {content}'
    },
    
    tbar: [{
        text: 'Change title',
        listeners: {
            click: 'onChangeTitleClick'
        }
    }, {
        text: 'Change content',
        listeners: {
            click: 'onChangeContentClick'
        }
    }]
});
