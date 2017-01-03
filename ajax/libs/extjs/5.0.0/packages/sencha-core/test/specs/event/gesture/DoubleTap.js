// describe("Ext.event.gesture.DoubleTap", function () {});
// The above appeases Cmd's parser to associate spec run results with files.

// Double Tap doesn't currently work in IE8 because 2 clicks in rapid succession will
// fire a single mousedown, and 2 mouseups.
// These specs also fail in FF, although double tap seems to work fine when triggered manually
((Ext.isIE8 || Ext.isFirefox) ? xdescribe : describe)("Ext.event.gesture.DoubleTap", function() {
    var helper = Ext.testHelper,
        recognizer = Ext.event.Dispatcher.getInstance().getPublisher('gesture').getRecognizers().doubleTap,
        moveDistance = recognizer.getMoveDistance(),
        tapDistance = recognizer.getTapDistance(),
        maxDuration = 60,
        originalMaxDuration, targetEl, singleTapHandler, doubleTapHandler, e;

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
        originalMaxDuration = recognizer.getMaxDuration();
        recognizer.setMaxDuration(maxDuration);
        targetEl = Ext.getBody().createChild({});
        singleTapHandler = jasmine.createSpy();
        doubleTapHandler = jasmine.createSpy();

        singleTapHandler.andCallFake(function(event) {
            e = event;
        });

        doubleTapHandler.andCallFake(function(event) {
            e = event;
        });

        targetEl.on('doubletap', doubleTapHandler);
        targetEl.on('singletap', singleTapHandler);
    });

    afterEach(function() {
        recognizer.setMaxDuration(originalMaxDuration);
        targetEl.destroy();
    });

    it("should fire doubletap and not singletap when a second tap occurs within maxDuration", function() {
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            end({ id: 1, x: 10, y: 10 });
        });
        waits(maxDuration - 30);
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            end({ id: 1, x: 10, y: 10 });
        });
        waitsForAnimation();
        runs(function() {
            expect(doubleTapHandler).toHaveBeenCalled();
            expect(singleTapHandler).not.toHaveBeenCalled();
            expect(e.type).toBe('doubletap');
        });
    });

    it("should fire singletap and not doubletap when a second tap does not occur within maxDuration", function() {
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            end({ id: 1, x: 10, y: 10 });
        });
        waits(maxDuration + 30);
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            end({ id: 1, x: 10, y: 10 });
        });
        waitsForAnimation();
        runs(function() {
            expect(doubleTapHandler).not.toHaveBeenCalled();
            expect(singleTapHandler).toHaveBeenCalled();
            expect(e.type).toBe('singletap');
        });
    });

    it("should not fire singletap if movement of the first pointer exceeds moveDistance", function() {
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            move({ id: 1, x: 10, y: 10 + moveDistance });
            end({ id: 1, x: 10, y: 10 + moveDistance });
        });
        waits(maxDuration + 30);
        runs(function() {
            expect(singleTapHandler).not.toHaveBeenCalled();
        });
    });

    it("should not fire doubletap if movement of the first pointer exceeds moveDistance", function() {
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            move({ id: 1, x: 10, y: 10 + moveDistance });
            end({ id: 1, x: 10, y: 10 + moveDistance });
        });
        waits(maxDuration - 30);
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            end({ id: 1, x: 10, y: 10 });
        });
        waitsForAnimation();
        runs(function() {
            expect(doubleTapHandler).not.toHaveBeenCalled();
        });
        waits(maxDuration + 30);
        runs(function() {
            // The second tap should actually trigger the single tap event
            expect(singleTapHandler).toHaveBeenCalled();
        })
    });

    it("should fire singletap if movement of the first pointer is within moveDistance", function() {
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            move({ id: 1, x: 10, y: 9 + moveDistance });
            end({ id: 1, x: 10, y: 9 + moveDistance });
        });
        waits(maxDuration + 30);
        runs(function() {
            expect(singleTapHandler).toHaveBeenCalled();
        });
    });

    it("should fire doubletap if movement of the first pointer is within moveDistance", function() {
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            move({ id: 1, x: 9 + moveDistance, y: 10 });
            end({ id: 1, x: 9 + moveDistance, y: 10 });
        });
        waits(maxDuration - 30);
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            end({ id: 1, x: 11, y: 11 });
        });
        waitsForAnimation();
        runs(function() {
            expect(doubleTapHandler).toHaveBeenCalled();
        });
    });

    it("should fire double tap if the second tap is within tapDistance from the first tap", function() {
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            end({ id: 1, x: 10, y: 10 });
        });
        waits(maxDuration - 30);
        runs(function() {
            start({ id: 1, x: 10 + tapDistance, y: 10 });
            end({ id: 1, x: 10 + tapDistance, y: 10 });
        });
        waitsForAnimation();
        runs(function() {
            expect(doubleTapHandler).toHaveBeenCalled();
        });
    });

    it("should not fire double tap if the second tap exceeds tapDistance from the first tap", function() {
        runs(function() {
            start({ id: 1, x: 10, y: 10 });
            end({ id: 1, x: 10, y: 10 });
        });
        waits(maxDuration - 30);
        runs(function() {
            start({ id: 1, x: 11 + tapDistance, y: 10 });
            end({ id: 1, x: 11 + tapDistance, y: 10 });
        });
        waitsForAnimation();
        runs(function() {
            expect(doubleTapHandler).not.toHaveBeenCalled();
        });
    });

    if (Ext.supports.Touch) {
        it("should not fire single tap if the first touch is canceled", function() {
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                cancel({ id: 1, x: 10, y: 10 });
            });
            waits(maxDuration + 30);
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                end({ id: 1, x: 10, y: 10 });
            });
            waitsForAnimation();
            runs(function() {
                expect(singleTapHandler).not.toHaveBeenCalled();
            });
        });

        it("should not fire double tap if the first touch is canceled", function() {
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                cancel({ id: 1, x: 10, y: 10 });
            });
            waits(maxDuration - 30);
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                end({ id: 1, x: 10, y: 10 });
            });
            waitsForAnimation();
            runs(function() {
                expect(doubleTapHandler).not.toHaveBeenCalled();
            });
        });

        it("should not fire double tap if the second touch is canceled", function() {
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                end({ id: 1, x: 10, y: 10 });
            });
            waits(maxDuration - 30);
            runs(function() {
                start({ id: 1, x: 10, y: 10 });
                cancel({ id: 1, x: 10, y: 10 });
            });
            waitsForAnimation();
            runs(function() {
                expect(doubleTapHandler).not.toHaveBeenCalled();
            });
        });
    }
});
