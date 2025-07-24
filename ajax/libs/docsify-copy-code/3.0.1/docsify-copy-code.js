/*!
 * docsify-copy-code
 * v3.0.0
 * https://github.com/jperasmus/docsify-copy-code
 * (c) 2017-2023 JP Erasmus <jperasmus11@gmail.com>
 * MIT license
 */
(function() {
    "use strict";
    function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _typeof(obj);
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
    var css_248z = ".docsify-copy-code-button,.docsify-copy-code-button>span{cursor:pointer;transition:all .25s ease}.docsify-copy-code-button{background:grey;background:var(--theme-color,grey);border:0;border-radius:0;color:#fff;font-size:1em;opacity:0;outline:0;overflow:visible;padding:.65em .8em;position:absolute;right:0;top:0;z-index:1}.docsify-copy-code-button>span{background:inherit;border-radius:3px;pointer-events:none}.docsify-copy-code-button>.error,.docsify-copy-code-button>.success{font-size:.825em;opacity:0;padding:.5em .65em;position:absolute;right:0;top:50%;transform:translateY(-50%);z-index:-100}.docsify-copy-code-button.error>.error,.docsify-copy-code-button.success>.success{opacity:1;right:100%;transform:translate(-25%,-50%)}.docsify-copy-code-button:focus,pre:hover .docsify-copy-code-button{opacity:1}.docsify-copy-code-button>[aria-live]{height:1px;left:-10000px;overflow:hidden;position:absolute;top:auto;width:1px}";
    styleInject(css_248z);
    function docsifyCopyCode(hook, vm) {
        var i18n = {
            buttonText: "Copy to clipboard",
            errorText: "Error",
            successText: "Copied"
        };
        hook.doneEach((function() {
            var targetElms = Array.from(document.querySelectorAll("pre[data-lang]"));
            if (vm.config.copyCode) {
                Object.keys(i18n).forEach((function(key) {
                    var textValue = vm.config.copyCode[key];
                    if (typeof textValue === "string") {
                        i18n[key] = textValue;
                    } else if (_typeof(textValue) === "object") {
                        Object.keys(textValue).some((function(match) {
                            var isMatch = location.href.indexOf(match) > -1;
                            i18n[key] = isMatch ? textValue[match] : i18n[key];
                            return isMatch;
                        }));
                    }
                }));
            }
            var template = [ '<button class="docsify-copy-code-button">', '<span class="label">'.concat(i18n.buttonText, "</span>"), '<span class="error" aria-hidden="hidden">'.concat(i18n.errorText, "</span>"), '<span class="success" aria-hidden="hidden">'.concat(i18n.successText, "</span>"), '<span aria-live="polite"></span>', "</button>" ].join("");
            targetElms.forEach((function(elm) {
                elm.insertAdjacentHTML("beforeend", template);
            }));
        }));
        hook.mounted((function() {
            var listenerHost = document.querySelector(".content");
            if (listenerHost) {
                listenerHost.addEventListener("click", (function(evt) {
                    var isCopyCodeButton = evt.target.classList.contains("docsify-copy-code-button");
                    if (isCopyCodeButton) {
                        var buttonElm = evt.target.tagName === "BUTTON" ? evt.target : evt.target.parentNode;
                        var range = document.createRange();
                        var preElm = buttonElm.parentNode;
                        var codeElm = preElm.querySelector("code");
                        var liveRegionElm = buttonElm.querySelector("[aria-live]");
                        var selection = window.getSelection();
                        range.selectNode(codeElm);
                        if (selection) {
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }
                        try {
                            var successful = document.execCommand("copy");
                            if (successful) {
                                buttonElm.classList.add("success");
                                liveRegionElm.innerText = i18n.successText;
                                setTimeout((function() {
                                    buttonElm.classList.remove("success");
                                    liveRegionElm.innerText = "";
                                }), 1e3);
                            }
                        } catch (err) {
                            console.error("docsify-copy-code: ".concat(err));
                            buttonElm.classList.add("error");
                            liveRegionElm.innerText = i18n.errorText;
                            setTimeout((function() {
                                buttonElm.classList.remove("error");
                                liveRegionElm.innerText = "";
                            }), 1e3);
                        }
                        selection = window.getSelection();
                        if (selection) {
                            if (typeof selection.removeRange === "function") {
                                selection.removeRange(range);
                            } else if (typeof selection.removeAllRanges === "function") {
                                selection.removeAllRanges();
                            }
                        }
                    }
                }));
            }
        }));
    }
    if (document.querySelector('link[href*="docsify-copy-code"]')) {
        console.warn("[Deprecation] Link to external docsify-copy-code stylesheet is no longer necessary.");
    }
    window.DocsifyCopyCodePlugin = {
        init: function init() {
            return function(hook, vm) {
                hook.ready((function() {
                    console.warn("[Deprecation] Manually initializing docsify-copy-code using window.DocsifyCopyCodePlugin.init() is no longer necessary.");
                }));
            };
        }
    };
    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [ docsifyCopyCode ].concat(window.$docsify.plugins || []);
})();
//# sourceMappingURL=docsify-copy-code.js.map
