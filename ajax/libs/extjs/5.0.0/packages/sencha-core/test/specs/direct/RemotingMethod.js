describe("Ext.direct.RemotingMethod", function() {
    var cb  = jasmine.createSpy('callback'),
        opt = { timeout: 10 },
        method;
    
    function makeMethod(params) {
        method = new Ext.direct.RemotingMethod(params || {});
    }
    
    describe("Ordered parameters", function() {
        beforeEach(function() {
            makeMethod({
                name: 'foo',
                len: 2
            });
        });
        
        it("should instantiate", function() {
            expect(method).toBeDefined();
        });
        
        it("should set ordered property", function() {
            expect(method.ordered).toBe(true);
        });
        
        it("should return call data", function() {
            var data = method.getCallData(['foo', 'bar', cb, method, opt]);
            
            expect(data).toEqual({
                data: ['foo', 'bar'],
                callback: cb,
                scope: method,
                options: opt
            });
        });
    });
    
    describe("Named parameters", function() {
        beforeEach(function() {
            makeMethod({
                name: 'bar',
                params: ['foo', 'bar']
            });
        });
        
        it("should instantiate", function() {
            expect(method).toBeDefined();
        });
        
        it("should accept parameter names as array of strings", function() {
            expect(method.params).toEqual({
                foo: true,
                bar: true
            });
        });
        
        it("should accept parameter names as array of objects", function() {
            makeMethod({
                name: 'baz',
                params: [{
                    name: 'foo'
                }, {
                    name: 'bar'
                }]
            });
            
            expect(method.params).toEqual({
                foo: true,
                bar: true
            });
        });
        
        it("should return call data with less than specified params", function() {
            var data = method.getCallData([{ foo: 'foo' }, cb, method, opt]);
            
            expect(data).toEqual({
                data: {
                    foo: 'foo'
                },
                callback: cb,
                scope: method,
                options: opt
            });
        });
        
        it("should filter out unspecified params", function() {
            makeMethod({
                name: 'baz',
                params: ['foo']
            });
            
            var data = method.getCallData([{ foo: 'bar', bar: 'qux' }, cb, method, opt]);
            
            expect(data).toEqual({
                data: {
                    foo: 'bar'
                },
                callback: cb,
                scope: method,
                options: opt
            });
        });
        
        it("should not filter params with strict: false", function() {
            makeMethod({
                name: 'blerg',
                params: [],
                strict: false
            });
            
            var data = method.getCallData([{ foo: 'bar', qux: 'fred' }, cb, method, opt]);
            
            expect(data).toEqual({
                data: {
                    foo: 'bar',
                    qux: 'fred',
                },
                callback: cb,
                scope: method,
                options: opt
            });
        });
    });
});
