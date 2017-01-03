describe("Ext.data.operation.Operation", function() {
    
    var op;
    
    function makeOperation(cfg) {
        // Create an instance of the abstract class, since it can still
        // operate as long as we don't execute it.
        op = new Ext.data.operation.Operation(cfg);
    }
    
    afterEach(function() {
        op = null;
    });
    
    describe("state", function() {
        describe("initial state", function() {
            beforeEach(function() {
                makeOperation();
            });    
            
            it("should not be started", function() {
                expect(op.isStarted()).toBe(false);
            });
            
            it("should not be running", function() {
                expect(op.isRunning()).toBe(false);    
            });
            
            it("should not be complete", function() {
                expect(op.isComplete()).toBe(false);    
            });
            
            it("should not be successful", function() {
                expect(op.wasSuccessful()).toBe(false);    
            });
            
            it("should have no error", function() {
                expect(op.getError()).toBeUndefined();   
            });
            
            it("should have no exception", function() {
                expect(op.hasException()).toBe(false);    
            });
        });  
        
        describe("starting", function() {
            beforeEach(function() {
                makeOperation();
                op.execute();
            });    
            
            it("should be started", function() {
                expect(op.isStarted()).toBe(true);
            });
            
            it("should be running", function() {
                expect(op.isRunning()).toBe(true);    
            });
            
            it("should not be complete", function() {
                expect(op.isComplete()).toBe(false);    
            });
            
            it("should not be successful", function() {
                expect(op.wasSuccessful()).toBe(false);    
            });
            
            it("should have no error", function() {
                expect(op.getError()).toBeUndefined();   
            });
            
            it("should have no exception", function() {
                expect(op.hasException()).toBe(false);    
            });
        });
        
        describe("completing successfully", function() {
            beforeEach(function() {
                makeOperation();
                op.execute();
                op.setSuccessful(true);    
            });
            
            it("should be started", function() {
                expect(op.isStarted()).toBe(true);
            });
            
            it("should not be running", function() {
                expect(op.isRunning()).toBe(false);    
            });
            
            it("should be complete", function() {
                expect(op.isComplete()).toBe(true);    
            });
            
            it("should be successful", function() {
                expect(op.wasSuccessful()).toBe(true);    
            });
            
            it("should have no error", function() {
                expect(op.getError()).toBeUndefined();   
            });
            
            it("should have no exception", function() {
                expect(op.hasException()).toBe(false);    
            });    
        });
        
        describe("completing with failure", function() {
            beforeEach(function() {
                makeOperation();
                op.execute();
                op.setException('Failed');    
            });
            
            it("should be started", function() {
                expect(op.isStarted()).toBe(true);
            });
            
            it("should not be running", function() {
                expect(op.isRunning()).toBe(false);    
            });
            
            it("should be complete", function() {
                expect(op.isComplete()).toBe(true);    
            });
            
            it("should not be successful", function() {
                expect(op.wasSuccessful()).toBe(false);    
            });
            
            it("should have the passed error", function() {
                expect(op.getError()).toBe('Failed');   
            });
            
            it("should have an exception", function() {
                expect(op.hasException()).toBe(true);    
            });    
        });
    });
    
    describe("aborting", function() {
        var proxy, request;
        
        beforeEach(function() {
            proxy = new Ext.data.proxy.Proxy();
            makeOperation({
                proxy: proxy
            });
            op.doExecute = function() {
                request = new Ext.data.Request();
                return request;    
            };
            spyOn(proxy, 'abort');
        });
        
        afterEach(function() {
            proxy = request = null;
        });
        
        it("should not call if the operation has not started", function() {
            op.abort();
            expect(proxy.abort).not.toHaveBeenCalled();
        });
        
        it("should not call if the operation has been completed", function() {
            op.execute();
            op.setSuccessful(true);
            op.abort();
            expect(proxy.abort).not.toHaveBeenCalled();
        });
        
        it("should padss the request for this operation to abort", function() {
            op.execute();
            op.abort();
            expect(proxy.abort).toHaveBeenCalledWith(request);    
        });
    });
    
    describe("callbacks", function() {
        it("should trigger when setting completed", function() {
            var called = false;
            makeOperation({
                callback: function() {
                    called = true;
                }
            });
            op.execute();
            op.setSuccessful(true);
            expect(called).toBe(true);
        });
        
        it("should trigger when setting an exception", function() {
            var called = false;
            makeOperation({
                callback: function() {
                    called = true;
                }
            });
            op.execute();
            op.setException('Failed');
            expect(called).toBe(true);
        });
        
        it("should default the scope to the operation", function() {
            var scope;
            makeOperation({
                callback: function() {
                    scope = this;
                }
            });
            op.execute();
            op.setSuccessful(true);
            expect(scope).toBe(op);
        });
        
        it("should use a passed scope", function() {
            var o = {},
                scope;
                
            makeOperation({
                scope: o,
                callback: function() {
                    scope = this;
                }
            });
            op.execute();
            op.setSuccessful(true);
            expect(scope).toBe(o);
        });
        
        it("should pass the records, operation and success state", function() {
            var callback = jasmine.createSpy();
            makeOperation({
                callback: callback
            });    
            op.execute();
            op.setSuccessful(true);
            expect(callback).toHaveBeenCalledWith(op.getRecords(), op, true);
        });
    });
    
    describe("process", function() {
        var empty = Ext.data.reader.Reader.prototype.nullResultSet,
            response, request, resultSet, Model;
        
        beforeEach(function() {
            Model = Ext.define(null, {
                extend: 'Ext.data.Model',
                fields: ['id']
            });
            
            response = {};
            request = new Ext.data.Request();
            makeOperation();
            op.setRecords([new Model()]);
        });
        
        afterEach(function() {
            Model = response = request = resultSet = null;    
        });
        
        it("should set the resultSet", function() {
            op.process(empty, request, response);
            expect(op.getResultSet()).toBe(empty);
        });
        
        it("should set the response", function() {
            op.process(empty, request, response);
            expect(op.getResponse()).toBe(response);
        });
        
        describe("result set with success: false", function() {
            it("should set an exception ", function() {
                op.process(new Ext.data.ResultSet({
                    success: false
                }), request, response);    
                expect(op.hasException()).toBe(true);
                expect(op.wasSuccessful()).toBe(false);
            });
        
            it("should set the error to the message returned by the result set", function() {
                op.process(new Ext.data.ResultSet({
                    success: false,
                    message: 'Failed'
                }), request, response);    
                expect(op.getError()).toBe('Failed');
            });
        });
        
        describe("result set with success: true", function() {
            it("should set success if the result set is successful", function() {
                op.process(empty, request, response);
                expect(op.wasSuccessful()).toBe(true);    
            });
        
            it("should call doProcess", function() {
                spyOn(op, 'doProcess');
                op.process(empty, request, response);
                expect(op.doProcess).toHaveBeenCalledWith(empty, request, response);   
            });
        });
    });
    
    describe("retrying an operation", function() {
        beforeEach(function() {
            makeOperation();
            op.doExecute = function() {
                return new Ext.data.Request();
            };
            op.setException('Err');
            op.execute();
        });   
        
        it("should clear any error", function() {
            expect(op.getError()).toBeUndefined();
        });   
        
        it("should clear the success flag", function() {
            expect(op.wasSuccessful()).toBe(false);
        });  
        
        it("should clear the complete flag", function() {
            expect(op.isComplete()).toBe(false);    
        });
        
        it("should clear the exception flag", function() {
            expect(op.hasException()).toBe(false);    
        });
    });
    
});
