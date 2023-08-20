import TerminalService from 'primevue/terminalservice';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps, normalizeProps, toDisplayString, createCommentVNode, createElementVNode, Fragment, renderList, withDirectives, vModelText } from 'vue';

var styles = "\n.p-terminal {\n    height: 18rem;\n    overflow: auto;\n}\n\n.p-terminal-prompt-container {\n    display: flex;\n    align-items: center;\n}\n\n.p-terminal-input {\n    flex: 1 1 auto;\n    border: 0 none;\n    background-color: transparent;\n    color: inherit;\n    padding: 0;\n    outline: 0 none;\n}\n\n.p-terminal-input::-ms-clear {\n    display: none;\n}\n";
var classes = {
  root: 'p-terminal p-component',
  content: 'p-terminal-content',
  prompt: 'p-terminal-prompt',
  command: 'p-terminal-command',
  response: 'p-terminal-response',
  container: 'p-terminal-prompt-container',
  commandText: 'p-terminal-input'
};
var _useStyle = useStyle(styles, {
    name: 'terminal',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseTerminal',
  "extends": BaseComponent,
  props: {
    welcomeMessage: {
      type: String,
      "default": null
    },
    prompt: {
      type: String,
      "default": null
    }
  },
  css: {
    classes: classes,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Terminal',
  "extends": script$1,
  data: function data() {
    return {
      commandText: null,
      commands: []
    };
  },
  mounted: function mounted() {
    TerminalService.on('response', this.responseListener);
    this.$refs.input.focus();
  },
  updated: function updated() {
    this.$el.scrollTop = this.$el.scrollHeight;
  },
  beforeUnmount: function beforeUnmount() {
    TerminalService.off('response', this.responseListener);
  },
  methods: {
    onClick: function onClick() {
      this.$refs.input.focus();
    },
    onKeydown: function onKeydown(event) {
      if (event.code === 'Enter' && this.commandText) {
        this.commands.push({
          text: this.commandText
        });
        TerminalService.emit('command', this.commandText);
        this.commandText = '';
      }
    },
    responseListener: function responseListener(response) {
      this.commands[this.commands.length - 1].response = response;
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.onClick && $options.onClick.apply($options, arguments);
    })
  }, _ctx.ptm('root'), {
    "data-pc-name": "terminal"
  }), [_ctx.welcomeMessage ? (openBlock(), createElementBlock("div", normalizeProps(mergeProps({
    key: 0
  }, _ctx.ptm('welcomeMessage'))), toDisplayString(_ctx.welcomeMessage), 17)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    "class": _ctx.cx('content')
  }, _ctx.ptm('content')), [(openBlock(true), createElementBlock(Fragment, null, renderList($data.commands, function (command, i) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: command.text + i.toString()
    }, _ctx.ptm('commands')), [createElementVNode("span", mergeProps({
      "class": _ctx.cx('prompt')
    }, _ctx.ptm('prompt')), toDisplayString(_ctx.prompt), 17), createElementVNode("span", mergeProps({
      "class": _ctx.cx('command')
    }, _ctx.ptm('command')), toDisplayString(command.text), 17), createElementVNode("div", mergeProps({
      "class": _ctx.cx('response'),
      "aria-live": "polite"
    }, _ctx.ptm('response')), toDisplayString(command.response), 17)], 16);
  }), 128))], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('container')
  }, _ctx.ptm('container')), [createElementVNode("span", mergeProps({
    "class": _ctx.cx('prompt')
  }, _ctx.ptm('prompt')), toDisplayString(_ctx.prompt), 17), withDirectives(createElementVNode("input", mergeProps({
    ref: "input",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.commandText = $event;
    }),
    type: "text",
    "class": _ctx.cx('commandText'),
    autocomplete: "off",
    onKeydown: _cache[1] || (_cache[1] = function () {
      return $options.onKeydown && $options.onKeydown.apply($options, arguments);
    })
  }, _ctx.ptm('commandText')), null, 16), [[vModelText, $data.commandText]])], 16)], 16);
}

script.render = render;

export { script as default };
