describe("Ext.event.gesture.SingleTouch", function() {

    var SingleTouchClass = Ext.event.gesture.SingleTouch,
        recognizer;

    describe("constructor()", function() {

    });

    describe("members", function() {
        beforeEach(function() {
            recognizer = new SingleTouchClass();
        });

        describe("onTouchStart()", function() {
            it("should invoke fail() with reason NOT_SINGLE_TOUCH if the number of touches is not 1", function() {
                spyOn(recognizer, 'fail');

                var event = Ext.testHelper.createTouchEvent({
                    touches: [{}, {}]
                });

                recognizer.onTouchStart(event);

                expect(recognizer.fail).toHaveBeenCalledWith(SingleTouchClass.NOT_SINGLE_TOUCH);
            });
        });
    });

});
