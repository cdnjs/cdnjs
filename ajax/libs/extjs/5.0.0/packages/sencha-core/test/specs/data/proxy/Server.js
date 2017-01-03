describe("Ext.data.proxy.Server", function() {
    var proxy,
        ServerProxy = Ext.data.proxy.Server,
        reader = new Ext.data.reader.Reader(),
        writer = new Ext.data.writer.Writer();
    
    beforeEach(function() {
        Ext.ClassManager.enableNamespaceParseCache = false; 
    });
    
    afterEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = true; 
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.SomeModel');
    });
    
    describe("instantiation", function() {
        var config;
        beforeEach(function(){
            config = {
                extraParams: {
                    foo: true,
                    bar: false
                },
                reader: reader,
                writer: writer
            };
            proxy = new ServerProxy(config);
        });
                
        it("should extend Ext.data.proxy.Proxy", function() {
            expect(proxy.superclass).toEqual(Ext.data.proxy.Proxy.prototype);
        });

        it("should have caching disabled", function() {
            expect(proxy.getNoCache()).toBe(true);
        });

        it("should have cacheString equal to _dc", function() {
            expect(proxy.getCacheString()).toBe("_dc");
        });

        it("should have timeout equal to 30000", function() {
            expect(proxy.getTimeout()).toBe(30000);
        });

        it("should have extraParams", function() {
            expect(proxy.getExtraParams()).toEqual(config.extraParams);
        });

        it("should have reader", function() {
            expect(proxy.getReader()).toBe(config.reader);
        });

        it("should have writer", function() {
            expect(proxy.getWriter()).toBe(config.writer);
        });
    });

    describe("methods", function(){
        describe("CRUD Operations", function() {
            beforeEach(function() {
                proxy = new ServerProxy();
                proxy.doRequest = jasmine.createSpy();
            });

            describe("create", function() {
                it("should do a request", function() {
                    proxy.read('create', 'create');
                    expect(proxy.doRequest).toHaveBeenCalledWith('create', 'create');
                });
            });

            describe("read", function() {
                it("should do a request", function() {
                    proxy.read('read', 'read');
                    expect(proxy.doRequest).toHaveBeenCalledWith('read', 'read');
                });
            });

            describe("update", function() {
                it("should do a request", function() {
                    proxy.read('update', 'update');
                    expect(proxy.doRequest).toHaveBeenCalledWith('update', 'update');
                });
            });

            describe("destroy", function() {
                it("should do a request", function() {
                    proxy.read('destroy', 'destroy');
                    expect(proxy.doRequest).toHaveBeenCalledWith('destroy', 'destroy');
                });
            });
        });

        describe("buildUrl", function() {
            var request = new Ext.data.Request({
                    url: 'keep'
                }),
                configWithNoCache = {
                    noCache: false
                },
                configWithCacheString = {
                    cacheString: '_cool'
                };

            beforeEach(function() {
               spyOn(Ext.Date, "now").andReturn('bro');
            });

            it("should return keep?_dc=bro with an empty config", function() {
                proxy = new ServerProxy({});
                expect(proxy.buildUrl(request), 'keep?_dc=bro');
            });

            it("should disable caching", function() {
                proxy = new ServerProxy(configWithNoCache);
                expect(proxy.buildUrl(request), request.url);
            });

            it("should use cacheString", function() {
                proxy = new ServerProxy(configWithCacheString);
                expect(proxy.buildUrl(request), 'keep?_cool=bro');
            });
            
            describe("url precedence", function(){
                it("should use the url on the proxy as a default", function(){
                    proxy = new ServerProxy({
                        url: 'proxy',
                        noCache: false
                    });
                    expect(proxy.buildUrl(new Ext.data.Request())).toBe('proxy');
                });
                
                it("should use the specified api by default", function(){
                    proxy = new ServerProxy({
                        api: {
                            read: 'read' 
                        },
                        noCache: false
                    });
                    expect(proxy.buildUrl(new Ext.data.Request({
                        action: 'read'
                    }))).toBe('read');
                });
                
                it("should use the url on the request by default", function(){
                    proxy = new ServerProxy({
                        noCache: false
                    });
                    expect(proxy.buildUrl(new Ext.data.Request({
                        action: 'read',
                        url: 'request'
                    }))).toBe('request');
                });
                
                it("should use proxy url if the item in the proxy is undefined", function(){
                    proxy = new ServerProxy({
                        url: 'proxy',
                        api: {
                            read: 'read' 
                        },
                        noCache: false
                    });
                    expect(proxy.buildUrl(new Ext.data.Request({
                        action: 'update'
                    }))).toBe('proxy');
                });
                
                it("should favour the api over the proxy url", function(){
                    proxy = new ServerProxy({
                        url: 'proxy',
                        api: {
                            read: 'read' 
                        },
                        noCache: false
                    });
                    expect(proxy.buildUrl(new Ext.data.Request({
                        action: 'read'
                    }))).toBe('read');
                });
                
                it("should favour the request url over the proxy", function(){
                    proxy = new ServerProxy({
                        url: 'proxy',
                        noCache: false
                    });
                    expect(proxy.buildUrl(new Ext.data.Request({
                        action: 'update',
                        url: 'request'
                    }))).toBe('request');
                });
                
                it("should favour the request url over the api", function(){
                    proxy = new ServerProxy({
                        api: {
                            read: 'read' 
                        },
                        noCache: false
                    });
                    expect(proxy.buildUrl(new Ext.data.Request({
                        action: 'read',
                        url: 'request'
                    }))).toBe('request');
                });
                
                it("should favour the request url over proxy & api", function(){
                    proxy = new ServerProxy({
                        url: 'proxy',
                        api: {
                            read: 'read' 
                        },
                        noCache: false
                    });
                    expect(proxy.buildUrl(new Ext.data.Request({
                        action: 'read',
                        url: 'request'
                    }))).toBe('request');
                });
            });
        });

        describe("doRequest", function() {
            it("should throw an error", function() {
                expect(ServerProxy.prototype.doRequest).toThrow();
            });
        });

        describe("getParams", function() {
            var params, sorters, filters, grouper;

            function createProxy(config) {
                return new Ext.data.proxy.Server(config || {});
            }

            function createOperation(config) {
                return new Ext.data.operation.Read(Ext.apply({}, config, {
                    page : 10,
                    start: 100,
                    limit: 10,

                    grouper: grouper,
                    sorters: sorters,
                    filters: filters
                }));
            }

            function getParams(proxyConfig, operationConfig) {
                var proxy     = createProxy(proxyConfig),
                    operation = createOperation(operationConfig);

                return proxy.getParams(operation);
            }

            beforeEach(function() {
                sorters  = [new Ext.util.Sorter({property: 'name', direction: 'ASC'})];
                filters  = [new Ext.util.Filter({property: 'name', value: 'Ed'})];
                grouper = new Ext.util.Grouper({property: 'name', direction: 'ASC'});
            });

            describe("the page param", function() {
                it("should default to 'page'", function() {
                    params = getParams();

                    expect(params.page).toBe(10);
                });

                it("should be customizable", function() {
                    params = getParams({pageParam: 'thePage'});

                    expect(params.thePage).toBe(10);
                });

                it("should not be sent if undefined", function() {
                    params = getParams({pageParam: undefined});

                    expect(params.page).toBeUndefined();
                });
            });

            describe("the start param", function() {
                it("should default to 'start'", function() {
                    params = getParams();

                    expect(params.start).toBe(100);
                });

                it("should be customizable", function() {
                    params = getParams({startParam: 'theStart'});

                    expect(params.theStart).toBe(100);
                });

                it("should not be sent if undefined", function() {
                    params = getParams({startParam: undefined});

                    expect(params.start).toBeUndefined();
                });

                it("should send a startParam of 0", function() {
                    params = getParams(undefined, {
                        start: 0
                    });

                    expect(params.start).toBe(0);
                });
            });

            describe("the limit param", function() {
                it("should default to 'limit'", function() {
                    params = getParams();

                    expect(params.limit).toBe(10);
                });

                it("should be customizable", function() {
                    params = getParams({limitParam: 'theLimit'});

                    expect(params.theLimit).toBe(10);
                });

                it("should not be sent if undefined", function() {
                    params = getParams({limitParam: undefined});

                    expect(params.limit).toBeUndefined();
                });
            });

            describe("the group param", function() {

                it("should default to 'group'", function() {
                    params = getParams();
                    expect(params.group).toBe('{"property":"name","direction":"ASC"}');
                });

                it("should be customizable", function() {
                    params = getParams({groupParam: 'theGroup'});

                    expect(params.theGroup).toBe('{"property":"name","direction":"ASC"}');
                });

                it("should not be sent if undefined", function() {
                    params = getParams({groupParam: undefined});

                    expect(params.group).toBeUndefined();
                });

                it("should not be set if there is no group defined", function() {
                    params = getParams({}, {grouper: undefined});

                    expect(params.group).toBeUndefined();
                });
            });

            describe("the sort param", function() {
                beforeEach(function() {
                    spyOn(Ext.data.proxy.Server.prototype, 'encodeSorters').andReturn("sorters");
                });

                it("should default to 'sort'", function() {
                    params = getParams();

                    expect(params.sort).toBe("sorters");
                });

                it("should be customizable", function() {
                    params = getParams({sortParam: 'theSorters'});

                    expect(params.theSorters).toBe("sorters");
                });

                it("should not be sent if undefined", function() {
                    params = getParams({sortParam: undefined});

                    expect(params.sort).toBeUndefined();
                });

                it("should encode the sorters", function() {
                    getParams();

                    expect(Ext.data.proxy.Server.prototype.encodeSorters).toHaveBeenCalledWith(sorters);
                });

                it("should not be set if there are no sorters", function() {
                    params = getParams({}, {sorters: []});

                    expect(params.sort).toBeUndefined();
                });
            });

            describe("the filter param", function() {
                beforeEach(function() {
                    spyOn(Ext.data.proxy.Server.prototype, 'encodeFilters').andReturn("filters");
                });

                it("should default to 'filter'", function() {
                    params = getParams();

                    expect(params.filter).toBe("filters");
                });

                it("should be customizable", function() {
                    params = getParams({filterParam: 'theFilters'});

                    expect(params.theFilters).toBe("filters");
                });

                it("should not be sent if undefined", function() {
                    params = getParams({filterParam: undefined});

                    expect(params.filter).toBeUndefined();
                });

                it("should encode the filters", function() {
                    getParams();

                    expect(Ext.data.proxy.Server.prototype.encodeFilters).toHaveBeenCalledWith(filters);
                });

                it("should not be set if there are no filters", function() {
                    params = getParams({}, {filters: []});

                    expect(params.filter).toBeUndefined();
                });
            });
        });

        describe("encoding sorters", function() {
            it("should provide a default encoded string", function() {
                var sorter1 = new Ext.util.Sorter({
                    property : "name",
                    direction: "ASC"
                });

                var sorter2 = new Ext.util.Sorter({
                    property : "age",
                    direction: "DESC"
                });

                proxy = new Ext.data.proxy.Server();
                
                expect(Ext.decode(proxy.encodeSorters([sorter1, sorter2]))).toEqual([{
                    property: 'name',
                    direction: 'ASC'
                }, {
                    property: 'age',
                    direction: 'DESC'
                }]);
            });
        });

        describe("encoding filters", function() {
            it("should provide a default encoded string, operator should be excluded by default", function() {
                var filter1 = new Ext.util.Filter({
                    property : "name",
                    value    : "Ed"
                });

                var filter2 = new Ext.util.Filter({
                    property : "age",
                    value    : 25,
                    operator: '>'
                });

                proxy = new Ext.data.proxy.Server();
                
                expect(Ext.decode(proxy.encodeFilters([filter1, filter2]))).toEqual([{
                    property: 'name',
                    value: 'Ed'
                }, {
                    property: 'age',
                    value: 25,
                    operator: '>'
                }]);
            });
        });

        describe("encoding group data", function() {
            it("should JSON encode the data", function() {
                var proxy = new Ext.data.proxy.Server(),
                    grouper = new Ext.util.Grouper({property: 'name', direction: 'ASC'});

                expect(Ext.decode(proxy.encodeSorters([grouper], true))).toEqual({
                    property: 'name',
                    direction: 'ASC'
                });
            });
        });

        describe("reader accessors", function() {
            var config,
                sreader = 'xml',
                defaultReaderType = 'xml',
                modelName = 'spec.SomeModel', 
                model;


            beforeEach(function(){
                model = Ext.define(modelName, {
                    extend: 'Ext.data.Model',
                    fields: ['id']
                });
            });
            
            describe("set the proxy's reader by reader instance", function() {
                beforeEach(function(){
                    config = {
                        reader: reader
                    };
                    proxy = new ServerProxy(config); 
                });

                it("should not create a new reader instance", function() {
                    var called = false; 
                    spyOn(Ext, "createByAlias").andCallFake(function(name) {
                        if (name === 'reader.json') {
                            called = true;
                        }
                    });
                    expect(called).toBe(false);
                });

                it("should have a reader set", function() {
                    expect(proxy.getReader()).toEqual(reader);
                });
            });

            describe("set the proxy's reader by string", function() {
                beforeEach(function(){
                    config = {
                        reader: sreader,
                        proxy: proxy,
                        model: model,
                        defaultReaderType: defaultReaderType
                    };
                    proxy = new ServerProxy(config); 
                });

                it("should create a new reader instance", function() {
                    expect(proxy.getReader().isReader).toBe(true);
                });

                it("should have a reader set", function() {
                    expect(proxy.getReader().$className).toBe('Ext.data.reader.Xml');
                });
            });
        });

        describe("writer accessors", function() {
            var config,
                swriter = 'xml',
                defaultWriterType = 'xml',
                modelName = 'spec.SomeModel', model;

            beforeEach(function(){
                model = Ext.define(modelName, {
                    extend: 'Ext.data.Model',
                    fields: ['id']
                });
            });

            describe("set the proxy's writer by writer instance", function() {
                beforeEach(function(){
                    config = {
                        writer: writer
                    };
                    proxy = new ServerProxy(config); 
                });

                it("should not create a new writer instance", function() {
                    var called = false;
                    spyOn(Ext, "createByAlias").andCallFake(function(name) {
                        if (name === 'writer.json') {
                            called = false;
                        }
                    });
                    expect(called).toBe(false);
                });

                it("should have a writer set", function() {
                    expect(proxy.getWriter()).toEqual(writer);
                });
            });

            describe("set the proxy's writer by string", function() {
                beforeEach(function(){
                    config = {
                        writer: swriter,
                        model: model,
                        defaultWriterType: defaultWriterType
                    };
                    proxy = new ServerProxy(config); 
                });

                it("should create a new writer instance", function() {
                    expect(proxy.getWriter().isWriter).toBe(true);
                });

                it("should have a writer set", function() {
                    expect(proxy.getWriter().$className).toBe('Ext.data.writer.Xml');
                });
            });
        });

        describe("destroy", function(){
            var config, spy;

            beforeEach(function(){
                config = {
                    reader: reader,
                    writer: writer
                };
                proxy = new ServerProxy(config);
            });

            it('should destroy reader and writer', function(){
               spy = spyOn(Ext, "destroy");
               proxy.onDestroy();
               expect(spy).toHaveBeenCalledWith(reader, writer);
            });
        });
    });
});
