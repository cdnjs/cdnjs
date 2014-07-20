describe("Ext.data.Request", function() {
    var Request = Ext.data.Request;

    describe("instantiation", function(){
        var action = 'create',
            config = {
                action: action
            };

        it("should have correct configuration options", function(){
            var request = new Request();
            expect(request.getAction()).toBeUndefined();
            expect(request.getParams()).toBeUndefined();
            expect(request.getMethod()).toEqual('GET');
            request = null;
        });
    });
});
