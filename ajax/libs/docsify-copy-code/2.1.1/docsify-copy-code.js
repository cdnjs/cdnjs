/*!
 * docsify-copy-code
 * v2.1.1
 * https://github.com/jperasmus/docsify-copy-code
 * (c) 2017-2020 JP Erasmus <jperasmus11@gmail.com>
 * MIT license
 */
(function() {
    "use strict";
    function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return _typeof(obj);
    }
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
    var css = ".docsify-copy-code-button,.docsify-copy-code-button span{cursor:pointer;transition:all .25s ease}.docsify-copy-code-button{position:absolute;z-index:1;top:0;right:0;overflow:visible;padding:.65em .8em;border:0;border-radius:0;outline:0;font-size:1em;background:grey;background:var(--theme-color,grey);color:#fff;opacity:0}.docsify-copy-code-button span{border-radius:3px;background:inherit;pointer-events:none}.docsify-copy-code-button .error,.docsify-copy-code-button .success{position:absolute;z-index:-100;top:50%;right:0;padding:.5em .65em;font-size:.825em;opacity:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.docsify-copy-code-button.error .error,.docsify-copy-code-button.success .success{right:100%;opacity:1;-webkit-transform:translate(-115%,-50%);transform:translate(-115%,-50%)}.docsify-copy-code-button:focus,pre:hover .docsify-copy-code-button{opacity:1}";
    styleInject(css);
    function docsifyCopyCode(hook, vm) {
        hook.doneEach(function() {
            var targetElms = Array.apply(null, document.querySelectorAll("pre[data-lang]"));
            var i18n = {
                buttonText: "Copy to clipboard",
                errorText: "Error",
                successText: "Copied"
            };
            if (vm.config.copyCode) {
                Object.keys(i18n).forEach(function(key) {
                    var textValue = vm.config.copyCode[key];
                    if (typeof textValue === "string") {
                        i18n[key] = textValue;
                    } else if (_typeof(textValue) === "object") {
                        Object.keys(textValue).some(function(match) {
                            var isMatch = location.href.indexOf(match) > -1;
                            i18n[key] = isMatch ? textValue[match] : i18n[key];
                            return isMatch;
                        });
                    }
                });
            }
            var template = [ '<button class="docsify-copy-code-button">', '<span class="label">'.concat(i18n.buttonText, "</span>"), '<span class="error">'.concat(i18n.errorText, "</span>"), '<span class="success">'.concat(i18n.successText, "</span>"), "</button>" ].join("");
            targetElms.forEach(function(elm) {
                elm.insertAdjacentHTML("beforeend", template);
            });
        });
        hook.mounted(function() {
            var listenerHost = document.querySelector(".content");
            listenerHost.addEventListener("click", function(evt) {
                var isCopyCodeButton = evt.target.classList.contains("docsify-copy-code-button");
                if (isCopyCodeButton) {
                    var buttonElm = evt.target.tagName === "BUTTON" ? evt.target : evt.target.parentNode;
                    var range = document.createRange();
                    var preElm = buttonElm.parentNode;
                    var codeElm = preElm.querySelector("code");
                    var selection = window.getSelection();
                    range.selectNode(codeElm);
                    selection.removeAllRanges();
                    selection.addRange(range);
                    try {
                        var successful = document.execCommand("copy");
                        if (successful) {
                            buttonElm.classList.add("success");
                            setTimeout(function() {
                                buttonElm.classList.remove("success");
                            }, 1e3);
                        }
                    } catch (err) {
                        console.error("docsify-copy-code: ".concat(err));
                        buttonElm.classList.add("error");
                        setTimeout(function() {
                            buttonElm.classList.remove("error");
                        }, 1e3);
                    }
                    selection = window.getSelection();
                    if (typeof selection.removeRange === "function") {
                        selection.removeRange(range);
                    } else if (typeof selection.removeAllRanges === "function") {
                        selection.removeAllRanges();
                    }
                }
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
