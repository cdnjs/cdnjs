describe("Ext.data.amf.XmlEncoder", function() {

    describe("clear", function() {
        it("should reset body when called", function() {
            var encoder = Ext.create('Ext.data.amf.XmlEncoder');
            encoder.writeObject(1);
            expect(encoder.getBody().length).not.toEqual(0);
            encoder.clear();
            expect(encoder.getBody().length).toEqual(0);
        });
    });

    describe("AMFX", function() {

        var encoder = Ext.create('Ext.data.amf.XmlEncoder');
        var secondEncoder = Ext.create('Ext.data.amf.XmlEncoder');


        beforeEach(function() {
            encoder.clear(); // reset encoder
            secondEncoder.clear();
        });

        describe("data types", function() {

            describe("undefined", function() {
                it("should encode undefined", function() {
                    encoder.writeObject(undefined);
                    expect(encoder.getBody()).toEqual("<null />");
                });
            });

            describe("null", function() {
                it("should encode null", function() {
                    encoder.writeObject(null);
                    expect(encoder.getBody()).toEqual("<null />");
                });
            });

            describe("false", function() {
                it("should encode false", function() {
                    encoder.writeObject(false);
                    expect(encoder.getBody()).toEqual("<false />");
                });
            });

            describe("true", function() {
                it("should encode true", function() {
                    encoder.writeObject(true);
                    expect(encoder.getBody()).toEqual("<true />");
                });
            });

            describe("integer", function() {
                it("should encode 0", function() {
                    encoder.writeObject(0);
                    expect(encoder.getBody()).toEqual("<int>0</int>");
                });

                it("should encode 2^29-1 (the largest possible unsigned 29-bit int)", function() {
                    encoder.writeObject(Math.pow(2, 29) - 1);
                    expect(encoder.getBody()).toEqual("<int>536870911</int>");
                });

                it("should treat Number with integer value as integer", function() {
                    var values = [0, 127, 128, 137, 8526, 16320, 16512, 16576, 32704, 2097088, 4227328, 270532928, Math.pow(2, 29) - 1];
                    for (var i in values) {
                        encoder.clear();
                        secondEncoder.clear();
                        var n = new Number(values[i]);
                        encoder.writeObject(values[i]);
                        secondEncoder.writeObject(n);
                        expect(encoder.getBody()).toEqual(secondEncoder.getBody());
                    }
                });
            });

            describe("double", function() {
                it("should encode 10.333", function() {
                    encoder.writeObject(10.333);
                    expect(encoder.getBody()).toEqual("<double>10.333</double>");
                });

                it("should encode 1.7976931348623157e+308 (largest positive number)", function() {
                    encoder.writeObject(Number.MAX_VALUE);
                    expect(encoder.getBody()).toEqual("<double>1.7976931348623157e+308</double>");
                });

                it("should encode -1.7976931348623157e+308 (largest negative number)", function() {
                    encoder.writeObject(-Number.MAX_VALUE);
                    expect(encoder.getBody()).toEqual("<double>-1.7976931348623157e+308</double>");
                });

                it("should encode 5e-324 (smallest positive number)", function() {
                    encoder.writeObject(Number.MIN_VALUE);
                    expect(encoder.getBody()).toEqual("<double>5e-324</double>");
                });

                it("should encode -5e-324 (smallest negative number)", function() {
                    encoder.writeObject(-Number.MIN_VALUE);
                    expect(encoder.getBody()).toEqual("<double>-5e-324</double>");
                });

                it("should encode subnormal 2.2250738585072014E-308", function() {
                    encoder.writeObject(2.2250738585072014E-308);
                    expect(encoder.getBody()).toEqual("<double>2.2250738585072014e-308</double>");
                });

                it("should encode NaN", function() {
                    encoder.writeObject(NaN);
                    expect(encoder.getBody()).toEqual("<double>NaN</double>");
                });

                it("should encode positive infinity", function() {
                    encoder.writeObject(Infinity);
                    expect(encoder.getBody()).toEqual("<double>Infinity</double>");
                });

                it("should encode negative infinity", function() {
                    encoder.writeObject(-Infinity);
                    expect(encoder.getBody()).toEqual("<double>-Infinity</double>");
                });
            });

            describe("string", function() {
                it("should encode an empty string", function() {
                    var str = '';
                    encoder.writeObject(str);
                    expect(encoder.getBody()).toEqual("<string />");
                });

                // Special thanks to Markus Kuhn's "quickbrown.txt" for the
                // following awesome pangrams.
                // http://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
                it("should encode Danish", function() {
                    var str = "Quizdeltagerne spiste jordbær med fløde, mens " +
                            "cirkusklovnen Wolther spillede på xylofon";
                    encoder.writeObject(str);
                    expect(encoder.getBody()).toEqual("<string>Quizdeltagerne spiste jordbær med fløde, mens cirkusklovnen Wolther spillede på xylofon</string>");
                });

                it("should encode Hebrew", function() {
                    var str = "דג סקרן שט בים מאוכזב ולפתע מצא לו חברה איך הקליטה";
                    encoder.writeObject(str);
                    expect(encoder.getBody()).toEqual("<string>דג סקרן שט בים מאוכזב ולפתע מצא לו חברה איך הקליטה</string>");
                });

            });

            describe("xml document", function() {
                it("should encode an XMLDocument", function() {
                    var strippedBody;
                    var xml = '<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>';
                    var data = [
                        // chrome version
                        '<xml><![CDATA[<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>]]></xml>',
                        // IE 7-8 version
                        '<xml><![CDATA[<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>]]></xml>',
                        // IE9 version
                        '<xml><![CDATA[<root><parent><child id="c1">foo</child><child id="c2"><bar /></child></parent></root>]]></xml>',
                        // Opera version
                        '<xml><![CDATA[<?xml version="1.0"?><root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>]]></xml>'
                    ];

                    // generate a document out of the text
                    var doc;
                    if (window.DOMParser) {
                        doc = (new DOMParser()).parseFromString(xml, "text/xml");
                    } else {
                        doc = new ActiveXObject("Microsoft.XMLDOM");
                        doc.loadXML(xml);
                    }

                    encoder.writeObject(doc);
                    strippedBody = encoder.getBody().replace(/[\r\n]/g, ""); // remove any newlines - IE likes to add those in
                    expect(data).toContain(strippedBody); // note reverseal of expect / contain data to use toContain
                });
            });

            describe("date", function() {
                it("should encode 7/24/2012", function() {
                    encoder.writeObject(new Date(1343164970869));
                    expect(encoder.getBody()).toEqual("<date>1343164970869</date>");
                });

                it("should encode 7/24/1912 (100 years before previous test's date)", function() {
                    encoder.writeObject(new Date(-1812595029131));
                    expect(encoder.getBody()).toEqual("<date>-1812595029131</date>");
                });

                it("should encode the UNIX epoch", function() {
                    encoder.writeObject(new Date(0));
                    expect(encoder.getBody()).toEqual("<date>0</date>");
                });

            });


            describe("array", function() {
                it("should encode an empty array", function() {
                    encoder.writeObject([]);
                    expect(encoder.getBody()).toEqual('<array length="0"></array>');
                });

                it("should encode an array", function() {
                    encoder.writeObject(['a','b','c']);
                    expect(encoder.getBody()).toEqual('<array length="3"><string>a</string><string>b</string><string>c</string></array>');
                });

                it("should encode an array with associative data", function() {
                    var arr = ['a'];
                    arr.b = 1;
                    encoder.writeObject(arr);
                    expect(encoder.getBody()).toEqual('<array length="1" ecma="true"><string>a</string><item name="b"><int>1</int></item></array>');
                });
            });

            describe("object", function() {
                it("should encode an empty anonymous object", function() {
                    encoder.writeObject({});
                    expect(encoder.getBody()).toEqual("<object><traits /></object>");
                });
                it("should encode an anonymous object with data items", function() {
                    encoder.writeObject({1: 1, "str":"string"});
                    expect(encoder.getBody()).toEqual('<object><traits><string>1</string><string>str</string></traits><int>1</int><string>string</string></object>');
                });

            });

            describe("byte-array", function() {
                it("should encode a byte array", function() {
                    encoder.writeByteArray([0, 1,2,3, 0xff]);
                    expect(encoder.getBody()).toEqual("<bytearray>00010203FF</bytearray>");
                });

            });
        });

        describe("AMFX messages", function() {
            it("should write an AMFX message", function() {
                var m = Ext.create('Ext.data.amf.RemotingMessage', {
                    body: 1,
                    clientId: "2",
                    destination: "3",
                    headers: {
                        header: "value"
                    },
                    messageId:"id",
                    operation: "method",
                    timestamp: 0,
                    timeToLive: 0
                });

                encoder.writeAmfxRemotingPacket(m);
                expect(encoder.getBody()).toEqual('<amfx ver="3" xmlns="http://www.macromedia.com/2005/amfx"><body><object type="flex.messaging.messages.RemotingMessage"><traits><string>body</string><string>clientId</string><string>destination</string><string>headers</string><string>messageId</string><string>operation</string><string>source</string><string>timestamp</string><string>timeToLive</string></traits><int>1</int><string>2</string><string>3</string><object><traits><string>header</string></traits><string>value</string></object><string>id</string><string>method</string><string /><int>0</int><int>0</int></object></body></amfx>');
            });
        });

    });


});