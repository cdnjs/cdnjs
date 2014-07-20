describe("Ext.app.ViewModel", function() {
    
    var viewModel, scheduler, session, spy;

    function bindDeepNotify (key, fn, scope) {
        var bind = viewModel.bind(key, fn || spy, scope);
        bind.deep = true;
        viewModel.notify();
        return bind;
    }

    function bindNotify (key, fn, scope) {
        var bind = viewModel.bind(key, fn || spy, scope);
        viewModel.notify();
        return bind;
    }

    function setNotify (key, value) {
        viewModel.set(key, value);
        viewModel.notify();
    }
    
    function notify() {
        viewModel.notify();
    }

    function reset () {
        for (var i = 0, len = arguments.length; i < len; ++i) {
            arguments[i].reset();
        }
    }

    function expectArgs (newVal, oldVal) {
        if (arguments.length === 1) {
            expectArgsForCall(spy.mostRecentCall, newVal);
        } else {
            expectArgsForCall(spy.mostRecentCall, newVal, oldVal);
        }
    }

    function expectArgsForCall(theCall, newVal, oldVal) {
        var args = theCall.args;
        expect(args[0]).toBe(newVal);
        if (arguments.length > 2) {
            expect(args[1]).toBe(oldVal);
        }
    }

    function makeRecord(Type, id, data) {
        data = Ext.apply({
            id: id
        }, data);
        return new Type(data, session);
    }

    function createViewModel(withSession) {
        if (withSession) {
            session = new Ext.data.Session({
                scheduler: {
                    // Make a huge tickDelay, we'll control it by forcing ticks
                    tickDelay: 9999
                }
            });
        }

        viewModel = new Ext.app.ViewModel({
            id: 'rootVM',
            session: session
        });
        scheduler = viewModel.getScheduler();
    }

    function complete(data) {
        Ext.Ajax.mockComplete({
            status: 200,
            responseText: Ext.encode(data)
        });
    }

    function completeNotify(data) {
        complete(data);
        notify();
    }
    
    beforeEach(function() {
        Ext.data.Model.schema.setNamespace('spec');
        MockAjaxManager.addMethods();
        spy = jasmine.createSpy();
    });
    
    afterEach(function() {
        Ext.destroy(viewModel);
        Ext.destroy(session);
        session = scheduler = spy = viewModel = null;

        MockAjaxManager.removeMethods();
        Ext.data.Model.schema.clear(true);
    });

    describe("getting/setting values", function() {
        beforeEach(function() {
            createViewModel();
        });

        describe("set", function() {
            it("should set a root value if the param is an object", function() {
                viewModel.set({
                    foo: {
                        bar: 1
                    },
                    baz: 2
                });
                expect(viewModel.getData().foo.bar).toBe(1);
                expect(viewModel.getData().baz).toBe(2);
            });

            it("should set an object at a path", function() {
                viewModel.set('foo.bar', {
                    baz: 1
                });
                expect(viewModel.getData().foo.bar.baz).toBe(1);
            });

            it("should set a path + primitive", function() {
                viewModel.set('foo.bar', 100);
                expect(viewModel.getData().foo.bar).toBe(100);
            });

            it("should be able to set object instances and not descend into them", function() {
                var Cls = Ext.define(null, {
                    foo: 1
                });
                var o = new Cls();
                viewModel.set('obj', o);
                expect(viewModel.getData().obj).toBe(o);
            });
        });

        describe("get", function() {
            it("should be able to retrieve a value at the root", function() {
                viewModel.set('foo', 1);
                expect(viewModel.get('foo')).toBe(1);
            }); 

            it("should descend into a path", function() {
                viewModel.set({
                    foo: {
                        bar: {
                            baz: 100
                        }
                    }
                });
                expect(viewModel.get('foo.bar.baz')).toBe(100);
            }); 

            it("should return null if the value has not presented", function() {
                expect(viewModel.get('something')).toBeNull();
            });
        });
    });

    describe("bind/set for non records/stores", function() {
        beforeEach(function() {
            createViewModel();
        });

        function createSuite(bindFirst) {
            function run(bindFn, setFn) {
                if (bindFirst) {
                    bindFn();
                    setFn();
                } else {
                    setFn();
                    bindFn();
                }
            }

            describe(bindFirst ? "bind before set" : "set before bind", function() {
                describe("setting simple value types", function() {
                    it("should set a number", function() {
                        run(function() {
                            bindNotify('{age}', spy);
                        }, function() {
                            setNotify('age', 3);
                        });
                        expectArgs(3, undefined);
                    });
            
                    it("should set a string", function() {
                        run(function() {
                            bindNotify('{name}', spy);
                        }, function() {
                            setNotify('name', 'Kenneth');
                        });
                        expectArgs('Kenneth', undefined);
                    });
                    
                    it("should set a bool", function() {
                        run(function() {
                            bindNotify('{active}', spy);
                        }, function() {
                            setNotify('active', true);
                        });
                        expectArgs(true, undefined);
                    });
                    
                    it("should set an array", function() {
                        var arr = [18, 22, 13];
                        run(function() {
                            bindNotify('{scores}', spy);
                        }, function() {
                            setNotify('scores', arr);
                        });
                        expectArgs(arr, undefined);
                    });
                    
                    it("should set a date", function() {
                        var d = new Date(1980, 0, 1);
                        run(function() {
                            bindNotify('{dob}', spy);
                        }, function() {
                            setNotify('dob', d);
                        });
                        expectArgs(d, undefined);
                    });
                    
                    it("should set an object instance", function() {
                        var map = new Ext.util.HashMap();
                        run(function() {
                            bindNotify('{myMap}', spy);
                        }, function() {
                            setNotify('myMap', map);
                        });
                        
                        expectArgs(map, undefined);
                    });
                });

                describe("using bind options", function() {
                    it("should set a value using bindTo", function() {
                        run(function() {
                            bindNotify({
                                bindTo: '{age}'
                            }, spy);
                        }, function() {
                            setNotify('age', 3);
                            setNotify('age', 5);
                        });
                        if (bindFirst) {
                            expectArgsForCall(spy.calls[0], 3, undefined);
                            expectArgsForCall(spy.calls[1], 5, 3);
                        } else {
                            expectArgs(5, undefined);
                        }
                    });

                    it("should set the value once when using single: true", function() {
                        run(function() {
                            bindNotify({
                                bindTo: '{age}',
                                single: true
                            }, spy);
                        }, function() {
                            setNotify('age', 3);
                            setNotify('age', 5);
                        });
                        expect(spy.callCount).toBe(1);
                        if (bindFirst) {
                            expectArgs(3, undefined);
                        } else {
                            expectArgs(5, undefined);
                        }
                    });

                    it("should bind deep", function() {
                        run(function() {
                            bindNotify({
                                bindTo: '{foo}',
                                deep: true
                            }, spy);
                        }, function() {
                            setNotify({
                                foo: {
                                    bar: 1
                                }
                            });
                            setNotify('foo.bar', 2);
                        });
                        if (bindFirst) {
                            expect(spy.callCount).toBe(2);
                        } else {
                            expect(spy.mostRecentCall.args[0]).toEqual({
                                bar: 2
                            });
                        }
                    });
                });

                describe("setting objects", function() {
                    it("should set to the root if there's no name", function() {
                        run(function() {
                            bindNotify('{name}', spy);
                        }, function() {
                            setNotify('', {
                                name: 'Bar'
                            });
                        });
                        expectArgs('Bar', undefined);
                    });

                    it("should be able to set simple nested properties", function() {
                        run(function() {
                            bindNotify('{user.name}', spy);
                        }, function() {
                            setNotify('user', {
                                name: 'Foo'
                            });
                        });
                        expectArgs('Foo', undefined);
                    });

                    it("should set deeply nested properties", function() {
                        run(function() {
                            bindNotify('{a.b.c.d.e.f.g}', spy);
                        }, function() {
                            setNotify('a', {
                                b: {
                                    c: {
                                        d: {
                                            e: {
                                                f: {
                                                    g: 'val'
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        });
                        expectArgs('val', undefined);
                    });

                    it("should be able to set mixes of values/objects", function() {
                        var city = jasmine.createSpy();
                        run(function() {
                            viewModel.bind('{user.name}', spy);
                            viewModel.bind('{user.address.city}', city);
                            notify();
                        }, function() {
                            setNotify('user', {
                                name: 'Foo',
                                address: {
                                    city: 'Paris'
                                }
                            });
                        });
                        expectArgs('Foo', undefined);
                        expectArgsForCall(city.mostRecentCall, 'Paris');
                    });
                });

                describe("callback settings", function() {
                    it("should pass the old and new value", function() {
                        run(function() {
                            bindNotify('{name}', spy);
                        }, function() {
                            setNotify('name', 'Foo');
                            setNotify('name', 'Bar');
                        });
                        if (bindFirst) {
                            expectArgsForCall(spy.calls[0], 'Foo', undefined);   
                            expectArgsForCall(spy.calls[1], 'Bar', 'Foo');   
                        } else {
                            expectArgs('Bar', undefined);
                        }
                    });
            
                    it("should default the scope to the session", function() {
                        run(function() {
                            bindNotify('{name}', spy);
                        }, function() {
                            setNotify('name', 'X');
                        });
                        expect(spy.mostRecentCall.object).toBe(viewModel);
                    });
            
                    it("should use the passed scope", function() {
                        var o = {};
                        run(function() {
                            bindNotify('{name}', spy, o);
                        }, function() {
                            setNotify('name', 'X');
                        });
                        expect(spy.mostRecentCall.object).toBe(o);
                    });    
                });

                describe("timing of callbacks", function() {
                    it("should not trigger the callback if the value doesn't change", function() {
                        run(function() {
                            bindNotify('{name}', spy);
                        }, function() {
                            setNotify('name', 'Foo');
                        });
                        spy.reset();
                        setNotify('name', 'Foo');
                        expect(spy).not.toHaveBeenCalled();
                    });
                    
                    it("should not trigger any parent nodes if the leaf value doesn't change", function() {
                        var inner = jasmine.createSpy();
                        run(function() {
                            viewModel.bind('{foo}', spy);
                            viewModel.bind('{foo.bar}', inner);
                        }, function() {
                            viewModel.set('foo.bar.baz.x', 'Foo');
                        });
                        notify();
                        reset(spy, inner);
                        setNotify('foo.bar.baz.x', 'Foo');
                        expect(spy).not.toHaveBeenCalled();
                        expect(inner).not.toHaveBeenCalled();
                    });
                    
                    it("should be able to bind twice to the same stub", function() {
                        var other = jasmine.createSpy();
                        run(function() {
                            bindNotify('{name}', spy);
                            bindNotify('{name}', other);
                        }, function() {
                            setNotify('name', 'A');
                        });
                        expectArgsForCall(spy.mostRecentCall, 'A', undefined);
                        expectArgsForCall(other.mostRecentCall, 'A', undefined);
                    });
                    
                    it("should trigger a new binding when there is a set pending", function() {
                        var other = jasmine.createSpy();
                        run(function() {
                            bindNotify('{name}', spy);
                        }, function() {
                            viewModel.set('name', 'A');
                        });
                        bindNotify('{name}', other);
                        expect(other).toHaveBeenCalled();
                    });
                    
                    it("should only fire a single callback inside the timer resolution", function() {
                        run(function() {
                            bindNotify('{name}', spy);
                        }, function() {
                            viewModel.set('name', 'A');
                            viewModel.set('name', 'B');
                            viewModel.set('name', 'C');
                            viewModel.set('name', 'D');
                            notify();
                        });
                        expect(spy.callCount).toBe(1);
                        expectArgs('D', undefined);
                    });
                    
                    it("should only pass the last value since the last fired change", function() {
                        run(function() {
                            bindNotify('{name}', spy);
                        }, function() {
                            setNotify('name', 'A');
                        });
                        viewModel.set('name', 'B');
                        viewModel.set('name', 'C');
                        viewModel.set('name', 'D');
                        viewModel.set('name', 'E');
                        notify();
                        expectArgs('E', 'A');
                    });

                    // Tests specifically for bind/data first
                    if (bindFirst) {
                        it("should not trigger the binding initially if a value is not set", function() {
                            bindNotify('{name}', spy);
                            expect(spy).not.toHaveBeenCalled();
                        });
                    
                        it("should suspend the initial binding if the value is set within the tick window", function() {
                            viewModel.bind('{name}', spy);
                            setNotify('name', 'Foo');
                            expectArgs('Foo', undefined);
                        });
                    } else {
                        it("should trigger the binding initially if a value exists", function() {
                            viewModel.set('name', 'Foo');
                            bindNotify('{name}', spy);
                            expect(spy).toHaveBeenCalled();
                            expectArgs('Foo', undefined);
                        });
                    }
                });

                describe("binding on nested values", function() {
                    it("should trigger a new long chain binding", function() {
                        run(function() {
                            bindNotify('{user.address.city}', spy);
                        }, function() {
                            setNotify('user.address.city', 'Sydney');
                        });
                        expectArgs('Sydney', undefined);
                    });
                    
                    it("should trigger a deep parent binding when a child changes", function() {
                        var city = jasmine.createSpy(),
                            address = jasmine.createSpy();
                            
                        run(function() {
                            bindNotify('{user.address.city}', city);
                            bindDeepNotify('{user.address}', address);
                        }, function() {
                            setNotify('user.address.city', 'Berlin');
                        });
                        expectArgsForCall(city.mostRecentCall, 'Berlin', undefined);
                        expect(address.mostRecentCall.args[0]).toEqual({
                            city: 'Berlin'
                        });
                    });
                    
                    it("should trigger all deep parent bindings when a child changes", function() {
                        var city = jasmine.createSpy(),
                            address = jasmine.createSpy(),
                            user = jasmine.createSpy();
                            
                        run(function() {
                            bindNotify('{user.address.city}', city);
                            bindDeepNotify('{user.address}', address);
                            bindDeepNotify('{user}', user);
                        }, function() {
                            setNotify('user.address.city', 'Jakarta');
                        });
                        expect(city).toHaveBeenCalled();
                        expect(address).toHaveBeenCalled();
                        expect(user).toHaveBeenCalled();
                    });
                    
                    it("should trigger parent bindings even if a node in the hierarchy is skipped", function() {
                        var city = jasmine.createSpy(),
                            user = jasmine.createSpy();

                        run(function() {
                            bindNotify('{user.address.city}', city);
                            bindDeepNotify('{user}', user);
                        }, function() {
                            setNotify('user.address.city', 'London');
                        });
                        expect(city).toHaveBeenCalled();
                        expect(user).toHaveBeenCalled();
                    });
                    
                    it("should only trigger the parent binding once if several direct children change", function() {
                        run(function() {
                            bindDeepNotify('{user.address}', spy);
                        }, function() {
                            viewModel.set('user.address.street', '1 Foo St');
                            viewModel.set('user.address.city', 'Moscow');
                            viewModel.set('user.address.zip', 12345);
                            viewModel.set('user.address.country', 'Russia');
                            notify();
                        });
                        expect(spy.callCount).toBe(1);
                    });
                    
                    it("should only trigger the parent once even if several indirect children change", function() {
                        run(function() {
                            bindDeepNotify('{user}', spy);
                        }, function() {
                            viewModel.set('user.homeAddress.street', 'Foo');
                            viewModel.set('user.homeAddress.city', 'Florida');
                            viewModel.set('user.postalAddress.street', 'Bar');
                            viewModel.set('user.postalAddress.city', 'Baltimore');
                            notify();
                        });
                        expect(spy.callCount).toBe(1);
                    });

                    describe("modifying hierarchies", function() {
                        function getHierarchy(val) {
                            return {
                                foo: {
                                    bar: {
                                        baz: {
                                            xxx: val
                                        }
                                    }
                                }
                            };
                        }

                        it("should trigger changes on the children when hierarchy is overwritten with a primitive", function() {
                            var xxx = jasmine.createSpy(),
                                baz = jasmine.createSpy(),
                                bar = jasmine.createSpy();

                            run(function() {
                                viewModel.bind('{foo.bar.baz.xxx}', xxx);
                                viewModel.bind('{foo.bar.baz}', baz);
                                viewModel.bind('{foo.bar}', bar);
                                notify();
                            }, function() {
                                setNotify('foo.bar.baz.xxx', 1);
                            });
                        
                            reset(xxx, baz, bar);

                            setNotify('foo', 1);
                            expect(xxx).toHaveBeenCalled();
                            expect(baz).toHaveBeenCalled();
                            expect(bar).toHaveBeenCalled();
                        });

                        it("should trigger changes on the children when hierarchy is overwritten with null", function() {
                            run(function() {
                                viewModel.bind('{foo.bar}', spy);
                                notify();
                            }, function() {
                                viewModel.set({
                                    foo: {
                                        bar: 1
                                    }
                                });
                                notify();
                            });                        
                            spy.reset();
                            setNotify('foo', null);
                            expectArgs(null, 1);
                        });

                        it("should set the child value correctly when changing a hierarchy in a single tick", function() {
                            run(function() {
                                viewModel.bind('{foo.bar.baz.xxx}', spy);
                            }, function() {
                                viewModel.set(getHierarchy(123));
                                viewModel.set(getHierarchy(456));
                                viewModel.set(getHierarchy(789));
                            });
                            notify();
                            expect(spy.callCount).toBe(1);
                            expectArgs(789);
                        });

                        it("should set the child value correctly when changing a hierarchy over multiple ticks", function() {
                            run(function() {
                                viewModel.bind('{foo.bar.baz.xxx}', spy);
                            }, function() {
                                viewModel.set(getHierarchy(123));
                            });
                            notify();
                            expectArgs(123);
                            viewModel.set(getHierarchy(456));
                            notify();
                            expectArgs(456);
                            viewModel.set(getHierarchy(789));
                            notify();
                            expectArgs(789);
                        });

                        it("should set the child value correctly when overwriting a hierarchy in a single tick", function() {
                            run(function() {
                                viewModel.bind('{foo.bar.baz.xxx}', spy);
                            }, function() {
                                viewModel.set(getHierarchy(123));
                                viewModel.set(getHierarchy(456));
                                viewModel.set({
                                    foo: null
                                });
                            });
                            notify();
                            if (bindFirst) {
                                expect(spy.callCount).toBe(1);
                                expectArgs(null);
                            } else {
                                expect(spy).not.toHaveBeenCalled();
                            }
                        });

                        it("should set the child value correctly when overwriting a hierarchy over multiple ticks", function() {
                            run(function() {
                                viewModel.bind('{foo.bar.baz.xxx}', spy);
                            }, function() {
                                viewModel.set(getHierarchy(123));
                            });
                            notify();
                            expectArgs(123);
                            viewModel.set(getHierarchy(456));
                            notify();
                            expectArgs(456);
                            viewModel.set({
                                foo: null
                            });
                            notify();
                            expectArgs(null);
                        });

                        it("should be able to expand a primitive into a hierarchy", function() {
                            var xxx = jasmine.createSpy(),
                                baz = jasmine.createSpy(), 
                                bar = jasmine.createSpy();
                    
                            run(function() {
                                viewModel.bind('{foo.bar.baz.xxx}', xxx, null, {deep: true});
                                viewModel.bind('{foo.bar.baz}', baz, null, {deep: true});
                                viewModel.bind('{foo.bar}', bar, null, {deep: true});
                            }, function() {
                                viewModel.set('foo', 1);
                            });
                            notify();
                            reset(xxx, baz, bar);
                            setNotify('foo.bar.baz.xxx', 1);
                
                            expect(xxx).toHaveBeenCalled();
                            expect(baz).toHaveBeenCalled();
                            expect(bar).toHaveBeenCalled();
                        });

                        if (bindFirst) {
                            it("should set the child value correctly when expanding a hierarchy in a single tick", function() {
                                viewModel.bind('{foo.bar.baz.xxx}', spy);
                                notify();
                                viewModel.set({
                                    foo: null
                                });
                                viewModel.set({
                                    foo: {
                                        bar: null
                                    }
                                });
                                viewModel.set({
                                    foo: {
                                        bar: {
                                            baz: null
                                        }
                                    }
                                });
                                viewModel.set({
                                    foo: {
                                        bar: {
                                            baz: {
                                                xxx: 100
                                            }
                                        }
                                    }
                                });
                                notify();
                                expect(spy.callCount).toBe(1);
                                expectArgs(100);
                            });

                            it("should set the child value correctly when expanding a hierarchy over multiple ticks", function() {
                                viewModel.bind('{foo.bar.baz.xxx}', spy);
                                notify();
                                viewModel.set({
                                    foo: null
                                });
                                notify();
                                expect(spy).not.toHaveBeenCalled();
                                viewModel.set({
                                    foo: {
                                        bar: null
                                    }
                                });
                                notify();
                                expect(spy).not.toHaveBeenCalled();
                                viewModel.set({
                                    foo: {
                                        bar: {
                                            baz: null
                                        }
                                    }
                                });
                                notify();
                                expect(spy).not.toHaveBeenCalled();
                                viewModel.set({
                                    foo: {
                                        bar: {
                                            baz: {
                                                xxx: 100
                                            }
                                        }
                                    }
                                });
                                notify();
                                expectArgs(100);
                                viewModel.set({
                                    foo: null
                                });
                                notify();
                                // Now that we have a value loaded for xxx, it should publish as null
                                expectArgs(null);
                            });
                        }
                    });
                });
            });
        }
        createSuite(false);
        createSuite(true);
        
        describe("firing order", function() {
            it("should fire children before parents", function() {
                var values = [];

                viewModel.bind('{address}', function (v) {
                    values.push('address: ' + Ext.encode(v));
                }).deep = true;
                viewModel.bind('{address.city}', function (v) {
                    values.push('address.city: ' + v);
                });

                notify();

                expect(values).toEqual([]);

                viewModel.set('address.city', 'Melbourne');
                notify();

                expect(values[0]).toBe('address.city: Melbourne');
                expect(values[1]).toBe('address: {"city":"Melbourne"}');
            });

            it("should fire a single binding at the depth of it's stub", function() {
                setNotify('foo.bar.baz.x', 1);
                var values = [],
                    adder = function(arg1) {
                        values.push(arg1);    
                    };
                viewModel.bind('{foo.bar.baz.x}', adder);
                viewModel.bind('{foo.bar.y}', adder);
                viewModel.set('foo.bar.y', 3);
                viewModel.set('foo.bar.baz.x', 2);
                notify();
                expect(values[0]).toBe(2);
                expect(values[1]).toBe(3);
            });

            it("should fire complex hierarchies in depth order", function() {
                var data = {
                    key1: {
                        key11: {
                            key111: {
                                key1111: 'a',                // d=4
                                key1112: 'b'                 // d=4
                            },
                            key112: 'c'                      // d=3
                        },
                        key12: {
                            key121: 'd',                     // d=3
                            key122: 'e'                      // d=3
                        }
                    },
                    key2: {
                        key21: {
                            key211: 'f'                      // d=3
                        },
                        key22: {
                            key221: {
                                key2211: {
                                    key22111: 'g'            // d=5
                                }
                            },
                            key222: {
                                key2221: 'h'                 // d=4
                            }
                        },
                        key23: {
                            key231: 'i'                      // d=3
                        }
                    },
                    key3: {
                        key31: 'j',                          // d=2
                        key32: {
                            key321: 'k'                      // d=3
                        },
                        key33: {
                            key331: {
                                key3311: 'l'                 // d=4
                            },
                            key332: 'm'                      // d=3
                        }
                    },
                    key4: {
                        key41: 'n'                          // d=2
                    },
                    key5: 'o',                              // d=1
                    key6: {
                        key61: {
                            key611: {
                                key6111: {
                                    key61111: {
                                        key611111: {
                                            key6111111: 'p' // d=7
                                        },
                                        key611112: 'q'      // d=6
                                    }
                                }
                            },
                            key612: {
                                key6121: {
                                    key61211: {
                                        key61211: 'r'      // d=6
                                    }
                                }
                            },
                            key613: {
                                key6131: {
                                    key61311: {
                                        key613111: {
                                            key6131111: 's' // d=7
                                        }
                                    }
                                }
                            }
                        }
                    }
                };

                var map = {};
                var items = [];
                var entryLog = [];
                var valueLog = [];

                function buildMap (value, parent, path) {
                    var entry = {
                            id: items.length + 1,
                            path: path,
                            parent: parent,
                            value: value
                        };

                    items.push(map[path] = entry);
                    if (path) {
                        viewModel.bind('{' + path + '}', function (v) {
                            entryLog.push(entry);
                            valueLog.push(v);

                            // We can say for certain that none of our parent objects
                            // should have called back at this time.
                            for (var p = parent; p; p = p.parent) {
                                expect(Ext.Array.contains(entryLog, p)).toBe(false);
                            }
                        });
                    }

                    if (value && value.constructor === Object) {
                        var subPath = path ? path + '.' : '';

                        Ext.Object.each(value, function (name, v) {
                            buildMap(v, entry, subPath + name);
                        });
                    }

                    return entry;
                }

                var root = buildMap(data, null, ''),
                    prefix, i;

                notify();
                for (i = 0; i < valueLog.length; ++i) {
                    prefix = entryLog[i].path + '=';
                    expect(prefix + valueLog[i]).toEqual(prefix + 'null');
                }

                entryLog.length = valueLog.length = 0;

                setNotify('', data);
                notify();

                for (i = 0; i < valueLog.length; ++i) {
                    // Each delivered value should preserve the references we passed in
                    // for this case.
                    expect(valueLog[i]).toBe(entryLog[i].value);
                }
            });
        });
    });

    describe("parsing formulas", function () {
        var vm;

        function getFormula (name) {
            var stub = vm.getStub(name);
            return stub.formula;
        }

        function getExpressions (name) {
            var formula = getFormula(name),
                expressions = Ext.apply({}, formula.get.$expressions);

            delete expressions.$literal;
            return Ext.Object.getKeys(expressions);
        }

        beforeEach(function() {
            createViewModel();
        });

        afterEach(function () {
            vm.destroy();
            vm = null;
        });

        describe("simple formulas", function () {
            it("should recognize property access", function () {
                vm = new Ext.app.ViewModel({
                    formulas: {
                        foo: function (get) {
                            return get('x.y') + get('z');
                        }
                    }
                });

                var expressions = getExpressions('foo');
                expect(expressions).toEqual(['x.y', 'z']);
            });

            it("should ignore method calls", function () {
                vm = new Ext.app.ViewModel({
                    formulas: {
                        foo: function (get) {
                            return get('x.y').substring(1) + get('z').toLowerCase();
                        }
                    }
                });

                var expressions = getExpressions('foo');
                expect(expressions).toEqual(['x.y', 'z']);
            });

            it("should recognize data as method parameters", function () {
                vm = new Ext.app.ViewModel({
                    formulas: {
                        foo: function (get) {
                            return this.foo(get('x')+get('y.z'));
                        }
                    }
                });

                var expressions = getExpressions('foo');
                expect(expressions).toEqual(['x', 'y.z']);
            });

            it("should ignore data used in suffix expression", function () {
                vm = new Ext.app.ViewModel({
                    formulas: {
                        foo: function (get) {
                            return this.get.foo(get('x') + get('y.z'));
                        }
                    }
                });

                var expressions = getExpressions('foo');
                expect(expressions).toEqual(['x', 'y.z']);
            });
        });

        describe("formula config objects", function () {
            it("should recognize property access", function () {
                vm = new Ext.app.ViewModel({
                    formulas: {
                        foo: {
                            get: function (get) {
                                return get('x.y') + get('z');
                            }
                        }
                    }
                });

                var expressions = getExpressions('foo');
                expect(expressions).toEqual(['x.y', 'z']);
            });

            it("should ignore method calls", function () {
                vm = new Ext.app.ViewModel({
                    formulas: {
                        foo: {
                            get: function (get) {
                                return get('x.y').substring(1) + get('z').toLowerCase();
                            }
                        }
                    }
                });

                var expressions = getExpressions('foo');
                expect(expressions).toEqual(['x.y', 'z']);
            });

            it("should allow for bind options", function () {
                vm = new Ext.app.ViewModel({
                    data: {
                        x: 'XYZ'
                    },
                    formulas: {
                        foo: {
                            bind: {
                                bindTo: '{x}',
                                single: true
                            },
                            get: function (data) {
                                return data;
                            }
                        }
                    }
                });

                var expressions = getExpressions('foo');
                expect(expressions).toEqual([]);

                scheduler = vm.getScheduler();
                vm.notify();
                expect(scheduler.passes).toBe(1);

                var data = vm.getData();
                expect(data.foo).toBe('XYZ');

                vm.set('x', 'ABC');

                vm.notify();
                expect(scheduler.passes).toBe(2);
                expect(data.foo).toBe('XYZ');
            });

            it("should promote single:true to bind options", function () {
                vm = new Ext.app.ViewModel({
                    data: {
                        x: 'XYZ'
                    },
                    formulas: {
                        foo: {
                            bind: '{x}',
                            single: true,
                            get: function (data) {
                                return data;
                            }
                        }
                    }
                });

                var expressions = getExpressions('foo');
                expect(expressions).toEqual([]);

                scheduler = vm.getScheduler();
                vm.notify();
                expect(scheduler.passes).toBe(1);

                var data = vm.getData();
                expect(data.foo).toBe('XYZ');

                vm.set('x', 'ABC');

                vm.notify();
                expect(scheduler.passes).toBe(2);
                expect(data.foo).toBe('XYZ');
            });
        });
    }); // parsing formulas

    function createRecordSuite(withSession) {
        describe(withSession ? "with session" : "without a session", function() {
            beforeEach(function() {
                createViewModel(withSession);
            });

            describe("records", function() {
                var User, user;

                beforeEach(function() {
                    User = Ext.define('spec.User', {
                        extend: 'Ext.data.Model',
                        fields: ['id', 'name', 'age', 'group']
                    });
                });

                afterEach(function() {
                    User = user = null;
                    Ext.undefine('spec.User');
                });

                function makeUser(id, data) {
                    user = makeRecord(User, id, data);
                }

                describe("local modifications", function() {
                    it("should publish when setting a record instance", function() {
                        makeUser(1);
                        bindNotify('{user}', spy);
                        setNotify('user', user);
                        expectArgs(user);
                    });

                    it("should publish when binding to a record field", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        bindNotify('{user.name}', spy);
                        setNotify('user', user);
                        expectArgs('Foo');
                    });

                    it("should react to a change on the field", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        bindNotify('{user.name}', spy);
                        setNotify('user', user);
                        user.set('name', 'Bar');
                        notify();
                        expectArgs('Bar', 'Foo');
                    });

                    it("should react to multiple field changes", function() {
                        makeUser(1);
                        bindNotify('{user.name}', spy);
                        bindNotify('{user.age}', spy);
                        bindNotify('{user.group}', spy);
                        setNotify('user', user);
                        spy.reset();
                        user.set({
                            name: 'Foo',
                            age: 100,
                            group: 'Coders'
                        });
                        notify();
                        expect(spy.callCount).toBe(3);
                    });

                    it("should not react if the value changes then is reverted to the original value", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        bindNotify('{user.name}', spy);
                        setNotify('user', user);
                        spy.reset();
                        user.set('name', 'Bar');
                        user.set('name', 'Foo');
                        notify();
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should react if the value changes, notifies, then is reverted to the original value", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        bindNotify('{user.name}', spy);
                        setNotify('user', user);
                        spy.reset();
                        user.set('name', 'Bar');
                        notify();
                        expectArgs('Bar', 'Foo');
                        user.set('name', 'Foo');
                        notify();
                        expectArgs('Foo', 'Bar');
                    });

                    it("should react to changes via reject", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        bindNotify('{user.name}', spy);
                        setNotify('user', user);
                        user.set('name', 'Bar');
                        notify();
                        spy.reset();
                        user.reject();
                        notify();
                        expectArgs('Foo', 'Bar');
                    });

                    it("should publish when setting a new model", function() {
                        makeUser(1);
                        bindNotify('{user}', spy);
                        setNotify('user', user);
                        var other = new User({id: 2});
                        setNotify('user', other);
                        expectArgs(other, user);
                    });

                    it("should publish a child field when changing the model", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        bindNotify('{user.name}', spy);
                        setNotify('user', user);
                        var other = new User({
                            id: 2,
                            name: 'Bar'
                        });
                        setNotify('user', other);
                        expectArgs('Bar', 'Foo');
                    });

                    it("should not publish when setting a new model but the field value remains", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        bindNotify('{user.name}', spy);
                        setNotify('user', user);
                        var other = new User({
                            id: 2,
                            name: 'Foo'
                        });
                        spy.reset();
                        setNotify('user', other);
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should attach if a record is set as part of a hierarchy", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        bindNotify('{foo.bar.baz.user.name}', spy);
                        setNotify({
                            foo: {
                                bar: {
                                    baz: {
                                        user: user
                                    }
                                }
                            }
                        });
                        spy.reset();
                        user.set('name', 'Bar');
                        notify();
                        expect(spy).toHaveBeenCalled();
                    });
                });

                describe("remote loading", function() {
                    it("should not react when bound and loading", function() {
                        makeUser(1);
                        bindNotify('{user}', spy);
                        user.load();
                        setNotify('user', user);
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should react once loading has completed", function() {
                        makeUser(1);
                        bindNotify('{user}', spy);
                        user.load();
                        setNotify('user', user);
                        completeNotify({});
                        expect(spy).toHaveBeenCalled();
                    });
                });

                describe("links", function() {
                    it("should accept the entityName", function() {
                        bindNotify('{theUser}', spy);
                        viewModel.linkTo('theUser', {
                            reference: 'User',
                            id: 18
                        });
                        completeNotify({});
                        var arg = spy.mostRecentCall.args[0];
                        expect(arg.$className).toBe('spec.User');
                        expect(arg.getId()).toBe(18);
                    });

                    it("should accept the full class name", function() {
                        bindNotify('{theUser}', spy);
                        viewModel.linkTo('theUser', {
                            reference: 'spec.User',
                            id: 18
                        });
                        completeNotify({});
                        var arg = spy.mostRecentCall.args[0];
                        expect(arg.$className).toBe('spec.User');
                        expect(arg.getId()).toBe(18);
                    });

                    it("should accept a model type", function() {
                        bindNotify('{theUser}', spy);
                        viewModel.linkTo('theUser', {
                            reference: spec.User,
                            id: 18
                        });
                        completeNotify({});
                        var arg = spy.mostRecentCall.args[0];
                        expect(arg.$className).toBe('spec.User');
                        expect(arg.getId()).toBe(18);
                    });

                    it("should accept a model instance but create a copy of the same type/id", function() {
                        var rec = new spec.User({
                            id: 18
                        });
                        bindNotify('{theUser}', spy);
                        viewModel.linkTo('theUser', rec);
                        completeNotify({});
                        var arg = spy.mostRecentCall.args[0];
                        expect(arg.$className).toBe('spec.User');
                        expect(arg.getId()).toBe(18);
                        expect(arg).not.toBe(rec);
                    });

                    it("should create a record with the matching id", function() {
                        bindNotify('{theUser}', spy);
                        viewModel.linkTo('theUser', {
                            reference: 'spec.User',
                            id: 18
                        });
                        completeNotify({});
                        expect(spy.mostRecentCall.args[0].getId()).toBe(18);
                    });

                    it("should request the data from the server", function() {
                        spy = spyOn(User.getProxy(), 'read');
                        viewModel.linkTo('theUser', {
                            reference: 'spec.User',
                            id: 18
                        });
                        expect(spy.mostRecentCall.args[0].getId()).toBe(18);
                    });

                    it("should not publish until the record returns", function() {
                        bindNotify('{theUser}', spy);
                        viewModel.linkTo('theUser', {
                            reference: 'User',
                            id: 18
                        });
                        expect(spy).not.toHaveBeenCalled();
                    });

                    it("should be able to change the link at runtime", function() {
                        bindNotify('{theUser}', spy);
                        viewModel.linkTo('theUser', {
                            reference: 'User',
                            id: 18
                        });
                        completeNotify({});
                        spy.reset();
                        viewModel.linkTo('theUser', {
                            reference: 'User',
                            id: 34
                        });
                        completeNotify({});
                        expect(spy.mostRecentCall.args[0].getId()).toBe(34);
                    });

                    if (withSession) {
                        it("should use an existing record in the session and not query the server", function() {
                            var proxySpy = spyOn(User.getProxy(), 'read');
                            makeUser(22);
                            bindNotify('{theUser}', spy);
                            viewModel.linkTo('theUser', {
                                reference: 'User',
                                id: 22
                            });
                            notify();
                            expect(spy.mostRecentCall.args[0]).toBe(session.getRecord('User', 22));
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should create a non-existent record in the session and load it", function() {
                            // Not there...
                            expect(session.peekRecord('User', 89)).toBeNull();
                            viewModel.linkTo('theUser', {
                                reference: 'User',
                                id: 89
                            });
                            user = session.getRecord('User', 89);
                            expect(user.isLoading()).toBe(true);
                        });
                    }
                });

                describe("values via binding", function() {
                    it("should be able to change fields via binding", function() {
                        makeUser(1, {
                            name: 'Foo'
                        });
                        var binding = viewModel.bind('{user.name}', spy);
                        setNotify('user', user);
                        spy.reset();
                        binding.setValue('Bar');
                        notify();
                        expectArgs('Bar', 'Foo');
                    });

                    it("should fail to set values on readonly bindings", function() {
                        var binding = viewModel.bind('Hello {user.name}', spy);
                        expect(function() {
                            binding.setValue('Bar');
                        }).toThrow();
                    });
                });
            });

            describe("stores", function() {
                var User, user, store;

                beforeEach(function() {
                    User = Ext.define('spec.User', {
                        extend: 'Ext.data.Model',
                        fields: ['id', 'name', 'age', 'group']
                    });
                    store = new Ext.data.Store({
                        model: User,
                        proxy: {
                            type: 'ajax',
                            url: 'foo'
                        }
                    });
                });

                afterEach(function() {
                    store.destroy();
                    store = User = user = null;
                    Ext.undefine('spec.User');
                });

                it("should publish when setting the value", function() {
                    bindNotify('{store}', spy);
                    setNotify('store', store);
                    expectArgs(store, undefined);
                });

                it("should not publish if loading when attached", function() {
                    bindNotify('{store}', spy);
                    store.load();
                    setNotify('store', store);
                    expect(spy).not.toHaveBeenCalled();
                });

                it("should not publish if the store is loading during a notify", function() {
                    bindNotify('{store}', spy);
                    viewModel.set('store', store);
                    store.load();
                    notify();
                    expect(spy).not.toHaveBeenCalled();
                });

                it("should publish when the store completes the load", function() {
                    bindNotify('{store}', spy);
                    store.load();
                    setNotify('store', store);
                    completeNotify([]);
                    expectArgs(store, undefined);
                });


            });

            describe("associations", function() {
                describe("many to one", function() {
                    var user, post, posts, User, Post;
                    beforeEach(function() {
                        User = Ext.define('spec.User', {
                            extend: 'Ext.data.Model',
                            fields: ['id', 'name', {
                                name: 'organizationId',
                                reference: 'Organization'
                            }]
                        });

                        Post = Ext.define('spec.Post', {
                            extend: 'Ext.data.Model',
                            fields: ['id', 'content', {
                                name: 'userId',
                                reference: 'User'
                            }]
                        });
                    });

                    afterEach(function() {
                        Ext.undefine('spec.User');
                        Ext.undefine('spec.Post');
                        User = Post = user = post = posts = null;
                    });

                    function makeUser(id, data) {
                        user = makeRecord(User, id, data);
                    }

                    function makePost(id, data) {
                        post = makeRecord(Post, id, data);
                    }

                    describe("the one", function() {
                        it("should not make a request there is no FK value", function() {
                            var proxySpy = spyOn(User.getProxy(), 'read');
                            makePost(1);
                            bindNotify('{post.user}', spy);
                            setNotify('post', post);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should load from the server and not publish until the value is retrieved", function() {
                            makePost(1, {
                                userId: 17
                            });
                            bindNotify('{post.user}', spy);
                            setNotify('post', post);
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify({
                                id: 17
                            });
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should not publish if attached while loading and should publish when the load completes", function() {
                            makePost(1, {
                                userId: 17
                            });
                            bindNotify('{post.user}', spy);
                            post.getUser();
                            setNotify('post', post);
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify({
                                id: 17
                            });
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should publish immediately if the record has already loaded via the API", function() {
                            makePost(1, {
                                userId: 17
                            });
                            bindNotify('{post.user}', spy);
                            post.getUser();
                            complete({
                                id: 17
                            });
                            setNotify('post', post);
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should cascade the load if waiting on the one", function() {
                            makePost(1);
                            bindNotify('{post.user}', spy);
                            post.load();
                            setNotify('post', post);
                            completeNotify({
                                id: 1,
                                userId: 17
                            });
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify({
                                id: 17
                            });
                            expect(spy).toHaveBeenCalled();
                        });

                        if (withSession) {
                            it("should use an existing record from the session and not trigger a load", function() {
                                var proxySpy = spyOn(User.getProxy(), 'read'),
                                    theUser = session.createRecord('User', {
                                        id: 17
                                    });

                                makePost(1, {
                                    userId: 17
                                });
                                bindNotify('{post.user}', spy);
                                setNotify('post', post);
                                expect(proxySpy).not.toHaveBeenCalled();
                                expect(spy).toHaveBeenCalled();
                                expectArgs(theUser);
                            });

                            it("should create a record in the session if it does not exist and load it", function() {
                                makePost(1, {
                                    userId: 17
                                });
                                bindNotify('{post.user}', spy);
                                setNotify('post', post);
                                user = post.getUser();
                                expect(user.isLoading()).toBe(true);
                                expect(user).toBe(session.getRecord('User', 17));
                            });
                        } else {
                            it("should fire if the record instance is different", function() {
                                makePost(1, {
                                    userId: 17
                                });
                                bindNotify('{post.user}', spy);
                                setNotify('post', post);
                                completeNotify({
                                    id: 17
                                });
                                expect(spy).toHaveBeenCalled();
                                spy.reset();
                                makePost(2, {
                                    userId: 17
                                });
                                setNotify('post', post);
                                completeNotify({
                                    id: 17
                                });
                                expect(spy).toHaveBeenCalled();
                            });

                            it("should not fire if the underlying value is the same", function() {
                                makePost(1, {
                                    userId: 17
                                });
                                bindNotify('{post.user.name}', spy);
                                setNotify('post', post);
                                completeNotify({
                                    id: 17,
                                    name: 'Foo'
                                });
                                expect(spy).toHaveBeenCalled();
                                spy.reset();
                                makePost(2, {
                                    userId: 100
                                });
                                setNotify('post', post);
                                completeNotify({
                                    id: 100,
                                    name: 'Foo'
                                });
                                expect(spy).not.toHaveBeenCalled();
                            });
                        }

                        it("should be able to load multiple levels", function() {
                            Ext.define('spec.Organization', {
                                extend: 'Ext.data.Model',
                                fields: ['id', 'name']
                            });

                            makePost(1, {
                                userId: 17
                            });
                            bindNotify('{post.user.organization.name}', spy);
                            setNotify('post', post);
                            completeNotify({
                                id: 17,
                                organizationId: 34
                            });
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify({
                                id: 34,
                                name: 'Org1'
                            });
                            expectArgs('Org1');

                            Ext.undefine('spec.Organization');
                        });
                    });

                    describe("the many", function() {
                        it("should create the store and load it if it doesn't exist", function() {
                            makeUser(1);
                            bindNotify('{user.posts}', spy);
                            var proxySpy = spyOn(Post.getProxy(), 'read');
                            setNotify('user', user);
                            expect(proxySpy).toHaveBeenCalled();
                        });

                        it("should not load the store if it's already been loaded", function() {
                            makeUser(1);
                            bindNotify('{user.posts}', spy);
                            user.posts().load();
                            complete([]);
                            var proxySpy = spyOn(Post.getProxy(), 'read');
                            setNotify('user', user);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not trigger a load if the store is loading", function() {
                            makeUser(1);
                            bindNotify('{user.posts}', spy);
                            user.posts().load();
                            var proxySpy = spyOn(Post.getProxy(), 'read');
                            setNotify('user', user);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not trigger a load if the store has data in it already", function() {
                            makeUser(1);
                            user.posts().load();
                            complete([{id: 2000}]);
                            bindNotify('{user.posts}', spy);
                            var proxySpy = spyOn(Post.getProxy(), 'read');
                            setNotify('user', user);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not publish if the attached store is loading, it should wait until the load completes", function() {
                            makeUser(1);
                            bindNotify('{user.posts}', spy);
                            setNotify('user', user);
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify([]);
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should publish if the store has been loaded before", function() {
                            makeUser(1);
                            bindNotify('{user.posts}', spy);
                            user.posts().load();
                            complete([]);
                            setNotify('user', user);
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should publish if the store instance changes", function() {
                            makeUser(1);
                            bindNotify('{user.posts}', spy);
                            setNotify('user', user);
                            completeNotify([]);
                            spy.reset();
                            makeUser(2);
                            setNotify('user', user);
                            completeNotify([]);
                            expect(spy).toHaveBeenCalled();
                        });

                        if (withSession) {
                            it("should use existing records from the session", function() {
                                var post1 = session.getRecord('Post', 1),
                                    post3 = session.getRecord('Post', 3);

                                complete({id: 1, userId: 1});
                                complete({id: 3, userId: 1});

                                makeUser(1);
                                bindNotify('{user.posts}', spy);
                                user.posts().load();
                                complete([{id: 1, userId: 1}, {id: 2, userId: 1}, {id: 3, userId: 1}]);
                                setNotify('user', user);
                                expect(spy).toHaveBeenCalled();
                                var store = spy.mostRecentCall.args[0];
                                expect(store.getAt(0)).toBe(post1);
                                expect(store.getAt(2)).toBe(post3);
                            });

                            it("should push any new records into the session", function() {
                                var post1 = session.getRecord('Post', 1),
                                    post3 = session.getRecord('Post', 3);

                                complete({id: 1, userId: 1});
                                complete({id: 3, userId: 1});

                                makeUser(1);
                                bindNotify('{user.posts}', spy);
                                user.posts().load();
                                complete([{id: 1, userId: 1}, {id: 2, userId: 1}, {id: 3, userId: 1}]);
                                setNotify('user', user);
                                expect(spy).toHaveBeenCalled();
                                var store = spy.mostRecentCall.args[0];
                                expect(store.getAt(1)).toBe(session.getRecord('Post', 2));
                            });
                        }
                    });
                });

                describe("one to one", function() {
                    var User, Passport, user, passport;

                    beforeEach(function() {
                        User = Ext.define('spec.User', {
                            extend: 'Ext.data.Model',
                            fields: ['id', 'name', {
                                name: 'passportId',
                                reference: 'Passport',
                                unique: true
                            }]
                        });

                        Passport = Ext.define('spec.Passport', {
                            extend: 'Ext.data.Model',
                            fields: ['id', 'expires', {
                                name: 'addressId',
                                reference: 'Address',
                                unique: true
                            }]
                        });
                    });

                    afterEach(function() {
                        Ext.undefine('spec.User');
                        Ext.undefine('spec.Passport');
                        User = Passport = user = passport = null;
                    });

                    function makeUser(id, data) {
                        user = makeRecord(User, id, data);
                    }

                    function makePassport(id, data) {
                        passport = makeRecord(Passport, id, data);
                    }

                    describe("the key holder", function() {
                        it("should not make a request there is no FK value", function() {
                            var proxySpy = spyOn(Passport.getProxy(), 'read');
                            makeUser(1);
                            bindNotify('{user.passport}', spy);
                            setNotify('user', user);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should load from the server and not publish until the value is retrieved", function() {
                            makeUser(1, {
                                passportId: 17
                            });
                            bindNotify('{user.passport}', spy);
                            setNotify('user', user);
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify({
                                id: 17
                            });
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should not publish if attached while loading and should publish when the load completes", function() {
                            makeUser(1, {
                                passportId: 17
                            });
                            bindNotify('{user.passport}', spy);
                            user.getPassport();
                            setNotify('user', user);
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify({
                                id: 17
                            });
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should publish immediately if the record has already loaded via the API", function() {
                            makeUser(1, {
                                passportId: 17
                            });
                            bindNotify('{user.passport}', spy);
                            user.getPassport();
                            complete({
                                id: 17
                            });
                            setNotify('user', user);
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should cascade the load if waiting on the one", function() {
                            makeUser(1);
                            bindNotify('{user.passport}', spy);
                            user.load();
                            setNotify('user', user);
                            completeNotify({
                                id: 1,
                                passportId: 17
                            });
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify({
                                id: 17
                            });
                            expect(spy).toHaveBeenCalled();
                        });

                        if (withSession) {
                            it("should use an existing record from the session and not trigger a load", function() {
                                var proxySpy = spyOn(Passport.getProxy(), 'read'),
                                    thePassport = session.createRecord('Passport', {
                                        id: 17
                                    });

                                makeUser(1, {
                                    passportId: 17
                                });
                                bindNotify('{user.passport}', spy);
                                setNotify('user', user);
                                expect(proxySpy).not.toHaveBeenCalled();
                                expect(spy).toHaveBeenCalled();
                                expectArgs(thePassport);
                            });

                            it("should create a record in the session if it does not exist and load it", function() {
                                makeUser(1, {
                                    passportId: 17
                                });
                                bindNotify('{user.passport}', spy);
                                setNotify('user', user);
                                passport = user.getPassport();
                                expect(passport.isLoading()).toBe(true);
                                expect(passport).toBe(session.getRecord('Passport', 17));
                            });
                        } else {
                            it("should fire if the record instance is different", function() {
                                makeUser(1, {
                                    passportId: 17
                                });
                                bindNotify('{user.passport}', spy);
                                setNotify('user', user);
                                completeNotify({
                                    id: 17
                                });
                                expect(spy).toHaveBeenCalled();
                                spy.reset();
                                makeUser(2, {
                                    passportId: 17
                                });
                                setNotify('user', user);
                                completeNotify({
                                    id: 17
                                });
                                expect(spy).toHaveBeenCalled();
                            });

                            it("should not fire if the underlying value is the same", function() {
                                makeUser(1, {
                                    passportId: 17
                                });
                                bindNotify('{user.passport.expiry}', spy);
                                setNotify('user', user);
                                completeNotify({
                                    id: 17,
                                    expiry: '2000-01-01'
                                });
                                expect(spy).toHaveBeenCalled();
                                spy.reset();
                                makeUser(2, {
                                    passportId: 100
                                });
                                setNotify('user', user);
                                completeNotify({
                                    id: 100,
                                    expiry: '2000-01-01'
                                });
                                expect(spy).not.toHaveBeenCalled();
                            });
                        }

                        it("should be able to load multiple levels", function() {
                            Ext.define('spec.Address', {
                                extend: 'Ext.data.Model',
                                fields: ['id', 'city']
                            });

                            makeUser(1, {
                                passportId: 17
                            });
                            bindNotify('{user.passport.address.city}', spy);
                            setNotify('user', user);
                            completeNotify({
                                id: 17,
                                addressId: 34
                            });
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify({
                                id: 34,
                                city: 'Sydney'
                            });
                            expectArgs('Sydney');

                            Ext.undefine('spec.Address');
                        });
                    });

                    describe("the non-key holder", function() {
                        // Non key holder can only ever exist if it's been set via nested loading
                        it("should not publish unless there is an instance set", function() {
                            makePassport(1);
                            bindNotify('{passport.user}', spy);
                            setNotify('passport', passport);
                            expect(spy).not.toHaveBeenCalled();
                        });

                        it("should publish if an instance is already set", function() {
                            makePassport(13);
                            makeUser(1, {
                                passportId: 13
                            });
                            passport.setUser(user);
                            bindNotify('{passport.user}', spy);
                            setNotify('passport', passport);
                            expect(spy).toHaveBeenCalled();
                        });
                    });
                });

                describe("many to many", function() {
                    var User, Group, user, group;

                    beforeEach(function() {
                        User = Ext.define('spec.User', {
                            extend: 'Ext.data.Model',
                            fields: ['id', 'name'],
                            manyToMany: 'Group'
                        });

                        Group = Ext.define('spec.Group', {
                            extend: 'Ext.data.Model',
                            fields: ['id', 'name']
                        });
                    });

                    afterEach(function() {
                        Ext.undefine('spec.User');
                        Ext.undefine('spec.Group');
                        User = Group = user = group = null;
                    });

                    function makeUser(id, data) {
                        user = makeRecord(User, id, data);
                    }

                    function makeGroup(id, data) {
                        group = makeRecord(Group, id, data);
                    }

                    describe("the left", function() {
                        it("should create the store and load it if it doesn't exist", function() {
                            makeUser(1);
                            bindNotify('{user.groups}', spy);
                            var proxySpy = spyOn(Group.getProxy(), 'read');
                            setNotify('user', user);
                            expect(proxySpy).toHaveBeenCalled();
                        });

                        it("should not load the store if it's already been loaded", function() {
                            makeUser(1);
                            bindNotify('{user.groups}', spy);
                            user.groups().load();
                            complete([]);
                            var proxySpy = spyOn(Group.getProxy(), 'read');
                            setNotify('user', user);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not trigger a load if the store is loading", function() {
                            makeUser(1);
                            bindNotify('{user.groups}', spy);
                            user.groups().load();
                            var proxySpy = spyOn(Group.getProxy(), 'read');
                            setNotify('user', user);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not trigger a load if the store has data in it already", function() {
                            makeUser(1);
                            user.groups().load();
                            complete([{id: 3000}]);
                            bindNotify('{user.groups}', spy);
                            var proxySpy = spyOn(Group.getProxy(), 'read');
                            setNotify('user', user);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not publish if the attached store is loading, it should wait until the load completes", function() {
                            makeUser(1);
                            bindNotify('{user.groups}', spy);
                            setNotify('user', user);
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify([]);
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should publish if the store has been loaded before", function() {
                            makeUser(1);
                            bindNotify('{user.groups}', spy);
                            user.groups().load();
                            complete([]);
                            setNotify('user', user);
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should publish if the store instance changes", function() {
                            makeUser(1);
                            bindNotify('{user.groups}', spy);
                            setNotify('user', user);
                            completeNotify([]);
                            spy.reset();
                            makeUser(2);
                            setNotify('user', user);
                            completeNotify([]);
                            expect(spy).toHaveBeenCalled();
                        });

                        if (withSession) {
                            it("should use existing records from the session", function() {
                                var group1 = session.getRecord('Group', 1, false),
                                    group3 = session.getRecord('Group', 3, false);

                                makeUser(1);
                                bindNotify('{user.groups}', spy);
                                user.groups().load();
                                complete([{id: 1}, {id: 2}, {id: 3}]);
                                setNotify('user', user);
                                expect(spy).toHaveBeenCalled();
                                var store = spy.mostRecentCall.args[0];
                                expect(store.getAt(0)).toBe(group1);
                                expect(store.getAt(2)).toBe(group3);
                            });

                            it("should push any new records into the session", function() {
                                var group1 = session.getRecord('Group', 1, false),
                                    group3 = session.getRecord('Group', 3, false);

                                makeUser(1);
                                bindNotify('{user.groups}', spy);
                                user.groups().load();
                                complete([{id: 1}, {id: 2}, {id: 3}]);
                                setNotify('user', user);
                                expect(spy).toHaveBeenCalled();
                                var store = spy.mostRecentCall.args[0];
                                expect(store.getAt(1)).toBe(session.getRecord('Group', 2));
                            });
                        }
                    });

                    describe("the right", function() {
                        it("should create the store and load it if it doesn't exist", function() {
                            makeGroup(1);
                            bindNotify('{group.users}', spy);
                            var proxySpy = spyOn(User.getProxy(), 'read');
                            setNotify('group', group);
                            expect(proxySpy).toHaveBeenCalled();
                        });

                        it("should not load the store if it's already been loaded", function() {
                            makeGroup(1);
                            bindNotify('{group.users}', spy);
                            group.users().load();
                            complete([]);
                            var proxySpy = spyOn(User.getProxy(), 'read');
                            setNotify('group', group);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not trigger a load if the store is loading", function() {
                            makeGroup(1);
                            bindNotify('{group.users}', spy);
                            group.users().load();
                            var proxySpy = spyOn(User.getProxy(), 'read');
                            setNotify('group', group);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not trigger a load if the store has data in it already", function() {
                            makeGroup(1);
                            group.users().load();
                            complete([{id: 1234}]);
                            bindNotify('{group.users}', spy);
                            var proxySpy = spyOn(User.getProxy(), 'read');
                            setNotify('group', group);
                            expect(proxySpy).not.toHaveBeenCalled();
                        });

                        it("should not publish if the attached store is loading, it should wait until the load completes", function() {
                            makeGroup(1);
                            bindNotify('{group.users}', spy);
                            setNotify('group', group);
                            expect(spy).not.toHaveBeenCalled();
                            completeNotify([]);
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should publish if the store has been loaded before", function() {
                            makeGroup(1);
                            bindNotify('{group.users}', spy);
                            group.users().load();
                            complete([]);
                            setNotify('group', group);
                            expect(spy).toHaveBeenCalled();
                        });

                        it("should publish if the store instance changes", function() {
                            makeGroup(1);
                            bindNotify('{group.users}', spy);
                            setNotify('group', group);
                            completeNotify([]);
                            spy.reset();
                            makeGroup(2);
                            setNotify('group', group);
                            completeNotify([]);
                            expect(spy).toHaveBeenCalled();
                        });

                        if (withSession) {
                            it("should use existing records from the session", function() {
                                var user1 = session.getRecord('User', 1, false),
                                    user3 = session.getRecord('User', 3, false);

                                makeGroup(1);
                                bindNotify('{group.users}', spy);
                                group.users().load();
                                complete([{id: 1}, {id: 2}, {id: 3}]);
                                setNotify('group', group);
                                expect(spy).toHaveBeenCalled();
                                var store = spy.mostRecentCall.args[0];
                                expect(store.getAt(0)).toBe(user1);
                                expect(store.getAt(2)).toBe(user3);
                            });

                            it("should push any new records into the session", function() {
                                var user1 = session.getRecord('User', 1, false),
                                    user3 = session.getRecord('User', 3, false);

                                makeGroup(1);
                                bindNotify('{group.users}', spy);
                                group.users().load();
                                complete([{id: 1}, {id: 2}, {id: 3}]);
                                setNotify('group', group);
                                expect(spy).toHaveBeenCalled();
                                var store = spy.mostRecentCall.args[0];
                                expect(store.getAt(1)).toBe(session.getRecord('User', 2));
                            });
                        }
                    });
                });
            });
        });
    }
    createRecordSuite(false);
    createRecordSuite(true);

    describe("nesting viewmodels", function () {
        var rec, User, subViewModel, grandSubViewModel;

        function completeWithRecord(id, data) {
            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.encode(Ext.apply({
                    id: id,
                    name: 'Name1',
                    age: 20,
                    description: 'Desc1'
                }, data))
            });
        }

        beforeEach(function() {
            User = Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['id', 'name', 'age', 'description']
            });
            createViewModel(true);
            subViewModel = new Ext.app.ViewModel({
                id: 'subVM',
                parent: viewModel
            });
            grandSubViewModel = new Ext.app.ViewModel({
                id: 'grandSubVM',
                parent: subViewModel
            });
        });

        afterEach(function() {
            grandSubViewModel.destroy();
            subViewModel.destroy();
            Ext.undefine('spec.User');
            grandSubViewModel = subViewModel = User = rec = null;
        });

        it('should inherit data from parent view models', function () {
            var fooBar = 0,
                calls = 0;

            subViewModel.bind('{foo.bar}', function (value) {
                fooBar = value;
                ++calls;
            });

            viewModel.set('foo', { bar: 42 });
            notify();

            expect(calls).toBe(1);
            expect(fooBar).toBe(42);
        });

        it('should inherit data from grandparent view models', function () {
            var fooBar = 0,
                calls = 0;

            grandSubViewModel.bind('{foo.bar}', function (value) {
                fooBar = value;
                ++calls;
            });

            viewModel.set('foo', { bar: 42 });
            notify();

            expect(calls).toBe(1);
            expect(fooBar).toBe(42);
        });

        it('should maintain indirection with multiple view models', function () {
            var fooBar = 0,
                subFooBar = 0,
                grandSubFooBar = 0,
                calls = 0,
                subCalls = 0,
                grandSubCalls = 0;

            viewModel.bind('{foo.bar}', function (value) {
                fooBar = value;
                ++calls;
            });
            subViewModel.bind('{foo.bar}', function (value) {
                subFooBar = value;
                ++subCalls;
            });
            grandSubViewModel.bind('{foo.bar}', function (value) {
                grandSubFooBar = value;
                ++grandSubCalls;
            });

            viewModel.set('foo', { bar: 42 });
            notify();

            expect(scheduler.passes).toBe(1);

            expect(calls).toBe(1);
            expect(fooBar).toBe(42);
            expect(subCalls).toBe(1);
            expect(subFooBar).toBe(42);
            expect(grandSubCalls).toBe(1);
            expect(grandSubFooBar).toBe(42);

            subViewModel.set('foo', { bar: 427 });
            notify();

            // Should get this delivered in one pass due to sort order
            expect(scheduler.passes).toBe(2);

            expect(calls).toBe(1);
            expect(fooBar).toBe(42);
            expect(subCalls).toBe(2);
            expect(subFooBar).toBe(427);
            expect(grandSubCalls).toBe(2);
            expect(grandSubFooBar).toBe(427);

            subViewModel.set('foo', undefined);
            notify();

            // Should get this delivered in one pass due to sort order
            expect(scheduler.passes).toBe(3);

            expect(calls).toBe(1);
            expect(fooBar).toBe(42);
            expect(subCalls).toBe(3);
            expect(subFooBar).toBe(42);
            expect(grandSubCalls).toBe(3);
            expect(grandSubFooBar).toBe(42);
        });

        it('should modify parent VM instances', function () {
            var fooBar = 0,
                subFooBar = 0,
                grandSubFooBar = 0,
                calls = 0,
                subCalls = 0,
                grandSubCalls = 0;

            viewModel.bind('{foo.bar}', function (value) {
                fooBar = value;
                ++calls;
            });
            subViewModel.bind('{foo.bar}', function (value) {
                subFooBar = value;
                ++subCalls;
            });
            grandSubViewModel.bind('{foo.bar}', function (value) {
                grandSubFooBar = value;
                ++grandSubCalls;
            });

            viewModel.set('foo', { bar: 42 });
            notify();

            expect(scheduler.passes).toBe(1);

            expect(calls).toBe(1);
            expect(fooBar).toBe(42);
            expect(subCalls).toBe(1);
            expect(subFooBar).toBe(42);
            expect(grandSubCalls).toBe(1);
            expect(grandSubFooBar).toBe(42);

            // We are navigating to "foo.bar" which is found in viewModel and setting
            // that to 427. Even though we have set this from subViewModel the fact that
            // we set "foo.bar" means we travel upwards to find the object.
            subViewModel.set('foo.bar',  427);
            notify();

            // Should get this delivered in one pass due to sort order
            expect(scheduler.passes).toBe(2);

            expect(calls).toBe(2);
            expect(fooBar).toBe(427);
            expect(subCalls).toBe(2);
            expect(subFooBar).toBe(427);
            expect(grandSubCalls).toBe(2);
            expect(grandSubFooBar).toBe(427);
        });

        describe("overwriting values from parent to child", function() {
            it("should be able to modify a value when the binding is scheduled", function() {
                viewModel.set('value', 1);
                subViewModel.bind('{value}', spy);
                subViewModel.set('value', 2);
                viewModel.notify();
                expect(spy.callCount).toBe(1);
                expectArgs(2, undefined);
            });

            it("should be able to modify a value when the binding is unscheduled", function() {
                viewModel.set('value', 1);
                subViewModel.bind('{value}', spy);
                viewModel.notify();
                subViewModel.set('value', 2);
                viewModel.notify();
                expect(spy.callCount).toBe(2);
                expectArgs(2, 1);
            });
        });

        describe('with formulas', function () {
            var foo = 0,
                bar = 0,
                baz = 0,
                fooCalls = 0,
                barCalls = 0,
                bazCalls = 0,
                fooBinding;

            beforeEach(function () {
                viewModel.set({
                    firstName: 'Don',
                    lastName: 'Griffin',
                    abc: {
                        v: 'abc'
                    },
                    xyz: 'xyz'
                });
                viewModel.setFormulas({
                    // simple function form
                    foo: function (get) {
                        return get('abc.v') + get('xyz');
                    },
                    fullName: {
                        get: function (get) {
                            return get('firstName') + ' ' + get('lastName');
                        },
                        set: function (name) {
                            var a = name.split(' ');

                            this.set({
                                firstName: a[0],
                                lastName: a[1]
                            });
                        }
                    }
                });

                subViewModel.set({
                    xyz: 'XYZ'
                });
                subViewModel.setFormulas({
                    // object w/get (no bind)
                    bar: {
                        get: function (get) {
                            return get('abc.v') + get('xyz');
                        }
                    },
                    // object w/get and bind
                    explicit: {
                        get: function (data) {
                            return '(' + data.foo.v + '/' + data.foo.x + ')';
                        },
                        bind: {
                            foo: {
                                v: '{abc.v}',
                                x: '{xyz}'
                            }
                        }
                    }
                });

                grandSubViewModel.set({
                    abc: {
                        v: 'ABC'
                    }
                });
                grandSubViewModel.setFormulas({
                    baz: function (get) {
                        return get('abc.v') + get('xyz');
                    },
                    welcome: function (get) {
                        return 'Hello ' + get('fullName') + '!';
                    }
                });

                fooBinding = viewModel.bind('{foo}', function (value) {
                    foo = value;
                    ++fooCalls;
                });
                subViewModel.bind('{bar} - {foo}', function (value) {
                    bar = value;
                    ++barCalls;
                });
                grandSubViewModel.bind('{baz} - {bar} - {foo} - {explicit}', function (value) {
                    baz = value;
                    ++bazCalls;
                });
                notify();
            });

            it('should bind formulas to values in ancestor viewmodels', function () {
                expect(scheduler.passes).toBe(1);
                expect(foo).toBe('abcxyz');
                expect(bar).toBe('abcXYZ - abcxyz');
                expect(baz).toBe('ABCXYZ - abcXYZ - abcxyz - (abc/XYZ)');
            });

            it('should not allow setting the value of a formula', function () {
                expect(function () {
                    fooBinding.setValue(10);
                }).toThrow();
            });

            it('should update when values change in ancestor viewmodels', function () {
                viewModel.set('abc.v', '~abc~');
                viewModel.set('xyz', '~xyz~');

                notify();
                expect(scheduler.passes).toBe(2);

                expect(foo).toBe('~abc~~xyz~');
                expect(bar).toBe('~abc~XYZ - ~abc~~xyz~');
                expect(baz).toBe('ABCXYZ - ~abc~XYZ - ~abc~~xyz~ - (~abc~/XYZ)');
            });

            it('should react to formula dependencies in base view models', function () {
                var fullName, lastNameFirstName, welcome;

                expect(scheduler.passes).toBe(1);

                viewModel.bind('{lastName}, {firstName}', function (s) {
                    lastNameFirstName = s;
                });
                var fullNameBinding = viewModel.bind('{fullName}', function (s) {
                    fullName = s;
                });
                grandSubViewModel.bind('{welcome}', function (s) {
                    welcome = s;
                });

                notify();
                expect(scheduler.passes).toBe(2);
                expect(fullName).toBe('Don Griffin');
                expect(lastNameFirstName).toBe('Griffin, Don');
                expect(welcome).toBe('Hello Don Griffin!');

                fullNameBinding.setValue('Evan Trimboli');

                notify();
                expect(scheduler.passes).toBe(3);
                expect(fullName).toBe('Evan Trimboli');
                expect(lastNameFirstName).toBe('Trimboli, Evan');
                expect(welcome).toBe('Hello Evan Trimboli!');
            });

            it('should work with fields on records', function () {
                subViewModel.setFormulas({
                    fromRecord: function (get) {
                        return get('rec.fld');
                    }
                });

                var Model = Ext.define(null, {
                    extend: 'Ext.data.Model',
                    fields: ['fld']
                });

                rec = new Model({ fld: 42 });
                viewModel.set('rec', rec);

                var value,
                    calls = 0;

                grandSubViewModel.bind('The answer is {fromRecord}', function (v) {
                    value = v;
                    ++calls;
                });

                notify();
                expect(scheduler.passes).toBe(2);
                expect(calls).toBe(1);
                expect(value).toBe('The answer is 42');
            });

            it('should track field changes based on record fields', function () {
                subViewModel.setFormulas({
                    fromRecord: function (get) {
                        return get('rec.name');
                    }
                });

                viewModel.linkTo('rec', {
                    reference: 'User',
                    id: 1
                });

                var value,
                    calls = 0;

                grandSubViewModel.bind('Greetings {fromRecord}!', function (v) {
                    value = v;
                    ++calls;
                });

                completeWithRecord(1, {
                    name: 'Don'
                });

                notify();
                expect(scheduler.passes).toBe(2);
                expect(calls).toBe(1);
                expect(value).toBe('Greetings Don!');

                session.getRecord('User', 1).set('name', 'Evan');

                notify();
                expect(scheduler.passes).toBe(3);
                expect(calls).toBe(2);
                expect(value).toBe('Greetings Evan!');
            });
        }); // with formulas
    }); 

    describe("validation binding", function () {
        var User;

        function completeRequest(data) {
            Ext.Ajax.mockComplete({
                status: 200,
                responseText: Ext.encode(data)
            });
        }

        beforeEach(function() {
            createViewModel(true);
            User = Ext.define('spec.User', {
                extend: Ext.data.Model,

                // W/o convert:null here the defaultValue kicks in and we get empty
                // strings. For this test we don't want that.
                fields: [
                    { name: 'first',       type: 'string', convert: null },
                    { name: 'last',        type: 'string', convert: null },
                    { name: 'email',       type: 'string', convert: null },
                    { name: 'formatField', type: 'string', convert: null },
                    { name: 'phone',       type: 'string', convert: null },
                    { name: 'color',       type: 'string', convert: null },
                    { name: 'description', type: 'string', convert: null },
                    { name: 'initial',     type: 'string', convert: null }
                ],

                validators: {
                    last:        'presence',
                    description: { type: 'length', min: 10, max: 200 },
                    color:       { type: 'inclusion', list: [ 'red', 'white', 'blue' ] },
                    first:       { type: 'exclusion', list: [ 'Ed' ] },
                    formatField: { type: 'format', matcher: /123/ },
                    email:       'email',
                    phone:       { type: 'presence', message: 'Phone number required' },
                    initial:     { type: 'length', min: 1 }
                },

                doValidate: function () {
                    //
                }
            });

            viewModel.linkTo('theUser', {
                reference: 'User',
                id: 42
            });
        });

        afterEach(function () {
            Ext.undefine('spec.User');
        });

        describe("delivering validation messages", function() {
            beforeEach(function() {
                completeRequest({
                    id: 42,
                    description: 'too short',
                    color: 'not a valid color',
                    first: 'Ed',
                    formatField: 'abc',
                    email: 'abc',
                    initial: 'X',
                    extraStuff: 42
                });
            });

            describe("for invalid fields", function() {
                var Val = Ext.data.validator.Validator.all;

                it('should report description too short', function () {
                    var calls = 0, 
                        value;

                    viewModel.bind('{theUser.validation.description}', function (v) {
                        value = v;
                        ++calls;
                    });

                    notify();

                    expect(scheduler.passes).toBe(1);
                    expect(calls).toBe(1);
                    expect(value).toBe('Length must be between 10 and 200');

                    // Now make the field valid and see if our binding is notified.
                    var rec = session.getRecord('User', 42);
                    rec.set('description', '1234567890'); // long enough

                    notify();

                    expect(scheduler.passes).toBe(2);
                    expect(calls).toBe(2);
                    expect(value).toBe(true);
                });

                it('should report missing last name', function () {
                    var value;
                    var calls = 0;

                    viewModel.bind('{theUser.validation.last}', function (v) {
                        value = v;
                        ++calls;
                    });

                    notify();

                    expect(scheduler.passes).toBe(1);
                    expect(calls).toBe(1);
                    expect(value).toBe(Val.presence.config.message);

                    // Now make the field valid and see if our binding is notified.
                    var rec = session.getRecord('User', 42);
                    rec.set('last', 'Spencer'); // present

                    notify();

                    expect(scheduler.passes).toBe(2);
                    expect(calls).toBe(2);
                    expect(value).toBe(true);
                });

                it("should have the correct bad format message", function() {
                    var value;
                    var calls = 0;

                    viewModel.bind('{theUser.validation.formatField}', function (v) {
                        value = v;
                        ++calls;
                    });

                    notify();

                    expect(scheduler.passes).toBe(1);
                    expect(calls).toBe(1);
                    expect(value).toEqual(Val.format.config.message);

                    // Now make the field valid and see if our binding is notified.
                    var rec = session.getRecord('User', 42);
                    rec.set('formatField', '123'); // matches /123/

                    notify();

                    expect(scheduler.passes).toBe(2);
                    expect(calls).toBe(2);
                    expect(value).toBe(true);
                });

                it("should have the correct non-inclusion message", function() {
                    var value;
                    var calls = 0;

                    viewModel.bind('{theUser.validation.color}', function (v) {
                        value = v;
                        ++calls;
                    });

                    notify();

                    expect(scheduler.passes).toBe(1);
                    expect(calls).toBe(1);
                    expect(value).toEqual(Val.inclusion.config.message);

                    // Now make the field valid and see if our binding is notified.
                    var rec = session.getRecord('User', 42);
                    rec.set('color', 'red'); // in the color list

                    notify();

                    expect(scheduler.passes).toBe(2);
                    expect(calls).toBe(2);
                    expect(value).toBe(true);
                });

                it("should have the correct non-exclusion message", function() {
                    var value;
                    var calls = 0;

                    viewModel.bind('{theUser.validation.first}', function (v) {
                        value = v;
                        ++calls;
                    });

                    notify();

                    expect(scheduler.passes).toBe(1);
                    expect(calls).toBe(1);
                    expect(value).toEqual(Val.exclusion.config.message);

                    // Now make the field valid and see if our binding is notified.
                    var rec = session.getRecord('User', 42);
                    rec.set('first', 'Edward'); // not excluded

                    notify();

                    expect(scheduler.passes).toBe(2);
                    expect(calls).toBe(2);
                    expect(value).toBe(true);
                });

                it("should have the correct bad email format message", function() {
                    var value;
                    var calls = 0;

                    viewModel.bind('{theUser.validation.email}', function (v) {
                        value = v;
                        ++calls;
                    });

                    notify();

                    expect(scheduler.passes).toBe(1);
                    expect(calls).toBe(1);
                    expect(value).toEqual(Val.email.config.message);

                    // Now make the field valid and see if our binding is notified.
                    var rec = session.getRecord('User', 42);
                    rec.set('email', 'ed@sencha.com'); // a valid email

                    notify();

                    expect(scheduler.passes).toBe(2);
                    expect(calls).toBe(2);
                    expect(value).toBe(true);
                });

                it("should allow user-defined error messages", function() {
                    var value;
                    var calls = 0;

                    viewModel.bind('{theUser.validation.phone}', function (v) {
                        value = v;
                        ++calls;
                    });

                    notify();

                    expect(scheduler.passes).toBe(1);
                    expect(calls).toBe(1);
                    expect(value).toEqual('Phone number required');

                    // Now make the field valid and see if our binding is notified.
                    var rec = session.getRecord('User', 42);
                    rec.set('phone', '555-1212'); // present

                    notify();

                    expect(scheduler.passes).toBe(2);
                    expect(calls).toBe(2);
                    expect(value).toBe(true);
                });
            }); // for invalid fields

            describe('for valid fields', function () {
                it('should report initial as valid', function () {
                    var value;
                    var calls = 0;

                    viewModel.bind('{theUser.validation.initial}', function (v) {
                        value = v;
                        ++calls;
                    });

                    notify();

                    expect(scheduler.passes).toBe(1);
                    expect(calls).toBe(1);
                    expect(value).toBe(true);

                    // Now make the field valid and see if our binding is notified.
                    var rec = session.getRecord('User', 42);
                    rec.set('initial', ''); // too short now

                    notify();

                    expect(scheduler.passes).toBe(2);
                    expect(calls).toBe(2);
                    expect(value).toBe('Length must be greater than 1');
                });
            });
        }); // delivering validation messages
    }); // validation binding
    
    describe("multi binding", function() {
        var spy;
        beforeEach(function() {
            createViewModel();
            spy = jasmine.createSpy();
        });
        
        describe("basic static bindings", function() {
            describe("objects", function() {
                it("should bind to a simple object", function() {
                    viewModel.bind({
                        aProp: 'static'
                    }, spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual({
                        aProp: 'static'
                    });
                });
                
                it("should be able to bind to numeric values", function() {
                    viewModel.bind({
                        aProp: 1    
                    }, spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual({
                        aProp: 1
                    });
                });

                it("should be able to bind to boolean values", function() {
                    viewModel.bind({
                        aProp: true 
                    }, spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual({
                        aProp: true
                    });
                });
                
                it("should allow null values", function() {
                    viewModel.bind({
                        aProp: null 
                    }, spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual({
                        aProp: null
                    });
                });
            });
        
            describe("arrays", function() {
                it("should bind to a simple array", function() {
                    viewModel.bind(['static1', 'static2'], spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual(['static1', 'static2']);
                });
                
                it("should be able to bind to numeric values", function() {
                    viewModel.bind([1], spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual([1]);
                });

                it("should be able to bind to boolean values", function() {
                    viewModel.bind([true], spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual([true]);
                });
                
                it("should be able to bind to null values", function() {
                    viewModel.bind([null], spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual([null]);
                });
            });
        });
        
        describe("basic dynamic bindings", function() {
            describe("objects", function() {
                it("should resolve a binding for an object", function() {
                    viewModel.set('aBind', 'val');
                    viewModel.bind({
                        foo: '{aBind}'
                    }, spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual({
                        foo: 'val'
                    });
                });
                
                it("should resolve multiple bindings for an object", function() {
                    viewModel.set('aBind1', 'val1');
                    viewModel.set('aBind2', 'val2');
                    viewModel.bind({
                        foo: '{aBind1}',
                        bar: '{aBind2}'
                    }, spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual({
                        foo: 'val1',
                        bar: 'val2'
                    });
                });
            });
            
            describe("arrays", function() {
                it("should resolve a binding for an array", function() {
                    viewModel.set('aBind', 'val');
                    viewModel.bind(['{aBind}'], spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual(['val']);
                });
                
                it("should resolve multiple bindings for an array", function() {
                    viewModel.set('aBind1', 'val1');
                    viewModel.set('aBind2', 'val2');
                    viewModel.bind(['{aBind1}', '{aBind2}'], spy);
                    notify();
                    expect(spy).toHaveBeenCalled();
                    expect(spy.mostRecentCall.args[0]).toEqual(['val1', 'val2']);
                });
            });
        });
        
        describe("nested bindings", function() {
            beforeEach(function() {
                viewModel.set('aBind1', 'val1');
                viewModel.set('aBind2', 'val2');
                viewModel.set('aBind3', 'val3');
            });
            
            it("should resolve a nested object binding", function() {
                viewModel.bind({
                    bind1: '{aBind1}',
                    nest1: {
                        bind2: '{aBind2}',
                        nest2: {
                            bind3: '{aBind3}'
                        }
                    }
                }, spy);
                notify();
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toEqual({
                    bind1: 'val1',
                    nest1: {
                        bind2: 'val2',
                        nest2: {
                            bind3: 'val3'
                        }
                    }
                });
            });
            
            it("should resolved nested array bindings", function() {
                viewModel.bind([
                    '{aBind1}',
                    ['{aBind2}'],
                    [['{aBind3}']]
                ], spy);
                
                notify();
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toEqual([
                    'val1',
                    ['val2'],
                    [['val3']]
                ]);
            });
            
            it("should resolve arrays inside objects", function() {
                viewModel.bind({
                    bind1: ['{aBind1}'],
                    nest1: {
                        bind2: ['{aBind2}'],
                        nest2: {
                            bind3: ['{aBind3}']
                        }
                    }
                }, spy);
                notify();
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toEqual({
                    bind1: ['val1'],
                    nest1: {
                        bind2: ['val2'],
                        nest2: {
                            bind3: ['val3']
                        }
                    }
                });
            });
            
            it("should resolve objects inside arrays", function() {
                viewModel.bind([
                    {bind1: '{aBind1}'},
                    [{bind2: '{aBind2}'}],
                    [[{bind3: '{aBind3}'}]]
                ], spy);
                notify();
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toEqual([
                    {bind1: 'val1'},
                    [{bind2: 'val2'}],
                    [[{bind3: 'val3'}]]
                ]);
            });
        });
        
        describe("with formulas", function() {
            it("should not deliver until formulas is processed", function() {
                viewModel.setFormulas({
                    b: function(get) {
                        return get('a') + 'b';
                    },
                    c: function(get) {
                        return get('b') + 'c';
                    },
                    d: function(get) {
                        return get('c') + 'd';
                    }
                });
                
                viewModel.set('a', 'a');
                
                viewModel.bind(['{d}', '{c}', '{b}', '{a}'], spy);
                notify();
                expect(spy).toHaveBeenCalled();
                expect(spy.mostRecentCall.args[0]).toEqual(['abcd', 'abc', 'ab', 'a']);
            });
        });
        
        describe("with async data", function() {
            function completeWithRecord(id, requestId) {
                completeWithData({
                    id: id
                }, requestId);
            }
            
            function completeWithData(data, requestId) {
                Ext.Ajax.mockComplete({
                    status: 200,
                    responseText: Ext.encode(data)
                }, requestId);
            }
            
            beforeEach(function() {
                Ext.define('spec.User', {
                    extend: 'Ext.data.Model',
                    fields: ['id', 'name']
                });
                
                Ext.define('spec.Post', {
                    extend: 'Ext.data.Model',
                    fields: ['id', 'content', {
                        name: 'userId',
                        reference: 'User'
                    }]
                });
            });
            
            afterEach(function() {
                Ext.undefine('spec.User');
                Ext.undefine('spec.Post');
            });
            
            it("should not deliver until a record is loaded", function() {
                viewModel.linkTo('aUser', {
                    reference: 'User',
                    id: 1
                });
                viewModel.bind({
                    theUser: '{aUser}'
                }, spy);
                notify();
                expect(spy).not.toHaveBeenCalled();
                completeWithRecord(1);
                notify();
                expect(spy).toHaveBeenCalled();
                var result = spy.mostRecentCall.args[0];
                expect(result.theUser.$className).toBe('spec.User');
                expect(result.theUser.getId()).toBe(1);
            });
            
            it("should not deliver until all records are loaded", function() {
                viewModel.linkTo('aUser1', {
                    reference: 'User',
                    id: 1
                });
                viewModel.linkTo('aUser2', {
                    reference: 'User',
                    id: 2
                });
                viewModel.linkTo('aUser3', {
                    reference: 'User',
                    id: 3
                });

                viewModel.bind({
                    user1: '{aUser1}',
                    user2: '{aUser2}',
                    user3: '{aUser3}'
                }, spy);
                notify();
                expect(spy).not.toHaveBeenCalled();
                completeWithRecord(2, 2);
                notify();
                expect(spy).not.toHaveBeenCalled();
                completeWithRecord(3, 3);
                notify();
                expect(spy).not.toHaveBeenCalled();
                completeWithRecord(1, 1);
                notify();
                expect(spy).toHaveBeenCalled();

                var result = spy.mostRecentCall.args[0];

                expect(result.user1.$className).toBe('spec.User');
                expect(result.user1.getId()).toBe(1);

                expect(result.user2.$className).toBe('spec.User');
                expect(result.user2.getId()).toBe(2);

                expect(result.user3.$className).toBe('spec.User');
                expect(result.user3.getId()).toBe(3);
            });
            
            it("should not deliver until nested dependencies are loaded", function() {
                viewModel.linkTo('aUser', {
                    reference: 'User',
                    id: 1
                });
                viewModel.bind({
                    user: '{aUser}',
                    posts: '{aUser.posts}'
                }, spy);
                notify();
                expect(spy).not.toHaveBeenCalled();
                completeWithRecord(1);
                notify();
                expect(spy).not.toHaveBeenCalled();
                completeWithData([{
                    id: 1
                }, {
                    id: 2
                }]);
                notify();
                expect(spy).toHaveBeenCalled();
                var result = spy.mostRecentCall.args[0];
                expect(result.user.$className).toBe('spec.User');
                expect(result.user.getId()).toBe(1);
                expect(result.posts.isStore).toBe(true);
                expect(result.posts.getCount()).toBe(2);
            });
        });
    });

    describe("stores", function() {
        var User, Project;
        beforeEach(function() {
            createViewModel();
            Project = Ext.define('spec.Project', {
                extend: 'Ext.data.Model',
                fields: ['id', 'name', 'code']
            });
            
            User = Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['id', 'name', {
                    name: 'projectId',
                    reference: 'Project'
                }]
            });
        });
        
        afterEach(function() {
            Ext.undefine('spec.User');
            User = null;
        });
        
        it("should create a simple store", function() {
            viewModel.setStores({
                users: {
                    model: 'spec.User'
                }
            });
            notify();
            var users = viewModel.getStore('users');
            expect(users.isStore).toBe(true);
            expect(users.getModel()).toBe(User);
        });
        
        it("should bind multiple stores", function() {
            viewModel.setStores({
                users1: {
                    model: 'spec.User'
                },
                users2: {
                    model: 'spec.User',
                    filters: [{
                        property: 'name',
                        value: 'Foo'
                    }]
                }
            });
            notify();
            var users1 = viewModel.getStore('users1'),
                users2 = viewModel.getStore('users2');
                
            expect(users1.isStore).toBe(true);
            expect(users1.getModel()).toBe(User);
            expect(users2.isStore).toBe(true);
            expect(users2.getModel()).toBe(User);
            expect(users2.getFilters().getCount()).toBe(1);
        });

        it("should accept a store instance", function() {
            var s = new Ext.data.Store({
                model: 'spec.User'
            });
            viewModel.setStores({
                users: s
            });
            notify();
            var users = viewModel.getStore('users');
            expect(users).toBe(s);
        });
        
        it("should not attach the store to the session by default", function() {
            viewModel.setStores({
                users: {
                    model: 'spec.User'
                }
            });
            notify();
            var users = viewModel.getStore('users');
            expect(users.getSession()).toBeUndefined();
        });
        
        it("should attach to the session if session: true is specified", function() {
            viewModel.destroy();
            createViewModel(true);
            viewModel.setStores({
                users: {
                    model: 'spec.User',
                    session: true
                }
            });
            notify();
            var users = viewModel.getStore('users');
            expect(users.getSession()).toBe(session);
        });

        describe("immediate creation", function() {
            it("should have a store configuration with no dynamic bindings available before notify", function() {
                viewModel.setStores({
                    users: {
                        model: 'spec.User'
                    }
                });
                var store = viewModel.getStore('users');
                expect(store.isStore).toBe(true);
                expect(store.getModel()).toBe(User);
            });

            it("should have a store instance available before notify", function() {
                var store = new Ext.data.Store({
                    model: 'spec.User'
                });
                viewModel.setStores({
                    users: store
                });
                expect(viewModel.getStore('users')).toBe(store);
            });
        });
        
        describe("when destroying the view model", function() {
            describe("store config", function() {
                it("should not set autoDestroy on the store", function() {
                    viewModel.setStores({
                        users: {
                            model: 'spec.User'
                        }
                    });
                    notify();
                    var users = viewModel.getStore('users');
                    expect(users.getAutoDestroy()).toBeUndefined();
                });

                it("should destroy the stores when the view model is destroyed", function() {
                    viewModel.setStores({
                        users1: {
                            model: 'spec.User'
                        },
                        users2: {
                            model: 'spec.User'
                        }
                    });
                    notify();
                    var users1 = viewModel.getStore('users1'),
                        users2 = viewModel.getStore('users2');
                
                    spyOn(users1, 'destroy');
                    spyOn(users2, 'destroy');
                    viewModel.destroy();
                    expect(users1.destroy).toHaveBeenCalled();
                    expect(users2.destroy).toHaveBeenCalled();
                });

                it("should not destroy if configured with autoDestroy: false", function() {
                    viewModel.setStores({
                        users: {
                            autoDestroy: false,
                            model: 'spec.User'
                        }
                    });
                    notify();
                    var users = viewModel.getStore('users');
                
                    spyOn(users, 'destroy');
                    viewModel.destroy();
                    expect(users.destroy).not.toHaveBeenCalled();
                });
            });

            describe("store instance", function() {
                it("should not set autoDestroy on the store", function() {
                    var s = new Ext.data.Store({
                        model: 'spec.User'
                    });
                    viewModel.setStores({
                        users: s
                    });
                    notify();
                    var users = viewModel.getStore('users');
                    expect(users.getAutoDestroy()).toBeUndefined();
                });

                it("should not auto destroy by default", function() {
                    var s = new Ext.data.Store({
                        model: 'spec.User'
                    });
                    viewModel.setStores({
                        users: s
                    });
                    notify();
                    var users = viewModel.getStore('users');
                
                    spyOn(users, 'destroy');
                    viewModel.destroy();
                    expect(users.destroy).not.toHaveBeenCalled();
                });

                it("should auto destroy if configured with autoDestroy: true", function() {
                    var s = new Ext.data.Store({
                        model: 'spec.User',
                        autoDestroy: true
                    });
                    viewModel.setStores({
                        users: s
                    });
                    notify();
                    var users = viewModel.getStore('users');
                
                    spyOn(users, 'destroy');
                    viewModel.destroy();
                    expect(users.destroy).toHaveBeenCalled();
                });
            });
        });
        
        describe("bindings", function() {
            function completeWithRecord(id, data) {
                Ext.Ajax.mockComplete({
                    status: 200,
                    responseText: Ext.encode(Ext.apply({
                        id: id
                    }, data))
                });
            }
            
            describe("initial", function() {
                it("should not create the store until a required binding is present", function() {
                    viewModel.setStores({
                        users: {
                            model: 'spec.User',
                            proxy: {
                                type: 'ajax',
                                url: '{theUrl}'
                            }
                        }
                    });
                    notify();
                    expect(viewModel.getStore('users')).toBeNull();
                    setNotify('theUrl', '/foo');
                    var store = viewModel.getStore('users');
                    expect(store.isStore).toBe(true);
                    expect(store.getProxy().getUrl()).toBe('/foo');
                });

                it("should wait for all required bindings", function() {
                    viewModel.setStores({
                        users: {
                            model: 'spec.User',
                            proxy: {
                                type: 'ajax',
                                url: '{theUrl}',
                                extraParams: {
                                    id: '{theId}'
                                }
                            }
                        }
                    });
                    notify();
                    expect(viewModel.getStore('users')).toBeNull();
                    setNotify('theUrl', '/foo');
                    expect(viewModel.getStore('users')).toBeNull();
                    setNotify('theId', 12);
                    var store = viewModel.getStore('users');
                    expect(store.isStore).toBe(true);
                    expect(store.getProxy().getUrl()).toBe('/foo');
                    expect(store.getProxy().getExtraParams().id).toBe(12);
                });
            });
            
            describe("special bindings", function() {
                it("should be able to bind filters", function() {
                    setNotify('id', 1);
                    viewModel.setStores({
                        users: {
                            model: 'spec.User',
                            filters: [{
                                property: 'someFilter',
                                value: '{id}'
                            }]
                        }
                    });
                    notify();
                    expect(viewModel.getStore('users').getFilters().first().getValue()).toBe(1);
                });
                
                it("should be able to bind sorters", function() {
                    setNotify('someField', 'name');
                    viewModel.setStores({
                        users: {
                            model: 'spec.User',
                            sorters: [{
                                property: '{someField}',
                                direction: 'ASC'
                            }]
                        }
                    });
                    notify();
                    expect(viewModel.getStore('users').getSorters().first().getProperty()).toBe('name');
                });
                
                it("should be able to bind extraParams", function() {
                    setNotify('someParam', 'val');
                    viewModel.setStores({
                        users: {
                            model: 'spec.User',
                            proxy: {
                                type: 'ajax',
                                extraParams: {
                                    someParam: '{someParam}'
                                }
                            }
                        }
                    });
                    notify();
                    expect(viewModel.getStore('users').getProxy().getExtraParams().someParam).toBe('val');
                });
            });
            
            describe("post-creation bindings", function() {
                it("should not change the store instance", function() {
                    setNotify('remote', true);
                    viewModel.setStores({
                        users: {
                            model: 'spec.User',
                            remoteFilter: '{remote}'
                        }
                    });
                    notify();
                    var store = viewModel.getStore('users');
                    expect(store.getRemoteFilter()).toBe(true);
                    setNotify('remote', false);
                    expect(store.getRemoteFilter()).toBe(false);
                    expect(viewModel.getStore('users')).toBe(store);
                });
                
                it("should update the proxy instance", function() {
                    setNotify('theUrl', '/urlA');
                    viewModel.setStores({
                        users: {
                            model: 'spec.User',
                            proxy: {
                                type: 'ajax',
                                url: '{theUrl}'
                            }
                        }
                    });
                    notify();
                    var store = viewModel.getStore('users'),
                        proxy = viewModel.getStore('users').getProxy();
                        
                    expect(proxy.getUrl()).toBe('/urlA');
                    setNotify('theUrl', '/urlB');
                    expect(proxy.getUrl()).toBe('/urlB');
                    expect(store.getProxy()).toBe(proxy);
                });
                
                describe("filters", function() {
                    it("should update the existing filter with the new value", function() {
                        setNotify('filterVal', 1);
                        viewModel.setStores({
                            users: {
                                model: 'spec.User',
                                filters: [{
                                    property: 'id',
                                    value: '{filterVal}'
                                }]
                            }
                        });
                        notify();
                        var filters = viewModel.getStore('users').getFilters(),
                            f = filters.first();
                            
                        expect(filters.getCount()).toBe(1);
                        expect(f.getProperty()).toBe('id');
                        expect(f.getValue()).toBe(1);
                        setNotify('filterVal', 2);
                        expect(filters.getCount()).toBe(1);
                        f = filters.first();
                        expect(f.getProperty()).toBe('id');
                        expect(f.getValue()).toBe(2);
                    });
                    
                    it("should maintain existing filters", function() {
                        setNotify('filterVal', 1);
                        viewModel.setStores({
                            users: {
                                model: 'spec.User',
                                filters: [{
                                    property: 'id',
                                    value: '{filterVal}'
                                }, {
                                    property: 'name',
                                    value: 'foo'
                                }]
                            }
                        });
                        notify();
                        var filters = viewModel.getStore('users').getFilters(),
                            f = filters.first();
                            
                        expect(filters.getCount()).toBe(2);
                        expect(f.getProperty()).toBe('id');
                        expect(f.getValue()).toBe(1);
                        f = filters.last();
                        expect(f.getProperty()).toBe('name');
                        expect(f.getValue()).toBe('foo');
                        setNotify('filterVal', 2);
                        expect(filters.getCount()).toBe(2);
                        f = filters.first();
                        expect(f.getProperty()).toBe('id');
                        expect(f.getValue()).toBe(2);
                        f = filters.last();
                        expect(f.getProperty()).toBe('name');
                        expect(f.getValue()).toBe('foo');
                    });
                });
                
                describe("sorters", function() {
                    it("should update the existing sorter with the new direction", function() {
                        setNotify('sorterVal', 'ASC');
                        viewModel.setStores({
                            users: {
                                model: 'spec.User',
                                sorters: [{
                                    property: 'id',
                                    direction: '{sorterVal}'
                                }]
                            }
                        });
                        notify();
                        var sorters = viewModel.getStore('users').getSorters(),
                            s = sorters.first();
                            
                        expect(sorters.getCount()).toBe(1);
                        expect(s.getProperty()).toBe('id');
                        expect(s.getDirection()).toBe('ASC');
                        setNotify('sorterVal', 'DESC');
                        expect(sorters.getCount()).toBe(1);
                        s = sorters.first();
                        expect(s.getProperty()).toBe('id');
                        expect(s.getDirection()).toBe('DESC');
                    });
                    
                    it("should maintain existing sorters", function() {
                        setNotify('sorterVal', 'ASC');
                        viewModel.setStores({
                            users: {
                                model: 'spec.User',
                                sorters: [{
                                    property: 'id',
                                    direction: '{sorterVal}'
                                }, {
                                    property: 'name',
                                    direction: 'DESC'
                                }]
                            }
                        });
                        notify();
                        var sorters = viewModel.getStore('users').getSorters(),
                            s = sorters.first();
                            
                        expect(sorters.getCount()).toBe(2);
                        expect(s.getProperty()).toBe('id');
                        expect(s.getDirection()).toBe('ASC');
                        s = sorters.last();
                        expect(s.getProperty()).toBe('name');
                        expect(s.getDirection()).toBe('DESC');
                        setNotify('sorterVal', 'DESC');
                        expect(sorters.getCount()).toBe(2);
                        s = sorters.first();
                        expect(s.getProperty()).toBe('id');
                        expect(s.getDirection()).toBe('DESC');
                        s = sorters.last();
                        expect(s.getProperty()).toBe('name');
                        expect(s.getDirection()).toBe('DESC');
                    });
                });
            });
        });
        
        describe("chained stores", function() {
            it("should create a chained store", function() {
                viewModel.setStores({
                    parent: {
                        model: 'spec.User'
                    },
                    child: {
                        source: '{parent}'
                    }
                });
                notify();
                
                var child = viewModel.getStore('child');
                    
                expect(child instanceof Ext.data.ChainedStore).toBe(true);
            });
            
            it("should be able to set the source to an expression", function() {
                viewModel.setStores({
                    parent: {
                        model: 'spec.User'
                    },
                    child: {
                        source: '{parent}'
                    }
                });
                notify();
                
                var parent = viewModel.getStore('parent'),
                    child = viewModel.getStore('child');
                    
                expect(child.getSource()).toBe(parent);
            });
            
            it("should bind if the source is a string", function() {
                viewModel.setStores({
                    parent: {
                        model: 'spec.User'
                    },
                    child: '{parent}'
                });
                notify();
                
                var parent = viewModel.getStore('parent'),
                    child = viewModel.getStore('child');
                    
                expect(child.getSource()).toBe(parent);
            });
            
            it("should wait until the source binds", function() {
                viewModel.setStores({
                    parent: {
                        model: 'spec.User',
                        remoteSort: '{remoteSort}'
                    },
                    child: {
                        source: '{parent}'
                    }
                });
                notify();
                expect(viewModel.getStore('child')).toBeNull();
                viewModel.set('remoteSort', false);
                notify();

                var parent = viewModel.getStore('parent'),
                    child = viewModel.getStore('child');

                expect(child.getSource()).toBe(parent);
            });
        });

        describe("listeners", function() {
            var TestController = Ext.define(null, {
                extend: 'Ext.app.ViewController',
                someFn: function() {}
            });

            it("should resolve listener scope to the view controller", function() {
                var ctrl = new TestController();
                var c = new Ext.Component({
                    controller: ctrl,
                    viewModel: viewModel
                });

                viewModel.setView(c);
                viewModel.setStores({
                    test: {
                        model: 'spec.User',
                        listeners: {
                            beforeload: 'someFn'
                        }
                    }
                });
                notify();

                spyOn(ctrl, 'someFn').andReturn();
                viewModel.getStore('test').load();

                expect(ctrl.someFn).toHaveBeenCalled();

                Ext.destroy(c);
            });

            it("should resolve listener scope to the component", function() {
                var c = new Ext.Component({
                    viewModel: viewModel,
                    defaultListenerScope: true,
                    someFn: function() {}
                });

                viewModel.setView(c);
                viewModel.setStores({
                    test: {
                        model: 'spec.User',
                        listeners: {
                            beforeload: 'someFn'
                        }
                    }
                });
                notify();

                spyOn(c, 'someFn').andReturn();
                viewModel.getStore('test').load();

                expect(c.someFn).toHaveBeenCalled();

                Ext.destroy(c);
            });

            it("should be able to resolve up the hierarchy", function() {
                var ctrl = new TestController();
                var ct = new Ext.container.Container({
                    controller: ctrl,
                    items: {
                        xtype: 'container',
                        items: {
                            xtype: 'container',
                            items: {
                                xtype: 'component',
                                itemId: 'c',
                                viewModel: viewModel
                            }
                        }
                    }
                });
                viewModel.setView(ct.down('#c'));

                viewModel.setStores({
                    test: {
                        model: 'spec.User',
                        listeners: {
                            beforeload: 'someFn'
                        }
                    }
                });
                notify();

                spyOn(ctrl, 'someFn').andReturn();
                viewModel.getStore('test').load();

                expect(ctrl.someFn).toHaveBeenCalled();

                Ext.destroy(ct);
            });
        });
    });
    
    describe("formulas", function() {
        beforeEach(function() {
            createViewModel();
        });
        describe("configuring", function() {
            var o;

            afterEach(function() {
                o.destroy();
            });

            describe("class definition", function() {
                describe("sub classing", function() {
                    it("should inherit formulas from the superclass", function() {
                        var fn = function() {};

                        var A = Ext.define(null, {
                            extend: 'Ext.app.ViewModel',
                            formulas: {
                                foo: fn
                            }
                        });

                        var B = Ext.define(null, {
                            extend: A
                        });

                        o = new B();
                        expect(o.getFormulas().foo).toBe(fn);
                    });

                    it("should merge keys", function() {
                        var fn1 = function() {},
                            fn2 = function() {};

                        var A = Ext.define(null, {
                            extend: 'Ext.app.ViewModel',
                            formulas: {
                                foo: fn1
                            }
                        });

                        var B = Ext.define(null, {
                            extend: A,
                            formulas: {
                                bar: fn2
                            }
                        });

                        o = new B();
                        expect(o.getFormulas()).toEqual({
                            foo: fn1,
                            bar: fn2
                        });
                    });

                    it("should favour the subclass on collision", function() {
                        var fn1 = function() {},
                            fn2 = function() {};

                        var A = Ext.define(null, {
                            extend: 'Ext.app.ViewModel',
                            formulas: {
                                foo: fn1
                            }
                        });

                        var B = Ext.define(null, {
                            extend: A,
                            formulas: {
                                foo: fn2
                            }
                        });

                        o = new B();
                        expect(o.getFormulas().foo).toBe(fn2);
                    });

                    it("should not attempt to merge a function with an object definition", function() {
                        var fn = function() {};

                        var A = Ext.define(null, {
                            extend: 'Ext.app.ViewModel',
                            formulas: {
                                foo: {
                                    get: function() {},
                                    set: function() {}
                                }
                            }
                        });

                        var B = Ext.define(null, {
                            extend: A,
                            formulas: {
                                foo: fn
                            }
                        });

                        o = new B();
                        expect(o.getFormulas().foo).toBe(fn);
                    });
                });

                describe("mixin", function() {
                    afterEach(function() {
                        Ext.undefine('spec.Mixin');
                    });

                    it("should copy formulas from the mixin", function() {
                        var fn = function() {};

                        var Mix = Ext.define('spec.Mixin', {
                            config: {
                                formulas: {
                                    foo: fn
                                }
                            }
                        });

                        var B = Ext.define(null, {
                            extend: 'Ext.app.ViewModel',
                            mixins: [Mix]
                        });

                        o = new B();
                        expect(o.getFormulas().foo).toBe(fn);
                    });

                    it("should merge keys", function() {
                        var fn1 = function() {},
                            fn2 = function() {};

                        var Mix = Ext.define('spec.Mixin', {
                            config: {
                                formulas: {
                                    foo: fn1
                                }
                            }
                        });

                        var B = Ext.define(null, {
                            extend: 'Ext.app.ViewModel',
                            mixins: [Mix],
                            formulas: {
                                bar: fn2
                            }
                        });

                        o = new B();
                        expect(o.getFormulas()).toEqual({
                            foo: fn1,
                            bar: fn2
                        });
                    });

                    it("should favour the class on collision", function() {
                        var fn1 = function() {},
                            fn2 = function() {};

                        var Mix = Ext.define('spec.Mixin', {
                            config: {
                                formulas: {
                                    foo: fn1
                                }
                            }
                        });

                        var B = Ext.define(null, {
                            extend: 'Ext.app.ViewModel',
                            mixins: [Mix],
                            formulas: {
                                foo: fn2
                            }
                        });

                        o = new B();
                        expect(o.getFormulas().foo).toBe(fn2);
                    });

                    it("should not attempt to merge a function with an object definition", function() {
                        var fn = function() {};

                        var Mix = Ext.define('spec.Mixin', {
                            config: {
                                formulas: {
                                    foo: {
                                        get: function() {},
                                        set: function() {}
                                    }
                                }
                            }
                        });

                        var B = Ext.define(null, {
                            extend: 'Ext.app.ViewModel',
                            mixins: [Mix],
                            formulas: {
                                foo: fn
                            }
                        });

                        o = new B();
                        expect(o.getFormulas().foo).toBe(fn);
                    });
                });
            });

            describe("instance", function() {
                it("should inherit formulas from the class", function() {
                    var fn = function() {};

                    var A = Ext.define(null, {
                        extend: 'Ext.app.ViewModel',
                        formulas: {
                            foo: fn
                        }
                    });

                    o = new A();
                    expect(o.getFormulas().foo).toBe(fn);
                });

                it("should merge keys", function() {
                    var fn1 = function() {},
                        fn2 = function() {};

                    var A = Ext.define(null, {
                        extend: 'Ext.app.ViewModel',
                        formulas: {
                            foo: fn1
                        }
                    });

                    o = new A({
                        formulas: {
                            bar: fn2
                        }
                    });
                    expect(o.getFormulas()).toEqual({
                        foo: fn1,
                        bar: fn2
                    });
                });

                it("should favour the instance on collision", function() {
                    var fn1 = function() {},
                        fn2 = function() {};

                    var A = Ext.define(null, {
                        extend: 'Ext.app.ViewModel',
                        formulas: {
                            foo: fn1
                        }
                    });

                    o = new A({
                        formulas: {
                            foo: fn2
                        }
                    });
                    expect(o.getFormulas().foo).toBe(fn2);
                });

                it("should not attempt to merge a function with an object definition", function() {
                    var fn = function() {};

                    var A = Ext.define(null, {
                        extend: 'Ext.app.ViewModel',
                        formulas: {
                            foo: {
                                get: function() {},
                                set: function() {}
                            }
                        }
                    });

                    o = new A({
                        formulas: {
                            foo: fn
                        }
                    });
                    expect(o.getFormulas().foo).toBe(fn);
                });
            });
        });

        it("should deliver a value if it's static", function() {
            viewModel.bind('{formula1}', spy);
            viewModel.setFormulas({
                formula1: function() {
                    return 1;
                }
            });
            notify();
            expect(spy).toHaveBeenCalled();
            expect(spy.mostRecentCall.args[0]).toBe(1);
        });
        
        it("should wait until values are delivered before evaluating", function() {
            viewModel.bind('{f1}', spy);
            viewModel.setFormulas({
                f1: function(get) {
                    return get('foo') + get('bar');
                }
            });
            notify();
            expect(spy).not.toHaveBeenCalled();
            setNotify('foo', 100);
            expect(spy).not.toHaveBeenCalled();
            setNotify('bar', 300);
            expect(spy).toHaveBeenCalled();
            expect(spy.mostRecentCall.args[0]).toBe(400);
        });
        
        it("should allow formulas to depend on other formulas", function() {
            viewModel.bind('{f1}', spy);
            viewModel.setFormulas({
                f1: function(get) {
                    return get('f2') + 1;
                },
                f2: function(get) {
                    return get('f3') + 1;
                },
                f3: function(get) {
                    return get('value') + 1;
                }
            });
            setNotify('value', 100);
            expect(spy).toHaveBeenCalled();
            expect(spy.mostRecentCall.args[0]).toBe(103);
        });
    });
    
    describe("the scheduler", function() {
        it("should create a scheduler if there is no parent", function() {
            createViewModel();
            expect(viewModel.getScheduler() instanceof Ext.util.Scheduler).toBe(true);
        });
        
        it("should use the scheduler of the parent VM", function() {
            createViewModel();
            var childVM = new Ext.app.ViewModel({
                    parent: viewModel
                });
                
            expect(childVM.getScheduler()).toBe(viewModel.getScheduler());
            childVM.destroy();
            childVM = null;
        });
    });
});
