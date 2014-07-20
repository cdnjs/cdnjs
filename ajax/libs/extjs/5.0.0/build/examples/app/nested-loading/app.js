/**
 * Books.app
 * A MVC application which displays a list of books and their reviews.
 * Uses nested data which is loaded from a single json file.
 */
Ext.application({
    name: 'Books',

    controllers: [
        'Books'
    ],
    
    autoCreateViewport: true
});
