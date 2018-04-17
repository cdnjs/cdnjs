;
                (function() {
                    window.require(["ace/mode/text"], function(m) {
                        if (typeof module == "object") {
                            module.exports = m;
                        }
                    });
                })();
            