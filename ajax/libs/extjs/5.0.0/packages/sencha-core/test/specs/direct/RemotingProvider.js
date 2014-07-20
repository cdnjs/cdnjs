describe("Ext.direct.RemotingProvider", function() {
    var RP = Ext.direct.RemotingProvider,
        provider,
        
        api = {
            actions: {
                "TestAction": [{
                    len:  1,
                    name: "echo"
                },{
                    len:  1,
                    name: "directFail"
                }, {
                    len: 0,
                    name: 'directForm',
                    formHandler: true
                }],
                
                "TestAction.Foo": [{
                    len:  0,
                    name: "foo"
                }],
                
                "TestAction.Foo.Bar": [{
                    len:  0,
                    name: "bar"
                }],
                
                "TestAction.Foo.Bar.Baz": [{
                    len:  0,
                    name: "baz"
                }],
                
                "TestAction.Foo.Qux": [{
                    len:  0,
                    name: "qux"
                }]
            },
            
            namespace: "Direct.foo.bar",
            type: "remoting",
            url: "/router",
            id: "foo"
        },
        
        directMethods = {
            echo: function(value) {
                return value;
            },
            
            directFail: function(value) {
                return {
                    type: 'exception'
                };
            },
            
            directForm: function(form) {
                return {
                    success: true,
                    data: form
                };
            },
            
            foo: function() {
                return 'foo';
            },
            
            bar: function() {
                return 'bar';
            },
            
            baz: function() {
                return 'baz';
            },
            
            qux: function() {
                return 'qux';
            }
        };
    
    // This simulation stub is *asynchronous*
    function simulateDirectRequest(options) {
        var callback = options.callback,
            scope = options.scope,
            transaction = options.transaction,
            isForm = options.form !== undefined,
            isUpload = options.isUpload,
            arg = {},
            data, tid, action, method, arg, fn, success,
            result, response, xhr, opt;
        
        if (isForm) {
            data   = options.params;
            tid    = data.extTID;
            action = data.extAction;
            method = data.extMethod;
            
            // Collect the input field values
            Ext.fly(options.form).select('input').each(function(el, c, idx) { 
                this[el.dom.name] = el.dom.value;
            }, arg);
            arg = [arg];
        }
        else {
            data   = options.jsonData;
            tid    = data.tid;
            action = data.action;
            method = data.method;
            arg    = data.data || [];
        }
        
        fn = directMethods[method];
        
        if (options.timeout === 666) {
            response = {
                type: 'exception',
                tid: tid,
                message: "Can't connect to the server"
            };
            
            success = false;
        }
        else {
            try {
                result   = fn.apply({}, arg);
                response = {
                    type: 'rpc',
                    tid: tid,
                    action: action,
                    method: method,
                    result: result
                };
            }
            catch (e) {
                // Direct exception handling here
                response = {
                    type: 'exception',
                    tid: tid,
                    message: e.toString(),
                    where: 'internal'
                };
            }
            
            // Success only means *communication* success
            success = true;
        }
        
        xhr = {
            responseText: Ext.encode(response)
        };
        
        opt = {
            transaction: transaction
        };
        
        Ext.callback(callback, scope, [opt, success, xhr], 1);
    }
        
    beforeEach(function() {
        provider = new RP(api);
    });
    
    afterEach(function() {
        provider = undefined;
        
        try {
            delete window.Direct;
        }
        catch (e) {
            window.Direct = undefined;
        }
    });
    
    describe("handles namespaces:", function() {
        var ns;
        it("creates namespace for itself if passed a string", function() {
            expect(Direct.foo.bar).toBeDefined();
        });
        
        it("doesn't create nested objects until it's connected", function() {
            expect(Direct.foo.bar).toEqual({});
        });
        
        describe("creates nested namespaces after it's connected:", function() {
            beforeEach(function() {
                provider.connect();
                ns = Direct.foo.bar;
            });
            
            it("creates TestAction", function() {
                expect(ns.TestAction).toBeDefined();
            });
            
            it("creates TestAction.Foo", function() {
                expect(ns.TestAction.Foo).toBeDefined();
            });
            
            it("creates TestAction.Foo.Bar", function() {
                expect(ns.TestAction.Foo.Bar).toBeDefined();
            });
            
            it("creates TestAction.Foo.Bar.Baz", function() {
                expect(ns.TestAction.Foo.Bar.Baz).toBeDefined();
            });
            
            it("creates TestAction.Foo.Qux", function() {
                expect(ns.TestAction.Foo.Qux).toBeDefined();
            });
        });
        
        describe("handles nested namespaces the old way:", function() {
            beforeEach(function() {
                provider.disableNestedActions = true;
                provider.connect();
                ns = Direct.foo.bar;
            });
            
            it("creates TestAction", function() {
                expect(ns.TestAction).toBeDefined();
            });
            
            it("creates TestAction.Foo", function() {
                expect(ns['TestAction.Foo']).toBeDefined();
                // AND
                expect(ns.TestAction.Foo).not.toBeDefined();
            });
            
            it("creates TestAction.Foo.Bar", function() {
                expect(ns['TestAction.Foo.Bar']).toBeDefined();
            });
            
            it("creates TestAction.Foo.Bar.Baz", function() {
                expect(ns['TestAction.Foo.Bar.Baz']).toBeDefined();
            });
            
            it("creates TestAction.Foo.Qux", function() {
                expect(ns['TestAction.Foo.Qux']).toBeDefined();
            });
        });
    });
    
    describe("handles remoting methods:", function() {
        var ns;
        
        function checkFn(fn) {
            expect( Ext.isFunction(fn) ).toBeTruthy();
        };
        
        beforeEach(function() {
            provider.connect();
            ns = Direct.foo.bar;
        });
    
        it("has Foo.foo", function() {
            checkFn(ns.TestAction.Foo.foo);
        });
        
        it("has Foo.Bar.bar", function() {
            checkFn(ns.TestAction.Foo.Bar.bar);
        });
        
        it("has Foo.Bar.Baz.baz", function() {
            checkFn(ns.TestAction.Foo.Bar.Baz.baz);
        });
        
        it("has Foo.Qux.qux", function() {
            checkFn(ns.TestAction.Foo.Qux.qux);
        });
    });

    describe("runs remoting methods:", function() {
        var ns, echo, options, handler;
        
        function echoStatus(result, event) {
            this.echo = event.status;
        }
        
        function echoResult(result, event) {
            if (event.status) {
                this.echo = result;
            }
        }
        
        function echoFormResult(request, result) {
            this.echo = result.result;
        }
        
        function echoResultAndOptions(result, event, success, options) {
            if (success) {
                this.echo = result;
                this.options = options;
            }
        }
        
        function returnFalse() {
            return false;
        }
        
        function checkEcho() {
            return Ext.isDefined(this.echo);
        }
        
        function checkHandler() {
            return !!handler.callCount;
        }
        
        beforeEach(function() {
            echo    = undefined;
            options = undefined;
            
            spyOn(Ext.Ajax, 'request').andCallFake(simulateDirectRequest);
            
            provider.connect();
            ns = Direct.foo.bar;
            
            handler = jasmine.createSpy('event handler');
        });
        
        afterEach(function() {
            handler = undefined;
        });
        
        describe("handles call mechanics", function() {
            describe("call batching", function() {
                it("should batch calls within specified enableBuffer timeout", function() {
                    var options, baseTid;
                
                    runs(function() {
                        Ext.Ajax.request.andCallFake(function(opt) {
                            options = opt;
                        });

                        baseTid = Ext.direct.Transaction.TRANSACTION_ID;
                    
                        ns.TestAction.echo('foo', Ext.emptyFn);
                        ns.TestAction.echo('bar', Ext.emptyFn);
                    });
                
                    waitsFor(function() { return !!options }, 'options never modified', 20);
                
                    runs(function() {
                        expect(options.jsonData).toEqual([{
                            action: 'TestAction',
                            method: 'echo',
                            type:   'rpc',
                            tid:    baseTid + 1,
                            data:   ['foo']
                        }, {
                            action: 'TestAction',
                            method: 'echo',
                            type:   'rpc',
                            tid:    baseTid + 2,
                            data:   ['bar']
                        }]);
                    });
                });
            
                it("should run calls with specified timeout w/o batching", function() {
                    var options = [],
                        baseTid;
                
                    runs(function() {
                        Ext.Ajax.request.andCallFake(function(opt) {
                            options.push(opt);
                        });

                        provider.enableBuffer = 200;
                        baseTid = Ext.direct.Transaction.TRANSACTION_ID;
                    
                        ns.TestAction.echo('baz', Ext.emptyFn);
                        ns.TestAction.echo('qux', Ext.emptyFn, this, { timeout: 1 });
                    });
                
                    waitsFor(function() { return !!options }, 'options never modified', 20);
                
                    runs(function() {
                        expect(options.length).toBe(1);
                        // AND
                        expect(options[0].jsonData).toEqual({
                            action: 'TestAction',
                            method: 'echo',
                            type:   'rpc',
                            tid:    baseTid + 2,
                            data:   ['qux']
                        });
                    });
                });
                
                it("should run calls instantly with enableBuffer = false", function() {
                    var option, baseTid;
                    
                    Ext.Ajax.request.andCallFake(function(opt) {
                        options = opt;
                    });
                    
                    provider.enableBuffer = false;
                    baseTid = Ext.direct.Transaction.TRANSACTION_ID;
                    
                    ns.TestAction.echo('fred', Ext.emptyFn);
                    
                    expect(options.jsonData).toEqual({
                        action: 'TestAction',
                        method: 'echo',
                        type: 'rpc',
                        tid: baseTid + 1,
                        data: ['fred']
                    });
                });
            });
            
            describe("call related events", function() {
                it("fires 'beforecall' event", function() {
                    runs(function() {
                        provider.on('beforecall', handler);
                        
                        ns.TestAction.echo('fred', Ext.emptyFn);
                    });
                    
                    waitsFor(checkHandler, 'event handler never fired', 20);
                    
                    runs(function() {
                        expect(handler).toHaveBeenCalled();
                    });

                    waits(35);
                });
                
                it("fires 'call' event", function() {
                    runs(function() {
                        provider.on('call', handler);
                        
                        ns.TestAction.echo('plugh', Ext.emptyFn);
                    });
                    
                    waitsFor(checkHandler, 'event handler never fired', 20);
                    
                    runs(function() {
                        expect(handler).toHaveBeenCalled();
                    });
                    
                    waits(35);
                });
                
                it("cancels request when 'beforecall' handler returns false", function() {
                    runs(function() {
                        handler.andCallFake(returnFalse);
                        
                        provider.on('beforecall', handler);
                        
                        ns.TestAction.echo('mymse', Ext.emptyFn);
                    });
                    
                    waitsFor(checkHandler, 'event handler never fired', 200);
                    
                    // Additional timeout for callbacks to queue and fire
                    waits(20);
                    
                    runs(function() {
                        expect(options).toBeUndefined();
                    });

                    waits(35);
                });
            });
        });
        
        describe("with connection failed", function() {
            it("retries failed transactions", function() {
                var proto = Ext.direct.Transaction.prototype;
                
                runs(function() {
                    spyOn(proto, 'retry').andCallThrough();
                
                    ns.TestAction.echo('foo', Ext.emptyFn, this, { timeout: 666 });
                });
                
                waitsFor(function() {
                    return proto.retry.callCount === 1;
                }, 'transaction.retry() never called', 200);
                
                runs(function() {
                    expect(proto.retry).toHaveBeenCalled();
                });
            });
            
            it("fires exception when retry count is exceeded", function() {
                runs(function() {
                    provider.on('data', handler);
            
                    ns.TestAction.echo('bar', Ext.emptyFn, this, { timeout: 666 });
                });
                
                waitsFor(checkHandler, 'event handler never fired', 200);
                
                runs(function() {
                    expect(handler).toHaveBeenCalled();
                });
            });
            
            describe("handles callback:", function() {
                it("fires 'beforecallback' event", function() {
                    runs(function() {
                        provider.on('beforecallback', handler);
                    
                        ns.TestAction.echo('baz', Ext.emptyFn, this, { timeout: 666 });
                    });
                    
                    waitsFor(checkHandler, 'event handler never fired', 200);
                    
                    runs(function() {
                        expect(handler).toHaveBeenCalled();
                    });
                });
                
                it("cancels callback when 'beforecallback' handler returns false", function() {
                    var cb = jasmine.createSpy('callback');
                    
                    runs(function() {
                        handler.andCallFake(returnFalse);
                        
                        provider.on('beforecallback', handler);
                        
                        ns.TestAction.echo('qux', cb, this, { timeout: 666 });
                    });
                    
                    waitsFor(checkHandler, 'event handler never fired', 200);
                    
                    // Additional timeout for callback to be handled
                    waits(20);
                    
                    runs(function() {
                        expect(handler).toHaveBeenCalled();
                        // AND
                        expect(cb).not.toHaveBeenCalled();
                    });
                });
                
                it("fires callback when retry count is exceeded", function() {
                    runs(function() {
                        ns.TestAction.echo('plugh', echoStatus, this, { timeout: 666 });
                    });
                    
                    waitsFor(checkEcho, 'callback never fired', 200);
                
                    runs(function() {
                        expect(this.echo).toBe(false);
                    });
                });
            });
        });
        
        describe("successfully connected:", function() {
            it("fires 'data' event", function() {
                runs(function() {
                    provider.on('data', handler);
            
                    ns.TestAction.echo('foo', echoResult, this);
                });
                
                waitsFor(checkEcho, 'callback never fired', 200);
                
                runs(function() {
                    expect(handler).toHaveBeenCalled();
                });
            });
            
            describe("handles callback:", function() {
                it("fires 'beforecallback' event", function() {
                    runs(function() {
                        provider.on('beforecallback', handler);
                    
                        ns.TestAction.echo('foo', echoResult, this);
                    });
                    
                    waitsFor(checkEcho, 'event handler never fired', 100);
                    
                    runs(function() {
                        expect(handler).toHaveBeenCalled();
                    });
                });
                
                it("cancels callback when 'beforecallback' handler returns false", function() {
                    var cb = jasmine.createSpy('callback');
                    
                    runs(function() {
                        handler.andCallFake(returnFalse);
                        
                        provider.on('beforecallback', handler);
                        
                        ns.TestAction.echo('bar', cb, this);
                    });
                    
                    waitsFor(checkHandler, 'event handler never fired', 100);
                    
                    // Additional timeout for callback to be handled
                    waits(20);
                    
                    runs(function() {
                        expect(handler).toHaveBeenCalled();
                        // AND
                        expect(cb).not.toHaveBeenCalled();
                    });
                });
                
                it('runs w/o additional options', function() {
                    runs(function() {
                        ns.TestAction.echo('foo', echoResult, this);
                    });
            
                    waitsFor(checkEcho, 'callback never fired', 100);
            
                    runs(function() {
                        expect(this.echo).toEqual('foo');
                    });
                });
        
                it('runs w/ additional options', function() {
                    runs(function() {
                        ns.TestAction.echo('bar', echoResultAndOptions, this, {
                            victory: 'Huzzah!'
                        });
                    });
            
                    waitsFor(checkEcho, 'callback never fired', 100);
            
                    runs(function() {
                        expect(this.echo).toEqual('bar');
                        expect(this.options).toBeDefined();
                        expect(this.options.victory).toEqual('Huzzah!');
                    });
                });
        
                it('runs in nested namespaces', function() {
                    runs(function() {
                        ns.TestAction.Foo.foo(echoResult, this);
                    });
            
                    waitsFor(checkEcho, 'callback never fired', 100);
            
                    runs(function() {
                        expect(this.echo).toEqual('foo');
                    });
                });
        
                it('runs in deeply nested namespaces', function() {
                    runs(function() {
                        ns.TestAction.Foo.Bar.bar(echoResult, this);
                    });
            
                    waitsFor(checkEcho, 'callback never fired', 100);
            
                    runs(function() {
                        expect(this.echo).toEqual('bar');
                    });
                });
        
                it('runs in really truly deeply nested namespaces', function() {
                    runs(function() {
                        ns.TestAction.Foo.Bar.Baz.baz(echoResult, this);
                    });
            
                    waitsFor(checkEcho, 'callback never fired');
            
                    runs(function() {
                        expect(this.echo).toEqual('baz');
                    });
                });
            });
        });
        
        describe("form calls:", function() {
            var form;
            
            function createForm(config) {
                config = Ext.apply({
                    xtype: 'form',
                    renderTo: document.body,
                    width: 300,
                    height: 200,
                    layout: 'form',
                    
                    api: {
                        // TODO The fn name should be TestAction.directForm
                        // but Direct manager is not aware of the Providers'
                        // namespaces. We gotta fix this.
                        submit: 'Direct.foo.bar.TestAction.directForm'
                    },
                    
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'hidden_foo',
                        value: 'hide the sacred foo from infoodels!'
                    }, {
                        xtype: 'textfield',
                        name: 'overt_foo',
                        value: 'behold the false, deceitful overt foo'
                    }]
                }, config);
                
                form = Ext.widget(config);
            }
            
            beforeEach(function() {
                createForm();
            });
            
            afterEach(function() {
                if (form) {
                    form.destroy();
                }
            });
            
            describe("submit", function() {
                it("should pass field values to direct fn", function() {
                    runs(function() {
                        form.submit({
                            success: echoFormResult,
                            scope: this
                        });
                    });
                    
                    // Callbacks are a bit slow but 2 sec is enough
                    waitsFor(checkEcho, 'callback that never fired', 2000);
                    
                    runs(function() {
                        expect(this.echo).toEqual({
                            success: true,
                            data: {
                                hidden_foo: 'hide the sacred foo from infoodels!',
                                overt_foo: 'behold the false, deceitful overt foo'
                            }
                        });
                    });
                });
                
                it("should pass extra params to direct fn", function() {
                    runs(function() {
                        form.submit({
                            params: {
                                simple_foo: 'barf!'
                            },
                            success: echoFormResult,
                            scope: this
                        });
                    });
                    
                    waitsFor(checkEcho, 'callback that never fired', 2000);
                    
                    runs(function() {
                        expect(this.echo).toEqual({
                            success: true,
                            data: {
                                hidden_foo: 'hide the sacred foo from infoodels!',
                                overt_foo: 'behold the false, deceitful overt foo',
                                simple_foo: 'barf!'
                            }
                        });
                    });
                });
                
                it("should pass form baseParams to direct fn", function() {
                    runs(function() {
                        form.getForm().baseParams = {
                            MEGA_FOO: 'ALL YOUR FOO ARE BELONG TO US!'
                        };
                        
                        form.submit({
                            success: echoFormResult,
                            scope: this
                        });
                    });
                    
                    waitsFor(checkEcho, 'callback that never fired', 2000);
                    
                    runs(function() {
                        expect(this.echo).toEqual({
                            success: true,
                            data: {
                                hidden_foo: 'hide the sacred foo from infoodels!',
                                overt_foo: 'behold the false, deceitful overt foo',
                                MEGA_FOO: 'ALL YOUR FOO ARE BELONG TO US!'
                            }
                        });
                    });
                });
            });
        });
    });
});
