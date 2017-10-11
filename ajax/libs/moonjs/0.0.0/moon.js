/*
* Moon 0.0.0
* Copyright 2016, Kabir Shah
* https://github.com/KingPixil/moon/
* Free to use under the MIT license.
* https://kingpixil.github.io/license
*/

(function(window) {
    function Moon(opts) {
        var _el = opts.el;
        var _data = opts.data;
        var _logs = opts.logs;
        this.el = document.getElementById(_el);
        this.html = this.el.innerHTML;
        this.logs = _logs;

        if(this.logs) {
            console.log('%c ======= 🌚 MOON 🌚 ======= ', 'font-size: 2rem; color: #010edc');
            console.log("%c Initial Data =>", "font-size: 1rem; color: #018d55");
            console.log("%c \t Element: " + JSON.stringify(_el), "font-size: 0.8rem");
            console.log("%c \t Data: " + JSON.stringify(_data), "font-size: 0.8rem");
        }

        Object.defineProperty(this, 'data', {
            get: function() {
                return _data;
            },
            set: function(value) {
                _data = value;
                this.build();
                if(this.logs) {
                  console.log("%c Changing Data =>", "font-size: 1rem; color: #018d55");
                  console.log("%c \t Element: " + JSON.stringify(_el), "font-size: 0.8rem");
                  console.log("%c \t Data: " + JSON.stringify(_data), "font-size: 0.8rem");
                }
            }
        });


        this.build = function() {
            var generated = this.html;
            for (prop in this.data) {
                generated = generated.replace(new RegExp("{{" + prop + "}}", "gi"), this.data[prop]);
            }
            this.el.innerHTML = generated;
        }



        this.build();
    }

    window.Moon = Moon;

})(window);
