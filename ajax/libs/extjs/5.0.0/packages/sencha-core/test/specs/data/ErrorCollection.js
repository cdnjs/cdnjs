describe("Ext.data.ErrorCollection", function() {
    var errors;

    beforeEach(function() {
        errors = new Ext.data.ErrorCollection();
    });

    describe("if valid", function() {
        it("should return true to isValid", function() {
            expect(errors.isValid()).toBe(true);
        });
    });

    describe("if not valid", function() {
        beforeEach(function() {
            errors.add('name', 'Foo');
            errors.add('email', 'Bar');
        });
    
        it("should return false to isValid", function() {
            expect(errors.isValid()).toBe(false);
        });
    
        it("should return the errors for a single field", function() {
            var getByField = errors.getByField('name');
        
            expect(getByField.length).toEqual(1);
            expect(getByField[0].field).toEqual('name');
        });
    });
});    
