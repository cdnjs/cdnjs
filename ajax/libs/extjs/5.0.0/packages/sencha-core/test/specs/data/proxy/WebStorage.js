describe("Ext.data.proxy.WebStorage", function() {
    var proxy, config;

    var fakeStorageObject = {
        items: {},
        getItem: function(key) {
            return this.items[key] || null;
        },
        setItem: function(key, value) {
            this.items[key] = value + '';
        },
        removeItem: function(key) {
            delete this.items[key];
        },
        clear: function() {
            this.items = {};
        }
    };

    beforeEach(function() {
        Ext.define('spec.User', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id',   type: 'int'},
                {name: 'name', type: 'string'},
                {name: 'age', type: 'int'}
            ]
        });
        
        Ext.define('spec.Storage', {
            extend: 'Ext.data.proxy.WebStorage',
            getStorageObject: function() {
                return fakeStorageObject;
            }    
        });
    });
    
    afterEach(function(){
        fakeStorageObject.clear();
        Ext.undefine('spec.User');
        Ext.undefine('spec.Storage');
        Ext.data.Model.schema.clear();
    });

    describe("getIds", function() {

        beforeEach(function() {
            spyOn(fakeStorageObject, 'getItem').andCallThrough();

            fakeStorageObject.setItem('wsId', "1,2,3");

            proxy = new spec.Storage({
                id: 'wsId',
                model: spec.User
            });
        });

        it("should retrieve the list of ids from the storage object", function() {
            expect(fakeStorageObject.getItem).toHaveBeenCalledWith('wsId');
        });

        it("should return an array", function() {
            expect(Ext.isArray(proxy.getIds())).toBe(true);
        });

        describe("if the id field is is not a string field", function() {
            it("should return each array item as a number", function() {
                var ids    = proxy.getIds(),
                    length = ids.length,
                    i;

                for (i = 0; i < length; i++) {
                    expect(typeof ids[i] === 'number').toBe(true);
                }
            });
        });

        describe("if the id field is a string field", function() {
            beforeEach(function() {
                spec.User = Ext.define(null, {
                    extend: 'Ext.data.Model',
                    fields: [
                        {name: 'id',   type: 'string'}
                    ]
                });

                proxy = new spec.Storage({
                    id: 'wsId',
                    model: spec.User
                });
            });
            it("should return each array item as a string", function() {
                var ids    = proxy.getIds(),
                    length = ids.length,
                    i;

                for (i = 0; i < length; i++) {
                    expect(typeof ids[i] === 'string').toBe(true);
                }
            });
        });
    });

    describe("getNextId", function() {
        beforeEach(function() {
            fakeStorageObject.setItem(proxy.getRecordCounterKey(), "3");

            proxy = new spec.Storage({
                id: 'wsId',
                model: spec.User
            });
        });

        it("should increment the counter in the storage object", function() {
            proxy.getNextId();

            expect(fakeStorageObject.getItem(proxy.getRecordCounterKey())).toEqual('4');
        });

        describe("if the id field is is not a string field", function() {
            it("should return an incremented id as a number", function() {
                expect(proxy.getNextId()).toEqual(4);
            });
        });

        describe("when the id field is a string field", function() {
            beforeEach(function() {
                spec.User = Ext.define(null, {
                    extend: 'Ext.data.Model',
                    fields: [
                        {name: 'id',   type: 'string'}
                    ]
                });

                proxy = new spec.Storage({
                    id: 'wsId',
                    model: spec.User
                });
            });

            it("should return a string", function() {
                expect(proxy.getNextId()).toEqual('4');
            });
        });
    });

    describe("instantiation with id configuration option and methods", function() {
        config = {
            id: 'User'
        };

        beforeEach(function() {
            proxy = new spec.Storage(config);
        });

        describe("instantiation", function(){
            it("should set id", function() {
                expect(proxy.getId()).toEqual('User');
            });

            it("should extend Ext.data.proxy.Client", function() {
                expect(proxy.superclass.superclass).toEqual(Ext.data.proxy.Client.prototype);
            });


            it("should test getStorageObject in constructor", function() {
               expect(proxy.getStorageObject()).toBe(fakeStorageObject); 
            });
        });

        describe("methods", function() {
            describe("getRecordKey", function() {
                var nicolas;

                beforeEach(function() {
                    Ext.define('spec.Human', {
                        extend: 'Ext.data.Model',
                        fields: [
                            {name: 'name',  type: 'string'},
                            {name: 'age',   type: 'int'},
                            {name: 'planet', type: 'string', defaultValue: 'Earth'}
                        ]
                    });
                    nicolas = new spec.Human({
                        id: 1,
                        name: 'Nicolas',
                        age : 27
                    });
                });

                afterEach(function() {
                   Ext.undefine('spec.Human');
                });

                it("should return a unique string with a string given", function() {
                    expect(proxy.getRecordKey("33")).toEqual("User-33");
                });

                it("should return a unique string with a model given", function() {
                    expect(proxy.getRecordKey(nicolas)).toEqual("User-1");
                });

            });

            describe("getRecordCounterKey", function() {
                it("should return the unique key used to store the current record counter for this proxy", function () {
                    expect(proxy.getRecordCounterKey()).toEqual("User-counter");
                });
            });

            describe("getTreeKey", function() {
                it("should return the unique key used to store the tree indicator for this proxy", function () {
                    expect(proxy.getTreeKey()).toEqual("User-tree");
                });
            });

            describe("getStorageObject", function(){
                it("should throw an error on getStorageObject", function() {
                    expect(Ext.data.proxy.WebStorage.prototype.getStorageObject).toRaiseExtError();
                });
            });
        });
    });

    describe("instantiation with tree-indicator set in storage object", function() {
        var config = {
            id: 'tree-test'
        };

        beforeEach(function() {
            fakeStorageObject.setItem(config.id + '-tree', true);
            proxy = new spec.Storage(config);
        });

        it("should set the isHierarchical flag", function() {
            expect(proxy.isHierarchical).toEqual(true);
        });
    });

    describe("destroying records after they have been added", function() {
        var store;

        beforeEach(function() {
            proxy = new spec.Storage({
                id  : 'lsTest'
            });

            store = new Ext.data.Store({
                model: spec.User,
                proxy: proxy
            });

            store.add({name: 'Ed'}, {name: 'Abe'}, {name: 'Aaron'}, {name: 'Tommy'});
            store.sync();
        });

        it("should remove a single record", function() {
            var count = store.getCount();

            store.remove(store.getAt(1));
            store.sync();

            expect(store.getCount()).toEqual(count - 1);

            expect(store.getAt(0).get('name')).toEqual('Ed');
            expect(store.getAt(1).get('name')).toEqual('Aaron');
        });

        it("should remove an array of records", function() {
            var count = store.getCount();

            store.remove([store.getAt(1), store.getAt(2)]);
            store.sync();

            expect(store.getCount()).toEqual(count - 2);

            expect(store.getAt(0).get('name')).toEqual('Ed');
            expect(store.getAt(1).get('name')).toEqual('Tommy');
        });

        it("should remove the records ids from storage", function() {
            store.remove([store.getAt(1), store.getAt(2)]);
            store.sync();

            expect(proxy.getIds()).toEqual([1,4]);
        });
    });

    describe("destroying a tree node", function() {
        var store, node1, node2, node3, node4, node5, node6;

        beforeEach(function() {
            proxy = new spec.Storage({
                id  : 'tree-test'
            });

            spec.User = Ext.define(null, {
                extend: 'Ext.data.TreeModel',
                fields: [
                    {name: 'id',   type: 'int'},
                    {name: 'name', type: 'string'}
                ],
                proxy: proxy
            });

            Ext.data.NodeInterface.decorate(spec.User);

            store = new Ext.data.TreeStore({
                model: spec.User,
                proxy: proxy,
                root: {
                    name: 'Users',
                    expanded: true,
                    id: 42
                }
            });

            node1 = new spec.User({name: 'Abe'});
            node2 = new spec.User({name: 'Sue'});
            node3 = new spec.User({name: 'Phil'});
            node4 = new spec.User({name: 'Don'});
            node5 = new spec.User({name: 'Ed'});
            node6 = new spec.User({name: 'Nico'});
            node2.appendChild([node3, node4]);
            node1.appendChild([node2, node5]);

            store.getRoot().appendChild(node1);
            store.getRoot().appendChild(node6);
            store.sync();
        });

        it("should recursively remove the node and all of its descendants", function() {
            spyOn(proxy, 'removeRecord').andCallThrough();
            node1.phantom = node2.phantom = node3.phantom = node4.phantom = node5.phantom = false;
            node1.erase();


            expect(proxy.removeRecord).toHaveBeenCalledWith(node1);
            expect(proxy.removeRecord).toHaveBeenCalledWith(node2);
            expect(proxy.removeRecord).toHaveBeenCalledWith(node3);
            expect(proxy.removeRecord).toHaveBeenCalledWith(node4);
            expect(proxy.removeRecord).toHaveBeenCalledWith(node5);
        });

        it("should remove the node and its descendants from the storage object", function() {
            node1.erase();

            expect(proxy.getRecord(1)).toBeNull();
            expect(proxy.getRecord(2)).toBeNull();
            expect(proxy.getRecord(3)).toBeNull();
            expect(proxy.getRecord(4)).toBeNull();
            expect(proxy.getRecord(5)).toBeNull();
        });
        
        it("should remove the ids for the node and its descendants", function() {
            node1.erase();

            // make sure the ids array just has one id (the record that was not part of node1's hierarchy)
            expect(proxy.getIds()).toEqual([6]);
        });

        it("should remove the node and its descendants from the cache", function() {
            node1.erase();

            expect(proxy.cache[1]).toBeUndefined();
            expect(proxy.cache[2]).toBeUndefined();
            expect(proxy.cache[3]).toBeUndefined();
            expect(proxy.cache[4]).toBeUndefined();
            expect(proxy.cache[5]).toBeUndefined();
        });
    });

    describe("adding records to the storage object", function() {
        var record, operation;

        beforeEach(function() {
            proxy = new spec.Storage({
                model: spec.User,
                id: 'someId'
            });

            spyOn(proxy, 'getNextId').andReturn(10);
            spyOn(proxy, 'setIds').andCallThrough();
            spyOn(proxy, 'getIds').andReturn([]);
            spyOn(proxy, 'setRecord').andCallThrough();
        });

        var createOperation = function() {
            operation = new Ext.data.operation.Create({
                records: [record]
            });

            spyOn(operation, 'setStarted').andCallThrough();
            spyOn(operation, 'setCompleted').andCallThrough();
            spyOn(operation, 'setSuccessful').andCallThrough();
        };

        describe("if the records are phantoms", function() {

            beforeEach(function() {
                record = new spec.User({name: 'Ed'});
                createOperation();
            });

            it("should assign the next id to the record", function() {
                proxy.create(operation);

                expect(record.getId()).toEqual(10);
            });

            it("should mark the Operation as started", function() {
                proxy.create(operation);

                expect(operation.setStarted).toHaveBeenCalled();
            });

            it("should mark the Operation as completed", function() {
                proxy.create(operation);

                expect(operation.setCompleted).toHaveBeenCalled();
            });

            it("should mark the Operation as successful", function() {
                proxy.create(operation);

                expect(operation.setSuccessful).toHaveBeenCalled();
            });

            it("should add the id to the set of all ids", function() {
                proxy.create(operation);

                expect(proxy.setIds).toHaveBeenCalledWith([10]);
            });

            it("should add the record to the storage object", function() {
                proxy.create(operation);

                expect(proxy.setRecord).toHaveBeenCalledWith(record, 10);
            });

            it("should call commit on the record", function() {
                spyOn(record, 'commit').andCallThrough();

                proxy.create(operation);

                expect(record.commit).toHaveBeenCalled();
            });

            it("should call the callback function with the records and operation", function() {
                var theOperation, records;

                operation.setCallback(function(recs, op) {
                    records = recs;
                    theOperation = op;
                });

                proxy.create(operation);

                expect(theOperation).toEqual(operation);
                expect(records).toEqual(operation.getRecords());
            });

            it("should call the callback function with the correct scope", function() {
                var theScope;

                operation.setCallback(function() {
                    theScope = this;
                });

                operation.setScope(fakeScope);

                proxy.create(operation);

                expect(theScope).toBe(fakeScope);
            });
        });

        describe("if the records are not phantoms", function() {
            beforeEach(function() {
                record = new spec.User({id: 20, name: 'Ed'});
                createOperation();
            });

            it("should add the id to the set of all ids", function() {
                proxy.create(operation);

                expect(proxy.setIds).toHaveBeenCalledWith([20]);
            });

            it("should not generate the next id", function() {
                proxy.create(operation);

                expect(proxy.getNextId).not.toHaveBeenCalled();
            });

            it("should add the record to the storage object", function() {
                proxy.create(operation);

                expect(proxy.setRecord).toHaveBeenCalledWith(record, 20);
            });
        });

        describe("if the records are decorated with NodeInterface", function() {
            beforeEach(function() {
                Ext.data.NodeInterface.decorate(spec.User);
                record = new spec.User({name: 'Phil'});
                createOperation();
            });

            it("should set the tree indicator in the storage object the first time a record is created", function() {
                proxy.create(operation);

                expect(proxy.getStorageObject().getItem(proxy.getTreeKey())).toEqual('true');
            });

            it("should set the isHierarchical flag on the proxy the first time a record is created", function() {
                proxy.create(operation);

                expect(proxy.isHierarchical).toEqual(true);
            });
        });
    });

    describe("updating existing records", function() {
        var operation, record;

        beforeEach(function() {
            proxy = new spec.Storage({
                model: spec.User,
                id: 'someId'
            });

            spyOn(proxy, 'setRecord').andCallThrough();


            record = new spec.User({id: 100, name: 'Ed'});

            operation = new Ext.data.operation.Update({
                records: [record]
            });

            spyOn(operation, 'setStarted').andCallThrough();
            spyOn(operation, 'setCompleted').andCallThrough();
            spyOn(operation, 'setSuccessful').andCallThrough();
        });

        it("should mark the Operation as started", function() {
            proxy.update(operation);

            expect(operation.setStarted).toHaveBeenCalled();
        });

        it("should mark the Operation as completed", function() {
            proxy.update(operation);

            expect(operation.setCompleted).toHaveBeenCalled();
        });

        it("should mark the Operation as successful", function() {
            proxy.update(operation);

            expect(operation.setSuccessful).toHaveBeenCalled();
        });

        it("should add the record to the storage object", function() {
            proxy.update(operation);

            expect(proxy.setRecord).toHaveBeenCalledWith(record);
        });

        it("should call commit on the record", function() {
            spyOn(record, 'commit').andCallThrough();

            proxy.update(operation);

            expect(record.commit).toHaveBeenCalled();
        });

        it("should call the callback function with the records and operation", function() {
            var theOperation, records;

            operation.setCallback(function(recs, op) {
                records = recs;
                theOperation = op;
            });

            proxy.update(operation);

            expect(theOperation).toEqual(operation);
            expect(records).toEqual(operation.getRecords());
        });

        it("should call the callback function with the correct scope", function() {
            var theScope;

            operation.setCallback(function() {
                theScope = this;
            });

            operation.setScope(fakeScope);

            proxy.update(operation);

            expect(theScope).toBe(fakeScope);
        });

        describe("if the record is not already in the storage object", function() {
            it("should add the record's id to the set of ids", function() {
                spyOn(proxy, 'setIds').andCallThrough();

                proxy.update(operation);

                expect(proxy.setIds).toHaveBeenCalledWith([100]);
            });
        });
    });

    describe("setRecord", function() {
        var record, recordKey, encodedData;

        beforeEach(function() {

            spyOn(fakeStorageObject, 'setItem').andReturn();
            spyOn(fakeStorageObject, 'removeItem').andReturn();
            
            proxy = new spec.Storage({
                model: spec.User,
                id: 'someId'
            });

            record = new spec.User({id: 100, name: 'Ed'});
            recordKey = 'someId-100';
            encodedData = 'some encoded data';

            spyOn(Ext, 'encode').andReturn(encodedData);

            spyOn(record, 'set').andCallThrough();
            spyOn(proxy, 'getRecordKey').andReturn(recordKey);
        });

        describe("if a new id is passed", function() {
            it("should set the id on the record", function() {
                proxy.setRecord(record, 20);

                expect(record.set).toHaveBeenCalledWith('id', 20, { commit: true });
            });
        });

        describe("if a new id is not passed", function() {
            it("should get the id from the record", function() {
                spyOn(record, 'getId').andCallThrough();

                proxy.setRecord(record);

                expect(record.getId).toHaveBeenCalled();
            });
        });

        it("should get the record key for the model instance", function() {
            proxy.setRecord(record);

            expect(proxy.getRecordKey).toHaveBeenCalledWith(100);
        });

        it("should remove the item from the storage object before adding it again", function() {
            proxy.setRecord(record);

            expect(fakeStorageObject.removeItem).toHaveBeenCalledWith(recordKey);
        });

        it("should add the item to the storage object", function() {
            proxy.setRecord(record);

            expect(fakeStorageObject.setItem).toHaveBeenCalledWith(recordKey, encodedData);
        });

        it("should json encode the data", function() {
            var data = Ext.clone(record.data);

            proxy.setRecord(record);

            delete data.id;

            expect(Ext.encode).toHaveBeenCalledWith(data);
        });
    });

    describe("reading", function() {
        var f, operation;

        beforeEach(function() {            
            config = {
                id: 'User',
                model: spec.User
            };

            proxy = new spec.Storage(config);
        });

        describe("if passed an id", function() {
            var fakeRecord;

            beforeEach(function() {
                fakeRecord = {id: 100, name: 'Phil'};

                spyOn(proxy, 'getRecord').andReturn(fakeRecord);

                operation = new Ext.data.operation.Read({
                    id: 100
                });
            });

            it("should attempt to get the record for the given id", function() {
                proxy.read(operation);

                expect(proxy.getRecord).toHaveBeenCalledWith(100);
            });

            it("should mark the operation successful", function() {
                spyOn(operation, 'setSuccessful').andCallThrough();

                proxy.read(operation);

                expect(operation.setSuccessful).toHaveBeenCalled();
            });

            it("should mark the operation completed", function() {
                spyOn(operation, 'setCompleted').andCallThrough();

                proxy.read(operation);

                expect(operation.setCompleted).toHaveBeenCalled();
            });

            describe("the resultSet", function() {
                var resultSet;

                beforeEach(function() {
                    operation.setCallback(function(recs, op) {
                       resultSet = op.getResultSet();
                    });
                    proxy.read(operation);
                });

                it("should contain the loaded record", function() {
                    expect(resultSet.getRecords()[0].getId()).toEqual(100);
                    expect(resultSet.getRecords()[0].get('name')).toEqual('Phil');
                });

                it("should set the correct total number of records", function() {
                    expect(resultSet.getTotal()).toEqual(1);
                });

                it("should mark itself as loaded", function() {
                    expect(resultSet.getLoaded()).toBe(true);
                });
            });
        });

        describe("if not passed an id", function() {
            var fakeRecords;

            beforeEach(function() {
                fakeStorageObject.setItem('User', '1,2,3,4');
                fakeStorageObject.setItem('User-1', '{"firstName":"Bob","lastName":"Smith","age":"2"}');
                fakeStorageObject.setItem('User-2', '{"firstName":"Joe","lastName":"Smith","age":"50"}');
                fakeStorageObject.setItem('User-3', '{"firstName":"Tim","lastName":"Jones","age":"41"}');
                fakeStorageObject.setItem('User-4', '{"firstName":"Jim","lastName":"Smith","age":"33"}');

                operation = new Ext.data.operation.Read();
            });

            it("should mark the operation successful", function() {
                spyOn(operation, 'setSuccessful').andCallThrough();

                proxy.read(operation);

                expect(operation.setSuccessful).toHaveBeenCalled();
            });

            it("should mark the operation completed", function() {
                spyOn(operation, 'setCompleted').andCallThrough();

                proxy.read(operation);

                expect(operation.setCompleted).toHaveBeenCalled();
            });
            describe("the resultSet", function() {
                var resultSet;

                beforeEach(function() {
                    operation.setCallback(function(recs, op) {
                        resultSet = op.getResultSet();
                    });
                    proxy.read(operation);
                });

                it("should contain the loaded records", function() {
                    expect(resultSet.getRecords()[0].get('firstName')).toBe('Bob');
                    expect(resultSet.getRecords()[1].get('firstName')).toBe('Joe');
                    expect(resultSet.getRecords()[2].get('firstName')).toBe('Tim');
                    expect(resultSet.getRecords()[3].get('firstName')).toBe('Jim');
                });

                it("should contain the correct number of loaded records", function() {
                    expect(resultSet.getRecords().length).toBe(4);
                });

                it("should set the correct total number of records", function() {
                    expect(resultSet.getTotal()).toEqual(4);
                });

                it("should mark itself as loaded", function() {
                    expect(resultSet.getLoaded()).toBe(true);
                });

                it("should cache the records", function() {
                    expect(proxy.cache[1].firstName).toBe('Bob');
                    expect(proxy.cache[2].firstName).toBe('Joe');
                    expect(proxy.cache[3].firstName).toBe('Tim');
                    expect(proxy.cache[4].firstName).toBe('Jim');
                });
            });

            it("should respect filters on the Operation", function() {
                var records;

                operation = new Ext.data.operation.Read({
                    filters: [
                        new Ext.util.Filter({
                            property: 'lastName',
                            value: 'Smith'
                        }),
                        new Ext.util.Filter({
                            filterFn: function(record) {
                                return record.get('age') < 40;
                            }
                        })
                    ],
                    callback: function(r) {
                        records = r;
                    }
                });

                proxy.read(operation);

                expect(records.length).toBe(2);
                expect(records[0].get('firstName')).toBe('Bob');
                expect(records[1].get('firstName')).toBe('Jim');
            });

            it("should respect start and limit on the Operation", function() {
                var records;

                operation = new Ext.data.operation.Read({
                    start: 1,
                    limit: 2,
                    callback: function(r) {
                        records = r;
                    }
                });

                proxy.read(operation);

                expect(records.length).toBe(2);
                expect(records[0].get('firstName')).toBe('Joe');
                expect(records[1].get('firstName')).toBe('Tim');
            });

            it("should respect sorters on the Operation", function() {
                var records;

                operation = new Ext.data.operation.Read({
                    sorters: [
                        new Ext.util.Sorter({
                            property: 'lastName',
                            root: 'data'
                        }),
                        new Ext.util.Sorter({
                            sorterFn: function(record1, record2) {
                                return record1.get('age') - record2.get('age');
                            }
                        })
                    ],
                    callback: function(r) {
                        records = r;
                    }
                });

                proxy.read(operation);

                expect(records.length).toBe(4);
                expect(records[0].get('firstName')).toBe('Tim');
                expect(records[1].get('firstName')).toBe('Bob');
                expect(records[2].get('firstName')).toBe('Jim');
                expect(records[3].get('firstName')).toBe('Joe');
            });

            it("should apply sorters before filters", function() {
                var records;

                operation = new Ext.data.operation.Read({
                    sorters: [
                        new Ext.util.Sorter({
                            property: 'lastName',
                            root: 'data'
                        }),
                        new Ext.util.Sorter({
                            sorterFn: function(record1, record2) {
                                return record1.get('age') - record2.get('age');
                            }
                        })
                    ],
                    filters: [
                        new Ext.util.Filter({
                            property: 'lastName',
                            value: 'Smith'
                        }),
                        new Ext.util.Filter({
                            filterFn: function(record) {
                                return record.get('age') < 40;
                            }
                        })
                    ],
                    callback: function(r) {
                        records = r;
                    }
                });

                proxy.read(operation);

                expect(records.length).toBe(2);
                expect(records[0].get('firstName')).toBe('Bob');
                expect(records[1].get('firstName')).toBe('Jim');
            });

            it("should apply sorters before start and limit", function() {
                var records;

                operation = new Ext.data.operation.Read({
                    sorters: [
                        new Ext.util.Sorter({
                            property: 'lastName',
                            root: 'data'
                        }),
                        new Ext.util.Sorter({
                            sorterFn: function(record1, record2) {
                                return record1.get('age') - record2.get('age');
                            }
                        })
                    ],
                    start: 1,
                    limit: 2,
                    callback: function(r) {
                        records = r;
                    }
                });

                proxy.read(operation);

                expect(records.length).toBe(2);
                expect(records[0].get('firstName')).toBe('Bob');
                expect(records[1].get('firstName')).toBe('Jim');
            });
        });

        describe("the tree indicator flag is set", function() {
            beforeEach(function() {
                proxy = new spec.Storage({
                    model: spec.User,
                    id: 'tree-test'
                });

                Ext.data.NodeInterface.decorate(spec.User);

                proxy.isHierarchical = true;

                operation = new Ext.data.operation.Read({
                });

            });
            it("should get tree data", function() {
                spyOn(proxy, 'getTreeData').andReturn([new spec.User({id: 1, name: 'Phil'})]);

                proxy.read(operation);

                expect(proxy.getTreeData).toHaveBeenCalled();
            });
        });

        describe("getting tree data from the storage object", function() {
            var records;

            beforeEach(function() {
                proxy = new spec.Storage({
                    model: spec.User,
                    id: 'tree-test'
                });

                Ext.data.NodeInterface.decorate(spec.User);

                // fake out some data in the storage object
                fakeStorageObject.setItem('tree-test', '1,2,3,4,5,6');
                fakeStorageObject.setItem('tree-test-tree', true);
                fakeStorageObject.setItem('tree-test-counter', '6');
                fakeStorageObject.setItem('tree-test-1', '{"name":"Phil","index":2,"leaf":true}');
                fakeStorageObject.setItem('tree-test-2', '{"name":"Don","index":1,"leaf":false}');
                fakeStorageObject.setItem('tree-test-3', '{"name":"Evan","parentId":2,"index":1,"leaf":true}');
                fakeStorageObject.setItem('tree-test-4', '{"name":"Nige","parentId":2,"index":0,"leaf":false}');
                fakeStorageObject.setItem('tree-test-5', '{"name":"Thomas","parentId":4,"index":0,"leaf":false}');
                fakeStorageObject.setItem('tree-test-6', '{"name":"Brian","index":0,"leaf":false}');
            });
            it("should return an array of records", function() {
                records = proxy.getTreeData();

                expect(Ext.isArray(records)).toBe(true);
            });

            it("should return 3 records", function() {
                records = proxy.getTreeData();

                expect(records.length).toBe(3);
            });

            it("should have the correct root level nodes", function() {
                records = proxy.getTreeData();

                expect(records[0].get('name')).toEqual('Phil');
                expect(records[1].get('name')).toEqual('Don');
                expect(records[2].get('name')).toEqual('Brian');
            });

            it("should call getRecord with each record id", function() {
                spyOn(proxy, 'getRecord').andCallThrough();

                proxy.getTreeData();

                expect(proxy.getRecord).toHaveBeenCalledWith(1);
                expect(proxy.getRecord).toHaveBeenCalledWith(2);
                expect(proxy.getRecord).toHaveBeenCalledWith(3);
                expect(proxy.getRecord).toHaveBeenCalledWith(4);
                expect(proxy.getRecord).toHaveBeenCalledWith(5);
                expect(proxy.getRecord).toHaveBeenCalledWith(6);
            });

            it("should convert the records into a heirarchical structure", function() {
                records = proxy.getTreeData();

                expect(records[1].data.children[0].name).toEqual('Evan');
                expect(records[1].data.children[1].name).toEqual('Nige');
                expect(records[1].data.children[1].children[0].name).toEqual('Thomas');
            });

            it("should cache the records", function() {
                proxy.getTreeData();

                expect(proxy.cache[1].name).toEqual('Phil');
                expect(proxy.cache[2].name).toEqual('Don');
                expect(proxy.cache[3].name).toEqual('Evan');
                expect(proxy.cache[4].name).toEqual('Nige');
                expect(proxy.cache[5].name).toEqual('Thomas');
                expect(proxy.cache[6].name).toEqual('Brian');
            });

            it("should set loaded to true on non-leaf nodes that have no children", function() {
                expect(records[2].isLoaded()).toBe(true);
                expect(records[1].data.children[1].children[0].loaded).toBe(true);
            });
        });

    });

    describe("clearing", function() {
        beforeEach(function() {
            proxy = new spec.Storage({
                model: spec.User,
                id: 'clear-test'
            });

            fakeStorageObject.setItem('clear-test', '1,2,3');
            fakeStorageObject.setItem('clear-test-tree', true);
            fakeStorageObject.setItem('clear-test-counter', '6');
            fakeStorageObject.setItem('clear-test-1', '{"name":"Phil"}');
            fakeStorageObject.setItem('clear-test-2', '{"name":"Thomas"}');
            fakeStorageObject.setItem('clear-test-3', '{"name":"Don"}');

            proxy.clear();
        });
        
        it("should remove all the records", function() {
            expect(fakeStorageObject.getItem('clear-test-1')).toBeNull();
            expect(fakeStorageObject.getItem('clear-test-2')).toBeNull();
            expect(fakeStorageObject.getItem('clear-test-3')).toBeNull();
        });

        it("should remove the record counter", function() {
            expect(fakeStorageObject.getItem('clear-test-counter')).toBeNull();
        });

        it("should remove the tree flag", function() {
            expect(fakeStorageObject.getItem('clear-test-tree')).toBeNull();
        });

        it("should remove the ids", function() {
            expect(fakeStorageObject.getItem('clear-test')).toBeNull();
        });

        it("should clear the cache", function() {
            expect(proxy.cache).toEqual({});
        });
    });
});
