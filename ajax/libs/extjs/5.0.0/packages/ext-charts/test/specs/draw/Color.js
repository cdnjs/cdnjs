describe("Ext.draw.Color", function() {

    describe("construct a red color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(255, 0, 0);
        });

        it("should return RGB as [255, 0, 0]", function() {
            expect(color.getRGB()).toEqual([255, 0, 0]);
        });

        it("should return the HSL as [0, 1, 0.5]", function() {
            expect(color.getHSL()).toEqual([0, 1, 0.5]);
        });

        it("should return #ff6666 as the lighter version", function() {
            expect(color.getLighter().toString()).toEqual('#ff6666');
        });

        it("should return #ffcccc as the much lighter version", function() {
            expect(color.getLighter(0.4).toString()).toEqual('#ffcccc');
        });

        it("should return #990000 as the darker version", function() {
            expect(color.getDarker().toString()).toEqual('#990000');
        });

        it("should return #330000 as the much darker version", function() {
            expect(color.getDarker(0.4).toString()).toEqual('#330000');
        });

        it("should return 76.5 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(76.5);
        });
    });

    describe("construct a yellow color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(255, 255, 0);
        });

        it("should return RGB as [255, 255, 0]", function() {
            expect(color.getRGB()).toEqual([255, 255, 0]);
        });

        it("should return the HSL as [60, 1, 0.5]", function() {
            expect(color.getHSL()).toEqual([60, 1, 0.5]);
        });

        it("should return #ffff66 as the lighter version", function() {
            expect(color.getLighter().toString()).toEqual('#ffff66');
        });

        it("should return #ffffcc as the much lighter version", function() {
            expect(color.getLighter(0.4).toString()).toEqual('#ffffcc');
        });

        it("should return #999900 as the darker version", function() {
            expect(color.getDarker().toString()).toEqual('#999900');
        });

        it("should return #333300 as the much darker version", function() {
            expect(color.getDarker(0.4).toString()).toEqual('#333300');
        });

        it("should return 226.95 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(226.95);
        });
    });

    describe("construct a green color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(0, 255, 0);
        });

        it("should return RGB as [0, 255, 0]", function() {
            expect(color.getRGB()).toEqual([0, 255, 0]);
        });

        it("should return the HSL as [120, 1, 0.5]", function() {
            expect(color.getHSL()).toEqual([120, 1, 0.5]);
        });

        it("should return #66ff66 as the lighter version", function() {
            expect(color.getLighter().toString()).toEqual('#66ff66');
        });

        it("should return #ccffcc as the much lighter version", function() {
            expect(color.getLighter(0.4).toString()).toEqual('#ccffcc');
        });

        it("should return #009900 as the darker version", function() {
            expect(color.getDarker().toString()).toEqual('#009900');
        });

        it("should return #003300 as the much darker version", function() {
            expect(color.getDarker(0.4).toString()).toEqual('#003300');
        });

        it("should return 150.45 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(150.45);
        });
    });

    describe("construct a cyan color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(0, 255, 255);
        });

        it("should return RGB as [0, 255, 255]", function() {
            expect(color.getRGB()).toEqual([0, 255, 255]);
        });

        it("should return the HSL as [180, 1, 0.5]", function() {
            expect(color.getHSL()).toEqual([180, 1, 0.5]);
        });

        it("should return #66ffff as the lighter version", function() {
            expect(color.getLighter().toString()).toEqual('#66ffff');
        });

        it("should return #ccffff as the much lighter version", function() {
            expect(color.getLighter(0.4).toString()).toEqual('#ccffff');
        });

        it("should return #009999 as the darker version", function() {
            expect(color.getDarker().toString()).toEqual('#009999');
        });

        it("should return #003333 as the much darker version", function() {
            expect(color.getDarker(0.4).toString()).toEqual('#003333');
        });

        it("should return 178.5 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(178.5);
        });
    });

    describe("construct a blue color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(0, 0, 255);
        });

        it("should return RGB as [0, 0, 255]", function() {
            expect(color.getRGB()).toEqual([0, 0, 255]);
        });

        it("should return the HSL as [240, 1, 0.5]", function() {
            expect(color.getHSL()).toEqual([240, 1, 0.5]);
        });

        it("should return hex string via HSL conversion as #0000ff", function() {
            var hsl = color.getHSL();
            expect(Ext.draw.Color.fromHSL(hsl[0], hsl[1], hsl[2]).toString()).toEqual('#0000ff');
        });

        it("should return #6666ff as the lighter version", function() {
            expect(color.getLighter().toString()).toEqual('#6666ff');
        });

        it("should return #ccccff as the much lighter version", function() {
            expect(color.getLighter(0.4).toString()).toEqual('#ccccff');
        });

        it("should return #000099 as the darker version", function() {
            expect(color.getDarker().toString()).toEqual('#000099');
        });

        it("should return #000033 as the much darker version", function() {
            expect(color.getDarker(0.4).toString()).toEqual('#000033');
        });

        it("should return 28.05 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(28.05);
        });
    });

    describe("construct a violet color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(255, 0, 255);
        });

        it("should return RGB as [255, 0, 255]", function() {
            expect(color.getRGB()).toEqual([255, 0, 255]);
        });

        it("should return the HSL as [300, 1, 0.5]", function() {
            expect(color.getHSL()).toEqual([300, 1, 0.5]);
        });

        it("should return #ff66ff as the lighter version", function() {
            expect(color.getLighter().toString()).toEqual('#ff66ff');
        });

        it("should return #ffccff as the much lighter version", function() {
            expect(color.getLighter(0.4).toString()).toEqual('#ffccff');
        });

        it("should return #990099 as the darker version", function() {
            expect(color.getDarker().toString()).toEqual('#990099');
        });

        it("should return #330033 as the much darker version", function() {
            expect(color.getDarker(0.4).toString()).toEqual('#330033');
        });

        it("should return 104.55 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(104.55);
        });
    });

    describe("construct a white (achromatic) color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(255, 255, 255);
        });

        it("should return RGB as [255, 255, 255]", function() {
            expect(color.getRGB()).toEqual([255, 255, 255]);
        });

        it("should return the HSL as [0, 0, 1]", function() {
            expect(color.getHSL()).toEqual([undefined, 0, 1]);
        });

        it("should not be able to get a brighter version", function() {
            expect(color.getLighter().toString()).toEqual('#ffffff');
        });

        it("should return #cccccc as the darker version", function() {
            expect(color.getDarker().toString()).toEqual('#cccccc');
        });

        it("should return #999999 as the much darker version", function() {
            expect(color.getDarker(0.4).toString()).toEqual('#999999');
        });

        it("should return 255 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(255);
        });
    });

    describe("construct a dark gray (achromatic) color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(64, 64, 64);
        });

        it("should return RGB as [64, 64, 64]", function() {
            expect(color.getRGB()).toEqual([64, 64, 64]);
        });

        it("should return the HSL as [0, 0, 64 / 255]", function() {
            expect(color.getHSL()).toEqual([undefined, 0, 64 / 255]);
        });

        it("should return #0d0d0d as the darker version", function() {
            expect(color.getDarker().toString()).toEqual('#0d0d0d');
        });

        it("should return #000000 as the much darker version", function() {
            expect(color.getDarker(0.4).toString()).toEqual('#000000');
        });
    });

    describe("construct a non-black color", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(128, 64, 192);
        });

        it("should return non-zero red component", function() {
            expect(color.getRed()).toEqual(128);
        });

        it("should return non-zero green component", function() {
            expect(color.getGreen()).toEqual(64);
        });

        it("should return non-zero blue component", function() {
            expect(color.getBlue()).toEqual(192);
        });

        it("should return the hex string as #8040c0", function() {
            expect(color.toString()).toEqual('#8040c0');
        });

        it("should return 97.28 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(97.28);
        });
    });

    describe("construct color with negative color components", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(-16, -1, -128, -0.2);
        });

        it("should clamp the red component to 0", function() {
            expect(color.getRed()).toEqual(0);
        });

        it("should clamp the green component to 0", function() {
            expect(color.getGreen()).toEqual(0);
        });

        it("should clamp the blue component to 0", function() {
            expect(color.getBlue()).toEqual(0);
        });

        it("should return the hex string as #000000", function() {
            expect(color.toString()).toEqual('#000000');
        });

        it("should return 0 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(0);
        });
    });

    describe("parse string representing a color", function() {

        it("should parse '#ff0000' as [255, 0, 0]", function() {
            expect(Ext.draw.Color.fromString('#ff0000').getRGB()).toEqual([255, 0, 0]);
        });

        it("should parse '#00ff00' as [0, 255, 0]", function() {
            expect(Ext.draw.Color.fromString('#00ff00').getRGB()).toEqual([0, 255, 0]);
        });

        it("should parse '#0000ff' as [0, 0, 255]", function() {
            expect(Ext.draw.Color.fromString('#0000ff').getRGB()).toEqual([0, 0, 255]);
        });

        it("should parse '#012345' as [0, 0, 255]", function() {
            expect(Ext.draw.Color.fromString('#012345').getRGB()).toEqual([1, 35, 69]);
        });

        it("should parse '#6789ab' as [103, 137, 171]", function() {
            expect(Ext.draw.Color.fromString('#6789ab').getRGB()).toEqual([103, 137, 171]);
        });

        it("should parse '#cdef01' as [205, 239, 1]", function() {
            expect(Ext.draw.Color.fromString('#cdef01').getRGB()).toEqual([205, 239, 1]);
        });

        it("should parse '#aaa' as [170, 170, 170]", function() {
            expect(Ext.draw.Color.fromString('#aaa').getRGB()).toEqual([170, 170, 170]);
        });

        it("should parse '#369' as [51, 102, 153]", function() {
            expect(Ext.draw.Color.fromString('#369').getRGB()).toEqual([51, 102, 153]);
        });

        it("should not parse '#5' (only 1 hex digit)", function() {
            expect(Ext.draw.Color.fromString('#5')).toEqual(undefined);
        });

        it("should not parse '#af' (only 2 hex digit)", function() {
            expect(Ext.draw.Color.fromString('#af')).toEqual(undefined);
        });

        it("should not parse '#1234' (only 4 hex digit)", function() {
            expect(Ext.draw.Color.fromString('#1234')).toEqual(undefined);
        });

        it("should not parse '#12345' (only 5 hex digits)", function() {
            expect(Ext.draw.Color.fromString('#12345')).toEqual(undefined);
        });

        it("should not parse '#1234567' (too many hex digits)", function() {
            expect(Ext.draw.Color.fromString('#1234567')).toEqual(undefined);
        });

        it("should parse 'rgb(14, 3, 77)' as [14, 3, 77]", function() {
            expect(Ext.draw.Color.fromString('rgb(14, 3, 77)').getRGB()).toEqual([14, 3, 77]);
        });

        it("should parse 'bgr(14, 3, 77)' as [14, 3, 77]", function() {
            expect(Ext.draw.Color.fromString('bgr(14, 3, 77)')).toEqual(undefined);
        });

        it("should not parse 'rgb(14)'", function() {
            expect(Ext.draw.Color.fromString('rgb(14)')).toEqual(undefined);
        });

        it("should not parse 'rgb(14, 3)'", function() {
            expect(Ext.draw.Color.fromString('rgb(14, 3)')).toEqual(undefined);
        });

        it("should not parse 'rgb(14, 3, 19, 77)'", function() {
            expect(Ext.draw.Color.fromString('rgb(14, 3, 19, 77)')).toEqual(undefined);
        });
    });

    describe("construct color with out-of-bound color components", function() {
        var color;

        beforeEach(function() {
            color = new Ext.draw.Color(256, 300, 1000, 1.5);
        });

        it("should clamp the red component to 255", function() {
            expect(color.getRed()).toEqual(255);
        });

        it("should clamp the green component to 255", function() {
            expect(color.getGreen()).toEqual(255);
        });

        it("should clamp the blue component to 255", function() {
            expect(color.getBlue()).toEqual(255);
        });

        it("should return the hex string as #ffffff", function() {
            expect(color.toString()).toEqual('#ffffff');
        });

        it("should return 255 as grayscale value", function() {
            expect(color.getGrayscale()).toEqual(255);
        });
    });

    describe("handle color with different lightness factor", function() {
        var color1, color2;

        beforeEach(function() {
            color1 = Ext.draw.Color.fromHSL(20, 0.8, 0.5);
            color2 = Ext.draw.Color.fromHSL(100, 0.5, 0.5);
            color2.lightnessFactor = 0.3;
        });

        it("should keep the default lightness factor of 0.2", function() {
            expect(color1.lightnessFactor).toEqual(0.2);
        });

        it("should have custom lightness factor of 0.3", function() {
            expect(color2.lightnessFactor).toEqual(0.3);
        });

        it("should return #c4e6b3 as the lighter version", function() {
            expect(color2.getLighter().toString()).toEqual('#c4e6b3');
        });

        it("should return #ffffff as the much lighter version", function() {
            expect(color2.getLighter().getLighter().toString()).toEqual('#ffffff');
        });

        it("should return #2b4d1a as the darker version", function() {
            expect(color2.getDarker().toString()).toEqual('#2b4d1a');
        });

        it("should return #000000 as the much darker version", function() {
            expect(color2.getDarker().getDarker().toString()).toEqual('#000000');
        });
    });

    describe("toHex", function() {
        var rgbTest = function(expected, rgb) {
                it("should return " + expected + " with " + rgb + ".", function() {
                    expect(Ext.draw.Color.toHex(rgb)).toBe(expected);
                });
        },
        hexRgb = {
            "#ffffff" : "rgb(255, 255, 255)",
            "#000000" : "rgb(0, 0, 0)",
            "#9fb6cd" : "rgb(159, 182,    205)",
            "#ff0000" : "rgb(255, 0, 0)",
            "#0000ff" : "rgb(0, 0, 255)",
            "#00ffff" : "rgb(0, 255, 255)"
        },
        hex;

        for (hex in hexRgb) {
            if (hexRgb.hasOwnProperty(hex)) {
                rgbTest(hex, hexRgb[hex]);
            }
        }

        describe("if first argument is not a string", function() {
            it ("should return an empty string", function() {
                expect(Ext.draw.Color.toHex(undefined)).toBe("");
            });
        });

        describe("if first argument is an array", function() {
            it ("should process the first element of the array", function() {
                expect(Ext.draw.Color.toHex(["rgb(255, 255, 255)"])).toBe("#ffffff");
            });           
        });

        describe("if color is already in hex format", function() {
            it ("should return directly the color", function() {
                expect(Ext.draw.Color.toHex("#ffffff")).toBe("#ffffff");
            });           
        });
    });
});
