Ext.define('KitchenSink.data.GeoData', {
    requires: [
        'KitchenSink.data.Init'
    ]
}, function() {
    Ext.ux.ajax.SimManager.register({
        '/KitchenSink/GeoData': {
            type: 'json',
            data: {
                children: [{
                    mtype: 'Territory',
                    name: 'North America',
                    children :[{
                        mtype: 'Country',
                        name: 'USA',
                        children: [{
                            mtype: 'City',
                            name: 'Redwood City',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Frederick, MD',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Canada',
                        children: [{
                            mtype: 'City',
                            name: 'Vancouver',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Toronto',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Mexico',
                        children: [{
                            mtype: 'City',
                            name: 'Mexico City',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Chihuahua',
                            leaf: true
                        }]
                    }]
                }, {
                    mtype: 'Territory',
                    name: 'Europe, ME, Africa',
                    children :[{
                        mtype: 'Country',
                        name: 'England',
                        children: [{
                            mtype: 'City',
                            name: 'Nottingham',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'London',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Netherlands',
                        children: [{
                            mtype: 'City',
                            name: 'Amsterdam',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Haaksbergen',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Italy',
                        children: [{
                            mtype: 'City',
                            name: 'Ferrara',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Milan',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Kenya',
                        children: [{
                            mtype: 'City',
                            name: 'Kampala',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Croatia',
                        children: [{
                            mtype: 'City',
                            name: 'Split',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Dubrovnik',
                            leaf: true
                        }]
                    }]
                }, {
                    mtype: 'Territory',
                    name: 'South America, Caribbean',
                    children :[{
                        mtype: 'Country',
                        name: 'Brazil',
                        children: [{
                            mtype: 'City',
                            name: 'Rio de Janeiro',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Brasilia',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Argentina',
                        children: [{
                            mtype: 'City',
                            name: 'Buenos Aires',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Chile',
                        children: [{
                            mtype: 'City',
                            name: 'Santiago',
                            leaf: true
                        }]
                    }]
                }, {
                    mtype: 'Territory',
                    name: 'Central and South Asia',
                    children :[{
                        mtype: 'Country',
                        name: 'Russian Federation',
                        children: [{
                            mtype: 'City',
                            name: 'Moscow',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Yekaterinburg',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'India',
                        children: [{
                            mtype: 'City',
                            name: 'Mumbai',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Bangalore',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Kazakhstan',
                        children: [{
                            mtype: 'City',
                            name: 'Astana',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Turkmenistan',
                        children: [{
                            mtype: 'City',
                            name: 'Ashgabat',
                            leaf: true
                        }]
                    }]
                }, {
                    mtype: 'Territory',
                    name: 'East Asia and Pacific',
                    children :[{
                        mtype: 'Country',
                        name: 'Australia',
                        children: [{
                            mtype: 'City',
                            name: 'Sydney',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Canberra',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'China',
                        children: [{
                            mtype: 'City',
                            name: 'Beijing',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Chengdu',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        name: 'Japan',
                        children: [{
                            mtype: 'City',
                            name: 'Tokyo',
                            leaf: true
                        }, {
                            mtype: 'City',
                            name: 'Osaka',
                            leaf: true
                        }]
                    }]
                }]
            }
        }
    });
});
