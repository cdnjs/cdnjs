import BaseComponent from 'primevue/basecomponent';
import TerminalService from 'primevue/terminalservice';
import { openBlock, createElementBlock, mergeProps, normalizeProps, toDisplayString, createCommentVNode, createElementVNode, Fragment, renderList, withDirectives, vModelText } from 'vue';

var script = {
    name: 'Terminal',
    extends: BaseComponent,
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
        TerminalService.on('response', this.responseListener);
        this.$refs.input.focus();
    },
    updated() {
        this.$el.scrollTop = this.$el.scrollHeight;
    },
    beforeUnmount() {
        TerminalService.off('response', this.responseListener);
    },
    methods: {
        onClick() {
            this.$refs.input.focus();
        },
        onKeydown(event) {
            if (event.code === 'Enter' && this.commandText) {
                this.commands.push({ text: this.commandText });
                TerminalService.emit('command', this.commandText);
                this.commandText = '';
            }
        },
        responseListener(response) {
            this.commands[this.commands.length - 1].response = response;
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", mergeProps({
    class: "p-terminal p-component",
    onClick: _cache[2] || (_cache[2] = (...args) => ($options.onClick && $options.onClick(...args)))
  }, _ctx.ptm('root')), [
    ($props.welcomeMessage)
      ? (openBlock(), createElementBlock("div", normalizeProps(mergeProps({ key: 0 }, _ctx.ptm('welcomeMessage'))), toDisplayString($props.welcomeMessage), 17))
      : createCommentVNode("", true),
    createElementVNode("div", mergeProps({ class: "p-terminal-content" }, _ctx.ptm('content')), [
      (openBlock(true), createElementBlock(Fragment, null, renderList($data.commands, (command, i) => {
        return (openBlock(), createElementBlock("div", mergeProps({
          key: command.text + i.toString()
        }, _ctx.ptm('commands')), [
          createElementVNode("span", mergeProps({ class: "p-terminal-prompt" }, _ctx.ptm('prompt')), toDisplayString($props.prompt), 17),
          createElementVNode("span", mergeProps({ class: "p-terminal-command" }, _ctx.ptm('command')), toDisplayString(command.text), 17),
          createElementVNode("div", mergeProps({
            class: "p-terminal-response",
            "aria-live": "polite"
          }, _ctx.ptm('response')), toDisplayString(command.response), 17)
        ], 16))
      }), 128))
    ], 16),
    createElementVNode("div", mergeProps({ class: "p-terminal-prompt-container" }, _ctx.ptm('container')), [
      createElementVNode("span", mergeProps({ class: "p-terminal-prompt" }, _ctx.ptm('prompt')), toDisplayString($props.prompt), 17),
      withDirectives(createElementVNode("input", mergeProps({
        ref: "input",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.commandText) = $event)),
        type: "text",
        class: "p-terminal-input",
        autocomplete: "off",
        onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeydown && $options.onKeydown(...args)))
      }, _ctx.ptm('commandText')), null, 16), [
        [vModelText, $data.commandText]
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

export { script as default };
