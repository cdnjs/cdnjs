import _regeneratorRuntime from 'regenerator-runtime';
import ProtonLinkBrowserTransport from '@proton/browser-transport';
import ProtonLink from '@proton/link';
import { AxiosProvider } from '@proton/provider-axios';
import { APIClient } from '@greymass/eosio';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var getStyleText = (function (customStyleOptions) {
  var defaultOptions = {
    modalBackgroundColor: '#ffffff',
    logoBackgroundColor: 'transparent',
    isLogoRound: false,
    optionBackgroundColor: 'transparent',
    optionFontColor: '#000531',
    primaryFontColor: 'black',
    secondaryFontColor: '#a1a5b0',
    linkColor: '#00AAEF'
  };

  var _Object$assign = Object.assign(defaultOptions, customStyleOptions),
      modalBackgroundColor = _Object$assign.modalBackgroundColor,
      logoBackgroundColor = _Object$assign.logoBackgroundColor,
      isLogoRound = _Object$assign.isLogoRound,
      optionBackgroundColor = _Object$assign.optionBackgroundColor,
      optionFontColor = _Object$assign.optionFontColor,
      primaryFontColor = _Object$assign.primaryFontColor,
      secondaryFontColor = _Object$assign.secondaryFontColor,
      linkColor = _Object$assign.linkColor;

  return "\n    .wallet-selector * {\n        box-sizing: border-box;\n        line-height: 1;\n    }\n\n    .wallet-selector {\n        font-family: 'Circular Std Book', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',\n            Arial, sans-serif;\n        font-size: 13px;\n        background: rgba(0, 0, 0, 0.65);\n        position: fixed;\n        top: 0px;\n        left: 0px;\n        width: 100%;\n        height: 100%;\n        z-index: 2147483647;\n        display: none;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .wallet-selector-active {\n        display: flex;\n        flex-direction: column;\n    }\n\n    .wallet-selector-inner {\n        background: " + modalBackgroundColor + ";\n        color: white;\n        margin: 20px 20px 13px 20px;\n        padding-top: 50px;\n        border-radius: 10px;\n        box-shadow: 0px -10px 50px rgba(0, 0, 0, .5) !important;\n        width: 360px;\n        transition-property: all;\n        transition-duration: .5s;\n        transition-timing-function: ease-in-out;\n        position: relative;\n    }\n\n    .wallet-selector-close {\n        display: block;\n        position: absolute;\n        top: 16px;\n        right: 16px;\n        width: 28px;\n        height: 28px;\n        background-image: url(\"data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(161, 165, 176, 0.7)' fill-rule='nonzero'/%3E%3C/svg%3E\");\n        background-size: 14px;\n        background-repeat: no-repeat;\n        background-position: 50%;\n        cursor: pointer;\n        transition: background-image 0.2s ease;\n    }\n\n    .wallet-selector-close:hover {\n        background-image: url(\"data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(161, 165, 176, 1)' fill-rule='nonzero'/%3E%3C/svg%3E\");\n        transition: background-image 0.2s ease;\n    }\n\n    .wallet-selector-connect {\n        padding: 0px 20px;\n        border-radius: 10px;\n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n        background: " + modalBackgroundColor + ";\n    }\n\n    .wallet-selector-connect-header {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n    }\n\n    .wallet-selector-logo {\n        width: 100px;\n        height: 100px;\n        background: " + logoBackgroundColor + ";\n        " + (isLogoRound && "\n        width: 120px;\n        height: 120px;\n        padding: 10px;\n        margin-bottom: 10px;\n        border: 1px solid rgba(161, 165, 176, 0.23);\n        border-radius: 50%;\n        ") + "\n    }\n\n    .wallet-selector-title {\n        font-size: 16px;\n        font-family: 'Circular Std Book', sans-serif;\n        line-height: 24px;\n        color: " + primaryFontColor + ";\n        text-align: center;\n    }\n\n    .wallet-selector-subtitle {\n        font-size: 16px;\n        font-family: 'Circular Std Book', sans-serif;\n        line-height: 24px;\n        color: " + secondaryFontColor + ";\n        text-align: center;\n    }\n\n    .wallet-selector-connect-body {\n        margin-top: 55px;\n    }\n\n    .wallet-selector-wallet-list {\n        margin: 0px;\n        padding: 0px;\n        list-style: none;\n    }\n\n    .wallet-selector-wallet-list li {\n        background: " + optionBackgroundColor + ";\n    }\n\n    .wallet-selector-proton-wallet, .wallet-selector-webauth-wallet, .wallet-selector-anchor-wallet {\n        display: flex;\n        align-items: center;\n        padding: 20px 20px 20px 16px;\n        border: 1px solid rgba(161, 165, 176, 0.23);\n    }\n\n    .wallet-selector-webauth-wallet, .wallet-selector-anchor-wallet {\n        margin-top: 8px;\n    }\n\n    .wallet-selector-proton-wallet:hover, .wallet-selector-webauth-wallet:hover, .wallet-selector-anchor-wallet:hover {\n        cursor: pointer;\n    }\n\n    .wallet-selector-proton-logo {\n        background-image: url(\"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='45px' height='50px' viewBox='0 0 45 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Elogo%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='15.004%25' y1='50%25' x2='89.621%25' y2='53.538%25' id='linearGradient-1'%3E%3Cstop stop-color='%237543E3' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23582ACB' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='logo' fill='url(%23linearGradient-1)' fill-rule='nonzero'%3E%3Cg id='Group'%3E%3Cpath d='M22.257,0 C25.457,0 28.219,3.328 30.037,8.735 C29.303,8.94 28.553,9.169 27.795,9.424 C26.285,4.95 24.211,2.318 22.257,2.318 C20.054,2.318 17.705,5.656 16.174,11.205 C16.772,11.399 17.376,11.604 17.991,11.831 C19.379,12.343 20.811,12.945 22.271,13.628 L22.521,13.51 C23.457,13.08 24.386,12.682 25.306,12.318 C25.418,12.275 25.527,12.232 25.636,12.188 C28.391,11.123 31.052,10.358 33.489,9.954 C38.737,9.079 42.427,9.984 43.875,12.5 C45.327,15.017 44.265,18.669 40.886,22.781 C40.691,23.017 40.493,23.255 40.284,23.491 C39.782,22.931 39.246,22.371 38.674,21.811 C41.657,18.348 42.831,15.321 41.872,13.659 C40.966,12.086 37.976,11.556 33.87,12.239 C32.992,12.385 32.08,12.583 31.143,12.827 C31.277,13.443 31.403,14.071 31.512,14.722 C31.765,16.179 31.962,17.72 32.101,19.325 C32.822,19.834 33.527,20.349 34.204,20.875 C36.856,22.93 39.134,25.086 40.886,27.219 C44.266,31.331 45.327,34.983 43.876,37.5 C42.788,39.39 40.433,40.37 37.104,40.37 C36.003,40.37 34.795,40.265 33.489,40.046 C33.152,39.99 32.809,39.927 32.461,39.858 C32.669,39.139 32.861,38.388 33.036,37.609 C33.317,37.666 33.596,37.715 33.87,37.762 C37.973,38.444 40.966,37.914 41.872,36.342 C42.973,34.43 41.253,30.714 37.209,26.604 C36.805,26.974 36.389,27.34 35.959,27.705 C35.897,27.758 35.83,27.815 35.768,27.865 C34.624,28.825 33.394,29.767 32.096,30.681 C32.033,31.409 31.962,32.127 31.876,32.825 C30.613,43.01 26.896,50 22.256,50 C19.063,50 16.305,46.682 14.486,41.288 C15.217,41.089 15.964,40.858 16.728,40.599 C18.239,45.059 20.306,47.682 22.257,47.682 C24.46,47.682 26.815,44.332 28.347,38.768 C27.747,38.577 27.141,38.373 26.529,38.146 C25.132,37.636 23.706,37.04 22.269,36.374 L22.177,36.417 C21.367,36.795 20.57,37.146 19.783,37.47 C19.661,37.52 19.543,37.57 19.423,37.613 C14.893,39.44 10.756,40.387 7.466,40.387 C4.189,40.387 1.759,39.447 0.635,37.5 C-0.972,34.712 0.549,30.63 4.355,26.325 L5.972,28.033 C2.893,31.563 1.67,34.656 2.642,36.341 C3.742,38.25 7.804,38.619 13.368,37.171 C13.237,36.558 13.112,35.931 13.002,35.281 C12.751,33.826 12.555,32.289 12.416,30.687 C11.691,30.179 10.986,29.667 10.316,29.152 C3.87,24.185 0,18.911 0,14.983 C0,14.076 0.208,13.242 0.635,12.5 C2.235,9.728 6.485,8.997 12.063,10.116 C11.851,10.844 11.656,11.606 11.481,12.394 C6.894,11.487 3.611,11.974 2.642,13.659 C1.542,15.567 3.255,19.275 7.287,23.379 C7.804,22.909 8.341,22.443 8.905,21.98 C9.991,21.08 11.167,20.187 12.418,19.31 C12.481,18.58 12.553,17.86 12.641,17.162 C13.904,6.987 17.621,0 22.257,0 Z M29.581,32.36 C29.024,32.714 28.461,33.063 27.885,33.404 C27.69,33.52 27.495,33.632 27.299,33.745 C26.615,34.139 25.93,34.52 25.253,34.877 C25.153,34.931 25.053,34.981 24.953,35.034 C25.656,35.332 26.354,35.611 27.045,35.868 C27.669,36.1 28.285,36.313 28.895,36.513 C29.03,35.878 29.156,35.223 29.27,34.546 C29.388,33.843 29.489,33.108 29.581,32.36 Z M14.925,32.357 C15.023,33.142 15.135,33.906 15.26,34.642 C15.37,35.287 15.492,35.906 15.622,36.511 C15.996,36.389 16.374,36.262 16.758,36.126 C16.874,36.086 16.993,36.043 17.108,36 C17.898,35.715 18.708,35.4 19.535,35.046 L19.558,35.036 C18.776,34.626 17.994,34.196 17.214,33.745 C17.174,33.722 17.132,33.699 17.092,33.672 C16.348,33.241 15.629,32.801 14.925,32.357 L14.925,32.357 Z M22.258,16.195 C21.467,16.581 20.673,16.985 19.879,17.417 C19.377,17.689 18.874,17.97 18.372,18.262 C17.055,19.022 15.814,19.805 14.644,20.596 C14.596,21.272 14.555,21.956 14.529,22.659 C14.499,23.424 14.486,24.205 14.486,25 C14.486,26.524 14.542,27.991 14.642,29.402 C15.317,29.859 16.012,30.312 16.738,30.758 C17.27,31.089 17.813,31.418 18.372,31.738 C19.665,32.486 20.966,33.175 22.259,33.804 L22.509,33.685 C23.368,33.262 24.237,32.805 25.12,32.315 C25.46,32.129 25.802,31.937 26.142,31.738 C27.459,30.978 28.7,30.196 29.87,29.405 C29.917,28.729 29.959,28.044 29.984,27.341 C30.014,26.576 30.027,25.795 30.027,25 C30.027,23.477 29.971,22.01 29.872,20.599 C29.198,20.143 28.505,19.689 27.779,19.242 C27.246,18.911 26.701,18.586 26.142,18.262 C24.825,17.5 23.528,16.815 22.258,16.195 L22.258,16.195 Z M22.257,22.02 C23.901,22.02 25.233,23.354 25.233,25 C25.233,26.646 23.901,27.98 22.257,27.98 C20.613,27.98 19.28,26.646 19.28,25 C19.28,23.354 20.612,22.02 22.256,22.02 L22.257,22.02 Z M32.29,22.33 C32.324,23.204 32.342,24.095 32.342,25 C32.342,25.219 32.342,25.437 32.339,25.656 C32.332,26.34 32.312,27.013 32.285,27.68 C32.881,27.229 33.453,26.776 33.999,26.325 C34.068,26.268 34.134,26.215 34.2,26.159 C34.663,25.771 35.105,25.385 35.531,24.999 C35.141,24.648 34.737,24.294 34.316,23.94 C33.678,23.4 32.998,22.864 32.29,22.33 L32.29,22.33 Z M12.229,22.324 C11.693,22.728 11.175,23.134 10.68,23.54 C10.084,24.025 9.518,24.513 8.98,25.001 C9.37,25.354 9.776,25.708 10.198,26.063 C10.836,26.6 11.516,27.136 12.224,27.671 C12.19,26.796 12.172,25.905 12.172,25 C12.172,24.781 12.172,24.563 12.178,24.348 C12.183,23.664 12.202,22.991 12.228,22.324 L12.229,22.324 Z M28.892,13.488 C28.583,13.588 28.273,13.692 27.961,13.801 C27.041,14.119 26.109,14.481 25.163,14.877 C25.097,14.905 25.029,14.937 24.963,14.964 C25.737,15.373 26.516,15.802 27.299,16.255 C27.339,16.278 27.382,16.301 27.422,16.328 C28.162,16.754 28.88,17.197 29.589,17.645 C29.491,16.859 29.379,16.095 29.254,15.358 C29.144,14.714 29.02,14.093 28.892,13.488 L28.892,13.488 Z M15.62,13.488 C15.486,14.121 15.36,14.775 15.247,15.45 C15.127,16.154 15.025,16.887 14.932,17.634 C15.638,17.188 16.363,16.747 17.108,16.314 L17.214,16.255 C17.994,15.804 18.779,15.375 19.562,14.964 C18.852,14.664 18.155,14.386 17.472,14.132 C16.84,13.894 16.225,13.683 15.62,13.488 L15.62,13.488 Z' id='Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");\n    }\n\n    .wallet-selector-webauth-logo {\n        background-image: url(\"data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='45px' height='50px' viewBox='0 0 45 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Elogo%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='15.004%25' y1='50%25' x2='89.621%25' y2='53.538%25' id='linearGradient-1'%3E%3Cstop stop-color='%237543E3' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23582ACB' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='logo' fill='url(%23linearGradient-1)' fill-rule='nonzero'%3E%3Cg id='Group'%3E%3Cpath d='M22.257,0 C25.457,0 28.219,3.328 30.037,8.735 C29.303,8.94 28.553,9.169 27.795,9.424 C26.285,4.95 24.211,2.318 22.257,2.318 C20.054,2.318 17.705,5.656 16.174,11.205 C16.772,11.399 17.376,11.604 17.991,11.831 C19.379,12.343 20.811,12.945 22.271,13.628 L22.521,13.51 C23.457,13.08 24.386,12.682 25.306,12.318 C25.418,12.275 25.527,12.232 25.636,12.188 C28.391,11.123 31.052,10.358 33.489,9.954 C38.737,9.079 42.427,9.984 43.875,12.5 C45.327,15.017 44.265,18.669 40.886,22.781 C40.691,23.017 40.493,23.255 40.284,23.491 C39.782,22.931 39.246,22.371 38.674,21.811 C41.657,18.348 42.831,15.321 41.872,13.659 C40.966,12.086 37.976,11.556 33.87,12.239 C32.992,12.385 32.08,12.583 31.143,12.827 C31.277,13.443 31.403,14.071 31.512,14.722 C31.765,16.179 31.962,17.72 32.101,19.325 C32.822,19.834 33.527,20.349 34.204,20.875 C36.856,22.93 39.134,25.086 40.886,27.219 C44.266,31.331 45.327,34.983 43.876,37.5 C42.788,39.39 40.433,40.37 37.104,40.37 C36.003,40.37 34.795,40.265 33.489,40.046 C33.152,39.99 32.809,39.927 32.461,39.858 C32.669,39.139 32.861,38.388 33.036,37.609 C33.317,37.666 33.596,37.715 33.87,37.762 C37.973,38.444 40.966,37.914 41.872,36.342 C42.973,34.43 41.253,30.714 37.209,26.604 C36.805,26.974 36.389,27.34 35.959,27.705 C35.897,27.758 35.83,27.815 35.768,27.865 C34.624,28.825 33.394,29.767 32.096,30.681 C32.033,31.409 31.962,32.127 31.876,32.825 C30.613,43.01 26.896,50 22.256,50 C19.063,50 16.305,46.682 14.486,41.288 C15.217,41.089 15.964,40.858 16.728,40.599 C18.239,45.059 20.306,47.682 22.257,47.682 C24.46,47.682 26.815,44.332 28.347,38.768 C27.747,38.577 27.141,38.373 26.529,38.146 C25.132,37.636 23.706,37.04 22.269,36.374 L22.177,36.417 C21.367,36.795 20.57,37.146 19.783,37.47 C19.661,37.52 19.543,37.57 19.423,37.613 C14.893,39.44 10.756,40.387 7.466,40.387 C4.189,40.387 1.759,39.447 0.635,37.5 C-0.972,34.712 0.549,30.63 4.355,26.325 L5.972,28.033 C2.893,31.563 1.67,34.656 2.642,36.341 C3.742,38.25 7.804,38.619 13.368,37.171 C13.237,36.558 13.112,35.931 13.002,35.281 C12.751,33.826 12.555,32.289 12.416,30.687 C11.691,30.179 10.986,29.667 10.316,29.152 C3.87,24.185 0,18.911 0,14.983 C0,14.076 0.208,13.242 0.635,12.5 C2.235,9.728 6.485,8.997 12.063,10.116 C11.851,10.844 11.656,11.606 11.481,12.394 C6.894,11.487 3.611,11.974 2.642,13.659 C1.542,15.567 3.255,19.275 7.287,23.379 C7.804,22.909 8.341,22.443 8.905,21.98 C9.991,21.08 11.167,20.187 12.418,19.31 C12.481,18.58 12.553,17.86 12.641,17.162 C13.904,6.987 17.621,0 22.257,0 Z M29.581,32.36 C29.024,32.714 28.461,33.063 27.885,33.404 C27.69,33.52 27.495,33.632 27.299,33.745 C26.615,34.139 25.93,34.52 25.253,34.877 C25.153,34.931 25.053,34.981 24.953,35.034 C25.656,35.332 26.354,35.611 27.045,35.868 C27.669,36.1 28.285,36.313 28.895,36.513 C29.03,35.878 29.156,35.223 29.27,34.546 C29.388,33.843 29.489,33.108 29.581,32.36 Z M14.925,32.357 C15.023,33.142 15.135,33.906 15.26,34.642 C15.37,35.287 15.492,35.906 15.622,36.511 C15.996,36.389 16.374,36.262 16.758,36.126 C16.874,36.086 16.993,36.043 17.108,36 C17.898,35.715 18.708,35.4 19.535,35.046 L19.558,35.036 C18.776,34.626 17.994,34.196 17.214,33.745 C17.174,33.722 17.132,33.699 17.092,33.672 C16.348,33.241 15.629,32.801 14.925,32.357 L14.925,32.357 Z M22.258,16.195 C21.467,16.581 20.673,16.985 19.879,17.417 C19.377,17.689 18.874,17.97 18.372,18.262 C17.055,19.022 15.814,19.805 14.644,20.596 C14.596,21.272 14.555,21.956 14.529,22.659 C14.499,23.424 14.486,24.205 14.486,25 C14.486,26.524 14.542,27.991 14.642,29.402 C15.317,29.859 16.012,30.312 16.738,30.758 C17.27,31.089 17.813,31.418 18.372,31.738 C19.665,32.486 20.966,33.175 22.259,33.804 L22.509,33.685 C23.368,33.262 24.237,32.805 25.12,32.315 C25.46,32.129 25.802,31.937 26.142,31.738 C27.459,30.978 28.7,30.196 29.87,29.405 C29.917,28.729 29.959,28.044 29.984,27.341 C30.014,26.576 30.027,25.795 30.027,25 C30.027,23.477 29.971,22.01 29.872,20.599 C29.198,20.143 28.505,19.689 27.779,19.242 C27.246,18.911 26.701,18.586 26.142,18.262 C24.825,17.5 23.528,16.815 22.258,16.195 L22.258,16.195 Z M22.257,22.02 C23.901,22.02 25.233,23.354 25.233,25 C25.233,26.646 23.901,27.98 22.257,27.98 C20.613,27.98 19.28,26.646 19.28,25 C19.28,23.354 20.612,22.02 22.256,22.02 L22.257,22.02 Z M32.29,22.33 C32.324,23.204 32.342,24.095 32.342,25 C32.342,25.219 32.342,25.437 32.339,25.656 C32.332,26.34 32.312,27.013 32.285,27.68 C32.881,27.229 33.453,26.776 33.999,26.325 C34.068,26.268 34.134,26.215 34.2,26.159 C34.663,25.771 35.105,25.385 35.531,24.999 C35.141,24.648 34.737,24.294 34.316,23.94 C33.678,23.4 32.998,22.864 32.29,22.33 L32.29,22.33 Z M12.229,22.324 C11.693,22.728 11.175,23.134 10.68,23.54 C10.084,24.025 9.518,24.513 8.98,25.001 C9.37,25.354 9.776,25.708 10.198,26.063 C10.836,26.6 11.516,27.136 12.224,27.671 C12.19,26.796 12.172,25.905 12.172,25 C12.172,24.781 12.172,24.563 12.178,24.348 C12.183,23.664 12.202,22.991 12.228,22.324 L12.229,22.324 Z M28.892,13.488 C28.583,13.588 28.273,13.692 27.961,13.801 C27.041,14.119 26.109,14.481 25.163,14.877 C25.097,14.905 25.029,14.937 24.963,14.964 C25.737,15.373 26.516,15.802 27.299,16.255 C27.339,16.278 27.382,16.301 27.422,16.328 C28.162,16.754 28.88,17.197 29.589,17.645 C29.491,16.859 29.379,16.095 29.254,15.358 C29.144,14.714 29.02,14.093 28.892,13.488 L28.892,13.488 Z M15.62,13.488 C15.486,14.121 15.36,14.775 15.247,15.45 C15.127,16.154 15.025,16.887 14.932,17.634 C15.638,17.188 16.363,16.747 17.108,16.314 L17.214,16.255 C17.994,15.804 18.779,15.375 19.562,14.964 C18.852,14.664 18.155,14.386 17.472,14.132 C16.84,13.894 16.225,13.683 15.62,13.488 L15.62,13.488 Z' id='Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");\n    }\n\n    .wallet-selector-anchor-logo {\n        background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgc3R5bGU9IiIgdHJhbnNmb3JtPSJtYXRyaXgoMC45LCAwLCAwLCAwLjksIDEyLjc5OTk5NSwgMTIuNzk5OTk1KSI+CiAgICA8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjEyOCIgZmlsbD0iIzM2NTBBMiIgc3R5bGU9IiIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gMTI4LjAxIDQ4IEMgMTMxLjY4OSA0OCAxMzUuMDQ0IDUwLjEwMiAxMzYuNjQ3IDUzLjQxMiBMIDE3NS4wNTcgMTMyLjYxMyBMIDE3NS45MjQgMTM0LjQgTCAxNTQuNTg3IDEzNC40IEwgMTQ4LjM3OCAxMjEuNiBMIDEwNy42NCAxMjEuNiBMIDEwMS40MzMgMTM0LjQgTCA4MC4wOTQgMTM0LjQgTCA4MC45NjMgMTMyLjYxMSBMIDExOS4zNzIgNTMuNDEyIEMgMTIwLjk3OCA1MC4xMDIgMTI0LjMzMSA0OCAxMjguMDEgNDggWiBNIDExNS40IDEwNS42MDEgTCAxNDAuNjE5IDEwNS42MDEgTCAxMjguMDEgNzkuNjAxIEwgMTE1LjQgMTA1LjYwMSBaIE0gMTU2Ljc5OCAxNjEuNiBMIDE3Ni4wMDggMTYxLjYgQyAxNzUuNDMgMTg3LjQ0MyAxNTQuMDM5IDIwOCAxMjguMDEgMjA4IEMgMTAxLjk4MyAyMDggODAuNTg5IDE4Ny40NDMgODAuMDEyIDE2MS42IEwgOTkuMjIgMTYxLjYgQyA5OS42NzEgMTczLjM2NyAxMDcuNDg5IDE4My40MDkgMTE4LjM5OSAxODcuMTk1IEwgMTE4LjM5OSAxNDguODAxIEMgMTE4LjM5OSAxNDMuNDk5IDEyMi42OTggMTM5LjIgMTI4IDEzOS4yIEMgMTMzLjMwMiAxMzkuMiAxMzcuNjAxIDE0My40OTkgMTM3LjYwMSAxNDguODAxIEwgMTM3LjYwMSAxODcuMjAxIEMgMTQ4LjUyMiAxODMuNDIxIDE1Ni4zNDkgMTczLjM3NiAxNTYuNzk4IDE2MS42IFoiIGZpbGw9IndoaXRlIiBzdHlsZT0iIi8+CiAgPC9nPgo8L3N2Zz4=\");\n    }\n\n    .wallet-selector-anchor-logo {\n        width: 40px;\n        height: 40px;\n        background-size: 40px;\n        background-repeat: no-repeat;\n        background-position: 50%;\n    }\n\n    .wallet-selector-proton-logo,\n    .wallet-selector-webauth-logo {\n        width: 40px;\n        height: 40px;\n        background-size: 30px;\n        background-repeat: no-repeat;\n        background-position: 50%;\n    }\n\n    .wallet-selector-wallet-name {\n        font-family: 'Circular Std Book', sans-serif;\n        font-size: 16px;\n        line-height: 24px;\n        color: " + optionFontColor + ";\n        margin-left: 20px;\n    }\n\n    .wallet-selector-right-arrow {\n        background-image: url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 0.7)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E\");\n        width: 10px;\n        height: 20px;\n        background-size: 10px;\n        background-repeat: no-repeat;\n        background-position: 50%;\n        margin-left: auto;\n    }\n\n    .wallet-selector-proton-wallet:hover .wallet-selector-right-arrow {\n        background-image: url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E\");\n    }\n\n    .wallet-selector-webauth-wallet:hover .wallet-selector-right-arrow {\n        background-image: url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E\");\n    }\n\n    .wallet-selector-anchor-wallet:hover .wallet-selector-right-arrow {\n        background-image: url(\"data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E\");\n    }\n\n    .wallet-selector-tos-agreement {\n        font-family: 'Circular Std Book', sans-serif;\n        font-size: 12px;\n        line-height: 16px;\n        text-align: center;\n        margin-top: 55px;\n        margin-bottom: 30px;\n        color: " + secondaryFontColor + ";\n    }\n\n    .wallet-selector-tos-link {\n        color: " + linkColor + ";\n        text-decoration: none;\n    }\n\n    .wallet-selector-footnote {\n        font-family: 'Circular Std Book', sans-serif;\n        font-size: 16px;\n        text-align: center;\n        width: 100%;\n        bottom: -30px;\n        left: 0;\n        color: white !important;\n    }\n    \n    .wallet-selector-footnote a {\n        color: #ffffff !important;\n    }\n    ";
});

