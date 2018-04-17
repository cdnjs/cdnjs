;
                (function() {
                    window.require(["ace/ext/error_marker"], function(m) {
                        if (typeof module == "object") {
                            module.exports = m;
                        }
                    });
                })();
            