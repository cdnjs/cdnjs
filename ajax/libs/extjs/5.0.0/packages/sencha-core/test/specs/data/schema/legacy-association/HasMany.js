describe("Ext.data.association.HasMany_legacy", function() {

    var rec;
    
    function makeThread(id) {
        rec = new spec.Thread({
            id: id
        });
    }
    
    function defineThread(cfg) {
        Ext.define('spec.Thread', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name'],
            hasMany: Ext.apply({
                model: 'spec.Post'
            }, cfg)
        });
    }
    
    beforeEach(function() {
        Ext.data.Model.schema.setNamespace('spec');
        Ext.define('spec.Post', {
            extend: 'Ext.data.Model',
            fields: ['title', 'content', 'user_id', 'thread_id']
        });
        
        Ext.define('spec.Site', {
            extend: 'Ext.data.Model',
            fields: ['hits']
        });
        
        Ext.define('spec.User', {
            extend: 'Ext.data.Model',
            fields: ['id', 'name'],
            hasMany: 'spec.Post'    
        });  
    });
    
    afterEach(function() {
        Ext.undefine('spec.User');
        Ext.undefine('spec.Post');
        Ext.undefine('spec.Site');
        Ext.undefine('spec.Thread');
        
        Ext.data.Model.schema.clear(true);
        
        rec = null;
    });
    
    describe("declarations", function() {
        afterEach(function() {
            Ext.undefine('spec.Foo');
        });
        
        var expectFn = function(key) {
            expect(Ext.isFunction(spec.Foo.prototype[key])).toBe(true);
        }
        
        it("should read a single string", function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                hasMany: 'spec.Post'
            });
            expectFn('posts');
        });  
        
        it("should read an array of strings", function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                hasMany: ['spec.Post', 'spec.Site']
            });
            expectFn('posts');
            expectFn('sites');
        });
        
        it("should read a single object", function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                hasMany: {
                    model: 'spec.Post'
                }    
            });  
            expectFn('posts');
        });
        
        it("should read an array of objects", function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                hasMany: [{
                    model: 'spec.Post'
                }, {
                    model: 'spec.Site'
                }]
            });
            expectFn('posts');
            expectFn('sites');
        });
        
        it("should read an associations array", function() {
            Ext.define('spec.Foo', {
                extend: 'Ext.data.Model',
                associations: [{
                    type: 'hasMany',
                    model: 'spec.Post'
                }, {
                    type: 'hasMany',
                    model: 'spec.Site'
                }]
            });
            expectFn('posts');
            expectFn('sites');
        });
    });
    
    describe("instance", function() {
        var makeRec = function() {
            rec = new spec.User({
                id: 3
            });
        };
        
        var getStore = function() {
            return rec['posts']();    
        };
        
        it("should return a store", function() {
            makeRec();
            expect(getStore().isStore).toBe(true);         
        });
        
        it("should set the appropriate model type", function() {
            makeRec();
            expect(getStore().model).toBe(spec.Post);    
        });
        
        it("should return the same store instance on multiple calls", function() {
            makeRec();
            var s = getStore();
            expect(getStore()).toBe(s);
        });
        
        it("should apply the storeConfig", function() {
            defineThread({
                storeConfig: {
                    autoLoad: true
                }
            });
            makeThread(3);
            var store = getStore();
            expect(store.getAutoLoad()).toBe(true);
            store.destroy();
        });
        
        describe("autoLoad", function() {
            it("should not load the store by default", function() {
                makeRec();
                var spy = spyOn(Ext.data.Store.prototype, 'load').andReturn();
                getStore();
                expect(spy.callCount).toBe(0);    
            });  
            
            it("should load the store if configured with autoLoad: true", function() {
                defineThread({
                    autoLoad: true
                }); 
                
                makeThread(3);
                var spy = spyOn(Ext.data.Store.prototype, 'load').andReturn();
                getStore();
                expect(spy.callCount).toBe(1);          
            });
        });
        
        describe("keys", function() {
            
            describe("foreignKey", function() {
                it("should default to {modelName}_id", function() {
                    makeRec();
                    var post = getStore().add({})[0];
                    expect(post.get('user_id')).toBe(3);
                });
                
                it("should accept a user value", function() {
                    defineThread({
                        foreignKey: 'content'
                    });    
                    makeThread(3);
                    var post = getStore().add({})[0];
                    expect(post.get('content')).toBe(3);
                });
            });
            
            it("should set the primaryKey onto the foreignKey on add", function() {
                makeRec();
                var post = getStore().add({
                    'user_id': 1
                })[0];
                expect(post.get('user_id')).toBe(3);
            })
        });
    });
    
    describe("reading nested with assocationKey", function() {
        var getStore = function() {
            return rec.posts();    
        };
        
        it("should default the key to association name", function() {
            var reader = new Ext.data.reader.Json({
                model: spec.User
            });
            
            rec = reader.read([{
                id: 1,
                name: 'Foo',
                'posts': [{
                    title: 't1'                    
                }, {
                    title: 't2'                    
                }]
            }]).getRecords()[0];
            
            var posts = getStore();
            expect(posts.getCount()).toBe(2);
            expect(posts.first().get('title')).toBe('t1');
            expect(posts.last().get('title')).toBe('t2');
        });  
        
        it("should read a complex association", function() {
            defineThread({
                associationKey: 'nested.another[1].two'
            });
            
            var reader = new Ext.data.reader.Json({
                model: spec.Thread
            });
            
            rec = reader.read([{
                id: 1,
                name: 'Foo',
                nested: {
                    another: [{
                        
                    }, {
                        two: [{
                            title: 't1'
                        }, {
                            title: 't2'
                        }]
                    }]
                }
            }]).getRecords()[0];

            var posts = getStore();
            expect(posts.getCount()).toBe(2);
            expect(posts.first().get('title')).toBe('t1');
            expect(posts.last().get('title')).toBe('t2');
        });
    });
    
    describe("inverse association", function() {
        it("should set the record if it has an inverse belongsTo", function() {
            Ext.define('spec.Parent', {
                extend: 'Ext.data.Model',
                fields: ['id'],
                hasMany: 'spec.Child'
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
                children: [{
                    id: 17                    
                }]
            }]).getRecords()[0];
            
            var children = rec.children();
            expect(children.first().getParent()).toBe(rec);
            
            Ext.undefine('spec.Parent');
            Ext.undefine('spec.Child');
        });
    });
        
});