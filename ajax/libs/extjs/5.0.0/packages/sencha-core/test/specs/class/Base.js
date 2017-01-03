describe("Ext.Base", function() {
    var cls;
    
    afterEach(function() {
        cls = null;
    });

    describe("deprecated", function() {
        afterEach(function() {
            delete Ext.versions.foo;
            delete Ext.compatVersions.foo;
        });

        function declareClass (compatVersion) {
            Ext.setCompatVersion('foo', compatVersion);

            cls = Ext.define(null, {
                foo: function () {
                    return 'a';
                },

                deprecated: {
                    name: 'foo',
                    5: {
                        methods: {
                            bar: 'foo',
                            foo: function () {
                                return this.callParent() + 'd';
                            }
                        }
                    },

                    5.1: {
                        methods: {
                            foo: {
                                fn: function () {
                                    return this.callParent() + 'c';
                                }
                            }
                        }
                    },

                    '5.2': {
                        methods: {
                            foo: {
                                message: 'Foo is bad',
                                fn: function () {
                                    return this.callParent() + 'b';
                                }
                            }
                        }
                    }
                }
            });
        }

        describe('no backward compatibility', function () {
            beforeEach(function () {
                declareClass('5.2');
            });

            it("should not activate methods when compatVersion equals curVersion", function() {
                var obj = new cls();
                var s = obj.foo();
                expect(s).toBe('a');
            });

            it("should install error shim from old block", function() {
                var obj = new cls();
                var s = 'No exception';

                try {
                    obj.bar();
                } catch (e) {
                    s = e.message;
                }
                expect(s).toBe('"#bar" is deprecated. Please use "foo" instead.');
            });
        });

        describe('one increment of backward compatibility', function () {
            beforeEach(function () {
                declareClass('5.1');
            });

            it("should activate just one block", function() {
                var obj = new cls();
                var s = obj.foo();
                expect(s).toBe('ab');
            });

            it("should install error shim from old block", function() {
                var obj = new cls();
                var s = 'No exception';

                try {
                    obj.bar();
                } catch (e) {
                    s = e.message;
                }
                expect(s).toBe('"#bar" is deprecated. Please use "foo" instead.');
            });
        });

        describe('two increments of backward compatibility', function () {
            beforeEach(function () {
                declareClass('5');
            });

            it("should activate just two blocks", function() {
                var obj = new cls();
                var s = obj.foo();
                expect(s).toBe('abc');
            });

            it("should install error shim from old block", function() {
                var obj = new cls();
                var s = 'No exception';

                try {
                    obj.bar();
                } catch (e) {
                    s = e.message;
                }
                expect(s).toBe('"#bar" is deprecated. Please use "foo" instead.');
            });
        });

        describe('full backward compatibility', function () {
            beforeEach(function () {
                declareClass('4.2');
            });

            it("should activate all three blocks", function() {
                var obj = new cls();
                var s = obj.foo();
                expect(s).toBe('abcd');
            });

            it("should install alias", function() {
                var obj = new cls();
                var s = obj.bar();
                expect(s).toBe('abcd');
            });
        });
    });

    describe("borrow", function() {
        beforeEach(function() {
            Ext.define("spec.Foo", {
                a: function() {
                    return 'foo a';
                },
                b: function() {
                    return 'foo b';
                },
                c: function() {
                    return 'foo c';
                }
            });
            Ext.define("spec.Bar", {
                a: function() {
                    return 'bar a';
                }
            });
        });

        afterEach(function() {
            Ext.undefine('spec.Foo');
            Ext.undefine('spec.Bar');
        });
        
        it("should borrow methods", function() {
            spec.Bar.borrow(spec.Foo, ['b', 'c']);
            
            var bar = new spec.Bar();
            expect(bar.a()).toEqual('bar a');
            expect(bar.b()).toEqual('foo b');
            expect(bar.c()).toEqual('foo c');
        });
    });
    
    describe("createAlias", function() {
        var o;
        
        function makeCls(fn, name) {
            var o = {};
            o[name || 'oldFn'] = fn;
            cls = Ext.define(null, o);
        }
        
        afterEach(function() {
            o = null;
        });
        
        it("should create a method on the prototype", function() {
            makeCls(function(){});
            cls.createAlias('newFn', 'oldFn');
            expect(Ext.isFunction(cls.prototype.newFn)).toBe(true);
        });
        
        it("should call through to the old method with the passed arguments", function() {
            var a, b;
            makeCls(function(arg1, arg2) {
                a = arg1;
                b = arg2;
            });   
            cls.createAlias('newFn', 'oldFn');
            o = new cls();
            o.newFn('Val', 17);
            expect(a).toBe('Val');
            expect(b).toBe(17);             
        });
        
        it("should dynamically resolve the old method at runtime", function() {
            var values = [];
            makeCls(function() {
                values.push(1);
            });   
            cls.createAlias('newFn', 'oldFn');
            o = new cls();
            o.newFn();
            
            cls.override({
                oldFn: function() {
                    values.push(2);
                }
            });
            o.newFn();
            
            o.oldFn = function() {
                values.push(3);    
            };
            o.newFn();
            expect(values).toEqual([1, 2, 3]);
        });
    });
    
    describe("override", function() {
        describe("mixins", function() {
            var aFn, bFn;
            beforeEach(function() {
                aFn = function() {};
                bFn = function() {};
                
                Ext.define('spec.Mix1', {
                    extend: 'Ext.Mixin',
                    mixinConfig: {
                        id: 'mix1'
                    },
                    
                    a: aFn
                });
                
                Ext.define('spec.Mix2', {
                    extend: 'Ext.Mixin',
                    mixinConfig: {
                        id: 'mix2'
                    },
                    
                    b: bFn
                });
            });
            
            afterEach(function() {
                aFn = bFn = null;
                Ext.undefine('spec.Mix1');
                Ext.undefine('spec.Mix2');
                Ext.undefine('spec.MyBase');
            });
            
            it("should add mixins on a class without mixins", function() {
                cls = Ext.define('spec.MyBase', {
                });
                
                Ext.define(null, {
                    override: 'spec.MyBase',
                    mixins : ['spec.Mix1']
                });
                
                expect(cls.prototype.a).toBe(aFn);
                expect(cls.prototype.mixins.mix1).toBe(spec.Mix1.prototype);
            });
            
            it("should add mixins on a class with existing mixins", function() {
                cls = Ext.define('spec.MyBase', {
                    mixins: ['spec.Mix1']
                });
                
                Ext.define(null, {
                    override: 'spec.MyBase',
                    mixins : ['spec.Mix2']
                });
                
                expect(cls.prototype.a).toBe(aFn);
                expect(cls.prototype.mixins.mix1).toBe(spec.Mix1.prototype);
                
                expect(cls.prototype.b).toBe(bFn);
                expect(cls.prototype.mixins.mix2).toBe(spec.Mix2.prototype);
            });
            
            it("should add mixins when the type differs", function() {
                cls = Ext.define('spec.MyBase', {
                    mixins: {
                        mixFoo: 'spec.Mix1'
                    }
                });
                
                Ext.define(null, {
                    override: 'spec.MyBase',
                    mixins : ['spec.Mix2']
                });
                
                expect(cls.prototype.a).toBe(aFn);
                expect(cls.prototype.mixins.mixFoo).toBe(spec.Mix1.prototype);
                
                expect(cls.prototype.b).toBe(bFn);
                expect(cls.prototype.mixins.mix2).toBe(spec.Mix2.prototype);
            });
        });
    });
    
});
