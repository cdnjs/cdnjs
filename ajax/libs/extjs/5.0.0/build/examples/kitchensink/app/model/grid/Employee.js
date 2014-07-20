Ext.define('KitchenSink.model.grid.Employee', {
    extend: 'KitchenSink.model.Base',
    fields: [{
        name: 'employeeNo'
    }, {
        name: 'rating'
    }, {
        name: 'salary',
        type: 'float'
    }, {
        name: 'forename'
    }, {
        name: 'surname'
    }, {
        name: 'name',
        convert: function(v, rec) {
            return rec.editing ? v : rec.get('forename') + ' ' + rec.get('surname');
        }
    }, {
        name: 'email'
    }, {
        name: 'department'
    }, {
        name: 'dob',
        type: 'date',
        dateFormat: 'Ymd'
    }, {
        name: 'joinDate',
        type: 'date',
        dateFormat: 'Ymd'
    }, {
        name: 'noticePeriod'
    }, {
        name: 'sickDays',
        type: 'int'
    }, {
        name: 'holidayDays',
        type: 'int'
    }, {
        name: 'holidayAllowance',
        type: 'int'
    }, {
        name: 'avatar'
    }],
    idField: 'employeeNo',

    afterEdit: function(modifiedFieldNames) {
        // "name" is a calculated field, so update it on edit of "forename" or "surname".
        if (Ext.Array.contains(modifiedFieldNames, 'forename') || Ext.Array.contains(modifiedFieldNames, 'surname')) {
            this.data.name = this.data.forename + ' ' + this.data.surname;
            modifiedFieldNames.push('name');
        }
        // Likewise, update two name fields if whole name gets updated
        else if (Ext.Array.contains(modifiedFieldNames, 'name')) {
            var names = this.convertName(this.data.name);
            this.data.forename = names[0];
            this.data.surname = names[1];
            modifiedFieldNames.push('forename', 'surname');
        }
        return this.callParent(arguments);
    },
    
    convertName: function(name) {
        var names = /([^\s+]+)(?:\s+(.*))?/.exec(name);
        return names ? [names[1], names[2]||''] : ['', ''];
    }
});