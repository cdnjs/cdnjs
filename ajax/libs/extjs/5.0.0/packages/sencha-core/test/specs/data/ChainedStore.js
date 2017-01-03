describe("Ext.data.ChainedStore", function() {
    var fakeScope = {},
        abeRec, aaronRec, edRec, tommyRec, 
        abeRaw, aaronRaw, edRaw, tommyRaw,
        source, store, User;
        
    function addSourceData() {
        source.add(edRaw, abeRaw, aaronRaw, tommyRaw);
        edRec    = source.getAt(0);
        abeRec   = source.getAt(1);
        aaronRec = source.getAt(2);
        tommyRec = source.getAt(3);
    }
    
    function makeUser(email, data) {
        if (Ext.isObject(email)) {
            data = email;
        } else {
            data = data || {};
            if (!data.email) {
                data.email = email;
            }
        }
        return new User(data);
    }
    
    function createSource(cfg) {
        cfg = cfg || {};
        source = new Ext.data.Store(Ext.applyIf(cfg, {
            model: 'spec.User'
        }));
    }
    
    function createStore(cfg) {
        store = new Ext.data.ChainedStore(Ext.apply({
            source: source
        }, cfg));
    }
    
    function completeWithData(data) {
        Ext.Ajax.mockComplete({
            status: 200,
            responseText: Ext.JSON.encode(data)
        });
    }
    
    function expectOrder(recs, s) {
        var len = recs.length,
            i;

        for (i = 0; i < len; ++i) {
            expect(s.getAt(i)).toBe(recs[i]);
        }
    }
    
    beforeEach(function() {
        MockAjaxManager.addMethods();
        edRaw = {name: 'Ed Spencer',   email: 'ed@sencha.com',    evilness: 100, group: 'code',  old: false, age: 25, valid: 'yes'};
        abeRaw = {name: 'Abe Elias',    email: 'abe@sencha.com',   evilness: 70,  group: 'admin', old: false, age: 20, valid: 'yes'};
        aaronRaw = {name: 'Aaron Conran', email: 'aaron@sencha.com', evilness: 5,   group: 'admin', old: true, age: 26, valid: 'yes'};
        tommyRaw = {name: 'Tommy Maintz', email: 'tommy@sencha.com', evilness: -15, group: 'code',  old: true, age: 70, valid: 'yes'};
            
        User = Ext.define('spec.User', {
            extend: 'Ext.data.Model',
            idProperty: 'email',

            fields: [
                {name: 'name',      type: 'string'},
                {name: 'email',     type: 'string'},
                {name: 'evilness',  type: 'int'},
                {name: 'group',     type: 'string'},
                {name: 'old',       type: 'boolean'},
                {name: 'valid',     type: 'string'},
                {name: 'age',       type: 'int'}
            ]
        });
        
        createSource();
        addSourceData();
    });
    
    afterEach(function() {
        MockAjaxManager.removeMethods();
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.User');
        if (source) {
            source.destroy();
        }
        store.destroy();
        User = source = store = null;
    });
    
    describe("constructing", function() {
        it("should inherit the model from the backing store", function() {
            createStore();
            expect(store.getModel()).toBe(User);
        });

        it("should have the data from the backing store", function() {
            createStore();
            
            var sourceData = source.getRange(),
                storeData = store.getRange(),
                len = sourceData.length,
                i;

            expect(storeData.length).toBe(sourceData.length);
            for (i = 0; i < len; ++i) {
                expect(storeData[i]).toBe(sourceData[i]);
            }
        });

        it("should not fire a refresh or datachanged event", function() {
            var spy = jasmine.createSpy();
            createStore({
                listeners: {
                    refresh: spy,
                    datachanged: spy
                }
            });
            expect(spy).not.toHaveBeenCalled();
        });

        it("should accept an id of a store as the source", function() {
            var idSource = new Ext.data.Store({
                model: 'spec.User',
                storeId: 'sourceId'
            });
            source = 'sourceId';
            createStore();
            source = null;
            expect(store.getSource()).toBe(idSource);
            idSource.destroy();
        });
    });

    it("should not join the records to the store", function() {
        createStore();
        var joined = edRec.joined;
        expect(joined.length).toBe(1);
        expect(joined[0]).toBe(source);
    });

    describe("sorting", function() {
        describe("initial values", function() {
            it("should default to having no sorters", function() {
                createStore();
                expect(store.getSorters().getCount()).toBe(0);
            });

            it("should not inherit sorters from the source store", function() {
                source.sort('age', 'DESC');
                createStore();
                expect(store.getSorters().getCount()).toBe(0);
            });

            it("should have the data in order of the source store by default", function() {
                source.sort('age', 'DESC');
                createStore();
                expect(store.first()).toBe(source.first());
                expect(store.getAt(1)).toBe(source.getAt(1));
                expect(store.getAt(2)).toBe(source.getAt(2));
                expect(store.last()).toBe(source.last());
            });
        });

        describe("sorting the source", function() {
            it("should not change the sort order in the store", function() {
                createStore();
                source.sort('name', 'DESC');
                expectOrder([tommyRec, edRec, abeRec, aaronRec], source);
                expectOrder([edRec, abeRec, aaronRec, tommyRec], store);
            });
        });

        describe("sorting the store", function() {
            it("should not change the sort order in the source store", function() {
                createStore();
                store.sort('name', 'DESC');
                expectOrder([tommyRec, edRec, abeRec, aaronRec], store);
                expectOrder([edRec, abeRec, aaronRec, tommyRec], source);
            });
        });
    });

    describe("filtering", function() {
        describe("filtering the source", function() {
            it("should also filter the store", function() {
                createStore();
                source.filter('group', 'code');
                expect(store.getCount()).toBe(2);
                expectOrder(source.getRange(), store);
            });

            it("should not affect the store filter collection", function() {
                createStore();
                source.filter('group', 'code');
                expect(store.getFilters().getCount()).toBe(0);
            });

            it("should also unfilter the store", function() {
                createStore();
                source.filter('group', 'code');
                source.getFilters().removeAll();
                expect(store.getCount()).toBe(4);
                expectOrder(source.getRange(), store);
            });

            it("should have a record present in the store when added to the source but filtered out", function() {
                createStore();
                source.filter('group', 'code');
                var rec = makeUser('foo@sencha.com', {
                    group: 'admin'
                });
                source.add(rec);
                source.getFilters().removeAll();
                expect(store.indexOf(rec)).toBe(4);
            });

            describe("events", function() {
                it("should fire the refresh event on the store", function() {
                    var spy = jasmine.createSpy();
                    createStore();
                    store.on('refresh', spy);
                    source.filter('group', 'code');
                    expect(spy).toHaveBeenCalled();
                    expect(spy.callCount).toBe(1);
                });

                it("should fire the datachanged event on the store", function() {
                    var spy = jasmine.createSpy();
                    createStore();
                    store.on('datachanged', spy);
                    source.filter('group', 'code');
                    expect(spy).toHaveBeenCalled();
                    expect(spy.callCount).toBe(1);
                });

                it("should not fire the filterchange event", function() {
                    var spy = jasmine.createSpy();
                    createStore();
                    store.on('filterchange', spy);
                    source.filter('group', 'code');
                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });

        describe("filtering the store", function() {
            it("should not filter the source", function() {
                createStore();
                store.filter('group', 'code');
                expect(store.getCount()).toBe(2);
                expect(source.getCount()).toBe(4);
            });

            it("should not affect the source filter collection", function() {
                createStore();
                store.filter('group', 'code');
                expect(source.getFilters().getCount()).toBe(0);
            });

            it("should filter based off source filters when the source is filtered", function() {
                createStore();
                source.filter('group', 'code');
                store.filter('name', 'Tommy');
                expect(store.getCount()).toBe(1);
                expect(store.first()).toBe(tommyRec);
            });

            it("should apply source filters over current filters", function() {
                createStore();
                store.getFilters().add({
                    property: 'age',
                    value: 70,
                    operator: '<'
                });
                expect(store.getCount()).toBe(3);
                source.filter('group', 'admin');
                expect(store.getCount()).toBe(2);
                expectOrder([abeRec, aaronRec], store);
            });

            describe("events", function() {
                it("should fire the refresh event", function() {
                    var spy = jasmine.createSpy();
                    createStore();
                    store.on('refresh', spy);
                    store.filter('group', 'code');
                    expect(spy).toHaveBeenCalled();
                    expect(spy.callCount).toBe(1);
                });

                it("should fire the datachanged event", function() {
                    var spy = jasmine.createSpy();
                    createStore();
                    store.on('datachanged', spy);
                    store.filter('group', 'code');
                    expect(spy).toHaveBeenCalled();
                    expect(spy.callCount).toBe(1);
                });

                it("should fire the filterchange event", function() {
                    var spy = jasmine.createSpy();
                    createStore();
                    store.on('filterchange', spy);
                    store.filter('group', 'code');
                    expect(spy).toHaveBeenCalled();
                    expect(spy.callCount).toBe(1);
                });
            });
        });
    });

    describe("loading", function() {
        describe("via load", function() {
            it("should populate the store", function() {
                source.removeAll();
                createStore();
                source.load();
                completeWithData([abeRaw, tommyRaw, edRaw, aaronRaw]);
                expectOrder(source.getRange(), store);
            });

            it("should clear any existing data", function() {
                createStore();
                source.load();
                completeWithData([{
                    id: 'foo@sencha.com'
                }]);
                expect(store.getCount()).toBe(1);
                expect(store.first()).toBe(source.first());
            });
            
            it("should not fire the add event", function() {
                source.removeAll();
                createStore();
                var spy = jasmine.createSpy();
                store.on('add', spy);
                source.load();
                completeWithData([abeRaw, tommyRaw, edRaw, aaronRaw]);
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should not fire the remove event", function() {
                createStore();
                var spy = jasmine.createSpy();
                store.on('remove', spy);
                source.load();
                completeWithData([abeRaw, tommyRaw, edRaw, aaronRaw]);
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should fire the refresh and datachanged event", function() {
                createStore();
                var dataChangedSpy = jasmine.createSpy(),
                    refreshSpy = jasmine.createSpy();
                    
                store.on('refresh', refreshSpy);
                store.on('datachanged', dataChangedSpy);
                
                source.load();
                completeWithData([abeRaw, tommyRaw, edRaw, aaronRaw]);
                expect(refreshSpy).toHaveBeenCalled();
                expect(refreshSpy.mostRecentCall.args[0]).toBe(store);
                
                expect(dataChangedSpy).toHaveBeenCalled();
                expect(dataChangedSpy.mostRecentCall.args[0]).toBe(store);
            });
        });

        describe("via loadData", function() {
            it("should populate the store", function() {
                source.removeAll();
                createStore();
                source.loadData([edRaw, tommyRaw, aaronRaw, abeRaw]);
                expectOrder(source.getRange(), store);
            });

            it("should clear any existing data", function() {
                createStore();
                source.loadData([{
                    id: 'foo@sencha.com'
                }]);
                expect(store.getCount()).toBe(1);
                expect(store.first()).toBe(source.first());
            });
            
            it("should not fire the add event", function() {
                source.removeAll();
                createStore();
                var spy = jasmine.createSpy();
                store.on('add', spy);
                source.loadData([edRaw, tommyRaw, aaronRaw, abeRaw]);
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should not fire the remove event", function() {
                createStore();
                var spy = jasmine.createSpy();
                store.on('remove', spy);
                source.loadData([edRaw, tommyRaw, aaronRaw, abeRaw]);
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should fire the refresh and datachanged event", function() {
                createStore();
                var dataChangedSpy = jasmine.createSpy(),
                    refreshSpy = jasmine.createSpy();
                    
                store.on('refresh', refreshSpy);
                store.on('datachanged', dataChangedSpy);
                
                source.loadData([edRaw, tommyRaw, aaronRaw, abeRaw]);
                expect(refreshSpy).toHaveBeenCalled();
                expect(refreshSpy.mostRecentCall.args[0]).toBe(store);
                
                expect(dataChangedSpy).toHaveBeenCalled();
                expect(dataChangedSpy.mostRecentCall.args[0]).toBe(store);
            });
        });

        describe("via loadRawData", function() {
            it("should populate the store", function() {
                source.removeAll();
                createStore();
                source.loadRawData([edRaw, tommyRaw, aaronRaw, abeRaw]);
                expectOrder(source.getRange(), store);
            });

            it("should clear any existing data", function() {
                createStore();
                source.loadRawData([{
                    id: 'foo@sencha.com'
                }]);
                expect(store.getCount()).toBe(1);
                expect(store.first()).toBe(source.first());
            });
            
            it("should not fire the add event", function() {
                source.removeAll();
                createStore();
                var spy = jasmine.createSpy();
                store.on('add', spy);
                source.loadRawData([edRaw, tommyRaw, aaronRaw, abeRaw]);
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should not fire the remove event", function() {
                createStore();
                var spy = jasmine.createSpy();
                store.on('remove', spy);
                source.loadRawData([edRaw, tommyRaw, aaronRaw, abeRaw]);
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should fire the refresh and datachanged event", function() {
                createStore();
                var dataChangedSpy = jasmine.createSpy(),
                    refreshSpy = jasmine.createSpy();
                    
                store.on('refresh', refreshSpy);
                store.on('datachanged', dataChangedSpy);
                
                source.loadRawData([edRaw, tommyRaw, aaronRaw, abeRaw]);
                expect(refreshSpy).toHaveBeenCalled();
                expect(refreshSpy.mostRecentCall.args[0]).toBe(store);
                
                expect(dataChangedSpy).toHaveBeenCalled();
                expect(dataChangedSpy.mostRecentCall.args[0]).toBe(store);
            });
        });

        describe("with sorters", function() {
            it("should apply sorters from the store", function() {
                source.removeAll();
                createStore();
                store.sort('name', 'DESC');
                source.load();
                completeWithData([abeRaw, edRaw, tommyRaw, aaronRaw]);
                expect(store.getAt(0).id).toBe('tommy@sencha.com');
                expect(store.getAt(1).id).toBe('ed@sencha.com');
                expect(store.getAt(2).id).toBe('abe@sencha.com');
                expect(store.getAt(3).id).toBe('aaron@sencha.com');
            });
        });

        describe("filters", function() {
            it("should apply filters from the store", function() {
                source.removeAll();
                createStore();
                store.getFilters().add({
                    property: 'group',
                    value: 'code'
                });
                source.load();
                completeWithData([abeRaw, edRaw, tommyRaw, aaronRaw]);
                expect(store.getCount()).toBe(2);
                expect(store.first().id).toBe('ed@sencha.com');
                expect(store.last().id).toBe('tommy@sencha.com');
            });
        });
    });

    describe("adding", function() {
        beforeEach(function() {
            createStore();
        });

        describe("adding to the source", function() {
            it("should also add to the store", function() {
                var rec = source.add({
                    id: 'new@sencha.com'
                })[0];
                expect(store.last()).toBe(rec);
            });

            it("should fire the add/datachanged event on the store", function() {
                var addSpy = jasmine.createSpy(),
                    datachangedSpy = jasmine.createSpy(),
                    rec, args;

                store.on('add', addSpy);
                store.on('datachanged', datachangedSpy);

                rec = source.add({
                    id: 'new@sencha.com'
                })[0];

                expect(addSpy).toHaveBeenCalled();
                args = addSpy.mostRecentCall.args;
                expect(args[0]).toBe(store);
                expect(args[1]).toEqual([rec]);
                expect(args[2]).toBe(4);
                expect(datachangedSpy).toHaveBeenCalled();
                expect(datachangedSpy.mostRecentCall.args[0]).toBe(store);
            });

            it("should fire add on the source, then the store", function() {
                var order = [];
                source.on('add', function() {
                    order.push('source');
                });
                store.on('add', function() {
                    order.push('store');
                });
                source.add({
                    id: 'foo@sencha.com'
                });
                expect(order).toEqual(['source', 'store']);
            });

            describe("with sorting", function() {
                it("should insert into the correct position", function() {
                    store.sort('email');
                    var rec = source.add({
                        email: 'aaaa@sencha.com'
                    })[0];
                    expect(store.first()).toBe(rec);
                });
            });

            describe("with filtering", function() {
                it("should filter out non-matching records", function() {
                    store.filter('group', 'admin');
                    var rec = source.add({
                        email: 'new@sencha.com',
                        group: 'code'
                    })[0];
                    expect(store.indexOf(rec)).toBe(-1);
                });

                it("should include the filtered out record when filters are cleared", function() {
                    store.filter('group', 'admin');
                    var rec = source.add({
                        email: 'new@sencha.com',
                        group: 'code'
                    })[0];
                    store.getFilters().removeAll();
                    expect(source.last()).toBe(rec);
                });
            });
        });

        describe("adding to the store", function() {
            it("should also add the record to the source", function() {
                var rec = store.add({
                    id: 'new@sencha.com'
                })[0];
                expect(source.last()).toBe(rec);
            });

            it("should fire the add/datachanged event on the source", function() {
                var addSpy = jasmine.createSpy(),
                    datachangedSpy = jasmine.createSpy();

                source.on('add', addSpy);
                source.on('datachanged', datachangedSpy);

                var rec = store.add({
                    id: 'new@sencha.com'
                })[0], args;

                expect(addSpy).toHaveBeenCalled();
                args = addSpy.mostRecentCall.args;
                expect(args[0]).toBe(source);
                expect(args[1]).toEqual([rec]);
                expect(args[2]).toBe(4);
                expect(datachangedSpy).toHaveBeenCalled();
                expect(datachangedSpy.mostRecentCall.args[0]).toBe(source);
            });

            it("should fire add on the source, then the store", function() {
                var order = [];
                source.on('add', function() {
                    order.push('source');
                });
                store.on('add', function() {
                    order.push('store');
                });
                store.add({
                    id: 'foo@sencha.com'
                });
                expect(order).toEqual(['source', 'store']);
            });
        });
    });

    describe("removing", function() {
        beforeEach(function() {
            createStore();
        });
        
        describe("remove", function() {
            describe("removing from the source", function() {
                it("should also remove from the store", function() {
                    source.removeAt(0);
                    expect(store.indexOf(edRec)).toBe(-1);
                });

                it("should fire the remove/datachanged event on the store", function() {
                    var removeSpy = jasmine.createSpy(),
                        datachangedSpy = jasmine.createSpy(),
                        args;

                    store.on('remove', removeSpy);
                    store.on('datachanged', datachangedSpy);

                    store.remove(edRec);

                    expect(removeSpy).toHaveBeenCalled();
                    args = removeSpy.mostRecentCall.args;
                    expect(args[0]).toBe(store);
                    expect(args[1]).toEqual([edRec]);
                    expect(args[2]).toBe(0);
                    expect(datachangedSpy).toHaveBeenCalled();
                    expect(datachangedSpy.mostRecentCall.args[0]).toBe(store);
                });

                it("should fire remove on the source, then the store", function() {
                    var order = [];
                    source.on('remove', function() {
                        order.push('source');
                    });
                    store.on('remove', function() {
                        order.push('store');
                    });
                    source.removeAt(0);
                    expect(order).toEqual(['source', 'store']);
                });

                describe("with filtering", function() {
                    it("should remove from the store when record is filtered out", function() {
                        store.filter('group', 'admin');
                        source.remove(edRec);
                        store.getFilters().removeAll();
                        expect(store.indexOf(edRec)).toBe(-1);
                    });
                });
            });

            describe("removing from the store", function() {
                it("should also remove the record from the source", function() {
                    store.remove(edRec);
                    expect(source.indexOf(edRec)).toBe(-1);
                });

                it("should fire the add/datachanged event on the source", function() {
                    var removeSpy = jasmine.createSpy(),
                        datachangedSpy = jasmine.createSpy(),
                        args;

                    source.on('remove', removeSpy);
                    source.on('datachanged', datachangedSpy);

                    store.remove(edRec);

                    expect(removeSpy).toHaveBeenCalled();
                    args = removeSpy.mostRecentCall.args;
                    expect(args[0]).toBe(source);
                    expect(args[1]).toEqual([edRec]);
                    expect(args[2]).toBe(0);
                    expect(datachangedSpy).toHaveBeenCalled();
                    expect(datachangedSpy.mostRecentCall.args[0]).toBe(source);
                });

                it("should fire add on the source, then the store", function() {
                    var order = [];
                    source.on('remove', function() {
                        order.push('source');
                    });
                    store.on('remove', function() {
                        order.push('store');
                    });
                    store.remove(edRec);
                    expect(order).toEqual(['source', 'store']);
                });
            });
        });
        
        describe("removeAll", function() {
            it("should not fire a remove event", function() {
                var spy = jasmine.createSpy();
                store.on('remove', spy);
                source.removeAll();
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should fire the clear event", function() {
                var spy = jasmine.createSpy();
                store.on('clear', spy);
                source.removeAll();
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toBe(store);
            });
            
            it("should fire the datachanged event", function() {
                var spy = jasmine.createSpy();
                store.on('datachanged', spy);
                source.removeAll();
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toBe(store);
            });
            
            describe("with silent: true", function() {
                it("should not fire the clear event", function() {
                    var spy = jasmine.createSpy();
                    store.on('clear', spy);
                    source.removeAll(true);
                    expect(spy).not.toHaveBeenCalled();
                });
            
                it("should not fire the datachanged event", function() {
                    var spy = jasmine.createSpy();
                    store.on('datachanged', spy);
                    source.removeAll(true);
                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });
    });

    describe("updating", function() {
        beforeEach(function() {
            createStore();
        });

        it("should fire the update event on the source & pass the store, record, type & modified fields", function() {
            var spy = jasmine.createSpy(),
                args;

            source.on('update', spy);
            abeRec.set('name', 'foo');
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toBe(1);

            args = spy.mostRecentCall.args;
            expect(args[0]).toBe(source);
            expect(args[1]).toBe(abeRec);
            expect(args[2]).toBe(Ext.data.Model.EDIT);
            expect(args[3]).toEqual(['name']);
        });

        it("should fire the update event on the store & pass the store, record, type & modified fields", function() {
            var spy = jasmine.createSpy(),
                args;

            store.on('update', spy);
            abeRec.set('name', 'foo');
            expect(spy).toHaveBeenCalled();
            expect(spy.callCount).toBe(1);

            args = spy.mostRecentCall.args;
            expect(args[0]).toBe(store);
            expect(args[1]).toBe(abeRec);
            expect(args[2]).toBe(Ext.data.Model.EDIT);
            expect(args[3]).toEqual(['name']);
        });

        it("should fire the event on the source first, then the store", function() {
            var order = [];
            source.on('update', function() {
                order.push('source');
            });
            store.on('update', function() {
                order.push('store');
            });
            edRec.set('name', 'foo');
            expect(order).toEqual(['source', 'store']);
        });
    });   
});