describe("Ext.data.field.Date", function() {
    
    var field;
    
    function make(cfg) {
        field = new Ext.data.field.Date(cfg);
    }
    
    afterEach(function() {
        field = null;
    });
    
    describe("defaults", function() {
        beforeEach(function() {
            make();
        });
        
        it("should configure the type", function() {
            expect(field.getType()).toBe('date');
        }); 
        
        it("should default dateFormat to null", function() {
            expect(field.getDateFormat()).toBeNull();    
        });
        
        it("should default dateReadFormat to null", function() {
            expect(field.getDateReadFormat()).toBeNull();    
        });
        
        it("should default dateWriteFormat to timestamp", function() {
            expect(field.getDateWriteFormat()).toBe('timestamp');    
        });     
        
        it("should default the sorting to date", function() {
            expect(field.getSortType()).toBe(Ext.data.SortTypes.asDate);    
        });
    });
    
    describe("configuring", function() {
        it("should configure dateFormat", function() {
            make({
                dateFormat: 'Y/m/d'
            });    
            expect(field.getDateFormat()).toBe('Y/m/d');
        });
        
        it("should configure dateReadFormat", function() {
            make({
                dateReadFormat: 'Y-m-d'
            });    
            expect(field.getDateReadFormat()).toBe('Y-m-d');
        });
        
        it("should configure dateWriteFormat", function() {
            make({
                dateWriteFormat: 'Y m d'
            });    
            expect(field.getDateWriteFormat()).toBe('Y m d');
        });
    });
    
    describe("compare", function() {
        var d1 = new Date(2000, 0, 1),
            d2 = new Date(2005, 0, 1),
            d3 = new Date(2010, 0, 1);
            
        beforeEach(function() {
            make();
        });
           
        describe("mixed types", function() { 
            it("should return 0 if both values are not dates", function() {
                expect(field.compare(null, null)).toBe(0);
            });
        
            it("should return -1 if a is not a date and b is a date", function() {
                expect(field.compare(null, d1)).toBe(-1);    
            });
        
            it("should return 1 if a is a date and b is not a date", function() {
                expect(field.compare(d1, null)).toBe(1);    
            });
        });
        
        describe("2 dates", function() {
            it("should return 0 if the date values are equal", function() {
                expect(field.compare(d1, d1)).toBe(0);    
            });
            
            it("should return -1 a < b", function() {
                expect(field.compare(d1, d2)).toBe(-1);    
            });
            
            it("should return 1 a > b", function() {
                expect(field.compare(d3, d2)).toBe(1);    
            });
        });
    });
    
    describe("convert", function() { 
        it("should return the same date instance if passed", function() {
            make();
            var d = new Date();
            expect(field.convert(d)).toBe(d);    
        });
        
        describe("falsy values", function() {
            beforeEach(function() {
                make();
            });
            
            it("should return null if false is passed", function() {
                expect(field.convert(false)).toBeNull();  
            });
            
            it("should return null if undefined is passed", function() {
                expect(field.convert(undefined)).toBeNull();  
            });  
            
            it("should return null if null is passed", function() {
                expect(field.convert(null)).toBeNull();  
            });
            
            it("should return null if '' is passed", function() {
                expect(field.convert('')).toBeNull();  
            });
            
            it("should return null if 0 is passed", function() {
                expect(field.convert(0)).toBeNull();  
            });
        });
        
        describe("with format", function() {
            it("should use the dateFormat", function() {
                var d = new Date();
                make({
                    dateFormat: 'Y-m-d'
                });    
                
                var v, format;
                
                spyOn(Ext.Date, 'parse').andCallFake(function(arg1, arg2) {
                    v = arg1;
                    format = arg2;
                    return d;
                });
                
                expect(field.convert('2000-01-01')).toBe(d);
                expect(v).toBe('2000-01-01');
                expect(format).toBe('Y-m-d');
            });
            
            it("should use the dateReadFormat", function() {
                var d = new Date();
                make({
                    dateReadFormat: 'Y-m-d'
                });    
                
                var v, format;
                
                spyOn(Ext.Date, 'parse').andCallFake(function(arg1, arg2) {
                    v = arg1;
                    format = arg2;
                    return d;
                });
                
                expect(field.convert('2000-01-01')).toBe(d);
                expect(v).toBe('2000-01-01');
                expect(format).toBe('Y-m-d');
            });
            
            it("should prefer dateReadFormat over dateFormat", function() {
                var d = new Date();
                make({
                    dateReadFormat: 'Y-m-d',
                    dateFormat: 'Y/m/d'
                });    
                
                var v, format;
                
                spyOn(Ext.Date, 'parse').andCallFake(function(arg1, arg2) {
                    v = arg1;
                    format = arg2;
                    return d;
                });
                
                expect(field.convert('2000-01-01')).toBe(d);
                expect(v).toBe('2000-01-01');
                expect(format).toBe('Y-m-d');
            });
        });
        
        describe("without format", function() {
            it("should call native Date.parse", function() {
                make();
                expect(+field.convert('Sat Jan 01 2000 00:00:00 GMT-0700 (MST)')).toBe(946710000000);
            });
            
            it("should return null if native parsing can't parse the date", function() {
                make();
                expect(field.convert('foo')).toBeNull();
            });
        });
    });
    
    describe("isEqual", function() {
        beforeEach(function() {
            make();
        });
        
        it("should return false if a is a date and b is not", function() {
            expect(field.isEqual(new Date(), null)).toBe(false);
        });
        
        it("should return false if b is a date and a is not", function() {
            expect(field.isEqual(null, new Date())).toBe(false);
        });
        
        it("should return true if 2 dates have the same value", function() {
            var d1 = new Date(1984, 3, 15),
                d2 = new Date(1984, 3, 15);
                
            expect(field.isEqual(d1, d2)).toBe(true);
        });
        
        it("should return false if 2 dates have different values", function() {
            var d1 = new Date(1984, 3, 15),
                d2 = new Date(1984, 3, 17);
                
            expect(field.isEqual(d1, d2)).toBe(false);
        });
    });
    
    describe("serialize", function() {
        it("should return null if the value is not a date", function() {
            make();
            expect(field.serialize('')).toBeNull();    
        });
        
        it("should use the default if there is no specified format", function() {
            make();
            var d = new Date();
            expect(field.serialize(d)).toBe(Ext.Date.format(d, 'timestamp'));    
        });
        
        describe("with format", function() {
            it("should use dateFormat", function() {
                var d = new Date();
                make({
                    dateFormat: 'Y-m-d'
                });    
                
                var v, format;
                
                spyOn(Ext.Date, 'format').andCallFake(function(arg1, arg2) {
                    v = arg1;
                    format = arg2;
                    return 'formatted';
                });
                
                expect(field.serialize(d)).toBe('formatted');
                expect(v).toBe(d);
                expect(format).toBe('Y-m-d');
            }); 
            
            it("should use dateWriteFormat", function() {
                var d = new Date();
                make({
                    dateWriteFormat: 'Y-m-d'
                });    
                
                var v, format;
                
                spyOn(Ext.Date, 'format').andCallFake(function(arg1, arg2) {
                    v = arg1;
                    format = arg2;
                    return 'formatted';
                });
                
                expect(field.serialize(d)).toBe('formatted');
                expect(v).toBe(d);
                expect(format).toBe('Y-m-d');
            }); 
            
            it("should should favour dateWriteFormat over dateFormat", function() {
                var d = new Date();
                make({
                    dateFormat: 'Y/m/d',
                    dateWriteFormat: 'Y-m-d'
                });    
                
                var v, format;
                
                spyOn(Ext.Date, 'format').andCallFake(function(arg1, arg2) {
                    v = arg1;
                    format = arg2;
                    return 'formatted';
                });
                
                expect(field.serialize(d)).toBe('formatted');
                expect(v).toBe(d);
                expect(format).toBe('Y-m-d');
            }); 
        });
    });
        
});
