/**
 * Model for a book
 */
Ext.define('Books.model.Book', {
    extend: 'Ext.data.Model',
    requires: ['Books.model.Review'],

    fields: [
        'id',
        'name',
        'author',
        'detail',
        'price',
        'image'
    ],

    hasMany: {
        model: 'Books.model.Review', 
        name: 'reviews',
        foreignKey: 'book_id'
    }
});
