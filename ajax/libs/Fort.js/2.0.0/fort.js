var Fort = {
    clean: function clean() {
        var forms = document.querySelectorAll(".form");
        for (var i = forms.length; i--;) {
            var nonemptyelements = forms[i].querySelectorAll("input, textarea, select");
            Array.prototype.forEach.call(nonemptyelements, function(el){
              if (el.value.length != 0 )
                if (el.classList)
                    el.classList.add('ignore');
                else
                    el.className += ' ' + 'ignore';
            });
            var hiddenInputs = forms[i].querySelectorAll('input[type=hidden]')
            Array.prototype.forEach.call(hiddenInputs, function(el){
                if (el.classList)
                  el.classList.add('ignore');
                else
                  el.className += ' ' + 'ignore';
            });
        };
    },

    solid: function solid(hex) {
        Fort.clean();
        document.body.innerHTML = '<div class="top-one" id="top1"><div class="colors"></div></div>' + document.body.innerHTML;

        function cback(e) {
            var t = [];
            for (var n = inputs.length; n--;) {
                if (!inputs[n].value.length) t.push(inputs[n]);
            }
            var r = t.length;
            var i = inputs.length;
            var s = document.querySelectorAll(".top-one");
            for (var o = s.length; o--;) {
                s[o].style.width = 100 - r / i * 100 + "%";
            }

            //Set color of bar as solid
            document.getElementById("top1").style.background = hex;
        }
        var forms = document.querySelectorAll(".form"),
            inputs = [];
        for (var i = forms.length; i--;) {
            var els = forms[i].querySelectorAll("input, textarea, select");
            for (var j = els.length; j--;) {
                classes = els[j].className.replace(/\s+/g, ' ').split(' ');
                ignore = false;
                for (var k = classes.length; k--;) {
                    if (classes[k] == "ignore") {
                        ignore = true;
                        break;
                    }
                }
                if (els[j].type != "button" && els[j].type != "submit" && !ignore) {
                    inputs.push(els[j]);
                    els[j].addEventListener("input", cback, false);
                }
            }
        }
    },

    gradient: function(firstColor, secondColor) {
        Fort.clean();
        document.body.innerHTML = '<div class="top-one" id="top1"><div class="colors"></div></div>' + document.body.innerHTML;

        function cback(e) {
            var t = [];
            for (var n = inputs.length; n--;) {
                if (!inputs[n].value.length) t.push(inputs[n]);
            }
            var r = t.length;
            var i = inputs.length;
            var s = document.querySelectorAll(".top-one");
            for (var o = s.length; o--;) {
                s[o].style.width = 100 - r / i * 100 + "%";
            }
            orientation = 'to right';
            var string = 'linear-gradient(' + orientation + ', ' + firstColor + ', ' + secondColor + ')';
            document.getElementById("top1").style.background = string;
        }
        var forms = document.querySelectorAll(".form"),
            inputs = [];
        for (var i = forms.length; i--;) {
            var els = forms[i].querySelectorAll("input, textarea, select");
            for (var j = els.length; j--;) {
                classes = els[j].className.replace(/\s+/g, ' ').split(' ');
                ignore = false;
                for (var k = classes.length; k--;) {
                    if (classes[k] == "ignore") {
                        ignore = true;
                        break;
                    }
                }
                if (els[j].type != "button" && els[j].type != "submit" && !ignore) {
                    inputs.push(els[j]);
                    els[j].addEventListener("input", cback, false);
                }
            }
        }
    },

    sections: function() {
        Fort.clean();
        for (var i = 0; i < arguments.length; ++i) {
            var args = Array.prototype.slice.call(arguments);
        }

        document.body.innerHTML = '<div class="top-one" id="top1"><div class="colors"></div></div>' + document.body.innerHTML;

        function cback(e) {
            var t = [];
            for (var n = inputs.length; n--;) {
                if (!inputs[n].value.length) t.push(inputs[n]);
            }
            var r = t.length;
            var i = inputs.length;
            var s = document.querySelectorAll(".top-one");
            for (var o = s.length; o--;) {
                s[o].style.width = 100 - r / i * 100 + "%";
            }
        }
        var forms = document.querySelectorAll(".form"),
            inputs = [];
        for (var i = forms.length; i--;) {
            var els = forms[i].querySelectorAll("input, textarea, select");
            for (var j = els.length; j--;) {
                classes = els[j].className.replace(/\s+/g, ' ').split(' ');
                ignore = false;
                for (var k = classes.length; k--;) {
                    if (classes[k] == "ignore") {
                        ignore = true;
                        break;
                    }
                }
                if (els[j].type != "button" && els[j].type != "submit" && !ignore) {
                    inputs.push(els[j]);
                    els[j].addEventListener("input", cback, false);
                }
            }
        }


        function colDistr(input) {
            var result = [],
                step = 0;
            for (i = 0; i < input.length * 2; i++) {
                if (i % 2) step++;
                var perc = Math.floor(step * 1000 / input.length) / 10;
                result.push([input[i - step], perc + "%"]);
            }
            return result;
        }


        function generateCSSGradient(colours) {
            var l = colours.length,
                i;
            for (i = 0; i < l; i++) colours[i] = colours[i].join(" ");
            return "linear-gradient( to right, " + colours.join(", ") + ")";
        }

        document.getElementsByClassName('top-one').innerHTML = '<div class="colors"></div>';
        document.querySelector(".colors").style.background = generateCSSGradient(colDistr(args.sort()));

        var window_width = window.innerWidth + "px";
        document.querySelector(".colors").style.width = window_width;
    },


    flash: function() {
        Fort.clean();
        for (var i = 0; i < arguments.length; ++i) {
            var totalSections = arguments.length;
            var totalColors = arguments[i];
        }
        var args = Array.prototype.slice.call(arguments);
        var cols = args.sort();

        document.body.innerHTML = '<div class="top-one" id="top1"><div class="colors"></div></div>' + document.body.innerHTML;

        function cback(e) {
            var t = [];
            for (var n = inputs.length; n--;) {
                if (!inputs[n].value.length) t.push(inputs[n]);
            }
            var r = t.length;
            var i = inputs.length;
            var s = document.querySelectorAll(".top-one");
            for (var o = s.length; o--;) {
                s[o].style.width = 100 - r / i * 100 + "%";
                s[o].style.background = cols[i - r - 1];
            }
        }
        var forms = document.querySelectorAll(".form"),
            inputs = [];
        for (var i = forms.length; i--;) {
            var els = forms[i].querySelectorAll("input, textarea, select");
            for (var j = els.length; j--;) {
                classes = els[j].className.replace(/\s+/g, ' ').split(' ');
                ignore = false;
                for (var k = classes.length; k--;) {
                    if (classes[k] == "ignore") {
                        ignore = true;
                        break;
                    }
                }
                if (els[j].type != "button" && els[j].type != "submit" && !ignore) {
                    inputs.push(els[j]);
                    els[j].addEventListener("input", cback, false);
                }

            }
        }
    },

    merge: function(hex) {
        Fort.clean();
        document.body.innerHTML = '<div class="top-one" id="top1"><div class="colors"></div></div>' + document.body.innerHTML;
        document.body.innerHTML = '<div class="top-two" id="top2"><div class="colors"></div></div>' + document.body.innerHTML;

        function cback(e) {
            var t = [];
            for (var n = inputs.length; n--;) {
                if (!inputs[n].value.length) t.push(inputs[n]);
            }
            var r = t.length;
            var i = inputs.length;
            var s = document.querySelectorAll("#top1");

            for (var o = s.length; o--;) {
                precalct = 100 - r / i * 100;
                var precalct2 = precalct / 2;
                s[o].style.width = precalct2 + "%";
            }

            var r = t.length;
            var i = inputs.length;
            var s = document.querySelectorAll("#top2");

            for (var o = s.length; o--;) {
                precalct = 100 - r / i * 100;
                var precalct2 = precalct / 2;
                s[o].style.width = precalct2 + "%";
            }

            document.getElementById("top1").style.background = hex;
            document.getElementById("top2").style.background = hex;

        }
        var forms = document.querySelectorAll(".form"),
            inputs = [];
        for (var i = forms.length; i--;) {
            var els = forms[i].querySelectorAll("input, textarea, select");
            for (var j = els.length; j--;) {
                classes = els[j].className.replace(/\s+/g, ' ').split(' ');
                ignore = false;
                for (var k = classes.length; k--;) {
                    if (classes[k] == "ignore") {
                        ignore = true;
                        break;
                    }
                }
                if (els[j].type != "button" && els[j].type != "submit" && !ignore) {
                    inputs.push(els[j]);
                    els[j].addEventListener("input", cback, false);
                }
            }
        }
    },
    config: function(settings) {
        var t1 = document.querySelector('#top1');
        var t2 = document.querySelector('#top2') || {style:{}};
        if (settings.height) {
            t1.style.height = settings.height;
            t2.style.height = settings.height;
        }
        if (settings.alignment) {
            if (settings.alignment === 'top') {
                t1.style.top = 0;
                t1.style.bottom = 'auto';
                t2.style.top = 0;
                t2.style.bottom = 'auto';
            } else {
                t1.style.top = 'auto';
                t1.style.bottom = 0;
                t2.style.top = 'auto';
                t2.style.bottom = 0;
            }
        }
        if (settings.duration) {
            t1.style.transitionDuration = settings.duration;
            t2.style.transitionDuration = settings.duration;
        }
    }
};