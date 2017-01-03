describe("Ext.direct.Provider", function() {
    var provider;
    
    beforeEach(function() {
        provider = new Ext.direct.Provider({ id: 'foo' });
    });
    
    it("should instantiate", function() {
        expect(provider).toBeDefined();
    });
    
    it("should set isProvider property", function() {
        expect(provider.isProvider).toBe(true);
    });
    
});
