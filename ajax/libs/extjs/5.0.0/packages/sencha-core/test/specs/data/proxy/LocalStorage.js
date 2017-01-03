describe("Ext.data.proxy.LocalStorage", function() {
    var proxy;

    if (Ext.supports.LocalStorage) {
        beforeEach(function() {
            Ext.ClassManager.enableNamespaceParseCache = false;
            proxy = new Ext.data.proxy.LocalStorage({id: 1});
        });
        
        afterEach(function() {
            Ext.ClassManager.enableNamespaceParseCache = true;
        });
        
        describe("instantiation", function() {
            it("should extend Ext.data.proxy.WebStorage", function() {
                expect(proxy.superclass).toEqual(Ext.data.proxy.WebStorage.prototype);
            });
        });

        describe("methods", function() {
            describe("getStorageObject", function() {
                it("should return localStorage object", function() {
                    // IE8 throw Class doesn't support Automation when comparing localStorage to itself (or sessionStorage)
                    var automationBug = false;
                    try {
                        localStorage === localStorage;
                    } catch(e) {
                        automationBug = true;
                    }
                    if (!automationBug) {
                        expect(proxy.getStorageObject()).toEqual(localStorage);
                    } else { 
                        var storageObject = proxy.getStorageObject();
                        expect(window.localStorage.setItem === storageObject.setItem).toBe(true);
                    }
                });
            });
        });
    } else {
        describe("instantiation", function() {
            it("should throw an error", function() {
                expect(function() {
                    new Ext.data.proxy.LocalStorage({id: 1});
                }).toRaiseExtError("Local Storage is not supported in this browser, please use another type of data proxy");
            });
        });
    }
});
