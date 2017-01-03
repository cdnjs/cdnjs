describe("Ext.data.proxy.Client", function() {
    var proxy;

    beforeEach(function() {
        proxy = new Ext.data.proxy.Client();
    });

    it("should extend Ext.data.proxy.Proxy", function() {
        expect(proxy.superclass).toEqual(Ext.data.proxy.Proxy.prototype);
    });

    it("should throw an error on clear", function() {
        expect(function() {proxy.clear();}).toRaiseExtError();
    });
});
