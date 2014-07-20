describe("Ext.data.validator.Presence", function() {
    
    var v;
    
    function validate(value) {
        v = new Ext.data.validator.Presence();
        return v.validate(value);
    }
    
    afterEach(function() {
        v = null;
    });
    
    describe("invalid values", function() {
        it("should not validate if the value is undefined", function() {
            expect(validate(undefined)).toBe(v.getMessage());
        });
    
        it("should not validate if the value is null", function() {
            expect(validate(null)).toBe(v.getMessage());
        });
    });
    
    describe("valid values", function() {
        it("should validate if passed an empty string", function() {
            expect(validate('')).toBe(true);
        });
        
        it("should validate if passed false", function() {
            expect(validate(false)).toBe(true);
        });
        
        it("should validate if passed 0", function() {
            expect(validate(0)).toBe(true);
        });
        
        it("should validate a string", function() {
            expect(validate('foo')).toBe(true);    
        });
        
        it("should validate a number", function() {
            expect(validate(100)).toBe(true);    
        });
        
        it("should validate an array", function() {
            expect(validate([])).toBe(true);    
        });
        
        it("should validate an object", function() {
            expect(validate({})).toBe(true);    
        });
        
        it("should validate a date", function() {
            expect(validate(new Date())).toBe(true);    
        });
    });
    
    describe("messages", function() {
        it("should accept a custom message", function() {
            v = new Ext.data.validator.Presence({
                message: 'Foo'
            });
            expect(v.validate(undefined)).toBe('Foo');
        });
    });
    
});
