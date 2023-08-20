this.primevue = this.primevue || {};
this.primevue.baseicon = (function (utils) {
    'use strict';

    var script = {
      name: 'BaseIcon',
      props: {
        label: {
          type: String,
          "default": undefined
        },
        spin: {
          type: Boolean,
          "default": false
        }
      },
      methods: {
        pti: function pti() {
          var isLabelEmpty = utils.ObjectUtils.isEmpty(this.label);
          return {
            "class": ['p-icon', {
              'p-icon-spin': this.spin
            }],
            role: !isLabelEmpty ? 'img' : undefined,
            'aria-label': !isLabelEmpty ? this.label : undefined,
            'aria-hidden': isLabelEmpty
          };
        }
      }
    };

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
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

    var css_248z = "\n.p-icon {\n    display: inline-block;\n}\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n@-webkit-keyframes p-icon-spin {\n0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n}\n100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n}\n}\n@keyframes p-icon-spin {\n0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n}\n100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n}\n}\n";
    styleInject(css_248z);

    return script;

})(primevue.utils);
