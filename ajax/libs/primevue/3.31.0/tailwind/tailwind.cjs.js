'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Tailwind = {
  directives: {
    ripple: {
      root: {
        "class": ['block absolute bg-white bg-opacity-50 rounded-full transform scale-0 pointer-events-none']
      }
    }
  },
  //PANELS
  panel: {
    header: function header(_ref) {
      var props = _ref.props;
      return {
        "class": ['flex items-center justify-between',
        // flex and alignments
        'border border-gray-300 bg-gray-100 text-gray-700 rounded-tl-lg rounded-tr-lg',
        // borders and colors
        'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80',
        // Dark mode
        {
          'p-5': !props.toggleable,
          'py-3 px-5': props.toggleable
        } // condition
        ]
      };
    },

    title: {
      "class": ['leading-none font-bold']
    },
    toggler: {
      "class": ['inline-flex items-center justify-center overflow-hidden relative no-underline',
      // alignments
      'w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition duration-200 ease-in-out',
      // widths, borders, and transitions
      'hover:text-gray-900 hover:border-transparent hover:bg-gray-200 dark:hover:text-white/80 dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
      // hover
      'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]' // focus
      ]
    },

    togglerIcon: {
      "class": ['inline-block']
    },
    content: {
      "class": ['p-5 border border-gray-300 bg-white text-gray-700 border-t-0 last:rounded-br-lg last:rounded-bl-lg', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // Dark mode
      ] // padding, borders, and colors
    }
  },

  accordion: {
    root: {
      "class": ['mb-1']
    },
    tab: {
      header: function header(_ref2) {
        var props = _ref2.props;
        return {
          "class": [{
            'select-none pointer-events-none cursor-default opacity-60': props === null || props === void 0 ? void 0 : props.disabled
          } // Condition
          ]
        };
      },

      headerAction: function headerAction(_ref3) {
        var tab = _ref3.tab;
        return {
          "class": ['flex items-center cursor-pointer relative no-underline select-none',
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
            'rounded-br-md rounded-bl-md': !tab.context.active,
            'rounded-br-0 rounded-bl-0 text-gray-800': tab.context.active
          } // Condition
          ]
        };
      },

      headerIcon: {
        "class": ['inline-block mr-2']
      },
      headerTitle: {
        "class": ['leading-none']
      },
      content: {
        "class": ['p-5 border border-gray-300 bg-white text-gray-700 border-t-0 rounded-tl-none rounded-tr-none rounded-br-lg rounded-bl-lg', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // Dark mode
        ]
      }
    }
  },

  card: {
    root: {
      "class": ['bg-white text-gray-700 shadow-md rounded-md',
      // Background, text color, box shadow, and border radius.
      'dark:bg-gray-900 dark:text-white ' //dark
      ]
    },

    body: {
      "class": 'p-5' // Padding.
    },

    title: {
      "class": 'text-2xl font-bold mb-2' // Font size, font weight, and margin bottom.
    },

    subtitle: {
      "class": ['font-normal mb-2 text-gray-600',
      // Font weight, margin bottom, and text color.
      'dark:text-white/60 ' //dark
      ]
    },

    content: {
      "class": 'py-5' // Vertical padding.
    },

    footer: {
      "class": 'pt-5' // Top padding.
    }
  },

  divider: {
    root: function root(_ref4) {
      var props = _ref4.props;
      return {
        "class": ['flex relative',
        // alignments.
        {
          'w-full my-5 mx-0 py-0 px-5 before:block before:left-0 before:absolute before:top-1/2 before:w-full before:border-t before:border-gray-300 before:dark:border-blue-900/40': props.layout == 'horizontal',
          // Padding and borders for horizontal layout.
          'justify-center min-h-full mx-4 md:mx-5 py-5 before:block before:min-h-full before:absolute before:left-1/2 before:top-0 before:transform before:-translate-x-1/2 before:border-l before:border-gray-300 before:dark:border-blue-900/40': props.layout == 'vertical' // Padding and borders for vertical layout.
        }, {
          'before:border-solid': props.type == 'solid',
          'before:border-dotted': props.type == 'dotted',
          'before:border-dashed': props.type == 'dashed'
        },
        // Border type condition.
        {
          'justify-center items-center': props.align == 'center' || props.align == null,
          // Alignment condition for center or default alignment.
          'justify-end items-center': props.align == 'right',
          // Alignment condition for right alignment.
          'justify-start items-center': props.align == 'left',
          // Alignment condition for left alignment.
          'items-start': props.align == 'top',
          // Alignment condition for top alignment.
          'items-end': props.align == 'bottom' // Alignment condition for bottom alignment.
        }]
      };
    },

    content: {
      "class": 'px-1 bg-white z-10 dark:bg-gray-900' // Padding and background color.
    }
  },

  fieldset: {
    root: {
      "class": ['border border-gray-300 bg-white text-gray-700 rounded-md block mx-2 my-0.5 pl-4 pr-5 inline-size-min',
      // Borders, background, text color, spacing, and inline size.
      'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' //dark
      ]
    },

    legend: function legend(_ref5) {
      var props = _ref5.props;
      return {
        "class": ['border border-gray-300 text-gray-700 bg-gray-50 font-bold rounded-md', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 ',
        //dark
        {
          'p-0 transition-none hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 dark:hover:text-white/80 dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': props.toggleable,
          'p-5': !props.toggleable
        }]
      };
    },
    toggler: function toggler(_ref6) {
      var props = _ref6.props;
      return {
        "class": ['flex items-center justify-center', {
          'p-5 text-gray-700 rounded-md transition-none cursor-pointer overflow-hidden relative select-none hover:text-gray-900 focus:focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] dark:text-white/80 dark:hover:text-white/80 dark:hover:bg-gray-800/60 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': props.toggleable
        }]
      };
    },
    togglerIcon: {
      "class": 'mr-2 inline-block' // Margin and display style.
    },

    legendTitle: {
      "class": 'flex items-center justify-center leading-none' // alignments, and leading style.
    },

    content: {
      "class": 'p-5' // Padding.
    }
  },

  scrollpanel: {
    wrapper: {
      "class": 'float-left h-full overflow-hidden relative w-full z-10'
    },
    content: {
      "class": 'box-border h-[calc(100% + 18px)] overflow-scroll pr-18 pb-18 relative scrollbar-none w-[calc(100% + 18px)] [&::-webkit-scrollbar]:hidden'
    },
    barX: {
      "class": 'bg-gray-50 border-0 transition-none invisible absolute bottom-0 h-3 z-2 rounded cursor-pointer opacity-0 relative'
    },
    barY: {
      "class": 'bg-gray-50 border-0 transition-none top-0 w-3 h-full z-2 rounded cursor-pointer opacity-0 relative'
    }
  },
  tabview: {
    navContainer: function navContainer(_ref7) {
      var props = _ref7.props;
        _ref7.context;
        _ref7.parent;
      return {
        "class": ['relative',
        // Relative positioning.
        {
          'overflow-hidden': props.scrollable
        } // Overflow condition.
        ]
      };
    },

    navContent: {
      "class": ['overflow-y-hidden overscroll-contain overscroll-auto scroll-smooth [&::-webkit-scrollbar]:hidden'] // Overflow and scrollbar styles.
    },

    previousButton: {
      "class": ['h-full flex items-center justify-center absolute top-0 z-20', 'left-0', 'bg-white text-blue-500 w-12 shadow-md rounded-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 ]'] // Flex and absolute positioning styles.
    },

    nextButton: {
      "class": ['h-full flex items-center justify-center absolute top-0 z-20', 'right-0', 'bg-white text-blue-500 w-12 shadow-md rounded-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 '] // Flex and absolute positioning styles.
    },

    nav: {
      "class": ['flex flex-1 list-none m-0 p-0', 'bg-white border border-gray-300 border-0 border-b-2', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 '] // Flex, list, margin, padding, and border styles.
    },

    tab: {
      header: function header(_ref8) {
        var _tab$props;
        var tab = _ref8.tab;
        return {
          "class": ['mr-0', {
            'cursor-default pointer-events-none select-none user-select-none opacity-60': (_tab$props = tab.props) === null || _tab$props === void 0 ? void 0 : _tab$props.disabled
          }] // Margin and condition-based styles.
        };
      },

      headerAction: function headerAction(_ref9) {
        var tab = _ref9.tab;
        return {
          "class": ['items-center cursor-pointer flex overflow-hidden relative select-none text-decoration-none user-select-none',
          // Flex and overflow styles.
          'border-b-2 p-5 font-bold rounded-t-lg transition-shadow duration-200 m-0',
          // Border, padding, font, and transition styles.
          'transition-colors duration-200',
          // Transition duration style.
          'focus:outline-none focus:outline-offset-0 focus:shadow-[inset_0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]',
          // Focus styles.
          {
            'border-gray-300 bg-white text-gray-700 hover:bg-white hover:border-gray-400 hover:text-gray-600 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80 dark:hover:bg-gray-800/80': tab.parent.state.d_activeIndex !== tab.context.index,
            // Condition-based hover styles.
            'bg-white border-blue-500 text-blue-500 dark:bg-gray-900 dark:border-blue-300 dark:text-blue-300': tab.parent.state.d_activeIndex === tab.context.index // Condition-based active styles.
          }],

          style: 'margin-bottom:-2px' // Negative margin style.
        };
      },

      headerTitle: {
        "class": ['leading-none whitespace-nowrap'] // Leading and whitespace styles.
      },

      content: {
        "class": ['bg-white p-5 border-0 text-gray-700 rounded-bl-2xl rounded-br-2xl', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80'] // Background, padding, border, and text styles.
      }
    }
  },

  splitter: {
    root: {
      "class": ['border border-solid border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900 rounded-lg text-gray-700 dark:text-white/80']
    },
    gutter: function gutter(_ref10) {
      var props = _ref10.props;
      return {
        "class": ['flex items-center justify-center  flex-shrink-0', 'transition-all duration-200 bg-gray-100 dark:bg-gray-800', {
          'cursor-col-resize': props.layout == 'horizontal',
          'cursor-row-resize': props.layout !== 'horizontal'
        }]
      };
    },
    gutterhandler: function gutterhandler(_ref11) {
      var props = _ref11.props;
      return {
        "class": ['bg-gray-300 dark:bg-gray-600 transition-all duration-200', {
          'h-7': props.layout == 'horizontal',
          'w-7 h-2': props.layout !== 'horizontal'
        }]
      };
    }
  },
  splitterpanel: {
    root: function root(_ref12) {
      _ref12.props;
      return {
        "class": ['flex-grow', 'flex justify-center items-center']
      };
    }
  },
  dialog: {
    root: function root(_ref13) {
      _ref13.props;
        _ref13.state;
      return {
        "class": ['rounded-lg shadow-lg border-0', 'flex flex-col max-h-90 transform scale-100', 'm-0  w-[50vw] z-40 relative', '', 'dark:border dark:border-blue-900/40']
      };
    },
    header: {
      "class": ['flex items-center justify-between flex-shrink-0', 'bg-white text-gray-800 border-t-0  rounded-tl-lg rounded-tr-lg p-6', 'dark:bg-gray-900  dark:text-white/80']
    },
    headerTitle: {
      "class": ['font-bold text-lg']
    },
    headerIcons: {
      "class": ['flex items-center']
    },
    closeButton: {
      "class": ['flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0', 'hover:text-gray-700 hover:border-transparent hover:bg-gray-200', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
      // focus
      'dark:hover:text-white/80 dark:hover:border-transparent dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    closeButtonIcon: {
      "class": ['w-4 h-4 inline-block']
    },
    content: {
      "class": ['overflow-y-auto', 'bg-white text-gray-700 px-6 pb-8 pt-0', 'rounded-bl-lg rounded-br-lg', 'dark:bg-gray-900  dark:text-white/80 ']
    },
    footer: {
      "class": ['flex-shrink-0 ', 'border-t-0 bg-white text-gray-700 px-6 pb-6 text-right rounded-b-lg', 'dark:bg-gray-900  dark:text-white/80']
    },
    mask: {
      "class": ['fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-auto', 'bg-black bg-opacity-40 transition duration-200 z-20']
    }
  },
  confirmpopup: {
    root: function root(_ref14) {
      _ref14.props;
        _ref14.state;
      return {
        "class": ['bg-white text-gray-700 border-0 rounded-md shadow-lg', 'z-40 transform origin-center', 'mt-10 absolute left-0 top-0 ',
        // 'before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-0 before:h-0 before:border-t-[10px] before:border-l-[5px] before:border-r-[5px] before:border-transparent before:border-b-[10px] before:border-t-[0] before:border-l-[5px] before:border-r-[5px] before:border-b-[0] before:border-red-500',
        'dark:border dark:border-blue-900/40 dark:bg-gray-900  dark:text-white/80']
      };
    },
    content: {
      "class": ['p-5 items-center flex']
    },
    icon: {
      "class": ['text-2xl']
    },
    message: {
      "class": ['ml-4']
    },
    footer: {
      "class": ['text-right px-5 py-5 pt-0 ']
    }
    // rejectButton: {
    //     class: ['bg-transparent text-blue-500 border-transparent', 'text-sm px-2 py-1.5 ml-0 mr-2 w-auto', 'flex items-center cursor-pointer inline-flex overflow-hidden relative text-center select-none user-select-none align-bottom']
    // },
    // acceptButton: {
    //     class: ['text-white bg-blue-500 border-2 border-blue-500', 'text-sm px-2 py-1.5 ml-0 mr-2 w-auto', 'flex items-center cursor-pointer inline-flex overflow-hidden relative text-center select-none user-select-none align-bottom']
    // }
  },

  overlaypanel: {
    root: function root(_ref15) {
      _ref15.props;
        _ref15.state;
      return {
        "class": ['bg-white text-gray-700 border-0 rounded-md shadow-lg', 'z-40 transform origin-center', 'mt-10 absolute left-0 top-0 ',
        // 'before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-0 before:h-0 before:border-t-[10px] before:border-l-[5px] before:border-r-[5px] before:border-transparent before:border-b-[10px] before:border-t-[0] before:border-l-[5px] before:border-r-[5px] before:border-b-[0] before:border-red-500',
        'dark:border dark:border-blue-900/40 dark:bg-gray-900  dark:text-white/80']
      };
    },
    content: {
      "class": ['p-5 items-center flex']
    }
  },
  sidebar: {
    root: function root(_ref16) {
      var props = _ref16.props;
        _ref16.state;
      return {
        "class": ['flex flex-col pointer-events-auto relative transform translate-x-0 translate-y-0 translate-z-0 relative transition-transform duration-300', 'bg-white text-gray-700 border-0 shadow-lg', {
          'h-full w-80': props.position == 'left' || props.position == 'right',
          'h-40 w-full': props.position == 'top' || props.position == 'bottom'
        }, 'dark:border dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80']
      };
    },
    header: {
      "class": ['flex items-center justify-end', 'p-5']
    },
    closeButton: {
      "class": ['flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0', 'hover:text-gray-700 hover:border-transparent hover:bg-gray-200', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
      // focus
      'dark:hover:text-white/80 dark:hover:text-white/80 dark:hover:border-transparent dark:hover:bg-gray-800/80 dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    closeButtonIcon: {
      "class": ['w-4 h-4 inline-block']
    },
    content: {
      "class": ['p-5 pt-0 h-full w-full', 'flex-grow overflow-y-auto']
    },
    mask: function mask(_ref17) {
      var props = _ref17.props;
        _ref17.state;
      return {
        "class": ['fixed top-0 left-0 w-full h-full flex  pointer-events-auto', 'bg-black bg-opacity-40 transition duration-200 z-20 transition-colors', {
          'justify-end': props.position == 'right',
          'items-start': props.position == 'top',
          'items-end': props.position == 'bottom'
        }]
      };
    }
  },
  toolbar: {
    root: {
      "class": ['flex items-center justify-between flex-wrap', 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-blue-900/40  p-5 rounded-md gap-2']
    },
    start: {
      "class": ['flex items-center']
    },
    center: {
      "class": ['flex items-center']
    },
    end: {
      "class": ['flex items-center']
    }
  },
  //UPLOAD

  fileupload: {
    input: {
      "class": ['hidden']
    },
    buttonbar: {
      "class": ['flex flex-wrap', 'bg-gray-50 dark:bg-gray-800 p-5 border border-solid border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 rounded-tr-lg rounded-tl-lg gap-2 border-b-0']
    },
    chooseButton: {
      "class": ['text-white bg-blue-500 border border-blue-500 p-3 px-5 rounded-md text-base', 'overflow-hidden relative']
    },
    chooseIcon: {
      "class": ['mr-2 inline-block']
    },
    chooseButtonLabel: {
      "class": ['flex-1 font-bold']
    },
    content: function content(_ref18) {
      _ref18.props;
      return {
        "class": ['relative', 'bg-white dark:bg-gray-900 p-8 border border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 rounded-b-lg']
      };
    },
    file: {
      "class": ['flex items-center flex-wrap', 'p-4 border border-gray-300 dark:border-blue-900/40 rounded gap-2 mb-2', 'last:mb-0']
    },
    thumbnail: {
      "class": ['flex-shrink-0']
    },
    fileName: {
      "class": ['mb-2']
    },
    fileSize: {
      "class": ['mr-2']
    }
  },
  //Messages

  message: {
    root: function root(_ref19) {
      var props = _ref19.props;
        _ref19.context;
      return {
        "class": ['my-4 rounded-md', {
          'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': props.severity == 'info',
          'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700': props.severity == 'success',
          'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': props.severity == 'warn',
          'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700': props.severity == 'error'
        }]
      };
    },
    wrapper: {
      "class": ['flex items-center py-5 px-7']
    },
    icon: {
      "class": ['w-6 h-6', 'text-lg mr-2']
    },
    text: {
      "class": ['text-base font-normal']
    },
    button: {
      "class": ['w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out', 'ml-auto overflow-hidden relative', 'flex items-center justify-center', 'hover:bg-white/30']
    }
  },
  inlinemessage: {
    root: function root(_ref20) {
      var props = _ref20.props;
        _ref20.context;
      return {
        "class": ['inline-flex items-center justify-center align-top', 'p-3 m-0 rounded-md', {
          'bg-blue-100 border-0 text-blue-700': props.severity == 'info',
          'bg-green-100 border-0 text-green-700': props.severity == 'success',
          'bg-orange-100 border-0 text-orange-700': props.severity == 'warn',
          'bg-red-100 border-0 text-red-700': props.severity == 'error'
        }]
      };
    },
    icon: {
      "class": ['text-base mr-2']
    }
  },
  toast: {
    root: function root(_ref21) {
      _ref21.props;
        _ref21.context;
      return {
        "class": ['w-96', 'opacity-90']
      };
    },
    container: function container(_ref22) {
      var props = _ref22.props;
        _ref22.context;
      return {
        "class": ['my-4 rounded-md w-full', {
          'bg-blue-100 border-solid border-0 border-l-4 border-blue-500 text-blue-700': props.message.severity == 'info',
          'bg-green-100 border-solid border-0 border-l-4 border-green-500 text-green-700': props.message.severity == 'success',
          'bg-orange-100 border-solid border-0 border-l-4 border-orange-500 text-orange-700': props.message.severity == 'warn',
          'bg-red-100 border-solid border-0 border-l-4 border-red-500 text-red-700': props.message.severity == 'error'
        }]
      };
    },
    content: {
      "class": ['flex items-center py-5 px-7']
    },
    icon: {
      "class": ['w-6 h-6', 'text-lg mr-2']
    },
    text: {
      "class": ['text-base font-normal flex flex-col flex-1 flex-grow-1 flex-shrink-1 ml-4']
    },
    summary: {
      "class": ['font-bold block']
    },
    detail: {
      "class": ['mt-1 block']
    },
    closebutton: {
      "class": ['w-8 h-8 rounded-full bg-transparent transition duration-200 ease-in-out', 'ml-auto overflow-hidden relative', 'flex items-center justify-center', 'hover:bg-white/30']
    }
  },
  //BUTTONS
  button: {
    root: function root(_ref23) {
      var _ref24, _ref25;
      var props = _ref23.props;
        _ref23.context;
      return {
        "class": ['items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom', 'transition duration-200 ease-in-out', {
          'text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 hover:border-blue-600': !props.link && props.severity == null && !props.text && !props.outlined && !props.plain,
          'text-blue-600 bg-transparent border-transparent': props.link
        }, {
          'text-white bg-gray-500 border border-gray-500 hover:bg-gray-600 hover:border-gray-600': props.severity == 'secondary' && !props.text && !props.outlined && !props.plain,
          'text-white bg-green-500 border border-green-500 hover:bg-green-600 hover:border-green-600': props.severity == 'success' && !props.text && !props.outlined && !props.plain,
          'text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 hover:border-blue-600': props.severity == 'info' && !props.text && !props.outlined && !props.plain,
          'text-white bg-orange-500 border border-orange-500 hover:bg-orange-600 hover:border-orange-600': props.severity == 'warning' && !props.text && !props.outlined && !props.plain,
          'text-white bg-purple-500 border border-purple-500 hover:bg-purple-600 hover:border-purple-600': props.severity == 'help' && !props.text && !props.outlined && !props.plain,
          'text-white bg-red-500 border border-red-500 hover:bg-red-600 hover:border-red-600': props.severity == 'danger' && !props.text && !props.outlined && !props.plain
        }, {
          'shadow-lg': props.raised
        }, {
          'rounded-md': !props.rounded,
          'rounded-full': props.rounded
        }, (_ref24 = {
          'bg-transparent border-transparent': props.text && !props.plain,
          'text-blue-500 hover:bg-blue-300/20': props.text && props.severity == null && !props.plain,
          'text-gray-500 hover:bg-gray-300/20': props.text && props.severity == 'secondary' && !props.plain,
          'text-green-500 hover:bg-green-300/20': props.text && props.severity == 'success' && !props.plain
        }, _defineProperty(_ref24, "text-blue-500 hover:bg-blue-300/20", props.text && props.severity == 'info' && !props.plain), _defineProperty(_ref24, 'text-orange-500 hover:bg-orange-300/20', props.text && props.severity == 'warning' && !props.plain), _defineProperty(_ref24, 'text-purple-500 hover:bg-purple-300/20', props.text && props.severity == 'help' && !props.plain), _defineProperty(_ref24, 'text-red-500 hover:bg-red-300/20', props.text && props.severity == 'danger' && !props.plain), _ref24), {
          'shadow-lg': props.raised && props.text
        }, {
          'text-gray-500 hover:bg-gray-300/20': props.plain & props.text,
          'text-gray-500 border border-gray-500 hover:bg-gray-300/20': props.plain & props.outlined,
          'text-white bg-gray-500 border border-gray-500 hover:bg-gray-600 hover:border-gray-600': props.plain & !props.outlined & !props.text
        }, (_ref25 = {
          'bg-transparent border': props.outlined && !props.plain,
          'text-blue-500 border border-blue-500 hover:bg-blue-300/20': props.outlined && props.severity == null && !props.plain,
          'text-gray-500 border border-gray-500 hover:bg-gray-300/20': props.outlined && props.severity == 'secondary' && !props.plain,
          'text-green-500 border border-green-500 hover:bg-green-300/20': props.outlined && props.severity == 'success' && !props.plain
        }, _defineProperty(_ref25, "text-blue-500 border border-blue-500 hover:bg-blue-300/20", props.outlined && props.severity == 'info' && !props.plain), _defineProperty(_ref25, 'text-orange-500 border border-orange-500 hover:bg-orange-300/20', props.outlined && props.severity == 'warning' && !props.plain), _defineProperty(_ref25, 'text-purple-500 border border-purple-500 hover:bg-purple-300/20', props.outlined && props.severity == 'help' && !props.plain), _defineProperty(_ref25, 'text-red-500 border border-red-500 hover:bg-red-300/20', props.outlined && props.severity == 'danger' && !props.plain), _ref25), {
          'px-4 py-3 text-base': props.size == null,
          'text-xs py-2 px-3': props.size == 'small',
          'text-xl py-3 px-4': props.size == 'large'
        }]
      };
    },
    label: function label(_ref26) {
      var props = _ref26.props;
      return {
        "class": ['flex-1', 'duration-200', 'font-bold', {
          'hover:underline': props.link
        }]
      };
    },
    icon: function icon(_ref27) {
      var props = _ref27.props;
      return {
        "class": ['mx-0', {
          'mr-2': props.iconPos == 'left' && props.label != null,
          'ml-2': props.iconPos == 'right' && props.label != null,
          'mb-2': props.iconPos == 'top' && props.label != null,
          'mt-2': props.iconPos == 'bottom' && props.label != null
        }]
      };
    },
    badge: function badge(_ref28) {
      var props = _ref28.props;
      return {
        "class": [{
          'ml-2 w-4 h-4 leading-none': props.badge
        }]
      };
    }
  },
  speeddial: {
    root: function root(_ref29) {
      var props = _ref29.props;
        _ref29.state;
      return {
        "class": ['absolute flex', {
          'items-center flex-col-reverse': props.direction == 'up',
          'items-center flex-col': props.direction == 'down',
          'justify-center flex-row-reverse': props.direction == 'left',
          'justify-center flex-row': props.direction == 'right'
        }]
      };
    },
    button: {
      root: {
        "class": ['w-16 h-16']
      }
    },
    menu: function menu(_ref30) {
      var props = _ref30.props;
        _ref30.context;
      return {
        "class": ['m-0 p-0 list-none flex items-center justify-center transition delay-200 pointer-events-none z-2', {
          'flex-col-reverse': props.direction == 'up',
          'flex-col': props.direction == 'down',
          'flex-row-reverse': props.direction == 'left',
          'flex-row': props.direction == 'right'
        }]
      };
    },
    menuitem: function menuitem(_ref31) {
      var props = _ref31.props;
        _ref31.context;
      return {
        "class": ['transform scale-0 opacity-0 transition-transform duration-200 ease-out delay-0 transition-opacity duration-800', {
          'my-1 first:mb-2': props.direction == 'up',
          'my-1 first:mt-2': props.direction == 'down',
          'mx-1 first:mr-2': props.direction == 'left',
          'mx-1 first:ml-2': props.direction == 'right'
        }]
      };
    },
    action: {
      "class": ['flex items-center justify-center rounded-full relative overflow-hidden', 'w-12 h-12 bg-gray-700 text-white']
    }
  },
  splitbutton: {
    root: {
      "class": ['inline-flex relative', 'rounded-md']
    },
    button: function button(_ref32) {
      _ref32.props;
        _ref32.context;
      return {
        root: {
          "class": ['first:flex-1 first:rounded-r-none first:border-r-0', 'border-r-0']
        }
      };
    }
  },
  //FORMS

  inputtext: {
    root: function root(_ref33) {
      var props = _ref33.props,
        context = _ref33.context;
      return {
        "class": ['m-0', 'font-sans text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg', {
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled
        }, {
          'text-lg px-4 py-4': props.size == 'large',
          'text-xs px-2 py-2': props.size == 'small',
          'p-3 text-base': props.size == null
        }]
      };
    }
  },
  knob: {
    root: function root(_ref34) {
      var props = _ref34.props;
      return {
        "class": ['focus:outline-none focus:outline-offset-0 focus:shadow-0', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    range: {
      "class": ['stroke-current transition duration-100 ease-in stroke-gray-200 dark:stroke-gray-700 fill-none']
    },
    value: {
      "class": ['animate-dash-frame  stroke-blue-500 fill-none']
    },
    label: {
      "class": ['text-center text-xl']
    }
  },
  inputswitch: {
    root: function root(_ref35) {
      var props = _ref35.props;
      return {
        "class": ['inline-block relative', 'w-12 h-7', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    slider: function slider(_ref36) {
      var props = _ref36.props;
      return {
        "class": ['absolute cursor-pointer top-0 left-0 right-0 bottom-0 border border-transparent', 'transition-colors duration-200 rounded-2xl', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', "before:absolute before:content-'' before:top-1/2 before:bg-white before:dark:bg-gray-900 before:w-5 before:h-5 before:left-1 before:-mt-2.5 before:rounded-full before:transition-duration-200", {
          'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 hover:dark:bg-gray-700 ': !props.modelValue,
          'bg-blue-500 before:transform before:translate-x-5': props.modelValue
        }]
      };
    }
  },
  rating: {
    root: function root(_ref37) {
      var props = _ref37.props;
      return {
        "class": ['relative flex items-center', 'gap-2', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    cancelitem: {
      "class": ['inline-flex items-center cursor-pointer']
    },
    cancelicon: {
      "class": ['text-red-500', 'w-5 h-5', 'transition duration-200 ease-in']
    },
    item: function item(_ref38) {
      var props = _ref38.props;
      return {
        "class": ['inline-flex items-center', {
          'cursor-pointer': !props.readonly,
          'cursor-default': props.readonly
        }]
      };
    },
    officon: {
      "class": ['text-gray-700 hover:text-blue-400', 'w-5 h-5', 'transition duration-200 ease-in']
    },
    onicon: {
      "class": ['text-blue-500', 'w-5 h-5', 'transition duration-200 ease-in']
    }
  },
  selectbutton: {
    root: function root(_ref39) {
      var props = _ref39.props;
      return {
        "class": [{
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    button: function button(_ref40) {
      var context = _ref40.context;
        _ref40.props;
      return {
        "class": ['inline-flex cursor-pointer select-none items-center align-bottom text-center overflow-hidden relative', 'px-4 py-3', 'transition duration-200 border border-r-0', 'first:rounded-l-md first:rounded-tr-none first:rounded-br-none last:border-r last:rounded-tl-none last:rounded-bl-none last:rounded-r-md', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-gray-300 dark:border-blue-900/40 hover:bg-gray-50 dark:hover:bg-gray-800/80 ': !context.active,
          'bg-blue-500 border-blue-500 text-white hover:bg-blue-600': context.active,
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled
        }]
      };
    },
    label: {
      "class": ['font-bold']
    }
  },
  slider: {
    root: function root(_ref41) {
      var props = _ref41.props;
      return {
        "class": ['relative', 'bg-gray-100 dark:bg-gray-800 border-0 rounded-6', {
          'h-1 w-56': props.orientation == 'horizontal',
          'w-1 h-56': props.orientation == 'vertical'
        }, {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    range: function range(_ref42) {
      var props = _ref42.props;
      return {
        "class": ['bg-blue-500', 'block absolute', {
          'top-0 left-0 h-full': props.orientation == 'horizontal',
          'bottom-0 left-0 w-full': props.orientation == 'vertical'
        }]
      };
    },
    handle: function handle(_ref43) {
      var props = _ref43.props;
      return {
        "class": ['h-4 w-4 bg-white dark:bg-gray-600 border-2 border-blue-500 rounded-full transition duration-200', 'cursor-grab touch-action-none block', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', 'hover:bg-blue-500 hover:border hover:border-blue-500', {
          'top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]': props.orientation == 'horizontal',
          'left-[50%] mb-[-0.5715rem] ml-[-0.4715rem]': props.orientation == 'vertical'
        }]
      };
    },
    starthandler: function starthandler(_ref44) {
      var props = _ref44.props;
      return {
        "class": ['h-4 w-4 bg-white dark:bg-gray-600 border-2 border-blue-500 rounded-full transition duration-200', 'cursor-grab touch-action-none block', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', 'hover:bg-blue-500 hover:border hover:border-blue-500', {
          'top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]': props.orientation == 'horizontal',
          'left-[50%] mb-[-0.5715rem] ml-[-0.4715rem]': props.orientation == 'vertical'
        }]
      };
    },
    endhandler: function endhandler(_ref45) {
      var props = _ref45.props;
      return {
        "class": ['h-4 w-4 bg-white dark:bg-gray-600 border-2 border-blue-500 rounded-full transition duration-200', 'cursor-grab touch-action-none block', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', 'hover:bg-blue-500 hover:border hover:border-blue-500', {
          'top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]': props.orientation == 'horizontal',
          'left-[50%] mb-[-0.5715rem] ml-[-0.4715rem]': props.orientation == 'vertical'
        }]
      };
    }
  },
  password: {
    root: function root(_ref46) {
      var props = _ref46.props;
      return {
        "class": ['inline-flex relative', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    panel: {
      "class": ['p-5 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 shadow-md rounded-md']
    },
    meter: {
      "class": ['mb-2 bg-gray-300 dark:bg-gray-700 h-3']
    },
    meterlabel: function meterlabel(_ref47) {
      var _instance$meter, _instance$meter2, _instance$meter3;
      var instance = _ref47.instance,
        props = _ref47.props;
      return {
        "class": ['transition-width duration-1000 ease-in-out h-full', {
          'bg-red-500': (instance === null || instance === void 0 || (_instance$meter = instance.meter) === null || _instance$meter === void 0 ? void 0 : _instance$meter.strength) == 'weak',
          'bg-orange-500': (instance === null || instance === void 0 || (_instance$meter2 = instance.meter) === null || _instance$meter2 === void 0 ? void 0 : _instance$meter2.strength) == 'medium',
          'bg-green-500': (instance === null || instance === void 0 || (_instance$meter3 = instance.meter) === null || _instance$meter3 === void 0 ? void 0 : _instance$meter3.strength) == 'strong'
        }, {
          'pr-[2.5rem] ': props.toggleMask
        }]
      };
    },
    showicon: {
      "class": ['absolute top-1/2 -mt-2', 'right-3 text-gray-600 dark:text-white/70']
    },
    hideicon: {
      "class": ['absolute top-1/2 -mt-2', 'right-3 text-gray-600 dark:text-white/70']
    }
  },
  togglebutton: {
    root: function root(_ref48) {
      var props = _ref48.props;
      return {
        "class": ['inline-flex cursor-pointer select-none items-center align-bottom text-center overflow-hidden relative', 'px-4 py-3 rounded-md text-base w-36', 'border transition duration-200 ease-in-out', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:border-gray-300 dark:hover:bg-gray-800/70 hover:text-gray-700 dark:hover:text-white/80': !props.modelValue,
          'bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600': props.modelValue
        }, {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    label: {
      "class": ['font-bold text-center w-full']
    },
    icon: function icon(_ref49) {
      var props = _ref49.props;
      return {
        "class": [' mr-2', {
          'text-gray-600 dark:text-white/70': !props.modelValue,
          'text-white': props.modelValue
        }]
      };
    }
  },
  tristatecheckbox: {
    root: {
      "class": ['cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6']
    },
    checkbox: function checkbox(_ref50) {
      var props = _ref50.props;
      return {
        "class": ['flex items-center justify-center', 'border-2 w-6 h-6 rounded-lg transition-colors duration-200', {
          'border-blue-500 bg-blue-500 text-white dark:border-blue-400 dark:bg-blue-400': props.modelValue || !props.modelValue,
          'border-gray-300 text-gray-600 bg-white dark:border-blue-900/40 dark:bg-gray-900': props.modelValue == null
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        }]
      };
    }
  },
  checkbox: {
    root: function root(_ref51) {
      _ref51.props;
      return {
        "class": ['cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6']
      };
    },
    input: function input(_ref52) {
      var props = _ref52.props,
        context = _ref52.context;
      return {
        "class": ['flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200', {
          'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900': !context.checked,
          'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400': context.checked
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        }]
      };
    },
    icon: {
      "class": ['w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900']
    }
  },
  radiobutton: {
    root: function root(_ref53) {
      _ref53.props;
      return {
        "class": ['relative inline-flex cursor-pointer select-none align-bottom', 'w-6 h-6']
      };
    },
    input: function input(_ref54) {
      var props = _ref54.props;
      return {
        "class": ['flex justify-center items-center', 'border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out', {
          'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900': props.value !== props.modelValue,
          'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400': props.value == props.modelValue
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        }]
      };
    },
    icon: function icon(_ref55) {
      var props = _ref55.props;
      return {
        "class": ['transform rounded-full', 'block w-3 h-3 transition duration-200 bg-white dark:bg-gray-900', {
          'backface-hidden scale-10 invisible': props.value !== props.modelValue,
          'transform scale-100 visible': props.value == props.modelValue
        }]
      };
    }
  },
  dropdown: {
    root: function root(_ref56) {
      var props = _ref56.props;
      return {
        "class": ['cursor-pointer inline-flex relative select-none', 'bg-white border border-gray-400 transition-colors duration-200 ease-in-out rounded-md', 'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300', 'w-full md:w-56', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    input: function input(_ref57) {
      var props = _ref57.props;
      return {
        "class": ['cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative', 'bg-transparent border-0 text-gray-800', 'dark:text-white/80', 'p-3 transition duration-200 bg-transparent rounded appearance-none font-sans text-base', 'focus:outline-none focus:shadow-none', {
          'pr-7': props.showClear
        }]
      };
    },
    trigger: {
      "class": ['flex items-center justify-center flex-shrink-0', 'bg-transparent text-gray-500 w-12 rounded-tr-lg rounded-br-lg']
    },
    wrapper: {
      "class": ['max-h-[200px] overflow-auto', 'bg-white text-gray-700 border-0 rounded-md shadow-lg', 'dark:bg-gray-900 dark:text-white/80']
    },
    list: {
      "class": ['py-3 list-none m-0']
    },
    item: function item(_ref58) {
      var context = _ref58.context;
      return {
        "class": ['cursor-pointer font-normal overflow-hidden relative whitespace-nowrap', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', 'dark:text-white/80 dark:hover:bg-gray-800', 'hover:text-gray-700 hover:bg-gray-200', {
          'text-gray-700 bg-transparent': !context.selected,
          'text-blue-600 bg-blue-50 hover:text-blue-600 hover:bg-blue-100 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-700': context.selected
        }]
      };
    },
    itemgroup: {
      "class": ['m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto']
    },
    header: {
      "class": ['p-3 border-b border-gray-300 text-gray-700 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg', 'dark:bg-gray-800 dark:text-white/80 dark:border-blue-900/40']
    },
    filtercontainer: {
      "class": ['relative']
    },
    filterinput: {
      "class": ['pr-7 -mr-7', 'w-full', 'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    filtericon: {
      "class": ['-mt-2 absolute top-1/2']
    },
    clearicon: {
      "class": ['text-gray-500 right-12 -mt-2 absolute top-1/2']
    }
  },
  calendar: {
    root: {
      "class": ['inline-flex max-w-full relative']
    },
    input: {
      "class": ['font-sans text-base text-gray-600 bg-white p-3 border border-gray-300 transition-colors duration-200 appearance-none rounded-lg', 'hover:border-blue-500 ']
    },
    panel: {
      "class": ['bg-white border-0 shadow-md', 'absolute min-w-[350px]']
    },
    header: {
      "class": ['flex items-center justify-between', 'p-2 text-gray-700 bg-white font-semibold m-0 border-b border-gray-300 rounded-t-lg']
    },
    previousbutton: {
      "class": ['flex items-center justify-center cursor-pointer overflow-hidden relative', 'w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out', 'hover:text-gray-700 hover:border-transparent hover:bg-gray-200']
    },
    title: {
      "class": ['leading-8 mx-auto']
    },
    monthTitle: {
      "class": ['text-gray-700 transition duration-200 font-semibold p-2', 'mr-2', 'hover:text-blue-500']
    },
    yearTitle: {
      "class": ['text-gray-700 transition duration-200 font-semibold p-2', 'hover:text-blue-500']
    },
    nextbutton: {
      "class": ['flex items-center justify-center cursor-pointer overflow-hidden relative', 'w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition-colors duration-200 ease-in-out', 'hover:text-gray-700 hover:border-transparent hover:bg-gray-200']
    },
    table: {
      "class": ['border-collapse w-full', 'my-2']
    },
    tableheadercell: {
      "class": ['p-2']
    },
    day: {
      "class": ['p-2']
    },
    daylabel: {
      "class": ['w-10 h-10 rounded-full transition-shadow duration-200 border-transparent border', 'flex items-center cursor-pointer justify-center mx-auto overflow-hidden relative']
    }
  },
  listbox: {
    root: function root(_ref59) {
      _ref59.props;
      return {
        "class": ['bg-white dark:bg-gray-900 border border-gray-400 dark:border-blue-900/40 transition-colors duration-200 ease-in-out rounded-md', 'w-full md:w-56']
      };
    },
    wrapper: {
      "class": ['overflow-auto']
    },
    list: {
      "class": ['py-3 list-none m-0']
    },
    item: function item(_ref60) {
      var context = _ref60.context;
      return {
        "class": ['cursor-pointer font-normal overflow-hidden relative whitespace-nowrap', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', 'dark:text-white/80 dark:hover:bg-gray-800', 'hover:text-gray-700 hover:bg-gray-200', {
          'text-gray-700 bg-transparent': !context.selected,
          'text-blue-600 bg-blue-50 hover:text-blue-600 hover:bg-blue-100 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-700': context.selected
        }]
      };
    },
    itemgroup: {
      "class": ['m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto']
    },
    header: {
      "class": ['p-3 border-b border-gray-300 text-gray-700 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg', 'dark:bg-gray-800 dark:text-white/80 dark:border-blue-900/40']
    },
    filtercontainer: {
      "class": ['relative']
    },
    filterinput: {
      "class": ['pr-7 -mr-7', 'w-full', 'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    filtericon: {
      "class": ['-mt-2 absolute top-1/2']
    }
  },
  multiselect: {
    root: function root(_ref61) {
      var props = _ref61.props;
      return {
        "class": ['inline-flex cursor-pointer select-none', 'bg-white dark:bg-gray-900 border border-gray-400 dark:border-blue-900/40  transition-colors duration-200 ease-in-out rounded-md', 'w-full md:w-80', {
          'opacity-60 select-none pointer-events-none cursor-default': props === null || props === void 0 ? void 0 : props.disabled
        }]
      };
    },
    labelContainer: {
      "class": ['overflow-hidden flex flex-auto cursor-pointer']
    },
    label: function label(_ref62) {
      var props = _ref62.props;
        _ref62.parent;
        _ref62.context;
      return {
        "class": ['block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis', 'text-gray-800 dark:text-white/80', 'p-3 transition duration-200', _defineProperty({
          '!p-3': props.display !== 'chip' && ((props === null || props === void 0 ? void 0 : props.modelValue) == null || (props === null || props === void 0 ? void 0 : props.modelValue) == undefined),
          '!py-1.5 px-3': props.display == 'chip' && (props === null || props === void 0 ? void 0 : props.modelValue) !== null
        }, "!p-3", props.display == 'chip' && (props === null || props === void 0 ? void 0 : props.modelValue) == null)]
      };
    },
    token: {
      "class": ['py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full', 'cursor-default inline-flex items-center']
    },
    removeTokenIcon: {
      "class": ['ml-2']
    },
    trigger: {
      "class": ['flex items-center justify-center flex-shrink-0', 'bg-transparent text-gray-600 dark:text-white/70 w-12 rounded-tr-lg rounded-br-lg']
    },
    panel: {
      "class": ['bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg']
    },
    header: {
      "class": ['p-3 border-b border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-800 rounded-t-lg', 'flex items-center justify-between']
    },
    headerCheckboxContainer: {
      "class": ['inline-flex cursor-pointer select-none align-bottom relative', 'mr-2', 'w-6 h-6']
    },
    headerCheckbox: function headerCheckbox(_ref64) {
      _ref64.props;
        var context = _ref64.context;
      return {
        "class": ['flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 dark:text-white/70 rounded-lg transition-colors duration-200', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900': !(context !== null && context !== void 0 && context.selected),
          'border-blue-500 bg-blue-500': context === null || context === void 0 ? void 0 : context.selected
        }]
      };
    },
    headercheckboxicon: {
      "class": ['w-4 h-4 transition-all duration-200 text-white text-base']
    },
    closeButton: {
      "class": ['flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 dark:text-white/70 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0', 'hover:text-gray-700 dark:hover:text-white/80 hover:border-transparent hover:bg-gray-200 dark:hover:bg-gray-800/80 ', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    closeButtonIcon: {
      "class": ['w-4 h-4 inline-block']
    },
    wrapper: {
      "class": ['max-h-[200px] overflow-auto', 'bg-white text-gray-700 border-0 rounded-md shadow-lg', 'dark:bg-gray-900 dark:text-white/80']
    },
    list: {
      "class": ['py-3 list-none m-0']
    },
    item: function item(_ref65) {
      var context = _ref65.context;
      return {
        "class": ['cursor-pointer font-normal overflow-hidden relative whitespace-nowrap', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', 'dark:text-white/80 dark:hover:bg-gray-800', 'hover:text-gray-700 hover:bg-gray-200', {
          'text-gray-700 bg-transparent': !context.selected,
          'text-blue-600 bg-blue-50 hover:text-blue-600 hover:bg-blue-100 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-700': context.selected
        }]
      };
    },
    checkboxContainer: {
      "class": ['inline-flex cursor-pointer select-none align-bottom relative', 'mr-2', 'w-6 h-6']
    },
    checkbox: function checkbox(_ref66) {
      var context = _ref66.context;
      return {
        "class": ['flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 dark:text-white/80 rounded-lg transition-colors duration-200', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900': !(context !== null && context !== void 0 && context.selected),
          'border-blue-500 bg-blue-500': context === null || context === void 0 ? void 0 : context.selected
        }]
      };
    },
    checkboxicon: {
      "class": ['w-4 h-4 transition-all duration-200 text-white text-base']
    },
    itemgroup: {
      "class": ['m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto']
    },
    filtercontainer: {
      "class": ['relative']
    },
    filterinput: {
      "class": ['pr-7 -mr-7', 'w-full', 'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none', 'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-white/80', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    filtericon: {
      "class": ['-mt-2 absolute top-1/2']
    },
    clearicon: {
      "class": ['text-gray-500 right-12 -mt-2 absolute top-1/2']
    }
  },
  textarea: {
    root: function root(_ref67) {
      var context = _ref67.context;
      return {
        "class": ['m-0', 'font-sans text-base text-gray-600 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'opacity-60 select-none pointer-events-none cursor-default': context.disabled
        }]
      };
    }
  },
  treeselect: {
    root: function root(_ref68) {
      var props = _ref68.props;
      return {
        "class": ['inline-flex cursor-pointer select-none', 'bg-white dark:bg-gray-900 border border-gray-400 dark:border-blue-900/40  transition-colors duration-200 ease-in-out rounded-md', 'w-full md:w-80', {
          'opacity-60 select-none pointer-events-none cursor-default': props === null || props === void 0 ? void 0 : props.disabled
        }]
      };
    },
    labelContainer: {
      "class": ['overflow-hidden flex flex-auto cursor-pointer']
    },
    label: function label(_ref69) {
      _ref69.props;
      return {
        "class": ['block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis', 'text-gray-800 dark:text-white/80', 'p-3 transition duration-200']
      };
    },
    trigger: {
      "class": ['flex items-center justify-center flex-shrink-0', 'bg-transparent text-gray-600 dark:text-white/70 w-12 rounded-tr-lg rounded-br-lg']
    },
    panel: {
      "class": ['bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg']
    },
    wrapper: {
      "class": ['max-h-[200px] overflow-auto', 'bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-0 rounded-md shadow-lg']
    }
  },
  autocomplete: {
    root: function root(_ref70) {
      var props = _ref70.props;
      return {
        "class": ['relative inline-flex', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }, {
          'w-full': props.multiple
        }]
      };
    },
    container: {
      "class": ['m-0 list-none cursor-text overflow-hidden flex items-center flex-wrap w-full', 'px-3 py-2 gap-2', 'font-sans text-base text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40  transition duration-200 ease-in-out appearance-none rounded-md', 'focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] hover:border-blue-500 focus:outline-none dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    inputtoken: {
      "class": ['py-0.375rem px-0', 'flex-1 inline-flex']
    },
    input: function input(_ref71) {
      var props = _ref71.props;
      return {
        "class": ['m-0', ' transition-colors duration-200 appearance-none rounded-lg', ' ', {
          'rounded-tr-none rounded-br-none': props.dropdown
        }, {
          'font-sans text-base text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)] hover:border-blue-500 focus:outline-none': !props.multiple,
          'font-sans text-base text-gray-700 dark:text-white/80 border-0 outline-none bg-transparent m-0 p-0 shadow-none rounded-none w-full': props.multiple
        }]
      };
    },
    token: {
      "class": ['py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full', 'cursor-default inline-flex items-center']
    },
    dropdownbutton: {
      root: {
        "class": ['rounded-tl-none rounded-bl-none']
      }
    },
    panel: {
      "class": ['bg-white text-gray-700 border-0 rounded-md shadow-lg', 'max-h-[200px] overflow-auto', 'bg-white text-gray-700 border-0 rounded-md shadow-lg', 'dark:bg-gray-900 dark:text-white/80']
    },
    list: {
      "class": ['py-3 list-none m-0']
    },
    item: function item(_ref72) {
      var context = _ref72.context;
      return {
        "class": ['cursor-pointer font-normal overflow-hidden relative whitespace-nowrap', 'm-0 p-3 border-0  transition-shadow duration-200 rounded-none', 'dark:text-white/80 dark:hover:bg-gray-800', 'hover:text-gray-700 hover:bg-gray-200', {
          'text-gray-700 bg-transparent': !context.selected,
          'text-blue-600 bg-blue-50 hover:text-blue-600 hover:bg-blue-100 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-700': context.selected
        }]
      };
    },
    itemgroup: {
      "class": ['m-0 p-3 text-gray-800 bg-white font-bold', 'dark:bg-gray-900 dark:text-white/80', 'cursor-auto']
    }
  },
  chips: {
    root: function root(_ref73) {
      var props = _ref73.props;
      return {
        "class": ['flex', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    container: {
      "class": ['m-0 py-1.5 px-3 list-none cursor-text overflow-hidden flex items-center flex-wrap', 'w-full', 'm-0', 'font-sans text-base text-gray-600 dark:text-white/70 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    inputtoken: {
      "class": ['py-1.5 px-0', 'flex flex-1 inline-flex']
    },
    input: {
      "class": ['font-sans text-base text-gray-700 dark:text-white/80 p-0 m-0', 'border-0 outline-none bg-transparent shadow-none rounded-none w-full']
    },
    token: {
      "class": ['py-1 px-2 mr-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white/80 rounded-full', 'cursor-default inline-flex items-center']
    },
    removeTokenIcon: {
      "class": ['ml-2']
    }
  },
  colorpicker: {
    root: function root(_ref74) {
      var props = _ref74.props;
      return {
        "class": ['inline-block', {
          'opacity-60 select-none pointer-events-none cursor-default': props.disabled
        }]
      };
    },
    input: {
      "class": ['m-0', 'font-sans text-base text-gray-600 bg-white dark:bg-gray-900 p-3 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 rounded-lg cursor-pointer', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', 'w-8 h-8']
    },
    panel: function panel(_ref75) {
      var props = _ref75.props;
      return {
        "class": ['shadow-md', 'bg-gray-800 border-gray-900', {
          'relative h-48 w-52': props.inline,
          'absolute h-48 w-52': !props.inline
        }]
      };
    },
    selector: {
      "class": ['absolute h-44 w-40 top-2 left-2']
    },
    color: {
      "class": ['h-44 w-40'],
      style: 'background: linear-gradient(to top, #000 0%, rgb(0 0 0 / 0) 100%), linear-gradient(to right, #fff 0%, rgb(255 255 255 / 0) 100%)'
    },
    colorhandle: {
      "class": ['rounded-full border border-solid cursor-pointer h-3 w-3 absolute  opacity-85', 'border-white']
    },
    hue: {
      "class": ['h-44 w-6 absolute top-2 left-44 opacity-85'],
      style: 'background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)'
    },
    huehandle: {
      "class": ['border-solid border-2 cursor-pointer h-2 w-8 left-0 -ml-1 -mt-1 opacity-85 absolute']
    }
  },
  editor: {
    toolbar: {
      "class": ['bg-gray-100 rounded-tr-md rounded-tl-md', 'border border-gray-300 box-border font-sans px-2 py-1']
    },
    formats: {
      "class": ['inline-block align-middle', 'mr-4']
    },
    header: {
      "class": ['text-gray-700 inline-block float-left text-base font-medium h-6 relative align-middle', 'w-28', 'border-0 text-gray-600']
    }
  },
  //MISC

  badge: {
    root: function root(_ref76) {
      var props = _ref76.props;
      return {
        "class": ['rounded-full p-0 text-center inline-block', 'bg-blue-500 text-white font-bold', {
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
        }]
      };
    }
  },
  avatar: {
    root: function root(_ref77) {
      var props = _ref77.props,
        parent = _ref77.parent;
      return {
        "class": ['flex items-center justify-center', 'bg-gray-300 dark:bg-gray-800', {
          'rounded-lg': props.shape == 'square',
          'rounded-full': props.shape == 'circle'
        }, {
          'text-base h-8 w-8': props.size == null || props.size == 'normal',
          'w-12 h-12 text-xl': props.size == 'large',
          'w-16 h-16 text-2xl': props.size == 'xlarge'
        }, {
          '-ml-4 border-2 border-white dark:border-gray-900': parent.instance.$css !== undefined,
          '': !(parent.instance.$css !== undefined)
        }]
      };
    },
    image: {
      "class": ['h-full w-full']
    }
  },
  avatargroup: {
    root: {
      "class": ['flex items-center']
    }
  },
  chip: {
    root: {
      "class": ['inline-flex items-center', 'bg-gray-200 text-gray-800 rounded-[16px] px-3 dark:text-white/80 dark:bg-gray-900']
    },
    label: {
      "class": ['leading-6 mt-1.5 mb-1.5']
    },
    icon: {
      "class": ['leading-6 mr-2']
    },
    image: {
      "class": ['w-9 h-9 ml-[-0.75rem] mr-2', 'rounded-full']
    },
    removeIcon: {
      "class": ['ml-2 rounded-md transition duration-200 ease-in-out', 'cursor-pointer leading-6']
    }
  },
  progressbar: {
    root: function root(_ref78) {
      _ref78.props;
      return {
        "class": ['overflow-hidden relative', 'border-0 h-6 bg-gray-200 rounded-md dark:bg-gray-800']
      };
    },
    value: function value(_ref79) {
      var props = _ref79.props;
      return {
        "class": ['transition-width duration-1000 ease-in-out', 'items-center border-0 flex h-full justify-center overflow-hidden absolute w-0', 'border-0 m-0 bg-blue-500', {
          'before:absolute before:top-0 before:left-0 before:bottom-0 before:bg-inherit after:absolute after:top-0 after:left-0 after:bottom-0 after:bg-inherit': props.mode == 'indeterminate'
        }]
      };
    },
    label: {
      "class": ['inline-flex', 'text-white leading-6']
    }
  },
  progressspinner: {
    root: {
      "class": ['relative mx-auto w-28 h-28 inline-block', 'before:block before:pt-full']
    },
    spinner: {
      "class": ['absolute top-0 bottom-0 left-0 right-0 m-auto w-full h-full transform origin-center animate-spin']
    },
    circle: {
      "class": ['text-red-500 stroke-current']
    }
  },
  skeleton: {
    root: function root(_ref80) {
      var props = _ref80.props;
      return {
        "class": ['overflow-hidden', '!mb-2', 'bg-gray-300 dark:bg-gray-800', 'after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:content after:w-full after:h-full after:bg-blue-400 after:left-full after:transform after:translate-x-full after:z-10 after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent animate-pulse', {
          'rounded-md': props.shape !== 'circle',
          'rounded-full': props.shape == 'circle'
        }]
      };
    }
  },
  tag: {
    root: function root(_ref81) {
      var props = _ref81.props;
      return {
        "class": ['inline-flex items-center justify-center', 'bg-blue-500 text-white text-xs font-semibold px-2 py-1 ', {
          'bg-gray-500 ': props.severity == 'secondary',
          'bg-green-500 ': props.severity == 'success',
          'bg-blue-500 ': props.severity == 'info',
          'bg-orange-500 ': props.severity == 'warning',
          'bg-purple-500 ': props.severity == 'help',
          'bg-red-500 ': props.severity == 'danger'
        }, {
          'rounded-md': !props.rounded,
          'rounded-full': props.rounded
        }]
      };
    },
    value: {
      "class": ['leading-6']
    },
    icon: {
      "class": ['mr-1 text-sm']
    }
  },
  inplace: {
    display: function display(_ref82) {
      _ref82.props;
      return {
        "class": ['p-3 rounded-md transition duration-200 ', 'inline cursor-pointer', 'hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-800/80 dark:hover:text-white/80']
      };
    }
  },
  scrolltop: {
    root: function root(_ref83) {
      _ref83.props;
      return {
        "class": ['fixed bottom-20 right-20 flex items-center justify-center', 'bg-blue-500 text-white rounded-md h-8 w-8', 'ml-auto']
      };
    }
  },
  terminal: {
    root: function root(_ref84) {
      _ref84.props;
      return {
        "class": ['border border-gray-300 p-5', 'bg-gray-900 text-white dark:border-blue-900/40 ', 'h-72 overflow-auto']
      };
    },
    container: {
      "class": ['flex items-center']
    },
    prompt: {
      "class": ['text-yellow-400']
    },
    commandtext: {
      "class": ['flex-1 flex-shrink-1 flex-grow-0 border-0 bg-transparent text-inherit p-0 outline-none']
    }
  },
  //MENU
  breadcrumb: {
    root: {
      "class": ['overflow-x-auto', 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 rounded-md p-4']
    },
    menu: {
      "class": ['m-0 p-0 list-none flex items-center flex-nowrap']
    },
    action: {
      "class": ['text-decoration-none flex items-center', 'transition-shadow duration-200 rounded-md text-gray-600 dark:text-white/70', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    icon: {
      "class": ['text-gray-600 dark:text-white/70']
    },
    separator: {
      "class": ['mx-2 text-gray-600 dark:text-white/70', 'flex items-center']
    }
  },
  contextmenu: {
    root: {
      "class": ['py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-none shadow-md rounded-lg w-52']
    },
    menu: {
      "class": ['m-0 p-0 list-none', 'outline-none']
    },
    menuitem: {
      "class": ['relative']
    },
    content: {
      "class": ['text-gray-700 dark:text-white/80 transition-shadow duration-200 rounded-none', 'hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80']
    },
    action: {
      "class": ['cursor-pointer flex items-center no-underline overflow-hidden relative', 'text-gray-700 dark:text-white/80 py-3 px-5 select-none']
    },
    icon: {
      "class": ['text-gray-600 dark:text-white/70 mr-2']
    },
    label: {
      "class": ['text-gray-600 dark:text-white/70']
    }
  },
  dock: {
    root: function root(_ref85) {
      var props = _ref85.props;
      return {
        "class": ['absolute z-1 flex justify-center items-center pointer-events-none', {
          'left-0 bottom-0 w-full': props.position == 'bottom',
          'left-0 top-0 w-full': props.position == 'top',
          'left-0 top-0 h-full': props.position == 'left',
          'right-0 top-0 h-full': props.position == 'right'
        }]
      };
    },
    container: {
      "class": ['flex pointer-events-auto', 'bg-white/10 border-white/20 p-2 border rounded-md']
    },
    menu: function menu(_ref86) {
      var props = _ref86.props;
      return {
        "class": ['m-0 p-0 list-none flex items-center justify-center', 'outline-none', {
          'flex-col': props.position == 'left' || props.position == 'right'
        }]
      };
    },
    menuitem: function menuitem(_ref87) {
      var props = _ref87.props,
        context = _ref87.context,
        instance = _ref87.instance;
      return {
        "class": ['p-2 rounded-md', 'transition-all duration-200 ease-cubic-bezier-will-change-transform transform ', {
          'origin-bottom hover:mx-6': props.position == 'bottom',
          'origin-top hover:mx-6': props.position == 'top',
          'origin-left hover:my-6': props.position == 'left',
          'origin-right hover:my-6': props.position == 'right'
        }, {
          'hover:scale-150': instance.currentIndex === context.index,
          'scale-125': instance.currentIndex - 1 === context.index || instance.currentIndex + 1 === context.index,
          'scale-110': instance.currentIndex - 2 === context.index || instance.currentIndex + 2 === context.index
        }]
      };
    },
    action: {
      "class": ['flex flex-col items-center justify-center relative overflow-hidden cursor-default', 'w-16 h-16']
    }
  },
  menu: {
    root: {
      "class": ['py-1 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40 rounded-md w-48']
    },
    menu: {
      "class": ['m-0 p-0 list-none', 'outline-none']
    },
    content: {
      "class": ['text-gray-700 dark:text-white/80 transition-shadow duration-200 rounded-none', 'hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80']
    },
    action: {
      "class": ['text-gray-700 dark:text-white/80 py-3 px-5 select-none', 'cursor-pointer flex items-center no-underline overflow-hidden relative']
    },
    icon: {
      "class": ['text-gray-600 dark:text-white/70 mr-2"']
    },
    submenuheader: {
      "class": ['m-0 p-3 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-bold rounded-tl-none rounded-tr-none']
    }
  },
  menubar: {
    root: {
      "class": ['p-2 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40 rounded-md', 'flex items-center relative']
    },
    menu: function menu(_ref88) {
      var props = _ref88.props;
        _ref88.context;
      return {
        "class": ['m-0 sm:p-0 list-none', 'outline-none', 'sm:flex items-center flex-wrap sm:flex-row sm:top-auto sm:left-auto sm:relative sm:bg-transparent sm:shadow-none sm:w-auto', 'flex-col top-full left-0', 'absolute py-1 bg-white dark:bg-gray-900 border-0 shadow-md w-full', {
          'hidden ': !(props !== null && props !== void 0 && props.mobileActive),
          'flex ': props === null || props === void 0 ? void 0 : props.mobileActive
        }]
      };
    },
    menuitem: function menuitem(_ref89) {
      _ref89.props;
        _ref89.context;
      return {
        "class": ['sm:relative sm:w-auto', 'w-full static']
      };
    },
    content: function content(_ref90) {
      var props = _ref90.props,
        context = _ref90.context;
      return {
        "class": [' transition-shadow duration-200', {
          'rounded-md': props.root,
          '': !props.root
        }, {
          'text-gray-700 dark:text-white/80 hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.active,
          'text-blue-600 bg-blue-100': context.active
        }]
      };
    },
    action: function action(_ref91) {
      _ref91.props;
        _ref91.context;
      return {
        "class": ['select-none', 'cursor-pointer flex items-center no-underline overflow-hidden relative', 'py-3 px-5 select-none']
      };
    },
    icon: function icon(_ref92) {
      _ref92.props;
        var context = _ref92.context;
      return {
        "class": ['mr-2', {
          'text-gray-600 dark:text-white/70': !context.active,
          'text-blue-600': context.active
        }]
      };
    },
    submenuicon: function submenuicon(_ref93) {
      var props = _ref93.props,
        context = _ref93.context;
      return {
        "class": [{
          'text-gray-600 dark:text-white/70': !context.active,
          'text-blue-600': context.active
        }, {
          'ml-2': props.root,
          'ml-auto': !props.root
        }]
      };
    },
    submenu: function submenu(_ref94) {
      var props = _ref94.props;
        _ref94.context;
      return {
        "class": ['py-1 bg-white dark:bg-gray-900 border-0  sm:shadow-md sm:w-48', 'w-full static shadow-none', 'sm:absolute z-10', 'm-0 list-none', {
          'sm:absolute sm:left-full sm:top-0': props.level > 1
        }]
      };
    },
    separator: {
      "class": ['border-t border-gray-300 dark:border-blue-900/40 my-1']
    },
    button: {
      "class": ['flex sm:hidden w-8 h-8 rounded-full text-gray-600 dark:text-white/80 transition duration-200 ease-in-out', 'cursor-pointer flex items-center justify-center no-underline', 'hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80 ', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    }
  },
  megamenu: {
    root: function root(_ref95) {
      var props = _ref95.props;
        _ref95.context;
      return {
        "class": ['bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40  rounded-md', 'flex relative', {
          'p-2 items-center': props.orientation == 'horizontal',
          'flex-col w-48 p-0 py-1': props.orientation !== 'horizontal'
        }]
      };
    },
    menu: function menu(_ref96) {
      _ref96.props;
        _ref96.context;
      return {
        "class": ['m-0 sm:p-0 list-none relative', 'outline-none', 'flex items-center flex-wrap flex-row top-auto left-auto relative bg-transparent shadow-none w-auto']
      };
    },
    menuitem: function menuitem(_ref97) {
      var props = _ref97.props;
        _ref97.context;
      return {
        "class": ['relative', {
          'w-auto': props.horizontal,
          'w-full': !props.horizontal
        }]
      };
    },
    content: function content(_ref98) {
      var props = _ref98.props,
        context = _ref98.context;
      return {
        "class": ['transition-shadow duration-200', {
          'rounded-md': props.level < 1 && props.horizontal
        }, {
          'text-gray-700 dark:text-white/80 hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.active,
          'text-blue-600 bg-blue-100': context.active
        }]
      };
    },
    action: function action(_ref99) {
      _ref99.props;
        _ref99.context;
      return {
        "class": ['select-none', 'cursor-pointer flex items-center no-underline overflow-hidden relative', 'py-3 px-5 select-none']
      };
    },
    icon: function icon(_ref100) {
      _ref100.props;
        var context = _ref100.context;
      return {
        "class": ['mr-2', {
          'text-gray-600 dark:text-white/70': !context.active,
          'text-blue-600': context.active
        }]
      };
    },
    submenuicon: function submenuicon(_ref101) {
      var props = _ref101.props;
        _ref101.context;
      return {
        "class": [{
          'ml-2': props.horizontal,
          'ml-auto': !props.horizontal
        }]
      };
    },
    panel: function panel(_ref102) {
      var props = _ref102.props;
        _ref102.context;
      return {
        "class": ['py-1 bg-white dark:bg-gray-900 border-0 shadow-md w-auto', 'absolute z-10', {
          'left-full top-0': !props.horizontal
        }]
      };
    },
    grid: {
      "class": ['flex']
    },
    column: {
      "class": ['w-1/2']
    },
    submenu: {
      "class": ['m-0 list-none', 'py-1 w-48']
    },
    submenuheader: {
      "class": ['m-0 py-3 px-5 text-gray-700 dark:text-white/80 bg-white dark:bg-gray-900 font-semibold rounded-tr-md rounded-tl-md']
    }
  },
  panelmenu: {
    root: function root(_ref103) {
      _ref103.props;
        _ref103.instance;
      return {
        "class": ['w-full md:w-[25rem]']
      };
    },
    panel: {
      "class": ['mb-1']
    },
    header: {
      "class": ['outline-none']
    },
    headercontent: {
      "class": ['border border-solid border-gray-300 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-gray-900 rounded-md transition-shadow duration-200', 'hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-700 dark:hover:text-white/80', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    headeraction: {
      "class": ['flex items-center select-none cursor-pointer relative no-underline', 'text-gray-700 dark:text-white/80 p-5 font-bold']
    },
    submenuicon: {
      "class": ['mr-2']
    },
    headericon: {
      "class": ['mr-2']
    },
    menucontent: {
      "class": ['py-1 border border-t-0 border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 rounded-t-none rounded-br-md rounded-bl-md']
    },
    menu: {
      "class": ['outline-none', 'm-0 p-0 list-none']
    },
    content: {
      "class": ['text-gray-700 dark:text-white/80 transition-shadow duration-200 border-none rounded-none', 'hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-700 dark:hover:text-white/80']
    },
    action: {
      "class": ['text-gray-700 dark:text-white/80 py-3 px-5 select-none', 'flex items-center cursor-pointer no-underline relative overflow-hidden']
    },
    icon: {
      "class": ['mr-2']
    },
    submenu: {
      "class": ['p-0 pl-4 m-0 list-none']
    }
  },
  steps: {
    root: {
      "class": ['relative']
    },
    menu: {
      "class": ['p-0 m-0 list-none flex']
    },
    menuitem: function menuitem(_ref104) {
      _ref104.props;
      return {
        "class": ['relative flex justify-center flex-1 overflow-hidden', 'before:border-t before:border-gray-300 before:dark:border-blue-900/40 before:w-full before:absolute before:top-1/4 before:left-0 before:transform before:-translate-y-1/2']
      };
    },
    action: {
      "class": ['inline-flex flex-col items-center overflow-hidden', 'transition-shadow rounded-md bg-white dark:bg-transparent', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    step: {
      "class": ['flex items-center justify-center', 'text-gray-700 dark:text-white/80 border border-gray-300 dark:border-blue-900/40  bg-white dark:bg-gray-900 w-[2rem] h-[2rem] leading-2rem text-sm z-10 rounded-full']
    },
    label: {
      "class": ['block', 'whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full', 'mt-2 text-gray-500 dark:text-white/60']
    }
  },
  tabmenu: {
    root: {
      "class": ['overflow-x-auto']
    },
    menu: {
      "class": ['flex m-0 p-0 list-none flex-nowrap', 'bg-white border-solid border-gray-300 border-b-2', 'outline-none no-underline text-base list-none']
    },
    menuitem: {
      "class": ['mr-0']
    },
    action: function action(_ref105) {
      _ref105.props;
        _ref105.context;
      return {
        "class": ['cursor-pointer select-none flex items-center relative no-underline overflow-hidden', 'border-b-2 border-gray-300 bg-white text-gray-600 p-5 font-bold rounded-t-lg ', 'hover:bg-white  hover:border-gray-400 hover:text-gray-600'],
        style: 'top:2px'
      };
    },
    icon: {
      "class": ['mr-2']
    }
  },
  tieredmenu: {
    root: {
      "class": ['py-1 bg-white border border-gray-300 rounded-lg w-[12.5rem]', 'dark:border-blue-900/40 dark:bg-gray-900']
    },
    menu: {
      "class": ['outline-none', 'm-0 p-0 list-none']
    },
    menuitem: {
      "class": ['relative']
    },
    content: function content(_ref106) {
      _ref106.props;
        _ref106.context;
      return {
        "class": ['transition-shadow duration-200 border-none rounded-none', 'hover:bg-gray-200 hover:text-gray-700 dark:hover:text-white/80 dark:hover:bg-gray-800/80']
      };
    },
    action: function action(_ref107) {
      _ref107.props;
        var context = _ref107.context;
      return {
        "class": ['py-3 px-5 select-none', 'flex items-center cursor-pointer no-underline relative overflow-hidden', {
          'text-gray-700 dark:text-white/80 hover:text-gray-700 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80': !context.active,
          'text-blue-600 bg-blue-100': context.active
        }]
      };
    },
    icon: {
      "class": ['mr-2']
    },
    submenuicon: {
      "class": ['ml-auto']
    },
    separator: {
      "class": ['border-t border-gray-300 my-1 dark:border-blue-900/40']
    },
    submenu: {
      "class": ['py-1 bg-white dark:bg-gray-900 border-0 shadow-md min-w-full', 'absolute z-10', 'left-full top-0']
    }
  },
  //MEDIA

  image: {
    root: {
      "class": ['relative inline-block']
    },
    button: {
      "class": ['absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300', 'bg-transparent text-gray-100', 'hover:opacity-100 hover:cursor-pointer hover:bg-black hover:bg-opacity-50']
    },
    mask: {
      "class": ['fixed top-0 left-0 w-full h-full', 'flex items-center justify-center', 'bg-black bg-opacity-90']
    },
    toolbar: {
      "class": ['absolute top-0 right-0 flex', 'p-4']
    },
    rotaterightbutton: {
      "class": ['flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    rotaterighticon: {
      "class": ['w-6 h-6']
    },
    rotateleftbutton: {
      "class": ['flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    rotatelefticon: {
      "class": ['w-6 h-6']
    },
    zoomoutbutton: {
      "class": ['flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    zoomouticon: {
      "class": ['w-6 h-6']
    },
    zoominbutton: {
      "class": ['flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    zoominicon: {
      "class": ['w-6 h-6']
    },
    closebutton: {
      "class": ['flex justify-center items-center', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out mr-2', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    closeicon: {
      "class": ['w-6 h-6']
    }
  },
  galleria: {
    root: function root(_ref108) {
      _ref108.instance;
        _ref108.props;
      return {
        "class": ['flex flex-col']
      };
    },
    content: {
      "class": ['flex flex-col']
    },
    itemwrapper: {
      "class": ['flex flex-col relative']
    },
    itemcontainer: {
      "class": ['relative flex h-full']
    },
    item: {
      "class": ['flex justify-center items-center h-full w-full']
    },
    thumbnailwrapper: {
      "class": ['flex flex-col overflow-auto flex-shrink-0']
    },
    thumbnailcontainer: {
      "class": ['flex flex-row', 'bg-black/90 p-4']
    },
    previousthumbnailbutton: {
      "class": ['self-center flex flex-shrink-0 justify-center items-center overflow-hidden relative', 'm-2 bg-transparent text-white w-8 h-8 transition duration-200 ease-in-out rounded-full', 'hover:bg-white/10 hover:text-white', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    thumbnailitemscontainer: {
      "class": ['overflow-hidden w-full']
    },
    thumbnailitems: {
      "class": ['flex']
    },
    thumbnailitem: {
      "class": ['overflow-auto flex items-center justify-center cursor-pointer opacity-50', 'flex-1 flex-grow-0 flex-shrink-0 w-20', 'hover:opacity-100 hover:transition-opacity hover:duration-300']
    },
    nextthumbnailbutton: {
      "class": ['self-center flex flex-shrink-0 justify-center items-center overflow-hidden relative', 'm-2 bg-transparent text-white w-8 h-8 transition duration-200 ease-in-out rounded-full', 'hover:bg-white/10 hover:text-white', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    indicators: {
      "class": ['flex items-center justify-center', 'p-4']
    },
    indicator: {
      "class": ['mr-2']
    },
    mask: {
      "class": ['fixed top-0 left-0 w-full h-full', 'flex items-center justify-center', 'bg-black bg-opacity-90']
    },
    closebutton: {
      "class": ['absolute top-0 right-0 flex justify-center items-center overflow-hidden m-2', 'text-white bg-transparent w-12 h-12 rounded-full transition duration-200 ease-in-out', 'hover:text-white hover:bg-white/10', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    closeicon: {
      "class": ['w-6 h-6']
    },
    previousitembutton: {
      "class": ['inline-flex justify-center items-center overflow-hidden', 'bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md mx-2', 'fixed top-1/2 mt-[-0.5rem]', 'left-0', 'hover:bg-white/10 hover:text-white', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    nextitembutton: {
      "class": ['inline-flex justify-center items-center overflow-hidden', 'bg-transparent text-white w-16 h-16 transition duration-200 ease-in-out rounded-md mx-2', 'fixed top-1/2 mt-[-0.5rem]', 'right-0', 'hover:bg-white/10 hover:text-white', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]']
    },
    caption: {
      "class": ['absolute bottom-0 left-0 w-full', 'bg-black/50 text-white p-4']
    }
  },
  carousel: {
    root: {
      "class": ['flex flex-col']
    },
    content: {
      "class": ['flex flex-col overflow-auto']
    },
    container: {
      "class": ['flex flex-row']
    },
    previousbutton: function previousbutton(_ref109) {
      _ref109.props;
        _ref109.context;
      return {
        "class": ['flex justify-center items-center self-center overflow-hidden relative flex-shrink-0 flex-grow-0', 'w-8 h-8 text-gray-600 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mx-2']
      };
    },
    itemscontent: {
      "class": ['overflow-hidden w-full']
    },
    itemscontainer: {
      "class": ['flex flex-row']
    },
    item: {
      "class": ['flex-1']
    }
  },
  tree: {
    root: {
      "class": ['max-w-[30rem] md:w-full', 'border border-solid border-gray-300 dark:border-blue-900/40 bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 p-5 rounded-md']
    },
    wrapper: {
      "class": ['overflow-auto']
    },
    container: {
      "class": ['m-0 p-0 list-none overflow-auto']
    },
    node: {
      "class": ['p-1 outline-none']
    },
    content: function content(_ref110) {
      var context = _ref110.context,
        props = _ref110.props;
      return {
        "class": ['flex items-center', 'rounded-lg transition-shadow duration-200 p-2', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'bg-blue-50 text-blue-600': context.selected
        }, {
          'cursor-pointer select-none': props.selectionMode == 'single' || props.selectionMode == 'multiple'
        }]
      };
    },
    toggler: function toggler(_ref111) {
      var context = _ref111.context;
      return {
        "class": ['cursor-pointer select-none inline-flex items-center justify-center overflow-hidden relative flex-shrink-0', 'mr-2 w-8 h-8 border-0 bg-transparent rounded-full transition duration-200', 'hover:border-transparent focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]', {
          'text-gray-500 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-gray-800/80  hover:text-gray-800 dark:hover:text-white/80': !context.selected,
          'text-blue-600 hover:bg-white/30': context.selected
        }]
      };
    },
    checkboxcontainer: {
      "class": ['mr-2']
    },
    checkbox: function checkbox(_ref112) {
      var context = _ref112.context,
        props = _ref112.props;
      return {
        "class": ['cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6', 'flex items-center justify-center', 'border-2 w-6 h-6 rounded-lg transition-colors duration-200 text-white text-base dark:text-gray-900', {
          'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900': !context.checked,
          'border-blue-500 text-white bg-blue-500 dark:border-blue-400 dark:bg-blue-400': context.checked
        }, {
          'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !props.disabled,
          'cursor-default opacity-60': props.disabled
        }]
      };
    },
    nodeicon: {
      "class": ['mr-2 text-gray-600 dark:text-white/70']
    },
    subgroup: {
      "class": ['m-0 list-none', 'p-0 pl-4']
    },
    filtercontainer: {
      "class": ['mb-2', 'relative block w-full']
    },
    input: {
      "class": ['m-0 p-3 text-base w-full pr-7', 'font-sans text-gray-600 dark:text-white/70 bg-white dark:bg-gray-900 border border-gray-300 dark:border-blue-900/40 transition-colors duration-200 appearance-none rounded-lg', 'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]']
    },
    searchicon: {
      "class": ['absolute top-1/2 -mt-2 right-3 text-gray-600 dark:hover:text-white/70']
    }
  },
  // DATA
  timeline: {
    root: function root(_ref113) {
      var props = _ref113.props;
      return {
        "class": ['flex flex-grow', {
          'flex-col': props.layout === 'vertical',
          'flex-row flex-1': props.layout === 'horizontal'
        }]
      };
    },
    event: function event(_ref114) {
      var props = _ref114.props,
        context = _ref114.context;
      return {
        "class": ['flex relative min-h-[70px]', {
          'flex-row-reverse': props.align === 'right' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1,
          'flex-col flex-1': props.layout === 'horizontal',
          'flex-col-reverse ': props.align === 'bottom' || props.layout === 'horizontal' && props.align === 'alternate' && context.index % 2 === 1
        }]
      };
    },
    opposite: function opposite(_ref115) {
      var props = _ref115.props,
        context = _ref115.context;
      return {
        "class": ['flex-1', {
          'px-4': props.layout === 'vertical',
          'py-4': props.layout === 'horizontal'
        }, {
          'text-right': props.align === 'left' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 0,
          'text-left': props.align === 'right' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1
        }]
      };
    },
    separator: function separator(_ref116) {
      var props = _ref116.props;
      return {
        "class": ['flex items-center flex-initial', {
          'flex-col': props.layout === 'vertical',
          'flex-row': props.layout === 'horizontal'
        }]
      };
    },
    marker: {
      "class": ['flex self-baseline w-4 h-4 rounded-full border-2 border-blue-500 bg-white dark:border-blue-300 dark:bg-blue-900/40']
    },
    connector: function connector(_ref117) {
      var props = _ref117.props;
      return {
        "class": ['flex-grow bg-gray-300 dark:bg-blue-900/40', {
          'w-[2px]': props.layout === 'vertical',
          'w-full h-[2px]': props.layout === 'horizontal'
        }]
      };
    },
    content: function content(_ref118) {
      var props = _ref118.props,
        context = _ref118.context;
      return {
        "class": ['flex-1', {
          'px-4': props.layout === 'vertical',
          'py-4': props.layout === 'horizontal'
        }, {
          'text-left': props.align === 'left' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 0,
          'text-right': props.align === 'right' || props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1
        }, {
          'min-h-0': props.layout === 'vertical' && context.index === context.count,
          'flex-grow-0': props.layout === 'horizontal' && context.index === context.count
        }]
      };
    }
  },
  dataview: {
    content: {
      "class": ['bg-white blue-gray-700 border-0 p-0', 'bg-gray-900 dark:text-white/80' // Dark Mode
      ]
    },

    grid: {
      "class": 'flex flex-wrap ml-0 mr-0 mt-0'
    },
    header: {
      "class": 'bg-gray-100 text-blue-gray-800 border-gray-200 border-t border-b p-4 font-bold'
    }
  },
  dataviewlayoutoptions: {
    listbutton: function listbutton(_ref119) {
      var props = _ref119.props;
      return {
        "class": ['items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom justify-center border', 'transition duration-200', 'w-12 pt-3 pb-3 rounded-lg rounded-r-none', props.modelValue === 'list' ? 'bg-blue-500 border-blue-500 text-white dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' : 'bg-white border-gray-300 text-blue-gray-700 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // highlighted state
        ]
      };
    },

    gridbutton: function gridbutton(_ref120) {
      var props = _ref120.props;
      return {
        "class": ['items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom justify-center border', 'transition duration-200', 'w-12 pt-3 pb-3 rounded-lg rounded-l-none', props.modelValue === 'grid' ? 'bg-blue-500 border-blue-500 text-white dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900' : 'bg-white border-gray-300 text-blue-gray-700 dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' // highlighted state
        ]
      };
    }
  },

  organizationchart: {
    table: {
      "class": 'mx-auto my-0 border-spacing-0 border-separate'
    },
    cell: {
      "class": 'text-center align-top py-0 px-3'
    },
    node: {
      "class": ['relative inline-block bg-white border border-gray-300 text-gray-600 p-5', 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' // Dark Mode
      ]
    },

    linecell: {
      "class": 'text-center align-top py-0 px-3'
    },
    linedown: {
      "class": ['mx-auto my-0 w-px h-[20px] bg-gray-300', 'dark:bg-blue-900/40' //Dark Mode
      ]
    },

    lineleft: function lineleft(_ref121) {
      var context = _ref121.context;
      return {
        "class": ['text-center align-top py-0 px-3 rounded-none border-r border-gray-300', {
          'border-t': context.lineTop
        }, 'dark:border-blue-900/40' //Dark Mode
        ]
      };
    },

    lineright: function lineright(_ref122) {
      var context = _ref122.context;
      return {
        "class": ['text-center align-top py-0 px-3 rounded-none', {
          'border-t border-gray-300': context.lineTop
        }, 'dark:border-blue-900/40' //Dark Mode
        ]
      };
    },

    nodecell: {
      "class": 'text-center align-top py-0 px-3'
    },
    nodetoggler: {
      "class": ['absolute bottom-[-0.75rem] left-2/4 -ml-3 w-6 h-6 bg-inherit text-inherit rounded-full z-2 cursor-pointer no-underline select-none', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]' // Focus styles
      ]
    },

    nodetogglericon: {
      "class": 'relative inline-block w-4 h-4'
    }
  },
  orderlist: {
    root: {
      "class": 'flex'
    },
    controls: {
      "class": 'flex flex-col justify-center p-5'
    },
    moveupbutton: {
      root: function root(_ref123) {
        var context = _ref123.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    movetopbutton: {
      root: function root(_ref124) {
        var context = _ref124.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    movedownbutton: {
      root: function root(_ref125) {
        var context = _ref125.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    movebottombutton: {
      root: function root(_ref126) {
        var context = _ref126.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    container: {
      "class": 'flex-auto'
    },
    header: {
      "class": ['bg-slate-50 text-slate-700 border border-gray-300 p-5 font-bold border-b-0 rounded-t-md', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
      ]
    },

    list: {
      "class": ['list-none m-0 p-0 overflow-auto min-h-[12rem] max-h-[24rem]', 'border border-gray-300 bg-white text-gray-600 py-3 px-0 rounded-b-md outline-none', 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' //Dark Mode
      ]
    },

    item: function item(_ref127) {
      var context = _ref127.context;
      return {
        "class": ['relative cursor-pointer overflow-hidden', 'py-3 px-5 m-0 border-none text-gray-600 dark:text-white/80', 'transition duration-200', {
          'text-blue-700 bg-blue-500/20 dark:bg-blue-300/20': context.active && !context.focused,
          'text-blue-700 bg-blue-500/30 dark:bg-blue-300/30': context.active && context.focused,
          'text-gray-600 bg-gray-300 dark:bg-blue-900/40': !context.active && context.focused
        }]
      };
    }
  },
  picklist: {
    root: {
      "class": 'flex'
    },
    sourcecontrols: {
      "class": 'flex flex-col justify-center p-5'
    },
    sourcemoveupbutton: {
      root: function root(_ref128) {
        var context = _ref128.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    sourcemovetopbutton: {
      root: function root(_ref129) {
        var context = _ref129.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    sourcemovedownbutton: {
      root: function root(_ref130) {
        var context = _ref130.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    sourcemovebottombutton: {
      root: function root(_ref131) {
        var context = _ref131.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    sourcewrapper: {
      "class": 'grow shrink basis-2/4'
    },
    sourceheader: {
      "class": ['bg-slate-50 text-slate-700 border border-gray-300 p-5 font-bold border-b-0 rounded-t-md', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
      ]
    },

    sourcelist: {
      "class": ['list-none m-0 p-0 overflow-auto min-h-[12rem] max-h-[24rem]', 'border border-gray-300 bg-white text-gray-600 py-3 px-0 rounded-b-md outline-none', 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' //Dark Mode
      ]
    },

    item: function item(_ref132) {
      var context = _ref132.context;
      return {
        "class": ['relative cursor-pointer overflow-hidden', 'py-3 px-5 m-0 border-none text-gray-600 dark:text-white/80', 'transition duration-200', {
          'text-blue-700 bg-blue-500/20 dark:bg-blue-300/20': context.active && !context.focused,
          'text-blue-700 bg-blue-500/30 dark:bg-blue-300/30': context.active && context.focused,
          'text-gray-600 bg-gray-300 dark:bg-blue-900/40': !context.active && context.focused
        }]
      };
    },
    buttons: {
      "class": 'flex flex-col justify-center p-5'
    },
    movetotargetbutton: {
      root: function root(_ref133) {
        var context = _ref133.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    movealltotargetbutton: {
      root: function root(_ref134) {
        var context = _ref134.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    movetosourcebutton: {
      root: function root(_ref135) {
        var context = _ref135.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    movealltosourcebutton: {
      root: function root(_ref136) {
        var context = _ref136.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    targetcontrols: {
      "class": 'flex flex-col justify-center p-5'
    },
    targetmoveupbutton: {
      root: function root(_ref137) {
        var context = _ref137.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    targetmovetopbutton: {
      root: function root(_ref138) {
        var context = _ref138.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    targetmovedownbutton: {
      root: function root(_ref139) {
        var context = _ref139.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    targetmovebottombutton: {
      root: function root(_ref140) {
        var context = _ref140.context;
        return {
          "class": ['relative inline-flex cursor-pointer user-select-none items-center align-bottom text-center overflow-hidden m-0',
          // button component
          'text-white bg-blue-500 border border-blue-500 rounded-md', 'transition duration-200 ease-in-out', 'justify-center px-0 py-3',
          // icon only
          'mb-2',
          // orderlist button
          'dark:bg-sky-300 dark:border-sky-300 dark:text-gray-900',
          //Dark Mode
          {
            'cursor-default pointer-events-none opacity-60': context.disabled
          }]
        };
      }
    },
    targetwrapper: {
      "class": 'grow shrink basis-2/4'
    },
    targetheader: {
      "class": ['bg-slate-50 text-slate-700 border border-gray-300 p-5 font-bold border-b-0 rounded-t-md', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
      ]
    },

    targetlist: {
      "class": ['list-none m-0 p-0 overflow-auto min-h-[12rem] max-h-[24rem]', 'border border-gray-300 bg-white text-gray-600 py-3 px-0 rounded-b-md outline-none', 'dark:border-blue-900/40 dark:bg-gray-900 dark:text-white/80' //Dark Mode
      ]
    }
  },

  paginator: {
    root: {
      "class": ['flex items-center justify-center flex-wrap', 'bg-white text-gray-500 border-0 px-4 py-2 rounded-md', 'dark:bg-gray-900 dark:text-white/60 dark:border-blue-900/40' // Dark Mode
      ]
    },

    firstpagebutton: function firstpagebutton(_ref141) {
      var context = _ref141.context;
      return {
        "class": ['relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500  min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled // Focus
        }]
      };
    },

    previouspagebutton: function previouspagebutton(_ref142) {
      var context = _ref142.context;
      return {
        "class": ['relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled // Focus
        }]
      };
    },

    nextpagebutton: function nextpagebutton(_ref143) {
      var context = _ref143.context;
      return {
        "class": ['relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled // Focus
        }]
      };
    },

    lastpagebutton: function lastpagebutton(_ref144) {
      var context = _ref144.context;
      return {
        "class": ['relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:text-white',
        //Dark Mode
        {
          'cursor-default pointer-events-none opacity-60': context.disabled,
          'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]': !context.disabled // Focus
        }]
      };
    },

    pagebutton: function pagebutton(_ref145) {
      var context = _ref145.context;
      return {
        "class": ['relative inline-flex items-center justify-center user-none overflow-hidden leading-none', 'border-0 text-gray-500 min-w-[3rem] h-12 m-[0.143rem] rounded-md', 'transition duration-200', 'dark:border-blue-300 dark:text-white',
        // Dark Mode
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        // Focus
        {
          'bg-blue-50 border-blue-50 text-blue-700 dark:bg-blue-300': context.active
        }]
      };
    },
    rowperpagedropdown: {
      root: function root(_ref146) {
        var props = _ref146.props,
          state = _ref146.state;
        return {
          "class": ['inline-flex relative cursor-pointer user-none', 'bg-white border rounded-md', 'transition duration-200', 'h-12 mx-2', 'dark:bg-gray-950 dark:border-blue-900/40',
          //DarkMode
          {
            'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] border-blue-500': state.focused && !props.disabled,
            //Focus
            'border-gray-300': !state.focused,
            'hover:border-blue-500': !props.disabled //Hover
          }]
        };
      },

      input: {
        "class": ['font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border-0 pr-0', 'focus:outline-none focus:outline-offset-0', 'dark:text-white' //Dark Mode
        ]
      },

      trigger: {
        "class": ['flex items-center justify-center shrink-0', 'text-gray-500 dark:text-white w-12 rounded-r-md']
      },
      panel: {
        "class": ['bg-white text-gray-600 border-0 rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.1)]', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
        ]
      },

      wrapper: {
        "class": 'overflow-auto'
      },
      list: {
        "class": 'm-0 p-0 py-3 list-none'
      },
      item: function item(_ref147) {
        var context = _ref147.context;
        return {
          "class": ['relative font-normal cursor-pointer space-nowrap overflow-hidden', 'm-0 py-3 px-5 border-none text-gray-600 rounded-none', 'transition duration-200', 'dark:text-white/80',
          // Dark Mode
          {
            'text-blue-700 bg-blue-50 dark:text-white/80 dark:bg-blue-300': !context.focused && context.selected,
            'bg-blue-300/40': context.focused && context.selected,
            'text-gray-600 bg-gray-300 dark:text-white/80 dark:bg-blue-900/40': context.focused && !context.selected
          }]
        };
      }
    },
    jumptopageinput: {
      root: {
        "class": 'inline-flex mx-2'
      },
      input: {
        "class": ['font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border border-gray-300 pr-0', 'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] focus:border-blue-300', 'dark:text-white dark:bg-gray-950 dark:border-blue-900/40',
        //Dark Mode
        'm-0 flex-auto max-w-[3rem]']
      }
    },
    jumptopagedropdown: {
      root: function root(_ref148) {
        var props = _ref148.props,
          state = _ref148.state;
        return {
          "class": ['inline-flex relative cursor-pointer user-none', 'bg-white border rounded-md', 'transition duration-200', 'h-12 mx-2', 'dark:bg-gray-950 dark:border-blue-900/40',
          //DarkMode
          {
            'outline-none outline-offset-0 shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] border-blue-500': state.focused && !props.disabled,
            //Focus
            'border-gray-300': !state.focused,
            'hover:border-blue-500': !props.disabled //Hover
          }]
        };
      },

      input: {
        "class": ['font-sans text-base text-gray-600 p-3 m-0 rounded-md apperance-none', 'block whitespace-nowrap overflow-hidden flex-auto w-[1%] cursor-pointer text-ellipsis border-0 pr-0', 'focus:outline-none focus:outline-offset-0', 'dark:text-white' //Dark Mode
        ]
      },

      trigger: {
        "class": ['flex items-center justify-center shrink-0', 'text-gray-500 dark:text-white w-12 rounded-r-md']
      },
      panel: {
        "class": ['bg-white text-gray-600 border-0 rounded-md shadow-[0_2px_12px_rgba(0,0,0,0.1)]', 'dark:bg-gray-900 dark:text-white/80 dark:border-blue-900/40' //Dark Mode
        ]
      },

      wrapper: {
        "class": 'overflow-auto'
      },
      list: {
        "class": 'm-0 p-0 py-3 list-none'
      },
      item: function item(_ref149) {
        var context = _ref149.context;
        return {
          "class": ['relative font-normal cursor-pointer space-nowrap overflow-hidden', 'm-0 py-3 px-5 border-none text-gray-600 rounded-none', 'transition duration-200', 'dark:text-white/80',
          // Dark Mode
          {
            'text-blue-700 bg-blue-50 dark:text-white/80 dark:bg-blue-300': !context.focused && context.selected,
            'bg-blue-300/40': context.focused && context.selected,
            'text-gray-600 bg-gray-300 dark:text-white/80 dark:bg-blue-900/40': context.focused && !context.selected
          }]
        };
      }
    }
  },
  treetable: {
    root: function root(_ref150) {
      var props = _ref150.props;
      return {
        "class": ['relative', {
          'flex flex-col h-full': props.scrollHeight === 'flex'
        }]
      };
    },
    loadingoverlay: {
      "class": ['fixed w-full h-full t-0 l-0 bg-gray-100/40', 'transition duration-200', 'absolute flex items-center justify-center z-2', 'dark:bg-gray-950/40' // Dark Mode
      ]
    },

    loadingicon: {
      "class": 'w-8 h-8'
    },
    header: {
      "class": ['bg-slate-50 text-slate-700 border border-x-0 border-t-0 border-gray-300 p-4 font-bold', 'dark:bg-gray-900 dark:text-white/70 dark:border-blue-900/40' // Dark Mode
      ]
    },

    wrapper: function wrapper(_ref151) {
      var props = _ref151.props;
      return {
        "class": [{
          'relative overflow-auto': props.scrollable,
          'overflow-x-auto': props.resizableColumns
        }]
      };
    },
    footer: {
      "class": ['bg-slate-50 text-slate-700 border border-x-0 border-t-0 border-gray-300 p-4 font-bold', 'dark:bg-gray-900 dark:text-white/70 dark:border-blue-900/40' // Dark Mode
      ]
    },

    table: {
      "class": 'border-collapse table-fixed w-full'
    },
    thead: function thead(_ref152) {
      var props = _ref152.props;
      return {
        "class": [{
          'block sticky top-0 z-[1]': props.scrollable
        }]
      };
    },
    tbody: function tbody(_ref153) {
      var props = _ref153.props;
      return {
        "class": [{
          block: props.scrollable
        }]
      };
    },
    tfoot: function tfoot(_ref154) {
      var props = _ref154.props;
      return {
        "class": [{
          block: props.scrollable
        }]
      };
    },
    headerrow: function headerrow(_ref155) {
      var props = _ref155.props;
      return {
        "class": [{
          'flex flex-nowrap w-full': props.scrollable
        }]
      };
    },
    row: function row(_ref156) {
      var context = _ref156.context;
      return {
        "class": ['transition duration-200', 'focus:outline focus:outline-[0.15rem] focus:outline-blue-200 focus:outline-offset-[-0.15rem]',
        // Focus
        context.selected ? 'bg-blue-50 text-blue-700 dark:bg-blue-300 dark:text-white/80' : 'bg-white text-gray-600 dark:bg-gray-900 dark:text-white/80', {
          'hover:bg-gray-300/20 hover:text-gray-600 dark:hover:bg-gray-950': context.selectable && !context.selected,
          // Hover
          'flex flex-nowrap w-full': context.scrollable
        }]
      };
    },
    column: {
      headercell: function headercell(_ref157) {
        var context = _ref157.context;
        return {
          "class": ['text-left border-gray-300 border font-bold', 'transition duration-200', context.sorted ? 'bg-blue-50 text-blue-700' : 'bg-slate-50', (context === null || context === void 0 ? void 0 : context.size) === 'small' ? 'p-2' : (context === null || context === void 0 ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
          // Size
          'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900',
          //Dark Mode
          {
            'flex flex-1 items-center': context.scrollable,
            'flex-initial shrink-0': context.scrollable && context.scrollDirection === 'both' && !context.frozen,
            'sticky z-[1]': context.scrollable && context.scrollDirection === 'both' && context.frozen,
            'border-x-0 border-l-0 border-t-0': !context.showGridlines,
            'overflow-hidden relative bg-clip-padding': context.resizable && !context.frozen
          }]
        };
      },
      bodycell: function bodycell(_ref158) {
        var context = _ref158.context;
        return {
          "class": ['text-left border-gray-300 border', 'transition duration-200', (context === null || context === void 0 ? void 0 : context.size) === 'small' ? 'p-2' : (context === null || context === void 0 ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
          // Size
          'dark:border-blue-900/40',
          //Dark Mode
          {
            'cursor-pointer': context.selectable,
            'flex flex-1 items-center': context.scrollable,
            'flex-initial shrink-0': context.scrollable && context.scrollDirection === 'both' && !context.frozen,
            sticky: context.scrollable && context.scrollDirection === 'both' && context.frozen,
            'border-x-0 border-l-0': !context.showGridlines
          }]
        };
      },
      rowtoggler: function rowtoggler(_ref159) {
        var context = _ref159.context;
        return {
          "class": ['relative inline-flex items-center justify-center align-center cursor-pointer select-none overflow-hidden bg-transparent', 'w-8 h-8 border-0 rounded mr-0.5', context.selected ? 'text-blue-700' : 'text-gray-500', 'dark:text-white/70' //Dark Mode
          ]
        };
      },

      sorticon: function sorticon(_ref160) {
        var context = _ref160.context;
        return {
          "class": ['ml-2', context.sorted ? 'text-blue-700 dark:text-white/80' : 'text-slate-700 dark:text-white/70']
        };
      },
      sortbadge: {
        "class": ['h-[1.143rem] min-w-[1.143rem] leading-[1.143rem] text-blue-700 bg-blue-50 ml-2 rounded-[50%]', 'dark:text-white/80 dark:bg-blue-500/40' // Dark Mode
        ]
      },

      columnresizer: {
        "class": 'block absolute top-0 right-0 m-0 w-2 h-full p-0 cursor-col-resize border border-transparent'
      },
      checkboxwrapper: {
        "class": ['cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6 mr-2']
      },
      checkbox: function checkbox(_ref161) {
        var context = _ref161.context;
        return {
          "class": ['flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200', context.checked ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900', {
            'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled
          }]
        };
      },
      checkboxicon: function checkboxicon(_ref162) {
        var context = _ref162.context;
        return {
          "class": ['w-4 h-4 transition-all duration-200 text-base dark:text-gray-900', {
            'text-white': context.checked
          }]
        };
      }
    },
    resizehelper: {
      "class": ['absolute hidden w-px z-10 bg-blue-500 dark:bg-blue-300']
    }
  },
  datatable: {
    root: function root(_ref163) {
      var props = _ref163.props;
      return {
        "class": ['relative', {
          'flex flex-col h-full': props.scrollable && props.scrollHeight === 'flex'
        }]
      };
    },
    loadingoverlay: {
      "class": ['fixed w-full h-full t-0 l-0 bg-gray-100/40', 'transition duration-200', 'absolute flex items-center justify-center z-2', 'dark:bg-gray-950/40' // Dark Mode
      ]
    },

    loadingicon: {
      "class": 'w-8 h-8'
    },
    wrapper: function wrapper(_ref164) {
      var props = _ref164.props;
      return {
        "class": [{
          relative: props.scrollable,
          'flex flex-col grow h-full': props.scrollable && props.scrollHeight === 'flex'
        }]
      };
    },
    header: function header(_ref165) {
      var props = _ref165.props;
      return {
        "class": ['bg-slate-50 text-slate-700 border-gray-300 font-bold p-4', 'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900',
        // Dark Mode
        props.showGridlines ? 'border-x border-t border-b-0' : 'border-y border-x-0']
      };
    },
    table: {
      "class": 'w-full border-spacing-0'
    },
    thead: function thead(_ref166) {
      var context = _ref166.context;
      return {
        "class": [{
          'bg-slate-50 top-0 z-[1]': context.scrollable
        }]
      };
    },
    tbody: function tbody(_ref167) {
      var instance = _ref167.instance,
        context = _ref167.context;
      return {
        "class": [{
          'sticky z-[1]': instance.frozenRow && context.scrollable
        }]
      };
    },
    tfoot: function tfoot(_ref168) {
      var context = _ref168.context;
      return {
        "class": [{
          'bg-slate-50 bottom-0 z-[1]': context.scrollable
        }]
      };
    },
    footer: {
      "class": ['bg-slate-50 text-slate-700 border-t-0 border-b border-x-0 border-gray-300 font-bold p-4', 'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900' // Dark Mode
      ]
    },

    column: {
      headercell: function headercell(_ref169) {
        var context = _ref169.context,
          props = _ref169.props;
        return {
          "class": ['text-left border-0 border-b border-solid border-gray-300 dark:border-blue-900/40 font-bold', 'transition duration-200', (context === null || context === void 0 ? void 0 : context.size) === 'small' ? 'p-2' : (context === null || context === void 0 ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
          // Size
          context.sorted ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-700',
          // Sort
          context.sorted ? 'dark:text-white/80 dark:bg-blue-300' : 'dark:text-white/80 dark:bg-gray-900',
          // Dark Mode
          {
            'sticky z-[1]': props.frozen || props.frozen === '',
            // Frozen Columns
            'border-x border-y': context === null || context === void 0 ? void 0 : context.showGridlines,
            'overflow-hidden space-nowrap border-y relative bg-clip-padding': context.resizable // Resizable
          }]
        };
      },

      headercontent: {
        "class": 'flex items-center'
      },
      bodycell: function bodycell(_ref170) {
        var props = _ref170.props,
          context = _ref170.context;
        return {
          "class": ['text-left border-0 border-b border-solid border-gray-300', (context === null || context === void 0 ? void 0 : context.size) === 'small' ? 'p-2' : (context === null || context === void 0 ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
          // Size
          'dark:text-white/80 dark:border-blue-900/40',
          // Dark Mode
          {
            'sticky bg-inherit': props.frozen || props.frozen === '',
            // Frozen Columns
            'border-x border-y': context === null || context === void 0 ? void 0 : context.showGridlines
          }]
        };
      },
      footercell: function footercell(_ref171) {
        var context = _ref171.context;
        return {
          "class": ['text-left border-0 border-b border-solid border-gray-300 font-bold', 'bg-slate-50 text-slate-700', 'transition duration-200', (context === null || context === void 0 ? void 0 : context.size) === 'small' ? 'p-2' : (context === null || context === void 0 ? void 0 : context.size) === 'large' ? 'p-5' : 'p-4',
          // Size
          'dark:text-white/80 dark:bg-gray-900 dark:border-blue-900/40',
          // Dark Mode
          {
            'border-x border-y': context === null || context === void 0 ? void 0 : context.showGridlines
          }]
        };
      },
      sorticon: function sorticon(_ref172) {
        var context = _ref172.context;
        return {
          "class": ['ml-2', context.sorted ? 'text-blue-700 dark:text-white/80' : 'text-slate-700 dark:text-white/70']
        };
      },
      sortbadge: {
        "class": ['flex items-center justify-center align-middle', 'rounded-[50%] w-[1.143rem] leading-[1.143rem] ml-2', 'text-blue-700 bg-blue-50', 'dark:text-white/80 dark:bg-blue-400' // Dark Mode
        ]
      },

      columnfilter: {
        "class": 'inline-flex items-center ml-auto'
      },
      filteroverlay: {
        "class": ['bg-white text-gray-600 border-0 rounded-md min-w-[12.5rem]', 'dark:bg-gray-900 dark:border-blue-900/40 dark:text-white/80' //Dark Mode
        ]
      },

      filtermatchmodedropdown: {
        root: {
          "class": 'min-[0px]:flex mb-2'
        }
      },
      filterrowitems: {
        "class": 'm-0 p-0 py-3 list-none '
      },
      filterrowitem: function filterrowitem(_ref173) {
        var context = _ref173.context;
        return {
          "class": ['m-0 py-3 px-5 bg-transparent', 'transition duration-200', context !== null && context !== void 0 && context.highlighted ? 'text-blue-700 bg-blue-100 dark:text-white/80 dark:bg-blue-300' : 'text-gray-600 bg-transparent dark:text-white/80 dark:bg-transparent']
        };
      },
      filteroperator: {
        "class": ['px-5 py-3 border-b border-solid border-gray-300 text-slate-700 bg-slate-50 rounded-t-md', 'dark:border-blue-900/40 dark:text-white/80 dark:bg-gray-900' // Dark Mode
        ]
      },

      filteroperatordropdown: {
        root: {
          "class": 'min-[0px]:flex'
        }
      },
      filterconstraint: {
        "class": 'p-5 border-b border-solid border-gray-300 dark:border-blue-900/40'
      },
      filteraddrule: {
        "class": 'py-3 px-5'
      },
      filteraddrulebutton: {
        root: {
          "class": 'justify-center w-full min-[0px]:text-sm'
        },
        label: {
          "class": 'flex-auto grow-0'
        },
        icon: {
          "class": 'mr-2'
        }
      },
      filterremovebutton: {
        root: {
          "class": 'ml-2'
        },
        label: {
          "class": 'grow-0'
        }
      },
      filterbuttonbar: {
        "class": 'flex items-center justify-between p-5'
      },
      filterclearbutton: {
        root: {
          "class": 'w-auto min-[0px]:text-sm border-blue-500 text-blue-500 px-4 py-3'
        }
      },
      filterapplybutton: {
        root: {
          "class": 'w-auto min-[0px]:text-sm px-4 py-3'
        }
      },
      filtermenubutton: function filtermenubutton(_ref174) {
        var context = _ref174.context;
        return {
          "class": ['inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative ml-2', 'w-8 h-8 rounded-[50%]', 'transition duration-200', 'hover:text-slate-700 hover:bg-gray-300/20',
          // Hover
          'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
          // Focus
          'dark:text-white/70 dark:hover:text-white/80 dark:bg-gray-900',
          // Dark Mode
          {
            'bg-blue-50 text-blue-700': context.active
          }]
        };
      },
      headerfilterclearbutton: function headerfilterclearbutton(_ref175) {
        var context = _ref175.context;
        return {
          "class": ['inline-flex justify-center items-center cursor-pointer no-underline overflow-hidden relative', 'text-left bg-transparent m-0 p-0 border-none select-none ml-2', {
            invisible: !context.hidden
          }]
        };
      },
      columnresizer: {
        "class": 'block absolute top-0 right-0 m-0 w-2 h-full p-0 cursor-col-resize border border-transparent'
      },
      rowreordericon: {
        "class": 'cursor-move'
      },
      roweditorinitbutton: {
        "class": ['inline-flex items-center justify-center overflow-hidden relative', 'text-left cursor-pointer select-none', 'w-8 h-8 border-0 rounded-[50%]', 'transition duration-200', 'text-slate-700 border-transparent', 'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        //Focus
        'hover:text-slate-700 hover:bg-gray-300/20',
        //Hover
        'dark:text-white/70' // Dark Mode
        ]
      },

      roweditorsavebutton: {
        "class": ['inline-flex items-center justify-center overflow-hidden relative', 'text-left cursor-pointer select-none', 'w-8 h-8 border-0 rounded-[50%]', 'transition duration-200', 'text-slate-700 border-transparent', 'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        //Focus
        'hover:text-slate-700 hover:bg-gray-300/20',
        //Hover
        'dark:text-white/70' // Dark Mode
        ]
      },

      roweditorcancelbutton: {
        "class": ['inline-flex items-center justify-center overflow-hidden relative', 'text-left cursor-pointer select-none', 'w-8 h-8 border-0 rounded-[50%]', 'transition duration-200', 'text-slate-700 border-transparent', 'focus:outline-0 focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
        //Focus
        'hover:text-slate-700 hover:bg-gray-300/20',
        //Hover
        'dark:text-white/70' // Dark Mode
        ]
      },

      radiobuttonwrapper: {
        "class": ['relative inline-flex cursor-pointer select-none align-bottom', 'w-6 h-6']
      },
      radiobutton: function radiobutton(_ref176) {
        var context = _ref176.context;
        return {
          "class": ['flex justify-center items-center', 'border-2 w-6 h-6 text-gray-700 rounded-full transition duration-200 ease-in-out', context.checked ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900', {
            'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
            'cursor-default opacity-60': context.disabled
          }]
        };
      },
      radiobuttonicon: function radiobuttonicon(_ref177) {
        var context = _ref177.context;
        return {
          "class": ['transform rounded-full', 'block w-3 h-3 transition duration-200 bg-white dark:bg-gray-900', {
            'backface-hidden scale-10 invisible': context.checked === false,
            'transform scale-100 visible': context.checked === true
          }]
        };
      },
      headercheckboxwrapper: {
        "class": ['cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6']
      },
      headercheckbox: function headercheckbox(_ref178) {
        var context = _ref178.context;
        return {
          "class": ['flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200', context.checked ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900', {
            'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
            'cursor-default opacity-60': context.disabled
          }]
        };
      },
      headercheckboxicon: {
        "class": ['w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900']
      },
      checkboxwrapper: {
        "class": ['cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6']
      },
      checkbox: function checkbox(_ref179) {
        var context = _ref179.context;
        return {
          "class": ['flex items-center justify-center', 'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200', context.checked ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' : 'border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900', {
            'hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]': !context.disabled,
            'cursor-default opacity-60': context.disabled
          }]
        };
      },
      checkboxicon: {
        "class": ['w-4 h-4 transition-all duration-200 text-white text-base dark:text-gray-900']
      }
    },
    bodyrow: function bodyrow(_ref180) {
      var context = _ref180.context;
      return {
        "class": [context.selected ? 'bg-blue-50 text-blue-700 dark:bg-blue-300' : 'bg-white text-gray-600 dark:bg-gray-900', context.stripedRows ? context.index % 2 === 0 ? 'bg-white text-gray-600 dark:bg-gray-900' : 'bg-blue-50/50 text-gray-600 dark:bg-gray-950' : '', 'transition duration-200', 'focus:outline focus:outline-[0.15rem] focus:outline-blue-200 focus:outline-offset-[-0.15rem]',
        // Focus
        'dark:text-white/80 dark:focus:outline dark:focus:outline-[0.15rem] dark:focus:outline-blue-300 dark:focus:outline-offset-[-0.15rem]',
        // Dark Mode
        {
          'cursor-pointer': context.selectable,
          'hover:bg-gray-300/20 hover:text-gray-600': context.selectable && !context.selected // Hover
        }]
      };
    },

    rowexpansion: {
      "class": 'bg-white text-gray-600 dark:bg-gray-900 dark:text-white/80'
    },
    rowgroupheader: {
      "class": ['sticky z-[1]', 'bg-white text-gray-600', 'transition duration-200']
    },
    rowgroupfooter: {
      "class": ['sticky z-[1]', 'bg-white text-gray-600', 'transition duration-200']
    },
    rowgrouptoggler: {
      "class": ['text-left m-0 p-0 cursor-pointer select-none', 'inline-flex items-center justify-center overflow-hidden relative', 'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-[50%]', 'transition duration-200', 'dark:text-white/70' // Dark Mode
      ]
    },

    rowgrouptogglericon: {
      "class": 'inline-block w-4 h-4'
    },
    resizehelper: {
      "class": ['absolute hidden w-px z-10 bg-blue-500 dark:bg-blue-300']
    }
  }
};

module.exports = Tailwind;
