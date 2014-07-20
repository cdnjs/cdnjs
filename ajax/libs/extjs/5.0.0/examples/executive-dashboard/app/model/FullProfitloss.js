Ext.define('ExecDashboard.model.FullProfitloss', {
    extend: 'ExecDashboard.model.Base',

    fields: [
        'account',
        { name: 'q1_2010', type: 'int' },
        { name: 'q2_2010', type: 'int' },
        { name: 'q3_2010', type: 'int' },
        { name: 'q4_2010', type: 'int' },
        { name: 'q1_2011', type: 'int' },
        { name: 'q2_2011', type: 'int' },
        { name: 'q3_2011', type: 'int' },
        { name: 'q4_2011', type: 'int' },
        { name: 'q1_2012', type: 'int' },
        { name: 'q2_2012', type: 'int' },
        'region'
    ]
});
