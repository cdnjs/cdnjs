describe("Ext.data.TreeStore", function() {
    var store, 
        loadStore,
        dummyData,
        NodeModel = Ext.define(null, {
            extend: 'Ext.data.Model',
            fields: ['name'],
            proxy: {
                type: 'ajax',
                url: 'foo.json',
                reader: {
                    type: 'json'
                }
            }
        }),
        TaskModel = Ext.define(null, {
            extend: 'Ext.data.Model',
            idProperty : 'id',
            fields: [
                {name: 'id',       type: 'int', allowNull: true},
                {name: 'task',     type: 'string'},
                {name: 'duration', type: 'string'}
            ]
        });

    function spyOnEvent(object, eventName, fn) {
        var obj = {
            fn: fn || Ext.emptyFn
        },
        spy = spyOn(obj, "fn");
        object.addListener(eventName, obj.fn);
        return spy;
    };

    beforeEach(function() {
        dummyData = {
            success: true,
            children: [{
                    id: 1,name: "aaa"
                },{
                    id: 2,name: "bbb", 
                    children: [{
                            id: 3, 
                            name: "ccc"
                        },{
                            id: 4, name: "ddd", 
                            children: [{
                                id: 5, 
                                name: "eee",
                                leaf: true
                            }]
                        }]
                },{
                    id: 6, 
                    name: "fff", 
                    children: [{id: 7, 
                        name: "ggg"
                    }]
                }]
        };

        MockAjaxManager.addMethods();   

        var mockComplete = function(responseText, status) {
            Ext.Ajax.mockComplete({
                status: status || 200,
                responseText: responseText || 'response'
            });
        };

        loadStore = function(store, options) {
            store.load(options);
            mockComplete(Ext.encode(dummyData));
        };

    });
    
    afterEach(function() {
        MockAjaxManager.removeMethods();
    });
 
    describe("loading data", function() {
        describe("when loading asynchronously from a url", function() {
           describe("if the root node is expanded", function() {
                beforeEach(function() {
                    spyOn(Ext.data.TreeStore.prototype, 'load').andCallFake(function() {});
                    
                    store = Ext.create('Ext.data.TreeStore', {
                        model: NodeModel,
                        root: {
                            expanded: true,
                            id: 0,
                            name: 'Root Node'
                        }
                    });
                });
                
                it("should load the TreeStore automatically", function() {
                    expect(store.load).toHaveBeenCalled();
                });
            });
            
            describe("if the root node is not expanded", function() {
                beforeEach(function() {
                    store = Ext.create('Ext.data.TreeStore', {
                        model: NodeModel,
                        autoLoad: false,
                        root: {
                            expanded: false,
                            id: 0,
                            name: 'Root Node'
                        }
                    });
                });
                
                it("should not be loading before load is called", function() {
                    expect(store.isLoading()).toBe(false);
                });

                it("should be loading while the request is still in progress", function() {
                    store.load();
                    expect(store.isLoading()).toBe(true);
                });

                it("should not be loading after the request has finished", function() {
                    loadStore(store);

                    expect(store.isLoading()).toBe(false);
                });
                
                describe("if autoLoad is set to true", function() {
                    beforeEach(function() {
                        spyOn(Ext.data.TreeStore.prototype, 'load').andCallFake(function() {});

                        store = Ext.create('Ext.data.TreeStore', {
                            model: NodeModel,
                            autoLoad: true,
                            root: {
                                expanded: false,
                                id: 0,
                                name: 'Root Node'
                            }
                        });
                    });

                    it("should load the TreeStore automatically", function() {
                        expect(store.load).toHaveBeenCalled();
                    });
                });
            });

            describe("when reloading a store that already contains records", function() {
                beforeEach(function() {
                    store = Ext.create('Ext.data.TreeStore', {
                        model: NodeModel,
                        autoLoad: false,
                        root: {
                            expanded: false,
                            id: 0,
                            name: 'Root Node'
                        }
                    });

                    store.fillNode(store.getRootNode(), store.getProxy().getReader().readRecords(dummyData.children).getRecords());
                });

                describe("if records have been removed from the store", function() {
                    beforeEach(function() {
                        store.getNodeById(1).remove();
                        store.getNodeById(5).remove();
                        store.getNodeById(4).remove();
                    });
                    describe("if the node being loaded is the root node", function() {
                        beforeEach(function() {
                            loadStore(store);
                        });
                        it("should reset the store's removed array", function() {
                            expect(store.getRemovedRecords().length).toBe(0);
                        });
                    });
                    describe("if the node being loaded is not the root node", function() {
                        var removed;

                        beforeEach(function() {
                            loadStore(store, {node: store.getNodeById(2)});
                        });
                        it("should only remove records from the removed array that were previously descendants of the node being reloaded", function() {
                            removed = store.getRemovedRecords();

                            expect(removed.length).toBe(1);
                            expect(removed[0].getId()).toBe(1);
                        });
                    });
                    describe("if clearRemovedOnLoad is false", function() {
                        var removed;

                        beforeEach(function() {
                            store.clearRemovedOnLoad = false;
                            loadStore(store);
                        });
                        afterEach(function() {
                            store.clearRemovedOnLoad = true;
                        });
                        it("should not alter the store's removed array", function() {
                            removed = store.getRemovedRecords();

                            expect(removed.length).toBe(3);
                            expect(removed[0].getId()).toBe(1);
                            expect(removed[1].getId()).toBe(5);
                            expect(removed[2].getId()).toBe(4);
                        });
                    });

                });

            });

            describe("when the records in the response data have an index field", function() {
                beforeEach(function() {
                    dummyData = {
                        success: true,
                        children: [{
                                id: 1, 
                                name: "aaa", 
                                index: 2
                            },{
                                id: 2, 
                                name: "bbb", 
                                index: 0, 
                                children: [{
                                    id: 3, 
                                    name: "ccc", 
                                    index: 1
                                },{
                                    id: 4, 
                                    name: "ddd", 
                                    index: 0
                                }],
                                expanded: true
                            },{
                                id: 5, 
                                name: "eee", 
                                index: 1
                        }]
                    };

                    store = Ext.create('Ext.data.TreeStore', {
                        model: NodeModel,
                        root: {
                            expanded: true,
                            id: 0,
                            name: 'Root Node'
                        }
                    });

                    loadStore(store);
                });

                it("should sort the root level nodes by index", function() {
                    // use getRootNode (as opposed to new getter getRoot) to test backward compatibilty.
                    expect(store.getRootNode().childNodes[0].getId()).toBe(2);
                    expect(store.getRootNode().childNodes[1].getId()).toBe(5);
                    expect(store.getRootNode().childNodes[2].getId()).toBe(1);
                });

                it("should sort descendants by index", function() {
                    expect(store.getNodeById(2).firstChild.getId()).toBe(4);
                    expect(store.getNodeById(2).lastChild.getId()).toBe(3);
                });

                it("should sort folders first, then in index order", function() {
                    expect(store.getAt(0).getId()).toBe(2);
                    expect(store.getAt(1).getId()).toBe(4);
                    expect(store.getAt(2).getId()).toBe(3);
                    expect(store.getAt(3).getId()).toBe(5);
                    expect(store.getAt(4).getId()).toBe(1);
                });
            });
        });
        
        describe("clearOnLoad", function(){
            
            beforeEach(function(){
                store = Ext.create('Ext.data.TreeStore', {
                    model: NodeModel,
                    root: {
                        expanded: true,
                        id: 0,
                        name: 'Root Node'
                    }
                });
            });
            
            it("should remove existing nodes with clearOnLoad: true", function(){
                dummyData = {
                    children: []
                };
                var root = store.getRootNode();
                root.appendChild({
                    id: 'node1',
                    text: 'A'
                });
                
                root.appendChild({
                    id: 'node2',
                    text: 'B'
                });
                loadStore(store);
                expect(store.getRootNode().childNodes.length).toBe(0);
            });
            
            it("should leave existing nodes with clearOnLoad: false", function(){
                store.clearOnLoad = false;
                dummyData = {
                    children: []
                };    
                var root = store.getRootNode();
                root.appendChild({
                    id: 'node1',
                    text: 'A'
                });
                
                root.appendChild({
                    id: 'node2',
                    text: 'B'
                });
                loadStore(store);
                expect(store.getRootNode().childNodes.length).toBe(2);
            });
            
            it("should ignore dupes with clearOnLoad: false", function(){
                store.clearOnLoad = false;
                dummyData = {
                    children: [{
                        id: 'node1',
                        text: 'A'
                    }, {
                        id: 'node3',
                        text: 'C'
                    }]
                };    
                var root = store.getRootNode();
                root.appendChild({
                    id: 'node1',
                    text: 'A'
                });
                
                root.appendChild({
                    id: 'node2',
                    text: 'B'
                });
                loadStore(store);
                expect(store.getRootNode().childNodes.length).toBe(3);
            });
        });
    });

    describe("saving data", function() {
        var record, records, syncSpy;

        beforeEach(function() {
            store = Ext.create('Ext.data.TreeStore', {
                model: NodeModel,
                root: {
                    expanded: true,
                    name: 'Root Node'
                }
            });

            loadStore(store);

            syncSpy = spyOn(store, 'sync').andReturn();
        });

        describe("creating records", function() {
            describe("appending a single node", function() {
                beforeEach(function() {
                    record = new NodeModel({name: 'Phil'});
                    store.getRootNode().appendChild(record);
                });

                it("should add the node to getNewRecords", function() {
                    records = store.getNewRecords();
                    expect(records.length).toBe(1);
                    expect(records[0]).toBe(record);
                });

                it("should not add anything to getUpdatedRecords", function() {
                    expect(store.getUpdatedRecords().length).toBe(0);
                });

                it("should not sync the store", function() {
                    expect(syncSpy).not.toHaveBeenCalled();
                });
            });

            describe("inserting a single node", function() {
                beforeEach(function() {
                    record = new NodeModel({name: 'Phil'});
                    store.getNodeById(2).insertBefore(record, store.getNodeById(4));
                });

                it("should add the node to getNewRecords", function() {
                    records = store.getNewRecords();
                    expect(records.length).toBe(1);
                    expect(records[0]).toBe(record);
                });

                it("should not add any records to getUpdatedRecords", function() {
                    expect(store.getUpdatedRecords().length).toBe(0);
                });

                it("should not sync the store", function() {
                    expect(syncSpy).not.toHaveBeenCalled();
                });
            });

            describe("appending and inserting multiple nodes", function() {
                var record1, record2, record3;

                beforeEach(function() {
                    record1 = new NodeModel({name: '1'});
                    record2 = new NodeModel({name: '2'});
                    record3 = new NodeModel({name: '3'});


                    store.getRootNode().appendChild(record1);
                    store.getNodeById(2).insertBefore(record2, store.getNodeById(4));
                    record2.appendChild(record3);
                });

                it("should add the nodes to getNewRecords", function() {
                    var newRecords = store.getNewRecords();
                    expect(newRecords.length).toBe(3);
                    expect(Ext.Array.contains(newRecords, record1)).toBe(true);
                    expect(Ext.Array.contains(newRecords, record2)).toBe(true);
                    expect(Ext.Array.contains(newRecords, record3)).toBe(true);
                });

                it("should not add any records to getUpdatedRecords", function() {
                    expect(store.getUpdatedRecords().length).toBe(0);
                });

                it("should not sync the store", function() {
                    expect(syncSpy).not.toHaveBeenCalled();
                });
            });

            describe("when the index field is persistent", function() {
                beforeEach(function() {
                    NodeModel.getField('index').persist = true;
                });
                afterEach(function() {
                    NodeModel.getField('index').persist = false;
                });

                describe("appending a single node", function() {
                    beforeEach(function() {
                        record = new NodeModel({name: 'Phil'});
                        store.getRootNode().appendChild(record);
                    });

                    it("should add the node to getNewRecords", function() {
                        records = store.getNewRecords();
                        expect(records.length).toBe(1);
                        expect(records[0]).toBe(record);
                    });

                    it("should not add any records to getUpdatedRecords", function() {
                        expect(store.getUpdatedRecords().length).toBe(0);
                    });
                });

                describe("inserting a single node", function() {
                    beforeEach(function() {
                        record = new NodeModel({name: 'Phil'});
                        store.getNodeById(2).insertBefore(record, store.getNodeById(3));
                    });

                    it("should add the node to getNewRecords", function() {
                        records = store.getNewRecords();
                        expect(records.length).toBe(1);
                        expect(records[0]).toBe(record);
                    });

                    it("should add all of its sibling nodes that come after the insertion point to getUpdatedRecords", function() {
                        records = store.getUpdatedRecords();
                        expect(records.length).toBe(2);
                        expect(Ext.Array.contains(records, store.getNodeById(3))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(4))).toBe(true);
                    });
                });
            });

            describe("when autoSync is true", function() {
                beforeEach(function() {
                    store.autoSync = true;
                });

                describe("appending a single node", function() {
                    beforeEach(function() {
                        record = new NodeModel({name: 'Phil'});
                        store.getRootNode().appendChild(record);
                    });

                    it("should sync the store", function() {
                        expect(syncSpy.callCount).toBe(1);
                    });
                });

                describe("inserting a single node", function() {
                    beforeEach(function() {
                        record = new NodeModel({name: 'Phil'});
                        store.getNodeById(2).insertBefore(record, store.getNodeById(4));
                    });

                    it("should sync the store", function() {
                        expect(syncSpy.callCount).toBe(1);
                    });
                });
            });
        });

        describe("updating records", function() {
            describe("updating multiple records", function() {
                beforeEach(function() {
                    store.getNodeById(2).set('name', '222');
                    store.getNodeById(3).set('name', '333');
                });

                it("should add the nodes to getUpdatedRecords", function() {
                    records = store.getUpdatedRecords();
                    expect(records.length).toBe(2);
                    expect(Ext.Array.contains(records, store.getNodeById(2))).toBe(true);
                    expect(Ext.Array.contains(records, store.getNodeById(3))).toBe(true);
                });

                it("should not sync the store", function() {
                    expect(syncSpy).not.toHaveBeenCalled();
                });
            });

            describe("moving records", function() {
                describe("within the same parent node", function() {
                    beforeEach(function() {
                        store.getRootNode().insertBefore(store.getNodeById(6), store.getNodeById(1));
                    });

                    it("should not add any records to getUpdatedRecords", function() {
                        expect(store.getUpdatedRecords().length).toBe(0);
                    });

                    it("should not sync the store", function() {
                        expect(syncSpy).not.toHaveBeenCalled();
                    });
                });

                describe("to a different parent node", function() {
                    beforeEach(function() {
                        store.getNodeById(4).insertBefore(store.getNodeById(1), store.getNodeById(5));
                    });

                    it("should add the node to getUpdatedRecords", function() {
                        records = store.getUpdatedRecords();
                        expect(records.length).toBe(1);
                        expect(records[0]).toBe(store.getNodeById(1));
                    });

                    it("should not sync the store", function() {
                        expect(syncSpy).not.toHaveBeenCalled();
                    });
                });
            });

            describe("moving records when the index field is persistent", function() {
                beforeEach(function() {
                    NodeModel.getField('index').persist = true;
                });
                afterEach(function() {
                    NodeModel.getField('index').persist = false;
                });

                describe("within the same parent node", function() {
                    beforeEach(function() {
                        store.getRootNode().insertBefore(store.getNodeById(6), store.getNodeById(1));
                    });

                    it("should add the node and all sibling nodes after it to getUpdatedRecords", function() {
                        records = store.getUpdatedRecords();
                        expect(records.length).toBe(3);
                        expect(Ext.Array.contains(records, store.getNodeById(1))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(2))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(6))).toBe(true);
                    });
                });

                describe("to a different parent node", function() {
                    beforeEach(function() {
                        store.getNodeById(4).insertBefore(store.getNodeById(1), store.getNodeById(5));
                    });

                    it("should add the node, all sibling nodes after it's insertion point, and all siblings after its removal point to getUpdatedRecords", function() {
                        records = store.getUpdatedRecords();
                        expect(records.length).toBe(4);
                        expect(Ext.Array.contains(records, store.getNodeById(1))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(2))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(5))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(6))).toBe(true);
                    });
                });
            });

            describe("moving records when autoSync is true", function() {
                beforeEach(function() {
                    store.autoSync = true;
                });

                describe("within the same parent node", function() {
                    beforeEach(function() {
                        store.getRootNode().insertBefore(store.getNodeById(6), store.getNodeById(1));
                    });

                    it("should not sync the store", function() {
                        expect(syncSpy).not.toHaveBeenCalled();
                    });
                });

                describe("to a different parent node", function() {
                    beforeEach(function() {
                        store.getNodeById(4).insertBefore(store.getNodeById(1), store.getNodeById(5));
                    });

                    it("should sync the store", function() {
                        expect(syncSpy.callCount).toBe(1);
                    });
                });
                
            });
        });

        describe("removing records", function() {
            describe("removing a single record", function() {
                beforeEach(function() {
                    record = store.getNodeById(1).remove();
                });

                it("should add the node to getRemovedRecords", function() {
                    records = store.getRemovedRecords();
                    expect(records.length).toBe(1);
                    expect(records[0]).toBe(record);
                });

                it("should not add any records to getUpdatedRecords", function() {
                    expect(store.getUpdatedRecords().length).toBe(0);
                });

                it("should not sync the store", function() {
                    expect(syncSpy).not.toHaveBeenCalled();
                });
                
                it("should not add phantom records to the removed collection", function(){
                    var node = new NodeModel(),
                        root = store.getRootNode();
                        
                    root.appendChild(node);
                    root.removeChild(node);
                    expect(Ext.Array.contains(store.getRemovedRecords(), node)).toBe(false); 
                });
            });

            describe("removing multiple records", function() {
                var record2;

                beforeEach(function() {
                    record = store.getNodeById(1).remove();
                    record2 = store.getNodeById(4).remove();
                });

                it("should add the nodes to getRemovedRecords", function() {
                    records = store.getRemovedRecords();
                    expect(records.length).toBe(2);
                    expect(Ext.Array.contains(records, record)).toBe(true);
                    expect(Ext.Array.contains(records, record2)).toBe(true);
                });

                it("should not add any records to getUpdatedRecords", function() {
                    expect(store.getUpdatedRecords().length).toBe(0);
                });

                it("should not sync the store", function() {
                    expect(syncSpy).not.toHaveBeenCalled();
                });
            });


            describe("when the index field is persistent", function() {
                beforeEach(function() {
                    NodeModel.getField('index').persist = true;
                });
                afterEach(function() {
                    NodeModel.getField('index').persist = false;
                });

                describe("removing a single record", function() {
                    beforeEach(function() {
                        record = store.getNodeById(1).remove();
                    });

                    it("should add the node to getRemovedRecords", function() {
                        records = store.getRemovedRecords();
                        expect(records.length).toBe(1);
                        expect(records[0]).toBe(record);
                    });

                    it("should add all siblings after the node's removal point to getUpdatedRecords", function() {
                        records = store.getUpdatedRecords();
                        expect(records.length).toBe(2);
                        expect(Ext.Array.contains(records, store.getNodeById(2))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(6))).toBe(true);
                    });
                });
            });

            describe("when autoSync is true", function() {
                beforeEach(function() {
                    store.autoSync = true;
                });

                describe("removing a single record", function() {
                    beforeEach(function() {
                        store.getNodeById(1).remove();
                    });

                    it("should sync the store", function() {
                        expect(syncSpy.callCount).toBe(1);
                    });
                });
            });
        });

        describe("sorting", function() {
            var sortByNameDesc = function(node1, node2) {
                var name1 = node1.data.name,
                    name2 = node2.data.name;

                return name1 < name2 ? 1 : node1 === node2 ? 0 : -1;
            };

            describe("when sorting recursively", function() {
                beforeEach(function() {
                    store.getRootNode().sort(sortByNameDesc, true);
                });

                it("should not add any records to getUpdatedRecords", function() {
                    expect(store.getUpdatedRecords().length).toBe(0);
                });
            });

            describe("when sorting non-recursively", function() {
                beforeEach(function() {
                    store.getRootNode().sort(sortByNameDesc);
                });

                it("should not add any records to getUpdatedRecords", function() {
                    expect(store.getUpdatedRecords().length).toBe(0);
                });
            });

            describe("when the index field is persistent and autoSync is true", function() {
                beforeEach(function() {
                    NodeModel.getField('index').persist = true;
                    store.autoSync = true;
                });
                afterEach(function() {
                    NodeModel.getField('index').persist = false;
                });

                describe("when sorting recursively", function() {
                    beforeEach(function() {
                        store.getRootNode().sort(sortByNameDesc, true);
                    });

                    it("should add all nodes at all levels that had an index change to getUpdatedRecords", function() {
                        records = store.getUpdatedRecords();
                        expect(records.length).toBe(4);
                        expect(Ext.Array.contains(records, store.getNodeById(1))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(3))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(4))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(6))).toBe(true);
                    });

                    it("should sync the store", function() {
                        expect(syncSpy.callCount).toBe(1);
                    });
                });

                describe("when sorting non-recursively", function() {
                    beforeEach(function() {
                        store.getRootNode().sort(sortByNameDesc);
                    });

                    it("should add all nodes at depth 1 that had an index change to getUpdatedRecords", function() {
                        records = store.getUpdatedRecords();
                        expect(records.length).toBe(2);
                        expect(Ext.Array.contains(records, store.getNodeById(1))).toBe(true);
                        expect(Ext.Array.contains(records, store.getNodeById(6))).toBe(true);
                    });

                    it("should sync the store", function() {
                        expect(syncSpy.callCount).toBe(1);
                    });
                });
            });
        });
    });
    
        describe('Loading TreeStore using root config', function() {
        it('should load the root nodes children using Proxy\'s "root" config', function() {
            var store = Ext.create('Ext.data.TreeStore', {
                root: {
                    expanded: true,
                    CHILDREN: [
                        { text: "detention", leaf: true },
                        { text: "homework", expanded: true, CHILDREN: [
                            { text: "book report", leaf: true },
                            { text: "alegrbra", leaf: true}
                        ] },
                        { text: "buy lottery tickets", leaf: true }
                    ]
                },
                proxy: {
                    type: "memory",
                    reader: {
                        type: "json",
                        root: "CHILDREN"
                    }
                }
            });
            var cn = store.getRootNode().childNodes;
            expect(cn.length).toBe(3);
            expect(cn[0].childNodes.length).toBe(0);
            expect(cn[1].childNodes.length).toBe(2);
            expect(cn[2].childNodes.length).toBe(0);
        });
    });
    
    describe("default node id", function() {
        it('Should use generate an ID if the idProperty is null in the incoming data', function() {
            store = Ext.create('Ext.data.TreeStore', {
                model: TaskModel,
                defaultRootId: null,
                root : {
                }
            });
            expect(store.getRootNode().getId()).not.toBeNull();
        });
        it('Should use "root" as the defaultRootId, and parse that according to the idProperty field type', function() {
            store = Ext.create('Ext.data.TreeStore', {
                model: TaskModel,
                root : {
                }
            });
            expect(isNaN(store.getRootNode().getId())).toBe(true);
        });

        it('Should use the configured defaultRootId, and parse that according to the idProperty field type', function() {
            store = Ext.create('Ext.data.TreeStore', {
                model: TaskModel,
                defaultRootId: -1,
                root : {
                }
            });
            expect(store.getRootNode().getId()).toBe(-1);
        });
    });
    
    describe('moving root node between trees', function() {
        it('should move root and all descendants from source tree into destination tree', function() {
            var store = Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true, 
                        children: [{
                            text: "Test",
                            leaf: true,
                            id: 'testId'
                        }]
                    }
                }),
                rootNode = store.getRootNode(),
                childNode = rootNode.firstChild,
                store2 = Ext.create('Ext.data.TreeStore');

            // TreeStore set up as expected
            expect(rootNode.rootOf === store.tree).toBe(true);
            expect(store.getNodeById('testId') === childNode).toBe(true);

            // Move the root to a new TreeStore and check it's set up as expected.
            store2.setRootNode(store.getRootNode());
            expect(rootNode.rootOf === store2.tree).toBe(true);
            expect(store2.getRootNode() === rootNode).toBe(true);
            expect(store2.getNodeById('testId') === childNode).toBe(true);

            // Child node must not be registered with the old TreeStore
            expect(store.getNodeById('testId')).toBeFalsy();

            // Old TreeStore must not have a root
            expect(store.getRootNode()).toBeFalsy();
        });
    });

    describe('events', function() {

        var spy,
            root,
            newNode,
            removedNode,
            firstChild,
            spyArgs;

        beforeEach(function() {
            store = new Ext.data.TreeStore({
                root: {
                    text: 'Root 1',
                    expanded: true,
                    children: [{
                        text: 'Child 1',
                        leaf: true
                    }, {
                        text: 'Child 2',
                        leaf: true
                    }, {
                        text: 'Child 3',
                        leaf: true
                    }, {
                        text: 'Child 4',
                        leaf: true
                    }]
                }
            });
            root = store.getRootNode();
        });

        it('should fire insert event', function() {

            // Node events are NOT bubbled up to the TreeStore level, only as far as the root
            spy = spyOnEvent(root, "insert").andCallThrough();
            firstChild = root.firstChild;
            newNode = root.insertBefore({
                text: 'New First'
            }, firstChild);
            spyArgs = spy.calls[0].args;
            expect(spy.calls.length).toBe(1);
            expect(spyArgs[0]).toBe(root);
            expect(spyArgs[1]).toBe(newNode);
            expect(spyArgs[2]).toBe(firstChild);
        });

        it('should fire append event', function() {

            // Node events are NOT bubbled up to the TreeStore level, only as far as the root
            spy = spyOnEvent(root, "append").andCallThrough();
            newNode = root.appendChild({
                text: 'New Last'
            });
            spyArgs = spy.calls[0].args;
            expect(spy.calls.length).toBe(1);
            expect(spyArgs[0]).toBe(root);
            expect(spyArgs[1]).toBe(newNode);
            expect(spyArgs[2]).toBe(4);
        });

        it('should fire remove event', function() {

            // Node events are NOT bubbled up to the TreeStore level, only as far as the root
            spy = spyOnEvent(root, "remove").andCallThrough();
            removedNode = root.removeChild(root.firstChild);
            spyArgs = spy.calls[0].args;
            expect(spy.calls.length).toBe(1);
            expect(spyArgs[0]).toBe(root);
            expect(spyArgs[1]).toBe(removedNode);
            expect(spyArgs[2]).toBe(false);
        });

        it('should fire update event', function() {
            spy = spyOnEvent(store, "update").andCallThrough();
            root.firstChild.set('text', 'New Text');
            spyArgs = spy.calls[0].args;
            expect(spy.calls.length).toBe(1);
            expect(spyArgs[0]).toBe(store);
            expect(spyArgs[1]).toBe(root.firstChild);
            expect(spyArgs[2]).toBe("edit");
            expect(spyArgs[3]).toEqual(["text"]);
        });

        describe('event ordering', function() {
            it('should fire events in the correct order', function() {
                store = new Ext.data.TreeStore({
                    root: {
                        text: 'Root 1',
                        expanded: true
                    }
                });
                root = store.getRoot();

                var result = [],
                    nodeData = {
                        id: 'A',
                        leaf: false,
                        expanded: true,
                        children: [{
                            id: 'A.A',
                            leaf: true
                        }, {
                            id: 'A.B',
                            leaf: true
                        }, {
                            id: 'A.C',
                            leaf: false,
                            expanded: true,
                            children: [{
                                id: 'A.C.A',
                                leaf: true
                            }, {
                                id: 'A.C.B',
                                leaf: true
                            }]
                        }, {
                            id: 'A.D',
                            leaf: true
                        }]
                    };

                // Node events are NOT bubbled up to the TreeStore level, only as far as the root
                root.on('append', function(thisNode, newChildNode, index) {
                    result.push(newChildNode.getPath() + " | " + thisNode.getPath());
                });
                root.appendChild(nodeData);
                result = result.join(', ');
                expect(result).toBe("/root/A | /root, /root/A/A.A | /root/A, /root/A/A.B | /root/A, /root/A/A.C | /root/A, /root/A/A.C/A.C.A | /root/A/A.C, /root/A/A.C/A.C.B | /root/A/A.C, /root/A/A.D | /root/A");
                store.destroy();
            });
        });
    });
    
    describe('beforeload', function() {
    
        it('should no clear node descendants if a function binded to beforeload return false', function() {
            var beforeLoadComplete = false;

            store = Ext.create('Ext.data.TreeStore', {
                model: NodeModel,
                autoLoad: false,
                root: {
                    expanded: false,
                    id: 0,
                    name: 'Root Node',
                    children: [{
                        id: 1
                    }]
                }
             });
                    
             store.on('beforeload', function(store) {
                 expect(store.getRootNode().firstChild).not.toBeNull();
                 beforeLoadComplete = true;
                 return false; 
             });
             
             store.load();
             
             waitsFor(function() {
                 return beforeLoadComplete;
             });
        });
    });

    describe('appending to leaf nodes', function() {
        beforeEach(function() {
            store = Ext.create('Ext.data.TreeStore', {
                model: NodeModel,
                root: {
                    expanded: true,
                    id: 0,
                    name: 'Root Node'
                }
            });
            store.fillNode(store.getRootNode(), store.getProxy().getReader().readRecords(dummyData.children).records);
        });
        it('should convert leaf nodes to branch nodes.', function() {
            var leaf = store.getNodeById(5);

            expect(leaf.isLeaf()).toBe(true);
            leaf.appendChild({
                name: 'eee-child'
            });
            expect(leaf.isLeaf()).toBe(false);
        });
    });
    
    describe('heterogeneous TreeStores', function() {
        var treeData,
            schema;

        beforeEach(function() {
            schema = Ext.data.Model.schema;
            schema.setNamespace('spec');

            Ext.define('spec.Territory', {
                extend: 'Ext.data.TreeModel',
                idProperty: 'territoryName',
                fields: [{
                    name: 'territoryName',
                    mapping: 'territoryName',
                    convert: undefined
                }]
            }),
            Ext.define('spec.Country', {
                extend: 'Ext.data.TreeModel',
                idProperty: 'countryName',
                fields: [{
                    name: 'countryName',
                    mapping: 'countryName',
                    convert: undefined
                }]
            }),
            Ext.define('spec.City', {
                extend: 'Ext.data.TreeModel',
                idProperty: 'cityName',
                fields: [{
                    name: 'cityName',
                    mapping: 'cityName',
                    convert: undefined
                }]
            });

            // Must renew the data each time. Because TreeStore mutates input data object by deleting
            // the childNodes in onBeforeNodeExpand and onNodeAdded. TODO: it shouldn't do that.
            // The heterogeneous models MUST have disparate, non-overlapping field names
            // so that we test that a correct, record-specific data extraction function
            // has been run on the different mtypes on the dataset.
            treeData = {
                children: [{
                    mtype: 'Territory',
                    territoryName: 'North America',
                    children :[{
                        mtype: 'Country',
                        countryName: 'USA',
                        children: [{
                            mtype: 'City',
                            cityName: 'Redwood City',
                            leaf: true
                        }, {
                            mtype: 'City',
                            cityName: 'Frederick, MD',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        countryName: 'Canada',
                        children: [{
                            mtype: 'City',
                            cityName: 'Vancouver',
                            leaf: true
                        }, {
                            mtype: 'City',
                            cityName: 'Toronto',
                            leaf: true
                        }]
                    }]
                }, {
                    mtype: 'Territory',
                    territoryName: 'Europe, ME, Africa',
                    expanded: true,
                    children :[{
                        mtype: 'Country',
                        countryName: 'England',
                        children: [{
                            mtype: 'City',
                            cityName: 'Nottingham',
                            leaf: true
                        }, {
                            mtype: 'City',
                            cityName: 'London',
                            leaf: true
                        }]
                    }, {
                        mtype: 'Country',
                        countryName: 'Netherlands',
                        children: [{
                            mtype: 'City',
                            cityName: 'Amsterdam',
                            leaf: true
                        }, {
                            mtype: 'City',
                            cityName: 'Haaksbergen',
                            leaf: true
                        }]
                    }]
                }]
            };
        });
        afterEach(function() {
            Ext.undefine('spec.Territory');
            Ext.undefine('spec.Country');
            Ext.undefine('spec.City');
            schema.clear(true);
        });

        it("should use the parentNode\'s childType to resolve child node models if no typeProperty is used on Reader", function() {

            // Need a special root type which knows about the first level
            Ext.define('spec.World', {
                extend: 'Ext.data.TreeModel',
                childType: 'Territory'
            });
            // Set the childType on the prototypes.
            // So Territory chould always produce Country childNodes and Country should always produce City childNodes.
            spec.Territory.prototype.childType = 'Country';
            spec.Country.prototype.childType = 'City';

            store = new Ext.data.TreeStore({
                root: treeData,
                model: 'spec.World',
                proxy: {
                    type: 'memory'
                }
            });
            var root = store.getRootNode(),
                na = root.childNodes[0],
                emea = root.childNodes[1],
                spain,
                madrid,
                usa = na.childNodes[0],
                rwc = usa.childNodes[0],
                frederick = usa.childNodes[1],
                canada = na.childNodes[1],
                vancouver = canada.childNodes[0],
                toronto = canada.childNodes[1],
                sacramento = usa.appendChild({
                    cityName: 'Sacramento',
                    leaf: true
                });

            // Two top level nodes are North America and Europe, ME, Africa"
            expect(na instanceof spec.Territory).toBe(true);
            expect(emea instanceof spec.Territory).toBe(true);
            expect(na.get('territoryName')).toBe('North America');
            expect(emea.get('territoryName')).toBe('Europe, ME, Africa');

            expect(usa instanceof spec.Country).toBe(true);
            expect(canada instanceof spec.Country).toBe(true);
            expect(usa.get('countryName')).toBe('USA');
            expect(canada.get('countryName')).toBe('Canada');

            expect(rwc instanceof spec.City).toBe(true);
            expect(frederick instanceof spec.City).toBe(true);
            expect(sacramento instanceof spec.City).toBe(true);
            expect(vancouver instanceof spec.City).toBe(true);
            expect(toronto instanceof spec.City).toBe(true);
            expect(rwc.get('cityName')).toBe('Redwood City');
            expect(frederick.get('cityName')).toBe('Frederick, MD');
            expect(sacramento.get('cityName')).toBe('Sacramento');
            expect(vancouver.get('cityName')).toBe('Vancouver');
            expect(toronto.get('cityName')).toBe('Toronto');

            // Check that the Model converts raw configs correctly according to the
            // typeProperty in the TreeStore
            spain = emea.appendChild({
                mtype: 'Country',
                countryName: 'Spain'
            });
            expect(spain instanceof spec.Country).toBe(true);
            expect(spain.get('countryName')).toBe('Spain');

            madrid = spain.appendChild({
                mtype: 'City',
                cityName: 'Madrid'
            });
            expect(madrid instanceof spec.City).toBe(true);
            expect(madrid.get('cityName')).toBe('Madrid');
        });

        it("should use the store's model namespace to resolve child node models if short form typeProperty is used", function() {
            store = new Ext.data.TreeStore({
                model: 'spec.Territory',
                root: treeData,
                proxy: {
                    type: 'memory',
                    reader: {
                        typeProperty: 'mtype'
                    }
                }
            });
            var root = store.getRootNode(),
                na = root.childNodes[0],
                emea = root.childNodes[1],
                usa = na.childNodes[0],
                rwc = usa.childNodes[0],
                frederick = usa.childNodes[1],
                canada = na.childNodes[1],
                vancouver = canada.childNodes[0],
                toronto = canada.childNodes[1];

            // Two top level nodes are North America and Europe, ME, Africa"
            expect(na instanceof spec.Territory).toBe(true);
            expect(emea instanceof spec.Territory).toBe(true);
            expect(na.get('territoryName')).toBe('North America');
            expect(emea.get('territoryName')).toBe('Europe, ME, Africa');

            expect(usa instanceof spec.Country).toBe(true);
            expect(canada instanceof spec.Country).toBe(true);
            expect(usa.get('countryName')).toBe('USA');
            expect(canada.get('countryName')).toBe('Canada');

            expect(rwc instanceof spec.City).toBe(true);
            expect(frederick instanceof spec.City).toBe(true);
            expect(vancouver instanceof spec.City).toBe(true);
            expect(toronto instanceof spec.City).toBe(true);
            expect(rwc.get('cityName')).toBe('Redwood City');
            expect(frederick.get('cityName')).toBe('Frederick, MD');
            expect(vancouver.get('cityName')).toBe('Vancouver');
            expect(toronto.get('cityName')).toBe('Toronto');
        });

        it("should use the typeProperty's namespace property to resolve model class names", function() {
            store = new Ext.data.TreeStore({
                root: treeData,
                proxy: {
                    type: 'memory',
                    reader: {
                        typeProperty: {
                            name: 'mtype',
                            namespace: 'spec'
                        }
                    }
                }
            });
            var root = store.getRootNode(),
                na = root.childNodes[0],
                emea = root.childNodes[1],
                usa = na.childNodes[0],
                rwc = usa.childNodes[0],
                frederick = usa.childNodes[1],
                canada = na.childNodes[1],
                vancouver = canada.childNodes[0],
                toronto = canada.childNodes[1];

            expect(na instanceof spec.Territory).toBe(true);
            expect(emea instanceof spec.Territory).toBe(true);
            expect(na.get('territoryName')).toBe('North America');
            expect(emea.get('territoryName')).toBe('Europe, ME, Africa');

            expect(usa instanceof spec.Country).toBe(true);
            expect(canada instanceof spec.Country).toBe(true);
            expect(usa.get('countryName')).toBe('USA');
            expect(canada.get('countryName')).toBe('Canada');

            expect(rwc instanceof spec.City).toBe(true);
            expect(frederick instanceof spec.City).toBe(true);
            expect(vancouver instanceof spec.City).toBe(true);
            expect(toronto instanceof spec.City).toBe(true);
            expect(rwc.get('cityName')).toBe('Redwood City');
            expect(frederick.get('cityName')).toBe('Frederick, MD');
            expect(vancouver.get('cityName')).toBe('Vancouver');
            expect(toronto.get('cityName')).toBe('Toronto');
        });

        it("should use the typeProperty's map property to resolve model class names", function() {
            store = new Ext.data.TreeStore({
                root: treeData,
                proxy: {
                    type: 'memory',
                    reader: {
                        typeProperty: {
                            name: 'mtype',
                            map: {
                                Territory: 'spec.Territory',
                                Country: 'spec.Country',
                                City: 'spec.City'
                            }
                        }
                    }
                }
            });
            var root = store.getRootNode(),
                na = root.childNodes[0],
                emea = root.childNodes[1],
                usa = na.childNodes[0],
                rwc = usa.childNodes[0],
                frederick = usa.childNodes[1],
                canada = na.childNodes[1],
                vancouver = canada.childNodes[0],
                toronto = canada.childNodes[1];

            expect(na instanceof spec.Territory).toBe(true);
            expect(emea instanceof spec.Territory).toBe(true);
            expect(na.get('territoryName')).toBe('North America');
            expect(emea.get('territoryName')).toBe('Europe, ME, Africa');

            expect(usa instanceof spec.Country).toBe(true);
            expect(canada instanceof spec.Country).toBe(true);
            expect(usa.get('countryName')).toBe('USA');
            expect(canada.get('countryName')).toBe('Canada');

            expect(rwc instanceof spec.City).toBe(true);
            expect(frederick instanceof spec.City).toBe(true);
            expect(vancouver instanceof spec.City).toBe(true);
            expect(toronto instanceof spec.City).toBe(true);
            expect(rwc.get('cityName')).toBe('Redwood City');
            expect(frederick.get('cityName')).toBe('Frederick, MD');
            expect(vancouver.get('cityName')).toBe('Vancouver');
            expect(toronto.get('cityName')).toBe('Toronto');
        });

        it("should CALL the typeProperty to resolve model class names if it is a function", function() {
            var typePropertyScope;

            store = new Ext.data.TreeStore({
                root: treeData,
                proxy: {
                    type: 'memory',
                    reader: {
                        typeProperty: function(rawData) {
                            typePropertyScope = this;
                            return 'spec.' + rawData.mtype;
                        }
                    }
                }
            });
            var root = store.getRootNode(),
                na = root.childNodes[0],
                emea = root.childNodes[1],
                usa = na.childNodes[0],
                rwc = usa.childNodes[0],
                frederick = usa.childNodes[1],
                canada = na.childNodes[1],
                vancouver = canada.childNodes[0],
                toronto = canada.childNodes[1];

            // The typeProperty function must be called in the scope of the Reader
            expect(typePropertyScope === store.getProxy().getReader());

            expect(na instanceof spec.Territory).toBe(true);
            expect(emea instanceof spec.Territory).toBe(true);
            expect(na.get('territoryName')).toBe('North America');
            expect(emea.get('territoryName')).toBe('Europe, ME, Africa');

            expect(usa instanceof spec.Country).toBe(true);
            expect(canada instanceof spec.Country).toBe(true);
            expect(usa.get('countryName')).toBe('USA');
            expect(canada.get('countryName')).toBe('Canada');

            expect(rwc instanceof spec.City).toBe(true);
            expect(frederick instanceof spec.City).toBe(true);
            expect(vancouver instanceof spec.City).toBe(true);
            expect(toronto instanceof spec.City).toBe(true);
            expect(rwc.get('cityName')).toBe('Redwood City');
            expect(frederick.get('cityName')).toBe('Frederick, MD');
            expect(vancouver.get('cityName')).toBe('Vancouver');
            expect(toronto.get('cityName')).toBe('Toronto');
        });
    });

    describe('Filtering, and isLastVisible status', function() {
        var rec0, rec1, rec2;

        beforeEach(function() {
            store = Ext.create('Ext.data.TreeStore', {
                model: NodeModel,
                root: {
                    expanded: true,
                    id: 0,
                    name: 'Root Node',
                    children: [{
                        name: 'Foo'
                    }, {
                        name: 'Bar'
                    }, {
                        name: 'Bletch'
                    }]
                }
            });
            rec0 = store.getAt(0);
            rec1 = store.getAt(1);
            rec2 = store.getAt(2);

        });
        it('should correctly ascertain whether a node is the last visible node.', function() {

            // Verify initial conditions
            expect(store.getCount()).toEqual(3);
            expect(rec0.isLastVisible()).toBe(false);
            expect(rec1.isLastVisible()).toBe(false);
            expect(rec2.isLastVisible()).toBe(true);

            // Only first node should now be visible
            store.filter({
                property: 'name',
                value: 'Foo'
            });

            // Now there's only 1, and it should report that it is the last visible
            expect(store.getCount()).toEqual(1);
            expect(rec0.isLastVisible()).toBe(true);
        });
    });
});
