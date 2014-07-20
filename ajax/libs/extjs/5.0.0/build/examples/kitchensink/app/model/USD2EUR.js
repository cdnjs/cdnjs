Ext.define('KitchenSink.model.USD2EUR', {
    extend: 'KitchenSink.model.Base',
    fields: [
		{ name: 'time', type: 'date', dateFormat: 'time'},
		'value'
    ]
});