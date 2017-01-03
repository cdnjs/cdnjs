describe("Ext.data.operation.Update", function() {
    var op, clientAlien1, serverAlien1, clientAlien2, serverAlien2;
    
    function makeOperation(cfg) {
        op = new Ext.data.operation.Update(cfg);
    }

    beforeEach(function() {
        Ext.define('spec.Alien', {
            extend: 'Ext.data.Model',
            fields: ['name', 'age', 'planet']
        });

        clientAlien1 = new spec.Alien({
            name: 'Thor',
            age: 5000,
            planet: 'Orilla'
        });
        clientAlien2 = new spec.Alien({
            name: "Teal'c",
            age: 130,
            planet: 'Chulak'
        });

        serverAlien1 = {
            id: 5,
            name: 'Baal',
            age: 3000,
            planet: 'P3X-888'
        };
        serverAlien2 = {
            id: 12,
            name: 'Jolinar',
            age: 1500,
            planet: 'Vorash'
        };
    });
    
    afterEach(function(){
        op = clientAlien1 = serverAlien1 = clientAlien2 = serverAlien2 = null;
        Ext.data.Model.schema.clear();
        Ext.undefine('spec.Alien');
    });
    
    describe("execute", function() {
        it("should call the proxy update method and pass itself", function() {
            var proxy = new Ext.data.proxy.Proxy();
            spyOn(proxy, 'update').andReturn(new Ext.data.Request());
            makeOperation({
                proxy: proxy
            });
            op.execute();
            expect(proxy.update).toHaveBeenCalledWith(op);
        });
    });
    
    describe("updating records", function() {
        describe("single record", function() {
            beforeEach(function() {
                clientAlien1.setId(serverAlien1.id);
                clientAlien1.dirty = false;
                clientAlien1.phantom = false;

                makeOperation({
                    records: [clientAlien1]
                });

                op.process(new Ext.data.ResultSet({
                    success: true,
                    records: [serverAlien1]
                }));
            });

            it("should update the client record with the server record's data", function() {
                expect(clientAlien1.get('id')).toBe(serverAlien1.id);
                expect(clientAlien1.get('name')).toBe(serverAlien1.name);
                expect(clientAlien1.get('age')).toBe(serverAlien1.age);
                expect(clientAlien1.get('planet')).toBe(serverAlien1.planet);
            });

            it("should mark the client record as not dirty", function() {
                expect(clientAlien1.dirty).toBe(false);
            });

            it("should mark the client record as not phantom", function() {
                expect(clientAlien1.phantom).toBe(false);
            });
        });


        describe("updating a single record with no matching server record id", function() {
            beforeEach(function() {
                clientAlien1.setId(100);
                clientAlien1.dirty = false;
                clientAlien1.phantom = false;

                makeOperation({
                    records: [clientAlien1]
                });

                spec.Alien.prototype.clientIdProperty = 'clientId';
                op.process(new Ext.data.ResultSet({
                    success: true,
                    records: [serverAlien1]
                }));
            });

            it("should update the client record with the server record's data", function() {
                expect(clientAlien1.get('id')).not.toBe(serverAlien1.id);
                expect(clientAlien1.get('name')).not.toBe(serverAlien1.name);
                expect(clientAlien1.get('age')).not.toBe(serverAlien1.age);
                expect(clientAlien1.get('planet')).not.toBe(serverAlien1.planet);
            });

            it("should mark the client record as not dirty", function() {
                expect(clientAlien1.dirty).toBe(false);
            });

            it("should mark the client record as not phantom", function() {
                expect(clientAlien1.phantom).toBe(false);
            });
        });

        describe("updating multiple records without a clientIdProperty", function() {
            beforeEach(function() {
                clientAlien1.dirty = true;
                clientAlien2.setId(100);
                clientAlien2.dirty = true;
                
                serverAlien2.clientId = clientAlien1.id;

                spyOn(clientAlien2, 'set').andCallThrough();

                makeOperation({
                    records: [clientAlien1, clientAlien2]
                });

                spec.Alien.prototype.clientIdProperty = 'clientId';
                op.process(new Ext.data.ResultSet({
                    success: true,
                    records: [serverAlien1, serverAlien2]
                }));
            });
            it("should update the client records with the server records' data", function() {
                expect(clientAlien1.get('id')).toBe(serverAlien2.id);
                expect(clientAlien1.get('name')).toBe(serverAlien2.name);
                expect(clientAlien1.get('age')).toBe(serverAlien2.age);
                expect(clientAlien1.get('planet')).toBe(serverAlien2.planet);

                expect(clientAlien2.set).not.toHaveBeenCalled();
            });

            it("should mark the client records as not dirty", function() {
                expect(clientAlien1.dirty).toBe(false);
                expect(clientAlien2.dirty).toBe(false);
            });

            it("should mark the client records as not phantom", function() {
                expect(clientAlien1.phantom).toBe(false);
                expect(clientAlien2.phantom).toBe(false);
            });
        });
    });
});
