describe("Ext.data.identifier.Sequential", function() {
    var idgen;
    
    function make(cfg) {
        idgen = new Ext.data.identifier.Sequential(cfg);
    }
    
    afterEach(function() {
        idgen = null;
    });
    
    describe("defaults", function() {
        beforeEach(function() {
            make(); 
        });
        
        it("should default prefix to null", function() {
            expect(idgen.getPrefix()).toBeNull();
        });
        
        it("should default seed to 1", function() {
            expect(idgen.getSeed()).toBe(1);
        });
    });
    
    describe("generating", function() {
        it("should generate in sequence", function() {
            make();
            expect(idgen.generate()).toBe(1);
            expect(idgen.generate()).toBe(2);
            expect(idgen.generate()).toBe(3);
            expect(idgen.generate()).toBe(4);
        });  
        
        it("should generate with a prefix", function() {
            make({
                prefix: 'foo'
            });    
            expect(idgen.generate()).toBe('foo1');
            expect(idgen.generate()).toBe('foo2');
            expect(idgen.generate()).toBe('foo3');
            expect(idgen.generate()).toBe('foo4');
        });
        
        it("should generate with a custom seed", function() {
            make({
                seed: 103
            });    
            expect(idgen.generate()).toBe(103);
            expect(idgen.generate()).toBe(104);
            expect(idgen.generate()).toBe(105);
            expect(idgen.generate()).toBe(106);
        });
        
        it("should generate with a custom prefix & seed", function() {
            make({
                prefix: 'foo',
                seed: 103
            });    
            expect(idgen.generate()).toBe('foo103');
            expect(idgen.generate()).toBe('foo104');
            expect(idgen.generate()).toBe('foo105');
            expect(idgen.generate()).toBe('foo106');
        });
    });
});
