describe("Ext.data.Connection", function() {
    var makeConnection, connection, request;
        
    beforeEach(function() {
        MockAjaxManager.addMethods();
        makeConnection = function(cfg){
            cfg = cfg || {};
            connection = new Ext.data.Connection(cfg);
        };
    }); 

    afterEach(function() {
        MockAjaxManager.removeMethods();    
        request = connection = makeConnection = null;
    });

    describe("beforerequest", function(){
        it("should fire a beforerequest event", function(){
            makeConnection();
            var o = {
                fn: Ext.emptyFn
            }, options = {
                url: 'foo'    
            };
            spyOn(o, 'fn');
            connection.on('beforerequest', o.fn);
            connection.request(options);
            //expect(o.fn).toHaveBeenCalledWith(connection, options);
            expect(o.fn).toHaveBeenCalled();
        });  

        it("should abort the request if false is returned", function(){
            makeConnection();
            connection.on('beforerequest', function(){
                return false;
            });
            request = connection.request({
                url: 'foo'
            });
            expect(request).toBeNull();
        });

        it("should fire the callback with scope even if we abort", function(){
            makeConnection();
            var o = {
                fn: function(){
                    scope = this;
                }
            }, options, scope;
            spyOn(o, 'fn').andCallThrough();
            options = {
                url: 'foo',
                callback: o.fn,
                scope: o
            };
            connection.on('beforerequest', function(){
                return false;
            });

            connection.request(options);
            expect(o.fn).toHaveBeenCalledWith(options, undefined, undefined);
            expect(scope).toEqual(o);
        });
    });

    describe("method", function(){

        it("should always use POST if specified in the options", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                method: 'POST'
            });    
            expect(request.xhr.ajaxOptions.method).toEqual('POST');
        });

        it("should always use GET if specified in the options", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                method: 'GET'
            });    
            expect(request.xhr.ajaxOptions.method).toEqual('GET');
        });

        it("should use the class default if specified", function(){
            makeConnection({
                method: 'POST'
            });    
            request = connection.request({
                url: 'foo'
            });
            expect(request.xhr.ajaxOptions.method).toEqual('POST');
        });

        it("should default to POST if we specify jsonData", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                jsonData: 'json'
            }); 

            expect(request.xhr.ajaxOptions.method).toEqual('POST');
        });

        it("should default to POST if we specify xmlData", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                xmlData: 'xml'
            });
            expect(request.xhr.ajaxOptions.method).toEqual('POST');
        });

        it("should default to POST if we specify rawData", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                rawData: 'raw'
            }); 

            expect(request.xhr.ajaxOptions.method).toEqual('POST');
        });

        it("should default to POST if we specify params", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                params: {
                    foo: 'bar'
                }
            });  
            expect(request.xhr.ajaxOptions.method).toEqual('POST');  
        });

        it("should default to POST if we specify extraParams", function(){
            makeConnection({
                extraParams: {
                    foo: 'bar'
                }
            });
            request = connection.request({
                url: 'foo'
            });  
            expect(request.xhr.ajaxOptions.method).toEqual('POST');  
        });   
    });

    describe("url", function(){

        it("should throw an exception if no url is specified", function(){
            makeConnection();
            expect(function(){
                connection.request();
            }).toRaiseExtError('No URL specified');
        });

        it("should use the url specified in the config", function(){
            makeConnection();
            request = connection.request({
                disableCaching: false,
                url: 'foo'
            });
            expect(request.xhr.ajaxOptions.url).toEqual('foo');
        });

        it("should default to the connection url if one isn't specified in the config", function(){
            makeConnection({
                url: 'bar'
            });    
            request = connection.request({
                disableCaching: false
            });
            expect(request.xhr.ajaxOptions.url).toEqual('bar');
        });

        it("should put any urlParams in the url", function(){
            makeConnection();
            request = connection.request({
                disableCaching: false,
                url: 'foo',
                urlParams: {
                    x: 1,
                    y: 'a'
                }
            });
            expect(request.xhr.ajaxOptions.url).toEqual('foo?x=1&y=a');
        });

        it("should put params in the url if we specify method GET", function(){
            makeConnection();
            request = connection.request({
                disableCaching: false,
                url: 'foo',
                params: {
                    x: 'a',
                    y: 'b'
                },
                method: 'GET'
            });
            expect(request.xhr.ajaxOptions.url).toEqual('foo?x=a&y=b');
        });

        it("should put the params in the url if we have jsonData", function(){
            makeConnection();
            request = connection.request({
                disableCaching: false,
                url: 'foo',
                jsonData: 'asdf',
                params: {
                    x: 'a',
                    y: 'b'
                }
            });  
            expect(request.xhr.ajaxOptions.url).toEqual('foo?x=a&y=b');  
        });

        it("should put the params in the url if we have xmlData", function(){
            makeConnection();
            request = connection.request({
                disableCaching: false,
                url: 'foo',
                xmlData: 'xml',
                params: {
                    x: 'a',
                    y: 'b'
                }
            });
            expect(request.xhr.ajaxOptions.url).toEqual('foo?x=a&y=b');
        });

        it("should put the params in the url if we have rawData", function(){
            makeConnection();
            request = connection.request({
                disableCaching: false,
                url: 'foo',
                rawData: 'asdf',
                params: {
                    x: 'a',
                    y: 'b'
                }
            });  
            expect(request.xhr.ajaxOptions.url).toEqual('foo?x=a&y=b');  
        });

        it("should allow for a function to be passed", function(){
            makeConnection();
            request = connection.request({
                disableCaching: false,
                url: function(){
                    return 'foo';
                }
            });
            expect(request.xhr.ajaxOptions.url).toEqual('foo');
        });

        it("should use the passed scope and should have the options passed", function(){
            makeConnection();
            var o = {}, options = {
                url: function() {
                    scope = this;
                    return 'foo;';
                },
                scope: o,
                disableCaching: false
            }, scope;

            spyOn(options, 'url').andCallThrough();
            connection.request(options);
            expect(options.url).toHaveBeenCalledWith(options);
            expect(scope).toEqual(o);
        });
    });

    describe("caching", function(){
        it("should disable caching by default", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });    
            expect(request.xhr.ajaxOptions.url).toMatch(/foo\?_dc=\d+/);
        });

        it("should only include caching when the method is GET", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                method: 'POST'
            });   
            expect(request.xhr.ajaxOptions.url).toEqual('foo');
        });

        it("should not include caching if set to false", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                disableCaching: false
            });
            expect(request.xhr.ajaxOptions.url).toEqual('foo');
        });

        it("should use the default caching if not specified", function(){
            makeConnection({
                disableCaching: false
            });    
            request = connection.request({
                url: 'foo'
            });
            expect(request.xhr.ajaxOptions.url).toEqual('foo');
        });

        it("should respect the cache param name", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                disableCachingParam: '_bar'
            }); 
            expect(request.xhr.ajaxOptions.url).toMatch(/foo\?_bar=\d+/);  
        });

        it("should use the default cache param name if not specified", function(){
            makeConnection({
                disableCachingParam: '_bar'
            });    
            request = connection.request({
                url: 'foo'
            });
            expect(request.xhr.ajaxOptions.url).toMatch(/foo\?_bar=\d+/);
        });
    });

    describe("params", function(){

        describe("urlParams", function(){
            it("should add urlParams to the url", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    disableCaching: false,
                    urlParams: 'a=b&x=y'
                });
                expect(request.xhr.ajaxOptions.url).toEqual('foo?a=b&x=y');    
            });  

            it("should encode any non-primitive value", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    disableCaching: false,
                    urlParams: {
                        a: 'b',
                        x: 'y'
                    }
                });
                expect(request.xhr.ajaxOptions.url).toEqual('foo?a=b&x=y');
            });
        });

        describe("params", function(){

            it("should pass params to the request", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    params: 'foo=bar'
                });    
                expect(request.xhr.ajaxOptions.data).toEqual("foo=bar");
            }); 

            it("should encode any non primitive value", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    params: {
                        a: 'b',
                        x: 'y'
                    }
                });
                expect(request.xhr.ajaxOptions.data).toEqual('a=b&x=y');
            }); 

            it("should allow a function to be passed", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    params: function(){
                        return 'x=y';
                    }
                });    
                expect(request.xhr.ajaxOptions.data).toEqual('x=y');
            });

            it("should use the passed scope and should have the options passed", function(){
                makeConnection();
                var o = {}, options = {
                    url: 'foo',
                    params: function(){
                        scope = this;
                        return 'foo;';
                    },
                    scope: o
                }, scope;

                spyOn(options, 'params').andCallThrough();
                connection.request(options);
                expect(options.params).toHaveBeenCalledWith(options);
                expect(scope).toEqual(o);
            });
        });

        describe("extraParams", function(){
            it("should get appended to the params", function(){
                makeConnection({
                    extraParams: {
                        x: 'y'
                    }
                });
                request = connection.request({
                    url: 'foo',
                    params: 'a=b'
                });    
                expect(request.xhr.ajaxOptions.data).toEqual('a=b&x=y');
            });  

            it("should get appended even if we have no params", function(){
                makeConnection({
                    extraParams: {
                        x: 'y'
                    }
                });
                request = connection.request({
                    url: 'foo'
                });    
                expect(request.xhr.ajaxOptions.data).toEqual('x=y');    
            });
        });
    });

    describe("data", function(){
        it("should use rawData", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                rawData: 'raw'
            });    
            expect(request.xhr.ajaxOptions.data).toEqual('raw');
        });

        it("should give rawData precedence", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                rawData: 'raw',
                jsonData: 'json'
            });    
            expect(request.xhr.ajaxOptions.data).toEqual('raw');
        });

        it("should use jsonData", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                jsonData: 'json'
            });    
            expect(request.xhr.ajaxOptions.data).toEqual('json');
        });

        it("should encode non-primitive json", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                jsonData: {
                    x: 'y'
                }
            });    
            expect(request.xhr.ajaxOptions.data).toEqual('{"x":"y"}');
        });

        it("should use xmlData", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                xmlData: 'xml'
            });
            expect(request.xhr.ajaxOptions.data).toEqual('xml');
        });

        it("should have data take precedence over params", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                rawData: 'data',
                params: 'x=y'
            });    
            expect(request.xhr.ajaxOptions.data).toEqual('data');
        });
    });

    describe("username/password", function(){
        it("should not send if there is no username", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });
            expect(request.xhr.ajaxOptions.username).toBeUndefined();
            expect(request.xhr.ajaxOptions.password).toBeUndefined();
        });        

        it("should pass the username/password", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                username: 'evan',
                password: 'javascript'
            });    
            expect(request.xhr.ajaxOptions.username).toEqual('evan');
            expect(request.xhr.ajaxOptions.password).toEqual('javascript');
        });

        it("should default to username/password specified on the object", function(){
            makeConnection({
                username: 'evan',
                password: 'javascript'
            });
            request = connection.request({
                url: 'foo'
            });
            expect(request.xhr.ajaxOptions.username).toEqual('evan');
            expect(request.xhr.ajaxOptions.password).toEqual('javascript');
        });
    });

    describe("async", function(){
        it("should default to true", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });          
            expect(request.xhr.ajaxOptions.async).toBeTruthy();  
        });    

        it("should use whatever is specified in the options", function(){
            makeConnection();
            var response = connection.request({
                url: 'foo',
                async: false
            });
            expect(response.request.async).toBeFalsy();
        });

        it("should give precedence to the value in the options", function(){
            makeConnection({
                async: false
            });    
            request = connection.request({
                url: 'foo',
                async: true
            });
            expect(request.xhr.ajaxOptions.async).toBeTruthy();
        });

        it("should fall back on the instance default", function(){
            makeConnection({
                async: false
            });
            var response = connection.request({
                url: 'foo'
            });
            expect(response.request.async).toBeFalsy();
        });
    });

    describe("headers", function(){
        describe("defaultXhrHeader", function(){
            it("should use the defaultXhrHeader by default", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo'
                });
                expect(request.xhr.headers['X-Requested-With']).toEqual('XMLHttpRequest');
            });

            it("should not attach the default header if set to false", function(){
                makeConnection({
                    useDefaultXhrHeader: false
                });
                request = connection.request({
                    url: 'foo'
                });
                expect(request.xhr.headers['X-Requested-With']).toBeUndefined();
            });

            it("should not attach the default header if explicitly specified in the headers", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    headers: {
                        'X-Requested-With': 'header'
                    }
                });
                expect(request.xhr.headers['X-Requested-With']).toEqual('header');
            });

            it("should use the defaultXhrHeader option", function(){
                makeConnection({
                    defaultXhrHeader: 'bar'
                });
                request = connection.request({
                    url: 'foo'
                });
                expect(request.xhr.headers['X-Requested-With']).toEqual('bar');
            });
        }); 

        describe("content type", function(){
            it("should use the content type if explicitly specified", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    headers: {
                        'Content-Type': 'type'
                    }
                });
                expect(request.xhr.headers['Content-Type']).toEqual('type');
            });

            it("should not set the content type if we have no data/params", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo'
                });
                expect(request.xhr.headers['Content-Type']).toBeUndefined();
            });
            
            it("should not set the content type if we explicitly set null", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    rawData: 'raw',
                    headers: {
                        'Content-Type': null
                    }
                });
                expect(request.xhr.headers['Content-Type']).toBeUndefined();
            });
            
            it("should not set the content type if we explicitly set undefined", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    rawData: 'raw',
                    headers: {
                        'Content-Type': undefined
                    }
                });
                expect(request.xhr.headers['Content-Type']).toBeUndefined();
            });

            it("should use text/plain if we have rawData", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    rawData: 'raw'
                });
                expect(request.xhr.headers['Content-Type']).toEqual('text/plain');
            });

            it("should use text/xml if we have xmlData", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    xmlData: 'xml'
                });
                expect(request.xhr.headers['Content-Type']).toEqual('text/xml');
            });

            it("should use application/json if we have jsonData", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    jsonData: 'json'
                });
                expect(request.xhr.headers['Content-Type']).toEqual('application/json');
            });

            it("should use the default content type if we have params and no data", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    params: 'x=y'
                });
                expect(request.xhr.headers['Content-Type']).toEqual('application/x-www-form-urlencoded; charset=UTF-8');
            });

            it("should use the defaultPostHeader", function(){
                makeConnection({
                    defaultPostHeader: 'header'
                });
                request = connection.request({
                    url: 'foo',
                    params: 'x=y'
                });    
                expect(request.xhr.headers['Content-Type']).toEqual('header');
            });
        });

        describe("normal headers", function(){
            beforeEach(function(){
                makeConnection({
                    useDefaultXhrHeader: false
                });
            });

            it("should apply no headers if none are passed", function(){
                request = connection.request({
                    url: 'foo'
                });
                expect(request.xhr.headers).toEqual({});
            });

            it("should apply any headers", function(){
                request = connection.request({
                    url: 'foo',
                    headers: {
                        a: 'a',
                        b: 'b'
                    }
                });    
                expect(request.xhr.headers.a).toEqual('a');
                expect(request.xhr.headers.b).toEqual('b');
            });
        });

        describe("defaultHeaders", function(){
            beforeEach(function(){
                makeConnection({
                    useDefaultXhrHeader: false,
                    defaultHeaders: {
                        a: 'a',
                        b: 'b'
                    }
                });
            });

            it("should apply any defaultHeaders even if no headers are passed", function(){
                request = connection.request({
                    url: 'foo'
                });
                expect(request.xhr.headers.a).toEqual('a');
                expect(request.xhr.headers.b).toEqual('b');
            });

            it("should always have headers take precedence", function(){
                request = connection.request({
                    url: 'foo',
                    headers: {
                        a: 'x',
                        b: 'y'
                    }
                });
                expect(request.xhr.headers.a).toEqual('x');
                expect(request.xhr.headers.b).toEqual('y');
            });

            it("should combine headers/defaults", function(){
                request = connection.request({
                    url: 'foo',
                    headers: {
                        x: 'x',
                        y: 'y'
                    }
                });
                expect(request.xhr.headers.a).toEqual('a');
                expect(request.xhr.headers.b).toEqual('b');
                expect(request.xhr.headers.x).toEqual('x');
                expect(request.xhr.headers.y).toEqual('y');
            });
        });
    });

    describe("isLoading", function(){
        it("should return false if no requests have been made", function(){
            makeConnection();
            expect(connection.isLoading()).toBe(false);
        });
        
        it("should use the most recent request if one is not passed", function(){
            makeConnection();
            connection.request({
                url: 'foo'
            });
            expect(connection.isLoading()).toBe(true);
        });
        
        it("should return false if the most recent request has loaded", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });    
            connection.mockComplete({
                status: 200
            });
            expect(connection.isLoading()).toBe(false);
        });

        it("should return true if the request is loading", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });
            expect(connection.isLoading(request)).toBe(true);
        });

       it("should return false if the request has loaded", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });    
            connection.mockComplete({
                status: 200
            });
            expect(connection.isLoading(request)).toBe(false);
        });

        it("should return false if the request has been aborted", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });
            connection.abort(request);
            expect(connection.isLoading(request)).toBe(false);
        });
    });

    describe("aborting", function(){
        it("should abort a specific request", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });
            connection.abort(request);
            expect(request.aborted).toBe(true);
        });

        it("should abort the most recent request if a specific one isn't specified", function(){
            makeConnection();
            var r1 = connection.request({
                url: 'r1'
            });    
            var r2 = connection.request({
                url: 'r2'
            });
            connection.abort();
            expect(r1.aborted).not.toBe(true);
            expect(r2.aborted).toBe(true);
        });

        it("should fire failure/callback", function(){
            makeConnection();
            var o = {
                fn: Ext.emptyFn
            }, spy = spyOn(o, 'fn');
            request = connection.request({
                url: 'foo',
                failure: o.fn,
                callback: o.fn
            });
            connection.abort(request);
            expect(spy.callCount).toEqual(2);
        });    

        it("should set options in the response", function(){
            var status, statusText, o = {
                fn: function(response){
                    status = response.status;
                    statusText = response.statusText;
                }
            };
            makeConnection();
            request = connection.request({
                url: 'foo',
                failure: o.fn
            });
            connection.abort(request);
            expect(status).toEqual(-1);
            expect(statusText).toEqual('transaction aborted');
        });

        it("should fire the requestexception event when aborted", function(){
            var fn = jasmine.createSpy("request aborted");

            makeConnection();
            connection.on('requestexception', fn);
            request = connection.request({
                url: 'foo'
            });

            connection.abort(request);
            expect(fn).toHaveBeenCalled();
        });
    });
    
    describe("abortAll", function(){
        it("should do nothing if there's no active requests", function(){
            makeConnection();
            request = connection.request({
                url: 'foo'
            });    
            connection.mockComplete({
                status: 200
            });
            connection.abortAll();
            expect(request.aborted).toBeFalsy();
        });
        
        it("should abort all active requests", function(){
            makeConnection();
            var r1 = connection.request({
                url: 'r1'
            });    
            var r2 = connection.request({
                url: 'r2'
            });
            connection.abortAll();
            expect(r1.aborted).toBe(true);
            expect(r2.aborted).toBe(true);
        });
    });

    describe("timeout", function(){
        it("should timeout if the request runs longer than the timeout period", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                timeout: 1
            }); 

            waitsFor(function(){
                return request.timedout === true;
            }, "timeout never reached");  
        });

        it("should not fire the timeout if the request succeeds within the period", function(){
            var fn = jasmine.createSpy("request failure");

            runs(function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    timeout: 1,
                    failure: fn
                });
                request.xhr.complete({
                    status: 200
                });
            });
            waits(1);
            runs(function(){
                expect(fn).not.toHaveBeenCalled();
            });
        });

        it("should fire failure/callback", function(){
            var fn = jasmine.createSpy('failure and callback');

            makeConnection();
            request = connection.request({
                url: 'foo',
                timeout: 1,
                failure: fn,
                callback: fn
            });

            waitsFor(function(){
                return fn.callCount === 2;
            }, "fn was never called");  
        });

        it("should set the options on the response", function(){
            var status, statusText,
                fn = function(response){
                    status = response.status;
                    statusText = response.statusText;
                };

            makeConnection();
            request = connection.request({
                url: 'foo',
                timeout: 1,
                failure: fn
            });

            waitsFor(function(){
                return status === 0 && statusText === 'communication failure';
            }, "options in response wasn't set");
        });

        it("should fire the requestexception event when timed out", function(){
            var fn = jasmine.createSpy("request timed out");

            makeConnection();
            connection.on('requestexception', fn);
            request = connection.request({
                url: 'foo',
                timeout: 1
            });

            waits(10);
            runs(function(){
                expect(fn).toHaveBeenCalled();
            });
        });
    });

    describe("successful requests", function(){
        it("should fire the success handler on a successful request", function(){
            makeConnection();
            var o = {
                fn: function(){
                    scope = this;
                }    
            }, scope;
            spyOn(o, 'fn').andCallThrough();
            request = connection.request({
                url: 'foo',
                success: o.fn,
                scope: o
            });
            connection.mockComplete({
                status: 200
            });
            expect(o.fn).toHaveBeenCalled();
            expect(scope).toEqual(o);
        });    

        it("should fire the callback", function(){
            makeConnection();
            var o = {
                fn: function(){
                    scope = this;
                }    
            }, scope;
            spyOn(o, 'fn').andCallThrough();
            request = connection.request({
                url: 'foo',
                callback: o.fn,
                scope: o
            });
            connection.mockComplete({
                status: 200
            });
            expect(o.fn).toHaveBeenCalled();
            expect(scope).toEqual(o);
        });

        it("should fire the requestcomplete event", function(){
            makeConnection();
            var o = {
                fn: Ext.emptyFn 
            }, scope;
            spyOn(o, 'fn');
            connection.on('requestcomplete', o.fn);
            request = connection.request({
                url: 'foo',
                callback: o.fn,
                scope: o
            });
            connection.mockComplete({
                status: 200
            });
            expect(o.fn).toHaveBeenCalled();
        });

        it("should copy properties to response", function(){
            var o = {};
            makeConnection();
            request = connection.request({
                url: 'foo',
                success: function(response){
                    o.statusText = response.statusText;
                    o.status = response.status;
                    o.responseText = response.responseText;
                    o.responseXML = response.responseXML;
                }
            });
            connection.mockComplete({
                status: 200,
                statusText: 'statusText',
                responseText: 'response',
                responseXML: {}
            });
            expect(o.statusText).toEqual('statusText');
            expect(o.status).toEqual(200);
            expect(o.responseText).toEqual('response');
            expect(o.responseXML).toEqual({});
        });

        it("should not fire the requestexception event", function(){
            var fn = jasmine.createSpy("request successful");
            makeConnection();
            connection.on('requestexception', fn);
            request = connection.request({
                url: 'foo'
            });
            connection.mockComplete({
                status: 200
            });
            expect(fn).not.toHaveBeenCalled();
        });
    });

    describe("failures", function(){
        it("should fire the failure handler on a failed request", function(){
            makeConnection();
            var o = {
                fn: function(){
                    scope = this;
                }    
            }, scope;
            spyOn(o, 'fn').andCallThrough();
            request = connection.request({
                url: 'foo',
                failure: o.fn,
                scope: o
            });
            connection.mockComplete({
                status: 404
            });
            expect(o.fn).toHaveBeenCalled();
            expect(scope).toEqual(o);
        });    

        it("should fire the callback", function(){
            makeConnection();
            var o = {
                fn: function(){
                    scope = this;
                }    
            }, scope;
            spyOn(o, 'fn').andCallThrough();
            request = connection.request({
                url: 'foo',
                callback: o.fn,
                scope: o
            });
            connection.mockComplete({
                status: 404
            });
            expect(o.fn).toHaveBeenCalled();
            expect(scope).toEqual(o);
        });

        it("should fire the requestexception event", function(){
            makeConnection();
            var o = {
                fn: Ext.emptyFn 
            }, scope;
            spyOn(o, 'fn');
            connection.on('requestexception', o.fn);
            request = connection.request({
                url: 'foo',
                callback: o.fn,
                scope: o
            });
            connection.mockComplete({
                status: 404
            });
            expect(o.fn).toHaveBeenCalled();
        });
    });

    describe("synchronous requests", function(){
        it("should return the response object", function(){
            makeConnection({
                async: false
            });
            var response = connection.request({
                url: 'foo'
            }), defaults = MockAjax.prototype.syncDefaults;

            expect(response.responseText).toEqual(defaults.responseText);
            expect(response.status).toEqual(defaults.status);
            expect(response.statusText).toEqual(defaults.statusText);
        });
    });

    describe("binaryData", function(){
        var nativeBinaryPost =  Ext.isChrome ||
            (Ext.isSafari && Ext.isDefined(window.Uint8Array)) ||
            (Ext.isGecko && Ext.isDefined(window.Uint8Array));

        it("should create the correct XHR object depending on the browser", function(){
            makeConnection();
            request = connection.request({
                url: 'foo',
                binaryData: [0,1,2,3]
            });
            if (nativeBinaryPost) {
                expect(request.xhr).not.toEqual(jasmine.any(Ext.data.flash.BinaryXhr));
            } else {
                expect(request.xhr).toEqual(jasmine.any(Ext.data.flash.BinaryXhr));
                Ext.data.flash.BinaryXhr.flashPolyfillEl.remove();
            }
        });
        
        // Tests in case of browser support for binary posting
        if (nativeBinaryPost) {
            it("should create a typed array", function(){
                makeConnection();
                request = connection.request({
                    url: 'foo',
                    binaryData: [0,1,2,3]
                });
                expect([jasmine.any(ArrayBuffer), jasmine.any(Uint8Array)]).toContain(request.xhr.ajaxOptions.data);
            });
        }
        
    });
});
