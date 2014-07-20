describe("Ext.data.validator.Length", function() {
    
    var v;
    
    function validate(value, min, max) {
        v = new Ext.data.validator.Length({
            min: min,
            max: max
        });
        return v.validate(value);
    }
    
    function f() {
        return Ext.String.format.apply(Ext.String, arguments);
    }
    
    afterEach(function() {
        v = null;
    });
    
    describe("invalid values", function() {
        it("should not validate undefined", function() {
            expect(validate(undefined)).toBe(v.getEmptyMessage());    
        });
        
        it("should not validate null", function() {
            expect(validate(null)).toBe(v.getEmptyMessage());    
        });
        
        describe("min only", function() {
            it("should not validate if the value is less than the minimum", function() {
                var min = 5;
                expect(validate('Foo', min)).toBe(f(v.getMinOnlyMessage(), min));    
            });
        });
        
        describe("max only", function() {
            it("should not validate if the value is greater than the maximum", function() {
                var max = 3;
                expect(validate('LongValue', undefined, max)).toBe(f(v.getMaxOnlyMessage(), max));    
            });
        });
        
        describe("min & max", function() {
            var min = 5, 
                max = 10;
                
            it("should not validate if the value is less than the minimum", function() {
                expect(validate('Foo', min, max)).toBe(f(v.getBothMessage(), min, max));    
            });
            
            it("should not validate if the value is greater than the maximum", function() {
                expect(validate('ReallyLongValue', min, max)).toBe(f(v.getBothMessage(), min, max));    
            });
        });
    });
    
    describe("valid values", function() {
        describe("min only", function() {
            it("should validate if the value is equal to the minimum", function() {
                expect(validate('Foo', 3)).toBe(true);
            });  
            
            it("should validate if the value is greater than the minimum", function() {
                expect(validate('FooBar', 5)).toBe(true);
            });
        });
        
        describe("max only", function() {
            it("should validate if the value is equal to the maximum", function() {
                expect(validate('Foo', undefined, 3)).toBe(true);
            });  
            
            it("should validate if the value is less than the maximum", function() {
                expect(validate('FooBar', undefined, 7)).toBe(true);
            });
        });
        
        describe("both", function() {
            it("should validate if the value is equal to the minimum", function() {
                expect(validate('Foo', 3, 10)).toBe(true);
            });
            
            it("should validate if the value is equal to the maximum", function() {
                expect(validate('Foo', 1, 3)).toBe(true);
            });
            
            it("should validate if the value is between minimum/maximum", function() {
                expect(validate('Bar', 1, 5)).toBe(true);
            });
            
            it("should validate if the min === max and the value === min === max", function() {
                expect(validate('Bar', 3, 3)).toBe(true);
            });
        });
    });
    
    describe("casting", function() {
        it("should check the length of numeric values", function() {
            expect(validate(123456789, undefined, 5)).not.toBe(true);    
            expect(validate(123, undefined, 5)).toBe(true);
            
            expect(validate(1, 3)).not.toBe(true);
            expect(validate(12345, 3)).toBe(true);
        });
        
        it("should check the length of boolean values", function() {
            expect(validate(false, undefined, 3)).not.toBe(true);    
            expect(validate(false, undefined, 5)).toBe(true);
            
            expect(validate(true, 5)).not.toBe(true);
            expect(validate(true, 3)).toBe(true);
        });
    });
    
    describe("messages", function() {
        it("should accept a custom empty message", function() {
            v = new Ext.data.validator.Length({
                emptyMessage: 'Foo'
            });
            expect(v.validate(undefined)).toBe('Foo');
        });
        
        it("should accept a custom min message", function() {
            v = new Ext.data.validator.Length({
                minOnlyMessage: 'Foo{0}',
                min: 1
            });
            expect(v.validate('')).toBe('Foo1');
        });
        
        it("should accept a custom max message", function() {
            v = new Ext.data.validator.Length({
                maxOnlyMessage: 'Foo{0}',
                max: 3
            });
            expect(v.validate('Value')).toBe('Foo3');
        });
        
        it("should accept a custom both message", function() {
            v = new Ext.data.validator.Length({
                bothMessage: 'Foo{0}{1}',
                min: 5,
                max: 7
            });
            expect(v.validate('Foo')).toBe('Foo57');
        });
    });
    
    describe("runtime changes", function() {
        var make = function(min, max) {
            v = new Ext.data.validator.Length({
                min: min,
                max: max
            });
        };
        
        describe("min value", function() {
            it("should be able to change the min value", function() {
                make(3);
                expect(v.validate('A')).not.toBe(true);
                v.setMin(1);
                expect(v.validate('A')).toBe(true);
            });
            
            it("should update the minMsg after changing the min value", function() {
                make(3);
                expect(v.validate('A')).toBe(f(v.getMinOnlyMessage(), 3));
                v.setMin(2);
                expect(v.validate('A')).toBe(f(v.getMinOnlyMessage(), 2));
            });
        });
        
        describe("max value", function() {
            it("should be able to change the max value", function() {
                make(undefined, 3);
                expect(v.validate('ABCD')).not.toBe(true);
                v.setMax(10);
                expect(v.validate('ABCD')).toBe(true);
            });
            
            it("should update the maxMsg after changing the max value", function() {
                make(undefined, 3);
                expect(v.validate('ABCDE')).toBe(f(v.getMaxOnlyMessage(), 3));
                v.setMax(4);
                expect(v.validate('ABCDE')).toBe(f(v.getMaxOnlyMessage(), 4));
            });
        });
        
        describe("both", function() {
            it("should be able to clear the minimum value", function() {
                make(3, 5);
                expect(v.validate('AB')).not.toBe(true);
                v.setMin(undefined);
                expect(v.validate('AB')).toBe(true);
            });
        
            it("should be able to clear the maximum value", function() {
                make(3, 5);
                expect(v.validate('ABCDEFG')).not.toBe(true);
                v.setMax(undefined);
                expect(v.validate('ABCDEFG')).toBe(true);
            });
            
            describe("messages", function() {
                it("should update the bothMsg when the min value changes", function() {
                    make(3, 5);
                    expect(v.validate('ABCDEFG')).toBe(f(v.getBothMessage(), 3, 5));
                    v.setMin(2);
                    expect(v.validate('ABCDEFG')).toBe(f(v.getBothMessage(), 2, 5));
                });
                
                it("should update the bothMsg when the max value changes", function() {
                    make(3, 5);
                    expect(v.validate('ABCDEFG')).toBe(f(v.getBothMessage(), 3, 5));
                    v.setMax(6);
                    expect(v.validate('ABCDEFG')).toBe(f(v.getBothMessage(), 3, 6));
                });
                
                it("should switch to the max msg when clearing the min value", function() {
                    make(3, 5);
                    v.setMin(undefined);
                    expect(v.validate('ABCDEFG')).toBe(f(v.getMaxOnlyMessage(), 5));
                });
                
                it("should switch to the min msg when clearing the max value", function() {
                    make(3, 5);
                    v.setMax(undefined);
                    expect(v.validate('A')).toBe(f(v.getMinOnlyMessage(), 3));
                });
            });
        });
        
        
    });
    
});
