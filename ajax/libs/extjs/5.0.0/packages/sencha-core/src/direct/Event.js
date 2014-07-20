/**
 * Base class for all Ext.direct events. An event is
 * created after some kind of interaction with the server.
 * The event class is essentially just a data structure
 * to hold a Direct response.
 */
Ext.define('Ext.direct.Event', {
    alias: 'direct.event',

    status: true,

    /**
     * Creates new Event.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        Ext.apply(this, config);
    },
    
    /**
     * Return the name for this event.
     * @return {String} The name of event
     */
    getName: function() {
        return this.name;
    },

    /**
     * Return the raw data for this event.
     * @return {Mixed} The data from the event
     */
    getData: function() {
        return this.data;
    }
});
