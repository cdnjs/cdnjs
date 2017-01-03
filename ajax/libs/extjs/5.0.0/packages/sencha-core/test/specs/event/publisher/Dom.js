xdescribe("Ext.event.publisher.Dom", function(){
    var DomPublisher = Ext.event.publisher.Dom,
        publisher, dispatcher;

    describe("members", function(){
        beforeEach(function() {
            publisher = new DomPublisher();
        });

        describe("hasSubscriber()", function(){
            it("should return false by default", function(){
                publisher.hasSubscriber('#test', 'keydown');
                expect(publisher.hasSubscriber('#test', 'keydown')).toBe(false);
            });
        });

        describe("getSubscribersCount()", function(){
            it("should return 0 by default", function(){
                expect(publisher.getSubscribersCount('click')).toBe(0);
            });
        });

        describe("subscribe()", function(){
            it("should return false for unknown event", function(){
                expect(publisher.subscribe('#test', 'unknown')).toBe(false);
            });

            it("should NOT return false for a known DOM event", function(){
                expect(publisher.subscribe('#test', 'keydown')).not.toBe(false);
            });

            it("should set the subscriber's flag to true for id", function(){
                publisher.subscribe('#test', 'keydown');

                expect(publisher.hasSubscriber('#test', 'keydown')).toBe(true);
            });

            it("should set the subscriber's flag to true for className", function(){
                publisher.subscribe('.test', 'keydown');

                expect(publisher.hasSubscriber('.test', 'keydown')).toBe(true);
            });

            describe("setting the subscriber's flag to true for selector", function() {
                it("should handle child selectors", function(){
                    publisher.subscribe('div > ul > li', 'keydown');

                    expect(publisher.hasSubscriber('div > ul > li', 'keydown')).toBe(true);
                });

                it("should handle id with child selectors", function(){
                    publisher.subscribe('#test > ul > li', 'keydown');

                    expect(publisher.subscribers.keydown.selector.length).toBe(1);
                });

                it("should handle pseudo selectors", function(){
                    publisher.subscribe('.test:nth-child(1)', 'keydown');

                    expect(publisher.subscribers.keydown.selector.length).toBe(1);
                });
            });

            it("should increment subscribers count", function(){
                publisher.subscribe('.foo', 'keydown');

                expect(publisher.getSubscribersCount('keydown')).toBe(1);
            });

            it("should NOT increment subscribers count if subscriber already exists", function(){
                publisher.subscribe('.foo', 'keydown');
                publisher.subscribe('.foo', 'keydown');
                publisher.subscribe('#foo', 'keydown');
                publisher.subscribe('#foo', 'keydown');
                publisher.subscribe('form > input', 'keyup');
                publisher.subscribe('form > input', 'keyup');

                expect(publisher.getSubscribersCount('keydown')).toBe(2);
                expect(publisher.getSubscribersCount('keyup')).toBe(1);
            });
        });

        describe("unsubcribe()", function(){
            it("should return false for unknown event", function(){
                expect(publisher.unsubscribe('#test', 'unknown')).toBe(false);
            });

            it("should NOT return false for a known DOM event", function(){
                expect(publisher.unsubscribe('#test', 'keydown')).not.toBe(false);
            });

            it("should remove the subscriber's flag for id", function(){
                publisher.subscribe('#test', 'keydown');
                expect(publisher.hasSubscriber('#test', 'keydown')).toBe(true);

                publisher.unsubscribe('#test', 'keydown');
                expect(publisher.hasSubscriber('#test', 'keydown')).toBe(false);
            });

            it("should remove the subscriber's flag for className", function(){
                publisher.subscribe('.test', 'keydown');
                expect(publisher.hasSubscriber('.test', 'keydown')).toBe(true);

                publisher.unsubscribe('.test', 'keydown');
                expect(publisher.hasSubscriber('.test', 'keydown')).toBe(false);
            });

            it("should remove the subscriber's flag for selector", function(){
                publisher.subscribe('div > span', 'keydown');
                expect(publisher.hasSubscriber('div > span', 'keydown')).toBe(true);

                publisher.unsubscribe('div > span', 'keydown');
                expect(publisher.hasSubscriber('div > span', 'keydown')).toBe(false);
            });

            it("should decrement subscribers count", function(){
                publisher.subscribe('.foo', 'keydown');
                expect(publisher.getSubscribersCount('keydown')).toBe(1);

                publisher.unsubscribe('.foo', 'keydown');
                expect(publisher.getSubscribersCount('keydown')).toBe(0);
            });

            it("should NOT decrement subscribers count if subscriber no longer exists", function(){
                publisher.subscribe('form > input', 'keyup');

                expect(publisher.getSubscribersCount('keyup')).toBe(1);
                publisher.unsubscribe('form > input', 'keyup');
                publisher.unsubscribe('form > input', 'keyup');

                expect(publisher.getSubscribersCount('keyup')).toBe(0);
            });
        });

        describe("onEvent()", function() {
            var dispatcher,
            rootNode = document.createElement('div');
            rootNode.innerHTML =
                '<div class="test foo     bar test   bar">' +
                    '<span id="span1" class="test">' +
                        '<button id="button1">Button 1</button>' +
                        '<button id="button2">Button 2</button>' +
                        '<input id="input1" name="input1" class="input" />' +
                    '</span>' +
                    '<span id="span2" class="test">' +
                        '<button id="button3">Button 3</button>' +
                        '<button id="button4" class="foo   foo">Button 4</button>' +
                    '</span>' +
                '</div>';

            beforeEach(function() {
                dispatcher = {
                    doDispatchEvent: function(){}
                };
                publisher.setDispatcher(dispatcher);

                spyOn(dispatcher, 'doDispatchEvent');
                spyOn(publisher, 'matchesSelector');
            });

            describe("id", function() {
                it("should NOT invoke dispatcher's doDispatchEvent() at all if no subscriber matches the event's target", function(){
                    publisher.subscribe('#button1', 'click');

                    publisher.onEvent({
                        type: 'click',
                        target: rootNode.getElementsByTagName('button')[1] // #button2
                    });

                    expect(dispatcher.doDispatchEvent).not.toHaveBeenCalled();
                });

                it("should invoke dispatcher's doDispatchEvent() with target #button1", function(){
                    var event = {
                        type: 'keydown',
                        target: rootNode.getElementsByTagName('button')[0].childNodes[0] // Button1's TextNode
                    };

                    publisher.subscribe('#button1', 'keydown');

                    publisher.onEvent(event);

                    expect(dispatcher.doDispatchEvent.callCount).toBe(1);

                    var args = dispatcher.doDispatchEvent.mostRecentCall.args;
                    expect(args[0]).toBe('element');
                    expect(args[1]).toBe('#button1');
                    expect(args[2]).toBe('keydown');
                    expect(args[3][0] instanceof Ext.event.Event).toBe(true);
                    expect(args[3][0].browserEvent).toBe(event);
                });

//                it("should invoke dispatcher's doDispatchEvent() with target #button1 and #span1", function(){
//                    var event = {
//                        type: 'keydown',
//                        target: rootNode.getElementsByTagName('button')[0].childNodes[0] // Button1's TextNode
//                    };
//
//                    publisher.subscribe('#button1', 'keydown');
//                    publisher.subscribe('#span1', 'keydown');
//                    publisher.subscribe('#span2', 'keydown');
//
//                    publisher.onEvent(event);
//
//                    expect(dispatcher.doDispatchEvent.callCount).toBe(2);
//                });

                it("should NOT bubble with id and 'focus' event", function(){
                    var event = {
                        type: 'focus',
                        target: rootNode.getElementsByTagName('input')[0] // #input1
                    };

                    publisher.subscribe('#input1', 'focus');
                    publisher.subscribe('#span1', 'focus');

                    publisher.onEvent(event);

                    expect(dispatcher.doDispatchEvent.callCount).toBe(1);
                });

            });

            describe("className", function(){
                it("should NOT invoke dispatcher's doDispatchEvent() at all if no subscriber matches the event's target", function(){
                    publisher.subscribe('.unknown', 'click');

                    publisher.onEvent({
                        type: 'keydown',
                        target: rootNode.getElementsByTagName('button')[1] // #button2
                    });

                    expect(dispatcher.doDispatchEvent).not.toHaveBeenCalled();
                });

//                it("should invoke dispatcher's doDispatchEvent() with target .test ONCE", function(){
//                    var event = {
//                        type: 'keypress',
//                        target: rootNode.getElementsByTagName('button')[0].childNodes[0] // Button1's TextNode
//                    };
//
//                    publisher.subscribe('.test', 'keypress');
//
//                    publisher.onEvent(event);
//
//                    expect(dispatcher.doDispatchEvent.callCount).toBe(1);
//
//                    var args = dispatcher.doDispatchEvent.mostRecentCall.args;
//                    expect(args[0]).toBe('element');
//                    expect(args[1]).toBe('.test');
//                    expect(args[2]).toBe('keypress');
//                    expect(args[3][0] instanceof Ext.event.Event).toBe(true);
//                    expect(args[3][0].browserEvent).toBe(event);
//                });

                it("should invoke dispatcher's doDispatchEvent() with for multiple UNIQUE class names", function(){
                    var event = {
                        type: 'keydown',
                        target: rootNode.getElementsByTagName('button')[3].childNodes[0] // Button4's TextNode
                    };

                    publisher.subscribe('.test', 'keydown');
                    publisher.subscribe('.foo', 'keydown');
                    publisher.subscribe('.bar', 'keydown');

                    publisher.onEvent(event);

//                    expect(dispatcher.doDispatchEvent.callCount).toBe(3);

                    var calls = dispatcher.doDispatchEvent.calls,
                        args;

                    args = calls[0].args;
                    expect(args[0]).toBe('element');
                    expect(args[1]).toBe('.foo');
                    expect(args[2]).toBe('keydown');
                    expect(args[3][0] instanceof Ext.event.Event).toBe(true);
                    expect(args[3][0].browserEvent).toBe(event);

//                    args = calls[1].args;
//                    expect(args[0]).toBe('element');
//                    expect(args[1]).toBe('.test');
//                    expect(args[2]).toBe('keydown');
//                    expect(args[3][0] instanceof Ext.event.Event).toBe(true);
//                    expect(args[3][0].browserEvent).toBe(event);
//
//                    args = calls[2].args;
//                    expect(args[0]).toBe('element');
//                    expect(args[1]).toBe('.bar');
//                    expect(args[2]).toBe('keydown');
//                    expect(args[3][0] instanceof Ext.event.Event).toBe(true);
//                    expect(args[3][0].browserEvent).toBe(event);
                });

                it("should NOT bubble with className and 'keydown' event", function(){
                    var event = {
                        type: 'keydown',
                        target: rootNode.getElementsByTagName('input')[0] // #input1
                    };

                    publisher.subscribe('.input', 'keydown');
                    publisher.subscribe('.test', 'keydown');

                    publisher.onEvent(event);

                    expect(dispatcher.doDispatchEvent.callCount).toBe(1);

                    var args = dispatcher.doDispatchEvent.mostRecentCall.args;
                    expect(args[0]).toBe('element');
                    expect(args[1]).toBe('.input');
                    expect(args[2]).toBe('keydown');
                    expect(args[3][0] instanceof Ext.event.Event).toBe(true);
                    expect(args[3][0].browserEvent).toBe(event);
                });

            });
//
//            describe("selector", function(){
//                it("should invoke matchesSelector() as it travels up", function(){
//                    var event = {
//                        type: 'keypress',
//                        target: rootNode.getElementsByTagName('button')[0].childNodes[0] // Button1's TextNode
//                    };
//
//                    publisher.subscribe('div', 'keypress');
//                    publisher.subscribe('div > span', 'keypress');
//
//                    publisher.onEvent(event);
//
//                    expect(publisher.matchesSelector.callCount).toBe(8);
//                });
//            });
        });
    });
});
