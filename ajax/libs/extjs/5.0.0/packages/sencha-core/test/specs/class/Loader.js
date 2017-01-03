// These specs have been disabled temporarily because Ext.app.getNamespace()/clearNamespaces()
// are not available in sencha-core.
xdescribe("Ext.Loader", function() {
    var Loader = Ext.Loader,
        app    = Ext.app;

    it("should set single namespace with setPath call", function() {
        Loader.setPath('ExtLoaderTestNamespace1', '/foo1');

        expect(ExtLoaderTestNamespace1.foo.Bar).not.toBeUndefined();

        expect(ns).toBe('ExtLoaderTestNamespace1');
    });

    it("should set multiple namespaces with setPath call", function() {
        Loader.setPath({
            ExtLoaderTestNamespace2: '/foo2',
            ExtLoaderTestNamespace3: '/foo3'
        });

        var ns2 = app.getNamespace('ExtLoaderTestNamespace2.foo.Bar'),
            ns3 = app.getNamespace('ExtLoaderTestNamespace3.foo.Bar');

        expect(ns2).toBe('ExtLoaderTestNamespace2');
        // AND
        expect(ns3).toBe('ExtLoaderTestNamespace3');
    });

    it("should set namespaces with setConfig object", function() {
        Loader.setConfig({
            paths: {
                ExtLoaderTestNamespace4: '/foo4'
            }
        });

        var ns = app.getNamespace('ExtLoaderTestNamespace4.foo.Bar');

        expect(ns).toBe('ExtLoaderTestNamespace4');
    });

    it("should set namespaces with setConfig name/value pair", function() {
        Loader.setConfig('paths', {
            ExtLoaderTestNamespace5: '/foo5'
        });

        var ns = app.getNamespace('ExtLoaderTestNamespace5.foo.Bar');

        expect(ns).toBe('ExtLoaderTestNamespace5');
    });

    it("should allow nested namespaces 1", function() {
        Loader.setPath({
            'ExtLoaderTestNamespace1.foo': '/foobar1'
        });

        var ns = app.getNamespace('ExtLoaderTestNamespace1.foo.Bar');

        expect(ns).toBe('ExtLoaderTestNamespace1.foo');
    });

    it("should allow nested namespaces 2", function() {
        Loader.setPath({
            'ExtLoaderTestNamespace1.foo.Bar': '/foobaroo1'
        });

        var ns = app.getNamespace('ExtLoaderTestNamespace1.foo.Bar.Baz');

        expect(ns).toBe('ExtLoaderTestNamespace1.foo.Bar');
    });

    it("should clean up namespaces (not a test)", function() {
        var paths = Loader.config.paths;

        delete paths.ExtLoaderTestNamespace1;
        delete paths.ExtLoaderTestNamespace2;
        delete paths.ExtLoaderTestNamespace3;
        delete paths.ExtLoaderTestNamespace4;
        delete paths.ExtLoaderTestNamespace5;

        app.clearNamespaces();
    });

    describe('duplicate namespaces', function () {
        // This may seem like a contrived example, but it was adapted from a customer's actual application.
        // Their requirement was to have their own namespace (not Ext), and their base constructor had Ext as
        // its prototype, e.g.:
        //      F.prototype === Ext;
        //      Foo = new F();
        //      Foo.__proto__ === Ext; // true
        //      Foo.ux === Ext.ux; // true
        //      Foo.hasOwnProperty('ux'); // false
        //
        // In certain scenarios that I haven't been able to reproduce outside of their actual application,
        // onReady was never being called because the Loader's numPendingFiles counter was never decremented
        // to zero.  Regardless, the fix for this is tested here, which is that the same class should never
        // be loaded twice. The fix simply checks if the filePath to the class to be fetched is cached in
        // Loader.isFileLoaded, and if it is the script is never downloaded, thus never incrementing the
        // counter. See EXTJSIV-11711.

        var callFoo = false,
            callExt = false;

        beforeEach(function () {
            var F = function () {};

            F.prototype = Ext;
            // Note Foo needs to be a global variable b/c it's looked up in
            // Loader.onFileLoaded() -> Loader.refreshQueue() -> ClassManager.isCreated().
            Foo = new F();

            Loader.setPath('Foo.spec', 'resources/spec');
            Loader.setPath('Ext.spec', 'resources/spec');

            spyOn(Loader, 'loadScriptFile').andCallThrough();

            Ext.require('Foo.spec.LoaderTest', function () {
                callFoo = true;
            });

            Ext.require('Ext.spec.LoaderTest', function () {
                callExt = true;
            });

            waits(20);
        });

        afterEach(function () {
            callFoo = callExt = false;
            Foo = null;
        });

        it('should not load the same file twice', function () {
            expect(Loader.loadScriptFile.callCount).toBe(1);
        });

        it("should still call each require's callback regardless of duplication", function () {
            expect(callFoo).toBe(true);
            expect(callExt).toBe(true);
        });

        it('should not have a non-zero file counter', function () {
            expect(Loader.numPendingFiles).toBe(0);
        });
    });

    describe('creating the loadScript src', function () {
        // In case a user loads a script that already has a querystring, don't blindly append the _dc param by simple
        // string concatenation, i.e., 'url + '?_dc'.  This will lead to querystrings that look like:
        //
        //      script.js?key=value?_dc=1389767728936 
        //
        // The test just does a simple indexOf check to make sure that the _dc param has been appended with an ampersand.
        // See EXTJSIV-11994.
        it('should append the cache-busting query param to the querystring in case there is already a querystring', function () {
            var newSrc; 

            Ext.Loader.injectScriptElement = function (src, onScriptLoad, onScriptError) {
                newSrc = src;
            };

            Ext.Loader.loadScript({
                url: 'script.js?key=value'
            });

            expect(newSrc.indexOf('?key=value&') > -1).toBe(true);
        });
    });
});
