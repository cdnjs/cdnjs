describe("Ext.data.field.Boolean", function() {

    var field;

    function make(cfg) {
        field = new Ext.data.field.Boolean(cfg);
    }
    
    function c(value) {
        return field.convert(value);
    }
    
    afterEach(function() {
        field = null;
    });
    
    describe("defaults", function() {
        it("should configure the type", function() {
            make();
            expect(field.getType()).toBe('bool');
        });    
    });
    
    describe("convert", function() {
        
        it("should return true if passed true", function (){
            make();
            expect(c(true)).toBe(true);    
        });
        
        it("should return false if passed false", function (){
            make();
            expect(c(false)).toBe(false);    
        });
        
        describe("truth matching", function() {
            beforeEach(function() {
                make();
            });
            it("should return true if passed 'true'", function() {
                expect(c('true')).toBe(true);
            });
            
            it("should return true if passed 'TRUE'", function() {
                expect(c('TRUE')).toBe(true);
            });   
            
            it("should return true if passed 'yes'", function() {
                expect(c('yes')).toBe(true);
            }); 
            
            it("should return true if passed 'YES'", function() {
                expect(c('YES')).toBe(true);
            }); 
            
            it("should return true if passed 'on'", function() {
                expect(c('on')).toBe(true);
            }); 
            
            it("should return true if passed 'ON'", function() {
                expect(c('ON')).toBe(true);
            }); 
            
            it("should return true if passed 1", function() {
                expect(c(1)).toBe(true);
            }); 
            
            it("should return true if passed '1'", function() {
                expect(c('1')).toBe(true);
            }); 
            
            it("should return false for undefined", function() {
                expect(c(undefined)).toBe(false);    
            });
            
            it("should return false for null", function() {
                expect(c(null)).toBe(false);    
            });
            
            it("should return false for ''", function() {
                expect(c('')).toBe(false);    
            });
            
            it("should return false for 0", function() {
                expect(c(0)).toBe(false);    
            });
            
            it("should return false for '0'", function() {
                expect(c('0')).toBe(false);    
            });
            
            it("should return false for other truthy values", function() {
                expect(c('foo')).toBe(false);
                expect(c(100)).toBe(false);
                expect(c([1, 2, 3])).toBe(false);
                expect(c(new Date())).toBe(false);
                expect(c({foo: true})).toBe(false);    
            });
        });
        
        describe("allowNull", function() {
            beforeEach(function() {
                make({
                    allowNull: true
                })
            });    
            
            it("should return null if passed undefined", function() {
                expect(c(undefined)).toBe(null);    
            });
            
            it("should return null if passed null", function() {
                expect(c(null)).toBe(null);    
            });
            
            it("should return null if passed ''", function() {
                expect(c('')).toBe(null);    
            });
            
        });
    });
    
});
