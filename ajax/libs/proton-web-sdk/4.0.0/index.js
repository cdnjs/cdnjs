/**
 * Proton Web SDK v4.0.0
 * undefined
 *
 * @license
 * MIT License
 * 
 * Copyright (c) 2020 jafri
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import ProtonLinkBrowserTransport from '@proton/browser-transport';
import ProtonLink from '@proton/link';
import { JsonRpc } from '@proton/js';

var getStyleText = (customStyleOptions) => {
    const defaultOptions = {
        modalBackgroundColor: '#ffffff',
        logoBackgroundColor: 'transparent',
        isLogoRound: false,
        optionBackgroundColor: 'transparent',
        optionFontColor: '#000531',
        primaryFontColor: 'black',
        secondaryFontColor: '#a1a5b0',
        linkColor: '#00AAEF',
    };
    const { modalBackgroundColor, logoBackgroundColor, isLogoRound, optionBackgroundColor, optionFontColor, primaryFontColor, secondaryFontColor, linkColor, } = Object.assign(defaultOptions, customStyleOptions);
    return `
    .wallet-selector * {
        box-sizing: border-box;
        line-height: 1;
    }

    .wallet-selector {
        font-family: 'Circular Std Book', -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
            Arial, sans-serif;
        font-size: 13px;
        background: rgba(0, 0, 0, 0.65);
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 2147483647;
        display: none;
        align-items: center;
        justify-content: center;
    }

    .wallet-selector-active {
        display: flex;
        flex-direction: column;
    }

    .wallet-selector-inner {
        background: ${modalBackgroundColor};
        color: white;
        margin: 20px 20px 13px 20px;
        padding-top: 50px;
        border-radius: 10px;
        box-shadow: 0px -10px 50px rgba(0, 0, 0, .5) !important;
        width: 360px;
        transition-property: all;
        transition-duration: .5s;
        transition-timing-function: ease-in-out;
        position: relative;
    }

    .wallet-selector-close {
        display: block;
        position: absolute;
        top: 16px;
        right: 16px;
        width: 28px;
        height: 28px;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(161, 165, 176, 0.7)' fill-rule='nonzero'/%3E%3C/svg%3E");
        background-size: 14px;
        background-repeat: no-repeat;
        background-position: 50%;
        cursor: pointer;
        transition: background-image 0.2s ease;
    }

    .wallet-selector-close:hover {
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.66 10.987L6 7.327l-3.66 3.66A1.035 1.035 0 11.876 9.523l3.66-3.66-3.66-3.66A1.035 1.035 0 012.34.737L6 4.398 9.66.739a1.035 1.035 0 111.464 1.464l-3.66 3.66 3.66 3.661a1.035 1.035 0 11-1.464 1.464z' fill='rgba(161, 165, 176, 1)' fill-rule='nonzero'/%3E%3C/svg%3E");
        transition: background-image 0.2s ease;
    }

    .wallet-selector-connect {
        padding: 0px 20px;
        border-radius: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        background: ${modalBackgroundColor};
    }

    .wallet-selector-connect-header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .wallet-selector-logo {
        width: 100px;
        height: 100px;
        background: ${logoBackgroundColor};
        ${isLogoRound && `
        width: 120px;
        height: 120px;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid rgba(161, 165, 176, 0.23);
        border-radius: 50%;
        `}
    }

    .wallet-selector-title {
        font-size: 16px;
        font-family: 'Circular Std Book', sans-serif;
        line-height: 24px;
        color: ${primaryFontColor};
        text-align: center;
    }

    .wallet-selector-subtitle {
        font-size: 16px;
        font-family: 'Circular Std Book', sans-serif;
        line-height: 24px;
        color: ${secondaryFontColor};
        text-align: center;
    }

    .wallet-selector-connect-body {
        margin-top: 55px;
    }

    .wallet-selector-wallet-list {
        margin: 0px;
        padding: 0px;
        list-style: none;
    }

    .wallet-selector-wallet-list li {
        background: ${optionBackgroundColor};
    }

    .wallet-selector-proton-wallet, .wallet-selector-webauth-wallet, .wallet-selector-anchor-wallet {
        display: flex;
        align-items: center;
        padding: 20px 20px 20px 16px;
        border: 1px solid rgba(161, 165, 176, 0.23);
    }

    .wallet-selector-webauth-wallet, .wallet-selector-anchor-wallet {
        margin-top: 8px;
    }

    .wallet-selector-proton-wallet:hover, .wallet-selector-webauth-wallet:hover, .wallet-selector-anchor-wallet:hover {
        cursor: pointer;
    }

    .wallet-selector-proton-logo {
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='45px' height='50px' viewBox='0 0 45 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Elogo%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='15.004%25' y1='50%25' x2='89.621%25' y2='53.538%25' id='linearGradient-1'%3E%3Cstop stop-color='%237543E3' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23582ACB' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='logo' fill='url(%23linearGradient-1)' fill-rule='nonzero'%3E%3Cg id='Group'%3E%3Cpath d='M22.257,0 C25.457,0 28.219,3.328 30.037,8.735 C29.303,8.94 28.553,9.169 27.795,9.424 C26.285,4.95 24.211,2.318 22.257,2.318 C20.054,2.318 17.705,5.656 16.174,11.205 C16.772,11.399 17.376,11.604 17.991,11.831 C19.379,12.343 20.811,12.945 22.271,13.628 L22.521,13.51 C23.457,13.08 24.386,12.682 25.306,12.318 C25.418,12.275 25.527,12.232 25.636,12.188 C28.391,11.123 31.052,10.358 33.489,9.954 C38.737,9.079 42.427,9.984 43.875,12.5 C45.327,15.017 44.265,18.669 40.886,22.781 C40.691,23.017 40.493,23.255 40.284,23.491 C39.782,22.931 39.246,22.371 38.674,21.811 C41.657,18.348 42.831,15.321 41.872,13.659 C40.966,12.086 37.976,11.556 33.87,12.239 C32.992,12.385 32.08,12.583 31.143,12.827 C31.277,13.443 31.403,14.071 31.512,14.722 C31.765,16.179 31.962,17.72 32.101,19.325 C32.822,19.834 33.527,20.349 34.204,20.875 C36.856,22.93 39.134,25.086 40.886,27.219 C44.266,31.331 45.327,34.983 43.876,37.5 C42.788,39.39 40.433,40.37 37.104,40.37 C36.003,40.37 34.795,40.265 33.489,40.046 C33.152,39.99 32.809,39.927 32.461,39.858 C32.669,39.139 32.861,38.388 33.036,37.609 C33.317,37.666 33.596,37.715 33.87,37.762 C37.973,38.444 40.966,37.914 41.872,36.342 C42.973,34.43 41.253,30.714 37.209,26.604 C36.805,26.974 36.389,27.34 35.959,27.705 C35.897,27.758 35.83,27.815 35.768,27.865 C34.624,28.825 33.394,29.767 32.096,30.681 C32.033,31.409 31.962,32.127 31.876,32.825 C30.613,43.01 26.896,50 22.256,50 C19.063,50 16.305,46.682 14.486,41.288 C15.217,41.089 15.964,40.858 16.728,40.599 C18.239,45.059 20.306,47.682 22.257,47.682 C24.46,47.682 26.815,44.332 28.347,38.768 C27.747,38.577 27.141,38.373 26.529,38.146 C25.132,37.636 23.706,37.04 22.269,36.374 L22.177,36.417 C21.367,36.795 20.57,37.146 19.783,37.47 C19.661,37.52 19.543,37.57 19.423,37.613 C14.893,39.44 10.756,40.387 7.466,40.387 C4.189,40.387 1.759,39.447 0.635,37.5 C-0.972,34.712 0.549,30.63 4.355,26.325 L5.972,28.033 C2.893,31.563 1.67,34.656 2.642,36.341 C3.742,38.25 7.804,38.619 13.368,37.171 C13.237,36.558 13.112,35.931 13.002,35.281 C12.751,33.826 12.555,32.289 12.416,30.687 C11.691,30.179 10.986,29.667 10.316,29.152 C3.87,24.185 0,18.911 0,14.983 C0,14.076 0.208,13.242 0.635,12.5 C2.235,9.728 6.485,8.997 12.063,10.116 C11.851,10.844 11.656,11.606 11.481,12.394 C6.894,11.487 3.611,11.974 2.642,13.659 C1.542,15.567 3.255,19.275 7.287,23.379 C7.804,22.909 8.341,22.443 8.905,21.98 C9.991,21.08 11.167,20.187 12.418,19.31 C12.481,18.58 12.553,17.86 12.641,17.162 C13.904,6.987 17.621,0 22.257,0 Z M29.581,32.36 C29.024,32.714 28.461,33.063 27.885,33.404 C27.69,33.52 27.495,33.632 27.299,33.745 C26.615,34.139 25.93,34.52 25.253,34.877 C25.153,34.931 25.053,34.981 24.953,35.034 C25.656,35.332 26.354,35.611 27.045,35.868 C27.669,36.1 28.285,36.313 28.895,36.513 C29.03,35.878 29.156,35.223 29.27,34.546 C29.388,33.843 29.489,33.108 29.581,32.36 Z M14.925,32.357 C15.023,33.142 15.135,33.906 15.26,34.642 C15.37,35.287 15.492,35.906 15.622,36.511 C15.996,36.389 16.374,36.262 16.758,36.126 C16.874,36.086 16.993,36.043 17.108,36 C17.898,35.715 18.708,35.4 19.535,35.046 L19.558,35.036 C18.776,34.626 17.994,34.196 17.214,33.745 C17.174,33.722 17.132,33.699 17.092,33.672 C16.348,33.241 15.629,32.801 14.925,32.357 L14.925,32.357 Z M22.258,16.195 C21.467,16.581 20.673,16.985 19.879,17.417 C19.377,17.689 18.874,17.97 18.372,18.262 C17.055,19.022 15.814,19.805 14.644,20.596 C14.596,21.272 14.555,21.956 14.529,22.659 C14.499,23.424 14.486,24.205 14.486,25 C14.486,26.524 14.542,27.991 14.642,29.402 C15.317,29.859 16.012,30.312 16.738,30.758 C17.27,31.089 17.813,31.418 18.372,31.738 C19.665,32.486 20.966,33.175 22.259,33.804 L22.509,33.685 C23.368,33.262 24.237,32.805 25.12,32.315 C25.46,32.129 25.802,31.937 26.142,31.738 C27.459,30.978 28.7,30.196 29.87,29.405 C29.917,28.729 29.959,28.044 29.984,27.341 C30.014,26.576 30.027,25.795 30.027,25 C30.027,23.477 29.971,22.01 29.872,20.599 C29.198,20.143 28.505,19.689 27.779,19.242 C27.246,18.911 26.701,18.586 26.142,18.262 C24.825,17.5 23.528,16.815 22.258,16.195 L22.258,16.195 Z M22.257,22.02 C23.901,22.02 25.233,23.354 25.233,25 C25.233,26.646 23.901,27.98 22.257,27.98 C20.613,27.98 19.28,26.646 19.28,25 C19.28,23.354 20.612,22.02 22.256,22.02 L22.257,22.02 Z M32.29,22.33 C32.324,23.204 32.342,24.095 32.342,25 C32.342,25.219 32.342,25.437 32.339,25.656 C32.332,26.34 32.312,27.013 32.285,27.68 C32.881,27.229 33.453,26.776 33.999,26.325 C34.068,26.268 34.134,26.215 34.2,26.159 C34.663,25.771 35.105,25.385 35.531,24.999 C35.141,24.648 34.737,24.294 34.316,23.94 C33.678,23.4 32.998,22.864 32.29,22.33 L32.29,22.33 Z M12.229,22.324 C11.693,22.728 11.175,23.134 10.68,23.54 C10.084,24.025 9.518,24.513 8.98,25.001 C9.37,25.354 9.776,25.708 10.198,26.063 C10.836,26.6 11.516,27.136 12.224,27.671 C12.19,26.796 12.172,25.905 12.172,25 C12.172,24.781 12.172,24.563 12.178,24.348 C12.183,23.664 12.202,22.991 12.228,22.324 L12.229,22.324 Z M28.892,13.488 C28.583,13.588 28.273,13.692 27.961,13.801 C27.041,14.119 26.109,14.481 25.163,14.877 C25.097,14.905 25.029,14.937 24.963,14.964 C25.737,15.373 26.516,15.802 27.299,16.255 C27.339,16.278 27.382,16.301 27.422,16.328 C28.162,16.754 28.88,17.197 29.589,17.645 C29.491,16.859 29.379,16.095 29.254,15.358 C29.144,14.714 29.02,14.093 28.892,13.488 L28.892,13.488 Z M15.62,13.488 C15.486,14.121 15.36,14.775 15.247,15.45 C15.127,16.154 15.025,16.887 14.932,17.634 C15.638,17.188 16.363,16.747 17.108,16.314 L17.214,16.255 C17.994,15.804 18.779,15.375 19.562,14.964 C18.852,14.664 18.155,14.386 17.472,14.132 C16.84,13.894 16.225,13.683 15.62,13.488 L15.62,13.488 Z' id='Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .wallet-selector-webauth-logo {
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='45px' height='50px' viewBox='0 0 45 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Elogo%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='15.004%25' y1='50%25' x2='89.621%25' y2='53.538%25' id='linearGradient-1'%3E%3Cstop stop-color='%237543E3' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23582ACB' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='logo' fill='url(%23linearGradient-1)' fill-rule='nonzero'%3E%3Cg id='Group'%3E%3Cpath d='M22.257,0 C25.457,0 28.219,3.328 30.037,8.735 C29.303,8.94 28.553,9.169 27.795,9.424 C26.285,4.95 24.211,2.318 22.257,2.318 C20.054,2.318 17.705,5.656 16.174,11.205 C16.772,11.399 17.376,11.604 17.991,11.831 C19.379,12.343 20.811,12.945 22.271,13.628 L22.521,13.51 C23.457,13.08 24.386,12.682 25.306,12.318 C25.418,12.275 25.527,12.232 25.636,12.188 C28.391,11.123 31.052,10.358 33.489,9.954 C38.737,9.079 42.427,9.984 43.875,12.5 C45.327,15.017 44.265,18.669 40.886,22.781 C40.691,23.017 40.493,23.255 40.284,23.491 C39.782,22.931 39.246,22.371 38.674,21.811 C41.657,18.348 42.831,15.321 41.872,13.659 C40.966,12.086 37.976,11.556 33.87,12.239 C32.992,12.385 32.08,12.583 31.143,12.827 C31.277,13.443 31.403,14.071 31.512,14.722 C31.765,16.179 31.962,17.72 32.101,19.325 C32.822,19.834 33.527,20.349 34.204,20.875 C36.856,22.93 39.134,25.086 40.886,27.219 C44.266,31.331 45.327,34.983 43.876,37.5 C42.788,39.39 40.433,40.37 37.104,40.37 C36.003,40.37 34.795,40.265 33.489,40.046 C33.152,39.99 32.809,39.927 32.461,39.858 C32.669,39.139 32.861,38.388 33.036,37.609 C33.317,37.666 33.596,37.715 33.87,37.762 C37.973,38.444 40.966,37.914 41.872,36.342 C42.973,34.43 41.253,30.714 37.209,26.604 C36.805,26.974 36.389,27.34 35.959,27.705 C35.897,27.758 35.83,27.815 35.768,27.865 C34.624,28.825 33.394,29.767 32.096,30.681 C32.033,31.409 31.962,32.127 31.876,32.825 C30.613,43.01 26.896,50 22.256,50 C19.063,50 16.305,46.682 14.486,41.288 C15.217,41.089 15.964,40.858 16.728,40.599 C18.239,45.059 20.306,47.682 22.257,47.682 C24.46,47.682 26.815,44.332 28.347,38.768 C27.747,38.577 27.141,38.373 26.529,38.146 C25.132,37.636 23.706,37.04 22.269,36.374 L22.177,36.417 C21.367,36.795 20.57,37.146 19.783,37.47 C19.661,37.52 19.543,37.57 19.423,37.613 C14.893,39.44 10.756,40.387 7.466,40.387 C4.189,40.387 1.759,39.447 0.635,37.5 C-0.972,34.712 0.549,30.63 4.355,26.325 L5.972,28.033 C2.893,31.563 1.67,34.656 2.642,36.341 C3.742,38.25 7.804,38.619 13.368,37.171 C13.237,36.558 13.112,35.931 13.002,35.281 C12.751,33.826 12.555,32.289 12.416,30.687 C11.691,30.179 10.986,29.667 10.316,29.152 C3.87,24.185 0,18.911 0,14.983 C0,14.076 0.208,13.242 0.635,12.5 C2.235,9.728 6.485,8.997 12.063,10.116 C11.851,10.844 11.656,11.606 11.481,12.394 C6.894,11.487 3.611,11.974 2.642,13.659 C1.542,15.567 3.255,19.275 7.287,23.379 C7.804,22.909 8.341,22.443 8.905,21.98 C9.991,21.08 11.167,20.187 12.418,19.31 C12.481,18.58 12.553,17.86 12.641,17.162 C13.904,6.987 17.621,0 22.257,0 Z M29.581,32.36 C29.024,32.714 28.461,33.063 27.885,33.404 C27.69,33.52 27.495,33.632 27.299,33.745 C26.615,34.139 25.93,34.52 25.253,34.877 C25.153,34.931 25.053,34.981 24.953,35.034 C25.656,35.332 26.354,35.611 27.045,35.868 C27.669,36.1 28.285,36.313 28.895,36.513 C29.03,35.878 29.156,35.223 29.27,34.546 C29.388,33.843 29.489,33.108 29.581,32.36 Z M14.925,32.357 C15.023,33.142 15.135,33.906 15.26,34.642 C15.37,35.287 15.492,35.906 15.622,36.511 C15.996,36.389 16.374,36.262 16.758,36.126 C16.874,36.086 16.993,36.043 17.108,36 C17.898,35.715 18.708,35.4 19.535,35.046 L19.558,35.036 C18.776,34.626 17.994,34.196 17.214,33.745 C17.174,33.722 17.132,33.699 17.092,33.672 C16.348,33.241 15.629,32.801 14.925,32.357 L14.925,32.357 Z M22.258,16.195 C21.467,16.581 20.673,16.985 19.879,17.417 C19.377,17.689 18.874,17.97 18.372,18.262 C17.055,19.022 15.814,19.805 14.644,20.596 C14.596,21.272 14.555,21.956 14.529,22.659 C14.499,23.424 14.486,24.205 14.486,25 C14.486,26.524 14.542,27.991 14.642,29.402 C15.317,29.859 16.012,30.312 16.738,30.758 C17.27,31.089 17.813,31.418 18.372,31.738 C19.665,32.486 20.966,33.175 22.259,33.804 L22.509,33.685 C23.368,33.262 24.237,32.805 25.12,32.315 C25.46,32.129 25.802,31.937 26.142,31.738 C27.459,30.978 28.7,30.196 29.87,29.405 C29.917,28.729 29.959,28.044 29.984,27.341 C30.014,26.576 30.027,25.795 30.027,25 C30.027,23.477 29.971,22.01 29.872,20.599 C29.198,20.143 28.505,19.689 27.779,19.242 C27.246,18.911 26.701,18.586 26.142,18.262 C24.825,17.5 23.528,16.815 22.258,16.195 L22.258,16.195 Z M22.257,22.02 C23.901,22.02 25.233,23.354 25.233,25 C25.233,26.646 23.901,27.98 22.257,27.98 C20.613,27.98 19.28,26.646 19.28,25 C19.28,23.354 20.612,22.02 22.256,22.02 L22.257,22.02 Z M32.29,22.33 C32.324,23.204 32.342,24.095 32.342,25 C32.342,25.219 32.342,25.437 32.339,25.656 C32.332,26.34 32.312,27.013 32.285,27.68 C32.881,27.229 33.453,26.776 33.999,26.325 C34.068,26.268 34.134,26.215 34.2,26.159 C34.663,25.771 35.105,25.385 35.531,24.999 C35.141,24.648 34.737,24.294 34.316,23.94 C33.678,23.4 32.998,22.864 32.29,22.33 L32.29,22.33 Z M12.229,22.324 C11.693,22.728 11.175,23.134 10.68,23.54 C10.084,24.025 9.518,24.513 8.98,25.001 C9.37,25.354 9.776,25.708 10.198,26.063 C10.836,26.6 11.516,27.136 12.224,27.671 C12.19,26.796 12.172,25.905 12.172,25 C12.172,24.781 12.172,24.563 12.178,24.348 C12.183,23.664 12.202,22.991 12.228,22.324 L12.229,22.324 Z M28.892,13.488 C28.583,13.588 28.273,13.692 27.961,13.801 C27.041,14.119 26.109,14.481 25.163,14.877 C25.097,14.905 25.029,14.937 24.963,14.964 C25.737,15.373 26.516,15.802 27.299,16.255 C27.339,16.278 27.382,16.301 27.422,16.328 C28.162,16.754 28.88,17.197 29.589,17.645 C29.491,16.859 29.379,16.095 29.254,15.358 C29.144,14.714 29.02,14.093 28.892,13.488 L28.892,13.488 Z M15.62,13.488 C15.486,14.121 15.36,14.775 15.247,15.45 C15.127,16.154 15.025,16.887 14.932,17.634 C15.638,17.188 16.363,16.747 17.108,16.314 L17.214,16.255 C17.994,15.804 18.779,15.375 19.562,14.964 C18.852,14.664 18.155,14.386 17.472,14.132 C16.84,13.894 16.225,13.683 15.62,13.488 L15.62,13.488 Z' id='Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }

    .wallet-selector-anchor-logo {
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgc3R5bGU9IiIgdHJhbnNmb3JtPSJtYXRyaXgoMC45LCAwLCAwLCAwLjksIDEyLjc5OTk5NSwgMTIuNzk5OTk1KSI+CiAgICA8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjEyOCIgZmlsbD0iIzM2NTBBMiIgc3R5bGU9IiIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gMTI4LjAxIDQ4IEMgMTMxLjY4OSA0OCAxMzUuMDQ0IDUwLjEwMiAxMzYuNjQ3IDUzLjQxMiBMIDE3NS4wNTcgMTMyLjYxMyBMIDE3NS45MjQgMTM0LjQgTCAxNTQuNTg3IDEzNC40IEwgMTQ4LjM3OCAxMjEuNiBMIDEwNy42NCAxMjEuNiBMIDEwMS40MzMgMTM0LjQgTCA4MC4wOTQgMTM0LjQgTCA4MC45NjMgMTMyLjYxMSBMIDExOS4zNzIgNTMuNDEyIEMgMTIwLjk3OCA1MC4xMDIgMTI0LjMzMSA0OCAxMjguMDEgNDggWiBNIDExNS40IDEwNS42MDEgTCAxNDAuNjE5IDEwNS42MDEgTCAxMjguMDEgNzkuNjAxIEwgMTE1LjQgMTA1LjYwMSBaIE0gMTU2Ljc5OCAxNjEuNiBMIDE3Ni4wMDggMTYxLjYgQyAxNzUuNDMgMTg3LjQ0MyAxNTQuMDM5IDIwOCAxMjguMDEgMjA4IEMgMTAxLjk4MyAyMDggODAuNTg5IDE4Ny40NDMgODAuMDEyIDE2MS42IEwgOTkuMjIgMTYxLjYgQyA5OS42NzEgMTczLjM2NyAxMDcuNDg5IDE4My40MDkgMTE4LjM5OSAxODcuMTk1IEwgMTE4LjM5OSAxNDguODAxIEMgMTE4LjM5OSAxNDMuNDk5IDEyMi42OTggMTM5LjIgMTI4IDEzOS4yIEMgMTMzLjMwMiAxMzkuMiAxMzcuNjAxIDE0My40OTkgMTM3LjYwMSAxNDguODAxIEwgMTM3LjYwMSAxODcuMjAxIEMgMTQ4LjUyMiAxODMuNDIxIDE1Ni4zNDkgMTczLjM3NiAxNTYuNzk4IDE2MS42IFoiIGZpbGw9IndoaXRlIiBzdHlsZT0iIi8+CiAgPC9nPgo8L3N2Zz4=");
    }

    .wallet-selector-anchor-logo {
        width: 40px;
        height: 40px;
        background-size: 40px;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .wallet-selector-proton-logo,
    .wallet-selector-webauth-logo {
        width: 40px;
        height: 40px;
        background-size: 30px;
        background-repeat: no-repeat;
        background-position: 50%;
    }

    .wallet-selector-wallet-name {
        font-family: 'Circular Std Book', sans-serif;
        font-size: 16px;
        line-height: 24px;
        color: ${optionFontColor};
        margin-left: 20px;
    }

    .wallet-selector-right-arrow {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 0.7)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E");
        width: 10px;
        height: 20px;
        background-size: 10px;
        background-repeat: no-repeat;
        background-position: 50%;
        margin-left: auto;
    }

    .wallet-selector-proton-wallet:hover .wallet-selector-right-arrow {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E");
    }

    .wallet-selector-webauth-wallet:hover .wallet-selector-right-arrow {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E");
    }

    .wallet-selector-anchor-wallet:hover .wallet-selector-right-arrow {
        background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='chevron-right' class='svg-inline--fa fa-chevron-right fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='rgba(161, 165, 176, 1)' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E");
    }

    .wallet-selector-tos-agreement {
        font-family: 'Circular Std Book', sans-serif;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        margin-top: 55px;
        margin-bottom: 30px;
        color: ${secondaryFontColor};
    }

    .wallet-selector-tos-link {
        color: ${linkColor};
        text-decoration: none;
    }

    .wallet-selector-footnote {
        font-family: 'Circular Std Book', sans-serif;
        font-size: 16px;
        text-align: center;
        width: 100%;
        bottom: -30px;
        left: 0;
        color: white !important;
    }
    
    .wallet-selector-footnote a {
        color: #ffffff !important;
    }
    `;
};

class WalletTypeSelector {
    constructor(name, logo, customStyleOptions) {
        this.name = name;
        this.appLogo = logo;
        this.appName = name || 'app';
        this.customStyleOptions = customStyleOptions;
    }
    hideSelector() {
        if (this.selectorContainerEl) {
            this.selectorContainerEl.classList.remove(`wallet-selector-active`);
        }
    }
    showSelector() {
        if (this.selectorContainerEl) {
            this.selectorContainerEl.classList.add(`wallet-selector-active`);
        }
    }
    setUpSelectorContainer(reject) {
        this.font = document.createElement('link');
        this.font.href = 'https://fonts.cdnfonts.com/css/circular-std-book';
        this.font.rel = 'stylesheet';
        this.styleEl = document.createElement('style');
        this.styleEl.type = 'text/css';
        const styleText = getStyleText(this.customStyleOptions);
        this.styleEl.appendChild(document.createTextNode(styleText));
        this.styleEl.appendChild(this.font);
        document.head.appendChild(this.styleEl);
        if (!this.selectorContainerEl) {
            this.clearDuplicateContainers();
            this.selectorContainerEl = this.createEl();
            this.selectorContainerEl.className = 'wallet-selector';
            this.selectorContainerEl.onclick = (event) => {
                if (event.target === this.selectorContainerEl) {
                    event.stopPropagation();
                    this.hideSelector();
                    reject('no wallet selected');
                }
            };
            document.body.appendChild(this.selectorContainerEl);
        }
        if (!this.selectorEl) {
            let wrapper = this.createEl({ class: 'inner' });
            let closeButton = this.createEl({ class: 'close' });
            closeButton.onclick = (event) => {
                event.stopPropagation();
                this.hideSelector();
                reject('no wallet selected');
            };
            this.selectorEl = this.createEl({ class: 'connect' });
            wrapper.appendChild(this.selectorEl);
            wrapper.appendChild(closeButton);
            this.selectorContainerEl.appendChild(wrapper);
        }
    }
    clearDuplicateContainers() {
        const elements = document.getElementsByClassName('wallet-selector');
        while (elements.length > 0) {
            elements[0].remove();
        }
    }
    createEl(attrs) {
        if (!attrs)
            attrs = {};
        const el = document.createElement(attrs.tag || 'div');
        if (attrs) {
            for (const attr of Object.keys(attrs)) {
                const value = attrs[attr];
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
                        el.className = `wallet-selector-${value}`;
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
    displayWalletSelector(enabledWalletTypes) {
        return new Promise((resolve, reject) => {
            this.setUpSelectorContainer(reject);
            const header = this.createEl({ class: 'connect-header' });
            const body = this.createEl({ class: 'connect-body' });
            if (this.appLogo) {
                const logoEl = this.createEl({
                    class: 'logo',
                    tag: 'img',
                    src: this.appLogo,
                    alt: 'app-logo',
                });
                header.appendChild(logoEl);
            }
            const title = 'Connect Wallet';
            const subtitle = `To start using ${this.appName}`;
            const titleEl = this.createEl({ class: 'title', tag: 'span', text: title });
            const subtitleEl = this.createEl({ class: 'subtitle', tag: 'span', text: subtitle });
            const walletList = this.createEl({ class: 'wallet-list', tag: 'ul' });
            const eventGenerator = (walletName) => (event) => {
                event.stopPropagation();
                this.hideSelector();
                resolve(walletName);
            };
            for (const { key, value } of enabledWalletTypes) {
                const wallet = this.createEl({ class: `${key}-wallet`, tag: 'li' });
                wallet.onclick = eventGenerator(key);
                const logo = this.createEl({ class: `${key}-logo` });
                const name = this.createEl({ class: 'wallet-name', tag: 'span', text: value });
                const rightArrow = this.createEl({ class: 'right-arrow' });
                wallet.appendChild(logo);
                wallet.appendChild(name);
                wallet.appendChild(rightArrow);
                walletList.appendChild(wallet);
            }
            const tosLinkEl = this.createEl({
                class: 'tos-link',
                tag: 'a',
                text: `Terms of Service`,
                href: 'https://protonchain.com/terms',
                target: '_blank',
            });
            const tosAgreementEl = this.createEl({
                class: 'tos-agreement',
                tag: 'p',
                text: `By connecting, I accept Proton's `,
            });
            tosAgreementEl.appendChild(tosLinkEl);
            header.appendChild(titleEl);
            header.appendChild(subtitleEl);
            body.appendChild(walletList);
            body.appendChild(tosAgreementEl);
            const footnoteEl = this.createEl({ class: 'footnote', text: `Don't have a wallet? ` });
            const footnoteLink = this.createEl({
                tag: 'a',
                target: '_blank',
                href: 'https://protonchain.com/wallet',
                text: 'Download it here',
            });
            footnoteEl.appendChild(footnoteLink);
            emptyElement(this.selectorEl);
            this.selectorEl.appendChild(header);
            this.selectorEl.appendChild(body);
            this.selectorContainerEl.appendChild(footnoteEl);
            this.showSelector();
        });
    }
}
function emptyElement(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

const OPEN_SETTINGS = 'menubar=1,resizable=1,width=400,height=600';
class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        });
    }
}
class ProtonWebLink {
    constructor(options) {
        this.childWindow = null;
        this.scheme = options.scheme;
        this.storage = options.storage;
        this.testUrl = options.testUrl;
        setInterval(() => this.closeChild(), 500);
        window.addEventListener('message', (event) => this.onEvent(event), false);
    }
    childUrl(path) {
        const base = this.testUrl
            ? this.testUrl
            : this.scheme === 'proton'
                ? 'https://webauth.com'
                : 'https://testnet.webauth.com';
        return `${base}${path}`;
    }
    closeChild(force = false) {
        if (this.childWindow) {
            if (force) {
                this.childWindow.close();
            }
            if (force || this.childWindow.closed) {
                this.childWindow = null;
            }
        }
    }
    createSession(auth) {
        return {
            auth,
            transact: (args, options) => {
                if (this.deferredLogin) {
                    this.closeChild(true);
                    this.deferredLogin.reject('Trying to login');
                    this.deferredLogin = undefined;
                }
                this.deferredTransact = {
                    deferral: new Deferred(),
                    transaction: args.transaction || { actions: args.actions },
                    params: options,
                    waitingForOpen: true
                };
                this.childWindow = window.open(this.childUrl('/auth'), '_blank', OPEN_SETTINGS);
                try {
                    return this.deferredTransact.deferral.promise;
                }
                catch (e) {
                    console.error(e);
                    throw e;
                }
            },
            link: {
                walletType: 'webauth'
            }
        };
    }
    async login() {
        if (this.deferredTransact) {
            this.closeChild(true);
            this.deferredTransact.deferral.reject('Trying to login');
            this.deferredTransact = undefined;
        }
        this.childWindow = window.open(this.childUrl('/login'), '_blank', OPEN_SETTINGS);
        this.deferredLogin = new Deferred();
        try {
            this.storage.write('wallet-type', 'webauth');
            const auth = await this.deferredLogin.promise;
            return {
                session: this.createSession(auth)
            };
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async restoreSession(/* requestAccount */ _, auth) {
        return this.createSession(auth);
    }
    async removeSession(appIdentifier, auth, chainId) {
        if (!this.storage) {
            throw new Error('Unable to remove session: No storage adapter configured');
        }
        if (await this.storage.read('wallet-type')) {
            this.storage.remove('wallet-type');
        }
        if (await this.storage.read('user-auth')) {
            this.storage.remove('user-auth');
        }
        return {
            appIdentifier,
            auth,
            chainId
        };
    }
    async onEvent(e) {
        if (e.origin.indexOf('https://webauth.com') !== -1 &&
            e.origin.indexOf('https://testnet.webauth.com') !== -1) {
            return;
        }
        let eventData;
        try {
            eventData = JSON.parse(e.data);
        }
        catch (e) {
            return;
        }
        try {
            const { type, data, error } = eventData;
            if (!type) {
                return;
            }
            // Ready to receive transaction
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
            }
            // Close child
            else if (type === 'close') {
                this.closeChild(true);
                if (this.deferredTransact) {
                    this.deferredTransact.deferral.reject('Closed');
                }
                else if (this.deferredLogin) {
                    this.deferredLogin.reject('Closed');
                }
            }
            // TX Success
            else if (type === 'transactionSuccess') {
                this.closeChild(true);
                if (this.deferredTransact) {
                    if (error) {
                        this.deferredTransact.deferral.reject(error && error.json ? error.json : error);
                    }
                    else {
                        this.deferredTransact.deferral.resolve(data);
                    }
                    this.deferredTransact = undefined;
                }
            }
            // Login success
            else if (type === 'loginSuccess') {
                this.closeChild(true);
                if (this.deferredLogin) {
                    this.deferredLogin.resolve(data);
                    this.deferredLogin = undefined;
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}

class Storage {
    constructor(keyPrefix) {
        this.keyPrefix = keyPrefix;
    }
    async write(key, data) {
        localStorage.setItem(this.storageKey(key), data);
    }
    async read(key) {
        return localStorage.getItem(this.storageKey(key));
    }
    async remove(key) {
        localStorage.removeItem(this.storageKey(key));
    }
    storageKey(key) {
        return `${this.keyPrefix}-${key}`;
    }
}

const WALLET_TYPES = [
    { key: 'proton', value: 'Mobile Wallet' },
    { key: 'webauth', value: 'Web Wallet' },
    { key: 'anchor', value: 'Anchor' },
];

const ConnectWallet = async ({ linkOptions, transportOptions = {}, selectorOptions = {} }) => {
    // Add RPC
    const rpc = new JsonRpc(linkOptions.endpoints);
    linkOptions.client = rpc;
    // Add Chain ID
    if (!linkOptions.chainId) {
        const info = await rpc.get_info();
        linkOptions.chainId = info.chain_id;
    }
    // Add storage
    if (!linkOptions.storage) {
        linkOptions.storage = new Storage(linkOptions.storagePrefix || 'proton-storage');
    }
    return login(selectorOptions, linkOptions, transportOptions);
};
const login = async (selectorOptions, linkOptions, transportOptions) => {
    // Initialize link and session
    let session;
    let link;
    let loginResult;
    // Create Modal Class
    const wallets = new WalletTypeSelector(selectorOptions.appName, selectorOptions.appLogo, selectorOptions.customStyleOptions);
    // Determine wallet type from storage or selector modal
    let walletType = selectorOptions.walletType;
    if (!walletType) {
        if (linkOptions.restoreSession) {
            walletType = await linkOptions.storage.read('wallet-type');
        }
        else {
            const enabledWalletTypes = selectorOptions.enabledWalletTypes
                ? WALLET_TYPES.filter(wallet => selectorOptions.enabledWalletTypes && selectorOptions.enabledWalletTypes.includes(wallet.key))
                : WALLET_TYPES;
            try {
                walletType = await wallets.displayWalletSelector(enabledWalletTypes);
            }
            catch (e) {
                return {
                    error: e
                };
            }
        }
    }
    if (!walletType) {
        return {
            error: new Error('Wallet Type Unavailable: No wallet provided')
        };
    }
    // Determine chain
    let chain = 'proton';
    if (linkOptions.chainId === '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd') {
        chain = 'proton-test';
    }
    // Set scheme
    let scheme = 'proton';
    if (walletType === 'anchor') {
        scheme = 'esr';
    }
    else if (chain === 'proton-test') {
        scheme = 'proton-dev';
    }
    const options = {
        ...linkOptions,
        scheme,
        transport: new ProtonLinkBrowserTransport({
            ...transportOptions,
            walletType
        }),
        walletType,
        chains: []
    };
    // Create link
    if (walletType === 'webauth') {
        link = new ProtonWebLink(options);
    }
    else {
        link = new ProtonLink(options);
    }
    // Session from login
    if (!linkOptions.restoreSession) {
        let backToSelector = false;
        document.addEventListener('backToSelector', () => { backToSelector = true; });
        try {
            loginResult = await link.login(transportOptions.requestAccount || '');
            session = loginResult.session;
            const stringAuth = JSON.stringify({
                actor: loginResult.session.auth.actor.toString(),
                permission: loginResult.session.auth.permission.toString(),
            });
            linkOptions.storage.write('user-auth', stringAuth);
        }
        catch (e) {
            console.error('restoreSession Error:');
            console.error(e);
            if (backToSelector) {
                document.removeEventListener('backToSelector', () => { backToSelector = true; });
                return login(selectorOptions, linkOptions, transportOptions);
            }
            else {
                return {
                    error: e
                };
            }
        }
        // Session from restore
    }
    else {
        const stringifiedUserAuth = await linkOptions.storage.read('user-auth');
        const parsedUserAuth = stringifiedUserAuth ? JSON.parse(stringifiedUserAuth) : {};
        const savedUserAuth = Object.keys(parsedUserAuth).length > 0 ? parsedUserAuth : null;
        if (savedUserAuth) {
            session = await link.restoreSession(transportOptions.requestAccount || '', savedUserAuth);
            // Could not restore
            if (!session) {
                // clean storage to remove unexpected side effects if session restore fails
                linkOptions.storage.remove('wallet-type');
                linkOptions.storage.remove('user-auth');
                return {
                    link: undefined,
                    session: undefined,
                    loginResult: undefined,
                };
            }
        }
    }
    if (session && session.auth) {
        session.auth = {
            actor: session.auth.actor.toString(),
            permission: session.auth.permission.toString(),
        };
        session.publicKey = session.publicKey ? session.publicKey.toString() : undefined;
    }
    return {
        session,
        link,
        loginResult
    };
};

export { ConnectWallet as default };
//# sourceMappingURL=index.js.map
