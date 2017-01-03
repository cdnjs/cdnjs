describe("Ext.data.identifier.Generator", function() {
    
    var Generator = Ext.data.identifier.Generator,
        idgen;
    
    afterEach(function() {
        idgen = null;
        Generator.all = {
            uuid: Generator.all.uuid
        };
    });
    
    describe("factory", function() {
        describe("creating", function() {
            describe("sequential", function() {
                var Sequential = Ext.data.identifier.Sequential;
                it("should create a with a string", function() {
                    idgen = Ext.Factory.dataIdentifier('sequential');
                    expect(idgen instanceof Sequential);
                });
                
                it("should create a with a config", function() {
                    idgen = Ext.Factory.dataIdentifier({
                        type: 'sequential'
                    });
                    expect(idgen instanceof Sequential);
                });
                
                it("should return the same instance", function() {
                    idgen = new Sequential();
                    expect(Ext.Factory.dataIdentifier(idgen)).toBe(idgen);
                });
                
                it("should return an existing id", function() {
                    idgen = new Sequential({id: 'foo'});
                    expect(Ext.Factory.dataIdentifier('foo')).toBe(idgen);    
                });
            });
            
            describe("uuid", function() {
                var Uuid = Ext.data.identifier.Uuid;
                
                it("should create with a string", function() {
                    idgen = Ext.Factory.dataIdentifier('uuid');
                    expect(idgen instanceof Uuid);
                });
                
                it("should create a with a config", function() {
                    idgen = Ext.Factory.dataIdentifier({
                        type: 'uuid'
                    });
                    expect(idgen instanceof Uuid);
                });
                
                it("should return the same instance", function() {
                    idgen = new Uuid();
                    expect(Ext.Factory.dataIdentifier(idgen)).toBe(idgen);
                });
                
                it("should return an existing id", function() {
                    idgen = new Uuid({id: 'foo'});
                    expect(Ext.Factory.dataIdentifier('foo')).toBe(idgen);    
                });
            });
        });
    });
    
});
