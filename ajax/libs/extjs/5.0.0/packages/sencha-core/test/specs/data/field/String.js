describe("Ext.data.field.String", function() {

    var field;
    
    function make(cfg) {
        field = new Ext.data.field.String(cfg);
    }
    
    function c(v) {
        return field.convert(v);
    }
    
    afterEach(function() {
        field = null;
    });
    
    describe("defaults", function() {
        it("should configure the type", function() {
            make();
            expect(field.getType()).toBe('string');
        });    
    });
    
    describe("convert", function() {
        describe("with allowNull: true", function() {
            beforeEach(function() {
               make({
                   allowNull: true
               });
            });    
            
            it("should return null with undefined", function() {
                expect(c(undefined)).toBeNull();    
            });
            
            it("should return null with null", function() {
                expect(c(null)).toBeNull();    
            });
        });
        
        describe("with allowNull: false", function() {
            beforeEach(function() {
               make({
                   allowNull: false
               });
            });
            
            it("should return '' with undefined", function() {
                expect(c(undefined)).toBe('');    
            });
            
            it("should return null with null", function() {
                expect(c(null)).toBe('');    
            });    
        });
        
        it("should return a stringified bool", function() {
            make();
            expect(c(true)).toBe('true');
        });
        
        it("should return a stringified number", function() {
            make();
            expect(c(2)).toBe('2');    
        });
        
        it("should return a string", function() {
            make();
            expect(c('foo')).toBe('foo');    
        });
    });
});