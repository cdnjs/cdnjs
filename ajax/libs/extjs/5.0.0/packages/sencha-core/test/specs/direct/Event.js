describe("Ext.direct.Event", function() {
    var event;
    
    describe("Event", function() {
        beforeEach(function() {
            event = new Ext.direct.Event({
                name: 'foo',
                data: {
                    foo: 'bar'
                }
            });
        });
        
        it("should instantiate", function() {
            expect(event).toBeDefined();
        });
        
        it("should have true status", function() {
            expect(event.status).toBe(true);
        });

        it("should return name with getName()", function() {
            var name = event.getName();
            
            expect(name).toBe('foo');
        });
        
        it("should return data with getData()", function() {
            var data = event.getData();
            
            expect(data).toEqual({ foo: 'bar' });
        });
    });
    
    describe("ExceptionEvent", function() {
        beforeEach(function() {
            event = new Ext.direct.ExceptionEvent({
                name: 'bar',
                data: {
                    bar: 'baz'
                }
            });
        });
        
        it("should instantiate", function() {
            expect(event).toBeDefined();
        });
        
        it("should have false status", function() {
            expect(event.status).toBe(false);
        });
    });
    
    describe("RemotingEvent", function() {
        var transaction;
        
        beforeEach(function() {
            transaction = new Ext.direct.Transaction({
                provider: {}
            });
            
            Ext.direct.Manager.addTransaction(transaction);
        });
        
        afterEach(function() {
            Ext.direct.Manager.removeTransaction(transaction);
        });
        
        it("returns transaction directly", function() {
            event = new Ext.direct.RemotingEvent({
                name: 'baz',
                data: {
                    baz: 'qux'
                },
                transaction: transaction
            });
            
            var tr = event.getTransaction();
            
            expect(tr).toEqual(transaction);
        });
        
        it("returns transaction by tid", function() {
            event = new Ext.direct.RemotingEvent({
                name: 'baz',
                data: {
                    baz: 'qux'
                },
                tid: transaction.tid
            });
            
            var tr = event.getTransaction();
            
            expect(tr).toEqual(transaction);
        });
    });
});