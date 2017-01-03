describe("Ext.Class", function() {
    var emptyFn = function(){},
        defaultInitConfig = function(config) {
            this.initConfig(config);
        },
        cls, sub, fn, subClass, parentClass, mixinClass1, mixinClass2, o;
        
    beforeEach(function() {
        fn = function(){};
        
        mixinClass1 = Ext.define(null, {
            config: {
                mixinConfig: 'mixinConfig'
            },

            constructor: function(config) {
                this.initConfig(config);

                this.mixinConstructor1Called = true;
            },

            mixinProperty1: 'mixinProperty1',

            mixinMethod1: function() {
                this.mixinMethodCalled = true;
            }
        });

        mixinClass2 = Ext.define(null, {
            constructor: function(config) {
                this.initConfig(config);

                this.mixinConstructor2Called = true;
            },

            mixinProperty2: 'mixinProperty2',

            mixinMethod2: function() {
                this.mixinMethodCalled = true;
            }
        });

        parentClass = Ext.define(null, {
            mixins: {
                mixin1: mixinClass1
            },
            config: {
                name: 'parentClass',
                isCool: false,
                members: {
                    abe: 'Abraham Elias',
                    ed: 'Ed Spencer'
                },
                hobbies: ['football', 'bowling']
            },
            constructor: function(config) {
                this.initConfig(config);

                this.parentConstructorCalled = true;

                this.mixins.mixin1.constructor.apply(this, arguments);
            },

            parentProperty: 'parentProperty',

            parentMethod: function() {
                this.parentMethodCalled = true;
            }
        });

        subClass = Ext.define(null, {
            extend: parentClass,
            mixins: {
                mixin1: mixinClass1,
                mixin2: mixinClass2
            },
            config: {
                name: 'subClass',
                isCool: true,
                members: {
                    jacky: 'Jacky Nguyen',
                    tommy: 'Tommy Maintz'
                },
                hobbies: ['sleeping', 'eating', 'movies'],
                isSpecial: true
            },
            constructor: function(config) {
                this.initConfig(config);

                this.subConstructorCalled = true;

                subClass.superclass.constructor.apply(this, arguments);

                this.mixins.mixin2.constructor.apply(this, arguments);
            },
            myOwnMethod: function() {
                this.myOwnMethodCalled = true;
            }
        });
    });

    afterEach(function() {
        o = subClass, parentClass, mixinClass1, mixinClass2 = sub = cls = null;
    });
    
    describe("extend", function() {
        
        beforeEach(function() {
            fn = function() {};
            Ext.define('spec.Base', {
                aProp: 1,
                
                aFn: fn
            });
        });
        
        afterEach(function() {
            Ext.undefine('spec.Base');
        });
        
        it("should extend from Base if no 'extend' property found", function() {
            cls = Ext.define(null, {});
            expect((new cls()) instanceof Ext.Base).toBe(true);
        });
        
        describe("extending from a parent", function() {
            it("class reference", function() {
                cls = Ext.define(null, {
                    extend: spec.Base
                });
                expect((new cls()) instanceof spec.Base).toBe(true);
            });
        
            it("class string", function() {
                cls = Ext.define(null, {
                    extend: 'spec.Base'
                });
                expect((new cls()) instanceof spec.Base).toBe(true);
            });
        });
        
        it("should have superclass reference", function() {
            var parentPrototype = spec.Base.prototype;
            cls = Ext.define(null, {
                extend: spec.Base
            });

            expect(cls.superclass).toBe(parentPrototype);
            expect((new cls()).superclass).toBe(parentPrototype);
        });
        
        it("should copy properties from the parent", function() {
            cls = Ext.define(null, {
                extend: spec.Base
            });
            expect(cls.prototype.aProp).toBe(1);
        });
        
        it("should copy functions from the parent", function() {
            cls = Ext.define(null, {
                extend: spec.Base
            });
            expect(cls.prototype.aFn).toBe(fn);
        })
    });
    
    describe("config", function() {
        
        beforeEach(function() {
            fn = function() {};
        });
        
        describe("getter/setter creation", function() {
        
            it("should create getter if not exists", function() {            
                cls = Ext.define(null, {
                    config: {
                        someName: 'someValue'
                    }
                });
                expect(cls.prototype.getSomeName).toBeDefined();
            });
            
            it("should NOT create getter if already exists", function() {
                var cls = Ext.define(null, {
                    getSomeName: fn,
                    config: {
                        someName: 'someValue'
                    }
                });
                expect(cls.prototype.getSomeName).toBe(fn);
            });
            
            it("should create setter if not exists", function() {
                cls = Ext.define(null, {
                    config: {
                        someName: 'someValue'
                    }
                });
                expect(cls.prototype.setSomeName).toBeDefined();
            });
    
            it("should NOT create setter if already exists", function() {
                cls = Ext.define(null, {
                    setSomeName: fn,
                    config: {
                        someName: 'someValue'
                    }
                });
                expect(cls.prototype.setSomeName).toBe(fn);
            });
            
            it("should allow a custom getter to call the generated getter", function() {
                cls = Ext.define(null, {
                    config: {
                        someName: 'foo'    
                    },
                    constructor: defaultInitConfig,
                    getSomeName: function() {
                        return this.callParent().toUpperCase();
                    }    
                });  
                
                o = new cls();
                expect(o.getSomeName()).toBe('FOO');
            });
            
            it("should allow a custom setter to call the generated setter", function() {
                cls = Ext.define(null, {
                    config: {
                        someName: 'foo'    
                    },
                    constructor: defaultInitConfig,
                    setSomeName: function(someName) {
                        someName = someName.toUpperCase();
                        return this.callParent([someName]);
                    }    
                });  
                
                o = new cls();
                expect(o.getSomeName()).toBe('FOO');
            });
            
            it("should not set the value if the applier returns undefined", function() {
                var called = false;
                cls = Ext.define(null, {
                    config: {
                        foo: 1
                    },
                    constructor: defaultInitConfig,
                    applyFoo: function(foo) {
                        if (!called) {
                            called = true;
                            return foo;
                        }
                        return undefined;
                    }
                });
                
                o = new cls();
                o.setFoo(2);
                expect(o.getFoo()).toBe(1);
            });
            
            it("should not call the updater if the value does not change", function() {
                var count = 0;
                cls = Ext.define(null, {
                    config: {
                        foo: 1
                    },
                    constructor: defaultInitConfig,
                    updateFoo: function() {
                        ++count;
                    }
                });
                
                o = new cls();
                o.setFoo(1);
                expect(count).toBe(1);
            });
            
            it("should check using === to see if the value changed", function() {
                var count = 0;
                cls = Ext.define(null, {
                    config: {
                        foo: 1
                    },
                    constructor: defaultInitConfig,
                    updateFoo: function() {
                        ++count;
                    }
                });
                
                o = new cls();
                o.setFoo('1');
                expect(count).toBe(2);
            });

            describe("when getters are called by other configs' updaters", function() {
                var applyCount, updateCount;

                beforeEach(function() {
                    cls = Ext.define(null, {
                        config: {
                            foo: 1,
                            bar: 2
                        },
                        constructor: defaultInitConfig,
                        updateFoo: function() {
                            // this assumes that the configs are processed in the order
                            // they were defined.  Since we process them using a for/in
                            // loop, we can be reasonably certain foo gets processed
                            // before bar.  Call the getter here means we call it before
                            // the config system does.  This test ensures the config
                            // system does not call getBar() a second time.
                            this.getBar();
                        },
                        applyBar: function(bar) {
                            ++applyCount;
                            return bar;
                        },
                        updateBar: function() {
                            ++updateCount;
                        }
                    });

                });

                it("should only call appliers/updaters once for class configs", function() {
                    applyCount = updateCount = 0;
                    o = new cls();
                    expect(applyCount).toBe(1);
                    expect(updateCount).toBe(1);
                });

                it("should only call appliers/updaters once for instance configs", function() {
                    applyCount = updateCount = 0;
                    o = new cls({
                        foo: 10,
                        bar: 20
                    });
                    expect(applyCount).toBe(1);
                    expect(updateCount).toBe(1);
                });
            });

            describe("initialization", function() {
                describe("default values - no passed config", function() {
                    describe("null", function() {
                        it("should not initialize the config", function() {
                            cls = Ext.define(null, {
                                config: {
                                    foo: null
                                },
                                constructor: function(config) {
                                    spyOn(this, 'setFoo');
                                    this.initConfig(config);
                                }
                            });
                            o = new cls();
                            expect(o.setFoo).not.toHaveBeenCalled();
                        });
                    
                        it("should not initialize with a custom setter", function() {
                            var called = false;
                            cls = Ext.define(null, {
                                config: {
                                    foo: null
                                },
                                constructor: defaultInitConfig,
                                setFoo: function() {
                                    called = true;
                                }
                            });
                            o = new cls();
                            expect(called).toBe(false);  
                        });
                        
                        it("should not initialize with an applier", function() {
                            var called = false;
                            cls = Ext.define(null, {
                                config: {
                                    foo: null
                                },
                                constructor: defaultInitConfig,
                                applyFoo: function() {
                                    called = true;
                                }
                            });
                            o = new cls();
                            expect(called).toBe(false);  
                        });
                        
                        it("should not initialize with an updater", function() {
                            var called = false;
                            cls = Ext.define(null, {
                                config: {
                                    foo: null
                                },
                                constructor: defaultInitConfig,
                                updateFoo: function() {
                                    called = true;
                                }
                            });
                            o = new cls();
                            expect(called).toBe(false);  
                        });
                    });
                    
                    describe("other values", function() {
                        it("should not call the setter", function() {
                            cls = Ext.define(null, {
                                config: {
                                    foo: 1
                                },
                                constructor: function(config) {
                                    spyOn(this, 'setFoo');
                                    this.initConfig(config);
                                }
                            });
                            o = new cls();
                            expect(o.setFoo).not.toHaveBeenCalled();
                        });
                        
                        it("should call the setter if there is a custom setter", function() {
                            cls = Ext.define(null, {
                                config: {
                                    foo: 1
                                },
                                constructor: function(config) {
                                    spyOn(this, 'setFoo');
                                    this.initConfig(config);
                                },
                                setFoo: function() {
                                    
                                }
                            });
                            o = new cls();
                            expect(o.setFoo).toHaveBeenCalled();
                        });
                        
                        it("should call the setter if there is an applier", function() {
                            cls = Ext.define(null, {
                                config: {
                                    foo: 1
                                },
                                constructor: function(config) {
                                    spyOn(this, 'setFoo');
                                    this.initConfig(config);
                                },
                                applyFoo: function(foo) {
                                    return foo;
                                }
                            });
                            o = new cls();
                            expect(o.setFoo).toHaveBeenCalled();
                        });
                        
                        it("should call the setter if there is an updater", function() {
                            cls = Ext.define(null, {
                                config: {
                                    foo: 1
                                },
                                constructor: function(config) {
                                    spyOn(this, 'setFoo');
                                    this.initConfig(config);
                                },
                                setFoo: function() {
                                    
                                }
                            });
                            o = new cls();
                            expect(o.setFoo).toHaveBeenCalled();
                        });
                        
                        it("should call the setter if the value is an object", function() {
                            cls = Ext.define(null, {
                                config: {
                                    foo: {}
                                },
                                constructor: function(config) {
                                    spyOn(this, 'setFoo');
                                    this.initConfig(config);
                                }
                            });
                            o = new cls();
                            expect(o.setFoo).toHaveBeenCalled();
                        });
                    });
                });
                
                describe("dependencies", function() {
                    it("should force an initialization if the getter is called during init time for a primitive", function() {
                        var secondVal;
                        cls = Ext.define(null, {
                            config: {
                                first: undefined,
                                second: undefined
                            },
                            constructor: defaultInitConfig,
                            updateFirst: function() {
                                secondVal = this.getSecond();
                            }
                        });
                    
                        new cls({
                            first: 1,
                            second: 2
                        });
                        expect(secondVal).toBe(2);
                    });
                    
                    it("should have a non-config applied by the time any setter is called with non-strict mode", function() {
                        var secondVal;
                        cls = Ext.define(null, {
                            config: {
                                first: undefined
                            },
                            constructor: defaultInitConfig,
                            $configStrict: false,
                            applyFirst: function() {
                                secondVal = this.second;
                            }
                        });
                    
                        new cls({
                            first: 1,
                            second: 2
                        });
                        expect(secondVal).toBe(2);
                    });
                });
            });
        });
        
        describe("get/setConfig", function() {
            beforeEach(function() {
                cls = Ext.define(null, {
                    config: {
                        foo: 1,
                        bar: 2
                    },
                    constructor: defaultInitConfig
                });
            });

            describe('dependency ordering', function () {
                var order;

                function declareClass () {
                    order = [];
                    cls = Ext.define(null, {
                        config: {
                            b: 'bbb',
                            c: 'ccc',
                            a: 'aaa'
                        },

                        constructor: defaultInitConfig,

                        applyA: function (value) {
                            order.push('a=' + value);
                        },
                        applyB: function (value) {
                            this.getA();
                            order.push('b=' + value);
                        },
                        applyC: function (value) {
                            this.getB();
                            order.push('c=' + value);
                        }
                    });
                }

                it('should initialize dependent config first', function () {
                    declareClass();
                    var o = new cls();

                    expect(order).toEqual(['a=aaa', 'b=bbb', 'c=ccc']);
                });

                it('should update configs in dependency order', function () {
                    declareClass();
                    var o = new cls();

                    order.length = 0;

                    // Because the objects tend to be enumerated in order of keys
                    // declared, we deliberately put these *not* in the order that
                    // we expect them to be processed. At least in Chrome 33 this
                    // test would fail w/o a fix to setConfig that checks if the
                    // initGetter is still in place and avoid calling setB() twice!
                    // Of course, putting the keys in a,b,c order would pass!
                    o.setConfig({
                        a: 1,
                        c: 3,  // IMPORTANT - not in dependency order!
                        b: 2
                    });

                    expect(order).toEqual(['a=1', 'b=2', 'c=3']);
                });
            });

            describe("getConfig", function() {
                it("should be able to get a config by name", function() {
                    o = new cls();
                    expect(o.getConfig('bar')).toBe(2);
                });
            
                it("should return all configs if no name is passed", function() {
                    o = new cls();
                    expect(o.getConfig()).toEqual({
                        foo: 1,
                        bar: 2
                    });    
                });
            
                it("should throw an exception when asking for a config name that does not exist", function() {
                    o = new cls();
                    expect(function() {
                        o.getConfig('fake');
                    }).toThrow();
                });

                describe("peek", function() {
                    beforeEach(function() {
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    lazy: true,
                                    $value: 120
                                }
                            }
                        });
                    });

                    it("should not call the getter if the initGetter has not yet been called", function() {
                        o = new cls({
                            foo: 1
                        });
                        spyOn(o, 'getFoo');
                        o.getConfig('foo', true);
                        expect(o.getFoo).not.toHaveBeenCalled();
                    });

                    it("should return the pending value configured on the instance", function() {
                        o = new cls({
                            foo: 1
                        });
                        expect(o.getConfig('foo', true)).toBe(1);
                    });

                    it("should return the pending value configured on the class", function() {
                        o = new cls();
                        expect(o.getConfig('foo', true)).toBe(120);
                    });
                });
            });
            
            describe("setConfig", function() {
                it("should be able to set a config by name", function() {
                    o = new cls();
                    o.setConfig('foo', 7);
                    expect(o.getFoo()).toBe(7);
                });
                
                it("should be able to set a group of configs at once", function() {
                    o = new cls();
                    o.setConfig({
                        foo: 6,
                        bar: 8
                    });    
                    expect(o.getFoo()).toBe(6);
                    expect(o.getBar()).toBe(8);
                });
                
                it("should ignore non-config properties", function() {
                    o = new cls();
                    expect(function() {
                        o.setConfig({
                            foo: 3,
                            baz: 100
                        });
                    }).not.toThrow();    
                });
                
                it("should throw an exception when setting a config name that does not exist", function() {
                    o = new cls();
                    expect(function() {
                        o.setConfig('baz', 100);
                    }).toThrow();    
                });
                
                it("should be able to handle undefined/null configs", function() {
                    o = new cls();
                    expect(function() {
                        o.setConfig(null);
                        o.setConfig(undefined);
                    }).not.toThrow();    
                });
                
                it("should return the current instance", function() {
                    o = new cls();
                    expect(o.setConfig()).toBe(o);
                });
            });
        });
        
        it("should merge properly", function() {
            var obj = new subClass;
            expect(obj.config).toEqual({
                mixinConfig: 'mixinConfig',
                name: 'subClass',
                isCool: true,
                members: {
                    abe: 'Abraham Elias',
                    ed: 'Ed Spencer',
                    jacky: 'Jacky Nguyen',
                    tommy: 'Tommy Maintz'
                },
                hobbies: ['sleeping', 'eating', 'movies'],
                isSpecial: true
            });
        });

        it("should apply default config", function() {
            var obj = new subClass;
            expect(obj.getName()).toBe('subClass');
            expect(obj.getIsCool()).toBe(true);
            expect(obj.getHobbies()).toEqual(['sleeping', 'eating', 'movies']);
        });

        it("should apply with supplied config", function() {
            var obj = new subClass({
                name: 'newName',
                isCool: false,
                members: {
                    aaron: 'Aaron Conran'
                }
            });

            expect(obj.getName()).toBe('newName');
            expect(obj.getIsCool()).toBe(false);
            expect(obj.getMembers().aaron).toBe('Aaron Conran');
        });

        it("should not share the same config", function() {
            var obj1 = new subClass({
                name: 'newName',
                isCool: false,
                members: {
                    aaron: 'Aaron Conran'
                }
            });

            var obj2 = new subClass();

            expect(obj2.getName()).not.toBe('newName');
        });
        
        it("should copy objects", function() {
            var o1 = new parentClass(),
                o2 = new parentClass(),
                m1 = o1.getMembers(),
                m2 = o2.getMembers();
                
            expect(m1).not.toBe(m2);
            expect(m1).toEqual(m2);    
        });
        
        // Possibly need to revisit this, arrays are not cloned.
        it("should copy arrays", function() {
            var o1 = new parentClass(),
                o2 = new parentClass(),
                h1 = o1.getHobbies(),
                h2 = o2.getHobbies();
                
            expect(h1).not.toBe(h2);
            expect(h1).toEqual(h2);    
        });
        
        describe("values", function() {
            it("should set the the config value defined", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    config: {
                        foo: 'bar'
                    }
                });
                expect((new cls()).getFoo()).toBe('bar');
            });  
            
            it("should be able to set the config", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    config: {
                        foo: 'bar'
                    }
                });
                o = new cls();
                o.setFoo('baz');
                expect(o.getFoo()).toBe('baz');
                o = null;
            });
            
            it("should use the inherited config", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    config: {
                        foo: 'bar'
                    }
                });
                
                sub = Ext.define(null, {
                    extend: cls,
                    config: {
                        foo: 'baz'
                    }
                });
                expect((new sub()).getFoo()).toBe('baz');
            });
            
            it("should inherit the parent value even if not specified in the config block", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    config: {
                        foo: 'bar'
                    }
                });
                
                sub = Ext.define(null, {
                    extend: cls,
                    config: {
                        herp: 'derp'
                    }
                });
                expect((new sub()).getFoo()).toBe('bar');
            });
        });
        
        describe("value on prototype", function() {
            it("should read the value from the prototype in a subclass", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    config: {
                        foo: 'bar'
                    }    
                });  
                
                sub = Ext.define(null, {
                    extend: cls,
                    foo: 'baz'
                });
                
                expect((new sub()).getFoo()).toBe('baz');
            });  
            
            it("should remove the property from the prototype", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    config: {
                        foo: 'bar'
                    }    
                });  
                
                sub = Ext.define(null, {
                    extend: cls,
                    foo: 'baz'
                });
                expect(sub.prototype.foo).toBeUndefined();
            });
            
            it("should favour the property on the config", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    foo: 'baz',
                    config: {
                        foo: 'bar'
                    }    
                });
                expect((new cls()).getFoo()).toBe('bar');
            });

            it("should favour the property on the prototype in a subclass", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    config: {
                        foo: 'bar'
                    }
                });

                sub = Ext.define(null, {
                    extend: cls,
                    foo: 'baz'
                });
                expect((new sub()).getFoo()).toBe('baz');
            });
            
            it("should pull the property from the prototype in the subclass if it exists on the parent prototype", function() {
                cls = Ext.define(null, {
                    constructor: defaultInitConfig,
                    foo: 'baz',
                    config: {
                        foo: 'bar'
                    }    
                });  
                
                sub = Ext.define(null, {
                    extend: cls,
                    foo: 'bleh'
                });
                expect((new sub()).getFoo()).toBe('bleh');
            });
        });
        
        describe("$configStrict", function() {
            it("should not copy non-configs to the instance when true", function() {
                cls = Ext.define(null, {
                    $configStrict: true,
                    config: {
                        foo: 'bar'
                    },
                    constructor: defaultInitConfig
                });
                
                o = new cls({
                    baz: 1
                });
                expect(o.baz).not.toBeDefined();
            });  
            
            it("should copy non-configs to the instance when false", function() {
                cls = Ext.define(null, {
                    $configStrict: false,
                    config: {
                        foo: 'bar'
                    },
                    constructor: defaultInitConfig
                });
                
                o = new cls({
                    baz: 1
                });
                expect(o.baz).toBe(1);
            }); 
            
            it("should not copy if the subclass sets the property to true", function() {
                cls = Ext.define(null, {
                    $configStrict: false,
                    config: {
                        foo: 'bar'
                    },
                    constructor: defaultInitConfig
                });
                sub = Ext.define(null, {
                    extend: sub,
                    $configStrict: true
                });
                
                o = new sub({
                    baz: 1
                });
                expect(o.baz).not.toBeDefined();
            });
        });
        
        describe("$configPrefixed", function() {
            var defineCls = function(prefix, defaultValue) {
                cls = Ext.define(null, {
                    $configPrefixed: !!prefix,
                    config: {
                        foo: defaultValue || 'bar'
                    },
                    constructor: defaultInitConfig    
                });  
            };
            
            it("should use the config name as the instance property when false", function() {
                defineCls();
                o = new cls();
                expect(o.foo).toBe('bar');
            });
            
            it("should use _config name as the instance property when true", function() {
                defineCls(true); 
                o = new cls();
                expect(o._foo).toBe('bar');
            });
            
            it("should allow a subclass to have a different prefix", function() {
                defineCls(false, {});
                sub = Ext.define(null, {
                    extend: cls,
                    $configPrefixed: true
                });
                
                var o1 = new cls(),
                    o2 = new sub();
                    
                // Use objects since they won't get stamped on the prototype.
                expect(o1.foo).toEqual({});
                expect(o2._foo).toEqual({});
                expect(o2.foo).not.toBeDefined();
            });
        });

        describe("meta configs", function() {
            describe('mixins', function () {
                it("should inherit meta configs from mixins", function() {
                    var calls = 0;

                    var Mix = Ext.define(null, {
                        config: {
                            foo: {
                                lazy: true,
                                $value: 42
                            }
                        }
                    });

                    var Cls = Ext.define(null, {
                        mixins: {
                            mix: Mix
                        },
                        constructor: function (config) {
                            this.initConfig(config);
                        },
                        applyFoo: function (newValue, oldValue) {
                            ++calls;
                            return newValue;
                        }
                    });

                    o = new Cls();
                    expect(calls).toBe(0);

                    var v = o.getFoo();

                    expect(v).toBe(42);
                    expect(calls).toBe(1);
                });

                it("should not allow mixins to modify meta configs", function() {
                    var calls = 0;

                    var Mix = Ext.define(null, {
                        config: {
                            foo: {
                                lazy: false,
                                $value: 1
                            }
                        }
                    });

                    var Cls = Ext.define(null, {
                        mixins: {
                            mix: Mix
                        },
                        config: {
                            foo: {
                                lazy: true,
                                $value: 2
                            }
                        },
                        constructor: function (config) {
                            this.initConfig(config);
                        },
                        applyFoo: function (newValue, oldValue) {
                            ++calls;
                            return newValue;
                        }
                    });

                    o = new Cls();
                    expect(calls).toBe(0);

                    var v = o.getFoo();

                    expect(v).toBe(2);
                    expect(calls).toBe(1);
                });
            });

            describe("cached", function() {
                describe("caching", function() {
                    it("should not attempt to initialize until the first instance", function() {
                        cls = Ext.define(null, {
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            }
                        });
                        expect(cls.prototype.foo).not.toBeDefined();
                    });
                    
                    it("should not attempt to cache the config if we don't call initConfig", function() {
                        cls = Ext.define(null, {
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            }
                        });
                        new cls();
                        expect(cls.prototype.foo).not.toBeDefined();
                    });

                    it("should stamp the value on the prototype after the first instance is created", function() {
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            cachedConfig: {
                                foo: 'bar'
                            }
                        });
                        o = new cls();
                        expect(cls.prototype._foo).toBe('bar');
                        expect(o.hasOwnProperty('_foo')).toBe(false);
                    });

                    it("should stamp all values on the prototype after the first instance is created", function() {
                        var calls = 0;

                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            cachedConfig: {
                                foo: 21,
                                bar: 1,
                                baz: 3
                            },
                            applyFoo: function (foo) {
                                ++calls;
                                return foo * this.getBar(); // fwd dependency
                            },
                            applyBar: function (bar) {
                                ++calls;
                                return bar * 2;
                            },
                            applyBaz: function (baz) {
                                ++calls;
                                return baz * this.getFoo(); // backward dependency
                            }
                        });

                        o = new cls();

                        expect(cls.prototype._foo).toBe(42);
                        expect(cls.prototype._bar).toBe(2);
                        expect(cls.prototype._baz).toBe(3 * 42);

                        expect(calls).toBe(3);
                        expect(o.hasOwnProperty('_foo')).toBe(false);
                        expect(o.hasOwnProperty('_bar')).toBe(false);
                        expect(o.hasOwnProperty('_baz')).toBe(false);

                        o = new cls();

                        expect(calls).toBe(3);
                        expect(o.hasOwnProperty('_foo')).toBe(false);
                        expect(o.hasOwnProperty('_bar')).toBe(false);
                        expect(o.hasOwnProperty('_baz')).toBe(false);
                    });

                    it("should work with the cachedConfig notification", function() {
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            }
                        });
                        o = new cls();
                        expect(cls.prototype._foo).toBe('bar');
                        expect(o.hasOwnProperty('_foo')).toBe(false);
                    });
                    
                    it("should call an applier only once", function() {
                        var count = 0;
                        
                        o = {};
                            
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            },
                            applyFoo: function(foo) {
                                ++count;
                                o.foo = foo;
                                return o;
                            }
                        });
                        var a = new cls(),
                            b = new cls(),
                            c = new cls();
                           
                        expect(count).toBe(1);
                        expect(a.getFoo()).toBe(o);
                        expect(b.getFoo()).toBe(o);
                        expect(c.getFoo()).toBe(o); 
                    });
                    
                    it("should call the updater only once", function() {
                        var count = 0;
                            
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            },
                            updateFoo: function(foo) {
                                ++count;
                            }
                        });
                        var a = new cls(),
                            b = new cls(),
                            c = new cls();
                           
                        expect(count).toBe(1);
                    });
                    
                    it("should allow the value to be updated from the config", function() {
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            }
                        });
                        
                        o = new cls({
                            foo: 'baz'
                        });
                        expect(cls.prototype._foo).toBe('bar');
                        expect(o.getFoo()).toBe('baz');
                    });
                    
                    it("should allow the value to be updated from the setter", function() {
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            }
                        });
                        
                        o = new cls();
                        o.setFoo('baz');
                        expect(cls.prototype._foo).toBe('bar');
                        expect(o.getFoo()).toBe('baz');
                    });
                });
                
                describe("subclassing", function() {
                    it("should initialize the value on the subclass prototype", function() {
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            }
                        });
                        
                        sub = Ext.define(null, {
                            extend: cls
                        });
                        
                        o = new sub();
                        expect(sub.prototype._foo).toBe('bar');
                        expect(o.getFoo()).toBe('bar');
                    });  
                    
                    it("should be able to override the default value", function() {
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            }
                        });
                        
                        sub = Ext.define(null, {
                            extend: cls,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'baz'
                                }
                            }
                        });
                        
                        o = new sub();
                        expect(sub.prototype._foo).toBe('baz');
                        expect(o.getFoo()).toBe('baz');
                    });
                    
                    it("should call the applier only once per instance", function() {
                        var parentCount = 0,
                            subCount = 0;
                            
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            },
                            
                            applyFoo: function(foo) {
                                if (this.self === cls) {
                                    ++parentCount;
                                } else if (this.self === sub) {
                                    ++subCount;
                                }
                                return foo;
                            }
                        });
                        
                        sub = Ext.define(null, {
                            extend: cls
                        });
                        
                        new cls();
                        new sub();
                        
                        new cls();
                        new sub();
                        
                        new cls();
                        new sub();
                        
                        expect(parentCount).toBe(1);
                        expect(subCount).toBe(1);
                    });
                    
                    it("should retain cached-ness even when overridden in a subclass config", function() {
                        cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            
                            config: {
                                foo: {
                                    cached: true,
                                    $value: 'bar'
                                }
                            }
                        });
                        
                        sub = Ext.define(null, {
                            config: {
                                foo: 'baz'
                            }
                        });
                    });
                    
                    it("should not allow an initially uncached config to be declared as cached", function() {
                        cls = Ext.define(null, {
                            config: {
                                foo: 1
                            }
                        });
                        
                        expect(function() {
                            Ext.define(null, {
                                extend: cls,
                                config: {
                                    foo: {
                                        cached: true,
                                        $value: 2
                                    }
                                }
                            });
                        }).toThrow();
                    });
                    
                    describe("nulls", function() {
                        it("should allow null overrides in child classes", function() {
                            cls = Ext.define(null, {
                                config: {
                                    foo: {
                                        cached: true,
                                        $value: 1
                                    }
                                },
                                constructor: defaultInitConfig
                            });
                            sub = Ext.define(null, {
                                extend: cls,
                                config: {
                                    foo: {
                                        cached: true,
                                        $value: null
                                    }
                                }
                            });    
                            
                            new cls();
                            new sub();
                            expect(cls.prototype._foo).toBe(1);
                            expect(sub.prototype._foo).not.toBeDefined();
                        });
                        
                        it("should allow null in the base class and value overrides in child classes", function() {
                            cls = Ext.define(null, {
                                config: {
                                    foo: {
                                        cached: true,
                                        $value: null
                                    }
                                },
                                constructor: defaultInitConfig
                            });
                            sub = Ext.define(null, {
                                extend: cls,
                                config: {
                                    foo: {
                                        cached: true,
                                        $value: 1
                                    }
                                }
                            }); 
                            
                            new cls();
                            new sub();
                            expect(cls.prototype._foo).toBe(null);
                            expect(sub.prototype._foo).toBe(1);
                        });
                        
                        it("should be able to return to being cached after being nulled out", function() {
                            var A = Ext.define(null, {
                                config: {
                                    foo: {
                                        cached: true,
                                        $value: 1
                                    }
                                },
                                constructor: defaultInitConfig    
                            });
                            
                            var B = Ext.define(null, {
                                extend: A,
                                config: {
                                    foo: {
                                        cached: true,
                                        $value: null
                                    }
                                }
                            });
                            
                            var C = Ext.define(null, {
                                extend: B,
                                config: {
                                    foo: {
                                        cached: true,
                                        $value: 2
                                    }
                                }
                            });
                            
                            new A();
                            expect(A.prototype._foo).toBe(1);
                            new B();
                            expect(B.prototype._foo).not.toBeDefined();
                            new C();
                            expect(C.prototype._foo).toBe(2);
                        });
                    });
                });
            });

            describe("lazy", function() {
                function makeLazy(value) {
                    return {
                        foo: {
                            lazy: true,
                            $value: value
                        }
                    };
                }

                describe("basic construction", function() {
                    it("should not call the applier when instantiated without a config value", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            applyFoo: spy
                        });

                        new Cls();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should not call the applier when instantiated with a config value", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            applyFoo: spy
                        });

                        new Cls({
                            foo: 100
                        });
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should not call the updater when instantiated without a config value", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            updateFoo: spy
                        });

                        new Cls();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should not call the updater when instantiated with a config value", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            updateFoo: spy
                        });

                        new Cls({
                            foo: 100
                        });
                        expect(spy).not.toHaveBeenCalled();
                    });
                });

                describe("during construction", function() {
                    it("should allow the getter to be called during initConfig by another method", function() {
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: Ext.apply({
                                bar: 0
                            }, makeLazy(1)),

                            applyBar: function() {
                                return this.getFoo() + 100;
                            }
                        });

                        o = new Cls();
                        expect(o.getBar()).toBe(101);
                    });

                    it("should not call the applier on subsequent get calls", function() {
                        var spy = jasmine.createSpy().andReturn(1);
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: Ext.apply({
                                bar: 0
                            }, makeLazy(1)),

                            applyFoo: spy,
                            applyBar: function() {
                                return this.getFoo() + 100;
                            }
                        });

                        o = new Cls();
                        expect(spy.callCount).toBe(1);
                        o.getFoo();
                        expect(spy.callCount).toBe(1);
                    });

                    it("should not call the updater on subsequent get calls", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: Ext.apply({
                                bar: 0
                            }, makeLazy(1)),

                            updateFoo: spy,
                            applyBar: function() {
                                return this.getFoo() + 100;
                            }
                        });

                        o = new Cls();
                        expect(spy.callCount).toBe(1);
                        o.getFoo();
                        expect(spy.callCount).toBe(1);
                    });
                });

                describe("value before first get call", function() {
                    describe("from the prototype", function() {
                        it("should have primitives defined on the instance", function() {
                            var Cls = Ext.define(null, {
                                constructor: defaultInitConfig,
                                config: makeLazy(1)
                            });
                            var o = new Cls();
                            expect(o._foo).toBe(1);
                        });

                        it("should not have objects on the instance", function() {
                            var Cls = Ext.define(null, {
                                constructor: defaultInitConfig,
                                config: makeLazy({})
                            });
                            var o = new Cls();
                            expect(o._foo).not.toBeDefined();
                        });
                    });

                    describe("from the instance config", function() {
                        it("should not set the value on the underlying property", function() {
                            var Cls = Ext.define(null, {
                                constructor: defaultInitConfig,
                                config: makeLazy({})
                            });
                            var o = new Cls({
                                foo: {}
                            });
                            expect(o._foo).not.toBeDefined();
                        });
                    });

                    it("should not have configs with a custom setter on the instance", function() {
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),
                            setFoo: function() {
                                this.callParent(arguments);
                                return this;
                            }
                        });
                        var o = new Cls();
                        expect(o._foo).not.toBeDefined();
                    });

                    it("should not have configs with a custom applier on the instance", function() {
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),
                            applyFoo: Ext.identityFn
                        });
                        var o = new Cls();
                        expect(o._foo).not.toBeDefined();
                    });

                    it("should not have configs with a custom updater on the instance", function() {
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),
                            updateFoo: Ext.emptyFn
                        });
                        var o = new Cls();
                        expect(o._foo).not.toBeDefined();
                    });

                    it("should not call the getter if set is called", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),
                            getFoo: spy
                        });
                        var o = new Cls();
                        o.setFoo(2);
                        expect(spy).not.toHaveBeenCalled();
                    });
                });

                describe("first call to get", function() {
                    it("should call the applier on the first get call", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            applyFoo: spy
                        });

                        o = new Cls({});
                        o.getFoo();
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should not call the applier on subsequent get calls", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            applyFoo: spy
                        });

                        o = new Cls({});
                        o.getFoo();
                        o.getFoo();
                        o.getFoo();
                        expect(spy.callCount).toBe(1);
                    });

                    it("should call the updater on the first get call", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            updateFoo: spy
                        });

                        o = new Cls({});
                        o.getFoo();
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should not call the updater on subsequent get calls", function() {
                        var spy = jasmine.createSpy();
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            updateFoo: spy
                        });

                        o = new Cls({});
                        o.getFoo();
                        o.getFoo();
                        o.getFoo();
                        expect(spy.callCount).toBe(1);
                    });

                    it("should merge any values for objects", function() {
                        var Cls = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    lazy: true,
                                    $value: {
                                        z: 1
                                    }
                                }
                            }
                        });

                        o = new Cls({
                            foo: {
                                y: 2
                            }
                        });
                        expect(o.getFoo()).toEqual({
                            y: 2,
                            z: 1
                        });
                    });
                });

                describe("subclassing", function() {
                    it("should inherit laziness from the parent", function() {
                        var spy = jasmine.createSpy();
                        var A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            applyFoo: spy
                        });

                        var B = Ext.define(null, {
                            extend: A
                        });
                        o = new B();
                        expect(spy).not.toHaveBeenCalled();
                        o.getFoo();
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should inherit laziness from the parent and allow the value to change", function() {
                        var spy = jasmine.createSpy().andCallFake(function(v) {
                            return v;
                        });
                        var A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            applyFoo: spy
                        });

                        var B = Ext.define(null, {
                            extend: A,
                            config: {
                                foo: 9876
                            }
                        });
                        o = new B();
                        expect(spy).not.toHaveBeenCalled();
                        expect(o.getFoo()).toBe(9876);
                    });

                    it("should be able to go from lazy -> !lazy", function() {
                        var spy = jasmine.createSpy();
                        var A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            applyFoo: spy
                        });

                        var B = Ext.define(null, {
                            extend: A,
                            config: {
                                foo: {
                                    lazy: false,
                                    $value: 1
                                }
                            }
                        });

                        o = new B();
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should be able to go from !lazy -> lazy", function() {
                        var spy = jasmine.createSpy();
                        var A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: 1
                            },

                            applyFoo: spy
                        });

                        var B = Ext.define(null, {
                            extend: A,
                            config: makeLazy(1)
                        });

                        o = new B();
                        expect(spy).not.toHaveBeenCalled();
                        o.getFoo();
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should retain laziness on the superclass", function() {
                        var spy = jasmine.createSpy();
                        var A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: makeLazy(1),

                            applyFoo: spy
                        });

                        var B = Ext.define(null, {
                            extend: A,
                            config: {
                                foo: {
                                    lazy: false,
                                    $value: 2
                                }
                            }
                        });

                        o = new A();
                        expect(spy).not.toHaveBeenCalled();
                        o.getFoo();
                        expect(spy).toHaveBeenCalled();
                    });
                });
            });

            describe("merge", function() {
                var spy, A, B;
                beforeEach(function() {
                    spy = jasmine.createSpy();
                });

                afterEach(function() {
                    A = B = null;
                });

                describe("during class definition", function() {
                    function defineInherit(aVal, bVal, onlyA) {
                        A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    merge: spy,
                                    $value: aVal
                                }
                            }
                        });

                        if (!onlyA) {
                            B = Ext.define(null, {
                                extend: A,
                                config: {
                                    foo: bVal
                                }
                            });
                        }
                    }

                    function defineMixin(aVal, bVal) {
                        Ext.undefine('spec.B');
                        // Mixins require a name to work...
                        B = Ext.define('spec.B', {
                            config: {
                                foo: bVal
                            }
                        });

                        A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            mixins: [B],
                            config: {
                                foo: {
                                    merge: spy,
                                    $value: aVal
                                }
                            }
                        });
                    }

                    afterEach(function() {
                        Ext.undefine('spec.B');
                    });

                    it("should not call the merge fn when defining the config", function() {
                        defineInherit({}, undefined, true);
                        expect(spy).not.toHaveBeenCalled();
                    });

                    describe("merge values", function() {
                        var possible = [undefined, null, true, 'aString', 1, new Date(), {}, []];
                        describe("for subclasses", function() {
                            it("should call the merge function for all value combinations", function() {
                                Ext.Array.forEach(possible, function(superValue) {
                                    Ext.Array.forEach(possible, function(subValue) {
                                        spy.reset();
                                        defineInherit(superValue, subValue);
                                        expect(spy).toHaveBeenCalled();
                                    });
                                });
                            });
                        });

                        describe("for mixins", function() {
                            it("should call the merge function for all value combinations", function() {
                                Ext.Array.forEach(possible, function(mixinValue) {
                                    Ext.Array.forEach(possible, function(clsValue) {
                                        spy.reset();
                                        defineMixin(mixinValue, clsValue, false, true);
                                        expect(spy).toHaveBeenCalled();
                                    });
                                });
                            });
                        });
                    });

                    describe("merging", function() {
                        it("should pass the sub value, then super value and whether it is from a mixin", function() {
                            var o1 = {},
                                o2 = {};

                            defineInherit(o1, o2);

                            var call = spy.mostRecentCall;
                            var args = call.args;

                            // When merge is called the "this" pointer should be the
                            // Ext.Config instance (which may have meta-level configs on
                            // it).
                            expect(call.object).toBe(B.$config.configs.foo);

                            expect(args[0]).toBe(o2);
                            expect(args[1]).toBe(o1);
                            expect(args[2]).toBe(B);
                            expect(args[3]).toBeFalsy();
                        });

                        describe("with a mixin", function() {
                            it("should pass the mixinClass", function() {
                                defineMixin({}, {});
                                var args = spy.mostRecentCall.args;
                                expect(args[2]).toBe(A);
                                expect(args[3]).toBe(B);
                            });
                        });

                        it("should pass the scope as the Config instance", function() {
                            defineInherit({}, {});
                            expect(spy.mostRecentCall.object).toBe(B.$config.configs.foo);
                        });

                        it("should set the returned value", function() {
                            spy = jasmine.createSpy().andReturn({
                                merged: 'ok!'
                            });
                            defineInherit({}, {});
                            o = new B();
                            expect(o.getFoo()).toEqual({
                                merged: 'ok!'
                            });
                        });
                    });

                });

                describe("instance values", function() {
                    var A;
                    function defineAndInstance(classVal, instanceVal) {
                        A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    merge: spy,
                                    $value: classVal
                                }
                            }
                        });

                        o = new A({
                            foo: instanceVal
                        });
                    }

                    afterEach(function() {
                        A = null;
                    });

                    describe("merge values", function() {
                        it("should call the merge function for all value combinations", function() {
                            var possible = [undefined, null, true, 'aString', 1, new Date(), {}, []];
                            Ext.Array.forEach(possible, function(clsValue) {
                                Ext.Array.forEach(possible, function(instanceValue) {
                                    spy.reset();
                                    defineAndInstance(clsValue, instanceValue);
                                    expect(spy).toHaveBeenCalled();
                                });
                            });
                        });
                    });

                    describe("merging", function() {
                        it("should pass the instance value, then class value", function() {
                            var args;

                            defineAndInstance({
                                foo: 1
                            }, {
                                bar: 1
                            });
                            args = spy.mostRecentCall.args;
                            expect(args[0]).toEqual({
                                bar: 1
                            });
                            expect(args[1]).toEqual({
                                foo: 1
                            });
                        });

                        it("should pass the instance", function() {
                            defineAndInstance({}, {});
                            expect(spy.mostRecentCall.args[2]).toBe(o);
                        });

                        it("should set the returned value", function() {
                            spy = jasmine.createSpy().andReturn({
                                merged: 'ok!'
                            });
                            defineAndInstance({}, {});
                            expect(o.getFoo()).toEqual({
                                merged: 'ok!'
                            });
                        });
                    });
                });

                describe("subclassing", function() {
                    it("should inherit the merge from the parent", function() {
                        A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    merge: spy,
                                    $value: null
                                }
                            }
                        });

                        B = Ext.define(null, {
                            extend: A,
                            config: {
                                foo: {}
                            }
                        });

                        spy.reset();
                        o = new B({
                            foo: {}
                        });
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should be able to set a merge on a subclass", function() {
                        A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: 1
                            }
                        });

                        B = Ext.define(null, {
                            extend: A,
                            config: {
                                foo: {
                                    merge: spy,
                                    $value: {}
                                }
                            }
                        });

                        spy.reset();
                        o = new B({
                            foo: {}
                        });
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should be able to override the merge on a superclass", function() {
                        var superSpy = jasmine.createSpy();
                        spy = jasmine.createSpy().andReturn({});

                        A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    merge: superSpy,
                                    $value: {}
                                }
                            }
                        });

                        B = Ext.define(null, {
                            extend: A,
                            config: {
                                foo: {
                                    merge: spy,
                                    $value: {}
                                }
                            }
                        });

                        superSpy.reset();
                        spy.reset();
                        o = new B({
                            foo: {}
                        });
                        expect(superSpy).not.toHaveBeenCalled();
                        expect(spy).toHaveBeenCalled();
                    });

                    it("should retain the merge on the superclass", function() {
                        var superSpy = jasmine.createSpy().andReturn({});

                        A = Ext.define(null, {
                            constructor: defaultInitConfig,
                            config: {
                                foo: {
                                    merge: superSpy,
                                    $value: {}
                                }
                            }
                        });

                        B = Ext.define(null, {
                            extend: A,
                            config: {
                                foo: {
                                    merge: spy,
                                    $value: {}
                                }
                            }
                        });

                        superSpy.reset();
                        spy.reset();
                        o = new A({
                            foo: {}
                        });
                        expect(superSpy).toHaveBeenCalled();
                        expect(spy).not.toHaveBeenCalled();
                    });
                });
            });
        });
        
    });
    
    describe("statics", function() {
        beforeEach(function() {
            fn = function() {};
        });
        it("should copy static properties to the class", function() {
            cls = Ext.define(null, {
                statics: {
                    someName: 'someValue',
                    someMethod: fn
                }
            });
            expect(cls.someName).toBe('someValue');
            expect(cls.someMethod).toBe(fn);
        });
        
        it("should not copy statics to subclasses", function() {
            cls = Ext.define(null, {
                statics: {
                    someName: 'someValue',
                    someMethod: fn
                }
            });
            
            sub = Ext.define(null, {
                extend: sub
            });
            expect(sub.someName).not.toBeDefined();
            expect(sub.someMethod).not.toBeDefined();
        });
    });
    
    describe("inheritableStatics", function() {
        beforeEach(function() {
            fn = function() {};
        });
        
        it("should store names of inheritable static properties", function() {
            cls = Ext.define(null, {
                inheritableStatics: {
                    someName: 'someValue',
                    someMethod: fn
                }
            });

            expect((new cls()).inheritableStatics).not.toBeDefined();
            expect(cls.someName).toBe('someValue');
            expect(cls.prototype.$inheritableStatics).toEqual(['someName', 'someMethod']);
            expect(cls.someMethod).toBe(fn);
        });
        
        it("should inherit inheritable statics", function() {
            cls = Ext.define(null, {
                inheritableStatics: {
                    someName: 'someValue',
                    someMethod: fn
                }
            });
            sub = Ext.define(null, {
                extend: cls
            });

            expect(sub.someName).toBe('someValue');
            expect(sub.someMethod).toBe(fn);
        });
        
        it("should NOT inherit inheritable statics if the class already has it", function() {
            cls = Ext.define(null, {
                inheritableStatics: {
                    someName: 'someValue',
                    someMethod: fn
                }
            });
            sub = Ext.define(null, {
                extend: cls,
                statics: {
                    someName: 'someOtherValue',
                    someMethod: function(){}
                }
            });

            expect(sub.someName).toBe('someOtherValue');
            expect(sub.someMethod).not.toBe(fn);
        });
    });

    describe("addStatics", function() {
        it("single with name - value arguments", function() {
            var called = false;

            subClass.addStatics({
                staticMethod: function(){
                    called = true;
                }
            });

            expect(subClass.staticMethod).toBeDefined();
            subClass.staticMethod();

            expect(called).toBeTruthy();
        });

        it("multiple with object map argument", function() {
            subClass.addStatics({
                staticProperty: 'something',
                staticMethod: function(){}
            });

            expect(subClass.staticProperty).toBe('something');
            expect(subClass.staticMethod).toBeDefined();
        });
    });


    describe("override", function() {
        it("should override", function() {
            subClass.override({
                myOwnMethod: function(){
                    this.isOverridden = true;

                    this.callOverridden(arguments);
                }
            });

            var obj = new subClass;
            obj.myOwnMethod();

            expect(obj.isOverridden).toBe(true);
            expect(obj.myOwnMethodCalled).toBe(true);
        });
        
        it("should override a default config", function() {
            cls = Ext.define(null, {
                constructor: defaultInitConfig,
                config: {
                    foo: 1
                }
            });
            
            cls.override({
                config: {
                    foo: 2
                }
            });
            
            expect((new cls()).getFoo()).toBe(2);
        });
        
        it("should be able to add a new config", function() {
            cls = Ext.define(null, {
                constructor: defaultInitConfig,
                config: {
                    foo: 1
                }
            });
            
            cls.override({
                config: {
                    bar: 2
                }
            });
            
            expect((new cls()).getBar()).toBe(2);
        });
    });

    describe('private methods', function () {
        var Base;

        beforeEach(function () {
            Base = Ext.define(null, {
                bar: function () {},

                privates: {
                    foo: function () {}
                }
            });
        });

        describe('extend', function () {
            it('should allow derived class to override a private method w/a private method', function () {
                expect(function () {
                    Ext.define(null, {
                        extend: Base,

                        privates: {
                            foo: function () {}
                        }
                    });
                }).not.toThrow();
            });

            it('should allow derived class to override a public method w/a private method', function () {
                expect(function () {
                    Ext.define(null, {
                        extend: Base,

                        privates: {
                            bar: function () {}
                        }
                    });
                }).not.toThrow();
            });

            it('should throw when derived class overrides a private method', function () {
                expect(function () {
                    Ext.define(null, {
                        extend: Base,

                        foo: function () {}
                    });
                }).toThrow();
            });

            it('should throw when derived class overrides a private method w/a foreign private method', function () {
                expect(function () {
                    Ext.define(null, {
                        extend: Base,

                        privates: {
                            privacy: 'user',

                            foo: function () {}
                        }
                    });
                }).toThrow();
            });
        });

        describe('override', function () {
            it('should throw when overriding a private method', function () {
                expect(function () {
                    Base.override({
                        foo: function () {}
                    });
                }).toThrow();
            });

            it('should allow overriding a public method w/a private method', function () {
                expect(function () {
                    Base.override({
                        privates: {
                            bar: function () {}
                        }
                    });
                }).not.toThrow();
            });

            it('should allow overriding a private method w/a private method', function () {
                expect(function () {
                    Base.override({
                        privates: {
                            foo: function () {}
                        }
                    });
                }).not.toThrow();
            });

            it('should throw when derived class overrides a private method w/a foreign private method', function () {
                expect(function () {
                    Base.override({
                        privates: {
                            privacy: 'user',

                            foo: function () {}
                        }
                    });
                }).toThrow();
            });
        });
    });

    describe("define override", function() {
        var obj,
            createFnsCalled;

        beforeEach(function () {
            createFnsCalled = [];

            function onCreated () {
                createFnsCalled.push(this.$className);
            }

            Ext.define('Foo.UnusedOverride', {
                override: 'Foo.Nothing',

                foo: function (x) {
                    return this.callParent([x*2]);
                }
            }, onCreated);

            // this override comes before its target:
            Ext.define('Foo.SingletonOverride', {
                override: 'Foo.Singleton',

                foo: function (x) {
                    return this.callParent([x*2]);
                }
            }, onCreated);

            Ext.define('Foo.Singleton', {
                singleton: true,
                foo: function (x) {
                    return x;
                }
            });

            Ext.define('Foo.SomeBase', {
                patchedMethod: function (x) {
                    return x + 'A';
                },

                statics: {
                    patchedStaticMethod: function (x) {
                        return x + 'a';
                    },
                    staticMethod: function (x) {
                        return 'A' + x;
                    }
                }
            });

            Ext.define('Foo.SomeClass', {
                extend: 'Foo.SomeBase',

                prop: 1,

                constructor: function () {
                    this.prop = 2;
                },

                method1: function(x) {
                    return 'b' + x;
                },
                
                patchedMethod: function () {
                    return this.callParent() + 'B';
                },

                statics: {
                    patchedStaticMethod: function (x) {
                        return this.callParent(arguments) + 'b';
                    },

                    staticMethod: function (x) {
                        return 'B' + this.callParent(arguments);
                    }
                }
            });

            // this override comes after its target:
            Ext.define('Foo.SomeClassOverride', {
                override: 'Foo.SomeClass',

                constructor: function () {
                    this.callParent(arguments);
                    this.prop *= 21;
                },

                method1: function(x) {
                    return 'a' + this.callParent([x*2]) + 'c';
                },

                method2: function() {
                    return 'two';
                },

                patchedMethod: function (x) {
                    return this.callSuper(arguments) + 'C';
                },

                statics: {
                    newStatic: function () {
                        return 'boo';
                    },
                    patchedStaticMethod: function (x) {
                        return this.callSuper(arguments) + 'c';
                    },
                    staticMethod: function (x) {
                        return 'Z' + this.callParent([x*2]) + '!';
                    }
                }
            }, onCreated);

            obj = Ext.create('Foo.SomeClass');
        });

        afterEach(function () {
            Ext.each(['Foo.SingletonOverride', 'Foo.Singleton', 'Foo.SomeClassOverride',
                      'Foo.SomeBase', 'Foo.SomeClass'],
                function (className) {
                    Ext.undefine(className);
                });

            Ext.undefine('Foo');

            obj = null;
        });

        it("should call the createdFn", function () {
            expect(createFnsCalled.length).toBe(2);
            expect(createFnsCalled[0]).toBe('Foo.Singleton');
            expect(createFnsCalled[1]).toBe('Foo.SomeClass');
        });

        it("can override constructor", function() {
            expect(obj.prop).toBe(42);
        });

        it("can add new methods", function() {
            expect(obj.method2()).toBe('two');
        });

        it("can add new static methods", function() {
            expect(Foo.SomeClass.newStatic()).toBe('boo');
        });

        it("callParent should work for instance methods", function() {
            expect(obj.method1(21)).toBe('ab42c');
        });

        it("callParent should work for static methods", function() {
            expect(Foo.SomeClass.staticMethod(21)).toBe('ZBA42!');
        });

        it("callSuper should work for instance methods", function() {
            expect(obj.patchedMethod('x')).toBe('xAC');
        });

        it("callSuper should work for static methods", function() {
            expect(Foo.SomeClass.patchedStaticMethod('X')).toBe('Xac');
        });

        it('works with singletons', function () {
            expect(Foo.Singleton.foo(21)).toBe(42);
        });
    });

    describe("mixin", function() {
        it("should have all properties of mixins", function() {
            var obj = new subClass;
            expect(obj.mixinProperty1).toBe('mixinProperty1');
            expect(obj.mixinProperty2).toBe('mixinProperty2');
            expect(obj.mixinMethod1).toBeDefined();
            expect(obj.mixinMethod2).toBeDefined();
            expect(obj.getMixinConfig()).toBe('mixinConfig');
        });

        it("should not overwrite a config if it exists on the class", function() {
            var Mix = Ext.define('spec.Mixin', {
                config: {
                    foo: 1
                }
            });

            var Cls = Ext.define(null, {
                constructor: defaultInitConfig,
                mixins: [Mix],
                config: {
                    foo: 2
                }
            });
            o = new Cls();
            expect(o.getFoo()).toBe(2);
            Ext.undefine('spec.Mixin');
        });
    });

    describe('hooks', function() {
        var fooResult,
            extendLog;

        beforeEach(function() {
            fooResult = '';
            extendLog = [];

            Ext.define('Foo.M1', {
                extend: 'Ext.Mixin',

                mixinConfig: {
                    extended: function (base, derived, body) {
                        extendLog.push(derived.$className + ' extends ' + base.$className);
                    }
                },

                foo: function(s) {
                    fooResult += 'M1.foo' + s;
                },
                doBar: function(s) {
                    fooResult += 'M1.bar' + s;
                }
            });
            Ext.define('Foo.M2', {
                extend: 'Foo.M1',
                mixinConfig: {
                    on: {
                        foo: function(s) {
                            this.callParent(arguments); // Expected not to call anything.
                            // These cannot call parent for now.
                            fooResult += 'M2.foo' + s;
                        },
                        bar: 'doBar'
                    }
                },
                doBar: function (s) {
                    // This flavor will work since this is a normal class method
                    this.callParent(arguments);
                    fooResult += 'M2.bar' + s;
                }
            });
            Ext.define('Foo.A', {
                foo: function(s) {
                    fooResult += 'A.foo' + s;
                },
                bar: function(s) {
                    fooResult += 'A.bar' + s;
                }
            });
            Ext.define('Foo.B', {
                extend: 'Foo.A',
                foo: function(s) {
                    this.callParent(arguments);
                    fooResult += 'B.foo' + s;
                },
                bar: function(s) {
                    this.callParent(arguments);
                    fooResult += 'B.bar' + s;
                }
            });
            Ext.define('Foo.C', {
                extend: 'Foo.A',
                mixins: {
                    m2: 'Foo.M2'
                },
                foo: function(s) {
                    this.callParent(arguments);
                    fooResult += 'C.foo' + s;
                    return 'C.foo';
                },
                bar: function(s) {
                    this.callParent(arguments);
                    fooResult += 'C.bar' + s;
                }
            });
            Ext.define('Foo.D', {
                extend: 'Foo.B',
                mixins: {
                    m2: 'Foo.M2'
                },
                foo: function(s) {
                    this.callParent(arguments);
                    fooResult += 'D.foo' + s;
                    return 'D.foo';
                },
                bar: function(s) {
                    this.callParent(arguments);
                    fooResult += 'D.bar' + s;
                    return 42;
                }
            });
            Ext.define('Foo.E', {
                extend: 'Foo.C',
                foo: function(s) {
                    this.callParent(arguments);
                    fooResult += 'B.foo' + s;
                },
                bar: function(s) {
                    this.callParent(arguments);
                    fooResult += 'B.bar' + s;
                }
            });
        });

        afterEach(function() {
            Ext.undefine('Foo.M1');
            Ext.undefine('Foo.M2');
            Ext.undefine('Foo.A');
            Ext.undefine('Foo.B');
            Ext.undefine('Foo.C');
            Ext.undefine('Foo.D');
            Ext.undefine('Foo.E');
            Ext.undefine('Foo');
        });

        it('should call A then M2 then C', function() {
            var cInstance = new Foo.C(),
                result = cInstance.foo(' ');

            expect(fooResult).toBe('A.foo M2.foo C.foo ');
            expect(result).toBe('C.foo');
        });

        it('function hook should call A then B then M2 then C', function() {
            var dInstance = new Foo.D(),
                result = dInstance.foo(' ');

            expect(fooResult).toBe('A.foo B.foo M2.foo D.foo ');
            expect(result).toBe('D.foo');
        });

        it('named hook should call A then B then M2 then C', function() {
            var dInstance = new Foo.D(),
                result = dInstance.bar(' - ');

            expect(fooResult).toBe('A.bar - B.bar - M1.bar - M2.bar - D.bar - ');
            expect(result).toBe(42);
        });

        it('should process extended option', function () {
            var s = extendLog.join('/');
            expect(s).toBe('Foo.E extends Foo.C');
        });
    });

    describe("overriden methods", function() {
        it("should call self constructor", function() {
            var obj = new subClass;
            expect(obj.subConstructorCalled).toBeTruthy();
        });

        it("should call parent constructor", function() {
            var obj = new subClass;
            expect(obj.parentConstructorCalled).toBeTruthy();
        });

        it("should call mixins constructors", function() {
            var obj = new subClass;
            expect(obj.mixinConstructor1Called).toBeTruthy();
            expect(obj.mixinConstructor2Called).toBeTruthy();
        });
    });
    
    describe("callbacks", function() {
        describe("extend", function() {
            afterEach(function() {
                Ext.undefine('spec.Extend');
            });
            
            it("should set the scope to the created class", function() {
                var fn = function() {},
                    val;
                    
                Ext.define('spec.Extend', {
                    extend: 'Ext.Base',
                    foo: fn
                }, function() {
                    val = this.prototype.foo;
                });
                expect(val).toBe(fn);
            });
            
            it("should pass the created class", function() {
                var fn = function() {},
                    val;
                    
                Ext.define('spec.Extend', {
                    extend: 'Ext.Base',
                    foo: fn
                }, function(Cls) {
                    val = Cls.prototype.foo;
                });
                expect(val).toBe(fn);
            });
        });
        
        describe("override", function() {
            var base;
            beforeEach(function() {
                base = Ext.define('spec.Base', {});
            });
            
            afterEach(function() {
                Ext.undefine('spec.Base');
            });
            
            it("should set the scope to the overridden class", function() {
                var val;
                Ext.define('spec.Override', {
                    override: 'spec.Base'
                }, function() {
                    val = this;
                });
                expect(val).toBe(base);
            });
            
            it("should pass the overridden class", function() {
                var val;
                    
                Ext.define('spec.Override', {
                    override: 'spec.Base'
                }, function(Cls) {
                    val = Cls;
                });
                expect(val).toBe(base);
            });
        });
    });
});
