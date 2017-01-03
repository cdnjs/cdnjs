describe("Ext.data.Types", function() {
    var conv = function(type, scope, value) {
        var cfg = Ext.apply(scope || {}, {
            getAllowNull: function() {
                return scope ? scope.allowNull : false;
            },
            getDateFormat: function() {
                return scope ? scope.dateFormat : null    
            },
            getDateReadFormat: function() {
                return scope ? scope.dateReadFormat : null    
            }
        });
        return type.convert.call(cfg, value);   
    };

    describe("AUTO", function(){
        var type = Ext.data.Types.AUTO;

        it ("should have a type property equal to auto", function() {
            expect(type.type).toEqual("auto");
        });

        it ("should not have a sortType", function() {
            expect(type.sortType).toEqual(Ext.data.SortTypes.none);
        });

        describe("convert", function(){
            it("should not be defined (because it's faster to create models this way)", function(){
                expect(type.convert).toBeUndefined();
            });         
        });
    });

    describe("STRING", function(){
        var type = Ext.data.Types.STRING;

        it ("should have a type property equal to string", function() {
            expect(type.type).toEqual("string");
        });

        it ("should have a sortType equal to asUCString", function() {
            expect(type.sortType).toEqual(Ext.data.SortTypes.asUCString);
        });

        describe("convert", function(){
            it("should not convert undefined", function(){
                expect(conv(type, null, undefined)).toEqual("");
            });

            it("should convert null", function(){
                expect(conv(type, null, null)).toEqual("");
            });

            it("should convert number", function(){
                expect(conv(type, null, 1)).toEqual("1");
            });

            it("should convert float", function(){
                expect(conv(type, null, 37.2)).toEqual("37.2");
            });

            it("should not convert string", function(){
                expect(conv(type, null, "sencha banzai!")).toEqual("sencha banzai!");
            });

            it("should not convert empty string", function(){
                expect(conv(type, null, "")).toEqual("");
            });

            it("should convert date", function(){
                var d = new Date();
                expect(conv(type, null, d)).toEqual(d.toString());
            });

            it("should convert a boolean value", function(){
                expect(conv(type, null, true)).toEqual("true");
            });      
            
            it("should set to null with allowNull and an undefined value", function(){
                expect(conv(type, {
                    allowNull: true
                }), undefined).toBeNull();
            });   
            
            it("should set to null with allowNull and a null value", function(){
                expect(conv(type, {
                    allowNull: true
                }), undefined).toBeNull();
            });     
        });
    });

    describe("INT", function(){
        var type = Ext.data.Types.INT;

        it ("should have a type property equal to int", function() {
            expect(type.type).toEqual("int");
        });

        it ("should have an alias named INTEGER", function(){
            expect(type).toEqual(Ext.data.Types.INTEGER);
        });

        it ("should not have a sortType", function() {
            expect(type.sortType).toEqual(Ext.data.SortTypes.none);
        });

        describe("convert", function() {

            describe("invalid", function() {
                it("should convert undefined in 0", function() {
                    expect(conv(type, null, undefined)).toEqual(0);
                });

                it("should convert null in 0", function() {
                    expect(conv(type, null, null)).toEqual(0);
                });

                it("should convert empty string in 0", function() {
                    expect(conv(type, null, "")).toEqual(0);
                });

                it("should convert undefined to null", function() {
                    expect(conv(type, {allowNull: true}, undefined)).toBeNull();
                });

                it("should convert null to null", function() {
                    expect(conv(type, {allowNull: true}, null)).toBeNull();
                });

                it("should convert empty string to null", function() {
                    expect(conv(type, {allowNull: true}, "")).toBeNull();
                });
            });

            describe("expected", function() {
                it("should convert numeric string value", function() {
                    expect(conv(type, null, "42")).toEqual(42);
                });

                it("should convert integer", function() {
                    expect(conv(type, null, 42)).toEqual(42);
                });

                it("should convert negative integer", function() {
                    expect(conv(type, null, -42)).toEqual(-42);
                });
            });

            describe("floats", function() {
                it("should convert float string value", function() {
                    expect(conv(type, null, "42.20")).toEqual(42);
                });

                it("should convert float", function() {
                    expect(conv(type, null, 42.99)).toEqual(42);
                });

                it("should convert negative float", function() {
                    expect(conv(type, null, -42.50)).toEqual(-42);
                });
            });

            describe("stripRe", function() {
                it("should convert string with $", function() {
                    expect(conv(type, null, "$42")).toEqual(42);
                });

                it("should convert string with %", function() {
                    expect(conv(type, null, "-42%")).toEqual(-42);
                });

                it("should convert string with , seperating numbers", function() {
                    expect(conv(type, null, "123,456.00")).toEqual(123456);
                });

                it("should convert string with custom stripRe", function() {
                    var orig = Ext.data.Types.stripRe;
                    Ext.data.Types.stripRe = /[!]/g;

                    expect(conv(type, null, '987!654.34')).toEqual(987654);

                    Ext.data.Types.stripRe = orig;
                });
            });
        });
    });

    describe("FLOAT", function(){
        var type = Ext.data.Types.FLOAT;

        it ("should have a type property equal to float", function() {
            expect(type.type).toEqual("float");
        });

        it ("should have an alias named NUMBER", function(){
            expect(type).toEqual(Ext.data.Types.NUMBER);
        });

        it ("should not have a sortType", function() {
            expect(type.sortType).toEqual(Ext.data.SortTypes.none);
        });

        describe("convert", function() {

            describe("invalid", function() {
                it("should convert undefined in 0", function() {
                    expect(conv(type, null, undefined)).toEqual(0);
                });

                it("should convert null in 0", function() {
                    expect(conv(type, null, null)).toEqual(0);
                });

                it("should convert empty string in 0", function() {
                    expect(conv(type, null, "")).toEqual(0);
                });

                it("should convert undefined to null", function() {
                    expect(conv(type, {allowNull: true}, undefined)).toBeNull();
                });

                it("should convert null to null", function() {
                    expect(conv(type, {allowNull: true}, null)).toBeNull();
                });

                it("should convert empty string to null", function() {
                    expect(conv(type, {allowNull: true}, "")).toBeNull();
                });
            });

            describe("expected", function() {
                describe("int", function() {
                    it("should convert numeric string value", function() {
                        expect(conv(type, null, "42")).toEqual(42);
                    });

                    it("should convert integer", function() {
                        expect(conv(type, null, 42)).toEqual(42);
                    });

                    it("should convert negative integer", function() {
                        expect(conv(type, null, -42)).toEqual(-42);
                    });                    
                });

                describe("floats", function() {
                    it("should convert float string value", function() {
                        expect(conv(type, null, "42.03")).toEqual(42.03);
                    });

                    it("should convert float", function() {
                        expect(conv(type, null, 42.78)).toEqual(42.78);
                    });

                    it("should convert negative float", function() {
                        expect(conv(type, null, -42.55)).toEqual(-42.55);
                    });                                        
                });
            });

            describe("stripRe", function() {
                it("should convert string with $", function() {
                    expect(conv(type, null, "$42.56")).toEqual(42.56);
                });

                it("should convert string with %", function() {
                    expect(conv(type, null, "-42.66%")).toEqual(-42.66);
                });

                it("should convert string with , seperating numbers", function() {
                    expect(conv(type, null, "123,456.78")).toEqual(123456.78);
                });

                it("should convert string with custom stripRe", function() {
                    var orig = Ext.data.Types.stripRe;
                    Ext.data.Types.stripRe = /[!]/g;

                    expect(conv(type, null, '987!654.34')).toEqual(987654.34);

                    Ext.data.Types.stripRe = orig;
                });
            });
        });
    });

    describe("BOOL", function(){
        var type = Ext.data.Types.BOOL;

        it ("should have a type property equal to bool", function() {
            expect(type.type).toEqual("bool");
        });

        it ("should have an alias named BOOLEAN", function(){
            expect(type).toEqual(Ext.data.Types.BOOLEAN);
        });

        it ("should not have a sortType", function() {
            expect(type.sortType).toEqual(Ext.data.SortTypes.none);
        });

        describe("convert", function() {
            describe("the true things", function() {
                it("should convert true", function() {
                    expect(conv(type, null, true)).toBe(true);
                });

                it("should convert true string", function() {
                    expect(conv(type, null, 'true')).toBe(true);
                });

                it("should convert integer", function() {
                    expect(conv(type, null, 1)).toBe(true);
                });

                it("should convert integer string", function() {
                    expect(conv(type, null, '1')).toBe(true);
                });                
            });

            describe("the false things", function(){
                it("should convert false", function() {
                    expect(conv(type, null, false)).toBe(false);
                });

                it("should convert integer", function() {
                    expect(conv(type, null, 7)).toBe(false);
                });

                it("should convert string", function() {
                    expect(conv(type, null, 'foo')).toBe(false);
                });

                it("should convert object", function() {
                    expect(conv(type, null, {})).toBe(false);
                });

                it("should convert array", function() {
                    expect(conv(type, null, [])).toBe(false);
                });

                it("should convert date", function() {
                    expect(conv(type, null, new Date())).toBe(false);
                });
            });
            
            describe("allowNull", function(){
                it("should convert undefined to null if allowNull is specified", function() {
                    expect(conv(type, {
                        allowNull: true
                    }, undefined)).toBeNull();
                });
                
                it("should convert null to null if allowNull is specified", function() {
                    expect(conv(type, {
                        allowNull: true
                    }, null)).toBeNull();
                });
                
                it("should convert empty string to null if allowNull is specified", function() {
                    expect(conv(type, {
                        allowNull: true
                    }, '')).toBeNull();
                });
            });
        });
    });

    describe("DATE", function(){
        var type = Ext.data.Types.DATE;

        it ("should have a type property equal to date", function() {
            expect(type.type).toEqual("date");
        });

        it ("should not a sortType equal to asDate", function() {
            expect(type.sortType).toEqual(Ext.data.SortTypes.asDate);
        });

        describe("convert", function() {
            describe("invalid", function() {
                it("should convert undefined", function() {
                    expect(conv(type, null, undefined)).toBeNull();
                });

                it("should convert null", function() {
                    expect(conv(type, null, null)).toBeNull();
                });

                it("should convert false", function() {
                    expect(conv(type, null, false)).toBeNull();
                });

                it ("should convert a string", function(){
                    expect(conv(type, null, 'will fail')).toBeNull();
                });
            });

            describe("expected", function() {
                it("should convert date", function() {
                    var d = new Date();
                    expect(conv(type, null, d)).toEqual(d);
                });

                it("should convert timestamp", function() {
                    var n = 1234567890,
                        d = new Date(n * 1000);

                    expect(conv(type, {dateFormat: 'timestamp'}, n).getTime()).toEqual(d.getTime());
                });

                it("should convert time", function() {
                    var n = 11111111110000,
                        d = new Date(n);
                    expect(conv(type, {dateFormat: 'time'}, n).getTime()).toEqual(d.getTime());                        
                });

                it("should convert custom date format", function() {
                    var format = 'Y-m-d',
                        val = '1986-03-03',
                        d = Ext.Date.parse(val, format);
                        
                    expect(conv(type, {dateFormat: format}, val).getTime()).toEqual(d.getTime());                        
                });
                //~  TODO: parse method disappear ?
                 //~ it("should convert date with no format, default parse", function() {
                    //~ var val = 'Wed, 18 Oct 2002 13:00:00',
                        //~ d = Date.parse(val);
                    //~ expect(conv(type, null, val).getTime()).toEqual(d);                        
                //~ });               
            });
        });
    });  
});
