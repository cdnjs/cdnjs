describe("Ext.data.proxy.SessionStorage", function() {
    var proxy;

    if (window.sessionStorage) {    
        beforeEach(function() {
            proxy = new Ext.data.proxy.SessionStorage({id: 1});
        });
    
        describe("instantiation", function() {
            it("should extend Ext.data.proxy.WebStorage", function() {
                expect(proxy.superclass).toEqual(Ext.data.proxy.WebStorage.prototype);
            });
        });
    
        describe("methods", function() {
            describe("getStorageObject", function() {
                it("should return localStorage object", function() {
                    // IE8 throw Class doesn't support Automation when comparing sessionStorage to itself (or localStorage)
                    var automationBug = false;
                    try {
                        sessionStorage === sessionStorage;
                    } catch(e) {
                        automationBug = true;
                    }
                    if (!automationBug) {
                        expect(proxy.getStorageObject()).toEqual(sessionStorage);
                    } else { 
                        var storageObject = proxy.getStorageObject();
                        expect(window.sessionStorage.setItem === storageObject.setItem).toBe(true);
                    }
                });
            });
        });
    } else {
        describe("instantiation", function() {
            it("should throw an error", function() {
                expect(function() {
                    new Ext.data.proxy.SessionStorage({id: 1});
                }).toRaiseExtError("Local Storage is not supported in this browser, please use another type of data proxy");
            });
        });        
    }
});
