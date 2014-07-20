describe("Ext.data.validator.Format", function() {
    
    var v;
    
    function validate(value, matcher) {
        v = new Ext.data.validator.Format({
            matcher: matcher
        });
        return v.validate(value);
    }
    
    afterEach(function() {
        v = null;
    });
    
    it("should throw an exception if a matcher is not configured", function() {
        expect(function() {
            v = new Ext.data.validator.Format();
        }).toThrow();    
    });
    
    describe("invalid values", function() {
        it("should not validate if the value does match the matcher re", function() {
            expect(validate('foo', /^bar$/)).toBe(v.getMessage());
        });
    });
    
    describe("valid values", function() {
        it("should validate if the value matches the matcher re", function() {
            expect(validate('bar', /^bar$/)).toBe(true);
        });
    });
    
    describe("messages", function() {
        it("should accept a custom message", function() {
            v = new Ext.data.validator.Format({
                message: 'Foo',
                matcher: /^foo$/
            });
            expect(v.validate('bar')).toBe('Foo');
        });
    });
    
    describe("runtime changes", function() {
        it("should be able to have a new matcher applied", function() {
            v = new Ext.data.validator.Format({
                matcher: /^foo/
            });
            expect(v.validate('bar')).toBe(v.getMessage());
            v.setMatcher(/^bar/);
            expect(v.validate('bar')).toBe(true);
        });
    });
    
});
