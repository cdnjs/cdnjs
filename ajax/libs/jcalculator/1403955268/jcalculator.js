var template =
    '<div class="jcalculator">' +
    '<span>7</span>' +
    '<span>8</span>' +
    '<span>9</span>' +
    '<span class="plus operation">+</span>' +
    '<span>4</span>' +
    '<span>5</span>' +
    '<span>6</span>' +
    '<span class="minus operation">-</span>' +
    '<span>1</span>' +
    '<span>2</span>' +
    '<span>3</span>' +
    '<span class="multiplication operation">x</span>' +
    '<span class="clear operation">C</span>' +
    '<span>0</span>' +
    '<span class="equal operation">=</span>' +
    '<span class="divide operation">&divide;</span>' +
    '</div>';


(function($) {
    $.fn.calculator = function(theme) {
        function Controller(el) {
            var self = this;
            el.wrap("<div class='jcalculator_wrap'></div>");
            el.after(template);

            this.display = el;
            this.element = el.next();

            if (theme) {
                this.element.addClass(theme);
            }

            this.value = this.load();

            this.stack = null;
            this.stackOp = null;
            this.clearStack = true;

            $("span", this.element).on('click', function() {
                var code = $(this).text().trim();
                if (isNaN(code)) {
                    if (code == "C") {
                        self.digit;
                    } else if (code.charCodeAt(0) == 247) {
                        self.op = "/";
                    } else {
                        self.op = code;
                    }
                } else {
                    self.digit = code;
                }
            });
        }

        Controller.prototype = {
            load: function() {
                return this.display.val() || this.display.text();
            },
            save: function() {
                if (this.display.is("input")) this.display.val(this.value);
                else this.display.text(this.value);
            },
            get v() {
                return this.value;
            },
            set v(val) {
                this.clearStack = false;
                this.value = val;
                this.save();
            },
            get op() {
                return this.stackOp;
            },
            set op(value) {
                switch (this.stackOp) {
                    case "+":
                        this.v = this.stack + this.v;
                        break;
                    case "-":
                        this.v = this.stack - this.v;
                        break;
                    case "x":
                        this.v = this.stack * this.v;
                        break;
                    case "/":
                        this.v = this.stack / this.v;
                        break;
                }
                this.stack = this.v;
                this.stackOp = value;
                this.clearStack = true;
            },
            set digit(d) {
                d = parseInt(d);
                if (this.clearStack) return this.v = d;
                return this.v = this.v * 10 + d;
            },
            get digit() {
                if (this.clearStack) return this.v = 0;
                return this.v = Math.floor(this.v / 10);
            }
        };

        var controller;
        this.each(function() {
            controller = new Controller($(this));
            $(this).on('focus', function() {
                $(".jcalculator").show();
            });
            $("body").click(function() {
                $(".jcalculator").hide();
            });
            $(".jcalculator_wrap").click(function(event) {
                event.stopPropagation();
            });
            $(document).keyup(function(e) {
                if (e.keyCode == 27) {
                    $(".jcalculator").hide();
                }
            });

        });

        return controller;
    };
})(jQuery);
