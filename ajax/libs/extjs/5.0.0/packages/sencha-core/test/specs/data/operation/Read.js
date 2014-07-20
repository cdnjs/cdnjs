describe("Ext.data.operation.Read", function() {
    
    var op;
    
    function makeOperation(cfg) {
        op = new Ext.data.operation.Read(cfg);
    }
    
    afterEach(function() {
        op = null;
    });
    
    describe("execute", function() {
        it("should call the proxy read method and pass itself", function() {
            var proxy = new Ext.data.proxy.Proxy();
            spyOn(proxy, 'read').andReturn(new Ext.data.Request());
            makeOperation({
                proxy: proxy
            });
            op.execute();
            expect(proxy.read).toHaveBeenCalledWith(op);
        });
    });    
});
