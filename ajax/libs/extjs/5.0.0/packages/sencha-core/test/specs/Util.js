describe("Ext.Util", function() {
    describe("Ext.callback", function() {
        var spy;

        beforeEach(function() {
            spy = jasmine.createSpy();
        });

        it('should not fail if given a null callback', function () {
            expect(function() {
                Ext.callback(null);
            }).not.toThrow();
        });

        it('should not fail if given an undefined callback', function () {
            expect(function() {
                Ext.callback(undefined);
            }).not.toThrow();
        });

        it('should not fail if given an invalid callback', function () {
            expect(function() {
                Ext.callback(42);
            }).not.toThrow();
        });

        it("should pass arguments to the callback function", function() {
            Ext.callback(spy, fakeScope, [1, 2, 3, 4, 6]);
            expect(spy).toHaveBeenCalledWith(1, 2, 3, 4,6);
        });

        it("should be able to defer function call", function() {
            runs(function() {
                Ext.callback(spy, undefined, [1, 2, 3, 4, 6], 1);
                expect(spy).not.toHaveBeenCalled();
            });
            waitsFor(function() {
                return spy.callCount > 0;
            }, "deferred callback never called");
            runs(function() {
                expect(spy).toHaveBeenCalledWith(1, 2, 3, 4, 6);
            });

        });

        it("should return the return value of the given function", function () {
            var x = 0,
                fn = function (y) {
                    return x = this.z * 10 + y;
                },
                y = Ext.callback(fn, {z: 42}, [7]);

            expect(x).toBe(427);
            expect(y).toBe(427);
        });
        
        describe("scoping", function() {
            describe("with a function", function() {
                describe("scope 'this'", function() {
                    it("should resolve the scope to the defaultScope", function() {
                        Ext.callback(spy, 'this', undefined, undefined, undefined, fakeScope);
                        expect(spy.mostRecentCall.object).toBe(fakeScope);
                    });

                    it("should resolve the scope to the caller", function() {
                        Ext.callback(spy, 'this', undefined, undefined, fakeScope);
                        expect(spy.mostRecentCall.object).toBe(fakeScope);
                    });

                    it("should prefer the defaultScope to the caller", function() {
                        Ext.callback(spy, 'this', undefined, undefined, {}, fakeScope);
                        expect(spy.mostRecentCall.object).toBe(fakeScope);
                    });

                    it("should fallback to global scope if no caller is passed", function() {
                        Ext.callback(spy, 'this');
                        expect(spy.mostRecentCall.object).toBe(Ext.global);
                    });
                });

                describe("scope 'controller'", function() {
                    it("should resolve the scope to the defaultScope", function() {
                        Ext.callback(spy, 'controller', undefined, undefined, undefined, fakeScope);
                        expect(spy.mostRecentCall.object).toBe(fakeScope);
                    });

                    it("should resolve the scope to the caller", function() {
                        Ext.callback(spy, 'controller', undefined, undefined, fakeScope);
                        expect(spy.mostRecentCall.object).toBe(fakeScope);
                    });

                    it("should prefer the defaultScope to the caller", function() {
                        Ext.callback(spy, 'controller', undefined, undefined, {}, fakeScope);
                        expect(spy.mostRecentCall.object).toBe(fakeScope);
                    });

                    it("should fallback to global scope if no caller is passed", function() {
                        Ext.callback(spy, 'controller');
                        expect(spy.mostRecentCall.object).toBe(Ext.global);
                    });
                });

                it("should execute the passed function in the specified scope", function() {
                    Ext.callback(spy, fakeScope);
                    expect(spy.mostRecentCall.object).toBe(fakeScope);
                });
                
                it("should default the scope to Ext.global", function() {
                    Ext.callback(spy);
                    expect(spy.mostRecentCall.object).toBe(Ext.global);
                });
            });
            
            describe("with a string", function() {
                var scopeInfo;
                
                beforeEach(function() {
                    scopeInfo = {
                        foo: function() {
                            
                        }
                    };
                    spyOn(scopeInfo, 'foo');
                });
                
                describe("without caller", function() {
                    it("should throw if no scope is passed", function() {
                        expect(function() {
                            Ext.callback('foo');
                        }).toThrow();
                    });
                    
                    it("should throw if the method cannot be found on the passed scope", function() {
                        expect(function() {
                            Ext.callback('foo', {});
                        }).toThrow();
                    });

                    // Can't resolve the string scope without a caller
                    it("should throw if passed 'this' as scope", function() {
                        expect(function() {
                            Ext.callback('foo', 'this');
                        }).toThrow();
                    });

                    it("should throw if passed 'controller' as scope", function() {
                        expect(function() {
                            Ext.callback('foo', 'controller');
                        }).toThrow();
                    });
                    
                    it("should call the resolved method on the passed scope", function() {
                        Ext.callback('foo', scopeInfo);
                        expect(scopeInfo.foo).toHaveBeenCalled();
                        expect(scopeInfo.foo.mostRecentCall.object).toBe(scopeInfo);
                    });
                    
                    it("should retain scope on defer", function() {
                        runs(function() {
                            Ext.callback('foo', scopeInfo, undefined, 1);
                            expect(scopeInfo.foo).not.toHaveBeenCalled();
                        });
                        waitsFor(function() {
                            return scopeInfo.foo.callCount > 0;
                        }, "deferred callback never called");
                        runs(function() {
                            expect(scopeInfo.foo).toHaveBeenCalled();
                            expect(scopeInfo.foo.mostRecentCall.object).toBe(scopeInfo);
                        });
                    });
                });
                
                describe("with caller", function() {
                    var theScope, caller;
                    beforeEach(function() {
                        theScope = {
                            foo: function() {
                                
                            }
                        };
                        caller = {
                            resolveListenerScope: function() {
                                return theScope;
                            }
                        };
                        spyOn(theScope, 'foo');
                    });
                    
                    describe("object scope", function() {
                        it("should favour a passed scope", function() {
                            Ext.callback('foo', scopeInfo, undefined, undefined, caller);
                            expect(scopeInfo.foo).toHaveBeenCalled();
                            expect(scopeInfo.foo.mostRecentCall.object).toBe(scopeInfo);
                            expect(theScope.foo).not.toHaveBeenCalled();
                        });
                    
                        it("should throw if the method cannot be found on the passed caller", function() {
                            expect(function() {
                                Ext.callback('fake', undefined, undefined, undefined, caller);
                            }).toThrow();
                        });
                    
                        it("should call the resolved method on the passed scope", function() {
                            Ext.callback('foo', undefined, undefined, undefined, caller);
                            expect(theScope.foo).toHaveBeenCalled();
                            expect(theScope.foo.mostRecentCall.object).toBe(caller.resolveListenerScope());
                        });
                    
                        it("should retain scope on defer", function() {
                            runs(function() {
                                Ext.callback('foo', undefined, undefined, 1, caller);
                                expect(theScope.foo).not.toHaveBeenCalled();
                            });
                            waitsFor(function() {
                                return theScope.foo.callCount > 0;
                            }, "deferred callback never called");
                            runs(function() {
                                expect(theScope.foo).toHaveBeenCalled();
                                expect(theScope.foo.mostRecentCall.object).toBe(caller.resolveListenerScope());
                            });
                        });
                    });

                    describe("scope: 'this'", function() {
                        it("should call resolveListenerScope on the caller", function() {
                            spyOn(caller, 'resolveListenerScope').andCallThrough();
                            Ext.callback('foo', 'this', undefined, undefined, caller);
                            expect(caller.resolveListenerScope).toHaveBeenCalledWith('this');
                            expect(theScope.foo).toHaveBeenCalled();
                            expect(theScope.foo.mostRecentCall.object).toBe(theScope);
                        });

                        it("should throw if the method cannot be found on the passed caller", function() {
                            expect(function() {
                                Ext.callback('fake', 'this', undefined, undefined, caller);
                            }).toThrow();
                        });

                        it("should retain scope on defer", function() {
                            runs(function() {
                                Ext.callback('foo', 'this', undefined, 1, caller);
                                expect(theScope.foo).not.toHaveBeenCalled();
                            });
                            waitsFor(function() {
                                return theScope.foo.callCount > 0;
                            }, "deferred callback never called");
                            runs(function() {
                                expect(theScope.foo).toHaveBeenCalled();
                                expect(theScope.foo.mostRecentCall.object).toBe(theScope);
                            });
                        });
                    });

                    describe("scope: 'controller'", function() {
                        it("should call resolveListenerScope on the caller", function() {
                            spyOn(caller, 'resolveListenerScope').andCallThrough();
                            Ext.callback('foo', 'controller', undefined, undefined, caller);
                            expect(caller.resolveListenerScope).toHaveBeenCalledWith('controller');
                            expect(theScope.foo).toHaveBeenCalled();
                            expect(theScope.foo.mostRecentCall.object).toBe(theScope);
                        });

                        it("should throw if the method cannot be found on the passed caller", function() {
                            expect(function() {
                                Ext.callback('fake', 'controller', undefined, undefined, caller);
                            }).toThrow();
                        });

                        it("should retain scope on defer", function() {
                            runs(function() {
                                Ext.callback('foo', 'controller', undefined, 1, caller);
                                expect(theScope.foo).not.toHaveBeenCalled();
                            });
                            waitsFor(function() {
                                return theScope.foo.callCount > 0;
                            }, "deferred callback never called");
                            runs(function() {
                                expect(theScope.foo).toHaveBeenCalled();
                                expect(theScope.foo.mostRecentCall.object).toBe(theScope);
                            });
                        });
                    });
                });
            });
        });
    });
});