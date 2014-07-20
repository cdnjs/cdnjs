describe("Ext.draw.Draw", function() {
    var approximateComparison;
    // Many calculations will propagate the rounding error, thus
    // exact comparison which does not take machine epsilon will not work.
    // For the test purposes, we use "approximate" comparison 'toEqualNumber'.
    // prec = 1e10 means comparison up to 10 decimal digits.
    beforeEach(function() {
        var prec = 1e10;
        approximateComparison = function(a, b) {
            return Math.round(a * prec) === Math.round(b * prec);
        };
        this.addMatchers({
            toEqualNumber: function(n) {
                return approximateComparison(this.actual, n);
            },
            toEqualAbsolutePath: function(path) {
                var length = path.length, i, p;
                for (i = 0; i < length; i++) {
                    p = path[i];
                    if (typeof p === "number") {
                        if (!approximateComparison(this.actual[i], p)) {
                            return false;
                        }
                    }
                }
                return true;
            }
        });
    });

    describe("Ext.draw.Draw.ellipsePath", function() {

        it("should return path string from ellipse", function() {
            expect(Ext.draw.Draw.ellipsePath({ attr: { x: -100, y: 50, rx: 10, ry: 13 } })).toEqual("M-100,37A10,13,0,1,1,-100,63A10,13,0,1,1,-100,37z");
        });

        it("should return path string from zero-radius ellipse", function() {
            expect(Ext.draw.Draw.ellipsePath({ attr: { x: 0, y: 0, rx: 0, ry: 0 } })).toEqual("M0,0A0,0,0,1,1,0,0A0,0,0,1,1,0,0z");
        });

    });

    describe("Ext.draw.Draw.rectPath", function() {

        it("should return path string from rectangle", function() {
            expect(Ext.draw.Draw.rectPath({ attr: { x: -100, y: 50, width: 400, height: 42 } })).toEqual("M-100,50L300,50,300,92,-100,92z");
        });

        it("should return path string from rounded rectangle", function() {
            expect(Ext.draw.Draw.rectPath({ attr: { radius: 15, x: -100, y: 50, width: 400, height: 42 } })).toEqual("M-85,50l370,0a15,15,0,0,1,15,15l0,12a15,15,0,0,1,-15,15l-370,0a15,15,0,0,1,-15,-15l0,-12a15,15,0,0,1,15,-15z");
        });

    });

    describe("Ext.draw.Draw.quadratic2curve", function() {

        it("should convert simple 'quadratic' into 'cubic'", function() {
            expect(Ext.draw.Draw.quadratic2curve(-30, 60, 0, 0, 120, 0)).toEqual([-10, 20, 40, 0, 120, 0]);
        });

        it("should convert complicated 'quadratic' into 'cubic'", function() {
            expect(Ext.draw.Draw.quadratic2curve(-30, 60, 3, 12, 120, -300)).toEqual([-8, 28, 42, -92, 120, -300]);
        });

    });

    describe("Ext.draw.Draw.arc2curve", function() {

        it("should convert simple 'arc' into two 'cubic' commands", function() {
            // each cubic needs 6 values
            expect(Ext.draw.Draw.arc2curve(0, 0, 50, 60, 0, 0, 0, 100, 100).length).toEqual(12);
        });

        it("should correctly compute the initial cubic starting point", function() {
            expect(Ext.draw.Draw.arc2curve(0, 0, 50, 60, 0, 0, 0, 100, 100)[0]).toEqualNumber(-32.07501497178969);
            expect(Ext.draw.Draw.arc2curve(0, 0, 50, 60, 0, 0, 0, 100, 100)[1]).toEqualNumber(46.188021518359555);
        });

        it("should keep the arc end point the same as the cubic end point", function() {
            expect(Ext.draw.Draw.arc2curve(0, 0, 50, 60, 0, 0, 0, 200, 100)[10]).toEqual(200);
            expect(Ext.draw.Draw.arc2curve(0, 0, 50, 60, 0, 0, 0, 200, 100)[11]).toEqual(100);
        });

    });

    describe("Ext.draw.Draw.rotatePoint rotates (x,y) with (cx, cy) as the rotation center", function() {

        it("should return an object which has a property x (Number)", function() {
            expect(typeof Ext.draw.Draw.rotatePoint(100, 50, 0).x).toEqual("number");
        });

        it("should return an object which has a property y (Number)", function() {
            expect(typeof Ext.draw.Draw.rotatePoint(100, 50, 0).y).toEqual("number");
        });

        it("should return x:0 when rotating (0, 0) with 0 deg", function() {
            expect(Ext.draw.Draw.rotatePoint(0, 0, 0).x).toEqualNumber(0);
        });

        it("should return y:0 when rotating (0, 0) with 0 deg", function() {
            expect(Ext.draw.Draw.rotatePoint(0, 0, 0).y).toEqualNumber(0);
        });

        it("should return x:0 when rotating (100, 0) with 90 deg", function() {
            expect(Ext.draw.Draw.rotatePoint(100, 0, 90).x).toEqualNumber(0);
        });

        it("should return y:100 when rotating (0, 100) with 90 deg", function() {
            expect(Ext.draw.Draw.rotatePoint(100, 0, 90).y).toEqualNumber(100);
        });

        it("should return x:-100 when rotating (100, 0) with 180 deg", function() {
            expect(Ext.draw.Draw.rotatePoint(100, 0, 180).x).toEqualNumber(-100);
        });

        it("should return y:0 when rotating (0, 100) with 180 deg", function() {
            expect(Ext.draw.Draw.rotatePoint(100, 0, 180).y).toEqualNumber(0);
        });

        it("should return x:0 when rotating (100, 0) centered at (50, 0) with 180 deg", function() {
            expect(Ext.draw.Draw.rotatePoint(100, 0, 180, 50, 0).x).toEqualNumber(0);
        });

        it("should return y:0 when rotating (0, 100) centered at (50, 0) with 180 deg", function() {
            expect(Ext.draw.Draw.rotatePoint(100, 0, 180, 50, 0).y).toEqualNumber(0);
        });

    });

    describe("Ext.draw.Draw.rotate rotates (x,y) with the origin as the rotation center", function() {

        it("should return an object which has a property x (Number)", function() {
            expect(typeof Ext.draw.Draw.rotate(100, 50, 0).x).toEqual("number");
        });

        it("should return an object which has a property y (Number)", function() {
            expect(typeof Ext.draw.Draw.rotate(100, 50, 0).y).toEqual("number");
        });

        it("should return x:0 when rotating (0, 0) with 0 rad", function() {
            expect(Ext.draw.Draw.rotate(0, 0, 0).x).toEqualNumber(0);
        });

        it("should return y:0 when rotating (0, 0) with 0 rad", function() {
            expect(Ext.draw.Draw.rotate(0, 0, 0).y).toEqualNumber(0);
        });

        it("should return x:0 when rotating (100, 0) with PI/2 rad", function() {
            expect(Ext.draw.Draw.rotate(100, 0, Math.PI / 2).x).toEqualNumber(0);
        });

        it("should return y:100 when rotating (0, 100) with PI/2 rad", function() {
            expect(Ext.draw.Draw.rotate(100, 0, Math.PI / 2).y).toEqualNumber(100);
        });

        it("should return x:-100 when rotating (100, 0) with PI rad", function() {
            expect(Ext.draw.Draw.rotate(100, 0, Math.PI).x).toEqualNumber(-100);
        });

        it("should return y:0 when rotating (0, 100) with PI/2 rad", function() {
            expect(Ext.draw.Draw.rotate(100, 0, Math.PI).y).toEqualNumber(0);
        });

    });


    describe("Ext.draw.Draw.degrees converts from radian to degree", function() {

        it("should return a number", function() {
            expect(typeof Ext.draw.Draw.degrees(1)).toEqual("number");
        });

        it("should convert 0 rad to 0 deg", function() {
            expect(Ext.draw.Draw.degrees(0)).toEqual(0);
        });

        it("should convert 1 rad to 57.296 deg", function() {
            expect(Ext.draw.Draw.degrees(1)).toEqual(180 / Math.PI);
        });

        it("should convert 2 rad to 114.592 deg", function() {
            expect(Ext.draw.Draw.degrees(2)).toEqual(360 / Math.PI);
        });

        it("should convert 3 rad to 171.888 deg", function() {
            expect(Ext.draw.Draw.degrees(3)).toEqual(540 / Math.PI);
        });

        it("should convert 7 rad to 41.07 deg", function() {
            expect(Ext.draw.Draw.degrees(7)).toEqual((1260 / Math.PI) % 360);
        });

        it("should convert PI rad to 180 deg", function() {
            expect(Ext.draw.Draw.degrees(Math.PI)).toEqual(180);
        });

        it("should convert 2*PI rad to 360 deg", function() {
            expect(Ext.draw.Draw.degrees(2 * Math.PI)).toEqual(0);
        });

        it("should convert 3*PI rad to 180 deg", function() {
            expect(Ext.draw.Draw.degrees(3 * Math.PI)).toEqual(180);
        });

        it("should convert 4*PI rad to 360 deg", function() {
            expect(Ext.draw.Draw.degrees(4 * Math.PI)).toEqual(0);
        });
    });

    describe("Ext.draw.Draw.rad converts from degree to radian", function() {

        it("should return a number", function() {
            expect(typeof Ext.draw.Draw.rad(1)).toEqual("number");
        });

        it("should convert 0 deg to 0 rad", function() {
            expect(Ext.draw.Draw.rad(0)).toEqual(0);
        });

        it("should convert 90 deg to PI/2 rad", function() {
            expect(Ext.draw.Draw.rad(90)).toEqual(Math.PI / 2);
        });

        it("should convert 180 deg to PI rad", function() {
            expect(Ext.draw.Draw.rad(180)).toEqual(Math.PI);
        });

        it("should convert 270 deg to 3*PI/2 rad", function() {
            expect(Ext.draw.Draw.rad(270)).toEqual(3 * Math.PI / 2);
        });

        it("should convert 360 deg to 0 rad", function() {
            expect(Ext.draw.Draw.rad(360)).toEqual(0);
        });

        it("should convert 540 deg to PI rad", function() {
            expect(Ext.draw.Draw.rad(540)).toEqual(Math.PI);
        });

        it("should convert 720 deg to 0 rad", function() {
            expect(Ext.draw.Draw.rad(720)).toEqual(0);
        });

    });

    describe("Ext.draw.Draw.rotateAndTranslatePath", function() {

        it("should return an absolute path even if there is no rotation or translation", function() {
            var path = [['M', 0, 0], ['L', 100, 0], ['L', 100, 100], ['L', 0, 100], ['Z']];
            expect(Ext.draw.Draw.rotateAndTranslatePath({ 
                attr: { 
                    path: path
                },
                rotation: {
                    degrees: 0,
                    x: 0,
                    y: 0
                },
                translation: {
                    x: 0,
                    y: 0
                }
            })).toEqualAbsolutePath(path);            
        });

        it("should be able to translate path only", function() {
            expect(Ext.draw.Draw.rotateAndTranslatePath({ 
                attr: { 
                    path: [['M', 0, 0], ['L', 100, 0], ['L', 100, 100], ['L', 0, 100], ['Z']]
                },
                rotation: {
                    degrees: 0,
                    x: 0,
                    y: 0
                },
                translation: {
                    x: 100,
                    y: 100
                }
            })).toEqualAbsolutePath([['M', 100, 100], ['L', 200, 100], ['L', 200, 200], ['L', 100, 200], ['Z']]);
        });

        it("should be able to rotate path only", function() {
            expect(Ext.draw.Draw.rotateAndTranslatePath({ 
                attr: { 
                    path: [['M', 0, 0], ['L', 100, 0], ['L', 100, 100], ['L', 0, 100], ['Z']]
                },
                rotation: {
                    degrees: 90,
                    x: 0,
                    y: 0
                },
                translation: {
                    x: 0,
                    y: 0
                }
            })).toEqualAbsolutePath([['M', 0, 0], ['L', 0, 100], ['L', -100, 100], ['L', -100, 0], ['Z']]);
        });

        it("should be able to do both simultaneously", function() {
            expect(Ext.draw.Draw.rotateAndTranslatePath({ 
                attr: { 
                    path: [['M', 0, 0], ['L', 100, 0], ['L', 100, 100], ['L', 0, 100], ['Z']]
                },
                rotation: {
                    degrees: 90,
                    x: 0,
                    y: 0
                },
                translation: {
                    x: 100,
                    y: 100
                }
            })).toEqualAbsolutePath([['M', 0, 100], ['L', 0, 200], ['L', -100, 200], ['L', -100, 100], ['Z']]);
        });
    });

    describe("pathDimensions", function() {
        var path = [['M', 0, 0], ['L', 100, 0], ['L', 100, 50], ['L', 0, 50], ['Z']];

        describe("a rectangle with origin in (0,0)", function() {

            it("should return an x:0 property", function() {
                expect(Ext.draw.Draw.pathDimensions(path).x).toBe(0);
            });

            it("should return an y:0 property", function() {
                expect(Ext.draw.Draw.pathDimensions(path).y).toBe(0);
            });       

            it("should have an height of 50", function() {
                expect(Ext.draw.Draw.pathDimensions(path).height).toBe(50);
            });  

            it("should have an width of 100", function() {
                expect(Ext.draw.Draw.pathDimensions(path).width).toBe(100);
            });  
        });
    });

    describe("smooth", function() {
        describe("a simple path with (4 points connected by a line)", function() {
            var path;
            beforeEach(function() {
                path = Ext.draw.Draw.smooth([['M', 0, 0], ['L', 10, 10], ['L', 20, 0], ['L',30, 10]]);
            });

            it("should have an initial position at 0 0", function() {
                expect(path[0][1]).toBe(0);
                expect(path[0][2]).toBe(0);
            });

            describe("bezier curves", function() {
                var curve;

                it("should return a path with 3 bezier curves", function() {
                    expect(path[1][0]).toBe("C");
                    expect(path[2][0]).toBe("C");
                    expect(path[3][0]).toBe("C");

                });

                describe("first bezier curve", function() {
                    beforeEach(function() {
                        curve = path[1];
                    });

                    it("should have a first control point at 0 0", function() {
                        expect(curve[1]).toEqualNumber(0);
                        expect(curve[2]).toEqualNumber(0);
                    });

                    it("should have the second control point at west of the end point", function() {
                        expect(curve[3] < 10).toBe(true);
                        expect(curve[4]).toEqualNumber(10);
                    });

                    it("should have the end point at 10 10", function() {
                        expect(curve[5]).toEqualNumber(10);
                        expect(curve[6]).toEqualNumber(10); 
                    });
                });

                describe("second bezier curve", function() {
                    beforeEach(function() {
                        curve = path[2];
                    });


                    it("should have a first control point at east of origin point", function() {
                        expect(curve[1] > 10).toBe(true);
                        expect(curve[2]).toEqualNumber(10);
                    });

                    it("should have the second control point at west of end point", function() {
                        expect(curve[3] > 10).toBe(true);
                        expect(curve[4]).toEqualNumber(0);
                    });

                    it("should have the end point at 20 0", function() {
                        expect(curve[5]).toBe(20);
                        expect(curve[6]).toBe(0); 
                    });
                });

                describe("third bezier curve (the last one)", function() {
                    beforeEach(function() {
                        curve = path[3];
                    });

                    it("should have a first control point at east of origin point", function() {
                        expect(curve[1] > 20).toBe(true);
                        expect(curve[2]).toEqualNumber(0);
                    });

                    it("should have the second control point at 30 10", function() {
                        expect(curve[3]).toEqualNumber(30);
                        expect(curve[4]).toEqualNumber(10); 
                    });

                    it("should have it's end point at 30 10", function() {
                        expect(curve[5]).toEqualNumber(30);
                        expect(curve[6]).toEqualNumber(10); 
                    });
                });                
            });
        });

        describe("value argument reduce the convex hull size of each bezier curve when value is increased", function() {
            var path1, path2, controlPoint1, controlPoint2;

            beforeEach(function() {
                path1 = Ext.draw.Draw.smooth([['M', 0, 0], ['L', 10, 10], ['L', 20, 0], ['L',30, 10]]);
                path2 = Ext.draw.Draw.smooth([['M', 0, 0], ['L', 10, 10], ['L', 20, 0], ['L',30, 10]], 10);
            });  

            describe("second control point of the first curve", function() {
                it("should decrease distance between the second control point and end point", function() {
                    controlPoint1 = {x : path1[1][3], y : path1[1][4]};
                    controlPoint2 = {x : path2[1][3], y : path2[1][4]};

                    expect(controlPoint1.x < controlPoint2.x).toBe(true);
                    expect(controlPoint1.y).toEqualNumber(controlPoint2.y);
                });
            });


            describe("first control point of the second curve", function() {
                it("should decrease distance between the first control point and origin", function() {
                    controlPoint1 = {x : path1[2][1], y : path1[2][2]};
                    controlPoint2 = {x : path2[2][1], y : path2[2][2]};

                    expect(controlPoint1.x > controlPoint2.x).toBe(true);
                    expect(controlPoint1.y).toEqualNumber(controlPoint2.y);
                });                
            });

            describe("second control point of the second curve", function() {
                 it("should decrease distance between the second control point and end point", function() {
                    controlPoint1 = {x : path1[2][3], y : path1[2][4]};
                    controlPoint2 = {x : path2[2][3], y : path2[2][4]};

                    expect(controlPoint1.x < controlPoint2.x).toBe(true);
                    expect(controlPoint1.y).toEqualNumber(controlPoint2.y);
                });                
            });

            describe("first control point of the third curve (last one)", function() {
                 it("should decrease distance between the first control point and origin", function() {
                    controlPoint1 = {x : path1[3][1], y : path1[3][2]};
                    controlPoint2 = {x : path2[3][1], y : path2[3][2]};

                    expect(controlPoint1.x > controlPoint2.x).toBe(true);
                    expect(controlPoint1.y).toEqualNumber(controlPoint2.y);
                });                     
            });

        });
    });

    //TODO: finish this when snapEnds function will be done.
    describe("snapEnds", function() {
        var object;

        beforeEach(function() {
            object = Ext.draw.Draw.snapEnds(0, 100, 10);
        });

        describe("returned object", function() {
            it("should have a from property equal to first argument", function() {
                expect(object.from).toEqual(0);
            });

            it("should have a to property greater than or equal to second argument", function() {
                expect(object.to >= 100).toBe(true);
            });

            it("should have a steps property lesser than or equal to third argument", function() {
                expect(object.steps <= 10).toBe(true);
            });
        });
    });

    describe("parseGradient", function() {
        var gradient,
            rawGradient,
            generateIdTypeAndStopSpec = function() {
                it("should have an id inherited from the passed object", function() {
                    expect(gradient.id).toBe(rawGradient.id);
                });

                it("should have a type inherited from the passed object", function() {
                    expect(gradient.type).toBe(rawGradient.type || "linear");
                });

                describe("stops property", function() {
                    var stops;

                    beforeEach(function() {
                        stops = gradient.stops;
                    });

                    it("should be an array", function() {
                        expect(Ext.isArray(stops)).toBe(true);
                    });

                    describe("array members", function() {
                        var member1, member2, offsets, colors, opacities;

                        beforeEach(function() {
                            var rawStops, offset;

                            member1 = stops[0];
                            member2 = stops[1];

                            offsets = [];
                            colors = [];
                            opacities = [];

                            rawStops = rawGradient.stops;
                            for (offset in rawStops) {
                                if (rawStops.hasOwnProperty(offset)) {
                                    offsets.push(parseInt(offset, 10));
                                    colors.push(rawStops[offset].color);
                                    opacities.push(rawStops[offset].opacity);
                                }
                            }
                        });

                        describe("first member", function() {
                            it("should have color inherited from raw gradient or equal to #ffffff", function() {
                                expect(member1.color).toBe(Ext.draw.Color.toHex(colors[0]) || "#ffffff");
                            });

                            it("should have offset inherited from raw gradient", function() {
                                expect(member1.offset).toBe(offsets[0]);
                            });

                            it("should have opacity inherited from raw gradient", function() {
                                expect(member1.opacity).toBe(opacities[0] || 1);
                            });
                        });

                        describe("second member", function() {
                            it("should have color inherited from raw gradient or equal to #ffffff", function() {
                                expect(member2.color).toBe(Ext.draw.Color.toHex(colors[1]) || "#ffffff");
                            });

                            it("should have offset inherited from raw gradient", function() {
                                expect(member2.offset).toBe(offsets[1]);
                            });

                            it("should have opacity inherited from raw gradient or equal to 1", function() {
                                expect(member2.opacity).toBe(opacities[1] || 1);
                            });
                        });
                    });
                });                
            };

        describe("with a linear gradient object passed as first argument", function() {
            beforeEach(function() {
                rawGradient = {
                    id: "linear-1",
                    angle: 45,
                    stops: {
                        0: {
                            color: "#0000ff",
                            opacity: 0.75
                        },
                        100: {
                            color: "#ff0000",
                            opacity: 1
                        }
                    }
                };
                gradient = Ext.draw.Draw.parseGradient(rawGradient);
            });

            describe("returned gradient", function() {
                generateIdTypeAndStopSpec();

                describe("vector property", function() {
                    var vector;

                    beforeEach(function() {
                        vector = gradient.vector;
                    });

                    it("should have an initial point in 0 0", function() {
                        expect([vector[0], vector[1]]).toEqual([0, 0]);
                    });

                    it("should have a termination point in 1 1", function() {
                        expect(1 - vector[2]).toEqualNumber(0);
                        expect(1 - vector[3]).toEqualNumber(0);
                    });
                });
            });
        });

        describe("with radial gradient object passed as first argument", function() {
            beforeEach(function() {
                rawGradient = {
                    id: "radial-1",
                    type: "radial",
                    centerX: 1,
                    centerY: 2,
                    focalX: 3,
                    focalY: 4,
                    radius: 20,
                    stops: {
                        0: {
                            opacity: 0.5
                        },
                        100: {
                            color: "rgb(255, 0, 0)"
                        }
                    }
                };

                gradient = Ext.draw.Draw.parseGradient(rawGradient);
            });

            describe("returned gradient", function() {
                generateIdTypeAndStopSpec();

                it("should have centerX property inherited from the passed object", function() {
                    expect(gradient.centerX).toEqual(rawGradient.centerX);
                });

                it("should have centerY property inherited from the passed object", function() {
                    expect(gradient.centerY).toEqual(rawGradient.centerY);
                });

                it("should have focalX property inherited from the passed object", function() {
                    expect(gradient.focalX).toEqual(rawGradient.focalX);
                });

                it("should have focalY property inherited from the passed object", function() {
                    expect(gradient.focalY).toEqual(rawGradient.focalY);
                });

                it("should have radius property inherited from the passed object", function() {
                    expect(gradient.radius).toEqual(rawGradient.radius);
                });

                it("should have an undefined vector property", function() {
                    expect(gradient.vector).toBe(undefined);
                });
            });
        });
    });
});
