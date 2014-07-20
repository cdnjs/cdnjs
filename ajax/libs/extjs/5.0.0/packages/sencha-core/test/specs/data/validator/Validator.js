describe("Ext.data.validator.Validator", function() {
    
    var v;
    
    afterEach(function() {
        v = null;
    });
    
    describe("construction", function() {
        it("should accept a function to be the validate method", function() {
            var fn = function() {};
            v = new Ext.data.validator.Validator(fn);
            expect(v.validate).toBe(fn);        
        });
    });
    
    describe("validate", function() {
        it("should return true", function() {
            v = new Ext.data.validator.Validator();
            expect(v.validate()).toBe(true);    
        });  
    });
    
    describe("factory", function() {
        var factory = function(type, cfg) {
            return Ext.data.validator.Validator.create(Ext.apply({
                type: type
            }, cfg));
        };
        
        it("should create a presence validator", function() {
            expect(factory('presence') instanceof Ext.data.validator.Presence).toBe(true);    
        });
        
        it("should create a length validator", function() {
            expect(factory('length') instanceof Ext.data.validator.Length).toBe(true);    
        });
        
        it("should create a range validator", function() {
            expect(factory('range') instanceof Ext.data.validator.Range).toBe(true);    
        });
        
        it("should create an email validator", function() {
            expect(factory('email') instanceof Ext.data.validator.Email).toBe(true);    
        });
        
        it("should create a format validator", function() {
            expect(factory('format', {
                matcher: /foo/
            }) instanceof Ext.data.validator.Format).toBe(true);    
        });
        
        it("should create an inclusion validator", function() {
            expect(factory('inclusion', {
                list: []
            }) instanceof Ext.data.validator.Inclusion).toBe(true);    
        });
        
        it("should create an exclusion validator", function() {
            expect(factory('exclusion', {
                list: []
            }) instanceof Ext.data.validator.Exclusion).toBe(true);    
        });
        
        it("should default to base", function() {
            expect(factory('') instanceof Ext.data.validator.Validator).toBe(true);   
        });
    });
    
});
