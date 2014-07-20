describe("Ext.direct.Transaction", function() {
    var transaction, provider;
    
    beforeEach(function() {
        provider = {
            queueTransaction: jasmine.createSpy('provider.queueTransaction')
        };
        
        transaction = new Ext.direct.Transaction({
            provider: provider
        });
    });
    
    it("can instantiate", function() {
        expect(transaction).toBeDefined();
    });
    
    it("increments transaction id", function() {
        expect(transaction.tid).toBeGreaterThan(0);
    });
    
    it("sends", function() {
        transaction.send();
        
        expect(provider.queueTransaction).toHaveBeenCalled();
    });
    
    it("retries", function() {
        transaction.retry();
        
        expect(provider.queueTransaction).toHaveBeenCalled();
        // AND
        expect(transaction.retryCount).toBe(1);
    });
    
    it("returns provider", function() {
        var p = transaction.getProvider();
        
        expect(p).toEqual(provider);
    });
});