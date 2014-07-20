/**
 * A view which displays a list of reviews for a specified book.
 * @extends Ext.view.View
 */
Ext.define('Books.view.review.List', {
    alias: 'widget.reviewlist',
    extend: 'Ext.panel.Panel',

    requires: ['Ext.layout.container.Card'],

    initComponent: function() {
        this.dataview = Ext.create('Ext.view.View', {
            id: 'reviews',
            border: false,
            cls: 'review-list',

            autoScroll: true,

            itemSelector: '.review',
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="review {[xindex === 1 ? "first-review" : ""]}">',
                        '<div class="title">{title} {[this.stars(values)]}</div>',
                        '<div class="author">By <span>{author}</span> - {date}</div>',
                        '<div class="comment">{comment}</div>',
                    '</div>',
                '</tpl>',
                {
                    stars: function(values) {
                        var res = [],
                            extension = Ext.isIE6 ? 'gif' : 'png',
                            i = 0;

                        //print out the stars for each of the ratings
                        for (; i < values.rating; i++) {
                            res.push('<img src="./resources/images/star.', extension, '" />');
                        }

                        //print out transparent stars for the rest (up to 5)
                        while (i < 5) {
                            res.push('<img src="./resources/images/star_no.', extension, '" />');
                            i++;
                        }

                        return res.join('');
                    }
                }
            )
        });

        Ext.apply(this, {
            border: false,
            flex: 1,
            id: 'test',

            layout: 'card',

            dockedItems: [
                Ext.create('Books.view.Header', {
                    html: 'Reviews'
                })
            ],

            items: this.dataview
        });

        this.callParent(arguments);
    },

    /**
     * Used to bind a store to this dataview.
     * Delegates to bindStore and also shows this view
     * @param {Ext.data.Model} record The record to bind
     * @param {Ext.data.Store} store The reviews store used by the application
     */
    bind: function(record, store) {
        //put the reviews into the store and bind the store to thie dataview
        this.dataview.bindStore(record.reviews());
    }
});
