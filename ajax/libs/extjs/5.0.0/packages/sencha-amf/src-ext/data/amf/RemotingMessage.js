// @tag enterprise
/**
 * @class Ext.data.amf.RemotingMessage
 * Represents a remote call to be sent to the server.
 */

Ext.define('Ext.data.amf.RemotingMessage', {

    alias: 'data.amf.remotingmessage',

    config: {

        $flexType: 'flex.messaging.messages.RemotingMessage',

        /**
         * @property {Array} body - typically an array of parameters to pass to a method call
         */
        body: [],

        /**
         * @property {String} clientID - identifies the calling client.
         */
        clientId: "",

        /**
         * @property {String} destination - the service destination on the server
         */
        destination: "",

        /**
         * @property {Object} headers - the headers to attach to the message.
         * Would typically contain the DSEndpoint and DSId fields.
         */
        headers: [],

        /**
         * @property {String} messageId - message identifier
         */
        messageId: "",

        /**
         * @property {String} operation - the method name to call
         */
        operation: "",

        /**
         * @property {Array} source - should be empty for security purposes
         */
        source: "",

        /**
         * @property {Number} timestamp - when the message was created
         */
        timestamp: [],

        /**
         * @property {Number} timeToLive - how long the message is still valid for passing
         */
        timeToLive: []


    },


    /**
     * Creates new message.
     * @param {Object} config Configuration options
     */
    constructor: function(config) {
        this.initConfig(config);
    },



    /**
     * Returns an AMFX encoded version of the message.
     */
    encodeMessage: function() {
        var encoder = Ext.create('Ext.data.amf.XmlEncoder'),
            cleanObj;
        cleanObj = Ext.copyTo({}, this, "$flexType,body,clientId,destination,headers,messageId,operation,source,timestamp,timeToLive", true);
        encoder.writeObject(cleanObj);
        return encoder.body;
    }

});
