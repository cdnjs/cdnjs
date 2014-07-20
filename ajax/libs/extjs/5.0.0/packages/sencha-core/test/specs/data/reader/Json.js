describe("Ext.data.reader.Json", function() {
    var reader, data1, data2, result1, result2, result3;

    beforeEach(function() {
        Ext.ClassManager.enableNamespaceParseCache = false;
        Ext.data.Model.schema.setNamespace('spec');
        Ext.define('spec.JsonReader', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'inter', type: 'int'}
            ]
        });

        reader = new Ext.data.JsonReader({
            rootProperty: 'data',
            totalProperty: 'totalProp',
            messageProperty: 'messageProp',
            successProperty: 'successProp',
            model: 'spec.JsonReader'
        });
    });

    afterEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = true;
        Ext.undefine('spec.JsonReader');
        Ext.data.Model.schema.clear(true);
    });
    
    describe("preserveRawData", function() {
        it("should not use the raw data object for the model if set to true", function() {
            reader.setPreserveRawData(true);
            var o = {
                inter: 1
            };
            
            var rec = reader.readRecords([o]).getRecords()[0];
            
            rec.set('inter', 2);
            expect(o.inter).toBe(1);
        });
        
        it("should be able to modify the raw data object for the model if set to false", function() {
            reader.setPreserveRawData(false);
            var o = {
                inter: 1
            };
            
            var rec = reader.readRecords([o]).getRecords()[0];
            
            rec.set('inter', 2);
            expect(o.inter).toBe(2);
        });
    });
    
    describe("extractors", function() {
        var createReader;
        
        beforeEach(function(){
            createReader = function(cfg){
                cfg = cfg || {};
                reader = new Ext.data.reader.Json(Ext.applyIf({
                    model: 'spec.JsonReader'
                }, cfg));
                reader.buildExtractors(true);
            };
        });
        
        afterEach(function(){
            reader = createReader = null;
        });
        
        it("should run function extractors in the reader scope", function(){
            var actual;
            
            createReader({
                successProperty: function(){
                    actual = this;
                    return true;
                }
            });
            reader.getSuccess({
                success: true
            });
            expect(actual).toBe(reader);
        });
        
        /**
         * While testing all of these individually is a bit redundant, it's for completeness
         * to ensure that all of them are run through the proper extractors.
         */
        describe("getTotal", function(){
            it("should default to total", function(){
                createReader();
                expect(reader.getTotal({
                    total: 5
                })).toBe(5);
            });
            
            it("should have no getTotal method if the totalProperty isn't specified", function(){
                createReader({
                    totalProperty: ''
                });
                expect(reader.getTotal).toBeUndefined();
            });
            
            it("should read the specified property name", function(){
                createReader({
                    totalProperty: 'foo'
                });
                expect(reader.getTotal({
                    foo: 10
                })).toBe(10);
            });
            
            it("should accept a function configuration", function(){
                createReader({
                    totalProperty: function(data){
                        return data.big.chain.total;
                    }
                });
                expect(reader.getTotal({
                    big: {
                        chain: {
                            total: 65
                        }
                    }
                })).toBe(65);
            });
            
            describe("JSON", function(){
                it("should read dot notation", function(){
                    createReader({
                        totalProperty: 'big.chain.total'
                    });
                    expect(reader.getTotal({
                        big: {
                            chain: {
                                total: 43
                            }
                        }
                    })).toBe(43);
                });
                
                it("should read array notation for numeric values", function(){
                    createReader({
                        totalProperty: 'values[0]'
                    });
                    expect(reader.getTotal({
                        values: [9]
                    })).toBe(9);
                });
                
                it("should read array notation for property names", function(){
                    createReader({
                        totalProperty: '["foo-bar"]'
                    });
                    expect(reader.getTotal({
                        'foo-bar': 16
                    })).toBe(16);
                });
                
                it("should read array/dot notation", function(){
                    createReader({
                        totalProperty: 'big[0].chain.total'
                    });
                    expect(reader.getTotal({
                        big: [{
                            chain: {
                                total: 17
                            }
                        }]
                    })).toBe(17);
                });
                
                it("should not read dot chains if simple accessors are used", function(){
                    createReader({
                        totalProperty: 'some.big.chain',
                        useSimpleAccessors: true
                    });
                    expect(reader.getTotal({
                        'some.big.chain': 88
                    })).toBe(88);
                });
            });            
        });
        
        describe("success", function(){
            it("should default to success", function(){
                createReader();
                expect(reader.getSuccess({
                    success: true
                })).toBe(true);
            });
            
            it("should have no getSuccess method if the successProperty isn't specified", function(){
                createReader({
                    successProperty: ''
                });
                expect(reader.getSuccess).toBeUndefined();
            });
            
            it("should read the specified property name", function(){
                createReader({
                    successProperty: 'foo'
                });
                expect(reader.getSuccess({
                    foo: false
                })).toBe(false);
            });
            
            it("should accept a function configuration", function(){
                createReader({
                    successProperty: function(data){
                        return data.big.chain.success;
                    }
                });
                expect(reader.getSuccess({
                    big: {
                        chain: {
                            success: true
                        }
                    }
                })).toBe(true);
            });
            
            describe("JSON", function(){
                it("should read dot notation", function(){
                    createReader({
                        successProperty: 'big.chain.success'
                    });
                    expect(reader.getSuccess({
                        big: {
                            chain: {
                                success: true
                            }
                        }
                    })).toBe(true);
                });
                
                it("should read array notation for numeric values", function(){
                    createReader({
                        successProperty: 'values[0]'
                    });
                    expect(reader.getSuccess({
                        values: [false]
                    })).toBe(false);
                });
                
                it("should read array notation for property names", function(){
                    createReader({
                        successProperty: '["foo-bar"]'
                    });
                    expect(reader.getSuccess({
                        'foo-bar': false
                    })).toBe(false);
                });
                
                it("should read array/dot notation", function(){
                    createReader({
                        successProperty: 'big[0].chain.success'
                    });
                    expect(reader.getSuccess({
                        big: [{
                            chain: {
                                success: true
                            }
                        }]
                    })).toBe(true);
                });
                
                it("should not read dot chains if simple accessors are used", function(){
                    createReader({
                        successProperty: 'some.big.chain',
                        useSimpleAccessors: true
                    });
                    expect(reader.getSuccess({
                        'some.big.chain': true
                    })).toBe(true);
                });
            });
        });
        
        describe("message", function(){
            it("should default to undefined", function(){
                createReader();
                expect(reader.getMessage).toBeUndefined();
            });
            
            it("should have no getMessage method if the messageProperty isn't specified", function(){
                createReader({
                    successProperty: ''
                });
                expect(reader.getSuccess).toBeUndefined();
            });
            
            it("should read the specified property name", function(){
                createReader({
                    messageProperty: 'foo'
                });
                expect(reader.getMessage({
                    foo: false
                })).toBe(false);
            });
            
            it("should accept a function configuration", function(){
                createReader({
                    messageProperty: function(data){
                        return data.big.chain.message;
                    }
                });
                expect(reader.getMessage({
                    big: {
                        chain: {
                            message: 'msg'
                        }
                    }
                })).toBe('msg');
            });
            
            describe("JSON", function(){
                it("should read dot notation", function(){
                    createReader({
                        messageProperty: 'big.chain.message'
                    });
                    expect(reader.getMessage({
                        big: {
                            chain: {
                                message: 'some message'
                            }
                        }
                    })).toBe('some message');
                });
                
                it("should read array notation for numeric values", function(){
                    createReader({
                        messageProperty: 'values[0]'
                    });
                    expect(reader.getMessage({
                        values: ['a message']
                    })).toBe('a message');
                });
                
                it("should read array notation for property names", function(){
                    createReader({
                        messageProperty: '["foo-bar"]'
                    });
                    expect(reader.getMessage({
                        'foo-bar': 'new msg'
                    })).toBe('new msg');
                });
                
                it("should read array/dot notation", function(){
                    createReader({
                        messageProperty: 'big[0].chain.message'
                    });
                    expect(reader.getMessage({
                        big: [{
                            chain: {
                                message: 'stuff'
                            }
                        }]
                    })).toBe('stuff');
                });
                
                it("should not read dot chains if simple accessors are used", function(){
                    createReader({
                        messageProperty: 'some.big.chain',
                        useSimpleAccessors: true
                    });
                    expect(reader.getMessage({
                        'some.big.chain': 'data'
                    })).toBe('data');
                });
            });
        });
        
        describe("root", function(){
            it("should default to a function returning the main object", function(){
                var data = [];
                createReader();
                expect(reader.getRoot(data)).toBe(data);
            });
            
            it("default to a function returning the main object root isn't specified", function(){
                var data = [];
                createReader({
                    rootProperty: ''
                });
                expect(reader.getRoot(data)).toBe(data);
            });
            
            it("should read the specified property name", function(){
                var data = [];
                createReader({
                    rootProperty: 'foo'
                });
                expect(reader.getRoot({
                    foo: data
                })).toBe(data);
            });
            
            it("should accept a function configuration", function(){
                var data = [];
                createReader({
                    rootProperty: function(data){
                        return data.big.chain.root;
                    }
                });
                expect(reader.getRoot({
                    big: {
                        chain: {
                            root: data
                        }
                    }
                })).toBe(data);
            });
            
            describe("JSON", function(){
                it("should read dot notation", function(){
                    var data = [];
                    createReader({
                        rootProperty: 'big.chain.root'
                    });
                    expect(reader.getRoot({
                        big: {
                            chain: {
                                root: data
                            }
                        }
                    })).toBe(data);
                });
                
                it("should read array notation for numeric values", function(){
                    var data = [];
                    createReader({
                        rootProperty: 'values[0]'
                    });
                    expect(reader.getRoot({
                        values: [data]
                    })).toBe(data);
                });
                
                it("should read array notation for property names", function(){
                    var data = [];
                    createReader({
                        rootProperty: '["foo-bar"]'
                    });
                    expect(reader.getRoot({
                        'foo-bar': data
                    })).toBe(data);
                });
                
                it("should read array/dot notation", function(){
                    var data = [];
                    createReader({
                        rootProperty: 'big[0].chain.root'
                    });
                    expect(reader.getRoot({
                        big: [{
                            chain: {
                                root: data
                            }
                        }]
                    })).toBe(data);
                });
                
                it("should not read dot chains if simple accessors are used", function(){
                    var data = [];
                    createReader({
                        rootProperty: 'some.big.chain',
                        useSimpleAccessors: true
                    });
                    expect(reader.getRoot({
                        'some.big.chain': data
                    })).toBe(data);
                });
            });
        });
        
        describe("fields", function(){
            var rawOptions = {
                recordCreator: Ext.identityFn
            };
            
            beforeEach(function(){
                createReader = function(fields, simple){
                    Ext.define('spec.JsonFieldTest', {
                        extend: 'Ext.data.Model',
                        fields: fields
                    });
                    reader = new Ext.data.reader.Json({
                        model: 'spec.JsonFieldTest',
                        fields: fields,
                        useSimpleAccessors: simple || false
                    });
                };
            });
            
            afterEach(function() {
                Ext.undefine('spec.JsonFieldTest');
            });
            
            it("should read the name if no mapping is specified", function(){
                createReader(['field']);
                var result = reader.readRecords([{field: 'val'}], rawOptions).getRecords()[0];
                expect(result.field).toBe('val');
            });
            
            it("should give precedence to the mapping", function(){
                createReader([{
                    name: 'field',
                    mapping: 'somethingElse'
                }]);
                var result = reader.readRecords([{somethingElse: 'a value'}], rawOptions).getRecords()[0];
                expect(result.field).toEqual('a value');
            });
            
            it("should accept a function", function(){
                createReader([{
                    name: 'field',
                    mapping: function(o){
                        return o.complex.chain.value;
                    }
                }]);
                var result = reader.readRecords([{
                    complex: {
                        chain: {
                            value: 2
                        }
                    }
                }], rawOptions).getRecords()[0];
                expect(result.field).toBe(2);
            });
            
            it("should ignore certain falsy mapping values", function(){
                createReader([{
                    name: 'field',
                    mapping: undefined
                }, {
                    name: 'field2',
                    mapping: null
                }, {
                    name: 'field3',
                    mapping: ''
                }]);
                var result = reader.readRecords([{
                    field: 'val',
                    field2: 'val2',
                    field3: 'val3'
                }], rawOptions).getRecords()[0];
                
                expect(result.field).toBe('val');
                expect(result.field2).toBe('val2');
                expect(result.field3).toBe('val3');
            });

            it("should allow zero value for mapping", function(){
                createReader([{
                    name: 'field',
                    mapping: 0
                }]);
                var result1 = reader.readRecords([{
                    0: 'woo'
                }], rawOptions).getRecords()[0];
                var result2 = reader.readRecords([['T']], rawOptions).getRecords()[0];
                expect(result1.field).toBe('woo');
                expect(result2.field).toBe('T');
            });

            describe("JSON", function(){
                it("should read dot notation", function(){
                    createReader([{
                        name: 'field',
                        mapping: 'some.value'
                    }]);
                    var result = reader.readRecords([{
                        some: {
                            value: 'mapped'
                        }
                    }], rawOptions).getRecords()[0];
                    expect(result.field).toBe('mapped');
                });
                
                it("should handle dot notation with an undefined property", function(){
                    createReader([{
                        name: 'field',
                        mapping: 'some.value'
                    }]);
                    var result = reader.readRecords([{
                        some: {
                            // 'value' is undefined
                        }
                    }], rawOptions).getRecords()[0];
                    expect(result.field).toBeUndefined(); // default value
                });
                
                it("should handle dot notation with nested undefined properties", function(){
                    createReader([{
                        name: 'field',
                        mapping: 'some.deep.nested.value'
                    }]);
                    var result = reader.readRecords([{
                        some: {
                            // 'deep' and children are undefined
                        }
                    }], rawOptions).getRecords()[0];
                    expect(result.field).toBeUndefined(); // default value
                });
                
                 it("should read array notation for numeric values", function(){
                     createReader([{
                        name: 'field',
                        mapping: 'values[0]'
                    }]);
                    var result = reader.readRecords([{
                        values: ['a']
                    }], rawOptions).getRecords()[0];
                    expect(result.field).toBe('a');
                });
                
                it("should read array notation for property names", function(){
                    createReader([{
                        name: 'field',
                        mapping: '["a-prop"]'
                    }]);
                    var result = reader.readRecords([{
                        'a-prop': 'woo'
                    }], rawOptions).getRecords()[0];
                    expect(result.field).toBe('woo');
                });
                
                it("should read array/dot notation", function(){
                    createReader([{
                        name: 'field',
                        mapping: 'big[0].chain.value'
                    }]);
                    var result = reader.readRecords([{
                        big: [{
                            chain: {
                                value: 45
                            }
                        }]
                    }], rawOptions).getRecords()[0];
                    expect(result.field).toBe(45);
                });
                
                it("should handle array/dot notation with nested undefined properties", function(){
                    createReader([{
                        name: 'field',
                        mapping: 'big[0].deep.chain.value'
                    }]);
                    var result = reader.readRecords([{
                        big: [{
                            deep: {
                                // 'chain' and children are undefined
                            }
                        }]
                    }], rawOptions).getRecords()[0];
                    expect(result.field).toBeUndefined(); // default value
                });
                
                it("should not read dot chains if simple accessors are used", function(){
                    createReader([{
                        name: 'field',
                        mapping: 'a.long.name'
                    }], true);
                    var result = reader.readRecords([{
                        'a.long.name': 'sixty'
                    }], rawOptions).getRecords()[0];
                    
                    expect(result.field).toBe('sixty');
                });
                
                it("should handle dot chains with undefined values if simple accessors are used", function(){
                    createReader([{
                        name: 'field',
                        mapping: 'a.long.name'
                    }], true);
                    var result = reader.readRecords([{
                        // 'a.long.name' is undefined
                    }], rawOptions).getRecords()[0];
                    expect(result.field).toBeUndefined();
                });
            });
        });
    });

    describe("reading records", function() {
        beforeEach(function() {
            Ext.define("spec.JsonReaderTest", {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'id'},
                    {name: 'floater', type: 'float'},
                    {name: 'bool', type: 'boolean'},
                    {name: 'inter', type: 'integer'},
                    {name: 'class', type: 'string'},
                    {
                        name: 'string', 
                        type: 'string', 
                        convert: function(v) {
                            return "modified/" + v;
                        }
                    }, {
                        name: 'withMap',
                        mapping: 'someMap'
                    }
                ]
            });

            reader = new Ext.data.reader.Json({
                rootProperty: 'data',
                idProperty: 'id',
                successProperty: 'successProp',
                totalProperty: 'totalProp',
                messageProperty: 'message',
                model: "spec.JsonReaderTest"
            });

            data1 = {
                id     : 1,
                bool   : true,
                inter  : 8675,
                floater: 1.23,
                string : 'Ed',
                'class': 'person'
            };

            data2 = {
                id     : 2,
                bool   : false,
                inter  : 309,
                floater: 4.56,
                string : 'Nick',
                'class': 'person'
            };

            result1 = reader.readRecords({
                data       : [data1],
                successProp: true,
                totalProp  : 2
            });

            result2 = reader.readRecords({
                data       : [data2],
                successProp: false,
                totalProp  : 6,
                message    : 'Failed'
            });
            
            result3 = reader.readRecords({
                data       : data2,
                successProp: true,
                totalProp  : 6
            });
        });
        
        afterEach(function() {
            Ext.undefine("spec.JsonReaderTest");
        });

        it("should read the success property", function() {
            expect(result1.getSuccess()).toBe(true);
            expect(result2.getSuccess()).toBe(false);
        });

        it("should read the total record count", function() {
            expect(result1.getTotal()).toBe(2);
            expect(result2.getTotal()).toBe(6);
        });

        it("should read records correctly", function() {
            var recData = result1.getRecords()[0].getData();

            expect(recData.id).toBe(data1.id);
            expect(recData.floater).toBe(data1.floater);
            expect(recData.bool).toBe(data1.bool);
            expect(recData.inter).toBe(data1.inter);
        });
        
        it("should be able to have fields as reserved words", function(){
            var recData = result1.getRecords()[0].getData();
            expect(recData['class']).toBe('person');    
        });
        
        it("should read records correctly if there was just a single object instead of an array of data", function() {
            var recData = result3.getRecords()[0].getData();
            
            expect(recData.id).toBe(data2.id);
            expect(recData.floater).toBe(data2.floater);
            expect(recData.bool).toBe(data2.bool);
            expect(recData.inter).toBe(data2.inter);
        });
        
        it("should still read on failure by default", function(){
            expect(result2.getRecords()[0].getId()).toBe(2);
        });
        
        it("should ignore values records/total when success is false & readRecordsOnFailure is false", function(){
            reader.setReadRecordsOnFailure(false);
            result2 = reader.readRecords({
                data       : [data2],
                successProp: false,
                totalProp  : 6,
                message    : 'Failed'
            });
            expect(result2.getRecords()).toEqual([]);
            expect(result2.getTotal()).toBe(0);
            expect(result2.getMessage()).toBe('Failed');
        });

        it("should respect the field's convert function", function() {
            var recData = result1.getRecords()[0].getData();

            expect(recData.string).toBe('modified/Ed');
        });
        
        it("should be able to load a single record", function(){
            var data = reader.readRecords({
                data: data1
            }).getRecords()[0].getData();
            
            expect(data.id).toBe(data1.id);
            expect(data.floater).toBe(data1.floater);
            expect(data.bool).toBe(data1.bool);
            expect(data.inter).toBe(data1.inter);
        });
        
        it("should handle record instances being in the data", function(){
            var data = reader.readRecords({
                data       : [data1, new spec.JsonReaderTest(data2)],
                successProp: true
            }).getRecords()[1].getData();
            
            expect(data.id).toBe(data2.id);
            expect(data.floater).toBe(data2.floater);
            expect(data.bool).toBe(data2.bool);
            expect(data.inter).toBe(data2.inter);
        });
        
        describe("readOptions", function() {
            it("should return what we construct when we pass recordCreator", function() {
                var records = reader.readRecords({
                    data: [data1, data2]
                }, {
                    recordCreator: function(o) {
                        return o;
                    }
                }).getRecords();
                expect(records[0]).toEqual(data1);
                expect(records[1]).toEqual(data2);
            });  
            
            it("should process mappings", function() {
                var records = reader.readRecords({
                    data: [{
                        someMap: 'foo'
                    }]
                }, {
                    recordCreator: function(o) {
                        return o;
                    }
                }).getRecords();
                expect(records[0]).toEqual({
                    withMap: 'foo',
                    someMap: 'foo'
                });
            });
        });
    });

    describe("loading with a 'record' property", function() {
        var data, resultSet;

        beforeEach(function() {
            Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'name', 'email'
                ]
            });

            reader = new Ext.data.reader.Json({
                model: 'spec.User',
                rootProperty: 'users',
                record: 'user'
            });

            data = {
                users: [
                    {
                        user: {
                            id: 1,
                            name: 'Ed Spencer',
                            email: 'ed@sencha.com'
                        }
                    },
                    {
                        user: {
                            id: 2,
                            name: 'Abe Elias',
                            email: 'abe@sencha.com'
                        }
                    }
                ]
            };

            resultSet = reader.readRecords(data);
        });
        
        afterEach(function() {
            Ext.undefine('spec.User');
        });

        it("should parse the correct number of results", function() {
            expect(resultSet.getCount()).toEqual(2);
        });

        it("should parse each record correctly", function() {
            var records = resultSet.getRecords(),
                record1 = records[0],
                record2 = records[1];

            expect(record1.get('name')).toBe('Ed Spencer');
            expect(record2.get('name')).toBe('Abe Elias');
        });
    });

    describe("calling model onLoad", function() {
        beforeEach(function() {
            Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['name'],
                onLoad: function() {}
            });
        });

        afterEach(function() {
            Ext.undefine('spec.User');
        });

        it("should call the template method for each record", function() {
            var spy = spyOn(spec.User.prototype, 'onLoad');
            reader = new Ext.data.reader.Json({
                model: 'spec.User'
            });
            reader.read([
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
                {id: 5},
                {id: 6},
                {id: 7}
            ]);
            expect(spy.callCount).toBe(7);
        });

        it("should call the template method after processing associations", function() {
            var count;
            spyOn(spec.User.prototype, 'onLoad').andCallFake(function() {
                count = this.orders().getCount();
            });
            Ext.define('spec.Order', {
                extend: 'Ext.data.Model',
                fields: [{
                    name: 'userId',
                    reference: 'User'
                }]
            });
            reader = new Ext.data.reader.Json({
                model: 'spec.User'
            });
            reader.read([{
                id: 1,
                orders: [{
                    id: 1
                }]
            }]);
            expect(count).toBe(1);
            Ext.undefine('spec.Order');
        });
    });

    describe("loading nested data", function() {
        var data = {
            "users": [
                {
                    "id": 123,
                    "name": "Ed",
                    "addresses": [
                        {
                            "line1": "525 University Avenue",
                            "line2": "Suite 23",
                            "town" : "Palo Alto"
                        }
                    ],
                    "orders": [
                        {
                            "id": 50,
                            "total": 100,
                            "order_items": [
                                {
                                    "id"      : 20,
                                    "price"   : 40,
                                    "quantity": 2,
                                    "product" : {
                                        "id": 1000,
                                        "name": "MacBook Pro"
                                    }
                                },
                                {
                                    "id"      : 21,
                                    "price"   : 20,
                                    "quantity": 1,
                                    "product" : {
                                        "id": 1001,
                                        "name": "iPhone"
                                    }
                                }
                            ]
                        },
                        {
                            "id": 51,
                            "total": 10,
                            "order_items": [
                                {
                                    "id": 22,
                                    "price": 10,
                                    "quantity": 1,
                                    "product": {
                                        "id"  : 1002,
                                        "name": "iPad"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        beforeEach(function() {
            //We have five models - User, Address, Order, OrderItem and Product
            Ext.define("spec.User", {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'name'
                ],

                hasMany: [
                    {model: 'spec.Order', name: 'orders'},
                    {model: 'spec.Address', name: 'addresses'}
                ],

                proxy: {
                    type: 'rest',
                    reader: {
                        type: 'json',
                        rootProperty: 'users'
                    }
                }
            });

            Ext.define('spec.Address', {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'line1', 'line2', 'town'
                ],

                belongsTo: 'spec.User'
            });

            Ext.define("spec.Order", {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'total'
                ],

                hasMany  : {model: 'spec.OrderItem', name: 'orderItems', associationKey: 'order_items'},
                belongsTo: 'spec.User'
            });

            Ext.define("spec.OrderItem", {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'price', 'quantity', 'order_id', 'product_id'
                ],

                belongsTo: ['spec.Order', {model: 'spec.Product', getterName: 'getProduct', associationKey: 'product'}]
            });

            Ext.define("spec.Product", {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'name'
                ],

                hasMany: {model: 'spec.OrderItem', name: 'orderItems'}
            });
        });
        
        afterEach(function() {
            Ext.undefine('spec.User');
            Ext.undefine('spec.Address');
            Ext.undefine('spec.Order');
            Ext.undefine('spec.OrderItem');
            Ext.undefine('spec.Product');
        });

        function createReader(config) {
            return new Ext.data.reader.Json(Ext.apply({}, config, {
                model: "spec.User",
                rootProperty: "users"
            }));
        }

        it("should set implicitIncludes to true by default", function() {
            reader = createReader();

            expect(reader.getImplicitIncludes()).toBe(true);
        });

        it("should not parse includes if implicitIncludes is set to false", function() {
            reader = createReader({implicitIncludes: false});

            var resultSet = reader.read(data),
                user      = resultSet.getRecords()[0],
                orders    = user.orders();

            expect(orders.getCount()).toBe(0);
        });

        describe("when reading nested data", function() {
            var resultSet, user, orders, orderItems, product, addresses;

            beforeEach(function() {
                reader     = createReader();
                resultSet  = reader.read(data);
                user       = resultSet.getRecords()[0];
                addresses  = user.addresses();
                orders     = user.orders();
                orderItems = orders.first().orderItems();
                product    = orderItems.first().getProduct();
            });

            it("should populate first-order associations", function() {
                expect(orders.getCount()).toBe(2);
                expect(addresses.getCount()).toBe(1);
            });

            it("should populate second-order associations", function() {
                expect(orderItems.getCount()).toBe(2);
            });

            it("should populate belongsTo associations", function() {
                expect(product.get('name')).toBe('MacBook Pro');
            });

            it("should ignore associations where the model isn't yet loaded", function() {
                Ext.define('spec.Employee', {
                    extend: 'Ext.data.Model',
                    fields: ['id', 'name', {
                        name: 'projectId',
                        reference: 'Project'
                    }]
                });
                reader = new Ext.data.reader.Json({
                    model: 'spec.Employee'
                });
                expect(function() {
                    reader.read({
                        id: 1,
                        name: 'Foo'
                    });
                }).not.toThrow();
            });
        });
    });

    describe("reconfiguring via metadata", function() {

        it("should call onMetaChange", function() {
            var meta = {some: 'meta data'};
            
            spyOn(reader, 'onMetaChange').andReturn();
            spyOn(reader, 'getRoot').andReturn([]);
            
            reader.readRecords({metaData: meta});
            expect(reader.onMetaChange).toHaveBeenCalledWith(meta);
        });
        
        it("should accept a custom meta property", function(){
            reader.setMetaProperty('foo.bar.baz');
            reader.buildExtractors(true);
            
            spyOn(reader, 'onMetaChange').andReturn();
            spyOn(reader, 'getRoot').andReturn([]);
            
            var o = {};
            var meta = {
                foo: {
                    bar: {
                        baz: o
                    }
                }
            };
            reader.readRecords(meta);
            expect(reader.onMetaChange).toHaveBeenCalledWith(o);
        });
        
    });

    describe("reading xhr", function() {
        var goodResponse = {
                responseText: '{ "success": true, "users": [{"name": "Ben", "location": "Boston"}, {"name": "Mike", "location": "Redwood City"}, {"name": "Nick", "location": "Kansas City"}] }'
            },
            badResponse = {
                responseText: 'this is not JSON'
            };

        beforeEach(function() {
            Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['name', 'location']
            });

            reader = new Ext.data.reader.Json({
                rootProperty: 'users',
                model: 'spec.User',
                listeners: {
                    exception: function (reader, response, errorMsg, eOpts) {
                    }
                }
            });
         });
         
         afterEach(function() {
             Ext.undefine('spec.User');
         });
        
        function doRead(response) {
            return reader.read(response);
        }

        describe("if there is a responseText property", function() {
            describe("if there is valid JSON", function() {    
                it("should be successful", function() {
                    expect(doRead(goodResponse).getSuccess()).toBe(true);
                });

                it("should return the expected number of records", function() {
                    expect(doRead(goodResponse).getCount()).toBe(3);
                });
    
                it("should not return a non-empty dataset", function() {
                    expect(doRead(goodResponse).getRecords().length).toBe(3);
                });
            });

            describe("if there is invalid JSON", function() {
                it("should not be successful", function() {
                    expect(doRead(badResponse).getSuccess()).toBe(false);
                });

                it("should not return any records", function() {
                    expect(doRead(badResponse).getTotal()).toBe(0);
                });
    
                it("should return any empty dataset", function() {
                    expect(doRead(badResponse).getRecords().length).toBe(0);
                });
            });
        });

        describe("if there is no responseText property", function() {            
            it("should return an empty dataset", function() {
                expect(doRead("something").getCount()).toBe(0);
            });
        });
    });
});
