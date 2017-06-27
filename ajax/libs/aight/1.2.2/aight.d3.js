(function(exports) {

    aight.d3 = {};

    if (aight.browser.ie8) {
        function mapped(property, format, parse) {
            var read = function(p) {
                    var value = this.node().style[property];
                    return parse
                        ? parse.call(this, value, p)
                        : value;
                },
                write = function(p, value) {
                    return this.each(function() {
                        var v = (typeof value === "function")
                            ? value.apply(this, arguments)
                            : value;
                        this.style[property] = format
                            ? format.call(this, v, p)
                            : v;
                    });
                };
            return function() {
                return arguments.length > 1
                    ? write.apply(this, arguments)
                    : read.call(this);
            };
        }

        var aight_d3_style = {
            "background-image":         mapped("backgroundImage"),
            "background-repeat":        mapped("backgroundRepeat"),
            "background-position":      mapped("backgroundPosition"),
            "background-color":         mapped("backgroundColor"),

            "opacity":                  mapped("filter",
                function opacity_to_filter(opacity) {
                    return ["alpha(opacity=", Math.round(opacity * 100), ")"].join("");
                }, 
                function filter_to_opacity(filter) {
                    var opacity = (filter || "").match(/opacity=(\d+)/)[1] || 100;
                    return opacity / 100;
                })
        };

        aight.d3.style = aight_d3_style;

        var d3_style = d3.selection.prototype.style;
        d3.selection.prototype.style = function(prop) {
            var style = aight_d3_style.hasOwnProperty(prop)
                ? aight_d3_style[prop]
                : d3_style;
            return style.apply(this, arguments);
        };
    }

})(this);
