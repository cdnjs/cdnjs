describe("Ext.Error", function() { 
    var global;

    beforeEach(function() {
        global = Ext.global;

        // mock the console to avoid logging to the real console during the tests
        Ext.global = {
            console: {
                dir: function(s) {
                    return s;
                },
                log: function(s) {
                    return s;
                },                
                error: function(s) {
                    return s;
                },
                warn: function(s) {
                    return s;
                }
            }
        };
    });

    afterEach(function() {
        Ext.global = global;
    });

    describe("raising an error via Ext.Error.raise", function() {

        describe("passing a string", function() {
    
            it("should throw an error with a msg property", function() {
                var error;
                try {
                    Ext.Error.raise('foo');
                }
                catch (err) {
                    error = err;
                }
                expect(error.msg).toEqual('foo');
            });
        
            it("should log an error to the console", function() {
                spyOn(Ext.global.console, 'error');
                try {
                    Ext.Error.raise('foo');
                } 
                catch (err) {}
                expect(Ext.global.console.error).toHaveBeenCalledWith('[E] foo');
            });
        
            it("should log the error object to the console", function() {
                spyOn(Ext.global.console, 'dir').andCallFake(function(err){
                    expect(err.msg).toEqual('foo');
                });
                try {
                    Ext.Error.raise('foo');
                } 
                catch (err) {}
            });
        
            it("should do nothing when Ext.Error.ignore = true", function() {
                spyOn(Ext.global.console, 'warn');
            
                Ext.Error.ignore = true;
                try {
                    Ext.Error.raise('foo');
                } 
                catch (err) {
                    expect('Error should not have been caught').toBe(true);
                }
                expect(Ext.global.console.warn).not.toHaveBeenCalled();
                Ext.Error.ignore = false;
            });
        
            it("should not throw an error if handled by Ext.Error.handle", function() {
                spyOn(Ext.global.console, 'warn');
            
                var origHandle = Ext.Error.handle;
                Ext.Error.handle = function(err) {
                    expect(err.msg).toEqual('foo');
                    return true;
                }
                try {
                    Ext.Error.raise('foo');
                } 
                catch (err) {
                    expect('Error should not have been caught').toBe(true);
                }
                expect(Ext.global.console.warn).not.toHaveBeenCalled();
                Ext.Error.handle = origHandle;
            });
        });
    
        describe("passing an object with a msg property", function() {
    
            it("should throw an error with a msg property", function() {
                var error;
                try {
                    Ext.Error.raise({msg: 'foo'});
                }
                catch (err) {
                    error = err;
                }
                expect(error.msg).toEqual('foo');
            });
        
            it("should log an error to the console", function() {
                spyOn(Ext.global.console, 'error');
                try {
                    Ext.Error.raise({msg: 'foo'});
                } 
                catch (err) {}
                expect(Ext.global.console.error).toHaveBeenCalledWith('[E] foo');
            });
        
            it("should log the error object to the console", function() {
                spyOn(Ext.global.console, 'dir').andCallFake(function(err){
                    expect(err.msg).toEqual('foo');
                });
                try {
                    Ext.Error.raise({msg: 'foo'});
                } 
                catch (err) {}
            });
                            
            it("should do nothing when Ext.Error.ignore = true", function() {
                spyOn(Ext.global.console, 'warn');
            
                Ext.Error.ignore = true;
                try {
                    Ext.Error.raise({msg: 'foo'});
                } 
                catch (err) {
                    expect('Error should not have been caught').toBe(true);
                }
                expect(Ext.global.console.warn).not.toHaveBeenCalled();
                Ext.Error.ignore = false;
            });
        
            it("should not throw an error if handled by Ext.Error.handle", function() {
                spyOn(Ext.global.console, 'warn');
            
                var origHandle = Ext.Error.handle;
                Ext.Error.handle = function(err) {
                    expect(err.msg).toEqual('foo');
                    return true;
                }
                try {
                    Ext.Error.raise({msg: 'foo'});
                } 
                catch (err) {
                    expect('Error should not have been caught').toBe(true);
                }
                expect(Ext.global.console.warn).not.toHaveBeenCalled();
                Ext.Error.handle = origHandle;
            });
        });
    
        describe("passing an object with custom metadata", function() {
    
            it("should throw an error with matching metadata", function() {
                var error;
                try {
                    Ext.Error.raise({
                        msg: 'Custom error',
                        data: {
                            foo: 'bar'
                        }
                    });
                }
                catch (err) {
                    error = err;
                }
                expect(error.msg).toEqual('Custom error');
                expect(error.data).not.toBe(null);
                expect(error.data.foo).toEqual('bar');
            });
        
            it("should log the complete metadata to the console", function() {
                spyOn(Ext.global.console, 'dir').andCallFake(function(err){
                    expect(err.msg).toEqual('Custom error');
                    expect(err.data).not.toBe(null);
                    expect(err.data.foo).toEqual('bar');
                });
                try {
                    Ext.Error.raise({
                        msg: 'Custom error',
                        data: {
                            foo: 'bar'
                        }
                    });
                } 
                catch (err) {}
            });
        });
    
        describe("originating from within a class defined by Ext", function() {
            var customObj;
    
            beforeEach(function() {
                Ext.define('spec.CustomClass', {
                    doSomething: function(o){
                        Ext.Error.raise({
                            msg: 'Custom error',
                            data: o,
                            foo: 'bar'
                        });
                    }
                });
                customObj = Ext.create('spec.CustomClass');
            });

            afterEach(function() {
                Ext.undefine('spec.CustomClass');
            });
        
            it("should throw an error containing the source class and method", function() {
                var error;
                try {
                    customObj.doSomething({
                        extraData: 'extra'
                    });
                }
                catch (err) {
                    error = err;
                }
                expect(error.msg).toEqual('Custom error');
                expect(error.sourceClass).toEqual('spec.CustomClass');
                expect(error.sourceMethod).toEqual('doSomething');
                expect(error.toString()).toBe('spec.CustomClass.doSomething(): Custom error');
            });
        
            it("should log the complete metadata to the console", function() {
                spyOn(Ext.global.console, 'dir').andCallFake(function(err){
                    expect(err.msg).toEqual('Custom error');
                    expect(err.sourceClass).toEqual('spec.CustomClass');
                    expect(err.sourceMethod).toEqual('doSomething');
                    expect(err.data).not.toBe(null);
                    expect(err.data.extraData).not.toBe(null);
                    expect(err.data.extraData).toEqual('extra');
                    expect(err.foo).toEqual('bar');
                });
                try {
                    customObj.doSomething({
                        extraData: 'extra'
                    });
                } 
                catch (err) {
                }
            });
        });
    });
    
    describe("Throwing an an Ext.Error directly intantiated", function() {
        describe("Passing an string as constructor argument", function() {
           it("should contain a msg property with the given string as value", function() {
              expect(function() {
                  throw new Ext.Error("expected message");
              }).toRaiseExtError("expected message");
           });
        });
     });
    
    xdescribe("Ext.deprecated", function() {
       // failing only on CI
       it("should return a function that raises an error with the given suggestion", function() {
          Ext.ClassManager.enableNamespaceParseCache = false;
          Ext.define("spec.MyClass", {
             deprecatedMethod : Ext.deprecated("use another function")
          });
          expect(function() {
              new spec.ThisClassContainsADeprecatedMethod().deprecatedMethod();
          }).toThrow('The method "spec.MyClass.deprecatedMethod" has been removed. use another function');
          
          Ext.undefine('spec.MyClass');
          Ext.ClassManager.enableNamespaceParseCache = true;
       });
    });
});
