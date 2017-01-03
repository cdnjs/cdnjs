describe("Ext.direct.PollingProvider", function() {
    var provider;
    
    function createProvider(config) {
        provider = new Ext.direct.PollingProvider(config || {
            url: '/foo',
            baseParams: { foo: 'bar' }
        });
    };
    
    beforeEach(function() {
        createProvider();
    });
    
    afterEach(function() {
        provider.disconnect();
        Ext.util.TaskManager.stopAll();
    });
    
    describe("should handle connect:", function() {
        beforeEach(function() {
            spyOn(provider, 'runPoll').andReturn();
        });
        
        it("creates poll task", function() {
            provider.connect();
            
            expect(provider.pollTask).toBeDefined();
        });
        
        it("fires 'connect' event", function() {
            var handler = jasmine.createSpy('connect handler');
            
            provider.on('connect', handler);
            provider.connect();
            
            expect(handler).toHaveBeenCalled();
        });
    });
    
    describe("should handle disconnect:", function() {
        beforeEach(function() {
            spyOn(provider, 'runPoll').andReturn();
            
            provider.connect();
        });
        
        it("destroys polling task", function() {
            provider.disconnect();
            
            expect(provider.pollTask).toBeUndefined();
        });
        
        it("fires 'disconnect' event", function() {
            var handler = jasmine.createSpy('disconnect handler');
            
            provider.on('disconnect', handler);
            provider.disconnect();
            
            expect(handler).toHaveBeenCalled();
        });
    });
    
    describe("should handle polling:", function() {
        beforeEach(function() {
            spyOn(Ext.Ajax, 'request').andReturn();
            
            provider.connect();
        });
        
        it("should fire 'beforepoll' event", function() {
            var handler = jasmine.createSpy('beforepoll handler');
            
            provider.on('beforepoll', handler);
            provider.runPoll();
            
            expect(handler).toHaveBeenCalled();
        });
        
        it("should make Ajax request if url is a string", function() {
            provider.runPoll();
            
            expect(Ext.Ajax.request).toHaveBeenCalledWith({
                url: '/foo',
                params: { foo: 'bar' },
                scope: provider,
                callback: provider.onData
            });
        });
        
        it("runs url() with baseParams when it's defined", function() {
            var handler = jasmine.createSpy('url handler');
            
            createProvider({
                url: handler,
                baseParams: { foo: 'bar' }
            });
            
            provider.runPoll();
            
            expect(handler).toHaveBeenCalledWith({ foo: 'bar' });
        });
            
        it("should fire 'poll' event", function() {
            var handler = jasmine.createSpy('poll handler');
            
            provider.on('poll', handler);
            provider.runPoll();
            
            expect(handler).toHaveBeenCalled();
        });
    });
    
    describe("should handle data:", function() {
        var handler;
        
        beforeEach(function() {
            handler = jasmine.createSpy('data handler');
            provider.on('data', handler);
        });
        
        it("fires exception when poll is unsuccessful", function() {
            provider.onData({}, false, { foo: 'bar' });
            
            var args = handler.argsForCall[0],
                ex   = new Ext.direct.ExceptionEvent({
                    data: null,
                    code: Ext.direct.Manager.exceptions.TRANSPORT,
                    message: 'Unable to connect to the server.',
                    xhr: { foo: 'bar' }
                });
            
            expect(args[1]).toEqual(ex);
        });
        
        it("doesn't fire 'data' event when dataset is empty", function() {
            spyOn(provider, 'createEvents').andCallThrough();
            
            provider.onData({}, true, {});
            
            expect(provider.createEvents).toHaveBeenCalled();
            // AND
            expect(handler).not.toHaveBeenCalled();
        });
        
        it("fires 'data' event when dataset contains events", function() {
            var Event = Ext.direct.Event,
                eventData = [{
                    type: 'event',
                    name: 'foo',
                    data: { foo: 'bar' }
                }, {
                    type: 'event',
                    name: 'bar',
                    data: null
                }, {
                    type: 'event',
                    name: 'baz',
                    data: ['foo', 'bar']
                }, {
                    type: 'event',
                    name: 'qux',
                    data: 'plugh'
                }],
                events, result;

            provider.onData({}, true, { responseText: Ext.encode(eventData) });
            
            events = Ext.Array.map(eventData, function(i) {
                return new Event(i);
            });
            
            result = Ext.Array.map(handler.argsForCall, function(i) {
                return i[1];
            });
            
            expect(result).toEqual(events);
        });
    });
    
    describe("should handle errors:", function() {
        var handler;
        
        beforeEach(function() {
            handler = jasmine.createSpy('data handler');
            provider.on('data', handler);
        });
        
        it("doesn't break on undefined response", function() {
            provider.onData({}, true, { responseText: undefined });
            
            expect(handler).not.toHaveBeenCalled();
        });
        
        it("doesn't break on null response", function() {
            provider.onData({}, true, { responseText: null });
            
            expect(handler).not.toHaveBeenCalled();
        });
        
        it("doesn't break on empty string response", function() {
            provider.onData({}, true, { responseText: '' });
            
            expect(handler).not.toHaveBeenCalled();
        });
        
        it("doesn't break on empty dataset returned", function() {
            provider.onData({}, true, { responseText: Ext.JSON.encode([]) });
            
            expect(handler).not.toHaveBeenCalled();
        });
        
        it("raises exception on garbled json response", function() {
            provider.onData({}, true, { responseText: 'invalid json' });
            
            var args = handler.argsForCall[0][1],
                xcpt = {
                    code: args.code,
                    message: args.message
                };
            
            expect(xcpt).toEqual({
                code: Ext.direct.Manager.exceptions.PARSE,
                message: "Error parsing json response: \n\n Ext.JSON.decode(): You're trying to decode an invalid JSON String: invalid json"
            });
        });
        
        it("raises exception on invalid payload data", function() {
            provider.onData({}, true, { responseText: Ext.JSON.encode({ foo: 'bar' }) });
            
            var args = handler.argsForCall[0][1],
                xcpt = {
                    code: args.code,
                    message: args.message
                };
            
            expect(xcpt).toEqual({
                code: Ext.direct.Manager.exceptions.DATA,
                message: 'Invalid data: event type is not specified'
            });
        });
        
        it("lets returned exception pass through", function() {
            var ex = {
                    type: 'exception',
                    message: 'Fubar'
                },
                data = Ext.JSON.encode(ex);
            
            provider.onData({}, true, { responseText: data });
            
            var args = handler.argsForCall[0][1],
                xcpt = {
                    type: args.type,
                    message: args.message
                };
            
            expect(handler.argsForCall.length).toBe(1);
            // AND
            expect(xcpt).toEqual(ex);
        });
    });
});
