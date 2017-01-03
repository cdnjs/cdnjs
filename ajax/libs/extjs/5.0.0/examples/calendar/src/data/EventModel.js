/**
 * This is the {@link Ext.data.Record Record} specification for calendar event data used by the
 * {@link Ext.calendar.CalendarPanel CalendarPanel}'s underlying store. It can be overridden as 
 * necessary to customize the fields supported by events, although the existing column names should
 * not be altered. If your model fields are named differently you should update the <b>mapping</b>
 * configs accordingly.
 *
 * The only required fields when creating a new event record instance are StartDate and
 * EndDate.  All other fields are either optional are will be defaulted if blank.
 *
 * Here is a basic example for how to create a new record of this type:
 *
 *      rec = new Ext.calendar.data.EventModel({
 *          StartDate: '2101-01-12 12:00:00',
 *          EndDate: '2101-01-12 13:30:00',
 *          Title: 'My cool event',
 *          Notes: 'Some notes'
 *      });
 *
 * If you have overridden any of the record's data mappings via the Ext.calendar.data.EventMappings object
 * you may need to set the values using this alternate syntax to ensure that the fields match up correctly:
 *
 *      var M = Ext.calendar.data.EventMappings;
 *
 *      rec = new Ext.calendar.data.EventModel();
 *      rec.data[M.StartDate.name] = '2101-01-12 12:00:00';
 *      rec.data[M.EndDate.name] = '2101-01-12 13:30:00';
 *      rec.data[M.Title.name] = 'My cool event';
 *      rec.data[M.Notes.name] = 'Some notes';
 */
Ext.define('Ext.calendar.data.EventModel', {
    extend: 'Ext.data.Model',
    
    requires: [
        'Ext.calendar.data.EventMappings'
    ],
    
    identifier: 'sequential',
    
    statics: {
        /**
         * Reconfigures the default record definition based on the current {@link Ext.calendar.data.EventMappings EventMappings}
         * object. See the header documentation for {@link Ext.calendar.data.EventMappings} for complete details and 
         * examples of reconfiguring an EventRecord.
         *
         * **NOTE**: Calling this method will *not* update derived class fields. To ensure
         * updates are made before derived classes are defined as an override. See the
         * documentation of `Ext.calendar.data.EventMappings`.
         *
         * @static
         * @return {Class} The updated EventModel
         */
        reconfigure: function() {
            var me = this,
                Mappings = Ext.calendar.data.EventMappings;

            // It is critical that the id property mapping is updated in case it changed, since it
            // is used elsewhere in the data package to match records on CRUD actions:
            me.prototype.idProperty = Mappings.EventId.name || 'id';

            me.replaceFields(Ext.Object.getValues(Mappings), true);

            return me;
        }
    }
},
function(){
    this.reconfigure();
});
