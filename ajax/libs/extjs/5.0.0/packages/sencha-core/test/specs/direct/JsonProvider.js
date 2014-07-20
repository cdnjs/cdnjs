describe("Ext.direct.JsonProvider", function() {
    var provider,
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
        }];
    
    beforeEach(function() {
        provider = new Ext.direct.JsonProvider({ id: 'foo' });
    });
    
    it("should parse encoded responses", function() {
        var text, events,
            result = [];
        
        text   = Ext.encode(eventData);
        events = provider.createEvents({ responseText: text });
        
        Ext.Array.each(events, function(e) {
            result.push({
                type: e.type,
                name: e.getName(),
                data: e.getData()
            });
        });
        
        expect(result).toEqual(eventData);
    });
    
    it("should handle already decoded responses", function() {
        var events, result;
        
        events = provider.createEvents({ responseText: Ext.merge({}, eventData[0]) });
        
        result = {
            type: events[0].type,
            name: events[0].getName(),
            data: events[0].getData()
        };
        
        expect(result).toEqual(eventData[0]);
    });
    
    it("should handle empty responses", function() {
        var events = provider.createEvents({ responseText: [] });
        
        expect(events).toEqual([]);
    });
    
    it("should handle invalid responses", function() {
        var xhr, events, result;
        
        xhr    = { responseText: 'blow up!' };
        events = provider.createEvents(xhr);
        
        result = {
            status:  events[0].status,
            xhr:     events[0].xhr,
            code:    events[0].code,
            message: events[0].message
        };
        
        expect(result).toEqual({
            status: false,
            xhr: xhr,
            code: Ext.direct.Manager.exceptions.PARSE,
            message: 'Error parsing json response: \n\n' +
                     " Ext.JSON.decode(): You're trying to decode an invalid JSON String: blow up!"
        });
    });
});
