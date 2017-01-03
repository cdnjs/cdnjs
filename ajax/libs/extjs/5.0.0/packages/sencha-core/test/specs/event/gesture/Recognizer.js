describe("Ext.event.gesture.Recognizer", function() {
    var RecognizerClass = Ext.event.gesture.Recognizer,
        recognizer;

    it("should have Ext.mixin.Identifiable mixed in", function() {
        expect(RecognizerClass.prototype.mixins.identifiable).toBeDefined();
    });

    describe("constructor()", function() {
        it("should invoke initConfig() and pass the supplied config argument", function() {
            var config = {};

            spyOn(RecognizerClass.prototype, 'initConfig');

            new RecognizerClass(config);

            expect(RecognizerClass.prototype.initConfig).toHaveBeenCalledWith(config);
        });
    });

    describe("members", function() {
        beforeEach(function() {
            recognizer = new RecognizerClass;
        });

        describe("fire()", function() {
            it("should invoke 'onRecognized' callback, with scope 'callbackScope'", function() {
                var onRecognized = jasmine.createSpy(),
                    scope = {};

                recognizer.setOnRecognized(onRecognized);
                recognizer.setCallbackScope(scope);

                recognizer.fire('foo', 'bar');

                expect(onRecognized).toHaveBeenCalledWith('foo', 'bar');
                expect(onRecognized.mostRecentCall.object).toBe(scope);
            });
        });
    });

});
