describe("Ext.data.association.BelongsTo_legacy", function() {
    
    var rec;
    
    function defineJob(cfg) {
        Ext.define('spec.Job', {
            extend: 'Ext.data.Model',
            fields: ['id', 'user_id', 'aField'],
            belongsTo: Ext.apply({
                model: 'spec.User'
            }, cfg)
        })
    }
    
    function doSet(user, options, scope) {
        return rec.setUser(user, options, scope);
    }
        
    function doGet(options, scope) {
        return rec.getUser(options, scope);
    }

    function complete(data, status) {
        Ext.Ajax.mockComplete({
            status: status || 200,
            responseText: Ext.JSON.encode(data)
        });
    }
    
    beforeEach(function() {
        MockAjaxManager.addMethods();
        Ext.data.Model.schema.setNamespace('spec');
        Ext.define('spec.User', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name']
        });
        
        Ext.define('spec.Post', {
            extend: 'Ext.data.Model',
            fields: ['id', 'title', 'content', 'user_id'],
            belongsTo: 'spec.User'
        });
    });
    
    afterEach(function() {
        MockAjaxManager.removeMethods();
        Ext.undefine('spec.User');
        Ext.undefine('spec.Post');
        Ext.undefine('spec.Job');
        
        Ext.data.Model.schema.clear(true);
        
        rec = null;
    });
    
    describe("declarations", function() {
        afterEach(function() {
            Ext.undefine('spec.Foo');
        });
        
        var expectGetSet = function(getKey, setKey) {
            var proto = spec.Foo.prototype;
            expect(Ext.isFunction(proto[getKey])).toBe(true);
            expect(Ext.isFunction(proto[setKey])).toBe(true);
        }
        
        it("should read a single string", function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                belongsTo: 'spec.User'
            });
            expectGetSet('getUser', 'setUser');
        });  
        
        it("should read an array of strings", function() {
            Ext.define('spec.Bar', {
                extend: 'Ext.data.Model'
            });
            
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                belongsTo: ['spec.User', 'spec.Bar']
            });
            expectGetSet('getUser', 'setUser');
            expectGetSet('getBar', 'setBar');
            
            Ext.undefine('spec.Bar');
        });
        
        it("should read a single object", function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                belongsTo: {
                    model: 'spec.User'
                }    
            });  
            expectGetSet('getUser', 'setUser');
        });
        
        it("should read an array of objects", function() {
            Ext.define('spec.Bar', {
                extend: 'Ext.data.Model'
            });
            
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                belongsTo: [{
                    model: 'spec.User'
                }, {
                    model: 'spec.Bar'
                }]
            });
            
            expectGetSet('getUser', 'setUser');
            expectGetSet('getBar', 'setBar');
            
            Ext.undefine('spec.Bar');
        });
        
        it("should read an associations array", function() {
            Ext.define('spec.Bar', {
                extend: 'Ext.data.Model'
            });
            
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                associations: [{
                    type: 'belongsTo',
                    model: 'spec.User'
                }, {
                    type: 'belongsTo',
                    model: 'spec.Bar'
                }]
            });
            
            expectGetSet('getUser', 'setUser');
            expectGetSet('getBar', 'setBar');
            
            Ext.undefine('spec.Bar');
        });
    });
    
    describe("getter", function() {
        var user, spy;

        beforeEach(function() {
            spy = jasmine.createSpy();
        });

        afterEach(function() {
            spy = null;
        });
        
        describe("instance already set", function() {
            beforeEach(function() {
                rec = new spec.Post({
                    id: 2
                });
                
                user = new spec.User({
                    id: 4
                });
                doSet(user);
            });
            
            afterEach(function() {
                user = null;
            });        
            
            it("should return the same instance", function() {
                expect(doGet()).toBe(user);
            });
            
            it("should not attempt to load", function() {
                spy = spyOn(spec.User.getProxy(), 'read');
                doGet();
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should attempt to reload if called with options.reload", function() {
                spy = spyOn(spec.User.getProxy(), 'read').andReturn();
                doGet({
                    reload: true
                });    
                expect(spy).toHaveBeenCalled();
            });
            
            describe("callbacks", function() {
                it("should accept a function and default the scope to the model", function() {
                    var scope, item;
                    doGet(spy);
                    var call = spy.mostRecentCall;
                    expect(call.args[0]).toBe(user);
                    expect(call.object).toBe(rec);
                });
                
                it("should accept a function with a scope", function() {
                    var o = {};
                    doGet(spy, o);
                    expect(spy.mostRecentCall.object).toBe(o);   
                });
                
                it("should accept an options object and call success", function() {
                    doGet({
                        success: spy
                    });  
                    var call = spy.mostRecentCall;
                    expect(call.args[0]).toBe(user);
                    expect(call.object).toBe(rec);  
                });
                
                it("should accept an options object and call callback", function() {
                    doGet({
                        callback: spy
                    });  
                    var call = spy.mostRecentCall;
                    expect(call.args[0]).toBe(user);
                    expect(call.object).toBe(rec);  
                });
            });
        });
        
        describe("instance not set", function() {
            describe("keys", function() {
                it("should default the primaryKey to 'id' and set it on the model", function() {
                    rec = new spec.Post({
                        'user_id': 10
                    });
                    user = doGet();
                    expect(user.get('id')).toBe(10);    
                });
                
                it("should use a custom foreign key", function() {
                    defineJob({
                        foreignKey: 'aField'
                    });
                    rec = new spec.Job({
                        'aField': 12
                    });
                    user = doGet();
                    expect(user.get('id')).toBe(12); 
                });
            });
            
            describe("callbacks", function() {
                it("should accept a function and the scope should default to the model", function() {
                    rec = new spec.Post({
                        'user_id': 3
                    }); 
                    user = doGet(spy);
                    complete({});
                    var call = spy.mostRecentCall;
                    expect(call.args[0]).toBe(user);
                    expect(call.object).toBe(rec);
                });
                
                it("should accept a function and a scope", function() {
                    rec = new spec.Post({
                        'user_id': 3
                    }); 
                    var o = {},
                        call;

                    user = doGet(spy, o);
                    complete({});
                    call = spy.mostRecentCall;
                    expect(call.args[0]).toBe(user);
                    expect(call.object).toBe(o);
                });   
                
                it("should pass the options to the operation", function() {
                   rec = new spec.Post({
                        'user_id': 3
                    }); 
                        
                    spy = spyOn(spec.User.getProxy(), 'read');
                    doGet({
                        params: {
                            someKey: 1 
                        }
                    });
                    expect(spy.mostRecentCall.args[0].getParams()).toEqual({
                        someKey: 1
                    });
                });
            });
            
            it("should return null if the foreignKey value is empty", function() {
                rec = new spec.Post();
                expect(doGet()).toBeNull();    
            });
        });
    });
    
    describe("setter", function() {
        var spy;
        beforeEach(function() {
            spy = jasmine.createSpy();
            rec = new spec.Post({
                id: 7
            });
        });

        afterEach(function() {
            spy = null;
        });
        
        describe("instance", function() {
            it("should have the same record reference", function() {
                var user = new spec.User({
                    id: 3
                });
                doSet(user);
            
                expect(doGet()).toBe(user);
            });
            
            it("should set the underlying key value", function() {
                var user = new spec.User({
                    id: 3
                });
                doSet(user);
                expect(rec.get('user_id')).toBe(3);  
            });
        });
        
        describe("value", function() {
            it("should set the underlying key", function() {
                doSet(16);
                expect(rec.get('user_id')).toBe(16);    
            });  
            
            it("should keep the same reference if setting the value with a matching id", function() {
                var user = new spec.User({
                    id: 3
                });
                doSet(user);
                doSet(3);
                expect(doGet()).toBe(user);
            });
            
            it("should clear the reference if a model is already set and a new id is passed", function() {
                var user = new spec.User({
                    id: 3
                });
                doSet(user);
                doSet(13);
                spy = spyOn(spec.User.getProxy(), 'read');
                // Reference doesn't exist, so need to grab it again here
                doGet();
                expect(spy.mostRecentCall.args[0].getId()).toBe(13);
            });
            
            it("should set a custom foreignKey", function() {
                defineJob({
                    foreignKey: 'aField'
                });
                rec = new spec.Job({
                    id: 1
                });    
                doSet(13);
                expect(rec.get('aField')).toBe(13);
                
            });
        });
        
        describe("callbacks", function() {
            it("should accept a function as the second arg, scope should default to the model", function() {
                doSet(16, spy);
                complete({});
                var call = spy.mostRecentCall;
                expect(call.args[0]).toBe(rec);
                expect(call.object).toBe(rec);
            });    
            
            it("should accept a function with a scope", function() {
                var o = {};
                doSet(16, spy, o);
                complete({});
                expect(spy.mostRecentCall.object).toBe(o);
            });

            describe("options object", function() {
                var successSpy, failureSpy, callbackSpy;

                beforeEach(function() {
                    successSpy = jasmine.createSpy();
                    failureSpy = jasmine.createSpy();
                    callbackSpy = jasmine.createSpy();
                });

                afterEach(function() {
                    successSpy = failureSpy = callbackSpy = null;
                });

                describe("on success", function() {
                    it("should call success/callback and scope should default to the model", function() {
                        doSet(16, {
                            success: successSpy,
                            callback: callbackSpy,
                            failure: failureSpy
                        });
                        complete({});
                        expect(failureSpy).not.toHaveBeenCalled();
                        expect(successSpy).toHaveBeenCalled();
                        expect(callbackSpy).toHaveBeenCalled();
                        expect(successSpy.mostRecentCall.object).toBe(rec);
                        expect(callbackSpy.mostRecentCall.object).toBe(rec);
                    });

                    it("should use a passed scope", function() {
                        var scope = {};
                        doSet(16, {
                            scope: scope,
                            success: successSpy,
                            callback: callbackSpy
                        });
                        complete({});
                        expect(successSpy.mostRecentCall.object).toBe(scope);
                        expect(callbackSpy.mostRecentCall.object).toBe(scope);
                    });
                });

                describe("on failure", function() {
                    it("should call failure/callback and scope should default to the model", function() {
                        doSet(16, {
                            success: successSpy,
                            callback: callbackSpy,
                            failure: failureSpy
                        });
                        complete(null, 500);
                        expect(successSpy).not.toHaveBeenCalled();
                        expect(failureSpy).toHaveBeenCalled();
                        expect(callbackSpy).toHaveBeenCalled();
                        expect(failureSpy.mostRecentCall.object).toBe(rec);
                        expect(callbackSpy.mostRecentCall.object).toBe(rec);
                    });

                    it("should use a passed scope", function() {
                        var scope = {};
                        doSet(16, {
                            scope: scope,
                            failure: failureSpy,
                            callback: callbackSpy
                        });
                        complete(null, 500);
                        expect(failureSpy.mostRecentCall.object).toBe(scope);
                        expect(callbackSpy.mostRecentCall.object).toBe(scope);
                    });
                });
            });
        });
    });
    
    describe("reading nested with assocationKey", function() {
        it("should default the key to the association name", function() {
            var reader = new Ext.data.reader.Json({
                model: spec.Post
            });
            
            rec = reader.read([{
                id: 1,
                'user': {
                    id: 3
                }
            }]).getRecords()[0];
            
            expect(doGet().getId()).toBe(3);
        });
        
        it("should read a complex association", function() {
            defineJob({
                associationKey: 'nested.another[1].two'
            });
            
            var reader = new Ext.data.reader.Json({
                model: spec.Job
            });
            
            rec = reader.read([{
                id: 1,
                nested: {
                    another: [{
                        
                    }, {
                        two: {
                            id: 65
                        }
                    }]
                }
            }]).getRecords()[0];
            expect(doGet().getId()).toBe(65);
        });
    });
    
});