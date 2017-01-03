Ext.require('Ext.panel.Panel');

Ext.onReady(function(){
    var data = {
        name: 'Abe Elias',
        company: 'Sencha Inc',
        address: '525 University Ave',
        city: 'Palo Alto',
        state: 'California',
        zip: '44102',
        kids: [{
            name: 'Solomon',
            age:3
        },{
            name: 'Rebecca',
            age:2
        },{
            name: 'Rebecca 1',
            age:0
        }]
    };

    new Ext.panel.Panel({
        width: 300,
        renderTo: 'template-example',
        margin: 15,
        bodyPadding: 5,
        title: 'Basic Template',
        tpl: [
            '<p>Name: {name}</p>',
            '<p>Company: {company}</p>',
            '<p>Location: {city}, {state}</p>'
        ],
        tbar: [{
            text: 'Apply Template',
            handler: function() {
                this.up('panel').update(data);
            }
        }],
        html: '<p><i>Apply the template to see results here</i></p>'
    });

    new Ext.panel.Panel({
        width: 300,
        renderTo: 'xtemplate-example',
        margin: 15,
        bodyPadding: 5,
        title: 'XTemplate',
        tpl: [
            '<p>Name: {name}</p>',
            '<p>Company: {company}</p>',
            '<p>Location: {city}, {state}</p>',
            '<p>Kids: ',
            '<tpl for="kids">',
                '<tpl if="age &gt; 1"><p>{#}. {parent.name}\'s kid - {name}</p></tpl>',
            '</tpl></p>'
        ],
        tbar: [{
            text: 'Apply Template',
            handler: function() {
                this.up('panel').update(data);
            }
        }],
        html: '<p><i>Apply the template to see results here</i></p>'
    });
});