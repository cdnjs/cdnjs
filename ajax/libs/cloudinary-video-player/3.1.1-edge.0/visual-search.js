/*!
 * Cloudinary Video Player v3.1.1-edge.0
 * Built on 2025-07-14T06:31:09.169Z
 * https://github.com/cloudinary/cloudinary-video-player
 */
"use strict";
(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["visual-search"],{

/***/ "./plugins/visual-search/components/SearchButton.js":
/*!**********************************************************!*\
  !*** ./plugins/visual-search/components/SearchButton.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchButton: () => (/* binding */ SearchButton)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const SearchButton = onClick => {
  const button = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('button', {
    className: 'vjs-control vjs-button vjs-visual-search-button',
    title: 'Search video content',
    ariaLabel: 'Search video content'
  });
  const searchIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
    className: 'vjs-icon-search'
  });
  button.appendChild(searchIcon);
  const spinnerIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
    className: 'vjs-loading-spinner'
  });
  button.appendChild(spinnerIcon);
  button.addEventListener('click', onClick);
  return button;
};

/***/ }),

/***/ "./plugins/visual-search/components/SearchInput.js":
/*!*********************************************************!*\
  !*** ./plugins/visual-search/components/SearchInput.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchInput: () => (/* binding */ SearchInput)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const SearchInput = (onSearch, onClose) => {
  const form = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('form', {
    className: 'vjs-visual-search-form'
  });
  const input = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('input', {
    className: 'vjs-visual-search-input',
    type: 'text',
    ariaLabel: 'Search input',
    tabIndex: -1
  });
  const closeButton = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('button', {
    className: 'vjs-control vjs-button vjs-visual-search-close',
    type: 'button',
    title: 'Close search',
    ariaLabel: 'Close search',
    tabIndex: -1
  });

  // Add close icon
  const closeIcon = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('span', {
    className: 'vjs-icon-close'
  });
  closeButton.appendChild(closeIcon);
  form.appendChild(input);
  form.appendChild(closeButton);

  // Handle search submission
  form.addEventListener('submit', e => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      onSearch(query);
    }
  });

  // Handle close button
  closeButton.addEventListener('click', e => {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
  });
  return {
    element: form,
    input,
    closeButton
  };
};

/***/ }),

/***/ "./plugins/visual-search/components/SearchResults.js":
/*!***********************************************************!*\
  !*** ./plugins/visual-search/components/SearchResults.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchResults: () => (/* binding */ SearchResults)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);

const SearchResults = player => {
  const clearMarkers = () => {
    player.$$('.vjs-visual-search-marker').forEach(el => el.remove());
    player.$$('.vjs-visual-search-results-wrapper').forEach(el => el.remove());

    // Remove the class that indicates search results are displayed
    player.removeClass('vjs-visual-search-results-active');
  };
  const displayResults = results => {
    // Clear existing markers
    clearMarkers();
    const total = player.duration();
    const seekBar = player.controlBar.progressControl.seekBar;

    // Create wrapper for search results
    const wrapperEl = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
      className: 'vjs-visual-search-results-wrapper',
      role: 'presentation'
    });

    // Add markers for each result
    results.forEach(result => {
      const {
        start_time,
        end_time
      } = result;
      const position = start_time / total * 100;
      const width = (end_time - start_time) / total * 100;
      const time = `${Math.floor(start_time / 60)}:${Math.floor(start_time % 60).toString().padStart(2, '0')}`;
      const markerEl = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
        className: 'vjs-control vjs-visual-search-marker',
        style: `left: ${position}%; width: ${width}%`,
        tabIndex: 0,
        role: 'button',
        title: `Search result at ${time}`,
        ariaLabel: `Search result at ${time}`
      });
      wrapperEl.appendChild(markerEl);

      // Add click handler to jump to this time
      markerEl.addEventListener('click', () => {
        player.currentTime(start_time);
      });

      // Add keyboard support
      markerEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          player.currentTime(start_time);
        }
      });
    });

    // Add wrapper to seek bar
    seekBar.el().appendChild(wrapperEl);

    // Add a class to indicate search results are displayed
    if (results.length > 0) {
      player.addClass('vjs-visual-search-results-active');
    }
  };
  return {
    displayResults,
    clearMarkers
  };
};

