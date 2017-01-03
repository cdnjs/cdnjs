describe("Ext.data.validator.Email", function() {
    
    var v;
    
    function validate(value) {
        v = new Ext.data.validator.Email();
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
        
        it("should not validate if the value is an empty string", function() {
            expect(validate('')).toBe(v.getMessage());
        });
        
        it("should not validate if the value doesn't contain @", function() {
            expect(validate('foobar.com')).toBe(v.getMessage());
        });
        
        it("should not validate if the value doesn't contain a domain", function() {
            expect(validate('foo@bar')).toBe(v.getMessage());
        });
    });
    
    describe("valid values", function() {
        // these could be beefed up a bit, but don't really need to enumerate all kinds of emails
        // here unless we come across specific issues.
        it("should validate an email", function() {
            expect(validate('support@sencha.com')).toBe(true);    
        });
    });
    
    describe("messages", function() {
        it("should accept a custom message", function() {
            v = new Ext.data.validator.Email({
                message: 'Foo'
            });
            expect(v.validate(undefined)).toBe('Foo');
        });
    });
    
});
