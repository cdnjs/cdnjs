/**
 * This is a more advanced example that shows how you can combine Ext.Template and a
 * remote data store to create a "live search" feature. Try searching for terms like
 * "form", or "grid".
 *
 * Each item in the resulting list is a link which may be clicked to navigate to the found
 * forum thread.
 */
Ext.define('KitchenSink.view.form.ForumSearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'form-forumsearch',
    
    //<example>
    exampleTitle: 'Forum Search',
    //</example>
    
    title: 'Search the Ext Forums',
    width: 600,
    bodyPadding: 10,
    layout: 'anchor',

    height: 300,

    items: [{
        xtype: 'combo',
        store: {
            type: 'form-forum-posts',
            pageSize: 10
        },
        displayField: 'title',
        typeAhead: false,
        hideLabel: true,
        hideTrigger:true,
        anchor: '100%',

        listConfig: {
            loadingText: 'Searching...',
            emptyText: 'No matching posts found.',
            
            itemSelector: '.search-item',

            // Custom rendering template for each item
            itemTpl: [
                '<a class="search-item" href="http://www.sencha.com/forum/showthread.php?t={topicId}&p={id}">',
                    '<h3><span>{[Ext.Date.format(values.lastPost, "M j, Y")]}<br />by {author}</span>{title}</h3>',
                    '{excerpt}',
                '</a>'
            ]
        }
    }, {
        xtype: 'component',
        style: 'margin-top: 10px',
        html: 'Live search requires a minimum of 4 characters.'
    }]
});