/***/ }),

/***/ "./plugins/visual-search/visual-search.js":
/*!************************************************!*\
  !*** ./plugins/visual-search/visual-search.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! video.js */ "../node_modules/video.js/dist/alt/video.core-exposed.js");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(video_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_SearchButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/SearchButton */ "./plugins/visual-search/components/SearchButton.js");
/* harmony import */ var _components_SearchInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/SearchInput */ "./plugins/visual-search/components/SearchInput.js");
/* harmony import */ var _components_SearchResults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/SearchResults */ "./plugins/visual-search/components/SearchResults.js");
/* harmony import */ var _visual_search_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./visual-search.scss */ "./plugins/visual-search/visual-search.scss");





const visualSearch = (options, player) => {
  player.addClass('vjs-visual-search');
  let isSearchActive = false;
  const searchResults = (0,_components_SearchResults__WEBPACK_IMPORTED_MODULE_3__.SearchResults)(player);
  const performSearch = async query => {
    const searchButton = player.$('.vjs-visual-search-button');
    searchButton.classList.add('vjs-waiting');
    try {
      const source = player.cloudinary.source();
      const publicId = source.publicId();
      const transformation = Object.assign({}, source.transformation());
      transformation.flags = transformation.flags || [];
      transformation.flags.push(`getinfo:search_b64_${btoa(query)}`);
      const visualSearchSrc = source.config().url(`${publicId}`, {
        transformation
      });
      const response = await fetch(visualSearchSrc, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Search request failed with status: ${response.status}`);
      }
      const results = await response.json();
      searchResults.displayResults(results.timestamps);
      if (results && !player.hasStarted()) {
        // Make sure the progress bar is visible
        player.play().then(() => player.pause());
      }
    } catch (error) {
      console.error('Error performing visual search:', error);
    } finally {
      searchButton.classList.remove('vjs-waiting');
    }
  };
  const clearUI = () => {
    isSearchActive = false;
    searchResults.clearMarkers();
    player.$('.vjs-visual-search-wrapper')?.remove();
  };
  const createSearchUI = () => {
    clearUI();
    const titleBar = player.$('.vjs-title-bar');
    if (titleBar) {
      titleBar.classList.remove('vjs-hidden');
    }
    const searchContainer = video_js__WEBPACK_IMPORTED_MODULE_0___default().dom.createEl('div', {
      className: 'vjs-visual-search-wrapper'
    });

    // Handle the search icon click (expand or submit)
    const handleSearchButtonClick = () => {
      if (!isSearchActive) {
        isSearchActive = true;
        searchContainer.classList.add('vjs-visual-search-active');
        searchInput.input.tabIndex = 0;
        searchInput.closeButton.tabIndex = 0;
        searchInput.input.focus();
      } else {
        const query = searchInput.input.value.trim();
        if (query) {
          performSearch(query);
        }
      }
    };
    const closeSearch = () => {
      if (isSearchActive) {
        isSearchActive = false;
        searchContainer.classList.remove('vjs-visual-search-active');
        searchInput.input.value = '';
        searchInput.input.tabIndex = -1;
        searchInput.closeButton.tabIndex = -1;
        searchResults.clearMarkers();
      }
    };
    const searchButton = (0,_components_SearchButton__WEBPACK_IMPORTED_MODULE_1__.SearchButton)(handleSearchButtonClick);
    const searchInput = (0,_components_SearchInput__WEBPACK_IMPORTED_MODULE_2__.SearchInput)(performSearch, closeSearch);
    searchContainer.appendChild(searchButton);
    searchContainer.appendChild(searchInput.element);
    titleBar.prepend(searchContainer);
    player.on('keydown', e => {
      if (e.key === 'Escape' && isSearchActive) {
        closeSearch();
      }
    });
  };
  createSearchUI();

  // Public methods
  player.visualSearch = {
    createSearchUI,
    clearUI
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (visualSearch);

/***/ }),

/***/ "./plugins/visual-search/visual-search.scss":
/*!**************************************************!*\
  !*** ./plugins/visual-search/visual-search.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=visual-search.js.map