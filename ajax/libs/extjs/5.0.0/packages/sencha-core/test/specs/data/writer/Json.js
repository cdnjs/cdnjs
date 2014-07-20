describe("Ext.data.writer.Json", function(){
    var writer, buildWriter, buildRecords, makeOperation, Article, simpleData = {
        id: 1,
        title: 'Article 1',
        body: 'content1'
    };
    
    beforeEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = false;
        buildWriter = function(cfg){
            cfg = Ext.apply({
                writeAllFields: true
            }, cfg);
            writer = new Ext.data.writer.Json(cfg);
        };
        
        Article = Ext.define('spec.Article', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id',    type: 'int'},
                {name: 'title', type: 'string'},
                {name: 'body',  type: 'string', writeName: 'content'}
            ]
        });
        
        buildRecords = function(recs){
            var out = [];
            Ext.each(recs, function(data){
                out.push(new Article(data));
            });
            return out;
        };
        
        makeOperation = function(records) {
            return new Ext.data.operation.Create({
                records: records
            })
        };
    });
    
    afterEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = true;
        writer = buildWriter = makeOperation = Article = null;
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.Article');
    });
    
    describe("initialization", function(){
        it("should default root to undefined", function(){
            buildWriter();
            expect(writer.getRootProperty()).toBeUndefined();
        });
        
        it("should default encode to false", function(){
            buildWriter();
            expect(writer.getEncode()).toBe(false);
        }); 
        
        it("should default allowSingle to true", function(){
            buildWriter();
            expect(writer.getAllowSingle()).toBe(true);
        });    
        
        it("should default expandData to false", function() {
            buildWriter();
            expect(writer.getExpandData()).toBe(false);
        });
    });
    
    describe("allowSingle", function(){
        it("should only send a single record if allowSingle is true and there's only 1 item", function(){
            buildWriter();
            var request = writer.write(new Ext.data.Request({
                operation: makeOperation(buildRecords([simpleData]))
            }));
            var actual = request.getJsonData();
            expect(actual).toEqual(simpleData);
        });
        
        it("should wrap a single record in an array if allowSingle is false", function(){
            buildWriter({
                allowSingle: false
            });
            var request = writer.write(new Ext.data.Request({
                operation: makeOperation(buildRecords([simpleData]))
            }));
            expect(request.getJsonData()).toEqual([simpleData]);
        });
        
        it("should wrap records in an array if there is more than 1, regardless of allowSingle", function(){
            buildWriter();
            var request = writer.write(new Ext.data.Request({
                operation: makeOperation(buildRecords([simpleData, {
                    id: 2,
                    title: 'Article 2',
                    body: 'content2'
                }]))
            }));
            expect(request.getJsonData()).toEqual([simpleData, {
                id: 2,
                title: 'Article 2',
                body: 'content2'
            }]);
        });
    });
    
    describe("with encode: true", function(){
        it("should throw an exception if no root is specified", function(){
            buildWriter({
                encode: true
            });
            expect(function(){
                writer.write(new Ext.data.Request({
                    operation: makeOperation(buildRecords([simpleData]))
                }));
            }).toRaiseExtError();
        });
        
        it("should write the data to the request params", function(){
            buildWriter({
                encode: true,
                rootProperty: 'root'
            });
            var request = writer.write(new Ext.data.Request({
                params: {},
                operation: makeOperation(buildRecords([simpleData]))
            }));
            expect(request.getParams().root).toBeDefined();
        });
        
        it("should encode the data", function(){
            buildWriter({
                encode: true,
                rootProperty: 'root'
            });
            var request = writer.write(new Ext.data.Request({
                params: {},
                operation: makeOperation(buildRecords([simpleData]))
            }));
            expect(request.getParams().root).toBe(Ext.encode(simpleData));
        });
    });
    
    describe("with encode: false", function(){
        it("should create the jsonData if it doesn't exist", function(){
            buildWriter();
            var request = writer.write(new Ext.data.Request({
                params: {},
                operation: makeOperation(buildRecords([simpleData]))
            }));
            expect(request.getJsonData()).toBeDefined();
        });
        
        it("should write directly to the jsonData if no root is specified", function(){
            buildWriter();
            var request = writer.write(new Ext.data.Request({
                params: {},
                operation: makeOperation(buildRecords([simpleData]))
            }));
            expect(request.getJsonData()).toEqual(simpleData);
        });
        
        it("should write to the root property jsonData if specified", function(){
            buildWriter({
                rootProperty: 'root'
            });
            var request = writer.write(new Ext.data.Request({
                params: {},
                operation: makeOperation(buildRecords([simpleData]))
            }));
            expect(request.getJsonData()).toEqual({
                root: simpleData
            });
        });
    });
    
    describe("nested data mappings", function(){
        var flatData;
        
        beforeEach(function(){
            Ext.data.Model.schema.clear();
            Article = Ext.define('spec.Article', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'id',    type: 'int'},
                    {name: 'title', type: 'string', mapping: 'my_title'},
                    {name: 'someNestedProperty',  type: 'string', mapping: 'some.nested.property'},
                    {name: 'someOtherProperty',   type: 'string', mapping: 'some.other.property'},
                    {name: 'someOtherProperty2',  type: 'int',    mapping: 'some.other.property2'}
                ]
            });
            flatData = {
                id: 1,
                title: 'Article 1',
                someNestedProperty: 'nested',
                someOtherProperty:  'other',
                someOtherProperty2: 5
            };
        });
        
        it("should write as flat output using the default field names by default", function(){
            buildWriter();
            var request = writer.write(new Ext.data.Request({
                operation: makeOperation(buildRecords([flatData]))
            }));
            expect(request.getJsonData()).toEqual(flatData);
        });
        
        it("should write as flat output using the mapped field names by default when nameProperty is used", function(){
            buildWriter({
                nameProperty: 'mapping'
            });
            var request = writer.write(new Ext.data.Request({
                operation: makeOperation(buildRecords([flatData]))
            }));
            expect(request.getJsonData()).toEqual({
                id: 1,
                my_title: 'Article 1',
                'some.nested.property': 'nested',
                'some.other.property':  'other',
                'some.other.property2': 5
            });
        });
        
        it("should expand output to nested JSON when nameProperty is used and expandData = true", function(){
            buildWriter({
                nameProperty: 'mapping',
                expandData: true
            });
            var request = writer.write(new Ext.data.Request({
                operation: makeOperation(buildRecords([flatData]))
            }));
            expect(request.getJsonData()).toEqual({
                id: 1,
                my_title: 'Article 1',
                some: {
                    nested: {
                        property: 'nested'
                    },
                    other: {
                        property: 'other',
                        property2: 5
                    }
                }
            });
        });
    });
    
    describe("transform", function(){
        it("should invoke the transform function", function(){
            var transformFn = function(data) {
                return {id: 2};
            };
            
            buildWriter({
                transform: transformFn
            });
            
            var request = writer.write(new Ext.data.Request({
                params: {},
                operation: makeOperation(buildRecords([simpleData]))
            }));
            expect(request.getJsonData()).not.toEqual(simpleData);
            expect(request.getJsonData()).toEqual({id: 2});
        });
        
        it("should invoke the transform function with the specified scope", function(){
            var mockScope = {};
            var transformFn = function(data) {
                expect(this).toEqual(mockScope);
                return {id: 2};
            };
            
            buildWriter({
                transform: {
                    fn: transformFn,
                    scope: mockScope
                }
            });
            
            var request = writer.write(new Ext.data.Request({
                params: {},
                operation: makeOperation(buildRecords([simpleData]))
            }));
            expect(request.getJsonData()).not.toEqual(simpleData);
            expect(request.getJsonData()).toEqual({id: 2});
        });
        
    });
    
});
