Ext.define('Pandora.controller.Song', {
    extend: 'Ext.app.Controller',

    refs: [{
        ref: 'songInfo',
        selector: 'songinfo'
    }, {
        ref: 'recentlyPlayedScroller',
        selector: 'recentlyplayedscroller'
    }],

    stores: ['RecentSongs'],
    
    init: function() {
        this.control({
            'recentlyplayedscroller': {
                selectionchange: this.onSongSelect
            }
        });
        
        this.application.on({
            stationstart: this.onStationStart,
            scope: this
        });
    },
    
    onStationStart: function(station) {
        var store = this.getRecentSongsStore();

        store.load({
            callback: this.onRecentSongsLoad,
            params: {
                station: station.get('id')
            },            
            scope: this
        });
    },
    
    onRecentSongsLoad: function(songs, request) {
        var store = this.getRecentSongsStore(),
            selModel = this.getRecentlyPlayedScroller().getSelectionModel();
        
        // The data should already be filtered on the serverside but since we
        // are loading static data we need to do this after we loaded all the data
        store.filter('station', request.params.station);
        store.sort('played_date', 'ASC');        

        selModel.select(store.last());
    },
    
    onSongSelect: function(selModel, selection) {
        this.getSongInfo().update(selection[0]);
    }
});
