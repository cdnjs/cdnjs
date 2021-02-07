var e=function(){return (e=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++){ for(var a in t=arguments[r]){ Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]); } }return e}).apply(this,arguments)},t={kebab:/-(\w)/g,styleProp:/:(.*)/,styleList:/;(?![^(]*\))/g};function r(e,t){return t?t.toUpperCase():""}function s(e){for(var s,a={},c=0,o=e.split(t.styleList);c<o.length;c++){var n=o[c].split(t.styleProp),i=n[0],l=n[1];(i=i.trim())&&("string"==typeof l&&(l=l.trim()),a[(s=i,s.replace(t.kebab,r))]=l);}return a}function a(){
var arguments$1 = arguments;
for(var t,r,a={},c=arguments.length;c--;){ for(var o=0,n=Object.keys(arguments[c]);o<n.length;o++){ switch(t=n[o]){case"class":case"style":case"directives":if(Array.isArray(a[t])||(a[t]=[]),"style"===t){var i=void 0;i=Array.isArray(arguments$1[c].style)?arguments$1[c].style:[arguments$1[c].style];for(var l=0;l<i.length;l++){var y=i[l];"string"==typeof y&&(i[l]=s(y));}arguments$1[c].style=i;}a[t]=a[t].concat(arguments$1[c][t]);break;case"staticClass":if(!arguments$1[c][t]){ break; }void 0===a[t]&&(a[t]=""),a[t]&&(a[t]+=" "),a[t]+=arguments$1[c][t].trim();break;case"on":case"nativeOn":a[t]||(a[t]={});for(var p=0,f=Object.keys(arguments[c][t]||{});p<f.length;p++){ r=f[p],a[t][r]?a[t][r]=[].concat(a[t][r],arguments$1[c][t][r]):a[t][r]=arguments$1[c][t][r]; }break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":a[t]||(a[t]={}),a[t]=e({},arguments$1[c][t],a[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:a[t]||(a[t]=arguments$1[c][t]);} } }return a}

var linkMixin = {
  props: {
    // <a> props
    href: String,
    target: String,
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};

var BtnGroup = {
  functional: true,
  render: function render (h, ref) {
    var obj;

    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    return h(
      'div',
      a(data, {
        class: ( obj = {
          'btn-group': !props.vertical,
          'btn-group-vertical': props.vertical,
          'btn-group-justified': props.justified
        }, obj[("btn-group-" + (props.size))] = props.size, obj ),
        attrs: {
          role: 'group',
          'data-toggle': 'buttons'
        }
      }),
      children
    )
  },
  props: {
    size: String,
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';

var Btn = {
  functional: true,
  mixins: [linkMixin],
  render: function render (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;

    // event listeners
    var listeners = data.on || {};
    // checkbox: model contain inputValue
    // radio: model === inputValue
    var isInputActive = props.inputType === INPUT_TYPE_CHECKBOX ? props.value.indexOf(props.inputValue) >= 0 : props.value === props.inputValue;
    // button class
    var classes = {
      btn: true,
      active: props.inputType ? isInputActive : props.active,
      disabled: props.disabled,
      'btn-block': props.block
    };
    classes[("btn-" + (props.type))] = Boolean(props.type);
    classes[("btn-" + (props.size))] = Boolean(props.size);
    // prevent event for disabled links
    var on = {
      click: function click (e) {
        if (props.disabled && e instanceof Event) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    // render params
    var tag, options, slot;

    if (props.href) {
      // is native link
      tag = 'a';
      slot = children;
      options = a(data, {
        on: on,
        class: classes,
        attrs: {
          role: 'button',
          href: props.href,
          target: props.target
        }
      });
    } else if (props.to) {
      // is vue router link
      tag = 'router-link';
      slot = children;
      options = a(data, {
        nativeOn: on,
        class: classes,
        props: {
          event: props.disabled ? '' : 'click', // prevent nav while disabled
          to: props.to,
          replace: props.replace,
          append: props.append,
          exact: props.exact
        },
        attrs: {
          role: 'button'
        }
      });
    } else if (props.inputType) {
      // is input checkbox or radio
      tag = 'label';
      options = a(data, {
        on: on,
        class: classes
      });
      slot = [
        h('input', {
          attrs: {
            autocomplete: 'off',
            type: props.inputType,
            checked: isInputActive ? 'checked' : null,
            disabled: props.disabled
          },
          domProps: {
            checked: isInputActive // required
          },
          on: {
            input: function input (evt) {
              evt.stopPropagation();
            },
            change: function change () {
              if (props.inputType === INPUT_TYPE_CHECKBOX) {
                var valueCopied = props.value.slice();
                if (isInputActive) {
                  valueCopied.splice(valueCopied.indexOf(props.inputValue), 1);
                } else {
                  valueCopied.push(props.inputValue);
                }
                listeners.input(valueCopied);
              } else {
                listeners.input(props.inputValue);
              }
            }
          }
        }),
        children
      ];
    } else if (props.justified) {
      // is in justified btn-group
      tag = BtnGroup;
      options = {};
      slot = [
        h('button', a(data, {
          on: on,
          class: classes,
          attrs: {
            type: props.nativeType,
            disabled: props.disabled
          }
        }), children)
      ];
    } else {
      // is button
      tag = 'button';
      slot = children;
      options = a(data, {
        on: on,
        class: classes,
        attrs: {
          type: props.nativeType,
          disabled: props.disabled
        }
      });
    }

    return h(tag, options, slot)
  },
  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    size: String,
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // <input> props
    value: null,
    inputValue: null,
    inputType: {
      type: String,
      validator: function validator (value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO
      }
    }
  }
};

export default Btn;
//# sourceMappingURL=Btn.js.map
