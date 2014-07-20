describe("Ext.event.gesture.Tap", function() {
    var TapClass = Ext.event.gesture.Tap,
        recognizer;

    describe("constructor()", function() {

    });

    describe("members", function() {
        beforeEach(function() {
            recognizer = new TapClass();
        });

        describe("onTouchStart()", function() {
            it("should invoke fail() with reason NOT_SINGLE_TOUCH if the number of touches is not 1", function() {
                spyOn(recognizer, 'fail');

                var event = Ext.testHelper.createTouchEvent({
                    changedTouches: [{x: 0, y: 0}],
                    touches: [{}, {}]
                });

                recognizer.onTouchStart(event);

                expect(recognizer.fail).toHaveBeenCalledWith(TapClass.NOT_SINGLE_TOUCH);
            });
        });

        describe("onTouchMove()", function() {
            it("should not invoke fail() if the distance if less than 'moveDistance' config", function() {
                spyOn(recognizer, 'fail');

                recognizer.setMoveDistance(10);
                recognizer.onTouchStart(Ext.testHelper.createTouchEvent({
                    changedTouches: [{ pageX: 0, pageY: 0 }]
                }));

                recognizer.onTouchMove(Ext.testHelper.createTouchEvent({
                    changedTouches: [{ pageX: 0, pageY: 9 }]
                }));

                expect(recognizer.fail).not.toHaveBeenCalled();
            });

            it("should invoke fail() with reason TOUCH_MOVED if the distance if greater than or equal to 'moveDistance' config", function() {
                spyOn(recognizer, 'fail');

                recognizer.setMoveDistance(10);
                recognizer.onTouchStart(Ext.testHelper.createTouchEvent({
                    changedTouches: [{ pageX: 0, pageY: 0 }]
                }));
                recognizer.onTouchMove(Ext.testHelper.createTouchEvent({
                    changedTouches: [{ pageX: 0, pageY: 10 }]
                }));
                expect(recognizer.fail).toHaveBeenCalledWith(TapClass.TOUCH_MOVED);
            });
        });

        describe("onTouchEnd()", function() {
            it("should invoke fire() with 4 arguments: 'tap', the event object, touch list, keyed object with touch list", function() {
                spyOn(recognizer, 'fire');

                var event = Ext.testHelper.createTouchEvent();

                recognizer.onTouchEnd(event);

                expect(recognizer.fire).toHaveBeenCalledWith('tap', event, {touch: undefined });
            });
        });
    });

    describe("scenarios", function() {
        beforeEach(function() {
            recognizer = new TapClass();

            spyOn(recognizer, 'fail').andCallThrough();
        });

        it("should FAIL if there are more than 1 touches in touchstart initially", function() {
            Ext.testHelper.recognize(recognizer, [
                { type: 'touchstart', touches: [{}, {}], changedTouches: [{}, {}] },
                { type: 'touchmove', touches: [{}, {}], changedTouches: [{}, {}] },
                { type: 'touchend', changedTouches: [{}, {}] }
            ]);

            expect(recognizer.fail).toHaveBeenCalledWith(TapClass.NOT_SINGLE_TOUCH);
        });

        it("should FAIL if there is another touchstart after the first one", function() {
            Ext.testHelper.recognize(recognizer, [
                { type: 'touchstart', touches: [{}], changedTouches: [{}] },
                { type: 'touchstart', touches: [{}, {}], changedTouches: [{}] },
                { type: 'touchmove', touches: [{}, {}], changedTouches: [{}, {}] },
                { type: 'touchend', changedTouches: [{}, {}] }
            ]);

            expect(recognizer.fail).toHaveBeenCalledWith(TapClass.NOT_SINGLE_TOUCH);
        });

        xit("should FAIL if there is any touchmove before touchend over the touch threshhold", function() {
            Ext.testHelper.recognize(recognizer, [
                { type: 'touchstart', touches: [{}], changedTouches: [{}] },
                { type: 'touchmove', touches: [{}], changedTouches: [{x: 20, y: 20}] },
                { type: 'touchend', changedTouches: [{}] }
            ]);

            expect(recognizer.fail).toHaveBeenCalledWith(TapClass.TOUCH_MOVED);
        });

        it("should PASS if there is one and only one touchstart, no touchmove, and then touchend", function() {
            spyOn(recognizer, 'fire');

            Ext.testHelper.recognize(recognizer, [
                { type: 'touchstart', touches: [{}], changedTouches: [{}] },
                { type: 'touchend', changedTouches: [{}] }
            ]);

            expect(recognizer.fire).toHaveBeenCalled();
            expect(recognizer.fire.mostRecentCall.args[0]).toBe('tap');
        });
    });

    describe("functional specs", function() {
        var helper = Ext.testHelper,
            tapRecognizer = Ext.event.Dispatcher.getInstance().getPublisher('gesture').getRecognizers().tap,
            moveDistance = tapRecognizer.getMoveDistance(),
            targetEl, tapHandler, tapCancelHandler, e;

        function start(cfg) {
            helper.touchStart(targetEl, cfg);
        }

        function move(cfg) {
            helper.touchMove(targetEl, cfg);
        }

        function end(cfg) {
            helper.touchEnd(targetEl, cfg);
        }

        function cancel(cfg) {
            helper.touchCancel(targetEl, cfg);
        }

        beforeEach(function() {
            targetEl = Ext.getBody().createChild();
            tapHandler = jasmine.createSpy();
            tapCancelHandler = jasmine.createSpy();

            tapHandler.andCallFake(function(event) {
                e = event;
            });

            tapCancelHandler.andCallFake(function(event) {
                e = event;
            });

            targetEl.on('tap', tapHandler);
            targetEl.on('tapcancel', tapCancelHandler);
        });

        afterEach(function() {
            targetEl.destroy();
        });

        it("should fire tap when there is no movement", function() {
            waits(100);
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                end({ id: 1, x: 10, y: 10 });
            });
            waitsForAnimation();
            runs(function() {
                expect(tapHandler).toHaveBeenCalled();
                expect(e.type).toBe('tap');
                expect(e.getX()).toBe(10);
                expect(e.getY()).toBe(10);
            });
        });

        it("should fire tap if movement is within moveDistance", function() {
            waits(100);
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                move({ id: 1, x: 9 + moveDistance, y: 10 });
                end({ id: 1, x: 9 + moveDistance, y: 10 });
            });
            waitsForAnimation();
            runs(function() {
                expect(tapHandler).toHaveBeenCalled();
                expect(e.type).toBe('tap');
                expect(e.getX()).toBe(9 + moveDistance);
                expect(e.getY()).toBe(10);
            });
        });

        it("should not fire tap, and should fire tapcancel if movement is greater than or equal to moveDistance", function() {
            waits(100);
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                move({ id: 1, x: 10, y: 10 + moveDistance });
                end({ id: 1, x: 10, y: 10 + moveDistance });
            });
            waitsForAnimation();
            runs(function() {
                expect(tapHandler).not.toHaveBeenCalled();
                expect(tapCancelHandler).toHaveBeenCalled();
                expect(e.type).toBe('tapcancel');
            });
        });

        if (Ext.supports.Touch) {
            it("should not fire tap if a second touch is initiated", function() {
                runs(function() {
                    start({ id: 1, x: 10, y: 10 });
                    start({ id: 2, x: 30, y: 30 });
                    end({ id: 1, x: 10, y: 10 });
                });
                waitsForAnimation();
                runs(function() {
                    end({ id: 2, x: 30, y: 30 });
                });
                waitsForAnimation();
                runs(function() {
                    expect(tapHandler).not.toHaveBeenCalled();
                });
            });

            it("should not fire tap and should fire tapcancel if a cancel event is received", function() {
                runs(function() {
                    start({ id: 1, x: 10, y: 10 });
                });
                waitsForAnimation();
                runs(function() {
                    cancel({ id: 1, x: 10, y: 10 });
                });
                waitsForAnimation();
                runs(function() {
                    expect(tapHandler).not.toHaveBeenCalled();
                    expect(tapCancelHandler).toHaveBeenCalled();
                    expect(e.type).toBe('tapcancel');
                });
            });
        }

        it("should not fire tap and should fire tapcancel if movement exceeds moveDistance, but the pointer is moved back within the moveDistance before touchend", function() {
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                move({ id: 1, x: 10, y: 11 + moveDistance });
            });
            waitsForAnimation();
            runs(function() {
                move({ id: 1, x: 10, y: 10 });
                end({ id: 1, x: 10, y: 10 });
            });
            waitsForAnimation();
            runs(function() {
                expect(tapHandler).not.toHaveBeenCalled();
                expect(tapCancelHandler).toHaveBeenCalled();
                expect(e.type).toBe('tapcancel');
            });
        });
    });
});
