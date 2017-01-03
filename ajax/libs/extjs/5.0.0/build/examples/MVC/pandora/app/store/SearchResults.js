Ext.define('Pandora.store.SearchResults', {
    extend: 'Ext.data.Store',
    requires: 'Pandora.model.Station',
    model: 'Pandora.model.Station',
    
    sorters: ['name']
});