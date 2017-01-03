describe("Ext.data.field.Integer", function() {

    var field;
    
    function make(cfg) {
        field = new Ext.data.field.Integer(cfg);
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
            expect(field.getType()).toBe('int');
        });    
    });
    
    describe("convert", function() {
        it("should call parseInt if passed a number", function() {
            make();
            var v;
            spyOn(window, 'parseInt').andCallFake(function(arg1) {
                v = arg1;
                return 17;
            });    
            expect(c(17.4)).toBe(17);
            expect(v).toBe(17.4);
        });
        
        describe("''/null/undefined", function() {
            describe("with allowNull: true", function() {
                beforeEach(function() {
                    make({
                        allowNull: true
                    });
                });
                
                it("should return null with ''", function() {
                    expect(c('')).toBeNull();
                });
                
                it("should return null with null", function() {
                    expect(c(null)).toBeNull();
                });  
                
                it("should return null with undefined", function() {
                    expect(c(undefined)).toBeNull();
                });    
            });
            
            describe("without allowNull: false", function() {
                beforeEach(function() {
                    make({
                        allowNull: false
                    });
                });
                
                it("should return 0 with ''", function() {
                    expect(c('')).toBe(0);
                });
                
                it("should return 0 with null", function() {
                    expect(c(null)).toBe(0);
                });  
                
                it("should return 0 with undefined", function() {
                    expect(c(undefined)).toBe(0);
                }); 
            });
        });
        
        describe("other values", function() {
            describe("invalid values", function() {
                describe("with allowNull: true", function() {
                    beforeEach(function() {
                        make({
                            allowNull: true
                        });
                    });
                    
                    it("should return null where a value can't be parsed", function() {
                        expect(c('asdf')).toBeNull();    
                    });
                });  
                
                describe("with allowNull: false", function() {
                    beforeEach(function() {
                        make({
                            allowNull: false
                        });
                    });
                    
                    it("should return NaN where a value can't be parsed", function() {
                        expect(isNaN(c('asdf'))).toBe(true);    
                    });
                });  
            });
            
            it("should parse a number string", function() {
                make();
                expect(c('34')).toBe(34);    
            });
        
            it("should parse a number string and round it", function() {
                make();
                expect(c('42.123')).toBe(42);    
            });
        });
        
        describe("stripRe", function() {
            it("should strip the value with the stripRe", function() {
                make();
                expect(c('$100,000%')).toBe(100000);
            });  
            
            it("should accept a custom stripRe", function() {
                // \u20ac = Euro symbol
                make({
                    stripRe: /\u20ac/
                });
                expect(c('\u20ac200')).toBe(200);
            });
        });
    });
    
});
