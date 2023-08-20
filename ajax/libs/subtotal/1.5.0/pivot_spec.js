(function() {
  var fixtureData;

  fixtureData = [["name", "gender", "colour", "birthday", "trials", "successes"], ["Nick", "male", "blue", "1982-11-07", 103, 12], ["Jane", "female", "red", "1982-11-08", 95, 25], ["John", "male", "blue", "1982-12-08", 112, 30], ["Carol", "female", "yellow", "1983-12-08", 102, 14]];

  describe("$.pivotUI()", function() {
    describe("with no rows/cols, default count aggregator, default TableRenderer", function() {
      var table;
      table = null;
      beforeEach(function(done) {
        return table = $("<div>").pivotUI(fixtureData, {
          onRefresh: done
        });
      });
      it("has all the basic UI elements", function(done) {
        expect(table.find("td.pvtAxisContainer").length).toBe(3);
        expect(table.find("td.pvtRendererArea").length).toBe(1);
        expect(table.find("td.pvtVals").length).toBe(1);
        expect(table.find("select.pvtRenderer").length).toBe(1);
        expect(table.find("select.pvtAggregator").length).toBe(1);
        expect(table.find("span.pvtAttr").length).toBe(6);
        return done();
      });
      it("reflects its inputs", function(done) {
        expect(table.find("td.pvtUnused span.pvtAttr").length).toBe(6);
        expect(table.find("select.pvtRenderer").val()).toBe("Table");
        expect(table.find("select.pvtAggregator").val()).toBe("Count");
        return done();
      });
      it("renders a table", function(done) {
        expect(table.find("table.pvtTable").length).toBe(1);
        return done();
      });
      return describe("its renderer output", function() {
        it("has the correct type and number of cells", function(done) {
          expect(table.find("th.pvtTotalLabel").length).toBe(1);
          expect(table.find("td.pvtGrandTotal").length).toBe(1);
          return done();
        });
        it("has the correct textual representation", function(done) {
          expect(table.find("table.pvtTable").text()).toBe(["Totals", "4"].join(""));
          return done();
        });
        return it("has a correct grand total with data value", function(done) {
          expect(table.find("td.pvtGrandTotal").text()).toBe("4");
          expect(table.find("td.pvtGrandTotal").data("value")).toBe(4);
          return done();
        });
      });
    });
    return describe("with rows/cols, sum-over-sum aggregator, Heatmap renderer", function() {
      var table;
      table = null;
      beforeEach(function(done) {
        return table = $("<div>").pivotUI(fixtureData, {
          rows: ["gender"],
          cols: ["colour"],
          aggregatorName: "Sum over Sum",
          vals: ["successes", "trials"],
          rendererName: "Heatmap",
          onRefresh: done
        });
      });
      it("has all the basic UI elements", function(done) {
        expect(table.find("td.pvtAxisContainer").length).toBe(3);
        expect(table.find("td.pvtRendererArea").length).toBe(1);
        expect(table.find("td.pvtVals").length).toBe(1);
        expect(table.find("select.pvtRenderer").length).toBe(1);
        expect(table.find("select.pvtAggregator").length).toBe(1);
        expect(table.find("span.pvtAttr").length).toBe(6);
        return done();
      });
      it("reflects its inputs", function(done) {
        expect(table.find("td.pvtUnused span.pvtAttr").length).toBe(4);
        expect(table.find("td.pvtRows span.pvtAttr").length).toBe(1);
        expect(table.find("td.pvtCols span.pvtAttr").length).toBe(1);
        expect(table.find("select.pvtRenderer").val()).toBe("Heatmap");
        expect(table.find("select.pvtAggregator").val()).toBe("Sum over Sum");
        return done();
      });
      it("renders a table", function(done) {
        expect(table.find("table.pvtTable").length).toBe(1);
        return done();
      });
      return describe("its renderer output", function() {
        it("has the correct type and number of cells", function(done) {
          expect(table.find("th.pvtAxisLabel").length).toBe(2);
          expect(table.find("th.pvtRowLabel").length).toBe(2);
          expect(table.find("th.pvtColLabel").length).toBe(3);
          expect(table.find("th.pvtTotalLabel").length).toBe(2);
          expect(table.find("td.pvtVal").length).toBe(6);
          expect(table.find("td.pvtTotal").length).toBe(5);
          expect(table.find("td.pvtGrandTotal").length).toBe(1);
          return done();
        });
        it("has the correct textual representation", function(done) {
          expect(table.find("table.pvtTable").text()).toBe(["colour", "blue", "red", "yellow", "Totals", "gender", "female", "0.26", "0.14", "0.20", "male", "0.20", "0.20", "Totals", "0.20", "0.26", "0.14", "0.20"].join(""));
          return done();
        });
        return it("has a correct spot-checked cell with data value", function(done) {
          expect(table.find("td.col0.row1").text()).toBe("0.20");
          expect(table.find("td.col0.row1").data("value")).toBe((12 + 30) / (103 + 112));
          return done();
        });
      });
    });
  });

  describe("$.pivot()", function() {
    describe("with no rows/cols, default count aggregator, default TableRenderer", function() {
      var table;
      table = $("<div>").pivot(fixtureData);
      it("renders a table", function() {
        return expect(table.find("table.pvtTable").length).toBe(1);
      });
      return describe("its renderer output", function() {
        it("has the correct textual representation", function() {
          return expect(table.find("table.pvtTable").text()).toBe(["Totals", "4"].join(""));
        });
        return it("has a correct grand total with data value", function() {
          expect(table.find("td.pvtGrandTotal").text()).toBe("4");
          return expect(table.find("td.pvtGrandTotal").data("value")).toBe(4);
        });
      });
    });
    describe("with rows/cols, sum aggregator, derivedAttributes, filter and sorters", function() {
      var aggregators, derivers, ref, sortAs, table;
      ref = $.pivotUtilities, sortAs = ref.sortAs, derivers = ref.derivers, aggregators = ref.aggregators;
      table = $("<div>").pivot(fixtureData, {
        rows: ["gender"],
        cols: ["birthyear"],
        aggregator: aggregators["Sum"](["trialbins"]),
        filter: function(record) {
          return record.name !== "Nick";
        },
        derivedAttributes: {
          birthyear: derivers.dateFormat("birthday", "%y"),
          trialbins: derivers.bin("trials", 10)
        },
        sorters: function(attr) {
          if (attr === "gender") {
            return sortAs(["male", "female"]);
          }
        }
      });
      return it("renders a table with the correct textual representation", function() {
        return expect(table.find("table.pvtTable").text()).toBe(["birthyear", "1982", "1983", "Totals", "gender", "male", "110.00", "110.00", "female", "90.00", "100.00", "190.00", "Totals", "200.00", "100.00", "300.00"].join(""));
      });
    });
    describe("with rows/cols, fraction-of aggregator", function() {
      var aggregators, table;
      aggregators = $.pivotUtilities.aggregators;
      table = $("<div>").pivot(fixtureData, {
        rows: ["gender"],
        aggregator: aggregators["Sum as Fraction of Total"](["trials"])
      });
      return it("renders a table with the correct textual representation", function() {
        return expect(table.find("table.pvtTable").text()).toBe(["gender", "Totals", "female", "47.8%", "male", "52.2%", "Totals", "100.0%"].join(""));
      });
    });
    return describe("with rows/cols, custom aggregator, custom renderer with options", function() {
      var received_PivotData, received_rendererOptions, table;
      received_PivotData = null;
      received_rendererOptions = null;
      table = $("<div>").pivot(fixtureData, {
        rows: ["name", "colour"],
        cols: ["trials", "successes"],
        aggregator: function() {
          return {
            count2x: 0,
            push: function() {
              return this.count2x += 2;
            },
            value: function() {
              return this.count2x;
            },
            format: function(x) {
              return "formatted " + x;
            }
          };
        },
        renderer: function(a, b) {
          received_PivotData = a;
          received_rendererOptions = b;
          return $("<div>").addClass(b.greeting).text("world");
        },
        rendererOptions: {
          greeting: "hithere"
        }
      });
      it("renders the custom renderer as per options", function() {
        return expect(table.find("div.hithere").length).toBe(1);
      });
      return describe("its received PivotData object", function() {
        return it("has a correct grand total value and format for custom aggregator", function() {
          var agg, val;
          agg = received_PivotData.getAggregator([], []);
          val = agg.value();
          expect(val).toBe(8);
          return expect(agg.format(val)).toBe("formatted 8");
        });
      });
    });
  });

  describe("$.pivotUtilities", function() {
    describe(".SubtotalPivotData()", function() {
      var sumOverSumOpts;
      sumOverSumOpts = {
        rows: [],
        cols: [],
        aggregator: $.pivotUtilities.aggregators["Sum over Sum"](["a", "b"]),
        filter: function() {
          return true;
        },
        sorters: function() {}
      };
      describe("with array-of-array input", function() {
        var aoaInput, pd;
        aoaInput = [["a", "b"], [1, 2], [3, 4]];
        pd = new $.pivotUtilities.SubtotalPivotData(aoaInput, sumOverSumOpts);
        return it("has the correct grand total value", function() {
          return expect(pd.getAggregator([], []).value()).toBe((1 + 3) / (2 + 4));
        });
      });
      describe("with array-of-object input", function() {
        var aosInput, pd;
        aosInput = [
          {
            a: 1,
            b: 2
          }, {
            a: 3,
            b: 4
          }
        ];
        pd = new $.pivotUtilities.SubtotalPivotData(aosInput, sumOverSumOpts);
        return it("has the correct grand total value", function() {
          return expect(pd.getAggregator([], []).value()).toBe((1 + 3) / (2 + 4));
        });
      });
      describe("with function input", function() {
        var functionInput, pd;
        functionInput = function(record) {
          record({
            a: 1,
            b: 2
          });
          return record({
            a: 3,
            b: 4
          });
        };
        pd = new $.pivotUtilities.SubtotalPivotData(functionInput, sumOverSumOpts);
        return it("has the correct grand total value", function() {
          return expect(pd.getAggregator([], []).value()).toBe((1 + 3) / (2 + 4));
        });
      });
      describe("with jQuery table element input", function() {
        var pd, tableInput;
        tableInput = $("<table>\n    <thead> \n        <tr> <th>a</th><th>b</th> </tr>\n    </thead> \n    <tbody>\n        <tr> <td>1</td> <td>2</td> </tr>\n        <tr> <td>3</td> <td>4</td> </tr>\n    </tbody>\n</table>");
        pd = new $.pivotUtilities.SubtotalPivotData(tableInput, sumOverSumOpts);
        return it("has the correct grand total value", function() {
          return expect(pd.getAggregator([], []).value()).toBe((1 + 3) / (2 + 4));
        });
      });
      return describe("with rows/cols, no filters/sorters, count aggregator", function() {
        var pd;
        pd = new $.pivotUtilities.SubtotalPivotData(fixtureData, {
          rows: ["name", "colour"],
          cols: ["trials", "successes"],
          aggregator: $.pivotUtilities.aggregators["Count"](),
          filter: function() {
            return true;
          },
          sorters: function() {}
        });
        it("has correctly-ordered row keys", function() {
          return expect(pd.getRowKeys()).toEqual([['Carol', 'yellow'], ['Jane', 'red'], ['John', 'blue'], ['Nick', 'blue']]);
        });
        it("has correctly-ordered col keys", function() {
          return expect(pd.getColKeys()).toEqual([[95, 25], [102, 14], [103, 12], [112, 30]]);
        });
        it("can be iterated over", function() {
          var c, i, j, len, len1, numNotNull, numNull, r, ref, ref1;
          numNotNull = 0;
          numNull = 0;
          ref = pd.getRowKeys();
          for (i = 0, len = ref.length; i < len; i++) {
            r = ref[i];
            ref1 = pd.getColKeys();
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              c = ref1[j];
              if (pd.getAggregator(r, c).value() != null) {
                numNotNull++;
              } else {
                numNull++;
              }
            }
          }
          expect(numNotNull).toBe(4);
          return expect(numNull).toBe(12);
        });
        it("has a correct spot-checked aggregator", function() {
          var agg, i, len, results, s, spots, val;
          spots = [
            {
              spot: [['Carol', 'yellow'], [102, 14]],
              val: 1
            }, {
              spot: [['Jane', 'red'], [95, 25]],
              val: 1
            }, {
              spot: [['John', 'blue'], [112, 30]],
              val: 1
            }, {
              spot: [['Nick', 'blue'], [103, 12]],
              val: 1
            }
          ];
          results = [];
          for (i = 0, len = spots.length; i < len; i++) {
            s = spots[i];
            agg = pd.getAggregator(s.spot[0], s.spot[1]);
            val = agg.value();
            expect(val).toBe(1);
            results.push(expect(agg.format(val)).toBe("" + s.val));
          }
          return results;
        });
        it("has correct spot-checked aggregators for subtotal-rows and subtotal-columns", function() {
          var agg, i, len, results, s, spots, val;
          spots = [
            {
              spot: [['Carol'], [102]],
              val: 1
            }, {
              spot: [['Jane'], [95]],
              val: 1
            }, {
              spot: [['John'], [112]],
              val: 1
            }, {
              spot: [['Nick'], [103]],
              val: 1
            }
          ];
          results = [];
          for (i = 0, len = spots.length; i < len; i++) {
            s = spots[i];
            agg = pd.getAggregator(s.spot[0], s.spot[1]);
            val = agg.value();
            expect(val).toBe(s.val);
            results.push(expect(agg.format(val)).toBe("" + s.val));
          }
          return results;
        });
        it("has correct row-total for subtotal-rows", function() {
          var agg, hdr, i, len, ref, results, val;
          ref = ['Carol', 'Jane', 'John', 'Nick'];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            hdr = ref[i];
            agg = pd.getAggregator([hdr], []);
            val = agg.value();
            expect(val).toBe(1);
            results.push(expect(agg.format(val)).toBe("1"));
          }
          return results;
        });
        it("has correct column-total for subtotal-columns", function() {
          var agg, hdr, i, len, ref, results, val;
          ref = [95, 102, 103, 112];
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            hdr = ref[i];
            agg = pd.getAggregator([], [hdr]);
            val = agg.value();
            expect(val).toBe(1);
            results.push(expect(agg.format(val)).toBe("1"));
          }
          return results;
        });
        return it("has a correct grand total aggregator", function() {
          var agg, val;
          agg = pd.getAggregator([], []);
          val = agg.value();
          expect(val).toBe(4);
          return expect(agg.format(val)).toBe("4");
        });
      });
    });
    describe(".naturalSort()", function() {
      var naturalSort;
      naturalSort = $.pivotUtilities.naturalSort;
      it("sorts numbers", function() {
        return expect([2, 1, 3, 4, 0].sort(naturalSort)).toEqual([0, 1, 2, 3, 4]);
      });
      it("sorts strings", function() {
        return expect(['b', 'a', 'c', 'd'].sort(naturalSort)).toEqual(['a', 'b', 'c', 'd']);
      });
      it("sorts numbers in strings", function() {
        return expect(['1', '12', '2', '10', '11', '112'].sort(naturalSort)).toEqual(['1', '2', '10', '11', '12', '112']);
      });
      return it("sorts 0-padded numbers", function() {
        return expect(['02', '01', '10', '11'].sort(naturalSort)).toEqual(['01', '02', '10', '11']);
      });
    });
    describe(".sortAs()", function() {
      var sortAs;
      sortAs = $.pivotUtilities.sortAs;
      return it("sorts with unknown values sorted at the end", function() {
        return expect([5, 2, 3, 4, 1].sort(sortAs([4, 3, 2]))).toEqual([4, 3, 2, 1, 5]);
      });
    });
    describe(".numberFormat()", function() {
      var numberFormat;
      numberFormat = $.pivotUtilities.numberFormat;
      it("formats numbers", function() {
        var nf;
        nf = numberFormat();
        return expect(nf(1234567.89123456)).toEqual("1,234,567.89");
      });
      it("formats booleans", function() {
        var nf;
        nf = numberFormat();
        return expect(nf(true)).toEqual("1.00");
      });
      it("formats numbers in strings", function() {
        var nf;
        nf = numberFormat();
        return expect(nf("1234567.89123456")).toEqual("1,234,567.89");
      });
      it("doesn't formats strings", function() {
        var nf;
        nf = numberFormat();
        return expect(nf("hi there")).toEqual("");
      });
      it("doesn't formats objects", function() {
        var nf;
        nf = numberFormat();
        return expect(nf({
          a: 1
        })).toEqual("");
      });
      it("formats percentages", function() {
        var nf;
        nf = numberFormat({
          scaler: 100,
          suffix: "%"
        });
        return expect(nf(0.12345)).toEqual("12.35%");
      });
      it("adds separators", function() {
        var nf;
        nf = numberFormat({
          thousandsSep: "a",
          decimalSep: "b"
        });
        return expect(nf(1234567.89123456)).toEqual("1a234a567b89");
      });
      it("adds prefixes and suffixes", function() {
        var nf;
        nf = numberFormat({
          prefix: "a",
          suffix: "b"
        });
        return expect(nf(1234567.89123456)).toEqual("a1,234,567.89b");
      });
      it("scales and rounds", function() {
        var nf;
        nf = numberFormat({
          digitsAfterDecimal: 3,
          scaler: 1000
        });
        return expect(nf(1234567.89123456)).toEqual("1,234,567,891.235");
      });
      return it("shows and hides zero", function() {
        var nf;
        nf = numberFormat({
          showZero: true
        });
        expect(nf(0)).toEqual("0.00");
        nf = numberFormat({
          showZero: false
        });
        return expect(nf(0)).toEqual("");
      });
    });
    return describe(".derivers", function() {
      describe(".dateFormat()", function() {
        var df;
        df = $.pivotUtilities.derivers.dateFormat("x", "abc % %% %%% %a %y %m %n %d %w %x %H %M %S", true);
        it("formats date objects", function() {
          return expect(df({
            x: new Date("2015-01-02T23:43:11Z")
          })).toBe('abc % %% %%% %a 2015 01 Jan 02 Fri 5 23 43 11');
        });
        return it("formats input parsed by Date.parse()", function() {
          expect(df({
            x: "2015-01-02T23:43:11Z"
          })).toBe('abc % %% %%% %a 2015 01 Jan 02 Fri 5 23 43 11');
          return expect(df({
            x: "bla"
          })).toBe('');
        });
      });
      return describe(".bin()", function() {
        var binner;
        binner = $.pivotUtilities.derivers.bin("x", 10);
        it("bins numbers", function() {
          expect(binner({
            x: 11
          })).toBe(10);
          expect(binner({
            x: 9
          })).toBe(0);
          return expect(binner({
            x: 111
          })).toBe(110);
        });
        it("bins booleans", function() {
          return expect(binner({
            x: true
          })).toBe(0);
        });
        it("bins negative numbers", function() {
          return expect(binner({
            x: -12
          })).toBe(-10);
        });
        it("doesn't bin strings", function() {
          return expect(binner({
            x: "a"
          })).toBeNaN();
        });
        return it("doesn't bin objects", function() {
          return expect(binner({
            x: {
              a: 1
            }
          })).toBeNaN();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=pivot_spec.js.map
