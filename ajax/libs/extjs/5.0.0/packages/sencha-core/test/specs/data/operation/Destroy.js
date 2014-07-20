describe("Ext.data.operation.Destroy", function() {
    
    var op;
    
    function makeOperation(cfg) {
        op = new Ext.data.operation.Destroy(cfg);
    }
    
    afterEach(function() {
        op = null;
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.User');
    });
    
    describe("execute", function() {
        it("should call the proxy erase method and pass itself", function() {
            var proxy = new Ext.data.proxy.Proxy();
            spyOn(proxy, 'erase').andReturn(new Ext.data.Request());
            makeOperation({
                proxy: proxy
            });
            op.execute();
            expect(proxy.erase).toHaveBeenCalledWith(op);
        });
    });   
    
    describe("process", function() {
        
        var User, rec1, rec2;
        
        beforeEach(function() {
            User = Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['id', 'name']
            });
            
            rec1 = new User();
            rec2 = new User();
            
            makeOperation({
                records: [rec1, rec2]
            });
            
            spyOn(rec1, 'setErased');
            spyOn(rec2, 'setErased');
        });
        
        afterEach(function() {
            Ext.undefine('spec.User');
            User = rec1 = rec2 = null;
        });
        
        it("should erase all records if successful", function() {            
            op.process(new Ext.data.ResultSet({
                success: true
            }), new Ext.data.Request(), {});
            
            expect(rec1.setErased).toHaveBeenCalled();
            expect(rec2.setErased).toHaveBeenCalled();
        }); 
        
        it("should not erase records if not successful", function() {
            op.process(new Ext.data.ResultSet({
                success: false
            }), new Ext.data.Request(), {});
            
            expect(rec1.setErased).not.toHaveBeenCalled();
            expect(rec2.setErased).not.toHaveBeenCalled();
        });
    });
});
