describe("Ext.event.gesture.Swipe", function() {
    var SwipeClass = Ext.event.gesture.Swipe,
        recognizer;

    describe("constructor()", function() {

    });

    describe("members", function() {
        beforeEach(function() {

        });
    });

    describe("scenarios", function() {
        beforeEach(function() {
            recognizer = new SwipeClass();

            spyOn(recognizer, 'fail').andCallThrough();
        });

        it("should FAIL if there are more than 1 touches in touchstart initially", function() {
            Ext.testHelper.recognize(recognizer, [
                { type: 'touchstart', touches: [{}, {}], changedTouches: [{}, {}] },
                { type: 'touchmove', touches: [{}, {}], changedTouches: [{}, {}] },
                { type: 'touchend', changedTouches: [{}, {}] }
            ]);

            expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.NOT_SINGLE_TOUCH);
        });

        it("should FAIL if there is another touchstart after the first one", function() {
            Ext.testHelper.recognize(recognizer, [
                { type: 'touchstart', touches: [{}], changedTouches: [{}] },
                { type: 'touchstart', touches: [{}, {}], changedTouches: [{}] },
                { type: 'touchmove', touches: [{}, {}], changedTouches: [{}, {}] },
                { type: 'touchend', changedTouches: [{}, {}] }
            ]);

            expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.NOT_SINGLE_TOUCH);
        });

        describe("with config: minDistance=80, maxOffset=35, maxDuration=1000 and touchstart pageX=0, pageY=0", function() {
            var touchstart;

            beforeEach(function() {
                touchstart = {
                    type: 'touchstart',
                    pageX: 0,
                    pageY: 0,
                    time: 0,
                    touches: [
                        { pageX: 0, pageY: 0, time: 0 }
                    ],
                    changedTouches: [
                        { pageX: 0, pageY: 0, time: 0}
                    ]
                };

                 var minDistance = 80,
                     maxOffset = 35,
                     maxDuration = 1000;

                recognizer = new SwipeClass({
                    minDistance: minDistance,
                    maxOffset: maxOffset,
                    maxDuration: maxDuration
                });

                spyOn(recognizer, 'fail').andCallThrough();
            });

            describe("FAIL", function() {
                it("should FAIL if there is a touchmove with pageX equals 36 and pageY equals -40", function() {
                    Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        { type: 'touchmove', time: 0, touches: [{ pageX: 36, pageY: -40 }], changedTouches: [{ pageX: 36, pageY: -40 }] },
                        { type: 'touchend', changedTouches: [{}] }
                    ]);

                    expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.MAX_OFFSET_EXCEEDED);
                });

                it("should FAIL if there is a touchmove with pageX equals 36 and another touchmove with pageY equals -40", function() {
                    Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        { type: 'touchmove', time: 0, touches: [{ pageX: 0, pageY: -40 }], changedTouches: [{ pageX: 0, pageY: -40 }] },
                        { type: 'touchmove', time: 0, touches: [{ pageX: 36, pageY: 0 }], changedTouches: [{ pageX: 36, pageY: 0 }] },
                        { type: 'touchend', time: 0, changedTouches: [{}] }
                    ]);

                    expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.MAX_OFFSET_EXCEEDED);
                });

                it("should FAIL if touchend's pageX equals 36 and equals -40", function() {
                    Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        { type: 'touchmove', time: 0, touches: [{ pageX: 10, pageY: -10 }], changedTouches: [{ pageX: 10, pageY: -10 }] },
                        { type: 'touchend', time: 0, changedTouches: [{ pageX: 36, pageY: -40 }] }
                    ]);

                    expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.MAX_OFFSET_EXCEEDED);
                });

                it("should FAIL if there is a touchmove more than 1 second later from the touchstart", function() {
                    Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        { type: 'touchmove', time: 1001, touches: [{}], changedTouches: [{}] },
                        { type: 'touchend', changedTouches: [{}] }
                    ]);

                    expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.MAX_DURATION_EXCEEDED);
                });

                it("should FAIL if touchend is more than 1 second later from the touchstart", function() {
                    Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        { type: 'touchend', time: 1001, changedTouches: [{}] }
                    ]);

                    expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.MAX_DURATION_EXCEEDED);
                });

                it("should FAIL if the distance between touchstart and touchend is less than 80 on x-axis", function() {
                    Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        { type: 'touchend', time: 1, changedTouches: [{ pageX: 79, pageY: 1 }] }
                    ]);

                    expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.DISTANCE_NOT_ENOUGH);
                });

                it("should FAIL if the distance between touchstart and touchend is less than 80 on y-axis", function() {
                    Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        { type: 'touchend', time: 1, changedTouches: [{ pageX: 1, pageY: 79 }] }
                    ]);

                    expect(recognizer.fail).toHaveBeenCalledWith(SwipeClass.DISTANCE_NOT_ENOUGH);
                });

            });

            describe("PASS", function() {
                beforeEach(function() {
                    spyOn(recognizer, 'fire').andCallThrough();
                });

                it("should invoke fire() with 'swipe', direction='left', distance=100, duration=500", function() {
                    var touchend = { type: 'touchend', time: 500, changedTouches: [{ pageX: -100, pageY: 0 }] };

                    var events = Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        touchend
                    ]);

                    var touch = events[1].changedTouches[0];

                    expect(recognizer.fire).toHaveBeenCalledWith('swipe', events[1], {
                        touch: touch,
                        direction: 'left',
                        distance: 100,
                        duration: 500
                    });
                });

                it("should invoke fire() with 'swipe', direction='right', distance=100, duration=500", function() {
                    var touchend = { type: 'touchend', time: 500, changedTouches: [{ pageX: 100, pageY: 0 }] };

                    var events = Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        touchend
                    ]);

                    var touch = events[1].changedTouches[0];

                    expect(recognizer.fire).toHaveBeenCalledWith('swipe', events[1], {
                        touch: touch,
                        direction: 'right',
                        distance: 100,
                        duration: 500
                    });
                });

                it("should invoke fire() with 'swipe', direction='up', distance=100, duration=500", function() {
                    var touchend = { type: 'touchend', time: 500, changedTouches: [{ pageX: 0, pageY: -100 }] };

                    var events = Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        touchend
                    ]);

                    var touch = events[1].changedTouches[0];

                    expect(recognizer.fire).toHaveBeenCalledWith('swipe', events[1], {
                        touch: touch,
                        direction: 'up',
                        distance: 100,
                        duration: 500
                    });
                });

                it("should invoke fire() with 'swipe', direction='down', distance=100, duration=500", function() {
                    var touchend = { type: 'touchend', time: 500, changedTouches: [{ pageX: 0, pageY: 100 }] };

                    var events = Ext.testHelper.recognize(recognizer, [
                        touchstart,
                        touchend
                    ]);

                    var touch = events[1].changedTouches[0];

                    expect(recognizer.fire).toHaveBeenCalledWith('swipe', events[1], {
                        touch: touch,
                        direction: 'down',
                        distance: 100,
                        duration: 500
                    });
                });
            });
        });
    });
});
