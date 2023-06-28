'use strict';

var BaseComponent = require('primevue/basecomponent');
var TerminalService = require('primevue/terminalservice');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TerminalService__default = /*#__PURE__*/_interopDefaultLegacy(TerminalService);

var script = {
    name: 'Terminal',
    extends: BaseComponent__default["default"],
    props: {
        welcomeMessage: {
            type: String,
            default: null
        },
        prompt: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            commandText: null,
            commands: []
        };
    },
    mounted() {
        TerminalService__default["default"].on('response', this.responseListener);
        this.$refs.input.focus();
    },
    updated() {
        this.$el.scrollTop = this.$el.scrollHeight;
    },
    beforeUnmount() {
        TerminalService__default["default"].off('response', this.responseListener);
    },
    methods: {
        onClick() {
            this.$refs.input.focus();
        },
        onKeydown(event) {
            if (event.code === 'Enter' && this.commandText) {
                this.commands.push({ text: this.commandText });
                TerminalService__default["default"].emit('command', this.commandText);
                this.commandText = '';
            }
        },
        responseListener(response) {
            this.commands[this.commands.length - 1].response = response;
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    class: "p-terminal p-component",
    onClick: _cache[2] || (_cache[2] = (...args) => ($options.onClick && $options.onClick(...args)))
  }, _ctx.ptm('root')), [
    ($props.welcomeMessage)
      ? (vue.openBlock(), vue.createElementBlock("div", vue.normalizeProps(vue.mergeProps({ key: 0 }, _ctx.ptm('welcomeMessage'))), vue.toDisplayString($props.welcomeMessage), 17))
      : vue.createCommentVNode("", true),
    vue.createElementVNode("div", vue.mergeProps({ class: "p-terminal-content" }, _ctx.ptm('content')), [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($data.commands, (command, i) => {
        return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: command.text + i.toString()
        }, _ctx.ptm('commands')), [
          vue.createElementVNode("span", vue.mergeProps({ class: "p-terminal-prompt" }, _ctx.ptm('prompt')), vue.toDisplayString($props.prompt), 17),
          vue.createElementVNode("span", vue.mergeProps({ class: "p-terminal-command" }, _ctx.ptm('command')), vue.toDisplayString(command.text), 17),
          vue.createElementVNode("div", vue.mergeProps({
            class: "p-terminal-response",
            "aria-live": "polite"
          }, _ctx.ptm('response')), vue.toDisplayString(command.response), 17)
        ], 16))
      }), 128))
    ], 16),
    vue.createElementVNode("div", vue.mergeProps({ class: "p-terminal-prompt-container" }, _ctx.ptm('container')), [
      vue.createElementVNode("span", vue.mergeProps({ class: "p-terminal-prompt" }, _ctx.ptm('prompt')), vue.toDisplayString($props.prompt), 17),
      vue.withDirectives(vue.createElementVNode("input", vue.mergeProps({
        ref: "input",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.commandText) = $event)),
        type: "text",
        class: "p-terminal-input",
        autocomplete: "off",
        onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeydown && $options.onKeydown(...args)))
      }, _ctx.ptm('commandText')), null, 16), [
        [vue.vModelText, $data.commandText]
      ])
    ], 16)
  ], 16))
}

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

var css_248z = "\n.p-terminal {\n    height: 18rem;\n    overflow: auto;\n}\n.p-terminal-prompt-container {\n    display: flex;\n    align-items: center;\n}\n.p-terminal-input {\n    flex: 1 1 auto;\n    border: 0 none;\n    background-color: transparent;\n    color: inherit;\n    padding: 0;\n    outline: 0 none;\n}\n.p-terminal-input::-ms-clear {\n    display: none;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
