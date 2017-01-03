describe("Ext.data.proxy.Ajax", function() {
    var proxy;
    
    function makeProxy(cfg) {
        cfg = cfg || {};
        cfg = Ext.applyIf(cfg, {
            url: '/foo'
        });
        proxy = new Ext.data.proxy.Ajax(cfg);
    }

    afterEach(function() {
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.Company');
        proxy = null;
    });

    describe("instantiation", function() {
        beforeEach(function() {
            makeProxy();
        });
        
        it("should extend Ext.data.proxy.Server", function() {
            expect(proxy.superclass).toBe(Ext.data.proxy.Server.prototype);
        });

        it("should have correct actionMethods", function() {
            expect(proxy.getActionMethods()).toEqual({
                create : "POST",
                read   : "GET",
                update : "POST",
                destroy: "POST"
            });
        });
    });
    
    describe("parameters", function() {
        var ajax, operation;
        beforeEach(function() {
            spyOn(Ext.Ajax, 'request').andCallFake(function(o) {
                ajax = o;
            });
            operation = new Ext.data.operation.Read();
        });
        
        afterEach(function(){
            ajax = operation = null;
        });
        
        describe("binary", function() {
            it("should default to binary false", function() {
                makeProxy();
                proxy.read(operation);
                expect(ajax.binary).toBe(false);
            });
            
            it("should pass binary when set on the proxy", function() {
                makeProxy({
                    binary: true
                });
                proxy.read(operation);
                expect(ajax.binary).toBe(true);
            });
        });
        
        describe("headers", function() {
            it("should default to no headers", function() {
                makeProxy();
                proxy.read(operation);
                expect(ajax.headers).toBeUndefined();
            });
            
            it("should pass headers", function() {
                makeProxy({
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
                proxy.read(operation);
                expect(ajax.headers).toEqual({
                    'Content-Type': 'text/plain'
                });
            });
        });
        
        describe("timeout", function() {
            it("should use the default timeout", function() {
                makeProxy();
                proxy.read(operation);
                expect(ajax.timeout).toBe(proxy.getTimeout());
            });
            
            it("should use a passed timeout", function() {
                makeProxy({
                    timeout: 1000
                });
                proxy.read(operation);
                expect(ajax.timeout).toBe(1000);
            });
        });
        
        describe("useDefaultXhrHeader", function() {
            it("should default to true", function() {
                makeProxy();
                proxy.read(operation);
                expect(ajax.useDefaultXhrHeader).toBe(true);
            });
            
            it("should pass along useDefaultXhrHeader", function() {
                makeProxy({
                    useDefaultXhrHeader: true
                });
                proxy.read(operation);
                expect(ajax.useDefaultXhrHeader).toBe(true);
            });
        });
        
        describe("withCredentials", function() {
            it("should default to false", function() {
                makeProxy();
                proxy.read(operation);
                expect(ajax.withCredentials).toBe(false);
            });
            
            it("should should pass the username/password", function() {
                makeProxy({
                    withCredentials: true,
                    username: 'foo',
                    password: 'bar'
                });
                proxy.read(operation);
                expect(ajax.withCredentials).toBe(true);
                expect(ajax.username).toBe('foo');
                expect(ajax.password).toBe('bar');
            });
        });
        
        describe("paramsAsJson", function(){
            it("should always send as params when using get", function(){
                proxy = new Ext.data.proxy.Ajax({
                    url: 'fake',
                    paramsAsJson: true
                });
                operation.setParams({
                    id: 1
                });
                proxy.read(operation);
                expect(ajax.params.id).toBe(1);
                expect(ajax.jsonData).toBeUndefined();
            });

            it("should send as params when paramsAsJson is false", function(){
                proxy = new Ext.data.proxy.Ajax({
                    url: 'fake',
                    paramsAsJson: false
                });
                operation = new Ext.data.operation.Create();
                operation.setParams({
                    id: 1
                });
                proxy.create(operation);
                expect(ajax.params.id).toBe(1);
                expect(ajax.jsonData).toBeUndefined();
            });

            it("should send as jsonData with non-get action and paramsAsJson: true", function(){
                proxy = new Ext.data.proxy.Ajax({
                    url: 'fake',
                    paramsAsJson: true
                });
                operation = new Ext.data.operation.Create();
                operation.setParams({
                    id: 1
                });
                proxy.create(operation);
                expect(ajax.jsonData).toEqual({
                    id: 1
                });
                expect(ajax.params).toBeUndefined();
            });

            it("should not overwrite existing jsonData, but merge them", function() {
                proxy = new Ext.data.proxy.Ajax({
                    url: 'fake',
                    paramsAsJson: true,
                    writer: {
                        type: 'json',
                        writeRecordId: false
                    }
                });
                var Model = Ext.define(null, {
                    extend: 'Ext.data.Model',
                    fields: ['name']
                });

                operation = new Ext.data.operation.Create({
                    records: [new Model({
                        name: 'X'
                    })]
                });
                operation.setParams({
                    foo: 1
                });
                proxy.create(operation);
                expect(ajax.jsonData).toEqual({
                    name: 'X',
                    foo: 1
                });
            });
        });
    });
    
    describe("request result", function() {
        var operation, request;
        function complete(status, statusText, responseText) {
            Ext.Ajax.mockComplete({
                status: status || 200,
                statusText: statusText || '',
                responseText: responseText || '{"success": true, "data": []}'
            });
        }
        
        beforeEach(function() {
            Ext.define('spec.AjaxModel', {
                extend: 'Ext.data.Model',
                fields: ['id']
            });
            
            MockAjaxManager.addMethods();
            operation = new Ext.data.operation.Read();
            makeProxy({
                model: spec.AjaxModel,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    successProperty: 'success'
                }
            });
        });
        
        afterEach(function() {
            request = operation = null;
            MockAjaxManager.removeMethods();
            Ext.undefine('spec.AjaxModel');
        });
        
        describe("successful request", function() {
            it("should call afterRequest with the request & the success status", function() {
                request = proxy.read(operation);
                spyOn(proxy, 'afterRequest');
                complete(200);
                expect(proxy.afterRequest).toHaveBeenCalledWith(request, true);
            });
            
            describe("reader success", function() {
                it("should process the operation", function() {
                    proxy.read(operation);
                    spyOn(operation, 'process');
                    complete(200);
                    expect(operation.process).toHaveBeenCalled();
                });
                
                it("should not fire the exception event", function() {
                    var spy = jasmine.createSpy();
                    proxy.on('exception', spy);
                    proxy.read(operation);
                    complete(200);
                    expect(spy).not.toHaveBeenCalled();
                });
            });
            
            describe("reader failure", function() {
                it("should process the operation", function() {
                    spyOn(operation, 'process');
                    proxy.read(operation);
                    complete(200, '', '{"success": false}');
                    expect(operation.process).toHaveBeenCalled();
                });
                
                it("should fire the exception event", function() {
                    var spy = jasmine.createSpy();
                    proxy.on('exception', spy);
                    proxy.read(operation);
                    complete(200, '', '{"success": false}');
                    var args = spy.mostRecentCall.args;
                    expect(args[0]).toBe(proxy);
                    expect(args[1].responseText).toBe('{"success": false}');
                    expect(args[2]).toBe(operation);
                });
            });
        });
        
        describe("failed request", function() {
            it("should call afterRequest with the request & the success status", function() {
                request = proxy.read(operation);
                spyOn(proxy, 'afterRequest');
                complete(500);
                expect(proxy.afterRequest).toHaveBeenCalledWith(request, false);
            });
            
            describe("server error", function() {
                beforeEach(function() {
                    proxy.read(operation);
                });
                
                it("should set an exception on the operation", function() {
                    complete(500, 'failStatus');
                    expect(operation.wasSuccessful()).toBe(false);
                    expect(operation.getError()).toEqual({
                        status: 500,
                        statusText: 'failStatus',
                        response: jasmine.any(Object)
                    });
                });
                
                it("should fire the exception event and pass the proxy, response & operation", function() {
                    var spy = jasmine.createSpy();
                    proxy.on('exception', spy);
                    complete(500, '', 'someResponse');
                    var args = spy.mostRecentCall.args;
                    expect(args[0]).toBe(proxy);
                    expect(args[1].responseText).toBe('someResponse');
                    expect(args[2]).toBe(operation);
                });
            });
            
            describe("timeout", function() {
                it("should set an exception on the operation", function() {
                    proxy.setTimeout(1);
                    request = proxy.read(operation);
                    waitsFor(function() {
                        return operation.isComplete();
                    }, "Operation never completed");
                    
                    runs(function() {
                        expect(operation.wasSuccessful()).toBe(false);
                        expect(operation.getError()).toEqual({
                            status: 0,
                            statusText: 'communication failure',
                            response: jasmine.any(Object)
                        });
                    });
                });
                
                it("should fire the exception event and pass the proxy, response & operation", function() {
                    var spy = jasmine.createSpy();
                    proxy.on('exception', spy);
                    
                    proxy.setTimeout(1);
                    request = proxy.read(operation);
                    
                    waitsFor(function() {
                        return operation.isComplete();
                    }, "Operation never completed");
                    
                    runs(function() {
                        var args = spy.mostRecentCall.args;
                        expect(args[0]).toBe(proxy);
                        expect(args[1].statusText).toBe('communication failure');
                        expect(args[2]).toBe(operation);
                    });
                });
            });
        });
    });

    describe("getMethod", function(){
        var request;
        beforeEach(function() {
            makeProxy();
            request = new Ext.data.Request({
                url: "/",
                action: "read"
            });
        });

        it("should return the HTTP method name for a given request", function() {
            expect(proxy.getMethod(request)).toBe('GET');
        });
        
        it("should return a the default action method if the actionMethods property is overridden", function() {
            proxy.setActionMethods({
                update: 'PUT'    
            });
            expect(proxy.getMethod(request)).toBe('GET');
        });
        
        it("should return a value when actionMethods is undefined/null", function() {
            proxy.setActionMethods(undefined);
            expect(proxy.getMethod(request)).toBe('GET');
        });
    });
});
