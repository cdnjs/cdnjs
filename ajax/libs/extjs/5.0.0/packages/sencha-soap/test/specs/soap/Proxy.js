describe("Ext.data.soap.Proxy", function() {
    var proxy;

    function makeProxy(config) {
        proxy = new Ext.data.soap.Proxy(Ext.apply({
            model: 'spec.Foo',
            type: 'soap',
            url: '/soapUrl',
            api: {
                create: 'Create',
                read: 'Read',
                update: 'Update',
                destroy: 'Destroy'
            },
            soapAction: {
                create: 'CreateAction',
                read: 'ReadAction',
                update: 'UpdateAction',
                destroy: 'DestroyAction'
            },
            operationParam: 'operation',
            targetNamespace: 'tns'
        }, config || {}));
    }

    beforeEach(function() {
        Ext.ClassManager.enableNamespaceParseCache = false; 
        Ext.define('spec.Foo', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'id', type: 'int' },
                { name: 'bar', type: 'string' }
            ]
        });
    });
    
    afterEach(function(){
        Ext.ClassManager.enableNamespaceParseCache = true; 
        Ext.ModelManager.types = {};
        Ext.undefine('spec.Foo');
    });

    describe("construction", function() {
        beforeEach(function() {
            makeProxy();
        });
        it("should create a soap reader", function() {
            expect(proxy.reader instanceof Ext.data.soap.Reader).toBe(true);
        });
    });

    describe("doRequest", function() {
        var operation, callback, createdCallback, scope, request;

        function makeRequest(action, proxyConfig, requestParams) {
            makeProxy(proxyConfig);
            callback = function() {};
            createdCallback = function() {};
            scope = {};

            spyOn(Ext.Ajax, 'request');
            spyOn(proxy, 'createRequestCallback').andReturn(createdCallback);

            operation = new Ext.data.Operation({ action: action });

            if (action !== 'read') {
                operation.records = [
                    new spec.Foo({id: 1, bar: 'abc'}),
                    new spec.Foo({id: 2, bar: 'xyz'})
                ]
            }
            if (requestParams) {
                operation.params = requestParams;
            }
            request = proxy.doRequest(operation, callback, scope);
        }

        describe("read operation", function() {
            it("should construct a request object", function() {
                makeRequest('read');
                expect(request instanceof Ext.data.Request).toBe(true);
            });

            it("should pass the request object to Ext.Ajax.request", function() {
                makeRequest('read');
                expect(Ext.Ajax.request).toHaveBeenCalledWith(request);
            });

            it("should set the url in the request object and append the operationParam to the url", function() {
                makeRequest('read');
                expect(request.url).toBe('/soapUrl?operation=Read');
            });

            it("should do an HTTP POST", function() {
                makeRequest('read');
                expect(request.method).toBe('POST');
            });

            it("should set the action in the request object", function() {
                makeRequest('read');
                expect(request.action).toBe('read');
            });

            it("should not set request parameters", function() {
                makeRequest('read');
                expect(request.params).toBeUndefined();
            });

            it("should set the SOAPAction header in the request", function() {
                makeRequest('read');
                expect(request.headers.SOAPAction).toBe('ReadAction');
            });

            it("should allow the addition of extra request headers", function() {
                makeRequest('read', {
                    headers: {
                        wibble: 'wobble'
                    }
                });
                expect(request.headers.SOAPAction).toBe('ReadAction');
                expect(request.headers.wibble).toBe('wobble');
            });

            it("should create a request callback request object", function() {
                makeRequest('read');
                expect(proxy.createRequestCallback).toHaveBeenCalledWith(request, operation, callback, scope);
            });

            it("should set the request callback in the request object", function() {
                makeRequest('read');
                expect(request.callback).toBe(createdCallback);
            });

            it("should encode the parameters into a soap envelope", function() {
                makeRequest('read', null, {
                    foo: 42,
                    bar: 'abc'
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<Read xmlns="tns">',
                                '<foo>42</foo>',
                                '<bar>abc</bar>',
                            '</Read>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should have a soap envelope with empty operation element if there are no paremeters", function() {
                makeRequest('read');
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<Read xmlns="tns">',
                            '</Read>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should merge extraParams into params before creating the soap envelope", function() {
                makeRequest('read', {
                    extraParams: {
                        baz: 9000
                    }
                }, {
                    foo: 42,
                    bar: 'abc'
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<Read xmlns="tns">',
                                '<foo>42</foo>',
                                '<bar>abc</bar>',
                                '<baz>9000</baz>',
                            '</Read>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should give params precedence over extraParams if there is a conflict", function() {
                makeRequest('read', {
                    extraParams: {
                        baz: 9000,
                        bar: 'xyz'
                    }
                }, {
                    foo: 42,
                    bar: 'abc'
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<Read xmlns="tns">',
                                '<foo>42</foo>',
                                '<bar>abc</bar>',
                                '<baz>9000</baz>',
                            '</Read>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should allow configuration of a custom envelope template", function() {
                makeRequest('read', {
                    envelopeTpl: [
                        '<?xml version="1.0" encoding="utf-8" ?>',
                        '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ',
                            'xmlns:xsd= "http://www.w3.org/2001/XMLSchema">',
                            '{[values.bodyTpl.apply(values)]}',
                        '</soap:Envelope>'
                    ]
                }, {
                    foo: 42
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ',
                        'xmlns:xsd= "http://www.w3.org/2001/XMLSchema">',
                        '<soap:Body>',
                            '<Read xmlns="tns">',
                                '<foo>42</foo>',
                            '</Read>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should allow configuration of a custom body template", function() {
                makeRequest('read', {
                    readBodyTpl: [
                        '<soap:Body>',
                            '<RequestContainer>',
                                '<{operation} xmlns="{targetNamespace}">',
                                    '<tpl foreach="params">',
                                        '<{$}>{.}</{$}>',
                                    '</tpl>',
                                '</{operation}>',
                            '</RequestContainer>',
                        '</soap:Body>'
                    ]
                }, {
                    foo: 42
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<RequestContainer>',
                                '<Read xmlns="tns">',
                                    '<foo>42</foo>',
                                '</Read>',
                            '</RequestContainer>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });
        });

        describe("create operation", function() {
            it("should construct a request object", function() {
                makeRequest('create');
                expect(request instanceof Ext.data.Request).toBe(true);
            });

            it("should pass the request object to Ext.Ajax.request", function() {
                makeRequest('create');
                expect(Ext.Ajax.request).toHaveBeenCalledWith(request);
            });

            it("should set the url in the request object and append the operationParam to the url", function() {
                makeRequest('create');
                expect(request.url).toBe('/soapUrl?operation=Create');
            });

            it("should do an HTTP POST", function() {
                makeRequest('create');
                expect(request.method).toBe('POST');
            });

            it("should set the action in the request object", function() {
                makeRequest('create');
                expect(request.action).toBe('create');
            });

            it("should not set request parameters", function() {
                makeRequest('create');
                expect(request.params).toBeUndefined();
            });

            it("should set the SOAPAction header in the request", function() {
                makeRequest('create');
                expect(request.headers.SOAPAction).toBe('CreateAction');
            });

            it("should allow the addition of extra request headers", function() {
                makeRequest('create', {
                    headers: {
                        wibble: 'wobble'
                    }
                });
                expect(request.headers.SOAPAction).toBe('CreateAction');
                expect(request.headers.wibble).toBe('wobble');
            });

            it("should create a request callback request object", function() {
                makeRequest('create');
                expect(proxy.createRequestCallback).toHaveBeenCalledWith(request, operation, callback, scope);
            });

            it("should set the request callback in the request object", function() {
                makeRequest('create');
                expect(request.callback).toBe(createdCallback);
            });

            it("should encode the records into a soap envelope", function() {
                makeRequest('create');
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<Create xmlns="tns">',
                                '<Foo>',
                                    '<id>1</id>',
                                    '<bar>abc</bar>',
                                '</Foo>',
                                '<Foo>',
                                    '<id>2</id>',
                                    '<bar>xyz</bar>',
                                '</Foo>',
                            '</Create>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should allow configuration of a custom envelope template", function() {
                makeRequest('create', {
                    envelopeTpl: [
                        '<?xml version="1.0" encoding="utf-8" ?>',
                        '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ',
                            'xmlns:xsd= "http://www.w3.org/2001/XMLSchema">',
                            '{[values.bodyTpl.apply(values)]}',
                        '</soap:Envelope>'
                    ]
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ',
                        'xmlns:xsd= "http://www.w3.org/2001/XMLSchema">',
                        '<soap:Body>',
                            '<Create xmlns="tns">',
                                '<Foo>',
                                    '<id>1</id>',
                                    '<bar>abc</bar>',
                                '</Foo>',
                                '<Foo>',
                                    '<id>2</id>',
                                    '<bar>xyz</bar>',
                                '</Foo>',
                            '</Create>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should allow configuration of a custom body template", function() {
                makeRequest('create', {
                    createBodyTpl: [
                        '<soap:Body>',
                            '<RequestContainer>',
                                '<{operation} xmlns="{targetNamespace}">',
                                    '<tpl for="records">',
                                        '{% var recordName=values.modelName.split(".").pop(); %}',
                                        '<{[recordName]}>',
                                            '<tpl for="fields">',
                                                '<{name}>{[parent.get(values.name)]}</{name}>',
                                            '</tpl>',
                                        '</{[recordName]}>',
                                    '</tpl>',
                                '</{operation}>',
                            '</RequestContainer>',
                        '</soap:Body>'
                    ]
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<RequestContainer>',
                                '<Create xmlns="tns">',
                                    '<Foo>',
                                        '<id>1</id>',
                                        '<bar>abc</bar>',
                                    '</Foo>',
                                    '<Foo>',
                                        '<id>2</id>',
                                        '<bar>xyz</bar>',
                                    '</Foo>',
                                '</Create>',
                            '</RequestContainer>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });
        });

        describe("update operation", function() {
            it("should construct a request object", function() {
                makeRequest('update');
                expect(request instanceof Ext.data.Request).toBe(true);
            });

            it("should pass the request object to Ext.Ajax.request", function() {
                makeRequest('update');
                expect(Ext.Ajax.request).toHaveBeenCalledWith(request);
            });

            it("should set the url in the request object and append the operationParam to the url", function() {
                makeRequest('update');
                expect(request.url).toBe('/soapUrl?operation=Update');
            });

            it("should do an HTTP POST", function() {
                makeRequest('update');
                expect(request.method).toBe('POST');
            });

            it("should set the action in the request object", function() {
                makeRequest('update');
                expect(request.action).toBe('update');
            });

            it("should not set request parameters", function() {
                makeRequest('update');
                expect(request.params).toBeUndefined();
            });

            it("should set the SOAPAction header in the request", function() {
                makeRequest('update');
                expect(request.headers.SOAPAction).toBe('UpdateAction');
            });

            it("should allow the addition of extra request headers", function() {
                makeRequest('update', {
                    headers: {
                        wibble: 'wobble'
                    }
                });
                expect(request.headers.SOAPAction).toBe('UpdateAction');
                expect(request.headers.wibble).toBe('wobble');
            });

            it("should create a request callback request object", function() {
                makeRequest('update');
                expect(proxy.createRequestCallback).toHaveBeenCalledWith(request, operation, callback, scope);
            });

            it("should set the request callback in the request object", function() {
                makeRequest('update');
                expect(request.callback).toBe(createdCallback);
            });

            it("should encode the records into a soap envelope", function() {
                makeRequest('update');
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<Update xmlns="tns">',
                                '<Foo>',
                                    '<id>1</id>',
                                    '<bar>abc</bar>',
                                '</Foo>',
                                '<Foo>',
                                    '<id>2</id>',
                                    '<bar>xyz</bar>',
                                '</Foo>',
                            '</Update>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should allow configuration of a custom envelope template", function() {
                makeRequest('update', {
                    envelopeTpl: [
                        '<?xml version="1.0" encoding="utf-8" ?>',
                        '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ',
                            'xmlns:xsd= "http://www.w3.org/2001/XMLSchema">',
                            '{[values.bodyTpl.apply(values)]}',
                        '</soap:Envelope>'
                    ]
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ',
                        'xmlns:xsd= "http://www.w3.org/2001/XMLSchema">',
                        '<soap:Body>',
                            '<Update xmlns="tns">',
                                '<Foo>',
                                    '<id>1</id>',
                                    '<bar>abc</bar>',
                                '</Foo>',
                                '<Foo>',
                                    '<id>2</id>',
                                    '<bar>xyz</bar>',
                                '</Foo>',
                            '</Update>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should allow configuration of a custom body template", function() {
                makeRequest('update', {
                    updateBodyTpl: [
                        '<soap:Body>',
                            '<RequestContainer>',
                                '<{operation} xmlns="{targetNamespace}">',
                                    '<tpl for="records">',
                                        '{% var recordName=values.modelName.split(".").pop(); %}',
                                        '<{[recordName]}>',
                                            '<tpl for="fields">',
                                                '<{name}>{[parent.get(values.name)]}</{name}>',
                                            '</tpl>',
                                        '</{[recordName]}>',
                                    '</tpl>',
                                '</{operation}>',
                            '</RequestContainer>',
                        '</soap:Body>'
                    ]
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<RequestContainer>',
                                '<Update xmlns="tns">',
                                    '<Foo>',
                                        '<id>1</id>',
                                        '<bar>abc</bar>',
                                    '</Foo>',
                                    '<Foo>',
                                        '<id>2</id>',
                                        '<bar>xyz</bar>',
                                    '</Foo>',
                                '</Update>',
                            '</RequestContainer>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });
        });

        describe("destroy operation", function() {
            it("should construct a request object", function() {
                makeRequest('destroy');
                expect(request instanceof Ext.data.Request).toBe(true);
            });

            it("should pass the request object to Ext.Ajax.request", function() {
                makeRequest('destroy');
                expect(Ext.Ajax.request).toHaveBeenCalledWith(request);
            });

            it("should set the url in the request object and append the operationParam to the url", function() {
                makeRequest('destroy');
                expect(request.url).toBe('/soapUrl?operation=Destroy');
            });

            it("should do an HTTP POST", function() {
                makeRequest('destroy');
                expect(request.method).toBe('POST');
            });

            it("should set the action in the request object", function() {
                makeRequest('destroy');
                expect(request.action).toBe('destroy');
            });

            it("should not set request parameters", function() {
                makeRequest('destroy');
                expect(request.params).toBeUndefined();
            });

            it("should set the SOAPAction header in the request", function() {
                makeRequest('destroy');
                expect(request.headers.SOAPAction).toBe('DestroyAction');
            });

            it("should allow the addition of extra request headers", function() {
                makeRequest('destroy', {
                    headers: {
                        wibble: 'wobble'
                    }
                });
                expect(request.headers.SOAPAction).toBe('DestroyAction');
                expect(request.headers.wibble).toBe('wobble');
            });

            it("should create a request callback request object", function() {
                makeRequest('destroy');
                expect(proxy.createRequestCallback).toHaveBeenCalledWith(request, operation, callback, scope);
            });

            it("should set the request callback in the request object", function() {
                makeRequest('destroy');
                expect(request.callback).toBe(createdCallback);
            });

            it("should encode the records into a soap envelope", function() {
                makeRequest('destroy');
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<Destroy xmlns="tns">',
                                '<Foo>',
                                    '<id>1</id>',
                                    '<bar>abc</bar>',
                                '</Foo>',
                                '<Foo>',
                                    '<id>2</id>',
                                    '<bar>xyz</bar>',
                                '</Foo>',
                            '</Destroy>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should allow configuration of a custom envelope template", function() {
                makeRequest('destroy', {
                    envelopeTpl: [
                        '<?xml version="1.0" encoding="utf-8" ?>',
                        '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ',
                            'xmlns:xsd= "http://www.w3.org/2001/XMLSchema">',
                            '{[values.bodyTpl.apply(values)]}',
                        '</soap:Envelope>'
                    ]
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ',
                        'xmlns:xsd= "http://www.w3.org/2001/XMLSchema">',
                        '<soap:Body>',
                            '<Destroy xmlns="tns">',
                                '<Foo>',
                                    '<id>1</id>',
                                    '<bar>abc</bar>',
                                '</Foo>',
                                '<Foo>',
                                    '<id>2</id>',
                                    '<bar>xyz</bar>',
                                '</Foo>',
                            '</Destroy>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });

            it("should allow configuration of a custom body template", function() {
                makeRequest('destroy', {
                    destroyBodyTpl: [
                        '<soap:Body>',
                            '<RequestContainer>',
                                '<{operation} xmlns="{targetNamespace}">',
                                    '<tpl for="records">',
                                        '{% var recordName=values.modelName.split(".").pop(); %}',
                                        '<{[recordName]}>',
                                            '<tpl for="fields">',
                                                '<{name}>{[parent.get(values.name)]}</{name}>',
                                            '</tpl>',
                                        '</{[recordName]}>',
                                    '</tpl>',
                                '</{operation}>',
                            '</RequestContainer>',
                        '</soap:Body>'
                    ]
                });
                expect(request.xmlData).toBe([
                    '<?xml version="1.0" encoding="utf-8" ?>',
                    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
                        '<soap:Body>',
                            '<RequestContainer>',
                                '<Destroy xmlns="tns">',
                                    '<Foo>',
                                        '<id>1</id>',
                                        '<bar>abc</bar>',
                                    '</Foo>',
                                    '<Foo>',
                                        '<id>2</id>',
                                        '<bar>xyz</bar>',
                                    '</Foo>',
                                '</Destroy>',
                            '</RequestContainer>',
                        '</soap:Body>',
                    '</soap:Envelope>'
                ].join(''));
            });
        });
    });
});