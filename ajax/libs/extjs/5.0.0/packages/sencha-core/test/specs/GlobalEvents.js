describe("Ext.GlobalEvents", function() {
    describe('idle event', function() {
        var delay = Ext.isIE ? 50 : 10,
            idleFired, done;

        function onIdle() {
            idleFired = true;
        }

        beforeEach(function() {
            idleFired = false;
            done = false;
            Ext.on('idle', onIdle);
        });

        afterEach(function() {
            Ext.un('idle', onIdle);
        });

        it("should fire after DOM event handler are invoked, but before control is returned to the browser", function() {
            var element = Ext.getBody().createChild(),
                handledCount = 0;

            function expectFalse() {
                expect(idleFired).toBe(false);
                handledCount ++;
            }

            // attach a couple click listeners, the idle event should fire after both
            // handlers have fired
            element.on('click', expectFalse);
            element.on('click', function() {
                expectFalse();
            });

            jasmine.fireMouseEvent(element, 'click');

            expect(handledCount).toBe(2);
            expect(idleFired).toBe(true);

            element.destroy();
        });

        it("should fire after a JsonPProxy processes a return packet", function() {
            var store = Ext.create('Ext.data.Store', {
                proxy: {
                    type: 'jsonp',
                    reader: {
                        rootProperty: 'topics',
                        totalProperty: 'totalCount'
                    },
                    url: 'http://www.sencha.com/forum/remote_topics/index.php'
                },
                fields: ['title'],
                listeners: {
                    load: function() {
                        done = true;
                    }
                }
            });
            store.loadPage(1);
            waitsFor(function() {
                return done === true;
            });
            runs(function() {
                waits(delay);
                runs(function() {
                    expect(idleFired).toBe(true);
                    store.destroy();
                });
            });
        });

        it("should fire after a JsonP request is processed", function() {
            Ext.data.JsonP.request({
                url: 'http://www.sencha.com/forum/remote_topics/index.php?page=1&start=0&limit=100',
                callback: function() {
                    done = true;
                }
            });
            waitsFor(function() {
                return done === true;
            });
            runs(function() {
                waits(delay);
                runs(function() {
                    expect(idleFired).toBe(true);
                });
            });
        });

        it("should fire after an Ajax request is processed", function() {
            Ext.Ajax.request({
                url: 'foo',
                callback: function() {
                    done = true;
                }
            });
            waitsFor(function() {
                return done === true;
            });
            runs(function() {
                waits(delay);
                runs(function() {
                    expect(idleFired).toBe(true);
                });
            });
        });

        it("should fire after a scheduled Task is run", function() {
            Ext.TaskManager.newTask({
                run: function(){
                    done = true;
                }, 
                repeat: 1, 
                interval: 1
            }).start();
            waitsFor(function() {
                return done === true;
            });
            runs(function() {
                waits(delay);
                runs(function() {
                    expect(idleFired).toBe(true);
                });
            });
        });
    });
});
