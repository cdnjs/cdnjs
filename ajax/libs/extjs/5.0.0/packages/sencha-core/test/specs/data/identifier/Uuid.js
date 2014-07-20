describe("Ext.data.identifier.Uuid", function() {
    
    var Generator = Ext.data.identifier.Generator,
        idgen;
    
    function make(cfg) {
        idgen = new Ext.data.identifier.Uuid(cfg);
    }
    
    afterEach(function() {
        idgen = null;
        // Purposefully NOT clearing the cache here, since the global
        // uuid gets created.
        Generator.all = {
            uuid: Ext.data.identifier.Uuid.Global
        };
    });
    
    describe("defaults", function() {
        it("should create a global instance with the id 'uuid", function() {
            expect(Ext.Factory.dataIdentifier('uuid') instanceof Ext.data.identifier.Uuid).toBe(true);
        });
    });
    
    it("should allow creation of a new instance", function() {
        make({
            id: 'foo'
        });    
        expect(Ext.Factory.dataIdentifier('foo')).toBe(idgen);
        expect(Ext.Factory.dataIdentifier('uuid')).not.toBe(idgen);
    });
    
    describe("generate", function() {
        it("should be able to generate version 1 ids", function() {
            make({
                version: 1,
                clockSeq: 0x3123,
                // &~0x100 turns off multicast (which must be ON in the result)
                salt: { hi: 0xDEAD & ~0x0100, lo: 0xBADBEEF },
                timestamp: { hi: 0xDEFACED, lo: 0xBADF00D }
            });
            
            //                                  time_mid      clock_hi (low 6 bits)
            //                         time_low     | time_hi |clock_lo
            //                             |        |     |   || salt[0]
            //                             |        |     |   ||   | salt[1..5]
            //                             v        v     v   vv   v v
            expect(idgen.generate()).toBe('0badf00d-aced-1def-b123-dfad0badbeef');
            //                                           ^    ^     ^
            //                                     version    |     multicast (low bit)
            //                                                |
            //                                             reserved (upper 2 bits)

            expect(idgen.generate()).toBe('0badf00e-aced-1def-b123-dfad0badbeef');
        });
        
        it('should generate Version 4 uuids', function () {
            make();
            
            // 2fc0fdf4-d127-4db1-a47e-7b4bc2fb8d5a           
            var guidRegex = /[0-9a-f]{8}(\-[0-9a-f]{4}){3}\-[0-9a-f]{12}/;

            var id1 = idgen.generate(),
                id2 = idgen.generate();
                
            expect(id1).toMatch(guidRegex);
            expect(id2).toMatch(guidRegex);

            expect(id1.charAt(14)).toEqual('4');
            expect(id2.charAt(14)).toEqual('4');
        });
    });
    
});
