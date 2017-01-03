describe("Ext.direct.Manager", function() {
    var Manager = Ext.direct.Manager,
        provider, handler;

    beforeEach(function() {
        provider = new Ext.direct.Provider({ id: 'foo' });
        handler  = jasmine.createSpy('event handler');
    });
    
    afterEach(function() {
        Manager.providers.clear();
        Manager.transactions.clear();
        Manager.clearListeners();
    });
    
    it("should be a singleton", function() {
        expect(Manager.isInstance).toBeTruthy();
    });
    
    describe("handles Providers:", function() {
        it("adds provider as instance", function() {
            Manager.addProvider(provider);
            
            expect(Manager.providers.getCount()).toBe(1);
        });
        
        it("adds provider as config object", function() {
            Manager.addProvider({
                id:   'bar',
                type: ''
            });
            
            expect(Manager.getProvider('bar')).toBeDefined();
        });
        
        it("subscribes to provider's 'data' event", function() {
            spyOn(Manager, 'onProviderData').andReturn();
            
            Manager.addProvider(provider);
            provider.fireEvent('data');
            
            expect(Manager.onProviderData).toHaveBeenCalled();
        });

        it("connects the provider if it's not alredy connected", function() {
            spyOn(provider, 'connect');
            
            Manager.addProvider(provider);
            
            expect(provider.connect).toHaveBeenCalled();
        });
        
        it("relays provider events if requested", function() {
            provider.relayedEvents = ['foo'];
            
            Manager.addProvider(provider);
            Manager.on('foo', handler);
            provider.fireEvent('foo');
            
            expect(handler).toHaveBeenCalled();
        });
        
        it("returns provider by id", function() {
            Manager.addProvider(provider);
            
            var p = Manager.getProvider('foo');
            
            expect(p.id).toBe('foo');
        });
        
        it("removes provider by id", function() {
            Manager.addProvider(provider);
            
            Manager.removeProvider('foo');
            
            expect(Manager.providers.getCount()).toBe(0);
        });
        
        it("removes provider by instance", function() {
            Manager.addProvider(provider);
            
            Manager.removeProvider(provider);
            
            expect(Manager.providers.getCount()).toBe(0);
        });
        
        it("stops relaying 'data' event on removed provider", function() {
            Manager.on('data', handler);
            
            Manager.addProvider(provider);
            Manager.removeProvider('foo');
            
            provider.fireEvent('data');
            
            expect(handler).not.toHaveBeenCalled();
        });
        
        it("stops relaying specified provider events on removed provider", function() {
            provider.relayedEvents = ['foo'];
            
            Manager.addProvider(provider);
            Manager.on('foo', handler);
            Manager.removeProvider(provider);
            
            provider.fireEvent('foo');
            
            expect(handler).not.toHaveBeenCalled();
        });
    });
    
    describe("handles Transactions:", function() {
        var transaction;
        
        beforeEach(function() {
            transaction = new Ext.direct.Transaction({
                provider: provider
            });
        });
        
        it("adds transaction", function() {
            Manager.addTransaction(transaction);
            
            expect(Manager.transactions.getCount()).toBe(1);
        });
        
        it("finds transaction by tid", function() {
            Manager.addTransaction(transaction);
            
            var t = Manager.getTransaction(transaction.tid);
            
            expect(t).toEqual(transaction);
        });
        
        it("finds transaction by instance", function() {
            Manager.addTransaction(transaction);
            
            var t = Manager.getTransaction(transaction);
            
            expect(t).toEqual(transaction);
        });
        
        it("removes transaction by tid", function() {
            Manager.addTransaction(transaction);
            Manager.removeTransaction(transaction.tid);
            
            expect(Manager.transactions.getCount()).toBe(0);
        });
        
        it("removes transaction by instance", function() {
            Manager.addTransaction(transaction);
            Manager.removeTransaction(transaction);
            
            expect(Manager.transactions.getCount()).toBe(0);
        });
    });
    
    // This behavior is highly debatable as it does not make a lot of sense;
    // however it is not possible to deduce original developer's intent
    // from the code so I decided to "ratify" existing functionality
    // for the sake of backwards compatibility. - AT
    describe("handles provider data:", function() {
        var event, exception, handlerFoo, handlerBar;
        
        beforeEach(function() {
            event = new Ext.direct.Event({
                name: 'foo',
                data: { foo: 'bar' }
            });
            
            exception = new Ext.direct.ExceptionEvent({
                data: 'bar is closed'
            });
            
            handlerFoo = jasmine.createSpy('handler foo');
            handlerBar = jasmine.createSpy('handler bar');
        });
        
        it("fires events with name 'event' only once", function() {
            event.name = 'event';
            
            Manager.on('event', handler);
            Manager.on('exception', handlerFoo);
            Manager.onProviderData(provider, event);
            
            expect(handler).toHaveBeenCalled();
            // AND
            expect(handlerFoo).not.toHaveBeenCalled();
        });
        
        it("fires events with name 'exception' only once", function() {
            event.name = 'exception';
            
            Manager.on('event', handler);
            Manager.on('exception', handlerFoo);
            Manager.onProviderData(provider, event);
            
            expect(handler).toHaveBeenCalled();
            // AND
            expect(handlerFoo).not.toHaveBeenCalled();
        });
        
        it("fires unnamed exceptions twice", function() {
            Manager.on('exception', handler);
            Manager.on('event', handlerFoo);
            Manager.onProviderData(provider, exception);
            
            expect(handler).toHaveBeenCalled();
            // AND
            expect(handlerFoo).toHaveBeenCalled();
        });
        
        it("fires other events twice", function() {
            Manager.on('foo', handler);
            Manager.on('event', handlerFoo);
            Manager.on('exception', handlerBar);
            Manager.onProviderData(provider, event);
            
            expect(handler).toHaveBeenCalled();
            // AND
            expect(handlerFoo).toHaveBeenCalled();
            // AND
            expect(handlerBar).not.toHaveBeenCalled();
        });
    });
    
    describe("handles method resolving:", function() {
        var api = {
            actions: {
                TestAction: [{
                    name: 'foo',
                    len: 0
                }],
                'TestAction.Foo': [{
                    name: 'bar',
                    len: 0
                }],
                'TestAction.Foo.Bar': [{
                    name: 'baz',
                    len: 0
                }],
                'TestAction.Foo.Bar.Baz': [{
                    name: 'qux',
                    len: 0
                }]
            },
            namespace: 'Direct',
            type: 'remoting',
            url: '/router'
        };
        
        function checkFn(fn) {
            return Ext.isFunction(fn);
        }
        
        beforeEach(function() {
            Manager.addProvider(api);
        });
        
        afterEach(function() {
            try {
                delete Ext.global.Direct;
            }
            catch (e) {
                Ext.global.Direct = undefined;
            }
        });
        
        it("forwards methods passed as function", function() {
            var fn = Manager.parseMethod(handler)
            
            expect(fn).toEqual(handler);
        });
        
        it("parses methods of a first level Actions", function() {
            var fn = Manager.parseMethod('Direct.TestAction.foo');
            
            expect(checkFn(fn)).toBeTruthy();
        });
        
        it("parses methods of a nested Action", function() {
            var fn = Manager.parseMethod('Direct.TestAction.Foo.bar');
            
            expect(checkFn(fn)).toBeTruthy();
        });
        
        it("parses methods of a deeply nested Action", function() {
            var fn = Manager.parseMethod('Direct.TestAction.Foo.Bar.baz');
            
            expect(checkFn(fn)).toBeTruthy();
        });
        
        it("parses methods of a really truly deeply nested Action", function() {
            var fn = Manager.parseMethod('Direct.TestAction.Foo.Bar.Baz.qux');
            
            expect(checkFn(fn)).toBeTruthy();
        });
    });
});
