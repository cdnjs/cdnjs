/**
 * A base provider for communicating using JSON. This is an abstract class
 * and should not be instanced directly.
 *
 * @abstract
 */

Ext.define('Ext.direct.JsonProvider', {
    extend: 'Ext.direct.Provider',
    alias:  'direct.jsonprovider',

    uses: [
        'Ext.direct.ExceptionEvent',
        'Ext.direct.Manager'
    ],

   /**
    * Parse the JSON response
    * @private
    *
    * @param {Object} response The XHR response object
    *
    * @return {Object} The data in the response.
    */
   parseResponse: function(response) {
        if (!Ext.isEmpty(response.responseText)) {
            if (Ext.isObject(response.responseText)) {
                return response.responseText;
            }

            return Ext.decode(response.responseText);
        }

        return null;
    },

    /**
     * Creates a set of events based on the XHR response
     *
     * @param {Object} response The XHR response
     *
     * @return {Ext.direct.Event[]} An array of Ext.direct.Event
     */
    createEvents: function(response) {
        var me = this,
            data = null,
            events = [],
            event, i, len;

        try {
            data = me.parseResponse(response);
        }
        catch (e) {
            event = new Ext.direct.ExceptionEvent({
                data: e,
                xhr: response,
                code: Ext.direct.Manager.exceptions.PARSE,
                message: 'Error parsing json response: \n\n ' + e
            });

            return [event];
        }

        if (Ext.isArray(data)) {
            for (i = 0, len = data.length; i < len; ++i) {
                events.push(me.createEvent(data[i]));
            }
        }
        else if (Ext.isObject(data)) {
            events.push(me.createEvent(data));
        }

        return events;
    },

    /**
     * Create an event from a response object
     *
     * @param {Object} response Response object
     *
     * @return {Ext.direct.Event} The event
     */
    createEvent: function(response) {
        if (typeof response !== 'object'|| !('type' in response)) {
            return new Ext.direct.ExceptionEvent({
                data: response,
                code: Ext.direct.Manager.exceptions.DATA,
                message: 'Invalid data: event type is not specified'
            });
        }
    
        return Ext.create('direct.' + response.type, response);
    }
});