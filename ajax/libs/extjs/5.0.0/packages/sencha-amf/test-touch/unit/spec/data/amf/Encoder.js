describe("Ext.data.amf.Encoder", function() {


    describe("clear", function() {
        it("should reset byte array when called", function() {
            var encoder = Ext.create('Ext.data.amf.Encoder');
            encoder.writeObject(1);
            expect(encoder.getBytes().length).not.toEqual(0);
            encoder.clear();
            expect(encoder.getBytes().length).toEqual(0);
        });

        it("should generate a new distinct array and not clear the old one", function() {
            var encoder = Ext.create('Ext.data.amf.Encoder');
            encoder.writeObject(1);
            expect(encoder.getBytes().length).not.toEqual(0);
            var oldBytes = encoder.getBytes(),
                oldLen = oldBytes.length;

            encoder.clear();
            expect(encoder.getBytes()).not.toBe(oldBytes);
            expect(oldBytes.length).toEqual(oldLen);
        });
    });

    describe("AMF3", function() {

        var encoder = Ext.create('Ext.data.amf.Encoder');
        var secondEncoder = Ext.create('Ext.data.amf.Encoder');


        beforeEach(function() {
            encoder.clear(); // reset encoder
            secondEncoder.clear();

            /*
             // define a matcher that compares two arrays, returning true if their
             // sizes are the same and each member has an equivalent numberic value
             // as its counterpart in the other array.
             this.addMatchers( {
             toMatchArray: function(expected) {
             var a = this.actual,
             b = expected,
             notText = this.isNot ? " not" : "";
             // first test array length
             this.message = function() {
             return "Expected " + a + notText + " to be the same length as " + b;
             };
             if (a.length != b.length) {
             return false;
             }
             // now test array item equality
             this.message = function() {
             return "Expected " + a + notText + " to have the same elements as " + b;
             };
             for (var i in a) {
             if (a[i] != b[i]) {
             return false;
             }
             }
             return true;
             }
             });
             */

        });

        describe("data types", function() {

            describe("undefined", function() {
                it("should encode undefined", function() {
                    encoder.writeObject(undefined);
                    expect(encoder.getBytes()).toEqual([0x00]);
                });
            });

            describe("null", function() {
                it("should encode null", function() {
                    encoder.writeObject(null);
                    expect(encoder.getBytes()).toEqual([0x01]);
                });
            });

            describe("false", function() {
                it("should encode false", function() {
                    encoder.writeObject(false);
                    expect(encoder.getBytes()).toEqual([0x02]);
                });
            });

            describe("true", function() {
                it("should encode true", function() {
                    encoder.writeObject(true);
                    expect(encoder.getBytes()).toEqual([0x03]);
                });
            });

            describe("integer", function() {
                it("should encode 0", function() {
                    encoder.writeObject(0);
                    expect(encoder.getBytes()).toEqual([0x04, 0x00]);
                });

                it("should encode 127", function() {
                    encoder.writeObject(127);
                    expect(encoder.getBytes()).toEqual([4,127]);
                });

                it("should encode 128", function() {
                    encoder.writeObject(128);
                    expect(encoder.getBytes()).toEqual([4,129,0]);
                });

                it("should encode 137", function() {
                    encoder.writeObject(137);
                    expect(encoder.getBytes()).toEqual([4,129,9]);
                });

                it("should encode 8256", function() {
                    encoder.writeObject(8256);
                    expect(encoder.getBytes()).toEqual([4,192,64]);
                });

                it("should encode 16320", function() {
                    encoder.writeObject(16320);
                    expect(encoder.getBytes()).toEqual([4,255,64]);
                });

                it("should encode 16512", function() {
                    encoder.writeObject(16512);
                    expect(encoder.getBytes()).toEqual([4,129,129,0]);
                });

                it("should encode 16576", function() {
                    encoder.writeObject(16576);
                    expect(encoder.getBytes()).toEqual([4,129,129,64]);
                });

                it("should encode 32704", function() {
                    encoder.writeObject(32704);
                    expect(encoder.getBytes()).toEqual([4,129,255,64]);
                });

                it("should encode 2097088", function() {
                    encoder.writeObject(2097088);
                    expect(encoder.getBytes()).toEqual([4,255,255,64]);
                });

                it("should encode 4227328", function() {
                    encoder.writeObject(4227328);
                    expect(encoder.getBytes()).toEqual([4,129,129,129,0]);
                });

                it("should decode 270532928", function() {
                    encoder.writeObject(270532928);
                    expect(encoder.getBytes()).toEqual([4,192,192,129,64]);
                });

                it("should encode 2^29-1 (the largest possible unsigned 29-bit int)", function() {
                    encoder.writeObject(Math.pow(2, 29) - 1);
                    expect(encoder.getBytes()).toEqual([4,255,255,255,255]);
                });

                it("should treat Number with integer value as integer", function() {
                    var values = [0, 127, 128, 137, 8526, 16320, 16512, 16576, 32704, 2097088, 4227328, 270532928, Math.pow(2, 29) - 1];
                    for (var i in values) {
                        encoder.clear();
                        secondEncoder.clear();
                        var n = new Number(values[i]);
                        encoder.writeObject(values[i]);
                        secondEncoder.writeObject(n);
                        expect(encoder.getBytes()).toEqual(secondEncoder.getBytes());
                    }
                });
            });

            describe("double", function() {
                it("should encode 10.333", function() {
                    encoder.writeObject(10.333);
                    expect(encoder.getBytes()).toEqual([5,64,36,170,126,249,219,34,209]);
                });

                it("should encode 1.7976931348623157e+308 (largest positive number)", function() {
                    encoder.writeObject(Number.MAX_VALUE);
                    expect(encoder.getBytes()).toEqual([5,127,239,255,255,255,255,255,255]);
                });

                it("should encode -1.7976931348623157e+308 (largest negative number)", function() {
                    encoder.writeObject(-Number.MAX_VALUE);
                    expect(encoder.getBytes()).toEqual([5,255,239,255,255,255,255,255,255]);
                });

                it("should encode 5e-324 (smallest positive number)", function() {
                    encoder.writeObject(Number.MIN_VALUE);
                    expect(encoder.getBytes()).toEqual([5,0,0,0,0,0,0,0,1]);
                });

                it("should encode -5e-324 (smallest negative number)", function() {
                    encoder.writeObject(-Number.MIN_VALUE);
                    expect(encoder.getBytes()).toEqual([5,128,0,0,0,0,0,0,1]);
                });

                it("should encode subnormal 2.2250738585072014E-308", function() {
                    encoder.writeObject(2.2250738585072014E-308);
                    expect(encoder.getBytes()).toEqual([5,0,16,0,0,0,0,0,0]);
                });

                it("should encode NaN", function() {
                    encoder.writeObject(NaN);
                    expect(encoder.getBytes()).toEqual([5,255,248,0,0,0,0,0,0]);
                });

                it("should encode positive infinity", function() {
                    encoder.writeObject(Infinity);
                    expect(encoder.getBytes()).toEqual([5,127,240,0,0,0,0,0,0]);
                });

                it("should encode negative infinity", function() {
                    encoder.writeObject(-Infinity);
                    expect(encoder.getBytes()).toEqual([5,255,240,0,0,0,0,0,0]);
                });
            });

            describe("string", function() {
                it("should encode an empty string", function() {
                    var str = '';
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([6,1]);
                });

                // Special thanks to Markus Kuhn's "quickbrown.txt" for the
                // following awesome pangrams.
                // http://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
                it("should encode Danish", function() {
                    var str = "Quizdeltagerne spiste jordb\u00E6r med fl\u00F8de, mens " +
                        "cirkusklovnen Wolther spillede p\u00E5 xylofon";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,129,53,81,117,105,122,100,101,108,116,97,103,101,114,110,
                        101,32,115,112,105,115,116,101,32,106,111,114,100,98,195,
                        166,114,32,109,101,100,32,102,108,195,184,100,101,44,32,
                        109,101,110,115,32,99,105,114,107,117,115,107,108,111,118,
                        110,101,110,32,87,111,108,116,104,101,114,32,115,112,105,
                        108,108,101,100,101,32,112,195,165,32,120,121,108,111,102,
                        111,110
                    ]);
                });

                it("should encode German", function() {
                    var str = "Falsches \u00DCben von Xylophonmusik qu\u00E4lt jeden gr\u00F6\u00DFeren Zwerg";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,125,70,97,108,115,99,104,101,115,32,195,156,98,101,110,
                        32,118,111,110,32,88,121,108,111,112,104,111,110,109,117,
                        115,105,107,32,113,117,195,164,108,116,32,106,101,100,101,
                        110,32,103,114,195,182,195,159,101,114,101,110,32,90,119,
                        101,114,103
                    ]);
                });

                it("should encode Greek", function() {
                    var str = "\u0393\u03B1\u03B6\u03AD\u03B5\u03C2 \u03BA\u03B1\u1F76 " +
                        "\u03BC\u03C5\u03C1\u03C4\u03B9\u1F72\u03C2 \u03B4\u1F72\u03BD " +
                        "\u03B8\u1F70 \u03B2\u03C1\u1FF6 \u03C0\u03B9\u1F70 \u03C3\u03C4\u1F78 " +
                        "\u03C7\u03C1\u03C5\u03C3\u03B1\u03C6\u1F76 \u03BE\u03AD\u03C6\u03C9\u03C4\u03BF";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,129,79,206,147,206,177,206,182,206,173,206,181,207,130,
                        32,206,186,206,177,225,189,182,32,206,188,207,133,207,129,
                        207,132,206,185,225,189,178,207,130,32,206,180,225,189,
                        178,206,189,32,206,184,225,189,176,32,206,178,207,129,225,
                        191,182,32,207,128,206,185,225,189,176,32,207,131,207,132,
                        225,189,184,32,207,135,207,129,207,133,207,131,206,177,
                        207,134,225,189,182,32,206,190,206,173,207,134,207,137,
                        207,132,206,191
                    ]);
                });

                it("should encode English", function() {
                    var str = "The quick brown fox jumps over the lazy dog";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,87,84,104,101,32,113,117,105,99,107,32,98,114,111,119,
                        110,32,102,111,120,32,106,117,109,112,115,32,111,118,101,
                        114,32,116,104,101,32,108,97,122,121,32,100,111,103
                    ]);
                });

                it("should encode Spanish", function() {
                    var str = "El ping\u00FCino Wenceslao hizo kil\u00F3metros bajo exhaustiva " +
                        "lluvia y";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,129,1,69,108,32,112,105,110,103,195,188,105,110,111,32,
                        87,101,110,99,101,115,108,97,111,32,104,105,122,111,32,
                        107,105,108,195,179,109,101,116,114,111,115,32,98,97,106,
                        111,32,101,120,104,97,117,115,116,105,118,97,32,108,108,
                        117,118,105,97,32,121
                    ]);
                });

                it("should encode French", function() {
                    var str = "l'\u00EEle exigu\u00EB O\u00F9 l'ob\u00E8se jury m\u00FBr F\u00EAte l'ha\u00EF volap\u00FCk, " +
                        "\u00C2ne ex a\u00E9quo au whist, \u00D4tez ce v\u0153u d\u00E9\u00E7u";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,129,85,108,39,195,174,108,101,32,101,120,105,103,117,195,
                        171,32,79,195,185,32,108,39,111,98,195,168,115,101,32,106,
                        117,114,121,32,109,195,187,114,32,70,195,170,116,101,32,
                        108,39,104,97,195,175,32,118,111,108,97,112,195,188,107,
                        44,32,195,130,110,101,32,101,120,32,97,195,169,113,117,
                        111,32,97,117,32,119,104,105,115,116,44,32,195,148,116,
                        101,122,32,99,101,32,118,197,147,117,32,100,195,169,195,
                        167,117
                    ]);
                });

                it("should encode Irish Gaelic", function() {
                    var str = "D'fhuascail \u00CDosa, \u00DArmhac na h\u00D3ighe Beannaithe, p\u00F3r " +
                        "\u00C9ava agus \u00C1dhaimh";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,129,21,68,39,102,104,117,97,115,99,97,105,108,32,195,141,
                        111,115,97,44,32,195,154,114,109,104,97,99,32,110,97,32,
                        104,195,147,105,103,104,101,32,66,101,97,110,110,97,105,
                        116,104,101,44,32,112,195,179,114,32,195,137,97,118,97,32,
                        97,103,117,115,32,195,129,100,104,97,105,109,104
                    ]);
                });

                it("should decode Hungarian", function() {
                    var str = "\u00C1rv\u00EDzt\u0171r\u0151 t\u00FCk\u00F6rf\u00FAr\u00F3g\u00E9p";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,63,195,129,114,118,195,173,122,116,197,177,114,197,
                        145,32,116,195,188,107,195,182,114,102,195,186,114,195,
                        179,103,195,169,112
                    ]);
                });

                it("should encode Icelandic", function() {
                    var str = "K\u00E6mi n\u00FD \u00F6xi h\u00E9r ykist \u00FEj\u00F3fum n\u00FA b\u00E6\u00F0i v\u00EDl og " +
                        "\u00E1drepa";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,123,75,195,166,109,105,32,110,195,189,32,195,182,120,
                        105,32,104,195,169,114,32,121,107,105,115,116,32,195,190,
                        106,195,179,102,117,109,32,110,195,186,32,98,195,166,195,
                        176,105,32,118,195,173,108,32,111,103,32,195,161,100,114,
                        101,112,97
                    ]);
                });

                it("should encode Japanese (Hiragana)", function() {
                    var str = "\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088" +
                        "\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084" +
                        "\u307E\u3051\u3075" +
                        "\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,130,27,227,129,132,227,130,141,227,129,175,227,129,171,
                        227,129,187,227,129,184,227,129,168,227,129,161,227,130,
                        138,227,129,172,227,130,139,227,130,146,227,130,143,227,
                        129,139,227,130,136,227,129,159,227,130,140,227,129,157,
                        227,129,164,227,129,173,227,129,170,227,130,137,227,130,
                        128,227,129,134,227,130,144,227,129,174,227,129,138,227,
                        129,143,227,130,132,227,129,190,227,129,145,227,129,181,
                        227,129,147,227,129,136,227,129,166,227,129,130,227,129,
                        149,227,129,141,227,130,134,227,130,129,227,129,191,227,
                        129,151,227,130,145,227,129,178,227,130,130,227,129,155,
                        227,129,153
                    ]);
                });

                it("should encode Japanese (Katakana)", function() {
                    var str = "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8 \u30C1\u30EA\u30CC\u30EB\u30F2 " +
                        "\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD \u30C4\u30CD\u30CA\u30E9\u30E0 " +
                        "\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE " +
                        "\u30B1\u30D5\u30B3\u30A8\u30C6 \u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7 " +
                        "\u30F1\u30D2\u30E2\u30BB\u30B9\u30F3";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,130,47,227,130,164,227,131,173,227,131,143,227,131,139,
                        227,131,155,227,131,152,227,131,136,32,227,131,129,227,
                        131,170,227,131,140,227,131,171,227,131,178,32,227,131,
                        175,227,130,171,227,131,168,227,130,191,227,131,172,227,
                        130,189,32,227,131,132,227,131,141,227,131,138,227,131,
                        169,227,131,160,32,227,130,166,227,131,176,227,131,142,
                        227,130,170,227,130,175,227,131,164,227,131,158,32,227,
                        130,177,227,131,149,227,130,179,227,130,168,227,131,134,
                        32,227,130,162,227,130,181,227,130,173,227,131,166,227,
                        131,161,227,131,159,227,130,183,32,227,131,177,227,131,
                        146,227,131,162,227,130,187,227,130,185,227,131,179
                    ]);

                });

                it("should encode Hebrew", function() {
                    var str = "\u05D3\u05D2 \u05E1\u05E7\u05E8\u05DF \u05E9\u05D8 \u05D1\u05D9\u05DD " +
                        "\u05DE\u05D0\u05D5\u05DB\u05D6\u05D1 \u05D5\u05DC\u05E4\u05EA\u05E2 \u05DE\u05E6\u05D0 " +
                        "\u05DC\u05D5 \u05D7\u05D1\u05E8\u05D4 \u05D0\u05D9\u05DA \u05D4\u05E7\u05DC\u05D9\u05D8\u05D4";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,129,53,215,147,215,146,32,215,161,215,167,215,168,215,159,
                        32,215,169,215,152,32,215,145,215,153,215,157,32,215,158,
                        215,144,215,149,215,155,215,150,215,145,32,215,149,215,
                        156,215,164,215,170,215,162,32,215,158,215,166,215,144,32,
                        215,156,215,149,32,215,151,215,145,215,168,215,148,32,215,
                        144,215,153,215,154,32,215,148,215,167,215,156,215,153,
                        215,152,215,148
                    ]);
                });

                it("should decode Polish", function() {
                    var str = "Pchn\u0105\u0107 w t\u0119 \u0142\u00F3d\u017A je\u017Ca lub o\u015Bm skrzy\u0144 fig";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,99,80,99,104,110,196,133,196,135,32,119,32,116,196,
                        153,32,197,130,195,179,100,197,186,32,106,101,197,188,97,
                        32,108,117,98,32,111,197,155,109,32,115,107,114,122,121,
                        197,132,32,102,105,103
                    ]);
                });

                it("should decode Russian", function() {
                    var str = "\u0412 \u0447\u0430\u0449\u0430\u0445 \u044E\u0433\u0430 \u0436\u0438\u043B" +
                        " \u0431\u044B \u0446\u0438\u0442\u0440\u0443\u0441? \u0414\u0430, \u043D\u043E" +
                        " \u0444\u0430\u043B\u044C\u0448\u0438\u0432\u044B\u0439" +
                        " \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440!";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        6,129,65,208,146,32,209,135,208,176,209,137,208,176,209,133,
                        32,209,142,208,179,208,176,32,208,182,208,184,208,187,32,
                        208,177,209,139,32,209,134,208,184,209,130,209,128,209,
                        131,209,129,63,32,208,148,208,176,44,32,208,189,208,190,
                        32,209,132,208,176,208,187,209,140,209,136,208,184,208,
                        178,209,139,208,185,32,209,141,208,186,208,183,208,181,
                        208,188,208,191,208,187,209,143,209,128,33
                    ]);
                });

                /* // it does NOT support string references
                 it("should decode string references", function() {
                 expect(decodeValue([
                 10,11,1,9,102,111,117,114,6,7,98,97,114,11,116,104,114,
                 101,101,6,7,102,111,111,7,116,119,111,6,2,7,111,110,101,
                 6,6,1
                 ])).toEqual({
                 one: 'foo',
                 two: 'bar',
                 three: 'foo',
                 four: 'bar'
                 });
                 });
                 */
            });

            describe("xml-doc", function() {
                it("should encode an XMLDocument", function() {
                    var xml = '<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>';
                    var data = [
                        // chrome version is clean
                        [
                            7,129,43,60,114,111,111,116,62,60,112,97,114,101,110,
                            116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                            62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,
                            105,108,100,32,105,100,61,34,99,50,34,62,60,98,97,114,
                            47,62,60,47,99,104,105,108,100,62,60,47,112,97,114,101,
                            110,116,62,60,47,114,111,111,116,62
                        ],
                        [ // IE version
                            7,129,47,60,114,111,111,116,62,60,112,97,114,101,110,
                            116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                            62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,
                            105,108,100,32,105,100,61,34,99,50,34,62,60,98,97,114,
                            47,62,60,47,99,104,105,108,100,62,60,47,112,97,114,101,
                            110,116,62,60,47,114,111,111,116,62,
                            13, 10
                        ],
                        [ // IE 9 version
                            7, 129, 45, 60, 114, 111, 111, 116, 62, 60, 112, 97,
                            114, 101, 110, 116, 62, 60, 99, 104, 105, 108, 100, 32,
                            105, 100, 61, 34, 99, 49, 34, 62, 102, 111, 111, 60, 47,
                            99, 104, 105, 108, 100, 62, 60, 99, 104, 105, 108, 100,
                            32, 105, 100, 61, 34, 99, 50, 34, 62, 60, 98, 97, 114,
                            32, 47, 62, 60, 47, 99, 104, 105, 108, 100, 62, 60, 47,
                            112, 97, 114, 101, 110, 116, 62, 60, 47, 114, 111, 111,
                            116, 62
                        ],
                        [ // opera version: <?xml version="1.0"?><root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>
                            7, 129, 85, 60, 63, 120, 109, 108, 32, 118, 101, 114,
                            115, 105, 111, 110, 61, 34, 49, 46, 48, 34, 63, 62,
                            60, 114, 111, 111, 116, 62, 60, 112, 97, 114, 101,
                            110, 116, 62, 60, 99, 104, 105, 108, 100, 32, 105,
                            100, 61, 34, 99, 49, 34, 62, 102, 111, 111, 60, 47,
                            99, 104, 105, 108, 100, 62, 60, 99, 104, 105, 108,
                            100, 32, 105, 100, 61, 34, 99, 50, 34, 62, 60, 98,
                            97, 114, 47, 62, 60, 47, 99, 104, 105, 108, 100, 62,
                            60, 47, 112, 97, 114, 101, 110, 116, 62, 60, 47, 114,
                            111, 111, 116, 62
                        ]
                    ];

                    // generate a document out of the text
                    var doc;
                    if (window.DOMParser) {
                        doc = (new DOMParser()).parseFromString(xml, "text/xml");
                    } else {
                        doc = new ActiveXObject("Microsoft.XMLDOM");
                        doc.loadXML(xml);
                    }

                    encoder.write3XmlDocument(doc);
                    expect(data).toContain(encoder.getBytes()); // note reverseal of expect / contain data to use toContain
                });
            });

            describe("xml", function() {
                it("should encode an XML object", function() {
                    var xml = '<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>';
                    var data = [
                        // Chrome version is clean
                        [
                            11,129,43,60,114,111,111,116,62,60,112,97,114,101,110,
                            116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                            62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,
                            105,108,100,32,105,100,61,34,99,50,34,62,60,98,97,114,
                            47,62,60,47,99,104,105,108,100,62,60,47,112,97,114,101,
                            110,116,62,60,47,114,111,111,116,62
                        ],
                        // IE7 version might contain new lines
                        [
                            11,129,47,60,114,111,111,116,62,60,112,97,114,101,110,
                            116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                            62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,
                            105,108,100,32,105,100,61,34,99,50,34,62,60,98,97,114,
                            47,62,60,47,99,104,105,108,100,62,60,47,112,97,114,101,
                            110,116,62,60,47,114,111,111,116,62,
                            13,10
                        ],
                        [ // IE 9
                            11, 129, 45, 60, 114, 111, 111, 116, 62, 60, 112, 97,
                            114, 101, 110, 116, 62, 60, 99, 104, 105, 108, 100, 32,
                            105, 100, 61, 34, 99, 49, 34, 62, 102, 111, 111, 60, 47,
                            99, 104, 105, 108, 100, 62, 60, 99, 104, 105, 108, 100,
                            32, 105, 100, 61, 34, 99, 50, 34, 62, 60, 98, 97, 114,
                            32, 47, 62, 60, 47, 99, 104, 105, 108, 100, 62, 60, 47,
                            112, 97, 114, 101, 110, 116, 62, 60, 47, 114, 111, 111,
                            116, 62
                        ],
                        [ // opera version: <?xml version="1.0"?><root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>
                            11, 129, 85, 60, 63, 120, 109, 108, 32, 118, 101, 114,
                            115, 105, 111, 110, 61, 34, 49, 46, 48, 34, 63, 62, 60,
                            114, 111, 111, 116, 62, 60, 112, 97, 114, 101, 110, 116,
                            62, 60, 99, 104, 105, 108, 100, 32, 105, 100, 61, 34, 99,
                            49, 34, 62, 102, 111, 111, 60, 47, 99, 104, 105, 108,
                            100, 62, 60, 99, 104, 105, 108, 100, 32, 105, 100, 61,
                            34, 99, 50, 34, 62, 60, 98, 97, 114, 47, 62, 60, 47, 99,
                            104, 105, 108, 100, 62, 60, 47, 112, 97, 114, 101, 110,
                            116, 62, 60, 47, 114, 111, 111, 116, 62
                        ]
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
                    expect(data).toContain(encoder.getBytes()); // note reverseal of expect / contain data to use toContain
                });
            });

            describe("date", function() {
                it("should encode 7/24/2012", function() {
                    encoder.writeObject(new Date(1343164970869));
                    expect(encoder.getBytes()).toEqual([
                        8,1,66,115,139,173,239,119,80,0
                    ]);
                });

                it("should encode 7/24/1912 (100 years before previous test's date)", function() {
                    encoder.writeObject(new Date(-1812595029131));
                    expect(encoder.getBytes()).toEqual([
                        8,1,194,122,96,113,83,72,176,0
                    ]);
                });

                it("should encode 7/24/2112 (100 years after previous test's date)", function() {
                    encoder.writeObject(new Date(4498838570869));
                    expect(encoder.getBytes()).toEqual([
                        8,1,66,144,93,222,179,29,212,0
                    ]);
                });

                it("should encode the UNIX epoch", function() {
                    encoder.writeObject(new Date(0));
                    expect(encoder.getBytes()).toEqual([
                        8,1,0,0,0,0,0,0,0,0
                    ]);
                });

                it("should encode 9/12/275760 (the largest future javascript date)", function() {
                    encoder.writeObject(new Date(8640000000000000));
                    expect(encoder.getBytes()).toEqual([
                        8,1,67,62,178,8,194,220,0,0
                    ]);
                });

                it("should encode 4/19/-271821 (the largest past javascript date)", function() {
                    encoder.writeObject(new Date(-8640000000000000));
                    expect(encoder.getBytes()).toEqual([
                        8,1,195,62,178,8,194,220,0,0
                    ]);
                });

            });


            describe("array", function() {
                it("should encode an empty array", function() {
                    encoder.writeObject([]);
                    expect(encoder.getBytes()).toEqual([
                        9,1,1
                    ]);
                });
                it("should encode an array", function() {
                    encoder.writeObject(['a','b','c']);
                    expect(encoder.getBytes()).toEqual([
                        9,7,1,6,3,97,6,3,98,6,3,99
                    ]);
                });

            });

            describe("object", function() {
                it("should encode an empty anonymous object", function() {
                    encoder.writeObject({});
                    expect(encoder.getBytes()).toEqual([
                        10,11,1,1
                    ]);
                });
                it("should encode an anonymous object with multiple data types", function() {
                    encoder.writeObject({1: 1, "str":"string", "array": [], "date": new Date(0)});
                    expect(encoder.getBytes()).toEqual([
                        // Note: when serializing from Flash, the order of objects might be different.
                        10,11,1,3,49,4,1,7,115,116,114,6,13,115,116,114,105,110,
                        103,11,97,114,114,97,121,9,1,1,9,100,97,116,101,8,1,0,0,
                        0,0,0,0,0,0,1
                    ]);
                });

            });

            describe("byte-array", function() {
                it("should encode a byte array", function() {
                    encoder.write3ByteArray([0, 1,2,3]);
                    expect(encoder.getBytes()).toEqual([12,9,0,1,2,3]);
                });

            });
        });
    });

    describe("AMF0", function() {

        var encoder = Ext.create('Ext.data.amf.Encoder', {format:0});
        var secondEncoder = Ext.create('Ext.data.amf.Encoder', {format:0});


        beforeEach(function() {
            encoder.clear(); // reset encoder
            secondEncoder.clear();
        });

        describe("data types", function() {

            describe("undefined", function() {
                it("should encode undefined", function() {
                    encoder.writeObject(undefined);
                    expect(encoder.getBytes()).toEqual([0x06]);
                });
            });

            describe("null", function() {
                it("should encode null", function() {
                    encoder.writeObject(null);
                    expect(encoder.getBytes()).toEqual([0x05]);
                });
            });

            describe("false", function() {
                it("should encode false", function() {
                    encoder.writeObject(false);
                    expect(encoder.getBytes()).toEqual([0x01, 0x00]);
                });
            });

            describe("true", function() {
                it("should encode true", function() {
                    encoder.writeObject(true);
                    expect(encoder.getBytes()).toEqual([0x01, 0x01]);
                });
            });

            describe("number", function() {
                it("should encode 10.333", function() {
                    encoder.writeObject(10.333);
                    expect(encoder.getBytes()).toEqual([0,64,36,170,126,249,219,34,209]);
                });

                it("should encode 1.7976931348623157e+308 (largest positive number)", function() {
                    encoder.writeObject(Number.MAX_VALUE);
                    expect(encoder.getBytes()).toEqual([0,127,239,255,255,255,255,255,255]);
                });

                it("should encode -1.7976931348623157e+308 (largest negative number)", function() {
                    encoder.writeObject(-Number.MAX_VALUE);
                    expect(encoder.getBytes()).toEqual([0,255,239,255,255,255,255,255,255]);
                });

                it("should encode 5e-324 (smallest positive number)", function() {
                    encoder.writeObject(Number.MIN_VALUE);
                    expect(encoder.getBytes()).toEqual([0,0,0,0,0,0,0,0,1]);
                });

                it("should encode -5e-324 (smallest negative number)", function() {
                    encoder.writeObject(-Number.MIN_VALUE);
                    expect(encoder.getBytes()).toEqual([0,128,0,0,0,0,0,0,1]);
                });

                it("should encode subnormal 2.2250738585072014E-308", function() {
                    encoder.writeObject(2.2250738585072014E-308);
                    expect(encoder.getBytes()).toEqual([0,0,16,0,0,0,0,0,0]);
                });

                it("should encode NaN", function() {
                    encoder.writeObject(NaN);
                    expect(encoder.getBytes()).toEqual([0,255,248,0,0,0,0,0,0]);
                });

                it("should encode positive infinity", function() {
                    encoder.writeObject(Infinity);
                    expect(encoder.getBytes()).toEqual([0,127,240,0,0,0,0,0,0]);
                });

                it("should encode negative infinity", function() {
                    encoder.writeObject(-Infinity);
                    expect(encoder.getBytes()).toEqual([0,255,240,0,0,0,0,0,0]);
                });
            });

            describe("string", function() {
                it("should encode an empty string", function() {
                    var str = '';
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([0x02, 0x00, 0x00]);
                });

                it("should encode a long string", function() {
                    var str = "a";
                    while (str.length <= 0xffff) {
                        str = str + str; // yes. bad. But should be done in 16 iterations
                    }
                    encoder.writeObject(str);
                    expect(encoder.getBytes()[encoder.getBytes().length-1]).toEqual(str.charCodeAt(0));
                    var expected = [0x0C]; // construct header of array
                    expected.push.apply(expected, encoder.encodeXInt(str.length, 4));
                    expected.push(str.charCodeAt(0));
                    expect(encoder.getBytes().slice(0, 6)).toEqual(expected);
                });

                // Special thanks to Markus Kuhn's "quickbrown.txt" for the
                // following awesome pangrams.
                // http://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
                it("should encode Danish", function() {
                    var str = "Quizdeltagerne spiste jordb\u00E6r med fl\u00F8de, mens " +
                        "cirkusklovnen Wolther spillede p\u00E5 xylofon";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,90,81,117,105,122,100,101,108,116,97,103,101,114,110,
                        101,32,115,112,105,115,116,101,32,106,111,114,100,98,195,
                        166,114,32,109,101,100,32,102,108,195,184,100,101,44,32,
                        109,101,110,115,32,99,105,114,107,117,115,107,108,111,118,
                        110,101,110,32,87,111,108,116,104,101,114,32,115,112,105,
                        108,108,101,100,101,32,112,195,165,32,120,121,108,111,102,
                        111,110
                    ]);
                });

                it("should encode German", function() {
                    var str = "Falsches \u00DCben von Xylophonmusik qu\u00E4lt jeden gr\u00F6\u00DFeren Zwerg";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,62,70,97,108,115,99,104,101,115,32,195,156,98,101,110,
                        32,118,111,110,32,88,121,108,111,112,104,111,110,109,117,
                        115,105,107,32,113,117,195,164,108,116,32,106,101,100,101,
                        110,32,103,114,195,182,195,159,101,114,101,110,32,90,119,
                        101,114,103
                    ]);
                });

                it("should encode Greek", function() {
                    var str = "\u0393\u03B1\u03B6\u03AD\u03B5\u03C2 \u03BA\u03B1\u1F76 " +
                        "\u03BC\u03C5\u03C1\u03C4\u03B9\u1F72\u03C2 \u03B4\u1F72\u03BD \u03B8\u1F70 " +
                        "\u03B2\u03C1\u1FF6 \u03C0\u03B9\u1F70 \u03C3\u03C4\u1F78 " +
                        "\u03C7\u03C1\u03C5\u03C3\u03B1\u03C6\u1F76 \u03BE\u03AD\u03C6\u03C9\u03C4\u03BF";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,103,206,147,206,177,206,182,206,173,206,181,207,130,
                        32,206,186,206,177,225,189,182,32,206,188,207,133,207,129,
                        207,132,206,185,225,189,178,207,130,32,206,180,225,189,
                        178,206,189,32,206,184,225,189,176,32,206,178,207,129,225,
                        191,182,32,207,128,206,185,225,189,176,32,207,131,207,132,
                        225,189,184,32,207,135,207,129,207,133,207,131,206,177,
                        207,134,225,189,182,32,206,190,206,173,207,134,207,137,
                        207,132,206,191
                    ]);
                });

                it("should encode English", function() {
                    var str = "The quick brown fox jumps over the lazy dog";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,43,84,104,101,32,113,117,105,99,107,32,98,114,111,119,
                        110,32,102,111,120,32,106,117,109,112,115,32,111,118,101,
                        114,32,116,104,101,32,108,97,122,121,32,100,111,103
                    ]);
                });

                it("should encode Spanish", function() {
                    var str = "El ping\u00FCino Wenceslao hizo kil\u00F3metros bajo exhaustiva " +
                        "lluvia y";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,64,69,108,32,112,105,110,103,195,188,105,110,111,32,
                        87,101,110,99,101,115,108,97,111,32,104,105,122,111,32,
                        107,105,108,195,179,109,101,116,114,111,115,32,98,97,106,
                        111,32,101,120,104,97,117,115,116,105,118,97,32,108,108,
                        117,118,105,97,32,121
                    ]);
                });

                it("should encode French", function() {
                    var str = "l'\u00EEle exigu\u00EB O\u00F9 l'ob\u00E8se jury m\u00FBr F\u00EAte l'ha\u00EF volap\u00FCk, " +
                        "\u00C2ne ex a\u00E9quo au whist, \u00D4tez ce v\u0153u d\u00E9\u00E7u";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,106,108,39,195,174,108,101,32,101,120,105,103,117,195,
                        171,32,79,195,185,32,108,39,111,98,195,168,115,101,32,106,
                        117,114,121,32,109,195,187,114,32,70,195,170,116,101,32,
                        108,39,104,97,195,175,32,118,111,108,97,112,195,188,107,
                        44,32,195,130,110,101,32,101,120,32,97,195,169,113,117,
                        111,32,97,117,32,119,104,105,115,116,44,32,195,148,116,
                        101,122,32,99,101,32,118,197,147,117,32,100,195,169,195,
                        167,117
                    ]);
                });

                it("should encode Irish Gaelic", function() {
                    var str = "D'fhuascail \u00CDosa, \u00DArmhac na h\u00D3ighe Beannaithe, p\u00F3r " +
                        "\u00C9ava agus \u00C1dhaimh";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,74,68,39,102,104,117,97,115,99,97,105,108,32,195,141,
                        111,115,97,44,32,195,154,114,109,104,97,99,32,110,97,32,
                        104,195,147,105,103,104,101,32,66,101,97,110,110,97,105,
                        116,104,101,44,32,112,195,179,114,32,195,137,97,118,97,32,
                        97,103,117,115,32,195,129,100,104,97,105,109,104
                    ]);
                });

                it("should decode Hungarian", function() {
                    var str = "\u00C1rv\u00EDzt\u0171r\u0151 t\u00FCk\u00F6rf\u00FAr\u00F3g\u00E9p";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,31,195,129,114,118,195,173,122,116,197,177,114,197,
                        145,32,116,195,188,107,195,182,114,102,195,186,114,195,
                        179,103,195,169,112
                    ]);
                });

                it("should encode Icelandic", function() {
                    var str = "K\u00E6mi n\u00FD \u00F6xi h\u00E9r ykist \u00FEj\u00F3fum n\u00FA b\u00E6\u00F0i " +
                        "v\u00EDl og \u00E1drepa";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,61,75,195,166,109,105,32,110,195,189,32,195,182,120,
                        105,32,104,195,169,114,32,121,107,105,115,116,32,195,190,
                        106,195,179,102,117,109,32,110,195,186,32,98,195,166,195,
                        176,105,32,118,195,173,108,32,111,103,32,195,161,100,114,
                        101,112,97
                    ]);
                });

                it("should encode Japanese (Hiragana)", function() {
                    var str = "\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088" +
                        "\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084" +
                        "\u307E\u3051\u3075" +
                        "\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,141,227,129,132,227,130,141,227,129,175,227,129,171,
                        227,129,187,227,129,184,227,129,168,227,129,161,227,130,
                        138,227,129,172,227,130,139,227,130,146,227,130,143,227,
                        129,139,227,130,136,227,129,159,227,130,140,227,129,157,
                        227,129,164,227,129,173,227,129,170,227,130,137,227,130,
                        128,227,129,134,227,130,144,227,129,174,227,129,138,227,
                        129,143,227,130,132,227,129,190,227,129,145,227,129,181,
                        227,129,147,227,129,136,227,129,166,227,129,130,227,129,
                        149,227,129,141,227,130,134,227,130,129,227,129,191,227,
                        129,151,227,130,145,227,129,178,227,130,130,227,129,155,
                        227,129,153
                    ]);
                });

                it("should encode Japanese (Katakana)", function() {
                    var str = "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8 \u30C1\u30EA\u30CC\u30EB\u30F2 " +
                        "\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD \u30C4\u30CD\u30CA\u30E9\u30E0 " +
                        "\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE " +
                        "\u30B1\u30D5\u30B3\u30A8\u30C6 \u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7 " +
                        "\u30F1\u30D2\u30E2\u30BB\u30B9\u30F3";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,151,227,130,164,227,131,173,227,131,143,227,131,139,
                        227,131,155,227,131,152,227,131,136,32,227,131,129,227,
                        131,170,227,131,140,227,131,171,227,131,178,32,227,131,
                        175,227,130,171,227,131,168,227,130,191,227,131,172,227,
                        130,189,32,227,131,132,227,131,141,227,131,138,227,131,
                        169,227,131,160,32,227,130,166,227,131,176,227,131,142,
                        227,130,170,227,130,175,227,131,164,227,131,158,32,227,
                        130,177,227,131,149,227,130,179,227,130,168,227,131,134,
                        32,227,130,162,227,130,181,227,130,173,227,131,166,227,
                        131,161,227,131,159,227,130,183,32,227,131,177,227,131,
                        146,227,131,162,227,130,187,227,130,185,227,131,179
                    ]);

                });

                it("should encode Hebrew", function() {
                    var str = "\u05D3\u05D2 \u05E1\u05E7\u05E8\u05DF \u05E9\u05D8 \u05D1\u05D9\u05DD " +
                        "\u05DE\u05D0\u05D5\u05DB\u05D6\u05D1 \u05D5\u05DC\u05E4\u05EA\u05E2 \u05DE\u05E6\u05D0 " +
                        "\u05DC\u05D5 \u05D7\u05D1\u05E8\u05D4 \u05D0\u05D9\u05DA \u05D4\u05E7\u05DC\u05D9\u05D8\u05D4";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,90,215,147,215,146,32,215,161,215,167,215,168,215,159,
                        32,215,169,215,152,32,215,145,215,153,215,157,32,215,158,
                        215,144,215,149,215,155,215,150,215,145,32,215,149,215,
                        156,215,164,215,170,215,162,32,215,158,215,166,215,144,32,
                        215,156,215,149,32,215,151,215,145,215,168,215,148,32,215,
                        144,215,153,215,154,32,215,148,215,167,215,156,215,153,
                        215,152,215,148
                    ]);
                });

                it("should decode Polish", function() {
                    var str = "Pchn\u0105\u0107 w t\u0119 \u0142\u00F3d\u017A je\u017Ca lub o\u015Bm skrzy\u0144 fig";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,49,80,99,104,110,196,133,196,135,32,119,32,116,196,
                        153,32,197,130,195,179,100,197,186,32,106,101,197,188,97,
                        32,108,117,98,32,111,197,155,109,32,115,107,114,122,121,
                        197,132,32,102,105,103
                    ]);
                });

                it("should decode Russian", function() {
                    var str = "\u0412 \u0447\u0430\u0449\u0430\u0445 \u044E\u0433\u0430 \u0436\u0438\u043B \u0431\u044B " +
                        "\u0446\u0438\u0442\u0440\u0443\u0441? \u0414\u0430, \u043D\u043E " +
                        "\u0444\u0430\u043B\u044C\u0448\u0438\u0432\u044B\u0439 " +
                        "\u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440!";
                    encoder.writeObject(str);
                    expect(encoder.getBytes()).toEqual([
                        2,0,96,208,146,32,209,135,208,176,209,137,208,176,209,133,
                        32,209,142,208,179,208,176,32,208,182,208,184,208,187,32,
                        208,177,209,139,32,209,134,208,184,209,130,209,128,209,
                        131,209,129,63,32,208,148,208,176,44,32,208,189,208,190,
                        32,209,132,208,176,208,187,209,140,209,136,208,184,208,
                        178,209,139,208,185,32,209,141,208,186,208,183,208,181,
                        208,188,208,191,208,187,209,143,209,128,33
                    ]);
                });

            });

            describe("xml", function() {
                it("should encode an XML object", function() {
                    var xml = '<root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>';
                    var data = [
                        // Chrome version is clean
                        [
                            15,0,0,0,85,60,114,111,111,116,62,60,112,97,114,101,110,
                            116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                            62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,
                            105,108,100,32,105,100,61,34,99,50,34,62,60,98,97,114,
                            47,62,60,47,99,104,105,108,100,62,60,47,112,97,114,101,
                            110,116,62,60,47,114,111,111,116,62
                        ],
                        // IE7 version might have a crlf at the end
                        [
                            15,0,0,0,87,60,114,111,111,116,62,60,112,97,114,101,110,
                            116,62,60,99,104,105,108,100,32,105,100,61,34,99,49,34,
                            62,102,111,111,60,47,99,104,105,108,100,62,60,99,104,
                            105,108,100,32,105,100,61,34,99,50,34,62,60,98,97,114,
                            47,62,60,47,99,104,105,108,100,62,60,47,112,97,114,101,
                            110,116,62,60,47,114,111,111,116,62,
                            13, 10
                        ],
                        [ // IE9
                            15, 0, 0, 0, 86, 60, 114, 111, 111, 116, 62, 60, 112, 97,
                            114, 101, 110, 116, 62, 60, 99, 104, 105, 108, 100, 32,
                            105, 100, 61, 34, 99, 49, 34, 62, 102, 111, 111, 60, 47,
                            99, 104, 105, 108, 100, 62, 60, 99, 104, 105, 108, 100,
                            32, 105, 100, 61, 34, 99, 50, 34, 62, 60, 98, 97, 114,
                            32, 47, 62, 60, 47, 99, 104, 105, 108, 100, 62, 60, 47,
                            112, 97, 114, 101, 110, 116, 62, 60, 47, 114, 111, 111,
                            116, 62
                        ],
                        [ // Opera version: <?xml version="1.0"?><root><parent><child id="c1">foo</child><child id="c2"><bar/></child></parent></root>
                            15, 0, 0, 0, 106, 60, 63, 120, 109, 108, 32, 118, 101,
                            114, 115, 105, 111, 110, 61, 34, 49, 46, 48, 34, 63, 62,
                            60, 114, 111, 111, 116, 62, 60, 112, 97, 114, 101, 110,
                            116, 62, 60, 99, 104, 105, 108, 100, 32, 105, 100, 61,
                            34, 99, 49, 34, 62, 102, 111, 111, 60, 47, 99, 104, 105,
                            108, 100, 62, 60, 99, 104, 105, 108, 100, 32, 105, 100,
                            61, 34, 99, 50, 34, 62, 60, 98, 97, 114, 47, 62, 60, 47,
                            99, 104, 105, 108, 100, 62, 60, 47, 112, 97, 114, 101,
                            110, 116, 62, 60, 47, 114, 111, 111, 116, 62
                        ]
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
                    expect(data).toContain(encoder.getBytes()); // note reverseal of expect / contain data to use toContain
                });
            });

            describe("date", function() {
                it("should encode 7/24/2012", function() {
                    encoder.writeObject(new Date(1343164970869));
                    expect(encoder.getBytes()).toEqual([
                        11,66,115,139,173,239,119,80,0, 0,0
                    ]);
                });

                it("should encode 7/24/1912 (100 years before previous test's date)", function() {
                    encoder.writeObject(new Date(-1812595029131));
                    expect(encoder.getBytes()).toEqual([
                        11,194,122,96,113,83,72,176,0, 0,0
                    ]);
                });

                it("should encode 7/24/2112 (100 years after previous test's date)", function() {
                    encoder.writeObject(new Date(4498838570869));
                    expect(encoder.getBytes()).toEqual([
                        11,66,144,93,222,179,29,212,0, 0,0
                    ]);
                });

                it("should encode the UNIX epoch", function() {
                    encoder.writeObject(new Date(0));
                    expect(encoder.getBytes()).toEqual([
                        11,0,0,0,0,0,0,0,0, 0,0
                    ]);
                });

                it("should encode 9/12/275760 (the largest future javascript date)", function() {
                    encoder.writeObject(new Date(8640000000000000));
                    expect(encoder.getBytes()).toEqual([
                        11,67,62,178,8,194,220,0,0, 0,0
                    ]);
                });

                it("should encode 4/19/-271821 (the largest past javascript date)", function() {
                    encoder.writeObject(new Date(-8640000000000000));
                    expect(encoder.getBytes()).toEqual([
                        11,195,62,178,8,194,220,0,0, 0,0
                    ]);
                });

            });


            describe("array", function() {
                it("should encode an empty associative array", function() {
                    encoder.writeObject([]);
                    expect(encoder.getBytes()).toEqual([
                        8,0,0,0,0,0,0,9
                    ]);
                });
                it("should encode an associative array", function() {
                    encoder.writeObject(['a','b','c']);
                    expect(encoder.getBytes()).toEqual([
                        8,0,0,0,3,0,1,48,2,0,1,97,0,1,49,2,0,1,98,0,1,50,2,0,1,99,0,0,9
                    ]);
                });
                it("should encode an empty strict array", function() {
                    encoder.write0StrictArray([]);
                    expect(encoder.getBytes()).toEqual([
                        10,0,0,0,0
                    ]);
                });
                it("should encode an strict array", function() {
                    encoder.write0StrictArray(['a','b','c']);
                    expect(encoder.getBytes()).toEqual([
                        10,0,0,0,3,2,0,1,97,2,0,1,98,2,0,1,99
                    ]);
                });

            });

            describe("object", function() {
                it("should encode an empty anonymous object", function() {
                    encoder.writeObject({});
                    expect(encoder.getBytes()).toEqual([
                        3,0,0,9
                    ]);
                });
                it("should encode an anonymous object with multiple data types", function() {
                    encoder.writeObject({1: 1, "str":"string", "array": [], "date": new Date(0)});
                    expect(encoder.getBytes()).toEqual([
                        // Note: when serializing from Flash, the order of objects might be different. timezone marker on date will definitly be different
                        3,0,1,49,0,63,240,0,0,0,0,0,0,0,3,115,116,114,
                        2,0,6,115,116,114,105,110,103,0,5,97,114,114,
                        97,121,8,0,0,0,0,0,0,9,0,4,100,97,116,101,11,
                        0,0,0,0,0,0,0,0,0,0,0,0,9
                    ]);
                });
                it("should encode a typed object with multiple data types", function() {
                    encoder.writeObject({$flexType:"type", 1: 1, "str":"string", "array": [], "date": new Date(0)});
                    expect(encoder.getBytes()).toEqual([
                        // Note: when serializing from Flash, the order of objects might be different. timezone marker on date will definitly be different
                        16, 0, 4, 116, 121, 112, 101,
                        0,1,49,0,63,240,0,0,0,0,0,0,0,3,115,116,114,
                        2,0,6,115,116,114,105,110,103,0,5,97,114,114,
                        97,121,8,0,0,0,0,0,0,9,0,4,100,97,116,101,11,
                        0,0,0,0,0,0,0,0,0,0,0,0,9
                    ]);
                });

            });

        });
    });

});