var SupportedWallets = /*#__PURE__*/function () {
  function SupportedWallets(name, logo, customStyleOptions) {
    this.name = name;
    this.appLogo = logo;
    this.appName = name || 'app';
    this.customStyleOptions = customStyleOptions;
  }

  var _proto = SupportedWallets.prototype;

  _proto.hideSelector = function hideSelector() {
    if (this.selectorContainerEl) {
      this.selectorContainerEl.classList.remove("wallet-selector-active");
    }
  };

  _proto.showSelector = function showSelector() {
    if (this.selectorContainerEl) {
      this.selectorContainerEl.classList.add("wallet-selector-active");
    }
  };

  _proto.setUpSelectorContainer = function setUpSelectorContainer(reject) {
    var _this = this;

    this.font = document.createElement('link');
    this.font.href = 'https://fonts.cdnfonts.com/css/circular-std-book';
    this.font.rel = 'stylesheet';
    this.styleEl = document.createElement('style');
    this.styleEl.type = 'text/css';
    var styleText = getStyleText(this.customStyleOptions);
    this.styleEl.appendChild(document.createTextNode(styleText));
    this.styleEl.appendChild(this.font);
    document.head.appendChild(this.styleEl);

    if (!this.selectorContainerEl) {
      this.clearDuplicateContainers();
      this.selectorContainerEl = this.createEl();
      this.selectorContainerEl.className = 'wallet-selector';

      this.selectorContainerEl.onclick = function (event) {
        if (event.target === _this.selectorContainerEl) {
          event.stopPropagation();

          _this.hideSelector();

          reject('no wallet selected');
        }
      };

      document.body.appendChild(this.selectorContainerEl);
    }

    if (!this.selectorEl) {
      var wrapper = this.createEl({
        "class": 'inner'
      });
      var closeButton = this.createEl({
        "class": 'close'
      });

      closeButton.onclick = function (event) {
        event.stopPropagation();

        _this.hideSelector();

        reject('no wallet selected');
      };

      this.selectorEl = this.createEl({
        "class": 'connect'
      });
      wrapper.appendChild(this.selectorEl);
      wrapper.appendChild(closeButton);
      this.selectorContainerEl.appendChild(wrapper);
    }
  };

  _proto.clearDuplicateContainers = function clearDuplicateContainers() {
    var elements = document.getElementsByClassName('wallet-selector');

    while (elements.length > 0) {
      elements[0].remove();
    }
  };

  _proto.createEl = function createEl(attrs) {
    if (!attrs) attrs = {};
    var el = document.createElement(attrs.tag || 'div');

    if (attrs) {
      for (var _i = 0, _Object$keys = Object.keys(attrs); _i < _Object$keys.length; _i++) {
        var attr = _Object$keys[_i];
        var value = attrs[attr];

        switch (attr) {
          case 'src':
            el.setAttribute(attr, value);
            break;

          case 'tag':
            break;

          case 'text':
            el.appendChild(document.createTextNode(value));
            break;

          case 'class':
            el.className = "wallet-selector-" + value;
            break;

          default:
            el.setAttribute(attr, value);
        }
      }
    }

    return el;
  }
  /**
   * Only Proton and Anchor are available
   */
  ;

  _proto.displayWalletSelector = function displayWalletSelector(enabledWalletTypes) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      _this2.setUpSelectorContainer(reject);

      var header = _this2.createEl({
        "class": 'connect-header'
      });

      var body = _this2.createEl({
        "class": 'connect-body'
      });

      if (_this2.appLogo) {
        var logoEl = _this2.createEl({
          "class": 'logo',
          tag: 'img',
          src: _this2.appLogo,
          alt: 'app-logo'
        });

        header.appendChild(logoEl);
      }

      var title = 'Connect Wallet';
      var subtitle = "To start using " + _this2.appName;

      var titleEl = _this2.createEl({
        "class": 'title',
        tag: 'span',
        text: title
      });

      var subtitleEl = _this2.createEl({
        "class": 'subtitle',
        tag: 'span',
        text: subtitle
      });

      var walletList = _this2.createEl({
        "class": 'wallet-list',
        tag: 'ul'
      });

      var eventGenerator = function eventGenerator(walletName) {
        return function (event) {
          event.stopPropagation();

          _this2.hideSelector();

          resolve(walletName);
        };
      };

      for (var _iterator = _createForOfIteratorHelperLoose(enabledWalletTypes), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
            key = _step$value.key,
            value = _step$value.value;

        var wallet = _this2.createEl({
          "class": key + "-wallet",
          tag: 'li'
        });

        wallet.onclick = eventGenerator(key);

        var logo = _this2.createEl({
          "class": key + "-logo"
        });

        var name = _this2.createEl({
          "class": 'wallet-name',
          tag: 'span',
          text: value
        });

        var rightArrow = _this2.createEl({
          "class": 'right-arrow'
        });

        wallet.appendChild(logo);
        wallet.appendChild(name);
        wallet.appendChild(rightArrow);
        walletList.appendChild(wallet);
      }

      var tosLinkEl = _this2.createEl({
        "class": 'tos-link',
        tag: 'a',
        text: "Terms of Service",
        href: 'https://protonchain.com/terms',
        target: '_blank'
      });

      var tosAgreementEl = _this2.createEl({
        "class": 'tos-agreement',
        tag: 'p',
        text: "By connecting, I accept Proton's "
      });

      tosAgreementEl.appendChild(tosLinkEl);
      header.appendChild(titleEl);
      header.appendChild(subtitleEl);
      body.appendChild(walletList);
      body.appendChild(tosAgreementEl);

      var footnoteEl = _this2.createEl({
        "class": 'footnote',
        text: "Don't have a wallet? "
      });

      var footnoteLink = _this2.createEl({
        tag: 'a',
        target: '_blank',
        href: 'https://protonchain.com/wallet',
        text: 'Download it here'
      });

      footnoteEl.appendChild(footnoteLink);
      emptyElement(_this2.selectorEl);

      _this2.selectorEl.appendChild(header);

      _this2.selectorEl.appendChild(body);

      _this2.selectorContainerEl.appendChild(footnoteEl);

      _this2.showSelector();
    });
  };

  return SupportedWallets;
}();

function emptyElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

var OPEN_SETTINGS = 'menubar=1,resizable=1,width=400,height=600';

var Deferred = function Deferred() {
  var _this = this;

  this.promise = new Promise(function (resolve, reject) {
    _this.reject = reject;
    _this.resolve = resolve;
  });
};

var ProtonWebLink = /*#__PURE__*/function () {
  function ProtonWebLink(options) {
    var _this2 = this;

    this.childWindow = null;
    this.scheme = options.scheme;
    this.storage = options.storage;
    this.testUrl = options.testUrl;
    setInterval(function () {
      return _this2.closeChild();
    }, 500);
    window.addEventListener('message', function (event) {
      return _this2.onEvent(event);
    }, false);
  }

  var _proto = ProtonWebLink.prototype;

  _proto.childUrl = function childUrl(path) {
    var base = this.testUrl ? this.testUrl : this.scheme === 'proton' ? 'https://webauth.com' : 'https://testnet.webauth.com';
    return "" + base + path;
  };

  _proto.closeChild = function closeChild(force) {
    if (force === void 0) {
      force = false;
    }

    if (this.childWindow) {
      if (force) {
        this.childWindow.close();
      }

      if (force || this.childWindow.closed) {
        this.childWindow = null;
      }
    }
  };

  _proto.createSession = function createSession(auth) {
    var _this3 = this;

    return {
      auth: auth,
      transact: function transact(args, options) {
        if (_this3.deferredLogin) {
          _this3.closeChild(true);

          _this3.deferredLogin.reject('Trying to login');

          _this3.deferredLogin = undefined;
        }

        _this3.deferredTransact = {
          deferral: new Deferred(),
          transaction: args.transaction || {
            actions: args.actions
          },
          params: options,
          waitingForOpen: true
        };
        _this3.childWindow = window.open(_this3.childUrl('/auth'), '_blank', OPEN_SETTINGS);

        try {
          return _this3.deferredTransact.deferral.promise;
        } catch (e) {
          console.error(e);
          throw e;
        }
      },
      link: {
        walletType: 'webauth'
      }
    };
  };

  _proto.login = /*#__PURE__*/function () {
    var _login = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var auth;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.deferredTransact) {
                this.closeChild(true);
                this.deferredTransact.deferral.reject('Trying to login');
                this.deferredTransact = undefined;
              }

              this.childWindow = window.open(this.childUrl('/login'), '_blank', OPEN_SETTINGS);
              this.deferredLogin = new Deferred();
              _context.prev = 3;
              this.storage.write('wallet-type', 'webauth');
              _context.next = 7;
              return this.deferredLogin.promise;

            case 7:
              auth = _context.sent;
              return _context.abrupt("return", {
                session: this.createSession(auth)
              });

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              console.error(_context.t0);
              throw _context.t0;

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 11]]);
    }));

    function login() {
      return _login.apply(this, arguments);
    }

    return login;
  }();

  _proto.restoreSession = /*#__PURE__*/function () {
    var _restoreSession = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(
    /* requestAccount */
    _, auth) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.createSession(auth));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function restoreSession(_x, _x2) {
      return _restoreSession.apply(this, arguments);
    }

    return restoreSession;
  }();

  _proto.removeSession = /*#__PURE__*/function () {
    var _removeSession = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(appIdentifier, auth, chainId) {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.storage) {
                _context3.next = 2;
                break;
              }

              throw new Error('Unable to remove session: No storage adapter configured');

            case 2:
              _context3.next = 4;
              return this.storage.read('wallet-type');

            case 4:
              if (!_context3.sent) {
                _context3.next = 6;
                break;
              }

              this.storage.remove('wallet-type');

            case 6:
              _context3.next = 8;
              return this.storage.read('user-auth');

            case 8:
              if (!_context3.sent) {
                _context3.next = 10;
                break;
              }

              this.storage.remove('user-auth');

            case 10:
              return _context3.abrupt("return", {
                appIdentifier: appIdentifier,
                auth: auth,
                chainId: chainId
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function removeSession(_x3, _x4, _x5) {
      return _removeSession.apply(this, arguments);
    }

    return removeSession;
  }();

  _proto.onEvent = /*#__PURE__*/function () {
    var _onEvent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(e) {
      var eventData, _eventData, type, data, error;

      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(e.origin.indexOf('https://webauth.com') !== -1 && e.origin.indexOf('https://testnet.webauth.com') !== -1)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return");

            case 2:
              _context4.prev = 2;
              eventData = JSON.parse(e.data);
              _context4.next = 9;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](2);
              return _context4.abrupt("return");

            case 9:
              _context4.prev = 9;
              _eventData = eventData, type = _eventData.type, data = _eventData.data, error = _eventData.error;

              if (type) {
                _context4.next = 13;
                break;
              }

              return _context4.abrupt("return");

            case 13:
              console.log(type, data, error); // Ready to receive transaction

              if (type === 'isReady') {
                if (this.deferredTransact && this.deferredTransact.waitingForOpen) {
                  this.deferredTransact.waitingForOpen = false;
                  this.childWindow.postMessage(JSON.stringify({
                    type: 'transaction',
                    data: {
                      transaction: this.deferredTransact.transaction,
                      params: this.deferredTransact.params
                    }
                  }), '*');
                }
              } // Close child
              else if (type === 'close') {
                this.closeChild(true);

                if (this.deferredTransact) {
                  this.deferredTransact.deferral.reject('Closed');
                } else if (this.deferredLogin) {
                  this.deferredLogin.reject('Closed');
                }
              } // TX Success
              else if (type === 'transactionSuccess') {
                this.closeChild(true);

                if (this.deferredTransact) {
                  if (error) {
                    this.deferredTransact.deferral.reject(error && error.json ? error.json : error);
                  } else {
                    this.deferredTransact.deferral.resolve(data);
                  }

                  this.deferredTransact = undefined;
                }
              } // Login success
              else if (type === 'loginSuccess') {
                this.closeChild(true);

                if (this.deferredLogin) {
                  this.deferredLogin.resolve(data);
                  this.deferredLogin = undefined;
                }
              }

              _context4.next = 20;
              break;

            case 17:
              _context4.prev = 17;
              _context4.t1 = _context4["catch"](9);
              console.error(_context4.t1);

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[2, 6], [9, 17]]);
    }));

    function onEvent(_x6) {
      return _onEvent.apply(this, arguments);
    }

    return onEvent;
  }();

  return ProtonWebLink;
}();

