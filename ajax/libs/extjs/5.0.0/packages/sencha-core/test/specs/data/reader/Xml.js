describe("Ext.data.reader.Xml", function() {
    var reader,
        responseText,
        readData,
        createReader,
        user,
        orders,
        ajaxResponse,
        parseXml = function parseXml(str) {
            if (window.ActiveXObject) {
                var doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.loadXML(str);
                return doc;
            } else if (window.DOMParser) {
                return (new DOMParser()).parseFromString(str, 'text/xml');
            }
            return '';
        }, getXml = function(str){
            str = '<root>' + str + '</root>';
            return parseXml(str);
        }, DQ;
        
    beforeEach(function() {
        DQ = Ext.DomQuery;
        Ext.DomQuery = {
            isXml: function(el) {
                var docEl = (el ? el.ownerDocument || el : 0).documentElement;
                return docEl ? docEl.nodeName !== "HTML" : false;
            },
            selectNode : function(path, root){
                return Ext.DomQuery.select(path, root, null, true)[0];
            },
            select: function(path, root, type, single) {
                if (typeof root == 'string') {
                    return [];
                }
                return single ? [ root.querySelector(path) ] : Ext.Array.toArray(root.querySelectorAll(path));
            }
        }; 
    });
    
    afterEach(function() {
        Ext.DomQuery = DQ;
    });
    
    describe("extractors", function(){
        /**
         * All the values read from the XML document should be strings or XML nodes.
         */
        function createReader(cfg) {
            Ext.define('spec.FooXmlTest', {
                extend: 'Ext.data.Model',
                fields: ['field']
            });
            
            cfg = cfg || {};
            reader = new Ext.data.reader.Xml(Ext.apply({
                model: 'spec.FooXmlTest'
            }, cfg));
        }

        afterEach(function () {
            Ext.data.Model.schema.clear();
            Ext.undefine('spec.FooXmlTest');
        });
        
        it("should run function extractors in the reader scope", function(){
            var actual;
            
            createReader({
                successProperty: function(){
                    actual = this;
                    return true;
                }
            });
            reader.getSuccess({
                success: true
            });
            expect(actual).toBe(reader);
        });
        
        describe("getTotal", function(){
            it("should default to total", function(){
                createReader();
                expect(reader.getTotal(getXml('<total>10</total>'))).toBe('10');
            });
            
            it("should have no getTotal method if the totalProperty isn't specified", function(){
                createReader({
                    totalProperty: ''
                });
                expect(reader.getTotal).toBeUndefined();
            });
            
            it("should read the specified property name", function(){
                createReader({
                    totalProperty: 'foo'
                });
                expect(reader.getTotal(getXml('<foo>17</foo>'))).toBe('17');
            });
            
            it("should accept a function configuration", function(){
                createReader({
                    totalProperty: function(root){
                        return this.getNodeValue(root.firstChild.childNodes[2]);
                    }
                });
                expect(reader.getTotal(getXml('<node1>1</node1><node2>2</node2><node3>3</node3>'))).toBe('3');
            });
            
            xit("should be able to use some xpath", function(){
                createReader({
                    totalProperty: 'foo/bar'
                });
                expect(reader.getTotal(getXml('<foo><bar>18</bar></foo>'))).toBe('18');
            });
            
            xit("should support attribute reading", function(){
                createReader({
                    totalProperty: '@total'
                });
                expect(reader.getTotal(parseXml('<node total="11" />').firstChild)).toBe('11');
            });
        });
        
        describe("getSuccess", function(){
            it("should default to success", function(){
                createReader();
                expect(reader.getSuccess(getXml('<success>true</success>'))).toBe('true');
            });
            
            it("should have no getSuccess method if the successProperty isn't specified", function(){
                createReader({
                    successProperty: ''
                });
                expect(reader.getSuccess).toBeUndefined();
            });
            
            it("should read the specified property name", function(){
                createReader({
                    successProperty: 'foo'
                });
                expect(reader.getSuccess(getXml('<foo>false</foo>'))).toBe('false');
            });
            
            it("should accept a function configuration", function(){
                createReader({
                    successProperty: function(root){
                        return this.getNodeValue(root.firstChild.childNodes[0]);
                    }
                });
                expect(reader.getSuccess(getXml('<node1>true</node1><node2>false</node2><node3>false</node3>'))).toBe('true');
            });
            
            xit("should be able to use some xpath", function(){
                createReader({
                    successProperty: 'a/node/path'
                });
                expect(reader.getSuccess(getXml('<a><node><path>false</path></node></a>'))).toBe('false');
            });
            
            xit("should support attribute reading", function(){
                createReader({
                    totalProperty: '@success'
                });
                expect(reader.getTotal(parseXml('<node success="true" />').firstChild)).toBe('true');
            });
        });
        
        describe("getMessage", function(){
            it("should default to undefined", function(){
                createReader();
                expect(reader.getMessage).toBeUndefined();
            });
            
            it("should have no getMessage method if the messageProperty isn't specified", function(){
                createReader({
                    messageProperty: ''
                });
                expect(reader.getMessage).toBeUndefined();
            });
            
            it("should read the specified property name", function(){
                createReader({
                    messageProperty: 'foo'
                });
                expect(reader.getMessage(getXml('<foo>a msg</foo>'))).toBe('a msg');
            });
            
            it("should accept a function configuration", function(){
                createReader({
                    messageProperty: function(root){
                        return this.getNodeValue(root.firstChild.childNodes[1]);
                    }
                });
                expect(reader.getMessage(getXml('<node1>msg1</node1><node2>msg2</node2><node3>msg3</node3>'))).toBe('msg2');
            });
            
            xit("should be able to use some xpath", function(){
                createReader({
                    messageProperty: 'some/nodes'
                });
                expect(reader.getMessage(getXml('<some><nodes>message here</nodes></some>'))).toBe('message here');
            });
            
            xit("should support attribute reading", function(){
                createReader({
                    totalProperty: '@message'
                });
                expect(reader.getTotal(parseXml('<node message="attribute msg" />').firstChild)).toBe('attribute msg');
            });
        });
        
        describe("fields", function(){
            var rawOptions = {
                recordCreator: Ext.identityFn
            };
            function createReader(fields, readerCfg) {
                Ext.define('spec.XmlFieldTest', {
                    extend: 'Ext.data.Model',
                    fields: fields
                });
                reader = new Ext.data.reader.Xml(Ext.apply({
                    model: 'spec.XmlFieldTest',
                    record: 'root'
                }, readerCfg));
            }

            afterEach(function(){
                Ext.data.Model.schema.clear();
                Ext.undefine('spec.XmlFieldTest');
            });
            
            it("should read the name if no mapping is specified", function(){
                createReader(['field']);
                var result = reader.readRecords(getXml('<field>val</field>').firstChild, rawOptions).getRecords()[0];
                expect(result.field).toBe('val');
            });
            
            it("should give precedence to the mapping", function(){
                createReader([{
                    name: 'field',
                    mapping: 'other'
                }]);
                var result = reader.readRecords(getXml('<field>val</field><other>real value</other>').firstChild, rawOptions).getRecords()[0];
                expect(result.field).toBe('real value');
            });
            
            it("should handle dot notation mapping with nested undefined properties", function(){
                createReader([{
                    name: 'field',
                    mapping: 'some.nested.property'
                }]);
                var result = reader.readRecords(getXml('<foo>val</foo>').firstChild, rawOptions).getRecords()[0];
                expect(result.field).toBeUndefined(); // default value
            });
            
            it("should accept a function", function(){
                createReader([{
                    name: 'field',
                    mapping: function(root){
                        return reader.getNodeValue(root.childNodes[1]);
                    }
                }]);
                var result = reader.readRecords(getXml('<node1>a</node1><node2>b</node2><node3>c</node3>'), rawOptions).getRecords()[0];
                expect(result.field).toBe('b');
            });
            
            xit("should allow basic xpath", function(){
                createReader([{
                    name: 'field',
                    mapping: 'some/xpath/here'
                }]);
                var result = reader.readRecords(getXml('<some><xpath><here>a value</here></xpath></some>'), rawOptions).getRecords()[0];
                expect(result.field).toBe('a value');
            });
                        
            xit("should support attribute reading", function(){
                createReader([{
                    name: 'field',
                    mapping: '@other'
                }]);
                var result = reader.readRecords(parseXml('<node other="attr value" />').firstChild, rawOptions).getRecords()[0];
                expect(result.field).toBe('attr value');
            });

            xit("should read fields from xml nodes that have a namespace prefix", function() {
                createReader(['field'], {namespace: 'n'});
                var result = reader.readRecords(getXml('<n:field xmlns:n="nns">val</n:field>').firstChild, rawOptions).getRecords()[0];
                expect(result.field).toBe('val');

            });

            xit("should read field data from a mapped xml node with namespace prefix", function(){
                createReader([{
                    name: 'field',
                    mapping: 'm|other'
                }]);
                var result = reader.readRecords(getXml(
                    '<n:field xmlns:n="nns">val</n:field><m:other xmlns:m="mns">real value</m:other>'
                ).firstChild, rawOptions).getRecords()[0];
                expect(result.field).toBe('real value');
            });
        });
    });
    
    xdescribe("reading data", function() {
        var readData, user;

        beforeEach(function() {
            Ext.define('spec.XmlReader', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'id',    mapping: 'idProp', type: 'int'},
                    {name: 'name',  mapping: 'FullName', type: 'string'},
                    {name: 'email', mapping: '@email', type: 'string'}
                ]
            });

            reader = new Ext.data.reader.Xml({
                root: 'data',
                totalProperty: 'totalProp',
                messageProperty: 'messageProp',
                successProperty: 'successProp',
                model: 'spec.XmlReader',
                record: 'user'
            });
            
            ajaxResponse = new MockAjax();

            //FIXME: Has to be a better way?
            responseText = ['<results>',
                '<totalProp>2300</totalProp>',
                '<successProp>true</successProp>',
                '<messageProp>It worked</messageProp>',
                '<data>',
                    '<user email=\"ed@sencha.com\">',
                        '<idProp>123</idProp>',
                        '<FullName>Ed Spencer</FullName>',
                    '</user>',
                '</data>',
            '</results>'].join('');
            
            ajaxResponse.complete({
                status: 200,
                statusText: 'OK',
                responseText: responseText,
                responseHeaders: {
                    "Content-type": "application/xml"
                }
            });
            
            readData = reader.read(ajaxResponse);
            user = readData.getRecords()[0];
        });

        afterEach(function() {
            Ext.data.Model.schema.clear();
            Ext.undefine('spec.XmlReader');
        });
        
        it("should extract the correct total", function() {
            expect(readData.getTotal()).toBe(2300);
        });

        it("should extract success", function() {
            expect(readData.getSuccess()).toBe(true);
        });
        
        it("should extract count", function() {
            expect(readData.getCount()).toBe(1);
        });

        it("should extract the message", function() {
            expect(readData.getMessage()).toBe("It worked");
        });

        it("should extract the id", function() {
            expect(user.getId()).toBe(123);
        });

        it("should respect field mappings", function() {
            expect(user.get('name')).toBe("Ed Spencer");
        });
        
        it("should respect field mappings containing @", function() {
            expect(user.get('email')).toBe("ed@sencha.com");
        });
    });
    
    xdescribe("loading nested data", function() {
        //We have four models - User, Order, OrderItem and Product
        beforeEach(function() {
            ajaxResponse = new MockAjax();

            //FIXME: Has to be a better way?
            responseText = ['<users>',
                '<user>',
                    '<id>123</id>',
                    '<name>Ed</name>',
                    '<orders>',
                        '<order>',
                            '<id>50</id>',
                            '<total>100</total>',
                            '<order_items>',
                                '<order_item>',
                                    '<id>20</id>',
                                    '<price>40</price>',
                                    '<quantity>2</quantity>',
                                    '<product>',
                                        '<id>1000</id>',
                                        '<name>MacBook Pro</name>',
                                    '</product>',
                                '</order_item>',
                                '<order_item>',
                                    '<id>21</id>',
                                    '<price>20</price>',
                                    '<quantity>1</quantity>',
                                    '<product>',
                                        '<id>1001</id>',
                                        '<name>iPhone</name>',
                                    '</product>',
                                '</order_item>',
                            '</order_items>',
                        '</order>',
                        '<order>',
                            '<id>51</id>',
                            '<total>10</total>',
                            '<order_items>',
                                '<order_item>',
                                    '<id>22</id>',
                                    '<price>10</price>',
                                    '<quantity>1</quantity>',
                                    '<product>',
                                        '<id>1002</id>',
                                        '<name>iPad</name>',
                                    '</product>',
                                '</order_item>',
                            '</order_items>',
                        '</order>',
                    '</orders>',
                '</user>',
            '</users>'].join('');

            ajaxResponse.complete({
                status: 200,
                statusText: 'OK',
                responseText: responseText
            });

            Ext.define("spec.User", {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'name'
                ],

                hasMany: {model: 'spec.Order', name: 'orders'},

                proxy: {
                    type: 'rest',
                    reader: {
                        type: 'xml',
                        root: 'users'
                    }
                }
            });

            Ext.define("spec.Order", {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'total'
                ],

                hasMany  : {model: 'spec.OrderItem', name: 'orderItems', associationKey: 'order_items'},
                belongsTo: 'spec.User',

                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'xml',
                        root: 'orders',
                        record: 'order'
                    }
                }
            });

            Ext.define("spec.OrderItem", {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'price', 'quantity', 'order_id', 'product_id'
                ],

                belongsTo: ['spec.Order', {model: 'spec.Product', getterName: 'getProduct', associationKey: 'product'}],

                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'xml',
                        root: 'order_items',
                        record: 'order_item'
                    }
                }
            });

            Ext.define("spec.Product", {
                extend: 'Ext.data.Model',
                fields: [
                    'id', 'name'
                ],

                hasMany: {model: 'spec.OrderItem', name: 'orderItems'},

                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'xml',
                        record: 'product'
                    }
                }
            });

            createReader = function (config) {
                return new Ext.data.reader.Xml(Ext.apply({}, config, {
                    model : "spec.User",
                    root  : "users",
                    record: "user"
                }));
            };
        });

        afterEach(function() {
            Ext.data.Model.schema.clear();
            Ext.undefine('spec.User');
            Ext.undefine('spec.Order');
            Ext.undefine('spec.OrderItem');
            Ext.undefine('spec.Product');
        });
        
        it("should set implicitIncludes to true by default", function() {
            reader = createReader();

            expect(reader.getImplicitIncludes()).toBe(true);
        });

        it("should not parse includes if implicitIncludes is set to false", function() {
            reader = createReader({implicitIncludes: false});
            readData = reader.read(ajaxResponse);
            user = readData.records[0];
            orders = user.orders();

            expect(orders.getCount()).toEqual(0);
        });

        describe("when reading nested data", function() {
            beforeEach(function() {
                reader = createReader();
                readData = reader.read(ajaxResponse);
                user = readData.records[0];
                orders = user.orders();
            });

            it("should populate first-order associations", function() {
                expect(orders.getCount()).toEqual(2);
            });

            it("should populate second-order associations", function() {
                var order = orders.first();

                expect(order.orderItems().getCount()).toEqual(2);
            });

            it("should populate belongsTo associations", function() {
                var order   = orders.first(),
                    item    = order.orderItems().first(),
                    product = item.getProduct();

                expect(product.get('name')).toEqual('MacBook Pro');
            });
        });
    });

    describe("reading xhr", function() {
        var xml = '<users><success>true</success><user><name>Ben</name><location>Boston</location></user><user><name>Mike</name><location>Redwood City</location></user><user><name>Nick</name><location>Kansas City</location></user></users>',
            goodResponse = {
                responseText: 'something',
                responseXML: parseXml(xml)
            },
            badResponse = {
                responseText: 'something',
                responseXML: null
            };

        beforeEach(function() {
            Ext.define('spec.User', {
                extend: 'Ext.data.Model',
                fields: ['name', 'location']
            });

            reader = new Ext.data.reader.Xml({
                record: 'user',
                model: 'spec.User',
                listeners: {
                    exception: function (reader, response, errorMsg, eOpts) {
                    }
                }
            });

            spyOn(reader, 'readRecords').andCallThrough();
            spyOn(reader, 'getResponseData').andCallThrough();
        });

        afterEach(function() {
            Ext.data.Model.schema.clear();
            Ext.undefine('spec.User');
        });
        
        function doRead(response) {
            return reader.read(response);
        }

        describe("if there is a responseXML property", function() {
            describe("if there is valid XML", function() {
                it("should call readRecords", function() {
                    doRead(goodResponse);
                    expect(reader.readRecords).toHaveBeenCalled();
                });
    
                it("should be successful", function() {
                    expect(doRead(goodResponse).getSuccess()).toBe(true);
                });

                it("should return the expected number of records", function() {
                    expect(doRead(goodResponse).getCount()).toBe(3);
                });

     
                it("should not return a non-empty dataset", function() {
                    expect(doRead(goodResponse).getRecords().length).toBeGreaterThan(0);
                });
            });

            describe("if there is invalid XML", function() {
                it("should not call readRecords", function() {
                    doRead(badResponse);
                    expect(reader.readRecords).not.toHaveBeenCalled();
                });
    
                it("should not be successful", function() {
                    expect(doRead(badResponse).getSuccess()).toBe(false);
                });

                it("should not return any records", function() {
                    expect(doRead(badResponse).getTotal()).toBe(0);
                });
    
                it("should return any empty dataset", function() {
                    expect(doRead(badResponse).getRecords().length).toBe(0);
                });
            });
        });

        describe("if there is no responseText property", function() {
            beforeEach(function() {
                doRead("something");
            });

            it("should not call readRecords", function() {
                expect(reader.getResponseData).not.toHaveBeenCalled();
            });
        });
    });
});
