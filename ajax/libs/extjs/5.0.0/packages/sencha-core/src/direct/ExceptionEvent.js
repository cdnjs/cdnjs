/**
 * An event that is fired when an exception is received from a {@link Ext.direct.RemotingProvider}
 */
Ext.define('Ext.direct.ExceptionEvent', {
    extend: 'Ext.direct.RemotingEvent',
    alias:  'direct.exception',
   
   status: false
});