var Storage = /*#__PURE__*/function () {
  function Storage(keyPrefix) {
    this.keyPrefix = keyPrefix;
  }

  var _proto = Storage.prototype;

  _proto.write = /*#__PURE__*/function () {
    var _write = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(key, data) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              localStorage.setItem(this.storageKey(key), data);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function write(_x, _x2) {
      return _write.apply(this, arguments);
    }

    return write;
  }();

  _proto.read = /*#__PURE__*/function () {
    var _read = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(key) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", localStorage.getItem(this.storageKey(key)));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function read(_x3) {
      return _read.apply(this, arguments);
    }

    return read;
  }();

  _proto.remove = /*#__PURE__*/function () {
    var _remove = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(key) {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              localStorage.removeItem(this.storageKey(key));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function remove(_x4) {
      return _remove.apply(this, arguments);
    }

    return remove;
  }();

  _proto.storageKey = function storageKey(key) {
    return this.keyPrefix + "-" + key;
  };

  return Storage;
}();

var ALL_WALLETS = [{
  key: 'proton',
  value: 'Mobile Wallet'
}, {
  key: 'webauth',
  value: 'Web Wallet'
}, {
  key: 'anchor',
  value: 'Anchor'
}];
var ConnectWallet = /*#__PURE__*/function () {
  var _ref2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(_ref) {
    var linkOptions, _ref$transportOptions, transportOptions, _ref$selectorOptions, selectorOptions, info, session, link, loginResult, res;

    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            linkOptions = _ref.linkOptions, _ref$transportOptions = _ref.transportOptions, transportOptions = _ref$transportOptions === void 0 ? {} : _ref$transportOptions, _ref$selectorOptions = _ref.selectorOptions, selectorOptions = _ref$selectorOptions === void 0 ? {} : _ref$selectorOptions;
            // Add RPC
            linkOptions.client = new APIClient({
              provider: new AxiosProvider(linkOptions.endpoints)
            }); // Add chain ID if not present

            if (linkOptions.chainId) {
              _context5.next = 8;
              break;
            }

            _context5.next = 5;
            return linkOptions.client.v1.chain.get_info();

          case 5:
            info = _context5.sent;
            linkOptions.chainId = info.chain_id;

          case 8:
            // Add storage if not present
            if (!linkOptions.storage) {
              linkOptions.storage = new Storage(linkOptions.storagePrefix || 'proton-storage');
            }

            _context5.prev = 9;
            _context5.next = 12;
            return new Promise(function (resolve) {
              var login = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
                  var wallets, walletType, enabledWalletTypes, scheme, options, backToSelector, stringAuth, stringifiedUserAuth, parsedUserAuth, savedUserAuth;
                  return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          // Create Modal Class
                          wallets = new SupportedWallets(selectorOptions.appName, selectorOptions.appLogo, selectorOptions.customStyleOptions); // Determine wallet type from storage or selector modal

                          // Determine wallet type from storage or selector modal
                          walletType = selectorOptions.walletType;

                          if (walletType) {
                            _context4.next = 19;
                            break;
                          }

                          if (!linkOptions.restoreSession) {
                            _context4.next = 9;
                            break;
                          }

                          _context4.next = 6;
                          return linkOptions.storage.read('wallet-type');

                        case 6:
                          walletType = _context4.sent;
                          _context4.next = 19;
                          break;

                        case 9:
                          enabledWalletTypes = selectorOptions.enabledWalletTypes ? ALL_WALLETS.filter(function (wallet) {
                            var _selectorOptions$enab;

                            return (_selectorOptions$enab = selectorOptions.enabledWalletTypes) == null ? void 0 : _selectorOptions$enab.includes(wallet.key);
                          }) : ALL_WALLETS;
                          _context4.prev = 10;
                          _context4.next = 13;
                          return wallets.displayWalletSelector(enabledWalletTypes);

                        case 13:
                          walletType = _context4.sent;
                          _context4.next = 19;
                          break;

                        case 16:
                          _context4.prev = 16;
                          _context4.t0 = _context4["catch"](10);
                          resolve({
                            error: _context4.t0
                          });

                        case 19:
                          if (walletType) {
                            _context4.next = 22;
                            break;
                          }

                          resolve({
                            error: new Error('Wallet Type Unavailable: No walletType provided')
                          });
                          return _context4.abrupt("return");

                        case 22:
                          _context4.t1 = walletType;
                          _context4.next = _context4.t1 === 'anchor' ? 25 : _context4.t1 === 'proton' ? 27 : _context4.t1 === 'webauth' ? 27 : 29;
                          break;

                        case 25:
                          scheme = 'esr';
                          return _context4.abrupt("break", 31);

                        case 27:
                          // Proton Testnet
                          if (linkOptions.chainId === '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd') {
                            scheme = 'proton-dev';
                          } else {
                            scheme = 'proton';
                          }

                          return _context4.abrupt("break", 31);

                        case 29:
                          scheme = 'proton';
                          return _context4.abrupt("break", 31);

                        case 31:
                          console.log('SCHEME', scheme);
                          options = _extends({}, linkOptions, {
                            scheme: scheme,
                            transport: new ProtonLinkBrowserTransport(_extends({}, transportOptions, {
                              walletType: walletType
                            })),
                            walletType: walletType,
                            chains: []
                          }); // Create link

                          // Create link
                          if (walletType === 'webauth') {
                            link = new ProtonWebLink(options);
                          } else {
                            link = new ProtonLink(options);
                          } // Session from login


                          if (linkOptions.restoreSession) {
                            _context4.next = 61;
                            break;
                          }

                          backToSelector = false;
                          document.addEventListener('backToSelector', function () {
                            backToSelector = true;
                          });
                          _context4.prev = 37;
                          _context4.next = 40;
                          return link.login(transportOptions.requestAccount || '');

                        case 40:
                          loginResult = _context4.sent;
                          session = loginResult.session;
                          console.log('loginResult', loginResult);
                          stringAuth = JSON.stringify({
                            actor: loginResult.session.auth.actor.toString(),
                            permission: loginResult.session.auth.permission.toString()
                          });
                          linkOptions.storage.write('user-auth', stringAuth);
                          _context4.next = 59;
                          break;

                        case 47:
                          _context4.prev = 47;
                          _context4.t2 = _context4["catch"](37);
                          console.log('restoreSession Error:');
                          console.error(_context4.t2);
                          console.log('backToSelector', backToSelector);

                          if (!backToSelector) {
                            _context4.next = 57;
                            break;
                          }

                          document.removeEventListener('backToSelector', function () {
                            backToSelector = true;
                          });
                          return _context4.abrupt("return", login());

                        case 57:
                          resolve({
                            error: _context4.t2
                          });
                          return _context4.abrupt("return");

                        case 59:
                          _context4.next = 75;
                          break;

                        case 61:
                          _context4.next = 63;
                          return linkOptions.storage.read('user-auth');

                        case 63:
                          stringifiedUserAuth = _context4.sent;
                          parsedUserAuth = stringifiedUserAuth ? JSON.parse(stringifiedUserAuth) : {};
                          savedUserAuth = Object.keys(parsedUserAuth).length > 0 ? parsedUserAuth : null;

                          if (!savedUserAuth) {
                            _context4.next = 75;
                            break;
                          }

                          _context4.next = 69;
                          return link.restoreSession(transportOptions.requestAccount || '', savedUserAuth);

                        case 69:
                          session = _context4.sent;

                          if (session) {
                            _context4.next = 75;
                            break;
                          }

                          // clean storage to remove unexpected side effects if session restore fails
                          linkOptions.storage.remove('wallet-type');
                          linkOptions.storage.remove('user-auth');
                          resolve({
                            link: undefined,
                            session: undefined
                          });
                          return _context4.abrupt("return");

                        case 75:
                          if (session && session.auth) {
                            session.auth = {
                              actor: session.auth.actor.toString(),
                              permission: session.auth.permission.toString()
                            };
                            session.publicKey = session.publicKey ? session.publicKey.toString() : undefined;
                          }

                          resolve({
                            session: session,
                            link: link,
                            loginResult: loginResult
                          });
                          return _context4.abrupt("return");

                        case 78:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, null, [[10, 16], [37, 47]]);
                }));

                return function login() {
                  return _ref3.apply(this, arguments);
                };
              }();

              login();
            });

          case 12:
            res = _context5.sent;
            return _context5.abrupt("return", res);

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](9);
            return _context5.abrupt("return", {
              error: _context5.t0
            });

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[9, 16]]);
  }));

  return function ConnectWallet(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

export { ConnectWallet, ProtonWebLink };
//# sourceMappingURL=web-sdk.esm.js.map
