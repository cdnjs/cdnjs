'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function classNames() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args) {
    var classes = [];
    for (var i = 0; i < args.length; i++) {
      var className = args[i];
      if (!className) {
        continue;
      }
      var type = _typeof(className);
      if (type === 'string' || type === 'number') {
        classes.push(className);
      } else if (type === 'object') {
        var _classes = Array.isArray(className) ? className : Object.entries(className).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          return value ? key : null;
        });
        classes = _classes.length ? classes.concat(_classes.filter(function (c) {
          return !!c;
        })) : classes;
      }
    }
    return classes.join(' ').trim();
  }
  return undefined;
}

var TRANSITIONS = {
  toggleable: {
    timeout: 500,
    classNames: {
      enter: 'max-h-0',
      enterActive: '!max-h-[1000px] overflow-hidden transition-[max-height] duration-500 ease-in',
      exit: 'max-h-[1000px]',
      exitActive: '!max-h-0 overflow-hidden transition-[max-height] duration-500 ease-out'
    }
  },
  overlay: {
    timeout: 150,
    classNames: {
      enter: 'opacity-0 scale-75',
      enterActive: 'opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in',
      exit: 'opacity-100',
      exitActive: '!opacity-0 transition-opacity duration-150 ease-linear'
    }
  }
};
var Tailwind = {
  global: {
    css: "\n        *[data-pd-ripple=\"true\"]{\n            overflow: hidden;\n            position: relative;\n        }\n        span[data-p-ink-active=\"true\"]{\n            animation: ripple 0.4s linear;\n        }\n        @keyframes ripple {\n            100% {\n                opacity: 0;\n                transform: scale(2.5);\n            }\n        }\n\n        .progress-spinner-circle {\n            stroke-dasharray: 89, 200;\n            stroke-dashoffset: 0;\n            animation: p-progress-spinner-dash 1.5s ease-in-out infinite, p-progress-spinner-color 6s ease-in-out infinite;\n            stroke-linecap: round;\n        }\n\n        @keyframes p-progress-spinner-dash{\n            0% {\n                stroke-dasharray: 1, 200;\n                stroke-dashoffset: 0;\n            }\n\n            50% {\n                stroke-dasharray: 89, 200;\n                stroke-dashoffset: -35px;\n            }\n            100% {\n                stroke-dasharray: 89, 200;\n                stroke-dashoffset: -124px;\n            }\n        }\n        @keyframes p-progress-spinner-color {\n            100%, 0% {\n                stroke: #ff5757;\n            }\n            40% {\n                stroke: #696cff;\n            }\n            66% {\n                stroke: #1ea97c;\n            }\n            80%, 90% {\n                stroke: #cc8925;\n            }\n        }\n\n        .progressbar-value-animate::after {\n            will-change: left, right;\n            animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n        }\n        .progressbar-value-animate::before {\n            will-change: left, right;\n            animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n        }\n        @keyframes p-progressbar-indeterminate-anim {\n            0% {\n                left: -35%;\n                right: 100%;\n            }\n            60% {\n                left: 100%;\n                right: -90%;\n            }\n            100% {\n                left: 100%;\n                right: -90%;\n            }\n        }\n"
  },
  //PANELS
  panel: {
    header: function header(_ref) {
      var props = _ref.props;
      return {
        className: classNames('flex items-center justify-between',
        // flex and alignments
        'border border-gray-300 bg-gray-100 text-gray-700 rounded-tl-lg rounded-tr-lg',
        // borders and colors
        'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80',
        // Dark mode
        {
          'p-5': !props.toggleable,
          'py-3 px-5': props.toggleable
        } // condition
        )
      };
    },

    title: 'leading-none font-bold',
    toggler: {
      className: classNames('inline-flex items-center justify-center overflow-hidden relative no-underline',
      // alignments
      'w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition duration-200 ease-in-out',
      // widths, borders, and transitions
      'hover:text-gray-900 hover:border-transparent hover:bg-gray-200 dark:hover:text-white/80 dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
      // hover
      'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]' // focus
      )
    },

    togglerIcon: 'inline-block',
    content: {
      className: classNames('p-5 border border-gray-300 bg-white text-gray-700 border-t-0 last:rounded-br-lg last:rounded-bl-lg', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // Dark mode
      )
    },

    transition: TRANSITIONS.toggleable
  },
  accordion: {
    root: 'mb-1',
    tab: {
      root: 'mb-1',
      header: function header(_ref2) {
        var context = _ref2.context;
        return {
          className: classNames({
            'select-none pointer-events-none cursor-default opacity-60': context.disabled
          } // Condition
          )
        };
      },

      headerAction: function headerAction(_ref3) {
        var context = _ref3.context;
        return {
          className: classNames('flex items-center cursor-pointer relative no-underline select-none',
          // Alignments
          'p-5 transition duration-200 ease-in-out rounded-t-md font-bold transition-shadow duration-200',
          // Padding and transition
          'border border-gray-300 bg-gray-100 text-gray-600',
          // Borders and colors
          'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
          // Dark mode
          'hover:border-gray-300 hover:bg-gray-200 hover:text-gray-800',
          // Hover
          'focus:outline-none focus:outline-offset-0 focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)]',
          // Focus
          {
            'rounded-br-md rounded-bl-md': !context.selected,
            'rounded-br-0 rounded-bl-0 text-gray-800': context.selected
          } // Condition
          )
        };
      },

      headerIcon: 'inline-block mr-2',
      headerTitle: 'leading-none',
      content: {
        className: classNames('p-5 border border-gray-300 bg-white text-gray-700 border-t-0 rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // Dark mode
        )
      },

      transition: TRANSITIONS.toggleable
    }
  },
  card: {
    root: {
      className: classNames('bg-white text-gray-700 shadow-md rounded-md',
      // Background, text color, box shadow, and border radius.
      'dark:bg-gray-900 dark:text-white ' //dark
      )
    },

    body: 'p-5',
    // Padding.
    title: 'text-2xl font-bold mb-2',
    // Font size, font weight, and margin bottom.
    subTitle: {
      className: classNames('font-normal mb-2 text-gray-600',
      // Font weight, margin bottom, and text color.
      'dark:text-white/60 ' //dark
      )
    },

    content: 'py-5',
    // Vertical padding.
    footer: 'pt-5' // Top padding.
  },

  divider: {
    root: function root(_ref4) {
      var props = _ref4.props;
      return {
        className: classNames('flex relative',
        // alignments.
        {
          'w-full my-5 mx-0 py-0 px-5 before:block before:left-0 before:absolute before:top-1/2 before:w-full before:border-t before:border-gray-300 before:dark:border-blue-900/40': props.layout == 'horizontal',
          // Padding and borders for horizontal layout.
          'min-h-full mx-4 md:mx-5 py-5 before:block before:min-h-full before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2 before:border-l before:border-gray-300 before:dark:border-blue-900/40': props.layout == 'vertical' // Padding and borders for vertical layout.
        }, {
          'before:border-solid': props.type == 'solid',
          'before:border-dotted': props.type == 'dotted',
          'before:border-dashed': props.type == 'dashed'
        } // Border type condition.
        )
      };
    },

    content: 'px-1 bg-white z-10 dark:bg-gray-900' // Padding and background color.
  },

  fieldset: {
    root: {
      className: classNames('border border-gray-300 bg-white text-gray-700 rounded-md block mx-2 my-0.5 pl-4 pr-5 inline-size-min',
      // Borders, background, text color, spacing, and inline size.
      'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' //dark
      )
    },

    legend: function legend(_ref5) {
      var props = _ref5.props;
      return {
        className: classNames('border border-gray-300 text-gray-700 bg-gray-50 font-bold rounded-md', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 ',
        //dark
        {
          'p-0 transition-none hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 dark:hover:text-white/80 dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': props.toggleable,
          'p-5': !props.toggleable
        })
      };
    },
    toggler: function toggler(_ref6) {
      var props = _ref6.props;
      return {
        className: classNames('flex items-center justify-center', {
          'p-5 text-gray-700 rounded-md transition-none cursor-pointer overflow-hidden relative select-none hover:text-gray-900 focus:focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] dark:text-white/80 dark:hover:text-white/80 dark:hover:bg-gray-800/60 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': props.toggleable
        })
      };
    },
    togglerIcon: 'mr-2 inline-block',
    // Margin and display style.
    legendTitle: 'flex items-center justify-center leading-none',
    // alignments, and leading style.
    content: 'p-5',
    // Padding.
    transition: TRANSITIONS.toggleable
  },
  scrollpanel: {
    wrapper: 'overflow-hidden relative float-left h-full w-full z-[1]',
    content: 'box-border h-[calc(100%+18px)] overflow-scroll pr-[18px] pb-[18px] pl-0 pt-0 relative scrollbar-none w-[calc(100%+18px)] [&::-webkit-scrollbar]:hidden',
    barX: {
      className: classNames('relative bg-gray-100 invisible rounded cursor-pointer h-[9px] bottom-0 z-[2]', 'transition duration-[250ms] ease-linear')
    },
    barY: {
      className: classNames('relative bg-gray-100 rounded cursor-pointer w-[9px] top-0 z-[2]', 'transition duration-[250ms] ease-linear')
    }
  },
  tabview: {
    navContainer: function navContainer(_ref7) {
      var props = _ref7.props;
      return {
        className: classNames('relative',
        // Relative positioning.
        {
          'overflow-hidden': props.scrollable
        } // Overflow condition.
        )
      };
    },

    navContent: 'overflow-y-hidden overscroll-contain overscroll-auto scroll-smooth [&::-webkit-scrollbar]:hidden',
    // Overflow and scrollbar styles.
    previousButton: {
      className: classNames('h-full flex items-center justify-center !absolute top-0 z-20', 'left-0', 'bg-white text-blue-500 w-12 shadow-md rounded-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 )') // Flex and absolute positioning styles.
    },

    nextButton: {
      className: classNames('h-full flex items-center justify-center !absolute top-0 z-20', 'right-0', 'bg-white text-blue-500 w-12 shadow-md rounded-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 ') // Flex and absolute positioning styles.
    },

    nav: {
      className: classNames('flex flex-1 list-none m-0 p-0', 'bg-transparent border border-gray-300 border-0 border-b-2', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 ') // Flex, list, margin, padding, and border styles.
    },

    tabpanel: {
      header: function header(_ref8) {
        var props = _ref8.props;
        return {
          className: classNames('mr-0', {
            'cursor-default pointer-events-none select-none user-select-none opacity-60': props === null || props === void 0 ? void 0 : props.disabled
          }) // Margin and condition-based styles.
        };
      },

      headerAction: function headerAction(_ref9) {
        var parent = _ref9.parent,
          context = _ref9.context;
        return {
          className: classNames('items-center cursor-pointer flex overflow-hidden relative select-none text-decoration-none user-select-none',
          // Flex and overflow styles.
          'border-b-2 p-5 font-bold rounded-t-md transition-shadow duration-200 m-0',
          // Border, padding, font, and transition styles.
          'transition-colors duration-200',
          // Transition duration style.
          'focus:outline-none focus:outline-offset-0 focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
          // Focus styles.
          {
            'border-gray-300 bg-white text-gray-700 hover:bg-white hover:border-gray-400 hover:text-gray-600 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 dark:hover:bg-gray-800/80': parent.state.activeIndex !== context.index,
            // Condition-based hover styles.
            'bg-white border-blue-500 text-blue-500 dark:bg-gray-900 dark:border-blue-300 dark:text-blue-300': parent.state.activeIndex === context.index // Condition-based active styles.
          }),

          style: {
            marginBottom: '-2px'
          } // Negative margin style.
        };
      },

      headerTitle: {
        className: classNames('leading-none whitespace-nowrap') // Leading and whitespace styles.
      },

      content: {
        className: classNames('bg-white p-5 border-0 text-gray-700 rounded-bl-md rounded-br-md', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80') // Background, padding, border, and text styles.
      }
    }
  },

  splitter: {
    root: function root(_ref10) {
      var props = _ref10.props,
        state = _ref10.state;
      return {
        className: classNames('flex flex-nowrap bg-white dark:bg-gray-900 rounded-lg text-gray-700 dark:text-white/80', {
          'border border-solid border-gray-300 dark:border-blue-900/40': !state.nested,
          'flex-col': props.layout === 'vertical'
        })
      };
    },
    gutter: function gutter(_ref11) {
      var props = _ref11.props;
      return {
        className: classNames('flex items-center justify-center shrink-0', 'transition-all duration-200 bg-gray-100 dark:bg-gray-800', {
          'cursor-col-resize': props.layout == 'horizontal',
          'cursor-row-resize': props.layout !== 'horizontal'
        })
      };
    },
    gutterHandler: function gutterHandler(_ref12) {
      var props = _ref12.props;
      return {
        className: classNames('bg-gray-300 dark:bg-gray-600 transition-all duration-200', {
          'h-7 w-[0.3rem]': props.layout == 'horizontal',
          'w-7 h-[0.3rem]': props.layout == 'vertical'
        })
      };
    }
  },
  dialog: {
    root: function root(_ref13) {
      var state = _ref13.state;
      return {
        className: classNames('rounded-lg shadow-lg border-0', 'max-h-[90%] transform scale-100', 'm-0 w-[50vw]', 'dark:border dark:border-blue-900/40', {
          'transition-none transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': state.maximized
        })
      };
    },
    header: {
      className: classNames('flex items-center justify-between shrink-0', 'bg-white text-gray-800 border-t-0  rounded-tl-lg rounded-tr-lg p-6', 'dark:bg-gray-900  dark:text-white/80')
    },
    headerTitle: 'font-bold text-lg',
    headerIcons: 'flex items-center',
    closeButton: {
      className: classNames('flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0', 'hover:text-gray-700 hover:border-transparent hover:bg-gray-200', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
      // focus
      'dark:hover:text-white/80 dark:hover:border-transparent dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    closeButtonIcon: 'w-4 h-4 inline-block',
    content: function content(_ref14) {
      var props = _ref14.props,
        state = _ref14.state;
      return {
        className: classNames('overflow-y-auto', 'bg-white text-gray-700 px-6 pb-8 pt-0', {
          'rounded-bl-lg rounded-br-lg': !props.footer
        }, 'dark:bg-gray-900  dark:text-white/80 ', {
          grow: state.maximized
        })
      };
    },
    footer: {
      className: classNames('flex gap-2 shrink-0 justify-end align-center', 'border-t-0 bg-white text-gray-700 px-6 pb-6 text-right rounded-b-lg', 'dark:bg-gray-900 dark:text-white/80')
    },
    mask: function mask(_ref15) {
      var state = _ref15.state;
      return {
        className: classNames('transition duration-200', {
          'bg-black/40': state.containerVisible
        })
      };
    },
    transition: function transition(_ref16) {
      var props = _ref16.props;
      return {
        timeout: 200,
        classNames: props.position === 'top' ? {
          enter: 'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0',
          enterActive: '!opacity-100 !scale-100 !translate-y-0 transition-all duration-200 ease-out',
          exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
          exitActive: '!opacity-0 !scale-75 translate-x-0 -translate-y-full translate-z-0'
        } : props.position === 'bottom' ? {
          enter: 'opacity-0 scale-75 translate-y-full',
          enterActive: '!opacity-100 !scale-100 !translate-y-0 transition-all duration-200 ease-out',
          exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
          exitActive: '!opacity-0 !scale-75 translate-x-0 translate-y-full translate-z-0'
        } : props.position === 'left' || props.position === 'top-left' || props.position === 'bottom-left' ? {
          enter: 'opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0',
          enterActive: '!opacity-100 !scale-100 !translate-x-0 transition-all duration-200 ease-out',
          exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
          exitActive: '!opacity-0 !scale-75 -translate-x-full translate-y-0 translate-z-0'
        } : props.position === 'right' || props.position === 'top-right' || props.position === 'bottom-right' ? {
          enter: 'opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0',
          enterActive: '!opacity-100 !scale-100 !translate-x-0 transition-all duration-200 ease-out',
          exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
          exitActive: '!opacity-0 !scale-75 translate-x-full translate-y-0 translate-z-0'
        } : {
          enter: 'opacity-0 scale-75',
          enterActive: '!opacity-100 !scale-100 transition-all duration-200 ease-out',
          exit: 'opacity-100 scale-100 transition-all duration-200 ease-out',
          exitActive: '!opacity-0 !scale-75'
        }
      };
    }
  },
  confirmdialog: {
    root: {
      className: classNames('bg-white text-gray-700 border-0 rounded-md shadow-lg', 'z-40 transform origin-center', 'mt-3 absolute left-0 top-0', 'before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-6 before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-white dark:before:border-b-gray-900', 'dark:border dark:border-blue-900/40 dark:bg-gray-900  dark:text-white/80')
    },
    content: 'p-5 items-center flex',
    icon: 'text-2xl',
    message: 'ml-4',
    footer: 'flex gap-2 justify-end align-center text-right px-5 py-5 pt-0',
    transition: TRANSITIONS.overlay
  },
  confirmpopup: {
    root: {
      className: classNames('bg-white text-gray-700 border-0 rounded-md shadow-lg', 'z-40 transform origin-center', 'mt-3 absolute left-0 top-0', 'before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-6 before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-white dark:before:border-b-gray-900', 'dark:border dark:border-blue-900/40 dark:bg-gray-900  dark:text-white/80')
    },
    content: 'p-5 items-center flex',
    icon: 'text-2xl',
    message: 'ml-4',
    footer: 'flex gap-2 justify-end align-center text-right px-5 py-5 pt-0',
    transition: TRANSITIONS.overlay
  },
  overlaypanel: {
    root: {
      className: classNames('bg-white text-gray-700 border-0 rounded-md shadow-lg', 'z-40 transform origin-center', 'absolute left-0 top-0 mt-3', 'before:absolute before:w-0 before:-top-3 before:h-0 before:border-transparent before:border-solid before:ml-6 before:border-x-[0.75rem] before:border-b-[0.75rem] before:border-t-0 before:border-b-white dark:before:border-b-gray-900', 'dark:border dark:border-blue-900/40 dark:bg-gray-900  dark:text-white/80')
    },
    closeButton: 'flex items-center justify-center overflow-hidden absolute top-0 right-0 w-6 h-6',
    content: 'p-5 items-center flex',
    transition: TRANSITIONS.overlay
  },
  sidebar: {
    root: function root(_ref17) {
      var props = _ref17.props;
      return {
        className: classNames('flex flex-col pointer-events-auto relative transform relative', 'bg-white text-gray-700 border-0 shadow-lg', {
          '!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': props.fullScreen,
          'h-full w-80': props.position == 'left' || props.position == 'right',
          'h-40 w-full': props.position == 'top' || props.position == 'bottom'
        }, 'dark:border dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80')
      };
    },
    header: {
      className: classNames('flex items-center justify-end', 'p-5')
    },
    closeButton: {
      className: classNames('flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0', 'hover:text-gray-700 hover:border-transparent hover:bg-gray-200', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
      // focus
      'dark:hover:text-white/80 dark:hover:text-white/80 dark:hover:border-transparent dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    closeButtonIcon: 'w-4 h-4 inline-block',
    content: {
      className: classNames('p-5 pt-0 h-full w-full', 'grow overflow-y-auto')
    },
    mask: {
      className: classNames('flex pointer-events-auto', 'bg-black bg-opacity-40 transition duration-200 z-20 transition-colors')
    },
    transition: function transition(_ref18) {
      var props = _ref18.props;
      return {
        timeout: 300,
        classNames: props.fullScreen ? {
          enter: 'opacity-0',
          enterActive: '!opacity-100 transition-opacity duration-300 ease-in',
          exit: 'opacity-100 transition-opacity duration-300 ease-in',
          exitActive: '!opacity-0'
        } : props.position === 'top' ? {
          enter: 'translate-x-0 -translate-y-full translate-z-0',
          enterActive: '!translate-y-0 transition-transform duration-300',
          exit: 'translate-y-0 transition-transform duration-300',
          exitActive: 'translate-x-0 !-translate-y-full translate-z-0'
        } : props.position === 'bottom' ? {
          enter: 'translate-x-0 translate-y-full translate-z-0',
          enterActive: '!translate-y-0 transition-transform duration-300',
          exit: 'translate-y-0 transition-transform duration-300',
          exitActive: 'translate-x-0 !translate-y-full translate-z-0'
        } : props.position === 'left' ? {
          enter: '-translate-x-full translate-y-0 translate-z-0',
          enterActive: '!translate-x-0 transition-transform duration-300',
          exit: 'translate-x-0 transition-transform duration-300',
          exitActive: '!-translate-x-full translate-y-0 translate-z-0'
        } : props.position === 'right' ? {
          enter: 'translate-x-full translate-y-0 translate-z-0',
          enterActive: '!translate-x-0 transition-transform duration-300',
          exit: 'translate-x-0 transition-transform duration-300',
          exitActive: '!translate-x-full translate-y-0 translate-z-0'
        } : undefined
      };
    }
  },
  toolbar: {
    root: {
      className: classNames('flex items-center justify-between flex-wrap', 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-blue-900/40  p-5 rounded-md gap-2')
    },
    start: 'flex items-center',
    center: 'flex items-center',
    end: 'flex items-center'
  },
  tooltip: {
    root: function root(_ref19) {
      var context = _ref19.context;
      return {
        className: classNames('absolute shadow-md', {
          'py-0 px-1': context.right || context.left || !context.right && !context.left && !context.top && !context.bottom,
          'py-1 px-0': context.top || context.bottom
        })
      };
    },
    arrow: function arrow(_ref20) {
      var context = _ref20.context;
      return {
        className: classNames('absolute w-0 h-0 border-transparent border-solid', {
          '-mt-1 border-y-[0.25rem] border-r-[0.25rem] border-l-0 border-r-gray-600': context.right,
          '-mt-1 border-y-[0.25rem] border-l-[0.25rem] border-r-0 border-l-gray-600': context.left,
          '-ml-1 border-x-[0.25rem] border-t-[0.25rem] border-b-0 border-t-gray-600': context.top,
          '-ml-1 border-x-[0.25rem] border-b-[0.25rem] border-t-0 border-b-gray-600': context.bottom
        })
      };
    },
    text: {
      className: 'p-3 bg-gray-600 text-white rounded-md whitespace-pre-line break-words'
    }
  },
  //UPLOAD
  fileupload: {
    input: 'hidden',
    buttonbar: {
      className: classNames('flex flex-wrap', 'bg-gray-50 dark:bg-gray-800 p-5 border border-solid border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 rounded-tr-lg rounded-tl-lg gap-2 border-b-0')
    },
    basicButton: {
      className: classNames('text-white bg-blue-500 border border-blue-500 p-3 px-5 rounded-md text-base', 'overflow-hidden relative')
    },
    chooseButton: {
      className: classNames('text-white bg-blue-500 border border-blue-500 p-3 px-5 rounded-md text-base', 'overflow-hidden relative')
    },
    chooseIcon: 'mr-2 inline-block',
    chooseButtonLabel: 'flex-1 font-bold',
    uploadButton: {
      icon: 'mr-2'
    },
    cancelButton: {
      icon: 'mr-2'
    },
    content: {
      className: classNames('relative', 'bg-white dark:bg-gray-900 p-8 border border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 rounded-b-lg')
    },
    file: {
      className: classNames('flex items-center flex-wrap', 'p-4 border border-gray-300 dark:border-blue-900/40 rounded gap-2 mb-2', 'last:mb-0')
    },
    thumbnail: 'shrink-0',
    fileName: 'mb-2',
    fileSize: 'mr-2',
    uploadIcon: 'mr-2'
  },
  //Messages
  messages: {
    root: function root(_ref21) {
      var state = _ref21.state,
        index = _ref21.index;
      return {
        className: classNames('my-4 rounded-md', {
          'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': state.messages[index] && state.messages[index].message.severity == 'info',
          'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700': state.messages[index] && state.messages[index].message.severity == 'success',
          'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': state.messages[index] && state.messages[index].message.severity == 'warn',
          'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700': state.messages[index] && state.messages[index].message.severity == 'error'
        })
      };
    },
    wrapper: 'flex items-center py-5 px-7',
    icon: {
      className: classNames('w-6 h-6', 'text-lg mr-2')
    },
    text: 'text-base font-normal',
    button: {
      className: classNames('w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out', 'ml-auto overflow-hidden relative', 'flex items-center justify-center', 'hover:bg-white/30')
    },
    transition: {
      timeout: 300,
      classNames: {
        enter: 'max-h-0 opacity-0',
        enterActive: '!max-h-40 !opacity-100 overflow-hidden transition-all duration-300',
        exit: 'max-h-40 opacity-100',
        exitActive: '!max-h-0 !opacity-0 !m-0 overflow-hidden transition-all duration-300 ease-in'
      }
    }
  },
  message: {
    root: function root(_ref22) {
      var props = _ref22.props;
      return {
        className: classNames('inline-flex items-center justify-center align-top', 'p-3 m-0 rounded-md', {
          'bg-blue-100 border-0 text-blue-700': props.severity == 'info',
          'bg-green-100 border-0 text-green-700': props.severity == 'success',
          'bg-orange-100 border-0 text-orange-700': props.severity == 'warn',
          'bg-red-100 border-0 text-red-700': props.severity == 'error'
        })
      };
    },
    icon: 'text-base mr-2'
  },
  toast: {
    root: {
      className: classNames('w-96', 'opacity-90')
    },
    message: function message(_ref23) {
      var state = _ref23.state,
        index = _ref23.index;
      return {
        className: classNames('my-4 rounded-md w-full', {
          'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': state.messages[index] && state.messages[index].message.severity == 'info',
          'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700': state.messages[index] && state.messages[index].message.severity == 'success',
          'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': state.messages[index] && state.messages[index].message.severity == 'warn',
          'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700': state.messages[index] && state.messages[index].message.severity == 'error'
        })
      };
    },
    content: 'flex items-center py-5 px-7',
    icon: {
      className: classNames('w-6 h-6', 'text-lg mr-2')
    },
    text: 'text-base font-normal flex flex-col flex-1 grow shrink ml-4',
    summary: 'font-bold block',
    detail: 'mt-1 block',
    closeButton: {
      className: classNames('w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out', 'ml-auto overflow-hidden relative', 'flex items-center justify-center', 'hover:bg-white/30')
    },
    transition: {
      timeout: {
        enter: 300,
        exit: 500
      },
      classNames: {
        enter: 'opacity-0 max-h-0 translate-x-0 translate-y-2/4 translate-z-0',
        enterActive: '!max-h-40 !opacity-90 !translate-y-0 transition-transform transition-opacity duration-300',
        exit: 'max-h-40 opacity-90',
        exitActive: '!max-h-0 !opacity-0 !mb-0 overflow-hidden transition-all duration-500 ease-in'
      }
    }
  },
  //BUTTONS
  button: {
    root: function root(_ref24) {
      var props = _ref24.props,
        context = _ref24.context;
      return {
        className: classNames('items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom', 'transition duration-200 ease-in-out', 'focus:outline-none focus:outline-offset-0', {
          'text-white dark:text-gray-900 bg-blue-500 dark:bg-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:border-blue-600 dark:hover:border-blue-500 focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
          'text-blue-600 bg-transparent border-transparent focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]': props.link
        }, {
          'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(176,185,198,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(203,213,225,0.7),0_1px_2px_0_rgba(0,0,0,0)]': props.severity === 'secondary',
          'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(136,234,172,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(134,239,172,0.7),0_1px_2px_0_rgba(0,0,0,0)]': props.severity === 'success',
          'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(157,193,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(147,197,253,0.7),0_1px_2px_0_rgba(0,0,0,0)]': props.severity === 'info',
          'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(250,207,133,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(252,211,77,0.7),0_1px_2px_0_rgba(0,0,0,0)]': props.severity === 'warning',
          'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(212,170,251,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(216,180,254,0.7),0_1px_2px_0_rgba(0,0,0,0)]': props.severity === 'help',
          'focus:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(247,162,162,1),0_1px_2px_0_rgba(0,0,0,1)] dark:focus:shadow-[0_0_0_2px_rgba(28,33,39,1),0_0_0_4px_rgba(252,165,165,0.7),0_1px_2px_0_rgba(0,0,0,0)]': props.severity === 'danger'
        }, {
          'text-white dark:text-gray-900 bg-gray-500 dark:bg-gray-400 border border-gray-500 dark:border-gray-400 hover:bg-gray-600 dark:hover:bg-gray-500 hover:border-gray-600 dark:hover:border-gray-500': props.severity === 'secondary' && !props.text && !props.outlined && !props.plain,
          'text-white dark:text-gray-900 bg-green-500 dark:bg-green-400 border border-green-500 dark:border-green-400 hover:bg-green-600 dark:hover:bg-green-500 hover:border-green-600 dark:hover:border-green-500': props.severity === 'success' && !props.text && !props.outlined && !props.plain,
          'text-white dark:text-gray-900 dark:bg-blue-400 bg-blue-500 dark:bg-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500': props.severity === 'info' && !props.text && !props.outlined && !props.plain,
          'text-white dark:text-gray-900 bg-orange-500 dark:bg-orange-400 border border-orange-500 dark:border-orange-400 hover:bg-orange-600 dark:hover:bg-orange-500 hover:border-orange-600 dark:hover:border-orange-500': props.severity === 'warning' && !props.text && !props.outlined && !props.plain,
          'text-white dark:text-gray-900 bg-purple-500 dark:bg-purple-400 border border-purple-500 dark:border-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500 hover:border-purple-600 dark:hover:border-purple-500': props.severity === 'help' && !props.text && !props.outlined && !props.plain,
          'text-white dark:text-gray-900 bg-red-500 dark:bg-red-400 border border-red-500 dark:border-red-400 hover:bg-red-600 dark:hover:bg-red-500 hover:border-red-600 dark:hover:border-red-500': props.severity === 'danger' && !props.text && !props.outlined && !props.plain
        }, {
          'shadow-lg': props.raised
        }, {
          'rounded-md': !props.rounded,
          'rounded-full': props.rounded
        }, {
          'bg-transparent border-transparent': props.text && !props.plain,
          'text-blue-500 dark:text-blue-400 hover:bg-blue-300/20': props.text && (props.severity === null || props.severity === 'info') && !props.plain,
          'text-gray-500 dark:text-grayy-400 hover:bg-gray-300/20': props.text && props.severity === 'secondary' && !props.plain,
          'text-green-500 dark:text-green-400 hover:bg-green-300/20': props.text && props.severity === 'success' && !props.plain,
          'text-orange-500 dark:text-orange-400 hover:bg-orange-300/20': props.text && props.severity === 'warning' && !props.plain,
          'text-purple-500 dark:text-purple-400 hover:bg-purple-300/20': props.text && props.severity === 'help' && !props.plain,
          'text-red-500 dark:text-red-400 hover:bg-red-300/20': props.text && props.severity === 'danger' && !props.plain
        }, {
          'shadow-lg': props.raised && props.text
        }, {
          'text-gray-500 hover:bg-gray-300/20': props.plain & props.text,
          'text-gray-500 border border-gray-500 hover:bg-gray-300/20': props.plain & props.outlined,
          'text-white bg-gray-500 border border-gray-500 hover:bg-gray-600 hover:border-gray-600': props.plain & !props.outlined & !props.text
        }, {
          'bg-transparent border': props.outlined && !props.plain,
          'text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 hover:bg-blue-300/20': props.outlined && (props.severity === null || props.severity === 'info') && !props.plain,
          'text-gray-500 dark:text-gray-400 border border-gray-500 dark:border-gray-400 hover:bg-gray-300/20': props.outlined && props.severity === 'secondary' && !props.plain,
          'text-green-500 dark:text-green-400 border border-green-500 dark:border-green-400 hover:bg-green-300/20': props.outlined && props.severity === 'success' && !props.plain,
          'text-orange-500 dark:text-orange-400 border border-orange-500 dark:border-orange-400 hover:bg-orange-300/20': props.outlined && props.severity === 'warning' && !props.plain,
          'text-purple-500 dark:text-purple-400 border border-purple-500 dark:border-purple-400 hover:bg-purple-300/20': props.outlined && props.severity === 'help' && !props.plain,
          'text-red-500 dark:text-red-400 border border-red-500 dark:border-red-400 hover:bg-red-300/20': props.outlined && props.severity === 'danger' && !props.plain
        }, {
          'px-4 py-3 text-base': props.size === null,
          'text-xs py-2 px-3': props.size === 'small',
          'text-xl py-3 px-4': props.size === 'large'
        }, {
          'flex-column': props.iconPos == 'top' || props.iconPos == 'bottom'
        }, {
          'opacity-60 pointer-events-none cursor-default': context === null || context === void 0 ? void 0 : context.disabled
        })
      };
    },
    label: function label(_ref25) {
      var props = _ref25.props;
      return {
        className: classNames('flex-1', 'duration-200', 'font-bold', {
          'hover:underline': props.link
        }, {
          'invisible w-0': props.label == null
        })
      };
    },
    icon: function icon(_ref26) {
      var props = _ref26.props;
      return {
        className: classNames('mx-0', {
          'mr-2': props.iconPos == 'left' && props.label != null,
          'ml-2 order-1': props.iconPos == 'right' && props.label != null,
          'mb-2': props.iconPos == 'top' && props.label != null,
          'mt-2 order-2': props.iconPos == 'bottom' && props.label != null
        })
      };
    },
    loadingIcon: function loadingIcon(_ref27) {
      var props = _ref27.props;
      return {
        className: classNames('mx-0', {
          'mr-2': props.loading && props.iconPos == 'left' && props.label != null,
          'ml-2 order-1': props.loading && props.iconPos == 'right' && props.label != null,
          'mb-2': props.loading && props.iconPos == 'top' && props.label != null,
          'mt-2 order-2': props.loading && props.iconPos == 'bottom' && props.label != null
        })
      };
    },
    badge: function badge(_ref28) {
      var props = _ref28.props;
      return {
        className: classNames({
          'ml-2 w-4 h-4 leading-none flex items-center justify-center': props.badge
        })
      };
    }
  },
  speeddial: {
    root: 'absolute flex',
    button: {
      root: function root(_ref29) {
        var parent = _ref29.parent;
        return {
          className: classNames('w-16 !h-16 !rounded-full justify-center z-10', {
            'rotate-45': parent.state.visible
          })
        };
      },
      label: {
        className: 'hidden'
      }
    },
    menu: 'm-0 p-0 list-none flex items-center justify-center transition delay-200 z-20',
    menuitem: function menuitem(_ref30) {
      var props = _ref30.props,
        state = _ref30.state;
      return {
        className: classNames('transform transition-transform duration-200 ease-out transition-opacity duration-800', !state.visible ? 'opacity-0 scale-0' : 'opacity-1 scale-100', {
          'my-1 first:mb-2': props.direction == 'up' && props.type == 'linear',
          'my-1 first:mt-2': props.direction == 'down' && props.type == 'linear',
          'mx-1 first:mr-2': props.direction == 'left' && props.type == 'linear',
          'mx-1 first:ml-2': props.direction == 'right' && props.type == 'linear'
        }, {
          absolute: props.type !== 'linear'
        })
      };
    },
    action: {
      className: classNames('flex items-center justify-center rounded-full relative overflow-hidden', 'w-12 h-12 bg-gray-700 hover:bg-gray-800 text-white')
    },
    mask: function mask(_ref31) {
      var state = _ref31.state;
      return {
        className: classNames('absolute left-0 top-0 w-full h-full transition-opacity duration-250 ease-in-out bg-black/40 z-0', {
          'opacity-0': !state.visible,
          'pointer-events-none opacity-100 transition-opacity duration-400 ease-in-out': state.visible
        })
      };
    }
  },
  splitbutton: {
    root: function root(_ref32) {
      var props = _ref32.props;
      return {
        className: classNames('inline-flex relative', 'rounded-md', {
          'shadow-lg': props.raised
        })
      };
    },
    button: {
      root: function root(_ref33) {
        var parent = _ref33.parent;
        return {
          className: classNames('rounded-r-none border-r-0', {
            'rounded-l-full': parent.props.rounded
          })
        };
      },
      icon: 'mr-2'
    },
    menu: {
      className: classNames('outline-none', 'py-1	px-0 rounded-md	 list-none bg-white	border-none shadow-lg')
    },
    menuList: 'm-0 p-0 border-none outline-none no-underline list-none',
    menuButton: {
      root: function root(_ref34) {
        var parent = _ref34.parent;
        return {
          className: classNames('rounded-l-none', {
            'rounded-r-full': parent.props.rounded
          })
        };
      },
      label: 'hidden'
    },
    anchor: 'cursor-pointer flex items-center relative overflow-hidden py-3 px-5 rounded-none transition select-none hover:text-gray-700 hover:bg-gray-200',
    menuIcon: 'mr-2'
  },
  //FORMS
  inputtext: {
    root: function root(_ref35) {
      var props = _ref35.props,
        context = _ref35.context;
      return {
        className: classNames('m-0', 'font-sans text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg', {
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled
        }, {
          'text-lg px-4 py-4': props.size == 'large',
          'text-xs px-2 py-2': props.size == 'small',
          'p-3 text-base': !props.size || typeof props.size === 'number'
        })
      };
    }
  },
  inputnumber: {
    root: 'w-full inline-flex',
    input: {
      root: function root(_ref36) {
        var props = _ref36.props;
        return {
          className: classNames({
            'rounded-tr-none rounded-br-none': props.showButtons && props.buttonLayout == 'stacked'
          })
        };
      }
    },
    buttonGroup: function buttonGroup(_ref37) {
      var props = _ref37.props;
      return {
        className: classNames({
          'flex flex-col': props.showButtons && props.buttonLayout == 'stacked'
        })
      };
    },
    incrementButton: function incrementButton(_ref38) {
      var props = _ref38.props;
      return {
        className: classNames('flex !items-center !justify-center', {
          'rounded-br-none rounded-bl-none rounded-bl-none !p-0 flex-1 w-[3rem]': props.showButtons && props.buttonLayout == 'stacked'
        })
      };
    },
    decrementButton: function decrementButton(_ref39) {
      var props = _ref39.props;
      return {
        className: classNames('flex !items-center !justify-center', {
          'rounded-tr-none rounded-tl-none rounded-tl-none !p-0 flex-1 w-[3rem]': props.showButtons && props.buttonLayout == 'stacked'
        })
      };
    }
  },
  knob: {
    root: function root(_ref40) {
      var props = _ref40.props;
      return {
        className: classNames('focus:outline-none focus:outline-offset-0 focus:shadow-0', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    range: 'stroke-current transition duration-100 ease-in stroke-gray-200 dark:stroke-gray-700 fill-none',
    value: 'animate-dash-frame  stroke-blue-500 fill-none',
    label: 'text-center text-xl'
  },
  inputswitch: {
    root: function root(_ref41) {
      var props = _ref41.props;
      return {
        className: classNames('inline-block relative', 'w-12 h-7', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    slider: function slider(_ref42) {
      var props = _ref42.props;
      return {
        className: classNames('absolute cursor-pointer top-0 left-0 right-0 bottom-0 border border-transparent', 'transition-colors duration-200 rounded-2xl', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', "before:absolute before:content-'' before:top-1/2 before:bg-white before:dark:bg-gray-900 before:w-5 before:h-5 before:left-1 before:-mt-2.5 before:rounded-full before:transition-duration-200", {
          'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 hover:dark:bg-gray-700 ': !props.checked,
          'bg-blue-500 before:transform before:translate-x-5': props.checked
        })
      };
    }
  },
  cascadeselect: {
    root: function root(_ref43) {
      var props = _ref43.props;
      return {
        className: classNames('inline-flex cursor-pointer select-none relative', 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition duration-200 ease-in-out rounded-lg', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    label: {
      className: classNames('block whitespace-nowrap overflow-hidden flex flex-1 w-1 text-overflow-ellipsis cursor-pointer', 'bg-transparent border-0 p-3 text-gray-700 dark:text-white/80', 'appearance-none rounded-md')
    },
    dropdownButton: {
      className: classNames('flex items-center justify-center shrink-0', 'bg-transparent text-gray-600 dark:text-white/80 w-[3rem] rounded-tr-6 rounded-br-6')
    },
    panel: 'py-3 bg-white dark:bg-gray-900 border-0 shadow-md',
    list: 'm-0 sm:p-0 list-none',
    sublistWrapper: {
      className: classNames('block absolute left-full top-0', 'min-w-full z-10')
    },
    sublist: {
      className: classNames('py-3 bg-white dark:bg-gray-900 border-0 shadow-md')
    },
    item: function item(_ref44) {
      var state = _ref44.state;
      return {
        className: classNames('cursor-pointer font-normal whitespace-nowrap', 'm-0 border-0 bg-transparent transition-shadow rounded-none', {
          'text-gray-700 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:text-white/80 dark:hover:bg-gray-800/80': !state.selected,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': state.selected
        })
      };
    },
    content: {
      className: classNames('flex items-center overflow-hidden relative', 'py-3 px-5')
    },
    optionGroupIcon: 'ml-auto',
    transition: TRANSITIONS.overlay
  },
  inputmask: {
    root: 'font-sans text-base text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 py-3 px-3 border border-gray-300 dark:border-blue-900/40 hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)] transition duration-200 ease-in-out appearance-none rounded-md'
  },
  rating: {
    root: function root(_ref45) {
      var props = _ref45.props;
      return {
        className: classNames('relative flex items-center', 'gap-2', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    cancelItem: function cancelItem(_ref46) {
      _ref46.context;
      return {
        className: classNames('inline-flex items-center cursor-pointer'

        // {
        //     'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]': context.focused
        // }
        )
      };
    },

    cancelIcon: {
      className: classNames('text-red-500', 'w-5 h-5', 'transition duration-200 ease-in')
    },
    item: function item(_ref47) {
      var props = _ref47.props,
        context = _ref47.context;
      return {
        className: classNames('inline-flex items-center', {
          'cursor-pointer': !props.readOnly,
          'cursor-default': props.readOnly
        }, {
          'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]': context.active
        })
      };
    },
    offIcon: {
      className: classNames('text-gray-700 hover:text-blue-400', 'w-5 h-5', 'transition duration-200 ease-in')
    },
    onIcon: {
      className: classNames('text-blue-500', 'w-5 h-5', 'transition duration-200 ease-in')
    }
  },
  selectbutton: {
    root: function root(_ref48) {
      var props = _ref48.props;
      return {
        className: classNames({
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    button: function button(_ref49) {
      var context = _ref49.context;
      return {
        className: classNames('inline-flex cursor-pointer select-none items-center align-bottom text-center overflow-hidden relative', 'px-4 py-3', 'transition duration-200 border border-r-0', 'first:rounded-l-md first:rounded-tr-none first:rounded-br-none last:border-r last:rounded-tl-none last:rounded-bl-none last:rounded-r-md', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-gray-300 dark:border-blue-900/40 hover:bg-gray-50 dark:hover:bg-gray-800/80 ': !context.selected,
          'bg-blue-500 border-blue-500 text-white hover:bg-blue-600': context.selected,
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled
        })
      };
    },
    label: 'font-bold'
  },
  slider: {
    root: function root(_ref50) {
      var props = _ref50.props;
      return {
        className: classNames('relative', 'bg-gray-100 dark:bg-gray-800 border-0 rounded-6', {
          'h-1 w-56': props.orientation == 'horizontal',
          'w-1 h-56': props.orientation == 'vertical'
        }, {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    range: function range(_ref51) {
      var props = _ref51.props;
      return {
        className: classNames('bg-blue-500', 'block absolute', {
          'top-0 left-0 h-full': props.orientation == 'horizontal',
          'bottom-0 left-0 w-full': props.orientation == 'vertical'
        })
      };
    },
    handle: function handle(_ref52) {
      var props = _ref52.props;
      return {
        className: classNames('h-4 w-4 bg-white dark:bg-gray-600 border-2 border-blue-500 rounded-full transition duration-200', 'cursor-grab touch-action-none block', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', 'hover:bg-blue-500 hover:border hover:border-blue-500', {
          'top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]': props.orientation == 'horizontal',
          'left-[50%] mb-[-0.5715rem] ml-[-0.4715rem]': props.orientation == 'vertical'
        })
      };
    }
  },
  password: {
    root: function root(_ref53) {
      var props = _ref53.props;
      return {
        className: classNames('inline-flex relative', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    panel: 'p-5 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 shadow-md rounded-md',
    meter: 'mb-2 bg-gray-300 dark:bg-gray-700 h-3',
    meterLabel: function meterLabel(_ref54) {
      var _state$meter, _state$meter2, _state$meter3;
      var state = _ref54.state,
        props = _ref54.props;
      return {
        className: classNames('transition-width duration-1000 ease-in-out h-full', {
          'bg-red-500': ((_state$meter = state.meter) === null || _state$meter === void 0 ? void 0 : _state$meter.strength) == 'weak',
          'bg-orange-500': ((_state$meter2 = state.meter) === null || _state$meter2 === void 0 ? void 0 : _state$meter2.strength) == 'medium',
          'bg-green-500': ((_state$meter3 = state.meter) === null || _state$meter3 === void 0 ? void 0 : _state$meter3.strength) == 'strong'
        }, {
          'pr-[2.5rem] ': props.toggleMask
        })
      };
    },
    showIcon: {
      className: classNames('absolute top-1/2 -mt-2', 'right-3 text-gray-600 dark:text-white/70')
    },
    hideIcon: {
      className: classNames('absolute top-1/2 -mt-2', 'right-3 text-gray-600 dark:text-white/70')
    },
    transition: TRANSITIONS.overlay
  },
  togglebutton: {
    root: function root(_ref55) {
      var props = _ref55.props,
        state = _ref55.state;
      return {
        className: classNames('inline-flex cursor-pointer select-none items-center align-bottom text-center overflow-hidden relative', 'px-4 py-3 rounded-md text-base w-36', 'border transition duration-200 ease-in-out', {
          'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]': state.focused
        }, {
          'bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:bg-gray-800/70 hover:text-gray-700 dark:hover:text-white/80': !props.checked,
          'bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600': props.checked
        }, {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    label: 'font-bold text-center w-full',
    icon: function icon(_ref56) {
      var props = _ref56.props;
      return {
        className: classNames(' mr-2', {
          'text-gray-600 dark:text-white/70': !props.checked,
          'text-white': props.checked
        })
      };
    }
  },
  tristatecheckbox: {
    root: {
      className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6')
    },
    checkbox: function checkbox(_ref57) {
      var props = _ref57.props;
      return {
        className: classNames('flex items-center justify-center', 'border-2 w-6 h-6 rounded-lg transition-colors duration-200', {
          'border-blue-500 bg-blue-500 text-white dark:border-blue-400 dark:bg-blue-400': props.value || !props.value,
          'border-gray-300 text-gray-600 bg-white dark:border-blue-900/40 dark:bg-gray-900': props.value == null
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        })
      };
    }
  },
  checkbox: {
    root: {
      className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6')
    },
    input: function input(_ref58) {
      var props = _ref58.props,
        context = _ref58.context;
      return {
        className: classNames('flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200', {
          'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900': !context.checked,
          'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400': context.checked
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        })
      };
    },
    icon: 'w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900'
  },
  radiobutton: {
    root: {
      className: classNames('relative inline-flex cursor-pointer select-none align-bottom', 'w-6 h-6')
    },
    input: function input(_ref59) {
      var props = _ref59.props;
      return {
        className: classNames('flex justify-center items-center', 'border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out', {
          'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80': !props.checked,
          'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400': props.checked
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        })
      };
    },
    icon: function icon(_ref60) {
      var props = _ref60.props;
      return {
        className: classNames('transform rounded-full', 'block w-3 h-3 transition duration-200 bg-white dark:bg-gray-900', {
          'backface-hidden scale-10 invisible': !props.checked,
          'transform scale-100 visible': props.checked
        })
      };
    }
  },
  dropdown: {
    root: function root(_ref61) {
      var props = _ref61.props;
      return {
        className: classNames('cursor-pointer inline-flex relative select-none', 'bg-white border border-gray-400 transition-colors duration-200 ease-in-out rounded-md', 'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300', 'w-full md:w-56', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    input: function input(_ref62) {
      var props = _ref62.props;
      return {
        className: classNames('cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative', 'bg-transparent border-0 text-gray-800', 'dark:text-white/80', 'p-3 transition duration-200 bg-transparent rounded appearance-none font-sans text-base', 'focus:outline-none focus:shadow-none', {
          'pr-7': props.showClear
        })
      };
    },
    trigger: {
      className: classNames('flex items-center justify-center shrink-0', 'bg-transparent text-gray-500 w-12 rounded-tr-lg rounded-br-lg')
    },
    wrapper: {
      className: 'max-h-[200px] overflow-auto bg-white text-gray-700 border-0 rounded-md shadow-lg dark:bg-gray-900 dark:text-white/80'
    },
    list: 'py-3 list-none m-0',
    item: function item(_ref63) {
      var context = _ref63.context;
      return {
        className: classNames('cursor-pointer font-normal overflow-hidden relative whitespace-nowrap', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', {
          'text-gray-700 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': !context.focused && !context.selected,
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': context.focused && !context.selected,
          'bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80': context.focused && context.selected,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': !context.focused && context.selected,
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled
        })
      };
    },
    itemGroup: {
      className: classNames('m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto')
    },
    header: {
      className: classNames('p-3 border-b border-gray-300 text-gray-700 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg', 'dark:bg-gray-800 dark:text-white/80 dark:border-blue-900/40')
    },
    filterContainer: 'relative',
    filterInput: {
      className: classNames('pr-7 -mr-7', 'w-full', 'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    filterIcon: '-mt-2 absolute top-1/2',
    clearIcon: 'text-gray-500 right-12 -mt-2 absolute top-1/2',
    transition: TRANSITIONS.overlay
  },
  calendar: {
    root: function root(_ref64) {
      var props = _ref64.props;
      return {
        className: classNames('inline-flex max-w-full relative', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    input: {
      root: function root(_ref65) {
        var parent = _ref65.parent;
        return {
          className: classNames('font-sans text-base text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none', 'hover:border-blue-500', {
            'rounded-lg': !parent.props.showIcon,
            'border-r-0 rounded-l-lg': parent.props.showIcon
          })
        };
      }
    },
    dropdownButton: {
      root: function root(_ref66) {
        var props = _ref66.props;
        return {
          className: classNames({
            'rounded-l-none': props.icon
          })
        };
      }
    },
    panel: function panel(_ref67) {
      var props = _ref67.props;
      return {
        className: classNames('bg-white dark:bg-gray-900', 'min-w-full', {
          'shadow-md border-0 absolute': !props.inline,
          'inline-block overflow-x-auto border border-gray-300 dark:border-blue-900/40 p-2 rounded-lg': props.inline
        })
      };
    },
    header: {
      className: classNames('flex items-center justify-between', 'p-2 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-semibold m-0 border-b border-gray-300 dark:border-blue-900/40 rounded-t-lg')
    },
    previousButton: {
      className: classNames('flex items-center justify-center cursor-pointer overflow-hidden relative', 'w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out', 'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ')
    },
    title: 'leading-8 mx-auto',
    monthTitle: {
      className: classNames('text-gray-700 dark:text-white/80 transition duration-200 font-semibold p-2', 'mr-2', 'hover:text-blue-500')
    },
    yearTitle: {
      className: classNames('text-gray-700 dark:text-white/80 transition duration-200 font-semibold p-2', 'hover:text-blue-500')
    },
    nextButton: {
      className: classNames('flex items-center justify-center cursor-pointer overflow-hidden relative', 'w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out', 'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ')
    },
    table: {
      className: classNames('border-collapse w-full', 'my-2')
    },
    tableHeaderCell: 'p-2',
    weekDay: 'text-gray-600 dark:text-white/70',
    day: 'p-2',
    dayLabel: function dayLabel(_ref68) {
      var context = _ref68.context;
      return {
        className: classNames('w-10 h-10 rounded-full transition-shadow duration-200 border-transparent border', 'flex items-center justify-center mx-auto overflow-hidden relative', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'opacity-60 cursor-default': context.disabled,
          'cursor-pointer': !context.disabled
        }, {
          'text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.selected && !context.disabled,
          'text-blue-700 bg-blue-100 hover:bg-blue-200': context.selected && !context.disabled
        })
      };
    },
    monthPicker: 'my-2',
    month: function month(_ref69) {
      var context = _ref69.context;
      return {
        className: classNames('w-1/3 inline-flex items-center justify-center cursor-pointer overflow-hidden relative', 'p-2 transition-shadow duration-200 rounded-lg', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.selected && !context.disabled,
          'text-blue-700 bg-blue-100 hover:bg-blue-200': context.selected && !context.disabled
        })
      };
    },
    yearPicker: {
      className: classNames('my-2')
    },
    year: function year(_ref70) {
      var context = _ref70.context;
      return {
        className: classNames('w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative', 'p-2 transition-shadow duration-200 rounded-lg', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'text-gray-600 dark:text-white/70 bg-transprent hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.selected && !context.disabled,
          'text-blue-700 bg-blue-100 hover:bg-blue-200': context.selected && !context.disabled
        })
      };
    },
    timePicker: {
      className: classNames('flex justify-center items-center', 'border-t-1 border-solid border-gray-300 p-2')
    },
    separatorContainer: 'flex items-center flex-col px-2',
    separator: 'text-xl',
    hourPicker: 'flex items-center flex-col px-2',
    minutePicker: 'flex items-center flex-col px-2',
    ampmPicker: 'flex items-center flex-col px-2',
    incrementButton: {
      className: classNames('flex items-center justify-center cursor-pointer overflow-hidden relative', 'w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out', 'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ')
    },
    decrementButton: {
      className: classNames('flex items-center justify-center cursor-pointer overflow-hidden relative', 'w-8 h-8 text-gray-600 dark:text-white/70 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out', 'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ')
    },
    groupContainer: 'flex',
    group: {
      className: classNames('flex-1', 'border-l border-gray-300 pr-0.5 pl-0.5 pt-0 pb-0', 'first:pl-0 first:border-l-0')
    },
    transition: TRANSITIONS.overlay
  },
  listbox: {
    root: {
      className: classNames('bg-white dark:bg-gray-900 border border-gray-400 dark:border-blue-900/40 transition-colors duration-200 ease-in-out rounded-md', 'w-full md:w-56')
    },
    wrapper: 'overflow-auto',
    list: 'py-3 list-none m-0',
    item: function item(_ref71) {
      var context = _ref71.context;
      return {
        className: classNames('cursor-pointer font-normal overflow-hidden relative whitespace-nowrap', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', {
          'text-gray-700 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': !context.focused && !context.selected,
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': context.focused && !context.selected,
          'bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80': context.focused && context.selected,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': !context.focused && context.selected
        })
      };
    },
    itemGroup: {
      className: classNames('m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto')
    },
    header: {
      className: classNames('p-3 border-b border-gray-300 text-gray-700 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg', 'dark:bg-gray-800 dark:text-white/80 dark:border-blue-900/40')
    },
    filterContainer: 'relative',
    filterInput: {
      root: {
        className: classNames('pr-7 -mr-7', 'w-full', 'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
      }
    },
    filterIcon: '-mt-2 absolute top-1/2'
  },
  mention: {
    root: 'relative',
    panel: 'max-h-[200px] min-w-full overflow-auto bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg',
    items: 'py-3 list-none m-0',
    item: function item(_ref72) {
      var state = _ref72.state;
      return {
        className: classNames('cursor-pointer font-normal overflow-hidden relative whitespace-nowrap m-0 p-3 border-0 transition-shadow duration-200 rounded-none dark:text-white/80 dark:hover:bg-gray-800 hover:text-gray-700 hover:bg-gray-200', {
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': state.selected
        })
      };
    },
    transition: TRANSITIONS.overlay
  },
  multiselect: {
    root: function root(_ref73) {
      var props = _ref73.props;
      return {
        className: classNames('inline-flex cursor-pointer select-none', 'bg-white dark:bg-gray-900 border border-gray-400 dark:border-blue-900/40  transition-colors duration-200 ease-in-out rounded-md', 'w-full md:w-80', {
          'opacity-60 select-none pointer-events-none cursor-default': props === null || props === void 0 ? void 0 : props.disabled
        })
      };
    },
    labelContainer: 'overflow-hidden flex flex-auto cursor-pointer',
    label: function label(_ref74) {
      var props = _ref74.props;
      return {
        className: classNames('block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis', 'text-gray-800 dark:text-white/80', 'p-3 transition duration-200', {
          '!p-3': props.display !== 'chip' && (props.value == null || props.value == undefined),
          '!py-1.5 px-3': props.display === 'chip' && props.value !== null
        })
      };
    },
    token: {
      className: classNames('py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full', 'cursor-default inline-flex items-center')
    },
    removeTokenIcon: 'ml-2',
    trigger: {
      className: classNames('flex items-center justify-center shrink-0', 'bg-transparent text-gray-600 dark:text-white/70 w-12 rounded-tr-lg rounded-br-lg')
    },
    panel: {
      className: classNames('bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg')
    },
    header: {
      className: classNames('p-3 border-b border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-800 rounded-t-lg', 'flex items-center justify-between')
    },
    headerCheckboxContainer: {
      className: classNames('inline-flex cursor-pointer select-none align-bottom relative', 'mr-2', 'w-6 h-6')
    },
    headerCheckbox: {
      root: function root(_ref75) {
        var props = _ref75.props;
        return {
          className: classNames('flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 dark:text-white/70 rounded-lg transition-colors duration-200', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
            'border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900': !(props !== null && props !== void 0 && props.checked),
            'border-blue-500 bg-blue-500': props === null || props === void 0 ? void 0 : props.checked
          })
        };
      }
    },
    headerCheckboxIcon: 'w-4 h-4 transition-all duration-200 text-white text-base',
    closeButton: {
      className: classNames('flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 dark:text-white/70 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0', 'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    closeButtonIcon: 'w-4 h-4 inline-block',
    wrapper: {
      className: classNames('max-h-[200px] overflow-auto', 'bg-white text-gray-700 border-0 rounded-md shadow-lg', 'dark:bg-gray-900 dark:text-white/80')
    },
    list: 'py-3 list-none m-0',
    item: function item(_ref76) {
      var context = _ref76.context;
      return {
        className: classNames('cursor-pointer font-normal overflow-hidden relative whitespace-nowrap', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', {
          'text-gray-700 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': !context.focused && !context.selected,
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': context.focused && !context.selected,
          'bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80': context.focused && context.selected,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': !context.focused && context.selected
        })
      };
    },
    checkboxContainer: {
      className: classNames('inline-flex cursor-pointer select-none align-bottom relative', 'mr-2', 'w-6 h-6')
    },
    checkbox: function checkbox(_ref77) {
      var context = _ref77.context;
      return {
        className: classNames('flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 dark:text-white/80 rounded-lg transition-colors duration-200', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900': !(context !== null && context !== void 0 && context.selected),
          'border-blue-500 bg-blue-500': context === null || context === void 0 ? void 0 : context.selected
        })
      };
    },
    checkboxIcon: 'w-4 h-4 transition-all duration-200 text-white text-base',
    itemGroup: {
      className: classNames('m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto')
    },
    filterContainer: 'relative',
    filterInput: {
      root: {
        className: classNames('pr-7 -mr-7', 'w-full', 'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
      }
    },
    filterIcon: '-mt-2 absolute top-1/2',
    clearIcon: 'text-gray-500 right-12 -mt-2 absolute top-1/2',
    transition: TRANSITIONS.overlay
  },
  multistatecheckbox: {
    root: {
      className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6')
    },
    checkbox: function checkbox(_ref78) {
      var props = _ref78.props;
      return {
        className: classNames('flex items-center justify-center', 'border-2 w-6 h-6 rounded-lg transition-colors duration-200', {
          'border-blue-500 bg-blue-500 text-white dark:border-blue-400 dark:bg-blue-400': props.value || !props.value,
          'border-gray-300 text-gray-600 bg-white dark:border-blue-900/40 dark:bg-gray-900': props.value == null
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        })
      };
    }
  },
  inputtextarea: {
    root: function root(_ref79) {
      var context = _ref79.context;
      return {
        className: classNames('m-0', 'font-sans text-base text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled
        })
      };
    }
  },
  treeselect: {
    root: function root(_ref80) {
      var props = _ref80.props;
      return {
        className: classNames('inline-flex cursor-pointer select-none', 'bg-white dark:bg-gray-900 border border-gray-400 dark:border-blue-900/40  transition-colors duration-200 ease-in-out rounded-md', 'w-full md:w-80', {
          'opacity-60 select-none pointer-events-none cursor-default': props === null || props === void 0 ? void 0 : props.disabled
        })
      };
    },
    labelContainer: {
      className: classNames('overflow-hidden flex flex-auto cursor-pointer')
    },
    label: {
      className: classNames('block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis', 'text-gray-800 dark:text-white/80', 'p-3 transition duration-200')
    },
    trigger: {
      className: classNames('flex items-center justify-center shrink-0', 'bg-transparent text-gray-600 dark:text-white/70 w-12 rounded-tr-lg rounded-br-lg')
    },
    panel: {
      className: classNames('bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg')
    },
    wrapper: {
      className: classNames('max-h-[200px] overflow-auto', 'bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg')
    },
    header: {
      className: 'py-3 px-5 border-b border-inherit bg-gray-50 m-0 rounded-t-lg flex items-center justify-between'
    },
    closeButton: {
      className: 'w-8 h-8 border-none bg-transparent rounded-full flex items-center justify-center shrink-0 overflow-hidden relative ml-auto transition hover:border-transparent hover:bg-gray-200 text-gray-500'
    },
    transition: TRANSITIONS.overlay
  },
  autocomplete: {
    root: function root(_ref81) {
      var props = _ref81.props;
      return {
        className: classNames('relative inline-flex', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }, {
          'w-full': props.multiple
        })
      };
    },
    container: {
      className: classNames('m-0 list-none cursor-text overflow-hidden flex items-center flex-wrap w-full', 'px-3 py-2 gap-2', 'font-sans text-base text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40  transition duration-200 ease-in-out appearance-none rounded-md', 'focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] hover:border-blue-500 focus:outline-none dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    inputToken: {
      className: classNames('py-0.375rem px-0', 'flex-1 inline-flex')
    },
    input: function input(_ref82) {
      var props = _ref82.props;
      return {
        root: {
          className: classNames('m-0', 'transition-colors duration-200 appearance-none rounded-lg', {
            'rounded-tr-none rounded-br-none': props.dropdown
          }, {
            'font-sans text-base text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)] hover:border-blue-500 focus:outline-none': !props.multiple,
            'font-sans text-base text-gray-700 dark:text-white/80 border-0 outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full': props.multiple
          })
        }
      };
    },
    token: {
      className: classNames('py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full', 'cursor-default inline-flex items-center')
    },
    dropdownButton: {
      root: 'rounded-tl-none rounded-bl-none'
    },
    panel: {
      className: classNames('bg-white text-gray-700 border-0 rounded-md shadow-lg', 'max-h-[200px] overflow-auto', 'dark:bg-gray-900 dark:text-white/80')
    },
    list: 'py-3 list-none m-0',
    item: function item(_ref83) {
      var context = _ref83.context;
      return {
        className: classNames('cursor-pointer font-normal overflow-hidden relative whitespace-nowrap', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', {
          'text-gray-700 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': !context.focused && !context.selected,
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90 hover:text-gray-700 hover:bg-gray-200 dark:text-white/80 dark:hover:bg-gray-800': context.focused && !context.selected,
          'bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80': context.focused && context.selected,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': !context.focused && context.selected
        })
      };
    },
    itemGroup: {
      className: classNames('m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto')
    },
    transition: TRANSITIONS.overlay
  },
  chips: {
    root: function root(_ref84) {
      var props = _ref84.props;
      return {
        className: classNames('flex', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    container: {
      className: classNames('m-0 py-1.5 px-3 list-none cursor-text overflow-hidden flex items-center flex-wrap', 'w-full', 'font-sans text-base text-gray-600 dark:text-white/70 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    inputToken: {
      className: classNames('py-1.5 px-0', 'flex flex-1 inline-flex')
    },
    input: {
      className: classNames('font-sans text-base text-gray-700 dark:text-white/80 p-0 m-0', 'border-0 outline-none bg-transparent shadow-none rounded-none w-full')
    },
    token: {
      className: classNames('py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full', 'cursor-default inline-flex items-center')
    },
    removeTokenIcon: 'ml-2'
  },
  colorpicker: {
    root: function root(_ref85) {
      var props = _ref85.props;
      return {
        className: classNames('inline-block', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        })
      };
    },
    input: {
      className: classNames('m-0', 'font-sans text-base text-gray-600 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 rounded-lg cursor-pointer', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', 'w-8 h-8')
    },
    panel: function panel(_ref86) {
      var props = _ref86.props;
      return {
        className: classNames('shadow-md', 'bg-gray-800 border-gray-900', {
          'relative h-48 w-52': props.inline,
          'absolute h-48 w-52': !props.inline
        })
      };
    },
    selector: 'absolute h-44 w-40 top-2 left-2',
    color: {
      className: 'h-44 w-40',
      style: {
        background: 'linear-gradient(to top, #000 0%, rgb(0 0 0 / 0) 100%), linear-gradient(to right, #fff 0%, rgb(255 255 255 / 0) 100%)'
      }
    },
    colorHandle: {
      className: classNames('rounded-full border border-solid cursor-pointer h-3 w-3 absolute  opacity-85', 'border-white')
    },
    hue: {
      className: 'h-44 w-6 absolute top-2 left-44 opacity-85',
      style: {
        background: 'linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)'
      }
    },
    hueHandle: 'border-solid border-2 cursor-pointer h-2 w-8 left-0 -ml-1 -mt-1 opacity-85 absolute',
    transition: TRANSITIONS.overlay
  },
  editor: {
    toolbar: {
      className: classNames('bg-gray-100 rounded-tr-md rounded-tl-md', 'border border-gray-300 box-border font-sans px-2 py-1')
    },
    formats: {
      className: classNames('inline-block align-middle', 'mr-4')
    },
    header: {
      className: classNames('text-gray-700 inline-block float-left text-base font-medium h-6 relative align-middle', 'w-28', 'border-0 text-gray-600')
    }
  },
  //MISC
  badge: {
    root: function root(_ref87) {
      var props = _ref87.props;
      return {
        className: classNames('rounded-full p-0 text-center inline-block', 'bg-blue-500 text-white font-bold', {
          'bg-gray-500 ': props.severity == 'secondary',
          'bg-green-500 ': props.severity == 'success',
          'bg-blue-500 ': props.severity == 'info',
          'bg-orange-500 ': props.severity == 'warning',
          'bg-purple-500 ': props.severity == 'help',
          'bg-red-500 ': props.severity == 'danger'
        }, {
          'text-xs min-w-[1.5rem] h-[1.5rem] leading-[1.5rem]': props.size == null,
          'text-lg min-w-[2.25rem] h-[2.25rem] leading-[2.25rem]': props.size == 'large',
          'text-2xl min-w-[3rem] h-[3rem] leading-[3rem]': props.size == 'xlarge'
        })
      };
    }
  },
  avatar: {
    root: function root(_ref88) {
      var props = _ref88.props,
        state = _ref88.state;
      return {
        className: classNames('flex items-center justify-center', 'bg-gray-300 dark:bg-gray-800', {
          'rounded-lg': props.shape == 'square',
          'rounded-full': props.shape == 'circle'
        }, {
          'text-base h-8 w-8': props.size == null || props.size == 'normal',
          'w-12 h-12 text-xl': props.size == 'large',
          'w-16 h-16 text-2xl': props.size == 'xlarge'
        }, {
          '-ml-4 border-2 border-white dark:border-gray-900': state.nested
        })
      };
    },
    image: 'h-full w-full'
  },
  avatargroup: {
    root: 'flex items-center'
  },
  chip: {
    root: {
      className: classNames('inline-flex items-center', 'bg-gray-200 text-gray-800 rounded-[16px] px-3 dark:text-white/80 dark:bg-gray-900')
    },
    label: 'leading-6 mt-1.5 mb-1.5',
    icon: 'leading-6 mr-2',
    image: {
      className: classNames('w-9 h-9 ml-[-0.75rem] mr-2', 'rounded-full')
    },
    removeIcon: {
      className: classNames('ml-2 rounded-md transition duration-200 ease-in-out', 'cursor-pointer leading-6')
    }
  },
  progressbar: {
    root: {
      className: classNames('overflow-hidden relative', 'border-0 h-6 bg-gray-200 rounded-md dark:bg-gray-800')
    },
    value: function value(_ref89) {
      var props = _ref89.props;
      return {
        className: classNames('border-0 m-0 bg-blue-500', {
          'transition-width duration-1000 ease-in-out absolute items-center border-0 flex h-full justify-center overflow-hidden w-0': props.mode !== 'indeterminate',
          'progressbar-value-animate before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-inherit after:absolute after:top-0 after:left-0 after:bottom-0 after:bg-inherit after:delay-1000': props.mode == 'indeterminate'
        })
      };
    },
    label: {
      className: classNames('inline-flex', 'text-white leading-6')
    }
  },
  progressspinner: {
    root: {
      className: classNames('relative mx-auto w-28 h-28 inline-block', 'before:block before:pt-full')
    },
    spinner: 'absolute top-0 bottom-0 left-0 right-0 m-auto w-full h-full transform origin-center animate-spin',
    circle: 'text-red-500 progress-spinner-circle'
  },
  skeleton: {
    root: function root(_ref90) {
      var props = _ref90.props;
      return {
        className: classNames('overflow-hidden', '!mb-2', 'bg-gray-300 dark:bg-gray-800', 'after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-blue-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse', {
          'rounded-md': props.shape !== 'circle',
          'rounded-full': props.shape == 'circle'
        })
      };
    }
  },
  tag: {
    root: function root(_ref91) {
      var props = _ref91.props;
      return {
        className: classNames('inline-flex items-center justify-center', 'bg-blue-500 text-white text-xs font-semibold px-2 py-1 ', {
          'bg-gray-500 ': props.severity == 'secondary',
          'bg-green-500 ': props.severity == 'success',
          'bg-blue-500 ': props.severity == 'info',
          'bg-orange-500 ': props.severity == 'warning',
          'bg-purple-500 ': props.severity == 'help',
          'bg-red-500 ': props.severity == 'danger'
        }, {
          'rounded-md': !props.rounded,
          'rounded-full': props.rounded
        })
      };
    },
    value: 'leading-6',
    icon: 'mr-1 text-sm'
  },
  inplace: {
    display: {
      className: classNames('p-3 rounded-md transition duration-200 text-gray-700 dark:text-white/80', 'inline cursor-pointer', 'hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800/80 dark:hover:text-white/80')
    }
  },
  scrolltop: {
    root: function root(_ref92) {
      var props = _ref92.props;
      return {
        className: classNames('fixed bottom-20 right-20 flex items-center justify-center', 'ml-auto', {
          '!bg-blue-500 hover:bg-blue-600 text-white rounded-md h-8 w-8': props.target == 'parent',
          '!bg-gray-700 hover:bg-gray-800 h-12 w-12 rounded-full text-white': props.target !== 'parent'
        })
      };
    },
    transition: {
      timeout: 150,
      classNames: {
        enter: 'opacity-0',
        enterActive: '!opacity-100 transition-opacity duration-150',
        exit: 'opacity-100',
        exitActive: '!opacity-0 transition-opacity duration-150'
      }
    }
  },
  terminal: {
    root: {
      className: classNames('border border-gray-300 p-5', 'bg-gray-900 text-white dark:border-blue-900/40 ', 'h-72 overflow-auto')
    },
    container: 'flex items-center',
    prompt: 'text-yellow-400',
    commandText: 'flex-1 shrink grow-0 border-0 bg-transparent text-inherit p-0 outline-none'
  },
  blockui: {
    root: 'relative',
    mask: 'bg-black/40'
  },
  ripple: {
    root: {
      className: 'block absolute bg-white/50 rounded-full pointer-events-none',
      style: {
        transform: 'scale(0)'
      }
    }
  },
  //MENU
  breadcrumb: {
    root: {
      className: classNames('overflow-x-auto', 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 rounded-md p-4')
    },
    menu: 'm-0 p-0 list-none flex items-center flex-nowrap',
    action: {
      className: classNames('text-decoration-none flex items-center', 'transition-shadow duration-200 rounded-md text-gray-600 dark:text-white/70', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    icon: 'text-gray-600 dark:text-white/70',
    separator: {
      className: classNames('mx-2 text-gray-600 dark:text-white/70', 'flex items-center')
    }
  },
  contextmenu: {
    root: 'py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-none shadow-md rounded-lg w-52',
    menu: {
      className: classNames('m-0 p-0 list-none', 'outline-none')
    },
    menuitem: 'relative',
    content: function content(_ref93) {
      var context = _ref93.context;
      return {
        className: classNames('transition-shadow duration-200 rounded-none', 'hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80',
        // Hover
        {
          'text-gray-700': !context.focused && !context.active,
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90': context.focused && !context.active,
          'bg-blue-500 text-blue-700 dark:bg-blue-400 dark:text-white/80': context.focused && context.active,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': !context.focused && context.active
        })
      };
    },
    action: {
      className: classNames('cursor-pointer flex items-center no-underline overflow-hidden relative', 'text-gray-700 dark:text-white/80 py-3 px-5 select-none')
    },
    icon: 'text-gray-600 dark:text-white/70 mr-2',
    label: 'text-gray-600 dark:text-white/70',
    transition: {
      timeout: {
        enter: 250
      },
      classNames: {
        enter: 'opacity-0',
        enterActive: '!opacity-100 transition-opacity duration-250'
      }
    }
  },
  dock: {
    root: function root(_ref94) {
      var props = _ref94.props;
      return {
        className: classNames('absolute z-1 flex justify-center items-center pointer-events-none', {
          'left-0 bottom-0 w-full': props.position == 'bottom',
          'left-0 top-0 w-full': props.position == 'top',
          'left-0 top-0 h-full': props.position == 'left',
          'right-0 top-0 h-full': props.position == 'right'
        })
      };
    },
    container: {
      className: classNames('flex pointer-events-auto', 'bg-white/10 border-white/20 p-2 border rounded-md')
    },
    menu: function menu(_ref95) {
      var props = _ref95.props;
      return {
        className: classNames('m-0 p-0 list-none flex items-center justify-center', 'outline-none', {
          'flex-col': props.position == 'left' || props.position == 'right'
        })
      };
    },
    menuitem: function menuitem(_ref96) {
      var props = _ref96.props,
        context = _ref96.context,
        state = _ref96.state;
      return {
        className: classNames('p-2 rounded-md', 'transition-all duration-200 ease-cubic-bezier-will-change-transform transform ', {
          'origin-bottom hover:mx-6': props.position == 'bottom',
          'origin-top hover:mx-6': props.position == 'top',
          'origin-left hover:my-6': props.position == 'left',
          'origin-right hover:my-6': props.position == 'right'
        }, {
          'hover:scale-150': state.currentIndex === context.index,
          'scale-125': state.currentIndex - 1 === context.index || state.currentIndex + 1 === context.index,
          'scale-110': state.currentIndex - 2 === context.index || state.currentIndex + 2 === context.index
        })
      };
    },
    action: {
      className: classNames('flex flex-col items-center justify-center relative overflow-hidden cursor-default', 'w-16 h-16')
    }
  },
  menu: {
    root: 'py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40 rounded-md w-48',
    menu: {
      className: classNames('m-0 p-0 list-none', 'outline-none')
    },
    content: function content(_ref97) {
      var state = _ref97.state;
      return {
        className: classNames('text-gray-700 dark:text-white/80 transition-shadow duration-200 rounded-none', 'hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80',
        // Hover
        {
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90': state.focused
        })
      };
    },
    action: {
      className: classNames('text-gray-700 dark:text-white/80 py-3 px-5 select-none', 'cursor-pointer flex items-center no-underline overflow-hidden relative')
    },
    menuitem: {
      className: classNames('hover:bg-gray-200')
    },
    icon: 'text-gray-600 dark:text-white/70 mr-2',
    submenuHeader: {
      className: classNames('m-0 p-3 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-bold rounded-tl-none rounded-tr-none')
    },
    separator: 'border-t border-gray-300 dark:border-blue-900/40 my-1',
    transition: TRANSITIONS.overlay
  },
  menubar: {
    root: {
      className: classNames('p-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 rounded-md', 'flex items-center relative')
    },
    menu: function menu(_ref98) {
      var state = _ref98.state;
      return {
        className: classNames('m-0 sm:p-0 list-none', 'outline-none', 'sm:flex items-center flex-wrap sm:flex-row sm:top-auto sm:left-auto sm:relative sm:bg-transparent sm:shadow-none sm:w-auto', 'flex-col top-full left-0', 'absolute py-1 bg-white dark:bg-gray-900 border-0 shadow-md w-full', {
          'hidden ': !(state !== null && state !== void 0 && state.mobileActive),
          'flex ': state === null || state === void 0 ? void 0 : state.mobileActive
        })
      };
    },
    menuitem: function menuitem(_ref99) {
      var props = _ref99.props,
        context = _ref99.context;
      return {
        className: classNames('sm:relative sm:w-auto w-full static', 'transition-shadow duration-200', {
          'rounded-md': props.root
        }, {
          'text-gray-700 dark:text-white/80': !context.active,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': context.active
        }, {
          'hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.active,
          'hover:bg-blue-200 dark:hover:bg-blue-500': context.active
        })
      };
    },
    action: function action(_ref100) {
      var context = _ref100.context;
      return {
        className: classNames('select-none', 'cursor-pointer flex items-center no-underline overflow-hidden relative', 'py-3 px-5 select-none', {
          'pl-9 sm:pl-5': context.level === 1,
          'pl-14 sm:pl-5': context.level === 2
        })
      };
    },
    icon: 'mr-2',
    submenuIcon: function submenuIcon(_ref101) {
      var props = _ref101.props;
      return {
        className: classNames({
          'ml-auto sm:ml-2': props.root,
          'ml-auto': !props.root
        })
      };
    },
    submenu: function submenu(_ref102) {
      var props = _ref102.props;
      return {
        className: classNames('py-1 bg-white dark:bg-gray-900 border-0  sm:shadow-md sm:w-48', 'w-full static shadow-none', 'sm:absolute z-10', 'm-0 list-none', {
          'sm:absolute sm:left-full sm:top-0': !props.root
        })
      };
    },
    separator: 'border-t border-gray-300 dark:border-blue-900/40 my-1',
    button: {
      className: classNames('flex sm:hidden w-8 h-8 rounded-full text-gray-600 dark:text-white/80 transition duration-200 ease-in-out', 'cursor-pointer flex items-center justify-center no-underline', 'hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80 ', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    end: 'ml-auto self-auto'
  },
  megamenu: {
    root: function root(_ref103) {
      var props = _ref103.props;
      return {
        className: classNames('bg-gray-100 dark:bg-gray-900  border border-gray-300 dark:border-blue-900/40  rounded-md', 'flex relative', {
          'p-2 items-center': props.orientation == 'horizontal',
          'flex-col w-48 p-0 py-1': props.orientation !== 'horizontal'
        })
      };
    },
    menu: function menu(_ref104) {
      var props = _ref104.props,
        state = _ref104.state;
      return {
        className: classNames('m-0 sm:p-0 list-none', 'outline-none', {
          hidden: props.orientation !== 'vertical' && !state.mobileActive
        }, {
          'md:flex items-center flex-wrap flex-row top-auto left-auto relative bg-transparent shadow-none w-auto': !state.mobileActive
        }, {
          'flex flex-col bg-white absolute w-full left-0 z-10 top-full': state.mobileActive
        })
      };
    },
    menuitem: function menuitem(_ref105) {
      var props = _ref105.props,
        context = _ref105.context;
      return {
        className: classNames('transition-shadow duration-200', {
          'rounded-md': props.orientation == 'horizontal'
        }, {
          'text-gray-700 dark:text-white/80': !context.active,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': context.active
        }, {
          'w-auto': props.orientation === 'horizontal',
          'w-full': props.orientation !== 'horizontal'
        }, {
          'hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.active,
          'hover:bg-blue-200 dark:hover:bg-blue-500': context.active
        })
      };
    },
    menuButton: function menuButton(_ref106) {
      var props = _ref106.props;
      return {
        className: classNames({
          'flex md:hidden': props.orientation === 'horizontal'
        }, {
          hidden: props.orientation === 'vertical'
        }, 'no-underline w-8 h-8 items-center justify-center rounded-full transition hover:bg-gray-200 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
      };
    },
    headerAction: {
      className: classNames('select-none', 'cursor-pointer flex items-center no-underline overflow-hidden relative', 'py-3 px-5 select-none')
    },
    action: {
      className: classNames('select-none', 'cursor-pointer flex items-center no-underline overflow-hidden relative', 'py-3 px-5 select-none')
    },
    icon: {
      className: 'mr-2'
    },
    submenuItem: {
      className: classNames('text-gray-700 hover:bg-gray-200')
    },
    submenuIcon: function submenuIcon(_ref107) {
      var props = _ref107.props;
      return {
        className: classNames({
          'ml-2': props.orientation === 'horizontal',
          'ml-auto': props.orientation !== 'horizontal'
        })
      };
    },
    panel: function panel(_ref108) {
      var props = _ref108.props;
      return {
        className: classNames('py-1 bg-white dark:bg-gray-900 border-0 shadow-md w-auto', 'absolute z-10', {
          'left-full top-0': props.orientation !== 'horizontal'
        })
      };
    },
    grid: 'flex',
    column: 'w-1/2',
    submenu: {
      className: classNames('m-0 list-none', 'py-1 w-48')
    },
    submenuHeader: {
      className: classNames('m-0 py-3 px-5 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-semibold rounded-tr-md rounded-tl-md')
    }
  },
  panelmenu: {
    root: 'w-full md:w-[25rem]',
    panel: {
      className: classNames('mb-1')
    },
    header: {
      className: classNames('outline-none', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', 'border border-solid border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-900 rounded-md transition-shadow duration-200', 'hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-700 dark:hover:text-white/80' // Focus
      )
    },

    headerAction: {
      className: classNames('flex items-center select-none cursor-pointer relative no-underline', 'text-gray-700 dark:text-white/80 p-5 font-bold')
    },
    headerSubmenuIcon: {
      className: classNames('mr-2')
    },
    headerIcon: {
      className: classNames('mr-2')
    },
    menuContent: {
      className: classNames('py-1 border border-t-0 border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 rounded-t-none rounded-br-md rounded-bl-md')
    },
    menu: {
      className: classNames('outline-none', 'm-0 p-0 list-none')
    },
    menuitem: function menuitem(_ref109) {
      var context = _ref109.context;
      return {
        className: classNames('text-gray-700 dark:text-white/80 transition-shadow duration-200 border-none rounded-none', {
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90': context.focused
        })
      };
    },
    action: {
      className: classNames('text-gray-700 dark:text-white/80 py-3 px-5 select-none', 'flex items-center cursor-pointer no-underline relative overflow-hidden', 'hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-700 dark:hover:text-white/80' // Hover
      )
    },

    icon: {
      className: classNames('mr-2')
    },
    submenu: {
      className: classNames('p-0 pl-4 m-0 list-none')
    },
    submenuIcon: {
      className: classNames('mr-2')
    },
    transition: TRANSITIONS.toggleable
  },
  steps: {
    root: 'relative',
    menu: 'p-0 m-0 list-none flex',
    menuitem: {
      className: classNames('relative flex justify-center flex-1 overflow-hidden', 'before:border-t before:border-gray-300 before:dark:border-blue-900/40 before:w-full before:absolute before:top-1/4 before:left-0 before:transform before:-translate-y-1/2')
    },
    action: {
      className: classNames('inline-flex flex-col items-center overflow-hidden', 'transition-shadow rounded-md bg-white dark:bg-transparent', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    step: {
      className: classNames('flex items-center justify-center', 'text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900 w-[2rem] h-[2rem] leading-2rem text-sm z-10 rounded-full')
    },
    label: {
      className: classNames('block', 'whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full', 'mt-2 text-gray-500 dark:text-white/60')
    }
  },
  tabmenu: {
    root: 'overflow-x-auto',
    menu: {
      className: classNames('flex m-0 p-0 list-none flex-nowrap', 'bg-white border-solid border-gray-300 border-b-2', 'outline-none no-underline text-base list-none')
    },
    menuitem: 'mr-0',
    action: function action(_ref110) {
      var context = _ref110.context,
        state = _ref110.state;
      return {
        className: classNames('cursor-pointer select-none flex items-center relative no-underline overflow-hidden', 'border-b-2 p-5 font-bold rounded-t-lg ', 'focus:outline-none focus:outline-offset-0 focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'border-gray-300 bg-white text-gray-700 hover:bg-white hover:border-gray-400 hover:text-gray-600 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 dark:hover:bg-gray-800/80': state.activeIndex !== context.index,
          // Condition-based hover styles.
          'bg-white border-blue-500 text-blue-500 dark:bg-gray-900 dark:border-blue-300 dark:text-blue-300': state.activeIndex === context.index // Condition-based active styles.
        }),

        style: {
          top: '2px'
        }
      };
    },
    icon: 'mr-2'
  },
  slidemenu: {
    root: {
      className: classNames('py-1 bg-white border border-gray-300 rounded-lg w-[12.5rem]', 'dark:border-blue-900/40 dark:bg-gray-900')
    },
    content: 'relative overflow-x-hidden overflow-y-auto h-full',
    menu: 'outline-none m-0 p-0 list-none absolute top-0 block',
    menuitem: function menuitem(_ref111) {
      var context = _ref111.context;
      return {
        className: classNames({
          relative: !context.active,
          "static": context.active
        })
      };
    },
    action: function action(_ref112) {
      var context = _ref112.context;
      return {
        className: classNames('py-3 px-5 select-none', 'flex items-center cursor-pointer no-underline relative overflow-hidden', {
          'text-gray-700 dark:text-white/80 hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.active,
          'text-blue-600 bg-blue-100': context.active
        })
      };
    },
    previous: function previous(_ref113) {
      var state = _ref113.state;
      return {
        className: classNames('py-3 px-5 cursor-pointer bottom-0 w-full text-gray-700 dark:text-white/80', {
          hidden: state.level === 0
        })
      };
    },
    icon: 'mr-2',
    submenuIcon: 'ml-auto',
    separator: 'border-t border-gray-300 my-1 dark:border-blue-900/40',
    submenu: {
      className: classNames('py-1 bg-white dark:bg-gray-900 border-0 shadow-md min-w-full', 'absolute z-10', 'left-full top-0')
    },
    transition: TRANSITIONS.overlay
  },
  tieredmenu: {
    root: {
      className: classNames('py-1 bg-white border border-gray-300 rounded-lg w-[12.5rem]', 'dark:border-blue-900/40 dark:bg-gray-900')
    },
    menu: {
      className: classNames('outline-none', 'm-0 p-0 list-none')
    },
    menuitem: 'relative',
    content: function content(_ref114) {
      var context = _ref114.context;
      return {
        className: classNames('transition-shadow duration-200 border-none rounded-none', 'hover:bg-gray-200 hover:text-gray-700 dark:hover:text-white/80 dark:hover:bg-gray-800/80',
        //Hover
        {
          'text-gray-700': !context.focused && !context.active,
          'bg-gray-300 text-gray-700 dark:text-white/80 dark:bg-gray-800/90': context.focused && !context.active,
          'bg-blue-100 text-blue-700 dark:bg-blue-400 dark:text-white/80': context.focused && context.active,
          'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80': !context.focused && context.active
        })
      };
    },
    action: function action(_ref115) {
      var context = _ref115.context;
      return {
        className: classNames('py-3 px-5 select-none', 'flex items-center cursor-pointer no-underline relative overflow-hidden', {
          'text-gray-700 dark:text-white/80 hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.active,
          'text-blue-600 bg-blue-100': context.active
        })
      };
    },
    icon: 'mr-2',
    submenuIcon: 'ml-auto',
    separator: 'border-t border-gray-300 my-1 dark:border-blue-900/40',
    submenu: {
      className: classNames('py-1 bg-white dark:bg-gray-900 border-0 shadow-md min-w-full', 'absolute z-10', 'left-full top-0')
    },
    transition: TRANSITIONS.overlay
  },
  metergroup: {
    root: function root(_ref116) {
      var props = _ref116.props;
      return {
        className: classNames('flex gap-4', {
          'flex-col': props.orientation == 'horizontal',
          'flex-row': props.orientation == 'vertical'
        })
      };
    },
    metercontainer: function metercontainer(_ref117) {
      var props = _ref117.props;
      return {
        className: classNames('flex', {
          'flex-col': props.orientation === 'vertical'
        }, {
          'w-2 h-full': props.orientation === 'vertical'
        }, {
          'h-2': props.orientation === 'horizontal'
        }, 'bg-gray-200 dark:bg-gray-700', 'rounded-lg')
      };
    },
    meter: function meter(_ref118) {
      var props = _ref118.props;
      return {
        className: classNames('border-0', {
          'first:rounded-l-lg last:rounded-r-lg': props.orientation === 'horizontal'
        }, {
          'first:rounded-t-lg last:rounded-b-lg': props.orientation === 'vertical'
        }, 'bg-primary-500 dark:bg-primary-400')
      };
    },
    labellist: function labellist(_ref119) {
      var props = _ref119.props;
      return {
        className: classNames('flex flex-wrap', {
          'gap-4': props.labelOrientation === 'horizontal'
        }, {
          'gap-2': props.labelOrientation === 'vertical'
        }, {
          'flex-col': props.labelOrientation === 'vertical'
        }, {
          'align-end': props.labelOrientation === 'horizontal' && props.labelPosition === 'end',
          'align-start': props.labelOrientation === 'horizontal' && props.labelPosition === 'start'
        }, {
          'justify-end': props.labelOrientation === 'vertical' && props.labelPosition === 'end',
          'justify-start': props.labelOrientation === 'vertical' && props.labelPosition === 'start'
        }, 'm-0 p-0 list-none')
      };
    },
    labellistitem: {
      className: 'inline-flex items-center gap-2'
    },
    labellisttype: {
      className: 'inline-flex bg-primary-500 dark:bg-primary-400 w-2 h-2 rounded-full'
    }
  },
  //MEDIA
  image: {
    root: 'relative inline-block',
    button: {
      className: classNames('absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300', 'bg-transparent text-gray-100', 'hover:opacity-100 hover:cursor-pointer hover:bg-black hover:bg-opacity-50' //Hover
      )
    },

    mask: {
      className: classNames('fixed top-0 left-0 w-full h-full', 'flex items-center justify-center', 'bg-black bg-opacity-90')
    },
    toolbar: {
      className: classNames('absolute top-0 right-0 z-10 flex', 'p-4')
    },
    rotateRightButton: {
      className: classNames('flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    rotateRightIcon: 'w-6 h-6',
    rotateLeftButton: {
      className: classNames('flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    rotateLeftIcon: 'w-6 h-6',
    zoomOutButton: {
      className: classNames('flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    zoomOutIcon: 'w-6 h-6',
    zoomInButton: {
      className: classNames('flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    zoomInIcon: 'w-6 h-6',
    closeButton: {
      className: classNames('flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    closeIcon: 'w-6 h-6',
    transition: {
      timeout: 150,
      classNames: {
        enter: 'opacity-0 scale-75',
        enterActive: '!opacity-100 !scale-100 transition-all duration-150 ease-in-out',
        exit: 'opacity-100 scale-100',
        exitActive: '!opacity-0 !scale-75 transition-all duration-150 ease-in'
      }
    }
  },
  galleria: {
    root: 'flex flex-col',
    content: 'flex flex-col',
    itemWrapper: 'flex flex-col relative',
    itemContainer: 'relative flex h-full',
    item: 'flex justify-center items-center h-full w-full',
    thumbnailWrapper: 'flex flex-col overflow-auto shrink-0',
    thumbnailContainer: {
      className: classNames('flex flex-row', 'bg-black/90 p-4')
    },
    previousThumbnailButton: {
      className: classNames('self-center flex shrink-0 justify-center items-center overflow-hidden relative', 'm-2 bg-transparent text-white w-8 h-8 transition duration-200 ease-in-out rounded-full', 'hover:bg-white/10 hover:text-white', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    thumbnailItemsContainer: 'overflow-hidden w-full',
    thumbnailItems: 'flex',
    thumbnailItem: {
      className: classNames('overflow-auto flex items-center justify-center cursor-pointer opacity-50', 'flex-1 grow-0 shrink-0 w-20', 'hover:opacity-100 hover:transition-opacity hover:duration-300')
    },
    nextThumbnailButton: {
      className: classNames('self-center flex shrink-0 justify-center items-center overflow-hidden relative', 'm-2 bg-transparent text-white w-8 h-8 transition duration-200 ease-in-out rounded-full', 'hover:bg-white/10 hover:text-white', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    indicators: {
      className: classNames('flex items-center justify-center', 'p-4')
    },
    indicator: 'mr-2',
    indicatorbutton: function indicatorbutton(_ref120) {
      var context = _ref120.context;
      return {
        className: classNames('w-4 h-4 transition duration-200 rounded-full', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600': !context.highlighted,
          'bg-blue-500 hover:bg-blue-600': context.highlighted
        })
      };
    },
    mask: function mask(_ref121) {
      var state = _ref121.state;
      return {
        className: classNames({
          'fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90': state.visible
        })
      };
    },
    closeButton: {
      className: classNames('absolute top-0 right-0 flex justify-center items-center overflow-hidden m-2', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    closeIcon: 'w-6 h-6',
    previousItemButton: {
      className: classNames('inline-flex justify-center items-center overflow-hidden', 'bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md mx-2', 'fixed top-1/2 mt-[-0.5rem]', 'left-0', 'hover:bg-white/10 hover:text-white', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    nextItemButton: {
      className: classNames('inline-flex justify-center items-center overflow-hidden', 'bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md mx-2', 'fixed top-1/2 mt-[-0.5rem]', 'right-0', 'hover:bg-white/10 hover:text-white', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]')
    },
    caption: {
      className: classNames('absolute bottom-0 left-0 w-full', 'bg-black/50 text-white p-4')
    },
    transition: {
      timeout: 150,
      classNames: {
        enter: 'opacity-0 scale-75',
        enterActive: '!opacity-100 !scale-100 transition-all duration-150 ease-in-out',
        exit: 'opacity-100 scale-100',
        exitActive: '!opacity-0 !scale-75 transition-all duration-150 ease-in'
      }
    }
  },
  carousel: {
    root: 'flex flex-col',
    content: 'flex flex-col overflow-auto',
    container: function container(_ref122) {
      var props = _ref122.props;
      return {
        className: classNames('flex', {
          'flex-row': props.orientation !== 'vertical',
          'flex-col': props.orientation == 'vertical'
        })
      };
    },
    previousButton: {
      className: classNames('flex justify-center items-center self-center overflow-hidden relative shrink-0 grow-0', 'w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mx-2')
    },
    itemsContent: 'overflow-hidden w-full',
    itemsContainer: function itemsContainer(_ref123) {
      var props = _ref123.props;
      return {
        className: classNames('flex ', {
          'flex-row': props.orientation !== 'vertical',
          'flex-col h-full': props.orientation == 'vertical'
        })
      };
    },
    item: function item(_ref124) {
      var props = _ref124.props;
      return {
        className: classNames('flex shrink-0 grow', {
          'w-1/3': props.orientation !== 'vertical',
          'w-full': props.orientation == 'vertical'
        })
      };
    },
    indicators: {
      className: classNames('flex flex-row justify-center flex-wrap')
    },
    indicator: 'mr-2 mb-2',
    indicatorButton: function indicatorButton(_ref125) {
      var context = _ref125.context;
      return {
        className: classNames('w-8 h-2 transition duration-200 rounded-0', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'bg-blue-500 hover:bg-blue-600': context.active,
          'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600': !context.active
        })
      };
    }
  },
  tree: {
    root: function root(_ref126) {
      var _props$__parentMetada;
      var props = _ref126.props;
      return {
        className: classNames('max-w-[30rem] md:w-full', 'bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 p-5', {
          'border border-solid border-gray-300 dark:border-blue-900/40 rounded-md': ((_props$__parentMetada = props.__parentMetadata) === null || _props$__parentMetada === void 0 ? void 0 : _props$__parentMetada.parent.props.__TYPE) !== 'TreeSelect'
        })
      };
    },
    wrapper: 'overflow-auto',
    container: 'm-0 p-0 list-none overflow-auto',
    node: 'p-1 outline-none',
    content: function content(_ref127) {
      var context = _ref127.context,
        props = _ref127.props;
      return {
        className: classNames('flex items-center', 'rounded-lg transition-shadow duration-200 p-2', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'bg-blue-50 text-blue-600': context.selected
        }, {
          'cursor-pointer select-none': props.selectionMode == 'single' || props.selectionMode == 'multiple'
        })
      };
    },
    toggler: function toggler(_ref128) {
      var context = _ref128.context;
      return {
        className: classNames('cursor-pointer select-none inline-flex items-center justify-center overflow-hidden relative shrink-0', 'mr-2 w-8 h-8 border-0 bg-transparent rounded-full transition duration-200', 'hover:border-transparent focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'text-gray-500 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-800 dark:hover:text-white/80': !context.selected,
          'text-blue-600 hover:bg-white/30': context.selected
        }, {
          invisible: context.isLeaf
        })
      };
    },
    checkboxContainer: 'mr-2',
    checkbox: function checkbox(_ref129) {
      var context = _ref129.context,
        props = _ref129.props;
      return {
        className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6', 'flex items-center justify-center', 'border-2 w-6 h-6 rounded-lg transition-colors duration-200 text-white text-base dark:text-gray-900', {
          'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900': !context.checked,
          'border-blue-500 text-white bg-blue-500 dark:border-blue-400 dark:bg-blue-400': context.checked
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        })
      };
    },
    nodeIcon: 'mr-2 text-gray-600 dark:text-white/70',
    subgroup: {
      className: classNames('m-0 list-none', 'p-0 pl-4')
    },
    filterContainer: {
      className: classNames('mb-2', 'relative block w-full')
    },
    input: {
      className: classNames('m-0 p-3 text-base w-full pr-7', 'font-sans text-gray-600 dark:text-white/70 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]')
    },
    searchIcon: 'absolute top-1/2 -mt-2 right-3 text-gray-600 dark:hover:text-white/70'
  },
  // DATA
  timeline: {
    root: function root(_ref130) {
      var props = _ref130.props;
      return {
        className: classNames('flex grow', {
          'flex-col': props.layout === 'vertical',
          'flex-row flex-1': props.layout === 'horizontal'
        })
      };
    },
    event: function event(_ref131) {
      var props = _ref131.props,
        context = _ref131.context;
      return {
        className: classNames('flex relative min-h-[70px]', {
          'flex-row-reverse': props.align === 'right' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1,
          'flex-col flex-1': props.layout === 'horizontal',
          'flex-col-reverse ': props.align === 'bottom' || props.layout === 'horizontal' && props.align === 'alternate' && context.index % 2 === 1
        })
      };
    },
    opposite: function opposite(_ref132) {
      var props = _ref132.props,
        context = _ref132.context;
      return {
        className: classNames('flex-1', {
          'px-4': props.layout === 'vertical',
          'py-4': props.layout === 'horizontal'
        }, {
          'text-right': props.align === 'left' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 0,
          'text-left': props.align === 'right' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1
        })
      };
    },
    separator: function separator(_ref133) {
      var props = _ref133.props;
      return {
        className: classNames('flex items-center flex-initial', {
          'flex-col': props.layout === 'vertical',
          'flex-row': props.layout === 'horizontal'
        })
      };
    },
    marker: 'flex self-baseline w-4 h-4 rounded-full border-2 border-blue-500 bg-white dark:border-blue-300 dark:bg-blue-900/40',
    connector: function connector(_ref134) {
      var props = _ref134.props;
      return {
        className: classNames('grow bg-gray-300 dark:bg-blue-900/40', {
          'w-[2px]': props.layout === 'vertical',
          'w-full h-[2px]': props.layout === 'horizontal'
        })
      };
    },
    content: function content(_ref135) {
      var props = _ref135.props,
        context = _ref135.context;
      return {
        className: classNames('flex-1', {
          'px-4': props.layout === 'vertical',
          'py-4': props.layout === 'horizontal'
        }, {
          'text-left': props.align === 'left' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 0,
          'text-right': props.align === 'right' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1
        }, {
          'min-h-0': props.layout === 'vertical' && context.index === context.count,
          'grow-0': props.layout === 'horizontal' && context.index === context.count
        })
      };
    }
  },
  dataview: {
    content: {
      className: classNames('bg-white blue-gray-700 border-0 p-0', 'dark:bg-gray-900 dark:text-white/80' // Dark Mode
      )
    },

    grid: 'flex flex-wrap ml-0 mr-0 mt-0 bg-white dark:bg-gray-900',
    header: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white/80 border-gray-200 dark:border-blue-900/40 border-t border-b p-4 font-bold'
  },
  dataviewlayoutoptions: {
    listButton: function listButton(_ref136) {
      var props = _ref136.props;
      return {
        className: classNames('items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom justify-center border', 'transition duration-200', 'w-12 pt-3 pb-3 rounded-lg rounded-r-none', props.layout === 'list' ? 'bg-blue-500 border-blue-500 text-white dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' : 'bg-white border-gray-300 text-blue-gray-700 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // highlighted state
        )
      };
    },

    gridButton: function gridButton(_ref137) {
      var props = _ref137.props;
      return {
        className: classNames('items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom justify-center border', 'transition duration-200', 'w-12 pt-3 pb-3 rounded-lg rounded-l-none', props.layout === 'grid' ? 'bg-blue-500 border-blue-500 text-white dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' : 'bg-white border-gray-300 text-blue-gray-700 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // highlighted state
        )
      };
    }
  },

  datascroller: {
    content: {
      className: classNames('bg-white blue-gray-700 border-0 p-0', 'dark:bg-gray-900 dark:text-white/80' // Dark Mode
      )
    },

    grid: 'flex flex-wrap ml-0 mr-0 mt-0 bg-white dark:bg-gray-900',
    header: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white/80 border-gray-200 dark:border-blue-900/40 border-t border-b p-4 font-bold'
  },
  organizationchart: {
    table: 'mx-auto my-0 border-spacing-0 border-separate',
    cell: 'text-center align-top py-0 px-3',
    node: {
      className: classNames('relative inline-block bg-white border border-gray-300 text-gray-600 p-5', 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' // Dark Mode
      )
    },

    lineCell: 'text-center align-top py-0 px-3',
    lineDown: {
      className: classNames('mx-auto my-0 w-px h-[20px] bg-gray-300', 'dark:bg-blue-900/40' //Dark Mode
      )
    },

    lineLeft: function lineLeft(_ref138) {
      var context = _ref138.context;
      return {
        className: classNames('text-center align-top py-0 px-3 rounded-none border-r border-gray-300', 'dark:border-blue-900/40',
        //Dark Mode
        {
          'border-t': context.lineTop
        })
      };
    },
    lineRight: function lineRight(_ref139) {
      var context = _ref139.context;
      return {
        className: classNames('text-center align-top py-0 px-3 rounded-none', 'dark:border-blue-900/40',
        //Dark Mode
        {
          'border-t border-gray-300': context.lineTop
        })
      };
    },
    nodeCell: 'text-center align-top py-0 px-3',
    nodeToggler: {
      className: classNames('absolute bottom-[-0.75rem] left-2/4 -ml-3 w-6 h-6 bg-inherit text-inherit rounded-full z-2 cursor-pointer no-underline select-none', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]' // Focus styles
      )
    },

    nodeTogglerIcon: 'relative inline-block w-4 h-4'
  },
  orderlist: {
    root: 'flex',
    controls: 'flex flex-col justify-center p-5',
    moveUpButton: {
      root: function root(_ref140) {
        var context = _ref140.context;
        return {
          className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2 w-12',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          })
        };
      },
      label: function label() {
        return {
          className: classNames('flex-initial w-0')
        };
      }
    },
    moveTopButton: {
      root: function root(_ref141) {
        var context = _ref141.context;
        return {
          className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          })
        };
      },
      label: function label() {
        return {
          className: classNames('flex-initial w-0')
        };
      }
    },
    moveDownButton: {
      root: function root(_ref142) {
        var context = _ref142.context;
        return {
          className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          })
        };
      },
      label: function label() {
        return {
          className: classNames('flex-initial w-0')
        };
      }
    },
    moveBottomButton: {
      root: function root(_ref143) {
        var context = _ref143.context;
        return {
          className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          })
        };
      },
      label: function label() {
        return {
          className: classNames('flex-initial w-0')
        };
      }
    },
    container: 'flex-auto',
    header: {
      className: classNames('bg-slate-50 text-slate-700 border border-gray-300 p-5 font-bold border-b-0 rounded-t-md', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
      )
    },

    list: {
      className: classNames('list-none m-0 p-0 overflow-auto min-h-[12rem] max-h-[24rem]', 'border border-gray-300 bg-white text-gray-600 py-3 px-0 rounded-b-md outline-none', 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' //Dark Mode
      )
    },

    item: function item(_ref144) {
      var context = _ref144.context;
      return {
        className: classNames('relative cursor-pointer overflow-hidden', 'py-3 px-5 m-0 border-none text-gray-600 dark:text-white/80', 'transition duration-200', {
          'text-blue-700 bg-blue-500/20 dark:bg-blue-300/20': context.selected
        })
      };
    }
  },
  picklist: {
    root: 'flex flex-col xl:flex-row',
    controls: 'flex flex-row xl:flex-col justify-center p-5',
    moveUpButton: {
      root: {
        className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
        // button component
        'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
        // icon only
        'mr-2 xl:mb-2',
        // orderlist button
        'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' //Dark Mode
        )
      },

      label: 'flex-initial w-0'
    },
    moveTopButton: {
      root: {
        className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
        // button component
        'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
        // icon only
        'mr-2 xl:mb-2',
        // orderlist button
        'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' //Dark Mode
        )
      },

      label: 'flex-initial w-0'
    },
    moveDownButton: {
      root: {
        className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
        // button component
        'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
        // icon only
        'mr-2 xl:mb-2',
        // orderlist button
        'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' //Dark Mode
        )
      },

      label: 'flex-initial w-0'
    },
    moveBottomButton: {
      root: {
        className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
        // button component
        'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
        // icon only
        'mr-2 xl:mb-2',
        // orderlist button
        'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' //Dark Mode
        )
      },

      label: 'flex-initial w-0'
    },
    listWrapper: 'grow shrink basis-2/4',
    header: {
      className: classNames('bg-slate-50 text-slate-700 border border-gray-300 p-5 font-bold border-b-0 rounded-t-md', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
      )
    },

    list: {
      className: classNames('list-none m-0 p-0 overflow-auto min-h-[12rem] max-h-[24rem]', 'border border-gray-300 bg-white text-gray-600 py-3 px-0 rounded-b-md outline-none', 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' //Dark Mode
      )
    },

    item: function item(_ref145) {
      var context = _ref145.context;
      return {
        className: classNames('relative cursor-pointer overflow-hidden', 'py-3 px-5 m-0 border-none text-gray-600 dark:text-white/80', 'transition duration-200', {
          'text-blue-700 bg-blue-500/20 dark:bg-blue-300/20': context.selected,
          'text-gray-600 dark:bg-blue-900/40': !context.selected
        })
      };
    },
    buttons: 'flex flex-row xl:flex-col justify-center p-5',
    moveToTargetButton: {
      root: {
        className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
        // button component
        'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
        // icon only
        'mb-2',
        // orderlist button
        'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' //Dark Mode
        )
      },

      label: 'flex-initial w-0'
    },
    moveAllToTargetButton: {
      root: {
        className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
        // button component
        'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
        // icon only
        'mr-2 xl:mb-2',
        // orderlist button
        'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' //Dark Mode
        )
      },

      label: 'flex-initial w-0'
    },
    moveToSourceButton: {
      root: {
        className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
        // button component
        'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
        // icon only
        'mr-2 xl:mb-2',
        // orderlist button
        'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' //Dark Mode
        )
      },

      label: 'flex-initial w-0'
    },
    moveAllToSourceButton: {
      root: {
        className: classNames('relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
        // button component
        'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
        // icon only
        'mr-2 xl:mb-2',
        // orderlist button
        'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' //Dark Mode
        )
      },

      label: 'flex-initial w-0'
    },
    targetcontrols: 'flex flex-col justify-center p-5',
    targetwrapper: 'grow shrink basis-2/4',
    targetheader: {
      className: classNames('bg-slate-50 text-slate-700 border border-gray-300 p-5 font-bold border-b-0 rounded-t-md', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
      )
    },

    targetlist: {
      className: classNames('list-none m-0 p-0 overflow-auto min-h-[12rem] max-h-[24rem]', 'border border-gray-300 bg-white text-gray-600 py-3 px-0 rounded-b-md outline-none', 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' //Dark Mode
      )
    },

    transition: {
      timeout: 0,
      classNames: {
        enter: '!transition-none',
        enterActive: '!transition-none',
        exit: '!transition-none',
        exitActive: '!transition-none'
      }
    }
  },
  paginator: {
    root: {
      className: classNames('flex items-center justify-center flex-wrap', 'bg-white text-gray-500 border-0 px-4 py-2 rounded-md', 'dark:bg-gray-900 dark:text-white/60 dark:border-blue-900/40' // Dark Mode
      )
    },

    firstPageButton: function firstPageButton(_ref146) {
      var context = _ref146.context;
      return {
        className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500  min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled // Focus
        })
      };
    },

    prevPageButton: function prevPageButton(_ref147) {
      var context = _ref147.context;
      return {
        className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled // Focus
        })
      };
    },

    nextPageButton: function nextPageButton(_ref148) {
      var context = _ref148.context;
      return {
        className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled // Focus
        })
      };
    },

    lastPageButton: function lastPageButton(_ref149) {
      var context = _ref149.context;
      return {
        className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled // Focus
        })
      };
    },

    pageButton: function pageButton(_ref150) {
      var context = _ref150.context;
      return {
        className: classNames('relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:border-blue-300 dark:text-white',
        // Dark Mode
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        // Focus
        {
          'bg-blue-50 border-blue-50 text-blue-700 dark:bg-blue-300': context.active
        })
      };
    },
    RPPDropdown: {
      root: function root(_ref151) {
        var props = _ref151.props,
          state = _ref151.state;
        return {
          className: classNames('inline-flex relative cursor-pointer user-none', 'bg-white border rounded-md', 'transition duration-200', 'h-12 mx-2', 'dark:bg-gray-950 dark:border-blue-900/40',
          //DarkMode
          {
            'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] border-blue-500': state.focused && !props.disabled,
            //Focus
            'border-gray-300': !state.focused,
            'hover:border-blue-500': !props.disabled //Hover
          })
        };
      },

      input: {
        className: classNames('font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border-0 pr-0', 'focus:outline-none focus:outline-offset-0', 'dark:text-white' //Dark Mode
        )
      },

      trigger: {
        className: classNames('flex items-center justify-center shrink-0', 'text-gray-500 dark:text-white w-12 rounded-r-md')
      },
      panel: {
        className: classNames('bg-white text-gray-600 border-0 rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.1)]', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
        )
      },

      wrapper: 'overflow-auto',
      list: 'm-0 p-0 py-3 list-none',
      item: function item(_ref152) {
        var context = _ref152.context;
        return {
          className: classNames('relative font-normal cursor-pointer space-nowrap overflow-hidden', 'm-0 py-3 px-5 border-none text-gray-600 rounded-none', 'transition duration-200', 'dark:text-white/80',
          // Dark Mode
          {
            'text-blue-700 bg-blue-50 dark:text-white/80 dark:bg-blue-300': !context.focused && context.selected,
            'bg-blue-300/40': context.focused && context.selected,
            'text-gray-600 bg-gray-300 dark:text-white/80 dark:bg-blue-900/40': context.focused && !context.selected
          })
        };
      }
    },
    JTPInput: {
      root: 'inline-flex mx-2',
      input: {
        className: classNames('font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border border-gray-300 pr-0', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] focus:border-blue-300', 'dark:text-white dark:bg-gray-950 dark:border-blue-900/40',
        //Dark Mode
        'm-0 flex-auto max-w-[3rem]')
      }
    },
    jumptopagedropdown: {
      root: function root(_ref153) {
        var props = _ref153.props,
          state = _ref153.state;
        return {
          className: classNames('inline-flex relative cursor-pointer user-none', 'bg-white border rounded-md', 'transition duration-200', 'h-12 mx-2', 'dark:bg-gray-950 dark:border-blue-900/40',
          //DarkMode
          {
            'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] border-blue-500': state.focused && !props.disabled,
            //Focus
            'border-gray-300': !state.focused,
            'hover:border-blue-500': !props.disabled //Hover
          })
        };
      },

      input: {
        className: classNames('font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border-0 pr-0', 'focus:outline-none focus:outline-offset-0', 'dark:text-white' //Dark Mode
        )
      },

      trigger: {
        className: classNames('flex items-center justify-center shrink-0', 'text-gray-500 dark:text-white w-12 rounded-r-md')
      },
      panel: {
        className: classNames('bg-white text-gray-600 border-0 rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.1)]', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
        )
      },

      wrapper: 'overflow-auto',
      list: 'm-0 p-0 py-3 list-none',
      item: function item(_ref154) {
        var context = _ref154.context;
        return {
          className: classNames('relative font-normal cursor-pointer space-nowrap overflow-hidden', 'm-0 py-3 px-5 border-none text-gray-600 rounded-none', 'transition duration-200', 'dark:text-white/80',
          // Dark Mode
          {
            'text-blue-700 bg-blue-50 dark:text-white/80 dark:bg-blue-300': !context.focused && context.selected,
            'bg-blue-300/40': context.focused && context.selected,
            'text-gray-600 bg-gray-300 dark:text-white/80 dark:bg-blue-900/40': context.focused && !context.selected
          })
        };
      }
    }
  },
  treetable: {
    root: function root(_ref155) {
      var props = _ref155.props;
      return {
        className: classNames('relative', {
          'flex flex-col h-full': props.scrollHeight
        })
      };
    },
    loadingOverlay: {
      className: classNames('fixed w-full h-full t-0 l-0 bg-gray-100/40', 'transition duration-200', 'absolute flex items-center justify-center z-2', 'dark:bg-gray-950/40' // Dark Mode
      )
    },

    loadingIcon: 'w-8 h-8',
    header: {
      className: classNames('bg-slate-50 text-slate-700 border border-x-0 border-t-0 border-gray-300 p-4 font-bold', 'dark:bg-gray-900 dark:text-white/70 dark:border-blue-900/40' // Dark Mode
      )
    },

    scrollableWrapper: function scrollableWrapper(_ref156) {
      var props = _ref156.props;
      return {
        className: classNames({
          'relative overflow-auto': props.scrollable,
          'overflow-x-auto': props.resizableColumns
        })
      };
    },
    wrapper: function wrapper(_ref157) {
      var props = _ref157.props;
      return {
        className: classNames({
          'relative overflow-auto': props.scrollable,
          'overflow-x-auto': props.resizableColumns
        })
      };
    },
    footer: {
      className: classNames('bg-slate-50 text-slate-700 border border-x-0 border-t-0 border-gray-300 p-4 font-bold', 'dark:bg-gray-900 dark:text-white/70 dark:border-blue-900/40' // Dark Mode
      )
    },

    table: 'border-collapse table-fixed w-full',
    thead: function thead(_ref158) {
      var props = _ref158.props;
      return {
        className: classNames({
          'block sticky top-0 z-[1]': props.scrollable
        })
      };
    },
    tbody: function tbody(_ref159) {
      var props = _ref159.props;
      return {
        className: classNames({
          block: props.scrollable
        })
      };
    },
    tfoot: function tfoot(_ref160) {
      var props = _ref160.props;
      return {
        className: classNames({
          block: props.scrollable
        })
      };
    },
    headerRow: function headerRow(_ref161) {
      var props = _ref161.props;
      return {
        className: classNames({
          'flex flex-nowrap w-full': props.scrollable
        })
      };
    },
    row: function row(_ref162) {
      var context = _ref162.context;
      return {
        className: classNames('transition duration-200', 'focus:outline focus:outline-[0.15rem] focus:outline-blue-200 focus:outline-offset-[-0.15rem]',
        // Focus
        context.selected ? 'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80' : 'bg-white text-gray-600 dark:bg-gray-900 dark:text-white/80', {
          'hover:bg-gray-300/20 hover:text-gray-600 dark:hover:bg-gray-950': context.selectable && !context.selected,
          // Hover
          'flex flex-nowrap w-full': context.scrollable
        })
      };
    },
    column: {
      headerCell: function headerCell(_ref163) {
        var context = _ref163.context;
        return {
          className: classNames('text-left border-gray-300 border font-bold', 'transition duration-200 p-4', 'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900',
          //Dark Mode
          {
            'bg-blue-50 text-blue-700': context.sorted,
            'bg-slate-50': !context.sorted,
            'flex flex-1 items-center': context.scrollable,
            'flex-initial shrink-0': context.scrollable && !context.frozen,
            'sticky z-[1]': context.scrollable && context.frozen,
            'border-x-0 border-l-0 border-t-0': !context.showGridlines,
            'overflow-hidden relative bg-clip-padding': !context.frozen
          })
        };
      },
      bodyCell: function bodyCell(_ref164) {
        var context = _ref164.context;
        return {
          className: classNames('text-left border-gray-300 border', 'transition duration-200 p-4', 'dark:border-blue-900/40',
          //Dark Mode
          {
            'cursor-pointer': context.selectable,
            'flex flex-1 items-center': context.scrollable,
            'flex-initial shrink-0': context.scrollable && !context.frozen,
            sticky: context.scrollable && context.frozen,
            'border-x-0 border-l-0': !context.showGridlines
          })
        };
      },
      rowToggler: function rowToggler(_ref165) {
        var context = _ref165.context;
        return {
          className: classNames('relative inline-flex items-center justify-center align-center cursor-pointer select-none overflow-hidden bg-transparent', 'w-8 h-8 border-0 rounded mr-0.5', {
            'text-blue-700': context.selected,
            'text-gray-500': !context.selected
          }, 'dark:text-white/70' //Dark Mode
          )
        };
      },

      sort: {
        className: 'inline-block align-middle'
      },
      sortIcon: function sortIcon(_ref166) {
        var context = _ref166.context;
        return {
          className: classNames('ml-2 inline-block align-middle', {
            'text-blue-700 dark:text-white/80': context.sorted,
            'text-slate-700 dark:text-white/70': !context.sorted
          })
        };
      },
      sortBadge: {
        className: classNames('h-[1.143rem] min-w-[1.143rem] leading-[1.143rem] text-blue-700 bg-blue-50 ml-2 rounded-[50%]', 'dark:text-white/80 dark:bg-blue-500/40' // Dark Mode
        )
      },

      columnResizer: 'block absolute top-0 right-0 m-0 w-2 h-full p-0 cursor-col-resize border border-transparent',
      checkboxWrapper: {
        className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6 mr-2')
      },
      checkbox: function checkbox(_ref167) {
        var context = _ref167.context;
        return {
          className: classNames('flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200', {
            'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400': context.checked,
            'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900': !context.checked
          }, {
            'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled
          })
        };
      },
      checkboxIcon: function checkboxIcon(_ref168) {
        var context = _ref168.context;
        return {
          className: classNames('w-4 h-4 transition-all duration-200 text-base dark:text-gray-900', {
            'text-white': context.checked
          })
        };
      }
    },
    resizeHelper: 'absolute hidden w-px z-10 bg-blue-500 dark:bg-blue-300'
  },
  datatable: {
    root: function root(_ref169) {
      var props = _ref169.props;
      return {
        className: classNames('relative', {
          'flex flex-col h-full': props.scrollable && props.scrollHeight === 'flex'
        })
      };
    },
    loadingOverlay: {
      className: classNames('fixed w-full h-full t-0 l-0 bg-gray-100/40', 'transition duration-200', 'absolute flex items-center justify-center z-2', 'dark:bg-gray-950/40' // Dark Mode
      )
    },

    loadingIcon: 'w-8 h-8',
    wrapper: function wrapper(_ref170) {
      var props = _ref170.props;
      return {
        className: classNames({
          relative: props.scrollable,
          'flex flex-col grow h-full': props.scrollable && props.scrollHeight === 'flex'
        })
      };
    },
    header: function header(_ref171) {
      var props = _ref171.props;
      return {
        className: classNames('bg-slate-50 text-slate-700 border-gray-300 font-bold p-4', 'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900',
        // Dark Mode
        props.showGridlines ? 'border-x border-t border-b-0' : 'border-y border-x-0')
      };
    },
    table: 'w-full border-spacing-0',
    thead: function thead(_ref172) {
      var context = _ref172.context;
      return {
        className: classNames({
          'bg-slate-50 top-0 z-[1]': context.scrollable
        })
      };
    },
    tbody: function tbody(_ref173) {
      var props = _ref173.props,
        context = _ref173.context;
      return {
        className: classNames({
          'sticky z-[1]': props.frozenRow && context.scrollable
        })
      };
    },
    tfoot: function tfoot(_ref174) {
      var context = _ref174.context;
      return {
        className: classNames({
          'bg-slate-50 bottom-0 z-[1]': context.scrollable
        })
      };
    },
    footer: {
      className: classNames('bg-slate-50 text-slate-700 border-t-0 border-b border-x-0 border-gray-300 font-bold p-4', 'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900' // Dark Mode
      )
    },

    column: {
      headerCell: function headerCell(_ref175) {
        var context = _ref175.context,
          props = _ref175.props;
        return {
          className: classNames('text-left border-0 border-b border-solid border-gray-300 dark:border-blue-900/40 font-bold', 'transition duration-200', (context === null || context === void 0 ? void 0 : context.size) === 'small' ? 'p-2' : (context === null || context === void 0 ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
          // Size
          context.sorted ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-700',
          // Sort
          context.sorted ? 'dark:text-white/80 dark:bg-blue-300' : 'dark:text-white/80 dark:bg-gray-900',
          // Dark Mode
          {
            'sticky z-[1]': props && (props.frozen || props.frozen === ''),
            // Frozen Columns
            'border-x border-y': context === null || context === void 0 ? void 0 : context.showGridlines,
            'overflow-hidden space-nowrap border-y relative bg-clip-padding': context.resizable // Resizable
          })
        };
      },

      headerContent: 'flex items-center',
      bodyCell: function bodyCell(_ref176) {
        var props = _ref176.props,
          context = _ref176.context;
        return {
          className: classNames('text-left border-0 border-b border-solid border-gray-300', (context === null || context === void 0 ? void 0 : context.size) === 'small' ? 'p-2' : (context === null || context === void 0 ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
          // Size
          'dark:text-white/80 dark:border-blue-900/40',
          // Dark Mode
          {
            'sticky bg-inherit': props && (props.frozen || props.frozen === ''),
            // Frozen Columns
            'border-x border-y': context.showGridlines
          })
        };
      },
      footerCell: function footerCell(_ref177) {
        var context = _ref177.context;
        return {
          className: classNames('text-left border-0 border-b border-solid border-gray-300 font-bold', 'bg-slate-50 text-slate-700', 'transition duration-200', (context === null || context === void 0 ? void 0 : context.size) === 'small' ? 'p-2' : (context === null || context === void 0 ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
          // Size
          'dark:text-white/80 dark:bg-gray-900 dark:border-blue-900/40',
          // Dark Mode
          {
            'border-x border-y': context.showGridlines
          })
        };
      },
      sortIcon: function sortIcon(_ref178) {
        var context = _ref178.context;
        return {
          className: classNames('ml-2', context.sorted ? 'text-blue-700 dark:text-white/80' : 'text-slate-700 dark:text-white/70')
        };
      },
      sortBadge: {
        className: classNames('flex items-center justify-center align-middle', 'rounded-[50%] w-[1.143rem] leading-[1.143rem] ml-2', 'text-blue-700 bg-blue-50', 'dark:text-white/80 dark:bg-blue-400' // Dark Mode
        )
      },

      columnFilter: 'inline-flex items-center ml-auto',
      filterOverlay: {
        className: classNames('bg-white text-gray-600 border-0 rounded-md min-w-[12.5rem]', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' //Dark Mode
        )
      },

      filterMatchModeDropdown: {
        root: 'min-[0px]:flex mb-2'
      },
      filterRowItems: 'm-0 p-0 py-3 list-none ',
      filterRowItem: function filterRowItem(_ref179) {
        var context = _ref179.context;
        return {
          className: classNames('m-0 py-3 px-5 bg-transparent', 'transition duration-200', context !== null && context !== void 0 && context.highlighted ? 'text-blue-700 bg-blue-100 dark:text-white/80 dark:bg-blue-300' : 'text-gray-600 bg-transparent dark:text-white/80 dark:bg-transparent')
        };
      },
      filterOperator: {
        className: classNames('px-5 py-3 border-b border-solid border-gray-300 text-slate-700 bg-slate-50 rounded-t-md', 'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900' // Dark Mode
        )
      },

      filterOperatorDropdown: {
        root: 'min-[0px]:flex'
      },
      filterConstraint: 'p-5 border-b border-solid border-gray-300 dark:border-blue-900/40',
      filterAddRule: 'py-3 px-5',
      filterAddRuleButton: {
        root: 'justify-center w-full min-[0px]:text-sm',
        label: 'flex-auto grow-0',
        icon: 'mr-2'
      },
      filterRemoveButton: {
        root: 'ml-2',
        label: 'grow-0'
      },
      filterButtonbar: 'flex items-center justify-between p-5',
      filterClearButton: {
        root: 'w-auto min-[0px]:text-sm border-blue-500 text-blue-500 px-4 py-3'
      },
      filterApplyButton: {
        root: 'w-auto min-[0px]:text-sm px-4 py-3'
      },
      filterMenuButton: function filterMenuButton(_ref180) {
        var context = _ref180.context;
        return {
          className: classNames('inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative ml-2', 'w-8 h-8 rounded-[50%]', 'transition duration-200', 'hover:text-slate-700 hover:bg-gray-300/20',
          // Hover
          'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
          // Focus
          'dark:text-white/70 dark:hover:text-white/80 dark:bg-gray-900',
          // Dark Mode
          {
            'bg-blue-50 text-blue-700': context.active
          })
        };
      },
      headerFilterClearButton: function headerFilterClearButton(_ref181) {
        var context = _ref181.context;
        return {
          className: classNames('inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative', 'text-left bg-transparent m-0 p-0 border-none select-none ml-2', {
            invisible: !context.hidden
          })
        };
      },
      columnResizer: 'block absolute top-0 right-0 m-0 w-2 h-full p-0 cursor-col-resize border border-transparent',
      rowreordericon: 'cursor-move',
      rowEditorInitButton: {
        className: classNames('inline-flex items-center justify-center overflow-hidden relative', 'text-left cursor-pointer select-none', 'w-8 h-8 border-0 rounded-[50%]', 'transition duration-200', 'text-slate-700 border-transparent', 'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        //Focus
        'hover:text-slate-700 hover:bg-gray-300/20',
        //Hover
        'dark:text-white/70' // Dark Mode
        )
      },

      rowEditorSaveButton: {
        className: classNames('inline-flex items-center justify-center overflow-hidden relative', 'text-left cursor-pointer select-none', 'w-8 h-8 border-0 rounded-[50%]', 'transition duration-200', 'text-slate-700 border-transparent', 'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        //Focus
        'hover:text-slate-700 hover:bg-gray-300/20',
        //Hover
        'dark:text-white/70' // Dark Mode
        )
      },

      rowEditorCancelButton: {
        className: classNames('inline-flex items-center justify-center overflow-hidden relative', 'text-left cursor-pointer select-none', 'w-8 h-8 border-0 rounded-[50%]', 'transition duration-200', 'text-slate-700 border-transparent', 'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        //Focus
        'hover:text-slate-700 hover:bg-gray-300/20',
        //Hover
        'dark:text-white/70' // Dark Mode
        )
      },

      radiobuttonwrapper: {
        className: classNames('relative inline-flex cursor-pointer select-none align-bottom', 'w-6 h-6')
      },
      radiobutton: function radiobutton(_ref182) {
        var context = _ref182.context;
        return {
          className: classNames('flex justify-center items-center', 'border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out', context.checked ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900', {
            'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
            'cursor-default opacity-60': context.disabled
          })
        };
      },
      radiobuttonicon: function radiobuttonicon(_ref183) {
        var context = _ref183.context;
        return {
          className: classNames('transform rounded-full', 'block w-3 h-3 transition duration-200 bg-white dark:bg-gray-900', {
            'backface-hidden scale-10 invisible': context.checked === false,
            'transform scale-100 visible': context.checked === true
          })
        };
      },
      headercheckboxwrapper: {
        className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6')
      },
      headerCheckbox: function headerCheckbox(_ref184) {
        var context = _ref184.context;
        return {
          className: classNames('flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200', context.checked ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900', {
            'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
            'cursor-default opacity-60': context.disabled
          })
        };
      },
      headercheckboxicon: 'w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900',
      checkboxwrapper: {
        className: classNames('cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6')
      },
      checkbox: function checkbox(_ref185) {
        var context = _ref185.context;
        return {
          className: classNames('flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200', context.checked ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900', {
            'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
            'cursor-default opacity-60': context.disabled
          })
        };
      },
      checkboxicon: 'w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900',
      transition: TRANSITIONS.overlay
    },
    bodyRow: function bodyRow(_ref186) {
      var context = _ref186.context;
      return {
        className: classNames(context.selected ? 'bg-blue-50 text-blue-700 dark:bg-blue-300' : 'bg-white text-gray-600 dark:bg-gray-900', context.stripedRows ? context.index % 2 === 0 ? 'bg-white text-gray-600 dark:bg-gray-900' : 'bg-blue-50/50 text-gray-600 dark:bg-gray-950' : '', 'transition duration-200', 'focus:outline focus:outline-[0.15rem] focus:outline-blue-200 focus:outline-offset-[-0.15rem]',
        // Focus
        'dark:text-white/80 dark:focus:outline dark:focus:outline-[0.15rem] dark:focus:outline-blue-300 dark:focus:outline-offset-[-0.15rem]',
        // Dark Mode
        {
          'cursor-pointer': context.selectable,
          'hover:bg-gray-300/20 hover:text-gray-600': context.selectable && !context.selected // Hover
        })
      };
    },

    rowExpansion: 'bg-white text-gray-600 dark:bg-gray-900 dark:text-white/80',
    rowGroupHeader: {
      className: classNames('sticky z-[1]', 'bg-white text-gray-600', 'transition duration-200')
    },
    rowgroupFooter: {
      className: classNames('sticky z-[1]', 'bg-white text-gray-600', 'transition duration-200')
    },
    rowgrouptoggler: {
      className: classNames('text-left m-0 p-0 cursor-pointer select-none', 'inline-flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-[50%]', 'transition duration-200', 'dark:text-white/70' // Dark Mode
      )
    },

    rowgrouptogglericon: 'inline-block w-4 h-4',
    resizeHelper: 'absolute hidden w-px z-10 bg-blue-500 dark:bg-blue-300'
  },
  // CHART
  chart: {
    root: 'relative'
  }
};

exports.TRANSITIONS = TRANSITIONS;
exports["default"] = Tailwind;
