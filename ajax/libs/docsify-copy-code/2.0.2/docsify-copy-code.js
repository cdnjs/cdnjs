/*!
 * docsify-copy-code
 * v2.0.2
 * https://github.com/jperasmus/docsify-copy-code
 * (c) 2018 JP Erasmus <jperasmus11@gmail.com>
 * MIT license
 */
(function() {
    "use strict";
    function styleInject(css, ref) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;
        if (!css || typeof document === "undefined") {
            return;
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        var style = document.createElement("style");
        style.type = "text/css";
        if (insertAt === "top") {
            if (head.firstChild) {
                head.insertBefore(style, head.firstChild);
            } else {
                head.appendChild(style);
            }
        } else {
            head.appendChild(style);
        }
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }
    var css = '.docsify-copy-code-button{z-index:1;right:0;padding:10px;opacity:0;border:0;border-radius:0;outline:0;cursor:pointer}.docsify-copy-code-button,.docsify-copy-code-button:after{position:absolute;top:0;background:#ccc;color:#fff;transition:all .25s ease}.docsify-copy-code-button:after{content:"Copied!";z-index:0;right:100%;margin:5px 10px 0;padding:5px;border-radius:3px;font-size:11px;-webkit-transform:translateX(120%) scale(0);transform:translateX(120%) scale(0)}.docsify-copy-code-button.success:after{-webkit-transform:translateX(0) scale(1);transform:translateX(0) scale(1)}pre[v-pre]:hover .docsify-copy-code-button{opacity:1}';
    styleInject(css);
    function docsifyCopyCode(hook, vm) {
        hook.doneEach(function() {
            var codeBlocks = Array.apply(null, document.querySelectorAll("pre[v-pre]"));
            codeBlocks.forEach(function(element, i, obj) {
                var button = document.createElement("button");
                button.appendChild(document.createTextNode("Click to copy"));
                button.classList.add("docsify-copy-code-button");
                if (vm.config.themeColor) {
                    button.style.background = vm.config.themeColor;
                }
                button.addEventListener("click", function(event) {
                    var range = document.createRange();
                    var codeBlock = element.querySelector("code");
                    var selection = window.getSelection();
                    range.selectNode(codeBlock);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    try {
                        var successful = document.execCommand("copy");
                        if (successful) {
                            button.classList.add("success");
                            setTimeout(function() {
                                button.classList.remove("success");
                            }, 1e3);
                        }
                    } catch (err) {
                        button.classList.add("error");
                        setTimeout(function() {
                            button.classList.remove("error");
                        }, 1e3);
                    }
                    selection = window.getSelection();
                    if (typeof selection.removeRange === "function") {
                        selection.removeRange(range);
                    } else if (typeof selection.removeAllRanges === "function") {
                        selection.removeAllRanges();
                    }
                });
                element.appendChild(button);
            });
        });
    }
    if (document.querySelector('link[href*="docsify-copy-code"]')) {
        console.warn("[Deprecation] Link to external docsify-copy-code stylesheet is no longer necessary.");
    }
    window.DocsifyCopyCodePlugin = {
        init: function init() {
            return function(hook, vm) {
                hook.ready(function() {
                    console.warn("[Deprecation] Manually initializing docsify-copy-code using window.DocsifyCopyCodePlugin.init() is no longer necessary.");
                });
            };
        }
    };
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [ docsifyCopyCode ].concat(window.$docsify.plugins || []);
})();
//# sourceMappingURL=docsify-copy-code.js.map
