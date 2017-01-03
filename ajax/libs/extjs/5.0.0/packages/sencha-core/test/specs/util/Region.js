Ext.require('Ext.util.Region', function() {
    describe("Ext.util.Region", function() {
        var region,
            region1,
            region2,
            region3,
            region4,
            region5;

        beforeEach(function() {
            region1 = Ext.create('Ext.util.Region', 2, 5, 6, 1);
            region2 = Ext.create('Ext.util.Region', 1, 6, 3, 4);
            region3 = Ext.create('Ext.util.Region', 0, 2, 2, 0);
            region4 = Ext.create('Ext.util.Region', 3, 4, 5, 2);
            region5 = Ext.create('Ext.util.Region', 7, 3, 9, 1);
        });

        describe("contains", function() {
            describe("form region 1 point of view", function() {
                it("should not contain region 2", function() {
                    expect(region1.contains(region2)).toBe(false);
                });

                it("should not contain region 3", function() {
                    expect(region1.contains(region3)).toBe(false);
                });

                it("should contain region 4", function() {
                    expect(region1.contains(region4)).toBe(true);
                });

                it("should not contain region 5", function() {
                    expect(region1.contains(region5)).toBe(false);
                });
            });
        });

        describe("intersect", function() {
            describe("form region 1 point of view", function() {
                describe("between region 1 and 2", function() {
                    beforeEach(function() {
                        region = region1.intersect(region2);
                    });

                    it("should not return false", function() {
                        expect(region).not.toBe(false);
                    });

                    it("should return a region with top property equal to 2", function() {
                        expect(region.top).toEqual(2);
                    });

                    it("should return a region with left property equal to 4", function() {
                        expect(region.left).toEqual(4);
                    });

                    it("should return a region with bottom property equal to 3", function() {
                        expect(region.bottom).toEqual(3);
                    });

                    it("should return a region with right property equal to 5", function() {
                        expect(region.right).toEqual(5);
                    });
                });

                describe("between region 2 and 1", function() {
                    beforeEach(function() {
                        region = region2.intersect(region1);
                    });

                    it("should not return false", function() {
                        expect(region).not.toBe(false);
                    });

                    it("should return a region with top property equal to 2", function() {
                        expect(region.top).toEqual(2);
                    });

                    it("should return a region with left property equal to 4", function() {
                        expect(region.left).toEqual(4);
                    });

                    it("should return a region with bottom property equal to 3", function() {
                        expect(region.bottom).toEqual(3);
                    });

                    it("should return a region with right property equal to 5", function() {
                        expect(region.right).toEqual(5);
                    });
                });

                describe("between region 1 and 3", function() {
                    it("should have no intersection", function() {
                        expect(region1.intersect(region3)).toBe(false);
                    });
                });

                describe("between region 3 and 1", function() {
                    it("should have no intersection1", function() {
                        expect(region3.intersect(region1)).toBe(false);
                    });
                });

                describe("between region 1 and 4", function() {
                    beforeEach(function() {
                        region = region1.intersect(region4);
                    });

                    it("should not return false", function() {
                        expect(region).not.toBe(false);
                    });

                    it("should return a region with top property equal to 3", function() {
                        expect(region.top).toEqual(3);
                    });

                    it("should return a region with left property equal to 2", function() {
                        expect(region.left).toEqual(2);
                    });

                    it("should return a region with bottom property equal to 5", function() {
                        expect(region.bottom).toEqual(5);
                    });

                    it("should return a region with right property equal to 4", function() {
                        expect(region.right).toEqual(4);
                    });
                });

                describe("between region 4 and 1", function() {
                    beforeEach(function() {
                        region = region4.intersect(region1);
                    });

                    it("should not return false", function() {
                        expect(region).not.toBe(false);
                    });

                    it("should return a region with top property equal to 3", function() {
                        expect(region.top).toEqual(3);
                    });

                    it("should return a region with left property equal to 2", function() {
                        expect(region.left).toEqual(2);
                    });

                    it("should return a region with bottom property equal to 5", function() {
                        expect(region.bottom).toEqual(5);
                    });

                    it("should return a region with right property equal to 4", function() {
                        expect(region.right).toEqual(4);
                    });
                });

                describe("between region 1 and 5", function() {
                    it("should have no intersection", function() {
                        expect(region1.intersect(region5)).toBe(false);
                    });
                });

                describe("between region 5 and 1", function() {
                    it("should have no intersection", function() {
                        expect(region5.intersect(region1)).toBe(false);
                    });
                });
            });
        });

        describe("union", function() {
            describe("form region 1 point of view", function() {
                describe("between region 1 and 2", function() {
                    beforeEach(function() {
                        region = region1.union(region2);
                    });

                    it("should return a region with top property equal to 1", function() {
                        expect(region.top).toEqual(1);
                    });

                    it("should return a region with left property equal to 1", function() {
                        expect(region.left).toEqual(1);
                    });

                    it("should return a region with bottom property equal to 6", function() {
                        expect(region.bottom).toEqual(6);
                    });

                    it("should return a region with right property equal to 6", function() {
                        expect(region.right).toEqual(6);
                    });
                });

                describe("between region 2 and 1", function() {
                    beforeEach(function() {
                        region = region2.union(region1);
                    });

                    it("should return a region with top property equal to 1", function() {
                        expect(region.top).toEqual(1);
                    });

                    it("should return a region with left property equal to 1", function() {
                        expect(region.left).toEqual(1);
                    });

                    it("should return a region with bottom property equal to 6", function() {
                        expect(region.bottom).toEqual(6);
                    });

                    it("should return a region with right property equal to 6", function() {
                        expect(region.right).toEqual(6);
                    });
                });

                describe("between region 1 and 3", function() {
                    beforeEach(function() {
                        region = region1.union(region3);
                    });

                    it("should return a region with top property equal to 0", function() {
                        expect(region.top).toEqual(0);
                    });

                    it("should return a region with left property equal to 0", function() {
                        expect(region.left).toEqual(0);
                    });

                    it("should return a region with bottom property equal to 6", function() {
                        expect(region.bottom).toEqual(6);
                    });

                    it("should return a region with right property equal to 5", function() {
                        expect(region.right).toEqual(5);
                    });
                });

                describe("between region 3 and 1", function() {
                    beforeEach(function() {
                        region = region3.union(region1);
                    });

                    it("should return a region with top property equal to 0", function() {
                        expect(region.top).toEqual(0);
                    });

                    it("should return a region with left property equal to 0", function() {
                        expect(region.left).toEqual(0);
                    });

                    it("should return a region with bottom property equal to 6", function() {
                        expect(region.bottom).toEqual(6);
                    });

                    it("should return a region with right property equal to 5", function() {
                        expect(region.right).toEqual(5);
                    });
                });

                describe("between region 1 and 4", function() {
                    beforeEach(function() {
                        region = region1.union(region4);
                    });

                    it("should return a region with top property equal to 2", function() {
                        expect(region.top).toEqual(2);
                    });

                    it("should return a region with left property equal to 1", function() {
                        expect(region.left).toEqual(1);
                    });

                    it("should return a region with bottom property equal to 6", function() {
                        expect(region.bottom).toEqual(6);
                    });

                    it("should return a region with right property equal to 5", function() {
                        expect(region.right).toEqual(5);
                    });
                });

                describe("between region 4 and 1", function() {
                    beforeEach(function() {
                        region = region4.union(region1);
                    });

                    it("should return a region with top property equal to 2", function() {
                        expect(region.top).toEqual(2);
                    });

                    it("should return a region with left property equal to 1", function() {
                        expect(region.left).toEqual(1);
                    });

                    it("should return a region with bottom property equal to 6", function() {
                        expect(region.bottom).toEqual(6);
                    });

                    it("should return a region with right property equal to 5", function() {
                        expect(region.right).toEqual(5);
                    });
                });

                describe("between region 1 and 5", function() {
                    beforeEach(function() {
                        region = region1.union(region5);
                    });

                    it("should return a region with top property equal to 2", function() {
                        expect(region.top).toEqual(2);
                    });

                    it("should return a region with left property equal to 1", function() {
                        expect(region.left).toEqual(1);
                    });

                    it("should return a region with bottom property equal to 9", function() {
                        expect(region.bottom).toEqual(9);
                    });

                    it("should return a region with right property equal to 5", function() {
                        expect(region.right).toEqual(5);
                    });
                });

                describe("between region 5 and 1", function() {
                    beforeEach(function() {
                        region = region5.union(region1);
                    });

                    it("should return a region with top property equal to 2", function() {
                        expect(region.top).toEqual(2);
                    });

                    it("should return a region with left property equal to 1", function() {
                        expect(region.left).toEqual(1);
                    });

                    it("should return a region with bottom property equal to 9", function() {
                        expect(region.bottom).toEqual(9);
                    });

                    it("should return a region with right property equal to 5", function() {
                        expect(region.right).toEqual(5);
                    });
                });
            });
        });

        describe("constrainTo", function() {
            describe("form region 1 point of view", function() {
                describe("between region 1 and 2", function() {
                    beforeEach(function() {
                        region1.constrainTo(region2);
                    });

                    it("should set region 1 top property equal to 2", function() {
                        expect(region1.top).toEqual(2);
                    });

                    it("should set region 1 left property equal to 4", function() {
                        expect(region1.left).toEqual(4);
                    });

                    it("should set region 1 bottom property equal to 3", function() {
                        expect(region1.bottom).toEqual(3);
                    });

                    it("should set region 1 right property equal to 5", function() {
                        expect(region1.right).toEqual(5);
                    });
                });

                describe("between region 1 and 3", function() {
                    beforeEach(function() {
                        region1.constrainTo(region3);
                    });

                    it("should set region 1 top property equal to 2", function() {
                        expect(region1.top).toEqual(2);
                    });

                    it("should set region 1 left property equal to 1", function() {
                        expect(region1.left).toEqual(1);
                    });

                    it("should set region 1 bottom property equal to 2", function() {
                        expect(region1.bottom).toEqual(2);
                    });

                    it("should set region 1 right property equal to 2", function() {
                        expect(region1.right).toEqual(2);
                    });
                });

                describe("between region 1 and 4", function() {
                    beforeEach(function() {
                        region1.constrainTo(region4);
                    });

                    it("should set region 1 top property equal to 3", function() {
                        expect(region1.top).toEqual(3);
                    });

                    it("should set region 1 left property equal to 2", function() {
                        expect(region1.left).toEqual(2);
                    });

                    it("should set region 1 bottom property equal to 5", function() {
                        expect(region1.bottom).toEqual(5);
                    });

                    it("should set region 1 right property equal to 4", function() {
                        expect(region1.right).toEqual(4);
                    });
                });

                describe("between region 1 and 5", function() {
                    beforeEach(function() {
                        region1.constrainTo(region5);
                    });

                    it("should set region 1 top property equal to 7", function() {
                        expect(region1.top).toEqual(7);
                    });

                    it("should set region 1 left property equal to 1", function() {
                        expect(region1.left).toEqual(1);
                    });

                    it("should set region 1 bottom property equal to 7", function() {
                        expect(region1.bottom).toEqual(7);
                    });

                    it("should set region 1 right property equal to 3", function() {
                        expect(region1.right).toEqual(3);
                    });
                });
            });
        });

        describe("adjust", function() {
            describe("modify the current region to be adjusted by offset", function() {
                beforeEach(function() {
                    region1.adjust(1, 2, 3, 4);
                });

                it("should set region 1 top property equal to 3", function() {
                    expect(region1.top).toEqual(3);
                });

                it("should set region 1 left property equal to 5", function() {
                    expect(region1.left).toEqual(5);
                });

                it("should set region 1 bottom property equal to 9", function() {
                    expect(region1.bottom).toEqual(9);
                });

                it("should set region 1 right property equal to 7", function() {
                    expect(region1.right).toEqual(7);
                });
            });
        });
    });

});
