describe("Ext.Version", function() {
    var version = new Ext.Version("1.2.3beta");

    describe("toString", function() {
        it("should cast to string", function() {
            expect(version+"").toBe("1.2.3beta");
        });
    });

    describe("getMajor", function() {
        it("should return 1", function() {
            expect(version.getMajor()).toBe(1);
        });
    });

    describe("getMinor", function() {
        it("should return 2", function() {
            expect(version.getMinor()).toBe(2);
        });
    });

    describe("getPatch", function() {
        it("should return 3", function() {
            expect(version.getPatch()).toBe(3);
        });
    });

    describe("getBuild", function() {
        it("should return 0", function() {
            expect(version.getBuild()).toBe(0);
        });
    });

    describe("getRelease", function() {
        it("should return beta", function() {
            expect(version.getRelease()).toBe("beta");
        });
    });

    describe("getShortVersion", function() {
        it("should return 123", function() {
            expect(version.getShortVersion()).toBe("123");
        });
    });

    describe("toArray", function() {
        it("should return [1, 2, 3, 0, 'beta']", function() {
            expect(version.toArray()).toEqual([1, 2, 3, 0, 'beta']);
        });
    });

    describe("isGreaterThan", function() {
        it("should be greater than 1.2.3alpha", function() {
            expect(version.isGreaterThan("1.2.3alpha")).toBeTruthy();
        });
        it("should not be greater than 1.2.3RC", function() {
            expect(version.isGreaterThan("1.2.3RC")).toBeFalsy();
        });
    });

    describe("isLessThan", function() {
        it("should not be smaller than 1.2.3alpha", function() {
            expect(version.isLessThan("1.2.3alpha")).toBeFalsy();
        });
        it("should be smaller than 1.2.3RC", function() {
            expect(version.isLessThan("1.2.3RC")).toBeTruthy();
        });
    });

    describe("equals", function() {
        it("should equals 1.2.3beta", function() {
            expect(version.equals("1.2.3beta")).toBeTruthy();
        });
    });

    describe("compareTo", function () {
        function compareTo (v1, v2, expected) {
            var v = new Ext.Version(v1);
            var c = v.compareTo(v2);
            if (c !== expected) {
                // give a better failure message than "expected 1 to be 0":
                expect('new Version('+v1+').compareTo('+v2+') == ' + c).toBe(expected);
            } else {
                expect(c).toBe(expected);
            }
        }

        describe("Zero padding vs", function () {
            describe("Upper bound", function () {
                it('should be less than', function () {
                    compareTo('2.3', '^2.3.0', -1);
                    compareTo('2.3', '^2.3', -1);
                    compareTo('2.3', '^2', -1);
                });
                it('should be greater than', function () {
                    compareTo('2.3', '^2.2', 1);
                    compareTo('2.3', '^1', 1);
                });
            });

            describe("Prefix match", function () {
                it('should be less than', function () {
                    compareTo('2.3', '~2.3.1', -1);
                    compareTo('2.3', '~2.4', -1);
                    compareTo('2.3', '~3', -1);
                });
                it('should be equal', function () {
                    compareTo('2.3', '~2', 0);
                    compareTo('2.3', '~2.3', 0);
                    compareTo('2.3', '~2.3.0', 0);
                });
                it('should be greater than', function () {
                    compareTo('2.3', '~2.2', 1);
                    compareTo('2.3', '~1', 1);
                });
            });
        });

        describe("Upper bound vs", function () {
            describe("Zero padding", function () {
                it('should be less than', function () {
                    compareTo('^2.3', '2.4', -1);
                    compareTo('^2.3', '3', -1);
                });
                it('should be greater than', function () {
                    compareTo('^2.3', '1', 1);
                    compareTo('^2.3', '2', 1);
                    compareTo('^2.3', '2.3', 1);
                    compareTo('^2.3', '2.2', 1);
                    compareTo('^2.3', '2.3.9', 1);
                });
            });

            describe("Upper bound", function () {
                it('should be less than', function () {
                    compareTo('^2.3', '^2.4', -1);
                    compareTo('^2.3', '^3', -1);
                });
                it('should be equal', function () {
                    compareTo('^2.3', '^2.3', 0);
                });
                it('should be greater than', function () {
                    compareTo('^2.3', '^2.2', 1);
                    compareTo('^2.3', '^1', 1);
                });
            });

            describe("Prefix match", function () {
                it('should be less than', function () {
                    compareTo('^2.3', '~2.4', -1);
                    compareTo('^2.3', '~3', -1);
                });
                it('should be equal', function () {
                    compareTo('^2.3', '~2.3', 0);
                    compareTo('^2.3', '~2', 0);
                });
                it('should be greater than', function () {
                    compareTo('^2.3', '~2.2', 1);
                    compareTo('^2.3', '~1', 1);
                });
            });
        }); // Upper bound

        describe("Prefix match vs", function () {
            describe("Zero padding", function () {
                it('should be less than', function () {
                    compareTo('~2.3', '2.4', -1);
                    compareTo('~2.3', '3', -1);
                });
                it('should be equal', function () {
                    compareTo('~2.3', '2.3.4.5', 0);
                    compareTo('~2.3', '2.3.4', 0);
                    compareTo('~2.3', '2.3', 0);
                });
                it('should be greater than', function () {
                    compareTo('~2.3', '2.2', 1);
                    compareTo('~2.3', '2', 1);
                    compareTo('~2.3', '1', 1);
                });
            });

            describe("Upper bound", function () {
                it('should be less than', function () {
                    compareTo('~2.3', '^2.4', -1);
                    compareTo('~2.3', '^2', -1);
                });
                it('should be equal', function () {
                    compareTo('~2.3', '^2.3.4', 0);
                    compareTo('~2.3', '^2.3', 0);
                });
                it('should be greater than', function () {
                    compareTo('~2.3', '^2.2', 1);
                    compareTo('~2.3', '^2.1', 1);
                    compareTo('~2.3', '^1', 1);
                });
            });

            describe("Prefix match", function () {
                it('should be less than', function () {
                    compareTo('~2.3', '~2.4', -1);
                    compareTo('~2.3', '~3', -1);
                });
                it('should be equal', function () {
                    compareTo('~2.3', '~2.3.4', 0);
                    compareTo('~2.3', '~2.3', 0);
                    compareTo('~2.3', '~2', 0);
                });
                it('should be greater than', function () {
                    compareTo('~2.3', '~2.2', 1);
                    compareTo('~2.3', '~1', 1);
                });
            });
        }); // Prefix match
    }); // compareTo

    describe("match", function() {
        it("should match integer 1", function() {
            expect(version.match(1)).toBeTruthy();
        });
        it("should match float 1.2", function() {
            expect(version.match(1.2)).toBeTruthy();
        });
        it("should match string 1.2.3", function() {
            expect(version.match("1.2.3")).toBeTruthy();
        });
        it("should not match string 1.2.3alpha", function() {
            expect(version.match("1.2.3alpha")).toBeFalsy();
        });
    });
    
   describe("setVersion", function() {
        it("should return an instance of Ext.Version", function() {
            Ext.setVersion("test", "1.0.1");
            expect(Ext.getVersion("test") instanceof Ext.Version).toBe(true);
        });
    });
    
    describe("statics", function() {
        describe("getComponentValue", function() {
            it("should return 0", function() {
                expect(Ext.Version.getComponentValue(undefined)).toBe(0);
            });

            it("should return -2", function() {
                expect(Ext.Version.getComponentValue(-2)).toBe(-2);
            });

            it("should return 2", function() {
                expect(Ext.Version.getComponentValue("2")).toBe(2);
            });

            it("should return -5", function() {
                expect(Ext.Version.getComponentValue("alpha")).toBe(-5);
            });

            it("should return unknown", function() {
                expect(Ext.Version.getComponentValue("unknown")).toBe("unknown");
            });
        });

        describe("compare", function() {
            it("should return 1", function() {
                expect(Ext.Version.compare("1.2.3beta", "1.2.2")).toBe(1);
                expect(Ext.Version.compare("1.2.3beta", 1)).toBe(1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3dev")).toBe(1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3alpha")).toBe(1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3a")).toBe(1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3alpha")).toBe(1);
            });

            it("should return -1", function() {
                expect(Ext.Version.compare("1.2.3beta", 2)).toBe(-1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.4")).toBe(-1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3RC")).toBe(-1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3rc")).toBe(-1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3#")).toBe(-1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3pl")).toBe(-1);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3p")).toBe(-1);
            });

            it("should return 0", function() {
                expect(Ext.Version.compare("1.2.3beta", "1.2.3b")).toBe(0);
                expect(Ext.Version.compare("1.2.3beta", "1.2.3beta")).toBe(0);
            });
        });    
    });

    describe('checkVersion', function () {
        var oldVers = Ext.versions,
            versions1 = {
                // we specify full versions here because this is what Cmd will generate
                // for us *and* we need to be sure our checks properly match on prefix:
                //
                ext: new Ext.Version('4.2.2.900'), // <== this is used for unnamed versions
                foo: new Ext.Version('3.0.2.123'),
                bar: new Ext.Version('1.5'), // special case here
                jazz: new Ext.Version('5.2.2.456')
            };

        afterEach(function () {
            Ext.versions = oldVers;
        });
        beforeEach(function () {
            Ext.versions = versions1;
        });

        describe('Default package', function () {
            describe('simple versions check', function () {
                it('should handle match', function () {
                    var result = Ext.checkVersion('4.2.2');
                    expect(result).toBe(true);
                });

                it('should handle mismatch', function () {
                    var result = Ext.checkVersion('4.2.1');
                    expect(result).toBe(false);
                });
            });

            describe('simple version range check', function () {
                it('should handle match', function () {
                    var result = Ext.checkVersion('4.2.0-4.2.2');
                    expect(result).toBe(true);
                });

                it('should handle mismatch', function () {
                    var result = Ext.checkVersion('3.4-4.2.1');
                    expect(result).toBe(false);
                });
            });

            describe('no lower bound version range check', function () {
                it('should handle match', function () {
                    var result = Ext.checkVersion(' - 4.2.2');
                    expect(result).toBe(true);
                });

                it('should handle mismatch', function () {
                    var result = Ext.checkVersion(' -4.2.1');
                    expect(result).toBe(false);
                });
            });

            describe('no upper bound version range check', function () {
                it('should handle match using "-"', function () {
                    var result = Ext.checkVersion('4.2.0 -');
                    expect(result).toBe(true);
                });

                it('should handle match using "+"', function () {
                    var result = Ext.checkVersion('4.2.0 + ');
                    expect(result).toBe(true);
                });

                it('should handle mismatch using "-"', function () {
                    var result = Ext.checkVersion('4.4-');
                    expect(result).toBe(false);
                });

                it('should handle mismatch using "+"', function () {
                    var result = Ext.checkVersion('4.4+');
                    expect(result).toBe(false);
                });
            });

            describe('matchAny compound version check', function () {
                it('should find matching version', function () {
                    var result = Ext.checkVersion(['4.2.1', '4.2.2']);
                    expect(result).toBe(true);
                });

                it('should find matching version in range', function () {
                    var result = Ext.checkVersion(['4.2.0', '4.2.1 - 4.3']);
                    expect(result).toBe(true);
                });

                it('should find mismatching version', function () {
                    var result = Ext.checkVersion(['4.2.1', '4.2.3']);
                    expect(result).toBe(false);
                });

                it('should find mismatching version not in range', function () {
                    var result = Ext.checkVersion(['4.2.1', '4.2.3 - 4.5']);
                    expect(result).toBe(false);
                });
            });

            describe('matchAll compound version check', function () {
                it('should find matching version', function () {
                    var result = Ext.checkVersion(['4.2.2', '4.2.2'], true);
                    expect(result).toBe(true);
                });

                it('should find matching version in range', function () {
                    var result = Ext.checkVersion(['4.2.2', '4.2.1 - 4.3'], true);
                    expect(result).toBe(true);
                });

                it('should find mismatching version', function () {
                    var result = Ext.checkVersion(['4.2.2', '4.2.3'], true);
                    expect(result).toBe(false);
                });

                it('should find mismatching version not in range', function () {
                    var result = Ext.checkVersion(['4.2.2', '4.2.3 - 4.5'], true);
                    expect(result).toBe(false);
                });
            });
        }); // Default package

        describe('Named package', function () {
            describe('simple versions check', function () {
                it('should handle match', function () {
                    var result = Ext.checkVersion('jazz@5.2.2');
                    expect(result).toBe(true);
                });

                it('should handle mismatch', function () {
                    var result = Ext.checkVersion('jazz @ 5.2.1');
                    expect(result).toBe(false);
                });

                it('should handle mismatch on unknown package', function () {
                    var result = Ext.checkVersion('zip@1.2');
                    expect(result).toBe(false);
                });
            });

            describe('simple version range check', function () {
                it('should handle match', function () {
                    var result = Ext.checkVersion('jazz @5.2.0 -5.2.2');
                    expect(result).toBe(true);
                });

                it('should handle mismatch', function () {
                    var result = Ext.checkVersion('jazz@3.4-5.2.1');
                    expect(result).toBe(false);
                });
            });

            describe('no lower bound version range check', function () {
                it('should handle match', function () {
                    var result = Ext.checkVersion('jazz@-5.2.2');
                    expect(result).toBe(true);
                });

                it('should handle mismatch', function () {
                    var result = Ext.checkVersion('jazz@-5.2.1');
                    expect(result).toBe(false);
                });
            });

            describe('no upper bound version range check', function () {
                it('should handle match using "-"', function () {
                    var result = Ext.checkVersion('jazz@5.2.0-');
                    expect(result).toBe(true);
                });

                it('should handle match using "+"', function () {
                    var result = Ext.checkVersion('jazz@5.2.0+');
                    expect(result).toBe(true);
                });

                it('should handle mismatch using "-"', function () {
                    var result = Ext.checkVersion('jazz@5.4-');
                    expect(result).toBe(false);
                });

                it('should handle mismatch using "+"', function () {
                    var result = Ext.checkVersion('jazz@5.4+');
                    expect(result).toBe(false);
                });
            });

            describe('matchAny compound version check', function () {
                it('should find matching version', function () {
                    var result = Ext.checkVersion(['jazz@5.2.1', 'jazz@5.2.2']);
                    expect(result).toBe(true);
                });

                it('should find matching version in range', function () {
                    var result = Ext.checkVersion(['jazz@5.2.0', 'jazz@5.2.1-5.3']);
                    expect(result).toBe(true);
                });

                it('should find mismatching version', function () {
                    var result = Ext.checkVersion(['jazz@5.2.1', 'jazz@5.2.3']);
                    expect(result).toBe(false);
                });

                it('should find mismatching version not in range', function () {
                    var result = Ext.checkVersion(['jazz@5.2.1', 'jazz@5.2.3-5.5']);
                    expect(result).toBe(false);
                });
            });

            describe('matchAll compound version check', function () {
                it('should find matching version', function () {
                    var result = Ext.checkVersion(['jazz@5.2.2', 'jazz@5.2.2'], true);
                    expect(result).toBe(true);
                });

                it('should find matching version in range', function () {
                    var result = Ext.checkVersion(['jazz@5.2.2', 'jazz@5.2.1-5.3'], true);
                    expect(result).toBe(true);
                });

                it('should find mismatching version', function () {
                    var result = Ext.checkVersion(['jazz@5.2.2', 'jazz@5.2.3'], true);
                    expect(result).toBe(false);
                });

                it('should find mismatching version not in range', function () {
                    var result = Ext.checkVersion(['jazz@5.2.2', 'jazz@5.2.3-5.5'], true);
                    expect(result).toBe(false);
                });
            });
        }); // Named package

        describe('Multiple packages', function () {
            describe('matchAny', function () {
                it('should find basic match', function () {
                    var result = Ext.checkVersion(['4.2.2', 'jazz@5.2.2']);
                    expect(result).toBe(true);
                });

                it('should find AND match', function () {
                    var result = Ext.checkVersion({
                        and: ['4.2.2', 'jazz@5.2.2']
                    });
                    expect(result).toBe(true);
                });
            });

            describe('matchAll', function () {
                it('should find basic match', function () {
                    var result = Ext.checkVersion(['4.2.2', 'jazz@5.2.2'], true);
                    expect(result).toBe(true);
                });
            });
        }); // Multiple packages

        describe('Complex criteria', function () {
            it('should find basic "and" match', function () {
                var result = Ext.checkVersion({
                    and: [
                        '4.2.2', // T
                        'jazz@5.2.2' // T
                    ]
                });

                expect(result).toBe(true);
            });

            it('should find basic "and" match with "not"', function () {
                var result = Ext.checkVersion({
                    not: true,
                    and: [
                        '4.2.2', // T
                        'jazz@5.2.2' // T
                    ]
                });

                expect(result).toBe(false);
            });

            it('should find basic "or" match', function () {
                var result = Ext.checkVersion({
                    or: [
                        '4.2.1', // F
                        'jazz@5.2.2' // T
                    ]
                }, true);

                expect(result).toBe(true);
            });

            it('should find basic "or" match with "not"', function () {
                var result = Ext.checkVersion({
                    not: true,
                    or: [
                        '4.2.1', // F
                        'jazz@5.2.2' // T
                    ]
                }, true);

                expect(result).toBe(false);
            });

            it('should handle nested matches', function () {
                //foo: new Ext.Version('3.0.2.123'),
                //bar: new Ext.Version('1.5'),
                //jazz: new Ext.Version('5.2.2.456')
                var result = Ext.checkVersion([
                    '4.2.1', // F
                    {
                        and: [
                            'jazz@5.2.2', // T
                            {
                                or: [
                                    'foo@3.2-4.1', // F
                                    'bar@1.2.2-2', // T
                                ]
                            },
                            'foo@2.2-3.0.1' // F
                        ]
                    },
                    {
                        or: [
                            'foo@3.2-4.1', // F
                            'bar@1.2.2-2', // T
                        ]
                    }
                ]);

                expect(result).toBe(true);
            });
        });
    });
});
