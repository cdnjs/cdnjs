describe("Ext.data.proxy.Rest", function() {
    var proxy;

    beforeEach(function() {
        Ext.ClassManager.enableNamespaceParseCache = false; 
        proxy = new Ext.data.proxy.Rest({});
    });
    
    afterEach(function() {
        Ext.ClassManager.enableNamespaceParseCache = true;
    });
    
    describe("instantiation", function() {
        it("should extend Ext.data.proxy.Ajax", function() {
            expect(proxy.superclass).toEqual(Ext.data.proxy.Ajax.prototype);
        });

        it("should have correct actionMethods", function() {
            var actionMethods =  {
                create : 'POST',
                read   : 'GET',
                update : 'PUT',
                destroy: 'DELETE'
            };

            expect(proxy.getActionMethods()).toEqual(actionMethods);
        });
    });

    describe("building URLs", function() {
        var collectionOperation, singleOperation, collectionRequest, singleRequest, record1;

        function createProxy(config) {
            return new Ext.data.proxy.Rest(Ext.apply({}, config, {
                url: '/users'
            }));
        }

        function stripCache(url) {
            return url.split("?")[0];
        }

        beforeEach(function() {

            var User = Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['id', 'name', 'email']
            });

            record1 = new User({
                id   : 2,
                name : 'Ed Spencer',
                email: 'ed@sencha.com'
            });

            collectionOperation = new Ext.data.operation.Read({
                records: []
            });

            singleOperation = new Ext.data.operation.Read({
                records: [record1]
            });

            collectionRequest = new Ext.data.Request({
                operation: collectionOperation,
                action: collectionOperation.getAction()
            });

            singleRequest = new Ext.data.Request({
                operation: singleOperation
            });
        });

        afterEach(function(){
            Ext.data.Model.schema.clear();
            Ext.undefine('spec.User');
        });

        describe("if there are no records in the Operation", function() {
            it("should not fail", function() {
                collectionOperation = new Ext.data.operation.Read({
                });

                collectionRequest = new Ext.data.Request({
                    operation: collectionOperation,
                    action: collectionOperation.getAction()
                });

                proxy = createProxy({appendId: false});

                expect(stripCache(proxy.buildUrl(collectionRequest))).toEqual('/users');
            });
        });

        describe("if appendId is false", function() {
            beforeEach(function() {
                proxy = createProxy({appendId: false});
            });

            it("should not append the ID to a single Operation", function() {
                expect(stripCache(proxy.buildUrl(collectionRequest))).toEqual('/users');
            });

            it("should not append the ID to a collection Operation", function() {
                expect(stripCache(proxy.buildUrl(singleRequest))).toEqual('/users');
            });
        });

        describe("if appendId is true", function() {
            beforeEach(function() {
                proxy = createProxy({appendId: true});
            });

            it("should not append the ID to a collection Operation", function() {
                expect(stripCache(proxy.buildUrl(collectionRequest))).toBe('/users');
            });

            it("should append the ID to a single Operation", function() {
                expect(stripCache(proxy.buildUrl(singleRequest))).toBe('/users/2');
            });

            it("should not append a phantom record", function() {
                record1.setId('User-1');
                record1.phantom = true;
                expect(stripCache(proxy.buildUrl(singleRequest))).toBe('/users');   
            });
            
            it("should append an id of 0", function(){
                record1.setId(0);
                expect(stripCache(proxy.buildUrl(singleRequest))).toBe('/users/0');    
            });
            
            it("should not append an empty string", function(){
                record1.setId('');
                expect(stripCache(proxy.buildUrl(singleRequest))).toBe('/users');    
            });
            
            it("should not append null", function(){
                record1.setId(null);
                expect(stripCache(proxy.buildUrl(singleRequest))).toBe('/users');    
            });
            
            it("should not append undefined", function(){
                record1.setId(undefined);
                expect(stripCache(proxy.buildUrl(singleRequest))).toBe('/users');    
            });

            it("should not have id=foo in the params", function() {
                var url = proxy.buildUrl(singleRequest);
                expect(url.indexOf('id=2')).toBe(-1);
            });
        });

        describe("if format is undefined", function() {
            beforeEach(function() {
                proxy = createProxy({
                    appendId: false, 
                    format  : undefined
                });
            });

            it("should not append the format to a single Operation", function() {
                expect(stripCache(proxy.buildUrl(collectionRequest))).toEqual('/users');
            });

            it("should not append the format to a collection Operation", function() {
                expect(stripCache(proxy.buildUrl(singleRequest))).toEqual('/users');
            });
        });

        describe("if a format is given", function() {
            beforeEach(function() {
                proxy = createProxy({
                    appendId: true,
                    format  : 'json'
                });
            });

            it("should append the format to a single Operation", function() {
                expect(stripCache(proxy.buildUrl(collectionRequest))).toEqual('/users.json');
            });

            it("should append the format to a collection Operation", function() {
                expect(stripCache(proxy.buildUrl(singleRequest))).toEqual('/users/2.json');
            });
        });
        
        it("should respect the api configuration", function(){
            proxy = createProxy({
                api: {
                    read: '/users1'
                }
            });
            expect(stripCache(proxy.buildUrl(collectionRequest))).toEqual('/users1');
        });
    });
});
