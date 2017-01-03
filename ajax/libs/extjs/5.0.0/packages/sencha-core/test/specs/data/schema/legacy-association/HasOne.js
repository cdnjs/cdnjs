describe("Ext.data.association.HasOne_legacy", function() {
    
    var rec;
    
    function definePerson(cfg) {
        Ext.define('spec.Person', {
            extend: 'Ext.data.Model',
            fields: ['id', 'profile_id', 'aField'],
            hasOne: Ext.apply({
                model: 'spec.Profile'
            }, cfg)
        })
    }
    
    function doSet(profile, options, scope) {
        rec.setProfile(profile, options, scope);
    }
        
    function doGet(options, scope) {
        return rec.getProfile(options, scope);
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
        Ext.define('spec.Profile', {
            extend: 'Ext.data.Model',
            fields: ['id', 'bio', 'age']
        });
        
        Ext.define('spec.User', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name', 'profile_id'],
            hasOne: 'spec.Profile'
        });
    });
    
    afterEach(function() {
        MockAjaxManager.removeMethods();
        Ext.undefine('spec.User');
        Ext.undefine('spec.Profile');
        Ext.undefine('spec.Person');
        
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
                hasOne: 'spec.Profile'
            });
            expectGetSet('getProfile', 'setProfile');
        });  
        
        it("should read an array of strings", function() {
            Ext.define('spec.Bar', {
                extend: 'Ext.data.Model'
            });
            
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                hasOne: ['spec.Profile', 'spec.Bar']
            });
            expectGetSet('getProfile', 'setProfile');
            expectGetSet('getBar', 'setBar');
            
            Ext.undefine('spec.Bar');
        });
        
        it("should read a single object", function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                hasOne: {
                    model: 'spec.Profile'
                }    
            });  
            expectGetSet('getProfile', 'setProfile');
        });
        
        it("should read an array of objects", function() {
            Ext.define('spec.Bar', {
                extend: 'Ext.data.Model'
            });
            
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                hasOne: [{
                    model: 'spec.Profile'
                }, {
                    model: 'spec.Bar'
                }]
            });
            
            expectGetSet('getProfile', 'setProfile');
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
                    type: 'hasOne',
                    model: 'spec.Profile'
                }, {
                    type: 'hasOne',
                    model: 'spec.Bar'
                }]
            });
            
            expectGetSet('getProfile', 'setProfile');
            expectGetSet('getBar', 'setBar');
            
            Ext.undefine('spec.Bar');
        });
    });
    
    describe("getter", function() {
        var profile, spy;

        beforeEach(function() {
            spy = jasmine.createSpy();
        });

        afterEach(function() {
            spy = null;
        });
        
        describe("instance already set", function() {
            beforeEach(function() {
                rec = new spec.User({
                    id: 4
                });
                
                profile = new spec.Profile({
                    id: 2
                });
                
                
                doSet(profile);
            });
            
            afterEach(function() {
                profile = null;
            });        
            
            it("should return the same instance", function() {
                expect(doGet()).toBe(profile);
            });
            
            it("should not attempt to load", function() {
                spy = spyOn(spec.Profile.getProxy(), 'read');
                doGet();
                expect(spy).not.toHaveBeenCalled();
            });
            
            it("should attempt to reload if called with options.reload", function() {
                spy = spyOn(spec.Profile.getProxy(), 'read').andReturn();
                doGet({
                    reload: true
                });    
                expect(spy).toHaveBeenCalled();
            });
            
            describe("callbacks", function() {
                it("should accept a function and default the scope to the model", function() {
                    doGet(spy);
                    var call = spy.mostRecentCall;
                    expect(call.args[0]).toBe(profile);
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
                    expect(call.args[0]).toBe(profile);
                    expect(call.object).toBe(rec);  
                });
                
                it("should accept an options object and call callback", function() {
                    doGet({
                        callback: spy  
                    });
                    var call = spy.mostRecentCall;
                    expect(call.args[0]).toBe(profile);
                    expect(call.object).toBe(rec);   
                });
            });
        });
        
        describe("instance not set", function() {
            describe("keys", function() {
                it("should default the primaryKey to 'id' and set it on the model", function() {
                    rec = new spec.User({
                        'profile_id': 10
                    });
                    profile = doGet();
                    expect(profile.get('id')).toBe(10);    
                });
                
                it("should use a custom foreign key", function() {
                    definePerson({
                        foreignKey: 'aField'
                    });
                    rec = new spec.Person({
                        'aField': 12
                    });
                    profile = doGet();
                    expect(profile.get('id')).toBe(12); 
                });
            });
            
            describe("callbacks", function() {
                it("should accept a function and the scope should default to the model", function() {
                    rec = new spec.User({
                        'profile_id': 3
                    }); 
                    profile = doGet(spy);
                    complete({});
                    var call = spy.mostRecentCall;
                    expect(call.args[0]).toBe(profile);
                    expect(call.object).toBe(rec);
                });
                
                it("should accept a function and a scope", function() {
                    rec = new spec.User({
                        'profile_id': 3
                    }); 
                    var o = {};
                    doGet(spy, o);
                    complete({});
                    expect(spy.mostRecentCall.object).toBe(o);
                });   
                
                it("should pass the options to load", function() {
                   rec = new spec.User({
                        'profile_id': 3
                    }); 
                        
                    var spy = spyOn(spec.Profile.getProxy(), 'read');
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
                rec = new spec.User();
                expect(doGet()).toBeNull();    
            });
        });
    });
    
    describe("setter", function() {
        var spy;
        beforeEach(function() {
            spy = jasmine.createSpy();
            rec = new spec.User({
                id: 7
            });
        });

        afterEach(function() {
            spy = null;
        });
        
        describe("instance", function() {
            it("should have the same record reference", function() {
                var profile = new spec.Profile({
                    id: 3
                });
                doSet(profile);
            
                expect(doGet()).toBe(profile);
            });
            
            it("should set the underlying key value", function() {
                var profile = new spec.Profile({
                    id: 3
                });
                doSet(profile);
                expect(rec.get('profile_id')).toBe(3);  
            });
        });
        
        describe("value", function() {
            it("should set the underlying key", function() {
                doSet(16);
                expect(rec.get('profile_id')).toBe(16);    
            });  
            
            it("should keep the same reference if setting the value with a matching id", function() {
                var profile = new spec.Profile({
                    id: 3
                });
                doSet(profile);
                doSet(3);
                expect(doGet()).toBe(profile);
            });
            
            it("should clear the reference if a model is already set and a new id is passed", function() {
                var profile = new spec.Profile({
                    id: 3
                });
                doSet(profile);
                doSet(13);
                spy = spyOn(spec.Profile.getProxy(), 'read');
                // Reference doesn't exist, so need to grab it again here
                doGet();
                expect(spy.mostRecentCall.args[0].getId()).toBe(13);
            });
            
            it("should set a custom foreignKey", function() {
                definePerson({
                    foreignKey: 'aField'
                });
                rec = new spec.Person({
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
                model: spec.User
            });
            
            rec = reader.read([{
                id: 1,
                'profile': {
                    id: 3
                }
            }]).getRecords()[0];
            
            expect(doGet().getId()).toBe(3);
        });
        
        it("should read a complex association", function() {
            definePerson({
                associationKey: 'nested.another[1].two'
            });
            
            var reader = new Ext.data.reader.Json({
                model: spec.Person
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
    
    describe("inverse association", function() {
        it("should set the record if it has an inverse belongsTo", function() {
            Ext.define('spec.Parent', {
                extend: 'Ext.data.Model',
                fields: ['id'],
                hasOne: 'spec.Child'
            });
            
            Ext.define('spec.Child', {
                extend: 'Ext.data.Model',
                fields: ['id', 'parent_id'],
                belongsTo: 'spec.Parent'
            });
            
            var reader = new Ext.data.reader.Json({
                model: spec.Parent
            });
            
            rec = reader.read([{
                id: 1,
                'child': {
                    id: 17                    
                }
            }]).getRecords()[0];
            
            var child = rec.getChild();
            expect(child.getParent()).toBe(rec);
            
            Ext.undefine('spec.Parent');
            Ext.undefine('spec.Child');
        });
    });
    
});