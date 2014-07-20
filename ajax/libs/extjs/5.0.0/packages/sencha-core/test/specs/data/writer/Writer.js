describe("Ext.data.writer.Writer", function(){
    var writer, buildWriter, Article, article, operation;
    
    beforeEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = false;
        buildWriter = function(cfg) {
            cfg = Ext.apply({
                writeAllFields: true
            }, cfg);
            cfg = Ext.apply(cfg, {
                model: spec.Article
            });
            writer = new Ext.data.writer.Writer(cfg);
        };
        
        Article = Ext.define('spec.Article', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'id',    type: 'int'},
                {name: 'title', type: 'string'},
                {name: 'body',  type: 'string', writeName: 'content'},
                {name: 'isRead', type: 'boolean', persist: false}
            ]
        });
        
        article = new Article({
            id: 1,
            title: 'Foo',
            body: 'Bar'
        });
        operation = new Ext.data.operation.Create({
            records: [article]
        });
    });
    
    afterEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = true;
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.Article');
    });
    
    describe("initialization", function(){
        it("should default writeAllFields to false", function(){
            var writer = new Ext.data.writer.Writer();
            expect(writer.getWriteAllFields()).toBe(false);
        });
        
        it("should default nameProperty to 'name'", function(){
            buildWriter();
            expect(writer.getNameProperty()).toBe('name');
        });
    });
    
    describe("getRecordData", function(){
        it("should return undeclared fields in the model", function(){
            buildWriter();
            article.data.something = 1;
            var result = writer.getRecordData(article, operation);
            expect(result.something).toBe(1);
        });
        
        it("should write all fields in the model", function(){
            buildWriter();
            var result = writer.getRecordData(article, operation);
            expect(result).toEqual({
                id: 1,
                title: 'Foo',
                body: 'Bar'
            });
        });
        
        it("should ignore any fields with persist: false", function(){
            buildWriter();
            var result = writer.getRecordData(article, operation);
            expect(result.isRead).toBeUndefined();
        });
        
        it("should write the id as the clientIdProperty if the record is a phantom", function(){
            buildWriter({
                clientIdProperty: 'cid'
            });

            article = new Article({
                title: 'Foo',
                body: 'Bar'
            });
            operation.setRecords([article]);

            var result = writer.getRecordData(article, operation);
            expect(result).toEqual({
                cid: article.id,
                title: 'Foo',
                body: 'Bar'
            });
        });

        it("should write the generated id if the record is a phantom", function(){
            buildWriter();

            // This config is now only used to read clientId values so make sure it does
            // not get picked up by the writer.
            Article.prototype.clientIdProperty = 'clientId';
            article = new Article({
                title: 'Foo',
                body: 'Bar'
            });
            operation.setRecords([article]);
            var result = writer.getRecordData(article, operation);

            Article.prototype.clientIdProperty = null;

            expect(result).toEqual({
                id: article.id,
                title: 'Foo',
                body: 'Bar'
            });
        });

        it("should write the idProperty for all non-phantom records by default", function(){
            buildWriter();
            article = new Article({
                id: 1,
                title: 'Foo',
                body: 'Bar'
            });

            var result = writer.getRecordData(article, operation);
            expect(result).toEqual({
                id: 1,
                title: 'Foo',
                body: 'Bar'
            });
        });

        describe('delete', function() {
            var operation;

            beforeEach(function() {
                article = new Article({
                    id: 1,
                    title: 'Foo',
                    body: 'Bar'
                });
                operation = new Ext.data.operation.Destroy({
                    records: [article]
                });
            });
            it("should return an object containing all fields", function() {
                buildWriter();
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    id: 1,
                    title: 'Foo',
                    body: 'Bar'
                });
            });
            it("should return an object with only the id if writeAllFields is false", function() {
                buildWriter({
                    writeAllFields: false
                });
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    id: 1
                });
            });
        });
        
        describe("writeAllFields: false", function(){
            beforeEach(function(){
                buildWriter({
                    writeAllFields: false
                });
            });
            
            it("should return an object with only the id if nothing is modified", function(){
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    id: 1
                });
            });
            
            it("should return an empty object if nothing is modified when writeRecordId = false", function(){
                buildWriter({
                    writeAllFields: false,
                    writeRecordId: false
                });
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({});
            });
            
            it("should return only the modified fields and the id", function(){
                article.set('title', 'other');
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    id: 1,
                    title: 'other'
                });
            });
            
            it("should return the modified fields except id if the record is a non-phantom and writeRecordId = false", function(){
                buildWriter({
                    writeAllFields: false,
                    writeRecordId: false
                });
                article.set('title', 'other');
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    title: 'other'
                });
            });
            
            it("should write all fields if the record is a phantom", function(){
                article = new Article({
                    title: 'Foo',
                    body: 'Bar'
                });
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    id: article.id,
                    title: 'Foo',
                    body: 'Bar'
                });
            });
            
            describe("dates", function() {
                beforeEach(function() {
                    Ext.define('MyModel', {
                        extend: 'Ext.data.Model',
                        fields: [
                            {name: 'myDate', type: 'date', dateFormat: 'Y/m/d'},
                            {name: 'timestamp', type: 'date', dateFormat: 'timestamp'},
                            {name: 'time', type: 'date', dateFormat: 'time'},
                            {name: 'dateWriteFormat', type: 'date', dateWriteFormat: 'Y-m-d', dateFormat: 'Y|M|D'}
                        ]
                    });
                });

                afterEach(function() {
                    Ext.undefine('MyModel');
                });
                
                it("should serialize Dates using the dateFormat", function() {
                    var myModel = new MyModel({
                        myDate: new Date(1962, 5, 17)
                    }),
                    operation = new Ext.data.operation.Create({
                        records: [myModel]
                    }),
                    writer = new Ext.data.writer.Writer({}),
                    result = writer.getRecordData(myModel, operation);
                    expect(result.myDate).toBe('1962/06/17');
                });
                
                it("should respect the timestamp format", function(){
                    var now = new Date();
                    var myModel = new MyModel({
                        timestamp: new Date(Ext.Date.format(now, 'U') * 1000)
                    }),
                    operation = new Ext.data.operation.Create({
                        records: [myModel]
                    }),
                    writer = new Ext.data.writer.Writer({}),
                    result = writer.getRecordData(myModel, operation);
                    expect(result.timestamp).toBe(Ext.Date.format(now, 'U'));
                });
                
                it("should respect the time format", function(){
                    var now = new Date();
                    var myModel = new MyModel({
                        time: new Date(now.getTime())
                    }),
                    operation = new Ext.data.operation.Create({
                        records: [myModel]
                    }),
                    writer = new Ext.data.writer.Writer({}),
                    result = writer.getRecordData(myModel, operation);
                    expect(result.time).toBe(now.getTime().toString());
                });
            
                it("should send null for dates when the date is null", function(){
                    var myModel = new MyModel({}),
                    operation = new Ext.data.operation.Create({
                        records: [myModel]
                    }),
                    writer = new Ext.data.writer.Writer({}),
                    result = writer.getRecordData(myModel, operation);
                    expect(result.myDate).toBe(null);
                });
                
                it("should give precedence to writeFormat", function() {
                    var myModel = new MyModel({
                            dateWriteFormat: new Date(2012, 0, 1)
                        }),
                        operation = new Ext.data.operation.Create({
                            records: [myModel]
                        }),
                        writer = new Ext.data.writer.Writer({
                            dateFormat: 'Y/m/d'
                        }),
                        result = writer.getRecordData(myModel, operation);
                          
                    expect(result.dateWriteFormat).toBe('2012/01/01');
                });
                
                it("should give precedence to the writer dateFormat", function() {
                    var myModel = new MyModel({
                            myDate: new Date(2012, 0, 1)
                        }),
                        operation = new Ext.data.operation.Create({
                            records: [myModel]
                        }),
                        writer = new Ext.data.writer.Writer({
                            dateFormat: 'Y/m/d'
                        }),
                        result = writer.getRecordData(myModel, operation);
                          
                    expect(result.myDate).toBe('2012/01/01');
                });
            });

            it("should serialize using the Field's serialize", function() {
                Ext.define('MyModel', {
                    extend: 'Ext.data.Model',
                    fields: [
                        {name: 'myDate', type: 'date', dateFormat: 'Y/m/d', serialize: function() {return 'test';}}
                    ]
                });
                var myModel = new MyModel({
                    myDate: '1962/06/17'
                }),
                operation = new Ext.data.operation.Create({
                    records: [myModel]
                }),
                writer = new Ext.data.writer.Writer({}),
                result = writer.getRecordData(myModel, operation);
                delete result.id;
                expect(result).toEqual({
                    myDate: 'test'
                });
                Ext.undefine('MyModel');
            });

        });
        
        describe("nameProperty", function(){
            it("should use the nameProperty", function(){
                buildWriter({
                    writeAllFields: false,
                    nameProperty: 'writeName'
                });
                article.set('body', 'new body');
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    id: 1,
                    content: 'new body'
                });
            });
            
            it("should fall back to the name property", function(){
                buildWriter({
                    nameProperty: 'writeName'
                });
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    id: 1,
                    title: 'Foo',
                    content: 'Bar'
                });
            });
            
            it("should write mapped names correctly when phantom = false", function(){
                // Validate a fix for the non-mapped id always being written out
                // in addition to the mapped id for non-phantom records
                buildWriter({
                    writeAllFields: true,
                    nameProperty: 'writeName'
                });
                Ext.data.Model.schema.clear();
                Article = Ext.define('spec.Article', {
                    extend: 'Ext.data.Model',
                    fields: [
                        {name: 'id',     type: 'int',     writeName: 'mapped_id'},
                        {name: 'title',  type: 'string',  writeName: 'mapped_title'},
                        {name: 'body',   type: 'string',  writeName: 'mapped_body'}
                    ]
                });
                article = new Article({
                    id: 123,
                    title: 'Foo',
                    body: 'Bar',
                    phantom: false // <-- this is the key
                });
                var result = writer.getRecordData(article, operation);
                expect(result).toEqual({
                    mapped_id: 123,
                    mapped_title: 'Foo',
                    mapped_body: 'Bar',
                    phantom: false
                });
            });
        });
    });
    
});
