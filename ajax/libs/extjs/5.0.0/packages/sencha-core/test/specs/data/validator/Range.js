describe("Ext.data.validator.Range", function() {
    
    var v;
    
    function validate(value, min, max) {
        v = new Ext.data.validator.Range({
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
            describe("string", function() {
                it("should not validate if the value is less than the minimum", function() {
                    var min = 'B';
                    expect(validate('A', min)).toBe(f(v.getMinOnlyMessage(), min));    
                });
            });
            
            describe("number", function() {
                it("should not validate if the value is less than the minimum", function() {
                    var min = 10;
                    expect(validate(9, min)).toBe(f(v.getMinOnlyMessage(), min));    
                });
            });
        });
        
        describe("max only", function() {
            describe("string", function() {
                it("should not validate if the value is greater than the maximum", function() {
                    var max = 'D';
                    expect(validate('E', undefined, max)).toBe(f(v.getMaxOnlyMessage(), max));
                });    
            });
            
            describe("number", function() {
                it("should not validate if the value is greater than the maximum", function() {
                    var max = 10;
                    expect(validate(20, undefined, max)).toBe(f(v.getMaxOnlyMessage(), max));
                });    
            });
        });
        
        describe("min & max", function() {  
            describe("string", function() {
                var min = 'E', 
                    max = 'J';
                    
                it("should not validate if the value is less than the minimum", function() {
                    expect(validate('A', min, max)).toBe(f(v.getBothMessage(), min, max));    
                });
            
                it("should not validate if the value is greater than the maximum", function() {
                    expect(validate('Z', min, max)).toBe(f(v.getBothMessage(), min, max));    
                });
            });
        });
    });
    
    describe("valid values", function() {
        describe("min only", function() {
            describe("string", function() {
                it("should validate if the value is equal to the minimum", function() {
                    expect(validate('F', 'F')).toBe(true);
                });  
            
                it("should validate if the value is greater than the minimum", function() {
                    expect(validate('G', 'F')).toBe(true);
                });
            });
            
            describe("number", function() {
                it("should validate if the value is equal to the minimum", function() {
                    expect(validate(3, 3)).toBe(true);
                });  
            
                it("should validate if the value is greater than the minimum", function() {
                    expect(validate(7, 3)).toBe(true);
                });
            });
        });
        
        describe("max only", function() {
            describe("string", function() {
                it("should validate if the value is equal to the maximum", function() {
                    expect(validate('F', undefined, 'F')).toBe(true);
                });  
            
                it("should validate if the value is less than the maximum", function() {
                    expect(validate('A', undefined, 'F')).toBe(true);
                });
            });
            
            describe("number", function() {
                it("should validate if the value is equal to the maximum", function() {
                    expect(validate(18, undefined, 18)).toBe(true);
                });  
            
                it("should validate if the value is less than the maximum", function() {
                    expect(validate(18, undefined, 22)).toBe(true);
                });
            });
        });
        
        describe("both", function() {
            describe("string", function() {
                it("should validate if the value is equal to the minimum", function() {
                    expect(validate('E', 'E', 'J')).toBe(true);
                });
                
                it("should validate if the value is equal to the maximum", function() {
                    expect(validate('J', 'E', 'J')).toBe(true);
                });
                
                it("should validate if the value is between minimum/maximum", function() {
                    expect(validate('G', 'E', 'J')).toBe(true);
                });
                
                it("should validate if the min === max and the value === min === max", function() {
                    expect(validate('G', 'G', 'G')).toBe(true);
                });
            });
            
            describe("number", function() {
                it("should validate if the value is equal to the minimum", function() {
                    expect(validate(30, 30, 50)).toBe(true);
                });
                
                it("should validate if the value is equal to the maximum", function() {
                    expect(validate(50, 30, 50)).toBe(true);
                });
                
                it("should validate if the value is between minimum/maximum", function() {
                    expect(validate(43, 30, 50)).toBe(true);
                });
                
                it("should validate if the min === max and the value === min === max", function() {
                    expect(validate(70, 70, 70)).toBe(true);
                });
            });
        });
    });
    
    describe("messages", function() {
        it("should accept a custom empty message", function() {
            v = new Ext.data.validator.Range({
                emptyMessage: 'Foo'
            });
            expect(v.validate(undefined)).toBe('Foo');
        });
        
        it("should accept a custom min message", function() {
            v = new Ext.data.validator.Range({
                minOnlyMessage: 'Foo{0}',
                min: 1
            });
            expect(v.validate(0)).toBe('Foo1');
        });
        
        it("should accept a custom max message", function() {
            v = new Ext.data.validator.Range({
                maxOnlyMessage: 'Foo{0}',
                max: 3
            });
            expect(v.validate(10)).toBe('Foo3');
        });
        
        it("should accept a custom both message", function() {
            v = new Ext.data.validator.Range({
                bothMessage: 'Foo{0}{1}',
                min: 5,
                max: 7
            });
            expect(v.validate(3)).toBe('Foo57');
        });
    });
    
    describe("runtime changes", function() {
        var make = function(min, max) {
            v = new Ext.data.validator.Range({
                min: min,
                max: max
            });
        };
        
        describe("min value", function() {
            it("should be able to change the min value", function() {
                make(3);
                expect(v.validate(1)).not.toBe(true);
                v.setMin(1);
                expect(v.validate(1)).toBe(true);
            });
            
            it("should update the minMsg after changing the min value", function() {
                make(3);
                expect(v.validate(1)).toBe(f(v.getMinOnlyMessage(), 3));
                v.setMin(2);
                expect(v.validate(1)).toBe(f(v.getMinOnlyMessage(), 2));
            });
        });
        
        describe("max value", function() {
            it("should be able to change the max value", function() {
                make(undefined, 3);
                expect(v.validate(4)).not.toBe(true);
                v.setMax(10);
                expect(v.validate(4)).toBe(true);
            });
            
            it("should update the maxMsg after changing the max value", function() {
                make(undefined, 3);
                expect(v.validate(5)).toBe(f(v.getMaxOnlyMessage(), 3));
                v.setMax(4);
                expect(v.validate(5)).toBe(f(v.getMaxOnlyMessage(), 4));
            });
        });
        
        describe("both", function() {
            it("should be able to clear the minimum value", function() {
                make(3, 5);
                expect(v.validate(2)).not.toBe(true);
                v.setMin(undefined);
                expect(v.validate(2)).toBe(true);
            });
        
            it("should be able to clear the maximum value", function() {
                make(3, 5);
                expect(v.validate(7)).not.toBe(true);
                v.setMax(undefined);
                expect(v.validate(7)).toBe(true);
            });
            
            describe("messages", function() {
                it("should update the bothMsg when the min value changes", function() {
                    make(3, 5);
                    expect(v.validate(7)).toBe(f(v.getBothMessage(), 3, 5));
                    v.setMin(2);
                    expect(v.validate(7)).toBe(f(v.getBothMessage(), 2, 5));
                });
                
                it("should update the bothMsg when the max value changes", function() {
                    make(3, 5);
                    expect(v.validate(7)).toBe(f(v.getBothMessage(), 3, 5));
                    v.setMax(6);
                    expect(v.validate(7)).toBe(f(v.getBothMessage(), 3, 6));
                });
                
                it("should switch to the max msg when clearing the min value", function() {
                    make(3, 5);
                    v.setMin(undefined);
                    expect(v.validate(7)).toBe(f(v.getMaxOnlyMessage(), 5));
                });
                
                it("should switch to the min msg when clearing the max value", function() {
                    make(3, 5);
                    v.setMax(undefined);
                    expect(v.validate(1)).toBe(f(v.getMinOnlyMessage(), 3));
                });
            });
        });
        
        
    });
    
});
