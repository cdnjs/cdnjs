describe("Ext.Date", function() {
    describe('Elapsed time between dates', function () {
        var dateValue = 0,
            increment = 3,
            OriginalDate = Date,
            originalNow = Ext.Date.now,
            PredictableDate = function() {
                return {
                    getTime: function() {
                    },
                    valueOf: function() {
                        return PredictableDate.now();
                    }
                };
            };

        function mockDate() {
            Date = PredictableDate;
        }

        beforeEach(function () {
            Ext.Date.now = PredictableDate.now = function () {
                dateValue = dateValue + increment;
                return dateValue;
            };
        });

        afterEach(function() {
            Ext.Date.now = originalNow;
            Date = OriginalDate;
            increment += 16;
        });

        it("should get time elapsed in millisecond between date instantiation", function () {
            mockDate();
            var dateA = new PredictableDate();
            expect(Ext.Date.getElapsed(dateA)).toEqual(3);
        });

        it("should get time elapsed in millisecond between two dates", function () {
            mockDate();
            var dateA = new PredictableDate(),
                dateB = new PredictableDate();

            expect(Ext.Date.getElapsed(dateA, dateB)).toEqual(19);
        });
    });

    describe("now", function() {
       it("should return the current timestamp", function() {
          var millisBeforeCall = +new Date(),
              millisAtCall = Ext.Date.now(),
              millisAfterCall = +new Date();

          expect(millisAtCall).not.toBeLessThan(millisBeforeCall);
          expect(millisAtCall).not.toBeGreaterThan(millisAfterCall);
       });
    });

    describe("getShortMonthName", function() {
       it("should return 3 letter abbreviation for the corresponding month [0-11]", function() {
           expect(Ext.Date.getShortMonthName(0)).toBe("Jan");
           expect(Ext.Date.getShortMonthName(1)).toBe("Feb");
           expect(Ext.Date.getShortMonthName(2)).toBe("Mar");
           expect(Ext.Date.getShortMonthName(3)).toBe("Apr");
           expect(Ext.Date.getShortMonthName(4)).toBe("May");
           expect(Ext.Date.getShortMonthName(5)).toBe("Jun");
           expect(Ext.Date.getShortMonthName(6)).toBe("Jul");
           expect(Ext.Date.getShortMonthName(7)).toBe("Aug");
           expect(Ext.Date.getShortMonthName(8)).toBe("Sep");
           expect(Ext.Date.getShortMonthName(9)).toBe("Oct");
           expect(Ext.Date.getShortMonthName(10)).toBe("Nov");
           expect(Ext.Date.getShortMonthName(11)).toBe("Dec");
       });
    });

    describe("getShortDayName", function() {
       it("should return 3 letter abbreviation for the corresponding weekday [0-6]", function() {
          expect(Ext.Date.getShortDayName(0)).toBe("Sun");
          expect(Ext.Date.getShortDayName(1)).toBe("Mon");
          expect(Ext.Date.getShortDayName(2)).toBe("Tue");
          expect(Ext.Date.getShortDayName(3)).toBe("Wed");
          expect(Ext.Date.getShortDayName(4)).toBe("Thu");
          expect(Ext.Date.getShortDayName(5)).toBe("Fri");
          expect(Ext.Date.getShortDayName(6)).toBe("Sat");

       });
    });

    describe("getMonthNumber", function() {
        it("should return the month number [0-11] for the corresponding short month name", function() {
           expect(Ext.Date.getMonthNumber("jan")).toBe(0);
           expect(Ext.Date.getMonthNumber("feb")).toBe(1);
           expect(Ext.Date.getMonthNumber("mar")).toBe(2);
           expect(Ext.Date.getMonthNumber("apr")).toBe(3);
           expect(Ext.Date.getMonthNumber("MAY")).toBe(4);
           expect(Ext.Date.getMonthNumber("JUN")).toBe(5);
           expect(Ext.Date.getMonthNumber("JUL")).toBe(6);
           expect(Ext.Date.getMonthNumber("AUG")).toBe(7);
           expect(Ext.Date.getMonthNumber("Sep")).toBe(8);
           expect(Ext.Date.getMonthNumber("Oct")).toBe(9);
           expect(Ext.Date.getMonthNumber("Nov")).toBe(10);
           expect(Ext.Date.getMonthNumber("Dec")).toBe(11);
        });
        it("should return the month number [0-11] for the corresponding full month name", function() {
            expect(Ext.Date.getMonthNumber("january")).toBe(0);
            expect(Ext.Date.getMonthNumber("february")).toBe(1);
            expect(Ext.Date.getMonthNumber("march")).toBe(2);
            expect(Ext.Date.getMonthNumber("april")).toBe(3);
            expect(Ext.Date.getMonthNumber("MAY")).toBe(4);
            expect(Ext.Date.getMonthNumber("JUNE")).toBe(5);
            expect(Ext.Date.getMonthNumber("JULY")).toBe(6);
            expect(Ext.Date.getMonthNumber("AUGUST")).toBe(7);
            expect(Ext.Date.getMonthNumber("September")).toBe(8);
            expect(Ext.Date.getMonthNumber("October")).toBe(9);
            expect(Ext.Date.getMonthNumber("November")).toBe(10);
            expect(Ext.Date.getMonthNumber("December")).toBe(11);
        });
    });

    describe("formatContainsHourInfo", function() {
       it("should return true when format contains hour info", function() {
          expect(Ext.Date.formatContainsHourInfo("d/m/Y H:i:s")).toBeTruthy();
       });
       it("should return false when format doesn't contains hour info", function() {
          expect(Ext.Date.formatContainsHourInfo("d/m/Y")).toBeFalsy();
       });
    });

    describe("formatContainsDateInfo", function() {
        it("should return true when format contains date info", function() {
            expect(Ext.Date.formatContainsDateInfo("d/m/Y H:i:s")).toBeTruthy();
        });
        it("should return false when format doesn't contains date info", function() {
            expect(Ext.Date.formatContainsDateInfo("H:i:s")).toBeFalsy();
        });
    });

    describe("isValid", function() {
        it("should return true for valid dates", function() {
           expect(Ext.Date.isValid(1981, 10, 15, 16, 30, 1, 2)).toBeTruthy();
        });
        it("should return false for invalid dates", function() {
            expect(Ext.Date.isValid(999999, 10, 15, 16, 30, 1, 2)).toBeFalsy();
            expect(Ext.Date.isValid(1981, 13, 15, 16, 30, 1, 2)).toBeFalsy();
            expect(Ext.Date.isValid(1981, 10, 32, 16, 30, 1, 2)).toBeFalsy();
            expect(Ext.Date.isValid(1981, 10, 15, 25, 30, 1, 2)).toBeFalsy();
            expect(Ext.Date.isValid(1981, 10, 15, 16, 60, 1, 2)).toBeFalsy();
            expect(Ext.Date.isValid(1981, 10, 15, 16, 30, 60, 2)).toBeFalsy();
            expect(Ext.Date.isValid(1981, 10, 15, 16, 30, 1, 100000)).toBeFalsy();
        });
    });

    describe("parse", function() {
        it("should parse year-only", function() {
            var date = Ext.Date.parse("2011", "Y"),
                expectedDate = new Date();
            expectedDate.setFullYear(2011);
            expectedDate.setHours(0);
            expectedDate.setMinutes(0);
            expectedDate.setSeconds(0);
            expectedDate.setMilliseconds(0);
            expect(date).toEqual(expectedDate);
        });

        it("should parse year-month-date", function() {
            var date = Ext.Date.parse("2011-01-20", "Y-m-d"),
                expectedDate = new Date();
            expectedDate.setFullYear(2011);
            expectedDate.setMonth(0);
            expectedDate.setDate(20);
            expectedDate.setHours(0);
            expectedDate.setMinutes(0);
            expectedDate.setSeconds(0);
            expectedDate.setMilliseconds(0);
            expect(date).toEqual(expectedDate);
        });

        it("should parse year-month-date hour:minute:second am/pm", function() {
            var date = Ext.Date.parse("2011-01-20 6:28:33 PM", "Y-m-d g:i:s A"),
                expectedDate = new Date();
            expectedDate.setFullYear(2011);
            expectedDate.setMonth(0);
            expectedDate.setDate(20);
            expectedDate.setHours(18);
            expectedDate.setMinutes(28);
            expectedDate.setSeconds(33);
            expectedDate.setMilliseconds(0);
            expect(date).toEqual(expectedDate);
        });

        it("should return null when parsing an invalid date like Feb 31st in strict mode", function() {
           expect(Ext.Date.parse("2011-02-31", "Y-m-d", true)).toBeNull();
        });


        it("should read am/pm", function() {
            var date = Ext.Date.parse('2010/01/01 12:45 am', 'Y/m/d G:i a'),
                expectedDate = new Date();

            expectedDate.setFullYear(2010);
            expectedDate.setMonth(0);
            expectedDate.setDate(1);
            expectedDate.setHours(0);
            expectedDate.setMinutes(45);
            expectedDate.setSeconds(0);
            expectedDate.setMilliseconds(0);
            expect(date).toEqual(expectedDate);
        });

        it("should allow am/pm before minutes", function() {
            var date = Ext.Date.parse('2010/01/01 am 12:45', 'Y/m/d a G:i'),
                expectedDate = new Date();

            expectedDate.setFullYear(2010);
            expectedDate.setMonth(0);
            expectedDate.setDate(1);
            expectedDate.setHours(0);
            expectedDate.setMinutes(45);
            expectedDate.setSeconds(0);
            expectedDate.setMilliseconds(0);
            expect(date).toEqual(expectedDate);
        });

        it("should parse time format", function(){
            // Can't use a static date because the timezone of the
            // local machine will change the result
            var expectedDate = new Date(2010, 0, 1, 13, 45, 32, 4),
                date = Ext.Date.parse(expectedDate.getTime().toString(), 'time');

            expect(date).toEqual(expectedDate);
        });

        it("should parse timestamp format", function(){
            // Can't use a static date because the timezone of the
            // local machine will change the result
            // Drop the ms since we don't go to that resolution
            var expectedDate = new Date(2010, 0, 1, 13, 45, 32, 0),
                stamp = Math.floor(expectedDate.getTime() / 1000),
                date = Ext.Date.parse(stamp.toString(), 'timestamp');

            expect(date).toEqual(expectedDate);
        });

        describe("using separators", function(){
            it("should work with hyphen separators", function() {
                var date = Ext.Date.parse('2010-03-04', 'Y-m-d'),
                    expectedDate = new Date();

                expectedDate.setFullYear(2010);
                expectedDate.setMonth(2);
                expectedDate.setDate(4);
                expectedDate.setHours(0);
                expectedDate.setMinutes(0);
                expectedDate.setSeconds(0);
                expectedDate.setMilliseconds(0);
                expect(date).toEqual(expectedDate);

           });

           it("should work with slash separators", function() {
                var date = Ext.Date.parse('2010/03/04', 'Y/m/d'),
                    expectedDate = new Date();

                expectedDate.setFullYear(2010);
                expectedDate.setMonth(2);
                expectedDate.setDate(4);
                expectedDate.setHours(0);
                expectedDate.setMinutes(0);
                expectedDate.setSeconds(0);
                expectedDate.setMilliseconds(0);
                expect(date).toEqual(expectedDate);

           });

           it("should work with space separators", function() {
                var date = Ext.Date.parse('2010 03 04', 'Y m d'),
                    expectedDate = new Date();

                expectedDate.setFullYear(2010);
                expectedDate.setMonth(2);
                expectedDate.setDate(4);
                expectedDate.setHours(0);
                expectedDate.setMinutes(0);
                expectedDate.setSeconds(0);
                expectedDate.setMilliseconds(0);
                expect(date).toEqual(expectedDate);
           });
       });
       
       describe("week/year", function() {
           var d;
           function expectDate(year, month, day) {
               expect(d.getFullYear()).toBe(year);
               expect(d.getMonth()).toBe(month);
               expect(d.getDate()).toBe(day);
           }
           
           describe("first week of year", function() {
               it("should return the correct date for 2013", function() {
                   d = Ext.Date.parse('01/2013', 'W/Y');
                   expectDate(2012, 11, 31);
               });
               
               it("should return the correct date for 2014", function() {
                   d = Ext.Date.parse('01/2014', 'W/Y');
                   expectDate(2013, 11, 30);
               });
               
               it("should return the correct date for 2015", function() {
                   d = Ext.Date.parse('01/2015', 'W/Y');
                   expectDate(2014, 11, 29);
               });
               
               it("should return the correct date for 2016", function() {
                   d = Ext.Date.parse('01/2016', 'W/Y');
                   expectDate(2016, 0, 4);
               });
           });
           
           it("should always be a Monday", function() {
               var i, j;
               
               for (i = 2012; i <= 2020; ++i) {
                   for (j = 1; j < 53; ++j) {
                       expect(Ext.Date.parse(i + '-' + Ext.String.leftPad(j, 2, '0'), 'Y-W').getDay()).toBe(1);
                   }
               }    
           });
       });

    });

    describe("isEqual", function() {
        it("should return true if both dates are exactly the same", function() {
            var date1 = new Date(2011, 0, 20, 18, 37, 15, 0),
                date2 = new Date(2011, 0, 20, 18, 37, 15, 0);
            expect(Ext.Date.isEqual(date1, date2)).toBeTruthy();
        });
        it("should return true if there is at least 1 millisecond difference between both dates", function() {
            var date1 = new Date(2011, 0, 20, 18, 37, 15, 0),
                date2 = new Date(2011, 0, 20, 18, 37, 15, 1);
            expect(Ext.Date.isEqual(date1, date2)).toBeFalsy();
        });
        it("should return false if one one of the dates is null/undefined", function() {
           expect(Ext.Date.isEqual(new Date(), undefined)).toBeFalsy();
           expect(Ext.Date.isEqual(new Date(), null)).toBeFalsy();
           expect(Ext.Date.isEqual(undefined, new Date())).toBeFalsy();
           expect(Ext.Date.isEqual(null, new Date())).toBeFalsy();
        });
        it("should return true if both dates are null/undefined", function() {
           expect(Ext.Date.isEqual(null, null)).toBeTruthy();
           expect(Ext.Date.isEqual(null, undefined)).toBeTruthy();
           expect(Ext.Date.isEqual(undefined, null)).toBeTruthy();
           expect(Ext.Date.isEqual(undefined, undefined)).toBeTruthy();
        });
    });

    describe("getDayOfYear", function() {
       it("should return the day of year between 0 and 364 for non-leap years", function() {
           expect(Ext.Date.getDayOfYear(new Date(2001, 0, 1))).toBe(0);
           expect(Ext.Date.getDayOfYear(new Date(2001, 11, 31))).toBe(364);
       });
       it("should return the day of year between 0 and 365 for leap years", function() {
           expect(Ext.Date.getDayOfYear(new Date(2000, 0, 1))).toBe(0);
           expect(Ext.Date.getDayOfYear(new Date(2000, 11, 31))).toBe(365);
       });
    });

    describe("getFirstDayOfMonth", function() {
       it("should return the number [0-6] of the first day of month of the given date", function() {
           expect(Ext.Date.getFirstDayOfMonth(new Date(2007, 0, 1))).toBe(1);
           expect(Ext.Date.getFirstDayOfMonth(new Date(2000, 0, 2))).toBe(6);
           expect(Ext.Date.getFirstDayOfMonth(new Date(2011, 0, 3))).toBe(6);
           expect(Ext.Date.getFirstDayOfMonth(new Date(2011, 6, 4))).toBe(5);
           expect(Ext.Date.getFirstDayOfMonth(new Date(2011, 11, 5))).toBe(4);
       });
    });

    describe("getLastDayOfMonth", function() {
        it("should return the number [0-6] of the last day of month of the given date", function() {
            expect(Ext.Date.getLastDayOfMonth(new Date(2007, 0, 1))).toBe(3);
            expect(Ext.Date.getLastDayOfMonth(new Date(2000, 0, 2))).toBe(1);
            expect(Ext.Date.getLastDayOfMonth(new Date(2011, 0, 3))).toBe(1);
            expect(Ext.Date.getLastDayOfMonth(new Date(2011, 6, 4))).toBe(0);
            expect(Ext.Date.getLastDayOfMonth(new Date(2011, 11, 5))).toBe(6);
        });
    });

    describe("getFirstDateOfMonth", function() {
        it("should return the date corresponding to the first day of month of the given date", function() {
            expect(Ext.Date.getFirstDateOfMonth(new Date(2007, 0, 1))).toEqual(new Date(2007, 0, 1));
            expect(Ext.Date.getFirstDateOfMonth(new Date(2000, 0, 2))).toEqual(new Date(2000, 0, 1));
            expect(Ext.Date.getFirstDateOfMonth(new Date(2011, 0, 3))).toEqual(new Date(2011, 0, 1));
            expect(Ext.Date.getFirstDateOfMonth(new Date(2011, 6, 4))).toEqual(new Date(2011, 6, 1));
            expect(Ext.Date.getFirstDateOfMonth(new Date(2011, 11, 5))).toEqual(new Date(2011, 11, 1));
        });
    });

    describe("getLastDateOfMonth", function() {
        it("should return the date corresponding to the last day of month of the given date", function() {
            expect(Ext.Date.getLastDateOfMonth(new Date(2007, 1, 1))).toEqual(new Date(2007, 1, 28));
            expect(Ext.Date.getLastDateOfMonth(new Date(2000, 1, 2))).toEqual(new Date(2000, 1, 29));
            expect(Ext.Date.getLastDateOfMonth(new Date(2011, 0, 3))).toEqual(new Date(2011, 0, 31));
            expect(Ext.Date.getLastDateOfMonth(new Date(2011, 5, 4))).toEqual(new Date(2011, 5, 30));
            expect(Ext.Date.getLastDateOfMonth(new Date(2011, 11, 5))).toEqual(new Date(2011, 11, 31));
        });
    });

    describe("getSuffix", function() {
       it("should return st for 1, 21 and 31", function() {
          expect(Ext.Date.getSuffix(new Date(2011, 0, 1))).toBe("st");
          expect(Ext.Date.getSuffix(new Date(2011, 0, 21))).toBe("st");
          expect(Ext.Date.getSuffix(new Date(2011, 0, 31))).toBe("st");
       });
       it("should return nd for 2 and, 22", function() {
           expect(Ext.Date.getSuffix(new Date(2011, 0, 2))).toBe("nd");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 22))).toBe("nd");
       });
       it("should return rd for 3 and, 23", function() {
           expect(Ext.Date.getSuffix(new Date(2011, 0, 3))).toBe("rd");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 23))).toBe("rd");
       });
       it("should return th for days [11-13] and days ending in [4-0]", function() {
           expect(Ext.Date.getSuffix(new Date(2011, 0, 4))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 5))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 6))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 7))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 8))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 9))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 10))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 11))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 12))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 13))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 14))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 15))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 16))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 17))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 18))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 19))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 20))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 24))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 25))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 26))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 27))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 28))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 29))).toBe("th");
           expect(Ext.Date.getSuffix(new Date(2011, 0, 30))).toBe("th");
       });
    });

    describe("clone", function() {
       it("should return a copy of the given date", function() {
          var originalDate = new Date(),
              clonedDate;
          clonedDate = Ext.Date.clone(originalDate);
          expect(clonedDate).not.toBe(originalDate);
          expect(clonedDate).toEqual(originalDate);
       });
    });

    describe("isDST", function() {
        // DST detection relies on the locale of the browser running the test as different countries having different
        // versions of DST. Most countries don't observe it at all. Europe has standardized dates for switching times
        // but it differs from the dates used in the USA and Canada.
        //
        // These tests are quite loose but should pass in Europe and North America. Other countries may vary.
        //
        // Early March - USA & Canada enter DST
        // Late March - EU enters DST
        // Late October - EU leaves DST
        // Early November - USA & Canada leave DST

        // This test is disabled because it fails on the Eye but it should pass on most developer machines
        xit("should return true from the end of March till the middle of October", function() {
            expect(Ext.Date.isDST(new Date(2010, 2, 31))).toBeTruthy();
            expect(Ext.Date.isDST(new Date(2010, 3, 15))).toBeTruthy();
            expect(Ext.Date.isDST(new Date(2010, 4, 15))).toBeTruthy();
            expect(Ext.Date.isDST(new Date(2010, 5, 15))).toBeTruthy();
            expect(Ext.Date.isDST(new Date(2010, 6, 15))).toBeTruthy();
            expect(Ext.Date.isDST(new Date(2010, 7, 15))).toBeTruthy();
            expect(Ext.Date.isDST(new Date(2010, 8, 15))).toBeTruthy();
            expect(Ext.Date.isDST(new Date(2010, 9, 15))).toBeTruthy();
        });

        it("should return false from the middle of November till the start of March", function() {
            expect(Ext.Date.isDST(new Date(2010, 10, 15))).toBeFalsy();
            expect(Ext.Date.isDST(new Date(2010, 11, 15))).toBeFalsy();
            expect(Ext.Date.isDST(new Date(2010, 0, 15))).toBeFalsy();
            expect(Ext.Date.isDST(new Date(2010, 1, 15))).toBeFalsy();
            expect(Ext.Date.isDST(new Date(2010, 2, 1))).toBeFalsy();
       });
    });

    describe("clearTime", function() {
       it("should reset hrs/mins/secs/millis to 0", function() {
           var date = new Date(2012, 11, 21, 21, 21, 21, 21);
           Ext.Date.clearTime(date);
           expect(date.getHours()).toBe(0);
           expect(date.getMinutes()).toBe(0);
           expect(date.getSeconds()).toBe(0);
           expect(date.getMilliseconds()).toBe(0);
       });
       it("should return a clone with hrs/mins/secs/millis reseted to 0 when clone option is selected", function() {
           var date = new Date(2012, 11, 21, 21, 21, 21, 21),
               clearedTimeDate;
           clearedTimeDate = Ext.Date.clearTime(date, true);
           expect(date.getHours()).toBe(21);
           expect(date.getMinutes()).toBe(21);
           expect(date.getSeconds()).toBe(21);
           expect(date.getMilliseconds()).toBe(21);
           expect(clearedTimeDate.getHours()).toBe(0);
           expect(clearedTimeDate.getMinutes()).toBe(0);
           expect(clearedTimeDate.getSeconds()).toBe(0);
           expect(clearedTimeDate.getMilliseconds()).toBe(0);
       });
    });

    describe("add", function() {
        var date = new Date(2000, 0, 1, 0, 0, 0, 0);
        it("should add milliseconds", function() {
            expect(Ext.Date.add(date, Ext.Date.MILLI, 1)).toEqual(new Date(2000, 0, 1, 0, 0, 0, 1));
        });
        it("should add seconds", function() {
            expect(Ext.Date.add(date, Ext.Date.SECOND, 1)).toEqual(new Date(2000, 0, 1, 0, 0, 1, 0));
        });
        it("should add minutes", function() {
            expect(Ext.Date.add(date, Ext.Date.MINUTE, 1)).toEqual(new Date(2000, 0, 1, 0, 1, 0, 0));
        });
        it("should add hours", function() {
            expect(Ext.Date.add(date, Ext.Date.HOUR, 1)).toEqual(new Date(2000, 0, 1, 1, 0, 0, 0));
        });
        it("should add days", function() {
            expect(Ext.Date.add(date, Ext.Date.DAY, 1)).toEqual(new Date(2000, 0, 2, 0, 0, 0, 0));
        });
        it("should add months", function() {
            expect(Ext.Date.add(date, Ext.Date.MONTH, 1)).toEqual(new Date(2000, 1, 1, 0, 0, 0, 0));
        });
        it("should add years", function() {
           expect(Ext.Date.add(date, Ext.Date.YEAR, 1)).toEqual(new Date(2001, 0, 1, 0, 0, 0, 0));
        });
        it("should consider last day of month when adding months", function() {
           expect(Ext.Date.add(new Date(2001, 0, 29), Ext.Date.MONTH, 1)).toEqual(new Date(2001, 1, 28));
           expect(Ext.Date.add(new Date(2001, 0, 30), Ext.Date.MONTH, 1)).toEqual(new Date(2001, 1, 28));
           expect(Ext.Date.add(new Date(2001, 0, 31), Ext.Date.MONTH, 1)).toEqual(new Date(2001, 1, 28));
           expect(Ext.Date.add(new Date(2000, 0, 29), Ext.Date.MONTH, 1)).toEqual(new Date(2000, 1, 29));
           expect(Ext.Date.add(new Date(2000, 0, 30), Ext.Date.MONTH, 1)).toEqual(new Date(2000, 1, 29));
           expect(Ext.Date.add(new Date(2000, 0, 31), Ext.Date.MONTH, 1)).toEqual(new Date(2000, 1, 29));
        });
        it("should consider last day of month when adding years", function() {
            expect(Ext.Date.add(new Date(2000, 1, 29), Ext.Date.YEAR, 1)).toEqual(new Date(2001, 1, 28));
        });
    });

    describe("between", function() {
        var startDate = new Date(2000, 0, 1),
            endDate = new Date(2000, 0, 31);
        it("should return true if the date is equal to the start date", function() {
            expect(Ext.Date.between(new Date(2000, 0, 1), startDate, endDate)).toBeTruthy();
        });
        it("should return true if the date is equal to the end date", function() {
            expect(Ext.Date.between(new Date(2000, 0, 31), startDate, endDate)).toBeTruthy();
        });
        it("should return true if date is between start and end dates", function() {
            expect(Ext.Date.between(new Date(2000, 0, 15), startDate, endDate)).toBeTruthy();
        });
        it("should return false if date is before start date", function() {
            expect(Ext.Date.between(new Date(1999, 11, 31, 23, 59, 59), startDate, endDate)).toBeFalsy();
        });
        it("should return false if date is after end date", function() {
            expect(Ext.Date.between(new Date(2000, 0, 31, 0, 0, 1), startDate, endDate)).toBeFalsy();
        });
    });

    describe("formatting", function(){
        var date = new Date(2010, 0, 1, 13, 45, 32, 4),
            format = Ext.Date.format;

        it("should format with the d option", function(){
            expect(format(date, 'd')).toBe('01');
        });

        it("should format with the D option", function(){
            expect(format(date, 'D')).toBe('Fri');
        });

        it("should format with the j option", function(){
            expect(format(date, 'j')).toBe('1');
        });

        it("should format with the l option", function(){
            expect(format(date, 'l')).toBe('Friday');
        });

        it("should format with the N option", function(){
            expect(format(date, 'N')).toBe('5');
        });

        it("should format with the S option", function(){
            expect(format(date, 'S')).toBe('st');
        });

        it("should format with the w option", function(){
            expect(format(date, 'w')).toBe('5');
        });

        it("should format with the z option", function(){
            expect(format(date, 'z')).toBe('0');
        });

        it("should format with the W option", function(){
            expect(format(date, 'W')).toBe('53');
        });

        it("should format with the F option", function(){
            expect(format(date, 'F')).toBe('January');
        });

        it("should format with the m option", function(){
            expect(format(date, 'm')).toBe('01');
        });

        it("should format with the M option", function(){
            expect(format(date, 'M')).toBe('Jan');
        });

        it("should format with the n option", function(){
            expect(format(date, 'n')).toBe('1');
        });

        it("should format with the t option", function(){
            expect(format(date, 't')).toBe('31');
        });

        it("should format with the L option", function(){
            expect(format(date, 'L')).toBe('0');
        });

        it("should format with the o option", function(){
            expect(format(date, 'o')).toBe('2009');
        });

        it("should format with the Y option", function(){
            expect(format(date, 'Y')).toBe('2010');
        });

        it("should format with the y option", function(){
            expect(format(date, 'y')).toBe('10');
        });

        it("should format with the a option", function(){
            expect(format(date, 'a')).toBe('pm');
        });

        it("should format with the A option", function(){
            expect(format(date, 'A')).toBe('PM');
        });

        it("should format with the g option", function(){
            expect(format(date, 'g')).toBe('1');
        });

        it("should format with the G option", function(){
            expect(format(date, 'G')).toBe('13');
        });

        it("should format with the h option", function(){
            expect(format(date, 'h')).toBe('01');
        });

        it("should format with the H option", function(){
            expect(format(date, 'H')).toBe('13');
        });

        it("should format with the i option", function(){
            expect(format(date, 'i')).toBe('45');
        });

        it("should format with the s option", function(){
            expect(format(date, 's')).toBe('32');
        });

        it("should format with the u option", function(){
            expect(format(date, 'u')).toBe('004');
        });

        // can't be static, relies on TZ
        it("should format with the O option", function(){
            var value = Ext.Date.getGMTOffset(date, false);
            expect(format(date, 'O')).toBe(value);
        });

        // can't be static, relies on TZ
        it("should format with the P option", function(){
            var value = Ext.Date.getGMTOffset(date, true);
            expect(format(date, 'P')).toBe(value);
        });

        // can't be static, relies on TZ
        it("should format with the T option", function(){
            var value = Ext.Date.getTimezone(date);
            expect(format(date, 'T')).toBe(value);
        });

        // can't be static, relies on TZ
        it("should format with the Z option", function(){
            var value = (date.getTimezoneOffset() * -60) + '';
            expect(format(date, 'Z')).toBe(value);
        });

        // can't be static, relies on TZ
        it("should format with the c option", function(){
            var value = '2010-01-01T13:45:32' + Ext.Date.getGMTOffset(date, true);
            expect(format(date, 'c')).toBe(value);
        });

        it("should format with the U option", function(){
            var value = Math.round((date.getTime() / 1000)) + '';
            expect(format(date, 'U')).toBe(value);
        });

        it("should format with the MS option", function(){
            var value = '\\/Date(' + date.getTime() + ')\\/';
            expect(format(date, 'MS')).toBe(value);
        });

        it("should format the time option", function(){
            // Can't use a static date because the timezone of the
            // local machine will change the result
            var value = date.getTime().toString();
            expect(format(date, 'time')).toBe(value);
        });

        it("should format the timestamp option", function(){
            // Can't use a static date because the timezone of the
            // local machine will change the result
            var stamp = Math.floor(date.getTime() / 1000),
                value = stamp.toString();

            expect(format(date, 'timestamp')).toBe(value);
        });

        it("should return an empty string", function(){
            expect(format(undefined, 'd')).toBe('');
            expect(format(null, 'd')).toBe('');
            expect(format({}, 'd')).toBe('');
            expect(format([], 'd')).toBe('');
            expect(format('', 'd')).toBe('');
            expect(format(true, 'd')).toBe('');
            expect(format(1992, 'd')).toBe('');
        });

        it("should not return an empty string", function(){
            expect(format(new Date(), 'd')).not.toBe('');
        });
    });

    describe("ISO-8601", function () {
        var ExtDate = Ext.Date;

        describe("dates", function () {
            describe("W - week", function () {
                it("should parse with the W option", function () {
                    expect(ExtDate.parse('40', 'W')).not.toBe(undefined);
                });

                it("should only parse weeks 1 - 9 when prefixed by a zero (0)", function () {
                    expect(ExtDate.parse('01', 'W')).not.toBe(undefined);
                });

                it("should not parse weeks 1 - 9 when not prefixed by a zero (0)", function () {
                    expect(ExtDate.parse('1', 'W')).toBe(undefined);
                });

                it("should start with Monday", function () {
                    // getDay() ... Monday === 1
                    expect(ExtDate.parse('01', 'W').getDay()).toBe(1);
                });
            });

            describe("o - year", function () {
                it("should parse with the o option", function () {
                    expect(ExtDate.parse('2012', 'o')).not.toBe(undefined);
                });

                it("should behave the same as Y when not parsed with another option", function(){
                    expect(ExtDate.parse('2012', 'o').getTime()).toBe(ExtDate.parse('2012', 'Y').getTime());
                });
            });

            describe("can be part of year not same as the 'o' parse code", function () {
                it("should be the previous year than 'o' parse code", function () {
                    expect(ExtDate.parse('2008-01', 'o-W').getFullYear()).toBe(2007);
                });

                it("should set the same year if required", function () {
                    expect(ExtDate.parse('2009-53', 'o-W').getFullYear()).toBe(2009);
                });
            });
        });

        describe("times", function () {
            it("should correctly parse ISO format", function() {
                var date = Ext.Date.parse('2012-01-13T01:00:00', 'c'),
                    expectedDate = new Date();

                expectedDate.setFullYear(2012);
                expectedDate.setMonth(0);
                expectedDate.setDate(13);
                expectedDate.setHours(1);
                expectedDate.setMinutes(0);
                expectedDate.setSeconds(0);
                expectedDate.setMilliseconds(0);
                expect(date).toEqual(expectedDate);

                date = Ext.Date.parse('2012-01-13T13:00:00', 'c');
                expectedDate.setFullYear(2012);
                expectedDate.setMonth(0);
                expectedDate.setDate(13);
                expectedDate.setHours(13);
                expectedDate.setMinutes(0);
                expectedDate.setSeconds(0);
                expectedDate.setMilliseconds(0);
                expect(date).toEqual(expectedDate);
            });

            describe("time zones", function(){
                it("should evaluate as equal dates with the same time zone", function(){
                    var date, expectedDate;

                    date = Ext.Date.parse("2012-10-03T20:29:24+12:00", "c");

                    /*
                     * IE older than 9 don't support ISO 8601 date notation and return NaN.
                     * OTOH the browsers that do support ISO 8601 can be used as additional check.
                     * JS dates don't work with timezones so there's always a potential for
                     * errors in manual calculations, and this way we can be sure that this stuff
                     * actually works as expected; if there's an error it'll blow up either in
                     * old IEs or modern browsers.
                     */
                    if (Ext.isIE8) {
                        expectedDate = new Date(0);
                        expectedDate.setUTCFullYear(2012);
                        expectedDate.setUTCMonth(9);
                        expectedDate.setUTCDate(3);
                        expectedDate.setUTCHours(20);
                        expectedDate.setUTCMinutes(29);
                        expectedDate.setUTCSeconds(24);
                        expectedDate = new Date(expectedDate.valueOf() - 12*3600*1000);
                    }
                    else {
                        expectedDate = new Date("2012-10-03T20:29:24+12:00");
                    }

                    expect(expectedDate.getTime()).toEqual(date.getTime());
                });

                it("should evaluate as equal dates with different time zones", function(){
                    // NOTE one hour difference between these times.
                    var date, expectedDate,
                        oneHourInMs = 1000 * 60 * 60; // 3,600,000

                    date = Ext.Date.parse("2012-10-03T20:29:24+12:00", "c");

                    // See above
                    if (Ext.isIE8) {
                        expectedDate = new Date(0);
                        expectedDate.setUTCFullYear(2012);
                        expectedDate.setUTCMonth(9);
                        expectedDate.setUTCDate(3);
                        expectedDate.setUTCHours(20);
                        expectedDate.setUTCMinutes(29);
                        expectedDate.setUTCSeconds(24);
                        expectedDate = new Date(expectedDate.valueOf() - 13*3600*1000);
                    }
                    else {
                        expectedDate = new Date("2012-10-03T20:29:24+13:00");
                    }

                    expect(expectedDate.getTime() + oneHourInMs).toEqual(date.getTime());
                });

                it("should evaluate as not equal dates with different time zones", function(){
                    var date = Ext.Date.parse("2012-10-03T20:29:24+12:00", "c"),
                        expectedDate = new Date("2012-10-03T20:29:24+13:00");

                    expect(expectedDate.getTime()).not.toEqual(date.getTime());
                });
            });
        });
    });
});
